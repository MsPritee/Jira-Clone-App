
import { combineReducers } from 'redux';
import listReducer from './listReducer';
import MoveReducer from './MoveReducer';

const rootReducer = combineReducers({
    lists: listReducer,
    copyMoveCard: MoveReducer
});

export default rootReducer;
