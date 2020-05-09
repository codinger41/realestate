import axios from 'axios'
import * as types from '../types'

export const getHouses = () => {
  return async (dispatch, getState) => {
    const currentPage = getState().houses.currentPage
    const newPage = currentPage + 1

    dispatch({ type: types.FETCH_HOUSES })
    try {
      const { data } = await axios.get(
        `http://app-homevision-staging.herokuapp.com/api_project/houses?page=${Number(
          newPage
        )}&per_page=100`
      )
      const hasReachedEnd = data.houses.length === 0
      dispatch({
        type: types.FETCH_HOUSES_SUCCESS,
        payload: { houses: data.houses, currentPage: newPage, hasReachedEnd },
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_HOUSES_FAILURE,
        error: 'An error occured. Try again later.',
      })
    }
  }
}
