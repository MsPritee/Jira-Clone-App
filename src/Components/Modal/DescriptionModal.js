import React, { useState } from 'react';
import './Modals.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DescriptionModal = ({ onClose, initialDescription, onSaveDescription }) => {

    const [updatedDescription, setUpdatedDescription] = useState(initialDescription);


    const handleSave = () => {
        if (updatedDescription.trim() === '') {
            alert('Write Something');
            return;
        }
        onSaveDescription(updatedDescription);
        onClose();
    };



    return (
        <div className="popup-description " >
            <div className="popup-content-description  ">
                <div className='flex flex-row  ' >
                </div>
                <ReactQuill
                    className='h-32 w-fit  bg-white z-10'
                    value={updatedDescription}
                    rows="6"
                    onChange={setUpdatedDescription}
                    theme="snow"

                />

                <div className="description-modal-buttons mt-10 ">
                    <button className="save-btn z-10 mr-2" onClick={handleSave}>Save</button>
                    <button className="cancel-btn z-10" onClick={onClose}>Cancel</button>
                </div>

            </div>
        </div >
    );
};

export default DescriptionModal;
