# Processing Summary

```
Total files found: 3
Files processed: 3
Total size: 226.0 B
Estimated tokens: ~57
```

# Instructions for LLM

This document contains a collection of files from a software project. The content is organized with a processing summary, file structure, and the combined contents of each file, each in its own section.

# File Structure

```
└── config
    ├── default.config.yml
    ├── dev.config.yml
    └── prod.config.yml
```

# Combined Files

## Path: config/default.config.yml (106.0 B)

```yml
server:
  port: 4001

db:
  type: 'postgres'
  port: 4000
  database: 'db name'

jwt:
  expiresIn: 3600
```

## Path: config/dev.config.yml (120.0 B)

```yml
db:
  host: 'localhost'
  username: 'postgres'
  password: 'example password'
  synchronize: true

jwt:
  secret: 'secret value'
```

## Path: config/prod.config.yml (0.0 B)

```yml
db:
  synchronize: false
```
