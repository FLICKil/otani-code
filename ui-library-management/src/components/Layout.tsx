import React, { useEffect } from "react";
import Root from "../root";
import Footer from "./common/Footer";
import Header from "./common/Header";
import HomeBar from "./common/HomeBar";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FunctionComponent = () => {


  return (
    <>
      <Header></Header>

      <div className="m-auto">
        <Root></Root>
      </div>

      <Footer></Footer>
    </>
  );
};
