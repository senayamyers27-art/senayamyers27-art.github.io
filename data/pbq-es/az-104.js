/* Spanish translation of the AZ-104 exam simulations. Same ids and structure as data/pbq/az-104.js. */
CertHub.addPbqs("az-104", [
  { id: "rbac-role-match", d: 1, type: "match", title: "Relaciona requisitos con roles integrados de Azure",
    prompt: "Cada requisito describe lo que una persona debe poder hacer, siguiendo el principio de mínimo privilegio. Relaciona cada requisito con el rol integrado que deberías asignar.",
    pairs: [
      ["Crear y administrar todos los recursos de RG-Web, pero nunca conceder acceso a nadie más", "Contributor"],
      ["Administrar las asignaciones de roles en la suscripción sin crear ni cambiar recursos", "User Access Administrator"],
      ["Leer el contenido de los blobs de una cuenta de almacenamiento con inicio de sesión de Entra ID, sin administrar la cuenta", "Storage Blob Data Reader"],
      ["Crear, cambiar de tamaño y reiniciar VM, pero sin administrar la red virtual ni las cuentas de almacenamiento que usan", "Virtual Machine Contributor"],
      ["Ver todos los recursos de la suscripción y su configuración sin cambiar nada", "Reader"]
    ],
    extra: ["Owner", "Storage Account Contributor"],
    explain: "Contributor administra recursos, pero no tiene derechos de escritura en Microsoft.Authorization, así que no puede asignar roles; User Access Administrator es lo contrario: solo administra el acceso. Storage Blob Data Reader es un rol del plano de datos, mientras que Reader y Storage Account Contributor actúan sobre el plano de administración. Virtual Machine Contributor cubre las VM, pero no la VNet ni la cuenta de almacenamiento a las que se conectan. Owner cumpliría varias filas, pero rompe el mínimo privilegio porque puede tanto administrar recursos como conceder acceso."
  },
  { id: "rbac-effective-delete", d: 1, type: "select", title: "Lee las asignaciones de roles para encontrar el acceso efectivo",
    prompt: "La VM vm-web01 está en el grupo de recursos RG-Prod de la suscripción Sub-Prod, que se encuentra bajo el grupo de administración mg-corp. No hay bloqueos (locks) ni asignaciones de denegación. Selecciona cada usuario que puede eliminar vm-web01 con sus asignaciones de roles actuales.",
    context: "Principal  Role                                   Scope\n---------  -------------------------------------  -----------------------------------------------\nalice      Reader                                 /subscriptions/Sub-Prod\nbob        Contributor                            /subscriptions/Sub-Prod/resourceGroups/RG-Prod\ncarol      Owner                                  /subscriptions/Sub-Prod/resourceGroups/RG-Dev\ndave       Virtual Machine Contributor            /providers/Microsoft.Management/managementGroups/mg-corp\nerin       Virtual Machine Administrator Login    .../RG-Prod/providers/Microsoft.Compute/virtualMachines/vm-web01\nfrank      User Access Administrator              /subscriptions/Sub-Prod\ngrace      Storage Account Contributor            /subscriptions/Sub-Prod/resourceGroups/RG-Prod\nheidi      Owner                                  /subscriptions/Sub-Prod",
    options: ["alice", "bob", "carol", "dave", "erin", "frank", "grace", "heidi"],
    answers: [1, 3, 7],
    explain: "Las asignaciones de roles se heredan hacia abajo en la jerarquía (grupo de administración, suscripción, grupo de recursos, recurso), así que bob (Contributor en RG-Prod), dave (Virtual Machine Contributor en el grupo de administración padre) y heidi (Owner en la suscripción) pueden eliminar la VM. El rol Owner de carol tiene como ámbito otro grupo de recursos, alice solo lee y el rol de erin es una acción de datos para iniciar sesión en la VM. frank podría asignarse un rol a sí mismo, pero con su asignación actual solo puede administrar el acceso, y el rol de grace cubre únicamente cuentas de almacenamiento."
  },
  { id: "policy-effect-fill", d: 1, type: "fill", title: "Elige el efecto de Azure Policy",
    prompt: "El equipo de gobernanza escribió cinco requisitos. Para cada uno, escribe el efecto de Azure Policy que pondrías en el bloque \"then\" de la definición de la política.",
    context: "1. Las VM nuevas deben bloquearse si usan un tamaño fuera de la lista aprobada.\n2. Las cuentas de almacenamiento que permiten acceso anónimo a blobs deben reportarse como no conformes, pero no se puede bloquear nada.\n3. Todo Key Vault sin una configuración de diagnóstico debe recibir automáticamente una que envíe logs a law-central.\n4. Se debe agregar o corregir una etiqueta CostCenter en los recursos existentes mediante una tarea de corrección.\n5. Los recursos etiquetados con protect=true no deben poder eliminarse, ni siquiera por los Owners.",
    fields: [
      { label: "Requisito 1", answers: ["Deny"] },
      { label: "Requisito 2", answers: ["Audit"] },
      { label: "Requisito 3", answers: ["DeployIfNotExists", "Deploy If Not Exists", "DINE"] },
      { label: "Requisito 4", answers: ["Modify"] },
      { label: "Requisito 5", answers: ["DenyAction", "Deny Action"] }
    ],
    explain: "Deny rechaza una solicitud de creación o actualización que incumple la regla, mientras que Audit solo registra el incumplimiento. DeployIfNotExists implementa un recurso relacionado, como una configuración de diagnóstico, cuando falta. Modify agrega, reemplaza o quita etiquetas y puede corregir recursos existentes mediante una tarea de corrección (remediation task); Append no puede corregir recursos existentes. DenyAction es el efecto que bloquea acciones como la eliminación en los recursos que coinciden, mientras que Deny evalúa las solicitudes de creación y actualización."
  },
  { id: "sas-token-read", d: 2, type: "select", title: "Interpreta un token SAS",
    prompt: "Un desarrollador comparte este token SAS, que se agrega a las solicitudes hacia la cuenta de almacenamiento stcontosodata. Selecciona cada afirmación verdadera sobre él.",
    context: "?sv=2022-11-02&ss=b&srt=co&sp=rl&st=2026-09-25T09:00:00Z&se=2026-10-01T18:00:00Z&spr=https&sip=198.51.100.0-198.51.100.255&sig=<signature>",
    options: [
      "Es un account SAS, porque contiene los parámetros ss y srt",
      "Concede permisos de lectura y listado",
      "Permite que los clientes suban blobs nuevos",
      "Se puede usar tanto por HTTP simple como por HTTPS",
      "Solo funciona para clientes cuya IP de origen esté en 198.51.100.0-198.51.100.255",
      "Se puede revocar eliminando una stored access policy en el contenedor",
      "También concede acceso a los recursos compartidos de Azure Files de la cuenta",
      "Deja de funcionar a las 18:00 UTC del 1 de octubre de 2026"
    ],
    answers: [0, 1, 4, 7],
    explain: "ss (signed services) y srt (signed resource types) solo aparecen en un account SAS; ss=b lo limita a Blob storage, así que Files no está incluido. sp=rl concede lectura y listado, sin permiso de escritura ni de creación para subir archivos, y spr=https prohíbe el HTTP simple. sip restringe el rango de IP del cliente, y el parámetro se (signed expiry) fija la expiración en UTC. Los tokens de account SAS no se pueden vincular a una stored access policy, así que las únicas formas de revocar este antes de tiempo son regenerar la clave que lo firmó o esperar a que expire."
  },
  { id: "lifecycle-policy-fill", d: 2, type: "fill", title: "Predice los resultados de lifecycle management",
    prompt: "El nivel de acceso predeterminado de la cuenta de almacenamiento es Hot, y los blobs se subieron sin definir un nivel. Después de que se ejecute la política de ciclo de vida de abajo, completa el nivel de acceso de cada block blob.",
    context: "{\n  \"rules\": [{\n    \"name\": \"logs-tiering\",\n    \"enabled\": true,\n    \"type\": \"Lifecycle\",\n    \"definition\": {\n      \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"logs/\"] },\n      \"actions\": { \"baseBlob\": {\n        \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n        \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 180 },\n        \"delete\":        { \"daysAfterModificationGreaterThan\": 365 }\n      } }\n    }\n  }]\n}",
    fields: [
      { label: "logs/app/2026-09-05.log, modificado por última vez hace 20 días", answers: ["Hot"] },
      { label: "logs/app/2026-08-11.log, modificado por última vez hace 45 días", answers: ["Cool"] },
      { label: "logs/app/2026-03-09.log, modificado por última vez hace 200 días", answers: ["Archive"] },
      { label: "images/banner.png, modificado por última vez hace 400 días", answers: ["Hot"] }
    ],
    explain: "prefixMatch empieza con el nombre del contenedor, así que la regla solo aplica a los blobs del contenedor logs. Un blob de logs se queda en Hot hasta que tiene más de 30 días, pasa a Cool después de 30 días y a Archive después de 180 días, y se elimina después de 365 días. El blob del contenedor images no coincide con el filtro, así que conserva el nivel predeterminado de la cuenta, Hot, sin importar su antigüedad."
  },
  { id: "slot-swap-order", d: 3, type: "order", title: "Publica una web app mediante un slot de staging",
    prompt: "Una web app se ejecuta en un App Service plan Basic. Debes publicar una nueva versión sin tiempo de inactividad y poder revertirla rápidamente. Ordena correctamente los pasos.",
    steps: [
      "Escala verticalmente el App Service plan al nivel Standard",
      "Agrega a la web app un deployment slot llamado staging",
      "Implementa la nueva compilación en el slot staging",
      "Navega al host name propio del slot staging y ejecuta pruebas de humo (smoke tests)",
      "Intercambia (swap) el slot staging con producción",
      "Si aparecen errores, vuelve a intercambiar los slots para restaurar la versión anterior"
    ],
    explain: "Los deployment slots necesitan el nivel Standard o superior, así que el plan debe escalarse antes de que pueda existir un slot. Implementas en el slot y lo pruebas en su propio host name, y luego haces el swap, que precalienta las instancias antes de que se mueva el tráfico de producción. Como la versión anterior queda ahora en el slot staging, volver a hacer el swap es la reversión rápida."
  },
  { id: "vm-billing-select", d: 3, type: "select", title: "Encuentra las VM que siguen generando cargos de cómputo",
    prompt: "Finanzas pregunta qué VM se siguen facturando por cómputo. Con base en la salida de abajo, selecciona cada VM que sigue generando cargos de cómputo.",
    context: "$ az vm list -d --query \"[].{Name:name, PowerState:powerState}\" -o table\nName        PowerState\n----------  --------------\nvm-web01    VM running\nvm-web02    VM stopped\nvm-app01    VM deallocated\nvm-db01     VM running\nvm-jump01   VM stopped\nvm-test01   VM deallocated",
    options: ["vm-web01", "vm-web02", "vm-app01", "vm-db01", "vm-jump01", "vm-test01"],
    answers: [0, 1, 3, 4],
    explain: "Una VM que se apaga desde dentro del sistema operativo invitado, o que se detiene sin desasignarla, muestra 'VM stopped' y conserva su asignación de cómputo, así que se sigue facturando. Solo 'VM deallocated' (Stop en el portal, az vm deallocate o Stop-AzVM) libera el hardware y detiene la facturación de cómputo. Los discos administrados, y cualquier IP pública estática, se facturan en todos los estados."
  },
  { id: "avset-domains-fill", d: 3, type: "fill", title: "Calcula el impacto de un availability set",
    prompt: "Se implementan doce VM idénticas en un availability set configurado con 3 fault domains y 5 update domains. Azure distribuye las VM de forma uniforme (round robin) entre los dominios. Completa:",
    fields: [
      { label: "Número máximo de VM que se reinician al mismo tiempo durante el mantenimiento planificado de un update domain", answers: ["3"] },
      { label: "Número de VM que se pierden si falla el hardware de un fault domain", answers: ["4"] },
      { label: "SLA de conectividad de VM para dos o más VM en un availability set (porcentaje)", answers: ["99.95", "99.95%"] }
    ],
    explain: "Doce VM entre 5 update domains dan 3, 3, 2, 2 y 2, así que el mantenimiento planificado de un update domain deja fuera de línea como máximo 3 VM a la vez. Doce VM entre 3 fault domains ponen 4 en cada uno, así que la falla de un rack elimina 4 de ellas. Los availability sets tienen un SLA de 99.95%; distribuir las VM entre availability zones lo eleva a 99.99% y además protege contra la pérdida de un datacenter completo."
  },
  { id: "nsg-flow-select", d: 4, type: "select", title: "Evalúa reglas de NSG para flujos entrantes",
    prompt: "VNet-Prod usa 10.10.0.0/16. El NSG de abajo está asociado a la subred 10.10.2.0/24, y la VM en 10.10.2.4 no tiene NSG a nivel de NIC. Selecciona cada flujo entrante que tendrá PERMITIDO llegar a 10.10.2.4.",
    context: "Priority  Name                  Port  Protocol  Source          Destination     Action\n100       Allow-HTTPS           443   TCP       Internet        Any             Allow\n200       Deny-RDP              3389  TCP       Any             Any             Deny\n300       Allow-RDP-Admins      3389  TCP       203.0.113.0/24  Any             Allow\n400       Allow-SQL-From-Web    1433  TCP       10.10.1.0/24    10.10.2.0/24    Allow\n65000     AllowVnetInBound      Any   Any       VirtualNetwork  VirtualNetwork  Allow\n65001     AllowAzureLoadBalancerInBound Any Any AzureLoadBalancer Any           Allow\n65500     DenyAllInBound        Any   Any       Any             Any             Deny",
    options: [
      "TCP 443 desde 198.51.100.20",
      "TCP 3389 desde 203.0.113.10",
      "TCP 1433 desde 10.10.1.5",
      "TCP 22 desde 10.10.3.7",
      "TCP 22 desde 198.51.100.20",
      "TCP 80 desde 198.51.100.20",
      "TCP 1433 desde 10.10.3.7"
    ],
    answers: [0, 2, 3, 6],
    explain: "Las reglas se procesan empezando por el número de prioridad más bajo, y el procesamiento se detiene en la primera coincidencia. HTTPS desde internet coincide con la regla 100, y RDP desde el rango de administradores es denegado por la regla 200 antes de que la regla 300 llegue a evaluarse. SQL desde 10.10.1.5 coincide con la regla 400. El tráfico desde 10.10.3.7 está dentro de la VNet, así que AllowVnetInBound en 65000 permite tanto SSH como SQL desde esa dirección, porque la regla 400 permite tráfico pero no deniega nada. SSH y HTTP desde internet caen hasta DenyAllInBound."
  },
  { id: "subnet-azure-fill", d: 4, type: "fill", title: "Planifica direcciones en una subred de Azure",
    prompt: "Creas la subred snet-app con el prefijo 10.20.4.0/26 en una VNet que usa 10.20.0.0/16. Completa los valores tal como Azure los asigna.",
    fields: [
      { label: "Primera dirección IP que se puede asignar a una VM", answers: ["10.20.4.4"] },
      { label: "Última dirección IP que se puede asignar a una VM", answers: ["10.20.4.62"] },
      { label: "Número de direcciones utilizables en la subred", answers: ["59"] },
      { label: "Prefijo más pequeño permitido para AzureBastionSubnet", answers: ["/26", "26"] }
    ],
    explain: "Una /26 tiene 64 direcciones, de 10.20.4.0 a 10.20.4.63. Azure reserva cinco en cada subred: la dirección de red (.0), el default gateway (.1), dos para Azure DNS (.2 y .3) y la dirección de broadcast (.63). Eso deja de .4 a .62, es decir, 59 direcciones utilizables. Azure Bastion requiere una subred llamada AzureBastionSubnet con un prefijo de /26 o mayor."
  },
  { id: "netwatcher-match", d: 4, type: "match", title: "Relaciona necesidades de troubleshooting con herramientas de Network Watcher",
    prompt: "Relaciona cada necesidad de troubleshooting con la herramienta de Azure que la resuelve de forma más directa.",
    pairs: [
      ["Qué regla de NSG permite o deniega TCP 1433 de VM1 a VM2", "IP flow verify"],
      ["Qué tabla de rutas y qué tipo de siguiente salto se usan para el tráfico de VM1 hacia 0.0.0.0/0", "Next hop"],
      ["Las reglas combinadas del NSG de la subred y del NSG de la NIC aplicadas a una interfaz de red", "Effective security rules"],
      ["La latencia y la accesibilidad entre una VM y un endpoint, monitoreadas de forma continua durante días", "Connection monitor"],
      ["Un archivo de captura del tráfico de una VM para analizarlo en Wireshark", "Packet capture"],
      ["Gráficos de los principales emisores (top talkers) y de los flujos bloqueados, generados a partir de los datos de flow logs", "Traffic analytics"]
    ],
    extra: ["Azure Advisor", "Activity log"],
    explain: "IP flow verify prueba una 5-tupla y nombra la regla de NSG que la decidió, mientras que Next hop reporta la ruta vigente y su tipo de siguiente salto, así que muestra por qué el tráfico no pasa por un firewall. Effective security rules combina los NSG de la subred y de la NIC para una NIC. Connection monitor vigila la accesibilidad y la latencia a lo largo del tiempo, Packet capture registra paquetes en bruto y Traffic analytics resume los flow logs. Advisor da recomendaciones de mejores prácticas y el Activity log registra operaciones del plano de control; ninguno diagnostica el flujo de paquetes."
  },
  { id: "asr-dr-order", d: 5, type: "order", title: "Ejecuta el ciclo de vida de recuperación ante desastres con Site Recovery",
    prompt: "Ordena correctamente estas tareas de Azure Site Recovery para proteger VM de Azure en otra región, desde la configuración inicial hasta el regreso a la región primaria.",
    steps: [
      "Habilita la replicación de las VM hacia la región secundaria",
      "Ejecuta un test failover hacia una red virtual aislada",
      "Limpia el test failover",
      "Durante una caída de la región primaria, haz failover de las VM hacia la región secundaria",
      "Confirma (commit) el failover",
      "Vuelve a proteger (re-protect) las VM para que la replicación vaya de la región secundaria de regreso a la primaria",
      "Haz failback hacia la región primaria"
    ],
    explain: "La replicación debe alcanzar un estado protegido antes de cualquier failover. Un test failover comprueba el plan sin afectar la producción ni la replicación, y limpiarlo elimina las VM de prueba. En una caída real haces failover y luego commit, lo que confirma el punto de recuperación que elegiste. Re-protect invierte la dirección de la replicación, lo cual es necesario antes de poder hacer failback a la región original."
  },
  { id: "kql-heartbeat-fill", d: 5, type: "fill", title: "Completa una consulta KQL para heartbeats faltantes",
    prompt: "Necesitas listar los equipos que enviaron un heartbeat en las últimas 24 horas, pero que no han reportado en los últimos 15 minutos. Completa los tres espacios en blanco de la consulta.",
    context: "Heartbeat\n| ____(1)____ TimeGenerated > ago(24h)\n| ____(2)____ LastSeen = ____(3)____(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n| order by LastSeen asc",
    fields: [
      { label: "Espacio 1 (filtrar filas)", answers: ["where"] },
      { label: "Espacio 2 (agrupar y agregar)", answers: ["summarize"] },
      { label: "Espacio 3 (función de agregación)", answers: ["max"] }
    ],
    explain: "where filtra filas, así que la primera línea conserva solo los heartbeats de las últimas 24 horas. summarize con max(TimeGenerated) by Computer devuelve una fila por equipo con su heartbeat más reciente, y el siguiente where conserva los equipos cuyo último heartbeat tiene más de 15 minutos. Usar min devolvería el heartbeat más antiguo, y count no te diría cuándo reportó una máquina por última vez."
  }
]);
