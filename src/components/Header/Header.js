import React from "react";
import "./Header.css";
import Search from "../Search/Search";
import Tabs from "../Tabs/Tabs";

function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <Search />
      </div>
      <div className="header_right">
        <Tabs />
      </div>
    </div>
  );
}

export default Header;
