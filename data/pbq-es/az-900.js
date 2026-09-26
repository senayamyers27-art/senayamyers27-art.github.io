/* Spanish translation of the AZ-900 exam simulations. Same ids and structure as data/pbq/az-900.js. */
CertHub.addPbqs("az-900", [
  { id: "service-type-match", d: 1, type: "match", title: "Relaciona escenarios con tipos de servicio en la nube",
    prompt: "Una firma de consultoría tiene cuatro cargas de trabajo nuevas. Relaciona cada escenario con el tipo de servicio en la nube que mejor se ajusta.",
    pairs: [
      ["Mover a Azure 40 servidores Windows existentes sin cambios, manteniendo el control total del SO", "Infraestructura como servicio (IaaS)"],
      ["Los desarrolladores implementan una API web desde el control de código fuente y nunca aplican parches a un sistema operativo", "Plataforma como servicio (PaaS)"],
      ["El personal necesita correo, calendarios y uso compartido de documentos listos para usar, sin desarrollo", "Software como servicio (SaaS)"],
      ["Cambiar el tamaño de cada foto subida, ejecutando código solo cuando llega un archivo y pagando por ejecución", "Cómputo serverless (Azure Functions)"]
    ],
    extra: ["Nube privada", "Azure Arc"],
    explain: "Un lift-and-shift con control total del SO es IaaS (VM de Azure). Cuando los desarrolladores quieren enfocarse en el código mientras Microsoft administra el SO y el runtime, eso es PaaS, como App Service. Una aplicación terminada como Microsoft 365 es SaaS. El código basado en eventos que se cobra por ejecución es serverless, normalmente Azure Functions. La nube privada es un modelo de implementación, no un tipo de servicio, y Azure Arc administra recursos fuera de Azure." },

  { id: "sla-composite-fill", d: 1, type: "fill", title: "Calcula el tiempo de inactividad del SLA y la disponibilidad compuesta",
    prompt: "Usa las notas de arquitectura para completar los valores. Supón un mes de 30 días (43,200 minutos).",
    context: "Notas de arquitectura: order-portal\n-----------------------------------------\nComponente           SLA del servicio (mensual)\nWeb front end        99.95%\nOrders database      99.99%\nAmbos componentes deben estar disponibles para que un pedido se complete.\nNo hay redundancia más allá del SLA propio de cada servicio.",
    fields: [
      { label: "Tiempo de inactividad permitido por mes con un SLA de 99.9% (minutos, un decimal)", answers: ["43.2", "43.2 minutos", "43.2 min"] },
      { label: "Tiempo de inactividad permitido por mes con un SLA de 99.99% (minutos, un decimal)", answers: ["4.3", "4.3 minutos", "4.3 min"] },
      { label: "SLA compuesto de order-portal (porcentaje, dos decimales)", answers: ["99.94", "99.94%"] }
    ],
    explain: "El tiempo de inactividad son los minutos del mes multiplicados por la fracción no disponible: 43,200 x 0.001 = 43.2 minutos con 99.9%, y 43,200 x 0.0001 = 4.32 minutos con 99.99%. Cuando una aplicación necesita que todos los componentes funcionen, multiplicas los SLA: 0.9995 x 0.9999 = 0.9994, o 99.94%. Un SLA compuesto siempre es menor que el SLA individual más débil, por eso los arquitectos agregan redundancia a las partes críticas." },

  { id: "capex-opex-select", d: 1, type: "select", title: "Identifica el gasto operativo en un presupuesto",
    prompt: "El equipo de finanzas pegó las líneas de gasto de TI del año pasado. Selecciona todas las líneas que son gasto operativo (OpEx).",
    context: "Revisión de gastos de TI - FY2026\n-----------------------------------------------------------\nL1  Compra de 12 servidores de rack, depreciados en 5 años\nL2  Factura mensual de Azure por VM y almacenamiento (pago por uso)\nL3  Construcción de un nuevo cuarto de servidores\nL4  Suscripción mensual por usuario de Microsoft 365\nL5  Compra de un arreglo de almacenamiento, depreciado en 4 años\nL6  Azure SQL Database facturado por hora de uso",
    options: ["L1 Compra de servidores de rack", "L2 Factura mensual de Azure", "L3 Nuevo cuarto de servidores", "L4 Suscripción a Microsoft 365", "L5 Compra de arreglo de almacenamiento", "L6 Facturación por hora de Azure SQL Database"],
    answers: [1, 3, 5],
    explain: "El OpEx es el gasto continuo en servicios a medida que se consumen, como una factura mensual de la nube o una suscripción por usuario, y se registra en el período en que se gasta. Comprar servidores o arreglos de almacenamiento, o construir un cuarto de servidores, es CapEx: gasto inicial en activos propios que se deprecian a lo largo de los años. El modelo de la nube basado en el consumo traslada el gasto de CapEx a OpEx." },

  { id: "redundancy-match", d: 2, type: "match", title: "Elige la redundancia de almacenamiento para cada requisito",
    prompt: "Relaciona cada requisito de almacenamiento con la opción de redundancia de menor costo que lo cumple por completo.",
    pairs: [
      ["Datos de prueba que se pueden volver a crear; solo proteger contra una falla de disco o de servidor", "LRS"],
      ["Seguir disponible si falla una zona de disponibilidad; no se necesita una segunda región", "ZRS"],
      ["Sobrevivir a un desastre regional; la copia secundaria solo necesita poder leerse después de un failover", "GRS"],
      ["Sobrevivir a una falla de zona y a un desastre regional, y permitir lecturas desde la región secundaria en cualquier momento", "RA-GZRS"]
    ],
    extra: ["GZRS", "RA-GRS"],
    explain: "LRS guarda tres copias en un solo datacenter, la opción más barata, y solo protege contra fallas de hardware. ZRS distribuye tres copias entre zonas de disponibilidad de la región primaria. GRS agrega replicación asincrónica a la región emparejada, que solo se puede leer después de un failover. GZRS combina ZRS en la primaria con una región secundaria, y el prefijo RA- agrega acceso de lectura a la secundaria en todo momento, así que la necesidad de protección de zona más lecturas en la secundaria exige RA-GZRS. RA-GRS no tiene redundancia de zona en la primaria, y GZRS a secas no tiene acceso de lectura a la secundaria." },

  { id: "hierarchy-order", d: 2, type: "order", title: "Ordena la jerarquía de recursos de Azure",
    prompt: "Un administrador está documentando hasta dónde se hereda una política asignada en el nivel superior. Ordena estos niveles desde la parte superior de la jerarquía hasta la inferior.",
    steps: ["Grupo de administración raíz (root management group)", "Grupo de administración hijo (Production)", "Suscripción (Sales-Prod)", "Grupo de recursos (rg-sales-web)", "Recurso (una máquina virtual)"],
    explain: "Cada directorio tiene un grupo de administración raíz en la parte superior. Los grupos de administración se pueden anidar y contienen suscripciones; las suscripciones contienen grupos de recursos; y cada recurso pertenece exactamente a un grupo de recursos. Las políticas y las asignaciones de RBAC hechas en un nivel superior las heredan todos los niveles inferiores, así que una política en el grupo de administración Production se aplica a la VM." },

  { id: "rbac-delete-select", d: 2, type: "select", title: "Averigua quién puede eliminar una VM",
    prompt: "Revisa las asignaciones de roles. Selecciona todas las entidades (principals) que pueden eliminar la máquina virtual vm-web01 del grupo de recursos rg-prod. No existen bloqueos de recursos.",
    context: "Subscription: Contoso-Prod\n  rg-prod contains: vm-web01, stprodlogs\n  rg-dev contains: vm-test01\n\nPrincipal   Role                              Scope\n---------   -------------------------------   ------------------------\nAlex        Owner                             Subscription Contoso-Prod\nBea         Reader                            rg-prod\nChen        Contributor                       rg-prod\nDana        Virtual Machine Contributor       rg-dev\nEli         Reader                            Subscription Contoso-Prod\nFarah       Contributor                       vm-web01 (resource)",
    options: ["Alex", "Bea", "Chen", "Dana", "Eli", "Farah"],
    answers: [0, 2, 5],
    explain: "Las asignaciones de roles se heredan desde el ámbito donde se hacen hacia los ámbitos hijos. El Owner de Alex en la suscripción y el Contributor de Chen en rg-prod llegan ambos a vm-web01, y el Contributor de Farah está asignado en la propia VM. Bea y Eli tienen Reader, que puede ver pero no cambiar ni eliminar. El rol Virtual Machine Contributor de Dana permitiría eliminar VM, pero solo en rg-dev, que no incluye vm-web01." },

  { id: "blob-tier-fill", d: 2, type: "fill", title: "Elige los niveles de acceso de blobs",
    prompt: "Una empresa de medios está configurando los niveles de acceso para cuatro conjuntos de datos. Para cada uno, escribe el nivel (Hot, Cool, Cold o Archive) que da el menor costo total cumpliendo las necesidades indicadas.",
    context: "Conjunto de datos      Patrón de acceso                           Retención   Necesidades\n--------------------  -----------------------------------------  ----------  -----------------------------------\nMiniaturas            Se leen miles de veces al día              Continua    Lecturas inmediatas\nRespaldos semanales   Se restauran tal vez una vez al mes        45 días     Lecturas inmediatas, sin cargo por eliminación anticipada\nReportes trimestrales Se abren unas cuantas veces al año         2 años      Lecturas inmediatas (sin rehidratación)\nVideo en retención legal  Casi nunca se lee                      10 años     Puede esperar horas para leerse",
    fields: [
      { label: "Miniaturas", answers: ["Hot"] },
      { label: "Respaldos semanales", answers: ["Cool"] },
      { label: "Reportes trimestrales", answers: ["Cold"] },
      { label: "Video en retención legal", answers: ["Archive"] }
    ],
    explain: "Los datos que se leen con frecuencia van en Hot, que tiene el menor costo de acceso. Cool sirve para datos de acceso poco frecuente que se conservan al menos 30 días; los respaldos se conservan 45 días, lo que generaría un cargo por eliminación anticipada en Cold (mínimo de 90 días). Cold es el nivel en línea más barato para datos que casi no se leen y se conservan 90 días o más, así que los reportes siguen siendo legibles sin rehidratación. Archive está fuera de línea, requiere una rehidratación que puede tardar horas y tiene el menor costo de almacenamiento, así que encaja con la retención legal prolongada." },

  { id: "connectivity-match", d: 2, type: "match", title: "Relaciona requisitos de conectividad con servicios de Azure",
    prompt: "Relaciona cada requisito de red con el servicio o la función de Azure que lo cumple.",
    pairs: [
      ["La laptop de un solo empleado remoto debe llegar a una VNet sin un dispositivo VPN de oficina", "VPN de punto a sitio (point-to-site)"],
      ["La red de una sucursal debe conectarse a una VNet mediante un túnel cifrado a través de internet", "VPN de sitio a sitio (site-to-site)"],
      ["El tráfico del datacenter hacia Azure no debe pasar por internet público", "ExpressRoute"],
      ["Dos VNet en regiones diferentes deben comunicarse por la red troncal de Microsoft usando IP privadas", "VNet peering"],
      ["Una cuenta de almacenamiento solo debe ser accesible a través de una dirección IP privada en la VNet", "Private endpoint"]
    ],
    extra: ["Azure DNS", "Network security group"],
    explain: "La VPN de punto a sitio conecta dispositivos individuales con software cliente de VPN, mientras que la de sitio a sitio conecta toda una red local mediante un dispositivo VPN; ambas viajan cifradas por internet a través de VPN Gateway. ExpressRoute usa una conexión privada a través de un proveedor, no internet público. El VNet peering, incluido el global peering entre regiones, enlaza VNet a través de la red troncal de Microsoft. Un private endpoint le da a un servicio PaaS una IP privada en tu VNet para que puedas deshabilitar el acceso público. Azure DNS hospeda registros de nombres y los NSG filtran tráfico, pero ninguno crea estas conexiones." },

  { id: "migrate-order", d: 2, type: "order", title: "Ordena una migración de servidores con Azure Migrate",
    prompt: "Una empresa va a mover 60 VM de VMware locales a Azure con Azure Migrate. Ordena correctamente los pasos generales.",
    steps: [
      "Crear un proyecto de Azure Migrate en el portal de Azure",
      "Implementar el appliance de Azure Migrate en las instalaciones locales para descubrir los servidores",
      "Ejecutar una evaluación para revisar la preparación para Azure, el dimensionamiento y el costo estimado",
      "Empezar a replicar a Azure los servidores seleccionados",
      "Ejecutar una migración de prueba y validar la aplicación",
      "Realizar la migración final (cutover) y dar de baja los servidores antiguos"
    ],
    explain: "Azure Migrate es un hub: primero creas un proyecto, luego descubres los servidores con el appliance ligero y los evalúas en cuanto a preparación, dimensionamiento adecuado y costo antes de mover nada. La replicación copia los servidores a Azure, una migración de prueba te permite validar sin afectar producción, y solo entonces haces el cutover y retiras las máquinas locales. Saltarse la evaluación es un error común que lleva a VM sobredimensionadas o incompatibles." },

  { id: "monitor-tools-match", d: 3, type: "match", title: "Relaciona necesidades de monitoreo con herramientas de Azure",
    prompt: "Un equipo de operaciones tiene varias preguntas. Relaciona cada una con la herramienta de Azure que la responde.",
    pairs: [
      ["¿Qué VM poco utilizadas podríamos redimensionar para ahorrar dinero?", "Azure Advisor"],
      ["¿El mantenimiento planificado afectará los servicios que usamos en nuestras regiones?", "Service Health"],
      ["¿Nuestra VM vm-sql01 no está disponible por un evento de la plataforma Azure?", "Resource Health"],
      ["¿Hay algún servicio de Azure caído en cualquier parte del mundo en este momento?", "Azure status"],
      ["¿Qué llamada a la base de datos hace lenta nuestra página de pago?", "Application Insights"],
      ["¿Cuántos inicios de sesión fallidos por hora aparecen en nuestros registros recopilados, usando KQL?", "Log Analytics"]
    ],
    extra: ["Microsoft Purview", "Azure Arc"],
    explain: "Advisor da recomendaciones personalizadas, incluido el ahorro de costos. Service Health está personalizado para tus servicios y regiones y cubre incidentes, mantenimiento planificado y avisos, mientras que Azure status es la vista pública global. Resource Health informa sobre un solo recurso. Application Insights rastrea solicitudes y dependencias dentro de las aplicaciones, y Log Analytics ejecuta consultas KQL sobre los registros de un workspace. Purview gobierna los datos y Arc administra recursos que no están en Azure." },

  { id: "governance-select", d: 3, type: "select", title: "Predice los resultados con Policy y bloqueos",
    prompt: "Priya es Owner de la suscripción. Con la configuración de gobernanza que se muestra, selecciona todas las operaciones que intenta y que tendrán éxito.",
    context: "Subscription: Contoso-Main\nAzure Policy assignment (scope: subscription)\n  Definition: Allowed locations   Effect: Deny\n  Allowed: westeurope, northeurope\n\nResource locks\n  rg-app      CanNotDelete\n  rg-archive  ReadOnly\n\nExisting resources\n  rg-app:     vm-app01 (westeurope), stappdata (westeurope)\n  rg-archive: starchive (northeurope)",
    options: [
      "Crear una cuenta de almacenamiento en rg-app en westeurope",
      "Crear una VM en rg-app en eastus",
      "Cambiar vm-app01 a un tamaño más grande",
      "Eliminar stappdata",
      "Agregar la etiqueta Env=Prod a vm-app01",
      "Cambiar la configuración de redundancia de starchive",
      "Ver las propiedades de starchive"
    ],
    answers: [0, 2, 4, 6],
    explain: "El efecto Deny de Azure Policy bloquea la creación de recursos fuera de las regiones permitidas, incluso para los Owners, así que la VM en eastus falla. Un bloqueo CanNotDelete en rg-app lo heredan sus recursos: se pueden modificar (redimensionar, etiquetar) pero no eliminar, así que eliminar stappdata falla. El bloqueo ReadOnly en rg-archive permite leer pero bloquea cualquier actualización o eliminación, así que cambiar la redundancia de starchive falla mientras que verla tiene éxito. Los bloqueos también se aplican a los Owners; primero hay que quitarlos." },

  { id: "tools-commands-fill", d: 3, type: "fill", title: "Completa comandos de Azure CLI y PowerShell",
    prompt: "Un administrador está escribiendo un script para un laboratorio en Azure Cloud Shell. Completa las palabras que faltan.",
    context: "# Azure CLI (Bash)\naz group ______ --name rg-lab --location westeurope\n\n# Azure PowerShell\n______-AzResourceGroup -Name rg-lab2 -Location westeurope\n\n# Azure CLI: proteger rg-lab contra eliminación, pero seguir permitiendo cambios\naz lock create --name keep --resource-group rg-lab --lock-type ______",
    fields: [
      { label: "Subcomando de Azure CLI para crear el grupo de recursos", answers: ["create"] },
      { label: "Verbo de PowerShell para crear el grupo de recursos", answers: ["New"] },
      { label: "Tipo de bloqueo que impide la eliminación pero permite modificaciones", answers: ["CanNotDelete"] }
    ],
    explain: "Los comandos de Azure CLI empiezan con az seguido de un grupo y un subcomando, así que az group create crea un grupo de recursos. Los cmdlets de Azure PowerShell siguen un patrón verbo-sustantivo, y el verbo para crear algo es New, lo que da New-AzResourceGroup. El tipo de bloqueo CanNotDelete impide la eliminación pero permite cambios; ReadOnly también bloquearía los cambios. Tanto la CLI como PowerShell vienen preinstalados en Cloud Shell." }
]);
