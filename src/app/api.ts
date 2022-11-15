import k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sAPi = kc.makeApiClient(k8s.CoreV1Api);

export const kubApi = kc.makeApiClient(k8s.AppsV1Api);

export default { core: k8sAPi, apps: kubApi, config: kc };
