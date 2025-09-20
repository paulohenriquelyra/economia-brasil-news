# Usar uma imagem Nginx leve e otimizada
FROM nginx:alpine

# Copiar os arquivos do site estático para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acesso externo
EXPOSE 80

# O comando padrão da imagem Nginx já inicia o servidor

