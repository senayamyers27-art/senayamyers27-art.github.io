/* Spanish text for the career pages (data/careers.js). Loaded by assets/careers.js in Spanish mode.
   Arrays follow the English order exactly. */
CertHub.careersEs = {
  "cybersecurity": {
    title: "Carreras en ciberseguridad",
    intro: "El trabajo en ciberseguridad consiste en proteger sistemas, datos y personas contra ataques y usos indebidos. En el día a día, eso significa vigilar alertas, investigar actividad sospechosa, corregir debilidades antes de que alguien las explote y ayudar a la empresa a tomar decisiones sensatas sobre el riesgo. Casi todo es metódico: leer logs, preguntarte qué cambió y anotar qué encontraste y por qué importa.\n\nEs ideal para personas curiosas, pacientes con los detalles, que se sienten cómodas diciendo \"todavía no lo sé\" y que pueden explicar hallazgos técnicos en lenguaje sencillo. No necesitas ser programador, pero sí sentirte cómodo con la línea de comandos y entender cómo se comportan realmente las redes y los sistemas operativos.\n\nMuy pocas personas empiezan directamente en un puesto de seguridad. Las rutas más comunes pasan por mesa de ayuda, administración de sistemas o redes, para luego pasar a un puesto en un SOC o de analista de seguridad. Las certificaciones te ayudan a superar los filtros de currículum, pero los responsables de contratación sobre todo quieren pruebas de que sabes hacer el trabajo: un laboratorio en casa, informes de investigaciones que hayas practicado y respuestas claras sobre cómo manejarías una alerta real.",
    path: [
      "Una introducción amplia y de bajo costo al vocabulario de seguridad, el riesgo, el control de acceso, la seguridad de redes y la respuesta a incidentes. Te confirma que el campo te gusta antes de invertir en exámenes más difíciles.",
      "La certificación de seguridad de nivel inicial más solicitada. Cubre amenazas, arquitectura, operaciones y gobernanza con la profundidad que esperan los filtros de contratación y muchos puestos vinculados al gobierno.",
      "Te lleva de conocer conceptos a hacer trabajo de analista: leer logs, clasificar alertas, gestionar vulnerabilidades y responder a incidentes. Se ajusta muy bien a las tareas de un analista de SOC.",
      "Refuerza el lado práctico de operaciones y administración de la seguridad. Es útil si te diriges a la administración de seguridad o quieres una credencial de profesional independiente del fabricante antes de CISSP.",
      "Una certificación sénior, orientada a la gestión, que exige varios años de experiencia remunerada. Preséntala cuando ya lideres trabajo, diseñes programas o avances hacia arquitectura o gestión."
    ],
    jobs: [
      ["Analista de SOC (Nivel 1)", "Inicial", "Vigila la cola del SIEM, clasifica alertas, determina si la actividad es maliciosa o benigna, reúne contexto y escala los incidentes reales con notas claras."],
      ["Analista de seguridad", "Inicial a intermedio", "Lleva investigaciones de principio a fin, ajusta detecciones ruidosas, revisa resultados de escaneos de vulnerabilidades y ayuda a otros equipos a corregir hallazgos de seguridad."],
      ["Especialista en respuesta a incidentes (Incident Responder)", "Intermedio", "Dirige la contención y la recuperación durante los incidentes, recopila evidencia, coordina con TI y la dirección y redacta el informe posterior al incidente."],
      ["Cazador de amenazas / Ingeniero de detección (Threat Hunter / Detection Engineer)", "Intermedio a sénior", "Busca de forma proactiva comportamientos de atacantes que las alertas no detectaron y escribe y prueba nuevas reglas de detección asociadas a técnicas conocidas."],
      ["Ingeniero de seguridad", "Sénior", "Diseña y mantiene herramientas y controles de seguridad, automatiza pasos de respuesta y asesora sobre arquitectura segura para proyectos nuevos."],
      ["Gerente / Arquitecto de seguridad", "Sénior", "Es responsable del programa de seguridad o de los estándares de diseño, prioriza el riesgo con la dirección, gestiona personas o proveedores y marca el rumbo del equipo."]
    ],
    skills: [
      "Leer y correlacionar logs de Windows, Linux, firewalls y servicios en la nube",
      "Escribir búsquedas en el SIEM y consultas de detección (por ejemplo, SPL o KQL)",
      "Fundamentos de TCP/IP y lectura de capturas de paquetes en Wireshark",
      "Clasificación y escalamiento: decidir rápido qué es real y qué es ruido",
      "Proceso de respuesta a incidentes: contención, erradicación, recuperación y lecciones aprendidas",
      "Asociar la actividad a técnicas de MITRE ATT&CK",
      "Escaneo de vulnerabilidades y priorización de hallazgos según el riesgo",
      "Scripting básico en Python o PowerShell para automatizar revisiones repetitivas",
      "Informes y tickets escritos con claridad, que personas no especialistas puedan usar para actuar"
    ],
    firstSteps: [
      "Arma un pequeño laboratorio en casa con una máquina virtual Windows y una Linux, y envía sus logs a un SIEM gratuito",
      "Completa los laboratorios de SIEM y de análisis de phishing, y escribe un resumen de investigación de una página para cada uno",
      "Define un calendario de estudio para ISC2 CC o Security+ y haz un examen de práctica de referencia esta semana",
      "Aprende diez ID de eventos comunes de Windows y cómo se ve el uso de cada uno por parte de un atacante",
      "Practica explicar en dos minutos una filtración pública reciente: qué pasó, cómo se detectó y qué la habría detenido",
      "Publica los informes de tus laboratorios en un repositorio público o una página de portafolio que puedas mencionar en tu currículum"
    ]
  },
  "network": {
    title: "Carreras en redes",
    intro: "Los profesionales de redes diseñan, construyen y mantienen en funcionamiento las conexiones de las que depende todo lo demás: switches, routers, redes inalámbricas, firewalls, VPN y los enlaces a la nube entre ellos. El trabajo va desde conectar cables y resolver el problema de Wi-Fi de un solo usuario hasta planificar el enrutamiento de todo un campus o centro de datos. Cuando la red se cae, nada más funciona, así que resolver problemas con calma bajo presión es una parte central del trabajo.\n\nEs ideal para personas a las que les gusta resolver problemas de forma lógica y por capas, disfrutan entender cómo se mueven realmente los paquetes y no tienen problema en leer documentación y configuraciones línea por línea. Cada vez más, también es ideal para quienes disfrutan la automatización, porque hoy las redes se gestionan tanto con scripts y plantillas como escribiendo comandos en cada dispositivo.\n\nLa mayoría empieza en mesa de ayuda, en un NOC o como técnico de campo, y va subiendo a medida que aprende enrutamiento, switching y redes inalámbricas. Los laboratorios importan mucho aquí: poder armar VLAN, enrutamiento y ACL en un simulador y explicar cada línea de la configuración suele ser lo que marca la diferencia entre candidatos en una entrevista.",
    path: [
      "Un primer paso accesible que cubre direccionamiento básico, cableado, redes inalámbricas y resolución de problemas. Es buena opción si eres completamente nuevo y quieres un logro que te dé confianza.",
      "Una base independiente del fabricante en el modelo OSI, direccionamiento IP, enrutamiento, switching, redes inalámbricas y operaciones de red, que piden muchos puestos de mesa de ayuda y NOC.",
      "La credencial estándar para trabajos prácticos de redes. Demuestra que puedes configurar y resolver problemas de switching, enrutamiento, servicios IP y seguridad básica en equipos reales.",
      "Suma el sistema operativo de un segundo fabricante, lo que amplía los empleadores y proveedores de servicios para los que puedes trabajar y profundiza tu comprensión del enrutamiento.",
      "Te especializa en redes inalámbricas empresariales: comportamiento de RF, estudios de sitio, estándares 802.11 y resolución de problemas. La experiencia en redes inalámbricas tiene demanda constante y es difícil de fingir.",
      "El examen central de redes empresariales de nivel profesional, que cubre enrutamiento avanzado, virtualización, automatización y aseguramiento. Preséntalo cuando ya trabajes en redes de producción."
    ],
    jobs: [
      ["Técnico de NOC", "Inicial", "Supervisa los paneles de estado de la red, responde a alertas, hace la resolución de problemas de primer nivel y escala las caídas con evidencia clara."],
      ["Técnico de soporte de redes / Técnico de campo", "Inicial", "Instala y reemplaza switches, puntos de acceso y cableado, prueba la conectividad y documenta lo que cambió en el sitio."],
      ["Administrador de redes", "Intermedio", "Gestiona la configuración diaria de switches, routers, firewalls y redes inalámbricas, atiende solicitudes de cambio y mantiene la documentación al día."],
      ["Ingeniero de redes", "Intermedio a sénior", "Diseña e implementa enrutamiento, segmentación, VPN y redes inalámbricas para sitios o proyectos nuevos, y resuelve los problemas escalados más difíciles."],
      ["Ingeniero de automatización de redes (Network Automation Engineer)", "Sénior", "Escribe scripts y plantillas para desplegar y validar configuraciones a escala, y crea un monitoreo que detecta los problemas antes que los usuarios."],
      ["Arquitecto de redes", "Sénior", "Define el diseño y los estándares de la red a largo plazo, evalúa tecnologías y equilibra confiabilidad, seguridad y costo."]
    ],
    skills: [
      "Subneteo IPv4 y direccionamiento IPv6 con rapidez y precisión",
      "Configuración y resolución de problemas de VLAN, trunking y spanning tree",
      "Enrutamiento estático, OSPF y comprensión de cómo BGP selecciona rutas",
      "ACL, NAT y políticas básicas de firewall",
      "Fundamentos de redes inalámbricas: canales, interferencia, roaming y estudios de sitio",
      "Resolución de problemas estructurada desde la capa física hacia arriba",
      "Captura y análisis de paquetes con Wireshark o tcpdump",
      "Respaldo de configuraciones, control de cambios y documentación de la red",
      "Python o Ansible básico para automatización de redes"
    ],
    firstSteps: [
      "Practica ejercicios de subneteo a diario hasta que puedas dividir una /24 en cualquier tamaño en menos de un minuto",
      "Arma los laboratorios de VLAN y OSPF en un simulador y guarda tus configuraciones finales con comentarios",
      "Captura el tráfico de tu casa en Wireshark e identifica DNS, DHCP, ARP y un handshake TCP",
      "Elige Network+ o CCNA como objetivo, reserva una fecha y planifica tu tiempo semanal de laboratorio en torno a ella",
      "Dibuja un diagrama de la red de tu casa o de tu laboratorio con el direccionamiento y los dispositivos etiquetados",
      "Escribe un breve registro de resolución de problemas para una falla de laboratorio que hayas creado y corregido"
    ]
  },
  "software": {
    title: "Carreras en desarrollo de software",
    intro: "Los desarrolladores de software convierten requisitos en código funcional y probado: servicios web, herramientas internas, pipelines de datos, funciones en la nube y, cada vez más, aplicaciones que usan modelos de IA. Un día típico combina escribir código, revisar cambios de otras personas, corregir errores, hablar con usuarios o responsables de producto y mejorar el pipeline de compilación y despliegue. La seguridad es parte del trabajo, no un paso aparte: validar entradas, manejar bien los secretos y mantener las dependencias actualizadas.\n\nEs ideal para personas a las que les gusta construir cosas, que pueden dividir un problema grande en pasos pequeños y que se sienten cómodas estando atascadas un rato antes de que algo encaje. Los buenos desarrolladores leen mucho más código del que escriben y se comunican con claridad en pull requests y tickets.\n\nSe entra por títulos universitarios, bootcamps, estudio autodidacta o movimientos internos desde soporte o QA. Aquí las certificaciones pesan menos que en los puestos de infraestructura; un portafolio de proyectos reales y probados, con un historial de commits limpio, cuenta más. Las certificaciones son más útiles para demostrar habilidades en plataformas específicas, como un proveedor de nube, contenedores o infraestructura como código, además de ese portafolio.",
    path: [
      "Confirma la sintaxis básica de Python, los tipos de datos, el control de flujo y las funciones. Python es el primer lenguaje más flexible y se usa en scripting, automatización, datos y seguridad.",
      "Va más allá de lo básico: módulos, paquetes, excepciones, programación orientada a objetos y manejo de archivos, que es el nivel necesario para escribir programas mantenibles.",
      "Demuestra un diseño orientado a objetos sólido y dominio de un lenguaje de tipado estático muy usado en servicios back-end empresariales. Elígela si apuntas a bases de código de grandes corporaciones.",
      "Muestra que puedes crear y desplegar aplicaciones en una nube importante: funciones serverless, API, almacenamiento, permisos IAM y CI/CD. La mayoría del software nuevo se publica en la nube.",
      "Un examen práctico que demuestra que puedes empaquetar, desplegar y resolver problemas de aplicaciones en Kubernetes, la plataforma habitual para ejecutar servicios en contenedores.",
      "Demuestra dominio de infraestructura como código, para que puedas definir de forma reproducible los entornos donde corren tus aplicaciones y revisar cambios de infraestructura como si fueran código."
    ],
    jobs: [
      ["Desarrollador de software júnior", "Inicial", "Corrige errores y crea funcionalidades pequeñas con supervisión, escribe pruebas unitarias y aprende la base de código mediante revisiones de código y programación en pareja."],
      ["Ingeniero de QA / Automatización de pruebas", "Inicial a intermedio", "Escribe pruebas automatizadas, prepara datos y pipelines de prueba, y trabaja con los desarrolladores para reproducir y corregir defectos antes del lanzamiento."],
      ["Desarrollador de software", "Intermedio", "Es responsable de funcionalidades desde el diseño hasta producción, revisa el código de sus compañeros, atiende las guardias de sus servicios y mejora la confiabilidad."],
      ["Ingeniero de nube / DevOps", "Intermedio", "Crea pipelines de CI/CD, imágenes de contenedores e infraestructura como código para que los equipos publiquen de forma segura y repetible."],
      ["Ingeniero de DevSecOps / Seguridad de aplicaciones", "Intermedio a sénior", "Incorpora escaneo de código, revisión de dependencias y modelado de amenazas al proceso de desarrollo, y ayuda a los desarrolladores a corregir hallazgos de seguridad."],
      ["Ingeniero sénior / Arquitecto de software", "Sénior", "Diseña sistemas y API, define estándares de codificación, guía a otras personas y equilibra velocidad, costo, seguridad y mantenibilidad."]
    ],
    skills: [
      "Dominio de al menos un lenguaje, como Python o Java, incluidas sus herramientas estándar",
      "Ramas en Git, pull requests y resolución de conflictos de fusión",
      "Escribir pruebas unitarias y de integración, y usarlas en CI",
      "Diseñar y consumir API REST y manejar JSON",
      "Contenedores con Docker y despliegue básico en Kubernetes",
      "Fundamentos de codificación segura: validación de entradas, manejo de secretos y actualización de dependencias",
      "Fundamentos de nube: permisos IAM, funciones serverless y almacenamiento administrado",
      "Depuración con logs, puntos de interrupción y casos de prueba reproducibles",
      "Redacción técnica clara en README, pull requests y notas de diseño"
    ],
    firstSteps: [
      "Elige un lenguaje y una idea de proyecto pequeño que resuelva un problema real que tengas",
      "Completa el laboratorio de flujo de trabajo con Git y haz commits en tu proyecto todos los días, en pasos pequeños y bien descritos",
      "Agrega pruebas automatizadas y un pipeline de CI a tu proyecto para que se ejecuten en cada push",
      "Crea y documenta una pequeña API REST y luego ponla en un contenedor con Docker",
      "Lee el código fuente de una herramienta de código abierto que uses y anota una cosa que hayas aprendido",
      "Empieza a estudiar para PCEP o la certificación del lenguaje que elegiste con un horario semanal fijo"
    ]
  },
  "secadmin": {
    title: "Carreras en administración e ingeniería de seguridad",
    intro: "Los administradores e ingenieros de seguridad gestionan los controles que impiden que los ataques tengan éxito: gestión de identidades y accesos, protección de endpoints, firewalls, seguridad del correo, configuración de seguridad en la nube y el SIEM que lo integra todo. Mientras un analista de SOC reacciona a las alertas, este puesto construye y ajusta las defensas, implementa políticas como la autenticación multifactor y el acceso condicional, y mantiene los sistemas configurados según una línea base segura.\n\nEs ideal para personas a las que les gusta que las cosas funcionen de forma confiable, que disfrutan profundizar en una plataforma (por ejemplo, la seguridad en la nube de Microsoft o un fabricante de firewalls específico) y que saben equilibrar la seguridad con la productividad de los usuarios. La gestión de cambios y las pruebas cuidadosas importan, porque una mala política puede bloquear el acceso de toda una empresa.\n\nLa mayoría llega desde la administración de sistemas, las redes o un puesto en un SOC. Aquí las certificaciones de fabricante tienen mucho peso, porque los empleadores te contratan para operar productos específicos. Por eso, combinar una base independiente del fabricante como Security+ con certificaciones de las plataformas que aparecen en las ofertas de empleo es una ruta eficaz.",
    path: [
      "Construye la base independiente del fabricante en amenazas, controles, identidad y arquitectura segura que dan por sentada todas las certificaciones de plataforma posteriores.",
      "Se centra en el lado práctico de las operaciones y la administración de seguridad: controles de acceso, monitoreo, manejo de incidentes y criptografía en el uso diario.",
      "Demuestra que puedes gestionar la identidad en Microsoft Entra ID: métodos de autenticación, acceso condicional, Privileged Identity Management y revisiones de acceso. Hoy la identidad es el principal perímetro de seguridad.",
      "Cubre Microsoft Defender y Sentinel para detección y respuesta, para que puedas crear, ajustar e investigar con las herramientas que muchas organizaciones ya tienen licenciadas.",
      "Muestra que puedes configurar y resolver problemas de un firewall de nueva generación: zonas, políticas de seguridad, App-ID, NAT, descifrado y VPN. Elige el fabricante de firewall que más aparezca en las ofertas que te interesan.",
      "Una credencial más avanzada de ingeniería de seguridad en la nube para proteger cargas de trabajo, redes, datos y la gestión de postura en Azure, una vez que tengas experiencia práctica."
    ],
    jobs: [
      ["Administrador de seguridad", "Inicial a intermedio", "Gestiona el acceso de los usuarios, MFA, la protección de endpoints y las consolas de las herramientas de seguridad, atiende solicitudes de acceso y mantiene coherente la configuración de seguridad."],
      ["Analista de gestión de identidades y accesos (IAM)", "Inicial a intermedio", "Da de alta y de baja cuentas, gestiona grupos y roles, realiza revisiones de acceso y resuelve problemas de inicio de sesión y SSO."],
      ["Administrador de firewall / Seguridad de redes", "Intermedio", "Revisa e implementa cambios en las reglas del firewall, gestiona VPN, supervisa los logs de tráfico y elimina reglas sin uso o riesgosas."],
      ["Ingeniero de seguridad", "Intermedio a sénior", "Despliega y ajusta el SIEM, el EDR y la seguridad del correo, escribe detecciones y automatizaciones, y endurece sistemas según estándares de línea base."],
      ["Ingeniero de seguridad en la nube", "Sénior", "Protege tenants y cargas de trabajo en la nube con políticas, identidad, controles de red y gestión de postura, y revisa nuevos diseños en la nube."],
      ["Arquitecto de seguridad", "Sénior", "Define estándares de seguridad y diseños de referencia, evalúa productos y se asegura de que los sistemas nuevos se ajusten a la tolerancia al riesgo de la organización."]
    ],
    skills: [
      "Gestión de identidades: MFA, SSO, acceso condicional y acceso basado en roles",
      "Configuración de políticas de protección de endpoints y EDR",
      "Diseño de políticas de firewall, NAT y resolución de problemas de VPN de sitio a sitio",
      "Incorporación de fuentes al SIEM, análisis de logs y ajuste de detecciones",
      "Endurecimiento de Windows y Linux según líneas base documentadas",
      "PKI y gestión del ciclo de vida de certificados",
      "Gestión de cambios e implementación segura de políticas de seguridad",
      "Scripting con PowerShell o Python para administración y reportes",
      "Explicar las ventajas y desventajas de las decisiones de seguridad a usuarios y colegas de TI"
    ],
    firstSteps: [
      "Crea un tenant de nube gratuito o de prueba y activa MFA y una política de acceso condicional en modo de solo informe",
      "Completa los laboratorios de endurecimiento de Windows y de MFA para SSH, y documenta la configuración antes y después",
      "Arma un laboratorio con pfSense o un NGFW con al menos dos zonas y un conjunto de reglas por escrito con su justificación",
      "Lee tres ofertas de empleo que te interesen y anota los productos exactos que mencionan; planifica tus certificaciones en torno a ellos",
      "Empieza a estudiar Security+ si aún no la tienes, o SC-300 si ya la tienes",
      "Escribe un plan de cambio de una página para implementar una política de seguridad, con pruebas y reversión"
    ]
  },
  "sysadmin": {
    title: "Carreras en administración de sistemas",
    intro: "Los administradores de sistemas mantienen sanos y seguros los servidores, sistemas operativos, cuentas, almacenamiento y recursos en la nube de los que depende una organización. El trabajo incluye crear y parchear servidores, gestionar usuarios y permisos, supervisar el rendimiento, restaurar desde respaldos, automatizar tareas rutinarias y, cada vez más, operar infraestructura en la nube y en plataformas de contenedores. Es el puesto base del que nacen la mayoría de las demás carreras de TI y seguridad.\n\nEs ideal para personas a las que les gusta arreglar cosas, disfrutan aprender cómo funcionan por dentro los sistemas operativos y sienten satisfacción al automatizar una tarea repetitiva. Ser metódico con los cambios, la documentación y los respaldos importa más que saberte todos los comandos de memoria.\n\nLa puerta de entrada clásica es la mesa de ayuda o el soporte técnico de escritorio, seguida de un puesto de administrador de sistemas júnior. A+ te ayuda a conseguir el primer empleo; las certificaciones de Linux y de nube te ayudan a crecer. Un laboratorio en casa donde hayas creado un dominio, servicios Linux, respaldos y algo de automatización es una prueba sólida de tus habilidades en una entrevista.",
    path: [
      "Cubre hardware, dispositivos móviles, fundamentos de redes, virtualización y metodología de resolución de problemas. Es la credencial de entrada estándar para mesa de ayuda y soporte de escritorio.",
      "Completa A+ con sistemas operativos, seguridad, resolución de problemas de software y procedimientos operativos, que son las tareas diarias de un primer empleo en soporte de TI.",
      "Desarrolla habilidades de administración de Linux independientes del fabricante: la shell, servicios, almacenamiento, permisos, scripting y resolución de problemas, algo que necesita casi cualquier puesto con servidores.",
      "Un examen práctico, basado en desempeño, que demuestra que realmente puedes administrar Linux empresarial bajo presión de tiempo. Es muy respetado porque no se puede aprobar solo memorizando.",
      "Muestra que puedes administrar una nube importante: identidades, almacenamiento, máquinas virtuales, redes y monitoreo en Azure. Hoy la mayoría de los puestos de administración de sistemas incluyen recursos en la nube.",
      "Un examen práctico sobre cómo crear y operar clústeres de Kubernetes. Preséntalo cuando tu entorno use contenedores y quieras avanzar hacia la ingeniería de plataformas."
    ],
    jobs: [
      ["Técnico de mesa de ayuda / Soporte de TI", "Inicial", "Resuelve tickets de usuarios sobre cuentas, dispositivos, software y conectividad, documenta las soluciones y escala lo que requiere más experiencia."],
      ["Técnico de soporte de escritorio / Despliegue", "Inicial", "Crea imágenes y despliega computadoras, gestiona instalaciones de software y parches en los equipos, y da soporte presencial a los usuarios."],
      ["Administrador de sistemas júnior", "Inicial a intermedio", "Gestiona cuentas de usuario, directivas de grupo, parches de servidores y respaldos, y supervisa los servidores en busca de problemas de disco, memoria y servicios."],
      ["Administrador de sistemas (Linux o Windows)", "Intermedio", "Crea y mantiene servidores y servicios, automatiza tareas con scripts, atiende solicitudes de cambio y resuelve caídas escaladas."],
      ["Administrador / Ingeniero de nube", "Intermedio a sénior", "Gestiona suscripciones en la nube, redes virtuales, identidad y costos, y crea infraestructura con plantillas o infraestructura como código."],
      ["Ingeniero de confiabilidad de sitios / Ingeniero de plataformas (SRE / Platform Engineer)", "Sénior", "Opera plataformas de contenedores y automatización a escala, define objetivos de monitoreo y confiabilidad, y dirige la respuesta a incidentes ante caídas."]
    ],
    skills: [
      "Windows Server y Active Directory: usuarios, grupos, directivas de grupo y DNS",
      "Línea de comandos de Linux, permisos, servicios con systemd y revisión de logs",
      "Gestión de parches y actualizaciones con pruebas y reversión",
      "Respaldo y restauración, incluida la comprobación de que las restauraciones realmente funcionan",
      "Gestión de almacenamiento, como LVM, sistemas de archivos y planificación de capacidad de disco",
      "Scripting en PowerShell y Bash para automatizar tareas rutinarias",
      "Virtualización y administración básica de la nube",
      "Monitoreo y alertas de disponibilidad y rendimiento",
      "Notas de tickets, runbooks y documentación de cambios claras"
    ],
    firstSteps: [
      "Monta un laboratorio en casa con un controlador de dominio de Windows Server y un servidor Linux en máquinas virtuales",
      "Completa los laboratorios de CLI de Linux y de systemd, y anota cada comando que tuviste que buscar",
      "Escribe un script en PowerShell o Bash que informe el uso de disco y los servicios con fallas, y prográmalo",
      "Configura un respaldo de tu servidor de laboratorio y practica una restauración completa en una máquina nueva",
      "Reserva A+ Core 1 o Linux+ según tu punto de partida, y define un bloque de estudio semanal",
      "Practica explicar de principio a fin cómo resolverías el problema \"un usuario no puede iniciar sesión\""
    ]
  },
  "cloud": {
    title: "Carreras en computación en la nube",
    intro: "Los profesionales de la nube diseñan, construyen y operan aplicaciones e infraestructura en plataformas como AWS y Microsoft Azure, en lugar de hacerlo en el centro de datos propio de una empresa. El trabajo abarca identidad y acceso, redes virtuales, cómputo, almacenamiento, bases de datos, monitoreo, automatización con infraestructura como código y mantener bajo control la factura mensual. Casi todas las organizaciones ya tienen al menos parte de su TI en la nube, así que estas habilidades tienen demanda en todas las industrias.\n\nEs ideal para personas a las que les gusta construir sistemas a partir de piezas, disfrutan la automatización y se sienten cómodas con el cambio constante, porque los proveedores de nube lanzan servicios y funciones nuevas cada semana. No necesitas ser programador, pero sí sentirte cómodo con la línea de comandos, leer documentación y pensar en seguridad y costo al mismo tiempo que en la funcionalidad.\n\nMuchas personas empiezan en mesa de ayuda, administración de sistemas o redes y luego suman habilidades de nube; otras entran directamente a puestos júnior de soporte en la nube con una certificación de fundamentos y un buen laboratorio en casa. Los exámenes de fundamentos demuestran que entiendes los conceptos y los precios; las certificaciones de nivel asociado e independientes del fabricante, junto con proyectos prácticos como una cuenta protegida, un diseño de VPC e infraestructura como código, son lo que te consigue un puesto de ingeniero.",
    path: [
      "El inicio más suave: conceptos de nube, el modelo de responsabilidad compartida, los servicios principales de AWS, fundamentos de seguridad y precios. Te da el vocabulario que dan por sentado todas las certificaciones y entrevistas de nube posteriores.",
      "Suma el lado de Microsoft del mercado: arquitectura de Azure, grupos de recursos, RBAC, Azure Policy y gestión de costos. Muchos empleadores usan ambas nubes, y conocer dos proveedores demuestra que entiendes los conceptos y no solo una consola.",
      "Un examen independiente del fabricante, centrado en operaciones, que cubre arquitectura, despliegue, seguridad, automatización y resolución de problemas en distintas nubes. Es ideal para quienes vienen de administración de sistemas o redes, y es reconocido en muchos empleos del gobierno y de contratistas.",
      "La credencial de nube de nivel asociado más solicitada: diseñar arquitecturas seguras, resilientes, de alto rendimiento y optimizadas en costo en AWS. Preséntala cuando ya hayas creado tú mismo VPC, políticas de IAM y monitoreo, porque los escenarios premian la experiencia real."
    ],
    jobs: [
      ["Asociado / Ingeniero de soporte en la nube (Cloud Support Associate / Engineer)", "Inicial", "Resuelve problemas de nube de clientes o internos, como errores de acceso denegado, fallas de red y despliegues fallidos, y documenta las soluciones en runbooks."],
      ["Administrador de nube júnior", "Inicial a intermedio", "Gestiona cuentas y suscripciones, usuarios y roles, máquinas virtuales, almacenamiento y respaldos, aplica etiquetas y presupuestos, y atiende solicitudes de cambio rutinarias."],
      ["Ingeniero de nube", "Intermedio", "Crea y opera infraestructura en la nube con infraestructura como código, diseña redes e identidad, configura monitoreo y alertas, y automatiza despliegues."],
      ["Ingeniero de operaciones en la nube / Confiabilidad de sitios (Cloud Operations / SRE)", "Intermedio a sénior", "Mantiene las cargas de trabajo en la nube disponibles y rápidas, define alertas y objetivos de confiabilidad, dirige la respuesta a incidentes ante caídas y reduce el trabajo manual con automatización."],
      ["Ingeniero de seguridad en la nube", "Intermedio a sénior", "Diseña accesos de mínimo privilegio, barreras de protección y políticas, revisa configuraciones en busca de errores y supervisa los logs de auditoría de la nube en busca de amenazas."],
      ["Arquitecto de soluciones en la nube", "Sénior", "Diseña soluciones completas que cumplan los requisitos del negocio en seguridad, resiliencia, rendimiento y costo, y guía a equipos y clientes en las decisiones y las migraciones."]
    ],
    skills: [
      "Gestión de identidades y accesos: protección de root y administradores, políticas de mínimo privilegio, roles y RBAC",
      "Redes virtuales: planificación CIDR, subredes públicas y privadas, tablas de rutas, security groups y NSG",
      "Servicios de cómputo y almacenamiento: máquinas virtuales, almacenamiento de objetos, almacenamiento en bloque, snapshots y reglas de ciclo de vida",
      "Monitoreo y logs con CloudWatch o Azure Monitor, incluidas alarmas y consultas de logs",
      "Infraestructura como código con Terraform o CloudFormation, además de Git y revisión de código",
      "Gestión de costos: modelos de precios, presupuestos, etiquetado y ajuste del tamaño de los recursos",
      "El modelo de responsabilidad compartida y la gobernanza de la nube con políticas, etiquetas y bloqueos",
      "Línea de comandos de Linux y scripting con Bash, Python o PowerShell"
    ],
    firstSteps: [
      "Crea una cuenta gratuita de AWS y protégela primero: MFA para root, un presupuesto de gasto cero y un usuario administrador en Identity Center",
      "Completa los laboratorios de S3, EC2 y VPC, elimina todo el mismo día y revisa la factura a la mañana siguiente",
      "Crea una cuenta gratuita de Azure y practica grupos de recursos, RBAC y Azure Policy en el laboratorio de gobernanza",
      "Vuelve a crear uno de tus laboratorios con Terraform o CloudFormation y sube el código (sin los archivos de estado) a un repositorio Git",
      "Estima el costo de una pequeña aplicación web en ambas calculadoras de precios y escribe un memo de una página",
      "Reserva AWS Cloud Practitioner o AZ-900 y define un bloque de estudio semanal; luego planifica Cloud+ o Solutions Architect Associate"
    ]
  },
  "data-ai": {
    title: "Carreras en datos e IA",
    intro: "Los profesionales de datos e IA convierten datos en bruto en decisiones y crean software capaz de leer, ver, resumir y responder preguntas. El trabajo va desde escribir SQL y limpiar hojas de cálculo, pasando por estadísticas y paneles en los que confían los líderes, hasta desarrollar aplicaciones sobre servicios de IA en la nube: API de lenguaje y visión, modelos generativos fundamentados en documentos de la empresa, índices de búsqueda, y las evaluaciones y filtros de seguridad que mantienen esos sistemas precisos y confiables. Hoy todas las industrias tienen datos que quieren aprovechar y funciones de IA que quieren lanzar, así que estas habilidades tienen demanda mucho más allá de las empresas de tecnología.\n\nEs ideal para personas curiosas, a las que les gusta encontrar patrones y explicarlos con palabras sencillas, y que se sienten cómodas tanto con los números como con el código. Los analistas necesitan más cuidado con las definiciones y la calidad de los datos que matemáticas avanzadas; los ingenieros de IA necesitan una programación sólida, entender cómo fallan los modelos y el criterio para sopesar equidad, privacidad y costo junto con la precisión. La IA responsable es parte del trabajo, no un extra: te preguntarán a quién podría perjudicar, cómo lo probaste y cómo sabrás si algo sale mal.\n\nMuchas personas empiezan como analistas de datos o de reportes, o llegan desde el desarrollo de software, el soporte de TI o un puesto de negocio donde ya eran quienes armaban las hojas de cálculo. Una certificación de fundamentos más un portafolio de proyectos reales, como un análisis en SQL, un conjunto de datos limpio con su registro de calidad, un panel con gobernanza, un informe de una prueba A/B y un pequeño asistente de IA fundamentado con su conjunto de evaluación, es lo que te consigue entrevistas. Después, las certificaciones de nivel asociado demuestran que puedes crear y operar soluciones de IA en una plataforma en la nube.",
    path: [
      "Empieza por los datos: tipos y estructuras de datos, obtención y limpieza, SQL y estadística, visualización y gobernanza de datos. Todo sistema de IA es tan bueno como sus datos, y este examen independiente del fabricante te da las habilidades de analista que buscan los empleadores en el nivel inicial.",
      "Aprende el vocabulario de la IA y los servicios de Azure que lo respaldan: fundamentos de machine learning, visión por computadora, procesamiento de lenguaje natural, IA generativa y los principios de IA responsable. Es un examen conceptual y accesible que te dice qué servicio sirve para cada problema antes de construir nada.",
      "Construye la base de desarrollo sobre la que funcionan las aplicaciones de IA: aplicaciones en contenedores, servicios de datos de Azure, conexión y consumo de servicios de Azure, y cómo protegerlos, supervisarlos y resolver sus problemas. Te convierte de alguien que conoce los conceptos en alguien que puede publicar código funcional en Azure.",
      "La credencial de ingeniero de IA de Azure: planificar y proteger soluciones de Azure AI, implementar IA generativa, agentes, visión, lenguaje y minería de conocimiento, y aplicar la IA responsable en la práctica. Preséntala cuando ya hayas creado tú mismo prompts fundamentados, un índice de búsqueda y un sistema de evaluación, porque los escenarios premian la experiencia práctica."
    ],
    jobs: [
      ["Analista de datos / Analista de reportes", "Inicial", "Escribe SQL para responder preguntas del negocio, limpia y valida datos, crea paneles e informes, y explica tendencias y anomalías a personas sin perfil técnico."],
      ["Desarrollador de inteligencia de negocios (BI)", "Inicial a intermedio", "Diseña modelos de datos, define las métricas una sola vez para toda la organización, crea paneles con gobernanza y seguridad a nivel de fila, y mantiene en marcha las actualizaciones y los controles de calidad de datos."],
      ["Científico de datos júnior / Analista de producto", "Intermedio", "Diseña y analiza experimentos como pruebas A/B, crea modelos predictivos sencillos y convierte los resultados estadísticos en recomendaciones claras, con su nivel de incertidumbre."],
      ["Ingeniero de IA / Ingeniero de IA de Azure", "Intermedio", "Crea aplicaciones sobre servicios y modelos de IA: API de lenguaje y visión, IA generativa fundamentada y generación aumentada por recuperación, con autenticación, monitoreo, control de costos y evaluación."],
      ["Ingeniero de machine learning / MLOps", "Intermedio a sénior", "Automatiza el entrenamiento, la evaluación y el despliegue de modelos, los supervisa en producción para detectar deriva y caídas de calidad, y gestiona los pipelines y la infraestructura en los que funcionan."],
      ["Especialista en IA responsable / Gobernanza de IA", "Intermedio a sénior", "Realiza evaluaciones de impacto de IA, define requisitos de equidad, seguridad y transparencia, revisa evaluaciones y filtros de contenido antes del lanzamiento, y alinea el uso de la IA con la regulación y las políticas de la empresa."]
    ],
    skills: [
      "SQL: joins, agregaciones, expresiones de tabla comunes (CTE) y funciones de ventana sobre esquemas desconocidos",
      "Limpieza y preparación de datos con pandas de Python o en hojas de cálculo, con las decisiones de calidad de datos documentadas",
      "Estadística descriptiva, pruebas de hipótesis, intervalos de confianza y diseño de experimentos",
      "Paneles y visualización de datos en Power BI o Looker Studio, con gobernanza, diccionarios de datos y control de acceso",
      "Programación en Python y trabajo con API REST y JSON",
      "Servicios de Azure AI: lenguaje, visión, Azure OpenAI en Foundry y Azure AI Search, incluidas claves, autenticación con Entra ID y control de costos",
      "Ingeniería de prompts, fundamentación y generación aumentada por recuperación con citas",
      "Evaluación de la calidad y la seguridad de los modelos: conjuntos de prueba etiquetados, LLM como juez, filtros de contenido y defensas contra la inyección de prompts",
      "IA responsable: medición de la equidad, privacidad, transparencia, supervisión humana y evaluaciones de impacto"
    ],
    firstSteps: [
      "Instala SQLite, descarga una base de datos pública de ejemplo y responde diez preguntas reales del negocio en SQL, guardando cada consulta con un comentario",
      "Limpia un conjunto de datos desordenado en pandas o en una hoja de cálculo y escribe un registro de calidad de datos que explique cada decisión",
      "Crea un panel de una página con tus datos limpios, concilia dos cifras con la fuente y escribe un diccionario de datos",
      "Ejecuta localmente un pequeño modelo abierto con Ollama y crea un asistente fundamentado que cite sus fuentes y diga cuando no sabe algo",
      "Escribe una evaluación de IA responsable para una función de IA que uses todos los días: a quién podría perjudicar y cómo lo pondrías a prueba",
      "Reserva Data+ o AI-900 y define un bloque de estudio semanal; luego planifica AI-200 y AI-102 cuando tu portafolio tenga un proyecto de IA"
    ]
  }
};
