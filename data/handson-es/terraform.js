/* Spanish text for the HashiCorp Terraform Associate hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/terraform.js. */
CertHub.addHandsonEs("terraform", {
  "tf-version-pins": {
    title: "Fija las versiones de Terraform y de los providers",
    prompt: "Tu equipo usa Terraform 1.12. Esta configuración se escribió hace años y su restricción `required_version` ya no le permite a nadie hacer plan.\n\nCambia `required_version` para que acepte Terraform 1.12 y cualquier versión 1.x posterior, pero nunca 2.0. Mantén el provider de AWS fijado a la serie 6.x y luego ejecuta `terraform plan`.",
    hint: "`~> 1.5.0` solo permite versiones de parche 1.5.x. `>= 1.12.0, < 2.0.0` (o `~> 1.12`) permite 1.12 y las versiones 1.x más nuevas.",
    explain: "El operador de restricción pesimista `~>` solo permite que aumente la parte de la versión que está más a la derecha: `~> 1.5.0` significa al menos 1.5.0 pero menor que 1.6.0, mientras que `~> 1.12` significa al menos 1.12 pero menor que 2.0. `required_version` protege el propio CLI de Terraform, y `required_providers` fija el source y la versión de cada provider; `terraform init` registra las versiones de provider elegidas en `.terraform.lock.hcl`, que debes subir al repositorio para que todos obtengan las mismas compilaciones.",
    labels: ["El plan se ejecuta en Terraform 1.12", "El plan crea `aws_s3_bucket.site`"]
  },
  "tf-first-resource": {
    title: "Tu primer recurso y tu primera variable",
    prompt: "Estás escribiendo tu primer bucket de S3 para el equipo de logging. El plan falla porque la variable `environment` no tiene valor.\n\n1. Dale a `environment` un valor por defecto de `dev`.\n2. Nombra el bucket `acme-<environment>-logs` usando interpolación, para que en dev quede como `acme-dev-logs`.\n3. Agrega un mapa `tags` con `Environment` tomado de la misma variable.",
    hint: "Agrega `default = \"dev\"` dentro del bloque de la variable y luego usa `bucket = \"acme-${var.environment}-logs\"` y `tags = { Environment = var.environment }`.",
    explain: "Una variable sin valor por defecto es obligatoria: Terraform se detiene con \"No value for required variable\" a menos que se la pases con -var, con un archivo .tfvars o con una variable de entorno TF_VAR_. Hacer referencia a `var.environment` dentro de un string con interpolación `${ }` mantiene los nombres consistentes entre entornos, y el plan muestra el valor final, además de `(known after apply)` para atributos como `arn` e `id` que solo AWS puede asignar.",
    labels: ["El plan crea `aws_s3_bucket.logs`", "El bucket se llama `acme-dev-logs`", "El bucket tiene una etiqueta `Environment` con valor `dev`"]
  },
  "tf-undeclared-ref": {
    title: "Corrige referencias no declaradas",
    prompt: "La configuración de un compañero no pasa el plan. Ejecuta `terraform plan`, lee cada error y corrige las referencias para que el servidor web se lance en la subred `app` con el tipo de instancia de la variable.\n\nNo cambies el nombre de la variable ni del recurso de la subred; corrige los lugares que hacen referencia a ellos.",
    hint: "Terraform indica la línea exacta. `var.instance_typ` tiene un error de escritura, y el recurso de la subred se llama `app`, no `main`: `aws_subnet.app.id`.",
    explain: "Terraform revisa cada referencia contra lo que está declarado antes de planificar cualquier cosa. \"Reference to undeclared input variable\" y \"Reference to undeclared resource\" apuntan a la línea y a menudo sugieren el nombre real más parecido. Hacer referencia a `aws_subnet.app.id` también crea una dependencia implícita, así que Terraform crea la subred antes que la instancia sin necesidad de depends_on; el ID de la subred aparece como `(known after apply)` porque lo asigna AWS.",
    labels: ["El plan se ejecuta con éxito", "El plan crea `aws_instance.web`", "El tipo de instancia viene de la variable (`t3.micro`)", "El plan crea `aws_subnet.app`"]
  },
  "tf-count-to-foreach": {
    title: "Cambia de count a for_each sin reconstruir",
    prompt: "Se construyeron dos servidores con `count`, así que el state contiene `aws_instance.web[0]` (app1) y `aws_instance.web[1]` (app2). Quieres usar `for_each` en su lugar, para que al quitar un nombre más adelante los demás no se desplacen.\n\n1. Corrige el error de `for_each`: necesita un set o un map, no una lista.\n2. Agrega bloques `moved` para que los servidores existentes pasen a ser `aws_instance.web[\"app1\"]` y `aws_instance.web[\"app2\"]` en lugar de destruirse y volver a crearse.\n\nEl plan final no debe cambiar nada.",
    hint: "Usa `for_each = toset(var.servers)`. Luego agrega `moved { from = aws_instance.web[0]  to = aws_instance.web[\"app1\"] }` (en líneas separadas) y lo mismo para el índice 1 y app2.",
    explain: "Con count, las instancias se identifican por posición, así que quitar un elemento del medio renumera todo lo que viene después y Terraform reemplaza esos servidores. for_each identifica las instancias por clave, que se mantiene estable. for_each solo acepta un map o un set de strings, así que una lista debe pasar por toset(). Cambiar la dirección normalmente planificaría un destroy y un create por cada servidor; los bloques moved le dicen a Terraform que los objetos son los mismos, así que el plan los muestra como movidos y sin cambios.",
    labels: ["`aws_instance.web[\"app1\"]` se conserva sin cambios", "`aws_instance.web[\"app2\"]` se conserva sin cambios", "No se agrega, cambia ni destruye nada"]
  },
  "tf-sensitive-output": {
    title: "Exporta un valor sensible como output",
    prompt: "La base de datos de pedidos toma su contraseña de una variable sensible. Otro equipo necesita tanto el endpoint como la contraseña como outputs, pero el plan se niega a ejecutarse.\n\nLee el error y corrige el output `db_password` para que Terraform lo acepte y oculte su valor en el plan. Deja `db_endpoint` como un output normal.",
    hint: "Agrega `sensitive = true` al bloque del output `db_password`.",
    explain: "Los valores derivados de una variable sensible siguen siendo sensibles, y Terraform no permite que un output del módulo raíz los exponga a menos que el output también esté marcado con `sensitive = true`. Entonces la salida de plan y apply muestra `(sensitive value)`. Esto solo oculta el valor en pantalla: sigue guardándose en texto plano en el archivo de state, por eso el state debe estar en un backend cifrado y con control de acceso, y `terraform output -raw db_password` todavía puede leerlo.",
    labels: ["El plan crea `aws_db_instance.main`", "El output `db_password` está marcado como sensible", "El output `db_endpoint` sigue siendo un output normal"]
  },
  "tf-locals-interp": {
    title: "Construye nombres y etiquetas con locals",
    prompt: "El nombre del bucket de artefactos está escrito a mano, así que sale mal cuando el pipeline se ejecuta con `-var environment=staging` (este plan usa ese valor).\n\n1. Construye `local.name_prefix` a partir de `var.project` y `var.environment`, unidos con un guion.\n2. Agrega `local.common_tags` con las claves `Project` y `Environment`, y úsalo como los `tags` del bucket.\n\nEl bucket debe quedar como `orion-staging-artifacts`.",
    hint: "`name_prefix = \"${var.project}-${var.environment}\"` y `common_tags = { Project = var.project, Environment = var.environment }`, y luego `tags = local.common_tags`.",
    explain: "Los locals le ponen nombre a una expresión una sola vez para que puedas reutilizarla: un prefijo de nombre y un mapa de etiquetas comunes son los ejemplos clásicos. A diferencia de las variables, los locals no se pueden asignar desde fuera del módulo, lo que mantiene consistentes los valores derivados. Los valores pasados con -var o con un archivo .tfvars reemplazan el valor por defecto de una variable, así que construir los nombres a partir de variables significa que el mismo código produce orion-dev, orion-staging y orion-prod sin modificaciones.",
    labels: ["El bucket se llama `orion-staging-artifacts`", "El bucket tiene una etiqueta `Project` con valor `orion`", "El bucket tiene una etiqueta `Environment` con valor `staging`", "El output `bucket_name` muestra el nuevo nombre"]
  },
  "tf-avoid-replace": {
    title: "Cambia el tamaño de un servidor sin reemplazarlo",
    prompt: "La solicitud de cambio dice: cambiar el tamaño del servidor de la aplicación de `t3.micro` a `t3.large`. Nada más.\n\nEjecuta `terraform plan` y léelo. Alguien también cambió la AMI, lo que obliga a Terraform a destruir y volver a crear el servidor. Regresa la AMI a la que está en el state para que el plan quede como una sola actualización en el lugar.",
    hint: "Busca `# forces replacement` en el plan. El state tiene `ami-0a1b2c3d4e5f67890`; consérvala y cambia solo `instance_type`.",
    explain: "Algunos argumentos se pueden cambiar en un objeto existente (actualización en el lugar, marcada con ~), mientras que otros obligan a crear un objeto nuevo (marcado como -/+ con \"# forces replacement\" en el atributo). En una instancia EC2, el tipo de instancia se puede cambiar en el lugar, pero una AMI nueva significa una instancia nueva, que pierde todo lo que no esté en la imagen. Lee siempre el plan antes de apply: la línea de resumen \"1 to add, 0 to change, 1 to destroy\" es una señal de alerta cuando solo esperabas un cambio.",
    labels: ["`aws_instance.app` se actualiza en el lugar", "El tipo de instancia pasa a ser `t3.large`", "Plan: 0 to add, 1 to change, 0 to destroy"]
  },
  "tf-remove-resource": {
    title: "Elimina un recurso y lee el plan de destrucción",
    prompt: "El bucket `legacy_reports` se reemplazó hace mucho y sus datos ya se archivaron. Quítalo de la configuración y ejecuta `terraform plan`.\n\nLee con cuidado el plan de destrucción: solo debe irse el bucket heredado, y el bucket actual `reports` debe quedar intacto.",
    hint: "Borra todo el bloque `resource \"aws_s3_bucket\" \"legacy_reports\"`. Terraform destruye todo lo que está en el state y ya no está en la configuración.",
    explain: "Terraform es declarativo: quitar un bloque resource significa \"esto no debería existir\", así que el plan lo destruye y explica por qué con \"(because aws_s3_bucket.legacy_reports is not in configuration)\". `terraform destroy` elimina todo, lo cual rara vez es lo que quieres. Si solo quieres que Terraform deje de administrar un objeto sin borrarlo, usa en su lugar un bloque `removed` con `destroy = false` o `terraform state rm`.",
    labels: ["`aws_s3_bucket.legacy_reports` será destruido", "`aws_s3_bucket.reports` no tiene cambios", "Plan: 0 to add, 0 to change, 1 to destroy"]
  },
  "tf-module-call": {
    title: "Llama a un módulo local",
    prompt: "El equipo de plataforma escribió un módulo de red en `./modules/network`. Su interfaz:\n\nEntradas: `cidr_block` (obligatoria) y `name` (opcional, por defecto `main`). Salidas: `vpc_id` y `public_subnet_id`.\n\nLlámalo como `module \"network\"` con `cidr_block = \"10.20.0.0/16\"` y `name = \"prod\"`, y corrige el output raíz para que devuelva el ID de la VPC del módulo.",
    hint: "Pasa las entradas como argumentos en el bloque module. Los outputs de un módulo se leen como `module.<name>.<output>`, así que usa `module.network.vpc_id`.",
    explain: "Una llamada a un módulo pasa valores a las variables de entrada del módulo hijo como argumentos; una entrada obligatoria sin valor es un error. Los recursos del hijo reciben direcciones como `module.network.aws_vpc.this`, y el módulo raíz solo puede leer lo que el hijo expone mediante bloques output, como `module.network.vpc_id`. Para los módulos del registry también configurarías `version`; las rutas locales siempre se leen del disco, así que no aceptan una restricción de versión.",
    labels: ["El plan crea `module.network.aws_vpc.this`", "La VPC usa `10.20.0.0/16`", "El módulo raíz tiene un output `vpc_id`"]
  },
  "tf-rename-moved": {
    title: "Cambia el nombre de un recurso sin destruirlo",
    prompt: "El bucket de facturas se escribió primero como `aws_s3_bucket.bucket`, un nombre que nadie entiende. En el código se renombró a `aws_s3_bucket.invoices`, y ahora el plan quiere destruir el bucket y crear uno nuevo.\n\nAgrega un bloque `moved` para que Terraform actualice la dirección en el state y no cambie nada en AWS.",
    hint: "`moved { from = aws_s3_bucket.bucket  to = aws_s3_bucket.invoices }`, con from y to en líneas separadas.",
    explain: "Terraform rastrea los objetos por dirección en el archivo de state, así que renombrar un bloque parece eliminar un objeto y crear otro; en un bucket, eso además fallaría o perdería datos. Un bloque moved registra el cambio de nombre en el código, así que todos los que ejecutan la configuración obtienen la misma actualización del state y el plan muestra \"has moved to\" sin cambios. El comando más antiguo `terraform state mv` hace lo mismo, pero solo para el state contra el que se ejecuta y sin dejar registro en el control de versiones.",
    labels: ["La entrada del state se mueve de `aws_s3_bucket.bucket` a `aws_s3_bucket.invoices`", "`aws_s3_bucket.invoices` no tiene cambios", "No se agrega, cambia ni destruye nada"]
  },
  "tf-prevent-destroy": {
    title: "Trabaja con prevent_destroy",
    prompt: "El bucket que guarda el state de Terraform de producción está protegido con `prevent_destroy`. Un compañero intentó agregar una etiqueta `Team` y de paso \"ordenó\" el nombre del bucket, y ahora el plan falla.\n\nLee el error. Mantén la protección, restaura el nombre original del bucket desde el state y conserva la nueva etiqueta `Team = \"cloud-infra\"`.",
    hint: "Renombrar un bucket de S3 obliga a reemplazarlo, lo que implica un destroy. El nombre en el state es `acme-tfstate-prod`.",
    explain: "`prevent_destroy = true` hace que Terraform rechace cualquier plan que destruya el objeto, incluido un reemplazo causado por cambiar un argumento como el nombre del bucket. Es una red de seguridad para cosas como los buckets de state y las bases de datos, no un control de seguridad: quitar todo el bloque resource también quita la configuración de lifecycle, y entonces Terraform planificará el destroy. Aquí solo cambian las etiquetas, así que el plan es una actualización segura en el lugar.",
    labels: ["`aws_s3_bucket.state` se actualiza en el lugar", "El bucket recibe `Team = cloud-infra`", "No se destruye nada"]
  },
  "tf-ignore-tags": {
    title: "Ignora los cambios de etiquetas hechos fuera de Terraform",
    prompt: "Finanzas usa una herramienta que agrega una etiqueta `CostCenter` a cada servidor. Cada vez que haces plan, Terraform quiere quitarla de nuevo, y los dos siguen peleando.\n\nAgrega un bloque `lifecycle` a `aws_instance.app` para que Terraform ignore los cambios en `tags`. Entonces el plan debería reportar que no hay cambios.",
    hint: "Dentro del recurso: `lifecycle { ignore_changes = [tags] }`, escrito en tres líneas.",
    explain: "El drift ocurre cuando la infraestructura real ya no coincide con la configuración; normalmente Terraform propone regresarla a como estaba. `ignore_changes` le dice a Terraform que no toque los argumentos listados después de la creación, lo que sirve para valores que administra otro proceso, como las etiquetas que agrega una herramienta de costos o el desired count de un autoscaler. Úsalo de forma limitada: los argumentos ignorados no se corregirán aunque alguien los cambie por error.",
    labels: ["`aws_instance.app` no tiene cambios", "No se agrega, cambia ni destruye nada"]
  }
});
