import React, { Component } from 'react';
import ReactJson from 'react-json-view';

// import PropTypes from 'prop-types';

// change this into a class component if you'd like.
class BodyItem extends Component{
  render () {

    const styles = {
      borderRadius: '5px',
      fontFamily: '\'IBM Plex Mono\', monospace',
      fontSize: '90%',
      maxHeight: '250px',
      overflow: 'auto',
      margin: '0.75em auto',
      padding: '1em',
      border: '1px solid grey'
    };
    
    const changeObject = (src) => {
      modifyBodyItem(src)
    };
    return (
      <div>git stat
      Look at me! I'm a BodyItem. When I have a visualizer I'll be displaying:
      {/* {JSON.stringify(bodyItem)} */}

      <ReactJson
          src={this.props.bodyItem}
          theme='shapeshifter:inverted'
          iconStyle='circle'
          style={styles}
          collapsed={2}
          // onAdd={(onAdd) ? changeObject : false}
          onEdit={(true) ? changeObject : changeObject}
          // onDelete={(onDelete) ? changeObject : false}
          // enableClipboard={enableClipboard}
          />
    </div>
    )  
  }
};

export default BodyItem;
