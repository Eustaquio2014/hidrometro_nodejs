# Hidromonitor - Nodejs SSR

## Deploy no Docker

Este projeto utiliza o Docker e Docker Compose para facilitar o ambiente de desenvolvimento e produção. Abaixo estão os scripts disponíveis para gerenciar os containers.

## Scripts

### `docker:dev`
Inicia o ambiente de desenvolvimento com Docker Compose, criando o projeto com o nome `hidromonitor-dev`. Ele utiliza o arquivo `docker-compose.dev.yml` e as variáveis de ambiente definidas no arquivo `.env.development`. Além disso, realiza o build da imagem.

### `docker:dev:up`
Inicia o ambiente de desenvolvimento com Docker Compose usando o arquivo `docker-compose.dev.yml` e as variáveis de ambiente do arquivo `.env.development`. Não realiza o build.

### `docker:dev:down`
Para os containers do ambiente de desenvolvimento definidos no arquivo `docker-compose.dev.yml`.

### `docker:prd`
Inicia o ambiente de produção com Docker Compose, criando o projeto com o nome `hidromonitor-prd`. Ele utiliza o arquivo `docker-compose.prd.yml` e as variáveis de ambiente definidas no arquivo `.env.production`. O comando é executado em modo "detached" (`-d`), o que permite que o terminal seja liberado após o start.

### `docker:prd:up`
Inicia o ambiente de produção com Docker Compose usando o arquivo `docker-compose.prd.yml` e as variáveis de ambiente do arquivo `.env.production`. Não realiza o build.

### `docker:prd:down`
Para os containers do ambiente de produção definidos no arquivo `docker-compose.prd.yml`.

## Como rodar

1. Certifique-se de que o Docker e Docker Compose estão instalados.
2. Defina as variáveis de ambiente nos arquivos `.env.development` e `.env.production`.
3. Para iniciar o ambiente de desenvolvimento, use o comando:

   ```bash
   npm run docker:dev

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

## Comandos de atualização de um deploy existente (Redeploy)

Para realizar o deploy da aplicação no Docker, utilize o seguinte comando:

```sh
yarn docker:prd:redeploy
```

## Requisitos

- Docker instalado
- Docker Compose instalado
- Arquivo `.env.production` configurado corretamente

## Notas

- Certifique-se de que todas as dependências necessárias estão configuradas no ambiente.
- Para interromper o contêiner em execução, utilize:

```sh
yarn docker:prd:down
```
