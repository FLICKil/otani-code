import { createContext, useState } from "react";
import SettingApi from "../api/SettingApi";
import {
  ISettingContextType,
  IContextProps,
} from "../interfaces/context.interface";
import { ISetting } from "../interfaces/ISetting.interface";

export const SettingContext = createContext<ISettingContextType>({
  setting: {} as ISetting,
  setSetting: (setting: ISetting) => {},
  reload: false,
  setReload: (reload: boolean) => {},
});

export const SettingContextProvider = ({ children }: IContextProps) => {
  const { setting, setSetting, reload, setReload } = SettingApi();

  const settingState = {
    setting,
    setSetting,
    reload,
    setReload,
  };

  return (
    <SettingContext.Provider value={settingState as ISettingContextType}>
      {children}
    </SettingContext.Provider>
  );
};
