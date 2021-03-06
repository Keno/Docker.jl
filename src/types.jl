"""
    DockerContainer()
"""
Base.@kwdef struct DockerContainer
    label::String = Random.randstring(10)
end

"""
    DockerConfig(; kwargs...)

## Required Keyword Arguments:
- `base_image::String`

## Optional Keyword Arguments:
- `verbose::Bool = false`
- `env::Union{Dict{String, String}, Nothing} = nothing`
- `platform::Symbol = :linux`
- `read_only_maps::Union{Dict{String, String}, Nothing} = nothing`
- `read_write_maps::Union{Dict{String, String}, Nothing} = nothing`
- `stdin::IO = Base.devnull`
- `stdout::IO = Base.stdout`
- `stderr::IO = Base.stderr`
- `docker_build_stdout::Union{IO, Nothing} = nothing`
- `docker_build_stderr::Union{IO, Nothing} = nothing`
- `add_capabilities::Union{Vector{String}, Nothing} = nothing`
"""
Base.@kwdef struct DockerConfig
    # Required
    base_image::String

    # Optional
    verbose::Bool = false
    env::Union{Dict{String, String}, Nothing} = nothing
    platform::Symbol = :linux
    read_only_maps::Union{Dict{String, String}, Nothing} = nothing
    read_write_maps::Union{Dict{String, String}, Nothing} = nothing
    stdin::IO = Base.devnull
    stdout::IO = Base.stdout
    stderr::IO = Base.stderr
    docker_build_stdout::Union{IO, Nothing} = nothing
    docker_build_stderr::Union{IO, Nothing} = nothing
    add_capabilities::Union{Vector{String}, Nothing} = nothing
end
