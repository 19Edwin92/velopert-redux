import React from 'react'
import { useNavigate } from 'react-router-dom';

function Redux9PresentationPost({ post }) {
  const { title, body } = post;
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>navigate('/PostListPage')}>목록으로 이동하기 </button>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}

export default Redux9PresentationPost