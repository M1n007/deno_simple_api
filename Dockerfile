FROM hayd/alpine-deno:latest

EXPOSE 8001

WORKDIR /usr/app

COPY . .

CMD [ "run", "--allow-write", "--allow-read", "--allow-plugin", "--allow-net", "--allow-env", "--unstable", "index.ts"]
