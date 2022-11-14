import React from 'react';
import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import api from '../api';

const Namespaces = () => {
  const { isLoading, isError, data, error } = useQuery('namespaces', () =>
    api.listNamespace().then((res) => res.body.items)
  );

  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Namespaces'}</h1>
      <table className="table strip">
        <thead>
          <tr>
            <td>Name</td>
            <td>Labels</td>
            <td>Age</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr>
              <td>{item.metadata?.name}</td>
              <td>{Object.keys(item.metadata?.labels!).join(',')}</td>
              <td>_</td>
              <td>_</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {data?.map((item) => (
        <Button onClick={() => {}} key={item.metadata?.uid}>{item.metadata?.name}</Button>
      ))} */}
    </div>
  );
};

export default Namespaces;
