import React from 'react';
import { useQuery } from 'react-query';
import api from '../../api';

const Pods = () => {
  const { isLoading, isError, data, error } = useQuery('pods', () =>
    api.listPodForAllNamespaces().then((res) => res.body.items)
  );
  console.log('pods', data);
  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Pods'}</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Namespace</td>
            <td>Containers</td>
            <td>Restarts</td>
            <td>Controlled By</td>
            <td>Node</td>
            <td>QoS</td>
            <td>Age</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.metadata?.uid}>
              <td>{item.metadata?.name}</td>
              <td>{item.metadata?.namespace}</td>
              <td>_</td>
              <td>_</td>
              <td>_</td>
              <td>_</td>
              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pods;
