import React from 'react';
import AceEditor from 'react-ace';
import * as monaco from 'monaco-editor';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

function YamlEditor({ yamlVal, onChange }) {
  return (
    <>
      <AceEditor
        width="100%"
        height="300px"
        fontSize={24}
        mode="yaml"
        theme="github"
        onChange={onChange}
        value={yamlVal}
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
    </>
  );
}

export default YamlEditor;
