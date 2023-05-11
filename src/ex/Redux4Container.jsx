import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from '../modules/todos';
import Redux3Presentation from './Redux3Presentation';

function Redux4Container() {
  const todos = useSelector(state => state.todos);

  const dispatch = useDispatch();

  const onCreate = text => dispatch(addTodo(text));
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용

  return (
    <Redux3Presentation
      todos={todos}
      onCreate={onCreate}
      onToggle={onToggle}
    />
  )
}

export default Redux4Container