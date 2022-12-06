import { createContext, useState } from "react";
import CategoryApi from "../api/CategoryApi";
import {
  ICategoryContextType,
  IContextProps,
} from "../interfaces/context.interface";
import { ICategory } from "../interfaces/ICategory.interface";

export const CategoryContext = createContext<ICategoryContextType>({
  categoryInfo: {} as ICategory,
  setCategoryInfo: (categoryInfo: ICategory) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  listCategory: [] as ICategory[],
  setListCategory: (listCategory: ICategory[]) => {},
});

export const CategoryContextProvider = ({ children }: IContextProps) => {
  const [categoryInfo, setCategoryInfo] = useState<ICategory | null>(null);
  const { listCategory, setListCategory, reload, setReload } = CategoryApi();

  const categoryState = {
    categoryInfo,
    setCategoryInfo,
    reload,
    setReload,
    listCategory,
    setListCategory
  };

  return (
    <CategoryContext.Provider value={categoryState as ICategoryContextType}>
      {children}
    </CategoryContext.Provider>
  );
};
