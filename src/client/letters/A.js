import React, { useEffect } from 'react'
// We simulate that "moment" is called in "A" and "B"
import moment from 'moment'
import './A.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from '../store/actions/users-actions'

const A = props => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsersAction())
  }, [])

  return (
    <div>
      <p>AA</p>
      <Link to="/b">GO TO B</Link>
      <p>USERS</p>
      <ul>{users && users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  )
}

// We keep a reference to prevent uglify remove
A.moment = moment

export const aLoadData = dispatch => {
  return dispatch(getUsersAction())
}

export default A
