import { useEffect, useState } from "react";
import api from "../api";
import { IAuthor } from "../interfaces/IAuthor.interface";

const AuthorApi = () => {
  const [reload, setReload] = useState<boolean>(false);


  const [listAuthor, setListAuthor] = useState<IAuthor[]>(
    [] as IAuthor[]
  );

  useEffect(() => {
    const getListAuthor = async () => {
      await api
        .get(`author`)
        .then((res) => {
          setListAuthor(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListAuthor();
  }, [reload]);

  return {
    listAuthor,
    setListAuthor,
    reload,
    setReload,
  };
};

export default AuthorApi;
