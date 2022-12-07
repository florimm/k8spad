import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  useReactFlow,
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

const rfStyle = {
  backgroundColor: 'rgb(74 77 86)',
};

const namespaceNodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    backgroundColor: '#fff',
    width: 120,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const podsNodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    backgroundColor: '#fff',
    width: 170,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function Flow() {
  const [selectedNamespace, setSelectedNamespace] = React.useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setViewport, zoomIn, zoomOut } = useReactFlow();

  useQuery(
    'namespaces',
    () => api.core.listNamespace().then((res) => res.body.items),
    {
      onSettled(data, error) {
        if (!error && data) {
          setNodes(
            data.map((n, index) => ({
              id: n.metadata.uid,
              position: {
                x: 0,
                y: 50 * index,
              },
              ...namespaceNodeDefaults,
              data: {
                label: n.metadata?.name,
                k8sResource: 'namespace',
                resource: n,
              },
            }))
          );
        }
      },
    }
  );

  const namespace = selectedNamespace?.data.resource.metadata?.name;
  useQuery(
    ['pods', namespace],
    ({ queryKey }) => api.core.listNamespacedPod(queryKey[1]),
    {
      onSettled(data, error) {
        const parentPodNode = {
          id: 'pods',
          data: { label: 'Pods' },
          position: { x: 300, y: 10 },
          className: 'light',
          style: {
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            width: 500,
            height: '100vh',
          },
        };

        if (!error && data) {
          const nodesWithConnection = data.body.items.map((n, index) => {
            const podsNode = {
              id: n.metadata.uid,
              position: {
                x: 50,
                y: 80 * (index + 1),
              },
              ...podsNodeDefaults,
              data: { label: n.metadata?.name, k8sResource: 'pods' },
              parentNode: 'pods',
              extent: 'parent',
            };
            const edge = {
              id: `${selectedNamespace.id}-${podsNode.id}`,
              source: `${selectedNamespace.id}`,
              target: `${podsNode.id}`,
              label: 'pods',
            };
            return { podsNode, edge };
          });
          setNodes((n: any) => {
            return [
              ...n.filter((t) => t.data.k8sResource === 'namespace'),
              parentPodNode,
              ...nodesWithConnection.map((t) => t.podsNode),
            ];
          });
          console.log('selectedNamespace', selectedNamespace);
          setEdges(nodesWithConnection.map((t) => t.edge));
        }
      },
      enabled: namespace !== null && namespace !== undefined,
    }
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (ev) => {
    console.log('el', ev);
    const node = nodes.find((t) => t.id == ev.target.dataset.id);
    if (node.data.k8sResource === 'namespace') {
      setSelectedNamespace(node);
      //zoomIn({ duration: 800 });
      setViewport(
        { x: node.position.x + 20, y: node.position.y, zoom: 1 },
        { duration: 800 }
      );
    }
  };

  const onSave = () => {
    setNodes((p) => [...p, selectedNamespace]);
  };

  return (
    <div style={{ paddingTop: '20px', height: '95vh' }}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(ev) => onNodeClick(ev)}
        style={rfStyle}
      >
        {/* <MiniMap />
        <Controls /> */}
        <Background />
        {selectedNamespace !== null ? (
          <div className="updatenode__controls">
            <label>label:</label>
            <input
              value={selectedNamespace.data.label}
              onChange={(evt) =>
                setSelectedNamespace((n) => ({
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
