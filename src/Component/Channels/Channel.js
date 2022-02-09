import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Platform from "./Platform"


const Channel = () => {


  const [channels, setChannels] = useState([]);

  const [active , setActive] = useState()
  const navigate = useNavigate();
  useEffect(() => {




    
    const fetchData = async () => {
      const { data } = await axios.get("https://strategytooladmin.handsintechnology.in/api/channels?populate=icon" )
      // , {
      //   headers: {
      //     Authorization: ()
      //   }
      // });
      setChannels(data.data);
      console.log(data.data);
    };
    fetchData();
  }, []);

  const clickHandler = (path) => {
    navigate(`/${path}`, { state: path });
    setActive(path)
    console.log(path)
  };

  return (
    <div>
      <ul className="nav nav-pills flex-column">
        {channels.map((e) => {

const channel = e.attributes.text;

const icon = e.attributes.icon;


          return (
            <li
              key={e.id}
              className="nav-item fontss"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              
              title={channel}
              
            >
              <p
                to={`/${channel}`}
                className="nav-link"
                data-bs-target={`#${channel}`}
                style={channel === active ? {backgroundColor: '#D5E0F1'} : null}
                onClick={() => clickHandler(channel)}
              >
                <img src={`https://strategytooladmin.handsintechnology.in/${
                            icon["data"]["attributes"]["url"]}`} style={{height:"2vh" , marginRight:"5px"}}></img>  

                {/* <img src={Facebook}></img> */}
                {channel}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channel;
