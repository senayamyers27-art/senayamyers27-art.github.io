/* Lessons for Microsoft Certified: Azure AI Cloud Developer Associate (AI-200 (replaced AZ-204)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ai-200", [
 {
  "t": "Dockerfiles for Python apps: base images, multi-stage builds, non-root users, .dockerignore",
  "body": [
   "A Dockerfile is the recipe that turns your Python source code into a container image: a read-only, layered package holding an operating system userland, the Python runtime, your dependencies and your code. Every Azure container service in this exam (App Service, Container Apps, Container Apps jobs and AKS, the Azure Kubernetes Service) runs images built this way, so a clean Dockerfile is the first skill the rest of the domain builds on.",
   "Start with the base image in the `FROM` line. Official Python images come in variants: the full Debian-based image is large but has build tools; `-slim` images drop most of those tools and are the usual choice for production; Alpine images are tiny but use musl instead of glibc, so many Python wheels must be compiled from source, which often makes builds slower and bigger in practice. Pin a specific version tag (for example a Python minor version plus `-slim`) rather than `latest`, so rebuilds are predictable.",
   "Each instruction (`RUN`, `COPY`, `ADD`) creates a layer, and Docker caches layers. Order instructions from least to most frequently changing: copy `requirements.txt` first, run `pip install --no-cache-dir -r requirements.txt`, and only then copy the rest of your code. A code change then reuses the cached dependency layer instead of reinstalling everything.",
   "A multi-stage build uses more than one `FROM`. The first stage (the builder) has compilers and headers and installs wheels into a virtual environment; the final stage starts from a small runtime image and uses `COPY --from=builder` to bring over only the finished virtual environment and your code. Build tools, caches and secrets used during the build never reach the final image, which shrinks size and attack surface.",
   "```dockerfile\nFROM python:3.12-slim AS builder\nWORKDIR /app\nRUN python -m venv /opt/venv\nENV PATH=/opt/venv/bin:$PATH\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nFROM python:3.12-slim\nRUN useradd --create-home appuser\nCOPY --from=builder /opt/venv /opt/venv\nENV PATH=/opt/venv/bin:$PATH\nWORKDIR /app\nCOPY . .\nUSER appuser\nEXPOSE 8000\nCMD [\"gunicorn\", \"-b\", \"0.0.0.0:8000\", \"app:app\"]\n```",
   "By default a container process runs as root. If an attacker exploits your app, root inside the container makes escaping or tampering easier. Create an unprivileged user and switch to it with `USER` before `CMD`, as above. Listen on a port above 1024, because non-root users cannot bind low ports without extra capabilities.",
   "Finally, `.dockerignore` works like `.gitignore` for the build context: it lists files that are never sent to the builder. Exclude `.git`, `__pycache__`, virtual environments, test data and especially `.env` files or local credentials. This speeds up builds (especially remote builds that upload the context, such as `az acr build`) and keeps secrets out of `COPY . .` layers, where anyone who pulls the image could read them."
  ],
  "terms": [
   [
    "Base image",
    "The image named in FROM that your image builds on, such as a slim Python image."
   ],
   [
    "Multi-stage build",
    "A Dockerfile with several FROM stages where the final stage copies only needed artifacts from earlier stages."
   ],
   [
    "Build context",
    "The set of files sent to the builder with a build; .dockerignore removes files from it."
   ],
   [
    "Layer cache",
    "Docker's reuse of unchanged instruction results, which makes instruction order matter for build speed."
   ],
   [
    "USER instruction",
    "Sets the user that later instructions and the running container use, so the app need not run as root."
   ]
  ],
  "example": "A team's FastAPI image was 1.1 GB and rebuilt all dependencies on every commit. They switched to a slim base, copied requirements.txt before the code, added a builder stage for compiled wheels and a .dockerignore excluding .git and .env. The final image dropped to a few hundred megabytes, rebuilds after code-only changes took seconds, and a security scan no longer flagged a leaked .env file.",
  "tip": "If a question asks how to keep compilers or secrets out of the final image, the answer is a multi-stage build; if it asks how to stop files from being sent to the build at all, the answer is .dockerignore.",
  "check": [
   [
    "Why should you copy requirements.txt and run pip install before copying the rest of the source code?",
    "Because layers are cached in order; code changes then reuse the cached dependency layer instead of reinstalling every package."
   ],
   [
    "What does a multi-stage build improve, and how?",
    "Image size and security: build tools live only in an earlier stage, and the final stage uses COPY --from to take just the built artifacts."
   ],
   [
    "Why run the app with a USER other than root?",
    "To limit what an attacker can do if the app is compromised; root in the container makes tampering and escape attempts easier."
   ]
  ]
 },
 {
  "t": "Azure Container Registry: Basic, Standard and Premium tiers; geo-replication and private endpoints on Premium",
  "body": [
   "Azure Container Registry (ACR) is Azure's private registry for container images and other OCI (Open Container Initiative) artifacts such as Helm charts. Your build pipeline pushes images to it, and App Service, Container Apps and AKS pull from it. Keeping images in a registry in the same region as your compute makes pulls fast and keeps traffic on Microsoft's network.",
   "A registry has a login server name of the form `myregistry.azurecr.io`, and image references look like `myregistry.azurecr.io/orders-api:1.4.2`. The part after the server is the repository, and the part after the colon is the tag. You create one with `az acr create --resource-group rg --name myregistry --sku Basic` and sign your local Docker client in with `az acr login --name myregistry`, which uses your Microsoft Entra ID sign-in rather than a stored password.",
   "ACR has three service tiers, and all three support the same core features: pushing and pulling images, Microsoft Entra authentication, ACR Tasks, webhooks and repository-scoped permissions. The tiers differ mainly in included storage, throughput (how many concurrent pulls and pushes perform well) and a set of advanced features. Basic is the cost-optimized entry point for learning and small workloads. Standard adds more storage and throughput and suits most production workloads. Premium has the highest storage and throughput and is the only tier with the enterprise features below.",
   "Geo-replication (Premium only) turns one registry into a multi-region registry. You add replicas with `az acr replication create --registry myregistry --location westeurope`. You still push once to the same login server name; ACR copies the content to each replica, and clients are routed to the closest one. Benefits: faster, cheaper pulls for compute in several regions (no cross-region egress), and continued pulls if one region has a problem. The alternative on lower tiers, separate registries per region, means pushing several times and managing several names.",
   "Private endpoints (Azure Private Link) are also Premium only. A private endpoint gives the registry a private IP address inside your virtual network, and with a private DNS zone the login server name resolves to that IP from inside the network. You can then disable public network access so the registry cannot be reached from the internet at all. Premium also adds features such as firewall rules for selected networks, customer-managed encryption keys and higher throughput for large clusters.",
   "Changing tiers is simple: `az acr update --name myregistry --sku Premium` upgrades in place without changing the login server or losing images. That means you can start on Basic in development and move up when you need a Premium-only feature."
  ],
  "terms": [
   [
    "Login server",
    "The registry's DNS name, such as myregistry.azurecr.io, used as the prefix of every image reference."
   ],
   [
    "Geo-replication",
    "A Premium ACR feature that keeps copies of one registry in several regions behind a single login server."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your VNet that connects privately to a service such as a Premium registry."
   ],
   [
    "Repository",
    "A named collection of related images in a registry, distinguished by tags and digests."
   ]
  ],
  "example": "A retailer runs its API on Container Apps in East US and West Europe. With a Standard registry in East US, the European replicas pulled across the Atlantic on every scale-out. They upgraded the registry to Premium, added a West Europe replica and a private endpoint in each VNet, then turned off public network access. Pushes still go to one login server, and each region now pulls locally over a private IP.",
  "tip": "Any requirement mentioning multiple regions from one registry name, private endpoints, or blocking public access points to Premium; Basic and Standard differ mainly in storage and throughput.",
  "check": [
   [
    "A company needs one registry that serves images to clusters in three regions with local pulls. Which tier and feature?",
    "Premium with geo-replication, because only Premium can replicate one registry to multiple regions behind a single login server."
   ],
   [
    "Can you upgrade a Basic registry to Premium without re-pushing images?",
    "Yes. az acr update --sku Premium changes the tier in place and keeps the login server and all content."
   ]
  ]
 },
 {
  "t": "Build and push images with `az acr build` (quick tasks) and ACR Tasks triggered by commits, base-image updates or schedules",
  "body": [
   "You do not need Docker installed locally to produce an image for Azure. ACR Tasks is a set of build features inside Azure Container Registry that runs builds on Azure-managed compute and pushes the result straight into your registry. This matters in locked-down developer machines, in cloud shells and in CI pipelines where you would rather not run a Docker daemon.",
   "The simplest form is a quick task. `az acr build --registry myregistry --image orders-api:{{.Run.ID}} .` uploads the current directory (the build context, filtered by `.dockerignore`) to ACR, builds the Dockerfile there, streams the build log back to your terminal and pushes the image if the build succeeds. `{{.Run.ID}}` is a placeholder ACR replaces with the unique run ID, which gives you a unique tag for every build. You can add `--file` to point at a different Dockerfile and `--platform` to target another operating system or architecture.",
   "Quick tasks are one-off and manual. When you want builds to happen automatically, you create a task with `az acr task create`. A task stores the build definition (context, Dockerfile, image name) and one or more triggers. Its context is usually a Git repository, for example a GitHub repository URL with a branch, plus a personal access token so ACR can read the repository and register a webhook.",
   "The three trigger types are worth memorizing. A source code update trigger (commit trigger) runs the task when a commit is pushed, or a pull request is opened, on the configured branch. A base image update trigger runs the task when the base image your Dockerfile's `FROM` line depends on is updated in ACR or a public registry, so your app image automatically picks up operating system and runtime patches. A timer trigger runs the task on a schedule defined with a cron expression through `--schedule`, useful for nightly rebuilds or maintenance jobs.",
   "```bash\naz acr task create --registry myregistry --name build-orders \\\n  --image orders-api:{{.Run.ID}} \\\n  --context <git-repo-url>#main \\\n  --file Dockerfile --git-access-token $PAT\n\naz acr task run --registry myregistry --name build-orders\naz acr task list-runs --registry myregistry --output table\n```",
   "Base image update triggers are enabled by default when you create a task, and they are the feature most likely to appear in a scenario about keeping images patched without developer effort. For more complex flows, a multi-step task defined in a YAML file (run with `az acr run`) can build, test and push several images in sequence, and it is also how you run maintenance commands such as the purge command covered in the next lesson."
  ],
  "terms": [
   [
    "Quick task",
    "A one-off cloud build started with az acr build that uploads the context, builds in ACR and pushes the image."
   ],
   [
    "ACR task",
    "A saved build definition in a registry that runs automatically on triggers such as commits, base-image updates or a schedule."
   ],
   [
    "Base image update trigger",
    "An ACR Tasks trigger that rebuilds your app image when the image in its FROM line is updated."
   ],
   [
    "Run ID",
    "The unique identifier of each ACR Tasks run, available as the {{.Run.ID}} placeholder for unique tags."
   ]
  ],
  "example": "A security team wants every app image rebuilt whenever the Python base image receives a security patch, without developers noticing. The platform team creates an ACR task per app with a commit trigger on main and the default base image update trigger. When a patched base image is published, ACR rebuilds each dependent app image and pushes a new unique tag, and the deployment pipeline picks it up.",
  "tip": "Match the trigger to the wording: code pushed means a commit trigger, OS or runtime patches in the parent image mean a base image update trigger, and nightly or weekly means a timer trigger with a cron schedule.",
  "check": [
   [
    "What does az acr build do that docker build plus docker push do not?",
    "It uploads the build context and runs the build on Azure-managed compute, then pushes to ACR, so no local Docker engine is required."
   ],
   [
    "Which ACR Tasks trigger keeps an app image patched when its parent image changes?",
    "The base image update trigger, which rebuilds the image when the image in its FROM line is updated."
   ]
  ]
 },
 {
  "t": "Tags vs digests, stable vs unique tags, and cleaning up old images with `az acr repository` and purge tasks",
  "body": [
   "Every image in a registry has two kinds of names. A tag is a human-friendly, mutable label such as `orders-api:1.4` or `orders-api:latest`. A digest is a SHA-256 hash of the image manifest, written like `orders-api@sha256:...`, and it is immutable: the same digest always refers to exactly the same bytes. A tag is a pointer that can be moved to a new image; a digest can never change.",
   "Microsoft's guidance distinguishes stable tags from unique tags. A stable tag, such as `1.4` or `latest`, is meant to move: when you publish a patch, the `1.4` tag is re-pointed to the new image. Stable tags suit base images that consumers want to track for updates. A unique tag is assigned once and never reused, for example a build ID, a Git commit hash or a date-time stamp. Unique tags suit deployments, because a deployment that references `orders-api:20260914.3` will pull the same image on every node and every scale-out, even weeks later.",
   "Why does this matter? If you deploy with a stable tag, a new node or a new replica may pull a newer image than the ones already running, and you end up with mixed versions and no clear record of what shipped. Deploying with a unique tag or a digest gives you repeatable deployments and simple rollbacks: point back to the previous unique tag. You can also lock an image or tag against changes with `az acr repository update --write-enabled false`.",
   "Unique tags accumulate, and storage costs money, so you need cleanup. The `az acr repository` commands inspect and delete content: `show-tags` lists tags (add `--orderby time_desc` to sort), `show-manifests` lists digests including untagged ones, `untag` removes a tag while keeping the manifest, and `delete --image repo:tag` or `delete --image repo@digest` deletes the manifest and all tags pointing to it. When a stable tag moves, the old manifest becomes untagged (dangling) but still uses storage.",
   "```bash\naz acr repository show-tags --name myregistry --repository orders-api --orderby time_desc --output table\naz acr repository delete --name myregistry --image orders-api:20260101.1 --yes\n\n# Scheduled cleanup: delete tags older than 30 days and untagged manifests, keep the newest 10\naz acr task create --registry myregistry --name nightly-purge \\\n  --cmd \"acr purge --filter 'orders-api:.*' --ago 30d --keep 10 --untagged\" \\\n  --schedule \"0 2 * * *\" --context /dev/null\n```",
   "The `acr purge` command runs inside ACR Tasks. `--filter` takes a repository and a regular expression for tags, `--ago` sets the age threshold, `--untagged` also removes dangling manifests, and `--keep` preserves the most recent tags. Test it first with `--dry-run`, which lists what would be deleted. Scheduling purge with a timer-triggered task gives you hands-off retention; Premium registries can also use a retention policy for untagged manifests."
  ],
  "terms": [
   [
    "Tag",
    "A mutable, human-readable label that points to an image manifest and can be moved to a newer image."
   ],
   [
    "Digest",
    "An immutable SHA-256 identifier of an image manifest that always refers to exactly the same content."
   ],
   [
    "Unique tag",
    "A tag used once and never reassigned, such as a build ID or commit hash, recommended for deployments."
   ],
   [
    "Untagged manifest",
    "An image whose tags have all been moved or removed; it still consumes storage until deleted."
   ],
   [
    "acr purge",
    "An ACR Tasks command that deletes tags and untagged manifests by filter and age, often run on a schedule."
   ]
  ],
  "example": "After a busy quarter, a team's registry held thousands of build-ID tags and its storage bill had grown steadily. They created a timer-triggered ACR task that runs acr purge nightly with --ago 30d --keep 10 --untagged, after first checking the output of a --dry-run. Deployments kept using unique tags, so production was never affected, and old images disappeared automatically.",
  "tip": "For a question about ensuring every replica runs exactly the same image, choose a unique tag or a digest, never latest; for automatic cleanup of old images, choose acr purge in a scheduled ACR task.",
  "check": [
   [
    "Why is latest a poor choice in a production deployment manifest?",
    "It is a stable tag that moves, so new replicas may pull a different image than running ones and rollbacks are unclear; unique tags or digests are repeatable."
   ],
   [
    "What happens to an image when its only tag is moved to a newer build?",
    "It becomes an untagged manifest that still uses storage until it is deleted, for example with acr purge --untagged."
   ]
  ]
 },
 {
  "t": "Pull images without passwords: managed identity with the AcrPull role instead of the admin user",
  "body": [
   "Every service that runs your container has to authenticate to your private registry before it can pull the image. There are several ways, and the exam expects you to pick the one without stored secrets.",
   "The admin user is a single account per registry with a username (the registry name) and two passwords. It is disabled by default. When enabled, it has full push and pull rights, it is shared by everyone who knows the password, and it cannot be scoped to one repository or tracked back to one app. Microsoft positions it for quick tests only. If you see a solution that enables the admin user and stores its password in an app setting, it is the wrong answer when a more secure option exists.",
   "The recommended approach uses a managed identity, an identity in Microsoft Entra ID that Azure creates and manages for a resource, with credentials you never see. You enable a system-assigned or user-assigned identity on the pulling resource, then assign that identity the AcrPull role on the registry. AcrPull is an Azure RBAC (role-based access control) role that allows reading images and nothing else. AcrPush adds pushing, for build agents.",
   "```bash\n# 1. identity and role\naz identity create -g rg -n app-pull-id\nACR_ID=$(az acr show -n myregistry --query id -o tsv)\nPRINCIPAL=$(az identity show -g rg -n app-pull-id --query principalId -o tsv)\naz role assignment create --assignee $PRINCIPAL --role AcrPull --scope $ACR_ID\n\n# 2. tell Container Apps to use it for this registry\naz containerapp registry set -n orders -g rg \\\n  --server myregistry.azurecr.io --identity <identity-resource-id>\n```",
   "Each compute service wires this up slightly differently. In Container Apps you set the registry with `--identity` (a user-assigned identity resource ID, or `system`). In App Service you set the site property `acrUseManagedIdentityCreds` to true (and `acrUserManagedIdentityID` for a user-assigned identity). In AKS, `az aks update --attach-acr myregistry` grants AcrPull to the cluster's kubelet identity for you.",
   "Why user-assigned is often preferred for image pulls: a system-assigned identity does not exist until the app is created, so on a brand-new app there is a chicken-and-egg problem where the first revision tries to pull before the role assignment exists. A user-assigned identity can be created and granted AcrPull first, then attached to the app at creation. Also note that role assignments can take a few minutes to propagate, so an immediate pull failure right after assignment may resolve itself.",
   "Other options exist, such as service principals with a client secret or repository-scoped tokens, but they involve secrets you must store and rotate. With a managed identity plus AcrPull, there is nothing to leak and access is least-privilege."
  ],
  "terms": [
   [
    "Admin user",
    "A registry-wide account with shared passwords and full push/pull rights; disabled by default and meant only for testing."
   ],
   [
    "AcrPull",
    "A built-in Azure RBAC role that grants permission to pull images from a registry and nothing more."
   ],
   [
    "AcrPush",
    "A built-in role that allows both pushing and pulling images, suited to build pipelines."
   ],
   [
    "Managed identity",
    "A Microsoft Entra identity for an Azure resource whose credentials Azure manages and rotates automatically."
   ]
  ],
  "example": "A Container App failed to start with an image pull error after an engineer disabled the registry's admin user. The fix was to create a user-assigned managed identity, grant it AcrPull on the registry, attach it to the app and run az containerapp registry set with that identity. The app pulled successfully, and no registry password remained anywhere in its configuration.",
  "tip": "When asked for the most secure or least-privilege way for an app to pull images, answer managed identity plus AcrPull; eliminate choices that enable the admin user or store a password.",
  "check": [
   [
    "Which role should a Container App's identity receive to pull images, and on which scope?",
    "AcrPull on the container registry (or a narrower scope), because it grants read-only image access."
   ],
   [
    "Why can a user-assigned identity be easier than system-assigned for a new app's first image pull?",
    "It exists before the app, so AcrPull can be granted in advance; a system-assigned identity only exists after the app is created."
   ]
  ]
 },
 {
  "t": "App Service custom containers on Linux: WEBSITES_PORT, continuous deployment and deployment slots",
  "body": [
   "Azure App Service (Web Apps) can run your own container image on Linux instead of a built-in language runtime. You get App Service's managed features, such as custom domains, TLS certificates, autoscale, authentication and deployment slots, while controlling the whole runtime through your Dockerfile. You create one by choosing a container as the publish option and pointing it at an image, for example `az webapp create --plan myplan --name orders-web -g rg --container-image-name myregistry.azurecr.io/orders-api:20260914.3`.",
   "App Service's front end receives traffic on ports 80 and 443 and forwards it to your container. It needs to know which port your app listens on inside the container. It tries to detect common ports, but the reliable way is the app setting `WEBSITES_PORT`. If your gunicorn process binds to 8000, set `WEBSITES_PORT=8000`. A mismatch is one of the most common causes of a container that starts but never passes the startup probe, shown in logs as the container not responding to HTTP pings. Related settings include `WEBSITES_CONTAINER_START_TIME_LIMIT`, which gives slow-starting containers more time, and `WEBSITES_ENABLE_APP_SERVICE_STORAGE`, which controls whether the shared `/home` storage is mounted.",
   "```bash\naz webapp config appsettings set -g rg -n orders-web --settings WEBSITES_PORT=8000\naz webapp log tail -g rg -n orders-web\n```",
   "Continuous deployment for containers means App Service pulls and restarts automatically when a new image is pushed. In the Deployment Center you turn on continuous deployment, and App Service exposes a webhook URL; with ACR, the portal can create a registry webhook for you, so a push to the configured repository and tag makes App Service pull the new image. Because the trigger is a push to a specific tag, this pattern typically uses a stable tag per environment. Alternatively, a CI/CD pipeline (GitHub Actions or Azure Pipelines) can push a unique tag and then update the app's image reference, which gives clearer history.",
   "Deployment slots are live apps with their own host names, such as `orders-web-staging`, that share the App Service plan. They require the Standard tier or higher. You deploy a new image to the staging slot, warm it up and test it, then swap. A swap exchanges the slots' content and most settings, and App Service warms the source slot before routing production traffic, so users see no downtime. If something is wrong, swap back. Settings marked as deployment slot settings (sticky) stay with the slot, which is how staging keeps its own database connection string. You can also route a percentage of production traffic to a slot for testing in production.",
   "Pull authentication follows the previous lesson: prefer a managed identity with AcrPull, and remember each slot is its own resource with its own identity and settings."
  ],
  "terms": [
   [
    "WEBSITES_PORT",
    "An App Service app setting that tells the platform which port the custom container listens on."
   ],
   [
    "Continuous deployment (containers)",
    "A setting that makes App Service pull and restart when a registry webhook reports a new image for the configured tag."
   ],
   [
    "Deployment slot",
    "A separate live instance of an app with its own host name that can be swapped with production."
   ],
   [
    "Slot setting",
    "An app setting or connection string marked sticky so it stays with its slot during a swap."
   ]
  ],
  "example": "A Flask image works locally on port 5000, but on App Service the log shows the site failing to respond to pings and restarting. Setting WEBSITES_PORT=5000 fixes it. The team then adds a staging slot, enables continuous deployment on it from the registry's staging tag, tests each new image there, and swaps into production when checks pass.",
  "tip": "If a custom container starts but App Service reports it is not responding on the expected port, the fix is the WEBSITES_PORT app setting, not a Dockerfile EXPOSE change.",
  "check": [
   [
    "Your container listens on 8080 and App Service keeps restarting it. What should you set?",
    "The app setting WEBSITES_PORT=8080 so the front end forwards traffic to the port the app actually listens on."
   ],
   [
    "What minimum tier do deployment slots need, and how do you keep a staging-only connection string from moving during a swap?",
    "Standard or higher; mark the connection string as a deployment slot setting so it sticks to its slot."
   ]
  ]
 },
 {
  "t": "Azure Container Apps: environments, ingress (external vs internal), secrets and managed identity",
  "body": [
   "Azure Container Apps is a serverless container platform built on Kubernetes and open-source components such as KEDA (Kubernetes Event-driven Autoscaling), Envoy and Dapr, without exposing the Kubernetes API. You deploy container images and describe scaling and networking; Azure runs the cluster. It fits APIs, background processors and microservices that need to scale, including down to zero.",
   "Every container app lives in a Container Apps environment, a secure boundary around a group of apps. Apps in the same environment share a virtual network and write logs to the same Log Analytics workspace, and they can call each other by name. You create one with `az containerapp env create`, optionally in your own VNet. Put apps that communicate or share a lifecycle in one environment; separate environments when you need isolation, for example between production and test.",
   "Ingress controls how HTTP or TCP traffic reaches your app. With ingress disabled, the app receives no inbound traffic, which suits queue workers. With external ingress, the app gets a public fully qualified domain name reachable from the internet (or from the VNet, for an environment configured with an internal load balancer). With internal ingress, the app is reachable only from inside the environment, for example from other container apps, which is the usual setting for back-end services. You also set the target port your container listens on, the transport (HTTP/1, HTTP/2 or TCP) and whether insecure HTTP is allowed.",
   "```bash\naz containerapp create -n orders -g rg --environment prod-env \\\n  --image myregistry.azurecr.io/orders-api:20260914.3 \\\n  --ingress internal --target-port 8000 \\\n  --secrets db-pass=$DB_PASS \\\n  --env-vars DB_PASSWORD=secretref:db-pass \\\n  --user-assigned <identity-resource-id>\n```",
   "Secrets are defined at the app level and are available to every revision. You then reference them from environment variables with `secretref:` (as above) or mount them as files in a volume. Changing a secret's value does not create a new revision or restart existing ones; you must restart or create a new revision for running replicas to pick it up. Rather than storing the value directly, a secret can be a Key Vault reference, where Container Apps reads it from Key Vault using a managed identity.",
   "Container Apps supports both system-assigned and user-assigned managed identities. The same identity can pull images from ACR (AcrPull), read Key Vault secrets and call data services such as Cosmos DB or Service Bus through `DefaultAzureCredential` in your Python code, so the app has no connection strings at all. Remember that inbound ingress and outbound identity are separate concerns: ingress decides who can reach the app, identity decides what the app can reach."
  ],
  "terms": [
   [
    "Container Apps environment",
    "A boundary that groups container apps sharing a virtual network and Log Analytics workspace."
   ],
   [
    "External ingress",
    "Ingress that exposes the app outside the environment, typically with a public endpoint."
   ],
   [
    "Internal ingress",
    "Ingress that makes the app reachable only from within its environment."
   ],
   [
    "secretref",
    "The prefix used in a container app environment variable to take its value from an app-level secret."
   ]
  ],
  "example": "A shop runs a public web front end and a private orders API. Both are container apps in one environment: the front end has external ingress on port 8000, and the orders API has internal ingress, so only the front end can call it by name. Each app has a user-assigned identity with AcrPull and Key Vault Secrets User, and database passwords are Key Vault references surfaced through secretref environment variables.",
  "tip": "Back-end services that only other apps in the environment should call use internal ingress; queue-only workers need no ingress at all. Also remember that updating a secret does not by itself restart replicas.",
  "check": [
   [
    "What do apps in the same Container Apps environment share?",
    "A virtual network boundary and a Log Analytics workspace, and they can reach each other directly."
   ],
   [
    "How does a container read an app-level secret as an environment variable?",
    "Set the variable's value to secretref:<secret-name>, which injects the secret at runtime."
   ]
  ]
 },
 {
  "t": "Container Apps revisions: single vs multiple revision mode, traffic splitting and labels",
  "body": [
   "A revision is an immutable snapshot of a container app's version. Each time you change a revision-scope setting, Container Apps creates a new revision with a generated name such as `orders--abc123` (or a suffix you choose). Revision-scope changes are anything under the app's `template` section: the container image, environment variables, CPU and memory, scale rules and probes. Application-scope changes, such as ingress settings, secrets values and registry credentials, apply to all revisions and do not create a new revision.",
   "Revisions let you roll forward and back safely. The old revision still exists after an update, so you can reactivate it or send traffic back to it. How many revisions are active at once depends on the app's revision mode.",
   "In single revision mode (the default), only one revision is active. When you deploy a change, Container Apps starts the new revision and, once it is ready (its replicas pass their health probes), shifts all traffic to it and deactivates the old one. This gives zero-downtime updates without any traffic management on your part. It suits most apps that simply move forward version by version.",
   "In multiple revision mode, several revisions can be active at the same time and you decide how ingress traffic is split among them by percentage weights. That enables blue-green deployments (the new revision gets 0 percent until tested, then 100 percent) and canary releases (send 10 or 20 percent to the new revision and watch errors and latency). Traffic splitting requires ingress to be enabled, because it is ingress that distributes requests.",
   "```bash\naz containerapp revision set-mode -n orders -g rg --mode multiple\naz containerapp update -n orders -g rg --image myregistry.azurecr.io/orders-api:20260920.1 --revision-suffix v2\naz containerapp ingress traffic set -n orders -g rg \\\n  --revision-weight orders--v1=80 orders--v2=20\naz containerapp revision label add -n orders -g rg --label blue --revision orders--v1\n```",
   "Labels give a revision a stable, predictable URL. A label such as `green` attached to a revision produces an address like the app's FQDN with `---green` added to the app name segment, and it follows whichever revision holds the label. Testers can always reach the candidate at the green URL, even when it receives 0 percent of the main traffic, and you can later move the label or swap labels between revisions. You can also split traffic by label weights instead of revision names.",
   "Watch out for one trap: in multiple revision mode, a new revision does not automatically receive traffic unless the traffic configuration says so (for example, with `latestRevision` weighting). If you deploy and nothing changes for users, check the traffic weights. Deactivated revisions stop running replicas and cost nothing, but they remain available for reactivation."
  ],
  "terms": [
   [
    "Revision",
    "An immutable snapshot of a container app's revision-scope configuration, created whenever the template changes."
   ],
   [
    "Single revision mode",
    "The default mode where one revision is active and a new revision replaces the old one once ready."
   ],
   [
    "Multiple revision mode",
    "A mode that keeps several revisions active and splits ingress traffic among them by weight."
   ],
   [
    "Revision label",
    "A named pointer to a revision that gives it a stable URL independent of its generated name."
   ]
  ],
  "example": "A team wants to test a new recommendation model on 10 percent of users. They switch the orders app to multiple revision mode, deploy the new image as revision v2, set traffic to v1=90 and v2=10, and label v2 as canary so QA can hit it directly. After a day of healthy metrics they move traffic to v2=100 and deactivate v1.",
  "tip": "Traffic splitting, blue-green and canary scenarios require multiple revision mode; changing a secret or ingress setting never creates a new revision because those are application-scope.",
  "check": [
   [
    "Which kinds of changes create a new revision?",
    "Revision-scope changes in the template, such as image, environment variables, resources and scale rules; app-scope changes like secrets or ingress do not."
   ],
   [
    "What does a label add to a revision?",
    "A stable URL that follows the label, so you can test a specific revision directly regardless of traffic weights."
   ]
  ]
 },
 {
  "t": "Container Apps scaling: HTTP rules, KEDA event rules (for example Service Bus queue length), min/max replicas and scale to zero",
  "body": [
   "Container Apps scales horizontally: it adds or removes replicas (running copies of a revision) based on scale rules you define. Scaling is driven by KEDA (Kubernetes Event-driven Autoscaling), which can watch HTTP load, TCP connections, CPU or memory, and dozens of event sources such as queues and streams. Each revision has its own scale settings, because scale settings are part of the revision template.",
   "Two numbers bound everything: minimum replicas and maximum replicas. With a minimum of 0, the app can scale to zero when there is no traffic or no pending events, and you pay nothing for running replicas while idle (on the consumption profile). The cost is a cold start: the first request or message after idle waits for a replica to start. With a minimum of 1 or more, the app is always warm. The maximum caps cost and protects downstream systems such as a database from being overwhelmed.",
   "An HTTP scale rule adds replicas based on concurrent HTTP requests per replica. If you set concurrent requests to 50 and 400 requests are in flight, KEDA aims for about eight replicas, within your min and max. If you define no rule at all on an app with ingress, a default HTTP rule applies. TCP rules work similarly on concurrent connections.",
   "Event-driven (custom) rules use a KEDA scaler. For a Service Bus queue, the `azure-servicebus` scaler reads the queue's message count and scales so each replica handles roughly the target number of messages. The rule needs metadata (namespace, queue name, target message count) and authentication, either a secret holding a connection string or, preferably, a managed identity with permission to read the queue metrics.",
   "```bash\naz containerapp update -n order-worker -g rg \\\n  --min-replicas 0 --max-replicas 20 \\\n  --scale-rule-name sb-queue --scale-rule-type azure-servicebus \\\n  --scale-rule-metadata queueName=orders namespace=shop-sb messageCount=20 \\\n  --scale-rule-auth connection=sb-connection-secret\n```",
   "CPU and memory rules scale on resource utilization, but they cannot scale to zero, because a replica must be running to report CPU. If scale to zero matters, use HTTP or event rules. When several rules exist, the app scales to satisfy whichever needs the most replicas. Scale-in happens after a cooldown period so short dips do not cause thrashing.",
   "Design your worker for scaling: messages should be processed idempotently, since a replica might be removed mid-work and another will pick up the message after its lock expires. In a lab, send a burst of messages to the queue and watch `az containerapp replica list` climb, then fall back to zero after the queue empties."
  ],
  "terms": [
   [
    "Replica",
    "One running instance of a container app revision; scaling changes the replica count."
   ],
   [
    "KEDA",
    "Kubernetes Event-driven Autoscaling, the open-source engine behind Container Apps scale rules."
   ],
   [
    "Scale to zero",
    "Running zero replicas when idle, possible with a minimum of 0 and HTTP or event-driven rules."
   ],
   [
    "Scaler",
    "A KEDA component that reads a metric from an event source, such as Service Bus message count, to drive scaling."
   ]
  ],
  "example": "An order worker has no ingress and processes a Service Bus queue. It is configured with min 0, max 20 and an azure-servicebus rule targeting 20 messages per replica. Overnight it runs no replicas and costs almost nothing; during a flash sale, 400 queued messages bring it to 20 replicas, and it returns to zero once the queue drains.",
  "tip": "If a scenario demands scale to zero, rule out CPU and memory scale rules; use an HTTP rule for web traffic or a KEDA event rule such as azure-servicebus for queue workers, with min replicas set to 0.",
  "check": [
   [
    "Why can't a CPU scale rule scale an app to zero?",
    "CPU usage must be measured from a running replica, so at zero replicas there is no metric to trigger a scale-out."
   ],
   [
    "What does the messageCount metadata in an azure-servicebus scale rule mean?",
    "The target number of queued messages per replica; KEDA adds replicas as the queue length grows beyond that ratio."
   ]
  ]
 },
 {
  "t": "Container Apps jobs: manual, scheduled and event-driven",
  "body": [
   "A container app is designed to run continuously (or scale to zero and wake on demand) and serve requests or process a stream. Some work, though, should run to completion and stop: a nightly report, a database migration, an embedding batch that processes new documents. Container Apps jobs are built for that. A job runs containers that start, do a finite piece of work, and exit; each run is called an execution.",
   "Jobs live in the same Container Apps environment as your apps, share its networking and logging, and support the same image pulls, secrets and managed identities. The main difference is the trigger type, and there are three.",
   "A manual job runs only when you start it, with `az containerapp job start` or the REST API. Use it for on-demand tasks such as running a migration during a release, or when a pipeline or another service decides exactly when the work should happen.",
   "A scheduled job runs on a cron expression, for example `0 2 * * *` for 2:00 every day. Container Apps cron expressions use the standard five-field format and are evaluated in UTC (Coordinated Universal Time), so plan for time zones. Use it for nightly cleanups, periodic re-indexing or reports.",
   "An event-driven job uses KEDA scale rules, just like container app scaling, but instead of adding long-running replicas it starts new executions when events are waiting. For example, with an `azure-servicebus` rule, each polling interval the job checks the queue and starts executions to process the messages. Each execution typically processes one or a few messages and exits. This suits heavy, independent work items such as rendering a video or embedding a large document.",
   "```bash\naz containerapp job create -n nightly-embed -g rg --environment prod-env \\\n  --trigger-type Schedule --cron-expression \"0 2 * * *\" \\\n  --replica-timeout 1800 --replica-retry-limit 2 \\\n  --parallelism 1 --replica-completion-count 1 \\\n  --image myregistry.azurecr.io/embedder:20260920.1\naz containerapp job execution list -n nightly-embed -g rg -o table\n```",
   "A few settings control each execution: the replica timeout (maximum run time in seconds), the retry limit for a failed replica, parallelism (how many replicas run at once) and the replica completion count (how many must succeed for the execution to count as succeeded). A job's container signals success or failure with its exit code: 0 means success, anything else means failure and may trigger a retry. Logs go to the environment's Log Analytics workspace, and the execution history shows status per run.",
   "Choose a job over a container app when the work has a clear end; choose an app when it listens continuously."
  ],
  "terms": [
   [
    "Container Apps job",
    "A Container Apps resource that runs containers to completion rather than continuously."
   ],
   [
    "Execution",
    "A single run of a job, containing one or more replicas that must finish successfully."
   ],
   [
    "Trigger type",
    "How a job starts: Manual, Schedule (cron) or Event (KEDA scale rules)."
   ],
   [
    "Replica timeout",
    "The maximum number of seconds a job replica may run before it is stopped and treated as failed."
   ]
  ],
  "example": "A RAG application must embed newly uploaded documents. Uploads place a message on a Service Bus queue, and an event-driven Container Apps job with an azure-servicebus rule starts an execution for pending messages. Each execution embeds one document, writes vectors to Cosmos DB and exits with code 0, while a separate scheduled job re-checks the whole index every night at 02:00 UTC.",
  "tip": "Run-to-completion work points to Container Apps jobs: pick Manual for on-demand, Schedule for cron-based timing (UTC), and Event for queue-driven work handled by KEDA.",
  "check": [
   [
    "What distinguishes a Container Apps job from a container app?",
    "A job runs containers that finish and exit, tracked as executions, while an app runs continuously or scales on demand to serve traffic."
   ],
   [
    "How does a job execution report failure?",
    "The container exits with a non-zero exit code, which marks the replica failed and may trigger retries up to the retry limit."
   ]
  ]
 },
 {
  "t": "AKS basics for developers: Deployment and Service manifests, `kubectl apply`, requests and limits, ConfigMaps and Secrets, attaching ACR",
  "body": [
   "Azure Kubernetes Service (AKS) is a managed Kubernetes cluster: Azure runs the control plane, and your workloads run on node pools of virtual machines. Compared with Container Apps you get the full Kubernetes API and more control, and you also take on more responsibility. As a developer you mostly write YAML manifests that describe desired state and let Kubernetes make it so.",
   "A Deployment describes a set of identical pods (a pod is one or more containers scheduled together). It declares the image, the number of replicas and a label selector; Kubernetes keeps that many pods running and performs rolling updates when you change the image. A Service gives those pods a stable virtual IP and DNS name and load-balances across them by matching labels. Type `ClusterIP` (the default) is reachable only inside the cluster; type `LoadBalancer` gets an Azure load balancer with an external IP.",
   "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: orders }\n  template:\n    metadata:\n      labels: { app: orders }\n    spec:\n      containers:\n      - name: orders\n        image: myregistry.azurecr.io/orders-api:20260920.1\n        ports: [{ containerPort: 8000 }]\n        envFrom: [{ configMapRef: { name: orders-config } }]\n        resources:\n          requests: { cpu: 250m, memory: 256Mi }\n          limits: { cpu: 500m, memory: 512Mi }\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders\nspec:\n  type: ClusterIP\n  selector: { app: orders }\n  ports: [{ port: 80, targetPort: 8000 }]\n```",
   "`kubectl apply -f orders.yaml` sends the manifest to the API server, creating or updating objects declaratively. Follow with `kubectl rollout status deployment/orders`, `kubectl get pods` and `kubectl describe pod <name>` to see events such as image pull errors. Get credentials first with `az aks get-credentials`.",
   "Resource requests are what the scheduler reserves for a container when choosing a node; limits are the maximum it may use. A container that exceeds its memory limit is killed (OOMKilled); one that exceeds its CPU limit is throttled. Setting requests too high wastes nodes; setting none makes scheduling unpredictable and autoscaling inaccurate.",
   "ConfigMaps hold non-sensitive configuration as key-value pairs; Secrets hold sensitive values. Both can be injected as environment variables or mounted as files. Kubernetes Secrets are only base64-encoded, not encrypted by that encoding, so restrict access with Kubernetes RBAC and consider the Azure Key Vault provider for the Secrets Store CSI Driver to pull secrets from Key Vault instead.",
   "To let nodes pull from your private registry without passwords, run `az aks update -n mycluster -g rg --attach-acr myregistry` (or `--attach-acr` at creation). This grants the AcrPull role to the cluster's kubelet managed identity, so no imagePullSecrets are needed."
  ],
  "terms": [
   [
    "Deployment",
    "A Kubernetes object that keeps a specified number of identical pods running and manages rolling updates."
   ],
   [
    "Service",
    "A Kubernetes object that gives a set of pods, selected by labels, a stable IP, DNS name and load balancing."
   ],
   [
    "Requests and limits",
    "Per-container CPU and memory settings: requests are reserved for scheduling, limits cap usage."
   ],
   [
    "ConfigMap",
    "A Kubernetes object that stores non-secret configuration data for pods."
   ],
   [
    "Kubernetes Secret",
    "An object for sensitive data that is base64-encoded, not encrypted by that encoding, and should be access-controlled."
   ]
  ],
  "example": "Pods for a new service sit in ImagePullBackOff. kubectl describe pod shows an unauthorized error from the registry. The developer runs az aks update --attach-acr, which grants AcrPull to the kubelet identity; after the next retry the pods start. Later, pods restart with OOMKilled, so the team raises the memory limit after checking actual usage.",
  "tip": "Requests drive scheduling and limits enforce caps (memory over the limit is OOMKilled, CPU is throttled); ACR access for AKS is az aks update --attach-acr, not an admin password in an imagePullSecret.",
  "check": [
   [
    "What is the difference between a Deployment and a Service?",
    "A Deployment runs and updates the pods; a Service gives those pods a stable network endpoint and load-balances to them by label."
   ],
   [
    "Is a Kubernetes Secret encrypted by being base64-encoded?",
    "No. Base64 is only an encoding; protection comes from RBAC, encryption at rest or using Key Vault through the CSI driver."
   ]
  ]
 },
 {
  "t": "Cosmos DB for NoSQL with the Python SDK (azure-cosmos): CosmosClient, create/upsert/read/delete items, parameterized queries",
  "body": [
   "Azure Cosmos DB for NoSQL is a globally distributed database that stores JSON documents called items. Items live in containers, containers live in databases, and databases live in an account. Every item has an `id` and a value for the container's partition key; together they uniquely identify the item. The Python SDK is the `azure-cosmos` package.",
   "Everything starts with `CosmosClient`. Create one per application and reuse it, because it maintains connections and caches metadata; creating a client per request is a common performance mistake. Authenticate with Microsoft Entra ID by passing a credential such as `DefaultAzureCredential()`, which works with a managed identity in Azure and your developer sign-in locally. Account keys also work but are secrets you would have to protect.",
   "```python\nfrom azure.cosmos import CosmosClient\nfrom azure.identity import DefaultAzureCredential\n\nclient = CosmosClient(ACCOUNT_ENDPOINT, credential=DefaultAzureCredential())\ncontainer = client.get_database_client(\"shop\").get_container_client(\"orders\")\n\norder = {\"id\": \"o-1001\", \"customerId\": \"c-42\", \"total\": 59.90, \"status\": \"new\"}\ncontainer.create_item(order)          # fails with 409 Conflict if id+pk exists\norder[\"status\"] = \"paid\"\ncontainer.upsert_item(order)          # insert or replace\nitem = container.read_item(item=\"o-1001\", partition_key=\"c-42\")\ncontainer.delete_item(item=\"o-1001\", partition_key=\"c-42\")\n```",
   "Know the difference between the write methods. `create_item` inserts and raises a conflict error (HTTP 409) if an item with the same id already exists in that partition. `replace_item` overwrites an existing item and fails with not found (404) if it does not exist. `upsert_item` does either, which is convenient for idempotent processing. `patch_item` changes specific fields without sending the whole document. `read_item` needs both the id and the partition key value, and it is the cheapest operation in Cosmos DB: a point read.",
   "Queries use a SQL-like language over JSON. Always pass user input as parameters rather than building strings; parameters prevent injection and let the service reuse query plans. Each parameter has a name starting with `@` and a value.",
   "```python\nitems = container.query_items(\n    query=\"SELECT c.id, c.total FROM c WHERE c.customerId = @cust AND c.total > @min\",\n    parameters=[{\"name\": \"@cust\", \"value\": \"c-42\"}, {\"name\": \"@min\", \"value\": 20}],\n    partition_key=\"c-42\")\nfor row in items:\n    print(row[\"id\"], row[\"total\"])\n```",
   "Supplying `partition_key` keeps the query in one partition. Without it, you pass `enable_cross_partition_query=True` and the query fans out to every partition, costing more Request Units. Errors surface as `CosmosHttpResponseError` with a status code, such as 404, 409, or 429 when you exceed provisioned throughput; the SDK retries 429s automatically a limited number of times. The async client in `azure.cosmos.aio` offers the same operations for asyncio apps."
  ],
  "terms": [
   [
    "CosmosClient",
    "The azure-cosmos entry point that connects to an account; create one and reuse it for the app's lifetime."
   ],
   [
    "Upsert",
    "An operation that inserts an item if it does not exist or replaces it if it does."
   ],
   [
    "Point read",
    "Reading one item by id and partition key with read_item, the cheapest Cosmos DB operation."
   ],
   [
    "Parameterized query",
    "A query whose values are passed separately as @name parameters instead of string concatenation."
   ]
  ],
  "example": "An order service calls create_item for each incoming order and occasionally receives the same message twice from its queue, which raises 409 Conflict. The team switches to upsert_item, making processing idempotent, and replaces a string-built query with a parameterized one that includes the customer's partition key, cutting RU cost and closing an injection risk.",
  "tip": "read_item always needs both item id and partition key; create_item fails on duplicates while upsert_item does not, and cross-partition queries need enable_cross_partition_query=True.",
  "check": [
   [
    "Which method should you use for idempotent writes where a message might be processed twice?",
    "upsert_item, because it inserts or replaces without failing when the item already exists."
   ],
   [
    "Why use parameters in query_items instead of f-strings?",
    "Parameters prevent query injection and let the service treat values safely and consistently."
   ]
  ]
 },
 {
  "t": "Partition key design: high cardinality, even spread, point reads; hierarchical partition keys",
  "body": [
   "Cosmos DB scales out by partitioning. Every item's partition key value places it in a logical partition, the set of all items that share that value. Logical partitions are grouped onto physical partitions, each with its own storage and a share of the container's throughput. You pick the partition key path, such as `/customerId`, when creating the container, and it cannot be changed afterwards without migrating the data to a new container. That makes it the most important design decision in Cosmos DB.",
   "A good partition key has high cardinality: many distinct values, so data and load can spread across many logical and physical partitions. A key like `/country` with a handful of values, or `/status` with three, is poor. A key like `/userId` or `/deviceId` with millions of values is usually good.",
   "It must also spread load evenly, both storage and requests. If one value is far busier than others, its partition becomes a hot partition: requests to it are throttled with HTTP 429 even though the container as a whole has spare throughput, because throughput is divided among physical partitions. A single logical partition also has a storage limit of 20 GB, so any key where one value could collect unbounded data (a timestamp day for all tenants, or one huge tenant) is risky.",
   "Finally, choose a key your most frequent reads can supply. A point read with id and partition key costs about 1 RU for a 1 KB item. A query that filters on the partition key stays inside one partition. A query without it fans out to all partitions and costs more as the container grows. Look at your dominant access pattern: if the app nearly always loads data per user, `/userId` fits; if it loads per order by order id, making `/id` the partition key can be ideal for point reads.",
   "Sometimes no single property satisfies all three goals. A multitenant SaaS app partitioned by `/tenantId` suffers when one large tenant exceeds 20 GB or dominates traffic. Hierarchical partition keys (also called subpartitioning) let you define up to three levels, such as `/tenantId`, then `/userId`, then `/sessionId`. Data for one tenant can then span multiple physical partitions, while queries that filter on the tenant (a prefix of the hierarchy) are still routed efficiently to only the partitions holding that tenant.",
   "```python\nfrom azure.cosmos import PartitionKey\ndb.create_container(\n    id=\"events\",\n    partition_key=PartitionKey(path=[\"/tenantId\", \"/userId\"], kind=\"MultiHash\"))\ncontainer.read_item(item=\"e1\", partition_key=[\"contoso\", \"u-77\"])\n```",
   "An older workaround is a synthetic key, a property you compute by concatenating values (for example `tenantId-userId`) or appending a random suffix. It still works, but hierarchical keys are now the cleaner answer when a question mentions a large tenant exceeding the logical partition limit."
  ],
  "terms": [
   [
    "Logical partition",
    "All items sharing one partition key value; limited to 20 GB of storage."
   ],
   [
    "Physical partition",
    "An internal unit of storage and throughput that hosts many logical partitions."
   ],
   [
    "Hot partition",
    "A partition receiving a disproportionate share of requests, causing 429 throttling despite spare total throughput."
   ],
   [
    "Hierarchical partition key",
    "A partition key of up to three levels, such as tenant then user, that lets one top-level value span physical partitions."
   ]
  ],
  "example": "A chat app partitioned messages by /roomId. One popular room caused 429 errors while other rooms were idle, and it was approaching the 20 GB logical partition limit. The team created a new container with a hierarchical key of /roomId then /userId and migrated with the change feed. Load spread out, and queries filtered by roomId still target only that room's partitions.",
  "tip": "The winning partition key has high cardinality, even request and storage distribution and appears in most queries; when one tenant outgrows 20 GB, think hierarchical partition keys.",
  "check": [
   [
    "Why is /status (new, paid, shipped) a poor partition key for orders?",
    "It has very low cardinality, so data and traffic concentrate in a few logical partitions, causing hot partitions and size limits."
   ],
   [
    "Can you change a container's partition key after creation?",
    "No. You must create a new container with the new key and migrate the data, for example with the change feed."
   ]
  ]
 },
 {
  "t": "Request Units: point reads vs queries, indexing policy include/exclude paths, consistency levels and their RU cost",
  "body": [
   "Cosmos DB measures every operation in Request Units (RUs), a single currency that blends CPU, memory and I/O. You provision throughput as RU per second (manual or autoscale) or pay per RU consumed in serverless mode. If you exceed your provisioned RU/s, requests are rate-limited with HTTP 429 and a retry-after hint. Every response reports its cost in the `x-ms-request-charge` header, which the Python SDK exposes through the last response headers, so you can measure rather than guess.",
   "The baseline is a point read: reading one 1 KB item by id and partition key costs about 1 RU. Writes cost more than reads because the item must be stored and indexed, and bigger items cost more. Queries vary widely: cost grows with the number of items scanned, the result size, the complexity of filters and functions, and whether the query spans partitions. A query that returns one item can easily cost several times a point read of that same item, so the cheapest design reads by id and partition key wherever possible.",
   "The indexing policy strongly affects write cost. By default, Cosmos DB indexes every property of every item (the include path `/*`), which makes any filter fast but makes each write pay to update many index entries. If you never filter on a large field, such as a document body or an embedding array, exclude it. You can also reverse the approach: exclude `/*` and include only the paths you query.",
   "```json\n{\n  \"indexingMode\": \"consistent\",\n  \"includedPaths\": [ { \"path\": \"/customerId/?\" }, { \"path\": \"/status/?\" } ],\n  \"excludedPaths\": [ { \"path\": \"/*\" } ],\n  \"compositeIndexes\": [[ { \"path\": \"/status\" }, { \"path\": \"/orderDate\", \"order\": \"descending\" } ]]\n}\n```",
   "A path ending in `/?` indexes a scalar value, and `/*` indexes everything below that point. Composite indexes support efficient ORDER BY on several properties. Setting `indexingMode` to `none` disables indexing entirely, which suits a pure key-value workload that only does point reads.",
   "Consistency levels, from strongest to weakest, are Strong, Bounded Staleness, Session, Consistent Prefix and Eventual. Session is the default: a client always reads its own writes, which fits most apps. Strong and Bounded Staleness make reads cost roughly twice as many RUs as the weaker levels, because reads are served with a quorum of replicas, and Strong also adds write latency across regions. Session, Consistent Prefix and Eventual reads cost about the same. You set a default level on the account, and a client can request a weaker level (never a stronger one) per client or request.",
   "When a question asks how to reduce RU consumption, look for these levers: switch queries to point reads, add the partition key to filters, exclude unqueried paths from the index, and relax consistency from Strong or Bounded Staleness if the scenario allows."
  ],
  "terms": [
   [
    "Request Unit (RU)",
    "The normalized cost unit for Cosmos DB operations; a 1 KB point read costs about 1 RU."
   ],
   [
    "Indexing policy",
    "Container settings that choose which paths are indexed, the indexing mode and composite or vector indexes."
   ],
   [
    "Session consistency",
    "The default level, guaranteeing that a client reads its own writes within its session."
   ],
   [
    "HTTP 429",
    "The status returned when requests exceed provisioned throughput; clients should retry after the indicated delay."
   ]
  ],
  "example": "A document store saw high RU charges on every write. Checking x-ms-request-charge showed large inserts costing far more than expected because the default policy indexed a big text field and every element of a 1536-number embedding. Excluding those paths cut write cost sharply, and switching reads from a query by id to read_item brought read charges down to about 1 RU each.",
  "tip": "Strong and Bounded Staleness reads cost about double; excluding unused paths lowers write RUs; a point read beats any query. Clients can relax consistency per request but cannot strengthen it beyond the account default.",
  "check": [
   [
    "How can you lower the RU cost of writes for items with a large text field that is never filtered?",
    "Exclude that path in the indexing policy so writes do not maintain index entries for it."
   ],
   [
    "Which consistency levels roughly double read RU cost?",
    "Strong and Bounded Staleness, because reads require a quorum of replicas."
   ]
  ]
 },
 {
  "t": "Cosmos DB vector search: container vector policy (path, data type, dimensions, distance function), vector indexes (flat, quantizedFlat, diskANN) and VectorDistance()",
  "body": [
   "Embedding models turn text or images into vectors: long arrays of numbers where similar meanings sit close together. Vector search finds the items whose vectors are nearest to a query vector. Cosmos DB for NoSQL can store embeddings inside the same JSON items as your operational data and search them, so a RAG (retrieval-augmented generation) app does not need a separate vector database. The feature must be enabled on the account first (the vector search capability for NoSQL).",
   "Vector search needs two pieces of configuration on the container. The first is the container vector policy (vector embedding policy), which describes each embedding property: its `path` (for example `/embedding`), its `dataType` (such as `float32`, or smaller types like `int8` and `uint8`), its number of `dimensions` (which must match your embedding model's output length) and its `distanceFunction`: `cosine`, `dotproduct` or `euclidean`. Use the distance function your embedding model was designed for; cosine is the common default for text embeddings. The vector policy is set when you create the container, so plan it up front.",
   "The second piece is a vector index in the container's indexing policy, listed under `vectorIndexes` with the same path and a type. There are three types. `flat` does exact brute-force search over full-precision vectors; it gives perfect recall but supports only a limited number of dimensions and gets expensive as data grows, so it fits small datasets. `quantizedFlat` compresses vectors (quantization) and still scans them, trading a little accuracy for lower cost and supporting larger dimensions. `diskANN` builds a graph-based approximate nearest neighbor index developed by Microsoft Research, giving low latency and cost at large scale with high but not perfect recall. As a rule of thumb: small or exact needs, flat; moderate size, quantizedFlat; large scale, diskANN.",
   "```json\n\"vectorEmbeddingPolicy\": { \"vectorEmbeddings\": [\n  { \"path\": \"/embedding\", \"dataType\": \"float32\", \"dimensions\": 1536, \"distanceFunction\": \"cosine\" } ] },\n\"indexingPolicy\": {\n  \"includedPaths\": [ { \"path\": \"/*\" } ],\n  \"excludedPaths\": [ { \"path\": \"/embedding/*\" } ],\n  \"vectorIndexes\": [ { \"path\": \"/embedding\", \"type\": \"diskANN\" } ] }\n```",
   "Notice the embedding path is excluded from the regular range index. Indexing hundreds of numbers per item as normal properties would make every write expensive and adds no value; the vector index handles it.",
   "You query with the system function `VectorDistance()`, which returns a similarity score between an item's vector and the query vector. Combine it with `TOP` and `ORDER BY` to get the k nearest items, and add ordinary WHERE filters for metadata.",
   "```python\nresults = container.query_items(\n    query=\"SELECT TOP 5 c.id, c.text, VectorDistance(c.embedding, @q) AS score \"\n          \"FROM c WHERE c.category = @cat ORDER BY VectorDistance(c.embedding, @q)\",\n    parameters=[{\"name\": \"@q\", \"value\": query_vector}, {\"name\": \"@cat\", \"value\": \"manuals\"}],\n    enable_cross_partition_query=True)\n```",
   "Always use `TOP` with vector queries so the engine does not return every item. For cosine and dot product, a higher score means more similar; the ORDER BY on VectorDistance returns the most similar items first."
  ],
  "terms": [
   [
    "Vector embedding policy",
    "Container setting that defines each vector path, data type, dimension count and distance function."
   ],
   [
    "flat index",
    "An exact, brute-force vector index with perfect recall, suited to small datasets and limited dimensions."
   ],
   [
    "quantizedFlat index",
    "A vector index that compresses vectors and scans them, lowering cost with a small accuracy trade-off."
   ],
   [
    "diskANN index",
    "A graph-based approximate nearest neighbor index designed for low latency at large scale."
   ],
   [
    "VectorDistance()",
    "The Cosmos DB query function that returns the similarity score between two vectors."
   ]
  ],
  "example": "A support chatbot stores product manual chunks in Cosmos DB with a 1536-dimension float32 embedding, cosine distance and a diskANN index, and excludes /embedding/* from range indexing. For each question it embeds the text and runs SELECT TOP 5 with VectorDistance and a WHERE filter on product line, then feeds the five chunks to the model.",
  "tip": "Dimensions in the vector policy must match the embedding model output; choose flat for small exact search, quantizedFlat for mid-size and diskANN for large scale, and exclude the vector path from the regular index.",
  "check": [
   [
    "Which four properties describe a vector in the container vector policy?",
    "The path, the data type, the number of dimensions and the distance function (cosine, dotproduct or euclidean)."
   ],
   [
    "Why include TOP in a VectorDistance query?",
    "To limit the result to the k nearest items; without it the query would score and return far more items and cost more RUs."
   ]
  ]
 },
 {
  "t": "Change feed: change feed processor with a lease container, Azure Functions Cosmos DB trigger, latest-version mode vs all versions and deletes",
  "body": [
   "The change feed is a persistent, ordered record of changes to items in a Cosmos DB container. Instead of polling with queries, your code reads what changed since it last looked. It is the backbone of event-driven patterns: updating a search or vector index when documents change, generating embeddings for new items, keeping a cache or a materialized view in sync, or triggering workflows. Changes are ordered within each partition key value, but not across partitions.",
   "The change feed has two modes. Latest version mode (the default) delivers the latest version of each created or updated item. If an item changes several times between reads, you may see only its latest state, and deletes do not appear at all. The usual workaround is a soft delete: set a flag such as `deleted: true` (which is an update the feed sees) and let a TTL (time to live) remove the item later. All versions and deletes mode records every change, including intermediate versions and deletes, with metadata about the operation. It requires the account to use continuous backup, and you can only read changes that are within the continuous backup retention window.",
   "The change feed processor is a library feature (in the .NET and Java SDKs, and conceptually reused by Azure Functions) that makes consuming the feed reliable at scale. It has four parts: the monitored container whose changes you read; a lease container that stores checkpoints (how far each partition has been processed) and coordinates ownership; the compute instances, each with a unique instance name; and the delegate, your handler code that processes each batch. When you add instances, leases are rebalanced so the work spreads out; if an instance fails, another takes over its leases and resumes from the last checkpoint. Processing is at least once, so make handlers idempotent.",
   "For Python developers, the most common way to consume the change feed is the Azure Functions Cosmos DB trigger, which runs a change feed processor for you. You supply the connection, database, monitored container and lease container; the function receives a list of changed documents.",
   "```python\nimport azure.functions as func\napp = func.FunctionApp()\n\n@app.cosmos_db_trigger(arg_name=\"docs\", connection=\"CosmosConn\",\n    database_name=\"kb\", container_name=\"chunks\",\n    lease_container_name=\"leases\", create_lease_container_if_not_exists=True)\ndef embed_new_chunks(docs: func.DocumentList):\n    for d in docs:\n        if not d.get(\"embedding\"):\n            ...  # call embedding model, upsert vector\n```",
   "If several independent functions monitor the same container, each needs its own lease state; share one lease container but give each a different lease prefix, or use separate lease containers. Otherwise they compete for the same leases and each sees only part of the changes. The Python SDK can also read the feed directly with `container.query_items_change_feed()`, where you manage continuation tokens yourself."
  ],
  "terms": [
   [
    "Change feed",
    "An ordered, persistent log of creates and updates (and, in one mode, deletes) to a Cosmos DB container."
   ],
   [
    "Lease container",
    "A container that stores change feed checkpoints and partition ownership for processors and Functions triggers."
   ],
   [
    "Latest version mode",
    "The default change feed mode that returns the latest state of changed items and does not include deletes."
   ],
   [
    "All versions and deletes mode",
    "A change feed mode that records every change, including deletes, and requires continuous backup."
   ]
  ],
  "example": "A knowledge base must keep its vectors current. A Python function with a Cosmos DB trigger listens to the chunks container, and for each new or edited chunk it calls the embedding model and upserts the vector. Deleted articles were not disappearing from search, so the team changed deletion to set deleted: true with a TTL, which the latest version mode feed delivers as an update.",
  "tip": "Deletes are invisible in latest version mode; answer with soft delete plus TTL, or all versions and deletes mode (which needs continuous backup). Two functions on one container need separate lease prefixes or containers.",
  "check": [
   [
    "What is stored in the lease container?",
    "Checkpoints and ownership records that track how far each partition range has been processed and by which instance."
   ],
   [
    "How can you capture deletions if you must stay on latest version mode?",
    "Use a soft delete flag that the feed sees as an update, and remove the item later with TTL."
   ]
  ]
 },
 {
  "t": "Azure Database for PostgreSQL flexible server: allow-listing and enabling the vector (pgvector) extension",
  "body": [
   "Azure Database for PostgreSQL flexible server is Azure's managed PostgreSQL service. Azure handles patching, backups, high availability and scaling of compute and storage, and you get standard PostgreSQL that works with psycopg, SQLAlchemy and every other PostgreSQL tool. Many AI apps already have relational data in PostgreSQL, and pgvector lets them add vector search to that same database.",
   "pgvector is an open-source PostgreSQL extension that adds a `vector` data type, distance operators and approximate nearest neighbor indexes. On a server you run yourself, you install it and run `CREATE EXTENSION vector;`. On a managed flexible server, there is an extra step, and it is exactly what the exam tests: extensions must be allow-listed before they can be created.",
   "Step one is allow-listing. Flexible server has a server parameter named `azure.extensions` that lists which extensions users are permitted to create. You add `VECTOR` to it in the portal (Server parameters) or with the CLI. If you skip this step, `CREATE EXTENSION vector` fails with an error saying the extension is not allow-listed. A few extensions also need `shared_preload_libraries` and a restart, but pgvector does not.",
   "```bash\naz postgres flexible-server parameter set -g rg --server-name pg-ai \\\n  --name azure.extensions --value VECTOR\n# keep existing entries: use a comma-separated list, for example VECTOR,PG_TRGM\n```",
   "Step two is creating the extension in each database that will use it. Extensions are per database, not per server. Connect to the target database with a role that has permission (the server admin or a member of the `azure_pg_admin` role) and run the statement. Note that the extension's SQL name is `vector`, even though the project is called pgvector.",
   "```sql\nCREATE EXTENSION IF NOT EXISTS vector;\nSELECT extname, extversion FROM pg_extension WHERE extname = 'vector';\n```",
   "For connectivity, choose between public access with firewall rules and private access through VNet integration or a private endpoint. For authentication, flexible server supports Microsoft Entra ID, so your app's managed identity can get an access token with `DefaultAzureCredential` and use it as the password instead of storing one. Size compute for vector workloads: approximate nearest neighbor indexes, especially HNSW (Hierarchical Navigable Small World), perform best when they fit in memory, and building them benefits from higher `maintenance_work_mem`.",
   "A related extension, `azure_ai`, lets SQL call Azure AI services (for example to create embeddings inside the database). It follows the same allow-listing rule, which makes the pattern worth remembering: allow-list in `azure.extensions`, then `CREATE EXTENSION` per database."
  ],
  "terms": [
   [
    "Flexible server",
    "The deployment option of Azure Database for PostgreSQL that offers managed PostgreSQL with configurable compute, HA and networking."
   ],
   [
    "azure.extensions",
    "The server parameter that allow-lists which extensions may be created on a flexible server."
   ],
   [
    "pgvector",
    "An open-source PostgreSQL extension, created as vector, that adds a vector type, distance operators and ANN indexes."
   ],
   [
    "azure_pg_admin",
    "A role on flexible server whose members can perform administrative actions such as creating allow-listed extensions."
   ]
  ],
  "example": "A developer runs CREATE EXTENSION vector on a new flexible server and receives an error that the extension is not allow-listed. They add VECTOR to the azure.extensions server parameter, reconnect to the app database and run the statement again, which succeeds. A colleague later finds the type missing in a second database and learns that extensions must be created in each database.",
  "tip": "Two steps in order: add VECTOR to the azure.extensions server parameter, then run CREATE EXTENSION vector in each database; the extension's SQL name is vector, not pgvector.",
  "check": [
   [
    "Why does CREATE EXTENSION vector fail on a new flexible server?",
    "The extension has not been allow-listed; add VECTOR to the azure.extensions server parameter first."
   ],
   [
    "Is an extension created once per server or once per database?",
    "Once per database; each database that uses vectors needs its own CREATE EXTENSION."
   ]
  ]
 },
 {
  "t": "Pgvector: vector(n) columns, distance operators (<-> L2, <=> cosine, <#> inner product), HNSW vs IVFFlat indexes and tuning (m, ef_search, lists, probes)",
  "body": [
   "With the extension created, you store embeddings in a column of type `vector(n)`, where n is the number of dimensions your embedding model returns. Inserting a vector with a different length fails, which protects you from mixing models. A typical table keeps the chunk text, its metadata and its embedding together, so a single SQL query can filter and rank.",
   "```sql\nCREATE TABLE chunks (\n  id bigserial PRIMARY KEY,\n  doc_id int, lang text, body text,\n  embedding vector(1536));\n\nSELECT id, body, embedding <=> $1 AS distance\nFROM chunks WHERE lang = 'en'\nORDER BY embedding <=> $1\nLIMIT 5;\n```",
   "pgvector defines three main distance operators. `<->` is L2 (Euclidean) distance. `<=>` is cosine distance, which is 1 minus cosine similarity, so smaller is more similar. `<#>` is the negative inner product; it is negated because PostgreSQL index scans only work with ascending order, so sorting ascending by `<#>` returns the largest inner products first. In every case you ORDER BY the operator ascending and use LIMIT for top-k. For normalized embeddings (length 1), cosine and inner product give the same ranking, and inner product is slightly cheaper.",
   "Without an index, the query does an exact scan of every row, which is perfectly accurate but slows down as the table grows. pgvector offers two approximate nearest neighbor (ANN) index types, and each index is built for one operator class that must match the operator in your query: `vector_l2_ops` for `<->`, `vector_cosine_ops` for `<=>` and `vector_ip_ops` for `<#>`. If the operator does not match, the planner ignores the index.",
   "HNSW (Hierarchical Navigable Small World) builds a multi-layer graph. It has better speed and recall trade-offs, can be created on an empty table and stays accurate as rows are added, but it builds more slowly and uses more memory. Its build parameters are `m`, the maximum connections per node, and `ef_construction`, the size of the candidate list during building; larger values improve recall and cost build time and memory. At query time, `hnsw.ef_search` sets the candidate list size: raise it for better recall, lower it for speed.",
   "IVFFlat (inverted file with flat lists) clusters vectors into `lists` and searches only the closest lists. It builds faster and uses less memory, but it should be created after the table has representative data, because the clusters are computed at build time. The pgvector guidance is roughly rows divided by 1000 lists for up to a million rows, and the square root of rows beyond that. At query time, `ivfflat.probes` sets how many lists to search; more probes mean better recall and slower queries.",
   "```sql\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);\nSET hnsw.ef_search = 100;\n-- or\nCREATE INDEX ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);\nSET ivfflat.probes = 10;\n```",
   "Use `EXPLAIN ANALYZE` to confirm the index is used. Remember that a restrictive WHERE filter applied after an approximate index scan can return fewer than k rows; raising ef_search or probes helps."
  ],
  "terms": [
   [
    "vector(n)",
    "The pgvector column type holding an embedding of exactly n dimensions."
   ],
   [
    "<=> operator",
    "pgvector's cosine distance operator; smaller values mean more similar vectors."
   ],
   [
    "HNSW",
    "A graph-based ANN index with strong recall and speed, tuned with m, ef_construction and hnsw.ef_search."
   ],
   [
    "IVFFlat",
    "A cluster-based ANN index built after loading data, tuned with lists at build time and ivfflat.probes at query time."
   ],
   [
    "Operator class",
    "The index setting, such as vector_cosine_ops, that must match the distance operator used in queries."
   ]
  ],
  "example": "A search query was slow even after an index was created. EXPLAIN showed a sequential scan: the index used vector_l2_ops but the query ordered by <=>. Rebuilding the HNSW index with vector_cosine_ops made the planner use it. Recall on filtered queries was a little low, so they raised hnsw.ef_search for that session.",
  "tip": "Match operator and operator class (<-> with vector_l2_ops, <=> with vector_cosine_ops, <#> with vector_ip_ops). Build IVFFlat after loading data; HNSW works on empty tables. ef_search and probes trade speed for recall.",
  "check": [
   [
    "Why is the inner product operator <#> negative?",
    "PostgreSQL index scans order ascending, so negating the inner product makes the most similar vectors sort first."
   ],
   [
    "Which parameter do you raise to improve recall for an IVFFlat index at query time?",
    "ivfflat.probes, which searches more lists at the cost of speed."
   ]
  ]
 },
 {
  "t": "Retrieval-augmented generation: chunking, embedding, storing, top-k retrieval with metadata filters, adding results to the prompt",
  "body": [
   "A large language model only knows what was in its training data, and it may confidently invent answers about your private documents. Retrieval-augmented generation (RAG) fixes this by finding relevant passages from your own data at question time and putting them in the prompt, so the model answers from supplied facts. RAG has an ingestion pipeline and a query pipeline, and the data services from this domain sit in the middle.",
   "Ingestion starts with chunking: splitting documents into passages small enough to embed and to fit several into a prompt, yet large enough to carry meaning. Common strategies are fixed-size chunks measured in tokens with some overlap between neighbors (so a sentence cut at a boundary still appears whole in one chunk), or structure-aware splitting by headings, paragraphs or sentences. Chunks that are too big dilute the match; chunks that are too small lose context. Keep metadata with every chunk: source document, title, section, language, date, and access information such as tenant or allowed groups.",
   "Next is embedding. Each chunk goes through an embedding model, which returns a fixed-length vector. Use the same model for documents and for queries; vectors from different models are not comparable. Record the model name with the data so you know when to re-embed.",
   "Then storing: write the chunk text, metadata and vector to a vector-capable store, such as a Cosmos DB container with a vector policy, a PostgreSQL table with a `vector(n)` column, or a Redis index. Keep it current with the change feed or an event-driven job when source documents change.",
   "At query time, embed the user's question, then run top-k retrieval: fetch the k chunks whose vectors are nearest to the question vector, where k is typically small, such as 3 to 10. Apply metadata filters in the same query, for example the user's tenant, a product line or a language. Filters improve relevance and are essential for security: they ensure a user never retrieves chunks from documents they are not allowed to see. Some systems combine vector similarity with keyword search (hybrid search) or rerank results to improve quality.",
   "```python\nq_vec = embed(question)\nhits = container.query_items(\n  \"SELECT TOP 5 c.text, c.source FROM c WHERE c.tenantId = @t \"\n  \"ORDER BY VectorDistance(c.embedding, @v)\",\n  parameters=[{\"name\": \"@t\", \"value\": tenant}, {\"name\": \"@v\", \"value\": q_vec}],\n  partition_key=tenant)\ncontext = \"\\n\\n\".join(f\"[{h['source']}] {h['text']}\" for h in hits)\nmessages = [\n  {\"role\": \"system\", \"content\": \"Answer only from the sources below. If the answer is not there, say so. Cite sources.\\n\\n\" + context},\n  {\"role\": \"user\", \"content\": question}]\n```",
   "Finally, add the results to the prompt. Place retrieved passages in a clearly delimited section, tell the model to answer only from them and to say when the answer is not present, and ask for citations so users can verify. Watch the model's context window: k times chunk size plus instructions must fit. Treat retrieved text as data, not instructions, since documents might contain text that tries to steer the model."
  ],
  "terms": [
   [
    "RAG",
    "Retrieval-augmented generation: retrieving relevant data at query time and adding it to the model prompt to ground answers."
   ],
   [
    "Chunking",
    "Splitting source documents into passages, often with overlap, before embedding them."
   ],
   [
    "Top-k retrieval",
    "Returning the k items whose vectors are most similar to the query vector."
   ],
   [
    "Metadata filter",
    "A condition on chunk properties, such as tenant or language, applied alongside vector search."
   ],
   [
    "Grounding",
    "Constraining a model's answer to supplied source content, often with instructions and citations."
   ]
  ],
  "example": "An HR assistant answered a question about parental leave using another country's policy. The team added country and tenant metadata to every chunk, filtered retrieval on the user's country, lowered chunk size with a small overlap so policy sections stayed intact, and instructed the model to cite sources and say when no policy matched. Wrong-country answers stopped.",
  "tip": "Use the same embedding model for chunks and queries; enforce access control with metadata filters at retrieval time, not by asking the model to ignore documents.",
  "check": [
   [
    "Why add overlap between adjacent chunks?",
    "So sentences or ideas cut at a chunk boundary still appear intact in at least one chunk, improving retrieval."
   ],
   [
    "Where should tenant isolation be enforced in a RAG app?",
    "In the retrieval query as a metadata filter (or partition), so other tenants' chunks never reach the prompt."
   ]
  ]
 },
 {
  "t": "Azure Managed Redis: cache-aside pattern, TTL and invalidation, eviction policies",
  "body": [
   "Redis is an in-memory data store that answers in well under a millisecond, which makes it the standard cache in front of slower databases and expensive AI model calls. Azure Managed Redis is Microsoft's current managed Redis offering, built on Redis Enterprise software, with tiers optimized for memory, balance or compute, clustering, high availability and optional modules such as search and JSON. From Python you connect with the `redis` (redis-py) package over TLS, authenticating with an access key or, preferably, Microsoft Entra ID.",
   "The most common caching pattern is cache-aside (lazy loading). The application, not the cache, is in charge. On a read, the app checks the cache first. On a hit, it returns the cached value. On a miss, it reads from the database, writes the result into the cache with an expiry, and returns it. The cache only ever holds data someone asked for.",
   "```python\nimport json, redis\nr = redis.Redis(host=HOST, port=10000, ssl=True, password=KEY)\n\ndef get_product(pid):\n    key = f\"product:{pid}\"\n    cached = r.get(key)\n    if cached:\n        return json.loads(cached)\n    product = db_read_product(pid)\n    r.set(key, json.dumps(product), ex=300)   # TTL 300 seconds\n    return product\n\ndef update_product(pid, data):\n    db_write_product(pid, data)\n    r.delete(f\"product:{pid}\")                 # invalidate\n```",
   "TTL (time to live) is how long a key lives before Redis removes it. Set it with `ex=` on SET or with EXPIRE; check it with TTL. A TTL bounds how stale cached data can be and frees memory automatically. Short TTLs mean fresher data and more database load; long TTLs mean the opposite. Adding a little random jitter to TTLs avoids many keys expiring together and stampeding the database.",
   "TTL alone allows stale reads until expiry. Invalidation removes or updates the cached entry when the source changes. With cache-aside, the usual approach is: write to the database, then delete the cache key, so the next read reloads fresh data. Deleting is safer than writing the new value into the cache, because it avoids races where an older value overwrites a newer one. For events from other systems, a change feed or message can drive invalidation.",
   "When memory is full, the eviction policy decides what happens. `noeviction` rejects new writes with an error. `allkeys-lru` evicts the least recently used keys from all keys, a good default for a pure cache. `volatile-lru` evicts least recently used keys only among keys that have a TTL, protecting keys without expiry. There are LFU (least frequently used) variants, `allkeys-random` and `volatile-random`, and `volatile-ttl`, which evicts keys closest to expiring first. If your cache holds only disposable data, an allkeys policy fits; if the same instance holds data that must not disappear, use a volatile policy and give only cache entries a TTL.",
   "Monitor the cache hit ratio, memory use and evictions. A low hit ratio suggests TTLs are too short or keys are too specific; frequent evictions suggest the cache is too small."
  ],
  "terms": [
   [
    "Cache-aside",
    "A pattern where the app checks the cache, loads from the database on a miss and populates the cache itself."
   ],
   [
    "TTL",
    "Time to live: the number of seconds a key exists before Redis expires it automatically."
   ],
   [
    "Invalidation",
    "Removing or refreshing a cached entry when the underlying data changes."
   ],
   [
    "Eviction policy",
    "The rule Redis follows to free memory when full, such as allkeys-lru or volatile-lru."
   ]
  ],
  "example": "A product page API took 120 ms per request reading PostgreSQL. With cache-aside and a 5-minute TTL in Azure Managed Redis, repeated reads returned in a few milliseconds. When an admin changed a price, customers saw the old price for minutes, so the update path now deletes the product key right after the database write, and the next read reloads it.",
  "tip": "Know the policy names: allkeys-* evicts from every key, volatile-* only from keys with a TTL, and noeviction returns errors on writes when memory is full.",
  "check": [
   [
    "In cache-aside, who loads data into the cache on a miss?",
    "The application: it reads the database, then writes the value into the cache with a TTL."
   ],
   [
    "Why delete the cache key after a database update instead of writing the new value?",
    "Deleting avoids races where a slower writer puts stale data back into the cache; the next read reloads the current value."
   ]
  ]
 },
 {
  "t": "Redis vector indexes and semantic caching of model responses",
  "body": [
   "Redis is not only a key-value cache. With the search module (RediSearch, part of Redis Stack and available as a module on Azure Managed Redis), Redis can index fields inside hashes or JSON documents, including vector fields, and run K-nearest-neighbor queries in memory. On Azure Managed Redis you choose modules when you create the cache, so plan for search up front.",
   "You create an index with `FT.CREATE`, naming the key prefix to index, the data structure (HASH or JSON) and a schema. A vector field declares its algorithm (FLAT for exact search, HNSW for approximate), the element type (such as FLOAT32), the dimension count and the distance metric (COSINE, L2 or IP). Every key written with that prefix is indexed automatically.",
   "```text\nFT.CREATE idx:cache ON HASH PREFIX 1 semcache: SCHEMA\n  prompt TEXT\n  model TAG\n  embedding VECTOR HNSW 6 TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE\n\nFT.SEARCH idx:cache \"(@model:{gpt-small})=>[KNN 3 @embedding $vec AS score]\"\n  PARAMS 2 vec <binary float32 bytes> SORTBY score DIALECT 2\n```",
   "The KNN query syntax combines a pre-filter (here, a TAG filter on model) with a vector search, and the `$vec` parameter carries the query vector as raw bytes, which in Python you produce with NumPy's `astype(np.float32).tobytes()`. DIALECT 2 is required for this parameterized vector syntax. Results come back with the distance score; for COSINE, a smaller distance means more similar.",
   "Semantic caching applies this to model calls. A normal cache only hits on exactly the same key, but users ask the same question in many phrasings: \"How do I reset my password?\" and \"I forgot my password, what now?\". A semantic cache embeds each incoming prompt, searches the cache index for the nearest previous prompt and, if the distance is below a threshold, returns the stored answer without calling the model. On a miss, the app calls the model, then stores the prompt, its embedding and the response with a TTL.",
   "The benefit is lower latency and lower model cost for repetitive traffic such as FAQs and support bots. The risks need design. The similarity threshold is a trade-off: too loose and users get answers to a different question; too strict and the cache rarely hits. Scope entries with filters, such as model version, language, tenant or user, so one tenant's cached answer never reaches another, and do not cache responses that contain personal data or depend on the user's own context. Use TTLs so answers based on changing facts expire, and invalidate entries when the underlying documents change.",
   "Semantic caching complements RAG rather than replacing it: RAG grounds answers in your data, and the semantic cache avoids repeating the whole retrieval-and-generation path for questions that have effectively been answered already."
  ],
  "terms": [
   [
    "FT.CREATE",
    "The Redis search command that defines an index over hashes or JSON keys, including vector fields."
   ],
   [
    "KNN query",
    "A Redis search query that returns the K nearest vectors to a supplied query vector."
   ],
   [
    "Semantic cache",
    "A cache that returns stored model responses for prompts whose embeddings are similar enough to the new prompt."
   ],
   [
    "Similarity threshold",
    "The maximum distance at which a cached prompt is considered a match in a semantic cache."
   ]
  ],
  "example": "A support bot receives thousands of password questions daily in slightly different words. The team adds a Redis semantic cache: each prompt is embedded and searched with KNN 1, filtered by language and model version, and cached answers with cosine distance under a tuned threshold are returned immediately. Model calls for common questions fell sharply, and entries expire after a day so policy changes flow through.",
  "tip": "Semantic caching matches meaning, not exact text, so the exam trade-off is the similarity threshold; always scope cache entries (tenant, model, language) and give them a TTL.",
  "check": [
   [
    "Besides the algorithm (FLAT or HNSW), which three settings does a Redis VECTOR field need?",
    "The element type, the number of dimensions and the distance metric, for example TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE."
   ],
   [
    "What happens if a semantic cache's similarity threshold is too loose?",
    "Different questions are treated as the same, so users receive cached answers that do not fit what they asked."
   ]
  ]
 },
 {
  "t": "Choosing the store: Cosmos DB vs PostgreSQL + pgvector vs Redis for a given AI workload",
  "body": [
   "The exam likes scenario questions that describe an AI workload and ask which data service fits. All three services in this domain can store vectors and answer similarity queries, so the decision turns on everything else: the shape of the data, scale, latency, durability, existing skills and systems, and how the vectors relate to the rest of the application.",
   "Choose Azure Cosmos DB for NoSQL when the application is already document-shaped and needs elastic, global scale. Strengths: JSON items with flexible schemas, automatic partitioning for very large data and throughput, single-digit-millisecond point reads, multi-region writes and replication, a change feed for event-driven pipelines, and vector search on the same items as the operational data (with flat, quantizedFlat or diskANN indexes). Typical fits: chat history and agent memory per user, multitenant SaaS knowledge bases, product catalogs with embeddings, and apps that need global distribution. Costs are measured in RUs, so design partition keys and indexing carefully.",
   "Choose Azure Database for PostgreSQL flexible server with pgvector when the data is relational or the team already runs PostgreSQL. Strengths: SQL joins, transactions and constraints across vectors and business tables, rich filtering with ordinary WHERE clauses, the huge PostgreSQL ecosystem (ORMs, migrations, tools) and familiar HNSW and IVFFlat indexes. Typical fits: adding semantic search to an existing line-of-business database, RAG over data that must be joined with orders, customers or permissions, and teams who prefer SQL. It scales up well and supports read replicas, but it does not partition across regions automatically the way Cosmos DB does.",
   "Choose Azure Managed Redis when speed matters most and the data is a cache or short-lived. Strengths: in-memory, sub-millisecond latency, TTLs and eviction, and vector search through the search module. Typical fits: semantic caching of model responses, session state and conversation context for the current session, rate limiting, and hot subsets of embeddings that need the fastest lookup. Weaknesses: memory is expensive per gigabyte compared with disk-based stores, and although persistence options exist, Redis is usually not the system of record.",
   "Many real solutions combine them: Cosmos DB or PostgreSQL as the durable vector store and source of truth, with Redis in front as a semantic cache and a cache-aside layer. That is often the best answer when a scenario mentions both durable knowledge and reducing repeated model calls.",
   "A quick way to decide in a question: find the dominant requirement. Global distribution, massive scale, schema flexibility or change feed points to Cosmos DB. Existing PostgreSQL, SQL joins with relational tables or transactions points to PostgreSQL plus pgvector. Lowest latency, caching, TTL-based expiry or cutting repeated LLM calls points to Redis. Also watch for cost hints: Redis holds everything in memory, and Cosmos DB bills per RU, so a huge, rarely queried archive of embeddings is not a Redis workload."
  ],
  "terms": [
   [
    "System of record",
    "The authoritative, durable store for data, as opposed to a cache that can be rebuilt."
   ],
   [
    "Operational data",
    "The live application data, such as orders or profiles, that vectors may be stored alongside."
   ],
   [
    "Global distribution",
    "Replicating a database across regions for local reads and writes, a core Cosmos DB feature."
   ],
   [
    "In-memory store",
    "A data store such as Redis that keeps data in RAM for very low latency at a higher cost per gigabyte."
   ]
  ],
  "example": "A retailer already runs its catalog, orders and customer tables in PostgreSQL and wants semantic product search filtered by stock and customer region. PostgreSQL with pgvector fits because one SQL query can join embeddings with inventory. To cut model costs for its shopping assistant, it adds Azure Managed Redis as a semantic cache in front of the model rather than moving the catalog.",
  "tip": "Pick by the dominant requirement: global scale or change feed means Cosmos DB, relational joins or existing PostgreSQL means pgvector, lowest latency or response caching means Redis; combinations are common and often correct.",
  "check": [
   [
    "An app must join vector search results with orders and enforce foreign keys. Which store fits best?",
    "Azure Database for PostgreSQL with pgvector, because it supports SQL joins, transactions and constraints alongside vectors."
   ],
   [
    "Why is Redis usually not the primary store for a large embedding archive?",
    "It keeps data in memory, which is costly per gigabyte, and it is typically used as a cache rather than the system of record."
   ]
  ]
 },
 {
  "t": "Service Bus queues vs topics and subscriptions; Basic tier has no topics",
  "body": [
   "Azure Service Bus is a fully managed enterprise message broker. Applications send messages to it and other applications receive them later, which decouples senders from receivers: the receiver can be offline, slow or scaled differently, and the message waits safely. Service Bus is built for high-value messages, such as orders or payments, where each message must be processed reliably. You work with it in Python through the `azure-servicebus` package.",
   "The top-level resource is a namespace, which has a fully qualified name ending in `servicebus.windows.net`. Inside a namespace you create queues and topics.",
   "A queue is point-to-point. Senders put messages in, and each message is delivered to exactly one receiver. Several receivers can read from the same queue (competing consumers), which spreads load and lets you scale workers out, but any single message goes to only one of them. Messages are stored durably and received in first-in, first-out order under normal conditions, and features such as sessions provide strict ordering when needed. Use a queue when one kind of work must be done once, like processing an order.",
   "A topic is publish-subscribe. Senders publish to the topic, and the topic has one or more subscriptions. Each subscription acts like its own virtual queue and gets a copy of every message that matches its filter rules. Receivers read from a subscription, not from the topic. Use topics when several independent systems must react to the same event: an OrderPlaced message could go to a billing subscription, a shipping subscription and an analytics subscription, each processed separately and at its own pace. Adding a new consumer means adding a subscription without touching the sender.",
   "```python\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\nfrom azure.identity import DefaultAzureCredential\n\nwith ServiceBusClient(\"shop-sb.servicebus.windows.net\", DefaultAzureCredential()) as client:\n    with client.get_topic_sender(topic_name=\"orders\") as sender:\n        sender.send_messages(ServiceBusMessage('{\"id\": 1001}', subject=\"OrderPlaced\"))\n    with client.get_subscription_receiver(\"orders\", \"billing\") as receiver:\n        for msg in receiver.receive_messages(max_message_count=10, max_wait_time=5):\n            print(str(msg))\n            receiver.complete_message(msg)\n```",
   "The tier decides what you can use. Basic supports queues only, with no topics and subscriptions, and it lacks features such as sessions, transactions and duplicate detection. Standard adds topics and subscriptions and those advanced features, on shared capacity with pay-per-operation pricing. Premium runs on dedicated resources for predictable performance, supports larger messages, virtual network integration and private endpoints, and higher availability options. A classic exam trap: a design with multiple independent consumers of each message cannot use the Basic tier, because Basic has no topics.",
   "For permissions, grant the sending app Azure Service Bus Data Sender and the receiving app Azure Service Bus Data Receiver, scoped to the queue or topic, instead of distributing connection strings with shared access keys."
  ],
  "terms": [
   [
    "Namespace",
    "The Service Bus container resource that holds queues and topics and defines the tier."
   ],
   [
    "Queue",
    "A point-to-point entity where each message is received by exactly one consumer."
   ],
   [
    "Topic",
    "A publish-subscribe entity where each matching subscription receives its own copy of a message."
   ],
   [
    "Subscription",
    "A named, queue-like view of a topic with its own filter rules and receivers."
   ],
   [
    "Competing consumers",
    "Multiple receivers reading from the same queue so work is spread among them."
   ]
  ],
  "example": "A startup built order processing on a Basic namespace queue. When finance and warehouse teams both needed every order, a second consumer on the queue only received half the orders, because each queue message goes to one receiver. They moved to a Standard namespace with an orders topic and separate billing and shipping subscriptions, so each system now gets every order.",
  "tip": "One consumer per message means a queue; every consumer gets a copy means a topic with subscriptions, which requires Standard or Premium because Basic has no topics.",
  "check": [
   [
    "Two services must each receive every order message. What should you use?",
    "A topic with one subscription per service; a queue would deliver each message to only one of them."
   ],
   [
    "Which Service Bus tier cannot host topics?",
    "Basic; topics and subscriptions require Standard or Premium."
   ]
  ]
 },
 {
  "t": "Receive modes: peek-lock (complete, abandon, dead-letter, defer) vs receive-and-delete; lock duration and lock renewal",
  "body": [
   "When a receiver takes a message from a Service Bus queue or subscription, the broker has to decide when the message is really gone. Service Bus gives you two receive modes, and choosing between them decides whether messages can be lost if your code crashes.",
   "In receive-and-delete mode, the broker marks the message as consumed the moment it hands it over. It is simple and fast, and it needs only one round trip. But if the receiver crashes after receiving and before finishing the work, the message is lost. It gives at-most-once processing, which suits only data where losing an occasional message is acceptable, such as frequent telemetry samples.",
   "Peek-lock mode (the default) is two-stage. Receiving locks the message so other receivers cannot see it, but it stays in the queue. Your code processes it and then settles it with one of four actions. Complete removes the message: the work succeeded. Abandon releases the lock so the message becomes available again immediately, and its delivery count increases. Dead-letter moves the message to the dead-letter subqueue with a reason, for messages that can never succeed, such as malformed data. Defer sets the message aside in the queue; it can only be retrieved later by its sequence number, which is useful when a message arrives before another it depends on.",
   "```python\nfrom azure.servicebus import ServiceBusClient, AutoLockRenewer\n\nrenewer = AutoLockRenewer(max_lock_renewal_duration=600)\nwith client.get_queue_receiver(\"orders\", auto_lock_renewer=renewer) as receiver:\n    for msg in receiver.receive_messages(max_message_count=5, max_wait_time=5):\n        try:\n            order = parse(msg)\n        except ValueError as e:\n            receiver.dead_letter_message(msg, reason=\"BadFormat\", error_description=str(e))\n            continue\n        try:\n            process(order)\n            receiver.complete_message(msg)\n        except TransientError:\n            receiver.abandon_message(msg)\n```",
   "If your code does not settle a message before the lock expires, the lock lapses, the message becomes visible again and another receiver may process it, and settling it afterwards fails with a lock lost error. This is why peek-lock gives at-least-once delivery, and why handlers should be idempotent. The lock duration is a property of the queue or subscription; the default is one minute and the maximum is five minutes.",
   "For work that takes longer than the lock duration, renew the lock. `receiver.renew_message_lock(msg)` extends it once; `AutoLockRenewer`, as above, keeps renewing in the background up to a maximum duration you choose. The Azure Functions Service Bus trigger renews locks automatically and completes messages when the function succeeds or abandons them when it throws (behavior you can change in host.json).",
   "Each time a message is delivered in peek-lock mode its delivery count increases. When it passes the queue's max delivery count, Service Bus dead-letters it automatically, which is covered in the next lesson."
  ],
  "terms": [
   [
    "Peek-lock",
    "The default receive mode that locks a message until the receiver completes, abandons, defers or dead-letters it."
   ],
   [
    "Receive-and-delete",
    "A receive mode that removes the message on delivery, giving at-most-once processing."
   ],
   [
    "Lock duration",
    "How long a received message stays locked to one receiver before becoming visible again; default one minute, maximum five."
   ],
   [
    "Defer",
    "Settling a message so it stays in the queue but can only be received again by its sequence number."
   ],
   [
    "AutoLockRenewer",
    "A Python SDK helper that renews message locks in the background during long processing."
   ]
  ],
  "example": "A PDF-embedding worker using peek-lock took about three minutes per document, and some documents were processed twice with lock lost errors on completion. The lock duration was one minute. The team added AutoLockRenewer with a ten-minute maximum and made the upsert idempotent; duplicates stopped and completions succeeded.",
  "tip": "Messages must not be lost means peek-lock; lock lost errors on long jobs mean renew the lock (AutoLockRenewer) or raise the lock duration up to five minutes; abandon increments the delivery count.",
  "check": [
   [
    "Which receive mode risks losing messages if the consumer crashes, and why?",
    "Receive-and-delete, because the message is removed as soon as it is delivered, before processing finishes."
   ],
   [
    "What is the difference between abandon and defer?",
    "Abandon makes the message available again for normal receiving; defer keeps it aside so it can only be fetched by sequence number."
   ]
  ]
 },
 {
  "t": "Dead-letter queues: max delivery count, TTL expiry, reading the $DeadLetterQueue subqueue",
  "body": [
   "Every Service Bus queue and every topic subscription has a secondary subqueue called the dead-letter queue (DLQ). It holds messages that could not be delivered or processed, so they stop blocking or looping in the main queue but are not silently lost. You do not create it; it always exists, and its path is the entity path followed by `/$DeadLetterQueue`, for example `orders/$DeadLetterQueue` or `orders/subscriptions/billing/$DeadLetterQueue`.",
   "Messages get there in three main ways. First, by exceeding max delivery count. In peek-lock mode, each time a message is delivered and not completed (abandoned, or its lock expires), its delivery count rises. When the count exceeds the entity's max delivery count (the default is 10), Service Bus moves the message to the DLQ with the reason `MaxDeliveryCountExceeded`. This protects you from poison messages that fail forever.",
   "Second, by expiry. Every message has a time to live (TTL), set per message or defaulted from the entity. When it expires, the message is simply dropped unless dead-lettering on message expiration is enabled on the queue or subscription, in which case it moves to the DLQ with the reason `TTLExpiredException`. That setting is off by default, a common exam detail. For subscriptions there is also dead-lettering on filter evaluation exceptions.",
   "Third, explicitly by your code: `receiver.dead_letter_message(msg, reason=..., error_description=...)`, for messages you know cannot be processed, such as invalid JSON. Explicit dead-lettering is better than letting a bad message be retried until the count runs out.",
   "Dead-lettered messages never expire on their own and are not processed automatically, so you need an operational process: alert on DLQ message count (the dead-lettered message count metric), inspect the messages, fix the cause, then resubmit or discard them. In Python, you read the DLQ by requesting the dead-letter subqueue on a receiver.",
   "```python\nfrom azure.servicebus import ServiceBusSubQueue\n\nwith client.get_queue_receiver(\"orders\", sub_queue=ServiceBusSubQueue.DEAD_LETTER) as dlq:\n    for msg in dlq.receive_messages(max_message_count=20, max_wait_time=5):\n        print(msg.sequence_number, msg.dead_letter_reason,\n              msg.dead_letter_error_description, msg.delivery_count)\n        # after fixing the cause: resend a copy to the main queue, then\n        dlq.complete_message(msg)\n```",
   "To resubmit, create a new message with the same body and properties, send it to the main queue and complete the dead-lettered copy. The portal's Service Bus Explorer can also peek at and resend dead-lettered messages, which is handy in labs. For topics, remember each subscription has its own DLQ, so a failing billing consumer does not affect shipping."
  ],
  "terms": [
   [
    "Dead-letter queue",
    "A built-in subqueue of each queue or subscription that holds messages that could not be delivered or processed."
   ],
   [
    "Max delivery count",
    "The number of delivery attempts after which Service Bus automatically dead-letters a message; default 10."
   ],
   [
    "Poison message",
    "A message that fails processing every time and would loop forever without dead-lettering."
   ],
   [
    "Dead-lettering on expiration",
    "An entity setting, off by default, that moves expired messages to the DLQ instead of dropping them."
   ]
  ],
  "example": "Operations notice an alert that the orders DLQ holds 40 messages. A script reading the DEAD_LETTER subqueue shows the reason MaxDeliveryCountExceeded for all of them, and the error descriptions point to a missing currency field sent by a new partner. After a code fix accepts the field, the team resends copies to the main queue and completes the dead-lettered originals.",
  "tip": "Expired messages are dropped, not dead-lettered, unless dead-lettering on message expiration is enabled; poison messages land in the DLQ after exceeding max delivery count (default 10).",
  "check": [
   [
    "What is the path of the dead-letter queue for a subscription named audit on topic events?",
    "events/subscriptions/audit/$DeadLetterQueue, since each subscription has its own dead-letter subqueue."
   ],
   [
    "Do messages in the DLQ expire or get retried automatically?",
    "No. They stay until you receive and settle them, so you need monitoring and a resubmit process."
   ]
  ]
 },
 {
  "t": "Sessions for ordered processing, duplicate detection, scheduled messages and subscription filters (SQL and correlation)",
  "body": [
   "Standard and Premium Service Bus add features that solve common messaging problems: strict ordering, accidental duplicates, delayed delivery and routing. Each maps cleanly to a scenario, so learn them as problem-solution pairs.",
   "Sessions give ordered processing of related messages. You enable sessions (requires session) when you create a queue or subscription, and every message must then carry a `session_id`, such as an order ID or customer ID. Service Bus guarantees first-in, first-out delivery within a session, and a receiver locks a whole session, so only one receiver processes a given session at a time while other receivers handle other sessions in parallel. Sessions also offer session state, a small stored value per session for tracking progress.",
   "```python\nfrom azure.servicebus import NEXT_AVAILABLE_SESSION\nsender.send_messages(ServiceBusMessage(body, session_id=\"order-1001\"))\nwith client.get_queue_receiver(\"order-steps\", session_id=NEXT_AVAILABLE_SESSION) as r:\n    print(r.session.session_id)\n    for msg in r.receive_messages(max_wait_time=5):\n        r.complete_message(msg)\n```",
   "Duplicate detection handles the case where a sender retries after a network error and the broker receives the same message twice. When enabled on a queue or topic at creation, Service Bus remembers each `message_id` for a configurable duplicate detection history window and silently drops any later message with the same ID within that window. It only works if the sender sets a meaningful message ID derived from the business data, such as the order number, rather than a random value.",
   "Scheduled messages are sent now but become visible only at a chosen time. Set `scheduled_enqueue_time_utc` on the message, or call `sender.schedule_messages(msg, when)`, which returns sequence numbers you can pass to `cancel_scheduled_messages` if plans change. Use them for reminders, delayed retries or time-based workflows. (Scheduled enqueue time is available in Basic too.)",
   "Subscription filters decide which topic messages each subscription receives. Every new subscription starts with a default rule that accepts all messages. A SQL filter uses a SQL-like condition over message properties, for example `region = 'EU' AND amount > 100`, and it is flexible but evaluated at more cost. A correlation filter matches exact values of system properties (such as subject, correlation ID, message ID, content type) and user properties; it is simpler and more efficient, so prefer it when you only need equality matches. Rules can also include a SQL action that modifies message properties as they enter the subscription. A Boolean true or false filter accepts everything or nothing.",
   "```bash\naz servicebus topic subscription rule create -g rg --namespace-name shop-sb \\\n  --topic-name orders --subscription-name eu-large --name EuLarge \\\n  --filter-sql-expression \"region = 'EU' AND amount > 100\"\n```",
   "Remember to delete the default rule when you add your own filter, or the subscription will keep receiving every message."
  ],
  "terms": [
   [
    "Session",
    "A group of messages sharing a session ID that Service Bus delivers in order to one receiver at a time."
   ],
   [
    "Duplicate detection",
    "A queue or topic setting that drops messages whose message ID was already seen within a history window."
   ],
   [
    "Scheduled message",
    "A message that is accepted immediately but becomes available to receivers only at a specified UTC time."
   ],
   [
    "SQL filter",
    "A subscription rule using a SQL-like expression over message properties."
   ],
   [
    "Correlation filter",
    "A subscription rule that matches exact values of system or user properties, cheaper than a SQL filter."
   ]
  ],
  "example": "Order events for the same order occasionally ran out of sequence, shipping before payment. The team enabled sessions on the order-steps queue and used the order ID as session ID, which forced in-order processing per order. They also enabled duplicate detection keyed on an event ID because the upstream system retried sends, and used a correlation filter on subject to route refunds to a separate subscription.",
  "tip": "FIFO per customer or order means sessions; retried sends creating duplicates means duplicate detection with business message IDs; routing on exact property values prefers correlation filters over SQL filters.",
  "check": [
   [
    "What must a sender set for duplicate detection to work?",
    "A consistent message_id derived from the business data, so a retried send carries the same ID and is dropped."
   ],
   [
    "Why might a subscription with a new SQL filter still receive every message?",
    "The default rule that accepts all messages is still present; it must be removed."
   ]
  ]
 },
 {
  "t": "Event Grid: system and custom topics, event subscriptions, filters (event type, subject begins/ends with, advanced)",
  "body": [
   "Azure Event Grid is a fully managed event routing service. It is built for reactive programming: when something happens, such as a blob being created, a resource group changing or a Key Vault secret nearing expiry, Event Grid pushes a small notification (an event) to whoever subscribed. Events describe that something happened; they are not commands or large payloads, and the publisher does not care who handles them.",
   "The source side is a topic, an endpoint where events are sent. System topics represent Azure services that publish events on their own: Blob Storage, Resource Groups, Key Vault, Container Registry, Service Bus and many more. You create a system topic (or the portal creates one when you add a subscription) and never publish to it yourself. Custom topics are topics you create for your own applications; your code publishes events to their endpoint using a key or Microsoft Entra authentication, for example with the `azure-eventgrid` Python package. Event domains group many custom topics for multitenant scenarios.",
   "The consumer side is an event subscription, which connects a topic to an event handler and says which events to deliver. Handlers include webhooks (any HTTPS endpoint), Azure Functions, Service Bus queues and topics, Storage queues, Event Hubs and Logic Apps. A topic can have many subscriptions, each with its own filters and handler.",
   "Filters keep handlers from receiving events they do not care about. Event type filtering lists the event types to include, such as `Microsoft.Storage.BlobCreated` but not `BlobDeleted`. Subject filtering matches the start or end of the event's subject, a path-like string. For Blob Storage the subject looks like `/blobServices/default/containers/uploads/blobs/report.pdf`, so subject begins with `/blobServices/default/containers/uploads/` limits events to one container and subject ends with `.pdf` limits them to PDF files. Advanced filters compare fields in the event data or envelope with operators such as NumberGreaterThan, StringContains, StringIn, BoolEquals and IsNotNull; all advanced filter conditions must be true for an event to be delivered.",
   "```bash\naz eventgrid event-subscription create --name pdf-uploads \\\n  --source-resource-id $STORAGE_ID \\\n  --endpoint-type azurefunction --endpoint $FUNCTION_ID \\\n  --included-event-types Microsoft.Storage.BlobCreated \\\n  --subject-begins-with /blobServices/default/containers/uploads/ \\\n  --subject-ends-with .pdf \\\n  --advanced-filter data.contentLength NumberGreaterThan 0\n```",
   "Event Grid is push-based and scales without you managing capacity, with pricing per operation. Compare this with Service Bus, where receivers pull messages: Event Grid is ideal for lightweight notifications fanned out to many handlers, while Service Bus is ideal for reliable, ordered processing of business messages. A common combination is an Event Grid subscription that delivers to a Service Bus queue, so a worker can process events at its own pace."
  ],
  "terms": [
   [
    "System topic",
    "An Event Grid topic that represents events published automatically by an Azure service."
   ],
   [
    "Custom topic",
    "An Event Grid topic you create and publish your own application events to."
   ],
   [
    "Event subscription",
    "The configuration linking a topic to a handler, with filters deciding which events are delivered."
   ],
   [
    "Subject filter",
    "A filter matching the beginning or end of an event's subject path, such as a container or file extension."
   ],
   [
    "Advanced filter",
    "A filter on event data or envelope fields using operators like NumberGreaterThan or StringContains."
   ]
  ],
  "example": "A document pipeline must embed only PDFs uploaded to the uploads container. An Event Grid subscription on the storage account's system topic filters on BlobCreated, subject begins with the uploads container path and subject ends with .pdf, and delivers to an Azure Function. Images uploaded to the same container and files in other containers never trigger the function.",
  "tip": "Azure services emit to system topics; your code publishes to custom topics. To filter by container or folder use subject begins with; to filter by file extension use subject ends with.",
  "check": [
   [
    "How do you limit a Blob Storage event subscription to one container?",
    "Use a subject begins with filter set to the container's path, /blobServices/default/containers/<name>/."
   ],
   [
    "What is the difference between a system topic and a custom topic?",
    "A system topic carries events emitted by an Azure service; a custom topic receives events your own application publishes."
   ]
  ]
 },
 {
  "t": "Event Grid delivery: retry policy, event time-to-live, dead-lettering to Blob Storage, webhook validation, CloudEvents schema",
  "body": [
   "Event Grid delivers each event to each matching subscription at least once. If the handler does not acknowledge success, Event Grid retries. Understanding how delivery works helps you build handlers that neither lose events nor break under retries.",
   "A handler acknowledges success by returning an HTTP success status (such as 200 OK or 202 Accepted). Failures and timeouts trigger the retry policy: Event Grid waits and retries on an exponential backoff schedule with some randomization, over a longer and longer interval. Some errors that retrying cannot fix, such as certain 400 Bad Request or 413 Request Entity Too Large responses, are not retried. Because an event may arrive more than once, handlers should be idempotent, for example by tracking the event `id`.",
   "Each subscription's retry policy has two limits: maximum delivery attempts and event time-to-live in minutes. By default Event Grid tries up to 30 times and keeps trying for up to 1,440 minutes (24 hours), whichever limit is reached first. You can lower either, for example when stale events are worthless after a few minutes.",
   "When the limits are reached, the event is dropped unless you configured dead-lettering. Dead-lettering sends undelivered events to a Blob Storage container you specify, as JSON files, so you can inspect and replay them. Event Grid needs permission to write to that container, typically through a managed identity on the topic.",
   "```bash\naz eventgrid event-subscription create --name orders-hook \\\n  --source-resource-id $TOPIC_ID --endpoint $WEBHOOK_URL \\\n  --max-delivery-attempts 10 --event-ttl 120 \\\n  --deadletter-endpoint $STORAGE_ID/blobServices/default/containers/eg-deadletter\n```",
   "Before delivering to a webhook, Event Grid validates that you own the endpoint, so nobody can point events at someone else's service. With the Event Grid schema, it sends a `Microsoft.EventGrid.SubscriptionValidationEvent` whose data contains a `validationCode`. Your endpoint proves ownership either synchronously, by returning the code in the response body as `validationResponse`, or manually, by sending a GET request to the `validationUrl` included in the event within a limited time. With the CloudEvents schema, validation instead uses the CloudEvents webhook abuse-protection handshake: an HTTP OPTIONS request with a `WebHook-Request-Origin` header, answered with a `WebHook-Allowed-Origin` header. Azure Functions, Logic Apps and other Azure handlers complete validation for you.",
   "Event Grid supports two event schemas. The Event Grid schema uses fields such as `id`, `topic`, `subject`, `eventType`, `eventTime`, `data` and `dataVersion`. CloudEvents v1.0 is an open, vendor-neutral specification from the CNCF (Cloud Native Computing Foundation), with fields such as `id`, `source`, `type`, `subject`, `time`, `specversion` and `data`. Choose CloudEvents for interoperability across clouds and tools. You set the input schema on a custom topic and the delivery schema on a subscription."
  ],
  "terms": [
   [
    "Retry policy",
    "Per-subscription limits on delivery attempts and event time-to-live that govern Event Grid retries."
   ],
   [
    "Event time-to-live",
    "The number of minutes Event Grid keeps retrying an event before giving up; default 1,440."
   ],
   [
    "Dead-letter destination",
    "A Blob Storage container where Event Grid writes events it could not deliver."
   ],
   [
    "Validation handshake",
    "The process by which a webhook proves it owns the endpoint before Event Grid delivers events."
   ],
   [
    "CloudEvents",
    "An open specification for describing event data in a common format across services and clouds."
   ]
  ],
  "example": "A partner's webhook was down for two days. Events older than 24 hours were lost because the subscription had no dead-letter destination. The team configured dead-lettering to a storage container, reduced max delivery attempts for faster failure detection, and wrote a small replay tool that reads the dead-lettered JSON blobs and republishes them when the partner recovers.",
  "tip": "Defaults to remember: 30 delivery attempts and 1,440 minutes TTL; undelivered events are dropped unless dead-lettering to Blob Storage is configured. A custom webhook must echo validationCode as validationResponse (or call validationUrl).",
  "check": [
   [
    "What happens to an event that exhausts its retries when no dead-letter destination is set?",
    "It is dropped; configure dead-lettering to a Blob Storage container to keep undelivered events."
   ],
   [
    "How does a custom webhook complete Event Grid schema validation synchronously?",
    "It responds to the SubscriptionValidationEvent with the validationCode returned as validationResponse in the body."
   ]
  ]
 },
 {
  "t": "Picking Service Bus, Event Grid or Event Hubs for a scenario",
  "body": [
   "Azure has three messaging services that sound similar, and the exam regularly describes a scenario and asks which one fits. The key is to separate messages from events, and discrete events from streams.",
   "A message is data the sender expects someone to act on: \"create this order\", \"charge this card\". The sender cares that it is processed, often exactly once in business terms, possibly in order. An event is a notification that something happened: \"blob created\", \"secret near expiry\". The publisher has no expectation about who reacts. Events come in two flavors: discrete events, which each report a single state change and are individually meaningful, and series events (telemetry streams), where value comes from analyzing many events over time, like temperature readings every second.",
   "Choose Azure Service Bus for high-value enterprise messaging. It offers durable queues and topics, peek-lock with complete, abandon and dead-letter, sessions for FIFO (first-in, first-out) ordering, duplicate detection, scheduled delivery, transactions and dead-letter queues. Receivers pull at their own pace. Typical scenarios: order processing, payment workflows, decoupling a web front end from back-end workers, load leveling spikes of work. Keywords: ordered, transactional, guaranteed processing, dead-letter, sessions, competing consumers.",
   "Choose Azure Event Grid for reactive, discrete events. It pushes lightweight notifications to many subscribers with filtering by event type and subject, and it integrates natively with Azure services through system topics. It retries with backoff and can dead-letter to storage. Typical scenarios: run a function when a blob is uploaded, notify when a resource changes, start secret rotation when Key Vault reports near expiry, fan out custom application events to several handlers. Keywords: react to, when something happens, Azure resource events, serverless, push, near real time.",
   "Choose Azure Event Hubs for big-data streaming. It ingests millions of events per second into partitions, retains them for a configurable period so multiple consumer groups can read the same stream independently and replay it from an offset, and can automatically archive data to storage with Capture. It also exposes a Kafka-compatible endpoint. Typical scenarios: IoT telemetry, clickstreams, application logs and metrics pipelines feeding Stream Analytics or a data lake. Keywords: telemetry, stream, high throughput, millions of events, partitions, replay, consumer groups, Kafka.",
   "Scenarios often combine them. A blob upload raises an Event Grid event, the subscription delivers it to a Service Bus queue, and a worker processes each document reliably with peek-lock and dead-lettering. Or devices stream telemetry to Event Hubs, a stream processor detects anomalies and publishes discrete alert events to Event Grid.",
   "Watch for distractors. Event Grid does not give you ordered processing or sessions. Event Hubs does not have per-message completion or dead-lettering; consumers track their position with checkpoints. Service Bus is not designed for millions of telemetry events per second or long-term replay by many independent readers. Storage queues also exist as a simple, cheap queue with a very large capacity, but they lack sessions, topics and duplicate detection."
  ],
  "terms": [
   [
    "Discrete event",
    "An event reporting a single state change that is meaningful on its own, well suited to Event Grid."
   ],
   [
    "Event stream",
    "A continuous sequence of events, such as telemetry, analyzed in aggregate and suited to Event Hubs."
   ],
   [
    "Consumer group",
    "An independent view of an Event Hubs stream that lets several applications read it at their own positions."
   ],
   [
    "Load leveling",
    "Using a queue to absorb bursts so workers process at a steady rate, a Service Bus strength."
   ]
  ],
  "example": "A logistics firm needs three things: trucks send GPS readings every few seconds for a live map and analytics; a dispatch function must run when a delivery photo is uploaded to storage; and each confirmed delivery must bill the customer exactly once, in order per account. The answer is Event Hubs for GPS telemetry, Event Grid for the blob upload reaction, and a Service Bus queue with sessions for billing.",
  "tip": "Map keywords: guaranteed, ordered, transactional business messages means Service Bus; react to Azure resource or discrete events means Event Grid; high-volume telemetry streams with replay means Event Hubs.",
  "check": [
   [
    "Millions of sensor readings per second must be ingested and replayed by two analytics teams. Which service?",
    "Event Hubs, because it ingests high-volume streams into partitions and supports multiple consumer groups with retention and replay."
   ],
   [
    "A workflow needs FIFO processing per customer and dead-lettering of failures. Which service?",
    "Service Bus with sessions, since it provides ordered delivery per session ID and dead-letter queues."
   ]
  ]
 },
 {
  "t": "Azure Functions Python v2 model: function_app.py, decorators, triggers and input/output bindings",
  "body": [
   "Azure Functions runs small pieces of code in response to events without you managing servers. Each function has exactly one trigger, the event that starts it (an HTTP request, a timer, a queue message), and optionally bindings, which connect it declaratively to other services for input and output. Bindings remove boilerplate: instead of writing SDK code to read a blob or send a queue message, you declare the binding and use a parameter.",
   "The Python v2 programming model defines functions in code with decorators, rather than a separate `function.json` file per function as in the older v1 model. A v2 project has a `function_app.py` file at its root that creates a `FunctionApp` object, and each function is a Python function decorated with a trigger and any bindings. Supporting files are `host.json` (runtime settings), `local.settings.json` (local app settings) and `requirements.txt` (which must include `azure-functions`).",
   "```python\nimport azure.functions as func\nimport json, logging\n\napp = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)\n\n@app.route(route=\"orders\", methods=[\"POST\"])\n@app.queue_output(arg_name=\"outmsg\", queue_name=\"new-orders\", connection=\"AzureWebJobsStorage\")\ndef create_order(req: func.HttpRequest, outmsg: func.Out[str]) -> func.HttpResponse:\n    order = req.get_json()\n    outmsg.set(json.dumps(order))\n    return func.HttpResponse(\"accepted\", status_code=202)\n\n@app.blob_trigger(arg_name=\"blob\", path=\"uploads/{name}\", connection=\"DocsStorage\")\n@app.blob_output(arg_name=\"out\", path=\"processed/{name}.txt\", connection=\"DocsStorage\")\ndef extract(blob: func.InputStream, out: func.Out[str]):\n    logging.info(\"Processing %s\", blob.name)\n    out.set(blob.read().decode(\"utf-8\", errors=\"ignore\"))\n```",
   "Walk through it. `@app.route` makes an HTTP trigger; `req` is a `func.HttpRequest`, and the return value is the HTTP response. `@app.queue_output` adds an output binding; the `arg_name` must match a parameter of type `func.Out[...]`, and calling `.set()` writes the message when the function completes. The blob example shows a trigger with a path pattern, where `{name}` is a binding expression captured from the triggering blob and reused in the output path. Input bindings, such as `@app.blob_input` or `@app.cosmos_db_input`, load data before your code runs.",
   "The `connection` argument is not a connection string. It is the name of an app setting (or a prefix for a group of settings) that holds the connection details, which lets you switch to identity-based connections without code changes. `AzureWebJobsStorage` is the storage account the Functions host itself uses.",
   "Large apps can split functions across files with blueprints: create `func.Blueprint()` in a module, decorate functions on it, and register it in `function_app.py` with `app.register_functions(bp)`. Some triggers, such as the Service Bus trigger, can also bind to SDK types for richer access. Functions only appear if the file imports cleanly, so an import error in `function_app.py` results in no functions being found; check the startup logs when that happens."
  ],
  "terms": [
   [
    "Trigger",
    "The event that starts a function; every function has exactly one."
   ],
   [
    "Binding",
    "A declarative connection to another service that supplies input data or writes output without SDK code."
   ],
   [
    "function_app.py",
    "The entry file of a Python v2 function app that creates FunctionApp and defines decorated functions."
   ],
   [
    "func.Out",
    "The parameter type for an output binding; calling set() provides the value to write."
   ],
   [
    "Blueprint",
    "A v2 model feature for defining functions in separate modules and registering them with the app."
   ]
  ],
  "example": "A developer wants an HTTP endpoint that accepts orders and queues them for later processing. In function_app.py they add @app.route for POST /orders and @app.queue_output bound to the new-orders queue. The function body is three lines: read JSON, set the output, return 202. No storage SDK code is needed, and a second queue-triggered function processes the orders.",
  "tip": "In the v2 model, decorators in function_app.py replace function.json; the connection parameter names an app setting, not a literal connection string, and each function has one trigger but any number of bindings.",
  "check": [
   [
    "How many triggers can a single function have?",
    "Exactly one, though it can have multiple input and output bindings."
   ],
   [
    "What does the connection argument in a binding decorator contain?",
    "The name of an app setting (or setting prefix) that holds connection information, not the connection string itself."
   ]
  ]
 },
 {
  "t": "Common triggers: HTTP (auth levels), timer (six-field NCRONTAB), Service Bus, Cosmos DB, Blob, Event Grid",
  "body": [
   "The HTTP trigger turns a function into a web endpoint at a route under `/api/` by default. Its authorization level controls whether a key is required. `ANONYMOUS` needs no key. `FUNCTION` requires a function-specific key or a host key, passed in the `x-functions-key` header or the `code` query parameter. `ADMIN` requires the master key. Keys are not user authentication; for real users, put App Service Authentication (Easy Auth), API Management or your own token validation in front. Locally, keys are not enforced.",
   "The timer trigger runs on a schedule written in NCRONTAB, a six-field cron format: `{second} {minute} {hour} {day} {month} {day-of-week}`. The extra leading seconds field is the main difference from five-field Unix cron, and it is the favorite exam detail. `0 */5 * * * *` runs every five minutes; `0 30 9 * * 1-5` runs at 9:30 on weekdays. Times are UTC by default. A timer function can set `run_on_startup` (avoid in production, since restarts trigger extra runs) and uses a singleton lock so only one instance runs each occurrence.",
   "```python\n@app.timer_trigger(schedule=\"0 0 2 * * *\", arg_name=\"timer\", run_on_startup=False)\ndef nightly(timer: func.TimerRequest):\n    if timer.past_due:\n        logging.warning(\"Running late\")\n\n@app.service_bus_queue_trigger(arg_name=\"msg\", queue_name=\"orders\", connection=\"ServiceBusConn\")\ndef handle_order(msg: func.ServiceBusMessage):\n    logging.info(msg.get_body().decode())\n\n@app.event_grid_trigger(arg_name=\"event\")\ndef on_event(event: func.EventGridEvent):\n    logging.info(\"%s %s\", event.event_type, event.subject)\n```",
   "The Service Bus trigger (`service_bus_queue_trigger` or `service_bus_topic_trigger` with a subscription name) receives messages in peek-lock mode. If the function succeeds, the runtime completes the message; if it throws, the message is abandoned and retried until max delivery count sends it to the dead-letter queue. The runtime renews locks during long executions, and host.json controls concurrency.",
   "The Cosmos DB trigger runs on the container's change feed, as covered earlier. It needs a lease container, delivers batches of changed documents, and does not see deletes in latest version mode.",
   "The Blob trigger fires when a blob is added or updated in a container path. The classic implementation polls the container and can take time to notice new blobs on consumption-style plans and with large containers. The recommended approach for low latency and reliability is the Event Grid-based blob trigger (`source=\"EventGrid\"` in the v2 decorator, backed by an Event Grid subscription), and the Flex Consumption plan supports only this event-based form. Blob receipts stored in the host storage account prevent processing the same blob twice.",
   "The Event Grid trigger receives events pushed by an Event Grid subscription that targets the function. The runtime handles the webhook validation handshake automatically, and you can filter at the subscription level so the function only runs for relevant events. Choose it to react to Azure resource events or custom topic events.",
   "When choosing: request/response means HTTP, schedule means timer, reliable business messages means Service Bus, database changes means Cosmos DB, new files mean Blob (Event Grid source preferred), and Azure resource events mean Event Grid."
  ],
  "terms": [
   [
    "Authorization level",
    "HTTP trigger setting (anonymous, function or admin) that decides which key, if any, a caller must supply."
   ],
   [
    "NCRONTAB",
    "The six-field cron format used by timer triggers, starting with a seconds field."
   ],
   [
    "Past due",
    "A timer flag indicating the scheduled run happened later than planned, for example after downtime."
   ],
   [
    "Event Grid-based blob trigger",
    "A blob trigger that uses Event Grid notifications instead of polling for lower latency."
   ]
  ],
  "example": "A nightly cleanup meant to run once at 2:00 ran sixty times each night because a developer wrote * 0 2 * * *, where the * in the leading seconds field means every second of the 2:00 minute. Rewriting it as 0 0 2 * * * fixed the schedule. The same team moved a slow polling blob trigger to the Event Grid source and saw processing start within seconds of upload.",
  "tip": "Timer schedules have six fields with seconds first (0 */5 * * * * is every five minutes). FUNCTION auth needs a key in x-functions-key or code; it is not user authentication.",
  "check": [
   [
    "Write an NCRONTAB expression for every day at 06:15 UTC.",
    "0 15 6 * * *, with fields second, minute, hour, day, month and day-of-week."
   ],
   [
    "What happens to a Service Bus-triggered message when the function throws an exception?",
    "The message is abandoned and retried; after exceeding max delivery count it is moved to the dead-letter queue."
   ]
  ]
 },
 {
  "t": "Hosting plans: Flex Consumption, Premium and Dedicated; cold starts, scale limits and VNet integration",
  "body": [
   "The hosting plan decides how your function app scales, how it is billed, what networking it can use and how long functions can run. The same code runs on any plan, but the choice shapes behavior in production.",
   "Flex Consumption is the current recommended serverless plan for new apps, and it runs on Linux. It scales dynamically based on events, including down to zero, and bills for execution time and memory of instances while they run, plus any always-ready instances you configure. Always-ready instances keep a chosen number of instances warm for specific functions or groups to reduce cold starts. It scales per function (HTTP functions, blob functions and Durable Functions scale as groups, other triggers scale individually), lets you choose the instance memory size and supports virtual network integration, which older consumption hosting lacked. The older Consumption plan still exists but is considered legacy for new Linux apps.",
   "A cold start is the delay when a request or event arrives and no instance is running: the platform must allocate an instance, start the runtime, load your Python code and import dependencies. Scale-to-zero plans save money but pay this latency after idle periods. Mitigations are always-ready or pre-warmed instances, a lighter dependency set with lazy imports, and plans that never scale to zero.",
   "The Premium plan (Elastic Premium) runs on pre-warmed, always-ready instances, so there is no cold start for the minimum instance count, and it still scales out elastically on events. It supports VNet integration, private endpoints, longer execution times and more powerful instances, and it bills per core-second and memory of allocated instances, including the minimum always-ready ones, so it never costs zero. Choose it when you need no cold starts plus event-driven scale, or features the Flex plan lacks.",
   "The Dedicated plan runs functions on an App Service plan you already pay for. Scaling is manual or via App Service autoscale rules rather than event-driven, and you should enable Always On so the host stays loaded and timer or queue triggers keep firing. Choose it when you have spare capacity in an existing App Service plan, need predictable fixed costs, or need long-running functions with full control. App Service Environment is the isolated variant.",
   "Scale limits and timeouts differ by plan. Every plan caps the maximum number of instances an app can scale to, and you can set a lower per-app maximum to protect downstream resources such as a database. Execution timeouts also differ: on the legacy Consumption plan functions are limited to a short maximum run time measured in minutes, while Flex Consumption, Premium and Dedicated support much longer or unbounded executions. The `functionTimeout` setting in host.json controls this within the plan's allowed range. HTTP-triggered functions are additionally limited by the load balancer's idle timeout, so long work should be handed off to a queue.",
   "VNet integration lets functions reach private resources, such as a database behind a private endpoint. It is available on Flex Consumption, Premium and Dedicated. Inbound private access uses private endpoints on the function app."
  ],
  "terms": [
   [
    "Flex Consumption",
    "A Linux serverless Functions plan with event-driven scale to zero, per-function scaling, always-ready instances and VNet integration."
   ],
   [
    "Premium plan",
    "An elastic Functions plan with pre-warmed instances, no cold start for minimum instances, and VNet support."
   ],
   [
    "Dedicated plan",
    "Running functions on an App Service plan with manual or autoscale scaling and fixed cost."
   ],
   [
    "Cold start",
    "Startup latency when a function is invoked with no warm instance available."
   ],
   [
    "Always On",
    "An App Service setting that keeps a Dedicated-plan function app loaded so triggers keep firing."
   ]
  ],
  "example": "An internal API built on Functions must call a PostgreSQL server reachable only through a private endpoint, respond without cold-start delays during business hours, and cost little overnight. The team chooses Flex Consumption with VNet integration and a small number of always-ready instances for the HTTP functions. A separate app with nightly batch work runs on an existing App Service plan with Always On.",
  "tip": "No cold start plus elastic scale points to Premium (or Flex with always-ready instances); already paying for an App Service plan points to Dedicated with Always On; private network access needs a plan with VNet integration.",
  "check": [
   [
    "Why must Always On be enabled for a Dedicated-plan function app with timer triggers?",
    "Without it the host can unload when idle, so timers and non-HTTP triggers may stop firing."
   ],
   [
    "Name two ways to reduce cold starts for a Python function app.",
    "Use always-ready instances (Flex) or pre-warmed instances (Premium), and trim or lazily import heavy dependencies."
   ]
  ]
 },
 {
  "t": "Configuration and deployment: app settings, local.settings.json, host.json, identity-based connections, `func azure functionapp publish`",
  "body": [
   "A function app reads its configuration from several places, and knowing which file does what prevents a lot of \"works locally, fails in Azure\" problems.",
   "App settings are the environment variables of the function app in Azure. They hold connection details, feature switches and required runtime settings such as `FUNCTIONS_WORKER_RUNTIME=python` and `AzureWebJobsStorage`. Your code reads them with `os.environ`, and bindings reference them by name through the `connection` argument. You manage them in the portal's Environment variables page or with `az functionapp config appsettings set`. Values can be Key Vault references so secrets live in Key Vault.",
   "`local.settings.json` plays the same role on your machine. Core Tools loads its `Values` section as environment variables when you run `func start`. It is for local development only: it is not deployed by default and should be listed in `.gitignore` because it often contains secrets. Using Azurite, the local storage emulator, you can set `AzureWebJobsStorage` to `UseDevelopmentStorage=true`.",
   "```json\n{\n  \"IsEncrypted\": false,\n  \"Values\": {\n    \"FUNCTIONS_WORKER_RUNTIME\": \"python\",\n    \"AzureWebJobsStorage\": \"UseDevelopmentStorage=true\",\n    \"ServiceBusConn__fullyQualifiedNamespace\": \"shop-sb.servicebus.windows.net\"\n  }\n}\n```",
   "`host.json` configures the Functions runtime for every function in the app, and it is deployed with your code. It holds logging levels and Application Insights sampling, extension settings (for example Service Bus concurrency or whether messages auto-complete), the `functionTimeout`, retry settings and the extension bundle version that supplies non-HTTP bindings. A change to host.json affects all functions; app settings can override host.json values when you need per-environment differences.",
   "Identity-based connections replace connection strings with a managed identity. Instead of an app setting called `ServiceBusConn` containing a secret, you create settings that share the prefix, such as `ServiceBusConn__fullyQualifiedNamespace` for Service Bus, `DocsStorage__blobServiceUri` or `DocsStorage__accountName` for Storage, and `CosmosConn__accountEndpoint` for Cosmos DB. The runtime uses the app's system-assigned identity by default; for a user-assigned identity, add `__credential` set to `managedidentity` and `__clientId`. Then grant the identity the right data roles, such as Azure Service Bus Data Receiver or Storage Blob Data Owner for the host storage account. Locally, the same settings use your developer sign-in through the Azure credential chain.",
   "Deployment with Core Tools is `func azure functionapp publish <APP_NAME>`. It packages the project, uploads it, and (for Python) triggers a remote build that installs `requirements.txt` for Linux. Add `--publish-local-settings -i` if you want to push local values to Azure app settings, with care not to overwrite production values. In CI/CD you would use GitHub Actions or Azure Pipelines with the same zip-based deployment. After publishing, `func azure functionapp list-functions <APP_NAME>` confirms which functions were indexed."
  ],
  "terms": [
   [
    "App settings",
    "Environment variables for a function app in Azure, read by code and referenced by bindings."
   ],
   [
    "local.settings.json",
    "A local-only file whose Values section Core Tools loads as environment variables; not deployed by default."
   ],
   [
    "host.json",
    "An app-wide runtime configuration file for logging, extensions, timeouts and sampling, deployed with the code."
   ],
   [
    "Identity-based connection",
    "A binding connection defined by settings like Prefix__fullyQualifiedNamespace that authenticates with a managed identity."
   ]
  ],
  "example": "A function worked locally but failed in Azure with a missing setting error. The developer had added ServiceBusConn__fullyQualifiedNamespace only to local.settings.json, which is not published. They added the app setting in Azure, granted the function app's identity Azure Service Bus Data Receiver on the queue, redeployed with func azure functionapp publish and the trigger started processing.",
  "tip": "local.settings.json is local-only and not deployed; host.json is app-wide runtime config and is deployed; identity-based connections use double-underscore settings such as __fullyQualifiedNamespace plus an RBAC role.",
  "check": [
   [
    "Where do you configure Service Bus concurrency or auto-complete behavior for all functions in an app?",
    "In host.json, under the Service Bus extension settings."
   ],
   [
    "Which app setting lets a Service Bus trigger connect with a managed identity instead of a connection string?",
    "A setting named <connection>__fullyQualifiedNamespace with the namespace host name, plus a data role on the namespace or entity."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned; DefaultAzureCredential in azure-identity",
  "body": [
   "Applications need credentials to call Azure services, and every stored secret is something that can leak, expire or be forgotten in a repository. A managed identity solves this: Azure creates an identity in Microsoft Entra ID for your resource and handles its credentials for you. Your code asks the local platform endpoint for a token and uses it to call any service that supports Microsoft Entra authentication, such as Key Vault, Storage, Service Bus, Cosmos DB, Azure SQL and PostgreSQL.",
   "A system-assigned identity is enabled on one resource, such as a web app, function app or container app, and shares its lifecycle. It is created with the resource and deleted when the resource is deleted, and it cannot be shared. It is the simplest choice when one resource needs its own permissions.",
   "A user-assigned identity is a standalone Azure resource that you create and then attach to one or more resources. It lives until you delete it. Choose it when several resources should share the same permissions (for example ten container apps that all need AcrPull), when you want to grant roles before the compute resource exists (to avoid the first-deployment chicken-and-egg problem), or when resources are frequently recreated and you do not want to redo role assignments. A resource can have both types and several user-assigned identities.",
   "Remember that an identity alone grants nothing. You must assign it roles, such as Key Vault Secrets User or Azure Service Bus Data Sender, on the right scope.",
   "In Python, the `azure-identity` package provides `DefaultAzureCredential`, a credential that tries a chain of methods in order until one works. It checks environment variables for a service principal, then workload identity (for Kubernetes), then managed identity, then developer tools such as the Azure CLI, Azure PowerShell and the Azure Developer CLI sign-ins. The same code therefore uses your `az login` account on your laptop and the managed identity in Azure, with no code changes.",
   "```python\nfrom azure.identity import DefaultAzureCredential, ManagedIdentityCredential\nfrom azure.keyvault.secrets import SecretClient\n\ncredential = DefaultAzureCredential()\n# for a user-assigned identity: set AZURE_CLIENT_ID in app settings, or\n# credential = ManagedIdentityCredential(client_id=\"<client-id>\")\nsecrets = SecretClient(vault_url=VAULT_URL, credential=credential)\ndb_password = secrets.get_secret(\"db-password\").value\n```",
   "When a resource has a user-assigned identity, the credential must know which identity to use. Set the `AZURE_CLIENT_ID` environment variable to the identity's client ID, or pass `managed_identity_client_id` to `DefaultAzureCredential`, or use `ManagedIdentityCredential(client_id=...)` directly. Forgetting this is a common reason for authentication failures when an app has more than one identity. In production, some teams use a specific credential such as `ManagedIdentityCredential` to avoid unexpected fallbacks and make failures clearer. Create the credential and SDK clients once and reuse them, since they cache tokens."
  ],
  "terms": [
   [
    "System-assigned identity",
    "A managed identity tied to one resource's lifecycle and deleted with it."
   ],
   [
    "User-assigned identity",
    "A standalone managed identity resource that can be attached to many resources and outlives them."
   ],
   [
    "DefaultAzureCredential",
    "An azure-identity credential that tries environment, workload identity, managed identity and developer sign-ins in order."
   ],
   [
    "AZURE_CLIENT_ID",
    "The environment variable that tells azure-identity which user-assigned managed identity to use."
   ]
  ],
  "example": "A team runs twelve container apps that all read from the same Key Vault and pull from the same registry. Instead of enabling twelve system-assigned identities and making twenty-four role assignments, they create one user-assigned identity, grant it AcrPull and Key Vault Secrets User, attach it to each app and set AZURE_CLIENT_ID. Their Python code uses DefaultAzureCredential unchanged on laptops and in Azure.",
  "tip": "Shared across resources or created before the resource means user-assigned; lifecycle tied to a single resource means system-assigned. With a user-assigned identity, set AZURE_CLIENT_ID so DefaultAzureCredential picks the right one.",
  "check": [
   [
    "What happens to a system-assigned identity when its web app is deleted?",
    "It is deleted too, because it shares the resource's lifecycle; its role assignments stop working and remain as orphaned entries until you remove them."
   ],
   [
    "Why does the same DefaultAzureCredential code work locally and in Azure?",
    "It tries several credential sources in order; locally it finds your developer sign-in, and in Azure it finds the managed identity."
   ]
  ]
 },
 {
  "t": "Azure RBAC data-plane roles: Key Vault Secrets User, Service Bus Data Sender/Receiver, AcrPull, Cosmos DB built-in data roles",
  "body": [
   "Azure separates two kinds of operations. The control plane (management plane) manages resources themselves: creating a Key Vault, changing a Service Bus tier, deleting a Cosmos DB account. It goes through Azure Resource Manager. The data plane works with the data inside: reading a secret, sending a message, pulling an image, querying items. Roles such as Owner and Contributor are control-plane roles; they let you manage the resource but, for services using RBAC data access, they do not by themselves let you read the data. Apps need data-plane roles, assigned to their managed identity with least privilege.",
   "For Key Vault using the Azure RBAC permission model, Key Vault Secrets User can read secret contents, which is what an application needs. Key Vault Secrets Officer can also create, update and delete secrets, suitable for a rotation process or an admin. Key Vault Reader sees metadata but not secret values. Similar pairs exist for keys (Key Vault Crypto User, Crypto Officer) and certificates (Key Vault Certificates Officer), and Key Vault Administrator covers everything on the data plane.",
   "For Service Bus, Azure Service Bus Data Sender allows sending to queues and topics, Azure Service Bus Data Receiver allows receiving from queues and subscriptions, and Azure Service Bus Data Owner allows full data access including management of entities. Assign at the narrowest useful scope: a single queue or topic rather than the whole namespace. A producer needs only Sender; a worker needs only Receiver.",
   "For Azure Container Registry, AcrPull lets an identity pull images and AcrPush lets it push and pull. Compute platforms get AcrPull; build pipelines get AcrPush. Storage has equivalent roles, such as Storage Blob Data Reader and Contributor, and Event Hubs has Data Sender and Receiver.",
   "Cosmos DB for NoSQL is different and frequently tested. Its data-plane access uses Cosmos DB's own native role-based access control, with two built-in data roles: Cosmos DB Built-in Data Reader (read items and query, read metadata) and Cosmos DB Built-in Data Contributor (create, read, update and delete items). They are assigned not through the portal's usual Access control (IAM) page but through Cosmos DB SQL role assignments, for example with the CLI. The scope can be the account, a database or a container.",
   "```bash\nPRINCIPAL=$(az identity show -g rg -n app-id --query principalId -o tsv)\naz cosmosdb sql role assignment create -g rg --account-name shop-cosmos \\\n  --role-definition-name \"Cosmos DB Built-in Data Contributor\" \\\n  --principal-id $PRINCIPAL --scope \"/\"\n\naz role assignment create --assignee $PRINCIPAL \\\n  --role \"Azure Service Bus Data Receiver\" --scope $QUEUE_ID\n```",
   "Once apps use Microsoft Entra roles, you can disable local (key-based) authentication on services such as Cosmos DB, Service Bus and Storage, so leaked keys stop working. Role assignments can take several minutes to take effect, so a 403 Forbidden immediately after assignment may clear on its own; a persistent 403 usually means the wrong role, the wrong scope or the wrong identity."
  ],
  "terms": [
   [
    "Data plane",
    "Operations on the data inside a service, such as reading secrets or sending messages, as opposed to managing the resource."
   ],
   [
    "Key Vault Secrets User",
    "A built-in role that can read secret contents in an RBAC-enabled Key Vault."
   ],
   [
    "Azure Service Bus Data Sender",
    "A built-in role allowing an identity to send messages to queues and topics in its scope."
   ],
   [
    "Cosmos DB Built-in Data Contributor",
    "A Cosmos DB native data role that allows item reads and writes, assigned with Cosmos DB SQL role assignments."
   ]
  ],
  "example": "A developer gave a function app's identity Contributor on a Cosmos DB account, yet every query failed with 403 Forbidden. Contributor is a control-plane role. After running az cosmosdb sql role assignment create with Cosmos DB Built-in Data Contributor scoped to the account, queries succeeded, and the team then disabled key-based authentication on the account.",
  "tip": "Contributor or Owner do not grant data access; pick the data role that matches the action (Secrets User to read secrets, Data Sender or Receiver for Service Bus, AcrPull for images) and remember Cosmos DB data roles are assigned with az cosmosdb sql role assignment.",
  "check": [
   [
    "An app must only read secrets from an RBAC-mode Key Vault. Which role?",
    "Key Vault Secrets User, which can read secret contents but not change them."
   ],
   [
    "Why might an identity with Contributor on a Cosmos DB account still get 403 on queries?",
    "Contributor is a control-plane role; data access needs a Cosmos DB data role such as Built-in Data Reader or Contributor."
   ]
  ]
 },
 {
  "t": "Key Vault: secrets, keys and certificates, versions, soft delete and purge protection, RBAC vs access policies",
  "body": [
   "Azure Key Vault is a managed service for storing and controlling access to sensitive material, so it never has to live in code, configuration files or container images. A vault holds three kinds of objects, and knowing which is which answers many questions.",
   "Secrets are arbitrary small values you store and read back: passwords, connection strings, API keys. The app retrieves the value itself. Keys are cryptographic keys (RSA or elliptic curve) used for operations such as encrypt, decrypt, sign, verify, wrap and unwrap. Key Vault performs the operation, and private key material is not meant to leave the vault; the Premium tier protects keys with HSMs (hardware security modules), and Managed HSM is a separate single-tenant service for stricter requirements. Certificates are X.509 certificates that Key Vault can create, import, renew automatically with integrated certificate authorities and track expiry for; each certificate has an associated key and secret behind the scenes.",
   "Every object has versions. When you set a new value for secret `db-password`, Key Vault creates a new version with its own identifier and keeps the older ones. A request without a version returns the current (latest) version; a request with a version ID returns exactly that one. Versions make rotation safe and allow rollback. Objects can also carry attributes such as an activation date, an expiration date, an enabled flag, tags and a content type.",
   "```python\nsecrets = SecretClient(vault_url=VAULT_URL, credential=DefaultAzureCredential())\nsecrets.set_secret(\"db-password\", new_value, expires_on=expiry)\ncurrent = secrets.get_secret(\"db-password\")\nfor p in secrets.list_properties_of_secret_versions(\"db-password\"):\n    print(p.version, p.created_on, p.enabled)\n```",
   "Soft delete protects against accidental or malicious deletion, and it is always enabled on vaults now. A deleted vault or object moves to a deleted state for a retention period you choose between 7 and 90 days (90 by default), during which it can be recovered. During that time its name is reserved, so creating a new secret with the same name fails until you recover or purge the old one. Purging permanently deletes it before retention ends. Purge protection, when enabled, blocks purging entirely until the retention period expires, even for administrators. Purge protection cannot be turned off once enabled, and it is often required by services that use Key Vault keys for encryption, such as customer-managed keys.",
   "Key Vault has two authorization models for the data plane. Vault access policies are the older model: a per-vault list of principals with permissions like Get and List for secrets, keys and certificates. They cannot be scoped to a single secret, and anyone with Contributor on the vault can edit the policies and grant themselves access. Azure RBAC is the recommended model: data-plane roles such as Key Vault Secrets User are assigned through Azure role assignments, can be scoped to an individual secret, key or certificate, and are governed and audited like the rest of Azure access. A vault uses one model or the other, selected by its permission model setting.",
   "Operationally, send Key Vault diagnostic logs to Log Analytics to audit who read what, restrict network access with firewalls or private endpoints, and cache secrets in your app rather than reading them on every request, since vault requests are throttled at high rates."
  ],
  "terms": [
   [
    "Secret",
    "A small sensitive value, such as a password or connection string, that an app reads from Key Vault."
   ],
   [
    "Key",
    "A cryptographic key stored in Key Vault that performs operations inside the vault without exposing private material."
   ],
   [
    "Soft delete",
    "Retention of deleted vaults and objects for 7 to 90 days so they can be recovered."
   ],
   [
    "Purge protection",
    "A setting that prevents permanent deletion until the retention period ends; it cannot be disabled once on."
   ],
   [
    "Access policy",
    "The legacy Key Vault authorization model granting per-vault permissions, as opposed to Azure RBAC."
   ]
  ],
  "example": "A script deleted a secret named api-key, and a redeployment that tried to recreate it failed with a conflict. Because soft delete reserves the name, the engineer recovered the deleted secret instead, restoring all versions. The team then enabled purge protection so no one could permanently destroy secrets before the retention period ended, and moved the vault to the RBAC permission model.",
  "tip": "Secrets are values you read, keys do crypto inside the vault, certificates are X.509 with lifecycle management. Purge protection cannot be disabled once enabled; RBAC allows per-secret scope, access policies do not.",
  "check": [
   [
    "Why might creating a secret with the name of a recently deleted secret fail?",
    "Soft delete keeps the deleted secret and reserves its name until it is recovered, purged or the retention period ends."
   ],
   [
    "Give one advantage of the Azure RBAC permission model over access policies.",
    "Roles can be scoped to individual secrets, keys or certificates, and access is governed centrally like other Azure permissions."
   ]
  ]
 },
 {
  "t": "Secret rotation and Key Vault events (SecretNearExpiry) through Event Grid",
  "body": [
   "Long-lived secrets are risky: the longer a password or key stays valid, the more chances it has to leak and be misused. Rotation replaces a secret with a new value on a schedule and retires the old one. Done manually it is often forgotten; done by automation it becomes routine. Key Vault provides the building blocks: expiration dates, versions and events.",
   "Start by setting an expiration date on each secret, which records when it should be replaced. Key Vault publishes events about its objects to Event Grid through a system topic for the vault. The important secret events are `Microsoft.KeyVault.SecretNewVersionCreated` (a new version was added), `Microsoft.KeyVault.SecretNearExpiry` (the current version will expire soon; Key Vault raises it 30 days before the expiration date) and `Microsoft.KeyVault.SecretExpired`. Keys and certificates have matching events, such as CertificateNearExpiry.",
   "The standard rotation pattern: create an Event Grid subscription on the vault's system topic filtered to `SecretNearExpiry`, with an Azure Function as the handler. When the event arrives, the function reads the secret name from the event subject and data, generates or requests a new credential from the service that owns it (for example, regenerating a storage account key or resetting a database user's password), writes the new value to Key Vault as a new version with a new expiration date, and lets consumers pick it up. The cycle then repeats automatically.",
   "```python\n@app.event_grid_trigger(arg_name=\"event\")\ndef rotate(event: func.EventGridEvent):\n    if event.event_type != \"Microsoft.KeyVault.SecretNearExpiry\":\n        return\n    name = event.get_json()[\"ObjectName\"]\n    new_value = regenerate_credential(name)          # call the owning service\n    secrets.set_secret(name, new_value,\n                       expires_on=datetime.now(timezone.utc) + timedelta(days=60))\n```",
   "The function's managed identity needs Key Vault Secrets Officer (to write new versions) plus whatever permission the owning service requires to reset the credential. Consumers only need Key Vault Secrets User.",
   "For services with two keys (storage accounts, Cosmos DB keys, Service Bus shared access keys), the dual-credential approach avoids downtime: apps use key 1 while you regenerate key 2, store key 2 in Key Vault, let apps switch, then regenerate key 1 on the next cycle. At no point is the key in use invalidated. For single-credential systems, create the new credential before revoking the old one when the service allows it.",
   "Rotation only helps if apps load the new value. Reference secrets without a version (so the latest is used), cache them for a limited time and reload on authentication failure, or rely on platform features: Key Vault references in App Service refresh periodically, and App Configuration can refresh on a sentinel key. Key Vault keys also have a built-in automatic rotation policy, and certificates can auto-renew, but secrets rely on this event-driven pattern. Better still, where a service supports managed identities, remove the secret entirely."
  ],
  "terms": [
   [
    "Secret rotation",
    "Periodically replacing a secret with a new value and retiring the old one to limit exposure."
   ],
   [
    "SecretNearExpiry",
    "A Key Vault event published through Event Grid 30 days before a secret's expiration date."
   ],
   [
    "SecretNewVersionCreated",
    "A Key Vault event raised when a new version of a secret is created."
   ],
   [
    "Dual-credential rotation",
    "Alternating between two valid keys so one can be regenerated while apps use the other."
   ]
  ],
  "example": "A storage account key used by a legacy app must rotate every 60 days. The team sets a 60-day expiry on the Key Vault secret and subscribes a function to SecretNearExpiry. Thirty days before expiry, the function regenerates the storage key the app is not using, saves it as a new secret version with a new expiry, and the app, which reads the latest version every hour, switches over without downtime.",
  "tip": "SecretNearExpiry fires 30 days before expiration and reaches handlers through Event Grid; the rotator needs Secrets Officer, readers need Secrets User, and consumers should reference the unversioned secret to get new values.",
  "check": [
   [
    "Which service delivers Key Vault near-expiry notifications to your rotation function?",
    "Azure Event Grid, through a system topic for the vault and an event subscription filtered on SecretNearExpiry."
   ],
   [
    "Why use two keys when rotating storage account keys?",
    "Apps keep using one valid key while the other is regenerated, so rotation never invalidates the key in use."
   ]
  ]
 },
 {
  "t": "Key Vault references in App Service, Functions and Container Apps settings",
  "body": [
   "Many apps read configuration from environment variables and you may not want to change code to call the Key Vault SDK. Key Vault references let the platform fetch a secret from Key Vault and present it to your app as an ordinary app setting or secret. The value never appears in the app's configuration, source control or deployment templates; only a pointer does.",
   "In App Service and Azure Functions, you set an app setting's value to a special reference syntax instead of the secret itself. There are two forms: one naming the vault and secret, and one giving the secret's full URI. Both are wrapped in `@Microsoft.KeyVault(...)`.",
   "```text\nDB_PASSWORD = @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password)\nDB_PASSWORD = @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password;SecretVersion=<version-id>)\nDB_PASSWORD = @Microsoft.KeyVault(SecretUri=<vault-uri>/secrets/db-password/)\n```",
   "Your Python code keeps calling `os.environ[\"DB_PASSWORD\"]` and receives the resolved secret. For this to work, the app needs a managed identity with read access to the secret (Key Vault Secrets User in RBAC mode, or a Get permission in an access policy), and the vault must be reachable from the app's network. By default the platform uses the system-assigned identity; to use a user-assigned identity, set the site's `keyVaultReferenceIdentity` property to that identity's resource ID. The portal shows a status next to each reference, which is the first place to look if a setting shows the raw reference text or an error: common causes are a missing role, the wrong identity, a firewall blocking access or a typo in the name.",
   "Without a version, the reference resolves to the latest version, and the platform refreshes it periodically (within about a day) or when the configuration changes or the app restarts, so a rotated secret is picked up without editing the setting. With a version, the reference is pinned and never changes until you update it. Functions can also use references for connection settings such as `AzureWebJobsStorage`, though identity-based connections are usually better than storing that connection string at all.",
   "Container Apps uses a slightly different model. Secrets are defined at the app level, and a secret can be a Key Vault reference: you give the Key Vault secret URI and the managed identity to use (a user-assigned identity resource ID, or `system`). Environment variables then point to that secret with `secretref:`, as with any other secret. Container Apps fetches the value from Key Vault, and when you reference a secret without a version the latest version is used; running replicas pick up changes after a restart or new revision.",
   "```bash\naz containerapp secret set -n orders -g rg \\\n  --secrets \"db-pass=keyvaultref:<key-vault-secret-uri>,identityref:<identity-resource-id>\"\naz containerapp update -n orders -g rg --set-env-vars DB_PASSWORD=secretref:db-pass\n```",
   "The big idea for the exam: code stays the same, the secret lives only in Key Vault, and a managed identity with a data-plane read role bridges the two."
  ],
  "terms": [
   [
    "Key Vault reference",
    "An app setting or secret value that points to a Key Vault secret, which the platform resolves at runtime."
   ],
   [
    "@Microsoft.KeyVault(...)",
    "The reference syntax used in App Service and Functions app settings, with VaultName/SecretName or SecretUri."
   ],
   [
    "keyVaultReferenceIdentity",
    "The App Service site property that selects a user-assigned identity for resolving Key Vault references."
   ],
   [
    "keyvaultref",
    "The Container Apps secret syntax that sources a secret's value from a Key Vault secret URI with an identity."
   ]
  ],
  "example": "An App Service app showed the literal text @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password) as its database password and failed to connect. The reference status in the portal said access was denied. The app used a user-assigned identity, but keyVaultReferenceIdentity was not set, so the platform tried the system-assigned one. Setting the property and granting Key Vault Secrets User fixed it.",
  "tip": "If an app receives the raw @Microsoft.KeyVault text, the reference did not resolve: check the identity, its Secrets User role, keyVaultReferenceIdentity for user-assigned identities and vault networking. Omit the version to follow rotations.",
  "check": [
   [
    "What does an App Service app need for a Key Vault reference to resolve?",
    "A managed identity with read access to the secret (such as Key Vault Secrets User) and network access to the vault."
   ],
   [
    "How does a Container Apps environment variable use a Key Vault-backed secret?",
    "Define an app secret with keyvaultref and an identityref, then set the variable to secretref:<secret-name>."
   ]
  ]
 },
 {
  "t": "Azure App Configuration: key-values, labels, feature flags, Key Vault references, sentinel-key refresh and snapshots",
  "body": [
   "Azure App Configuration is a managed service for centralizing application settings and feature flags. Instead of every app and environment carrying its own copies of settings, apps load them at startup from one store and can refresh them at runtime without redeploying. It complements Key Vault: App Configuration holds ordinary settings, while secrets stay in Key Vault.",
   "The basic item is a key-value. Keys are strings, often hierarchical with a separator such as `:` or `/`, like `Orders:MaxBatchSize`. Labels add another dimension: the same key can have several values distinguished by label, such as `Dev`, `Test` and `Prod`, or version numbers. An app selects the keys it needs with a key filter and chooses a label filter for its environment; to fall back to unlabeled values, it loads the unlabeled keys first and then the environment's label, so labeled values override them. Values can have a content type, such as JSON.",
   "Feature flags are special key-values (stored under the `.appconfig.featureflag/` prefix) that turn features on or off at runtime. A flag can be simply enabled or disabled, or use filters such as a percentage rollout, a time window or targeting specific users and groups. Feature management libraries evaluate the flags in your code, which lets you ship code dark and enable it gradually, then turn it off instantly if something goes wrong.",
   "App Configuration can hold Key Vault references: a key-value whose content marks it as a pointer to a Key Vault secret URI. App Configuration never reads the secret itself. The client provider resolves it by calling Key Vault with the app's credential, so the app's identity needs both App Configuration Data Reader and Key Vault Secrets User. This gives one place to discover settings while secrets stay protected.",
   "```python\nfrom azure.appconfiguration.provider import load, SettingSelector, WatchKey\ncred = DefaultAzureCredential()\nconfig = load(endpoint=APPCONFIG_ENDPOINT, credential=cred,\n    selects=[SettingSelector(key_filter=\"Orders:*\", label_filter=\"Prod\")],\n    keyvault_credential=cred,\n    refresh_on=[WatchKey(\"Orders:Sentinel\")], refresh_interval=60,\n    feature_flag_enabled=True)\nbatch = config[\"Orders:MaxBatchSize\"]\nconfig.refresh()   # call periodically, e.g. per request; reloads only if the sentinel changed\n```",
   "Refreshing many keys individually is inefficient and can load a half-updated set. The sentinel key pattern solves this: you watch a single key, such as `Orders:Sentinel`. When you finish updating a group of settings, you change the sentinel's value last. The provider checks the sentinel after the refresh interval, and only when it changes does it reload all selected settings together. Your code calls `refresh()` regularly; it is cheap until the interval passes. Refresh can also be driven by Event Grid events from App Configuration for push-based updates.",
   "Snapshots are immutable, named point-in-time copies of a set of key-values chosen by filters. Once created, a snapshot never changes, so an app that loads a snapshot gets exactly the same configuration every time, which is useful for safe deployments and rollbacks: deploy release 12 with snapshot `release-12`, and roll back to the previous snapshot if needed. Other features to know: point-in-time restore of revisions, import and export, geo-replicas for resiliency, and several pricing tiers (Free and Standard among them) with different quotas and features. For security, prefer Microsoft Entra authentication with App Configuration Data Reader over access keys."
  ],
  "terms": [
   [
    "Label",
    "A value that distinguishes versions of the same key, commonly used for environments such as Dev and Prod."
   ],
   [
    "Feature flag",
    "A key-value that turns a feature on or off at runtime, optionally with filters like percentage or targeting."
   ],
   [
    "Sentinel key",
    "A single watched key whose change signals the app to reload all its configuration at once."
   ],
   [
    "Snapshot",
    "An immutable, named copy of selected key-values that always returns the same configuration."
   ]
  ],
  "example": "A team runs one set of container apps in three environments. They store all settings in App Configuration with Dev, Test and Prod labels, keep passwords as Key Vault references, and ship a new checkout flow behind a feature flag with a 10 percent rollout. When they change a batch of throttling settings, they update the sentinel key last, and every app reloads the new values within a minute without a restart.",
  "tip": "Environment-specific values mean labels; runtime on/off means feature flags; reload everything consistently means sentinel key; never-changing config for a release means snapshots. Secrets stay in Key Vault, referenced from App Configuration.",
  "check": [
   [
    "Why update the sentinel key last when changing several settings?",
    "The app reloads all settings only when the sentinel changes, so it picks up the complete, consistent set rather than a partial update."
   ],
   [
    "What permissions does an app need to resolve a Key Vault reference stored in App Configuration?",
    "Read access to App Configuration (App Configuration Data Reader) and to the secret in Key Vault (Key Vault Secrets User)."
   ]
  ]
 },
 {
  "t": "Application Insights with the Azure Monitor OpenTelemetry Distro for Python: connection strings, traces, spans, custom metrics",
  "body": [
   "Application Insights is the application performance monitoring feature of Azure Monitor. It collects requests, dependencies (outbound calls), exceptions, logs and metrics from your app and stores them in a Log Analytics workspace, where you can search, chart and alert on them. For Python, Microsoft's recommended way to send this telemetry is the Azure Monitor OpenTelemetry Distro, the `azure-monitor-opentelemetry` package.",
   "OpenTelemetry is the open, vendor-neutral standard for telemetry: an API your code and libraries use to produce traces, metrics and logs, plus SDKs and exporters that send them somewhere. The distro bundles the OpenTelemetry SDK, the Azure Monitor exporter and instrumentation for popular libraries such as Flask, Django, FastAPI, requests, urllib and psycopg2, and it configures everything with one call.",
   "```python\nfrom azure.monitor.opentelemetry import configure_azure_monitor\nconfigure_azure_monitor()   # reads APPLICATIONINSIGHTS_CONNECTION_STRING\n\nfrom opentelemetry import trace, metrics\ntracer = trace.get_tracer(__name__)\nmeter = metrics.get_meter(__name__)\ntokens = meter.create_counter(\"llm_tokens\", unit=\"tokens\")\n\ndef answer(question):\n    with tracer.start_as_current_span(\"rag.answer\") as span:\n        span.set_attribute(\"rag.top_k\", 5)\n        result = call_model(question)\n        tokens.add(result.usage, {\"model\": \"chat-small\"})\n        return result\n```",
   "The app finds its Application Insights resource through a connection string, which contains the instrumentation key and the ingestion endpoint for your region. Set it in the `APPLICATIONINSIGHTS_CONNECTION_STRING` environment variable (the usual approach in App Service, Functions and Container Apps) or pass `connection_string=` to `configure_azure_monitor`. Connection strings replace the older instrumentation key-only configuration. The connection string identifies where to send data, but it is not a strong secret for reading data; for stricter control, you can require Microsoft Entra authentication for ingestion. Call `configure_azure_monitor()` early, before importing or creating the web framework app, so instrumentations can hook in.",
   "In OpenTelemetry, a trace is the whole journey of one operation, such as one user request, and it is made of spans. Each span is a timed unit of work with a name, start and end time, attributes (key-value details), status and a parent. Application Insights maps spans by kind: incoming server spans become entries in the `requests` table, outgoing client spans (HTTP calls, database queries, model calls) become `dependencies`, and internal spans you create also appear as dependencies. Exceptions recorded on spans land in `exceptions`, and Python `logging` output collected by the distro lands in `traces`, a confusing but important naming detail: in Application Insights, the traces table holds log messages.",
   "Custom metrics use the OpenTelemetry metrics API: counters (values that only increase, like tokens used), histograms (distributions, like latency or chunk counts) and gauges. Attributes on each measurement become dimensions. They show up in the `customMetrics` table and in metrics explorer, where you can chart and alert on them. Prefer metrics for high-volume numbers you aggregate, and span attributes or logs for per-operation details."
  ],
  "terms": [
   [
    "Azure Monitor OpenTelemetry Distro",
    "The azure-monitor-opentelemetry package that configures OpenTelemetry to send Python telemetry to Application Insights."
   ],
   [
    "Connection string",
    "The setting that tells telemetry where to go, including the instrumentation key and ingestion endpoint."
   ],
   [
    "Span",
    "A timed unit of work within a trace, with attributes, status and a parent span."
   ],
   [
    "Custom metric",
    "An application-defined measurement such as a counter or histogram, stored in the customMetrics table."
   ]
  ],
  "example": "A RAG API showed only slow requests in Application Insights with no detail. The developer called configure_azure_monitor at startup, wrapped retrieval and model calls in spans with attributes for top_k and model name, and added a token counter. The end-to-end view now shows that most latency is the model call, and a chart of tokens by model drives a cost alert.",
  "tip": "Set APPLICATIONINSIGHTS_CONNECTION_STRING and call configure_azure_monitor early. Remember the mapping: server spans go to requests, client spans to dependencies, logging output to traces and meter measurements to customMetrics.",
  "check": [
   [
    "Which Application Insights table holds Python logging messages sent by the distro?",
    "The traces table, despite the name; spans go to requests and dependencies."
   ],
   [
    "What does a connection string provide that an instrumentation key alone does not?",
    "The ingestion endpoint and other settings along with the key, so telemetry reaches the correct regional endpoint."
   ]
  ]
 },
 {
  "t": "Distributed tracing across services, sampling and live metrics",
  "body": [
   "Modern apps are chains of services: a front end calls an API, which reads Cosmos DB, sends a Service Bus message and calls a model endpoint, and a worker picks up the message later. When a user reports a slow or failed request, you need to follow that one request across every hop. Distributed tracing does this by giving all the work for one operation a shared trace ID and linking each piece to its parent.",
   "The mechanism is context propagation. OpenTelemetry uses the W3C Trace Context standard: when your instrumented app makes an outgoing HTTP call, it adds a `traceparent` header containing the trace ID and the current span ID. The receiving service, also instrumented, reads the header and creates its own spans as children in the same trace. Messaging SDKs, including Service Bus and Event Hubs, carry the same context in message properties so a consumer's processing links back to the producer. If one service in the chain is not instrumented, or strips headers, the trace breaks into separate pieces.",
   "In Application Insights, the trace ID appears as `operation_Id` on every item (requests, dependencies, exceptions, traces), and `operation_ParentId` links an item to its parent span. The portal's end-to-end transaction details view draws the whole tree as a timeline, so you can see which hop took the time or threw the error. The application map aggregates many traces into a diagram of components and their calls, with failure rates and durations on each connection. Each service should set a distinct cloud role name (for example through the `OTEL_SERVICE_NAME` environment variable or resource attributes) so it appears as its own node on the map.",
   "High-traffic apps can produce more telemetry than you want to pay for or analyze. Sampling keeps a representative subset. With the Azure Monitor OpenTelemetry Distro, you configure a sampling ratio (for example `configure_azure_monitor(sampling_ratio=0.1)` to keep about 10 percent), and newer versions also offer a rate-limited sampler that caps traces per second. Sampling decisions are made per trace, not per item, so a kept trace keeps all of its related spans across services, and a request is never shown with half its dependencies missing. Application Insights records the sampling rate in the `itemCount` column, and portal charts use it to estimate true totals; in your own KQL, use `sum(itemCount)` rather than `count()` when you need accurate counts on sampled data.",
   "Live Metrics shows a near-real-time stream of request rate, failure rate, dependency calls, exceptions, CPU and memory from each running instance, with a latency of about a second. It is not based on stored data and is not affected by sampling, so it is ideal while deploying a new revision or during an incident, when waiting minutes for ingestion is too slow. With the distro you enable it through a configuration option, and it can be secured with Microsoft Entra authentication.",
   "In practice: instrument every service, propagate context through HTTP and messaging, sample thoughtfully, watch Live Metrics during rollouts and use the end-to-end view and application map for investigations."
  ],
  "terms": [
   [
    "Trace context",
    "The W3C standard for propagating trace and span IDs between services, carried in the traceparent header."
   ],
   [
    "operation_Id",
    "The Application Insights field holding the trace ID shared by all telemetry for one operation."
   ],
   [
    "Sampling",
    "Keeping only a portion of telemetry, decided per trace, to reduce cost while staying representative."
   ],
   [
    "Live Metrics",
    "A near-real-time view of request, failure and resource metrics that is not affected by sampling."
   ],
   [
    "Application map",
    "An Application Insights view showing components and their dependencies with performance and failure data."
   ]
  ],
  "example": "Users report that checkout sometimes takes eight seconds. In the end-to-end transaction view for a slow operation_Id, the front end's request contains an API call whose child dependency on the model endpoint takes seven seconds, while Cosmos DB calls take milliseconds. The team adds a timeout and a cached fallback, watches Live Metrics while the new revision rolls out and sees latency drop immediately.",
  "tip": "The shared trace ID shows up as operation_Id; sampling is per trace and recorded in itemCount, so count with sum(itemCount); Live Metrics is real time and unaffected by sampling.",
  "check": [
   [
    "How does a downstream service know it belongs to the same trace as its caller?",
    "The caller propagates the traceparent header (or message properties) carrying the trace ID and parent span ID."
   ],
   [
    "Why use sum(itemCount) instead of count() in KQL on sampled telemetry?",
    "Each stored item represents itemCount original items, so summing it estimates the true total."
   ]
  ]
 },
 {
  "t": "KQL: where, project, summarize, bin(), join and render against requests, dependencies, exceptions and traces",
  "body": [
   "Kusto Query Language (KQL) is how you query Application Insights and Log Analytics data. A query starts with a table name and pipes rows through operators, each separated by `|`, much like a Unix shell pipeline. The tables you will use most from Application Insights are `requests` (incoming calls to your app, with name, url, resultCode, success and duration), `dependencies` (outgoing calls, with target, type, success and duration), `exceptions` (errors, with type, outerMessage and problemId) and `traces` (log messages, with message and severityLevel). All share `timestamp`, `operation_Id` and `cloud_RoleName`. In a workspace-based resource queried directly from Log Analytics, the same data appears in tables named AppRequests, AppDependencies, AppExceptions and AppTraces with slightly different column names.",
   "`where` filters rows. Filter on time first so the query scans less data: `where timestamp > ago(1h)`. Combine conditions with `and`, and use `==`, `!=`, `contains`, `has` or `startswith` on strings. `project` chooses and renames columns, like SELECT in SQL; `extend` adds calculated columns.",
   "`summarize` aggregates rows into groups, like GROUP BY: `summarize count(), avg(duration), percentile(duration, 95) by name`. The function `bin()` rounds values into buckets, and it is how you build time series: `summarize count() by bin(timestamp, 5m)` produces one row per five-minute interval. Other useful operators are `top`, `order by` (or `sort by`), `take` and `distinct`.",
   "```kusto\nrequests\n| where timestamp > ago(24h)\n| summarize total = sum(itemCount), failed = sumif(itemCount, success == false)\n    by bin(timestamp, 15m)\n| extend failureRate = 100.0 * failed / total\n| render timechart\n```",
   "`join` combines two tables on a common column, and `operation_Id` is the natural key for connecting a request with its exceptions or dependencies. The default join kind in KQL is `innerunique`, which deduplicates the left side; specify `kind=inner` or `kind=leftouter` when you mean those. Keep the left side small by filtering first.",
   "```kusto\nrequests\n| where timestamp > ago(1h) and success == false\n| project operation_Id, name, resultCode, duration\n| join kind=inner (\n    exceptions | where timestamp > ago(1h) | project operation_Id, type, outerMessage\n  ) on operation_Id\n| summarize count() by name, type\n| order by count_ desc\n```",
   "`render` turns results into a chart in the portal: `timechart` for time series, `barchart`, `columnchart`, `piechart` and others. You can pin charts to dashboards or workbooks, and the same queries power log search alerts in the next lesson.",
   "A practical habit: when investigating one failing request, take its operation_Id and query each table with `where operation_Id == \"...\"` to see everything that happened in that transaction, including traces logged along the way."
  ],
  "terms": [
   [
    "KQL",
    "Kusto Query Language, the pipe-based query language for Log Analytics and Application Insights."
   ],
   [
    "summarize",
    "The KQL operator that aggregates rows into groups with functions such as count, avg and percentile."
   ],
   [
    "bin()",
    "A function that rounds values into fixed-size buckets, often used with timestamp to build time series."
   ],
   [
    "join",
    "An operator that combines rows from two tables on matching columns, such as operation_Id."
   ],
   [
    "render",
    "An operator that displays query results as a chart, for example a timechart."
   ]
  ],
  "example": "After a release, error rates rose. An engineer ran a query joining failed requests with exceptions on operation_Id, summarized by request name and exception type, and found that one endpoint threw a KeyError from a missing configuration setting. A timechart of failures by bin(timestamp, 5m) showed the spike started exactly at deployment time, confirming the cause.",
  "tip": "Know which table holds what (requests incoming, dependencies outgoing, exceptions errors, traces logs), use bin(timestamp, interval) inside summarize for time charts and join on operation_Id to correlate.",
  "check": [
   [
    "Write the KQL fragment that counts requests per 5-minute interval.",
    "requests | summarize count() by bin(timestamp, 5m), optionally followed by | render timechart."
   ],
   [
    "Which column would you join requests and exceptions on to correlate a failure with its error?",
    "operation_Id, the trace ID shared by all telemetry from the same operation."
   ]
  ]
 },
 {
  "t": "Alerts: metric vs log search alerts and action groups",
  "body": [
   "Monitoring is only useful if someone learns about problems quickly. Azure Monitor alerts evaluate a condition on your telemetry and, when it is met, fire an alert that notifies people or starts automation. An alert rule has three parts: the scope (the resource or resources to watch), the condition (the signal and the logic) and the actions (usually one or more action groups). Rules also have a severity from 0 (critical) to 4 (verbose).",
   "Metric alerts watch numeric platform or custom metrics, such as Service Bus active message count, dead-lettered message count, App Service HTTP 5xx count, Cosmos DB total requests with status 429, CPU percentage or a custom metric you emit. They evaluate frequently with low latency, making them the best choice for fast notification on simple thresholds. A condition can be static (greater than 100) or dynamic, where machine learning learns the metric's normal pattern and alerts on deviations. Metric alerts can split by dimensions, such as one alert per queue or per instance, and they are stateful: they fire once when the condition becomes true and resolve automatically when it clears.",
   "Log search alerts (formerly called log alerts) run a KQL query against a Log Analytics workspace or Application Insights on a schedule. You set how often it runs (frequency) and how much data it looks at (the lookback period), and the condition is based on the number of result rows or a measured value in the results, optionally split by dimensions. Use them when the condition needs logic metrics cannot express: exceptions of a specific type, a join between requests and dependencies, a failure rate for one endpoint, or messages containing particular text. They have more latency than metric alerts, because data must first be ingested and the query must run, and they cost more per rule.",
   "```kusto\nexceptions\n| where type == \"CosmosHttpResponseError\" and outerMessage has \"429\"\n| summarize count() by cloud_RoleName\n```",
   "An action group is a reusable collection of notification and action settings that many alert rules can share. Notifications include email, SMS, Azure mobile app push and voice calls, and email to Azure Resource Manager roles such as Owner. Actions include calling an Azure Function, a Logic App, a webhook (or secure webhook with Entra authentication), an Automation runbook, an Event Hub or an ITSM (IT service management) connection. Because action groups are separate resources, you update the on-call email once and every rule using it follows.",
   "Alert processing rules add another layer: they can suppress notifications during planned maintenance windows or add action groups to all alerts in a scope without editing each rule. Also consider Application Insights smart detection and activity log alerts (which fire on control-plane events, such as a resource being deleted, or on service health events).",
   "Choosing between them on the exam: a numeric resource metric with a threshold and the fastest response means a metric alert; anything that needs a query over logs means a log search alert; who gets notified and what automation runs is always the action group."
  ],
  "terms": [
   [
    "Metric alert",
    "An alert rule on a numeric metric with static or dynamic thresholds, evaluated frequently and resolving automatically."
   ],
   [
    "Log search alert",
    "An alert rule that runs a KQL query on a schedule and fires based on the results."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions that alert rules trigger."
   ],
   [
    "Dynamic threshold",
    "A metric alert condition that learns normal behavior and fires on significant deviations."
   ],
   [
    "Alert processing rule",
    "A rule that suppresses or adds actions to fired alerts across a scope, for example during maintenance."
   ]
  ],
  "example": "An operations team wants a page when the orders dead-letter queue grows and an email when the RAG API throws more than 20 throttling exceptions in 15 minutes. The first is a metric alert on Service Bus dead-lettered message count split by entity. The second is a log search alert running a KQL query every five minutes over a 15-minute window. Both use shared action groups for on-call and team email.",
  "tip": "Threshold on a numeric metric with fastest detection means metric alert; conditions needing a query, joins or text matching mean log search alert; notifications and automation live in reusable action groups.",
  "check": [
   [
    "Which alert type would you use to alert when a specific exception type appears in logs?",
    "A log search alert, because it runs a KQL query over the exceptions data."
   ],
   [
    "Why define notifications in an action group rather than inside each alert rule?",
    "Action groups are reusable, so many rules share them and a change to recipients or actions is made in one place."
   ]
  ]
 },
 {
  "t": "Troubleshooting: App Service log stream, Container Apps console and system logs, Functions invocation logs",
  "body": [
   "When something breaks, the first question is always where the logs are. Each compute platform in this exam has its own real-time and historical log sources, and knowing them saves time in labs and on the exam.",
   "For App Service, the log stream shows log output in real time in the portal or with `az webapp log tail`. For a custom container on Linux, container logs (anything your app writes to stdout and stderr) are captured when application logging to the file system is enabled under App Service logs; turn it on with `az webapp log config --docker-container-logging filesystem`. The log stream then shows your app's output together with platform messages about container startup, such as image pulls and the startup probe waiting for the container to respond on its port, which is exactly where a wrong `WEBSITES_PORT` shows up. The Kudu (SCM) site and the Diagnose and solve problems page add log files, container restart history and guided checks. For long-term queries, send diagnostic settings such as AppServiceConsoleLogs and AppServiceHTTPLogs to a Log Analytics workspace.",
   "```bash\naz webapp log config -g rg -n orders-web --docker-container-logging filesystem\naz webapp log tail -g rg -n orders-web\n\naz containerapp logs show -g rg -n orders --type console --follow\naz containerapp logs show -g rg -n orders --type system\naz containerapp exec -g rg -n orders --command sh\n```",
   "Container Apps separates two log types. Console logs are your container's stdout and stderr: application errors, stack traces and print statements. System logs are generated by the platform: revision provisioning, image pull failures, probe failures, scaling events, secret or identity problems and container restarts. If a revision never becomes ready, look at system logs first; if it runs but returns errors, look at console logs. Both stream live with `az containerapp logs show` (add `--follow`) or the portal's Log stream, and both are stored in the environment's Log Analytics workspace in the ContainerAppConsoleLogs_CL and ContainerAppSystemLogs_CL tables, where you query them with KQL. `az containerapp exec` opens a shell in a running replica for interactive checks, and `az containerapp revision list` shows each revision's provisioning and running state. Jobs have the same logs plus execution history.",
   "For Azure Functions, the Invocations view on each function (under Monitor in the portal) lists recent executions with success or failure, duration and the log lines written during that invocation, backed by Application Insights. Selecting an invocation shows its logs and exception. For live output, the portal's log stream (App Insights Live Metrics or filesystem logs) and `func azure functionapp logstream <APP_NAME>` stream logs as they happen. In Application Insights, function executions appear in requests, and your `logging` calls appear in traces with the invocation ID, so KQL can find every log line for one failed execution. host.json controls log levels by category; if expected logs are missing, check that the level for `Function` or your category is not set too high, and that sampling has not dropped them.",
   "A reliable troubleshooting flow: check whether the platform started your code (system and startup logs), then whether your code failed (console, invocation and exception logs), then whether a dependency failed (dependencies in Application Insights), and finally whether identity or configuration was the cause (403 errors, missing settings, unresolved Key Vault references)."
  ],
  "terms": [
   [
    "Log stream",
    "A real-time view of an app's log output in the portal or CLI."
   ],
   [
    "Console logs",
    "In Container Apps, the stdout and stderr output of your containers."
   ],
   [
    "System logs",
    "In Container Apps, platform-generated events such as provisioning, image pulls, probe failures and scaling."
   ],
   [
    "Invocations view",
    "The Functions monitoring page listing recent executions with status, duration and logs from Application Insights."
   ]
  ],
  "example": "A new Container Apps revision stays in a failed state. The console log is empty, so the engineer checks system logs, which show an image pull failure: unauthorized. The app's user-assigned identity had never been granted AcrPull. After the role assignment and a restart of the revision, the system logs show a successful pull and the console log shows the app starting on port 8000.",
  "tip": "Container Apps: startup, pull, probe and scaling problems are in system logs; application errors are in console logs. App Service containers need file system logging enabled before log stream shows container output.",
  "check": [
   [
    "A container app revision never becomes ready and the console logs are empty. Where should you look?",
    "The system logs, which record provisioning, image pull and probe failures from the platform."
   ],
   [
    "Where can you see the logs from one specific failed execution of an Azure Function?",
    "In the function's Invocations view, backed by Application Insights, or by querying traces and requests for that invocation."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
