/*eslint-disable*/
import React, { useState, Component } from "react";
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import StyledModal from "../xcomponents/styledComponents/StyledModal.jsx";
// import Select from "../xcomponents/styledComponents/ModalSelect.jsx";
// import Input from "../xcomponents/styledComponents/ModelInput.jsx";
import Select from './styledComponents/Select';
import HeaderDiv from "../xcomponents/styledComponents/HeaderDiv.jsx";
import WrapperDiv from "../xcomponents/styledComponents/WrapperDiv.jsx";
import LeftColumn from "../xcomponents/styledComponents/LeftColumn.jsx";
import RightColumn from "../xcomponents/styledComponents/RightColumn.jsx";
import ModalWrapper from "../xcomponents/styledComponents/ModalWrapper";
import { TiEdit } from "react-icons/ti";


class BodyItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: false, opacity: 0}
  }

  toggleModal (e) {
    console.log("toggleModal()");
    this.setState({isOpen: !this.state.isOpen});
  }
  setOpacity (val) {
    console.log("setOpacity()");
    this.setState({opacity: val});
  }

  render () {
    const styles = {
      borderRadius: '5px',
      fontFamily: '\'IBM Plex Mono\', monospace',
      fontSize: '90%',
      maxHeight: '250px',
      overflow: 'auto',
      margin: '0.75em auto',
      padding: '1em',
      border: '1px solid grey',
    };

    const changeCustomResponse = (src) => {
      const customResponse = JSON.stringify(src.updated_src);
      // modifyBodyItem expects an entire bodyItem
      const modifiedBodyItem = {
        ...this.props.bodyItem,
        customResponse
      }
      this.props.modifyBodyItem(modifiedBodyItem);
    };

    const changeMethod = (val) => {
      const customRoute = val;
      const modifiedBodyItem = {
        ...this.props.bodyItem,
        customRoute
      }
      this.props.modifyBodyItem(modifiedBodyItem);
    }

    const StyledEditButton = styled(TiEdit)`
      display: block;
      color: #aeb4b5;
      &:hover {
        color: black;
      }
    `
    return (
      <div>
        <StyledEditButton onClick={this.toggleModal.bind(this)}/>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal.bind(this)}
          onEscapeKeydown={this.toggleModal.bind(this)}
          opacity={1}
          backgroundProps={{ opacity: 1 }}
        >

          <ModalWrapper>
            <WrapperDiv>
              <LeftColumn>
                <HeaderDiv>
                  {this.props.bodyItem.sourceRoute ? ("Cloned From: "+this.props.bodyItem.sourceRoute) : null }
                  {this.props.bodyItem.sourceMethod ? ("Original Method: "+this.props.sourceMethod) : null}
                </HeaderDiv>

                Method:
                <Select
                  defaultValue = {this.props.bodyItem.customMethod ? this.props.bodyItem.customMethod : null}
                  onChange={(e) => changeMethod(e.target.value)}
                  name="customMethodSelector"
                >
                  <option value="GET">GET</option>
                  <option value="PUT">PUT</option>
                  <option value="POST">POST</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </Select>
                {this.props.bodyItem.customRoute}
              </LeftColumn>

              <RightColumn>
                <ReactJson
                  src={JSON.parse(this.props.bodyItem.customResponse)}
                  theme='shapeshifter:inverted'
                  iconStyle='circle'
                  style={styles}
                  collapsed={2}
                  onAdd={changeCustomResponse}
                  onEdit={changeCustomResponse}
                  onDelete={changeCustomResponse}
                  enableClipboard={false}
                />
              </RightColumn>
            </WrapperDiv>
          </ModalWrapper>

        </StyledModal>
      </div>
    );
  }
}
export default BodyItemDetails;
