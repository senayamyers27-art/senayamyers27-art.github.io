/* Spanish translation of the SC-300 exam simulations. Same ids and structure as data/pbq/sc-300.js. */
CertHub.addPbqs("sc-300", [
  { id: "role-least-privilege", d: 1, type: "match", title: "Relaciona tareas de administración con roles de Entra de mínimo privilegio",
    prompt: "Contoso quiere que cada administrador tenga solo el rol integrado de Microsoft Entra que necesita. Relaciona cada función con el rol integrado de menor privilegio que la cubre.",
    pairs: [
      ["Crear y editar políticas de Conditional Access (nada más)", "Conditional Access Administrator"],
      ["Crear usuarios, administrar grupos y restablecer contraseñas de usuarios que no son administradores", "User Administrator"],
      ["Configurar access reviews, access packages y lifecycle workflows", "Identity Governance Administrator"],
      ["Configurar la política de métodos de autenticación de todo el tenant", "Authentication Policy Administrator"],
      ["Leer los reportes de inicio de sesión y de auditoría sin cambiar nada", "Reports Reader"],
      ["Asignar roles de Microsoft Entra y administrar su configuración de PIM", "Privileged Role Administrator"]
    ],
    extra: ["Global Administrator", "Security Administrator"],
    explain: "Mínimo privilegio significa elegir el rol más acotado que aún cubre la función. Global Administrator y Security Administrator pueden hacer varias de estas tareas, pero otorgan mucho más de lo necesario. Privileged Role Administrator es el rol que administra las asignaciones de roles y PIM para los roles de Entra, mientras que Identity Governance Administrator cubre access reviews, entitlement management y lifecycle workflows. Reports Reader solo lee reportes de uso, de inicio de sesión y de auditoría." },

  { id: "dynamic-group-rule", d: 1, type: "select", title: "Evalúa una regla de membresía dinámica",
    prompt: "Un grupo de seguridad dinámico usa la regla que se muestra. Selecciona a todos los usuarios que se convertirán en miembros del grupo.",
    context: "Rule: (user.department -eq \"Sales\") -and (user.usageLocation -eq \"US\") -and (user.accountEnabled -eq true)\n\nUPN                     department   usageLocation  accountEnabled  userType\nana@contoso.com         Sales        US             true            Member\nben@contoso.com         sales        US             true            Member\ncarla@contoso.com       Sales        CA             true            Member\ndev@contoso.com         Sales        US             false           Member\neli@contoso.com         Marketing    US             true            Member\nfatima@contoso.com      Sales        US             true            Guest",
    options: ["ana@contoso.com", "ben@contoso.com", "carla@contoso.com", "dev@contoso.com", "eli@contoso.com", "fatima@contoso.com"],
    answers: [0, 1, 5],
    explain: "Las tres condiciones están unidas con -and, así que todas deben ser verdaderas. El operador -eq en las reglas de membresía dinámica no distingue mayúsculas de minúsculas en los valores de texto, así que el \"sales\" en minúsculas de ben sí coincide. Carla falla por usageLocation, dev falla porque la cuenta está deshabilitada y eli está en otro departamento. La regla nunca revisa userType, así que la invitada fatima se agrega; incluye (user.userType -eq \"Member\") si debes excluir a los invitados." },

  { id: "custom-domain-verify", d: 1, type: "order", title: "Agrega y verifica un dominio personalizado",
    prompt: "Contoso quiere que los usuarios inicien sesión como nombre@contoso.com en lugar de usar el dominio onmicrosoft.com. Pon los pasos en el orden correcto.",
    steps: [
      "En el Microsoft Entra admin center, agregar contoso.com en Domain names",
      "Copiar el valor de verificación MS=ms######## que Entra muestra para el dominio",
      "Crear un registro TXT con ese valor en el proveedor DNS público de contoso.com",
      "Esperar la propagación de DNS y luego seleccionar Verify en el admin center",
      "Opcionalmente, hacer de contoso.com el dominio principal",
      "Actualizar los UPN de los usuarios al nuevo sufijo @contoso.com"
    ],
    explain: "Primero agregas el dominio porque eso es lo que genera el valor de verificación. Publicarlo como registro TXT (o MX) en el proveedor DNS demuestra que controlas el dominio, y Verify solo funciona cuando el registro ya resuelve, así que un fallo justo después de crearlo normalmente solo significa que el DNS aún no se ha propagado. Solo un dominio verificado puede ser principal o usarse en los UPN. El dominio onmicrosoft.com se mantiene como respaldo." },

  { id: "spray-signin-logs", d: 2, type: "select", title: "Detecta password spray en los logs de inicio de sesión",
    prompt: "Revisa el log de inicio de sesión exportado de Microsoft Entra. Selecciona todas las entradas que forman parte de un intento de password spray.",
    context: "Time (UTC)  User                 IP address      Result   Error code\n02:14:05    ana@contoso.com      203.0.113.45    Failure  50126\n02:14:09    ben@contoso.com      203.0.113.45    Failure  50126\n02:14:12    carla@contoso.com    203.0.113.45    Failure  50126\n08:31:40    dev@contoso.com      192.168.20.15   Failure  50126\n08:31:58    dev@contoso.com      192.168.20.15   Success  0\n02:14:16    eli@contoso.com      203.0.113.45    Failure  50053\n09:02:11    fatima@contoso.com   198.51.100.23   Interrupted 50074",
    options: ["02:14:05 ana 203.0.113.45 50126", "02:14:09 ben 203.0.113.45 50126", "02:14:12 carla 203.0.113.45 50126", "08:31:40 dev 192.168.20.15 50126", "08:31:58 dev 192.168.20.15 0", "02:14:16 eli 203.0.113.45 50053", "09:02:11 fatima 198.51.100.23 50074"],
    answers: [0, 1, 2, 5],
    explain: "El password spray prueba una o dos contraseñas comunes contra muchas cuentas desde el mismo origen, así que el patrón es una IP externa atacando a distintos usuarios con segundos de diferencia. El error 50126 significa nombre de usuario o contraseña no válidos, y 50053 significa que la cuenta se bloqueó o que el inicio de sesión vino de una IP maliciosa conocida (Smart Lockout); sigue siendo parte de la misma ráfaga desde 203.0.113.45. El único error de tipeo de dev desde una dirección interna, seguido de un éxito, es un comportamiento normal, y 50074 solo significa que se requería autenticación fuerte (MFA)." },

  { id: "ca-controls-match", d: 2, type: "match", title: "Asocia requisitos con la configuración de Conditional Access",
    prompt: "Relaciona cada requisito de seguridad con la configuración de la política de Conditional Access que lo implementa.",
    pairs: [
      ["Bloquear Exchange ActiveSync y otros clientes de protocolos heredados", "Condición: Client apps"],
      ["Exigir FIDO2 o Windows Hello for Business a los administradores", "Grant: Require authentication strength"],
      ["Hacer que los usuarios en dispositivos no administrados vuelvan a iniciar sesión cada 4 horas", "Session: Sign-in frequency"],
      ["Aplicar solo cuando ID Protection califica el inicio de sesión con riesgo medio o alto", "Condición: Sign-in risk"],
      ["Permitir el acceso solo desde dispositivos administrados por Intune que cumplen la política", "Grant: Require device to be marked as compliant"],
      ["Omitir la política para el tráfico desde el rango de IP públicas de la sede central", "Condición: Locations"]
    ],
    extra: ["Grant: Require terms of use", "Session: Use app enforced restrictions"],
    explain: "Las condiciones deciden cuándo se aplica una política (client apps, sign-in risk, locations), los controles de concesión (grant) deciden qué debe cumplir el usuario (authentication strength, un dispositivo compatible) y los controles de sesión dan forma a la sesión después (sign-in frequency). Authentication strength es la forma de exigir métodos resistentes al phishing en lugar de cualquier MFA. Locations usa named locations, que puedes incluir o excluir, como un rango de confianza de la sede central." },

  { id: "ca-rollout-order", d: 2, type: "order", title: "Despliega una nueva política de Conditional Access de forma segura",
    prompt: "Vas a desplegar una política que exige MFA a todos los usuarios. Pon los pasos del despliegue en el orden correcto y más seguro.",
    steps: [
      "Crear dos cuentas de acceso de emergencia (break-glass) solo en la nube y confirmar que pueden iniciar sesión",
      "Crear la política, asignarla a un grupo piloto y excluir las cuentas de acceso de emergencia",
      "Establecer el estado de la política en Report-only y guardarla",
      "Revisar los resultados de report-only en los logs de inicio de sesión y en el workbook de Conditional Access insights",
      "Cambiar la política a On para el grupo piloto",
      "Ampliar la asignación a todos los usuarios"
    ],
    explain: "Las cuentas de acceso de emergencia deben existir antes de crear la política para que puedas excluirlas y no quedarte sin acceso al tenant. El modo report-only evalúa la política y registra lo que habría hecho sin aplicarla, así que primero puedes revisar el impacto en los logs de inicio de sesión y en el workbook de insights. Después la aplicas a un grupo piloto y solo entonces la amplías a todos, lo que limita el alcance de un error." },

  { id: "daemon-token-fill", d: 3, type: "fill", title: "Lee un token de acceso app-only",
    prompt: "Un servicio en segundo plano sin usuario con sesión iniciada llama a Microsoft Graph. Se muestra su token de acceso decodificado. Completa cada valor.",
    context: "{\n  \"aud\": \"00000003-0000-0000-c000-000000000000\",\n  \"iss\": \"(tenant issuer)\",\n  \"appid\": \"11111111-2222-3333-4444-555555555555\",\n  \"app_displayname\": \"Contoso HR Sync\",\n  \"idtyp\": \"app\",\n  \"roles\": [ \"User.Read.All\", \"Group.Read.All\" ],\n  \"tid\": \"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee\"\n}",
    fields: [
      { label: "Claim del token que lista los permisos otorgados", answers: ["roles"] },
      { label: "Tipo de permiso otorgado (delegated o application)", answers: ["aplicación", "permisos de aplicación", "permiso de aplicación", "app-only"] },
      { label: "Tipo de concesión (grant type) de OAuth 2.0 que usó el servicio", answers: ["credenciales de cliente", "concesión de credenciales de cliente", "flujo de credenciales de cliente", "client_credentials"] }
    ],
    explain: "Como no hay un usuario involucrado, el servicio usa la concesión client credentials y se autentica con su propio certificado o secreto. Ese flujo solo puede usar permisos de aplicación (application permissions), que siempre requieren consentimiento de administrador y aparecen en el claim roles. Los permisos delegados aparecerían en el claim scp junto con claims del usuario. El valor app en idtyp también confirma que es un token app-only." },

  { id: "workload-identity-match", d: 3, type: "match", title: "Elige la workload identity adecuada",
    prompt: "Relaciona cada escenario con la opción de workload identity más apropiada.",
    pairs: [
      ["Una VM de Azure ejecuta un script que lee Key Vault; la identidad debe eliminarse junto con la VM", "System-assigned managed identity"],
      ["Veinte Azure Functions comparten una identidad cuyos permisos se otorgan antes de desplegarlas", "User-assigned managed identity"],
      ["Un workflow de GitHub Actions despliega en Azure sin almacenar ningún secreto", "Workload identity federation"],
      ["Un servidor local (sin Azure Arc) llama a Microsoft Graph", "App registration con una credencial de certificado"]
    ],
    extra: ["Cuenta de usuario invitado", "Cuenta de usuario administrador compartida"],
    explain: "Una system-assigned managed identity nace y muere con un solo recurso, y una user-assigned managed identity es un recurso independiente que muchos recursos pueden compartir y que puedes autorizar por adelantado. Workload identity federation permite intercambiar los tokens de un proveedor de identidad externo (como el token OIDC de GitHub) por tokens de Entra, así que no se almacena ningún secreto. Las managed identities solo están disponibles para recursos de Azure (y servidores habilitados con Arc), así que un servidor local común usa un app registration, y se prefiere un certificado en lugar de un client secret." },

  { id: "access-review-outcome", d: 4, type: "select", title: "Predice los resultados de una access review",
    prompt: "Terminó una access review trimestral de los invitados miembros del grupo Partners-Project con la configuración que se muestra. Selecciona a todos los invitados que pierden la membresía del grupo cuando se aplican los resultados.",
    context: "Settings:\n  Auto apply results to resource: Enabled\n  If reviewers don't respond: Remove access\n  Show recommendations: Enabled (inactivity 30 days)\n\nGuest                         Last sign-in   Recommendation  Reviewer decision\nkai@fabrikam.example.com      3 days ago     Approve         Approved\nlena@fabrikam.example.com     95 days ago    Deny            Approved\nmo@tailspin.example.com       12 days ago    Approve         Denied\nnina@tailspin.example.com     60 days ago    Deny            Not reviewed\nomar@northwind.example.com    1 day ago      Approve         Not reviewed",
    options: ["kai@fabrikam.example.com", "lena@fabrikam.example.com", "mo@tailspin.example.com", "nina@tailspin.example.com", "omar@northwind.example.com"],
    answers: [2, 3, 4],
    explain: "Las recomendaciones solo ayudan a los revisores; la decisión real del revisor es la que cuenta, así que lena se queda aunque lleve 95 días inactiva. A mo lo denegaron explícitamente. Como la revisión está configurada en Remove access cuando los revisores no responden, nina y omar también se eliminan aunque omar esté activo, y por eso esa opción de respaldo requiere cuidado. Con auto apply habilitado, las eliminaciones ocurren automáticamente cuando termina la revisión." },

  { id: "access-package-order", d: 4, type: "order", title: "Crea un access package de entitlement management",
    prompt: "Pon en el orden correcto los pasos para dar a los socios del proyecto acceso de autoservicio mediante entitlement management.",
    steps: [
      "Crear un catalog para el proyecto y asignar un catalog owner",
      "Agregar el grupo, el sitio de SharePoint y la enterprise app al catalog como recursos",
      "Crear un access package y elegir los roles de recursos que otorga",
      "Agregar una policy: qué connected organizations pueden solicitar, quién aprueba y una fecha de vencimiento",
      "Compartir con los socios el enlace del portal My Access del access package",
      "Los socios solicitan el paquete y los aprobadores revisan las solicitudes"
    ],
    explain: "Los catalogs son el contenedor, así que van primero, y los recursos deben agregarse a un catalog antes de que cualquier access package dentro de él pueda otorgarlos. El access package agrupa roles de recursos, y su policy define quién puede solicitar, quién aprueba y cuándo vence el acceso. Solo entonces compartes el enlace de My Access, y las solicitudes pasan por la aprobación que configuraste." }
]);
