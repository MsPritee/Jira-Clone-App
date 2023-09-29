
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardTitle, removeCard } from '../../Store/ListAction';

const Card = ({ listId, card }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdateCardTitle = () => {
    dispatch(updateCardTitle(listId, card.id, newTitle));
    setEditMode(false);
  };

  const handleRemoveCard = () => {
    dispatch(removeCard(listId, card.id));
  };

  return (
    <div>
      
    </div>
  );
};

export default Card;
