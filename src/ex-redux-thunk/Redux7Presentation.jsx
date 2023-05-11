import React from 'react'
import { Link } from 'react-router-dom'

function Redux7Presentation({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/PostListPage/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Redux7Presentation