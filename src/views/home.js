import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/houses'

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const Home = (props) => {
  const { houses, loading, currentPage, error, hasReachedEnd } = props.houseReducer

  useEffect(() => {
    if (houses.length === 0) {
      props.getHouses(currentPage)
    }
    
    window.onscroll = () => {
      if (hasReachedEnd || loading || error) return;

      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        props.getHouses()
      }
    };
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>Houses for sale</h1>
      <div className="cards">
        {houses.map((house) => (
          <div className="card" key={house.id}>
            <img src={house.photoURL} className="img" alt={house.address} />
            <div className="details">
              <p className="address">{house.address}</p>
            </div>
            <div className="details">
              <p className="by">by {house.homeowner}</p>
              <h2 className="price">${numberWithCommas(house.price)}</h2>
            </div>
          </div>
        ))}
      </div>
      {!hasReachedEnd && error && <h5>An error has occured. Retrying...</h5>}
      {!hasReachedEnd && loading && <div className="loader"> Loading... </div>}
      {hasReachedEnd && <h5>You have reached the end of the list!</h5>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  houseReducer: state.houses,
})

const mapDispatchToProps = {
  getHouses: actions.getHouses,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
