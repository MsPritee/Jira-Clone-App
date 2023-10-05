import React, { useState } from 'react';
import './Modals.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MoveCardModal = ({ lists, onClose, onMoveCard }) => {

    const [selectedListId, setSelectedListId] = useState('');

    const handleMoveCard = () => {
        if (!selectedListId) {
            alert('Please select a target list for moving.');
            return;
        }

        onMoveCard(selectedListId);
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <div className='flex flex-row'>
                    <h6 className='w-full'>Move Card</h6>
                    <div className='close-btn-box'>
                        <button className='border-solid ' onClick={onClose}>
                            <FontAwesomeIcon className='Close-btn-icon text-4xl text-red-700' icon={faXmark} />
                        </button>
                    </div>
                </div>

                <div className="move-card-popup">
                    <h6 className='text-left mb-1'>Move to...</h6>
                    <select
                        value={selectedListId}
                        onChange={(e) => setSelectedListId(e.target.value)}
                    >
                        <option value="">Select a list</option>
                        {lists.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.title}
                            </option>
                        ))}
                    </select>
                    <button className='copy-btn' onClick={handleMoveCard}>Move</button>
                    <button className='cancel-btn' onClick={onClose}>Cancel</button>
                </div>

            </div>
        </div >
    );
};

export default MoveCardModal;
