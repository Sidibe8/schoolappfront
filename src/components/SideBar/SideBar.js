import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SideBar.css";
import { appNavs, NavItemData } from "../../config"; // Assurez-vous d'importer NavItemData depuis le fichier de configuration
import SideBarNav from "./SidebarNav";
import SidebarNavToggle from "./SidebarNavToggle";

const SideBar = () => {
  const [expand, setExpand] = useState(false);

  let location = useLocation();

  useEffect(() => {
    setExpand(false);
  }, [location]);

  // Définissez le type des données de navigation ici pour s'assurer qu'elles sont compatibles avec SideBarNav
  const navigationData = appNavs();

  return (
    <>
      <div className="btn-sidebar-nav">
        <SidebarNavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </div>
      <div className={"sidebar " + (expand ? "visible" : "")}>
        <SideBarNav navs={navigationData} />
      </div>
    </>
  );
};

export default SideBar;
