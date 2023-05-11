const myLogger = store => next => action => {
  console.log(action); // 먼저 액션을 출력합니다.
  const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
  console.log('\t', "middlewarecounter :", store.getState().middlewarecounter);
  // '\t' 는 탭 문자 입니다. 변화된 상태의 값을 가져오는 것도 가능하다. 
  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
};

export default myLogger;