import React from 'react';
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import api from '../../api';

const Jobs = () => {
  const { isLoading, data } = useQuery('clusters', () => api.config.clusters);

  const selectCluster = (item: any) => {
    console.log(item);
  };

  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Clusters'}</h1>
      <table className="table strip">
        <thead>
          <tr>
            <td>Name</td>
            <td>Server</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.server}</td>
              <td>
                <Button onClick={() => selectCluster(item)}>Select</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobs;
