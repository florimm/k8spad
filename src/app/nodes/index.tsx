import { useQuery } from 'react-query';
import api from '../api';

const Nodes = () => {
  const { isLoading, data } = useQuery('nodes', () =>
    api.core.listNode().then((res) => res.body.items)
  );
  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Nodes'}</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Cpu</td>
            <td>Memory</td>
            <td>Disk</td>
            <td>Version</td>
            <td>Age</td>
            <td>Conditions</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.metadata?.uid}>
              <td>{item.metadata?.name}</td>
              <td>{item.status?.allocatable?.cpu}</td>
              <td>{item.status?.allocatable?.memory}</td>
              <td>{item.status?.allocatable!['ephemeral-storage']}</td>
              <td>{item.status?.nodeInfo?.kubeletVersion}</td>
              <td>_</td>
              <td>_</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Nodes;
