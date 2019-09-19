/*eslint-disable*/
import React, { useState } from "react";
import StyledModal from "../xcomponents/styledComponents/StyledModal.jsx"

function FancyModalButton() {
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
          <span>HERE WE GOOO</span>
          <button onClick={toggleModal}>Close me</button>
        </StyledModal>
      </div>
    );
}

export default FancyModalButton;
