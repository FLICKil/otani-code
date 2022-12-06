import React from "react";
import { createContext, useEffect, useState } from "react";
import {
  IAdminContextType,
  IContextProps,
} from ".././interfaces/context.interface";
import { IAdmin } from ".././interfaces/IAdmin.interface";
import AdminApi from ".././api/AdminApi";

export const AdminContext = createContext<IAdminContextType>({
  adminInfo: {} as IAdmin,
  setAdminInfo: (adminInfo: IAdmin) => {},
  listAdmin: [] as IAdmin[],
  setListAdmin: (listAdmin: IAdmin[]) => {},
  isLogged: false,
  setIsLogged: (isLogged:boolean) => {},
  isAdmin: false,
  setIsAdmin: (isAdmin:boolean) => {},
  reload: false,
  setReload: (reload:boolean) => {},
  loading: false,
  setLoading: (loading:boolean) => {},
});

export const AdminContextProvider = ({ children }: IContextProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [adminInfo, setAdminInfo] = useState<IAdmin | null>(null);

  const { listAdmin, setListAdmin, reload, setReload } = AdminApi();

  const adminState = {
    adminInfo,
    setAdminInfo,
    listAdmin,
    setListAdmin,
    reload,
    setReload,
    isLogged,
    setIsLogged,
    loading,
    setLoading,
    isAdmin,
    setIsAdmin,
  };

  return (
    <AdminContext.Provider value={adminState as IAdminContextType}>
      {children}
    </AdminContext.Provider>
  );
};
