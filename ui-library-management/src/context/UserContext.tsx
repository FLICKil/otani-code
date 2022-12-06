import React from "react";
import { createContext, useEffect, useState } from "react";
import {
  IContextProps,
  IUserContextType,
} from ".././interfaces/context.interface";
import UserApi from "../api/UserApi";
import { IUser } from "../interfaces/IUser.interface";

export const UserContext = createContext<IUserContextType>({
  userInfo: {} as IUser,
  setUserInfo: (userInfo: IUser) => {},
  listUser: [] as IUser[],
  setListUser: (listUser: IUser[]) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {}
  //   loading: false,
  //   setLoading: (loading: boolean) => {},
});

export const UserContextProvider = ({ children }: IContextProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  //   const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const { listUser, setListUser, reload, setReload } = UserApi();

  const userState = {
    userInfo,
    setUserInfo,
    listUser,
    setListUser,
    reload,
    setReload,
    isLogged,
    setIsLogged,
  };

  return (
    <UserContext.Provider value={userState as IUserContextType}>
      {children}
    </UserContext.Provider>
  );
};
