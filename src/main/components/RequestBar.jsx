import React, { useState, useContext } from 'react';
import HeaderBar from './HeaderBar.jsx';
import Form from './InlineForm.jsx';
import Select from './InlineSelect.jsx';
import Input from './InlineInput.jsx';
import Button from './Button.jsx';
import { TestsContext } from '../testsContext';


const RequestBar = (props) => {
  const {
    SourceOrDest, setData,
  } = props;
  const [tests, setTests] = useContext(TestsContext);

  const method = (SourceOrDest === 'dest' ? 'POST' : 'GET');
  const [selected, setSelected] = useState(method);
  const [uri, setUri] = useState('');
  const [valid, setValid] = useState(false);

  // header info
  const [headerType, setHeaderType] = useState('Authorization');
  const [authType, setType] = useState('Bearer Token');
  const [headerKey, setHeaderKey] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'method') setSelected(value);
    else if (name === 'uri') setUri(value);

    // Header info
    if (name === 'Authentication') setHeaderType(value);
    if (name === 'headerKey') setHeaderKey(`Bearer ${value}`);

    setValid(e.target.parentElement.reportValidity());
  };

  const handleInvalid = (e) => {
    e.preventDefault();
  };

  const runTest = (link, sendingObj, testsClone, i) => {
    const test = testsClone;
    fetch(link, sendingObj)
      .then((response) => {
        test[i].status = response.status;
        if (i === test.length - 1) setTests(test);
      })
      .catch(error => console.log(error));
  };

  const sendFetch = (e) => {
    e.preventDefault();
    if (!valid) return alert('Enter a valid URI');

    if (SourceOrDest === 'source') {
      const sendingObj = { method: selected, mode: 'cors' };
      if (headerType !== 'NONE') sendingObj.headers = { [headerType]: headerKey };

      fetch(uri, sendingObj)
        .then(res => res.json())
        .then((res) => {
          setTests([{ payload: res, status: '' }]);
          setData(res);
        });
    } else if (SourceOrDest === 'dest') {
      const testsClone = [...tests];
      const sendingObj = { method: selected, mode: 'cors' };
      if (headerType !== 'NONE') sendingObj.headers = { [headerType]: headerKey };

      for (let i = 0; i < testsClone.length; i += 1) {
        sendingObj.body = JSON.stringify(testsClone[i].payload);
        runTest(uri, sendingObj, testsClone, i);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={sendFetch} onInvalid={handleInvalid} bordered={true}>
        {
          (SourceOrDest === 'source')
          && <Select name='method' id='fetchTypeInput' multiple={false} value={selected}
            onChange={handleChange} >
            <option value='GET'>GET</option>
          </Select>
        }
        {
          (SourceOrDest === 'dest')
          && <Select name='method' id='fetchTypeInput' multiple={false} value={selected}
            onChange={handleChange} >
            <option value='POST'>POST</option>
            <option value='PATCH'>PATCH</option>
            <option value='PUT'>PUT</option>
          </Select>
        }
        <Input bordered={true} placeholder='Endpoint URI' name='uri' id='urlInput' type='url' onChange={handleChange}></Input>
        <Button enabled={valid} type='submit' value='Submit' variation={'positive'}>Send</Button>
      </Form>
      <HeaderBar header={headerType} authType={authType} handleChange={handleChange}/>
    </div>
  );
};

export default RequestBar;
