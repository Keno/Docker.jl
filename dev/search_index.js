var documenterSearchIndex = {"docs":
[{"location":"examples/","page":"Examples","title":"Examples","text":"CurrentModule = Docker","category":"page"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/#Simple-Example","page":"Examples","title":"Simple Example","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Docker\n\nconfig = DockerConfig(; image = \"julia:latest\");\n\nwith_container() do container\n    code = \"\"\"\n    println(\"Hello world!\")\n    \"\"\"\n    run(container, config, `julia -e $(code)`)\nend","category":"page"},{"location":"examples/#Interactive-Example","page":"Examples","title":"Interactive Example","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> using Docker\n\njulia> config = DockerConfig(;\n           image = \"julia:latest\",\n           Base.stdin,\n           Base.stdout,\n           Base.stderr,\n       );\n\njulia> with_container() do container\n           run(container, config, `/bin/bash`)\n       end","category":"page"},{"location":"public/","page":"Public API","title":"Public API","text":"CurrentModule = Docker","category":"page"},{"location":"public/#Public-API","page":"Public API","title":"Public API","text":"","category":"section"},{"location":"public/","page":"Public API","title":"Public API","text":"Modules = [Docker]\nPublic = true\nPrivate = false","category":"page"},{"location":"public/#Docker.DockerConfig","page":"Public API","title":"Docker.DockerConfig","text":"DockerConfig(; kwargs...)\n\nRequired Keyword Arguments:\n\nimage::String\n\nOptional Keyword Arguments:\n\nverbose::Bool = false\nenv::Dict{String, String} = Dict{String, String}()\nplatform::Symbol = :linux\nread_only_maps::Dict{String, String} = Dict{String, String}()\nread_write_maps::Dict{String, String} = Dict{String, String}()\nstdin::IO = Base.devnull\nstdout::IO = Base.stdout\nstderr::IO = Base.stderr\ndocker_build_stdout::Union{IO, Nothing} = nothing\ndocker_build_stderr::Union{IO, Nothing} = nothing\n\n\n\n\n\n","category":"type"},{"location":"public/#Base.run-Tuple{Docker.DockerContainer, DockerConfig, Cmd}","page":"Public API","title":"Base.run","text":"run(container::DockerContainer, config::DockerConfig, user_cmd::Cmd; kwargs...)\n\n\n\n\n\n","category":"method"},{"location":"public/#Base.success-Tuple{Docker.DockerContainer, DockerConfig, Cmd}","page":"Public API","title":"Base.success","text":"success(container::DockerContainer, config::DockerConfig, user_cmd::Cmd; kwargs...)\n\n\n\n\n\n","category":"method"},{"location":"public/#Docker.with_container-Tuple{Function, Docker.DockerContainer}","page":"Public API","title":"Docker.with_container","text":"with_container(f::Function, container::DockerContainer)\n\n\n\n\n\n","category":"method"},{"location":"public/#Docker.with_container-Union{Tuple{Function}, Tuple{T}, Tuple{Function, Type{T}}} where T<:Docker.DockerContainer","page":"Public API","title":"Docker.with_container","text":"with_container(f::Function, ::Type{T} = DockerContainer) where {T <: DockerContainer}\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Docker","category":"page"},{"location":"#[Docker.jl](https://github.com/JuliaContainerization/Docker.jl)","page":"Home","title":"Docker.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Docker.jl is a package for running Julia Cmd objects inside of Docker containers.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The source code for this package is available in the GitHub repository.","category":"page"},{"location":"#Related-Packages","page":"Home","title":"Related Packages","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You may also be interested in:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Sandbox.jl","category":"page"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"CurrentModule = Docker","category":"page"},{"location":"internals/#Internals-(Private)","page":"Internals (Private)","title":"Internals (Private)","text":"","category":"section"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"Modules = [Docker]\nPublic = false\nPrivate = true","category":"page"},{"location":"internals/#Docker.DockerContainer","page":"Internals (Private)","title":"Docker.DockerContainer","text":"DockerContainer()\n\n\n\n\n\n","category":"type"},{"location":"internals/#Docker.build_docker_image-Tuple{Docker.DockerContainer, DockerConfig}","page":"Internals (Private)","title":"Docker.build_docker_image","text":"build_docker_image(container::DockerContainer, config::DockerConfig)\n\n\n\n\n\n","category":"method"},{"location":"internals/#Docker.cleanup-Tuple{Docker.DockerContainer}","page":"Internals (Private)","title":"Docker.cleanup","text":"cleanup(container::DockerContainer)\n\n\n\n\n\n","category":"method"},{"location":"internals/#Docker.construct_container_command-Tuple{Docker.DockerContainer, DockerConfig, Cmd}","page":"Internals (Private)","title":"Docker.construct_container_command","text":"construct_container_command(container::DockerContainer, config::DockerConfig, cmd::Cmd)\n\n\n\n\n\n","category":"method"},{"location":"internals/#Docker.docker_image_label-Tuple{Docker.DockerContainer}","page":"Internals (Private)","title":"Docker.docker_image_label","text":"docker_image_label(container::DockerContainer)\n\n\n\n\n\n","category":"method"},{"location":"internals/#Docker.docker_image_name-Tuple{String}","page":"Internals (Private)","title":"Docker.docker_image_name","text":"docker_image_name(image::String)\n\n\n\n\n\n","category":"method"},{"location":"prerequisites/","page":"Prerequisites","title":"Prerequisites","text":"CurrentModule = Docker","category":"page"},{"location":"prerequisites/#Prerequisites","page":"Prerequisites","title":"Prerequisites","text":"","category":"section"},{"location":"prerequisites/","page":"Prerequisites","title":"Prerequisites","text":"You must have Docker installed on your computer.","category":"page"}]
}
