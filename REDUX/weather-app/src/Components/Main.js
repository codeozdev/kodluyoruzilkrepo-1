import React from "react";
import Header from "./Header";
import Highlights from "./Highlights";
import Weekly from "./Weekly";

const Main = () => {
  return (
    <div className="dark:bg-darkBg bg-bgMain h-screen w-main px-12 py-12">
      <Header />
      <Weekly />
      <Highlights />
    </div>
  );
};

export default Main;
