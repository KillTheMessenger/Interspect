import { connect } from 'react-redux';
import React, {Component} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import XSourcePanel from './XSourcePanel';
import XMockupsPanel from './XMockupsPanel';
import XDestinationPanel from './XDestinationPanel';
import store from '../../../thingsToImplement/redux/reduxStore';
import * as actions from '../../../thingsToImplement/redux/actions';

// const socket = io.connect('http://localhost:3001/');

const XPanelsWrapper = styled.section`
  display: flex;
  height: 100vh;
`;

class XPanels extends Component {

  constructor(props){
    super(props);
    // this.activatePanel = this.activatePanel.bind(this);
  }
  // const [activePanel, setActivePanel] = useState('source');
  // const [data, setData] = useState(undefined);
  // const [getFetchTimes, setGetFetchTimes] = useState([]);
  // const [postFetchTimes, setPostFetchTimes] = useState([]);
  // const [hContentType, setContentType] = useState('');

  // const [tests, setTests] = useContext(TestsContext);


  // socket.on('post_received', (postedData) => {
  //   // setData(postedData);
  //   // setTests([{
  //   //   payload: postedData, status: '', name: 'Test #1',
  //   // }]);

  //   // clear old performance metrics on new post
  //   // if (getFetchTimes.length) setGetFetchTimes([]);
  //   // if (postFetchTimes.length) setPostFetchTimes([]);
  //   console.log(postedData);
  // });
  render() {

    return (
      <XPanelsWrapper>
        <XSourcePanel
          active={this.props.source_active}
          onClick={this.props.activatePanel}
        />
  
        <XMockupsPanel
          active={this.props.mockups_active}
          onClick={this.props.activatePanel}
        />
  
        <XDestinationPanel
          active={this.props.destination_active}
          onClick={this.props.activatePanel}
        />
      </XPanelsWrapper>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    source_active: state.SourceReducer.source_active,
    mockups_active: state.MockupsReducer.mockups_active,
    destination_active: state.DestinationReducer.destination_active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activatePanel: (panelToActivate) => dispatch(actions.activatePanel(panelToActivate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(XPanels);
