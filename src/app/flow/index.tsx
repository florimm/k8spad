import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { useClusterState } from 'contexts';
import api from '../api';
import './Flow.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'namespace' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'deployments' },
];

function Flow() {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (ev) => {
    const node = nodes.find((t) => t.id == ev.target.dataset.id);
    setSelectedNode(node);
  };

  const onSave = () => {
    setNodes((p) => [...p, selectedNode]);
  };

  return (
    <div style={{ paddingTop: '20px', width: '80vw', height: '80vh' }}>
      <ReactFlow
        style={{ width: '80vw', height: '80vh' }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(ev) => onNodeClick(ev)}
      >
        <MiniMap />
        <Controls />
        <Background />
        {selectedNode !== null ? (
          <div className="updatenode__controls">
            <label>label:</label>
            <input
              value={selectedNode.data.label}
              onChange={(evt) =>
                setSelectedNode((n) => ({
                  ...n,
                  data: { label: evt.target.value },
                }))
              }
            />
            <button onClick={onSave}>Save</button>
          </div>
        ) : null}
      </ReactFlow>
    </div>
  );
}

export default Flow;
