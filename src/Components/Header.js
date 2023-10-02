import React, { useEffect, useState } from 'react';
import logo from './Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faBell, faCircleQuestion, faClockFour, faSearch, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faBellSlash } from '@fortawesome/free-regular-svg-icons';

const Header = ({ toggleSidebar }) => {
    const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
    const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false);
    const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
    const [isStarredDropdownOpen, setIsStarredDropdownOpen] = useState(false);


    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1119);

    const toggleMobileMenu = () => {
        setIsMobileView(!isMobileView);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Window resize event listener
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1024);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleWorkspaceDropdown = () => {
        setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen);
    };
    const toggleRecentDropdown = () => {
        setIsRecentDropdownOpen(!isRecentDropdownOpen);
    };
    const toggleStarredDropdown = () => {
        setIsStarredDropdownOpen(!isStarredDropdownOpen);
    };
    const toggleTemplateDropdown = () => {
        setIsTemplateDropdownOpen(!isTemplateDropdownOpen);
    };

    return (
        <div className='App-Header align-middle flex justify-between bg-gradient-to-tr from-indigo-900 via-indigo-800 to-indigo-700'>
            <div className='left-side-header items-center flex justify-between'>
                <div className=' rounded '>
                    <button className='sidebar-btn ' onClick={toggleSidebar}>
                        <FontAwesomeIcon className='hover:bg-indigo-700 px-2 py-2 rounded text-white h-5 ml-3 mr-2' icon={faGrip} />
                    </button>
                </div>
                <a className="navbar-brand items-center" href="#">
                    {/* <FontAwesomeIcon icon={faJira} /> */}
                    <img className='mr-3 w-7 h-7' src={logo} alt="" />
                </a>

                <a className="navbar-brand" href="#">
                    <h3 className=' text-white'>Jira</h3>
                </a>

                {isMobileView ? (
                    <div className='items-center h-12 ml-9'>
                        <div className="block lg:hidden">
                            <button
                                className={`navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white ${isMobileView ? 'is-active' : ''}`}
                                onClick={toggleMenu}
                            >
                                <svg
                                    className="fill-current h-6 w-6 text-gray-700"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>

                    </div>

                ) : (




                    <div className='Desktop-menu flex'>
                        <div className='workspace-btn-box align-middle justify-center'>
                            <button
                                id="dropdownWorkspaceButton"
                                data-dropdown-toggle="dropdown"
                                type="button"
                                onClick={toggleWorkspaceDropdown}
                                className="  align-middle justify-center w-28 text-white  hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm ml-2 px-2 my-1 py-2.5 text-center inline-flex items-center  dark:hover:bg-blue-700 "
                            >
                                Workspace
                                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {isWorkspaceDropdownOpen && (
                                <div
                                    id="Workspacedropdown"
                                    className=" workspace-dropdown absolute z-10 text-center bg-white text-base rounded-lg w-28 ml-2  "
                                >
                                    <ul
                                        aria-labelledby="dropdownWorkspaceButton"
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

                        <div>
                            <button
                                id="dropdownRecentButton"
                                data-dropdown-toggle="dropdown"
                                type="button"
                                onClick={toggleRecentDropdown}
                                className=" align-middle justify-center w-28 text-white  hover:bg-blue-800 focus:outline-none font-medium rounded-lg  ml-2 px-2 my-1 py-2.5  text-sm text-center inline-flex items-center  dark:hover:bg-blue-700 "
                            >
                                Recent
                                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {isRecentDropdownOpen && (
                                <div
                                    id="Recentdropdown"
                                    className=" workspace-dropdown absolute z-10 text-center bg-white text-base rounded-lg ml-2 w-28 "
                                >
                                    <ul aria-labelledby="dropdownRecentButton" className="py-2 pl-0 w-full text-sm   text-gray-700">
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200 w-full text-center"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div >
                            <button
                                id="dropdownStarredButton"
                                data-dropdown-toggle="dropdown"
                                type="button"
                                onClick={toggleStarredDropdown}
                                className=" align-middle justify-center text-white w-28 hover:bg-blue-800 focus:outline-none font-medium rounded-lg  ml-2 px-2 my-1 py-2.5  text-sm text-center inline-flex items-center  dark:hover:bg-blue-700 "
                            >
                                Starred
                                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isStarredDropdownOpen && (
                                <div
                                    id="Starreddropdown"
                                    className=" Starred-dropdown absolute z-10 text-center bg-white text-base rounded-lg w-28 ml-2 "
                                >
                                    <ul aria-labelledby="dropdownStarredButton" className="py-2 pl-0 w-full text-sm  text-gray-700">
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200 w-full text-center"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                id="dropdownTemplateButton"
                                data-dropdown-toggle="dropdown"
                                type="button"
                                onClick={toggleTemplateDropdown}
                                className=" align-middle justify-center w-28 text-white  hover:bg-blue-800 focus:outline-none font-medium rounded-lg ml-2 px-2 my-1 py-2.5  text-sm text-center inline-flex items-center  dark:hover:bg-blue-700 "
                            >
                                Template
                                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {isTemplateDropdownOpen && (
                                <div
                                    id="Templatedropdown"
                                    className=" Template-dropdown absolute z-10 text-center bg-white text-base rounded-lg w-28 ml-2"
                                >
                                    <ul aria-labelledby="dropdownTemplateButton" className="py-2 pl-0 w-full text-sm  text-gray-700">
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200 w-full text-center"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 hover:bg-gray-200"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 hover:bg-gray-200"
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                )}

                {isMobileView && isMenuOpen && (
                    <div className='Mobile-menu z-10  fixed top-0 left-36 '>
                        <div className="menu  items-center justify-center  mt-10   ">
                            <div className="mb-3 pl-15 hover:bg-emerald-300 hover:text-stone-950 y-100 py-2 rounded">
                                <div
                                    id="Workspacedropdown"
                                    className=" workspace-dropdown text-black absolute z-10 text-center bg-white text-base rounded-lg w-28  "
                                >
                                    <ul
                                        aria-labelledby="dropdownWorkspaceButton"
                                        className="py-2  pl-0  text-sm ">
                                        <li>
                                            <a
                                                href="#"
                                                className="block  py-2 no-underline text-black hover:bg-emerald-300 hover:text-stone-950 "
                                            >
                                                Workspace
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block py-2 w-full no-underline text-black hover:bg-emerald-300 hover:text-stone-950  "
                                            >
                                                Recent
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block w-full py-2 no-underline text-black hover:bg-emerald-300 hover:text-stone-950 "
                                            >
                                                Starred
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block w-full  py-2  no-underline text-black hover:bg-emerald-300 hover:text-stone-950 "
                                            >
                                                Template
                                            </a>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='right-side-header items-center flex'>
                <form className="form-inline mr-2 align-middle ">
                    <input className="form-control h-8  " type="search" placeholder="Search" aria-label="Search" />
                </form>

                <span className="px-1 cursor-pointer hover:text-gray-700">
                    <FontAwesomeIcon className='bell-icon bell-regular h-4 rotate-5' icon={faBellSlash} style={{ color: "#ffffff", }} />
                    {/* <FontAwesomeIcon className="p-2 bg-gray-200 rounded-full" icon={faBell} /> */}
                </span>
                {/* cursor-pointer hover:text-gray-700 */}
                <span className="px-1 ">
                    <FontAwesomeIcon className="fa-regular h-4   " icon={faCircleQuestion} style={{ color: "#ffffff", }} />
                </span>
                <button className="theme-toggle-btn" >
                    <span className="px-1 cursor-pointer ">
                        <FontAwesomeIcon className="h-4 " icon={faCircleHalfStroke} style={{ color: "#ffffff", }} />
                    </span>
                </button>
                <button className="clock-toggle-btn" >
                    <span className="px-1 cursor-pointer ">
                        <FontAwesomeIcon className="h-4 " icon={faClockFour} style={{ color: "#ffffff", }} />
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Header;
