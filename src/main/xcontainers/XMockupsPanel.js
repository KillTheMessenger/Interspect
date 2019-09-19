/* eslint-disable */

import React, { Component } from 'react';
// import RequestBar from '../components/RequestBar.jsx';
import PropTypes from 'prop-types';
import StyledPanel from './StyledPanel.jsx';
import styled from 'styled-components';
import FancyModalButton from '../xcomponents/FancyModalButton.jsx'
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

// import PerformanceMetrics from '../components/PerformanceMetrics.jsx';


const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

export default class MockupsPanel extends Component {
  render() {
    const { onClick, active } = this.props;
    return (

      <StyledPanel
        onClick={()=> {onClick("mockups")}}
        active={active}
        style={{ cursor: 'pointer' }}
        >
        <h1>Mockups</h1>

        {/* heh */}
        <ModalProvider backgroundComponent={FadingBackground}>
          <div className="App">
        <FancyModalButton />
      </div>
        </ModalProvider>
      </StyledPanel>
    )
  }
}

MockupsPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}