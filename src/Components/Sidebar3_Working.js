
// Its Working but littlebit changes needed
// Sidebar.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
    const sidebarMenu = ['Boards', 'Members', 'Workspace Settings', 'Table', 'Calendar'];

    return (
        <div className={` bg-gray-200 p-4 fixed h-full transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
            <div className="mb-4">
                <button className="text-gray-600 focus:outline-none" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                </button>
            </div>
            {sidebarMenu.map((item) => (
                <div key={item} className="mb-2">{item}</div>
            ))}
        </div>
    );
};

export default Sidebar;
