# Etapa 1: Build com Node 22 (exigido pelo Vite 8)
FROM node:22-alpine AS builder
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm ci

# Copia o restante do código e gera a pasta /dist
COPY . .
RUN npm run build

# Etapa 2: Servidor web Nginx
FROM nginx:alpine

# Remove a configuração padrão e aplica a nossa com suporte a SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]