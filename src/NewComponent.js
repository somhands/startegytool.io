import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "./Component/Topbar";
import Channel from "./Component/Channels/Channel";
import Mediums from "./Component/Mediums/Mediums";
import Lists from "./Component/Lists/Lists";
import Nav_toggle from "./Component/Nav-toggle";
import enevlop from "./image/envelop.svg";
import { AuthTokenContext } from "./App";
import { Link, NavLink } from "react-router-dom";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;

const NewComponent = ({setAuthToken}) => {
  const authToken = useContext(AuthTokenContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(authToken.length === 0){
       navigate("/")
    }
  })
 
  return (
    <div className="no_scroll">
      <div className="wrapper">
        <Topbar setAuthToken={setAuthToken} />

        <aside className="sidebar-wrapper">
          <div className="iconmenu">
            <Nav_toggle />

            <Channel />
          </div>

          <Mediums />
               
        </aside>

        <Lists />

      </div>
    </div>
  );
};

export default NewComponent;
