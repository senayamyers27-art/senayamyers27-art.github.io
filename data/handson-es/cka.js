/* Spanish text for the CKA hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/cka.js. */
CertHub.addHandsonEs("cka", {
  "cka-ns-create": {
    title: "Crea un namespace para un equipo",
    prompt: "Un equipo nuevo necesita su propio espacio en el clúster para que sus objetos queden separados de los de todos los demás.\n\nCrea un namespace llamado `team-blue`. Después confírmalo con `kubectl get ns`.",
    hint: "kubectl create namespace NAME crea un namespace nuevo. No se usa el flag --namespace porque un namespace tiene alcance de clúster; no vive dentro de otro.",
    explain: "Los namespaces dividen un solo clúster en clústeres virtuales, de modo que los nombres, las cuotas y el control de acceso se pueden delimitar por equipo o por entorno. kubectl create namespace es la forma más rápida de crear uno en el examen, y los objetos con alcance de clúster, como los namespaces y los nodos, nunca se colocan dentro de otro namespace.",
    labels: ["El namespace team-blue existe", "El namespace default no se modificó"]
  },
  "cka-sa-create": {
    title: "Crea una ServiceAccount para una carga de trabajo",
    prompt: "Una aplicación en el namespace `apps` debe ejecutarse con su propia identidad en lugar de la ServiceAccount predeterminada.\n\nCrea una ServiceAccount llamada `app-runner` en el namespace `apps` y luego lista las ServiceAccounts de ese namespace para confirmarlo.",
    hint: "kubectl create serviceaccount NAME crea una; agrega -n apps para que quede en el namespace correcto. El nombre corto del recurso es sa.",
    explain: "Todo Pod se ejecuta con una ServiceAccount, y usar una dedicada en lugar de la predeterminada del namespace te permite otorgarle exactamente los permisos RBAC que necesita, y nada más. Crear la ServiceAccount es la primera mitad del patrón común de vincular un Role a la identidad de una carga de trabajo.",
    labels: ["La ServiceAccount app-runner existe en apps", "Fue creada; no quedó faltando"]
  },
  "cka-rbac-role": {
    title: "Otorga acceso de solo lectura a Pods con RBAC",
    prompt: "La ServiceAccount `viewer` del namespace `web` debe poder hacer get y list de Pods, pero nada más.\n\n1. Crea un Role llamado `pod-reader` en `web` que permita los verbos get y list sobre el recurso pods.\n2. Crea un RoleBinding llamado `read-pods` que vincule `pod-reader` con la ServiceAccount `viewer`.\n\nConfirma con `kubectl auth can-i list pods --as=system:serviceaccount:web:viewer -n web`.",
    hint: "kubectl create role NAME --verb=get --verb=list --resource=pods, y luego kubectl create rolebinding NAME --role=pod-reader --serviceaccount=web:viewer. Agrega -n web a ambos.",
    explain: "RBAC en Kubernetes es aditivo y deniega por defecto: un sujeto solo puede hacer lo que un Role le otorga. Un Role junto con un RoleBinding limita el permiso a un namespace, mientras que los ClusterRoles y ClusterRoleBindings funcionan en todo el clúster. kubectl auth can-i --as te permite verificar el acceso de un sujeto sin iniciar sesión como él, que es justo como compruebas tu trabajo en el examen.",
    labels: ["El Role pod-reader existe en web", "viewer puede listar pods", "viewer no puede eliminar pods"]
  },
  "cka-drain-node": {
    title: "Drena un nodo para mantenimiento",
    prompt: "El nodo worker `worker-2` necesita un parche del sistema operativo y debe dejar de aceptar Pods y entregar los Pods que está ejecutando.\n\nDrena `worker-2`, ignorando los Pods administrados por DaemonSets. Confirma que el nodo muestra SchedulingDisabled con `kubectl get nodes`.",
    hint: "kubectl drain NODE --ignore-daemonsets acordona el nodo y desaloja sus Pods. Los Pods de DaemonSet son esperables, así que --ignore-daemonsets evita que el drain se detenga por ellos.",
    explain: "Drenar es la forma segura de sacar un nodo de servicio: lo acordona (cordon) para que el scheduler no coloque nada nuevo ahí y luego desaloja los Pods existentes para que los controladores los reprogramen en otro lugar. --ignore-daemonsets casi siempre es necesario porque los Pods de DaemonSet se ejecutan en todos los nodos por diseño. Después del mantenimiento ejecutas kubectl uncordon para que el nodo vuelva a aceptar Pods.",
    labels: ["worker-2 ya no es programable", "El Pod app-1 fue desalojado del nodo"]
  },
  "cka-deploy-create": {
    title: "Crea un Deployment con tres réplicas",
    prompt: "El namespace `shop` necesita un front end web que sobreviva a las fallas de Pods.\n\nCrea un Deployment llamado `frontend` en el namespace `shop` usando la imagen `nginx:1.25` con 3 réplicas. Después revísalo con `kubectl get deploy -n shop`.",
    hint: "kubectl create deployment NAME --image=nginx:1.25 --replicas=3, y agrega -n shop para que quede en el namespace correcto.",
    explain: "Un Deployment administra un ReplicaSet, que mantiene en ejecución la cantidad solicitada de réplicas de Pods y las reprograma cuando falla un Pod o un nodo. Definir las réplicas al crearlo es más rápido que crearlo y luego escalarlo, y el Deployment es la primitiva estándar de autorreparación que el examen espera para cargas de trabajo sin estado.",
    labels: ["El Deployment frontend existe en shop", "Solicita 3 réplicas", "Usa la imagen nginx:1.25"]
  },
  "cka-scale-deploy": {
    title: "Escala un Deployment hacia arriba",
    prompt: "El tráfico hacia el Deployment `api` del namespace `prod` ha crecido y dos réplicas ya no son suficientes.\n\nEscala el Deployment `api` a 5 réplicas y luego confirma la nueva cantidad con `kubectl get deploy -n prod`.",
    hint: "kubectl scale deployment api --replicas=5 -n prod define la cantidad deseada. También puedes escalar con kubectl scale deployment/api.",
    explain: "Escalar cambia la cantidad deseada de réplicas en el Deployment, y el controlador del ReplicaSet agrega o elimina Pods para igualarla. El escalado horizontal como este es la primera respuesta ante la carga en cargas de trabajo sin estado, antes de automatizarlo con un HorizontalPodAutoscaler. El comando es rápido e idempotente, así que es una tarea común en el examen.",
    labels: ["El Deployment api ahora solicita 5 réplicas", "El Deployment sigue existiendo"]
  },
  "cka-rollout-image": {
    title: "Despliega una nueva versión de imagen",
    prompt: "El Deployment `web` del namespace `prod` ejecuta `nginx:1.24` y debe pasar a `nginx:1.25`.\n\nActualiza la imagen del contenedor `web` a `nginx:1.25` y luego sigue el rollout con `kubectl rollout status deployment/web -n prod`.",
    hint: "kubectl set image deployment/web web=nginx:1.25 -n prod cambia la imagen del contenedor y dispara una actualización gradual (rolling update). La parte antes del = es el nombre del contenedor.",
    explain: "kubectl set image edita la plantilla del Pod, y el Deployment la despliega gradualmente creando un nuevo ReplicaSet y moviendo los Pods hacia él según maxSurge y maxUnavailable. rollout status espera hasta que la actualización termine, y rollout undo la revertiría. Conocer la sintaxis contenedor=imagen y los subcomandos de rollout es central para el objetivo de Workloads.",
    labels: ["El contenedor web ahora usa nginx:1.25", "El Deployment sigue existiendo"]
  },
  "cka-taint-node": {
    title: "Reserva un nodo con un taint",
    prompt: "El nodo `gpu-1` tiene hardware especial y solo debe ejecutar Pods que lo toleren explícitamente.\n\nAgrega a `gpu-1` un taint con clave `dedicated`, valor `gpu` y efecto `NoSchedule`, y luego confirma con `kubectl describe node gpu-1`.",
    hint: "kubectl taint nodes gpu-1 dedicated=gpu:NoSchedule. El formato es clave=valor:Efecto, y NoSchedule mantiene fuera del nodo a los Pods sin una toleration que coincida.",
    explain: "Los taints repelen a los Pods de un nodo a menos que el Pod tenga una toleration que coincida, y así es como reservas nodos para cargas de trabajo específicas, como trabajos con GPU. NoSchedule bloquea los Pods nuevos, PreferNoSchedule es una versión suave y NoExecute además desaloja los Pods en ejecución que no toleran el taint. Los taints y tolerations son una tarea de scheduling frecuente en el examen.",
    labels: ["gpu-1 tiene el taint dedicated=gpu:NoSchedule", "gpu-1 sigue siendo programable para los Pods que lo toleran"]
  },
  "cka-expose-svc": {
    title: "Expón un Deployment con un Service",
    prompt: "El Deployment `frontend` del namespace `web` escucha en el puerto de contenedor 8080 y necesita una dirección estable dentro del clúster.\n\nExponlo con un Service ClusterIP llamado `frontend-svc` en el puerto 80 que apunte al puerto 8080. Luego lista los Services con `kubectl get svc -n web`.",
    hint: "kubectl expose deployment frontend --port=80 --target-port=8080 --name=frontend-svc -n web. --port es donde escucha el Service; --target-port es el puerto del contenedor.",
    explain: "Un Service da a un conjunto de Pods una IP virtual y un nombre DNS estables, y balancea la carga entre los Pods que coinciden con su selector, que copia del Deployment. ClusterIP es el tipo predeterminado y solo es accesible dentro del clúster. La diferencia entre --port y --target-port (dónde escucha el Service frente a dónde escucha el contenedor) es un punto clásico de confusión que el examen pone a prueba.",
    labels: ["El Service frontend-svc existe en web", "Es un Service ClusterIP"]
  },
  "cka-nodeport-svc": {
    title: "Crea un Service NodePort",
    prompt: "Una aplicación de demostración en el namespace `demo` debe ser accesible desde fuera del clúster a través de un puerto en cada nodo.\n\nCrea un Service NodePort llamado `demo-np` en el puerto 80 con target port 80. Luego confirma el tipo con `kubectl get svc -n demo`.",
    hint: "kubectl create service nodeport demo-np --tcp=80:80 -n demo. El valor de --tcp es port:targetPort.",
    explain: "Un Service NodePort abre el mismo puerto alto (de 30000 a 32767) en cada nodo y lo reenvía al Service, que es la forma más sencilla de llegar a una carga de trabajo desde fuera de un clúster que no tiene un balanceador de carga en la nube. Se construye sobre ClusterIP, que igualmente recibe de forma interna. Saber cuándo conviene NodePort frente a LoadBalancer o Ingress es parte del objetivo de Services and Networking.",
    labels: ["El Service demo-np existe en demo", "Es un Service NodePort"]
  },
  "cka-config-context-ns": {
    title: "Define el namespace predeterminado de tu contexto",
    prompt: "Vas a ejecutar muchos comandos contra el namespace `storage` y no quieres escribir -n storage cada vez.\n\nDefine `storage` como namespace predeterminado del contexto actual y luego confirma tus Pods con `kubectl get pods`.",
    hint: "kubectl config set-context --current --namespace=storage cambia el namespace de tu contexto activo para que los comandos siguientes lo usen por defecto.",
    explain: "Un contexto de kubeconfig une un clúster, un usuario y un namespace predeterminado. Definir el namespace en el contexto actual te ahorra escribir y evita ejecutar comandos en el namespace equivocado, una fuente común de errores bajo la presión de tiempo del examen. Solo cambia tu kubeconfig local, nada dentro del clúster.",
    labels: ["El contexto actual ahora usa por defecto el namespace storage", "El PVC de storage está presente en el clúster"]
  },
  "cka-fix-cordon": {
    title: "Soluciona Pods que no se programan en un nodo",
    prompt: "El nodo `worker-1` fue acordonado durante un mantenimiento y nunca se reactivó, así que los Pods nuevos lo evitan. El mantenimiento ya terminó.\n\nHaz que `worker-1` vuelva a ser programable y luego confirma con `kubectl get nodes` que ya no muestra SchedulingDisabled.",
    hint: "kubectl uncordon worker-1 marca el nodo como programable otra vez. Revisa primero kubectl get nodes para ver la marca SchedulingDisabled.",
    explain: "Un nodo acordonado sigue en estado Ready, pero está marcado como no programable, así que el scheduler no colocará Pods nuevos en él aunque esté sano. Olvidar el uncordon después del mantenimiento es una causa frecuente de Pods atascados en Pending o amontonados en otros nodos. Leer la columna STATUS buscando SchedulingDisabled y ejecutar uncordon es una victoria rápida al resolver problemas.",
    labels: ["worker-1 vuelve a ser programable", "Se usó el comando uncordon"]
  }
});
