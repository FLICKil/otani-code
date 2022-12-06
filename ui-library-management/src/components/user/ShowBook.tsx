import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { BookContext } from "../../context/BookContext";
import { IBook } from "../../interfaces/IBook.interface";
import BookCard from "../common/BookCard";
import ReactPaginate from "react-paginate";
import "./ShowBook.css";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  InputAdornment,
} from "@mui/material";
import { RentContext } from "../../context/RentContext";
import SearchIcon from "@mui/icons-material/Search";

const ShowBook = () => {
  const { listBook, setListBook } = useContext(BookContext);
  const [currentItems, setCurrentItems] = useState<IBook[]>([] as IBook[]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { listRent } = useContext(RentContext);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(
      filter.trim() == ""
        ? listBook.slice(itemOffset, endOffset)
        : listBook
            .filter((item) => {
              return (
                item.title
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.author.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.category.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.publisher.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase())
              );
            })
            .slice(itemOffset, endOffset)
    );
    setPageCount(
      filter == ""
        ? Math.ceil(listBook.length / itemsPerPage)
        : Math.ceil(
            listBook.filter((item) => {
              return (
                item.title
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.author.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.category.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()) ||
                item.publisher.name
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase())
              );
            }).length / itemsPerPage
          )
    );
  }, [itemOffset, itemsPerPage, listBook, filter]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }): void => {
    const newOffset = (event.selected * itemsPerPage) % listBook.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="max-w-[80%] m-auto">
      <div className="flex justify-between sm:flex-row flex-col">
        <h1 className="text-3xl mb-3">ShowBook</h1>
        <TextField
          size="small"
          placeholder="Search"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      <div className="flex flex-wrap mt-6 justify-center gap-y-6 sm:justify-evenly gap-x-3">
        {currentItems.length > 0 ? currentItems.map((book) => {
          if (
            book.amount -
              listRent.filter((b) => b.book.id == book.id && b.endDate == null)
                .length >
            0
          ) {
            return <BookCard key={book.id} {...{ book }}></BookCard>;
          } else
            return (
              <BookCard
                key={book.id}
                {...{ book, status: "unavailable" }}
              ></BookCard>
            );
        }) : <div>No Book found</div>}
      </div>
      <div className="flex items-center justify-end mt-6 sm:flex-row flex-col">
        <div className="mb-2 sm:mb-0 flex items-center sm:mr-2">
          <h5 className="mr-2">Books per page</h5>
          <Select
            id="bookPerPage"
            value={itemsPerPage as unknown as string}
            onChange={handleChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          // renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default ShowBook;
