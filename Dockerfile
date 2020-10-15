FROM hayd/alpine-deno:latest

EXPOSE 3000

WORKDIR /usr/app

COPY . .

CMD [ "run", "--allow-write", "--allow-read", "--allow-plugin", "--allow-net", "--allow-env", "--unstable", "index.ts"]
