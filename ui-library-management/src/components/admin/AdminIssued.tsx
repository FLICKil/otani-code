import { Box, Button, Chip } from "@mui/material";
import {
  GridColDef,
  GridCellParams,
  GridRowsProp,
  DataGrid,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AdminContext } from "../../context/AdminContext";
import { BookContext } from "../../context/BookContext";
import { RentContext } from "../../context/RentContext";
import { SettingContext } from "../../context/SettingContext";
import { UserContext } from "../../context/UserContext";
import NotiStack from "../common/NotiStack";
import { IOption } from "./AdminBook";
import ModalAddIssue from "./modal/ModalAddIssue";

const AdminIssued = () => {
  const { listRent, setListRent, rentInfo, setRentInfo, reload, setReload } =
    useContext(RentContext);
  const { listAdmin } = useContext(AdminContext);
  const { listBook } = useContext(BookContext);
  const { listUser } = useContext(UserContext);
  const { setting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [bookOption, setBookOption] = useState<IOption[]>([] as IOption[]);
  const [userOption, setUserOption] = useState<IOption[]>([] as IOption[]);
  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = new Date(getDate()).toISOString();

  useEffect(() => {
    setBookOption(
      listBook.map((item) => {
        return {
          id: item.id,
          label:
            item.title +
            ` - (${
              item.amount -
              listRent.filter((b) => b.book.id == item.id && b.endDate == null)
                .length
            })`,
        };
      })
    );
    setUserOption(
      listUser
        .filter((item) => item.active)
        .map((item) => {
          return { id: item.id, label: item.name };
        })
    );
  }, [listUser, listBook]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);
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
    setListRent(listRent);
  }, [reload]);

  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "book", headerName: "Book", flex: 1, minWidth: 100 },
    { field: "user", headerName: "User", flex: 1, minWidth: 100 },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 100},
    { field: "endDate", headerName: "End Date", flex: 1 , minWidth: 100},
    { field: "fines", headerName: "Fines", flex: 1, minWidth: 70 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (param: GridCellParams) => {
        return param.row.status == 1 ? (
          <Chip label="Return" color="primary" />
        ) : (
          <Chip label="Issue" color="warning" />
        );
      },
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    { field: "createdBy", headerName: "Created by", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (param: GridCellParams) => {
        return (
          <Box>
            <Button
              variant="contained"
              sx={{ marginRight: "0.25rem" }}
              onClick={() => handleView(param)}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows: GridRowsProp = listRent.map((row) => {
    return {
      id: row.id,
      book: listBook.find((book) => book?.id == row.book?.id)?.title,
      user: listUser.find((user) => user?.id == row.user?.id)?.name,
      startDate: row.startDate,
      endDate: row.endDate,
      fines: row.endDate
        ? row.fines
        : ((new Date(today) as unknown as number) -
            (new Date(row.startDate) as unknown as number)) /
            86400000 -
            setting?.bookReturnDay <
          0
        ? 0
        : (
            (((new Date(today) as unknown as number) -
              (new Date(row.startDate) as unknown as number)) /
              86400000 -
              setting?.bookReturnDay) *
            setting?.oneDayFee
          ).toFixed(2),
      status: row.endDate ? 1 : 0,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      createdBy: listAdmin.find((admin) => admin.id == row.createdBy)?.name,
      updatedBy: listAdmin.find((admin) => admin.id == row.updatedBy)?.name,
    };
  });

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = (newValue?: string) => {
    setOpenAdd(false);

    if (newValue) {
      setValue(newValue);
      setOpenNoti(true);
    }
  };

  const handleView = (param: GridCellParams) => {
    setRentInfo({
      ...listRent.find((rent) => {
        return rent.id == param.row.id;
      }),
      fines: param.row.fines,
    });
    navigate("/IssueDetails");
  };

  return (
    <div className="max-w-[80%] m-auto">
      <div className="flex justify-between">
        <div className="text-3xl">Issue Book Management</div>
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
                createdAt: false,
                updatedAt: false,
              },
            },
            sorting: {
              sortModel: [{ field: "status", sort: "asc" }],
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
      <ModalAddIssue
        open={openAdd}
        keepMounted
        onClose={handleClose}
        options={[bookOption, userOption]}
      />
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default AdminIssued;
