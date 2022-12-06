import { Box, Button } from "@mui/material";
import {
  GridColDef,
  GridCellParams,
  GridRowsProp,
  DataGrid,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AuthorContext } from "../../context/AuthorContext";
import { BookContext } from "../../context/BookContext";
import { CategoryContext } from "../../context/CategoryContext";
import { PublisherContext } from "../../context/PublisherContext";
import NotiStack from "../common/NotiStack";
import ModalAddBook from "./modal/ModalAddBook";
import ModalDeleteBook from "./modal/ModalDeleteBook";
import ModalEditBook from "./modal/ModalEditBook";

export interface IOption {
  id?: number;
  label: string;
}

const AdminBook = () => {
  const { listBook, setListBook, bookInfo, setBookInfo, reload, setReload } =
    useContext(BookContext);
  const { adminInfo, listAdmin } = useContext(AdminContext);

  const { listAuthor } = useContext(AuthorContext);
  const { listCategory } = useContext(CategoryContext);
  const { listPublisher } = useContext(PublisherContext);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const [openNoti, setOpenNoti] = useState<boolean>(false);

  const [authorOption, setAuthorOption] = useState<IOption[]>([] as IOption[]);

  const [categoryOption, setCategoryOption] = useState<IOption[]>([] as IOption[]);

  const [publisherOption, setPublisherOption] = useState<IOption[]>([] as IOption[]);

  useEffect(() => {
    setAuthorOption(
      listAuthor.map((author) => {
        return { id: author.id, label: author.name };
      })
    );
    setCategoryOption(
      listCategory.map((category) => {
        return { id: category.id, label: category.name };
      })
    );
    setPublisherOption(
      listPublisher.map((publisher) => {
        return { id: publisher.id, label: publisher.name };
      })
    );
  }, [listAuthor, listCategory, listPublisher]);

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNoti(false);
  };

  useEffect(() => {
    setListBook(listBook);
  }, [reload]);

  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "cover",
      headerName: "Cover Image",
      flex: 0.75,
      // headerAlign: "center",
      align: "center",
      renderCell: (params: GridCellParams) => {
        return params.row.blob ? (
          <img
            className="h-full"
            src={`data:image/png;base64,` + params.row.blob}
          />
        ) : (
          "No Image"
        );
      },
    },
    { field: "title", headerName: "Title", flex: 1 ,minWidth: 100},
    { field: "author", headerName: "Author", flex: 1 , minWidth: 100},
    { field: "category", headerName: "Category", flex: 1 , minWidth: 100},
    { field: "publisher", headerName: "Publisher", flex: 1 , minWidth: 100},
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    { field: "createdBy", headerName: "Created by", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 170,
      flex: 1,
      renderCell: (param: GridCellParams) => {
        return (
          <Box>
            <Button
              variant="contained"
              sx={{ marginRight: "0.25rem" }}
              onClick={() => handleEdit(param)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(param)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
    { field: "blob", headerName: "Blob", flex: 1 },
  ];

  const rows: GridRowsProp = listBook.map((row) => {
    return {
      id: row.id,
      blob: row.coverImg,
      title: row.title,
      author: listAuthor.find((author) => author.id == row.author.id)?.name,
      category: listCategory.find((category) => category.id == row.category.id)
        ?.name,
      publisher: listPublisher.find(
        (publisher) => publisher.id == row.publisher.id
      )?.name,
      amount: row.amount,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      createdBy: listAdmin.find((admin) => admin.id == row.createdBy)?.name,
      updatedBy: listAdmin.find((admin) => admin.id == row.updatedBy)?.name,
    };
  });

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleDelete = (param: GridCellParams) => {
    setBookInfo({
      ...bookInfo,
      id: param.row.id,
      // name: param.row.name,
      // createdAt: param.row.createdAt,
      // updatedAt: param.row.updatedAt,
      // createdBy: param.row.createdBy,
      // updatedBy: param.row.updatedBy,
    });
    setOpenDelete(true);
  };

  const handleClose = (newValue?: string) => {
    setOpenEdit(false);
    setOpenAdd(false);
    setOpenDelete(false);

    if (newValue) {
      setValue(newValue);
      setOpenNoti(true);
    }
  };

  const handleEdit = (param: GridCellParams) => {
    setBookInfo({
      ...bookInfo,
      id: param.row.id,
      title: param.row.title,
      author: listAuthor.find((author) => author.name === param.row.author),
      category: listCategory.find(
        (category) => category.name === param.row.category
      ),
      publisher: listPublisher.find(
        (publisher) => publisher.name === param.row.publisher
      ),
      amount: param.row.amount,
      coverImg: param.row.blob,
      createdAt: param.row.createdAt,
      updateAt: param.row.updatedAt,
      createdBy: param.row.createdBy,
      updatedBy: param.row.updatedBy,
    });
    setOpenEdit(true);
  };

  return (
    <div className="max-w-[80%] m-auto">
      <div className="flex justify-between">
        <div className="text-3xl">Book Management</div>
        <div>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
      <Box sx={{ marginTop: "2rem" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                createdBy: false,
                updatedBy: false,
                blob: false,
                createdAt: false,
                updatedAt: false,
              },
            },
          }}
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </Box>
      <ModalEditBook
        open={openEdit}
        book={bookInfo}
        keepMounted
        onClose={handleClose}
        options={[authorOption, categoryOption, publisherOption]}
      />
      <ModalDeleteBook
        open={openDelete}
        book={bookInfo}
        keepMounted
        onClose={handleClose}
      />
      <ModalAddBook open={openAdd} keepMounted onClose={handleClose} options={[authorOption, categoryOption, publisherOption]}/>
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default AdminBook;
