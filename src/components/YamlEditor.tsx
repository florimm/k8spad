import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';
import { Button } from 'react-bootstrap';

function YamlEditor({ yamlVal, onSave }) {
  const [val, setVal] = React.useState(yamlVal);

  const onChange = (newValue) => {
    setVal(newValue);
  };

  const saveChanges = () => {
    onSave(val);
  };
  return (
    <>
      <AceEditor
        width="100%"
        height="300px"
        fontSize={24}
        mode="yaml"
        theme="github"
        onChange={onChange}
        value={val}
        name="current-yamlEditor"
        highlightActiveLine
        showPrintMargin={false}
        showGutter
        editorProps={{ $blockScrolling: false }}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
        }}
      />
      <Button onClick={saveChanges}>Save and close</Button>
    </>
  );
}

export default YamlEditor;
