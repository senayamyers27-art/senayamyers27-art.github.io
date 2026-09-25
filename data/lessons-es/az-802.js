CertHub.addLessons("az-802", [
 {
  "t": "Deploying domain controllers: Install-ADDSForest / Install-ADDSDomainController, install from media (IFM), read-only DCs, DCs on Azure VMs (static private IP on the NIC, NTDS on a data disk with host caching off)",
  "tt": "Implementación de controladores de dominio: Install-ADDSForest / Install-ADDSDomainController, instalación desde medios (IFM), DC de solo lectura y DC en máquinas virtuales de Azure",
  "body": [
   "Un controlador de dominio (DC) es un Windows Server que guarda una copia de escritura o de solo lectura de la base de datos de Active Directory Domain Services (AD DS), autentica usuarios y equipos con Kerberos y replica los cambios con otros DC. Casi todo lo demás en un entorno Windows depende de que los DC estén sanos, así que la forma en que los implementas importa. La implementación es un proceso de dos pasos: primero instalas los binarios del rol con `Install-WindowsFeature AD-Domain-Services -IncludeManagementTools` y luego promueves el servidor, lo que crea un dominio o se une a uno existente.",
   "La promoción usa uno de tres cmdlets de PowerShell del módulo ADDSDeployment. `Install-ADDSForest` crea un bosque completamente nuevo y su primer dominio (raíz); indicas `-DomainName`, `-DomainNetbiosName`, los modos de bosque y de dominio, y una contraseña del Modo de restauración de servicios de directorio (DSRM). `Install-ADDSDomainController` agrega otro DC a un dominio existente, que es como obtienes redundancia. `Install-ADDSDomain` crea un nuevo dominio secundario o de árbol en un bosque existente. Cada cmdlet tiene un gemelo `Test-` (por ejemplo `Test-ADDSDomainControllerInstallation`) que ejecuta las comprobaciones de requisitos previos sin cambiar nada, y el asistente de Server Manager puede exportar el PowerShell exacto que ejecutaría.",
   "La instalación desde medios (IFM) resuelve un problema de ancho de banda. Normalmente, un DC nuevo descarga toda la base de datos por la red durante su primera replicación. Con IFM ejecutas `ntdsutil` en un DC existente (`activate instance ntds`, `ifm`, `create sysvol full C:\\IFM`) para producir una copia de la base de datos y de SYSVOL, la llevas al sitio remoto y promueves con `-InstallationMediaPath`. Así, solo los cambios hechos desde que se crearon los medios se replican por la WAN. Los medios de un DC de escritura pueden construir un DC de escritura o un RODC; los medios creados como medios de RODC solo pueden construir un RODC. Trata los medios IFM como altamente sensibles, porque contienen hashes de contraseñas.",
   "Un controlador de dominio de solo lectura (RODC) está diseñado para sucursales con seguridad física débil. Guarda una copia de solo lectura del directorio, no almacena contraseñas en caché de forma predeterminada y solo almacena en caché las credenciales de las cuentas que permitas en su Directiva de replicación de contraseñas (los grupos Allowed y Denied RODC Password Replication Group). Puedes delegar la administración local de un RODC a un técnico de la sucursal sin convertirlo en Domain Admin. Antes de agregar el primer RODC, el bosque debe tener un DC de escritura con un sistema operativo compatible, e históricamente necesitabas `adprep /rodcprep`; la promoción moderna ejecuta la preparación requerida automáticamente.",
   "Ejecutar DC como máquinas virtuales de Azure extiende tu dominio a la nube, pero Azure tiene reglas específicas. Asigna a la VM una dirección IP privada estática en su interfaz de red (NIC) en Azure, no dentro del sistema operativo invitado; el invitado sigue usando DHCP y Azure siempre le entrega la misma dirección. Apunta los servidores DNS de la red virtual a tus DC. Coloca la base de datos de AD (NTDS.dit), los registros y SYSVOL en un disco de datos administrado separado con el almacenamiento en caché del host configurado en None, porque el disco del sistema operativo usa caché de escritura, lo que puede hacer que AD crea que los datos están escritos cuando no lo están y arriesgar corrupción. Distribuye los DC entre zonas de disponibilidad o en un conjunto de disponibilidad, y define un sitio de AD para la subred de Azure.",
   "```powershell\nInstall-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName corp.contoso.com -InstallDns `\n  -DatabasePath F:\\NTDS -LogPath F:\\NTDS -SysvolPath F:\\SYSVOL `\n  -Credential (Get-Credential)\n```"
  ],
  "terms": [
   [
    "DSRM (Modo de restauración de servicios de directorio)",
    "Directory Services Restore Mode: un modo de arranque especial para el mantenimiento sin conexión de AD, protegido por una contraseña local establecida durante la promoción."
   ],
   [
    "IFM (instalación desde medios)",
    "Install from media: promover un DC a partir de una copia de la base de datos creada con ntdsutil para que la replicación inicial no cruce la WAN."
   ],
   [
    "RODC",
    "Controlador de dominio de solo lectura: guarda una copia de solo lectura del directorio y almacena en caché solo las contraseñas permitidas por su Directiva de replicación de contraseñas."
   ],
   [
    "Password Replication Policy (Directiva de replicación de contraseñas)",
    "Las listas de permitidos y denegados que deciden qué credenciales de cuentas puede almacenar en caché un RODC."
   ],
   [
    "Host caching (caché del host)",
    "Una configuración de disco de Azure (None, ReadOnly, ReadWrite); los discos de datos de un DC que contienen NTDS deben usar None."
   ]
  ],
  "example": "Un minorista agrega un DC en una tienda con un enlace lento. El administrador ejecuta IFM con ntdsutil en un DC central, envía los medios cifrados en una unidad USB y promueve un RODC con -InstallationMediaPath. Solo se replican unos pocos megabytes de cambios recientes, y solo las contraseñas del personal de la tienda se almacenan en caché localmente.",
  "tip": "Para los DC en Azure, la IP estática se configura en la NIC de Azure, no en el invitado, y NTDS va en un disco de datos con caché None. Las respuestas que sugieren configurar una IP estática dentro de Windows o dejar NTDS en el disco del sistema operativo son las trampas.",
  "check": [
   [
    "¿Qué cmdlet crea el primer DC de un bosque nuevo y cuál agrega un DC a un dominio existente?",
    "Install-ADDSForest crea un bosque nuevo; Install-ADDSDomainController agrega un DC a un dominio existente."
   ],
   [
    "¿Por qué NTDS.dit en una VM de Azure debe estar en un disco de datos con la caché del host en None?",
    "El disco del sistema operativo usa caché de escritura diferida (write-back), lo que puede romper la suposición de AD de que las escrituras son duraderas y arriesga la corrupción de la base de datos; un disco de datos con caché None lo evita."
   ],
   [
    "¿Qué limita las contraseñas de usuarios que almacena un RODC?",
    "Su Directiva de replicación de contraseñas, administrada mediante los grupos Allowed y Denied RODC Password Replication Group y la configuración de cada RODC."
   ]
  ]
 },
 {
  "t": "FSMO roles (schema master, domain naming master, RID master, PDC emulator, infrastructure master): placement, transfer vs seize",
  "tt": "Roles FSMO (maestro de esquema, maestro de nombres de dominio, maestro RID, emulador de PDC, maestro de infraestructura): ubicación, transferencia frente a apropiación",
  "body": [
   "Active Directory es multimaestro: cualquier DC de escritura puede aceptar la mayoría de los cambios. Unas pocas operaciones no pueden ocurrir de forma segura en dos lugares a la vez, así que AD las asigna a DC únicos llamados titulares de roles de Operaciones de maestro único flexible (FSMO), también llamados maestros de operaciones. Hay cinco roles. Dos son de todo el bosque (uno por bosque) y tres son de todo el dominio (uno por dominio).",
   "Los roles de todo el bosque son el maestro de esquema (schema master), el único DC que puede modificar el esquema (por ejemplo, al instalar Exchange o al elevar el bosque para agregar atributos nuevos), y el maestro de nombres de dominio (domain naming master), que controla la adición y eliminación de dominios y particiones de aplicación. Los roles de todo el dominio son el maestro RID, que entrega grupos de identificadores relativos (RID) a cada DC para que cada nueva entidad de seguridad obtenga un identificador de seguridad (SID) único; el emulador de PDC (PDC emulator), que es la fuente de hora autoritativa del dominio (el PDC de la raíz del bosque debe sincronizarse con una fuente de hora externa), recibe los cambios urgentes de contraseña, procesa los bloqueos de cuentas y es el destino predeterminado para editar la directiva de grupo; y el maestro de infraestructura (infrastructure master), que actualiza las referencias a objetos de otros dominios.",
   "La guía de ubicación se desprende de lo que hace cada rol. En un entorno pequeño está bien mantener los cinco en un DC bien conectado y bien protegido. El emulador de PDC debe estar en un DC potente en un sitio central, porque los clientes y otros DC lo contactan con frecuencia. El maestro RID suele ubicarse junto con el emulador de PDC. La regla clásica dice no poner el maestro de infraestructura en un servidor de catálogo global, a menos que todos los DC del dominio sean catálogo global o que la Papelera de reciclaje de AD esté habilitada, porque un GC ya contiene todos los objetos y el maestro de infraestructura nunca vería referencias obsoletas. Usa `netdom query fsmo` o `Get-ADDomain` y `Get-ADForest` para ver dónde están los roles.",
   "Mover un rol tiene dos formas. Una transferencia es un movimiento ordenado mientras el titular actual y el nuevo están en línea: replican, se entregan el rol y no se pierde nada. Lo haces antes de un mantenimiento planificado o de retirar un servidor. Una apropiación (seize) obliga al nuevo DC a tomar el rol cuando el titular anterior ya no existe de forma permanente. Tras una apropiación, el DC anterior nunca debe volver a estar en línea tal como estaba; limpias sus metadatos y, si alguna vez lo recuperas, lo reconstruyes. Apropiarse del maestro RID en particular arriesga grupos de RID duplicados si el titular anterior reaparece.",
   "```powershell\n# Transferencia (ambos DC en línea)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole PDCEmulator,RIDMaster\n# Apropiación (el titular anterior está muerto)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole SchemaMaster -Force\n```",
   "El mismo cmdlet hace ambos trabajos: sin `-Force` intenta una transferencia; con `-Force` se apropia del rol si la transferencia falla. La herramienta más antigua `ntdsutil` también ofrece los comandos `transfer` y `seize` bajo `roles`. Las interrupciones breves de la mayoría de los titulares de roles pasan desapercibidas, pero perder el emulador de PDC se nota rápidamente como desfase de hora, problemas de bloqueo de cuentas y retrasos en los cambios de contraseña."
  ],
  "terms": [
   [
    "FSMO role (rol FSMO)",
    "Una operación de maestro único en AD asignada a un DC por bosque o por dominio."
   ],
   [
    "RID master (maestro RID)",
    "Asigna grupos de ID relativos a los DC para que cada nuevo usuario, grupo o equipo obtenga un SID único."
   ],
   [
    "PDC emulator (emulador de PDC)",
    "Rol de todo el dominio que se encarga de la sincronización de hora, los cambios urgentes de contraseña, los bloqueos y, de forma predeterminada, la edición de GPO."
   ],
   [
    "Transfer (transferencia)",
    "Un movimiento ordenado del rol mientras el titular anterior y el nuevo están en línea."
   ],
   [
    "Seize (apropiación)",
    "Una toma forzada del rol cuando el titular anterior no está disponible de forma permanente; el DC anterior no debe regresar."
   ]
  ],
  "example": "DC1, que tiene los cinco roles, sufre una falla de la placa base y será reconstruido desde cero. El administrador se apropia de todos los roles hacia DC2 con Move-ADDirectoryServerOperationMasterRole -Force, ejecuta la limpieza de metadatos de DC1 y más tarde promueve el hardware reconstruido como un DC nuevo con un nombre nuevo.",
  "tip": "Aprende qué roles son por bosque (esquema, nombres de dominio) y cuáles son por dominio (RID, emulador de PDC, infraestructura). Por lo tanto, un bosque con tres dominios tiene 2 + (3 x 3) = 11 roles FSMO en total.",
  "check": [
   [
    "¿Qué rol FSMO es la fuente de hora autoritativa de un dominio y gestiona los bloqueos de cuentas?",
    "El emulador de PDC."
   ],
   [
    "¿Cuándo debes apropiarte de un rol en lugar de transferirlo?",
    "Solo cuando el titular actual está fuera de línea de forma permanente y no puede recuperarse; en cualquier otro caso, transfiérelo para que ambos DC se entreguen el rol limpiamente."
   ],
   [
    "¿Cuántos roles FSMO existen en un bosque de un solo dominio?",
    "Cinco: maestro de esquema y maestro de nombres de dominio (de todo el bosque) más maestro RID, emulador de PDC y maestro de infraestructura (de todo el dominio)."
   ]
  ]
 },
 {
  "t": "Sites, subnets, site links, link cost and bridging; replication health with repadmin and dcdiag",
  "tt": "Sitios, subredes, vínculos de sitio, costo de vínculo y puentes; estado de la replicación con repadmin y dcdiag",
  "body": [
   "Los sitios de Active Directory describen tu red física para que AD pueda tomar decisiones sensatas. Un sitio es un conjunto de subredes IP bien conectadas, normalmente una oficina o un centro de datos. Los sitios controlan dos cosas: con qué DC habla un cliente (los clientes prefieren los DC de su propio sitio para iniciar sesión, un proceso llamado cobertura de sitio y localizador de DC) y cómo fluye la replicación. Dentro de un sitio, los DC replican rápidamente y sin compresión, activados por la notificación de cambios en cuestión de segundos. Entre sitios, la replicación se comprime y se ejecuta según una programación para ahorrar ancho de banda de la WAN.",
   "Para que esto funcione, creas objetos de subred (por ejemplo 10.20.0.0/16) y asocias cada uno con un sitio en Active Directory Sites and Services o con `New-ADReplicationSubnet`. La dirección IP de un cliente se compara con una subred, lo que le indica su sitio. Si falta una subred en AD, los clientes de ese rango pueden autenticarse contra un DC lejano, lo cual es una causa común de inicios de sesión lentos.",
   "Los vínculos de sitio (site links) conectan sitios y tienen tres configuraciones importantes. El costo es un número relativo: cuando hay varias rutas, AD elige la ruta con el menor costo total, así que asigna costos bajos a los enlaces rápidos y costos altos a los enlaces lentos o de respaldo. El intervalo de replicación (180 minutos de forma predeterminada, mínimo 15) establece con qué frecuencia ocurre la replicación a través del vínculo. La programación restringe cuándo puede ocurrir. El vínculo de sitio predeterminado, DEFAULTIPSITELINK, contiene todos los sitios hasta que diseñes los tuyos.",
   "Los puentes de vínculos de sitio (site link bridging) controlan la transitividad. De forma predeterminada, Bridge all site links está habilitado, lo que significa que si el sitio A se vincula con B y B con C, AD puede calcular una ruta de A a C sumando los costos. En redes que no están completamente enrutadas (por ejemplo, un firewall impide que A llegue directamente a C), deshabilitas esa configuración y creas puentes de vínculos de sitio explícitos solo donde reflejan conectividad real. El Comprobador de coherencia de conocimiento (KCC) se ejecuta en cada DC y construye la topología de replicación automáticamente; en cada sitio, un DC actúa como Generador de topología entre sitios (ISTG) y elige los servidores cabeza de puente (bridgehead) para la replicación entre sitios.",
   "Dos herramientas comprueban el estado de la replicación. `repadmin` inspecciona y dirige la replicación: `repadmin /replsummary` muestra los errores y los mayores deltas por DC, `repadmin /showrepl` enumera los asociados de entrada y los últimos resultados, `repadmin /syncall /AdeP` fuerza un envío a través de todas las particiones y sitios, y `repadmin /queue` muestra el trabajo pendiente. `dcdiag` ejecuta una batería de pruebas en un DC: conectividad, anuncio, servicios, SYSVOL, comprobaciones de FSMO y más; `dcdiag /test:dns` se centra en el registro DNS, que es la base de la mayoría de los problemas de replicación. Los equivalentes de PowerShell incluyen `Get-ADReplicationFailure` y `Get-ADReplicationPartnerMetadata`.",
   "Cuando repadmin informa errores, revisa primero el DNS (¿puede cada DC resolver el CNAME basado en GUID de su asociado en _msdcs?), luego los puertos de red y el desfase de hora. Un DC que no ha replicado durante más tiempo que la vida útil de marcas de exclusión (tombstone lifetime) corre el riesgo de tener objetos persistentes (lingering objects) y normalmente debe degradarse y reconstruirse en lugar de forzarlo a volver a la replicación."
  ],
  "terms": [
   [
    "Site (sitio)",
    "Un objeto de AD que representa un conjunto de subredes bien conectadas, usado para la selección de DC por parte de los clientes y la programación de la replicación."
   ],
   [
    "Site link cost (costo del vínculo de sitio)",
    "Un valor relativo que AD suma a lo largo de las rutas; se prefiere la ruta con el menor costo total."
   ],
   [
    "Site link bridge (puente de vínculos de sitio)",
    "Una forma de hacer transitivos los vínculos de sitio; la configuración predeterminada Bridge all site links hace que todos los vínculos sean transitivos."
   ],
   [
    "KCC",
    "Knowledge Consistency Checker (Comprobador de coherencia de conocimiento): el proceso en cada DC que construye la topología de replicación automáticamente."
   ],
   [
    "repadmin /replsummary",
    "Un comando que resume el estado de la replicación, los errores y los mayores deltas de todos los DC."
   ]
  ],
  "example": "Los usuarios de una sucursal nueva informan inicios de sesión lentos. dcdiag pasa, pero la subred de la sucursal 10.44.0.0/16 nunca se agregó en Sites and Services, así que los clientes usan un DC al otro lado de la WAN. Crear la subred y vincularla al sitio Branch corrige la selección de DC de inmediato.",
  "tip": "Gana el menor costo. Si una pregunta da dos rutas entre sitios, suma los costos de los vínculos de sitio a lo largo de cada una y elige la menor. Recuerda que la replicación entre sitios sigue la programación y el intervalo, mientras que la replicación dentro del sitio usa la notificación de cambios.",
  "check": [
   [
    "¿Qué les pasa a los clientes cuya dirección IP no está en ninguna subred de AD?",
    "No se pueden asignar a un sitio y pueden usar cualquier DC, a menudo uno lejano, lo que provoca inicios de sesión lentos."
   ],
   [
    "¿Cuándo deshabilitarías Bridge all site links?",
    "Cuando la red no está completamente enrutada, de modo que AD no debe suponer que cada sitio puede replicar con todos los demás de forma transitiva."
   ],
   [
    "¿Qué comando ofrece un resumen rápido de los errores de replicación en todos los DC?",
    "repadmin /replsummary."
   ]
  ]
 },
 {
  "t": "Forest, external, shortcut and realm trusts; transitivity and direction; selective authentication; SID filtering",
  "tt": "Confianzas de bosque, externas, de acceso directo y de territorio; transitividad y dirección; autenticación selectiva; filtrado de SID",
  "body": [
   "Una confianza (trust) es una relación que permite a los usuarios de un dominio autenticarse ante recursos de otro. El vocabulario de las confianzas es direccional y fácil de confundir, así que apréndelo con precisión. El dominio que confía (trusting) tiene los recursos; el dominio de confianza (trusted) tiene las cuentas. El acceso fluye en sentido opuesto a la dirección de la confianza: si el dominio A confía en el dominio B, a los usuarios de B se les puede conceder acceso a recursos de A. Una confianza bidireccional es simplemente dos confianzas unidireccionales. Dentro de un bosque, cada dominio tiene automáticamente confianzas transitivas bidireccionales de primario-secundario y de raíz de árbol, así que solo creas confianzas manualmente hacia otros bosques, otros dominios fuera del bosque o territorios (realms) Kerberos que no son de Windows.",
   "La transitividad significa que la confianza se extiende a través de cadenas. Si A confía en B y B confía en C de forma transitiva, A en efecto confía en C. Hay cuatro tipos de confianza manual. Una confianza de bosque (forest trust) vincula los dominios raíz de dos bosques y es transitiva en todos los dominios de ambos bosques (pero no hacia un tercer bosque). Requiere que ambos bosques estén en un nivel funcional de bosque de Windows Server 2003 o superior y una resolución DNS funcional en ambas direcciones, normalmente mediante reenviadores condicionales. Una confianza externa (external trust) vincula dos dominios específicos de bosques distintos, o un dominio al estilo de Windows NT; no es transitiva y usa mecanismos de la época de NTLM. Una confianza de acceso directo (shortcut trust) se crea entre dos dominios del mismo bosque para acortar la ruta de referencias de Kerberos en árboles profundos; es transitiva. Una confianza de territorio (realm trust) vincula un dominio de Windows con un territorio Kerberos v5 que no es de Windows, como un territorio MIT Kerberos de UNIX, y puede ser transitiva o no transitiva.",
   "La autenticación selectiva restringe quién puede cruzar una confianza de bosque o externa. Con la autenticación de todo el bosque (o de todo el dominio), cualquier usuario del bosque de confianza puede autenticarse en cualquier equipo del bosque que confía, y luego se aplican los permisos normales. Con la autenticación selectiva, a los usuarios del lado de confianza se les deniega el acceso de forma predeterminada, y debes conceder el permiso Allowed to authenticate en cada objeto de equipo específico al que puedan llegar. Esta es la opción para escenarios de socios y adquisiciones en los que solo quieres exponer unos pocos servidores.",
   "El filtrado de SID protege al lado que confía del abuso del historial de SID. El token de acceso de un usuario puede llevar SID adicionales en su atributo sIDHistory (usado durante las migraciones). Un administrador malintencionado de un bosque de confianza podría inyectar un SID privilegiado, como el SID de tus Domain Admins, en el historial de una cuenta. El filtrado de SID, también llamado cuarentena, elimina los SID que no pertenecen al dominio de confianza. Está activado de forma predeterminada en las confianzas externas y de bosque. Puedes relajarlo temporalmente durante una migración para que los usuarios migrados conserven el acceso mediante el historial de SID, usando `netdom trust ... /quarantine:no` o `/enablesidhistory:yes` para las confianzas de bosque, y debes volver a habilitarlo después.",
   "Creas las confianzas en Active Directory Domains and Trusts o con `netdom trust`, y las validas con las mismas herramientas o con `Get-ADTrust`. La mayoría de las fallas de confianza se deben al DNS: cada lado debe poder encontrar los DC del otro, así que configura primero reenviadores condicionales o zonas de rutas internas (stub zones)."
  ],
  "terms": [
   [
    "Trusting domain (dominio que confía)",
    "El dominio que tiene los recursos y acepta la autenticación de otro dominio."
   ],
   [
    "Forest trust (confianza de bosque)",
    "Una confianza transitiva entre dos dominios raíz de bosque que abarca todos los dominios de ambos bosques."
   ],
   [
    "Shortcut trust (confianza de acceso directo)",
    "Una confianza transitiva manual dentro de un bosque que acorta las rutas de referencias de Kerberos entre dominios distantes."
   ],
   [
    "Selective authentication (autenticación selectiva)",
    "Una configuración de confianza que requiere el permiso Allowed to authenticate en cada equipo antes de que los usuarios de confianza puedan llegar a él."
   ],
   [
    "SID filtering (filtrado de SID)",
    "Eliminar los SID ajenos, incluidos los valores de sIDHistory, de los tokens que cruzan una confianza para bloquear la escalada de privilegios."
   ]
  ],
  "example": "Contoso adquiere Fabrikam. Crean reenviadores condicionales, establecen una confianza de bosque bidireccional y habilitan la autenticación selectiva en el lado de Contoso, de modo que el personal de Fabrikam solo puede llegar a los tres servidores de archivos a los que se concedió Allowed to authenticate, mientras las migraciones con ADMT avanzan en segundo plano.",
  "tip": "El acceso fluye en sentido opuesto a la flecha de la confianza: 'A confía en B' significa que los usuarios de B pueden usar los recursos de A. Las confianzas de bosque y de acceso directo son transitivas; las externas no; las de territorio pueden ser de cualquiera de los dos tipos.",
  "check": [
   [
    "El dominio A confía en el dominio B de forma unidireccional. ¿Los usuarios de quién pueden acceder a los recursos de quién?",
    "A los usuarios de B (de confianza) se les puede conceder acceso a los recursos de A (que confía)."
   ],
   [
    "¿Qué tipo de confianza usarías para conectarte a un territorio MIT Kerberos de UNIX?",
    "Una confianza de territorio (realm trust)."
   ],
   [
    "¿Contra qué protege el filtrado de SID?",
    "Contra un dominio de confianza que inyecte SID privilegiados, por ejemplo mediante sIDHistory, en tokens usados en el dominio que confía."
   ]
  ]
 },
 {
  "t": "Users, groups (domain local, global, universal), OUs and delegation of control; group managed service accounts and the KDS root key",
  "tt": "Usuarios, grupos (locales de dominio, globales, universales), unidades organizativas y delegación de control; cuentas de servicio administradas de grupo y la clave raíz de KDS",
  "body": [
   "Los usuarios, los equipos y los grupos son los objetos cotidianos de AD. Las unidades organizativas (OU) son contenedores que creas para organizar esos objetos. Las OU importan por dos razones: vinculas objetos de directiva de grupo (GPO) a ellas y delegas el control administrativo sobre ellas. Los contenedores integrados Users y Computers no son OU, así que no puedes vincularles GPO; la mayoría de las organizaciones construye una estructura de OU por ubicación, departamento o tipo de objeto y mueve los objetos a ella.",
   "Los grupos tienen un tipo y un ámbito. Los grupos de seguridad pueden usarse en permisos; los grupos de distribución son solo para correo electrónico. El ámbito decide qué puede contener un grupo y dónde puede usarse. Un grupo local de dominio (domain local) puede contener cuentas y grupos de cualquier dominio de confianza, pero solo se le pueden asignar permisos en su propio dominio, por lo que es ideal para los permisos sobre recursos. Un grupo global puede contener solo miembros de su propio dominio, pero puede usarse en cualquier parte del bosque o en dominios que confían, por lo que es ideal para agrupar personas por función. Un grupo universal puede contener miembros de cualquier dominio del bosque y usarse en cualquier parte del bosque; su pertenencia se almacena en el catálogo global, así que mantén estable la pertenencia a los grupos universales.",
   "La estrategia de anidamiento recomendada por Microsoft es AGDLP: coloca las cuentas (Accounts) en grupos globales (Global), coloca los grupos globales en grupos locales de dominio (Domain Local) y asigna los permisos (Permissions) a los grupos locales de dominio. En bosques con varios dominios, AGUDLP agrega grupos universales en el medio. Esto mantiene cortos los permisos en los recursos y te permite cambiar quién tiene acceso modificando la pertenencia a los grupos globales.",
   "La delegación de control te permite otorgar derechos limitados sin convertir a alguien en Domain Admin. Haz clic con el botón derecho en una OU, elige Delegate Control, selecciona un grupo (por ejemplo Helpdesk) y una tarea como restablecer contraseñas de usuario y forzar el cambio de contraseña en el siguiente inicio de sesión. El asistente escribe entradas de control de acceso en la OU. Delega siempre a grupos, no a personas individuales, y revisa el resultado en la pestaña Security de la OU, en Advanced.",
   "Los servicios a menudo se ejecutan con cuentas cuyas contraseñas nunca cambian, lo cual es un riesgo de seguridad. Una cuenta de servicio administrada de grupo (gMSA) soluciona esto. AD genera y rota automáticamente una contraseña compleja (cada 30 días de forma predeterminada), y solo los equipos que indiques pueden obtenerla. Antes de crear la primera gMSA, el dominio necesita una clave raíz de Key Distribution Services (KDS), que los DC usan para derivar las contraseñas de las gMSA. `Add-KdsRootKey -EffectiveImmediately` aun así espera hasta 10 horas por la replicación; en un laboratorio con un solo DC puedes retrasar su fecha con `-EffectiveTime ((Get-Date).AddHours(-10))`, pero no lo hagas en producción.",
   "```powershell\nNew-ADServiceAccount -Name svcWeb -DNSHostName svcWeb.corp.contoso.com `\n  -PrincipalsAllowedToRetrieveManagedPassword WebServers\n# En un miembro de WebServers:\nInstall-ADServiceAccount svcWeb\nTest-ADServiceAccount svcWeb\n```\nLuego configura el servicio para que inicie sesión como `CORP\\svcWeb$` con la contraseña en blanco."
  ],
  "terms": [
   [
    "Domain local group (grupo local de dominio)",
    "Un grupo cuyos permisos se aplican solo en su propio dominio, pero que puede contener miembros de cualquier dominio de confianza."
   ],
   [
    "Global group (grupo global)",
    "Un grupo que contiene miembros solo de su propio dominio y que puede usarse para permisos en todo el bosque."
   ],
   [
    "Universal group (grupo universal)",
    "Un grupo con miembros de cualquier dominio del bosque, utilizable en cualquier parte, cuya pertenencia se replica al catálogo global."
   ],
   [
    "gMSA",
    "Group managed service account (cuenta de servicio administrada de grupo): una identidad de servicio cuya contraseña AD rota y entrega solo a los hosts autorizados."
   ],
   [
    "KDS root key (clave raíz de KDS)",
    "La clave del dominio que Key Distribution Services usa para generar las contraseñas de las gMSA; se requiere una vez antes de la primera gMSA."
   ]
  ],
  "example": "El servicio de asistencia necesita desbloquear cuentas y restablecer contraseñas solo para la OU Sales. El administrador ejecuta Delegate Control en OU=Sales, concede al grupo Helpdesk-Sales el permiso Reset user passwords y confirma que el personal de asistencia no puede modificar pertenencias a grupos ni otras OU.",
  "tip": "Si New-ADServiceAccount falla con un error relacionado con claves, la respuesta casi siempre es que falta la clave raíz de KDS o que aún no es efectiva. Para las preguntas sobre ámbitos de grupo, recuerda AGDLP.",
  "check": [
   [
    "¿Qué ámbito de grupo debe recibir los permisos NTFS en un recurso compartido de archivos en el modelo AGDLP?",
    "Un grupo local de dominio."
   ],
   [
    "¿Qué debe existir en el dominio antes de poder crear una gMSA?",
    "Una clave raíz de KDS creada con Add-KdsRootKey y que ya sea efectiva (normalmente después de la replicación)."
   ],
   [
    "¿Por qué no puedes vincular un GPO al contenedor predeterminado Users?",
    "Es un contenedor, no una OU; los GPO solo pueden vincularse a sitios, dominios y OU."
   ]
  ]
 },
 {
  "t": "Default Domain Policy vs fine-grained password policies (PSOs); AD Recycle Bin",
  "tt": "Default Domain Policy frente a directivas de contraseñas específicas (PSO); Papelera de reciclaje de AD",
  "body": [
   "Cada dominio necesita una directiva de contraseñas y de bloqueo de cuentas para sus cuentas de usuario. Para las cuentas de dominio, esa directiva proviene de la configuración de directiva de grupo en Computer Configuration, Policies, Windows Settings, Security Settings, Account Policies, y solo surte efecto cuando el GPO está vinculado en el nivel del dominio. Por convención, reside en la Default Domain Policy. Si vinculas un GPO con configuración de contraseñas a una OU, afecta solo a las cuentas locales de los equipos de esa OU, no a los usuarios del dominio. Esa es la limitación clásica: una directiva de contraseñas por dominio.",
   "Las directivas de contraseñas específicas (fine-grained password policies) eliminan esa limitación. Un objeto de configuración de contraseñas (PSO) contiene la misma configuración (longitud mínima, complejidad, historial, antigüedad máxima y mínima, cifrado reversible, umbral de bloqueo, duración y ventana de observación) y se aplica directamente a usuarios o a grupos de seguridad globales. Los PSO residen en el Password Settings Container, bajo System, y requieren un nivel funcional de dominio de Windows Server 2008 o superior. La forma más fácil de crearlos es en Active Directory Administrative Center (ADAC) o con `New-ADFineGrainedPasswordPolicy`, y los vinculas con `Add-ADFineGrainedPasswordPolicySubject`.",
   "Cuando más de un PSO podría aplicarse, decide la precedencia. Cada PSO tiene un número de precedencia, y gana el número más bajo. Un PSO vinculado directamente a un usuario siempre supera a los PSO que llegan al usuario mediante la pertenencia a grupos. Si no se aplica ningún PSO, se aplica la directiva del dominio de la directiva de grupo. Para ver qué obtiene realmente un usuario, ejecuta `Get-ADUserResultantPasswordPolicy -Identity alice`. Un PSO vinculado a una OU no hace nada, porque los PSO se aplican solo a usuarios y grupos; la solución alternativa es un grupo sombra (shadow group) que contenga a los usuarios de la OU.",
   "Los objetos eliminados son la otra mitad de este tema. Sin la Papelera de reciclaje de AD, eliminar un objeto le quita la mayoría de sus atributos (por ejemplo, las pertenencias a grupos) y lo convierte en una marca de exclusión (tombstone); recuperarlo por completo significa una restauración autoritativa desde una copia de seguridad con el DC arrancado en el Modo de restauración de servicios de directorio. La Papelera de reciclaje de AD, disponible a partir del nivel funcional de bosque de Windows Server 2008 R2, conserva los objetos eliminados con todos sus atributos durante la vida útil de objetos eliminados (de forma predeterminada, igual que la vida útil de marcas de exclusión, 180 días en los bosques modernos), así que puedes restaurarlos en línea.",
   "Habilitar la Papelera de reciclaje es un cambio unidireccional: una vez activada, no se puede desactivar. La habilitas en ADAC o con PowerShell, y debe replicarse a todos los DC antes de que los objetos eliminados a partir de ese momento estén protegidos; los objetos eliminados antes de habilitarla no se pueden recuperar de esta manera.",
   "```powershell\nEnable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target corp.contoso.com\nGet-ADObject -Filter 'samaccountname -eq \"jdoe\"' -IncludeDeletedObjects | Restore-ADObject\n```",
   "Si se eliminó una OU completa, restaura primero la OU y luego sus objetos secundarios, porque un objeto secundario no puede restaurarse dentro de un primario que sigue eliminado. ADAC muestra un contenedor Deleted Objects donde puedes elegir Restore o Restore To, lo que a menudo es más fácil que PowerShell en un laboratorio."
  ],
  "terms": [
   [
    "PSO",
    "Password Settings Object (objeto de configuración de contraseñas): una directiva específica de contraseñas y bloqueo aplicada a usuarios o a grupos de seguridad globales."
   ],
   [
    "Precedence (precedencia)",
    "El atributo del PSO que resuelve los conflictos; gana el valor más bajo, y un PSO vinculado directamente supera a los vinculados por grupo."
   ],
   [
    "Resultant password policy (directiva de contraseñas resultante)",
    "La única directiva que realmente se aplica a un usuario, mostrada por Get-ADUserResultantPasswordPolicy."
   ],
   [
    "AD Recycle Bin (Papelera de reciclaje de AD)",
    "Una característica opcional del bosque que conserva todos los atributos de los objetos eliminados para que puedan restaurarse en línea."
   ],
   [
    "Tombstone (marca de exclusión)",
    "Un objeto eliminado despojado de la mayoría de sus atributos, que se conserva solo para que la eliminación pueda replicarse antes de la recolección de elementos no utilizados."
   ]
  ],
  "example": "Seguridad exige contraseñas de 16 caracteres para los administradores, mientras que todos los demás mantienen 12. El administrador crea un PSO con precedencia 10 y longitud mínima 16, lo vincula al grupo global Tier0-Admins y confirma con Get-ADUserResultantPasswordPolicy que los administradores obtienen el PSO y los usuarios normales siguen obteniendo la Default Domain Policy.",
  "tip": "Una directiva de contraseñas vinculada a una OU no afecta a los usuarios del dominio, y los PSO no se pueden vincular a OU. Recuerda también que la Papelera de reciclaje necesita el nivel funcional de bosque 2008 R2 y no se puede deshabilitar una vez habilitada.",
  "check": [
   [
    "Dos PSO con precedencia 5 y 20 se aplican a un usuario a través de grupos. ¿Cuál gana?",
    "El PSO con precedencia 5, porque gana el número más bajo (a menos que haya otro PSO vinculado directamente al usuario)."
   ],
   [
    "Un PSO está vinculado a la OU Sales pero no tiene efecto. ¿Por qué?",
    "Los PSO se aplican solo a usuarios y grupos de seguridad globales, no a OU; usa un grupo sombra que contenga a los usuarios de la OU."
   ],
   [
    "¿Qué debes restaurar primero cuando se eliminaron una OU completa y sus usuarios?",
    "La propia OU, y luego los objetos secundarios que contiene."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Entra Connect Sync (including staging mode) vs Entra Cloud Sync; password hash sync, pass-through authentication, seamless SSO",
  "tt": "Identidad híbrida: Entra Connect Sync (incluido el modo de ensayo) frente a Entra Cloud Sync; sincronización de hash de contraseñas, autenticación de paso a través e inicio de sesión único de conexión directa",
  "body": [
   "La identidad híbrida significa un único conjunto de identidades de usuario utilizado tanto en el entorno local (en AD DS) como en la nube (en Microsoft Entra ID, antes Azure AD). Un motor de sincronización copia usuarios, grupos y, opcionalmente, dispositivos de AD DS a Entra ID, y un método de inicio de sesión decide dónde se comprueban las contraseñas. Microsoft ofrece dos herramientas de sincronización, y el examen espera que sepas cuándo elegir cada una.",
   "Microsoft Entra Connect Sync es la herramienta tradicional: una aplicación completa instalada en un Windows Server unido al dominio, con una base de datos SQL local y un motor de sincronización que configuras mediante un asistente y el Synchronization Service Manager. Admite el conjunto de características más amplio, incluida la autenticación de paso a través, la federación con AD FS, la escritura diferida de dispositivos, la escritura diferida híbrida de Exchange y el filtrado y reglas de atributos complejos. Solo un servidor de Connect Sync puede exportar activamente a un inquilino (tenant). Para tener resiliencia, instalas un segundo servidor en modo de ensayo (staging mode): importa y sincroniza, construyendo una copia completa de los datos, pero no exporta cambios. Si el servidor activo falla, cambias el servidor de ensayo a activo. El modo de ensayo también es la forma de previsualizar de manera segura un cambio de configuración o una actualización antes de que afecte a Entra ID.",
   "Microsoft Entra Cloud Sync traslada la configuración y el motor a la nube. En el entorno local instalas solo agentes de aprovisionamiento ligeros, y administras el ámbito (por ejemplo, una OU) y la asignación de atributos en el centro de administración de Entra. Varios agentes proporcionan alta disponibilidad automáticamente, y maneja bien los bosques desconectados (como después de una fusión), porque cada bosque solo necesita un agente. Admite la sincronización de hash de contraseñas y la escritura diferida de contraseñas, pero no ofrece la lista completa de características de Connect Sync, así que revisa requisitos como la autenticación de paso a través o la escritura diferida de dispositivos antes de elegirlo. Las dos herramientas pueden coexistir, por ejemplo Cloud Sync para un bosque recién adquirido mientras Connect Sync atiende el bosque principal.",
   "Los métodos de inicio de sesión son la segunda decisión. La sincronización de hash de contraseñas (PHS) sincroniza un hash del hash de la contraseña de AD con Entra ID, de modo que Entra ID valida los inicios de sesión por sí mismo. Es la opción más sencilla, sigue funcionando si el entorno local está caído y habilita la detección de credenciales filtradas. La autenticación de paso a través (PTA) mantiene la validación en el entorno local: agentes ligeros establecen conexiones salientes y comprueban cada contraseña contra AD DS en tiempo real, lo que aplica de inmediato los estados de cuenta locales como el bloqueo, las cuentas deshabilitadas y las horas de inicio de sesión. Implementa varios agentes de PTA para la disponibilidad. La federación con AD FS delega la autenticación por completo a una granja de federación local y se elige solo para requisitos que los otros métodos no pueden cumplir.",
   "El inicio de sesión único de conexión directa (Seamless SSO) es un complemento que funciona con PHS o PTA. Crea una cuenta de equipo llamada AZUREADSSOACC en AD, y los dispositivos unidos al dominio en la red corporativa obtienen un vale de Kerberos para Entra ID, de modo que los usuarios inician sesión sin escribir una contraseña. Rota periódicamente la clave de descifrado de Kerberos de esa cuenta.",
   "Una recomendación de diseño común es habilitar PHS incluso cuando usas PTA o federación, como método de inicio de sesión de respaldo y para los informes de credenciales filtradas."
  ],
  "terms": [
   [
    "Entra Connect Sync",
    "Un servidor de sincronización local con el conjunto completo de características híbridas; un servidor activo por inquilino."
   ],
   [
    "Staging mode (modo de ensayo)",
    "Un servidor de Connect Sync que importa y sincroniza pero no exporta, usado para la conmutación por error y para probar cambios."
   ],
   [
    "Entra Cloud Sync",
    "Sincronización configurada en la nube que usa agentes de aprovisionamiento locales ligeros; adecuada para bosques múltiples o desconectados."
   ],
   [
    "Pass-through authentication (autenticación de paso a través)",
    "Método de inicio de sesión en el que agentes locales validan las contraseñas contra AD DS en tiempo real."
   ],
   [
    "Seamless SSO (SSO de conexión directa)",
    "Inicio de sesión automático en Entra ID basado en Kerberos para dispositivos unidos al dominio en la red corporativa, usando la cuenta AZUREADSSOACC."
   ]
  ],
  "example": "Una empresa debe bloquear el inicio de sesión en la nube en el momento en que una cuenta se deshabilita en el entorno local y debe respetar las horas de inicio de sesión. Elige la autenticación de paso a través con tres agentes, mantiene habilitada la sincronización de hash de contraseñas como respaldo y ejecuta un segundo servidor de Connect Sync en modo de ensayo para la recuperación ante desastres.",
  "tip": "Si un escenario necesita que el bloqueo local, las horas de inicio de sesión o el estado deshabilitado se apliquen al instante en el inicio de sesión, la respuesta es PTA. Si necesita que el inicio de sesión sobreviva a una interrupción local con la menor infraestructura, la respuesta es PHS. Bosques desconectados con una huella mínima apuntan a Cloud Sync.",
  "check": [
   [
    "¿Qué hace un servidor de Connect Sync en modo de ensayo?",
    "Importa y sincroniza datos, pero no exporta a Entra ID ni a AD, por lo que puede tomar el control en caso de falla o usarse para probar cambios."
   ],
   [
    "¿Qué método de inicio de sesión sigue funcionando si todos los servidores locales están fuera de línea?",
    "La sincronización de hash de contraseñas, porque Entra ID valida la contraseña por sí mismo."
   ],
   [
    "¿Qué objeto de AD crea Seamless SSO?",
    "Una cuenta de equipo llamada AZUREADSSOACC."
   ]
  ]
 },
 {
  "t": "Group Policy processing (LSDOU), Enforced and Block Inheritance, security filtering, loopback processing, Central Store, backup and restore",
  "tt": "Procesamiento de directivas de grupo (LSDOU), Enforced y Block Inheritance, filtrado de seguridad, procesamiento de bucle invertido, almacén central, copia de seguridad y restauración",
  "body": [
   "La directiva de grupo entrega configuraciones a equipos y usuarios desde objetos de directiva de grupo (GPO) vinculados a sitios, dominios y OU. Entender el orden en que se aplican los GPO es la clave para predecir los resultados. El orden es LSDOU: primero la directiva local (Local), luego el sitio (Site), luego el dominio (Domain) y luego las OU desde la parte superior del árbol hasta la OU que contiene el objeto. Los GPO posteriores sobrescriben a los anteriores cuando hay configuraciones en conflicto, así que normalmente gana el GPO vinculado más cerca del objeto. Cuando varios GPO están vinculados al mismo contenedor, el que tiene el orden de vínculo 1 tiene la mayor precedencia y se aplica al final.",
   "Dos opciones cambian la herencia normal. Block Inheritance se establece en un dominio o una OU e impide que los GPO vinculados más arriba desciendan hasta él. Enforced (antes No Override) se establece en un vínculo de GPO y hace dos cosas: ese GPO no puede ser bloqueado por Block Inheritance, y sus configuraciones ganan sobre las configuraciones en conflicto de los GPO vinculados más abajo. Enforced supera a Block Inheritance. Usa ambos con moderación; dificultan la solución de problemas.",
   "El filtrado de seguridad controla a quién se aplica un GPO dentro de su ámbito. De forma predeterminada, un GPO se aplica a Authenticated Users. Para dirigirlo a un grupo, quita Authenticated Users de la lista Security Filtering y agrega el grupo. Desde una actualización de seguridad de 2016, los equipos leen los GPO en el contexto de seguridad del propio equipo, así que si quitas Authenticated Users aún debes conceder Read (no Apply) a Authenticated Users o a Domain Computers en la pestaña Delegation; de lo contrario, el GPO falla silenciosamente para todos. Los filtros WMI agregan condiciones como la versión del sistema operativo, que se evalúan en el cliente.",
   "El procesamiento de bucle invertido (loopback) maneja un caso especial. Normalmente, la configuración de usuario proviene de los GPO vinculados a la OU del usuario. En quioscos, PC de laboratorio o hosts de sesión de Escritorio remoto, quieres que la configuración de usuario se base en la ubicación del equipo. Habilitar la configuración de equipo Configure user Group Policy loopback processing mode en un GPO vinculado a la OU de los equipos logra esto. El modo Replace usa solo la configuración de usuario de los GPO del equipo; el modo Merge aplica la configuración normal del usuario y luego, encima, la configuración de usuario del equipo, de modo que el lado del equipo gana los conflictos.",
   "El almacén central (Central Store) es una carpeta, `\\\\corp.contoso.com\\SYSVOL\\corp.contoso.com\\Policies\\PolicyDefinitions`, que contiene los archivos de plantillas administrativas ADMX y ADML. Una vez que existe, el Group Policy Management Editor de cada administrador usa las mismas plantillas en lugar de la copia local de cada estación de trabajo, y se replica a todos los DC con SYSVOL. Copia ahí los archivos ADMX más recientes cuando agregues plantillas para una nueva versión de Windows u Office.",
   "Haz copias de seguridad de los GPO en la Group Policy Management Console (GPMC) o con `Backup-GPO -All -Path D:\\GPOBackup`. `Restore-GPO` devuelve un GPO a un estado respaldado, conservando su GUID. `Import-GPO` copia la configuración de una copia de seguridad a un GPO distinto o nuevo, que es como mueves GPO entre dominios o bosques, opcionalmente con una tabla de migración para traducir rutas y entidades de seguridad. Las copias de seguridad contienen configuraciones, no vínculos, así que registra los vínculos por separado. En los clientes, `gpupdate /force` actualiza la directiva y `gpresult /r` o `gpresult /h report.html` muestra qué se aplicó y por qué."
  ],
  "terms": [
   [
    "LSDOU",
    "Orden de aplicación de la directiva de grupo: Local, Site (sitio), Domain (dominio), OU; los GPO posteriores ganan los conflictos."
   ],
   [
    "Enforced (exigido)",
    "Una opción de vínculo de GPO que impide el bloqueo y hace que el GPO gane sobre los GPO de niveles inferiores."
   ],
   [
    "Block Inheritance (bloquear herencia)",
    "Una configuración de OU o dominio que impide que se apliquen los GPO no exigidos de los contenedores primarios."
   ],
   [
    "Loopback processing (procesamiento de bucle invertido)",
    "Aplicar la configuración de usuario según los GPO del equipo, en modo Replace o Merge."
   ],
   [
    "Central Store (almacén central)",
    "La carpeta PolicyDefinitions en SYSVOL que proporciona plantillas ADMX compartidas a todos los administradores."
   ]
  ],
  "example": "Los PC de quiosco de la OU Kiosks deben dar a cualquier usuario el mismo escritorio restringido. El administrador vincula a la OU Kiosks un GPO con configuración de usuario restrictiva y habilita el procesamiento de bucle invertido en modo Replace, de modo que las directivas normales de la OU de los usuarios se ignoran cuando inician sesión en un quiosco.",
  "tip": "Enforced gana sobre Block Inheritance siempre. Si un GPO filtrado dejó de aplicarse después de quitar Authenticated Users, la solución es dar el permiso Read a Authenticated Users o a Domain Computers.",
  "check": [
   [
    "Un GPO de dominio es Enforced y una OU tiene Block Inheritance. ¿Se aplica el GPO de dominio a los objetos de la OU?",
    "Sí. Los vínculos Enforced no se pueden bloquear."
   ],
   [
    "¿Cuál es la diferencia entre el bucle invertido Replace y Merge?",
    "Replace usa solo la configuración de usuario de los GPO vinculados al equipo; Merge aplica la configuración normal del usuario y luego la configuración de usuario del equipo, que gana los conflictos."
   ],
   [
    "¿Qué cmdlet copia la configuración de una copia de seguridad de GPO a un GPO en otro dominio?",
    "Import-GPO (opcionalmente con una tabla de migración)."
   ]
  ]
 },
 {
  "t": "Migrating AD objects between domains and forests with ADMT and SID history; domain and forest functional levels when upgrading DCs",
  "tt": "Migración de objetos de AD entre dominios y bosques con ADMT e historial de SID; niveles funcionales de dominio y bosque al actualizar los DC",
  "body": [
   "Las fusiones, las adquisiciones y las limpiezas suelen requerir mover usuarios, grupos y equipos de un dominio o bosque a otro. Active Directory Migration Tool (ADMT) es la herramienta gratuita de Microsoft para esto. Es una herramienta antigua que no se ha desarrollado activamente en años, pero sigue siendo la respuesta de referencia para las migraciones de reestructuración en el examen. ADMT se ejecuta en un servidor miembro del dominio de destino, necesita una instancia de SQL Server para su base de datos y requiere una confianza entre el origen y el destino para poder leer del origen y escribir en el destino.",
   "El problema central es el acceso. Un usuario migrado obtiene un SID nuevo en el dominio de destino, pero los archivos, los recursos compartidos y las ACL del origen siguen haciendo referencia al SID antiguo. El historial de SID resuelve esto: ADMT copia el SID antiguo en el atributo sIDHistory de la cuenta nueva, de modo que el token de acceso del usuario contiene ambos SID y los permisos antiguos siguen funcionando durante la transición. Para migrar el historial de SID, la auditoría debe estar habilitada en ambos dominios, debe existir en el dominio de origen un grupo local con el nombre del dominio de origen seguido de tres signos de dólar (por ejemplo `SOURCE$$$`) (ADMT puede crearlo), y el filtrado de SID debe relajarse en la confianza. Elimina el historial de SID y restablece el filtrado de SID cuando termine la migración.",
   "Las contraseñas no se migran de forma predeterminada. Para conservar las contraseñas existentes de los usuarios, instalas el servicio Password Export Server (PES) en un DC del dominio de origen con una clave generada por ADMT; de lo contrario, ADMT establece contraseñas complejas nuevas y las escribe en un archivo.",
   "Un orden típico es: migrar primero los grupos (con historial de SID), luego los usuarios (para que ADMT pueda actualizar las pertenencias a grupos sobre la marcha), luego las cuentas de servicio, luego los equipos y, por último, ejecutar la traducción de seguridad, que reescribe las ACL, los perfiles locales y las pertenencias a grupos en los servidores miembro para que hagan referencia a los SID nuevos en lugar de los antiguos. Migrar equipos requiere un reinicio para unirlos al dominio de destino.",
   "Los niveles funcionales son la otra mitad de este tema. El nivel funcional de dominio (DFL) y el nivel funcional de bosque (FFL) establecen qué características de AD están disponibles y qué sistemas operativos de DC están permitidos. Un nivel solo puede ser tan alto como el DC más antiguo de su ámbito, así que lo elevas después de que todos los DC más antiguos hayan desaparecido. Por ejemplo, las directivas de contraseñas específicas necesitan al menos el DFL 2008 y la Papelera de reciclaje necesita el FFL 2008 R2. Windows Server 2025 introdujo un nuevo nivel funcional por primera vez en años, mientras que varias versiones recientes reutilizaron el nivel de Windows Server 2016. Las versiones más nuevas de DC también requieren que el bosque existente esté en un nivel mínimo antes de poder promoverse, así que compruébalo antes de empezar.",
   "La ruta de actualización habitual no es una actualización en el lugar del sistema operativo de los DC. En su lugar, agrega DC nuevos que ejecuten la nueva versión (la promoción ejecuta automáticamente la preparación de esquema y de dominio de adprep si usas una cuenta de Schema Admins y Enterprise Admins), mueve a ellos los roles FSMO, actualiza la configuración de DNS y DHCP que apunta a los DC antiguos, degrada los DC antiguos y luego eleva el DFL y el FFL con `Set-ADDomainMode` y `Set-ADForestMode`. Antes de agregar DC modernos, SYSVOL ya debe replicarse con DFS Replication en lugar del antiguo File Replication Service (FRS)."
  ],
  "terms": [
   [
    "ADMT",
    "Active Directory Migration Tool: migra usuarios, grupos, equipos y cuentas de servicio entre dominios o bosques."
   ],
   [
    "SID history (historial de SID)",
    "El atributo sIDHistory que guarda los SID anteriores de una cuenta para que los permisos antiguos sobre recursos sigan funcionando después de la migración."
   ],
   [
    "Security translation (traducción de seguridad)",
    "Paso de ADMT que reemplaza los SID antiguos por los nuevos en las ACL, los perfiles y las pertenencias a grupos de los recursos."
   ],
   [
    "Password Export Server",
    "Un servicio instalado en un DC de origen que permite a ADMT migrar las contraseñas de los usuarios."
   ],
   [
    "Functional level (nivel funcional)",
    "Configuración de todo el dominio o bosque que desbloquea características de AD y limita qué versiones del sistema operativo de DC pueden estar presentes."
   ]
  ],
  "example": "Después de adquirir Fabrikam, Contoso crea una confianza de bosque, relaja el filtrado de SID, instala PES en un DC de Fabrikam y usa ADMT para migrar los grupos y luego los usuarios con historial de SID y contraseñas. Los usuarios conservan el acceso a los servidores de archivos de Fabrikam hasta que la traducción de seguridad actualiza las ACL, después de lo cual se borra el historial de SID y se vuelve a habilitar el filtrado.",
  "tip": "El historial de SID mantiene el acceso funcionando; la traducción de seguridad lo hace permanente. Los niveles funcionales dependen del DC más antiguo, y elevarlos normalmente es unidireccional, así que las preguntas del tipo '¿todavía podemos agregar un DC con Server 2012 R2?' dependen del nivel actual.",
  "check": [
   [
    "¿Por qué migrar los grupos antes que los usuarios con ADMT?",
    "Para que, cuando se muevan los usuarios, ADMT pueda agregarlos a los grupos de destino ya migrados y conservar la pertenencia."
   ],
   [
    "¿Qué tres requisitos previos respaldan la migración del historial de SID?",
    "La auditoría habilitada en ambos dominios, el grupo local SOURCE$$$ en el dominio de origen y el filtrado de SID relajado en la confianza (además de derechos de administrador en ambos)."
   ],
   [
    "Todavía tienes un DC con Windows Server 2012 R2. ¿Puedes elevar el nivel funcional de dominio a Windows Server 2016?",
    "No. El nivel no puede superar la versión del DC más antiguo del dominio; primero degrada o actualiza ese DC."
   ]
  ]
 },
 {
  "t": "Windows Admin Center: desktop vs gateway mode, extensions, Kerberos constrained delegation, Windows Admin Center for Azure VMs and Arc-enabled servers",
  "tt": "Windows Admin Center: modo de escritorio frente a modo de puerta de enlace, extensiones, delegación restringida de Kerberos, Windows Admin Center para máquinas virtuales de Azure y servidores habilitados para Arc",
  "body": [
   "Windows Admin Center (WAC) es la herramienta de administración basada en navegador de Microsoft para Windows Server, clústeres de conmutación por error, clústeres hiperconvergentes y clientes Windows. Reemplaza muchas consolas MMC clásicas con una sola interfaz web y se comunica con los nodos administrados mediante comunicación remota de PowerShell y WMI sobre WinRM, por lo que los servidores administrados no necesitan un agente. Es gratuito con la licencia de Windows Server.",
   "WAC tiene dos formas de implementación. En el modo de escritorio (desktop mode) lo instalas en un cliente Windows y solo lo usa el usuario local, normalmente navegando a localhost en un puerto que elijas. En el modo de puerta de enlace (gateway mode) lo instalas en un Windows Server, y muchos administradores se conectan a él desde sus navegadores por HTTPS; la puerta de enlace luego se conecta a los servidores administrados. El modo de puerta de enlace es el que usas en producción, a menudo con un certificado TLS de confianza, alta disponibilidad en un clúster de conmutación por error y un control de acceso que restringe quién puede usar la puerta de enlace y si son administradores de la puerta de enlace.",
   "La funcionalidad se entrega mediante extensiones. Las herramientas básicas (Server Manager, Hyper-V, Storage, Certificates, Firewall, Events, etc.) vienen como extensiones integradas, y Microsoft y sus socios publican más en una fuente (feed). Un administrador de la puerta de enlace las instala y actualiza en Settings, Extensions. Los fabricantes de hardware a menudo publican extensiones para el firmware y la supervisión del estado.",
   "La autenticación crea el clásico problema del doble salto. Cuando inicias sesión en una puerta de enlace y esta intenta usar tus credenciales para llegar a un servidor administrado, Kerberos no permite de forma predeterminada que la puerta de enlace transmita tu identidad. Puedes escribir credenciales para cada servidor, pero la mejor solución es la delegación restringida de Kerberos basada en recursos: en cada nodo administrado, permite que la cuenta de equipo de la puerta de enlace delegue en él. Después de eso, el inicio de sesión único fluye desde el navegador a través de la puerta de enlace hasta el nodo.",
   "```powershell\n$gw = Get-ADComputer WAC01\nGet-ADComputer SRV01 | Set-ADComputer -PrincipalsAllowedToDelegateToAccount $gw\n```",
   "Windows Admin Center también está disponible desde Azure Portal. Para las máquinas virtuales de Azure que ejecutan Windows Server, habilitas Windows Admin Center en la hoja de la VM, lo que implementa una extensión de VM; luego lo abres en el portal, iniciando sesión con Microsoft Entra ID, y el acceso se controla mediante el control de acceso basado en roles de Azure (RBAC), usando un rol como Windows Admin Center Administrator Login. La VM necesita una ruta de red para la conexión, normalmente una regla de entrada para el puerto de WAC desde el servicio del portal. Para los servidores habilitados para Azure Arc, la misma experiencia del portal funciona para máquinas locales o de otras nubes mediante el agente Arc Connected Machine, sin necesidad de abrir puertos de entrada a internet, porque la conexión se negocia a través de Azure Arc.",
   "En un laboratorio verás la lista de conexiones, agregarás servidores por nombre, elegirás Manage as para proporcionar credenciales y abrirás herramientas desde el panel izquierdo. Si las conexiones fallan, revisa WinRM (`Test-WSMan SRV01`), las reglas de firewall para WinRM sobre HTTP (5985) y la configuración de delegación."
  ],
  "terms": [
   [
    "Gateway mode (modo de puerta de enlace)",
    "WAC instalado en Windows Server y compartido por varios administradores a través de sus navegadores."
   ],
   [
    "Desktop mode (modo de escritorio)",
    "WAC instalado en un cliente Windows para un único usuario local."
   ],
   [
    "Extension (extensión)",
    "Un complemento que agrega una herramienta o solución a Windows Admin Center, administrado desde la fuente de extensiones."
   ],
   [
    "Resource-based constrained delegation (delegación restringida basada en recursos)",
    "Configuración de Kerberos en un equipo de destino que permite que una cuenta indicada, como la puerta de enlace de WAC, delegue en él."
   ],
   [
    "WAC in the Azure portal (WAC en Azure Portal)",
    "Administrar máquinas virtuales de Azure o servidores habilitados para Arc mediante Windows Admin Center desde el portal, con inicio de sesión de Entra ID y Azure RBAC."
   ]
  ],
  "example": "Los administradores se quejan de que se les piden credenciales para cada servidor cuando usan la puerta de enlace de WAC. El equipo ejecuta Set-ADComputer -PrincipalsAllowedToDelegateToAccount en cada servidor administrado, indicando la cuenta de equipo de la puerta de enlace, y ahora el inicio de sesión único fluye a través de la puerta de enlace.",
  "tip": "Las solicitudes repetidas de credenciales a través de una puerta de enlace de WAC apuntan a la delegación restringida de Kerberos. Para servidores locales que quieres administrar desde Azure Portal sin abrir puertos de entrada desde internet, la respuesta es Azure Arc más Windows Admin Center.",
  "check": [
   [
    "¿Qué modo de WAC debes elegir para que un equipo de administradores pueda compartir una sola instalación?",
    "El modo de puerta de enlace en Windows Server."
   ],
   [
    "¿Cómo evitas las solicitudes de credenciales por doble salto a través de una puerta de enlace de WAC?",
    "Configurando la delegación restringida de Kerberos basada en recursos en los nodos administrados, para que la cuenta de equipo de la puerta de enlace pueda delegar en ellos."
   ],
   [
    "¿Qué controla quién puede usar Windows Admin Center para una VM de Azure desde el portal?",
    "Las asignaciones de roles de Azure RBAC, como Windows Admin Center Administrator Login, con inicio de sesión de Entra ID."
   ]
  ]
 },
 {
  "t": "PowerShell remoting: Enter-PSSession vs Invoke-Command, Just Enough Administration (JEA) role capability and session configuration files",
  "tt": "Comunicación remota de PowerShell: Enter-PSSession frente a Invoke-Command, archivos de funcionalidad de rol y de configuración de sesión de Just Enough Administration (JEA)",
  "body": [
   "La comunicación remota de PowerShell (PowerShell remoting) te permite ejecutar comandos en otros equipos mediante Windows Remote Management (WinRM), que escucha en TCP 5985 para HTTP y 5986 para HTTPS. En Windows Server está habilitada de forma predeterminada; en los clientes ejecutas `Enable-PSRemoting`. En un dominio, Kerberos autentica la conexión y el tráfico de WinRM se cifra incluso sobre HTTP. Fuera de un dominio normalmente usas HTTPS o agregas los hosts a la lista TrustedHosts.",
   "Hay dos formas principales de usarla. `Enter-PSSession -ComputerName SRV01` abre una sesión interactiva de uno a uno: tu símbolo del sistema cambia a `[SRV01]: PS>` y todo lo que escribes se ejecuta de forma remota hasta `Exit-PSSession`. Es ideal para la solución práctica de problemas de un servidor. `Invoke-Command -ComputerName SRV01,SRV02,SRV03 -ScriptBlock { Get-Service Spooler }` es de uno a muchos: ejecuta un bloque de script en muchas máquinas en paralelo (32 a la vez de forma predeterminada, ajustable con `-ThrottleLimit`) y devuelve objetos deserializados etiquetados con una propiedad PSComputerName. Es adecuado para la automatización y las tareas en abanico. `New-PSSession` crea sesiones persistentes que puedes reutilizar con cualquiera de los dos cmdlets, manteniendo vivas las variables entre comandos.",
   "Los objetos devueltos son instantáneas deserializadas: obtienes los valores de las propiedades, pero no los métodos activos. Y la comunicación remota tiene el problema del segundo salto: desde dentro de una sesión remota no puedes usar tus credenciales de Kerberos para llegar a una tercera máquina, como un recurso compartido de archivos, a menos que configures la delegación restringida de Kerberos basada en recursos o CredSSP. CredSSP funciona, pero envía credenciales reutilizables al host remoto, así que es preferible la delegación.",
   "Just Enough Administration (JEA) usa la comunicación remota para aplicar el privilegio mínimo. En lugar de convertir al personal de asistencia en administradores locales, publicas un punto de conexión restringido donde solo pueden ejecutar los comandos que permitas, y esos comandos se ejecutan con una cuenta virtual temporal privilegiada o con una cuenta de servicio administrada de grupo. JEA tiene dos archivos.",
   "El archivo de funcionalidad de rol (`.psrc`, creado con `New-PSRoleCapabilityFile`) define lo que puede hacer un rol: `VisibleCmdlets` (opcionalmente con parámetros y valores permitidos), `VisibleFunctions`, `VisibleExternalCommands` y `VisibleProviders`. Debe estar en una carpeta `RoleCapabilities` dentro de un módulo de PowerShell en el servidor de destino, y el nombre del archivo se convierte en el nombre del rol. El archivo de configuración de sesión (`.pssc`, creado con `New-PSSessionConfigurationFile`) define el punto de conexión: `SessionType = 'RestrictedRemoteServer'`, `RunAsVirtualAccount = $true` o `GroupManagedServiceAccount`, `TranscriptDirectory` para la auditoría y `RoleDefinitions`, que asigna grupos de AD a funcionalidades de rol.",
   "```powershell\nNew-PSSessionConfigurationFile -Path .\\Helpdesk.pssc -SessionType RestrictedRemoteServer `\n  -RunAsVirtualAccount -TranscriptDirectory C:\\JEA\\Transcripts `\n  -RoleDefinitions @{ 'CORP\\Helpdesk' = @{ RoleCapabilities = 'ServiceOperator' } }\nRegister-PSSessionConfiguration -Name Helpdesk -Path .\\Helpdesk.pssc\n# El usuario se conecta con:\nEnter-PSSession -ComputerName SRV01 -ConfigurationName Helpdesk\n```",
   "Los usuarios conectados se ejecutan en modo NoLanguage y solo ven los comandos permitidos; `Get-PSSessionCapability -ConfigurationName Helpdesk -Username CORP\\alice` muestra lo que obtendrá un usuario determinado. Prueba con `Test-PSSessionConfigurationFile` antes de registrar."
  ],
  "terms": [
   [
    "WinRM",
    "Windows Remote Management: el servicio y protocolo que transporta la comunicación remota de PowerShell en los puertos 5985 y 5986."
   ],
   [
    "Invoke-Command",
    "Ejecuta un bloque de script en uno o muchos equipos remotos en paralelo y devuelve los resultados."
   ],
   [
    "Role capability file (archivo de funcionalidad de rol)",
    "Un archivo .psrc que define los cmdlets, funciones y comandos que puede usar un rol de JEA."
   ],
   [
    "Session configuration file (archivo de configuración de sesión)",
    "Un archivo .pssc que define un punto de conexión de JEA: tipo de sesión, identidad de ejecución, transcripciones y asignaciones de grupos a roles."
   ],
   [
    "Virtual account (cuenta virtual)",
    "Una identidad temporal de administrador local creada para una sesión de JEA y descartada cuando termina."
   ]
  ],
  "example": "El personal de asistencia necesita reiniciar la cola de impresión en los servidores de archivos, pero no debe ser administrador. El administrador crea un ServiceOperator.psrc que permite Restart-Service solo con -Name Spooler, asigna CORP\\Helpdesk a él en un .pssc y registra el punto de conexión en cada servidor con Invoke-Command.",
  "tip": "Interactivo con un servidor significa Enter-PSSession; muchos servidores a la vez significa Invoke-Command. En JEA, el .psrc dice qué (comandos) y el .pssc dice quién y cómo (grupos, cuenta de ejecución, transcripciones).",
  "check": [
   [
    "¿Qué archivo de JEA asigna un grupo de AD a un rol?",
    "El archivo de configuración de sesión (.pssc), en su entrada RoleDefinitions."
   ],
   [
    "¿Dónde debe colocarse un archivo de funcionalidad de rol para que JEA lo encuentre?",
    "En una subcarpeta RoleCapabilities de un módulo de PowerShell ubicado en una ruta de módulos del servidor de destino."
   ],
   [
    "Necesitas ejecutar el mismo comando en 200 servidores. ¿Qué cmdlet es adecuado?",
    "Invoke-Command, que se distribuye en paralelo con un límite de simultaneidad (throttle limit)."
   ]
  ]
 },
 {
  "t": "Azure Arc-enabled servers: Connected Machine agent (azcmagent), at-scale onboarding with a service principal, extensions, tags and RBAC",
  "tt": "Servidores habilitados para Azure Arc: agente Connected Machine (azcmagent), incorporación a escala con una entidad de servicio, extensiones, etiquetas y RBAC",
  "body": [
   "Azure Arc extiende el plano de administración de Azure a máquinas que no son VM de Azure: servidores físicos y VM en el entorno local, en sucursales o en otras nubes. Una vez que un servidor está habilitado para Arc, aparece en Azure Portal como un recurso de tipo `Microsoft.HybridCompute/machines`, en una suscripción y un grupo de recursos que elijas. Luego puedes aplicar las mismas herramientas que usas para las VM de Azure: etiquetas, Azure RBAC, Azure Policy, Update Manager, Azure Monitor, Microsoft Defender for Cloud y extensiones de VM.",
   "El puente es el agente Azure Connected Machine, instalado en cada servidor. Incluye el Hybrid Instance Metadata Service, el agente de configuración de invitado (configuración de máquina) y el administrador de extensiones. Se comunica solo de forma saliente por HTTPS (TCP 443) con Azure, opcionalmente a través de un proxy o un punto de conexión privado, así que no abres puertos de entrada. Cada servidor Arc obtiene una identidad administrada asignada por el sistema que puede usar para autenticarse ante los servicios de Azure. La suscripción necesita tener registrados proveedores de recursos como Microsoft.HybridCompute, Microsoft.GuestConfiguration y Microsoft.HybridConnectivity.",
   "La herramienta de línea de comandos es `azcmagent`. `azcmagent connect` vincula la máquina con Azure, `azcmagent show` muestra el estado y los detalles del recurso, `azcmagent check` prueba la conectividad de red con los puntos de conexión requeridos, `azcmagent disconnect` elimina la conexión y `azcmagent config` controla la configuración local, como qué extensiones están permitidas. Para uno o dos servidores, el portal genera un script que instala el agente y te hace iniciar sesión de forma interactiva.",
   "Para muchos servidores, realizas la incorporación a escala con una entidad de servicio (service principal), una identidad de Entra ID para la automatización. Crea una (la página de incorporación de Arc del portal puede hacerlo) y concédele el rol Azure Connected Machine Onboarding, que le permite incorporar máquinas, pero no administrarlas después. Luego ejecuta el script generado mediante Configuration Manager, Group Policy, Ansible o tus propias herramientas. Este llama a `azcmagent connect --service-principal-id <id> --service-principal-secret <secret> --resource-group ... --tenant-id ... --location ... --subscription-id ...`. Protege el secreto, limita el ámbito del rol a un grupo de recursos y dale una caducidad corta.",
   "Las extensiones agregan funcionalidades después de la incorporación, igual que en las VM de Azure. Las más comunes son Azure Monitor Agent para registros y métricas, Custom Script Extension, la integración con Microsoft Defender for Endpoint y la extensión de Key Vault para la sincronización de certificados. Puedes implementar extensiones manualmente o automáticamente con Azure Policy.",
   "Las etiquetas (tags) son pares nombre/valor que aplicas al recurso de Arc (por ejemplo `Environment=Prod`, `Owner=Finance`) para filtrar, informar costos y dirigir directivas. RBAC controla quién puede administrar el recurso de Arc: Azure Connected Machine Resource Administrator puede administrar máquinas y extensiones, Reader las ve, y los roles Virtual Machine User Login y Virtual Machine Administrator Login pueden regir el inicio de sesión con Entra ID donde se admita. Recuerda que Azure RBAC rige las acciones en Azure, mientras que las cuentas locales de Windows y AD siguen rigiendo quién puede iniciar sesión en el propio servidor."
  ],
  "terms": [
   [
    "Connected Machine agent (agente Connected Machine)",
    "El agente instalado en servidores que no son de Azure y que los conecta a Azure Arc mediante HTTPS saliente."
   ],
   [
    "azcmagent",
    "La herramienta de línea de comandos para conectar, comprobar y configurar el agente de Arc."
   ],
   [
    "Service principal (entidad de servicio)",
    "Una identidad de aplicación de Entra ID usada por scripts para incorporar servidores sin inicio de sesión interactivo."
   ],
   [
    "Azure Connected Machine Onboarding",
    "Un rol integrado que permite incorporar máquinas Arc, pero no administrarlas."
   ],
   [
    "VM extension (extensión de VM)",
    "Una pequeña aplicación complementaria que Azure implementa y administra en una VM o un servidor habilitado para Arc."
   ]
  ],
  "example": "Una empresa con 400 servidores Windows locales crea una entidad de servicio con el rol Azure Connected Machine Onboarding limitado al grupo de recursos rg-arc-onprem, distribuye el script de incorporación mediante Configuration Manager, etiqueta cada servidor por sitio y usa Azure Policy para implementar Azure Monitor Agent en todos ellos.",
  "tip": "Incorporar muchos servidores sin inicio de sesión interactivo apunta a una entidad de servicio con el rol Azure Connected Machine Onboarding. Arc solo necesita el puerto 443 saliente; si una pregunta sugiere abrir puertos de entrada para Arc, es incorrecta.",
  "check": [
   [
    "¿Qué comando de azcmagent verifica que un servidor puede llegar a los puntos de conexión de Azure requeridos?",
    "azcmagent check."
   ],
   [
    "¿Qué rol de privilegio mínimo debe tener una entidad de servicio de incorporación?",
    "Azure Connected Machine Onboarding, limitado al grupo de recursos de destino."
   ],
   [
    "¿Qué dirección de red requiere el agente Connected Machine?",
    "Solo HTTPS saliente (443); ningún puerto de entrada."
   ]
  ]
 },
 {
  "t": "Azure Policy and machine configuration for Arc-enabled and Azure servers; audit vs deploy effects",
  "tt": "Azure Policy y configuración de máquina para servidores habilitados para Arc y de Azure; efectos de auditoría frente a implementación",
  "body": [
   "Azure Policy evalúa los recursos de Azure según reglas e informa o aplica el cumplimiento. Una definición de directiva es una regla JSON con una condición y un efecto. Una iniciativa (conjunto de directivas) agrupa definiciones relacionadas, como una línea base de seguridad. Una asignación aplica una definición o iniciativa a un ámbito: un grupo de administración, una suscripción o un grupo de recursos, con exclusiones y parámetros opcionales. Como los servidores habilitados para Arc son recursos de Azure, las mismas asignaciones los abarcan junto con las VM de Azure.",
   "El efecto decide qué ocurre cuando un recurso coincide. Audit registra el incumplimiento, pero no cambia nada. AuditIfNotExists marca un recurso cuando falta un recurso relacionado, como una extensión. Deny bloquea las solicitudes de creación o actualización que infringen la regla. Modify agrega, cambia o elimina etiquetas y ciertas propiedades. Append agrega campos. DeployIfNotExists (DINE) implementa un recurso relacionado, por ejemplo instalando la extensión Azure Monitor Agent, cuando falta. Disabled desactiva la directiva, lo cual es útil para pruebas.",
   "DINE y Modify son los efectos de implementación. Actúan automáticamente sobre los recursos nuevos o actualizados, pero los recursos existentes que no cumplen necesitan una tarea de corrección (remediation task). Como la propia directiva realiza cambios, su asignación necesita una identidad administrada con los roles RBAC adecuados; el portal la crea cuando haces la asignación. Un patrón de implementación común es asignar primero en Audit para medir el impacto, luego cambiar a DeployIfNotExists y ejecutar la corrección.",
   "Azure Policy por sí sola comprueba las propiedades de Azure Resource Manager, el exterior de la máquina. La configuración de máquina (machine configuration, antes configuración de invitado de Azure Policy) mira dentro del sistema operativo: aplicaciones instaladas, configuración del registro, directiva de contraseñas, certificados, servicios. Usa un pequeño agente que está integrado en el agente Arc Connected Machine y que se instala en las VM de Azure como la extensión de configuración de máquina (Microsoft.GuestConfiguration), además de una identidad administrada asignada por el sistema. Las directivas integradas pueden implementar ambos requisitos previos para las VM de Azure.",
   "Las asignaciones de configuración de máquina tienen sus propios modos. Audit solo informa si el sistema operativo coincide. ApplyAndMonitor aplica la configuración una vez y luego informa la desviación (drift). ApplyAndAutoCorrect la aplica y corrige la desviación cada vez que se detecta. Las configuraciones se empaquetan a partir de PowerShell Desired State Configuration (DSC) y se publican para que la directiva haga referencia a ellas, y Microsoft proporciona algunas integradas, como la auditoría de la línea base de seguridad de Windows.",
   "El cumplimiento aparece en la hoja Policy Compliance, por asignación y por recurso, y la evaluación se ejecuta periódicamente, así como cuando cambian los recursos. Puedes iniciar un examen a petición con `Start-AzPolicyComplianceScan`. Para el examen, céntrate en elegir el efecto correcto y en recordar que los recursos existentes necesitan corrección."
  ],
  "terms": [
   [
    "Policy assignment (asignación de directiva)",
    "La vinculación de una definición de directiva o una iniciativa a un ámbito, con parámetros y exclusiones."
   ],
   [
    "Initiative (iniciativa)",
    "Un grupo de definiciones de directiva que se asignan y supervisan juntas."
   ],
   [
    "DeployIfNotExists",
    "Un efecto de directiva que implementa un recurso relacionado cuando falta; necesita una identidad administrada y corrección para los recursos existentes."
   ],
   [
    "Remediation task (tarea de corrección)",
    "Un trabajo que aplica los cambios de DeployIfNotExists o Modify a los recursos que ya existían cuando se asignó la directiva."
   ],
   [
    "Machine configuration (configuración de máquina)",
    "La auditoría y configuración de Azure Policy dentro del invitado para la configuración del sistema operativo en VM de Azure y servidores habilitados para Arc."
   ]
  ],
  "example": "El cumplimiento exige Azure Monitor Agent en todos los servidores. El administrador asigna una iniciativa integrada DeployIfNotExists en la suscripción, que instala el agente automáticamente en las VM de Azure y los servidores Arc nuevos, y luego crea una tarea de corrección para arreglar los 120 servidores existentes.",
  "tip": "Audit informa, Deny bloquea, DINE y Modify cambian cosas. Si una pregunta dice que los recursos nuevos cumplen pero los antiguos no, el paso que falta es una tarea de corrección. Cualquier cosa sobre la configuración dentro de Windows necesita configuración de máquina.",
  "check": [
   [
    "¿Qué efecto debes usar para instalar automáticamente una extensión que falta?",
    "DeployIfNotExists."
   ],
   [
    "¿Por qué una asignación DINE necesita una identidad administrada?",
    "La directiva implementa recursos en tu nombre y necesita permisos RBAC para hacerlo."
   ],
   [
    "¿Qué modo de configuración de máquina corrige la desviación cada vez que se detecta?",
    "ApplyAndAutoCorrect."
   ]
  ]
 },
 {
  "t": "Azure Update Manager: assessments, one-time updates, maintenance configurations; hotpatching for Windows Server",
  "tt": "Azure Update Manager: evaluaciones, actualizaciones únicas, configuraciones de mantenimiento; revisión en caliente (hotpatching) para Windows Server",
  "body": [
   "Azure Update Manager es el servicio unificado de Azure para las actualizaciones de Windows y Linux en las VM de Azure y los servidores habilitados para Azure Arc. Reemplazó a la antigua solución Automation Update Management, que dependía del agente de Log Analytics. Update Manager está integrado en Azure, no necesita una cuenta de Automation ni un área de trabajo de Log Analytics, y funciona mediante una extensión de VM que instala cuando es necesario. Ves todas las máquinas en una sola vista, agrupadas por actualizaciones pendientes y cumplimiento.",
   "La evaluación es el primer trabajo. Una evaluación comprueba si a cada máquina le faltan actualizaciones y las informa por clasificación (críticas, de seguridad, paquetes acumulativos, etc.). Puedes ejecutar Check for updates a petición o habilitar la evaluación periódica, que vuelve a comprobar automáticamente aproximadamente cada 24 horas; una directiva integrada de Azure Policy puede activar la evaluación periódica en toda una suscripción para que las máquinas nuevas queden cubiertas.",
   "La instalación de actualizaciones ocurre de dos formas. Una actualización única (Update now o instalación única) te permite elegir máquinas, clasificaciones, números KB incluidos o excluidos, una duración máxima y el comportamiento de reinicio, y ejecutarla de inmediato. Es ideal para una revisión urgente. Para la aplicación rutinaria de revisiones, creas una configuración de mantenimiento: una programación (hora de inicio, periodicidad, zona horaria), una duración de la ventana de mantenimiento, las actualizaciones que se incluirán y la configuración de reinicio. Luego adjuntas máquinas de forma estática o mediante ámbitos dinámicos que eligen máquinas por suscripción, grupo de recursos, ubicación, tipo de sistema operativo o etiquetas. Los eventos previos y posteriores al mantenimiento pueden activar scripts, como sacar un nodo de un equilibrador de carga.",
   "En las VM de Azure, la aplicación programada de revisiones requiere que el modo de orquestación de revisiones de la VM sea Customer Managed Schedules, lo que establece el modo de revisión en AutomaticByPlatform y permite que tu programación tome el control. Si dejas a cargo la configuración automática propia de Windows Update, es posible que tu configuración de mantenimiento no se aplique como esperas.",
   "La revisión en caliente (hotpatching) instala las actualizaciones de seguridad aplicando revisiones al código en la memoria de los procesos en ejecución, de modo que la mayoría de los meses no necesitan reinicio. Funciona en un ciclo: un mes de línea base instala una actualización acumulativa completa y requiere un reinicio, seguido de meses de hotpatch que entregan correcciones de seguridad sin reiniciar. Las líneas base llegan trimestralmente, así que un servidor con hotpatching habilitado normalmente se reinicia unas cuatro veces al año por actualizaciones planificadas, más cualquier línea base no planificada que Microsoft publique para una corrección urgente. El hotpatching está disponible para Windows Server Datacenter: Azure Edition en Azure (incluido Azure Local), y para máquinas locales con Windows Server 2025 conectadas mediante Azure Arc como una opción de suscripción de pago que requiere seguridad basada en virtualización. Administras la configuración de hotpatch y ves qué meses son de línea base en Update Manager.",
   "Al solucionar problemas, revisa el historial de actualizaciones de cada máquina, el estado de la extensión en la hoja Extensions de la máquina y los registros de eventos de Windows para Windows Update. Los servidores habilitados para Arc deben estar conectados y tener acceso saliente para que la extensión funcione."
  ],
  "terms": [
   [
    "Periodic assessment (evaluación periódica)",
    "Comprobación automática y recurrente (aproximadamente cada 24 horas) de las actualizaciones que faltan en una máquina."
   ],
   [
    "One-time update (actualización única)",
    "Una instalación de actualizaciones inmediata y puntual en las máquinas seleccionadas."
   ],
   [
    "Maintenance configuration (configuración de mantenimiento)",
    "Una directiva de actualización programada con ventana, periodicidad, selección de actualizaciones y configuración de reinicio, aplicada a máquinas o ámbitos dinámicos."
   ],
   [
    "Dynamic scope (ámbito dinámico)",
    "Selección de máquinas basada en reglas para una configuración de mantenimiento, usando suscripción, grupo de recursos, ubicación, sistema operativo o etiquetas."
   ],
   [
    "Hotpatching (revisión en caliente)",
    "Aplicar actualizaciones de seguridad en memoria sin reiniciar, entre las actualizaciones acumulativas de línea base trimestrales."
   ]
  ],
  "example": "Un administrador crea una configuración de mantenimiento para el segundo sábado de cada mes, de 01:00 a 04:00, con un ámbito dinámico de etiqueta PatchGroup=Web. Todas las VM de Azure y los servidores Arc con esa etiqueta reciben revisiones en esa ventana, y un nuevo servidor web se incluye automáticamente en cuanto se etiqueta.",
  "tip": "La aplicación programada de revisiones en una VM de Azure no funcionará a menos que la orquestación de revisiones sea Customer Managed Schedules. Las correcciones urgentes puntuales apuntan a la actualización única; las ventanas recurrentes apuntan a una configuración de mantenimiento.",
  "check": [
   [
    "¿Qué debes configurar en una VM de Azure antes de que una configuración de mantenimiento pueda aplicarle revisiones según tu programación?",
    "La orquestación de revisiones en Customer Managed Schedules (modo de revisión AutomaticByPlatform con omisión de programación)."
   ],
   [
    "En un ciclo de hotpatch, ¿qué meses requieren un reinicio?",
    "Los meses de línea base, cuando se instala la actualización acumulativa completa (aproximadamente trimestral), más cualquier línea base no planificada."
   ],
   [
    "¿Cómo pueden incluirse automáticamente las máquinas nuevas en una programación de revisiones?",
    "Usando un ámbito dinámico en la configuración de mantenimiento, por ejemplo basado en etiquetas."
   ]
  ]
 },
 {
  "t": "Azure Automation runbooks and hybrid runbook workers",
  "tt": "Runbooks de Azure Automation y Hybrid Runbook Workers",
  "body": [
   "Azure Automation es un servicio en la nube para ejecutar scripts, llamados runbooks, según una programación o a petición. Todo reside en una cuenta de Automation, que contiene runbooks, programaciones, módulos y recursos compartidos. Los runbooks te permiten automatizar la administración repetitiva: apagar las VM de prueba por la noche, rotar claves, limpiar archivos antiguos o responder a alertas.",
   "Existen varios tipos de runbook. Los runbooks de PowerShell ejecutan scripts estándar de PowerShell y son los más comunes. Los runbooks de Python ejecutan scripts de Python. Los runbooks gráficos se construyen arrastrando actividades a un lienzo. Los runbooks de flujo de trabajo de PowerShell (PowerShell Workflow) son un tipo más antiguo basado en Windows Workflow Foundation y rara vez se eligen para trabajos nuevos. Un runbook tiene una versión de borrador que editas y pruebas, y una versión publicada que ejecutan las programaciones y los webhooks. Publica después de cada cambio o tu corrección no se usará.",
   "Los runbooks se inician de varias formas: manualmente en el portal, desde una programación vinculada al runbook, desde un webhook (una URL HTTPS que inicia el runbook, útil para alertas y sistemas externos; la URL se muestra solo una vez al crearse, así que guárdala de forma segura), desde una alerta de Azure Monitor o desde PowerShell con `Start-AzAutomationRunbook`. Los recursos compartidos mantienen los secretos y la configuración fuera del código: credenciales, variables (opcionalmente cifradas), certificados y conexiones. Para llegar a los recursos de Azure, los runbooks se autentican con la identidad administrada de la cuenta (`Connect-AzAccount -Identity`), que reemplazó a las cuentas Run As retiradas; concede a esa identidad roles RBAC sobre lo que debe administrar.",
   "De forma predeterminada, los runbooks se ejecutan en un espacio aislado (sandbox) de Azure, un entorno hospedado por Microsoft que no puede ver tu red local. Un Hybrid Runbook Worker resuelve eso. Es una máquina Windows o Linux que designas, en el entorno local, en otra nube o en Azure, que extrae trabajos de runbook de Azure Automation mediante HTTPS saliente y los ejecuta localmente. Eso permite que un runbook administre AD, servidores de archivos o cualquier otra cosa accesible desde el worker. Los workers pertenecen a grupos de Hybrid Worker; cuando inicias un runbook eliges Run on: Azure o un grupo de Hybrid Worker específico, y cualquier worker disponible del grupo toma el trabajo, lo que te da resiliencia.",
   "El modelo actual son los Hybrid Workers basados en extensiones, instalados como una extensión de VM en las VM de Azure o en los servidores habilitados para Azure Arc. El modelo anterior basado en agentes dependía del agente de Log Analytics, que está retirado, así que migra al modelo basado en extensiones. Por lo tanto, Arc es la ruta habitual para los workers locales: habilita el servidor para Arc y luego agrégalo a un grupo de Hybrid Worker.",
   "En un worker, los trabajos se ejecutan como Local System de forma predeterminada. Para las tareas que necesitan derechos de dominio, establece credenciales de Hybrid Worker en el grupo a partir de un recurso de credencial, o haz que el propio runbook use un recurso de credencial. Los módulos que necesita un runbook deben estar instalados en la máquina del worker, no solo en la cuenta de Automation."
  ],
  "terms": [
   [
    "Automation account (cuenta de Automation)",
    "El recurso de Azure que contiene runbooks, programaciones, módulos y recursos compartidos."
   ],
   [
    "Runbook",
    "Un script de PowerShell, Python o gráfico ejecutado por Azure Automation; solo la versión publicada se ejecuta en producción."
   ],
   [
    "Webhook",
    "Una URL HTTPS que inicia un runbook específico cuando se llama, mostrada solo una vez al crearse."
   ],
   [
    "Hybrid runbook worker",
    "Una máquina que administras y que ejecuta trabajos de Automation localmente para que los runbooks puedan llegar a los recursos locales."
   ],
   [
    "Hybrid worker group (grupo de Hybrid Worker)",
    "Un conjunto de Hybrid Workers; los trabajos dirigidos al grupo se ejecutan en cualquier miembro disponible."
   ]
  ],
  "example": "Todas las noches, un runbook debe deshabilitar las cuentas de AD inactivas durante 90 días. El sandbox no puede llegar al dominio, así que el administrador habilita para Arc dos servidores miembro, los agrega a un grupo de Hybrid Worker con una credencial que tiene derechos delegados, instala el módulo ActiveDirectory en ambos y programa el runbook para que se ejecute en ese grupo.",
  "tip": "Si un runbook debe tocar recursos locales, la respuesta es un Hybrid Runbook Worker. Si un cambio en un runbook parece ignorado, probablemente nunca se publicó. Para autenticarte en Azure, elige la identidad administrada, no Run As.",
  "check": [
   [
    "¿Por qué un runbook que se ejecuta en Azure no puede llegar a un servidor de archivos local?",
    "Se ejecuta en un sandbox hospedado por Microsoft sin conectividad con tu red; usa un Hybrid Runbook Worker."
   ],
   [
    "¿Cuál es la forma recomendada hoy de implementar un Hybrid Runbook Worker en un servidor local?",
    "Habilitar el servidor para Arc e implementar en él el Hybrid Worker basado en extensiones."
   ],
   [
    "¿Qué identidad debe usar un runbook para administrar recursos de Azure?",
    "La identidad administrada de la cuenta de Automation, con los roles RBAC necesarios concedidos."
   ]
  ]
 },
 {
  "t": "Storage Migration Service: inventory, transfer and cut over of file servers, including identity takeover",
  "tt": "Storage Migration Service: inventario, transferencia y transición de servidores de archivos, incluida la toma de identidad",
  "body": [
   "Los servidores de archivos antiguos están entre las cargas de trabajo más difíciles de retirar: tienen años de datos, permisos de recursos compartidos, grupos locales y, lo peor de todo, un nombre de servidor y una dirección IP de los que dependen los usuarios, los scripts y las unidades asignadas. Storage Migration Service (SMS) es una característica de Windows Server que traslada todo eso a un servidor nuevo de forma guiada y repetible, y puede hacer que el servidor nuevo tome la identidad del antiguo para que los clientes no lo noten.",
   "SMS tiene tres partes. El orquestador es un Windows Server (2019 o posterior) que ejecuta la característica Storage Migration Service; coordina el trabajo y lo manejas desde la herramienta Storage Migration Service de Windows Admin Center o desde PowerShell. El origen es el servidor antiguo, que puede ser una versión mucho más antigua de Windows Server o incluso un servidor Linux o NAS basado en Samba. El destino es el nuevo Windows Server, local o una VM de Azure; instalar Storage Migration Service Proxy en un destino 2019 o posterior acelera las transferencias. La cuenta que uses necesita derechos de administrador en el origen, el destino y el orquestador, y los firewalls deben permitir el tráfico SMB, RPC y WMI (los grupos de reglas File and Printer Sharing, Netlogon y WMI).",
   "Un trabajo de migración se ejecuta en tres fases. El inventario se conecta al origen y registra sus recursos compartidos, la configuración de los recursos compartidos, los archivos y carpetas, la seguridad, los usuarios y grupos locales y la configuración de red. Revisas los resultados en WAC antes de mover nada. La transferencia copia los datos, los recursos compartidos y los permisos a los volúmenes de destino que asignes, y migra los usuarios y grupos locales. Puedes volver a ejecutar una transferencia más tarde para copiar solo los archivos que cambiaron, lo que mantiene corta la interrupción final. Una opción de validación puede comprobar el destino antes de la transferencia.",
   "La transición (cut over) es la fase que hace especial a SMS. Traslada el nombre de equipo y las direcciones IP del origen al destino: el destino se renombra con el nombre del origen, toma la identidad de su cuenta de equipo de AD y su configuración IP, y el origen se renombra con un nombre nuevo aleatorio o elegido y recibe una IP diferente para que ya no haya conflicto. Ambos servidores se reinician durante esta fase. Los clientes, los vínculos DFS y las unidades asignadas que hacen referencia al nombre o la dirección antiguos simplemente empiezan a usar el servidor nuevo. La transición es opcional; puedes detenerte después de la transferencia si prefieres cambiar los clientes tú mismo.",
   "Planifica una ventana de mantenimiento para la transición, confirma que tienes credenciales de administrador local para ambos servidores por si hay problemas de confianza del dominio durante los cambios de nombre, y mantén el servidor antiguo fuera de línea pero intacto hasta que los usuarios confirmen que todo funciona. Los informes en WAC muestran los errores por archivo, normalmente archivos en uso o problemas de ruta, así que revísalos después de cada transferencia.",
   "SMS también puede migrar a Azure: WAC puede crear una VM de Azure como destino durante el trabajo, y puedes combinar SMS con Azure File Sync si luego quieres un servidor de archivos con niveles en la nube. En el examen, SMS es la respuesta cuando el objetivo es reemplazar un servidor de archivos conservando su nombre, sus recursos compartidos y sus permisos."
  ],
  "terms": [
   [
    "Orchestrator (orquestador)",
    "El Windows Server que ejecuta Storage Migration Service y coordina el inventario, la transferencia y la transición."
   ],
   [
    "Inventory (inventario)",
    "La fase de SMS que recopila los recursos compartidos, archivos, seguridad y configuración del servidor de origen."
   ],
   [
    "Transfer (transferencia)",
    "La fase de SMS que copia datos, recursos compartidos, permisos y cuentas locales al destino, repetible para los cambios incrementales."
   ],
   [
    "Cut over (transición)",
    "La fase de SMS que traslada el nombre y las direcciones IP del origen al destino y renombra el origen."
   ],
   [
    "SMS Proxy",
    "Un servicio opcional en el destino que mejora el rendimiento de la transferencia."
   ]
  ],
  "example": "Un servidor de archivos 2012 R2, FS01, debe reemplazarse por una VM con Windows Server 2025. El administrador ejecuta el inventario desde WAC, hace una primera transferencia el lunes y una transferencia incremental el viernes por la noche, y luego ejecuta la transición: la VM nueva se convierte en FS01 con la IP antigua, el servidor antiguo se renombra y las unidades asignadas de los usuarios siguen funcionando el lunes.",
  "tip": "Si un escenario quiere que un servidor de archivos nuevo conserve el nombre y la IP del servidor antiguo con cambios mínimos en los clientes, la respuesta es Storage Migration Service con transición. Recuerda que el orquestador debe ser Windows Server 2019 o posterior.",
  "check": [
   [
    "Nombra las tres fases de un trabajo de Storage Migration Service.",
    "Inventario, transferencia y transición (cut over)."
   ],
   [
    "¿Qué le ocurre al servidor de origen durante la transición?",
    "Se renombra y recibe una dirección IP diferente para que el destino pueda tomar su nombre y su IP originales."
   ],
   [
    "¿Cómo mantienes corto el tiempo de inactividad final cuando los datos cambian constantemente?",
    "Ejecutando una transferencia inicial con antelación y una transferencia incremental final justo antes de la transición."
   ]
  ]
 },
 {
  "t": "Azure Migrate: discovery and assessment, server migration of Hyper-V, VMware and physical servers to Azure",
  "tt": "Azure Migrate: detección y evaluación, migración de servidores Hyper-V, VMware y físicos a Azure",
  "body": [
   "Azure Migrate es un centro en Azure Portal para planificar y ejecutar traslados a Azure. Creas un proyecto de Azure Migrate, que almacena el inventario detectado, las evaluaciones y el estado de la migración. Dentro hay dos herramientas principales: Discovery and assessment (detección y evaluación), que te dice qué tienes y qué haría falta para ejecutarlo en Azure, y Migration and modernization (antes Server Migration), que traslada los servidores.",
   "La detección usa el dispositivo de Azure Migrate (appliance), una VM o un servidor ligero que implementas en el entorno local a partir de una plantilla descargada o un script de instalación. Lo registras en el proyecto y le das credenciales: credenciales de vCenter para VMware, credenciales del host o clúster de Hyper-V para Hyper-V, y credenciales de servidor para servidores físicos u otras nubes. El dispositivo detecta los servidores sin agentes y recopila datos de configuración y rendimiento de forma continua. También puede inventariar el software instalado, las instancias de SQL Server y las aplicaciones web, y ejecutar un análisis de dependencias sin agentes para mostrar qué servidores se comunican con cuáles, de modo que puedas agrupar los servidores que deben moverse juntos. Si no puedes implementar un dispositivo, puedes importar un inventario en CSV para una evaluación aproximada.",
   "Una evaluación analiza un grupo de servidores frente a Azure. En las evaluaciones de VM de Azure, informa la preparación (ready, ready with conditions, not ready, unknown) con motivos como un sistema operativo no compatible o el tamaño del disco, recomienda tamaños de VM y tipos de disco, y estima el costo mensual de proceso y almacenamiento. Eliges los criterios de dimensionamiento: el dimensionamiento basado en el rendimiento usa los datos de utilización recopilados, con un factor de comodidad para tener margen, para ajustar el tamaño de las VM; el dimensionamiento tal como en el entorno local (as on-premises) iguala los núcleos y la memoria asignados actualmente. La configuración de la evaluación incluye la región de destino, las instancias reservadas, Azure Hybrid Benefit y la serie de VM. También hay tipos de evaluación para Azure SQL, Azure App Service y Azure VMware Solution.",
   "La migración funciona de forma distinta según el origen. Para VMware, el método sin agentes usa el mismo dispositivo para replicar los discos de las VM mediante instantáneas de vSphere; también está disponible un método basado en agentes. Para Hyper-V, la migración es sin agentes desde el punto de vista de la VM: instalas el proveedor de Azure Site Recovery y el agente de Recovery Services en los hosts o nodos de clúster de Hyper-V, y ellos replican los discos de las VM a Azure. Para los servidores físicos y las VM en otras nubes, implementas un dispositivo de replicación e instalas el agente Mobility service en cada servidor, que es el método basado en agentes.",
   "El flujo de trabajo de migración es el mismo para todos: habilita la replicación y deja que se ejecuten la replicación inicial y los cambios incrementales; haz una migración de prueba a una red virtual de Azure aislada para confirmar que la VM arranca y que las aplicaciones funcionan; luego migra, lo que apaga el origen (opcionalmente), realiza una sincronización final y crea la VM de Azure; por último, elige Complete migration para detener la replicación y limpiar. Después instalas el agente de VM de Azure si es necesario, ajustas la red y el DNS y retiras el origen.",
   "Azure Migrate en sí está incluido con Azure; pagas por los recursos que creas. Consulta la página de precios actual para detalles como los límites del análisis de dependencias en lugar de memorizar cifras."
  ],
  "terms": [
   [
    "Azure Migrate project (proyecto de Azure Migrate)",
    "El contenedor en Azure que guarda los servidores detectados, las evaluaciones y el estado de la migración."
   ],
   [
    "Azure Migrate appliance (dispositivo de Azure Migrate)",
    "Una VM o un servidor local que detecta servidores sin agentes y recopila datos de rendimiento y dependencias."
   ],
   [
    "Performance-based sizing (dimensionamiento basado en el rendimiento)",
    "Dimensionamiento de la evaluación a partir de la utilización medida en lugar de los recursos asignados."
   ],
   [
    "Mobility service",
    "El agente instalado en servidores físicos o de otras nubes para la replicación basada en agentes."
   ],
   [
    "Test migration (migración de prueba)",
    "Crear una copia de la VM migrada en una red aislada para validarla antes de la transición real."
   ]
  ],
  "example": "Una empresa ejecuta 150 VM de Hyper-V. Implementa el dispositivo de Azure Migrate, recopila datos de rendimiento durante un mes, usa el análisis de dependencias para agrupar una aplicación de tres niveles y crea una evaluación basada en el rendimiento. Luego instala el proveedor de replicación en los hosts de Hyper-V, replica el grupo, hace una migración de prueba a una VNet aislada y realiza la transición durante un fin de semana.",
  "tip": "Los servidores físicos y las VM de otras nubes necesitan el método basado en agentes con Mobility service. Hyper-V usa un proveedor instalado en los hosts, no agentes en los invitados. Haz siempre una migración de prueba antes de la real.",
  "check": [
   [
    "¿Qué opción de dimensionamiento ajusta el tamaño de las VM de Azure usando la utilización real?",
    "El dimensionamiento basado en el rendimiento."
   ],
   [
    "¿Qué debes instalar en los hosts de Hyper-V para migrar sus VM con Azure Migrate?",
    "El proveedor de replicación y el agente de Recovery Services (el proveedor de Azure Site Recovery)."
   ],
   [
    "¿Qué enfoque de migración se usa para los servidores físicos?",
    "La migración basada en agentes, mediante un dispositivo de replicación y Mobility service instalado en cada servidor."
   ]
  ]
 },
 {
  "t": "Upgrading and migrating server roles (in-place upgrade paths, migrating DHCP, print and IIS workloads)",
  "tt": "Actualización y migración de roles de servidor (rutas de actualización en el lugar, migración de cargas de trabajo DHCP, de impresión e IIS)",
  "body": [
   "Cuando una versión de Windows Server se acerca al fin del soporte, o la actualizas en el lugar o migras. Una actualización en el lugar ejecuta el programa de instalación en el servidor existente, conservando su nombre, roles, configuración y datos. Una migración construye un servidor nuevo y traslada a él los roles y los datos. Microsoft generalmente recomienda la migración (una instalación limpia) para las cargas de trabajo importantes, porque evita arrastrar configuración antigua y te da una reversión fácil: el servidor antiguo sigue existiendo.",
   "La actualización en el lugar tiene reglas. Históricamente podías saltar como máximo dos versiones a la vez, y las versiones recientes admiten saltos más largos, así que consulta siempre la matriz oficial de actualización para tu origen y destino. No puedes cambiar la opción de instalación (de Server Core a Desktop Experience o al revés) durante una actualización, y no puedes pasar de Datacenter a Standard. Puedes convertir una edición de evaluación en una edición comercial con licencia con `DISM /Online /Set-Edition`. Antes de actualizar: haz una copia de seguridad, comprueba la compatibilidad de aplicaciones y controladores, elimina los roles no compatibles y recopila la información del sistema. Los controladores de dominio tienen consideraciones adicionales, por eso agregar DC nuevos y degradar los antiguos es la ruta habitual. Las VM de Azure con Windows Server también pueden actualizarse en el lugar usando medios de actualización adjuntos como un disco de datos.",
   "DHCP es fácil de migrar con PowerShell. En el servidor antiguo, `Export-DhcpServer -File C:\\dhcp.xml -Leases` exporta los ámbitos, las opciones, las reservas y las concesiones activas. En el servidor nuevo instala el rol y luego ejecuta `Import-DhcpServer -File C:\\dhcp.xml -BackupPath C:\\dhcpbak -Leases`. Autoriza el servidor nuevo en AD (`Add-DhcpServerInDC`), detén y quita la autorización del antiguo, y actualiza las direcciones de retransmisión DHCP (IP helper) en los enrutadores. Si usas la conmutación por error de DHCP, vuelve a configurar la relación en los servidores nuevos.",
   "Los servidores de impresión se migran con el Printer Migration Wizard en Print Management o con la herramienta de línea de comandos `printbrm`. `printbrm -b -s \\\\OLDPRINT -f C:\\print.printerExport` hace una copia de seguridad de las colas, los puertos, los controladores y la configuración, y `printbrm -r -s \\\\NEWPRINT -f C:\\print.printerExport` los restaura. Los controladores deben ser adecuados para la arquitectura del nuevo sistema operativo (64 bits), y luego vuelves a implementar las impresoras mediante directiva de grupo o cambias el alias DNS.",
   "Las cargas de trabajo web de IIS se trasladan con Web Deploy (`msdeploy`), que puede sincronizar sitios, grupos de aplicaciones, configuración y contenido de un servidor a otro, o empaquetarlos en un archivo. Recuerda exportar e importar los certificados TLS con sus claves privadas, volver a crear las cuentas de servicio (idealmente como gMSA) e instalar los mismos servicios de rol y características de IIS. Para las granjas, la configuración compartida de IIS y un equilibrador de carga te permiten agregar servidores nuevos y retirar los antiguos sin tiempo de inactividad.",
   "Sea cual sea el rol, el patrón es el mismo: inventariar, construir lo nuevo, trasladar la configuración y los datos, probar, cambiar los clientes (DNS, retransmisión DHCP, GPO), mantener el servidor antiguo como reversión y luego retirarlo. Los servidores de archivos usan Storage Migration Service; AD usa DC nuevos más el traslado de los roles FSMO."
  ],
  "terms": [
   [
    "In-place upgrade (actualización en el lugar)",
    "Actualizar el sistema operativo en el servidor existente conservando los roles, la configuración y los datos."
   ],
   [
    "Export-DhcpServer",
    "Cmdlet de PowerShell que exporta la configuración de DHCP y, opcionalmente, las concesiones a un archivo XML."
   ],
   [
    "Add-DhcpServerInDC",
    "Autoriza un servidor DHCP en AD para que pueda entregar concesiones en el dominio."
   ],
   [
    "printbrm",
    "Herramienta de línea de comandos para la copia de seguridad y restauración de impresoras, usada en la migración de servidores de impresión."
   ],
   [
    "Web Deploy",
    "Herramienta de Microsoft (msdeploy) que sincroniza o empaqueta sitios, configuración y contenido de IIS entre servidores."
   ]
  ],
  "example": "Un administrador reemplaza un servidor DHCP antiguo por una VM nueva: Export-DhcpServer con -Leases en el equipo antiguo, Import-DhcpServer en el nuevo, Add-DhcpServerInDC para el servidor nuevo; luego actualiza las direcciones IP helper en los conmutadores principales y quita la autorización del servidor antiguo.",
  "tip": "Un servidor DHCP nuevo que no entrega concesiones en un dominio normalmente no ha sido autorizado en AD. En las actualizaciones en el lugar, ten cuidado con los cambios de edición y los cambios de Server Core a Desktop Experience, que no están permitidos.",
  "check": [
   [
    "¿Qué modificador hace que Export-DhcpServer incluya las concesiones activas?",
    "-Leases."
   ],
   [
    "¿Puede una actualización en el lugar cambiar un servidor de Server Core a Desktop Experience?",
    "No. La opción de instalación no puede cambiar durante la actualización; necesitarías una instalación limpia."
   ],
   [
    "¿Qué herramienta hace copia de seguridad y restaura las colas de impresión, los puertos y los controladores?",
    "printbrm (o el Printer Migration Wizard en Print Management)."
   ]
  ]
 },
 {
  "t": "Hyper-V VM configuration: generation 1 vs 2, dynamic memory, integration services, enhanced session mode, Secure Boot and virtual TPM",
  "tt": "Configuración de máquinas virtuales de Hyper-V: generación 1 frente a 2, memoria dinámica, servicios de integración, modo de sesión mejorada, arranque seguro y TPM virtual",
  "body": [
   "Cuando creas una máquina virtual de Hyper-V, la primera elección, y permanente, es su generación. Las VM de generación 1 emulan un PC tradicional con BIOS: arrancan desde un controlador IDE, pueden usar adaptadores de red heredados para PXE y admiten sistemas operativos invitados de 32 bits. Las VM de generación 2 usan firmware UEFI, arrancan desde discos SCSI, hacen arranque PXE con el adaptador de red sintético estándar y admiten el arranque seguro (Secure Boot) y un TPM virtual. La generación 2 no tiene ningún dispositivo IDE ni heredado. No puedes cambiar la generación de una VM después de crearla, así que elige la generación 2 para cualquier invitado Windows o Linux moderno de 64 bits, y la generación 1 solo para invitados antiguos o de 32 bits, o si debes reutilizar un disco de arranque VHD antiguo.",
   "La memoria dinámica permite a Hyper-V ajustar la RAM de una VM mientras se ejecuta. Estableces la memoria de inicio (la que obtiene la VM al arrancar), la memoria mínima (hasta dónde puede recuperar Hyper-V), la memoria máxima (el límite), un búfer de memoria (el porcentaje de memoria adicional que Hyper-V intenta mantener disponible para la VM) y el peso de memoria (la prioridad cuando el host tiene escasez). El invitado necesita los servicios de integración para cooperar, mediante un controlador de globo de memoria (memory ballooning). La memoria de inicio puede ser mayor que la mínima, porque muchos sistemas operativos necesitan más para arrancar que para estar inactivos. Algunas cargas de trabajo, como ciertos servidores de bases de datos, deben usar memoria estática según las indicaciones del fabricante.",
   "Los servicios de integración son controladores y servicios en el invitado que se comunican con el host a través del VMBus. Incluyen el apagado del sistema operativo (apagado limpio desde el host), la sincronización de hora, el intercambio de datos (pares clave-valor entre host e invitado), el latido (heartbeat), la copia de seguridad (integración con Volume Shadow Copy para copias de seguridad coherentes con las aplicaciones y puntos de control de producción) y la interfaz de servicio de invitado (permite que `Copy-VMFile` envíe archivos al invitado). Los invitados Windows modernos reciben los componentes de integración mediante Windows Update. Habilitas o deshabilitas cada servicio por VM con `Enable-VMIntegrationService`. La sincronización de hora suele deshabilitarse en los DC para que sigan la jerarquía de hora del dominio en lugar del host.",
   "El modo de sesión mejorada (enhanced session mode) hace que Virtual Machine Connection (VMConnect) use una sesión de Protocolo de escritorio remoto a través del VMBus. Obtienes el uso compartido del portapapeles, pantallas redimensionables, audio y redirección de unidades locales, impresoras y dispositivos USB, incluso cuando la VM no tiene conexión de red. Debe estar permitido en la configuración de Hyper-V del host y ser compatible con el invitado.",
   "El arranque seguro, disponible en las VM de generación 2, verifica que el cargador de arranque y los componentes tempranos estén firmados con claves de confianza, lo que bloquea los bootkits. La plantilla importa: Microsoft Windows para invitados Windows, Microsoft UEFI Certificate Authority para la mayoría de las distribuciones de Linux. Una VM Linux que no arranca a menudo tiene la plantilla incorrecta. Un TPM virtual (vTPM) le da al invitado un dispositivo TPM 2.0 para BitLocker, los requisitos de Windows 11, Credential Guard y el arranque medido. Habilitarlo requiere un protector de claves, que en un laboratorio creas localmente.",
   "```powershell\nSet-VMKeyProtector -VMName APP01 -NewLocalKeyProtector\nEnable-VMTPM -VMName APP01\nSet-VMFirmware -VMName LNX01 -SecureBootTemplate MicrosoftUEFICertificateAuthority\n```\nEn producción, las VM blindadas (shielded VMs) protegidas por un Host Guardian Service almacenan las claves de forma centralizada para que las VM solo se ejecuten en hosts aprobados."
  ],
  "terms": [
   [
    "Generation 2 VM (VM de generación 2)",
    "Una VM de Hyper-V basada en UEFI con arranque SCSI, compatibilidad con arranque seguro y vTPM; la generación no se puede cambiar después."
   ],
   [
    "Dynamic memory (memoria dinámica)",
    "Característica de Hyper-V que ajusta la RAM de la VM entre el mínimo y el máximo según la demanda, con configuración de memoria de inicio y búfer."
   ],
   [
    "Integration services (servicios de integración)",
    "Componentes del invitado como apagado, sincronización de hora, latido, intercambio de datos, copia de seguridad y servicios de invitado que se comunican a través del VMBus."
   ],
   [
    "Enhanced session mode (modo de sesión mejorada)",
    "Sesiones de VMConnect sobre RDP a través del VMBus, que agregan portapapeles, unidades y redirección de dispositivos."
   ],
   [
    "Virtual TPM (TPM virtual)",
    "Un dispositivo TPM 2.0 emulado para una VM de generación 2, protegido por un protector de claves."
   ]
  ],
  "example": "Una VM nueva de Ubuntu de generación 2 se detiene en un mensaje de infracción de arranque seguro. El administrador cambia la plantilla de arranque seguro a Microsoft UEFI Certificate Authority con Set-VMFirmware, y la VM arranca con normalidad.",
  "tip": "Invitado de 32 bits o PXE heredado significa generación 1. BitLocker en el invitado, arranque seguro o Windows 11 significa generación 2 con vTPM. La generación no se puede convertir después de la creación.",
  "check": [
   [
    "¿Qué valor de la memoria dinámica controla cuánta RAM tiene una VM al arrancar?",
    "La memoria de inicio (startup memory)."
   ],
   [
    "¿Qué servicio de integración se necesita para Copy-VMFile?",
    "La interfaz de servicio de invitado (guest service interface)."
   ],
   [
    "Una VM Linux de generación 2 falla en el arranque seguro. ¿Cuál es la solución probable?",
    "Cambiar la plantilla de arranque seguro a Microsoft UEFI Certificate Authority (o deshabilitar el arranque seguro si la distribución no está firmada)."
   ]
  ]
 },
 {
  "t": "Nested virtualization requirements; PowerShell Direct",
  "tt": "Requisitos de la virtualización anidada; PowerShell Direct",
  "body": [
   "La virtualización anidada significa ejecutar Hyper-V dentro de una máquina virtual de Hyper-V, de modo que esa VM pueda hospedar sus propias VM. Se usa para laboratorios y capacitación, para probar clústeres de Hyper-V sin hardware adicional, para ejecutar contenedores de Windows con aislamiento de Hyper-V dentro de una VM y para construir entornos en Azure. El rendimiento es menor que en hardware físico, así que en general se usa para desarrollo, pruebas y capacitación, y no para producción exigente.",
   "Los requisitos se dan en ambos niveles. El host físico necesita una CPU con virtualización de hardware y traducción de direcciones de segundo nivel: Intel VT-x con EPT, o AMD-V con RVI en procesadores y versiones de Windows que admitan la virtualización anidada en AMD (la compatibilidad llegó más tarde para AMD que para Intel). El host y la VM que ejecutará Hyper-V deben tener versiones recientes de Windows Server o Windows, y la VM debe usar una versión de configuración reciente. La VM debe estar apagada cuando habilitas la característica.",
   "```powershell\nSet-VMProcessor -VMName HV-NESTED -ExposeVirtualizationExtensions $true\nSet-VMMemory -VMName HV-NESTED -DynamicMemoryEnabled $false -StartupBytes 8GB\nGet-VMNetworkAdapter -VMName HV-NESTED | Set-VMNetworkAdapter -MacAddressSpoofing On\n```",
   "Cada línea resuelve un problema conocido. Exponer las extensiones de virtualización transfiere las características de la CPU a la VM para que Hyper-V pueda instalarse allí. La memoria dinámica no es compatible con una VM que ejecuta Hyper-V anidado, así que dale memoria estática con suficiente RAM para sus propias VM. La red de las VM internas necesita que se habilite la suplantación de direcciones MAC (MAC address spoofing) en el adaptador de la VM externa (para que se permita la salida de las tramas de las VM internas con sus propias direcciones MAC) o un conmutador virtual NAT dentro de la VM externa. Algunas otras características, como los puntos de control o la migración en vivo del host anidado, han estado restringidas en algunas versiones, así que consulta la documentación de tu versión. En Azure, solo los tamaños de VM que admiten la virtualización anidada pueden ejecutar Hyper-V en su interior, y muchos tamaños actuales de uso general y optimizados para memoria lo admiten.",
   "PowerShell Direct es una característica distinta que también usa el canal entre host e invitado. Te permite ejecutar PowerShell dentro de una VM desde su host de Hyper-V a través del VMBus, sin conectividad de red, configuración de administración remota ni reglas de firewall en el invitado. Eso es invaluable cuando la red de una VM está mal configurada, está en un conmutador aislado o privado, o estás automatizando la primera configuración de una VM recién implementada.",
   "Usas los conocidos cmdlets de comunicación remota, pero apuntas a la VM en lugar de a un equipo: `Enter-PSSession -VMName DC01`, `Invoke-Command -VMName DC01 -ScriptBlock { ... }`, o `-VMId` con el GUID de la VM. También puedes crear una sesión con `New-PSSession -VMName` y copiar archivos con `Copy-Item -ToSession`. Requisitos: debes ejecutar el comando en el host de Hyper-V que ejecuta la VM, como administrador de Hyper-V; la VM debe estar en ejecución y el sistema operativo invitado debe ser Windows 10 o Windows Server 2016 o posterior; y debes proporcionar credenciales válidas dentro del invitado, porque PowerShell Direct no transfiere las credenciales del host a la VM."
  ],
  "terms": [
   [
    "Nested virtualization (virtualización anidada)",
    "Ejecutar Hyper-V dentro de una VM para que esa VM pueda hospedar sus propias VM."
   ],
   [
    "ExposeVirtualizationExtensions",
    "Parámetro de Set-VMProcessor que transfiere las características de virtualización de hardware a una VM."
   ],
   [
    "MAC address spoofing (suplantación de direcciones MAC)",
    "Permitir que el adaptador de una VM envíe tramas con direcciones MAC distintas de la suya, necesario para la red de las VM internas."
   ],
   [
    "PowerShell Direct",
    "Ejecutar PowerShell en una VM desde su host de Hyper-V a través del VMBus sin necesidad de red."
   ],
   [
    "VMBus",
    "El canal de alta velocidad entre un host de Hyper-V y sus invitados, usado por los servicios de integración y PowerShell Direct."
   ]
  ],
  "example": "Una instructora construye un laboratorio de clúster de conmutación por error de dos nodos en una sola computadora portátil. Crea dos VM, las apaga, expone las extensiones de virtualización, da a cada una 8 GB de memoria estática, habilita la suplantación de MAC, instala Hyper-V dentro de ambas y las configura con Invoke-Command -VMName incluso antes de configurar su red.",
  "tip": "Hyper-V anidado no se instala dentro de una VM cuando ExposeVirtualizationExtensions no está configurado (y la VM debe estar apagada para configurarlo). Las VM internas sin red normalmente indican que falta la suplantación de direcciones MAC. PowerShell Direct necesita credenciales del invitado y debe ejecutarse en el mismo host.",
  "check": [
   [
    "¿Qué debe cumplirse en la VM antes de ejecutar Set-VMProcessor -ExposeVirtualizationExtensions $true?",
    "Debe estar apagada."
   ],
   [
    "¿Por qué habilitar la suplantación de direcciones MAC en una VM que hospeda VM anidadas?",
    "Para que las tramas de red de las VM internas, que usan sus propias direcciones MAC, puedan pasar por el adaptador de la VM externa."
   ],
   [
    "¿Puedes usar PowerShell Direct desde tu estación de trabajo de administración hacia una VM en un host remoto?",
    "No. Solo funciona desde el host de Hyper-V que ejecuta la VM (aunque podrías conectarte primero al host de forma remota)."
   ]
  ]
 },
 {
  "t": "Virtual disks: VHD vs VHDX, fixed, dynamic and differencing disks; shared VHDX / VHD Set",
  "tt": "Discos virtuales: VHD frente a VHDX, discos fijos, dinámicos y diferenciales; VHDX compartido / VHD Set",
  "body": [
   "Un disco duro virtual de Hyper-V es un archivo en el host que la VM ve como un disco físico. Hay dos formatos. VHD es el formato original, limitado a unos 2 TB (2040 GB) y a sectores de 512 bytes; sobrevive principalmente por compatibilidad con sistemas más antiguos y algunas herramientas. VHDX, introducido con Windows Server 2012, admite discos de hasta 64 TB, sectores lógicos de 4 KB que coinciden con los discos físicos modernos, un registro interno de metadatos que protege contra la corrupción después de un corte de energía, y TRIM/UNMAP para que el espacio liberado pueda devolverse al almacenamiento. Las VM de generación 2 solo arrancan desde VHDX. Usa VHDX a menos que tengas una razón específica para no hacerlo.",
   "Cada disco también tiene un tipo. Un disco de tamaño fijo asigna todo su espacio por adelantado: un disco fijo de 100 GB es de inmediato un archivo de 100 GB. Ofrece un rendimiento predecible y no puede dejar al host sin espacio más adelante, por eso a menudo se prefiere para bases de datos de producción. Un disco de expansión dinámica empieza pequeño y crece a medida que se escriben datos, hasta su tamaño máximo. Ahorra espacio, y con VHDX su rendimiento es cercano al fijo, pero debes supervisar el volumen del host, porque los discos dinámicos sobreasignados pueden llenarlo y pausar las VM.",
   "Un disco diferencial es un disco secundario que registra solo los cambios respecto a un disco primario de solo lectura. Muchas VM pueden compartir un primario (por ejemplo, una imagen base preparada con Sysprep), cada una con su propio secundario pequeño. Reglas: nunca modifiques el primario, o todos los secundarios se rompen; mantén accesibles el primario y el secundario; y ten en cuenta que una cadena larga ralentiza la E/S. Puedes combinar un secundario con su primario usando `Merge-VHD` cuando ya no necesites la separación. Los puntos de control usan el mismo mecanismo con archivos AVHDX.",
   "Cmdlets útiles: `New-VHD -Path D:\\VMs\\data.vhdx -SizeBytes 200GB -Dynamic` (o `-Fixed`, o `-ParentPath` para un disco diferencial), `Convert-VHD` para cambiar el formato o el tipo (la VM debe estar apagada para ese disco), `Resize-VHD` para ampliar o reducir (un VHDX conectado a un controlador SCSI puede cambiar de tamaño mientras la VM se ejecuta), `Optimize-VHD` para compactar un disco dinámico y `Mount-VHD` para conectar un disco al host para el mantenimiento sin conexión.",
   "La agrupación en clústeres de invitados, en la que dos o más VM forman un clúster de conmutación por error, necesita un disco que todos los nodos puedan usar a la vez. El VHDX compartido, introducido en Windows Server 2012 R2, permitía conectar un VHDX a varias VM. Tenía limitaciones: sin cambio de tamaño en línea, sin copia de seguridad a nivel de host y sin Hyper-V Replica. Windows Server 2016 introdujo el VHD Set (un archivo `.vhds` más un archivo de respaldo `.avhdx`) como su reemplazo. Los VHD Set admiten el cambio de tamaño en línea, la copia de seguridad basada en el host y Hyper-V Replica, y son la opción para los clústeres de invitados nuevos. Guárdalos en Cluster Shared Volumes o en un recurso compartido SMB de Scale-Out File Server, conéctalos al controlador SCSI de cada VM y habilita las reservas persistentes. Puedes convertir un VHDX compartido existente en un VHD Set con `Convert-VHD` mientras las VM están apagadas."
  ],
  "terms": [
   [
    "VHDX",
    "Formato de disco de Hyper-V que admite hasta 64 TB, sectores de 4 KB, metadatos resistentes a la corrupción y TRIM."
   ],
   [
    "Fixed-size disk (disco de tamaño fijo)",
    "Un disco virtual que asigna su tamaño completo al crearse para un rendimiento predecible."
   ],
   [
    "Dynamically expanding disk (disco de expansión dinámica)",
    "Un disco virtual que crece a medida que se escriben datos, hasta su máximo configurado."
   ],
   [
    "Differencing disk (disco diferencial)",
    "Un disco secundario que almacena solo los cambios respecto a un primario de solo lectura."
   ],
   [
    "VHD Set",
    "Un formato de disco compartido .vhds para clústeres de invitados que admite cambio de tamaño en línea, copia de seguridad del host e Hyper-V Replica."
   ]
  ],
  "example": "Un laboratorio de capacitación necesita 20 VM idénticas con Windows Server en un almacenamiento limitado. El administrador generaliza una VM con Sysprep, marca su VHDX como de solo lectura para usarlo como primario y crea 20 discos diferenciales pequeños a partir de él, ahorrando cientos de gigabytes. Para un clúster de invitados SQL independiente de dos nodos, usa un VHD Set en un CSV.",
  "tip": "El almacenamiento compartido de un clúster de invitados que debe admitir cambio de tamaño en línea, copia de seguridad del host o réplica es un VHD Set, no un VHDX compartido. Los discos de más de 2 TB o de arranque de generación 2 deben ser VHDX.",
  "check": [
   [
    "¿Cuál es el tamaño máximo de un disco VHDX?",
    "64 TB (VHD está limitado a unos 2 TB)."
   ],
   [
    "¿Qué les pasa a los discos diferenciales secundarios si se modifica su disco primario?",
    "Dejan de ser válidos, porque cada secundario registra los cambios respecto al estado original exacto del primario."
   ],
   [
    "¿Qué opción de disco compartido debes usar para un clúster de invitados nuevo en Windows Server 2016 o posterior?",
    "Un VHD Set (.vhds)."
   ]
  ]
 },
 {
  "t": "Checkpoints: production vs standard; why checkpoints are not backups",
  "tt": "Puntos de control: de producción frente a estándar; por qué los puntos de control no son copias de seguridad",
  "body": [
   "Un punto de control (checkpoint) de Hyper-V (llamado instantánea en versiones anteriores) captura el estado de una VM en un momento dado para que puedas volver a él más tarde. Es perfecto como red de seguridad a corto plazo: antes de instalar una actualización, al probar un cambio de configuración o durante un ejercicio de laboratorio. Cuando tomas un punto de control, Hyper-V deja de escribir en el disco virtual actual y crea un disco diferencial (un archivo `.avhdx`) para todas las escrituras nuevas; el disco original se convierte en un primario de solo lectura.",
   "Hay dos tipos. Un punto de control estándar captura el disco y el estado completo de la memoria y de los dispositivos de una VM en ejecución, como si la pausaras y la guardaras. Aplicarlo devuelve la VM exactamente adonde estaba, incluso con aplicaciones abiertas. La desventaja es que las aplicaciones internas, como bases de datos o controladores de dominio, no se enteraron de que ocurrió un punto de control, así que volver a uno puede confundir la replicación o las transacciones. Un punto de control de producción usa el Servicio de instantáneas de volumen (VSS) dentro de los invitados Windows, o una congelación del sistema de archivos en los invitados Linux, para crear un punto en el tiempo coherente con las aplicaciones. No incluye la memoria, así que aplicarlo inicia la VM desde un arranque limpio, como si se restaurara desde una copia de seguridad. Los puntos de control de producción necesitan el servicio de integración de copia de seguridad.",
   "El de producción es el predeterminado para las VM nuevas, con recurso al estándar si no se puede tomar un punto de control de producción. Cambias el comportamiento por VM en su configuración o con `Set-VM -CheckpointType Production`, `ProductionOnly` (fallar en lugar de recurrir al estándar), `Standard` o `Disabled`. Administras los puntos de control con `Checkpoint-VM -Name APP01 -SnapshotName BeforePatch`, `Restore-VMCheckpoint` y `Remove-VMCheckpoint`. Cuando eliminas un punto de control, Hyper-V combina sus cambios AVHDX con el primario en segundo plano. Nunca elimines archivos AVHDX manualmente en el Explorador de archivos; eso rompe la cadena y puede provocar pérdida de datos.",
   "Los puntos de control no son copias de seguridad, y las preguntas del examen suelen evaluar por qué. Residen en el mismo almacenamiento que la VM, así que un volumen dañado o un ransomware en el host destruye ambos. Dependen de la cadena de discos primarios; si el VHDX base se pierde o se corrompe, todos los puntos de control son inútiles. No se pueden trasladar fuera del host ni conservar según una programación de retención. Y perjudican el rendimiento y consumen espacio a medida que crece la cadena, así que están pensados para ser temporales, medidos en horas o días, no en meses.",
   "Las copias de seguridad reales copian los datos a un almacenamiento separado, idealmente fuera del sitio, con retención y restauraciones verificadas: Windows Server Backup, Azure Backup, el agente Microsoft Azure Recovery Services (MARS), Azure Backup Server o productos de terceros. Esos productos a menudo usan internamente puntos de control de producción para obtener un punto en el tiempo coherente, luego copian los datos a otro lugar y eliminan el punto de control.",
   "Los controladores de dominio merecen una nota. Desde Windows Server 2012, los DC compatibles con la virtualización usan el VM-GenerationID para detectar que han sido revertidos y protegerse contra la reversión del número de secuencia de actualización (USN rollback). Aun así, no se recomienda revertir DC con puntos de control; usa copias de seguridad adecuadas de AD."
  ],
  "terms": [
   [
    "Standard checkpoint (punto de control estándar)",
    "Captura el disco más el estado de la memoria y los dispositivos; restaura la VM exactamente como estaba, pero no es coherente con las aplicaciones."
   ],
   [
    "Production checkpoint (punto de control de producción)",
    "Usa VSS o una congelación del sistema de archivos para obtener un punto en el tiempo coherente con las aplicaciones, sin memoria; restaura a un arranque en frío."
   ],
   [
    "AVHDX",
    "El archivo de disco diferencial creado para cada punto de control para guardar las escrituras nuevas."
   ],
   [
    "Checkpoint merge (combinación de puntos de control)",
    "Proceso en segundo plano que integra los cambios AVHDX en el primario cuando se elimina un punto de control."
   ],
   [
    "VM-GenerationID",
    "Un valor que permite a un DC virtualizado detectar que ha sido revertido y proteger la replicación de AD."
   ]
  ],
  "example": "Antes de una actualización arriesgada de una aplicación, una administradora toma un punto de control de producción de APP01. La actualización falla, así que aplica el punto de control y la VM arranca limpiamente con una base de datos coherente. Después de una semana de estabilidad, elimina el punto de control para que el AVHDX se combine de nuevo, y confía en Azure Backup cada noche para una protección real.",
  "tip": "Si la pregunta necesita un punto de restauración coherente con las aplicaciones, elige un punto de control de producción. Si pregunta cómo protegerse contra la falla del almacenamiento del host o conservar 30 días de historial, la respuesta es una copia de seguridad, nunca un punto de control.",
  "check": [
   [
    "¿Qué tipo de punto de control incluye el estado de la memoria de la VM?",
    "El punto de control estándar."
   ],
   [
    "¿Por qué no debes eliminar archivos AVHDX manualmente?",
    "Forman parte de una cadena diferencial; eliminar uno sin combinarlo rompe la cadena y puede provocar pérdida de datos."
   ],
   [
    "Da dos razones por las que los puntos de control no son copias de seguridad.",
    "Residen en el mismo almacenamiento que la VM y dependen de la cadena de discos primarios, así que una falla del almacenamiento destruye ambos; además, carecen de retención y de copias fuera del host y degradan el rendimiento con el tiempo."
   ]
  ]
 },
 {
  "t": "Hyper-V virtual switches (external, internal, private) and Switch Embedded Teaming",
  "tt": "Conmutadores virtuales de Hyper-V (externo, interno, privado) y Switch Embedded Teaming",
  "body": [
   "Un conmutador virtual de Hyper-V es un conmutador de capa 2 por software dentro del host que conecta los adaptadores de red virtuales de las VM entre sí y, opcionalmente, con el mundo exterior. Creas conmutadores en el Virtual Switch Manager de Hyper-V Manager o con `New-VMSwitch`. Hay tres tipos, y elegir el correcto es una pregunta común del examen.",
   "Un conmutador externo está vinculado a un adaptador de red físico, por lo que las VM pueden llegar a la red física y más allá. Cuando lo creas, la opción Allow management operating system to share this network adapter crea una NIC virtual del host en el conmutador, de modo que el host conserva el acceso a la red a través del mismo puerto físico. Si desactivas esa opción, la NIC física queda dedicada al tráfico de las VM. Un conmutador interno conecta las VM entre sí y con el host, pero no con la red física. Es útil para la comunicación entre host y VM y, combinado con `New-NetNat`, para dar a las VM NAT saliente a través del host. Un conmutador privado conecta las VM solo entre sí; ni siquiera el host puede comunicarse en él. Es adecuado para laboratorios aislados y redes de prueba, como un segmento de análisis de malware o una red aislada de conmutación por error de prueba.",
   "Los adaptadores de red de las VM también tienen configuraciones: ID de VLAN (`Set-VMNetworkAdapterVlan -VMName APP01 -Access -VlanId 20`), administración del ancho de banda, protección DHCP (DHCP guard) y protección de enrutador (router guard) (que descartan mensajes DHCP o anuncios de enrutador no autorizados provenientes de una VM), suplantación de direcciones MAC, creación de reflejo del puerto y, en las VM de generación 2, arranque PXE con el adaptador estándar.",
   "Los hosts necesitan redundancia y ancho de banda, que tradicionalmente provenían de la formación de equipos de NIC (LBFO, equilibrio de carga y conmutación por error) configurada en Windows, con un conmutador virtual construido sobre el equipo. Switch Embedded Teaming (SET), introducido en Windows Server 2016, integra en cambio la formación de equipos directamente en el conmutador virtual de Hyper-V. SET es el enfoque recomendado para los hosts de Hyper-V y es obligatorio para las características de redes definidas por software y para los diseños convergentes que usan RDMA (acceso directo a memoria remota) para el tráfico de almacenamiento y de migración en vivo. Construir un conmutador virtual nuevo sobre un equipo LBFO está en desuso y bloqueado de forma predeterminada en las versiones recientes de Windows Server, así que usa SET.",
   "SET tiene reglas específicas. Admite hasta ocho adaptadores físicos, y deben ser idénticos: mismo fabricante, modelo, firmware y controlador. Funciona solo en modo independiente del conmutador, por lo que los conmutadores físicos no necesitan ninguna configuración especial como LACP. Ofrece dos modos de equilibrio de carga: Hyper-V Port (el tráfico de cada VM se vincula a un miembro del equipo) y Dynamic (el tráfico saliente se equilibra por flujos).",
   "```powershell\nNew-VMSwitch -Name SETswitch -NetAdapterName 'NIC1','NIC2' -EnableEmbeddedTeaming $true -AllowManagementOS $true\nSet-VMSwitchTeam -Name SETswitch -LoadBalancingAlgorithm HyperVPort\nAdd-VMNetworkAdapter -ManagementOS -Name LiveMigration -SwitchName SETswitch\n```\nLa última línea agrega una NIC virtual del host para el tráfico de migración en vivo en el mismo equipo convergente."
  ],
  "terms": [
   [
    "External switch (conmutador externo)",
    "Un conmutador virtual vinculado a una NIC física para que las VM puedan llegar a la red física."
   ],
   [
    "Internal switch (conmutador interno)",
    "Un conmutador virtual que conecta las VM y el host, sin acceso a la red física."
   ],
   [
    "Private switch (conmutador privado)",
    "Un conmutador virtual que conecta solo las VM entre sí; el host queda excluido."
   ],
   [
    "Switch Embedded Teaming",
    "Formación de equipos de NIC integrada en el conmutador virtual de Hyper-V, hasta ocho adaptadores idénticos, independiente del conmutador."
   ],
   [
    "DHCP guard (protección DHCP)",
    "Una configuración del adaptador de la VM que bloquea los mensajes de servidor DHCP de VM no autorizadas."
   ]
  ],
  "example": "Un laboratorio necesita tres VM que puedan comunicarse entre sí, pero que nunca deben llegar al host ni a la red corporativa. El administrador crea un conmutador privado y conecta las tres a él. Más adelante, para hosts de producción con dos NIC RDMA de 25 GbE, el equipo construye un conmutador SET con vNIC del host para administración, almacenamiento y migración en vivo.",
  "tip": "Acceso al host pero sin red física significa interno; solo VM significa privado. Para la formación de equipos en los hosts de Hyper-V modernos, elige SET, que usa el modo independiente del conmutador y necesita NIC idénticas, no LBFO.",
  "check": [
   [
    "¿Qué tipo de conmutador virtual permite que las VM se comuniquen con el host, pero no con la red física?",
    "El interno."
   ],
   [
    "¿Qué modo de formación de equipos admite SET?",
    "Solo independiente del conmutador; sin LACP ni formación de equipos estática."
   ],
   [
    "¿Cuál es el número máximo de adaptadores físicos en un equipo SET?",
    "Ocho, y deben ser idénticos."
   ]
  ]
 },
 {
  "t": "Live migration and storage migration between Hyper-V hosts; Kerberos vs CredSSP authentication",
  "tt": "Migración en vivo y migración de almacenamiento entre hosts de Hyper-V; autenticación Kerberos frente a CredSSP",
  "body": [
   "La migración en vivo (live migration) traslada una VM en ejecución de un host de Hyper-V a otro sin tiempo de inactividad perceptible. Hyper-V copia la memoria de la VM al destino mientras la VM sigue ejecutándose, envía repetidamente las páginas que cambiaron, luego pausa brevemente la VM para transferir el estado final y la reanuda en el destino. Normalmente, los usuarios pierden como máximo uno o dos paquetes. Es la forma de aplicar revisiones o reemplazar hosts sin interrupciones.",
   "Hay tres formas. La migración en vivo dentro de un clúster de conmutación por error traslada la memoria y el estado de la VM mientras sus discos permanecen en el almacenamiento compartido, como un Cluster Shared Volume; la inicias en Failover Cluster Manager o con `Move-ClusterVirtualMachineRole`. La migración en vivo sin recursos compartidos (shared-nothing) traslada una VM en ejecución entre hosts independientes, o entre clústeres, incluido su almacenamiento, a través de la red, sin necesidad de almacenamiento compartido; usas `Move-VM -DestinationStoragePath`. La migración de almacenamiento traslada solo los discos virtuales y los archivos de configuración de una VM en ejecución a otra ubicación, como un volumen nuevo o un recurso compartido SMB, sin cambiar de host: `Move-VMStorage -VMName APP01 -DestinationStoragePath E:\\VMs\\APP01`.",
   "Para la migración en vivo sin clúster, ambos hosts deben tener la migración en vivo habilitada (`Enable-VMMigration`), estar en el mismo dominio o en dominios de confianza, usar el mismo fabricante de procesador (Intel a Intel, AMD a AMD) y tener redes configuradas para el tráfico de migración. Si las generaciones de procesador difieren, habilita el modo de compatibilidad de procesador en la VM mientras está apagada. Puedes elegir opciones de rendimiento: TCP/IP, Compression (la predeterminada, que usa CPU sobrante para reducir los datos) o SMB, que puede usar SMB Direct (RDMA) y SMB Multichannel para las transferencias más rápidas en redes compatibles. También estableces cuántas migraciones simultáneas permite un host.",
   "La autenticación es el núcleo de este tema. Con CredSSP (Credential Security Support Provider), la opción predeterminada, no se necesita configuración adicional, pero debes haber iniciado sesión localmente, o mediante Escritorio remoto, en el host de origen cuando inicias la migración, porque tus credenciales se delegan desde esa sesión. Iniciar una migración desde Hyper-V Manager en tu estación de trabajo fallará. Con Kerberos, puedes iniciar migraciones de forma remota desde cualquier equipo de administración, pero primero debes configurar la delegación restringida en la cuenta de equipo de cada host en AD, permitiéndole presentar credenciales delegadas a los otros hosts para dos servicios: `cifs` (para el almacenamiento) y `Microsoft Virtual System Migration Service`.",
   "```powershell\nSet-VMHost -VirtualMachineMigrationAuthenticationType Kerberos `\n  -VirtualMachineMigrationPerformanceOption SMB\n```\nEn Active Directory Users and Computers, en la pestaña Delegation de HV01, elige Trust this computer for delegation to specified services only y agrega las entradas cifs y Microsoft Virtual System Migration Service de HV02; luego haz lo mismo en sentido inverso.",
   "Dentro de un clúster de conmutación por error, el servicio de clúster se encarga de la autenticación para la migración en vivo en clúster, así que esta cuestión de delegación se aplica principalmente a los hosts independientes y a las migraciones sin recursos compartidos."
  ],
  "terms": [
   [
    "Live migration (migración en vivo)",
    "Trasladar una VM en ejecución entre hosts de Hyper-V sin tiempo de inactividad perceptible."
   ],
   [
    "Shared-nothing live migration (migración en vivo sin recursos compartidos)",
    "Migración en vivo de una VM y su almacenamiento entre hosts sin almacenamiento compartido."
   ],
   [
    "Storage migration (migración de almacenamiento)",
    "Trasladar los discos y archivos de una VM en ejecución a un almacenamiento nuevo en el mismo host."
   ],
   [
    "CredSSP",
    "Autenticación predeterminada de la migración en vivo; requiere iniciar sesión en el host de origen para iniciar el traslado."
   ],
   [
    "Kerberos constrained delegation (delegación restringida de Kerberos)",
    "Configuración de AD que permite a los hosts delegar para cifs y Microsoft Virtual System Migration Service, lo que permite iniciar migraciones de forma remota."
   ]
  ],
  "example": "Un administrador intenta migrar en vivo una VM de HV01 a HV02 usando Hyper-V Manager en su computadora portátil y obtiene un error de autenticación. Los hosts usan CredSSP. Configura la delegación restringida para cifs y Microsoft Virtual System Migration Service entre los hosts, cambia ambos a Kerberos, y ahora las migraciones remotas funcionan.",
  "tip": "La migración falla cuando se inicia desde una consola remota: se está usando CredSSP; inicia sesión en el host de origen o cambia a Kerberos con delegación restringida. Mover solo los discos en el mismo host es migración de almacenamiento.",
  "check": [
   [
    "¿Qué dos servicios deben agregarse a la delegación restringida para la migración en vivo con Kerberos?",
    "cifs y Microsoft Virtual System Migration Service."
   ],
   [
    "¿Qué limitación impone la autenticación CredSSP?",
    "Debes iniciar la migración mientras tienes una sesión iniciada en el host de origen."
   ],
   [
    "¿Cómo trasladas los archivos VHDX de una VM en ejecución a un volumen nuevo sin mover la VM a otro host?",
    "Usando la migración de almacenamiento, por ejemplo Move-VMStorage."
   ]
  ]
 },
 {
  "t": "Hyper-V Replica: primary and replica servers, replication frequency, recovery points, planned and unplanned failover, test failover",
  "tt": "Hyper-V Replica: servidores principal y de réplica, frecuencia de replicación, puntos de recuperación, conmutación por error planificada, no planificada y de prueba",
  "body": [
   "Hyper-V Replica es una característica integrada de recuperación ante desastres que copia de forma asincrónica una VM de un host de Hyper-V (el servidor principal) a otro (el servidor de réplica), a menudo en un sitio diferente. La VM de réplica permanece apagada y recibe los cambios; si el sitio principal falla, la inicias. No se requiere almacenamiento compartido, hardware especial ni un clúster, y los hosts pueden estar en dominios diferentes cuando usas autenticación con certificados.",
   "La configuración tiene dos lados. En el servidor de réplica, abre Hyper-V Settings, Replication Configuration, y habilítalo como servidor de réplica. Elige la autenticación: Kerberos sobre HTTP (puerto 80, datos sin cifrar en tránsito, hosts unidos al dominio) o basada en certificados sobre HTTPS (puerto 443, cifrada, funciona entre dominios sin confianza o grupos de trabajo). Luego elige aceptar la replicación de cualquier servidor autenticado o solo de los servidores indicados con sus ubicaciones de almacenamiento, y habilita la regla de firewall de entrada correspondiente, que no se habilita automáticamente. Si la réplica es un clúster de conmutación por error, configuras el rol de clúster Hyper-V Replica Broker en lugar de un solo host. En el principal, haz clic con el botón derecho en la VM y elige Enable Replication, o usa `Enable-VMReplication`.",
   "La frecuencia de replicación es la frecuencia con que se envían los cambios: 30 segundos, 5 minutos o 15 minutos. Una frecuencia más corta significa menos pérdida de datos posible, pero más ancho de banda y la necesidad de un mejor enlace. La replicación inicial puede ir por la red de inmediato o según una programación, exportarse a medios externos y enviarse, o usar una VM existente restaurada en el sitio de réplica. Puedes excluir discos, como un disco de archivo de paginación, para ahorrar ancho de banda.",
   "Los puntos de recuperación determinan a qué puedes conmutar por error. De forma predeterminada, solo se conserva el punto de recuperación más reciente. Puedes conservar puntos de recuperación adicionales cada hora (hasta 24 horas de historial) y, opcionalmente, hacer que algunos sean coherentes con las aplicaciones usando instantáneas VSS en un intervalo que establezcas. La replicación extendida permite que el servidor de réplica replique a su vez a un tercer sitio.",
   "La conmutación por error se presenta en tres tipos, y las diferencias se evalúan en el examen. Una conmutación por error de prueba se ejecuta en el servidor de réplica: crea una copia temporal de la VM de réplica (con Test agregado al nombre) conectada a una red que elijas, idealmente aislada, sin interrumpir la replicación. Detienes la prueba al terminar y la copia se elimina. Una conmutación por error planificada comienza en el principal cuando tienes aviso previo, como una interrupción programada del centro de datos: apagas la VM principal, ejecutas Planned Failover, se envían los cambios restantes para que no se pierdan datos, la réplica se inicia y la replicación puede invertirse. Una conmutación por error no planificada se ejecuta en el servidor de réplica después de perder el principal: eliges un punto de recuperación, aceptas la posible pérdida de datos hasta el último cambio replicado e inicias la VM. Más tarde usas Reverse Replication para proteger la VM de vuelta hacia el sitio original una vez reparado.",
   "Supervisa el estado con Replication, View Replication Health en Hyper-V Manager o con `Measure-VMReplication`, que muestra el estado, la hora de la última replicación y el tamaño pendiente."
  ],
  "terms": [
   [
    "Replica server (servidor de réplica)",
    "El host de Hyper-V que recibe los cambios replicados de la VM y puede ejecutar la VM después de la conmutación por error."
   ],
   [
    "Replication frequency (frecuencia de replicación)",
    "Con qué frecuencia se envían los cambios: cada 30 segundos, 5 minutos o 15 minutos."
   ],
   [
    "Recovery point (punto de recuperación)",
    "Un punto en el tiempo guardado en la réplica al que puedes conmutar por error; se pueden conservar puntos adicionales cada hora."
   ],
   [
    "Planned failover (conmutación por error planificada)",
    "Conmutación por error iniciada desde el principal con la VM apagada, que envía todos los cambios para que no se pierdan datos."
   ],
   [
    "Hyper-V Replica Broker",
    "Rol de clúster de conmutación por error que permite que un clúster actúe como servidor de réplica."
   ]
  ],
  "example": "Una sucursal replica la VM de su servidor de archivos a la sede central cada 5 minutos con autenticación de certificados. Cada trimestre, la administradora ejecuta una conmutación por error de prueba en la sede central en un conmutador aislado para demostrar que la VM arranca. Cuando la energía de la sucursal falla durante días, realiza una conmutación por error no planificada al punto de recuperación más reciente.",
  "tip": "La conmutación por error de prueba nunca interrumpe la replicación. La planificada comienza en el principal y no pierde datos; la no planificada comienza en la réplica y puede perder datos. Los hosts en distintos dominios o en grupos de trabajo necesitan autenticación basada en certificados.",
  "check": [
   [
    "¿Qué método de autenticación debes usar si los hosts principal y de réplica están en dominios sin confianza?",
    "La autenticación basada en certificados sobre HTTPS."
   ],
   [
    "¿Dónde inicias una conmutación por error planificada y qué debes hacer primero?",
    "En el servidor principal, después de apagar la VM principal."
   ],
   [
    "¿Cuáles son las tres opciones de frecuencia de replicación?",
    "30 segundos, 5 minutos y 15 minutos."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery for Hyper-V and Azure VMs: recovery plans, test failover, RPO and failback",
  "tt": "Azure Site Recovery para Hyper-V y máquinas virtuales de Azure: planes de recuperación, conmutación por error de prueba, RPO y conmutación por recuperación",
  "body": [
   "Azure Site Recovery (ASR) es la recuperación ante desastres como servicio de Azure. Replica continuamente máquinas a una ubicación secundaria y orquesta la conmutación por error cuando ocurre un desastre. Para este examen importan dos escenarios: VM de Hyper-V locales que se replican a Azure, y VM de Azure que se replican de una región de Azure a otra. Todo se administra desde un almacén de Recovery Services (Recovery Services vault), que también hospeda Azure Backup.",
   "Dos términos enmarcan todo diseño de recuperación ante desastres. El objetivo de punto de recuperación (RPO) es la pérdida máxima de datos aceptable, medida en tiempo: un RPO de 15 minutos significa que puedes perder como máximo los últimos 15 minutos de cambios. El objetivo de tiempo de recuperación (RTO) es el tiempo de inactividad máximo aceptable hasta que se restablece el servicio. La frecuencia de replicación determina el RPO; la automatización, como los planes de recuperación, determina el RTO.",
   "Para Hyper-V a Azure, creas un almacén, defines un sitio de Hyper-V (o usas nubes de System Center Virtual Machine Manager si VMM administra los hosts) e instalas Azure Site Recovery Provider y el agente Microsoft Azure Recovery Services en cada host. Se conectan de forma saliente por HTTPS. Luego creas una directiva de replicación (frecuencia de copia, retención de puntos de recuperación y frecuencia de instantáneas coherentes con las aplicaciones), la asocias con el sitio y habilitas la replicación para las VM, eligiendo la suscripción, el grupo de recursos, el almacenamiento y la red virtual de destino. Los cambios fluyen a discos administrados en Azure; no existe ninguna VM de Azure hasta la conmutación por error.",
   "Para Azure a Azure, no se necesitan componentes locales. Cuando habilitas la replicación de una VM, ASR instala automáticamente la extensión Site Recovery Mobility, crea recursos de destino como un grupo de recursos y una red virtual en la región emparejada o elegida como destino, además de una cuenta de almacenamiento de caché en la región de origen que prepara los cambios antes de enviarlos, y comienza a replicar. Los puntos de recuperación coherentes frente a bloqueos se crean con frecuencia, y los coherentes con las aplicaciones según la programación de la directiva de replicación.",
   "Los planes de recuperación convierten las conmutaciones por error de VM individuales en un runbook orquestado. Agregas máquinas y las organizas en grupos que conmutan por error en orden, por ejemplo los servidores de bases de datos en el grupo 1, los servidores de aplicaciones en el grupo 2 y los servidores web en el grupo 3. Puedes insertar runbooks de Azure Automation como acciones previas o posteriores con script (actualizar el DNS, conectar un equilibrador de carga) y acciones manuales que se pausan para una persona. Los planes de recuperación son la herramienta principal para cumplir un RTO.",
   "La conmutación por error de prueba es la forma de demostrar la recuperación ante desastres sin afectar la producción: eliges un punto de recuperación y conmutas por error a una red virtual aislada, compruebas que las aplicaciones funcionan y luego ejecutas Cleanup test failover para eliminar los recursos de prueba. La replicación continúa durante todo el proceso. Una conmutación por error real (planificada cuando tienes aviso previo, no planificada durante una interrupción) crea las VM en el destino; luego confirmas (Commit) la conmutación por error. Después de reparar el sitio principal, vuelves a proteger (Reprotect), invirtiendo la replicación desde el sitio de recuperación hacia el original, y luego haces la conmutación por recuperación (failback) con otra conmutación por error en sentido inverso, a la ubicación original o a una alternativa. Para Hyper-V, la conmutación por recuperación al entorno local es una conmutación por error planificada desde Azure, y puedes elegir sincronizar solo los cambios para minimizar el tiempo de inactividad.",
   "La diferencia clave con Hyper-V Replica es el destino: Hyper-V Replica necesita un segundo sitio con tus propios hosts; ASR usa Azure como segundo sitio y agrega orquestación."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective (objetivo de punto de recuperación): la pérdida máxima de datos tolerable, medida en tiempo."
   ],
   [
    "RTO",
    "Recovery time objective (objetivo de tiempo de recuperación): el tiempo máximo tolerable para restablecer el servicio."
   ],
   [
    "Recovery Services vault (almacén de Recovery Services)",
    "El recurso de Azure que almacena la configuración y los datos de Site Recovery y de Backup."
   ],
   [
    "Recovery plan (plan de recuperación)",
    "Un conjunto ordenado de grupos de máquinas con scripts y pasos manuales que conmutan por error juntos."
   ],
   [
    "Reprotect (volver a proteger)",
    "Invertir la replicación después de la conmutación por error para que la VM quede protegida de vuelta hacia el sitio original antes de la conmutación por recuperación."
   ]
  ],
  "example": "Una empresa protege una aplicación de tres niveles en Hyper-V con ASR hacia Azure. Un plan de recuperación conmuta por error primero la VM de SQL, luego los servidores de aplicaciones y luego los servidores web, con un runbook que actualiza el DNS público. Dos veces al año ejecutan una conmutación por error de prueba en una VNet aislada, verifican la aplicación y limpian.",
  "tip": "La conmutación por error de prueba usa una red aislada y no detiene la replicación. Orden de las operaciones después de una conmutación por error real: confirmar, volver a proteger y luego conmutar por recuperación. Los hosts de Hyper-V necesitan el proveedor de ASR y el agente de Recovery Services.",
  "check": [
   [
    "¿Qué componentes se instalan en los hosts de Hyper-V para la replicación de Hyper-V a Azure?",
    "Azure Site Recovery Provider y el agente Microsoft Azure Recovery Services."
   ],
   [
    "¿Qué característica de ASR ordena las VM en grupos y ejecuta scripts durante la conmutación por error?",
    "Un plan de recuperación."
   ],
   [
    "¿Qué debes hacer antes de conmutar por recuperación al sitio original?",
    "Volver a proteger (Reprotect) las VM para que la replicación se ejecute desde el sitio de recuperación de vuelta al sitio original."
   ]
  ]
 },
 {
  "t": "Azure VMs running Windows Server: Azure Hybrid Benefit, Sysprep and Azure Compute Gallery, extensions, Azure Edition hotpatching",
  "tt": "Máquinas virtuales de Azure con Windows Server: Azure Hybrid Benefit, Sysprep y Azure Compute Gallery, extensiones, revisión en caliente de Azure Edition",
  "body": [
   "Ejecutar Windows Server en VM de Azure es una habilidad híbrida fundamental. Varias características son específicas de Windows Server en Azure: el licenciamiento con Azure Hybrid Benefit, la creación de imágenes personalizadas con Sysprep y Azure Compute Gallery, la ampliación de las VM con extensiones y la Azure Edition de Windows Server con revisión en caliente (hotpatching).",
   "De forma predeterminada, el precio de una VM Windows de Azure incluye la licencia de Windows Server. Azure Hybrid Benefit te permite traer licencias locales aptas de Windows Server (licencias por núcleo Standard o Datacenter con Software Assurance activo, o licencias de suscripción que cumplan los requisitos) y pagar solo la tarifa básica de proceso, lo que puede suponer un ahorro considerable. Lo habilitas al crear la VM, más tarde en la hoja de configuración de la VM, o estableciendo el tipo de licencia en `Windows_Server` con PowerShell o la CLI de Azure. Las reglas de licenciamiento deciden cuántos núcleos debes cubrir, así que revísalas para tu contrato, y recuerda que eres responsable del cumplimiento. Azure Hybrid Benefit también se aplica a los servidores habilitados para Arc en algunos servicios.",
   "Para crear una imagen estándar, personalizas una VM Windows y luego la generalizas con Sysprep, que elimina la información específica de la máquina, como el SID y el nombre del equipo, para que cada implementación sea única. Ejecuta `C:\\Windows\\System32\\Sysprep\\sysprep.exe /generalize /oobe /shutdown`, espera a que la VM se detenga y luego captúrala. Después de generalizarla, la VM de origen no se puede volver a usar. Las capturas van a una Azure Compute Gallery (antes Shared Image Gallery). La galería contiene definiciones de imagen (la imagen lógica, como Win2025-Web, con su tipo de sistema operativo, su generación y si está generalizada o especializada) y versiones de imagen (las imágenes reales, numeradas como 1.0.0). Puedes replicar las versiones en varias regiones, mantener varias réplicas para escalar y compartir la galería con RBAC o entre inquilinos. Una imagen especializada omite Sysprep y conserva la identidad original de la máquina, adecuada para clonar una VM en lugar de para la implementación masiva.",
   "Las extensiones son pequeñas aplicaciones instaladas y administradas por Azure mediante el agente de VM de Azure dentro de la VM. Ejemplos comunes en Windows son Custom Script Extension (descarga y ejecuta un script después de la implementación), la extensión PowerShell DSC, Azure Monitor Agent, Microsoft Antimalware, la extensión de Key Vault para la rotación de certificados y la extensión de configuración de máquina. Run Command es una característica relacionada para ejecutar scripts puntuales mediante el agente sin acceso de red a la VM. Puedes implementar extensiones en el portal, en plantillas, con `Set-AzVMExtension` o automáticamente con Azure Policy.",
   "Windows Server Datacenter: Azure Edition es una edición especial disponible solo en Azure (y en Azure Local). Su característica distintiva es la revisión en caliente, que aplica las actualizaciones de seguridad mensuales en memoria sin reiniciar, con actualizaciones de línea base trimestrales que sí necesitan un reinicio. La revisión en caliente necesita una imagen compatible de Azure Edition y se administra con Azure Update Manager. Azure Edition también ha introducido características antes que otras ediciones, como SMB over QUIC en sus primeras versiones. No puedes convertir en el lugar una VM Datacenter normal a Azure Edition para la revisión en caliente; impleméntala desde una imagen de Azure Edition."
  ],
  "terms": [
   [
    "Azure Hybrid Benefit",
    "Usar licencias locales aptas de Windows Server en Azure para pagar solo la tarifa básica de proceso."
   ],
   [
    "Sysprep /generalize",
    "Elimina datos específicos de la máquina, como el SID, para que una imagen pueda implementarse muchas veces."
   ],
   [
    "Azure Compute Gallery",
    "Un servicio que almacena definiciones y versiones de imagen, las replica entre regiones y las comparte."
   ],
   [
    "Image definition (definición de imagen)",
    "La agrupación lógica en una galería que describe una imagen (sistema operativo, generación, generalizada o especializada)."
   ],
   [
    "Azure Edition",
    "Windows Server Datacenter: Azure Edition, disponible en Azure, compatible con la revisión en caliente."
   ]
  ],
  "example": "Una organización con licencias Datacenter y Software Assurance migra 50 VM y habilita Azure Hybrid Benefit en cada una. Construye una imagen de servidor web reforzada, ejecuta Sysprep con /generalize /oobe /shutdown, la captura como versión 1.0.0 de una definición de imagen de la galería replicada en dos regiones e implementa servidores nuevos a partir de ella, con Custom Script Extension terminando la configuración de la aplicación.",
  "tip": "Pagar dos veces por las licencias de Windows es la trampa de Azure Hybrid Benefit. Una VM capturada que se implementará muchas veces debe generalizarse con Sysprep. La aplicación mensual de revisiones de seguridad sin reinicio en Azure apunta a Azure Edition con revisión en caliente.",
  "check": [
   [
    "¿Qué elimina Sysprep /generalize y por qué?",
    "Información específica de la máquina, como el SID y el nombre del equipo, para que cada VM implementada a partir de la imagen sea única."
   ],
   [
    "En Azure Compute Gallery, ¿cuál es la diferencia entre una definición de imagen y una versión de imagen?",
    "La definición describe la imagen de forma lógica (sistema operativo, generación, generalizada o especializada); las versiones son las imágenes reales que se pueden implementar."
   ],
   [
    "¿Qué edición de Windows Server proporciona revisión en caliente en las VM de Azure?",
    "Windows Server Datacenter: Azure Edition."
   ]
  ]
 },
 {
  "t": "DNS zones: primary, secondary, stub and AD-integrated; replication scope; secure dynamic updates",
  "tt": "Zonas DNS: principal, secundaria, de rutas internas e integrada en AD; ámbito de replicación; actualizaciones dinámicas seguras",
  "body": [
   "Una zona DNS es la parte del espacio de nombres de la que es responsable un servidor DNS, como corp.contoso.com. El DNS de Windows Server admite varios tipos de zona, y el que elijas determina dónde se almacenan los datos, quién puede cambiarlos y cómo se mantienen sincronizadas las copias. Puedes crear zonas de búsqueda directa (de nombres a direcciones IP) y zonas de búsqueda inversa (de direcciones IP a nombres, usando in-addr.arpa para IPv4).",
   "Una zona principal (primary) contiene la copia maestra de escritura de la zona. Una zona principal estándar (basada en archivo) almacena sus datos en un archivo de texto en `%windir%\\System32\\dns`, y solo ese servidor puede aceptar cambios. Una zona secundaria es una copia de solo lectura obtenida de un servidor maestro mediante transferencia de zona: una transferencia completa (AXFR) o incremental (IXFR). El maestro debe permitir la transferencia en la pestaña Zone Transfers de la zona, idealmente solo a los servidores indicados, y puede notificar a los secundarios cuando ocurren cambios. Los secundarios agregan redundancia y reparten la carga de consultas, incluso en servidores DNS que no son de Windows.",
   "Una zona de rutas internas (stub zone) contiene solo los registros necesarios para encontrar los servidores autoritativos de otra zona: el registro SOA, los registros NS y los registros A de pegamento (glue) de esos servidores de nombres. Se mantiene actualizada automáticamente a medida que cambian los servidores de nombres de la otra zona, lo que la hace útil para apuntar a los servidores DNS de un socio o de un dominio secundario. En comparación con un reenviador condicional, una zona de rutas internas aprende los servidores autoritativos de forma dinámica, mientras que un reenviador condicional usa una lista que mantienes a mano.",
   "Una zona integrada en Active Directory almacena sus datos en AD en lugar de en un archivo. Solo puede crearse en un servidor DNS que también sea controlador de dominio. La replicación de AD transporta los cambios, así que cada DC que hospeda la zona tiene una copia de escritura (multimaestro), no se necesita configurar transferencias de zona por separado entre esos DC y los datos de la zona se benefician de la seguridad de AD. Una zona principal o de rutas internas puede estar integrada en AD; una zona secundaria no.",
   "El ámbito de replicación decide qué DC reciben una zona integrada en AD: To all DNS servers running on domain controllers in this forest (almacenada en la partición de aplicación ForestDnsZones, lo típico para la zona _msdcs), To all DNS servers running on domain controllers in this domain (DomainDnsZones, la predeterminada), To all domain controllers in this domain (la partición de dominio, por compatibilidad con DC muy antiguos) o una partición de directorio de aplicación personalizada que creas para dirigirla a DC específicos. Con PowerShell: `Add-DnsServerPrimaryZone -Name corp.contoso.com -ReplicationScope Domain`.",
   "Las actualizaciones dinámicas permiten que los clientes y los servidores DHCP registren sus propios registros A y PTR. Las opciones son None, Nonsecure and secure y Secure only. Secure only, disponible solo en zonas integradas en AD, permite actualizaciones solo de miembros autenticados del dominio y registra quién es el propietario de cada registro mediante su lista de control de acceso, de modo que un dispositivo no autorizado no puede sobrescribir el registro de un servidor. Es la configuración recomendada. Combina las actualizaciones dinámicas con el envejecimiento y la limpieza (aging and scavenging) para que los registros obsoletos se eliminen automáticamente."
  ],
  "terms": [
   [
    "Primary zone (zona principal)",
    "Una zona que contiene la copia de escritura de los datos DNS, en un archivo o en AD."
   ],
   [
    "Secondary zone (zona secundaria)",
    "Una copia de solo lectura de una zona que se mantiene actualizada mediante transferencias de zona desde un servidor maestro."
   ],
   [
    "Stub zone (zona de rutas internas)",
    "Una zona que contiene solo registros SOA, NS y A de pegamento para localizar los servidores autoritativos de otra zona."
   ],
   [
    "Replication scope (ámbito de replicación)",
    "El conjunto de DC que reciben una zona integrada en AD: bosque, dominio, partición de dominio o una partición personalizada."
   ],
   [
    "Secure dynamic updates (actualizaciones dinámicas seguras)",
    "Registro dinámico permitido solo a miembros autenticados del dominio, disponible solo en zonas integradas en AD."
   ]
  ],
  "example": "Contoso necesita que sus servidores DNS conozcan siempre los servidores de nombres actuales de Fabrikam después de una fusión, incluso a medida que Fabrikam agrega DC. El administrador crea una zona de rutas internas integrada en AD para fabrikam.com con un ámbito de replicación de todo el bosque, de modo que cada DC de Contoso aprende automáticamente los registros NS de Fabrikam.",
  "tip": "Las actualizaciones dinámicas Secure only requieren una zona integrada en AD. Las zonas secundarias nunca pueden estar integradas en AD. Una zona de rutas internas sigue automáticamente los cambios de servidores de nombres; un reenviador condicional no.",
  "check": [
   [
    "¿Qué tipo de zona contiene solo registros SOA, NS y A de pegamento?",
    "Una zona de rutas internas (stub zone)."
   ],
   [
    "¿Qué ámbito de replicación es el predeterminado para una zona nueva integrada en AD?",
    "Todos los servidores DNS que se ejecutan en controladores de dominio de este dominio (DomainDnsZones)."
   ],
   [
    "¿Por qué no puedes seleccionar actualizaciones Secure only en una zona principal estándar?",
    "Las actualizaciones seguras dependen de la autenticación de AD y de las ACL de los registros, así que solo están disponibles en zonas integradas en AD."
   ]
  ]
 },
 {
  "t": "Forwarders, conditional forwarders and root hints; DNS policies and zone scopes",
  "tt": "Reenviadores, reenviadores condicionales y sugerencias de raíz; directivas DNS y ámbitos de zona",
  "body": [
   "Cuando un servidor DNS de Windows recibe una consulta sobre un nombre para el que no es autoritativo y que no tiene en caché, debe encontrar la respuesta en algún lugar. Tiene tres herramientas: reenviadores, reenviadores condicionales y sugerencias de raíz (root hints). Elegir entre ellas controla cómo tu DNS interno llega a internet, a los socios y a Azure.",
   "Los reenviadores (forwarders) se aplican a todo el servidor: indicas uno o más servidores DNS ascendentes (por ejemplo, un resolvedor del ISP, un servicio de filtrado de seguridad o un DNS central del centro de datos), y el servidor les envía cada consulta que no puede responder localmente. Esto centraliza la resolución de internet y el almacenamiento en caché, y permite que los servidores DNS de las sucursales eviten el acceso directo a internet. Los reenviadores condicionales se aplican solo a un nombre de dominio específico: las consultas sobre fabrikam.com van a los servidores DNS de Fabrikam, mientras que todo lo demás sigue la ruta normal. Los reenviadores condicionales son la forma estándar de dar soporte a las confianzas y a la conectividad con socios, y de resolver los nombres de puntos de conexión privados de Azure reenviando las zonas privatelink a un punto de conexión de entrada de Azure DNS Private Resolver. En un DC, puedes almacenar un reenviador condicional en AD y replicarlo a todos los servidores DNS del dominio o del bosque, en lugar de configurar cada servidor.",
   "Las sugerencias de raíz son una lista de los servidores de nombres raíz de internet. Si no hay ningún reenviador configurado, o los reenviadores fallan y la opción Use root hints if no forwarders are available está activada, el servidor realiza la resolución iterativa por sí mismo: pregunta a un servidor raíz, sigue la referencia a los servidores del dominio de nivel superior y luego a los servidores autoritativos del dominio. Las sugerencias de raíz vienen con Windows y rara vez cambian. Si deshabilitas la recursividad en un servidor, solo responderá sobre sus propias zonas, lo que es apropiado para los servidores autoritativos expuestos a internet.",
   "El orden de resolución es: zonas locales, luego caché, luego un reenviador condicional coincidente, luego los reenviadores del servidor y luego las sugerencias de raíz. El reenviador condicional más específico gana sobre los reenviadores generales.",
   "Las directivas DNS, introducidas en Windows Server 2016, permiten que el servidor responda de forma diferente según quién pregunta y cómo. Las directivas coinciden con criterios como la subred del cliente, el protocolo de transporte, la interfaz del servidor, el FQDN, el tipo de consulta y la hora del día, y luego toman una acción (permitir, denegar o ignorar) o dirigen la consulta a un ámbito de zona. Las directivas de resolución de consultas controlan las respuestas, las directivas de recursividad controlan qué clientes pueden usar la recursividad y las directivas de transferencia de zona controlan las transferencias. Las directivas se configuran con PowerShell en cada servidor DNS.",
   "Un ámbito de zona (zone scope) es un conjunto adicional de registros dentro de una zona. La zona puede tener un ámbito predeterminado más ámbitos como Europe o Internal, cada uno con registros distintos para el mismo nombre. Combinado con subredes de cliente y directivas, esto permite el enrutamiento basado en la ubicación geográfica, el DNS de cerebro dividido (split-brain: los clientes internos obtienen direcciones privadas y los clientes de internet obtienen direcciones públicas de la misma zona) y la distribución de carga según la hora del día.",
   "```powershell\nAdd-DnsServerClientSubnet -Name EUSubnet -IPv4Subnet 10.50.0.0/16\nAdd-DnsServerZoneScope -ZoneName contoso.com -Name EUScope\nAdd-DnsServerResourceRecord -ZoneName contoso.com -A -Name www -IPv4Address 10.50.1.10 -ZoneScope EUScope\nAdd-DnsServerQueryResolutionPolicy -Name EUPolicy -Action ALLOW -ClientSubnet 'eq,EUSubnet' -ZoneScope 'EUScope,1' -ZoneName contoso.com\n```"
  ],
  "terms": [
   [
    "Forwarder (reenviador)",
    "Un servidor DNS ascendente que recibe todas las consultas que el servidor local no puede resolver por sí mismo."
   ],
   [
    "Conditional forwarder (reenviador condicional)",
    "Una regla que envía las consultas de un dominio específico a servidores DNS designados."
   ],
   [
    "Root hints (sugerencias de raíz)",
    "La lista de servidores de nombres raíz usada para la resolución iterativa cuando no hay reenviadores o no están disponibles."
   ],
   [
    "DNS policy (directiva DNS)",
    "Una regla que permite, deniega, ignora o redirige consultas según criterios como la subred del cliente o la hora del día."
   ],
   [
    "Zone scope (ámbito de zona)",
    "Un conjunto alternativo de registros dentro de una zona, seleccionado por las directivas DNS."
   ]
  ],
  "example": "Los DC de Contoso deben resolver los nombres de puntos de conexión privados de Azure SQL. El administrador crea un reenviador condicional almacenado en AD para la zona privatelink de Azure que apunta a la IP del punto de conexión de entrada de DNS Private Resolver, replicado a todos los servidores DNS del bosque, y deja que los nombres de internet sigan yendo a los reenviadores corporativos.",
  "tip": "Un dominio de socio significa reenviador condicional; todo lo demás significa reenviador. Devolver respuestas distintas a distintas subredes de clientes desde la misma zona significa directivas DNS con ámbitos de zona.",
  "check": [
   [
    "¿Cuándo usa un servidor DNS de Windows las sugerencias de raíz?",
    "Cuando no hay ningún reenviador configurado, o los reenviadores no están disponibles y la opción de usar sugerencias de raíz está habilitada."
   ],
   [
    "¿Cómo puede hacerse disponible un reenviador condicional en el servidor DNS de cada DC sin configurar cada uno?",
    "Almacenándolo en Active Directory y eligiendo un ámbito de replicación de bosque o de dominio."
   ],
   [
    "¿Qué característica permite que una zona dé IP privadas a los clientes internos e IP públicas a los clientes externos?",
    "Las directivas DNS con ámbitos de zona (DNS de cerebro dividido)."
   ]
  ]
 },
 {
  "t": "DNSSEC signing, trust anchors and the Name Resolution Policy Table (NRPT)",
  "tt": "Firma DNSSEC, anclajes de confianza y la Tabla de directivas de resolución de nombres (NRPT)",
  "body": [
   "El DNS clásico no tiene forma de demostrar que una respuesta es auténtica, por lo que los atacantes que pueden inyectar respuestas falsificadas (envenenamiento de caché o suplantación) pueden redirigir a los usuarios a servidores maliciosos. Las Extensiones de seguridad de DNS (DNSSEC) solucionan esto agregando firmas digitales a los datos de la zona. Un resolvedor que valida DNSSEC puede confirmar que una respuesta realmente provino del propietario de la zona y no fue alterada, y puede demostrar que un nombre no existe. DNSSEC no cifra las consultas; proporciona autenticidad e integridad.",
   "Firmar una zona agrega nuevos tipos de registros. Los registros RRSIG contienen la firma de cada conjunto de registros. Los registros DNSKEY publican las claves públicas de la zona. Los registros NSEC o NSEC3 proporcionan la denegación autenticada de existencia, y NSEC3 aplica hash a los nombres para que los atacantes no puedan simplemente recorrer la zona (zone walking) para enumerar todos los nombres. Los registros DS (firmante de delegación) residen en la zona primaria y contienen un hash de la clave de la zona secundaria, enlazando la cadena de confianza de la primaria a la secundaria. Normalmente se usan dos tipos de claves: la clave de firma de claves (KSK) firma solo el conjunto de registros DNSKEY, y la clave de firma de zona (ZSK) firma el resto de la zona. Mantenerlas separadas te permite rotar la ZSK, que cambia con frecuencia, sin actualizar la zona primaria.",
   "En el DNS de Windows Server firmas una zona con DNS Manager (clic con el botón derecho en la zona, DNSSEC, Sign the Zone) o con `Invoke-DnsServerZoneSign`. Un servidor DNS es el Key Master de la zona; genera y administra las claves y se encarga de la rotación automática de claves. En las zonas integradas en AD, los datos firmados se replican a través de AD, y las actualizaciones dinámicas siguen funcionando porque los servidores firman los registros en línea a medida que cambian. Comprueba el resultado con `Resolve-DnsName www.corp.contoso.com -DnssecOk`, que devuelve los registros RRSIG.",
   "La validación necesita un punto de partida de confianza, llamado anclaje de confianza (trust anchor). Normalmente es un registro DNSKEY o DS de una zona, configurado en el servidor DNS que valida; luego el servidor sigue la cadena de firmas hacia abajo. En internet, la clave de la zona raíz sirve como anclaje. Para las zonas internas, agregas a tus resolvedores anclajes de confianza para tus propias zonas firmadas. Windows puede distribuir automáticamente los anclajes de confianza de una zona firmada integrada en AD a todos los servidores DNS del bosque, una opción del asistente de firma, y aparecen en la carpeta Trust Points de DNS Manager.",
   "Los clientes Windows son resolvedores de código auxiliar (stub resolvers) que no validan: confían en su servidor DNS para validar e informar el resultado. La Tabla de directivas de resolución de nombres (NRPT) indica a los clientes cómo tratar espacios de nombres específicos. Configurada mediante directiva de grupo (Computer Configuration, Policies, Windows Settings, Name Resolution Policy), una regla de NRPT para un sufijo como `.corp.contoso.com` puede exigir la validación DNSSEC: el cliente pregunta al servidor y acepta la respuesta solo si el servidor indica que la validó correctamente. De lo contrario, el cliente trata el nombre como no resuelto. Las reglas de NRPT también pueden dirigir las consultas de un espacio de nombres a servidores DNS específicos, algo que usan DirectAccess y algunos diseños de VPN. Consulta las reglas aplicadas con `Get-DnsClientNrptPolicy`.",
   "Implementa por etapas: firma la zona, distribuye los anclajes de confianza, confirma la validación en los servidores y solo entonces exige la validación con NRPT en los clientes; de lo contrario, una validación fallida romperá la resolución de nombres para los usuarios."
  ],
  "terms": [
   [
    "DNSSEC",
    "Extensiones que agregan firmas digitales a los datos DNS para que los resolvedores puedan verificar su autenticidad e integridad."
   ],
   [
    "RRSIG",
    "Un registro que contiene la firma sobre un conjunto de registros DNS."
   ],
   [
    "Trust anchor (anclaje de confianza)",
    "Una clave pública o registro DS preconfigurado en el que un resolvedor confía como inicio de una cadena de validación DNSSEC."
   ],
   [
    "Key Master",
    "El servidor DNS responsable de generar y rotar las claves de una zona firmada."
   ],
   [
    "NRPT",
    "Name Resolution Policy Table (Tabla de directivas de resolución de nombres): reglas de cliente, entregadas por directiva de grupo, que exigen la validación DNSSEC o dirigen las consultas de espacios de nombres específicos."
   ]
  ],
  "example": "Después de un incidente de phishing, Contoso firma corp.contoso.com, distribuye los anclajes de confianza a todos los servidores DNS del bosque y verifica con Resolve-DnsName -DnssecOk. Una vez confirmada la validación en los servidores, un GPO agrega una regla de NRPT que exige DNSSEC para .corp.contoso.com en todos los clientes.",
  "tip": "La firma se hace en la zona autoritativa; la validación la hacen los resolvedores usando anclajes de confianza; la NRPT es lo que hace que los clientes Windows exijan la validación. DNSSEC proporciona integridad, no confidencialidad.",
  "check": [
   [
    "¿Qué firma la KSK y qué firma la ZSK?",
    "La KSK firma el conjunto de registros DNSKEY; la ZSK firma los demás registros de la zona."
   ],
   [
    "¿Cómo exigen los clientes Windows la validación DNSSEC para un espacio de nombres?",
    "Mediante una regla de NRPT, normalmente implementada por directiva de grupo, que exige la validación DNSSEC para ese sufijo."
   ],
   [
    "¿Qué tipo de registro proporciona la denegación autenticada de existencia a la vez que dificulta el recorrido de la zona?",
    "NSEC3."
   ]
  ]
 },
 {
  "t": "Azure DNS private zones, virtual network links and auto-registration; Azure DNS Private Resolver",
  "tt": "Zonas privadas de Azure DNS, vínculos de red virtual y registro automático; Azure DNS Private Resolver",
  "body": [
   "Cuando trasladas servidores Windows a Azure, la resolución de nombres tiene que funcionar en tres direcciones: entre las VM de Azure, de Azure al entorno local y del entorno local hacia Azure. Azure da a cada red virtual (VNet) un resolvedor integrado en la dirección especial `168.63.129.16`, pero ese resolvedor solo responde sobre los nombres que Azure conoce. Las zonas privadas de Azure DNS y Azure DNS Private Resolver son los dos servicios que te permiten ampliarlo de forma limpia.",
   "Una zona privada de Azure DNS es una zona DNS, como `corp.contoso.internal`, que solo se puede resolver desde las VNet que elijas. Conectas una zona a una VNet con un vínculo de red virtual. Cualquier VM de una VNet vinculada que use el DNS proporcionado por Azure puede entonces resolver los registros de la zona. Un vínculo puede tener opcionalmente activado el registro automático: Azure crea y mantiene entonces automáticamente registros A para las VM de esa VNet, actualizándolos cuando las VM se crean, cambian de IP o se eliminan. Una VNet puede vincularse a muchas zonas privadas para la resolución, pero el registro automático puede habilitarse solo para una zona privada por VNet. Las zonas privadas también son la forma en que funcionan los puntos de conexión privados: una zona como `privatelink.file.core.windows.net` contiene la IP privada de una cuenta de almacenamiento, de modo que el nombre público normal se resuelve en una dirección privada dentro de tu red.",
   "El problema es que los servidores locales no pueden enviar consultas a `168.63.129.16`; esa dirección solo es accesible desde dentro de Azure. Antes de que existiera Private Resolver, implementabas VM de reenviador DNS en Azure. Azure DNS Private Resolver reemplaza esas VM con un servicio administrado implementado en tu VNet. Tiene dos tipos de puntos de conexión, cada uno en su propia subred dedicada delegada al servicio. Un punto de conexión de entrada obtiene una dirección IP privada en la VNet; los servidores DNS locales crean un reenviador condicional para tus zonas de Azure que apunta a esa IP, y las consultas llegan por VPN o ExpressRoute. Un punto de conexión de salida, combinado con un conjunto de reglas de reenvío DNS (forwarding ruleset), envía consultas de Azure a otros servidores DNS, por ejemplo reenviando `contoso.local` a tus controladores de dominio locales.",
   "Al examen le gusta preguntar qué pieza resuelve qué dirección. Los clientes locales que resuelven nombres privados de Azure necesitan el punto de conexión de entrada más un reenviador condicional en los servidores DNS locales. Las VM de Azure que resuelven nombres de Active Directory local necesitan el punto de conexión de salida y una regla de reenvío, con el conjunto de reglas vinculado a las VNet que deben usarlo. Las VM que deben registrar sus propios nombres automáticamente necesitan un vínculo de zona privada con registro automático. Ten en cuenta que las VM unidas al dominio que usan tus controladores de dominio como servidores DNS (una configuración de DNS personalizado en la VNet) omiten el DNS proporcionado por Azure, así que los propios DC deben reenviar las consultas de las zonas privadas de Azure a `168.63.129.16`.",
   "En un laboratorio verás estos elementos como recursos separados en el portal: la zona DNS privada, su hoja Virtual network links con una casilla Enable auto registration, y el DNS private resolver con Inbound endpoints, Outbound endpoints y los conjuntos de reglas de reenvío vinculados. Las pruebas se hacen desde una VM con `Resolve-DnsName vm1.corp.contoso.internal`."
  ],
  "terms": [
   [
    "Private DNS zone (zona DNS privada)",
    "Una zona de Azure DNS que se resuelve solo desde las redes virtuales vinculadas a ella, no desde internet."
   ],
   [
    "Virtual network link (vínculo de red virtual)",
    "La conexión entre una zona privada y una VNet que permite a la VNet resolver la zona y, opcionalmente, registrar automáticamente los registros de las VM."
   ],
   [
    "Auto-registration (registro automático)",
    "Una configuración del vínculo que hace que Azure cree y mantenga registros A para las VM de la VNet vinculada; permitida solo para una zona privada por VNet."
   ],
   [
    "Inbound endpoint (punto de conexión de entrada)",
    "Una dirección IP de Private Resolver en la VNet a la que los servidores DNS locales reenvían las consultas sobre nombres privados de Azure."
   ],
   [
    "Outbound endpoint and forwarding ruleset (punto de conexión de salida y conjunto de reglas de reenvío)",
    "Los componentes de Private Resolver que reenvían las consultas de los dominios elegidos desde Azure a otros servidores DNS, como los DC locales."
   ]
  ],
  "example": "Contoso traslada un nivel de aplicación a Azure. Las VM se registran automáticamente en la zona privada azure.contoso.internal. Los servidores DNS locales obtienen un reenviador condicional para esa zona hacia el punto de conexión de entrada de Private Resolver, y un conjunto de reglas de reenvío envía las consultas de contoso.local desde Azure de vuelta a los DC locales a través de la VPN de sitio a sitio. No se necesitan VM de reenviador.",
  "tip": "Relaciona la dirección con el componente: del entorno local a Azure se usa el punto de conexión de entrada y un reenviador condicional; de Azure al entorno local se usa el punto de conexión de salida y un conjunto de reglas de reenvío. Solo una zona de registro automático por VNet.",
  "check": [
   [
    "¿Por qué un servidor DNS local no puede simplemente reenviar consultas a 168.63.129.16?",
    "Esa dirección solo es accesible desde dentro de Azure. Los servidores locales necesitan una IP privada accesible, que proporciona el punto de conexión de entrada de Private Resolver (o una VM de reenviador)."
   ],
   [
    "Una VNet ya se registra automáticamente en la zona A. ¿Puedes habilitar el registro automático para la zona B en la misma VNet?",
    "No. Una VNet puede vincularse a varias zonas para la resolución, pero el registro automático solo se permite para una zona privada por VNet."
   ],
   [
    "¿Qué recurso permite que las VM de Azure resuelvan nombres de contoso.local hospedados en DC locales sin servidores DNS personalizados?",
    "Un punto de conexión de salida de Azure DNS Private Resolver con un conjunto de reglas de reenvío que contenga una regla para contoso.local que apunte a los servidores DNS locales, vinculado a la VNet."
   ]
  ]
 },
 {
  "t": "DHCP scopes, reservations, options and relay; authorization in AD",
  "tt": "Ámbitos, reservas, opciones y retransmisión DHCP; autorización en AD",
  "body": [
   "El Protocolo de configuración dinámica de host (DHCP) entrega direcciones IP y configuraciones para que no tengas que configurar cada cliente a mano. Un cliente obtiene una concesión mediante cuatro mensajes, que a menudo se recuerdan como DORA: Discover (una difusión que busca cualquier servidor DHCP), Offer, Request y Acknowledge. Como Discover es una difusión, normalmente se queda en la subred local, lo que importa cuando diseñas dónde ubicar los servidores.",
   "Un ámbito (scope) es un rango de direcciones para una subred, como de 10.1.20.10 a 10.1.20.250 con máscara 255.255.255.0, más una duración de concesión. Dentro de un ámbito agregas rangos de exclusión para las direcciones que asignas de forma estática (impresoras, servidores) y reservas. Una reserva vincula una dirección específica a la dirección MAC de un cliente (en IPv4), de modo que el dispositivo siempre obtiene la misma IP y aun así recibe opciones de DHCP. En PowerShell usas `Add-DhcpServerv4Scope`, `Add-DhcpServerv4ExclusionRange` y `Add-DhcpServerv4Reservation`.",
   "Las opciones transportan configuraciones más allá de la dirección. Las que verás con más frecuencia son 003 Router (puerta de enlace predeterminada), 006 DNS Servers y 015 DNS Domain Name. Las opciones pueden establecerse en el nivel del servidor (se aplican a todos los ámbitos), en el nivel del ámbito y en el nivel de la reserva, y gana el nivel más específico, así que una opción de reserva anula una opción de ámbito, que a su vez anula una opción de servidor. Las directivas DHCP también pueden asignar opciones o rangos de direcciones según criterios como la clase de proveedor o el prefijo MAC. Establece las opciones con `Set-DhcpServerv4OptionValue`.",
   "Como los clientes hacen difusión, un servidor DHCP solo puede oír a los clientes de su propia subred, a menos que algo reenvíe la solicitud. Un agente de retransmisión DHCP (relay agent) se encarga de eso: normalmente la interfaz del enrutador (a menudo llamada dirección IP helper) o el agente de retransmisión de Routing and Remote Access en un servidor Windows. La retransmisión convierte la difusión en una unidifusión hacia el servidor DHCP y completa el campo de dirección de puerta de enlace (giaddr) con la dirección de la interfaz que la recibió. El servidor usa giaddr para elegir el ámbito de esa subred. Si los clientes de una subred remota no obtienen dirección, revisa primero la retransmisión y luego si existe un ámbito coincidente y está activo.",
   "En un dominio de Active Directory, un servidor DHCP de Windows que es miembro del dominio debe estar autorizado en AD antes de conceder direcciones. La autorización impide que un servidor no autorizado o de prueba entregue configuraciones incorrectas. Autorizar requiere de forma predeterminada pertenecer a Enterprise Admins (o derechos delegados), porque la lista reside en la partición de configuración del bosque. Autorizas con la consola DHCP o con `Add-DhcpServerInDC -DnsName dhcp1.contoso.com -IPAddress 10.1.0.5`, y enumeras los servidores autorizados con `Get-DhcpServerInDC`. Un servidor independiente, que no pertenece al dominio, comprueba si existe un servidor autorizado en la subred y deja de conceder direcciones si encuentra uno.",
   "En tu laboratorio, después de instalar el rol con `Install-WindowsFeature DHCP -IncludeManagementTools`, la consola sigue mostrando una flecha roja hacia abajo en el servidor hasta que lo autorizas. Ejecuta también el paso posterior a la instalación que crea los grupos de seguridad DHCP Administrators y DHCP Users."
  ],
  "terms": [
   [
    "Scope (ámbito)",
    "Un rango de direcciones IP para una subred, con máscara de subred, duración de concesión y opciones, del cual DHCP concede direcciones."
   ],
   [
    "Reservation (reserva)",
    "Una entrada del ámbito que siempre da la misma dirección IP a un cliente identificado por su dirección MAC."
   ],
   [
    "Exclusion range (rango de exclusión)",
    "Direcciones dentro de un ámbito que DHCP nunca concederá, usadas para dispositivos configurados de forma estática."
   ],
   [
    "DHCP relay agent (agente de retransmisión DHCP)",
    "Una característica del enrutador o un servicio que reenvía las solicitudes DHCP de difusión de una subred remota a un servidor DHCP como unidifusión."
   ],
   [
    "Authorization (autorización)",
    "Registrar en AD un servidor DHCP miembro del dominio para que se le permita conceder direcciones; requiere derechos de Enterprise Admins de forma predeterminada."
   ]
  ],
  "example": "Una VLAN de sucursal 10.3.40.0/24 no obtiene direcciones después de crear un ámbito nuevo en el servidor DHCP central. El administrador descubre que el ámbito está bien, pero el enrutador de la sucursal no tiene configurado un IP helper. Después de agregar la retransmisión que apunta al servidor DHCP, los clientes reciben concesiones del ámbito correcto porque el enrutador marca giaddr con 10.3.40.1.",
  "tip": "Conoce la precedencia de las opciones (reserva sobre ámbito sobre servidor) y que la autorización necesita Enterprise Admins de forma predeterminada. Si un servidor está instalado pero no entrega nada, sospecha de la autorización.",
  "check": [
   [
    "Un ámbito establece la opción DNS 006 en 10.0.0.10, pero una reserva establece 006 en 10.0.0.20. ¿Cuál obtiene el cliente reservado?",
    "10.0.0.20, porque las opciones de nivel de reserva anulan las de nivel de ámbito y de servidor."
   ],
   [
    "¿Cómo sabe un servidor DHCP qué ámbito usar para una solicitud que llegó a través de un agente de retransmisión?",
    "Lee el campo giaddr que la retransmisión completó con la dirección de su interfaz receptora y elige el ámbito cuya subred contiene esa dirección."
   ],
   [
    "Se instala un servidor DHCP nuevo miembro del dominio, tiene un ámbito activo, pero no concede direcciones. ¿Cuál es la causa probable?",
    "No se ha autorizado en Active Directory; autorízalo con la consola o con Add-DhcpServerInDC usando una cuenta con derechos de Enterprise Admins."
   ]
  ]
 },
 {
  "t": "DHCP high availability: failover in load balance and hot standby modes; IPAM",
  "tt": "Alta disponibilidad de DHCP: conmutación por error en modos de equilibrio de carga y espera activa; IPAM",
  "body": [
   "Si tu único servidor DHCP se cae, los clientes siguen funcionando hasta que caducan sus concesiones; luego no pueden renovarlas y pierden la conectividad. Los diseños antiguos dividían cada ámbito entre dos servidores (el ámbito dividido 80/20), pero cada servidor solo conocía su propia mitad. La conmutación por error de DHCP, integrada en Windows Server, es la respuesta moderna: dos servidores comparten la información completa de las concesiones de los mismos ámbitos y la mantienen sincronizada.",
   "Una relación de conmutación por error vincula exactamente dos servidores DHCP para uno o más ámbitos IPv4 (la conmutación por error no abarca los ámbitos IPv6). Los servidores se replican entre sí los datos de concesiones, autenticados con un secreto compartido opcional. La creas en la consola DHCP con Configure Failover sobre un ámbito, o con `Add-DhcpServerv4Failover`, y la compruebas con `Get-DhcpServerv4Failover`. La configuración de los ámbitos, como las opciones y las reservas, no se sincroniza continuamente después de la creación, así que después de cambiarla replicas con Replicate Scope o `Invoke-DhcpServerv4FailoverReplication`.",
   "Hay dos modos. El modo de equilibrio de carga (load balance) es el predeterminado: ambos servidores atienden activamente a los clientes, dividiendo las solicitudes según un porcentaje (50/50 a menos que lo cambies). Es adecuado para servidores en el mismo sitio. El modo de espera activa (hot standby) tiene un servidor activo y uno en espera. El servidor en espera conserva un porcentaje de reserva de direcciones (5 por ciento de forma predeterminada) que puede entregar de inmediato si el servidor activo deja de responder, y toma el control por completo después de que se declara caído al asociado. La espera activa es adecuada para un diseño de centro y sucursales en el que un servidor central respalda a varios servidores de sucursal, ya que un único servidor puede ser el asociado en espera en varias relaciones.",
   "Dos temporizadores importan. El tiempo máximo de adelanto del cliente (MCLT) es cuánto puede extender un servidor una concesión más allá de lo que conoce su asociado; después de que un asociado se marca como caído, el servidor superviviente espera el MCLT antes de poder tomar el control de todo el grupo de direcciones. El intervalo de cambio de estado (state switchover interval), si está configurado, pasa automáticamente un servidor de comunicación interrumpida a asociado caído después de ese tiempo; si no está configurado, un administrador debe declarar manualmente al asociado como caído. Estas configuraciones explican por qué la toma de control no es instantánea.",
   "IP Address Management (IPAM) es una característica de Windows Server que detecta y administra de forma centralizada los servidores DHCP, los servidores DNS y tu espacio de direcciones IP. Desde una sola consola puedes ver la utilización de los ámbitos, encontrar bloques de direcciones libres, administrar los ámbitos y la conmutación por error de DHCP, administrar zonas y registros DNS, y auditar qué usuario o dispositivo tenía una dirección en un momento dado usando eventos de concesiones e inicios de sesión. Los servidores administrados se configuran mediante aprovisionamiento por directiva de grupo, donde `Invoke-IpamGpoProvisioning` crea GPO que conceden acceso al servidor IPAM, o mediante la configuración manual de los mismos permisos y reglas de firewall. Instala IPAM en un servidor miembro; no se admite instalarlo en un controlador de dominio.",
   "Para el examen, recuerda: la conmutación por error es solo IPv4 y exactamente dos servidores por relación; equilibrio de carga para activo-activo en un sitio; espera activa para activo-pasivo y respaldo de sucursales; IPAM para la visibilidad centralizada y la auditoría, no para proporcionar redundancia por sí mismo."
  ],
  "terms": [
   [
    "DHCP failover (conmutación por error de DHCP)",
    "Una relación entre dos servidores DHCP que replican la información de concesiones IPv4 para que cualquiera de los dos pueda atender los mismos ámbitos."
   ],
   [
    "Load balance mode (modo de equilibrio de carga)",
    "El modo de conmutación por error predeterminado en el que ambos servidores conceden direcciones activamente, divididas según un porcentaje configurable."
   ],
   [
    "Hot standby mode (modo de espera activa)",
    "Un modo de conmutación por error con un servidor activo y uno en espera; el de espera conserva un porcentaje de reserva de direcciones para uso inmediato."
   ],
   [
    "MCLT",
    "Maximum Client Lead Time (tiempo máximo de adelanto del cliente): el período en que un servidor puede extender concesiones más allá de lo que conoce su asociado, y la espera antes de la toma de control completa tras declarar caído al asociado."
   ],
   [
    "IPAM",
    "IP Address Management: una característica de Windows Server que detecta, supervisa, administra y audita de forma centralizada DHCP, DNS y el espacio de direcciones IP."
   ]
  ],
  "example": "Una empresa tiene servidores DHCP en cinco sucursales y uno en el centro de datos. Cada servidor de sucursal es el servidor activo en una relación de espera activa con el servidor del centro de datos, que conserva una reserva del 5 por ciento de cada ámbito. Cuando falla un servidor de sucursal, los clientes que renuevan a través de la WAN obtienen de inmediato direcciones de la reserva, y después de marcar al asociado como caído, el servidor del centro de datos puede usar el grupo completo.",
  "tip": "Equilibrio de carga equivale a activo-activo en el mismo sitio; espera activa equivale a activo-pasivo, típico de un servidor central que respalda sucursales. La conmutación por error nunca abarca IPv6 y nunca más de dos servidores por relación.",
  "check": [
   [
    "Cambias la opción de servidor DNS en un ámbito que está en una relación de conmutación por error. ¿Qué más debes hacer?",
    "Replicar el ámbito al asociado (Replicate Scope o Invoke-DhcpServerv4FailoverReplication), porque los cambios de configuración no se sincronizan automáticamente."
   ],
   [
    "¿Qué modo de conmutación por error es adecuado para que un servidor del centro de datos respalde a varios servidores DHCP de sucursal?",
    "La espera activa, con cada servidor de sucursal activo y el servidor del centro de datos en espera conservando una reserva de direcciones."
   ],
   [
    "¿Puedes instalar IPAM en un controlador de dominio?",
    "No. No se admite instalar la característica de servidor IPAM en un controlador de dominio; usa un servidor miembro."
   ]
  ]
 },
 {
  "t": "Azure VNet addressing and static private IPs set on the NIC",
  "tt": "Direccionamiento de VNet de Azure e IP privadas estáticas configuradas en la NIC",
  "body": [
   "Una red virtual de Azure (VNet) es tu red privada en Azure. Cuando la creas, le asignas uno o más espacios de direcciones escritos en notación CIDR (enrutamiento entre dominios sin clases), como `10.20.0.0/16`, normalmente de los rangos privados definidos en RFC 1918 (10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16). Luego divides ese espacio en subredes, como `10.20.1.0/24` para servidores y `10.20.2.0/24` para administración. Cada tarjeta de interfaz de red (NIC) de una VM reside en una subred.",
   "Planifica el espacio de direcciones antes de construir. Las VNet que conectarás mediante emparejamiento (peering), o que conectarás al entorno local por VPN o ExpressRoute, no deben superponerse entre sí ni con tus rangos locales, porque el enrutamiento no puede distinguir dos prefijos idénticos. Deja espacio para crecer, y recuerda que algunos servicios necesitan subredes dedicadas con nombres o delegaciones específicos, como `GatewaySubnet` para una puerta de enlace de VPN o ExpressRoute, o subredes delegadas para los puntos de conexión de DNS Private Resolver.",
   "Azure reserva cinco direcciones en cada subred: la dirección de red, las tres primeras direcciones de host (usadas para la puerta de enlace predeterminada y la asignación de Azure DNS) y la dirección de difusión. Así que una /24 te da 251 direcciones utilizables, no 254, y la primera dirección que puedes asignar en `10.20.1.0/24` es `10.20.1.4`. La subred más pequeña que puedes crear es una /29, que deja solo tres direcciones utilizables. Las preguntas del examen suelen evaluar esta aritmética.",
   "Cada configuración IP de una NIC tiene una IP privada que es dinámica o estática. Con la dinámica, Azure elige la siguiente dirección libre de la subred. Con la estática, eliges una dirección de la subred (o conviertes la actual) y Azure garantiza que permanezca con esa NIC hasta que la cambies o elimines la NIC. Los servidores a los que otras máquinas apuntan por IP, sobre todo los controladores de dominio y los servidores DNS, deben usar la asignación estática. La configuras en el portal, en la hoja IP configurations de la NIC, o con PowerShell estableciendo `PrivateIpAllocationMethod` en Static en la configuración IP y ejecutando `Set-AzNetworkInterface`.",
   "La regla clave: en Azure configuras la IP estática en la NIC, no dentro de Windows. El sistema operativo invitado debe permanecer en DHCP, y el DHCP de Azure siempre le entregará la dirección que configuraste en la NIC. Si escribes una dirección estática en la configuración del adaptador de Windows y no coincide, o más tarde la NIC cambia, la VM puede perder la conectividad de red y necesitarás herramientas como Run Command o Serial Console para recuperarla. La misma idea se aplica a los servidores DNS: configura servidores DNS personalizados en la VNet (o en una NIC para anularla) en lugar de en el invitado, para que cada VM los reciba mediante DHCP.",
   "Un patrón híbrido típico es implementar dos VM de DC con IP privadas estáticas en sus NIC, luego configurar los servidores DNS de la VNet con esas dos direcciones y reiniciar las demás VM para que reciban la nueva configuración de DNS."
  ],
  "terms": [
   [
    "Address space (espacio de direcciones)",
    "El rango o los rangos CIDR asignados a una VNet, de los que se asignan sus subredes."
   ],
   [
    "Reserved addresses (direcciones reservadas)",
    "Las cinco direcciones que Azure conserva en cada subred: la dirección de red, las tres primeras direcciones de host y la dirección de difusión."
   ],
   [
    "Static private IP (IP privada estática)",
    "Una configuración de la configuración IP de la NIC que fija una dirección privada elegida a la NIC para que nunca cambie hasta que tú la cambies."
   ],
   [
    "Custom DNS servers (servidores DNS personalizados)",
    "Direcciones de servidores DNS configuradas en una VNet o una NIC que el DHCP de Azure entrega a las VM en lugar del DNS proporcionado por Azure."
   ]
  ],
  "example": "Un administrador construye DC1 en la subred 10.50.1.0/24 y configura su NIC como estática con 10.50.1.4. Dentro de Windows, el adaptador sigue en DHCP. Los servidores DNS de la VNet se cambian a 10.50.1.4 y 10.50.1.5, y después de reiniciar los servidores de aplicaciones, estos resuelven contoso.com a través de los DC y pueden unirse al dominio.",
  "tip": "Si una opción de respuesta dice que configures una IP estática en el adaptador de red del sistema operativo invitado de una VM de Azure, es la trampa. Configura la estática en la NIC en Azure; mantén el invitado en DHCP. Recuerda también las 5 direcciones reservadas por subred.",
  "check": [
   [
    "¿Cuántas direcciones utilizables proporciona una subred /27 en Azure?",
    "27 utilizables. Una /27 tiene 32 direcciones y Azure reserva 5."
   ],
   [
    "Necesitas que una VM de DC en Azure conserve 10.0.1.10 de forma permanente. ¿Dónde lo configuras?",
    "En la configuración IP de la NIC de la VM en Azure, como IP privada estática; deja el adaptador de Windows configurado para obtener una dirección automáticamente."
   ],
   [
    "¿Por qué el espacio de direcciones de una VNet no debe superponerse con tu red local si planeas una VPN de sitio a sitio?",
    "El enrutamiento no puede distinguir dos prefijos idénticos, así que el tráfico hacia direcciones superpuestas no llegaría al lado correcto."
   ]
  ]
 },
 {
  "t": "Hybrid connectivity: site-to-site and point-to-site VPN, ExpressRoute, Azure Network Adapter",
  "tt": "Conectividad híbrida: VPN de sitio a sitio y de punto a sitio, ExpressRoute, Azure Network Adapter",
  "body": [
   "Los diseños híbridos de Windows Server necesitan una ruta privada entre tu centro de datos y las VNet de Azure para que los controladores de dominio puedan replicar, los clientes puedan llegar a las aplicaciones y los administradores puedan administrar los servidores sin exponer puertos a internet. Azure ofrece cuatro opciones que debes poder comparar: VPN de sitio a sitio, VPN de punto a sitio, ExpressRoute y Azure Network Adapter en Windows Admin Center.",
   "Una VPN de sitio a sitio (S2S) conecta toda una red local a una VNet mediante un túnel IPsec/IKE cifrado a través de internet. En el lado de Azure implementas una puerta de enlace de VPN en una subred que debe llamarse `GatewaySubnet`. Creas un recurso de puerta de enlace de red local (local network gateway) que representa tu sitio: la IP pública de tu dispositivo VPN local y los prefijos de direcciones locales. Luego, un recurso de conexión une ambos usando una clave compartida. La mayoría de los diseños usan puertas de enlace basadas en rutas, que admiten enrutamiento dinámico, varios sitios y punto a sitio a la vez; las puertas de enlace basadas en directivas son para dispositivos más antiguos. Implementar una puerta de enlace tarda mucho, a menudo media hora o más, y se factura por hora.",
   "Una VPN de punto a sitio (P2S) conecta equipos individuales, no redes. Cada cliente ejecuta un cliente VPN y se autentica con un certificado, Microsoft Entra ID o RADIUS, usando protocolos como OpenVPN, IKEv2 o SSTP. P2S es adecuada para administradores remotos o para unos pocos servidores que necesitan llegar a una VNet sin tocar el enrutador corporativo.",
   "ExpressRoute es una conexión privada y dedicada desde tu red a Microsoft a través de un proveedor de conectividad. El tráfico no cruza internet público, así que obtienes una latencia más predecible, opciones de mayor ancho de banda y un SLA. El emparejamiento privado (private peering) se conecta a tus VNet a través de una puerta de enlace de ExpressRoute, y el emparejamiento de Microsoft (Microsoft peering) llega a los servicios públicos de Microsoft. Entiende que ExpressRoute es privado, pero no está cifrado de forma predeterminada; si necesitas cifrado, lo agregas, por ejemplo con IPsec sobre el circuito o MACsec en puertos directos. Un diseño resiliente común mantiene una VPN de sitio a sitio como ruta de conmutación por error para ExpressRoute.",
   "Azure Network Adapter es una característica de Windows Admin Center para conectar rápidamente un Windows Server a una VNet. Desde la herramienta Networking del servidor eliges Add Azure Network Adapter, seleccionas una VNet, y Windows Admin Center implementa (o reutiliza) una puerta de enlace de VPN y configura una conexión de punto a sitio con autenticación de certificados en ese servidor. Es ideal cuando un único servidor local necesita llegar a recursos de Azure y no quieres reconfigurar el firewall perimetral, pero no es una forma de conectar un sitio completo.",
   "Al elegir: muchos usuarios o servidores en un sitio con acceso a internet significa VPN S2S; las mayores necesidades de confiabilidad, ancho de banda o cumplimiento significan ExpressRoute; portátiles o administradores individuales significan P2S; un servidor administrado en Windows Admin Center significa Azure Network Adapter."
  ],
  "terms": [
   [
    "Site-to-site VPN (VPN de sitio a sitio)",
    "Un túnel IPsec/IKE a través de internet entre un dispositivo VPN local y una puerta de enlace de VPN de Azure, que conecta redes completas."
   ],
   [
    "Local network gateway (puerta de enlace de red local)",
    "Un recurso de Azure que describe la IP pública del dispositivo VPN local y los prefijos de direcciones locales."
   ],
   [
    "Point-to-site VPN (VPN de punto a sitio)",
    "Una VPN desde un equipo individual a una VNet, autenticada por certificado, Entra ID o RADIUS."
   ],
   [
    "ExpressRoute",
    "Una conexión privada con Microsoft a través de un proveedor de conectividad que evita internet público; no está cifrada de forma predeterminada."
   ],
   [
    "Azure Network Adapter",
    "Una característica de Windows Admin Center que conecta un único Windows Server a una VNet mediante una VPN de punto a sitio que configura por ti."
   ]
  ],
  "example": "Fabrikam conecta su sitio principal mediante el emparejamiento privado de ExpressRoute a una VNet central, con una VPN de sitio a sitio en la misma subred de puerta de enlace como respaldo. Un pequeño servidor de laboratorio que debe llegar a un recurso compartido de archivos de Azure se conecta por separado con Azure Network Adapter desde Windows Admin Center, evitando cambios en el firewall del laboratorio.",
  "tip": "Presta atención a la palabra 'cifrado': ExpressRoute por sí solo es privado, no cifrado. Y la subred de la puerta de enlace debe llamarse GatewaySubnet. Azure Network Adapter es siempre un servidor, de punto a sitio.",
  "check": [
   [
    "¿Qué recurso de Azure almacena la IP pública de tu dispositivo VPN local y tus rangos de direcciones locales?",
    "La puerta de enlace de red local (local network gateway)."
   ],
   [
    "Un equipo de cumplimiento exige que el tráfico híbrido nunca cruce internet público. ¿Qué opción lo cumple?",
    "ExpressRoute, porque usa una conexión privada a través de un proveedor de conectividad en lugar de internet; agrega cifrado si también se requiere."
   ],
   [
    "¿Qué configura Azure Network Adapter internamente?",
    "Una conexión VPN de punto a sitio desde el único Windows Server hasta una puerta de enlace de VPN de Azure en la VNet elegida, usando autenticación de certificados."
   ]
  ]
 },
 {
  "t": "Azure File Sync: sync groups, cloud and server endpoints, cloud tiering policies",
  "tt": "Azure File Sync: grupos de sincronización, puntos de conexión en la nube y de servidor, directivas de niveles en la nube",
  "body": [
   "Azure File Sync te permite seguir usando los servidores de archivos de Windows que los usuarios conocen, mientras Azure Files se convierte en la copia central y autoritativa de los datos. Cada servidor de archivos actúa como una caché local rápida. Eso te da rendimiento en las sucursales, una recuperación ante desastres sencilla (un servidor nuevo puede volver a sincronizarse desde la nube) y, con los niveles en la nube (cloud tiering), mucho menos disco local.",
   "Las piezas encajan en una jerarquía fija. En Azure creas un recurso Storage Sync Service. En cada Windows Server instalas el agente de Azure File Sync y registras el servidor en ese Storage Sync Service; un servidor solo puede estar registrado en un Storage Sync Service a la vez. Dentro del servicio creas grupos de sincronización. Un grupo de sincronización define un conjunto de datos que se mantiene sincronizado y contiene exactamente un punto de conexión en la nube y uno o más puntos de conexión de servidor.",
   "El punto de conexión en la nube es un recurso compartido de archivos de Azure en una cuenta de almacenamiento. Un punto de conexión de servidor es una ruta en un servidor registrado, como `D:\\Shares\\Sales`. Cada punto de conexión del grupo se sincroniza con todos los demás a través del punto de conexión en la nube, así que un cambio en un servidor de sucursal fluye a Azure y de ahí a las demás sucursales. Un servidor registrado puede hospedar puntos de conexión de servidor para varios grupos de sincronización distintos, pero dos puntos de conexión de servidor del mismo grupo no pueden estar en el mismo servidor, y los puntos de conexión de grupos distintos no deben superponerse en la misma ruta de volumen.",
   "Los niveles en la nube son una configuración opcional del punto de conexión de servidor. Cuando están activados, el agente mantiene los archivos de uso frecuente completos en el disco local y reemplaza los de uso poco frecuente por archivos en niveles: stubs, implementados como puntos de reanálisis (reparse points), que conservan el nombre, los atributos y la ACL, pero cuyo contenido reside solo en Azure. Cuando un usuario abre un archivo en niveles, el contenido se recupera de forma transparente. Dos directivas controlan los niveles. La directiva de espacio libre del volumen indica al agente que mantenga libre un porcentaje de todo el volumen, enviando primero a niveles los archivos menos usados para lograrlo. La directiva de fecha envía a niveles los archivos a los que no se ha accedido en un número determinado de días, independientemente del espacio libre. Cuando ambas están configuradas, la directiva de espacio libre del volumen gana si el espacio escasea. Puedes recuperar archivos manualmente con `Invoke-StorageSyncFileRecall`, lo que ayuda antes de desconectar un servidor.",
   "Algunas reglas que evalúa el examen: los niveles en la nube no son compatibles en el volumen del sistema; los cambios hechos directamente en el recurso compartido de archivos de Azure (no a través de un servidor) se detectan mediante un trabajo programado de detección de cambios que se ejecuta aproximadamente una vez al día, así que aparecen en los servidores con retraso; y las copias de seguridad deben apuntar al recurso compartido de archivos de Azure (por ejemplo, con instantáneas de Azure Backup) en lugar de a las copias en niveles de los servidores. El software antivirus y de copia de seguridad del servidor debe respetar el atributo sin conexión (offline), o provocará recuperaciones masivas.",
   "En el laboratorio registrarás un servidor, lo verás en Registered servers en el portal, agregarás un punto de conexión de servidor con el interruptor Cloud Tiering y un porcentaje de espacio libre, y luego verás cómo los archivos en el Explorador muestran el atributo sin conexión una vez que pasan a niveles."
  ],
  "terms": [
   [
    "Storage Sync Service",
    "El recurso de Azure de nivel superior al que se unen los servidores registrados y que contiene los grupos de sincronización."
   ],
   [
    "Sync group (grupo de sincronización)",
    "Una definición de un conjunto de datos sincronizado, formado por un punto de conexión en la nube y uno o más puntos de conexión de servidor."
   ],
   [
    "Cloud endpoint (punto de conexión en la nube)",
    "El recurso compartido de archivos de Azure que actúa como copia central en un grupo de sincronización; cada grupo tiene exactamente uno."
   ],
   [
    "Server endpoint (punto de conexión de servidor)",
    "Una ruta en un Windows Server registrado que participa en un grupo de sincronización."
   ],
   [
    "Cloud tiering (niveles en la nube)",
    "Una característica del punto de conexión de servidor que mantiene locales los archivos activos y reemplaza los inactivos por stubs que recuperan el contenido de Azure al accederse."
   ]
  ],
  "example": "Una firma con tres sucursales crea un grupo de sincronización por cada recurso compartido de departamento, con un punto de conexión en la nube en Azure Files y puntos de conexión de servidor en cada servidor de sucursal. Los niveles en la nube mantienen libre el 20 por ciento del volumen de datos de cada sucursal y envían a niveles los archivos sin tocar durante 60 días, de modo que los discos pequeños de las sucursales contienen solo los proyectos actuales mientras todos los archivos siguen disponibles.",
  "tip": "Exactamente un punto de conexión en la nube por grupo de sincronización; un Storage Sync Service por servidor registrado; sin niveles en la nube en el volumen del sistema. Si las directivas de espacio libre y de fecha no coinciden, gana la de espacio libre.",
  "check": [
   [
    "¿Puede un grupo de sincronización contener dos recursos compartidos de archivos de Azure?",
    "No. Un grupo de sincronización tiene exactamente un punto de conexión en la nube, que es un recurso compartido de archivos de Azure; puede tener varios puntos de conexión de servidor."
   ],
   [
    "Un usuario abre un archivo que muestra el atributo sin conexión en un servidor con niveles en la nube. ¿Qué ocurre?",
    "El agente de Azure File Sync recupera de forma transparente el contenido del archivo desde el recurso compartido de archivos de Azure, y el archivo se abre después de la descarga."
   ],
   [
    "Copias archivos directamente en el recurso compartido de archivos de Azure a través del portal. ¿Por qué no aparecen de inmediato en los servidores?",
    "Los cambios directos en el recurso compartido de Azure los encuentra un trabajo de detección de cambios que se ejecuta aproximadamente cada 24 horas, no en tiempo real."
   ]
  ]
 },
 {
  "t": "Azure Files with AD DS authentication; share-level RBAC vs NTFS permissions",
  "tt": "Azure Files con autenticación de AD DS; RBAC de nivel de recurso compartido frente a permisos NTFS",
  "body": [
   "De forma predeterminada, montas un recurso compartido de archivos de Azure con la clave de la cuenta de almacenamiento, que es como una única contraseña todopoderosa. Para un uso real como servidor de archivos, quieres que los usuarios se conecten con su identidad normal de dominio y obtengan permisos por usuario. Azure Files admite el acceso basado en identidades sobre SMB con Active Directory Domain Services (AD DS) local, Microsoft Entra Domain Services o Microsoft Entra Kerberos para identidades híbridas. Esta lección se centra en AD DS.",
   "Habilitar la autenticación de AD DS significa crear una identidad para la cuenta de almacenamiento en tu dominio. Normalmente usas el módulo de PowerShell AzFilesHybrid y ejecutas `Join-AzStorageAccount` desde una máquina unida al dominio, lo que crea una cuenta de equipo (o una cuenta de inicio de sesión de servicio) que representa la cuenta de almacenamiento en una OU que elijas y configura la cuenta de almacenamiento con la información de tu dominio. Los usuarios que accederán al recurso compartido deben estar sincronizados con Microsoft Entra ID mediante Entra Connect (o Cloud Sync), porque los permisos del recurso compartido se asignan en Azure a identidades de Entra. Los clientes necesitan llegar a la cuenta de almacenamiento por el puerto TCP 445 y deben poder obtener vales de Kerberos de un DC.",
   "Luego el acceso se comprueba en dos capas, igual que en un recurso compartido tradicional de Windows. La primera capa son los permisos de nivel de recurso compartido, establecidos con el control de acceso basado en roles de Azure (RBAC). Los roles integrados son Storage File Data SMB Share Reader (lectura), Storage File Data SMB Share Contributor (lectura, escritura, eliminación) y Storage File Data SMB Share Elevated Contributor (además, cambiar permisos NTFS). Puedes asignarlos a usuarios o grupos en el recurso compartido, o configurar un permiso predeterminado de nivel de recurso compartido que se aplique a todas las identidades autenticadas, lo que es práctico cuando quieres que NTFS haga todo el trabajo detallado.",
   "La segunda capa son los permisos de nivel de directorio y archivo: las listas de control de acceso (ACL) NTFS normales de Windows. Las estableces montando el recurso compartido y usando el Explorador de archivos o `icacls`, igual que en un servidor Windows. La configuración inicial a menudo se hace montándolo una vez con la clave de la cuenta de almacenamiento, que actúa como superusuario, o mediante un usuario con el rol Elevated Contributor. Azure File Sync también conserva estas ACL.",
   "El acceso efectivo es la combinación más restrictiva de las dos capas. Un usuario con Share Contributor pero solo Read en NTFS solo puede leer; un usuario con Full Control en NTFS pero sin rol de recurso compartido no puede conectarse en absoluto. Observa la diferencia con los roles de datos normales de Azure, como Storage Blob Data Contributor, o con el rol de administración Owner: los roles del plano de administración como Owner o Contributor te permiten configurar la cuenta de almacenamiento, pero por sí solos no conceden acceso a los datos por SMB.",
   "Al solucionar problemas, comprueba en orden: que el puerto 445 sea accesible, que la cuenta de almacenamiento esté unida a AD con el dominio correcto, que el usuario esté sincronizado con Entra ID, que exista un rol de nivel de recurso compartido (o un permiso predeterminado) y luego la ACL NTFS. El cmdlet `Debug-AzStorageAccountAuth` de AzFilesHybrid ejecuta muchas de estas comprobaciones."
  ],
  "terms": [
   [
    "AD DS authentication for Azure Files (autenticación de AD DS para Azure Files)",
    "Una configuración que representa la cuenta de almacenamiento como un objeto de AD para que los usuarios del dominio puedan acceder a los recursos compartidos SMB con Kerberos."
   ],
   [
    "Share-level permissions (permisos de nivel de recurso compartido)",
    "Roles de Azure RBAC asignados en un recurso compartido de archivos que controlan si una identidad puede conectarse y con qué acceso máximo."
   ],
   [
    "Storage File Data SMB Share Elevated Contributor",
    "El rol de recurso compartido que permite leer, escribir, eliminar y modificar permisos NTFS."
   ],
   [
    "NTFS permissions (permisos NTFS)",
    "ACL de directorios y archivos aplicadas dentro del recurso compartido, establecidas con el Explorador o icacls igual que en un servidor de archivos Windows."
   ]
  ],
  "example": "Un administrador une una cuenta de almacenamiento a contoso.com con Join-AzStorageAccount, da al grupo sincronizado Finance-Users el rol Storage File Data SMB Share Contributor en el recurso compartido de finanzas, luego lo monta y usa icacls para que Finance-Users solo pueda modificar la carpeta Reports y leer el resto. Un usuario de finanzas asigna el recurso compartido con su propio inicio de sesión y sin clave.",
  "tip": "Se aplican ambas capas y gana la más restrictiva. El acceso al recurso compartido es Azure RBAC sobre identidades de Entra sincronizadas; el control detallado es NTFS. Owner o Contributor en la cuenta de almacenamiento no da acceso a los datos por SMB.",
  "check": [
   [
    "¿Por qué los usuarios deben estar sincronizados con Microsoft Entra ID cuando Azure Files usa autenticación de AD DS?",
    "Los permisos de nivel de recurso compartido son asignaciones de roles de Azure RBAC, que se conceden a identidades de Entra; luego Kerberos valida la cuenta de AD correspondiente."
   ],
   [
    "Un usuario tiene Full Control en NTFS sobre una carpeta, pero ningún rol de nivel de recurso compartido ni permiso predeterminado de recurso compartido. ¿Qué acceso obtiene?",
    "Ninguno; sin permiso de nivel de recurso compartido no puede acceder al recurso compartido, porque ambas capas deben permitir el acceso."
   ],
   [
    "¿Qué rol de recurso compartido permite a un usuario cambiar los permisos NTFS de los archivos?",
    "Storage File Data SMB Share Elevated Contributor."
   ]
  ]
 },
 {
  "t": "SMB security: encryption, signing, SMB over QUIC, removing SMBv1",
  "tt": "Seguridad de SMB: cifrado, firma, SMB over QUIC, eliminación de SMBv1",
  "body": [
   "Server Message Block (SMB) es el protocolo detrás de los recursos compartidos de archivos de Windows, y transporta datos confidenciales y credenciales. Los atacantes lo atacan para leer el tráfico, manipularlo, retransmitir la autenticación y explotar versiones antiguas del protocolo. Windows Server te da cuatro controles principales: cifrado, firma, SMB over QUIC y la eliminación de SMB versión 1.",
   "El cifrado de SMB, disponible en SMB 3.0 y posteriores, cifra los datos de extremo a extremo entre el cliente y el servidor usando modos de AES (Advanced Encryption Standard) como AES-128-GCM y, en versiones más recientes, AES-256. Puedes habilitarlo por recurso compartido con `Set-SmbShare -Name Finance -EncryptData $true` o para todo el servidor con `Set-SmbServerConfiguration -EncryptData $true`. De forma predeterminada, un recurso compartido cifrado rechaza a los clientes que no pueden cifrar (clientes SMB 2 más antiguos); la configuración `RejectUnencryptedAccess` controla eso. El cifrado protege la confidencialidad en redes no confiables sin implementar IPsec ni hardware especial.",
   "La firma de SMB agrega una firma criptográfica a cada mensaje para que el receptor pueda detectar manipulaciones y para que un intermediario (man-in-the-middle) no pueda retransmitir una sesión. La firma no oculta los datos; demuestra la integridad y la autenticidad. La exiges con configuraciones de directiva de grupo como Microsoft network server: Digitally sign communications (always), o con `Set-SmbServerConfiguration -RequireSecuritySignature $true`. Los controladores de dominio exigen desde hace tiempo la firma para SYSVOL y NETLOGON, y las versiones recientes de Windows, incluido Windows Server 2025, exigen la firma de forma más amplia de manera predeterminada. Si una conexión está cifrada, no se necesita además la firma, ya que el cifrado ya proporciona integridad.",
   "SMB over QUIC permite a los clientes llegar a los recursos compartidos de archivos a través de internet sin una VPN. QUIC es un transporte que se ejecuta sobre el puerto UDP 443 y siempre usa TLS 1.3, así que toda la sesión SMB, incluida la autenticación, está cifrada. El servidor necesita un certificado en el que confíen los clientes, asignado con `New-SmbServerCertificateMapping`, y puedes restringir qué clientes pueden conectarse con el control de acceso de clientes. En Windows Server 2022 estaba limitado a Azure Edition; Windows Server 2025 lo lleva a sus ediciones normales. Es muy adecuado para usuarios móviles y dispositivos de sucursal donde el puerto TCP 445 está bloqueado, como suele ocurrir en las redes públicas.",
   "SMB versión 1 tiene décadas de antigüedad, carece de protecciones modernas y fue explotado por gusanos como WannaCry. No está instalado de forma predeterminada en las versiones actuales de Windows Server, pero los sistemas actualizados o más antiguos pueden tenerlo todavía. Primero audita quién lo usa con `Set-SmbServerConfiguration -AuditSmb1Access $true` y lee el registro Microsoft-Windows-SMBServer/Audit. Luego deshabilítalo con `Set-SmbServerConfiguration -EnableSMB1Protocol $false` y elimina la característica con `Uninstall-WindowsFeature FS-SMB1`. Cualquier cosa que aún necesite SMBv1, como un escáner antiguo, debe actualizarse o aislarse.",
   "Usa `Get-SmbConnection` en un cliente para ver el dialecto en uso y `Get-SmbSession` en un servidor para ver los clientes conectados."
  ],
  "terms": [
   [
    "SMB encryption (cifrado de SMB)",
    "Una característica de SMB 3.x que cifra el tráfico de archivos de extremo a extremo, habilitada por recurso compartido o para todo el servidor."
   ],
   [
    "SMB signing (firma de SMB)",
    "Firma criptográfica de los mensajes SMB que detecta manipulaciones y bloquea los ataques de retransmisión, sin ocultar el contenido."
   ],
   [
    "SMB over QUIC",
    "SMB transportado sobre QUIC en UDP 443 con TLS 1.3, que permite un acceso seguro a archivos a través de internet sin VPN."
   ],
   [
    "SMBv1",
    "El dialecto SMB original, inseguro y en desuso, que debe auditarse, deshabilitarse y eliminarse."
   ]
  ],
  "example": "Un despacho jurídico habilita el cifrado en su recurso compartido Contracts para que el tráfico que cruza un enlace de sucursal compartido sea ilegible, exige la firma en todo el dominio mediante directiva de grupo y activa la auditoría de SMBv1 durante dos semanas. El registro de auditoría muestra una copiadora antigua que usa SMBv1; después de reemplazarla, el administrador ejecuta Uninstall-WindowsFeature FS-SMB1 en todos los servidores de archivos.",
  "tip": "Firma equivale a integridad y protección contra la retransmisión; cifrado equivale a confidencialidad más integridad. SMB over QUIC significa UDP 443, TLS 1.3 y un certificado. Audita SMBv1 antes de eliminarlo.",
  "check": [
   [
    "¿Qué puerto y protocolo usa SMB over QUIC?",
    "El puerto UDP 443, usando QUIC con cifrado TLS 1.3."
   ],
   [
    "¿Impide la firma de SMB que alguien que intercepta la red lea el contenido de los archivos?",
    "No. La firma solo demuestra la integridad y la autenticidad; necesitas el cifrado de SMB para ocultar el contenido."
   ],
   [
    "¿Cómo puedes averiguar qué clientes siguen usando SMBv1 antes de deshabilitarlo?",
    "Habilitando la auditoría de acceso SMB1 con Set-SmbServerConfiguration -AuditSmb1Access $true y revisando el registro de eventos Microsoft-Windows-SMBServer/Audit."
   ]
  ]
 },
 {
  "t": "File Server Resource Manager quotas and file screens; DFS Namespaces and DFS Replication",
  "tt": "Cuotas y filtros de archivos de File Server Resource Manager; espacios de nombres DFS y DFS Replication",
  "body": [
   "File Server Resource Manager (FSRM) es un servicio de rol que te ayuda a controlar lo que se almacena en los servidores de archivos. Dos características son las que más aparecen en el examen: las cuotas y los filtros de archivos. Distributed File System (DFS) es un par aparte de servicios de rol, DFS Namespaces y DFS Replication, que dan a los usuarios una única ruta hacia recursos compartidos repartidos entre servidores y mantienen las copias sincronizadas.",
   "Las cuotas de FSRM limitan el espacio en una carpeta o volumen, a diferencia de las cuotas NTFS, que funcionan por usuario y por volumen. Una cuota estricta (hard) bloquea las escrituras una vez alcanzado el límite. Una cuota flexible (soft) nunca bloquea, solo notifica, lo que es útil para la supervisión. Las plantillas de cuota te permiten definir un límite más umbrales (por ejemplo, al 85 y al 100 por ciento) con acciones: enviar un correo electrónico, escribir un evento, ejecutar un comando o generar un informe de almacenamiento. Una cuota de aplicación automática (auto apply quota) aplica una plantilla a cada subcarpeta existente y nueva de una ruta, ideal para las carpetas particulares.",
   "Los filtros de archivos (file screens) bloquean o supervisan tipos de archivo por patrón de nombre, agrupados en grupos de archivos como Audio and Video Files o Executable Files. Un filtro activo bloquea el guardado; un filtro pasivo lo permite, pero notifica. Las excepciones de filtro de archivos permiten grupos de archivos específicos dentro de una carpeta filtrada. Recuerda que los filtros coinciden con los nombres y extensiones de archivo, no con el contenido, así que un archivo renombrado los evita. FSRM también ofrece clasificación de archivos e informes de almacenamiento; adminístralo con la consola de FSRM o con cmdlets como `New-FsrmQuota` y `New-FsrmFileScreen`.",
   "DFS Namespaces (DFS-N) crea un árbol de carpetas virtual, como `\\\\contoso.com\\Files\\Sales`, cuyas carpetas apuntan a recursos compartidos reales llamados destinos de carpeta. Un espacio de nombres basado en dominio se almacena en AD, es accesible mediante el nombre del dominio y puede tener varios servidores de espacios de nombres para la disponibilidad; un espacio de nombres independiente reside en un solo servidor, accesible por su nombre. Cuando un cliente abre una carpeta con varios destinos, obtiene una referencia (referral) que los enumera, ordenada con los destinos del propio sitio de AD del cliente en primer lugar, de modo que los usuarios usan automáticamente el servidor más cercano. Así puedes mover recursos compartidos entre servidores sin cambiar las rutas de los usuarios.",
   "DFS Replication (DFSR) mantiene las carpetas sincronizadas entre servidores usando un modelo multimaestro: los cambios en cualquier miembro se replican a los demás. Creas un grupo de replicación de servidores miembro, carpetas replicadas y conexiones que definen la topología, como concentrador y radios (hub and spoke) o malla completa. DFSR usa la compresión diferencial remota (RDC) para enviar solo los bloques modificados, una carpeta de almacenamiento provisional (staging) para preparar los archivos y una programación de ancho de banda. Durante la replicación inicial, la copia del miembro principal es la autoritativa. Los conflictos se resuelven con la regla de que gana el último en escribir, y las versiones perdedoras van a la carpeta ConflictAndDeleted. DFSR no bloquea archivos entre servidores, así que es adecuado para datos mayormente de lectura o con un solo sitio que escribe, no para archivos editados por muchos usuarios en distintos lugares a la vez.",
   "El diseño habitual los combina: una carpeta del espacio de nombres con destinos en dos servidores, mantenidos sincronizados por DFSR, para que los usuarios lleguen a la copia local y sobrevivan a la pérdida de un servidor."
  ],
  "terms": [
   [
    "Hard vs soft quota (cuota estricta frente a flexible)",
    "Una cuota estricta bloquea las escrituras al llegar al límite; una cuota flexible solo envía notificaciones."
   ],
   [
    "Active vs passive file screen (filtro de archivos activo frente a pasivo)",
    "Un filtro activo bloquea el guardado de los archivos coincidentes; un filtro pasivo lo permite, pero notifica o registra."
   ],
   [
    "Domain-based namespace (espacio de nombres basado en dominio)",
    "Un espacio de nombres DFS almacenado en AD, al que se accede mediante el nombre del dominio y hospedado en uno o más servidores de espacios de nombres."
   ],
   [
    "Referral (referencia)",
    "La lista de destinos de carpeta que un espacio de nombres DFS devuelve a un cliente, ordenada por costo de sitio para que se pruebe primero el destino más cercano."
   ],
   [
    "DFS Replication",
    "Un motor multimaestro que replica carpetas entre servidores usando compresión diferencial remota y un área de almacenamiento provisional."
   ]
  ],
  "example": "Una universidad aplica una plantilla de cuota de aplicación automática de 5 GB con alertas por correo electrónico a la raíz de las carpetas particulares Students, y un filtro de archivos activo que bloquea allí los archivos de video. Los recursos compartidos departamentales se publican como \\\\uni.edu\\Dept con destinos en dos campus mantenidos sincronizados por DFSR, de modo que cada campus lee su copia local.",
  "tip": "La estricta bloquea, la flexible avisa; el activo bloquea, el pasivo avisa. DFSR no tiene bloqueo distribuido de archivos, así que desconfía de las respuestas que lo usan para archivos editados simultáneamente en varios sitios.",
  "check": [
   [
    "Quieres que cada carpeta particular de usuario nueva bajo D:\\Home obtenga automáticamente un límite de 2 GB. ¿Qué configuras?",
    "Una cuota de aplicación automática de FSRM en D:\\Home usando una plantilla de cuota estricta de 2 GB."
   ],
   [
    "¿Cómo envía un espacio de nombres DFS a un usuario a la copia más cercana de un recurso compartido?",
    "Devuelve una referencia que ordena los destinos de carpeta por costo de sitio de AD, con los destinos del sitio del cliente primero."
   ],
   [
    "Durante la replicación inicial de DFSR, ¿qué copia gana si los archivos difieren?",
    "La copia del miembro principal es la autoritativa para la sincronización inicial."
   ]
  ]
 },
 {
  "t": "Storage Spaces resiliency and provisioning; ReFS vs NTFS; Data Deduplication",
  "tt": "Resiliencia y aprovisionamiento de Storage Spaces; ReFS frente a NTFS; desduplicación de datos",
  "body": [
   "Storage Spaces es almacenamiento definido por software integrado en Windows Server. Te permite agrupar discos comunes en un grupo de almacenamiento (storage pool) y luego crear discos virtuales (llamados espacios de almacenamiento) a partir del grupo con la resiliencia que elijas. Sustituye la necesidad de una controladora RAID de hardware en un solo servidor y es la base de Storage Spaces Direct en los clústeres.",
   "Los tipos de resiliencia intercambian capacidad por protección. Simple distribuye los datos en bandas sin redundancia; es rápido, pero cualquier falla de disco pierde datos, así que úsalo solo para datos temporales. Mirror (reflejo) guarda copias: un reflejo bidireccional almacena dos copias y sobrevive a la falla de un disco (al menos dos discos), y un reflejo de tres vías almacena tres copias y sobrevive a dos fallas (al menos cinco discos en un solo servidor). Parity (paridad) almacena datos más información de paridad, como RAID 5 o 6, usando la capacidad de forma más eficiente pero con escrituras más lentas; es adecuada para datos de archivo o secuenciales. Las columnas establecen en cuántos discos se distribuye un disco virtual, lo que afecta al rendimiento y a cuántos discos agregas a la vez al ampliarlo.",
   "El aprovisionamiento puede ser fijo o fino (thin). El aprovisionamiento fijo asigna todo el espacio por adelantado. El aprovisionamiento fino te permite crear un disco virtual más grande que el espacio libre actual del grupo, asignando solo a medida que se escriben datos; debes supervisar el grupo y agregar discos antes de que se llene. También puedes marcar discos como repuestos en caliente (hot spares) o confiar en la reconstrucción a nivel de grupo. En PowerShell, `New-StoragePool`, `New-VirtualDisk -ResiliencySettingName Mirror -ProvisioningType Thin` y `Get-PhysicalDisk -CanPool $true` son los comandos principales; un disco dañado muestra el grupo como degradado mientras los datos siguen en línea.",
   "Resilient File System (ReFS) y NTFS son los dos sistemas de archivos principales. ReFS está diseñado para volúmenes grandes y para la integridad: calcula sumas de comprobación de los metadatos (y de los datos cuando las secuencias de integridad están activadas), puede reparar automáticamente la corrupción a partir de una copia en reflejo en Storage Spaces, ofrece la clonación de bloques que hace muy rápidas las combinaciones de puntos de control VHDX y usa una longitud de datos válida dispersa para que crear o ampliar archivos VHDX fijos sea casi instantáneo. Por eso se recomienda ReFS para los volúmenes de Hyper-V y de Storage Spaces Direct. NTFS sigue siendo la opción de uso general y admite características que le faltan a ReFS, como arrancar Windows, la compresión de archivos NTFS, Encrypting File System (EFS) y las cuotas de disco por usuario. No puedes convertir entre ellos en el lugar; hay que volver a formatear y copiar.",
   "La desduplicación de datos (Data Deduplication) encuentra fragmentos de datos repetidos entre los archivos de un volumen y almacena cada fragmento una sola vez, lo que puede ahorrar mucho espacio en recursos compartidos de archivos, archivos VHDX de VDI (escritorio virtual) y destinos de copia de seguridad. Funciona como posproceso: los archivos se escriben normalmente y más tarde un trabajo de optimización programado los divide en fragmentos en un almacén de fragmentos, dejando puntos de reanálisis. Otros trabajos, la recolección de elementos no utilizados y la depuración de integridad, limpian y verifican. Habilítala por volumen con `Enable-DedupVolume -Volume E: -UsageType Default` (servidor de archivos general), `HyperV` (VDI) o `Backup`. La desduplicación no es compatible con los volúmenes del sistema o de arranque y omite los archivos más recientes que una antigüedad mínima configurable. Funciona en NTFS y, en las versiones actuales, en ReFS."
  ],
  "terms": [
   [
    "Storage pool (grupo de almacenamiento)",
    "Un grupo de discos físicos a partir del cual se crean los discos virtuales de Storage Spaces."
   ],
   [
    "Two-way vs three-way mirror (reflejo bidireccional frente a de tres vías)",
    "Resiliencia de reflejo que conserva dos copias (tolera la falla de un disco) o tres copias (tolera dos)."
   ],
   [
    "Thin provisioning (aprovisionamiento fino)",
    "Crear un disco virtual más grande que el espacio disponible y asignar capacidad solo a medida que se escriben datos."
   ],
   [
    "ReFS",
    "Resilient File System, que calcula sumas de comprobación de los metadatos (y de los datos con secuencias de integridad), se autorrepara con los reflejos de Storage Spaces y admite la clonación rápida de bloques."
   ],
   [
    "Data Deduplication (desduplicación de datos)",
    "Una característica de posproceso que almacena una sola vez por volumen los fragmentos de datos duplicados, con los tipos de uso Default, HyperV y Backup."
   ]
  ],
  "example": "Un administrador que construye un host de VDI agrupa seis SSD, crea un espacio de reflejo bidireccional con aprovisionamiento fino formateado con ReFS para los archivos VHDX de los escritorios virtuales y habilita la desduplicación con el tipo de uso HyperV. Las muchas imágenes de escritorio casi idénticas se reducen drásticamente, y una falla de disco deja el grupo degradado pero en línea hasta que se reemplaza el disco.",
  "tip": "Aprende lo que NTFS tiene y ReFS no (arranque, compresión, EFS, cuotas de disco), y nunca elijas la desduplicación para el volumen del sistema. El aprovisionamiento fino puede quedarse sin espacio real, así que necesita supervisión.",
  "check": [
   [
    "¿Qué tipo de resiliencia ofrece la mejor eficiencia de capacidad con protección y cuál es su desventaja?",
    "La paridad; usa la capacidad de forma eficiente, pero tiene escrituras aleatorias más lentas, así que es adecuada para cargas de trabajo de archivo o secuenciales."
   ],
   [
    "¿Por qué se recomienda ReFS para el almacenamiento de VHDX de Hyper-V?",
    "La clonación de bloques hace rápidas las combinaciones de puntos de control, la longitud de datos válida dispersa hace rápida la creación de VHDX fijos, y las sumas de comprobación con reparación automática protegen los volúmenes grandes."
   ],
   [
    "¿Qué tipo de uso de desduplicación es adecuado para un volumen que almacena archivos VHDX de escritorios virtuales?",
    "HyperV, el tipo de uso diseñado para cargas de trabajo de VDI."
   ]
  ]
 },
 {
  "t": "Failover clustering: validation, cluster networks, quorum models and witnesses (disk, file share, cloud), Cluster-Aware Updating",
  "tt": "Clústeres de conmutación por error: validación, redes de clúster, modelos de cuórum y testigos (disco, recurso compartido de archivos, nube), Cluster-Aware Updating",
  "body": [
   "Un clúster de conmutación por error es un grupo de servidores Windows (nodos) que juntos mantienen en ejecución los roles en clúster, como un servidor de archivos, VM de Hyper-V o SQL Server. Si un nodo falla, el clúster reinicia sus roles en un nodo superviviente. La agrupación en clústeres se ocupa de las fallas de hardware y del sistema operativo y del mantenimiento planificado; no es una copia de seguridad y no protege contra la corrupción de datos.",
   "Antes de crear un clúster ejecutas la validación con el asistente Validate a Configuration o con `Test-Cluster -Node N1,N2`. Prueba el inventario, la red, el almacenamiento y la configuración del sistema, y genera un informe. Microsoft admite un clúster solo si su configuración pasa la validación, y debes volver a ejecutarla después de cambios significativos. Las advertencias, como una única ruta de red, merecen atención; los errores deben corregirse. Luego creas el clúster con `New-Cluster -Name CLU1 -Node N1,N2 -StaticAddress 10.0.0.50`, lo que crea en AD una cuenta de equipo de objeto de nombre de clúster (CNO).",
   "Las redes de clúster son las redes que el clúster detecta en los adaptadores de los nodos. Cada una recibe un rol: solo comunicación del clúster (para latidos y tráfico interno), clúster y cliente (también transporta tráfico de clientes) o ninguno (el clúster la ignora, lo típico en redes de almacenamiento iSCSI). Tener al menos dos redes entre los nodos evita un punto único de falla para los latidos, y a la migración en vivo se le puede asignar una red preferida.",
   "El cuórum es la forma en que un clúster evita el cerebro dividido (split brain), cuando dos mitades creen que están al mando. Cada nodo obtiene un voto y un testigo puede agregar uno más; el clúster sigue funcionando solo mientras esté presente más de la mitad de los votos. Modelos que debes conocer: mayoría de nodos (sin testigo, mejor con un número impar de nodos), mayoría de nodos y disco, mayoría de nodos y recurso compartido de archivos, y mayoría de nodos con un testigo en la nube. Windows Server también usa el cuórum dinámico, que ajusta los votos a medida que los nodos salen para que el clúster pueda sobrevivir hasta el último nodo en fallas secuenciales, y el testigo dinámico, que da un voto al testigo solo cuando ayuda a que el total sea impar. La guía de Microsoft es configurar siempre un testigo.",
   "Los tipos de testigo difieren. Un testigo de disco es un pequeño disco compartido en clúster que también almacena una copia de la base de datos del clúster, así que necesita almacenamiento compartido. Un testigo de recurso compartido de archivos es un recurso compartido SMB en otro servidor; no almacena la base de datos del clúster, solo un pequeño registro, y es adecuado para clústeres de varios sitios o clústeres sin discos compartidos. Un testigo en la nube usa un blob de una cuenta de Azure Storage como desempate, solo necesita HTTPS saliente desde los nodos y es ideal cuando no tienes un tercer sitio. Configúralo con `Set-ClusterQuorum -CloudWitness -AccountName <name> -AccessKey <key>`.",
   "Cluster-Aware Updating (CAU) aplica revisiones a los nodos de uno en uno: vacía los roles de un nodo, instala las actualizaciones, lo reinicia, devuelve los roles y pasa al siguiente, manteniendo los servicios en línea. En el modo de actualización automática, un rol de clúster de CAU se ejecuta en el propio clúster según una programación. En el modo de actualización remota, inicias una ejecución de actualización desde un equipo separado con las herramientas de CAU. Antes de habilitar CAU, asegúrate de que el clúster pueda tolerar que un nodo esté caído."
  ],
  "terms": [
   [
    "Validation (validación)",
    "Las comprobaciones de hardware y configuración de Test-Cluster; se requiere un informe aprobado para que un clúster sea compatible."
   ],
   [
    "Quorum (cuórum)",
    "La mayoría de votos (nodos más testigo) que un clúster necesita para seguir funcionando, lo que evita el cerebro dividido."
   ],
   [
    "Disk witness (testigo de disco)",
    "Un pequeño disco compartido en clúster que tiene un voto y una copia de la base de datos del clúster."
   ],
   [
    "Cloud witness (testigo en la nube)",
    "Un blob de Azure Storage usado como desempate del cuórum, que solo necesita una cuenta de almacenamiento y HTTPS saliente."
   ],
   [
    "Cluster-Aware Updating",
    "Una característica que actualiza los nodos del clúster de uno en uno mientras se mueven los roles, en modo de actualización automática o remota."
   ]
  ],
  "example": "Un clúster de Hyper-V de dos nodos abarca dos salas de servidores sin un tercer sitio. Usar un testigo de disco pondría el desempate en una sala, así que el administrador configura un testigo en la nube. Cuando falla el enlace de red entre las salas, el nodo que aún puede llegar a la cuenta de Azure Storage conserva el cuórum y ejecuta las VM, mientras el otro detiene sus roles.",
  "tip": "Los clústeres de dos nodos o con un número par de nodos necesitan un testigo. Sin almacenamiento compartido o con varios sitios significa testigo de recurso compartido de archivos o en la nube; solo el testigo de disco almacena la base de datos del clúster. La actualización automática de CAU se ejecuta en el clúster; la remota, desde otra máquina.",
  "check": [
   [
    "¿Por qué es importante un testigo en un clúster de dos nodos?",
    "Con dos votos, perder un nodo o el enlace deja exactamente la mitad, que no es mayoría; el testigo aporta el tercer voto de desempate."
   ],
   [
    "¿Qué tipo de testigo almacena una copia de la base de datos del clúster?",
    "El testigo de disco. Los testigos de recurso compartido de archivos y en la nube no almacenan ninguna copia de la base de datos del clúster."
   ],
   [
    "¿Cuál es la diferencia entre el modo de actualización automática y el de actualización remota de CAU?",
    "La actualización automática agrega un rol de clúster de CAU que actualiza el clúster por sí mismo según una programación; la actualización remota se inicia a petición desde un equipo de administración separado."
   ]
  ]
 },
 {
  "t": "Storage Spaces Direct: minimum nodes, cache, resiliency; Scale-Out File Server for application data",
  "tt": "Storage Spaces Direct: nodos mínimos, caché, resiliencia; Scale-Out File Server para datos de aplicaciones",
  "body": [
   "Storage Spaces Direct (S2D) construye almacenamiento de alta disponibilidad a partir de las unidades locales de cada nodo del clúster, sin una SAN compartida ni un gabinete JBOD. Los nodos agrupan sus unidades a través de la red, normalmente con adaptadores de red RDMA (acceso directo a memoria remota) para una latencia baja, y presentan volúmenes compartidos de clúster (CSV) que cada nodo puede usar. Es una característica de la edición Datacenter.",
   "Un clúster S2D necesita al menos dos nodos y admite hasta dieciséis. Cada nodo necesita un conjunto compatible de unidades locales (no la unidad de arranque), y todos los servidores deben ser similares. Lo habilitas después de crear el clúster con `Enable-ClusterStorageSpacesDirect`, que reclama automáticamente las unidades aptas en un solo grupo. S2D puede implementarse de forma hiperconvergente, donde los mismos nodos ejecutan las VM de Hyper-V y el almacenamiento, o convergente (desagregada), donde el clúster S2D sirve almacenamiento por SMB a hosts de proceso separados.",
   "La caché se construye automáticamente a partir del tipo de unidad más rápido presente. Con NVMe más SSD, o SSD más HDD, las unidades más rápidas se convierten en caché y las más lentas en capacidad; cada unidad de caché se vincula a unidades de capacidad. En los sistemas híbridos con capacidad en HDD, la caché maneja tanto lecturas como escrituras; cuando la capacidad es SSD, la caché solo maneja escrituras, porque leer de SSD ya es rápido. Un sistema con un solo tipo de unidad, como todo NVMe, puede funcionar sin caché. Las unidades de caché no agregan capacidad utilizable.",
   "La resiliencia se decide al crear cada volumen. Un reflejo bidireccional guarda dos copias entre servidores, tiene una eficiencia del 50 por ciento y necesita al menos dos nodos. Un reflejo de tres vías guarda tres copias, tolera dos fallas simultáneas, tiene una eficiencia de alrededor del 33 por ciento y necesita al menos tres nodos; es la opción recomendada para cargas de trabajo sensibles al rendimiento. La paridad doble necesita al menos cuatro nodos y ofrece una mejor eficiencia que mejora con más nodos. La paridad acelerada por reflejo combina un nivel de reflejo para las escrituras con un nivel de paridad para la capacidad. Los clústeres de dos nodos pueden usar la resiliencia anidada para sobrevivir a la vez a la falla de una unidad y a la de un nodo. Crea volúmenes con `New-Volume -FriendlyName VM01 -FileSystem CSVFS_ReFS -StoragePoolFriendlyName S2D* -Size 2TB`.",
   "Scale-Out File Server (SOFS) es un rol de servidor de archivos en clúster diseñado para datos de aplicaciones, como archivos VHDX de Hyper-V y bases de datos de SQL Server. Sus recursos compartidos residen en CSV y están activos en todos los nodos simultáneamente, así que los clientes se conectan a cualquier nodo y la capacidad y el ancho de banda escalan horizontalmente. Los recursos compartidos usan la disponibilidad continua, de modo que la conmutación por error transparente de SMB mantiene vivos los identificadores abiertos cuando falla un nodo. SOFS se combina con S2D en el modelo convergente. No se recomienda para recursos compartidos de archivos de usuarios generales, que generan muchas operaciones de metadatos, como abrir, cerrar y renombrar archivos pequeños; para esos usa el rol File Server for general use.",
   "Cuando las preguntas del examen describan archivos de VM o de bases de datos en SMB sin tiempo de inactividad durante la falla de un nodo, piensa en SOFS; cuando describan unidades particulares de usuarios y recursos compartidos departamentales en un clúster, piensa en File Server for general use."
  ],
  "terms": [
   [
    "Storage Spaces Direct",
    "Almacenamiento definido por software que agrupa las unidades locales de 2 a 16 nodos de clúster en volúmenes de alta disponibilidad."
   ],
   [
    "Cache tier (nivel de caché)",
    "Las unidades más rápidas de un nodo S2D, usadas automáticamente para almacenar en caché las escrituras (y también las lecturas cuando las unidades de capacidad son HDD) de las unidades de capacidad más lentas."
   ],
   [
    "Cluster Shared Volume (volumen compartido de clúster)",
    "Un volumen en clúster que todos los nodos pueden leer y escribir al mismo tiempo, usado por Hyper-V y SOFS."
   ],
   [
    "Nested resiliency (resiliencia anidada)",
    "Una opción de S2D de dos nodos que sobrevive simultáneamente a la falla de un nodo y a la de una unidad."
   ],
   [
    "Scale-Out File Server",
    "Un rol de servidor de archivos en clúster activo-activo sobre CSV para datos de aplicaciones, que usa recursos compartidos SMB de disponibilidad continua."
   ]
  ],
  "example": "Una empresa construye un clúster S2D hiperconvergente de cuatro nodos con caché NVMe y capacidad SSD. Las VM críticas de SQL van en un volumen de reflejo de tres vías; un gran volumen de archivo usa paridad doble. Más tarde, se conecta un clúster de proceso separado mediante un Scale-Out File Server para que sus hosts de Hyper-V almacenen los archivos VHDX en recursos compartidos de disponibilidad continua.",
  "tip": "Mínimos: 2 nodos para S2D y reflejo bidireccional, 3 para reflejo de tres vías, 4 para paridad doble. SOFS es para datos de aplicaciones, nunca la respuesta predeterminada para las carpetas particulares de usuarios.",
  "check": [
   [
    "¿Cuál es el número mínimo de nodos para un volumen de reflejo de tres vías en S2D?",
    "Tres nodos."
   ],
   [
    "En un nodo S2D con unidades NVMe y HDD, ¿qué unidades se convierten en caché?",
    "Las unidades NVMe, porque S2D usa automáticamente el tipo de unidad más rápido como caché de las unidades de capacidad más lentas."
   ],
   [
    "¿Por qué no se recomienda Scale-Out File Server para las carpetas particulares de usuarios?",
    "Las cargas de trabajo de usuarios generan muchas operaciones de metadatos sobre archivos pequeños, que SOFS maneja mal; está optimizado para archivos de aplicaciones grandes y abiertos durante mucho tiempo, como VHDX y bases de datos."
   ]
  ]
 },
 {
  "t": "Storage Replica: synchronous vs asynchronous, server-to-server and stretch cluster; guest clustering with shared VHDX",
  "tt": "Storage Replica: sincrónica frente a asincrónica, de servidor a servidor y clúster extendido; clústeres de invitados con VHDX compartido",
  "body": [
   "Storage Replica es una característica de Windows Server que replica volúmenes a nivel de bloque a otro servidor o clúster, principalmente para la recuperación ante desastres. Como funciona por debajo del sistema de archivos, replica todo lo que hay en el volumen, incluidos los archivos abiertos, y desconoce qué aplicación escribió los bloques. Usa SMB 3 como transporte.",
   "Cada volumen replicado necesita un volumen de registro correspondiente en ambos lados; las escrituras van primero al registro y luego al volumen de datos. Las particiones de datos de origen y destino deben tener el mismo tamaño, y el volumen de destino se desmonta y no es accesible mientras es un destino de replicación. Antes de configurar, ejecuta `Test-SRTopology` para medir el rendimiento de la red y del disco y obtener un informe sobre si tu enlace puede seguir el ritmo. Creas una asociación con `New-SRPartnership`, indicando los equipos de origen y destino, los grupos de replicación y los volúmenes de datos y de registro.",
   "Storage Replica funciona en dos modos. En el modo sincrónico, una escritura solo se confirma a la aplicación después de haberse escrito en el registro tanto en el origen como en el destino. Esto da un objetivo de punto de recuperación (RPO) de cero: no se pierde ningún dato confirmado si el origen falla. El precio es que cada escritura espera el viaje de ida y vuelta, así que la replicación sincrónica necesita un enlace rápido y de baja latencia, normalmente a distancia metropolitana con un tiempo de ida y vuelta de pocos milisegundos. En el modo asincrónico, la escritura se confirma en cuanto llega al registro de origen, y los datos se envían al destino después. Tolera una latencia mayor y distancias más largas, pero el RPO no es cero; una falla puede perder las escrituras más recientes.",
   "Hay tres escenarios. De servidor a servidor replica entre dos servidores independientes. De clúster a clúster replica entre dos clústeres de conmutación por error separados. Un clúster extendido (stretch cluster) es un único clúster de conmutación por error cuyos nodos están divididos entre dos sitios, cada uno con su propio almacenamiento, y Storage Replica mantiene el almacenamiento sincronizado para que el clúster pueda conmutar por error automáticamente entre sitios. Los clústeres extendidos son el único escenario con conmutación por error automática; los demás requieren que cambies la dirección manualmente, por ejemplo con `Set-SRPartnership`. La edición Windows Server Standard incluye Storage Replica con límites en el número y el tamaño de los volúmenes, mientras que Datacenter no tiene esos límites.",
   "La agrupación en clústeres de invitados es una idea de alta disponibilidad diferente: construyes un clúster de conmutación por error a partir de máquinas virtuales, de modo que una aplicación queda protegida incluso si el sistema operativo invitado de una VM falla o necesita revisiones. Los invitados necesitan almacenamiento compartido, y en Hyper-V la forma preferida es un disco duro virtual compartido con el formato VHD Set (un archivo `.vhds`). Lo agregas a cada VM invitada en un controlador SCSI con el uso compartido habilitado. El VHD Set debe residir en un Cluster Shared Volume o en un recurso compartido de Scale-Out File Server. En comparación con el antiguo `.vhdx` compartido, los VHD Set admiten el cambio de tamaño en línea, la copia de seguridad a nivel de host e Hyper-V Replica. Las alternativas para el almacenamiento compartido de invitados son iSCSI dentro del invitado y Fibre Channel virtual."
  ],
  "terms": [
   [
    "Storage Replica",
    "Replicación de volúmenes a nivel de bloque sobre SMB 3 entre servidores o clústeres, que requiere volúmenes de datos y de registro en ambos lados."
   ],
   [
    "Synchronous replication (replicación sincrónica)",
    "Las escrituras se confirman solo después de llegar a ambos sitios, lo que da un RPO de cero pero requiere baja latencia."
   ],
   [
    "Asynchronous replication (replicación asincrónica)",
    "Las escrituras se confirman en el origen y se envían más tarde, lo que permite distancias largas con un RPO distinto de cero."
   ],
   [
    "Stretch cluster (clúster extendido)",
    "Un único clúster de conmutación por error dividido entre dos sitios con almacenamiento replicado, que admite la conmutación por error automática entre sitios."
   ],
   [
    "VHD Set",
    "El formato de disco virtual compartido .vhds para clústeres de invitados, almacenado en CSV o SOFS y compatible con el cambio de tamaño en línea y la copia de seguridad del host."
   ]
  ],
  "example": "Un hospital con dos centros de datos a 10 km de distancia construye un clúster extendido con Storage Replica en modo sincrónico para que no se pierda ninguna escritura de historiales de pacientes. También replica a un tercer sitio a 800 km de distancia usando una asociación separada de clúster a clúster en modo asincrónico, aceptando unos segundos de posible pérdida de datos para los desastres regionales.",
  "tip": "Cero pérdida de datos equivale a sincrónico y distancia corta; distancia larga equivale a asincrónico. Conmutación por error automática solo en un clúster extendido. El VHDX compartido para clústeres de invitados va en CSV o SOFS, conectado mediante SCSI.",
  "check": [
   [
    "¿Cuál es el RPO de Storage Replica sincrónico y por qué?",
    "Cero, porque la aplicación recibe la confirmación solo después de que la escritura se registra tanto en el origen como en el destino."
   ],
   [
    "¿Pueden los usuarios leer el volumen de destino mientras Storage Replica replica en él?",
    "No, el volumen de destino está desmontado e inaccesible mientras es un destino de replicación."
   ],
   [
    "¿Dónde debe almacenarse un VHD Set usado para un clúster de invitados de Hyper-V?",
    "En un Cluster Shared Volume o en un recurso compartido SMB de Scale-Out File Server."
   ]
  ]
 },
 {
  "t": "Security baselines: OSConfig on Windows Server 2025, Microsoft Security Compliance Toolkit baselines, drift control",
  "tt": "Líneas base de seguridad: OSConfig en Windows Server 2025, líneas base de Microsoft Security Compliance Toolkit, control de desviación",
  "body": [
   "Una línea base de seguridad es un grupo de configuraciones recomendadas, como reglas de contraseñas, directiva de auditoría, derechos de usuario, servicios y refuerzo de protocolos, que Microsoft ha probado para equilibrar la seguridad y la compatibilidad. Aplicar una línea base da a cada servidor un punto de partida conocido y reforzado, y comprobar contra ella muestra dónde se han desviado los servidores. Necesitas conocer dos formas de aplicarlas: Security Compliance Toolkit y, como novedad de Windows Server 2025, OSConfig.",
   "Microsoft Security Compliance Toolkit (SCT) es una descarga gratuita que contiene líneas base para Windows Server, el cliente Windows, Microsoft Edge y otros productos. Cada línea base viene como copias de seguridad de objetos de directiva de grupo, hojas de cálculo de documentación y scripts para instalarlas en la directiva local. El kit de herramientas también incluye Policy Analyzer, que compara los GPO y la directiva local efectiva con una línea base y resalta los conflictos o diferencias, y LGPO.exe, una herramienta de línea de comandos que importa configuraciones en la directiva de grupo local de máquinas que no pertenecen al dominio. En un dominio, importas las copias de seguridad de GPO de la línea base en GPO nuevos y los vinculas a las OU que contienen tus servidores miembro y controladores de dominio.",
   "OSConfig es una plataforma de configuración de seguridad integrada en Windows Server 2025 y administrada con el módulo de PowerShell Microsoft.OSConfig (instálalo con `Install-Module -Name Microsoft.OSConfig`). Incluye escenarios de línea base según el rol del servidor: controlador de dominio, servidor miembro y miembro de grupo de trabajo, además de un escenario Secured-core. Aplicas uno con un solo comando, por ejemplo `Set-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer -Default`, y puede ser necesario un reinicio. Compruebas el cumplimiento con `Get-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer`, que muestra cada configuración y si cumple. Las mismas líneas base pueden aplicarse a escala a servidores habilitados para Azure Arc mediante la configuración de máquina de Azure y Azure Policy, o verse desde Windows Admin Center.",
   "El control de desviación (drift control) es lo que convierte a OSConfig en algo más que un script puntual. Una vez aplicada una línea base, OSConfig comprueba periódicamente las configuraciones y devuelve automáticamente al valor deseado cualquiera que se haya cambiado. Eso significa que un administrador que debilita una configuración localmente, o una herramienta que la cambia, no deja el servidor fuera de cumplimiento de forma permanente. Puedes personalizar configuraciones individuales (por ejemplo, para permitir un protocolo heredado que necesita una aplicación de línea de negocio) y siguen siendo tu valor deseado bajo el control de desviación. Para dejar de administrar un escenario, elimínalo con `Remove-OSConfigDesiredConfiguration`.",
   "Cómo elegir entre ellos: la directiva de grupo con las líneas base de SCT es adecuada para entornos de dominio con administración de GPO existente y versiones anteriores de Windows Server. OSConfig es adecuado para Windows Server 2025, incluidos los servidores que no pertenecen al dominio y los servidores híbridos administrados mediante Azure Arc, y agrega la corrección integrada de la desviación. Evita administrar la misma configuración con un GPO y con OSConfig a la vez, ya que las herramientas que compiten entre sí vuelven confusa la solución de problemas.",
   "Antes de aplicar cualquier línea base en producción, pruébala en un servidor de laboratorio o piloto. Las líneas base deshabilitan protocolos antiguos y cambian derechos, lo que puede romper aplicaciones."
  ],
  "terms": [
   [
    "Security baseline (línea base de seguridad)",
    "Un conjunto de configuraciones de seguridad recomendado por Microsoft para un producto y un rol."
   ],
   [
    "Security Compliance Toolkit",
    "Un conjunto gratuito de líneas base como copias de seguridad de GPO más herramientas como Policy Analyzer y LGPO.exe."
   ],
   [
    "OSConfig",
    "Una plataforma de configuración de seguridad de Windows Server 2025, administrada con PowerShell, que aplica líneas base según el rol."
   ],
   [
    "Drift control (control de desviación)",
    "La comprobación periódica de OSConfig que restablece automáticamente a sus valores deseados las configuraciones de la línea base que cambiaron."
   ],
   [
    "Policy Analyzer",
    "Una herramienta de SCT que compara los GPO o la directiva local con las líneas base y señala las diferencias y los conflictos."
   ]
  ],
  "example": "Un equipo que implementa nuevos servidores miembro con Windows Server 2025 aplica la línea base MemberServer de OSConfig durante la compilación. Semanas después, un técnico deshabilita una configuración de refuerzo mientras soluciona un problema y olvida revertirla; el control de desviación la restablece en la siguiente comprobación y el informe de cumplimiento sigue limpio.",
  "tip": "OSConfig es Windows Server 2025 con control de desviación; SCT son copias de seguridad de GPO más Policy Analyzer y LGPO para cualquier versión compatible. Elige el escenario que coincida con el rol del servidor (DC, miembro o grupo de trabajo).",
  "check": [
   [
    "¿Qué hace el control de desviación en OSConfig?",
    "Comprueba periódicamente las configuraciones de la línea base aplicada y revierte automáticamente a los valores deseados cualquiera que se haya cambiado."
   ],
   [
    "¿Qué herramienta de SCT compara tus GPO actuales con una línea base de Microsoft?",
    "Policy Analyzer."
   ],
   [
    "¿Cómo aplicarías una línea base a una máquina con Windows Server 2019 que no pertenece al dominio usando SCT?",
    "Usando LGPO.exe (o el script de instalación local de la línea base) para importar las configuraciones de la línea base en la directiva de grupo local."
   ]
  ]
 },
 {
  "t": "Credential Guard and virtualization-based security; LSA protection",
  "tt": "Credential Guard y seguridad basada en virtualización; protección de LSA",
  "body": [
   "Los atacantes que obtienen derechos de administrador en un servidor a menudo vuelcan credenciales de la memoria del Servicio del subsistema de autoridad de seguridad local (LSASS) y luego reutilizan hashes NTLM o vales de Kerberos para moverse a otras máquinas, lo que se conoce como pass-the-hash y pass-the-ticket. Windows Server tiene dos defensas que protegen LSASS: Credential Guard, construido sobre la seguridad basada en virtualización, y la protección de LSA.",
   "La seguridad basada en virtualización (VBS) usa el hipervisor Hyper-V para crear una región de memoria aislada, llamada Virtual Secure Mode, que ni siquiera el kernel normal de Windows puede leer. El código crítico para la seguridad se ejecuta allí. Las características construidas sobre VBS incluyen Credential Guard y la integridad de memoria, también llamada integridad de código protegida por hipervisor (HVCI), que comprueba el código del kernel antes de que se ejecute. VBS requiere una CPU de 64 bits con extensiones de virtualización y traducción de direcciones de segundo nivel, firmware UEFI con arranque seguro y, idealmente, un TPM (Trusted Platform Module) para proteger sus claves. Comprueba el estado en `msinfo32`, en Virtualization-based security.",
   "Credential Guard traslada los secretos que protege LSASS, como los hashes de contraseñas NTLM y los vales de concesión de vales (TGT) de Kerberos, a un proceso aislado llamado LSAIso dentro de Virtual Secure Mode. LSASS se comunica con él mediante llamadas a procedimiento remoto, pero nunca guarda los secretos en bruto, así que las herramientas que vuelcan la memoria de LSASS no obtienen nada reutilizable. Lo habilitas con directiva de grupo (Computer Configuration, Administrative Templates, System, Device Guard, Turn On Virtualization Based Security) o mediante el registro y herramientas de administración, eligiendo si usar un bloqueo UEFI que impida deshabilitarlo de forma remota. Limitaciones que le gustan al examen: Credential Guard no es compatible con los controladores de dominio, porque no puede proteger la base de datos de AD; bloquea NTLMv1, la delegación de Kerberos sin restricciones y la delegación de credenciales guardadas para las cuentas protegidas, lo que puede romper aplicaciones antiguas; y no detiene los registradores de pulsaciones de teclas (keyloggers) ni los ataques a credenciales escritas en otras aplicaciones.",
   "La protección de LSA ejecuta el propio LSASS como un proceso protegido ligero (Protected Process Light, PPL). Entonces solo el código firmado adecuadamente puede cargarse en LSASS o abrir su memoria, así que los procesos no protegidos, incluso los que se ejecutan como administrador, no pueden inyectar código ni leer la memoria. La habilitas estableciendo el valor del registro `RunAsPPL` en `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa` (1 con un bloqueo de variable UEFI, 2 sin él), o con directiva de grupo en las versiones más recientes, y luego reiniciando. Antes de aplicarla, puedes auditar qué complementos y controladores no se cargarían; los eventos relacionados aparecen en el registro CodeIntegrity. A diferencia de Credential Guard, la protección de LSA no necesita VBS y puede usarse en los controladores de dominio.",
   "Ambas se complementan bien: la protección de LSA refuerza el proceso LSASS, y Credential Guard elimina de él por completo los secretos más valiosos. Ninguna reemplaza las buenas prácticas de acceso privilegiado, como la administración por niveles y no iniciar sesión en los servidores con cuentas de administrador de dominio."
  ],
  "terms": [
   [
    "Virtualization-based security (seguridad basada en virtualización)",
    "Aislamiento respaldado por Hyper-V que crea una región de memoria segura a la que el kernel normal del sistema operativo no puede acceder."
   ],
   [
    "Credential Guard",
    "Una característica de VBS que almacena los hashes NTLM y los TGT de Kerberos en el proceso aislado LSAIso para frustrar el volcado de credenciales."
   ],
   [
    "LSA protection (protección de LSA)",
    "Ejecutar LSASS como un proceso protegido ligero para que el código sin firmar o no protegido no pueda leer su memoria ni inyectarse en él."
   ],
   [
    "HVCI (memory integrity, integridad de memoria)",
    "Una característica de VBS que valida la integridad del código en modo kernel dentro del entorno seguro antes de que se ejecute."
   ]
  ],
  "example": "Después de un incidente de phishing, un equipo de seguridad habilita Credential Guard en todos los servidores miembro y la protección de LSA en todos los servidores, incluidos los controladores de dominio. En un ejercicio posterior de red team, un atacante con administrador local en un servidor de aplicaciones vuelca la memoria de LSASS, pero no encuentra hashes NTLM ni TGT reutilizables, así que el movimiento lateral fracasa.",
  "tip": "Credential Guard necesita VBS (UEFI, arranque seguro, extensiones de virtualización) y no es compatible con los DC; la protección de LSA (RunAsPPL) funciona en los DC y no necesita VBS.",
  "check": [
   [
    "¿Dónde residen los hashes NTLM y los TGT de Kerberos cuando Credential Guard está habilitado?",
    "En el proceso LSAIso dentro de Virtual Secure Mode, aislado del sistema operativo normal y de LSASS."
   ],
   [
    "Quieres proteger LSASS en los controladores de dominio. ¿Qué característica puedes usar?",
    "La protección de LSA (RunAsPPL), porque Credential Guard no es compatible con los controladores de dominio."
   ],
   [
    "Nombra dos requisitos de plataforma para VBS.",
    "Dos cualesquiera de: CPU de 64 bits con extensiones de virtualización y SLAT, UEFI con arranque seguro e, idealmente, un TPM."
   ]
  ]
 },
 {
  "t": "App Control for Business (WDAC) policies and audit mode; AppLocker differences",
  "tt": "Directivas de App Control for Business (WDAC) y modo de auditoría; diferencias con AppLocker",
  "body": [
   "El control de aplicaciones significa permitir que solo se ejecute código aprobado, en lugar de intentar detectar cada fragmento de código malicioso. En un servidor, donde el conjunto de software necesario es pequeño y estable, es una de las defensas más sólidas contra el ransomware y las herramientas de los atacantes. Windows ofrece dos tecnologías: App Control for Business, antes llamado Windows Defender Application Control (WDAC), y el más antiguo AppLocker.",
   "App Control for Business funciona mediante el motor de integridad de código de Windows. Una directiva, escrita en XML y compilada en un archivo binario, enumera reglas que permiten o deniegan código, y Windows comprueba cada controlador, ejecutable, DLL y host de scripts frente a ella, incluidos los controladores en modo kernel. Las reglas pueden basarse en el firmante (certificado del editor, opcionalmente el nombre y la versión del producto), un hash de archivo, una ruta de archivo, un instalador administrado (el software implementado por una herramienta de confianza como Configuration Manager se permite automáticamente) o la reputación del Intelligent Security Graph. Las opciones de reglas de la directiva controlan el comportamiento, como si el modo de auditoría está activado o si se aplica la restricción de scripts.",
   "Construyes una directiva a partir de una de las plantillas de ejemplo, como el modo predeterminado de Windows que permite Windows y el código firmado por Microsoft, usando el App Control Policy Wizard o cmdlets como `New-CIPolicy`, `Set-RuleOption` y `ConvertFrom-CIPolicy`. Las versiones actuales de Windows admiten varias directivas a la vez: directivas base y directivas complementarias que amplían una base, lo que permite que distintos equipos agreguen sus aplicaciones. Implementas con directiva de grupo, Intune, Configuration Manager o el comando `CiTool.exe` en las versiones compatibles.",
   "Empieza siempre en modo de auditoría. En modo de auditoría no se bloquea nada; en cambio, cada vez que se habría bloqueado código, Windows registra un evento (id. de evento 3076) en el registro Microsoft-Windows-CodeIntegrity/Operational, y los eventos de scripts o MSI en los registros de AppLocker. Ejecutas la carga de trabajo normal del servidor durante un tiempo, revisas los eventos, agregas reglas para el software legítimo y solo entonces cambias al modo aplicado (enforced), donde los bloqueos se registran como id. de evento 3077. Mantén una forma de revertir, como un punto de control de VM en un laboratorio, porque una directiva demasiado estricta sobre los controladores de arranque puede impedir que un servidor se inicie.",
   "AppLocker es la característica más antigua. Sus reglas también se basan en el editor, la ruta o el hash, pero solo controla el código en modo usuario, aplica reglas a usuarios o grupos específicos y requiere que el servicio Application Identity esté en ejecución. Se configura en directiva de grupo, en Application Control Policies, con colecciones de reglas para ejecutables, archivos de Windows Installer, scripts, aplicaciones empaquetadas y DLL, y tiene un modo solo de auditoría con eventos como 8003 (se habría bloqueado) y 8004 (bloqueado).",
   "Diferencias clave para el examen: App Control se aplica a todo el dispositivo, incluidos los controladores del kernel, y es el límite de seguridad que Microsoft recomienda y sigue mejorando; AppLocker se considera defensa en profundidad y no recibe características nuevas. Elige AppLocker (posiblemente junto con App Control) solo cuando necesites reglas diferentes para distintos usuarios en la misma máquina, como en un host de sesión de Escritorio remoto."
  ],
  "terms": [
   [
    "App Control for Business",
    "La característica de control de aplicaciones basada en la integridad de código de Windows, antes WDAC, que rige los controladores y el código en modo usuario en todo el dispositivo."
   ],
   [
    "Audit mode (modo de auditoría)",
    "Un modo de directiva que registra lo que se bloquearía (evento 3076) sin bloquearlo, usado para probar las directivas antes de aplicarlas."
   ],
   [
    "Supplemental policy (directiva complementaria)",
    "Una directiva de App Control que amplía una directiva base para permitir aplicaciones adicionales."
   ],
   [
    "Managed installer (instalador administrado)",
    "Una herramienta de implementación de confianza cuyo software instalado App Control permite automáticamente."
   ],
   [
    "AppLocker",
    "Una característica más antigua de control de aplicaciones en modo usuario con reglas por usuario o por grupo, que requiere el servicio Application Identity."
   ]
  ],
  "example": "Un administrador crea una directiva de App Control a partir de la plantilla predeterminada de Windows en modo de auditoría y la implementa en un servidor de archivos piloto. Después de una semana, el registro CodeIntegrity muestra el evento 3076 para el agente de copia de seguridad y una herramienta de supervisión; el administrador agrega reglas de firmante para ambos proveedores, quita la opción de auditoría, vuelve a implementar, y ahora los ejecutables no aprobados, como una herramienta de administración copiada, se bloquean con el evento 3077.",
  "tip": "¿Necesitas bloquear controladores o aplicar la directiva a todos en el dispositivo? App Control. ¿Necesitas reglas por usuario o grupo? AppLocker. Audita siempre primero, leyendo el evento 3076 antes de aplicar.",
  "check": [
   [
    "¿Qué id. de evento del registro CodeIntegrity muestra el código que habría bloqueado una directiva de App Control en modo de auditoría?",
    "El id. de evento 3076; el id. de evento 3077 indica un bloqueo real en modo aplicado."
   ],
   [
    "¿Qué servicio debe estar en ejecución para que se apliquen las reglas de AppLocker?",
    "El servicio Application Identity (AppIDSvc)."
   ],
   [
    "Un servidor de Escritorio remoto necesita aplicaciones permitidas distintas para dos grupos de usuarios. ¿Qué tecnología es adecuada?",
    "AppLocker, porque puede aplicar reglas a usuarios o grupos específicos, mientras que las directivas de App Control se aplican a todo el dispositivo."
   ]
  ]
 },
 {
  "t": "Windows LAPS: backing up local admin passwords to AD DS or Entra ID, rotation and retrieval permissions",
  "tt": "Windows LAPS: copia de seguridad de las contraseñas de administrador local en AD DS o Entra ID, rotación y permisos de recuperación",
  "body": [
   "Si todos los servidores comparten la misma contraseña del Administrador local, un servidor comprometido le da a un atacante la llave de todos ellos. Windows Local Administrator Password Solution (Windows LAPS) soluciona esto dando a cada dispositivo una contraseña de administrador local única, aleatoria y rotada periódicamente, y almacenándola de forma segura en un directorio donde las personas autorizadas pueden recuperarla. Windows LAPS está integrado en las versiones compatibles de Windows y Windows Server mediante actualizaciones; no instalas ningún agente. Reemplaza al antiguo Microsoft LAPS heredado, que se instalaba por separado, y usa atributos de AD diferentes.",
   "Cada dispositivo hace una copia de seguridad de su contraseña en un directorio, elegido por directiva: Active Directory Domain Services o Microsoft Entra ID, no en ambos a la vez. La copia de seguridad en Entra ID es adecuada para dispositivos unidos a Entra y unidos de forma híbrida, y normalmente se configura con Intune. La copia de seguridad en AD DS es adecuada para servidores unidos al dominio y normalmente se configura con directiva de grupo en Computer Configuration, Administrative Templates, System, LAPS. En los controladores de dominio, Windows LAPS también puede hacer una copia de seguridad de la contraseña del Modo de restauración de servicios de directorio (DSRM), pero solo en AD DS.",
   "Configurar la copia de seguridad en AD DS requiere algunos pasos. Primero, amplía el esquema con `Update-LapsADSchema`, que agrega los nuevos atributos msLAPS a los objetos de equipo. Segundo, da a los equipos permiso para escribir su propia contraseña con `Set-LapsADComputerSelfPermission -Identity \"OU=Servers,DC=contoso,DC=com\"`. Tercero, configura la directiva: el directorio de copia de seguridad, el nombre de la cuenta administrada si no es el Administrador integrado, la complejidad y longitud de la contraseña, y la antigüedad de la contraseña tras la cual rota. También puedes habilitar el cifrado de contraseñas, que cifra la contraseña en AD para que solo un grupo elegido (Domain Admins de forma predeterminada) pueda descifrarla; esto requiere un nivel funcional de dominio de Windows Server 2016 o superior. El cifrado también permite conservar un historial de contraseñas.",
   "Los permisos de recuperación son independientes de los permisos de escritura. En AD, concedes a un grupo el derecho a leer las contraseñas en una OU con `Set-LapsADReadPasswordPermission -Identity <OU> -AllowedPrincipals CONTOSO\\HelpDesk`, y si el cifrado está activado, ese grupo también debe ser un descifrador autorizado. Recupera con `Get-LapsADPassword -Identity SRV01 -AsPlainText` o con la pestaña LAPS del objeto de equipo en Active Directory Users and Computers. En Entra ID, la recuperación se rige por roles de Entra o roles personalizados con el permiso de lectura de credenciales locales, y las contraseñas aparecen en el dispositivo en el centro de administración de Entra o en Intune.",
   "La rotación ocurre automáticamente cuando la contraseña alcanza su antigüedad máxima. Puedes forzarla antes: ejecuta `Reset-LapsPassword` en el dispositivo, o establece la hora de caducidad en AD con `Set-LapsADPasswordExpirationTime` para que el dispositivo rote en su siguiente procesamiento de directiva. Las acciones posteriores a la autenticación pueden restablecer automáticamente la contraseña y, opcionalmente, cerrar sesión o reiniciar, después de que se usa la cuenta administrada y vence un período de gracia, de modo que una contraseña recuperada no sea utilizable durante mucho tiempo. Soluciona problemas con el registro de eventos Microsoft-Windows-LAPS/Operational y con `Invoke-LapsPolicyProcessing`."
  ],
  "terms": [
   [
    "Windows LAPS",
    "Una característica integrada de Windows que establece contraseñas de administrador local únicas y rotadas y hace copia de seguridad de ellas en AD DS o Entra ID."
   ],
   [
    "Update-LapsADSchema",
    "El cmdlet que amplía el esquema de AD con los atributos de Windows LAPS."
   ],
   [
    "Set-LapsADComputerSelfPermission",
    "Concede a los equipos de una OU permiso para escribir su propia contraseña de LAPS en AD."
   ],
   [
    "Password encryption (cifrado de contraseñas)",
    "Una opción de copia de seguridad en AD que cifra las contraseñas almacenadas para que solo los descifradores autorizados puedan leerlas; necesita el DFL de Windows Server 2016."
   ],
   [
    "Post-authentication actions (acciones posteriores a la autenticación)",
    "Restablecimiento, cierre de sesión o reinicio automáticos después de usar la cuenta administrada y de que transcurra un período de gracia."
   ]
  ],
  "example": "Un técnico del servicio de asistencia necesita administrador local en un servidor que perdió su relación de confianza con el dominio. Como al grupo HelpDesk se le concedió permiso de lectura en la OU Servers, el técnico ejecuta Get-LapsADPassword -Identity SRV07 -AsPlainText, inicia sesión localmente y repara la confianza. Dos horas después, la acción posterior a la autenticación restablece la contraseña automáticamente.",
  "tip": "Un dispositivo hace copia de seguridad en AD DS o en Entra ID, nunca en ambos. Recuerda los tres cmdlets de configuración de AD en orden: esquema, autopermiso del equipo, permiso de lectura. La copia de seguridad de la contraseña de DSRM es solo en AD.",
  "check": [
   [
    "¿Qué cmdlet permite al grupo del servicio de asistencia leer las contraseñas de LAPS de los equipos de una OU?",
    "Set-LapsADReadPasswordPermission con la OU como -Identity y el grupo como -AllowedPrincipals."
   ],
   [
    "¿Puede Windows LAPS hacer una copia de seguridad de la contraseña de DSRM de un DC en Microsoft Entra ID?",
    "No. La copia de seguridad de la contraseña de DSRM solo se admite en AD DS."
   ],
   [
    "¿Cómo puedes hacer que un servidor rote su contraseña de LAPS de inmediato?",
    "Ejecutando Reset-LapsPassword en el servidor, o estableciendo su hora de caducidad en AD con Set-LapsADPasswordExpirationTime y activando el procesamiento de directivas."
   ]
  ]
 },
 {
  "t": "Hardening domain controllers: tiered administration, Protected Users, privileged access workstations, restricting who can log on to DCs",
  "tt": "Refuerzo de controladores de dominio: administración por niveles, Protected Users, estaciones de trabajo de acceso privilegiado, restricción de quién puede iniciar sesión en los DC",
  "body": [
   "Los controladores de dominio guardan el hash de contraseña de cada cuenta, así que quien controla un DC controla el dominio. Reforzar los DC no se trata tanto de una configuración, sino de mantener las credenciales poderosas lejos de los lugares donde pueden robarse. El examen espera que conozcas cuatro ideas: la administración por niveles, el grupo Protected Users, las estaciones de trabajo de acceso privilegiado y las restricciones de inicio de sesión.",
   "La administración por niveles separa los sistemas y las cuentas de administrador según cuánto control tienen. El nivel 0 (Tier 0) es la identidad: los controladores de dominio, el propio AD y todo lo que los controla, como los servidores de Entra Connect, las entidades de certificación y las herramientas que administran los DC. El nivel 1 son los servidores y las aplicaciones. El nivel 2 son las estaciones de trabajo y los dispositivos de los usuarios. La regla es que una credencial de un nivel superior nunca debe usarse en un sistema de un nivel inferior, porque una máquina comprometida del nivel inferior podría capturarla. Un administrador de dominio nunca debe iniciar sesión en un servidor de archivos ni en una portátil del servicio de asistencia. El modelo de acceso empresarial más reciente de Microsoft describe la misma idea como plano de control, plano de administración y plano de datos o de carga de trabajo, pero el principio es idéntico.",
   "Protected Users es un grupo de seguridad global integrado que aplica protecciones adicionales a sus miembros cuando inician sesión. Los miembros no pueden autenticarse con NTLM, solo con Kerberos; Kerberos no puede usar el cifrado débil DES o RC4 para la autenticación previa; sus credenciales no se almacenan en caché, así que el inicio de sesión sin conexión no funciona; sus cuentas no pueden delegarse; y sus vales de concesión de vales de Kerberos tienen una vida útil corta y no renovable (cuatro horas de forma predeterminada). Agrega cuentas de administradores humanos, no cuentas de servicio ni cuentas de equipo, que se romperían. Prueba primero, porque las aplicaciones que necesitan NTLM o delegación fallarán para los miembros.",
   "Una estación de trabajo de acceso privilegiado (PAW) es un dispositivo dedicado y reforzado que se usa solo para tareas administrativas, sin correo electrónico ni navegación web, con un control de aplicaciones estricto y restricciones de red rigurosas. Los administradores de nivel 0 administran los DC desde una PAW de nivel 0, a menudo mediante Remote Server Administration Tools, de modo que sus credenciales nunca se escriben en una estación de trabajo expuesta a internet. Combina esto con cuentas de administrador separadas para cada nivel, distintas de la cuenta diaria del usuario.",
   "Restringir los inicios de sesión hace cumplir los niveles. En los DC, los derechos predeterminados Allow log on locally y Allow log on through Remote Desktop Services deben limitarse a los administradores de nivel 0. En las máquinas de nivel 1 y nivel 2, un GPO debe agregar Domain Admins, Enterprise Admins y otros grupos de nivel 0 a Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, Deny log on as a batch job y Deny log on as a service. Las directivas y silos de autenticación, disponibles a partir del nivel funcional de dominio 2012 R2, pueden ir más allá permitiendo que las cuentas de nivel 0 obtengan vales de Kerberos solo desde hosts especificados. Marca también las cuentas de administrador con Account is sensitive and cannot be delegated.",
   "Complementa esto con la higiene básica de los DC: no instales roles ni aplicaciones adicionales, no navegues por la web en los DC, deshabilita el servicio Print Spooler donde no se necesite, mantén pequeño el número de Domain Admins y usa DC de solo lectura en las sucursales con seguridad física débil."
  ],
  "terms": [
   [
    "Tier 0 (nivel 0)",
    "El nivel de identidad: los controladores de dominio, AD y los sistemas que los controlan; sus credenciales nunca deben exponerse en niveles inferiores."
   ],
   [
    "Protected Users",
    "Un grupo global cuyos miembros no pueden usar NTLM, DES o RC4, credenciales en caché ni delegación, y obtienen TGT de vida corta."
   ],
   [
    "Privileged access workstation (estación de trabajo de acceso privilegiado)",
    "Un dispositivo dedicado y reforzado que se usa solo para la administración de sistemas sensibles."
   ],
   [
    "Authentication policy silo (silo de directivas de autenticación)",
    "Un objeto de AD que limita dónde pueden obtener vales de Kerberos los miembros de un silo, restringiendo las cuentas privilegiadas a hosts especificados."
   ]
  ],
  "example": "Después de que una auditoría detecta que los Domain Admins inician sesión en los servidores de archivos, la empresa crea cuentas separadas de nivel 0 agregadas a Protected Users, entrega PAW de nivel 0 a tres administradores y vincula a las OU de servidores y estaciones de trabajo un GPO que deniega a Domain Admins y Enterprise Admins el inicio de sesión local, por RDP, de red, como trabajo por lotes y como servicio.",
  "tip": "Protected Users es solo para cuentas de administradores humanos; nunca agregues cuentas de servicio ni de equipo. Los derechos de denegación de inicio de sesión para los grupos de nivel 0 van en las máquinas de niveles inferiores, no en los DC.",
  "check": [
   [
    "¿Por qué un administrador de dominio no debe iniciar sesión de forma interactiva en un servidor de archivos miembro?",
    "Si ese servidor está comprometido, las credenciales del administrador podrían capturarse de su memoria, dándole al atacante el control del nivel 0; las credenciales de niveles superiores no deben tocar los niveles inferiores."
   ],
   [
    "Nombra tres efectos de agregar un usuario a Protected Users.",
    "Tres cualesquiera de: sin NTLM, sin autenticación previa de Kerberos con DES o RC4, sin credenciales en caché, sin delegación, TGT cortos y no renovables."
   ],
   [
    "¿Qué derechos de usuario configurarías con un GPO en los servidores miembro para mantener fuera a los Domain Admins?",
    "Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, y Deny log on as a batch job y as a service."
   ]
  ]
 },
 {
  "t": "Windows Defender Firewall profiles, rules and connection security (IPsec) rules",
  "tt": "Perfiles, reglas y reglas de seguridad de conexión (IPsec) de Windows Defender Firewall",
  "body": [
   "Windows Defender Firewall with Advanced Security es un firewall con estado basado en el host presente en cada Windows Server. Filtra el tráfico entrante y saliente por servidor, lo que limita el movimiento lateral incluso dentro de una red de confianza. También alberga las reglas de seguridad de conexión, que usan IPsec para autenticar y, opcionalmente, cifrar el tráfico entre equipos.",
   "El firewall tiene tres perfiles, y cada adaptador de red usa uno según la red que detecta mediante Network Location Awareness. El perfil Domain se aplica cuando el equipo puede autenticarse ante un controlador de dominio en esa red. Private se aplica a las redes que un administrador marcó como privadas. Public se aplica a todo lo demás y debe ser el más restrictivo. Cada perfil tiene su propio estado y acciones predeterminadas, que de forma predeterminada son bloquear lo entrante (a menos que una regla lo permita) y permitir lo saliente. Compruébalos con `Get-NetFirewallProfile`. Una pista común al solucionar problemas es un servidor atascado en el perfil Public porque no pudo llegar a un DC al iniciarse.",
   "Las reglas de firewall coinciden con el tráfico por programa, puerto y protocolo, grupos de servicios predefinidos (como File and Printer Sharing) o combinaciones personalizadas, con ámbito de direcciones IP locales y remotas, perfiles y tipos de interfaz. La acción de cada regla es permitir, bloquear o permitir la conexión si es segura, lo que requiere protección IPsec. Las reglas de bloqueo tienen prioridad sobre las de permiso, así que un bloqueo explícito gana incluso si otra regla permite el mismo tráfico; la excepción es una regla de permitir si es segura con la opción de invalidar las reglas de bloqueo, usada para escáneres autorizados. Crea reglas en la consola o con PowerShell, por ejemplo `New-NetFirewallRule -DisplayName \"SQL 1433\" -Direction Inbound -Protocol TCP -LocalPort 1433 -RemoteAddress 10.0.5.0/24 -Action Allow -Profile Domain`. En un dominio, implementa las reglas por GPO; la configuración de combinación de reglas decide si también se aplican las reglas de los administradores locales. El registro en `pfirewall.log` guarda los paquetes descartados para la solución de problemas.",
   "Las reglas de seguridad de conexión indican a Windows cuándo usar IPsec (Internet Protocol security) entre hosts. Los tipos de regla son aislamiento (exigir autenticación para el tráfico según la pertenencia al dominio o el estado), exención de autenticación (omitir IPsec para los hosts que no pueden usarlo, como los DC o los servidores DHCP), servidor a servidor (proteger el tráfico entre puntos de conexión específicos), túnel (entre equipos de puerta de enlace) y personalizado. Para cada una eliges si solicitar o exigir la autenticación en las conexiones entrantes y salientes, y un método de autenticación: autenticación de equipo (y opcionalmente de usuario) con Kerberos V5 para los miembros del dominio, certificados de equipo para hosts que no pertenecen al dominio o de otro bosque, o una clave precompartida, que es débil y está pensada solo para pruebas. IPsec negocia asociaciones de seguridad en modo principal (main mode, que autentica a los pares) y modo rápido (quick mode, que protege los datos); puedes ver las activas en Monitoring, Security Associations.",
   "El diseño típico de aislamiento de dominio es: un GPO con una regla de aislamiento configurada para solicitar la autenticación durante el piloto y luego exigirla en lo entrante; exenciones para los servidores de infraestructura; y reglas de firewall de permitir si es segura en los servidores sensibles para que solo los equipos autenticados del dominio, o los miembros de un grupo específico, puedan conectarse."
  ],
  "terms": [
   [
    "Firewall profile (perfil de firewall)",
    "Domain, Private o Public: un conjunto de configuraciones de firewall elegido por adaptador de red según la red detectada."
   ],
   [
    "Allow the connection if it is secure (permitir la conexión si es segura)",
    "Una acción de regla que permite el tráfico solo cuando está protegido por autenticación IPsec y, opcionalmente, cifrado."
   ],
   [
    "Connection security rule (regla de seguridad de conexión)",
    "Una regla que indica a Windows cuándo y cómo usar IPsec entre equipos, como aislamiento o servidor a servidor."
   ],
   [
    "Authentication exemption (exención de autenticación)",
    "Una regla de seguridad de conexión que exime a los hosts indicados de los requisitos de IPsec."
   ],
   [
    "Main mode and quick mode (modo principal y modo rápido)",
    "Las fases de negociación de IPsec: el modo principal autentica a los pares y el modo rápido establece la protección de los datos."
   ]
  ],
  "example": "Un servidor de aplicaciones financieras solo debe aceptar conexiones de los equipos del dominio del grupo Finance-PCs. El administrador crea una regla de aislamiento de dominio que exige la autenticación de equipo con Kerberos en lo entrante, y luego una regla de firewall de entrada en el puerto de la aplicación con la acción permitir si es segura y los equipos autorizados configurados en Finance-PCs. Una portátil que no pertenece al dominio en la misma subred ya no puede conectarse.",
  "tip": "Las reglas de bloqueo ganan a las de permiso, excepto permitir si es segura con invalidar las reglas de bloqueo. La clave precompartida es solo para pruebas. El perfil Domain necesita que la máquina se autentique ante un DC en esa red.",
  "check": [
   [
    "Una regla de entrada de permiso y una regla de entrada de bloqueo coinciden con el mismo tráfico. ¿Qué ocurre?",
    "El tráfico se bloquea, porque las reglas de bloqueo tienen prioridad sobre las de permiso (a menos que una regla de permitir si es segura tenga activada la invalidación de las reglas de bloqueo)."
   ],
   [
    "¿Qué método de autenticación IPsec es adecuado para dos servidores que no pertenecen al dominio en una DMZ de producción?",
    "Los certificados de equipo, porque Kerberos requiere pertenecer al dominio y las claves precompartidas son débiles y están pensadas solo para pruebas."
   ],
   [
    "El adaptador de un servidor del dominio muestra el perfil Public. ¿Qué debes comprobar?",
    "Si el servidor pudo llegar a un controlador de dominio y autenticarse en esa red, por ejemplo la configuración de DNS o la conectividad al iniciarse."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Servers via Defender for Cloud: onboarding Arc and Azure servers, recommendations, just-in-time VM access",
  "tt": "Microsoft Defender for Servers mediante Defender for Cloud: incorporación de servidores Arc y de Azure, recomendaciones, acceso a VM Just-In-Time",
  "body": [
   "Microsoft Defender for Cloud es el servicio de administración de la postura de seguridad en la nube y protección de cargas de trabajo de Azure. Para los servidores Windows, ya sea que se ejecuten en Azure, en el entorno local o en otra nube, te dice qué está mal configurado, cómo corregirlo y te alerta de las amenazas. El plan de pago Defender for Servers agrega características de protección de cargas de trabajo sobre la administración básica gratuita de la postura.",
   "Defender for Servers viene en dos planes. El Plan 1 se centra en la protección de puntos de conexión mediante la integración con Microsoft Defender for Endpoint, que proporciona antivirus, detección y respuesta de puntos de conexión y hallazgos de vulnerabilidades. El Plan 2 incluye todo lo del Plan 1 y agrega características como el acceso a VM Just-In-Time, la supervisión de la integridad de archivos, el examen de máquinas sin agentes y otras protecciones avanzadas de servidores. Cuando las preguntas del examen mencionan JIT o la supervisión de la integridad de archivos, la respuesta requiere el Plan 2.",
   "Incorporar las VM de Azure es sencillo: habilita Defender for Servers en la suscripción (en Environment settings) y todas sus VM quedan cubiertas, con extensiones como la integración de Defender for Endpoint implementadas automáticamente. Los servidores locales y de otras nubes se incorporan mediante Azure Arc. Una vez que instalas el agente Azure Connected Machine y el servidor aparece como un recurso de servidor habilitado para Arc en una suscripción donde el plan está activado, Defender for Cloud lo trata de forma muy parecida a una VM de Azure, aprovisionando Defender for Endpoint y evaluándolo. Por eso Arc es la respuesta estándar para llevar los servidores híbridos a Defender for Cloud.",
   "Las recomendaciones son el núcleo de la administración de la postura. Defender for Cloud evalúa continuamente los recursos frente a su punto de referencia de seguridad y enumera hallazgos como actualizaciones del sistema que faltan, protección de puntos de conexión no instalada, puertos de administración abiertos a internet o vulnerabilidades encontradas. Cada uno tiene una gravedad, recursos afectados y pasos de corrección; algunos ofrecen un botón Fix que los corrige automáticamente. Las recomendaciones se agregan en una puntuación de seguridad (secure score), así que corregir las de mayor impacto es lo que más eleva la puntuación. También puedes eximir los recursos a los que no se aplica una recomendación.",
   "El acceso a VM Just-In-Time (JIT) reduce la exposición de los puertos de administración, como RDP en TCP 3389 y SSH en TCP 22, en las VM de Azure. Cuando habilitas JIT en una VM, Defender for Cloud agrega reglas de denegación para esos puertos al grupo de seguridad de red (NSG) de la VM (o a Azure Firewall). Cuando un administrador necesita acceso, lo solicita en el portal o mediante la API, especificando el puerto, su IP de origen y una ventana de tiempo de hasta el máximo configurado. Si sus permisos de control de acceso basado en roles de Azure lo permiten, Defender for Cloud agrega temporalmente una regla de permiso para esa IP de origen y luego la elimina cuando termina la ventana. Cada solicitud se registra en el registro de actividad. JIT funciona para las VM de Azure protegidas por un NSG o Azure Firewall; no se aplica a los servidores Arc locales, que están protegidos por tus propios firewalls.",
   "En la práctica, revisa las páginas Inventory y Recommendations para detectar servidores sin protección, y la página Workload protections para configurar JIT."
  ],
  "terms": [
   [
    "Defender for Cloud",
    "El servicio de Azure de administración de la postura de seguridad y protección de cargas de trabajo para recursos de Azure, híbridos y multinube."
   ],
   [
    "Defender for Servers Plan 2",
    "El plan de protección de servidores que agrega al Plan 1 características como el acceso a VM JIT y la supervisión de la integridad de archivos."
   ],
   [
    "Recommendation (recomendación)",
    "Un hallazgo de Defender for Cloud que describe una debilidad de seguridad en un recurso y cómo corregirla."
   ],
   [
    "Secure score (puntuación de seguridad)",
    "Una medida de la postura de seguridad que aumenta a medida que corriges las recomendaciones."
   ],
   [
    "Just-in-time VM access (acceso a VM Just-In-Time)",
    "Una característica que bloquea los puertos de administración de forma predeterminada y los abre solo para solicitudes, IP de origen y ventanas de tiempo aprobadas."
   ]
  ],
  "example": "Una organización habilita Defender for Servers Plan 2 en su suscripción de producción e incorpora 40 servidores locales mediante Azure Arc. La lista de recomendaciones muestra RDP abierto a internet en dos VM de Azure; el administrador habilita JIT y, a partir de entonces, los ingenieros solicitan acceso RDP de tres horas desde la IP de su oficina, que se cierra automáticamente.",
  "tip": "Los servidores locales llegan a Defender for Cloud mediante Azure Arc. JIT y la supervisión de la integridad de archivos significan Plan 2, y JIT se aplica a las VM de Azure mediante reglas de NSG o de Azure Firewall.",
  "check": [
   [
    "¿Cómo llevas un Windows Server local a Defender for Servers?",
    "Incorporándolo a Azure Arc con el agente Connected Machine en una suscripción donde Defender for Servers esté habilitado."
   ],
   [
    "¿Qué cambia JIT en el grupo de seguridad de red de la VM?",
    "Agrega reglas de denegación para los puertos de administración protegidos y, ante solicitudes aprobadas, agrega temporalmente reglas de permiso para la IP y la ventana de tiempo del solicitante."
   ],
   [
    "¿Qué plan de Defender for Servers se necesita para el acceso a VM Just-In-Time?",
    "El Plan 2."
   ]
  ]
 },
 {
  "t": "Encryption: BitLocker on servers and Azure VM disk encryption options; SMB signing and encryption",
  "tt": "Cifrado: BitLocker en servidores y opciones de cifrado de discos de máquinas virtuales de Azure; firma y cifrado de SMB",
  "body": [
   "El cifrado protege los datos en dos estados: en reposo en los discos y en tránsito a través de la red. Para Windows Server debes conocer BitLocker para los discos locales, las distintas formas en que Azure cifra los discos de las VM, y la firma y el cifrado de SMB para el tráfico de archivos.",
   "El cifrado de unidad BitLocker cifra volúmenes completos para que un disco o un servidor robado sea ilegible. En Windows Server es una característica opcional que agregas con `Install-WindowsFeature BitLocker -IncludeAllSubFeature -IncludeManagementTools`, seguida de un reinicio. El volumen del sistema operativo normalmente está protegido por el TPM (Trusted Platform Module), que libera la clave solo si los componentes de arranque no han cambiado; los volúmenes de datos pueden usar el desbloqueo automático. Crea siempre un protector de contraseña de recuperación y haz una copia de seguridad de él, por ejemplo en AD DS mediante directiva de grupo, para poder recuperar si cambian las mediciones del TPM. Los comandos incluyen `Enable-BitLocker -MountPoint C: -TpmProtector`, `Add-BitLockerKeyProtector -RecoveryPasswordProtector` y `manage-bde -status`. Los servidores de un centro de datos que deben reiniciarse sin supervisión con una configuración protegida por PIN pueden usar BitLocker Network Unlock, que libera la clave cuando el servidor arranca en la red corporativa de confianza. BitLocker también admite Cluster Shared Volumes y es valioso para los servidores de sucursales con seguridad física débil.",
   "Los discos de las VM de Azure se cifran en varias capas. El cifrado del lado del servidor (SSE) siempre está activado para los discos administrados, cifrando los datos en reposo en el almacenamiento de Azure con claves administradas por la plataforma de forma predeterminada. Puedes cambiar a claves administradas por el cliente almacenadas en Azure Key Vault mediante un conjunto de cifrado de disco (disk encryption set), cuando la directiva exige que controles y rotes la clave. El cifrado en el host (encryption at host) extiende la protección para que el disco temporal de la VM y las cachés de los discos del sistema operativo y de datos en el host físico también estén cifrados, con los datos cifrados antes de que fluyan al almacenamiento. Azure Disk Encryption (ADE) es la opción más antigua que ejecuta BitLocker dentro del invitado Windows, con las claves guardadas en Key Vault; Microsoft ha anunciado su retirada y recomienda el cifrado en el host para las implementaciones nuevas. Las VM confidenciales agregan el cifrado de disco confidencial, que vincula las claves al TPM de la VM.",
   "Distínguelos por dónde ocurre el cifrado: SSE cifra en el servicio de almacenamiento, el cifrado en el host cifra en el host de Hyper-V antes del almacenamiento y ADE cifra dentro del sistema operativo invitado. SSE con claves de la plataforma no requiere ninguna acción; las preguntas sobre controlar tus propias claves apuntan a las claves administradas por el cliente; las preguntas sobre el disco temporal y la caché apuntan al cifrado en el host.",
   "Para los datos en tránsito entre máquinas Windows, SMB ofrece dos protecciones que viste en la lección de seguridad de SMB. La firma de SMB agrega una firma a cada mensaje, protegiendo la integridad e impidiendo los ataques de retransmisión, pero el tráfico sigue siendo legible. El cifrado de SMB (SMB 3.x) cifra la carga útil, lo que da confidencialidad e integridad, y puede exigirse por recurso compartido con `Set-SmbShare -EncryptData $true` o para todo el servidor. Las versiones más recientes de Windows exigen la firma de forma predeterminada en más casos, y la firma es innecesaria en una conexión que ya está cifrada.",
   "Un diseño completo para un servidor de archivos sensible podría ser: BitLocker en los volúmenes del servidor, cifrado de SMB en sus recursos compartidos y, si se ejecuta en Azure, claves administradas por el cliente más cifrado en el host en sus discos."
  ],
  "terms": [
   [
    "BitLocker",
    "Cifrado de volumen completo de Windows, normalmente protegido por un TPM, con contraseñas de recuperación de las que debe hacerse copia de seguridad en AD DS."
   ],
   [
    "BitLocker Network Unlock",
    "Una característica que desbloquea automáticamente los servidores protegidos con BitLocker al arrancar cuando están en la red corporativa cableada de confianza."
   ],
   [
    "Server-side encryption (cifrado del lado del servidor)",
    "Cifrado siempre activo de los discos administrados de Azure en reposo, con claves administradas por la plataforma o por el cliente."
   ],
   [
    "Encryption at host (cifrado en el host)",
    "Cifrado de Azure realizado en el host de la VM, que abarca los discos temporales y las cachés de disco, así como los datos que fluyen al almacenamiento."
   ],
   [
    "Azure Disk Encryption",
    "La opción más antigua que usa BitLocker dentro del invitado con claves en Key Vault, con retirada anunciada."
   ]
  ],
  "example": "Una empresa regulada exige controlar sus propias claves de cifrado y cifrar cada byte en el host de la VM. Para sus servidores de archivos de Azure, crea un conjunto de cifrado de disco que apunta a una clave en Key Vault para SSE administrado por el cliente, habilita el cifrado en el host en las VM y exige el cifrado de SMB en los recursos compartidos. Los servidores locales de las sucursales usan BitLocker con contraseñas de recuperación respaldadas en AD DS.",
  "tip": "La clave es dónde ocurre el cifrado: SSE en el almacenamiento (siempre activo), cifrado en el host en el host (abarca el disco temporal y la caché), ADE dentro del invitado mediante BitLocker. El control de las claves por parte del cliente significa claves administradas por el cliente en Key Vault.",
  "check": [
   [
    "¿Qué opción de Azure cifra el disco temporal y las cachés de disco de una VM sin ejecutar nada dentro del invitado?",
    "El cifrado en el host."
   ],
   [
    "¿Qué debes hacer siempre después de habilitar BitLocker en el volumen del sistema operativo de un servidor?",
    "Crear un protector de contraseña de recuperación y hacer una copia de seguridad de él, por ejemplo en AD DS, para poder recuperar el volumen si falla la validación del TPM."
   ],
   [
    "¿Están cifrados los discos administrados de Azure si no configuras nada?",
    "Sí. El cifrado del lado del servidor con claves administradas por la plataforma siempre está activado para los discos administrados."
   ]
  ]
 },
 {
  "t": "Performance Monitor counters and data collector sets; baselines; Resource Monitor",
  "tt": "Contadores de Performance Monitor y conjuntos de recopiladores de datos; líneas base; Resource Monitor",
  "body": [
   "Cuando los usuarios dicen que un servidor está lento, necesitas datos, no suposiciones. Windows Server incluye Performance Monitor para medir y registrar el rendimiento a lo largo del tiempo y Resource Monitor para una vista en vivo por proceso. Usados junto con una línea base, te permiten encontrar el verdadero cuello de botella: procesador, memoria, disco o red.",
   "Performance Monitor (`perfmon`) lee contadores de rendimiento. Cada contador se nombra como objeto, instancia y contador, como `Processor(_Total)\\% Processor Time`. Agregas contadores a un gráfico en vivo o, mejor aún, los registras. Los contadores que debes reconocer son: `Processor\\% Processor Time` (los valores altos sostenidos sugieren un cuello de botella de CPU) y `System\\Processor Queue Length` (subprocesos que esperan la CPU); `Memory\\Available MBytes` (los valores bajos indican presión de memoria) y `Memory\\Pages/sec` (paginación intensa); `PhysicalDisk\\Avg. Disk sec/Read` y `Avg. Disk sec/Write` (latencia por operación) y `Avg. Disk Queue Length`; y `Network Interface\\Bytes Total/sec` comparado con el ancho de banda del adaptador. Existen reglas generales, pero lo que se considera alto depende del hardware y la carga de trabajo, por eso importan las líneas base.",
   "Los conjuntos de recopiladores de datos (DCS) registran datos a lo largo del tiempo en archivos de registro, normalmente archivos binarios `.blg` que puedes abrir más tarde en Performance Monitor. Un DCS puede combinar contadores de rendimiento, datos de seguimiento de eventos e información de configuración del sistema. Windows incluye conjuntos de recopiladores de datos del sistema, como System Performance y System Diagnostics, que producen un informe listo para usar. Un DCS definido por el usuario te permite elegir tus propios contadores, el intervalo de muestreo, la duración, la programación y las condiciones de detención. También puedes crear una alerta de contador de rendimiento, que desencadena una acción, como registrar un evento o iniciar otro DCS, cuando un contador cruza un umbral. Desde la línea de comandos, `logman` crea e inicia recopiladores y `relog` convierte o recorta registros.",
   "Una línea base es un registro del rendimiento normal. Captúrala cuando el servidor esté sano, en momentos típicos y de máxima demanda, y repítela después de cambios importantes. Más tarde, cuando haya una queja, comparas los datos actuales con la línea base: si la latencia del disco se duplicó mientras la CPU se mantuvo igual, sabes dónde buscar. Las líneas base también respaldan la planificación de la capacidad, mostrando tendencias antes de que se conviertan en interrupciones.",
   "Resource Monitor (`resmon`) muestra el uso en tiempo real de CPU, memoria, disco y red desglosado por proceso, servicio e incluso archivo o conexión TCP. Responde preguntas como qué proceso está escribiendo en el disco, qué proceso retiene un puerto de red o quién está usando la memoria. En la pestaña CPU puedes buscar identificadores asociados para encontrar qué proceso tiene un archivo bloqueado, y usar Analyze Wait Chain para ver qué está esperando un proceso bloqueado. Task Manager es más ligero; Resource Monitor profundiza más, pero solo muestra el presente, no el historial.",
   "En tu laboratorio, crea un DCS definido por el usuario con contadores de CPU, memoria, disco y red, inicia una carga, detenla y luego abre el informe en Reports, User Defined. Busca el recurso que está saturado mientras los demás están inactivos."
  ],
  "terms": [
   [
    "Performance counter (contador de rendimiento)",
    "Una medición con nombre (objeto, instancia, contador), como Processor(_Total)\\% Processor Time."
   ],
   [
    "Data collector set (conjunto de recopiladores de datos)",
    "Una configuración guardada que registra contadores, seguimientos y datos de configuración en archivos de registro a petición o según una programación."
   ],
   [
    "Baseline (línea base)",
    "Un registro del rendimiento normal usado como referencia para la solución de problemas y la planificación de la capacidad."
   ],
   [
    "Performance counter alert (alerta de contador de rendimiento)",
    "Un tipo de DCS que realiza una acción cuando un contador cruza un umbral definido."
   ],
   [
    "Resource Monitor",
    "Una herramienta en tiempo real que muestra el uso de CPU, memoria, disco y red por proceso, con búsqueda de identificadores y análisis de la cadena de espera."
   ]
  ],
  "example": "Los usuarios informan de que los informes de un servidor SQL son lentos cada mañana. El administrador compara un conjunto de recopiladores de datos de la mañana con la línea base: la CPU y la memoria son normales, pero Avg. Disk sec/Read en el volumen de datos es varias veces mayor que en la línea base. La pestaña Disk de Resource Monitor durante el período lento muestra un trabajo de copia de seguridad que lee el mismo volumen, así que la copia de seguridad se traslada a la noche.",
  "tip": "Para el historial y las tendencias usa Performance Monitor con conjuntos de recopiladores de datos; para saber qué proceso lo está haciendo ahora mismo usa Resource Monitor. Los contadores de latencia de disco (Avg. Disk sec/Read o Write) son la señal más clara de un cuello de botella de disco.",
  "check": [
   [
    "¿Qué dos contadores indican mejor la presión de memoria?",
    "Memory\\Available MBytes con valores bajos y Memory\\Pages/sec con valores altos de forma constante."
   ],
   [
    "¿Por qué capturar una línea base cuando el servidor está sano?",
    "Para tener valores normales con los que comparar durante los problemas y poder detectar tendencias para la planificación de la capacidad."
   ],
   [
    "¿Qué herramienta te ayuda a encontrar qué proceso tiene un archivo bloqueado?",
    "Resource Monitor, usando la búsqueda Associated Handles en la pestaña CPU."
   ]
  ]
 },
 {
  "t": "Event logs, custom views and event subscriptions (Windows Event Forwarding)",
  "tt": "Registros de eventos, vistas personalizadas y suscripciones de eventos (Windows Event Forwarding)",
  "body": [
   "Windows registra lo que ocurre en un servidor en los registros de eventos, y a menudo son el primer lugar donde mirar cuando algo se rompe o cuando investigas un incidente de seguridad. Como administrador de servidores, necesitas navegar por los registros de forma eficiente, filtrarlos en vistas personalizadas y recopilar eventos de muchos servidores en un solo lugar con Windows Event Forwarding.",
   "Event Viewer agrupa los registros en Windows Logs y Applications and Services Logs. Windows Logs incluye Application (eventos de las aplicaciones), Security (eventos de auditoría, como los inicios de sesión, controlados por la directiva de auditoría), Setup, System (controladores y componentes de Windows) y Forwarded Events (eventos recopilados de otros equipos). Applications and Services Logs contiene registros por componente, como Directory Service, DNS Server, DFS Replication y muchos bajo Microsoft, Windows. Cada evento tiene un nivel (Critical, Error, Warning, Information, o auditoría correcta y errónea en Security), un origen, un id. de evento y una marca de tiempo. Entre los id. de seguridad útiles están 4624 (inicio de sesión correcto), 4625 (inicio de sesión fallido) y 4740 (cuenta bloqueada).",
   "Las vistas personalizadas son filtros guardados que pueden abarcar varios registros. Filtras por nivel, registro, origen, id. de evento, palabras clave, usuario o equipo, o escribes una consulta XPath en la pestaña XML. Server Manager crea automáticamente vistas personalizadas Server Roles para los roles instalados. Las vistas personalizadas pueden exportarse e importarse como XML para compartirlas con los compañeros. En PowerShell, `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}` hace el mismo filtrado de forma eficiente. También puedes asociar una tarea programada a un evento, por ejemplo para enviar una notificación o ejecutar un script cuando aparezca un id. específico.",
   "Windows Event Forwarding (WEF) envía eventos seleccionados desde los equipos de origen a un recopilador, donde llegan de forma predeterminada a Forwarded Events. Usa Windows Remote Management (WinRM) como transporte y el servicio Windows Event Collector en el recopilador; ejecuta `wecutil qc` en el recopilador y asegúrate de que WinRM esté habilitado en los orígenes (`winrm quickconfig`, o directiva de grupo). Una suscripción define qué eventos recopilar, de dónde y cómo.",
   "Hay dos tipos de suscripción. En una suscripción iniciada por el recopilador, enumeras los equipos de origen en la suscripción y el recopilador extrae los eventos de ellos; es adecuada para un conjunto pequeño y fijo de servidores. La cuenta que usa el recopilador debe poder leer los registros, normalmente agregándola (o la cuenta de equipo del recopilador) al grupo Event Log Readers en cada origen. En una suscripción iniciada por el origen, los orígenes envían los eventos al recopilador; los configuras con la configuración de directiva de grupo Configure target Subscription Manager, que apunta a la dirección del administrador de suscripciones del recopilador, y permites equipos por grupo en la suscripción. Escala bien a equipos numerosos o cambiantes. Para el registro Security, la cuenta Network Service de cada origen necesita acceso de lectura a ese registro.",
   "Las opciones de entrega controlan la rapidez con que llegan los eventos: Normal, Minimize Bandwidth y Minimize Latency. Comprueba el estado de la suscripción con `wecutil gr <subscription>` o con Runtime Status en el nodo Subscriptions del recopilador."
  ],
  "terms": [
   [
    "Custom view (vista personalizada)",
    "Un filtro guardado de Event Viewer sobre uno o más registros, exportable como XML."
   ],
   [
    "Windows Event Forwarding",
    "Una característica integrada que reenvía eventos seleccionados desde equipos de origen a un recopilador mediante WinRM."
   ],
   [
    "Collector-initiated subscription (suscripción iniciada por el recopilador)",
    "Una suscripción en la que el recopilador extrae eventos de los equipos enumerados en la suscripción."
   ],
   [
    "Source-initiated subscription (suscripción iniciada por el origen)",
    "Una suscripción en la que los orígenes, configurados por directiva de grupo, envían eventos al recopilador; la mejor para muchos equipos."
   ],
   [
    "Event Log Readers",
    "Un grupo local integrado cuyos miembros pueden leer los registros de eventos, usado para conceder acceso a un recopilador."
   ]
  ],
  "example": "Un equipo de seguridad quiere tener en un solo lugar cada inicio de sesión fallido de 200 servidores miembro. Configura una suscripción iniciada por el origen en un recopilador para el evento de seguridad 4625, implementa un GPO que establece el administrador de suscripciones de destino y concede a Network Service acceso de lectura al registro Security, y crea en el recopilador una vista personalizada que muestra solo los eventos 4625 ordenados por nombre de cuenta.",
  "tip": "Iniciada por el recopilador equivale a extraer de un conjunto enumerado; iniciada por el origen equivale a enviar, configurado por directiva de grupo, mejor para muchos equipos. WEF funciona sobre WinRM, y los eventos reenviados llegan al registro Forwarded Events.",
  "check": [
   [
    "¿Qué tipo de suscripción es adecuado para cientos de servidores que se agregan y se quitan con regularidad?",
    "La iniciada por el origen, porque los orígenes se configuran por directiva de grupo para enviar eventos y los equipos nuevos se unen automáticamente."
   ],
   [
    "¿Dónde aparecen de forma predeterminada los eventos reenviados en el recopilador?",
    "En el registro Forwarded Events, en Windows Logs."
   ],
   [
    "¿Qué protocolo usa Windows Event Forwarding?",
    "Windows Remote Management (WinRM), que se basa en WS-Management."
   ]
  ]
 },
 {
  "t": "Windows Admin Center alerts and System Insights predictive capacity",
  "tt": "Alertas de Windows Admin Center y capacidad predictiva de System Insights",
  "body": [
   "La supervisión debe advertirte antes de que un problema afecte a los usuarios. Windows Admin Center (WAC) te ofrece un panel basado en navegador para servidores y clústeres, con información de estado y la posibilidad de conectarse a las alertas de Azure, y System Insights agrega análisis predictivos en el propio servidor que pronostican cuándo se agotará la capacidad.",
   "Windows Admin Center es una herramienta de administración gratuita e implementada localmente que abres en un navegador. Para un servidor muestra un Overview con gráficos de CPU, memoria y red, además de herramientas para eventos, rendimiento, almacenamiento, actualizaciones y más. Para los clústeres de conmutación por error y los clústeres de Azure Local (hiperconvergentes), el panel muestra las fallas de Health Service, como una unidad dañada o un nodo caído, como alertas que puedes examinar en detalle. Como WAC no supervisa continuamente los servidores cuando nadie lo tiene abierto, para tener alertas reales lo integras con Azure Monitor. Desde la herramienta Azure hybrid services o Azure Monitor de un servidor, WAC puede conectar el servidor (normalmente mediante Azure Arc), instalar Azure Monitor Agent y configurar reglas de alerta con notificaciones por correo electrónico para condiciones como CPU alta, poco espacio en disco o un servidor que deja de enviar latidos.",
   "System Insights es una característica de Windows Server (Windows Server 2019 y posteriores) que ejecuta modelos de aprendizaje automático localmente en el servidor, usando datos de rendimiento y de eventos que el servidor ya recopila. No se envía ningún dato a la nube. Instálalo con `Install-WindowsFeature System-Insights -IncludeManagementTools` y, opcionalmente, la extensión System Insights en Windows Admin Center para una vista gráfica.",
   "System Insights incluye funcionalidades (capabilities), cada una de las cuales pronostica un recurso: CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting y volume consumption forecasting. Cada funcionalidad se ejecuta según una programación (de forma predeterminada, periódicamente) y devuelve un estado: OK, Warning, Critical, Error o None. Warning y Critical significan que el modelo predice que el recurso superará su capacidad dentro del horizonte de pronóstico, siendo Critical más pronto. Error y None suelen significar que la funcionalidad falló o que aún no tiene suficiente historial para predecir, así que dale tiempo a un servidor recién instalado para reunir datos.",
   "Lo administras con PowerShell. `Get-InsightsCapability` enumera las funcionalidades y si están habilitadas; `Invoke-InsightsCapability -Name \"CPU capacity forecasting\"` ejecuta una predicción a petición; `Get-InsightsCapabilityResult` muestra el resultado más reciente y el historial; y `Set-InsightsCapabilitySchedule` cambia cuándo se ejecuta. Con `Set-InsightsCapabilityAction` asocias un script de PowerShell que se ejecuta automáticamente cuando una funcionalidad devuelve un estado concreto, por ejemplo ejecutar un script de limpieza de disco cuando el consumo del volumen pasa a Warning. Los resultados también se escriben en el registro de eventos, así que puedes reenviarlos o generar alertas sobre ellos mediante Azure Monitor.",
   "Ten claros los roles: Windows Admin Center es la consola y puede conectar los servidores a las alertas de Azure Monitor; System Insights es un motor de predicción local; Azure Monitor es donde ocurren las alertas centralizadas y siempre activas."
  ],
  "terms": [
   [
    "Windows Admin Center",
    "Una herramienta basada en navegador e implementada localmente para administrar servidores, clústeres y servicios híbridos."
   ],
   [
    "System Insights",
    "Una característica de Windows Server que ejecuta modelos locales de aprendizaje automático para pronosticar la capacidad de los recursos."
   ],
   [
    "Capability (funcionalidad)",
    "Un módulo de predicción de System Insights, como CPU capacity forecasting o volume consumption forecasting."
   ],
   [
    "Capability action (acción de funcionalidad)",
    "Un script asociado con Set-InsightsCapabilityAction que se ejecuta automáticamente cuando una funcionalidad devuelve un estado determinado."
   ]
  ],
  "example": "Un administrador instala System Insights en un servidor de archivos muy utilizado y asocia un script de limpieza a volume consumption forecasting para el estado Warning. Tres semanas después, el pronóstico pasa a Warning para el volumen E:, el script elimina automáticamente exportaciones temporales antiguas y el evento también se envía a Azure Monitor, que envía un correo al equipo de almacenamiento para que pida más disco.",
  "tip": "System Insights predice localmente y devuelve OK, Warning, Critical, Error o None; None o Error a menudo solo significan que aún no hay suficientes datos. WAC por sí solo no es un sistema de alertas 24x7; combínalo con Azure Monitor.",
  "check": [
   [
    "¿Envía System Insights datos del servidor a Azure para su análisis?",
    "No. Sus modelos de aprendizaje automático se ejecutan localmente en el servidor usando datos que el servidor ya recopila."
   ],
   [
    "¿Qué cmdlet hace que un script se ejecute automáticamente cuando un pronóstico de System Insights pasa a Critical?",
    "Set-InsightsCapabilityAction."
   ],
   [
    "Nombra las cuatro funcionalidades predeterminadas de System Insights.",
    "CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting y volume consumption forecasting."
   ]
  ]
 },
 {
  "t": "Azure Monitor agent, data collection rules, VM insights and Log Analytics queries for hybrid servers",
  "tt": "Azure Monitor Agent, reglas de recopilación de datos, VM insights y consultas de Log Analytics para servidores híbridos",
  "body": [
   "Azure Monitor te ofrece un solo lugar para recopilar registros y métricas de las VM de Azure y de los servidores locales, consultarlos y generar alertas sobre ellos. Para Windows Server, las piezas son Azure Monitor Agent, las reglas de recopilación de datos, un área de trabajo de Log Analytics, VM insights y las consultas en Kusto Query Language (KQL).",
   "Azure Monitor Agent (AMA) es el agente actual para recopilar datos del sistema operativo invitado. Reemplazó al agente heredado de Log Analytics, también llamado Microsoft Monitoring Agent (MMA), que está retirado, así que las preguntas de migración apuntan a AMA. En las VM de Azure, AMA se instala como una extensión de VM. Los servidores locales y de otras nubes deben conectarse primero a Azure Arc, porque AMA se instala como una extensión en el servidor habilitado para Arc; no puedes instalar AMA con este fin en una máquina local que no esté en Arc. La implementación a escala normalmente se hace mediante Azure Policy.",
   "Lo que recopila AMA se define mediante reglas de recopilación de datos (DCR). Una DCR es un recurso de Azure que indica los orígenes de datos, como registros de eventos de Windows específicos y sus niveles (opcionalmente filtrados con consultas XPath, por ejemplo solo el evento de seguridad 4625), contadores de rendimiento y sus frecuencias de muestreo, o registros de texto, y los destinos, normalmente un área de trabajo de Log Analytics y, opcionalmente, Azure Monitor Metrics. Asocias una DCR con máquinas, y una máquina puede tener varias DCR, de modo que un equipo de seguridad y un equipo de operaciones pueden recopilar cada uno lo que necesita. Filtrar en la DCR ahorra costos de ingesta, porque Log Analytics factura por los datos ingeridos.",
   "VM insights es una experiencia de supervisión lista para usar. Cuando la habilitas, una DCR recopila un conjunto estándar de contadores de rendimiento en la tabla `InsightsMetrics`, y los libros (workbooks) muestran las tendencias de CPU, memoria, disco y red en todas tus VM y servidores Arc. Su característica opcional Map usa el agente de dependencias (Dependency agent) para mostrar los procesos y las conexiones de red entre máquinas, lo que ayuda a planificar migraciones y a solucionar problemas de dependencias.",
   "Los datos de un área de trabajo de Log Analytics se consultan con KQL. Las tablas comunes para servidores son `Event` (eventos de Windows), `Perf` (contadores de rendimiento), `Heartbeat` (registros de comprobación del agente) e `InsightsMetrics`. Una consulta KQL fluye desde una tabla a través de canalizaciones (pipes):",
   "```kusto\nPerf\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize avg(CounterValue) by Computer, bin(TimeGenerated, 15m)\n| render timechart\n\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n```",
   "La segunda consulta encuentra los servidores que dejaron de informar. Conviertes esas consultas en reglas de alerta de búsqueda de registros, y las alertas envían notificaciones o ejecutan automatizaciones mediante grupos de acciones. Las alertas de métricas sobre métricas de la plataforma, como la CPU de una VM de Azure, reaccionan más rápido y no necesitan agente."
  ],
  "terms": [
   [
    "Azure Monitor agent (Azure Monitor Agent)",
    "El agente actual que recopila registros y datos de rendimiento del sistema operativo invitado, implementado como extensión en las VM de Azure y los servidores Arc."
   ],
   [
    "Data collection rule (regla de recopilación de datos)",
    "Un recurso de Azure que define qué datos recopilar de las máquinas asociadas y adónde enviarlos."
   ],
   [
    "Log Analytics workspace (área de trabajo de Log Analytics)",
    "El almacén de datos de Azure Monitor para registros, consultado con KQL y facturado principalmente por ingesta."
   ],
   [
    "VM insights",
    "Una solución precompilada de Azure Monitor que muestra el rendimiento de las VM y de los servidores Arc, con un mapa de dependencias opcional."
   ],
   [
    "Action group (grupo de acciones)",
    "Un conjunto reutilizable de notificaciones y acciones desencadenadas por las alertas de Azure Monitor."
   ]
  ],
  "example": "Una empresa incorpora 60 servidores locales a Azure Arc, usa Azure Policy para instalar AMA y crea una DCR que envía los errores de System y Application más los contadores de rendimiento clave a un área de trabajo, y una segunda DCR que recopila solo los eventos de seguridad 4625 y 4740 para el SOC. Una alerta de registro sobre la consulta de Heartbeat envía un correo al administrador de guardia cuando cualquier servidor deja de informar durante 15 minutos.",
  "tip": "Los servidores híbridos necesitan Azure Arc antes de AMA. Las DCR deciden qué se recopila; filtra allí para controlar los costos. MMA es heredado; cualquier respuesta que lo instale para trabajos nuevos es incorrecta.",
  "check": [
   [
    "¿Qué debes hacer antes de instalar Azure Monitor Agent en un Windows Server local?",
    "Conectarlo a Azure Arc, porque AMA se implementa como extensión en el recurso del servidor habilitado para Arc."
   ],
   [
    "¿Cómo recopilas solo los eventos de inicio de sesión fallido en lugar de todo el registro Security?",
    "Creando una regla de recopilación de datos con un filtro XPath para el id. de evento de seguridad 4625 y asociándola con los servidores."
   ],
   [
    "¿Qué tabla de Log Analytics muestra cuándo se comunicó por última vez cada agente?",
    "La tabla Heartbeat."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity and name resolution (Test-NetConnection, Resolve-DnsName, ipconfig /flushdns)",
  "tt": "Solución de problemas de conectividad y resolución de nombres (Test-NetConnection, Resolve-DnsName, ipconfig /flushdns)",
  "body": [
   "La mayoría de las incidencias de tipo 'el servidor está caído' son en realidad problemas de red o de resolución de nombres. Un enfoque disciplinado ahorra tiempo: empieza con la configuración local, luego prueba la accesibilidad, luego el puerto específico, luego la resolución de nombres, y cambia una cosa a la vez. Windows Server te ofrece cmdlets de PowerShell y comandos clásicos para cada paso.",
   "Empieza con la configuración IP local. `ipconfig /all` o `Get-NetIPConfiguration` muestra la dirección, la máscara, la puerta de enlace predeterminada y los servidores DNS de cada adaptador. Las señales de alerta incluyen una dirección que empieza por 169.254 (APIPA, direccionamiento IP privado automático, lo que significa que DHCP falló), la falta de una puerta de enlace predeterminada o servidores DNS que apuntan a un resolvedor público en un miembro del dominio, lo que rompe las búsquedas de nombres de AD. En las VM de Azure, recuerda que el invitado debe usar DHCP y que la configuración proviene de la NIC y la VNet.",
   "Luego, prueba la accesibilidad. `Test-NetConnection` combina varias herramientas. Solo con un nombre, `Test-NetConnection srv01` resuelve el nombre y le hace ping. Con un puerto, `Test-NetConnection srv01 -Port 445` te dice si una conexión TCP tiene éxito (`TcpTestSucceeded : True`), lo que es mucho más útil que el ping, porque muchos servidores bloquean ICMP (Internet Control Message Protocol) mientras el puerto del servicio está abierto. `-TraceRoute` muestra la ruta, y `-CommonTCPPort RDP` o `SMB` ahorra escritura. Si el ping falla pero la prueba TCP tiene éxito, simplemente ICMP está bloqueado; si ambos fallan, revisa el enrutamiento, los firewalls y los grupos de seguridad de red. `tracert` y `pathping` son las herramientas clásicas de ruta, y `Get-NetTCPConnection` o `netstat -ano` muestran en qué puertos escucha un servidor.",
   "Para la resolución de nombres, `Resolve-DnsName` es el cmdlet preferido. `Resolve-DnsName srv01.contoso.com` usa la ruta normal del cliente; `-Server 10.0.0.10` consulta un servidor DNS específico, lo que te permite comparar servidores; `-Type SRV` o `-Type MX` busca otros tipos de registro, como `_ldap._tcp.dc._msdcs.contoso.com` para encontrar controladores de dominio; `-DnsOnly` omite otros métodos como LLMNR y NetBIOS; y `-NoHostsFile` ignora el archivo hosts. Recuerda que `nslookup` siempre consulta directamente a un servidor DNS, omitiendo la caché del cliente y el archivo hosts, así que puede no coincidir con lo que realmente ven las aplicaciones.",
   "La caché del cliente DNS almacena las respuestas recientes, incluidas las respuestas negativas (nombre no encontrado), durante el tiempo de vida (TTL) del registro. Después de corregir un registro, un cliente puede seguir usando la respuesta antigua o negativa hasta que caduque. `ipconfig /displaydns` o `Get-DnsClientCache` muestra la caché, e `ipconfig /flushdns` o `Clear-DnsClientCache` la vacía. `ipconfig /registerdns` hace que el cliente vuelva a registrar sus propios registros A y PTR, útil cuando falta el registro de un servidor. Revisa también el archivo hosts en `C:\\Windows\\System32\\drivers\\etc`, que anula el DNS, y las reglas de la tabla de directivas de resolución de nombres (NRPT) con `Get-DnsClientNrptPolicy`, que pueden enviar ciertos espacios de nombres a servidores específicos.",
   "Un buen orden para recordar: configuración, ping o prueba TCP por IP, prueba TCP por nombre y luego Resolve-DnsName contra cada servidor DNS. Si funciona por IP pero no por nombre, es DNS; si también falla por IP, es la red o el firewall."
  ],
  "terms": [
   [
    "Test-NetConnection",
    "Un cmdlet de PowerShell que prueba el ping, la conectividad de puertos TCP y el seguimiento de la ruta hacia un host."
   ],
   [
    "Resolve-DnsName",
    "Un cmdlet de PowerShell para búsquedas DNS que puede dirigirse a un servidor específico, un tipo de registro o una resolución solo por DNS."
   ],
   [
    "DNS client cache (caché del cliente DNS)",
    "Respuestas DNS almacenadas localmente, incluidas las negativas, que se conservan hasta que caduca su TTL; se vacía con ipconfig /flushdns."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing (direccionamiento IP privado automático): una dirección 169.254.x.x que Windows asigna cuando DHCP falla."
   ],
   [
    "Hosts file (archivo hosts)",
    "Un archivo local que asigna nombres a IP y que tiene prioridad sobre las consultas DNS en la ruta de resolución del cliente."
   ]
  ],
  "example": "Los usuarios no pueden abrir \\\\files01\\share después de que el servidor se movió a una IP nueva. Test-NetConnection a la IP nueva en el puerto 445 tiene éxito, pero Resolve-DnsName files01 en un cliente devuelve la IP antigua. Resolve-DnsName -Server contra cada DC muestra que un servidor DNS aún tiene el registro antiguo; después de corregir la replicación y ejecutar ipconfig /flushdns en los clientes, el acceso se restablece.",
  "tip": "Funciona por IP pero no por nombre significa DNS. Que el ping falle no demuestra que un servicio esté caído; prueba el puerto. nslookup omite la caché del cliente y el archivo hosts, así que usa Resolve-DnsName para ver lo que ven las aplicaciones.",
  "check": [
   [
    "¿Cómo compruebas si un servidor remoto acepta conexiones en TCP 3389?",
    "Ejecuta Test-NetConnection <server> -Port 3389 y revisa TcpTestSucceeded."
   ],
   [
    "Un registro DNS se corrigió, pero un cliente sigue obteniendo 'nombre no encontrado'. ¿Por qué y cómo lo solucionas?",
    "El cliente almacenó en caché la respuesta negativa; ejecuta ipconfig /flushdns (o Clear-DnsClientCache) para borrarla."
   ],
   [
    "¿Cómo puedes pedir a un servidor DNS específico los registros SRV que localizan los controladores de dominio?",
    "Resolve-DnsName _ldap._tcp.dc._msdcs.contoso.com -Type SRV -Server <DNS server IP>."
   ]
  ]
 },
 {
  "t": "Windows Update, time service (w32tm) and Kerberos troubleshooting; Arc agent and extension troubleshooting (azcmagent check)",
  "tt": "Solución de problemas de Windows Update, del servicio de hora (w32tm) y de Kerberos; solución de problemas del agente y las extensiones de Arc (azcmagent check)",
  "body": [
   "Esta lección agrupa cuatro áreas comunes de solución de problemas: actualizaciones que fallan, relojes que se desfasan, fallas de autenticación de Kerberos (a menudo causadas por los relojes) y agentes de Azure Arc que dejan de informar.",
   "Cuando Windows Update falla, lee primero el código de error en Settings o en Azure Update Manager y luego revisa los registros. `Get-WindowsUpdateLog` combina los archivos de seguimiento de las actualizaciones en un `WindowsUpdate.log` legible en tu escritorio. El registro System y el registro operativo WindowsUpdateClient también registran las instalaciones y las fallas. Confirma que los servicios Windows Update (wuauserv) y Background Intelligent Transfer Service (BITS) pueden ejecutarse y que el servidor puede llegar a su origen de actualizaciones, ya sea Microsoft Update o un servidor WSUS configurado por directiva de grupo. Si se sospecha una corrupción del almacén de componentes, ejecuta `DISM /Online /Cleanup-Image /RestoreHealth` seguido de `sfc /scannow`. Como último recurso, detén los servicios de actualización y renombra la carpeta SoftwareDistribution para que Windows reconstruya su caché de descargas.",
   "La hora importa porque Kerberos rechaza las solicitudes cuando los relojes del cliente y del servidor difieren en más de la tolerancia máxima, cinco minutos de forma predeterminada. En un bosque de AD, la hora fluye por una jerarquía: los miembros se sincronizan con un DC de su dominio, los DC se sincronizan con el emulador de PDC de su dominio, y el emulador de PDC del dominio raíz del bosque es la fuente autoritativa, que configuras para sincronizarse con una fuente externa confiable, por ejemplo `w32tm /config /manualpeerlist:\"time.example.org\" /syncfromflags:manual /reliable:yes /update`. Comprobaciones útiles son `w32tm /query /status` y `w32tm /query /source` (con qué me estoy sincronizando), `w32tm /resync` y `w32tm /stripchart /computer:dc01` (desfase respecto a otro equipo). Un error clásico es un DC virtualizado que sincroniza la hora con su host de Hyper-V mediante el servicio de integración de sincronización de hora en lugar de la jerarquía del dominio; si el origen de un DC muestra el host de VM, corrígelo.",
   "Para los problemas de Kerberos, revisa primero la hora, luego el DNS (los clientes deben encontrar los DC mediante registros SRV) y luego los nombres de entidad de seguridad de servicio (SPN). `klist` muestra los vales que tiene un usuario y `klist purge` los borra para que puedas volver a probar después de los cambios, como una nueva pertenencia a un grupo. Los SPN duplicados o faltantes provocan fallas de autenticación o el recurso a NTLM; encuentra los duplicados con `setspn -X` y consulta con `setspn -Q`. En los DC, los eventos de seguridad 4768 (TGT solicitado), 4769 (vale de servicio solicitado) y 4771 (falló la autenticación previa) revelan los códigos de error.",
   "Los servidores habilitados para Azure Arc ejecutan el agente Connected Machine, cuya herramienta de línea de comandos es `azcmagent`. `azcmagent show` informa el estado del agente, el id. del recurso y si está Connected o Disconnected. `azcmagent check` prueba la conectividad de red con los puntos de conexión de Azure que necesitan el agente y las extensiones, lo que expone rápidamente un bloqueo del firewall o del proxy. `azcmagent logs` recopila los registros en un zip para su análisis. Los registros del agente se encuentran en `C:\\ProgramData\\AzureConnectedMachineAgent\\Log` (por ejemplo `himds.log` y `azcmagent.log`), y los registros de las extensiones en `C:\\ProgramData\\GuestConfig\\extension_logs`. Comprueba que se estén ejecutando los servicios Azure Hybrid Instance Metadata Service (himds), Guest Configuration Arc Service y Guest Configuration Extension Service. Si el servidor usa un proxy, configúralo con `azcmagent config set proxy.url` seguido de la dirección de tu proxy. Una extensión con errores, como Azure Monitor Agent, a menudo solo necesita quitarse y volver a instalarse desde el portal después de corregir el problema subyacente."
  ],
  "terms": [
   [
    "Get-WindowsUpdateLog",
    "Un cmdlet que convierte los archivos de seguimiento de Windows Update en un WindowsUpdate.log legible."
   ],
   [
    "PDC emulator (forest root) (emulador de PDC de la raíz del bosque)",
    "La fuente de hora autoritativa de un bosque de AD, que debe sincronizarse con una fuente de hora externa confiable."
   ],
   [
    "w32tm",
    "La herramienta de línea de comandos para configurar, consultar y volver a sincronizar el servicio de hora de Windows."
   ],
   [
    "klist",
    "Un comando que enumera o purga los vales de Kerberos almacenados en caché para la sesión de inicio actual."
   ],
   [
    "azcmagent check",
    "Un comando del agente de Arc que prueba la conectividad con los puntos de conexión de Azure requeridos por el agente y sus extensiones."
   ]
  ],
  "example": "Los usuarios de un sitio no pueden acceder a los recursos compartidos de archivos y ven errores de Kerberos. En su DC, w32tm /query /source muestra 'VM IC Time Synchronization Provider' y el reloj tiene un desfase de siete minutos. El administrador desactiva el servicio de integración de sincronización de hora de Hyper-V para esa VM de DC, vuelve a sincronizar con la jerarquía del dominio con w32tm /resync y, después de ejecutar klist purge en un cliente, el acceso funciona.",
  "tip": "Una falla de Kerberos más un desfase de reloj de más de 5 minutos es un escenario clásico del examen; la solución es la jerarquía de hora anclada en el emulador de PDC de la raíz del bosque. Para el estado desconectado de Arc, ejecuta primero azcmagent show y azcmagent check.",
  "check": [
   [
    "¿Qué DC debe sincronizar la hora con una fuente externa en un bosque de AD?",
    "El emulador de PDC del dominio raíz del bosque."
   ],
   [
    "Un servidor Arc aparece como Disconnected en el portal. ¿Qué comando prueba si puede llegar a los puntos de conexión de Azure requeridos?",
    "azcmagent check."
   ],
   [
    "Se agregó un usuario a un grupo, pero sigue sin poder acceder a un recurso. ¿Qué paso rápido de Kerberos ayuda sin cerrar sesión?",
    "Ejecutar klist purge para borrar los vales en caché, de modo que se soliciten vales nuevos con la pertenencia a grupos actualizada."
   ]
  ]
 },
 {
  "t": "Azure VM troubleshooting: boot diagnostics, Serial Console, Run Command, redeploy",
  "tt": "Solución de problemas de máquinas virtuales de Azure: diagnósticos de arranque, Serial Console, Run Command, reimplementación",
  "body": [
   "Con un servidor físico puedes acercarte a la consola. Con una VM de Azure no puedes, así que Azure te da equivalentes remotos. Cuando una VM con Windows Server no arranca correctamente o no puedes conectarte por RDP (Protocolo de escritorio remoto), debes saber qué herramienta usar: diagnósticos de arranque, Serial Console, Run Command o reimplementación (redeploy).",
   "Los diagnósticos de arranque (boot diagnostics) capturan una captura de pantalla de la VM y la salida del registro serie durante el arranque, almacenadas en una cuenta de almacenamiento (una administrada por Microsoft es la opción predeterminada más sencilla). En el portal, la hoja Boot diagnostics de la VM muestra la captura de pantalla, de modo que puedes ver un error de detención en pantalla azul, una actualización de Windows atascada en un porcentaje, una ejecución de CHKDSK o una pantalla 'Preparing Windows'. Eso te dice si el problema es que el sistema operativo no arranca o si está en la capa de red o de RDP. Es lo primero que debes mirar cuando una VM está en ejecución pero es inaccesible, y debe estar habilitado para que funcione Serial Console.",
   "Serial Console te da una consola de texto conectada al puerto serie de la VM, independiente de la red de la VM. En Windows se conecta a la Consola de administración especial (SAC), donde escribes `cmd` y luego `ch -si 1` para abrir un canal de comandos, e inicias sesión con una cuenta local que tenga contraseña. Desde allí puedes ejecutar `ipconfig`, corregir reglas de firewall con `netsh`, volver a habilitar RDP en el registro, restablecer la configuración de red o iniciar servicios. Necesita los diagnósticos de arranque habilitados y los permisos de Azure adecuados (VM Contributor o superior). Serial Console es ideal cuando no puedes entrar por la red en absoluto.",
   "Run Command ejecuta scripts dentro de la VM mediante el agente de VM de Azure, sin necesidad de acceso de red ni de RDP. El portal ofrece comandos integrados para Windows como `RunPowerShellScript`, `EnableRemotePS`, `ResetRDPCert`, `IPConfig` y `EnableAdminAccount`, o puedes ejecutar tu propio script de PowerShell. Requiere que el agente de VM esté instalado y en buen estado, y solo puede ejecutarse un comando a la vez. Para los problemas de RDP también existen Reset password y Reset configuration only (que restablece la configuración de RDP) en la hoja Help de la VM, ambos usando la extensión VMAccess.",
   "La reimplementación (redeploy) traslada la VM a un nuevo host de Hyper-V en la infraestructura de Azure y la vuelve a encender, conservando sus discos y su configuración. Úsala cuando sospeches un problema con el host subyacente, como una VM que no se inicia o que no es accesible aunque el sistema operativo parezca estar bien. Conoce los efectos secundarios: se pierden los datos del disco temporal (normalmente D:), y las direcciones IP dinámicas asociadas a la interfaz de red pueden actualizarse. Reapply es una opción más suave que vuelve a ejecutar el estado de aprovisionamiento de la VM para corregir un estado con errores sin moverla.",
   "Cuando nada de esto funciona, el recurso final es conectar una copia del disco del sistema operativo a una VM de rescate (los comandos az vm repair lo automatizan) y repararlo sin conexión. Y no olvides el lado de la red: IP flow verify y las reglas de seguridad efectivas de Network Watcher muestran si un grupo de seguridad de red está bloqueando RDP."
  ],
  "terms": [
   [
    "Boot diagnostics (diagnósticos de arranque)",
    "Una característica que captura la captura de pantalla y el registro serie de la VM durante el arranque para la solución de problemas."
   ],
   [
    "Serial Console",
    "Una consola de texto al puerto serie de la VM que llega a la Consola de administración especial de Windows sin red."
   ],
   [
    "Run Command",
    "Una característica que ejecuta scripts dentro de la VM mediante el agente de VM de Azure, sin acceso de red."
   ],
   [
    "Redeploy (reimplementación)",
    "Trasladar una VM a un nuevo host de Azure conservando sus discos; se pierden los datos del disco temporal."
   ],
   [
    "SAC",
    "Special Administration Console (Consola de administración especial): la consola en modo texto de Windows accesible mediante Serial Console."
   ]
  ],
  "example": "Después de que un administrador endureció las reglas de Windows Firewall, nadie puede conectarse por RDP a una VM de DC en Azure. Los diagnósticos de arranque muestran una pantalla de inicio de sesión normal, así que el sistema operativo está bien. El administrador usa Run Command con RunPowerShellScript para agregar una regla de entrada para TCP 3389 desde la subred de administración, y RDP vuelve a funcionar sin reiniciar.",
  "tip": "Mira primero los diagnósticos de arranque para separar los problemas del sistema operativo de los problemas de red. Serial Console necesita los diagnósticos de arranque y una contraseña local; Run Command necesita un agente de VM en buen estado; la reimplementación pierde el disco temporal.",
  "check": [
   [
    "¿Qué debe estar habilitado antes de poder usar Serial Console en una VM de Azure?",
    "Los diagnósticos de arranque."
   ],
   [
    "¿Qué datos pierdes cuando reimplementas una VM de Azure?",
    "Los datos del disco temporal; las direcciones IP dinámicas de la NIC también pueden cambiar, mientras que los discos del sistema operativo y de datos se conservan."
   ],
   [
    "El agente de VM no se está ejecutando en una VM. ¿Qué herramienta aún puede darte un símbolo del sistema?",
    "Serial Console, porque usa el puerto serie y SAC en lugar del agente de VM."
   ]
  ]
 },
 {
  "t": "AD DS recovery: Directory Services Restore Mode, authoritative vs non-authoritative restore, authoritative SYSVOL (DFSR) restore",
  "tt": "Recuperación de AD DS: Modo de restauración de servicios de directorio, restauración autoritativa frente a no autoritativa, restauración autoritativa de SYSVOL (DFSR)",
  "body": [
   "Tarde o temprano alguien elimina una OU llena de usuarios, o la base de datos de un DC se corrompe. Para recuperarte, necesitas una buena copia de seguridad del estado del sistema y entender cómo trata la replicación de AD los datos restaurados. La pregunta central es si quieres que los asociados de replicación sobrescriban los datos restaurados, o que estos los sobrescriban a ellos.",
   "La base de datos de AD (`ntds.dit`) no se puede restaurar mientras AD DS se está ejecutando en ese DC. El Modo de restauración de servicios de directorio (DSRM) es un modo de arranque especial en el que el DC se inicia sin AD DS, e inicias sesión con la cuenta de administrador de DSRM, una cuenta local cuya contraseña se estableció durante la promoción y puede restablecerse con `ntdsutil` usando el comando 'set dsrm password'. Entras en DSRM estableciendo la opción de arranque con `bcdedit /set safeboot dsrepair` y reiniciando (quítala después con `bcdedit /deletevalue safeboot`), o mediante las opciones de inicio avanzadas. Para el mantenimiento sin conexión, como desfragmentar la base de datos, puedes en cambio detener el servicio Active Directory Domain Services, lo que se conoce como AD DS reiniciable.",
   "Una restauración no autoritativa recupera la base de datos de AD del DC desde la copia de seguridad; cuando el DC se reinicia normalmente, los asociados de replicación le envían cada cambio hecho desde la copia de seguridad, incluidas las eliminaciones. Es la opción correcta cuando la base de datos de un DC está dañada pero el resto del dominio está bien; el DC simplemente se pone al día. No recuperará los objetos eliminados, porque los asociados volverán a replicar la eliminación.",
   "Una restauración autoritativa es la forma de recuperar objetos eliminados desde una copia de seguridad. Después de la restauración no autoritativa, y antes de reiniciar, ejecutas `ntdsutil`, activas la instancia con `activate instance ntds`, entras en `authoritative restore` y ejecutas `restore subtree \"OU=Sales,DC=contoso,DC=com\"` o `restore object` para un solo objeto. Ntdsutil eleva en una cantidad grande los números de versión de los atributos de esos objetos (de forma predeterminada, 100 000 por cada día transcurrido desde la copia de seguridad), así que después del reinicio ganan la replicación y se copian de nuevo a todos los DC. Ntdsutil también escribe archivos LDIF para los atributos con vínculos inversos, como la pertenencia de los objetos a grupos fuera del subárbol, que importas con `ldifde` para restaurar la pertenencia a grupos. No deben usarse copias de seguridad más antiguas que la vida útil de marcas de exclusión (normalmente 180 días). Si la Papelera de reciclaje de AD está habilitada, es preferible `Restore-ADObject` o Active Directory Administrative Center, que recuperan los objetos con todos sus atributos y sin tiempo de inactividad.",
   "SYSVOL, que contiene las plantillas de directiva de grupo y los scripts de inicio de sesión, se replica mediante DFS Replication, no mediante la replicación de AD, así que restaurar AD no lo repara. Para un solo DC dañado, basta con una sincronización no autoritativa de SYSVOL: establece `msDFSR-Enabled` en FALSE en el objeto de suscripción de SYSVOL de ese DC, replica y luego establécelo en TRUE, y extraerá una copia nueva. Si SYSVOL está dañado en todas partes, realizas una restauración autoritativa de SYSVOL. En el DC con la copia buena estableces `msDFSR-Enabled` en FALSE y `msDFSR-Options` en 1 en su objeto de suscripción de SYSVOL (en CN=SYSVOL Subscription dentro de su DFSR-LocalSettings), y estableces `msDFSR-Enabled` en FALSE en todos los demás DC. Después de forzar la replicación de AD con `repadmin /syncall`, reinicias DFSR en el DC autoritativo y vuelves a establecer su `msDFSR-Enabled` en TRUE, esperando el evento 4602; luego vuelves a habilitar los demás, que se sincronizan a partir de él.",
   "En resumen: DSRM es la herramienta, la no autoritativa repara un DC, la autoritativa gana frente a los demás, y SYSVOL tiene su propio procedimiento de DFSR."
  ],
  "terms": [
   [
    "DSRM",
    "Directory Services Restore Mode (Modo de restauración de servicios de directorio): un modo de arranque del DC sin AD DS en ejecución, usado para restaurar la base de datos con una contraseña local de DSRM."
   ],
   [
    "Non-authoritative restore (restauración no autoritativa)",
    "Restaurar la base de datos de AD de un DC, que luego recibe los cambios más recientes de los asociados de replicación."
   ],
   [
    "Authoritative restore (restauración autoritativa)",
    "Marcar los objetos restaurados con números de versión más altos mediante ntdsutil para que se repliquen y sobrescriban a los asociados."
   ],
   [
    "Tombstone lifetime (vida útil de marcas de exclusión)",
    "Cuánto tiempo se conservan los objetos eliminados como marcas de exclusión; no deben restaurarse copias de seguridad más antiguas que esto."
   ],
   [
    "msDFSR-Options",
    "El atributo de la suscripción de SYSVOL que se establece en 1 en el DC elegido como autoritativo en una restauración de SYSVOL con DFSR."
   ]
  ],
  "example": "Un administrador elimina accidentalmente la OU Sales, y la Papelera de reciclaje de AD no está habilitada. En DC2 reinicia en DSRM, restaura el estado del sistema de la noche anterior con wbadmin, ejecuta la restauración autoritativa de ntdsutil sobre el subárbol Sales, reinicia e importa con ldifde el archivo LDIF generado para restaurar la pertenencia de los usuarios a grupos de otras OU.",
  "tip": "Los objetos eliminados necesitan una restauración autoritativa (o la Papelera de reciclaje); un DC corrupto necesita una no autoritativa. SYSVOL es DFSR, y se restaura por separado con msDFSR-Enabled y msDFSR-Options en los objetos de suscripción.",
  "check": [
   [
    "¿Por qué una restauración no autoritativa no recupera una OU eliminada?",
    "Cuando el DC se reinicia, los asociados de replicación envían la eliminación más reciente, que vuelve a eliminar los objetos restaurados."
   ],
   [
    "¿Qué les hace ntdsutil a los objetos durante una restauración autoritativa?",
    "Aumenta los números de versión de sus atributos para que las versiones restauradas ganen la replicación y sobrescriban las copias de los demás DC."
   ],
   [
    "En una restauración autoritativa de SYSVOL, ¿qué atributos estableces en el DC autoritativo?",
    "msDFSR-Enabled en FALSE y msDFSR-Options en 1 en su objeto de suscripción de SYSVOL, y más tarde msDFSR-Enabled de nuevo en TRUE."
   ]
  ]
 },
 {
  "t": "Backup: Windows Server Backup, bare-metal and system state backup, Azure Backup with the MARS agent and MABS",
  "tt": "Copia de seguridad: Windows Server Backup, copia de seguridad completa del sistema y del estado del sistema, Azure Backup con el agente MARS y MABS",
  "body": [
   "Las copias de seguridad son tu última línea de defensa contra la eliminación, la corrupción, el ransomware y la pérdida de un sitio. Las características de alta disponibilidad, como los clústeres y la replicación, copian los errores al instante, así que no son copias de seguridad. Para Windows Server necesitas conocer el Windows Server Backup integrado y las dos opciones de Azure Backup para servidores locales: el agente MARS y Microsoft Azure Backup Server (MABS).",
   "Windows Server Backup es una característica que agregas con `Install-WindowsFeature Windows-Server-Backup`. Usa el Servicio de instantáneas de volumen (VSS) para hacer copias de seguridad coherentes a nivel de bloque mientras el servidor se ejecuta. Puedes hacer copia de seguridad del servidor completo, de volúmenes seleccionados, de archivos y carpetas, del estado del sistema o para la recuperación completa del sistema (bare-metal recovery, BMR). Los destinos son un disco dedicado (formateado y usado exclusivamente para la copia de seguridad, que conserva varias versiones), un volumen o un recurso compartido de red, que conserva solo la copia de seguridad más reciente porque cada ejecución la sobrescribe. La programación permite una programación por servidor. Adminístralo en la consola o con `wbadmin`, por ejemplo `wbadmin start systemstatebackup -backupTarget:E:` y `wbadmin get versions`.",
   "Conoce la diferencia entre los tipos de copia de seguridad. Una copia de seguridad del estado del sistema incluye el registro, los archivos de arranque, el registro de clases COM+ y, según los roles, la base de datos de AD DS, SYSVOL, la base de datos de los servicios de certificados y la base de datos del clúster; es lo que restauras en DSRM para recuperar AD. Una copia de seguridad para la recuperación completa del sistema incluye el estado del sistema más todos los volúmenes necesarios para arrancar el sistema operativo, de modo que puedes reconstruir un servidor en hardware nuevo o en un disco en blanco arrancando Windows Recovery Environment desde los medios de instalación y eligiendo System Image Recovery. Una copia de seguridad del servidor completo incluye BMR más todos los volúmenes de datos.",
   "El agente Microsoft Azure Recovery Services (MARS) hace copia de seguridad de una máquina Windows directamente en un almacén de Recovery Services en Azure, sin un servidor adicional. Protege archivos y carpetas, volúmenes y el estado del sistema, puede ejecutarse hasta tres veces al día y usa transferencias incrementales. Descargas las credenciales del almacén desde el portal para registrar el agente. Debes establecer una frase de contraseña de cifrado, que Microsoft nunca ve; si la pierdes no podrás restaurar, así que guárdala de forma segura. MARS no reconoce las aplicaciones, por lo que no hace copia de seguridad coherente de las bases de datos de SQL Server o Exchange, y no es la herramienta para VM completas.",
   "Microsoft Azure Backup Server (MABS) es una aplicación de servidor de descarga gratuita, basada en System Center Data Protection Manager (DPM), que instalas en un Windows Server local dedicado. Protege cargas de trabajo de todo tu centro de datos, incluidas VM de Hyper-V y VMware, SQL Server, Exchange, SharePoint, servidores de archivos y el estado del sistema o BMR, usando agentes en los servidores protegidos. Almacena los puntos de recuperación recientes en un disco local para restauraciones rápidas (de disco a disco) y envía las copias a más largo plazo a un almacén de Recovery Services (de disco a disco a la nube). A diferencia de DPM, MABS no admite cintas y no necesita una licencia de System Center.",
   "Elige según el alcance: los archivos o el estado del sistema de un servidor hacia Azure significan MARS; las copias de seguridad coherentes con las aplicaciones de muchas cargas de trabajo con restauración local rápida más retención en Azure significan MABS; una copia de seguridad local rápida del estado del sistema o BMR, como antes de promover un DC, significa Windows Server Backup. La eliminación temporal (soft delete) de Azure Backup mantiene recuperables los datos de copia de seguridad eliminados durante un período, una defensa clave contra los operadores de ransomware que intentan eliminar las copias de seguridad."
  ],
  "terms": [
   [
    "Windows Server Backup",
    "La característica integrada de copia de seguridad basada en VSS para el servidor completo, volúmenes, archivos, estado del sistema y recuperación completa del sistema."
   ],
   [
    "System state backup (copia de seguridad del estado del sistema)",
    "Una copia de seguridad del registro, los archivos de arranque y las bases de datos de roles como AD DS y SYSVOL, usada para recuperar AD."
   ],
   [
    "Bare-metal recovery (recuperación completa del sistema)",
    "Una copia de seguridad que contiene el estado del sistema y todos los volúmenes necesarios para arrancar, usada para reconstruir un servidor en hardware nuevo."
   ],
   [
    "MARS agent (agente MARS)",
    "El agente de Azure Recovery Services que hace copia de seguridad de archivos, carpetas y el estado del sistema de una máquina Windows directamente en un almacén de Recovery Services."
   ],
   [
    "MABS",
    "Microsoft Azure Backup Server: un servidor de copia de seguridad local basado en DPM con almacenamiento en disco local y retención en Azure para cargas de trabajo de aplicaciones."
   ]
  ],
  "example": "Los dos DC de una empresa reciben cada noche copias de seguridad del estado del sistema con Windows Server Backup en un disco dedicado. Los servidores de archivos usan el agente MARS para enviar sus volúmenes de datos a un almacén de Recovery Services dos veces al día. Sus hosts de SQL e Hyper-V están protegidos por MABS, que conserva dos semanas de puntos de recuperación en un disco local para restauraciones rápidas y un año de copias mensuales en Azure.",
  "tip": "MARS equivale a archivos, carpetas y estado del sistema directamente a Azure, sin reconocer aplicaciones. MABS equivale a cargas de trabajo que reconocen aplicaciones más disco local, sin cintas. Un destino de recurso compartido de red en Windows Server Backup conserva solo una versión.",
  "check": [
   [
    "¿Qué tipo de copia de seguridad necesitas para restaurar un servidor dañado en hardware nuevo?",
    "Una copia de seguridad para la recuperación completa del sistema (bare-metal recovery), restaurada arrancando en Windows Recovery Environment y usando System Image Recovery."
   ],
   [
    "Necesitas copias de seguridad de SQL Server coherentes con las aplicaciones, con restauraciones locales rápidas y retención a largo plazo en Azure. ¿MARS o MABS?",
    "MABS, porque reconoce las aplicaciones y almacena los puntos de recuperación en un disco local antes de enviarlos a Azure; MARS no reconoce las aplicaciones."
   ],
   [
    "¿Qué ocurre si pierdes la frase de contraseña de cifrado del agente MARS?",
    "No puedes restaurar los datos, porque Microsoft no almacena la frase de contraseña; guárdala en algún lugar seguro fuera del servidor protegido."
   ]
  ]
 }
], { lang: "es" });
