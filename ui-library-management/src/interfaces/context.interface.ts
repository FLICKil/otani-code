import React from "react";
import { IAdmin } from "./IAdmin.interface";
import { IAuthor } from "./IAuthor.interface";
import { IBook } from "./IBook.interface";
import { ICategory } from "./ICategory.interface";
import { IPublisher } from "./IPublisher.interface";
import { IRent } from "./IRent.interface";
import { ISetting } from "./ISetting.interface";
import { IUser } from "./IUser.interface";

export interface IContextProps{
    children: React.ReactNode;
}

export interface IBookContextType{
    bookInfo: IBook,
    setBookInfo: Function;
    // isLogged: boolean;
    // setIsLogged: Function;
    // isAdmin: boolean;
    // setIsAdmin: Function;
    listBook: IBook[],
    setListBook: Function;
    reload: boolean;
    setReload: Function;
    loading: boolean;
    setLoading: Function;
    author: number;
    setAuthor: Function;
    category: number;
    setCategory: Function;
    publisher: number;
    setPublisher: Function;
}

export interface ICategoryContextType{
    categoryInfo: ICategory,
    setCategoryInfo: Function;
    reload: boolean;
    setReload: Function;
    listCategory: ICategory[],
    setListCategory: Function,
}

export interface IPublisherContextType{
    publisherInfo: IPublisher,
    setPublisherInfo: Function;
    reload: boolean;
    setReload: Function;
    listPublisher: IPublisher[],
    setListPublisher: Function,
}
export interface IAuthorContextType{
    authorInfo: IAuthor,
    setAuthorInfo: Function;
    reload: boolean;
    setReload: Function;
    listAuthor: IAuthor[],
    setListAuthor: Function,
}
export interface IAdminContextType{
    adminInfo: IAdmin;
    setAdminInfo: Function;
    listAdmin: IAdmin[],
    setListAdmin: Function,
    reload: boolean;
    setReload: Function;
    isAdmin: boolean;
    setIsAdmin: Function;
    isLogged: boolean;
    setIsLogged: Function;
    loading: boolean;
    setLoading: Function;
}

export interface IUserContextType{
    userInfo: IUser;
    setUserInfo: Function;
    listUser: IUser[];
    setListUser: Function;
    reload: boolean;
    setReload: Function;
    isLogged: boolean;
    setIsLogged: Function;
}

export interface IRentContextType{
    rentInfo: IRent;
    setRentInfo: Function;
    listRent: IRent[];
    setListRent: Function;
    reload: boolean;
    setReload: Function;
}

export interface ISettingContextType{
    setting: ISetting;
    setSetting :Function;
    reload: boolean;
    setReload: Function;
}