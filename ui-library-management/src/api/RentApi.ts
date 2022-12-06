import { useEffect, useState } from "react";
import api from "../api";
import { IRent } from "../interfaces/IRent.interface";

const RentApi = () => {
  const [reload, setReload] = useState<boolean>(false);


  const [listRent, setListRent] = useState<IRent[]>(
    [] as IRent[]
  );

  useEffect(() => {
    const getListRent = async () => {
      await api
        .get(`rent`)
        .then((res) => {
          setListRent(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListRent();
  }, [reload]);

  return {
    listRent,
    setListRent,
    reload,
    setReload,
  };
};

export default RentApi;
