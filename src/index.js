import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './modules';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
// import myLogger from './ex-middleware/myLogger.js';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import { createBrowserHistory } from 'history';

// const composedEnhancer = composeWithDevTools(applyMiddleware(myLogger, logger));
// applyMiddleware : 리덕스에 미들웨어를 적용 할 때에는 다음과 같이 여러개의 미들웨어를 등록 할 수 있답니다.
// const composedEnhancer = composeWithDevTools(applyMiddleware(logger));
// const store = createStore(rootReducer, composedEnhancer)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)))
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
// createStore 함수에 여러 개의 store enhancer를 전달하려고 하기 때문에 발생합니다. store enhancer는 createStore 함수의 두 번째 인자로 전달되며, 여러 개를 함께 사용할 수 없습니다.
// compose 함수는 여러 개의 함수를 인자로 받아, 함수를 합성한 하나의 함수를 반환합니다. 이를 활용하여 applyMiddleware와 composeWithDevTools를 결합하고, 하나의 store enhancer로 만들 수 있습니다.
// 또는 composeWithDevTools 안에 applyMiddleware를 넣어도 된다. 
const customHistory = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <React.StrictMode>
  <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/PostListPage' element={<PostListPage/>} exact={true}/>
      <Route path='/PostListPage/:id' element={<PostPage/>}/>
    </Routes>

  </React.StrictMode>
  </Provider>
  </BrowserRouter>
);


reportWebVitals();
