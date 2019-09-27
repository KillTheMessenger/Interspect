/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bodyItemsCollectionSelector } from '../../../thingsToImplement/redux/combinedReducers';
import BodyItems from '../xcomponents/BodyItems';
import * as actions from '../../../thingsToImplement/redux/actions';


class BodyItemsContainer extends PureComponent {
  componentWillMount(){
    console.log("BodyItemsContainer componentWillMount()");
  }
  componentWillUpdate(){
    console.log("BodyItemsContainer componentWillUpdate()");
  }
  componentDidCatch(){
    console.log("BodyItemsContainer componentDidCatch()")
  }
  componentWillUnmount(){
      console.log("BodyItemsContainer componentWillUnmount()")
  }
  componentWillReceiveProps(){
    console.log("BodyItemsContainer componentWillReceiveProps()")
  }
  render() {
    // TODO: Remove this prop drill of modifyBodyItem reducer, and implement in edit modal instead, once that is made, if determined to be the only place we will allow editing
    return (
      <div>
        <BodyItems
          collection = {this.props.collection}
          bodyItems = {this.props.bodyItems}
          modifyBodyItem = {this.props.modifyBodyItem}
          moveBodyItem = {this.props.moveBodyItem}
          deleteBodyItem = {this.props.deleteBodyItem}
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    bodyItems: bodyItemsCollectionSelector(state, ownProps.collection),
});
const mapDispatchToProps = dispatch => {
  return {
    modifyBodyItem: bodyItem => dispatch(actions.modifyBodyItem(bodyItem)),
    deleteBodyItem: bodyItemId => dispatch(actions.deleteBodyItem(bodyItemId)),
    moveBodyItem: (bodyItemId, destination) => dispatch(actions.moveBodyItem(bodyItemId, destination)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyItemsContainer);
