import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Namespaces from 'app/namespaces';
import Nodes from 'app/nodes';
import Workloads from 'app/workloads';
import './App.css';

export default function App() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Routes>
          <Route path="/namespaces" element={<Namespaces />} />
          <Route path="/nodes" element={<Nodes />} />
          <Route path="/workloads/*" element={<Workloads />} />
        </Routes>
      </div>
    </main>
  );
}
