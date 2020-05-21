import db from "../../helper/mongo.ts";
import Query from "./query.ts";
import { Book_schema } from "./schema.ts";
import { data, error } from "../../helper/utils/wrapper.ts";
import { Config } from "../../config/configs.ts";

// query
const query = new Query();

const addBook = async (ctx: any) => {
    try {
        let body = await ctx.request.body()
        let payload = body['value'];
        if (!Object.keys(payload).length) {
            return error(ctx, `Request can't be empty`, 500);
        }

        const findBookById = await query.findBookById(payload.bookId);
        if (findBookById) {
            return error(ctx, `book with id ${payload.bookId} already exist`, 409);
        }

        const insertBook = await query.insertOneBook(payload);

        return data(ctx, insertBook, 'Success inserting new book!', 200);
    } catch (err) {
        console.log(err)
        return error(ctx, 'Internal server error', 500);
    }
}

const updateBook = async (ctx: any) => {
    try {
        let bookId = ctx.params.id;
        let body = await ctx.request.body()
        let payload = body['value'];

        if (!Object.keys(payload).length) {
            return error(ctx, `Request can't be empty`, 500);
        }

        const findBookById = await query.findBookById(bookId);
        if (!findBookById) {
            return error(ctx, `book with id ${bookId} notfound`, 404);
        }

        let newBook = {
            $set: {
                bookName: payload.bookName
            }
        }
        const updateBook = await query.updateOneBook(newBook);

        return data(ctx, updateBook, `Success update book with id ${bookId}`, 200);
    } catch (err) {
        console.log(err)
        return error(ctx, 'Internal server error', 500);
    }
}

const viewAllBook = async (ctx: any) => {
    try {
        const books = await query.findManyBook();
        if (books.length == 0) {
            return error(ctx, 'no data found!', 404);
        }
        const resultAllBook: Book_schema[] = books.map((book: any): object => {
            return {
                bookId: book.bookId,
                bookName: book.bookName
            }
        });
        return data(ctx, resultAllBook, 'Success get all books', 200);
    } catch (err) {
        console.log(err)
        return error(ctx, 'Internal server error', 500);
    }
}

const viewOneBook = async (ctx: any) => {
    try {
        let bookId = ctx.params.id;

        const findBookById = await query.findBookById(bookId);
        if (!findBookById) {
            return error(ctx, `book with id ${bookId} notfound`, 404);
        }

        const newObject: Book_schema = {
            bookId: findBookById.bookId,
            bookName: findBookById.bookName
        }
       
        return data(ctx, newObject, 'Success get book', 200);
    } catch (err) {
        console.log(err)
        return error(ctx, 'Internal server error', 500);
    }
}


export { updateBook, addBook, viewAllBook, viewOneBook }