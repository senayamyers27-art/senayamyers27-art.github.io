/* Spanish translation of the AZ-802 exam simulations. Same ids and structure as data/pbq/az-802.js. */
CertHub.addPbqs("az-802", [
  { id: "fsmo-match", d: 1, type: "match", title: "Relaciona los roles FSMO con sus responsabilidades",
    prompt: "Tu administrador junior está documentando el bosque contoso.example.com. Relaciona cada rol de maestro de operaciones (FSMO) con la función que cumple.",
    pairs: [
      ["Schema master", "Procesa todos los cambios al esquema de AD (uno por bosque)"],
      ["Domain naming master", "Agrega y quita dominios y particiones de aplicación en el bosque"],
      ["RID master", "Entrega grupos de identificadores relativos (RID) para que los DC puedan crear entidades de seguridad"],
      ["PDC emulator", "Fuente de hora del dominio y primer destino de los cambios urgentes de contraseña"],
      ["Infrastructure master", "Actualiza las referencias a objetos de otros dominios"]
    ],
    extra: ["Tiene la única copia editable del catálogo global", "Autoriza servidores DHCP en Active Directory"],
    explain: "El schema master y el domain naming master son roles de todo el bosque; el RID master, el PDC emulator y el infrastructure master existen uno por dominio. El PDC emulator es la raíz de la jerarquía de hora del dominio y recibe los cambios de contraseña de forma urgente, por eso las verificaciones de contraseñas incorrectas se consultan ahí. El catálogo global no es un rol FSMO (cualquier DC puede ser GC), y la autorización de DHCP la hacen los Enterprise Admins, no el titular de un rol."
  },
  { id: "gmsa-order", d: 1, type: "order", title: "Implementa una cuenta de servicio administrada de grupo",
    prompt: "Un grupo de aplicaciones de IIS en WEB01 debe ejecutarse como una cuenta de servicio administrada de grupo (svc-web) en un bosque que nunca ha usado gMSA. Ordena los pasos correctamente.",
    steps: [
      "Crea la clave raíz de KDS con Add-KdsRootKey y deja que entre en vigor y se replique",
      "Ejecuta New-ADServiceAccount svc-web con -DNSHostName y -PrincipalsAllowedToRetrieveManagedPassword indicando WEB01 (o un grupo que lo contenga)",
      "En WEB01, instala el módulo de PowerShell de AD y ejecuta Install-ADServiceAccount svc-web",
      "Ejecuta Test-ADServiceAccount svc-web en WEB01 y confirma que devuelve True",
      "Configura la identidad del grupo de aplicaciones como CONTOSO\\svc-web$ con la contraseña en blanco"
    ],
    explain: "Las contraseñas de las gMSA se derivan de la clave raíz de KDS, así que la clave debe existir primero (entra en vigor 10 horas después de crearla, a menos que le pongas una fecha anterior en un laboratorio). Luego se crea la cuenta, limitada a los hosts que pueden obtener su contraseña; el host la instala y la prueba, y solo entonces se configura el servicio. El $ final y la contraseña en blanco son obligatorios porque Windows obtiene y rota la contraseña automáticamente."
  },
  { id: "hybrid-tools-match", d: 2, type: "match", title: "Elige la herramienta híbrida o de migración correcta",
    prompt: "Relaciona cada requisito del plan del proyecto híbrido de Contoso con la herramienta de Microsoft que lo cumple.",
    pairs: [
      ["Mover recursos compartidos, datos y la identidad de un servidor de archivos Windows Server 2012 R2 a una nueva VM con Windows Server 2025", "Storage Migration Service"],
      ["Aplicar Azure Policy y extensiones de VM a servidores físicos del datacenter local", "Azure Arc-enabled servers"],
      ["Evaluar dimensionamiento y costos, y luego rehospedar 40 VM de VMware como VM de Azure", "Azure Migrate"],
      ["Administrar servidores y clústeres de conmutación por error desde un navegador sin RDP", "Windows Admin Center"],
      ["Mover usuarios y grupos desde un bosque heredado conservando el acceso mediante el historial de SID", "Active Directory Migration Tool (ADMT)"]
    ],
    extra: ["Azure File Sync", "Entra Cloud Sync"],
    explain: "Storage Migration Service inventaría, transfiere y hace el cambio final de un servidor de archivos, incluso asumiendo su nombre e IP. Azure Arc proyecta máquinas que no están en Azure hacia Azure Resource Manager para que se apliquen Policy, Defender y las extensiones. Azure Migrate ofrece descubrimiento, evaluación y replicación para el rehospedaje. Windows Admin Center es la herramienta de administración basada en navegador, y ADMT migra objetos de AD con historial de SID. Azure File Sync almacena en caché recursos compartidos de Azure Files en servidores, y Cloud Sync sincroniza identidades con Entra ID; ninguno migra bosques ni servidores."
  },
  { id: "hv-replica-order", d: 3, type: "order", title: "Configura Hyper-V Replica entre dos hosts",
    prompt: "HV01 (principal) y HV02 (réplica) son hosts de Hyper-V independientes unidos al dominio. Ordena correctamente los pasos para proteger la VM APP01 con Hyper-V Replica usando Kerberos sobre HTTP.",
    steps: [
      "En HV02, habilítalo como servidor de réplica (Kerberos/HTTP, puerto 80), autoriza a HV01 con una ruta de almacenamiento y habilita la regla de firewall Hyper-V Replica HTTP Listener",
      "En HV01, ejecuta Enable Replication para APP01, elige HV02, la frecuencia de replicación y los puntos de recuperación que se conservarán",
      "Elige el método de replicación inicial (por la red, medios externos o una VM existente) e inicia la replicación inicial",
      "Confirma con Measure-VMReplication que el estado de la replicación es Normal",
      "Ejecuta un Test Failover en HV02 para validar la réplica sin interrumpir APP01"
    ],
    explain: "El lado de réplica debe aceptar la replicación antes de que el principal pueda apuntar a él, y la regla de firewall de entrada no está habilitada de forma predeterminada. Cuando termine la replicación inicial, revisa el estado y luego usa Test Failover, que arranca una copia desechable de la réplica en una red aislada mientras producción sigue funcionando. La conmutación por error planeada y la no planeada son para eventos reales, no para validar."
  },
  { id: "azure-subnet-fill", d: 4, type: "fill", title: "Direccionamiento de subred de Azure para un DC híbrido",
    prompt: "Vas a agregar la subred snet-identity 10.20.4.0/27 a una red virtual de Azure para controladores de dominio. Completa los valores que Azure permitirá.",
    context: "Virtual network: vnet-hub  address space 10.20.0.0/16\nNew subnet:      snet-identity  10.20.4.0/27\nRequisito:       asignar a DC01 la primera dirección que puede recibir una VM, como IP privada estática",
    fields: [
      { label: "Número de direcciones utilizables por las VM", answers: ["27"] },
      { label: "Primera dirección asignable a una VM (DC01)", answers: ["10.20.4.4"] },
      { label: "Dirección que Azure usa como puerta de enlace predeterminada de la subred", answers: ["10.20.4.1"] },
      { label: "Última dirección asignable a una VM", answers: ["10.20.4.30"] }
    ],
    explain: "Una /27 tiene 32 direcciones y Azure reserva cinco en cada subred: la dirección de red (.0), la puerta de enlace predeterminada (.1), dos direcciones que corresponden al DNS de Azure (.2 y .3) y la dirección de broadcast (.31). Eso deja 32 - 5 = 27 utilizables, de .4 a .30. Configura la IP del DC como estática en la NIC de Azure y no dentro del sistema operativo invitado."
  },
  { id: "storage-tech-match", d: 5, type: "match", title: "Relaciona requisitos de almacenamiento con funciones",
    prompt: "Relaciona cada requisito de servicios de archivos con la función de Windows Server o Azure que lo cumple.",
    pairs: [
      ["Replicación sincrónica a nivel de bloque de un volumen hacia un servidor en un segundo edificio", "Storage Replica"],
      ["Replicación multimaestro a nivel de archivo de una carpeta de espacio de nombres entre servidores de sucursal", "DFS Replication"],
      ["Mantener los archivos más usados en el servidor local y mover por niveles los archivos poco usados a un recurso compartido de Azure Files", "Azure File Sync"],
      ["Ahorrar espacio en un volumen de biblioteca VDI guardando una sola vez los fragmentos idénticos", "Data Deduplication"],
      ["Agrupar unidades NVMe y SSD locales de cuatro nodos del clúster en almacenamiento compartido", "Storage Spaces Direct"],
      ["Impedir que los usuarios guarden archivos .mp4 y aplicar una cuota de 5 GB a una carpeta", "File Server Resource Manager"]
    ],
    extra: ["BranchCache", "Volume Shadow Copy Service"],
    explain: "Storage Replica trabaja por debajo del sistema de archivos y replica bloques de forma sincrónica o asincrónica para recuperación ante desastres. DFS-R replica archivos y maneja cambios en varios sitios. Azure File Sync agrega niveles en la nube (cloud tiering) y sincronización entre varios sitios con un recurso compartido de Azure Files. La desduplicación elimina fragmentos duplicados dentro de un volumen, S2D construye almacenamiento definido por software a partir de discos locales y FSRM ofrece cuotas y filtros de archivos. BranchCache almacena en caché contenido de la WAN para los clientes y VSS ofrece instantáneas, así que ninguno cumple estos requisitos."
  },
  { id: "share-ntfs-fill", d: 5, type: "fill", title: "Calcula el acceso efectivo de recurso compartido y NTFS",
    prompt: "Con los permisos de FS01 que aparecen abajo, responde Sí o No a cada pregunta de acceso.",
    context: "Share \\\\FS01\\Finance  (path D:\\Finance)\n  Share permissions:  Everyone = Read ; FIN-Staff = Change\n\nNTFS permissions on D:\\Finance\n  FIN-Staff   = Modify (Allow)\n  Auditors    = Read & execute (Allow)\n  Contractors = Write (Deny)\n\nAlice: miembro de FIN-Staff\nBob:   miembro de Auditors\nDave:  miembro de FIN-Staff y Contractors",
    fields: [
      { label: "¿Puede Alice editar una hoja de cálculo a través de \\\\FS01\\Finance? (Sí/No)", answers: ["Sí", "S"] },
      { label: "¿Puede Bob editar una hoja de cálculo a través de \\\\FS01\\Finance? (Sí/No)", answers: ["No", "N"] },
      { label: "¿Puede Dave editar una hoja de cálculo a través de \\\\FS01\\Finance? (Sí/No)", answers: ["No", "N"] },
      { label: "Con sesión iniciada localmente en FS01, ¿puede Bob abrir archivos en D:\\Finance? (Sí/No)", answers: ["Sí", "S"] }
    ],
    explain: "A través de la red, el acceso efectivo es el más restrictivo entre los permisos combinados del recurso compartido y los permisos NTFS combinados. Alice obtiene Change en el recurso compartido y Modify en NTFS, así que puede editar. Bob solo tiene Read en ambos, y el Deny Write explícito de NTFS que tiene Dave anula su Allow de Modify. Localmente, los permisos del recurso compartido no se aplican, así que el Read & execute de Bob le permite abrir archivos."
  },
  { id: "spray-events-select", d: 6, type: "select", title: "Detecta password spraying en los registros de seguridad del DC",
    prompt: "Estos eventos se recopilaron de los controladores de dominio. Selecciona todos los eventos que forman parte de un intento de password spraying.",
    context: "Time (UTC)           EventID  Account      Client address  Detail\n2026-03-02 02:14:05  4771     a.baker      203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:06  4771     c.diaz       203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:06  4771     e.fong       203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 02:14:07  4771     svc-backup   203.0.113.45    Kerberos pre-auth failed, code 0x18\n2026-03-02 07:58:11  4771     j.smith      10.10.4.22      Kerberos pre-auth failed, code 0x18\n2026-03-02 07:58:40  4624     j.smith      10.10.4.22      Logon type 3 succeeded\n2026-03-02 09:02:13  4740     m.lee        WS-114          Account locked out",
    options: [
      "02:14:05 4771 a.baker desde 203.0.113.45",
      "02:14:06 4771 c.diaz desde 203.0.113.45",
      "02:14:06 4771 e.fong desde 203.0.113.45",
      "02:14:07 4771 svc-backup desde 203.0.113.45",
      "07:58:11 4771 j.smith desde 10.10.4.22",
      "07:58:40 4624 j.smith desde 10.10.4.22",
      "09:02:13 4740 m.lee bloqueado desde WS-114"
    ],
    answers: [0, 1, 2, 3],
    explain: "El password spraying prueba una o unas pocas contraseñas contra muchas cuentas desde el mismo origen, sin superar el umbral de bloqueo. Las cuatro fallas 0x18 (contraseña incorrecta) de cuentas distintas desde una misma dirección externa en dos segundos coinciden con ese patrón. La única falla de j.smith seguida de un inicio exitoso desde su propia subred es un error de tecleo, y un solo bloqueo desde una estación de trabajo suele indicar credenciales guardadas obsoletas. Defiéndete con smart lockout, MFA, listas de contraseñas prohibidas y alertas por fallas en muchas cuentas desde un mismo origen."
  },
  { id: "authoritative-restore-order", d: 7, type: "order", title: "Recupera una OU eliminada sin la Papelera de reciclaje",
    prompt: "Se eliminó la OU Sales en contoso.example.com y la Papelera de reciclaje de AD nunca se habilitó. Ordena correctamente los pasos para una restauración autoritativa en DC02.",
    steps: [
      "Reinicia DC02 en Directory Services Restore Mode (DSRM) e inicia sesión con la contraseña de DSRM",
      "Restaura el estado del sistema desde una copia de seguridad tomada antes de la eliminación (wbadmin start systemstaterecovery)",
      "En ntdsutil, ejecuta activate instance ntds y luego authoritative restore: restore subtree \"OU=Sales,DC=contoso,DC=example,DC=com\"",
      "Reinicia DC02 normalmente para que los objetos se repliquen con sus números de versión incrementados",
      "Importa el archivo LDIF que generó ntdsutil (ldifde -i) para restaurar los vínculos inversos, como las membresías de grupos",
      "Verifica con repadmin /showrepl y comprueba que la OU exista en los demás DC"
    ],
    explain: "Una restauración del estado del sistema por sí sola es no autoritativa, así que los socios de replicación volverían a eliminar la OU restaurada. Marcar el subárbol como autoritativo en ntdsutil antes del primer arranque normal incrementa los números de versión de los objetos para que ganen en la replicación. Las membresías de grupos guardadas en vínculos inversos de otros dominios o grupos se corrigen después con el archivo LDIF generado. Con la Papelera de reciclaje habilitada, Restore-ADObject haría innecesario todo esto."
  },
  { id: "perfmon-bottleneck-select", d: 7, type: "select", title: "Encuentra el cuello de botella en los datos de Performance Monitor",
    prompt: "Los usuarios reportan que FS02 (32 GB de RAM, servidor de archivos) está lento. Selecciona todos los valores de contadores que indican un cuello de botella de recursos.",
    context: "Counter                                      Average over 30 min\nProcessor(_Total)\\% Processor Time           22 %\nSystem\\Processor Queue Length                 1\nMemory\\Available MBytes                      180\nMemory\\Pages/sec                             1450\nLogicalDisk(C:)\\Avg. Disk sec/Read           0.004\nLogicalDisk(D:)\\Avg. Disk sec/Read           0.048\nNetwork Interface(Ethernet)\\Output Queue Length  0",
    options: [
      "% Processor Time = 22 %",
      "Processor Queue Length = 1",
      "Available MBytes = 180",
      "Pages/sec = 1450",
      "C: Avg. Disk sec/Read = 0.004",
      "D: Avg. Disk sec/Read = 0.048",
      "Output Queue Length = 0"
    ],
    answers: [2, 3, 5],
    explain: "Solo 180 MB libres en un servidor de 32 GB, junto con una paginación sostenida de 1450 páginas/s, muestra presión de memoria. Una latencia de lectura de 48 ms en D: está muy por encima de la guía habitual de 20-25 ms, mientras que 4 ms en C: es saludable. La CPU al 22 % con una cola de 1 y una cola de salida de red vacía son normales. Revisa qué está consumiendo memoria antes de comprar discos más rápidos, porque la paginación agrega carga al disco."
  }
]);
