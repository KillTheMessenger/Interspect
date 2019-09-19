/* eslint-disable */

import Modal  from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 60rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
`;
export default StyledModal;
