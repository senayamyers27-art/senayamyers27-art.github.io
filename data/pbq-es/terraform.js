/* Spanish translation of the Terraform Associate exam simulations. Same ids and structure as data/pbq/terraform.js. */
CertHub.addPbqs("terraform", [
  { id: "iac-concepts-match", d: 1, type: "match", title: "Relaciona los conceptos de IaC con sus descripciones",
    prompt: "Un nuevo integrante del equipo está leyendo las guías de IaC de tu equipo. Relaciona cada concepto con la afirmación que MEJOR lo describe.",
    pairs: [
      ["Configuración declarativa", "Describes el estado final deseado y la herramienta calcula los pasos"],
      ["Idempotencia", "Volver a ejecutar apply sin cambios en el código ni en la infraestructura no cambia nada"],
      ["Infraestructura inmutable", "Los servidores se reemplazan por otros nuevos en lugar de parcharse en el lugar"],
      ["Modelo de plugins de providers", "Un solo lenguaje y flujo de trabajo administra muchas plataformas mediante plugins de API"],
      ["Herramienta de gestión de configuración", "Instala y configura software dentro de servidores que ya existen"],
      ["IaC bajo control de versiones", "Cada cambio de infraestructura tiene un historial revisable y se puede revertir"]
    ],
    extra: ["Enumeras cada comando que se debe ejecutar en orden y la herramienta los ejecuta exactamente así", "Los cambios se hacen a mano en la consola de la nube y se documentan después"],
    explain: "Terraform es declarativo: escribes el estado final y calcula un plan, y por eso también es idempotente (un segundo apply no encuentra nada que cambiar). La infraestructura inmutable reemplaza en lugar de parchar. Los providers son plugins que traducen un único flujo de trabajo en HCL a llamadas de API para AWS, Azure, DNS, GitHub y más. Herramientas como Ansible se enfocan en configurar software dentro de las máquinas, mientras que Terraform aprovisiona la infraestructura. Las opciones sobrantes describen scripts imperativos y cambios manuales, justo lo que IaC busca reemplazar." },

  { id: "provider-version-fill", d: 2, type: "fill", title: "Resuelve las restricciones de versión del provider",
    prompt: "Un nuevo directorio de trabajo no tiene .terraform.lock.hcl. El registry ofrece las versiones 4.67.0, 5.30.0, 5.31.2, 5.46.0 y 6.0.0 de hashicorp/aws. Para cada restricción de required_providers, ¿qué versión seleccionará terraform init?",
    context: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"<CONSTRAINT>\"\n    }\n  }\n}\n\nDisponibles: 4.67.0, 5.30.0, 5.31.2, 5.46.0, 6.0.0",
    fields: [
      { label: "version = \"~> 5.31.0\"", answers: ["5.31.2"] },
      { label: "version = \"~> 5.31\"", answers: ["5.46.0", "5.46"] },
      { label: "version = \"~> 4.0\"", answers: ["4.67.0", "4.67"] },
      { label: "version = \">= 5.0, < 5.31\"", answers: ["5.30.0", "5.30"] }
    ],
    explain: "Terraform elige la versión más reciente que cumple la restricción. El operador pesimista ~> solo permite que aumente el componente indicado más a la derecha: ~> 5.31.0 permite únicamente 5.31.x (5.31.2), mientras que ~> 5.31 permite cualquier 5.x igual o mayor que 5.31 (5.46.0), pero no 6.0.0. ~> 4.0 permite 4.x, así que queda 4.67.0. Un rango con >= y < excluye 5.31.2, lo que deja 5.30.0. Una vez elegida, la versión se registra en .terraform.lock.hcl y se reutiliza hasta que ejecutes terraform init -upgrade." },

  { id: "core-workflow-order", d: 3, type: "order", title: "Ordena un cambio de Terraform revisado",
    prompt: "Tu equipo exige que se apliquen exactamente los cambios revisados. Pon en el orden correcto estos pasos para un directorio de trabajo completamente nuevo.",
    steps: [
      "Escribir o editar la configuración .tf",
      "Ejecutar terraform init para configurar el backend e instalar providers y módulos",
      "Ejecutar terraform validate para revisar la sintaxis y la consistencia interna",
      "Ejecutar terraform plan -out=tfplan para guardar los cambios propuestos",
      "Pedir a un compañero que revise la salida del plan guardado",
      "Ejecutar terraform apply tfplan para aplicar exactamente el plan revisado"
    ],
    explain: "terraform init debe ir antes de validate y plan porque ambos necesitan los providers y módulos que instala. validate detecta errores a bajo costo antes de que un plan contacte las API de los providers. Guardar el plan con -out y luego ejecutar terraform apply tfplan aplica exactamente lo que se revisó, sin un plan nuevo ni solicitud de aprobación. Ejecutar solo terraform apply calcularía un plan nuevo que podría ser distinto del revisado." },

  { id: "plan-output-select", d: 3, type: "select", title: "Lee un terraform plan",
    prompt: "Lee la salida del plan. Selecciona todos los recursos cuyo objeto real existente se destruirá si se aplica este plan (incluso como parte de un reemplazo).",
    context: "Terraform will perform the following actions:\n\n  # aws_instance.web must be replaced\n-/+ resource \"aws_instance\" \"web\" {\n      ~ ami           = \"ami-0a1b2c3d\" -> \"ami-0e4f5a6b\" # forces replacement\n      ~ id            = \"i-0123456789abcdef0\" -> (known after apply)\n        instance_type = \"t3.micro\"\n    }\n\n  # aws_security_group.app will be updated in-place\n  ~ resource \"aws_security_group\" \"app\" {\n      ~ description = \"app sg\" -> \"App tier security group\"\n    }\n\n  # aws_s3_bucket.old_logs will be destroyed\n  - resource \"aws_s3_bucket\" \"old_logs\" {\n      - bucket = \"old-logs-example\"\n    }\n\n  # random_pet.name will be created\n  + resource \"random_pet\" \"name\" {\n      + id = (known after apply)\n    }\n\nPlan: 2 to add, 1 to change, 2 to destroy.",
    options: ["aws_instance.web", "aws_security_group.app", "aws_s3_bucket.old_logs", "random_pet.name"],
    answers: [0, 2],
    explain: "-/+ significa destruir y luego crear, así que aws_instance.web pierde su instancia actual (el cambio de ami obliga al reemplazo); cuenta una vez en 'to add' y una vez en 'to destroy'. El símbolo - destruye aws_s3_bucket.old_logs. El símbolo ~ en el security group es una actualización en el lugar que conserva el mismo objeto, y + solo crea random_pet.name. Por eso el resumen dice 2 to add, 1 to change, 2 to destroy." },

  { id: "cli-flags-match", d: 3, type: "match", title: "Relaciona situaciones con opciones de la CLI",
    prompt: "Relaciona cada situación con la opción de terraform plan o apply que la resuelve.",
    pairs: [
      ["Recrear en el próximo apply una VM sana pero que se comporta mal", "-replace=ADDRESS"],
      ["Actualizar el state para que coincida con la infraestructura real sin cambiar ningún recurso", "-refresh-only"],
      ["Guardar los cambios propuestos para que CI aplique exactamente esos más tarde", "-out=FILE"],
      ["Ver por adelantado todo lo que eliminaría terraform destroy", "-destroy"],
      ["Ejecutar un apply en un pipeline sin solicitud interactiva de aprobación", "-auto-approve"],
      ["Enfocar una corrección de emergencia en un solo recurso y sus dependencias", "-target=ADDRESS"]
    ],
    extra: ["-upgrade", "-migrate-state"],
    explain: "-replace fuerza un reemplazo y sustituye al comando obsoleto terraform taint. -refresh-only reconcilia el state con la realidad (en caso de drift) sin proponer cambios a los recursos. -out guarda un archivo de plan para terraform apply FILE. plan -destroy muestra una vista previa de un destroy. -auto-approve omite la confirmación yes, y -target limita la ejecución a direcciones específicas, algo que HashiCorp recomienda solo en situaciones excepcionales. -upgrade y -migrate-state son opciones de terraform init, no de plan ni de apply." },

  { id: "var-precedence-fill", d: 4, type: "fill", title: "Determina la precedencia de variables",
    prompt: "La misma variable de entrada está definida en varios lugares. Escribe el valor que Terraform usa para var.region en cada caso.",
    context: "# variables.tf\nvariable \"region\" {\n  type    = string\n  default = \"us-east-1\"\n}\n\n# terraform.tfvars\nregion = \"us-west-1\"\n\n# prod.auto.tfvars\nregion = \"eu-west-1\"\n\n# override.tfvars (solo se carga cuando se nombra en la línea de comandos)\nregion = \"ca-central-1\"\n\n# shell\n$ export TF_VAR_region=ap-south-1",
    fields: [
      { label: "terraform plan (sin flags)", answers: ["eu-west-1"] },
      { label: "terraform plan -var-file=override.tfvars", answers: ["ca-central-1"] },
      { label: "terraform plan después de borrar prod.auto.tfvars", answers: ["us-west-1"] },
      { label: "terraform plan después de borrar los dos archivos .tfvars que se cargan automáticamente", answers: ["ap-south-1"] }
    ],
    explain: "Terraform carga los valores de menor a mayor precedencia: el default de la variable, las variables de entorno TF_VAR_, terraform.tfvars, terraform.tfvars.json, los archivos *.auto.tfvars en orden léxico y, al final, las opciones -var y -var-file en el orden indicado. Las fuentes posteriores ganan. Así, prod.auto.tfvars le gana a terraform.tfvars, un -var-file les gana a ambos y la variable de entorno solo gana cuando ningún archivo tfvars define el valor. El default se usa únicamente cuando nada más lo define." },

  { id: "lifecycle-match", d: 4, type: "match", title: "Elige el meta-argumento correcto",
    prompt: "Relaciona cada requisito con el meta-argumento o la configuración de lifecycle que lo cumple.",
    pairs: [
      ["Hacer fallar cualquier plan que borraría la base de datos de producción", "prevent_destroy"],
      ["Crear el nuevo balanceador de carga antes de quitar el anterior para evitar tiempo de inactividad", "create_before_destroy"],
      ["Evitar que Terraform revierta las etiquetas que agrega una herramienta externa de costos", "ignore_changes"],
      ["Recrear una instancia cada vez que cambie el valor de versión de un terraform_data relacionado", "replace_triggered_by"],
      ["Hacer que una app espere a una política de IAM a la que nunca hace referencia", "depends_on"],
      ["Crear un bucket por cada clave de un mapa para que quitar una clave afecte solo a ese bucket", "for_each"]
    ],
    extra: ["count", "provisioner"],
    explain: "prevent_destroy hace fallar cualquier plan que destruiría el recurso. create_before_destroy invierte el orden predeterminado del reemplazo. ignore_changes le indica a Terraform que ignore las ediciones externas a los atributos listados. replace_triggered_by reemplaza el recurso cuando cambia un recurso o atributo referenciado. depends_on declara dependencias ocultas que las referencias no pueden expresar. for_each identifica las instancias por las claves de un mapa o set, mientras que count usa posiciones de lista, así que al quitar un elemento intermedio con count se desplazan y cambian las instancias posteriores." },

  { id: "sensitive-select", d: 4, type: "select", title: "Maneja con seguridad la contraseña de una base de datos",
    prompt: "Revisa la configuración. Selecciona todas las afirmaciones verdaderas.",
    context: "variable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n\nresource \"aws_db_instance\" \"main\" {\n  identifier = \"app-db\"\n  engine     = \"postgres\"\n  username   = \"appadmin\"\n  password   = var.db_password\n  # ... other arguments ...\n}\n\n# terraform { backend \"s3\" { ... } }",
    options: [
      "La salida de plan y apply muestra la contraseña como (sensitive value)",
      "sensitive = true cifra la contraseña dentro del archivo de state",
      "Un output que devuelve var.db_password también debe tener sensitive = true, o Terraform reporta un error",
      "Cualquiera que pueda leer el state de este workspace todavía puede leer la contraseña en texto plano",
      "Marcar la variable como sensitive impide que se pase a módulos hijos",
      "Usar una variable ephemeral con un argumento write-only como password_wo mantiene la contraseña fuera de los archivos de plan y de state"
    ],
    answers: [0, 2, 3, 5],
    explain: "sensitive solo oculta valores en la salida de la CLI; el argumento password se sigue escribiendo en el state como JSON en texto plano, así que el backend del state debe estar cifrado y con acceso controlado. Terraform rechaza un output que expone un valor sensitive a menos que el output también esté marcado como sensitive. Los valores sensitive se pueden pasar a módulos con normalidad. Las variables ephemeral y los argumentos write-only de Terraform 1.11+ (por ejemplo password_wo en los recursos compatibles) nunca se guardan en el plan ni en el state, y esa es la solución para los secretos en el state." },

  { id: "module-wiring-fill", d: 5, type: "fill", title: "Conecta un módulo hijo",
    prompt: "Tu módulo raíz llama a un módulo hijo local. Completa las piezas que faltan.",
    context: "# ./main.tf (módulo raíz)\nmodule \"network\" {\n  source     = \"./modules/network\"\n  cidr_block = \"10.20.0.0/16\"\n}\n\nresource \"aws_instance\" \"web\" {\n  subnet_id = ______           # necesita el output \"public_subnet_id\" del hijo\n  # ...\n}\n\n# ./modules/network/outputs.tf\noutput \"public_subnet_id\" {\n  value = aws_subnet.public.id\n}",
    fields: [
      { label: "Expresión para subnet_id", answers: ["module.network.public_subnet_id"] },
      { label: "Comando que debes ejecutar después de agregar un nuevo bloque module", answers: ["terraform init", "terraform get", "init", "get"] },
      { label: "Directorio donde Terraform instala las copias de los módulos", answers: [".terraform/modules", ".terraform/modules/", "./.terraform/modules"] },
      { label: "Argumento del bloque module que fija la versión de un módulo del registry", answers: ["version"] }
    ],
    explain: "Los módulos raíz leen valores del hijo solo a través de outputs, usando module.NAME.OUTPUT, así que la respuesta es module.network.public_subnet_id; los recursos y variables del hijo no son visibles directamente. terraform init (o terraform get) instala los módulos en .terraform/modules y debes volver a ejecutarlo cuando agregas un bloque module o cambias su source. Solo los sources del registry aceptan el argumento version; los sources de Git fijan la versión con ?ref= en la URL y las rutas locales no tienen versión." },

  { id: "state-lock-select", d: 6, type: "select", title: "Responde a un error de bloqueo del state",
    prompt: "Un compañero recibe este error al ejecutar terraform apply. Selecciona todas las respuestas apropiadas.",
    context: "Error: Error acquiring the state lock\n\nError message: operation error DynamoDB: PutItem, ConditionalCheckFailedException\nLock Info:\n  ID:        6f1c2a4e-9b7d-4c1e-8f3a-2d5e7b9c0a11\n  Path:      tfstate-example/prod/terraform.tfstate\n  Operation: OperationTypeApply\n  Who:       ci@runner-07\n  Version:   1.12.2\n  Created:   2026-09-24 22:13:05 UTC\n\nTerraform acquires a state lock to protect the state from being written\nby multiple users at the same time.",
    options: [
      "Verificar si el apply de CI en runner-07 sigue en ejecución antes de hacer cualquier otra cosa",
      "Si ese job de CI sigue en ejecución, esperar y reintentar, opcionalmente con -lock-timeout=10m",
      "Si el job de CI falló y no hay nada en ejecución, ejecutar terraform force-unlock 6f1c2a4e-9b7d-4c1e-8f3a-2d5e7b9c0a11",
      "Borrar terraform.tfstate del bucket de S3 para que se pueda escribir un state nuevo",
      "Agregar -lock=false a los comandos apply del equipo para que este error nunca vuelva a ocurrir",
      "Cambiar al backend local para que no se necesiten bloqueos"
    ],
    answers: [0, 1, 2],
    explain: "El bloqueo muestra que otro apply (de CI) tiene el state. Primero confirma si sigue en ejecución: si es así, espera o usa -lock-timeout para que Terraform reintente. Solo cuando quien tiene el bloqueo falló debes ejecutar terraform force-unlock con el ID del bloqueo. Borrar el state pierde el registro que Terraform tiene de cada recurso, -lock=false elimina la protección contra escrituras concurrentes que corrompen el state, y cambiar al state local rompe el uso compartido en equipo sin resolver nada." },

  { id: "maintain-match", d: 7, type: "match", title: "Elige la herramienta de mantenimiento",
    prompt: "Relaciona cada tarea de mantenimiento con el bloque o comando de Terraform que la realiza.",
    pairs: [
      ["Poner bajo administración, mediante plan y apply, una VM creada a mano", "bloque import"],
      ["Escribir el HCL de los recursos que estás importando", "terraform plan -generate-config-out=FILE"],
      ["Renombrar aws_instance.app a aws_instance.api sin recrearlo", "bloque moved"],
      ["Dejar de administrar un bucket pero mantenerlo funcionando en la nube", "bloque removed"],
      ["Ver todas las direcciones de recursos registradas en el state", "terraform state list"],
      ["Capturar llamadas detalladas a la API del provider para un reporte de bug", "TF_LOG=TRACE"]
    ],
    extra: ["terraform taint", "terraform refresh"],
    explain: "Los bloques import importan objetos existentes como parte de un plan normal y revisable, y plan -generate-config-out escribe una configuración inicial para ellos. Un bloque moved registra un cambio de dirección para que el plan muestre un movimiento en lugar de destruir y crear. Un bloque removed (con lifecycle destroy = false) quita un recurso del state mientras el objeto real se conserva. terraform state list imprime las direcciones, y TF_LOG=TRACE es el nivel de logging más detallado. terraform taint está obsoleto en favor de -replace, y terraform refresh fue reemplazado por -refresh-only." },

  { id: "hcp-features-match", d: 8, type: "match", title: "Relaciona las funciones de HCP Terraform",
    prompt: "Tu organización se está moviendo a HCP Terraform. Relaciona cada requisito con la función que lo proporciona.",
    pairs: [
      ["Plans especulativos en los pull requests y applies al hacer merge", "Flujo de trabajo basado en VCS"],
      ["Compartir las mismas credenciales de nube con 40 workspaces", "Variable set"],
      ["Dar al equipo de pagos acceso a todos sus workspaces a la vez", "Project"],
      ["Bloquear los applies que crean almacenamiento sin etiquetas o público", "Política de Sentinel u OPA"],
      ["Recibir alertas cuando la infraestructura real se desvía del state", "Health assessments"],
      ["Credenciales de nube de corta duración emitidas por cada ejecución mediante OIDC", "Dynamic provider credentials"]
    ],
    extra: ["Workspace de la CLI", "Backend local"],
    explain: "Los workspaces basados en VCS ejecutan plans especulativos en los pull requests y applies después del merge. Los variable sets comparten variables entre muchos workspaces o projects completos. Los projects agrupan workspaces para dar acceso a equipos. Las políticas de Sentinel y OPA aplican políticas como código entre plan y apply. Los health assessments ofrecen detección de drift y validación continua. Las dynamic provider credentials usan identidad de workload (OIDC) en lugar de claves estáticas almacenadas. Los workspaces de la CLI y el backend local son funciones de código abierto que no ofrecen nada de esto." }
]);
