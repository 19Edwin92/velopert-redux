import * as postsAPI from '../ex-redux-thunk/api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById
} from '../ex-redux-thunk/lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';
export const clearPost = () => ({ type: CLEAR_POST });

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  // post: reducerUtils.initial()
  post: {}
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      // return handleAsyncActions(GET_POSTS, 'posts')(state, action); // 아래와 같이 true 를 추가 
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      // return handleAsyncActions(GET_POST, 'post')(state, action);
      return handleAsyncActionsById(GET_POST, 'post', true)(state, action); // handleAsyncActionsById 의 3번째 인자 true
      // 데이터를 제대로 캐싱하고 싶다면 아예 요청을 하지 않는 방식을 택하시고, 포스트 정보가 바뀔 수 있는 가능성이 있다면 새로 불러오긴 하지만 로딩중은 표시하지 않는 형태로 구현을 하시면 되겠습니다.
    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial()
    //   };  
    default:
      return state;
  }
}

// handleAsyncActions를 기점으로 리팩토링 한 결과

// import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
// import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils';

// /* 액션 타입 */

// // 포스트 여러개 조회하기
// const GET_POSTS = 'GET_POSTS'; // 요청 시작
// const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
// const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// // 포스트 하나 조회하기
// const GET_POST = 'GET_POST';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_ERROR = 'GET_POST_ERROR';

// // 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// // initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
// const initialState = {
//   posts: reducerUtils.initial(),
//   post: reducerUtils.initial()
// };

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: reducerUtils.loading()
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: reducerUtils.success(action.payload) // action.posts -> action.payload 로 변경됐습니다.
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: reducerUtils.error(action.error)
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: reducerUtils.loading()
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.payload) // action.post -> action.payload 로 변경됐습니다.
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: reducerUtils.error(action.error)
//       };
//     default:
//       return state;
//   }
// }

// 리펙토링한 결과 위에 

// import * as postsAPI from '../ex-redux-thunk/api/posts'; // api/posts 안의 함수 모두 불러오기

// /* 액션 타입 */

// // 포스트 여러개 조회하기
// const GET_POSTS = 'GET_POSTS'; // 요청 시작
// const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
// const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// // thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// // 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS }); // 요청이 시작됨
//   try {
//     const posts = await postsAPI.getPosts(); // API 호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
//   }
// };

// // 포스트 하나 조회하기
// const GET_POST = 'GET_POST';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_ERROR = 'GET_POST_ERROR';

// // thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST }); // 요청이 시작됨
//   try {
//     const post = await postsAPI.getPostById(id); // API 호출
//     dispatch({ type: GET_POST_SUCCESS, post }); // 성공
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e }); // 실패
//   }
// };

// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null
//   }
// };

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: null,
//           error: null
//         }
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: action.posts,
//           error: null
//         }
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: {
//           loading: true,
//           data: null,
//           error: action.error
//         }
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: null,
//           error: null
//         }
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: action.post,
//           error: null
//         }
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: {
//           loading: true,
//           data: null,
//           error: action.error
//         }
//       };
//     default:
//       return state;
//   }
// }