import db from "../../helper/mongo.ts";
import { Config } from "../../config/configs.ts";

export default class Query{
    database: any;
    book: any;

    constructor(){
        this.database = db.getDatabase;
        this.book = this.database.collection(Config.collection.books);
    }

    async findBookById(params: string){
        let parameter = {
            bookId: params
        }
        const result = this.book.findOne(parameter);
        return result
    }

    async insertOneBook(document: object){
        const result = this.book.insertOne(document);
        return result;
    }

    async updateOneBook(document: object){
        const result = this.book.updateOne({}, document);
        return result;
    }

    async findManyBook(){
        const result = this.book.find({});
        return result;
    }
}