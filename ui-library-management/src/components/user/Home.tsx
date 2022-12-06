import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "../.././assets/banner.png";
import api from "../../api";
import { BookContext } from "../../context/BookContext";
import { IBook } from "../../interfaces/IBook.interface";
import { ICategory } from "../../interfaces/ICategory.interface";
import BookCard from "../common/BookCard";

const Home = () => {
  const { listBook, setListBook, reload, setReload } = useContext(BookContext);

  const [categoryId, setCategoryId] = useState<number>(0);

  const [bookHome, setBookHome] = useState<IBook[]>([] as IBook[]);
  // console.log(bookHome);

  // const bookHome = listBook;
  if (listBook.length > 10) {
    listBook.slice(0, 10);
  }

  useEffect(() => {
    setBookHome(listBook);
    if (categoryId != 0) {
      setBookHome(listBook.filter((c) => c.category.id == categoryId));

      // console.log(bookHome);
      // // setListBook(bookHome)
      // bookHome.filter((c) => c.category.id == categoryId);
    }
  }, [categoryId]);
  // const {listCategory} = useContext(CategoryContext)

  function handleClickCategory(id?: number) {
    // console.log(id);
    setCategoryId(id as number);
  }

  const [listCategory, setListCategory] = useState<ICategory[]>(
    [] as ICategory[]
  );

  useEffect(() => {
    const getListCategory = async () => {
      await api
        .get(`category`)
        .then((res) => {
          setListCategory(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListCategory();
  }, [reload]);

  return (
    <>
      <section className="flex justify-center relative max-w-[80%] m-auto">
        <div className="h-[300px]">
          <img src={banner} alt="banner" className="h-full object-cover" />
        </div>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white/50 text-[2rem] font-black p-8">
          <p>Welcome to the Library</p>
        </div>
      </section>
      <section className="max-w-[80%] m-auto">
        <h1 className="text-[2rem] font-semibold uppercase">Feature books</h1>
        <div className="border border-[#Dee2e6] rounded-md w-full flex flex-wrap">
          {/* left */}
          <div className="basis-1/5 p-5  border-r border-[#dee2e6] text-center min-w-min lg:block hidden">
            <h2 className="text-2xl  uppercase">Book Category</h2>
            <ul>
              {listCategory?.slice(0, 5).map((c) => (
                <li
                  className="cursor-pointer mt-2 hover:underline"
                  key={c.id}
                  onClick={() => handleClickCategory(c.id)}
                >
                  {c.name}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-[#0d6efd] cursor-pointer hover:underline">
              <Link to="/ShowBook">and more...</Link>
            </div>
          </div>
          {/* right */}
          <div
            className="lg:basis-4/5 flex flex-wrap md:justify-evenly gap-x-4 gap-y-8 p-5 justify-center"
            id="showBook"
          >
            {bookHome.length != 0
              ? bookHome?.map((book) => {
                  return <BookCard key={book.id} {...{book}}></BookCard>;
                })
              : listBook?.slice(0, 10).map((book) => {
                  return <BookCard key={book.id} {...{book}}></BookCard>;
                })}
          </div>
        </div>
        <div className="flex">
          <button className="border border-[#0D6EFD] rounded p-4 text-[#0D6EFD] m-auto mt-12 hover:underline">
            <Link to="/ShowBook">See more</Link>
          </button>
        </div>
      </section>

      <div className="bg-[#212529] mt-12 p-12">
        <div className="max-w-[80%] m-auto text-white text-center text-2xl">
          <div>
            <p>Want to issued book? Please <a className="text-[#0d6efd] cursor-pointer hover:underline">log in</a></p>
          </div>
          <div className="mt-4">
            <p>Don't have account yet? <a className="text-[#0d6efd] cursor-pointer hover:underline">Register</a> today </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
