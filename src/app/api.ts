import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sAPi = kc.makeApiClient(k8s.CoreV1Api);

const kubApi = kc.makeApiClient(k8s.AppsV1Api);

const attach = new k8s.Attach(kc);

const exec = new k8s.Exec(kc);
const dumpLoad = k8s.dumpYaml;

export default {
  dumpLoad,
  exec,
  core: k8sAPi,
  apps: kubApi,
  attach,
  config: kc,
};
