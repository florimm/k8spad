import { useQuery } from 'react-query';
import * as stream from 'stream';
import { useClusterState } from 'contexts';
import Loader from 'components/Loader';
import YamlEditor from 'components/YamlEditor';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { V1Pod } from '@kubernetes/client-node';
import api from '../../api';

const Pods = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [yamlVal, setYamlVal] = React.useState('');
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

  const loadYaml = (obj) => {
    setYamlVal(obj);
    setIsEditing(true);
  };

  const actionTaken = (action, item: V1Pod) => {
    // api.exec.exec(item.metadata.namespace, item.metadata.name, command: "", stdout: process.stdout);
    // setIsEditing(true)
  };

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
                    <Dropdown
                      onClick={(action) => actionTaken(action, item)}
                      className="d-inline mx-2"
                      autoClose="inside"
                    >
                      <Dropdown.Toggle id="dropdown-autoclose-inside">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => loadYaml(item)}
                          eventKey={0}
                          href="#"
                        >
                          Yaml
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={1} href="#">
                          Attach
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={2} href="#">
                          Shell
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={3} href="#">
                          Logs
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={4} href="#">
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={5} href="#">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
            yamlVal={yamlVal}
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
