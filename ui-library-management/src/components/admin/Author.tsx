import React, { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";
import { AuthorContext } from "../../context/AuthorContext";
import { Box, Button } from "@mui/material";
import ModalEditAuthor from "./modal/ModalEditAuthor";
import { AdminContext } from "../../context/AdminContext";
import ModalDeleteAuthor from "./modal/ModalDeleteAuthor";
import NotiStack from "../common/NotiStack";
import ModalAddAuthor from "./modal/ModalAddAuthor";

const Author = () => {
  const {
    listAuthor,
    setListAuthor,
    authorInfo,
    setAuthorInfo,
    reload,
    setReload,
  } = useContext(AuthorContext);
  const { adminInfo, listAdmin } = useContext(AdminContext);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const [openNoti, setOpenNoti] = useState<boolean>(false);

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
    setListAuthor(listAuthor);
  }, [reload]);

  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Name", flex: 1 , minWidth:100},
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    { field: "createdBy", headerName: "Created by", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 170,
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
  ];

  const rows: GridRowsProp = listAuthor.map((row) => {
    return {
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      createdBy: listAdmin.find((admin) => admin.id == row.createdBy)?.name,
      updatedBy: listAdmin.find((admin) => admin.id == row.updatedBy)?.name,
      action: null,
    };
  });

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleDelete = (param: GridCellParams) => {
    setAuthorInfo({
      ...authorInfo,
      id: param.row.id,
      name: param.row.name,
      createdAt: param.row.createdAt,
      updateAt: param.row.updatedAt,
      createdBy: param.row.createdBy,
      updatedBy: param.row.updatedBy,
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
    setAuthorInfo({
      ...authorInfo,
      id: param.row.id,
      name: param.row.name,
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
        <div className="text-3xl">Author Management</div>
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
      <ModalEditAuthor
        open={openEdit}
        author={authorInfo}
        keepMounted
        onClose={handleClose}
      />
      <ModalDeleteAuthor
        open={openDelete}
        author={authorInfo}
        keepMounted
        onClose={handleClose}
      />
      <ModalAddAuthor
        open={openAdd}
        keepMounted
        onClose={handleClose}
      />
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default Author;
