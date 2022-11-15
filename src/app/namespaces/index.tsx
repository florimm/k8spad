import React from 'react';
import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { useClusterState } from 'contexts';
import api from '../api';

const Namespaces = () => {
  const { state, dispatch } = useClusterState();
  const { isLoading, data } = useQuery('namespaces', () =>
    api.core.listNamespace().then((res) => res.body.items)
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
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.metadata.uid}>
              <td>{item.metadata?.name}</td>
              <td>
                {item.metadata?.labels
                  ? Object.keys(item.metadata?.labels).join(',')
                  : ''}
              </td>
              <td>_</td>
              <td>_</td>
              <td>
                <Button
                  onClick={() =>
                    dispatch({ type: 'SET_NAMESPACE', payload: item })
                  }
                >
                  Select
                </Button>
              </td>
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
