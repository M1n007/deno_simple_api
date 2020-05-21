import { AppServer } from './bin/server/app.ts';
import * as log from "https://deno.land/std/log/mod.ts";
const server = AppServer();
const PORT = 8001;

log.info(`service running at port ${PORT}`)
server.listen({port:PORT})