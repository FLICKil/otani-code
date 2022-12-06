import { useEffect, useState } from "react";
import api from "../api";
import { IPublisher } from "../interfaces/IPublisher.interface";

const PublisherApi = () => {
  const [reload, setReload] = useState<boolean>(false);


  const [listPublisher, setListPublisher] = useState<IPublisher[]>(
    [] as IPublisher[]
  );

  useEffect(() => {
    const getListPublisher = async () => {
      await api
        .get(`publisher`)
        .then((res) => {
          setListPublisher(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListPublisher();
  }, [reload]);

  return {
    listPublisher,
    setListPublisher,
    reload,
    setReload,
  };
};

export default PublisherApi;
