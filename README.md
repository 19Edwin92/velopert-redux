# 리덕스에 대한 공부 
- https://react.vlpt.us/redux/

리덕스는 리액트 생태계에서 가장 사용률이 높은 상태관리 라이브러리입니다. 리덕스에 대해서 배워보기 전에 한가지를 확실히 해 둘 것이 있습니다. 저렇게 많이 사용된다고 해서 여러분의 프로젝트에 리덕스가 무조건 필요하지는 않습니다. 물론, 잘 활용하면 상황에 따라 그리고 여러분의 취향에 따라 프로젝트 개발 생산성에 아주 큰 도움을 줄 수도 있습니다. 하지만 단순히 글로벌 상태 관리를 위한 것이라면 Context API를 활용하는 것 만으로 충분 할 수 있습니다.

## 01 리덕스를 사용하는 것 과 Context API를 사용하는 것의 차이

첫째, 미들웨어 : 리덕스의 미들웨어를 사용하면 액션 객체가 리듀서에서 처리되기 전에 우리가 원하는 작업들을 수행 할 수 있습니다. 미들웨어는 주로 비동기 작업을 처리 할 때 많이 사용됩니다.

  - 특정 조건에 따라 액션이 무시되게 만들 수 있습니다.
  - 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있습니다.
  - 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있습니다.
  - 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있습니다.
  - 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있습니다.

  둘째, 하나의 커다란 상태 : Context API 를 사용해서 글로벌 상태를 관리 할 때에는 일반적으로 기능별로 Context를 만들어서 사용하는 것이 일반적입니다 (물론 꼭 그렇게 할 필요는 없습니다). 반면 리덕스에서는 모든 글로벌 상태를 하나의 커다란 상태 객체에 넣어서 사용하는 것이 필수입니다. 때문에 매번 Context를 새로 만드는 수고로움을 덜 수 있습니다.

  ## 02 리덕스는 언제 사용할까? 
   아무리 리덕스가 좋은 라이브러리라 해도 여러분의 취향에 맞지 않고 어렵게만 느껴지고 맘에 들지 않는다면 사용하지 않는 것이 좋습니다.

  - 프로젝트의 규모가 큰가?
    Yes: 리덕스
    No: Context API
  - 비동기 작업을 자주 하게 되는가?
    Yes: 리덕스
    No: Context API
  - 리덕스를 배워보니까 사용하는게 편한가?
    Yes: 리덕스
    No: Context API 또는 MobX

## 03 리덕스를 사용하게 되는 키워드 
#### 첫째, 액션
상태에 어떠한 변화가 필요하게 될 땐, 우리는 액션이란 것을 발생시킵니다.

```javascript 
  {
    type:"ADD_TODO"
  }
```

#### 둘째, 액션 생성함수(Action Creator)
액션을 만드는 함수입니다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어주죠.  

```javascript
  export function addTodo(data) {
    return {
      type: "ADD_TODO",
      data
    };
  }

  // 화살표 함수로도 만들 수 있습니다.
  export const changeInput = text => ({ 
    type: "ADD_TODO",
    text
  });
```

#### 셋째, 리듀서 
변화를 일으키는 함수로, 두 가지 파라미터(`state`, `action`)을 받아온다. 리듀서는 현재의 상태와 전달받은 액션을 참고하여 새로운 상태를 만들어서 반환한다. 

```javascript
  function reducer(state, action) {
    // 상태 업데이트 로직
    return alteredState;
  }
```
만약 스위치 구문을 사용한다면 아래와 같이 작성할 수도 있다. 
```javascript
  function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}
```

#### 넷째, 스토어
리덕스에서는 한 애플리케이션당 하나의 스토어를 만들게 됩니다. 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있습니다.

#### 디스패치
디스패치는 스토어의 내장함수 중 하나입니다. 디스패치는 액션을 발생 시키는 것 이라고 이해하시면 됩니다. dispatch 라는 함수에는 액션을 파라미터로 전달합니다.. dispatch(action) 이런식으로 말이죠. 그렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줍니다.

####  다섯째, 리덕스 모듈 만들기(덕스 패턴)
- https://ahnanne.tistory.com/34
리덕스 모듈이란?
- 액션 타입(Actions), 
- 액션 생성 함수(Action Creators), 
- 리듀서(Reducer)가 모두 들어있는 자바스크립트 파일을 의미함.
- [정리하면] 이렇게 하나의 파일에 작성하는 것을 덕스(Ducks) 패턴이라고 함.
1) 반드시 리듀서 함수를 default export 해야 한다. 
2) 반드시 액션 생성 함수를 export해야 한다.
3) 반드시 접두사를 붙인 형태로 액션 타입을 정의해야 한다. (아래 예제 코드 참고)
4) (필수는 아닌데) 외부 리듀서가 모듈 내 액션 타입을 바라보고 있거나,
  모듈이 재사용 가능한 라이브러리로 쓰이는 것이라면 액션 타입을 UPPER_SNAKE_CASE 형태로 이름 짓고 export 하면 된다.

  
```javascript 
/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
  number: 0,
  diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}
```

####  여섯째, 루트 리듀서 만들기 
한 프로젝트에 여러개의 리듀서가 있을때는 이를 한 리듀서로 합쳐서 사용합니다. 합쳐진 리듀서를 우리는 루트 리듀서라고 부릅니다. 리듀서를 합치는 작업은 리덕스에 내장되어있는 combineReducers라는 함수를 사용합니다.

```javascript  
  import { combineReducers } from 'redux';
  import counter from './counter';
  import todos from './todos';

  const rootReducer = combineReducers({
    counter,
    todos
  });

  export default rootReducer;
```

#### 일곱번째, index.js 에 스토어 생성하기
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만듭니다.
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```

#### 마지막으로 리액트 프로젝트에 리덕스 적용하기 
리액트 프로젝트에 리덕스를 적용 할 때에는 react-redux 라는 라이브러리를 사용해야합니다. 해당 라이브러리를 설치해주세요. Provider로 store를 넣어서 App 을 감싸게 되면 우리가 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있게 된답니다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만듭니다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

## 가짜 API 서버 열기
- yarn add json-server  => data.json 파일 생성 후 데이터 넣기 
- yarn add axios