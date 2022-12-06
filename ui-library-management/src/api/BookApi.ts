import axios from "axios";
import { useEffect, useState } from "react";
import { IBook } from "../interfaces/IBook.interface";
import API from ".././api";

const BookApi = () => {
  const [listBook, setListBook] = useState<IBook[]>([] as IBook[]);

  const [reload, setReload] = useState<boolean>(false);

  const [author, setAuthor] = useState<number>();
  const [category, setCategory] = useState<number>();
  const [publisher, setPublisher] = useState<number>();
  useEffect(() => {
    const getListBook = async () => {
      await API.get(`book`)
        .then((res) => {
          setListBook(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListBook();
  }, [reload, author, category, publisher]);

  return {
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
  };
};

export default BookApi;
