import { createContext, useEffect, useState } from "react";
import BookApi from "../api/BookApi";
import {
  IBookContextType,
  IContextProps,
} from "../interfaces/context.interface";
import { IBook } from "../interfaces/IBook.interface";

export const BookContext = createContext<IBookContextType>({
  bookInfo: {} as IBook,
  setBookInfo: (bookInfo: IBook) => {},
  listBook: [] as IBook[],
  setListBook: (listBook: IBook[]) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
  author: 0,
  setAuthor: (author: number) => {},
  category: 0,
  setCategory: (category: number) => {},
  publisher: 0,
  setPublisher: (publisher: number) => {},
});

export const BookContextProvider = ({ children }: IContextProps) => {
  // const [isLogged, setIsLogged] = useState<boolean>(false);
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookInfo, setBookInfo] = useState<IBook | null>(null);

  const {
    listBook,
    setListBook,
    reload,
    setReload,
    author,
    setAuthor,
    category,
    setCategory,
    publisher,
    setPublisher,
  } = BookApi();

  const bookState = {
    bookInfo,
    setBookInfo,
    // isLogged,
    // setIsLogged,
    // isAdmin,
    // setIsAdmin,
    listBook,
    setListBook,
    reload,
    setReload,
    loading,
    setLoading,
    author,
    setAuthor,
    category,
    setCategory,
    publisher,
    setPublisher,
  };

  return (
    <BookContext.Provider value={bookState as IBookContextType}>
      {children}
    </BookContext.Provider>
  );
};
