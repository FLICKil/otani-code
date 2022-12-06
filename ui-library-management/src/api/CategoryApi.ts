import { useEffect, useState } from "react";
import api from "../api";
import { ICategory } from "../interfaces/ICategory.interface";

const CategoryApi = () => {
  const [reload, setReload] = useState<boolean>(false);


  const [listCategory, setListCategory] = useState<ICategory[]>(
    [] as ICategory[]
  );

  useEffect(() => {
    const getListCategory = async () => {
      await api
        .get(`category`)
        .then((res) => {
          setListCategory(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListCategory();
  }, [reload]);

  return {
    listCategory,
    setListCategory,
    reload,
    setReload,
  };
};

export default CategoryApi;
