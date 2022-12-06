import { useEffect, useState } from "react";
import api from "../api";
import { IUser } from "../interfaces/IUser.interface";

const UserApi = () => {
  const [listUser, setListUser] = useState<IUser[]>([] as IUser[]);

  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const getListUser = async () => {
      await api
        .get(`users`)
        .then((res) => {
          setListUser(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListUser();
  }, [reload]);

  return {
    listUser,
    setListUser,
    reload,
    setReload,
  };
};

export default UserApi;
