import { IAuthor } from "./IAuthor.interface";
import { ICategory } from "./ICategory.interface";
import { IPublisher } from "./IPublisher.interface";

export interface IBook{
    id?: number;
    title: string;
    author: IAuthor;
    category: ICategory;
    publisher: IPublisher;
    amount: number;
    coverImg : Blob;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
}

export interface IBookProp{
    book: IBook;
}

export interface IManageBook {
    bookId?: number;
    onEdit: boolean;
}