import React from 'react'
// 프리젠테이션 컴포넌트 : 리덕스 스토어에 직접적으로 접근하지 않고, 필요한 값 또는 함수를 props로 받아와서 사용하는 컴포넌트 
// 프리젠테이셔널 컴포넌트에선 주로 이렇게 UI를 선언하는 것에 집중하며, 필요한 값들이나 함수는 props 로 받아와서 사용하는 형태로 구현합니다.



function Redux1Presentation({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = e => {
    onSetDiff(parseInt(e.target.value));
    // e.target.value 의 타입은 문자열이기 때문에 숫자로 변환해주어야 합니다.
    // 두번째 인자는 진법을 나타낸다. 즉 십진법체계의 숫자기호를 따른다는 것이다. 
    // onSetDiff(parseInt(e.target.value, 10)); // 즉 생략하는 것도 가능한 것이다. 
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  )
}

export default Redux1Presentation