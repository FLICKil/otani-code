import { Button, Box, Chip } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AdminContext } from "../../context/AdminContext";
import { BookContext } from "../../context/BookContext";
import { RentContext } from "../../context/RentContext";
import { SettingContext } from "../../context/SettingContext";
import { UserContext } from "../../context/UserContext";
import ModalAddIssue from "../admin/modal/ModalAddIssue";
import NotiStack from "../common/NotiStack";

const Dashboard = () => {
  const { listBook, setListBook } = useContext(BookContext);
  const { listRent, setListRent, rentInfo, setRentInfo, reload, setReload } =
    useContext(RentContext);
  const { listAdmin } = useContext(AdminContext);
  const { listUser } = useContext(UserContext);
  const { setting } = useContext(SettingContext);
  const [pageSize, setPageSize] = useState<number>(10);
  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = new Date(getDate()).toISOString();
  useEffect(() => {
    setListRent(listRent.filter(e => e.user.id === JSON.parse(localStorage.getItem('userInfo') as string).id));
  }, [reload]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "book", headerName: "Book", flex: 1 , minWidth: 100},
    { field: "startDate", headerName: "Start Date", flex: 1 , minWidth: 100},
    { field: "endDate", headerName: "End Date", flex: 1 , minWidth: 100},
    { field: "fines", headerName: "Fines", flex: 1 , minWidth: 70},
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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (param: GridCellParams) => {
    //     return (
    //       <Box>
    //         <Button
    //           variant="contained"
    //           sx={{ marginRight: "0.25rem" }}
    //           onClick={() => handleView(param)}
    //         >
    //           View
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const rows: GridRowsProp = listRent.filter(e => e.user.id === JSON.parse(localStorage.getItem('userInfo') as string).id).map((row) => {
    return {
      id: row.id,
      book: listBook.find((book) => book?.id == row.book?.id)?.title,
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

  return (
    <div className="max-w-[80%] m-auto">
      <div className="flex justify-between">
        <div className="text-3xl">Issue Book Detail</div>
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
    </div>
  );
};

export default Dashboard;
