import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import Namespaces from 'app/namespaces';
import Nodes from 'app/nodes';
import Workloads from 'app/workloads';
import Flow from 'app/flow';
import './App.css';
import Clusters from 'app/clusters';

export default function App() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Routes>
        <Route path="/namespaces" element={<Namespaces />} />
        <Route path="/nodes" element={<Nodes />} />
        <Route path="/clusters" element={<Clusters />} />
        <Route path="/workloads/*" element={<Workloads />} />
        <Route
          path="/flow"
          element={
            <ReactFlowProvider>
              <Flow />
            </ReactFlowProvider>
          }
        />
      </Routes>
    </main>
  );
}
