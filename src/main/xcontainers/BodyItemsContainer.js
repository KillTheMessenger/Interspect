/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bodyItemsCollectionSelector } from '../../../thingsToImplement/redux/combinedReducers';
import BodyItems from '../xcomponents/BodyItems';
import { modifyBodyItem } from '../../../thingsToImplement/redux/actions';


class BodyItemsContainer extends Component {

  render() {

    return (
      <div>
        <BodyItems
          bodyItems = {this.props.bodyItems}
          modifyBodyItem = {this.props.modifyBodyItem}
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    bodyItems: bodyItemsCollectionSelector(state, ownProps.collection),
});
const mapDispatchToProps = dispatch => {
  console.log("modifyBodyItem", modifyBodyItem);
  return {
    modifyBodyItem: bodyItem => dispatch(modifyBodyItem(bodyItem)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyItemsContainer);
