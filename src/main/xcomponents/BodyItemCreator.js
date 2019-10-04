import React, { Component } from "react";
// import styled from 'styled-components';
import ReactJson from 'react-json-view';
import StyledModal from "../xcomponents/styledComponents/StyledModal.jsx";
import Select from './styledComponents/Select';
import Button from './styledComponents/Button';
import ItemDetailsArea from "./styledComponents/ItemDetailsArea.jsx";
import WrapperDiv from "../xcomponents/styledComponents/WrapperDiv.jsx";
import LeftColumn from "../xcomponents/styledComponents/LeftColumn.jsx";
import RightColumn from "../xcomponents/styledComponents/RightColumn.jsx";
import ModalWrapper from "../xcomponents/styledComponents/ModalWrapper";

const jsonStyles = {
  borderRadius: '5px',
  fontFamily: '\'IBM Plex Mono\', monospace',
  fontSize: '90%',
  maxHeight: '250px',
  overflow: 'auto',
  margin: '0.75em auto',
  padding: '1em',
  border: '1px solid grey',
};
export default class BodyItems extends Component {
  constructor(props) {
    super(props);
    this.state = { routeVal: null, responseVal: null, methodVal: "GET", isOpen: false};
    this.startNewItem = this.startNewItem.bind(this);
  }
  startNewItem(){
    console.log("this.state ", this.state);
    this.setState({ routeVal: null, responseVal: null, methodVal: "GET", isOpen: true});
    console.log("this.state ", this.state);
  }
  shouldComponentUpdate(){
    return true;
  }
  saveItem(){
    // dispatch action with object made from state to save
    // close modal
    const newItem = {
      editorOpen: false,
      sourceRoute: null,
      sourceMethod: null,
      sourceResponse:null,
      sourceResponseType: null,
      customRoute: this.state.routeVal,
      customMethod: this.state.methodVal,
      customResponse: this.state.responseVal,
      customResponseType: "JSON",
      collection: "STAGED_ITEMS"
    }
    this.props.createBodyItem(newItem);
    // this.props.updateBodyItemMockServer();
    this.setState({isOpen: false});
  }
  changeMethod(e) {
    e.preventDefault();
    this.setState({methodVal: e.target.value});
  }
  changeRoute(e) {
    this.setState({routeVal: e.target.value});
  }
  changeResponse(src) {
    this.setState({responseVal: JSON.stringify(src.updated_src)})
  }

  render(){
    // const ItemCreatorArea = styled("div")`
    //   /* width: 100%;
    //   text-align: center; */
    // `;
    return (
      <div className="green-potatos">
        <Button onClick={()=>{this.startNewItem()}}>+ New Mock</Button>
        <StyledModal
          isOpen={true}
          onBackgroundClick={this.saveItem.bind(this)}
          onEscapeKeydown={this.saveItem.bind(this)}
        >
          {/* <ModalWrapper>
            <WrapperDiv>
              <LeftColumn>
                <ItemDetailsArea>
                  <div className="detail-header">Mock Options:</div>
                  <div className="detail-pair">
                    <div className="detail-label">
                      Method:
                    </div>
                    <div className="detail-value">
                      <Select
                        defaultValue = {this.state.methodVal}
                        onChange={(e) => this.changeMethod(e).bind(this)}
                        name="customMethodSelector"
                      >
                        <option value="GET">GET</option>
                        <option value="PUT">PUT</option>
                        <option value="POST">POST</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                      </Select>
                    </div>
                  </div>
                  <div className="detail-pair">
                    <div className="detail-label">
                      Route:
                    </div>
                    <div className="detail-value">
                        <textarea
                          placeholder="/filepath/for/your/mock"
                          onChange={this.changeRoute.bind(this)}
                        />
                    </div>
                  </div>
                </ItemDetailsArea>

              </LeftColumn>

              <RightColumn>
                <ReactJson
                  src={""}
                  theme='shapeshifter:inverted'
                  iconStyle='circle'
                  style={jsonStyles}
                  onAdd={this.changeResponse.bind(this)}
                  onEdit={this.changeResponse.bind(this)}
                  onDelete={this.changeResponse.bind(this)}
                  enableClipboard={false}
                />
              </RightColumn>
            </WrapperDiv>
          </ModalWrapper> */}
        </StyledModal>
      </div>
    )
  }
}
