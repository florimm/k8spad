import React from 'react';
import { useQuery } from 'react-query';
import api, { kubApi } from '../../api';

const Deployments = () => {
  const { isLoading, isError, data, error } = useQuery('pods', () =>
    kubApi.listNamespacedDeployment('vpp-evc').then((res) => res.body.items)
  );
  console.log('Deployments2', data);
  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Deployments'}</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Namespace</td>
            <td>Pods</td>
            <td>Replicas</td>
            <td>Age</td>
            <td>Conditions</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.metadata?.uid}>
              <td>{item.metadata?.name}</td>
              <td>{item.metadata?.namespace}</td>
              <td>
                {item.status?.availableReplicas}/{item.status?.readyReplicas}
              </td>
              <td>{item.spec?.replicas}</td>
              <td>_</td>
              <td>_</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deployments;
