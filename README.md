# Hidromonitor - Deploy em Produção
Hidromonitor - Nodejs SSR


Este documento descreve o processo de deploy da aplicação Hidromonitor utilizando Docker.

## Comandos de Deploy

Para realizar o deploy da aplicação no Docker, utilize o seguinte comando:

```sh
yarn docker:prd
```

Caso deseje acompanhar o processo de build em tempo real, utilize:

```sh
docker-compose -p hidromonitor-prd -f docker-compose.prd.yml up --env-file ./.env.production --build
```

## Requisitos

- Docker instalado
- Docker Compose instalado
- Arquivo `.env.production` configurado corretamente

## Notas

- Certifique-se de que todas as dependências necessárias estão configuradas no ambiente.
- Para interromper o contêiner em execução, utilize:

```sh
docker-compose -p hidromonitor-prd -f docker-compose.prd.yml down
```

Se precisar de mais detalhes, consulte a documentação interna do projeto.

