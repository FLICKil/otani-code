import React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../interfaces/IBook.interface";

const BookCard = (props: { book: IBook; status?: string }) => {
  return (
    <Link to={`/BookDetails/${props.book.id}`}
      className={
        props.status == null
          ? "border border-[#dee2e6] p-1 rounded max-w-min cursor-pointer"
          : `border border-[#dee2e6] p-1 rounded max-w-min cursor-pointer ${props.status}`
      }
    >
      <div className="w-[200px] h-[200px] border border-[#dee2e6] bg-[#E5E5E5]">
        {props.book.coverImg != null ? (
          <img
            className="object-cover m-auto"
            src={`data:image/png;base64,` + props.book.coverImg}
            alt={props.book.title}
          ></img>
        ) : (
          <p className="text-center">No Image</p>
        )}
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="font-semibold text-xl text-ellipsis text-center">
          {props.book.title}
        </div>
        <div className="italic">{props.book.author.name}</div>
      </div>
    </Link>
  );
};

export default BookCard;
