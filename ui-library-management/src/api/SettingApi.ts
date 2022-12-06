import { useEffect, useState } from "react";
import api from "../api";
import { ISetting } from "../interfaces/ISetting.interface";

const SettingApi = () => {
  const [reload, setReload] = useState<boolean>(false);


  const [setting, setSetting] = useState<ISetting | null>(null);

  useEffect(() => {
    const getListSetting = async () => {
      await api
        .get(`setting/1`)
        .then((res) => {
          setSetting(res.data);
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    };

    getListSetting();
  }, [reload]);

  return {
    setting,
    setSetting,
    reload,
    setReload,
  };
};

export default SettingApi;
