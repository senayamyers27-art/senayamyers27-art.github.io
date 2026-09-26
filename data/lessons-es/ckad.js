CertHub.addLessons("ckad", [
 {
  t: "Writing Dockerfiles: base images, layers, multi-stage builds, ENTRYPOINT vs CMD",
  tt: "Escribir Dockerfiles: imágenes base, capas, builds multietapa, ENTRYPOINT vs CMD",
  body: [
   "Una imagen de contenedor es un sistema de archivos empaquetado más metadatos que indican cómo iniciar tu aplicación. Un Dockerfile es la receta para construirla: un archivo de texto con instrucciones que el builder ejecuta de arriba hacia abajo. El examen CKAD espera que sepas leer, corregir y escribir Dockerfiles cortos, así que necesitas saber qué hace cada instrucción común y cómo se almacena el resultado.",
   "Todo Dockerfile parte de una imagen base con `FROM`, por ejemplo `FROM python:3.12-slim` o `FROM alpine`. La base aporta los archivos del sistema operativo y, a menudo, un runtime de lenguaje. Las bases más pequeñas, como las imágenes slim, alpine o distroless, implican descargas más rápidas y menos paquetes que podrían contener vulnerabilidades. Después de `FROM` normalmente usas `WORKDIR` para fijar el directorio de trabajo, `COPY` para traer los archivos fuente, `RUN` para ejecutar comandos de build como instalar dependencias, `ENV` para definir variables de entorno, `EXPOSE` para documentar un puerto de escucha y `USER` para dejar de ejecutar como root.",
   "Las instrucciones que modifican el sistema de archivos (principalmente `RUN`, `COPY` y `ADD`) crean cada una una nueva capa de solo lectura. Las capas se guardan en caché: si una instrucción y todo lo anterior no han cambiado, el builder reutiliza la capa en caché en lugar de ejecutarla de nuevo. Por eso copias el manifiesto de dependencias (como `requirements.txt` o `package.json`) e instalas las dependencias antes de copiar el resto del código fuente. Así, editar un archivo fuente solo invalida las capas posteriores y los rebuilds son rápidos. Borrar un archivo en una capa posterior no reduce el tamaño de la imagen, porque la capa anterior todavía lo contiene.",
   "Un build multietapa usa más de un `FROM` en el mismo archivo. La primera etapa tiene compiladores y herramientas de build; la etapa final parte de una imagen de runtime pequeña y copia solo el artefacto terminado con `COPY --from=build`. Las herramientas de build nunca llegan a la imagen que distribuyes, lo que la hace más pequeña y reduce su superficie de ataque.",
   "```dockerfile\nFROM golang:1.22 AS build\nWORKDIR /src\nCOPY go.mod ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app\n\nFROM alpine\nCOPY --from=build /app /app\nUSER 1000\nENTRYPOINT [\"/app\"]\nCMD [\"--port\", \"8080\"]\n```",
   "`ENTRYPOINT` y `CMD` juntos definen el comando de inicio. `ENTRYPOINT` es el ejecutable que siempre corre; `CMD` aporta argumentos por defecto que son fáciles de sobrescribir. Cuando ambos están presentes, el contenedor ejecuta ENTRYPOINT seguido de CMD, así que el ejemplo anterior ejecuta `/app --port 8080`. Si ejecutas la imagen con argumentos adicionales, estos reemplazan a CMD pero mantienen ENTRYPOINT. Si solo está definido CMD, es el comando completo y cualquier argumento que pases lo reemplaza por completo.",
   "Prefiere la forma exec, un arreglo JSON como `[\"/app\"]`, en lugar de la forma shell `ENTRYPOINT /app`. La forma exec ejecuta tu programa directamente como proceso 1, así que recibe señales como SIGTERM cuando Kubernetes detiene el Pod. La forma shell lo envuelve en `/bin/sh -c`, y el shell puede no reenviar las señales, lo que provoca apagados lentos y forzados."
  ],
  terms: [
   ["Base image (imagen base)", "La imagen indicada en FROM que aporta el sistema de archivos inicial y el runtime para tu build."],
   ["Layer (capa)", "Un cambio de sistema de archivos de solo lectura y en caché, producido por una instrucción como RUN o COPY."],
   ["Multi-stage build (build multietapa)", "Un Dockerfile con varias etapas FROM en el que solo se copian artefactos seleccionados a la imagen final."],
   ["ENTRYPOINT", "El ejecutable fijo que el contenedor ejecuta al iniciar."],
   ["CMD", "Argumentos por defecto (o un comando por defecto si no hay ENTRYPOINT) que se reemplazan con los argumentos dados en tiempo de ejecución."]
  ],
  example: "La imagen de Python de un equipo tardaba cuatro minutos en reconstruirse tras cada cambio de código. Movieron `COPY requirements.txt .` y `RUN pip install -r requirements.txt` por encima de `COPY . .`, de modo que la capa de dependencias quedó en caché y los rebuilds bajaron a segundos. Pasar a un build multietapa también redujo el tamaño de la imagen final a menos de la mitad.",
  tip: "Recuerda la regla de combinación: ENTRYPOINT más CMD se ejecutan juntos, y los argumentos en tiempo de ejecución reemplazan solo a CMD. Las preguntas suelen pedir qué comando ejecuta realmente un contenedor.",
  check: [
   ["¿Por qué deberías copiar el archivo de dependencias e instalar los paquetes antes de copiar el resto del código fuente?", "Porque las capas se guardan en caché en orden; así, los cambios de código solo invalidan las capas posteriores y la lenta instalación de dependencias se reutiliza desde la caché."],
   ["Una imagen tiene ENTRYPOINT [\"ping\"] y CMD [\"localhost\"]. ¿Qué se ejecuta si la inicias con el argumento example.com?", "`ping example.com`, porque los argumentos en tiempo de ejecución reemplazan a CMD mientras ENTRYPOINT se mantiene."],
   ["¿Qué logra un build multietapa?", "Mantiene las herramientas de build y los archivos intermedios fuera de la imagen final, haciéndola más pequeña y reduciendo la superficie de ataque."]
  ]
 },
 {
  t: "Building, tagging, saving and loading images with docker or podman (build, tag, save, load)",
  tt: "Construir, etiquetar, guardar y cargar imágenes con docker o podman (build, tag, save, load)",
  body: [
   "Una vez que tienes un Dockerfile, lo conviertes en una imagen con un motor de contenedores. Docker y Podman aceptan comandos casi idénticos, así que en el examen normalmente puedes escribir lo mismo con cualquiera de las dos herramientas. Podman funciona sin un daemon central y puede ejecutarse sin root (rootless), pero para construir, etiquetar y mover imágenes el flujo de trabajo es el mismo.",
   "`docker build -t myapp:1.0 .` construye una imagen. La opción `-t` le da un nombre y una etiqueta, y el `.` final es el contexto de build: el directorio cuyos archivos se envían al builder y pueden referenciarse con `COPY`. Si el Dockerfile tiene otro nombre o ubicación, apúntalo con `-f path/to/Dockerfile`. Un archivo `.dockerignore` en el contexto mantiene fuera del build los archivos grandes o secretos, como `.git` o credenciales locales.",
   "Una referencia de imagen tiene la forma `registry/repository:tag`, por ejemplo `registry.example.com/team/myapp:1.0`. Si omites el registry, se asume Docker Hub; si omites la etiqueta, se asume `latest`. Una etiqueta es solo un rótulo movible que apunta a una imagen; la identidad inmutable es el digest del contenido, escrito `myapp@sha256:...`. `docker tag myapp:1.0 registry.example.com/team/myapp:1.0` agrega un segundo nombre a la misma imagen sin copiar nada, algo que haces antes de `docker push` a un registry.",
   "A veces no hay registry, por ejemplo en un host aislado (air-gapped) o en una tarea del examen que te pide exportar una imagen. `docker save -o myapp.tar myapp:1.0` escribe la imagen, con todas sus capas y etiquetas, en un archivo tar. `docker load -i myapp.tar` la importa en otra máquina. Podman admite los mismos comandos `save` y `load`, y además puede guardar en formato OCI (Open Container Initiative) con `--format oci-archive`. No los confundas con `docker export` y `docker import`, que trabajan con el sistema de archivos aplanado de un contenedor y pierden el historial de la imagen y metadatos como CMD.",
   "```bash\ndocker build -t myapp:1.0 .\ndocker tag myapp:1.0 myapp:latest\ndocker images | grep myapp\ndocker save -o /tmp/myapp.tar myapp:1.0\ndocker load -i /tmp/myapp.tar\n```",
   "En un clúster local, los nodos no ven las imágenes de tu estación de trabajo. Con kind ejecutas `kind load docker-image myapp:1.0`; con minikube puedes usar `minikube image load myapp:1.0`. En la especificación del Pod, define `imagePullPolicy: IfNotPresent` o `Never` para que el kubelet use la imagen cargada en lugar de intentar descargarla. Ten en cuenta que para una imagen con la etiqueta `latest` (o sin etiqueta), la política de descarga por defecto es `Always`, que fallará si la imagen existe solo localmente.",
   "Comandos útiles de inspección son `docker images` (o `podman images`) para listar imágenes, `docker image inspect` para ver el ENTRYPOINT, CMD, entorno y puertos expuestos configurados, y `docker history` para ver las capas y sus tamaños."
  ],
  terms: [
   ["Build context (contexto de build)", "El directorio enviado al builder cuyos archivos pueden alcanzar COPY y ADD."],
   ["Tag (etiqueta)", "Un rótulo legible y movible, como 1.0, que apunta a una imagen."],
   ["Digest", "El hash de contenido sha256 inmutable que identifica una imagen de forma única."],
   ["docker save / load", "Comandos que exportan imágenes con todas sus capas y metadatos a un archivo tar y las vuelven a importar."]
  ],
  example: "Una tarea al estilo del examen dice: construye la imagen desde /opt/app con el nombre webapp y la etiqueta v2, luego guárdala en /opt/webapp-v2.tar. Ejecutas `podman build -t webapp:v2 /opt/app` seguido de `podman save -o /opt/webapp-v2.tar webapp:v2`, y luego verificas con `ls -lh /opt/webapp-v2.tar`.",
  tip: "Las tareas que piden un archivo de imagen quieren `save` (imagen con capas y metadatos), no `export` (el sistema de archivos plano de un contenedor). Lee también la etiqueta exacta y la ruta de salida que pide la tarea.",
  check: [
   ["¿Qué significa el punto final en `docker build -t app:1 .`?", "Establece el contexto de build en el directorio actual, que se envía al builder y es desde donde COPY puede leer."],
   ["Cargaste una imagen llamada app:latest en kind pero el Pod muestra ErrImagePull. ¿Por qué?", "Para una etiqueta latest la imagePullPolicy por defecto es Always, así que el kubelet intenta usar un registry; define imagePullPolicy en IfNotPresent o Never, o usa una etiqueta específica."],
   ["¿`docker tag` copia la imagen?", "No, solo agrega otro nombre que apunta al mismo contenido de la imagen."]
  ]
 },
 {
  t: "How Pod `command` and `args` override the image ENTRYPOINT and CMD",
  tt: "Cómo `command` y `args` del Pod sobrescriben ENTRYPOINT y CMD de la imagen",
  body: [
   "Kubernetes te permite cambiar cómo arranca un contenedor sin reconstruir su imagen. En la especificación de un contenedor, el campo `command` sobrescribe el ENTRYPOINT de la imagen y el campo `args` sobrescribe su CMD. La nomenclatura confunde porque el CMD de Docker es el args de Kubernetes, así que vale la pena memorizar la equivalencia: command = ENTRYPOINT, args = CMD.",
   "Hay cuatro combinaciones. Si no defines ninguno, se ejecutan el ENTRYPOINT y el CMD de la imagen tal como se construyeron. Si defines solo `args`, se ejecuta el ENTRYPOINT de la imagen con tus args en lugar del CMD de la imagen. Si defines solo `command`, se ejecuta tu comando y el CMD de la imagen se ignora por completo (no se agrega al final). Si defines ambos, se ejecuta tu comando con tus args y los valores por defecto de la imagen se ignoran.",
   "Ambos campos son arreglos de strings, y Kubernetes no los pasa por un shell. Eso significa que `command: [\"echo $HOME\"]` no funciona como lo haría en una terminal: no hay shell que separe palabras o expanda variables. Cuando necesites funciones de shell como pipes, `&&`, bucles o redirecciones, invoca un shell explícitamente.",
   "```yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: looper\nspec:\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\"]\n    args: [\"while true; do date; sleep 5; done\"]\n```",
   "Kubernetes sí expande su propia sintaxis de variables `$(VAR_NAME)` dentro de command y args, usando las variables de entorno definidas en la lista `env` del contenedor. Así, `args: [\"--port=$(PORT)\"]` funciona si `PORT` está definida en `env`. Si la variable no existe, el texto se deja tal como está escrito. Esta expansión la hace Kubernetes, no un shell.",
   "La forma más rápida de producir este YAML en el examen es la generación imperativa. `kubectl run looper --image=busybox --dry-run=client -o yaml -- sh -c 'while true; do date; sleep 5; done'` pone todo lo que va después de `--` en `args`. Agregar `--command` cambia eso: `kubectl run t --image=busybox --command -- sleep 3600` pone las palabras en `command`. Revisa el YAML generado antes de aplicarlo.",
   "Al depurar, `kubectl describe pod` muestra los Command y Args efectivos de cada contenedor, y `kubectl get pod <name> -o yaml` muestra exactamente lo que escribiste. Un contenedor que termina de inmediato con estado Completed o CrashLoopBackOff suele ser señal de que la sobrescritura reemplazó un comando de servidor de larga duración por algo que termina, o de que se pasó una cadena de shell sin `sh -c`."
  ],
  terms: [
   ["command", "Campo del contenedor que reemplaza el ENTRYPOINT de la imagen."],
   ["args", "Campo del contenedor que reemplaza el CMD de la imagen."],
   ["$(VAR) expansion (expansión de $(VAR))", "Sustitución que hace Kubernetes de las variables de entorno del contenedor dentro de command y args, sin usar un shell."]
  ],
  example: "El ENTRYPOINT de una imagen es `nginx` con CMD `-g daemon off;`. Una tarea te pide iniciarla en modo debug. Definir solo `args: [\"-g\", \"daemon off;\", \"-e\", \"stderr\"]` mantiene el entrypoint de nginx y reemplaza solo los argumentos por defecto, sin necesidad de reconstruir la imagen.",
  tip: "Definir solo `command` descarta el CMD de la imagen en lugar de agregarlo al final. Y `--command` en kubectl run decide si las palabras después de `--` terminan en command o en args.",
  check: [
   ["¿Qué campo de Kubernetes sobrescribe el CMD de un Dockerfile?", "`args`. El campo `command` sobrescribe ENTRYPOINT."],
   ["¿Por qué falla `command: [\"echo hello && sleep 10\"]`?", "Kubernetes lo ejecuta sin shell, así que busca un programa cuyo nombre sea literalmente toda esa cadena; usa `[\"sh\", \"-c\", \"echo hello && sleep 10\"]`."],
   ["¿Qué define `kubectl run p --image=busybox -- sleep 60`?", "Define `args: [sleep, 60]`. La imagen busybox no tiene ENTRYPOINT, así que esos args se convierten en el comando completo que se ejecuta."]
  ]
 },
 {
  t: "Choosing a workload: Deployment, StatefulSet, DaemonSet, Job, CronJob, bare Pod",
  tt: "Elegir un workload: Deployment, StatefulSet, DaemonSet, Job, CronJob, Pod suelto",
  body: [
   "Un Pod es la unidad desplegable más pequeña en Kubernetes: uno o más contenedores que comparten un network namespace y pueden compartir volúmenes. Rara vez creas Pods directamente en producción, porque un Pod suelto (bare Pod) no se reemplaza si se elimina o si su nodo falla. En su lugar creas un controlador de workload, que contiene una plantilla de Pod y trabaja continuamente para que la realidad coincida con lo que pediste. Elegir el controlador correcto es una habilidad central del CKAD.",
   "Un Deployment ejecuta un conjunto de réplicas intercambiables y sin estado, como un front end web o un servidor de API. Administra ReplicaSets por ti y admite rolling updates y rollbacks. Cualquier Pod puede eliminarse y reemplazarse por otro idéntico. Es la opción por defecto para la mayoría de las aplicaciones.",
   "Un StatefulSet es para réplicas que necesitan una identidad estable. Sus Pods reciben nombres predecibles como `db-0`, `db-1`, arrancan y se detienen en orden, y cada uno puede tener su propio PersistentVolumeClaim mediante `volumeClaimTemplates`, que lo acompaña entre reinicios. Normalmente trabaja con un Service headless para que cada Pod tenga un nombre DNS estable. Úsalo para bases de datos, colas de mensajes y sistemas en clúster donde hay que distinguir a los miembros.",
   "Un DaemonSet ejecuta una copia de un Pod en cada nodo (o en cada nodo que coincida con un selector). A medida que se unen nodos, reciben el Pod automáticamente. Usos típicos son los agentes a nivel de nodo: recolectores de logs, exportadores de monitoreo y plugins de red. No defines un número de réplicas; lo decide la cantidad de nodos.",
   "Un Job ejecuta Pods hasta que una tarea se completa con éxito y luego se detiene. Es para trabajo por lotes como una migración de base de datos, un reporte o una importación de datos. Un CronJob crea Jobs según una programación repetitiva, como la utilidad cron de Unix, para backups nocturnos o limpiezas cada hora. Jobs y CronJobs usan `restartPolicy: Never` u `OnFailure`, nunca `Always`.",
   "Un Pod suelto está bien para cosas rápidas y desechables: un Pod temporal de busybox para probar DNS, o una sesión de depuración puntual. Para cualquier cosa que deba seguir ejecutándose, envuélvela en un controlador.",
   "```bash\nkubectl create deployment web --image=nginx --replicas=3\nkubectl create job migrate --image=busybox -- echo done\nkubectl create cronjob tidy --image=busybox --schedule=\"0 * * * *\" -- echo tidy\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "Observa que kubectl tiene generadores `create` para Deployments, Jobs y CronJobs, pero no para StatefulSets ni DaemonSets. Para estos, un truco común en el examen es generar un Deployment con `--dry-run=client -o yaml`, cambiar el `kind` y quitar los campos que no aplican (un DaemonSet no tiene `replicas` ni `strategy`; un StatefulSet normalmente define `serviceName` para su Service headless)."
  ],
  terms: [
   ["Deployment", "Controlador para réplicas sin estado e intercambiables, con rolling updates y rollback."],
   ["StatefulSet", "Controlador que da a cada réplica un nombre estable, arranque ordenado y su propio almacenamiento persistente."],
   ["DaemonSet", "Controlador que ejecuta un Pod por cada nodo elegible."],
   ["Job / CronJob", "Controladores para trabajo que se ejecuta hasta completarse, una vez o según una programación."]
  ],
  example: "Una tienda ejecuta su tienda en línea como un Deployment con cinco réplicas, su clúster de PostgreSQL como un StatefulSet con volúmenes por réplica, un enviador de logs como DaemonSet en cada nodo y un reporte nocturno de ventas como CronJob. Cada elección corresponde a si el trabajo es sin estado, con estado, por nodo o de ejecución hasta completarse.",
  tip: "Busca las palabras clave: 'uno por nodo' significa DaemonSet, 'identidad estable u ordenado' significa StatefulSet, 'se ejecuta hasta completarse' significa Job, 'según una programación' significa CronJob y 'app escalable sin estado' significa Deployment.",
  check: [
   ["¿Qué workload debería ejecutar un agente de monitoreo de nodos en cada nodo, incluidos los nuevos?", "Un DaemonSet, porque programa automáticamente un Pod por cada nodo elegible."],
   ["¿Por qué un Pod suelto es una mala elección para un servicio de larga duración?", "Nada lo recrea si se elimina o si su nodo falla; un controlador como un Deployment lo reemplazaría."],
   ["¿Qué valores de restartPolicy son válidos para los Pods de un Job?", "Never u OnFailure; Always no está permitido para Jobs."]
  ]
 },
 {
  t: "Jobs: completions, parallelism, backoffLimit, activeDeadlineSeconds, restartPolicy Never/OnFailure",
  tt: "Jobs: completions, parallelism, backoffLimit, activeDeadlineSeconds, restartPolicy Never/OnFailure",
  body: [
   "Un Job crea uno o más Pods y lleva la cuenta de cuántos terminan con éxito. Cuando se alcanza el número requerido de éxitos, el Job está completo y no se inician Pods nuevos. Los Pods completados se conservan (en estado Completed) para que puedas leer sus logs, hasta que el Job se elimine o se limpie mediante `ttlSecondsAfterFinished` si lo defines.",
   "`completions` es cuántas ejecuciones exitosas de Pod necesita el Job; por defecto es 1. `parallelism` es cuántos Pods pueden ejecutarse al mismo tiempo; también es 1 por defecto. Con `completions: 6` y `parallelism: 2`, el Job ejecuta dos Pods a la vez hasta que seis hayan tenido éxito. Si defines parallelism pero dejas completions sin definir, obtienes un Job de tipo cola de trabajo, en el que los Pods se coordinan entre sí y el Job se completa cuando uno tiene éxito y todos han terminado.",
   "`backoffLimit` es el número de reintentos antes de que el Job se marque como Failed; el valor por defecto es 6. Los Pods fallidos se reintentan con un retraso creciente (back-off exponencial). `activeDeadlineSeconds` es un límite de tiempo estricto para todo el Job: cuando se cumple, Kubernetes termina los Pods en ejecución y marca el Job como Failed con el motivo DeadlineExceeded. El deadline tiene prioridad sobre backoffLimit, así que un Job puede fallar por tiempo aunque todavía le queden reintentos.",
   "El `restartPolicy` de la plantilla del Pod debe ser `Never` u `OnFailure`. Con `Never`, un contenedor fallido deja atrás un Pod fallido y el controlador del Job crea un Pod completamente nuevo para el reintento, así que ves varios Pods y puedes inspeccionar los logs de cada uno. Con `OnFailure`, el kubelet reinicia el contenedor dentro del mismo Pod, así que ves un solo Pod con un contador de reinicios creciente y los logs anteriores son más difíciles de alcanzar (usa `kubectl logs --previous`).",
   "```yaml\napiVersion: batch/v1\nkind: Job\nmetadata:\n  name: crunch\nspec:\n  completions: 6\n  parallelism: 2\n  backoffLimit: 3\n  activeDeadlineSeconds: 120\n  template:\n    spec:\n      restartPolicy: Never\n      containers:\n      - name: worker\n        image: busybox\n        command: [\"sh\", \"-c\", \"echo working; sleep 5\"]\n```",
   "Genera un punto de partida con `kubectl create job crunch --image=busybox --dry-run=client -o yaml -- sh -c 'echo working; sleep 5' > job.yaml` y luego agrega los campos adicionales. Sigue el progreso con `kubectl get job crunch` (la columna COMPLETIONS muestra algo como 4/6) y `kubectl get pods -w`. El Job agrega la etiqueta `job-name=crunch` a sus Pods, así que `kubectl logs -l job-name=crunch` reúne su salida.",
   "La mayoría de los campos del Job en la plantilla del Pod no se pueden cambiar después de la creación. Si necesitas otra configuración, elimina el Job y créalo de nuevo."
  ],
  terms: [
   ["completions", "Número de ejecuciones exitosas de Pod necesarias para que el Job termine (por defecto 1)."],
   ["parallelism", "Número máximo de Pods del Job ejecutándose a la vez (por defecto 1)."],
   ["backoffLimit", "Número de reintentos antes de que el Job se marque como Failed (por defecto 6)."],
   ["activeDeadlineSeconds", "Tiempo máximo de ejecución de todo el Job, tras el cual sus Pods se detienen y el Job falla."]
  ],
  example: "Un generador de miniaturas debe procesar 20 lotes, pero el clúster solo tiene capacidad libre para cuatro a la vez. El equipo define `completions: 20`, `parallelism: 4` y `activeDeadlineSeconds: 1800`, así que el trabajo termina en tandas de cuatro y nunca pasa de media hora.",
  tip: "Conoce los valores por defecto (completions 1, parallelism 1, backoffLimit 6) y que activeDeadlineSeconds gana sobre backoffLimit. Recuerda también que Never crea Pods nuevos en cada reintento, mientras que OnFailure reinicia el mismo Pod.",
  check: [
   ["Un Job tiene completions 5 y parallelism 2. ¿Cuál es el máximo de Pods ejecutándose a la vez?", "Dos; parallelism limita los Pods concurrentes mientras el Job avanza hacia cinco éxitos."],
   ["Un Job falla con el motivo DeadlineExceeded. ¿Qué campo lo causó?", "activeDeadlineSeconds, el límite de tiempo general del Job."],
   ["¿En qué se diferencian los reintentos entre restartPolicy Never y OnFailure?", "Never crea un Pod nuevo en cada reintento; OnFailure reinicia el contenedor dentro del mismo Pod."]
  ]
 },
 {
  t: "CronJobs: schedule syntax, concurrencyPolicy, history limits, running a job manually from a CronJob",
  tt: "CronJobs: sintaxis de schedule, concurrencyPolicy, límites de historial y ejecución manual de un Job desde un CronJob",
  body: [
   "Un CronJob crea un Job según una programación repetitiva. Pertenece al grupo de API `batch/v1`, y su spec envuelve un `jobTemplate`, que a su vez envuelve la conocida plantilla de Pod. Así que un manifiesto de CronJob tiene tres niveles anidados: spec del CronJob, spec del Job, spec del Pod.",
   "El campo `schedule` usa la sintaxis cron estándar de cinco campos: minuto, hora, día del mes, mes, día de la semana. `*/5 * * * *` significa cada cinco minutos, `0 2 * * *` significa a las 02:00 todos los días y `30 9 * * 1-5` significa a las 09:30 de lunes a viernes. Las programaciones se evalúan en la zona horaria del kube-controller-manager, a menos que definas el campo opcional `timeZone` con el nombre de una zona horaria. Pon comillas alrededor del schedule en YAML y en la línea de comandos para que ni el shell ni el parser de YAML interpreten los asteriscos.",
   "`concurrencyPolicy` decide qué pasa cuando toca una nueva ejecución mientras el Job anterior sigue en marcha. `Allow` (el valor por defecto) permite que se superpongan. `Forbid` se salta la nueva ejecución. `Replace` cancela el Job en ejecución e inicia el nuevo. Elige Forbid para trabajos que no deben ejecutarse dos veces a la vez, como un backup que escribe en el mismo archivo.",
   "`successfulJobsHistoryLimit` (por defecto 3) y `failedJobsHistoryLimit` (por defecto 1) controlan cuántos Jobs terminados, y sus Pods, se conservan para que puedas inspeccionarlos. Poner un límite en 0 elimina los Jobs terminados de inmediato. `startingDeadlineSeconds` define con cuánto retraso puede iniciar todavía una ejecución perdida; si el controlador no puede iniciarla dentro de esa ventana, la ejecución se omite. `suspend: true` pausa las ejecuciones futuras sin eliminar el CronJob.",
   "```yaml\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: backup\nspec:\n  schedule: \"0 2 * * *\"\n  concurrencyPolicy: Forbid\n  successfulJobsHistoryLimit: 2\n  failedJobsHistoryLimit: 1\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      template:\n        spec:\n          restartPolicy: OnFailure\n          containers:\n          - name: backup\n            image: busybox\n            command: [\"sh\", \"-c\", \"echo backing up\"]\n```",
   "Genera el esqueleto rápidamente con `kubectl create cronjob backup --image=busybox --schedule=\"0 2 * * *\" --dry-run=client -o yaml -- sh -c 'echo backing up'`. Para probarlo sin esperar a la programación, crea un Job a partir de su plantilla: `kubectl create job backup-manual --from=cronjob/backup`. Ese Job se ejecuta de inmediato usando exactamente la misma spec, que es la forma estándar de comprobar que un CronJob funciona.",
   "Revisa lo que ha pasado con `kubectl get cronjob backup` (muestra LAST SCHEDULE y ACTIVE), `kubectl get jobs` y `kubectl describe cronjob backup`, cuyos eventos listan cada Job que creó o cualquier programación perdida."
  ],
  terms: [
   ["schedule", "Expresión cron de cinco campos: minuto, hora, día del mes, mes, día de la semana."],
   ["concurrencyPolicy", "Allow, Forbid o Replace: qué hacer si toca una ejecución mientras la anterior sigue activa."],
   ["History limits (límites de historial)", "successfulJobsHistoryLimit y failedJobsHistoryLimit, el número de Jobs terminados que se conservan."],
   ["jobTemplate", "La especificación de Job que el CronJob genera en cada ejecución."]
  ],
  example: "Un CronJob de reportes programado cada 10 minutos a veces tarda 15 minutos, lo que provoca que dos copias peleen por la misma tabla de salida. Definir `concurrencyPolicy: Forbid` hace que el controlador se salte una ejecución mientras otra esté activa, y `kubectl create job report-test --from=cronjob/report` permite al desarrollador probar cambios cuando lo necesite.",
  tip: "El comando para disparar un CronJob a mano es `kubectl create job <new-name> --from=cronjob/<cronjob-name>`. Recuerda también que restartPolicy va en la plantilla de Pod más interna.",
  check: [
   ["¿Qué significa el schedule `*/15 * * * *`?", "Ejecutar cada 15 minutos."],
   ["¿Qué concurrencyPolicy detiene el Job anterior e inicia el nuevo?", "Replace. Forbid se salta la nueva ejecución y Allow ejecuta ambos."],
   ["¿Cómo ejecutas de inmediato el trabajo de un CronJob?", "Crea un Job a partir de él: `kubectl create job <name> --from=cronjob/<cronjob>`."]
  ]
 },
 {
  t: "Multi-container patterns: init containers, sidecars (including native sidecars with restartPolicy: Always), adapter and ambassador",
  tt: "Patrones multicontenedor: init containers, sidecars (incluidos los sidecars nativos con restartPolicy: Always), adapter y ambassador",
  body: [
   "Un Pod puede contener varios contenedores. Comparten el mismo network namespace, así que se alcanzan entre sí en `localhost`, y pueden compartir volúmenes. Eso hace natural separar las tareas auxiliares en contenedores distintos en lugar de meterlas en la imagen de tu aplicación. El temario del CKAD espera que conozcas los patrones basados en esta idea: init containers, sidecars, adapters y ambassadors.",
   "Los init containers se listan bajo `spec.initContainers`. Se ejecutan uno a la vez, en orden, antes de que arranque cualquier contenedor normal, y cada uno debe terminar con éxito. Si uno falla, el kubelet lo reintenta según el restartPolicy del Pod, y el estado del Pod muestra `Init:0/2`, `Init:Error` o `Init:CrashLoopBackOff`. Úsalos para esperar una dependencia (por ejemplo, repetir en bucle hasta que se resuelva el nombre DNS de un Service), para descargar o generar configuración en un emptyDir compartido, o para corregir permisos en un volumen. Como terminan antes de que arranque la app, pueden usar herramientas que no quieres en la imagen principal.",
   "Un sidecar es un auxiliar que se ejecuta junto al contenedor principal durante toda la vida del Pod: enviando logs, renovando certificados o sincronizando archivos desde Git. La forma tradicional es agregar una segunda entrada bajo `containers`. La desventaja es que Kubernetes trata a todos los contenedores normales como iguales, así que en un Job el sidecar puede mantener el Pod en ejecución después de que el trabajo principal terminó, y el orden de arranque no está garantizado.",
   "Los sidecars nativos resuelven esto. Declaras el auxiliar bajo `initContainers` pero le das `restartPolicy: Always`. Kubernetes lo inicia en el orden de los init, no espera a que termine, lo mantiene en ejecución (reiniciándolo si muere) mientras corren los contenedores principales, y lo detiene cuando estos terminan. Eso significa que un enviador de logs está activo antes de que tu app escriba su primera línea, y que un Job se completa normalmente cuando el contenedor principal termina.",
   "```yaml\nspec:\n  initContainers:\n  - name: log-shipper\n    image: busybox\n    restartPolicy: Always\n    command: [\"sh\", \"-c\", \"tail -F /var/log/app/app.log\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\", \"while true; do date >> /var/log/app/app.log; sleep 2; done\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  volumes:\n  - name: logs\n    emptyDir: {}\n```",
   "Un contenedor adapter transforma la salida del contenedor principal a una forma estándar, por ejemplo convirtiendo el formato de log personalizado de una aplicación o su página de estado a un formato que entienda un sistema de monitoreo. Un contenedor ambassador es un proxy local que representa a un servicio externo: la app se conecta a `localhost:6379` y el ambassador reenvía al endpoint de Redis correcto, encargándose del descubrimiento, TLS o sharding. Técnicamente ambos son sidecars; los nombres describen su función. Los adapters cambian lo que sale; los ambassadors intermedian las conexiones hacia el exterior.",
   "Para trabajar con un contenedor específico, agrega `-c`: `kubectl logs mypod -c log-shipper`, `kubectl exec -it mypod -c app -- sh`. `kubectl describe pod` lista por separado los init containers y los contenedores normales con sus estados."
  ],
  terms: [
   ["Init container", "Un contenedor que se ejecuta hasta completarse, en orden, antes de que arranquen los contenedores de la app."],
   ["Sidecar", "Un contenedor auxiliar que se ejecuta junto al contenedor principal durante toda la vida del Pod."],
   ["Native sidecar (sidecar nativo)", "Un init container con restartPolicy: Always, que se inicia antes y se detiene después de los contenedores principales."],
   ["Adapter", "Un auxiliar que convierte la salida del contenedor principal a un formato estándar."],
   ["Ambassador", "Un auxiliar que hace de proxy para las conexiones de la app hacia servicios externos a través de localhost."]
  ],
  example: "Una app heredada escribe logs solo en un archivo. El equipo agrega un sidecar nativo que lee el archivo desde un emptyDir compartido y lo envía a stdout, de modo que `kubectl logs pod -c log-shipper` funciona y el recolector de logs del clúster lo recoge, y un init container que espera a que se resuelva el Service de la base de datos antes de que arranque la app.",
  tip: "Si un Pod está atascado en estado `Init:`, el problema es un init container: revísalo con `kubectl logs <pod> -c <init-name>`. Un sidecar nativo vive bajo initContainers pero tiene restartPolicy: Always.",
  check: [
   ["¿En qué orden se ejecutan los init containers entre sí y respecto a la app?", "Uno a la vez en el orden listado, cada uno terminando con éxito antes del siguiente, y todos antes de que arranquen los contenedores de la app (los sidecars nativos arrancan y siguen ejecutándose)."],
   ["¿Por qué los sidecars nativos son mejores que un segundo contenedor normal en un Job?", "Se detienen automáticamente después de que termina el contenedor principal, así que el Job puede completarse en lugar de quedarse colgado por un auxiliar que sigue en ejecución."],
   ["¿Cuál es la diferencia entre un adapter y un ambassador?", "Un adapter reformatea los datos que salen de la app; un ambassador hace de proxy para las conexiones de la app hacia servicios externos."]
  ]
 },
 {
  "t": "Ephemeral volumes: emptyDir (including medium: Memory), configMap/secret/projected volumes",
  "tt": "Volúmenes efímeros: emptyDir (incluido medium: Memory) y volúmenes configMap/secret/projected",
  "body": [
   "El sistema de archivos propio de un contenedor se descarta cada vez que el contenedor se reinicia. Los volúmenes dan a los contenedores almacenamiento que se declara a nivel de Pod bajo `spec.volumes` y se conecta con `volumeMounts`. Los volúmenes efímeros viven exactamente lo mismo que el Pod: sobreviven a los reinicios de contenedores pero se eliminan cuando se elimina el Pod.",
   "`emptyDir` es el más simple. Empieza vacío cuando el Pod se asigna a un nodo y lo comparten todos los contenedores que lo montan, que es como los init containers y sidecars pasan archivos al contenedor principal. Por defecto se almacena en el disco del nodo. Definir `medium: Memory` lo respalda con tmpfs, un sistema de archivos basado en RAM: muy rápido y nunca escrito a disco, ideal para espacio temporal o archivos temporales sensibles, pero los datos cuentan para el uso y el límite de memoria del contenedor. Define `sizeLimit` para limitar cualquiera de los dos tipos; un Pod que lo supere puede ser desalojado (evicted).",
   "```yaml\nvolumes:\n- name: cache\n  emptyDir:\n    medium: Memory\n    sizeLimit: 64Mi\n- name: settings\n  configMap:\n    name: app-config\n- name: creds\n  secret:\n    secretName: db-secret\n    defaultMode: 0400\n```",
   "Un volumen `configMap` presenta cada clave de un ConfigMap como un archivo cuyo nombre es la clave y cuyo contenido es el valor. Un volumen `secret` hace lo mismo con un Secret, decodificado de base64 y almacenado en tmpfs en el nodo. Fíjate en que los nombres de campo difieren: `configMap.name` pero `secret.secretName`. Puedes elegir claves y nombres de archivo concretos con `items`, y definir permisos de archivo con `defaultMode`. Si actualizas el ConfigMap o el Secret, los archivos montados se refrescan tras un breve retraso, a diferencia de las variables de entorno, que solo se leen al arrancar el contenedor. Los archivos montados con `subPath` no reciben estas actualizaciones.",
   "Un volumen `projected` combina varias fuentes en un solo directorio. Las fuentes permitidas incluyen `configMap`, `secret`, `downwardAPI` (metadatos del Pod como las etiquetas o el namespace) y `serviceAccountToken` (un token de corta duración con una audiencia y una expiración elegidas). Es útil cuando una app espera toda su configuración bajo una misma ruta.",
   "```yaml\n- name: all-in-one\n  projected:\n    sources:\n    - configMap:\n        name: app-config\n    - secret:\n        name: db-secret\n    - downwardAPI:\n        items:\n        - path: labels\n          fieldRef:\n            fieldPath: metadata.labels\n```",
   "En un laboratorio, verifica con `kubectl exec pod -- ls -l /etc/config` y `kubectl exec pod -- df -h /cache`; un emptyDir respaldado en memoria aparece como tmpfs. Si un Pod se queda en ContainerCreating, `kubectl describe pod` normalmente informa de un ConfigMap o Secret inexistente al que hace referencia el volumen."
  ],
  "terms": [
   ["emptyDir", "Un volumen temporal que dura lo que el Pod, vacío al inicio y compartido por los contenedores del Pod."],
   ["medium: Memory", "Convierte un emptyDir en un tmpfs respaldado en RAM que cuenta para el uso de memoria."],
   ["Projected volume (volumen proyectado)", "Un volumen que combina fuentes configMap, secret, downwardAPI y serviceAccountToken en un solo directorio."],
   ["Ephemeral volume (volumen efímero)", "Almacenamiento cuya vida está ligada al Pod y se elimina con él."]
  ],
  "example": "Un Pod de procesamiento de imágenes usa un emptyDir de 256Mi respaldado en memoria como espacio temporal para archivos rápidos, monta su configuración desde un ConfigMap en /etc/app y monta claves TLS desde un Secret con modo 0400, todo declarado en la spec del Pod.",
  "tip": "Los volúmenes secret usan `secretName`, no `name`, y las fuentes projected usan `name` para ambos. Recuerda también que las variables de entorno no se actualizan cuando cambia un ConfigMap, pero los archivos montados (sin subPath) sí.",
  "check": [
   ["¿Qué le ocurre a un emptyDir cuando su contenedor se reinicia, y cuando se elimina el Pod?", "Sobrevive al reinicio del contenedor, pero se elimina junto con el Pod."],
   ["¿Qué contrapartida trae `medium: Memory`?", "Es rápido y no se escribe a disco, pero su contenido usa RAM y cuenta contra el límite de memoria del contenedor."],
   ["Nombra los tipos de fuente que puede combinar un volumen projected.", "configMap, secret, downwardAPI y serviceAccountToken."]
  ]
 },
 {
  "t": "Persistent storage: PersistentVolume, PersistentVolumeClaim, StorageClass, access modes, dynamic provisioning",
  "tt": "Almacenamiento persistente: PersistentVolume, PersistentVolumeClaim, StorageClass, modos de acceso y aprovisionamiento dinámico",
  "body": [
   "Algunos datos deben sobrevivir a cualquier Pod individual: archivos de base de datos, subidas de usuarios, cualquier cosa que no puedas perder en un reinicio. Kubernetes separa el almacenamiento en sí de la solicitud de almacenamiento, para que los desarrolladores puedan pedir espacio sin conocer los detalles del disco que hay detrás.",
   "Un PersistentVolume (PV) es una pieza de almacenamiento del clúster, como un disco en la nube, un export NFS o una ruta local, representada como un objeto de ámbito de clúster. Un PersistentVolumeClaim (PVC) es una solicitud con namespace: \"Necesito 5Gi con acceso ReadWriteOnce\". Kubernetes vincula (bind) una claim a un PV que satisface su tamaño, modo de acceso y storage class; la vinculación es uno a uno. Luego el Pod hace referencia a la claim por su nombre, nunca al PV directamente.",
   "```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: standard\n---\n# en la spec del Pod\nvolumes:\n- name: data\n  persistentVolumeClaim:\n    claimName: data\n```",
   "Los modos de acceso describen cómo puede montarse el volumen. ReadWriteOnce (RWO) permite lectura-escritura desde un solo nodo (varios Pods en ese nodo pueden compartirlo). ReadOnlyMany (ROX) permite solo lectura desde muchos nodos. ReadWriteMany (RWX) permite lectura-escritura desde muchos nodos y necesita un almacenamiento que lo soporte, como NFS. ReadWriteOncePod (RWOP) restringe el acceso de lectura-escritura a un solo Pod. Una claim solo se vincula a un PV que ofrezca el modo solicitado.",
   "Una StorageClass describe un tipo de almacenamiento, con un `provisioner` que sabe cómo crearlo y `parameters` como el tipo de disco. Con el aprovisionamiento dinámico, creas un PVC que nombra una StorageClass y el provisioner crea automáticamente un PV correspondiente. Si el PVC omite `storageClassName`, se usa la StorageClass por defecto del clúster (marcada con `(default)` en `kubectl get storageclass`). Definir `storageClassName: \"\"` pide explícitamente ninguna clase, así que solo puede vincularse un PV creado previamente sin clase. El aprovisionamiento estático significa que un administrador crea los PVs a mano con antelación.",
   "El `reclaimPolicy` indica qué le ocurre al PV cuando se elimina su claim: `Delete` elimina el almacenamiento subyacente (el valor habitual por defecto para volúmenes aprovisionados dinámicamente) y `Retain` lo conserva para una recuperación manual. Algunas clases usan `volumeBindingMode: WaitForFirstConsumer`, que retrasa el aprovisionamiento hasta que un Pod usa la claim para que el volumen se cree en la zona correcta; hasta entonces el PVC muestra Pending, lo cual es normal.",
   "Resuelve problemas con `kubectl get pv,pvc` y mira STATUS: Bound es correcto, Pending significa que no hay PV o provisioner que coincida. `kubectl describe pvc data` explica por qué. Un error común en el examen es una discrepancia en la storage class, el tamaño o el modo de acceso entre un PV y un PVC escritos a mano."
  ],
  "terms": [
   ["PersistentVolume (PV)", "Un objeto de ámbito de clúster que representa una pieza de almacenamiento real."],
   ["PersistentVolumeClaim (PVC)", "Una solicitud de almacenamiento con namespace que se vincula a un PV compatible."],
   ["StorageClass", "Un tipo de almacenamiento con nombre, con un provisioner usado para el aprovisionamiento dinámico."],
   ["Access mode (modo de acceso)", "RWO, ROX, RWX o RWOP: cuántos nodos o Pods pueden montar el volumen y si pueden escribir."],
   ["Reclaim policy (política de recuperación)", "Delete o Retain: qué ocurre con el almacenamiento de un PV después de liberarse su claim."]
  ],
  "example": "En minikube, un desarrollador crea un PVC RWO de 1Gi sin storageClassName. La StorageClass por defecto aprovisiona un PV automáticamente, la claim muestra Bound, y tras eliminar y recrear el Pod los archivos escritos en el montaje siguen ahí.",
  "tip": "Los Pods hacen referencia a PVCs, no a PVs. Para que un PV estático y un PVC se vinculen, storageClassName, el modo de acceso y la capacidad (el PV al menos tan grande como la solicitud) deben ser compatibles.",
  "check": [
   ["¿Qué objeto tiene namespace: el PV o el PVC?", "El PVC tiene namespace; el PV es de ámbito de clúster."],
   ["¿Qué restringe realmente ReadWriteOnce?", "El montaje de lectura-escritura a un solo nodo; los Pods en ese mismo nodo pueden compartirlo. ReadWriteOncePod lo restringe a un solo Pod."],
   ["Un PVC está en Pending y su StorageClass usa WaitForFirstConsumer. ¿Hay algo roto?", "No necesariamente; el aprovisionamiento espera hasta que se programe un Pod que use la claim."]
  ]
 },
 {
  "t": "Mounting volumes with volumeMounts, mountPath, subPath and readOnly",
  "tt": "Montar volúmenes con volumeMounts, mountPath, subPath y readOnly",
  "body": [
   "Declarar un volumen bajo `spec.volumes` solo lo pone a disposición del Pod. Cada contenedor que lo necesite también debe listarlo bajo sus propios `volumeMounts`, enlazando el `name` del volumen con un `mountPath` dentro del contenedor. Dos contenedores pueden montar el mismo volumen en rutas diferentes, que es como comparten archivos.",
   "El `name` en `volumeMounts` debe coincidir exactamente con un nombre bajo `volumes`; un error tipográfico hace que el Pod sea rechazado con un error de validación o se quede atascado en ContainerCreating. El `mountPath` es una ruta absoluta. Si el directorio ya existe en la imagen, el volumen oculta su contenido original mientras esté montado. Montar un ConfigMap en `/etc` ocultaría todo lo demás en `/etc`, un error clásico.",
   "`subPath` monta un solo archivo o subdirectorio del volumen en lugar del volumen completo. Esto resuelve el problema de ocultación: puedes colocar un archivo de configuración en un directorio existente sin tapar a sus vecinos. También permite que varios contenedores, o varios montajes, usen subdirectorios diferentes de un mismo volumen. `subPathExpr` hace lo mismo pero puede incluir variables de entorno, por ejemplo para crear un directorio por Pod usando el nombre del Pod obtenido de la downward API.",
   "```yaml\ncontainers:\n- name: web\n  image: nginx\n  volumeMounts:\n  - name: site-config\n    mountPath: /etc/nginx/conf.d/default.conf\n    subPath: default.conf\n    readOnly: true\n  - name: content\n    mountPath: /usr/share/nginx/html\nvolumes:\n- name: site-config\n  configMap:\n    name: nginx-conf\n- name: content\n  persistentVolumeClaim:\n    claimName: web-content\n```",
   "Ten en cuenta una contrapartida: los archivos montados mediante `subPath` desde un ConfigMap o Secret no reciben actualizaciones cuando cambia el objeto de origen. Para recoger los cambios, hay que reiniciar el Pod. Los montajes de volumen completo se refrescan automáticamente tras un breve retraso.",
   "`readOnly: true` en un montaje impide que el contenedor escriba en ese volumen, aunque el almacenamiento subyacente sea escribible. Es una forma sencilla de aplicar el mínimo privilegio: un servidor web que solo sirve contenido, o una app que solo lee credenciales, no debería poder modificarlos. También combina bien con `readOnlyRootFilesystem` en el security context, donde montas emptyDirs escribibles solo en las rutas que realmente necesitan escritura, como `/tmp`.",
   "Para comprobar qué está montado, usa `kubectl describe pod` (la sección Mounts de cada contenedor) o `kubectl exec pod -c web -- ls -la /etc/nginx/conf.d`. `kubectl explain pod.spec.containers.volumeMounts` lista todos los campos disponibles si olvidas alguno durante el examen."
  ],
  "terms": [
   ["volumeMounts", "Lista por contenedor que enlaza un volumen del Pod con una ruta dentro de ese contenedor."],
   ["mountPath", "La ruta absoluta en el contenedor donde aparece el volumen, ocultando lo que ya hubiera allí."],
   ["subPath", "Monta un solo archivo o subdirectorio de un volumen en lugar de toda su raíz."],
   ["readOnly (solo lectura)", "Opción de montaje que bloquea las escrituras de ese contenedor en el volumen."]
  ],
  "example": "Un equipo necesita una configuración personalizada de nginx, pero montar el ConfigMap en /etc/nginx/conf.d borró otros archivos incluidos. Usar `mountPath: /etc/nginx/conf.d/default.conf` con `subPath: default.conf` y `readOnly: true` reemplazó solo ese archivo y lo hizo a prueba de manipulaciones.",
  "tip": "Un volumen necesita ambas mitades: una entrada en spec.volumes y una entrada volumeMounts correspondiente en cada contenedor. Los montajes con subPath no se actualizan automáticamente desde ConfigMaps o Secrets.",
  "check": [
   ["¿Por qué montar un ConfigMap en /etc/app podría romper una aplicación?", "El montaje oculta todo lo que ya había en /etc/app en la imagen; usa subPath para montar un solo archivo."],
   ["¿Qué hace readOnly: true en un volumeMount?", "Impide que ese contenedor escriba en el volumen en esa ruta."],
   ["¿Pueden dos contenedores de un mismo Pod montar el mismo volumen en rutas diferentes?", "Sí; cada uno lo lista bajo sus propios volumeMounts con su propio mountPath."]
  ]
 },
 {
  "t": "Deployments and ReplicaSets: how the Pod template, labels and selectors fit together",
  "tt": "Deployments y ReplicaSets: cómo encajan la plantilla de Pod, las etiquetas y los selectores",
  "body": [
   "Un Deployment es la forma estándar de ejecutar una app sin estado. No gestiona Pods directamente. En su lugar crea un ReplicaSet, y el ReplicaSet mantiene en ejecución el número solicitado de réplicas de Pod, creando nuevas cuando los Pods mueren y eliminando las sobrantes. La función propia del Deployment es gestionar los ReplicaSets a lo largo del tiempo, lo que hace posibles los rolling updates y los rollbacks.",
   "Tres partes de la spec del Deployment trabajan juntas. `replicas` es cuántos Pods quieres. `template` es la plantilla de Pod: los metadatos (incluidas las etiquetas) y la spec de Pod a partir de los cuales se crea cada réplica. `selector` le dice al controlador qué Pods le pertenecen, usando `matchLabels` (o `matchExpressions`).",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\n  labels:\n    app: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n        tier: frontend\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.27\n```",
   "La regla es que el selector debe coincidir con las etiquetas de la plantilla; el API server rechaza un Deployment en el que no coincidan. La plantilla puede llevar etiquetas adicionales (como `tier` arriba) que el selector ignora. En `apps/v1` el selector es inmutable tras la creación, así que elígelo con cuidado. Las etiquetas en el `metadata` propio del Deployment son solo etiquetas del objeto Deployment y no afectan a la selección.",
   "Cuando cambias cualquier cosa en la plantilla de Pod, como la imagen, una variable de entorno o una etiqueta, el Deployment calcula un hash de la plantilla y crea un nuevo ReplicaSet con un nombre basado en él, por ejemplo `web-7d9c6b8f5`. Luego escala hacia arriba el nuevo ReplicaSet y hacia abajo el antiguo. Los ReplicaSets antiguos permanecen con cero réplicas como historial de revisiones para el rollback, hasta `revisionHistoryLimit` (por defecto 10). Cambiar solo `replicas` no crea un nuevo ReplicaSet; simplemente escala el actual.",
   "Los Pods reciben nombres formados por el nombre del ReplicaSet más un sufijo aleatorio, y una etiqueta adicional `pod-template-hash` que evita que los ReplicaSets se apropien de los Pods de otros. Puedes ver la cadena con `kubectl get deploy,rs,pods -l app=web` y `kubectl describe rs`, cuya línea 'Controlled By' apunta al Deployment.",
   "Los selectores también conectan otros objetos: un Service con `selector: app: web` envía tráfico a estos Pods. Si creas un Pod suelto con la etiqueta `app: web`, el Service también le enviará tráfico, aunque el Deployment no lo gestione (los ReplicaSets del Deployment también seleccionan por `pod-template-hash`, así que no lo adoptan). Sin embargo, un ReplicaSet independiente con un selector simple `app: web` sí adoptaría ese Pod y eliminaría uno para mantener correcto su número. Entender este vínculo por etiquetas explica muchas sorpresas. Generación rápida: `kubectl create deployment web --image=nginx:1.27 --replicas=3 --dry-run=client -o yaml` produce automáticamente etiquetas de selector y de plantilla que coinciden (`app: web`)."
  ],
  "terms": [
   ["ReplicaSet", "Controlador que mantiene en ejecución un número fijo de Pods idénticos; normalmente lo gestiona un Deployment."],
   ["Pod template (plantilla de Pod)", "Los metadatos y la spec de Pod dentro de un controlador a partir de los cuales se crea cada réplica."],
   ["Label selector (selector de etiquetas)", "Una consulta sobre etiquetas, como matchLabels app: web, que decide qué Pods gestiona o apunta un objeto."],
   ["pod-template-hash", "Etiqueta añadida por el Deployment para distinguir los Pods de distintos ReplicaSets."]
  ],
  "example": "Un desarrollador edita la imagen de un Deployment. `kubectl get rs` muestra entonces dos ReplicaSets: el nuevo escalando de 0 a 3 y el antiguo de 3 a 0. Tras el rollout, el ReplicaSet antiguo se queda con 0 réplicas, listo para usarse si ejecutan `kubectl rollout undo`.",
  "tip": "Si `kubectl apply` falla con 'selector does not match template labels', haz que spec.selector.matchLabels sea un subconjunto de spec.template.metadata.labels. En apps/v1 el selector no puede cambiarse después.",
  "check": [
   ["¿Qué objeto crea directamente un Deployment?", "Un ReplicaSet, que a su vez crea los Pods."],
   ["¿Escalar un Deployment de 3 a 5 réplicas crea un nuevo ReplicaSet?", "No; solo los cambios en la plantilla de Pod crean un nuevo ReplicaSet. Escalar ajusta el actual."],
   ["¿Qué debe cumplirse entre el selector de un Deployment y las etiquetas de su plantilla?", "Cada etiqueta del selector debe aparecer con el mismo valor en las etiquetas de la plantilla."]
  ]
 },
 {
  "t": "Rolling updates: maxSurge, maxUnavailable, minReadySeconds; the Recreate strategy",
  "tt": "Rolling updates: maxSurge, maxUnavailable, minReadySeconds; la estrategia Recreate",
  "body": [
   "Cuando cambias la plantilla de Pod de un Deployment, el controlador tiene que reemplazar los Pods antiguos por nuevos. El campo `strategy` controla cómo. La opción por defecto, `RollingUpdate`, reemplaza los Pods gradualmente para que la app siga atendiendo durante el cambio. La alternativa, `Recreate`, elimina primero todos los Pods antiguos y solo después crea los nuevos.",
   "Dos ajustes dan forma a un rolling update. `maxSurge` es cuántos Pods por encima del número deseado de réplicas pueden existir durante la actualización. `maxUnavailable` es cuántos Pods por debajo del número deseado pueden estar no disponibles. Cada uno puede ser un número absoluto o un porcentaje de las réplicas; ambos valen 25% por defecto. Los porcentajes se redondean: surge redondea hacia arriba y unavailable hacia abajo. No pueden ser ambos cero, porque entonces el rollout nunca podría avanzar.",
   "```yaml\nspec:\n  replicas: 4\n  minReadySeconds: 10\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n```",
   "Recorre el ejemplo. Con 4 réplicas, maxSurge 1 y maxUnavailable 0, el controlador puede ejecutar como máximo 5 Pods y debe mantener al menos 4 disponibles. Crea un Pod nuevo, espera a que esté disponible, elimina un Pod antiguo y repite. Es la configuración más segura sin tiempo de inactividad, pero necesita capacidad libre para el Pod extra. El extremo opuesto, maxSurge 0 y maxUnavailable 1, no usa capacidad extra pero funciona con un Pod menos durante la actualización.",
   "La disponibilidad depende de la preparación (readiness). Un Pod nuevo cuenta como disponible cuando su readiness probe pasa y ha permanecido listo durante `minReadySeconds` (por defecto 0). Aumentar minReadySeconds ralentiza un poco el rollout, pero detecta Pods que arrancan y luego fallan unos segundos después. Si los Pods nuevos nunca llegan a estar listos, el rollout se detiene en lugar de tumbar la versión antigua, lo cual es una propiedad de seguridad clave de los rolling updates. `progressDeadlineSeconds` (por defecto 600) marca ese rollout atascado como fallido en su estado; no hace rollback automáticamente.",
   "`Recreate` no tiene ajustes de surge ni unavailable. Provoca tiempo de inactividad entre que terminan los Pods antiguos y los nuevos están listos, pero garantiza que nunca se ejecuten dos versiones a la vez. Elígelo cuando las versiones no pueden coexistir, por ejemplo cuando ambas escribirían en el mismo volumen ReadWriteOnce o cuando un cambio de esquema hace incompatible el código antiguo.",
   "```yaml\nspec:\n  strategy:\n    type: Recreate\n```",
   "Si cambias de RollingUpdate a Recreate editando el objeto, elimina también el bloque `rollingUpdate`, o el API server rechazará el cambio. Observa un rollout en acción con `kubectl rollout status deploy/web` y `kubectl get rs -w`."
  ],
  "terms": [
   ["RollingUpdate", "Estrategia por defecto del Deployment que reemplaza los Pods gradualmente mientras la app sigue atendiendo."],
   ["maxSurge", "Cuántos Pods por encima del número deseado pueden existir durante una actualización (por defecto 25%)."],
   ["maxUnavailable", "Cuántos Pods por debajo del número deseado pueden estar no disponibles durante una actualización (por defecto 25%)."],
   ["minReadySeconds", "Cuánto tiempo debe permanecer listo un Pod nuevo antes de contar como disponible."],
   ["Recreate", "Estrategia que termina todos los Pods antiguos antes de crear los nuevos, causando una breve inactividad."]
  ],
  "example": "Una API de pagos con 10 réplicas nunca debe bajar de su capacidad completa. El equipo define maxUnavailable 0, maxSurge 2 y minReadySeconds 15, así que el rollout añade dos Pods nuevos a la vez y retira los antiguos solo después de que los nuevos hayan estado sanos durante 15 segundos.",
  "tip": "Haz la aritmética: Pods máximos = replicas + maxSurge, mínimo disponible = replicas - maxUnavailable. Elige Recreate cuando una tarea diga que la versión antigua y la nueva nunca deben ejecutarse juntas.",
  "check": [
   ["Con 10 réplicas y la estrategia por defecto, ¿cuántos Pods pueden existir como máximo durante una actualización?", "13: maxSurge del 25% de 10 es 2.5, redondeado hacia arriba a 3."],
   ["¿Por qué elegirías la estrategia Recreate?", "Cuando dos versiones no pueden ejecutarse al mismo tiempo, aceptando una breve inactividad."],
   ["¿Qué ocurre si los Pods nuevos nunca llegan a estar listos durante un rolling update?", "El rollout se detiene y los Pods antiguos siguen atendiendo; tras progressDeadlineSeconds se reporta como fallido, pero no se hace rollback automáticamente."]
  ]
 },
 {
  "t": "Kubectl rollout status, history, undo (--to-revision), pause and resume; kubectl set image and scale",
  "tt": "kubectl rollout status, history, undo (--to-revision), pause y resume; kubectl set image y scale",
  "body": [
   "Los Deployments guardan un historial de revisiones, una por cada cambio en la plantilla de Pod, y kubectl te da un pequeño conjunto de comandos para dirigirlas e inspeccionarlas. Estos comandos son rápidos de escribir y aparecen constantemente en el examen, así que vale la pena sabérselos de memoria.",
   "`kubectl set image deployment/web nginx=nginx:1.27` cambia la imagen del contenedor llamado `nginx` en el Deployment `web`, lo que inicia un rolling update. La parte antes de `=` es el nombre del contenedor, no el nombre de la imagen; si te equivocas, kubectl informa que no se encontró el contenedor. `kubectl scale deployment/web --replicas=5` cambia el número de réplicas sin crear una nueva revisión. `kubectl rollout restart deployment/web` lanza un rollout nuevo con la misma spec (añade una anotación con marca de tiempo a la plantilla), útil para recoger un ConfigMap modificado que se consume como variables de entorno.",
   "`kubectl rollout status deployment/web` espera e informa del progreso hasta que el rollout termina o falla, devolviendo un código de salida distinto de cero si falla. `kubectl rollout history deployment/web` lista las revisiones, y `--revision=3` muestra la plantilla de Pod de una concreta. La columna CHANGE-CAUSE se rellena desde la anotación `kubernetes.io/change-cause`; defínela tú mismo con `kubectl annotate deployment/web kubernetes.io/change-cause=\"upgrade to 1.27\"`, ya que la antigua opción `--record` está obsoleta.",
   "```bash\nkubectl set image deploy/web nginx=nginx:1.27\nkubectl rollout status deploy/web\nkubectl rollout history deploy/web\nkubectl rollout history deploy/web --revision=2\nkubectl rollout undo deploy/web\nkubectl rollout undo deploy/web --to-revision=1\n```",
   "`kubectl rollout undo deployment/web` vuelve a la revisión anterior; `--to-revision=N` elige una concreta. Undo funciona copiando hacia adelante esa plantilla antigua, así que la plantilla restaurada recibe un número de revisión nuevo y más alto, y el número antiguo desaparece de la lista. El rollback solo afecta a la plantilla de Pod; no deshace cambios en el número de réplicas ni restaura los ConfigMaps o Secrets que leen los Pods.",
   "`kubectl rollout pause deployment/web` impide que el controlador actúe ante cambios en la plantilla. Mientras está pausado puedes hacer varias ediciones, por ejemplo `set image` y `set resources`, sin lanzar un rollout por cada una. `kubectl rollout resume deployment/web` las despliega luego juntas como una sola revisión. El escalado sigue funcionando en pausa. No puedes hacer undo de un Deployment pausado; reanúdalo primero.",
   "Estos comandos también aceptan la forma corta `deploy/web` y funcionan con DaemonSets y StatefulSets para status, history, undo y restart. Después de cualquier cambio, confirma el resultado con `kubectl get deploy web -o wide` (que muestra las imágenes) o `kubectl describe deploy web`, cuyos eventos muestran cada paso de escalado de los ReplicaSets."
  ],
  "terms": [
   ["Revision (revisión)", "Una versión numerada de la plantilla de Pod de un Deployment que se guarda para el rollback."],
   ["rollout undo", "Devuelve el Deployment a la revisión anterior o a una elegida volviendo a aplicar su plantilla."],
   ["rollout pause / resume", "Detiene y reanuda temporalmente los rollouts para que varios cambios se apliquen como uno solo."],
   ["change-cause", "La anotación kubernetes.io/change-cause que se muestra en rollout history."]
  ],
  "example": "Tras `kubectl set image deploy/api api=api:2.1`, las tasas de error se disparan. El desarrollador de guardia ejecuta `kubectl rollout history deploy/api` para localizar la última revisión buena, luego `kubectl rollout undo deploy/api --to-revision=4`, y observa `kubectl rollout status deploy/api` hasta que informa de éxito.",
  "tip": "En `kubectl set image`, el lado izquierdo es el nombre del contenedor. Usa `kubectl get deploy web -o jsonpath='{.spec.template.spec.containers[*].name}'` si no estás seguro.",
  "check": [
   ["¿`kubectl scale` crea una nueva revisión de rollout?", "No; solo los cambios en la plantilla de Pod crean revisiones."],
   ["Tras hacer undo a la revisión 2 desde la revisión 4, ¿en qué número de revisión está el Deployment?", "En la revisión 5; la plantilla antigua se copia hacia adelante con un número nuevo, y la revisión 2 ya no aparece por separado."],
   ["¿Por qué pausar un Deployment?", "Para agrupar varios cambios de plantilla en un solo rollout en lugar de un rollout por cada cambio."]
  ]
 },
 {
  "t": "Blue/green deployments by switching a Service selector between two Deployments",
  "tt": "Despliegues blue/green cambiando el selector de un Service entre dos Deployments",
  "body": [
   "Un despliegue blue/green (azul/verde) ejecuta dos versiones completas de una aplicación lado a lado. Blue es la versión en producción que recibe tráfico; green es la versión nueva, totalmente arrancada y probada pero que aún no atiende a los usuarios. Cuando estás conforme con green, cambias todo el tráfico a ella de una vez. Si algo sale mal, vuelves atrás igual de rápido. Kubernetes no tiene un objeto especial para esto; lo construyes con dos Deployments y un Service.",
   "El truco son las etiquetas. Ambos Deployments comparten una etiqueta de aplicación como `app: shop` y se diferencian en una etiqueta de versión, por ejemplo `version: blue` y `version: green`. El selector del Service incluye ambas etiquetas, así que coincide con un solo color a la vez.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: shop\nspec:\n  selector:\n    app: shop\n    version: blue\n  ports:\n  - port: 80\n    targetPort: 8080\n```",
   "El proceso es así. Primero, despliega `shop-green` con la imagen nueva y las etiquetas `version: green`, a tamaño completo. Segundo, pruébalo directamente, por ejemplo a través de un segundo Service temporal como `shop-preview` o con `kubectl port-forward deploy/shop-green 8080`. Tercero, cambia el Service en producción modificando su selector: `kubectl patch service shop -p '{\"spec\":{\"selector\":{\"app\":\"shop\",\"version\":\"green\"}}}'` o `kubectl edit service shop`. El tráfico se mueve en cuanto se actualizan los endpoints. Por último, mantén blue en ejecución un tiempo como vía de rollback, y luego escálalo a cero o elimínalo.",
   "Verifica el cambio con `kubectl get endpointslices -l kubernetes.io/service-name=shop` o `kubectl describe service shop`: las IPs de Pod listadas ahora deberían pertenecer a los Pods green, lo que puedes comparar con `kubectl get pods -l version=green -o wide`.",
   "Comparado con un rolling update, blue/green ofrece un cambio instantáneo y de una sola vez, así que los usuarios nunca ven una mezcla de versiones, y un rollback instantáneo. Los costos son el doble de recursos durante el cambio y la necesidad de que ambas versiones funcionen con la misma base de datos y demás estado compartido. Las conexiones existentes de larga duración pueden seguir yendo a los Pods antiguos hasta que se cierren, así que mantén blue vivo un rato después del cambio.",
   "Errores comunes en el examen son olvidar añadir la etiqueta distintiva a la plantilla de Pod (las etiquetas del metadata propio del Deployment no cuentan) y hacer el selector del Service tan amplio, solo `app: shop`, que coincida con ambos colores a la vez."
  ],
  "terms": [
   ["Blue/green deployment (despliegue azul/verde)", "Ejecutar la versión antigua y la nueva completas lado a lado y cambiar todo el tráfico de una vez."],
   ["Service selector (selector del Service)", "Consulta de etiquetas que decide qué Pods reciben el tráfico de un Service."],
   ["Cut-over (conmutación)", "El momento en que el tráfico pasa de la versión antigua a la nueva."]
  ],
  "example": "Un sitio de venta de entradas despliega `tickets-green` junto a `tickets-blue`, lo prueba mediante un port-forward y luego modifica el selector del Service `tickets` a `version: green`. Cuando aparece un bug diez minutos después, vuelven a poner el selector en blue, restaurando la versión antigua en segundos.",
  "tip": "El cambio ocurre en el Service, no en los Deployments. Asegúrate de que la etiqueta de versión esté en la plantilla de Pod y de que el selector del Service la incluya.",
  "check": [
   ["¿Qué único cambio mueve el tráfico de blue a green?", "Actualizar el selector del Service para que coincida con la etiqueta de versión de los Pods green."],
   ["¿Cómo haces rollback de una publicación blue/green?", "Vuelves a poner el selector del Service en la etiqueta blue, siempre que el Deployment blue siga en ejecución."],
   ["¿Cuál es el principal costo de recursos de blue/green?", "Ambas versiones se ejecutan a tamaño completo al mismo tiempo durante el cambio."]
  ]
 },
 {
  "t": "Canary releases with two Deployments behind one Service, weighted by replica count",
  "tt": "Canary releases con dos Deployments detrás de un Service, ponderados por número de réplicas",
  "body": [
   "Una canary release envía una pequeña parte del tráfico real a una versión nueva antes de desplegarla para todos. Si el canario se comporta bien, gradualmente le das más tráfico; si se comporta mal, solo unos pocos usuarios se vieron afectados y lo eliminas. El nombre viene de los canarios que antes se usaban para avisar a los mineros del aire contaminado.",
   "Sin una service mesh ni funciones especiales de ingress, construyes un canary en Kubernetes con dos Deployments y un Service. Ambos Deployments etiquetan sus Pods con una etiqueta compartida, como `app: api`, más una etiqueta de track como `track: stable` o `track: canary`. El Service selecciona solo por la etiqueta compartida, así que balancea la carga entre todos los Pods listos de ambos Deployments.",
   "```yaml\n# El Service selecciona ambos tracks\nspec:\n  selector:\n    app: api\n---\n# api-stable: replicas: 9, etiquetas app: api, track: stable, imagen api:1.0\n# api-canary: replicas: 1, etiquetas app: api, track: canary, imagen api:1.1\n```",
   "Como un Service ClusterIP reparte las conexiones de forma más o menos uniforme entre sus endpoints, la división del tráfico sigue el número de réplicas. Con 9 Pods stable y 1 Pod canary, alrededor del 10% de las conexiones llegan al canary. Para pasar a alrededor del 25%, podrías ejecutar 3 stable y 1 canary, o 6 y 2. La división es aproximada: es por conexión y no por solicitud, y las conexiones de larga duración o una carga desigual pueden sesgarla.",
   "Una progresión típica: despliega el canary con una réplica, observa sus logs, errores y latencia (`kubectl logs -l track=canary`), y luego escálalo con `kubectl scale deploy api-canary --replicas=3` mientras reduces stable para mantener el total estable. Cuando tengas confianza, actualiza el Deployment stable a la imagen nueva y elimina el canary. Para abortar, elimina el canary o escálalo a cero; el Service deja de enviarle tráfico inmediatamente.",
   "La diferencia clave con blue/green es que los usuarios ven ambas versiones a la vez, en proporción, y el selector del Service nunca cambia. La diferencia con un rolling update simple es el control: un rolling update recorre toda la flota automáticamente, mientras que un canary te permite detenerte en un porcentaje pequeño todo el tiempo que quieras.",
   "Cuando una tarea del examen pide, por ejemplo, el 20% del tráfico en la versión nueva con un total de 5 Pods, la respuesta es 4 stable y 1 canary, ambos con la etiqueta que selecciona el Service. Comprueba con `kubectl get endpointslices -l kubernetes.io/service-name=api` que aparecen las cinco IPs de Pod."
  ],
  "terms": [
   ["Canary release (lanzamiento canario)", "Enviar una pequeña parte del tráfico a una versión nueva para probarla con usuarios reales."],
   ["Track label (etiqueta de track)", "Una etiqueta como track: canary usada para distinguir los Pods de los dos Deployments sin afectar al Service."],
   ["Replica weighting (ponderación por réplicas)", "Usar la proporción de Pods para aproximar una división de tráfico detrás de un Service."]
  ],
  "example": "Un equipo de búsqueda ejecuta `search-stable` con 8 réplicas y añade `search-canary` con 2 réplicas del nuevo código de ranking, ambos etiquetados `app: search`. Aproximadamente el 20% de las consultas llegan al canary; tras un día de tasas de error normales, promueven la imagen nueva al Deployment stable y eliminan el canary.",
  "tip": "El porcentaje para el canary es réplicas canary dividido entre réplicas totales. El selector del Service debe coincidir con una etiqueta compartida por ambos Deployments y no debe incluir la etiqueta de track.",
  "check": [
   ["Un Service está delante de 3 Pods stable y 1 Pod canary. ¿Qué parte del tráfico llega aproximadamente al canary?", "Alrededor del 25%, porque el tráfico se reparte entre los cuatro endpoints listos."],
   ["¿Por qué el selector del Service no debe incluir `track: stable`?", "Porque entonces solo coincidiría con los Pods stable, y el canary no recibiría tráfico."],
   ["¿Cómo abortas rápidamente un canary?", "Escala el Deployment canary a cero o elimínalo; sus Pods salen de los endpoints del Service."]
  ]
 },
 {
  t: "Helm basics: repositories, charts, releases; helm repo add/update, search, install, upgrade, rollback, uninstall, list",
  tt: "Fundamentos de Helm: repositorios, charts, releases; helm repo add/update, search, install, upgrade, rollback, uninstall, list",
  body: [
   "Helm es un gestor de paquetes para Kubernetes. En lugar de aplicar decenas de archivos YAML a mano, instalas un chart, un paquete de manifiestos con plantillas y configuración por defecto, y Helm los renderiza y aplica por ti. El Helm actual funciona completamente como cliente: habla con la API de Kubernetes usando tu kubeconfig y guarda los registros de release como Secrets en el namespace del release, así que se aplican tus permisos RBAC.",
   "Hay tres palabras importantes. Un chart es el paquete: un directorio o `.tgz` con `Chart.yaml`, un `values.yaml` con valores por defecto y una carpeta `templates/`. Un repositorio es un servidor que aloja un índice de charts. Un release es una instancia instalada de un chart en un clúster, con un nombre que tú eliges. Puedes instalar el mismo chart muchas veces como releases distintos, cada uno con su propio historial de revisiones.",
   "Los repositorios se registran localmente. `helm repo add bitnami <repo-url>` agrega uno con un nombre corto, `helm repo update` actualiza el índice de charts en caché (hazlo antes de buscar o instalar para ver las versiones más recientes) y `helm repo list` muestra lo que tienes. `helm search repo nginx` busca en los repositorios que agregaste; `helm search repo nginx --versions` lista todas las versiones del chart. `helm search hub` busca en un catálogo público.",
   "```bash\nhelm repo add bitnami <repo-url>\nhelm repo update\nhelm search repo bitnami/nginx\nhelm install web bitnami/nginx -n web --create-namespace\nhelm list -n web\nhelm upgrade web bitnami/nginx -n web --set replicaCount=3\nhelm history web -n web\nhelm rollback web 1 -n web\nhelm uninstall web -n web\n```",
   "`helm install <release> <chart>` crea la revisión 1. Fija una versión del chart con `--version`. `helm upgrade <release> <chart>` aplica una nueva versión del chart o nuevos valores y crea la siguiente revisión; `helm upgrade --install` instala si el release todavía no existe. `helm history <release>` lista las revisiones y su estado, y `helm rollback <release> <revision>` vuelve a una anterior, registrada como una nueva revisión. Omite el número de revisión para retroceder un paso.",
   "`helm list` muestra los releases del namespace actual; agrega `-n <ns>` o `-A` para todos los namespaces, y `-a` para incluir los fallidos o pendientes. `helm status <release>` muestra el estado del release y sus notas. `helm uninstall <release>` elimina los recursos del release y su historial. Recuerda que los comandos de Helm dependen del namespace igual que kubectl: un release instalado con `-n web` es invisible para `helm list` en `default`, que es la causa más común de errores 'release not found'.",
   "Después de instalar, confirma con kubectl normal: `kubectl get all -n web`. Los objetos administrados por Helm llevan etiquetas como `app.kubernetes.io/managed-by=Helm`, lo que te ayuda a distinguirlos."
  ],
  terms: [
   ["Chart", "Un paquete de Helm con manifiestos de Kubernetes en plantillas más valores por defecto."],
   ["Repository (repositorio)", "Un servidor que aloja un índice de charts, agregado localmente con helm repo add."],
   ["Release", "Una instancia instalada y con nombre de un chart en un namespace, con historial de revisiones."],
   ["helm rollback", "Devuelve un release a una revisión anterior, registrada como una nueva revisión."]
  ],
  example: "Una tarea del examen te pide instalar el chart bitnami/apache como release `site` en el namespace `web-team`, y luego eliminar un release más antiguo llamado `legacy`. Ejecutas `helm repo update`, `helm install site bitnami/apache -n web-team`, encuentras el antiguo con `helm list -A` y lo eliminas con `helm uninstall legacy -n <its-namespace>`.",
  tip: "Pasa siempre el namespace `-n` correcto a helm list, upgrade, rollback y uninstall, y usa `helm list -A` cuando no sepas dónde está un release.",
  check: [
   ["¿Cuál es la diferencia entre un chart y un release?", "Un chart es el paquete; un release es una instalación con nombre de ese chart en un clúster."],
   ["¿Qué comando actualiza tu copia local de los índices de repositorios?", "`helm repo update`."],
   ["¿Cómo haces rollback del release `api` a la revisión 2?", "`helm rollback api 2` (con `-n` para su namespace), que crea una nueva revisión igual a la revisión 2."]
  ]
 },
 {
  t: "Helm values: helm show values, --set and -f values.yaml, helm template, namespaces with -n and --create-namespace",
  tt: "Valores de Helm: helm show values, --set y -f values.yaml, helm template, namespaces con -n y --create-namespace",
  body: [
   "Los charts se personalizan mediante values. El `values.yaml` del chart contiene los valores por defecto, y sus plantillas los leen con expresiones como `{{ .Values.replicaCount }}`. Sobrescribes los valores por defecto al instalar o actualizar sin editar el chart en sí.",
   "Empieza por averiguar qué se puede configurar. `helm show values bitnami/nginx` imprime el archivo de valores por defecto del chart; redirígelo con `> values.yaml` para obtener una copia editable. `helm show chart` imprime los metadatos del chart y `helm show readme` su documentación. Para un release que ya está instalado, `helm get values <release>` muestra los valores que proporcionaste, y `--all` incluye los valores por defecto calculados.",
   "Hay dos formas de sobrescribir. `-f my-values.yaml` (o `--values`) proporciona un archivo que contiene solo las claves que quieres cambiar; puedes pasar varios archivos. `--set key=value` define valores individuales en la línea de comandos, usando puntos para el anidamiento: `--set service.type=NodePort`, `--set image.tag=1.27`. Las listas usan índices como `--set ingress.hosts[0].name=shop.local`, y las comas separan varios pares. Cuando la misma clave se define más de una vez, gana la última fuente, y los valores de `--set` tienen prioridad sobre los archivos `-f`.",
   "```bash\nhelm show values bitnami/nginx > values.yaml\n# edita values.yaml, dejando solo lo que cambias\nhelm install web bitnami/nginx -f values.yaml --set replicaCount=2 \\\n  -n shop --create-namespace\nhelm get values web -n shop\n```",
   "`helm template <release> <chart>` renderiza los manifiestos localmente y los imprime sin contactar al clúster ni crear un release. Úsalo para comprobar lo que realmente producen tus valores: `helm template web bitnami/nginx -f values.yaml | grep -A3 'kind: Service'`. También puedes guardar la salida y aplicarla con kubectl, aunque entonces Helm no la registrará como release. `helm install --dry-run` es parecido, pero pasa por el proceso de instalación e imprime lo que se crearía.",
   "Los namespaces siguen el patrón de kubectl. `-n shop` (o `--namespace`) elige dónde van el release y sus recursos. Si el namespace no existe, la instalación falla a menos que agregues `--create-namespace`. Todos los comandos posteriores sobre ese release (`upgrade`, `rollback`, `uninstall`, `get values`) necesitan el mismo `-n`.",
   "Al actualizar, ten presente cómo se arrastran los valores. Por defecto, `helm upgrade` sin opciones de valores reutiliza los valores del release anterior, pero en cuanto pasas cualquier `--set` o `-f`, parte de los valores por defecto del chart más lo que pases. `--reuse-values` combina tus nuevas sobrescrituras con las anteriores, y `--reset-values` vuelve a los valores por defecto del chart. Verifica el resultado con `helm get values`."
  ],
  terms: [
   ["values.yaml", "El archivo de configuración por defecto del chart, leído por sus plantillas."],
   ["--set", "Sobrescritura de valores individuales en la línea de comandos usando claves con puntos."],
   ["-f / --values", "Proporciona un archivo YAML con valores a sobrescribir; se puede repetir."],
   ["helm template", "Renderiza localmente los manifiestos del chart sin instalar nada."]
  ],
  example: "Para instalar un chart con un Service NodePort en un namespace nuevo, un desarrollador ejecuta `helm show values` para encontrar el nombre de la clave, luego `helm install api ./api-chart -n staging --create-namespace --set service.type=NodePort`, y confirma con `kubectl get svc -n staging`.",
  tip: "Encuentra la ruta exacta de la clave con `helm show values` antes de usar --set. Una clave incorrecta se ignora en silencio, así que verifica con `helm get values` o `helm template`.",
  check: [
   ["Si un valor se define tanto en un archivo -f como con --set, ¿cuál gana?", "El valor de --set."],
   ["¿Qué comando renderiza los manifiestos de un chart sin tocar el clúster?", "`helm template`."],
   ["Una instalación en el namespace `qa` falla porque el namespace no existe. ¿Qué opción lo resuelve?", "`--create-namespace` junto con `-n qa`."]
  ]
 },
 {
  t: "Kustomize: kustomization.yaml, resources, namePrefix, namespace, commonLabels/labels, images, patches, configMapGenerator",
  tt: "Kustomize: kustomization.yaml, resources, namePrefix, namespace, commonLabels/labels, images, patches, configMapGenerator",
  body: [
   "Kustomize personaliza YAML de Kubernetes sin plantillas. Mantienes manifiestos normales y describes los cambios que se aplican encima de ellos en un archivo llamado `kustomization.yaml`. Kustomize viene integrado en kubectl, así que en el examen no necesitas ninguna herramienta adicional.",
   "`resources` lista los archivos de manifiesto (u otros directorios de kustomization) que se incluyen. Luego, los campos transformadores modifican todo lo que está en esa lista. `namespace` define el namespace en cada recurso con namespace. `namePrefix` y `nameSuffix` agregan texto al nombre de cada recurso, y Kustomize también actualiza las referencias a esos nombres, por ejemplo la referencia de un Deployment a un ConfigMap renombrado.",
   "`commonLabels` agrega etiquetas a todos los recursos y también a los selectores y plantillas de Pod. Está obsoleto (deprecated) en favor de `labels`, una lista de entradas, cada una con `pairs` y una opción `includeSelectors`. Con `includeSelectors: false` (el valor por defecto de `labels`) solo se etiquetan los metadatos, lo que evita cambiar el selector inmutable de un Deployment. `commonAnnotations` agrega anotaciones de la misma manera.",
   "```yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n- deployment.yaml\n- service.yaml\nnamespace: shop\nnamePrefix: prod-\nlabels:\n- pairs:\n    env: prod\n  includeSelectors: false\nimages:\n- name: nginx\n  newTag: \"1.27\"\npatches:\n- path: replicas-patch.yaml\n  target:\n    kind: Deployment\n    name: web\nconfigMapGenerator:\n- name: web-config\n  literals:\n  - LOG_LEVEL=info\n```",
   "`images` cambia las imágenes de los contenedores sin editar el Deployment: busca coincidencias por `name` (el nombre de la imagen tal como está escrito en el manifiesto) y define `newName`, `newTag` o `digest`. `patches` aplica cambios parciales. Un patch puede ser un strategic merge patch, un pequeño fragmento YAML que se parece al recurso pero solo con los campos que quieres cambiar, o un JSON 6902 patch con `op`, `path` y `value` explícitos. Cada entrada da el patch en línea con `patch:` o desde un archivo con `path:`, y puede usar `target` para seleccionar recursos por kind, nombre o etiqueta.",
   "`configMapGenerator` construye ConfigMaps a partir de `literals`, `files` o `envs` (un archivo env). `secretGenerator` hace lo mismo para Secrets. Por defecto, al nombre generado se le agrega un hash del contenido, como `web-config-5g7k2m9b4t`, y Kustomize reescribe todas las referencias a él. Cuando el contenido cambia, el nombre cambia, así que los Deployments que lo usan obtienen una nueva plantilla de Pod y hacen el rollout automáticamente. Define `generatorOptions: disableNameSuffixHash: true` si necesitas un nombre fijo.",
   "Las kustomizations más antiguas pueden usar `patchesStrategicMerge` y `patchesJson6902`; todavía aparecen, pero están obsoletos en favor de `patches`. Si te los encuentras en una tarea, puedes conservarlos o convertirlos."
  ],
  terms: [
   ["kustomization.yaml", "El archivo que lista los recursos y las transformaciones que Kustomize les aplica."],
   ["namePrefix", "Texto agregado al inicio del nombre de cada recurso, con las referencias actualizadas."],
   ["labels / commonLabels", "Campos que agregan etiquetas a todos los recursos; commonLabels también cambia los selectores y está obsoleto."],
   ["patches", "Cambios parciales (strategic merge o JSON 6902) aplicados a los recursos seleccionados."],
   ["configMapGenerator", "Crea ConfigMaps a partir de literales, archivos o archivos env, con un hash del contenido en el nombre."]
  ],
  example: "Un equipo mantiene un Deployment y un Service en una carpeta base. Para producción agregan una kustomization con `namespace: prod`, `namePrefix: prod-`, una entrada `images` que pone la etiqueta en 2.3 y un patch que sube las réplicas a 6, sin copiar ni editar el YAML original.",
  tip: "El name de `images` coincide con la imagen tal como está escrita en el manifiesto, no con el nombre del contenedor. Los ConfigMaps generados tienen un sufijo hash, así que búscalos con `kubectl get cm` en lugar de adivinar el nombre.",
  check: [
   ["¿Qué hace `namespace: dev` en kustomization.yaml?", "Pone en dev el namespace de cada recurso con namespace del build."],
   ["¿Por qué configMapGenerator agrega un sufijo hash al nombre?", "Para que un cambio de contenido produzca un nombre nuevo, actualizando las referencias y disparando un rollout de los Pods que lo usan."],
   ["¿Qué riesgo tiene commonLabels para Deployments existentes?", "También agrega etiquetas a los selectores, y los selectores de un Deployment son inmutables, así que aplicarlo a un Deployment existente puede fallar."]
  ]
 },
 {
  t: "Applying overlays with kubectl apply -k and previewing with kubectl kustomize",
  tt: "Aplicar overlays con kubectl apply -k y previsualizar con kubectl kustomize",
  body: [
   "Kustomize suele organizarse como una base y uno o más overlays. La base es un directorio con los manifiestos compartidos y un `kustomization.yaml` que los lista. Cada overlay es otro directorio con su propio `kustomization.yaml` que apunta a la base bajo `resources` y agrega cambios específicos del entorno: un namespace, un prefijo de nombre, más réplicas, otra etiqueta de imagen, valores adicionales de ConfigMap. La base nunca necesita saber qué overlays existen.",
   "```text\napp/\n  base/\n    deployment.yaml\n    service.yaml\n    kustomization.yaml     # resources: [deployment.yaml, service.yaml]\n  overlays/\n    dev/\n      kustomization.yaml   # resources: [../../base], namespace: dev\n    prod/\n      kustomization.yaml   # resources: [../../base], namespace: prod, patches...\n      replicas.yaml\n```",
   "Antes de aplicar nada, previsualiza el resultado. `kubectl kustomize overlays/prod` construye el overlay e imprime el YAML final en la salida estándar sin tocar el clúster. El comando independiente `kustomize build overlays/prod` hace lo mismo si la herramienta separada está instalada. Lee la salida para confirmar que el namespace, los nombres, las etiquetas y las imágenes son los que pide la tarea. Pasarla por `grep` es una verificación rápida, por ejemplo `kubectl kustomize overlays/prod | grep -E 'namespace|image:'`.",
   "Para aplicar el overlay, usa la opción `-k` en lugar de `-f`: `kubectl apply -k overlays/prod`. kubectl construye la kustomization en memoria y aplica el resultado. El argumento es siempre un directorio que contiene un `kustomization.yaml`, no el archivo en sí. La misma opción funciona con otros comandos: `kubectl delete -k overlays/prod` elimina todo lo que crea el overlay, `kubectl diff -k overlays/prod` muestra qué cambiaría respecto al clúster en vivo y `kubectl get -k overlays/prod` lista los objetos resultantes.",
   "```bash\nkubectl kustomize overlays/prod          # solo previsualizar\nkubectl diff -k overlays/prod            # comparar con el clúster\nkubectl apply -k overlays/prod           # crear o actualizar\nkubectl get deploy -n prod\nkubectl delete -k overlays/prod          # limpiar\n```",
   "Las rutas en `resources` son relativas al archivo kustomization que las lista, por eso un overlay normalmente escribe `../../base`. Un error común es 'accumulating resources ... must resolve to a file or a kustomization directory', que significa que una ruta está mal. Otro es aplicar un overlay que define `namespace: prod` cuando ese namespace no existe; créalo primero con `kubectl create namespace prod` o incluye un manifiesto de Namespace en los resources.",
   "Un detalle más: la versión de Kustomize integrada en kubectl puede ir por detrás de la herramienta independiente, así que es posible que campos muy nuevos no se reconozcan. Para el examen, quédate con los campos principales (`resources`, `namespace`, `namePrefix`, `labels`, `images`, `patches`, generadores), que kubectl maneja."
  ],
  terms: [
   ["Base", "Un directorio de kustomization con manifiestos compartidos sobre los que se construyen los overlays."],
   ["Overlay", "Una kustomization que referencia una base y agrega cambios específicos del entorno."],
   ["kubectl apply -k", "Construye la kustomization de un directorio y aplica el resultado al clúster."],
   ["kubectl kustomize", "Construye una kustomization e imprime el YAML resultante sin aplicarlo."]
  ],
  example: "Una tarea te da /opt/app con base y overlays/staging. Ejecutas `kubectl kustomize /opt/app/overlays/staging` y notas que la etiqueta de la imagen sigue siendo la antigua, corriges la entrada `images`, vuelves a previsualizar, luego ejecutas `kubectl apply -k /opt/app/overlays/staging` y confirmas con `kubectl get pods -n staging`.",
  tip: "`-k` recibe un directorio, no un archivo, y `kubectl kustomize` (sin apply) es la previsualización segura. Usa `kubectl diff -k` para ver exactamente qué cambiará.",
  check: [
   ["¿Cómo ves el YAML final de un overlay sin cambiar el clúster?", "`kubectl kustomize <overlay-dir>` (o `kustomize build <overlay-dir>`)."],
   ["¿A qué apunta normalmente la lista resources de un overlay?", "Al directorio base, mediante una ruta relativa como ../../base."],
   ["¿Cómo eliminas todo lo que creó un overlay?", "`kubectl delete -k <overlay-dir>`."]
  ]
 },
 {
  t: "API deprecations and removals: finding current apiVersions with kubectl api-resources, api-versions and explain",
  tt: "APIs obsoletas y eliminadas: encontrar los apiVersion actuales con kubectl api-resources, api-versions y explain",
  body: [
   "Todo objeto de Kubernetes tiene un `apiVersion` formado por un grupo de API y una versión, como `apps/v1` para Deployments o `batch/v1` para Jobs. Los objetos centrales como Pods, Services y ConfigMaps pertenecen al grupo core, escrito simplemente `v1`. Las APIs maduran pasando por versiones alpha (por ejemplo `v1alpha1`), beta (`v1beta1`) y estables (`v1`). Las versiones beta y alpha terminan marcándose como obsoletas (deprecated) y luego se eliminan del API server. Tras la eliminación, un manifiesto que todavía usa la versión antigua no se puede aplicar, aunque el tipo de objeto en sí siga existiendo en una versión más nueva.",
   "Kubernetes publica una política de deprecación: las versiones estables (GA) no se eliminan dentro de una versión mayor, mientras que las versiones beta se marcan como obsoletas con aviso previo antes de eliminarse. Cuando usas una versión obsoleta, el API server devuelve una advertencia y kubectl la imprime como `Warning: <group/version> <Kind> is deprecated ... use <new version>`. Trata esas advertencias como una lista de pendientes.",
   "Tres comandos de kubectl te dicen lo que el clúster realmente sirve. `kubectl api-resources` lista cada tipo de recurso con sus nombres cortos, versión de API, si tiene namespace y su kind. Fíltralo: `kubectl api-resources | grep -i cronjob` muestra `cronjobs  cj  batch/v1  true  CronJob`. `kubectl api-resources --api-group=networking.k8s.io` lista un solo grupo. `kubectl api-versions` lista cada par grupo/versión servido, uno por línea, así que `kubectl api-versions | grep autoscaling` muestra qué versiones de HPA existen.",
   "```bash\nkubectl api-resources | grep -iE 'ingress|cronjob|horizontal'\nkubectl api-versions | grep -E 'batch|networking|autoscaling'\nkubectl explain ingress\nkubectl explain ingress.spec.rules.http.paths --recursive\nkubectl explain hpa --api-version=autoscaling/v2\n```",
   "`kubectl explain <resource>` muestra la documentación de un tipo, empezando por su GROUP y VERSION (la versión preferida), y puedes profundizar campo por campo con puntos, como `kubectl explain deployment.spec.strategy`. `--recursive` imprime todo el árbol de campos, lo cual es una excelente forma de encontrar la estructura YAML correcta durante el examen sin salir de la terminal. `--api-version` te permite consultar una versión específica.",
   "Una rutina práctica para un manifiesto que falla con 'no matches for kind \"Ingress\" in version \"extensions/v1beta1\"': encuentra la versión actual con `kubectl api-resources | grep ingress`, actualiza `apiVersion`, luego ejecuta `kubectl explain` sobre las partes cuya estructura cambió y corrige los campos. Termina con `kubectl apply --dry-run=server -f file.yaml`, que valida contra el API server en vivo sin crear nada.",
   "También existe un plugin `kubectl convert` que reescribe manifiestos a versiones más nuevas, pero no forma parte de kubectl por defecto, así que no cuentes con que esté instalado."
  ],
  terms: [
   ["apiVersion", "El grupo de API y la versión de un objeto, como apps/v1; los objetos core usan solo v1."],
   ["Deprecation (deprecación u obsolescencia)", "Una versión de API se marca para eliminarse en el futuro; todavía funciona pero produce advertencias."],
   ["kubectl api-resources", "Lista los tipos de recursos con nombres cortos, versión de API, indicador de namespace y kind."],
   ["kubectl explain", "Muestra la documentación y la estructura de campos de un tipo de recurso y versión."]
  ],
  example: "Un desarrollador hereda un chart antiguo que define `apiVersion: policy/v1beta1` en un PodDisruptionBudget. Aplicarlo falla con 'no matches for kind'. `kubectl api-resources | grep -i disruption` muestra `policy/v1`, así que actualiza el apiVersion, revisa los campos con `kubectl explain pdb.spec` y valida con un dry run del lado del servidor.",
  tip: "'no matches for kind X in version Y' casi siempre significa que la versión de API se eliminó. `kubectl api-resources | grep -i <kind>` te da la correcta en segundos.",
  check: [
   ["¿Qué comando lista cada grupo/versión que sirve el API server?", "`kubectl api-versions`."],
   ["¿Cómo puedes ver la estructura de campos YAML de una regla de Ingress sin un navegador?", "`kubectl explain ingress.spec.rules --recursive`."],
   ["¿Qué significa una advertencia de deprecación de kubectl?", "La versión de API todavía funciona pero está programada para eliminarse, así que el manifiesto debería pasarse a la versión más nueva."]
  ]
 },
 {
  t: "Updating manifests to supported API groups (networking.k8s.io/v1 Ingress, batch/v1 CronJob, autoscaling/v2 HPA)",
  tt: "Actualizar manifiestos a grupos de API soportados (Ingress networking.k8s.io/v1, CronJob batch/v1, HPA autoscaling/v2)",
  body: [
   "A veces basta con cambiar `apiVersion`, pero a menudo la estructura de campos también cambió. Al examen le gustan tres ejemplos, cada uno con una versión estable que deberías usar hoy: Ingress en `networking.k8s.io/v1`, CronJob en `batch/v1` y HorizontalPodAutoscaler en `autoscaling/v2`.",
   "Ingress pasó de `extensions/v1beta1` y `networking.k8s.io/v1beta1` a `networking.k8s.io/v1`, y el formato del backend cambió. Los antiguos campos `serviceName` y `servicePort` se convirtieron en un objeto anidado `service` con `name` y `port.number` (o `port.name`). Ahora cada path requiere un `pathType` de `Prefix`, `Exact` o `ImplementationSpecific`. La antigua anotación `kubernetes.io/ingress.class` se reemplaza por el campo `ingressClassName`.",
   "```yaml\n# antiguo (eliminado)\n#   backend:\n#     serviceName: web\n#     servicePort: 80\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port:\n              number: 80\n```",
   "CronJob pasó de `batch/v1beta1` a `batch/v1`. Aquí la estructura prácticamente no cambió: `schedule`, `concurrencyPolicy`, `jobTemplate` y los límites de historial conservan los mismos nombres. Normalmente solo cambias la línea de apiVersion y, opcionalmente, ganas campos más nuevos como `timeZone`.",
   "HorizontalPodAutoscaler pasó de `autoscaling/v2beta1` y `v2beta2` a `autoscaling/v2`. La versión `autoscaling/v1` todavía existe, pero solo admite un objetivo de CPU mediante `targetCPUUtilizationPercentage`. En v2, las métricas son una lista, y una métrica de recurso va anidada: `type: Resource`, luego `resource.name: cpu` y `resource.target` con `type: Utilization` y `averageUtilization`. El campo `targetAverageUtilization` al estilo v2beta1 ya no existe.",
   "```yaml\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: web\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: web\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70\n```",
   "Un método rápido y confiable es generar YAML nuevo con la versión actual en lugar de editar a mano: `kubectl create ingress web --rule=\"shop.example.com/*=web:80\" --dry-run=client -o yaml` produce un Ingress v1 (el `*` hace que el path sea Prefix), `kubectl create cronjob` un CronJob batch/v1, y `kubectl autoscale deploy web --min=2 --max=10 --cpu-percent=70 --dry-run=client -o yaml` un HPA con el que puedes comparar. Luego copia la configuración del archivo antiguo y valida con `kubectl apply --dry-run=server -f`."
  ],
  terms: [
   ["networking.k8s.io/v1", "Grupo/versión de API estable para Ingress y NetworkPolicy."],
   ["pathType", "Campo obligatorio de path de Ingress en v1: Prefix, Exact o ImplementationSpecific."],
   ["autoscaling/v2", "Versión estable de HPA con una lista de métricas que admite métricas resource, pods, object y external."],
   ["batch/v1", "Grupo/versión estable para Job y CronJob."]
  ],
  example: "Un Ingress antiguo con `serviceName: api` y `servicePort: 8080` no se puede aplicar. El desarrollador cambia el apiVersion a networking.k8s.io/v1, reescribe el backend como `service: {name: api, port: {number: 8080}}`, agrega `pathType: Prefix`, y el dry run del lado del servidor pasa.",
  tip: "Para Ingress, cambiar solo el apiVersion no basta: corrige el formato del backend y agrega pathType. Para CronJob, el cambio de apiVersion suele ser todo lo necesario.",
  check: [
   ["¿Qué reemplazó a `serviceName` y `servicePort` en el backend de un Ingress v1?", "Un objeto anidado `service` con `name` y `port.number` o `port.name`."],
   ["¿Cómo se expresa un objetivo de 70% de CPU en autoscaling/v2?", "En metrics: type Resource, resource name cpu, target type Utilization con averageUtilization 70."],
   ["¿Cuál es el apiVersion estable para CronJob?", "batch/v1."]
  ]
 },
 {
  t: "Liveness, readiness and startup probes; httpGet, tcpSocket, exec and grpc handlers; timing fields",
  tt: "Probes de liveness, readiness y startup; handlers httpGet, tcpSocket, exec y grpc; campos de temporización",
  body: [
   "Un proceso en ejecución no es necesariamente un proceso sano. Podría estar bloqueado (deadlock), cargando datos todavía o sin poder llegar a su base de datos. Los probes permiten que el kubelet de cada nodo revise un contenedor con regularidad y actúe según el resultado. Kubernetes tiene tres tipos, y cada uno responde una pregunta distinta.",
   "Un liveness probe pregunta: '¿Este contenedor sigue funcionando o debería reiniciarse?'. Un readiness probe pregunta: '¿Este contenedor debería recibir tráfico ahora mismo?'. Un startup probe pregunta: '¿Este contenedor de arranque lento ya terminó de arrancar?'. Mientras haya un startup probe configurado que todavía no ha tenido éxito, los probes de liveness y readiness quedan en espera, así que un arranque lento no se confunde con un cuelgue. Después de tener éxito una vez, deja de ejecutarse y los otros probes toman el control.",
   "Cada probe usa un handler. `httpGet` envía un HTTP GET a un `path` y `port`; cualquier estado de 200 a 399 es éxito. `tcpSocket` tiene éxito si se puede abrir una conexión TCP al puerto. `exec` ejecuta un comando dentro del contenedor; el código de salida 0 es éxito. `grpc` llama al servicio estándar de health checking de gRPC en un puerto, para apps que lo implementan. Elige el handler más ligero que refleje de verdad la salud: un endpoint HTTP de salud es común para apps web, y una verificación TCP para servicios de red simples.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  ports:\n  - containerPort: 8080\n  startupProbe:\n    httpGet: {path: /healthz, port: 8080}\n    failureThreshold: 30\n    periodSeconds: 10\n  livenessProbe:\n    httpGet: {path: /healthz, port: 8080}\n    periodSeconds: 10\n    failureThreshold: 3\n  readinessProbe:\n    tcpSocket: {port: 8080}\n    initialDelaySeconds: 5\n    periodSeconds: 5\n```",
   "Los campos de temporización son comunes a todos los probes. `initialDelaySeconds` (por defecto 0) espera tras el arranque del contenedor antes de la primera verificación. `periodSeconds` (por defecto 10) es cada cuánto se ejecuta el probe. `timeoutSeconds` (por defecto 1) es cuánto se espera una respuesta. `failureThreshold` (por defecto 3) es cuántos fallos consecutivos cuentan como fallo. `successThreshold` (por defecto 1) es cuántos éxitos consecutivos se necesitan después de un fallo; debe ser 1 para los probes de liveness y startup.",
   "El margen de un startup probe es `failureThreshold × periodSeconds`: el ejemplo permite hasta 300 segundos para arrancar antes de que el contenedor se reinicie. Esto es mejor que un `initialDelaySeconds` grande en el liveness probe, porque las verificaciones empiezan en cuanto la app está lista en lugar de tras una espera fija.",
   "Los resultados de los probes aparecen en `kubectl describe pod` bajo cada contenedor (las líneas Liveness, Readiness y Startup muestran la configuración) y en los eventos, por ejemplo `Liveness probe failed: HTTP probe failed with statuscode: 500` o `Readiness probe failed: dial tcp ... connection refused`. La columna READY de `kubectl get pods` refleja la readiness."
  ],
  terms: [
   ["Liveness probe", "Verifica si un contenedor debe reiniciarse."],
   ["Readiness probe", "Verifica si un contenedor debe recibir tráfico del Service."],
   ["Startup probe", "Verifica si un contenedor lento ya arrancó, dejando en espera los otros probes hasta que lo haga."],
   ["failureThreshold", "Fallos consecutivos necesarios antes de considerar que el probe falló (por defecto 3)."],
   ["Probe handler", "El método de verificación: httpGet, tcpSocket, exec o grpc."]
  ],
  example: "Un servicio Java tarda hasta dos minutos en calentar, y su liveness probe lo mataba a los 30 segundos. Agregar un startup probe con periodSeconds 10 y failureThreshold 15 le da 150 segundos para arrancar, tras lo cual el liveness probe normal, con un timeout corto, toma el control.",
  tip: "Conoce los valores por defecto: period 10s, timeout 1s, failureThreshold 3, successThreshold 1, initialDelay 0. Para arranques lentos, la respuesta preferida es un startup probe, no un initialDelaySeconds enorme.",
  check: [
   ["¿Qué códigos de estado HTTP cuentan como éxito para un probe httpGet?", "Cualquier código desde 200 hasta 399."],
   ["¿Cuánto tiempo permite un startup probe con periodSeconds 5 y failureThreshold 12?", "Unos 60 segundos (5 x 12) antes de que el contenedor se reinicie."],
   ["¿Qué pasa con los probes de liveness y readiness mientras un startup probe todavía no ha tenido éxito?", "No se ejecutan; empiezan solo después de que el startup probe tiene éxito."]
  ]
 },
 {
  t: "What each probe failure does: restart the container vs remove the Pod from Service endpoints",
  tt: "Qué provoca el fallo de cada probe: reiniciar el contenedor vs quitar el Pod de los endpoints del Service",
  body: [
   "Los tres tipos de probe se diferencian sobre todo en lo que ocurre cuando fallan. Confundirlos lleva a reinicios innecesarios o a enviar tráfico a Pods que no pueden atenderlo, así que el examen evalúa directamente estas consecuencias.",
   "Cuando un liveness probe falla `failureThreshold` veces seguidas, el kubelet mata el contenedor y lo reinicia según el `restartPolicy` del Pod. El Pod se queda en el mismo nodo con el mismo nombre e IP; solo se reemplaza el contenedor, y el contador RESTARTS de `kubectl get pods` sube. Los fallos repetidos de liveness provocan retrasos de back-off crecientes y el estado CrashLoopBackOff. Los eventos muestran `Liveness probe failed` seguido de `Container api failed liveness probe, will be restarted`.",
   "Cuando falla un readiness probe, no se reinicia nada. El kubelet marca el contenedor como no listo, la condición Ready del Pod pasa a False (la columna READY muestra `0/1`) y la dirección del Pod se marca como no lista en las EndpointSlices del Service, así que los Services e Ingresses dejan de enviarle tráfico nuevo. Cuando el probe vuelve a pasar, el Pod se agrega de nuevo automáticamente. La readiness sigue ejecutándose durante toda la vida del contenedor, así que puede sacar a un Pod de la rotación temporalmente, por ejemplo mientras está sobrecargado o una dependencia está caída.",
   "Cuando un startup probe falla `failureThreshold` veces, el contenedor se mata y se reinicia, igual que con un fallo de liveness. Hasta que tiene éxito, el contenedor tampoco está listo, así que no recibe tráfico.",
   "```text\nProbe      Al fallar                           ¿Pod sale del Service?  ¿Contenedor reiniciado?\nstartup    matar + reiniciar tras el umbral    sí (aún no listo)       sí\nliveness   matar + reiniciar tras el umbral    (mientras reinicia)     sí\nreadiness  marcar como no listo                sí                      no\n```",
   "La readiness también dirige los rollouts: un Deployment cuenta un Pod nuevo como disponible solo cuando está listo, así que un readiness probe que falla detiene un rolling update y protege a los usuarios de una versión rota. Un Pod sin readiness probe se considera listo en cuanto arrancan sus contenedores.",
   "De aquí se desprenden pautas de diseño. Haz que las verificaciones de liveness sean simples y locales, probando solo si este proceso está vivo; si la liveness depende de una base de datos, una caída de la base de datos reinicia todos los Pods a la vez y empeora las cosas. Pon las verificaciones de dependencias en la readiness, para que los Pods salgan de la rotación sin reiniciarse. Al diagnosticar, un contador de reinicios creciente apunta a fallos de liveness o startup, mientras que Pods en Running pero con `0/1` listos, y un Service sin endpoints listos, apuntan a readiness."
  ],
  terms: [
   ["Restart (reinicio)", "La acción ante fallo de liveness/startup: el kubelet mata el contenedor y lo vuelve a iniciar en el mismo Pod."],
   ["Not ready (no listo)", "El estado ante fallo de readiness: el Pod sigue en ejecución pero se quita de los endpoints del Service."],
   ["Ready condition (condición Ready)", "Condición de estado del Pod mostrada en la columna READY que decide si el Pod recibe tráfico del Service."]
  ],
  example: "Durante una reconstrucción de caché, el endpoint de readiness de un Pod de API devuelve 503 durante un minuto. `kubectl get pods` lo muestra como Running 0/1, el Service lo esquiva y, cuando termina la reconstrucción, vuelve a 1/1 con cero reinicios. Si se hubiera usado la misma verificación para liveness, el Pod se habría reiniciado a mitad de la reconstrucción.",
  tip: "Falla liveness: el contenedor se reinicia. Falla readiness: el Pod sale del Service pero sigue ejecutándose. Si una pregunta menciona reinicios que suben, piensa en liveness; si menciona que no hay tráfico pero tampoco reinicios, piensa en readiness.",
  check: [
   ["Un Pod muestra Running, READY 0/1 y 0 reinicios. ¿Qué probe está fallando?", "El readiness probe; los fallos de readiness no reinician el contenedor."],
   ["¿Por qué un liveness probe no debería verificar una base de datos compartida?", "Una caída de la base de datos haría que todos los Pods fallaran la liveness y se reiniciaran a la vez, causando más interrupciones sin arreglar nada."],
   ["¿Qué hace un startup probe fallido tras alcanzar su umbral?", "Mata y reinicia el contenedor, como un fallo de liveness."]
  ]
 },
 {
  t: "Kubectl get, describe, get events, top pod/node (metrics-server) for monitoring",
  tt: "kubectl get, describe, get events y top pod/node (metrics-server) para monitoreo",
  body: [
   "Monitorear una aplicación en Kubernetes empieza con cuatro comandos de kubectl. Cada uno responde una pregunta distinta, y saber cuál usar te ahorra minutos en cada tarea del examen.",
   "`kubectl get` responde '¿Qué existe y en qué estado está?'. Imprime un resumen de una línea por objeto: para los Pods, el conteo READY, STATUS, RESTARTS y AGE. Combina tipos con comas (`kubectl get deploy,rs,pods,svc`), filtra con etiquetas (`-l app=web`), mira en todos los namespaces (`-A`) y observa los cambios en vivo (`-w`). `kubectl get all` muestra los tipos comunes de workload y Service de un namespace, pero no ConfigMaps, Secrets, PVCs ni Ingresses.",
   "`kubectl describe` responde '¿Por qué está en ese estado?'. Muestra la vista completa y legible de un objeto, incluida información relacionada que `get` omite: estados de los contenedores y motivos de la última terminación, códigos de salida, configuración de probes, volúmenes montados, el nodo, las solicitudes de recursos y, sobre todo, la sección Events al final. Para un Pod atascado en Pending, describe muestra fallos de scheduling como CPU insuficiente; para un Service muestra los endpoints; para un Deployment, sus condiciones de rollout.",
   "`kubectl get events` responde '¿Qué ha pasado recientemente en este namespace?'. Los eventos son registros de corta duración creados por los controladores, el scheduler y el kubelet: decisiones de scheduling, descargas de imágenes, fallos de probes, OOM kills, back-offs. Se conservan solo por un tiempo limitado (una hora por defecto en muchos clústeres), así que revísalos pronto. Ordénalos cronológicamente con `kubectl get events --sort-by=.metadata.creationTimestamp`, filtra advertencias con `--field-selector type=Warning` o limítate a un objeto con `--field-selector involvedObject.name=web-5d8f7`. `kubectl events` es un comando más nuevo con una salida similar y una opción `--for pod/web-5d8f7`.",
   "```bash\nkubectl get pods -o wide -w\nkubectl describe pod web-5d8f7\nkubectl get events -A --field-selector type=Warning\nkubectl get events --sort-by=.metadata.creationTimestamp\nkubectl top node\nkubectl top pod -A --sort-by=memory\nkubectl top pod web-5d8f7 --containers\n```",
   "`kubectl top` responde '¿Cuánta CPU y memoria está usando ahora mismo?'. Necesita el complemento metrics-server, que recopila el uso de recursos de cada kubelet y lo sirve a través de la Metrics API. Sin él obtienes un error que dice que las métricas no están disponibles; en minikube lo activas con `minikube addons enable metrics-server`. `kubectl top node` muestra el uso por nodo, `kubectl top pod` por Pod, `--containers` desglosa un Pod por contenedor, y `--sort-by=cpu` o `--sort-by=memory` ordena la lista. Los números son muestras recientes, no historial, y se muestran en milicores (`m`) y mebibytes (`Mi`). La misma Metrics API alimenta al HorizontalPodAutoscaler.",
   "Una tarea clásica del examen es 'encuentra el Pod que usa más CPU en el namespace X y escribe su nombre en un archivo': `kubectl top pod -n X --sort-by=cpu --no-headers | head -1 | awk '{print $1}' > /path/file`."
  ],
  terms: [
   ["kubectl describe", "Vista detallada de un objeto, incluido su estado relacionado y los eventos recientes."],
   ["Event (evento)", "Un registro de corta duración de algo que le ocurrió a un objeto, como un fallo de scheduling o la descarga de una imagen."],
   ["metrics-server", "Complemento del clúster que recopila el uso de CPU y memoria de los kubelets para kubectl top y el HPA."],
   ["kubectl top", "Muestra el uso actual de CPU y memoria de nodos o Pods a partir de la Metrics API."]
  ],
  example: "Un Pod lleva cinco minutos en Pending. `kubectl get pod` solo dice Pending, pero `kubectl describe pod` muestra el evento '0/3 nodes are available: 3 Insufficient memory', lo que lleva al desarrollador a reducir la solicitud de memoria del Pod.",
  tip: "`get` te dice qué, `describe` y los eventos te dicen por qué, `top` te dice cuánto. Si `kubectl top` da error, falta metrics-server o todavía no está listo.",
  check: [
   ["¿Qué comando muestra por qué un Pod está atascado en Pending?", "`kubectl describe pod <name>` (su sección Events), o `kubectl get events`."],
   ["¿De qué depende `kubectl top`?", "Del complemento metrics-server, que proporciona la Metrics API."],
   ["¿Cómo listas los eventos recientes en orden cronológico?", "`kubectl get events --sort-by=.metadata.creationTimestamp`."]
  ]
 },
 {
  t: "Container logs: kubectl logs with -c, -f, --previous, --tail, --since, -l and deploy/<name>",
  tt: "Logs de contenedores: kubectl logs con -c, -f, --previous, --tail, --since, -l y deploy/<name>",
  body: [
   "Se espera que los contenedores escriban sus logs en la salida estándar y la salida de error estándar. El runtime de contenedores captura esos flujos en archivos del nodo, y `kubectl logs` los lee a través del kubelet. Si una aplicación escribe solo en un archivo dentro del contenedor, `kubectl logs` no muestra nada; esa es una de las razones del patrón sidecar que lee esos archivos y los envía a stdout.",
   "La forma básica es `kubectl logs <pod>`. Si el Pod tiene más de un contenedor, debes indicar cuál con `-c <container>`; de lo contrario, kubectl elige el contenedor por defecto (definido por la anotación `kubectl.kubernetes.io/default-container`) o te pide que elijas. `--all-containers` imprime los logs de todos los contenedores, incluidos los init containers. Los logs de un init container se consultan igual: `kubectl logs mypod -c init-db`.",
   "`-f` (follow) muestra las líneas nuevas a medida que llegan hasta que presionas Ctrl-C, como `tail -f`. `--tail=50` muestra solo las últimas 50 líneas, útil para apps muy verbosas. `--since=10m` o `--since=1h` limita la salida a una ventana de tiempo reciente, y `--timestamps` antepone la hora a cada línea. Se pueden combinar: `kubectl logs web-5d8f7 --since=5m -f`.",
   "`--previous` (o `-p`) muestra los logs de la instancia anterior de un contenedor, la que falló o se reinició. Esto es esencial para CrashLoopBackOff: el contenedor actual puede haber acabado de arrancar y no tener salida útil, mientras que el motivo del fallo, como un stack trace o 'config file not found', está en la instancia anterior. Solo se conserva la instancia terminada más reciente.",
   "```bash\nkubectl logs web-5d8f7 -c app --tail=100\nkubectl logs web-5d8f7 -c app --previous\nkubectl logs -f deploy/web\nkubectl logs -l app=web --all-containers --prefix --since=15m\nkubectl logs job/migrate\n```",
   "Puedes nombrar un controlador en lugar de un Pod: `kubectl logs deploy/web` o `kubectl logs job/migrate` elige un Pod que le pertenezca, lo que te ahorra buscar nombres generados. Sin embargo, solo muestra un Pod. Para leer logs de muchos Pods a la vez, usa un selector de etiquetas: `kubectl logs -l app=web`. Con `-l`, kubectl muestra por defecto un número limitado de líneas recientes por Pod y sigue un número limitado de Pods a la vez (`--max-log-requests`); `--prefix` etiqueta cada línea con el nombre de su Pod y contenedor.",
   "Los logs viven en el nodo y desaparecen cuando el Pod se elimina o el nodo los rota, así que `kubectl logs` sirve para diagnósticos recientes, no para almacenamiento a largo plazo; los clústeres usan un recolector de logs (a menudo un DaemonSet) para eso. En el examen te pueden pedir que guardes logs en un archivo: `kubectl logs mypod -c app > /opt/logs/app.log`."
  ],
  terms: [
   ["-c", "Selecciona de qué contenedor mostrar los logs en un Pod multicontenedor."],
   ["--previous", "Muestra los logs de la última instancia terminada del contenedor."],
   ["-f", "Sigue el flujo de logs a medida que se escriben líneas nuevas."],
   ["-l", "Selecciona Pods por etiqueta para mostrar logs de varios Pods a la vez."]
  ],
  example: "Un Pod está en CrashLoopBackOff y `kubectl logs api-7c9` solo imprime un banner de arranque. Ejecutar `kubectl logs api-7c9 --previous` muestra el error real de la instancia que falló: 'DATABASE_URL is not set', lo que apunta a una variable de entorno faltante.",
  tip: "Para contenedores que fallan, recurre primero a `--previous`. En Pods multicontenedor, `-c` es necesario para obtener el contenedor correcto.",
  check: [
   ["¿Cómo ves por qué falló la última instancia de un contenedor?", "`kubectl logs <pod> -c <container> --previous`."],
   ["¿Qué muestra `kubectl logs deploy/web`?", "Los logs de un Pod perteneciente al Deployment, no de todos."],
   ["¿Cómo muestras solo las líneas de log de los últimos 30 minutos?", "Agrega `--since=30m`."]
  ]
 },
 {
  t: "Reading Pod status: Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled, Completed, exit codes",
  tt: "Leer el estado de un Pod: Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled, Completed y códigos de salida",
  body: [
   "La columna STATUS de `kubectl get pods` es un resumen compacto de la fase del Pod y de los estados de sus contenedores. Aprender a leerla te dice dónde mirar a continuación y te ahorra muchas conjeturas.",
   "Pending significa que el Pod fue aceptado pero sus contenedores todavía no se están ejecutando. O no ha sido programado (no hay suficiente CPU o memoria en ningún nodo, hay un nodeSelector o taint que ningún nodo satisface, o un PVC sin vincular), o ya está programado y todavía está descargando imágenes o preparando volúmenes. `kubectl describe pod` muestra cuál: un evento FailedScheduling, o un estado ContainerCreating con eventos sobre volúmenes. Un ConfigMap o Secret faltante referenciado por el Pod suele mostrarse como ContainerCreating o CreateContainerConfigError.",
   "ErrImagePull y luego ImagePullBackOff significan que el kubelet no puede descargar la imagen: un error tipográfico en el nombre o la etiqueta de la imagen, un registry privado sin `imagePullSecrets` o ninguna ruta de red hasta el registry. BackOff significa que Kubernetes espera cada vez más entre reintentos. El texto del evento, como 'manifest unknown' o 'unauthorized', te dice cuál es el problema.",
   "CrashLoopBackOff significa que el contenedor arranca, termina, se reinicia y vuelve a terminar, con retrasos crecientes entre intentos. El problema es el propio contenedor: la aplicación da error al arrancar, el comando es incorrecto, falta un archivo o variable necesarios, o un liveness probe lo sigue matando. Revisa `kubectl logs --previous` y la sección Last State de `kubectl describe pod`, que muestra el motivo y el código de salida.",
   "OOMKilled significa que el contenedor usó más memoria que su límite, así que el kernel lo mató. Aparece como motivo de terminación en Last State, normalmente con el código de salida 137, y a menudo lleva a CrashLoopBackOff. La solución es aumentar el límite de memoria o reducir el uso de memoria de la aplicación. Completed significa que todos los contenedores terminaron con código 0, que es el estado final normal de los Pods de un Job; para un Pod de un Deployment, que debería ejecutarse indefinidamente, significa que el comando terminó cuando debía seguir ejecutándose, y como su restartPolicy es Always, el kubelet lo reinicia hasta que muestra CrashLoopBackOff.",
   "Los códigos de salida te dicen cómo terminó un proceso. 0 es éxito. 1 (u otro número pequeño) es un error general de la aplicación. 126 significa que el comando se encontró pero no se pudo ejecutar, a menudo un problema de permisos. 127 significa comando no encontrado, típicamente un error tipográfico en `command` o un binario que falta en la imagen. Los códigos mayores que 128 significan que el proceso fue terminado por una señal, donde el código es 128 más el número de la señal: 137 es 128 + 9 (SIGKILL, usado por el OOM killer o tras una terminación forzada) y 143 es 128 + 15 (SIGTERM, una detención ordenada normal).",
   "```bash\nkubectl get pods\nkubectl describe pod api-7c9 | grep -A5 'Last State'\nkubectl get pod api-7c9 -o jsonpath='{.status.containerStatuses[0].lastState.terminated.exitCode}'\n```"
  ],
  terms: [
   ["Pending", "Pod aceptado pero con contenedores que aún no se ejecutan, a menudo sin programar o todavía creándose."],
   ["ImagePullBackOff", "La imagen no se puede descargar y Kubernetes espera cada vez más entre reintentos."],
   ["CrashLoopBackOff", "El contenedor termina repetidamente tras arrancar y se reinicia con retrasos crecientes."],
   ["OOMKilled", "El contenedor fue terminado por superar su límite de memoria, normalmente con código de salida 137."],
   ["Exit code 128+n (código de salida 128+n)", "Un proceso terminado por la señal n, como 137 para SIGKILL o 143 para SIGTERM."]
  ],
  example: "Un Pod nuevo muestra ImagePullBackOff. `kubectl describe pod` muestra 'failed to pull image \"ngnix:1.27\": not found'. El nombre de la imagen estaba mal escrito; tras corregirlo con `kubectl set image`, el Pod arranca. Otro Pod de la misma app muestra OOMKilled con código de salida 137, así que se aumenta su límite de memoria.",
  tip: "Asocia cada estado con el siguiente comando: Pending e ImagePullBackOff llevan a `describe`, CrashLoopBackOff lleva a `logs --previous` y OOMKilled lleva al límite de memoria.",
  check: [
   ["¿Qué suele significar el código de salida 127?", "Comando no encontrado: un comando incorrecto o un binario que falta en la imagen."],
   ["Un contenedor muestra OOMKilled con código de salida 137. ¿Qué lo causó?", "Superó su límite de memoria y fue terminado con SIGKILL (128 + 9)."],
   ["El Pod de un Deployment muestra Completed y sigue reiniciándose. ¿Qué es lo probable que esté mal?", "Su comando se ejecuta hasta terminar en lugar de quedarse en primer plano; con restartPolicy Always el kubelet sigue reiniciando el contenedor, que pronto muestra CrashLoopBackOff."]
  ]
 },
 {
  t: "Debugging: kubectl exec, kubectl debug (ephemeral containers and Pod copies), port-forward, temporary busybox Pods",
  tt: "Depuración: kubectl exec, kubectl debug (contenedores efímeros y copias de Pods), port-forward y Pods temporales de busybox",
  body: [
   "Los logs y los eventos no siempre explican un problema. A veces necesitas entrar al entorno del Pod, probar la red desde dentro del clúster o llegar a una app desde tu propia terminal. kubectl te da cuatro herramientas para esto.",
   "`kubectl exec` ejecuta un comando dentro de un contenedor en ejecución. `kubectl exec web-5d8f7 -- cat /etc/nginx/nginx.conf` ejecuta un comando; `kubectl exec -it web-5d8f7 -c app -- sh` abre un shell interactivo (`-i` mantiene abierta la entrada estándar, `-t` asigna una terminal). Todo lo que va después de `--` es el comando. Úsalo para revisar archivos, variables de entorno (`env`), volúmenes montados y conectividad. Solo funciona si el contenedor está en ejecución y la imagen realmente contiene la herramienta que invocas; las imágenes mínimas y distroless a menudo no tienen ningún shell.",
   "`kubectl debug` resuelve esos casos. Con un contenedor efímero, `kubectl debug -it web-5d8f7 --image=busybox --target=app`, kubectl agrega un contenedor temporal al Pod en ejecución. Comparte la red del Pod y, con `--target`, comparte el process namespace de ese contenedor, así que puedes ver sus procesos. Los contenedores efímeros no se pueden quitar ni reiniciar y no tienen puertos ni probes; existen solo para diagnóstico. Con una copia, `kubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh`, kubectl crea un Pod nuevo basado en el original y te permite cambiar su comando o imagen, lo cual es útil cuando el original falla de inmediato y quieres arrancarlo con un shell. Elimina la copia al terminar.",
   "```bash\nkubectl exec -it web-5d8f7 -c app -- sh\nkubectl debug -it web-5d8f7 --image=busybox --target=app\nkubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh\nkubectl port-forward pod/web-5d8f7 8080:80\nkubectl port-forward svc/web 8080:80\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "`kubectl port-forward` abre un túnel desde un puerto de tu máquina, a través del API server, hasta un Pod. `kubectl port-forward pod/web-5d8f7 8080:80` hace que `curl localhost:8080` llegue al puerto 80 del Pod. Puedes apuntar a `svc/web` o `deploy/web`, pero kubectl igual elige un único Pod detrás; no balancea la carga. Se ejecuta en primer plano hasta que lo detienes; agrega `&` en un shell para dejarlo en segundo plano. Es ideal para probar una app sin crear un Service ni un Ingress.",
   "Un Pod temporal prueba cosas desde dentro de la red del clúster, tal como las vería otro Pod. `kubectl run tmp --image=busybox --rm -it --restart=Never -- sh` te da un shell que se elimina al salir. Desde ahí, `wget -qO- web.default.svc.cluster.local` prueba un Service y `nslookup web` prueba el DNS. Para una sola verificación, `kubectl run tmp --image=busybox --rm -it --restart=Never -- wget -qO- -T 2 web:80` imprime el resultado y limpia. Es la forma más rápida de confirmar si una NetworkPolicy bloquea o permite tráfico. Las imágenes `curlimages/curl` o `nicolaka/netshoot` son alternativas cuando necesitas más herramientas.",
   "Elige la herramienta según la pregunta: dentro del contenedor de la app, usa exec; si faltan herramientas o el contenedor falla, usa debug; desde tu laptop, usa port-forward; tal como lo vería otro Pod, usa un Pod temporal."
  ],
  terms: [
   ["kubectl exec", "Ejecuta un comando, o un shell interactivo con -it, dentro de un contenedor en ejecución."],
   ["Ephemeral container (contenedor efímero)", "Un contenedor temporal de depuración que kubectl debug agrega a un Pod en ejecución."],
   ["kubectl debug --copy-to", "Crea una copia modificada de un Pod para diagnóstico."],
   ["kubectl port-forward", "Crea un túnel desde un puerto local hasta un puerto de un Pod a través del API server."]
  ],
  example: "Un servicio Go distroless devuelve errores pero no tiene shell para exec. El desarrollador ejecuta `kubectl debug -it api-6f4 --image=busybox --target=api` y luego usa `wget` desde el contenedor efímero para confirmar que la app responde en localhost:8080 pero no puede llegar al hostname de la base de datos, lo que apunta a un problema de configuración de DNS.",
  tip: "Recuerda `--rm -it --restart=Never` para Pods de prueba desechables, y que port-forward a un Service sigue llegando a un solo Pod.",
  check: [
   ["¿Qué puedes hacer cuando la imagen de un contenedor no tiene shell?", "Usar `kubectl debug` para agregar un contenedor efímero con herramientas como busybox, que comparte la red del Pod y, opcionalmente, su process namespace."],
   ["¿Qué hace `kubectl port-forward svc/web 8080:80`?", "Reenvía el puerto local 8080 al puerto 80 de un Pod seleccionado por el Service."],
   ["¿Por qué probar un Service desde un Pod temporal de busybox en lugar de desde tu terminal?", "Ve la red y el DNS del clúster como los ven los demás Pods, incluidos los efectos de las NetworkPolicy."]
  ]
 },
 {
  t: "Output tricks for fast troubleshooting: -o wide, -o yaml, jsonpath, --show-labels, --sort-by",
  tt: "Trucos de salida para diagnosticar rápido: -o wide, -o yaml, jsonpath, --show-labels, --sort-by",
  body: [
   "Muchas tareas del CKAD terminan con 'escribe el resultado en un archivo'. Cuanto más rápido puedas extraer exactamente el campo correcto de la API, más tiempo te queda para las tareas difíciles. Las opciones de salida de kubectl son las herramientas para eso.",
   "`-o wide` agrega columnas adicionales: para Pods, la IP del Pod, el nodo y el nodo nominado; para Deployments, los nombres de contenedores, las imágenes y el selector; para Services, el selector. Es la forma más rápida de ver en qué nodo cayó un Pod o qué imagen ejecuta un Deployment. `--show-labels` agrega una columna LABELS, y `-L app,tier` agrega una columna por cada etiqueta nombrada. Junto con `-l` (filtrar por etiqueta), estas opciones hacen que los problemas de selectores sean fáciles de detectar.",
   "`-o yaml` imprime el objeto completo tal como lo almacena el API server, incluido el status y los campos con valores por defecto. Úsalo para ver exactamente qué se está ejecutando y como punto de partida para manifiestos nuevos: `kubectl get deploy web -o yaml > web.yaml`. Quita los campos administrados por el servidor, como `status`, `uid`, `resourceVersion` y `creationTimestamp`, antes de reutilizarlo. Combinado con `--dry-run=client`, `-o yaml` genera manifiestos nuevos a partir de comandos imperativos sin crear nada.",
   "`-o jsonpath='{...}'` extrae campos específicos. La expresión recorre el objeto desde arriba: `{.metadata.name}`, `{.spec.containers[0].image}`, `{.status.podIP}`. Para las listas que devuelve `get pods`, empieza desde `.items`: `{.items[*].metadata.name}` imprime todos los nombres en una línea. `[*]` significa todos los elementos, `[0]` el primero, y los filtros se ven así: `[?(@.type==\"Ready\")]`. Para un elemento por línea, usa `{range .items[*]}{.metadata.name}{\"\\n\"}{end}`. Encierra la expresión entre comillas simples para que el shell no la toque.",
   "```bash\nkubectl get pods -o wide --show-labels\nkubectl get pods -L app,version\nkubectl get pod web-5d8f7 -o jsonpath='{.status.podIP}'\nkubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'\nkubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.phase}{\"\\n\"}{end}'\nkubectl get pods --sort-by=.metadata.creationTimestamp\nkubectl get pods --sort-by='.status.containerStatuses[0].restartCount'\nkubectl get pods -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName\n```",
   "`--sort-by` ordena la lista por cualquier campo, escrito como una expresión JSONPath relativa a cada elemento (sin `.items`): ordena por fecha de creación, contador de reinicios o nombre. `-o custom-columns=` construye tu propia tabla con nombres de encabezado y rutas de campos, a menudo más clara que jsonpath para varios campos. `-o name` imprime solo nombres del estilo `pod/web-5d8f7`, prácticos en bucles, y `--no-headers` quita la fila de encabezado para scripts.",
   "Si no conoces la ruta de un campo, ejecuta `-o yaml` una vez, encuentra el campo y escribe la ruta desde la raíz del objeto. `kubectl explain` también muestra la estructura. Revisa siempre con `cat` el archivo que escribiste antes de seguir."
  ],
  terms: [
   ["-o wide", "Agrega columnas adicionales como la IP del Pod, el nodo y las imágenes."],
   ["-o yaml", "Imprime el objeto completo, incluido el status y los valores por defecto."],
   ["jsonpath", "Plantilla de salida que extrae campos específicos del árbol del objeto."],
   ["--sort-by", "Ordena la salida de una lista por un campo dado como expresión JSONPath."],
   ["custom-columns", "Formato de salida que construye una tabla a partir de rutas de campos con nombre."]
  ],
  example: "Una tarea pide los nombres de todos los Pods del namespace `ops`, ordenados por antigüedad, uno por línea, guardados en /opt/pods.txt. Ejecutas `kubectl get pods -n ops --sort-by=.metadata.creationTimestamp -o custom-columns=NAME:.metadata.name --no-headers > /opt/pods.txt` y lo revisas con `cat`.",
  tip: "Para `kubectl get pods` (una lista), jsonpath empieza en `.items`, pero las rutas de `--sort-by` son relativas a cada elemento. Pon siempre las expresiones jsonpath entre comillas simples.",
  check: [
   ["¿Qué opción muestra rápidamente el nodo en el que se ejecuta cada Pod?", "`-o wide`."],
   ["Escribe un jsonpath para imprimir la imagen del primer contenedor del Pod web.", "`kubectl get pod web -o jsonpath='{.spec.containers[0].image}'`."],
   ["¿Cómo listas los Pods ordenados por contador de reinicios?", "`kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'`."]
  ]
 },
 {
  t: "Extending Kubernetes: CustomResourceDefinitions, custom resources and Operators; discovering them with kubectl get crd and api-resources",
  tt: "Extender Kubernetes: CustomResourceDefinitions, recursos personalizados y Operators; descubrirlos con kubectl get crd y api-resources",
  body: [
   "Kubernetes trae tipos integrados como Pods, Services y Deployments, pero su API está diseñada para extenderse. Una CustomResourceDefinition (CRD) agrega un nuevo tipo de recurso al API server. Una vez que existe una CRD, puedes crear, listar, editar y eliminar objetos de ese tipo con kubectl exactamente igual que los objetos integrados. Esos objetos se llaman recursos personalizados (custom resources).",
   "Una CRD declara el `group` de API del nuevo tipo, sus `versions` (con un esquema OpenAPI v3 que valida los campos), su `scope` (Namespaced o Cluster) y sus `names`: el kind, el plural, el singular y nombres cortos opcionales. El nombre de la propia CRD debe ser `<plural>.<group>`, por ejemplo `backups.example.com`.",
   "```yaml\napiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: backups.example.com\nspec:\n  group: example.com\n  scope: Namespaced\n  names:\n    plural: backups\n    singular: backup\n    kind: Backup\n    shortNames: [bk]\n  versions:\n  - name: v1\n    served: true\n    storage: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              schedule: {type: string}\n              retainDays: {type: integer}\n---\napiVersion: example.com/v1\nkind: Backup\nmetadata:\n  name: nightly\nspec:\n  schedule: \"0 1 * * *\"\n  retainDays: 7\n```",
   "Una CRD por sí sola solo almacena datos. Algo tiene que actuar sobre ella. Eso es un controlador: un programa, normalmente ejecutándose como Deployment en el clúster, que observa los objetos de un tipo y trabaja para que el mundo real coincida con su spec. Un Operator es un controlador más CRDs que juntos codifican el conocimiento operativo de una aplicación concreta, como la forma de desplegar, respaldar, actualizar o hacer failover de una base de datos. Declaras `kind: PostgresCluster` con tres réplicas, y el Operator crea por ti los StatefulSets, Services, Secrets y backups.",
   "Descubrir qué extensiones existen es un inicio común en las tareas del examen. `kubectl get crd` (abreviatura de customresourcedefinitions) lista todas las CRDs con su fecha de creación. `kubectl api-resources --api-group=example.com` muestra los nombres de recursos, los nombres cortos y si tienen namespace. `kubectl explain backup.spec` funciona con CRDs que definen un esquema. Luego usa el nombre plural, singular o corto de forma normal: `kubectl get backups -A`, `kubectl get bk nightly -o yaml`, `kubectl describe backup nightly`.",
   "```bash\nkubectl get crd\nkubectl get crd backups.example.com -o yaml\nkubectl api-resources | grep example.com\nkubectl get backups -n prod\nkubectl apply -f nightly-backup.yaml\n```",
   "Eliminar una CRD elimina todos los recursos personalizados de ese tipo, así que trátala con cuidado. Y si aplicas un recurso personalizado antes de que exista su CRD, obtienes el error 'no matches for kind \"Backup\" in version \"example.com/v1\"'; instala primero la CRD (a menudo parte del chart de Helm de un Operator)."
  ],
  terms: [
   ["CustomResourceDefinition (CRD)", "Un objeto que registra un nuevo tipo de recurso en la API de Kubernetes."],
   ["Custom resource (recurso personalizado)", "Un objeto de un tipo definido por una CRD, administrado con kubectl como los objetos integrados."],
   ["Controller (controlador)", "Un programa que observa objetos y actúa para que el estado real coincida con su spec."],
   ["Operator", "Un controlador más CRDs que automatizan la operación de una aplicación específica."]
  ],
  example: "Un equipo de plataforma instala un Operator de certificados. `kubectl get crd | grep cert` muestra tipos nuevos como Certificate e Issuer. Luego, un desarrollador escribe un breve manifiesto `kind: Certificate` para el hostname de su app, y el controlador del Operator obtiene el certificado y lo guarda en un Secret que usa el Ingress.",
  tip: "El nombre de la CRD es `<plural>.<group>`, y los recursos personalizados usan `apiVersion: <group>/<version>`. `kubectl api-resources` te dice el plural y los nombres cortos exactos que debes usar.",
  check: [
   ["¿Qué pasa si aplicas un recurso personalizado cuya CRD no está instalada?", "El API server lo rechaza con un error 'no matches for kind'."],
   ["¿Qué hace que un Operator sea más que una CRD?", "Un controlador que observa los recursos personalizados y realiza las acciones para hacerlos realidad."],
   ["¿Cómo listas todas las CRDs de un clúster?", "`kubectl get crd`."]
  ]
 },
 {
  t: "Request flow: authentication, authorization (RBAC) and admission control (mutating and validating)",
  tt: "Flujo de una solicitud: autenticación, autorización (RBAC) y control de admisión (mutating y validating)",
  body: [
   "Todo cambio en Kubernetes pasa por el API server: kubectl, los controladores, el kubelet y tus propias aplicaciones le envían solicitudes HTTPS. Antes de que una solicitud pueda crear o modificar un objeto, pasa por tres filtros en un orden fijo: autenticación, autorización y control de admisión. Conocer el orden te ayuda a interpretar los errores.",
   "La autenticación responde '¿Quién eres?'. El API server prueba sus autenticadores configurados: certificados de cliente (comunes en los archivos kubeconfig de administradores), bearer tokens (incluidos los tokens de ServiceAccount que usan los Pods) y proveedores de identidad externos mediante OpenID Connect (OIDC). Kubernetes no tiene un objeto User; un usuario humano es solo un nombre y unos grupos afirmados por una credencial de confianza. Las ServiceAccounts, en cambio, son objetos reales y aparecen como `system:serviceaccount:<namespace>:<name>`. Si ningún autenticador acepta la solicitud, falla con 401 Unauthorized. `kubectl auth whoami` muestra quién cree el API server que eres.",
   "La autorización responde '¿Tienes permiso para hacer esto?'. La solicitud se describe como un verbo (get, list, watch, create, update, patch, delete), un recurso (y un subrecurso opcional como `pods/log`), un grupo de API, un namespace y un nombre. Los autorizadores configurados, normalmente Node y RBAC (Role-Based Access Control, control de acceso basado en roles), deciden. RBAC es puramente aditivo: no hay reglas de denegación, y todo lo que no está permitido explícitamente se deniega. Un rechazo devuelve 403 Forbidden con un mensaje como `User \"jane\" cannot list resource \"pods\" in API group \"\" in the namespace \"prod\"`.",
   "El control de admisión responde '¿Este objeto en particular es aceptable y debería ajustarse?'. Se aplica a las solicitudes que crean, actualizan o eliminan objetos, no a las lecturas. La admisión mutating se ejecuta primero y puede cambiar el objeto: el admission controller de ServiceAccount completa la ServiceAccount por defecto, LimitRanger agrega solicitudes y límites por defecto, y los webhooks mutating pueden inyectar sidecars. Luego el objeto se valida contra su esquema. La admisión validating se ejecuta después y solo puede aceptar o rechazar: ResourceQuota rechaza objetos que superarían una cuota del namespace, Pod Security Admission rechaza Pods que incumplen el nivel de seguridad del namespace, y las ValidatingAdmissionPolicies o los webhooks validating aplican reglas personalizadas. Si todo pasa, el objeto se guarda en etcd.",
   "```text\nkubectl -> API server\n  1. Autenticación      (¿quién?)          falla -> 401 Unauthorized\n  2. Autorización       (¿permitido?)      falla -> 403 Forbidden\n  3. Admisión mutating  (ajustar)\n  4. Validación de esquema\n  5. Admisión validating (¿aceptar?)       falla -> error que nombra la política o cuota\n  6. Persistir en etcd\n```",
   "Leer los errores con esto en mente es una habilidad práctica para el examen. 'forbidden: User ... cannot create resource' es autorización y se arregla con RBAC. 'forbidden: exceeded quota' viene del admission controller ResourceQuota y se arregla bajando las solicitudes o subiendo la cuota. 'violates PodSecurity \"restricted:latest\"' viene de Pod Security Admission y se arregla en el securityContext del Pod. Y un Pod que ganó recursos o un sidecar que tú no escribiste fue modificado por la admisión mutating. En los Deployments, los rechazos de admisión de Pods aparecen en los eventos del ReplicaSet, no del Deployment, así que revisa `kubectl describe rs`."
  ],
  terms: [
   ["Authentication (autenticación)", "Establecer quién hace la solicitud; un fallo devuelve 401."],
   ["Authorization (autorización)", "Decidir si la identidad puede realizar el verbo sobre el recurso; un fallo devuelve 403."],
   ["Mutating admission (admisión mutating)", "Paso de admisión que puede modificar un objeto antes de guardarlo."],
   ["Validating admission (admisión validating)", "Paso de admisión que acepta o rechaza un objeto sin cambiarlo."]
  ],
  example: "Un Deployment muestra 0/3 listos y no existe ningún Pod. `kubectl describe rs` muestra 'pods \"web-...\" is forbidden: exceeded quota: compute, requested: limits.memory=512Mi'. La solicitud pasó la autenticación y RBAC, pero el admission controller validating de ResourceQuota rechazó los Pods.",
  tip: "Orden: autenticación, autorización, admisión mutating, validación, admisión validating. 401 significa identidad, 403 con 'cannot' significa RBAC, y los mensajes de cuota o PodSecurity significan admisión.",
  check: [
   ["¿Qué etapa devuelve 401 Unauthorized?", "La autenticación, cuando ningún autenticador acepta las credenciales."],
   ["¿El control de admisión se ejecuta en `kubectl get`?", "No; la admisión se aplica a solicitudes de creación, actualización y eliminación, no a lecturas."],
   ["¿Qué se ejecuta primero, la admisión mutating o la validating, y por qué?", "La mutating, para que los controladores validating revisen el objeto final ya modificado."]
  ]
 },
 {
  t: "RBAC objects: Role, ClusterRole, RoleBinding, ClusterRoleBinding; kubectl auth can-i with --as",
  tt: "Objetos RBAC: Role, ClusterRole, RoleBinding, ClusterRoleBinding; kubectl auth can-i con --as",
  body: [
   "El control de acceso basado en roles (RBAC) otorga permisos mediante dos tipos de objetos: los roles, que listan qué acciones están permitidas, y los bindings, que asignan esos roles a usuarios, grupos o ServiceAccounts. Los permisos solo se suman; no hay forma de escribir una regla de denegación.",
   "Un Role contiene reglas que se aplican dentro de un namespace. Cada regla lista `apiGroups`, `resources` y `verbs`. El grupo core, que contiene Pods, Services, ConfigMaps y Secrets, se escribe como la cadena vacía `\"\"`. Los Deployments están en `apps`, los Jobs en `batch`. Los recursos se escriben en plural y minúsculas, y los subrecursos con una barra, como `pods/log` o `pods/exec`. Los verbos incluyen `get`, `list`, `watch`, `create`, `update`, `patch`, `delete` y `*`. Puedes restringir una regla a objetos con nombre mediante `resourceNames`.",
   "Un ClusterRole tiene la misma estructura pero no tiene namespace. Se usa para recursos de alcance de clúster como nodes o PersistentVolumes, para URLs que no son recursos, o como un conjunto reutilizable de permisos para muchos namespaces. Kubernetes trae ClusterRoles como `view`, `edit` y `admin`.",
   "Un RoleBinding otorga un Role, o un ClusterRole, a sujetos dentro de un namespace. Vincular un ClusterRole con un RoleBinding es un patrón común: defines `pod-reader` una vez como ClusterRole y luego lo otorgas namespace por namespace. Un ClusterRoleBinding otorga un ClusterRole en todos los namespaces y para los recursos de alcance de clúster. El `roleRef` de un binding no se puede cambiar después de crearlo; elimina y vuelve a crear el binding para cambiar de rol.",
   "```bash\nkubectl create role pod-reader -n dev --verb=get,list,watch --resource=pods,pods/log\nkubectl create rolebinding ci-reads-pods -n dev --role=pod-reader \\\n  --serviceaccount=dev:ci-bot --user=jane\nkubectl create clusterrole node-viewer --verb=get,list --resource=nodes\nkubectl create clusterrolebinding ops-nodes --clusterrole=node-viewer --group=ops\n```",
   "Los sujetos son de kind `User`, `Group` o `ServiceAccount`. En la línea de comandos, `--serviceaccount` recibe `namespace:name`, una fuente frecuente de errores. Dentro del YAML, un sujeto ServiceAccount necesita su campo `namespace`.",
   "Prueba permisos sin cambiar de credenciales usando la suplantación (impersonation). `kubectl auth can-i create deployments -n dev` te verifica a ti mismo e imprime yes o no. `kubectl auth can-i list pods -n dev --as=jane` verifica como un usuario, y `--as=system:serviceaccount:dev:ci-bot` verifica como una ServiceAccount. `kubectl auth can-i --list -n dev --as=system:serviceaccount:dev:ci-bot` lista todo lo que esa cuenta puede hacer. Suplantar requiere que tú mismo tengas permitido el verbo `impersonate`, algo que los administradores del clúster normalmente tienen.",
   "Sigue el principio de mínimo privilegio: otorga solo los verbos y recursos que una aplicación necesita, en el namespace donde se ejecuta, y prefiere RoleBindings sobre ClusterRoleBindings. Recuerda que `get` o `list` sobre Secrets revela su contenido, y que `create` sobre Pods puede exponer indirectamente cualquier cosa que un Pod pueda montar, así que trata esos permisos como sensibles."
  ],
  terms: [
   ["Role", "Conjunto de verbos permitidos sobre recursos, con namespace."],
   ["ClusterRole", "Conjunto de permisos sin namespace, utilizable en todo el clúster o vinculado por namespace."],
   ["RoleBinding", "Otorga un Role o ClusterRole a sujetos dentro de un namespace."],
   ["ClusterRoleBinding", "Otorga un ClusterRole a sujetos en todo el clúster."],
   ["kubectl auth can-i --as", "Verifica si un usuario o ServiceAccount puede realizar una acción, usando suplantación."]
  ],
  example: "Una ServiceAccount de CI solo debe desplegar en `staging`. Creas un Role que permite get, list, create, update y patch sobre deployments del grupo `apps`, lo vinculas con un RoleBinding en `staging` y luego confirmas con `kubectl auth can-i create deployments -n staging --as=system:serviceaccount:staging:ci` (yes) y la misma verificación con `-n prod` (no).",
  tip: "Los recursos core usan apiGroups [\"\"], y --serviceaccount recibe namespace:name. Un ClusterRole vinculado por un RoleBinding solo otorga acceso en el namespace de ese binding.",
  check: [
   ["¿Qué grupo de API pones en una regla de Role para Pods?", "El grupo core, escrito como una cadena vacía \"\"."],
   ["¿Qué acceso da un RoleBinding al ClusterRole `view`?", "Acceso de lectura a los recursos cubiertos solo en el namespace del RoleBinding."],
   ["¿Cómo verificas si la ServiceAccount `bot` del namespace `qa` puede eliminar Pods ahí?", "`kubectl auth can-i delete pods -n qa --as=system:serviceaccount:qa:bot`."]
  ]
 },
 {
  t: "Resource requests and limits for CPU and memory; units (m, Mi, Gi); QoS classes",
  tt: "Requests y limits de CPU y memoria; unidades (m, Mi, Gi); clases de QoS",
  body: [
   "Cada contenedor puede declarar cuánta CPU y memoria necesita y el máximo que puede usar. Estos números impulsan dos mecanismos distintos: el scheduling y la aplicación de límites. Configurarlos bien evita que tu app se quede sin recursos, que la maten o que desplace a sus vecinos.",
   "Un request (solicitud) es la cantidad reservada para el contenedor. El scheduler coloca un Pod solo en un nodo cuya capacidad no reservada cubra la suma de los requests de sus contenedores; si ningún nodo encaja, el Pod queda en Pending con un evento 'Insufficient cpu' o 'Insufficient memory'. Los requests no limitan el uso. Un limit es el máximo. Los dos recursos reaccionan distinto cuando un contenedor alcanza su límite: la CPU es comprimible, así que un contenedor en su límite de CPU se estrangula (throttling, se ralentiza) pero sigue ejecutándose; la memoria no lo es, así que un contenedor que supera su límite de memoria se mata y muestra OOMKilled.",
   "Las unidades importan. La CPU se mide en núcleos: `1` es un núcleo, `500m` (500 milicores) es medio núcleo y `0.1` equivale a `100m`. La memoria se mide en bytes con sufijos: `Mi` y `Gi` son unidades binarias (mebibytes y gibibytes, potencias de 1024), mientras que `M` y `G` son decimales (potencias de 1000). `128Mi` es un poco más que `128M`. Un error común es escribir `128m` para memoria, que significa 0.128 bytes; la `m` minúscula significa mili.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  resources:\n    requests:\n      cpu: 250m\n      memory: 128Mi\n    limits:\n      cpu: 500m\n      memory: 256Mi\n```",
   "Si defines un limit pero ningún request, Kubernetes pone el request igual al limit. También puedes definir recursos de forma imperativa: `kubectl set resources deploy/api -c api --requests=cpu=250m,memory=128Mi --limits=cpu=500m,memory=256Mi`. (`kubectl run` ya no tiene las opciones `--requests` ni `--limits`, así que agrega un bloque `resources` al YAML que genera).",
   "A partir de esta configuración, Kubernetes asigna a cada Pod una clase de Quality of Service (QoS), que se muestra en `kubectl describe pod` y en `.status.qosClass`. Guaranteed: todos los contenedores tienen requests y limits de CPU y memoria, y los requests son iguales a los limits. Burstable: al menos un contenedor tiene un request o limit de CPU o memoria, pero el Pod no cumple la regla de Guaranteed. BestEffort: ningún contenedor tiene requests ni limits. Cuando un nodo se queda corto de memoria, el kubelet desaloja (evicts) primero los Pods BestEffort, luego los Burstable que usan más que sus requests, y los Guaranteed al final.",
   "Compara el uso real con tu configuración usando `kubectl top pod --containers`. Requests muy por encima del uso real desperdician capacidad; limits cercanos al uso real arriesgan OOM kills y throttling."
  ],
  terms: [
   ["Request (solicitud)", "Recursos reservados para un contenedor, que el scheduler usa para decidir la ubicación."],
   ["Limit (límite)", "Recursos máximos que puede usar un contenedor; la CPU se estrangula y el exceso de memoria se mata."],
   ["Millicore (m) (milinúcleo)", "Una milésima de núcleo de CPU; 500m es medio núcleo."],
   ["Mi / Gi", "Unidades binarias de memoria basadas en potencias de 1024."],
   ["QoS class (clase de QoS)", "Guaranteed, Burstable o BestEffort, derivada de los requests y limits y usada para el orden de desalojo."]
  ],
  example: "Un Pod worker se reinicia una y otra vez con OOMKilled. `kubectl top pod --containers` muestra que se estabiliza en unos 300Mi mientras su límite es 256Mi. Subir el límite de memoria a 512Mi y el request a 320Mi detiene los kills, y el Pod sigue siendo Burstable.",
  tip: "Guaranteed necesita requests iguales a limits tanto para CPU como para memoria en todos los contenedores. CPU por encima del límite significa throttling; memoria por encima del límite significa OOMKilled.",
  check: [
   ["¿Qué pasa cuando un contenedor supera su límite de CPU, y su límite de memoria?", "CPU: se estrangula (throttling). Memoria: se mata (OOMKilled)."],
   ["El único contenedor de un Pod tiene requests cpu 100m y memory 64Mi sin limits. ¿Qué clase de QoS tiene?", "Burstable."],
   ["¿Cuánta CPU es 1500m?", "Un núcleo y medio."]
  ]
 },
 {
  t: "Namespace ResourceQuota and LimitRange defaults",
  tt: "ResourceQuota del namespace y valores por defecto de LimitRange",
  body: [
   "Los namespaces a menudo los comparten equipos o entornos, así que los administradores necesitan formas de evitar que un namespace consuma todo el clúster y de asegurar que cada Pod tenga una configuración de recursos razonable. ResourceQuota y LimitRange son las dos herramientas, y ambas se aplican mediante el control de admisión cuando se crean los objetos.",
   "Una ResourceQuota limita el consumo total de un namespace. Las cuotas de cómputo incluyen `requests.cpu`, `requests.memory`, `limits.cpu` y `limits.memory`, sumados sobre todos los Pods que no están en estado terminal. Las cuotas de conteo de objetos incluyen `pods`, `services`, `configmaps`, `secrets`, `persistentvolumeclaims` y la forma general `count/<resource>.<group>`, como `count/deployments.apps`. Las cuotas de almacenamiento cubren `requests.storage`. Cuando un objeto nuevo haría que el total superara la cuota, el API server lo rechaza con un error 'exceeded quota'.",
   "```yaml\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: compute\n  namespace: team-a\nspec:\n  hard:\n    requests.cpu: \"2\"\n    requests.memory: 4Gi\n    limits.cpu: \"4\"\n    limits.memory: 8Gi\n    pods: \"10\"\n```",
   "Hay un efecto secundario importante: en cuanto una cuota limita `requests.cpu` o `limits.memory` (u otros valores de cómputo), todo Pod nuevo en ese namespace debe especificar ese valor, o se rechaza con un mensaje como 'must specify limits.memory'. Con un Deployment no verás este error en el propio Deployment; el ReplicaSet no logra crear los Pods, y `kubectl describe rs` o `kubectl get events` muestran por qué. `kubectl describe quota -n team-a` muestra cada límite con sus valores Used y Hard actuales.",
   "Un LimitRange define valores por defecto y límites por objeto dentro de un namespace. Para `type: Container`, `defaultRequest` es el request que se aplica cuando un contenedor no especifica ninguno, `default` es el limit que se aplica cuando no especifica ninguno, y `min` y `max` acotan lo que un contenedor puede definir. `maxLimitRequestRatio` limita cuánto puede superar un limit a su request. Otros tipos se aplican a Pods completos o a PersistentVolumeClaims (acotando el tamaño del almacenamiento).",
   "```yaml\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: defaults\n  namespace: team-a\nspec:\n  limits:\n  - type: Container\n    defaultRequest:\n      cpu: 100m\n      memory: 128Mi\n    default:\n      cpu: 500m\n      memory: 256Mi\n    max:\n      cpu: \"1\"\n      memory: 1Gi\n```",
   "Los dos funcionan bien juntos: el LimitRange completa los valores faltantes mediante admisión mutating, así que los Pods que olvidan los recursos igual cumplen el requisito de la cuota. Los cambios en LimitRange y en la cuota solo se aplican a objetos creados después; los Pods existentes conservan sus valores hasta que se recrean. Crea cuotas de forma imperativa con `kubectl create quota compute -n team-a --hard=requests.cpu=2,pods=10`; los LimitRanges no tienen generador create, así que escribe YAML. Inspecciona con `kubectl describe limitrange -n team-a`."
  ],
  terms: [
   ["ResourceQuota", "Límite a nivel de namespace sobre el uso total de recursos y el número de objetos."],
   ["LimitRange", "Política del namespace que define recursos por defecto y mínimos/máximos por contenedor, Pod o PVC."],
   ["defaultRequest / default", "Campos de LimitRange que dan el request y el limit que se aplican cuando un contenedor los omite."],
   ["count/<resource>", "Clave de cuota que limita cuántos objetos de un tipo pueden existir en el namespace."]
  ],
  example: "Después de agregar una ResourceQuota sobre limits.memory en `team-a`, un Deployment deja de crear Pods. `kubectl describe rs` muestra 'must specify limits.memory'. Agregar un LimitRange con `default: memory: 256Mi` aporta el límite faltante, y los Pods nuevos se admiten y se contabilizan en la cuota.",
  tip: "Una cuota de cómputo obliga a cada Pod nuevo a declarar ese recurso; un default de LimitRange es la solución habitual. Los errores de cuota de los Deployments aparecen en el ReplicaSet, no en el Deployment.",
  check: [
   ["¿Dónde ves por qué no se crean los Pods de un Deployment bajo una cuota?", "En los eventos del ReplicaSet (`kubectl describe rs`) o en `kubectl get events`."],
   ["¿Qué campo de LimitRange define el limit para los contenedores que no especifican uno?", "`default`; `defaultRequest` define el request."],
   ["¿Cambiar un LimitRange actualiza los Pods existentes?", "No; solo se aplica a los Pods creados después del cambio."]
  ]
 },
 {
  t: "ConfigMaps: create from literals, files and env files; consume as env, envFrom and volumes",
  tt: "ConfigMaps: crear desde literales, archivos y archivos env; consumir como env, envFrom y volúmenes",
  body: [
   "Un ConfigMap almacena configuración no secreta como pares clave-valor, separada de la imagen del contenedor. Así, la misma imagen puede ejecutarse en desarrollo y en producción con configuraciones distintas, y cambias la configuración sin reconstruir. Los valores son texto plano; para contraseñas y claves usa un Secret.",
   "Hay tres formas imperativas de crear uno. `--from-literal=KEY=value` agrega un par por cada opción. `--from-file=path` agrega una clave con el nombre del archivo y su contenido como valor; `--from-file=mykey=path` elige el nombre de la clave, y apuntarlo a un directorio agrega una clave por archivo. `--from-env-file=path` lee un archivo de líneas `KEY=value` y convierte cada línea en su propia clave. La diferencia entre las dos últimas es una trampa favorita del examen: `--from-file=app.env` produce una sola clave `app.env` que contiene todo el archivo, mientras que `--from-env-file=app.env` produce una clave por línea.",
   "```bash\nkubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=MODE=prod\nkubectl create configmap nginx-conf --from-file=default.conf\nkubectl create configmap app-env --from-env-file=app.env\nkubectl get configmap app-config -o yaml\n```",
   "Los Pods consumen ConfigMaps de tres formas. Para definir una sola variable de entorno, usa `env` con `valueFrom.configMapKeyRef`, indicando el ConfigMap y la clave; el nombre de la variable puede ser distinto de la clave. Para importar todas las claves como variables, usa `envFrom` con `configMapRef`, opcionalmente con un `prefix`; las claves que no son nombres de variable válidos se omiten y se reportan en un evento (las versiones recientes de Kubernetes aceptan casi cualquier carácter imprimible en los nombres, así que ahora esto es raro). Para exponer las claves como archivos, monta un volumen `configMap`, donde cada clave se convierte en un archivo bajo la ruta de montaje.",
   "```yaml\ncontainers:\n- name: app\n  image: app:1.0\n  env:\n  - name: LEVEL\n    valueFrom:\n      configMapKeyRef:\n        name: app-config\n        key: LOG_LEVEL\n  envFrom:\n  - configMapRef:\n      name: app-env\n    prefix: CFG_\n  volumeMounts:\n  - name: conf\n    mountPath: /etc/nginx/conf.d\nvolumes:\n- name: conf\n  configMap:\n    name: nginx-conf\n```",
   "Las variables de entorno se leen solo cuando arranca el contenedor. Si cambias el ConfigMap, los contenedores en ejecución conservan los valores antiguos hasta que se reinician, por ejemplo con `kubectl rollout restart deploy/app`. Los archivos montados se actualizan automáticamente tras un breve retraso (excepto los montajes con subPath), pero la aplicación debe detectarlo y recargarlos.",
   "Un ConfigMap debe existir en el mismo namespace que el Pod. Si falta, el Pod no arranca y muestra CreateContainerConfigError (para env) o espera en ContainerCreating (para volúmenes). Marca una referencia como `optional: true` si el Pod debe arrancar sin ella. Definir `immutable: true` en un ConfigMap evita ediciones accidentales y reduce la carga sobre el API server; para cambiarlo, creas un ConfigMap nuevo."
  ],
  terms: [
   ["ConfigMap", "Un objeto que contiene configuración no secreta como pares clave-valor."],
   ["--from-env-file", "Crea una clave del ConfigMap por cada línea KEY=value de un archivo."],
   ["configMapKeyRef", "Define una variable de entorno a partir de una clave de un ConfigMap."],
   ["envFrom", "Importa todas las claves de un ConfigMap o Secret como variables de entorno."]
  ],
  example: "Un equipo guarda `LOG_LEVEL` y `FEATURE_X` en un ConfigMap cargado con envFrom. Para activar los logs de depuración en staging, editan el ConfigMap y ejecutan `kubectl rollout restart deploy/api`, porque las variables de entorno solo se leen al arrancar el contenedor.",
  tip: "--from-file=app.env crea una clave que contiene todo el archivo; --from-env-file=app.env crea una clave por línea. Y los valores de env no se actualizan hasta que el Pod se reinicia.",
  check: [
   ["¿Cómo defines la variable DB_HOST a partir de la clave `host` del ConfigMap `db`?", "Una entrada env llamada DB_HOST con valueFrom.configMapKeyRef, name db y key host."],
   ["Actualizaste un ConfigMap usado mediante envFrom. ¿Por qué los Pods siguen viendo los valores antiguos?", "Las variables de entorno se definen al arrancar el contenedor; hay que reiniciar los Pods."],
   ["¿Qué produce montar un ConfigMap como volumen?", "Un archivo por clave bajo la ruta de montaje, con el valor de la clave como contenido."]
  ]
 },
 {
  t: "Secrets: generic, docker-registry and tls types; base64 encoding vs encryption; secretKeyRef and volume mounts",
  tt: "Secrets: tipos generic, docker-registry y tls; codificación base64 vs cifrado; secretKeyRef y montaje como volumen",
  body: [
   "Un Secret contiene datos sensibles como contraseñas, tokens de API, claves TLS y credenciales de registry. Se usa de forma muy parecida a un ConfigMap, pero Kubernetes lo trata con más cuidado: se puede restringir por separado con RBAC, los kubelets solo reciben los Secrets de los Pods programados en su nodo, y los volúmenes de Secret se almacenan en memoria (tmpfs) en el nodo en lugar de en disco.",
   "kubectl crea tres tipos. `kubectl create secret generic` crea un Secret Opaque a partir de `--from-literal`, `--from-file` o `--from-env-file`, exactamente igual que para ConfigMaps. `kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...` crea un Secret `kubernetes.io/dockerconfigjson` que se usa en los `imagePullSecrets` de un Pod para descargar de un registry privado. `kubectl create secret tls web-tls --cert=tls.crt --key=tls.key` crea un Secret `kubernetes.io/tls` con las claves `tls.crt` y `tls.key`, que los Ingresses referencian para HTTPS.",
   "```bash\nkubectl create secret generic db-cred --from-literal=username=app --from-literal=password='S3cure!pw'\nkubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d\nkubectl create secret tls web-tls --cert=tls.crt --key=tls.key\n```",
   "El dato más importante de todos: los valores del campo `data` de un Secret están codificados en base64, no cifrados. Base64 es una codificación reversible que permite que los datos binarios viajen como texto; cualquiera que pueda leer el Secret puede decodificarlo con `base64 -d`. Al escribir YAML a mano, o codificas los valores tú mismo (`echo -n 'value' | base64`, donde `-n` evita codificar un salto de línea final) o pones texto plano en `stringData`, que el API server codifica por ti. La protección real viene de otras capas: RBAC que limita quién puede hacer get o list sobre Secrets, el cifrado en reposo (encryption at rest) configurado por el administrador del clúster para que etcd almacene los Secrets cifrados, y mantener los manifiestos de Secrets fuera del control de versiones.",
   "Los Pods usan los Secrets de las mismas tres formas que los ConfigMaps. `env` con `valueFrom.secretKeyRef` define una variable; `envFrom` con `secretRef` importa todas las claves; un volumen `secret` (fíjate en el campo `secretName`) monta cada clave como un archivo. En general se prefieren los archivos antes que las variables de entorno para valores sensibles, porque las variables de entorno se filtran más fácilmente a través de logs, volcados de memoria o procesos hijos, y los archivos montados se actualizan cuando cambia el Secret.",
   "```yaml\nenv:\n- name: DB_PASSWORD\n  valueFrom:\n    secretKeyRef:\n      name: db-cred\n      key: password\nvolumeMounts:\n- name: tls\n  mountPath: /etc/tls\n  readOnly: true\n# a nivel de Pod\nvolumes:\n- name: tls\n  secret:\n    secretName: web-tls\n    defaultMode: 0400\nimagePullSecrets:\n- name: regcred\n```",
   "Un Secret o una clave faltante produce CreateContainerConfigError, visible en `kubectl describe pod`. Igual que los ConfigMaps, los Secrets tienen namespace y deben estar en el namespace del Pod."
  ],
  terms: [
   ["Opaque", "Tipo de Secret por defecto para datos arbitrarios del usuario, creado con kubectl create secret generic."],
   ["kubernetes.io/dockerconfigjson", "Tipo de Secret que contiene credenciales de registry, usado mediante imagePullSecrets."],
   ["kubernetes.io/tls", "Tipo de Secret que contiene tls.crt y tls.key para certificados."],
   ["Base64", "Codificación de texto reversible usada para los datos de un Secret; no aporta confidencialidad."],
   ["secretKeyRef", "Define una variable de entorno a partir de una clave de un Secret."]
  ],
  example: "A un desarrollador le piden leer la contraseña del Secret `db-cred` y guardarla en un archivo. `kubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d > /opt/pw.txt` la decodifica en un solo paso, lo que también muestra por qué importa el RBAC sobre los Secrets: cualquiera con permiso get puede hacer lo mismo.",
  tip: "Base64 es codificación, no cifrado. Conoce los tres tipos de create (generic, docker-registry, tls) y que los volúmenes de secret usan `secretName`.",
  check: [
   ["¿Los datos de un Secret están cifrados por defecto?", "No, en la API solo están codificados en base64; el cifrado en reposo lo debe configurar el administrador, y RBAC controla el acceso."],
   ["¿Qué claves contiene un Secret tls?", "`tls.crt` y `tls.key`."],
   ["¿Cómo usa un Pod un Secret docker-registry?", "Listándolo bajo `spec.imagePullSecrets` para que el kubelet pueda autenticarse ante el registry."]
  ]
 },
 {
  t: "ServiceAccounts: serviceAccountName, token projection, automountServiceAccountToken, kubectl create token",
  tt: "ServiceAccounts: serviceAccountName, proyección de tokens, automountServiceAccountToken, kubectl create token",
  body: [
   "Las personas se autentican ante el API server con sus propias credenciales; las aplicaciones que se ejecutan en Pods usan ServiceAccounts. Una ServiceAccount es un objeto con namespace que le da una identidad a un Pod, a la que RBAC puede otorgar permisos. Cada namespace tiene automáticamente una llamada `default`, y un Pod que no indica ninguna ServiceAccount se ejecuta con esa.",
   "Crea una cuenta dedicada con `kubectl create serviceaccount ci-bot -n dev` (forma corta `sa`) y asígnala en la plantilla del Pod con `spec.serviceAccountName: ci-bot`. El campo se define cuando se crea el Pod y no se puede cambiar en un Pod en ejecución; en un Deployment, cambia la plantilla y deja que haga el rollout, o usa `kubectl set serviceaccount deploy/app ci-bot`. La ServiceAccount debe existir en el namespace del Pod, o el Pod se rechaza en la admisión. En RBAC y en `kubectl auth can-i --as`, el nombre completo de la cuenta es `system:serviceaccount:dev:ci-bot`.",
   "Por defecto, el kubelet le da a cada Pod un token de su ServiceAccount mediante un volumen proyectado, montado en `/var/run/secrets/kubernetes.io/serviceaccount`. El directorio contiene `token` (un JSON Web Token firmado), `ca.crt` (para verificar el certificado del API server) y `namespace`. Las bibliotecas cliente encuentran estos archivos automáticamente. Los tokens actuales son tokens vinculados (bound tokens): llevan una audiencia, caducan tras un tiempo limitado, están ligados al Pod específico y el kubelet los renueva antes de que caduquen. Los clústeres antiguos creaban automáticamente tokens de larga duración guardados en Secrets; eso ya no ocurre, lo que reduce el daño que puede causar un token filtrado.",
   "La mayoría de las aplicaciones nunca hablan con la API de Kubernetes, y para ellas el token es un riesgo innecesario: si un atacante compromete el contenedor, puede usar el token con los permisos que tenga la cuenta. Desactiva el montaje con `automountServiceAccountToken: false`, ya sea en la ServiceAccount (afectando a todos los Pods que la usan) o en la spec del Pod. Si ambos están definidos, gana la configuración del Pod.",
   "```yaml\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: web\n  namespace: shop\nautomountServiceAccountToken: false\n---\n# extracto de la spec del Pod\nspec:\n  serviceAccountName: web\n  automountServiceAccountToken: false\n```",
   "Cuando una herramienta fuera del clúster necesita un token, solicita uno de corta duración: `kubectl create token ci-bot -n dev` imprime un token, y `--duration=1h` o `--audience=<aud>` lo ajustan. Puedes usarlo como bearer token para probar lo que puede hacer la cuenta. Si de verdad necesitas un token de larga duración, puedes crear un Secret de tipo `kubernetes.io/service-account-token` anotado con el nombre de la cuenta y el control plane lo completará, pero los tokens de corta duración son la opción por defecto más segura.",
   "También puedes proyectar en un Pod un token con una audiencia y caducidad personalizadas usando una fuente `serviceAccountToken` en un volumen proyectado, por ejemplo para autenticarte ante un servicio externo que confía en los tokens del clúster. Verifica la identidad con `kubectl get pod app -o jsonpath='{.spec.serviceAccountName}'` y `kubectl exec app -- ls /var/run/secrets/kubernetes.io/serviceaccount`."
  ],
  terms: [
   ["ServiceAccount", "Una identidad con namespace para los procesos que se ejecutan en Pods."],
   ["serviceAccountName", "Campo de la spec del Pod que elige con qué ServiceAccount se ejecuta el Pod."],
   ["Bound (projected) token (token vinculado o proyectado)", "Un token de corta duración, limitado a una audiencia, ligado a un Pod y renovado por el kubelet."],
   ["automountServiceAccountToken", "Configuración en una ServiceAccount o Pod que controla si se monta el token."],
   ["kubectl create token", "Comando que emite un token de corta duración para una ServiceAccount."]
  ],
  example: "Un Pod que lista ConfigMaps recibe errores 403. Se ejecuta como `default`, que no tiene permisos. El desarrollador crea la ServiceAccount `config-reader`, vincula un Role que permite get y list sobre configmaps, define `serviceAccountName: config-reader` en el Deployment y verifica con `kubectl auth can-i list configmaps --as=system:serviceaccount:app:config-reader -n app`.",
  tip: "El campo del Pod es `serviceAccountName` (el antiguo `serviceAccount` está obsoleto), la configuración de automount a nivel de Pod sobrescribe la de la ServiceAccount y no puedes cambiar la ServiceAccount de un Pod en ejecución.",
  check: [
   ["¿Qué ServiceAccount usa un Pod si no se especifica ninguna?", "La ServiceAccount `default` de su namespace."],
   ["¿Dónde se monta el token de la ServiceAccount en un contenedor?", "En /var/run/secrets/kubernetes.io/serviceaccount, como el archivo token junto a ca.crt y namespace."],
   ["¿Por qué poner automountServiceAccountToken en false?", "Las apps que no llaman a la API de Kubernetes no necesitan un token, y quitarlo limita lo que un atacante podría hacer tras comprometer el contenedor."]
  ]
 },
 {
  t: "SecurityContext at Pod and container level: runAsUser, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation",
  tt: "SecurityContext a nivel de Pod y de contenedor: runAsUser, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation",
  body: [
   "Los contenedores son procesos sobre un kernel Linux compartido, así que importa con cuántos privilegios se ejecutan. Si un atacante explota un bug de tu app, un contenedor que se ejecuta como root con un sistema de archivos escribible le da mucho más con qué trabajar que uno que se ejecuta como usuario sin privilegios con un sistema de archivos de solo lectura. El campo `securityContext` te permite definir estos privilegios de forma declarativa.",
   "Hay dos niveles. `spec.securityContext` en el Pod se aplica a todos los contenedores y además contiene configuraciones exclusivas del Pod. `spec.containers[].securityContext` se aplica a un contenedor y sobrescribe los valores a nivel de Pod cuando ambos definen el mismo campo. Algunos campos existen solo en un nivel, algo que al examen le gusta evaluar.",
   "`runAsUser` define el ID numérico de usuario (UID) con el que se ejecutan los procesos del contenedor, y `runAsGroup` el ID del grupo principal. `runAsNonRoot: true` le dice al kubelet que verifique que el contenedor no se ejecutará como UID 0; si el usuario de la imagen es root y ningún `runAsUser` lo sobrescribe, el contenedor se rechaza con un error como 'container has runAsNonRoot and image will run as root' (estado CreateContainerConfigError). Si la imagen especifica un usuario por nombre en lugar de por número, el kubelet no puede verificarlo y también lo rechaza, así que define un `runAsUser` numérico. Estos tres se pueden definir en cualquiera de los dos niveles.",
   "`fsGroup` es solo a nivel de Pod. Define un ID de grupo suplementario para todos los contenedores, y los volúmenes compatibles pasan a pertenecer a ese grupo al montarse, para que un proceso que no es root pueda escribir en ellos. Es la solución habitual cuando un contenedor no root recibe 'permission denied' en un PVC o emptyDir.",
   "`readOnlyRootFilesystem: true` (solo a nivel de contenedor) hace que el propio sistema de archivos del contenedor sea de solo lectura. El malware o un atacante no pueden modificar binarios ni dejar herramientas, y la app no puede escribir por accidente donde no debe. Las apps que necesitan espacio temporal reciben un emptyDir montado, por ejemplo, en `/tmp`. `allowPrivilegeEscalation: false` (solo a nivel de contenedor) impide que un proceso obtenga más privilegios que su padre, por ejemplo mediante binarios setuid; activa el flag no_new_privs de Linux.",
   "```yaml\nspec:\n  securityContext:\n    runAsUser: 1000\n    runAsGroup: 3000\n    fsGroup: 2000\n    runAsNonRoot: true\n  containers:\n  - name: app\n    image: app:1.0\n    securityContext:\n      readOnlyRootFilesystem: true\n      allowPrivilegeEscalation: false\n    volumeMounts:\n    - {name: tmp, mountPath: /tmp}\n  volumes:\n  - name: tmp\n    emptyDir: {}\n```",
   "Verifica dentro del contenedor: `kubectl exec app -- id` debería mostrar `uid=1000 gid=3000` con 2000 entre los grupos, y `kubectl exec app -- touch /test` debería fallar con 'Read-only file system'. Otros campos de contenedor que encontrarás son `privileged` (acceso total al host; evítalo), `capabilities` y `seccompProfile`, que se ven junto con Pod Security Admission."
  ],
  terms: [
   ["runAsUser", "UID numérico con el que se ejecutan los procesos del contenedor."],
   ["runAsNonRoot", "Hace que el kubelet se niegue a iniciar un contenedor que se ejecutaría como UID 0."],
   ["fsGroup", "Grupo suplementario a nivel de Pod aplicado a los contenedores y a la propiedad de los volúmenes compatibles."],
   ["readOnlyRootFilesystem", "Configuración a nivel de contenedor que hace de solo lectura el sistema de archivos raíz del contenedor."],
   ["allowPrivilegeEscalation", "Configuración a nivel de contenedor que, en false, impide que los procesos obtengan más privilegios que su padre."]
  ],
  example: "Una tarea pide un Pod que se ejecute como el usuario 1000, escriba solo en /data en un PVC y no pueda modificar su propio sistema de archivos. Defines runAsUser 1000 y fsGroup 1000 a nivel de Pod, readOnlyRootFilesystem true y allowPrivilegeEscalation false en el contenedor, y confirmas con `kubectl exec -- id` y un `touch /x` que falla.",
  tip: "fsGroup es solo a nivel de Pod; readOnlyRootFilesystem, allowPrivilegeEscalation, capabilities y privileged son solo a nivel de contenedor. Los valores del contenedor sobrescriben los del Pod.",
  check: [
   ["Un Pod define runAsUser 1000 y uno de sus contenedores define runAsUser 2000. ¿Qué UID usa ese contenedor?", "2000, porque la configuración a nivel de contenedor sobrescribe la del Pod."],
   ["¿Por qué un contenedor con runAsNonRoot: true falla con CreateContainerConfigError?", "Su imagen se ejecuta como root (o con un usuario no numérico) y ningún runAsUser numérico lo sobrescribe, así que el kubelet se niega a iniciarlo."],
   ["¿Dónde defines fsGroup?", "Solo en el securityContext a nivel de Pod."]
  ]
 },
 {
  t: "Linux capabilities (add/drop) and Pod Security Admission levels (privileged, baseline, restricted)",
  tt: "Capabilities de Linux (add/drop) y niveles de Pod Security Admission (privileged, baseline, restricted)",
  body: [
   "Tradicionalmente en Linux, root podía hacerlo todo y los demás usuarios casi nada. Las capabilities dividen el poder de root en privilegios más pequeños con nombre, como `NET_BIND_SERVICE` (enlazarse a puertos por debajo de 1024), `NET_ADMIN` (cambiar la configuración de red), `CHOWN` (cambiar el propietario de archivos) y `SYS_ADMIN` (un conjunto muy amplio de acciones administrativas). Los runtimes de contenedores dan a los contenedores un subconjunto de capabilities por defecto, y puedes ajustarlo por contenedor.",
   "En `securityContext.capabilities` (solo a nivel de contenedor) listas las capabilities que se agregan con `add` y se quitan con `drop`, escritas sin el prefijo `CAP_`. El patrón recomendado es quitarlas todas y volver a agregar solo las necesarias. Un servidor web que debe escuchar en el puerto 80 como usuario no root solo necesita `NET_BIND_SERVICE`. Evita `privileged: true`, que otorga todas las capabilities y acceso a los dispositivos del host, y ten mucho cuidado con capabilities amplias como `SYS_ADMIN`.",
   "```yaml\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  capabilities:\n    drop: [\"ALL\"]\n    add: [\"NET_BIND_SERVICE\"]\n  seccompProfile:\n    type: RuntimeDefault\n```",
   "Pod Security Admission (PSA) es el admission controller integrado que aplica los Pod Security Standards por namespace. Hay tres niveles. Privileged no tiene restricciones, para workloads de sistema de confianza. Baseline bloquea las escaladas de privilegios conocidas sin dejar de ser fácil de adoptar: sin contenedores privileged, sin namespaces del host (hostNetwork, hostPID, hostIPC), sin volúmenes hostPath y sin capabilities agregadas más allá de un conjunto similar al por defecto. Restricted sigue las buenas prácticas de hardening: todo lo de baseline más `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, capabilities con `ALL` quitadas (solo se puede agregar `NET_BIND_SERVICE`), un perfil seccomp `RuntimeDefault` o `Localhost`, y solo una lista limitada de tipos de volumen.",
   "Aplicas los niveles con etiquetas en el namespace, una por modo. `enforce` rechaza los Pods que incumplen. `audit` los permite pero registra la infracción en el log de auditoría. `warn` los permite pero devuelve una advertencia al usuario. Una etiqueta opcional `-version` fija el estándar a una versión de Kubernetes, o a `latest`.",
   "```bash\nkubectl label namespace shop \\\n  pod-security.kubernetes.io/enforce=baseline \\\n  pod-security.kubernetes.io/warn=restricted\n```",
   "La aplicación se hace sobre los Pods, no sobre los Deployments. Si la plantilla de Pod de un Deployment incumple un nivel en modo enforce, el Deployment se crea pero su ReplicaSet no puede crear Pods; el error, como 'violates PodSecurity \"restricted:latest\": allowPrivilegeEscalation != false', aparece en `kubectl describe rs` y en los eventos. Los modos warn y audit también revisan las plantillas de los workloads, así que recibes un aviso temprano al aplicar el Deployment. Etiquetar un namespace no elimina los Pods que ya se ejecutan; avisa de las infracciones existentes y bloquea las nuevas. La solución siempre está en el securityContext del Pod, y el mensaje de error lista cada campo que hay que corregir."
  ],
  terms: [
   ["Capability", "Una porción con nombre del privilegio de root, como NET_BIND_SERVICE, que se puede agregar a un contenedor o quitarle."],
   ["Pod Security Admission", "Admission controller integrado que aplica los Pod Security Standards mediante etiquetas en el namespace."],
   ["Baseline", "Nivel de Pod Security que bloquea escaladas de privilegios conocidas, como contenedores privileged y namespaces del host."],
   ["Restricted", "El nivel de Pod Security más estricto: exige no root, sin escalada de privilegios, capabilities quitadas y un perfil seccomp."],
   ["enforce / audit / warn", "Modos de PSA que rechazan, registran o advierten sobre los Pods que incumplen."]
  ],
  example: "El namespace `payments` tiene la etiqueta `pod-security.kubernetes.io/enforce=restricted`. Un Deployment nuevo muestra 0 Pods listos; `kubectl describe rs` lista que faltan las configuraciones runAsNonRoot, allowPrivilegeEscalation y seccompProfile. Agregarlas junto con `capabilities: drop: [\"ALL\"]` permite que el ReplicaSet cree los Pods.",
  tip: "Las capabilities son solo a nivel de contenedor y se escriben sin CAP_. Los errores de PSA de los Deployments aparecen en el ReplicaSet, y restricted exige drop ALL, runAsNonRoot, allowPrivilegeEscalation false y un perfil seccomp RuntimeDefault o Localhost.",
  check: [
   ["¿Qué capability permite a un proceso no root enlazarse al puerto 80?", "NET_BIND_SERVICE."],
   ["¿Qué etiqueta hace que un namespace rechace los Pods que no cumplen el nivel baseline?", "`pod-security.kubernetes.io/enforce=baseline`."],
   ["¿Cuál es la diferencia entre los modos warn y enforce de PSA?", "Warn admite los Pods que incumplen pero devuelve una advertencia; enforce los rechaza."]
  ]
 },
 {
  t: "Service types: ClusterIP, NodePort, LoadBalancer, ExternalName and headless (clusterIP: None)",
  tt: "Tipos de Service: ClusterIP, NodePort, LoadBalancer, ExternalName y headless (clusterIP: None)",
  body: [
   "Los Pods van y vienen y sus direcciones IP cambian. Un Service ofrece un nombre estable y una IP virtual delante de un conjunto cambiante de Pods, elegidos mediante un selector de etiquetas, y reparte las conexiones entre ellos. El `type` del Service decide quién puede alcanzarlo.",
   "ClusterIP es el tipo por defecto. El Service recibe una IP virtual alcanzable solo desde dentro del clúster, más un nombre DNS. kube-proxy (o el plugin de red) en cada nodo programa reglas para que el tráfico a esa IP y puerto se reenvíe a uno de los Pods listos. Úsalo para back ends internos: bases de datos, APIs internas, cualquier cosa a la que llamen otros Pods.",
   "NodePort se basa en ClusterIP y además abre el mismo puerto en todos los nodos, elegido por defecto del rango 30000 a 32767. El tráfico a la IP de cualquier nodo en ese puerto llega al Service, aunque en ese nodo no se ejecute ningún Pod que coincida. Es sencillo para laboratorios y pruebas, por ejemplo `curl <node-ip>:30080`, pero expone a los clientes un puerto poco habitual y la dirección de un nodo.",
   "LoadBalancer se basa en NodePort y le pide al proveedor de nube, o a un complemento en clústeres bare-metal, que cree un balanceador de carga externo que reenvíe al Service. Su dirección aparece en la columna EXTERNAL-IP. En un clúster local sin esa integración, la columna se queda en `<pending>`; minikube ofrece `minikube tunnel` para completarla. Cada Service LoadBalancer suele implicar un balanceador de carga de nube independiente, por eso las apps HTTP a menudo se exponen a través de un único Ingress.",
   "ExternalName no tiene selector ni Pods. Asigna un nombre de Service a un nombre DNS externo devolviendo un registro CNAME: `externalName: db.example.com` hace que `db.<namespace>.svc.cluster.local` resuelva a ese host. Permite que el código dentro del clúster use un nombre interno estable mientras el destino real vive en otro lugar. No hay proxy ni mapeo de puertos.",
   "Un Service headless define `clusterIP: None`. No hay IP virtual ni balanceo de carga por parte de kube-proxy; en su lugar, el DNS devuelve las direcciones IP de los Pods listos individuales, y los clientes eligen. Los StatefulSets usan Services headless para que cada Pod tenga su propio nombre DNS, como `db-0.db.prod.svc.cluster.local`.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  type: NodePort\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n```",
   "`kubectl get svc` muestra TYPE, CLUSTER-IP, EXTERNAL-IP y PORT(S), donde un NodePort aparece como `80:30080/TCP`. El tipo de un Service existente se puede cambiar con `kubectl edit` o `kubectl patch svc web -p '{\"spec\":{\"type\":\"NodePort\"}}'`."
  ],
  terms: [
   ["ClusterIP", "Tipo de Service por defecto, con una IP virtual interna alcanzable solo dentro del clúster."],
   ["NodePort", "Tipo de Service que además abre un puerto (rango por defecto 30000-32767) en todos los nodos."],
   ["LoadBalancer", "Tipo de Service que aprovisiona un balanceador de carga externo a través del proveedor de nube o un complemento."],
   ["ExternalName", "Tipo de Service que devuelve un CNAME de DNS hacia un host externo, sin hacer de proxy."],
   ["Headless Service (Service headless)", "Service con clusterIP: None cuyo DNS devuelve las IPs individuales de los Pods."]
  ],
  example: "Una app usa un Service ClusterIP `orders` para su API interna, un Service LoadBalancer para su gateway público, un Service ExternalName `payments` que apunta al hostname de un socio para que el código pueda llamar a `payments` como a cualquier otro Service, y un Service headless para su base de datos StatefulSet de tres nodos.",
  tip: "Cada tipo se basa en el anterior: LoadBalancer incluye un NodePort, que incluye un ClusterIP. ExternalName y headless son los diferentes: sin proxy y sin IP virtual.",
  check: [
   ["¿Cuál es el tipo de Service por defecto?", "ClusterIP."],
   ["Un Service LoadBalancer en un clúster local de kind muestra EXTERNAL-IP <pending>. ¿Por qué?", "No hay proveedor de nube ni complemento de balanceador de carga que aprovisione una dirección externa."],
   ["¿Qué devuelve el DNS para un Service headless?", "Las direcciones IP de los Pods listos individuales en lugar de una sola IP virtual."]
  ]
 },
 {
  t: "Selectors, port vs targetPort vs nodePort, named ports",
  tt: "Selectores, port vs targetPort vs nodePort y puertos con nombre",
  body: [
   "Dos cosas deciden si un Service funciona: su selector debe coincidir con los Pods correctos, y sus números de puerto deben corresponder con el lugar donde la aplicación realmente escucha. La mayoría de los bugs de Services en el examen son una cosa o la otra.",
   "El `selector` es un conjunto de etiquetas. El Service apunta a todos los Pods de su namespace cuyas etiquetas incluyan todos esos pares clave-valor. Coincide con las etiquetas de los Pods, no con las del Deployment, así que revisa la plantilla del Pod. El selector es un mapa simple de igualdad; la sintaxis más rica `matchLabels`/`matchExpressions` que usan los Deployments no está disponible para los Services. Compara ambos con `kubectl describe svc web | grep Selector` y `kubectl get pods --show-labels`.",
   "Cada entrada de `ports` tiene hasta tres números. `port` es el puerto en el que escucha el propio Service, en su ClusterIP y nombre DNS; los clientes se conectan a `web:80`. `targetPort` es el puerto de los Pods al que se reenvía el tráfico, donde el contenedor realmente escucha. Si omites targetPort, toma por defecto el mismo valor que port. `nodePort` se aplica solo a Services NodePort y LoadBalancer y es el puerto que se abre en todos los nodos; si lo omites, se asigna uno del rango de puertos de nodo.",
   "```text\ncliente -> <node-ip>:30080 (nodePort)\n        -> <service-ip>:80   (port)\n        -> <pod-ip>:8080     (targetPort, el containerPort)\n```",
   "Los contenedores pueden ponerle nombre a sus puertos: `ports: - name: http, containerPort: 8080`. Así, un Service puede usar `targetPort: http` en lugar de un número. Esto desacopla el Service del número: si una nueva versión escucha en 9090 con el mismo nombre, el Service sigue funcionando sin cambios, e incluso distintos Pods detrás de un mismo Service pueden usar números diferentes. Ten en cuenta que `containerPort` en sí es mayormente informativo: un contenedor que escucha en un puerto que no declaró igual recibe tráfico, pero un targetPort con nombre solo se resuelve si el nombre está declarado.",
   "```yaml\n# Plantilla del Pod\ncontainers:\n- name: app\n  image: app:1.0\n  ports:\n  - name: http\n    containerPort: 8080\n---\n# Service\nspec:\n  selector:\n    app: web\n  ports:\n  - name: web\n    protocol: TCP\n    port: 80\n    targetPort: http\n```",
   "Cuando un Service expone más de un puerto, cada entrada de puerto debe tener un `name`. `protocol` es TCP por defecto; también se admiten UDP y SCTP, por ejemplo UDP para DNS. Para diagnosticar, revisa primero los endpoints (si no hay ninguno, el selector o la readiness están mal), luego prueba el puerto de destino directamente en la IP de un Pod desde un Pod temporal (si falla, el targetPort o la dirección de escucha de la app están mal) y, por último, prueba a través del nombre del Service."
  ],
  terms: [
   ["port", "El puerto en el que escucha el Service, en su ClusterIP y nombre DNS."],
   ["targetPort", "El puerto del Pod al que se reenvía el tráfico; por defecto es igual a port y puede ser un puerto con nombre."],
   ["nodePort", "El puerto que se abre en todos los nodos para Services NodePort y LoadBalancer."],
   ["Named port (puerto con nombre)", "Un containerPort con nombre que un Service puede referenciar como su targetPort."]
  ],
  example: "Las solicitudes a `api:80` agotan el tiempo de espera aunque existen endpoints. Al revisar los Pods se ve que la app escucha en 3000, mientras que el Service tiene `targetPort: 80`. Cambiar targetPort a 3000, o nombrar el puerto del contenedor `http` y usar `targetPort: http`, lo resuelve.",
  tip: "port es lo que llaman los clientes, targetPort es donde escucha el Pod, nodePort está en los nodos. Endpoints presentes pero conexiones rechazadas apunta a targetPort; sin endpoints apunta al selector o a la readiness.",
  check: [
   ["Si se omite targetPort, ¿qué valor toma?", "El mismo valor que port."],
   ["¿Por qué usar un targetPort con nombre?", "El Service sigue el nombre del puerto del contenedor, así que el número de puerto del Pod puede cambiar sin editar el Service."],
   ["¿Un Service selecciona los Pods por las etiquetas del Deployment o por las de los Pods?", "Por las etiquetas de los Pods, tal como se definen en la plantilla del Pod."]
  ]
 },
 {
  t: "EndpointSlices and why an empty endpoint list means the selector or readiness is wrong",
  tt: "EndpointSlices y por qué una lista de endpoints vacía significa que el selector o la readiness están mal",
  body: [
   "Un Service es solo una descripción. La lista real de direcciones de Pods que tiene detrás se guarda en objetos separados llamados EndpointSlices, mantenidos por un controlador del control plane. kube-proxy y otros componentes de cada nodo observan las EndpointSlices para saber adónde reenviar el tráfico. Cuando un Service 'no funciona', mirar sus EndpointSlices es la forma más rápida de averiguar por qué.",
   "Para cada Service con selector, el controlador de EndpointSlices busca los Pods del mismo namespace cuyas etiquetas coinciden y registra la IP de cada Pod, el puerto de destino y condiciones como `ready`. Cada slice lleva la etiqueta `kubernetes.io/service-name=<service>`. Los Services grandes se reparten en varios slices, razón por la cual reemplazaron al antiguo objeto único Endpoints; todavía puedes ver Endpoints listados, pero las EndpointSlices son el mecanismo actual.",
   "```bash\nkubectl get endpointslices -l kubernetes.io/service-name=web\nkubectl describe endpointslice web-abc12\nkubectl describe svc web          # línea Endpoints:\nkubectl get pods -l app=web -o wide --show-labels\n```",
   "Solo los Pods listos reciben tráfico. Un Pod que coincide con el selector pero falla su readiness probe, o que todavía está arrancando, aparece con `ready: false` y no se le envía tráfico. Así que si el Service no muestra endpoints listos, solo hay dos familias de causas.",
   "Primera: el selector no coincide con nada. El selector del Service tiene un error tipográfico, usa otro valor de etiqueta (`app: Web` frente a `app: web`), incluye una etiqueta extra que los Pods no tienen, o los Pods están en otro namespace. Compara `kubectl describe svc web` con `kubectl get pods --show-labels`, y prueba el selector directamente: `kubectl get pods -l app=web`. Si eso no devuelve nada, el selector está mal o los Pods están mal etiquetados.",
   "Segunda: los Pods coinciden pero no están listos. `kubectl get pods` muestra `0/1` en READY; `kubectl describe pod` muestra fallos del readiness probe, o los Pods están fallando o en Pending. Corrige el probe o la aplicación, y los endpoints se completan automáticamente.",
   "Un Service sin selector nunca recibe endpoints automáticos; tú u otro controlador deben crear EndpointSlices a mano, que es la forma en que los Services pueden apuntar a bases de datos fuera del clúster. Los Services ExternalName no tienen endpoints en absoluto por diseño.",
   "Si existen endpoints y se ven bien pero las conexiones siguen fallando, el problema está en otro lugar: un targetPort incorrecto, la app escuchando solo en 127.0.0.1 en lugar de en todas las interfaces, o una NetworkPolicy que bloquea el tráfico. Por eso, la verificación de endpoints divide el problema a la mitad con un solo comando."
  ],
  terms: [
   ["EndpointSlice", "Un objeto que lista las direcciones, puertos y readiness de los Pods que respaldan un Service."],
   ["kubernetes.io/service-name", "Etiqueta que vincula una EndpointSlice con su Service."],
   ["Ready condition (condición ready)", "Indicador del endpoint que muestra si un Pod de backend debe recibir tráfico."]
  ],
  example: "Tras un cambio de etiquetas, `curl orders` desde un Pod de prueba se queda colgado. `kubectl describe svc orders` muestra `Endpoints: <none>`. Los Pods ahora llevan `app: order-svc` mientras que el Service todavía selecciona `app: orders`. Actualizar el selector del Service recupera tres endpoints y las solicitudes tienen éxito.",
  tip: "Endpoints vacíos significa una de dos cosas: ningún Pod coincide con el selector, o los Pods que coinciden no están listos. Revisa `kubectl get pods -l <selector>` y la columna READY.",
  check: [
   ["¿Cómo listas las EndpointSlices del Service `web`?", "`kubectl get endpointslices -l kubernetes.io/service-name=web`."],
   ["Los Pods coinciden con el selector pero el Service no tiene endpoints listos. ¿Qué es lo probable que esté mal?", "Los Pods no están listos: readiness probes que fallan, Pods que fallan o que todavía están arrancando."],
   ["Los endpoints se ven correctos pero las conexiones siguen fallando. Menciona una causa probable.", "Un targetPort incorrecto, la app escuchando solo en localhost o una NetworkPolicy que bloquea el tráfico."]
  ]
 },
 {
  t: "Cluster DNS names: <service>.<namespace>.svc.cluster.local",
  tt: "Nombres DNS del clúster: <service>.<namespace>.svc.cluster.local",
  body: [
   "Kubernetes ejecuta un servidor DNS del clúster, normalmente CoreDNS, como Pods en el namespace `kube-system` detrás de un Service que suele llamarse `kube-dns`. El kubelet configura el `/etc/resolv.conf` de cada Pod para usarlo. Como resultado, las aplicaciones encuentran los Services por nombre en lugar de por IP, y los nombres siguen funcionando cuando cambian los Pods e incluso las IPs de los Services.",
   "Cada Service recibe un nombre DNS de la forma `<service>.<namespace>.svc.<cluster-domain>`. El dominio del clúster es `cluster.local` por defecto, aunque los administradores pueden cambiarlo. Un Service `web` en el namespace `shop` es, por lo tanto, `web.shop.svc.cluster.local`, que resuelve a la ClusterIP del Service. Para un Service headless, el mismo nombre devuelve las IPs de sus Pods listos, y los Pods de un StatefulSet reciben nombres individuales como `db-0.db.shop.svc.cluster.local` (nombre del pod y luego el nombre del Service headless).",
   "Rara vez necesitas el nombre completo, gracias a los dominios de búsqueda. Un Pod en `shop` tiene un resolv.conf como este:",
   "```text\nnameserver 10.96.0.10\nsearch shop.svc.cluster.local svc.cluster.local cluster.local\noptions ndots:5\n```",
   "Cuando el Pod busca un nombre corto, el resolver prueba agregarle cada dominio de búsqueda por turno. Así, desde dentro de `shop`, el simple `web` se convierte en `web.shop.svc.cluster.local` y se resuelve. Desde un Pod en otro namespace, `web` solo buscaría en el propio namespace de ese Pod y fallaría, así que usas `web.shop` (que coincide gracias al dominio de búsqueda `svc.cluster.local`) o el nombre completo. Esta es la trampa de DNS más común: los nombres cortos solo funcionan dentro del mismo namespace.",
   "La opción `ndots:5` significa que un nombre con menos de cinco puntos se prueba primero con los dominios de búsqueda antes de probarse tal cual. Por eso un nombre externo como `api.example.com` genera algunas búsquedas internas fallidas antes de tener éxito; un punto final (`api.example.com.`) marca un nombre como totalmente calificado y se salta la lista de búsqueda.",
   "Los Services también reciben registros SRV para los puertos con nombre, con la forma `_<port-name>._<protocol>.<service>.<namespace>.svc.cluster.local`, que algunos clientes usan para descubrir números de puerto. Los propios Pods se pueden consultar mediante un nombre basado en su IP, como `10-244-1-5.shop.pod.cluster.local`, pero las aplicaciones normalmente usan nombres de Service.",
   "Prueba el DNS desde un Pod temporal: `kubectl run dns --image=busybox --rm -it --restart=Never -- nslookup web.shop`. Una respuesta 'can't resolve' significa que el nombre del Service o el namespace están mal (o que el propio DNS está roto; revisa `kubectl get pods -n kube-system -l k8s-app=kube-dns`). Una respuesta con IP pero una conexión fallida significa que el DNS está bien y el problema está en los endpoints, los puertos o una NetworkPolicy. Recuerda que las NetworkPolicies que restringen el egress deben permitir el tráfico DNS hacia los Pods de DNS del clúster, o fallará toda búsqueda de nombres."
  ],
  terms: [
   ["CoreDNS", "El servidor DNS que normalmente proporciona el DNS del clúster para Services y Pods."],
   ["Service FQDN (nombre completo del Service)", "El nombre de Service totalmente calificado <service>.<namespace>.svc.cluster.local."],
   ["Search domains (dominios de búsqueda)", "Sufijos en el resolv.conf de un Pod que permiten que nombres cortos como web se resuelvan dentro de su namespace."],
   ["ndots", "Opción del resolver que indica cuántos puntos necesita un nombre para probarse primero como absoluto."]
  ],
  example: "Un Pod de frontend en el namespace `web` llama al host `catalog` y recibe 'name not resolved'. El Service catalog vive en el namespace `inventory`. Cambiar la configuración a `catalog.inventory` (o `catalog.inventory.svc.cluster.local`) lo resuelve, lo que se confirma con `nslookup catalog.inventory` desde un Pod de busybox.",
  tip: "Un nombre corto de Service solo se resuelve desde el mismo namespace. Entre namespaces, usa al menos `<service>.<namespace>`.",
  check: [
   ["¿Cuál es el nombre DNS completo del Service `api` en el namespace `prod`?", "`api.prod.svc.cluster.local` (con el dominio de clúster por defecto)."],
   ["¿Por qué `api` no se resuelve desde un Pod en el namespace `dev`?", "Los dominios de búsqueda agregan primero el namespace de dev, así que busca api.dev.svc.cluster.local, que no existe."],
   ["¿Qué devuelve el DNS para el nombre de un Service headless?", "Las IPs de sus Pods listos en lugar de una ClusterIP."]
  ]
 },
 {
  t: "Kubectl expose, kubectl create service and kubectl port-forward",
  tt: "kubectl expose, kubectl create service y kubectl port-forward",
  body: [
   "Escribir YAML de Services a mano es lento y propenso a errores. kubectl ofrece dos generadores imperativos, y un tercer comando para llegar a los Pods sin ningún Service. Conocer sus diferencias ahorra tiempo y evita una trampa clásica con los selectores.",
   "`kubectl expose` crea un Service para un recurso existente y copia su selector por ti. `kubectl expose deployment web --port=80 --target-port=8080` crea un Service ClusterIP llamado `web` cuyo selector es el selector del Deployment. Agrega `--type=NodePort` o `--type=LoadBalancer`, `--name=web-svc` para elegir un nombre y `--protocol=UDP` si hace falta. Puedes exponer un Deployment, un ReplicaSet, un Pod u otro Service. Exponer un Pod requiere que tenga etiquetas, ya que se convierten en el selector; los Pods creados con `kubectl run` reciben automáticamente una etiqueta `run=<name>`. Si omites `--target-port`, toma por defecto el valor de `--port`; si omites `--port`, kubectl usa el puerto de contenedor declarado en el recurso.",
   "```bash\nkubectl expose deploy web --port=80 --target-port=8080 --type=NodePort --name=web-np\nkubectl expose pod db --port=5432\nkubectl run cache --image=redis --port=6379 --expose\nkubectl create service clusterip api --tcp=80:8080\nkubectl create service nodeport api --tcp=80:8080 --node-port=30080\nkubectl create service externalname partner --external-name=api.partner.example\n```",
   "`kubectl create service <type> <name>` construye un Service desde cero con los subcomandos `clusterip`, `nodeport`, `loadbalancer` o `externalname`. `--tcp=80:8080` significa port 80, targetPort 8080. La trampa: no puede leer las etiquetas de otro objeto, así que pone el selector en `app=<service-name>`. Eso solo funciona si tus Pods casualmente llevan esa etiqueta. Si están etiquetados de otra forma, el Service no tiene endpoints. Usa `expose`, o genera el YAML con `--dry-run=client -o yaml` y corrige el selector antes de aplicarlo. `kubectl create service clusterip headless --clusterip=\"None\"` crea un Service headless.",
   "`kubectl run cache --image=redis --port=6379 --expose` es un atajo que crea un Pod y un Service ClusterIP para él en un solo comando.",
   "`kubectl port-forward` no crea ningún objeto. Abre un túnel desde tu máquina, a través del API server, hasta un Pod. `kubectl port-forward svc/web 8080:80` escucha en el puerto local 8080 y reenvía al puerto 80 del Service, que kubectl traduce al targetPort de un único Pod elegido del Service. También puedes apuntar a `pod/<name>` o `deploy/<name>`. Escucha solo en localhost a menos que pases `--address 0.0.0.0`, y se ejecuta hasta que lo detienes. Úsalo para probar una app rápidamente, o para llegar a una base de datos desde herramientas locales, sin exponer nada a la red.",
   "Después de usar cualquiera de estos, verifica: `kubectl get svc web-np -o wide` muestra el selector; `kubectl get endpointslices -l kubernetes.io/service-name=web-np` muestra los endpoints; y un curl desde un Pod temporal o a través del port-forward confirma que la aplicación responde."
  ],
  terms: [
   ["kubectl expose", "Crea un Service para un recurso existente, copiando su selector."],
   ["kubectl create service", "Crea un Service de un tipo dado desde cero, con el selector app=<name>."],
   ["--tcp=port:targetPort", "Opción de create service que define el puerto del Service y el puerto de destino."],
   ["kubectl port-forward", "Túnel temporal desde un puerto local hasta un Pod; no crea ningún Service."]
  ],
  example: "Una tarea dice: expón el Deployment `shop` (etiquetas `tier=front`) en el NodePort 30100, puerto 80 hacia el puerto de contenedor 8000. `kubectl create service nodeport shop --tcp=80:8000 --node-port=30100` seleccionaría `app=shop` y no coincidiría con nada, así que usas `kubectl expose deploy shop --type=NodePort --port=80 --target-port=8000 --dry-run=client -o yaml`, agregas `nodePort: 30100` y aplicas.",
  tip: "`expose` copia el selector real; `create service` asume app=<name>. `expose` no tiene opción para un nodePort específico, así que genera el YAML y agrégalo.",
  check: [
   ["¿Qué selector define `kubectl create service clusterip api --tcp=80:8080`?", "`app=api`."],
   ["¿Cómo expones el Deployment `web` como Service NodePort en el puerto 80 reenviando a 8080?", "`kubectl expose deploy web --type=NodePort --port=80 --target-port=8080`."],
   ["¿Un port-forward a un Service balancea la carga entre todos los Pods?", "No, se conecta a un único Pod detrás del Service."]
  ]
 },
 {
  t: "NetworkPolicy basics: podSelector, policyTypes, ingress and egress rules, default deny",
  tt: "Fundamentos de NetworkPolicy: podSelector, policyTypes, reglas de ingress y egress, denegación por defecto",
  body: [
   "Por defecto, cada Pod de un clúster de Kubernetes puede hablar con cualquier otro Pod, en cualquier namespace. Eso facilita las cosas, pero significa que un solo Pod comprometido puede llegar a bases de datos y APIs internas que no tiene por qué tocar. Una NetworkPolicy es un objeto con namespace que restringe qué tráfico se permite hacia y desde los Pods seleccionados, y actúa como un firewall (cortafuegos) definido mediante etiquetas.",
   "`spec.podSelector` elige los Pods del namespace de la política a los que se aplica. Un selector vacío, `podSelector: {}`, selecciona todos los Pods del namespace. `policyTypes` lista `Ingress` (tráfico entrante), `Egress` (tráfico saliente) o ambos. Las reglas `ingress` listan los orígenes permitidos (`from`) y los puertos; las reglas `egress` listan los destinos permitidos (`to`) y los puertos.",
   "La idea clave es el aislamiento. Un Pod que no está seleccionado por ninguna política no está aislado y acepta todo. En cuanto una política con `Ingress` en policyTypes selecciona un Pod, ese Pod queda aislado para ingress, y solo entra el tráfico que permiten las reglas de ingress de alguna política. Egress funciona igual. Las políticas son aditivas: no hay reglas de denegación, y si varias políticas seleccionan el mismo Pod, el tráfico permitido es la unión de todas. Las respuestas a conexiones permitidas se autorizan automáticamente, así que no escribes reglas para el tráfico de retorno.",
   "Una política de denegación por defecto (default deny) selecciona todos los Pods y no permite nada. Con `policyTypes: [Ingress]` y sin reglas de ingress, se bloquea todo el tráfico entrante a los Pods del namespace. Agregar `Egress` bloquea también el tráfico saliente. Luego agregas encima políticas de permiso acotadas. Este es el punto de partida recomendado para un namespace que necesita protección.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\n  namespace: shop\nspec:\n  podSelector: {}\n  policyTypes: [\"Ingress\", \"Egress\"]\n---\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-from-frontend\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: [\"Ingress\"]\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - protocol: TCP\n      port: 8080\n```",
   "Presta atención a la diferencia entre una lista de reglas vacía y una regla que está vacía. `ingress: []` o la ausencia del campo ingress (con Ingress en policyTypes) no permite nada. `ingress: [{}]`, una sola regla sin `from` y sin `ports`, lo permite todo. Si omites `policyTypes`, siempre se asume Ingress, y Egress se agrega solo si la política tiene una sección egress.",
   "Los puertos de las reglas son los puertos del Pod (el targetPort), no el puerto del Service, porque las políticas actúan sobre el tráfico del Pod después de la traducción del Service. También puedes usar puertos con nombre. Prueba con Pods temporales que lleven las etiquetas correctas: `kubectl run t --image=busybox --rm -it --restart=Never -l app=frontend -n shop -- wget -qO- -T 2 api:8080`. Recuerda que una denegación por defecto de egress también bloquea el DNS, lo que se trata a continuación."
  ],
  terms: [
   ["NetworkPolicy", "Objeto con namespace que restringe el tráfico hacia y desde los Pods seleccionados."],
   ["podSelector", "Elige los Pods a los que se aplica una política; {} selecciona todos los Pods del namespace."],
   ["policyTypes", "Ingress, Egress o ambos: qué direcciones aísla la política."],
   ["Isolated Pod (Pod aislado)", "Un Pod seleccionado por una política para una dirección, que entonces solo permite el tráfico autorizado explícitamente."],
   ["Default deny (denegación por defecto)", "Una política que selecciona todos los Pods sin reglas de permiso, bloqueando todo el tráfico en las direcciones indicadas."]
  ],
  example: "Un equipo aplica una política de denegación por defecto de ingress a `shop`, luego una política de permiso que deja que los Pods con la etiqueta `app: frontend` lleguen a `app: api` en TCP 8080, y otra que deja que `app: api` llegue a `app: db` en 5432. Un Pod de prueba sin la etiqueta frontend ahora agota el tiempo de espera al llamar a la API.",
  tip: "Las políticas solo agregan permisos; lo que aísla es estar seleccionado. `podSelector: {}` significa todos los Pods, mientras que `ingress: [{}]` significa permitir todo, lo contrario de no tener reglas.",
  check: [
   ["¿Qué pasa con un Pod que ninguna NetworkPolicy selecciona?", "No está aislado y acepta todo el tráfico."],
   ["Escribe la spec de una denegación por defecto de todo el ingress en un namespace.", "`podSelector: {}` con `policyTypes: [Ingress]` y sin reglas de ingress."],
   ["Dos políticas seleccionan el mismo Pod, cada una permitiendo un origen distinto. ¿Qué se permite?", "Ambos orígenes; las políticas son aditivas y sus permisos se combinan."]
  ]
 },
 {
  t: "NetworkPolicy peers: podSelector, namespaceSelector, ipBlock; AND vs OR rule semantics; allowing DNS on egress",
  tt: "Peers de NetworkPolicy: podSelector, namespaceSelector, ipBlock; semántica AND vs OR de las reglas; permitir DNS en egress",
  body: [
   "Dentro de una lista `from` (ingress) o `to` (egress), cada entrada es un peer que describe quién puede conectarse. Hay tres tipos, y la forma en que los combinas en YAML cambia el significado de forma radical.",
   "Un peer `podSelector` por sí solo coincide con los Pods que tienen esas etiquetas en el propio namespace de la política. Un peer `namespaceSelector` por sí solo coincide con todos los Pods de los namespaces cuyas etiquetas coinciden. Cada namespace lleva una etiqueta automática `kubernetes.io/metadata.name=<name>`, así que puedes seleccionar un namespace por su nombre sin agregar etiquetas. Un peer `ipBlock` coincide con rangos de IP en notación CIDR, con rangos `except` opcionales; está pensado para tráfico de fuera del clúster, ya que las IPs de los Pods cambian.",
   "Ahora la regla crítica. Los peers escritos como elementos separados de la lista (cada uno empezando con su propio guion) se combinan con OR: se permite el tráfico de cualquiera de ellos. Un `namespaceSelector` y un `podSelector` escritos en el mismo elemento de la lista (un guion, dos claves) se combinan con AND: el tráfico debe venir de Pods con esas etiquetas dentro de namespaces que coincidan.",
   "```yaml\n# AND: Pods con la etiqueta app=monitor en namespaces con la etiqueta team=ops\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n    podSelector:\n      matchLabels: {app: monitor}\n---\n# OR: cualquier Pod de namespaces team=ops, O Pods app=monitor de este namespace\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n  - podSelector:\n      matchLabels: {app: monitor}\n```",
   "La diferencia es un solo guion, y la versión OR suele ser mucho más permisiva de lo previsto. De forma similar, dentro de una regla, `from` y `ports` se combinan con AND (estos orígenes, en estos puertos), mientras que las reglas separadas de la lista `ingress` se combinan con OR.",
   "Las políticas de egress necesitan un cuidado especial con el DNS. Una vez que un Pod está aislado para egress, no puede llegar a los Pods de DNS del clúster a menos que lo permitas, así que falla toda búsqueda de un nombre de Service, y las aplicaciones reportan errores de 'resolución de nombres' que parecen no tener relación con la política. Permite los puertos UDP y TCP 53 hacia los Pods de DNS en `kube-system`:",
   "```yaml\negress:\n- to:\n  - namespaceSelector:\n      matchLabels:\n        kubernetes.io/metadata.name: kube-system\n    podSelector:\n      matchLabels:\n        k8s-app: kube-dns\n  ports:\n  - {protocol: UDP, port: 53}\n  - {protocol: TCP, port: 53}\n- to:\n  - podSelector:\n      matchLabels: {app: db}\n  ports:\n  - {protocol: TCP, port: 5432}\n```",
   "Una variante más simple y amplia permite el puerto 53 hacia cualquier destino omitiendo `to` en esa regla. Revisa las etiquetas reales de los Pods de DNS con `kubectl get pods -n kube-system --show-labels`; `k8s-app=kube-dns` es común pero no está garantizada. Prueba con `nslookup` y `wget` desde un Pod temporal que lleve las etiquetas de la política."
  ],
  terms: [
   ["namespaceSelector", "Peer que coincide con los Pods de los namespaces que tienen las etiquetas indicadas."],
   ["ipBlock", "Peer que coincide con un rango CIDR, con rangos except opcionales, normalmente para tráfico externo."],
   ["AND semantics (semántica AND)", "namespaceSelector y podSelector en el mismo elemento de peer deben coincidir ambos."],
   ["OR semantics (semántica OR)", "Elementos de peer separados o reglas separadas permiten tráfico cada uno de forma independiente."],
   ["kubernetes.io/metadata.name", "Etiqueta automática del namespace que contiene su nombre."]
  ],
  example: "Una política pensada para permitir que solo los Pods de Prometheus en `monitoring` hicieran scraping de una app usaba dos guiones, así que podían conectarse todos los Pods de `monitoring` y todos los Pods con la etiqueta `app: prometheus` del propio namespace de la app. Unir los selectores en un solo elemento con un único guion la restringió solo a los Pods de Prometheus en `monitoring`.",
  tip: "Un guion con ambos selectores significa AND; dos guiones significan OR. Después de agregar una política de egress, permite siempre el puerto 53 UDP y TCP para el DNS.",
  check: [
   ["¿Cómo seleccionas el namespace `payments` por su nombre en un namespaceSelector?", "matchLabels `kubernetes.io/metadata.name: payments`."],
   ["Una política de egress permite el tráfico hacia los Pods db, pero la app no puede conectarse a `db` por nombre. ¿Por qué?", "Las búsquedas DNS están bloqueadas; agrega una regla de egress que permita el puerto 53 UDP y TCP hacia los Pods de DNS del clúster."],
   ["Dentro de una regla de ingress, ¿cómo se combinan `from` y `ports`?", "Con AND: el tráfico debe venir de un origen listado y dirigirse a un puerto listado."]
  ]
 },
 {
  t: "NetworkPolicy needs a CNI plugin that enforces it (for example Calico or Cilium)",
  tt: "NetworkPolicy necesita un plugin CNI que la aplique (por ejemplo Calico o Cilium)",
  body: [
   "Kubernetes define la API de NetworkPolicy, pero no la aplica por sí mismo. El API server almacena sin problema cualquier política que crees. La aplicación es tarea del plugin de red del clúster, que implementa la Container Network Interface (CNI), la forma estándar en que Kubernetes le pide a un plugin que configure la red de los Pods. Si el plugin no admite NetworkPolicy, tus políticas existen pero no tienen efecto, y todo el tráfico sigue fluyendo.",
   "Plugins como Calico y Cilium aplican NetworkPolicy. Calico normalmente programa reglas en el filtrado de paquetes del kernel de Linux (iptables o nftables) o usa eBPF; Cilium usa programas eBPF enganchados en el kernel. Ambos observan los objetos NetworkPolicy y las etiquetas de los Pods a través del API server y actualizan las reglas de filtrado en cada nodo a medida que cambian los Pods y las políticas. Algunos plugins, en particular los simples centrados solo en la conectividad, como una configuración básica de Flannel, no aplican políticas por sí solos. Algunas herramientas locales arrancan con un plugin así por defecto, así que verifícalo antes de confiar en el resultado de una prueba.",
   "No hay ningún mensaje de error cuando las políticas no se aplican, y eso es lo que hace importante este tema. `kubectl apply` tiene éxito, `kubectl describe networkpolicy` muestra las reglas y, aun así, una conexión que querías bloquear sigue funcionando. La única prueba real es un test.",
   "```bash\n# ¿qué plugin de red se está ejecutando?\nkubectl get pods -n kube-system -o wide | grep -Ei 'calico|cilium|flannel|weave'\nkubectl get daemonset -n kube-system\n# prueba: aplica un default deny y luego intenta conectarte\nkubectl run t --image=busybox --rm -it --restart=Never -n shop -- wget -qO- -T 2 api:8080\n```",
   "Para clústeres de práctica, elige una configuración con un plugin que aplique las políticas. minikube puede arrancar con Calico usando `minikube start --cni=calico`, o con Cilium usando `--cni=cilium`. kind se puede crear con su plugin de red por defecto desactivado en la configuración del clúster e instalar Calico o Cilium después. El entorno del examen CKAD se proporciona con una configuración que funciona, así que ahí te concentras en escribir políticas correctas, pero en tu propio laboratorio un plugin que no aplica políticas puede hacerte creer que una política incorrecta es correcta, o que una correcta está mal.",
   "También ayuda entender las capas. NetworkPolicy forma parte de la API central de Kubernetes (`networking.k8s.io/v1`) y es portable entre plugins que la aplican. Calico y Cilium también ofrecen sus propios recursos personalizados con funciones adicionales, como reglas de denegación explícitas, políticas a nivel de clúster, orden de evaluación o reglas basadas en nombres DNS o protocolos de capa de aplicación. Esas son CRDs específicas de un plugin y no forman parte de los objetivos del CKAD; si una tarea dice NetworkPolicy, escribe el objeto estándar.",
   "Desde el punto de vista de la seguridad, NetworkPolicy es defensa en profundidad: limita hasta dónde puede moverse lateralmente un atacante tras comprometer un Pod, pero complementa, y no reemplaza, la autenticación y el cifrado entre servicios."
  ],
  terms: [
   ["CNI (Container Network Interface)", "La interfaz estándar que usa Kubernetes para que un plugin configure la red de los Pods."],
   ["Network plugin (plugin de red)", "La implementación CNI que proporciona la red de los Pods y, si lo admite, aplica NetworkPolicy."],
   ["Calico / Cilium", "Plugins de red muy usados que aplican NetworkPolicy."],
   ["eBPF", "Tecnología del kernel de Linux para ejecutar pequeños programas verificados, que algunos plugins usan para filtrar tráfico."]
  ],
  example: "Un desarrollador aplica una política default-deny en un clúster de práctica con una red Flannel básica y se queda perplejo cuando las solicitudes siguen teniendo éxito. Recrear el clúster con Calico como plugin de red hace que la misma política bloquee el tráfico como se esperaba.",
  tip: "Si una pregunta al estilo del examen pregunta por qué una NetworkPolicy correcta no tiene efecto, la respuesta es que el plugin CNI del clúster no aplica NetworkPolicy.",
  check: [
   ["¿El API server rechaza las NetworkPolicies cuando el plugin de red no puede aplicarlas?", "No; se almacenan normalmente pero no tienen efecto."],
   ["Menciona dos plugins que aplican NetworkPolicy.", "Calico y Cilium."],
   ["¿Cómo verificas que una política se aplica?", "Probando tráfico real, por ejemplo con wget desde un Pod temporal, antes y después de aplicar la política."]
  ]
 },
 {
  t: "Ingress resources: ingressClassName, host and path rules, pathType Prefix vs Exact, default backend, TLS secrets",
  tt: "Recursos Ingress: ingressClassName, reglas de host y path, pathType Prefix vs Exact, default backend y Secrets TLS",
  body: [
   "Un Ingress describe cómo debe llegar el tráfico HTTP y HTTPS de fuera del clúster a los Services de dentro, usando nombres de host y rutas de URL. Un solo Ingress, servido por un único punto de entrada externo, puede enrutar `shop.example.com/api` a un Service y `shop.example.com/` a otro. El objeto Ingress es solo un conjunto de reglas; un Ingress controller las lee y hace el enrutamiento real.",
   "`spec.ingressClassName` nombra la IngressClass, y por lo tanto el controlador, que debe manejar este Ingress. Si se omite, se usa la IngressClass por defecto del clúster si hay una marcada; de lo contrario, el Ingress puede ignorarse. Lista las clases con `kubectl get ingressclass`.",
   "`spec.rules` es una lista. Cada regla puede tener un `host`; sin él, se aplica a todos los hosts. Cada regla tiene `http.paths`, y cada path tiene un `path`, un `pathType` y un `backend` que nombra un Service y un puerto. El Service del backend debe estar en el mismo namespace que el Ingress.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts: [\"shop.example.com\"]\n    secretName: shop-tls\n  defaultBackend:\n    service:\n      name: fallback\n      port: {number: 80}\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service:\n            name: api\n            port: {number: 8080}\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port: {number: 80}\n```",
   "`pathType` decide cómo coinciden los paths. `Exact` coincide exactamente con la ruta de la URL y distingue mayúsculas de minúsculas: `/api` coincide solo con `/api`, no con `/api/` ni con `/api/v1`. `Prefix` coincide por elementos de la ruta separados por `/`: `/api` coincide con `/api`, `/api/` y `/api/v1`, pero no con `/apiv2`. `ImplementationSpecific` deja la coincidencia en manos del controlador. Cuando coinciden varios paths, gana el path coincidente más largo, y Exact tiene preferencia sobre Prefix para paths iguales.",
   "`spec.defaultBackend` maneja las solicitudes que no coinciden con ninguna regla. Sin él, el controlador devuelve su propia respuesta por defecto, normalmente un 404. Para servir HTTPS, lista los hosts bajo `spec.tls` con un `secretName` que apunte a un Secret `kubernetes.io/tls` del mismo namespace, creado con `kubectl create secret tls shop-tls --cert=tls.crt --key=tls.key`. El controlador termina el TLS con ese certificado y reenvía HTTP plano al Service, salvo que se configure de otra forma.",
   "Genera Ingresses rápidamente: `kubectl create ingress shop --class=nginx --rule=\"shop.example.com/api*=api:8080\" --rule=\"shop.example.com/*=web:80\" --default-backend=fallback:80`, agregando `,tls=shop-tls` a una regla para activar TLS en ese host. Un `*` final en el path significa Prefix; sin él, el path es Exact. Revisa el resultado con `kubectl describe ingress shop`, que lista cada regla, sus backends y sus endpoints."
  ],
  terms: [
   ["Ingress", "Un objeto que define reglas de enrutamiento HTTP(S) hacia Services basadas en host y path."],
   ["ingressClassName", "Campo que elige qué IngressClass (controlador) implementa el Ingress."],
   ["pathType Prefix", "Coincide con el path y con todo lo que está por debajo, elemento por elemento."],
   ["pathType Exact", "Coincide solo con la ruta de URL exacta."],
   ["defaultBackend", "Service que recibe las solicitudes que no coinciden con ninguna regla."]
  ],
  example: "Una tarea te pide enrutar `app.local/v1` exactamente al Service `v1-svc` y todo lo que esté bajo `app.local/` a `web`. Creas un Ingress con un path Exact `/v1` hacia v1-svc:80 y un path Prefix `/` hacia web:80, de modo que `/v1` va a v1-svc mientras que `/v1/users` cae en web.",
  tip: "Prefix coincide con segmentos completos de la ruta (`/api` no coincide con `/apiv2`); Exact coincide con una sola ruta. En `kubectl create ingress`, un `*` final significa Prefix.",
  check: [
   ["¿Un path Prefix `/foo` coincide con `/foo/bar`? ¿Y con `/foobar`?", "Coincide con `/foo/bar` pero no con `/foobar`, porque la coincidencia es por elemento de la ruta."],
   ["¿Qué referencia la sección tls de un Ingress?", "Los hosts que se sirven por HTTPS y un Secret kubernetes.io/tls, del mismo namespace, que contiene el certificado y la clave."],
   ["¿Qué maneja las solicitudes que no coinciden con ninguna regla del Ingress?", "El defaultBackend si está definido; si no, la respuesta por defecto del propio controlador (a menudo un 404)."]
  ]
 },
 {
  t: "Ingress controllers (for example ingress-nginx) and testing with curl and Host headers",
  tt: "Ingress controllers (por ejemplo ingress-nginx) y pruebas con curl y cabeceras Host",
  body: [
   "Un objeto Ingress no hace nada por sí solo. Un Ingress controller es el componente que observa los recursos Ingress a través de la API y configura un proxy inverso para enrutar el tráfico en consecuencia. Kubernetes no incluye un controlador en su núcleo; el clúster necesita tener uno instalado. Si no hay ninguno en ejecución, los Ingresses se aceptan pero no se enruta ningún tráfico, y la columna ADDRESS de `kubectl get ingress` se queda vacía.",
   "ingress-nginx ha sido durante mucho tiempo el ejemplo más usado, aunque el proyecto Kubernetes lo retiró en marzo de 2026 (sin más versiones ni correcciones de seguridad), así que los clústeres nuevos deberían elegir otro controlador; los conceptos y pasos de prueba siguientes son los mismos. Ejecuta el servidor web NGINX como Pods, normalmente en un namespace llamado `ingress-nginx`, y los expone a través de un Service, a menudo de tipo NodePort o LoadBalancer. Otros controladores incluyen Traefik, controladores basados en HAProxy, controladores de proveedores de nube y otros basados en Envoy. Cada controlador registra una IngressClass; el campo `spec.controller` de la clase identifica al controlador, y un Ingress elige una con `ingressClassName`. Una IngressClass puede marcarse como la predeterminada del clúster con la anotación `ingressclass.kubernetes.io/is-default-class: \"true\"`.",
   "En los laboratorios de práctica, minikube ofrece uno con `minikube addons enable ingress`, y en los clústeres de kind se puede instalar ingress-nginx a partir de los manifiestos de su proyecto con los mapeos de puertos correctos. Confirma que está en ejecución con `kubectl get pods -n ingress-nginx` y `kubectl get ingressclass`.",
   "Las pruebas se hacen sobre todo con curl. Como el enrutamiento depende del nombre de host, pero normalmente no tienes un registro DNS para un host de prueba, envías la solicitud a la dirección del controlador y defines tú mismo la cabecera HTTP `Host`. Primero encuentra el punto de entrada: la EXTERNAL-IP de un Service LoadBalancer, o la IP de un nodo más el NodePort del Service del controlador.",
   "```bash\nkubectl get svc -n ingress-nginx\nkubectl get ingress shop            # ADDRESS, HOSTS, PORTS\ncurl -H 'Host: shop.example.com' 192.168.49.2/api/health\ncurl -H 'Host: shop.example.com' 192.168.49.2:30080/\n```",
   "Para HTTPS, usa `curl -k --resolve shop.example.com:443:192.168.49.2` seguido de la URL HTTPS de shop.example.com. La opción `--resolve host:port:ip` le dice a curl que use una IP dada para un nombre de host, lo cual es mejor que una cabecera Host para HTTPS, porque además envía el nombre correcto en el handshake TLS (SNI, Server Name Indication), de modo que el controlador elige el certificado correcto. `-k` omite la verificación del certificado para certificados de prueba autofirmados; `-v` muestra las cabeceras y los detalles del certificado. Agregar el nombre a `/etc/hosts` en tu máquina es otra opción.",
   "Cómo leer los resultados: un 404 del controlador (a menudo una página con la marca de NGINX) significa que la solicitud llegó al controlador pero ninguna regla coincidió, normalmente por un host, path o pathType incorrecto, o porque el Ingress no usa la clase de este controlador. Un 503 o 502 significa que una regla coincidió pero el Service del backend no tiene endpoints listos o el puerto es incorrecto. Un timeout de conexión significa que ni siquiera estás llegando al controlador. `kubectl describe ingress` lista los backends y endpoints, y `kubectl logs -n ingress-nginx deploy/ingress-nginx-controller` muestra cada solicitud que manejó el controlador."
  ],
  terms: [
   ["Ingress controller", "El componente que observa los objetos Ingress y ejecuta el proxy que enruta el tráfico."],
   ["IngressClass", "Objeto que identifica un controlador, que los Ingresses seleccionan con ingressClassName."],
   ["Host header (cabecera Host)", "Cabecera HTTP que nombra el host solicitado, usada por las reglas de host del Ingress."],
   ["curl --resolve", "Hace que curl se conecte a una IP elegida para un nombre de host, manteniendo el nombre correcto para TLS."]
  ],
  example: "Después de crear un Ingress para `shop.local`, `curl 192.168.49.2` devuelve un 404. Repetirlo con `curl -H 'Host: shop.local' 192.168.49.2` devuelve la página de la tienda: el controlador estaba bien desde el principio, pero enruta por host y la primera solicitud llevaba la IP como host.",
  tip: "Un 404 del controlador significa que ninguna regla coincidió (host, path o clase); un 503 significa que la regla coincidió pero el Service no tiene endpoints listos. Define siempre la cabecera Host cuando pruebes por IP.",
  check: [
   ["Un Ingress no muestra ADDRESS y no se enruta nada. ¿Cuál es la causa más probable?", "No hay ningún Ingress controller en ejecución para su clase (o el Ingress nombra una clase que ningún controlador maneja)."],
   ["¿Por qué agregar una cabecera Host al hacer curl a la IP del controlador?", "Las reglas de Ingress coinciden por nombre de host, y al hacer curl a una IP se envía la IP como host, así que ninguna regla de host coincide."],
   ["Una solicitud a través del Ingress devuelve 503. ¿Dónde miras a continuación?", "En los endpoints y el targetPort del Service del backend; la regla coincidió pero no hay ningún backend listo disponible."]
  ]
 },
], { lang: "es" });
