import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StyledPanel from './StyledPanel.jsx';
import BodyItemCreator from '../xcomponents/BodyItemCreator.js';
// import ImportExportArea from './ImportExportArea.jsx';
import * as actions from '../../../thingsToImplement/redux/actions';
import styled from 'styled-components';
import BodyItemsContainer from './BodyItemsContainer';

const CollectionTitle = styled.div`
  text-align: center;
`;
class MockupsPanel extends Component {
  handleMockupsPanelClick() {
    if (!this.props.active) {
      this.props.onClick("mockups")
    }
  }
  render() {
    const { active } = this.props;
    const emptyBodyItem = {
      editorOpen: false,
      bodyItemId: 0,
      sourceRoute: null,
      sourceMethod: null,
      sourceResponse:'',
      sourceResponseType: "JSON",
      customRoute: "/",
      customMethod: "GET",
      customResponse:'',
      customResponseType: "JSON",
      collection: null
    };

    return (

      <StyledPanel
        onClick={()=> {this.handleMockupsPanelClick()}}
        active={active}
        style={{ cursor: 'pointer' }}
        >
        <h1>Mockups</h1>
        {active ? (
          <div>
            <BodyItemCreator/>
            <CollectionTitle>MOCK SERVER</CollectionTitle>
            <BodyItemsContainer  collection='HOSTED_ITEMS' />
            <CollectionTitle>MOCK LIBRARY</CollectionTitle>
            <BodyItemsContainer  collection='STAGED_ITEMS' />
              {/* // updateBodyItemMockServer = {this.props.updateBodyItemMockServer} */}
            {/* // /> */}
            {/* <ImportExportArea/> */}
          </div>

         ) : null }
      </StyledPanel>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBodyItem: (item) => dispatch(actions.createBodyItem(item)),
    updateBodyItemMockServer: () => dispatch(actions.updateBodyItemMockServer()),
  };
}
MockupsPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}
export default connect(null, mapDispatchToProps)(MockupsPanel);
