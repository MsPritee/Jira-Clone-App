import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../List/List';
import AddList from './AddList';
import './Dashboard.css'
import { moveCard, updateCardOrder } from '../../Store/ListAction'; 
import DashboardMenu from './DashboardMenu';

const Dashboard = () => {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();


  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;
    const cardId = draggableId;

    if (sourceListId === destinationListId) {
      if (source.index !== destination.index) {
        const listId = sourceListId;
        const list = lists.find((list) => list.id === listId);

        const newCardOrder = [...list.cards];
        newCardOrder.splice(source.index, 1);
        newCardOrder.splice(destination.index, 0, draggableId);

        dispatch(updateCardOrder(listId, newCardOrder));
      }
    } else {

      const destinationList = lists.find((list) => list.id === destinationListId);
      if (destinationList) {
        dispatch(moveCard(sourceListId, destinationListId, cardId));
      }
    }
  };



  

  return (
    <>
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className='app_dashboard w-full p-3 bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-500'>
          <DashboardMenu  />
          <Droppable droppableId="dashboard" type="LIST" direction="horizontal">
          
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="lists flex"
            >
              <div className='list-container flex flex-row gap-2'>
                {lists.map((list) => (
                  list ? <List key={list.id} list={list} /> : null
                ))}
              </div>
              {provided.placeholder}
              <AddList />
            </div>
          )}
        </Droppable>
      </div>
      </DragDropContext>     
      
    </>
  );
};

export default Dashboard;
