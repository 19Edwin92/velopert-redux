import React from 'react';
import Redux10Container from '../ex-redux-thunk/Redux10Container';
import { useParams } from 'react-router-dom';

function PostPage() {
  // const { id } = match.params; // URL 파라미터 조회하기
  //  React Router v6에서는 match 객체가 제거되고 대신 useParams() 훅을 사용하여 라우트 매개 변수를 가져옵니다.
  const {id} = useParams()

  // URL 파라미터 값은 문자열이기 때문에 parseInt 를 사용하여 숫자로 변환해주어야 합니다.
  return <Redux10Container postId={parseInt(id, 10)} />;
}

export default PostPage;