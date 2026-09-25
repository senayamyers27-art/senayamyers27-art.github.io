CertHub.addLessons("sc-300", [
 {
  "t": "Tenant setup: custom domain names and DNS verification, company branding, tenant properties and user settings",
  "tt": "Configuración del tenant: nombres de dominio personalizados y verificación DNS, personalización de marca, propiedades del tenant y configuración de usuarios",
  "body": [
   "Un tenant de Microsoft Entra es la instancia dedicada de Microsoft Entra ID (el servicio de identidad en la nube antes llamado Azure Active Directory) que contiene los usuarios, grupos, dispositivos y aplicaciones de tu organización. Todo tenant empieza con un dominio inicial que termina en onmicrosoft.com. Ese dominio es permanente: no puedes eliminarlo, y sigue siendo útil como nombre de inicio de sesión de respaldo para cuentas de emergencia. Luego, la mayoría de las organizaciones agrega un dominio personalizado como contoso.com para que las personas inicien sesión con un nombre principal de usuario (UPN) familiar como ana@contoso.com.",
   "Agregar un dominio personalizado es un proceso de dos pasos. Primero agregas el nombre en el Centro de administración de Microsoft Entra, en Domain names. Luego Entra te da un valor de verificación (se ve como MS=ms12345678) que publicas como registro TXT, o alternativamente como registro MX, en tu proveedor de DNS público. Cuando seleccionas Verify, Entra busca el registro; solo alguien que controla el DNS del dominio pudo haberlo creado, así que esto demuestra la propiedad. Los cambios de DNS pueden tardar en propagarse, así que un primer intento fallido normalmente solo significa que hay que esperar. Un dominio puede estar verificado en un solo tenant a la vez, y más adelante puedes convertir un dominio verificado en el dominio principal, que se vuelve el sufijo predeterminado para los usuarios nuevos. Para quitar un dominio personalizado, primero debes mover o eliminar todos los usuarios, grupos y aplicaciones que todavía lo usan.",
   "La personalización de marca de la empresa (company branding) adapta la experiencia de inicio de sesión: imagen de fondo, logotipo de banner, logotipo cuadrado, color de fondo, texto de la página de inicio de sesión y vínculos para el restablecimiento de contraseña de autoservicio o una declaración de privacidad. Configuras una experiencia de inicio de sesión predeterminada y puedes agregar versiones específicas por idioma para los usuarios cuyo navegador solicita otro idioma. La marca aparece después de que el usuario escribe un nombre de usuario de tu dominio, lo cual también es una señal discreta contra el phishing: los usuarios aprenden cómo se ve la página real. La personalización de marca requiere un nivel de licencia de pago, no la edición gratuita.",
   "Las propiedades del tenant contienen datos a nivel de organización: el nombre del tenant, el tenant ID (un GUID que las aplicaciones y los scripts usan para identificar el directorio), el país o región elegido al crearlo (que no se puede cambiar después y determina la ubicación de los datos), el contacto técnico, y el contacto de privacidad global y la URL de la declaración de privacidad que ven los usuarios invitados.",
   "La configuración de usuarios (user settings) son interruptores a nivel de todo el tenant que definen lo que los miembros comunes pueden hacer. Algunos ejemplos: si los usuarios pueden registrar aplicaciones, si se restringe a quienes no son administradores el acceso al Centro de administración de Microsoft Entra, si los usuarios pueden crear grupos de seguridad o grupos de Microsoft 365, si pueden conectar cuentas de LinkedIn y si pueden leer los perfiles de otros usuarios. Endurecer estos valores predeterminados es una victoria rápida de mínimo privilegio en un tenant nuevo, porque la configuración de fábrica favorece la colaboración por encima del control."
  ],
  "terms": [
   [
    "Initial domain (dominio inicial)",
    "El dominio permanente nombredeltenant.onmicrosoft.com que se crea con cada tenant; no se puede quitar."
   ],
   [
    "Domain verification (verificación de dominio)",
    "Demostrar que eres propietario de un dominio personalizado publicando en el DNS público un registro TXT o MX con un valor proporcionado por Entra."
   ],
   [
    "Primary domain (dominio principal)",
    "El dominio verificado que se usa como sufijo UPN predeterminado al crear usuarios nuevos."
   ],
   [
    "Tenant ID (identificador del tenant)",
    "El GUID que identifica de forma única a un tenant de Microsoft Entra; lo usan aplicaciones, scripts y configuraciones de federación."
   ],
   [
    "Company branding (personalización de marca)",
    "Personalización de la página de inicio de sesión con tus logotipos, fondo, colores y texto, con versiones opcionales por idioma."
   ]
  ],
  "example": "Fabrikam compra fabrikam.com y quiere que el personal inicie sesión como nombre@fabrikam.com. La administradora agrega el dominio en Entra, copia el valor MS=ms en un registro TXT en el registrador, espera a que el DNS se actualice, selecciona Verify y lo establece como principal. Después sube el logotipo y el fondo corporativos como personalización de marca y desactiva la configuración de usuario que permite a los miembros registrar aplicaciones.",
  "tip": "Recuerda que la verificación usa un registro TXT (o MX), no un CNAME, y que el dominio onmicrosoft.com nunca se puede eliminar. Si una pregunta plantea por qué no se puede quitar un dominio, busca usuarios, grupos o aplicaciones que todavía lo usen.",
  "check": [
   [
    "¿Qué tipos de registro DNS puedes usar para verificar un dominio personalizado en Microsoft Entra ID?",
    "Un registro TXT (el más común) o un registro MX que contenga el valor de verificación MS=ms que te da Entra."
   ],
   [
    "¿Por qué un administrador podría no poder eliminar un dominio personalizado del tenant?",
    "Porque objetos como usuarios, grupos o aplicaciones todavía hacen referencia al dominio en sus nombres o URI; primero hay que renombrarlos o quitarlos."
   ],
   [
    "¿Qué propiedad del tenant queda fija al crearlo y no se puede cambiar?",
    "El país o región, que además determina dónde se ubican los datos del tenant."
   ]
  ]
 },
 {
  "t": "Microsoft Entra built-in roles, custom roles and least-privilege role assignment",
  "tt": "Roles integrados y personalizados de Microsoft Entra, y asignación de roles con mínimo privilegio",
  "body": [
   "Los roles de Microsoft Entra controlan quién puede administrar el directorio en sí: usuarios, grupos, aplicaciones, configuración de autenticación, etc. Son distintos de los roles de control de acceso basado en roles de Azure (Azure RBAC), como Owner o Contributor, que controlan recursos de Azure como máquinas virtuales y cuentas de almacenamiento. Confundir ambos sistemas es una trampa clásica del examen, así que ten presente la pregunta: ¿el administrador gestiona objetos de identidad o recursos de Azure?",
   "Microsoft ofrece muchos roles integrados de Entra, cada uno con un conjunto fijo de permisos. Global Administrator puede hacer casi todo y debería ser escaso; Microsoft recomienda menos de cinco. Privileged Role Administrator administra las asignaciones de roles y Privileged Identity Management. User Administrator crea y administra usuarios y grupos, y puede restablecer contraseñas de muchos usuarios (pero no de todos). Helpdesk Administrator restablece contraseñas de quienes no son administradores y de algunos roles limitados. Authentication Administrator administra los métodos de autenticación de usuarios que no son administradores, mientras que Privileged Authentication Administrator puede hacer lo mismo para cualquier usuario, incluidos los Global Administrators. Otros roles comunes son Security Administrator, Conditional Access Administrator, Groups Administrator, License Administrator, Application Administrator, Cloud Application Administrator (como Application Administrator pero sin derechos sobre application proxy) y Global Reader, una vista de solo lectura de casi todo.",
   "Los roles personalizados te permiten construir un rol a partir de permisos individuales cuando ningún rol integrado se ajusta. El conjunto de permisos disponibles para roles personalizados es más reducido que el catálogo integrado y se centra sobre todo en registros de aplicaciones y aplicaciones empresariales, con más áreas que se agregan con el tiempo. Los roles personalizados requieren una licencia Microsoft Entra ID P1. Defines el rol una vez y luego lo asignas en un ámbito.",
   "Una asignación de rol tiene tres partes: la entidad de seguridad (un usuario, una entidad de servicio o un grupo al que se pueden asignar roles), la definición del rol y el ámbito. El ámbito puede ser todo el tenant, una unidad administrativa o un solo recurso, como un registro de aplicación. Asignar el rol Application Administrator solo para una aplicación es mucho más seguro que asignarlo en todo el tenant.",
   "Mínimo privilegio significa dar a cada persona el rol más pequeño, en el ámbito más estrecho y por el menor tiempo que le permita hacer su trabajo. En la práctica: elige el rol integrado más específico en lugar de recurrir por defecto a Global Administrator; limita los roles a unidades administrativas o recursos individuales cuando sea posible; usa Privileged Identity Management para que las asignaciones sean elegibles en lugar de permanentemente activas; y revisa las asignaciones con regularidad. Solo puedes asignar roles a grupos si el grupo se creó como asignable a roles (la propiedad isAssignableToRole), la cual debe establecerse al crear el grupo y no se puede cambiar después. Solo los Global Administrators y Privileged Role Administrators (y los propietarios del grupo) pueden administrar la membresía de esos grupos, lo que impide que administradores de menor nivel escalen privilegios."
  ],
  "terms": [
   [
    "Role definition (definición de rol)",
    "Una colección de permisos, integrada o personalizada, que se puede asignar a una entidad de seguridad."
   ],
   [
    "Role scope (ámbito del rol)",
    "El límite donde se aplica un rol: el tenant, una unidad administrativa o un solo recurso."
   ],
   [
    "Role-assignable group (grupo asignable a roles)",
    "Un grupo creado con isAssignableToRole en true para que pueda recibir asignaciones de roles de Entra; la configuración queda fija al crearlo."
   ],
   [
    "Global Reader",
    "Un rol integrado de solo lectura que puede ver la mayoría de la configuración y los datos sin hacer cambios."
   ],
   [
    "Least privilege (mínimo privilegio)",
    "Otorgar solo los permisos, el ámbito y la duración que una persona necesita para realizar una tarea."
   ]
  ],
  "example": "Un equipo de mesa de servicio necesita restablecer contraseñas olvidadas del personal común. En lugar de hacerlos User Administrators, el administrador de identidad les asigna el rol Helpdesk Administrator mediante una asignación elegible de PIM, de modo que pueden restablecer contraseñas de no administradores después de activar el rol, pero no pueden crear usuarios ni restablecer la contraseña de un Global Administrator.",
  "tip": "Cuando una pregunta pida el rol con menos privilegios, descarta primero Global Administrator y luego elige el rol más específico que aún cubra la tarea. Fíjate en la diferencia entre Authentication Administrator y Privileged Authentication Administrator: solo el privilegiado puede administrar los métodos de los administradores.",
  "check": [
   [
    "¿Cuál es la diferencia entre los roles de Microsoft Entra y los roles de Azure RBAC?",
    "Los roles de Entra administran objetos del directorio como usuarios, grupos y aplicaciones; los roles de Azure RBAC administran recursos de Azure como suscripciones, grupos de recursos y máquinas virtuales."
   ],
   [
    "¿Puedes convertir un grupo de seguridad existente en un grupo asignable a roles?",
    "No. La propiedad isAssignableToRole debe establecerse al crear el grupo y no se puede cambiar después."
   ],
   [
    "¿Qué rol deberías asignar a alguien que solo necesita restablecer contraseñas de usuarios no administrativos?",
    "Helpdesk Administrator (Password Administrator es una opción aún más limitada), no User Administrator ni Global Administrator."
   ]
  ]
 },
 {
  "t": "Administrative units, including restricted management administrative units, to scope admin roles",
  "tt": "Unidades administrativas, incluidas las de administración restringida, para acotar roles de administrador",
  "body": [
   "Una unidad administrativa (AU) es un contenedor en Microsoft Entra ID que agrupa usuarios, grupos o dispositivos para que puedas delegar la administración solo de esos objetos. Piensa en una universidad: cada facultad tiene su propio personal de TI, que debería restablecer contraseñas de sus propios estudiantes pero no del resto del campus. Coloca a los usuarios de la facultad en una AU y luego asigna al personal de TI un rol con ámbito en esa AU.",
   "Las unidades administrativas son planas; no forman una jerarquía como las unidades organizativas locales, y un objeto puede pertenecer a más de una AU. La membresía puede asignarse manualmente o, para usuarios o dispositivos, definirse mediante una regla de membresía dinámica, como todos los usuarios cuyo departamento es Engineering. La regla dinámica de una AU se dirige a usuarios o a dispositivos, no a ambos. Agregar un grupo a una AU permite al administrador con ámbito gestionar el objeto de grupo en sí, como su nombre y su membresía, pero no convierte a los miembros del grupo en parte de la AU. Si quieres que el administrador restablezca las contraseñas de esos usuarios, también hay que agregar a los usuarios.",
   "Solo algunos roles tienen sentido con ámbito de AU, entre ellos User Administrator, Helpdesk Administrator, Password Administrator, Authentication Administrator, Groups Administrator, License Administrator y algunos otros. Los roles que administran configuraciones de todo el tenant no se pueden limitar a una AU. Los administradores que reciben roles con ámbito de AU necesitan licencias Microsoft Entra ID P1; los miembros de la AU solo necesitan el nivel gratuito.",
   "Las unidades administrativas de administración restringida agregan protección para objetos sensibles. En una AU normal, los administradores a nivel de tenant pueden seguir administrando todo lo que contiene. En una AU de administración restringida, los objetos solo pueden ser modificados por administradores cuyo rol está asignado en el ámbito de esa AU específica. Ni siquiera un User Administrator o Global Administrator de todo el tenant puede cambiar las propiedades de un usuario protegido, restablecer su contraseña ni cambiar la membresía de un grupo protegido mediante ese rol con ámbito de tenant. Un Global Administrator aún puede asignarse a sí mismo un rol con ámbito de AU, así que esto es una protección contra accidentes y contra el alcance administrativo rutinario, no un muro absoluto. La opción restringida se elige al crear la AU.",
   "Los usos típicos de las AU de administración restringida incluyen proteger las cuentas de ejecutivos, los grupos de seguridad que controlan el acceso a recursos sensibles y las cuentas de servicio privilegiadas. En el centro de administración verás un interruptor Restricted management administrative unit al crearla y, en la información general del objeto, una nota que indica que está protegido. La actividad de inicio de sesión, auditoría y asignación de roles sigue apareciendo en los registros normales, así que la auditoría no se ve afectada."
  ],
  "terms": [
   [
    "Administrative unit (unidad administrativa)",
    "Un contenedor de usuarios, grupos o dispositivos que se usa para limitar asignaciones de roles de Entra a un subconjunto del directorio."
   ],
   [
    "Restricted management AU (AU de administración restringida)",
    "Una unidad administrativa cuyos objetos solo pueden cambiar administradores con roles limitados a esa AU, no los administradores con ámbito de tenant."
   ],
   [
    "AU-scoped role assignment (asignación de rol con ámbito de AU)",
    "Una asignación de rol cuyo ámbito es una unidad administrativa, lo que limita el poder del administrador a los objetos de esa AU."
   ],
   [
    "Dynamic AU membership (membresía dinámica de AU)",
    "Una unidad administrativa cuyos miembros usuarios o dispositivos se agregan y quitan automáticamente mediante una regla basada en atributos."
   ]
  ],
  "example": "Una multinacional quiere que la mesa de ayuda de París restablezca contraseñas solo del personal francés. El administrador crea una unidad administrativa con una regla dinámica de país igual a France y asigna al equipo de París el rol Helpdesk Administrator con ámbito en ella. Por separado, el CEO y el CFO se colocan en una AU de administración restringida gestionada por dos administradores de identidad sénior, de modo que la mesa de ayuda general nunca pueda modificarlos.",
  "tip": "Si un escenario dice que ni siquiera los Global Administrators deberían poder modificar ciertos usuarios de forma predeterminada, la respuesta es una unidad administrativa de administración restringida. Si solo dice que hay que limitar lo que un equipo regional puede administrar, basta con una AU normal y un rol con ámbito.",
  "check": [
   [
    "Si agregas un grupo a una unidad administrativa, ¿puede el Helpdesk Administrator con ámbito de AU restablecer las contraseñas de los miembros del grupo?",
    "No. Agregar un grupo solo incluye en el ámbito el objeto de grupo; los usuarios deben agregarse a la AU por sí mismos."
   ],
   [
    "¿Qué cambia una unidad administrativa de administración restringida en comparación con una AU normal?",
    "Los administradores con ámbito de tenant ya no pueden modificar sus objetos; solo pueden hacerlo los administradores con roles limitados a esa AU."
   ],
   [
    "¿Quién necesita una licencia Microsoft Entra ID P1 al usar unidades administrativas?",
    "Los administradores a los que se asignan roles con ámbito en la AU; los miembros de la AU no."
   ]
  ]
 },
 {
  "t": "Users and groups: security vs Microsoft 365 groups, assigned vs dynamic membership rules, bulk operations",
  "tt": "Usuarios y grupos: grupos de seguridad frente a grupos de Microsoft 365, membresía asignada frente a reglas dinámicas, operaciones masivas",
  "body": [
   "Los usuarios en Microsoft Entra ID son de dos tipos principales: usuarios solo de nube, creados directamente en Entra, y usuarios sincronizados, cuya fuente de autoridad es Active Directory local. Puedes editar a los usuarios solo de nube en el portal, pero la mayoría de los atributos de los usuarios sincronizados deben cambiarse en el entorno local. Cada usuario también tiene un userType de Member o Guest. Los usuarios eliminados pasan a un estado de eliminación temporal (soft delete) durante 30 días, período en el que puedes restaurarlos con sus membresías de grupo y licencias.",
   "Los grupos simplifican el acceso: asignas permisos, licencias o aplicaciones una sola vez a un grupo en lugar de a cientos de personas. Hay dos tipos de grupo. Los grupos de seguridad controlan el acceso a recursos y pueden contener usuarios, dispositivos, entidades de servicio y otros grupos. Los grupos de Microsoft 365 son grupos de colaboración: cada uno incluye un buzón compartido, un calendario, un sitio de SharePoint y, opcionalmente, un equipo de Teams, y solo contienen usuarios (miembros e invitados), no dispositivos ni grupos anidados. Los grupos de Microsoft 365 eliminados se pueden restaurar durante 30 días; los grupos de seguridad eliminados no. La directiva de expiración de grupos se aplica a los grupos de Microsoft 365.",
   "La membresía puede ser asignada, cuando los propietarios o administradores agregan miembros manualmente, o dinámica, cuando una regla agrega y quita miembros automáticamente según sus atributos. Los grupos dinámicos de usuarios usan reglas sobre atributos de usuario; los grupos dinámicos de dispositivos usan atributos de dispositivo. Una misma regla no puede mezclar propiedades de usuario y de dispositivo. Los grupos de Microsoft 365 solo pueden ser dinámicos para usuarios. La membresía dinámica requiere una licencia Microsoft Entra ID P1, y los cambios se procesan en segundo plano, así que no son instantáneos. Una regla se ve así:",
   "```\n(user.department -eq \"Sales\") -and (user.country -eq \"Canada\")\n```",
   "Los operadores comunes incluyen -eq, -ne, -startsWith, -contains, -match y -in, combinados con -and, -or y -not. El generador de reglas del portal cubre los casos simples y el cuadro de texto acepta reglas avanzadas. Usa Validate Rules para probar una regla contra usuarios específicos antes de guardarla. No puedes agregar miembros manualmente a un grupo dinámico; para corregir un miembro que falta, corrige el atributo de origen. Una sintaxis de regla especial también permite crear un grupo con los subordinados directos de un gerente.",
   "Las operaciones masivas manejan muchos objetos a la vez desde el portal. Descargas una plantilla CSV, la llenas y la cargas para crear usuarios de forma masiva, invitar invitados en masa, eliminar usuarios en masa, restaurarlos en masa, agregar o quitar miembros de grupos en masa, o descargar una lista de usuarios o grupos. Los resultados aparecen en Bulk operation results, con un estado por fila para que puedas corregir y reenviar los fallos. Para trabajos más grandes o repetibles, la alternativa habitual son los cmdlets de Microsoft Graph PowerShell como New-MgUser y New-MgGroupMember."
  ],
  "terms": [
   [
    "Security group (grupo de seguridad)",
    "Un grupo que se usa para otorgar acceso a recursos; puede contener usuarios, dispositivos, entidades de servicio y grupos anidados."
   ],
   [
    "Microsoft 365 group (grupo de Microsoft 365)",
    "Un grupo de colaboración que aprovisiona un buzón compartido, un calendario, un sitio de SharePoint y un equipo de Teams opcional; solo contiene usuarios."
   ],
   [
    "Dynamic membership rule (regla de membresía dinámica)",
    "Una expresión basada en atributos que agrega y quita miembros del grupo automáticamente; requiere Entra ID P1."
   ],
   [
    "Assigned membership (membresía asignada)",
    "Membresía de grupo administrada manualmente por propietarios o administradores."
   ],
   [
    "Soft delete (eliminación temporal)",
    "El período de 30 días durante el cual se pueden restaurar los usuarios y grupos de Microsoft 365 eliminados."
   ]
  ],
  "example": "Recursos Humanos establece el atributo department de cada empleado. El equipo de identidad crea un grupo de seguridad dinámico con la regla user.department -eq \"Finance\" y le asigna la aplicación de finanzas y una licencia. Cuando el departamento de un nuevo analista se establece en Finance, obtiene acceso automáticamente, y cuando se muda a Marketing, el acceso se quita sin necesidad de un ticket.",
  "tip": "A las preguntas del examen les encantan los límites: los grupos de Microsoft 365 no pueden contener dispositivos ni grupos anidados, los grupos dinámicos no aceptan miembros manuales, una regla no puede mezclar atributos de usuario y de dispositivo, y solo los grupos de Microsoft 365 (no los de seguridad) se pueden restaurar después de eliminarlos.",
  "check": [
   [
    "Necesitas un grupo que contenga automáticamente todos los dispositivos Windows. ¿Qué tipo de grupo y tipo de membresía eliges?",
    "Un grupo de seguridad con membresía dinámica de dispositivos; los grupos de Microsoft 365 no pueden contener dispositivos."
   ],
   [
    "Falta un usuario en un grupo dinámico. ¿Puedes agregarlo manualmente?",
    "No. Debes corregir el atributo que evalúa la regla, o cambiar la regla."
   ],
   [
    "¿Qué licencia se necesita para la membresía dinámica de grupos?",
    "Microsoft Entra ID P1 (o un plan que la incluya) para los usuarios cubiertos por los grupos dinámicos."
   ]
  ]
 },
 {
  "t": "Licenses: direct vs group-based licensing and resolving license assignment errors",
  "tt": "Licencias: licencias directas frente a licencias basadas en grupos y resolución de errores de asignación",
  "body": [
   "Muchos servicios en la nube de Microsoft, como Microsoft 365, Exchange Online y Microsoft Entra ID P1 o P2, requieren que cada usuario tenga una licencia. Una licencia (llamada producto o SKU) contiene varios planes de servicio, y puedes activar o desactivar planes de servicio individuales al asignarla. Antes de asignar cualquier licencia, el usuario debe tener establecida una ubicación de uso (usage location), porque algunos servicios no están disponibles en todos los países.",
   "La asignación directa de licencias significa asignar una licencia a un usuario individual en el centro de administración o con PowerShell. Funciona, pero no escala y se desordena con el tiempo: las personas cambian de puesto y nadie recuerda quitar lo que ya no necesitan.",
   "Las licencias basadas en grupos asignan licencias a un grupo. Cada miembro hereda la licencia, y los miembros que salen del grupo la pierden. Combinadas con grupos dinámicos, las licencias se vuelven automáticas: una regla como department igual a Sales asigna el conjunto de licencias de ventas en cuanto Recursos Humanos actualiza el atributo. Las licencias basadas en grupos requieren Microsoft Entra ID P1 o un plan que lo incluya. Un usuario puede tener el mismo producto de forma directa y también mediante un grupo; el perfil del usuario muestra si cada asignación es directa o heredada, y quitar una vía no quita la otra. Así suele hacerse la migración: agregas la asignación por grupo, confirmas que funciona y luego quitas la asignación directa.",
   "Los errores de asignación de licencias son donde se concentran las preguntas del examen. La página Licenses del grupo muestra a los usuarios en estado de error, y la página Licenses del usuario muestra el motivo. Los errores comunes incluyen: not enough licenses (licencias insuficientes), cuando el tenant se quedó sin puestos comprados; conflicting service plans (planes de servicio en conflicto), cuando el usuario ya tiene otra licencia con un plan de servicio que no puede coexistir, por ejemplo dos ediciones distintas del mismo servicio; other products depend on this license (otros productos dependen de esta licencia), cuando intentas quitar un plan de servicio que otro plan asignado requiere; usage location isn't allowed (ubicación de uso no permitida), cuando un servicio no se ofrece en el país del usuario o no hay ubicación de uso establecida; y duplicate proxy addresses (direcciones proxy duplicadas), cuando una dirección de correo entra en conflicto con otro objeto en Exchange Online.",
   "Para corregir un error, atiende la causa: por ejemplo, compra más puestos, quita una licencia directa en conflicto, desactiva uno de los planes de servicio en conflicto en la asignación del grupo o establece la ubicación de uso. Después selecciona Reprocess en el grupo o en el usuario para que Entra lo intente de nuevo. Las licencias basadas en grupos procesan los cambios en segundo plano, así que deja pasar un tiempo antes de suponer que una corrección falló. El registro de auditoría guarda los cambios de licencias, lo cual ayuda cuando necesitas demostrar quién asignó o quitó una licencia."
  ],
  "terms": [
   [
    "Service plan (plan de servicio)",
    "Un servicio individual dentro de un producto de licencia que se puede habilitar o deshabilitar en cada asignación."
   ],
   [
    "Usage location (ubicación de uso)",
    "El país o región del usuario; es obligatorio antes de poder asignar una licencia."
   ],
   [
    "Group-based licensing (licencias basadas en grupos)",
    "Asignar licencias a un grupo para que los miembros las hereden automáticamente; requiere Entra ID P1."
   ],
   [
    "Inherited license (licencia heredada)",
    "Una licencia que un usuario tiene por pertenecer a un grupo y no por asignación directa."
   ],
   [
    "Reprocess (reprocesar)",
    "Una acción que reintenta la asignación de licencias de un grupo o usuario después de corregir la causa de un error."
   ]
  ],
  "example": "Tras una fusión, 40 nuevos vendedores se unen a un grupo dinámico Sales pero aparecen con un error de licencia. La administradora descubre que el motivo es not enough licenses, compra 40 puestos más y selecciona Reprocess en el grupo. Dos usuarios siguen fallando con conflicting service plans porque tienen una licencia directa más antigua, así que la administradora quita las asignaciones directas y vuelve a reprocesar.",
  "tip": "Si una pregunta dice que las licencias no se asignan a un usuario recién creado, revisa primero la ubicación de uso. Si dice que un usuario conservó una licencia después de salir de un grupo, busca una asignación directa que aún exista junto con la heredada.",
  "check": [
   [
    "¿Qué debe estar establecido en un usuario antes de poder asignarle cualquier licencia?",
    "La ubicación de uso (país o región)."
   ],
   [
    "Se quitó a un usuario de un grupo de licencias, pero todavía tiene la licencia. ¿Cuál es el motivo más probable?",
    "La misma licencia también está asignada directamente al usuario, y quitar la vía del grupo no quita la directa."
   ],
   [
    "Después de comprar más puestos para corregir un error not enough licenses, ¿qué haces para que la asignación del grupo tenga éxito?",
    "Seleccionas Reprocess en el grupo (o el usuario) para que Entra reintente la asignación."
   ]
  ]
 },
 {
  "t": "Devices: Microsoft Entra registered, Microsoft Entra joined and Microsoft Entra hybrid joined; device settings",
  "tt": "Dispositivos: Microsoft Entra registered, Microsoft Entra joined y Microsoft Entra hybrid joined; configuración de dispositivos",
  "body": [
   "Microsoft Entra ID mantiene una identidad de dispositivo para computadoras y teléfonos, de modo que directivas como Conditional Access puedan verificar el dispositivo y no solo al usuario. Hay tres formas en que un dispositivo puede relacionarse con Entra, y el examen espera que elijas la correcta para cada escenario.",
   "Los dispositivos Microsoft Entra registered (registrados) suelen ser dispositivos personales, el caso de traer tu propio dispositivo (BYOD). El usuario inicia sesión en el dispositivo con una cuenta personal o local y agrega una cuenta de trabajo, por ejemplo al iniciar sesión en Company Portal o en una aplicación de Office. Se pueden registrar Windows, macOS, iOS y Android. La organización obtiene un objeto de dispositivo que puede usar para Conditional Access y, si se inscribe, para la administración con Intune, pero el dispositivo sigue siendo del usuario.",
   "Los dispositivos Microsoft Entra joined (unidos) son dispositivos Windows propiedad de la organización que se unen directamente a Entra ID sin Active Directory local. Los usuarios inician sesión en Windows con su cuenta de trabajo de Entra, obtienen inicio de sesión único en aplicaciones en la nube mediante un primary refresh token y aún pueden llegar a recursos locales si hay línea de visión a un controlador de dominio. Este es el estado objetivo para las organizaciones que priorizan la nube y suele implementarse con Windows Autopilot.",
   "Los dispositivos Microsoft Entra hybrid joined (unidos de forma híbrida) están unidos a Active Directory local y además registrados en Entra ID. Esto conviene a organizaciones que todavía dependen de Group Policy o de imágenes locales. La configuración se hace en Microsoft Entra Connect, que configura un punto de conexión de servicio (SCP) para que las computadoras unidas al dominio sepan con qué tenant registrarse; los objetos de computadora deben estar dentro del ámbito de sincronización. Luego Windows se registra automáticamente cuando un usuario inicia sesión.",
   "La configuración de dispositivos está en Devices, Device settings. Las opciones clave incluyen: Users may join devices to Microsoft Entra (todos, seleccionados o ninguno); Users may register their devices; Require multifactor authentication to register or join devices (Microsoft recomienda dejarla desactivada y usar en su lugar una directiva de Conditional Access sobre la acción de usuario Register or join devices); Maximum number of devices per user; administradores locales adicionales en dispositivos unidos a Entra, y si el usuario que une el dispositivo se convierte en administrador local; Enable Microsoft Entra Local Administrator Password Solution (LAPS), que almacena una contraseña rotativa de administrador local; y si los usuarios pueden recuperar las claves de BitLocker de sus propios dispositivos.",
   "Luego Conditional Access puede exigir que un dispositivo esté marcado como compatible (compliant) por Intune o que esté unido de forma híbrida. Compatible significa que el dispositivo cumple reglas de administración como el cifrado y una versión mínima del sistema operativo; hybrid joined solo demuestra que el dispositivo forma parte de tu dominio."
  ],
  "terms": [
   [
    "Microsoft Entra registered (registrado)",
    "Un dispositivo personal con una cuenta de trabajo agregada; se usa para escenarios BYOD en Windows, macOS, iOS y Android."
   ],
   [
    "Microsoft Entra joined (unido)",
    "Un dispositivo Windows propiedad de la organización unido directamente a Entra ID, donde los usuarios inician sesión con cuentas de trabajo."
   ],
   [
    "Microsoft Entra hybrid joined (unido de forma híbrida)",
    "Un dispositivo unido a AD local y también registrado en Entra ID, configurado mediante Entra Connect."
   ],
   [
    "Service connection point (SCP, punto de conexión de servicio)",
    "Un objeto de AD que indica a las computadoras unidas al dominio con qué tenant de Entra registrarse para la unión híbrida."
   ],
   [
    "Windows LAPS with Entra",
    "Una función que rota la contraseña del administrador local de cada dispositivo y la respalda en Entra ID."
   ]
  ],
  "example": "Una empresa con un AD local grande y uso intensivo de Group Policy quiere que Conditional Access exija dispositivos corporativos. El administrador habilita la unión híbrida en Microsoft Entra Connect y luego crea una directiva que exige un dispositivo hybrid joined o compatible. Los contratistas que usan laptops personales las registran en su lugar y solo se les permite el acceso por navegador.",
  "tip": "Dispositivo personal equivale a registered; dispositivo de la empresa solo en la nube equivale a joined; dispositivo de la empresa todavía en AD local equivale a hybrid joined. Para exigir MFA al unir dispositivos, la respuesta recomendada es una directiva de Conditional Access sobre la acción de usuario Register or join devices.",
  "check": [
   [
    "¿Qué tipo de identidad de dispositivo corresponde a teléfonos propiedad de los empleados que acceden al correo corporativo?",
    "Microsoft Entra registered."
   ],
   [
    "¿Dónde configuras Microsoft Entra hybrid join para computadoras unidas al dominio?",
    "En Microsoft Entra Connect, que configura el punto de conexión de servicio; las computadoras deben estar en el ámbito de sincronización."
   ],
   [
    "¿Por qué normalmente se deja desactivada la opción Require multifactor authentication to register or join devices?",
    "Porque Microsoft recomienda usar en su lugar una directiva de Conditional Access dirigida a la acción de usuario Register or join devices, que es más flexible."
   ]
  ]
 },
 {
  "t": "External identities: B2B collaboration, guest invitations and redemption, external collaboration settings",
  "tt": "Identidades externas: colaboración B2B, invitaciones y canje de invitados, configuración de colaboración externa",
  "body": [
   "Microsoft Entra External ID para la colaboración entre empresas (B2B) permite que personas de organizaciones asociadas usen tus aplicaciones y datos con sus propias credenciales. En lugar de crear y administrar una contraseña para un contratista, lo invitas; se autentica con su identidad de origen y tu tenant obtiene un objeto de usuario que lo representa. De forma predeterminada, este objeto tiene userType Guest, lo que le da permisos de directorio más limitados que a un miembro.",
   "Una invitación puede venir del centro de administración (New user, Invite external user), de una invitación masiva con un archivo CSV, de Microsoft Graph o PowerShell, o de forma indirecta cuando alguien comparte un equipo de Teams, un archivo o un sitio. El usuario invitado recibe un correo con un vínculo de canje, o puedes enviarle un vínculo directo a una aplicación o al portal My Apps de tu tenant. El canje (redemption) es el momento en que el invitado acepta: inicia sesión, da su consentimiento a tus términos de privacidad y el objeto de invitado se vincula a su identidad. Hasta entonces, el invitado muestra un estado de aceptación Pending.",
   "La forma en que el invitado se autentica depende de quién sea. Si tiene una cuenta de Microsoft Entra, la usa. Si no, puede usar una cuenta Microsoft, una federación configurada con Google o Facebook, un proveedor de identidad SAML o WS-Federation que configures para su dominio, o un código de acceso de un solo uso por correo (email one-time passcode, OTP), en el que se envía un código a su dirección de correo cada vez. Tu tenant puede seguir aplicando su propio Conditional Access a los invitados, como exigir MFA; la configuración de acceso entre tenants decide si confías en la MFA realizada en su tenant de origen.",
   "La configuración de colaboración externa (en External Identities) controla las reglas del juego. Las restricciones de acceso de usuarios invitados definen cuánto del directorio pueden ver los invitados: el mismo acceso que los miembros, acceso limitado a las propiedades y membresías de los objetos del directorio (el valor predeterminado), o la opción más restrictiva, en la que solo ven su propio perfil. La configuración de invitaciones de invitados decide quién puede invitar: cualquier persona de la organización, incluidos los invitados; los usuarios miembros y los usuarios con roles de administrador específicos; solo los usuarios con roles de administrador, incluido el rol Guest Inviter; o nadie. También puedes habilitar el registro de autoservicio de invitados mediante flujos de usuario, permitir que los usuarios externos abandonen la organización por su cuenta y establecer restricciones de colaboración con una lista de dominios permitidos o una lista de dominios bloqueados.",
   "Las cuentas de invitados deben gobernarse como cualquier otro acceso. Usa revisiones de acceso para confirmar que los invitados aún necesitan acceso, la administración de derechos para dar paquetes de acceso con límite de tiempo y los registros de inicio de sesión para detectar invitados inactivos. También puedes cambiar el userType de un usuario externo a Member cuando un socio trabaja como parte de tu equipo, o restablecer el estado de canje si cambia su correo o su identidad de origen, lo cual conserva su object ID y sus membresías de grupo."
  ],
  "terms": [
   [
    "B2B collaboration (colaboración B2B)",
    "Invitar a usuarios externos a usar tus recursos con sus propias identidades, representados como objetos de usuario en tu tenant."
   ],
   [
    "Redemption (canje)",
    "El paso en el que un usuario externo invitado acepta la invitación y vincula su identidad de origen con el objeto de invitado."
   ],
   [
    "Email one-time passcode (código de acceso de un solo uso por correo)",
    "Un método de inicio de sesión para invitados sin un proveedor de identidad compatible, en el que se envía un código por correo en cada inicio de sesión."
   ],
   [
    "Guest Inviter",
    "Un rol integrado que permite a un usuario invitar a usuarios externos cuando las invitaciones están restringidas a administradores."
   ],
   [
    "Collaboration restrictions (restricciones de colaboración)",
    "Una lista de dominios permitidos o bloqueados que controla a dónde se pueden enviar invitaciones."
   ]
  ],
  "example": "Una agencia de diseño necesita acceso a un sitio de SharePoint de Contoso para un proyecto de tres meses. El administrador de Contoso invita al personal de la agencia mediante un CSV masivo; ellos canjean la invitación con sus propias cuentas de Entra, y una directiva de Conditional Access exige MFA a los invitados. Contoso agrega el dominio de la agencia a la lista de permitidos para que el personal no pueda invitar a personas de otras empresas.",
  "tip": "Conoce las cuatro opciones de invitación de invitados y los tres niveles de restricción de acceso de invitados. Si un escenario quiere que los invitados vean solo su propio perfil, elige la opción de acceso de invitados más restrictiva; si quiere que solo se invite a ciertos dominios, usa las restricciones de colaboración.",
  "check": [
   [
    "¿Qué opción de inicio de sesión usa un invitado cuando su dominio no tiene un tenant de Entra ni otro proveedor de identidad configurado?",
    "El código de acceso de un solo uso por correo, o una cuenta Microsoft personal si la tiene."
   ],
   [
    "¿Cómo puedes impedir que los usuarios inviten a invitados del dominio de un competidor?",
    "Agregando el dominio del competidor a la lista de bloqueados en las restricciones de colaboración de la configuración de colaboración externa (o usando una lista de dominios aprobados permitidos)."
   ],
   [
    "¿Qué significa el estado de aceptación Pending en una cuenta de invitado?",
    "Que la invitación se envió, pero el usuario todavía no la ha canjeado."
   ]
  ]
 },
 {
  "t": "Cross-tenant access settings (inbound/outbound, trust settings), B2B direct connect and cross-tenant synchronization",
  "tt": "Configuración de acceso entre tenants (entrante/saliente, configuración de confianza), B2B direct connect y sincronización entre tenants",
  "body": [
   "La configuración de colaboración externa decide quién puede invitar a quién. La configuración de acceso entre tenants va más a fondo en la colaboración con otros tenants de Microsoft Entra: controla qué usuarios y aplicaciones pueden cruzar el límite, en qué dirección y si confías en las afirmaciones de seguridad del otro tenant. Se administra en External Identities, Cross-tenant access settings, con una configuración predeterminada que se aplica a todos los tenants de Entra externos y configuraciones organizativas que anulan los valores predeterminados para tenants específicos que agregas por dominio o tenant ID.",
   "La configuración tiene dos direcciones. El acceso entrante (inbound) controla a los usuarios externos que entran a tu tenant para usar tus recursos. El acceso saliente (outbound) controla a tus usuarios que salen a acceder a recursos de otras organizaciones. Para cada dirección, y para B2B collaboration y B2B direct connect por separado, puedes permitir o bloquear a todos los usuarios o a usuarios y grupos específicos, y a todas las aplicaciones o a algunas específicas. Ambos lados deben permitir una conexión para que funcione: tu salida y su entrada.",
   "La configuración de confianza entrante decide si tu Conditional Access acepta afirmaciones (claims) del tenant de origen del invitado. Puedes confiar en la autenticación multifactor realizada allí, en los dispositivos marcados como compatibles allí y en los dispositivos Microsoft Entra hybrid joined de allí. Sin confianza, un invitado con un requisito de cumplimiento no tendría forma de satisfacerlo, porque tu Intune no administra su laptop, y un requisito de MFA lo obligaría a registrar MFA de nuevo en tu tenant. La configuración de confianza también incluye el canje automático, que suprime la solicitud de consentimiento para los usuarios de ese tenant y debe habilitarse en ambos lados.",
   "B2B direct connect es un modelo diferente: no se crea ningún objeto de invitado en tu tenant. El usuario externo permanece por completo en su tenant de origen y obtiene acceso a recursos compartidos específicos, hoy principalmente los canales compartidos de Microsoft Teams. Como no hay un objeto que tú puedas gobernar, B2B direct connect está desactivado de forma predeterminada y requiere configuración mutua: ambas organizaciones deben habilitarlo de entrada y de salida la una para la otra. Los informes y registros de auditoría de ambos tenants muestran la actividad.",
   "La sincronización entre tenants (cross-tenant synchronization) automatiza la colaboración B2B entre tenants que tú controlas, como las filiales de una misma empresa. Se configura en el tenant de origen como un trabajo de aprovisionamiento que crea, actualiza y elimina objetos de usuario B2B en el tenant de destino, de forma predeterminada con userType Member para que aparezcan como colegas. El tenant de destino debe permitir la opción de sincronizar usuarios hacia este tenant en su configuración entrante para el tenant de origen, y normalmente habilita el canje automático para que los usuarios nunca vean una solicitud de consentimiento. El ámbito usa los usuarios y grupos asignados a la configuración más filtros de atributos, igual que el aprovisionamiento de aplicaciones, y los registros de aprovisionamiento muestran cada cambio. Es unidireccional; usa una segunda configuración en la otra dirección si necesitas ambas."
  ],
  "terms": [
   [
    "Inbound access (acceso entrante)",
    "Configuración entre tenants que controla qué usuarios y aplicaciones externos pueden llegar a los recursos de tu tenant."
   ],
   [
    "Outbound access (acceso saliente)",
    "Configuración entre tenants que controla cuáles de tus usuarios pueden acceder a recursos de otros tenants."
   ],
   [
    "Inbound trust settings (configuración de confianza entrante)",
    "Opciones para aceptar afirmaciones de MFA, dispositivo compatible y dispositivo hybrid joined desde el tenant de origen de un socio."
   ],
   [
    "B2B direct connect",
    "Confianza mutua que permite a usuarios externos acceder a recursos como los canales compartidos de Teams sin un objeto de invitado en tu tenant."
   ],
   [
    "Cross-tenant synchronization (sincronización entre tenants)",
    "Un trabajo de aprovisionamiento desde un tenant de origen que crea y mantiene usuarios B2B en un tenant de destino."
   ]
  ],
  "example": "Contoso exige MFA y un dispositivo compatible a todos los usuarios, incluidos los invitados. Un socio, Fabrikam, ya aplica ambos requisitos. Contoso agrega a Fabrikam como configuración organizativa, confía en la MFA y en los dispositivos compatibles de Fabrikam, y habilita B2B direct connect para que ambas empresas puedan compartir canales de Teams. Fabrikam configura en su lado la configuración de salida y de entrada correspondiente.",
  "tip": "Si a los invitados se les pide registrar MFA en tu tenant aunque ya hicieron MFA en su organización, la solución es la configuración de confianza entrante. Si el escenario menciona canales compartidos de Teams sin cuentas de invitado, la respuesta es B2B direct connect, que ambos tenants deben habilitar.",
  "check": [
   [
    "¿Dónde se configura la sincronización entre tenants y qué debe permitir el otro tenant?",
    "Se configura en el tenant de origen; el tenant de destino debe permitir la sincronización de usuarios hacia este tenant en su configuración de acceso entre tenants entrante para el origen."
   ],
   [
    "¿Qué configuración evita que los invitados de un socio de confianza queden bloqueados por tu directiva que exige dispositivos compatibles?",
    "La configuración de confianza entrante para esa organización, confiando en los dispositivos compatibles del tenant del socio."
   ],
   [
    "¿B2B direct connect crea un objeto de usuario invitado en el tenant de recursos?",
    "No. Los usuarios permanecen en su tenant de origen, y por eso ambas organizaciones deben habilitarlo explícitamente."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Microsoft Entra Connect Sync vs Microsoft Entra Cloud Sync, filtering and sync scheduling",
  "tt": "Identidad híbrida: Microsoft Entra Connect Sync frente a Microsoft Entra Cloud Sync, filtrado y programación de la sincronización",
  "body": [
   "La mayoría de las organizaciones todavía tiene Active Directory Domain Services (AD DS) local. Identidad híbrida significa que las mismas personas existen en ambos lugares con un único conjunto de credenciales, y la sincronización copia usuarios, grupos y, opcionalmente, dispositivos desde AD hacia Microsoft Entra ID. Microsoft ofrece dos herramientas para esto, y el examen pregunta cuál elegir.",
   "Microsoft Entra Connect Sync es el motor de sincronización tradicional. Lo instalas en un Windows Server unido al dominio, donde ejecuta un motor de sincronización completo con una base de datos SQL (SQL Server Express de forma predeterminada). Solo un servidor exporta activamente a un tenant; un segundo servidor puede funcionar en modo de preparación (staging mode), importando y sincronizando pero sin exportar, listo para una conmutación por error o para probar cambios de configuración. Connect Sync admite el conjunto de funciones más amplio: sincronización de dispositivos para la unión híbrida, escritura diferida de grupos (group writeback), escritura diferida de dispositivos, escritura diferida de Exchange híbrido, configuración de autenticación de paso a través y federación, y reglas de sincronización muy personalizables con el Synchronization Rules Editor.",
   "Microsoft Entra Cloud Sync traslada el motor a la nube. Solo instalas un agente de aprovisionamiento ligero en uno o más servidores, y la configuración vive en el Centro de administración de Microsoft Entra. Varios agentes dan alta disponibilidad sin servidores de preparación, y Cloud Sync maneja bien varios bosques desconectados, lo que ayuda después de fusiones. No cubre todas las funciones de Connect Sync; por ejemplo, no sincroniza objetos de dispositivo para la unión híbrida ni admite la autenticación de paso a través, así que revisa los requisitos. Microsoft presenta Cloud Sync como la dirección futura, y ambas herramientas pueden ejecutarse en el mismo tenant para distintos conjuntos de objetos, como Connect Sync para el bosque principal y Cloud Sync para un bosque adquirido.",
   "El filtrado decide qué objetos se sincronizan. Con Connect Sync puedes filtrar por dominio, por unidad organizativa (OU), por atributo mediante reglas de sincronización personalizadas y por membresía de grupo, aunque el filtrado basado en grupos está pensado solo para pilotos. Cloud Sync define el ámbito por OU o por grupo de seguridad. Filtrar con cuidado mantiene fuera de la nube las cuentas de servicio, los usuarios de prueba y los objetos obsoletos. Sacar objetos del ámbito los elimina en Entra, por eso Connect Sync tiene un umbral de eliminaciones accidentales (500 objetos de forma predeterminada) que detiene una exportación que eliminaría demasiados a la vez.",
   "Connect Sync ejecuta un ciclo de sincronización delta cada 30 minutos de forma predeterminada. Puedes revisar el programador y forzar una ejecución con PowerShell en el servidor:",
   "```powershell\nGet-ADSyncScheduler\nStart-ADSyncSyncCycle -PolicyType Delta\nStart-ADSyncSyncCycle -PolicyType Initial   # sincronización completa después de cambiar reglas o filtros\n```",
   "Usa un ciclo delta para enviar un cambio reciente, y un ciclo inicial (completo) después de cambiar el filtrado o las reglas de sincronización. Cloud Sync se ejecuta con su propia programación frecuente y ofrece aprovisionamiento a petición (provision on demand) para probar un solo usuario. La sincronización de hash de contraseñas se ejecuta en su propio ciclo más corto, separado de la sincronización de objetos."
  ],
  "terms": [
   [
    "Microsoft Entra Connect Sync",
    "Un motor de sincronización local en Windows Server con una base de datos SQL, que admite el conjunto de funciones híbridas más amplio."
   ],
   [
    "Microsoft Entra Cloud Sync",
    "Un servicio de sincronización administrado desde la nube que usa agentes de aprovisionamiento ligeros; se configura en el Centro de administración de Entra."
   ],
   [
    "Staging mode (modo de preparación)",
    "Un servidor de Connect Sync que importa y sincroniza pero no exporta; se usa para conmutación por error y pruebas."
   ],
   [
    "Delta sync (sincronización delta)",
    "Un ciclo de sincronización que procesa solo los cambios desde la última ejecución."
   ],
   [
    "Accidental deletes threshold (umbral de eliminaciones accidentales)",
    "Una protección de Connect Sync que bloquea las exportaciones que eliminarían más de un número establecido de objetos."
   ]
  ],
  "example": "Contoso adquiere Litware, cuyo bosque de AD no tiene conectividad de red con el de Contoso. Contoso mantiene Connect Sync para su propio bosque, que usa unión híbrida y group writeback, e instala dos agentes de aprovisionamiento de Cloud Sync en el bosque de Litware. Los usuarios de Litware aparecen en el mismo tenant en minutos, sin VPN entre los bosques.",
  "tip": "Bosques desconectados o la necesidad de un agente ligero y de alta disponibilidad apuntan a Cloud Sync. La sincronización de dispositivos para la unión híbrida, la autenticación de paso a través o reglas de sincronización personalizadas complejas apuntan a Connect Sync. Recuerda Start-ADSyncSyncCycle -PolicyType Delta para forzar una sincronización.",
  "check": [
   [
    "¿Cuál es el intervalo predeterminado del programador de Microsoft Entra Connect Sync?",
    "30 minutos para un ciclo de sincronización delta."
   ],
   [
    "¿Cómo proporcionas conmutación por error para Connect Sync y en qué se diferencia Cloud Sync?",
    "Connect Sync usa un segundo servidor en modo de preparación que cambias a activo; Cloud Sync simplemente instala varios agentes de aprovisionamiento para alta disponibilidad."
   ],
   [
    "¿Qué ciclo de sincronización debes ejecutar después de cambiar el filtrado por OU?",
    "Un ciclo inicial (completo), Start-ADSyncSyncCycle -PolicyType Initial."
   ]
  ]
 },
 {
  "t": "Sign-in methods for hybrid users: password hash sync, pass-through authentication, federation, Seamless SSO, staged rollout",
  "tt": "Métodos de inicio de sesión para usuarios híbridos: sincronización de hash de contraseñas, autenticación de paso a través, federación, Seamless SSO e implementación por etapas",
  "body": [
   "Una vez que los usuarios están sincronizados, debes decidir dónde se verifican sus contraseñas cuando inician sesión en servicios en la nube. Hay tres métodos de autenticación, y elegir entre ellos es un tema favorito del examen.",
   "La sincronización de hash de contraseñas (password hash synchronization, PHS) copia a Microsoft Entra ID un hash del hash de la contraseña local, nunca la contraseña en sí. El hash local se vuelve a procesar con una sal (salt) y muchas iteraciones antes de salir de la red. Luego Microsoft Entra ID autentica a los usuarios directamente en la nube. PHS es la opción más sencilla, no depende de la infraestructura local en el momento del inicio de sesión y habilita la detección de credenciales filtradas en Microsoft Entra ID Protection, porque Microsoft puede comparar los hashes con datos conocidos de filtraciones. Los cambios de contraseña se sincronizan en minutos. Muchas organizaciones habilitan PHS incluso cuando usan otro método, como respaldo.",
   "La autenticación de paso a través (pass-through authentication, PTA) valida las contraseñas contra el AD local en tiempo real. Unos agentes ligeros instalados en el entorno local establecen conexiones salientes hacia Entra; cuando un usuario inicia sesión, la contraseña cifrada se coloca en una cola, un agente la toma y la verifica contra un controlador de dominio. No se almacena ningún hash de contraseña en la nube, y las directivas de cuenta locales como los horarios de inicio de sesión y las cuentas deshabilitadas o bloqueadas se aplican de inmediato. Instala al menos tres agentes para tener resiliencia, porque si no se puede llegar a ningún agente, los usuarios no pueden iniciar sesión.",
   "La federación delega la autenticación a un proveedor de identidad separado, normalmente Active Directory Federation Services (AD FS). Los usuarios son redirigidos al servidor de federación, que emite un token en el que Entra confía. La federación admite requisitos que los métodos en la nube no pueden cubrir, como algunos escenarios de tarjetas inteligentes locales o de MFA de terceros, pero implica la mayor infraestructura: servidores de federación, proxies, certificados y balanceadores de carga. Microsoft recomienda pasar de la federación a la autenticación en la nube cuando sea posible.",
   "El inicio de sesión único de conexión directa (Seamless SSO) funciona con PHS o PTA, no con federación. Cuando un usuario en un dispositivo unido al dominio dentro de la red corporativa abre una aplicación en la nube, el navegador obtiene un ticket Kerberos para una cuenta de equipo llamada AZUREADSSOACC que Entra Connect crea en AD, y Entra inicia la sesión del usuario sin pedirle contraseña. La clave de descifrado Kerberos de esta cuenta debe renovarse periódicamente. Los dispositivos Windows Entra joined y hybrid joined usan su primary refresh token para SSO, así que Seamless SSO ayuda sobre todo a dispositivos más antiguos o que solo están unidos al dominio.",
   "La implementación por etapas (staged rollout) te permite pasar de la federación a la autenticación en la nube de forma gradual. Activas PHS o PTA para grupos de seguridad seleccionados, y solo esos usuarios se autentican en la nube mientras el dominio sigue federado para todos los demás. Los grupos anidados y dinámicos no se admiten en la implementación por etapas, así que usa grupos con asignación directa. Cuando el piloto tiene éxito, conviertes el dominio de federado a administrado (managed)."
  ],
  "terms": [
   [
    "Password hash synchronization (sincronización de hash de contraseñas)",
    "Sincronizar una versión con sal y vuelta a procesar del hash de la contraseña local para que Entra ID pueda autenticar a los usuarios en la nube."
   ],
   [
    "Pass-through authentication (autenticación de paso a través)",
    "Inicio de sesión en la nube en el que agentes locales validan las contraseñas contra AD DS en tiempo real."
   ],
   [
    "Federation (federación)",
    "Delegar la autenticación a un proveedor de identidad separado, como AD FS, que emite tokens en los que Entra confía."
   ],
   [
    "Seamless SSO (SSO de conexión directa)",
    "Inicio de sesión silencioso basado en Kerberos para dispositivos unidos al dominio en la red corporativa; se usa con PHS o PTA."
   ],
   [
    "Staged rollout (implementación por etapas)",
    "Pasar grupos seleccionados de la autenticación federada a la autenticación en la nube antes de convertir todo el dominio."
   ]
  ],
  "example": "Un banco usa AD FS, pero sus servidores de federación son costosos de mantener. El equipo habilita la sincronización de hash de contraseñas para todos como respaldo, usa la implementación por etapas para pasar un grupo piloto de 200 usuarios a PHS con Seamless SSO, vigila los registros de inicio de sesión durante un mes y luego convierte el dominio a administrado y retira AD FS.",
  "tip": "Si el escenario necesita que las directivas locales, como los horarios de inicio de sesión, se apliquen al iniciar sesión sin almacenar hashes en la nube, elige PTA. Si busca la menor infraestructura o la detección de credenciales filtradas, elige PHS. Seamless SSO nunca se combina con federación.",
  "check": [
   [
    "¿Qué método de inicio de sesión híbrido habilita la detección de credenciales filtradas en ID Protection?",
    "La sincronización de hash de contraseñas, porque Entra ID tiene los hashes para compararlos con credenciales filtradas."
   ],
   [
    "¿Qué pasa con los inicios de sesión de autenticación de paso a través si todos los agentes locales están fuera de línea?",
    "Los usuarios no pueden iniciar sesión con PTA; por eso se instalan varios agentes (y se puede habilitar PHS como respaldo)."
   ],
   [
    "¿Cuál es el propósito de la implementación por etapas?",
    "Probar la autenticación en la nube (PHS o PTA) con grupos seleccionados mientras el dominio sigue federado, antes de convertirlo por completo."
   ]
  ]
 },
 {
  "t": "Monitoring sync health with Microsoft Entra Connect Health and troubleshooting sync errors",
  "tt": "Supervisión del estado de la sincronización con Microsoft Entra Connect Health y solución de errores de sincronización",
  "body": [
   "La sincronización se ejecuta en silencio en segundo plano, así que necesitas supervisión para saber cuándo falla. Microsoft Entra Connect Health proporciona esa supervisión para la infraestructura de identidad híbrida. Usa agentes en tus servidores locales: el agente de sincronización se instala con Microsoft Entra Connect Sync, y otros agentes separados pueden supervisar servidores AD FS y controladores de dominio AD DS. Connect Health requiere licencias Microsoft Entra ID P1.",
   "En la hoja de Connect Health ves el estado de cada servidor supervisado, las alertas activas (por ejemplo, el servicio de sincronización no se está ejecutando, falló una exportación a Entra ID o se detuvo la sincronización de hash de contraseñas), la hora de la última sincronización correcta y datos de rendimiento. Puedes configurar notificaciones por correo para que los administradores adecuados se enteren de las alertas aunque no estén mirando el portal. Para AD FS, Connect Health también informa de inicios de sesión fallidos y direcciones IP riesgosas; para AD DS, informa sobre la replicación y el estado de los controladores de dominio.",
   "El informe Synchronization errors enumera los objetos que no se pudieron exportar y el motivo. Las categorías comunes son: duplicate attribute (atributo duplicado), cuando dos objetos tienen el mismo valor de UserPrincipalName o proxyAddresses, lo que Entra bloquea porque deben ser únicos; data mismatch (discrepancia de datos), cuando una coincidencia flexible encuentra un objeto que no se puede emparejar; data validation failure (fallo de validación de datos), por ejemplo caracteres no válidos en un UPN; large attribute (atributo grande), cuando un valor como userCertificate supera el tamaño permitido; y federated domain change (cambio de dominio federado), cuando un cambio de sufijo UPN mueve a un usuario entre dominios federados. Cada entrada muestra los objetos en conflicto para que puedas corregir los datos de origen.",
   "Muchos errores de sincronización vienen de la coincidencia (matching). Cuando un objeto sincronizado llega por primera vez a Entra, intenta coincidir con un objeto existente en la nube. Una coincidencia estricta (hard match) usa el sourceAnchor, almacenado como immutableId en Entra y basado de forma predeterminada en ms-DS-ConsistencyGuid en las implementaciones modernas. Una coincidencia flexible (soft match) recurre a la dirección SMTP principal o al UPN. La coincidencia flexible es la forma de vincular una cuenta local con un usuario solo de nube creado antes; por seguridad, se bloquea la coincidencia flexible con cuentas de nube que tienen roles de administrador, y Microsoft recomienda bloquear también la toma de control de objetos de nube mediante coincidencia estricta.",
   "En el propio servidor de Connect Sync, Synchronization Service Manager muestra cada perfil de ejecución, su estado y cualquier error a nivel de objeto en los conectores, y el asistente de Microsoft Entra Connect ofrece una tarea de solución de problemas que verifica la sincronización de objetos y la sincronización de hash de contraseñas para un usuario específico. Entre los comandos útiles están Get-ADSyncScheduler, para confirmar que el programador está habilitado y no en mantenimiento, y Start-ADSyncSyncCycle, para volver a ejecutar la sincronización después de una corrección. Antes de una primera sincronización, la herramienta IdFix ayuda a encontrar y corregir duplicados y caracteres no válidos en AD.",
   "La solución de problemas sigue un patrón: lee el error, identifica los objetos en conflicto, corrige los datos en la fuente de autoridad (normalmente el AD local) y ejecuta una sincronización delta. Evita editar atributos sincronizados en la nube, porque la siguiente sincronización los sobrescribirá o fallará."
  ],
  "terms": [
   [
    "Microsoft Entra Connect Health",
    "Un servicio de supervisión con agentes locales que informa del estado, las alertas y los errores de sincronización de Connect Sync, AD FS y AD DS."
   ],
   [
    "Duplicate attribute error (error de atributo duplicado)",
    "Un error de sincronización cuando dos objetos comparten un valor, como el UPN o proxyAddresses, que debe ser único."
   ],
   [
    "Hard match (coincidencia estricta)",
    "Emparejar un objeto local con un objeto de nube mediante el sourceAnchor (immutableId)."
   ],
   [
    "Soft match (coincidencia flexible)",
    "Emparejar un objeto local con un objeto de nube existente mediante la dirección SMTP principal o el UPN."
   ],
   [
    "IdFix",
    "Una herramienta que analiza el AD local en busca de problemas de datos, como duplicados y caracteres no válidos, antes de la sincronización."
   ]
  ],
  "example": "Connect Health envía por correo una alerta de que dos objetos no se pudieron exportar. El informe muestra un valor de proxyAddresses duplicado: la cuenta deshabilitada de un empleado que se fue todavía tiene el mismo alias de correo que un nuevo empleado. El administrador quita el alias de la cuenta antigua en AD, ejecuta Start-ADSyncSyncCycle -PolicyType Delta y el error desaparece en la siguiente exportación.",
  "tip": "Corrige los errores de sincronización en la fuente de autoridad, no en la nube. Para un error de atributo duplicado, busca el otro objeto que tiene el valor; para una sincronización detenida sin errores, revisa si el programador está deshabilitado o si el servidor está en modo de preparación.",
  "check": [
   [
    "¿Qué licencia requiere Microsoft Entra Connect Health?",
    "Microsoft Entra ID P1 (o un plan que la incluya)."
   ],
   [
    "Un nuevo usuario sincronizado falla con un error de atributo duplicado en UserPrincipalName. ¿Qué haces?",
    "Buscas el otro objeto que ya usa ese UPN, cambias o quitas el valor en el origen (normalmente el AD local) y luego ejecutas una sincronización delta."
   ],
   [
    "¿Cuál es la diferencia entre una coincidencia estricta y una flexible?",
    "Una coincidencia estricta usa el sourceAnchor/immutableId; una coincidencia flexible usa la dirección SMTP principal o el UPN para vincularse con un objeto de nube existente."
   ]
  ]
 },
 {
  "t": "Authentication methods policy: Microsoft Authenticator, passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, Temporary Access Pass, SMS/voice",
  "tt": "Directiva de métodos de autenticación: Microsoft Authenticator, llaves de acceso (FIDO2), Windows Hello for Business, autenticación basada en certificados, Temporary Access Pass, SMS/voz",
  "body": [
   "La directiva de métodos de autenticación (Authentication methods policy) es el lugar central de Microsoft Entra ID para decidir qué métodos pueden registrar y usar los usuarios para el inicio de sesión, la MFA y el restablecimiento de contraseña de autoservicio. Los tenants más antiguos tenían directivas heredadas separadas para MFA y SSPR; Microsoft ha estado migrando a todos a la directiva unificada, y la configuración nueva va allí. Para cada método, lo habilitas o deshabilitas, lo diriges a todos los usuarios o a grupos seleccionados, excluyes grupos y estableces opciones específicas del método.",
   "Microsoft Authenticator admite notificaciones push con coincidencia de números (number matching), en las que el usuario escribe en la aplicación el número que aparece en la pantalla de inicio de sesión, lo cual frustra los ataques de fatiga de MFA que dependen de que un usuario apruebe una solicitud al azar. El contexto adicional puede mostrar el nombre de la aplicación y la ubicación. Authenticator también admite el inicio de sesión sin contraseña por teléfono y puede almacenar llaves de acceso (passkeys) vinculadas al dispositivo.",
   "Las llaves de acceso (passkeys, FIDO2) usan criptografía de clave pública: una clave privada permanece en una llave de seguridad, un teléfono o una computadora y nunca sale de ahí, y solo responde a desafíos del dominio de inicio de sesión legítimo. Esto las hace resistentes al phishing. En la configuración de passkeys puedes exigir la atestación y restringir los modelos permitidos por su Authenticator Attestation GUID (AAGUID). Windows Hello for Business es un método resistente al phishing integrado en Windows que vincula una clave al TPM del dispositivo y la desbloquea con un PIN o un dato biométrico.",
   "La autenticación basada en certificados (CBA) permite a los usuarios iniciar sesión con un certificado X.509, como una tarjeta inteligente, validado contra las entidades de certificación que cargas en Entra. Configuras el enlace de nombre de usuario (qué campo del certificado corresponde a qué atributo del usuario) y reglas de enlace de autenticación que deciden si un certificado cuenta como un solo factor o como multifactor. CBA elimina la necesidad de servidores de federación solo para admitir tarjetas inteligentes.",
   "Temporary Access Pass (TAP) es un código de acceso con límite de tiempo que emite un administrador, ya sea de un solo uso o de varios usos dentro de su vigencia. Se usa para incorporar a un usuario nuevo que todavía no tiene métodos, o para recuperar a un usuario que perdió su dispositivo, de modo que pueda registrar una passkey o Authenticator sin conocer nunca una contraseña. TAP cuenta como autenticación fuerte, así que trata su emisión como una acción sensible.",
   "Los SMS y las llamadas de voz siguen disponibles, pero son los métodos más débiles, vulnerables al SIM swapping y a la interceptación. Mantenlos solo como respaldo y planea mover a los usuarios a métodos más fuertes. Otros métodos incluyen tokens OATH de software y de hardware, y el OTP por correo, que se usa para SSPR de los miembros y para el inicio de sesión de invitados, no como método de MFA.",
   "En todo esto, el principio es una escalera: los métodos resistentes al phishing (passkeys, Windows Hello for Business, CBA) son los más fuertes, luego las notificaciones push o códigos de Authenticator, y después SMS y voz. Las authentication strengths (niveles de autenticación) de Conditional Access te permiten exigir un peldaño de esa escalera para aplicaciones específicas."
  ],
  "terms": [
   [
    "Authentication methods policy (directiva de métodos de autenticación)",
    "La directiva unificada de Entra que habilita y dirige los métodos para el inicio de sesión, la MFA y el SSPR."
   ],
   [
    "Number matching (coincidencia de números)",
    "Una función de push de Authenticator que exige al usuario introducir un número mostrado en la pantalla de inicio de sesión, lo que bloquea las aprobaciones por fatiga de MFA."
   ],
   [
    "Passkey (FIDO2) (llave de acceso)",
    "Una credencial resistente al phishing que usa una clave privada guardada en el dispositivo y vinculada al dominio de inicio de sesión."
   ],
   [
    "Temporary Access Pass (pase de acceso temporal)",
    "Un código de acceso con límite de tiempo emitido por un administrador para incorporación o recuperación, que se usa para registrar métodos más fuertes."
   ],
   [
    "Certificate-based authentication (autenticación basada en certificados)",
    "Iniciar sesión en Entra ID con un certificado X.509 validado contra las entidades de certificación cargadas."
   ]
  ],
  "example": "Una enfermera nueva empieza el lunes sin ningún teléfono registrado. La mesa de ayuda emite un Temporary Access Pass de un solo uso válido por unas horas. Ella inicia sesión con él, registra una llave de seguridad FIDO2 y Microsoft Authenticator, y a partir de entonces inicia sesión sin contraseña. Los SMS están habilitados solo para un grupo pequeño que no tiene smartphones.",
  "tip": "Resistente al phishing significa passkeys/FIDO2, Windows Hello for Business y autenticación basada en certificados, no el push de Authenticator ni los SMS. Cuando un usuario no tiene métodos y debe configurar el inicio de sesión sin contraseña, la respuesta es Temporary Access Pass.",
  "check": [
   [
    "¿Qué función de Authenticator protege contra la fatiga de MFA (bombardeo de solicitudes)?",
    "La coincidencia de números, que exige al usuario escribir el número que aparece en la pantalla de inicio de sesión."
   ],
   [
    "¿Cómo puedes permitir solo modelos específicos de llaves de seguridad FIDO2?",
    "Exigiendo la atestación y restringiendo las llaves por AAGUID en la configuración de passkey (FIDO2) de la directiva de métodos de autenticación."
   ],
   [
    "¿Para qué está diseñado Temporary Access Pass?",
    "Para que un usuario sin métodos registrados (nuevo o en recuperación) inicie sesión por tiempo limitado y registre métodos fuertes o sin contraseña."
   ]
  ]
 },
 {
  "t": "Registration campaigns, combined security info registration and system-preferred MFA",
  "tt": "Campañas de registro, registro combinado de información de seguridad y MFA preferida por el sistema",
  "body": [
   "La autenticación fuerte solo ayuda si los usuarios realmente registran métodos fuertes. Microsoft Entra ID tiene tres funciones que trabajan juntas para llevar a los usuarios a mejores métodos y mantenerlos ahí: el registro combinado de información de seguridad, las campañas de registro y la MFA preferida por el sistema.",
   "El registro combinado de información de seguridad (combined security info registration) ofrece a los usuarios una sola experiencia para registrar métodos tanto de autenticación multifactor como de restablecimiento de contraseña de autoservicio, en lugar de registrarse dos veces en dos lugares distintos. Los usuarios llegan a ella desde la página My Security Info de su portal de cuenta, o se les interrumpe durante el inicio de sesión cuando una directiva exige el registro. El registro combinado ya es la experiencia estándar en todos los tenants. Los administradores pueden proteger el propio proceso de registro con una directiva de Conditional Access dirigida a la acción de usuario Register security information, por ejemplo permitiendo el registro solo desde una ubicación de confianza o un dispositivo compatible, o exigiendo un Temporary Access Pass a los usuarios nuevos. Esto importa porque, de lo contrario, un atacante que roba una contraseña podría registrar primero su propio método de MFA.",
   "Una campaña de registro (registration campaign), también llamada nudge (empujón), pide a los usuarios que ya hacen MFA con un método más débil, como SMS o voz, que configuren Microsoft Authenticator (u otro método objetivo) durante el inicio de sesión. Se configura en la directiva de métodos de autenticación, en Registration campaign: la activas, eliges qué usuarios o grupos se incluyen o excluyen y defines cuántos días pueden los usuarios posponer el aviso. Los usuarios pueden omitirlo un número limitado de veces antes de que desaparezca la opción de posponer. La campaña solo se dirige a usuarios que están habilitados para el método objetivo en la directiva de métodos de autenticación y que todavía no lo han registrado, y no molesta a quienes ya se cambiaron.",
   "La MFA preferida por el sistema (system-preferred MFA) cambia el método que Entra solicita. Antes, se usaba primero el método predeterminado del usuario, que elegía él mismo y a menudo era SMS, aunque hubiera registrado algo más fuerte. Con la MFA preferida por el sistema, Entra solicita el método más seguro que el usuario tenga registrado y que la directiva permita, y el usuario aún puede elegir otro método de la lista si lo necesita. La clasificación pone métodos como passkeys (FIDO2) y notificaciones de Authenticator por delante de los códigos OATH, y SMS y voz cerca del final. La MFA preferida por el sistema la administra Microsoft y está habilitada de forma predeterminada, aunque los administradores pueden excluir grupos mientras solucionan problemas.",
   "Juntas, estas funciones forman un ciclo de vida: los usuarios se registran en un solo lugar, reciben un empujón hacia un método más fuerte y luego se les solicita automáticamente ese método más fuerte. Para medir el avance, abre los informes Authentication methods activity y User registration details, que muestran quién registró qué métodos y quién es capaz de MFA, capaz de iniciar sesión sin contraseña o está registrado en SSPR. Combina esto con las authentication strengths de Conditional Access una vez que la mayoría de los usuarios se haya registrado, para que los métodos fuertes pasen a ser obligatorios y no solo preferidos."
  ],
  "terms": [
   [
    "Combined security info registration (registro combinado de información de seguridad)",
    "Una sola experiencia de registro para métodos de MFA y SSPR, a la que se llega desde la página My Security Info."
   ],
   [
    "Registration campaign (campaña de registro)",
    "Un aviso (nudge) durante el inicio de sesión que pide a los usuarios con métodos más débiles registrar Microsoft Authenticator u otro método objetivo."
   ],
   [
    "System-preferred MFA (MFA preferida por el sistema)",
    "Comportamiento de Entra que solicita el método registrado más fuerte en lugar del método predeterminado elegido por el usuario."
   ],
   [
    "Register security information user action (acción de usuario Register security information)",
    "Un destino de Conditional Access que se usa para controlar cuándo y dónde los usuarios pueden registrar métodos de autenticación."
   ]
  ],
  "example": "Los informes muestran que el 60 por ciento del personal todavía usa SMS para la MFA. El administrador inicia una campaña de registro para todos los usuarios, permitiendo posponerla unos días, y agrega una directiva de Conditional Access que permite el registro de información de seguridad solo desde la red de la oficina o con un Temporary Access Pass. Tres meses después, la mayoría de los usuarios tiene Authenticator, y la MFA preferida por el sistema se lo solicita automáticamente.",
  "tip": "El nudge lleva a los usuarios a Authenticator; la MFA preferida por el sistema hace que Entra solicite el método más fuerte ya registrado. Para impedir que los atacantes registren métodos con una contraseña robada, usa una directiva de Conditional Access sobre la acción de usuario Register security information.",
  "check": [
   [
    "¿Qué función pide a los usuarios que usan SMS configurar Microsoft Authenticator al iniciar sesión?",
    "Una campaña de registro (nudge) configurada en la directiva de métodos de autenticación."
   ],
   [
    "Un usuario registró tanto SMS como una passkey, y SMS es su método predeterminado. ¿Qué solicita la MFA preferida por el sistema?",
    "La passkey, porque es el método registrado más seguro que permite la directiva."
   ],
   [
    "¿Cómo puedes restringir dónde se permite a los usuarios registrar métodos de MFA?",
    "Creando una directiva de Conditional Access dirigida a la acción de usuario Register security information, por ejemplo exigiendo una ubicación de confianza o un dispositivo compatible."
   ]
  ]
 },
 {
  "t": "Self-service password reset (SSPR): methods, registration, and password writeback for hybrid users",
  "tt": "Restablecimiento de contraseña de autoservicio (SSPR): métodos, registro y escritura diferida de contraseñas para usuarios híbridos",
  "body": [
   "El restablecimiento de contraseña de autoservicio (SSPR) permite a los usuarios restablecer una contraseña olvidada o desbloquear su cuenta sin llamar a la mesa de ayuda. Reduce los costos de soporte y devuelve a los usuarios al trabajo más rápido, pero también es una vía de ataque, así que su configuración importa.",
   "Habilitas SSPR en Password reset con uno de tres ámbitos: None, Selected (un grupo) o All. Luego eliges cuántos métodos se requieren para restablecer, uno o dos, y qué métodos se permiten: notificación de la aplicación móvil, código de la aplicación móvil, correo electrónico, teléfono móvil (SMS o llamada), teléfono de oficina y preguntas de seguridad. Las preguntas de seguridad son la opción más débil y los administradores no pueden usarlas. Los tenants modernos también administran los métodos disponibles mediante la directiva de métodos de autenticación, que es donde Microsoft está consolidando la configuración de métodos.",
   "Los administradores siguen una directiva separada y más estricta que no puedes debilitar: Microsoft siempre aplica una directiva de dos métodos a los roles de administrador, y los administradores no pueden usar preguntas de seguridad. Así, aunque SSPR esté en None para los usuarios, los administradores aún pueden restablecer sus propias contraseñas con métodos fuertes.",
   "La configuración de registro decide si se exige a los usuarios registrarse al iniciar sesión y con qué frecuencia (en días) se les pide volver a confirmar su información. Con el registro combinado, los usuarios registran los métodos de SSPR y de MFA en un solo lugar. Las notificaciones pueden alertar a los usuarios cuando se restablece su contraseña y alertar a todos los administradores cuando otro administrador restablece su contraseña, lo que ayuda a detectar abusos. También puedes personalizar el vínculo de la mesa de ayuda que aparece en la página de restablecimiento.",
   "La escritura diferida de contraseñas (password writeback) es la configuración híbrida clave. Para los usuarios sincronizados, la fuente de autoridad de la contraseña es el Active Directory local, así que un restablecimiento de contraseña en la nube debe escribirse de vuelta en AD. La escritura diferida es compatible con Microsoft Entra Connect Sync y con Cloud Sync, y requiere Microsoft Entra ID P1 o superior. La cuenta de sincronización en AD necesita permisos para restablecer y cambiar contraseñas y para escribir los atributos lockoutTime y pwdLastSet en los objetos de usuario dentro del ámbito. Una vez habilitada en la herramienta de sincronización, activas la escritura diferida en el Centro de administración de Entra, en Password reset, On-premises integration, y también puedes permitir que los usuarios desbloqueen cuentas sin restablecer su contraseña.",
   "La escritura diferida funciona sobre la conexión saliente que la herramienta de sincronización ya usa, así que no se necesitan puertos de firewall entrantes. Respeta la directiva de contraseñas local: si la nueva contraseña no cumple las reglas de complejidad o historial de AD, el usuario recibe un error inmediato. Si los usuarios informan que los restablecimientos en la nube no funcionan en sus PC, verifica que la escritura diferida esté habilitada en ambos lados, que los permisos sean correctos y que el usuario esté en el ámbito de sincronización."
  ],
  "terms": [
   [
    "SSPR",
    "Self-service password reset (restablecimiento de contraseña de autoservicio), que permite a los usuarios restablecer contraseñas o desbloquear cuentas con métodos registrados."
   ],
   [
    "Password writeback (escritura diferida de contraseñas)",
    "Escribir de vuelta en el AD local las contraseñas cambiadas o restablecidas en Entra ID para los usuarios sincronizados."
   ],
   [
    "Number of methods required (número de métodos requeridos)",
    "La configuración de SSPR (uno o dos) que controla cuántos métodos de verificación debe superar un usuario para restablecer."
   ],
   [
    "Admin SSPR policy (directiva SSPR de administradores)",
    "La directiva fija y más fuerte para los roles de administrador, que exige dos métodos y no permite preguntas de seguridad."
   ]
  ],
  "example": "Una usuaria sincronizada olvida su contraseña mientras está de viaje. Usa SSPR, supera una notificación de Authenticator y un código telefónico, y establece una contraseña nueva. Como la escritura diferida está habilitada en Entra Connect y en la configuración de Password reset, la nueva contraseña se escribe en AD de inmediato, así que puede desbloquear con ella su laptop unida al dominio a través de la VPN.",
  "tip": "Si los usuarios sincronizados pueden restablecer en la nube pero su contraseña local no cambia, la respuesta es la escritura diferida de contraseñas (P1, habilitada en la herramienta de sincronización y en el portal). Recuerda que los administradores siempre tienen la directiva de dos métodos y no pueden usar preguntas de seguridad.",
  "check": [
   [
    "¿Cuáles son los tres ámbitos de habilitación de SSPR?",
    "None, Selected (un solo grupo) y All."
   ],
   [
    "¿Qué licencia se requiere para SSPR con escritura diferida de contraseñas al entorno local?",
    "Microsoft Entra ID P1 o superior."
   ],
   [
    "¿Pueden los administradores usar preguntas de seguridad para SSPR?",
    "No. Los roles de administrador siempre usan una directiva más fuerte de dos métodos que excluye las preguntas de seguridad."
   ]
  ]
 },
 {
  "t": "Microsoft Entra Password Protection: global and custom banned password lists, smart lockout, on-premises DC agent and proxy",
  "tt": "Microsoft Entra Password Protection: listas global y personalizada de contraseñas prohibidas, bloqueo inteligente, agente de DC y proxy locales",
  "body": [
   "Muchas brechas empiezan con password spraying (rociado de contraseñas): un atacante prueba unas pocas contraseñas comunes, como una estación del año más un año, contra muchas cuentas. Microsoft Entra Password Protection hace imposible establecer esas contraseñas fáciles de adivinar, y el bloqueo inteligente (smart lockout) frena los intentos de adivinar sin bloquear a los usuarios reales.",
   "La lista global de contraseñas prohibidas la mantiene Microsoft a partir de telemetría de ataques reales. Se aplica automáticamente a todos los usuarios de la nube, no puedes verla ni editarla, y se actualiza sin intervención del administrador. La lista personalizada de contraseñas prohibidas es tuya: agregas términos específicos de tu organización, como el nombre de tu empresa, nombres de productos, equipos deportivos locales o la ciudad, y Entra bloquea las contraseñas construidas a partir de ellos. La lista personalizada admite hasta 1,000 términos base y requiere Microsoft Entra ID P1.",
   "La evaluación es más inteligente que una simple búsqueda. La contraseña se normaliza (se pasa a minúsculas y se revierten sustituciones de caracteres comunes como 0 por o y $ por s), y luego se busca si contiene términos prohibidos, incluidas coincidencias aproximadas con una sola edición de diferencia. Después, una regla de puntuación decide: cada término prohibido encontrado cuenta como un punto y cada carácter restante cuenta como un punto, y la contraseña debe sumar al menos cinco puntos. Así, si Contoso está en tu lista personalizada, Contoso1! suma solo tres puntos y se rechaza, mientras que una frase de contraseña larga que contenga una palabra prohibida aún puede pasar.",
   "El bloqueo inteligente protege contra los intentos de adivinar en el momento del inicio de sesión. Después de cierto número de intentos fallidos (el umbral de bloqueo), la cuenta se bloquea durante un tiempo de bloqueo, y ese tiempo aumenta con los bloqueos repetidos. El bloqueo inteligente distingue las ubicaciones conocidas de las desconocidas, de modo que un atacante en otro país queda bloqueado mientras el usuario real todavía puede iniciar sesión, y registra los últimos hashes de contraseñas incorrectas para que la misma contraseña equivocada introducida varias veces no cuente varias veces. Personalizar el umbral y la duración requiere P1. En entornos híbridos, establece el umbral de bloqueo de Entra más bajo que el umbral del AD local y la duración de Entra más larga que la de AD, para que los ataques se detengan en la nube antes de bloquear cuentas en el entorno local.",
   "Para extender la misma lista de prohibidas al Active Directory local, implementas dos componentes. El agente de DC de Password Protection se instala en todos los controladores de dominio; una DLL de filtro de contraseñas verifica cada cambio o restablecimiento de contraseña contra la directiva. El servicio proxy de Password Protection se ejecuta en uno o más servidores miembro con acceso a internet y reenvía las descargas de la directiva desde Entra; los agentes de DC nunca necesitan acceso a internet. La directiva se almacena en caché en SYSVOL y se replica a todos los DC. Empieza en modo Audit, que registra en el registro de eventos del agente de DC lo que se habría bloqueado, y cambia a Enforced cuando tengas confianza. La función local requiere P1 para los usuarios cuyas contraseñas se verifican.",
   "La protección de contraseñas solo actúa cuando se establece o cambia una contraseña, así que las contraseñas débiles existentes permanecen hasta el siguiente cambio."
  ],
  "terms": [
   [
    "Global banned password list (lista global de contraseñas prohibidas)",
    "Una lista de contraseñas débiles mantenida por Microsoft, no editable, que se aplica a todos los usuarios de Entra."
   ],
   [
    "Custom banned password list (lista personalizada de contraseñas prohibidas)",
    "Una lista definida por el administrador de términos específicos de la organización que Entra bloquea en las contraseñas; requiere P1."
   ],
   [
    "Smart lockout (bloqueo inteligente)",
    "Protección del inicio de sesión de Entra que bloquea a los atacantes tras intentos fallidos, distinguiendo entre ubicaciones conocidas y desconocidas."
   ],
   [
    "DC agent (agente de DC)",
    "El componente de Password Protection que se instala en cada controlador de dominio para aplicar la lista de prohibidas en el entorno local."
   ],
   [
    "Proxy service (servicio proxy)",
    "El componente de Password Protection en un servidor miembro que retransmite la directiva entre Entra ID y los agentes de DC."
   ]
  ],
  "example": "El red team de Northwind descubre que mucho personal usa Northwind más el año. El administrador agrega Northwind, los nombres de productos y la ciudad a la lista personalizada de prohibidas, instala el proxy en dos servidores miembro y los agentes de DC en todos los controladores de dominio en modo Audit, revisa una semana de registros de eventos y luego cambia a Enforced para que AD también rechace esas contraseñas.",
  "tip": "Los agentes de DC van en cada controlador de dominio y no necesitan internet; el proxy va en servidores miembro con acceso saliente a internet. Para el bloqueo híbrido, mantén el umbral de Entra por debajo del de AD y su duración por encima de la de AD.",
  "check": [
   [
    "¿Puedes agregar términos a la lista global de contraseñas prohibidas?",
    "No. La lista global la administra Microsoft; tú agregas tus propios términos a la lista personalizada de contraseñas prohibidas."
   ],
   [
    "¿Qué componente de Password Protection local debe instalarse en cada controlador de dominio?",
    "El agente de DC de Password Protection; el servicio proxy va en servidores miembro."
   ],
   [
    "¿Por qué el umbral de bloqueo del AD local debe ser mayor que el umbral del bloqueo inteligente de Entra?",
    "Para que el bloqueo inteligente en la nube detenga los intentos de adivinar contraseñas antes de que los atacantes puedan bloquear cuentas en el AD local."
   ]
  ]
 },
 {
  "t": "Security defaults vs Conditional Access, and emergency access (break-glass) accounts",
  "tt": "Valores predeterminados de seguridad frente a Conditional Access, y cuentas de acceso de emergencia (break-glass)",
  "body": [
   "Los valores predeterminados de seguridad (security defaults) son un conjunto gratuito de protecciones de identidad que se activa con un solo interruptor y que Microsoft habilita en los tenants nuevos. Exigen que todos los usuarios se registren para la autenticación multifactor (con un período de gracia después del cual el registro es obligatorio), exigen que los administradores hagan MFA cada vez que inician sesión, solicitan MFA a los usuarios cuando Microsoft lo considera necesario, bloquean los protocolos de autenticación heredada que no pueden hacer MFA y protegen actividades privilegiadas como el acceso al portal de Azure. Los security defaults orientan a los usuarios a registrar Microsoft Authenticator como su método de MFA. No hay nada que ajustar: ni exclusiones, ni ubicaciones, ni reglas por aplicación.",
   "Conditional Access (CA, acceso condicional) es la alternativa configurable. Requiere Microsoft Entra ID P1 y te permite crear directivas del tipo si-entonces: si este usuario inicia sesión en esta aplicación desde este tipo de dispositivo o ubicación con este nivel de riesgo, entonces exigir MFA, un dispositivo compatible o bloquear. CA puede excluir cuentas de emergencia, aplicar reglas distintas a distintas aplicaciones y usar señales como el cumplimiento del dispositivo y el riesgo que los security defaults no pueden usar.",
   "No puedes usar ambos al mismo tiempo. Para crear directivas de Conditional Access primero debes desactivar los security defaults, y cuando lo hagas, debes reemplazar de inmediato sus protecciones, normalmente con directivas que exijan MFA a los administradores, exijan MFA a todos los usuarios, bloqueen la autenticación heredada y protejan la administración de Azure. Microsoft también ofrece plantillas de directivas para esto. La regla general: las organizaciones pequeñas sin P1 usan security defaults; las organizaciones con P1 usan Conditional Access.",
   "Las cuentas de acceso de emergencia, a menudo llamadas cuentas break-glass (rompe el cristal), evitan que te quedes fuera de tu propio tenant. Los bloqueos ocurren cuando una directiva de Conditional Access está mal configurada, falla un servicio de federación o un servicio de MFA sufre una interrupción. Microsoft recomienda al menos dos cuentas de este tipo con estas propiedades: cuentas solo de nube que usan el dominio onmicrosoft.com, para que no dependan del AD local ni de la federación; con el rol Global Administrator asignado de forma permanente; no vinculadas a una persona concreta; y protegidas con autenticación fuerte y resistente al phishing, como una passkey FIDO2, guardada de forma segura. Como los portales de Azure y de administración ahora exigen MFA, una cuenta break-glass solo con contraseña ya no es adecuada.",
   "Excluye al menos una cuenta de emergencia de las directivas de Conditional Access que podrían bloquear el acceso, o diseña las directivas de modo que la cuenta aún pueda cumplirlas con su método dedicado. Supervisa cada inicio de sesión de estas cuentas: envía los registros de inicio de sesión a Log Analytics y crea una alerta que se active cada vez que una cuenta break-glass inicie sesión. Prueba las cuentas de forma programada, por ejemplo cada pocos meses, y después de cambios en tus directivas, para saber que funcionan antes de necesitarlas."
  ],
  "terms": [
   [
    "Security defaults (valores predeterminados de seguridad)",
    "Protecciones de identidad gratuitas y preconfiguradas que aplican el registro de MFA, la MFA para administradores y el bloqueo de la autenticación heredada, sin personalización."
   ],
   [
    "Conditional Access (acceso condicional)",
    "Un motor de directivas de P1 que concede o bloquea el acceso según señales como el usuario, la aplicación, el dispositivo, la ubicación y el riesgo."
   ],
   [
    "Emergency access account (cuenta de acceso de emergencia)",
    "Una cuenta break-glass solo de nube y con altos privilegios que se usa únicamente cuando se pierde el acceso administrativo normal."
   ],
   [
    "Legacy authentication (autenticación heredada)",
    "Protocolos antiguos, como la autenticación básica para POP, IMAP y SMTP, que no pueden realizar MFA."
   ]
  ],
  "example": "Un distrito escolar compra P1 y quiere eximir de MFA a una aplicación de quiosco. El administrador crea dos cuentas break-glass con llaves FIDO2 guardadas en cajas fuertes separadas, las excluye de todas las directivas de CA, implementa directivas de CA para MFA y para bloquear la autenticación heredada en modo report-only, desactiva los security defaults y activa las directivas de CA. Una regla de alerta envía un correo al equipo de seguridad cada vez que cualquiera de las cuentas break-glass inicia sesión.",
  "tip": "Los security defaults y Conditional Access son mutuamente excluyentes; si una pregunta necesita exclusiones, ubicaciones o reglas por aplicación, la respuesta es Conditional Access con P1. Las cuentas break-glass son solo de nube, usan onmicrosoft.com, tienen Global Administrator, se excluyen de las directivas con riesgo de bloqueo y se supervisan con alertas.",
  "check": [
   [
    "¿Qué debes hacer antes de crear directivas de Conditional Access en un tenant que usa security defaults?",
    "Desactivar los security defaults y luego reemplazar sus protecciones con directivas de CA equivalentes."
   ],
   [
    "¿Por qué las cuentas de acceso de emergencia deben usar el dominio onmicrosoft.com?",
    "Para que sean solo de nube y no dependan del AD local, de la sincronización ni de un servicio de federación que podría no estar disponible."
   ],
   [
    "¿Cómo deberías enterarte de que se usó una cuenta de acceso de emergencia?",
    "Enviando los registros de inicio de sesión a Log Analytics (u otra herramienta de supervisión) y creando una alerta ante cualquier inicio de sesión de esas cuentas."
   ]
  ]
 },
 {
  "t": "Conditional Access: assignments, conditions (locations, device platforms, client apps, filters for devices, risk), grant and session controls",
  "tt": "Conditional Access: asignaciones, condiciones (ubicaciones, plataformas de dispositivo, aplicaciones cliente, filtros de dispositivos, riesgo), controles de concesión y de sesión",
  "body": [
   "Una directiva de Conditional Access es una instrucción si-entonces que se evalúa al iniciar sesión, después del primer factor de autenticación. La parte del si contiene asignaciones y condiciones; la parte del entonces contiene controles de acceso. Se aplican todas las directivas que corresponden a un inicio de sesión, y si alguna de ellas bloquea, el acceso se bloquea. No hay un orden de prioridad; los controles de todas las directivas que coinciden se combinan.",
   "Las asignaciones definen quién y qué. Los usuarios pueden ser todos los usuarios, usuarios y grupos seleccionados, roles de directorio, tipos de usuario invitado o externo, o identidades de carga de trabajo (entidades de servicio, que requieren una licencia aparte). Excluye siempre tus cuentas de acceso de emergencia. Los recursos de destino pueden ser aplicaciones en la nube (todas las aplicaciones, o aplicaciones seleccionadas como Office 365 o la Windows Azure Service Management API), acciones de usuario (Register security information, Register or join devices) o un contexto de autenticación (authentication context), una etiqueta que las aplicaciones pueden solicitar para operaciones sensibles.",
   "Las condiciones acotan cuándo se aplica una directiva. El riesgo de usuario y el riesgo de inicio de sesión usan los niveles de Microsoft Entra ID Protection (P2). Las plataformas de dispositivo incluyen Android, iOS, Windows, macOS y Linux; se detectan a partir del cliente y, por lo tanto, no son un límite de seguridad fuerte. Las ubicaciones, ahora etiquetadas como red (network), usan ubicaciones con nombre, como rangos de IP de confianza o países. Las aplicaciones cliente separan navegador, aplicaciones móviles y clientes de escritorio, Exchange ActiveSync y otros clientes, lo que te permite bloquear la autenticación heredada. El filtro de dispositivos (filter for devices) usa reglas sobre atributos del dispositivo, como device.trustType o valores de extensionAttribute, para incluir o excluir dispositivos específicos, como estaciones de trabajo de acceso privilegiado. Los flujos de autenticación pueden dirigirse al flujo de código de dispositivo (device code flow) y a la transferencia de autenticación.",
   "Los controles de concesión (grant controls) deciden el resultado. Block access detiene el inicio de sesión. Grant access puede exigir uno o más de los siguientes: autenticación multifactor, un nivel de autenticación (authentication strength), un dispositivo marcado como compatible, un dispositivo Microsoft Entra hybrid joined, una directiva de protección de aplicaciones, un cambio de contraseña (que se usa con el riesgo de usuario) y términos de uso. Cuando se seleccionan varios, eliges Require all the selected controls o Require one of the selected controls.",
   "Los controles de sesión (session controls) definen lo que ocurre después de conceder el acceso. Use app enforced restrictions pasa el estado del dispositivo a SharePoint y Exchange para que puedan ofrecer un acceso limitado, solo por navegador, desde dispositivos no administrados. Use Conditional Access App Control enruta la sesión a través de Microsoft Defender for Cloud Apps para supervisión en tiempo real y controles como el bloqueo de descargas. La frecuencia de inicio de sesión y la sesión persistente del navegador controlan cada cuánto se vuelven a autenticar los usuarios, y otras opciones personalizan la evaluación continua de acceso, deshabilitan los valores predeterminados de resiliencia y exigen la protección de tokens.",
   "Cada directiva tiene un estado On, Off o Report-only. Créala y pruébala en report-only, revisa los resultados y luego actívala."
  ],
  "terms": [
   [
    "Assignments (asignaciones)",
    "Los usuarios, identidades de carga de trabajo y recursos de destino a los que se aplica una directiva de Conditional Access."
   ],
   [
    "Conditions (condiciones)",
    "Señales adicionales, como el riesgo, la plataforma del dispositivo, la ubicación de red, la aplicación cliente y los filtros de dispositivos, que acotan una directiva."
   ],
   [
    "Grant controls (controles de concesión)",
    "La decisión de acceso: bloquear, o conceder exigiendo MFA, dispositivo compatible, nivel de autenticación y similares."
   ],
   [
    "Session controls (controles de sesión)",
    "Controles que se aplican después de conceder el acceso, como la frecuencia de inicio de sesión, las restricciones aplicadas por la aplicación y App Control."
   ],
   [
    "Filter for devices (filtro de dispositivos)",
    "Una regla sobre atributos del dispositivo que incluye o excluye dispositivos específicos de una directiva."
   ]
  ],
  "example": "Contoso quiere bloquear la autenticación heredada, exigir MFA a todos los usuarios fuera de la red corporativa y permitir solo el acceso por navegador a SharePoint desde dispositivos no administrados. Crea tres directivas: bloqueo para otros clientes y Exchange ActiveSync, exigir MFA excluyendo la ubicación con nombre de confianza, y restricciones aplicadas por la aplicación para SharePoint. Todas excluyen las cuentas break-glass.",
  "tip": "Todas las directivas aplicables se combinan, y el bloqueo siempre gana. La plataforma del dispositivo es una condición de conveniencia, no un límite de seguridad; usa dispositivo compatible o filtros de dispositivos para un control real del dispositivo. Exigir uno frente a exigir todos cambia el significado de varios controles de concesión.",
  "check": [
   [
    "Dos directivas se aplican a un inicio de sesión: una exige MFA y la otra bloquea el acceso. ¿Qué ocurre?",
    "El acceso se bloquea, porque se aplican todas las directivas correspondientes y un bloqueo prevalece sobre las concesiones."
   ],
   [
    "¿Qué condición usarías para bloquear los protocolos de autenticación heredada?",
    "Client apps, seleccionando clientes de Exchange ActiveSync y otros clientes, con un control de concesión de bloqueo."
   ],
   [
    "¿Cómo puedes aplicar una directiva solo a las estaciones de trabajo de acceso privilegiado?",
    "Usando una condición de filtro de dispositivos sobre un atributo del dispositivo que identifique esas estaciones de trabajo."
   ]
  ]
 },
 {
  "t": "Named locations, authentication strengths, sign-in frequency, persistent browser session and token protection",
  "tt": "Ubicaciones con nombre, niveles de autenticación, frecuencia de inicio de sesión, sesión persistente del navegador y protección de tokens",
  "body": [
   "Estos son los componentes que hacen precisas las directivas de Conditional Access. Cada uno responde una pregunta concreta: dónde está el usuario, con qué fuerza demostró quién es, cada cuánto debe volver a demostrarlo y si una sesión robada puede reutilizarse en otro lugar.",
   "Las ubicaciones con nombre (named locations) definen redes. Una ubicación de rangos de IP enumera rangos IPv4 o IPv6 públicos en notación CIDR, como las direcciones de salida de tu oficina, y puede marcarse como ubicación de confianza, lo que reduce los cálculos de riesgo de inicio de sesión y permite excluirla de las directivas de MFA. Una ubicación de países o regiones agrupa países; Entra determina el país a partir de la dirección IP u, opcionalmente, a partir de las coordenadas GPS que informa Microsoft Authenticator. Puedes incluir países o regiones desconocidos para las direcciones que no se pueden asignar. En una directiva, las ubicaciones aparecen en la condición Network, donde puedes incluir o excluir cualquier ubicación, todas las ubicaciones de confianza o ubicaciones con nombre específicas. Bloquear los inicios de sesión desde países donde no operas es un uso común.",
   "Los niveles de autenticación (authentication strengths) reemplazan el control simple de exigir MFA por una lista de combinaciones de métodos permitidas. Hay tres integrados: Multifactor authentication strength, Passwordless MFA strength y Phishing-resistant MFA strength, que solo permite passkeys (FIDO2), Windows Hello for Business y autenticación multifactor basada en certificados. Puedes crear niveles personalizados, por ejemplo permitiendo solo ciertos modelos de llaves FIDO2 por AAGUID. Usa el control de concesión Require authentication strength, por ejemplo MFA resistente al phishing para los roles de administrador. Los niveles también pueden aplicarse a usuarios externos, sujetos a tu configuración de confianza entre tenants.",
   "La frecuencia de inicio de sesión (sign-in frequency) establece cuánto tiempo pasa antes de que un usuario deba volver a autenticarse, en horas o días, o Every time (cada vez), que se usa para acciones sensibles como la corrección de inicios de sesión riesgosos o la activación en PIM. De forma predeterminada, Entra usa una ventana móvil larga y vuelve a emitir tokens de forma silenciosa mientras la sesión se mantiene sana, así que este control se usa para hacer ese comportamiento más estricto. La sesión persistente del navegador (persistent browser session) controla si el navegador mantiene la sesión iniciada después de cerrarlo: Always persistent o Never persistent. Requiere dirigirse a todas las aplicaciones en la nube, y Never persistent es adecuado para dispositivos no administrados o compartidos.",
   "La protección de tokens (token protection), un control de sesión, vincula los tokens de sesión de inicio de sesión con el dispositivo al que se emitieron, usando el primary refresh token del dispositivo, de modo que un token robado en un dispositivo no pueda reutilizarse desde otro. Está dirigida contra ataques de robo de tokens, como el phishing de adversario en el medio (adversary-in-the-middle) y el malware que roba cookies del navegador. La compatibilidad se limita a plataformas y aplicaciones cliente específicas, actualmente sobre todo aplicaciones de escritorio en Windows para servicios como Exchange Online y SharePoint Online, así que pruébala primero en modo report-only y limítala a las aplicaciones y dispositivos compatibles."
  ],
  "terms": [
   [
    "Named location (ubicación con nombre)",
    "Un rango de IP o un conjunto de países definido por el administrador que se usa en las condiciones de red de Conditional Access."
   ],
   [
    "Trusted location (ubicación de confianza)",
    "Una ubicación de IP con nombre marcada como de confianza, que puede excluirse de las directivas y reduce la evaluación de riesgo."
   ],
   [
    "Authentication strength (nivel de autenticación)",
    "Un control de Conditional Access que especifica qué combinaciones de métodos de autenticación satisfacen una directiva."
   ],
   [
    "Sign-in frequency (frecuencia de inicio de sesión)",
    "Un control de sesión que establece cuánto tiempo pasa antes de que los usuarios deban volver a autenticarse, o que lo exige cada vez."
   ],
   [
    "Token protection (protección de tokens)",
    "Un control de sesión que vincula los tokens al dispositivo emisor para evitar la reutilización de tokens robados."
   ]
  ],
  "example": "Una firma financiera exige Phishing-resistant MFA strength para todos los roles de administrador, establece una frecuencia de inicio de sesión de cuatro horas y sesiones de navegador nunca persistentes para los usuarios en dispositivos no administrados, bloquea los inicios de sesión desde una ubicación de países que contiene lugares donde no opera, y prueba la protección de tokens para Exchange Online en dispositivos Windows en modo report-only.",
  "tip": "El nivel resistente al phishing significa passkeys, Windows Hello for Business y CBA; el push de Authenticator no califica. La sesión persistente del navegador solo funciona cuando la directiva se dirige a todas las aplicaciones en la nube.",
  "check": [
   [
    "¿Qué nivel de autenticación integrado exigirías a los administradores para resistir el phishing?",
    "Phishing-resistant MFA strength."
   ],
   [
    "¿Cómo determina Entra el país de un usuario para una ubicación con nombre de países o regiones?",
    "A partir de la dirección IP u, opcionalmente, de las coordenadas GPS que informa la aplicación Microsoft Authenticator."
   ],
   [
    "¿Contra qué ataque protege la protección de tokens?",
    "Contra el robo y la reutilización de tokens, en los que un token de sesión robado en un dispositivo se usa desde otro dispositivo."
   ]
  ]
 },
 {
  "t": "Testing policies with report-only mode and the What If tool; troubleshooting with sign-in logs",
  "tt": "Prueba de directivas con el modo report-only y la herramienta What If; solución de problemas con los registros de inicio de sesión",
  "body": [
   "Una directiva de Conditional Access con un ámbito mal definido puede dejar fuera a toda una organización, incluidos sus administradores. Microsoft te da tres herramientas para evitarlo y para diagnosticar problemas después: el modo report-only (solo informe), la herramienta What If y los registros de inicio de sesión.",
   "El modo report-only es un estado de directiva, junto con On y Off. Una directiva en report-only se evalúa en cada inicio de sesión real y el resultado se registra, pero no se aplica nada. En cada entrada del registro de inicio de sesión, la pestaña Report-only muestra resultados como Report-only: Success (el usuario habría cumplido los controles), Report-only: Failure (el usuario habría sido bloqueado o no podría cumplir un control), Report-only: User action required (se le habría solicitado algo al usuario, por ejemplo MFA) y Report-only: Not applied (las condiciones no coincidieron). El libro de trabajo Conditional Access insights and reporting resume esto por usuarios y aplicaciones cuando los registros de inicio de sesión se envían a Log Analytics. Deja que una directiva nueva funcione en report-only el tiempo suficiente para cubrir los patrones de trabajo normales y luego actívala.",
   "La herramienta What If responde una pregunta hipotética: si este usuario iniciara sesión en esta aplicación en estas condiciones, ¿qué directivas se aplicarían? Proporcionas un usuario o una identidad de carga de trabajo, una aplicación en la nube o una acción de usuario, y condiciones opcionales como la dirección IP, el país, la plataforma del dispositivo, la aplicación cliente, el estado del dispositivo y el nivel de riesgo de inicio de sesión o de usuario. El resultado enumera las directivas que se aplicarían, con sus controles de concesión y de sesión, y las que no se aplicarían, con el motivo, por ejemplo usuario excluido o condición de ubicación no cumplida. What If es ideal para comprobar exclusiones, como confirmar que una cuenta break-glass está excluida de todas las directivas de bloqueo, y para responder una consulta de la mesa de ayuda antes de que el usuario lo intente de nuevo.",
   "Los registros de inicio de sesión registran lo que realmente ocurrió. Cada entrada muestra el usuario, la aplicación, la hora, la dirección IP, la ubicación, la aplicación cliente, los detalles del dispositivo, los detalles de autenticación (qué métodos se usaron y si la MFA se cumplió mediante una afirmación en el token) y el resultado de Conditional Access: Success, Failure o Not applied, con una pestaña Conditional Access que enumera cada directiva y su resultado. Los códigos de error identifican el motivo; por ejemplo, 53003 indica que Conditional Access bloqueó el acceso, y 50126 indica un nombre de usuario o contraseña no válidos. La sección Troubleshooting and support y el correlation ID son lo que pide el soporte de Microsoft.",
   "Una secuencia práctica de solución de problemas: encuentra el inicio de sesión fallido por usuario y hora, lee el estado y el código de error, abre la pestaña Conditional Access para ver qué directiva falló y qué control no se cumplió, compara los detalles del dispositivo con lo que espera la directiva (por ejemplo, compliant device en false) y luego usa What If para confirmar la corrección antes de que el usuario vuelva a intentarlo. Recuerda que los inicios de sesión interactivos y no interactivos aparecen en pestañas separadas, y que los inicios de sesión de entidades de servicio y de identidades administradas también tienen sus propios registros."
  ],
  "terms": [
   [
    "Report-only mode (modo solo informe)",
    "Un estado de directiva de Conditional Access que evalúa y registra los resultados sin aplicarlos."
   ],
   [
    "What If tool (herramienta What If)",
    "Una herramienta de Conditional Access que simula un inicio de sesión para mostrar qué directivas se aplicarían y por qué."
   ],
   [
    "Sign-in log (registro de inicio de sesión)",
    "Un registro de cada autenticación con el usuario, la aplicación, el dispositivo, la ubicación, los métodos y los resultados de Conditional Access."
   ],
   [
    "Correlation ID (identificador de correlación)",
    "Un identificador que vincula los eventos de una solicitud de inicio de sesión; se usa para la solución de problemas y los casos de soporte."
   ]
  ],
  "example": "Un vendedor en Brasil no puede abrir el CRM. El administrador filtra los registros de inicio de sesión por el usuario, ve el error 53003, y la pestaña Conditional Access muestra que falló la directiva que bloquea los países no aprobados. What If con la IP del usuario lo confirma. Como el viaje está aprobado, el administrador agrega al usuario a un grupo de exclusión temporal, y ahora What If muestra la directiva como no aplicada.",
  "tip": "Report-only muestra lo que habrían hecho los inicios de sesión reales; What If simula un inicio de sesión que todavía no ha ocurrido. Las directivas en report-only que exigen un dispositivo compatible aún pueden provocar una solicitud de verificación del dispositivo en algunas plataformas, así que lee las notas de la documentación antes de usarlas para todos los usuarios.",
  "check": [
   [
    "¿Cuál es la diferencia entre el modo report-only y la herramienta What If?",
    "Report-only evalúa inicios de sesión reales a lo largo del tiempo sin aplicar nada; What If simula a petición un único inicio de sesión hipotético."
   ],
   [
    "¿En qué parte de una entrada del registro de inicio de sesión ves qué directiva de Conditional Access bloqueó al usuario?",
    "En la pestaña Conditional Access de los detalles del inicio de sesión, que enumera cada directiva y si tuvo éxito, falló o no se aplicó."
   ],
   [
    "¿Cómo puedes verificar que las cuentas de acceso de emergencia están excluidas de todas las directivas?",
    "Ejecutando la herramienta What If para cada cuenta de emergencia contra todas las aplicaciones en la nube y confirmando que no se aplica ninguna directiva de bloqueo."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: user risk vs sign-in risk, risk detections, remediation and risk-based Conditional Access",
  "tt": "Microsoft Entra ID Protection: riesgo de usuario frente a riesgo de inicio de sesión, detecciones de riesgo, corrección y Conditional Access basado en riesgo",
  "body": [
   "Microsoft Entra ID Protection usa la inteligencia de amenazas y el aprendizaje automático de Microsoft para detectar ataques basados en la identidad, calcular el riesgo y desencadenar respuestas automáticas. La funcionalidad completa, incluidos Conditional Access basado en riesgo y los informes detallados, requiere Microsoft Entra ID P2.",
   "Hay dos tipos de riesgo, y distinguirlos es esencial. El riesgo de inicio de sesión (sign-in risk) es la probabilidad de que una solicitud de autenticación concreta no la haya hecho el propietario de la cuenta. El riesgo de usuario (user risk) es la probabilidad de que la propia identidad esté comprometida, acumulada a partir de detecciones de riesgo a lo largo del tiempo. Un solo inicio de sesión desde una dirección IP anónima eleva el riesgo de inicio de sesión; las credenciales filtradas encontradas en la dark web elevan el riesgo de usuario. Ambos se califican como bajo, medio o alto.",
   "Las detecciones de riesgo alimentan estas puntuaciones. Las detecciones de riesgo de inicio de sesión incluyen dirección IP anónima (por ejemplo, Tor), viaje atípico, propiedades de inicio de sesión desconocidas, dirección IP maliciosa, password spray, navegador sospechoso, token anómalo y anomalía del emisor de tokens. Las detecciones de riesgo de usuario incluyen credenciales filtradas (que depende de la sincronización de hash de contraseñas para los usuarios híbridos), inteligencia de amenazas de Microsoft Entra y actividad anómala del usuario. Algunas detecciones son en tiempo real y se calculan durante el inicio de sesión; otras son fuera de línea y se calculan después. Los informes Risky users, Risky sign-ins y Risk detections las muestran, y Risky workload identities cubre las entidades de servicio por separado.",
   "La corrección (remediation) elimina el riesgo. Los usuarios pueden corregirlo por sí mismos: el riesgo de inicio de sesión se corrige completando correctamente la MFA, y el riesgo de usuario se corrige con un cambio seguro de contraseña, que exige MFA primero. Para los usuarios sin contraseña (passwordless), el control más reciente de Microsoft, require risk remediation, se encarga de la acción adecuada. Los administradores pueden corregirlo manualmente: restablecer la contraseña, confirmar que el usuario está comprometido (confirm user compromised, que establece el riesgo de usuario en alto y alimenta el modelo), confirmar que el inicio de sesión es seguro (confirm sign-in safe), descartar el riesgo de usuario (dismiss user risk) o bloquear al usuario. Los usuarios deben estar registrados para la MFA de antemano para poder corregirlo por sí mismos, y por eso ID Protection incluye una directiva de registro de MFA.",
   "Microsoft recomienda configurar las respuestas al riesgo como directivas de Conditional Access en lugar de las antiguas directivas de riesgo independientes de ID Protection, que se están retirando. Un par típico es: para todos los usuarios con riesgo de usuario alto, conceder acceso exigiendo cambio de contraseña y frecuencia de inicio de sesión Every time; para todos los usuarios con riesgo de inicio de sesión medio y alto, exigir MFA y frecuencia de inicio de sesión Every time. Excluye las cuentas break-glass y usa report-only primero. Bloquear ante riesgo alto es más estricto, pero genera trabajo para la mesa de ayuda; permitir la corrección por el propio usuario deja que los usuarios resuelvan el problema ellos mismos.",
   "Las ubicaciones con nombre de confianza reducen los falsos positivos, y la retroalimentación de los administradores, como confirm safe o confirm compromised, mejora las detecciones con el tiempo. Los datos de riesgo también pueden exportarse con la configuración de diagnóstico para investigarlos en Log Analytics o en un SIEM como Microsoft Sentinel."
  ],
  "terms": [
   [
    "Sign-in risk (riesgo de inicio de sesión)",
    "La probabilidad de que una solicitud de autenticación concreta no la haya realizado el usuario legítimo."
   ],
   [
    "User risk (riesgo de usuario)",
    "La probabilidad de que una identidad esté comprometida, según detecciones acumuladas como las credenciales filtradas."
   ],
   [
    "Risk detection (detección de riesgo)",
    "Una señal de actividad sospechosa, como un viaje atípico o credenciales filtradas, que contribuye a los niveles de riesgo."
   ],
   [
    "Self-remediation (corrección por el propio usuario)",
    "Los usuarios eliminan su propio riesgo completando la MFA (riesgo de inicio de sesión) o un cambio seguro de contraseña (riesgo de usuario)."
   ],
   [
    "Confirm user compromised (confirmar usuario comprometido)",
    "Una acción del administrador que establece el riesgo de usuario en alto y entrena el modelo de detección."
   ]
  ],
  "example": "Las credenciales filtradas de una usuaria de marketing aparecen en un volcado de una brecha, e ID Protection eleva su riesgo de usuario a alto. En su siguiente inicio de sesión, la directiva de Conditional Access de riesgo de usuario exige MFA y un cambio seguro de contraseña. Ella completa ambos, su riesgo se corrige automáticamente y el equipo de seguridad revisa el informe Risky users sin abrir un ticket.",
  "tip": "El riesgo de inicio de sesión va con exigir MFA; el riesgo de usuario va con exigir cambio de contraseña. La detección de credenciales filtradas para usuarios sincronizados necesita la sincronización de hash de contraseñas. Las directivas basadas en riesgo de ID Protection necesitan P2.",
  "check": [
   [
    "¿A qué tipo de riesgo afectan las credenciales filtradas y cómo lo corrige un usuario?",
    "Al riesgo de usuario; el usuario lo corrige con un cambio seguro de contraseña después de la MFA."
   ],
   [
    "¿Qué control debe exigir una directiva de riesgo de inicio de sesión para que los usuarios puedan corregirlo por sí mismos?",
    "La autenticación multifactor (normalmente con la frecuencia de inicio de sesión en Every time)."
   ],
   [
    "¿Por qué los usuarios deben estar registrados para la MFA antes de habilitar las directivas de riesgo?",
    "Porque la corrección por el propio usuario requiere MFA; los usuarios no registrados no pueden completarla y quedarían bloqueados."
   ]
  ]
 },
 {
  "t": "Continuous access evaluation (CAE) and session revocation",
  "tt": "Evaluación continua de acceso (CAE) y revocación de sesiones",
  "body": [
   "Tradicionalmente, los tokens de acceso OAuth son válidos hasta que expiran, a menudo en alrededor de una hora. Si deshabilitas a un usuario o este cambia de ubicación, una aplicación que ya tiene un token lo sigue aceptando hasta su vencimiento. Ese hueco es justamente donde opera un atacante con un token robado. La evaluación continua de acceso (continuous access evaluation, CAE) lo cierra al permitir que los proveedores de recursos, como Exchange Online, SharePoint Online, Teams y Microsoft Graph, reaccionen a eventos importantes casi en tiempo real.",
   "CAE funciona como una conversación entre Microsoft Entra ID y los servicios compatibles con CAE. Entra avisa al servicio cuando ocurre un evento crítico, y el servicio verifica por sí mismo ciertas directivas. Los eventos críticos incluyen: la cuenta del usuario se elimina o deshabilita, la contraseña se cambia o restablece, se habilita la autenticación multifactor para el usuario, un administrador revoca explícitamente todos los tokens de actualización del usuario, y Microsoft Entra ID Protection detecta un riesgo de usuario alto. Cuando el servicio recibe el evento, rechaza el token actual y envía al cliente un desafío de notificaciones (claims challenge), que hace que el cliente vuelva a Entra por un token nuevo, y en ese momento se aplica la directiva vigente.",
   "CAE también aplica la directiva de ubicación de red de Conditional Access. Si la dirección IP de una sesión cambia a una que tu directiva basada en ubicación no permite, un servicio compatible con CAE puede rechazar el token de inmediato. La aplicación estricta de ubicación (strict location enforcement), una personalización de CAE, hace que el servicio compruebe que la dirección IP que ve coincide con una ubicación permitida, lo cual es útil pero puede romper inicios de sesión detrás de proxies o VPN de túnel dividido, donde Entra y el recurso ven direcciones distintas.",
   "Como ahora los servicios pueden revocar el acceso a petición, los clientes compatibles con CAE reciben tokens de acceso de larga duración, de hasta 28 horas, en lugar de tokens de corta duración. Eso mejora la resiliencia durante interrupciones y, de hecho, la seguridad mejora, ya que la revocación se basa en eventos y no en el tiempo. CAE está activado de forma predeterminada para las aplicaciones compatibles; en un control de sesión de Conditional Access puedes personalizarlo, por ejemplo deshabilitarlo para solucionar problemas o activar la aplicación estricta.",
   "La revocación de sesiones es la acción del administrador que desencadena el evento crítico. En el centro de administración, abre el usuario y selecciona Revoke sessions, o ejecuta el comando de Microsoft Graph PowerShell:",
   "```powershell\nRevoke-MgUserSignInSession -UserId ana@contoso.com\n```",
   "Esto invalida los tokens de actualización y las cookies de sesión del usuario. Las aplicaciones compatibles con CAE reaccionan en minutos; las aplicaciones que no admiten CAE conservan su token de acceso existente hasta que expira y luego no logran renovarlo. En un incidente, combina pasos: deshabilita la cuenta, restablece la contraseña, revoca las sesiones, revisa los métodos de autenticación y los dispositivos registrados, y consulta los registros de inicio de sesión para ver si hubo actividad después de la revocación."
  ],
  "terms": [
   [
    "Continuous access evaluation (evaluación continua de acceso)",
    "Un mecanismo que permite a los servicios revocar el acceso casi en tiempo real cuando ocurren eventos críticos o cambios de directiva."
   ],
   [
    "Critical event (evento crítico)",
    "Un cambio, como la deshabilitación de la cuenta, el restablecimiento de la contraseña o la revocación de tokens, sobre el que actúan los servicios compatibles con CAE."
   ],
   [
    "Claims challenge (desafío de notificaciones)",
    "Una respuesta que le dice al cliente que su token ya no se acepta y que debe volver a autenticarse en Entra ID."
   ],
   [
    "Strict location enforcement (aplicación estricta de ubicación)",
    "Una configuración de CAE que hace que los recursos apliquen la directiva de ubicación según la dirección IP que observan."
   ],
   [
    "Revoke sessions (revocar sesiones)",
    "Una acción del administrador que invalida los tokens de actualización y las cookies de sesión de un usuario."
   ]
  ],
  "example": "Un empleado es despedido a las 3 p. m. Recursos Humanos deshabilita la cuenta y el administrador selecciona Revoke sessions. El Outlook de su laptop, que tenía un token de acceso válido, recibe un desafío de notificaciones de Exchange Online en minutos y no puede obtener un token nuevo, así que el correo deja de sincronizarse mucho antes de que el token anterior hubiera expirado.",
  "tip": "Conoce la lista de eventos críticos y recuerda que los clientes compatibles con CAE obtienen tokens que duran hasta 28 horas. Las aplicaciones que no admiten CAE solo respetan la revocación cuando expira su token de acceso actual.",
  "check": [
   [
    "Menciona tres eventos críticos ante los que reaccionan los servicios de CAE.",
    "Tres cualesquiera de estos: usuario eliminado o deshabilitado, contraseña cambiada o restablecida, MFA habilitada para el usuario, administrador que revocó los tokens de actualización, riesgo de usuario alto detectado."
   ],
   [
    "¿Por qué los clientes compatibles con CAE reciben tokens de acceso de mayor duración?",
    "Porque el recurso puede revocarlos de inmediato ante eventos críticos, así que las duraciones largas mejoran la resiliencia sin debilitar la seguridad."
   ],
   [
    "¿Qué hace Revoke-MgUserSignInSession?",
    "Invalida los tokens de actualización y las cookies de sesión del usuario, lo que obliga a volver a autenticarse."
   ]
  ]
 },
 {
  "t": "Global Secure Access: Microsoft Entra Internet Access and Private Access, traffic forwarding profiles",
  "tt": "Global Secure Access: Microsoft Entra Internet Access y Private Access, perfiles de reenvío de tráfico",
  "body": [
   "Global Secure Access es la solución de perímetro de servicio de seguridad (security service edge, SSE) de Microsoft, parte de la familia Microsoft Entra. En lugar de hacer pasar el tráfico por una VPN corporativa y firewalls locales, el tráfico de los usuarios se envía a la red global distribuida de Microsoft, donde se aplican directivas que tienen en cuenta la identidad. Lleva al acceso a la red la idea de Zero Trust de verificar cada solicitud, usando las mismas identidades y el mismo Conditional Access que ya administras.",
   "Microsoft Entra Internet Access protege el acceso a internet, a las aplicaciones de software como servicio (SaaS) y a Microsoft 365. Incluye una puerta de enlace web segura con filtrado de contenido web por categoría o por nombre de dominio completo (FQDN), restricciones universales de tenant que impiden que los usuarios inicien sesión en tenants de otras organizaciones con dispositivos corporativos (una protección contra la exfiltración de datos) y comprobaciones de red compatible que Conditional Access puede usar. La restauración de la IP de origen (source IP restoration) pasa a Entra ID la dirección IP pública original del usuario, para que las ubicaciones con nombre y la detección de riesgo sigan funcionando aunque el tráfico pase por el perímetro de Microsoft.",
   "Microsoft Entra Private Access reemplaza el acceso VPN tradicional a aplicaciones privadas, locales o en otras nubes. Usa conectores de red privada (private network connectors), los mismos conectores ligeros de solo salida que usa Microsoft Entra application proxy, instalados cerca de las aplicaciones. Quick Access proporciona acceso amplio a rangos de IP o FQDN definidos, lo que es una forma rápida de reemplazar una VPN. El acceso por aplicación (per-app access) define aplicaciones empresariales individuales para destinos y puertos específicos, de modo que cada una puede tener su propia asignación de usuarios y su propia directiva de Conditional Access, por ejemplo exigir MFA para un servidor de salto SSH pero no para la intranet. Private Access funciona con tráfico TCP y UDP, no solo con aplicaciones web.",
   "Los perfiles de reenvío de tráfico (traffic forwarding profiles) deciden qué tráfico captura el servicio. Hay tres: el perfil de tráfico de Microsoft (servicios de Microsoft 365 como Exchange Online y SharePoint Online), el perfil de Private Access (tus aplicaciones privadas) y el perfil de Internet Access (tráfico general de internet). Cada uno se habilita por separado, y les asignas usuarios y grupos. El tráfico se captura mediante el cliente de Global Secure Access, instalado en dispositivos Windows, macOS, iOS y Android, o mediante redes remotas (remote networks), en las que las sucursales conectan su equipo local del cliente al perímetro de Microsoft a través de túneles IPsec.",
   "Global Secure Access se licencia por separado, como Microsoft Entra Internet Access y Microsoft Entra Private Access (o juntos en Microsoft Entra Suite), sobre una base de Microsoft Entra ID P1. En el centro de administración lo encontrarás en su propia sección, con las páginas Connect, Applications, Secure y Monitor; los registros de tráfico y el panel muestran qué tráfico circuló y qué directivas actuaron sobre él."
  ],
  "terms": [
   [
    "Security service edge (SSE, perímetro de servicio de seguridad)",
    "Seguridad de red entregada desde la nube que aplica directivas basadas en la identidad al tráfico de los usuarios."
   ],
   [
    "Microsoft Entra Internet Access",
    "El servicio de Global Secure Access que protege el tráfico de internet, SaaS y Microsoft 365 con filtrado y restricciones de tenant."
   ],
   [
    "Microsoft Entra Private Access",
    "El servicio de Global Secure Access que ofrece acceso Zero Trust a aplicaciones privadas sin una VPN tradicional."
   ],
   [
    "Traffic forwarding profile (perfil de reenvío de tráfico)",
    "Una configuración (Microsoft, Private Access o Internet Access) que determina qué tráfico se captura y se envía por túnel."
   ],
   [
    "Universal tenant restrictions (restricciones universales de tenant)",
    "Un control que impide que los usuarios accedan a tenants externos no aprobados usando dispositivos corporativos."
   ]
  ],
  "example": "Un fabricante quiere retirar su VPN. Instala conectores de red privada en el centro de datos, publica el sistema ERP y un servidor SSH como aplicaciones de Private Access por aplicación con sus propias reglas de Conditional Access, implementa el cliente de Global Secure Access en las laptops y habilita el perfil de tráfico de Microsoft con restricciones universales de tenant para que el personal no pueda subir datos a tenants personales.",
  "tip": "Private Access equivale a reemplazar la VPN para aplicaciones privadas usando conectores; Internet Access equivale a filtrado web y restricciones de tenant para internet y Microsoft 365. Quick Access es amplio; el acceso por aplicación es granular y admite Conditional Access específico para cada aplicación.",
  "check": [
   [
    "¿Qué componente de Global Secure Access reemplazaría una VPN para servidores de archivos locales?",
    "Microsoft Entra Private Access, usando conectores de red privada."
   ],
   [
    "¿Cuáles son los tres perfiles de reenvío de tráfico?",
    "Tráfico de Microsoft, Private Access e Internet Access."
   ],
   [
    "¿Por qué es útil la restauración de la IP de origen?",
    "Porque pasa a Entra la IP pública original del usuario para que las ubicaciones con nombre de Conditional Access y las detecciones de riesgo sigan funcionando."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and assigning them Azure RBAC roles",
  "tt": "Identidades administradas: asignadas por el sistema frente a asignadas por el usuario, y asignación de roles de Azure RBAC",
  "body": [
   "Las aplicaciones que se ejecutan en Azure a menudo necesitan llamar a otros servicios, como leer secretos de Azure Key Vault o archivos de una cuenta de almacenamiento. Guardar una contraseña o una clave en el código o en la configuración es riesgoso: puede filtrarse y hay que rotarla. Las identidades administradas (managed identities) resuelven esto al dar a un recurso de Azure una identidad en Microsoft Entra ID cuyas credenciales Azure crea, almacena y rota automáticamente. Tu código nunca ve un secreto.",
   "Una identidad administrada asignada por el sistema (system-assigned) se habilita directamente en un recurso, como una máquina virtual, una aplicación de App Service o una Azure Function. Comparte el ciclo de vida de ese recurso: cuando se elimina el recurso, también se elimina la identidad. Cada identidad asignada por el sistema pertenece exactamente a un recurso, lo que la hace simple y ordenada cuando un recurso necesita su propio acceso.",
   "Una identidad administrada asignada por el usuario (user-assigned) es un recurso de Azure independiente que creas primero y luego adjuntas a uno o más recursos. Su ciclo de vida es independiente, así que eliminar una VM no elimina la identidad. Úsala cuando varios recursos necesitan los mismos permisos, como un conjunto de VM en un scale set, o cuando quieres crear y autorizar la identidad antes de que exista el recurso de cómputo. Un recurso puede tener al mismo tiempo una identidad asignada por el sistema y varias identidades asignadas por el usuario.",
   "Internamente, una identidad administrada es un tipo especial de entidad de servicio en Entra ID. Puedes encontrarla en Enterprise applications filtrando el tipo de aplicación por identidades administradas. Las identidades administradas solo están disponibles para recursos de Azure (y servidores habilitados para Azure Arc), no para cargas de trabajo arbitrarias fuera de Azure, y no administras sus credenciales en absoluto.",
   "Una identidad administrada no tiene permisos hasta que se los concedes. Para los recursos de Azure usas Azure RBAC: asignas un rol como Storage Blob Data Reader o Key Vault Secrets User a la identidad en el ámbito adecuado más estrecho (un solo recurso, un grupo de recursos o una suscripción). En el portal, abre el recurso de destino, selecciona Access control (IAM), Add role assignment, elige el rol y selecciona Managed identity como tipo de miembro. Con la CLI de Azure se ve así:",
   "```bash\naz role assignment create \\\n  --assignee <principal-id-of-identity> \\\n  --role \"Storage Blob Data Reader\" \\\n  --scope /subscriptions/<sub-id>/resourceGroups/rg-app/providers/Microsoft.Storage/storageAccounts/stapp01\n```",
   "Dentro del recurso, el código solicita un token al punto de conexión de identidad local, normalmente mediante una clase del SDK como DefaultAzureCredential, y lo presenta al servicio de destino. Para adjuntar identidades asignadas por el usuario a recursos, un administrador necesita el rol Managed Identity Operator; para crearlas y administrarlas, Managed Identity Contributor. A las identidades administradas también se les pueden conceder permisos de aplicación de Microsoft Graph, pero eso se hace mediante PowerShell o Graph y no desde la página API permissions del portal."
  ],
  "terms": [
   [
    "Managed identity (identidad administrada)",
    "Una identidad de Entra administrada automáticamente para un recurso de Azure, sin credenciales que debas almacenar o rotar."
   ],
   [
    "System-assigned managed identity (identidad administrada asignada por el sistema)",
    "Una identidad habilitada en un recurso y que se elimina junto con él."
   ],
   [
    "User-assigned managed identity (identidad administrada asignada por el usuario)",
    "Un recurso de identidad independiente que puede adjuntarse a varios recursos de Azure y tiene su propio ciclo de vida."
   ],
   [
    "Azure RBAC role assignment (asignación de rol de Azure RBAC)",
    "Conceder un rol a una entidad de seguridad en un ámbito como un recurso, un grupo de recursos o una suscripción."
   ],
   [
    "DefaultAzureCredential",
    "Una clase de credencial del SDK de Azure que usa automáticamente una identidad administrada cuando se ejecuta en Azure."
   ]
  ],
  "example": "Veinte VM en un scale set procesan archivos de una cuenta de almacenamiento. En lugar de habilitar veinte identidades asignadas por el sistema y veinte asignaciones de roles, el administrador crea una identidad administrada asignada por el usuario, le concede Storage Blob Data Reader solo en esa cuenta de almacenamiento y la adjunta al scale set. Las nuevas instancias heredan el acceso automáticamente.",
  "tip": "Una identidad compartida entre muchos recursos o un ciclo de vida independiente del recurso significa asignada por el usuario; un solo recurso cuya identidad debe desaparecer con él significa asignada por el sistema. Los permisos vienen de Azure RBAC en el ámbito más pequeño.",
  "check": [
   [
    "¿Qué pasa con una identidad administrada asignada por el sistema cuando se elimina su VM?",
    "Se elimina automáticamente junto con la VM."
   ],
   [
    "¿Qué tipo de identidad administrada deberías usar para muchas VM que necesitan un acceso idéntico?",
    "Una identidad administrada asignada por el usuario, adjunta a todas ellas."
   ],
   [
    "¿Cómo permites que una identidad administrada lea blobs de una cuenta de almacenamiento?",
    "Asignándole un rol de Azure RBAC como Storage Blob Data Reader con ámbito en esa cuenta de almacenamiento."
   ]
  ]
 },
 {
  "t": "Service principals and app registrations: application objects, client secrets vs certificates vs federated credentials",
  "tt": "Entidades de servicio y registros de aplicaciones: objetos de aplicación, secretos de cliente frente a certificados frente a credenciales federadas",
  "body": [
   "Cuando un desarrollador registra una aplicación en Microsoft Entra ID, aparecen dos objetos relacionados, y el examen espera que conozcas la diferencia. El objeto de aplicación (application object) es la definición global de la aplicación. Vive solo en el tenant de origen de la aplicación, el tenant donde se registró, y describe la aplicación: su nombre, el application (client) ID, los URI de redirección, los permisos que solicita, los roles de aplicación que expone y sus credenciales. Se administra en App registrations.",
   "Una entidad de servicio (service principal) es la representación local de la aplicación en un tenant específico. Es la que realmente recibe permisos, asignaciones de roles, asignaciones de usuarios y Conditional Access. Se administra en Enterprise applications. Una aplicación de un solo tenant tiene una entidad de servicio en su tenant de origen. Una aplicación multitenant tiene un objeto de aplicación en su tenant de origen y una entidad de servicio en cada tenant que le ha dado su consentimiento. Una analogía útil: el objeto de aplicación es una clase, y cada entidad de servicio es una instancia de ella. También existen entidades de servicio de tipo identidad administrada y heredadas, pero el par de registro de aplicación es el que más se evalúa.",
   "Para autenticarse como sí misma, por ejemplo en un demonio o servicio en segundo plano que usa el flujo de credenciales de cliente (client credentials), una aplicación necesita una credencial. Hay tres tipos. Un secreto de cliente (client secret) es una cadena generada, como una contraseña. Es fácil de usar pero fácil de filtrar en el código fuente o en los registros, y expira; el portal ofrece duraciones de hasta unos dos años. Una credencial de certificado usa una clave pública cargada en el registro de la aplicación, mientras que la clave privada se queda con la aplicación, idealmente en un almacén como Azure Key Vault. La aplicación demuestra la posesión firmando una aserción, así que nada reutilizable viaja por la red; por eso Microsoft recomienda los certificados sobre los secretos.",
   "Las credenciales de identidad federada (federated identity credentials), parte de la federación de identidades de carga de trabajo (workload identity federation), eliminan por completo las credenciales almacenadas. Configuras el registro de la aplicación (o una identidad administrada asignada por el usuario) para que confíe en tokens emitidos por un proveedor de identidad externo, identificado por el emisor, el sujeto y la audiencia. Por ejemplo, un flujo de trabajo de GitHub Actions en un repositorio y una rama específicos, una cuenta de servicio de Kubernetes o la identidad de carga de trabajo de otra nube. La carga de trabajo externa presenta su propio token y lo intercambia por un token de acceso de Entra. No hay ningún secreto que rotar ni que robar.",
   "De aquí se desprenden las buenas prácticas. Prefiere las identidades administradas para cargas de trabajo que se ejecutan en Azure, las credenciales federadas para cargas de trabajo fuera de Azure que las admitan, luego los certificados, y los secretos de cliente solo cuando nada más funcione, con duraciones cortas. Asigna propietarios a las aplicaciones para que alguien sea responsable de las renovaciones, y supervisa las credenciales que están por expirar. Configuraciones como app instance property lock ayudan a evitar que los atacantes agreguen nuevas credenciales a la entidad de servicio de una aplicación multitenant en otros tenants."
  ],
  "terms": [
   [
    "Application object (objeto de aplicación)",
    "La definición global de una aplicación en su tenant de origen, administrada en App registrations."
   ],
   [
    "Service principal (entidad de servicio)",
    "La instancia local de una aplicación en un tenant, que recibe permisos y asignaciones; se administra en Enterprise applications."
   ],
   [
    "Client secret (secreto de cliente)",
    "Una cadena similar a una contraseña que usa una aplicación para autenticarse; es simple, pero propensa a filtraciones y expiración."
   ],
   [
    "Certificate credential (credencial de certificado)",
    "Una clave pública registrada en la aplicación cuya clave privada firma las aserciones de autenticación; se prefiere sobre los secretos."
   ],
   [
    "Federated identity credential (credencial de identidad federada)",
    "Una relación de confianza con un proveedor de identidad externo que permite a una carga de trabajo intercambiar su token por un token de Entra sin secretos."
   ]
  ],
  "example": "Un equipo implementa en Azure desde GitHub Actions usando un secreto de cliente guardado en la configuración del repositorio. Después de que el secreto se filtra en un registro de compilación, el administrador lo reemplaza con una credencial de identidad federada que confía en el emisor de GitHub solo para la rama main de ese repositorio, elimina el secreto, y la canalización sigue funcionando sin ninguna credencial almacenada.",
  "tip": "App registrations muestra objetos de aplicación; Enterprise applications muestra entidades de servicio. Para canalizaciones en GitHub o Kubernetes donde no se permiten secretos, elige credenciales federadas. Entre secretos y certificados, los certificados son la opción más segura.",
  "check": [
   [
    "Cinco tenants de clientes usan una aplicación multitenant. ¿Cuántos objetos de aplicación y entidades de servicio existen?",
    "Un objeto de aplicación en el tenant de origen y una entidad de servicio en cada tenant donde se usa (seis si el tenant de origen también tiene una)."
   ],
   [
    "¿Qué tipo de credencial no necesita ningún secreto almacenado para un flujo de trabajo de GitHub Actions?",
    "Una credencial de identidad federada (federación de identidades de carga de trabajo)."
   ],
   [
    "¿Por qué se prefieren los certificados sobre los secretos de cliente?",
    "Porque la clave privada nunca sale de la aplicación ni se transmite; la aplicación firma una aserción, así que no hay un secreto compartido reutilizable que se pueda filtrar."
   ]
  ]
 },
 {
  "t": "API permissions: delegated vs application permissions, user consent settings, admin consent and the admin consent workflow",
  "tt": "Permisos de API: permisos delegados frente a permisos de aplicación, configuración de consentimiento de usuario, consentimiento del administrador y flujo de trabajo de consentimiento del administrador",
  "body": [
   "Las aplicaciones que llaman a API como Microsoft Graph necesitan permisos, y Microsoft Entra ID usa el consentimiento para concederlos. Entender los dos tipos de permisos y quién puede dar su consentimiento a cada uno es una de las partes más evaluadas de SC-300, y también es un problema de seguridad real: los atacantes engañan a los usuarios para que den su consentimiento a aplicaciones maliciosas, un ataque llamado concesión de consentimiento ilícita (illicit consent grant).",
   "Los permisos delegados se usan cuando una aplicación actúa en nombre de un usuario que inició sesión. La aplicación solo puede hacer lo que permiten tanto el permiso como los derechos del propio usuario. Si una aplicación tiene el permiso delegado Files.Read.All y Ana inicia sesión, solo puede leer los archivos que la propia Ana puede leer. Los permisos de aplicación, a veces llamados roles de aplicación o permisos solo de aplicación (app-only), se usan cuando una aplicación se ejecuta sin un usuario que haya iniciado sesión, como un servicio en segundo plano. La aplicación actúa como sí misma con todo el alcance del permiso en el tenant, así que User.Read.All como permiso de aplicación significa leer a todos los usuarios. Los permisos de aplicación siempre requieren el consentimiento del administrador.",
   "Algunos permisos delegados son de bajo impacto, como User.Read (iniciar sesión y leer tu propio perfil), y los usuarios pueden dar su consentimiento a ellos por sí mismos. Otros están marcados como que requieren consentimiento del administrador por su alcance, como leer los perfiles completos de todos los usuarios. Un administrador con el rol adecuado, como Cloud Application Administrator, Application Administrator o Privileged Role Administrator (para los permisos de aplicación de Microsoft Graph), puede conceder el consentimiento del administrador para todo el tenant desde la página API permissions con Grant admin consent for the tenant, o desde la página Permissions de la aplicación empresarial. El consentimiento para todo el tenant significa que no se pedirá consentimiento a cada usuario individualmente.",
   "La configuración de consentimiento de usuario, en Enterprise applications, Consent and permissions, decide lo que los usuarios pueden aprobar por su cuenta. Las opciones incluyen: Do not allow user consent, donde cada aplicación necesita a un administrador; Allow user consent for apps from verified publishers, for selected permissions, el equilibrio recomendado por Microsoft, donde los usuarios solo pueden dar su consentimiento a permisos que clasificas como de bajo impacto y de editores verificados por Microsoft; y permitir que los usuarios den su consentimiento a todas las aplicaciones para cualquier permiso que no requiera consentimiento del administrador, que es la opción más riesgosa. La configuración de consentimiento de propietarios de grupo controla por separado si los propietarios de grupos pueden dar su consentimiento a aplicaciones que acceden a los datos de su grupo.",
   "Si los usuarios no pueden dar su consentimiento, se quedan atascados. El flujo de trabajo de consentimiento del administrador (admin consent workflow) les da una salida. Cuando está habilitado, un usuario que se topa con una aplicación que necesita la aprobación de un administrador puede enviar una solicitud con una justificación. Los revisores designados (usuarios, grupos o roles) reciben un correo y revisan las solicitudes en la página Admin consent requests, donde aprueban, deniegan o bloquean la aplicación. Las solicitudes expiran después de un número de días configurable, y los revisores igualmente necesitan un rol de administrador adecuado para conceder realmente el consentimiento.",
   "Para investigar o limpiar consentimientos, revisa la página Permissions de cada aplicación empresarial, que muestra los permisos concedidos por el administrador y por los usuarios, y consulta el registro de auditoría en busca de eventos Consent to application. Quitar la entidad de servicio de una aplicación sospechosa o revocar sus permisos detiene cualquier acceso posterior."
  ],
  "terms": [
   [
    "Delegated permission (permiso delegado)",
    "Un permiso que usa una aplicación que actúa en nombre de un usuario que inició sesión, limitado por el propio acceso de ese usuario."
   ],
   [
    "Application permission (permiso de aplicación)",
    "Un permiso solo de aplicación que se usa sin un usuario que haya iniciado sesión; siempre requiere consentimiento del administrador."
   ],
   [
    "Admin consent (consentimiento del administrador)",
    "Aprobación para todo el tenant por parte de un administrador autorizado que concede a una aplicación los permisos solicitados para todos los usuarios."
   ],
   [
    "Admin consent workflow (flujo de trabajo de consentimiento del administrador)",
    "Un proceso que permite a los usuarios solicitar la aprobación de un administrador para aplicaciones a las que no pueden dar su consentimiento, revisado por revisores designados."
   ],
   [
    "Illicit consent grant (concesión de consentimiento ilícita)",
    "Un ataque que engaña a los usuarios para que concedan permisos a una aplicación maliciosa, dándole acceso a sus datos."
   ]
  ],
  "example": "Contoso configura el consentimiento de usuario para permitir solo editores verificados y permisos de bajo impacto, y habilita el flujo de trabajo de consentimiento del administrador con el equipo de seguridad como revisores. Cuando una usuaria prueba una nueva aplicación de agenda que quiere leer todos los calendarios, envía una solicitud; el revisor comprueba el editor y los permisos, y luego concede el consentimiento del administrador para el tenant.",
  "tip": "Sin usuario que haya iniciado sesión significa permisos de aplicación y consentimiento del administrador. Si los usuarios no pueden dar su consentimiento y necesitan una forma de pedirlo, la respuesta es el flujo de trabajo de consentimiento del administrador, no cambiar el consentimiento de usuario para permitir todas las aplicaciones.",
  "check": [
   [
    "Ben usa una aplicación con el permiso delegado Mail.Read. ¿El correo de quién puede leer?",
    "Solo el correo de Ben (y cualquier buzón al que el propio Ben tenga acceso), porque el acceso delegado está limitado por los permisos del usuario que inició sesión."
   ],
   [
    "¿Qué consentimiento se requiere para los permisos de aplicación?",
    "El consentimiento del administrador; los usuarios nunca pueden dar su consentimiento a permisos de aplicación."
   ],
   [
    "¿Qué configuración de consentimiento de usuario recomienda Microsoft?",
    "Allow user consent for apps from verified publishers, for selected permissions (permisos de bajo impacto)."
   ]
  ]
 },
 {
  "t": "App roles, the roles claim, and 'Assignment required' on enterprise applications",
  "tt": "Roles de aplicación, la notificación roles y 'Assignment required' en las aplicaciones empresariales",
  "body": [
   "Muchas aplicaciones necesitan su propia autorización, como distinguir entre lectores y aprobadores en una aplicación de gastos. En lugar de crear una base de datos de usuarios aparte, los desarrolladores pueden definir roles de aplicación (app roles) en Microsoft Entra ID y dejar que los administradores asignen usuarios a ellos. Luego la aplicación lee los roles del usuario desde el token y toma decisiones.",
   "Los roles de aplicación se definen en el registro de la aplicación, en App roles o en la colección appRoles del manifiesto. Cada rol tiene un nombre para mostrar, un valor (la cadena que aparece en los tokens, como Expense.Approver), una descripción y los tipos de miembro permitidos: Users/Groups, Applications o ambos. Los roles con el tipo de miembro permitido Applications se convierten en permisos de aplicación que otras aplicaciones pueden solicitar y que requieren consentimiento del administrador; así es como las API exponen permisos solo de aplicación.",
   "Las asignaciones se hacen en la aplicación empresarial (la entidad de servicio), en Users and groups. Eliges un usuario o grupo y un rol. Cuando el usuario inicia sesión, Entra agrega una notificación (claim) roles al token de ID o al token de acceso con los valores de los roles que tiene asignados, directamente o mediante un grupo. La aplicación comprueba esta notificación, por ejemplo permitiendo la acción de aprobar solo cuando la notificación roles contiene Expense.Approver. Asignar grupos a roles de aplicación requiere Microsoft Entra ID P1, y la membresía de grupos anidados no se tiene en cuenta en la asignación de roles de aplicación; solo los miembros directos del grupo asignado obtienen el rol.",
   "La notificación roles es distinta de la notificación groups. La notificación groups enumera identificadores de objeto de grupos (y puede ser grande, con un límite de exceso que obliga a la aplicación a consultar Graph), mientras que los roles de aplicación son nombres específicos de la aplicación, significativos para el desarrollador y portables entre tenants. En general, Microsoft recomienda los roles de aplicación para la autorización de aplicaciones.",
   "Assignment required es una propiedad en la página Properties de la aplicación empresarial (appRoleAssignmentRequired). Cuando está en No, el valor predeterminado para muchas aplicaciones, cualquier usuario del tenant puede iniciar sesión en la aplicación y obtener un token, aunque no tendrá ningún rol de aplicación. Cuando está en Yes, solo los usuarios y grupos asignados a la aplicación, y las aplicaciones a las que se concedieron sus roles, pueden obtener un token; a todos los demás se les bloquea al iniciar sesión con un error que indica que no están asignados. Activarla es una forma simple y poderosa de restringir quién puede usar una aplicación. Una configuración relacionada, Visible to users, controla si el icono de la aplicación aparece en My Apps; no concede ni bloquea el acceso.",
   "Para los escenarios del examen, piensa en capas: Assignment required controla quién puede iniciar sesión en absoluto, los roles de aplicación controlan lo que pueden hacer dentro de la aplicación y Conditional Access controla cómo deben iniciar sesión."
  ],
  "terms": [
   [
    "App role (rol de aplicación)",
    "Un rol con nombre definido en un registro de aplicación que puede asignarse a usuarios, grupos o aplicaciones."
   ],
   [
    "Roles claim (notificación roles)",
    "Una notificación del token que enumera los valores de los roles de aplicación asignados al usuario que inició sesión o a la aplicación que llama."
   ],
   [
    "Assignment required (asignación obligatoria)",
    "Una propiedad de la aplicación empresarial que, cuando está en Yes, solo permite obtener tokens a los usuarios, grupos y aplicaciones asignados."
   ],
   [
    "Allowed member types (tipos de miembro permitidos)",
    "La configuración del rol de aplicación que decide si un rol puede asignarse a usuarios y grupos, a aplicaciones o a ambos."
   ],
   [
    "Visible to users (visible para los usuarios)",
    "Una propiedad de la aplicación empresarial que controla si la aplicación aparece en My Apps, sin afectar el acceso."
   ]
  ],
  "example": "Una aplicación interna de gastos define dos roles de aplicación, Expense.Submitter y Expense.Approver. El administrador establece Assignment required en Yes, asigna el grupo All Employees a Submitter y el grupo Finance Managers a Approver. Un contratista que no está en ninguno de los grupos recibe un error al iniciar sesión, y el token de un gerente lleva ambos valores de rol.",
  "tip": "Si una pregunta dice que cualquier usuario puede iniciar sesión en una aplicación pero solo ciertos usuarios deberían poder, la respuesta es Assignment required en Yes más asignaciones de usuarios o grupos. Recuerda que los grupos anidados no reciben asignaciones de roles de aplicación.",
  "check": [
   [
    "¿Qué pasa cuando Assignment required está en No y un usuario no asignado inicia sesión?",
    "El usuario puede iniciar sesión y recibe un token, solo que sin ningún rol de aplicación."
   ],
   [
    "¿Dónde se definen los roles de aplicación y dónde se asignan los usuarios a ellos?",
    "Se definen en el registro de la aplicación (objeto de aplicación); se asignan en la aplicación empresarial (entidad de servicio), en Users and groups."
   ],
   [
    "Un usuario está en un grupo anidado dentro de un grupo asignado a un rol de aplicación. ¿El usuario obtiene el rol?",
    "No. La asignación de roles de aplicación mediante grupos solo se aplica a los miembros directos del grupo asignado."
   ]
  ]
 },
 {
  "t": "Enterprise application single sign-on: SAML (Identifier, Reply URL, signing certificate) and OpenID Connect",
  "tt": "Inicio de sesión único en aplicaciones empresariales: SAML (Identifier, Reply URL, certificado de firma) y OpenID Connect",
  "body": [
   "El inicio de sesión único (SSO) permite a los usuarios iniciar sesión una vez con su cuenta de Microsoft Entra y llegar a muchas aplicaciones sin contraseñas separadas. Para las aplicaciones de software como servicio (SaaS), normalmente agregas la aplicación desde la galería de aplicaciones de Microsoft Entra, lo que crea una aplicación empresarial, y luego configuras el SSO. Los dos protocolos federados principales son SAML 2.0 y OpenID Connect (OIDC); otras opciones incluyen el SSO basado en contraseña, en el que Entra almacena de forma segura las credenciales y las reproduce, y el SSO vinculado (linked SSO), que solo agrega un icono que apunta a otro proveedor de identidad.",
   "En SAML, Entra ID es el proveedor de identidad (IdP) y la aplicación es el proveedor de servicios (SP). La página SAML-based Sign-on tiene secciones que usarás en los laboratorios. Basic SAML Configuration contiene el Identifier (Entity ID), un nombre único para el SP que debe coincidir con lo que espera la aplicación, y la Reply URL, también llamada URL del Assertion Consumer Service (ACS), a la que Entra envía la respuesta SAML. Los campos opcionales incluyen la Sign on URL, que se usa para el inicio de sesión iniciado por el SP, el Relay State y la Logout URL. Attributes and Claims define lo que va en la aserción; el NameID (identificador único del usuario) es user.userprincipalname de forma predeterminada, y puedes agregar notificaciones como el correo o el departamento, o transformar valores.",
   "La sección SAML Signing Certificate contiene el certificado que Entra usa para firmar las aserciones, de modo que la aplicación pueda verificar que son auténticas. Lo descargas (Base64 o sin formato) o descargas el Federation Metadata XML y lo cargas en la aplicación, junto con la Login URL y el Microsoft Entra Identifier de la sección de configuración. Los certificados expiran, así que configura direcciones de correo de notificación y, al renovar, crea el nuevo certificado, entrégaselo a la aplicación y luego actívalo, para que el cambio no rompa el inicio de sesión. La mayoría de los errores de inicio de sesión después de la configuración vienen de valores de Identifier o Reply URL que no coinciden, de un formato de NameID incorrecto o de un certificado expirado o que no coincide; el botón Test single sign-on y la extensión My Apps Secure Sign-in Extension ayudan a descifrar el error.",
   "OpenID Connect se basa en OAuth 2.0 y usa JSON Web Tokens. La aplicación solicita a Entra un token de ID, que le dice quién es el usuario, y a menudo un token de acceso para llamar a API. La configuración vive sobre todo en el registro de la aplicación: los URI de redirección, el client ID, las credenciales si la aplicación es confidencial y la configuración de tokens para notificaciones opcionales. Las aplicaciones OIDC de la galería normalmente se agregan iniciando sesión y dando el consentimiento, no llenando campos de SAML. OIDC es la opción moderna predeterminada para aplicaciones nuevas, especialmente aplicaciones móviles y de una sola página; SAML es común en las aplicaciones SaaS empresariales existentes.",
   "Sea cual sea el protocolo que uses, la aplicación empresarial también controla quién puede usar la aplicación (Assignment required y la asignación de usuarios o grupos), si aparece en My Apps, el aprovisionamiento y qué directivas de Conditional Access se aplican. Los registros de inicio de sesión muestran los intentos de SSO con el nombre de la aplicación, para que puedas solucionar problemas por aplicación."
  ],
  "terms": [
   [
    "Identifier (Entity ID, identificador)",
    "El nombre único de un proveedor de servicios SAML que debe coincidir entre Entra y la aplicación."
   ],
   [
    "Reply URL (ACS URL, URL de respuesta)",
    "El punto de conexión de la aplicación al que Entra ID envía la respuesta SAML después del inicio de sesión."
   ],
   [
    "SAML signing certificate (certificado de firma SAML)",
    "El certificado que Entra usa para firmar las aserciones SAML y que la aplicación usa para verificarlas."
   ],
   [
    "NameID",
    "La notificación SAML que identifica de forma única al usuario ante la aplicación; de forma predeterminada, el nombre principal de usuario."
   ],
   [
    "OpenID Connect",
    "Un protocolo de identidad sobre OAuth 2.0 que emite tokens de ID en formato JWT para identificar a los usuarios."
   ]
  ],
  "example": "Contoso agrega una aplicación de Recursos Humanos de la galería con SAML. La administradora introduce el Entity ID y la Reply URL del proveedor, mantiene el UPN como NameID, descarga el certificado en Base64 y lo entrega, junto con la Login URL, en la página de configuración del proveedor. Tres años después llega una notificación de expiración; ella crea un certificado nuevo, lo carga en el proveedor, lo activa y nadie nota el cambio.",
  "tip": "Un error de SAML que dice que la dirección de respuesta no coincide apunta a la Reply URL; una aplicación que no reconoce el emisor o la audiencia apunta al Identifier. Rota los certificados de firma agregando el nuevo a la aplicación antes de activarlo en Entra.",
  "check": [
   [
    "¿Qué es la Reply URL en la configuración de SAML?",
    "La URL del Assertion Consumer Service en la aplicación, a la que Entra ID envía la respuesta SAML firmada."
   ],
   [
    "¿Qué campo de SAML debe ser único e identificar la aplicación ante Entra?",
    "El Identifier (Entity ID)."
   ],
   [
    "¿Qué token le dice a una aplicación OIDC quién es el usuario?",
    "El token de ID, un JSON Web Token emitido por Entra ID."
   ]
  ]
 },
 {
  "t": "Automatic user provisioning to SaaS apps with SCIM, scoping filters and provisioning logs",
  "tt": "Aprovisionamiento automático de usuarios en aplicaciones SaaS con SCIM, filtros de ámbito y registros de aprovisionamiento",
  "body": [
   "El inicio de sesión único permite que los usuarios inicien sesión, pero muchas aplicaciones SaaS también necesitan que primero exista una cuenta en la aplicación. Crear y eliminar esas cuentas a mano es lento y deja cuentas huérfanas cuando las personas se van. El aprovisionamiento automático de usuarios en Microsoft Entra ID crea, actualiza y deshabilita cuentas en la aplicación según quién esté asignado a ella, y es una parte clave de la administración del ciclo de vida de las identidades.",
   "La mayoría de las aplicaciones usa SCIM, System for Cross-domain Identity Management, un estándar abierto con puntos de conexión REST para usuarios y grupos. En la página Provisioning de la aplicación empresarial, estableces Provisioning Mode en Automatic e introduces las Admin Credentials, normalmente una Tenant URL (el punto de conexión SCIM de la aplicación) y un Secret Token o una conexión OAuth proporcionados por el proveedor de la aplicación. Test Connection confirma que Entra puede llegar al punto de conexión. Las aplicaciones de la galería vienen con conectores preconfigurados; las aplicaciones personalizadas pueden usar un conector SCIM genérico si la aplicación implementa el estándar.",
   "Las asignaciones de atributos (mappings) definen qué atributos de Entra van a qué atributos de la aplicación, por ejemplo userPrincipalName a userName, y una expresión Switch que convierte códigos de departamento en valores de la aplicación. Un atributo de coincidencia decide cómo encuentra Entra una cuenta existente en la aplicación, lo que evita duplicados. El ámbito controla a quién se aprovisiona. La opción de Settings Sync only assigned users and groups (el valor predeterminado recomendado) aprovisiona a los usuarios asignados a la aplicación empresarial directamente o mediante grupos; Sync all users and groups aprovisiona a todos. Los filtros de ámbito (scoping filters) acotan aún más con reglas de atributos, como department EQUALS Sales. Dentro de un grupo de filtros de ámbito, todas las cláusulas deben ser verdaderas (AND); varios grupos de filtros de ámbito se combinan con OR.",
   "Cuando inicias el aprovisionamiento, Entra ejecuta un ciclo inicial que evalúa a todos los que están en el ámbito y luego ciclos incrementales que procesan solo los cambios, aproximadamente cada 40 minutos. Cuando se quita la asignación de un usuario, este sale de un filtro de ámbito, o se deshabilita o elimina en Entra, el servicio de aprovisionamiento deshabilita o elimina la cuenta en la aplicación, según las operaciones que admita la aplicación. Provision on demand te permite enviar un solo usuario de inmediato para probar las asignaciones y ver el resultado de cada paso.",
   "Los registros de aprovisionamiento (provisioning logs) guardan cada acción: creado, actualizado, deshabilitado, omitido, con estado de éxito, fallo u omitido y un motivo, como un atributo obligatorio faltante o un duplicado en la aplicación. Si se acumulan los fallos, el trabajo puede entrar en cuarentena (quarantine) y ejecutarse con menos frecuencia hasta que se corrija el problema; la página Provisioning muestra el estado de cuarentena y puedes reiniciar el trabajo después de corregir las credenciales o los datos. Configura un correo de notificación para los fallos. Los registros de auditoría guardan los cambios de configuración del trabajo."
  ],
  "terms": [
   [
    "SCIM",
    "System for Cross-domain Identity Management, un protocolo REST estándar para aprovisionar usuarios y grupos."
   ],
   [
    "Attribute mapping (asignación de atributos)",
    "La regla que asigna un atributo o expresión de Entra a un atributo de la aplicación de destino."
   ],
   [
    "Scoping filter (filtro de ámbito)",
    "Cláusulas basadas en atributos que limitan qué usuarios o grupos asignados se aprovisionan."
   ],
   [
    "Provision on demand (aprovisionamiento a petición)",
    "Aprovisionar un solo usuario de inmediato para probar y solucionar problemas de la configuración."
   ],
   [
    "Quarantine (cuarentena)",
    "Un estado del trabajo de aprovisionamiento al que se entra tras fallos repetidos, en el que se ejecuta con menos frecuencia hasta que se corrige."
   ]
  ],
  "example": "Una empresa asigna su grupo Sales a una aplicación empresarial de CRM y activa el aprovisionamiento SCIM con un filtro de ámbito employeeType EQUALS Employee, para que los contratistas de Sales no se aprovisionen. Cuando una vendedora se va y se deshabilita en Entra, el siguiente ciclo incremental deshabilita su cuenta del CRM, y el registro de aprovisionamiento muestra que la actualización tuvo éxito.",
  "tip": "La asignación y el ámbito deciden a quién se aprovisiona; las cláusulas de un mismo grupo de filtros de ámbito se combinan con AND y los grupos con OR. Si un usuario concreto no aparece en la aplicación, usa provision on demand y luego lee la entrada del registro de aprovisionamiento para ver el motivo.",
  "check": [
   [
    "¿Qué dos valores introduces normalmente como Admin Credentials para una aplicación SCIM?",
    "La Tenant URL de la aplicación (punto de conexión SCIM) y un Secret Token (o una conexión OAuth)."
   ],
   [
    "¿Cómo se evalúan las cláusulas dentro de un mismo grupo de filtros de ámbito?",
    "Con AND: todas las cláusulas deben ser verdaderas para que el usuario esté en el ámbito."
   ],
   [
    "¿Qué pasa en la aplicación cuando se quita la asignación de un usuario aprovisionado en la aplicación empresarial?",
    "El servicio de aprovisionamiento deshabilita (o elimina, según la aplicación) la cuenta del usuario en la aplicación."
   ]
  ]
 },
 {
  "t": "Microsoft Entra application proxy and private network connectors for on-premises web apps",
  "tt": "Microsoft Entra application proxy y conectores de red privada para aplicaciones web locales",
  "body": [
   "Muchas organizaciones todavía ejecutan aplicaciones web locales, como una intranet, un sistema de gastos o una granja de SharePoint Server. Microsoft Entra application proxy publica estas aplicaciones para los usuarios remotos de forma segura, sin VPN y sin abrir puertos entrantes en el firewall. Los usuarios inician sesión con Microsoft Entra ID, así que Conditional Access, la MFA y los registros de inicio de sesión se aplican a las aplicaciones heredadas igual que a las aplicaciones en la nube.",
   "Application proxy tiene dos partes: un servicio en la nube en Entra ID y conectores de red privada instalados en servidores Windows dentro de tu red. Los conectores solo establecen conexiones HTTPS salientes hacia el servicio en la nube y las mantienen abiertas, así que no se necesitan puertos entrantes ni una DMZ. Cuando un usuario navega a la URL externa de la aplicación, el servicio en la nube autentica al usuario y luego pasa la solicitud por la conexión saliente existente a un conector, que la reenvía a la URL interna y devuelve la respuesta. Los conectores de red privada se comparten con Microsoft Entra Private Access, así que la misma infraestructura de conectores admite ambos.",
   "Instala al menos dos conectores por cada grupo de conectores para tener alta disponibilidad, ubicados cerca de las aplicaciones a las que sirven. Los grupos de conectores (connector groups) te permiten asignar aplicaciones específicas a conectores específicos, por ejemplo un grupo en cada centro de datos o uno para un segmento de red aislado. Los conectores se actualizan automáticamente, y su estado aparece en el centro de administración.",
   "Para publicar una aplicación, crea una aplicación local (on-premises application) en Enterprise applications. Las configuraciones clave son: Internal URL, la dirección que usa el conector; External URL, ya sea una dirección msappproxy.net o tu propio dominio personalizado con un certificado cargado; Pre-authentication, donde Microsoft Entra ID (la opción recomendada) autentica a los usuarios antes de que cualquier tráfico llegue a tu red, mientras que Passthrough envía tráfico no autenticado a la aplicación; y el grupo de conectores. Las opciones de traducción de URL reescriben los vínculos en los encabezados o en el cuerpo de la aplicación si las URL internas y externas son distintas.",
   "El inicio de sesión único en la aplicación de back-end puede usar varios métodos. Integrated Windows Authentication usa la delegación restringida de Kerberos (Kerberos constrained delegation, KCD): se permite a la cuenta de equipo del conector delegar en el nombre de entidad de servicio (SPN) de la aplicación, de modo que obtiene un ticket Kerberos en nombre del usuario. El SSO basado en encabezados pasa la identidad en encabezados HTTP para las aplicaciones que los esperan, el SSO SAML funciona para aplicaciones SAML locales, y también está disponible el SSO basado en contraseña. Los usuarios llegan a las aplicaciones publicadas a través de My Apps o de la URL externa.",
   "Application proxy requiere Microsoft Entra ID P1 o P2. Los puntos típicos de solución de problemas incluyen conectores que no pueden llegar al servicio por un proxy o firewall de salida, una URL interna faltante o incorrecta, y una configuración incorrecta de KCD, como un SPN o una configuración de delegación faltantes."
  ],
  "terms": [
   [
    "Application proxy (proxy de aplicación)",
    "Un servicio de Entra que publica aplicaciones web locales para usuarios remotos con autenticación de Entra y sin puertos entrantes."
   ],
   [
    "Private network connector (conector de red privada)",
    "Un servicio ligero de Windows con conexiones solo salientes que retransmite el tráfico para application proxy y Private Access."
   ],
   [
    "Connector group (grupo de conectores)",
    "Un conjunto de conectores asignado a aplicaciones publicadas específicas, que se usa por ubicación y disponibilidad."
   ],
   [
    "Pre-authentication (autenticación previa)",
    "Exigir el inicio de sesión en Microsoft Entra ID antes de que el tráfico llegue a la aplicación interna; la alternativa es Passthrough."
   ],
   [
    "Kerberos constrained delegation (delegación restringida de Kerberos)",
    "Permitir que el conector solicite tickets Kerberos en nombre de los usuarios para el SSO con Integrated Windows Authentication."
   ]
  ],
  "example": "El sitio local de programación de turnos de un hospital usa autenticación de Windows. El administrador instala dos conectores de red privada, publica el sitio con autenticación previa de Microsoft Entra ID y una URL externa personalizada, configura KCD para el SPN del sitio y aplica una directiva de Conditional Access que exige MFA. Las enfermeras lo abren desde casa en My Apps, sin VPN y sin que la aplicación les pida contraseña.",
  "tip": "Los conectores solo necesitan el puerto 443 saliente, nunca puertos entrantes. Para el SSO con Integrated Windows Authentication, la respuesta es la delegación restringida de Kerberos. Elige la autenticación previa de Microsoft Entra ID siempre que Conditional Access o la MFA deban proteger la aplicación.",
  "check": [
   [
    "¿Qué cambio en el firewall se necesita para publicar una aplicación con application proxy?",
    "Ninguno de entrada; los conectores solo necesitan acceso HTTPS saliente al servicio en la nube de Microsoft."
   ],
   [
    "¿Cómo proporciona application proxy el SSO a una aplicación que usa Integrated Windows Authentication?",
    "Mediante la delegación restringida de Kerberos desde la cuenta de equipo del conector hacia el SPN de la aplicación."
   ],
   [
    "¿Por qué implementar al menos dos conectores en un grupo de conectores?",
    "Para alta disponibilidad y equilibrio de carga; si un conector falla, el otro sigue atendiendo las aplicaciones."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Cloud Apps: cloud discovery, app governance and Conditional Access app control session policies",
  "tt": "Microsoft Defender for Cloud Apps: detección en la nube, gobernanza de aplicaciones y directivas de sesión de Conditional Access app control",
  "body": [
   "Microsoft Defender for Cloud Apps es el agente de seguridad de acceso a la nube (CASB) de Microsoft. Se sitúa entre los usuarios y los servicios en la nube para dar visibilidad y control: qué aplicaciones usan las personas, qué datos mueven y qué pueden hacer las aplicaciones OAuth. Para SC-300 necesitas tres capacidades: la detección en la nube (cloud discovery), la gobernanza de aplicaciones (app governance) y Conditional Access app control.",
   "La detección en la nube encuentra el shadow IT (TI en la sombra), las aplicaciones en la nube que las personas usan sin la aprobación de TI. Analiza registros de tráfico: puedes cargar manualmente registros de firewall o proxy para un informe instantáneo, ejecutar un recopilador de registros para informes continuos o integrarla con Microsoft Defender for Endpoint para que los dispositivos administrados informen directamente del uso de la nube. El panel de detección en la nube muestra aplicaciones, usuarios, direcciones IP y volúmenes de datos. Cada aplicación se compara con el catálogo de aplicaciones en la nube, que le asigna una puntuación de riesgo basada en decenas de factores, como certificaciones de seguridad, manejo de datos y cumplimiento legal. Luego etiquetas las aplicaciones como autorizadas (sanctioned) o no autorizadas (unsanctioned); con la integración de Defender for Endpoint, las aplicaciones no autorizadas pueden bloquearse en los dispositivos.",
   "La gobernanza de aplicaciones se centra en las aplicaciones OAuth integradas con Microsoft 365 mediante el consentimiento de Entra ID. Inventaría estas aplicaciones, muestra sus permisos, su editor, su acceso a datos y su uso, y marca las aplicaciones que tienen privilegios excesivos, no se usan, provienen de editores no verificados o se comportan de forma anómala, como una aplicación que de repente descarga grandes volúmenes de correo. Las directivas pueden alertar sobre las aplicaciones que cumplen condiciones riesgosas o deshabilitarlas. Esto complementa la configuración de consentimiento de Entra: Entra decide si se puede dar el consentimiento, y la gobernanza de aplicaciones vigila lo que realmente hacen las aplicaciones que lo recibieron.",
   "Conditional Access app control extiende el Conditional Access de Entra hacia la sesión. En una directiva de Conditional Access, el control de sesión Use Conditional Access App Control enruta la sesión del navegador del usuario a través de Defender for Cloud Apps como proxy inverso. Luego creas directivas en Defender for Cloud Apps. Las directivas de acceso deciden en tiempo real si se permite o bloquea el acceso a la aplicación, por ejemplo bloqueando los clientes de escritorio nativos. Las directivas de sesión controlan la actividad durante la sesión: supervisar todas las actividades, bloquear descargas, proteger las descargas aplicando una etiqueta de confidencialidad o cifrado, bloquear la carga de malware o de archivos sensibles, o bloquear actividades específicas como copiar y pegar o imprimir.",
   "Un diseño común es: los usuarios en dispositivos administrados y compatibles obtienen acceso completo, mientras que los usuarios en dispositivos no administrados se enrutan a app control, donde pueden ver documentos en el navegador pero no descargarlos. El control de sesión funciona para aplicaciones que usan SAML u OIDC con Entra ID, incluidas muchas aplicaciones de la galería, y requiere acceso basado en navegador, ya que las aplicaciones nativas no pueden pasar por el proxy. Las actividades aparecen en el registro de actividad de Defender for Cloud Apps para su investigación."
  ],
  "terms": [
   [
    "CASB",
    "Cloud access security broker (agente de seguridad de acceso a la nube), un servicio que ofrece visibilidad y control sobre el uso de aplicaciones en la nube."
   ],
   [
    "Cloud discovery (detección en la nube)",
    "Análisis de registros de tráfico o señales de los endpoints para identificar las aplicaciones en la nube en uso y su riesgo."
   ],
   [
    "Sanctioned app (aplicación autorizada)",
    "Una aplicación en la nube aprobada para su uso; las aplicaciones no autorizadas pueden marcarse o bloquearse."
   ],
   [
    "App governance (gobernanza de aplicaciones)",
    "Capacidad de Defender for Cloud Apps que supervisa y controla los permisos y el comportamiento de las aplicaciones OAuth."
   ],
   [
    "Session policy (directiva de sesión)",
    "Una directiva de Conditional Access app control que supervisa o restringe acciones, como las descargas, durante una sesión."
   ]
  ],
  "example": "Contoso carga registros de firewall y descubre 300 aplicaciones de almacenamiento en la nube en uso. Autoriza dos, marca el resto como no autorizadas para que Defender for Endpoint las bloquee y crea una directiva de Conditional Access que enruta las sesiones desde dispositivos no administrados a app control, donde una directiva de sesión bloquea la descarga desde SharePoint de archivos etiquetados como Confidential.",
  "tip": "Bloquear en tiempo real las descargas desde dispositivos no administrados es una directiva de sesión en Conditional Access app control, habilitada con el control de sesión Use Conditional Access App Control. Encontrar aplicaciones no aprobadas es detección en la nube; vigilar aplicaciones OAuth riesgosas es gobernanza de aplicaciones.",
  "check": [
   [
    "¿Qué control de sesión de Conditional Access envía una sesión a través de Defender for Cloud Apps?",
    "Use Conditional Access App Control."
   ],
   [
    "¿Cuáles son tres formas de alimentar la detección en la nube?",
    "La carga manual de registros (informes instantáneos), un recopilador de registros automático y la integración con Microsoft Defender for Endpoint."
   ],
   [
    "¿Qué capacidad de Defender for Cloud Apps marca una aplicación OAuth con privilegios excesivos que de repente lee grandes volúmenes de correo?",
    "La gobernanza de aplicaciones (app governance)."
   ]
  ]
 },
 {
  "t": "Monitoring and securing workload identities: Workload ID Premium, risky workload identities, Conditional Access for workload identities",
  "tt": "Supervisión y protección de identidades de carga de trabajo: Workload ID Premium, identidades de carga de trabajo riesgosas y Conditional Access para identidades de carga de trabajo",
  "body": [
   "Las identidades de carga de trabajo (workload identities) son las identidades que usa el software: entidades de servicio para aplicaciones e identidades administradas para recursos de Azure. A menudo tienen permisos poderosos, no hacen MFA y nadie nota cuando se comportan mal, lo que las convierte en objetivos atractivos. Los atacantes que roban un secreto de cliente de un repositorio de código pueden iniciar sesión como la aplicación y usar sus permisos en silencio.",
   "Microsoft Entra Workload ID Premium es una licencia aparte que agrega funciones de seguridad para identidades de carga de trabajo. Incluye Conditional Access para identidades de carga de trabajo, ID Protection para identidades de carga de trabajo (identidades de carga de trabajo riesgosas), revisiones de acceso para entidades de servicio asignadas a roles privilegiados y recomendaciones de estado de las aplicaciones. Las capacidades básicas, como crear entidades de servicio, identidades administradas y la federación de identidades de carga de trabajo, no la necesitan.",
   "Conditional Access para identidades de carga de trabajo te permite dirigir una directiva a entidades de servicio en las asignaciones en lugar de a usuarios. Se aplica a entidades de servicio de un solo tenant registradas en tu tenant; no se aplica a identidades administradas ni a aplicaciones multitenant de terceros. Como las cargas de trabajo no pueden hacer MFA, los controles admitidos se limitan al bloqueo: puedes bloquear el acceso cuando un inicio de sesión viene de fuera de una ubicación con nombre, como los rangos de IP conocidos de tus agentes de compilación, o cuando el riesgo de la entidad de servicio es medio o alto. Una directiva como bloquear esta entidad de servicio a menos que inicie sesión desde los rangos de IP de nuestra canalización hace que un secreto robado sea mucho menos útil.",
   "Risky workload identities (identidades de carga de trabajo riesgosas), en ID Protection, detecta el compromiso de entidades de servicio. Las detecciones incluyen credenciales filtradas (secretos encontrados en repositorios de código públicos), inicios de sesión sospechosos con propiedades inusuales, entidad de servicio confirmada como comprometida por el administrador, aplicación maliciosa, aplicación sospechosa y actividad anómala de la entidad de servicio, como cambios inusuales en credenciales o en la configuración del directorio. El informe muestra el nivel de riesgo y las detecciones de cada identidad. Los administradores pueden confirmar el compromiso, descartar el riesgo o investigar en los registros de inicio de sesión y de auditoría, y la corrección normalmente implica quitar y rotar credenciales, deshabilitar la entidad de servicio y revisar a qué accedió.",
   "La supervisión sin funciones premium sigue siendo importante. Los inicios de sesión de entidades de servicio y de identidades administradas tienen sus propias pestañas en los registros de inicio de sesión, que muestran qué aplicación inició sesión, desde qué dirección IP y con qué credencial. Los registros de auditoría muestran credenciales agregadas, nuevos propietarios y concesiones de permisos, que son técnicas de persistencia clásicas. Envía estos registros a Log Analytics y crea alertas para eventos como la adición de credenciales a una aplicación con muchos privilegios. Combina esto con buenas prácticas: prefiere las identidades administradas y las credenciales federadas sobre los secretos, da a las cargas de trabajo permisos con mínimo privilegio y asigna propietarios a cada aplicación."
  ],
  "terms": [
   [
    "Workload identity (identidad de carga de trabajo)",
    "Una identidad que usa el software, como una entidad de servicio o una identidad administrada."
   ],
   [
    "Workload ID Premium",
    "Una licencia que agrega Conditional Access, detección de riesgo, revisiones de acceso y recomendaciones para identidades de carga de trabajo."
   ],
   [
    "Conditional Access for workload identities (Conditional Access para identidades de carga de trabajo)",
    "Directivas dirigidas a entidades de servicio de un solo tenant que bloquean el acceso según la ubicación o el riesgo de la entidad de servicio."
   ],
   [
    "Risky workload identity (identidad de carga de trabajo riesgosa)",
    "Una entidad de servicio marcada por ID Protection con detecciones como credenciales filtradas o actividad anómala."
   ],
   [
    "Service principal sign-in log (registro de inicio de sesión de entidades de servicio)",
    "La pestaña del registro de inicio de sesión que guarda la autenticación de aplicaciones con sus propias credenciales."
   ]
  ],
  "example": "Una aplicación de implementación se autentica con un certificado desde agentes de compilación en dos rangos de IP conocidos. Con Workload ID Premium, el administrador crea una ubicación con nombre para esos rangos y una directiva de Conditional Access que bloquea a la entidad de servicio desde cualquier otra ubicación. Cuando el secreto de otra aplicación aparece en un repositorio público, ID Protection lo marca como credencial filtrada y el equipo lo rota ese mismo día.",
  "tip": "Conditional Access para identidades de carga de trabajo solo admite entidades de servicio de un solo tenant, no identidades administradas, y su control de concesión es el bloqueo (por ubicación o riesgo). Cualquier cosa más allá de las funciones básicas de identidades de carga de trabajo apunta a la licencia Workload ID Premium.",
  "check": [
   [
    "¿Puedes aplicar directivas de Conditional Access a identidades administradas?",
    "No. Conditional Access para identidades de carga de trabajo se aplica a entidades de servicio de un solo tenant, no a identidades administradas."
   ],
   [
    "¿Qué controles puede aplicar una directiva de Conditional Access para identidades de carga de trabajo?",
    "Bloquear el acceso, según condiciones como la ubicación o el riesgo de la entidad de servicio; las cargas de trabajo no pueden cumplir la MFA."
   ],
   [
    "¿Qué licencia se necesita para las detecciones de identidades de carga de trabajo riesgosas y para Conditional Access para identidades de carga de trabajo?",
    "Microsoft Entra Workload ID Premium."
   ]
  ]
 },
 {
  "t": "Reviewing and removing unused or over-permissioned applications and expiring credentials",
  "tt": "Revisión y eliminación de aplicaciones sin uso o con permisos excesivos y de credenciales que expiran",
  "body": [
   "Con el tiempo, un tenant acumula aplicaciones: proyectos piloto que terminaron, aplicaciones cuyos propietarios se fueron, integraciones a las que se concedieron permisos amplios hace años. Cada una es una puerta potencial. Una aplicación sin uso con un secreto válido y el permiso de aplicación Mail.ReadWrite es exactamente lo que un atacante espera encontrar. Por eso, la higiene de las aplicaciones es parte del trabajo del administrador de identidades.",
   "Empieza por encontrar lo que no se usa. Los registros de inicio de sesión muestran los inicios de sesión de entidades de servicio y de usuarios por aplicación, y los informes Usage and insights resumen la actividad. Las recomendaciones de Microsoft Entra incluyen elementos como quitar aplicaciones sin uso, quitar credenciales sin uso de las aplicaciones y renovar credenciales de entidades de servicio que están por expirar; cada recomendación enumera los recursos afectados y los pasos para corregirlos. La gobernanza de aplicaciones de Microsoft Defender for Cloud Apps agrega una vista del acceso real a datos de las aplicaciones OAuth y marca las aplicaciones sin uso o con privilegios excesivos.",
   "Luego encuentra lo que tiene demasiado acceso. Abre la página Permissions de cada aplicación empresarial para ver los permisos consentidos por el administrador y por los usuarios. Busca permisos de aplicación con alcance en todo el tenant, como Directory.ReadWrite.All o Mail.ReadWrite, y compáralos con lo que la aplicación realmente necesita. Revisa también qué aplicaciones tienen roles de Microsoft Entra o roles de Azure RBAC en ámbitos amplios. Cuando la aplicación lo admita, reemplaza los permisos amplios por otros más limitados, por ejemplo Sites.Selected para SharePoint, de modo que una aplicación solo pueda llegar a los sitios especificados.",
   "Las credenciales necesitan su propia atención. Los secretos de cliente y los certificados expiran; cuando lo hacen, las integraciones fallan, y los administradores bajo presión pueden crear secretos de larga duración como solución rápida. Controla la expiración revisando Certificates & secrets en los registros de aplicaciones, usando la recomendación de credenciales que expiran o consultando Microsoft Graph en busca de passwordCredentials y keyCredentials con valores de endDateTime próximos. Asigna propietarios a cada aplicación para que alguien reciba las notificaciones y se encargue de la renovación, y usa directivas de administración de aplicaciones, cuando estén disponibles, para restringir la duración de los secretos o bloquear secretos nuevos.",
   "Quitar aplicaciones de forma segura es una secuencia. Primero deshabilita el inicio de sesión en la aplicación empresarial (establece Enabled for users to sign-in en No), lo que detiene la emisión de nuevos tokens y conserva la configuración. Vigila si hay quejas y errores durante un período acordado. Luego quita los permisos o elimina la entidad de servicio. Los registros de aplicaciones eliminados se pueden restaurar durante 30 días, lo que ofrece una red de seguridad. En el caso de aplicaciones multitenant de terceros, eliminar la entidad de servicio la quita solo de tu tenant, y los usuarios podrían volver a dar su consentimiento a menos que la configuración de consentimiento lo impida.",
   "Las funciones de gobernanza ayudan a que esto no se repita: las revisiones de acceso pueden incluir entidades de servicio asignadas a roles privilegiados, y la configuración de consentimiento junto con el flujo de trabajo de consentimiento del administrador impiden que lleguen sin que nadie lo note nuevas aplicaciones con privilegios excesivos."
  ],
  "terms": [
   [
    "Unused application (aplicación sin uso)",
    "Un registro de aplicación o aplicación empresarial sin inicios de sesión recientes, candidata a deshabilitarse y quitarse."
   ],
   [
    "Overprivileged application (aplicación con privilegios excesivos)",
    "Una aplicación a la que se concedieron permisos más amplios de los que necesita, como acceso de lectura y escritura en todo el tenant."
   ],
   [
    "Credential expiry (expiración de credenciales)",
    "La fecha de fin de un secreto de cliente o certificado, después de la cual la aplicación ya no puede autenticarse con él."
   ],
   [
    "Enabled for users to sign-in",
    "Una propiedad de la aplicación empresarial que, cuando está en No, bloquea todos los inicios de sesión en esa aplicación."
   ],
   [
    "Microsoft Entra recommendations (recomendaciones de Microsoft Entra)",
    "Orientación específica del tenant que enumera acciones como quitar aplicaciones sin uso o renovar credenciales que están por expirar."
   ]
  ],
  "example": "Una revisión trimestral encuentra una integración de Recursos Humanos usada por última vez hace 14 meses que todavía tiene User.ReadWrite.All y un secreto que expira el año próximo. El administrador confirma con Recursos Humanos que el proveedor fue reemplazado, establece Enabled for users to sign-in en No, espera dos semanas sin quejas, quita el secreto y elimina el registro de la aplicación, sabiendo que puede restaurarse durante 30 días.",
  "tip": "Deshabilita antes de eliminar: establece Enabled for users to sign-in en No para probar el impacto de forma segura. En las preguntas sobre la expiración de credenciales, piensa en propietarios, notificaciones, la recomendación de credenciales que expiran y en preferir certificados o credenciales federadas.",
  "check": [
   [
    "¿Cuál es el primer paso más seguro antes de eliminar una aplicación que crees que no se usa?",
    "Deshabilitarla estableciendo Enabled for users to sign-in en No y supervisar el impacto."
   ],
   [
    "¿Dónde puedes ver qué permisos se han concedido a una aplicación empresarial?",
    "En la página Permissions de la aplicación empresarial, que enumera las concesiones de consentimiento del administrador y de los usuarios."
   ],
   [
    "¿Durante cuánto tiempo se puede restaurar un registro de aplicación eliminado?",
    "Durante 30 días después de su eliminación."
   ]
  ]
 },
 {
  "t": "Entitlement management: catalogs, access packages, assignment policies, approvals, expiration and separation of duties",
  "tt": "Administración de derechos: catálogos, paquetes de acceso, directivas de asignación, aprobaciones, expiración y separación de funciones",
  "body": [
   "La administración de derechos (entitlement management), parte de Microsoft Entra ID Governance, convierte las solicitudes de acceso en un proceso de autoservicio y auditable. En lugar de abrir tickets por cada grupo, equipo de Teams, aplicación y sitio de SharePoint que necesita un proyecto, un usuario solicita un único paquete de acceso que los contiene a todos, alguien lo aprueba, y el acceso se concede y luego se quita automáticamente.",
   "Un catálogo es un contenedor de recursos y paquetes de acceso. Los recursos pueden ser grupos y equipos de Teams, aplicaciones empresariales (con sus roles de aplicación), sitios de SharePoint Online (con sus roles de sitio) y otros tipos de recursos compatibles. Los catálogos te permiten delegar: los propietarios del catálogo administran sus recursos y paquetes, los administradores de paquetes de acceso administran los paquetes dentro de él, y los creadores de catálogos pueden crear catálogos nuevos. El catálogo General existe de forma predeterminada. Un recurso debe agregarse a un catálogo antes de poder usarse en un paquete de acceso, y para agregarlo se requiere ser propietario del recurso o tener un rol de administrador adecuado.",
   "Un paquete de acceso (access package) agrupa roles de recursos, como la membresía de un grupo, el rol User en una aplicación y Member en un sitio, con una o más directivas. Cada directiva de asignación define quién puede solicitarlo (usuarios y grupos específicos de tu directorio, todos los miembros, todos los usuarios incluidos los invitados, organizaciones conectadas específicas, o nadie, lo que significa que solo los administradores lo asignan directamente), qué ocurre al solicitarlo y por cuánto tiempo. Las directivas de asignación automática pueden agregar a los usuarios que cumplen una regla de atributos, como todos los del departamento Sales, sin necesidad de una solicitud.",
   "La configuración de aprobación de una directiva incluye si se requiere aprobación, quién aprueba (aprobadores específicos, el gerente del solicitante, patrocinadores o patrocinadores internos), aprobación de una sola etapa o de varias etapas, aprobadores de respaldo, escalamiento y un tiempo de espera tras el cual se deniegan las solicitudes no aprobadas. Se puede pedir a los solicitantes una justificación y preguntas personalizadas. La configuración del ciclo de vida define la expiración: en una fecha específica, después de un número de días u horas, o nunca. Se puede permitir a los usuarios solicitar una extensión antes de que termine el acceso, y pueden integrarse revisiones de acceso periódicas en la directiva para confirmar que el acceso continuo sigue siendo necesario.",
   "La separación de funciones (separation of duties) evita combinaciones tóxicas. En la configuración de un paquete de acceso enumeras paquetes de acceso incompatibles o grupos incompatibles. Un usuario que ya tiene uno de ellos no puede solicitar este paquete; por ejemplo, un usuario con el paquete Accounts Payable no puede solicitar Payment Approver. Los administradores que asignan directamente aún pueden anularlo, y las comprobaciones quedan registradas.",
   "Todo se audita: las solicitudes, aprobaciones, asignaciones y eliminaciones aparecen en las páginas de solicitudes y asignaciones del paquete de acceso y en el registro de auditoría. Las extensiones personalizadas pueden llamar a Azure Logic Apps en distintos puntos del ciclo de vida, por ejemplo para crear una cuenta en un sistema que no es de Entra cuando se concede una asignación. La administración de derechos requiere licencias Microsoft Entra ID P2 o Microsoft Entra ID Governance, y algunas funciones avanzadas requieren específicamente ID Governance."
  ],
  "terms": [
   [
    "Catalog (catálogo)",
    "Un contenedor de recursos y paquetes de acceso con sus propios propietarios delegados."
   ],
   [
    "Access package (paquete de acceso)",
    "Un conjunto de roles de recursos (grupos, aplicaciones, sitios) con directivas que rigen quién puede obtenerlos y por cuánto tiempo."
   ],
   [
    "Assignment policy (directiva de asignación)",
    "Reglas de un paquete de acceso que definen quién puede solicitarlo, los pasos de aprobación, la expiración y las revisiones."
   ],
   [
    "Separation of duties (separación de funciones)",
    "Configuración del paquete de acceso que enumera paquetes o grupos incompatibles para evitar accesos en conflicto."
   ],
   [
    "Automatic assignment policy (directiva de asignación automática)",
    "Una directiva que asigna un paquete de acceso a los usuarios que cumplen una regla de atributos, sin necesidad de solicitud."
   ]
  ],
  "example": "Una nueva campaña de marketing necesita un equipo de Teams, un sitio de SharePoint y una aplicación de diseño. La líder de marketing, propietaria de un catálogo, crea un paquete de acceso Campaign con una directiva que permite solicitarlo a los miembros del departamento de Marketing, aprobación del gerente y expiración a los 90 días con extensión permitida. El paquete se marca como incompatible con el paquete Finance Approver para aplicar la separación de funciones.",
  "tip": "Los recursos van en catálogos, los catálogos contienen paquetes de acceso, y las directivas deciden quién, la aprobación y la duración. Cuando una pregunta describe un acceso agrupado, aprobado y con límite de tiempo, la respuesta es un paquete de acceso; para evitar accesos en conflicto, son los paquetes o grupos incompatibles.",
  "check": [
   [
    "¿Qué debe ocurrir antes de poder incluir un sitio de SharePoint en un paquete de acceso?",
    "El sitio debe agregarse como recurso al catálogo del paquete de acceso."
   ],
   [
    "¿Qué configuración del paquete de acceso impide que un usuario que tiene el paquete A solicite el paquete B?",
    "La separación de funciones: enumerar el paquete A como paquete de acceso incompatible en la configuración del paquete B."
   ],
   [
    "Menciona dos opciones para el momento en que expira una asignación de paquete de acceso.",
    "Dos cualesquiera de estas: en una fecha específica, después de un número de días, después de un número de horas, o nunca."
   ]
  ]
 },
 {
  "t": "Connected organizations and access packages for external users",
  "tt": "Organizaciones conectadas y paquetes de acceso para usuarios externos",
  "body": [
   "Invitar invitados uno por uno funciona para unos pocos socios, pero no escala y suele dejar cuentas de invitados obsoletas. La administración de derechos ofrece una alternativa gobernada: los usuarios externos solicitan ellos mismos un paquete de acceso, los aprobadores deciden, y sus cuentas de invitado se crean al aprobarse y se limpian cuando termina el acceso.",
   "Una organización conectada (connected organization) representa a otra organización con la que colaboras. Puede identificarse por un tenant de Microsoft Entra, lo que abarca todos los dominios de ese tenant, o por un nombre de dominio, para usuarios que se autentican de otra forma, como con un código de acceso de un solo uso por correo o un proveedor de identidad SAML/WS-Fed. Cada organización conectada puede tener patrocinadores internos y externos, personas que actúan como contactos y que pueden usarse como aprobadores. Se crean en Identity Governance, Entitlement management, Connected organizations.",
   "Las organizaciones conectadas tienen un estado. Configured (configurada) significa que un administrador la creó deliberadamente, y los usuarios de ella pueden solicitar paquetes cuyas directivas incluyen todas las organizaciones conectadas configuradas. Proposed (propuesta) significa que se creó automáticamente cuando un usuario de una organización nueva solicitó un paquete, y se le aprobó, cuya directiva permite a todos los usuarios, incluidas las organizaciones aún no conectadas; las organizaciones propuestas no se incluyen en el ámbito de todas las organizaciones conectadas configuradas hasta que un administrador cambia su estado a Configured. Esta distinción te permite abrir un paquete a cualquiera sin dejar de controlar la lista de socios de confianza.",
   "En una directiva de paquete de acceso para usuarios externos, eliges For users not in your directory y luego una de estas opciones: organizaciones conectadas específicas, todas las organizaciones conectadas configuradas, o todos los usuarios (todas las organizaciones conectadas más cualquier usuario externo nuevo). Normalmente se exige aprobación para las solicitudes externas, a menudo por parte del patrocinador interno. Los usuarios externos solicitan acceso mediante el vínculo del portal My Access del paquete de acceso, que tú compartes con ellos; inician sesión con su propia identidad y, al aprobarse, Entra crea una cuenta de invitado B2B y la agrega a los recursos del paquete. La configuración de colaboración externa y la de acceso entre tenants deben seguir permitiendo a estos usuarios; de lo contrario, la solicitud fallará.",
   "La configuración del ciclo de vida de los usuarios externos se define en la página Settings de la administración de derechos. Cuando expira o se quita la última asignación de paquete de acceso de un usuario externo, puedes impedirle iniciar sesión en tu directorio y luego quitar su cuenta de invitado después de un número determinado de días. Esto se aplica solo a los invitados creados o administrados mediante la administración de derechos. Combinado con asignaciones que expiran y revisiones de acceso en la directiva, esto mantiene el acceso de los invitados ligado a una necesidad de negocio actual.",
   "Recuerda las licencias y el ámbito: los invitados se facturan mediante el modelo de usuarios activos mensuales de Microsoft Entra External ID, y las funciones de gobernanza que usa el tenant que invita requieren las licencias adecuadas de Microsoft Entra ID P2 o ID Governance."
  ],
  "terms": [
   [
    "Connected organization (organización conectada)",
    "Una organización externa, identificada por un tenant de Entra o un dominio, que puede solicitar paquetes de acceso."
   ],
   [
    "Configured state (estado configurado)",
    "Una organización conectada que un administrador creó o aprobó, incluida en el ámbito de todas las organizaciones conectadas configuradas."
   ],
   [
    "Proposed state (estado propuesto)",
    "Una organización conectada creada automáticamente después de una solicitud aprobada de una organización nueva."
   ],
   [
    "Sponsor (patrocinador)",
    "Un contacto interno o externo de una organización conectada que puede actuar como aprobador."
   ],
   [
    "External user lifecycle (ciclo de vida de usuarios externos)",
    "Configuración de la administración de derechos para bloquear y luego quitar a los invitados cuya última asignación termina."
   ]
  ],
  "example": "Contoso crea a Fabrikam como organización conectada usando el tenant de Fabrikam, con un patrocinador interno como aprobador. El personal de Fabrikam usa el vínculo de My Access para el paquete de acceso Joint Project; una vez aprobadas las solicitudes, las cuentas de invitado se crean automáticamente. Cuando expiran las asignaciones de 60 días, se impide a los invitados iniciar sesión y se les quita después del número de días configurado.",
  "tip": "Las organizaciones conectadas propuestas no se incluyen cuando una directiva se dirige a todas las organizaciones conectadas configuradas. Para que Entra limpie a los invitados automáticamente, configura el ciclo de vida de usuarios externos en la administración de derechos, que solo afecta a los invitados que llegaron por esa vía.",
  "check": [
   [
    "¿Qué hace que se cree una organización conectada en estado Proposed?",
    "Que un usuario de una organización aún no conectada solicite un paquete, y se le apruebe, cuya directiva permite a todos los usuarios, incluidas las organizaciones externas nuevas."
   ],
   [
    "¿Cómo solicitan los usuarios externos un paquete de acceso?",
    "Mediante el vínculo del portal My Access del paquete, que tú compartes con ellos; inician sesión con su propia identidad."
   ],
   [
    "¿Qué puede hacer la administración de derechos cuando termina la última asignación de un usuario externo?",
    "Impedir que el usuario inicie sesión y quitar la cuenta de invitado después de un número de días configurado."
   ]
  ]
 },
 {
  "t": "Access reviews: groups, apps, access packages and Entra roles; reviewers, recurrence, auto-apply and inactive-user recommendations",
  "tt": "Revisiones de acceso: grupos, aplicaciones, paquetes de acceso y roles de Entra; revisores, periodicidad, aplicación automática y recomendaciones sobre usuarios inactivos",
  "body": [
   "El acceso tiende a acumularse. Las personas cambian de rol y conservan membresías de grupo antiguas; los invitados terminan proyectos y nunca se van. Las revisiones de acceso (access reviews) permiten que las personas adecuadas confirmen periódicamente si cada usuario aún necesita acceso, y lo quiten si no es así. Forman parte de Microsoft Entra ID Governance y requieren licencias Microsoft Entra ID P2 o ID Governance para los usuarios cubiertos.",
   "Puedes revisar varios tipos de acceso. La membresía de grupos abarca grupos de seguridad y grupos de Microsoft 365, incluidos los de Teams, ya sea un grupo específico o todos los grupos de Microsoft 365 con usuarios invitados. El acceso a aplicaciones abarca a los usuarios asignados a una aplicación empresarial. Las asignaciones de paquetes de acceso pueden revisarse desde la directiva del paquete. Los roles privilegiados, tanto los roles de Microsoft Entra como los roles de recursos de Azure, se revisan mediante Privileged Identity Management. Puedes limitar una revisión solo a los usuarios invitados, lo que es una forma común de limpiar el acceso externo.",
   "Los revisores pueden ser los propietarios del grupo, usuarios o grupos seleccionados, los gerentes de los usuarios (con un revisor de respaldo cuando un usuario no tiene gerente) o los propios usuarios en una autorrevisión, en la que cada persona certifica su propia necesidad. Las revisiones de varias etapas encadenan etapas, como primero los gerentes y luego el propietario del recurso, y las etapas posteriores pueden ver las decisiones anteriores.",
   "La configuración incluye la duración (cuántos días tienen los revisores), la periodicidad (una vez, semanal, mensual, trimestral, semestral o anual) y una fecha de fin para la serie. La configuración al finalizar decide qué pasa después: Auto apply results to resource quita automáticamente a los usuarios denegados; si no, un administrador aplica los resultados manualmente. Si los revisores no responden, el resultado puede ser no hacer cambios, quitar el acceso, aprobar el acceso o aplicar las recomendaciones. Otras opciones incluyen exigir justificación, notificaciones por correo y recordatorios.",
   "Los asistentes de decisión facilitan las revisiones. Las recomendaciones sugieren aprobar o denegar según señales como si el usuario ha iniciado sesión recientemente, y la afiliación entre usuario y grupo, que marca a los usuarios cuya posición en la organización difiere de la de otros miembros. También puedes limitar una revisión solo a usuarios inactivos, incluyendo únicamente a los usuarios que no han iniciado sesión durante un número determinado de días, para que los revisores se concentren en el acceso probablemente obsoleto. Los revisores ven estas recomendaciones junto a cada usuario en el portal My Access o en el correo de la revisión.",
   "Los resultados y el historial se conservan para auditoría. Puedes descargar informes del historial de revisiones como evidencia de cumplimiento, y cada decisión se registra con el revisor y la justificación. Un diseño típico es una revisión trimestral de todos los grupos de Microsoft 365 con invitados, revisada por los propietarios de los grupos, con la aplicación automática activada y quitar el acceso si los revisores no responden."
  ],
  "terms": [
   [
    "Access review (revisión de acceso)",
    "Una campaña programada o única en la que los revisores aprueban o deniegan la continuidad del acceso."
   ],
   [
    "Self-review (autorrevisión)",
    "Una revisión de acceso en la que los usuarios certifican si aún necesitan su propio acceso."
   ],
   [
    "Auto apply results (aplicar resultados automáticamente)",
    "Una configuración al finalizar que quita automáticamente el acceso que los revisores denegaron."
   ],
   [
    "If reviewers don't respond (si los revisores no responden)",
    "La configuración que decide el resultado para los usuarios no revisados: sin cambios, quitar, aprobar o aplicar recomendaciones."
   ],
   [
    "Inactive-user recommendation (recomendación sobre usuarios inactivos)",
    "Un asistente de decisión que sugiere denegar a los usuarios que no han iniciado sesión dentro de un período definido."
   ]
  ],
  "example": "Contoso encuentra 800 invitados en Teams de proyectos terminados hace tiempo. Crea una revisión de acceso trimestral de todos los grupos de Microsoft 365 con usuarios invitados, revisada por los propietarios de los grupos, con las recomendaciones habilitadas, la aplicación automática de resultados activada y quitar el acceso si los revisores no responden. Después del primer ciclo, más de la mitad de los invitados se quitan automáticamente.",
  "tip": "La aplicación automática solo actúa sobre las decisiones; la configuración If reviewers don't respond decide qué pasa con los usuarios que nadie revisó. Las revisiones de roles de Entra y de roles de recursos de Azure se crean mediante PIM.",
  "check": [
   [
    "¿Dónde creas revisiones de acceso para los roles de Microsoft Entra?",
    "En Privileged Identity Management, que gestiona las revisiones de roles de Entra y de roles de recursos de Azure."
   ],
   [
    "¿Qué configuración quita a los usuarios denegados sin que un administrador tenga que actuar?",
    "Auto apply results to resource."
   ],
   [
    "¿Qué asistente de decisión sugiere denegar el acceso a alguien que no ha iniciado sesión recientemente?",
    "La recomendación sobre usuarios inactivos (sin inicio de sesión dentro de un número determinado de días)."
   ]
  ]
 },
 {
  "t": "Lifecycle workflows for joiner, mover and leaver tasks (employeeHireDate, employeeLeaveDateTime)",
  "tt": "Flujos de trabajo del ciclo de vida para tareas de ingreso, cambio y salida (employeeHireDate, employeeLeaveDateTime)",
  "body": [
   "Los procesos de ingreso, cambio y salida (joiner, mover, leaver, JML) son los momentos en que ocurren los errores del ciclo de vida de las identidades: nuevos empleados sin acceso en su primer día, personas que cambian de puesto y conservan accesos antiguos, personas que se van cuyas cuentas siguen activas. Los flujos de trabajo del ciclo de vida (lifecycle workflows), una función de Microsoft Entra ID Governance, automatizan las tareas en torno a estos momentos dentro de Entra ID.",
   "Un flujo de trabajo tiene tres partes. El desencadenador decide cuándo se ejecuta: lo más común es un desencadenador de atributo basado en el tiempo, que usa un atributo de fecha más un desplazamiento en días, como siete días antes de employeeHireDate o en la fecha de employeeLeaveDateTime; otros desencadenadores incluyen los cambios de atributos (para las personas que cambian de puesto) y los cambios de membresía de grupos. Las condiciones de ejecución, o ámbito, deciden a quién: una regla como department igual a Sales, o todos los usuarios. Las tareas deciden qué: una lista ordenada de acciones integradas.",
   "Microsoft ofrece plantillas para escenarios comunes: incorporar a un empleado antes de su ingreso, incorporar a un nuevo empleado, posincorporación, terminación de un empleado en tiempo real, preparación de la salida, dar de baja a un empleado en su último día y posterior a la salida. Las tareas integradas incluyen generar un Temporary Access Pass y enviarlo al gerente del usuario, enviar un correo de bienvenida, agregar al usuario a grupos o equipos de Teams, habilitar o deshabilitar la cuenta, quitar al usuario de todos los grupos o equipos de Teams, quitar todas las licencias, ejecutar una extensión de tarea personalizada y eliminar al usuario. Las extensiones de tarea personalizadas llaman a Azure Logic Apps, lo que permite que un flujo de trabajo llegue a sistemas fuera de Entra, como crear un ticket o notificar a Recursos Humanos.",
   "Los atributos importan. employeeHireDate es la fecha de inicio del usuario, y employeeLeaveDateTime es la fecha y hora en que el usuario se va. Pueden establecerse mediante el aprovisionamiento entrante impulsado por Recursos Humanos (por ejemplo, desde Workday o SuccessFactors), mediante la sincronización desde el AD local con un atributo asignado, o mediante Microsoft Graph. employeeLeaveDateTime es sensible, porque cambiarlo puede desencadenar un flujo de trabajo de salida; establecerlo mediante Graph requiere un permiso específico del ciclo de vida además de los permisos normales de escritura de usuarios. Las fechas se almacenan en UTC, así que hay que tener en cuenta las zonas horarias al elegir los desplazamientos.",
   "Los flujos de trabajo se ejecutan según una programación, cada pocas horas de forma predeterminada y ajustable en la configuración de los flujos de trabajo del ciclo de vida, y también pueden ejecutarse a petición para usuarios seleccionados a modo de prueba. Cada ejecución registra los resultados por usuario y por tarea, que puedes ver en el historial del flujo de trabajo. Un flujo de trabajo nuevo puede crearse con su programación desactivada para que puedas probarlo a petición antes de habilitarlo.",
   "Los flujos de trabajo del ciclo de vida gestionan tareas dentro de Entra; complementan, no reemplazan, el aprovisionamiento impulsado por Recursos Humanos, que crea y actualiza cuentas, y la administración de derechos, que concede paquetes de acceso. Juntos ofrecen un proceso desde la contratación hasta el retiro con un mínimo de esfuerzo manual."
  ],
  "terms": [
   [
    "Lifecycle workflow (flujo de trabajo del ciclo de vida)",
    "Un conjunto automatizado de tareas en Entra ID desencadenado por eventos de ingreso, cambio o salida."
   ],
   [
    "employeeHireDate",
    "El atributo del usuario que contiene la fecha de inicio; se usa para desencadenar flujos de trabajo de incorporación."
   ],
   [
    "employeeLeaveDateTime",
    "El atributo del usuario que contiene la fecha y hora de salida; se usa para desencadenar flujos de trabajo de baja."
   ],
   [
    "Execution conditions (condiciones de ejecución)",
    "La regla de ámbito que determina a qué usuarios se aplica un flujo de trabajo del ciclo de vida."
   ],
   [
    "Custom task extension (extensión de tarea personalizada)",
    "Una tarea del flujo de trabajo que llama a una Azure Logic App para realizar acciones fuera de las tareas integradas."
   ]
  ],
  "example": "El aprovisionamiento de Recursos Humanos establece el employeeHireDate de una nueva ingeniera en el día 1 del mes siguiente. Un flujo de trabajo previo al ingreso se ejecuta siete días antes y genera un Temporary Access Pass que se envía por correo a su gerente; en su fecha de inicio, un flujo de trabajo de incorporación habilita la cuenta, envía un correo de bienvenida y la agrega a los grupos de Engineering. Cuando llega su employeeLeaveDateTime dos años después, un flujo de trabajo de baja la deshabilita, quita grupos y licencias, y elimina la cuenta 30 días después.",
  "tip": "Los desencadenadores basados en el tiempo usan un atributo de fecha más un desplazamiento. La incorporación va con employeeHireDate, la baja con employeeLeaveDateTime, y establecer employeeLeaveDateTime requiere un permiso especial. Los flujos de trabajo del ciclo de vida necesitan licencias Microsoft Entra ID Governance.",
  "check": [
   [
    "¿Qué atributo desencadenaría un flujo de trabajo que se ejecuta el último día de un empleado?",
    "employeeLeaveDateTime, con un desplazamiento de cero días."
   ],
   [
    "¿Cómo puede un flujo de trabajo del ciclo de vida realizar una acción en un sistema fuera de Entra ID?",
    "Usando una extensión de tarea personalizada que llama a una Azure Logic App."
   ],
   [
    "¿Qué tarea le daría a un nuevo empleado una forma de configurar el inicio de sesión sin contraseña desde el primer día?",
    "Generar un Temporary Access Pass y enviarlo al gerente del usuario."
   ]
  ]
 },
 {
  "t": "Terms of use and Conditional Access",
  "tt": "Términos de uso y Conditional Access",
  "body": [
   "Las organizaciones a menudo necesitan que los usuarios acepten términos legales antes de acceder a los recursos: una política de uso aceptable para los empleados, un acuerdo de confidencialidad para los invitados o un aviso regulatorio. Los términos de uso (terms of use) de Microsoft Entra presentan esos documentos al iniciar sesión, registran quién aceptó qué versión y cuándo, y exigen la aceptación mediante Conditional Access. Requieren Microsoft Entra ID P1.",
   "Los términos de uso se crean en Conditional Access, Terms of use. Cada objeto de términos de uso contiene uno o más documentos PDF, con un idioma predeterminado e idiomas adicionales opcionales; los usuarios ven la versión que coincide con el idioma de su navegador. La configuración incluye: Require users to expand the terms of use, que los obliga a abrir el documento antes de aceptarlo; Require users to consent on every device, que registra la aceptación por dispositivo (esto requiere que el dispositivo esté registrado, y algunas plataformas tienen limitaciones); Expire consents, que hace que todos vuelvan a aceptar según una programación a partir de una fecha elegida, por ejemplo cada año; y Duration before re-acceptance required, que cuenta los días desde la aceptación de cada usuario.",
   "Los términos de uso no hacen nada por sí solos. Los aplicas creando una directiva de Conditional Access cuyo control de concesión incluya los términos de uso que creaste. Las asignaciones de la directiva deciden quién debe aceptar y para qué aplicaciones, por ejemplo todos los usuarios invitados que acceden a todas las aplicaciones en la nube, o todos los empleados que acceden a la aplicación de Recursos Humanos. Cuando se aplica la directiva, los usuarios ven el documento después de iniciar sesión y deben aceptarlo para continuar; rechazarlo bloquea el acceso. Puedes crear la directiva directamente desde la página de términos de uso o agregar los términos como control de concesión en cualquier directiva de Conditional Access, combinados con otros controles como la MFA.",
   "Los informes y la auditoría vienen integrados. Cada objeto de términos de uso muestra el número de usuarios que aceptaron y rechazaron, y puedes ver los detalles de cada usuario, incluida la versión y la hora de aceptación. Las aceptaciones y los rechazos se registran en el registro de auditoría, lo cual es útil cuando los equipos legales necesitan pruebas. Los usuarios pueden revisar los términos que aceptaron desde su portal de cuenta.",
   "La actualización de los términos se gestiona con versiones. Cuando cargas una nueva versión del PDF, puedes elegir si se exige volver a aceptarlo; si lo haces, todos deben aceptar la nueva versión en su siguiente inicio de sesión. No se permite eliminar un objeto de términos de uso al que todavía hace referencia una directiva de Conditional Access hasta que la directiva deje de usarlo.",
   "Un diseño común es un NDA para invitados: un objeto de términos de uso con el PDF del NDA, la vista expandida obligatoria y una directiva de Conditional Access dirigida a los usuarios invitados y externos para todas las aplicaciones en la nube, de modo que ningún socio pueda acceder a nada sin aceptarlo."
  ],
  "terms": [
   [
    "Terms of use (términos de uso)",
    "Una función de Entra que presenta documentos PDF que los usuarios deben aceptar, aplicada mediante Conditional Access."
   ],
   [
    "Require users to expand (exigir que los usuarios expandan)",
    "Una configuración de los términos de uso que obliga a los usuarios a abrir el documento antes de poder aceptarlo."
   ],
   [
    "Expire consents (expirar consentimientos)",
    "Una configuración que exige a todos los usuarios volver a aceptar según una programación periódica a partir de una fecha de inicio."
   ],
   [
    "Duration before re-acceptance (duración antes de volver a aceptar)",
    "Una configuración que exige a cada usuario volver a aceptar un número determinado de días después de su propia aceptación."
   ],
   [
    "Terms of use grant control (control de concesión de términos de uso)",
    "La opción de concesión de Conditional Access que exige aceptar unos términos de uso específicos."
   ]
  ],
  "example": "Una empresa farmacéutica exige que todos los invitados acepten un acuerdo de confidencialidad. El administrador carga el PDF del acuerdo en inglés y alemán, exige que los usuarios lo expandan y configura los consentimientos para que expiren cada año. Una directiva de Conditional Access dirigida a los usuarios invitados y externos para todas las aplicaciones en la nube concede el acceso solo con los términos aceptados, y el equipo legal exporta el informe de aceptación cada trimestre.",
  "tip": "Los términos de uso solo se aplican mediante un control de concesión de Conditional Access, así que si no se está solicitando la aceptación, revisa las asignaciones de la directiva. Expire consents reinicia a todos según una programación; la duración antes de volver a aceptar es por usuario, a partir de su propia fecha de aceptación.",
  "check": [
   [
    "¿Cómo obligas a los usuarios a aceptar los términos de uso antes de acceder a una aplicación?",
    "Creando una directiva de Conditional Access para esos usuarios y esa aplicación cuyo control de concesión exija los términos de uso."
   ],
   [
    "¿Qué configuración garantiza que los usuarios realmente abran el documento antes de aceptarlo?",
    "Require users to expand the terms of use."
   ],
   [
    "¿Dónde puedes demostrar cuándo aceptó los términos un usuario específico?",
    "En los detalles de aceptación de los términos de uso y en el registro de auditoría."
   ]
  ]
 },
 {
  "t": "Privileged Identity Management (PIM): eligible vs active assignments, activation settings, approval, alerts",
  "tt": "Privileged Identity Management (PIM): asignaciones elegibles frente a activas, configuración de activación, aprobación y alertas",
  "body": [
   "El privilegio permanente, en el que los administradores tienen roles poderosos todo el tiempo, significa que cualquier compromiso de una cuenta de administrador le da de inmediato esos poderes a un atacante. Microsoft Entra Privileged Identity Management (PIM) reduce ese riesgo con acceso justo a tiempo (just-in-time): los administradores tienen los roles solo cuando los necesitan, por un tiempo limitado y con controles en el camino. PIM requiere licencias Microsoft Entra ID P2 o Microsoft Entra ID Governance para los usuarios que se benefician de él.",
   "La distinción central es entre asignaciones elegibles y activas. Una asignación elegible (eligible) significa que el usuario puede activar el rol cuando lo necesite, pero no tiene sus permisos hasta que lo hace. Una asignación activa (active) significa que el usuario tiene los permisos del rol ahora mismo, sin activación. Ambos tipos pueden ser permanentes o con límite de tiempo, con una fecha de inicio y de fin. El patrón recomendado es usar asignaciones elegibles con límite de tiempo para la mayoría de los administradores, y reservar las asignaciones activas permanentes para las cuentas de acceso de emergencia.",
   "La activación es el paso justo a tiempo. El usuario abre PIM, selecciona My roles, elige el rol elegible y lo activa, proporcionando lo que exija la configuración del rol. La configuración de roles, definida por rol, incluye: la duración máxima de activación (entre 1 y 24 horas); exigir autenticación multifactor o un contexto de autenticación de Conditional Access al activar, lo que te permite exigir MFA resistente al phishing para los roles sensibles; exigir justificación; exigir información de ticket, como un número de solicitud de cambio; y exigir aprobación para activar, con aprobadores seleccionados. La configuración también controla las reglas de asignación, como si se permiten asignaciones elegibles o activas permanentes y la duración máxima de la asignación, y las notificaciones enviadas a administradores, asignados y aprobadores cuando se asignan o activan roles.",
   "La aprobación agrega a una segunda persona. Cuando un rol requiere aprobación, la solicitud de activación va a los aprobadores configurados, que la aprueban o deniegan con una justificación en la página Approve requests de PIM. Los aprobadores no necesitan tener el rol. Hasta que alguien aprueba, el usuario no tiene el rol, así que planifica la disponibilidad de los aprobadores. Los usuarios también pueden solicitar extender una asignación que está por expirar, o renovar una expirada, lo que debe aprobar un administrador.",
   "Las alertas de PIM destacan configuraciones riesgosas: demasiados Global Administrators, roles asignados fuera de PIM, roles que no exigen MFA para activarse, administradores que no usan sus roles privilegiados y posibles cuentas obsoletas en roles privilegiados. Cada alerta explica el riesgo y la solución. PIM también conserva un historial de auditoría de asignaciones y activaciones, y puedes ejecutar revisiones de acceso de las asignaciones de roles desde PIM.",
   "Administrar el propio PIM requiere el rol Privileged Role Administrator o Global Administrator. En un tenant maduro, la mayor parte del trabajo de administración se hace mediante activaciones cortas registradas en PIM, y el número de personas con roles privilegiados activos en cualquier momento es cercano a cero."
  ],
  "terms": [
   [
    "Privileged Identity Management",
    "Un servicio de Entra que proporciona acceso a roles privilegiados justo a tiempo, con límite de tiempo y basado en aprobación."
   ],
   [
    "Eligible assignment (asignación elegible)",
    "Una asignación de rol que el usuario debe activar antes de obtener los permisos del rol."
   ],
   [
    "Active assignment (asignación activa)",
    "Una asignación de rol que concede los permisos de inmediato, sin activación."
   ],
   [
    "Activation (activación)",
    "El paso justo a tiempo en el que un usuario elegible activa un rol por una duración limitada, cumpliendo los controles exigidos."
   ],
   [
    "PIM alert (alerta de PIM)",
    "Una advertencia sobre una configuración riesgosa del acceso privilegiado, como tener demasiados Global Administrators."
   ]
  ],
  "example": "Contoso hace que todos los Exchange Administrators sean elegibles en lugar de activos. La activación dura hasta cuatro horas y exige MFA, justificación y un número de ticket. Para Global Administrator, la activación también exige la aprobación del líder de seguridad. Cuando un administrador activa el rol de Exchange para resolver un problema de un buzón, el equipo de seguridad recibe una notificación, y el rol expira automáticamente al final del período.",
  "tip": "Elegible significa que debe activarse; activa significa que ya lo tiene. Configuraciones como MFA, justificación, ticket y aprobación se aplican en la activación y se definen por rol. La duración máxima de activación es de 1 a 24 horas.",
  "check": [
   [
    "¿Cuál es la diferencia entre una asignación de rol elegible y una activa en PIM?",
    "La elegible requiere que el usuario active el rol antes de usarlo; la activa concede los permisos de inmediato."
   ],
   [
    "¿Dónde configuras que el rol Security Administrator requiera aprobación para activarse?",
    "En PIM, en la configuración del rol Security Administrator, habilitando Require approval to activate y eligiendo los aprobadores."
   ],
   [
    "Menciona dos alertas de PIM.",
    "Dos cualesquiera de estas: demasiados Global Administrators, roles asignados fuera de PIM, roles que no exigen MFA para activarse, administradores que no usan sus roles privilegiados, posibles cuentas obsoletas en roles privilegiados."
   ]
  ]
 },
 {
  "t": "PIM for Groups and PIM for Azure resource roles",
  "tt": "PIM for Groups y PIM para roles de recursos de Azure",
  "body": [
   "Privileged Identity Management no se limita a los roles de Microsoft Entra. Otros dos ámbitos usan el mismo modelo de elegible y activo: PIM for Groups, que hace que la membresía o propiedad de un grupo sea justo a tiempo, y PIM for Azure resources, que hace lo mismo con los roles de Azure RBAC en suscripciones y recursos.",
   "PIM for Groups te permite hacer que un usuario sea miembro elegible o propietario elegible de un grupo, de modo que solo se une al grupo cuando lo activa. Como los grupos pueden llevar muchas cosas, como una asignación de rol de Microsoft Entra (en los grupos asignables a roles), roles de Azure RBAC, asignaciones de aplicaciones o acceso a datos, la membresía justo a tiempo se convierte en acceso justo a tiempo a todos ellos a la vez. Los grupos admitidos son los grupos de seguridad y los grupos de Microsoft 365; no se admiten los grupos dinámicos ni los grupos sincronizados desde Active Directory local, porque su membresía la controlan reglas o el directorio de origen. Los grupos asignables a roles son el caso común para agrupar varios roles de Entra: crea un grupo asignable a roles que tenga, por ejemplo, Exchange Administrator y Teams Administrator, y luego haz que los administradores sean miembros elegibles de él.",
   "Habilitas un grupo para PIM desde la página Privileged Identity Management del grupo o desde PIM, Groups. Miembro y propietario tienen configuraciones de rol separadas, así que puedes exigir aprobación para la membresía pero no para la propiedad. La configuración de activación es igual a la de PIM para roles: duración máxima, MFA o contexto de autenticación, justificación, información de ticket, aprobación y notificaciones. Los usuarios activan desde My roles, Groups. Cuando un grupo administrado por PIM se usa para roles de Entra, protégelo: solo los Privileged Role Administrators, los Global Administrators y los propietarios del grupo pueden administrar la membresía de un grupo asignable a roles, lo que impide una escalada de privilegios fácil.",
   "PIM for Azure resources abarca roles de Azure RBAC como Owner, Contributor, User Access Administrator y cualquier rol personalizado, en el ámbito de grupo de administración, suscripción, grupo de recursos o recurso. Antes de poder administrar un recurso en PIM, este debe detectarse e incorporarse (discovery and onboarding), lo que se hace desde PIM, Azure resources, por alguien con permiso para administrar las asignaciones de roles en él. Una vez incorporado, conviertes las asignaciones permanentes en elegibles, configuras los roles por rol en ese ámbito y usas la misma activación, aprobación y alertas. Las asignaciones se heredan hacia abajo en la jerarquía de Azure, así que un Owner elegible en una suscripción puede administrar todos los grupos de recursos que contiene después de activarse.",
   "Las revisiones de acceso también pueden dirigirse a grupos administrados por PIM y a roles de recursos de Azure, y el historial de auditoría de PIM registra cada asignación y activación. Elige el ámbito correcto en las preguntas de escenarios: rol de Entra para la administración del directorio, PIM for Groups cuando el acceso proviene de la membresía, y PIM for Azure resources para la administración de suscripciones y recursos."
  ],
  "terms": [
   [
    "PIM for Groups",
    "Membresía o propiedad elegible justo a tiempo en grupos de seguridad o de Microsoft 365."
   ],
   [
    "PIM for Azure resources",
    "Asignación elegible justo a tiempo de roles de Azure RBAC en el ámbito de grupo de administración, suscripción, grupo de recursos o recurso."
   ],
   [
    "Discovery and onboarding (detección e incorporación)",
    "El paso que pone las suscripciones o recursos de Azure bajo la administración de PIM."
   ],
   [
    "Eligible member (miembro elegible)",
    "Un usuario que puede activar la membresía de un grupo por un tiempo limitado mediante PIM."
   ],
   [
    "Role inheritance (herencia de roles)",
    "Comportamiento de Azure RBAC en el que un rol asignado en un ámbito superior se aplica a todos los ámbitos secundarios."
   ]
  ],
  "example": "El equipo de nube de Contoso necesita Owner en la suscripción de producción solo durante los cambios. El administrador incorpora la suscripción a PIM y convierte al equipo en Owners elegibles que requieren aprobación y un número de ticket. Por separado, un grupo asignable a roles que tiene Exchange Administrator y Teams Administrator se habilita para PIM, y los administradores de mensajería se convierten en miembros elegibles, activando ambos roles con una sola solicitud.",
  "tip": "PIM for Groups no admite grupos dinámicos ni grupos sincronizados desde el entorno local. Los recursos de Azure deben detectarse antes de poder administrarse en PIM. Owner y User Access Administrator son los roles de Azure que más vale la pena hacer elegibles.",
  "check": [
   [
    "¿Puedes habilitar PIM para un grupo de membresía dinámica?",
    "No. PIM for Groups no admite grupos dinámicos ni grupos sincronizados desde el AD local."
   ],
   [
    "¿Qué debes hacer antes de crear asignaciones elegibles para una suscripción en PIM?",
    "Detectar e incorporar la suscripción (o el recurso) en PIM for Azure resources."
   ],
   [
    "¿Cómo puede una sola activación conceder varios roles de Entra a la vez?",
    "Asignando los roles a un grupo asignable a roles y haciendo que el usuario sea miembro elegible de ese grupo con PIM for Groups."
   ]
  ]
 },
 {
  "t": "Sign-in, audit and provisioning logs; default retention and diagnostic settings to Log Analytics, storage or Event Hubs",
  "tt": "Registros de inicio de sesión, auditoría y aprovisionamiento; retención predeterminada y configuración de diagnóstico hacia Log Analytics, almacenamiento o Event Hubs",
  "body": [
   "Microsoft Entra ID registra tres tipos principales de registros de actividad, y saber qué registro responde a qué pregunta ahorra tiempo en el examen y en incidentes reales. Los registros de inicio de sesión responden quién inició sesión, en qué, desde dónde, cómo y con qué resultado. Los registros de auditoría responden quién cambió qué en el directorio. Los registros de aprovisionamiento responden qué creó, actualizó o eliminó el servicio de aprovisionamiento en los sistemas de destino.",
   "Los registros de inicio de sesión se dividen en inicios de sesión interactivos de usuarios, en los que el usuario proporcionó un factor como una contraseña o MFA; inicios de sesión no interactivos de usuarios, que realizan los clientes en nombre del usuario mediante tokens de actualización; inicios de sesión de entidades de servicio, en los que las aplicaciones se autentican con sus propias credenciales; e inicios de sesión de identidades administradas. Cada entrada incluye el usuario, la aplicación, la dirección IP, la ubicación, el dispositivo, los detalles de autenticación, los resultados de Conditional Access y los códigos de error.",
   "Los registros de auditoría guardan los cambios por servicio y categoría: administración de usuarios y grupos, asignaciones de roles, cambios en aplicaciones, actualizaciones de directivas, restablecimientos de contraseña y más. Cada entrada muestra la actividad, el iniciador (usuario o aplicación), el destino y las propiedades modificadas con sus valores anteriores y nuevos. Los registros de aprovisionamiento guardan las acciones del aprovisionamiento automático de aplicaciones, del aprovisionamiento entrante desde Recursos Humanos y de la sincronización entre tenants, con detalles paso a paso de la coincidencia, la acción y el resultado.",
   "La retención en el centro de administración es limitada. Con la edición gratuita, los informes de actividad se conservan durante 7 días. Con Microsoft Entra ID P1 o P2, los registros de inicio de sesión y de auditoría se conservan durante 30 días. Si necesitas un historial más largo, correlación con otros datos o alertas, debes exportar los registros tú mismo, y exportar los registros de inicio de sesión requiere una licencia P1 o P2.",
   "La exportación se configura en Monitoring, Diagnostic settings. Una configuración de diagnóstico selecciona categorías de registro, como AuditLogs, SignInLogs, NonInteractiveUserSignInLogs, ServicePrincipalSignInLogs, ManagedIdentitySignInLogs, ProvisioningLogs, RiskyUsers y UserRiskEvents, y uno o más destinos. Un área de trabajo de Log Analytics se usa para consultas KQL, libros de trabajo y reglas de alerta, y es la base de Microsoft Sentinel. Una cuenta de almacenamiento de Azure ofrece archivado a largo plazo de bajo costo, útil para la retención por cumplimiento. Un Event Hub transmite los registros casi en tiempo real a un SIEM de terceros u otro consumidor. También está disponible un destino de solución de socio. Puedes crear varias configuraciones de diagnóstico para enviar distintas categorías a distintos lugares, por ejemplo todo al almacenamiento durante un año y los inicios de sesión a Log Analytics para análisis.",
   "Configurar las opciones de diagnóstico requiere el rol Security Administrator o Global Administrator en Entra, además de permisos sobre el recurso de Azure de destino. La retención en el destino se controla allí, por ejemplo con la configuración de retención del área de trabajo de Log Analytics. Las API de Microsoft Graph también exponen estos registros, lo cual es útil para informes mediante scripts."
  ],
  "terms": [
   [
    "Sign-in logs (registros de inicio de sesión)",
    "Registros de eventos de autenticación, divididos en inicios de sesión interactivos, no interactivos, de entidades de servicio y de identidades administradas."
   ],
   [
    "Audit logs (registros de auditoría)",
    "Registros de cambios en el directorio que muestran la actividad, el iniciador, el destino y las propiedades modificadas."
   ],
   [
    "Provisioning logs (registros de aprovisionamiento)",
    "Registros de las acciones que realizan los servicios de aprovisionamiento en los sistemas de destino."
   ],
   [
    "Diagnostic setting (configuración de diagnóstico)",
    "Una configuración que exporta categorías seleccionadas de registros de Entra a Log Analytics, almacenamiento, Event Hubs o un socio."
   ],
   [
    "Event Hub",
    "Un servicio de streaming de Azure que se usa para reenviar registros casi en tiempo real a herramientas SIEM externas."
   ]
  ],
  "example": "Los auditores piden a Contoso conservar los registros de identidad durante dos años, y el equipo de seguridad usa un SIEM de terceros. El administrador crea una configuración de diagnóstico que envía la auditoría y todas las categorías de inicio de sesión a una cuenta de almacenamiento con una directiva de ciclo de vida de dos años, y una segunda configuración que transmite los registros de inicio de sesión y de riesgo a un Event Hub que consume el SIEM. Un área de trabajo de Log Analytics recibe los inicios de sesión para los libros de trabajo.",
  "tip": "Retención predeterminada: 7 días en la edición gratuita, 30 días con P1/P2. Archivado a largo plazo significa cuenta de almacenamiento; streaming a un SIEM significa Event Hub; KQL, libros de trabajo y alertas significan Log Analytics. Los inicios de sesión no interactivos son una categoría aparte que debes seleccionar explícitamente.",
  "check": [
   [
    "¿Durante cuánto tiempo se conservan los registros de inicio de sesión y de auditoría en el portal para un tenant con Entra ID P1?",
    "30 días (7 días para los tenants gratuitos)."
   ],
   [
    "¿Qué destino de configuración de diagnóstico debes elegir para transmitir registros a un SIEM de terceros?",
    "Un Azure Event Hub (o una solución de socio compatible)."
   ],
   [
    "¿Qué registro mostraría quién quitó a un usuario de un grupo?",
    "El registro de auditoría, que guarda los cambios en el directorio con el iniciador y el destino."
   ]
  ]
 },
 {
  "t": "Workbooks, KQL queries in Log Analytics, Identity Secure Score and Microsoft Entra recommendations",
  "tt": "Libros de trabajo, consultas KQL en Log Analytics, Identity Secure Score y recomendaciones de Microsoft Entra",
  "body": [
   "Una vez que los registros de identidad llegan a un área de trabajo de Log Analytics, puedes analizarlos con libros de trabajo (workbooks) y con Kusto Query Language (KQL); además, Microsoft ofrece dos herramientas de orientación integradas, Identity Secure Score y las recomendaciones de Microsoft Entra, que te dicen qué mejorar.",
   "Los libros de trabajo son informes interactivos basados en datos de Log Analytics, disponibles en Monitoring, Workbooks, en el Centro de administración de Entra. Microsoft ofrece plantillas como Conditional Access insights and reporting (el impacto de las directivas, incluidas las de report-only), Sign-ins using legacy authentication (quién todavía usa protocolos que planeas bloquear), Authentication prompts analysis, Sensitive operations report y el estado de los inicios de sesión de aplicaciones. Puedes filtrar por tiempo, usuario y aplicación, y personalizarlos o guardar copias. Los libros de trabajo requieren que los registros correspondientes se envíen a un área de trabajo mediante la configuración de diagnóstico.",
   "Las consultas KQL van más allá. Las tablas incluyen SigninLogs, AADNonInteractiveUserSignInLogs, AADServicePrincipalSignInLogs, AuditLogs y otras. Una consulta empieza con una tabla y la pasa por operadores como where, summarize, project y order by. Este ejemplo cuenta los inicios de sesión fallidos por usuario en el último día:",
   "```kusto\nSigninLogs\n| where TimeGenerated > ago(1d)\n| where ResultType != \"0\"\n| summarize Failures = count() by UserPrincipalName, ResultType\n| order by Failures desc\n```",
   "En SigninLogs, un ResultType de 0 significa éxito; los demás valores son códigos de error. A partir de una consulta guardada puedes crear una regla de alerta de Azure Monitor, por ejemplo una alerta cuando una cuenta break-glass aparece en SigninLogs, o cuando un evento de auditoría muestra credenciales agregadas a una aplicación.",
   "Identity Secure Score es un porcentaje que mide qué tanto sigue tu tenant las recomendaciones de seguridad de identidad de Microsoft. Enumera acciones de mejora, como exigir MFA para los roles administrativos, bloquear la autenticación heredada, habilitar directivas de riesgo de usuario o tener menos de cinco Global Administrators, cada una con su impacto máximo en la puntuación, el progreso actual y una guía de implementación. Puedes compararte con organizaciones similares y seguir el historial. Algunas acciones pueden marcarse como resueltas mediante un tercero o aceptadas como riesgo, lo que cambia cómo cuentan.",
   "Las recomendaciones de Microsoft Entra son un canal relacionado de acciones específicas y adaptadas a tu tenant, con una prioridad, un estado (Active, Completed, Dismissed o Postponed), los recursos afectados y los pasos de corrección. Algunos ejemplos son quitar aplicaciones sin uso, renovar credenciales que están por expirar, migrar aplicaciones fuera de bibliotecas de autenticación heredadas y convertir la MFA por usuario en Conditional Access. Las recomendaciones se actualizan a medida que cambia tu tenant, y las relacionadas con la puntuación de seguridad la alimentan. Usa ambas como una lista de tareas priorizada y no como una lista de verificación de una sola vez."
  ],
  "terms": [
   [
    "Workbook (libro de trabajo)",
    "Un informe interactivo y personalizable basado en datos de Log Analytics, con plantillas de Entra para escenarios comunes."
   ],
   [
    "KQL",
    "Kusto Query Language, que se usa para consultar tablas de Log Analytics como SigninLogs y AuditLogs."
   ],
   [
    "SigninLogs",
    "La tabla de Log Analytics que contiene los eventos de inicio de sesión interactivo de usuarios exportados desde Entra ID."
   ],
   [
    "Identity Secure Score (puntuación de seguridad de identidad)",
    "Un porcentaje que mide la alineación con las prácticas recomendadas de seguridad de identidad de Microsoft, con acciones de mejora."
   ],
   [
    "Microsoft Entra recommendations (recomendaciones de Microsoft Entra)",
    "Acciones priorizadas y específicas del tenant, con seguimiento de estado y recursos afectados."
   ]
  ],
  "example": "Antes de bloquear la autenticación heredada, el administrador abre el libro de trabajo Sign-ins using legacy authentication y descubre que dos impresoras y una aplicación de línea de negocio todavía usan autenticación básica SMTP. Después de corregirlas y habilitar la directiva de bloqueo, Identity Secure Score sube y la acción de mejora relacionada aparece como completada. Una alerta KQL vigila SigninLogs en busca de cualquier inicio de sesión break-glass.",
  "tip": "Los libros de trabajo y KQL necesitan que los registros estén en un área de trabajo de Log Analytics mediante la configuración de diagnóstico. En SigninLogs, un ResultType de 0 significa éxito. Identity Secure Score mide la postura como porcentaje; las recomendaciones enumeran correcciones concretas con estados que puedes posponer o descartar.",
  "check": [
   [
    "¿Qué debe configurarse antes de que los libros de trabajo de Entra puedan mostrar datos de inicio de sesión?",
    "Una configuración de diagnóstico que envíe los registros de inicio de sesión a un área de trabajo de Log Analytics."
   ],
   [
    "En una consulta KQL sobre SigninLogs, ¿cómo filtras los inicios de sesión fallidos?",
    "Usando where ResultType != \"0\", porque 0 indica éxito."
   ],
   [
    "Menciona dos acciones de mejora de Identity Secure Score.",
    "Por ejemplo: exigir MFA para los roles administrativos, bloquear la autenticación heredada, habilitar directivas de riesgo de usuario o de inicio de sesión, o designar menos de cinco Global Administrators."
   ]
  ]
 },
 {
  "t": "Licensing: Microsoft Entra ID P1, P2 and Microsoft Entra ID Governance features",
  "tt": "Licencias: funciones de Microsoft Entra ID P1, P2 y Microsoft Entra ID Governance",
  "body": [
   "Muchas preguntas de SC-300 dependen de las licencias: una función encaja en el escenario, pero solo si el tenant tiene el plan correcto. Microsoft Entra ID viene en una edición Free y en las ediciones de pago P1 y P2, con Microsoft Entra ID Governance como complemento, y otros productos como Workload ID Premium y Global Secure Access que se licencian por separado. Los precios y paquetes cambian, así que concéntrate en qué funciones pertenecen a qué nivel.",
   "Microsoft Entra ID Free se incluye con suscripciones en la nube de Microsoft como Microsoft 365 y Azure. Ofrece administración de usuarios y grupos, sincronización de directorios con Entra Connect o Cloud Sync, inicio de sesión único en aplicaciones SaaS, informes de seguridad básicos, security defaults, cambio de contraseña de autoservicio para usuarios de la nube y colaboración B2B. No incluye Conditional Access.",
   "Microsoft Entra ID P1 agrega las funciones empresariales principales: Conditional Access (incluidos los términos de uso y las ubicaciones con nombre), grupos dinámicos, licencias basadas en grupos, restablecimiento de contraseña de autoservicio con escritura diferida al entorno local, application proxy, Microsoft Entra Connect Health, roles de administrador personalizados, unidades administrativas, listas personalizadas de contraseñas prohibidas y protección de contraseñas local, personalización de marca de la empresa y exportación de los registros de inicio de sesión a destinos de diagnóstico con retención de 30 días en el portal. P1 está incluido en Microsoft 365 E3 y Business Premium.",
   "Microsoft Entra ID P2 incluye todo lo de P1 y agrega Microsoft Entra ID Protection (Conditional Access basado en riesgo e informes de usuarios e inicios de sesión riesgosos), Privileged Identity Management, revisiones de acceso y administración de derechos, que juntos forman los fundamentos de la gobernanza de identidades. P2 está incluido en Microsoft 365 E5.",
   "Microsoft Entra ID Governance es un complemento para clientes de P1 o P2, y parte de Microsoft Entra Suite, que ofrece el conjunto completo de funciones de gobernanza. Además de lo que ofrece P2, agrega flujos de trabajo del ciclo de vida para automatizar ingresos, cambios y salidas, capacidades avanzadas de administración de derechos como extensiones personalizadas con Logic Apps y directivas de asignación automática, funciones de revisión de acceso asistidas por aprendizaje automático y otras capacidades de gobernanza avanzadas. Cuando un escenario mencione flujos de trabajo del ciclo de vida u otra automatización de gobernanza avanzada, piensa en ID Governance.",
   "Otras licencias completan el panorama. Microsoft Entra Workload ID Premium cubre Conditional Access e ID Protection para identidades de carga de trabajo. Microsoft Entra Internet Access y Private Access licencian Global Secure Access. Microsoft Entra External ID factura a los usuarios externos por usuarios activos mensuales. En general, las licencias son por cada usuario que se beneficia de una función, no por administrador; así, por ejemplo, cada usuario protegido por Conditional Access necesita P1.",
   "Un método confiable para el examen: identifica la función y luego asígnala. Conditional Access, grupos dinámicos, licencias por grupo, app proxy, escritura diferida: P1. Todo lo basado en riesgo, PIM, revisiones de acceso, administración de derechos: P2. Flujos de trabajo del ciclo de vida y gobernanza avanzada: ID Governance. Riesgo de entidades de servicio y CA para ellas: Workload ID Premium."
  ],
  "terms": [
   [
    "Microsoft Entra ID Free",
    "La edición incluida con directorio, sincronización, SSO, B2B y security defaults, pero sin Conditional Access."
   ],
   [
    "Microsoft Entra ID P1",
    "La edición de pago que agrega Conditional Access, grupos dinámicos, licencias por grupo, escritura diferida de SSPR, app proxy y más."
   ],
   [
    "Microsoft Entra ID P2",
    "P1 más ID Protection, Privileged Identity Management, revisiones de acceso y administración de derechos."
   ],
   [
    "Microsoft Entra ID Governance",
    "Un complemento para P1 o P2 que agrega flujos de trabajo del ciclo de vida y funciones de gobernanza avanzadas."
   ],
   [
    "Workload ID Premium",
    "Una licencia que agrega Conditional Access y detección de riesgo para identidades de carga de trabajo."
   ]
  ],
  "example": "Una empresa con Microsoft 365 E3 (que incluye P1) quiere Conditional Access basado en riesgo, roles de administrador justo a tiempo y bajas automatizadas. El arquitecto de identidad señala que las directivas basadas en riesgo y PIM requieren P2, y que las bajas automatizadas con flujos de trabajo del ciclo de vida requieren Microsoft Entra ID Governance, así que la propuesta agrega el complemento de Governance para los usuarios correspondientes.",
  "tip": "Memoriza la división: P1 es Conditional Access y las comodidades híbridas; P2 es riesgo y acceso privilegiado más la gobernanza básica; ID Governance es flujos de trabajo del ciclo de vida y gobernanza avanzada. Cuando una pregunta pida la licencia mínima, elige el nivel más bajo que contenga todas las funciones mencionadas.",
  "check": [
   [
    "¿Cuál es la licencia mínima para Privileged Identity Management?",
    "Microsoft Entra ID P2 (o Microsoft Entra ID Governance)."
   ],
   [
    "¿Qué nivel de licencia se necesita para los grupos dinámicos y las licencias basadas en grupos?",
    "Microsoft Entra ID P1."
   ],
   [
    "Un escenario requiere flujos de trabajo del ciclo de vida. ¿Qué licencia necesita?",
    "Microsoft Entra ID Governance."
   ]
  ]
 }
], { lang: "es" });
