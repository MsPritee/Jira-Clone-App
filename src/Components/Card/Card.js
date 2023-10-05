import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardTitle, removeCard } from '../../Store/ListAction';
import CardModal from '../Modal/CardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ listId, targetListId, card, handleCardUpdateTitle, handleRemoveCard, provided }) => {
  const [editMode, setEditMode] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState(card.title);
  const [cardModals, setCardModals] = useState({});
  const dispatch = useDispatch();

  const handleCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleUpdateCardTitle = () => {
    dispatch(updateCardTitle(listId, card.id, newCardTitle));
    setEditMode(false);
  };

  const handleDeleteCard = () => {
    handleRemoveCard(card.id);
  };

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const openCardModal = (cardId) => {
    setCardModals({ ...cardModals, [cardId]: true });
  };

  const closeCardModal = (cardId) => {
    setCardModals({ ...cardModals, [cardId]: false });
  };

  return (
    <>
      <div >
        <div onClick={() => openCardModal(card.id)}>
          <Draggable key={card.id} draggableId={card.id}>
            {(provided) => (

              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className='card h-5 m-1 bg-gray-100 rounded-md'
              >
                <div className='individual-card justify-between flex flex-row'>
                  <div className='card-title-text ml-3'>
                    {editMode ? (
                      <input type="text" value={newCardTitle} onChange={handleCardTitleChange} />
                    ) : (
                      <h6 className='card-title mt-2'>{card.title}</h6>
                    )}
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
        </div>


        {cardModals[card.id] && (
          <CardModal
            isCardOpen={cardModals[card.id]}
            onCardClose={() => closeCardModal(card.id)}
            listId={listId}
            cardId={card}
            card={card}
            newCardTitle={newCardTitle}
            handleCardTitleChange={handleCardTitleChange}
            handleCardUpdateTitle={handleCardUpdateTitle}
            handleCardDeleteList={handleRemoveCard}
            targetListId={targetListId}
            isCopy={true}
          />
        )}

        {/* <div className='list p-2'>
          {editMode ? (
            <button className='update-Card-btn' onClick={handleUpdateCardTitle}>
              Save
            </button>
          ) : (
            <>
              <button className='edit-Card-btn' onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className='delete-Card-btn' onClick={handleDeleteCard}>
                Delete
              </button>
            </>
          )}
        </div> */}
      </div>

    </>
  );
};

export default Card;
