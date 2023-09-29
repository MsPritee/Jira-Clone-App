import React, { useEffect, useState } from 'react';
import './CardModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCardTitle, removeCard, addCommentToCard, copyCard, moveCard } from '../../Store/ListAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';


const CardModal = ({ listId, cardId, card, isCardOpen, onCardClose }) => {

    const [copySelectedListId, setCopySelectedListId] = useState("");
    const [moveSelectedListId, setMoveSelectedListId] = useState("");
    const lists = useSelector((state) => state.lists);
    const [newCommentText, setNewCommentText] = useState('');
    const [comments, setComments] = useState(card.comments || []); 
    const commentKey = `comments_${listId}_${cardId}`;
    const [newCardTitle, setCardNewTitle] = useState(card.title);
    const dispatch = useDispatch();
    const [editModes, setEditModes] = useState({});

    const handleCardTitleChange = (e) => {
        setCardNewTitle(e.target.value);
    };

    const handleUpdateCardTitle = () => {
        console.log('Card ID:', card.id);
        dispatch(updateCardTitle(listId, card.id, newCardTitle));
        setEditModes({ ...editModes, [cardId]: false });
        console.log('Edit mode after update:', editModes);
    };

    const handleRemoveCard = () => {
        dispatch(removeCard(listId, card.id));
        onCardClose();
        console.log("Removing card:", listId, card.id);
    };

    const renderListOptions = () => {
        return lists.map((list) => (
            <option key={list.id} value={list.id}>
                {list.title}
            </option>
        ));
    };

    const handleCopyCard = () => {
        if (!copySelectedListId) {
            alert('Please select a target list for copying.');
            return;
        }
        dispatch(copyCard(listId, copySelectedListId, card.id));
        onCardClose();
    };

    const handleMoveCard = () => {
        if (!moveSelectedListId) {
            alert('Please select a target list for moving.');
            return;
        }

        console.log("Move source list:", listId);
        console.log("Move destination list:", moveSelectedListId);
        console.log("Card to move:", cardId);

        dispatch(moveCard(listId, moveSelectedListId, card.id));
        onCardClose();
    };


    const handleAddComment = () => {
        if (newCommentText.trim() === '') {
            alert('Write Something');
            return;
        }
        dispatch(addCommentToCard(card.id, newCommentText));

        const newComment = {
            id: uuidv4(),
            text: newCommentText,
            timestamp: Date.now(),
        };
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        setNewCommentText('');

        localStorage.setItem(commentKey, JSON.stringify(updatedComments));
    };


    if (!isCardOpen) return null;

    return (
        <div className="edit-card-modal-overlay">
            <div className="edit-card-modal w-fit flex flex-row gap-6">
                <div className="edit-card-left-side ml-2  ">
                    <div className='task-id   '>
                        <button className="task-id-btn flex items-center flex-row left-0 top-0 text-teal-900">
                            <FontAwesomeIcon className='task-id-btn-icon mr-2' icon={faSquareCheck} />
                            <div className=" task-id-text">
                                Task-1668057
                            </div>
                        </button>
                    </div>

                    <div className='card-title-edit-box align-center'>
                        {editModes[card.id] ? (
                            <div>
                                <input type="text" value={newCardTitle} onChange={handleCardTitleChange} />
                                <button
                                    className='edit-card-title-btn'
                                    onClick={() => {
                                        handleUpdateCardTitle();
                                        setEditModes({ ...editModes, [card.id]: false });
                                    }}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className=' card-title-box  flex mt-3 itmes-center'>
                                <div className=' card-title text-left ml-3 ' >
                                    <h3>Title:  &nbsp;  </h3>
                                </div>
                                <div className=' card-title-box justify-center w-full'>
                                    <h3 onClick={() => setEditModes({ ...editModes, [card.id]: true })}>
                                        {card && card.title}
                                    </h3>
                                </div>
                                {/* className=' card-title-box justify-center' */}
                            </div>
                        )}
                    </div>

                    <div className='comment-box mb-5'>
                        <div className=' mt-3 '>
                            <div className=' comment-box-title text-left ml-0 w-full ' >
                                <h4>Activity : </h4>
                            </div>

                            <div className='flex items-center'>
                                <div className="add-comment flex flex-row">
                                    <textarea
                                        className='comment-textarea'
                                        rows="2"
                                        placeholder="Add a comment"
                                        value={newCommentText}
                                        onChange={(e) => setNewCommentText(e.target.value)}
                                    />
                                </div>
                                <button className='ml-2' onClick={handleAddComment}>
                                    Add Comment
                                </button>
                            </div>

                            <ul className="comment-list">
                                {comments.map((comment) => (
                                    <li key={comment.id}>{comment.text}</li>
                                ))}
                            </ul>

                        </div>


                    </div>


                    <div className='card-date-creation '>
                        <p>Created at: {new Date(card.timestamp).toLocaleString()}</p>
                    </div>


                </div>
                <div className="edit-card-right-side   mr-2">
                    <div className='mt-4'>
                        <div className='close-btn-box'>
                            <button className='border-solid ' onClick={onCardClose}>
                                <FontAwesomeIcon className='Close-btn-icon text-4xl text-red-700' icon={faXmark} />
                            </button>
                        </div>


                        <div className='Copy-Card mt-2 items-center flex'>
                            <div className=''>                                
                            <select
                                id="copyTargetList"
                                value={copySelectedListId}
                                onChange={(e) => setCopySelectedListId(e.target.value)}
                            >
                                <option value="">Select a list</option>
                                {renderListOptions()}
                                </select>
                            </div>
                            <div className='ml-2 '>
                                <label htmlFor="copyTargetList">
                                    <button className='copy-card-btn ' onClick={handleCopyCard}>
                                        Copy Card
                                    </button>
                                </label>
                            </div>

                        </div>

                        <div className='Move-Card  mb-3 items-center flex'>
<div>
                            <select
                                id="moveTargetList"
                                value={moveSelectedListId}
                                onChange={(e) => setMoveSelectedListId(e.target.value)}
                            >
                                <option value="">Select a list</option>
                                {renderListOptions()}
                                </select>
                            </div>
                            <div className='ml-2 '>
                                <label htmlFor="moveTargetList">
                                    <button className='move-card-btn' onClick={handleMoveCard}>
                                        Move Card
                                    </button>
                                </label>
                            </div>
                        </div>

                        <div className='del-btn-box bottom-3 '>
                            <button className='del-btn text-center' onClick={handleRemoveCard}>
                                <p className='del-btn-text'>Delete Card</p>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CardModal;
