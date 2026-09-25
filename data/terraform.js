/* HashiCorp Certified: Terraform Associate (004) — generated plan (no hand-written weeks). */
CertHub.register({
  id: "terraform",
  vendor: "HashiCorp",
  name: "HashiCorp Certified: Terraform Associate",
  short: "Terraform Associate",
  exam: "Terraform Associate (004)",
  blurb: "Entry-level infrastructure-as-code certification for cloud engineers, DevOps and security staff who write, plan, apply and manage Terraform configuration and use HCP Terraform.",
  status: "check",
  statusNote: "Exam version 004 (tests Terraform 1.12, replaced 003 on Jan 8, 2026) and its eight objectives were confirmed from HashiCorp's 004 exam content list and learning path as indexed on developer.hashicorp.com on Sept 24, 2026; the pages could not be opened directly from this network, so re-check the objective wording there. HashiCorp publishes no domain weights: weights here are estimated from the number of sub-objectives in each objective.",
  lastVerified: "2026-09-24",
  notices: [
    { from: "2026-01-08", until: "2026-12-31", text: "Terraform Associate 004 replaced 003 on January 8, 2026. It tests Terraform 1.12 and adds lifecycle rules, custom conditions, ephemeral values and write-only arguments, and HCP Terraform projects. Make sure your study materials say 004." }
  ],
  examInfo: {
    questions: "About 57 (multiple choice, multiple answer and true/false)",
    minutes: 60,
    pass: "Not published",
    extra: "Online proctored, English, US$70.50 plus tax. Tests Terraform 1.12. Certification is valid for two years."
  },
  examSim: { questions: 57, minutes: 60 },
  sources: [
    { label: "HashiCorp infrastructure automation certifications (Terraform Associate)", url: "https://developer.hashicorp.com/certifications/infrastructure-automation" },
    { label: "Terraform Associate 004 exam content list", url: "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004" },
    { label: "Terraform Associate 004 learning path", url: "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004" }
  ],
  planWeeks: 6,
  hoursPerWeek: "5–7",

  domains: [
    {
      id: 1,
      name: "Infrastructure as Code (IaC) with Terraform",
      w: 8,
      topics: [
        "What IaC is: infrastructure defined in version-controlled, machine-readable files instead of manual console changes",
        "Advantages of IaC: repeatability, consistency, code review, audit history, automation, fewer configuration errors",
        "Declarative (describe the end state) vs imperative (list the steps) approaches",
        "Idempotence: applying the same configuration twice makes no further changes",
        "Terraform's plugin model: one workflow and language (HCL) for many providers",
        "Multi-cloud and hybrid-cloud deployments from a single configuration",
        "Service-agnostic workflows: managing SaaS, DNS, Git, Kubernetes and monitoring tools with providers",
        "Terraform vs configuration management tools: provisioning infrastructure vs configuring software inside servers",
        "Immutable infrastructure: replace rather than patch in place"
      ],
      notes: ["Objectives 1a–1c"],
      labs: [
        "Install the Terraform CLI (free) and run `terraform version`; write a one-page note comparing a manual setup you have done with how IaC would change it.",
        "Write a configuration that uses the `local` and `random` providers to create a file with a random pet name, apply it twice and confirm the second apply makes no changes (idempotence).",
        "Add the `kreuzwerker/docker` provider next to `local` in the same configuration to show one workflow managing two unrelated platforms."
      ]
    },
    {
      id: 2,
      name: "Terraform fundamentals",
      w: 11,
      topics: [
        "Installing Terraform and pinning its version with `required_version`",
        "The `required_providers` block: `source` addresses (hostname/namespace/type) and `version` constraints",
        "Version constraint operators: `=`, `!=`, `>=`, `<=`, and the pessimistic `~>`",
        "The dependency lock file `.terraform.lock.hcl`: what it records and why it is committed",
        "How providers work: plugins that call APIs, downloaded by `terraform init` from the Terraform Registry",
        "Provider tiers in the registry: official, partner and community",
        "Provider configuration blocks, multiple configurations with `alias`, and the `provider` meta-argument",
        "Using several different providers in one configuration",
        "What state is for: mapping configuration to real objects, tracking metadata and dependencies, speeding up plans",
        "State contents: resource attributes, including sensitive values, in plain JSON"
      ],
      notes: ["Objectives 2a–2d"],
      labs: [
        "Pin the `hashicorp/random` provider with `~> 3.5`, run `terraform init`, read `.terraform.lock.hcl`, then run `terraform init -upgrade` and note what changes.",
        "Configure two Docker provider blocks (one aliased) pointing at the same local Docker host and create a container with each, using `provider = docker.second`.",
        "Apply a small config, open `terraform.tfstate` in an editor and find each resource's type, name, provider and attributes; note any secret values stored there."
      ]
    },
    {
      id: 3,
      name: "Core Terraform workflow",
      w: 19,
      topics: [
        "The Write → Plan → Apply workflow for individuals and teams",
        "`terraform init`: backend setup, provider and module download, `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`",
        "`terraform validate`: syntax and internal consistency checks without contacting provider APIs",
        "`terraform plan`: refresh, diff and symbols (`+`, `-`, `~`, `-/+`), saved plans with `-out`",
        "Planning options: `-var`, `-var-file`, `-target`, `-refresh=false`, `-refresh-only`, `-replace`",
        "`terraform apply`: interactive approval, `-auto-approve`, applying a saved plan file",
        "`terraform destroy` and `terraform plan -destroy`",
        "`terraform fmt`: canonical style, `-check`, `-diff` and `-recursive`",
        "Resource replacement with `-replace` instead of the deprecated `terraform taint`",
        "Parallelism and the dependency graph during apply"
      ],
      notes: ["Objectives 3a–3g"],
      labs: [
        "Use the Docker provider to run an nginx container on port 8080: run `init`, `fmt`, `validate`, `plan -out=tfplan`, `apply tfplan`, check http://localhost:8080, then `destroy`.",
        "Change the container's external port and read the plan symbols; then run `terraform apply -replace=docker_container.web` and compare the plan output.",
        "Break the configuration on purpose (a missing brace, then a reference to an undeclared variable) and compare what `terraform fmt`, `terraform validate` and `terraform plan` report."
      ]
    },
    {
      id: 4,
      name: "Terraform configuration",
      w: 22,
      topics: [
        "Resource blocks vs data blocks, and addressing them (`TYPE.NAME`, `data.TYPE.NAME`)",
        "Cross-resource references and implicit dependencies",
        "Input variables: `type`, `default`, `description`, `sensitive`, `nullable`, and value precedence (TF_VAR_, tfvars, auto.tfvars, -var)",
        "Output values and local values",
        "Complex types: list, map, set, object, tuple; type conversion",
        "Expressions: conditionals, `for` expressions, splat `[*]`, string templates, `dynamic` blocks",
        "Built-in functions and testing them in `terraform console`",
        "`count` vs `for_each`, `count.index`, `each.key` and `each.value`",
        "Explicit dependencies with `depends_on`; `lifecycle` rules: `create_before_destroy`, `prevent_destroy`, `ignore_changes`, `replace_triggered_by`",
        "Custom conditions: variable `validation`, `precondition` and `postcondition`, and `check` blocks",
        "Sensitive data: `sensitive` values, ephemeral variables and resources, write-only arguments, secrets in state",
        "Secrets management with HashiCorp Vault and the Vault provider"
      ],
      notes: ["Objectives 4a–4h"],
      labs: [
        "Create three `local_file` resources from a map with `for_each`, then rewrite with `count` and remove the middle item in each version to see which approach causes fewer changes.",
        "Add a variable `validation` that only allows the environment names dev, test and prod, and a `postcondition` on a `local_file`; trigger each failure and read the error messages.",
        "Run a Vault dev server (`vault server -dev`), store a secret, read it with the Vault provider's `vault_kv_secret_v2` data source and mark the output `sensitive`; then look for the value in the state file."
      ]
    },
    {
      id: 5,
      name: "Terraform modules",
      w: 11,
      topics: [
        "Root module vs child modules; a module is any directory of .tf files",
        "Module sources: local paths (`./` or `../`), the public Terraform Registry, private registries, Git and HTTP URLs",
        "Calling a module with a `module` block and passing input variables",
        "Variable scope: child modules only see values passed in; outputs are read as `module.NAME.OUTPUT`",
        "Passing provider configurations to modules with the `providers` argument",
        "The `version` argument (registry sources only) and `ref` for Git sources",
        "`terraform init` or `terraform get` to install modules into `.terraform/modules`",
        "Using `count` and `for_each` on module blocks",
        "Standard module structure: main.tf, variables.tf, outputs.tf, README"
      ],
      notes: ["Objectives 5a–5d"],
      labs: [
        "Build a local module `./modules/web` that runs a Docker container from `image` and `external_port` inputs and outputs the container name; call it twice from the root module.",
        "Call a public registry module pinned with `version = \"~> x.y\"` (for example a small utility module), run `terraform init` and inspect `.terraform/modules/modules.json`.",
        "Try to read a child module's variable directly from the root module, read the error, then fix it by adding a module output."
      ]
    },
    {
      id: 6,
      name: "Terraform state management",
      w: 11,
      topics: [
        "The default local backend and the `terraform.tfstate` file, `terraform.tfstate.backup`",
        "State locking: why it prevents corruption, which backends support it, `-lock-timeout` and `terraform force-unlock`",
        "The `backend` block inside `terraform {}`: remote backends such as S3, azurerm, gcs, consul and pg",
        "Backend blocks cannot use variables; partial configuration with `-backend-config`",
        "Migrating state between backends with `terraform init -migrate-state`",
        "The `cloud` block for HCP Terraform",
        "Sensitive data in state and protecting remote state (encryption, access control)",
        "Resource drift: detecting it with `plan` and `apply -refresh-only`, reconciling configuration",
        "CLI workspaces: `terraform workspace new/select/list`, `terraform.workspace`"
      ],
      notes: ["Objectives 6a–6d"],
      labs: [
        "Run a free PostgreSQL container in Docker and configure the `pg` backend; migrate an existing local state into it with `terraform init -migrate-state`.",
        "Start a long apply (a `time_sleep` resource), run a second `terraform apply` in another terminal and read the lock error; practise `-lock-timeout`.",
        "Create a Docker container with Terraform, change it outside Terraform (`docker rename` or stop it), then use `terraform plan -refresh-only` to see the drift and decide how to reconcile it."
      ]
    },
    {
      id: 7,
      name: "Maintain infrastructure with Terraform",
      w: 8,
      topics: [
        "Importing existing infrastructure with `import` blocks and generating configuration with `terraform plan -generate-config-out`",
        "The older `terraform import` CLI command",
        "Inspecting state: `terraform state list`, `terraform state show`, `terraform show`, `terraform output`",
        "Refactoring: `moved` blocks and `terraform state mv`",
        "Removing resources from state without destroying them: `removed` blocks and `terraform state rm`",
        "Verbose logging with `TF_LOG` (TRACE, DEBUG, INFO, WARN, ERROR, JSON), `TF_LOG_PATH`, `TF_LOG_CORE` and `TF_LOG_PROVIDER`",
        "When to use logs: provider errors, crashes and bug reports",
        "Reviewing outputs and dependencies with `terraform output -json` and `terraform graph`"
      ],
      notes: ["Objectives 7a–7c"],
      labs: [
        "Start a container by hand with `docker run -d --name legacy nginx`, write an `import` block for it, run `terraform plan -generate-config-out=generated.tf` and clean up the generated config.",
        "Rename a resource in code, add a `moved` block, and confirm the plan shows a move rather than destroy-and-create; then list and show it with `terraform state` commands.",
        "Run `TF_LOG=DEBUG TF_LOG_PATH=./tf.log terraform plan`, then search the log for the provider's API calls and the plugin handshake."
      ]
    },
    {
      id: 8,
      name: "HCP Terraform",
      w: 10,
      topics: [
        "HCP Terraform (formerly Terraform Cloud): remote state, remote runs, a free tier and paid tiers",
        "Connecting the CLI: `terraform login` and the `cloud` block (organization, workspaces by name or tags)",
        "Workflows: VCS-driven, CLI-driven and API-driven runs",
        "Workspaces: each holds its own state, variables, run history and permissions",
        "Projects: grouping workspaces and assigning team access at the project level",
        "Variables and variable sets; Terraform vs environment variables; sensitive variables",
        "Collaboration and governance: teams and permissions, run approvals, policy as code (Sentinel and OPA), private registry",
        "Health assessments: drift detection and continuous validation",
        "Integrations: VCS providers, run triggers, run tasks, notifications, dynamic provider credentials"
      ],
      notes: ["Objectives 8a–8d"],
      labs: [
        "Create a free HCP Terraform account and organization, run `terraform login`, add a `cloud` block to a config that uses only the `random` provider and `terraform_data`, and run a CLI-driven plan that executes remotely.",
        "Create a project with two workspaces (dev and prod), attach a variable set to the project and confirm both workspaces inherit it.",
        "Connect a GitHub repository to a VCS-driven workspace, open a pull request and read the speculative plan posted back to it."
      ]
    }
  ],

  study: {
    1: [
      ["What is infrastructure as code, and name three benefits over manual changes.", "Defining infrastructure in machine-readable, version-controlled files. Benefits: repeatable and consistent builds, peer review and audit history through version control, faster automated provisioning, and fewer human errors or snowflake servers."],
      ["Explain declarative vs imperative IaC with a Terraform example.", "Declarative code describes the desired end state (\"three containers exist\"); Terraform works out the steps. Imperative code lists the steps (\"create container, then another\"). With Terraform, changing count from 3 to 5 creates only two more."],
      ["How does Terraform support multi-cloud and service-agnostic workflows?", "It uses one language and one plan/apply workflow, and providers translate that into API calls for any platform: AWS and Azure in the same configuration, plus DNS, GitHub, Kubernetes or monitoring tools."],
      ["What does idempotent mean for Terraform?", "Running apply again with unchanged configuration and unchanged real infrastructure makes no changes, because Terraform compares desired state with current state and only acts on differences."],
      ["How does Terraform differ from a configuration management tool like Ansible?", "Terraform focuses on provisioning and managing the lifecycle of infrastructure (networks, VMs, services) and tracks it in state. Configuration management tools mainly install and configure software inside existing servers."]
    ],
    2: [
      ["What does `version = \"~> 3.5\"` allow, and how is that different from `~> 3.5.0`?", "`~> 3.5` allows 3.5 and later 3.x releases but not 4.0. `~> 3.5.0` allows only 3.5.x patch releases."],
      ["What is `.terraform.lock.hcl` and should it be in version control?", "The dependency lock file records the exact provider versions and checksums chosen by `terraform init`. Commit it so every run and teammate uses the same provider builds; update it with `terraform init -upgrade`."],
      ["How do you use two regions of the same provider in one configuration?", "Declare two provider blocks, give one an `alias`, and set `provider = aws.west` (for example) on resources that should use the aliased configuration."],
      ["Give three reasons Terraform needs state.", "To map resources in configuration to real-world object IDs, to track metadata such as dependencies for correct ordering on destroy, and to improve performance by caching attributes. It also enables collaboration when stored remotely."],
      ["Why must the state file be protected?", "It stores every resource attribute in plain text, including passwords and keys marked sensitive. Use a remote backend with encryption and access control, and never commit state to Git."]
    ],
    3: [
      ["Describe the core Terraform workflow and what each step does.", "Write configuration; run `terraform plan` to preview the changes against current state; run `terraform apply` to make them. In teams, plans are reviewed in pull requests before apply."],
      ["What does `terraform init` do?", "Initializes the working directory: configures the backend, downloads providers (and writes the lock file) and installs modules. It is safe to run many times and is required after adding providers, modules or changing the backend."],
      ["How do `terraform validate` and `terraform fmt` differ?", "`validate` checks that the configuration is syntactically valid and internally consistent (types, references). `fmt` only rewrites files into canonical style; with `-check` it reports files that need formatting."],
      ["Why save a plan with `-out`?", "Applying a saved plan (`terraform apply tfplan`) applies exactly the reviewed changes without prompting, which is how automation separates review from execution."],
      ["How do you force Terraform to recreate one healthy resource?", "`terraform apply -replace=ADDRESS`. It replaces the older `terraform taint` command and shows the replacement in the plan first."],
      ["What plan symbols show create, destroy, update in place and replace?", "`+` create, `-` destroy, `~` update in place, `-/+` destroy then create (or `+/-` create then destroy when `create_before_destroy` is set)."]
    ],
    4: [
      ["When would you use `for_each` instead of `count`?", "When instances are identified by a meaningful key (a map or set of strings). Removing an item only affects that instance, while with `count` removing a middle element shifts indexes and can change or recreate later instances."],
      ["List the order in which Terraform applies variable values, lowest to highest precedence.", "Environment variables (TF_VAR_name), terraform.tfvars, terraform.tfvars.json, *.auto.tfvars files in lexical order, then -var and -var-file on the command line in the order given (the last one wins)."],
      ["What is the difference between a precondition, a postcondition and a check block?", "Preconditions are checked before a resource is planned or applied and postconditions after; both block the run with an error. A check block's assertions report warnings without stopping the run."],
      ["What does `sensitive = true` do, and what does it not do?", "It redacts the value in plan, apply and output display. It does not remove the value from the state file."],
      ["What do ephemeral values and write-only arguments add?", "Ephemeral variables and resources exist only during a run and are never written to plan or state files. Write-only arguments (for example `password_wo`) accept ephemeral values that are sent to the provider but not stored."],
      ["When is `depends_on` needed?", "Only for hidden dependencies Terraform cannot see from references, such as an app that needs an IAM policy that nothing in its arguments references. Prefer implicit references where possible."]
    ],
    5: [
      ["What module sources can Terraform use?", "Local paths starting with ./ or ../, the public Terraform Registry (namespace/name/provider), private registries such as HCP Terraform's, Git, GitHub, Bitbucket, HTTP archives, and cloud storage buckets."],
      ["How does data flow between a root module and a child module?", "The root passes values in through arguments that match the child's input variables. The child exposes values through outputs, read as `module.NAME.OUTPUT`. Nothing else crosses the boundary."],
      ["How do you pin a module version?", "Registry modules use the `version` argument with a constraint. Git sources pin with `?ref=` a tag or commit in the source URL; local paths have no version."],
      ["Do child modules inherit provider configurations?", "Default (unaliased) provider configurations are inherited automatically. Aliased configurations must be passed explicitly with the `providers` map in the module block."],
      ["Which command installs or updates modules?", "`terraform init` installs them into .terraform/modules; `terraform get -update` (or `init -upgrade`) fetches newer versions allowed by constraints."]
    ],
    6: [
      ["What is the local backend and where does it keep state?", "The default backend, used when no backend is configured. It stores state in terraform.tfstate in the working directory (per-workspace files under terraform.tfstate.d) and locks using the local file system."],
      ["What is state locking and what do you do if a lock gets stuck?", "Locking stops two runs writing state at once. If a crashed run leaves a lock behind, confirm nothing is running and then use `terraform force-unlock LOCK_ID`."],
      ["Why can't you use variables in a backend block, and what is the workaround?", "The backend is set up during init before variables are evaluated. Use partial configuration: leave values out and supply them with `-backend-config` files or key=value pairs."],
      ["How do you move state from local to a remote backend?", "Add the backend (or cloud) block and run `terraform init -migrate-state`; Terraform copies the existing state to the new backend after confirmation."],
      ["What is drift and how do you handle it?", "Drift is a difference between real infrastructure and state caused by changes outside Terraform. `terraform plan -refresh-only` shows it; either accept it into state with `apply -refresh-only` (and update the code) or run a normal apply to put the infrastructure back."]
    ],
    7: [
      ["How do you bring an existing resource under Terraform management today?", "Add an `import` block with `to` (the resource address) and `id`, run `terraform plan -generate-config-out=generated.tf` to draft configuration if needed, review it, then apply."],
      ["How do you rename a resource without destroying it?", "Add a `moved` block from the old address to the new one (or run `terraform state mv`). The plan then shows a move and no replacement."],
      ["How do you stop managing a resource without deleting it?", "Use a `removed` block with `lifecycle { destroy = false }`, or `terraform state rm`. The object stays in the real world but leaves state."],
      ["Which environment variables control logging?", "`TF_LOG` sets the level (TRACE, DEBUG, INFO, WARN, ERROR or JSON), `TF_LOG_PATH` writes to a file, and `TF_LOG_CORE`/`TF_LOG_PROVIDER` set levels for Terraform core or providers separately."]
    ],
    8: [
      ["Name the three HCP Terraform run workflows.", "VCS-driven (runs start from commits and pull requests), CLI-driven (you run plan/apply locally and they execute remotely) and API-driven (automation calls the API)."],
      ["How do projects and workspaces relate?", "A workspace holds one state, its variables, runs and settings. Projects group workspaces so teams can be given access to all of them at once and organize them by app or team."],
      ["What are variable sets used for?", "Sharing the same variables (such as cloud credentials) across many workspaces or whole projects instead of repeating them in each workspace."],
      ["Which governance features does HCP Terraform add?", "Team permissions, run approvals, policy as code with Sentinel or OPA, a private registry for modules and providers, audit trails, and health assessments that find drift."],
      ["How do you connect a local configuration to HCP Terraform?", "Run `terraform login` to store an API token, add a `cloud` block with the organization and workspace, then run `terraform init`."]
    ]
  },

  questions: [
    /* Domain 1: IaC with Terraform (7) */
    ["tf1",0,1,"A team rebuilds a test environment by hand each sprint and the builds never match. Which IaC benefit most directly fixes this?",["Lower cloud list prices for the same resources","Faster network throughput between the servers","Repeatable builds from the same versioned code","Automatic replacement of the operating system"],2,"Code in version control produces the same environment every time. IaC doesn't change prices, bandwidth or OS choice.","Objective 1b"],
    ["tf2",0,1,"Which statement best describes Terraform's declarative approach?",["You describe the end state and Terraform works out the steps","You write each API call yourself in the exact order Terraform must run it","You record console clicks and Terraform replays them","You write shell scripts that Terraform schedules"],0,"Terraform configuration declares the desired result; Terraform builds the dependency graph and decides the actions. Listing each call in order is the imperative style.","Objective 1a"],
    ["tf3",0,1,"A company runs workloads on AWS and Azure and manages DNS with Cloudflare. How can Terraform help?",["It converts AWS resources into equivalent Azure resources whenever asked","It needs a separate Terraform edition for each cloud","It can only manage one provider per state file","One workflow and language manage all three through providers"],3,"Providers let a single configuration and plan/apply workflow cover many platforms. Terraform doesn't translate resources between clouds, and one state can hold several providers.","Objective 1c"],
    ["tf4",0,1,"An engineer runs terraform apply twice in a row without changing code or infrastructure. What happens on the second run?",["Every resource is recreated from scratch","Terraform reports no changes to make","Terraform duplicates each resource","The state file is deleted and rebuilt"],1,"Terraform is idempotent: it compares configuration to current state and acts only on differences, so there is nothing to do.","Objective 1b"],
    ["tf5",0,1,"Which task is Terraform designed for, compared with a configuration management tool?",["Editing application config files inside running VMs","Provisioning and managing the lifecycle of infrastructure","Patching operating system packages on long-lived servers every night","Collecting logs from servers and sending alerts"],1,"Terraform provisions and manages infrastructure resources through APIs. Package patching and in-guest configuration are what tools like Ansible or Chef focus on.","Objective 1a"],
    ["tf6",0,1,"A security lead wants every infrastructure change reviewed before it happens. Which IaC practice supports this?",["Giving every engineer console admin rights","Running terraform apply -auto-approve on laptops","Letting engineers make changes first and write up documentation afterwards","Storing configuration in Git and reviewing plans in pull requests"],3,"Version-controlled code lets changes and their plans be reviewed and approved. Broad console access and auto-approve bypass review.","Objective 1b"],
    ["tf7",0,1,"What lets Terraform manage services such as GitHub teams or Datadog monitors, not just cloud servers?",["A provider plugin for each service's API","Terraform's built-in SaaS connector","A special Terraform edition built only for SaaS tools","Manual steps recorded in the state file"],0,"Any service with an API can have a provider, which is why Terraform is service-agnostic. There is no special SaaS edition.","Objective 1c"],

    /* Domain 2: Terraform fundamentals (10) */
    ["tf8",0,2,"A required_providers entry reads: aws = { source = \"hashicorp/aws\", version = \"~> 5.40\" }. Which version could terraform init select?",["6.0.0","5.39.0","5.72.1","4.67.0"],2,"`~> 5.40` allows 5.40 and any later 5.x release, but not 6.0. 5.39 is below the minimum.","Objective 2a"],
    ["tf9",0,2,"A developer runs terraform init and gets a newer provider patch than a teammate did last week. What stops this drift between machines?",["Committing the .terraform directory","Deleting the local provider plugin cache before every run","Setting TF_LOG to TRACE","Committing the .terraform.lock.hcl file"],3,"The dependency lock file records the selected provider versions and checksums; committed to VCS, everyone gets the same builds. The .terraform directory holds downloaded plugins and should not be committed.","Objective 2a"],
    ["tf10",0,2,"The lock file pins aws 5.40.0, and the constraint ~> 5.40 would allow 5.72. How do you move to the newest allowed version?",["Run terraform validate","Run terraform apply -refresh-only","Run terraform init -upgrade","Delete terraform.tfstate"],2,"`init -upgrade` ignores the locked versions, picks the newest within the constraints and updates the lock file. Validate and refresh-only don't touch providers.","Objective 2a"],
    ["tf11",0,2,"What is a Terraform provider?",["A file that stores the current resource attributes","A plugin that lets Terraform call a platform's API","A reusable folder of resources with inputs","The company hosting your remote state"],1,"Providers are plugins that implement resource types and data sources by calling APIs. State stores attributes; modules are reusable folders.","Objective 2b"],
    ["tf12",0,2,"A configuration has provider \"aws\" { region = \"us-east-1\" } and provider \"aws\" { alias = \"west\" region = \"us-west-2\" }. How does a resource use the second one?",["provider = aws.west","region = aws.west","provider = \"aws-west\"","alias = \"west\" on the resource"],0,"The `provider` meta-argument takes an unquoted reference `<name>.<alias>`. Resources don't take an `alias` argument.","Objective 2c"],
    ["tf13",0,2,"source = \"hashicorp/random\" is shorthand for which full provider address?",["github.com/hashicorp/random","releases.hashicorp.com/providers/random","registry.terraform.io/hashicorp/random","app.terraform.io/hashicorp/random"],2,"When no hostname is given, Terraform uses the public registry at registry.terraform.io.","Objective 2a"],
    ["tf14",0,2,"Which is NOT a purpose of Terraform state?",["Storing the provider plugin binaries","Mapping resources in code to real object IDs","Tracking metadata such as dependencies","Caching attributes to speed up planning"],0,"Provider binaries live in the .terraform directory or a plugin cache. State maps real objects, tracks metadata and caches attributes.","Objective 2d"],
    ["tf15",0,2,"A database password is set through a sensitive variable. Where can the value still be read in plain text?",["In the terraform plan console output","In the output of terraform fmt","Nowhere; sensitive values are encrypted","In the terraform.tfstate file"],3,"`sensitive` only redacts CLI display. The value is still stored in state, so state must be protected.","Objective 2d"],
    ["tf16",0,2,"A terraform block contains required_version = \">= 1.12.0\". An engineer runs Terraform 1.9. What happens?",["Terraform upgrades itself automatically","Terraform returns an error before doing any work","The setting only affects providers","Terraform continues the run but prints a version warning first"],1,"`required_version` constrains the Terraform CLI version; a version outside the range makes Terraform stop with an error.","Objective 2a"],
    ["tf17",0,2,"Which registry tier describes providers owned and maintained by HashiCorp?",["Partner","Official","Community","Archived"],1,"Official providers are owned and maintained by HashiCorp. Partner providers are maintained by technology partners, and community providers by individuals or groups.","Objective 2b"],

    /* Domain 3: Core workflow (17) */
    ["tf18",0,3,"An engineer clones a repository with Terraform code and wants to run a plan. What must run first?",["terraform apply","terraform refresh","terraform fmt","terraform init"],3,"init sets up the backend and downloads providers and modules; plan fails without it.","Objective 3b"],
    ["tf19",0,3,"Which step in the core workflow lets a reviewer see exactly what will be created, changed or destroyed?",["Plan","Write","Init","Validate"],0,"`terraform plan` compares configuration with state and real infrastructure and shows proposed actions.","Objective 3a"],
    ["tf20",0,3,"A pipeline must fail if any .tf file is not in canonical format, without rewriting files. Which command fits?",["terraform validate -json -no-color","terraform plan -lock=false","terraform fmt -check -recursive","terraform init -reconfigure"],2,"`fmt -check` exits non-zero when files need formatting and changes nothing; `-recursive` includes subdirectories. validate checks correctness, not style.","Objective 3g"],
    ["tf21",0,3,"What does terraform validate check?",["That the provider credentials are valid and have enough permissions","That resources exist in the cloud account","That the state file matches reality","That the syntax and references are internally consistent"],3,"validate checks syntax, types and references in the configuration without calling provider APIs or reading remote state.","Objective 3c"],
    ["tf22",0,3,"A team wants CI to apply exactly the plan a reviewer approved. Which pair of commands does this?",["terraform plan, then a separate terraform apply -auto-approve","terraform validate, then terraform apply","terraform plan -out=tfplan, then terraform apply tfplan","terraform refresh, then terraform apply"],2,"A saved plan file freezes the reviewed actions and apply runs it without a prompt. A fresh apply could produce a different plan.","Objective 3d"],
    ["tf23",0,3,"In a plan, a resource is shown with the symbol -/+. What does it mean?",["It will be updated in place without replacement","It will be destroyed and then recreated","It will be read as a data source","It will be imported into state"],1,"-/+ means replacement: destroy then create. ~ is an in-place update.","Objective 3d"],
    ["tf24",0,3,"A container is healthy but you need Terraform to recreate it. What is the current recommended command?",["terraform apply -replace=docker_container.web","terraform taint docker_container.web, then terraform apply","terraform state rm docker_container.web","terraform destroy -auto-approve"],0,"`-replace` plans a replacement for that one resource and shows it in the plan. taint is deprecated; state rm would forget the resource instead.","Objective 3e"],
    ["tf25",0,3,"How can you preview what terraform destroy would remove without deleting anything?",["terraform destroy -check","terraform validate -destroy","terraform plan -destroy","terraform show -destroy"],2,"`plan -destroy` creates a speculative destroy plan. destroy has no -check option.","Objective 3f"],
    ["tf26",0,3,"After adding a new module block to the configuration, terraform plan reports \"Module not installed\". What fixes it?",["terraform init","terraform fmt","terraform validate","terraform output"],0,"init (or terraform get) downloads new modules. Any new provider or module requires init.","Objective 3b"],
    ["tf27",0,3,"You moved the backend to a new bucket but don't want to copy the old state, just start using the new settings. Which command applies?",["terraform init -upgrade","terraform apply -refresh-only","terraform validate -backend","terraform init -reconfigure"],3,"`-reconfigure` ignores the existing backend setup and configures the new one without migrating state. `-migrate-state` would copy it.","Objective 3b"],
    ["tf28",0,3,"Running terraform apply without a saved plan does what before making changes?",["Applies the changes immediately without showing any output","Creates a plan and asks you to approve it","Runs terraform fmt on all files","Destroys all resources first"],1,"Without a plan file, apply generates a plan and waits for you to type yes (unless -auto-approve is used).","Objective 3e"],
    ["tf29",0,3,"Which plan symbol shows an attribute being updated without replacing the resource?",["+","~","-","<="],1,"~ means update in place. + is create, - is destroy, and <= marks a data source read.","Objective 3d"],
    ["tf30",0,3,"A teammate wants to pass a different variable file for staging at plan time. Which syntax is correct?",["terraform plan -tfvars staging","terraform plan -tfvars-file=env/staging.tfvars","terraform plan -input=staging.tfvars","terraform plan -var-file=staging.tfvars"],3,"`-var-file` loads variable values from the named file. The other flags don't exist or mean something else (-input controls prompting).","Objective 3d"],
    ["tf31",0,3,"Why is terraform destroy considered part of the core workflow rather than just a cleanup step?",["It removes all resources Terraform manages in that state","It rewrites the configuration files","It deletes only the resources that have drifted from the configuration","It removes providers from the lock file"],0,"destroy removes everything tracked in the current state, which is useful for short-lived environments. It doesn't touch code or the lock file.","Objective 3f"],
    ["tf32",0,3,"An engineer runs terraform fmt in a directory. What does it change?",["Resource names to match a naming standard","Deprecated arguments to their current replacement arguments","Indentation and alignment to the canonical style","Provider versions to the latest release"],2,"fmt only rewrites layout (spacing, alignment, indentation). It doesn't rename resources or change logic.","Objective 3g"],
    ["tf33",0,3,"You want terraform plan to skip checking real infrastructure to speed up a quick review. Which option does that?",["-refresh-only","-lock=false","-parallelism=1","-refresh=false"],3,"-refresh=false uses cached state without querying providers. -refresh-only does the opposite: it plans only state updates from reality.","Objective 3d"],
    ["tf34",0,3,"During an outage you need to apply a fix to one resource only. Which option limits the run, and how should it be treated?",["-replace, used for all normal changes","-refresh-only, used after every apply","-target, used only for exceptional cases","-lock=false, used by default in every CI pipeline"],2,"-target focuses plan/apply on given addresses and their dependencies; HashiCorp recommends it only for exceptional situations, not routine use.","Objective 3d"],

    /* Domain 4: Configuration (20) */
    ["tf35",0,4,"Given: data \"docker_image\" \"nginx\" { name = \"nginx:latest\" }. How do you reference its ID in a resource?",["docker_image.nginx.id","data.docker_image.nginx.id","data.docker_image[\"nginx\"].id","var.docker_image.nginx.id"],1,"Data sources are referenced as data.TYPE.NAME.ATTRIBUTE. Without the data prefix, the address points to a managed resource.","Objective 4a"],
    ["tf36",0,4,"What is the main difference between a resource block and a data block?",["Resources are managed; data blocks only read existing information","Data blocks create objects; resource blocks only read existing information","Data blocks are only allowed inside modules","Resources cannot reference data blocks"],0,"Resource blocks create, update and delete objects. Data blocks read information from providers without managing it.","Objective 4a"],
    ["tf37",0,4,"Given: resource \"local_file\" \"cfg\" { count = 3  filename = \"cfg-${count.index}.txt\"  content = \"x\" }. Which files are created?",["cfg-1.txt, cfg-2.txt, cfg-3.txt","cfg-count.txt three times","cfg-0.txt, cfg-1.txt, cfg-2.txt","cfg-3.txt only"],2,"count.index starts at 0, so three instances get indexes 0, 1 and 2.","Objective 4e"],
    ["tf38",0,4,"Given: for_each = toset([\"dev\", \"prod\"]) on a resource. What are each.key and each.value for the first instance?",["\"dev\" and \"dev\"","0 and \"dev\"","\"dev\" and null","\"key\" and \"dev\""],0,"For a set of strings, each.key and each.value are both the element.","Objective 4e"],
    ["tf39",0,4,"A list of five servers is managed with count. Removing the second item recreates or changes several later servers. What change avoids this?",["Add depends_on to every server","Set create_before_destroy on the servers","Use -target so that only one server is applied at a time","Use for_each over a map or set keyed by name"],3,"count addresses instances by index, so removing one shifts the rest. for_each uses stable keys, so only the removed key is affected.","Objective 4e"],
    ["tf40",0,4,"Variable region has default \"us-east-1\". TF_VAR_region=\"eu-west-1\" is set, terraform.tfvars sets \"us-west-2\", and the command includes -var=\"region=ap-south-1\". Which value is used?",["us-east-1 (the default)","ap-south-1 (-var flag)","eu-west-1 (TF_VAR_region)","us-west-2 (terraform.tfvars)"],1,"Command-line -var and -var-file have the highest precedence, then *.auto.tfvars, terraform.tfvars, and environment variables; the default is used only if nothing else sets it.","Objective 4c"],
    ["tf41",0,4,"Given: variable \"ports\" { type = list(number) }. Which value is valid?",["{ http = 80 }","[80, 443]","\"80,443\"","[\"http\", \"https\"]"],1,"list(number) needs an ordered list of numbers. A map, a single string or a list of words cannot convert.","Objective 4d"],
    ["tf42",0,4,"Which type fits a value like { name = \"web\", port = 8080, public = true } with fixed attribute names of different types?",["map(string)","list(any)","set(string)","object({ name = string, port = number, public = bool })"],3,"An object type has named attributes each with its own type. A map requires all values to be the same type.","Objective 4d"],
    ["tf43",0,4,"What does [for s in var.names : upper(s)] return when var.names is [\"a\", \"b\"]?",["[\"A\", \"B\"]","{ a = \"A\", b = \"B\" }","\"AB\"","[\"a\", \"b\", \"A\", \"B\"]"],0,"A for expression in square brackets returns a list with the transformed elements. Curly braces with => would produce a map.","Objective 4e"],
    ["tf44",0,4,"Resource aws_instance.web uses count = 3. How do you output a list of all three IDs?",["aws_instance.web.id","aws_instance.web[3].id","aws_instance.web[*].id","aws_instance[*].web.id"],2,"The splat expression [*] collects an attribute from every instance into a list. Without an index, a counted resource can't be read as one object.","Objective 4e"],
    ["tf45",0,4,"A container resource references docker_image.app.image_id in its image argument. What does Terraform infer?",["Nothing, unless you also add an explicit depends_on argument","That both resources must be in one module","That the image must be a data source","An implicit dependency so the image is handled first"],3,"References create implicit dependencies; Terraform orders the graph from them. depends_on is only needed for hidden dependencies.","Objective 4f"],
    ["tf46",0,4,"An application server needs a policy to be attached first, but no argument on the server references the policy. What should you add?",["lifecycle { prevent_destroy = true }","count = 1 on the policy","depends_on = [aws_iam_role_policy.app]","A data \"aws_iam_role_policy\" block for the policy"],2,"depends_on declares a dependency Terraform can't see from references. prevent_destroy and count don't affect ordering.","Objective 4f"],
    ["tf47",0,4,"Replacing a load balancer certificate causes downtime because the old one is deleted first. Which setting fixes the order?",["lifecycle { ignore_changes = all }","lifecycle { create_before_destroy = true }","depends_on = [aws_lb.main] on the certificate resource","lifecycle { prevent_destroy = true }"],1,"create_before_destroy makes Terraform create the replacement before destroying the old object. prevent_destroy would block the replacement entirely.","Objective 4f"],
    ["tf48",0,4,"An autoscaler changes a group's desired_capacity outside Terraform, and every plan tries to reset it. What is the cleanest fix?",["lifecycle { ignore_changes = [desired_capacity] }","Run every terraform apply with -refresh=false from now on","Remove the resource from state","Add depends_on to the autoscaler"],0,"ignore_changes tells Terraform not to plan updates for those attributes after creation. The other options hide or break management.","Objective 4f"],
    ["tf49",0,4,"You want terraform plan to fail if var.env is not dev, test or prod. Which block does this?",["A precondition block inside the provider configuration","A check block with an assert","A validation block inside the variable","An output with sensitive = true"],2,"Variable validation blocks reject bad input with your error message. A check block would only warn.","Objective 4g"],
    ["tf50",0,4,"A team wants a continuous health assertion that a website returns HTTP 200, but a failure should warn rather than block the run. Which feature fits?",["A check block","A postcondition","A variable validation","prevent_destroy"],0,"Check block assertions produce warnings and don't stop plan or apply. Postconditions and validations raise errors.","Objective 4g"],
    ["tf51",0,4,"Where do you place a postcondition that verifies an attribute of a resource after it is created?",["Inside the terraform block, under required_providers","Inside the provider block","Inside a locals block","Inside the resource's lifecycle block"],3,"precondition and postcondition blocks go inside a resource's (or data source's) lifecycle block, or in an output for preconditions.","Objective 4g"],
    ["tf52",0,4,"A module passes a database password to a provider and the team must keep it out of both plan files and state. Which approach fits Terraform 1.12?",["Mark the variable sensitive = true and rely on CLI redaction","Use an ephemeral variable passed to a write-only argument","Store the password in a local value","Put the password in the output block"],1,"Ephemeral values are never persisted, and write-only arguments accept them without storing them. sensitive only hides display; the value still lands in state.","Objective 4h"],
    ["tf53",0,4,"What is the recommended way to supply short-lived cloud credentials to Terraform instead of hard-coding them?",["Put the keys in terraform.tfvars in Git","Generate them from Vault or use environment variables","Add them to a README in the repository","Store them as default values in variables.tf with sensitive = true"],1,"Secrets should come from a secrets manager such as Vault (for example dynamic credentials) or the environment, never from committed files.","Objective 4h"],
    ["tf54",0,4,"Which command gives an interactive prompt for testing expressions such as cidrsubnet(\"10.0.0.0/16\", 8, 1)?",["terraform show","terraform graph","terraform output -json","terraform console"],3,"terraform console evaluates expressions and functions against the current configuration and state. The result here is 10.0.1.0/24.","Objective 4e"],

    /* Domain 5: Modules (10) */
    ["tf55",0,5,"Which module source refers to a local directory?",["source = \"./modules/network\"","source = \"modules/network\"","source = \"local::modules/network\"","source = \"file:modules/network\""],0,"Local paths must begin with ./ or ../; without them Terraform treats the string as a registry address.","Objective 5a"],
    ["tf56",0,5,"A module block uses source = \"hashicorp/consul/aws\". Where does Terraform get it?",["From a GitHub repository with that name","From a local folder named hashicorp","From the public Terraform Registry","From the HCP Terraform state"],2,"The NAMESPACE/NAME/PROVIDER format is a registry address on registry.terraform.io.","Objective 5a"],
    ["tf57",0,5,"For which module source can you use the version argument?",["A local path","A plain HTTP URL","A Git repository cloned over SSH","A module from a registry"],3,"The version argument works only for registry sources (public or private). Git sources pin with ?ref= in the URL.","Objective 5d"],
    ["tf58",0,5,"A child module declares variable \"name\". How does the root module give it a value?",["Set TF_VAR_module_name","Declare the same variable in the root module only","Set name as an argument in the module block","Reference module.child.var.name"],2,"Inputs are passed as arguments in the module block. A root variable with the same name isn't passed automatically.","Objective 5b"],
    ["tf59",0,5,"The root module needs the container ID created inside module \"web\". What is required?",["Nothing; reference module.web.docker_container.this.id directly from the root","An output in the child module, read as module.web.OUTPUT_NAME","A data source in the root module","A depends_on in the child module"],1,"Only outputs cross the module boundary. Internal resources of a child can't be referenced directly.","Objective 5b"],
    ["tf60",0,5,"A module should use an aliased provider configuration aws.west. How is it passed?",["providers = { aws = aws.west } in the module block","provider = \"west\" inside the child's resources","region = \"us-west-2\" in the module block","Nothing; aliased provider configurations are inherited by child modules automatically"],0,"The providers map passes specific provider configurations to a child. Only default (unaliased) configurations are inherited automatically.","Objective 5c"],
    ["tf61",0,5,"A Git-sourced module must stay on tag v1.4.0. Which source is correct?",["git::https://example.com/net.git with version = \"1.4.0\"","https://example.com/net.git#v1.4.0","git::https://example.com/net.git?ref=v1.4.0","git::https://example.com/net.git//v1.4.0"],2,"Git sources select a tag, branch or commit with ?ref=. The version argument doesn't apply to Git, and // selects a subdirectory.","Objective 5d"],
    ["tf62",0,5,"You raised a registry module's version constraint. Which command downloads the newer module version?",["terraform init -upgrade","terraform validate","terraform fmt","terraform plan -refresh=false"],0,"init -upgrade (or terraform get -update) fetches newer modules allowed by the constraints.","Objective 5d"],
    ["tf63",0,5,"Given: module \"bucket\" { source = \"./modules/bucket\"  for_each = toset([\"logs\", \"data\"])  name = each.key }. How is the logs instance addressed?",["module.bucket[each.key == \"logs\"]","module.logs.bucket","module.bucket[0]","module.bucket[\"logs\"]"],3,"Instances created with for_each are addressed by key in square brackets.","Objective 5c"],
    ["tf64",0,5,"What is the root module?",["The module in the public registry with the most downloads","The .tf files in the directory where you run Terraform","The first module block in main.tf","A module that holds only provider blocks"],1,"The working directory's configuration is the root module; it can call child modules.","Objective 5b"],

    /* Domain 6: State management (10) */
    ["tf65",0,6,"No backend is configured. Where does Terraform keep state for the default workspace?",["In .terraform.lock.hcl","In terraform.tfstate in the working directory","In HCP Terraform, which is used automatically when no backend is set","In the provider's cloud account"],1,"The local backend is the default and writes terraform.tfstate in the working directory.","Objective 6a"],
    ["tf66",0,6,"Two engineers run terraform apply at the same time against the same remote state. What prevents corruption?",["The .terraform.lock.hcl dependency lock file","terraform fmt","Provider aliases","State locking by the backend"],3,"Backends that support locking block a second write until the first finishes. The dependency lock file is about provider versions.","Objective 6b"],
    ["tf67",0,6,"A CI job crashed and left the state locked. Nothing else is running. What should you do?",["Run terraform force-unlock with the lock ID","Delete the state file and let the next run rebuild it","Run terraform init -upgrade","Run terraform apply -lock=true"],0,"force-unlock removes a stale lock. Only use it after confirming no run is active; deleting state loses tracking of every resource.","Objective 6b"],
    ["tf68",0,6,"Given: terraform { backend \"s3\" { bucket = var.state_bucket } }. What happens at init?",["It works if the variable has a default","Terraform prompts for the bucket later during apply","It fails because backend blocks can't use variables","Terraform silently uses local state"],2,"Backend configuration is read before variables exist, so references aren't allowed. Use -backend-config for dynamic values.","Objective 6c"],
    ["tf69",0,6,"Each environment uses a different state bucket, but the team wants one backend block. What does Terraform support?",["Interpolating terraform.workspace into the backend bucket name","Setting the bucket with TF_VAR_bucket","A for_each on the backend block","Partial configuration with -backend-config at init"],3,"Partial backend configuration leaves out settings and supplies them from a file or key=value with -backend-config.","Objective 6c"],
    ["tf70",0,6,"You added a remote backend to a project that already has local state. Which command moves the existing state?",["terraform state push","terraform apply -refresh-only","terraform init -migrate-state","terraform workspace new remote"],2,"init -migrate-state copies existing state into the newly configured backend after confirmation.","Objective 6c"],
    ["tf71",0,6,"Someone changed a container's settings with the Docker CLI. How do you see the drift without proposing changes to infrastructure?",["terraform validate","terraform plan -refresh-only","terraform fmt -diff","terraform state rm docker_container.web"],1,"A refresh-only plan shows how state would change to match reality without planning infrastructure updates.","Objective 6d"],
    ["tf72",0,6,"A refresh-only plan shows a tag was edited manually, and the team decides the manual value is correct. What should they do?",["Apply the refresh-only plan and update the code to match","Run terraform destroy and then apply again to rebuild from the code","Delete the resource from state","Nothing; drift fixes itself on the next plan"],0,"Applying refresh-only records the new value in state, and updating code keeps the next normal plan from reverting it.","Objective 6d"],
    ["tf73",0,6,"Why should state files never be committed to a Git repository?",["Git cannot store JSON files","Terraform deletes and regenerates the state file at the end of every run","They may contain secrets in plain text and cause conflicts","They are too large to commit"],2,"State holds resource attributes including sensitive values, and shared editing through Git has no locking.","Objective 6c"],
    ["tf74",0,6,"You run terraform workspace new staging with the local backend. Where is the staging state stored?",["terraform.tfstate.d/staging/terraform.tfstate","terraform.tfstate","staging.tfvars",".terraform/workspaces/staging.tfstate inside the working directory"],0,"Non-default CLI workspaces with the local backend keep state under terraform.tfstate.d/<name>/.","Objective 6a"],

    /* Domain 7: Maintain infrastructure (7) */
    ["tf75",0,7,"A container was created by hand. Which approach lets you import it and draft configuration in one plan?",["terraform state push with a JSON file","terraform apply -replace on the container","Write a data block for it, then run terraform apply to adopt it into state","An import block and terraform plan -generate-config-out=generated.tf"],3,"Import blocks are planned like other changes, and -generate-config-out writes starter configuration for the imported resource.","Objective 7a"],
    ["tf76",0,7,"Which command lists every resource address tracked in the current state?",["terraform output -json","terraform state list","terraform providers","terraform graph"],1,"state list prints addresses; state show ADDRESS shows one resource's attributes.","Objective 7b"],
    ["tf77",0,7,"You renamed resource \"local_file\" \"a\" to \"local_file\" \"config\". How do you avoid Terraform destroying and recreating it?",["Add depends_on = [local_file.a] to the renamed local_file.config","Add moved { from = local_file.a  to = local_file.config }","Run terraform fmt","Run terraform init -upgrade"],1,"A moved block tells Terraform the object's address changed, so the plan shows a move. terraform state mv does the same imperatively.","Objective 7b"],
    ["tf78",0,7,"Terraform should stop managing a DNS record but leave it in place. Which option does that?",["terraform destroy -target on the record","Delete the resource block and run terraform apply as normal","lifecycle { prevent_destroy = true }","A removed block with lifecycle { destroy = false }"],3,"A removed block with destroy = false drops it from state without deleting it. Deleting the block and applying would destroy it.","Objective 7b"],
    ["tf79",0,7,"A provider fails with an unclear error and you need detailed logs saved to a file. Which settings do this?",["TF_LOG=DEBUG and TF_LOG_PATH=./tf.log","TF_VAR_log=debug","terraform plan -verbose > ./tf.log 2>&1","TF_INPUT=0"],0,"TF_LOG sets the log level and TF_LOG_PATH writes to a file. There is no -verbose flag on plan.","Objective 7c"],
    ["tf80",0,7,"You only want detailed logs from the provider plugin, not from Terraform core. Which variable should you set?",["TF_LOG_CORE","TF_CLI_ARGS_plan","TF_LOG_PROVIDER","TF_WORKSPACE"],2,"TF_LOG_PROVIDER sets the provider log level separately; TF_LOG_CORE does the same for core.","Objective 7c"],
    ["tf81",0,7,"Which command shows a human-readable view of the whole current state or a saved plan file?",["terraform validate","terraform fmt","terraform login","terraform show"],3,"terraform show reads state (or a plan file) and prints it; -json gives machine-readable output.","Objective 7b"],

    /* Domain 8: HCP Terraform (9) */
    ["tf82",0,8,"A developer wants to run plans from their laptop but have them execute and store state in HCP Terraform. Which workflow is this?",["VCS-driven","API-driven","CLI-driven","Agent-only"],2,"The CLI-driven workflow starts runs from local terraform commands and executes them remotely.","Objective 8a"],
    ["tf83",0,8,"Which block connects a configuration to an HCP Terraform organization and workspace?",["provider \"hcp\" { organization = \"acme\" workspace = \"app\" }","cloud { organization = \"acme\" workspaces { name = \"app\" } }","backend \"local\" { organization = \"acme\" }","module \"cloud\" { source = \"app.terraform.io\" }"],1,"The cloud block in the terraform block sets the organization and workspaces, then terraform init connects to them.","Objective 8a"],
    ["tf84",0,8,"The same cloud credentials must be available to 30 workspaces. What is the best HCP Terraform feature for this?",["A variable set applied to them or their project","Copying the same variables into each workspace by hand","A terraform.tfvars file in each repo","A shared module output"],0,"Variable sets share variables across many workspaces or projects from one place.","Objective 8d"],
    ["tf85",0,8,"How do HCP Terraform projects help a platform team?",["They replace workspaces and keep one shared state file for every environment","They store provider binaries for teams","They group workspaces so access and settings apply to the group","They are needed to run terraform fmt"],2,"Projects organize workspaces and let you grant team access at project level. Each workspace still has its own state.","Objective 8c"],
    ["tf86",0,8,"A security team needs every run blocked if a storage bucket is public. Which HCP Terraform feature enforces this?",["Policy as code with Sentinel or OPA","Run triggers","Cost estimation","The private module and provider registry"],0,"Policies evaluate each plan and can block runs that break rules.","Objective 8b"],
    ["tf87",0,8,"The network workspace changes, and the app workspace that reads its outputs must then plan automatically. Which feature connects them?",["Variable sets","Health assessments","Team tokens","Run triggers"],3,"Run triggers queue a run in one workspace after a successful apply in a source workspace.","Objective 8d"],
    ["tf88",0,8,"Which HCP Terraform feature periodically checks whether real infrastructure still matches a workspace's state?",["terraform fmt -check","Health assessments (drift detection)","The private module registry","Speculative plans on every pull request"],1,"Health assessments run drift detection and continuous validation of checks on a schedule.","Objective 8b"],
    ["tf89",0,8,"What does a VCS-driven workspace do when someone opens a pull request against its branch?",["Applies the change right away to the workspace's infrastructure","Runs a speculative plan and reports it on the pull request","Deletes the workspace state","Locks the repository"],1,"Speculative plans show the impact of a pull request without applying. Apply happens after merge (with approval if required).","Objective 8a"],
    ["tf90",0,8,"Which command stores an API token so the CLI can authenticate with HCP Terraform?",["terraform init -token","terraform workspace select","terraform providers lock","terraform login"],3,"terraform login opens a browser to create a token and saves it in the CLI credentials file.","Objective 8a"]
  ]
});
