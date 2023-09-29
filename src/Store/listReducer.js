import { v4 as uuidv4 } from 'uuid';

const initialState = {
    lists: [
        {
            id: '',
            title: '',
            cards: [
                {
                    id: '',
                    title: '',
                    comments: [],
                },
                {
                    id: '',
                    title: '',
                    comments: [],
                },
            ],
        },
        {
            id: '',
            title: '',
            cards: [
                {
                    id: '',
                    title: '',
                    comments: [],
                },
            ],
        },
    ],
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_LIST":
            const newList = {
                id: uuidv4(),
                title: action.payload.title,
                cards: [],
            };
            return {
                ...state,
                lists: [...state.lists, newList],
            };

        case 'ADD_CARD':
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.payload.listId) {
                        return {
                            ...list,
                            cards: [
                                ...list.cards,
                                {
                                    id: uuidv4(),
                                    title: action.payload.cardTitle,
                                    timestamp: action.payload.timestamp,
                                    comments: [], // Initialize an empty comments array for each card
                                },
                            ],
                        };
                    }
                    return list;
                }),
            };


        case "UPDATE_CARD_TITLE":
            const updatedListsForUpdateCard = state.lists.map((list) => {
                if (list.id === action.payload.listId) {
                    const updatedCards = list.cards.map((card) => {
                        if (card.id === action.payload.cardId) {
                            return {
                                ...card,
                                title: action.payload.newTitle,
                            };
                        }
                        return card;
                    });
                    return {
                        ...list,
                        cards: updatedCards,
                    };
                }
                return list;
            });
            return {
                ...state,
                lists: updatedListsForUpdateCard,
            };

        case "REMOVE_CARD":
            const updatedListsForRemoveCard = state.lists.map((list) => {
                if (list.id === action.payload.listId) {
                    const filteredCards = list.cards.filter(
                        (card) => card.id !== action.payload.cardId
                    );
                    return {
                        ...list,
                        cards: filteredCards,
                    };
                }
                return list;
            });
            return {
                ...state,
                lists: updatedListsForRemoveCard,
            };

        case "UPDATE_LIST_TITLE":
            const updatedLists = state.lists.map((list) => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        title: action.payload.newTitle,
                    };
                }
                return list;
            });
            return {
                ...state,
                lists: updatedLists,
            };

        case 'COPY_CARD':
            const {
                copySourceListId,
                copyDestinationListId,
                copyCardId,
            } = action.payload;

            const sourceListCopy = state.lists.find((list) => list.id === copySourceListId);
            const destinationListCopy = state.lists.find((list) => list.id === copyDestinationListId);
            const cardToCopy = sourceListCopy.cards.find((card) => card.id === copyCardId);

            if (!cardToCopy) {
                return state;
            }

            const copiedCard = {
                id: uuidv4(),
                title: cardToCopy.title,
                timestamp: Date.now(),
                comments: [...cardToCopy.comments],
            };

            destinationListCopy.cards.push(copiedCard);

            return {
                ...state,
                lists: [...state.lists],
            };
        
        
        case 'MOVE_CARD':
            const {
                moveSourceListId,
                moveDestinationListId,
                movecardId,
            } = action.payload;

            const sourceListMove = state.lists.find((list) => list.id === moveSourceListId);
            const destinationListMove = state.lists.find((list) => list.id === moveDestinationListId);
            const cardToMove = sourceListMove.cards.find((card) => card.id === movecardId);

            if (!cardToMove) {
                return state;
            }

            if (moveSourceListId !== moveDestinationListId) {
                sourceListMove.cards = sourceListMove.cards.filter((card) => card.id !== movecardId);
                destinationListMove.cards.push(cardToMove);
            } else {
                const indexToRemove = sourceListMove.cards.findIndex((card) => card.id === movecardId);
                sourceListMove.cards.splice(indexToRemove, 1);
                destinationListMove.cards.splice(destinationListMove.cards.length - 1, 0, cardToMove);
            }

            return {
                ...state,
                lists: [...state.lists],
            };


        case 'UPDATE_CARD_ORDER':
            const { listId, newCardOrder } = action.payload;
            const currentList = state.lists.find((list) => list.id === listId);
            const isOrderChanged = JSON.stringify(currentList.cards) !== JSON.stringify(newCardOrder);

            if (isOrderChanged) {
                return {
                    ...state,
                    lists: state.lists.map((list) => {
                        if (list.id === listId) {
                            return {
                                ...list,
                                cards: newCardOrder,
                            };
                        }
                        return list;
                    }),
                };
            }
            return state;


        case 'ADD_COMMENT_TO_CARD':
            const { cardId, commentText } = action.payload;

            return {
                ...state,
                lists: state.lists.map((list) => ({
                    ...list,
                    cards: list.cards.map((card) => {
                        if (card.id === cardId) {
                            return {
                                ...card,
                                comments: [
                                    ...card.comments,
                                    {
                                        id: uuidv4(),
                                        text: commentText,
                                        timestamp: Date.now(),
                                    },
                                ],
                            };
                        }
                        return card;
                    }),
                })),
            };


        case 'DELETE_COMMENT_FROM_CARD':
            const { listDelCommentId, DelCommentcardId, commentId } = action.payload;
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === listDelCommentId) {
                        return {
                            ...list,
                            cards: list.cards.map((card) => {
                                if (card.id === DelCommentcardId) {
                                    return {
                                        ...card,
                                        comments: card.comments.filter(
                                            (comment) => comment.id !== commentId
                                        ),
                                    };
                                }
                                return card;
                            }),
                        };
                    }
                    return list;
                }),
            };


        case "DELETE_LIST":
            const filteredLists = state.lists.filter((list) => list.id !== action.payload);
            return {
                ...state,
                lists: filteredLists,
            };

        default:
            return state;
    }
};

export default listReducer;
