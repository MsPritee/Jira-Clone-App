
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendar, faCog, faGear, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const sidebarMenu = [
        { text: 'Boards', icon: faBars },
        { text: 'Members', icon: faUser },
        { text: 'Workspace', icon: faCog },
        { text: 'Settings', icon: faGear },
        { text: 'Table', icon: faTable },
        { text: 'Calendar', icon: faCalendar }
    ];

    return (
        < div className={`sidebar bg-blue-800`}>
            <div className={` ${isOpen ? 'open' : 'closed'}`}>

            </div>
            {isOpen && (
                <div className="menu  w-60 items-center justify-center  mt-10 text-white  ">
                    {sidebarMenu.map((item) => (
                        <div
                            key={item}
                            className="mb-3 pl-15 hover:bg-emerald-300 hover:text-stone-950 y-100 py-2 rounded"
                            >
                            <FontAwesomeIcon icon={item.icon} className="mr-2 ml-8" />
                            {item.text}
                        </div>
                    ))}
                </div>
            )
            }
        </ div>
    );
};

export default Sidebar;
