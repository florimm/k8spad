import { useReducer } from 'react';

const clusterData: State = {
  cluster: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SELECT_CLUSTER':
      return { cluster: action.payload };
    case 'SELECT_NAMESPACE':
      return { cluster: action.payload };
    default:
      return state;
  }
};

export type State = {
  cluster: any;
};

export type Action = {
  type: ActionTypes;
  payload: any;
};

export type ActionTypes = 'SELECT_CLUSTER' | 'SELECT_NAMESPACE';

// const reducerData = useReducer(reducer, clusterData);
