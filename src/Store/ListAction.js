
export const addList = (title) => ({
    type: "ADD_LIST",
    payload: { title },
});

export const updateListTitle = (listId, newTitle) => ({
    type: "UPDATE_LIST_TITLE",
    payload: { listId, newTitle },
});

export const deleteList = (listId) => ({
    type: "DELETE_LIST",
    payload: listId,
});

export const addCard = (listId, cardTitle) => ({
    type: "ADD_CARD",
    payload: {
        listId,
        cardTitle,
        timestamp: new Date().toISOString(),
    },
});

export const updateCardTitle = (listId, cardId, newTitle) => ({
    type: "UPDATE_CARD_TITLE",
    payload: { listId, cardId, newTitle },
});

export const removeCard = (listId, cardId) => ({
    type: "REMOVE_CARD",
    payload: { listId, cardId },
});

export const copyCard = (copySourceListId, copyDestinationListId, copyCardId) => ({
    type: 'COPY_CARD',
    payload: {
        copySourceListId,
        copyDestinationListId,
        copyCardId,
    },
});

export const moveCard = (moveSourceListId, moveDestinationListId, movecardId) => ({
    type: 'MOVE_CARD',
    payload: {
        moveSourceListId,
        moveDestinationListId,
        movecardId,
    },
});

export const updateCardOrder = (listId, newCardOrder) => ({
    type: 'UPDATE_CARD_ORDER',
    payload: { listId, newCardOrder },
});

// Action to add a comment to a card
export const addCommentToCard = (cardId, commentText) => ({
    type: 'ADD_COMMENT_TO_CARD',
    payload: {
        cardId,
        commentText,
    },
});



// export const addCommentToCard = (listId, cardId, commentText) => ({
//     type: "ADD_COMMENT_TO_CARD",
//     payload: {
//         listId,
//         cardId,
//         comment: {
//             id: uuidv4(), // Generate a unique ID for the comment
//             text: commentText,
//             timestamp: Date.now(),
//         },
//     },
// });

export const deleteCommentFromCard = (listDelCommentId, DelCommentcardId, commentId) => ({
    type: 'DELETE_COMMENT_FROM_CARD',
    payload: {
        listDelCommentId,
        DelCommentcardId,
        commentId,
    },
});


