/* Lessons for Certified Kubernetes Application Developer (CKAD (Kubernetes v1.35 curriculum)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ckad", [
 {
  "t": "Writing Dockerfiles: base images, layers, multi-stage builds, ENTRYPOINT vs CMD",
  "body": [
   "A container image is a packaged filesystem plus metadata that says how to start your application. A Dockerfile is the recipe for building it: a text file of instructions that the builder runs top to bottom. The CKAD exam expects you to read, fix and write short Dockerfiles, so you need to know what each common instruction does and how the result is stored.",
   "Every Dockerfile starts from a base image with `FROM`, for example `FROM python:3.12-slim` or `FROM alpine`. The base supplies the operating system files and often a language runtime. Smaller bases such as slim, alpine or distroless images mean faster pulls and fewer packages that could contain vulnerabilities. After `FROM` you typically use `WORKDIR` to set the working directory, `COPY` to bring in source files, `RUN` to execute build commands such as installing dependencies, `ENV` to set environment variables, `EXPOSE` to document a listening port and `USER` to switch away from root.",
   "Instructions that change the filesystem (mainly `RUN`, `COPY` and `ADD`) each create a new read-only layer. Layers are cached: if an instruction and everything before it are unchanged, the builder reuses the cached layer instead of running it again. That is why you copy the dependency manifest (such as `requirements.txt` or `package.json`) and install dependencies before copying the rest of your source code. Editing a source file then only invalidates the later layers, and rebuilds are fast. Deleting a file in a later layer does not shrink the image, because the earlier layer still contains it.",
   "A multi-stage build uses more than one `FROM` in the same file. The first stage has compilers and build tools; the final stage starts from a small runtime image and copies only the finished artifact with `COPY --from=build`. Build tools never reach the image you ship, which makes it smaller and reduces its attack surface.",
   "```dockerfile\nFROM golang:1.22 AS build\nWORKDIR /src\nCOPY go.mod ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app\n\nFROM alpine\nCOPY --from=build /app /app\nUSER 1000\nENTRYPOINT [\"/app\"]\nCMD [\"--port\", \"8080\"]\n```",
   "`ENTRYPOINT` and `CMD` together define the start command. `ENTRYPOINT` is the executable that always runs; `CMD` supplies default arguments that are easy to override. When both are present, the container runs ENTRYPOINT followed by CMD, so the example above runs `/app --port 8080`. If you run the image with extra arguments, they replace CMD but keep ENTRYPOINT. If only CMD is set, it is the whole command and any arguments you pass replace it entirely.",
   "Prefer the exec form, a JSON array like `[\"/app\"]`, over the shell form `ENTRYPOINT /app`. The exec form runs your program directly as process 1, so it receives signals such as SIGTERM when Kubernetes stops the Pod. The shell form wraps it in `/bin/sh -c`, and the shell may not forward signals, leading to slow, forced shutdowns."
  ],
  "terms": [
   [
    "Base image",
    "The image named in FROM that supplies the starting filesystem and runtime for your build."
   ],
   [
    "Layer",
    "A cached, read-only filesystem change produced by an instruction such as RUN or COPY."
   ],
   [
    "Multi-stage build",
    "A Dockerfile with several FROM stages where only selected artifacts are copied into the final image."
   ],
   [
    "ENTRYPOINT",
    "The fixed executable the container runs at start."
   ],
   [
    "CMD",
    "Default arguments (or a default command if there is no ENTRYPOINT) that are replaced by arguments given at run time."
   ]
  ],
  "example": "A team's Python image took four minutes to rebuild after every code change. They moved `COPY requirements.txt .` and `RUN pip install -r requirements.txt` above `COPY . .`, so the dependency layer stayed cached, and rebuilds dropped to seconds. Switching to a multi-stage build also cut the final image size by more than half.",
  "tip": "Remember the combination rule: ENTRYPOINT plus CMD run together, run-time arguments replace only CMD. Questions often ask what command a container actually runs.",
  "check": [
   [
    "Why should you copy the dependency file and install packages before copying the rest of the source?",
    "Because layers are cached in order; code changes then invalidate only the later layers, so the slow dependency install is reused from cache."
   ],
   [
    "An image has ENTRYPOINT [\"ping\"] and CMD [\"localhost\"]. What runs if you start it with the argument example.com?",
    "`ping example.com`, because run-time arguments replace CMD while ENTRYPOINT stays."
   ],
   [
    "What does a multi-stage build achieve?",
    "It keeps build tools and intermediate files out of the final image, making it smaller and reducing attack surface."
   ]
  ]
 },
 {
  "t": "Building, tagging, saving and loading images with docker or podman (build, tag, save, load)",
  "body": [
   "Once you have a Dockerfile, you turn it into an image with a container engine. Docker and Podman accept almost identical commands, so on the exam you can usually type the same thing with either tool. Podman runs without a central daemon and can run rootless, but for building, tagging and moving images the workflow is the same.",
   "`docker build -t myapp:1.0 .` builds an image. The `-t` flag gives it a name and tag, and the final `.` is the build context: the directory whose files are sent to the builder and can be referenced by `COPY`. If the Dockerfile has another name or location, point to it with `-f path/to/Dockerfile`. A `.dockerignore` file in the context keeps large or secret files, such as `.git` or local credentials, out of the build.",
   "An image reference has the form `registry/repository:tag`, for example `registry.example.com/team/myapp:1.0`. If you omit the registry, Docker Hub is assumed; if you omit the tag, `latest` is assumed. A tag is just a movable label pointing to an image; the immutable identity is the content digest, written `myapp@sha256:...`. `docker tag myapp:1.0 registry.example.com/team/myapp:1.0` adds a second name to the same image without copying anything, which you do before `docker push` to a registry.",
   "Sometimes there is no registry, for example on an air-gapped host or in an exam task that asks you to export an image. `docker save -o myapp.tar myapp:1.0` writes the image, with all its layers and tags, to a tar archive. `docker load -i myapp.tar` imports it on another machine. Podman supports the same `save` and `load` commands, and can also save in OCI (Open Container Initiative) format with `--format oci-archive`. Do not confuse these with `docker export` and `docker import`, which work on a container's flattened filesystem and lose the image history and metadata such as CMD.",
   "```bash\ndocker build -t myapp:1.0 .\ndocker tag myapp:1.0 myapp:latest\ndocker images | grep myapp\ndocker save -o /tmp/myapp.tar myapp:1.0\ndocker load -i /tmp/myapp.tar\n```",
   "In a local cluster, nodes do not see the images on your workstation. With kind you run `kind load docker-image myapp:1.0`; with minikube you can use `minikube image load myapp:1.0`. In the Pod spec, set `imagePullPolicy: IfNotPresent` or `Never` so the kubelet uses the loaded image instead of trying to pull it. Note that for an image tagged `latest` (or with no tag), the default pull policy is `Always`, which will fail if the image exists only locally.",
   "Useful inspection commands are `docker images` (or `podman images`) to list images, `docker image inspect` to see the configured ENTRYPOINT, CMD, environment and exposed ports, and `docker history` to see the layers and their sizes."
  ],
  "terms": [
   [
    "Build context",
    "The directory sent to the builder whose files COPY and ADD can reach."
   ],
   [
    "Tag",
    "A human-readable, movable label such as 1.0 that points to an image."
   ],
   [
    "Digest",
    "The immutable sha256 content hash that uniquely identifies an image."
   ],
   [
    "docker save / load",
    "Commands that export images with all layers and metadata to a tar archive and import them again."
   ]
  ],
  "example": "An exam-style task says: build the image from /opt/app with the name webapp and tag v2, then save it to /opt/webapp-v2.tar. You run `podman build -t webapp:v2 /opt/app` followed by `podman save -o /opt/webapp-v2.tar webapp:v2`, then verify with `ls -lh /opt/webapp-v2.tar`.",
  "tip": "Tasks that ask for an image archive want `save` (image with layers and metadata), not `export` (a container's flat filesystem). Also read the exact tag and output path the task asks for.",
  "check": [
   [
    "What does the trailing dot in `docker build -t app:1 .` mean?",
    "It sets the build context to the current directory, which is sent to the builder and is what COPY can read from."
   ],
   [
    "You loaded an image called app:latest into kind but the Pod shows ErrImagePull. Why?",
    "For a latest tag the default imagePullPolicy is Always, so the kubelet tries a registry; set imagePullPolicy to IfNotPresent or Never, or use a specific tag."
   ],
   [
    "Does `docker tag` copy the image?",
    "No, it only adds another name pointing to the same image content."
   ]
  ]
 },
 {
  "t": "How Pod `command` and `args` override the image ENTRYPOINT and CMD",
  "body": [
   "Kubernetes lets you change how a container starts without rebuilding its image. In a container spec, the `command` field overrides the image's ENTRYPOINT and the `args` field overrides the image's CMD. The naming is confusing because Docker's CMD is Kubernetes' args, so it is worth memorising the mapping: command = ENTRYPOINT, args = CMD.",
   "There are four combinations. If you set neither, the image's ENTRYPOINT and CMD run as built. If you set only `args`, the image's ENTRYPOINT runs with your args instead of the image CMD. If you set only `command`, your command runs and the image's CMD is ignored completely (it is not appended). If you set both, your command runs with your args and the image defaults are ignored.",
   "Both fields are arrays of strings, and Kubernetes does not run them through a shell. That means `command: [\"echo $HOME\"]` does not work the way it would in a terminal: there is no shell to split words or expand variables. When you need shell features such as pipes, `&&`, loops or redirection, call a shell explicitly.",
   "```yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: looper\nspec:\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\"]\n    args: [\"while true; do date; sleep 5; done\"]\n```",
   "Kubernetes does expand its own variable syntax `$(VAR_NAME)` inside command and args, using environment variables defined in the container's `env` list. So `args: [\"--port=$(PORT)\"]` works if `PORT` is set in `env`. If the variable does not exist, the text is left as written. This expansion is done by Kubernetes, not a shell.",
   "The fastest way to produce this YAML on the exam is imperative generation. `kubectl run looper --image=busybox --dry-run=client -o yaml -- sh -c 'while true; do date; sleep 5; done'` puts everything after `--` into `args`. Adding `--command` changes that: `kubectl run t --image=busybox --command -- sleep 3600` puts the words into `command` instead. Check the generated YAML before you apply it.",
   "When debugging, `kubectl describe pod` shows the effective Command and Args for each container, and `kubectl get pod <name> -o yaml` shows exactly what you wrote. A container that exits immediately with a Completed or CrashLoopBackOff status is often a sign that the override replaced a long-running server command with something that finishes, or that a shell string was passed without `sh -c`."
  ],
  "terms": [
   [
    "command",
    "Container field that replaces the image ENTRYPOINT."
   ],
   [
    "args",
    "Container field that replaces the image CMD."
   ],
   [
    "$(VAR) expansion",
    "Kubernetes substitution of container environment variables inside command and args, done without a shell."
   ]
  ],
  "example": "An image's ENTRYPOINT is `nginx` with CMD `-g daemon off;`. A task asks you to start it in debug mode. Setting only `args: [\"-g\", \"daemon off;\", \"-e\", \"stderr\"]` keeps the nginx entrypoint and replaces just the default arguments, with no need to rebuild the image.",
  "tip": "Setting only `command` discards the image CMD rather than appending it. And `--command` on kubectl run decides whether the words after `--` land in command or args.",
  "check": [
   [
    "Which Kubernetes field overrides a Dockerfile CMD?",
    "`args`. The `command` field overrides ENTRYPOINT."
   ],
   [
    "Why does `command: [\"echo hello && sleep 10\"]` fail?",
    "Kubernetes runs it without a shell, so it looks for a program literally named with that whole string; use `[\"sh\", \"-c\", \"echo hello && sleep 10\"]`."
   ],
   [
    "What does `kubectl run p --image=busybox -- sleep 60` set?",
    "It sets `args: [sleep, 60]`. The busybox image has no ENTRYPOINT, so those args become the whole command that runs."
   ]
  ]
 },
 {
  "t": "Choosing a workload: Deployment, StatefulSet, DaemonSet, Job, CronJob, bare Pod",
  "body": [
   "A Pod is the smallest deployable unit in Kubernetes: one or more containers that share a network namespace and can share volumes. You rarely create Pods directly in production, because a bare Pod is not replaced if it is deleted or its node fails. Instead you create a workload controller, which holds a Pod template and continually works to make reality match what you asked for. Choosing the right controller is a core CKAD skill.",
   "A Deployment runs a set of interchangeable, stateless replicas, such as a web front end or an API server. It manages ReplicaSets for you and supports rolling updates and rollbacks. Any Pod can be killed and replaced by another identical one. This is the default choice for most applications.",
   "A StatefulSet is for replicas that need a stable identity. Its Pods get predictable names such as `db-0`, `db-1`, start and stop in order, and each can get its own PersistentVolumeClaim through `volumeClaimTemplates` that follows it across restarts. It normally works with a headless Service so each Pod has a stable DNS name. Use it for databases, message queues and clustered systems where members must be told apart.",
   "A DaemonSet runs one copy of a Pod on every node (or every node that matches a selector). As nodes join, they automatically get the Pod. Typical uses are node-level agents: log collectors, monitoring exporters and network plugins. You do not set a replica count; the number of nodes decides it.",
   "A Job runs Pods until a task completes successfully, then stops. It is for batch work such as a database migration, a report or a data import. A CronJob creates Jobs on a repeating schedule, like the Unix cron utility, for nightly backups or hourly cleanups. Jobs and CronJobs use `restartPolicy: Never` or `OnFailure`, never `Always`.",
   "A bare Pod is fine for quick, disposable things: a temporary busybox Pod to test DNS, or a one-off debugging session. For anything that should keep running, wrap it in a controller.",
   "```bash\nkubectl create deployment web --image=nginx --replicas=3\nkubectl create job migrate --image=busybox -- echo done\nkubectl create cronjob tidy --image=busybox --schedule=\"0 * * * *\" -- echo tidy\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "Notice that kubectl has `create` generators for Deployments, Jobs and CronJobs, but not for StatefulSets or DaemonSets. For those, a common exam trick is to generate a Deployment with `--dry-run=client -o yaml`, change the `kind`, and remove fields that do not apply (a DaemonSet has no `replicas` or `strategy`; a StatefulSet normally sets `serviceName` for its headless Service)."
  ],
  "terms": [
   [
    "Deployment",
    "Controller for stateless, interchangeable replicas with rolling updates and rollback."
   ],
   [
    "StatefulSet",
    "Controller giving each replica a stable name, ordered start-up and its own persistent storage."
   ],
   [
    "DaemonSet",
    "Controller that runs one Pod per eligible node."
   ],
   [
    "Job / CronJob",
    "Controllers for run-to-completion work, once or on a schedule."
   ]
  ],
  "example": "A shop runs its storefront as a Deployment with five replicas, its PostgreSQL cluster as a StatefulSet with per-replica volumes, a log shipper as a DaemonSet on every node, and a nightly sales report as a CronJob. Each choice matches whether the work is stateless, stateful, per-node or run-to-completion.",
  "tip": "Look for the clue words: 'one per node' means DaemonSet, 'stable identity or ordered' means StatefulSet, 'runs to completion' means Job, 'on a schedule' means CronJob, and 'scalable stateless app' means Deployment.",
  "check": [
   [
    "Which workload should run a node monitoring agent on every node, including new ones?",
    "A DaemonSet, because it schedules one Pod per eligible node automatically."
   ],
   [
    "Why is a bare Pod a poor choice for a long-running service?",
    "Nothing recreates it if it is deleted or its node fails; a controller such as a Deployment would replace it."
   ],
   [
    "What restartPolicy values are valid for a Job's Pods?",
    "Never or OnFailure; Always is not allowed for Jobs."
   ]
  ]
 },
 {
  "t": "Jobs: completions, parallelism, backoffLimit, activeDeadlineSeconds, restartPolicy Never/OnFailure",
  "body": [
   "A Job creates one or more Pods and tracks how many finish successfully. When the required number of successes is reached, the Job is complete and no new Pods are started. Completed Pods are kept (in Completed status) so you can read their logs, until the Job is deleted or cleaned up by `ttlSecondsAfterFinished` if you set it.",
   "`completions` is how many successful Pod runs the Job needs; it defaults to 1. `parallelism` is how many Pods may run at the same time; it also defaults to 1. With `completions: 6` and `parallelism: 2`, the Job runs two Pods at a time until six have succeeded. If you set parallelism but leave completions unset, you get a work-queue style Job where Pods coordinate among themselves and the Job completes once one succeeds and all have finished.",
   "`backoffLimit` is the number of retries before the Job is marked Failed; the default is 6. Failed Pods are retried with an increasing delay (exponential back-off). `activeDeadlineSeconds` is a hard time limit for the whole Job: once it passes, Kubernetes terminates the running Pods and marks the Job Failed with the reason DeadlineExceeded. The deadline takes precedence over backoffLimit, so a Job can fail on time even if it still had retries left.",
   "The Pod template's `restartPolicy` must be `Never` or `OnFailure`. With `Never`, a failed container leaves a failed Pod behind and the Job controller creates a brand-new Pod for the retry, so you see several Pods and can inspect each one's logs. With `OnFailure`, the kubelet restarts the container inside the same Pod, so you see one Pod with a rising restart count and earlier logs are harder to reach (use `kubectl logs --previous`).",
   "```yaml\napiVersion: batch/v1\nkind: Job\nmetadata:\n  name: crunch\nspec:\n  completions: 6\n  parallelism: 2\n  backoffLimit: 3\n  activeDeadlineSeconds: 120\n  template:\n    spec:\n      restartPolicy: Never\n      containers:\n      - name: worker\n        image: busybox\n        command: [\"sh\", \"-c\", \"echo working; sleep 5\"]\n```",
   "Generate a starting point with `kubectl create job crunch --image=busybox --dry-run=client -o yaml -- sh -c 'echo working; sleep 5' > job.yaml`, then add the extra fields. Watch progress with `kubectl get job crunch` (the COMPLETIONS column shows something like 4/6) and `kubectl get pods -w`. The Job adds a `job-name=crunch` label to its Pods, so `kubectl logs -l job-name=crunch` gathers their output.",
   "Most Job fields in the Pod template cannot be changed after creation. If you need different settings, delete the Job and create it again."
  ],
  "terms": [
   [
    "completions",
    "Number of successful Pod runs required for the Job to finish (default 1)."
   ],
   [
    "parallelism",
    "Maximum number of the Job's Pods running at once (default 1)."
   ],
   [
    "backoffLimit",
    "Number of retries before the Job is marked Failed (default 6)."
   ],
   [
    "activeDeadlineSeconds",
    "Maximum run time for the whole Job, after which its Pods are stopped and it fails."
   ]
  ],
  "example": "A thumbnail generator must process 20 batches but the cluster can only spare capacity for four at once. The team sets `completions: 20`, `parallelism: 4` and `activeDeadlineSeconds: 1800`, so the work finishes in waves of four and never runs past half an hour.",
  "tip": "Know the defaults (completions 1, parallelism 1, backoffLimit 6) and that activeDeadlineSeconds wins over backoffLimit. Also remember Never gives new Pods on retry while OnFailure restarts the same Pod.",
  "check": [
   [
    "A Job has completions 5 and parallelism 2. What is the most Pods running at once?",
    "Two; parallelism caps concurrent Pods while the Job works toward five successes."
   ],
   [
    "A Job fails with reason DeadlineExceeded. Which field caused it?",
    "activeDeadlineSeconds, the overall time limit for the Job."
   ],
   [
    "How do retries differ between restartPolicy Never and OnFailure?",
    "Never creates a new Pod for each retry; OnFailure restarts the container within the same Pod."
   ]
  ]
 },
 {
  "t": "CronJobs: schedule syntax, concurrencyPolicy, history limits, running a job manually from a CronJob",
  "body": [
   "A CronJob creates a Job on a repeating schedule. It lives in the `batch/v1` API group, and its spec wraps a `jobTemplate`, which in turn wraps the familiar Pod template. So a CronJob manifest has three nested levels: CronJob spec, Job spec, Pod spec.",
   "The `schedule` field uses standard five-field cron syntax: minute, hour, day of month, month, day of week. `*/5 * * * *` means every five minutes, `0 2 * * *` means 02:00 every day, and `30 9 * * 1-5` means 09:30 Monday to Friday. Schedules are evaluated in the time zone of the kube-controller-manager unless you set the optional `timeZone` field with a time zone name. Put quotes around the schedule in YAML and on the command line so the shell and YAML parser do not interpret the asterisks.",
   "`concurrencyPolicy` decides what happens when a new run is due while the previous Job is still running. `Allow` (the default) lets them overlap. `Forbid` skips the new run. `Replace` cancels the running Job and starts the new one. Choose Forbid for work that must not run twice at once, such as a backup writing to the same file.",
   "`successfulJobsHistoryLimit` (default 3) and `failedJobsHistoryLimit` (default 1) control how many finished Jobs, and their Pods, are kept so you can inspect them. Setting a limit to 0 removes finished Jobs straight away. `startingDeadlineSeconds` sets how late a missed run may still start; if the controller cannot start it within that window, the run is skipped. `suspend: true` pauses future runs without deleting the CronJob.",
   "```yaml\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: backup\nspec:\n  schedule: \"0 2 * * *\"\n  concurrencyPolicy: Forbid\n  successfulJobsHistoryLimit: 2\n  failedJobsHistoryLimit: 1\n  jobTemplate:\n    spec:\n      backoffLimit: 2\n      template:\n        spec:\n          restartPolicy: OnFailure\n          containers:\n          - name: backup\n            image: busybox\n            command: [\"sh\", \"-c\", \"echo backing up\"]\n```",
   "Generate the skeleton quickly with `kubectl create cronjob backup --image=busybox --schedule=\"0 2 * * *\" --dry-run=client -o yaml -- sh -c 'echo backing up'`. To test it without waiting for the schedule, create a Job from its template: `kubectl create job backup-manual --from=cronjob/backup`. That Job runs immediately using exactly the same spec, which is the standard way to prove a CronJob works.",
   "Check what has happened with `kubectl get cronjob backup` (it shows LAST SCHEDULE and ACTIVE), `kubectl get jobs` and `kubectl describe cronjob backup`, whose events list each Job it created or any missed schedules."
  ],
  "terms": [
   [
    "schedule",
    "Five-field cron expression: minute, hour, day of month, month, day of week."
   ],
   [
    "concurrencyPolicy",
    "Allow, Forbid or Replace: what to do if a run is due while the previous one is still active."
   ],
   [
    "History limits",
    "successfulJobsHistoryLimit and failedJobsHistoryLimit, the number of finished Jobs kept."
   ],
   [
    "jobTemplate",
    "The Job specification that the CronJob stamps out for each run."
   ]
  ],
  "example": "A report CronJob scheduled every 10 minutes sometimes takes 15 minutes, causing two copies to fight over the same output table. Setting `concurrencyPolicy: Forbid` makes the controller skip a run while one is active, and `kubectl create job report-test --from=cronjob/report` lets the developer test changes on demand.",
  "tip": "The command to trigger a CronJob by hand is `kubectl create job <new-name> --from=cronjob/<cronjob-name>`. Also remember that restartPolicy sits in the innermost Pod template.",
  "check": [
   [
    "What does the schedule `*/15 * * * *` mean?",
    "Run every 15 minutes."
   ],
   [
    "Which concurrencyPolicy stops the old Job and starts the new one?",
    "Replace. Forbid skips the new run and Allow runs both."
   ],
   [
    "How do you run a CronJob's work immediately?",
    "Create a Job from it: `kubectl create job <name> --from=cronjob/<cronjob>`."
   ]
  ]
 },
 {
  "t": "Multi-container patterns: init containers, sidecars (including native sidecars with restartPolicy: Always), adapter and ambassador",
  "body": [
   "A Pod can hold several containers. They share the same network namespace, so they reach each other on `localhost`, and they can share volumes. That makes it natural to split helper duties into separate containers instead of stuffing them into your application image. The CKAD curriculum expects you to know the patterns built on this idea: init containers, sidecars, adapters and ambassadors.",
   "Init containers are listed under `spec.initContainers`. They run one at a time, in order, before any regular container starts, and each must exit successfully. If one fails, the kubelet retries it according to the Pod's restartPolicy, and the Pod's status shows `Init:0/2`, `Init:Error` or `Init:CrashLoopBackOff`. Use them to wait for a dependency (for example, loop until a Service's DNS name resolves), to download or render configuration into a shared emptyDir, or to fix permissions on a volume. Because they finish before the app starts, they can use tools you do not want in the main image.",
   "A sidecar is a helper that runs alongside the main container for the Pod's whole life: shipping logs, refreshing certificates, or syncing files from Git. The traditional way is to add a second entry under `containers`. The drawback is that Kubernetes treats all regular containers as equals, so in a Job the sidecar can keep the Pod running after the main work is done, and start-up order is not guaranteed.",
   "Native sidecars fix this. You declare the helper under `initContainers` but give it `restartPolicy: Always`. Kubernetes starts it in init order, does not wait for it to exit, keeps it running (restarting it if it dies) while the main containers run, and stops it after they finish. That means a log shipper is up before your app writes its first line, and a Job completes normally when the main container exits.",
   "```yaml\nspec:\n  initContainers:\n  - name: log-shipper\n    image: busybox\n    restartPolicy: Always\n    command: [\"sh\", \"-c\", \"tail -F /var/log/app/app.log\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\", \"while true; do date >> /var/log/app/app.log; sleep 2; done\"]\n    volumeMounts:\n    - {name: logs, mountPath: /var/log/app}\n  volumes:\n  - name: logs\n    emptyDir: {}\n```",
   "An adapter container transforms the main container's output into a standard form, for example converting an application's custom log format or status page into a format a monitoring system understands. An ambassador container is a local proxy that represents an outside service: the app connects to `localhost:6379`, and the ambassador forwards to the right Redis endpoint, handling discovery, TLS or sharding. Both are technically sidecars; the names describe their job. Adapters change what goes out; ambassadors broker connections to the outside.",
   "To work with a specific container, add `-c`: `kubectl logs mypod -c log-shipper`, `kubectl exec -it mypod -c app -- sh`. `kubectl describe pod` lists init containers and regular containers separately with their states."
  ],
  "terms": [
   [
    "Init container",
    "A container that runs to completion, in order, before the app containers start."
   ],
   [
    "Sidecar",
    "A helper container that runs alongside the main container for the Pod's lifetime."
   ],
   [
    "Native sidecar",
    "An init container with restartPolicy: Always, started before and stopped after the main containers."
   ],
   [
    "Adapter",
    "A helper that converts the main container's output to a standard format."
   ],
   [
    "Ambassador",
    "A helper that proxies the app's connections to external services via localhost."
   ]
  ],
  "example": "A legacy app writes logs only to a file. The team adds a native sidecar that tails the file from a shared emptyDir to stdout, so `kubectl logs pod -c log-shipper` works and the cluster's log collector picks it up, and an init container that waits for the database Service to resolve before the app starts.",
  "tip": "If a Pod is stuck in `Init:` status, the problem is an init container: check it with `kubectl logs <pod> -c <init-name>`. A native sidecar lives under initContainers but has restartPolicy: Always.",
  "check": [
   [
    "In what order do init containers run relative to each other and the app?",
    "One at a time in the listed order, each finishing successfully before the next, and all before the app containers start (native sidecars start and keep running)."
   ],
   [
    "Why are native sidecars better than a regular second container in a Job?",
    "They are stopped automatically after the main container exits, so the Job can complete instead of hanging on a still-running helper."
   ],
   [
    "What is the difference between an adapter and an ambassador?",
    "An adapter reformats outgoing data from the app; an ambassador proxies the app's connections to outside services."
   ]
  ]
 },
 {
  "t": "Ephemeral volumes: emptyDir (including medium: Memory), configMap/secret/projected volumes",
  "body": [
   "A container's own filesystem is thrown away whenever the container restarts. Volumes give containers storage that is declared at Pod level under `spec.volumes` and attached with `volumeMounts`. Ephemeral volumes live exactly as long as the Pod: they survive container restarts but are deleted when the Pod is removed.",
   "`emptyDir` is the simplest. It starts empty when the Pod is assigned to a node and is shared by every container that mounts it, which is how init containers and sidecars pass files to the main container. By default it is stored on the node's disk. Setting `medium: Memory` backs it with tmpfs, a RAM-based filesystem: very fast and never written to disk, which suits scratch space or sensitive temporary files, but the data counts toward the container's memory usage and limit. Set `sizeLimit` to cap either kind; a Pod that exceeds it can be evicted.",
   "```yaml\nvolumes:\n- name: cache\n  emptyDir:\n    medium: Memory\n    sizeLimit: 64Mi\n- name: settings\n  configMap:\n    name: app-config\n- name: creds\n  secret:\n    secretName: db-secret\n    defaultMode: 0400\n```",
   "A `configMap` volume presents each key of a ConfigMap as a file whose name is the key and whose content is the value. A `secret` volume does the same for a Secret, decoded from base64 and stored in tmpfs on the node. Note the field names differ: `configMap.name` but `secret.secretName`. You can choose particular keys and file names with `items`, and set file permissions with `defaultMode`. If you update the ConfigMap or Secret, the mounted files are refreshed after a short delay, unlike environment variables, which are read only at container start. Files mounted with `subPath` do not receive these updates.",
   "A `projected` volume merges several sources into one directory. Allowed sources include `configMap`, `secret`, `downwardAPI` (Pod metadata such as labels or the namespace) and `serviceAccountToken` (a short-lived token with a chosen audience and expiry). This is useful when an app expects all its configuration under one path.",
   "```yaml\n- name: all-in-one\n  projected:\n    sources:\n    - configMap:\n        name: app-config\n    - secret:\n        name: db-secret\n    - downwardAPI:\n        items:\n        - path: labels\n          fieldRef:\n            fieldPath: metadata.labels\n```",
   "In a lab, verify with `kubectl exec pod -- ls -l /etc/config` and `kubectl exec pod -- df -h /cache`; a Memory-backed emptyDir shows up as tmpfs. If a Pod stays in ContainerCreating, `kubectl describe pod` usually reports a missing ConfigMap or Secret that the volume references."
  ],
  "terms": [
   [
    "emptyDir",
    "A Pod-lifetime scratch volume, empty at start and shared by the Pod's containers."
   ],
   [
    "medium: Memory",
    "Makes an emptyDir a RAM-backed tmpfs that counts toward memory usage."
   ],
   [
    "Projected volume",
    "A volume that combines configMap, secret, downwardAPI and serviceAccountToken sources in one directory."
   ],
   [
    "Ephemeral volume",
    "Storage whose lifetime is tied to the Pod and is deleted with it."
   ]
  ],
  "example": "An image-processing Pod uses a 256Mi Memory-backed emptyDir as scratch space for fast temporary files, mounts its settings from a ConfigMap at /etc/app, and mounts TLS keys from a Secret with mode 0400, all declared in the Pod spec.",
  "tip": "Secret volumes use `secretName`, not `name`, and projected sources use `name` for both. Also remember env vars do not update when a ConfigMap changes, but mounted files (without subPath) do.",
  "check": [
   [
    "What happens to an emptyDir when its container restarts, and when the Pod is deleted?",
    "It survives a container restart but is deleted with the Pod."
   ],
   [
    "What trade-off comes with `medium: Memory`?",
    "It is fast and not written to disk, but its contents use RAM and count against the container's memory limit."
   ],
   [
    "Name the source types a projected volume can combine.",
    "configMap, secret, downwardAPI and serviceAccountToken."
   ]
  ]
 },
 {
  "t": "Persistent storage: PersistentVolume, PersistentVolumeClaim, StorageClass, access modes, dynamic provisioning",
  "body": [
   "Some data must outlive any single Pod: database files, uploads, anything you cannot lose on a restart. Kubernetes separates the storage itself from the request for storage, so developers can ask for space without knowing the details of the disk behind it.",
   "A PersistentVolume (PV) is a piece of storage in the cluster, such as a cloud disk, an NFS export or a local path, represented as a cluster-scoped object. A PersistentVolumeClaim (PVC) is a namespaced request: \"I need 5Gi with ReadWriteOnce access\". Kubernetes binds a claim to a PV that satisfies its size, access mode and storage class; the binding is one-to-one. The Pod then references the claim by name, never the PV directly.",
   "```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: standard\n---\n# in the Pod spec\nvolumes:\n- name: data\n  persistentVolumeClaim:\n    claimName: data\n```",
   "Access modes describe how the volume can be mounted. ReadWriteOnce (RWO) allows read-write by a single node (several Pods on that node can share it). ReadOnlyMany (ROX) allows read-only by many nodes. ReadWriteMany (RWX) allows read-write by many nodes and needs storage that supports it, such as NFS. ReadWriteOncePod (RWOP) restricts read-write access to a single Pod. A claim only binds to a PV that offers the requested mode.",
   "A StorageClass describes a kind of storage, with a `provisioner` that knows how to create it and `parameters` such as disk type. With dynamic provisioning, you create a PVC that names a StorageClass, and the provisioner automatically creates a matching PV. If the PVC omits `storageClassName`, the cluster's default StorageClass is used (marked with `(default)` in `kubectl get storageclass`). Setting `storageClassName: \"\"` explicitly asks for no class, so only a pre-created PV without a class can bind. Static provisioning means an administrator creates PVs by hand in advance.",
   "The `reclaimPolicy` says what happens to the PV when its claim is deleted: `Delete` removes the underlying storage (the usual default for dynamically provisioned volumes), and `Retain` keeps it for manual recovery. Some classes use `volumeBindingMode: WaitForFirstConsumer`, which delays provisioning until a Pod uses the claim so the volume is created in the right zone; until then the PVC shows Pending, which is normal.",
   "Troubleshoot with `kubectl get pv,pvc` and look at STATUS: Bound is good, Pending means no matching PV or provisioner. `kubectl describe pvc data` explains why. A common exam mistake is a mismatch in storage class, size or access mode between a hand-written PV and PVC."
  ],
  "terms": [
   [
    "PersistentVolume (PV)",
    "A cluster-scoped object representing a piece of real storage."
   ],
   [
    "PersistentVolumeClaim (PVC)",
    "A namespaced request for storage that binds to a matching PV."
   ],
   [
    "StorageClass",
    "A named type of storage with a provisioner used for dynamic provisioning."
   ],
   [
    "Access mode",
    "RWO, ROX, RWX or RWOP: how many nodes or Pods may mount the volume and whether they can write."
   ],
   [
    "Reclaim policy",
    "Delete or Retain: what happens to a PV's storage after its claim is released."
   ]
  ],
  "example": "In minikube, a developer creates a 1Gi RWO PVC with no storageClassName. The default StorageClass provisions a PV automatically, the claim shows Bound, and after deleting and recreating the Pod the files written to the mount are still there.",
  "tip": "Pods reference PVCs, not PVs. For a static PV and PVC to bind, storageClassName, access mode and capacity (PV at least as large as the request) must all be compatible.",
  "check": [
   [
    "Which object is namespaced: PV or PVC?",
    "The PVC is namespaced; the PV is cluster-scoped."
   ],
   [
    "What does ReadWriteOnce actually restrict?",
    "Read-write mounting to a single node; Pods on that same node can share it. ReadWriteOncePod restricts it to one Pod."
   ],
   [
    "A PVC is Pending and its StorageClass uses WaitForFirstConsumer. Is something broken?",
    "Not necessarily; provisioning waits until a Pod that uses the claim is scheduled."
   ]
  ]
 },
 {
  "t": "Mounting volumes with volumeMounts, mountPath, subPath and readOnly",
  "body": [
   "Declaring a volume under `spec.volumes` only makes it available to the Pod. Each container that needs it must also list it under its own `volumeMounts`, linking the volume's `name` to a `mountPath` inside the container. Two containers can mount the same volume at different paths, which is how they share files.",
   "The `name` in `volumeMounts` must match a name under `volumes` exactly; a typo leaves the Pod rejected with a validation error or stuck in ContainerCreating. The `mountPath` is an absolute path. If the directory already exists in the image, the volume hides its original contents for as long as it is mounted. Mounting a ConfigMap at `/etc` would hide everything else in `/etc`, a classic mistake.",
   "`subPath` mounts a single file or subdirectory from within the volume instead of the whole volume. This solves the hiding problem: you can place one config file into an existing directory without covering its neighbours. It also lets several containers, or several mounts, use different subdirectories of one volume. `subPathExpr` does the same but can include environment variables, for example to create a per-Pod directory using the Pod name from the downward API.",
   "```yaml\ncontainers:\n- name: web\n  image: nginx\n  volumeMounts:\n  - name: site-config\n    mountPath: /etc/nginx/conf.d/default.conf\n    subPath: default.conf\n    readOnly: true\n  - name: content\n    mountPath: /usr/share/nginx/html\nvolumes:\n- name: site-config\n  configMap:\n    name: nginx-conf\n- name: content\n  persistentVolumeClaim:\n    claimName: web-content\n```",
   "Be aware of a trade-off: files mounted through `subPath` from a ConfigMap or Secret do not receive updates when the source object changes. To pick up changes, the Pod must be restarted. Whole-volume mounts are refreshed automatically after a short delay.",
   "`readOnly: true` on a mount prevents the container from writing to that volume, even if the underlying storage is writable. It is a simple way to apply least privilege: a web server that only serves content, or an app that only reads credentials, should not be able to change them. It also pairs well with `readOnlyRootFilesystem` in the security context, where you mount writable emptyDirs only at the paths that genuinely need writes, such as `/tmp`.",
   "To check what is mounted, use `kubectl describe pod` (the Mounts section of each container) or `kubectl exec pod -c web -- ls -la /etc/nginx/conf.d`. `kubectl explain pod.spec.containers.volumeMounts` lists all available fields if you forget one during the exam."
  ],
  "terms": [
   [
    "volumeMounts",
    "Per-container list linking a Pod volume to a path inside that container."
   ],
   [
    "mountPath",
    "The absolute path in the container where the volume appears, hiding anything already there."
   ],
   [
    "subPath",
    "Mounts a single file or subdirectory of a volume instead of its whole root."
   ],
   [
    "readOnly",
    "Mount option that blocks writes from that container to the volume."
   ]
  ],
  "example": "A team needs a custom nginx config but mounting the ConfigMap at /etc/nginx/conf.d wiped out other included files. Using `mountPath: /etc/nginx/conf.d/default.conf` with `subPath: default.conf` and `readOnly: true` replaced just the one file and made it tamper-proof.",
  "tip": "A volume needs both halves: an entry in spec.volumes and a matching volumeMounts entry in each container. subPath mounts do not auto-update from ConfigMaps or Secrets.",
  "check": [
   [
    "Why might mounting a ConfigMap at /etc/app break an application?",
    "The mount hides everything already in /etc/app in the image; use subPath to mount a single file instead."
   ],
   [
    "What does readOnly: true on a volumeMount do?",
    "It prevents that container from writing to the volume at that path."
   ],
   [
    "Can two containers in one Pod mount the same volume at different paths?",
    "Yes; each lists it under its own volumeMounts with its own mountPath."
   ]
  ]
 },
 {
  "t": "Deployments and ReplicaSets: how the Pod template, labels and selectors fit together",
  "body": [
   "A Deployment is the standard way to run a stateless app. It does not manage Pods directly. Instead it creates a ReplicaSet, and the ReplicaSet keeps the requested number of Pod replicas running, creating new ones when Pods die and deleting extras. The Deployment's own job is to manage ReplicaSets over time, which is what makes rolling updates and rollbacks possible.",
   "Three parts of the Deployment spec work together. `replicas` is how many Pods you want. `template` is the Pod template: the metadata (including labels) and Pod spec every replica is made from. `selector` tells the controller which Pods belong to it, using `matchLabels` (or `matchExpressions`).",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\n  labels:\n    app: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n        tier: frontend\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.27\n```",
   "The rule is that the selector must match the template's labels; the API server rejects a Deployment where it does not. The template can carry extra labels (like `tier` above) that the selector ignores. In `apps/v1` the selector is immutable after creation, so choose it carefully. The labels in the Deployment's own `metadata` are just labels on the Deployment object and do not affect selection.",
   "When you change anything in the Pod template, such as the image, an environment variable or a label, the Deployment computes a hash of the template and creates a new ReplicaSet named after it, for example `web-7d9c6b8f5`. It then scales the new ReplicaSet up and the old one down. Old ReplicaSets remain at zero replicas as revision history for rollback, up to `revisionHistoryLimit` (default 10). Changing only `replicas` does not create a new ReplicaSet; it just scales the current one.",
   "Pods get names built from the ReplicaSet name plus a random suffix, and an extra `pod-template-hash` label that keeps ReplicaSets from claiming each other's Pods. You can see the chain with `kubectl get deploy,rs,pods -l app=web` and `kubectl describe rs`, whose 'Controlled By' line points to the Deployment.",
   "Selectors also connect other objects: a Service with `selector: app: web` sends traffic to these Pods. If you create a bare Pod with the label `app: web`, the Service will also send it traffic, even though the Deployment does not manage it (the Deployment's ReplicaSets also select on `pod-template-hash`, so they do not adopt it). A standalone ReplicaSet with a plain `app: web` selector, however, would adopt such a Pod and delete one to keep its count right. Understanding this label link explains many surprises. Quick generation: `kubectl create deployment web --image=nginx:1.27 --replicas=3 --dry-run=client -o yaml` produces matching selector and template labels (`app: web`) automatically."
  ],
  "terms": [
   [
    "ReplicaSet",
    "Controller that keeps a set number of identical Pods running; normally managed by a Deployment."
   ],
   [
    "Pod template",
    "The Pod metadata and spec inside a controller from which every replica is created."
   ],
   [
    "Label selector",
    "A query on labels, such as matchLabels app: web, that decides which Pods an object manages or targets."
   ],
   [
    "pod-template-hash",
    "Label added by the Deployment to tell Pods of different ReplicaSets apart."
   ]
  ],
  "example": "A developer edits the image in a Deployment. `kubectl get rs` then shows two ReplicaSets: the new one scaling from 0 to 3 and the old one from 3 to 0. After the rollout the old ReplicaSet stays at 0 replicas, ready to be used if they run `kubectl rollout undo`.",
  "tip": "If `kubectl apply` fails with 'selector does not match template labels', make spec.selector.matchLabels a subset of spec.template.metadata.labels. The selector cannot be changed later in apps/v1.",
  "check": [
   [
    "What object does a Deployment create directly?",
    "A ReplicaSet, which in turn creates the Pods."
   ],
   [
    "Does scaling a Deployment from 3 to 5 replicas create a new ReplicaSet?",
    "No; only changes to the Pod template create a new ReplicaSet. Scaling adjusts the current one."
   ],
   [
    "What must be true about a Deployment's selector and template labels?",
    "Every label in the selector must appear with the same value in the template's labels."
   ]
  ]
 },
 {
  "t": "Rolling updates: maxSurge, maxUnavailable, minReadySeconds; the Recreate strategy",
  "body": [
   "When you change a Deployment's Pod template, the controller has to replace old Pods with new ones. The `strategy` field controls how. The default, `RollingUpdate`, replaces Pods gradually so the app keeps serving during the change. The alternative, `Recreate`, deletes all old Pods first and only then creates new ones.",
   "Two settings shape a rolling update. `maxSurge` is how many Pods above the desired replica count may exist during the update. `maxUnavailable` is how many Pods below the desired count may be unavailable. Each can be an absolute number or a percentage of replicas; both default to 25%. Percentages are rounded: surge rounds up and unavailable rounds down. They cannot both be zero, because then the rollout could never make progress.",
   "```yaml\nspec:\n  replicas: 4\n  minReadySeconds: 10\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n```",
   "Walk through the example. With 4 replicas, maxSurge 1 and maxUnavailable 0, the controller may run at most 5 Pods and must keep at least 4 available. It creates one new Pod, waits until it is available, removes one old Pod, and repeats. This is the safest zero-downtime setting but needs spare capacity for the extra Pod. The opposite extreme, maxSurge 0 and maxUnavailable 1, uses no extra capacity but runs one Pod short during the update.",
   "Availability depends on readiness. A new Pod counts as available once its readiness probe passes and it has stayed ready for `minReadySeconds` (default 0). Raising minReadySeconds slows the rollout slightly but catches Pods that start and then crash a few seconds later. If new Pods never become ready, the rollout stalls instead of taking down the old version, which is a key safety property of rolling updates. `progressDeadlineSeconds` (default 600) marks such a stuck rollout as failed in its status; it does not roll back automatically.",
   "`Recreate` has no surge or unavailable settings. It causes downtime between the old Pods terminating and the new ones becoming ready, but it guarantees that two versions never run at once. Choose it when versions cannot coexist, for example when both would write to the same ReadWriteOnce volume or when a schema change makes the old code incompatible.",
   "```yaml\nspec:\n  strategy:\n    type: Recreate\n```",
   "If you switch from RollingUpdate to Recreate by editing, remove the `rollingUpdate` block too, or the API server rejects the change. Watch a rollout in action with `kubectl rollout status deploy/web` and `kubectl get rs -w`."
  ],
  "terms": [
   [
    "RollingUpdate",
    "Default Deployment strategy that replaces Pods gradually while the app keeps serving."
   ],
   [
    "maxSurge",
    "How many Pods above the desired count may exist during an update (default 25%)."
   ],
   [
    "maxUnavailable",
    "How many Pods below the desired count may be unavailable during an update (default 25%)."
   ],
   [
    "minReadySeconds",
    "How long a new Pod must stay ready before it counts as available."
   ],
   [
    "Recreate",
    "Strategy that terminates all old Pods before creating new ones, causing brief downtime."
   ]
  ],
  "example": "A payments API with 10 replicas must never drop below full capacity. The team sets maxUnavailable 0, maxSurge 2 and minReadySeconds 15, so the rollout adds two new Pods at a time and retires old ones only after the new ones have stayed healthy for 15 seconds.",
  "tip": "Do the arithmetic: max Pods = replicas + maxSurge, minimum available = replicas - maxUnavailable. Pick Recreate when a task says old and new versions must never run together.",
  "check": [
   [
    "With 10 replicas and the default strategy, how many Pods may exist at most during an update?",
    "13: maxSurge 25% of 10 is 2.5, rounded up to 3."
   ],
   [
    "Why would you choose the Recreate strategy?",
    "When two versions cannot run at the same time, accepting brief downtime."
   ],
   [
    "What happens if the new Pods never become ready during a rolling update?",
    "The rollout stalls and old Pods keep serving; after progressDeadlineSeconds it is reported as failed, but it is not rolled back automatically."
   ]
  ]
 },
 {
  "t": "Kubectl rollout status, history, undo (--to-revision), pause and resume; kubectl set image and scale",
  "body": [
   "Deployments keep a history of revisions, one per Pod template change, and kubectl gives you a small set of commands to drive and inspect them. These commands are fast to type and appear constantly on the exam, so it pays to know them by heart.",
   "`kubectl set image deployment/web nginx=nginx:1.27` changes the image of the container named `nginx` in the Deployment `web`, which starts a rolling update. The part before `=` is the container name, not the image name; get it wrong and kubectl reports that the container was not found. `kubectl scale deployment/web --replicas=5` changes the replica count without creating a new revision. `kubectl rollout restart deployment/web` triggers a fresh rollout with the same spec (it adds a timestamp annotation to the template), useful for picking up a changed ConfigMap consumed as environment variables.",
   "`kubectl rollout status deployment/web` waits and reports progress until the rollout finishes or fails, returning a non-zero exit code on failure. `kubectl rollout history deployment/web` lists revisions, and `--revision=3` shows the Pod template for a specific one. The CHANGE-CAUSE column is filled from the `kubernetes.io/change-cause` annotation; set it yourself with `kubectl annotate deployment/web kubernetes.io/change-cause=\"upgrade to 1.27\"`, since the old `--record` flag is deprecated.",
   "```bash\nkubectl set image deploy/web nginx=nginx:1.27\nkubectl rollout status deploy/web\nkubectl rollout history deploy/web\nkubectl rollout history deploy/web --revision=2\nkubectl rollout undo deploy/web\nkubectl rollout undo deploy/web --to-revision=1\n```",
   "`kubectl rollout undo deployment/web` goes back to the previous revision; `--to-revision=N` picks a specific one. Undo works by copying that old template forward, so the restored template gets a new, higher revision number and the old number disappears from the list. Rollback only affects the Pod template; it does not undo replica count changes, and it does not restore ConfigMaps or Secrets the Pods read.",
   "`kubectl rollout pause deployment/web` stops the controller from acting on template changes. While paused you can make several edits, for example `set image` and `set resources`, without triggering a rollout for each. `kubectl rollout resume deployment/web` then rolls them out together as one revision. Scaling still works while paused. You cannot undo a paused Deployment; resume it first.",
   "These commands also accept the short form `deploy/web` and work on DaemonSets and StatefulSets for status, history, undo and restart. After any change, confirm the result with `kubectl get deploy web -o wide` (which shows images) or `kubectl describe deploy web`, whose events show each scaling step of the ReplicaSets."
  ],
  "terms": [
   [
    "Revision",
    "A numbered version of a Deployment's Pod template kept for rollback."
   ],
   [
    "rollout undo",
    "Returns the Deployment to the previous or a chosen revision by reapplying its template."
   ],
   [
    "rollout pause / resume",
    "Temporarily stops and restarts rollouts so several changes can be applied as one."
   ],
   [
    "change-cause",
    "The kubernetes.io/change-cause annotation shown in rollout history."
   ]
  ],
  "example": "After `kubectl set image deploy/api api=api:2.1`, error rates spike. The on-call developer runs `kubectl rollout history deploy/api` to spot the last good revision, then `kubectl rollout undo deploy/api --to-revision=4` and watches `kubectl rollout status deploy/api` until it reports success.",
  "tip": "In `kubectl set image`, the left side is the container name. Use `kubectl get deploy web -o jsonpath='{.spec.template.spec.containers[*].name}'` if you are unsure.",
  "check": [
   [
    "Does `kubectl scale` create a new rollout revision?",
    "No; only Pod template changes create revisions."
   ],
   [
    "After undoing to revision 2 from revision 4, what revision number is the Deployment on?",
    "Revision 5; the old template is copied forward with a new number, and revision 2 no longer appears separately."
   ],
   [
    "Why pause a Deployment?",
    "To batch several template changes into a single rollout instead of one rollout per change."
   ]
  ]
 },
 {
  "t": "Blue/green deployments by switching a Service selector between two Deployments",
  "body": [
   "A blue/green deployment runs two complete versions of an application side by side. Blue is the live version receiving traffic; green is the new version, fully started and tested but not yet serving users. When you are satisfied with green, you switch all traffic to it at once. If something goes wrong, you switch back just as quickly. Kubernetes has no special object for this; you build it from two Deployments and one Service.",
   "The trick is labels. Both Deployments share an application label such as `app: shop` and differ in a version label, for example `version: blue` and `version: green`. The Service's selector includes both labels, so it matches only one colour at a time.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: shop\nspec:\n  selector:\n    app: shop\n    version: blue\n  ports:\n  - port: 80\n    targetPort: 8080\n```",
   "The process looks like this. First, deploy `shop-green` with the new image and `version: green` labels, at full size. Second, test it directly, for example through a temporary second Service such as `shop-preview` or with `kubectl port-forward deploy/shop-green 8080`. Third, switch the live Service by changing its selector: `kubectl patch service shop -p '{\"spec\":{\"selector\":{\"app\":\"shop\",\"version\":\"green\"}}}'` or `kubectl edit service shop`. Traffic moves as soon as the endpoints update. Finally, keep blue running for a while as your rollback path, then scale it to zero or delete it.",
   "Verify the switch with `kubectl get endpointslices -l kubernetes.io/service-name=shop` or `kubectl describe service shop`: the listed Pod IPs should now belong to the green Pods, which you can compare with `kubectl get pods -l version=green -o wide`.",
   "Compared with a rolling update, blue/green gives an instant, all-at-once cut-over, so users never see a mix of versions, and an instant rollback. The costs are double the resources during the switch and the need for both versions to work with the same database and other shared state. Existing long-lived connections may continue to the old Pods until they close, so keep blue alive briefly after switching.",
   "Common exam mistakes are forgetting to add the distinguishing label to the Pod template (the Deployment's own metadata labels do not count), and making the Service selector so broad, just `app: shop`, that it matches both colours at once."
  ],
  "terms": [
   [
    "Blue/green deployment",
    "Running old and new versions in full side by side and switching all traffic at once."
   ],
   [
    "Service selector",
    "Label query that decides which Pods receive a Service's traffic."
   ],
   [
    "Cut-over",
    "The moment traffic moves from the old version to the new one."
   ]
  ],
  "example": "A ticketing site deploys `tickets-green` alongside `tickets-blue`, tests it through a port-forward, then patches the `tickets` Service selector to `version: green`. When a bug appears ten minutes later, they patch the selector back to blue, restoring the old version within seconds.",
  "tip": "The switch happens in the Service, not the Deployments. Make sure the version label is on the Pod template and that the Service selector includes it.",
  "check": [
   [
    "What single change moves traffic from blue to green?",
    "Updating the Service's selector to match the green Pods' version label."
   ],
   [
    "How do you roll back a blue/green release?",
    "Switch the Service selector back to the blue label, provided the blue Deployment is still running."
   ],
   [
    "What is the main resource cost of blue/green?",
    "Both versions run at full size at the same time during the switch."
   ]
  ]
 },
 {
  "t": "Canary releases with two Deployments behind one Service, weighted by replica count",
  "body": [
   "A canary release sends a small share of real traffic to a new version before rolling it out to everyone. If the canary behaves well, you gradually give it more traffic; if it misbehaves, only a few users were affected and you remove it. The name comes from canaries once used to warn miners of bad air.",
   "Without a service mesh or special ingress features, you build a canary in Kubernetes with two Deployments and one Service. Both Deployments label their Pods with a shared label, such as `app: api`, plus a track label such as `track: stable` or `track: canary`. The Service selects only on the shared label, so it load-balances across every ready Pod from both Deployments.",
   "```yaml\n# Service selects both tracks\nspec:\n  selector:\n    app: api\n---\n# api-stable: replicas: 9, labels app: api, track: stable, image api:1.0\n# api-canary: replicas: 1, labels app: api, track: canary, image api:1.1\n```",
   "Because a ClusterIP Service spreads connections roughly evenly across its endpoints, the traffic split follows the replica counts. With 9 stable Pods and 1 canary Pod, about 10% of connections reach the canary. To move to about 25%, you could run 3 stable and 1 canary, or 6 and 2. The split is approximate: it is per connection rather than per request, and long-lived connections or uneven load can skew it.",
   "A typical progression: deploy the canary with one replica, watch its logs, errors and latency (`kubectl logs -l track=canary`), then scale it up with `kubectl scale deploy api-canary --replicas=3` while scaling stable down to keep the total steady. When confident, update the stable Deployment to the new image and delete the canary. To abort, delete or scale the canary to zero; the Service immediately stops sending it traffic.",
   "The key difference from blue/green is that users see both versions at once, in proportion, and the Service selector never changes. The difference from a plain rolling update is control: a rolling update moves through the whole fleet automatically, while a canary lets you pause at a small percentage for as long as you want.",
   "When an exam task asks for, say, 20% of traffic on the new version with a total of 5 Pods, the answer is 4 stable and 1 canary, both carrying the label the Service selects. Check with `kubectl get endpointslices -l kubernetes.io/service-name=api` that all five Pod IPs appear."
  ],
  "terms": [
   [
    "Canary release",
    "Sending a small share of traffic to a new version to test it with real users."
   ],
   [
    "Track label",
    "A label such as track: canary used to tell the two Deployments' Pods apart without affecting the Service."
   ],
   [
    "Replica weighting",
    "Using the ratio of Pod counts to approximate a traffic split behind one Service."
   ]
  ],
  "example": "A search team runs `search-stable` with 8 replicas and adds `search-canary` with 2 replicas of the new ranking code, both labelled `app: search`. Roughly 20% of queries hit the canary; after a day of normal error rates they promote the new image to the stable Deployment and delete the canary.",
  "tip": "Percent to canary is canary replicas divided by total replicas. The Service selector must match a label shared by both Deployments and must not include the track label.",
  "check": [
   [
    "A Service fronts 3 stable Pods and 1 canary Pod. Roughly what share of traffic reaches the canary?",
    "About 25%, because traffic is spread across all four ready endpoints."
   ],
   [
    "Why must the Service selector not include `track: stable`?",
    "Then it would match only stable Pods, and the canary would receive no traffic."
   ],
   [
    "How do you quickly abort a canary?",
    "Scale the canary Deployment to zero or delete it; its Pods leave the Service endpoints."
   ]
  ]
 },
 {
  "t": "Helm basics: repositories, charts, releases; helm repo add/update, search, install, upgrade, rollback, uninstall, list",
  "body": [
   "Helm is a package manager for Kubernetes. Instead of applying dozens of YAML files by hand, you install a chart, a package of templated manifests with default settings, and Helm renders and applies them for you. Current Helm runs entirely as a client: it talks to the Kubernetes API with your kubeconfig and stores release records as Secrets in the release's namespace, so your RBAC permissions apply.",
   "Three words matter. A chart is the package: a directory or `.tgz` with `Chart.yaml`, a `values.yaml` of defaults and a `templates/` folder. A repository is a server that hosts an index of charts. A release is one installed instance of a chart in a cluster, with a name you choose. You can install the same chart many times as different releases, each with its own revision history.",
   "Repositories are registered locally. `helm repo add bitnami <repo-url>` adds one under a short name, `helm repo update` refreshes the cached chart index (do this before searching or installing so you see the latest versions), and `helm repo list` shows what you have. `helm search repo nginx` searches your added repositories; `helm search repo nginx --versions` lists every chart version. `helm search hub` searches a public catalogue instead.",
   "```bash\nhelm repo add bitnami <repo-url>\nhelm repo update\nhelm search repo bitnami/nginx\nhelm install web bitnami/nginx -n web --create-namespace\nhelm list -n web\nhelm upgrade web bitnami/nginx -n web --set replicaCount=3\nhelm history web -n web\nhelm rollback web 1 -n web\nhelm uninstall web -n web\n```",
   "`helm install <release> <chart>` creates revision 1. Pin a chart version with `--version`. `helm upgrade <release> <chart>` applies a new chart version or new values and creates the next revision; `helm upgrade --install` installs if the release does not exist yet. `helm history <release>` lists revisions and their status, and `helm rollback <release> <revision>` returns to an earlier one, recorded as a new revision. Leave out the revision number to go back one step.",
   "`helm list` shows releases in the current namespace; add `-n <ns>` or `-A` for all namespaces, and `-a` to include failed or pending ones. `helm status <release>` shows the release state and notes. `helm uninstall <release>` deletes the release's resources and its history. Remember that Helm commands are namespace-scoped like kubectl: a release installed with `-n web` is invisible to `helm list` in `default`, which is the most common source of 'release not found' errors.",
   "After installing, confirm with ordinary kubectl: `kubectl get all -n web`. Helm-managed objects carry labels such as `app.kubernetes.io/managed-by=Helm`, which helps you tell them apart."
  ],
  "terms": [
   [
    "Chart",
    "A Helm package of templated Kubernetes manifests plus default values."
   ],
   [
    "Repository",
    "A server hosting an index of charts, added locally with helm repo add."
   ],
   [
    "Release",
    "A named, installed instance of a chart in a namespace, with revision history."
   ],
   [
    "helm rollback",
    "Returns a release to an earlier revision, recorded as a new revision."
   ]
  ],
  "example": "An exam task asks you to install the chart bitnami/apache as release `site` in namespace `web-team`, then remove an older release called `legacy`. You run `helm repo update`, `helm install site bitnami/apache -n web-team`, find the old one with `helm list -A`, and remove it with `helm uninstall legacy -n <its-namespace>`.",
  "tip": "Always pass the right `-n` namespace to helm list, upgrade, rollback and uninstall, and use `helm list -A` when you do not know where a release lives.",
  "check": [
   [
    "What is the difference between a chart and a release?",
    "A chart is the package; a release is a named installation of that chart in a cluster."
   ],
   [
    "Which command refreshes your local copy of repository indexes?",
    "`helm repo update`."
   ],
   [
    "How do you roll the release `api` back to revision 2?",
    "`helm rollback api 2` (with `-n` for its namespace), which creates a new revision matching revision 2."
   ]
  ]
 },
 {
  "t": "Helm values: helm show values, --set and -f values.yaml, helm template, namespaces with -n and --create-namespace",
  "body": [
   "Charts are customised through values. The chart's `values.yaml` holds defaults, and its templates read them with expressions such as `{{ .Values.replicaCount }}`. You override the defaults at install or upgrade time without editing the chart itself.",
   "Start by finding out what can be set. `helm show values bitnami/nginx` prints the chart's default values file; redirect it with `> values.yaml` to get an editable copy. `helm show chart` prints the chart metadata and `helm show readme` its documentation. For a release that is already installed, `helm get values <release>` shows the values you supplied, and `--all` includes the computed defaults.",
   "There are two ways to override. `-f my-values.yaml` (or `--values`) supplies a file containing only the keys you want to change; you can pass several files. `--set key=value` sets individual values on the command line, using dots for nesting: `--set service.type=NodePort`, `--set image.tag=1.27`. Lists use indexes such as `--set ingress.hosts[0].name=shop.local`, and commas separate multiple pairs. When the same key is set more than once, the last source wins, and `--set` values take priority over `-f` files.",
   "```bash\nhelm show values bitnami/nginx > values.yaml\n# edit values.yaml, keeping only what you change\nhelm install web bitnami/nginx -f values.yaml --set replicaCount=2 \\\n  -n shop --create-namespace\nhelm get values web -n shop\n```",
   "`helm template <release> <chart>` renders the manifests locally and prints them without contacting the cluster or creating a release. Use it to check what your values actually produce: `helm template web bitnami/nginx -f values.yaml | grep -A3 'kind: Service'`. You can also save the output and apply it with kubectl, though then Helm will not track it as a release. `helm install --dry-run` is similar but goes through the install process and prints what would be created.",
   "Namespaces follow the kubectl pattern. `-n shop` (or `--namespace`) chooses where the release and its resources go. If the namespace does not exist, install fails unless you add `--create-namespace`. Every later command on that release (`upgrade`, `rollback`, `uninstall`, `get values`) needs the same `-n`.",
   "On upgrade, be aware of how values carry over. By default, `helm upgrade` with no values flags reuses the previous release's values, but once you pass any `--set` or `-f`, it starts from the chart defaults plus what you pass. `--reuse-values` merges your new overrides onto the old ones, and `--reset-values` goes back to chart defaults. Check the outcome with `helm get values`."
  ],
  "terms": [
   [
    "values.yaml",
    "The chart's default configuration file read by its templates."
   ],
   [
    "--set",
    "Command-line override of individual values using dotted keys."
   ],
   [
    "-f / --values",
    "Supplies a YAML file of value overrides; can be repeated."
   ],
   [
    "helm template",
    "Renders chart manifests locally without installing anything."
   ]
  ],
  "example": "To install a chart with a NodePort Service in a new namespace, a developer runs `helm show values` to find the key name, then `helm install api ./api-chart -n staging --create-namespace --set service.type=NodePort`, and confirms with `kubectl get svc -n staging`.",
  "tip": "Find the exact key path with `helm show values` before using --set. A wrong key is silently ignored, so verify with `helm get values` or `helm template`.",
  "check": [
   [
    "If a value is set both in a -f file and with --set, which wins?",
    "The --set value."
   ],
   [
    "Which command renders a chart's manifests without touching the cluster?",
    "`helm template`."
   ],
   [
    "An install into namespace `qa` fails because the namespace is missing. What flag fixes it?",
    "`--create-namespace` together with `-n qa`."
   ]
  ]
 },
 {
  "t": "Kustomize: kustomization.yaml, resources, namePrefix, namespace, commonLabels/labels, images, patches, configMapGenerator",
  "body": [
   "Kustomize customises plain Kubernetes YAML without templates. You keep ordinary manifests and describe changes to apply on top of them in a file named `kustomization.yaml`. Kustomize is built into kubectl, so no extra tool is needed on the exam.",
   "`resources` lists the manifest files (or other kustomization directories) to include. The transformer fields then modify everything in that list. `namespace` sets the namespace on every namespaced resource. `namePrefix` and `nameSuffix` add text to every resource name, and Kustomize also updates references to those names, for example a Deployment's reference to a renamed ConfigMap.",
   "`commonLabels` adds labels to every resource and also to selectors and Pod templates. It is deprecated in favour of `labels`, a list of entries each with `pairs` and an `includeSelectors` flag. With `includeSelectors: false` (the default for `labels`) only metadata is labelled, which avoids changing a Deployment's immutable selector. `commonAnnotations` adds annotations the same way.",
   "```yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n- deployment.yaml\n- service.yaml\nnamespace: shop\nnamePrefix: prod-\nlabels:\n- pairs:\n    env: prod\n  includeSelectors: false\nimages:\n- name: nginx\n  newTag: \"1.27\"\npatches:\n- path: replicas-patch.yaml\n  target:\n    kind: Deployment\n    name: web\nconfigMapGenerator:\n- name: web-config\n  literals:\n  - LOG_LEVEL=info\n```",
   "`images` changes container images without editing the Deployment: match on `name` (the image name as written in the manifest) and set `newName`, `newTag` or `digest`. `patches` applies partial changes. A patch can be a strategic merge patch, a small YAML fragment that looks like the resource with only the fields you want to change, or a JSON 6902 patch with explicit `op`, `path` and `value`. Each entry gives the patch inline with `patch:` or from a file with `path:`, and can use `target` to select resources by kind, name or label.",
   "`configMapGenerator` builds ConfigMaps from `literals`, `files` or `envs` (an env file). `secretGenerator` does the same for Secrets. By default the generated name gets a hash of the content appended, such as `web-config-5g7k2m9b4t`, and Kustomize rewrites every reference to it. When the content changes, the name changes, so Deployments that use it get a new Pod template and roll out automatically. Set `generatorOptions: disableNameSuffixHash: true` if you need a fixed name.",
   "Older kustomizations may use `patchesStrategicMerge` and `patchesJson6902`; these still appear but are deprecated in favour of `patches`. If you meet them in a task, you can keep them or convert them."
  ],
  "terms": [
   [
    "kustomization.yaml",
    "The file that lists resources and the transformations Kustomize applies to them."
   ],
   [
    "namePrefix",
    "Text added to the start of every resource name, with references updated."
   ],
   [
    "labels / commonLabels",
    "Fields that add labels to all resources; commonLabels also changes selectors and is deprecated."
   ],
   [
    "patches",
    "Partial changes (strategic merge or JSON 6902) applied to selected resources."
   ],
   [
    "configMapGenerator",
    "Creates ConfigMaps from literals, files or env files, with a content hash in the name."
   ]
  ],
  "example": "A team keeps one Deployment and Service in a base folder. For production they add a kustomization with `namespace: prod`, `namePrefix: prod-`, an `images` entry setting the tag to 2.3, and a patch raising replicas to 6, without copying or editing the original YAML.",
  "tip": "The `images` name matches the image as written in the manifest, not the container name. Generated ConfigMaps have a hash suffix, so look them up with `kubectl get cm` rather than guessing the name.",
  "check": [
   [
    "What does `namespace: dev` in kustomization.yaml do?",
    "It sets the namespace of every namespaced resource in the build to dev."
   ],
   [
    "Why does configMapGenerator add a hash suffix to the name?",
    "So a content change produces a new name, updating references and triggering a rollout of Pods that use it."
   ],
   [
    "What risk does commonLabels carry for existing Deployments?",
    "It also adds labels to selectors, and Deployment selectors are immutable, so applying it to an existing Deployment can fail."
   ]
  ]
 },
 {
  "t": "Applying overlays with kubectl apply -k and previewing with kubectl kustomize",
  "body": [
   "Kustomize is usually organised as a base and one or more overlays. The base is a directory with the shared manifests and a `kustomization.yaml` listing them. Each overlay is another directory with its own `kustomization.yaml` that points at the base under `resources` and adds environment-specific changes: a namespace, a name prefix, more replicas, a different image tag, extra ConfigMap values. The base never needs to know which overlays exist.",
   "```text\napp/\n  base/\n    deployment.yaml\n    service.yaml\n    kustomization.yaml     # resources: [deployment.yaml, service.yaml]\n  overlays/\n    dev/\n      kustomization.yaml   # resources: [../../base], namespace: dev\n    prod/\n      kustomization.yaml   # resources: [../../base], namespace: prod, patches...\n      replicas.yaml\n```",
   "Before applying anything, preview the result. `kubectl kustomize overlays/prod` builds the overlay and prints the final YAML to standard output without touching the cluster. The standalone `kustomize build overlays/prod` command does the same if the separate tool is installed. Read the output to confirm the namespace, names, labels and images are what the task asked for. Piping it through `grep` is a quick check, for example `kubectl kustomize overlays/prod | grep -E 'namespace|image:'`.",
   "To apply the overlay, use the `-k` flag instead of `-f`: `kubectl apply -k overlays/prod`. kubectl builds the kustomization in memory and applies the result. The argument is always a directory containing a `kustomization.yaml`, not the file itself. The same flag works with other commands: `kubectl delete -k overlays/prod` removes everything the overlay creates, `kubectl diff -k overlays/prod` shows what would change against the live cluster, and `kubectl get -k overlays/prod` lists the resulting objects.",
   "```bash\nkubectl kustomize overlays/prod          # preview only\nkubectl diff -k overlays/prod            # compare with the cluster\nkubectl apply -k overlays/prod           # create or update\nkubectl get deploy -n prod\nkubectl delete -k overlays/prod          # clean up\n```",
   "Paths in `resources` are relative to the kustomization file that lists them, which is why an overlay usually writes `../../base`. A common error is 'accumulating resources ... must resolve to a file or a kustomization directory', which means a path is wrong. Another is applying an overlay that sets `namespace: prod` when that namespace does not exist; either create it first with `kubectl create namespace prod` or include a Namespace manifest in the resources.",
   "One more detail: the Kustomize version built into kubectl may lag behind the standalone tool, so very new fields might not be recognised. For the exam, stick with the core fields (`resources`, `namespace`, `namePrefix`, `labels`, `images`, `patches`, generators), which kubectl handles."
  ],
  "terms": [
   [
    "Base",
    "A kustomization directory holding shared manifests that overlays build upon."
   ],
   [
    "Overlay",
    "A kustomization that references a base and adds environment-specific changes."
   ],
   [
    "kubectl apply -k",
    "Builds the kustomization in a directory and applies the result to the cluster."
   ],
   [
    "kubectl kustomize",
    "Builds a kustomization and prints the resulting YAML without applying it."
   ]
  ],
  "example": "A task gives you /opt/app with base and overlays/staging. You run `kubectl kustomize /opt/app/overlays/staging` and notice the image tag is still old, fix the `images` entry, preview again, then run `kubectl apply -k /opt/app/overlays/staging` and confirm with `kubectl get pods -n staging`.",
  "tip": "`-k` takes a directory, not a file, and `kubectl kustomize` (no apply) is the safe preview. Use `kubectl diff -k` to see exactly what will change.",
  "check": [
   [
    "How do you see an overlay's final YAML without changing the cluster?",
    "`kubectl kustomize <overlay-dir>` (or `kustomize build <overlay-dir>`)."
   ],
   [
    "What does an overlay's resources list usually point at?",
    "The base directory, via a relative path such as ../../base."
   ],
   [
    "How do you remove everything an overlay created?",
    "`kubectl delete -k <overlay-dir>`."
   ]
  ]
 },
 {
  "t": "API deprecations and removals: finding current apiVersions with kubectl api-resources, api-versions and explain",
  "body": [
   "Every Kubernetes object has an `apiVersion` made of an API group and a version, such as `apps/v1` for Deployments or `batch/v1` for Jobs. Core objects like Pods, Services and ConfigMaps belong to the core group, written simply `v1`. APIs mature through alpha (for example `v1alpha1`), beta (`v1beta1`) and stable (`v1`) versions. Beta and alpha versions are eventually deprecated and then removed from the API server. After removal, a manifest that still uses the old version fails to apply, even though the object type itself still exists under a newer version.",
   "Kubernetes publishes a deprecation policy: stable (GA) versions are not removed within a major version, while beta versions are deprecated with notice before removal. When you use a deprecated version, the API server returns a warning, and kubectl prints it as `Warning: <group/version> <Kind> is deprecated ... use <new version>`. Treat those warnings as a to-do list.",
   "Three kubectl commands tell you what the cluster actually serves. `kubectl api-resources` lists every resource type with its short names, API version, whether it is namespaced, and its kind. Filter it: `kubectl api-resources | grep -i cronjob` shows `cronjobs  cj  batch/v1  true  CronJob`. `kubectl api-resources --api-group=networking.k8s.io` lists one group. `kubectl api-versions` lists every group/version pair served, one per line, so `kubectl api-versions | grep autoscaling` shows which HPA versions exist.",
   "```bash\nkubectl api-resources | grep -iE 'ingress|cronjob|horizontal'\nkubectl api-versions | grep -E 'batch|networking|autoscaling'\nkubectl explain ingress\nkubectl explain ingress.spec.rules.http.paths --recursive\nkubectl explain hpa --api-version=autoscaling/v2\n```",
   "`kubectl explain <resource>` shows the documentation for a type, starting with its GROUP and VERSION (the preferred version), and you can drill down field by field with dots, such as `kubectl explain deployment.spec.strategy`. `--recursive` prints the whole field tree, which is an excellent way to find the correct YAML structure during the exam without leaving the terminal. `--api-version` lets you explain a specific version.",
   "A practical routine for a manifest that fails with 'no matches for kind \"Ingress\" in version \"extensions/v1beta1\"': find the current version with `kubectl api-resources | grep ingress`, update `apiVersion`, then run `kubectl explain` on the parts whose structure changed and fix the fields. Finish with `kubectl apply --dry-run=server -f file.yaml`, which validates against the live API server without creating anything.",
   "There is also a `kubectl convert` plugin that rewrites manifests to newer versions, but it is not part of kubectl by default, so do not rely on it being installed."
  ],
  "terms": [
   [
    "apiVersion",
    "The API group and version of an object, such as apps/v1; core objects use just v1."
   ],
   [
    "Deprecation",
    "An API version is marked for future removal; it still works but produces warnings."
   ],
   [
    "kubectl api-resources",
    "Lists resource types with short names, API version, namespaced flag and kind."
   ],
   [
    "kubectl explain",
    "Shows documentation and field structure for a resource type and version."
   ]
  ],
  "example": "A developer inherits an old chart that sets `apiVersion: policy/v1beta1` on a PodDisruptionBudget. Applying it fails with 'no matches for kind'. `kubectl api-resources | grep -i disruption` shows `policy/v1`, so they update the apiVersion, check fields with `kubectl explain pdb.spec`, and validate with a server-side dry run.",
  "tip": "'no matches for kind X in version Y' almost always means the API version was removed. `kubectl api-resources | grep -i <kind>` gives the right one in seconds.",
  "check": [
   [
    "Which command lists every group/version the API server serves?",
    "`kubectl api-versions`."
   ],
   [
    "How can you see the YAML field structure of an Ingress rule without a browser?",
    "`kubectl explain ingress.spec.rules --recursive`."
   ],
   [
    "What does a deprecation warning from kubectl mean?",
    "The API version still works now but is scheduled for removal, so the manifest should be moved to the newer version."
   ]
  ]
 },
 {
  "t": "Updating manifests to supported API groups (networking.k8s.io/v1 Ingress, batch/v1 CronJob, autoscaling/v2 HPA)",
  "body": [
   "Changing `apiVersion` is sometimes all you need, but often the field structure changed too. The exam likes three examples, each with a stable version you should use today: Ingress in `networking.k8s.io/v1`, CronJob in `batch/v1` and HorizontalPodAutoscaler in `autoscaling/v2`.",
   "Ingress moved from `extensions/v1beta1` and `networking.k8s.io/v1beta1` to `networking.k8s.io/v1`, and the backend format changed. The old `serviceName` and `servicePort` fields became a nested `service` object with `name` and `port.number` (or `port.name`). Each path now requires a `pathType` of `Prefix`, `Exact` or `ImplementationSpecific`. The old `kubernetes.io/ingress.class` annotation is replaced by the `ingressClassName` field.",
   "```yaml\n# old (removed)\n#   backend:\n#     serviceName: web\n#     servicePort: 80\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port:\n              number: 80\n```",
   "CronJob moved from `batch/v1beta1` to `batch/v1`. Here the structure is essentially unchanged: `schedule`, `concurrencyPolicy`, `jobTemplate` and the history limits keep the same names. Usually you only change the apiVersion line, and optionally gain newer fields such as `timeZone`.",
   "HorizontalPodAutoscaler moved from `autoscaling/v2beta1` and `v2beta2` to `autoscaling/v2`. The `autoscaling/v1` version still exists but only supports a CPU target through `targetCPUUtilizationPercentage`. In v2, metrics are a list, and a resource metric is nested: `type: Resource`, then `resource.name: cpu` and `resource.target` with `type: Utilization` and `averageUtilization`. The v2beta1 style `targetAverageUtilization` field no longer exists.",
   "```yaml\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: web\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: web\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70\n```",
   "A fast, reliable method is to generate fresh YAML with the current version rather than hand-editing: `kubectl create ingress web --rule=\"shop.example.com/*=web:80\" --dry-run=client -o yaml` produces a v1 Ingress (the `*` makes the path a Prefix), `kubectl create cronjob` a batch/v1 CronJob, and `kubectl autoscale deploy web --min=2 --max=10 --cpu-percent=70 --dry-run=client -o yaml` an HPA you can compare with. Then copy over the settings from the old file and validate with `kubectl apply --dry-run=server -f`."
  ],
  "terms": [
   [
    "networking.k8s.io/v1",
    "Stable API group/version for Ingress and NetworkPolicy."
   ],
   [
    "pathType",
    "Required Ingress path field in v1: Prefix, Exact or ImplementationSpecific."
   ],
   [
    "autoscaling/v2",
    "Stable HPA version with a metrics list supporting resource, pods, object and external metrics."
   ],
   [
    "batch/v1",
    "Stable group/version for Job and CronJob."
   ]
  ],
  "example": "An old Ingress with `serviceName: api` and `servicePort: 8080` fails to apply. The developer changes the apiVersion to networking.k8s.io/v1, rewrites the backend as `service: {name: api, port: {number: 8080}}`, adds `pathType: Prefix`, and the server-side dry run passes.",
  "tip": "For Ingress, changing only the apiVersion is not enough: fix the backend format and add pathType. For CronJob, the apiVersion change is usually all that is needed.",
  "check": [
   [
    "What replaced `serviceName` and `servicePort` in a v1 Ingress backend?",
    "A nested `service` object with `name` and `port.number` or `port.name`."
   ],
   [
    "How is a 70% CPU target expressed in autoscaling/v2?",
    "In metrics: type Resource, resource name cpu, target type Utilization with averageUtilization 70."
   ],
   [
    "What is the stable apiVersion for CronJob?",
    "batch/v1."
   ]
  ]
 },
 {
  "t": "Liveness, readiness and startup probes; httpGet, tcpSocket, exec and grpc handlers; timing fields",
  "body": [
   "A running process is not necessarily a healthy one. It might be deadlocked, still loading data, or unable to reach its database. Probes let the kubelet on each node check a container regularly and act on the result. Kubernetes has three kinds, each answering a different question.",
   "A liveness probe asks, 'Is this container still working, or should it be restarted?' A readiness probe asks, 'Should this container receive traffic right now?' A startup probe asks, 'Has this slow-starting container finished starting yet?' While a startup probe is configured and has not yet succeeded, liveness and readiness probes are held off, so a slow start is not mistaken for a hang. After it succeeds once, it stops running and the other probes take over.",
   "Each probe uses one handler. `httpGet` sends an HTTP GET to a `path` and `port`; any status from 200 to 399 is success. `tcpSocket` succeeds if a TCP connection to the port can be opened. `exec` runs a command inside the container; exit code 0 is success. `grpc` calls the standard gRPC health checking service on a port, for apps that implement it. Choose the lightest handler that really reflects health: an HTTP health endpoint is common for web apps, a TCP check for plain network services.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  ports:\n  - containerPort: 8080\n  startupProbe:\n    httpGet: {path: /healthz, port: 8080}\n    failureThreshold: 30\n    periodSeconds: 10\n  livenessProbe:\n    httpGet: {path: /healthz, port: 8080}\n    periodSeconds: 10\n    failureThreshold: 3\n  readinessProbe:\n    tcpSocket: {port: 8080}\n    initialDelaySeconds: 5\n    periodSeconds: 5\n```",
   "Timing fields are shared by all probes. `initialDelaySeconds` (default 0) waits after the container starts before the first check. `periodSeconds` (default 10) is how often to probe. `timeoutSeconds` (default 1) is how long to wait for an answer. `failureThreshold` (default 3) is how many consecutive failures count as failure. `successThreshold` (default 1) is how many consecutive successes are needed after a failure; it must be 1 for liveness and startup probes.",
   "A startup probe's budget is `failureThreshold × periodSeconds`: the example allows up to 300 seconds to start before the container is restarted. This is better than a large `initialDelaySeconds` on the liveness probe, because checks begin as soon as the app is up rather than after a fixed wait.",
   "Probe results appear in `kubectl describe pod` under each container (the Liveness, Readiness and Startup lines show the configuration) and in the events, for example `Liveness probe failed: HTTP probe failed with statuscode: 500` or `Readiness probe failed: dial tcp ... connection refused`. The READY column of `kubectl get pods` reflects readiness."
  ],
  "terms": [
   [
    "Liveness probe",
    "Checks whether a container should be restarted."
   ],
   [
    "Readiness probe",
    "Checks whether a container should receive Service traffic."
   ],
   [
    "Startup probe",
    "Checks whether a slow container has started, holding off the other probes until it has."
   ],
   [
    "failureThreshold",
    "Consecutive failures needed before the probe is considered failed (default 3)."
   ],
   [
    "Probe handler",
    "The check method: httpGet, tcpSocket, exec or grpc."
   ]
  ],
  "example": "A Java service takes up to two minutes to warm up, and its liveness probe kept killing it at 30 seconds. Adding a startup probe with periodSeconds 10 and failureThreshold 15 gives it 150 seconds to start, after which the normal liveness probe with a short timeout takes over.",
  "tip": "Know the defaults: period 10s, timeout 1s, failureThreshold 3, successThreshold 1, initialDelay 0. For slow starters, the preferred answer is a startup probe, not a huge initialDelaySeconds.",
  "check": [
   [
    "Which HTTP status codes count as success for an httpGet probe?",
    "Any code from 200 up to 399."
   ],
   [
    "How long does a startup probe with periodSeconds 5 and failureThreshold 12 allow?",
    "About 60 seconds (5 x 12) before the container is restarted."
   ],
   [
    "What happens to liveness and readiness probes while a startup probe has not yet succeeded?",
    "They are not run; they start only after the startup probe succeeds."
   ]
  ]
 },
 {
  "t": "What each probe failure does: restart the container vs remove the Pod from Service endpoints",
  "body": [
   "The three probe types differ most in what happens when they fail. Mixing them up leads to either needless restarts or traffic sent to Pods that cannot handle it, so the exam tests these consequences directly.",
   "When a liveness probe fails `failureThreshold` times in a row, the kubelet kills the container and restarts it according to the Pod's `restartPolicy`. The Pod stays on the same node with the same name and IP; only the container is replaced, and the RESTARTS count in `kubectl get pods` goes up. Repeated liveness failures lead to growing back-off delays and the CrashLoopBackOff status. Events show `Liveness probe failed` followed by `Container api failed liveness probe, will be restarted`.",
   "When a readiness probe fails, nothing is restarted. The kubelet marks the container not ready, the Pod's Ready condition becomes False (the READY column shows `0/1`), and the Pod's address is marked not ready in the Service's EndpointSlices, so Services and Ingresses stop sending it new traffic. When the probe passes again, the Pod is automatically added back. Readiness keeps running for the whole life of the container, so it can take a Pod out of rotation temporarily, for example while it is overloaded or a dependency is down.",
   "When a startup probe fails `failureThreshold` times, the container is killed and restarted, just like a liveness failure. Until it succeeds, the container is also not ready, so it gets no traffic.",
   "```text\nProbe      On failure                      Pod leaves Service?  Container restarted?\nstartup    kill + restart after threshold  yes (not ready yet)  yes\nliveness   kill + restart after threshold  (while restarting)   yes\nreadiness  mark not ready                  yes                  no\n```",
   "Readiness also drives rollouts: a Deployment counts a new Pod as available only when it is ready, so a failing readiness probe halts a rolling update and protects users from a broken version. A Pod with no readiness probe is considered ready as soon as its containers start.",
   "Design guidance follows from this. Make liveness checks simple and local, testing only whether this process is alive; if liveness depends on a database, a database outage restarts every Pod at once and makes things worse. Put dependency checks in readiness instead, so Pods step out of rotation without restarting. When troubleshooting, a rising restart count points to liveness or startup failures, while Pods that are Running but `0/1` ready, and a Service with no ready endpoints, point to readiness."
  ],
  "terms": [
   [
    "Restart",
    "The liveness/startup failure action: the kubelet kills the container and starts it again in the same Pod."
   ],
   [
    "Not ready",
    "The readiness failure state: the Pod stays running but is removed from Service endpoints."
   ],
   [
    "Ready condition",
    "Pod status condition shown in the READY column that decides whether the Pod receives Service traffic."
   ]
  ],
  "example": "During a cache rebuild an API Pod's readiness endpoint returns 503 for a minute. `kubectl get pods` shows it as Running 0/1, the Service routes around it, and when the rebuild finishes it returns to 1/1 with zero restarts. Had the same check been used for liveness, the Pod would have been restarted mid-rebuild.",
  "tip": "Liveness fails: container restarts. Readiness fails: Pod leaves the Service but keeps running. If a question mentions restarts climbing, think liveness; if it mentions no traffic but no restarts, think readiness.",
  "check": [
   [
    "A Pod shows Running, READY 0/1 and 0 restarts. Which probe is failing?",
    "The readiness probe; readiness failures do not restart the container."
   ],
   [
    "Why should a liveness probe not check a shared database?",
    "A database outage would make every Pod fail liveness and restart at once, causing more disruption without fixing anything."
   ],
   [
    "What does a failed startup probe do after its threshold?",
    "It kills and restarts the container, like a liveness failure."
   ]
  ]
 },
 {
  "t": "Kubectl get, describe, get events, top pod/node (metrics-server) for monitoring",
  "body": [
   "Monitoring an application in Kubernetes starts with four kubectl commands. Each answers a different question, and knowing which to reach for saves minutes on every exam task.",
   "`kubectl get` answers 'What exists and what state is it in?' It prints a one-line summary per object: for Pods the READY count, STATUS, RESTARTS and AGE. Combine types with commas (`kubectl get deploy,rs,pods,svc`), filter with labels (`-l app=web`), look across namespaces (`-A`) and watch changes live (`-w`). `kubectl get all` shows the common workload and Service types in a namespace but not ConfigMaps, Secrets, PVCs or Ingresses.",
   "`kubectl describe` answers 'Why is it in that state?' It shows the full, human-readable view of one object, including related information that `get` omits: container states and last termination reasons, exit codes, probe settings, mounted volumes, the node, resource requests and, crucially, the Events section at the bottom. For a Pod stuck in Pending, describe shows scheduling failures such as insufficient CPU; for a Service it shows the endpoints; for a Deployment, its rollout conditions.",
   "`kubectl get events` answers 'What has happened recently in this namespace?' Events are short-lived records created by controllers, the scheduler and the kubelet: scheduling decisions, image pulls, probe failures, OOM kills, back-offs. They are kept for only a limited time (an hour by default on many clusters), so check them soon. Sort them in time order with `kubectl get events --sort-by=.metadata.creationTimestamp`, filter warnings with `--field-selector type=Warning`, or narrow to one object with `--field-selector involvedObject.name=web-5d8f7`. `kubectl events` is a newer command with similar output and a `--for pod/web-5d8f7` option.",
   "```bash\nkubectl get pods -o wide -w\nkubectl describe pod web-5d8f7\nkubectl get events -A --field-selector type=Warning\nkubectl get events --sort-by=.metadata.creationTimestamp\nkubectl top node\nkubectl top pod -A --sort-by=memory\nkubectl top pod web-5d8f7 --containers\n```",
   "`kubectl top` answers 'How much CPU and memory is it using right now?' It needs the metrics-server add-on, which collects resource usage from each kubelet and serves it through the Metrics API. Without it you get an error saying metrics are not available; in minikube you enable it with `minikube addons enable metrics-server`. `kubectl top node` shows usage per node, `kubectl top pod` per Pod, `--containers` breaks a Pod down by container, and `--sort-by=cpu` or `--sort-by=memory` orders the list. The numbers are recent samples, not history, and are shown in millicores (`m`) and mebibytes (`Mi`). The same Metrics API feeds the HorizontalPodAutoscaler.",
   "A classic exam task is 'find the Pod using the most CPU in namespace X and write its name to a file': `kubectl top pod -n X --sort-by=cpu --no-headers | head -1 | awk '{print $1}' > /path/file`."
  ],
  "terms": [
   [
    "kubectl describe",
    "Detailed view of one object including related status and recent events."
   ],
   [
    "Event",
    "A short-lived record of something that happened to an object, such as a scheduling failure or image pull."
   ],
   [
    "metrics-server",
    "Cluster add-on that collects CPU and memory usage from kubelets for kubectl top and the HPA."
   ],
   [
    "kubectl top",
    "Shows current CPU and memory usage of nodes or Pods from the Metrics API."
   ]
  ],
  "example": "A Pod has been Pending for five minutes. `kubectl get pod` only says Pending, but `kubectl describe pod` shows the event '0/3 nodes are available: 3 Insufficient memory', which leads the developer to lower the Pod's memory request.",
  "tip": "`get` tells you what, `describe` and events tell you why, `top` tells you how much. If `kubectl top` errors, metrics-server is missing or not ready yet.",
  "check": [
   [
    "Which command shows why a Pod is stuck in Pending?",
    "`kubectl describe pod <name>` (its Events section), or `kubectl get events`."
   ],
   [
    "What does `kubectl top` depend on?",
    "The metrics-server add-on providing the Metrics API."
   ],
   [
    "How do you list recent events in time order?",
    "`kubectl get events --sort-by=.metadata.creationTimestamp`."
   ]
  ]
 },
 {
  "t": "Container logs: kubectl logs with -c, -f, --previous, --tail, --since, -l and deploy/<name>",
  "body": [
   "Containers are expected to write logs to standard output and standard error. The container runtime captures those streams into files on the node, and `kubectl logs` reads them through the kubelet. If an application writes only to a file inside the container, `kubectl logs` shows nothing; that is one reason for the sidecar pattern that tails such files to stdout.",
   "The basic form is `kubectl logs <pod>`. If the Pod has more than one container, you must say which with `-c <container>`, otherwise kubectl picks the default container (set by the `kubectl.kubernetes.io/default-container` annotation) or asks you to choose. `--all-containers` prints every container's logs, including init containers. Init container logs are reached the same way: `kubectl logs mypod -c init-db`.",
   "`-f` (follow) streams new lines as they arrive until you press Ctrl-C, like `tail -f`. `--tail=50` shows only the last 50 lines, which is useful for chatty apps. `--since=10m` or `--since=1h` limits output to a recent time window, and `--timestamps` prefixes each line with its time. These can be combined: `kubectl logs web-5d8f7 --since=5m -f`.",
   "`--previous` (or `-p`) shows the logs of the previous instance of a container, the one that crashed or was restarted. This is essential for CrashLoopBackOff: the current container may have just started and have no useful output, while the crash reason, such as a stack trace or 'config file not found', is in the previous instance. Only the most recent terminated instance is kept.",
   "```bash\nkubectl logs web-5d8f7 -c app --tail=100\nkubectl logs web-5d8f7 -c app --previous\nkubectl logs -f deploy/web\nkubectl logs -l app=web --all-containers --prefix --since=15m\nkubectl logs job/migrate\n```",
   "You can name a controller instead of a Pod: `kubectl logs deploy/web` or `kubectl logs job/migrate` picks one Pod belonging to it, which saves you from looking up generated names. It shows only one Pod, though. To read logs from many Pods at once, use a label selector: `kubectl logs -l app=web`. With `-l`, kubectl shows a limited number of recent lines per Pod by default and follows a limited number of Pods concurrently (`--max-log-requests`); `--prefix` labels each line with its Pod and container name.",
   "Logs live on the node and disappear when the Pod is deleted or the node rotates them, so `kubectl logs` is for recent troubleshooting, not long-term storage; clusters use a log collector (often a DaemonSet) for that. On the exam, you may be asked to save logs to a file: `kubectl logs mypod -c app > /opt/logs/app.log`."
  ],
  "terms": [
   [
    "-c",
    "Selects which container's logs to show in a multi-container Pod."
   ],
   [
    "--previous",
    "Shows logs from the last terminated instance of the container."
   ],
   [
    "-f",
    "Follows the log stream as new lines are written."
   ],
   [
    "-l",
    "Selects Pods by label to show logs from several Pods at once."
   ]
  ],
  "example": "A Pod is in CrashLoopBackOff and `kubectl logs api-7c9` prints only a start-up banner. Running `kubectl logs api-7c9 --previous` shows the real error from the crashed instance: 'DATABASE_URL is not set', pointing to a missing environment variable.",
  "tip": "For crashing containers, reach for `--previous` first. For multi-container Pods, `-c` is required to get the right container.",
  "check": [
   [
    "How do you see why the last instance of a container crashed?",
    "`kubectl logs <pod> -c <container> --previous`."
   ],
   [
    "What does `kubectl logs deploy/web` show?",
    "Logs from one Pod belonging to the Deployment, not all of them."
   ],
   [
    "How do you show only log lines from the last 30 minutes?",
    "Add `--since=30m`."
   ]
  ]
 },
 {
  "t": "Reading Pod status: Pending, ImagePullBackOff, CrashLoopBackOff, OOMKilled, Completed, exit codes",
  "body": [
   "The STATUS column of `kubectl get pods` is a compact summary of a Pod's phase and its containers' states. Learning to read it tells you where to look next and saves a lot of guessing.",
   "Pending means the Pod was accepted but its containers are not running yet. Either it has not been scheduled (not enough CPU or memory on any node, a nodeSelector or taint that no node satisfies, or an unbound PVC) or it is scheduled and still pulling images or setting up volumes. `kubectl describe pod` shows which: a FailedScheduling event, or a ContainerCreating state with events about volumes. A missing ConfigMap or Secret referenced by the Pod typically shows as ContainerCreating or CreateContainerConfigError.",
   "ErrImagePull and then ImagePullBackOff mean the kubelet cannot pull the image: a typo in the image name or tag, a private registry without `imagePullSecrets`, or no network path to the registry. BackOff means Kubernetes is waiting longer and longer between retries. The event text, such as 'manifest unknown' or 'unauthorized', tells you which problem it is.",
   "CrashLoopBackOff means the container starts, exits, is restarted and exits again, with growing delays between attempts. The container itself is the problem: the application errors on start-up, the command is wrong, a required file or variable is missing, or a liveness probe keeps killing it. Check `kubectl logs --previous` and the Last State section in `kubectl describe pod`, which shows the reason and exit code.",
   "OOMKilled means the container used more memory than its limit, so the kernel killed it. It appears as the termination reason in Last State, usually with exit code 137, and often leads to CrashLoopBackOff. The fix is to raise the memory limit or reduce the application's memory use. Completed means all containers exited with code 0, which is the normal end state for Job Pods; for a Deployment Pod, which should run forever, it means the command finished when it should have kept running, and because its restartPolicy is Always the kubelet restarts it until it shows CrashLoopBackOff.",
   "Exit codes tell you how a process ended. 0 is success. 1 (or another small number) is a general application error. 126 means the command was found but could not be executed, often a permission problem. 127 means command not found, typically a typo in `command` or a binary missing from the image. Codes above 128 mean the process was killed by a signal, where the code is 128 plus the signal number: 137 is 128 + 9 (SIGKILL, as used by the OOM killer or after a forced termination) and 143 is 128 + 15 (SIGTERM, a normal graceful stop).",
   "```bash\nkubectl get pods\nkubectl describe pod api-7c9 | grep -A5 'Last State'\nkubectl get pod api-7c9 -o jsonpath='{.status.containerStatuses[0].lastState.terminated.exitCode}'\n```"
  ],
  "terms": [
   [
    "Pending",
    "Pod accepted but containers not running yet, often unscheduled or still creating."
   ],
   [
    "ImagePullBackOff",
    "The image cannot be pulled and Kubernetes is backing off between retries."
   ],
   [
    "CrashLoopBackOff",
    "The container keeps exiting after start and is restarted with increasing delays."
   ],
   [
    "OOMKilled",
    "The container was killed for exceeding its memory limit, usually with exit code 137."
   ],
   [
    "Exit code 128+n",
    "A process killed by signal n, such as 137 for SIGKILL or 143 for SIGTERM."
   ]
  ],
  "example": "A new Pod shows ImagePullBackOff. `kubectl describe pod` shows 'failed to pull image \"ngnix:1.27\": not found'. The image name was misspelled; after fixing it with `kubectl set image` the Pod starts. Another Pod in the same app shows OOMKilled with exit code 137, so its memory limit is raised.",
  "tip": "Map status to the next command: Pending and ImagePullBackOff lead to `describe`, CrashLoopBackOff leads to `logs --previous`, and OOMKilled leads to the memory limit.",
  "check": [
   [
    "What does exit code 127 usually mean?",
    "Command not found: a wrong command or a binary missing from the image."
   ],
   [
    "A container shows OOMKilled with exit code 137. What caused it?",
    "It exceeded its memory limit and was killed with SIGKILL (128 + 9)."
   ],
   [
    "A Deployment's Pod shows Completed and keeps restarting. What is likely wrong?",
    "Its command runs to completion instead of staying in the foreground; with restartPolicy Always the kubelet keeps restarting the container, which soon shows CrashLoopBackOff."
   ]
  ]
 },
 {
  "t": "Debugging: kubectl exec, kubectl debug (ephemeral containers and Pod copies), port-forward, temporary busybox Pods",
  "body": [
   "Logs and events do not always explain a problem. Sometimes you need to get inside the Pod's environment, test the network from within the cluster, or reach an app from your own terminal. kubectl gives you four tools for this.",
   "`kubectl exec` runs a command inside a running container. `kubectl exec web-5d8f7 -- cat /etc/nginx/nginx.conf` runs one command; `kubectl exec -it web-5d8f7 -c app -- sh` opens an interactive shell (`-i` keeps standard input open, `-t` allocates a terminal). Everything after `--` is the command. Use it to check files, environment variables (`env`), mounted volumes and connectivity. It only works if the container is running and the image actually contains the tool you call; minimal and distroless images often have no shell at all.",
   "`kubectl debug` handles those cases. With an ephemeral container, `kubectl debug -it web-5d8f7 --image=busybox --target=app`, kubectl adds a temporary container to the running Pod. It shares the Pod's network, and with `--target` it shares the process namespace of that container, so you can see its processes. Ephemeral containers cannot be removed or restarted and have no ports or probes; they exist purely for troubleshooting. With a copy, `kubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh`, kubectl creates a new Pod based on the original and lets you change its command or image, useful when the original crashes immediately and you want to start it with a shell instead. Delete the copy afterwards.",
   "```bash\nkubectl exec -it web-5d8f7 -c app -- sh\nkubectl debug -it web-5d8f7 --image=busybox --target=app\nkubectl debug web-5d8f7 -it --copy-to=web-debug --container=app -- sh\nkubectl port-forward pod/web-5d8f7 8080:80\nkubectl port-forward svc/web 8080:80\nkubectl run tmp --image=busybox --rm -it --restart=Never -- sh\n```",
   "`kubectl port-forward` opens a tunnel from a port on your machine, through the API server, to a Pod. `kubectl port-forward pod/web-5d8f7 8080:80` makes `curl localhost:8080` reach port 80 in the Pod. You can target `svc/web` or `deploy/web`, but kubectl still picks a single Pod behind it; it does not load-balance. It runs in the foreground until stopped; add `&` in a shell to background it. It is ideal for testing an app without creating a Service or Ingress.",
   "A temporary Pod tests things from inside the cluster network, as another Pod would see them. `kubectl run tmp --image=busybox --rm -it --restart=Never -- sh` gives you a shell that is deleted when you exit. From there, `wget -qO- web.default.svc.cluster.local` tests a Service, and `nslookup web` tests DNS. For a single check, `kubectl run tmp --image=busybox --rm -it --restart=Never -- wget -qO- -T 2 web:80` prints the result and cleans up. This is the fastest way to confirm a NetworkPolicy blocks or allows traffic. The `curlimages/curl` or `nicolaka/netshoot` images are alternatives when you need more tools.",
   "Pick the tool by question: inside the app's container, use exec; tools missing or container crashing, use debug; from your laptop, use port-forward; as another Pod would see it, use a temporary Pod."
  ],
  "terms": [
   [
    "kubectl exec",
    "Runs a command, or an interactive shell with -it, inside a running container."
   ],
   [
    "Ephemeral container",
    "A temporary debugging container added to a running Pod by kubectl debug."
   ],
   [
    "kubectl debug --copy-to",
    "Creates a modified copy of a Pod for troubleshooting."
   ],
   [
    "kubectl port-forward",
    "Tunnels a local port to a port on a Pod through the API server."
   ]
  ],
  "example": "A distroless Go service returns errors but has no shell for exec. The developer runs `kubectl debug -it api-6f4 --image=busybox --target=api`, then uses `wget` from the ephemeral container to confirm the app answers on localhost:8080 but cannot reach the database hostname, which points to a DNS configuration issue.",
  "tip": "Remember `--rm -it --restart=Never` for throwaway test Pods, and that port-forward to a Service still reaches only one Pod.",
  "check": [
   [
    "What can you do when a container image has no shell?",
    "Use `kubectl debug` to add an ephemeral container with tools such as busybox, sharing the Pod's network and optionally its process namespace."
   ],
   [
    "What does `kubectl port-forward svc/web 8080:80` do?",
    "Forwards local port 8080 to port 80 of one Pod selected by the Service."
   ],
   [
    "Why test a Service from a temporary busybox Pod rather than your terminal?",
    "It sees the cluster network and DNS as other Pods do, including NetworkPolicy effects."
   ]
  ]
 },
 {
  "t": "Output tricks for fast troubleshooting: -o wide, -o yaml, jsonpath, --show-labels, --sort-by",
  "body": [
   "Many CKAD tasks end with 'write the result to a file'. The quicker you can pull exactly the right field out of the API, the more time you have for hard tasks. kubectl's output options are the tools for that.",
   "`-o wide` adds extra columns: for Pods the Pod IP, the node and nominated node; for Deployments the container names, images and selector; for Services the selector. It is the fastest way to see which node a Pod landed on or which image a Deployment runs. `--show-labels` adds a LABELS column, and `-L app,tier` adds one column per named label. Together with `-l` (filter by label), these make selector problems easy to spot.",
   "`-o yaml` prints the full object as stored by the API server, including status and defaulted fields. Use it to see exactly what is running, and as a starting point for new manifests: `kubectl get deploy web -o yaml > web.yaml`. Remove server-managed fields such as `status`, `uid`, `resourceVersion` and `creationTimestamp` before reusing it. Combined with `--dry-run=client`, `-o yaml` generates new manifests from imperative commands without creating anything.",
   "`-o jsonpath='{...}'` extracts specific fields. The expression walks the object from the top: `{.metadata.name}`, `{.spec.containers[0].image}`, `{.status.podIP}`. For lists returned by `get pods`, start from `.items`: `{.items[*].metadata.name}` prints all names on one line. `[*]` means all elements, `[0]` the first, and filters look like `[?(@.type==\"Ready\")]`. For one item per line, use `{range .items[*]}{.metadata.name}{\"\\n\"}{end}`. Wrap the expression in single quotes so the shell leaves it alone.",
   "```bash\nkubectl get pods -o wide --show-labels\nkubectl get pods -L app,version\nkubectl get pod web-5d8f7 -o jsonpath='{.status.podIP}'\nkubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'\nkubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.phase}{\"\\n\"}{end}'\nkubectl get pods --sort-by=.metadata.creationTimestamp\nkubectl get pods --sort-by='.status.containerStatuses[0].restartCount'\nkubectl get pods -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName\n```",
   "`--sort-by` orders the list by any field, written as a JSONPath expression relative to each item (no `.items`): sort by creation time, restart count or name. `-o custom-columns=` builds your own table with header names and field paths, often clearer than jsonpath for several fields. `-o name` prints just `pod/web-5d8f7` style names, handy in loops, and `--no-headers` drops the header row for scripts.",
   "If you do not know the path to a field, run `-o yaml` once, find the field, and write the path from the top of the object. `kubectl explain` also shows the structure. Always check the file you wrote with `cat` before moving on."
  ],
  "terms": [
   [
    "-o wide",
    "Adds extra columns such as Pod IP, node and images."
   ],
   [
    "-o yaml",
    "Prints the complete object, including status and defaults."
   ],
   [
    "jsonpath",
    "Output template that extracts specific fields from the object tree."
   ],
   [
    "--sort-by",
    "Orders list output by a field given as a JSONPath expression."
   ],
   [
    "custom-columns",
    "Output format that builds a table from named field paths."
   ]
  ],
  "example": "A task asks for the names of all Pods in namespace `ops`, sorted by age, one per line, saved to /opt/pods.txt. You run `kubectl get pods -n ops --sort-by=.metadata.creationTimestamp -o custom-columns=NAME:.metadata.name --no-headers > /opt/pods.txt` and check it with `cat`.",
  "tip": "For `kubectl get pods` (a list) jsonpath starts at `.items`, but `--sort-by` paths are relative to each item. Always single-quote jsonpath expressions.",
  "check": [
   [
    "Which flag quickly shows the node each Pod is running on?",
    "`-o wide`."
   ],
   [
    "Write a jsonpath to print the image of the first container of Pod web.",
    "`kubectl get pod web -o jsonpath='{.spec.containers[0].image}'`."
   ],
   [
    "How do you list Pods ordered by restart count?",
    "`kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'`."
   ]
  ]
 },
 {
  "t": "Extending Kubernetes: CustomResourceDefinitions, custom resources and Operators; discovering them with kubectl get crd and api-resources",
  "body": [
   "Kubernetes ships with built-in types such as Pods, Services and Deployments, but its API is designed to be extended. A CustomResourceDefinition (CRD) adds a new resource type to the API server. Once a CRD exists, you can create, list, edit and delete objects of that type with kubectl exactly like built-in objects. Those objects are called custom resources.",
   "A CRD declares the new type's API `group`, its `versions` (with an OpenAPI v3 schema that validates fields), its `scope` (Namespaced or Cluster), and its `names`: the kind, plural, singular and optional short names. The CRD's own name must be `<plural>.<group>`, for example `backups.example.com`.",
   "```yaml\napiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: backups.example.com\nspec:\n  group: example.com\n  scope: Namespaced\n  names:\n    plural: backups\n    singular: backup\n    kind: Backup\n    shortNames: [bk]\n  versions:\n  - name: v1\n    served: true\n    storage: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              schedule: {type: string}\n              retainDays: {type: integer}\n---\napiVersion: example.com/v1\nkind: Backup\nmetadata:\n  name: nightly\nspec:\n  schedule: \"0 1 * * *\"\n  retainDays: 7\n```",
   "A CRD on its own only stores data. Something has to act on it. That is a controller: a program, usually running as a Deployment in the cluster, that watches objects of a type and works to make the real world match their spec. An Operator is a controller plus CRDs that together encode the operational knowledge for a particular application, such as how to deploy, back up, upgrade or fail over a database. You declare `kind: PostgresCluster` with three replicas, and the Operator creates the StatefulSets, Services, Secrets and backups for you.",
   "Discovering what extensions exist is a common exam starter. `kubectl get crd` (short for customresourcedefinitions) lists all CRDs with their creation times. `kubectl api-resources --api-group=example.com` shows the resource names, short names and whether they are namespaced. `kubectl explain backup.spec` works for CRDs that define a schema. Then use the plural, singular, or short name as normal: `kubectl get backups -A`, `kubectl get bk nightly -o yaml`, `kubectl describe backup nightly`.",
   "```bash\nkubectl get crd\nkubectl get crd backups.example.com -o yaml\nkubectl api-resources | grep example.com\nkubectl get backups -n prod\nkubectl apply -f nightly-backup.yaml\n```",
   "Deleting a CRD deletes every custom resource of that type, so treat it with care. And if you apply a custom resource before its CRD exists, you get the error 'no matches for kind \"Backup\" in version \"example.com/v1\"'; install the CRD (often part of an Operator's Helm chart) first."
  ],
  "terms": [
   [
    "CustomResourceDefinition (CRD)",
    "An object that registers a new resource type with the Kubernetes API."
   ],
   [
    "Custom resource",
    "An object of a type defined by a CRD, managed with kubectl like built-in objects."
   ],
   [
    "Controller",
    "A program that watches objects and acts to make actual state match their spec."
   ],
   [
    "Operator",
    "A controller plus CRDs that automate running a specific application."
   ]
  ],
  "example": "A platform team installs a certificate Operator. `kubectl get crd | grep cert` shows new types such as Certificate and Issuer. A developer then writes a short `kind: Certificate` manifest for their app's hostname, and the Operator's controller obtains the certificate and stores it in a Secret the Ingress uses.",
  "tip": "The CRD name is `<plural>.<group>`, and custom resources use `apiVersion: <group>/<version>`. `kubectl api-resources` tells you the exact plural and short names to use.",
  "check": [
   [
    "What happens if you apply a custom resource whose CRD is not installed?",
    "The API server rejects it with a 'no matches for kind' error."
   ],
   [
    "What makes an Operator more than a CRD?",
    "A controller that watches the custom resources and performs the actions to realise them."
   ],
   [
    "How do you list all CRDs in a cluster?",
    "`kubectl get crd`."
   ]
  ]
 },
 {
  "t": "Request flow: authentication, authorization (RBAC) and admission control (mutating and validating)",
  "body": [
   "Every change in Kubernetes goes through the API server: kubectl, controllers, the kubelet and your own applications all send it HTTPS requests. Before a request can create or change an object, it passes through three gates in a fixed order: authentication, authorization and admission control. Knowing the order helps you interpret errors.",
   "Authentication answers 'Who are you?' The API server tries its configured authenticators: client certificates (common in kubeconfig files for administrators), bearer tokens (including ServiceAccount tokens used by Pods), and external identity providers through OpenID Connect (OIDC). Kubernetes has no User object; a human user is just a name and groups asserted by a trusted credential. ServiceAccounts, in contrast, are real objects and appear as `system:serviceaccount:<namespace>:<name>`. If no authenticator accepts the request, it fails with 401 Unauthorized. `kubectl auth whoami` shows who the API server thinks you are.",
   "Authorization answers 'Are you allowed to do this?' The request is described as a verb (get, list, watch, create, update, patch, delete), a resource (and optional subresource such as `pods/log`), an API group, a namespace and a name. The configured authorizers, usually Node and RBAC (Role-Based Access Control), decide. RBAC is purely additive: there are no deny rules, and anything not explicitly allowed is denied. A refusal returns 403 Forbidden with a message such as `User \"jane\" cannot list resource \"pods\" in API group \"\" in the namespace \"prod\"`.",
   "Admission control answers 'Is this particular object acceptable, and should it be adjusted?' It applies to requests that create, update or delete objects, not to reads. Mutating admission runs first and may change the object: the ServiceAccount admission controller fills in the default ServiceAccount, LimitRanger adds default requests and limits, and mutating webhooks can inject sidecars. The object is then validated against its schema. Validating admission runs next and can only accept or reject: ResourceQuota rejects objects that would exceed a namespace quota, Pod Security Admission rejects Pods that break the namespace's security level, and ValidatingAdmissionPolicies or validating webhooks enforce custom rules. If all pass, the object is stored in etcd.",
   "```text\nkubectl -> API server\n  1. Authentication   (who?)          fail -> 401 Unauthorized\n  2. Authorization    (allowed?)      fail -> 403 Forbidden\n  3. Mutating admission (adjust)\n  4. Schema validation\n  5. Validating admission (accept?)   fail -> error naming the policy or quota\n  6. Persist to etcd\n```",
   "Reading errors with this in mind is a practical exam skill. 'forbidden: User ... cannot create resource' is authorization, fixed with RBAC. 'forbidden: exceeded quota' comes from the ResourceQuota admission controller and is fixed by lowering requests or raising the quota. 'violates PodSecurity \"restricted:latest\"' comes from Pod Security Admission and is fixed in the Pod's securityContext. And a Pod that gained resources or a sidecar you did not write was modified by mutating admission. For Deployments, admission rejections of Pods appear in the ReplicaSet's events, not the Deployment's, so check `kubectl describe rs`."
  ],
  "terms": [
   [
    "Authentication",
    "Establishing who is making the request; failure returns 401."
   ],
   [
    "Authorization",
    "Deciding whether the identity may perform the verb on the resource; failure returns 403."
   ],
   [
    "Mutating admission",
    "Admission step that can modify an object before it is stored."
   ],
   [
    "Validating admission",
    "Admission step that accepts or rejects an object without changing it."
   ]
  ],
  "example": "A Deployment shows 0/3 ready and no Pods exist. `kubectl describe rs` shows 'pods \"web-...\" is forbidden: exceeded quota: compute, requested: limits.memory=512Mi'. The request passed authentication and RBAC, but the validating ResourceQuota admission controller rejected the Pods.",
  "tip": "Order: authentication, authorization, mutating admission, validation, validating admission. 401 means identity, 403 with 'cannot' means RBAC, and quota or PodSecurity messages mean admission.",
  "check": [
   [
    "Which stage returns 401 Unauthorized?",
    "Authentication, when no authenticator accepts the credentials."
   ],
   [
    "Does admission control run on `kubectl get`?",
    "No; admission applies to create, update and delete requests, not reads."
   ],
   [
    "Which runs first, mutating or validating admission, and why?",
    "Mutating, so that validating controllers check the final, modified object."
   ]
  ]
 },
 {
  "t": "RBAC objects: Role, ClusterRole, RoleBinding, ClusterRoleBinding; kubectl auth can-i with --as",
  "body": [
   "Role-Based Access Control (RBAC) grants permissions through two kinds of objects: roles, which list what actions are allowed, and bindings, which give those roles to users, groups or ServiceAccounts. Permissions are only ever added; there is no way to write a deny rule.",
   "A Role holds rules that apply within one namespace. Each rule lists `apiGroups`, `resources` and `verbs`. The core group, which holds Pods, Services, ConfigMaps and Secrets, is written as the empty string `\"\"`. Deployments are in `apps`, Jobs in `batch`. Resources are lowercase plurals, and subresources are written with a slash, such as `pods/log` or `pods/exec`. Verbs include `get`, `list`, `watch`, `create`, `update`, `patch`, `delete` and `*`. You can restrict a rule to named objects with `resourceNames`.",
   "A ClusterRole has the same structure but is not namespaced. It is used for cluster-scoped resources such as nodes or PersistentVolumes, for non-resource URLs, or as a reusable set of permissions for many namespaces. Kubernetes ships ClusterRoles such as `view`, `edit` and `admin`.",
   "A RoleBinding grants a Role, or a ClusterRole, to subjects within one namespace. Binding a ClusterRole with a RoleBinding is a common pattern: define `pod-reader` once as a ClusterRole, then grant it namespace by namespace. A ClusterRoleBinding grants a ClusterRole across all namespaces and for cluster-scoped resources. A binding's `roleRef` cannot be changed after creation; delete and recreate the binding to switch roles.",
   "```bash\nkubectl create role pod-reader -n dev --verb=get,list,watch --resource=pods,pods/log\nkubectl create rolebinding ci-reads-pods -n dev --role=pod-reader \\\n  --serviceaccount=dev:ci-bot --user=jane\nkubectl create clusterrole node-viewer --verb=get,list --resource=nodes\nkubectl create clusterrolebinding ops-nodes --clusterrole=node-viewer --group=ops\n```",
   "Subjects are of kind `User`, `Group` or `ServiceAccount`. On the command line, `--serviceaccount` takes `namespace:name`, a frequent source of mistakes. Inside YAML a ServiceAccount subject needs its `namespace` field.",
   "Test permissions without switching credentials by using impersonation. `kubectl auth can-i create deployments -n dev` checks yourself and prints yes or no. `kubectl auth can-i list pods -n dev --as=jane` checks as a user, and `--as=system:serviceaccount:dev:ci-bot` checks as a ServiceAccount. `kubectl auth can-i --list -n dev --as=system:serviceaccount:dev:ci-bot` lists everything that account may do. Impersonating requires that you yourself are allowed the `impersonate` verb, which cluster administrators normally are.",
   "Follow least privilege: grant only the verbs and resources an application needs, in the namespace it runs in, and prefer RoleBindings over ClusterRoleBindings. Remember that `get` or `list` on Secrets reveals their contents, and `create` on Pods can indirectly expose anything a Pod can mount, so treat those permissions as sensitive."
  ],
  "terms": [
   [
    "Role",
    "Namespaced set of allowed verbs on resources."
   ],
   [
    "ClusterRole",
    "Non-namespaced set of permissions, usable cluster-wide or bound per namespace."
   ],
   [
    "RoleBinding",
    "Grants a Role or ClusterRole to subjects within one namespace."
   ],
   [
    "ClusterRoleBinding",
    "Grants a ClusterRole to subjects across the whole cluster."
   ],
   [
    "kubectl auth can-i --as",
    "Checks whether a user or ServiceAccount may perform an action, using impersonation."
   ]
  ],
  "example": "A CI ServiceAccount must deploy to `staging` only. You create a Role allowing get, list, create, update and patch on deployments in the `apps` group, bind it with a RoleBinding in `staging`, then confirm with `kubectl auth can-i create deployments -n staging --as=system:serviceaccount:staging:ci` (yes) and the same check for `-n prod` (no).",
  "tip": "Core resources use apiGroups [\"\"], and --serviceaccount takes namespace:name. A ClusterRole bound by a RoleBinding only grants access in that binding's namespace.",
  "check": [
   [
    "What API group do you list in a Role rule for Pods?",
    "The core group, written as an empty string \"\"."
   ],
   [
    "What access does a RoleBinding to the ClusterRole `view` give?",
    "Read access to the covered resources only in the RoleBinding's namespace."
   ],
   [
    "How do you check whether ServiceAccount `bot` in namespace `qa` can delete Pods there?",
    "`kubectl auth can-i delete pods -n qa --as=system:serviceaccount:qa:bot`."
   ]
  ]
 },
 {
  "t": "Resource requests and limits for CPU and memory; units (m, Mi, Gi); QoS classes",
  "body": [
   "Each container can declare how much CPU and memory it needs and the most it may use. These numbers drive two different mechanisms: scheduling and enforcement. Getting them right keeps your app from being starved, killed or crowding out its neighbours.",
   "A request is the amount reserved for the container. The scheduler places a Pod only on a node whose unreserved capacity covers the sum of its containers' requests; if no node fits, the Pod stays Pending with an 'Insufficient cpu' or 'Insufficient memory' event. Requests do not cap usage. A limit is the maximum. The two resources react differently when a container reaches its limit: CPU is compressible, so a container at its CPU limit is throttled (slowed down) but keeps running; memory is not, so a container that exceeds its memory limit is killed and shows OOMKilled.",
   "Units matter. CPU is measured in cores: `1` is one core, `500m` (500 millicores) is half a core, and `0.1` equals `100m`. Memory is measured in bytes with suffixes: `Mi` and `Gi` are binary units (mebibytes and gibibytes, powers of 1024), while `M` and `G` are decimal (powers of 1000). `128Mi` is slightly more than `128M`. A common mistake is writing `128m` for memory, which means 0.128 bytes; lowercase `m` means milli.",
   "```yaml\ncontainers:\n- name: api\n  image: api:1.0\n  resources:\n    requests:\n      cpu: 250m\n      memory: 128Mi\n    limits:\n      cpu: 500m\n      memory: 256Mi\n```",
   "If you set a limit but no request, Kubernetes sets the request equal to the limit. You can also set resources imperatively: `kubectl set resources deploy/api -c api --requests=cpu=250m,memory=128Mi --limits=cpu=500m,memory=256Mi`. (`kubectl run` no longer has `--requests` or `--limits` flags, so add a `resources` block to the YAML it generates.)",
   "From these settings Kubernetes assigns each Pod a Quality of Service (QoS) class, shown in `kubectl describe pod` and at `.status.qosClass`. Guaranteed: every container has CPU and memory requests and limits, and requests equal limits. Burstable: at least one container has a CPU or memory request or limit, but the Pod does not meet the Guaranteed rule. BestEffort: no container has any requests or limits. When a node runs short of memory, the kubelet evicts BestEffort Pods first, then Burstable Pods using more than their requests, and Guaranteed Pods last.",
   "Check actual usage against your settings with `kubectl top pod --containers`. Requests far above real usage waste capacity; limits close to real usage risk OOM kills and throttling."
  ],
  "terms": [
   [
    "Request",
    "Resources reserved for a container and used by the scheduler for placement."
   ],
   [
    "Limit",
    "Maximum resources a container may use; CPU is throttled and memory overuse is killed."
   ],
   [
    "Millicore (m)",
    "One thousandth of a CPU core; 500m is half a core."
   ],
   [
    "Mi / Gi",
    "Binary memory units based on powers of 1024."
   ],
   [
    "QoS class",
    "Guaranteed, Burstable or BestEffort, derived from requests and limits and used for eviction order."
   ]
  ],
  "example": "A worker Pod keeps restarting with OOMKilled. `kubectl top pod --containers` shows it settling at about 300Mi while its limit is 256Mi. Raising the memory limit to 512Mi and the request to 320Mi stops the kills, and the Pod stays Burstable.",
  "tip": "Guaranteed needs requests equal to limits for both CPU and memory in every container. CPU over limit means throttling; memory over limit means OOMKilled.",
  "check": [
   [
    "What happens when a container exceeds its CPU limit, and its memory limit?",
    "CPU: it is throttled. Memory: it is killed (OOMKilled)."
   ],
   [
    "A Pod's only container has requests cpu 100m and memory 64Mi with no limits. What QoS class is it?",
    "Burstable."
   ],
   [
    "How much CPU is 1500m?",
    "One and a half cores."
   ]
  ]
 },
 {
  "t": "Namespace ResourceQuota and LimitRange defaults",
  "body": [
   "Namespaces are often shared by teams or environments, so administrators need ways to stop one namespace from consuming the whole cluster and to make sure every Pod has sensible resource settings. ResourceQuota and LimitRange are the two tools, and both are enforced by admission control when objects are created.",
   "A ResourceQuota caps the total consumption of a namespace. Compute quotas include `requests.cpu`, `requests.memory`, `limits.cpu` and `limits.memory`, summed over all non-terminal Pods. Object count quotas include `pods`, `services`, `configmaps`, `secrets`, `persistentvolumeclaims`, and the general form `count/<resource>.<group>`, such as `count/deployments.apps`. Storage quotas cover `requests.storage`. When a new object would push the total over the quota, the API server rejects it with an 'exceeded quota' error.",
   "```yaml\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: compute\n  namespace: team-a\nspec:\n  hard:\n    requests.cpu: \"2\"\n    requests.memory: 4Gi\n    limits.cpu: \"4\"\n    limits.memory: 8Gi\n    pods: \"10\"\n```",
   "There is an important side effect: once a quota limits `requests.cpu` or `limits.memory` (or the other compute values), every new Pod in that namespace must specify that value, or it is rejected with a message like 'must specify limits.memory'. With a Deployment, you will not see this error on the Deployment itself; the ReplicaSet fails to create Pods, and `kubectl describe rs` or `kubectl get events` shows why. `kubectl describe quota -n team-a` shows each limit with its current Used and Hard values.",
   "A LimitRange sets per-object defaults and bounds within a namespace. For `type: Container`, `defaultRequest` is the request applied when a container specifies none, `default` is the limit applied when it specifies none, and `min` and `max` bound what a container may set. `maxLimitRequestRatio` caps how far a limit may exceed its request. Other types apply to whole Pods or to PersistentVolumeClaims (bounding storage size).",
   "```yaml\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: defaults\n  namespace: team-a\nspec:\n  limits:\n  - type: Container\n    defaultRequest:\n      cpu: 100m\n      memory: 128Mi\n    default:\n      cpu: 500m\n      memory: 256Mi\n    max:\n      cpu: \"1\"\n      memory: 1Gi\n```",
   "The two work well together: the LimitRange fills in missing values by mutating admission, so Pods that forget resources still satisfy the quota's requirement. LimitRange and quota changes apply only to objects created afterwards; existing Pods keep their values until they are recreated. Create them imperatively with `kubectl create quota compute -n team-a --hard=requests.cpu=2,pods=10`; LimitRanges have no create generator, so write YAML. Inspect with `kubectl describe limitrange -n team-a`."
  ],
  "terms": [
   [
    "ResourceQuota",
    "Namespace-wide cap on total resource usage and object counts."
   ],
   [
    "LimitRange",
    "Namespace policy that sets default and minimum/maximum resources per container, Pod or PVC."
   ],
   [
    "defaultRequest / default",
    "LimitRange fields giving the request and the limit applied when a container omits them."
   ],
   [
    "count/<resource>",
    "Quota key that limits how many objects of a type may exist in the namespace."
   ]
  ],
  "example": "After a ResourceQuota on limits.memory is added to `team-a`, a Deployment stops creating Pods. `kubectl describe rs` shows 'must specify limits.memory'. Adding a LimitRange with `default: memory: 256Mi` supplies the missing limit, and new Pods are admitted and counted against the quota.",
  "tip": "A compute quota forces every new Pod to declare that resource; a LimitRange default is the usual fix. Quota errors for Deployments show up on the ReplicaSet, not the Deployment.",
  "check": [
   [
    "Where do you see why a Deployment's Pods are not being created under a quota?",
    "In the ReplicaSet's events (`kubectl describe rs`) or `kubectl get events`."
   ],
   [
    "Which LimitRange field sets the limit for containers that do not specify one?",
    "`default`; `defaultRequest` sets the request."
   ],
   [
    "Does changing a LimitRange update existing Pods?",
    "No; it applies only to Pods created after the change."
   ]
  ]
 },
 {
  "t": "ConfigMaps: create from literals, files and env files; consume as env, envFrom and volumes",
  "body": [
   "A ConfigMap stores non-secret configuration as key-value pairs, separate from the container image. The same image can then run in development and production with different settings, and you change configuration without rebuilding. Values are plain text; for passwords and keys use a Secret instead.",
   "There are three imperative ways to create one. `--from-literal=KEY=value` adds one pair per flag. `--from-file=path` adds a key named after the file with the file's contents as the value; `--from-file=mykey=path` chooses the key name, and pointing it at a directory adds one key per file. `--from-env-file=path` reads a file of `KEY=value` lines and turns each line into its own key. The difference between the last two is a favourite exam trap: `--from-file=app.env` produces a single key `app.env` holding the whole file, while `--from-env-file=app.env` produces one key per line.",
   "```bash\nkubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=MODE=prod\nkubectl create configmap nginx-conf --from-file=default.conf\nkubectl create configmap app-env --from-env-file=app.env\nkubectl get configmap app-config -o yaml\n```",
   "Pods consume ConfigMaps in three ways. To set a single environment variable, use `env` with `valueFrom.configMapKeyRef`, naming the ConfigMap and key; the variable name can differ from the key. To import every key as a variable, use `envFrom` with `configMapRef`, optionally with a `prefix`; keys that are not valid variable names are skipped and reported in an event (recent Kubernetes versions accept almost any printable characters in names, so this is now rare). To expose keys as files, mount a `configMap` volume, where each key becomes a file under the mount path.",
   "```yaml\ncontainers:\n- name: app\n  image: app:1.0\n  env:\n  - name: LEVEL\n    valueFrom:\n      configMapKeyRef:\n        name: app-config\n        key: LOG_LEVEL\n  envFrom:\n  - configMapRef:\n      name: app-env\n    prefix: CFG_\n  volumeMounts:\n  - name: conf\n    mountPath: /etc/nginx/conf.d\nvolumes:\n- name: conf\n  configMap:\n    name: nginx-conf\n```",
   "Environment variables are read only when the container starts. If you change the ConfigMap, running containers keep the old values until they are restarted, for example with `kubectl rollout restart deploy/app`. Mounted files are updated automatically after a short delay (except subPath mounts), but the application must notice and reload them.",
   "A ConfigMap must exist in the same namespace as the Pod. If it is missing, the Pod fails to start with CreateContainerConfigError (for env) or waits in ContainerCreating (for volumes). Mark a reference `optional: true` if the Pod should start without it. Setting `immutable: true` on a ConfigMap prevents accidental edits and reduces load on the API server; to change it, you create a new ConfigMap."
  ],
  "terms": [
   [
    "ConfigMap",
    "An object holding non-secret configuration as key-value pairs."
   ],
   [
    "--from-env-file",
    "Creates one ConfigMap key per KEY=value line in a file."
   ],
   [
    "configMapKeyRef",
    "Sets one environment variable from one ConfigMap key."
   ],
   [
    "envFrom",
    "Imports all keys of a ConfigMap or Secret as environment variables."
   ]
  ],
  "example": "A team keeps `LOG_LEVEL` and `FEATURE_X` in a ConfigMap loaded with envFrom. To enable debug logging in staging, they edit the ConfigMap and run `kubectl rollout restart deploy/api`, because environment variables are only read at container start.",
  "tip": "--from-file=app.env makes one key holding the whole file; --from-env-file=app.env makes one key per line. And env values do not update until the Pod restarts.",
  "check": [
   [
    "How do you set the variable DB_HOST from key `host` in ConfigMap `db`?",
    "An env entry named DB_HOST with valueFrom.configMapKeyRef name db and key host."
   ],
   [
    "You updated a ConfigMap used via envFrom. Why do Pods still see old values?",
    "Environment variables are set at container start; the Pods must be restarted."
   ],
   [
    "What does mounting a ConfigMap as a volume produce?",
    "One file per key under the mount path, containing the key's value."
   ]
  ]
 },
 {
  "t": "Secrets: generic, docker-registry and tls types; base64 encoding vs encryption; secretKeyRef and volume mounts",
  "body": [
   "A Secret holds sensitive data such as passwords, API tokens, TLS keys and registry credentials. It is used much like a ConfigMap, but Kubernetes treats it more carefully: it can be restricted separately with RBAC, kubelets only receive Secrets for Pods scheduled on their node, and Secret volumes are stored in memory (tmpfs) on the node rather than on disk.",
   "kubectl creates three kinds. `kubectl create secret generic` makes an Opaque Secret from `--from-literal`, `--from-file` or `--from-env-file`, exactly as for ConfigMaps. `kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...` makes a `kubernetes.io/dockerconfigjson` Secret used in a Pod's `imagePullSecrets` to pull from a private registry. `kubectl create secret tls web-tls --cert=tls.crt --key=tls.key` makes a `kubernetes.io/tls` Secret with the keys `tls.crt` and `tls.key`, which Ingresses reference for HTTPS.",
   "```bash\nkubectl create secret generic db-cred --from-literal=username=app --from-literal=password='S3cure!pw'\nkubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d\nkubectl create secret tls web-tls --cert=tls.crt --key=tls.key\n```",
   "The single most important fact: values in a Secret's `data` field are base64-encoded, not encrypted. Base64 is a reversible encoding that lets binary data travel as text; anyone who can read the Secret can decode it with `base64 -d`. When writing YAML by hand, you either encode values yourself (`echo -n 'value' | base64`, where `-n` avoids encoding a trailing newline) or put plain text in `stringData`, which the API server encodes for you. Real protection comes from other layers: RBAC limiting who may get or list Secrets, encryption at rest configured by the cluster administrator so etcd stores Secrets encrypted, and keeping Secret manifests out of source control.",
   "Pods use Secrets the same three ways as ConfigMaps. `env` with `valueFrom.secretKeyRef` sets one variable; `envFrom` with `secretRef` imports all keys; a `secret` volume (note the `secretName` field) mounts each key as a file. Files are generally preferred over environment variables for sensitive values, because environment variables are easier to leak through logs, crash dumps or child processes, and mounted files update when the Secret changes.",
   "```yaml\nenv:\n- name: DB_PASSWORD\n  valueFrom:\n    secretKeyRef:\n      name: db-cred\n      key: password\nvolumeMounts:\n- name: tls\n  mountPath: /etc/tls\n  readOnly: true\n# pod-level\nvolumes:\n- name: tls\n  secret:\n    secretName: web-tls\n    defaultMode: 0400\nimagePullSecrets:\n- name: regcred\n```",
   "A missing Secret or key produces CreateContainerConfigError, visible in `kubectl describe pod`. Like ConfigMaps, Secrets are namespaced and must live in the Pod's namespace."
  ],
  "terms": [
   [
    "Opaque",
    "Default Secret type for arbitrary user data, created with kubectl create secret generic."
   ],
   [
    "kubernetes.io/dockerconfigjson",
    "Secret type holding registry credentials, used via imagePullSecrets."
   ],
   [
    "kubernetes.io/tls",
    "Secret type holding tls.crt and tls.key for certificates."
   ],
   [
    "Base64",
    "Reversible text encoding used for Secret data; it provides no confidentiality."
   ],
   [
    "secretKeyRef",
    "Sets one environment variable from one key of a Secret."
   ]
  ],
  "example": "A developer is asked to read the password in Secret `db-cred` and save it to a file. `kubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d > /opt/pw.txt` decodes it in one step, which also shows why RBAC on Secrets matters: anyone with get permission can do the same.",
  "tip": "Base64 is encoding, not encryption. Know the three create types (generic, docker-registry, tls) and that secret volumes use `secretName`.",
  "check": [
   [
    "Is data in a Secret encrypted by default?",
    "No, it is only base64-encoded in the API; encryption at rest must be configured by the administrator, and RBAC controls access."
   ],
   [
    "What keys does a tls Secret contain?",
    "`tls.crt` and `tls.key`."
   ],
   [
    "How does a Pod use a docker-registry Secret?",
    "By listing it under `spec.imagePullSecrets` so the kubelet can authenticate to the registry."
   ]
  ]
 },
 {
  "t": "ServiceAccounts: serviceAccountName, token projection, automountServiceAccountToken, kubectl create token",
  "body": [
   "Humans authenticate to the API server with their own credentials; applications running in Pods use ServiceAccounts. A ServiceAccount is a namespaced object that gives a Pod an identity, which RBAC can then grant permissions to. Every namespace automatically has one called `default`, and a Pod that does not name a ServiceAccount runs as that one.",
   "Create a dedicated account with `kubectl create serviceaccount ci-bot -n dev` (short form `sa`) and assign it in the Pod template with `spec.serviceAccountName: ci-bot`. The field is set when the Pod is created and cannot be changed on a running Pod; for a Deployment, change the template and let it roll out, or use `kubectl set serviceaccount deploy/app ci-bot`. The ServiceAccount must exist in the Pod's namespace, or the Pod is rejected at admission. In RBAC and in `kubectl auth can-i --as`, the account's full name is `system:serviceaccount:dev:ci-bot`.",
   "By default the kubelet gives each Pod a token for its ServiceAccount through a projected volume, mounted at `/var/run/secrets/kubernetes.io/serviceaccount`. The directory contains `token` (a signed JSON Web Token), `ca.crt` (to verify the API server's certificate) and `namespace`. Client libraries find these files automatically. Current tokens are bound tokens: they carry an audience, expire after a limited time, are tied to the specific Pod, and are refreshed by the kubelet before they expire. Older clusters created long-lived tokens stored in Secrets automatically; that no longer happens, which reduces the damage a leaked token can do.",
   "Most applications never talk to the Kubernetes API, and for them the token is an unnecessary risk: if an attacker compromises the container, they can use the token with whatever permissions the account has. Turn mounting off with `automountServiceAccountToken: false`, either on the ServiceAccount (affecting every Pod that uses it) or in the Pod spec. If both are set, the Pod's setting wins.",
   "```yaml\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: web\n  namespace: shop\nautomountServiceAccountToken: false\n---\n# Pod spec excerpt\nspec:\n  serviceAccountName: web\n  automountServiceAccountToken: false\n```",
   "When a tool outside the cluster needs a token, request a short-lived one: `kubectl create token ci-bot -n dev` prints a token, and `--duration=1h` or `--audience=<aud>` adjust it. You can use it as a bearer token to test what the account can do. If you truly need a long-lived token, you can create a Secret of type `kubernetes.io/service-account-token` annotated with the account name and the control plane will fill it in, but short-lived tokens are the safer default.",
   "You can also project a token with a custom audience and expiry into a Pod using a `serviceAccountToken` source in a projected volume, for example to authenticate to an external service that trusts the cluster's tokens. Verify identity with `kubectl get pod app -o jsonpath='{.spec.serviceAccountName}'` and `kubectl exec app -- ls /var/run/secrets/kubernetes.io/serviceaccount`."
  ],
  "terms": [
   [
    "ServiceAccount",
    "A namespaced identity for processes running in Pods."
   ],
   [
    "serviceAccountName",
    "Pod spec field choosing which ServiceAccount the Pod runs as."
   ],
   [
    "Bound (projected) token",
    "A short-lived, audience-scoped token tied to a Pod and refreshed by the kubelet."
   ],
   [
    "automountServiceAccountToken",
    "Setting on a ServiceAccount or Pod that controls whether the token is mounted."
   ],
   [
    "kubectl create token",
    "Command that issues a short-lived token for a ServiceAccount."
   ]
  ],
  "example": "A Pod that lists ConfigMaps gets 403 errors. It runs as `default`, which has no permissions. The developer creates ServiceAccount `config-reader`, binds a Role allowing get and list on configmaps, sets `serviceAccountName: config-reader` in the Deployment, and verifies with `kubectl auth can-i list configmaps --as=system:serviceaccount:app:config-reader -n app`.",
  "tip": "The Pod field is `serviceAccountName` (older `serviceAccount` is deprecated), the Pod-level automount setting overrides the ServiceAccount's, and you cannot change a running Pod's ServiceAccount.",
  "check": [
   [
    "Which ServiceAccount does a Pod use if none is specified?",
    "The `default` ServiceAccount in its namespace."
   ],
   [
    "Where is the ServiceAccount token mounted in a container?",
    "/var/run/secrets/kubernetes.io/serviceaccount, as the file token alongside ca.crt and namespace."
   ],
   [
    "Why set automountServiceAccountToken to false?",
    "Apps that do not call the Kubernetes API do not need a token, and removing it limits what an attacker could do after compromising the container."
   ]
  ]
 },
 {
  "t": "SecurityContext at Pod and container level: runAsUser, runAsNonRoot, fsGroup, readOnlyRootFilesystem, allowPrivilegeEscalation",
  "body": [
   "Containers are processes on a shared Linux kernel, so how much privilege they run with matters. If an attacker exploits a bug in your app, a container running as root with a writable filesystem gives them far more to work with than one running as an unprivileged user with a read-only filesystem. The `securityContext` field lets you set these privileges declaratively.",
   "There are two levels. `spec.securityContext` on the Pod applies to all containers and also holds Pod-only settings. `spec.containers[].securityContext` applies to one container and overrides Pod-level values where both set the same field. Some fields exist only at one level, which the exam likes to test.",
   "`runAsUser` sets the numeric user ID (UID) the container's processes run as, and `runAsGroup` the primary group ID. `runAsNonRoot: true` tells the kubelet to verify that the container will not run as UID 0; if the image's user is root and no `runAsUser` overrides it, the container is refused with an error such as 'container has runAsNonRoot and image will run as root' (status CreateContainerConfigError). If the image specifies a user by name rather than number, the kubelet cannot verify it and also refuses, so set a numeric `runAsUser`. These three can be set at either level.",
   "`fsGroup` is Pod-level only. It sets a supplementary group ID for all containers, and supported volumes are made group-owned by that ID when mounted, so a non-root process can write to them. It is the usual fix when a non-root container gets 'permission denied' on a PVC or emptyDir.",
   "`readOnlyRootFilesystem: true` (container-level only) makes the container's own filesystem read-only. Malware or an attacker cannot modify binaries or drop tools, and the app cannot accidentally write where it should not. Apps that need scratch space get an emptyDir mounted at, for example, `/tmp`. `allowPrivilegeEscalation: false` (container-level only) prevents a process from gaining more privileges than its parent, for example through setuid binaries; it sets the Linux no_new_privs flag.",
   "```yaml\nspec:\n  securityContext:\n    runAsUser: 1000\n    runAsGroup: 3000\n    fsGroup: 2000\n    runAsNonRoot: true\n  containers:\n  - name: app\n    image: app:1.0\n    securityContext:\n      readOnlyRootFilesystem: true\n      allowPrivilegeEscalation: false\n    volumeMounts:\n    - {name: tmp, mountPath: /tmp}\n  volumes:\n  - name: tmp\n    emptyDir: {}\n```",
   "Verify inside the container: `kubectl exec app -- id` should show `uid=1000 gid=3000` with 2000 among the groups, and `kubectl exec app -- touch /test` should fail with 'Read-only file system'. Other container fields you will meet are `privileged` (full host access; avoid), `capabilities` and `seccompProfile`, covered with Pod Security Admission."
  ],
  "terms": [
   [
    "runAsUser",
    "Numeric UID the container processes run as."
   ],
   [
    "runAsNonRoot",
    "Makes the kubelet refuse to start a container that would run as UID 0."
   ],
   [
    "fsGroup",
    "Pod-level supplementary group applied to containers and to ownership of supported volumes."
   ],
   [
    "readOnlyRootFilesystem",
    "Container-level setting that makes the container's root filesystem read-only."
   ],
   [
    "allowPrivilegeEscalation",
    "Container-level setting that, when false, stops processes gaining more privileges than their parent."
   ]
  ],
  "example": "A task asks for a Pod that runs as user 1000, writes only to /data on a PVC, and cannot modify its own filesystem. You set runAsUser 1000 and fsGroup 1000 at Pod level, readOnlyRootFilesystem true and allowPrivilegeEscalation false on the container, and confirm with `kubectl exec -- id` and a failed `touch /x`.",
  "tip": "fsGroup is Pod-level only; readOnlyRootFilesystem, allowPrivilegeEscalation, capabilities and privileged are container-level only. Container values override Pod values.",
  "check": [
   [
    "A Pod sets runAsUser 1000 and one container sets runAsUser 2000. What UID does that container use?",
    "2000, because container-level settings override Pod-level ones."
   ],
   [
    "Why does a container with runAsNonRoot: true fail with CreateContainerConfigError?",
    "Its image runs as root (or a non-numeric user) and no numeric runAsUser overrides it, so the kubelet refuses to start it."
   ],
   [
    "Where do you set fsGroup?",
    "Only in the Pod-level securityContext."
   ]
  ]
 },
 {
  "t": "Linux capabilities (add/drop) and Pod Security Admission levels (privileged, baseline, restricted)",
  "body": [
   "Traditionally on Linux, root could do everything and other users almost nothing. Capabilities split root's power into smaller named privileges, such as `NET_BIND_SERVICE` (bind to ports below 1024), `NET_ADMIN` (change network settings), `CHOWN` (change file ownership) and `SYS_ADMIN` (a very broad set of administrative actions). Container runtimes give containers a default subset of capabilities, and you can adjust it per container.",
   "In `securityContext.capabilities` (container level only) you list capabilities to `add` and `drop`, written without the `CAP_` prefix. The recommended pattern is to drop everything and add back only what is needed. A web server that must listen on port 80 as a non-root user needs only `NET_BIND_SERVICE`. Avoid `privileged: true`, which grants all capabilities and access to host devices, and be very cautious with broad capabilities such as `SYS_ADMIN`.",
   "```yaml\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  capabilities:\n    drop: [\"ALL\"]\n    add: [\"NET_BIND_SERVICE\"]\n  seccompProfile:\n    type: RuntimeDefault\n```",
   "Pod Security Admission (PSA) is the built-in admission controller that enforces the Pod Security Standards per namespace. There are three levels. Privileged is unrestricted, for trusted system workloads. Baseline blocks known privilege escalations while staying easy to adopt: no privileged containers, no host namespaces (hostNetwork, hostPID, hostIPC), no hostPath volumes, and no added capabilities beyond a default-like set. Restricted follows hardening best practice: everything in baseline plus `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, capabilities dropping `ALL` (only `NET_BIND_SERVICE` may be added), a seccomp profile of `RuntimeDefault` or `Localhost`, and only a limited list of volume types.",
   "You apply levels with namespace labels, one per mode. `enforce` rejects violating Pods. `audit` allows them but records the violation in the audit log. `warn` allows them but returns a warning to the user. An optional `-version` label pins the standard to a Kubernetes version, or `latest`.",
   "```bash\nkubectl label namespace shop \\\n  pod-security.kubernetes.io/enforce=baseline \\\n  pod-security.kubernetes.io/warn=restricted\n```",
   "Enforcement applies to Pods, not to Deployments. If a Deployment's Pod template violates an enforced level, the Deployment is created but its ReplicaSet cannot create Pods; the error, such as 'violates PodSecurity \"restricted:latest\": allowPrivilegeEscalation != false', appears in `kubectl describe rs` and events. The warn and audit modes also check workload templates, so you get an early warning when applying the Deployment. Labelling a namespace does not remove Pods that already run; it warns about existing violations and blocks new ones. The fix is always in the Pod's securityContext, and the error message lists each field to correct."
  ],
  "terms": [
   [
    "Capability",
    "A named slice of root privilege, such as NET_BIND_SERVICE, that can be added to or dropped from a container."
   ],
   [
    "Pod Security Admission",
    "Built-in admission controller enforcing Pod Security Standards through namespace labels."
   ],
   [
    "Baseline",
    "Pod Security level that blocks known privilege escalations such as privileged containers and host namespaces."
   ],
   [
    "Restricted",
    "Strictest Pod Security level requiring non-root, no privilege escalation, dropped capabilities and a seccomp profile."
   ],
   [
    "enforce / audit / warn",
    "PSA modes that reject, log or warn about violating Pods."
   ]
  ],
  "example": "The `payments` namespace is labelled `pod-security.kubernetes.io/enforce=restricted`. A new Deployment shows 0 ready Pods; `kubectl describe rs` lists missing runAsNonRoot, allowPrivilegeEscalation and seccompProfile settings. Adding them plus `capabilities: drop: [\"ALL\"]` lets the ReplicaSet create Pods.",
  "tip": "Capabilities are container-level only and written without CAP_. PSA errors for Deployments appear on the ReplicaSet, and restricted requires drop ALL, runAsNonRoot, allowPrivilegeEscalation false and a RuntimeDefault or Localhost seccomp profile.",
  "check": [
   [
    "Which capability lets a non-root process bind to port 80?",
    "NET_BIND_SERVICE."
   ],
   [
    "What label makes a namespace reject Pods that fail the baseline level?",
    "`pod-security.kubernetes.io/enforce=baseline`."
   ],
   [
    "What is the difference between PSA's warn and enforce modes?",
    "Warn admits violating Pods but returns a warning; enforce rejects them."
   ]
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort, LoadBalancer, ExternalName and headless (clusterIP: None)",
  "body": [
   "Pods come and go and their IP addresses change. A Service gives a stable name and virtual IP address in front of a changing set of Pods, chosen by a label selector, and spreads connections across them. The Service's `type` decides who can reach it.",
   "ClusterIP is the default. The Service gets a virtual IP reachable only from inside the cluster, plus a DNS name. kube-proxy (or the network plugin) on each node programs rules so traffic to that IP and port is forwarded to one of the ready Pods. Use it for internal back ends: databases, internal APIs, anything other Pods call.",
   "NodePort builds on ClusterIP and also opens the same port on every node, by default chosen from the range 30000 to 32767. Traffic to any node's IP on that port reaches the Service, even if no matching Pod runs on that node. It is simple for labs and testing, for example `curl <node-ip>:30080`, but exposes an unusual port and a node address to clients.",
   "LoadBalancer builds on NodePort and asks the cloud provider, or an add-on in bare-metal clusters, to create an external load balancer that forwards to the Service. Its address appears in the EXTERNAL-IP column. In a local cluster without such an integration, the column stays `<pending>`; minikube provides `minikube tunnel` to fill it. Each LoadBalancer Service usually means a separate cloud load balancer, which is why HTTP apps are often exposed through one Ingress instead.",
   "ExternalName has no selector and no Pods. It maps a Service name to an external DNS name by returning a CNAME record: `externalName: db.example.com` makes `db.<namespace>.svc.cluster.local` resolve to that host. It lets in-cluster code use a stable internal name while the real target lives elsewhere. No proxying or port mapping happens.",
   "A headless Service sets `clusterIP: None`. There is no virtual IP and no load balancing by kube-proxy; instead DNS returns the IP addresses of the individual ready Pods, and clients choose. StatefulSets use headless Services so each Pod gets its own DNS name, such as `db-0.db.prod.svc.cluster.local`.",
   "```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  type: NodePort\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n```",
   "`kubectl get svc` shows TYPE, CLUSTER-IP, EXTERNAL-IP and PORT(S), where a NodePort appears as `80:30080/TCP`. The type of an existing Service can be changed with `kubectl edit` or `kubectl patch svc web -p '{\"spec\":{\"type\":\"NodePort\"}}'`."
  ],
  "terms": [
   [
    "ClusterIP",
    "Default Service type with an internal virtual IP reachable only inside the cluster."
   ],
   [
    "NodePort",
    "Service type that also opens a port (default range 30000-32767) on every node."
   ],
   [
    "LoadBalancer",
    "Service type that provisions an external load balancer through the cloud provider or an add-on."
   ],
   [
    "ExternalName",
    "Service type that returns a DNS CNAME to an external host, without proxying."
   ],
   [
    "Headless Service",
    "Service with clusterIP: None whose DNS returns individual Pod IPs."
   ]
  ],
  "example": "An app uses a ClusterIP Service `orders` for its internal API, a LoadBalancer Service for its public gateway, an ExternalName Service `payments` pointing to a partner's hostname so code can call `payments` like any other Service, and a headless Service for its three-node StatefulSet database.",
  "tip": "Each type builds on the previous one: LoadBalancer includes a NodePort, which includes a ClusterIP. ExternalName and headless are the odd ones out: no proxying and no virtual IP.",
  "check": [
   [
    "What is the default Service type?",
    "ClusterIP."
   ],
   [
    "A LoadBalancer Service in a local kind cluster shows EXTERNAL-IP <pending>. Why?",
    "There is no cloud provider or load balancer add-on to provision an external address."
   ],
   [
    "What does DNS return for a headless Service?",
    "The IP addresses of the individual ready Pods instead of a single virtual IP."
   ]
  ]
 },
 {
  "t": "Selectors, port vs targetPort vs nodePort, named ports",
  "body": [
   "Two things decide whether a Service works: its selector must match the right Pods, and its port numbers must line up with where the application actually listens. Most Service bugs on the exam are one or the other.",
   "The `selector` is a set of labels. The Service targets every Pod in its namespace whose labels include all of those key-value pairs. It matches Pod labels, not Deployment labels, so check the Pod template. The selector is a simple equality map; the richer `matchLabels`/`matchExpressions` syntax used by Deployments is not available for Services. Compare the two with `kubectl describe svc web | grep Selector` and `kubectl get pods --show-labels`.",
   "Each entry in `ports` has up to three numbers. `port` is the port the Service itself listens on, at its ClusterIP and DNS name; clients connect to `web:80`. `targetPort` is the port on the Pods that traffic is forwarded to, where the container actually listens. If you omit targetPort, it defaults to the same value as port. `nodePort` applies only to NodePort and LoadBalancer Services and is the port opened on every node; leave it out and one is assigned from the node port range.",
   "```text\nclient -> <node-ip>:30080 (nodePort)\n       -> <service-ip>:80   (port)\n       -> <pod-ip>:8080     (targetPort, the containerPort)\n```",
   "Containers can name their ports: `ports: - name: http, containerPort: 8080`. A Service can then use `targetPort: http` instead of a number. This decouples the Service from the number: if a new version listens on 9090 under the same name, the Service keeps working without edits, and different Pods behind one Service can even use different numbers. Note that `containerPort` itself is mostly informational: a container listening on a port it did not declare still receives traffic, but a named targetPort only resolves if the name is declared.",
   "```yaml\n# Pod template\ncontainers:\n- name: app\n  image: app:1.0\n  ports:\n  - name: http\n    containerPort: 8080\n---\n# Service\nspec:\n  selector:\n    app: web\n  ports:\n  - name: web\n    protocol: TCP\n    port: 80\n    targetPort: http\n```",
   "When a Service exposes more than one port, each port entry must have a `name`. `protocol` defaults to TCP; UDP and SCTP are also supported, for example UDP for DNS. To troubleshoot, first check endpoints (if there are none, the selector or readiness is wrong), then test the target port directly on a Pod IP from a temporary Pod (if that fails, targetPort or the app's listen address is wrong), and finally test through the Service name."
  ],
  "terms": [
   [
    "port",
    "The port the Service listens on at its ClusterIP and DNS name."
   ],
   [
    "targetPort",
    "The Pod port traffic is forwarded to; defaults to port, may be a named port."
   ],
   [
    "nodePort",
    "The port opened on every node for NodePort and LoadBalancer Services."
   ],
   [
    "Named port",
    "A containerPort with a name that a Service can reference as its targetPort."
   ]
  ],
  "example": "Requests to `api:80` time out even though endpoints exist. Checking the Pods shows the app listens on 3000, while the Service has `targetPort: 80`. Changing targetPort to 3000, or naming the container port `http` and using `targetPort: http`, fixes it.",
  "tip": "port is what clients call, targetPort is where the Pod listens, nodePort is on the nodes. Endpoints present but connections refused points to targetPort; no endpoints points to the selector or readiness.",
  "check": [
   [
    "If targetPort is omitted, what value does it take?",
    "The same value as port."
   ],
   [
    "Why use a named targetPort?",
    "The Service follows the container's port name, so the Pod's port number can change without editing the Service."
   ],
   [
    "Does a Service select Pods by the Deployment's labels or the Pods' labels?",
    "The Pods' labels, as set in the Pod template."
   ]
  ]
 },
 {
  "t": "EndpointSlices and why an empty endpoint list means the selector or readiness is wrong",
  "body": [
   "A Service is only a description. The actual list of Pod addresses behind it is kept in separate objects called EndpointSlices, maintained by a controller in the control plane. kube-proxy and other components on every node watch EndpointSlices to know where to forward traffic. When a Service 'does not work', looking at its EndpointSlices is the fastest way to find out why.",
   "For every Service with a selector, the EndpointSlice controller finds the Pods in the same namespace whose labels match, and records each Pod's IP, the target port and conditions such as `ready`. Each slice is labelled `kubernetes.io/service-name=<service>`. Large Services are split across several slices, which is why they replaced the older single Endpoints object; you may still see Endpoints listed, but EndpointSlices are the current mechanism.",
   "```bash\nkubectl get endpointslices -l kubernetes.io/service-name=web\nkubectl describe endpointslice web-abc12\nkubectl describe svc web          # Endpoints: line\nkubectl get pods -l app=web -o wide --show-labels\n```",
   "Only ready Pods receive traffic. A Pod that matches the selector but fails its readiness probe, or is still starting, is listed with `ready: false` and traffic is not sent to it. So if the Service shows no ready endpoints, there are only two families of cause.",
   "First, the selector matches nothing. The Service's selector has a typo, uses a different label value (`app: Web` versus `app: web`), includes an extra label the Pods do not have, or the Pods are in another namespace. Compare `kubectl describe svc web` with `kubectl get pods --show-labels`, and test the selector directly: `kubectl get pods -l app=web`. If that returns nothing, the selector is wrong or the Pods are mislabelled.",
   "Second, the Pods match but are not ready. `kubectl get pods` shows `0/1` in READY; `kubectl describe pod` shows readiness probe failures, or the Pods are crashing or Pending. Fix the probe or the application, and the endpoints fill in automatically.",
   "A Service without a selector never gets automatic endpoints; you or another controller must create EndpointSlices by hand, which is how Services can point at databases outside the cluster. ExternalName Services have no endpoints at all by design.",
   "If endpoints exist and look right but connections still fail, the problem is elsewhere: a wrong targetPort, the app listening only on 127.0.0.1 instead of all interfaces, or a NetworkPolicy blocking traffic. The endpoint check therefore splits the problem space in half with one command."
  ],
  "terms": [
   [
    "EndpointSlice",
    "An object listing the addresses, ports and readiness of Pods backing a Service."
   ],
   [
    "kubernetes.io/service-name",
    "Label linking an EndpointSlice to its Service."
   ],
   [
    "Ready condition",
    "Endpoint flag showing whether a backend Pod should receive traffic."
   ]
  ],
  "example": "After a relabel, `curl orders` from a test Pod hangs. `kubectl describe svc orders` shows `Endpoints: <none>`. The Pods now carry `app: order-svc` while the Service still selects `app: orders`. Updating the Service selector restores three endpoints and the requests succeed.",
  "tip": "Empty endpoints means one of two things: no Pod matches the selector, or matching Pods are not ready. Check `kubectl get pods -l <selector>` and the READY column.",
  "check": [
   [
    "How do you list the EndpointSlices for Service `web`?",
    "`kubectl get endpointslices -l kubernetes.io/service-name=web`."
   ],
   [
    "Pods match the selector but the Service has no ready endpoints. What is likely wrong?",
    "The Pods are not ready: failing readiness probes, crashing or still starting."
   ],
   [
    "Endpoints look correct but connections still fail. Name one likely cause.",
    "A wrong targetPort, the app listening only on localhost, or a NetworkPolicy blocking traffic."
   ]
  ]
 },
 {
  "t": "Cluster DNS names: <service>.<namespace>.svc.cluster.local",
  "body": [
   "Kubernetes runs a cluster DNS server, normally CoreDNS, as Pods in the `kube-system` namespace behind a Service usually called `kube-dns`. The kubelet configures every Pod's `/etc/resolv.conf` to use it. As a result, applications find Services by name instead of by IP, and the names keep working when Pods and even Service IPs change.",
   "Every Service gets a DNS name of the form `<service>.<namespace>.svc.<cluster-domain>`. The cluster domain is `cluster.local` by default, though administrators can change it. A Service `web` in namespace `shop` is therefore `web.shop.svc.cluster.local`, which resolves to the Service's ClusterIP. For a headless Service, the same name returns the IPs of its ready Pods, and StatefulSet Pods get individual names such as `db-0.db.shop.svc.cluster.local` (pod name, then the headless Service name).",
   "You rarely need the full name, thanks to search domains. A Pod in `shop` has a resolv.conf like this:",
   "```text\nnameserver 10.96.0.10\nsearch shop.svc.cluster.local svc.cluster.local cluster.local\noptions ndots:5\n```",
   "When the Pod looks up a short name, the resolver tries appending each search domain in turn. So from inside `shop`, plain `web` becomes `web.shop.svc.cluster.local` and resolves. From a Pod in another namespace, `web` alone would look in that Pod's own namespace and fail, so you use `web.shop` (which matches via the `svc.cluster.local` search domain) or the full name. This is the most common DNS trap: short names only work within the same namespace.",
   "The `ndots:5` option means a name with fewer than five dots is first tried with the search domains before being tried as-is. That is why an external name like `api.example.com` generates a few failed internal lookups before succeeding; a trailing dot (`api.example.com.`) marks a name as fully qualified and skips the search list.",
   "Services also get SRV records for named ports, in the form `_<port-name>._<protocol>.<service>.<namespace>.svc.cluster.local`, which some clients use to discover port numbers. Pods themselves can be looked up by an IP-based name like `10-244-1-5.shop.pod.cluster.local`, but applications normally use Service names.",
   "Test DNS from a temporary Pod: `kubectl run dns --image=busybox --rm -it --restart=Never -- nslookup web.shop`. A 'can't resolve' answer means the Service name or namespace is wrong (or DNS itself is broken; check `kubectl get pods -n kube-system -l k8s-app=kube-dns`). An answer with an IP but a failed connection means DNS is fine and the problem lies with endpoints, ports or NetworkPolicy. Remember that NetworkPolicies that restrict egress must allow DNS traffic to the cluster DNS Pods, or every name lookup fails."
  ],
  "terms": [
   [
    "CoreDNS",
    "The DNS server that normally provides cluster DNS for Services and Pods."
   ],
   [
    "Service FQDN",
    "The fully qualified Service name <service>.<namespace>.svc.cluster.local."
   ],
   [
    "Search domains",
    "Suffixes in a Pod's resolv.conf that let short names like web resolve within its namespace."
   ],
   [
    "ndots",
    "Resolver option setting how many dots a name needs before it is tried as absolute first."
   ]
  ],
  "example": "A frontend Pod in namespace `web` calls the host `catalog` and gets 'name not resolved'. The catalog Service lives in namespace `inventory`. Changing the setting to `catalog.inventory` (or `catalog.inventory.svc.cluster.local`) fixes it, confirmed with `nslookup catalog.inventory` from a busybox Pod.",
  "tip": "A short Service name only resolves from the same namespace. Across namespaces, use at least `<service>.<namespace>`.",
  "check": [
   [
    "What is the full DNS name of Service `api` in namespace `prod`?",
    "`api.prod.svc.cluster.local` (with the default cluster domain)."
   ],
   [
    "Why does `api` fail to resolve from a Pod in namespace `dev`?",
    "The search domains append dev's namespace first, so it looks for api.dev.svc.cluster.local, which does not exist."
   ],
   [
    "What does DNS return for a headless Service name?",
    "The IPs of its ready Pods rather than a ClusterIP."
   ]
  ]
 },
 {
  "t": "Kubectl expose, kubectl create service and kubectl port-forward",
  "body": [
   "Writing Service YAML by hand is slow and error-prone. kubectl offers two imperative generators, and a third command for reaching Pods without a Service at all. Knowing their differences saves time and avoids a classic selector trap.",
   "`kubectl expose` creates a Service for an existing resource and copies its selector for you. `kubectl expose deployment web --port=80 --target-port=8080` creates a ClusterIP Service named `web` whose selector is the Deployment's selector. Add `--type=NodePort` or `--type=LoadBalancer`, `--name=web-svc` to choose a name, and `--protocol=UDP` if needed. You can expose a Deployment, ReplicaSet, Pod or another Service. Exposing a Pod requires that it has labels, since they become the selector; Pods made with `kubectl run` get a `run=<name>` label automatically. If you omit `--target-port`, it defaults to `--port`; if you omit `--port`, kubectl uses the container port declared in the resource.",
   "```bash\nkubectl expose deploy web --port=80 --target-port=8080 --type=NodePort --name=web-np\nkubectl expose pod db --port=5432\nkubectl run cache --image=redis --port=6379 --expose\nkubectl create service clusterip api --tcp=80:8080\nkubectl create service nodeport api --tcp=80:8080 --node-port=30080\nkubectl create service externalname partner --external-name=api.partner.example\n```",
   "`kubectl create service <type> <name>` builds a Service from scratch with `clusterip`, `nodeport`, `loadbalancer` or `externalname` subcommands. `--tcp=80:8080` means port 80, targetPort 8080. The trap: it cannot read another object's labels, so it sets the selector to `app=<service-name>`. That works only if your Pods happen to carry that label. If they are labelled differently, the Service has no endpoints. Either use `expose`, or generate YAML with `--dry-run=client -o yaml` and fix the selector before applying. `kubectl create service clusterip headless --clusterip=\"None\"` creates a headless Service.",
   "`kubectl run cache --image=redis --port=6379 --expose` is a shortcut that creates a Pod and a ClusterIP Service for it in one command.",
   "`kubectl port-forward` does not create any object. It opens a tunnel from your machine through the API server to one Pod. `kubectl port-forward svc/web 8080:80` listens on local port 8080 and forwards to port 80 of the Service, which kubectl translates to the targetPort of a single Pod chosen from the Service. You can also target `pod/<name>` or `deploy/<name>`. It listens on localhost only unless you pass `--address 0.0.0.0`, and it runs until you stop it. Use it to test an app quickly, or to reach a database from local tools, without exposing anything to the network.",
   "After using any of these, verify: `kubectl get svc web-np -o wide` shows the selector; `kubectl get endpointslices -l kubernetes.io/service-name=web-np` shows the endpoints; and a curl from a temporary Pod or through the port-forward confirms the application answers."
  ],
  "terms": [
   [
    "kubectl expose",
    "Creates a Service for an existing resource, copying its selector."
   ],
   [
    "kubectl create service",
    "Creates a Service of a given type from scratch, with selector app=<name>."
   ],
   [
    "--tcp=port:targetPort",
    "Flag for create service that sets the Service port and target port."
   ],
   [
    "kubectl port-forward",
    "Temporary tunnel from a local port to one Pod; creates no Service."
   ]
  ],
  "example": "A task says: expose Deployment `shop` (labels `tier=front`) on NodePort 30100, port 80 to container port 8000. `kubectl create service nodeport shop --tcp=80:8000 --node-port=30100` would select `app=shop` and match nothing, so you use `kubectl expose deploy shop --type=NodePort --port=80 --target-port=8000 --dry-run=client -o yaml`, add `nodePort: 30100`, and apply.",
  "tip": "`expose` copies the real selector; `create service` assumes app=<name>. `expose` has no flag for a specific nodePort, so generate YAML and add it.",
  "check": [
   [
    "What selector does `kubectl create service clusterip api --tcp=80:8080` set?",
    "`app=api`."
   ],
   [
    "How do you expose Deployment `web` as a NodePort Service on port 80 forwarding to 8080?",
    "`kubectl expose deploy web --type=NodePort --port=80 --target-port=8080`."
   ],
   [
    "Does port-forward to a Service load-balance across all Pods?",
    "No, it connects to a single Pod behind the Service."
   ]
  ]
 },
 {
  "t": "NetworkPolicy basics: podSelector, policyTypes, ingress and egress rules, default deny",
  "body": [
   "By default, every Pod in a Kubernetes cluster can talk to every other Pod, in every namespace. That makes things easy but means a single compromised Pod can reach databases and internal APIs it has no business touching. A NetworkPolicy is a namespaced object that restricts which traffic is allowed to and from selected Pods, acting like a firewall defined by labels.",
   "`spec.podSelector` chooses the Pods in the policy's namespace that the policy applies to. An empty selector, `podSelector: {}`, selects every Pod in the namespace. `policyTypes` lists `Ingress` (incoming traffic), `Egress` (outgoing traffic) or both. `ingress` rules list allowed sources (`from`) and ports; `egress` rules list allowed destinations (`to`) and ports.",
   "The key idea is isolation. A Pod not selected by any policy is non-isolated and accepts everything. As soon as a policy with `Ingress` in policyTypes selects a Pod, that Pod becomes isolated for ingress, and only traffic that some policy's ingress rules allow gets in. Egress works the same way. Policies are additive: there are no deny rules, and if several policies select the same Pod, the allowed traffic is the union of all of them. Replies to allowed connections are permitted automatically, so you do not write rules for return traffic.",
   "A default deny policy selects all Pods and allows nothing. With `policyTypes: [Ingress]` and no ingress rules, all incoming traffic to Pods in the namespace is blocked. Adding `Egress` blocks outgoing traffic too. You then add narrow allow policies on top. This is the recommended starting point for a namespace that needs protection.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\n  namespace: shop\nspec:\n  podSelector: {}\n  policyTypes: [\"Ingress\", \"Egress\"]\n---\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-from-frontend\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: [\"Ingress\"]\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - protocol: TCP\n      port: 8080\n```",
   "Watch the difference between an empty rule list and a rule that is empty. `ingress: []` or no ingress field (with Ingress in policyTypes) allows nothing. `ingress: [{}]`, a single rule with no `from` and no `ports`, allows everything. If you omit `policyTypes`, Ingress is always assumed, and Egress is added only if the policy has an egress section.",
   "Ports in rules are the Pod's ports (the targetPort), not the Service port, because policies act on Pod traffic after Service translation. You can use named ports too. Test with temporary Pods carrying the right labels: `kubectl run t --image=busybox --rm -it --restart=Never -l app=frontend -n shop -- wget -qO- -T 2 api:8080`. Remember that an egress default deny also blocks DNS, which is covered next."
  ],
  "terms": [
   [
    "NetworkPolicy",
    "Namespaced object that restricts traffic to and from selected Pods."
   ],
   [
    "podSelector",
    "Chooses the Pods a policy applies to; {} selects all Pods in the namespace."
   ],
   [
    "policyTypes",
    "Ingress, Egress or both: which directions the policy isolates."
   ],
   [
    "Isolated Pod",
    "A Pod selected by a policy for a direction, which then only allows traffic explicitly permitted."
   ],
   [
    "Default deny",
    "A policy selecting all Pods with no allow rules, blocking all traffic in the listed directions."
   ]
  ],
  "example": "A team applies a default-deny ingress policy to `shop`, then an allow policy letting Pods labelled `app: frontend` reach `app: api` on TCP 8080, and another letting `app: api` reach `app: db` on 5432. A test Pod without the frontend label now times out when calling the API.",
  "tip": "Policies only add allowances; being selected is what isolates. `podSelector: {}` means all Pods, while `ingress: [{}]` means allow all, the opposite of no rules.",
  "check": [
   [
    "What happens to a Pod that no NetworkPolicy selects?",
    "It is non-isolated and accepts all traffic."
   ],
   [
    "Write the spec for a default deny of all ingress in a namespace.",
    "`podSelector: {}` with `policyTypes: [Ingress]` and no ingress rules."
   ],
   [
    "Two policies select the same Pod, each allowing a different source. What is allowed?",
    "Both sources; policies are additive and their allowances are combined."
   ]
  ]
 },
 {
  "t": "NetworkPolicy peers: podSelector, namespaceSelector, ipBlock; AND vs OR rule semantics; allowing DNS on egress",
  "body": [
   "Inside a `from` (ingress) or `to` (egress) list, each entry is a peer describing who may connect. There are three kinds, and the way you combine them in YAML changes the meaning dramatically.",
   "A `podSelector` peer on its own matches Pods with those labels in the policy's own namespace. A `namespaceSelector` peer on its own matches all Pods in namespaces whose labels match. Every namespace carries an automatic label `kubernetes.io/metadata.name=<name>`, so you can select a namespace by name without adding labels. An `ipBlock` peer matches IP ranges in CIDR notation, with optional `except` ranges; it is meant for traffic from outside the cluster, since Pod IPs change.",
   "Now the critical rule. Peers written as separate list items (each starting with its own dash) are ORed: traffic from any of them is allowed. A `namespaceSelector` and `podSelector` written in the same list item (one dash, two keys) are ANDed: the traffic must come from Pods with those labels inside matching namespaces.",
   "```yaml\n# AND: Pods labelled app=monitor in namespaces labelled team=ops\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n    podSelector:\n      matchLabels: {app: monitor}\n---\n# OR: any Pod in team=ops namespaces, OR app=monitor Pods in this namespace\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {team: ops}\n  - podSelector:\n      matchLabels: {app: monitor}\n```",
   "The difference is a single dash, and the OR version is often far more permissive than intended. Similarly, within one rule, `from` and `ports` are ANDed (these sources, on these ports), while separate rules in the `ingress` list are ORed.",
   "Egress policies need special care for DNS. Once a Pod is isolated for egress, it cannot reach the cluster DNS Pods unless you allow it, so every lookup of a Service name fails, and applications report 'name resolution' errors that look unrelated to the policy. Allow UDP and TCP port 53 to the DNS Pods in `kube-system`:",
   "```yaml\negress:\n- to:\n  - namespaceSelector:\n      matchLabels:\n        kubernetes.io/metadata.name: kube-system\n    podSelector:\n      matchLabels:\n        k8s-app: kube-dns\n  ports:\n  - {protocol: UDP, port: 53}\n  - {protocol: TCP, port: 53}\n- to:\n  - podSelector:\n      matchLabels: {app: db}\n  ports:\n  - {protocol: TCP, port: 5432}\n```",
   "A simpler, broader variant allows port 53 to any destination by leaving out `to` in that rule. Check the actual DNS Pod labels with `kubectl get pods -n kube-system --show-labels`; `k8s-app=kube-dns` is common but not guaranteed. Test with `nslookup` and `wget` from a temporary Pod carrying the policy's labels."
  ],
  "terms": [
   [
    "namespaceSelector",
    "Peer that matches Pods in namespaces with the given labels."
   ],
   [
    "ipBlock",
    "Peer that matches a CIDR range, with optional except ranges, usually for external traffic."
   ],
   [
    "AND semantics",
    "namespaceSelector and podSelector in the same peer item must both match."
   ],
   [
    "OR semantics",
    "Separate peer items or separate rules each allow traffic independently."
   ],
   [
    "kubernetes.io/metadata.name",
    "Automatic namespace label holding the namespace's name."
   ]
  ],
  "example": "A policy meant to let only the Prometheus Pods in `monitoring` scrape an app used two dashes, so every Pod in `monitoring` and every Pod labelled `app: prometheus` in the app's own namespace could connect. Merging the selectors into one item with a single dash restricted it to Prometheus Pods in `monitoring` only.",
  "tip": "One dash with both selectors means AND; two dashes means OR. After adding an egress policy, always allow port 53 UDP and TCP for DNS.",
  "check": [
   [
    "How do you select namespace `payments` by name in a namespaceSelector?",
    "matchLabels `kubernetes.io/metadata.name: payments`."
   ],
   [
    "An egress policy allows traffic to the db Pods, but the app cannot connect to `db` by name. Why?",
    "DNS lookups are blocked; add an egress rule allowing port 53 UDP and TCP to the cluster DNS Pods."
   ],
   [
    "Within one ingress rule, how do `from` and `ports` combine?",
    "They are ANDed: traffic must come from a listed source and target a listed port."
   ]
  ]
 },
 {
  "t": "NetworkPolicy needs a CNI plugin that enforces it (for example Calico or Cilium)",
  "body": [
   "Kubernetes defines the NetworkPolicy API, but it does not enforce it itself. The API server will happily store any policy you create. Enforcement is the job of the cluster's network plugin, which implements the Container Network Interface (CNI), the standard way Kubernetes asks a plugin to wire up Pod networking. If the plugin does not support NetworkPolicy, your policies exist but have no effect, and all traffic keeps flowing.",
   "Plugins such as Calico and Cilium enforce NetworkPolicy. Calico typically programs rules in the Linux kernel's packet filtering (iptables or nftables) or uses eBPF; Cilium uses eBPF programs attached in the kernel. Both watch NetworkPolicy objects and Pod labels through the API server and update filtering rules on every node as Pods and policies change. Some plugins, particularly simple ones focused only on connectivity such as a basic Flannel setup, do not enforce policies on their own. Some local tools start with such a plugin by default, so check before trusting a test result.",
   "There is no error message when policies are unenforced, which is what makes this important. `kubectl apply` succeeds, `kubectl describe networkpolicy` shows the rules, and yet a connection you meant to block still works. The only real proof is a test.",
   "```bash\n# which network plugin is running?\nkubectl get pods -n kube-system -o wide | grep -Ei 'calico|cilium|flannel|weave'\nkubectl get daemonset -n kube-system\n# test: apply a default deny, then try to connect\nkubectl run t --image=busybox --rm -it --restart=Never -n shop -- wget -qO- -T 2 api:8080\n```",
   "For practice clusters, choose a setup with an enforcing plugin. minikube can start with Calico using `minikube start --cni=calico`, or with Cilium using `--cni=cilium`. kind can be created with its default network plugin disabled in its cluster config and Calico or Cilium installed afterwards. The CKAD exam environment is provided with a working setup, so there you focus on writing correct policies, but in your own lab an unenforcing plugin can make you believe a wrong policy is right, or a right policy is wrong.",
   "It also helps to understand the layering. NetworkPolicy is part of the core Kubernetes API (`networking.k8s.io/v1`) and portable across enforcing plugins. Calico and Cilium also offer their own custom resources with extra features, such as explicit deny rules, cluster-wide policies, ordering, or rules based on DNS names or application-layer protocols. Those are CRDs specific to one plugin, not part of the CKAD objectives; if a task says NetworkPolicy, write the standard object.",
   "From a security perspective, NetworkPolicy is defence in depth: it limits how far an attacker can move sideways after compromising one Pod, but it complements, rather than replaces, authentication and encryption between services."
  ],
  "terms": [
   [
    "CNI (Container Network Interface)",
    "The standard interface Kubernetes uses to have a plugin set up Pod networking."
   ],
   [
    "Network plugin",
    "The CNI implementation that provides Pod networking and, if supported, enforces NetworkPolicy."
   ],
   [
    "Calico / Cilium",
    "Widely used network plugins that enforce NetworkPolicy."
   ],
   [
    "eBPF",
    "Linux kernel technology for running small verified programs, used by some plugins to filter traffic."
   ]
  ],
  "example": "A developer applies a default-deny policy in a practice cluster running a basic Flannel network and is puzzled when requests still succeed. Recreating the cluster with Calico as the network plugin makes the same policy block traffic as expected.",
  "tip": "If an exam-style question asks why a correct NetworkPolicy has no effect, the answer is that the cluster's CNI plugin does not enforce NetworkPolicy.",
  "check": [
   [
    "Does the API server reject NetworkPolicies when the network plugin cannot enforce them?",
    "No; they are stored normally but have no effect."
   ],
   [
    "Name two plugins that enforce NetworkPolicy.",
    "Calico and Cilium."
   ],
   [
    "How do you verify that a policy is enforced?",
    "Test real traffic, for example with wget from a temporary Pod, before and after applying the policy."
   ]
  ]
 },
 {
  "t": "Ingress resources: ingressClassName, host and path rules, pathType Prefix vs Exact, default backend, TLS secrets",
  "body": [
   "An Ingress describes how HTTP and HTTPS traffic from outside the cluster should reach Services inside it, using host names and URL paths. One Ingress, served by one external entry point, can route `shop.example.com/api` to one Service and `shop.example.com/` to another. The Ingress object is only a set of rules; an Ingress controller reads them and does the actual routing.",
   "`spec.ingressClassName` names the IngressClass, and therefore the controller, that should handle this Ingress. If it is omitted, the cluster's default IngressClass is used if one is marked; otherwise the Ingress may be ignored. List classes with `kubectl get ingressclass`.",
   "`spec.rules` is a list. Each rule may have a `host`; without one, it applies to all hosts. Each rule has `http.paths`, and each path has a `path`, a `pathType` and a `backend` naming a Service and port. The backend Service must be in the same namespace as the Ingress.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: shop\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts: [\"shop.example.com\"]\n    secretName: shop-tls\n  defaultBackend:\n    service:\n      name: fallback\n      port: {number: 80}\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service:\n            name: api\n            port: {number: 8080}\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port: {number: 80}\n```",
   "`pathType` decides how paths match. `Exact` matches the URL path exactly and is case-sensitive: `/api` matches only `/api`, not `/api/` or `/api/v1`. `Prefix` matches by path elements split on `/`: `/api` matches `/api`, `/api/` and `/api/v1`, but not `/apiv2`. `ImplementationSpecific` leaves matching to the controller. When several paths match, the longest matching path wins, and Exact is preferred over Prefix for equal paths.",
   "`spec.defaultBackend` handles requests that match no rule. Without it, the controller returns its own default response, commonly a 404. To serve HTTPS, list the hosts under `spec.tls` with a `secretName` pointing to a `kubernetes.io/tls` Secret in the same namespace, created with `kubectl create secret tls shop-tls --cert=tls.crt --key=tls.key`. The controller terminates TLS with that certificate and forwards plain HTTP to the Service, unless configured otherwise.",
   "Generate Ingresses quickly: `kubectl create ingress shop --class=nginx --rule=\"shop.example.com/api*=api:8080\" --rule=\"shop.example.com/*=web:80\" --default-backend=fallback:80`, adding `,tls=shop-tls` to a rule to enable TLS for that host. A trailing `*` in the path means Prefix; without it the path is Exact. Check the result with `kubectl describe ingress shop`, which lists each rule, its backends and their endpoints."
  ],
  "terms": [
   [
    "Ingress",
    "An object defining host- and path-based HTTP(S) routing rules to Services."
   ],
   [
    "ingressClassName",
    "Field selecting which IngressClass (controller) implements the Ingress."
   ],
   [
    "pathType Prefix",
    "Matches the path and anything below it, element by element."
   ],
   [
    "pathType Exact",
    "Matches only the exact URL path."
   ],
   [
    "defaultBackend",
    "Service that receives requests matching no rule."
   ]
  ],
  "example": "A task asks you to route `app.local/v1` exactly to Service `v1-svc` and everything under `app.local/` to `web`. You create one Ingress with an Exact path `/v1` to v1-svc:80 and a Prefix path `/` to web:80, so `/v1` goes to v1-svc while `/v1/users` falls through to web.",
  "tip": "Prefix matches whole path segments (`/api` does not match `/apiv2`); Exact matches one path only. In `kubectl create ingress`, a trailing `*` means Prefix.",
  "check": [
   [
    "Does a Prefix path `/foo` match `/foo/bar`? Does it match `/foobar`?",
    "It matches `/foo/bar` but not `/foobar`, because matching is by path element."
   ],
   [
    "What does an Ingress's tls section reference?",
    "The hosts to serve over HTTPS and a kubernetes.io/tls Secret, in the same namespace, holding the certificate and key."
   ],
   [
    "What handles requests that match no Ingress rule?",
    "The defaultBackend if set, otherwise the controller's own default (often a 404)."
   ]
  ]
 },
 {
  "t": "Ingress controllers (for example ingress-nginx) and testing with curl and Host headers",
  "body": [
   "An Ingress object does nothing on its own. An Ingress controller is the component that watches Ingress resources through the API and configures a reverse proxy to route traffic accordingly. Kubernetes does not ship a controller in its core; the cluster needs one installed. If none is running, Ingresses are accepted but no traffic is routed, and the ADDRESS column of `kubectl get ingress` stays empty.",
   "ingress-nginx has long been the most widely used example, though the Kubernetes project retired it in March 2026 (no further releases or security fixes), so new clusters should pick another controller; the concepts and testing steps below are the same. It runs the NGINX web server as Pods, typically in a namespace named `ingress-nginx`, and exposes them through a Service, often of type NodePort or LoadBalancer. Other controllers include Traefik, HAProxy-based controllers, cloud provider controllers and Envoy-based ones. Each controller registers an IngressClass; the class's `spec.controller` field identifies the controller, and an Ingress picks one with `ingressClassName`. An IngressClass can be marked as the cluster default with the annotation `ingressclass.kubernetes.io/is-default-class: \"true\"`.",
   "In practice labs, minikube provides one with `minikube addons enable ingress`, and kind clusters can install ingress-nginx from its project's manifests with the right port mappings. Confirm it is running with `kubectl get pods -n ingress-nginx` and `kubectl get ingressclass`.",
   "Testing is mostly done with curl. Because routing depends on the host name, but you usually have no DNS record for a test host, you send the request to the controller's address and set the HTTP `Host` header yourself. Find the entry point first: the EXTERNAL-IP of a LoadBalancer Service, or a node IP plus the NodePort of the controller's Service.",
   "```bash\nkubectl get svc -n ingress-nginx\nkubectl get ingress shop            # ADDRESS, HOSTS, PORTS\ncurl -H 'Host: shop.example.com' 192.168.49.2/api/health\ncurl -H 'Host: shop.example.com' 192.168.49.2:30080/\n```",
   "For HTTPS, use `curl -k --resolve shop.example.com:443:192.168.49.2` followed by the HTTPS URL of shop.example.com. The `--resolve host:port:ip` option tells curl to use a given IP for a host name, which is better than a Host header for HTTPS, because it also sends the right name for the TLS handshake (SNI, Server Name Indication) so the controller picks the right certificate. `-k` skips certificate verification for self-signed test certificates; `-v` shows the headers and certificate details. Adding the name to `/etc/hosts` on your machine is another option.",
   "Reading the results: a 404 from the controller (often an NGINX-branded page) means the request reached the controller but no rule matched, usually a wrong host, path or pathType, or the Ingress is not using this controller's class. A 503 or 502 means a rule matched but the backend Service has no ready endpoints or the port is wrong. A connection timeout means you are not reaching the controller at all. `kubectl describe ingress` lists backends and endpoints, and `kubectl logs -n ingress-nginx deploy/ingress-nginx-controller` shows each request the controller handled."
  ],
  "terms": [
   [
    "Ingress controller",
    "The component that watches Ingress objects and runs the proxy that routes traffic."
   ],
   [
    "IngressClass",
    "Object identifying a controller that Ingresses select with ingressClassName."
   ],
   [
    "Host header",
    "HTTP header naming the requested host, used by Ingress host rules."
   ],
   [
    "curl --resolve",
    "Makes curl connect to a chosen IP for a host name, keeping the correct name for TLS."
   ]
  ],
  "example": "After creating an Ingress for `shop.local`, `curl 192.168.49.2` returns a 404. Repeating it with `curl -H 'Host: shop.local' 192.168.49.2` returns the shop page: the controller was fine all along, but it routes by host and the first request carried the IP as its host.",
  "tip": "404 from the controller means no rule matched (host, path or class); 503 means the rule matched but the Service has no ready endpoints. Always set the Host header when testing by IP.",
  "check": [
   [
    "An Ingress shows no ADDRESS and nothing routes. What is the most likely cause?",
    "No Ingress controller for its class is running (or the Ingress names a class no controller handles)."
   ],
   [
    "Why add a Host header when curling the controller's IP?",
    "Ingress rules match on host name, and curling an IP sends the IP as the host, so no host rule matches."
   ],
   [
    "A request through the Ingress returns 503. Where do you look next?",
    "At the backend Service's endpoints and targetPort; the rule matched but no ready backend is available."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
