import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListTitle, deleteList, addCard } from '../../Store/ListAction';
import Card from '../Card/Card';
import './List.css';
import ListModal from '../Modal/ListModal';
// import CardModal from '../Modal/CardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const List = ({ list, handleRemoveCard, handleCardTitleChange, targetListId }) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(list.title);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [cardModals, setCardModals] = useState({});
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleUpdateTitle = () => {
        dispatch(updateListTitle(list.id, newTitle));
        setEditMode(false);
    };

    const handleDeleteList = () => {
        dispatch(deleteList(list.id));
    };

    const handleAddCard = () => {
        if (newCardTitle.trim() !== '') {
            dispatch(addCard(list.id, newCardTitle));
            setNewCardTitle('');
        }
    };

    const openListModal = () => {
        setIsListModalOpen(true);
    };

    const closeListModal = () => {
        setIsListModalOpen(false);
    };

    // const openCardModal = (cardId) => {
    //     setCardModals({ ...cardModals, [cardId]: true });
    // };

    // const closeCardModal = (cardId) => {
    //     setCardModals({ ...cardModals, [cardId]: false });
    // };


    return (
        <>
            <Droppable droppableId={list.id} type='CARD'>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='list-box flex flex-col h-fit gap-1 mt-2 p-1 bg-gray-200 rounded-md'
                    >
                        <div className='list-box-heading flex justify-between m-3 flex-row'>
                            {editMode ? (
                                <div className='edit-list-title-input'>
                                    <input type="text" value={newTitle} onChange={handleTitleChange} />
                                    <button className='edit-title-btn' onClick={handleUpdateTitle}>
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <h3 onClick={() => setEditMode(true)}>{list.title}</h3>
                            )}
                            <div className='p-2'>
                                <button className='edit-List-btn' onClick={openListModal}>
                                    <FontAwesomeIcon className='edit-btn' icon={faEllipsis} />
                                </button>
                            </div>
                            <ListModal
                                isListOpen={isListModalOpen}
                                onListClose={closeListModal}
                                newTitle={newTitle}
                                handleTitleChange={handleTitleChange}
                                handleUpdateTitle={handleUpdateTitle}
                                handleDeleteList={handleDeleteList}
                            />
                        </div>
                        <div className='list-of-card ml-1.5 mb-2'>
                            <div>
                                <div className='card-list-box cdk-'>
                                    {list.cards.map((card, index) => (
                                        
                                                <Card
                                                    key={card.id}
                                                    listId={list.id}
                                                    card={card}
                                                    handleRemoveCard={handleRemoveCard}
                                                    provided={provided}
                                                />
                                        
                                    ))}
                                </div>
                            </div>
                            <div className='add-new-card flex flex-row mr-2 ml-2 mt-3 mb-3'>
                                <input
                                    type='text'
                                    className='rounded m-1'
                                    placeholder='Enter card title'
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                />
                                <button className='m-2' onClick={handleAddCard}>
                                    Add Card
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
{/* 
            {list.cards.map((card, index) => (
                <CardModal
                    key={card.id}
                    isCardOpen={cardModals[card.id] || false}
                    onCardClose={() => closeCardModal(card.id)}
                    listId={list.id}
                    card={card}
                    newCardTitle={newCardTitle}
                    handleCardTitleChange={handleCardTitleChange}
                    handleCardUpdateTitle={handleCardUpdateTitle}
                    handleCardDeleteList={handleRemoveCard}
                    targetListId={targetListId}
                    isCopy={true}
                />
            ))} */}
        </>
    );
};

export default List;
