import { useQuery } from 'react-query';
import { useClusterState } from 'contexts';
import Loader from 'components/Loader';
import YamlEditor from 'components/YamlEditor';
import React from 'react';
import { Button } from 'react-bootstrap';
import api from '../../api';

const Pods = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { state } = useClusterState();
  const name = state.namespace?.metadata?.name ?? 'all';
  const { isLoading, data } = useQuery(
    ['pods', name],
    ({ queryKey }) => {
      if (queryKey[1] === 'all') {
        return api.core.listPodForAllNamespaces().then((res) => res.body.items);
      }
      return api.core
        .listNamespacedPod(queryKey[1])
        .then((res) => res.body.items);
    },
    {
      enabled: name !== null,
    }
  );
  return (
    <>
      <div className="span-12">
        <h1>Pods</h1>
        {isLoading ? (
          <Loader />
        ) : (
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
                <td>Actions</td>
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
                  <td>
                    <Button onClick={() => setIsEditing(true)}>
                      Edit yaml
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isEditing ? (
        <div className="span-12">
          <h1>Edit yaml</h1>
          <YamlEditor
            yamlVal=""
            onSave={(newVal) => {
              console.log('new val', newVal);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default Pods;
