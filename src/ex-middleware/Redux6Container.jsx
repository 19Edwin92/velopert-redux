import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAsync, increaseAsync } from '../modules/middlewarecounter';
// import { decrease, increase } from '../modules/middlewarecounter';
import Redux5Presentation from './Redux5Presentation';

function Redux6Container() {
  const number = useSelector(state => state.middlewarecounter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };
  return (
    <Redux5Presentation number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
  )
}

export default Redux6Container