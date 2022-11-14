import { Routes, Route } from 'react-router-dom';
import Deployments from './deployments';
import Pods from './pods';

export default function Workloads() {
  return (
    <Routes>
      <Route path="/pods" element={<Pods />} />
      <Route path="/deployments" element={<Deployments />} />
    </Routes>
  );
}
