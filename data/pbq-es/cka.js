/* Spanish translation of the CKA exam simulations. Same ids and structure as data/pbq/cka.js. */
CertHub.addPbqs("cka", [

  /* ---------- Dominio 5: Solución de problemas ---------- */
  { id: "component-symptom-match", d: 5, type: "match",
    title: "Relaciona el síntoma con el componente del clúster que falló",
    prompt: "Cada fila es un síntoma en un clúster kubeadm. Relaciónalo con el componente que muy probablemente tiene la falla.",
    pairs: [
      ["Los Pods nuevos se quedan en Pending y no reciben ningún evento de programación", "kube-scheduler"],
      ["Un Deployment muestra 5 deseados pero nunca se crea ningún Pod", "kube-controller-manager"],
      ["kubectl falla con 'connection to 10.0.0.10:6443 was refused'", "kube-apiserver"],
      ["Un nodo está NotReady y el kubelet registra 'failed to connect to /run/containerd/containerd.sock'", "containerd"]
    ],
    extra: ["kube-proxy", "CoreDNS"],
    explain: "El scheduler es el único que escribe eventos FailedScheduling, así que el silencio total significa que está caído. Los controladores de Deployment y ReplicaSet viven en kube-controller-manager, por lo que la ausencia de objetos Pod apunta ahí y no al scheduler. Una conexión rechazada en 6443 es el propio API server, y un kubelet que no puede llegar al socket CRI perdió su runtime de contenedores (containerd)." },

  { id: "pending-cpu-select", d: 5, type: "select",
    title: "Arregla un Pod en Pending sin usar el control plane",
    prompt: "Selecciona todas las acciones que podrían permitir que este Pod se programe sin poner cargas de trabajo en el nodo del control plane.",
    context: "$ kubectl describe pod report-job\n...\nEvents:\n  Type     Reason            Message\n  ----     ------            -------\n  Warning  FailedScheduling  0/3 nodes are available: 1 node(s) had untolerated taint\n                             {node-role.kubernetes.io/control-plane: }, 2 Insufficient cpu.",
    options: [
      "Reducir el CPU request del Pod para que quepa en un worker",
      "Agregar un nodo worker (o liberar CPU que están reteniendo requests reservados)",
      "Agregar al Pod una toleration para node-role.kubernetes.io/control-plane",
      "Quitar el taint control-plane del nodo del control plane",
      "Subir el CPU limit del Pod para que se le asigne más CPU"
    ],
    answers: [0, 1],
    explain: "Los dos workers no tienen CPU asignable disponible para el request, así que reducir el request o agregar capacidad son las soluciones que respetan el control plane. Tolerar o quitar el taint control-plane permitiría que las cargas de trabajo caigan en el control plane, cosa que la tarea prohíbe. La programación se decide por los requests, no por los limits, así que subir el limit no cambia nada." },

  { id: "cluster-ports-fill", d: 5, type: "fill",
    title: "Puertos y rutas clave para solucionar problemas",
    prompt: "Completa estos datos en los que te apoyas cuando el API server o un nodo se comportan mal en un clúster kubeadm.",
    fields: [
      { label: "Puerto seguro en el que escucha kube-apiserver", answers: ["6443"] },
      { label: "Puerto en el que etcd atiende a los clientes", answers: ["2379"] },
      { label: "Directorio donde el runtime escribe los archivos de log de stdout/stderr de los Pods", answers: ["/var/log/pods"] }
    ],
    explain: "kubectl se comunica con el API server en 6443, así que un 'connection refused' ahí significa que el Pod estático está caído. etcd atiende a los clientes en 2379 (y a sus pares en 2380), que es a donde se conecta el API server. El stdout y stderr de los contenedores se escriben en /var/log/pods (enlazado desde /var/log/containers), y puedes leerlos con crictl logs incluso cuando el API server no está disponible." },

  /* ---------- Dominio 1: Arquitectura, instalación y configuración del clúster ---------- */
  { id: "kubeadm-upgrade-order", d: 1, type: "order",
    title: "Actualiza el primer nodo del control plane con kubeadm",
    prompt: "Ordena correctamente estos pasos para actualizar el primer nodo del control plane de 1.34 a 1.35.",
    steps: [
      "Actualiza el paquete kubeadm a la versión 1.35",
      "Ejecuta kubeadm upgrade plan para confirmar la ruta",
      "Ejecuta kubeadm upgrade apply v1.35.x",
      "Drena el nodo con --ignore-daemonsets",
      "Actualiza los paquetes kubelet y kubectl",
      "Ejecuta systemctl daemon-reload y reinicia kubelet",
      "Quita el cordon del nodo (uncordon)"
    ],
    explain: "kubeadm debe actualizarse primero porque plan y apply vienen de ese binario; apply actualiza los Pods estáticos del control plane. Solo cuando el control plane ya está en la nueva versión drenas el nodo, actualizas y reinicias kubelet, y luego haces uncordon. Actualizar kubelet antes que el API server lo dejaría más nuevo que el control plane, algo que la política de version skew prohíbe." },

  { id: "kubeadm-paths-match", d: 1, type: "match",
    title: "Relaciona la ruta o el comando de kubeadm con su propósito",
    prompt: "Relaciona cada archivo, directorio o comando con lo que hace en un nodo del control plane de kubeadm.",
    pairs: [
      ["/etc/kubernetes/manifests/", "Manifiestos de Pods estáticos que kubelet ejecuta para el control plane"],
      ["/etc/kubernetes/pki/etcd/", "La CA de etcd y los certificados de cliente"],
      ["kubeadm certs check-expiration", "Informa las fechas de vencimiento de los certificados del control plane"],
      ["kubeadm token create --print-join-command", "Imprime un nuevo comando join para workers con el hash de la CA"]
    ],
    extra: ["El archivo de configuración de kubelet que se carga desde --config al iniciar"],
    explain: "kubelet vigila /etc/kubernetes/manifests y ejecuta lo que encuentre ahí; así es como arrancan el API server, etcd, el scheduler y el controller-manager. El material de TLS mutuo de etcd vive en /etc/kubernetes/pki/etcd, y etcdctl lo necesita para los snapshots. check-expiration lista el vencimiento de los certificados, mientras que kubeadm token create --print-join-command genera un nuevo bootstrap token e imprime la línea join completa." },

  /* ---------- Dominio 3: Servicios y redes ---------- */
  { id: "networkpolicy-flows-select", d: 3, type: "select",
    title: "Lee una NetworkPolicy y elige los flujos permitidos",
    prompt: "Esta es la única NetworkPolicy en el namespace shop. Selecciona todos los flujos de tráfico que permite.",
    context: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-allow\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels: {app: db}\n  policyTypes: [Ingress]\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels: {app: api}\n    ports:\n    - protocol: TCP\n      port: 5432",
    options: [
      "Pod api en shop -> Pod db en TCP 5432",
      "Pod api en shop -> Pod db en TCP 6379",
      "Pod web en shop -> Pod db en TCP 5432",
      "Pod api en el namespace analytics -> Pod db en TCP 5432",
      "Pod db -> un host externo en TCP 443 (egress)"
    ],
    answers: [0, 4],
    explain: "La regla de ingress solo admite Pods con la etiqueta app=api, y solo en TCP 5432, así que el flujo de api a db en 5432 está permitido. El puerto 6379 y el Pod web no cumplen la regla, y un podSelector solo coincide con el namespace de la propia política, así que api en analytics queda bloqueado. policyTypes solo incluye Ingress, así que el egress desde los Pods db no está restringido por esta política y se permite." },

  { id: "dns-nodeport-fill", d: 3, type: "fill",
    title: "Nombre DNS del Service y rango de NodePort",
    prompt: "El dominio DNS del clúster es cluster.local. Para un Service llamado web en el namespace shop, completa:",
    fields: [
      { label: "Nombre DNS completo (FQDN) del Service", answers: ["web.shop.svc.cluster.local"] },
      { label: "Puerto más bajo que usa por defecto un Service NodePort", answers: ["30000"] },
      { label: "Puerto más alto que usa por defecto un Service NodePort", answers: ["32767"] }
    ],
    explain: "El FQDN de un Service sigue el formato <service>.<namespace>.svc.<cluster-domain>, así que web en shop se resuelve como web.shop.svc.cluster.local. El API server asigna los puertos de nodo desde --service-node-port-range, cuyo valor predeterminado es 30000-32767. Ese rango es independiente de port y targetPort del Service." },

  /* ---------- Dominio 2: Cargas de trabajo y programación ---------- */
  { id: "taint-effects-match", d: 2, type: "match",
    title: "Relaciona los efectos y campos de taint con su comportamiento",
    prompt: "Relaciona cada efecto o campo de taint con lo que hace.",
    pairs: [
      ["NoSchedule", "Bloquea los Pods nuevos que no tienen una toleration que coincida"],
      ["PreferNoSchedule", "Suave: el scheduler evita el nodo cuando puede"],
      ["NoExecute", "Bloquea los Pods nuevos y desaloja los Pods en ejecución que no lo toleran"],
      ["tolerationSeconds", "Cuánto tiempo permanece un Pod antes de que un taint NoExecute lo desaloje"]
    ],
    extra: ["Atrae Pods que solicitan la etiqueta de nodo correspondiente"],
    explain: "NoSchedule mantiene fuera a los Pods que no coinciden pero deja en paz a los que ya se están ejecutando, mientras que PreferNoSchedule es solo una preferencia que el scheduler intenta respetar. NoExecute además desaloja los Pods en ejecución que no lo toleran, y tolerationSeconds define cuánto tiempo puede quedarse ese Pod antes del desalojo. Atraer Pods es tarea de nodeSelector o de affinity, no de los taints." },

  { id: "node-affinity-select", d: 2, type: "select",
    title: "¿Dónde se puede programar este Pod?",
    prompt: "Según las reglas del Pod y la tabla de nodos, selecciona todos los nodos en los que se puede programar el Pod.",
    context: "Pod spec:\n  affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution:\n    - key: disktype  operator: In  values: [ssd]\n  tolerations: (none)\n\nNodes:\n  node-a  labels: disktype=ssd   taints: (none)\n  node-b  labels: disktype=hdd   taints: (none)\n  node-c  labels: disktype=ssd   taints: dedicated=gpu:NoSchedule",
    options: [
      "node-a",
      "node-b",
      "node-c",
      "Cualquier nodo, porque IgnoredDuringExecution relaja la regla"
    ],
    answers: [0],
    explain: "La node affinity required es un filtro estricto, así que solo califican los nodos con la etiqueta disktype=ssd, lo que descarta a node-b. node-c tiene la etiqueta ssd pero lleva un taint NoSchedule que el Pod no tolera, así que también queda filtrado, y solo queda node-a. IgnoredDuringExecution solo significa que un Pod existente no se desaloja si las etiquetas cambian después; no relaja la programación." },

  /* ---------- Dominio 4: Almacenamiento ---------- */
  { id: "retain-pv-recovery-order", d: 4, type: "order",
    title: "Reutiliza un PersistentVolume Retain en estado Released",
    prompt: "Un PV con reclaimPolicy Retain está en Released después de que se eliminó su PVC. Ordena los pasos de recuperación para que un PVC nuevo pueda vincularse a él.",
    steps: [
      "Confirma que la reclaim policy es Retain para asegurarte de que los datos se conservaron",
      "Respalda o verifica los datos del volumen subyacente",
      "Edita el PV y quita su spec.claimRef",
      "Confirma que el estado del PV cambia a Available",
      "Crea un PVC nuevo que se vincule al PV que ahora está Available"
    ],
    explain: "Retain conserva el PV y sus datos, pero lo deja en Released con un claimRef obsoleto que apunta al PVC eliminado. Como el administrador es dueño de esos datos, los verificas o respaldas antes de tocar el objeto, y luego borras spec.claimRef para que el PV vuelva a Available. Solo un PV en Available puede vincularse a un PVC nuevo que coincida con su clase, tamaño y modos de acceso." }

]);
