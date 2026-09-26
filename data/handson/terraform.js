/* Hands-on exercises for HashiCorp Certified: Terraform Associate (004). Terraform plan tasks run in
   public/assets/tf.js, a simulated `terraform plan`. Checked by tools/check-data.js. */
CertHub.addHandson("terraform", {
  items: [
    {
      id: "tf-version-pins", kind: "tf", d: 2,
      title: "Pin Terraform and provider versions",
      prompt: "Your team runs Terraform 1.12. This configuration was written years ago and its `required_version` constraint no longer lets anyone plan it.\n\nChange `required_version` so it accepts Terraform 1.12 and any later 1.x release, but never 2.0. Keep the AWS provider pinned to the 6.x series, then run `terraform plan`.",
      hint: "`~> 1.5.0` only allows 1.5.x patch releases. `>= 1.12.0, < 2.0.0` (or `~> 1.12`) allows 1.12 and newer 1.x versions.",
      explain: "The pessimistic constraint operator `~>` allows only the rightmost version part to increase: `~> 1.5.0` means at least 1.5.0 but below 1.6.0, while `~> 1.12` means at least 1.12 but below 2.0. `required_version` guards the Terraform CLI itself, and `required_providers` pins each provider's source and version; `terraform init` records the chosen provider versions in `.terraform.lock.hcl`, which you commit so everyone gets the same builds.",
      starter: "terraform {\n  required_version = \"~> 1.5.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 6.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_s3_bucket\" \"site\" {\n  bucket = \"acme-static-site\"\n}\n",
      solution: "terraform {\n  required_version = \">= 1.12.0, < 2.0.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 6.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_s3_bucket\" \"site\" {\n  bucket = \"acme-static-site\"\n}\n",
      prior: {},
      checks: [
        { label: "The plan runs on Terraform 1.12", type: "ok" },
        { label: "The plan creates `aws_s3_bucket.site`", type: "create", addr: "aws_s3_bucket.site" }
      ]
    },
    {
      id: "tf-first-resource", kind: "tf", d: 4,
      title: "Your first resource and variable",
      prompt: "You are writing your first S3 bucket for the logging team. The plan fails because the `environment` variable has no value.\n\n1. Give `environment` a default of `dev`.\n2. Name the bucket `acme-<environment>-logs` using interpolation, so in dev it becomes `acme-dev-logs`.\n3. Add a `tags` map with `Environment` set from the same variable.",
      hint: "Add `default = \"dev\"` inside the variable block, then use `bucket = \"acme-${var.environment}-logs\"` and `tags = { Environment = var.environment }`.",
      explain: "A variable with no default is required: Terraform stops with \"No value for required variable\" unless you pass it with -var, a .tfvars file or a TF_VAR_ environment variable. Referencing `var.environment` inside a string with `${ }` interpolation keeps names consistent across environments, and the plan shows the final value, plus `(known after apply)` for attributes like `arn` and `id` that only AWS can assign.",
      starter: "variable \"environment\" {\n  type        = string\n  description = \"Deployment environment name\"\n}\n\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket = \"acme-logs\"\n}\n",
      solution: "variable \"environment\" {\n  type        = string\n  description = \"Deployment environment name\"\n  default     = \"dev\"\n}\n\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket = \"acme-${var.environment}-logs\"\n\n  tags = {\n    Environment = var.environment\n  }\n}\n",
      prior: {},
      checks: [
        { label: "The plan creates `aws_s3_bucket.logs`", type: "create", addr: "aws_s3_bucket.logs" },
        { label: "The bucket is named `acme-dev-logs`", type: "attr", addr: "aws_s3_bucket.logs", key: "bucket", equals: "acme-dev-logs" },
        { label: "The bucket has an `Environment` tag of `dev`", type: "attr", addr: "aws_s3_bucket.logs", key: "tags.Environment", equals: "dev" }
      ]
    },
    {
      id: "tf-undeclared-ref", kind: "tf", d: 4,
      title: "Fix undeclared references",
      prompt: "A teammate's configuration won't plan. Run `terraform plan`, read each error, and fix the references so the web server launches into the `app` subnet with the instance type from the variable.\n\nDon't rename the variable or the subnet resource; fix the places that refer to them.",
      hint: "Terraform names the exact line. `var.instance_typ` has a typo, and the subnet resource is called `app`, not `main`: `aws_subnet.app.id`.",
      explain: "Terraform checks every reference against what is declared before it plans anything. \"Reference to undeclared input variable\" and \"Reference to undeclared resource\" both point at the line and often suggest the closest real name. Referring to `aws_subnet.app.id` also creates an implicit dependency, so Terraform creates the subnet before the instance without needing depends_on; the subnet ID shows as `(known after apply)` because AWS assigns it.",
      starter: "variable \"instance_type\" {\n  type    = string\n  default = \"t3.micro\"\n}\n\nresource \"aws_subnet\" \"app\" {\n  vpc_id     = \"vpc-0a1b2c3d4e5f60001\"\n  cidr_block = \"10.0.1.0/24\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = var.instance_typ\n  subnet_id     = aws_subnet.main.id\n}\n",
      solution: "variable \"instance_type\" {\n  type    = string\n  default = \"t3.micro\"\n}\n\nresource \"aws_subnet\" \"app\" {\n  vpc_id     = \"vpc-0a1b2c3d4e5f60001\"\n  cidr_block = \"10.0.1.0/24\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = var.instance_type\n  subnet_id     = aws_subnet.app.id\n}\n",
      prior: {},
      checks: [
        { label: "The plan succeeds", type: "ok" },
        { label: "The plan creates `aws_instance.web`", type: "create", addr: "aws_instance.web" },
        { label: "The instance type comes from the variable (`t3.micro`)", type: "attr", addr: "aws_instance.web", key: "instance_type", equals: "t3.micro" },
        { label: "The plan creates `aws_subnet.app`", type: "create", addr: "aws_subnet.app" }
      ]
    },
    {
      id: "tf-count-to-foreach", kind: "tf", d: 4,
      title: "Switch from count to for_each without rebuilding",
      prompt: "Two servers were built with `count`, so the state holds `aws_instance.web[0]` (app1) and `aws_instance.web[1]` (app2). You want `for_each` instead, so removing one name later doesn't shift the others.\n\n1. Fix the `for_each` error: it needs a set or a map, not a list.\n2. Add `moved` blocks so the existing servers become `aws_instance.web[\"app1\"]` and `aws_instance.web[\"app2\"]` instead of being destroyed and recreated.\n\nThe finished plan should change nothing.",
      hint: "Use `for_each = toset(var.servers)`. Then add `moved { from = aws_instance.web[0]  to = aws_instance.web[\"app1\"] }` (on separate lines) and the same for index 1 and app2.",
      explain: "With count, instances are addressed by position, so removing an item in the middle renumbers everything after it and Terraform replaces those servers. for_each addresses instances by key, which stays stable. for_each accepts only a map or a set of strings, so a list must go through toset(). Changing the address would normally plan a destroy and a create for each server; moved blocks tell Terraform the objects are the same, so the plan shows them as moved with no changes.",
      starter: "variable \"servers\" {\n  type    = list(string)\n  default = [\"app1\", \"app2\"]\n}\n\nresource \"aws_instance\" \"web\" {\n  for_each      = var.servers\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = \"t3.micro\"\n\n  tags = {\n    Name = each.key\n  }\n}\n",
      solution: "variable \"servers\" {\n  type    = list(string)\n  default = [\"app1\", \"app2\"]\n}\n\nresource \"aws_instance\" \"web\" {\n  for_each      = toset(var.servers)\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = \"t3.micro\"\n\n  tags = {\n    Name = each.key\n  }\n}\n\nmoved {\n  from = aws_instance.web[0]\n  to   = aws_instance.web[\"app1\"]\n}\n\nmoved {\n  from = aws_instance.web[1]\n  to   = aws_instance.web[\"app2\"]\n}\n",
      prior: { resources: {
        "aws_instance.web[0]": { id: "i-0aa11bb22cc33dd44", ami: "ami-0a1b2c3d4e5f67890", instance_type: "t3.micro", tags: { Name: "app1" } },
        "aws_instance.web[1]": { id: "i-0ee55ff66aa77bb88", ami: "ami-0a1b2c3d4e5f67890", instance_type: "t3.micro", tags: { Name: "app2" } }
      } },
      checks: [
        { label: "`aws_instance.web[\"app1\"]` is kept with no changes", type: "noop", addr: "aws_instance.web[\"app1\"]" },
        { label: "`aws_instance.web[\"app2\"]` is kept with no changes", type: "noop", addr: "aws_instance.web[\"app2\"]" },
        { label: "Nothing is added, changed or destroyed", type: "counts", add: 0, change: 0, destroy: 0 }
      ]
    },
    {
      id: "tf-sensitive-output", kind: "tf", d: 4,
      title: "Output a sensitive value",
      prompt: "The orders database takes its password from a sensitive variable. Another team needs both the endpoint and the password as outputs, but the plan refuses to run.\n\nRead the error and fix the `db_password` output so Terraform accepts it and hides its value in the plan. Leave `db_endpoint` as a normal output.",
      hint: "Add `sensitive = true` to the `db_password` output block.",
      explain: "Values derived from a sensitive variable stay sensitive, and Terraform won't let a root module output expose them unless the output is also marked `sensitive = true`. The plan and apply output then show `(sensitive value)`. This only hides the value on screen: it is still stored in plain text in the state file, which is why state belongs in an encrypted, access-controlled backend, and `terraform output -raw db_password` can still read it.",
      starter: "variable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n\nresource \"aws_db_instance\" \"main\" {\n  identifier        = \"orders-db\"\n  engine            = \"postgres\"\n  instance_class    = \"db.t3.micro\"\n  allocated_storage = 20\n  username          = \"orders_admin\"\n  password          = var.db_password\n}\n\noutput \"db_endpoint\" {\n  value = aws_db_instance.main.endpoint\n}\n\noutput \"db_password\" {\n  value = aws_db_instance.main.password\n}\n",
      solution: "variable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n\nresource \"aws_db_instance\" \"main\" {\n  identifier        = \"orders-db\"\n  engine            = \"postgres\"\n  instance_class    = \"db.t3.micro\"\n  allocated_storage = 20\n  username          = \"orders_admin\"\n  password          = var.db_password\n}\n\noutput \"db_endpoint\" {\n  value = aws_db_instance.main.endpoint\n}\n\noutput \"db_password\" {\n  value     = aws_db_instance.main.password\n  sensitive = true\n}\n",
      prior: { vars: { db_password: "practice-only-value" } },
      checks: [
        { label: "The plan creates `aws_db_instance.main`", type: "create", addr: "aws_db_instance.main" },
        { label: "The `db_password` output is marked sensitive", type: "output", name: "db_password", sensitive: true },
        { label: "The `db_endpoint` output is still a normal output", type: "output", name: "db_endpoint", sensitive: false }
      ]
    },
    {
      id: "tf-locals-interp", kind: "tf", d: 4,
      title: "Build names and tags with locals",
      prompt: "The artifacts bucket name is hardcoded, so it comes out wrong when the pipeline runs with `-var environment=staging` (this plan uses that value).\n\n1. Build `local.name_prefix` from `var.project` and `var.environment`, joined with a dash.\n2. Add `local.common_tags` with `Project` and `Environment` keys, and use it as the bucket's `tags`.\n\nThe bucket should come out as `orion-staging-artifacts`.",
      hint: "`name_prefix = \"${var.project}-${var.environment}\"` and `common_tags = { Project = var.project, Environment = var.environment }`, then `tags = local.common_tags`.",
      explain: "Locals name an expression once so you can reuse it: a name prefix and a common tag map are the classic examples. Unlike variables, locals can't be set from outside the module, which keeps derived values consistent. Values passed with -var or a .tfvars file override a variable's default, so building names from variables means the same code produces orion-dev, orion-staging and orion-prod without edits.",
      starter: "variable \"project\" {\n  type    = string\n  default = \"orion\"\n}\n\nvariable \"environment\" {\n  type    = string\n  default = \"dev\"\n}\n\nlocals {\n  name_prefix = \"orion-dev\"\n}\n\nresource \"aws_s3_bucket\" \"artifacts\" {\n  bucket = \"${local.name_prefix}-artifacts\"\n}\n\noutput \"bucket_name\" {\n  value = aws_s3_bucket.artifacts.bucket\n}\n",
      solution: "variable \"project\" {\n  type    = string\n  default = \"orion\"\n}\n\nvariable \"environment\" {\n  type    = string\n  default = \"dev\"\n}\n\nlocals {\n  name_prefix = \"${var.project}-${var.environment}\"\n  common_tags = {\n    Project     = var.project\n    Environment = var.environment\n  }\n}\n\nresource \"aws_s3_bucket\" \"artifacts\" {\n  bucket = \"${local.name_prefix}-artifacts\"\n  tags   = local.common_tags\n}\n\noutput \"bucket_name\" {\n  value = aws_s3_bucket.artifacts.bucket\n}\n",
      prior: { vars: { environment: "staging" } },
      checks: [
        { label: "The bucket is named `orion-staging-artifacts`", type: "attr", addr: "aws_s3_bucket.artifacts", key: "bucket", equals: "orion-staging-artifacts" },
        { label: "The bucket has a `Project` tag of `orion`", type: "attr", addr: "aws_s3_bucket.artifacts", key: "tags.Project", equals: "orion" },
        { label: "The bucket has an `Environment` tag of `staging`", type: "attr", addr: "aws_s3_bucket.artifacts", key: "tags.Environment", equals: "staging" },
        { label: "The `bucket_name` output shows the new name", type: "output", name: "bucket_name", equals: "orion-staging-artifacts" }
      ]
    },
    {
      id: "tf-avoid-replace", kind: "tf", d: 3,
      title: "Resize a server without replacing it",
      prompt: "The change request says: resize the app server from `t3.micro` to `t3.large`. Nothing else.\n\nRun `terraform plan` and read it. Someone also changed the AMI, which forces Terraform to destroy and recreate the server. Put the AMI back to the one in the state so the plan becomes a single in-place update.",
      hint: "Look for `# forces replacement` in the plan. The state has `ami-0a1b2c3d4e5f67890`; keep that and only change `instance_type`.",
      explain: "Some arguments can be changed on a live object (update in-place, shown with ~), while others force a new object (shown as -/+ with \"# forces replacement\" on the attribute). For an EC2 instance the instance type can change in place, but a new AMI means a new instance, which loses anything not in the image. Always read the plan before apply: the summary line \"1 to add, 0 to change, 1 to destroy\" is a warning sign when you only expected a change.",
      starter: "resource \"aws_instance\" \"app\" {\n  ami           = \"ami-0f9e8d7c6b5a43210\"\n  instance_type = \"t3.large\"\n\n  tags = {\n    Name = \"app\"\n  }\n}\n",
      solution: "resource \"aws_instance\" \"app\" {\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = \"t3.large\"\n\n  tags = {\n    Name = \"app\"\n  }\n}\n",
      prior: { resources: { "aws_instance.app": { id: "i-0abc1234def567890", ami: "ami-0a1b2c3d4e5f67890", instance_type: "t3.micro", tags: { Name: "app" } } } },
      checks: [
        { label: "`aws_instance.app` is updated in place", type: "update", addr: "aws_instance.app" },
        { label: "The instance type becomes `t3.large`", type: "attr", addr: "aws_instance.app", key: "instance_type", equals: "t3.large" },
        { label: "Plan: 0 to add, 1 to change, 0 to destroy", type: "counts", add: 0, change: 1, destroy: 0 }
      ]
    },
    {
      id: "tf-remove-resource", kind: "tf", d: 3,
      title: "Remove a resource and read the destroy plan",
      prompt: "The `legacy_reports` bucket was replaced long ago and the data has been archived. Remove it from the configuration and run `terraform plan`.\n\nRead the destroy plan carefully: only the legacy bucket should go, and the current `reports` bucket must stay untouched.",
      hint: "Delete the whole `resource \"aws_s3_bucket\" \"legacy_reports\"` block. Terraform destroys anything in state that is no longer in the configuration.",
      explain: "Terraform is declarative: removing a resource block means \"this should not exist\", so the plan destroys it and explains why with \"(because aws_s3_bucket.legacy_reports is not in configuration)\". `terraform destroy` removes everything, which is rarely what you want. If you only want Terraform to stop managing an object without deleting it, use a `removed` block with `destroy = false` or `terraform state rm` instead.",
      starter: "resource \"aws_s3_bucket\" \"reports\" {\n  bucket = \"acme-reports\"\n}\n\nresource \"aws_s3_bucket\" \"legacy_reports\" {\n  bucket = \"acme-reports-2019\"\n}\n",
      solution: "resource \"aws_s3_bucket\" \"reports\" {\n  bucket = \"acme-reports\"\n}\n",
      prior: { resources: {
        "aws_s3_bucket.reports": { id: "acme-reports", bucket: "acme-reports", arn: "arn:aws:s3:::acme-reports" },
        "aws_s3_bucket.legacy_reports": { id: "acme-reports-2019", bucket: "acme-reports-2019", arn: "arn:aws:s3:::acme-reports-2019" }
      } },
      checks: [
        { label: "`aws_s3_bucket.legacy_reports` will be destroyed", type: "destroy", addr: "aws_s3_bucket.legacy_reports" },
        { label: "`aws_s3_bucket.reports` has no changes", type: "noop", addr: "aws_s3_bucket.reports" },
        { label: "Plan: 0 to add, 0 to change, 1 to destroy", type: "counts", add: 0, change: 0, destroy: 1 }
      ]
    },
    {
      id: "tf-module-call", kind: "tf", d: 5,
      title: "Call a local module",
      prompt: "The platform team wrote a network module in `./modules/network`. Its interface:\n\nInputs: `cidr_block` (required) and `name` (optional, default `main`). Outputs: `vpc_id` and `public_subnet_id`.\n\nCall it as `module \"network\"` with `cidr_block = \"10.20.0.0/16\"` and `name = \"prod\"`, and fix the root output so it returns the module's VPC ID.",
      hint: "Pass inputs as arguments in the module block. Module outputs are read as `module.<name>.<output>`, so use `module.network.vpc_id`.",
      explain: "A module call passes values to the child module's input variables as arguments; a required input without a value is an error. The child's resources get addresses like `module.network.aws_vpc.this`, and the root module can read only what the child exposes through output blocks, as `module.network.vpc_id`. For registry modules you'd also set `version`; local paths are always read from disk, so they can't take a version constraint.",
      starter: "module \"network\" {\n  source = \"./modules/network\"\n}\n\noutput \"vpc_id\" {\n  value = module.network.id\n}\n",
      solution: "module \"network\" {\n  source     = \"./modules/network\"\n  cidr_block = \"10.20.0.0/16\"\n  name       = \"prod\"\n}\n\noutput \"vpc_id\" {\n  value = module.network.vpc_id\n}\n",
      prior: { modules: { "./modules/network": {
        variables: { cidr_block: { required: true }, name: { default: "main" } },
        resources: { "aws_vpc.this": { cidr_block: "var.cidr_block" }, "aws_subnet.public": { cidr_block: "10.20.1.0/24" } },
        outputs: { vpc_id: null, public_subnet_id: null }
      } } },
      checks: [
        { label: "The plan creates `module.network.aws_vpc.this`", type: "create", addr: "module.network.aws_vpc.this" },
        { label: "The VPC uses `10.20.0.0/16`", type: "attr", addr: "module.network.aws_vpc.this", key: "cidr_block", equals: "10.20.0.0/16" },
        { label: "The root module has a `vpc_id` output", type: "output", name: "vpc_id" }
      ]
    },
    {
      id: "tf-rename-moved", kind: "tf", d: 6,
      title: "Rename a resource without destroying it",
      prompt: "The invoices bucket was first written as `aws_s3_bucket.bucket`, a name nobody understands. It has been renamed to `aws_s3_bucket.invoices` in the code, and now the plan wants to destroy the bucket and create a new one.\n\nAdd a `moved` block so Terraform updates the address in state and changes nothing in AWS.",
      hint: "`moved { from = aws_s3_bucket.bucket  to = aws_s3_bucket.invoices }`, with from and to on separate lines.",
      explain: "Terraform tracks objects by address in the state file, so renaming a block looks like deleting one object and creating another; for a bucket that would also fail or lose data. A moved block records the rename in code, so everyone who runs the configuration gets the same state update and the plan shows \"has moved to\" with no changes. The older `terraform state mv` command does the same thing, but only for the state it's run against and without a record in version control.",
      starter: "resource \"aws_s3_bucket\" \"invoices\" {\n  bucket = \"acme-invoices\"\n}\n",
      solution: "resource \"aws_s3_bucket\" \"invoices\" {\n  bucket = \"acme-invoices\"\n}\n\nmoved {\n  from = aws_s3_bucket.bucket\n  to   = aws_s3_bucket.invoices\n}\n",
      prior: { resources: { "aws_s3_bucket.bucket": { id: "acme-invoices", bucket: "acme-invoices", arn: "arn:aws:s3:::acme-invoices" } } },
      checks: [
        { label: "The state entry moves from `aws_s3_bucket.bucket` to `aws_s3_bucket.invoices`", type: "moved", from: "aws_s3_bucket.bucket", to: "aws_s3_bucket.invoices" },
        { label: "`aws_s3_bucket.invoices` has no changes", type: "noop", addr: "aws_s3_bucket.invoices" },
        { label: "Nothing is added, changed or destroyed", type: "counts", add: 0, change: 0, destroy: 0 }
      ]
    },
    {
      id: "tf-prevent-destroy", kind: "tf", d: 7,
      title: "Work with prevent_destroy",
      prompt: "The bucket that holds production Terraform state is protected with `prevent_destroy`. A teammate tried to add a `Team` tag and also \"tidied up\" the bucket name, and now the plan fails.\n\nRead the error. Keep the protection in place, restore the original bucket name from the state, and keep the new `Team = \"cloud-infra\"` tag.",
      hint: "Renaming an S3 bucket forces replacement, which means a destroy. The name in state is `acme-tfstate-prod`.",
      explain: "`prevent_destroy = true` makes Terraform reject any plan that would destroy the object, including a replacement caused by changing an argument like the bucket name. It's a safety net for things like state buckets and databases, not a security control: removing the whole resource block also removes the lifecycle setting, and then Terraform will plan the destroy. Here only the tags change, so the plan is a safe in-place update.",
      starter: "resource \"aws_s3_bucket\" \"state\" {\n  bucket = \"acme-terraform-state-prod\"\n\n  tags = {\n    Owner = \"platform\"\n    Team  = \"cloud-infra\"\n  }\n\n  lifecycle {\n    prevent_destroy = true\n  }\n}\n",
      solution: "resource \"aws_s3_bucket\" \"state\" {\n  bucket = \"acme-tfstate-prod\"\n\n  tags = {\n    Owner = \"platform\"\n    Team  = \"cloud-infra\"\n  }\n\n  lifecycle {\n    prevent_destroy = true\n  }\n}\n",
      prior: { resources: { "aws_s3_bucket.state": { id: "acme-tfstate-prod", bucket: "acme-tfstate-prod", arn: "arn:aws:s3:::acme-tfstate-prod", tags: { Owner: "platform" } } } },
      checks: [
        { label: "`aws_s3_bucket.state` is updated in place", type: "update", addr: "aws_s3_bucket.state" },
        { label: "The bucket gets `Team = cloud-infra`", type: "attr", addr: "aws_s3_bucket.state", key: "tags.Team", equals: "cloud-infra" },
        { label: "Nothing is destroyed", type: "counts", destroy: 0 }
      ]
    },
    {
      id: "tf-ignore-tags", kind: "tf", d: 7,
      title: "Ignore tag changes made outside Terraform",
      prompt: "Finance runs a tool that adds a `CostCenter` tag to every server. Each time you plan, Terraform wants to remove it again, and the two keep fighting.\n\nAdd a `lifecycle` block to `aws_instance.app` so Terraform ignores changes to `tags`. The plan should then report no changes.",
      hint: "Inside the resource: `lifecycle { ignore_changes = [tags] }`, written over three lines.",
      explain: "Drift is when real infrastructure no longer matches the configuration; normally Terraform proposes to put it back. `ignore_changes` tells Terraform to leave the listed arguments alone after creation, which suits values managed by another process, like tags added by a cost tool or an autoscaler's desired count. Use it narrowly: ignored arguments won't be corrected even if someone changes them by mistake.",
      starter: "resource \"aws_instance\" \"app\" {\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = \"t3.micro\"\n\n  tags = {\n    Name = \"app\"\n  }\n}\n",
      solution: "resource \"aws_instance\" \"app\" {\n  ami           = \"ami-0a1b2c3d4e5f67890\"\n  instance_type = \"t3.micro\"\n\n  tags = {\n    Name = \"app\"\n  }\n\n  lifecycle {\n    ignore_changes = [tags]\n  }\n}\n",
      prior: { resources: { "aws_instance.app": { id: "i-0abc1234def567890", ami: "ami-0a1b2c3d4e5f67890", instance_type: "t3.micro", tags: { Name: "app", CostCenter: "cc-4410" } } } },
      checks: [
        { label: "`aws_instance.app` has no changes", type: "noop", addr: "aws_instance.app" },
        { label: "Nothing is added, changed or destroyed", type: "counts", add: 0, change: 0, destroy: 0 }
      ]
    }
  ]
});
