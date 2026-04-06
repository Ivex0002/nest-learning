# File Structure

```
└── config
    ├── default.yml
    ├── development.yml
    └── production.yml
```

# Combined Files

## Path: config\default.yml (106.0 B)

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

## Path: config\development.yml (120.0 B)

```yml
db:
  host: 'localhost'
  username: 'postgres'
  password: 'example password'
  synchronize: true

jwt:
  secret: 'secret value'
```

## Path: config\production.yml (0.0 B)

```yml
db:
  synchronize: false
```
