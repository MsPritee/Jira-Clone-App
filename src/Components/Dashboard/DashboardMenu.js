import { faCalendar, faCalendarAlt, faStar } from '@fortawesome/free-regular-svg-icons'
import { faBoltLightning, faBrush, faClockFour, faFilter, faPeopleGroup, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function DashboardMenu() {

  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);
  const toggleBoardDropdown = () => {
    setIsBoardDropdownOpen(!isBoardDropdownOpen);
  };
  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='dash-menu-left-side flex  items-center '>
        <a className="navbar-brand " href="#">
          <h4 className=' text-white'>Project Management</h4>
        </a>
        <button className="star-toggle-btn ml-3" >
          <span className="px-1 cursor-pointer ">
            <FontAwesomeIcon className="h-4 " icon={faStar} style={{ color: "#ffffff", }} />
          </span>
        </button>
        <div className='flex'>
          <button className="star-toggle-btn ml-3" >
            <span className="px-1 cursor-pointer ">
              <FontAwesomeIcon className="h-4 " icon={faPeopleGroup} style={{ color: "#ffffff", }} />
            </span>
          </button>
          <a className="navbar-brand ml-2 mt-2 " href="#">
            <h6 className=' text-white'>Workspace Visible</h6>
          </a>
        </div>

        <div className='workspace-btn-box align-middle justify-center'>

          <div className=' ml-2 hover:text-stone-950 text-black  hover:bg-emerald-300 rounded'>
            <button
              id="dropdownBoardButton"
              data-dropdown-toggle="dropdown"
              type="button"
              onClick={toggleBoardDropdown}
              className="  align-middle justify-center w-24  focus:outline-none font-medium rounded-lg px-0.5 my-1.5 text-center inline-flex items-center  "
            >

              Board
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />

              </svg>
            </button>

          </div>

          {isBoardDropdownOpen && (
            <div
              id="Boarddropdown"
              className=" Board-dropdown absolute z-10 text-center bg-white text-base rounded-lg w-28 ml-2  "
            >
              <ul
                aria-labelledby="dropdownBoardeButton"
                className="py-2  pl-0  text-sm text-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 hover:bg-gray-200 "
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 w-full hover:bg-gray-200"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block w-full py-2 hover:bg-gray-200"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block w-full  py-2  hover:bg-gray-200"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>


      <div className='dash-menu-right-side items-center flex  '>
        <div className='flex'>
          <button className="star-toggle-btn ml-3" >
            <span className="px-1 cursor-pointer ">
              <FontAwesomeIcon className="h-4 " icon={faCalendarAlt} style={{ color: "#ffffff", }} />
            </span>
          </button>
          <a className="navbar-brand ml-1 mt-2 " href="#">
            <h6 className=' text-white'>Calendar Power-Up</h6>
          </a>
        </div>

        <div className='flex'>
          <button className="star-toggle-btn ml-3" >
            <span className="px-1 cursor-pointer ">
              <FontAwesomeIcon className="h-4 " icon={faBrush} style={{ color: "#ffffff", }} />
            </span>
          </button>
          <a className="navbar-brand ml-1 mt-2 " href="#">
            <h6 className=' text-white'>Power-Ups</h6>
          </a>
        </div>

        <div className='flex'>
          <button className="star-toggle-btn ml-3" >
            <span className="px-1 cursor-pointer ">
              <FontAwesomeIcon className="h-4 " icon={faBoltLightning} style={{ color: "#ffffff", }} />
            </span>
          </button>
          <a className="navbar-brand ml-1 mt-2 " href="#">
            <h6 className=' text-white'>Automation</h6>
          </a>
        </div>
     
      <div className='flex'>
          <button className="star-toggle-btn ml-3" >
            <span className="px-1 cursor-pointer ">
              <FontAwesomeIcon className="h-4 " icon={faFilter} style={{ color: "#ffffff", }} />
            </span>
          </button>
          <a className="navbar-brand ml-1 mt-2 " href="#">
            <h6 className=' text-white'>Filter</h6>
          </a>
        </div>
        
        <button className="clock-toggle-btn ml-2" >
          <span className=" cursor-pointer ">
            <FontAwesomeIcon className="h-4 " icon={faClockFour} style={{ color: "#ffffff", }} />
          </span>
        </button>
        <div className=' ml-2 hover:text-stone-950 text-black  bg-emerald-200 rounded'>
          <button
            id="dropdownBoardButton"
            data-dropdown-toggle="dropdown"
            type="button"
            onClick={toggleBoardDropdown}
            className="  align-middle justify-center w-16  focus:outline-none font-medium rounded-lg px-0.5 my-1.5  text-center inline-flex items-center  "
          >
            Share
          </button>

        </div>
      </div>
    </div>
  )
}

export default DashboardMenu