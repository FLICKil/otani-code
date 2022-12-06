import { createContext, useState } from "react";
import RentApi from "../api/RentApi";
import {
  IContextProps, IRentContextType,
} from "../interfaces/context.interface";
import { IRent } from "../interfaces/IRent.interface";

export const RentContext = createContext<IRentContextType>({
  rentInfo: {} as IRent,
  setRentInfo: (rentInfo: IRent) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  listRent: [] as IRent[],
  setListRent: (listRent: IRent[]) => {},
});

export const RentContextProvider = ({ children }: IContextProps) => {
  const [rentInfo, setRentInfo] = useState<IRent | null>(null);
  const { listRent, setListRent, reload, setReload } = RentApi();

  const rentState = {
    rentInfo,
    setRentInfo,
    reload,
    setReload,
    listRent,
    setListRent
  };

  return (
    <RentContext.Provider value={rentState as IRentContextType}>
      {children}
    </RentContext.Provider>
  );
};
