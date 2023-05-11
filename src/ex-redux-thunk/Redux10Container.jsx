import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPost, getPost } from '../modules/posts';
import Redux9PresentationPost from './Redux9PresentationPost';

function Redux10Container({postId}) {
  const { data, loading, error } = useSelector(state => state.posts.post[postId]) || {
    loading: false,
    data: null,
    error: null
  }; // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록
  // 위 방식은 아예 요청을 하지 않는 방식으로 해결한 것입니다.
  // 만약, 요청은 하지만 로딩중은 다시 보여주지 않는 방식으로 해결하려면 리듀서를 다음과 같이 수정하고
  const dispatch = useDispatch();

  useEffect(() => {
    // if (data) return; // [추가사항] 포스트가 존재하면 아예 요청을 하지 않음 
    dispatch(getPost(postId));
    return () => { // 언마운트 될 때, 초기화 선언
      dispatch(clearPost());
    };
  // }, [postId, dispatch, data]); // 비동기처리시, 테이터가 변경되면 무한변경에 빠지기에, 데이터 부분은 제외해주었다. 
}, [postId, dispatch]); 
  // 렇게 해주면, 포스트 페이지에서 떠날때마다 포스트를 비우게 되므로, 
  // 다른 포스트를 읽을 때 이전 포스트가 보여지는 문제가 해결되버립니다. 
  // 이 방법은 충분히 편하고, 쉽기도 하지만, 한가지 아쉬운점이 있습니다.
  // 바로, 이미 읽었던 포스트를 불러오려고 할 경우에도 새로 요청을 한다는 것이죠.

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <Redux9PresentationPost post={data} />;
}

export default Redux10Container