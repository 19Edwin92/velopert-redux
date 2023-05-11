import React from 'react'
import Redux2Container from './ex/Redux2Container'
import Redux4Container from './ex/Redux4Container'
import Redux6Container from './ex-middleware/Redux6Container'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <Redux2Container/>
    <hr/>
    <Redux4Container/>
    <hr/>
    <Redux6Container/>
    <hr/>
    <Link to="/PostListPage">POSTLITS 이동</Link>
    </>
  )
}

export default App