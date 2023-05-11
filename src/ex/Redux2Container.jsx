import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { decrease, increase, setDiff } from '../modules/counter';
import Redux1Presentation from './Redux1Presentation';
// 컨테이너 컴포넌트란, 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미합니다. 
// 그리고, HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용합니다.

function Redux2Container() {
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }),
  shallowEqual
  ); 
// useSelector 는 기본적으로 리덕스 스토어의 상태를 조회 할 때 상태가 바뀌지 않으면 리렌더링 하지 않는다. 
// CounterContainer에서는 사실상 useSelector Hook 을 통해 매번 렌더링 될 때마다 새로운 객체 { number, diff }를 만드는 것이기 때문에 
// 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없어서 낭비 렌더링이 이루어지고 있는 것 입니다.
// 이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링을 합니다.
// shallowEqual은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교해줍니다.

  const dispatch = useDispatch(); // // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Redux1Presentation
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
}

export default Redux2Container