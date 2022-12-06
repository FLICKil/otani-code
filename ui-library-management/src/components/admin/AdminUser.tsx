import { Box, Button, Chip } from "@mui/material";
import {
  GridColDef,
  GridCellParams,
  GridRowsProp,
  DataGrid,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { UserContext } from "../../context/UserContext";
import NotiStack from "../common/NotiStack";
import ModalDeacUser from "./modal/ModalDeacUser";

const AdminUser = () => {
  const { listUser, setListUser, userInfo, setUserInfo, reload, setReload } =
    useContext(UserContext);
  const { adminInfo, listAdmin } = useContext(AdminContext);

  // const [openEdit, setOpenEdit] = useState<boolean>(false);
  // const [openAdd, setOpenAdd] = useState<boolean>(false);
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
    setListUser(listUser);
  }, [reload]);

  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Name", flex: 1 , minWidth: 80},
    { field: "email", headerName: "Email", flex: 1 , minWidth: 120},
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (param: GridCellParams) => {
        return !!param.row.active ? (
          <Chip label="Enable" color="success" />
        ) : (
          <Chip label="Deactive" color="error" />
        );
      },
    },
    { field: "createdAt", headerName: "Created At", flex: 1, },
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
              color="error"
              sx={{ marginRight: "0.25rem" }}
              onClick={() => handleDelete(param)}
            >
              Change Status
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows: GridRowsProp = listUser.map((row) => {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      active: row.active,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      createdBy: listAdmin.find((admin) => admin.id == row.createdBy)?.name,
      updatedBy: listAdmin.find((admin) => admin.id == row.updatedBy)?.name,
      action: null,
    };
  });

  const handleDelete = (param: GridCellParams) => {
    setUserInfo({
      ...userInfo,
      id: param.row.id,
      name: param.row.name,
      active: param.row.active,
      updatedBy: param.row.updatedBy,
    });
    setOpenDelete(true);
  };

  const handleClose = (newValue?: string) => {
    setOpenDelete(false);

    if (newValue) {
      setValue(newValue);
      setOpenNoti(true);
    }
  };

  return (
    <div className="max-w-[80%] m-auto">
      <div className="flex justify-between">
        <div className="text-3xl">User Management</div>
        {/* <div>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </div> */}
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
      {/* <ModalEditUser
        open={openEdit}
        user={userInfo}
        keepMounted
        onClose={handleClose}
      /> */}
      <ModalDeacUser
        open={openDelete}
        user={userInfo}
        keepMounted
        onClose={handleClose}
      />
      {/* <ModalAddUser
        open={openAdd}
        keepMounted
        onClose={handleClose}
      /> */}
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default AdminUser;
