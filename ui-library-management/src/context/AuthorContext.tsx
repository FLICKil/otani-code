import { createContext, useState } from "react";
import AuthorApi from "../api/AuthorApi";
import {
  IAuthorContextType,
  IContextProps,
} from "../interfaces/context.interface";
import { IAuthor } from "../interfaces/IAuthor.interface";

export const AuthorContext = createContext<IAuthorContextType>({
  authorInfo: {} as IAuthor,
  setAuthorInfo: (authorInfo:IAuthor) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  listAuthor: [] as IAuthor[],
  setListAuthor: (listAuthor: IAuthor[]) => {},
});

export const AuthorContextProvider = ({ children }: IContextProps) => {
  const [authorInfo, setAuthorInfo] = useState<IAuthor | null>(null);
  const { listAuthor, setListAuthor, reload, setReload } = AuthorApi();

  const authorState = {
    authorInfo,
    setAuthorInfo,
    reload,
    setReload,
    listAuthor,
    setListAuthor
  };

  return (
    <AuthorContext.Provider value={authorState as IAuthorContextType}>
      {children}
    </AuthorContext.Provider>
  );
};
