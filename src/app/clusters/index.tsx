import React from 'react';
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useClusterState } from 'contexts';
import { Cluster } from '@kubernetes/client-node';
import api from '../api';

const Clusters = () => {
  const { dispatch } = useClusterState();
  const { isLoading, data } = useQuery('clusters', () => api.config.clusters);

  // const setCluster = (cluster: Cluster) => {
  //   dispatch({ type: 'SET_CONTEXT', payload: cluster });
  //   api.config.setCurrentContext(cluster.name);
  //   const clusters = api.config.getClusters();
  //   console.log('Current cluster', clusters, api.config.currentContext);
  // };

  return (
    <div>
      <h1>{isLoading ? 'Loading' : 'Clusters'}</h1>
      <p>Current cluster: {api.config.currentContext}</p>
    </div>
  );
};

export default Clusters;
