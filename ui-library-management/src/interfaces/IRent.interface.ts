import { IBook } from "./IBook.interface";
import { IUser } from "./IUser.interface";

export interface IRent{
    id?: number;
    book: IBook;
    user: IUser;
    startDate: Date;
    endDate: Date;
    fines: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
}

export interface IRentProp{
    rent: IRent;
}