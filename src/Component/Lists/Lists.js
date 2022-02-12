import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Lists.css";
import envelop from "../../image/33.png";
import { Buffer } from "buffer";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import $ from "jquery";
import { IoIosArrowDropleft } from "react-icons/io";

const List = () => {
  const [lists, setLists] = useState([]);
  const [show, toggleShow] = useState({});
  const [active, setActive] = useState();
  const [saved, setSaved] = useState([]);
  const [hot, setHot] = useState([]);
  const [isSavedClass, setIsSavedClass] = useState(false);

  // console.log({saveToggle})
  

  const [searchTerm, setSearchTerm] = useState("");

  const { state } = useLocation();

  const location = useLocation();

  let result = location.pathname;

  let channel = result.split("/")[1];

  let medium = result.split("/")[2];

  

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://strategytooladmin.handsintechnology.in/api/lists?filters[channel][text]=${channel}&filters[medium][medium]=${medium}&populate=contentMedia&poulate=hot`
      );
      setLists(data.data);
    };
    fetchData();
    
  }, [medium]);

  const savedHandler = () => {
    // lists.filter((list) => list.id === )

    setLists(saved);
  };

  // const reverse = (x) => {

  // console.log(x)
  // }

  const elementSavedHandler = (e) => {
    const output = saved.filter((saveElement) => saveElement.id === e.id);
    if (output.length === 0) {
      setSaved((prev) => [...prev, e]);
      // setIsSavedClass(true)
      lists.reduce((acc, curr) => {
        if (curr.id === e.id) {
          curr.saved = true;
        }
        acc = [...acc, curr];
        return acc;
      }, []);
    } else {
      const result = saved.filter((saveElement) => saveElement.id !== e.id);
      setSaved(result);
      // setIsSavedClass(false)
      lists.reduce((acc, curr) => {
        if (curr.id === e.id) {
          curr.saved = false;
        }
        acc = [...acc, curr];
        return acc;
      }, []);
    }
  };

  const newResults = () => {
    const output = lists.reduce((acc, curr, index) => {
      acc[lists.length - index - 1] = curr;
      return acc;
    }, []);
    setLists(output);
  };

  // const searchHandler = (e) => {

  //   let x = document.querySelector('.button')
  //   if(e.target !== x){
  //  document.querySelector(".buttonn").style.display = "none"
  //   }else if (e.target === x){
  //     window.addEventListener("click" , () => {
  //       document.querySelector(".buttonn").style.display = "block"
  //     })

  //   }
  // }

  // // let y = document.querySelector('.no_scroll')

  // {

  // }

  // const hotList = () => {

  //  let x  = hot.attributes.hot

  //   console.log({x})

  // }

  // const newHot = async () => {

  //       const {data} = await axios.get("https://strategytooladmin.handsintechnology.in/api/lists?filters[hot]=true")
  //       setHot(data.data)
  //       console.log(data.data)

  //   console.log(hot)
  // }

  const Hidden = () => {
    if ($(window).width() < 600) {
      document.getElementById("hidden").style.display = "none";
    } else {
      document.getElementById("hidden").style.display = "block";
    }
  };
  const Show = () => {
    document.getElementById("hidden").style.display = "block";
  };

  return (
    <div>
      {/*start sidebar */}
      {/*start content*/}
      <main className="page-content">
        {/*start email wrapper*/}
        <div className="email-wrapper">
          <div className="email-sidebar" id="hidden">
            <div className="email-sidebar-content">
              <div className="email-navigation">
                <div className="list-group list-group-flush">
                  <div className="box_fixed">
                    <div
                      style={{ display: "flex", backgroundColor: "#F0F0F0" , height:"45px"}}
                    >
                      <div>
                        <form className="search_form">
                          <input
                            type="search"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </form>
                      </div>
                      {/* onClick={setSaved(lists.attributes)} */}
                      <div onClick={savedHandler} className="buttonn">
                        <div className="iconn">
                          <i className="fa fa-floppy-o"></i>
                        </div>
                        <p className="count">{saved.length}</p>
                      </div>
                    </div>

                    <ButtonGroup aria-label="Basic example">
                      <Button
                        className="buttonGroup"
                        style={{
                          backgroundColor: "White",
                          color: "black",
                          border: "1px solid black",
                        }}
                      >
                        Hot
                      </Button>
                      <Button
                        className="buttonGroup"
                        style={{
                          backgroundColor: "White",
                          color: "black",
                          border: "1px solid black",
                        }}
                        onClick={newResults}
                      >
                        New
                      </Button>
                    </ButtonGroup>
                  </div>

                  {/* {hot.filter((val) => {
                    if (searchTerm === ""){
                      return val
                    } else if (val.attributes.list.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val
                    }
                  }).map((e) => {
                    const list = ReactHtmlParser(e.attributes.list);
                    
                    const content = e.attributes.content;

                    return (
                      <div className="list-height">
                        <li
                          href="javascript:;"
                          className="list-group-item  align-items-center fontss list-hover"
                          data-bs-toggle="pill"
                          onClick={() => { 

                           toggleShow({ id: e.id });
                           setActive(list);
                          }}
                          style={list === active ? {backgroundColor: '#D5E0F1'} : null}
                        >
                          <div key={e.id} className="box" style={{cursor:"pointer"}}>
                            <p className="list-para1">{list}</p>

                            <p className="List-para">{content}</p>
                            <div onClick={() => elementSavedHandler(e)}  
                              className={e.saved ? "buttonActive" : "button"} >
                              <div class="iconn">
                                <i class="fa fa-floppy-o"></i>
                              </div>
                            </div>
                           
                          </div>
                        </li>
                      </div>
                    );
                  })} */}

                  {lists
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.attributes.list
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((e) => {
                      const list = ReactHtmlParser(e.attributes.list);
                      //const listReverse = e.attributes.list.reverse()
                      const content = e.attributes.content;

                      return (
                        <div
                          className="list-height"
                          style={{ cursor: "pointer" }}
                        >
                          <li
                            href="javascript:;"
                            className="list-group-item  align-items-center fontss list-hover"
                            data-bs-toggle="pill"
                            style={
                              e.id === active
                                ? { backgroundColor: "#D5E0F1" }
                                : null
                            }
                            onClick={() => {
                              toggleShow({ id: e.id });
                              setActive(e.id);
                            }}
                          >
                            <div  key={e.id} className="box">
                              <div onClick={Hidden}>
                                <p className="list-para1">{list}</p>

                                <p className="List-para">{content}</p>
                              </div>

                              <div
                                onClick={() => elementSavedHandler(e)}
                                className={e.saved ? "buttonActive" : "button"}
                              >
                                <div class="iconn">
                                  <i class="fa fa-floppy-o"></i>
                                </div>
                              </div>
                              {/* <p className="save-btn">Save Button</p> */}
                              {/* </p> */}
                            </div>
                          </li>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="email-content">
            {/* <div> */}
            <button onClick={Show} className="show_lsit">
              <IoIosArrowDropleft />
            </button>
            <div className="email-read-box p-3">
              {lists.map((e) => {
                const list = ReactHtmlParser(e.attributes.list);

                const content = ReactHtmlParser(e.attributes.content);
                const content1 = ReactHtmlParser(e.attributes.content1);
                const img = e.attributes.contentMedia.data;

                

                // const photo = e.contentMedia.url;

                // console.log({ photo });
                return (
                  <div>
                    {e.id === show.id && (
                      <div>
                        <h4 key={e.id} className="fontss">
                          {list}
                        </h4>
                        <hr />
                        <div className="email-read-content">
                          {/* <ReactMarkdown escapeHtml={false} >
                            {content}
                            </ReactMarkdown> */}
                          {content}

                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".gif")
                              return (
                                <img
                                  src={`https://strategytooladmin.handsintechnology.in/${i["attributes"]["url"]}`}
                                  style={{
                                    height: "25vh",
                                    width: "20vw",
                                    marginRight: "5px",
                                  }}
                                ></img>
                              );
                          })}
                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".png")
                              return (
                                <img
                                  src={`https://strategytooladmin.handsintechnology.in/${i["attributes"]["url"]}`}
                                  style={{
                                    height: "25vh",
                                    width: "20vw",
                                    marginRight: "5px",
                                  }}
                                ></img>
                              );
                          })}
                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".jpeg")
                              return (
                                <img
                                  src={`https://strategytooladmin.handsintechnology.in/${i["attributes"]["url"]}`}
                                  style={{
                                    height: "25vh",
                                    width: "20vw",
                                    marginRight: "5px",
                                  }}
                                ></img>
                              );
                          })}
                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".svg")
                              return (
                                <img
                                  src={`https://strategytooladmin.handsintechnology.in/${i["attributes"]["url"]}`}
                                  style={{
                                    height: "25vh",
                                    width: "20vw",
                                    marginRight: "5px",
                                  }}
                                ></img>
                              );
                          })}
                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".mp4")
                              return (
                                <video
                                  src={`https://strategytooladmin.handsintechnology.in/${i["attributes"]["url"]}`}
                                  autoPlay
                                  controls
                                  style={{
                                    height: "45vh",
                                    width: "40vw",
                                    marginRight: "5px",
                                    textAlign: "center",
                                  }}
                                ></video>
                              );
                          })}
                          <p className="fontss">{content1}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* </div> */}
          </div>

          {/*start email overlay*/}
          {/* <div className="overlay email-toggle-btn-mobile" /> */}
          {/*end email overlay*/}
        </div>
        {/*end email wrapper*/}
      </main>
      {/*end page main*/}
    </div>
  );
};

export default List;
