/* Terraform Associate (004) performance-based practice simulations. */
CertHub.addPbqs("terraform", [
  { id: "iac-concepts-match", d: 1, type: "match", title: "Match IaC concepts to their descriptions",
    prompt: "A new team member is reading your team's IaC guidelines. Match each concept to the statement that best describes it.",
    pairs: [
      ["Declarative configuration", "You describe the desired end state and the tool works out the steps"],
      ["Idempotence", "Running apply again with no changes to code or infrastructure changes nothing"],
      ["Immutable infrastructure", "Servers are replaced with new ones instead of being patched in place"],
      ["Provider plugin model", "One language and workflow manages many platforms through API plugins"],
      ["Configuration management tool", "Installs and configures software inside servers that already exist"],
      ["Version-controlled IaC", "Every infrastructure change has a reviewable history and can be rolled back"]
    ],
    extra: ["You list each command to run in order and the tool runs them exactly", "Changes are made by hand in the cloud console and documented afterwards"],
    explain: "Terraform is declarative: you write the end state and it computes a plan, which is also why it is idempotent (a second apply finds nothing to change). Immutable infrastructure replaces rather than patches. Providers are plugins that translate one HCL workflow into API calls for AWS, Azure, DNS, GitHub and more. Tools like Ansible focus on configuring software inside machines, while Terraform provisions the infrastructure. The extra options describe imperative scripting and manual changes, which IaC is meant to replace." },

  { id: "provider-version-fill", d: 2, type: "fill", title: "Resolve provider version constraints",
    prompt: "A new working directory has no .terraform.lock.hcl. The registry offers hashicorp/aws versions 4.67.0, 5.30.0, 5.31.2, 5.46.0 and 6.0.0. For each required_providers constraint, which version will terraform init select?",
    context: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"<CONSTRAINT>\"\n    }\n  }\n}\n\nAvailable: 4.67.0, 5.30.0, 5.31.2, 5.46.0, 6.0.0",
    fields: [
      { label: "version = \"~> 5.31.0\"", answers: ["5.31.2"] },
      { label: "version = \"~> 5.31\"", answers: ["5.46.0", "5.46"] },
      { label: "version = \"~> 4.0\"", answers: ["4.67.0", "4.67"] },
      { label: "version = \">= 5.0, < 5.31\"", answers: ["5.30.0", "5.30"] }
    ],
    explain: "Terraform picks the newest version that satisfies the constraint. The pessimistic operator ~> lets only the rightmost stated component increase: ~> 5.31.0 allows 5.31.x only (5.31.2), while ~> 5.31 allows any 5.x at or above 5.31 (5.46.0) but not 6.0.0. ~> 4.0 allows 4.x, so 4.67.0. A range with >= and < excludes 5.31.2, leaving 5.30.0. Once chosen, the version is recorded in .terraform.lock.hcl and reused until you run terraform init -upgrade." },

  { id: "core-workflow-order", d: 3, type: "order", title: "Order a reviewed Terraform change",
    prompt: "Your team requires that exactly the reviewed changes are applied. Put these steps for a brand-new working directory in the correct order.",
    steps: [
      "Write or edit the .tf configuration",
      "Run terraform init to configure the backend and install providers and modules",
      "Run terraform validate to check syntax and internal consistency",
      "Run terraform plan -out=tfplan to save the proposed changes",
      "Have a teammate review the saved plan output",
      "Run terraform apply tfplan to apply exactly the reviewed plan"
    ],
    explain: "terraform init must come before validate and plan because both need the providers and modules it installs. validate catches errors cheaply before a plan contacts provider APIs. Saving the plan with -out and then running terraform apply tfplan applies exactly what was reviewed, without a new plan or approval prompt. Running plain terraform apply instead would compute a fresh plan that might differ from the reviewed one." },

  { id: "plan-output-select", d: 3, type: "select", title: "Read a terraform plan",
    prompt: "Read the plan output. Select every resource whose existing real-world object will be destroyed if this plan is applied (including as part of a replacement).",
    context: "Terraform will perform the following actions:\n\n  # aws_instance.web must be replaced\n-/+ resource \"aws_instance\" \"web\" {\n      ~ ami           = \"ami-0a1b2c3d\" -> \"ami-0e4f5a6b\" # forces replacement\n      ~ id            = \"i-0123456789abcdef0\" -> (known after apply)\n        instance_type = \"t3.micro\"\n    }\n\n  # aws_security_group.app will be updated in-place\n  ~ resource \"aws_security_group\" \"app\" {\n      ~ description = \"app sg\" -> \"App tier security group\"\n    }\n\n  # aws_s3_bucket.old_logs will be destroyed\n  - resource \"aws_s3_bucket\" \"old_logs\" {\n      - bucket = \"old-logs-example\"\n    }\n\n  # random_pet.name will be created\n  + resource \"random_pet\" \"name\" {\n      + id = (known after apply)\n    }\n\nPlan: 2 to add, 1 to change, 2 to destroy.",
    options: ["aws_instance.web", "aws_security_group.app", "aws_s3_bucket.old_logs", "random_pet.name"],
    answers: [0, 2],
    explain: "-/+ means destroy and then create, so aws_instance.web loses its current instance (the ami change forces replacement); it counts once in 'to add' and once in 'to destroy'. The - symbol destroys aws_s3_bucket.old_logs. The ~ symbol on the security group is an in-place update that keeps the same object, and + only creates random_pet.name. That is why the summary reads 2 to add, 1 to change, 2 to destroy." },

  { id: "cli-flags-match", d: 3, type: "match", title: "Match situations to CLI options",
    prompt: "Match each situation to the terraform plan or apply option that handles it.",
    pairs: [
      ["Recreate one healthy but misbehaving VM on the next apply", "-replace=ADDRESS"],
      ["Update state to match real infrastructure without changing any resources", "-refresh-only"],
      ["Save the proposed changes so CI can apply exactly them later", "-out=FILE"],
      ["Preview everything that terraform destroy would remove", "-destroy"],
      ["Run an apply in a pipeline with no interactive approval prompt", "-auto-approve"],
      ["Focus an emergency fix on a single resource and its dependencies", "-target=ADDRESS"]
    ],
    extra: ["-upgrade", "-migrate-state"],
    explain: "-replace forces a replacement and supersedes the deprecated terraform taint. -refresh-only reconciles state with reality (for drift) without proposing resource changes. -out saves a plan file for terraform apply FILE. plan -destroy previews a destroy. -auto-approve skips the yes prompt, and -target limits the run to specific addresses, which HashiCorp recommends only for exceptional situations. -upgrade and -migrate-state are terraform init options, not plan or apply options." },

  { id: "var-precedence-fill", d: 4, type: "fill", title: "Work out variable precedence",
    prompt: "The same input variable is set in several places. Fill in the value Terraform uses for var.region in each case.",
    context: "# variables.tf\nvariable \"region\" {\n  type    = string\n  default = \"us-east-1\"\n}\n\n# terraform.tfvars\nregion = \"us-west-1\"\n\n# prod.auto.tfvars\nregion = \"eu-west-1\"\n\n# override.tfvars (only loaded when named on the command line)\nregion = \"ca-central-1\"\n\n# shell\n$ export TF_VAR_region=ap-south-1",
    fields: [
      { label: "terraform plan (no flags)", answers: ["eu-west-1"] },
      { label: "terraform plan -var-file=override.tfvars", answers: ["ca-central-1"] },
      { label: "terraform plan after deleting prod.auto.tfvars", answers: ["us-west-1"] },
      { label: "terraform plan after deleting both .tfvars files that load automatically", answers: ["ap-south-1"] }
    ],
    explain: "Terraform loads values from lowest to highest precedence: the variable default, TF_VAR_ environment variables, terraform.tfvars, terraform.tfvars.json, *.auto.tfvars files in lexical order, then -var and -var-file options in the order given. Later sources win. So prod.auto.tfvars beats terraform.tfvars, a -var-file beats both, and the environment variable only wins when no tfvars file sets the value. The default is used only when nothing else does." },

  { id: "lifecycle-match", d: 4, type: "match", title: "Choose the right meta-argument",
    prompt: "Match each requirement to the meta-argument or lifecycle setting that meets it.",
    pairs: [
      ["Fail any plan that would delete the production database", "prevent_destroy"],
      ["Build the new load balancer before removing the old one to avoid downtime", "create_before_destroy"],
      ["Stop Terraform reverting tags that an external cost tool adds", "ignore_changes"],
      ["Recreate an instance whenever a related terraform_data version value changes", "replace_triggered_by"],
      ["Make an app wait for an IAM policy it never references", "depends_on"],
      ["Create one bucket per key of a map so removing a key affects only that bucket", "for_each"]
    ],
    extra: ["count", "provisioner"],
    explain: "prevent_destroy makes any plan that would destroy the resource fail. create_before_destroy reverses the default replace order. ignore_changes tells Terraform to ignore outside edits to the listed attributes. replace_triggered_by replaces the resource when a referenced resource or attribute changes. depends_on declares hidden dependencies that references cannot express. for_each keys instances by map or set keys, while count uses list positions, so removing a middle item with count shifts and changes later instances." },

  { id: "sensitive-select", d: 4, type: "select", title: "Handle a database password safely",
    prompt: "Review the configuration. Select every statement that is true.",
    context: "variable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n\nresource \"aws_db_instance\" \"main\" {\n  identifier = \"app-db\"\n  engine     = \"postgres\"\n  username   = \"appadmin\"\n  password   = var.db_password\n  # ... other arguments ...\n}\n\n# terraform { backend \"s3\" { ... } }",
    options: [
      "Plan and apply output show the password as (sensitive value)",
      "sensitive = true encrypts the password inside the state file",
      "An output that returns var.db_password must also set sensitive = true, or Terraform reports an error",
      "Anyone who can read this workspace's state can still read the password in plain text",
      "Marking the variable sensitive stops it being passed to child modules",
      "Using an ephemeral variable with a write-only argument such as password_wo keeps the password out of plan and state files"
    ],
    answers: [0, 2, 3, 5],
    explain: "sensitive only redacts values in CLI output; the password argument is still written to state as plain JSON, so the state backend must be encrypted and access-controlled. Terraform refuses an output that exposes a sensitive value unless the output is also marked sensitive. Sensitive values can be passed to modules normally. Terraform 1.11+ ephemeral variables and write-only arguments (for example password_wo on supported resources) are never persisted to plan or state, which is the fix for secrets in state." },

  { id: "module-wiring-fill", d: 5, type: "fill", title: "Wire up a child module",
    prompt: "Your root module calls a local child module. Fill in the missing pieces.",
    context: "# ./main.tf (root module)\nmodule \"network\" {\n  source     = \"./modules/network\"\n  cidr_block = \"10.20.0.0/16\"\n}\n\nresource \"aws_instance\" \"web\" {\n  subnet_id = ______           # needs the child's output \"public_subnet_id\"\n  # ...\n}\n\n# ./modules/network/outputs.tf\noutput \"public_subnet_id\" {\n  value = aws_subnet.public.id\n}",
    fields: [
      { label: "Expression for subnet_id", answers: ["module.network.public_subnet_id"] },
      { label: "Command to run after adding a new module block", answers: ["terraform init", "terraform get", "init", "get"] },
      { label: "Directory where Terraform installs module copies", answers: [".terraform/modules", ".terraform/modules/", "./.terraform/modules"] },
      { label: "Module block argument that pins a registry module's version", answers: ["version"] }
    ],
    explain: "Root modules read child values only through outputs, using module.NAME.OUTPUT, so the answer is module.network.public_subnet_id; the child's resources and variables are not directly visible. terraform init (or terraform get) installs modules into .terraform/modules and must be rerun when you add a module block or change its source. Only registry sources accept the version argument; Git sources pin with ?ref= in the URL and local paths have no version." },

  { id: "state-lock-select", d: 6, type: "select", title: "Respond to a state lock error",
    prompt: "A teammate gets this error when running terraform apply. Select every appropriate response.",
    context: "Error: Error acquiring the state lock\n\nError message: operation error DynamoDB: PutItem, ConditionalCheckFailedException\nLock Info:\n  ID:        6f1c2a4e-9b7d-4c1e-8f3a-2d5e7b9c0a11\n  Path:      tfstate-example/prod/terraform.tfstate\n  Operation: OperationTypeApply\n  Who:       ci@runner-07\n  Version:   1.12.2\n  Created:   2026-09-24 22:13:05 UTC\n\nTerraform acquires a state lock to protect the state from being written\nby multiple users at the same time.",
    options: [
      "Check whether the CI apply on runner-07 is still running before doing anything else",
      "If that CI job is still running, wait and retry, optionally with -lock-timeout=10m",
      "If the CI job crashed and nothing is running, run terraform force-unlock 6f1c2a4e-9b7d-4c1e-8f3a-2d5e7b9c0a11",
      "Delete terraform.tfstate from the S3 bucket so a fresh state can be written",
      "Add -lock=false to the team's apply commands so this error never happens again",
      "Switch to the local backend so locks are not needed"
    ],
    answers: [0, 1, 2],
    explain: "The lock shows another apply (from CI) holds the state. First confirm whether it is still running: if so, wait or use -lock-timeout so Terraform retries. Only when the holder has crashed should you run terraform force-unlock with the lock ID. Deleting state loses Terraform's record of every resource, -lock=false removes the protection against corrupting concurrent writes, and switching to local state breaks team sharing without solving anything." },

  { id: "maintain-match", d: 7, type: "match", title: "Pick the maintenance tool",
    prompt: "Match each maintenance task to the Terraform block or command that does it.",
    pairs: [
      ["Bring a VM created by hand under management through plan and apply", "import block"],
      ["Write HCL for resources you are importing", "terraform plan -generate-config-out=FILE"],
      ["Rename aws_instance.app to aws_instance.api without recreating it", "moved block"],
      ["Stop managing a bucket but leave it running in the cloud", "removed block"],
      ["See every resource address tracked in state", "terraform state list"],
      ["Capture detailed provider API calls for a bug report", "TF_LOG=TRACE"]
    ],
    extra: ["terraform taint", "terraform refresh"],
    explain: "import blocks import existing objects as part of a normal, reviewable plan, and plan -generate-config-out writes starter configuration for them. A moved block records an address change so the plan shows a move instead of destroy-and-create. A removed block (with lifecycle destroy = false) drops a resource from state while the real object remains. terraform state list prints addresses, and TF_LOG=TRACE is the most verbose logging level. terraform taint is deprecated in favor of -replace, and terraform refresh is replaced by -refresh-only." },

  { id: "hcp-features-match", d: 8, type: "match", title: "Match HCP Terraform features",
    prompt: "Your organization is moving to HCP Terraform. Match each requirement to the feature that provides it.",
    pairs: [
      ["Speculative plans on pull requests and applies on merge", "VCS-driven workflow"],
      ["Share the same cloud credentials with 40 workspaces", "Variable set"],
      ["Give the payments team access to all of its workspaces at once", "Project"],
      ["Block applies that create untagged or public storage", "Sentinel or OPA policy"],
      ["Get alerted when real infrastructure drifts from state", "Health assessments"],
      ["Short-lived cloud credentials issued per run through OIDC", "Dynamic provider credentials"]
    ],
    extra: ["CLI workspace", "Local backend"],
    explain: "VCS-driven workspaces run speculative plans on pull requests and applies after merge. Variable sets share variables across many workspaces or whole projects. Projects group workspaces for team access. Sentinel and OPA policies enforce policy as code between plan and apply. Health assessments provide drift detection and continuous validation. Dynamic provider credentials use workload identity (OIDC) instead of stored static keys. CLI workspaces and the local backend are open-source features that provide none of these." }
]);
