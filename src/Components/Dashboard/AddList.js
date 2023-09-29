
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../Store/ListAction";

const AddList = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    

    const handleAddList = () => {
        if (title.trim() !== "") {
            dispatch(addList(title));
            setTitle(""); // Clear the input field
        }
    };

    return (
        <div className="flex flex-col ml-3 mt-2 bg-slate-50 w-fit h-fit rounded-md">
            <input
                type="text"
                className="rounded-md m-1"
                placeholder="Enter list title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleAddList}>Add List</button>
        </div>
    );
};

export default AddList;
