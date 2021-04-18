"""
    docker_image_label(container::DockerContainer)
"""
function docker_image_label(container::DockerContainer)
    return string("org.julialang.docker.jl=", container.label)
end

function _assert_no_nonword_characters(str::String)
    isascii(str) || throw(ArgumentError("String is not an ASCII string"))
    occursin(r"^[A-Za-z0-9_]*?$", str) || throw(ArgumentError("String contains one or more nonword characters"))
    return nothing
end

function _replace_nonword_character(char::Char)
    if occursin(r"^\w$", string(char))
        return char
    else
        return '_'
    end
end

function _replace_all_nonword_characters(str::String)
    isascii(str) || throw(ArgumentError("String is not an ASCII string"))
    old_chars = collect(str)
    new_chars = _replace_nonword_character.(old_chars)
    new_str = join(new_chars)
    _assert_no_nonword_characters(new_str)
    return new_str
end

"""
    docker_image_name(image::String)
"""
function docker_image_name(image::String)
    docker_image = string(
        "julialang_dockerjl:",
        _replace_all_nonword_characters(image),
        "_",
        string(Base._crc32c(image), base=16),
    )
    return docker_image
end

"""
    cleanup_container(container::DockerContainer)
"""
function cleanup_container(container::DockerContainer)
    label = docker_image_label(container)
    success(`docker system prune --force --filter=label=$(label)`)
    return nothing
end

function _generate_dockerfile(config::DockerConfig)
    if config.platform === :linux
        return """
        FROM --platform=linux $(config.image)
        RUN usermod -L root
        RUN groupadd --system myuser
        RUN useradd --create-home --shell /bin/bash --system --gid myuser myuser
        USER myuser
        """
    else
        msg = "Invalid value for config.platform: $(config.platform)"
        throw(ArgumentError(msg))
    end
end

"""
    build_docker_image(config::DockerConfig)
"""
function build_docker_image(config::DockerConfig)
    docker_image = docker_image_name(config.image)
    mktempdir() do tmp_dir
        cd(tmp_dir) do
            rm("Dockerfile"; force = true, recursive = true)
            dockerfile = _generate_dockerfile(config)
            open("Dockerfile", "w") do io
                println(io, strip(dockerfile))
            end
            run(
                pipeline(
                    `docker build -t $(docker_image) .`;
                    stdin = config.stdin_docker_build,
                    stdout = config.stdout_docker_build,
                    stderr = config.stderr_docker_build,
                )
            )
        end
    end
    return docker_image
end

"""
    build_container_command(container::DockerContainer, config::DockerConfig, cmd::Cmd)
"""
function build_container_command(container::DockerContainer,
                                 config::DockerConfig,
                                 cmd::Cmd)
    build_docker_image(config)

    container_cmd_string = String[
        "docker", "run",
        "--rm=true",                              # automatically remove the container when it exits
        "--interactive",                          # keep STDIN open even if not attached
        "--security-opt=no-new-privileges",       # disable container processes from gaining new privileges
        "--label", docker_image_label(container), # set metadata
    ]

    # If we're doing a fully-interactive session, tell it to allocate a psuedo-TTY
    is_interactive = all(
        isa.(
            (config.stdin, config.stdout, config.stderr),
            Base.TTY,
        )
    )
    is_interactive && push!(container_cmd_string, "-t")

    # Start in the right directory
    append!(container_cmd_string, ["--workdir=/home/myuser]"])

    # Add in read-only mappings (skipping the rootfs)
#     for (dst, src) in config.read_only_maps
#         if dst == "/"
#             continue
#         end
#         append!(container_cmd_string, ["-v", "$(src):$(dst):ro"])
#     end

    # Add in read-write mappings
#     for (dst, src) in config.read_write_maps
#         append!(container_cmd_string, ["-v", "$(src):$(dst)"])
#     end

    # Apply environment mappings, first from `config`, next from `cmd`.
#     for (k, v) in config.env
#         append!(container_cmd_string, ["-e", "$(k)=$(v)"])
#     end

    push!(container_cmd_string, docker_image_name(config.image))
    append!(container_cmd_string, cmd.exec)

    container_cmd = Cmd(container_cmd_string)

    return container_cmd
end
