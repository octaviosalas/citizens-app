import React, { useEffect, useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { useNavigate } from "react-router-dom";

const menuPages = new Map([
  ["home", ["By Location", "By Type of Publication", "Other Filters"]],
  ["By Location", [
    "Ohio, USA",
    "Manhattan, USA",
    "Chicago, Illinois",
    "Los Angeles, California",
    "Miami, Florida",
    "Las Vegas, Nevada",
    "Washington D.C",
  ]],
  ["By Type of Publication", ["Streets", "Transit", "Lighting", "Cleaning", "All Publication"]],
  ["Other Filters", ["Resolved Claims", "Claims still unresolved"]],
]);

const WallFilters = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchParam, setSearchParam] = useState(null);
  const navigate = useNavigate()
 
  const handleClick = (category) => {
    console.log(category)
    if(category === "By Location") { 
      console.log("..")
    } else if (category === "By Type of Publication") { 
      console.log("...")
    } else if (category === "Other Filters") { 
      console.log("....")
    } else if (category === "All Publication") { 
      setTimeout(() => { 
        navigate("/wall")
      }, 1000)
    }else { 
      setSearchParam(category);
      setTimeout(() => { 
        navigate(`/userManualSearch/${category}`)
      }, 1000)
      setTimeout(() => { 
       window.location.reload()
      }, 1000)

    }
  };

  useEffect(() => { 
     console.log(searchParam)
  }, [searchParam])
 
  return (
    <MagicMotion transition={{ type: "spring", stiffness: 200, damping: 15 }}>
      <menu className="bg-gray-200 flex flex-col justify-start gap-2 w-64 2xl:w-80 my-4 p-3 rounded-2xl min-w-[12.5rem]">
        <header
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.15em",
            display: "flex",
          }}
        >
          {currentPage !== "home" && (
            <small
              className="absolute text-xl cursor-pointer"
              onClick={() => {
                setCurrentPage("home");
                setSelectedCategory(null); // Limpiar la categoría seleccionada al retroceder
              }}
            >
              ←
            </small>
          )}
         {currentPage === "home" ? <span style={{ margin: "0 auto" }}>Filters</span> : null}
         {currentPage === "By Location" ? <span style={{ margin: "0 auto" }}>By Location</span> : null}
         {currentPage === "By Type of Publication" ? <span style={{ margin: "0 auto" }}>By Type of Publication</span> : null}
         {currentPage === "Other Filters" ? <span style={{ margin: "0 auto" }}>Other Filters</span> : null}
        </header>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {menuPages.get(currentPage)?.map((item) => (
            <button
              className="w-full text-left flex items-center justify-between gap-1.5 cursor-pointer"
              onClick={() => {
                handleClick(item);
                if (currentPage === "home") {
                 if (item.includes("By Location")) {
                   setCurrentPage("By Location");
                 } else if (item.includes("By Type of Publication")) {
                   setCurrentPage("By Type of Publication");
                 } else if (item.includes("Other Filters")) {
                   setCurrentPage("Other Filters");
                 }
                }
              }}
            >
              {item}
            </button>
          ))}
        </ul>
      </menu>
    </MagicMotion>
  );
 };
 
 export default WallFilters;

/*import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import { Link } from 'react-router-dom';


const WallFilters = () => {

        const [searchParam, setSearchParam] = useState("")
        const [showMessageWithOutFilters, setShowMessageWithOutFilters] = useState("")
        const [searchResults, setSearchResults] = useState([])
        const [paramOne, setParamOne] = useState(null)
        const [paramTwo, setParamTwo] = useState(null)
        const [paramThree, setParamThree] = useState(null)
        const [paramFour, setParamFour] = useState(null)
        const [paramFive, setParamFive] = useState(null)
        const navigate = useNavigate()
  


        const notificacionDeToast = () =>{ 
          toast.error("Its not possible to do a personal search with out filters aplicated", {
            position: toast.POSITION.TOP_RIGHT_CENTER,
            style: {
              color: "#082E58", 
            },
          });
        }

        const searchParamPublication = () => { 
          if(searchParam === "") { 
            notificacionDeToast()
          } else { 
                 navigate(`/userManualSearch/${searchParam}`)
                  }
        } 

        const [filterState, setFilterState] = useState({
          Sidewalks: false,
          Lightning: false,
          Cleaning: false,
          Streets: false,
          Transit: false
        });

        const handleCheckboxChange = (event) => {
          const { name, checked } = event.target;
          setFilterState({
            ...filterState,
            [name]: checked,
          });
        };

        useEffect(() => {
          sessionStorage.setItem('filterState', JSON.stringify(filterState));
          console.log(sessionStorage.filterState)
        }, [filterState]);

    

      const goSearchFiltered = () => { 
       navigate("/searchWithFilters") 
       setTimeout(() => { 
          window.location.reload()
       }, 500)
      }



  return (
        <div className='rounded-lg'>
              <div className="mr-4">
                      <div className='flex'>
                          <input type="text" placeholder='Search..' className=' border border-gray-200 bg-gray-200 rounded-lg text-center mt-2' onChange={(e) => setSearchParam(e.target.value)}/>
                          <div onClick={() => searchParamPublication()} className='mt-4'>
                             <SearchIcon style={{cursor: "pointer", marginLeft:"3px"}}/>
                          </div>                       
                        </div>

                <div className="mt-6 ml-2">
                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Sidewalks" checked={filterState.Sidewalks} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Sidewalks</p>
                      </div>

                      <div className="flex mt-4">
                          <input className="checkbox checkbox-sm border-slate-700" type="checkbox"  name="Lightning" checked={filterState.Lightning} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Lightning</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox"  className="checkbox checkbox-sm border-slate-700" name="Cleaning" checked={filterState.Cleaning} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Cleaning</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Streets" checked={filterState.Streets} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Streets and Squares</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Transit" checked={filterState.Transit} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Transit</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Resolved" checked={filterState.Resolved} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Resolved Claims</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Unsolved" checked={filterState.Unsolved} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Still unsolved</p>
                      </div>

                      <div className=" mt-4  text-left">
                        {filterState && Object.values(filterState).some((value) => value === true)  ?
                         (
                          
                                <button className="text-black font-bold bg-gray-400 text-xs h-[32px] w-16 hover:bg-white hover:text-black border border-none hover:border-none" onClick={() => goSearchFiltered()}>
                                    APPLY
                                </button>
                   
                          ) : null}
                          
                          <br/>
                          <small className="text-black font-bold underline cursor-pointer">Delete All Filters</small>
                      </div>
                </div>
              </div>
              <ToastContainer/>
            </div>
  );
};

export default WallFilters
*/