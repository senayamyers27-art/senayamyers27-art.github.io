/* Spanish text for the CKAD hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/ckad.js. */
CertHub.addHandsonEs("ckad", {
  "ckad-run-pod": {
    title: "Ejecuta un Pod individual a partir de una imagen",
    prompt: "Quieres un Pod de un solo uso para probar una imagen, no un Deployment.\n\nEn el namespace `dev`, ejecuta un Pod llamado `probe` a partir de la imagen `busybox:1.36` con la política de reinicio en Never. Luego revísalo con `kubectl get pods -n dev`.",
    hint: "kubectl run probe --image=busybox:1.36 --restart=Never -n dev crea un Pod suelto. Sin --restart=Never, run igual crearía un Pod, pero con la política predeterminada Always.",
    explain: "kubectl run crea un solo Pod, que es la opción correcta para una prueba rápida o un Pod de tarea, en lugar de una carga de trabajo administrada. --restart=Never le da al Pod restartPolicy Never, adecuada para contenedores que se ejecutan una sola vez, mientras que la opción predeterminada Always conviene a servidores de larga duración. Generar y ajustar Pods de esta forma es una habilidad central de Application Design and Build.",
    labels: ["El Pod probe existe en dev", "Usa la imagen busybox:1.36"]
  },
  "ckad-create-job": {
    title: "Crea un Job para ejecutar una tarea hasta completarla",
    prompt: "Una importación de datos debe ejecutarse una vez y detenerse, y reintentarse solo si falla.\n\nEn el namespace `batch`, crea un Job llamado `importer` a partir de la imagen `busybox:1.36`. Luego lista los Jobs con `kubectl get jobs -n batch`.",
    hint: "kubectl create job importer --image=busybox:1.36 -n batch crea un Job. Un Job ejecuta su Pod hasta que termina correctamente, en lugar de mantenerlo en ejecución para siempre.",
    explain: "Un Job ejecuta uno o más Pods hasta que una cantidad definida termina correctamente, lo cual encaja con trabajos por lotes como migraciones, importaciones e informes. Se diferencia de un Deployment, que mantiene los Pods en ejecución indefinidamente. Campos como completions, parallelism y backoffLimit ajustan el comportamiento de un Job, y elegir un Job en lugar de un Deployment para trabajo que se ejecuta hasta completarse es una decisión de diseño clave en el examen.",
    labels: ["El Job importer existe en batch", "Usa la imagen busybox:1.36"]
  },
  "ckad-create-cronjob": {
    title: "Programa trabajo recurrente con un CronJob",
    prompt: "Una tarea de limpieza debe ejecutarse todas las noches a las 2:00 AM en el namespace `batch`.\n\nCrea un CronJob llamado `cleanup` a partir de la imagen `busybox:1.36` con el schedule `0 2 * * *`. Luego revísalo con `kubectl get cronjob -n batch`.",
    hint: "kubectl create cronjob cleanup --image=busybox:1.36 --schedule=\"0 2 * * *\" -n batch. Pon el schedule entre comillas para que el shell mantenga juntos los cinco campos.",
    explain: "Un CronJob crea un Job según un schedule repetitivo escrito en sintaxis cron estándar: minuto, hora, día del mes, mes, día de la semana. Así, 0 2 * * * significa 02:00 todos los días. concurrencyPolicy y los límites de historial controlan las ejecuciones superpuestas y cuántos Jobs terminados se conservan. Los CronJobs son la opción habitual para tareas periódicas de mantenimiento e informes.",
    labels: ["El CronJob cleanup existe en batch", "Su schedule es 0 2 * * *"]
  },
  "ckad-deploy-create": {
    title: "Despliega una aplicación con varias réplicas",
    prompt: "Una aplicación web sin estado debe ejecutarse de forma redundante en el namespace `web`.\n\nCrea un Deployment llamado `site` a partir de la imagen `httpd:2.4` con 4 réplicas. Luego revísalo con `kubectl get deploy -n web`.",
    hint: "kubectl create deployment site --image=httpd:2.4 --replicas=4 -n web crea el Deployment y su ReplicaSet en un solo paso.",
    explain: "Un Deployment declara el estado deseado de una aplicación sin estado: qué imagen ejecutar y cuántas réplicas. Su ReplicaSet mantiene vivos esa cantidad de Pods y los reprograma tras una falla, lo que te da autorreparación y actualizaciones graduales sin esfuerzo extra. Crear un Deployment con la cantidad correcta de réplicas es la tarea de despliegue más común en el examen.",
    labels: ["El Deployment site existe en web", "Solicita 4 réplicas", "Usa la imagen httpd:2.4"]
  },
  "ckad-rolling-update": {
    title: "Realiza una actualización gradual y escala hacia afuera",
    prompt: "El Deployment `api` del namespace `web` ejecuta `api:1.0` con 2 réplicas. Hay una versión nueva lista y el tráfico aumentó.\n\n1. Actualiza el contenedor `api` a la imagen `api:2.0`.\n2. Escala el Deployment a 5 réplicas.\n\nConfirma con `kubectl rollout status deployment/api -n web`.",
    hint: "kubectl set image deployment/api api=api:2.0 -n web actualiza la imagen; kubectl scale deployment api --replicas=5 -n web cambia la cantidad. El nombre antes del = en set image es el nombre del contenedor.",
    explain: "kubectl set image edita la plantilla del Pod para que el Deployment despliegue la nueva versión gradualmente, reemplazando los Pods viejos por nuevos según maxSurge y maxUnavailable. Escalar por separado ajusta cuántas réplicas se ejecutan. Juntos cubren el ciclo de vida cotidiano de un despliegue, y rollout status, history y undo te permiten seguir o revertir una versión defectuosa.",
    labels: ["El contenedor api ahora usa api:2.0", "El Deployment ahora solicita 5 réplicas"]
  },
  "ckad-logs": {
    title: "Lee los logs de un Pod para diagnosticar una falla",
    prompt: "El Pod `worker` del namespace `apps` se reinicia una y otra vez, y necesitas ver por qué.\n\nConsulta los logs del Pod `worker`. El simulador devuelve la salida capturada del contenedor.",
    hint: "kubectl logs worker -n apps muestra el stdout y el stderr del contenedor. Para un Pod con más de un contenedor, agrega -c CONTAINER.",
    explain: "kubectl logs muestra el stdout y el stderr de un contenedor, y es el primer lugar donde buscar cuando un Pod falla o se comporta mal. Agregar --previous muestra los logs del último contenedor que falló, y -c selecciona un contenedor en un Pod con varios contenedores. Leer logs con rapidez es central para el objetivo de Observability and Maintenance.",
    labels: ["Consultaste los logs del Pod worker", "El Pod worker está presente para inspeccionarlo"]
  },
  "ckad-rollout-restart": {
    title: "Reinicia un Deployment para recargar la configuración",
    prompt: "Cambiaste un ConfigMap que el Deployment `frontend` del namespace `web` lee al iniciar, y los Pods en ejecución necesitan tomar el cambio.\n\nDispara un reinicio gradual del Deployment `frontend` y luego síguelo con `kubectl rollout status deployment/frontend -n web`.",
    hint: "kubectl rollout restart deployment/frontend -n web recrea los Pods de forma gradual y controlada para que vuelvan a leer su configuración.",
    explain: "Los Pods no recargan automáticamente la mayoría de los valores de ConfigMap o Secret consumidos como variables de entorno, así que después de un cambio de configuración a menudo reinicias la carga de trabajo. kubectl rollout restart reemplaza los Pods gradualmente en lugar de eliminarlos todos a la vez, evitando tiempo de inactividad. Es una acción de mantenimiento rutinaria y una alternativa limpia a eliminar Pods a mano.",
    labels: ["Disparaste un rollout restart del Deployment", "El Deployment frontend sigue existiendo"]
  },
  "ckad-configmap": {
    title: "Crea un ConfigMap a partir de valores literales",
    prompt: "Una aplicación del namespace `web` lee su configuración desde un ConfigMap.\n\nCrea un ConfigMap llamado `app-config` en `web` con dos entradas: `APP_MODE=production` y `LOG_LEVEL=info`. Luego revísalo con `kubectl get configmap -n web`.",
    hint: "kubectl create configmap app-config --from-literal=APP_MODE=production --from-literal=LOG_LEVEL=info -n web. Repite --from-literal para cada clave.",
    explain: "Un ConfigMap guarda configuración no secreta como pares clave-valor que los Pods consumen como variables de entorno o archivos montados, manteniendo la configuración fuera de la imagen. --from-literal agrega una clave por flag, mientras que --from-file carga archivos completos. Separar la configuración del código es un principio de twelve-factor y una parte central del objetivo de Application Environment and Configuration.",
    labels: ["El ConfigMap app-config existe en web", "APP_MODE está definido como production", "LOG_LEVEL está definido como info"]
  },
  "ckad-secret": {
    title: "Guarda una credencial en un Secret",
    prompt: "Una contraseña de base de datos debe guardarse como Secret, no en un ConfigMap ni en la imagen.\n\nCrea un Secret generic llamado `db-credentials` en el namespace `web` con la entrada `password=S3cure!`. Luego lista los Secrets con `kubectl get secret -n web`.",
    hint: "kubectl create secret generic db-credentials --from-literal=password=S3cure! -n web. El subtipo generic sirve para datos clave-valor arbitrarios.",
    explain: "Un Secret guarda datos sensibles como contraseñas, tokens y claves, separados de los ConfigMaps para que el acceso se pueda restringir con RBAC y los valores se puedan cifrar en reposo. generic es el subtipo para literales o archivos arbitrarios, junto con los secrets tls y docker-registry. Ten en cuenta que los datos de un Secret solo están codificados en base64, no cifrados, a menos que el clúster habilite el cifrado en reposo.",
    labels: ["El Secret db-credentials existe en web", "Contiene una entrada password"]
  },
  "ckad-sa-rbac": {
    title: "Dale a una carga de trabajo su propia identidad y acceso",
    prompt: "Una aplicación de reportes del namespace `apps` debe leer ConfigMaps con una identidad dedicada, no con la ServiceAccount predeterminada.\n\n1. Crea una ServiceAccount llamada `reporter` en `apps`.\n2. Crea un Role llamado `cm-reader` que permita los verbos get y list sobre el recurso configmaps.\n3. Vincula `cm-reader` con `reporter` mediante un RoleBinding llamado `reporter-cm`.\n\nVerifica con `kubectl auth can-i list configmaps --as=system:serviceaccount:apps:reporter -n apps`.",
    hint: "Crea la ServiceAccount, luego un Role con --verb=get --verb=list --resource=configmaps y después un rolebinding con --role=cm-reader --serviceaccount=apps:reporter. Agrega -n apps a cada uno.",
    explain: "Ejecutar una carga de trabajo con una ServiceAccount dedicada y vincularla a un Role acotado sigue el principio de mínimo privilegio: la aplicación solo puede hacer lo que necesita. Un Role junto con un RoleBinding limita el permiso a un namespace, y kubectl auth can-i --as te permite confirmar los permisos efectivos. Este patrón de ServiceAccount más RBAC es central para el objetivo de Security.",
    labels: ["La ServiceAccount reporter existe en apps", "reporter puede listar configmaps", "reporter no puede eliminar configmaps"]
  },
  "ckad-expose": {
    title: "Expón un Deployment dentro del clúster",
    prompt: "Otros servicios necesitan llegar al Deployment `api` del namespace `web` mediante un nombre estable. Los contenedores escuchan en el puerto 8080.\n\nExpón el Deployment como un Service ClusterIP llamado `api-svc` en el puerto 80 que apunte al puerto 8080. Luego revísalo con `kubectl get svc -n web`.",
    hint: "kubectl expose deployment api --port=80 --target-port=8080 --name=api-svc -n web. --port es el puerto del Service; --target-port es el puerto del contenedor.",
    explain: "Un Service da a un grupo de Pods una ClusterIP y un nombre DNS estables, y balancea las solicitudes entre los Pods que coinciden con su selector. ClusterIP, el tipo predeterminado, solo es accesible dentro del clúster, lo cual conviene al tráfico entre servicios. Acertar con --port frente a --target-port (el puerto del Service frente al puerto del contenedor) es una trampa común del examen.",
    labels: ["El Service api-svc existe en web", "Es un Service ClusterIP"]
  },
  "ckad-nodeport": {
    title: "Publica un Service en un puerto de nodo",
    prompt: "Una demostración en el namespace `demo` debe ser accesible desde fuera del clúster sin un balanceador de carga en la nube.\n\nCrea un Service NodePort llamado `demo-svc` en el puerto 8080 con target port 8080. Luego confirma el tipo con `kubectl get svc -n demo`.",
    hint: "kubectl create service nodeport demo-svc --tcp=8080:8080 -n demo. El valor de --tcp es servicePort:targetPort.",
    explain: "Un Service NodePort abre un puerto del rango de 30000 a 32767 en cada nodo y lo reenvía al Service, permitiendo que clientes externos lleguen a la aplicación a través de la dirección de cualquier nodo. Se construye sobre ClusterIP, que igualmente ofrece de forma interna, y es una manera sencilla de exponer una aplicación cuando no hay un LoadBalancer en la nube ni un Ingress. Conocer los tipos de Service y cuándo conviene cada uno es parte de Services and Networking.",
    labels: ["El Service demo-svc existe en demo", "Es un Service NodePort"]
  }
});
