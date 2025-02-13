FROM node:20.11.1 AS BUILD

RUN mkdir -p /node/node-app && chown -R node:node /node/node-app

WORKDIR /node/node-app

COPY ["package.json", "yarn.lock", "./"]

COPY .env.production /node/node-app/.env.production

USER node

# Limpar o cache do yarn (opcional, só se necessário)
RUN yarn cache clean

# Adicionar cross-env globalmente
RUN yarn global add cross-env

# Copiar o package.json e yarn.lock primeiro
COPY package*.json ./

# Instalar as dependências
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

