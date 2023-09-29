

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListTitle, deleteList, addCard } from '../../Store/ListAction';
import Card from '../Card/Card';
import './List.css';
import ListModal from '../Modal/ListModal';
import CardModal from '../Modal/CardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';


const List = ({ list, handleRemoveCard, handleCardUpdateTitle, handleCardTitleChange, targetListId }) => {
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

    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const openCardModal = (cardId) => {
        setCardModals({ ...cardModals, [cardId]: true });
    };

    const closeCardModal = (cardId) => {
        setCardModals({ ...cardModals, [cardId]: false });
    };

    // const lists = useSelector((state) => state.lists);

    return (
        <>

            <Droppable droppableId={list.id} type='CARD'>
                {(provided) => (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        className=' list-box flex flex-col h-fit gap-1 mt-2 p-1 bg-gray-200 rounded-md'
                    >
                        <div className=' list-box-heading flex justify-between m-3 flex-row'>

                            {editMode ? (
                                <div className='edit-list-title-input'>
                                    <input type="text" value={newTitle} onChange={handleTitleChange} />
                                    <button className='edit-title-btn' onClick={handleUpdateTitle}>Save</button>
                                </div>
                            ) : (
                                <h3 onClick={() => setEditMode(true)}>{list.title}</h3>

                            )}

                            <div className=' p-2'>
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
                                <div className='card-list-box  '>
                                    {list.cards.map((card, index) => (
                                        <Draggable
                                            key={card.id}
                                            draggableId={card.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={card.id} className='card h-5  m-1 bg-gray-100 rounded-md'>
                                                    <div className='individual-card  justify-between flex flex-row '>
                                                        <div className='card-title-text ml-3' >
                                                            <Card key={card.id} listId={list.id} card={card} />
                                                            <h6 className='card-title mt-2'>{card.title}</h6>
                                                        </div>
                                                        <div className='list p-2'>
                                                            <button className='edit-Card-btn' onClick={() => openCardModal(card.id)}>
                                                                <FontAwesomeIcon className='edit-btn' icon={faPenToSquare} />
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>

                            </div>
                            <div className='add-new-card flex flex-row  mr-2 ml-2 mt-3 mb-3'>
                                <input
                                    type='text'
                                    className='rounded m-1'
                                    placeholder='Enter card title'
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                />
                                <button className='m-2' onClick={handleAddCard}>Add Card</button>
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>

            {list.cards.map((card, index) => (
                <CardModal
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
            ))}
        </>
    );
};

export default List;
