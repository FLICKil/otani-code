import { ICurrencyOption } from "../components/admin/Setting";

export interface ISetting{
    id?: number;
    bookReturnDay : number;
    userIssuedLimit : number;
    oneDayFee: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
}

export interface IManageSetting{
    bookReturnDay : number;
    userIssuedLimit : number;
    oneDayFee: number;
    currency: /* ICurrencyOption */ string;
    updatedAt: Date;
}