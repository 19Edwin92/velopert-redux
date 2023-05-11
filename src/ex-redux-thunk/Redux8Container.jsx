import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../modules/posts';
import Redux7Presentation from './Redux7Presentation';
import { Link } from 'react-router-dom';

function Redux8Container() {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
    // 컴포넌트 마운트 후 포스트 목록 요청
    useEffect(() => {
      // if (data) return; // 이를 통해서 재요청하지 않는다. 왜냐? 중앙관리소에 있으니까 // 재로딩 안하는 2번째 방법을 위한 각주 
      dispatch(getPosts());
    }, [dispatch]);

    // if (loading) return <div>로딩중...</div>; // 아래와 같이 수정
    // 이렇게 구현을 해주고 나면 뒤로가기를 눌렀을 때 새 데이터를 요청하긴 하지만, '로딩중...'이라는 문구를 보여주지 않게 된답니다.
    // 새로 요청도 보내서 최신화 시켜주기도 하고, 로딩 중이라는 멘트도 보여주지 않는다. 
    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;
    return (
      <>
      <Link to={"/"} children="홈으로 이동하기"/>
      <Redux7Presentation posts={data} />
      </>
    );
}

export default Redux8Container