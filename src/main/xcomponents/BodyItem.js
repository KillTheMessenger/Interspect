import React, { Component } from 'react';
import Button from './styledComponents/Button';
import styled from 'styled-components';
import BodyItemDetails from '../xcomponents/BodyItemDetails.jsx'
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import ReactJson from 'react-json-view';

// import PropTypes from 'prop-types';

class BodyItem extends Component{

  constructor(props){
    super(props)
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
    const saveButton = (
      <Button
        variation='positive'
        enabled
        onClick={() => { 
          this.props.moveBodyItem(bodyItem.bodyItemId, "STAGED_ITEMS");
        }}
      >
        Save
      </Button>
    )

    const addToServerButton = (
      <Button
        variation='positive'
        enabled
        onClick={()=> {
          this.props.moveBodyItem(bodyItem.bodyItemId, "HOSTED_ITEMS")
        }}
      >Add To Server</Button>
    )

    const removeFromServerButton = (
      <Button
        variation='negative'
        enabled
        onClick={()=> {
          this.props.moveBodyItem(bodyItem.bodyItemId, "STAGED_ITEMS")
        }}
      >Remove from Server

      </Button>
    )

    const FadingBackground = styled(BaseModalBackground)`
      opacity: ${props => props.opacity};
      transition: opacity ease 200ms;
    `;
    const editable = () => {return this.props.collection === "STAGED_ITEMS" ? true : false;}
    const changeObject = (src) => {
      const customResponse = JSON.stringify(src.updated_src);
      // modifyBodyItem expects an entire bodyItem
      const modifiedBodyItem = {
        ...bodyItem,
        customResponse
      }
      console.log(modifiedBodyItem);
      this.props.modifyBodyItem(modifiedBodyItem);
    };
    const bodyItem = this.props.bodyItem;
    const src = JSON.parse(bodyItem.customResponse);
    return (
      <ModalProvider backgroundComponent={FadingBackground}>
        {this.props.collection !== "STAGED_ITEMS" ? null : 
          (<BodyItemDetails 
            src={src}
            modifyBodyItem={this.props.modifyBodyItem}
            collection={this.props.collection}
          />)
        }
        <Button onClick={()=>{
          this.props.deleteBodyItem(bodyItem.bodyItemId);
        }}>
          <span aria-hidden="true">&times;</span>
        </Button>
        <ReactJson
          src={src}
          theme='shapeshifter:inverted'
          iconStyle='circle'
          style={styles}
          collapsed={2}
          onAdd={(editable) ? changeObject : false}
          onEdit={(editable) ? changeObject : changeObject}
          onDelete={(editable) ? changeObject : false}
          enableClipboard={false}
        />

        {this.props.collection === "CLONED_ITEMS" ? saveButton : null}
        {this.props.collection === "STAGED_ITEMS" ? addToServerButton : null}
        {this.props.collection === "HOSTED_ITEMS" ? removeFromServerButton : null}
      </ModalProvider>
    )  
  }
};

export default BodyItem;
