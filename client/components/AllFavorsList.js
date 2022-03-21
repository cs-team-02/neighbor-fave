import React from 'react';
import { connect } from 'react-redux';
import { fetchFavors } from '../store/favors';
import Map from './Map';

export class AllFavorsList extends React.Component {
  constructor(props) {
    super(props);
    this.renderFavorsList = this.renderFavorsList.bind(this);
  }
  componentDidMount() {
    // console.log('THIS.STATE', this.state);
    this.props.loadFavors();
  }

  renderFavorsList(favorsArr) {
    if (favorsArr === undefined) {
      return <h3>Loading favors...</h3>;
    } else if (favorsArr.length === 0) {
      return <h3>Looks like noone needs a favor...</h3>;
    } else {
      return (
        <div>
          <Map />
          {favorsArr.map((favor) => (
            <div>
              <hr />
              <div>Favor needed: {favor.favorDate}</div>
              <div>
                <b>{favor.title}</b>
              </div>
              <div>{favor.description}</div>
              <div>Address: {favor.user.address}</div>
              <div>Volunteers: {favor.user.bids.length}</div>
            </div>
          ))}
        </div>
      );

      //end
    }
  }

  render() {
    return <div>{this.renderFavorsList(this.props.favors)}</div>;
  }
}

const mapState = (state) => {
  return {
    favors: state.favors,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadFavors: () => dispatch(fetchFavors()),
  };
};

export default connect(mapState, mapDispatch)(AllFavorsList);
