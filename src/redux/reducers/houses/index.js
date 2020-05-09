import _ from 'lodash'
import * as types from '../../actions/types'

const initialState = {
  houses: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasReachedEnd: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.FETCH_HOUSES:
      return { ...state, loading: true }
    case types.FETCH_HOUSES_SUCCESS:
      return {
          ...state,
          loading: false,
          houses: _.uniqBy([...state.houses, ...action.payload.houses], 'id'),
          currentPage: action.payload.currentPage,
          hasReachedEnd: action.payload.houses.length === 0,
          error: null
      }
    case types.FETCH_HOUSES_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
