CertHub.addLessons("fortinet-fortigate", [
 {
  "t": "Initial setup: default management IP 192.168.1.99, admin account, forced password change, interface roles and access (HTTPS, SSH, ping)",
  "tt": "Configuración inicial: IP de gestión predeterminada 192.168.1.99, cuenta admin, cambio obligatorio de contraseña, roles de interfaz y acceso (HTTPS, SSH, ping)",
  "body": [
   "Todo FortiGate que sacas de la caja parte del mismo estado conocido, y el examen espera que lo domines a la perfección. Un FortiGate de hardware viene con la dirección 192.168.1.99 en su interfaz de gestión (a menudo etiquetada como MGMT, o internal/port1 en los modelos más pequeños). Conectas una laptop con cable a esa interfaz, le asignas una dirección en la misma subred y navegas por HTTPS a 192.168.1.99 en un navegador web. HTTPS es el protocolo predeterminado de la GUI, así que una solicitud HTTP simple se redirige a él.",
   "La cuenta de administrador predeterminada se llama admin y tiene una contraseña en blanco (vacía). FortiOS no la deja así: la primera vez que inicias sesión, el equipo te obliga a definir una contraseña nueva antes de permitirte hacer cualquier otra cosa. No existe una cuenta root ni un inicio de sesión con el número de serie, lo cual es un distractor favorito en el examen. El registro en FortiCloud es opcional para la gestión local y no es necesario solo para iniciar sesión.",
   "Una vez dentro, las interfaces llevan un rol que describe su lugar en la red. Los tres roles integrados son LAN, WAN y DMZ, además de Undefined. El rol es sobre todo una comodidad que oculta campos irrelevantes (una interfaz WAN, por ejemplo, muestra ajustes que no pondrías en un puerto LAN), y por sí solo no cambia cómo se filtra el tráfico. Las políticas de firewall siguen decidiendo qué pasa.",
   "Cada interfaz también tiene un ajuste de Administrative Access (acceso administrativo) que enumera los servicios de gestión que pueden llegar al FortiGate en esa interfaz: HTTPS y SSH para la gestión, PING para que la interfaz responda al eco ICMP, además de opciones como HTTP, SNMP, FMG-Access y Security Fabric Connection (antes llamado FortiTelemetry). Esta es una causa común de quedarse fuera del equipo: si quitas HTTPS de la interfaz por la que estás gestionando, pierdes la GUI. En una interfaz WAN expuesta a Internet normalmente permites poco o nada, y te apoyas en trusted hosts y una VPN para la gestión remota.",
   "En un laboratorio configurarás una IP estática en port1 desde la GUI o con la CLI. La CLI equivalente es breve: entra a `config system interface`, `edit port1`, `set ip 10.0.0.1/24`, `set allowaccess ping https ssh` y luego `end`. Conocer tanto la ruta en la GUI como la palabra clave `allowaccess` te ayuda a responder preguntas formuladas de cualquiera de las dos maneras."
  ],
  "terms": [
   [
    "Management IP (192.168.1.99) (IP de gestión)",
    "La dirección predeterminada en la interfaz de gestión/internal de un FortiGate de fábrica, a la que se accede por HTTPS para el primer inicio de sesión."
   ],
   [
    "Administrative access (acceso administrativo)",
    "La lista, por interfaz, de servicios de gestión (HTTPS, SSH, PING, SNMP, etc.) a los que el FortiGate responderá en esa interfaz."
   ],
   [
    "Interface role (rol de interfaz)",
    "Una etiqueta (LAN, WAN, DMZ o Undefined) que ajusta qué campos de configuración se muestran para una interfaz; por sí sola no filtra tráfico."
   ],
   [
    "allowaccess",
    "La palabra clave de la CLI, dentro de una interfaz del sistema, que define qué protocolos de gestión acepta la interfaz."
   ]
  ],
  "example": "Un técnico conecta una laptop al puerto MGMT de un FortiGate nuevo, configura la laptop con 192.168.1.50/24, navega por HTTPS a 192.168.1.99, inicia sesión como admin con la contraseña en blanco y de inmediato se ve obligado a crear una nueva contraseña de administrador.",
  "tip": "Perder el acceso a la GUI después de cambiar una interfaz casi siempre se debe a que falta HTTPS en el Administrative Access de esa interfaz. Confirma allowaccess antes de desconectarte.",
  "check": [
   [
    "¿Qué URL y credenciales usas para el primer inicio de sesión en un FortiGate de hardware con la configuración de fábrica?",
    "Navegas por HTTPS a 192.168.1.99 e inicias sesión como admin con la contraseña en blanco; luego FortiOS te obliga a definir una contraseña nueva."
   ],
   [
    "Quitaste HTTPS de la interfaz por la que gestionas y perdiste la GUI. ¿Qué ajuste lo causó?",
    "La lista de Administrative Access (allowaccess) de la interfaz ya no incluye HTTPS, así que el FortiGate deja de responder a las solicitudes de la GUI ahí."
   ],
   [
    "¿Un rol de interfaz WAN bloquea tráfico por sí mismo?",
    "No. El rol solo ajusta los ajustes que se muestran; las políticas de firewall deciden qué tráfico pasa."
   ]
  ]
 },
 {
  "t": "Administrator accounts: admin profiles, trusted hosts, MFA for admins, password policy",
  "tt": "Cuentas de administrador: perfiles de administrador, trusted hosts, MFA para administradores, política de contraseñas",
  "body": [
   "Proteger el propio FortiGate es una habilidad del dominio uno, y depende de cuatro controles independientes: perfiles de administrador, trusted hosts, autenticación multifactor y una política de contraseñas. Cada uno responde a una pregunta distinta, y el examen a menudo te plantea un escenario y te pregunta cuál aplica. Tenerlos claros es toda la batalla.",
   "Un perfil de administrador (también llamado perfil de acceso) controla lo que un administrador puede hacer. Otorga acceso de lectura, lectura-escritura o ningún acceso por área funcional: System, Firewall, Log & Report, Security Profile, VPN, etc. El perfil integrado super_admin otorga lectura-escritura completa en todo y no se puede editar. Para un auditor que debe ver registros pero no cambiar nada, creas un perfil personalizado con acceso de solo lectura a Log & Report y lo asignas a esa cuenta. Los perfiles controlan el qué, no el dónde.",
   "Los trusted hosts controlan desde dónde puede iniciar sesión un administrador. Cada cuenta puede enumerar un número reducido de subredes de origen (por ejemplo 10.10.99.0/24); en cuanto se define cualquier trusted host, los inicios de sesión desde cualquier otro origen se rechazan, incluso con la contraseña correcta. Esta es la forma más directa de aplicar una regla como 'los administradores solo pueden gestionar desde la subred de gestión'. Si todas las entradas quedan en 0.0.0.0/0, la cuenta puede iniciar sesión desde cualquier lugar, que es el valor predeterminado riesgoso al que debes prestar atención.",
   "La autenticación multifactor (MFA), a veces llamada de dos factores, agrega una segunda prueba además de la contraseña, normalmente un código de un solo uso de FortiToken o un código por correo electrónico. Defiende contra contraseñas robadas o adivinadas, pero no restringe las redes de origen, así que no es la respuesta a una pregunta de 'desde qué subred'.",
   "La política de contraseñas define reglas de complejidad y vigencia, longitud mínima, clases de caracteres requeridas y caducidad, que se aplican a las contraseñas de administrador (y, opcionalmente, a las claves precompartidas de IPsec). Eleva el costo de adivinar, pero de nuevo no dice nada sobre el origen ni la autorización.",
   "Una configuración sólida combina los cuatro: perfiles de mínimo privilegio, trusted hosts que limitan la gestión a una red de salto (jump network), MFA en cada administrador y una política de contraseñas. En un laboratorio crearás un perfil de solo lectura para Log & Report, agregarás un trusted host a tu propia cuenta y habilitarás un token, y luego confirmarás que cada control hace exactamente lo que su nombre indica."
  ],
  "terms": [
   [
    "Admin profile / access profile (perfil de administrador / perfil de acceso)",
    "Permisos por función (lectura/lectura-escritura/ninguno) que definen lo que un administrador puede hacer; super_admin es el perfil integrado completo."
   ],
   [
    "Trusted hosts (hosts de confianza)",
    "Una lista por cuenta de subredes de origen permitidas; una vez definida, se rechazan los inicios de sesión desde cualquier otra dirección."
   ],
   [
    "MFA / two-factor para administradores (autenticación de dos factores)",
    "Un segundo factor de inicio de sesión (como un código de FortiToken) que protege contra contraseñas robadas, pero no limita las redes de origen."
   ],
   [
    "Password policy (política de contraseñas)",
    "Reglas de longitud, complejidad y caducidad para las contraseñas de administrador."
   ]
  ],
  "example": "Un auditor necesita leer registros pero no debe cambiar nada, así que le asignas un perfil personalizado con acceso de solo lectura a Log & Report, agregas un trusted host para la subred de auditoría y exiges un FortiToken al iniciar sesión.",
  "tip": "Cuando una pregunta te pide restringir desde dónde inicia sesión un administrador, la respuesta es trusted hosts, no MFA ni la política de contraseñas. Los perfiles responden a qué pueden cambiar, no desde dónde.",
  "check": [
   [
    "¿Qué control te permite exigir que los administradores inicien sesión solo desde 10.10.99.0/24?",
    "Los trusted hosts en cada cuenta de administrador; entonces se rechazan otras direcciones de origen sin importar la contraseña."
   ],
   [
    "Un administrador debe ver informes pero no cambiar nada. ¿Qué creas?",
    "Un perfil de administrador personalizado con acceso de solo lectura a Log & Report, asignado a esa cuenta."
   ],
   [
    "¿La MFA restringe desde qué red puede iniciar sesión un administrador?",
    "No. La MFA agrega un segundo factor de autenticación, pero no limita las direcciones de origen; eso lo hacen los trusted hosts."
   ]
  ]
 },
 {
  "t": "Firmware management: the upgrade path, config backups and restore",
  "tt": "Gestión de firmware: la ruta de actualización, respaldos y restauración de la configuración",
  "body": [
   "Las actualizaciones de firmware son rutinarias, y hacerlas mal puede corromper una configuración o dejar inservible (brick) un equipo remoto, por eso Fortinet define un procedimiento disciplinado que el examen espera que sigas. Las dos ideas que más importan son la ruta de actualización soportada y el respaldo de la configuración.",
   "FortiOS no siempre te permite saltar directamente de una compilación (build) antigua a la más reciente. Cuando el formato interno de la configuración ha cambiado entre versiones, Fortinet publica una ruta de actualización (upgrade path): una lista ordenada de compilaciones intermedias que debes instalar en secuencia para que cada paso pueda convertir la configuración limpiamente. Por ejemplo, pasar un equipo de una compilación antigua de 7.0 a 7.6 puede requerir pasar primero por versiones específicas de 7.2 y 7.4. Saltarse pasos puede eliminar o alterar ajustes sin avisar. Antes de empezar, consultas la ruta para tu modelo exacto y tu compilación inicial en la herramienta de rutas de actualización de Fortinet o en las notas de la versión.",
   "Siempre haz un respaldo de la configuración antes de actualizar. Un respaldo es un archivo de texto con toda la configuración. Puedes guardarlo en texto claro o, mejor aún, cifrarlo con una contraseña. Un respaldo cifrado solo se puede restaurar en un FortiGate, y solo con la contraseña, así que guarda esa contraseña en un lugar seguro, porque perderla significa un respaldo inutilizable. Los respaldos son específicos del modelo y, a menudo, de la versión: restaurar en otro equipo un respaldo tomado en un modelo distinto o con un firmware muy diferente puede no funcionar, así que los respaldos sirven para revertir cambios (rollback) y clonar equipos iguales, no para migrar entre modelos.",
   "La operación de restauración carga una configuración guardada y reinicia el equipo. Como restaurar reemplaza la configuración en ejecución, es tu plan de reversión: si una actualización se comporta mal, puedes reinstalar el firmware anterior y restaurar el respaldo correspondiente. Restaurar una configuración tomada en el mismo modelo y firmware es el caso seguro.",
   "El flujo de trabajo que debes memorizar: consulta la ruta de actualización para tu modelo y compilación, lee las notas de la versión para conocer los problemas conocidos, respalda (y verifica) la configuración, actualiza un paso a la vez siguiendo la ruta y confirma que el equipo esté sano antes del siguiente paso. En un laboratorio descargarás un respaldo con `execute backup config`, y puedes ver el firmware en ejecución y el número de serie con `get system status`.",
   "En un clúster HA, FGCP normalmente actualiza los miembros con una actualización de firmware sin interrupción (rolling, escalonada) para que el clúster siga reenviando tráfico, pero aun así sigues la misma disciplina de ruta y respaldo."
  ],
  "terms": [
   [
    "Upgrade path (ruta de actualización)",
    "La secuencia ordenada de compilaciones intermedias de FortiOS que Fortinet exige entre dos versiones para que la configuración se convierta correctamente."
   ],
   [
    "Configuration backup (respaldo de la configuración)",
    "Una copia guardada de toda la configuración del FortiGate, opcionalmente cifrada con una contraseña, que se usa para revertir cambios o clonar equipos."
   ],
   [
    "Restore (restauración)",
    "Cargar un archivo de configuración guardado, lo que reemplaza la configuración en ejecución y reinicia el equipo."
   ],
   [
    "Release notes (notas de la versión)",
    "El documento de Fortinet para cada compilación que enumera la ruta de actualización soportada, las correcciones y los problemas conocidos."
   ]
  ],
  "example": "Antes de pasar un FortiGate de una compilación 7.0 a 7.6, un administrador respalda la configuración, consulta la ruta de actualización soportada e instala en orden los pasos requeridos de 7.2 y 7.4, en lugar de instalar 7.6 directamente.",
  "tip": "Nunca instales la imagen más reciente directamente sobre una compilación mucho más antigua. Sigue paso a paso la ruta de actualización publicada y haz primero un respaldo cifrado para poder revertir.",
  "check": [
   [
    "¿Por qué no instalar el firmware más reciente directamente sobre una compilación muy antigua?",
    "El formato de la configuración puede haber cambiado; la ruta de actualización publicada pasa por compilaciones intermedias para que la configuración se convierta limpiamente en lugar de perderse."
   ],
   [
    "¿Qué es lo primero que debes hacer antes de cualquier actualización?",
    "Respaldar la configuración (idealmente cifrada) para poder revertir si la actualización se comporta mal."
   ],
   [
    "¿Puedes restaurar un respaldo cifrado sin su contraseña?",
    "No. Un respaldo cifrado requiere la contraseña para restaurarse, así que perderla deja el respaldo inutilizable."
   ]
  ]
 },
 {
  "t": "VDOMs: what they separate, root VDOM, when to use multi-VDOM",
  "tt": "VDOMs: qué separan, la VDOM root y cuándo usar multi-VDOM",
  "body": [
   "Un dominio virtual, o VDOM, permite que un solo FortiGate físico se comporte como varios firewalls independientes. Cada VDOM tiene sus propias interfaces, políticas de firewall, tabla de enrutamiento, perfiles de seguridad y administradores, y el tráfico de una VDOM está aislado de las demás a menos que las conectes deliberadamente. Así es como un solo equipo puede atender, por ejemplo, a dos clientes distintos o a una red de producción y una de laboratorio sin que sus reglas o rutas se filtren entre sí.",
   "De forma predeterminada, un FortiGate funciona con una sola VDOM llamada root, y el modo multi-VDOM está desactivado. En este estado a menudo ni siquiera ves la palabra VDOM en la GUI; simplemente configuras el equipo. Cuando habilitas multi-VDOM (en la CLI, `config system global`, `set vdom-mode multi-vdom`, o desde la GUI), la VDOM root se mantiene y puedes agregar más VDOMs. La VDOM root es especial: de forma predeterminada es la VDOM de gestión, que transporta el tráfico de gestión propio del FortiGate (como las actualizaciones de FortiGuard, el registro de logs y NTP), y no se puede eliminar.",
   "Los ajustes globales se aplican a todo el equipo, independientemente de las VDOMs: el firmware, HA, el nombre de host y las cuentas de administrador a nivel global. Los ajustes por VDOM son todo lo que convierte a una VDOM en su propio firewall: las interfaces asignadas a ella, su enrutamiento, sus políticas y perfiles. Una interfaz pertenece exactamente a una VDOM a la vez. Para pasar tráfico entre VDOMs usas un inter-VDOM link (un par virtual de interfaces conectadas espalda con espalda) más políticas y rutas, de modo que el aislamiento solo se rompe donde tú lo permites.",
   "¿Cuándo deberías usar multi-VDOM? Úsalo cuando necesites una separación real, tanto administrativa como de tráfico, en un solo equipo: un proveedor de servicios gestionados que aloja a varios clientes (tenants), una empresa que debe mantener separados dos entornos regulatorios, o la necesidad de tablas de enrutamiento separadas (por ejemplo, rangos IP superpuestos para distintos clientes). Si solo necesitas segmentar la red dentro de una misma organización, las VLANs y zonas con buenas políticas suelen ser más sencillas; las VDOMs agregan carga de gestión y dividen el conjunto de recursos.",
   "Existen dos modelos de gestión. En el modo split-task VDOM obtienes una VDOM de gestión más una VDOM de tráfico; en el modo multi-VDOM creas muchas. Para el examen, concéntrate en la idea central: las VDOMs separan políticas, enrutamiento y administración, la VDOM root se encarga de la gestión, y recurres a multi-VDOM cuando el aislamiento es un requisito y no una simple comodidad."
  ],
  "terms": [
   [
    "VDOM (virtual domain, dominio virtual)",
    "Una instancia aislada en un FortiGate con sus propias interfaces, tabla de enrutamiento, políticas y perfiles."
   ],
   [
    "Root VDOM (VDOM root)",
    "La VDOM predeterminada que siempre existe y, en modo multi-VDOM, aloja la gestión y las funciones de todo el equipo."
   ],
   [
    "Global vs per-VDOM settings (ajustes globales vs por VDOM)",
    "Los ajustes globales (firmware, HA, nombre de host) se aplican a todo el equipo; los ajustes por VDOM (interfaces, rutas, políticas) pertenecen a una sola VDOM."
   ],
   [
    "Inter-VDOM link (enlace entre VDOMs)",
    "Un enlace interno virtual que conecta dos VDOMs para que el tráfico pueda pasar entre ellas bajo el control de políticas."
   ]
  ],
  "example": "Un proveedor de servicios gestionados aloja en un solo FortiGate a dos clientes con direccionamiento 10.0.0.0/8 superpuesto, dándole a cada uno su propia VDOM con una tabla de enrutamiento y un conjunto de políticas separados, de modo que su tráfico nunca se mezcla.",
  "tip": "Las VDOMs ofrecen tablas de enrutamiento y conjuntos de políticas separados; las VLANs y zonas solo segmentan dentro de un mismo contexto de enrutamiento/políticas. Elige VDOMs cuando necesites aislamiento real, no solo subredes.",
  "check": [
   [
    "¿Qué tiene cada VDOM que la hace actuar como un firewall separado?",
    "Sus propias interfaces, tabla de enrutamiento, políticas de firewall, perfiles de seguridad y administradores, aislados de las demás VDOMs."
   ],
   [
    "¿Qué VDOM existe siempre y se encarga de la gestión?",
    "La VDOM root; se mantiene cuando habilitas multi-VDOM y aloja las funciones de gestión y de todo el equipo."
   ],
   [
    "¿Cuándo es multi-VDOM la opción correcta en lugar de VLANs?",
    "Cuando necesitas un aislamiento real del enrutamiento y la administración, como clientes separados o rangos IP superpuestos, y no una simple segmentación."
   ]
  ]
 },
 {
  "t": "FGCP HA: active-passive vs active-active, heartbeat links, primary election (monitored ports, uptime, priority, serial, override)",
  "tt": "FGCP HA: activo-pasivo vs activo-activo, enlaces de heartbeat, elección del primario (puertos monitoreados, uptime, prioridad, número de serie, override)",
  "body": [
   "FortiGate Clustering Protocol (FGCP) une dos o más FortiGates idénticos en un solo clúster de alta disponibilidad (HA) que sobrevive a la falla de un equipo individual. Para formar un clúster, los miembros deben coincidir en modelo de hardware y firmware, y compartir el mismo ID de grupo HA, nombre de grupo y contraseña. Los nombres de host y las IP de gestión siguen siendo únicos por miembro. El clúster presenta direcciones MAC e IP virtuales compartidas, de modo que la red ve un solo dispositivo.",
   "Hay dos modos. En activo-pasivo, solo el primario (también llamado master) procesa el tráfico mientras el secundario permanece listo y toma el control si hay una falla. En activo-activo, el primario sigue recibiendo todo el tráfico, pero distribuye a los secundarios las sesiones que necesitan inspección con perfiles de seguridad para repartir la carga de CPU; el primario sigue siendo dueño de las direcciones compartidas. Ambos modos hacen la conmutación por error (failover) de la misma manera; la diferencia es si el secundario trabaja durante la operación normal.",
   "Los enlaces de heartbeat transportan las señales de salud del clúster y la sincronización de configuración y sesiones entre los miembros. Dedicas una o, mejor aún, dos interfaces al heartbeat y las conectas directamente o a través de un switch dedicado. Dos enlaces de heartbeat eliminan un punto único de falla: si falla el único cable de heartbeat, cada equipo cree que el otro está caído y obtienes un split brain con dos primarios.",
   "La elección del primario decide qué equipo lidera, y el orden de los criterios de desempate depende del ajuste override. Con override deshabilitado (el valor predeterminado), FGCP compara, en este orden: el número de interfaces monitoreadas conectadas (más es mejor), luego el uptime de HA (más largo es mejor, por encima de un pequeño margen), luego la prioridad del dispositivo (más alta es mejor) y luego el número de serie (el más alto gana como desempate final). Como aquí el uptime se evalúa antes que la prioridad, subir la prioridad de un equipo que regresa no hace que recupere el rol de primario.",
   "Con override habilitado, el orden cambia para que la prioridad del dispositivo se compare antes que el uptime: interfaces monitoreadas, luego prioridad, luego uptime y luego número de serie. Esto hace que un equipo preferido específico recupere el rol de primario después de recuperarse, a costa de un failover adicional cuando regresa. Las interfaces monitoreadas (de enlace) son puertos que le indicas a HA que vigile; perder uno reduce la posición de un equipo y puede provocar un failover.",
   "En un laboratorio con dos equipos con licencia, configurarías el mismo ID de grupo y las prioridades, conectarías los enlaces de heartbeat y observarías la elección. Con un solo equipo, estudia el orden de elección hasta que puedas recitar tanto la secuencia con override deshabilitado como la de override habilitado."
  ],
  "terms": [
   [
    "FGCP",
    "FortiGate Clustering Protocol, que une FortiGates idénticos en un solo clúster HA con direcciones virtuales compartidas."
   ],
   [
    "Active-passive vs active-active (activo-pasivo vs activo-activo)",
    "Activo-pasivo: solo el primario reenvía tráfico. Activo-activo: el primario además distribuye sesiones de inspección a los secundarios."
   ],
   [
    "Heartbeat link (enlace de heartbeat)",
    "Una interfaz dedicada que transporta la salud de HA, la sincronización de configuración y la de sesiones; se usan dos para evitar el split brain."
   ],
   [
    "Override",
    "Un ajuste de HA que coloca la prioridad del dispositivo antes del uptime en la elección, para que un equipo preferido recupere el rol de primario tras recuperarse."
   ]
  ],
  "example": "Un administrador sube la prioridad HA del secundario a 250 esperando que se convierta en primario, pero con override deshabilitado el primario actual sigue liderando porque su uptime de HA se compara antes que la prioridad.",
  "tip": "Memoriza ambos órdenes de elección. Override deshabilitado: interfaces, uptime, prioridad, número de serie. Override habilitado: interfaces, prioridad, uptime, número de serie. La prioridad solo pesa temprano cuando override está activado.",
  "check": [
   [
    "Con override deshabilitado, ¿qué criterio decide el primario antes que la prioridad?",
    "El número de interfaces monitoreadas conectadas y luego el uptime de HA; la prioridad solo se evalúa después del uptime."
   ],
   [
    "¿En qué se diferencia activo-activo de activo-pasivo?",
    "En activo-activo el primario distribuye sesiones de inspección a los secundarios para que también procesen tráfico; en activo-pasivo solo el primario reenvía tráfico."
   ],
   [
    "¿Por qué usar dos enlaces de heartbeat?",
    "Para evitar un split brain: si falla el único heartbeat, cada equipo cree que el otro está caído y ambos se convierten en primarios."
   ]
  ]
 },
 {
  "t": "HA operations: session pickup, config sync, checksums, `get system ha status`, `execute ha manage`",
  "tt": "Operaciones de HA: session pickup, sincronización de configuración, checksums, `get system ha status`, `execute ha manage`",
  "body": [
   "Una vez que el clúster está funcionando, el trabajo diario de HA consiste en mantener sincronizados a los miembros y saber qué ocurre durante un failover. Tres funciones y dos comandos cubren la mayoría de las preguntas operativas del examen.",
   "Session pickup (también llamado sincronización de sesiones) copia la tabla de sesiones del primario a los secundarios para que las sesiones TCP establecidas sobrevivan a un failover. Está desactivado de forma predeterminada porque sincronizar cada sesión agrega carga de CPU y tráfico de heartbeat. Lo activas cuando importa la continuidad de las sesiones, por ejemplo transferencias de archivos largas, sesiones SSH o conexiones a bases de datos que de otro modo se caerían cuando el secundario toma el control. Ten en cuenta que, incluso con session pickup, algunas sesiones que requieren inspección basada en proxy pueden reiniciarse; de forma predeterminada solo se sincronizan las sesiones TCP (UDP e ICMP necesitan `session-pickup-connectionless`), y puedes habilitar `session-pickup-delay` para que solo se sincronicen las sesiones con más de 30 segundos de antigüedad.",
   "La sincronización de configuración mantiene idéntica la configuración de todos los miembros de forma automática. Haces los cambios en el primario y FGCP los envía a los secundarios, así que nunca editas directamente el secundario para los ajustes sincronizados. Para verificar la sincronización, FGCP calcula un checksum de cada área de la configuración en cada miembro y los compara. Si dos miembros aparecen fuera de sincronía en la GUI, comparas sus checksums para encontrar qué área difiere.",
   "El comando `get system ha status` muestra la salud del clúster desde la CLI: qué equipo es el primario, los miembros y sus números de serie, el uptime de HA, el estado de las interfaces monitoreadas y el estado de sincronización. Es tu primera parada para confirmar que el clúster está sano y ver quién lidera. Para examinar más a fondo qué difiere, `diagnose sys ha checksum cluster` imprime los checksums por área de todos los miembros para que puedas ubicar con precisión una discrepancia.",
   "El comando `execute ha manage` te permite saltar desde el equipo en el que iniciaste sesión a la CLI de otro miembro del clúster, para inspeccionar o ejecutar diagnósticos en el secundario sin conectarle un cable. Le indicas el índice del miembro y un inicio de sesión de administrador, y quedas en la consola de ese equipo a través del enlace de heartbeat.",
   "Una rutina operativa sana: revisa `get system ha status` después de cambios y después de cualquier failover, confirma que los checksums coincidan, mantén session pickup alineado con tus necesidades de continuidad y usa `execute ha manage` para llegar al otro miembro cuando necesites revisarlo directamente."
  ],
  "terms": [
   [
    "Session pickup (sincronización de sesiones)",
    "Sincronización de sesiones de HA que permite que las sesiones TCP establecidas sobrevivan a un failover; desactivada de forma predeterminada por su costo de CPU y heartbeat."
   ],
   [
    "Configuration sync (sincronización de configuración)",
    "La replicación automática de la configuración del primario a los secundarios para que todos los miembros permanezcan idénticos."
   ],
   [
    "HA checksum",
    "Un hash por área de configuración que se compara entre miembros para confirmar que están sincronizados; una discrepancia revela qué área difiere."
   ],
   [
    "execute ha manage",
    "Un comando de la CLI que te conecta desde un miembro del clúster a la consola de otro miembro a través del enlace de heartbeat."
   ]
  ],
  "example": "Después de un failover, los usuarios reportan que se cayeron sesiones SSH y transferencias de archivos grandes, así que el administrador habilita session pickup para que el siguiente failover conserve esas sesiones TCP en el nuevo primario.",
  "tip": "Session pickup está deshabilitado de forma predeterminada. Si una pregunta menciona sesiones que se caen durante un failover, la solución es habilitar session pickup, no agregar enlaces de heartbeat ni override.",
  "check": [
   [
    "¿Qué hace session pickup y por qué está desactivado de forma predeterminada?",
    "Sincroniza la tabla de sesiones para que las sesiones TCP sobrevivan a un failover; está desactivado de forma predeterminada porque agrega carga de CPU y de heartbeat."
   ],
   [
    "Dos miembros aparecen fuera de sincronía. ¿Qué comando encuentra el área que difiere?",
    "diagnose sys ha checksum cluster compara los checksums por área entre los miembros para revelar qué área de la configuración difiere."
   ],
   [
    "¿Cómo llegas a la CLI del secundario sin conectarle un cable?",
    "Usas execute ha manage desde el primario para conectarte a la consola de otro miembro a través del enlace de heartbeat."
   ]
  ]
 },
 {
  "t": "Security Fabric: root and downstream FortiGates, authorization, FortiAnalyzer/cloud logging requirement, Security Rating",
  "tt": "Security Fabric: FortiGates root y downstream, autorización, requisito de FortiAnalyzer/registro en la nube, Security Rating",
  "body": [
   "El Security Fabric une varios dispositivos Fortinet en un solo sistema coordinado con visibilidad compartida, vistas de topología y automatización. En su centro hay un FortiGate que actúa como root del Fabric; otros FortiGates se conectan a él como equipos downstream (descendentes), formando un árbol. El root agrega la información de todo el Fabric y es donde ves la topología de extremo a extremo y ejecutas las comprobaciones de todo el Fabric.",
   "Antes de que el root pueda operar el Fabric, necesita un destino de registros que pueda almacenar y correlacionar los datos del Fabric: FortiAnalyzer, o un servicio de registro en la nube como FortiGate Cloud. Este es un requisito previo obligatorio que al examen le gusta evaluar. Sin un almacén de registros soportado, las vistas y los informes del Fabric no tienen de dónde construirse, así que el root no puede formar el Fabric por completo.",
   "Unir un FortiGate downstream sigue un protocolo de acuerdo (handshake) claro, con dos lados. En el equipo downstream habilitas la conexión al Security Fabric y la apuntas a la dirección IP del equipo upstream (root). La conexión usa el protocolo Security Fabric (antes llamado FortiTelemetry), así que la interfaz upstream debe permitir Security Fabric Connection en su acceso administrativo. La unión no se completa hasta que el root autoriza al dispositivo downstream, lo que el administrador hace en el root aprobando el número de serie del equipo. Este paso de autorización es lo que impide que un dispositivo desconocido se una al Fabric sin que nadie lo note. Simplemente compartir una cuenta de FortiCare o construir un túnel VPN no crea un Fabric.",
   "Una vez unidos los dispositivos, Security Rating ejecuta un conjunto de comprobaciones de buenas prácticas y de seguridad en los dispositivos del Fabric, comparando tu configuración con las recomendaciones de Fortinet. Produce una puntuación y una lista priorizada de hallazgos con correcciones sugeridas, como ajustes débiles de administración, falta de HA o interfaces expuestas a la gestión. Es una herramienta de evaluación de postura y de endurecimiento (hardening), no una puntuación de reputación de sitios web ni un medidor de ancho de banda.",
   "Más allá de la visibilidad y la calificación, el Fabric permite respuestas coordinadas, por ejemplo automation stitches que ponen en cuarentena un host comprometido en varios dispositivos. Para el examen, quédate con tres hechos: el root necesita FortiAnalyzer o registro en la nube; los equipos downstream se conectan a la IP upstream y el root los autoriza por número de serie; y Security Rating califica tu configuración frente a las buenas prácticas con correcciones recomendadas.",
   "En un laboratorio habilitas el Fabric en una VM root (apuntándola a FortiGate Cloud para el registro) y, si tienes un segundo equipo, lo unes y lo autorizas; luego ejecutas un Security Rating y lees las recomendaciones."
  ],
  "terms": [
   [
    "Fabric root (raíz del Fabric)",
    "El FortiGate superior de un Security Fabric, que agrega la topología y requiere FortiAnalyzer o registro en la nube."
   ],
   [
    "Downstream FortiGate (FortiGate descendente)",
    "Un FortiGate que se une al Fabric conectándose a la IP upstream (root) y siendo autorizado por el root."
   ],
   [
    "Fabric authorization (autorización del Fabric)",
    "La aprobación por parte del root de un equipo downstream mediante su número de serie, que completa la unión y bloquea dispositivos desconocidos."
   ],
   [
    "Security Rating (calificación de seguridad)",
    "Una función del Fabric que compara los dispositivos con las buenas prácticas de Fortinet y devuelve una puntuación con correcciones priorizadas."
   ]
  ],
  "example": "Un FortiGate de sucursal se une al Fabric de la sede central habilitando la conexión al Security Fabric y apuntando a la IP de la sede; luego la sede autoriza a la sucursal por su número de serie. La sede ya envía sus registros a FortiGate Cloud, como el root lo requiere.",
  "tip": "Dos hechos del Fabric se repiten en el examen: el root debe tener FortiAnalyzer o registro en la nube, y los equipos downstream se autorizan por número de serie en el root. Una cuenta compartida o una VPN no forman un Fabric.",
  "check": [
   [
    "¿Qué debe tener el FortiGate root antes de que pueda formarse el Security Fabric?",
    "Un destino de registros que pueda almacenar los datos del Fabric: FortiAnalyzer o un servicio de registro en la nube como FortiGate Cloud."
   ],
   [
    "¿Cómo se une un FortiGate downstream al Fabric?",
    "Habilita la conexión al Fabric y apunta a la IP upstream (root); luego el root lo autoriza por su número de serie."
   ],
   [
    "¿Qué ofrece Security Rating?",
    "Comprobaciones de buenas prácticas en los dispositivos del Fabric con una puntuación y recomendaciones priorizadas, no una calificación de sitios web ni de ancho de banda."
   ]
  ]
 },
 {
  "t": "Automation stitches: triggers and actions (email, webhook, CLI script, quarantine)",
  "tt": "Automation stitches: triggers y acciones (correo electrónico, webhook, script de CLI, cuarentena)",
  "body": [
   "Los automation stitches son la forma integrada de FortiOS de reaccionar a eventos sin que una persona esté mirando una pantalla. Un stitch combina un trigger (algo que ocurre) con una o más acciones (algo que hacer), de modo que el FortiGate puede notificar, ejecutar un comando o contener una amenaza en el momento en que se cumple una condición. Se encuentran en la sección Security Fabric y pueden actuar localmente o en varios dispositivos del Fabric.",
   "Un trigger es el evento que inicia el stitch. Los triggers incluyen condiciones del registro de eventos de FortiOS (como un cambio de configuración, un inicio de sesión fallido de un administrador, un failover de HA, la entrada en conserve mode o el vencimiento de una licencia), eventos de seguridad (como una detección de IPS o antivirus o un indicador de host comprometido), una hora programada o un webhook entrante. Eliges el trigger que corresponda a la situación que describe la pregunta; para 'envíame un correo cada vez que cualquier administrador cambie la configuración', el trigger es un evento de cambio de configuración.",
   "Una acción es lo que hace el stitch cuando se dispara el trigger. Las acciones comunes son: enviar un correo electrónico; llamar a un webhook saliente (una solicitud HTTP a otro sistema, útil para integraciones de chat o de tickets); ejecutar un script de CLI en el FortiGate para cambiar la configuración automáticamente; y la cuarentena, que aísla un host comprometido, por ejemplo bloqueando (ban) su dirección o, con FortiSwitch/FortiAP, cortando su acceso a la red. Otras acciones incluyen notificaciones de AWS/Azure y FortiExplorer. Puedes encadenar varias acciones a un mismo trigger.",
   "En comparación con las alternativas, los stitches son el camino más simple hacia un comportamiento inmediato basado en eventos. Un informe programado no es inmediato, y reenviar syslog a otra herramienta requiere que esa herramienta se encargue de reaccionar. Así que cuando un escenario pide la forma más sencilla de recibir un correo al instante ante un evento específico, la respuesta es un automation stitch con el trigger correspondiente y una acción de correo electrónico.",
   "La cuarentena merece mención especial porque convierte la detección en contención: cuando un perfil de seguridad o el Fabric marca un host como comprometido, un stitch con una acción de cuarentena puede bloquear automáticamente ese host para que no se propague, dándole tiempo al SOC para investigar.",
   "En un laboratorio crearás un stitch con un trigger de cambio de configuración y una acción de correo electrónico; luego cambiarás un ajuste y confirmarás que llega el correo. Construir un stitch completo de principio a fin es suficiente para responder la mayoría de las preguntas del examen sobre triggers frente a acciones."
  ],
  "terms": [
   [
    "Automation stitch",
    "Una regla que combina un trigger con una o más acciones para que el FortiGate responda automáticamente a un evento."
   ],
   [
    "Trigger (disparador)",
    "El evento que inicia un stitch, como un cambio de configuración, una detección de seguridad, una programación o un webhook entrante."
   ],
   [
    "Action (acción)",
    "Lo que hace un stitch cuando se dispara: correo electrónico, webhook saliente, script de CLI o cuarentena, entre otras."
   ],
   [
    "Quarantine action (acción de cuarentena)",
    "Una acción que aísla un host comprometido (por ejemplo, bloqueando su dirección) para contener una amenaza automáticamente."
   ]
  ],
  "example": "Para alertar sobre cualquier cambio de un administrador, se construye un stitch con un trigger de cambio de configuración y una acción de correo electrónico; la próxima vez que se guarde un ajuste, el equipo de seguridad recibe un correo de inmediato.",
  "tip": "Cuando la pregunta pide la forma más sencilla de reaccionar al instante ante un evento, elige un automation stitch. Los informes programados y el reenvío de syslog no son inmediatos y requieren herramientas adicionales.",
  "check": [
   [
    "¿Qué dos partes forman un automation stitch?",
    "Un trigger (el evento) y una o más acciones (las respuestas, como correo electrónico, webhook, script de CLI o cuarentena)."
   ],
   [
    "¿Qué acción de un stitch puede contener automáticamente un host comprometido?",
    "La acción de cuarentena, que aísla o bloquea el host para que no se propague."
   ],
   [
    "¿Por qué un stitch es mejor que un informe diario para alertar sobre cambios de administradores?",
    "Un stitch se dispara de inmediato cuando ocurre el trigger, mientras que un informe programado solo se ejecuta según su programación."
   ]
  ]
 },
 {
  "t": "Logging: log types (traffic, event, security), severity, memory/disk/FortiAnalyzer/FortiGate Cloud/syslog, log allowed traffic",
  "tt": "Registro (logging): tipos de registro (tráfico, eventos, seguridad), severidad, memoria/disco/FortiAnalyzer/FortiGate Cloud/syslog, registrar el tráfico permitido",
  "body": [
   "Los registros (logs) son la forma de demostrar lo que hizo un FortiGate, y el examen evalúa tanto las categorías de registros como dónde se pueden almacenar. Domina el vocabulario y la mayoría de las preguntas se resuelven solas.",
   "FortiOS produce tres grandes tipos de registros. Los registros de tráfico (traffic logs) registran las sesiones que pasan por las políticas de firewall (origen, destino, servicio, bytes, la política que coincidió y si se permitió o se denegó). Los registros de eventos (event logs) registran lo que hace el propio sistema: inicios de sesión y cambios de los administradores, eventos de HA, negociación de VPN, cambios de enrutamiento y salud. Los registros de seguridad (security logs) registran las acciones de los perfiles de seguridad: detecciones de antivirus, bloqueos del filtro web, coincidencias de IPS, control de aplicaciones y filtrado DNS. Cuando alguien pregunta 'dónde vería que una política bloqueó un virus', eso es un registro de seguridad (UTM); 'quién inició sesión y cambió un ajuste' es un registro de eventos.",
   "Cada registro lleva un nivel de severidad, desde emergency y alert, pasando por critical, error, warning, notification e information, hasta debug. Puedes filtrar o limitar el registro por severidad para controlar el volumen, conservando, por ejemplo, warnings y niveles superiores y descartando las entradas informativas rutinarias.",
   "Los destinos de almacenamiento son el segundo eje. Los registros pueden ir a memoria, al disco local, a FortiAnalyzer, a FortiGate Cloud o a un servidor syslog, y puedes enviarlos a varios a la vez. El registro en memoria es pequeño y, lo más importante, se borra al reiniciar, así que sirve para un vistazo rápido pero no para el historial; después de una actualización de firmware y un reinicio, los registros en memoria desaparecen. El registro en disco sobrevive a los reinicios, pero está limitado por el disco y no existe en los modelos sin disco. Para tener un historial duradero y consultable, y generar informes de varios dispositivos, envías los registros a FortiAnalyzer, FortiGate Cloud o un recolector syslog.",
   "El ajuste 'Log allowed traffic' de una política de firewall controla cuánto registro de tráfico genera esa política. Las opciones son No Log, Security Events (registrar solo las sesiones sobre las que actuó un perfil de seguridad) y All Sessions (registrar cada sesión aceptada). Si un analista necesita un registro de cada conexión aceptada a través de una política, configúrala en All Sessions; Security Events por sí solo omitirá el tráfico permitido ordinario. Por otra parte, la política de denegación implícita no registra el tráfico denegado de forma predeterminada, así que para capturar los descartes habilitas el registro en ella.",
   "En un laboratorio configurarás una política para registrar All Sessions, generarás tráfico y leerás el registro de forward traffic; luego enviarás los registros a FortiGate Cloud para que sobrevivan a un reinicio."
  ],
  "terms": [
   [
    "Traffic log (registro de tráfico)",
    "Un registro de las sesiones que pasan por las políticas de firewall, incluida la política que coincidió y el resultado de permitir/denegar."
   ],
   [
    "Event log (registro de eventos)",
    "Un registro de la actividad propia del FortiGate: inicios de sesión y cambios de administradores, HA, VPN y salud del sistema."
   ],
   [
    "Security (UTM) log (registro de seguridad)",
    "Un registro de las acciones de los perfiles de seguridad, como eventos de antivirus, filtro web, IPS, control de aplicaciones y filtro DNS."
   ],
   [
    "Log allowed traffic (registrar tráfico permitido)",
    "Un ajuste por política (No Log, Security Events, All Sessions) que controla qué sesiones aceptadas se registran."
   ]
  ],
  "example": "Un FortiGate sin disco registra en memoria y, después de un reinicio por una actualización de firmware, los registros del día anterior desaparecieron, así que el administrador configura FortiGate Cloud (o FortiAnalyzer/syslog) para conservar un historial duradero.",
  "tip": "Los registros en memoria se borran al reiniciar. Para cualquier pregunta sobre conservar el historial de registros, la respuesta es un destino persistente: disco, FortiAnalyzer, FortiGate Cloud o syslog, no un búfer de memoria más grande.",
  "check": [
   [
    "¿Qué tipo de registro muestra que una política bloqueó un virus y cuál muestra el inicio de sesión de un administrador?",
    "El registro de seguridad (UTM) muestra el bloqueo del antivirus; el registro de eventos muestra el inicio de sesión del administrador."
   ],
   [
    "Una política registra solo eventos de seguridad, pero necesitas registrar cada sesión aceptada. ¿Qué cambias?",
    "Configura Log allowed traffic en All Sessions en esa política; Security Events solo registra las sesiones sobre las que actuó un perfil de seguridad."
   ],
   [
    "¿Por qué desaparecen los registros en memoria después de un reinicio?",
    "El registro en memoria no es persistente; se borra al reiniciar, así que el historial necesita disco, FortiAnalyzer, FortiGate Cloud o syslog."
   ]
  ]
 },
 {
  "t": "FortiGate-VM and cloud deployments: VM licensing, public cloud images, cloud-native firewall concepts",
  "tt": "FortiGate-VM e implementaciones en la nube: licenciamiento de VM, imágenes en nubes públicas, conceptos de firewall nativo de la nube",
  "body": [
   "FortiGate no es solo un equipo físico; el mismo FortiOS se ejecuta como máquina virtual (FortiGate-VM) en hipervisores y en nubes públicas. El examen espera que entiendas en qué se diferencian el licenciamiento y la implementación respecto del hardware, y algunas ideas nativas de la nube.",
   "Un FortiGate-VM necesita una licencia de software en lugar de venir con licencia de fábrica como un equipo físico. La licencia está ligada a un modelo virtual que fija límites como el número de vCPUs que la VM puede usar; agregar más vCPUs de las que permite la licencia no aumentará el rendimiento. Las licencias pueden ser perpetuas o por suscripción, y existe una VM de evaluación permanente y gratuita con límites estrictos (por ejemplo, una sola vCPU, poca RAM, unas pocas interfaces, pocas políticas y rutas, solo cifrados de baja intensidad y sin actualizaciones de FortiGuard), que es la que usas para practicar sin comprar nada. En los laboratorios registras la VM en FortiCloud y aplicas el archivo de licencia.",
   "En las nubes públicas (AWS, Azure, Google Cloud, Oracle Cloud y otras), Fortinet publica imágenes de FortiGate-VM listas para usar en el marketplace de la nube. Puedes implementarlas en modalidad Bring Your Own License (BYOL), donde aportas una licencia que compraste, o bajo demanda / pay-as-you-go (PAYG), donde el costo de la licencia se incluye en el cargo por hora de la nube. La implementación usa la propia red de la nube: las interfaces corresponden a NICs virtuales y subredes de la nube, y el enrutamiento y los grupos de seguridad de la nube dirigen el tráfico hacia el FortiGate.",
   "Los conceptos de firewall nativo de la nube difieren de los de un equipo local (on-premises). En lugar de ser un dispositivo físico en línea, el FortiGate-VM se ubica en una red virtual y las tablas de rutas de la nube dirigen el tráfico hacia él. La alta disponibilidad usa construcciones de la nube (por ejemplo, actualizar tablas de rutas o mover IPs elásticas mediante SDN connectors) en lugar de MACs compartidas. Los SDN connectors de FortiOS permiten que las políticas hagan referencia a objetos de la nube (como etiquetas de instancias o grupos de seguridad), de modo que las reglas siguen a las cargas de trabajo que escalan hacia arriba y hacia abajo automáticamente. Fortinet también ofrece FortiFlex, un programa de licenciamiento por consumo basado en puntos para implementaciones elásticas, y FortiGate CNF, un servicio gestionado e independiente de firewall nativo de la nube.",
   "Los puntos del examen que perduran: FortiGate-VM se licencia por software con un modelo ligado a vCPUs, las nubes ofrecen imágenes en el marketplace en BYOL o PAYG, y la HA en la nube y las referencias a objetos dependen de mecanismos de la nube/SDN y no de las direcciones compartidas del equipo físico. No memorices las cifras exactas de la prueba gratuita, que cambian; conoce la forma general de los límites."
  ],
  "terms": [
   [
    "FortiGate-VM",
    "FortiOS ejecutándose como máquina virtual en un hipervisor o en una nube pública, licenciado por software."
   ],
   [
    "VM licensing, vCPU-bound (licenciamiento de VM ligado a vCPUs)",
    "Una licencia ligada a un modelo virtual que limita las vCPUs utilizables; las vCPUs adicionales más allá de la licencia no agregan capacidad."
   ],
   [
    "BYOL vs PAYG",
    "Modelos de licenciamiento en la nube: Bring Your Own License usa una licencia que compraste; pay-as-you-go cobra la licencia por hora a través del proveedor de nube."
   ],
   [
    "SDN connector (conector SDN)",
    "Una integración de FortiOS que permite que las políticas hagan referencia a objetos dinámicos de la nube (etiquetas, grupos de seguridad) para que las reglas sigan a las cargas de trabajo que escalan."
   ]
  ],
  "example": "Un equipo implementa un FortiGate-VM desde el marketplace de Azure en modalidad PAYG y luego usa un SDN connector para que una política que hace referencia a un grupo de seguridad de aplicaciones cubra automáticamente las nuevas VMs a medida que la aplicación escala.",
  "tip": "Agregar vCPUs más allá de lo que permite la licencia de la VM no aumenta el rendimiento. En la nube, recuerda que el tráfico llega al FortiGate mediante las tablas de rutas de la nube, y que la HA usa mecanismos SDN, no MACs compartidas.",
  "check": [
   [
    "¿Cómo se licencia un FortiGate-VM en comparación con un equipo físico?",
    "Necesita una licencia de software aparte, ligada a un modelo virtual que limita las vCPUs utilizables, en lugar de venir con licencia de fábrica como el hardware."
   ],
   [
    "¿Cuál es la diferencia entre BYOL y PAYG en una nube pública?",
    "BYOL usa una licencia que compraste; PAYG cobra la licencia por hora a través del proveedor de nube."
   ],
   [
    "¿Por qué la HA en la nube no usa direcciones MAC compartidas como un clúster de hardware?",
    "Las redes de nube pública no lo permiten; en su lugar, la HA usa construcciones de la nube, como actualizaciones de tablas de rutas y el traslado de IPs elásticas mediante SDN connectors."
   ]
  ]
 },
 {
  "t": "Diagnostics: `get system performance status`, `diagnose sys top`, conserve mode and av-failopen, `diagnose debug flow`, `diagnose sniffer packet`",
  "tt": "Diagnóstico: `get system performance status`, `diagnose sys top`, conserve mode y av-failopen, `diagnose debug flow`, `diagnose sniffer packet`",
  "body": [
   "Cuando un FortiGate se comporta mal, las herramientas de diagnóstico de la CLI te dicen si el problema está en los recursos, las políticas, el enrutamiento o la red. Saber qué comando usar es una habilidad muy evaluada.",
   "Para una instantánea rápida de la salud, `get system performance status` resume en una sola pantalla el uso de CPU, el uso de memoria, la cantidad de sesiones, el rendimiento de red y el uptime. Compáralo con `get system status`, que muestra el firmware, el número de serie y el modo de operación, pero no la carga en vivo. Para ver qué procesos están consumiendo CPU y memoria en este momento, `diagnose sys top` enumera los procesos más activos (como el top de Unix); puedes detectar un proceso descontrolado, como el motor de IPS o scanunit.",
   "La presión de memoria tiene un mecanismo específico. Cuando la memoria libre cae por debajo de un umbral rojo, el FortiGate entra en conserve mode (modo de conservación) para protegerse: deja de aceptar nuevas sesiones de inspección basada en proxy y puede descartar u omitir parte del trabajo hasta que la memoria se recupere. El ajuste global `av-failopen` decide qué pasa durante el conserve mode con el tráfico que necesita antivirus basado en proxy: pass (el valor predeterminado) lo deja pasar sin inspeccionar (disponibilidad por encima de seguridad), off deja de aceptar nuevas sesiones que necesitan escaneo AV (seguridad por encima de disponibilidad), y one-shot omite el escaneo AV desde el momento en que empieza el conserve mode y lo sigue omitiendo hasta que un administrador cambie el ajuste, incluso después de que la memoria se recupere. Esto es distinto de IPS fail-open, que gobierna el motor de IPS, así que lee la pregunta con atención.",
   "Para entender por qué se permite o se descarta una sesión específica, `diagnose debug flow` rastrea un paquete a través de la lógica del FortiGate: búsqueda de ruta, coincidencia de política, NAT y cualquier motivo de denegación. La secuencia habitual es: `diagnose debug reset`, `diagnose debug flow filter addr <ip>`, opcionalmente `filter port`, `diagnose debug flow show function-name enable`, `diagnose debug flow trace start <n>` para rastrear n paquetes, luego `diagnose debug enable` para que realmente se imprima la salida, y `diagnose debug disable` al terminar. Olvidar `diagnose debug enable` es la razón clásica por la que no aparece ninguna salida. Una línea clave que debes reconocer es 'Denied by forward policy check (policy 0)', que significa que ninguna política configurada coincidió y la denegación implícita descartó el tráfico.",
   "Cuando necesitas ver los paquetes en bruto en el cable, `diagnose sniffer packet <interface> '<filter>' <verbosity> <count>` captura tráfico como tcpdump, lo que te permite confirmar si los paquetes siquiera llegan a una interfaz y cómo salen. Una verbosidad mayor muestra encabezados y carga útil (payload); puedes capturar en la interfaz 'any'.",
   "Un buen orden de resolución de problemas: revisa los recursos con performance status y sys top, descarta el conserve mode, luego usa debug flow para ver la decisión y el sniffer para confirmar lo que realmente hay en el cable."
  ],
  "terms": [
   [
    "get system performance status",
    "Un resumen en la CLI de la carga en vivo de CPU, memoria, sesiones y rendimiento, más el uptime."
   ],
   [
    "Conserve mode (modo de conservación)",
    "Un estado de protección al que se entra cuando la memoria libre cruza un umbral, y que detiene la nueva inspección basada en proxy hasta que la memoria se recupera."
   ],
   [
    "av-failopen",
    "El ajuste global que decide si, durante el conserve mode, el tráfico que necesita antivirus proxy pasa sin inspeccionar (pass), se descarta (off) u omite el AV hasta que un administrador lo restablezca (one-shot)."
   ],
   [
    "diagnose debug flow",
    "Un rastreo de cómo el FortiGate maneja un paquete, que muestra la búsqueda de ruta, la coincidencia de política, NAT y cualquier motivo de denegación."
   ]
  ],
  "example": "No aparece ninguna salida durante un rastreo de flujo aunque el host está enviando tráfico; el administrador se da cuenta de que configuró el filtro e inició el rastreo, pero olvidó diagnose debug enable, que es necesario para imprimir el rastreo.",
  "tip": "av-failopen gobierna el antivirus proxy en conserve mode; IPS fail-open gobierna el motor de IPS. No los confundas. Y un rastreo de flujo no imprime nada hasta que ejecutes diagnose debug enable.",
  "check": [
   [
    "¿Qué comando da un resumen en una pantalla de CPU, memoria, sesiones y uptime?",
    "get system performance status; get system status muestra en cambio el firmware y el número de serie, no la carga en vivo."
   ],
   [
    "Durante el conserve mode, ¿qué ajuste decide si el tráfico de AV proxy pasa sin inspeccionar?",
    "av-failopen (pass/off/one-shot), que es independiente de IPS fail-open."
   ],
   [
    "¿Qué significa 'Denied by forward policy check (policy 0)' en un debug flow?",
    "Que ninguna política configurada coincidió, así que la denegación implícita (policy 0) descartó el tráfico."
   ]
  ]
 },
 {
  "t": "Firewall policy matching: incoming/outgoing interface, source (address, user, ISDB), destination, service, schedule; top-down first match; implicit deny (policy 0)",
  "tt": "Coincidencia de políticas de firewall: interfaz de entrada/salida, origen (dirección, usuario, ISDB), destino, servicio, horario; primera coincidencia de arriba hacia abajo; denegación implícita (policy 0)",
  "body": [
   "Las políticas de firewall son el corazón de un FortiGate, y entender exactamente cómo se asocia una sesión con una política es el concepto más evaluado del dominio de firewall. Una política es una regla ordenada que dice: para el tráfico que entra por esta interfaz y sale por aquella, desde estos orígenes hacia estos destinos, usando estos servicios durante este horario, toma esta acción (aceptar o denegar) y aplica estos ajustes.",
   "Los criterios de coincidencia son precisos. FortiGate compara la interfaz de entrada (origen) y la interfaz de salida (destino); el origen, que puede ser un objeto de dirección, un usuario o grupo de usuarios, o una entrada de Internet Service Database (ISDB); la dirección de destino (o ISDB/VIP); el servicio (puerto y protocolo); y el horario (schedule, cuándo está activa la política). Los perfiles de seguridad asociados a una política se aplican después de encontrar una coincidencia, así que nunca deciden qué política coincide. Del mismo modo, el ID de la política es solo una etiqueta y no afecta el orden.",
   "La evaluación es de arriba hacia abajo y gana la primera coincidencia. FortiGate lee la lista de políticas desde arriba y usa la primera política cuyos criterios coinciden todos con la sesión; no sigue buscando una regla más específica ni combina políticas. Esto tiene una consecuencia crítica: el orden de las políticas importa. Si una denegación amplia está por encima de un permiso específico, la denegación coincide primero y el permiso nunca se ejecuta. La solución es mover la política específica por encima de la amplia, no renumerar los IDs.",
   "Al final de la lista se encuentra la denegación implícita, que aparece como policy 0. Coincide con todo lo que ninguna política configurada coincidió y lo descarta; por eso un FortiGate deniega de forma predeterminada: el tráfico que no permitiste explícitamente se bloquea. La denegación implícita no registra de forma predeterminada, así que para ver lo que descarta habilitas el registro en ella. En un debug flow, la frase 'Denied by forward policy check (policy 0)' es la firma del tráfico que choca con esta denegación implícita.",
   "Así que, cuando resuelvas un problema del tipo 'la regla de permiso existe, pero los usuarios siguen sin poder conectarse', revisa el orden por encima de ella en busca de una coincidencia más amplia, verifica que las interfaces, el origen, el destino, el servicio y el horario coincidan, y confirma que el tráfico no esté siendo capturado por la policy 0.",
   "En un laboratorio construyes políticas LAN a WAN, DMZ a WAN y WAN a DMZ, y luego usas los registros de forward traffic y la herramienta policy lookup para confirmar qué política alcanza cada conexión de prueba y demostrar el comportamiento de primera coincidencia."
  ],
  "terms": [
   [
    "Matching criteria (criterios de coincidencia)",
    "Los campos que FortiGate compara para ubicar una sesión: interfaz de entrada/salida, origen, destino, servicio y horario."
   ],
   [
    "Top-down first match (primera coincidencia de arriba hacia abajo)",
    "Las políticas se evalúan en el orden de la lista y se usa la primera que coincide; decide el orden, no el ID de la política."
   ],
   [
    "Implicit deny, policy 0 (denegación implícita)",
    "La regla final que descarta todo el tráfico que no coincidió con ninguna política, haciendo que el FortiGate deniegue de forma predeterminada; no registra de forma predeterminada."
   ],
   [
    "Security profile timing (momento de aplicación de los perfiles de seguridad)",
    "Los perfiles se aplican después de que una política coincide, así que nunca influyen en qué política se selecciona."
   ]
  ],
  "example": "Una regla de permiso para que RR. HH. llegue al sistema de nómina falla porque una política amplia 'deny LAN to server' está por encima de ella; mover el permiso específico de RR. HH. por encima de la denegación amplia lo soluciona, ya que gana la primera política que coincide.",
  "tip": "El ID de la política es solo una etiqueta. Cuando una regla específica no surte efecto, mira su posición en la lista, no su número, y revisa si una regla más amplia por encima coincide primero.",
  "check": [
   [
    "¿En qué orden se evalúan las políticas de firewall y cuál se aplica?",
    "De arriba hacia abajo; se aplica la primera política cuyos criterios coinciden todos con la sesión, y la evaluación se detiene ahí."
   ],
   [
    "¿Qué es la policy 0 y qué hace?",
    "La denegación implícita al final de la lista; descarta todo el tráfico que no coincidió con ninguna política configurada y no registra de forma predeterminada."
   ],
   [
    "Una política de permiso específica está debajo de una denegación amplia y nunca surte efecto. ¿Cuál es la solución?",
    "Mover el permiso específico por encima de la denegación amplia, porque gana la primera coincidencia; renumerar el ID no ayudaría."
   ]
  ]
 },
 {
  "t": "Address objects and groups, FQDN and geography objects, Internet Service Database (ISDB) entries",
  "tt": "Objetos y grupos de direcciones, objetos FQDN y de geografía, entradas de Internet Service Database (ISDB)",
  "body": [
   "Las políticas hacen referencia a los extremos de la red mediante objetos reutilizables en lugar de direcciones escritas directamente, lo que mantiene las reglas legibles y te permite cambiar una definición en un solo lugar. Conocer los tipos de objetos y cuándo encaja cada uno es una fuente constante de puntos en el examen.",
   "El objeto de dirección básico representa una subred o un rango IP: un solo host (con máscara /32), una subred o un rango de IPs. Le das un nombre y lo reutilizas como origen o destino en muchas políticas. Los grupos de direcciones agrupan varios objetos de dirección bajo un solo nombre para que una política pueda hacer referencia al grupo completo; editar el grupo cambia todas las políticas que lo usan.",
   "Un objeto de dirección FQDN (fully qualified domain name, nombre de dominio completo) hace referencia a un nombre como update.example.com. El FortiGate resuelve el nombre mediante DNS y mantiene actualizadas las IPs resultantes, de modo que una política puede seguir a un servicio incluso cuando cambia su dirección. El problema es que un objeto FQDN solo cubre las direcciones a las que resuelve ese nombre; un servicio grande en la nube publicado bajo muchos nombres de host no quedará cubierto por completo con un solo FQDN, y los FQDN comodín (wildcard) son amplios y dependen del comportamiento del DNS.",
   "Un objeto de dirección de geografía (geo) representa todos los rangos IP asignados a un país, usando los datos de IP a país de FortiGuard. Es útil para reglas generales, como bloquear conexiones entrantes desde países con los que nunca haces negocios, pero es demasiado amplio para identificar un servicio específico y puede capturar contenido alojado en la nube en regiones inesperadas.",
   "La Internet Service Database (ISDB) es el catálogo mantenido por Fortinet de servicios de Internet conocidos; cada entrada agrupa las direcciones IP, protocolos y puertos actuales de un servicio como Microsoft 365, un proveedor de nube específico o una categoría de servicios. Como FortiGuard mantiene actualizadas las entradas de la ISDB, usar un objeto ISDB como destino de una política es la forma limpia de permitir o controlar un servicio cuya lista de direcciones es grande y cambia constantemente, sin mantenerla a mano. Por eso, cuando un escenario pregunta cómo permitir Microsoft 365 sin seguir sus IPs cambiantes, la respuesta es la entrada de la ISDB y no un solo FQDN ni un objeto de país.",
   "En la práctica eliges el objeto más específico que encaje: un objeto o grupo de direcciones para tus propias subredes y servidores, FQDN para un solo host con nombre, geografía para reglas a nivel de país e ISDB para servicios públicos conocidos. En un laboratorio creas objetos de dirección para tu LAN y tu DMZ, los agrupas y usas un destino ISDB en una política de salida."
  ],
  "terms": [
   [
    "Address object / group (objeto / grupo de direcciones)",
    "Un host, subred o rango IP con nombre (objeto) o un conjunto de ellos (grupo), reutilizado en varias políticas."
   ],
   [
    "FQDN object (objeto FQDN)",
    "Un objeto de dirección basado en un nombre de dominio que el FortiGate resuelve mediante DNS y mantiene actualizado."
   ],
   [
    "Geography object (objeto de geografía)",
    "Un objeto de dirección que cubre todos los rangos IP de un país, basado en los datos de geolocalización de FortiGuard."
   ],
   [
    "Internet Service Database (ISDB)",
    "Un catálogo mantenido por FortiGuard de servicios públicos con sus direcciones, protocolos y puertos actuales, utilizable como origen o destino de una política."
   ]
  ],
  "example": "Para permitir Microsoft 365 sin mantener su larga y cambiante lista de IPs, un administrador configura como destino de la política la entrada ISDB de Microsoft 365, que FortiGuard mantiene actualizada automáticamente.",
  "tip": "Para un servicio grande y cambiante en la nube, elige la entrada de la ISDB. Un solo FQDN omite muchos extremos, y un objeto de geografía es demasiado amplio para identificar un servicio.",
  "check": [
   [
    "¿Qué tipo de objeto permite mejor un servicio grande en la nube con IPs que cambian constantemente?",
    "Una entrada de la ISDB, porque FortiGuard mantiene sus direcciones y puertos actualizados automáticamente."
   ],
   [
    "¿Cuál es la limitación de usar un solo objeto FQDN para un servicio grande?",
    "Solo cubre las direcciones a las que resuelve ese único nombre, así que omite los muchos otros nombres de host y extremos del servicio."
   ],
   [
    "¿Qué representa un objeto de dirección de geografía?",
    "Todos los rangos IP asignados a un país según la geolocalización de FortiGuard; útil para reglas a nivel de país, pero demasiado amplio para identificar un servicio específico."
   ]
  ]
 },
 {
  "t": "Policy logging, policy lookup tool, policy ID vs sequence, schedules",
  "tt": "Registro de políticas, herramienta policy lookup, ID de política vs secuencia, horarios",
  "body": [
   "Además de escribir políticas, necesitas operarlas: confirmar cuál alcanza el tráfico, capturar los registros correctos, entender cómo se identifican las políticas y controlar cuándo se aplican. Estos detalles operativos aparecen en preguntas de escenario.",
   "El registro de una política se configura por política mediante la opción Log allowed traffic: No Log, Security Events (solo las sesiones sobre las que actuó un perfil de seguridad) o All Sessions (cada sesión aceptada). Para tener un registro completo de las conexiones aceptadas a través de una política, elige All Sessions; Security Events por sí solo no mostrará el tráfico permitido ordinario. El tráfico denegado se maneja por separado: la denegación implícita no registra de forma predeterminada, así que habilita el registro en ella para registrar los descartes. Luego los registros aparecen en la vista de forward traffic con el ID de la política que coincidió.",
   "La herramienta policy lookup te permite ingresar los parámetros de una sesión hipotética (interfaz de origen, dirección de origen y de destino, servicio, etc.) y le pregunta al FortiGate con qué política coincidiría esa sesión. Evalúa la lista real de políticas de arriba hacia abajo y resalta la política ganadora, así que puedes demostrar el orden y resolver dudas del tipo '¿qué regla captura esto?' sin generar tráfico real. Combinada con los registros de forward traffic, resuelve rápidamente las discusiones sobre el orden de las políticas.",
   "El ID de política frente a la secuencia es una distinción que confunde a muchos. Cada política recibe un ID de política cuando se crea, y mover la política nunca cambia ese número; es solo una etiqueta estable que se usa en los registros y en la CLI. La secuencia es la posición de la política en la lista, que es lo que realmente determina el orden de coincidencia. Reordenar las políticas en la GUI cambia su secuencia, pero no sus IDs, así que una política con un ID alto puede estar primera en la lista y coincidir antes que políticas con IDs más bajos. Razona siempre sobre el orden por la secuencia, no por el ID.",
   "Los horarios (schedules) controlan cuándo está activa una política. Un horario recurrente se repite en los días de la semana elegidos y en un rango de horas (por ejemplo, días hábiles de 12:00 a 13:00), así que es la herramienta correcta para 'permitir esto solo durante el almuerzo en días hábiles'. Un horario de una sola vez (one-time) está activo una vez durante una única ventana de inicio a fin y luego vence, lo que es adecuado para accesos temporales, como la semana de un contratista. Asociar el horario correcto a una política de permiso aplica el acceso por horario sin tener que activarlo y desactivarlo manualmente.",
   "En un laboratorio configuras una política para registrar All Sessions, usas la herramienta policy lookup para confirmar con qué política coincide una sesión de prueba y asocias un horario recurrente para demostrar el control por horario."
  ],
  "terms": [
   [
    "Policy lookup tool (herramienta de búsqueda de políticas)",
    "Una herramienta de la GUI que toma parámetros de una sesión hipotética e indica con qué política coincidirían, usando el orden real de la lista."
   ],
   [
    "Policy ID (ID de política)",
    "Una etiqueta estable asignada al crearla que no cambia cuando la política se mueve; identifica una política en los registros y la CLI, pero no define el orden de coincidencia."
   ],
   [
    "Sequence (secuencia)",
    "La posición de una política en la lista, que es lo que realmente determina el orden de coincidencia de arriba hacia abajo."
   ],
   [
    "Recurring vs one-time schedule (horario recurrente vs de una sola vez)",
    "Los horarios recurrentes se repiten en los días y horas elegidos; los de una sola vez están activos una vez durante una única ventana y luego vencen."
   ]
  ],
  "example": "Para permitir sitios de juegos solo a la hora del almuerzo, un administrador asocia a la política de permiso un horario recurrente para días hábiles de 12:00 a 13:00, de modo que la regla solo está activa en esa ventana.",
  "tip": "El ID de política es fijo y no define el orden; la secuencia (posición en la lista) sí. Reordenar cambia la secuencia, no los IDs, así que nunca razones sobre la coincidencia a partir del número de ID.",
  "check": [
   [
    "¿Qué te indica la herramienta policy lookup?",
    "Con qué política coincidiría una sesión hipotética, según el orden real de las políticas de arriba hacia abajo."
   ],
   [
    "¿Cambiar la posición de una política cambia su ID de política?",
    "No. Reordenar cambia la secuencia (la posición y el orden de coincidencia); el ID de política sigue siendo el mismo."
   ],
   [
    "¿Qué tipo de horario encaja con 'permitir solo días hábiles de 12:00 a 13:00'?",
    "Un horario recurrente, que se repite en los días y horas elegidos; un horario de una sola vez se ejecuta solo una vez."
   ]
  ]
 },
 {
  "t": "Source NAT: outgoing interface address, IP pools (overload, one-to-one, fixed port range, port block allocation)",
  "tt": "Source NAT: dirección de la interfaz de salida, IP pools (overload, one-to-one, fixed port range, port block allocation)",
  "body": [
   "Source NAT (SNAT) reescribe la dirección de origen del tráfico saliente para que las direcciones privadas internas se conviertan en una dirección pública enrutable. En un FortiGate, la forma más simple está integrada en una política, y las implementaciones más grandes usan IP pools. El examen quiere que elijas la opción de SNAT correcta para cada escenario.",
   "El SNAT predeterminado consiste en habilitar NAT en la política y traducir usando la dirección de la interfaz de salida. Cada host interno que sale por esa política parece provenir de la IP WAN del FortiGate, y la traducción de direcciones de puerto (PAT) multiplexa muchos hosts detrás de esa única IP asignándole a cada sesión un puerto de origen único. Esta es la opción más sencilla cuando tienes una sola IP pública, y es la respuesta correcta a 'muchos usuarios, una dirección pública'.",
   "Los IP pools te dan más control al traducir a un conjunto de direcciones en lugar de a la IP de la interfaz. Un pool overload funciona como el método de la dirección de la interfaz, pero con un rango de IPs públicas: muchos hosts internos comparten las direcciones del pool usando traducción de puertos, de modo que unas pocas IPs públicas pueden atender a cientos o miles de usuarios. Este es el tipo de pool para 'muchos usuarios compartiendo unas pocas IPs públicas'.",
   "Un pool one-to-one asigna a cada host interno su propia dirección pública, sin traducción de puertos. Como no hay PAT, la cantidad de usuarios simultáneos está limitada al número de direcciones del pool: un pool de cuatro direcciones significa que solo cuatro hosts pueden traducirse a la vez. Usas one-to-one cuando un host siempre debe presentar una IP pública específica y no compartida.",
   "Un pool fixed port range asigna rangos de direcciones internas a IPs externas y a un rango de puertos definido de forma predecible, lo que ayuda cuando debes correlacionar en los registros un host interno con su rango de puertos externo (útil para cumplimiento normativo y para el seguimiento de nivel operador, carrier-grade). Port block allocation (PBA) asigna a cada host interno un bloque contiguo de puertos en una IP pública, de nuevo para tener un mapeo predecible y fácil de registrar sin dejar de compartir direcciones; reduce el volumen de registros por sesión en comparación con overload puro.",
   "Cómo elegir entre ellos: la dirección de la interfaz de salida para una IP y muchos usuarios; overload para compartir varias IPs entre muchos usuarios; one-to-one cuando cada host necesita una IP pública dedicada (y aceptas el límite de usuarios); fixed port range o PBA cuando necesitas un mapeo de puertos de origen predecible y auditable. En un laboratorio habilitas NAT con la dirección de la interfaz, luego creas un pool overload y observas el origen traducido en el registro de tráfico."
  ],
  "terms": [
   [
    "Source NAT (SNAT) / PAT",
    "Reescritura de la dirección de origen del tráfico saliente; la traducción de direcciones de puerto permite que muchos hosts compartan una IP pública mediante puertos de origen únicos."
   ],
   [
    "Overload IP pool (IP pool overload)",
    "Un pool en el que muchos hosts internos comparten las direcciones públicas del pool usando traducción de puertos."
   ],
   [
    "One-to-one IP pool (IP pool uno a uno)",
    "Un pool que asigna a cada host su propia dirección pública sin traducción de puertos, lo que limita los usuarios simultáneos al tamaño del pool."
   ],
   [
    "Fixed port range / port block allocation (rango de puertos fijo / asignación de bloques de puertos)",
    "Tipos de pool que asignan hosts internos a IPs externas y a rangos/bloques de puertos predecibles para un registro auditable."
   ]
  ],
  "example": "Una empresa con cuatro IPs públicas necesita 800 usuarios conectados para navegar hacia afuera, así que usa un pool overload que comparte las cuatro direcciones mediante traducción de puertos; un pool one-to-one permitiría solo cuatro usuarios a la vez.",
  "tip": "One-to-one limita los usuarios simultáneos al número de direcciones del pool porque no usa traducción de puertos. Para muchos usuarios con pocas IPs, elige siempre overload.",
  "check": [
   [
    "¿Cuál es el SNAT más sencillo para muchos usuarios detrás de una sola IP pública?",
    "Habilitar NAT en la política usando la dirección de la interfaz de salida, lo que oculta todos los hosts detrás de la IP WAN mediante traducción de puertos."
   ],
   [
    "¿Por qué un IP pool one-to-one limita cuántos hosts pueden conectarse?",
    "Asigna a cada host su propia dirección pública sin traducción de puertos, así que solo pueden traducirse a la vez tantos hosts como direcciones tenga el pool."
   ],
   [
    "¿Qué tipo de pool comparte varias IPs públicas entre muchos usuarios?",
    "Un pool overload, que usa traducción de puertos entre las direcciones del pool."
   ]
  ]
 },
 {
  "t": "Central SNAT table and when to use it",
  "tt": "La tabla de Central SNAT y cuándo usarla",
  "body": [
   "FortiGate ofrece dos formas de definir source NAT. La predeterminada es el NAT por política, en el que marcas NAT en cada política de firewall y eliges la dirección de la interfaz de salida o un IP pool. La alternativa es central SNAT, que saca todas las decisiones de source NAT de las políticas individuales y las lleva a una única tabla dedicada y ordenada. Saber por qué y cuándo cambiar es el enfoque del examen.",
   "Con central SNAT habilitado, las políticas de firewall ya no tienen un interruptor de NAT; en su lugar construyes entradas en la tabla de central SNAT, cada una especificando las direcciones de origen y destino, las interfaces de origen y destino, y la traducción (dirección de la interfaz de salida o un IP pool). La tabla se evalúa de arriba hacia abajo como las políticas, y la primera entrada que coincide decide cómo se traduce el origen. El NAT de destino sigue usando VIPs, pero en el modo central NAT las VIPs se aplican automáticamente desde la tabla DNAT & Virtual IPs: una política de firewall ya no selecciona la VIP como su destino y, en su lugar, hace referencia a la dirección interna (mapeada).",
   "La ventaja de central SNAT es un control centralizado y granular. Como el SNAT se define de forma independiente de las políticas de seguridad, puedes aplicar distintas traducciones según el origen y el destino sin duplicar políticas de firewall, y puedes ver todo el comportamiento de NAT en un solo lugar en vez de buscarlo entre muchas políticas. Esto conviene en entornos complejos donde se necesitan varias rutas de salida, IP pools o traducciones específicas por destino, y donde el NAT por política se volvería difícil de manejar o inconsistente.",
   "La contrapartida es que los dos modelos son mutuamente excluyentes y cambiar tiene consecuencias. Cuando habilitas central SNAT, los ajustes de NAT por política dejan de usarse, así que debes recrear las traducciones necesarias como entradas de la tabla o el tráfico que dependía del NAT por política saldrá sin traducir (y probablemente fallará). También cambia el lugar donde tú y cualquier otro administrador buscan el NAT, así que es una decisión de arquitectura deliberada, no un ajuste por regla.",
   "Para el examen, quédate con estos puntos: central SNAT traslada el source NAT de las políticas individuales a una tabla ordenada aparte; se elige para tener un control de SNAT centralizado y que tenga en cuenta el destino en configuraciones complejas; el NAT de destino sigue usando VIPs; y el NAT por política y central SNAT no pueden estar vigentes a la vez. Si una pregunta dice 'habilitamos central SNAT', el cambio clave es que el SNAT ahora vive en su propia tabla y no en cada política.",
   "En un laboratorio, habilitar central SNAT y luego recrear tu traducción de salida como una entrada de la tabla muestra tanto el mecanismo como la trampa de que las políticas dejan de traducir por sí solas."
  ],
  "terms": [
   [
    "Central SNAT",
    "Un modo en el que todas las reglas de source NAT viven en una única tabla ordenada en lugar de en las políticas de firewall individuales."
   ],
   [
    "Per-policy NAT (NAT por política)",
    "El modo predeterminado en el que cada política de firewall tiene su propio interruptor de NAT y su elección de traducción."
   ],
   [
    "Central SNAT table order (orden de la tabla de central SNAT)",
    "La evaluación de arriba hacia abajo de las entradas de central SNAT, donde la primera entrada que coincide decide la traducción."
   ],
   [
    "DNAT independence (independencia del DNAT)",
    "El NAT de destino sigue usando VIPs, esté o no habilitado central SNAT."
   ]
  ],
  "example": "Una empresa con varios enlaces de salida y traducciones específicas por destino habilita central SNAT para que todas las reglas de source NAT estén en una sola tabla ordenada, logrando un NAT consistente y que tiene en cuenta el destino sin duplicar políticas de firewall.",
  "tip": "Central SNAT y el NAT por política son mutuamente excluyentes. Después de habilitar central SNAT, las políticas ya no traducen por sí solas; debes recrear las traducciones como entradas de la tabla o el tráfico saldrá sin traducir.",
  "check": [
   [
    "¿Qué cambia cuando se habilita central SNAT?",
    "El source NAT sale de las políticas individuales y pasa a una tabla de SNAT aparte, evaluada de arriba hacia abajo; el NAT de destino sigue usando VIPs."
   ],
   [
    "¿Por qué elegir central SNAT?",
    "Para tener un control de source NAT centralizado y que tenga en cuenta el destino en entornos complejos, con todas las reglas de NAT visibles en un solo lugar."
   ],
   [
    "¿Puedes usar NAT por política y central SNAT al mismo tiempo?",
    "No; son mutuamente excluyentes, y después de habilitar central SNAT los ajustes de NAT por política dejan de usarse."
   ]
  ]
 },
 {
  "t": "Destination NAT with VIPs: static NAT, port forwarding, VIP groups",
  "tt": "Destination NAT con VIPs: static NAT, port forwarding, grupos de VIPs",
  "body": [
   "El NAT de destino (DNAT) permite que usuarios externos lleguen a un servidor interno traduciendo una dirección de destino pública (y, opcionalmente, un puerto) a una privada. En FortiGate, el DNAT se hace con un objeto Virtual IP (VIP), y esta es una de las tareas prácticas más comunes que evalúa el examen.",
   "Una VIP asigna una IP/puerto externo a una IP/puerto interno (mapeado). Una vez creada, la VIP se usa como destino en una política de firewall de entrada, normalmente desde la interfaz WAN hacia la interfaz donde está el servidor. La política también necesita el servicio correcto y los perfiles de seguridad que correspondan, y debe limitarse solo a los puertos que el servidor realmente usa. El FortiGate reescribe el destino en los paquetes entrantes y lo revierte en las respuestas, así que desde el punto de vista del cliente está hablando con la dirección pública. Es importante que el DNAT se configura con la VIP, no con un IP pool ni con SNAT, que cambian el origen.",
   "Hay dos variantes principales de VIP. Static NAT (VIP uno a uno) asigna toda la dirección externa a toda la dirección interna para todos los puertos, de modo que el host interno es accesible en los mismos puertos que la dirección externa. Port forwarding (reenvío de puertos) asigna un puerto externo específico a un puerto interno específico, por ejemplo el TCP 8443 externo al TCP 443 del servidor, para que puedas publicar un servicio en un puerto externo no estándar o compartir una IP pública entre varios servidores internos según el puerto. Port forwarding reescribe tanto la dirección como el puerto; un objeto de servicio del firewall solo compara tráfico y nunca reescribe puertos, lo cual es un distractor frecuente.",
   "Los grupos de VIPs agrupan varias VIPs bajo un solo nombre para que una sola política pueda hacer referencia a muchos servicios publicados a la vez, manteniendo ordenada la lista de políticas cuando expones varios servidores. Un grupo de VIPs se usa igual que una sola VIP: como destino de una política de entrada.",
   "Dos hechos que conviene interiorizar: el destino de la política de entrada es la VIP (no la IP interna), y el FortiGate tiene en cuenta el DNAT, así que no agregas una ruta estática aparte hacia el host interno para el camino de regreso. Cuando un escenario dice 'haz que el servidor interno X sea accesible en la IP pública Y', la respuesta es una VIP referenciada por una política de WAN hacia la red interna; cuando agrega 'en un puerto externo diferente', la respuesta es una VIP de port forwarding.",
   "En un laboratorio publicas un pequeño servidor web mediante una VIP de port forwarding del 8443 externo al 8080 interno y lo pruebas desde el lado WAN."
  ],
  "terms": [
   [
    "Virtual IP (VIP) (IP virtual)",
    "Un objeto de FortiGate que realiza NAT de destino asignando una IP/puerto externo a uno interno."
   ],
   [
    "Static NAT VIP (VIP de NAT estático)",
    "Una VIP que asigna toda la dirección externa a la dirección interna para todos los puertos (uno a uno)."
   ],
   [
    "Port forwarding VIP (VIP de reenvío de puertos)",
    "Una VIP que asigna un puerto externo específico a un puerto interno específico, reescribiendo tanto la dirección como el puerto."
   ],
   [
    "VIP group (grupo de VIPs)",
    "Un conjunto de VIPs referenciadas juntas como destino de una sola política de entrada."
   ]
  ],
  "example": "Para publicar a usuarios externos, en el puerto 8443, una aplicación interna que escucha en el 443, un administrador crea una VIP de port forwarding que asigna el 8443 externo al 443 mapeado y la referencia como destino de una política de WAN a DMZ.",
  "tip": "El destino de la política de entrada es la propia VIP, no la IP interna. Y solo una VIP de port forwarding reescribe el puerto; un objeto de servicio simplemente compara tráfico y nunca traduce puertos.",
  "check": [
   [
    "¿Qué objeto realiza NAT de destino en un FortiGate y cómo se usa?",
    "Una VIP; asigna una dirección/puerto externo a uno interno y se referencia como destino de una política de firewall de entrada."
   ],
   [
    "¿Cómo publicas en el puerto externo 8443 un servidor que escucha en el 443?",
    "Creas una VIP de port forwarding que asigna el 8443 externo al 443 mapeado; un objeto de servicio no puede reescribir el puerto."
   ],
   [
    "¿Para qué sirve un grupo de VIPs?",
    "Para agrupar varias VIPs de modo que una sola política de entrada pueda publicar varios servidores internos a la vez."
   ]
  ]
 },
 {
  "t": "Firewall authentication: local users, LDAP (regular bind), RADIUS and TACACS+ servers, user groups",
  "tt": "Autenticación en el firewall: usuarios locales, LDAP (regular bind), servidores RADIUS y TACACS+, grupos de usuarios",
  "body": [
   "La autenticación en el firewall permite que las políticas permitan o denieguen tráfico según quién es el usuario, no solo según su dirección IP. FortiGate puede autenticar usuarios contra varios tipos de almacenes de identidad, y la forma en que los conectas a las políticas mediante grupos de usuarios es un tema fijo del examen.",
   "El almacén más simple son los usuarios locales, definidos directamente en el FortiGate con un nombre de usuario y una contraseña. Las cuentas locales sirven para unos pocos usuarios o para trabajo de laboratorio, pero no escalan, ya que cada cuenta se mantiene a mano en el equipo.",
   "Para directorios empresariales, LDAP integra FortiGate con Active Directory u otros servidores LDAP. FortiGate debe hacer bind (iniciar sesión) en el directorio para buscar usuarios y leer su pertenencia a grupos. Regular bind usa una cuenta de servicio dedicada (un distinguished name y una contraseña) para que el FortiGate pueda buscar en el directorio, que es lo que Active Directory normalmente exige porque rechaza las búsquedas anónimas. Anonymous bind no guarda credenciales, pero por lo general no puede leer la pertenencia a grupos de AD, y simple bind autentica un único DN conocido y no puede buscar grupos. Así que, para políticas basadas en grupos de AD, regular bind es la opción esperada.",
   "RADIUS y TACACS+ son protocolos de autenticación hacia servidores AAA externos. RADIUS se usa ampliamente para la autenticación de usuarios y puede devolver atributos de grupo o rol; TACACS+ es común para la administración de dispositivos y separa la autenticación, la autorización y la contabilidad (accounting). FortiGate puede usar cualquiera de los dos como servidor de autenticación remoto para usuarios del firewall (y para administradores). Defines el servidor (dirección y secreto compartido) y luego lo referencias.",
   "Los grupos de usuarios son el pegamento entre una fuente de identidad y una política. Un grupo de usuarios del firewall puede contener usuarios locales y/o hacer referencia a servidores remotos con una coincidencia de grupo, por ejemplo 'miembros del grupo de AD Sales en este servidor LDAP'. Las políticas aceptan grupos de usuarios como origen (junto con objetos de dirección o en lugar de ellos), así que para exigir que solo Sales pueda usar una política creas un grupo de usuarios vinculado al servidor LDAP y al DN del grupo Sales, y luego defines ese grupo como origen de la política. Las políticas usan grupos de usuarios, no entradas de servidor LDAP directamente, lo cual es una trampa común.",
   "En un laboratorio agregas un AD de Windows o de Samba como servidor LDAP con regular bind, creas un grupo de usuarios que coincida con un grupo de AD y exiges ese grupo en una política, confirmando que solo sus miembros pueden pasar."
  ],
  "terms": [
   [
    "Local user (usuario local)",
    "Una cuenta definida directamente en el FortiGate con su propio nombre de usuario y contraseña; sencilla, pero no escala."
   ],
   [
    "LDAP regular bind",
    "Usar el DN y la contraseña de una cuenta de servicio para que el FortiGate pueda buscar en el directorio y leer la pertenencia a grupos (lo exige AD)."
   ],
   [
    "RADIUS / TACACS+",
    "Protocolos de servidores AAA externos que FortiGate puede usar para autenticar usuarios y administradores; TACACS+ es común para la administración de dispositivos."
   ],
   [
    "User group (grupo de usuarios)",
    "Un objeto de FortiGate que combina usuarios locales y/o una coincidencia de grupo de un servidor remoto, referenciado como origen de una política para exigir autenticación."
   ]
  ],
  "example": "Para que solo los miembros de Sales de Active Directory usen una política, un administrador define el AD como servidor LDAP con regular bind, crea un grupo de usuarios que coincide con el DN del grupo Sales y define ese grupo como origen de la política.",
  "tip": "Las políticas hacen referencia a grupos de usuarios, no directamente a entradas de servidores LDAP/RADIUS. Para búsquedas de grupos en Active Directory, elige regular bind, ya que anonymous bind y simple bind no pueden buscar la pertenencia a grupos.",
  "check": [
   [
    "¿Qué tipo de bind LDAP permite a FortiGate buscar en Active Directory la pertenencia a grupos?",
    "Regular bind, usando el DN y la contraseña de una cuenta de servicio; anonymous bind y simple bind no pueden buscar grupos."
   ],
   [
    "¿Qué asocias a una política para exigir un grupo de AD específico?",
    "Un grupo de usuarios del firewall que hace referencia al servidor LDAP y al DN del grupo; las políticas usan grupos de usuarios, no entradas de servidor."
   ],
   [
    "¿Qué protocolo se usa comúnmente para la administración de dispositivos con autenticación, autorización y contabilidad separadas?",
    "TACACS+; RADIUS es más común para la autenticación general de usuarios."
   ]
  ]
 },
 {
  "t": "Active (captive portal) vs passive authentication, authentication timeouts, allowing DNS before login",
  "tt": "Autenticación activa (captive portal) vs pasiva, tiempos de espera de autenticación, permitir DNS antes del inicio de sesión",
  "body": [
   "FortiGate identifica a los usuarios de dos formas generales, activa y pasiva, y la diferencia decide lo que experimenta el usuario y lo que debes configurar. Esta distinción, junto con una trampa clásica del captive portal, se evalúa con frecuencia.",
   "La autenticación activa le pide credenciales al usuario. El mecanismo habitual es un captive portal (portal cautivo): cuando el tráfico de un usuario llega a una política que requiere autenticación y aún no está identificado, el FortiGate lo intercepta y presenta una página de inicio de sesión. El usuario escribe un nombre de usuario y una contraseña, que FortiGate verifica contra una fuente local, LDAP, RADIUS o TACACS+, y una vez autenticado, su tráfico se permite. La autenticación activa es explícita y funciona para cualquier usuario, pero lo interrumpe con una solicitud.",
   "La autenticación pasiva identifica a los usuarios sin solicitarles nada, aprendiendo quién ha iniciado sesión a partir de otra fuente. El ejemplo principal es FSSO (Fortinet Single Sign-On), que lee los eventos de inicio de sesión del dominio de Windows para que el FortiGate ya sepa qué usuario está detrás de una IP cuando llega su tráfico. Los métodos pasivos son transparentes para el usuario, pero dependen de esa fuente externa de identidad.",
   "Los tiempos de espera (timeouts) de autenticación controlan cuánto tiempo sigue siendo válida una sesión autenticada. FortiGate admite timeouts idle y hard: un idle timeout cierra la sesión de un usuario después de un período sin tráfico, mientras que un hard timeout la cierra un tiempo fijo después del inicio de sesión, sin importar la actividad. Ajustarlos equilibra la seguridad (reautenticación más frecuente) con la molestia para el usuario.",
   "La trampa del captive portal es esencial. La página de inicio de sesión solo se puede presentar en protocolos que llevan una sesión de navegador que el FortiGate puede redirigir, principalmente HTTP y HTTPS (también FTP y Telnet en algunos casos). Pero antes de que un navegador pueda siquiera llegar a un sitio web para ser redirigido, debe resolver el nombre del sitio mediante DNS, y el DNS por sí mismo no puede activar la página de inicio de sesión. Si la única política que permite el tráfico saliente requiere autenticación, el DNS queda bloqueado hasta el inicio de sesión, pero el inicio de sesión nunca puede ocurrir porque primero falla la resolución de nombres: un bloqueo mutuo (deadlock). La solución es permitir el DNS en una política ubicada por encima de la política de autenticación, sin requisito de usuario, para que los navegadores puedan resolver nombres y luego llegar al punto en que aparece el captive portal.",
   "Para el examen: activa significa una solicitud de credenciales (captive portal), pasiva significa aprendida de otra fuente (FSSO); los timeouts idle y hard gobiernan la duración de la sesión; y debes permitir el DNS antes de una política con captive portal. En un laboratorio exiges un grupo de AD con captive portal en una política y agregas por encima una política que permite DNS; luego observas que la página de inicio de sesión aparece solo después de que se resuelven los nombres."
  ],
  "terms": [
   [
    "Active authentication / captive portal (autenticación activa / portal cautivo)",
    "Solicitar explícitamente las credenciales del usuario mediante una página de inicio de sesión antes de permitir su tráfico."
   ],
   [
    "Passive authentication (autenticación pasiva)",
    "Identificar a los usuarios sin solicitarles nada, aprendiendo los inicios de sesión de otra fuente, normalmente FSSO."
   ],
   [
    "Idle vs hard timeout (tiempo de espera por inactividad vs absoluto)",
    "El idle timeout cierra la sesión de un usuario tras un período de inactividad; el hard timeout la cierra un tiempo fijo después del inicio de sesión, sin importar la actividad."
   ],
   [
    "DNS-before-login rule (regla de DNS antes del inicio de sesión)",
    "Una política que permite DNS sin autenticación, ubicada por encima de la política con captive portal, para que los navegadores puedan resolver nombres y llegar a la página de inicio de sesión."
   ]
  ],
  "example": "Los usuarios detrás de una política con captive portal nunca ven una página de inicio de sesión y la navegación falla porque el DNS solo está permitido por esa misma política; agregar por encima una política que permite DNS, sin requisito de usuario, permite resolver los nombres y el portal aparece.",
  "tip": "Los captive portals solo se activan con HTTP/HTTPS (y FTP/Telnet), y el DNS no puede activarlos. Permite siempre el DNS en una política por encima de la política de autenticación o el inicio de sesión será imposible.",
  "check": [
   [
    "¿Cuál es la diferencia entre la autenticación activa y la pasiva?",
    "La activa le pide credenciales al usuario (captive portal); la pasiva lo identifica a partir de otra fuente, como FSSO, sin solicitarle nada."
   ],
   [
    "¿Por qué se debe permitir el DNS antes de una política con captive portal?",
    "Los navegadores deben resolver nombres antes de llegar a un sitio, y el DNS no puede activar la página de inicio de sesión, así que sin una política que permita DNS por encima, el inicio de sesión nunca ocurre."
   ],
   [
    "¿Cuál es la diferencia entre un timeout de autenticación idle y uno hard?",
    "El idle cierra la sesión de un usuario tras un período de inactividad; el hard la cierra un tiempo fijo después del inicio de sesión, sin importar la actividad."
   ]
  ]
 },
 {
  "t": "FSSO: collector agent, DC agent mode vs polling mode, group filters, `diagnose debug authd fsso list`",
  "tt": "FSSO: collector agent, modo DC agent vs modo polling, filtros de grupos, `diagnose debug authd fsso list`",
  "body": [
   "Fortinet Single Sign-On (FSSO) es el principal método de autenticación pasiva para entornos Windows. Permite que el FortiGate aplique políticas basadas en usuarios y grupos sin pedirle nada a nadie, aprendiendo quién ha iniciado sesión en Active Directory y asociando su nombre de usuario y sus grupos a su dirección IP. Entender sus componentes y modos es un objetivo central del examen.",
   "En el centro está el collector agent, un servicio de Windows que recopila la información de inicios de sesión del dominio, mantiene la lista actual de usuarios conectados y sus grupos, y reenvía esas asociaciones de usuario-IP-grupo al FortiGate. Luego el FortiGate usa esas asociaciones para que, cuando llega tráfico desde una IP, ya sepa quién es el usuario y a qué grupos pertenece.",
   "Hay dos formas en que el collector se entera de los inicios de sesión. En el modo DC agent, se instala un pequeño DC agent en cada controlador de dominio; captura los eventos de inicio de sesión en el momento en que ocurren y los envía al collector agent en tiempo real. Esto es preciso y de baja latencia, pero requiere instalar software en cada DC. En el modo polling, no se ejecuta ningún agente en los DCs; en su lugar, el collector agent (o el propio FortiGate, en el polling sin agente) lee periódicamente y de forma remota los registros de eventos de seguridad de cada controlador de dominio. El polling no necesita software en los DCs, lo que agrada a los equipos de Windows que prohíben agentes adicionales, pero agrega retraso y carga porque los inicios de sesión se descubren en cada intervalo de sondeo y no al instante. Elegir entre ambos es un escenario común: 'no se permite software en los DCs' apunta al modo polling.",
   "Los filtros de grupos deciden qué grupos de AD reporta realmente FSSO al FortiGate. Como un directorio puede contener miles de grupos, FSSO solo envía los grupos que seleccionas en el filtro de grupos del collector (o del FortiGate). Si los miembros de un grupo recién creado nunca coinciden con las políticas, la causa habitual es que el grupo no se agregó al filtro de grupos, así que su pertenencia nunca se envía. Este es un punto clásico de resolución de problemas.",
   "Para verificar lo que ha aprendido el FortiGate, `diagnose debug authd fsso list` imprime las entradas actuales de inicio de sesión FSSO que tiene el FortiGate: el usuario, la IP de origen y los grupos. Es tu primera comprobación cuando 'las políticas basadas en usuarios no coinciden', porque muestra si el FortiGate realmente ve a ese usuario y los grupos esperados.",
   "En un laboratorio instalas el collector agent, eliges un modo, agregas al filtro de grupos los grupos que necesitas y confirmas las asociaciones con el comando diagnose antes de exigir un grupo FSSO en una política."
  ],
  "terms": [
   [
    "Collector agent (agente recolector)",
    "Un servicio de Windows que recopila datos de inicios de sesión y envía al FortiGate las asociaciones de usuario-IP-grupo."
   ],
   [
    "DC agent mode (modo DC agent)",
    "Un agente en cada controlador de dominio que envía los eventos de inicio de sesión al collector en tiempo real."
   ],
   [
    "Polling mode (modo polling / sondeo)",
    "El collector o el FortiGate leen periódicamente y de forma remota los registros de eventos de seguridad de los DCs, sin software en los DCs pero con más retraso."
   ],
   [
    "Group filter (filtro de grupos)",
    "La selección de grupos de AD que FSSO reporta al FortiGate; los grupos no seleccionados nunca se envían."
   ]
  ],
  "example": "Un equipo de Windows prohíbe instalar cualquier cosa en los controladores de dominio, así que el administrador usa el modo polling de FSSO, que lee de forma remota los registros de eventos de seguridad de los DCs en lugar de ejecutar un DC agent.",
  "tip": "Si los miembros de un grupo nuevo de AD nunca coinciden con las políticas, revisa primero el filtro de grupos de FSSO: probablemente ese grupo no está seleccionado, así que su pertenencia nunca se envía al FortiGate.",
  "check": [
   [
    "¿Qué hace el collector agent en FSSO?",
    "Recopila la información de inicios de sesión del dominio y reenvía al FortiGate las asociaciones de usuario-IP-grupo."
   ],
   [
    "¿Cuándo elegirías el modo polling en lugar del modo DC agent?",
    "Cuando no puedes instalar software en los controladores de dominio; el polling lee sus registros de eventos de seguridad de forma remota, a costa de cierto retraso."
   ],
   [
    "Los usuarios FSSO de un grupo nuevo nunca coinciden con las políticas. ¿Cuál es la causa probable?",
    "El grupo no está en el filtro de grupos de FSSO, así que su pertenencia nunca se envía; verifícalo con diagnose debug authd fsso list."
   ]
  ]
 },
 {
  "t": "Two-factor authentication with FortiToken",
  "tt": "Autenticación de dos factores con FortiToken",
  "body": [
   "La autenticación de dos factores (2FA) refuerza el inicio de sesión al exigir algo que el usuario sabe (una contraseña) más algo que tiene (un código de un solo uso). En FortiGate, el sistema de tokens propio de Fortinet es FortiToken, y saber cómo se asigna y dónde se aplica es un tema pequeño pero constante del examen.",
   "Un FortiToken genera una contraseña de un solo uso basada en el tiempo (TOTP), un código numérico corto que cambia cada 30 o 60 segundos. Viene en dos formas: FortiToken de hardware, un llavero físico que muestra el código, y FortiToken Mobile, una aplicación para smartphone que muestra el código. Cada token es un segundo factor distinto vinculado a una cuenta. FortiGate también admite códigos enviados por correo electrónico y SMS como segundos factores alternativos, pero FortiToken es el método dedicado del fabricante.",
   "El hecho operativo clave es que FortiToken se asigna por usuario. Registras el token en el FortiGate (los tokens móviles se activan contra FortiGuard), luego habilitas la autenticación de dos factores en la cuenta de usuario individual y le asignas ese token específico. Después de eso, cuando el usuario se autentica, ingresa su contraseña y luego el código actual de su token. Asignar tokens por cuenta es lo que espera el examen, a diferencia de distractores como 'habilitarlo solo en el perfil de administrador' o 'exigir contraseñas más largas', ninguno de los cuales agrega un segundo factor para los usuarios del firewall.",
   "El segundo factor se aplica dondequiera que se use la cuenta: a los usuarios del firewall que se autentican mediante un captive portal o una VPN se les puede exigir un token, y a los administradores se les puede exigir uno al iniciar sesión en la gestión. Así, el mismo mecanismo refuerza tanto el acceso de usuarios como el de administradores, asignado cuenta por cuenta.",
   "Por qué importa: las contraseñas por sí solas caen ante el phishing, la reutilización y la adivinación. Una contraseña robada es inútil sin el código actual del token, así que la 2FA reduce drásticamente el riesgo de toma de control de cuentas, y por eso se recomienda para los administradores y para cualquier acceso sensible de usuarios, como la VPN.",
   "Para el examen, recuerda: FortiToken (de hardware o móvil) proporciona un segundo factor TOTP; lo asignas por cuenta de usuario y habilitas los dos factores en esa cuenta; y protege tanto a los usuarios del firewall como a los administradores. En un laboratorio asignarías un FortiToken Mobile a una cuenta de prueba, habilitarías los dos factores y confirmarías que ahora el inicio de sesión pide el código después de la contraseña."
  ],
  "terms": [
   [
    "FortiToken",
    "El token de contraseñas de un solo uso de Fortinet, disponible como llavero de hardware o como la aplicación FortiToken Mobile, que proporciona un segundo factor TOTP."
   ],
   [
    "Two-factor authentication, 2FA (autenticación de dos factores)",
    "Exigir una contraseña más una segunda prueba (un código de token) para que una contraseña robada por sí sola no permita iniciar sesión."
   ],
   [
    "Per-user assignment (asignación por usuario)",
    "Habilitar los dos factores en una cuenta individual y vincularle un token específico, en lugar de un interruptor global."
   ],
   [
    "TOTP",
    "Una contraseña de un solo uso basada en el tiempo que cambia en un intervalo corto; es el código que muestra un FortiToken."
   ]
  ],
  "example": "Para agregar la 2FA de Fortinet a los usuarios de VPN, un administrador registra un FortiToken Mobile en cada cuenta de usuario y habilita los dos factores, de modo que cada inicio de sesión requiere la contraseña más el código actual de la aplicación.",
  "tip": "FortiToken se asigna por cuenta de usuario, no mediante un interruptor en un perfil de administrador ni una regla de contraseñas. Habilitar los dos factores en la cuenta y vincular el token es la respuesta configurada.",
  "check": [
   [
    "¿Cómo agregas la autenticación de dos factores de Fortinet para un usuario del firewall?",
    "Habilitas los dos factores en esa cuenta de usuario y le asignas un FortiToken (de hardware o móvil)."
   ],
   [
    "¿Qué tipo de código produce un FortiToken?",
    "Una contraseña de un solo uso basada en el tiempo (TOTP) que cambia cada 30 o 60 segundos."
   ],
   [
    "¿Puede el mismo mecanismo de FortiToken proteger los inicios de sesión de los administradores?",
    "Sí; se puede exigir el segundo factor con FortiToken tanto a los administradores como a los usuarios del firewall, asignado por cuenta."
   ]
  ]
 },
 {
  "t": "SSL/SSH inspection: certificate inspection vs deep inspection, CA trust, exemptions, certificate pinning, untrusted certificate handling",
  "tt": "Inspección SSL/SSH: certificate inspection vs deep inspection, confianza en la CA, exenciones, certificate pinning, manejo de certificados no confiables",
  "body": [
   "Hoy en día la mayor parte del tráfico está cifrado con TLS, así que un firewall que no puede ver dentro de HTTPS está ciego ante gran parte de lo que debería filtrar. FortiGate ofrece dos niveles de inspección SSL, y elegir entre ellos, además de manejar los efectos secundarios de los certificados, es el concepto de inspección de contenido más importante del examen.",
   "Certificate inspection es el nivel ligero. No descifra la sesión; lee solo las partes del handshake TLS que ya son visibles, principalmente el Server Name Indication (SNI) y el certificado del servidor (que contiene el nombre de host). A partir de eso puede aplicar filtrado web por categoría e identificar muchas aplicaciones. Pero como nunca ve la carga cifrada, no puede escanear archivos en busca de virus, no puede ver la ruta completa de la URL y no puede aplicar acciones detalladas dentro de una aplicación. Es rápida y no provoca advertencias de certificado.",
   "Deep inspection (inspección SSL completa) realmente descifra el tráfico. El FortiGate actúa como intermediario (man-in-the-middle): termina la sesión TLS del cliente, descifra e inspecciona el contenido y luego lo vuelve a cifrar hacia el servidor, presentándole al cliente un certificado que volvió a firmar con la propia autoridad de certificación (CA) del FortiGate. Esto expone todo (archivos para el antivirus, URLs completas, acciones de aplicaciones), así que es necesario para AV, content disarm, control de aplicaciones detallado y filtrado por ruta de URL. Cuando el AV detecta malware por HTTP pero no por HTTPS, la solución es cambiar esa política a deep inspection.",
   "El costo de deep inspection es la confianza. Como ahora el cliente recibe un certificado firmado por la CA del FortiGate en lugar de la CA real del sitio, los navegadores muestran advertencias a menos que confíen en la CA del FortiGate. La implementación correcta es distribuir la CA del FortiGate (o una CA subordinada empresarial) a todos los clientes mediante GPO o MDM, para que los certificados refirmados sean de confianza sin mostrar avisos, y no importar el certificado de cada sitio web.",
   "Hay dos casos especiales importantes. Las exenciones te permiten omitir el descifrado para categorías o direcciones elegidas, por ejemplo no descifrar nunca sitios de banca en línea o de salud por razones de privacidad y legales, mientras sigues aplicando deep inspection a todo lo demás. Certificate pinning ocurre cuando una aplicación está programada para aceptar solo su propio certificado esperado; esa aplicación rechaza el certificado refirmado por el FortiGate y deja de funcionar bajo deep inspection, así que exentas los destinos de esa aplicación. FortiGate también tiene un ajuste para manejar certificados de servidor no confiables (allow, block o ignore) cuando el certificado del servidor real es inválido en sí mismo.",
   "En un laboratorio habilitas deep inspection, importas la CA del FortiGate en un navegador y comparas el certificado del sitio antes y después para ver en acción el refirmado."
  ],
  "terms": [
   [
    "Certificate inspection (inspección de certificados)",
    "Inspección SSL que lee solo el handshake (SNI y certificado) sin descifrar, lo que permite identificar categorías y aplicaciones, pero no escanear la carga."
   ],
   [
    "Deep inspection (inspección profunda)",
    "Inspección SSL completa que descifra, inspecciona y vuelve a cifrar el tráfico usando la CA del FortiGate; necesaria para AV e inspección detallada."
   ],
   [
    "CA trust distribution (distribución de confianza en la CA)",
    "Enviar a los clientes la CA de firma del FortiGate (mediante GPO/MDM) para que los certificados refirmados sean de confianza y cesen las advertencias."
   ],
   [
    "Certificate pinning (fijación de certificados)",
    "Una aplicación que acepta solo su propio certificado esperado y rechaza el refirmado por el FortiGate, lo que requiere una exención de inspección."
   ]
  ],
  "example": "El antivirus detecta EICAR por HTTP pero no por HTTPS porque la política usa certificate inspection; cambiar a deep inspection permite que el FortiGate descifre la carga y que el escaneo AV detecte el archivo también por HTTPS.",
  "tip": "Solo deep inspection puede escanear la carga (AV, URLs completas, acciones dentro de las aplicaciones). Certificate inspection solo ve el SNI/certificado. Y los clientes deben confiar en la CA del FortiGate, o cada sitio mostrará una advertencia.",
  "check": [
   [
    "¿Qué puede hacer certificate inspection y qué se le escapa?",
    "Lee el SNI y el certificado para identificar categorías y aplicaciones, pero no puede descifrar la carga, así que no puede escanear archivos ni ver URLs completas ni acciones dentro de las aplicaciones."
   ],
   [
    "Después de habilitar deep inspection, todos los usuarios ven advertencias de certificado. ¿Cuál es la solución?",
    "Distribuir la CA de firma del FortiGate a todos los clientes (GPO o MDM) para que los certificados refirmados sean de confianza."
   ],
   [
    "¿Por qué una aplicación móvil con certificate pinning deja de funcionar bajo deep inspection?",
    "Acepta solo su propio certificado esperado y rechaza el refirmado por el FortiGate; exenta del descifrado los destinos de la aplicación."
   ]
  ]
 },
 {
  "t": "Inspection modes: flow-based vs proxy-based, set per policy; profile-based vs policy-based NGFW mode",
  "tt": "Modos de inspección: flow-based vs proxy-based, definidos por política; modo NGFW profile-based vs policy-based",
  "body": [
   "FortiGate puede inspeccionar contenido con dos motores, flow-based (basado en flujo) y proxy-based (basado en proxy), y puede organizarse en dos estilos de NGFW, profile-based (basado en perfiles) y policy-based (basado en políticas). El examen evalúa ambas distinciones, que son elecciones independientes que la gente suele confundir.",
   "La inspección flow-based examina el tráfico a medida que los paquetes pasan, sin retener el objeto completo. Escanea sobre la marcha y almacena en búfer lo mínimo posible (para el antivirus normalmente retiene solo el último paquete hasta obtener el veredicto), así que tiene menor latencia, mayor rendimiento y usa menos memoria. La contrapartida es que algunas funciones que necesitan el objeto completo están limitadas o no disponibles en el modo flow.",
   "La inspección proxy-based almacena en búfer el objeto completo (por ejemplo, un archivo entero o la transacción HTTP completa) antes de escanearlo y luego lo reenvía. Como tiene el contenido completo, admite funciones más ricas, en particular content disarm and reconstruction (CDR), mensajes de reemplazo y páginas de bloqueo personalizados, y un manejo más exhaustivo, a costa de más memoria, más latencia y menor rendimiento. Cuando una pregunta necesita CDR o mensajes de reemplazo completos, eso implica el modo proxy.",
   "En el modo NGFW profile-based (el estilo tradicional y predeterminado), el modo de inspección se elige por política de firewall. Puedes configurar una política en flow y otra en proxy, combinándolas según lo necesite cada carga de trabajo. Así que la respuesta a '¿dónde elijo flow o proxy?' en el modo profile-based es: en cada política de firewall, no de forma global ni por interfaz.",
   "La segunda distinción, independiente de la anterior, es cómo se asocian las funciones de seguridad. En el modo NGFW profile-based construyes perfiles de seguridad (antivirus, filtro web, control de aplicaciones, IPS) y los asocias a las políticas de firewall; la política permite el tráfico y además lleva los perfiles. En el modo NGFW policy-based, en cambio, haces referencia a aplicaciones y categorías de URL directamente dentro de las políticas de seguridad, mientras que la inspección SSL y el NAT de origen/destino se manejan en políticas separadas (consolidadas/centrales). El modo policy-based puede sentirse más parecido al de otros fabricantes de NGFW, expresando la intención como 'permitir estas aplicaciones/categorías', pero el enrutamiento y la autenticación siguen existiendo.",
   "Mantén claros los dos ejes: flow frente a proxy es el motor de inspección (velocidad frente a funciones), y profile-based frente a policy-based es cómo expresas las reglas de seguridad. En el modo profile-based, la elección de flow/proxy vive en cada política. En un laboratorio alternas una política entre flow y proxy y observas qué funciones (como CDR o los mensajes de reemplazo) quedan disponibles."
  ],
  "terms": [
   [
    "Flow-based inspection (inspección basada en flujo)",
    "Escanear el tráfico a medida que pasan los paquetes con un búfer mínimo; menor latencia y mayor rendimiento, pero menos funciones que requieren el objeto completo."
   ],
   [
    "Proxy-based inspection (inspección basada en proxy)",
    "Almacenar en búfer el objeto completo antes de escanearlo; admite CDR y mensajes de reemplazo, con un mayor costo de memoria y latencia."
   ],
   [
    "Profile-based NGFW mode (modo NGFW basado en perfiles)",
    "El estilo predeterminado en el que los perfiles de seguridad se asocian a las políticas de firewall y el modo de inspección se define por política."
   ],
   [
    "Policy-based NGFW mode (modo NGFW basado en políticas)",
    "Un estilo en el que las aplicaciones y categorías de URL se referencian directamente en las políticas de seguridad, con la inspección SSL y el NAT en políticas separadas."
   ]
  ],
  "example": "Una sucursal configura su política de Wi-Fi para invitados en flow-based por velocidad, pero mantiene la política de finanzas en proxy-based para poder usar content disarm and reconstruction en los adjuntos de correo; ambas conviven en el mismo FortiGate en modo profile-based.",
  "tip": "Son dos elecciones separadas: flow vs proxy (motor) y profile-based vs policy-based (estilo de reglas). En el modo profile-based, el modo de inspección se elige por política, no de forma global ni por interfaz.",
  "check": [
   [
    "¿Dónde se elige el modo de inspección en el modo NGFW profile-based?",
    "En cada política de firewall, de modo que distintas políticas pueden usar flow o proxy de forma independiente."
   ],
   [
    "¿Qué puede hacer la inspección proxy-based que la flow-based no?",
    "Almacenar en búfer el objeto completo para admitir funciones como content disarm and reconstruction y mensajes de reemplazo completos, con un mayor costo de recursos."
   ],
   [
    "¿Qué cambia en el modo NGFW policy-based?",
    "Las políticas de seguridad hacen referencia directamente a aplicaciones y categorías de URL, mientras que la inspección SSL y el NAT se manejan en políticas separadas; el enrutamiento y la autenticación siguen existiendo."
   ]
  ]
 },
 {
  "t": "Web filtering: FortiGuard categories and actions (allow, monitor, warning, authenticate, block), static URL filter (exempt vs allow), rating errors, overrides",
  "tt": "Filtrado web: categorías y acciones de FortiGuard (allow, monitor, warning, authenticate, block), filtro de URL estático (exempt vs allow), errores de calificación, overrides",
  "body": [
   "El filtrado web controla a qué sitios web pueden acceder los usuarios, y FortiGate lo hace principalmente mediante las calificaciones por categoría de FortiGuard más un filtro de URL estático que tú mismo mantienes. Conocer las acciones disponibles y el orden en que se revisan las piezas responde la mayoría de las preguntas sobre filtrado web.",
   "FortiGuard califica los sitios web en categorías (como Social Networking, Finance and Banking o Malicious Websites). En el perfil de filtro web asignas una acción a cada categoría. Las acciones principales son: Allow (permitir en silencio), Monitor (permitir pero registrar), Warning (mostrar una página intermedia en la que el usuario puede hacer clic para continuar), Authenticate (exigir que el usuario inicie sesión, normalmente como miembro de un grupo permitido, antes de continuar) y Block (denegar con una página de bloqueo y sin forma de pasar). Entender lo que experimenta el usuario con cada una, sobre todo que Warning le permite continuar y Block no, se evalúa con frecuencia.",
   "El filtro de URL estático es una lista que construyes para URLs, patrones o comodines específicos, y se revisa antes de la acción de categoría de FortiGuard. Sus acciones incluyen Block, Allow, Exempt y Monitor, y la diferencia entre Exempt y Allow es un punto clásico del examen. Exempt omite todas las comprobaciones restantes del filtro web (y a menudo otras) para esa URL, dejándola pasar incondicionalmente. Allow permite la URL en la etapa del filtro de URL, pero aun así la pasa a las comprobaciones posteriores, como la categoría de FortiGuard, que podría bloquearla. Así que para garantizar que cargue una página de una categoría que de otro modo está bloqueada, usas Exempt, no Allow.",
   "Los errores de calificación (rating errors) ocurren cuando el FortiGate no puede comunicarse con FortiGuard para obtener una categoría (una caída del servicio o una pérdida de conectividad). De forma predeterminada, las consultas sin calificación o sin respuesta pueden bloquearse, lo que puede tumbar toda la navegación durante una caída de FortiGuard. El ajuste del perfil para permitir sitios web cuando ocurre un error de calificación deja que los sitios carguen cuando no se puede obtener una calificación, cambiando rigurosidad por disponibilidad.",
   "Los overrides permiten que usuarios autorizados cambien temporalmente el filtrado para sí mismos o para otros, por ejemplo un web-filter override que le otorga a un usuario acceso a una categoría bloqueada durante un tiempo determinado, sujeto a autenticación. Esto ofrece excepciones controladas sin editar el perfil para todos.",
   "El orden de evaluación que debes recordar: primero el filtro de URL estático (Exempt corta todo lo demás) y luego la acción de categoría de FortiGuard. En un laboratorio bloqueas una categoría, agregas una entrada de URL estática y comparas Exempt con Allow mientras observas el registro del filtro web."
  ],
  "terms": [
   [
    "FortiGuard category action (acción por categoría de FortiGuard)",
    "El comportamiento por categoría en un perfil de filtro web: Allow, Monitor, Warning, Authenticate o Block."
   ],
   [
    "Warning action (acción de advertencia)",
    "Muestra una página intermedia que le permite al usuario elegir continuar, a diferencia de Block, que no da ninguna opción."
   ],
   [
    "Static URL filter, Exempt vs Allow (filtro de URL estático)",
    "Una lista de URLs que se revisa antes de las categorías; Exempt omite todas las comprobaciones restantes, mientras que Allow aún pasa la URL a la comprobación de categoría."
   ],
   [
    "Rating error handling (manejo de errores de calificación)",
    "El ajuste que permite los sitios web cuando no se puede contactar a FortiGuard para calificarlos, en lugar de bloquearlos."
   ]
  ],
  "example": "Social Networking está bloqueado, pero marketing necesita que cargue una página de la empresa en un sitio bloqueado, así que el administrador agrega esa URL al filtro de URL estático con Exempt, lo que omite la comprobación de categoría; con Allow, la categoría la seguiría bloqueando.",
  "tip": "Exempt corta todas las comprobaciones restantes; Allow solo supera la etapa del filtro de URL y aún puede ser bloqueada por la categoría de FortiGuard. Usa Exempt para garantizar que una página cargue.",
  "check": [
   [
    "¿Qué ve un usuario cuando la acción de una categoría está configurada en Warning?",
    "Una página de advertencia intermedia que le permite elegir continuar, a diferencia de Block, que no ofrece ninguna forma de pasar."
   ],
   [
    "¿Cuál es la diferencia entre Exempt y Allow en el filtro de URL estático?",
    "Exempt omite todas las comprobaciones restantes del filtro web; Allow permite la URL ahí, pero aun así la envía a la comprobación de categoría de FortiGuard, que puede bloquearla."
   ],
   [
    "¿Cómo mantienes funcionando la navegación durante una caída de FortiGuard?",
    "Habilitas la opción de permitir sitios web cuando ocurre un error de calificación, para que las consultas sin respuesta carguen en lugar de bloquearse."
   ]
  ]
 },
 {
  "t": "DNS filtering and safe search",
  "tt": "Filtrado DNS y búsqueda segura (safe search)",
  "body": [
   "El filtrado DNS bloquea o redirige el tráfico en el momento en que un cliente busca un nombre de dominio, antes de que se haga cualquier conexión con el sitio. Es un complemento ligero del filtrado web, y su independencia del descifrado TLS es precisamente la razón por la que le gusta al examen.",
   "El mecanismo es sencillo: cuando un cliente envía una consulta DNS, el FortiGate inspecciona el dominio solicitado, lo califica mediante FortiGuard (el mismo sistema de categorías que se usa para el filtrado web) y aplica una acción, normalmente permitir la consulta, bloquearla (para que el nombre no se resuelva) o redirigirla a una página de bloqueo. Como la decisión se toma sobre el dominio de la consulta, el filtrado DNS funciona para cualquier protocolo y cualquier aplicación, no solo para los navegadores, y no necesita en absoluto inspección SSL ni un certificado de CA. Esa es su principal ventaja frente al filtrado web: detecta dominios maliciosos o no deseados en el momento de la consulta sin descifrar nada.",
   "Esto también significa que el filtrado DNS puede detener amenazas temprano. Bloquear un dominio malicioso conocido o recién registrado en la etapa de DNS impide que el cliente llegue a establecer la conexión, lo que es útil contra el comando y control (C&C) de malware y el phishing que dependen de la resolución de nombres. Tiene límites: actúa sobre dominios, no sobre el contenido de los archivos ni las rutas de las URLs, así que no escanea descargas y puede evadirse con IPs escritas directamente en el código o con resolutores alternativos, a menos que también obligues a que el DNS pase por el FortiGate.",
   "Safe search (búsqueda segura) es un control relacionado que obliga a los motores de búsqueda y a algunos sitios de video a usar su modo apto para toda la familia, filtrando los resultados explícitos, agregando a las consultas y respuestas los parámetros de búsqueda segura o los registros DNS del proveedor. FortiGate puede imponer la búsqueda segura para que los usuarios no puedan simplemente desactivarla en su navegador. Como las búsquedas modernas van por HTTPS, imponer por completo la búsqueda segura puede requerir el método basado en DNS o la inspección SSL según el proveedor, pero el concepto que quiere el examen es que safe search obliga a usar la versión filtrada de los resultados de búsqueda.",
   "En comparación con el filtrado web, usa el filtrado DNS para un bloqueo amplio de dominios, independiente del protocolo y sin descifrado, y combínalo con el filtrado web (que ve las URLs y, con deep inspection, el contenido) para lograr profundidad. Impón safe search cuando la política exija que los resultados de búsqueda y de video se mantengan aptos para toda la familia, sin importar la configuración del usuario.",
   "En un laboratorio habilitas un filtro DNS que bloquea una categoría y activas safe search; luego confirmas que los dominios bloqueados no se resuelven y que los motores de búsqueda devuelven resultados filtrados."
  ],
  "terms": [
   [
    "DNS filtering (filtrado DNS)",
    "Calificar el dominio de una consulta DNS y actuar sobre él para que los dominios maliciosos se bloqueen en el momento de la consulta, para cualquier protocolo y sin descifrado TLS."
   ],
   [
    "Block at lookup (bloqueo en la consulta)",
    "Impedir la resolución de nombres de un dominio no deseado para que el cliente nunca se conecte a él."
   ],
   [
    "Safe search enforcement (imposición de búsqueda segura)",
    "Obligar a los motores de búsqueda y a algunos sitios de video a usar su modo apto para toda la familia, de modo que los resultados explícitos se filtren sin importar la configuración del usuario."
   ],
   [
    "Protocol independence (independencia del protocolo)",
    "El filtrado DNS funciona para cualquier aplicación porque actúa sobre la consulta, no sobre cargas descifradas."
   ]
  ],
  "example": "Un administrador habilita un filtro DNS que bloquea la categoría de sitios web maliciosos, de modo que cuando cualquier aplicación de un cliente intenta resolver un dominio marcado, la consulta falla y nunca se establece una conexión, todo sin inspección SSL.",
  "tip": "La ventaja clave del filtrado DNS para el examen es que bloquea dominios maliciosos en el momento de la consulta, para cualquier protocolo y sin descifrado. No escanea archivos, así que combínalo con el filtrado web y el antivirus para lograr profundidad.",
  "check": [
   [
    "¿Cuál es una ventaja del filtrado DNS frente al filtrado web?",
    "Bloquea dominios maliciosos en el momento de la consulta para cualquier aplicación, sin necesidad de descifrado TLS ni de un certificado de CA."
   ],
   [
    "¿Qué no hace el filtrado DNS?",
    "No escanea el contenido de los archivos ni las rutas de las URLs; actúa solo sobre el dominio de la consulta."
   ],
   [
    "¿Qué se logra al imponer safe search?",
    "Obliga a los motores de búsqueda y a algunos sitios de video a usar su modo apto para toda la familia, de modo que los resultados explícitos se filtran sin importar la configuración propia del usuario."
   ]
  ]
 },
 {
  "t": "Application control: sensors, categories, application overrides, filter overrides, need for deep inspection",
  "tt": "Control de aplicaciones: sensores, categorías, application overrides, filter overrides, necesidad de deep inspection",
  "body": [
   "El control de aplicaciones identifica y gestiona el tráfico según la aplicación que lo genera y no según el puerto, usando las firmas de aplicaciones de FortiGuard. Esto importa porque las aplicaciones modernas saltan de un puerto a otro, se tunelizan sobre HTTP/HTTPS y cifran, así que una regla basada en puertos no puede detectarlas de forma confiable. Cuando un escenario pregunta cómo detener algo como BitTorrent o una aplicación específica en la nube, el control de aplicaciones suele ser la respuesta.",
   "Configuras el control de aplicaciones con un sensor (un perfil de control de aplicaciones) que asocias a una política de firewall. Dentro del sensor defines acciones para las categorías de aplicaciones (como Peer-to-Peer, Video/Audio, Social Media o Proxy) para que puedas, por ejemplo, bloquear toda la categoría P2P. Las firmas reconocen la aplicación por su patrón de tráfico sin importar el puerto; por eso bloquear la categoría P2P detiene BitTorrent aunque cambie de puerto, mientras que bloquear un solo puerto o una categoría web dejaría pasar la mayor parte.",
   "Dos mecanismos de override dan un control más fino. Un application override (una entrada por aplicación) define para una firma específica una acción diferente de la de su categoría, lo que te permite, por ejemplo, mantener permitido Facebook mientras bloqueas solo la firma de juegos de Facebook. Un filter override te permite crear una regla que selecciona aplicaciones por atributos (categoría, popularidad, tecnología, riesgo, fabricante) y aplica una acción a ese conjunto filtrado. Juntos te permiten permitir una plataforma en general mientras recortas comportamientos específicos, o aplicar reglas amplias según el riesgo sin enumerar cada aplicación.",
   "Una dependencia crucial es deep inspection. Con solo certificate inspection, el FortiGate a menudo puede ver el SNI e identificar qué aplicación se está usando, lo cual basta para permitir o bloquear la aplicación en general. Pero las acciones dentro de una aplicación cifrada, como bloquear las subidas de archivos en un servicio de almacenamiento en la nube mientras se permiten las descargas, viven en la carga cifrada y son invisibles sin descifrado. Así que para imponer acciones dentro de las aplicaciones debes habilitar deep inspection, para que las firmas puedan ver dentro de la sesión. Cuando el control de aplicaciones detecta una aplicación pero no puede controlar una acción dentro de ella bajo certificate inspection, la solución es deep inspection.",
   "El examen quiere tres cosas: el control de aplicaciones identifica las aplicaciones por firma sin importar el puerto; los overrides (de aplicación y de filtro) te permiten manejar excepciones y selecciones por atributos; y el control detallado dentro de las aplicaciones necesita deep inspection.",
   "En un laboratorio construyes un sensor que bloquea la categoría P2P, agregas un application override para bloquear una firma dentro de una aplicación que por lo demás está permitida y observas que las acciones dentro de las aplicaciones requieren deep inspection para imponerse."
  ],
  "terms": [
   [
    "Application control sensor (sensor de control de aplicaciones)",
    "Un perfil de acciones por aplicación/categoría asociado a una política de firewall que identifica las aplicaciones mediante firmas de FortiGuard."
   ],
   [
    "Category action (acción por categoría)",
    "La acción aplicada a toda una categoría de aplicaciones, como bloquear Peer-to-Peer, efectiva sin importar el puerto."
   ],
   [
    "Application override (excepción por aplicación)",
    "Una regla por firma que define para una aplicación específica una acción diferente de la de su categoría."
   ],
   [
    "Filter override (excepción por filtro)",
    "Una regla que selecciona aplicaciones por atributos (categoría, riesgo, tecnología, fabricante) y aplica una acción a ese conjunto."
   ]
  ],
  "example": "Facebook debe seguir permitido, pero los juegos de Facebook deben bloquearse, así que el administrador agrega un application override que bloquea solo la firma de juegos de Facebook mientras la categoría Social Media sigue permitida.",
  "tip": "El control de aplicaciones identifica las aplicaciones por firma, así que usa categorías/overrides, no reglas de puertos ni de categorías web, para detener cosas como BitTorrent. Controlar acciones dentro de una aplicación cifrada requiere deep inspection.",
  "check": [
   [
    "¿Por qué el control de aplicaciones es mejor que una regla de puerto para bloquear BitTorrent?",
    "Las aplicaciones P2P cambian de puerto y cifran, así que el control de aplicaciones basado en firmas las detecta donde una regla de un solo puerto o de categoría web no lo haría."
   ],
   [
    "¿Cómo bloqueas solo un comportamiento de una aplicación manteniendo la aplicación permitida?",
    "Usas un application override sobre esa firma específica (por ejemplo, bloquear los juegos de Facebook) dejando la categoría permitida."
   ],
   [
    "¿Por qué el control de aplicaciones no puede bloquear las subidas de archivos dentro de una aplicación en la nube bajo certificate inspection?",
    "Las acciones dentro de la aplicación están en la carga cifrada; se necesita deep inspection para descifrarla y que las firmas puedan verlas y actuar sobre ellas."
   ]
  ]
 },
 {
  "t": "Antivirus: flow vs proxy scanning, signature databases, FortiSandbox/cloud sandbox, content disarm and reconstruction (proxy), grayware",
  "tt": "Antivirus: escaneo flow vs proxy, bases de datos de firmas, FortiSandbox/sandbox en la nube, content disarm and reconstruction (proxy), grayware",
  "body": [
   "El escaneo antivirus (AV) inspecciona los archivos que atraviesan el FortiGate en busca de malware. Cómo escanea (flow o proxy), contra qué escanea (firmas y sandboxing) y las funciones adicionales que habilita el modo proxy son materia de examen.",
   "El AV funciona en modo flow o en modo proxy. El AV flow-based escanea el archivo a medida que pasan sus paquetes, reteniendo solo el paquete final hasta llegar a un veredicto, lo que mantiene la latencia baja y el rendimiento alto. El AV proxy-based almacena en búfer el archivo completo, escanea el objeto entero y solo entonces lo reenvía, lo que usa más memoria y agrega latencia, pero permite que el FortiGate bloquee o reemplace el archivo de forma confiable y habilita funciones adicionales. Cuando un escenario necesita esas funciones adicionales o el bloqueo garantizado de un archivo completamente ensamblado, eso apunta al modo proxy.",
   "La detección principal se basa en firmas: el FortiGate compara los archivos con las bases de datos de firmas antivirus de FortiGuard, que se actualizan con regularidad. Hay distintos niveles de base de datos (por ejemplo, un conjunto normal y uno extendido), que equilibran cobertura frente a rendimiento. Las firmas detectan rápidamente el malware conocido, pero por definición no pueden reconocer amenazas totalmente nuevas, nunca vistas.",
   "Para detectar malware desconocido, los archivos se pueden enviar a un sandbox: FortiSandbox local (on-premises) o un servicio de sandbox en la nube como FortiSandbox Cloud. El sandbox ejecuta el archivo sospechoso en un entorno aislado y observa su comportamiento, de modo que puede marcar malware de día cero y evasivo que las firmas no detectan. El sandboxing agrega análisis de comportamiento; no descifra tráfico ni filtra spam, que son distractores comunes.",
   "Content disarm and reconstruction (CDR) es una función exclusiva del modo proxy que elimina el contenido activo (macros, scripts incrustados y otros elementos ejecutables) de los documentos y reconstruye una versión limpia y plana antes de entregarla. Es proactiva: en lugar de decidir si una macro es maliciosa, elimina el riesgo por completo, lo que es ideal para los adjuntos de correo. Como debe procesar el archivo completo, CDR requiere inspección proxy-based.",
   "Grayware se refiere al software no deseado pero no claramente malicioso, como adware, spyware y riskware. FortiGate puede detectar grayware como una opción aparte para que puedas bloquear el software molesto junto con el malware propiamente dicho.",
   "Entonces: flow para velocidad, proxy para funciones sobre el objeto completo y CDR; firmas para amenazas conocidas, sandbox para las desconocidas; CDR elimina el contenido activo (solo proxy); grayware cubre el software molesto. En un laboratorio descargas el archivo de prueba inofensivo EICAR por HTTP y HTTPS bajo certificate inspection frente a deep inspection y comparas los resultados del registro de AV."
  ],
  "terms": [
   [
    "Flow vs proxy AV (AV basado en flujo vs en proxy)",
    "Flow escanea a medida que pasan los paquetes con un búfer mínimo (rápido); proxy almacena el archivo completo antes de reenviarlo (más funciones, más costo)."
   ],
   [
    "Signature database (base de datos de firmas)",
    "Firmas de malware actualizadas por FortiGuard con las que el FortiGate compara los archivos; detecta amenazas conocidas, pero no las totalmente nuevas."
   ],
   [
    "Sandbox (FortiSandbox / nube)",
    "Un entorno aislado que ejecuta archivos desconocidos para detectar malware por su comportamiento, capturando amenazas de día cero que las firmas no detectan."
   ],
   [
    "Content disarm and reconstruction, CDR (desarme y reconstrucción de contenido)",
    "Una función exclusiva del modo proxy que elimina el contenido activo de los documentos y reconstruye un archivo limpio antes de entregarlo."
   ]
  ],
  "example": "Los documentos de Office en el correo entrante deben llegar sin macros, así que el administrador habilita content disarm and reconstruction en un perfil antivirus proxy-based, que elimina el contenido activo y reconstruye cada archivo antes de entregarlo.",
  "tip": "CDR y el bloqueo confiable del archivo completo necesitan el modo proxy; el modo flow es más rápido pero más limitado. Las firmas detectan el malware conocido, y el sandbox es lo que agrega el análisis de comportamiento para archivos desconocidos.",
  "check": [
   [
    "¿Cómo maneja el antivirus proxy-based un archivo descargado en comparación con el flow-based?",
    "El proxy almacena el archivo completo, lo escanea y luego lo reenvía; el flow escanea a medida que pasan los paquetes y retiene solo el último paquete hasta el veredicto."
   ],
   [
    "¿Qué agrega enviar archivos a un sandbox?",
    "Análisis de comportamiento de archivos desconocidos en un entorno aislado, que detecta malware nuevo que las firmas no detectan."
   ],
   [
    "¿Qué función elimina las macros de los documentos y qué modo necesita?",
    "Content disarm and reconstruction (CDR); requiere inspección proxy-based."
   ]
  ]
 },
 {
  "t": "IPS: sensors and signature filters, rate-based signatures, botnet C&C blocking, IP exemptions, fail-open",
  "tt": "IPS: sensores y filtros de firmas, firmas basadas en tasa, bloqueo de C&C de botnets, exenciones de IP, fail-open",
  "body": [
   "Un sistema de prevención de intrusiones (IPS) inspecciona el tráfico en busca de patrones de ataque, como intentos de explotación de vulnerabilidades conocidas, y los bloquea o los registra. El IPS de FortiGate se basa en firmas y es muy ajustable, y el examen espera que lo configures con precisión en lugar de activarlo todo.",
   "Aplicas IPS mediante un sensor IPS asociado a una política de firewall. En lugar de habilitar todas las firmas (lo que desperdicia recursos y genera ruido), usas filtros de firmas dentro del sensor para seleccionar las firmas que importan: filtras por objetivo (servidor o cliente), por sistema operativo, por aplicación o protocolo y por severidad. Para proteger servidores Windows en una DMZ, por ejemplo, filtras las firmas con objetivo de servidor y sistema operativo Windows en las severidades relevantes, manteniendo la inspección enfocada y eficiente. Cada grupo seleccionado tiene una acción como block, monitor (dejar pasar pero registrar) o default.",
   "Las firmas basadas en tasa (rate-based) actúan sobre la frecuencia de un evento en lugar de sobre un solo paquete, detectando comportamientos como intentos de inicio de sesión por fuerza bruta o inundaciones (floods) al dispararse cuando se supera un umbral a lo largo del tiempo. Complementan las firmas por paquete para ataques volumétricos o repetitivos.",
   "El bloqueo de comando y control (C&C) de botnets usa una base de datos mantenida por FortiGuard con destinos de C&C conocidos. Habilitarlo en el sensor IPS bloquea las conexiones salientes de tus hosts hacia esos servidores maliciosos conocidos, lo que ayuda a contener un host ya infectado cortando su vínculo con su controlador. Es una protección enfocada en el tráfico saliente, distinta de las firmas de explotación entrantes.",
   "Las exenciones de IP (IP exemptions) te permiten excluir pares específicos de direcciones de origen/destino de una firma en particular. Cuando una aplicación legítima entre dos hosts conocidos activa una firma (un falso positivo), la solución puntual es agregar una exención de IP solo para esos hosts en esa firma, lo que mantiene la firma protegiendo a todos los demás. Esto es mucho mejor que deshabilitar todo el sensor o poner todo en monitor, lo que eliminaría la protección de forma general.",
   "IPS fail-open gobierna lo que ocurre cuando el motor de IPS está sobrecargado o falla. Con fail-open habilitado, el tráfico pasa sin inspeccionar en lugar de descartarse, favoreciendo la disponibilidad; con él deshabilitado, el tráfico se descarta cuando el IPS no puede inspeccionarlo, favoreciendo la seguridad. Esto es independiente de av-failopen (que cubre el antivirus proxy en conserve mode), una distinción que evalúa el examen.",
   "En un laboratorio construyes un sensor filtrado por objetivos de servidor y un sistema operativo específico, habilitas el bloqueo de C&C de botnets y lees los campos del registro de IPS para ver qué coincidió."
  ],
  "terms": [
   [
    "IPS sensor (sensor IPS)",
    "Un perfil de firmas y acciones seleccionadas asociado a una política de firewall para detectar y bloquear ataques."
   ],
   [
    "Signature filter (filtro de firmas)",
    "Una regla que selecciona firmas por objetivo, sistema operativo, aplicación/protocolo y severidad para mantener la inspección enfocada."
   ],
   [
    "Botnet C&C blocking (bloqueo de C&C de botnets)",
    "Una opción de IPS que usa la base de datos de FortiGuard para bloquear las conexiones salientes hacia servidores de comando y control conocidos."
   ],
   [
    "IPS fail-open",
    "El ajuste que deja pasar el tráfico sin inspeccionar cuando el motor de IPS está sobrecargado (disponibilidad) frente a descartarlo (seguridad)."
   ]
  ],
  "example": "Una aplicación legítima entre dos hosts internos sigue activando una firma de IPS, así que el administrador agrega una exención de IP solo para esos dos hosts en esa firma, manteniéndola activa para todos los demás en lugar de deshabilitar el sensor.",
  "tip": "Ajusta el IPS con filtros de firmas (objetivo, sistema operativo, severidad) en lugar de habilitarlo todo, y usa exenciones de IP para los falsos positivos. No confundas IPS fail-open con av-failopen.",
  "check": [
   [
    "¿Cómo deberías ajustar un sensor IPS para servidores Windows en la DMZ?",
    "Filtrando las firmas por objetivo de servidor y sistema operativo Windows (y las severidades relevantes) para que la inspección esté enfocada, en lugar de habilitar todas las firmas."
   ],
   [
    "¿Cuál es la solución más puntual para una firma que causa un falso positivo entre dos hosts conocidos?",
    "Agregar una exención de IP para esos hosts en esa firma, manteniéndola protegiendo a todos los demás."
   ],
   [
    "¿Qué hace IPS fail-open cuando está habilitado?",
    "Deja pasar el tráfico sin inspeccionar si el motor de IPS está sobrecargado, favoreciendo la disponibilidad; deshabilitado, descarta ese tráfico."
   ]
  ]
 },
 {
  "t": "DoS policies and anomaly thresholds",
  "tt": "Políticas DoS y umbrales de anomalías",
  "body": [
   "Los ataques de denegación de servicio (DoS) intentan saturar a un objetivo con tráfico o intentos de conexión. Las políticas DoS de FortiGate defienden contra esto vigilando las anomalías del tráfico y aplicando umbrales muy temprano en el procesamiento de paquetes, antes de la búsqueda normal de políticas de firewall, de modo que una inundación (flood) puede descartarse antes de que consuma recursos.",
   "Una política DoS se define en una interfaz de entrada y especifica el alcance de origen, destino y servicio; luego enumera sensores de anomalías con umbrales y acciones. Cada tipo de anomalía vigila un patrón particular: por ejemplo tcp_syn_flood (demasiados paquetes TCP SYN nuevos por segundo), tcp_port_scan, udp_flood, icmp_flood y varias anomalías de cantidad de sesiones. Para cada una defines un umbral (una tasa o una cantidad) y una acción, normalmente block o monitor, y a menudo una opción de registro. Cuando el tráfico cruza el umbral, la política DoS actúa sobre el tráfico infractor.",
   "La característica definitoria para el examen es el momento: las políticas DoS se evalúan antes que las políticas de firewall y antes que la mayor parte de la inspección, en la entrada de la interfaz. Esa posición temprana es la que les permite deshacerse de una inundación SYN o de un escaneo a bajo costo, protegiendo tanto al FortiGate como a los servidores detrás de él. Así que, cuando un servidor web público recibe una inundación SYN y la pregunta es qué la limita antes de la búsqueda de políticas, la respuesta es una política DoS con un umbral adecuado, no el control de aplicaciones, el filtrado web ni un IP pool.",
   "Definir buenos umbrales es el desafío práctico. Demasiado bajos y descartas ráfagas legítimas (falsos positivos durante los picos normales); demasiado altos y un ataque se cuela. Estableces una línea base del tráfico normal y defines umbrales por encima de los picos típicos, a menudo iniciando las anomalías en modo monitor para observar las tasas antes de cambiarlas a block. Las firmas de IPS basadas en tasa se superponen conceptualmente con las anomalías DoS, pero las políticas DoS son la herramienta dedicada, temprana y basada en umbrales.",
   "Las políticas DoS protegen contra ataques volumétricos y de agotamiento de conexiones que se originan desde muchas fuentes o desde una sola; para ataques distribuidos que superan la capacidad del dispositivo, se sigue necesitando protección DDoS aguas arriba o en la nube, pero la política DoS del FortiGate es el control dentro del equipo en el que se enfoca el examen.",
   "En un laboratorio agregas una política DoS en la interfaz WAN con un umbral bajo de tcp_syn_flood en modo monitor, generas carga de conexiones y observas los contadores de anomalías y los registros para entender cómo se disparan los umbrales."
  ],
  "terms": [
   [
    "DoS policy (política DoS)",
    "Una regla evaluada temprano en la entrada de una interfaz que aplica umbrales de anomalías para descartar o registrar tráfico de inundación y escaneo antes de la búsqueda de políticas de firewall."
   ],
   [
    "Anomaly sensor (sensor de anomalías)",
    "Un detector de un patrón específico (inundación SYN, escaneo de puertos, inundación UDP/ICMP, cantidad de sesiones) con un umbral y una acción configurables."
   ],
   [
    "Threshold (umbral)",
    "La tasa o cantidad a partir de la cual una anomalía dispara su acción; se define por encima de los picos normales para evitar falsos positivos."
   ],
   [
    "Early evaluation (evaluación temprana)",
    "Las políticas DoS se ejecutan antes que las políticas de firewall y la mayor parte de la inspección, lo que les permite deshacerse de las inundaciones a bajo costo."
   ]
  ],
  "example": "Un servidor web público recibe una inundación SYN, así que el administrador agrega una política DoS en la interfaz WAN con un umbral de tcp_syn_flood, que descarta el exceso de paquetes SYN antes de que lleguen a la búsqueda de políticas de firewall.",
  "tip": "Las políticas DoS actúan antes de la búsqueda de políticas de firewall; por eso ellas, y no el control de aplicaciones ni los IP pools, son la respuesta para detener temprano una inundación SYN. Establece una línea base del tráfico antes de definir los umbrales.",
  "check": [
   [
    "¿Qué función limita una inundación SYN antes de la búsqueda de políticas de firewall?",
    "Una política DoS con un umbral de anomalía tcp_syn_flood, evaluada temprano en la entrada de la interfaz."
   ],
   [
    "¿Por qué las políticas DoS son eficaces contra las inundaciones?",
    "Se evalúan antes que las políticas de firewall y la mayor parte de la inspección, así que pueden descartar el tráfico de inundación a bajo costo antes de que consuma recursos."
   ],
   [
    "¿Cuál es el riesgo de definir un umbral DoS demasiado bajo?",
    "Las ráfagas de tráfico legítimo pueden superarlo y descartarse, causando falsos positivos; los umbrales deben estar por encima de los picos normales."
   ]
  ]
 },
 {
  "t": "Security profile logs and troubleshooting (FortiGuard connectivity, `diagnose autoupdate versions`)",
  "tt": "Registros de perfiles de seguridad y resolución de problemas (conectividad con FortiGuard, `diagnose autoupdate versions`)",
  "body": [
   "Los perfiles de seguridad son tan buenos como sus firmas y sus registros. Gran parte de la resolución de problemas de inspección de contenido se reduce a dos preguntas: ¿el FortiGate está recibiendo actualizaciones de FortiGuard?, y ¿qué dicen realmente los registros de seguridad que ocurrió? El examen espera que sepas dónde buscar.",
   "Los registros de los perfiles de seguridad (los registros de seguridad o UTM) registran cada acción que toma un perfil: detecciones de antivirus, bloqueos por categoría del filtro web, coincidencias del control de aplicaciones, coincidencias de IPS y acciones del filtro DNS, cada una con el origen, el destino, el perfil y la firma involucrados, y la acción tomada. Cuando los usuarios reportan que algo se bloqueó por error o que una amenaza pasó, el registro de seguridad es donde confirmas qué perfil actuó y por qué. Recuerda que una política solo genera estos registros cuando el perfil correspondiente está asociado y el registro está habilitado, y que ver un evento de AV o de filtro web requiere que el tráfico haya sido inspeccionado (deep inspection para las cargas cifradas).",
   "La conectividad con FortiGuard sustenta la mayoría de los perfiles: las firmas de antivirus e IPS, las calificaciones por categoría web y DNS, y las firmas de aplicaciones provienen todas de FortiGuard. Si el FortiGate no puede comunicarse con FortiGuard, las firmas quedan desactualizadas y las consultas de categoría fallan, lo que se manifiesta como errores de calificación en el filtrado web, detecciones omitidas o una advertencia de estado del Security Fabric/FortiGuard. Durante la evaluación con la VM de prueba gratuita no hay ninguna actualización de FortiGuard, así que ahí se espera una detección limitada.",
   "El comando `diagnose autoupdate versions` informa la versión actual y el estado de actualización de cada base de datos servida por FortiGuard en el FortiGate (antivirus, IPS y otras), junto con cuándo se actualizó cada una por última vez y si el contrato/derecho de uso es válido. Es la comprobación de referencia para '¿mis firmas están al día y se puede llegar a FortiGuard?'. Si las versiones son antiguas o aparecen como no actualizadas, investigas la conectividad (DNS, los servidores de FortiGuard, la programación de actualizaciones) y el licenciamiento. Otros comandos relacionados y la página de estado de FortiGuard en la GUI muestran la accesibilidad y el estado de la licencia.",
   "Un flujo sensato de resolución de problemas: lee los registros de seguridad para ver qué hizo (o no hizo) un perfil; si la detección parece desactualizada o las calificaciones fallan, ejecuta `diagnose autoupdate versions` para comprobar la vigencia de las firmas y la conectividad con FortiGuard; luego verifica la licencia/contrato y la ruta de actualización. Mantener las firmas al día y confirmar el registro es la diferencia entre un perfil que protege y uno que solo aparenta hacerlo.",
   "En un laboratorio generas un evento que un perfil debería registrar, lo lees en el registro de seguridad y ejecutas `diagnose autoupdate versions` para ver las versiones de las bases de datos y el estado de actualización."
  ],
  "terms": [
   [
    "Security (UTM) log (registro de seguridad)",
    "El registro de las acciones de los perfiles de seguridad (AV, filtro web, control de aplicaciones, IPS, DNS) con origen, destino, firma y acción."
   ],
   [
    "FortiGuard connectivity (conectividad con FortiGuard)",
    "La capacidad del FortiGate de comunicarse con FortiGuard para obtener actualizaciones de firmas y calificaciones, de la que dependen la mayoría de los perfiles de seguridad."
   ],
   [
    "diagnose autoupdate versions",
    "Un comando de la CLI que muestra la versión de cada base de datos de FortiGuard, la hora de su última actualización y el estado del derecho de uso."
   ],
   [
    "Rating error (error de calificación)",
    "Un síntoma del filtro web que aparece cuando no se puede contactar a FortiGuard para categorizar un sitio."
   ]
  ],
  "example": "La detección parece desactualizada y el filtrado web arroja errores de calificación, así que el administrador ejecuta diagnose autoupdate versions, ve que las bases de datos de antivirus e IPS no se han actualizado y rastrea la causa hasta una conectividad con FortiGuard bloqueada y un contrato vencido.",
  "tip": "Cuando las firmas parecen desactualizadas o las calificaciones fallan, ejecuta diagnose autoupdate versions para comprobar la vigencia de las bases de datos y la accesibilidad de FortiGuard. En la VM de prueba gratuita, es normal que no haya actualizaciones de FortiGuard.",
  "check": [
   [
    "¿Qué comando muestra si las bases de datos de firmas de FortiGuard están al día?",
    "diagnose autoupdate versions, que enumera la versión de cada base de datos, la hora de su última actualización y el estado del derecho de uso."
   ],
   [
    "¿Dónde confirmas qué perfil de seguridad bloqueó o permitió una sesión determinada?",
    "En el registro de seguridad (UTM), que registra la acción de cada perfil con el origen, el destino, la firma y el resultado."
   ],
   [
    "¿Qué suele causar errores de calificación en el filtro web?",
    "El FortiGate no puede comunicarse con FortiGuard para categorizar los sitios, así que las consultas fallan; revisa la conectividad con FortiGuard y el licenciamiento."
   ]
  ]
 },
 {
  "t": "Route lookup order: policy routes, then the routing table (longest match, distance, priority)",
  "tt": "Orden de búsqueda de rutas: policy routes y luego la tabla de enrutamiento (coincidencia más larga, distancia, prioridad)",
  "body": [
   "Antes de que un FortiGate pueda aplicar una política de firewall, debe decidir a dónde debe ir un paquete. Esa decisión de enrutamiento sigue un orden estricto, y conocerlo explica muchas preguntas del examen del tipo '¿por qué el tráfico tomó ese camino?'.",
   "Lo primero que se revisa son las policy routes (también llamadas rutas basadas en políticas o PBR). Una policy route coincide según criterios como la interfaz de entrada, la dirección de origen y de destino, el protocolo y el puerto, y si coincide, obliga al paquete a salir por una interfaz o gateway especificado, sin importar la tabla de enrutamiento normal. Las policy routes se evalúan de arriba hacia abajo y gana la primera coincidencia. Como van primero, una policy route anula la tabla de enrutamiento para el tráfico con el que coincide; así es como diriges tráfico específico (por ejemplo, el tráfico web de una subred por un enlace particular) de forma independiente del enrutamiento basado en el destino.",
   "Si ninguna policy route coincide, el FortiGate consulta la tabla de enrutamiento (las rutas activas). Aquí la selección sigue tres criterios de desempate en orden. Primero, la coincidencia de prefijo más largo: gana la ruta más específica hacia el destino, así que una /24 le gana a una /16 que también cubre la dirección, y una ruta de host /32 les gana a ambas. Esto es fundamental: la especificidad siempre se impone a los demás factores.",
   "Segundo, entre rutas con la misma longitud de prefijo, gana la distancia administrativa más baja. La distancia administrativa expresa la confianza en el origen de una ruta (por ejemplo, una ruta directamente conectada es más confiable que una ruta estática, que a su vez es más confiable que una ruta dinámica aprendida). Solo la ruta de menor distancia para un prefijo determinado se instala como activa; las rutas de mayor distancia esperan en la base de datos de enrutamiento como respaldo.",
   "Tercero, cuando las rutas tienen el mismo prefijo y la misma distancia, la prioridad desempata en las rutas estáticas: se prefiere la ruta con el valor de prioridad más bajo, aunque ambas permanecen en la tabla. Si el prefijo, la distancia y la prioridad son todos iguales, el resultado es equal-cost multipath (ECMP, multitrayecto de igual costo), y el tráfico se reparte entre las rutas.",
   "Así que el orden completo es: primero las policy routes; luego la tabla de enrutamiento por coincidencia más larga, después la distancia más baja, después la prioridad más baja y después ECMP. Tener clara esta secuencia te permite predecir el camino elegido y diagnosticar sorpresas. En un laboratorio, un debug flow muestra el paso de búsqueda de ruta, lo que te permite ver exactamente qué ruta eligió el FortiGate y por qué."
  ],
  "terms": [
   [
    "Policy route, PBR (ruta basada en políticas)",
    "Una regla que se evalúa antes de la tabla de enrutamiento y obliga al tráfico coincidente a salir por una interfaz/gateway especificado, anulando el enrutamiento basado en el destino."
   ],
   [
    "Longest prefix match (coincidencia de prefijo más largo)",
    "La regla de enrutamiento según la cual la ruta más específica (máscara más larga) hacia un destino se prefiere sobre las menos específicas."
   ],
   [
    "Administrative distance (distancia administrativa)",
    "Una medida de confianza en el origen de una ruta; entre rutas con el mismo prefijo, la de menor distancia se instala como activa."
   ],
   [
    "Priority, static (prioridad en rutas estáticas)",
    "Un criterio de desempate entre rutas con el mismo prefijo y la misma distancia; se prefiere el valor más bajo, mientras ambas permanecen en la tabla."
   ]
  ],
  "example": "Una sucursal dirige todo el tráfico web de la subred de invitados por el enlace de banda ancha con una policy route, así que, aunque la ruta predeterminada de la tabla de enrutamiento apunta a MPLS, el tráfico de invitados coincidente sigue la policy route porque las policy routes se revisan primero.",
  "tip": "Las policy routes se evalúan antes que la tabla de enrutamiento. Dentro de la tabla, el orden es coincidencia más larga, luego distancia y luego prioridad. La especificidad (longitud del prefijo) siempre gana antes que la distancia.",
  "check": [
   [
    "¿En qué orden toma un FortiGate su decisión de enrutamiento?",
    "Primero las policy routes; si ninguna coincide, la tabla de enrutamiento por coincidencia de prefijo más largo, luego la distancia administrativa más baja, luego la prioridad más baja y luego ECMP."
   ],
   [
    "¿Cuál gana: una ruta más específica con mayor distancia o una ruta menos específica con menor distancia?",
    "La ruta más específica; la coincidencia de prefijo más largo se aplica antes que la distancia administrativa."
   ],
   [
    "¿Qué ocurre cuando las rutas tienen el mismo prefijo, la misma distancia y la misma prioridad?",
    "Forman equal-cost multipath (ECMP) y el tráfico se reparte entre ellas."
   ]
  ]
 },
 {
  "t": "Static routes: administrative distance, priority, ECMP and load-balancing methods",
  "tt": "Rutas estáticas: distancia administrativa, prioridad, ECMP y métodos de balanceo de carga",
  "body": [
   "Las rutas estáticas son caminos configurados manualmente, y en FortiGate su comportamiento está gobernado por la distancia administrativa y la prioridad, dos ajustes que deciden qué rutas están activas y cuáles se prefieren. Dominar cómo interactúan es esencial para el dominio de enrutamiento y para el failover de VPN y SD-WAN.",
   "La distancia administrativa (AD) determina si una ruta se instala siquiera en la tabla de enrutamiento activa. Para dos rutas hacia el mismo destino con distancias diferentes, solo la de menor distancia se vuelve activa; la de mayor distancia se mantiene en la base de datos de enrutamiento como respaldo en espera y solo se promueve si la ruta activa desaparece. Así es exactamente como construyes una floating static route (ruta estática flotante): le das al respaldo una distancia mayor para que permanezca fuera de la tabla hasta que falle la principal. Dos rutas predeterminadas con distancias 10 y 20 significan que solo la ruta con distancia 10 reenvía tráfico.",
   "La prioridad, en cambio, se aplica entre rutas que tienen la misma distancia. Las rutas con igual distancia se instalan todas en la tabla activa, y se prefiere para el reenvío la que tiene el valor de prioridad más bajo, mientras las demás siguen disponibles. Como la ruta de respaldo sigue en la tabla, puede atender las comprobaciones de reverse path forwarding y usarse de inmediato si la preferida se vuelve inalcanzable. Así que dos rutas predeterminadas, ambas con distancia 10 y prioridades 0 y 5, están activas, y se usa la de prioridad 0.",
   "La distinción que le encanta al examen: la distancia decide la presencia en la tabla (una activa, las demás en espera), la prioridad decide la preferencia entre las presentes (todas activas, se prefiere la más baja). Cambia la distancia para que una ruta sea un respaldo en frío; cambia la prioridad para mantener ambas activas con una preferida.",
   "Cuando las rutas hacia el mismo destino comparten tanto la misma distancia como la misma prioridad, forman equal-cost multipath (ECMP), y el FortiGate balancea la carga del tráfico entre ellas. FortiGate ofrece varios métodos de balanceo de carga ECMP: basado en la IP de origen (el predeterminado; las sesiones del mismo origen usan el mismo camino, preservando la afinidad de sesión), basado en la IP de origen y destino, y métodos ponderados (weighted) o de desbordamiento/por uso (spillover/usage-based) en algunas configuraciones. El método predeterminado por IP de origen mantiene las sesiones de un cliente en un solo enlace, lo que evita romper las sesiones con estado que el balanceo por paquete interrumpiría.",
   "En un laboratorio agregas dos rutas predeterminadas con distancias 10 y 20 y confirmas que solo una está activa; luego defines la misma distancia con prioridades diferentes y confirmas que ambas aparecen con una preferida, observando la tabla de enrutamiento cada vez."
  ],
  "terms": [
   [
    "Administrative distance (distancia administrativa)",
    "Controla si una ruta estática se instala como activa; entre rutas con el mismo prefijo, solo la de menor distancia está activa y las demás esperan como respaldo."
   ],
   [
    "Priority (prioridad)",
    "Entre rutas con igual distancia (todas activas), se prefiere para el reenvío el valor de prioridad más bajo, mientras las demás siguen siendo utilizables."
   ],
   [
    "Floating static route (ruta estática flotante)",
    "Una ruta estática de respaldo con una distancia mayor, para que permanezca fuera de la tabla hasta que falle la ruta principal."
   ],
   [
    "ECMP load-balancing method (método de balanceo de carga ECMP)",
    "Cómo se reparte el tráfico entre rutas con igual distancia e igual prioridad; el predeterminado se basa en la IP de origen para mantener la afinidad de sesión."
   ]
  ],
  "example": "Una sucursal configura su ruta predeterminada de MPLS con distancia 10 y la de banda ancha con distancia 20, de modo que la banda ancha queda completamente fuera de la tabla de enrutamiento hasta que cae la ruta MPLS, logrando un failover limpio entre principal y respaldo.",
  "tip": "La distancia decide qué rutas están en la tabla (una activa); la prioridad decide la preferencia entre las rutas que ya están en la tabla (todas activas). Usa la distancia para un respaldo en frío y la prioridad para un respaldo activo (hot standby).",
  "check": [
   [
    "Dos rutas predeterminadas tienen distancias 10 y 20. ¿Cuál reenvía el tráfico y dónde está la otra?",
    "Reenvía la ruta con distancia 10; la de distancia 20 permanece inactiva en la base de datos de enrutamiento hasta que se elimine la primera."
   ],
   [
    "Dos rutas predeterminadas comparten la distancia 10 con prioridades 0 y 5. ¿Qué ocurre?",
    "Ambas se instalan en la tabla activa y se prefiere la de prioridad 0; la otra sigue siendo utilizable."
   ],
   [
    "¿Cuál es el método de balanceo de carga ECMP predeterminado y por qué?",
    "El basado en la IP de origen, para que todas las sesiones de un origen usen el mismo camino, preservando la afinidad de sesión que el balanceo por paquete rompería."
   ]
  ]
 },
 {
  "t": "Routing table vs routing database: `get router info routing-table all` and `database`",
  "tt": "Tabla de enrutamiento vs base de datos de enrutamiento: `get router info routing-table all` y `database`",
  "body": [
   "FortiGate mantiene dos vistas del enrutamiento relacionadas pero distintas: la tabla de enrutamiento (lo que se usa activamente para reenviar) y la base de datos de enrutamiento (todo lo conocido, activo o no). El examen evalúa la diferencia y los comandos que muestran cada una, porque la resolución de problemas a menudo depende de ver rutas que no están activas en ese momento.",
   "La tabla de enrutamiento, a veces llamada routing information base (RIB) o tabla de enrutamiento activa, contiene solo las rutas que el FortiGate está usando realmente para reenviar tráfico en este momento: las ganadoras del proceso de selección (coincidencia más larga, distancia más baja y luego prioridad/ECMP). Si una ruta no es la mejor para su prefijo, no aparece aquí. El comando `get router info routing-table all` muestra esta tabla activa, y es lo que revisas para responder '¿cómo se está reenviando el tráfico hacia este destino?'.",
   "La base de datos de enrutamiento contiene todas las rutas candidatas que conoce el FortiGate, estén activas o no. Esto incluye las rutas que perdieron la selección, como una ruta predeterminada flotante de respaldo con mayor distancia, o las rutas aprendidas de una fuente que actualmente es menos preferida. El comando `get router info routing-table database` muestra esta lista más completa, marcando qué entradas están activas y cuáles están inactivas/en espera.",
   "El valor práctico está en diagnosticar las rutas en espera y de respaldo. Si configuraste una ruta predeterminada de respaldo con mayor distancia y quieres confirmar que existe y está lista, no aparecerá en `routing-table all` (porque no está activa), pero sí aparecerá en la vista `database` como ruta inactiva. Del mismo modo, al resolver problemas de failover, compruebas que el respaldo previsto esté presente en la base de datos para que pueda promoverse cuando caiga la principal. Ver una ruta en la base de datos pero no en la tabla activa es normal y esperado para los respaldos.",
   "Una regla sencilla: usa `routing-table all` para ver lo que se está usando, y `database` para ver todo lo que el FortiGate podría usar. Cuando una pregunta pide qué comando revela las rutas inactivas o de respaldo además de las activas, la respuesta es la base de datos de la tabla de enrutamiento (routing-table database).",
   "En un laboratorio agregas dos rutas predeterminadas con distancias diferentes, ejecutas `get router info routing-table all` para ver solo la activa y luego ejecutas la versión `database` para confirmar que el respaldo está presente y listo, lo que vuelve concreto el modelo de dos vistas."
  ],
  "terms": [
   [
    "Routing table, RIB (tabla de enrutamiento)",
    "Las rutas activas que se usan actualmente para reenviar tráfico; se muestran con get router info routing-table all."
   ],
   [
    "Routing database (base de datos de enrutamiento)",
    "Todas las rutas candidatas que conoce el FortiGate, activas e inactivas; se muestran con get router info routing-table database."
   ],
   [
    "Active vs inactive route (ruta activa vs inactiva)",
    "Una ruta activa está instalada y reenviando; una ruta inactiva (por ejemplo, un respaldo con mayor distancia) espera en la base de datos."
   ],
   [
    "Standby/backup route (ruta en espera/de respaldo)",
    "Una ruta (a menudo una ruta estática flotante) que permanece en la base de datos hasta que se elimine la ruta activa."
   ]
  ],
  "example": "Un administrador configura una ruta predeterminada de respaldo con distancia 20, pero no la ve en get router info routing-table all; al revisar get router info routing-table database confirma que está presente como ruta inactiva, lista para tomar el control.",
  "tip": "Las rutas de respaldo y de mayor distancia aparecen solo en la vista de la base de datos, no en la tabla de enrutamiento activa. Usa routing-table all para las rutas activas y la palabra clave database para todo lo conocido.",
  "check": [
   [
    "¿Qué comando muestra solo las rutas que se usan actualmente para reenviar tráfico?",
    "get router info routing-table all, que muestra la tabla de enrutamiento activa."
   ],
   [
    "¿Dónde buscas para confirmar que existe una ruta de respaldo inactiva?",
    "En get router info routing-table database, que enumera todas las rutas conocidas, incluidas las inactivas/en espera."
   ],
   [
    "¿Por qué una ruta configurada podría no aparecer en routing-table all?",
    "Porque perdió la selección de rutas (por ejemplo, un respaldo con mayor distancia) y está inactiva; aun así aparecerá en la vista de la base de datos."
   ]
  ]
 },
 {
  "t": "Reverse path forwarding (RPF) check",
  "tt": "Comprobación de reverse path forwarding (RPF)",
  "body": [
   "Reverse path forwarding (RPF), también llamada comprobación anti-spoofing, verifica que el tráfico que llega a una interfaz tenga un camino de regreso plausible. Es un control de seguridad integrado en el procesamiento de paquetes del FortiGate, y es una causa común, y a veces sorprendente, de tráfico descartado que el examen espera que reconozcas.",
   "La idea: cuando llega un paquete, el FortiGate mira su dirección de origen y se pregunta: '¿Tengo una ruta de regreso a este origen, y esa ruta enviaría las respuestas por la misma interfaz por la que entró el paquete?'. Si el FortiGate no tiene una ruta de regreso hacia el origen a través de la interfaz de entrada, el paquete se descarta como posible suplantación (spoofing). Esto impide que un atacante falsifique una dirección de origen que el firewall no podría alcanzar legítimamente, y mantiene la coherencia del enrutamiento de la red.",
   "FortiGate admite dos modos de RPF. El RPF feasible-path, el predeterminado (a veces llamado loose o flexible), acepta el paquete si existe cualquier ruta activa de regreso al origen a través de la interfaz de entrada, aunque no sea la mejor ruta (útil cuando hay varios caminos). El RPF estricto (`set strict-src-check enable` en `config system settings`) exige que la mejor ruta de regreso al origen use la misma interfaz por la que llegó el paquete. El RPF también se puede desactivar por interfaz con `set src-check disable`. El concepto clave para el examen es que RPF condiciona la aceptación a la existencia de una ruta de regreso por la interfaz de entrada.",
   "El síntoma clásico: el tráfico de una subred se descarta y un debug flow muestra una falla en la comprobación de reverse path, aunque una política de firewall lo permitiría. La causa es que el FortiGate no tiene una ruta de regreso a esa subred de origen a través de la interfaz por la que llegó el tráfico, a menudo tras un cambio de enrutamiento asimétrico, una subred nueva a la que le falta una ruta, o un enlace a través del cual el FortiGate no tiene una ruta de regreso. Agregar una ruta para esa subred de origen a través de la interfaz de entrada lo resuelve.",
   "Por eso las fallas de RPF aparecen con frecuencia después de cambios en la red: existe un nuevo camino de entrada, pero nunca se agregó la ruta de regreso correspondiente, así que la comprobación descarta el tráfico. Reconocer el mensaje de depuración y conocer la solución (agregar la ruta de regreso que falta) es la conclusión lista para el examen.",
   "En un laboratorio puedes provocar un descarte por RPF enviando tráfico desde una subred hacia la que el FortiGate no tiene ruta de regreso, leer la falla de reverse path en el debug flow y luego agregar la ruta y ver cómo el tráfico pasa."
  ],
  "terms": [
   [
    "Reverse path forwarding, RPF (reenvío por camino inverso)",
    "Una comprobación anti-spoofing que descarta los paquetes cuyo origen no tiene una ruta de regreso válida a través de la interfaz por la que llegaron."
   ],
   [
    "Strict RPF (RPF estricto)",
    "Un modo que exige que la mejor ruta de regreso al origen use la misma interfaz por la que llegó el paquete."
   ],
   [
    "Feasible-path / loose RPF (RPF flexible)",
    "El modo predeterminado y más permisivo, que acepta el paquete si existe alguna ruta activa de regreso al origen a través de la interfaz de entrada, aunque no sea la mejor ruta."
   ],
   [
    "Asymmetric routing (enrutamiento asimétrico)",
    "Una situación en la que el tráfico toma caminos diferentes en cada sentido; un detonante común de descartes por RPF cuando falta la ruta de regreso."
   ]
  ],
  "example": "El tráfico de 172.20.5.0/24 que llega por port3 se descarta y el debug flow muestra una falla en la comprobación de reverse path; el FortiGate no tiene una ruta de regreso a esa subred a través de port3, así que agregar una lo soluciona.",
  "tip": "Una falla de RPF (reverse path) en un debug flow casi siempre significa que falta una ruta de regreso para la subred de origen a través de la interfaz de entrada, algo común tras cambios de enrutamiento asimétrico. Agrega la ruta.",
  "check": [
   [
    "¿Qué hace la comprobación de reverse path forwarding?",
    "Descarta los paquetes cuya dirección de origen no tiene una ruta de regreso válida a través de la interfaz por la que llegaron, bloqueando el tráfico suplantado."
   ],
   [
    "El tráfico se descarta con una falla en la comprobación de reverse path, aunque una política lo permite. ¿Cuál es la causa probable y la solución?",
    "Al FortiGate le falta una ruta de regreso a la subred de origen a través de la interfaz de entrada; agrega esa ruta de regreso."
   ],
   [
    "¿Cuál es la diferencia entre el RPF estricto y el flexible (loose)?",
    "El estricto exige que la mejor ruta de regreso use la interfaz de entrada; el modo predeterminado feasible-path (flexible) solo exige que exista alguna ruta activa de regreso al origen a través de la interfaz de entrada."
   ]
  ]
 },
 {
  "t": "Link health monitors and blackhole routes",
  "tt": "Link health monitors y rutas blackhole",
  "body": [
   "Una ruta estática, por sí sola, solo desaparece si su interfaz se cae físicamente; permanece en la tabla incluso cuando el camino más allá del siguiente salto está roto. Dos funciones cubren los huecos que esto crea: los link health monitors detectan un camino muerto y retiran su ruta, y las rutas blackhole descartan de forma segura el tráfico que de otro modo se filtraría al lugar equivocado. Ambas son elementos básicos de un diseño resiliente de FortiGate y aparecen con regularidad en el examen.",
   "Un link health monitor (también llamado link monitor o SLA link monitor) sondea activamente un objetivo a través de una interfaz específica, usando ping, HTTP, DNS o TCP, y vigila las respuestas. Si los sondeos fallan (latencia, pérdida de paquetes o ausencia de respuesta más allá de los umbrales configurados), el FortiGate concluye que el camino está muerto y puede retirar la ruta estática asociada de la tabla de enrutamiento, actualizar su estado y, así, permitir que una ruta de respaldo tome el control. Esto resuelve el problema central de que un gateway del siguiente salto puede ser accesible en la capa 2 mientras el camino más allá está roto: sin un health monitor, la ruta permanece y el tráfico se pierde en silencio. Así que, para retirar una ruta predeterminada principal cuando el gateway del ISP deja de responder, asocias un link health monitor a esa interfaz WAN con un objetivo más allá del gateway.",
   "La decisión del link monitor se puede vincular a rutas específicas, de modo que solo se retiren las rutas afectadas cuando falla el sondeo, permitiendo que el failover ocurra automáticamente sin intervención del operador. Este es el mecanismo detrás del failover entre dos ISP con enrutamiento estático simple (y es la base de los performance SLAs de SD-WAN, que amplían la idea).",
   "Una ruta blackhole es una ruta cuya acción es descartar silenciosamente el tráfico coincidente (el siguiente salto es la interfaz null/blackhole). Le das una distancia administrativa alta para que normalmente esté inactiva, detrás de la ruta real. Su función es capturar el tráfico cuando desaparece la ruta real. El uso clásico es con túneles IPsec: agregas una ruta blackhole para las subredes privadas alcanzables a través del túnel, con una distancia mayor que la ruta del túnel. Mientras el túnel está activo, gana la ruta específica del túnel y el tráfico fluye; si el túnel se cae, su ruta se elimina y, en lugar de que el tráfico siga la ruta predeterminada hacia Internet en texto claro, la ruta blackhole lo descarta. Esto evita que el tráfico interno sensible se filtre y previene bucles de enrutamiento confusos.",
   "En conjunto: los link health monitors proporcionan la detección y el retiro automático de rutas, y las rutas blackhole proporcionan el descarte seguro del tráfico cuando una ruta ya no está. En un laboratorio agregas un link health monitor a la WAN principal, bloqueas el objetivo del sondeo y observas cómo la ruta desaparece de la tabla."
  ],
  "terms": [
   [
    "Link health monitor (monitor de salud del enlace)",
    "Un sondeo activo (ping, HTTP, DNS, TCP) a través de una interfaz que retira la ruta asociada cuando el camino falla."
   ],
   [
    "Route withdrawal on failure (retiro de ruta ante falla)",
    "Eliminar una ruta estática de la tabla cuando su health monitor detecta un camino muerto, permitiendo que un respaldo tome el control."
   ],
   [
    "Blackhole route (ruta blackhole / agujero negro)",
    "Una ruta que descarta silenciosamente el tráfico coincidente, normalmente con una distancia alta para que se active solo cuando la ruta real ya no está."
   ],
   [
    "Traffic leak prevention (prevención de fugas de tráfico)",
    "Usar una ruta blackhole para que, cuando un túnel/ruta se cae, el tráfico sensible se descarte en lugar de seguir la ruta predeterminada hacia afuera."
   ]
  ],
  "example": "Una sucursal agrega un link health monitor que hace ping a un objetivo más allá del gateway de su ISP principal; cuando falla el camino del ISP, los sondeos se detienen, el FortiGate retira la ruta predeterminada principal y la ruta del ISP de respaldo toma el control automáticamente.",
  "tip": "Un link monitor es lo que detecta un camino muerto y retira la ruta, ya que de otro modo una ruta permanece activa mientras su interfaz esté activa. Las rutas blackhole (con distancia alta) evitan que el tráfico se filtre cuando se cae un túnel.",
  "check": [
   [
    "¿Por qué agregar un link health monitor en lugar de depender solo de la ruta estática?",
    "Una ruta estática permanece en la tabla mientras su interfaz esté activa, aunque el camino más allá del gateway esté roto; un health monitor sondea el camino y retira la ruta ante una falla para que un respaldo tome el control."
   ],
   [
    "¿Por qué agregar una ruta blackhole para las subredes privadas en un sitio con túneles IPsec?",
    "Para que, si desaparece la ruta de un túnel, el tráfico se descarte silenciosamente en lugar de seguir la ruta predeterminada hacia Internet en texto claro."
   ],
   [
    "¿Qué distancia debe tener una ruta blackhole de respaldo en relación con la ruta real?",
    "Una distancia mayor, para que permanezca inactiva mientras la ruta real está presente y solo se active cuando esa ruta se elimine."
   ]
  ]
 },
 {
  "t": "SD-WAN members and zones, and routes that point to the zone",
  "tt": "Miembros y zonas de SD-WAN, y rutas que apuntan a la zona",
  "body": [
   "La WAN definida por software (SD-WAN) en FortiGate te permite tratar varios enlaces WAN como un solo conjunto inteligente que dirige el tráfico según la calidad del enlace y las reglas, y no solo según el enrutamiento estático. Los componentes básicos son los miembros y las zonas, además de un detalle de enrutamiento que confunde a muchos: SD-WAN sigue necesitando una ruta para funcionar.",
   "Un miembro de SD-WAN es una interfaz participante (por ejemplo wan1, wan2 o una interfaz de túnel IPsec) agregada a SD-WAN con ajustes por miembro, como su gateway y su costo. Los miembros son los caminos físicos o lógicos entre los que SD-WAN puede elegir. Agregas cada enlace WAN como miembro para que SD-WAN pueda medirlo y usarlo.",
   "Una zona de SD-WAN agrupa miembros. Las zonas te permiten organizar los miembros (por ejemplo, una zona 'internet' con dos enlaces de banda ancha y una zona 'overlay' con túneles VPN) y, lo más importante, son lo que referencian las políticas de firewall y las rutas. Una vez que una interfaz se convierte en miembro de SD-WAN, ya no seleccionas esa interfaz individual directamente en una política de firewall; seleccionas la zona de SD-WAN que la contiene. Esta es una trampa frecuente del examen: después de agregar wan1 a SD-WAN ya no puedes elegir wan1 en una política; eliges la zona.",
   "La parte del enrutamiento es la que la gente olvida. Las reglas de SD-WAN por sí solas no inyectan rutas; solo dirigen el tráfico que la tabla de enrutamiento ya decidió enviar hacia SD-WAN. Así que debes agregar una ruta estática (normalmente una ruta predeterminada) que apunte a la zona de SD-WAN. Sin esa ruta, incluso un conjunto perfectamente configurado de miembros, SLAs y reglas no transportará tráfico, porque nada le indica a la tabla de enrutamiento que entregue el tráfico a SD-WAN. Cuando alguien elimina las antiguas rutas predeterminadas por interfaz y olvida agregar una ruta predeterminada a la zona, el acceso a Internet falla aunque SD-WAN esté 'configurado'.",
   "Así que el conjunto mínimo que funciona es: interfaces agregadas como miembros, miembros agrupados en una zona, una ruta estática (predeterminada) que apunta a la zona, políticas de firewall que usan la zona, y encima los performance SLAs y las reglas. La ruta hace que el tráfico sea elegible para SD-WAN; luego las reglas y los SLAs eligen entre los miembros.",
   "En un laboratorio pones dos interfaces WAN en una zona de SD-WAN, agregas una ruta predeterminada que apunta a la zona y referencias la zona en una política de firewall, confirmando que el tráfico fluye antes de agregar SLAs y reglas."
  ],
  "terms": [
   [
    "SD-WAN member (miembro de SD-WAN)",
    "Una interfaz WAN o un túnel agregado a SD-WAN como camino seleccionable, con ajustes por miembro como el gateway y el costo."
   ],
   [
    "SD-WAN zone (zona de SD-WAN)",
    "Un grupo de miembros que las políticas de firewall y las rutas referencian en lugar de las interfaces individuales."
   ],
   [
    "Zone reference in policy (referencia a la zona en la política)",
    "Después de que una interfaz se convierte en miembro, las políticas seleccionan la zona de SD-WAN, no la interfaz directamente."
   ],
   [
    "Route to the zone (ruta hacia la zona)",
    "Una ruta estática (normalmente predeterminada) que apunta a la zona de SD-WAN, necesaria para que la tabla de enrutamiento entregue el tráfico a SD-WAN."
   ]
  ],
  "example": "Después de agregar wan1 y wan2 a una zona de SD-WAN, un administrador no puede seleccionar wan1 en una política de firewall y el acceso a Internet falla; referenciar la zona de SD-WAN en la política y agregar una ruta predeterminada hacia la zona lo restablece.",
  "tip": "Dos trampas de SD-WAN: las políticas deben referenciar la zona (no la interfaz miembro), y debes agregar una ruta estática predeterminada que apunte a la zona, o las reglas de SD-WAN no tendrán tráfico que dirigir.",
  "check": [
   [
    "Después de agregar una interfaz a SD-WAN, ¿qué debe referenciar una política de firewall?",
    "La zona de SD-WAN que contiene al miembro, no la interfaz individual, que ya no se puede seleccionar directamente."
   ],
   [
    "¿Por qué SD-WAN sigue necesitando una ruta estática hacia la zona?",
    "Las reglas de SD-WAN solo dirigen el tráfico que la tabla de enrutamiento ya envía a SD-WAN; una ruta que apunta a la zona es lo que hace que el tráfico sea elegible."
   ],
   [
    "¿Cuál es el conjunto mínimo de piezas para que SD-WAN funcione?",
    "Miembros en una zona, una ruta estática hacia la zona, políticas que usan la zona, más los performance SLAs y las reglas."
   ]
  ]
 },
 {
  "t": "Performance SLAs: probes, latency, jitter, packet loss, SLA targets",
  "tt": "Performance SLAs: sondeos, latencia, jitter, pérdida de paquetes, objetivos de SLA",
  "body": [
   "Los performance SLAs (acuerdos de nivel de servicio) son la forma en que SD-WAN mide cada enlace para poder tomar decisiones basadas en la calidad. En lugar de adivinar qué WAN está sana, el FortiGate sondea continuamente a cada miembro y compara los resultados con objetivos. Entender qué se mide y cómo funcionan los objetivos es central en la parte de SD-WAN del examen.",
   "Un performance SLA envía sondeos a través de cada miembro de SD-WAN hacia un servidor de sondeo (un objetivo alcanzable, como un servidor DNS público, un servidor en el centro de datos o un servicio a través de un overlay VPN). Los protocolos de sondeo incluyen ping (ICMP), HTTP, DNS, TCP y otros; eliges uno al que el objetivo responda de forma confiable. Los sondeos se ejecutan en un intervalo y, a partir de las respuestas, el FortiGate calcula tres métricas de calidad por miembro: latencia (retardo de ida y vuelta), jitter (variación del retardo entre sondeos) y pérdida de paquetes (el porcentaje de sondeos que no obtuvieron respuesta). Estos tres números describen qué tan bueno es cada camino en ese momento, y son exactamente lo que consultan las reglas de SD-WAN.",
   "Los objetivos de SLA convierten las mediciones en bruto en un juicio de cumple/no cumple. En el performance SLA defines uno o más objetivos de SLA que fijan umbrales, por ejemplo latencia menor a 150 ms, jitter menor a 30 ms y pérdida de paquetes menor al 2 por ciento. Un miembro cumple el SLA cuando sus mediciones están dentro de todos los umbrales del objetivo y no lo cumple cuando se supera cualquiera de ellos. Las reglas que referencian un SLA (como lowest cost (SLA) o maximize bandwidth (SLA)) actúan entonces solo sobre los miembros que cumplen el objetivo en ese momento, sacando el tráfico de un miembro en el instante en que deja de cumplir el SLA.",
   "Este es el motor detrás de la selección de enlaces y del failover: un enlace que desarrolla una alta pérdida o latencia deja de cumplir su SLA y el tráfico se desplaza a los miembros que aún lo cumplen, sin ningún cambio en las rutas estáticas. Es más reactivo que un simple link monitor porque responde a la degradación de la calidad, no solo a una falla total. También puedes vincular el retiro de rutas al estado del SLA para que un enlace que deja de cumplir el SLA se comporte como un enlace caído.",
   "Puntos de diseño sensatos: elige un objetivo de sondeo que realmente represente el destino del camino (sondear el gateway local no revela la pérdida del lado de Internet), define los objetivos según las necesidades de tu aplicación (la voz tolera poco jitter/pérdida, la transferencia masiva tolera más) y recuerda que el SLA solo mide; las reglas deciden qué hacer con el resultado.",
   "En un laboratorio agregas un performance SLA por ping hacia un servidor de sondeo en cada miembro y luego ejecutas `diagnose sys sdwan health-check` para ver la latencia, el jitter y la pérdida en vivo, y si cada miembro cumple el objetivo."
  ],
  "terms": [
   [
    "Performance SLA (SLA de rendimiento)",
    "Un health check de SD-WAN que sondea a cada miembro y mide la latencia, el jitter y la pérdida de paquetes frente a objetivos."
   ],
   [
    "Probe / probe server (sondeo / servidor de sondeo)",
    "La prueba periódica (ping, HTTP, DNS, TCP) enviada a un objetivo alcanzable para medir la calidad de un miembro."
   ],
   [
    "Latency, jitter, packet loss (latencia, jitter, pérdida de paquetes)",
    "Las tres métricas medidas: retardo de ida y vuelta, variación del retardo y porcentaje de sondeos perdidos."
   ],
   [
    "SLA target (objetivo de SLA)",
    "Valores umbral (por ejemplo, latencia/jitter/pérdida máximos) que deciden si un miembro cumple el SLA en ese momento."
   ]
  ],
  "example": "Para el tráfico de voz, un administrador define un objetivo de performance SLA de latencia menor a 150 ms, jitter menor a 30 ms y pérdida menor al 1 por ciento; cuando el jitter de un enlace de banda ancha se dispara por encima del objetivo, deja de cumplir el SLA y la voz se desplaza a un miembro que aún lo cumple.",
  "tip": "Sondea un objetivo que represente el destino real, no el gateway local, o el SLA no detectará la pérdida del lado de Internet. El SLA solo mide; las reglas de SD-WAN actúan según qué miembros cumplen el objetivo.",
  "check": [
   [
    "¿Qué tres métricas mide un performance SLA?",
    "Latencia (retardo de ida y vuelta), jitter (variación del retardo) y pérdida de paquetes (porcentaje de sondeos sin respuesta)."
   ],
   [
    "¿Qué hace un objetivo de SLA?",
    "Fija valores umbral dentro de los cuales deben mantenerse las mediciones de un miembro para cumplir el SLA; superar cualquier umbral significa que el miembro no cumple el SLA."
   ],
   [
    "¿Por qué sondear un objetivo más allá del gateway local?",
    "Para que el SLA refleje la verdadera calidad del camino hacia el destino; sondear solo el gateway local no detectaría la pérdida y la latencia más adelante en el camino."
   ]
  ]
 },
 {
  "t": "SD-WAN rules: manual, best quality, lowest cost (SLA), maximize bandwidth (SLA); implicit rule",
  "tt": "Reglas de SD-WAN: manual, best quality, lowest cost (SLA), maximize bandwidth (SLA); regla implícita",
  "body": [
   "Las reglas de SD-WAN (también llamadas SD-WAN services) deciden qué miembro transporta una clase de tráfico determinada, usando las mediciones de los performance SLAs. Cada regla coincide con el tráfico (por origen, destino, aplicación o ISDB) y aplica una estrategia para elegir entre los miembros elegibles. Conocer las cuatro estrategias y la regla implícita es material central del examen.",
   "El modo manual asigna el tráfico coincidente a miembros específicos en un orden elegido, ignorando las mediciones del SLA. Lo usas cuando quieres un control determinista, por ejemplo 'enviar siempre este tráfico primero por MPLS y recurrir a la banda ancha como respaldo', sin importar la calidad medida. Es sencillo, pero por sí solo no reacciona a la degradación del enlace.",
   "Best quality selecciona el miembro con el mejor valor medido de una métrica elegida: latencia, jitter, pérdida de paquetes o ancho de banda. Mueve continuamente el tráfico al enlace que en ese momento obtiene la mejor puntuación en esa métrica. Es ideal cuando siempre quieres el camino objetivamente mejor (por ejemplo, voz que debe usar el enlace con menor jitter), pero puede hacer oscilar el tráfico entre enlaces cuando su calidad es parecida y puede mover el tráfico aun cuando el enlace actual es perfectamente adecuado.",
   "Lowest cost (SLA) elige el miembro más barato (según el costo configurado de los miembros) entre los que cumplen el objetivo del SLA en ese momento. Solo saca el tráfico del enlace barato cuando ese enlace deja de cumplir el SLA, y luego elige el siguiente miembro más barato que aún lo cumple. Esta es la estrategia para 'usar la banda ancha barata mientras sea suficientemente buena y pasar al costoso MPLS solo cuando la banda ancha deje de cumplir el SLA', maximizando la eficiencia de costos mientras se garantiza un piso de calidad. A diferencia de best quality, no persigue mejoras marginales.",
   "Maximize bandwidth (SLA), también llamada balanceo de carga, reparte el tráfico entre todos los miembros que cumplen el SLA en ese momento, usándolos en paralelo para aumentar el rendimiento total. Es adecuada para tráfico masivo o agregado, cuando quieres usar a la vez todos los enlaces aceptables en lugar de elegir uno.",
   "Por último, la regla implícita es la regla general al final de la lista de reglas de SD-WAN: cualquier tráfico que no coincida con ninguna regla explícita lo maneja la regla implícita, que usa un método de balanceo de carga predeterminado configurable (como por IP de origen) entre los miembros. Garantiza que todo el tráfico de SD-WAN tenga un camino, incluso sin una regla específica. Las reglas explícitas se evalúan de arriba hacia abajo por encima de ella.",
   "En un laboratorio agregas una regla lowest cost (SLA) para el tráfico general de Internet y una regla best quality para la voz, y luego verificas con `diagnose sys sdwan service` qué regla y qué miembro usa cada flujo."
  ],
  "terms": [
   [
    "Manual rule (regla manual)",
    "Asigna el tráfico coincidente a miembros especificados en orden, ignorando las mediciones del SLA."
   ],
   [
    "Best quality (mejor calidad)",
    "Selecciona el miembro con la mejor métrica medida (latencia, jitter, pérdida o ancho de banda), persiguiendo siempre la mejor puntuación."
   ],
   [
    "Lowest cost (SLA) (menor costo)",
    "Selecciona el miembro más barato que cumple el objetivo del SLA en ese momento, y solo lo abandona cuando deja de cumplir el SLA."
   ],
   [
    "Maximize bandwidth (SLA) / implicit rule (maximizar ancho de banda / regla implícita)",
    "Maximize bandwidth reparte el tráfico entre todos los miembros que cumplen el SLA; la regla implícita es la regla general para el tráfico que no coincide con ninguna regla explícita."
   ]
  ],
  "example": "Un administrador quiere usar la banda ancha barata mientras cumpla con la calidad y MPLS solo como respaldo, así que elige lowest cost (SLA); best quality movería el tráfico a MPLS cada vez que obtuviera una puntuación apenas mejor.",
  "tip": "Best quality siempre persigue la mejor métrica aunque el enlace actual esté bien; lowest cost (SLA) solo cambia cuando el enlace barato deja de cumplir el SLA. Ajusta la estrategia a la intención que plantea la pregunta.",
  "check": [
   [
    "¿Qué estrategia mantiene el tráfico en el enlace de menor costo hasta que deja de cumplir el SLA?",
    "Lowest cost (SLA), que usa el miembro más barato que cumple el SLA y solo cambia cuando ese miembro deja de cumplirlo."
   ],
   [
    "¿Qué estrategia usa siempre el enlace con la mejor métrica medida?",
    "Best quality, que selecciona el miembro con el mejor valor de latencia, jitter, pérdida o ancho de banda."
   ],
   [
    "¿Qué maneja el tráfico de SD-WAN que no coincide con ninguna regla explícita?",
    "La regla implícita, una regla general que usa un método de balanceo de carga predeterminado configurable entre los miembros."
   ]
  ]
 },
 {
  "t": "SD-WAN monitoring and troubleshooting: `diagnose sys sdwan health-check`, `diagnose sys sdwan service`",
  "tt": "Monitoreo y resolución de problemas de SD-WAN: `diagnose sys sdwan health-check`, `diagnose sys sdwan service`",
  "body": [
   "Cuando SD-WAN no se comporta como se espera, dos comandos de la CLI responden las dos preguntas que importan: ¿los enlaces se miden como sanos?, y ¿qué miembro está usando realmente cada regla? Saber qué revela cada comando es la habilidad práctica, evaluada en el examen, para resolver problemas de SD-WAN.",
   "El comando `diagnose sys sdwan health-check` muestra los resultados en vivo de los performance SLAs. Para cada SLA y cada miembro informa la latencia, el jitter y la pérdida de paquetes medidos, y si el miembro cumple en ese momento el objetivo del SLA (su estado de SLA). Aquí es donde confirmas que los sondeos realmente funcionan y ves por qué se está evitando un miembro: si un enlace muestra una pérdida alta o no cumple el SLA, eso explica por qué el tráfico salió de él. Si un health check no muestra mediciones, puede que el servidor de sondeo sea inalcanzable o que el SLA esté mal configurado. Así que este comando diagnostica la capa de medición, los datos de calidad en bruto en los que se basan las decisiones de SD-WAN.",
   "El comando `diagnose sys sdwan service` muestra las reglas de SD-WAN (services) y, para cada una, qué miembros están seleccionados en ese momento y en qué orden, según la estrategia de la regla y el estado actual del SLA. Te dice qué miembro usará ahora mismo una regla determinada y por qué, revelando si una regla está dirigiendo el tráfico al miembro que esperas. Cuando el tráfico toma el camino equivocado, este comando muestra si el miembro elegido por la regla coincide con tu intención y si se excluyeron miembros por no cumplir el SLA.",
   "Usados juntos, forman un flujo de diagnóstico claro. Primero ejecuta el health check para confirmar las mediciones y el estado de SLA de cada miembro, porque las reglas actúan sobre ese estado. Luego ejecuta el comando service para ver cómo las reglas tradujeron ese estado en la selección de miembros. Si el health check está bien pero el tráfico sigue yendo por el camino equivocado, el problema está en la lógica o el orden de las reglas; si el health check muestra mediciones fallidas o ausentes, corrige primero el sondeo/SLA. Este enfoque de arriba hacia abajo, primero la medición y luego la decisión, aísla rápidamente si un problema está en la calidad del enlace, la configuración del sondeo o el diseño de las reglas.",
   "Además de estos, el monitor de SD-WAN en la GUI muestra la misma información de forma gráfica, y la comprobación de la tabla de enrutamiento sigue aplicando (recuerda la ruta predeterminada hacia la zona). Pero para una pregunta de examen basada en la CLI sobre ver las mediciones del SLA frente a ver qué miembro usa una regla, health-check son las mediciones y service es la asignación de regla a miembro.",
   "En un laboratorio degradas deliberadamente un enlace (bloqueando su objetivo de sondeo), observas cómo falla en `diagnose sys sdwan health-check` y luego confirmas en `diagnose sys sdwan service` que la regla afectada se movió a otro miembro."
  ],
  "terms": [
   [
    "diagnose sys sdwan health-check",
    "Muestra las mediciones del SLA por miembro (latencia, jitter, pérdida) y si cada miembro cumple el objetivo del SLA."
   ],
   [
    "diagnose sys sdwan service",
    "Muestra cada regla de SD-WAN y qué miembro(s) selecciona en ese momento, y en qué orden, según la estrategia y el estado del SLA."
   ],
   [
    "SLA state (estado de SLA)",
    "Si un miembro cumple en ese momento su objetivo de SLA, lo que las reglas usan para decidir la elegibilidad de los miembros."
   ],
   [
    "Measurement-then-decision flow (flujo medición-luego-decisión)",
    "Resolver problemas revisando primero health-check (los datos) y luego service (cómo las reglas usaron los datos)."
   ]
  ],
  "example": "El tráfico está usando MPLS inesperadamente en lugar de la banda ancha, así que el administrador ejecuta diagnose sys sdwan health-check y ve que la banda ancha no cumple su objetivo de pérdida, lo que explica por qué la regla lowest cost (SLA) (vista en diagnose sys sdwan service) seleccionó MPLS.",
  "tip": "Health-check muestra las mediciones y el cumplimiento del SLA; service muestra qué miembro eligió cada regla. Revisa primero las mediciones, ya que las reglas actúan sobre el estado del SLA, y luego revisa cómo lo usó la regla.",
  "check": [
   [
    "¿Qué comando muestra la latencia, el jitter y la pérdida de paquetes en vivo de cada miembro de SD-WAN?",
    "diagnose sys sdwan health-check, que también muestra si cada miembro cumple su objetivo de SLA."
   ],
   [
    "¿Qué comando muestra qué miembro está usando en ese momento una regla de SD-WAN?",
    "diagnose sys sdwan service, que asocia cada regla con su(s) miembro(s) seleccionado(s) según la estrategia y el estado del SLA."
   ],
   [
    "Si el health-check está sano pero el tráfico toma el camino equivocado, ¿dónde está el problema?",
    "En la lógica o el orden de las reglas; el comando service revela cómo las reglas seleccionaron los miembros a pesar de las buenas mediciones."
   ]
  ]
 },
 {
  "t": "IPsec basics: IKEv1 vs IKEv2, phase 1 and phase 2, proposals, DH groups, PFS, UDP 500/4500 and NAT-T",
  "tt": "Fundamentos de IPsec: IKEv1 vs IKEv2, fase 1 y fase 2, propuestas, grupos DH, PFS, UDP 500/4500 y NAT-T",
  "body": [
   "IPsec construye túneles cifrados entre sitios a través de Internet, que no es confiable. FortiGate negocia estos túneles con el protocolo Internet Key Exchange (IKE) en dos fases, y el examen evalúa las fases, los parámetros que deben coincidir y los puertos involucrados.",
   "IKE viene en dos versiones. IKEv1 es el protocolo más antiguo, que usa un intercambio de fase 1 (main mode con seis mensajes, o el aggressive mode, más rápido pero menos seguro, con tres) y luego la fase 2 (quick mode). IKEv2 es el sucesor moderno: negocia con menos mensajes, tiene soporte integrado para funciones como NAT traversal y EAP, es más resiliente y generalmente se prefiere para implementaciones nuevas. Ambos pares (peers) deben usar la misma versión de IKE para formar un túnel, así que una discrepancia de versión impide por completo la negociación.",
   "La fase 1 establece la asociación de seguridad (SA) de IKE: los pares se autentican mutuamente (con clave precompartida o certificado) y construyen un canal seguro y cifrado para la negociación posterior. Para que la fase 1 tenga éxito, ambos lados deben coincidir en la versión de IKE, el método de autenticación y las credenciales, las propuestas de cifrado/hash y el grupo Diffie-Hellman (DH). Si la fase 1 se levanta, sabes que la clave, la versión de IKE y la conectividad básica son correctas.",
   "La fase 2 establece la SA de IPsec que realmente protege los datos de los usuarios. Aquí los pares deben coincidir en sus propuestas de fase 2 (algoritmos de cifrado y autenticación), el grupo PFS/DH si se usa perfect forward secrecy, y los selectores de quick mode (las subredes local y remota que transportará el túnel). Las discrepancias en los selectores o las propuestas son la razón más común por la que la fase 1 tiene éxito pero la fase 2 falla.",
   "Una propuesta es un conjunto de algoritmos (por ejemplo, AES-256 con SHA-256) ofrecido durante la negociación; los pares eligen una combinación que ambos admitan. El grupo Diffie-Hellman determina la fortaleza del intercambio de claves (los grupos MODP más grandes, como el 14, y los de curva elíptica, como el 19 y el 20, son más fuertes que los grupos heredados 1, 2 y 5; el número del grupo por sí solo no indica su fortaleza). Perfect forward secrecy (PFS), habilitado en la fase 2, ejecuta un nuevo intercambio DH para cada nueva clave de fase 2, de modo que comprometer una clave no expone las claves pasadas ni futuras; sin PFS, las claves de fase 2 se derivan del material de la fase 1.",
   "En cuanto a los puertos: la negociación IKE usa UDP 500. Cuando un par está detrás de un dispositivo NAT, NAT traversal (NAT-T) detecta el NAT y traslada el resto del intercambio IKE y el tráfico cifrado a UDP 4500, encapsulando ESP en UDP para que pueda atravesar el NAT. Así que tanto UDP 500 como UDP 4500 deben estar abiertos entre los pares cuando hay NAT de por medio.",
   "En un laboratorio construyes un túnel basado en rutas y, para aprender los modos de falla, provocas una discrepancia en un selector de fase 2 y lees el debug de IKE hasta que puedas detectar el error."
  ],
  "terms": [
   [
    "IKEv1 vs IKEv2",
    "Versiones de IKE para negociar IPsec; IKEv2 es más nueva, usa menos mensajes y generalmente se prefiere. Ambos pares deben usar la misma versión."
   ],
   [
    "Phase 1 vs phase 2 (fase 1 vs fase 2)",
    "La fase 1 construye la SA de IKE autenticada (canal seguro); la fase 2 construye la SA de IPsec que cifra los datos de los usuarios."
   ],
   [
    "Proposal / DH group / PFS (propuesta / grupo DH / PFS)",
    "Una propuesta es el conjunto de algoritmos ofrecido; el grupo DH define la fortaleza del intercambio de claves; PFS ejecuta un nuevo DH por cada clave de fase 2 para que el compromiso de una clave no exponga a las demás."
   ],
   [
    "UDP 500 / 4500 (NAT-T)",
    "IKE usa UDP 500; cuando un par está detrás de NAT, NAT traversal traslada el tráfico ESP a UDP 4500."
   ]
  ],
  "example": "Dos FortiGates de sucursal forman un túnel IKEv2: la fase 1 los autentica con una clave precompartida por UDP 500 y, como una de las sucursales está detrás de un router con NAT, NAT-T traslada el tráfico cifrado a UDP 4500.",
  "tip": "Fase 1 arriba pero fase 2 abajo casi siempre significa discrepancias en las propuestas de fase 2, el grupo PFS/DH o los selectores. Y cuando un par está detrás de NAT, recuerda UDP 4500 (NAT-T), no solo UDP 500.",
  "check": [
   [
    "¿Qué establece cada fase de IPsec y qué debe coincidir?",
    "La fase 1 construye la SA de IKE (deben coincidir la versión de IKE, la autenticación, las propuestas y el grupo DH); la fase 2 construye la SA de IPsec (deben coincidir las propuestas, PFS/DH y los selectores)."
   ],
   [
    "¿Qué puertos se necesitan cuando un par IPsec está detrás de NAT?",
    "UDP 500 para IKE y UDP 4500 para NAT traversal (NAT-T)."
   ],
   [
    "¿Qué hace habilitar PFS en la fase 2?",
    "Ejecuta un nuevo intercambio Diffie-Hellman para cada clave de fase 2, de modo que comprometer una clave no expone a las demás."
   ]
  ]
 },
 {
  "t": "Route-based (interface-mode) vs policy-based IPsec",
  "tt": "IPsec basado en rutas (interface-mode) vs basado en políticas",
  "body": [
   "FortiGate puede construir VPNs IPsec en dos estilos, basado en rutas (route-based o interface-mode) y basado en políticas (policy-based), y la elección determina qué tan flexible y escalable es la VPN. Los diseños modernos casi siempre usan route-based, y el examen quiere que sepas por qué.",
   "En una VPN route-based (interface-mode), crear el túnel produce una interfaz de túnel virtual en el FortiGate. Esta interfaz se comporta como cualquier otra: puedes agregar rutas estáticas o dinámicas que apunten a través de ella, referenciarla en políticas de firewall normales, ponerla en una zona de SD-WAN y usarla con ADVPN. Como el túnel es una interfaz enrutable, puedes enviar tráfico a través de él según la tabla de enrutamiento, agregar rutas de respaldo con distancias diferentes para el failover y ejecutar protocolos de enrutamiento dinámico a través de él. Esta flexibilidad es exactamente lo que necesitan las topologías grandes, redundantes o dinámicas.",
   "En una VPN policy-based, el túnel no es una interfaz; en su lugar, está vinculado directamente a una política de firewall IPsec especial que especifica la acción de cifrado. El tráfico se cifra cuando coincide con esa política. Esto es más fácil de entender para un solo túnel, pero mucho menos flexible: no puedes enrutar libremente a través del túnel, el enrutamiento de respaldo y el enrutamiento dinámico son incómodos o imposibles, y no encaja con SD-WAN ni con ADVPN. El modo policy-based es en gran medida heredado y se usa para casos simples o de interoperabilidad específicos.",
   "Las consecuencias prácticas que evalúa el examen: las VPNs route-based admiten rutas de respaldo y failover basado en rutas (dos túneles con distancias de ruta diferentes, más DPD), enrutamiento dinámico, pertenencia a SD-WAN y los atajos (short-cuts) de ADVPN, porque el túnel es una interfaz que las rutas y las políticas pueden usar. Las VPNs policy-based vinculan el túnel a una sola política y son difíciles de escalar.",
   "Una nota clave de resolución de problemas que se deriva del diseño route-based: un túnel en interface-mode puede aparecer como activo (up) mientras no pasa tráfico, porque estar activo no basta; también necesitas una ruta que dirija el tráfico de la subred remota hacia la interfaz del túnel y políticas de firewall que permitan ese tráfico en ambas direcciones. La fortaleza del cifrado es idéntica en ambos modos, así que route-based se prefiere por su flexibilidad, no por una criptografía más fuerte.",
   "Para casi cualquier implementación de FortiGate, elige route-based. En un laboratorio construyes un túnel route-based y luego confirmas que debes agregar una ruta a través de la interfaz del túnel y políticas entre la LAN y el túnel antes de que el tráfico fluya, lo que afianza por qué importa el modelo de interfaz."
  ],
  "terms": [
   [
    "Route-based / interface-mode VPN (VPN basada en rutas)",
    "Una VPN IPsec que crea una interfaz de túnel virtual utilizable por rutas, políticas de firewall, SD-WAN y ADVPN."
   ],
   [
    "Policy-based VPN (VPN basada en políticas)",
    "Una VPN IPsec vinculada a una política de firewall de cifrado especial en lugar de a una interfaz; más simple, pero no escalable."
   ],
   [
    "Tunnel interface (interfaz de túnel)",
    "La interfaz virtual que produce una VPN route-based, a través de la cual enrutas el tráfico y a la que aplicas políticas."
   ],
   [
    "Scalability/flexibility (escalabilidad/flexibilidad)",
    "Las VPNs route-based admiten rutas de respaldo, enrutamiento dinámico, SD-WAN y ADVPN; las policy-based no."
   ]
  ],
  "example": "Una empresa construye túneles route-based para que cada túnel sea una interfaz que pueda agregar a SD-WAN y a la que pueda dar rutas de respaldo con distancias diferentes, habilitando un failover automático que una VPN policy-based no podría ofrecer.",
  "tip": "Prefiere las VPNs route-based (interface-mode): la interfaz de túnel permite que la usen las rutas, las políticas, SD-WAN y ADVPN. La fortaleza del cifrado es la misma que en policy-based, así que la razón es la flexibilidad, no una criptografía más fuerte.",
  "check": [
   [
    "¿Por qué se suele preferir una VPN IPsec route-based?",
    "Crea una interfaz de túnel que pueden usar las rutas (incluidas las de respaldo y dinámicas), las políticas de firewall, SD-WAN y ADVPN, lo que la hace escalable y flexible."
   ],
   [
    "¿A qué está vinculada una VPN policy-based en lugar de a una interfaz?",
    "A una política de firewall IPsec especial que define la acción de cifrado; el tráfico que coincide con la política se cifra."
   ],
   [
    "¿Es más fuerte el cifrado en el modo route-based que en el policy-based?",
    "No; la fortaleza del cifrado es la misma. Route-based se elige por flexibilidad, no por una criptografía más fuerte."
   ]
  ]
 },
 {
  "t": "Site-to-site with static peers and dial-up (dynamic) peers",
  "tt": "Sitio a sitio con pares estáticos y pares dial-up (dinámicos)",
  "body": [
   "IPsec sitio a sitio conecta dos redes a través de un túnel, y la forma de configurar la fase 1 depende de si cada par tiene una IP pública fija y conocida o una dinámica. La distinción entre estático y dial-up es un tema fijo del examen porque determina qué lado puede iniciar el túnel.",
   "Con pares estáticos, ambos extremos tienen direcciones IP públicas conocidas y fijas. La fase 1 de cada lado se configura con la IP específica del gateway remoto del otro, así que cualquiera de los dos pares puede iniciar el túnel y cada uno sabe exactamente dónde encontrar al otro. Este es el caso sencillo para dos centros de datos o sucursales con IPs estáticas.",
   "Los pares dial-up (dinámicos) manejan la situación común en la que la dirección de un lado es desconocida o cambia, por ejemplo una sucursal que recibe una IP pública dinámica de su ISP, o muchos sitios/clientes remotos que se conectan a un hub. En el lado que acepta estas conexiones (normalmente la sede central o el hub), configuras la fase 1 como servidor dial-up: no especifica un gateway remoto fijo porque no puede conocer de antemano las direcciones de quienes se conectan; en cambio, acepta túneles entrantes desde cualquier dirección que se autentique correctamente. El lado con la dirección desconocida se configura para apuntar a la IP fija del lado que acepta, e inicia el túnel.",
   "Esto lleva a la regla que evalúa el examen: el par con la dirección dinámica o desconocida debe ser el iniciador, y el par con la dirección estática lo acepta como par dial-up. Así que, para una sucursal con IP dinámica que se conecta a una sede con IP estática, la sede se configura con un par dial-up (dinámico) y la sucursal apunta a la IP estática de la sede e inicia el túnel. Dos pares dial-up nunca pueden conectarse, porque ninguno conoce la dirección del otro para iniciar, y una configuración estático a estático falla si uno de los lados en realidad tiene una dirección cambiante.",
   "Dial-up también es la forma de escalar un hub a muchos spokes o clientes de acceso remoto: una sola fase 1 dial-up en el hub acepta muchos túneles entrantes, y funciones como mode-config pueden asignar direcciones a quienes se conectan. La autenticación (clave precompartida o certificado, a menudo con un peer ID) distingue y autoriza a quienes se conectan.",
   "En un laboratorio puedes simularlo configurando la sede como servidor dial-up y una VM de sucursal que apunta a la dirección de la sede como iniciadora, confirmando que el túnel se levanta desde el lado de la sucursal aunque la sede no tenga configurado un gateway remoto fijo."
  ],
  "terms": [
   [
    "Static peer (par estático)",
    "Un par IPsec con una IP pública fija y conocida; cada lado configura la dirección específica del gateway del otro y cualquiera puede iniciar."
   ],
   [
    "Dial-up / dynamic peer (par dial-up / dinámico)",
    "Una fase 1 que acepta túneles entrantes de quienes se conectan con direcciones desconocidas de antemano; se usa cuando un lado tiene IP dinámica o para muchos spokes."
   ],
   [
    "Initiator vs responder (iniciador vs respondedor)",
    "El par con la dirección desconocida/dinámica debe iniciar; el par con la dirección estática acepta (responde) como servidor dial-up."
   ],
   [
    "Peer ID / authentication (ID de par / autenticación)",
    "Identificadores y credenciales (PSK o certificado) que permiten a un servidor dial-up distinguir y autorizar a quienes se conectan."
   ]
  ],
  "example": "Una sucursal con una dirección dinámica del ISP se conecta a la sede central, que tiene una IP estática, así que la sede se configura como par dial-up (dinámico) sin gateway remoto fijo y la sucursal apunta a la IP de la sede e inicia el túnel.",
  "tip": "El lado con la dirección desconocida/dinámica debe iniciar; el lado estático lo acepta como par dial-up. Dos pares dial-up nunca pueden conectarse porque ninguno tiene una dirección a la cual conectarse.",
  "check": [
   [
    "¿Cómo debe configurarse la fase 1 cuando una sucursal tiene una IP dinámica y la sede central una IP estática?",
    "La sede se configura como par dial-up (dinámico) que acepta túneles entrantes; la sucursal apunta a la IP estática de la sede e inicia el túnel."
   ],
   [
    "¿Por qué dos pares dial-up no pueden formar un túnel?",
    "Ninguno conoce la dirección del otro para iniciar, así que ningún lado puede comenzar la negociación."
   ],
   [
    "¿Cuál es una ventaja de una configuración de servidor dial-up?",
    "Una sola fase 1 dial-up en un hub puede aceptar muchos túneles entrantes de spokes o clientes remotos cuyas direcciones no se conocen de antemano."
   ]
  ]
 },
 {
  "t": "Routes and firewall policies needed for tunnel traffic",
  "tt": "Rutas y políticas de firewall necesarias para el tráfico del túnel",
  "body": [
   "Una sorpresa común con IPsec basado en rutas es que el túnel puede aparecer activo mientras no pasa tráfico entre los sitios. Eso se debe a que levantar el túnel es solo la mitad del trabajo: también debes indicarle al FortiGate que enrute las subredes remotas hacia el túnel y que permita ese tráfico con políticas de firewall. Esto se evalúa mucho porque separa a quienes solo siguieron un asistente de quienes entienden la ruta de los datos.",
   "Recuerda que un túnel route-based crea una interfaz de túnel virtual. La tabla de enrutamiento no tiene idea de qué destinos pertenecen al otro lado de esa interfaz hasta que agregas rutas. Así que, para cada subred remota alcanzable a través del túnel, agregas una ruta estática cuyo destino es esa subred y cuyo dispositivo (interfaz) es la interfaz del túnel (un túnel route-based normalmente no necesita un gateway de siguiente salto en la interfaz del túnel). Sin esta ruta, el tráfico hacia la LAN remota sigue la ruta predeterminada hacia Internet en lugar de entrar al túnel, y nada funciona aunque el túnel esté activo.",
   "Segundo, las políticas de firewall deben permitir el tráfico en ambas direcciones. Creas una política desde la interfaz de la LAN local hacia la interfaz del túnel para el tráfico saliente hacia el sitio remoto, y una política desde la interfaz del túnel hacia la interfaz de la LAN local para el tráfico entrante desde el sitio remoto. Ambas usan los objetos de dirección apropiados para las subredes local y remota y los servicios necesarios. El FortiGate tiene estado (stateful), así que las respuestas de una sesión las permite la política que la creó; la segunda política es necesaria para que los hosts del sitio remoto puedan iniciar sus propias conexiones, y su ausencia es una causa frecuente de conectividad que funciona en un solo sentido. Ten en cuenta que para el tráfico del túnel normalmente no aplicas source NAT (las dos LANs deben ver las direcciones reales de la otra), a diferencia de las políticas hacia Internet.",
   "En resumen, lo mínimo para que funcione el tráfico de un túnel route-based es: el túnel activo (fase 1 y fase 2 negociadas), una ruta para cada subred remota que apunte a la interfaz del túnel y políticas de firewall en ambas direcciones entre la LAN local y la interfaz del túnel. Si falta cualquiera de ellas, el túnel puede estar activo pero el tráfico falla. Al resolver un problema de 'el túnel está activo pero no hay tráfico', revisa primero la ruta hacia la subred remota y ambas políticas.",
   "En el FortiGate remoto configuras la imagen espejo: una ruta para tu subred local a través de su interfaz de túnel y políticas en ambas direcciones. Ambos extremos deben coincidir, y los selectores de la fase 2 deben abarcar las subredes que usan tus rutas y políticas.",
   "En un laboratorio levantas un túnel route-based, omites deliberadamente la ruta, observas cómo el tráfico falla mientras el túnel está activo y luego agregas la ruta y las dos políticas y ves cómo la conectividad funciona."
  ],
  "terms": [
   [
    "Route via tunnel interface (ruta a través de la interfaz del túnel)",
    "Una ruta estática cuyo destino es la subred remota y cuyo dispositivo es la interfaz del túnel IPsec, que dirige el tráfico hacia el túnel."
   ],
   [
    "Bidirectional policies (políticas bidireccionales)",
    "Políticas de firewall que permiten el tráfico tanto de la LAN al túnel como del túnel a la LAN, para que cualquiera de los sitios pueda iniciar conexiones (las respuestas de una sesión se permiten por estado)."
   ],
   [
    "No SNAT for tunnel traffic (sin SNAT para el tráfico del túnel)",
    "Las políticas del túnel normalmente no aplican source NAT, para que ambas LANs vean las direcciones reales de la otra."
   ],
   [
    "Up but no traffic (activo pero sin tráfico)",
    "El síntoma cuando un túnel negocia correctamente pero faltan la ruta o las políticas, así que ningún dato lo atraviesa."
   ]
  ],
  "example": "Un nuevo túnel route-based aparece activo, pero las dos LANs no pueden comunicarse; el administrador agrega una ruta para la subred remota a través de la interfaz del túnel y políticas de firewall en ambas direcciones, y entonces el tráfico fluye.",
  "tip": "Que un túnel aparezca activo no basta. Todavía necesitas una ruta para la subred remota a través de la interfaz del túnel y políticas en ambas direcciones, y las políticas del túnel normalmente no deben aplicar SNAT.",
  "check": [
   [
    "Un túnel route-based está activo pero no pasa tráfico. ¿Qué es lo que más probablemente falta?",
    "Una ruta que dirija la subred remota hacia la interfaz del túnel y/o políticas de firewall que permitan el tráfico en ambas direcciones."
   ],
   [
    "¿Por qué necesitas políticas en ambas direcciones para el tráfico del túnel?",
    "Cada política solo permite las sesiones iniciadas en su lado de entrada (las respuestas se manejan por estado), así que sin la política del túnel a la LAN el sitio remoto no puede iniciar conexiones y el acceso funciona en un solo sentido."
   ],
   [
    "¿Deben aplicar source NAT las políticas del tráfico del túnel?",
    "Normalmente no; las dos LANs deben ver las direcciones reales de la otra, a diferencia de las políticas hacia Internet."
   ]
  ]
 },
 {
  "t": "Redundant VPNs: two tunnels, route distance/priority, DPD, tunnel monitoring",
  "tt": "VPNs redundantes: dos túneles, distancia/prioridad de rutas, DPD, monitoreo de túneles",
  "body": [
   "Las sucursales que dependen de una VPN necesitan que sobreviva a la falla de un solo enlace o túnel. FortiGate construye la redundancia de VPN ejecutando dos (o más) túneles y usando el enrutamiento más la detección de actividad para hacer failover entre ellos automáticamente. La mecánica, distancia/prioridad y dead peer detection, es exactamente lo que evalúa el examen.",
   "El diseño consiste en construir un túnel por camino, por ejemplo uno por cada uno de los dos ISP de la sucursal, cada uno como túnel route-based con su propia interfaz de túnel. Luego agregas una ruta hacia la subred remota a través de cada túnel, pero con distancias administrativas (o prioridades) diferentes para que uno sea el principal y el otro quede en espera. Una ruta de menor distancia en el túnel principal significa que solo ella está activa mientras ambos están sanos; la ruta de mayor distancia en el túnel de respaldo espera en la base de datos de enrutamiento y solo se activa si se retira la ruta principal. (Como alternativa, una distancia igual con prioridades diferentes mantiene ambas rutas en la tabla con una preferida.)",
   "Para que el failover realmente ocurra, el FortiGate debe darse cuenta de cuándo muere el túnel principal y retirar su ruta. Esa es la tarea de dead peer detection (DPD, detección de pares inactivos): DPD envía sondeos periódicos de actividad al par y, si el par deja de responder, declara el túnel muerto y lo baja. Cuando el túnel se cae, su ruta se retira y la ruta de mayor distancia del túnel de respaldo toma el control. Sin DPD, un túnel muerto puede aparecer activo (un agujero negro), su ruta permanece en la tabla y el tráfico se sigue enviando a un túnel que no pasa datos, así que el failover nunca se dispara. El monitoreo del túnel (un link monitor a través del túnel, o el comportamiento de auto-negotiate/keepalive) también puede detectar un túnel roto y provocar cambios de rutas.",
   "Así que la receta para VPNs de sucursal redundantes es: dos túneles route-based, rutas con distancias (o prioridades) diferentes que hacen a uno principal y al otro de respaldo, DPD habilitado para que se detecte un túnel muerto y se retire su ruta, y políticas de firewall que permitan el tráfico por ambos túneles para que el respaldo funcione en el momento en que se activa. Habilitar DPD es la pieza que la gente olvida, y es la razón por la que 'dos túneles con DPD desactivado' es una respuesta incorrecta: el túnel muerto permanecería y el tráfico no se movería.",
   "Este mismo patrón es la base de los diseños con dos hubs y dos ISP, y complementa a SD-WAN, que puede dirigir el tráfico por varios miembros de túnel según el SLA. El punto a nivel de examen es la interacción: el enrutamiento decide la preferencia y DPD/el monitoreo proporcionan el disparador para cambiarla.",
   "En un laboratorio con dos túneles desactivas el camino principal y, con DPD habilitado, observas cómo cae la ruta principal y el tráfico pasa al respaldo; luego lo comparas con DPD desactivado para ver cómo el túnel permanece."
  ],
  "terms": [
   [
    "Redundant tunnels (túneles redundantes)",
    "Dos o más túneles por caminos diferentes para que la VPN sobreviva a la falla de un solo enlace o túnel."
   ],
   [
    "Route distance/priority for failover (distancia/prioridad de rutas para failover)",
    "Distancias administrativas (o prioridades) diferentes en las rutas de los túneles hacen a uno principal y al otro de respaldo."
   ],
   [
    "Dead peer detection, DPD (detección de pares inactivos)",
    "Sondeos periódicos de actividad que detectan un par que no responde, bajan el túnel y permiten que su ruta se retire."
   ],
   [
    "Tunnel monitoring (monitoreo de túneles)",
    "Monitoreo del enlace a través de un túnel que detecta un camino roto y provoca cambios de rutas para el failover."
   ]
  ],
  "example": "Una sucursal construye dos túneles route-based hacia la sede, uno por ISP, le da a la ruta del túnel principal una distancia menor y habilita DPD; cuando falla el ISP principal, DPD baja ese túnel, su ruta se elimina y el tráfico pasa al túnel de respaldo.",
  "tip": "El failover de VPN redundante necesita ambas partes: distancias/prioridades de ruta diferentes para definir principal vs respaldo, y DPD (o monitoreo del túnel) para detectar un túnel muerto y que se retire su ruta. Con DPD desactivado, el failover no funciona.",
  "check": [
   [
    "¿Cómo haces que las VPNs de una sucursal hagan failover entre dos ISP?",
    "Construyes un túnel route-based por ISP, le das al principal una distancia (o prioridad) de ruta menor, habilitas DPD para que se detecte un túnel muerto y permites el tráfico en ambos túneles en las políticas."
   ],
   [
    "¿Qué hace dead peer detection?",
    "Envía sondeos de actividad y, cuando el par deja de responder, baja el túnel para que su ruta pueda retirarse y un respaldo tome el control."
   ],
   [
    "¿Por qué 'dos túneles con DPD desactivado' es un mal diseño?",
    "Sin DPD, un túnel muerto puede aparecer activo, su ruta sigue activa, el tráfico se pierde en él y el failover nunca se dispara."
   ]
  ]
 },
 {
  "t": "Topologies: hub and spoke, full mesh, partial mesh, ADVPN short-cuts",
  "tt": "Topologías: hub and spoke, malla completa, malla parcial, atajos de ADVPN",
  "body": [
   "A medida que crece el número de sitios VPN, la topología que eliges decide cuántos túneles debes construir y mantener, y con qué eficiencia fluye el tráfico entre spokes. El examen espera que compares las topologías y sepas qué agrega ADVPN.",
   "En una topología hub and spoke (concentrador y radios), cada spoke construye un túnel hacia un hub central, y no hay túneles directos entre spokes. Para n sitios esto requiere solo n menos 1 túneles (cada spoke al hub), lo que es fácil de construir y gestionar. La desventaja es que el tráfico entre dos spokes debe atravesar el hub (spoke a hub a spoke), agregando latencia y carga al hub, lo que es ineficiente para flujos directos entre sucursales, como la voz.",
   "En una malla completa (full mesh), cada sitio tiene un túnel directo hacia cada uno de los demás, lo que ofrece el camino más corto entre dos sitios cualesquiera sin un hub en medio. El costo es la escala: una malla completa requiere n por (n menos 1) dividido entre 2 túneles, así que cinco sitios necesitan 10 túneles y la cantidad crece rápidamente, lo que hace que una malla completa grande sea difícil de construir y mantener a mano. Una malla parcial (partial mesh) es un punto intermedio: agregas túneles directos solo entre los pares de sitios que los necesitan (por ejemplo, las sucursales con más tráfico), mientras los demás siguen pasando por el hub, equilibrando la eficiencia con la cantidad de túneles.",
   "ADVPN (Auto-Discovery VPN) ofrece lo mejor de ambos mundos. Comienza como un diseño hub and spoke, así que solo configuras y mantienes los túneles de spoke a hub, pero permite que los spokes construyan bajo demanda túneles directos de atajo (short-cut) entre sí cuando tienen tráfico que intercambiar. Los primeros paquetes entre dos spokes pasan por el hub; luego el hub indica a los spokes que establezcan un túnel directo dinámico, y el tráfico posterior toma ese atajo, evitando el hub. Cuando el tráfico se detiene, el atajo puede eliminarse. Esto ofrece caminos directos como los de una malla completa sin construir manualmente n por (n menos 1) dividido entre 2 túneles, así que escala a muchos sitios manteniendo eficiente el tráfico entre spokes. ADVPN depende de túneles route-based y normalmente de un protocolo de enrutamiento dinámico (como BGP o, en algunos diseños, iBGP sobre el overlay) más rutas resumidas para que los spokes puedan conocerse entre sí.",
   "Cómo elegir: hub and spoke por simplicidad y cuando hay pocos flujos entre spokes; malla completa o parcial cuando los caminos directos importan y la cantidad es manejable; ADVPN cuando necesitas caminos directos entre spokes a escala sin la carga de mantenimiento de la malla.",
   "En un laboratorio esbozas diseños hub and spoke, de malla completa y ADVPN para cinco sitios, cuentas los túneles que necesita cada uno (4, 10, y 4 configurados más los atajos dinámicos) y enumeras las rutas y los ajustes de DPD para el failover."
  ],
  "terms": [
   [
    "Hub and spoke (concentrador y radios)",
    "Cada spoke crea un túnel solo hacia un hub central (n menos 1 túneles); el tráfico entre spokes pasa por el hub."
   ],
   [
    "Full mesh (malla completa)",
    "Cada sitio tiene un túnel directo hacia cada uno de los demás (n por (n menos 1) dividido entre 2 túneles); caminos más cortos, pero muchos túneles."
   ],
   [
    "Partial mesh (malla parcial)",
    "Túneles directos solo entre pares de sitios seleccionados, y el resto a través del hub, equilibrando eficiencia y cantidad."
   ],
   [
    "ADVPN (Auto-Discovery VPN)",
    "Un diseño hub and spoke en el que los spokes construyen bajo demanda túneles directos de atajo, logrando caminos como los de una malla sin túneles de malla completa manuales."
   ]
  ],
  "example": "Cinco sucursales necesitan caminos de voz directos y eficientes, pero el equipo no mantendrá una malla completa de 10 túneles, así que implementan ADVPN: solo se configuran los cinco túneles de spoke a hub, y los spokes forman atajos directos bajo demanda cuando intercambian tráfico.",
  "tip": "Hub and spoke necesita n menos 1 túneles; la malla completa necesita n(n-1)/2. ADVPN mantiene la poca configuración de hub and spoke mientras ofrece caminos directos entre spokes bajo demanda, así que escala sin el mantenimiento de la malla.",
  "check": [
   [
    "¿Cuántos túneles necesita una malla completa de cinco sitios, y un hub and spoke de cinco sitios?",
    "La malla completa necesita n(n-1)/2 = 10; hub and spoke necesita n menos 1 = 4."
   ],
   [
    "¿Qué problema resuelve ADVPN en comparación con un hub and spoke simple?",
    "Evita enviar todo el tráfico entre spokes a través del hub, construyendo bajo demanda túneles directos de atajo entre los spokes."
   ],
   [
    "¿Qué conserva ADVPN del modelo hub and spoke?",
    "Solo configuras y mantienes los túneles de spoke a hub; los túneles directos entre spokes se crean dinámicamente."
   ]
  ]
 },
 {
  "t": "Troubleshooting: `diagnose vpn ike gateway list`, `diagnose vpn tunnel list`, `diagnose debug application ike -1`",
  "tt": "Resolución de problemas: `diagnose vpn ike gateway list`, `diagnose vpn tunnel list`, `diagnose debug application ike -1`",
  "body": [
   "Cuando un túnel IPsec no se levanta o no pasa tráfico, tres herramientas de la CLI cubren casi todos los casos: una muestra el estado de la fase 1, otra muestra el estado de la fase 2/del túnel y otra muestra la negociación en vivo. Saber cuál usar para cada síntoma es la habilidad práctica de resolución de problemas de VPN que premia el examen.",
   "El comando `diagnose vpn ike gateway list` muestra los gateways de fase 1 (IKE): cada gateway configurado, su estado (si la fase 1 está establecida), las direcciones local y remota, la versión de IKE y las propuestas negociadas, y el estado de NAT-T. Es tu primera comprobación para '¿está arriba la fase 1?'. Si un gateway no está establecido, el problema está en la fase 1: discrepancia en la versión de IKE, la autenticación (clave precompartida o certificado), las propuestas o el grupo DH, o la conectividad en UDP 500/4500.",
   "El comando `diagnose vpn tunnel list` muestra las SAs de IPsec (fase 2) y los detalles del túnel: los selectores en uso, las propuestas de fase 2 negociadas y si las SAs están instaladas, además de contadores de paquetes cifrados y descifrados. Aquí es donde confirmas que la fase 2 tuvo éxito y si los datos realmente están cruzando. Si la fase 1 está arriba (según la lista de gateways) pero aquí no aparece ninguna SA de fase 2, o los contadores de paquetes no aumentan, el problema está en los selectores/propuestas de la fase 2 o en las rutas y políticas que alimentan el túnel.",
   "El comando `diagnose debug application ike -1` (junto con `diagnose debug enable`) activa un registro detallado y en tiempo real de la negociación IKE, imprimiendo cada mensaje y, lo más importante, el motivo por el que falla una negociación, por ejemplo una discrepancia de propuestas o un selector que no coincide. El `-1` establece la máxima verbosidad. Como muestra el intercambio a medida que ocurre, es la herramienta definitiva para ver por qué un túnel no negocia; lo filtras al par, reproduces la conexión y lees el error. Recuerda que, como con todos los debugs de FortiGate, debes ejecutar `diagnose debug enable` para que aparezca la salida, y `diagnose debug disable` al terminar.",
   "Un flujo de trabajo limpio: revisa `diagnose vpn ike gateway list` para la fase 1; si la fase 1 está abajo, ejecuta el debug de IKE para ver el error de negociación. Si la fase 1 está arriba, revisa `diagnose vpn tunnel list` para la fase 2 y los contadores de paquetes; una SA de fase 2 ausente te lleva de nuevo al debug de IKE (selectores/propuestas), mientras que una fase 2 arriba sin tráfico apunta al enrutamiento y a las políticas de firewall. Este camino de la medición a la causa resuelve la gran mayoría de los problemas de túneles.",
   "En un laboratorio provocas deliberadamente una discrepancia en un selector de fase 2, ejecutas `diagnose debug application ike -1` mientras te reconectas y localizas el mensaje de error exacto en la salida."
  ],
  "terms": [
   [
    "diagnose vpn ike gateway list",
    "Muestra los gateways de fase 1 (IKE), su estado, sus direcciones, la versión/propuestas negociadas y el estado de NAT-T."
   ],
   [
    "diagnose vpn tunnel list",
    "Muestra las SAs de fase 2 (IPsec), los selectores, las propuestas y los contadores de paquetes cifrados/descifrados."
   ],
   [
    "diagnose debug application ike -1",
    "Registro detallado y en tiempo real de la negociación IKE, que revela el motivo exacto por el que un túnel no logra establecerse."
   ],
   [
    "Debug enable/disable (habilitar/deshabilitar debug)",
    "diagnose debug enable es necesario para que se imprima la salida del debug; diagnose debug disable lo desactiva después."
   ]
  ],
  "example": "La fase 1 de un túnel aparece establecida en diagnose vpn ike gateway list, pero diagnose vpn tunnel list no muestra ninguna SA de fase 2, así que el administrador ejecuta diagnose debug application ike -1, se reconecta y encuentra en la salida una discrepancia en un selector de fase 2.",
  "tip": "Usa la lista de gateways para la fase 1, la lista de túneles para la fase 2 y los contadores de paquetes, y el debug de IKE para ver por qué falla la negociación. El debug no imprime nada hasta que ejecutes diagnose debug enable.",
  "check": [
   [
    "¿Qué comando muestra el estado de los gateways de fase 1?",
    "diagnose vpn ike gateway list, que enumera cada gateway IKE, su estado y los ajustes negociados."
   ],
   [
    "La fase 1 está arriba, pero no pasa tráfico y no hay SA de fase 2. ¿Qué herramienta muestra por qué?",
    "diagnose debug application ike -1 (con el debug habilitado) revela el error de negociación de la fase 2, comúnmente una discrepancia de selectores o de propuestas."
   ],
   [
    "¿Qué debes ejecutar para que aparezca la salida del debug de IKE?",
    "diagnose debug enable; sin él, el debug no imprime nada, y ejecutas diagnose debug disable al terminar."
   ]
  ]
 },
 {
  "t": "Remote access VPN on FortiOS 7.6: FortiClient dial-up IPsec, and the SSL VPN changes in later 7.6 builds (tunnel mode removed, web mode renamed agentless VPN)",
  "tt": "VPN de acceso remoto en FortiOS 7.6: IPsec dial-up con FortiClient y los cambios de SSL VPN en compilaciones posteriores de 7.6 (se elimina el tunnel mode y el web mode pasa a llamarse agentless VPN)",
  "body": [
   "La VPN de acceso remoto permite que usuarios individuales, no sitios completos, se conecten de forma segura desde cualquier lugar. En FortiOS 7.6 el enfoque recomendado cambió notablemente, y el examen (y las implementaciones reales) esperan que entiendas tanto el método IPsec con FortiClient como los importantes cambios de SSL VPN introducidos en compilaciones posteriores de 7.6. Ten en cuenta que la inclusión de la VPN de acceso remoto en tu versión del examen puede variar, así que confirma la descripción actual del examen.",
   "El método principal de acceso remoto en 7.6 es IPsec dial-up con FortiClient. El FortiGate se configura como servidor IPsec dial-up (dinámico): una sola fase 1 acepta túneles entrantes de muchos clientes remotos cuyas direcciones se desconocen de antemano. Los usuarios remotos ejecutan el agente de endpoint FortiClient, que inicia un túnel IPsec hacia el FortiGate, autentica al usuario (local, LDAP/RADIUS, a menudo con el segundo factor de FortiToken) y recibe una dirección IP y ajustes mediante IKE mode-config. Luego agregas rutas y políticas de firewall para el rango de clientes asignado, de modo que los usuarios remotos puedan llegar a los recursos internos. Este es el modelo dial-up aplicado a clientes individuales en lugar de a sitios de sucursal.",
   "El gran cambio está en SSL VPN. Históricamente, SSL VPN de FortiGate ofrecía dos modos: tunnel mode (una VPN completa mediante el cliente FortiClient/SSL VPN sobre HTTPS) y web mode (un portal sin cliente al que se accede desde un navegador). En compilaciones posteriores de FortiOS 7.6, Fortinet eliminó el tunnel mode de SSL VPN, orientando a los clientes hacia IPsec (con FortiClient) para el acceso remoto de túnel completo. Esta es una dirección deliberada: IPsec es el camino soportado para la VPN de cliente completa, y el tunnel mode de SSL VPN ya no está disponible en esas compilaciones. Si un escenario dice 'actualizamos a una compilación reciente de 7.6 y el tunnel mode de SSL VPN desapareció', ese es el comportamiento esperado, y la solución es trasladar a los usuarios de acceso remoto a IPsec dial-up con FortiClient.",
   "El web mode de SSL VPN se conservó, pero cambió de nombre. En las versiones posteriores de 7.6 se llama agentless VPN (VPN sin agente), lo que refleja que es la forma basada en el navegador, sin cliente, de llegar a un conjunto limitado de recursos web y de aplicaciones internos a través de un portal. El cambio de nombre mantiene la capacidad sin cliente y deja claro que no es un túnel completo. Así que, en las versiones recientes de 7.6, el acceso remoto significa IPsec con FortiClient para el túnel completo y agentless VPN (el antiguo web mode de SSL VPN) para el acceso desde el navegador a recursos específicos.",
   "Para el examen: debes saber que IPsec dial-up con FortiClient es el método de acceso remoto completo, que el tunnel mode de SSL VPN se eliminó en compilaciones posteriores de 7.6 y que el web mode de SSL VPN pasó a llamarse agentless VPN. No des por sentados números de compilación exactos; los hechos duraderos son la eliminación del tunnel mode y el cambio de nombre del web mode.",
   "En un laboratorio configuras una fase 1 IPsec dial-up para FortiClient, asignas un rango de IPs de clientes con mode-config, agregas políticas para ese rango y te conectas con FortiClient; luego observas que el portal agentless (web) cubre solo recursos publicados específicos."
  ],
  "terms": [
   [
    "FortiClient dial-up IPsec (IPsec dial-up con FortiClient)",
    "VPN de acceso remoto en la que FortiClient inicia un túnel IPsec hacia un servidor dial-up FortiGate, que autentica al usuario y asigna los ajustes mediante mode-config."
   ],
   [
    "Mode-config",
    "El mecanismo de IKE que asigna una dirección IP y ajustes de red a un cliente dial-up/remoto cuando se levanta el túnel."
   ],
   [
    "SSL VPN tunnel mode removal (eliminación del tunnel mode de SSL VPN)",
    "En compilaciones posteriores de FortiOS 7.6 se eliminó la SSL VPN de túnel completo, quedando IPsec (FortiClient) como el camino soportado para el acceso remoto completo."
   ],
   [
    "Agentless VPN (VPN sin agente)",
    "El web mode de SSL VPN con su nuevo nombre: acceso sin cliente, basado en el navegador, a recursos web y de aplicaciones internos específicos a través de un portal."
   ]
  ],
  "example": "Después de actualizar a una compilación reciente de FortiOS 7.6, los trabajadores remotos descubren que el tunnel mode de SSL VPN desapareció, así que el administrador configura IPsec dial-up con FortiClient para el acceso completo y usa agentless VPN (antes web mode de SSL VPN) para el acceso solo desde el navegador a algunas aplicaciones web internas.",
  "tip": "En las compilaciones posteriores de 7.6, el tunnel mode de SSL VPN se elimina y el web mode pasa a llamarse agentless VPN; IPsec dial-up con FortiClient es el método de acceso remoto completo. Confirma la cobertura del acceso remoto en tu versión del examen.",
  "check": [
   [
    "¿Cuál es el método principal de VPN de acceso remoto completo en FortiOS 7.6?",
    "IPsec dial-up con FortiClient: FortiClient inicia un túnel IPsec hacia un servidor dial-up FortiGate que autentica al usuario y asigna los ajustes mediante mode-config."
   ],
   [
    "¿Qué pasó con el tunnel mode de SSL VPN en las compilaciones posteriores de 7.6?",
    "Se eliminó, quedando IPsec (FortiClient) como el camino soportado para el acceso remoto de túnel completo."
   ],
   [
    "¿Cómo pasó a llamarse el web mode de SSL VPN y qué es?",
    "Agentless VPN: acceso sin cliente, basado en el navegador, a recursos web y de aplicaciones internos específicos a través de un portal."
   ]
  ]
 }
], { lang: "es" });
