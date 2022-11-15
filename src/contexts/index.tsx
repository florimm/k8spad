import { V1Namespace } from '@kubernetes/client-node';
import * as React from 'react';

type Action =
  | { type: 'SET_CONTEXT'; payload: object }
  | { type: 'SET_NAMESPACE'; payload: object };
type State = {
  context: object | null;
  namespace: V1Namespace | null;
};
type ProviderProps = { children: React.ReactNode };

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_CONTEXT': {
      return { ...state, context: action.payload, namespace: null };
    }
    case 'SET_NAMESPACE': {
      return { ...state, namespace: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const ClusterContext = React.createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

function ClusterProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {
    context: null,
    namespace: null,
  });
  const value = { state, dispatch };
  return (
    <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>
  );
}
function useClusterState() {
  const context = React.useContext(ClusterContext);
  if (context === undefined) {
    throw new Error('State must be used within  provider');
  }
  return context;
}

export { ClusterProvider, useClusterState };
