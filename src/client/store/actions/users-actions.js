import axios from 'axios'
import { GET_USERS } from '../types/user-types'

export const getUsersAction = () => {
  return async dispatch => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    dispatch({ type: GET_USERS, payload: res.data })
  }
}
