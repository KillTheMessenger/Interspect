/*eslint-disable*/
import React, { useState } from "react";
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import StyledModal from "../xcomponents/styledComponents/StyledModal.jsx";
import Select from "../xcomponents/styledComponents/ModalSelect.jsx";
import Input from "../xcomponents/styledComponents/ModelInput.jsx";
import HeaderDiv from "../xcomponents/styledComponents/HeaderDiv.jsx";
import WrapperDiv from "../xcomponents/styledComponents/WrapperDiv.jsx";
import LeftColumn from "../xcomponents/styledComponents/LeftColumn.jsx";
import RightColumn from "../xcomponents/styledComponents/RightColumn.jsx";
import ModalWrapper from "../xcomponents/styledComponents/ModalWrapper";

function BodyItemDetails(props) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  const changeObject = (src) => {
    const customResponse = JSON.stringify(src.updated_src);
    // modifyBodyItem expects an entire bodyItem
    const modifiedBodyItem = {
      ...props.src,
      customResponse
    }
    console.log(props);
    props.modifyBodyItem(modifiedBodyItem);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open modal</button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        
        <ModalWrapper>
        <HeaderDiv> Source URL </HeaderDiv>      
            <WrapperDiv>
              <LeftColumn>
                <Input /> 
                  <Select>
                    <option value="" hidden>Method</option>
                    <option value="1">GET</option>
                    <option value="2">POST</option>
                    <option value="3">PATCH</option>
                    <option value="4">DELETE</option>
                  </Select>
    
              </LeftColumn>

              <RightColumn>
                <ReactJson
                  src={props.src}
                  theme='shapeshifter:inverted'
                  iconStyle='circle'
                  style={styles}
                  collapsed={2}
                  onAdd={(props.collection === "STAGED_ITEMS") ? changeObject : false}
                  onEdit={(props.collection === "STAGED_ITEMS") ? changeObject : changeObject}
                  onDelete={(props.collection === "STAGED_ITEMS") ? changeObject : false}
                  enableClipboard={false}
                />
              </RightColumn>
            </WrapperDiv>
        </ModalWrapper>
    
      </StyledModal>
    </div>
  );
}

export default BodyItemDetails;
