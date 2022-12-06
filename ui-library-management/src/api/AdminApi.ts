import { useEffect, useState } from "react";
import api from "../api";
import { IAdmin } from "../interfaces/IAdmin.interface";

const AdminApi = () => {
  const [listAdmin, setListAdmin] = useState<IAdmin[]>([] as IAdmin[]);

  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const getListAdmin = async () => {
      await api
        .get(`admin`)
        .then((res) => {
          setListAdmin(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListAdmin();
  }, [reload]);

  return {
    listAdmin,
    setListAdmin,
    reload,
    setReload,
  };
};

export default AdminApi;
