/* Spanish translation of the ISC2 CC exam simulations. Same ids and structure as data/pbq/isc2-cc.js. */
CertHub.addPbqs("isc2-cc", [
  { id: "control-functions", d: 1, type: "match", title: "Relaciona los controles con su función",
    prompt: "Una pequeña clínica tiene los siguientes controles en su registro de riesgos. Relaciona cada control con la función que cumple principalmente.",
    pairs: [
      ["Lector de credenciales que mantiene cerrada la puerta del cuarto de servidores", "Preventivo"],
      ["Alerta del IDS cuando un host escanea la red interna", "Detectivo"],
      ["Restaurar archivos cifrados desde el respaldo de anoche", "Correctivo"],
      ["Letrero en la entrada: 'Instalaciones vigiladas, se procesará a los intrusos'", "Disuasivo"]
    ],
    explain: "Los controles preventivos impiden que un evento ocurra (la puerta cerrada). Los controles detectivos notan un evento mientras sucede o después de que ocurre (la alerta del IDS). Los controles correctivos restablecen la operación normal después del daño (restaurar desde el respaldo). Los controles disuasivos desalientan al atacante de siquiera intentarlo, que es lo que hace un letrero de advertencia; no detiene físicamente a nadie, así que no es preventivo." },

  { id: "ale-calc", d: 1, type: "fill", title: "Calcula el SLE y el ALE",
    prompt: "Un servidor de archivos con planos de diseño está valuado en $200,000. Una inundación en el cuarto de servidores del sótano destruiría el 25% de su valor (factor de exposición), y se espera una inundación así una vez cada dos años. Completa los valores (en dólares enteros; basta con escribir solo los dígitos).",
    context: "Valor del activo (AV):      $200,000\nFactor de exposición (EF):  25%\nTasa anualizada (ARO):      1 evento cada 2 años",
    fields: [
      { label: "Tasa anualizada de ocurrencia (ARO)", answers: ["0.5", ".5", "1/2", "0.50"] },
      { label: "Expectativa de pérdida única (SLE) en dólares", answers: ["50000", "50,000", "$50,000", "$50000"] },
      { label: "Expectativa de pérdida anualizada (ALE) en dólares", answers: ["25000", "25,000", "$25,000", "$25000"] }
    ],
    explain: "SLE = AV x EF = $200,000 x 0.25 = $50,000, la pérdida por una sola inundación. Una vez cada dos años equivale a un ARO de 0.5, así que ALE = SLE x ARO = $50,000 x 0.5 = $25,000 por año. Un análisis cuantitativo como este te permite comparar el costo anual de un control (por ejemplo, mover el servidor a un piso superior) contra el ALE que elimina." },

  { id: "mfa-combos", d: 1, type: "select", title: "Identifica los inicios de sesión realmente multifactor",
    prompt: "Un auditor está revisando los métodos de inicio de sesión de toda la empresa. Selecciona todos los métodos que son autenticación multifactor genuina.",
    context: "Tipos de factor: algo que sabes | algo que tienes | algo que eres",
    options: [
      "Contraseña más un PIN de 4 dígitos",
      "Contraseña más un código de un solo uso de una app autenticadora en un teléfono registrado",
      "Tarjeta inteligente más escaneo de huella digital",
      "Contraseña más la respuesta a una pregunta de seguridad",
      "Credencial de acceso más un PIN tecleado en el teclado numérico",
      "Escaneo de huella digital más reconocimiento facial"
    ],
    answers: [1, 2, 4],
    explain: "La MFA requiere factores de al menos dos tipos distintos. Una contraseña con un código de autenticador (sabes + tienes), una tarjeta inteligente con huella digital (tienes + eres) y una credencial con PIN (tienes + sabes) califican. Una contraseña con un PIN o con una pregunta de seguridad son dos cosas que sabes, y huella más rostro son dos cosas que eres, así que son de un solo factor aunque se hagan dos verificaciones." },

  { id: "policy-docs", d: 2, type: "match", title: "Clasifica los documentos de gobernanza",
    prompt: "Cada extracto proviene de la biblioteca de documentos de seguridad de una empresa. Relaciona cada extracto con el tipo de documento al que pertenece.",
    pairs: [
      ["La información de la empresa debe protegerse de acuerdo con su clasificación. La gerencia es responsable del cumplimiento.", "Política"],
      ["Todas las laptops deben usar cifrado de disco completo AES-256 con el producto de endpoint aprobado.", "Estándar"],
      ["1. Abre la consola de administración. 2. Selecciona el dispositivo. 3. Haz clic en 'Revocar' y confirma. 4. Registra el número de ticket.", "Procedimiento"],
      ["Compilación de Windows 11: firewall del host activado, SMBv1 deshabilitado, bloqueo de pantalla tras 10 minutos de inactividad.", "Línea base"],
      ["Considera usar una frase de contraseña de cuatro o más palabras aleatorias; es más fácil de recordar que una contraseña corta y compleja.", "Guía"]
    ],
    explain: "Las políticas son declaraciones de intención de alto nivel y obligatorias, aprobadas por la dirección. Los estándares concretan una política con tecnologías o valores obligatorios específicos. Los procedimientos son instrucciones paso a paso para realizar una tarea. Las líneas base definen la configuración de seguridad mínima para un tipo de sistema. Las guías son recomendaciones, señaladas por palabras como 'considera' o 'debería', y no son obligatorias." },

  { id: "kri-dashboard", d: 2, type: "select", title: "Detecta los KRI fuera de tolerancia",
    prompt: "El tablero mensual del CISO muestra indicadores clave de riesgo con la tolerancia que aprobó la dirección. Selecciona todos los indicadores que actualmente están fuera de tolerancia y deben escalarse.",
    context: "KRI                                                Tolerancia     Actual\n1 Sistemas con parches críticos > 30 días          <= 5 sistemas  12 sistemas\n2 Tasa de clics en simulación de phishing          <= 8%          6%\n3 Cuentas de bajas no deshabilitadas en 24 h       0              3\n4 Respaldos que fallan la verificación             <= 2%          1.5%\n5 Proveedores sin evaluación vigente               <= 10%         10%\n6 Tiempo medio de detección de incidentes          <= 24 horas    31 horas",
    options: [
      "KRI 1: parches críticos con más de 30 días",
      "KRI 2: tasa de clics en phishing",
      "KRI 3: cuentas de bajas no deshabilitadas",
      "KRI 4: fallas en la verificación de respaldos",
      "KRI 5: proveedores sin evaluación vigente",
      "KRI 6: tiempo medio de detección"
    ],
    answers: [0, 2, 5],
    explain: "La tolerancia al riesgo es la desviación aceptable que aprobó la dirección, así que todo lo que la supere debe escalarse al dueño del riesgo. Los KRI 1, 3 y 6 exceden sus umbrales. El KRI 5 está exactamente en el límite de 10%, lo cual sigue dentro de una tolerancia de '<= 10%', y los KRI 2 y 4 están cómodamente dentro. Valdría la pena vigilar si el KRI 5 tiende a subir, pero todavía no es un incumplimiento." },

  { id: "access-models", d: 3, type: "match", title: "Relaciona escenarios con modelos de control de acceso",
    prompt: "Relaciona cada escenario con el modelo de control de acceso que describe.",
    pairs: [
      ["El dueño de un archivo hace clic derecho en una hoja de cálculo y le da a un colega permisos de edición", "Discrecional (DAC)"],
      ["Un usuario con autorización Secret no puede abrir un documento Top Secret ni cambiar su etiqueta", "Obligatorio (MAC)"],
      ["Cada enfermera nueva obtiene automáticamente acceso a los expedientes por el puesto asignado en RR. HH.", "Basado en roles (RBAC)"],
      ["Un sistema bloquea todos los inicios de sesión a la app de nómina entre las 20:00 y las 06:00 para todos los usuarios", "Basado en reglas"]
    ],
    explain: "En DAC el dueño decide quién obtiene acceso. En MAC el sistema impone etiquetas y autorizaciones, y los usuarios no pueden anularlas. RBAC otorga permisos mediante roles de trabajo y no a individuos. El acceso basado en reglas aplica reglas globales (como horarios o reglas de firewall) a todos, sin importar la identidad o el rol. Cuidado con la abreviatura compartida 'RBAC': basado en roles se refiere a la función del puesto, basado en reglas se refiere a condiciones de todo el sistema." },

  { id: "access-review", d: 3, type: "select", title: "Encuentra problemas en una revisión trimestral de accesos",
    prompt: "Estás haciendo la revisión trimestral de accesos que se muestra abajo. Selecciona todas las cuentas que violan el mínimo privilegio, la separación de funciones o el ciclo de vida de identidades y que necesitan corrección.",
    context: "Usuario   Depto. / estado                           Acceso\njlee      Cuentas por pagar, activo                 Crear proveedores; Aprobar pagos\nmpatel    RR. HH., dado de baja 2026-08-30          Portal de RR. HH. (último inicio 2026-09-12)\nkwong     Ventas, activo                            Usuario estándar del CRM\nrdiaz     Mesa de ayuda de TI, activo               La cuenta diaria rdiaz está en Domain Admins\ntnguyen   Marketing (pasó de Finanzas en junio)     Carpeta de Marketing; escritura en libro mayor de Finanzas\nasmith    Servidores de TI, activo                  asmith: usuario estándar; asmith-adm: Server Admins",
    options: [
      "jlee",
      "mpatel",
      "kwong",
      "rdiaz",
      "tnguyen",
      "asmith"
    ],
    answers: [0, 1, 3, 4],
    explain: "jlee puede crear un proveedor y también pagarle, un conflicto clásico de separación de funciones que facilita el fraude. mpatel fue dado de baja, pero su cuenta sigue funcionando y se usó después de su salida, una falla de desaprovisionamiento que además debe investigarse. rdiaz usa una cuenta diaria con derechos de administrador de dominio en lugar de una cuenta privilegiada separada. tnguyen conservó el acceso de escritura a Finanzas después de un traslado, lo cual es acumulación de privilegios (privilege creep). kwong solo tiene lo que su trabajo necesita, y asmith separa correctamente una cuenta estándar de una cuenta de administrador." },

  { id: "ports-match", d: 4, type: "match", title: "Relaciona servicios con sus puertos predeterminados",
    prompt: "Una solicitud de cambio en el firewall incluye estos servicios. Relaciona cada uno con su puerto TCP predeterminado.",
    pairs: [["SSH", "22"], ["SMTP", "25"], ["DNS", "53"], ["HTTP", "80"], ["HTTPS", "443"], ["RDP", "3389"]],
    extra: ["21", "23", "110"],
    explain: "SSH usa el 22 para acceso remoto cifrado a la shell, SMTP el 25 para la transferencia de correo entre servidores, DNS el 53 (UDP para la mayoría de las consultas, TCP para transferencias de zona y respuestas grandes), HTTP el 80 y HTTPS el 443 para tráfico web, y RDP el 3389 para el escritorio remoto de Windows. Distractores comunes: el 21 es el control de FTP, el 23 es Telnet sin cifrar y el 110 es POP3." },

  { id: "dmz-rules", d: 4, type: "select", title: "Revisa las reglas del firewall perimetral",
    prompt: "La empresa tiene una DMZ (203.0.113.0/24) con un servidor web público y un servidor de correo, y una LAN interna (10.0.0.0/16). Selecciona todas las reglas que deben eliminarse porque exponen servicios internos o de administración directamente a internet.",
    context: "#  Acción  Origen           Destino            Puerto/Proto\n1  allow   any              203.0.113.10       443/tcp   (web)\n2  allow   any              203.0.113.10       3389/tcp\n3  allow   any              203.0.113.25       25/tcp    (correo)\n4  allow   203.0.113.10     10.0.20.5          1433/tcp  (BD de la app)\n5  allow   any              10.0.20.0/24       any\n6  allow   10.0.10.0/24     203.0.113.10       22/tcp    (VLAN de administración de TI)\n7  allow   any              203.0.113.25       23/tcp\n8  deny    any              any                any",
    options: [
      "Regla 1", "Regla 2", "Regla 3", "Regla 4", "Regla 5", "Regla 6", "Regla 7", "Regla 8"
    ],
    answers: [1, 4, 6],
    explain: "La regla 2 publica RDP a todo internet, un punto de entrada frecuente del ransomware; la administración solo debería hacerse desde la VLAN de administración o una VPN. La regla 5 permite que cualquiera en internet llegue a toda la subred de servidores internos en cualquier puerto, lo que anula la DMZ. La regla 7 expone Telnet sin cifrar en el servidor de correo. Las reglas 1 y 3 son los servicios públicos previstos, la regla 4 es una ruta acotada de la web a la base de datos, la regla 6 restringe SSH a la VLAN de administración y la regla 8 es la denegación predeterminada obligatoria." },

  { id: "cloud-models", d: 4, type: "match", title: "Relaciona modelos de servicio y de despliegue en la nube",
    prompt: "Relaciona cada escenario con el modelo de servicio o de despliegue en la nube que describe.",
    pairs: [
      ["La empresa renta máquinas virtuales y debe parchear ella misma los sistemas operativos invitados", "IaaS"],
      ["Los desarrolladores suben código a un runtime administrado; el proveedor parchea el sistema operativo y el runtime", "PaaS"],
      ["El personal usa un correo y una suite de oficina hospedados a través del navegador; la empresa solo administra usuarios y datos", "SaaS"],
      ["Varios hospitales regionales comparten una nube construida para cumplir sus normas comunes de privacidad de la salud", "Nube comunitaria"],
      ["RR. HH. se queda en una nube privada on-premises mientras la tienda web se expande hacia un proveedor público en horas pico", "Nube híbrida"]
    ],
    extra: ["Nube pública"],
    explain: "Bajo el modelo de responsabilidad compartida, la parte del cliente se reduce de IaaS (el cliente parchea el sistema operativo y las aplicaciones) a PaaS (el cliente administra el código y los datos) y a SaaS (el cliente administra cuentas, configuración y datos). Una nube comunitaria la comparten organizaciones con requisitos comunes, y una nube híbrida combina recursos privados u on-premises con la nube pública. En todos los modelos el cliente sigue siendo responsable de sus datos y de quién puede acceder a ellos." },

  { id: "ransomware-ir", d: 5, type: "order", title: "Ordena el ciclo de vida de respuesta a incidentes",
    prompt: "Un incidente de ransomware afecta a un servidor de archivos. Pon las acciones del equipo en el orden que marca el ciclo de vida de respuesta a incidentes.",
    steps: [
      "Mantener el plan de IR, la lista de contactos y respaldos offline probados antes de que ocurra cualquier incidente",
      "Investigar una alerta del SIEM por renombrado masivo de archivos, confirmar el ransomware y delimitar los hosts afectados",
      "Desconectar de la red los hosts infectados y deshabilitar la cuenta comprometida",
      "Eliminar el malware y parchear la falla de la VPN usada para el acceso inicial",
      "Restaurar los archivos desde respaldos limpios y monitorear de cerca los hosts antes de devolverlos a servicio",
      "Hacer una revisión posterior al incidente y actualizar el playbook de ransomware"
    ],
    explain: "El ciclo de vida va así: preparación, detección y análisis, contención, erradicación, recuperación y lecciones aprendidas. La contención va antes de la erradicación para que el daño deje de propagarse mientras trabajas, y la erradicación (incluido cerrar el punto de entrada) debe ir antes de la recuperación, o los sistemas restaurados se volverían a infectar. La revisión de lecciones aprendidas retroalimenta la preparación para el siguiente incidente." },

  { id: "backup-rpo", d: 5, type: "fill", title: "Verifica los respaldos contra el RPO y el RTO",
    prompt: "Lee el calendario de respaldos y los objetivos del BIA para la base de datos de pedidos, y luego completa los valores. El servidor falla a las 15:30.",
    context: "Calendario de respaldos (base de datos de pedidos)\n  01:00  respaldo completo\n  05:00, 09:00, 13:00, 17:00, 21:00  respaldos incrementales\nObjetivos del BIA\n  RPO: 6 horas\n  RTO: 2 horas\nTiempo de restauración probado (completo + incrementales): 3 horas",
    fields: [
      { label: "Punto más reciente al que se pueden restaurar los datos (HH:MM)", answers: ["13:00", "1300", "1:00 pm", "1:00pm", "1 pm", "1pm"] },
      { label: "Pérdida de datos en el peor caso con este calendario, en horas", answers: ["4", "4 horas", "cuatro"] },
      { label: "¿El calendario cumple el RPO? (sí/no)", answers: ["sí", "s"] },
      { label: "¿El tiempo de restauración cumple el RTO? (sí/no)", answers: ["no", "n"] }
    ],
    explain: "El último respaldo antes de una falla a las 15:30 es el incremental de las 13:00, así que esta vez se pierden 2.5 horas de pedidos. Los respaldos se hacen cada 4 horas, por lo que el peor caso es una pérdida de poco menos de 4 horas, dentro del RPO de 6 horas. El RTO se refiere al tiempo de inactividad, y una restauración probada de 3 horas excede el objetivo de 2 horas, así que el negocio necesita una opción más rápida, como un sitio en espera tibio (warm standby) o replicación." }
]);
