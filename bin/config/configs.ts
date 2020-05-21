import { config } from "https://deno.land/x/dotenv/mod.ts";

const Config = {
    mongoUrl: config().MONGO_URL,
    mongoDbName: config().MONGO_DB_NAME,
    collection: {
        books: 'book'
    }
}

export {Config};