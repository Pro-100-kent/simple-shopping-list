import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {projectReducer} from './reducers/projectReducer';
import {shoppingListReduser} from './reducers/shoppingListReducer';

const reducers = combineReducers({
  shoppingList: shoppingListReduser,
});
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
