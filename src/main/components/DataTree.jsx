import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';

const DataTree = (props) => {
  const {
    treeCount, data, options, saveUpdatedTree,
  } = props;
  const {
    onAdd, onEdit, onDelete, enableClipboard,
  } = options;

  const changeObject = (src) => {
    console.log('source', src);
    saveUpdatedTree(src.updated_src, treeCount, src.new_value, src.name, src.namespace);
  };

  return (
    <section className='wrapper' id={`tree-${treeCount}`} style={{ maxHeight: '350px', overflow: 'auto' }} >
      {/* Tree gets rendered here after component mounts */}
      <ReactJson
        src={data}
        theme='bright:inverted'
        iconStyle='square'
        onAdd={(onAdd) ? changeObject : false}
        onEdit={(onEdit) ? changeObject : false}
        onDelete={(onDelete) ? changeObject : false}
        enableClipboard={enableClipboard}
      />
    </section>
  );
};

export default DataTree;
