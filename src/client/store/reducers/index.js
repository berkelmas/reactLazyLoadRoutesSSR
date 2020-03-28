import { combineReducers } from 'redux'
import { usersReducer } from './users-reducer'

const RootReducer = combineReducers({
  user: usersReducer,
})

export default RootReducer
