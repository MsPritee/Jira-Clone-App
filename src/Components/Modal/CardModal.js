import React, { useEffect, useState } from 'react';
import './CardModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCardTitle, removeCard, addCommentToCard, addDescriptionToCard, copyCard, moveCard } from '../../Store/ListAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import MembersPopup from './MembersPopup';
import CopyCardModal from './CopyCardModal';
import MoveCardModal from './MoveCardModal';
import DescriptionModal from './DescriptionModal';
import ReactQuill from 'react-quill';
import renderMemberAvatar from './MemberAvatar';

const CardModal = ({ listId, cardId,  card, isCardOpen, onCardClose, handleDescriptionChange }) => {
    const [isMoveCardModalOpen, setIsMoveCardModalOpen] = useState(false);
    const [copySelectedListId, setCopySelectedListId] = useState("");
    const [moveSelectedListId, setMoveSelectedListId] = useState("");
    const lists = useSelector((state) => state.lists);
    const [newCardTitle, setCardNewTitle] = useState(card.title);
    const dispatch = useDispatch();
    const [editModes, setEditModes] = useState({});
    const [isMembersPopupOpen, setIsMembersPopupOpen] = useState(false);
    const [isCopyCardModalOpen, setIsCopyCardModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [newCommentText, setNewCommentText] = useState('');
    const [comments, setComments] = useState(card.comments || []);
    const commentKey = `comments_${listId}_${cardId}`;

    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const descriptionKey = `description_${listId}_${cardId}`;
    const [description, setDescription] = useState(card.description || []);
    console.log('Description Key:', descriptionKey);

    const handleSaveDescription = (cardId, updatedDescription) => {
        console.log('Saving Description for Card ID:', cardId);
        dispatch(addDescriptionToCard(card.id, updatedDescription));
        setDescription(updatedDescription);
        localStorage.setItem(descriptionKey, updatedDescription);
        closeDescriptionModal();

    };

    useEffect(() => {
        const savedDescription = localStorage.getItem(descriptionKey);
        if (savedDescription) {
            setDescription(savedDescription);
        }
    }, []);

    const handleSelectMember = (member) => {
        setSelectedMember(member);
    };


    const openDescriptionModal = () => {
        setIsDescriptionModalOpen(true);
    };

    const closeDescriptionModal = () => {
        setIsDescriptionModalOpen(false);
    };

    const openMembersPopup = () => {
        setIsMembersPopupOpen(true);
    };

    const closeMembersPopup = () => {
        setIsMembersPopupOpen(false);
    };

    const openCopyCardModal = () => {
        setIsCopyCardModalOpen(true);
    };

    const closeCopyCardModal = () => {
        setIsCopyCardModalOpen(false);
    };

    const openMoveCardModal = () => {
        setIsMoveCardModalOpen(true);
    };

    const closeMoveCardModal = () => {
        setIsMoveCardModalOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCardTitleChange = (e) => {
        setCardNewTitle(e.target.value);
    };

    const handleUpdateCardTitle = () => {
        console.log('Card ID:', card.id);
        dispatch(updateCardTitle(listId, card.id, newCardTitle));
        setEditModes({ ...editModes, [cardId]: false });
        console.log('Edit mode after update:', editModes);
    };
    const handleCardKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateCardTitle();
            setEditModes(false);
        }
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

    const handleCopyCard = (targetListId) => {
        dispatch(copyCard(listId, targetListId, card.id));
        onCardClose();
    };

    const handleMoveCard = (targetListId) => {
        dispatch(moveCard(listId, targetListId, card.id));
        onCardClose();
    };

    // Hide the toolbar
    const modules = {
        toolbar: false,
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
            <div className="edit-card-modal flex flex-row gap-6">
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
                                <input type="text" onKeyDown={handleCardKeyDown} value={newCardTitle} onChange={handleCardTitleChange} />
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

                    <div>
                        {selectedMember && (
                            <div className="selected-member">
                                {renderMemberAvatar(selectedMember)}
                            </div>
                        )}
                    </div>

                    <div className='description-box flex flex-col'>
                        <div className='description-box-title'>
                            <h5 className='text-left'>Description</h5>
                        </div>
                        <div className='description-box-texarea' onClick={openDescriptionModal}>
                            <ReactQuill
                                className='description-textarea w-full bg-slate-200 hover:border-white hover:bg-slate-300'
                                rows="2"
                                value={description}
                                theme="snow"
                                onChange={handleDescriptionChange}
                                modules={modules}
                            />
                        </div>
                        {isDescriptionModalOpen && (
                            <DescriptionModal
                                onClose={closeDescriptionModal}
                                initialDescription={description}
                                onSaveDescription={(updatedDescription) => handleSaveDescription(cardId, updatedDescription)}
                            />
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
                <div className="edit-card-right-side mr-2 itmes-center">
                    <div className='mt-4'>
                        <div className='close-btn-box'>
                            <button className='border-solid ' onClick={onCardClose}>
                                <FontAwesomeIcon className='Close-btn-icon text-4xl text-red-700' icon={faXmark} />
                            </button>
                        </div>
                        <div className="buttons-container  mt-5">
                            <div className="member-dropdown button-wrapper items-center flex flex-col justify-center">
                                <button className="members-button btn " onClick={openMembersPopup}>
                                    Members
                                </button>
                                {isMembersPopupOpen && (
                                    <MembersPopup onClose={closeMembersPopup} handleSelectMember={handleSelectMember} />
                                )}
                            </div>

                            <div className='Copy-Card'>
                                <div className="button-wrapper">
                                    <button className='copy-card-btn btn ' onClick={openCopyCardModal}>
                                        Copy Card
                                    </button>
                                </div>
                            </div>
                            {isCopyCardModalOpen && (
                                <CopyCardModal
                                    lists={lists}
                                    onClose={closeCopyCardModal}
                                    onCopyCard={handleCopyCard}
                                />
                            )}

                            <div className='Move-Card '>
                                <div className="button-wrapper">
                                    <button className='move-card-btn btn  ' onClick={openMoveCardModal}>
                                        Move Card
                                    </button>
                                </div>
                            </div>
                            {isMoveCardModalOpen && (
                                <MoveCardModal
                                    lists={lists}
                                    onClose={closeMoveCardModal}
                                    onMoveCard={handleMoveCard}
                                />
                            )}

                            <div className='del-btn-box bottom-3 button-wrapper'>
                                <button className='del-btn text-center btn ' onClick={handleRemoveCard}>
                                    Delete Card
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CardModal;
