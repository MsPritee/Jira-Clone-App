

import { createSlice } from '@reduxjs/toolkit';

const cardCommentsSlice = createSlice({
    name: 'cardComments',
    initialState: {},
    reducers: {
        addCommentToCard: (state, action) => {
            const { listId, cardId, comment } = action.payload;
            if (!state[listId]) {
                state[listId] = {};
            }
            if (!state[listId][cardId]) {
                state[listId][cardId] = [];
            }
            state[listId][cardId].push(comment);
        },
    },
});

export const { addCommentToCard } = cardCommentsSlice.actions;
export default cardCommentsSlice.reducer;

export const selectCommentsForCard = (state, listId, cardId) => {
    if (state[listId] && state[listId][cardId]) {
        return state[listId][cardId];
    }
    return [];
};