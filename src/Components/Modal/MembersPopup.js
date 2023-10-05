import React, { useState } from 'react';
import './Modals.css'
import UserImg from '../Images/user.png'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderMemberAvatar from './MemberAvatar';

const MembersPopup = ({ onClose, handleSelectMember }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);

    const memberData = [
        { name: 'Priyanka', email: 'priyanka@gmail.com', image: null },
        { name: 'Monika', email: 'monika@gmail.com', image: UserImg },
        { name: 'Shubham', email: 'shubham@gmail.com', image: null },
        { name: 'Mukesh', email: 'mukesh@gmail.com', image: null },
        { name: 'Harsha', email: 'harsha@gmail.com', image: UserImg },

    ];

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = memberData.filter((member) =>
            member.name.toLowerCase().includes(query)
        );
        setFilteredMembers(filtered);
    };


    return (
        <div className="popup">
            <div className="popup-content">
                <div className='flex flex-row ' >
                    <h6 className='text-center w-full'>Members</h6>
                    <div className='close-btn-box'>
                        <button className='border-solid ' onClick={onClose}>
                            <FontAwesomeIcon className='Close-btn-icon text-4xl text-red-700' icon={faXmark} />
                        </button>
                    </div>
                </div>

                <div className="search-bar">
                    <input
                        type="text"
                        className='w-full p-5px '
                        placeholder="Search members"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {/* <button onClick={handleSearch}>Search</button> */}
                </div>

                {filteredMembers.length === 0 ? (
                    memberData.map((member, index) => (
                        <div className="member flex flex-col" key={index}>
                            <div className="member2 flex flex-row h-12 my-1 bg-slate-200 rounded" onClick={() => handleSelectMember(member)}>
                                <div className='user-img items-center mx-2 my-1'>
                                    {renderMemberAvatar(member)}
                                </div>

                                <div className="member-info" >
                                    <h6 className='mb-0 mt-1 text-left '>{member.name}</h6>
                                    <p className='ml-0 '>{member.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    filteredMembers.map((member, index) => (
                        <div className="member flex flex-col" key={index}>
                            <div className="member2 flex flex-row h-12 my-1 bg-slate-200 rounded" onClick={() => handleSelectMember(member)}>
                                <div className='user-img items-center mx-2 my-1'>
                                    <img src={UserImg} alt="User Avatar" />
                                </div>
                                <div className="member-info" >
                                    <h6 className='mb-0 mt-1 text-left '>{member.name}</h6>
                                    <p className='ml-0 '>{member.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div >
    );
};

export default MembersPopup;
