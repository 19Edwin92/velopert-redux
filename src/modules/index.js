import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos'
import middlewarecounter from './middlewarecounter'
import posts from './posts'

const rootReducer = combineReducers({
  counter,todos, middlewarecounter,posts
});

export default rootReducer;