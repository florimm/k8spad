import { useQuery } from 'react-query';
import { useClusterState } from 'contexts';
import api from '../../api';

const Pods = () => {
  const { state } = useClusterState();
  const { isLoading, data } = useQuery(
    ['pods', state.namespace.metadata.name],
    () => {
      console.log('requests for', state.namespace.metadata.name);
      return api.core
        .listNamespacedPod(state.namespace.metadata.name)
        .then((res) => res.body.items);
    },
    {
      enabled:
        state.namespace !== null &&
        state.namespace !== undefined &&
        state.namespace.metadata !== undefined,
    }
  );
  console.log('data', data);
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
