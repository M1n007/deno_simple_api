import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { response, simpleResponse } from  "../helper/utils/wrapper.ts";
import { Config } from "../config/configs.ts";
import { addBook, updateBook, viewAllBook, viewOneBook } from "../modules/books/index.ts";

export function AppServer(){
    let app: any;
    let server: any;

    app = new Application();
    server = new Router();

    app.use(server.routes());
    app.use(server.allowedMethods());

    app.use((ctx: any) => {
        // return response(ctx, 'fail', 'notfound', 404);
        return simpleResponse(ctx, 'notfound', 404);
    })

    // endpoint book
    server.post('/api/book/v1', addBook);
    server.put('/api/book/v1/:id', updateBook);
    server.get('/api/book/v1', viewAllBook);
    server.get('/api/book/v1/:id', viewOneBook);

    return app;
}