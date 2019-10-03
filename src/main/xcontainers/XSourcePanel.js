import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequestBar from '../xcomponents/RequestBar.jsx';
import StyledPanel from './StyledPanel.jsx';
import BodyItemsContainer from './BodyItemsContainer';
// import PerformanceMetrics from '../components/PerformanceMetrics.jsx';
import * as actions from '../../../thingsToImplement/redux/actions';

class SourcePanel extends Component {
  handleSourcePanelClick() {
    if (!this.props.active) {
      this.props.onClick("source")
    }
  }
  render() {
    const { onClick, active } = this.props;
    return (

      <StyledPanel
        onClick={() => { this.handleSourcePanelClick(); }}
        active={active}
        style={{ cursor: 'pointer' }}
        >
        <h1>Source</h1>
        <RequestBar createBodyFromSource={this.props.createBodyFromSource}/>
        <BodyItemsContainer
          collection='CLONED_ITEMS'
          // items={this.props.clonedItems}
        />
      </StyledPanel>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBodyFromSource: bodyItem => dispatch(actions.createBodyFromSource(bodyItem)),
  };
};

SourcePanel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(SourcePanel);


// export default SourcePanel;
