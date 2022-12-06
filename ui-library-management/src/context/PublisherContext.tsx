import { createContext, useState } from "react";
import PublisherApi from "../api/PublisherApi";
import {
  IPublisherContextType,
  IContextProps,
} from "../interfaces/context.interface";
import { IPublisher } from "../interfaces/IPublisher.interface";

export const PublisherContext = createContext<IPublisherContextType>({
  publisherInfo: {} as IPublisher,
  setPublisherInfo: (publisherInfo:IPublisher) => {},
  reload: false,
  setReload: (reload: boolean) => {},
  listPublisher: [] as IPublisher[],
  setListPublisher: (listPublisher: IPublisher[]) => {},
});

export const PublisherContextProvider = ({ children }: IContextProps) => {
  const [publisherInfo, setPublisherInfo] = useState<IPublisher | null>(null);
  const { listPublisher, setListPublisher, reload, setReload } = PublisherApi();

  const publisherState = {
    publisherInfo,
    setPublisherInfo,
    reload,
    setReload,
    listPublisher,
    setListPublisher
  };

  return (
    <PublisherContext.Provider value={publisherState as IPublisherContextType}>
      {children}
    </PublisherContext.Provider>
  );
};
