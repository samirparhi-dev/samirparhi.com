FROM alpine:latest

# Install Tailwind CSS and other Node.js dependencies
WORKDIR /app
COPY . .
RUN apk add --no-cache \
    zola \
    npm \
    && npm install \
    && npx tailwindcss -i styles/styles.css -o static/styles/styles.css \
    && zola build

CMD ["zola", "serve", "--interface", "0.0.0.0", "--port", "8080"]
EXPOSE 8080

# ENV SERVER_PORT 8080
