import React, { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";
import { CategoryContext } from "../../context/CategoryContext";
import {  Box, Button } from "@mui/material";
import ModalEditCategory from "./modal/ModalEditCategory";
import { AdminContext } from "../../context/AdminContext";
import ModalDeleteCategory from "./modal/ModalDeleteCategory";
import NotiStack from "../common/NotiStack";
import ModalAddCategory from "./modal/ModalAddCategory";

const Category = () => {
  const {
    listCategory,
    setListCategory,
    categoryInfo,
    setCategoryInfo,
    reload,
  } = useContext(CategoryContext);
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
    setListCategory(listCategory);
  }, [reload]);

  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 100},
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

  const rows: GridRowsProp = listCategory.map((row) => {
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
    setCategoryInfo({
      ...categoryInfo,
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
    setCategoryInfo({
      ...categoryInfo,
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
        <div className="text-3xl">Category Management</div>
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
      <ModalEditCategory
        open={openEdit}
        category={categoryInfo}
        keepMounted
        onClose={handleClose}
      />
      <ModalDeleteCategory
        open={openDelete}
        category={categoryInfo}
        keepMounted
        onClose={handleClose}
      />
      <ModalAddCategory open={openAdd} keepMounted onClose={handleClose}/>
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default Category;
