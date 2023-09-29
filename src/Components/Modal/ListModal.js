
import React from 'react';
import './ListModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ListModal = ({ newTitle, handleTitleChange, handleUpdateTitle, handleDeleteList, isListOpen, onListClose }) => {
    if (!isListOpen) return null;

    return (
        <div className='edit-list-modal-overlay'>
            
            <div className='edit-list-box'>
                <div className='close-btn-box'>
                    <button className='border-solid ' onClick={onListClose}>
                        <FontAwesomeIcon className='Close-btn-icon text-4xl text-red-700' icon={faXmark} />
                    </button>
                </div>
                <div className='edit-list-modal mt-5'>
                    <input className='title-change-input' type='text' value={newTitle} onChange={handleTitleChange} />
                    <button className='edit-title-btn' onClick={handleUpdateTitle}>Save</button>
                    <button className='edit-delete-list-btn ' onClick={handleDeleteList}>Delete</button>
                </div>
               
            </div>

            
        </div>
    );
};

export default ListModal;

