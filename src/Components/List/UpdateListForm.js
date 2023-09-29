
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateListTitle } from "../../Store/ListAction";

const UpdateListForm = ({ list, onClose }) => {
    const [newTitle, setNewTitle] = useState(list.title);
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleUpdateTitle = () => {
        dispatch(updateListTitle(list.id, newTitle));
        onClose(); 
    };

    return (
        <div>
            <h3>Edit List Title</h3>
            <input type="text" value={newTitle} onChange={handleTitleChange} />
            <button onClick={handleUpdateTitle}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default UpdateListForm;
