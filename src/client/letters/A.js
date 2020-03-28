import React from 'react'
// We simulate that "moment" is called in "A" and "B"
import moment from 'moment'
import './A.css'
import { Link } from 'react-router-dom'

const A = () => (
  <div>
    <p>AA</p>
    <Link to="/b">GO TO B</Link>
  </div>
)

// We keep a reference to prevent uglify remove
A.moment = moment

export default A
