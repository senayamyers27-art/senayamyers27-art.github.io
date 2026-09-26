CertHub.addLessons("securityx", [
 {
  "t": "Security governance components: policies, standards, procedures, guidelines and governance frameworks",
  "tt": "Componentes de la gobernanza de seguridad: políticas, estándares, procedimientos, guías y marcos de gobernanza",
  "body": [
   "La gobernanza es la forma en que una organización decide qué debe lograr la seguridad, quién rinde cuentas y cómo sabrá si está funcionando. En el nivel de SecurityX se espera que pienses como la persona que diseña esa estructura, no solo como quien la sigue. Las partes escritas de la gobernanza forman una jerarquía, y las preguntas del examen a menudo dependen de ubicar un requisito en el nivel correcto.",
   "Una política (policy) es una declaración breve, de alto nivel y obligatoria de la intención de la dirección, aprobada por la alta gerencia o la junta directiva. Por ejemplo: 'Todos los datos sensibles deben cifrarse en reposo y en tránsito'. Las políticas cambian pocas veces porque requieren aprobación ejecutiva. Un estándar (standard) hace que la política sea medible y específica, por ejemplo: 'Usa AES-256 para datos en reposo y TLS 1.2 o posterior para datos en tránsito'. Los estándares también son obligatorios, pero el equipo de seguridad puede actualizarlos a medida que cambia la tecnología sin volver a la junta directiva.",
   "Un procedimiento (procedure) es la instrucción paso a paso para realizar una tarea de forma consistente, como la manera de solicitar y aprobar un cambio en el firewall o de rotar la clave de una cuenta de servicio. Una guía (guideline) es un consejo recomendado y opcional, por ejemplo, formas sugeridas de crear una frase de contraseña robusta. Una línea base (baseline) es una configuración mínima para una clase de sistemas, a menudo derivada de un benchmark como un CIS Benchmark.",
   "Los marcos de gobernanza vinculan estos documentos con un programa. Definen órganos de supervisión (un comité directivo de seguridad, un comité de riesgos de la junta), estatutos que otorgan autoridad a la función de seguridad y un ciclo de establecer objetivos, medir y revisar. Marcos como ISO/IEC 27001, el NIST Cybersecurity Framework y COBIT dan una estructura para que no tengas que inventar el programa desde cero.",
   "Los buenos documentos de gobernanza tienen un responsable, un ciclo de revisión (normalmente anual), control de versiones, un proceso de excepciones con fechas de vencimiento y controles compensatorios, y un vínculo claro con los riesgos o regulaciones que atienden. Sin un proceso de excepciones, las personas esquivan la política de manera informal y pierdes visibilidad del riesgo real."
  ],
  "terms": [
   [
    "Policy (política)",
    "Declaración de alto nivel y obligatoria de la intención de la dirección, aprobada por la alta gerencia."
   ],
   [
    "Standard (estándar)",
    "Requisito obligatorio, específico y medible que respalda una política, como un algoritmo o una configuración requerida."
   ],
   [
    "Procedure (procedimiento)",
    "Instrucciones paso a paso para realizar una tarea de forma consistente."
   ],
   [
    "Guideline (guía)",
    "Consejo recomendado pero opcional que ayuda a las personas a cumplir una política."
   ],
   [
    "Policy exception (excepción a la política)",
    "Aprobación documentada y con límite de tiempo para desviarse de un requisito, normalmente con controles compensatorios."
   ]
  ],
  "example": "La junta directiva de un banco aprueba una política que exige autenticación robusta para el acceso remoto. El equipo de seguridad publica un estándar que requiere MFA resistente al phishing (FIDO2) para los administradores y MFA basada en app para el resto del personal, además de un procedimiento para registrar nuevas llaves de seguridad. Cuando una aplicación heredada no puede soportar MFA, su responsable presenta una excepción que vence en seis meses y agrega restricciones por IP como control compensatorio.",
  "tip": "Si una pregunta plantea dónde debe ir un valor técnico específico (algoritmo, longitud de clave, longitud de contraseña), la respuesta suele ser un estándar, no una política. Las políticas expresan intención; los estándares expresan requisitos medibles.",
  "check": [
   [
    "¿Dónde debe documentarse el requisito 'TLS 1.2 o posterior'?",
    "En un estándar, porque es un requisito específico y medible que respalda una política de cifrado de mayor nivel y puede cambiar con el tiempo."
   ],
   [
    "¿Por qué importa un proceso de excepciones a la política?",
    "Permite desviaciones controladas, documentadas y con límite de tiempo, con controles compensatorios, de modo que el riesgo sea visible en lugar de que las personas eludan la política de manera informal."
   ]
  ]
 },
 {
  "t": "Security program management: roles and responsibilities (RACI), awareness training, metrics and reporting to leadership",
  "tt": "Gestión del programa de seguridad: roles y responsabilidades (RACI), capacitación de concientización, métricas e informes a la dirección",
  "body": [
   "Un programa de seguridad es el conjunto continuo de personas, procesos y tecnología que pone en práctica la gobernanza. Gestionarlo bien significa que todos saben quién hace qué, que las personas reciben capacitación sobre los riesgos que realmente enfrentan y que la dirección recibe información sobre la que puede actuar.",
   "Los roles comienzan en la cima. La junta directiva y los ejecutivos son dueños del riesgo y fijan el apetito de riesgo. El director de seguridad de la información (CISO) lidera el programa y asesora a la dirección. Los dueños de los datos (data owners, normalmente líderes de negocio) deciden cómo se clasifican sus datos y quién puede acceder a ellos. Los custodios de datos (data custodians) o administradores de sistemas implementan los controles. Los administradores de datos (data stewards) mantienen la calidad y las definiciones de los datos, y los usuarios siguen la política. Un oficial de privacidad o delegado de protección de datos (DPO) atiende las obligaciones de privacidad cuando la regulación lo exige.",
   "Una matriz RACI elimina la ambigüedad en actividades específicas. Para cada tarea indica quién es Responsible (hace el trabajo), Accountable (aprueba y responde por el resultado; solo uno por tarea), Consulted (aporta su opinión antes) e Informed (recibe la información después). Por ejemplo, para cambios en reglas del firewall, el equipo de redes es Responsible, el gerente de redes es Accountable, seguridad es Consulted y la mesa de servicio es Informed.",
   "La capacitación de concientización debe basarse en roles y ser continua, en lugar de una única presentación anual. Todos necesitan lo básico, como reconocer y reportar el phishing; los desarrolladores necesitan codificación segura; los administradores necesitan higiene de cuentas privilegiadas; los ejecutivos necesitan capacitación sobre fraudes dirigidos como el compromiso del correo empresarial (business email compromise). Las simulaciones de phishing son útiles cuando enseñan en lugar de avergonzar, y la medida clave es la tasa de reportes, no solo la tasa de clics.",
   "Las métricas convierten el programa en evidencia. Los indicadores clave de desempeño (KPI) miden qué tan bien funciona un proceso, como el tiempo medio para parchear vulnerabilidades críticas. Los indicadores clave de riesgo (KRI) advierten que el riesgo está aumentando, como el número de sistemas expuestos a internet con vulnerabilidades explotadas conocidas. Los informes para la dirección deben ser breves, basados en tendencias y vinculados al impacto en el negocio y al apetito de riesgo, no una lista de conteos brutos de alertas."
  ],
  "terms": [
   [
    "RACI matrix (matriz RACI)",
    "Tabla que asigna los roles Responsible, Accountable, Consulted e Informed para cada actividad."
   ],
   [
    "Data owner (dueño de los datos)",
    "Líder de negocio que rinde cuentas por la clasificación de un conjunto de datos y por las decisiones de acceso."
   ],
   [
    "Data custodian (custodio de datos)",
    "Persona o equipo que implementa y opera los controles que protegen los datos."
   ],
   [
    "KPI",
    "Indicador clave de desempeño (key performance indicator): una medida de qué tan bien funciona un proceso."
   ],
   [
    "KRI",
    "Indicador clave de riesgo (key risk indicator): una medida que señala una exposición creciente a un riesgo."
   ]
  ],
  "example": "Un CISO reemplaza un informe mensual de 40 páginas con conteos de alertas por un tablero de una página: cumplimiento del SLA de parches en sistemas críticos, tasa de reporte de phishing, número de excepciones de riesgo vencidas y avance en los cinco riesgos principales. Ahora la junta directiva puede ver que las excepciones están creciendo y pide a los dueños de negocio que las cierren.",
  "tip": "En una RACI, solo una parte es Accountable por una tarea. Cuando una pregunta plantea quién es dueño de la decisión sobre la clasificación o el acceso a los datos, la respuesta es el dueño de los datos (data owner), no el administrador que configura el sistema.",
  "check": [
   [
    "¿Quién decide cómo se clasifica una base de datos de clientes: el administrador de la base de datos o el jefe de ventas?",
    "El jefe de ventas, como dueño de los datos; el DBA es un custodio que implementa los controles."
   ],
   [
    "Da un KPI y un KRI para la gestión de vulnerabilidades.",
    "KPI: porcentaje de vulnerabilidades críticas corregidas dentro del SLA. KRI: cantidad de activos expuestos a internet con vulnerabilidades explotadas conocidas abiertas."
   ]
  ]
 },
 {
  "t": "Change, configuration and asset management governance, including CMDB and data inventory",
  "tt": "Gobernanza de la gestión de cambios, configuración y activos, incluidos la CMDB y el inventario de datos",
  "body": [
   "No puedes proteger lo que no sabes que tienes, y no puedes mantenerlo seguro si cambia sin que nadie lo note. La gestión de activos, de configuración y de cambios son los procesos de gobernanza que responden tres preguntas: qué poseemos, cómo debe estar configurado y quién aprobó cada cambio.",
   "La gestión de activos mantiene un inventario de hardware, software, recursos en la nube y datos, cada uno con un responsable, una ubicación, una criticidad y un estado de ciclo de vida. Las herramientas de descubrimiento, los agentes de endpoint y las API de la nube alimentan el inventario para que se mantenga actualizado. El inventario de software debe incluir las versiones para poder cruzar rápidamente las vulnerabilidades recién anunciadas. Los activos que llegan al fin de vida o al fin de soporte necesitan un plan: actualizar, reemplazar, aislar o aceptar formalmente el riesgo.",
   "Una base de datos de gestión de configuración (CMDB) almacena elementos de configuración (CI) y las relaciones entre ellos: qué servidores soportan qué aplicación, qué aplicación depende de qué base de datos. Esas relaciones hacen posible el análisis de impacto. Una línea base de seguridad define la configuración aprobada para un tipo de CI, y las herramientas de gestión de configuración la aplican e informan las desviaciones (drift).",
   "La gestión de cambios hace que los cambios sean deliberados. Una solicitud de cambio describe qué cambiará, por qué, el riesgo y el impacto, el plan de pruebas y el plan de reversión. Un comité asesor de cambios (CAB) revisa los cambios normales; los cambios estándar son rutinas de bajo riesgo preaprobadas; los cambios de emergencia se aceleran, pero se documentan y se revisan después. Se debe consultar a seguridad en los cambios que alteran la exposición, como reglas de firewall o nuevos servicios expuestos a internet.",
   "Un inventario de datos, a veces llamado mapa de datos, registra qué datos tienes, su clasificación, dónde residen, quién es su dueño, cuánto tiempo se conservan y hacia dónde fluyen, incluso hacia terceros. Es esencial para las regulaciones de privacidad (registros de actividades de tratamiento), la prevención de pérdida de datos, el análisis de impacto de una brecha y la eliminación segura."
  ],
  "terms": [
   [
    "CMDB",
    "Base de datos de gestión de configuración (configuration management database): registro de los elementos de configuración y sus relaciones."
   ],
   [
    "Configuration item (CI, elemento de configuración)",
    "Cualquier componente gestionado bajo control de configuración, como un servidor, una aplicación o un dispositivo de red."
   ],
   [
    "Change advisory board (CAB, comité asesor de cambios)",
    "Grupo que revisa y aprueba los cambios normales según su riesgo e impacto."
   ],
   [
    "Back-out plan (plan de reversión)",
    "Pasos documentados para revertir un cambio si falla."
   ],
   [
    "Data inventory (inventario de datos)",
    "Registro de los conjuntos de datos, su clasificación, ubicación, dueño, retención y flujos."
   ]
  ],
  "example": "Cuando se anuncia una vulnerabilidad crítica en un paquete de servidor web, un minorista consulta su CMDB para encontrar todos los CI que ejecutan la versión afectada, ve qué aplicaciones de cara al cliente dependen de ellos y registra primero cambios de emergencia para esos. El inventario de datos muestra cuáles de esas aplicaciones almacenan datos de tarjetahabientes, así que el equipo de cumplimiento conoce el alcance potencial.",
  "tip": "Espera preguntas en las que la causa raíz es un cambio no aprobado o no documentado. La solución suele ser de proceso: canalizar los cambios mediante la gestión de cambios con pruebas y planes de reversión, y detectar las desviaciones respecto a la línea base.",
  "check": [
   [
    "¿Qué aporta una CMDB más allá de una simple lista de activos?",
    "Las relaciones entre elementos de configuración, para que puedas analizar el impacto de un cambio o de una interrupción en los servicios dependientes."
   ],
   [
    "¿Cómo se manejan los cambios de emergencia?",
    "Una autoridad designada los aprueba rápidamente, se implementan y luego el CAB los documenta y revisa después."
   ]
  ]
 },
 {
  "t": "Risk management activities: impact analysis, risk assessment, risk appetite and tolerance, risk treatment and risk registers",
  "tt": "Actividades de gestión de riesgos: análisis de impacto, evaluación de riesgos, apetito y tolerancia al riesgo, tratamiento de riesgos y registros de riesgos",
  "body": [
   "El riesgo es la probabilidad de que una amenaza explote una vulnerabilidad y cause daño a un activo, ponderada por el impacto si llega a ocurrir. La gestión de riesgos es el ciclo repetitivo de identificar riesgos, evaluarlos, decidir qué hacer y monitorear el resultado. SecurityX espera que lideres este ciclo y lo comuniques a la dirección.",
   "La evaluación de riesgos puede ser cualitativa, cuantitativa o una mezcla. La evaluación cualitativa califica la probabilidad y el impacto en escalas como bajo, medio y alto, a menudo en un mapa de calor; es rápida y sirve para la mayoría de los riesgos. La evaluación cuantitativa usa dinero: la expectativa de pérdida única (SLE) es el valor del activo por el factor de exposición; la tasa anualizada de ocurrencia (ARO) es cuántas veces ocurre por año; la expectativa de pérdida anualizada (ALE) es SLE por ARO. Un control se justifica en costos cuando reduce la ALE en más de lo que cuesta por año.",
   "El riesgo inherente es el nivel antes de los controles; el riesgo residual es lo que queda después de los controles. La dirección fija el apetito de riesgo (risk appetite), la cantidad de riesgo que está dispuesta a aceptar para perseguir sus objetivos, y la tolerancia al riesgo (risk tolerance), la variación aceptable alrededor de ese apetito. Cuando el riesgo residual supera el apetito, debe tratarse más o ser aceptado formalmente por alguien con autoridad para hacerlo.",
   "Hay cuatro opciones de tratamiento. Mitigar, agregando controles. Transferir, trasladando el impacto financiero, por ejemplo con seguros o contratos; la rendición de cuentas sigue siendo tuya. Evitar, dejando de realizar la actividad. Aceptar, documentando la decisión, normalmente para riesgos bajos o cuando el tratamiento cuesta más que la pérdida potencial.",
   "Un registro de riesgos (risk register) documenta cada riesgo con una descripción, dueño, probabilidad, impacto, puntuaciones inherente y residual, tratamiento, fechas límite y estado. Es un documento vivo que se revisa con regularidad, y los indicadores clave de riesgo ayudan a mostrar cuándo un riesgo está creciendo. El análisis de impacto en la gestión de cambios y en la continuidad del negocio alimenta el registro con las consecuencias de perder un sistema o proceso."
  ],
  "terms": [
   [
    "Annualized loss expectancy (ALE, expectativa de pérdida anualizada)",
    "Pérdida anual esperada de un riesgo: la expectativa de pérdida única multiplicada por la tasa anualizada de ocurrencia."
   ],
   [
    "Risk appetite (apetito de riesgo)",
    "Cantidad y tipo de riesgo que una organización está dispuesta a aceptar en la búsqueda de sus objetivos."
   ],
   [
    "Residual risk (riesgo residual)",
    "Riesgo que permanece después de aplicar los controles."
   ],
   [
    "Risk transference (transferencia del riesgo)",
    "Trasladar parte del impacto financiero de un riesgo a otra parte, como una aseguradora."
   ],
   [
    "Risk register (registro de riesgos)",
    "Lista documentada de riesgos con dueños, puntuaciones, tratamientos y estado."
   ]
  ],
  "example": "Una empresa estima que el robo de una laptop que exponga datos de clientes costaría 200.000 USD (SLE) y espera que ocurra una vez cada cuatro años (ARO 0,25), lo que da una ALE de 50.000 USD. El cifrado de disco completo en toda la flota cuesta 15.000 USD al año y reduciría el factor de exposición casi a cero, así que el control está claramente justificado y el registro de riesgos se actualiza con la puntuación residual más baja.",
  "tip": "Comprar un seguro es transferencia, no mitigación; no cambia la probabilidad del evento. Y solo una persona con la autoridad adecuada puede aceptar un riesgo por encima del apetito, no el analista que lo evaluó.",
  "check": [
   [
    "Una interrupción cuesta 30.000 USD por evento y ocurre tres veces al año. ¿Cuál es la ALE?",
    "90.000 USD (SLE de 30.000 USD multiplicada por ARO de 3)."
   ],
   [
    "¿Qué debe ocurrir cuando el riesgo residual supera el apetito?",
    "Aplicar más tratamiento, o que un ejecutivo con autoridad lo acepte formalmente y documente la decisión."
   ]
  ]
 },
 {
  "t": "Third-party and supply chain risk management: vendor assessments, SBOMs, contracts and right to audit",
  "tt": "Gestión de riesgos de terceros y de la cadena de suministro: evaluaciones de proveedores, SBOM, contratos y derecho de auditoría",
  "body": [
   "Gran parte de tu riesgo hoy reside en otras empresas: proveedores de nube, proveedores SaaS, proveedores de servicios gestionados, proveedores de software y los componentes de código abierto dentro de tu propio código. Un compromiso de la cadena de suministro puede alcanzar a miles de clientes a la vez, por lo que la gestión de riesgos de terceros es una responsabilidad central de nivel sénior.",
   "Empieza por clasificar a los proveedores por niveles. Un proveedor que almacena datos regulados o tiene acceso de red a producción es de alto riesgo y recibe una evaluación profunda; un proveedor que suministra muebles de oficina, no. La debida diligencia para proveedores de alto riesgo incluye cuestionarios de seguridad, evidencia independiente como un informe SOC 2 Type II o un certificado ISO/IEC 27001, resúmenes de pruebas de penetración, estabilidad financiera, y dónde almacenan los datos y qué subencargados (subprocessors) utilizan.",
   "Un informe SOC 2 Type I evalúa el diseño de los controles en un momento dado; un informe Type II prueba si operaron eficazmente durante un período, lo cual es evidencia más sólida. Un cuestionario autocompletado es útil para definir el alcance, pero no está verificado de forma independiente.",
   "Los contratos convierten las expectativas en obligaciones. Las cláusulas importantes incluyen requisitos de seguridad, plazos de notificación de brechas, derecho de auditoría (o a recibir informes de auditoría), propiedad de los datos y su devolución o destrucción al final del contrato, aprobación de subencargados, acuerdos de nivel de servicio, responsabilidad y seguros. Un acuerdo marco de servicios (MSA) fija los términos generales; un acuerdo de tratamiento de datos (DPA) cubre las obligaciones de privacidad; los memorandos de entendimiento (MOU) y los acuerdos de seguridad de interconexión (ISA) son comunes entre organizaciones que comparten sistemas.",
   "En el caso del software, una lista de materiales de software (SBOM) enumera cada componente y versión de un producto, a menudo en formato SPDX o CycloneDX. Con las SBOM puedes responder en minutos si una falla recién divulgada en una biblioteca te afecta. Otros controles de la cadena de suministro incluyen la firma de código, la verificación de hashes y firmas de las descargas, las atestaciones de procedencia de los builds y el monitoreo continuo de los proveedores en lugar de hacerlo solo al incorporarlos. La desvinculación también importa: revoca el acceso y confirma la destrucción de los datos cuando termina la relación."
  ],
  "terms": [
   [
    "SOC 2 Type II",
    "Informe de un auditor independiente sobre si los controles de una organización de servicios operaron eficazmente durante un período de tiempo."
   ],
   [
    "SBOM",
    "Lista de materiales de software (software bill of materials): inventario de los componentes y versiones de un producto de software."
   ],
   [
    "Right to audit (derecho de auditoría)",
    "Cláusula contractual que permite al cliente auditar los controles del proveedor u obtener evidencia de auditoría de ellos."
   ],
   [
    "Subprocessor (subencargado)",
    "Tercero que un proveedor utiliza para tratar los datos del cliente."
   ],
   [
    "Vendor tiering (clasificación de proveedores por niveles)",
    "Clasificar a los proveedores según el riesgo que representan para que el esfuerzo de evaluación corresponda al riesgo."
   ]
  ],
  "example": "Antes de firmar con un proveedor SaaS de nómina, una empresa revisa su informe SOC 2 Type II, observa una excepción sobre revisiones de acceso atrasadas y exige una cláusula contractual de notificación de brechas en 48 horas y evidencia anual de que las revisiones de acceso se corrigieron. Meses después se anuncia una biblioteca de código abierto vulnerable; la SBOM del proveedor muestra que el producto no la incluye, y el equipo de riesgos cierra la consulta ese mismo día.",
  "tip": "Type II supera a Type I porque cubre la eficacia operativa a lo largo del tiempo. Cuando una pregunta plantea cómo encontrar rápidamente qué productos contienen un componente vulnerable, piensa en SBOM.",
  "check": [
   [
    "¿Por qué el cuestionario de seguridad de un proveedor, por sí solo, es evidencia débil?",
    "El proveedor lo responde sobre sí mismo; no está verificado de forma independiente como un informe SOC 2 Type II o una certificación."
   ],
   [
    "Menciona tres cláusulas contractuales importantes para un proveedor que almacenará datos de clientes.",
    "Plazo de notificación de brechas, derecho de auditoría y devolución o destrucción de los datos al final del contrato (también aprobación de subencargados y requisitos de seguridad)."
   ]
  ]
 },
 {
  "t": "Business continuity and disaster recovery planning: BIA, RTO, RPO and plan testing",
  "tt": "Planificación de continuidad del negocio y recuperación ante desastres: BIA, RTO, RPO y pruebas del plan",
  "body": [
   "La continuidad del negocio (BC) mantiene en funcionamiento las funciones críticas del negocio durante una interrupción; la recuperación ante desastres (DR) restaura la tecnología de la que dependen esas funciones. Ambas comienzan con un análisis de impacto en el negocio (BIA), que identifica los procesos críticos, los sistemas y las personas de los que dependen, y con qué rapidez su pérdida causa un daño inaceptable.",
   "El BIA fija los objetivos de recuperación. El tiempo máximo tolerable de inactividad (MTD) es cuánto tiempo puede estar no disponible un proceso antes de que el daño sea inaceptable. El objetivo de tiempo de recuperación (RTO) es el tiempo meta para restaurar un sistema, y debe ser menor que el MTD. El objetivo de punto de recuperación (RPO) es la pérdida máxima aceptable de datos medida en tiempo; un RPO de 15 minutos requiere respaldos o replicación al menos con esa frecuencia. El tiempo de recuperación del trabajo (WRT) es el tiempo necesario después de la restauración para verificar los datos y reanudar el trabajo.",
   "Los objetivos determinan el diseño y el costo. Un RTO y un RPO cortos pueden requerir replicación síncrona y un sitio caliente (hot site) o un despliegue activo-activo; objetivos más largos pueden cumplirse restaurando respaldos en un sitio tibio (warm) o frío (cold). Los respaldos deben seguir una regla como 3-2-1 (tres copias, dos tipos de medios, una fuera del sitio) con al menos una copia inmutable o fuera de línea para sobrevivir al ransomware, y las restauraciones deben probarse.",
   "Los planes necesitan pruebas, de la menos a la más disruptiva: una revisión de lista de verificación, un ejercicio de mesa (tabletop, discusión de un escenario), un recorrido o simulación, una prueba en paralelo (levantar el entorno de recuperación junto a producción) y una prueba de interrupción total (hacer realmente la conmutación por error). Cada prueba debe producir hallazgos y actualizaciones del plan.",
   "Los planes también deben cubrir a las personas y la comunicación: quién declara un desastre, árboles de llamadas, lugares de trabajo alternos, dependencias de proveedores y cómo comunicarse con clientes y reguladores. Mantén copias del plan disponibles cuando los sistemas principales estén caídos."
  ],
  "terms": [
   [
    "Business impact analysis (BIA, análisis de impacto en el negocio)",
    "Análisis de los procesos críticos, sus dependencias y el impacto de su pérdida a lo largo del tiempo."
   ],
   [
    "RTO",
    "Objetivo de tiempo de recuperación (recovery time objective): el tiempo meta para restaurar un sistema o proceso tras una interrupción."
   ],
   [
    "RPO",
    "Objetivo de punto de recuperación (recovery point objective): la cantidad máxima aceptable de pérdida de datos, medida en tiempo."
   ],
   [
    "MTD",
    "Tiempo máximo tolerable de inactividad (maximum tolerable downtime): lo máximo que un proceso puede estar caído antes de que el daño sea inaceptable."
   ],
   [
    "Tabletop exercise (ejercicio de mesa)",
    "Recorrido basado en discusión de un escenario para probar roles, decisiones y comunicación."
   ]
  ],
  "example": "El BIA de un minorista en línea muestra que el sistema de pedidos tiene un MTD de cuatro horas. El equipo fija un RTO de dos horas y un RPO de 15 minutos, replica la base de datos a una segunda región cada pocos segundos y conserva respaldos diarios inmutables. Un ejercicio de mesa revela que nadie sabía quién podía autorizar la conmutación por error, así que el plan se actualiza con un responsable de decisión designado y un suplente.",
  "tip": "No confundas el RTO (tiempo para restaurar) con el RPO (tolerancia a la pérdida de datos). Los ejercicios de mesa son solo de discusión; las pruebas en paralelo y de interrupción total tocan sistemas reales, y la prueba de interrupción total es la más disruptiva.",
  "check": [
   [
    "Si el MTD es de 8 horas, ¿puede el RTO ser de 10 horas?",
    "No. El RTO debe ser menor que el MTD; de lo contrario, el negocio sufrirá un daño inaceptable antes de que termine la recuperación."
   ],
   [
    "¿Qué prueba de DR ejecuta el sitio de recuperación junto a producción sin hacer la conmutación?",
    "Una prueba en paralelo."
   ]
  ]
 },
 {
  "t": "Compliance and regulatory impacts: GDPR, HIPAA, PCI DSS, SOX, data sovereignty and industry frameworks",
  "tt": "Cumplimiento e impactos regulatorios: GDPR, HIPAA, PCI DSS, SOX, soberanía de datos y marcos de la industria",
  "body": [
   "El cumplimiento significa satisfacer las obligaciones establecidas por leyes, regulaciones, contratos y estándares de la industria. Los arquitectos de seguridad deben saber qué obligaciones aplican, porque determinan dónde pueden almacenarse los datos, qué controles son obligatorios y con qué rapidez deben reportarse los incidentes. Cumplir no es lo mismo que estar seguro, pero no cumplir trae multas, pérdida de contratos y pérdida de confianza.",
   "El Reglamento General de Protección de Datos de la UE (GDPR) protege los datos personales de las personas en la UE y se aplica a las organizaciones de cualquier lugar que los traten. Exige una base legal para el tratamiento, minimización de datos, seguridad adecuada al riesgo, registros de actividades de tratamiento, evaluaciones de impacto relativas a la protección de datos para el tratamiento de alto riesgo, notificación de brechas a la autoridad de control en un plazo de 72 horas cuando corresponda, y derechos para las personas como el acceso y la supresión.",
   "En EE. UU., HIPAA regula la información de salud protegida (PHI) en manos de las entidades cubiertas y sus asociados comerciales, con salvaguardas administrativas, físicas y técnicas, y reglas de notificación de brechas. La Ley Sarbanes-Oxley (SOX) exige a las empresas que cotizan en bolsa mantener controles internos sobre la información financiera, lo que afecta los controles generales de TI, como la gestión de accesos y la gestión de cambios en los sistemas financieros. PCI DSS es un estándar de la industria creado por las marcas de tarjetas para cualquier organización que almacene, procese o transmita datos de tarjetahabientes; reducir el alcance mediante segmentación y tokenización es un objetivo de arquitectura común.",
   "La soberanía de datos (data sovereignty) significa que los datos están sujetos a las leyes del país donde se encuentran. Algunos países añaden reglas de localización de datos que exigen que ciertos datos permanezcan dentro del país. Esto afecta la elección de la región de nube, las ubicaciones de los respaldos, el acceso de soporte desde otros países y las transferencias transfronterizas, que bajo GDPR necesitan un mecanismo de transferencia como una decisión de adecuación o cláusulas contractuales tipo.",
   "Los marcos de la industria y de cada sector agregan requisitos adicionales, como los estándares NERC CIP para el sistema eléctrico de gran escala de Norteamérica, CMMC para los contratistas de defensa de EE. UU. y diversas normas nacionales de infraestructura crítica. Un enfoque práctico es construir un único conjunto de controles mapeado a todos los requisitos aplicables, de modo que un solo control satisfaga varias obligaciones."
  ],
  "terms": [
   [
    "GDPR",
    "Reglamento de la UE que protege los datos personales, con derechos para las personas y deberes como la notificación de brechas."
   ],
   [
    "PHI",
    "Información de salud protegida (protected health information) regulada por HIPAA en EE. UU."
   ],
   [
    "PCI DSS",
    "Payment Card Industry Data Security Standard, el estándar de seguridad de datos para organizaciones que manejan datos de tarjetahabientes."
   ],
   [
    "Data sovereignty (soberanía de datos)",
    "Principio según el cual los datos están sujetos a las leyes del país donde se almacenan."
   ],
   [
    "Data localization (localización de datos)",
    "Requisito legal de mantener ciertos datos dentro de las fronteras de un país."
   ]
  ],
  "example": "Una startup de salud que se expande a Europa debe cumplir tanto HIPAA para los pacientes de EE. UU. como GDPR para los pacientes de la UE. El arquitecto mantiene los datos de pacientes de la UE en una región de nube de la UE, restringe el acceso de soporte desde fuera de la región, firma acuerdos de tratamiento de datos con los subencargados y mapea los controles de cifrado, registro y revisión de accesos a ambos conjuntos de requisitos para que las auditorías reutilicen la misma evidencia.",
  "tip": "Relaciona la regulación con los datos: datos de tarjetas significa PCI DSS, datos de salud de EE. UU. significa HIPAA, datos personales de la UE significa GDPR, información financiera de empresas que cotizan en bolsa significa SOX. Los requisitos de ubicación apuntan a la soberanía o localización de datos.",
  "check": [
   [
    "Los auditores de una empresa estadounidense que cotiza en bolsa examinan los controles de acceso del sistema de contabilidad general. ¿Qué ley impulsa esto?",
    "SOX, que exige controles internos sobre la información financiera, incluidos los controles generales de TI."
   ],
   [
    "¿Cómo puede la arquitectura reducir el alcance de PCI DSS?",
    "Segmentando el entorno de datos de tarjetahabientes y usando tokenización o procesamiento de pagos tercerizado para que menos sistemas almacenen o toquen números de tarjeta."
   ]
  ]
 },
 {
  "t": "Security frameworks and standards: NIST CSF, NIST SP 800-53, ISO/IEC 27001, CIS Controls and CSA CCM",
  "tt": "Marcos y estándares de seguridad: NIST CSF, NIST SP 800-53, ISO/IEC 27001, CIS Controls y CSA CCM",
  "body": [
   "Los marcos dan estructura a un programa de seguridad para que no tengas que inventar requisitos desde cero. Se dividen en unos pocos tipos: marcos de resultados que describen lo que un programa debe lograr, catálogos de controles que enumeran salvaguardas específicas y estándares de sistemas de gestión que definen cómo operar y mejorar el programa. Las preguntas de SecurityX te piden elegir el que se ajusta a una situación.",
   "El NIST Cybersecurity Framework (CSF) 2.0 organiza los resultados en seis funciones: Govern, Identify, Protect, Detect, Respond y Recover (Gobernar, Identificar, Proteger, Detectar, Responder y Recuperar). Es voluntario, neutral respecto del sector y útil para comunicar la madurez a la dirección mediante perfiles actuales y objetivo. Remite a catálogos de controles para el detalle en lugar de enumerar cada control por sí mismo.",
   "NIST SP 800-53 es un gran catálogo de controles de seguridad y privacidad agrupados en familias como Access Control (AC), Audit and Accountability (AU), Configuration Management (CM) e Incident Response (IR). Los sistemas federales de EE. UU. seleccionan líneas base de él, y NIST SP 800-37, el Risk Management Framework, describe el proceso de categorizar, seleccionar, implementar, evaluar, autorizar y monitorear los controles.",
   "ISO/IEC 27001 especifica los requisitos de un sistema de gestión de seguridad de la información (ISMS): alcance, evaluación de riesgos, declaración de aplicabilidad, auditoría interna, revisión por la dirección y mejora continua. Las organizaciones pueden certificarse en él mediante organismos acreditados. ISO/IEC 27002 ofrece orientación para implementar los controles, e ISO/IEC 27701 extiende el ISMS a la privacidad.",
   "Los CIS Critical Security Controls son una lista priorizada de salvaguardas agrupadas en grupos de implementación, útil para organizaciones que quieren un punto de partida práctico. La Cloud Controls Matrix de la Cloud Security Alliance (CSA CCM) es un marco de controles para la computación en la nube, y el registro CSA STAR permite a los proveedores publicar evaluaciones basadas en ella. Mapear los marcos entre sí permite que un control satisfaga varias obligaciones."
  ],
  "terms": [
   [
    "NIST CSF",
    "Marco de resultados voluntario con seis funciones: Govern, Identify, Protect, Detect, Respond, Recover."
   ],
   [
    "NIST SP 800-53",
    "Catálogo de controles de seguridad y privacidad organizados en familias, muy usado en los sistemas federales de EE. UU."
   ],
   [
    "ISMS (sistema de gestión de seguridad de la información)",
    "Políticas, procesos y controles que se usan para gestionar el riesgo de seguridad, según lo define ISO/IEC 27001."
   ],
   [
    "Statement of applicability (declaración de aplicabilidad)",
    "Documento de ISO/IEC 27001 que indica qué controles aplican, si están implementados y por qué."
   ],
   [
    "CSA CCM",
    "Marco de controles de la Cloud Security Alliance para la computación en la nube."
   ]
  ],
  "example": "Una empresa SaaS mediana consigue un cliente corporativo europeo que exige la certificación ISO/IEC 27001. La empresa construye su ISMS, usa los CIS Controls para priorizar el trabajo técnico, mapea sus controles a la CSA CCM para los requisitos específicos de la nube e informa el avance a su junta directiva usando perfiles actuales y objetivo del NIST CSF.",
  "tip": "Si la pregunta requiere certificación por un auditor acreditado, elige ISO/IEC 27001. Si requiere un catálogo detallado de controles para sistemas federales, elige NIST SP 800-53. Si requiere una forma de alto nivel de describir y comunicar la madurez del programa, elige NIST CSF.",
  "check": [
   [
    "¿En qué estándar ISO puede certificarse una organización, 27001 o 27002?",
    "ISO/IEC 27001; la 27002 es una guía de implementación y no es certificable."
   ],
   [
    "¿Qué función agregó NIST CSF 2.0 a las cinco originales?",
    "Govern (Gobernar), que abarca la estrategia, los roles, la política y la supervisión del riesgo de ciberseguridad."
   ]
  ]
 },
 {
  "t": "Legal and privacy considerations: data subject rights, breach notification, e-discovery and legal holds",
  "tt": "Consideraciones legales y de privacidad: derechos de los titulares de datos, notificación de brechas, e-discovery y retenciones legales",
  "body": [
   "Los líderes de seguridad trabajan de cerca con el asesor legal y los equipos de privacidad, porque muchas decisiones de seguridad tienen consecuencias legales. El examen espera que reconozcas cuándo una situación tiene implicaciones legales y que tomes la medida que preserve la posición de la organización.",
   "Las leyes de privacidad otorgan a las personas, llamadas titulares de los datos (data subjects) en GDPR, derechos sobre sus datos personales: a ser informadas, a acceder a ellos, a corregirlos, a que se supriman en ciertas circunstancias, a restringir u oponerse al tratamiento y a la portabilidad de los datos. Atender estos derechos requiere saber dónde residen los datos personales (un inventario de datos), verificar la identidad del solicitante y responder dentro de los plazos legales. La privacidad desde el diseño (privacy by design) significa incorporar estas capacidades desde el inicio en lugar de añadirlas después.",
   "Las reglas de notificación de brechas varían según la ley y la jurisdicción. GDPR exige notificar a la autoridad de control dentro de las 72 horas siguientes a tener conocimiento de una brecha de datos personales que lo amerite, y a las personas afectadas cuando el riesgo para ellas es alto. Los estados de EE. UU. y las normas sectoriales como HIPAA tienen sus propios plazos y umbrales. Los contratos a menudo exigen notificar a los clientes con mayor rapidez. Los planes de respuesta a incidentes deben involucrar al asesor legal desde temprano para que las decisiones de notificación se tomen correctamente y a tiempo.",
   "El descubrimiento electrónico (e-discovery) es el proceso de identificar, preservar, recopilar y producir información almacenada electrónicamente para litigios o investigaciones. Cuando un litigio es razonablemente previsible, la organización debe preservar los datos relevantes. Una retención legal (legal hold) suspende la retención y eliminación normales para los custodios y sistemas relevantes. Destruir datos relevantes después de ese momento, incluso mediante la eliminación automática rutinaria, constituye expoliación (spoliation) y puede dar lugar a sanciones judiciales.",
   "Otras consideraciones legales incluyen la jurisdicción de los datos y de los proveedores de nube, los controles de exportación sobre algunas tecnologías de cifrado, las leyes de monitoreo de empleados que exigen aviso o consentimiento, y trabajar a través del asesor legal para que algunos hallazgos de la investigación puedan quedar cubiertos por el privilegio legal."
  ],
  "terms": [
   [
    "Data subject (titular de los datos)",
    "Persona a la que se refieren los datos personales."
   ],
   [
    "Right to erasure (derecho de supresión)",
    "Derecho de GDPR que permite a las personas solicitar la eliminación de sus datos personales en ciertas circunstancias."
   ],
   [
    "Legal hold (retención legal)",
    "Instrucción de preservar los datos relevantes y suspender la eliminación normal debido a un litigio o investigación."
   ],
   [
    "E-discovery (descubrimiento electrónico)",
    "Identificar, preservar, recopilar y producir información electrónica para procedimientos legales."
   ],
   [
    "Spoliation (expoliación)",
    "Destrucción o alteración de evidencia que debió haberse preservado."
   ]
  ],
  "example": "Una empresa se entera de que un ex gerente de ventas podría demandarla tras su despido. El asesor legal emite una retención legal, y TI suspende la política de retención de correo para el buzón del gerente, el buzón de su jefe y una unidad compartida. Seis meses después, cuando se presenta la demanda, los datos siguen intactos y la empresa puede responder a las solicitudes de descubrimiento sin acusaciones de haber destruido evidencia.",
  "tip": "Cuando se prevé un litigio, la primera acción es preservar los datos con una retención legal, no eliminarlos, copiarlos de un lado a otro por correo ni alterarlos. Cuando una brecha involucra datos personales de la UE, recuerda el plazo de 72 horas para notificar a la autoridad.",
  "check": [
   [
    "¿Cuál es el riesgo de dejar que una política normal de eliminación de correo de 90 días siga corriendo después de que se prevé un litigio?",
    "Se podría destruir evidencia relevante, lo cual es expoliación y puede acarrear sanciones; una retención legal debe suspender la eliminación."
   ],
   [
    "¿Qué debes tener antes de poder responder de forma confiable a las solicitudes de acceso de los titulares de los datos?",
    "Un inventario de datos preciso que muestre dónde se almacenan y tratan los datos de cada persona, además de un proceso de verificación de identidad."
   ]
  ]
 },
 {
  "t": "Threat modeling methods: STRIDE, PASTA, attack trees, MITRE ATT&CK and attack surface analysis",
  "tt": "Métodos de modelado de amenazas: STRIDE, PASTA, árboles de ataque, MITRE ATT&CK y análisis de la superficie de ataque",
  "body": [
   "El modelado de amenazas es una forma estructurada de preguntarse qué podría salir mal con un sistema y qué harás al respecto, idealmente durante el diseño, cuando los cambios son más baratos. Un ciclo simple sirve para cualquier método: modelar el sistema, identificar amenazas, decidir mitigaciones y validar que las mitigaciones funcionan.",
   "La mayoría de los modelos comienzan con un diagrama de flujo de datos que muestra entidades externas, procesos, almacenes de datos, flujos de datos y límites de confianza. Los límites de confianza (trust boundaries), donde los datos pasan de zonas menos confiables a zonas más confiables, son donde se concentran las amenazas, por ejemplo entre internet y un nivel web o entre una aplicación y su base de datos.",
   "STRIDE es una regla mnemotécnica para seis categorías de amenazas: Spoofing (suplantar a alguien, contrarrestado con autenticación), Tampering (modificar datos, contrarrestado con controles de integridad), Repudiation (negar una acción, contrarrestado con registros y firmas), Information disclosure (divulgación de información, contrarrestada con cifrado y control de acceso), Denial of service (denegación de servicio, contrarrestada con controles de disponibilidad) y Elevation of privilege (elevación de privilegios, contrarrestada con autorización y mínimo privilegio). Se aplica a cada elemento del diagrama.",
   "PASTA (Process for Attack Simulation and Threat Analysis) es un método de siete etapas centrado en el riesgo que parte de los objetivos del negocio y termina con el análisis de riesgo e impacto, por lo que se adapta a equipos que necesitan vincular las amenazas con el impacto en el negocio. Los árboles de ataque descomponen un objetivo del atacante en ramas de subpasos alternativos y obligatorios, lo que ayuda a encontrar el camino más barato que podría tomar un atacante y dónde un solo control bloquea muchas ramas.",
   "MITRE ATT&CK es una base de conocimiento de tácticas reales de adversarios (objetivos como la persistencia o el movimiento lateral) y técnicas (cómo los logran). Ayuda a que los modelos de amenazas reflejen cómo se comportan realmente los atacantes y se mapea directamente a la cobertura de detección. El análisis de la superficie de ataque enumera todos los puntos de entrada que un atacante podría usar, como puertos expuestos, API, entradas de usuario, integraciones con terceros y personas, y busca reducirlos."
  ],
  "terms": [
   [
    "Trust boundary (límite de confianza)",
    "Punto de un sistema donde los datos o el control pasan entre áreas con distintos niveles de confianza."
   ],
   [
    "STRIDE",
    "Categorías de amenazas: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
   ],
   [
    "PASTA",
    "Proceso de modelado de amenazas de siete etapas, centrado en el riesgo, que vincula las amenazas con el impacto en el negocio."
   ],
   [
    "Attack tree (árbol de ataque)",
    "Diagrama que descompone el objetivo de un atacante en subpasos alternativos y obligatorios."
   ],
   [
    "Attack surface (superficie de ataque)",
    "Suma de todos los puntos por los que un atacante podría intentar entrar a un sistema o extraer datos de él."
   ]
  ],
  "example": "Un equipo que diseña una API de banca móvil dibuja un diagrama de flujo de datos con un límite de confianza entre la app y el API gateway. Con STRIDE identifican la suplantación del dispositivo (mitigada con tokens vinculados al dispositivo), la manipulación de solicitudes de transferencia (mitigada con firma de solicitudes) y el repudio de transferencias (mitigado con registros de auditoría firmados). Revisan ATT&CK para ver técnicas que los bancos han observado, como el abuso de cuentas válidas, y agregan detecciones.",
  "tip": "STRIDE es una lista de verificación de categorías por elemento que se usa en el diseño; ATT&CK describe el comportamiento real observado de los adversarios; PASTA está centrado en el riesgo y tiene siete etapas. Relaciona el método con la redacción de la pregunta.",
  "check": [
   [
    "¿Qué categoría de STRIDE atiende un registro de auditoría detallado y a prueba de manipulaciones?",
    "Repudiation, porque aporta evidencia de quién realizó una acción."
   ],
   [
    "¿Cuándo elegirías un árbol de ataque?",
    "Cuando quieres descomponer el objetivo de un atacante en caminos alternativos para encontrar la ruta más fácil y los controles que bloquean más ramas."
   ]
  ]
 },
 {
  "t": "AI adoption challenges: AI governance, data privacy, prompt injection, model poisoning and acceptable use",
  "tt": "Desafíos de la adopción de IA: gobernanza de IA, privacidad de datos, inyección de prompts, envenenamiento de modelos y uso aceptable",
  "body": [
   "Las organizaciones están adoptando la inteligencia artificial, en especial la IA generativa y los modelos de lenguaje grandes (LLM), más rápido de lo que pueden gobernarla. SecurityX espera que ayudes al negocio a usar la IA de forma segura en lugar de simplemente bloquearla. Eso implica gobernanza, protección de datos y defensas contra ataques específicos de la IA.",
   "La gobernanza de IA comienza con un inventario de los sistemas y herramientas de IA en uso, una política de uso aceptable que indique las herramientas aprobadas y qué datos pueden ingresarse en ellas, y un proceso de revisión de nuevos casos de uso de IA que considere los riesgos de privacidad, sesgo, legales y de seguridad. Marcos como el NIST AI Risk Management Framework e ISO/IEC 42001 aportan estructura. Debe exigirse supervisión humana para las decisiones de alto impacto, y los resultados deben tratarse como no confiables hasta verificarlos.",
   "La privacidad de los datos es una preocupación importante. Los empleados pueden pegar datos confidenciales en herramientas públicas, y algunos servicios pueden conservar los prompts o usarlos para entrenamiento según sus términos. Los controles incluyen acuerdos empresariales con términos claros sobre el manejo de datos, reglas de clasificación de datos, políticas de DLP y CASB que detecten datos sensibles que se envían a servicios de IA, y minimizar los datos personales usados en el entrenamiento o la recuperación.",
   "La inyección de prompts (prompt injection) ocurre cuando una entrada hace que un modelo ignore sus instrucciones. La inyección directa proviene del propio prompt del usuario; la inyección indirecta oculta instrucciones en contenido que el modelo procesa, como una página web, un documento o un correo. Como un modelo no puede separar de forma confiable las instrucciones de los datos, las defensas son por capas: limitar los permisos del modelo y su acceso a herramientas, mantener las acciones sensibles detrás de una aprobación humana, aislar el contenido no confiable, filtrar entradas y salidas, y monitorear el abuso.",
   "El envenenamiento de modelos y de datos corrompe los datos de entrenamiento o de ajuste fino (fine-tuning) para que el modelo aprenda un comportamiento dañino o sesgado, o un disparador oculto. Las defensas incluyen verificar la procedencia de los datos, controlar quién puede modificar los datos de entrenamiento y los modelos, y probar los modelos antes de desplegarlos. Otros riesgos incluyen el robo de modelos, la inversión de modelos (reconstruir datos de entrenamiento a partir de las salidas), el manejo inseguro de salidas, cuando la salida del modelo se pasa a otros sistemas sin validación, y la dependencia excesiva de salidas que pueden ser inexactas."
  ],
  "terms": [
   [
    "Prompt injection (inyección de prompts)",
    "Entrada diseñada para que un modelo de lenguaje siga las instrucciones del atacante en lugar de las previstas."
   ],
   [
    "Indirect prompt injection (inyección indirecta de prompts)",
    "Inyección de prompts entregada mediante contenido que el modelo procesa, como un documento o una página web."
   ],
   [
    "Data poisoning (envenenamiento de datos)",
    "Corromper los datos de entrenamiento para que un modelo aprenda comportamientos incorrectos, sesgados u ocultos."
   ],
   [
    "Model inversion (inversión de modelos)",
    "Usar las salidas de un modelo para inferir información sobre sus datos de entrenamiento."
   ],
   [
    "AI acceptable use policy (política de uso aceptable de IA)",
    "Reglas sobre qué herramientas de IA pueden usarse, con qué fines y con qué datos."
   ]
  ],
  "example": "Una empresa despliega un asistente interno que puede leer tickets y enviar correos. El arquitecto de seguridad limita al asistente a acceso de solo lectura a los tickets, exige aprobación humana antes de enviar cualquier correo, elimina el texto oculto del contenido de los tickets y registra todos los prompts y acciones. Cuando más tarde un ticket malicioso le indica al modelo que envíe datos de clientes fuera de la empresa, la acción se bloquea en el paso de aprobación.",
  "tip": "Las instrucciones ocultas en datos que el modelo lee son inyección indirecta de prompts; corromper los datos de entrenamiento es envenenamiento. Para empleados que filtran datos en herramientas públicas de IA, la primera respuesta es la gobernanza (política de uso aceptable con herramientas aprobadas) respaldada por controles técnicos como DLP.",
  "check": [
   [
    "¿Por qué se necesitan controles por capas contra la inyección de prompts?",
    "Los modelos no pueden separar de forma confiable las instrucciones de los datos, así que limitas los permisos y el acceso a herramientas, exiges aprobación para las acciones sensibles y filtras entradas y salidas."
   ],
   [
    "¿Cuál es la diferencia entre el envenenamiento de modelos y la inversión de modelos?",
    "El envenenamiento corrompe los datos de entrenamiento para cambiar el comportamiento del modelo; la inversión extrae información sobre los datos de entrenamiento a partir de las salidas del modelo."
   ]
  ]
 },
 {
  "t": "Resilient system design: high availability, redundancy, load balancing, geographic dispersion and graceful degradation",
  "tt": "Diseño de sistemas resilientes: alta disponibilidad, redundancia, balanceo de carga, dispersión geográfica y degradación elegante",
  "body": [
   "La disponibilidad forma parte de la seguridad, y los arquitectos sénior diseñan sistemas que siguen funcionando cuando fallan algunas partes. La resiliencia va más allá de tener repuestos: significa eliminar los puntos únicos de falla, fallar de maneras predecibles, recuperarse automáticamente y demostrar todo esto mediante pruebas.",
   "La alta disponibilidad (HA) suele expresarse como un porcentaje de tiempo de actividad, como 99,9 por ciento, y se logra con redundancia en cada capa: múltiples acometidas eléctricas y unidades UPS, rutas y dispositivos de red redundantes, servidores y bases de datos en clúster o replicados, y más de una persona que sepa operar el sistema. La redundancia solo ayuda cuando las partes redundantes no comparten una falla, así que pregúntate qué tienen en común, como un rack, un centro de datos, una región, un proveedor o un certificado que vence el mismo día.",
   "Los balanceadores de carga distribuyen las solicitudes entre instancias sanas y retiran las que fallan mediante comprobaciones de estado (health checks). Los diseños activo-activo ejecutan todos los nodos a la vez y comparten la carga; los diseños activo-pasivo mantienen un nodo en espera listo para tomar el control. El escalado horizontal agrega más instancias y se adapta a los niveles sin estado; el escalado vertical hace más grande una instancia, pero la mantiene como un punto único de falla.",
   "La dispersión geográfica coloca los componentes en ubicaciones separadas, como múltiples zonas de disponibilidad o regiones, para que un desastre local o una interrupción regional de la nube no derriben todo. Los datos deben replicarse de acuerdo con el objetivo de punto de recuperación, y la conmutación por error, a menudo basada en DNS o mediante un balanceador de carga global, debe estar automatizada o bien ensayada.",
   "La degradación elegante (graceful degradation) significa que un sistema prescinde de funciones no esenciales bajo presión para que su función principal continúe, por ejemplo desactivando las recomendaciones mientras el proceso de pago sigue funcionando. Ideas relacionadas incluyen los circuit breakers que dejan de llamar a una dependencia que falla, la limitación de tasa (rate limiting) y decidir si un control de seguridad debe fallar abierto (fail open, permitir el tráfico cuando falla, favoreciendo la disponibilidad) o fallar cerrado (fail closed, bloquear el tráfico, favoreciendo la seguridad). La ingeniería del caos y las pruebas de conmutación por error confirman que el diseño realmente funciona."
  ],
  "terms": [
   [
    "High availability (alta disponibilidad)",
    "Diseño que mantiene un servicio funcionando con un tiempo de inactividad mínimo, normalmente mediante redundancia y conmutación por error automática."
   ],
   [
    "Active-active (activo-activo)",
    "Configuración en la que todos los nodos redundantes atienden tráfico al mismo tiempo."
   ],
   [
    "Geographic dispersion (dispersión geográfica)",
    "Colocar componentes redundantes en ubicaciones físicas separadas para sobrevivir a desastres locales o regionales."
   ],
   [
    "Graceful degradation (degradación elegante)",
    "Mantener funcionando las funciones principales reduciendo o desactivando las funciones no esenciales bajo presión."
   ],
   [
    "Fail closed (fallar cerrado)",
    "Modo de falla en el que un control bloquea el acceso cuando falla, favoreciendo la seguridad sobre la disponibilidad."
   ]
  ],
  "example": "Una empresa de venta de boletos ejecuta su nivel web en modo activo-activo en tres zonas de disponibilidad detrás de un balanceador de carga y replica su base de datos a una segunda región. Durante la venta de un gran concierto desactiva las animaciones del mapa de asientos y los widgets de recomendaciones para que el proceso de pago siga siendo rápido. Más tarde, una interrupción regional activa la conmutación por error por DNS hacia la segunda región dentro del RTO.",
  "tip": "La redundancia dentro de una sola zona o región no sobrevive a una interrupción regional; busca la dispersión geográfica. El escalado vertical agrega capacidad, pero no redundancia.",
  "check": [
   [
    "¿Por qué dos servidores redundantes pueden fallar a la vez?",
    "Pueden compartir una dependencia, como la misma alimentación eléctrica, rack, zona, región, configuración o certificado, de modo que un solo evento derriba a ambos."
   ],
   [
    "¿Un firewall que protege un sistema de pagos debe fallar abierto o cerrado, y por qué?",
    "Normalmente cerrado, porque permitir todo el tráfico durante una falla expondría sistemas sensibles; la disponibilidad se mantiene con firewalls redundantes."
   ]
  ]
 },
 {
  "t": "Secure network architecture: segmentation, microsegmentation, screened subnets, NAC and software-defined networking",
  "tt": "Arquitectura de red segura: segmentación, microsegmentación, subredes protegidas, NAC y redes definidas por software",
  "body": [
   "La arquitectura de red determina hasta dónde puede moverse un atacante después de obtener un punto de apoyo. Las redes planas permiten que una sola laptop comprometida llegue a todo; las redes segmentadas obligan al tráfico a pasar por puntos de control donde puede filtrarse y registrarse.",
   "La segmentación divide la red en zonas según el nivel de confianza y la función, como estaciones de trabajo de usuarios, servidores, administración, OT y redes de invitados, usando VLAN, subredes, firewalls y listas de control de acceso. El tráfico entre zonas se permite solo cuando es necesario, siguiendo el mínimo privilegio. Una subred protegida (screened subnet), tradicionalmente llamada DMZ, aloja los servicios de cara al público entre un firewall externo y uno interno, de modo que un servidor web comprometido no quede en la red interna.",
   "La microsegmentación aplica políticas hasta el nivel de cada carga de trabajo individual, a menudo usando firewalls basados en host, controles a nivel del hipervisor o grupos de seguridad en la nube vinculados a la identidad o las etiquetas de la carga de trabajo en lugar de direcciones IP. Controla el tráfico este-oeste, el tráfico de servidor a servidor dentro de un centro de datos o una red en la nube, que los firewalls perimetrales nunca ven. Es una técnica central en las arquitecturas zero trust.",
   "El control de acceso a la red (NAC) decide si un dispositivo puede conectarse y dónde queda ubicado. Con IEEE 802.1X, el switch o el punto de acceso actúa como autenticador y pasa las credenciales o certificados a un servidor RADIUS. NAC también puede verificar la postura, como el nivel de parches y el estado del EDR, y colocar los dispositivos que no cumplen en una VLAN de remediación. Las verificaciones sin agente y el MAC authentication bypass atienden dispositivos como impresoras que no pueden ejecutar 802.1X, pero las direcciones MAC pueden falsificarse, por lo que esos dispositivos deben recibir acceso restringido.",
   "Las redes definidas por software (SDN) separan el plano de control, que decide hacia dónde va el tráfico, del plano de datos, que lo reenvía, con un controlador central que programa los dispositivos mediante API. SDN hace que la política de segmentación sea consistente y automatizable, pero el controlador se convierte en un objetivo de alto valor que debe endurecerse, tener acceso controlado y monitorearse. SD-WAN aplica ideas similares a los enlaces de área amplia entre sitios."
  ],
  "terms": [
   [
    "Screened subnet (subred protegida)",
    "Zona de red entre firewalls externos e internos para servicios de cara al público, también llamada DMZ."
   ],
   [
    "Microsegmentation (microsegmentación)",
    "Política granular que controla el tráfico entre cargas de trabajo individuales, incluso dentro de una misma subred."
   ],
   [
    "East-west traffic (tráfico este-oeste)",
    "Tráfico que se mueve lateralmente entre sistemas dentro de una red o centro de datos."
   ],
   [
    "802.1X",
    "Estándar IEEE para el control de acceso a la red basado en puertos, que usa un autenticador y un servidor de autenticación."
   ],
   [
    "SDN",
    "Redes definidas por software (software-defined networking): separar el plano de control en un controlador central que programa los dispositivos de red."
   ]
  ],
  "example": "Después de que una intrusión se propagara de un servidor web a una docena de otros, una empresa aplica microsegmentación para que los servidores web solo puedan comunicarse con el nivel de aplicación por un puerto y no entre sí. También habilita 802.1X con verificaciones de postura para que las laptops sin parches se coloquen en una VLAN de remediación hasta que se actualicen.",
  "tip": "Los firewalls perimetrales manejan el tráfico norte-sur; la microsegmentación maneja el este-oeste. El filtrado por MAC por sí solo es débil porque las direcciones MAC son fáciles de falsificar.",
  "check": [
   [
    "¿Por qué un servidor web público se coloca en una subred protegida en lugar de en la red interna?",
    "Si se compromete, el atacante sigue separado de los sistemas internos por el firewall interno."
   ],
   [
    "¿Cuáles son los tres roles en 802.1X?",
    "El suplicante (cliente), el autenticador (switch o punto de acceso) y el servidor de autenticación (normalmente RADIUS)."
   ]
  ]
 },
 {
  "t": "Zero trust architecture: policy decision and enforcement points, continuous verification and least privilege",
  "tt": "Arquitectura zero trust: puntos de decisión y de aplicación de políticas, verificación continua y mínimo privilegio",
  "body": [
   "Zero trust es un modelo de seguridad que elimina la confianza implícita basada en la ubicación en la red. Estar dentro de la red corporativa ya no significa que una solicitud sea confiable; cada solicitud de acceso se evalúa según la identidad, el dispositivo y el contexto, y el acceso se otorga con el mínimo privilegio necesario, durante el menor tiempo práctico. NIST SP 800-207 describe la arquitectura de referencia.",
   "Los componentes lógicos son el motor de políticas (policy engine, PE), que decide si otorgar el acceso; el administrador de políticas (policy administrator, PA), que ejecuta la decisión estableciendo o cerrando la sesión; y el punto de aplicación de políticas (policy enforcement point, PEP), que se ubica en la ruta de datos frente al recurso y permite o bloquea el tráfico. En conjunto, el PE y el PA se denominan punto de decisión de políticas (policy decision point, PDP). El PDP se basa en señales como la identidad y la pertenencia a grupos, el estado del dispositivo proveniente de la gestión de endpoints, la inteligencia de amenazas, los registros de actividad y la clasificación de los datos.",
   "La verificación continua significa que la confianza no se otorga una sola vez al iniciar sesión y se da por sentada para siempre. Las sesiones se reevalúan cuando cambia el contexto, por ejemplo cuando un dispositivo deja de cumplir, un usuario inicia sesión de repente desde otro país o se intenta una acción riesgosa. El acceso puede reducirse, puede exigirse una autenticación reforzada (step-up) o puede terminarse la sesión.",
   "El mínimo privilegio y la microsegmentación limitan lo que cualquier identidad o carga de trabajo individual puede alcanzar. El acceso just-in-time y just-enough para los administradores elimina los privilegios permanentes. Se espera el cifrado de todo el tráfico, incluso el interno, y una autenticación robusta tanto de usuarios como de servicios.",
   "Los componentes básicos comunes incluyen un proveedor de identidad con MFA y acceso condicional, gestión de dispositivos y verificaciones de postura, acceso a la red zero trust (ZTNA) en lugar de un acceso VPN amplio, microsegmentación y registros detallados que alimentan la analítica. Zero trust es un camino más que un producto único; las organizaciones suelen comenzar por la identidad y sus aplicaciones más críticas."
  ],
  "terms": [
   [
    "Policy engine (motor de políticas)",
    "Componente de zero trust que decide si otorgar el acceso según la política y las señales."
   ],
   [
    "Policy enforcement point (punto de aplicación de políticas)",
    "Componente en la ruta de datos que habilita, monitorea y termina las conexiones según la decisión."
   ],
   [
    "Implicit trust zone (zona de confianza implícita)",
    "Área donde las entidades son confiables por su ubicación; zero trust busca reducirlas al mínimo posible."
   ],
   [
    "Continuous verification (verificación continua)",
    "Reevaluar la confianza durante toda una sesión a medida que cambia el contexto, no solo al iniciar sesión."
   ],
   [
    "Just-in-time access (acceso justo a tiempo)",
    "Otorgar privilegios solo cuando se necesitan y por un tiempo limitado."
   ]
  ],
  "example": "Un contratista inicia sesión en una aplicación de gestión de proyectos. El motor de políticas verifica su identidad, el resultado de la MFA y que su laptop esté gestionada y cumpla, y luego el punto de aplicación permite el acceso solo a esa aplicación. A mitad del día, el agente EDR de la laptop deja de reportar; la siguiente solicitud se reevalúa y el acceso se bloquea hasta que el dispositivo vuelva a estar sano.",
  "tip": "Conoce los roles: el motor de políticas decide, el administrador de políticas ejecuta la decisión y el punto de aplicación de políticas permite o bloquea el tráfico frente al recurso. Zero trust nunca otorga acceso solo porque una solicitud provenga de la red interna.",
  "check": [
   [
    "¿Qué componente se ubica en la ruta de datos frente al recurso?",
    "El punto de aplicación de políticas (PEP)."
   ],
   [
    "Menciona dos señales que podría usar un motor de políticas.",
    "La identidad del usuario y la fortaleza de la autenticación, el cumplimiento del dispositivo, la ubicación, la hora, la inteligencia de amenazas y la sensibilidad del recurso solicitado."
   ]
  ]
 },
 {
  "t": "Security in the software development life cycle: requirements, secure design reviews, SAST, DAST, SCA and CI/CD pipeline security",
  "tt": "Seguridad en el ciclo de vida del desarrollo de software: requisitos, revisiones de diseño seguro, SAST, DAST, SCA y seguridad del pipeline CI/CD",
  "body": [
   "Corregir una falla de seguridad en el diseño cuesta mucho menos que corregirla en producción, por lo que la seguridad pertenece a cada fase del ciclo de vida del desarrollo de software (SDLC). Este enfoque suele llamarse shift left (desplazar a la izquierda), y en DevSecOps las verificaciones de seguridad se automatizan en el pipeline para que se ejecuten en cada cambio.",
   "Comienza con los requisitos de seguridad, como la fortaleza de la autenticación, el registro, el cifrado y la validación de entradas, tomados de fuentes como OWASP ASVS (Application Security Verification Standard), las regulaciones y los modelos de amenazas. Los casos de abuso describen cómo podría usarse indebidamente una funcionalidad. Las revisiones de diseño seguro y el modelado de amenazas examinan la arquitectura antes de escribir el código.",
   "Las pruebas usan varias herramientas complementarias. Las pruebas estáticas de seguridad de aplicaciones (SAST) analizan el código fuente sin ejecutarlo y encajan en los pull requests. El análisis de composición de software (SCA) inventaría las bibliotecas de terceros y de código abierto, señala vulnerabilidades conocidas y problemas de licencias, y puede producir una SBOM. Las pruebas dinámicas de seguridad de aplicaciones (DAST) sondean una aplicación en ejecución desde afuera, como lo haría un atacante, en un entorno de pruebas. Las pruebas interactivas (IAST) instrumentan la aplicación en ejecución durante las pruebas. El fuzzing envía entradas malformadas o aleatorias para encontrar fallos. El escaneo de secretos detecta claves y contraseñas confirmadas en los repositorios. La revisión manual de código y las pruebas de penetración encuentran fallas de lógica que las herramientas pasan por alto.",
   "El propio pipeline CI/CD debe protegerse, porque un atacante que controla el build puede distribuir código malicioso que está firmado y es de confianza. Los controles incluyen protección de ramas con revisiones obligatorias, credenciales del pipeline con mínimo privilegio almacenadas en un gestor de secretos, ejecutores de build efímeros y aislados, dependencias fijadas y verificadas, commits y artefactos firmados, y atestaciones de procedencia del build como las que describe el marco SLSA.",
   "Las compuertas de seguridad (security gates) deben ajustarse para que los hallazgos críticos bloqueen una versión mientras que los hallazgos menores generen tickets; las compuertas demasiado ruidosas terminan siendo eludidas. Métricas como el tiempo de remediación por severidad muestran si el programa está funcionando."
  ],
  "terms": [
   [
    "SAST",
    "Pruebas estáticas de seguridad de aplicaciones (static application security testing): analizar código fuente o binarios sin ejecutarlos."
   ],
   [
    "DAST",
    "Pruebas dinámicas de seguridad de aplicaciones (dynamic application security testing): probar una aplicación en ejecución desde afuera."
   ],
   [
    "SCA",
    "Análisis de composición de software (software composition analysis): identificar componentes de terceros y sus vulnerabilidades y licencias conocidas."
   ],
   [
    "Build provenance (procedencia del build)",
    "Metadatos verificables que describen cómo, dónde y a partir de qué fuentes se construyó un artefacto."
   ],
   [
    "Shift left (desplazar a la izquierda)",
    "Adelantar las actividades de seguridad en el ciclo de vida del desarrollo."
   ]
  ],
  "example": "Un equipo fintech agrega SAST y escaneo de secretos a los pull requests, SCA al build y DAST cada noche contra su entorno de staging. Tras un ataque a la cadena de suministro en las noticias, traslada los builds a ejecutores efímeros, exige dos revisores para los cambios en los archivos del pipeline y firma las imágenes de contenedor con procedencia, de modo que el sistema de despliegue rechaza cualquier cosa que no haya construido el pipeline oficial.",
  "tip": "SAST necesita el código y no una aplicación en ejecución; DAST necesita una aplicación en ejecución y no el código. Las bibliotecas de código abierto vulnerables se encuentran con SCA. Una puerta trasera insertada en el build se atiende con controles de integridad del pipeline, no con más pruebas después del lanzamiento.",
  "check": [
   [
    "¿Qué herramienta detectaría una versión vulnerable conocida de una biblioteca JSON en tu build?",
    "El análisis de composición de software (SCA)."
   ],
   [
    "¿Por qué la firma de código por sí sola no basta para detener un servidor de build comprometido?",
    "El servidor de build firma todo lo que construye, así que el código malicioso insertado durante el build queda firmado como legítimo; el propio proceso de build debe protegerse y atestiguarse."
   ]
  ]
 },
 {
  "t": "Integrating security controls and troubleshooting: firewalls, WAF, proxies, IDS/IPS, SIEM and log collection",
  "tt": "Integración y solución de problemas de controles de seguridad: firewalls, WAF, proxies, IDS/IPS, SIEM y recolección de registros",
  "body": [
   "Los controles de seguridad solo te protegen cuando están bien ubicados, configurados con precisión y producen datos útiles. SecurityX incluye escenarios en los que un control está causando un problema o pasando por alto un ataque, y debes encontrar la corrección puntual en lugar de desactivar la protección.",
   "Los firewalls de red filtran el tráfico por dirección, puerto y protocolo, y los firewalls de nueva generación agregan reconocimiento de aplicaciones, identidad de usuario y prevención de amenazas. Las reglas se procesan en orden, normalmente de arriba hacia abajo con una denegación implícita al final, así que una regla de permiso amplia colocada por encima de una denegación específica la anulará. Los firewalls de aplicaciones web (WAF) inspeccionan las solicitudes HTTP en busca de ataques como inyección y cross-site scripting. Los proxies directos (forward proxies) controlan y registran el acceso web saliente; los proxies inversos (reverse proxies) se ubican delante de los servidores para terminar TLS, balancear la carga y ocultar la estructura interna.",
   "Los sistemas de detección de intrusiones (IDS) alertan sobre tráfico sospechoso, mientras que los sistemas de prevención de intrusiones (IPS) se ubican en línea y pueden bloquearlo. La detección basada en firmas encuentra patrones conocidos; la detección basada en anomalías señala desviaciones respecto de una línea base y produce más falsos positivos. La ubicación importa: un sensor que no puede ver el tráfico descifrado o el tráfico este-oeste pasará por alto los ataques en esos lugares.",
   "Cuando un control bloquea tráfico legítimo (un falso positivo), ajusta la regla específica con una excepción de alcance limitado, como excluir un campo de formulario de una regla del WAF, y documéntala. Cuando un control pasa por alto ataques (un falso negativo), revisa la ubicación, la visibilidad del tráfico cifrado, la actualización de las reglas y si la fuente de registros realmente se está recolectando. La inspección TLS puede romper aplicaciones que usan certificate pinning, lo que normalmente se resuelve con exclusiones puntuales.",
   "Un sistema de gestión de información y eventos de seguridad (SIEM) recolecta, normaliza y correlaciona registros. Los problemas comunes incluyen fuentes de registros faltantes, errores de análisis sintáctico (parsing) que dejan campos vacíos, desfase de hora entre fuentes que rompe la correlación (se corrige con NTP y zonas horarias consistentes), y límites de licencia o de almacenamiento que provocan eventos descartados. La recolección de registros debe ser confiable, estar protegida contra manipulaciones y conservarse según la política."
  ],
  "terms": [
   [
    "Implicit deny (denegación implícita)",
    "Regla predeterminada al final del conjunto de reglas de un firewall que bloquea todo lo que no esté permitido explícitamente."
   ],
   [
    "WAF",
    "Firewall de aplicaciones web (web application firewall): control que inspecciona y filtra las solicitudes HTTP hacia aplicaciones web."
   ],
   [
    "False positive (falso positivo)",
    "Alerta o bloqueo provocado por una actividad legítima."
   ],
   [
    "False negative (falso negativo)",
    "Actividad maliciosa que un control no logra detectar ni bloquear."
   ],
   [
    "Log normalization (normalización de registros)",
    "Convertir registros de distintas fuentes a un formato y nombres de campos comunes para su análisis."
   ]
  ],
  "example": "Después de desplegar un nuevo conjunto de reglas de firewall, el monitoreo interno deja de recibir syslog desde la DMZ. El ingeniero revisa el orden de las reglas y descubre que una nueva regla de denegar todo para la DMZ se colocó por encima de la regla que permite el syslog hacia el recolector. Mover la regla de permiso específica por encima de la denegación restablece el registro sin abrir nada más.",
  "tip": "La respuesta correcta ante un falso positivo es un ajuste preciso, no desactivar el control ni cambiarlo a modo solo detección. Si los eventos aparecen desordenados en el SIEM, revisa primero la sincronización de la hora.",
  "check": [
   [
    "Una regla de denegación específica se coloca debajo de una regla de permiso amplia. ¿Qué sucede?",
    "El permiso amplio coincide primero, así que el tráfico se permite y la denegación nunca tiene efecto."
   ],
   [
    "¿Cuál es la principal diferencia entre un IDS y un IPS?",
    "Un IDS detecta y alerta, normalmente fuera de banda; un IPS se ubica en línea y puede bloquear el tráfico."
   ]
  ]
 },
 {
  "t": "Data security architecture: classification, labeling, DLP, data lifecycle, tokenization and masking",
  "tt": "Arquitectura de seguridad de datos: clasificación, etiquetado, DLP, ciclo de vida de los datos, tokenización y enmascaramiento",
  "body": [
   "Los datos suelen ser lo que buscan los atacantes, así que la arquitectura de seguridad de datos decide cómo se clasifican, protegen y finalmente destruyen. Los controles deben seguir a los datos a dondequiera que vayan, no solo proteger la red que los rodea.",
   "La clasificación asigna un nivel de sensibilidad, como público, interno, confidencial y restringido, según el daño que ocurriría si los datos se divulgaran o alteraran. Los dueños de los datos deciden la clasificación. El etiquetado hace que la clasificación sea visible y legible por máquina mediante etiquetas en los documentos, metadatos o tags, para que otros controles puedan actuar en consecuencia. La clasificación automática puede escanear el contenido en busca de patrones como números de tarjeta o números de identificación nacional.",
   "La prevención de pérdida de datos (DLP) inspecciona los datos en movimiento (correo, cargas web), en reposo (recursos compartidos de archivos, almacenamiento en la nube) y en uso (endpoints: copiar a USB, imprimir, pegar) y aplica la política: registrar, advertir, bloquear, cifrar o poner en cuarentena. DLP funciona mejor con etiquetas más inspección de contenido, y necesita ajustes para no bloquear el trabajo legítimo.",
   "El ciclo de vida de los datos va desde la creación o recolección hasta el almacenamiento, uso, compartición, archivo y destrucción. Cada etapa necesita controles: minimizar lo que recolectas, cifrar en reposo y en tránsito, restringir y registrar el acceso, aplicar calendarios de retención y destruir los datos de forma segura al final, por ejemplo con crypto-shredding (destruir las claves de cifrado) en la nube o con la destrucción física de los medios.",
   "Varias técnicas reducen la exposición y mantienen la utilidad de los datos. La tokenización reemplaza un valor sensible por un token aleatorio y guarda la correspondencia en una bóveda protegida, de modo que solo los sistemas autorizados pueden recuperar el original; es común para números de tarjeta y puede reducir el alcance de PCI DSS. El enmascaramiento de datos oculta todo o parte de un valor, como mostrar solo los últimos cuatro dígitos, o crea datos realistas pero falsos para pruebas. El enmascaramiento estático cambia permanentemente una copia de los datos; el enmascaramiento dinámico oculta los valores en el momento de la consulta según el usuario. La anonimización elimina la posibilidad de identificar a las personas, mientras que la seudonimización reemplaza los identificadores, pero puede revertirse con información adicional. El hashing es unidireccional, pero debe usar sal (salt) cuando el espacio de entradas es pequeño."
  ],
  "terms": [
   [
    "Data classification (clasificación de datos)",
    "Asignar un nivel de sensibilidad a los datos según el impacto de su compromiso."
   ],
   [
    "DLP",
    "Prevención de pérdida de datos (data loss prevention): herramientas y políticas que detectan y detienen el movimiento no autorizado de datos sensibles."
   ],
   [
    "Tokenization (tokenización)",
    "Reemplazar datos sensibles por un token aleatorio, con la correspondencia guardada en una bóveda protegida."
   ],
   [
    "Dynamic data masking (enmascaramiento dinámico de datos)",
    "Ocultar valores de datos en el momento de la consulta o visualización según los permisos de quien los ve."
   ],
   [
    "Crypto-shredding",
    "Hacer irrecuperables los datos cifrados destruyendo de forma segura sus claves de cifrado."
   ]
  ],
  "example": "Una aseguradora etiqueta automáticamente como Confidencial los expedientes de siniestros cuando contienen números de póliza y términos médicos. DLP impide que esos archivos se envíen por correo a direcciones personales y registra el intento. Su equipo de analítica trabaja con una copia tokenizada de la base de datos de siniestros, y los desarrolladores usan datos de prueba con enmascaramiento estático, así que ningún grupo maneja identificadores reales.",
  "tip": "La tokenización es reversible a través de la bóveda y mantiene los valores consistentes para la correlación; el enmascaramiento normalmente oculta o altera permanentemente los valores. Base64 y los hashes rápidos sin sal no protegen los números de tarjeta.",
  "check": [
   [
    "¿Por qué DLP funciona mejor cuando los datos están etiquetados?",
    "Las etiquetas dan una señal de sensibilidad confiable y legible por máquina, así que las políticas pueden actuar de forma consistente sin depender solo de la coincidencia de patrones en el contenido."
   ],
   [
    "¿Cuál es la diferencia entre la anonimización y la seudonimización?",
    "Los datos anonimizados no pueden vincularse de nuevo a una persona; los datos seudonimizados reemplazan los identificadores, pero pueden reidentificarse con información adicional guardada por separado."
   ]
  ]
 },
 {
  "t": "Identity and access architecture: federation (SAML, OIDC, OAuth 2.0), SSO, conditional access and privileged access management",
  "tt": "Arquitectura de identidad y acceso: federación (SAML, OIDC, OAuth 2.0), SSO, acceso condicional y gestión de accesos privilegiados",
  "body": [
   "La identidad es el principal plano de control en los entornos modernos, donde los usuarios y las aplicaciones están repartidos entre centros de datos, nubes y SaaS. La arquitectura de identidad decide cómo las personas y los servicios demuestran quiénes son, cómo se confía en esa prueba entre organizaciones y cómo se otorgan y limitan los privilegios.",
   "El inicio de sesión único (SSO) permite que un usuario se autentique una vez con un proveedor de identidad (IdP) y acceda a muchas aplicaciones, llamadas proveedores de servicios o partes confiantes (relying parties). La federación extiende esa confianza entre organizaciones o servicios en la nube. SAML 2.0 usa aserciones XML firmadas que pasan por el navegador y es común en el SaaS empresarial. OpenID Connect (OIDC) es una capa de identidad sobre OAuth 2.0 que emite un ID token, un JSON Web Token (JWT) firmado que describe al usuario, y es común en las aplicaciones web y móviles modernas.",
   "OAuth 2.0 es un marco de autorización, no un protocolo de autenticación. Permite que un cliente obtenga un access token para llamar a una API en nombre de un usuario con alcances (scopes) limitados, sin manejar la contraseña del usuario. Para aplicaciones web y móviles, el patrón recomendado es el flujo de código de autorización con PKCE (Proof Key for Code Exchange); se desaconseja el antiguo flujo implícito. El flujo de credenciales de cliente (client credentials) se usa para llamadas de servicio a servicio.",
   "Las políticas de acceso condicional evalúan señales al iniciar sesión y durante la sesión, como el usuario y el grupo, el cumplimiento del dispositivo, la ubicación, la sensibilidad de la aplicación y el riesgo del inicio de sesión, y luego permiten, exigen MFA, limitan la sesión o bloquean. La MFA resistente al phishing, como las llaves de seguridad FIDO2 o las passkeys y la autenticación basada en certificados, debe proteger a los administradores y las aplicaciones sensibles.",
   "La gestión de accesos privilegiados (PAM) protege las cuentas que pueden causar más daño. Las prácticas incluyen guardar las credenciales privilegiadas en una bóveda y rotarlas automáticamente, la elevación just-in-time con aprobación y límites de tiempo, la grabación de sesiones, cuentas de administrador separadas, estaciones de trabajo de acceso privilegiado y revisiones periódicas de acceso. La gobernanza de identidades agrega procesos de altas, cambios y bajas (joiner-mover-leaver) y la certificación de los derechos de acceso, para que los permisos no se acumulen con el tiempo."
  ],
  "terms": [
   [
    "Identity provider (IdP, proveedor de identidad)",
    "Sistema que autentica a los usuarios y emite aserciones o tokens para las aplicaciones."
   ],
   [
    "SAML 2.0",
    "Estándar basado en XML para intercambiar aserciones de autenticación entre un IdP y los proveedores de servicios."
   ],
   [
    "OpenID Connect",
    "Capa de autenticación sobre OAuth 2.0 que emite ID tokens."
   ],
   [
    "PKCE",
    "Proof Key for Code Exchange: extensión de OAuth 2.0 que protege el flujo de código de autorización para clientes públicos."
   ],
   [
    "Privileged access management (gestión de accesos privilegiados)",
    "Controles que protegen, limitan, monitorean y auditan las cuentas privilegiadas."
   ]
  ],
  "example": "Una empresa conecta 60 aplicaciones SaaS a su proveedor de identidad usando SAML y OIDC, de modo que quienes se van pierden el acceso en todas partes cuando se deshabilita su única cuenta. El acceso condicional exige dispositivos que cumplan para las aplicaciones de finanzas, y los administradores deben solicitar elevación just-in-time mediante PAM, que graba sus sesiones y retira los derechos después de dos horas.",
  "tip": "OAuth 2.0 es para autorización (access tokens para API); OIDC agrega autenticación (ID tokens); SAML usa aserciones XML. Los derechos de administrador permanentes son el problema que resuelve PAM just-in-time.",
  "check": [
   [
    "La aplicación de un socio necesita leer los archivos de un usuario a través de tu API sin ver su contraseña. ¿Qué estándar se ajusta?",
    "OAuth 2.0, que emite un access token con alcance limitado; junto con OIDC si la aplicación también necesita saber quién es el usuario."
   ],
   [
    "Menciona tres controles de PAM.",
    "Bóveda de credenciales con rotación, elevación just-in-time con aprobación y grabación de sesiones (también cuentas de administrador separadas y estaciones de trabajo de acceso privilegiado)."
   ]
  ]
 },
 {
  "t": "Cloud security architecture: shared responsibility, CASB, SASE, cloud workload protection and CSPM",
  "tt": "Arquitectura de seguridad en la nube: responsabilidad compartida, CASB, SASE, protección de cargas de trabajo en la nube y CSPM",
  "body": [
   "La computación en la nube cambia quién es responsable de qué controles y con qué rapidez cambia la infraestructura. La mayoría de las brechas en la nube provienen de configuraciones erróneas del cliente y de controles de identidad débiles más que de fallas del proveedor, por lo que los arquitectos se enfocan en la configuración, la identidad y la visibilidad.",
   "El modelo de responsabilidad compartida divide las obligaciones. El proveedor siempre protege los centros de datos físicos, el hardware y la infraestructura central. En infraestructura como servicio (IaaS), el cliente gestiona el sistema operativo invitado, las aplicaciones, la configuración de red como los grupos de seguridad, la identidad y los datos. En plataforma como servicio (PaaS), el proveedor también gestiona el sistema operativo y el entorno de ejecución. En software como servicio (SaaS), el cliente gestiona principalmente los usuarios, la configuración de acceso y los datos. El cliente siempre es responsable de sus datos y de quién tiene acceso.",
   "La gestión de la postura de seguridad en la nube (CSPM) verifica continuamente las cuentas en la nube contra políticas y benchmarks y señala configuraciones riesgosas como buckets de almacenamiento públicos, puertos de administración abiertos a internet, registros deshabilitados o bases de datos sin cifrar. Muchas herramientas también pueden corregir los problemas automáticamente. Las plataformas de protección de cargas de trabajo en la nube (CWPP) protegen las cargas de trabajo en sí, incluidas máquinas virtuales, contenedores y funciones serverless, con escaneo de vulnerabilidades, protección en tiempo de ejecución y monitoreo de integridad. Las plataformas de protección de aplicaciones nativas de la nube (CNAPP) combinan estas capacidades.",
   "Un agente de seguridad de acceso a la nube (CASB) da visibilidad y control sobre el uso de SaaS: descubre el shadow IT, aplica DLP a las cargas, controla la compartición riesgosa y detecta actividad inusual. Funciona mediante integración por API con las plataformas SaaS o en línea como proxy.",
   "El borde de servicio de acceso seguro (SASE) combina las redes de área amplia (SD-WAN) con servicios de seguridad entregados desde la nube, que en conjunto se denominan security service edge (SSE): secure web gateway, CASB, acceso a la red zero trust y firewall como servicio. Los usuarios y las sucursales se conectan al punto de presencia del proveedor más cercano, así que la política es la misma dondequiera que trabajen. Otras preocupaciones de la arquitectura en la nube incluyen enviar los registros de cada cuenta a una ubicación central y protegida, separar los entornos en distintas cuentas o suscripciones, y usar infraestructura como código para que las configuraciones puedan revisarse y escanearse."
  ],
  "terms": [
   [
    "Shared responsibility model (modelo de responsabilidad compartida)",
    "División de las obligaciones de seguridad entre un proveedor de nube y su cliente, que varía según el modelo de servicio."
   ],
   [
    "CSPM",
    "Gestión de la postura de seguridad en la nube (cloud security posture management): detección continua de configuraciones riesgosas en la nube."
   ],
   [
    "CWPP",
    "Plataforma de protección de cargas de trabajo en la nube (cloud workload protection platform): seguridad para VM, contenedores y cargas de trabajo serverless."
   ],
   [
    "CASB",
    "Agente de seguridad de acceso a la nube (cloud access security broker): visibilidad y aplicación de políticas sobre el uso de la nube y SaaS."
   ],
   [
    "SASE",
    "Borde de servicio de acceso seguro (secure access service edge): SD-WAN combinado con servicios de seguridad entregados desde la nube."
   ]
  ],
  "example": "Una empresa con 80 cuentas en la nube despliega CSPM y encuentra 14 buckets de almacenamiento legibles por cualquiera y varios grupos de seguridad que permiten SSH desde todo internet. Los corrige, agrega verificaciones de policy as code a su pipeline de infraestructura para que los mismos errores se bloqueen antes del despliegue, y usa un CASB para impedir que los empleados compartan públicamente archivos confidenciales desde la unidad SaaS corporativa.",
  "tip": "En IaaS, el cliente parchea el sistema operativo invitado. Los buckets públicos y los puertos abiertos en varias cuentas apuntan a CSPM; controlar el uso de SaaS y el shadow IT apunta a CASB; las redes convergentes más la seguridad como servicio en la nube apuntan a SASE.",
  "check": [
   [
    "En PaaS, ¿quién parchea el sistema operativo?",
    "El proveedor de nube; el cliente es responsable del código de su aplicación, sus datos, sus identidades y su configuración."
   ],
   [
    "¿Qué hace CSPM que no hace una CWPP?",
    "CSPM verifica la configuración de las cuentas y servicios en la nube; CWPP protege las cargas de trabajo que se ejecutan en ellos."
   ]
  ]
 },
 {
  "t": "Container and serverless security: image scanning, orchestration hardening, secrets management and API gateways",
  "tt": "Seguridad de contenedores y serverless: escaneo de imágenes, endurecimiento de la orquestación, gestión de secretos y API gateways",
  "body": [
   "Los contenedores y las funciones serverless permiten a los equipos desplegar rápidamente, pero crean nuevos lugares donde pueden ocultarse vulnerabilidades y secretos. La seguridad debe incorporarse en la imagen, en el orquestador y en la forma en que los servicios se comunican entre sí.",
   "Una imagen de contenedor se construye a partir de una imagen base más capas de aplicación. Usa imágenes base mínimas y confiables de fuentes verificadas, fija las versiones y reconstruye con regularidad para incorporar parches. Escanea las imágenes en busca de vulnerabilidades conocidas y secretos incrustados en el pipeline y en el registro, firma las imágenes y haz que el clúster admita solo imágenes firmadas de registros aprobados. Los contenedores deben ejecutarse como un usuario que no sea root, con un sistema de archivos de solo lectura cuando sea posible y sin capacidades adicionales de Linux.",
   "Las plataformas de orquestación como Kubernetes necesitan su propio endurecimiento. Restringe el acceso al API server, usa control de acceso basado en roles (RBAC) con cuentas de servicio de mínimo privilegio, mantén las cargas de trabajo en namespaces separados, aplica network policies para que los pods solo se comuniquen con lo que necesitan y exige pod security standards que bloqueen contenedores privilegiados y montajes del host. Mantén el plano de control parcheado, cifra los secretos almacenados y habilita el registro de auditoría.",
   "Los secretos, como claves de API, contraseñas y certificados, nunca deben incorporarse en las imágenes ni en el código fuente, porque cualquiera que descargue la imagen o clone el repositorio los obtiene. Usa un gestor de secretos o el mecanismo de secretos de la plataforma con cifrado y control de acceso, inyecta los secretos en tiempo de ejecución, prefiere credenciales de corta duración e identidades de carga de trabajo en lugar de claves estáticas, y rota cualquier secreto que haya quedado expuesto.",
   "Las funciones serverless eliminan la gestión de servidores, pero sigues siendo dueño del código, sus dependencias, sus permisos y sus disparadores. Dale a cada función un rol de alcance limitado, valida cada entrada de evento y vigila los disparadores demasiado permisivos. Los API gateways se ubican delante de los servicios y las funciones para aplicar autenticación, autorización, limitación de tasa, validación de entradas y registro en un solo lugar. Las service mesh pueden agregar TLS mutuo y políticas entre microservicios."
  ],
  "terms": [
   [
    "Base image (imagen base)",
    "Imagen inicial sobre la que se construye una imagen de contenedor, como una capa mínima de sistema operativo."
   ],
   [
    "Admission control (control de admisión)",
    "Mecanismo de Kubernetes que verifica o bloquea cargas de trabajo, como imágenes sin firmar o pods privilegiados, antes de que se ejecuten."
   ],
   [
    "Network policy",
    "Regla de Kubernetes que limita qué pods pueden comunicarse entre sí."
   ],
   [
    "Secrets manager (gestor de secretos)",
    "Servicio que almacena secretos, controla el acceso a ellos y los rota, entregándolos en tiempo de ejecución."
   ],
   [
    "API gateway",
    "Puerta de entrada para las API que aplica autenticación, limitación de tasa y otras políticas."
   ]
  ],
  "example": "Una revisión de seguridad encuentra una clave de acceso a la nube en un archivo de entorno dentro de una imagen de contenedor de producción. El equipo revoca y rota la clave, reconstruye la imagen sin ella, cambia el servicio a una identidad de carga de trabajo que obtiene credenciales de corta duración y agrega escaneo de secretos al build para que cualquier imagen que contenga una clave haga fallar el pipeline.",
  "tip": "Cada capa de una imagen puede extraerse, así que un secreto en cualquier parte de una imagen queda expuesto; codificarlo no lo oculta. Para limitar el radio de impacto en Kubernetes, piensa en network policies, cuentas de servicio de mínimo privilegio y ningún pod privilegiado.",
  "check": [
   [
    "¿Por qué los contenedores no deben ejecutarse como root?",
    "Si la aplicación se compromete, root dentro del contenedor le da más poder al atacante y hace más dañino un escape del contenedor hacia el host."
   ],
   [
    "¿Qué puede aplicar un API gateway en un solo lugar?",
    "Autenticación, autorización, limitación de tasa, validación de entradas y registro para todos los servicios que están detrás de él."
   ]
  ]
 },
 {
  "t": "Hybrid and multicloud design: connectivity, key management, consistent policy and cloud-to-on-premises integration",
  "tt": "Diseño híbrido y multinube: conectividad, gestión de claves, políticas consistentes e integración de la nube con las instalaciones locales",
  "body": [
   "La mayoría de las grandes organizaciones operan una mezcla de centros de datos locales y más de una nube pública. Cada entorno tiene sus propias herramientas, modelo de identidad y valores predeterminados, así que el trabajo del arquitecto es conectarlos de forma segura y mantener la política consistente para que no se abran brechas entre ellos.",
   "Las opciones de conectividad incluyen VPN IPsec de sitio a sitio a través de internet y conexiones privadas dedicadas que ofrecen los proveedores de nube, las cuales dan un rendimiento más predecible. El tráfico debe cifrarse incluso en los enlaces privados cuando se requiera, las rutas deben limitarse a lo que cada lado necesita y las redes locales no deben simplemente aplanarse dentro de las redes en la nube. Los diseños hub-and-spoke o de tránsito centralizan la inspección y los servicios compartidos.",
   "La identidad debe estar unificada. Federar cada nube con un único proveedor de identidad da inicio de sesión único, MFA y acceso condicional consistentes, y un solo lugar para retirar el acceso cuando alguien se va. Las cargas de trabajo deben usar la identidad de carga de trabajo nativa de cada nube siempre que sea posible, en lugar de claves de larga duración copiadas entre entornos.",
   "La gestión de claves necesita atención especial. Cada nube ofrece su propio servicio de gestión de claves, pero los auditores esperan políticas de claves, rotación y separación de funciones consistentes en todos los entornos. Las opciones incluyen usar un gestor de claves externo o un HSM que se integre con varias nubes, bring your own key (BYOK), donde generas las claves y las importas, y hold your own key (HYOK), donde las claves nunca salen de tu control. Cuanto más control conservas, más responsabilidad operativa asumes.",
   "La política consistente proviene de policy as code, un esquema común de etiquetado y clasificación, el registro centralizado de todos los entornos en un solo SIEM y herramientas de gestión de la postura que cubran todas las nubes. Vigila los costos de salida de datos (egress) y las reglas de residencia de datos al replicar entre nubes, y planifica las distintas formas en que cada proveedor nombra e implementa controles similares."
  ],
  "terms": [
   [
    "Hybrid cloud (nube híbrida)",
    "Entorno que combina infraestructura local con una o más nubes públicas."
   ],
   [
    "Multicloud (multinube)",
    "Uso de servicios de más de un proveedor de nube pública."
   ],
   [
    "BYOK",
    "Bring your own key (trae tu propia clave): generar claves bajo tu control e importarlas a un servicio de claves en la nube."
   ],
   [
    "HYOK",
    "Hold your own key (conserva tu propia clave): mantener las claves en tus propios sistemas para que el proveedor nunca las tenga."
   ],
   [
    "Policy as code (política como código)",
    "Definir reglas de seguridad y cumplimiento en código legible por máquina que se versiona y se aplica automáticamente."
   ]
  ],
  "example": "Una aseguradora procesa los siniestros en sus instalaciones locales, la analítica en una nube y los portales de clientes en otra. Federa ambas nubes con su IdP corporativo, envía todos los registros a un solo SIEM, usa un gestor de claves externo respaldado por HSM e integrado con ambas nubes para que la política de claves y la rotación sean idénticas, y aplica las mismas reglas de etiquetado y cifrado mediante policy as code en cada pipeline.",
  "tip": "Los controles inconsistentes entre entornos apuntan a la centralización: un solo proveedor de identidad, gestión de claves central, registro central y policy as code. Compartir una única clave estática entre entornos nunca es la respuesta correcta.",
  "check": [
   [
    "¿Cuál es la contrapartida de HYOK frente a las claves gestionadas por el proveedor?",
    "HYOK da el máximo control y mantiene las claves fuera del alcance del proveedor, pero tú cargas con el trabajo operativo y algunos servicios en la nube podrían no funcionar con él."
   ],
   [
    "¿Por qué federar todas las nubes con un único proveedor de identidad?",
    "Da autenticación, MFA y acceso condicional consistentes, y un solo lugar para deshabilitar el acceso de quienes se van."
   ]
  ]
 },
 {
  "t": "Secure architecture for remote access and collaboration: VPN, ZTNA, VDI and secure email gateways",
  "tt": "Arquitectura segura para el acceso remoto y la colaboración: VPN, ZTNA, VDI y secure email gateways",
  "body": [
   "El trabajo remoto e híbrido significa que empleados, contratistas y socios se conectan desde redes y dispositivos que no controlas. La arquitectura de acceso remoto debe verificar a los usuarios y dispositivos, limitar lo que pueden alcanzar y proteger los datos en endpoints no gestionados.",
   "Las VPN tradicionales de acceso remoto, que usan IPsec o TLS, crean un túnel cifrado que coloca al usuario en la red interna. Una VPN de túnel completo (full tunnel) envía todo el tráfico a través de la red corporativa para su inspección; un túnel dividido (split tunnel) envía solo el tráfico corporativo por el túnel y deja que el tráfico de internet salga directamente, lo que reduce la carga, pero también la visibilidad. La principal debilidad de las VPN es el acceso amplio a la red: una vez conectado, un dispositivo comprometido puede llegar a mucho más de lo que necesita.",
   "El acceso a la red zero trust (ZTNA), en cambio, intermedia las conexiones a aplicaciones individuales después de verificar la identidad, la MFA y la postura del dispositivo. Los usuarios nunca se unen a la red, las aplicaciones no se exponen directamente a internet y el acceso se reevalúa continuamente. ZTNA es una parte central de las ofertas de security service edge.",
   "La infraestructura de escritorios virtuales (VDI) y las aplicaciones publicadas mantienen los datos en el centro de datos o en la nube y envían al dispositivo del usuario solo imágenes de la pantalla. Esto se adapta a los contratistas y a los dispositivos no gestionados, especialmente cuando se combina con controles sobre el portapapeles, la impresión y la transferencia de archivos. Los jump servers o bastion hosts dan a los administradores un punto de entrada controlado y monitoreado a las redes sensibles.",
   "Las herramientas de colaboración también necesitan controles. Los secure email gateways filtran el correo entrante en busca de spam, malware y phishing, analizan los adjuntos en sandbox, reescriben y verifican los enlaces, y aplican DLP y cifrado al correo saliente. La autenticación de correo con SPF, DKIM y DMARC protege tu dominio contra la suplantación. En las plataformas de chat y de compartición de archivos, gestiona las políticas de compartición externa, acceso de invitados, retención y DLP, y recuerda que las reuniones y grabaciones pueden contener datos sensibles."
  ],
  "terms": [
   [
    "Split tunneling (túnel dividido)",
    "Enviar solo el tráfico corporativo por un túnel VPN mientras el resto del tráfico va directamente a internet."
   ],
   [
    "ZTNA",
    "Acceso a la red zero trust (zero trust network access): acceso por aplicación intermediado después de verificar la identidad y el dispositivo, sin acceso a nivel de red."
   ],
   [
    "VDI",
    "Infraestructura de escritorios virtuales (virtual desktop infrastructure): alojar escritorios de forma centralizada y entregarlos de forma remota."
   ],
   [
    "Bastion host",
    "Servidor endurecido y monitoreado que se usa como punto de entrada controlado para el acceso administrativo."
   ],
   [
    "Secure email gateway",
    "Servicio que filtra el correo en busca de amenazas y aplica políticas como DLP y cifrado."
   ]
  ],
  "example": "Una empresa reemplaza su VPN para 300 contratistas por ZTNA, que otorga a cada contratista acceso solo a las dos aplicaciones de su contrato y únicamente desde dispositivos que pasan una verificación de postura. Los contratistas que necesitan manejar datos de clientes usan un escritorio virtual con el portapapeles y las descargas deshabilitados, así que los datos nunca llegan a sus laptops personales.",
  "tip": "Cuando el requisito es acceder a aplicaciones específicas sin poner a los usuarios en la red, elige ZTNA en lugar de VPN. Cuando los datos nunca deben llegar a un dispositivo no gestionado, VDI es la opción más sólida.",
  "check": [
   [
    "¿Cuál es la contrapartida de seguridad del túnel dividido?",
    "Reduce el ancho de banda del enlace corporativo, pero la organización ya no puede inspeccionar ni filtrar el tráfico de internet del usuario."
   ],
   [
    "¿Por qué VDI podría ser adecuado para contratistas con laptops personales?",
    "Los datos permanecen en el entorno alojado y solo llegan al dispositivo imágenes de la pantalla, en especial con restricciones de portapapeles, impresión y descargas."
   ]
  ]
 },
 {
  "t": "Troubleshooting IAM: authentication failures, federation trust issues, certificate-based auth and MFA problems",
  "tt": "Solución de problemas de IAM: fallas de autenticación, problemas de confianza en la federación, autenticación basada en certificados y problemas de MFA",
  "body": [
   "Los problemas de identidad impiden que las personas trabajen, y las correcciones apresuradas a menudo debilitan la seguridad. SecurityX espera que diagnostiques la causa real a partir de los síntomas y los registros, y que luego la corrijas sin crear nuevos huecos. Un buen hábito es preguntar qué cambió, a quién afecta (un usuario, una aplicación, a todos) y qué componente de la cadena está fallando.",
   "Las fallas de autenticación simples suelen deberse a cuentas vencidas o bloqueadas, cuentas deshabilitadas tras un cambio en RR. HH., nombres principales de usuario (UPN) incorrectos o cambios de contraseña que aún no se han sincronizado desde los directorios locales. Kerberos es sensible al tiempo: si el reloj de un cliente difiere del del controlador de dominio en más del desfase permitido (cinco minutos de forma predeterminada en Active Directory), los tickets se rechazan. Los nombres principales de servicio (SPN) duplicados o faltantes causan fallas de Kerberos en servicios específicos.",
   "Los problemas de federación suelen manifestarse como errores en una aplicación mientras las demás funcionan. El proveedor de servicios valida las aserciones con el certificado de firma del proveedor de identidad, así que cuando el IdP rota ese certificado, todo proveedor de servicios que no se haya actualizado con el nuevo certificado o los nuevos metadatos falla con errores de firma. Otras causas incluyen entity IDs o reply URLs que no coinciden, un desfase de reloj que hace que las aserciones parezcan vencidas o aún no válidas, y atributos (claims) faltantes o con nombres incorrectos que la aplicación necesita para mapear al usuario.",
   "La autenticación basada en certificados, como las tarjetas inteligentes o los certificados de dispositivo para Wi-Fi y VPN, depende de la cadena completa. Verifica que el certificado esté dentro de sus fechas de validez, que las CA emisora y raíz sean de confianza para el verificador, que el certificado tenga el key usage y el extended key usage correctos (por ejemplo, autenticación de cliente) y que la verificación de revocación pueda llegar al punto de distribución de la CRL o al respondedor OCSP. Si la verificación de revocación es obligatoria y no está disponible, la validación falla para todos.",
   "Los problemas de MFA incluyen el desfase de hora en los servidores que validan contraseñas de un solo uso basadas en tiempo (TOTP), usuarios que cambiaron de teléfono sin volver a registrarse, ataques de fatiga de notificaciones push en los que los usuarios aprueban solicitudes que no iniciaron, y políticas de acceso condicional que bloquean inicios de sesión legítimos. Los registros de inicio de sesión del IdP suelen mostrar el motivo exacto de la falla y qué política se aplicó; léelos antes de cambiar cualquier cosa."
  ],
  "terms": [
   [
    "Clock skew (desfase de reloj)",
    "Diferencia entre relojes de sistemas que puede hacer que se rechacen tokens, tickets y códigos sensibles al tiempo."
   ],
   [
    "Signing certificate (certificado de firma)",
    "Certificado que usa un IdP para firmar las aserciones; los proveedores de servicios deben confiar en el vigente."
   ],
   [
    "Extended key usage",
    "Campo del certificado que limita para qué puede usarse el certificado, como autenticación de cliente o de servidor."
   ],
   [
    "CRL distribution point (punto de distribución de la CRL)",
    "Ubicación indicada en un certificado desde donde los verificadores descargan la lista de revocación de certificados."
   ],
   [
    "MFA fatigue (fatiga de MFA)",
    "Ataque que inunda a un usuario con solicitudes push con la esperanza de que apruebe una."
   ]
  ],
  "example": "El lunes por la mañana, los usuarios pueden iniciar sesión en el correo y el chat, pero reciben un error de firma no válida en la aplicación SaaS de RR. HH. El equipo del IdP rotó su certificado de firma de tokens durante el fin de semana y actualizó los metadatos de la mayoría de las aplicaciones, pero la aplicación de RR. HH. se había configurado manualmente. Cargar el nuevo certificado en la aplicación de RR. HH. restablece el acceso para todos.",
  "tip": "Cuando falla una aplicación federada y el resto funciona, sospecha de la configuración de confianza de esa aplicación, en especial de un certificado de firma del IdP desactualizado. Cuando fallan cosas basadas en tiempo solo en un servidor, revisa NTP.",
  "check": [
   [
    "¿Qué hace que un certificado aún vigente sea rechazado cuando se retira el servidor de CRL de la CA?",
    "El verificador no puede confirmar el estado de revocación; si la verificación de revocación es obligatoria, la validación falla cerrada."
   ],
   [
    "¿Dónde deberías mirar primero para entender por qué se bloqueó el inicio de sesión de un usuario?",
    "En los registros de inicio de sesión del proveedor de identidad, que muestran el motivo de la falla y cualquier política de acceso condicional aplicada."
   ]
  ]
 },
 {
  "t": "Endpoint and server hardening: secure baselines, application allow lists, EDR, host firewalls and patching",
  "tt": "Endurecimiento de endpoints y servidores: líneas base seguras, listas de aplicaciones permitidas, EDR, firewalls de host y parches",
  "body": [
   "El endurecimiento (hardening) reduce la superficie de ataque de cada sistema y hace que los ataques que sí logran entrar sean más fáciles de detectar. A escala, endurecer no consiste en hacer clic en configuraciones en cada máquina; consiste en definir una línea base una vez, aplicarla automáticamente y demostrar el cumplimiento de forma continua.",
   "Una línea base segura es la configuración mínima aprobada para una clase de sistemas, a menudo construida a partir de los CIS Benchmarks o de las líneas base de seguridad del fabricante. Abarca eliminar software y servicios innecesarios, deshabilitar protocolos heredados (como SMBv1 y versiones antiguas de TLS), exigir autenticación robusta, configurar las políticas de registro y auditoría, y establecer permisos de archivos y del registro. Las herramientas de gestión de configuración y las directivas de grupo (group policy) la aplican; los escaneos de cumplimiento detectan las desviaciones.",
   "Las listas de aplicaciones permitidas (application allow listing) permiten ejecutar solo software aprobado, según las firmas del editor, las rutas de archivo o los hashes. Son especialmente eficaces en sistemas de función fija como terminales de punto de venta, quioscos y servidores, y bloquean malware desconocido que el antivirus basado en firmas pasaría por alto. Las listas de bloqueo hacen lo contrario y son más débiles, porque solo detienen lo que ya se conoce.",
   "La detección y respuesta en endpoints (EDR) registra actividad detallada, como la creación de procesos, las líneas de comando, las conexiones de red y los cambios en archivos, detecta comportamientos sospechosos y permite a los equipos de respuesta aislar un host, terminar procesos o recolectar evidencia de forma remota. La detección y respuesta extendida (XDR) correlaciona los datos del endpoint con otras fuentes como el correo, la identidad y la red. Los firewalls basados en host restringen las conexiones entrantes y salientes de cada host, lo que limita el movimiento lateral incluso dentro de una subred de confianza. La prevención de intrusiones basada en host y el monitoreo de integridad de archivos añaden protección adicional.",
   "Los parches cierran vulnerabilidades conocidas. Un proceso maduro mantiene un inventario, se suscribe a los avisos de los fabricantes, prioriza según la explotación y la exposición, prueba los parches en un grupo representativo antes del despliegue general y tiene una forma de manejar los sistemas que no pueden parchearse, como el aislamiento o los controles compensatorios. El firmware, los controladores y las aplicaciones de terceros también necesitan parches, no solo el sistema operativo. Otros pasos de endurecimiento incluyen el cifrado de disco completo, deshabilitar puertos e interfaces no usados, la gestión de contraseñas del administrador local y el arranque seguro (secure boot)."
  ],
  "terms": [
   [
    "Secure baseline (línea base segura)",
    "Configuración de seguridad mínima aprobada para un tipo de sistema."
   ],
   [
    "Application allow list (lista de aplicaciones permitidas)",
    "Control que permite ejecutar solo aplicaciones aprobadas."
   ],
   [
    "EDR",
    "Detección y respuesta en endpoints (endpoint detection and response): herramientas que registran la actividad del endpoint, detectan amenazas y apoyan las acciones de respuesta."
   ],
   [
    "Configuration drift (desviación de configuración)",
    "Divergencia entre la configuración real de un sistema y su línea base aprobada."
   ],
   [
    "Host-based firewall (firewall basado en host)",
    "Firewall que se ejecuta en un sistema individual y controla sus propias conexiones de red."
   ]
  ],
  "example": "Las terminales de punto de venta de un minorista se infectan con malware de extracción de memoria (memory scraping) que su antivirus no reconoció. Tras el incidente, el minorista habilita las listas de aplicaciones permitidas para que solo pueda ejecutarse su software de punto de venta firmado, aplica una línea base basada en CIS mediante la gestión de configuración y despliega EDR para alertar sobre comportamientos inusuales de los procesos.",
  "tip": "Para los dispositivos de función fija, las listas de aplicaciones permitidas suelen ser la respuesta más sólida. La ventaja del EDR sobre el antivirus tradicional es la detección conductual y la respuesta, no mejores firmas.",
  "check": [
   [
    "¿Por qué las listas de permitidos son más sólidas que las listas de bloqueo?",
    "Las listas de permitidos bloquean todo lo que no está aprobado, incluido el malware desconocido, mientras que las listas de bloqueo solo detienen el software que ya se sabe que es malicioso."
   ],
   [
    "¿Cómo demuestras que 500 servidores todavía coinciden con su línea base?",
    "Ejecutando escaneos de cumplimiento automatizados contra la línea base e informando las desviaciones, con la gestión de configuración volviendo a aplicar el estado aprobado."
   ]
  ]
 },
 {
  "t": "Hardware security: TPM, HSM, secure boot, measured boot, secure enclaves and firmware integrity",
  "tt": "Seguridad de hardware: TPM, HSM, arranque seguro, arranque medido, enclaves seguros e integridad del firmware",
  "body": [
   "Los controles de software son tan confiables como el hardware y el firmware que tienen debajo. Si un atacante controla el proceso de arranque o el firmware, puede ocultarse del sistema operativo y de todas las herramientas de seguridad que se ejecutan sobre él. Las funciones de seguridad de hardware establecen una raíz de confianza (root of trust) sobre la que se construye el resto del sistema.",
   "Un Trusted Platform Module (TPM) es un pequeño chip, o su equivalente en firmware, presente en un dispositivo. Genera y almacena de forma segura claves que no pueden exportarse, protege las claves de cifrado de disco (por ejemplo, BitLocker puede liberar su clave solo cuando las mediciones del arranque coinciden) y registra las mediciones de los componentes del arranque en registros de configuración de la plataforma (PCR). Un TPM pertenece a un solo dispositivo.",
   "Un módulo de seguridad de hardware (HSM) es un dispositivo, tarjeta o servicio en la nube dedicado y resistente a manipulaciones, diseñado para generar, almacenar y usar muchas claves a alta velocidad para muchas aplicaciones. Los HSM respaldan autoridades de certificación, procesamiento de pagos, firma de código y servicios de gestión de claves en la nube, y a menudo están validados según FIPS 140. Las claves pueden usarse dentro del HSM sin exponerse nunca en texto claro a la aplicación.",
   "UEFI Secure Boot verifica la firma digital de cada componente del arranque, como el cargador de arranque y el kernel, contra claves de confianza almacenadas en el firmware, y se niega a ejecutar cualquier cosa sin firmar o no confiable. El arranque medido (measured boot) no bloquea nada; registra un hash de cada componente en el TPM. Luego, la atestación remota envía un informe firmado de esas mediciones a un verificador, como un servicio de estado de dispositivos o el control de acceso a la red, que decide si el dispositivo es confiable.",
   "Los enclaves seguros y los entornos de ejecución confiables aíslan el código y los datos en un área protegida del procesador para que ni siquiera el sistema operativo o el hipervisor puedan leerlos, protegiendo los datos en uso. La computación confidencial (confidential computing) en la nube se basa en esto. La integridad del firmware también importa: usa actualizaciones de firmware firmadas por el fabricante, protege la configuración del firmware con contraseñas, mantén el firmware parcheado y monitorea los cambios inesperados. Las verificaciones de la cadena de suministro, como comprobar la procedencia del hardware, reducen el riesgo de dispositivos manipulados."
  ],
  "terms": [
   [
    "TPM",
    "Trusted Platform Module: chip vinculado a un dispositivo que almacena claves y mediciones del arranque."
   ],
   [
    "HSM",
    "Módulo de seguridad de hardware (hardware security module): dispositivo o servicio resistente a manipulaciones para la gestión de claves y operaciones criptográficas de alto volumen."
   ],
   [
    "Secure Boot (arranque seguro)",
    "Función de UEFI que permite ejecutar solo componentes de arranque firmados y de confianza."
   ],
   [
    "Measured boot (arranque medido)",
    "Registrar hashes de los componentes del arranque en el TPM para que el estado del arranque pueda verificarse después."
   ],
   [
    "Remote attestation (atestación remota)",
    "Enviar mediciones firmadas del estado de un dispositivo a un verificador que decide si confiar en él."
   ]
  ],
  "example": "Una empresa exige que las laptops pasen una verificación del estado del dispositivo antes de acceder a las aplicaciones internas. Cada laptop usa Secure Boot para bloquear cargadores de arranque no confiables y arranque medido para registrar su cadena de arranque en el TPM. El servicio de estado de dispositivos verifica las mediciones firmadas por el TPM, y la política de acceso condicional bloquea cualquier laptop cuya atestación falle.",
  "tip": "Secure Boot bloquea el código no confiable; el arranque medido registra lo que se ejecutó para que pueda atestiguarse. Un TPM es por dispositivo; un HSM atiende a muchas aplicaciones con alto volumen.",
  "check": [
   [
    "¿Qué componente usaría una autoridad de certificación para proteger su clave de firma?",
    "Un HSM, que almacena la clave en hardware resistente a manipulaciones y realiza la firma sin exponerla."
   ],
   [
    "¿Qué problema atiende un enclave seguro?",
    "Proteger los datos y el código mientras están en uso, incluso frente a un sistema operativo o un hipervisor comprometido."
   ]
  ]
 },
 {
  "t": "Specialized and legacy systems: OT/ICS/SCADA, IoT, embedded systems and compensating controls",
  "tt": "Sistemas especializados y heredados: OT/ICS/SCADA, IoT, sistemas embebidos y controles compensatorios",
  "body": [
   "No todos los sistemas pueden parchearse cada mes o ejecutar un agente EDR. La tecnología operacional (OT), los sistemas de control industrial (ICS), los sistemas de edificios, los dispositivos médicos, el IoT y los servidores antiguos de aplicaciones de negocio suelen ejecutar software desactualizado, tienen una vida útil larga y requisitos estrictos de disponibilidad o seguridad física (safety). Los arquitectos de seguridad los protegen principalmente rodeándolos de controles.",
   "Los ICS incluyen los sistemas de supervisión, control y adquisición de datos (SCADA) que monitorean y controlan activos geográficamente dispersos como oleoductos y redes eléctricas, los sistemas de control distribuido (DCS) para plantas, los controladores lógicos programables (PLC) que ejecutan procesos físicos y las interfaces humano-máquina (HMI) que usan los operadores. Los protocolos industriales como Modbus y DNP3 se diseñaron para la confiabilidad, a menudo sin autenticación ni cifrado.",
   "En OT, la seguridad física y la disponibilidad suelen estar por encima de la confidencialidad, porque una interrupción o un comando inesperado pueden lastimar a personas o dañar equipos. Eso cambia la práctica de seguridad: los escaneos activos pueden hacer caer dispositivos frágiles, los parches necesitan la aprobación del fabricante y paradas planificadas, y los cambios pasan por un estricto control de cambios de ingeniería. Para la detección se prefiere el monitoreo pasivo de la red que aprende el tráfico industrial normal.",
   "La segmentación es la defensa principal. El modelo Purdue describe niveles que van desde el proceso físico hasta la TI empresarial, e ISA/IEC 62443 usa zonas y conductos: agrupa los activos con necesidades de seguridad similares en zonas y controla estrictamente las rutas de comunicación (conductos) entre ellas. Una DMZ industrial separa TI y OT, y los gateways unidireccionales, o diodos de datos, permiten que los datos salgan de OT mientras impiden físicamente que algo fluya de regreso. El acceso remoto de los fabricantes debe pasar por un jump host monitoreado con MFA y aprobación de duración limitada.",
   "Los dispositivos IoT y embebidos a menudo vienen con credenciales predeterminadas, rara vez reciben actualizaciones y tienen poca capacidad de procesamiento. Los controles incluyen cambiar los valores predeterminados, colocar los dispositivos en redes aisladas, bloquear el acceso innecesario a internet, monitorear el comportamiento y exigir soporte de actualizaciones seguras en las compras. Para los sistemas heredados que no pueden actualizarse, los controles compensatorios como el aislamiento, el control de acceso estricto, las listas de aplicaciones permitidas y el monitoreo adicional reducen el riesgo hasta que puedan reemplazarse, y el riesgo residual debe aceptarse formalmente."
  ],
  "terms": [
   [
    "SCADA",
    "Supervisión, control y adquisición de datos (supervisory control and data acquisition): sistemas que monitorean y controlan activos industriales distribuidos."
   ],
   [
    "PLC",
    "Controlador lógico programable (programmable logic controller): computadora industrial que controla un proceso físico."
   ],
   [
    "Zones and conduits (zonas y conductos)",
    "Enfoque de ISA/IEC 62443 que agrupa los activos en zonas de seguridad y controla las rutas entre ellas."
   ],
   [
    "Data diode (diodo de datos)",
    "Gateway unidireccional que permite físicamente que los datos fluyan en una sola dirección."
   ],
   [
    "Compensating control (control compensatorio)",
    "Control alternativo que reduce el riesgo cuando no puede aplicarse el control principal."
   ]
  ],
  "example": "Una planta de tratamiento de agua no puede parchear los sistemas Windows que ejecutan sus HMI porque el fabricante no ha certificado las actualizaciones. El equipo los coloca en una zona OT dedicada, permite solo los protocolos industriales necesarios a través del conducto hacia los PLC, envía los datos del historiador a la red corporativa mediante un diodo de datos y exige que los fabricantes se conecten a través de un jump host grabado con MFA.",
  "tip": "En las preguntas de OT, prefiere las respuestas que preservan la disponibilidad y la seguridad física: segmentación, monitoreo pasivo y acceso remoto controlado. Las respuestas que ejecutan escaneos agresivos o instalan nuevos agentes en los controladores suelen ser incorrectas.",
  "check": [
   [
    "¿Por qué los escaneos activos de vulnerabilidades son riesgosos en las redes OT?",
    "Los controladores frágiles y las pilas de protocolos antiguas pueden caerse o comportarse de forma impredecible, interrumpiendo los procesos físicos."
   ],
   [
    "¿Qué garantiza un diodo de datos?",
    "Los datos solo pueden fluir en una dirección, así que nada puede enviarse de regreso a la red protegida a través de él."
   ]
  ]
 },
 {
  "t": "Security automation: scripting (PowerShell, Python, Bash), SOAR playbooks, infrastructure as code and configuration drift",
  "tt": "Automatización de la seguridad: scripting (PowerShell, Python, Bash), playbooks de SOAR, infraestructura como código y desviación de configuración",
  "body": [
   "Los equipos de seguridad enfrentan más alertas, sistemas y cambios de los que las personas pueden manejar a mano. La automatización hace que el trabajo rutinario sea rápido y consistente, libera a los analistas para las decisiones que requieren criterio y reduce el error humano. También amplifica los errores, así que necesita el mismo cuidado que cualquier código de producción.",
   "El scripting es la herramienta de todos los días. PowerShell automatiza la administración de Windows y de la nube de Microsoft, como consultar los registros de eventos o deshabilitar cuentas. Python se usa ampliamente para integraciones con API, análisis de registros y análisis de datos. Bash automatiza tareas de Linux y encadena herramientas de línea de comandos. SecurityX puede mostrar un script corto y preguntar qué hace o qué tiene de malo, así que debes poder leer bucles, condiciones y llamadas a API. Las buenas prácticas incluyen guardar los scripts en control de versiones, la revisión por pares, ejecutarlos con el mínimo privilegio necesario, manejar los errores, registrar las acciones y probarlos con un modo de simulación (dry run) antes de producción.",
   "Las plataformas de orquestación, automatización y respuesta de seguridad (SOAR) ejecutan playbooks que conectan muchas herramientas a través de sus API. Un playbook de phishing podría extraer las URL y los adjuntos de un correo reportado, verificar su reputación, buscar el mismo mensaje en todos los buzones, poner en cuarentena las coincidencias, bloquear al remitente y abrir un ticket. Pueden mantenerse pasos de aprobación humana para las acciones de alto impacto, como aislar un servidor.",
   "La infraestructura como código (IaC) define servidores, redes y recursos en la nube en archivos, usando herramientas como Terraform, CloudFormation, Bicep o Ansible, para que los entornos se construyan de forma repetible a partir de código revisado. Los beneficios de seguridad incluyen la revisión por pares de los cambios, el escaneo de las plantillas en busca de configuraciones erróneas antes del despliegue (policy as code) y la capacidad de reconstruir rápidamente después de un incidente.",
   "La desviación de configuración (configuration drift) ocurre cuando el entorno real difiere de lo que declaran el código o la línea base, a menudo porque alguien hizo un cambio manual. La detección de desviaciones compara el estado real con el estado deseado e informa las diferencias; la corrección es volver a aplicar el estado declarado y canalizar los cambios futuros a través del pipeline. La infraestructura inmutable, en la que los servidores se reemplazan en lugar de modificarse en el lugar, evita en gran medida la desviación."
  ],
  "terms": [
   [
    "SOAR",
    "Orquestación, automatización y respuesta de seguridad (security orchestration, automation and response): plataformas que ejecutan playbooks a través de las herramientas de seguridad."
   ],
   [
    "Playbook",
    "Secuencia de pasos definida, a menudo automatizada, para manejar un tipo específico de evento."
   ],
   [
    "Infrastructure as code (infraestructura como código)",
    "Definir y aprovisionar infraestructura mediante archivos legibles por máquina en lugar de pasos manuales."
   ],
   [
    "Policy as code (política como código)",
    "Reglas de seguridad y cumplimiento escritas como código y aplicadas automáticamente, por ejemplo en un pipeline."
   ],
   [
    "Immutable infrastructure (infraestructura inmutable)",
    "Enfoque en el que los sistemas se reemplazan por nuevas compilaciones en lugar de modificarse en el lugar."
   ]
  ],
  "example": "Un SOC recibe unos 200 correos de phishing reportados por semana. Ahora, un playbook de SOAR extrae los indicadores, verifica la reputación, elimina los mensajes coincidentes de todos los buzones y cierra automáticamente el spam evidente, mientras que los casos sospechosos pasan a un analista con toda la evidencia reunida. El tiempo del analista por reporte baja de 20 minutos a unos 3.",
  "tip": "Los cambios manuales que difieren de Terraform o de la línea base son desviación de configuración; la corrección es detectarla y volver a aplicar el estado declarado. Para la seguridad de la automatización, busca pruebas, simulaciones (dry runs), revisión por pares y mínimo privilegio.",
  "check": [
   [
    "Menciona dos beneficios de seguridad de la infraestructura como código.",
    "Los cambios se revisan por pares y se versionan, y las plantillas pueden escanearse en busca de configuraciones erróneas antes del despliegue; además, los entornos pueden reconstruirse de forma consistente."
   ],
   [
    "¿Por qué mantener un paso de aprobación humana en algunos playbooks de SOAR?",
    "Las acciones de alto impacto, como aislar un servidor de producción, pueden causar interrupciones si la automatización se equivoca, así que una persona las confirma."
   ]
  ]
 },
 {
  "t": "Advanced cryptographic concepts: post-quantum cryptography, key stretching, forward secrecy, homomorphic encryption and envelope encryption",
  "tt": "Conceptos criptográficos avanzados: criptografía poscuántica, key stretching, forward secrecy, cifrado homomórfico y cifrado de sobre",
  "body": [
   "SecurityX va más allá de saber que AES es simétrico y RSA es asimétrico. Necesitas entender las ideas de diseño detrás de los sistemas criptográficos modernos y cuándo cada uno resuelve un problema real.",
   "La criptografía poscuántica (PQC) atiende la amenaza de que una computadora cuántica grande y tolerante a fallos pueda romper los algoritmos de clave pública actuales, incluidos RSA, Diffie-Hellman y la criptografía de curva elíptica, usando el algoritmo de Shor. Los cifrados simétricos y los hashes se ven mucho menos afectados; tamaños de clave mayores como AES-256 se consideran adecuados. NIST ha publicado estándares poscuánticos, incluidos ML-KEM para el establecimiento de claves y ML-DSA y SLH-DSA para las firmas digitales. Como los atacantes pueden grabar hoy el tráfico cifrado y descifrarlo después (harvest now, decrypt later), las organizaciones deben inventariar dónde usan criptografía, desarrollar agilidad criptográfica (crypto agility) para poder cambiar los algoritmos y planificar las migraciones, a menudo empezando con esquemas híbridos que combinan algoritmos clásicos y poscuánticos.",
   "El key stretching (estiramiento de claves) hace que adivinar secretos débiles, como las contraseñas, sea costoso. Funciones como PBKDF2, bcrypt, scrypt y Argon2 aplican muchas iteraciones y, en el caso de scrypt y Argon2, grandes cantidades de memoria, combinadas con una sal única por contraseña. Las sales anulan las rainbow tables precalculadas; el factor de trabajo hace más lento cada intento.",
   "La forward secrecy (a menudo llamada perfect forward secrecy) garantiza que comprometer la clave privada de largo plazo de un servidor no exponga las claves de sesiones pasadas. Usa el intercambio de claves Diffie-Hellman efímero (DHE o ECDHE), generando material de clave nuevo para cada sesión y descartándolo después. TLS 1.3 solo permite intercambios de claves con forward secrecy.",
   "El cifrado homomórfico permite realizar cálculos sobre datos cifrados sin descifrarlos, de modo que un tercero puede procesar datos que no puede leer. Todavía es lento y se usa en casos especializados. El cifrado de sobre (envelope encryption) cifra los datos con una clave de cifrado de datos (DEK) y luego cifra la DEK con una clave de cifrado de claves (KEK) almacenada en un KMS o HSM. La clave maestra nunca sale del servicio de claves, los datos masivos se cifran localmente y rotar la KEK solo requiere volver a envolver las pequeñas DEK. Otros conceptos que debes conocer incluyen el cifrado autenticado (como AES-GCM), que proporciona confidencialidad e integridad a la vez, y la criptografía de curva elíptica, que ofrece una fortaleza equivalente con claves más pequeñas que RSA."
  ],
  "terms": [
   [
    "Post-quantum cryptography (criptografía poscuántica)",
    "Algoritmos diseñados para resistir ataques de computadoras cuánticas, como ML-KEM y ML-DSA."
   ],
   [
    "Crypto agility (agilidad criptográfica)",
    "Capacidad de cambiar los algoritmos y las claves criptográficas sin rediseñar los sistemas."
   ],
   [
    "Key stretching (estiramiento de claves)",
    "Derivar claves a partir de contraseñas con funciones lentas y con sal para resistir los intentos de adivinarlas."
   ],
   [
    "Forward secrecy",
    "Propiedad según la cual el compromiso de las claves de largo plazo no revela las claves de sesiones pasadas."
   ],
   [
    "Envelope encryption (cifrado de sobre)",
    "Cifrar los datos con una clave de datos y luego cifrar esa clave de datos con una clave maestra en un KMS o HSM."
   ]
  ],
  "example": "Un proveedor de historias clínicas debe mantener los datos de los pacientes confidenciales durante décadas. Su equipo de seguridad inventaría cada sistema que usa RSA y ECDH, prioriza los flujos de datos de larga vida, habilita el intercambio de claves poscuántico híbrido donde sus bibliotecas TLS lo soportan y almacena los documentos con cifrado de sobre para poder rotar las claves maestras en el KMS sin volver a cifrar terabytes de archivos.",
  "tip": "Harvest now, decrypt later apunta a la planificación poscuántica; clave de servidor robada y sesiones pasadas apunta a forward secrecy; calcular sobre datos cifrados apunta al cifrado homomórfico; clave de datos envuelta por una clave maestra apunta al cifrado de sobre.",
  "check": [
   [
    "¿Por qué los algoritmos simétricos se ven menos afectados por la computación cuántica que RSA?",
    "Los ataques cuánticos conocidos (algoritmo de Grover) solo reducen aproximadamente a la mitad la fortaleza de las claves simétricas, lo que se compensa con claves más grandes, mientras que el algoritmo de Shor rompe RSA y ECC por completo."
   ],
   [
    "¿Qué dos cosas hacen que bcrypt o Argon2 sean buenos para almacenar contraseñas?",
    "Una sal única por contraseña y un factor de trabajo configurable que hace lento cada intento."
   ]
  ]
 },
 {
  "t": "Cryptographic use cases: data at rest, in transit and in use, code signing, digital signatures and secure key exchange",
  "tt": "Casos de uso criptográficos: datos en reposo, en tránsito y en uso, firma de código, firmas digitales e intercambio seguro de claves",
  "body": [
   "Elegir el control criptográfico adecuado comienza por el objetivo: confidencialidad, integridad, autenticación, no repudio o una combinación. Luego considera el estado de los datos: en reposo, en tránsito o en uso.",
   "Los datos en reposo se protegen con cifrado simétrico como AES, en varias capas posibles: el cifrado de disco completo protege los dispositivos perdidos o robados; el cifrado de archivos u objetos protege elementos individuales; el cifrado de bases de datos, incluido el transparent data encryption, protege los archivos de la base de datos; y el cifrado a nivel de aplicación o de campo protege valores específicos incluso frente a los administradores de la base de datos. Cuanto más alta es la capa, más focalizada es la protección y más trabajo cuesta implementarla. La gestión de claves determina qué tan sólida es realmente cualquiera de ellas.",
   "Los datos en tránsito se protegen con protocolos como TLS para el tráfico web y de API, IPsec para los túneles de red y SSH para la administración. La práctica actual es TLS 1.2 o 1.3 con suites de cifrado robustas, validación de certificados y, para el tráfico interno de servicio a servicio, a menudo TLS mutuo. Los datos en uso son los más difíciles de proteger; las opciones incluyen enclaves seguros, computación confidencial y, para casos especializados, cifrado homomórfico.",
   "Las firmas digitales usan criptografía asimétrica: quien firma calcula el hash de los datos y firma ese hash con una clave privada, y cualquiera con la clave pública puede verificarlo. Las firmas proporcionan integridad, autenticación de quien firma y no repudio. La firma de código (code signing) aplica esto al software, para que los sistemas operativos y los usuarios puedan confirmar el editor y que el código no ha cambiado desde que se firmó; las claves de firma deben protegerse, idealmente en un HSM, porque una clave de firma de código robada permite a los atacantes firmar malware.",
   "El intercambio seguro de claves permite que dos partes acuerden un secreto compartido a través de una red no confiable. Diffie-Hellman y su forma de curva elíptica (ECDH), usados en modo efímero, son estándar y dan forward secrecy. El secreto intercambiado luego sirve como clave para un cifrado simétrico rápido, razón por la cual los diseños híbridos, asimétrico para el intercambio y simétrico para los datos masivos, están en todas partes. Los hashes como SHA-256 proporcionan verificaciones de integridad, y HMAC agrega una clave secreta para que solo las partes que tienen la clave puedan crear una etiqueta válida."
  ],
  "terms": [
   [
    "Data in use (datos en uso)",
    "Datos que se están procesando en memoria o en la CPU, a diferencia de los almacenados o transmitidos."
   ],
   [
    "Field-level encryption (cifrado a nivel de campo)",
    "Cifrar campos específicos dentro de un registro para que permanezcan protegidos en la base de datos y en los respaldos."
   ],
   [
    "Digital signature (firma digital)",
    "Valor creado con una clave privada sobre el hash de unos datos, verificable con la clave pública correspondiente."
   ],
   [
    "Non-repudiation (no repudio)",
    "Garantía de que una parte no puede negar de forma creíble haber realizado una acción, como firmar un documento."
   ],
   [
    "HMAC",
    "Código de autenticación de mensajes basado en hash (hash-based message authentication code): un hash con clave que demuestra la integridad y el origen a quienes tienen la clave."
   ]
  ],
  "example": "Una empresa de software firma cada instalador y actualización con una clave de firma de código guardada en un HSM, para que los sistemas de los clientes rechacen los archivos manipulados. Su portal de clientes usa TLS 1.3, su base de datos usa cifrado a nivel de campo para los números de cuenta bancaria, de modo que incluso los DBA ven texto cifrado, y sus microservicios internos se autentican entre sí con TLS mutuo.",
  "tip": "Las firmas se crean con la clave privada del remitente y se verifican con la clave pública; el cifrado para confidencialidad usa la clave pública del destinatario. Demostrar el editor de un software apunta a la firma de código.",
  "check": [
   [
    "¿Qué clave usa un destinatario para verificar una firma digital?",
    "La clave pública de quien firmó."
   ],
   [
    "¿Cuándo elegirías el cifrado a nivel de campo en lugar del cifrado de disco completo?",
    "Cuando ciertos valores sensibles deben permanecer protegidos frente a los administradores de la base de datos, las aplicaciones que no los necesitan y los respaldos, no solo frente al robo físico."
   ]
  ]
 },
 {
  "t": "PKI engineering: certificate lifecycle, CA hierarchy, OCSP and CRLs, certificate pinning and mutual TLS",
  "tt": "Ingeniería de PKI: ciclo de vida de los certificados, jerarquía de CA, OCSP y CRL, certificate pinning y TLS mutuo",
  "body": [
   "La infraestructura de clave pública (PKI) vincula claves públicas con identidades mediante certificados emitidos por autoridades de certificación (CA). Los ingenieros sénior diseñan la jerarquía, automatizan el ciclo de vida y solucionan las fallas de confianza. Las interrupciones por certificados vencidos están entre los incidentes más comunes y evitables en TI.",
   "Una jerarquía empresarial típica tiene una CA raíz fuera de línea, que se enciende solo para firmar certificados intermedios y listas de revocación, y una o más CA intermedias (emisoras) en línea que emiten certificados para usuarios, dispositivos y servidores. Si una CA emisora se ve comprometida, la raíz la revoca y se crea una nueva intermedia sin tener que reconstruir la confianza en todas partes. Protege las claves de las CA en HSM y controla quién puede aprobar las plantillas de certificados.",
   "El ciclo de vida del certificado incluye la generación de claves, una solicitud de firma de certificado (CSR), la validación y emisión, la instalación, el monitoreo, la renovación y la revocación. La automatización con protocolos como ACME, junto con un inventario de certificados y alertas de vencimiento, evita las interrupciones. Los certificados deben incluir los subject alternative names (SAN) correctos, porque los clientes modernos comparan los nombres de host con los SAN, así como valores adecuados de key usage y extended key usage.",
   "La revocación indica a las partes confiantes que un certificado ya no debe considerarse de confianza, por ejemplo tras el compromiso de una clave. Una lista de revocación de certificados (CRL) es una lista firmada que se publica periódicamente; los clientes la descargan del punto de distribución de la CRL. El Online Certificate Status Protocol (OCSP) permite a un cliente consultar por un certificado. Con OCSP stapling, el servidor adjunta una respuesta OCSP firmada y reciente al handshake de TLS, lo que es más rápido y más privado. Si la información de revocación no está disponible, los clientes fallan abiertos o cerrados según la configuración.",
   "El certificate pinning hace que un cliente acepte solo un certificado o una clave pública específicos para un servicio, lo que anula los certificados fraudulentos o de interceptación, pero rompe la inspección TLS y exige planificar con cuidado la rotación de claves. El TLS mutuo (mTLS) exige que tanto el cliente como el servidor presenten certificados, lo que da una autenticación bidireccional sólida para el tráfico de servicio a servicio, las API y el acceso de dispositivos. Otros elementos que debes conocer son los certificados wildcard (convenientes, pero una única clave expuesta en muchos hosts), los registros de certificate transparency y la diferencia entre certificados autofirmados y emitidos por una CA."
  ],
  "terms": [
   [
    "Intermediate CA (CA intermedia)",
    "CA cuyo certificado está firmado por la raíz y que emite certificados de entidad final."
   ],
   [
    "CSR",
    "Solicitud de firma de certificado (certificate signing request): mensaje que contiene una clave pública y datos de identidad y se envía a una CA para que lo firme."
   ],
   [
    "OCSP stapling",
    "Un servidor incluye una respuesta OCSP firmada y reciente en su handshake de TLS."
   ],
   [
    "Certificate pinning",
    "Configurar un cliente para que acepte solo ciertos certificados o claves públicas para un servicio."
   ],
   [
    "Mutual TLS (TLS mutuo)",
    "TLS en el que tanto el cliente como el servidor se autentican con certificados."
   ]
  ],
  "example": "El portal de clientes de una empresa se cae un sábado porque su certificado venció; el único recordatorio le llegaba a un ingeniero que ya se había ido. El equipo de PKI crea un inventario de certificados, habilita la renovación automática mediante ACME para los servidores web, configura alertas 30 días antes del vencimiento y pasa su CA raíz a fuera de línea con dos CA intermedias, para que el compromiso de una CA emisora pueda contenerse.",
  "tip": "El diseño de raíz fuera de línea más intermedias en línea limita el daño de un compromiso de la CA. OCSP stapling mejora el rendimiento y la privacidad de la verificación de revocación. El pinning rompe los proxies de inspección TLS.",
  "check": [
   [
    "¿Por qué mantener la CA raíz fuera de línea?",
    "Reduce enormemente la probabilidad de que la clave raíz se vea comprometida; si una CA emisora en línea se compromete, la raíz puede revocarla y emitir una nueva."
   ],
   [
    "Un navegador muestra una discrepancia de nombre aunque el CN del certificado parece correcto. ¿Qué deberías revisar?",
    "La lista de subject alternative names, porque los clientes modernos comparan los nombres de host con los SAN y no con el CN."
   ]
  ]
 },
 {
  "t": "Email and DNS security engineering: SPF, DKIM, DMARC, DNSSEC and S/MIME",
  "tt": "Ingeniería de seguridad de correo y DNS: SPF, DKIM, DMARC, DNSSEC y S/MIME",
  "body": [
   "El correo electrónico y el DNS son protocolos antiguos creados sin una autenticación robusta, y los atacantes abusan de ellos para phishing, suplantación y redirección. Varios estándares publicados en DNS agregan las verificaciones que faltan, y SecurityX espera que sepas cómo encajan entre sí y cómo desplegarlos de forma segura.",
   "Sender Policy Framework (SPF) es un registro TXT que enumera los servidores autorizados a enviar correo en nombre de un dominio; los receptores comparan la IP del servidor que se conecta con esa lista. SPF verifica el remitente del sobre (la ruta de retorno o return path), no la dirección From que ven los usuarios, y deja de funcionar cuando el correo se reenvía. DomainKeys Identified Mail (DKIM) firma los mensajes salientes con una clave privada; la clave pública se publica en DNS bajo un selector, y los receptores verifican la firma, que sobrevive a la mayoría de los reenvíos.",
   "Domain-based Message Authentication, Reporting and Conformance (DMARC) los une. Exige que SPF o DKIM pasen y que el dominio que pasa esté alineado con el dominio From visible, y luego indica a los receptores qué hacer cuando eso falla: p=none (solo monitorear), p=quarantine (enviar a spam) o p=reject. DMARC también envía informes agregados para que los dueños de dominios vean quién está enviando en su nombre. Un despliegue seguro comienza con p=none, corrige los remitentes legítimos encontrados en los informes y luego pasa a quarantine y reject. Los dominios que nunca envían correo también deben publicar una política reject.",
   "Las DNS Security Extensions (DNSSEC) agregan firmas digitales a los registros DNS. Los resolutores que validan siguen una cadena de confianza desde la raíz a través de los registros DS y DNSKEY de cada zona, lo que impide las respuestas falsificadas como el envenenamiento de caché (cache poisoning). DNSSEC proporciona integridad y autenticidad, no confidencialidad. DNS over HTTPS (DoH) y DNS over TLS (DoT) cifran las consultas entre el cliente y el resolutor para dar privacidad, que es un objetivo distinto, y pueden reducir la visibilidad empresarial si los clientes eluden los resolutores corporativos.",
   "S/MIME (Secure/Multipurpose Internet Mail Extensions) usa certificados para firmar y cifrar mensajes de correo individuales de extremo a extremo, demostrando quién es el remitente y protegiendo el contenido incluso en los servidores de correo. Requiere certificados para los usuarios y gestión de claves para la recuperación. El cifrado de transporte entre servidores de correo con TLS protege los mensajes en tránsito, pero no en reposo en los servidores."
  ],
  "terms": [
   [
    "SPF",
    "Registro DNS que enumera los servidores autorizados a enviar correo en nombre de un dominio."
   ],
   [
    "DKIM",
    "Método para firmar el correo con una clave de dominio publicada en DNS."
   ],
   [
    "DMARC",
    "Política que exige resultados de SPF o DKIM alineados e indica a los receptores cómo manejar las fallas, con informes."
   ],
   [
    "DNSSEC",
    "Extensiones que agregan firmas digitales a los datos DNS para que los resolutores puedan verificar su autenticidad."
   ],
   [
    "S/MIME",
    "Estándar para firmar y cifrar mensajes de correo individuales con certificados."
   ]
  ],
  "example": "Unos atacantes envían facturas que parecen provenir del dominio de un fabricante. El fabricante ya tiene SPF y DKIM, pero no DMARC. Publica un registro DMARC con p=none y una dirección para informes, descubre una plataforma de marketing que envía en su nombre sin DKIM, la corrige y, tres meses después, pasa a p=reject. Ahora los principales receptores rechazan las facturas falsificadas que usan su dominio exacto.",
  "tip": "Solo DMARC indica a los receptores que rechacen el correo suplantado y proporciona informes; SPF y DKIM por sí solos no fijan una política. DNSSEC da autenticidad a las respuestas DNS; DoH y DoT dan privacidad.",
  "check": [
   [
    "¿Por qué un mensaje puede pasar SPF y aun así fallar DMARC?",
    "SPF puede pasar para el dominio del remitente del sobre, pero DMARC además exige que ese dominio esté alineado con el dominio From visible."
   ],
   [
    "¿DNSSEC cifra las consultas DNS?",
    "No. Firma los datos DNS para dar integridad y autenticidad; DoH y DoT proporcionan cifrado."
   ]
  ]
 },
 {
  "t": "Mobile and endpoint management: MDM/UEM, containerization, device attestation and BYOD controls",
  "tt": "Gestión de dispositivos móviles y endpoints: MDM/UEM, contenedorización, atestación de dispositivos y controles BYOD",
  "body": [
   "Los teléfonos, tabletas y laptops llevan datos corporativos a todas partes, a menudo en dispositivos que también contienen contenido personal. La gestión de dispositivos móviles y endpoints permite a una organización establecer la política de seguridad, proteger los datos corporativos y demostrar el estado de los dispositivos sin apoderarse de la vida personal de los empleados.",
   "La gestión de dispositivos móviles (MDM) inscribe los dispositivos y aplica políticas como reglas de bloqueo de pantalla y código de acceso, cifrado, versiones mínimas del sistema operativo, perfiles de Wi-Fi y VPN, instalación de aplicaciones y bloqueo o borrado remoto. La gestión unificada de endpoints (UEM) extiende el mismo enfoque a laptops, equipos de escritorio y otros endpoints desde una sola consola. La gestión de aplicaciones móviles (MAM) gestiona las políticas a nivel de aplicación, lo que funciona incluso en dispositivos que no están completamente inscritos.",
   "Los modelos de implementación determinan qué controles son aceptables. Los dispositivos propiedad de la empresa y de uso exclusivo para el trabajo (COBO) pueden gestionarse por completo. Los dispositivos propiedad de la empresa con uso personal habilitado (COPE) permiten cierto uso personal. Choose your own device (CYOD) permite a los empleados elegir entre modelos aprobados. Bring your own device (BYOD) usa dispositivos personales y requiere un control más ligero para respetar la privacidad.",
   "La contenedorización, a menudo llamada perfil de trabajo, separa las aplicaciones y los datos corporativos de los personales en el mismo dispositivo. Las políticas pueden impedir copiar datos de las aplicaciones corporativas a las personales, exigir un PIN separado para el contenedor de trabajo y permitir un borrado selectivo o empresarial que elimina solo los datos corporativos cuando el empleado se va o se pierde el dispositivo. Un borrado completo del dispositivo suele ser inaceptable en BYOD.",
   "La atestación de dispositivos demuestra que un dispositivo es genuino y no ha sido manipulado, por ejemplo que no tiene root ni jailbreak, usando verificaciones respaldadas por hardware que proporciona la plataforma. Luego, el acceso condicional puede permitir las aplicaciones corporativas solo en dispositivos que cumplen y están atestiguados. Otros riesgos móviles que deben atenderse incluyen las aplicaciones instaladas por sideloading, los perfiles maliciosos, los dispositivos perdidos, el Wi-Fi público inseguro y el phishing por SMS. Las políticas también deben cubrir mantener los dispositivos actualizados y retirar el acceso de inmediato cuando los dispositivos dejan de cumplir."
  ],
  "terms": [
   [
    "MDM",
    "Gestión de dispositivos móviles (mobile device management): inscribir dispositivos y aplicarles políticas de seguridad."
   ],
   [
    "UEM",
    "Gestión unificada de endpoints (unified endpoint management): una plataforma que gestiona dispositivos móviles, laptops y equipos de escritorio."
   ],
   [
    "Containerization (contenedorización)",
    "Separar las aplicaciones y los datos corporativos del contenido personal en un dispositivo."
   ],
   [
    "Selective wipe (borrado selectivo)",
    "Eliminar solo los datos y las aplicaciones corporativas de un dispositivo, dejando el contenido personal."
   ],
   [
    "Device attestation (atestación de dispositivos)",
    "Prueba respaldada por hardware de que un dispositivo es genuino y no está comprometido, por ejemplo con root o jailbreak."
   ]
  ],
  "example": "Una consultora permite que su personal lea el correo en teléfonos personales. Implementa gestión a nivel de aplicación con un perfil de trabajo: el correo y los archivos corporativos residen en el contenedor gestionado, se bloquea la copia a aplicaciones personales y el acceso exige un dispositivo que cumpla y esté atestiguado. Cuando un consultor se va, TI ejecuta un borrado selectivo que elimina el perfil de trabajo, mientras que las fotos y aplicaciones personales quedan intactas.",
  "tip": "Para BYOD, busca la contenedorización y el borrado selectivo en lugar del borrado completo del dispositivo. Los dispositivos con root o jailbreak se detectan mediante la atestación y se bloquean mediante el acceso condicional.",
  "check": [
   [
    "¿Cuál es la principal diferencia entre MDM y MAM?",
    "MDM gestiona todo el dispositivo mediante la inscripción; MAM aplica políticas a aplicaciones específicas y sus datos, lo que se adapta a los dispositivos personales no gestionados."
   ],
   [
    "¿Por qué un borrado completo del dispositivo es un problema en BYOD?",
    "Borra los datos personales del empleado, lo que plantea preocupaciones legales y de privacidad; un borrado selectivo elimina solo los datos corporativos."
   ]
  ]
 },
 {
  "t": "Secrets and key management: vaults, key rotation, KMS, hardware-backed keys and separation of duties",
  "tt": "Gestión de secretos y claves: bóvedas, rotación de claves, KMS, claves respaldadas por hardware y separación de funciones",
  "body": [
   "El cifrado es tan sólido como la protección de sus claves, y las aplicaciones son tan seguras como las credenciales que usan. Los secretos como contraseñas, claves de API, tokens y claves privadas se filtran a través del código fuente, los archivos de configuración, los registros y las imágenes. La gestión de claves y secretos los mantiene fuera de esos lugares y bajo control.",
   "Una bóveda de secretos (secrets vault) almacena los secretos cifrados, controla el acceso con políticas granulares, registra cada acceso y entrega los secretos a las aplicaciones en tiempo de ejecución mediante API. Las bóvedas avanzadas emiten secretos dinámicos, como credenciales de base de datos creadas a pedido con una vida corta, de modo que no hay nada de larga duración que robar. Las identidades de carga de trabajo, en las que la plataforma demuestra la identidad de una aplicación ante la bóveda o el servicio en la nube, eliminan la necesidad de un secreto inicial en el código.",
   "Un servicio de gestión de claves (KMS) gestiona las claves criptográficas: las crea, controla quién puede usarlas, registra su uso y las rota. Los servicios KMS en la nube suelen mantener las claves maestras en HSM y nunca las liberan; las aplicaciones envían las claves de datos para que se envuelvan o desenvuelvan, como en el cifrado de sobre. Las jerarquías de claves separan las claves maestras de las claves de datos para que el compromiso de una clave de datos tenga un impacto limitado.",
   "La rotación de claves reemplaza las claves según un calendario e inmediatamente después de una sospecha de compromiso. La rotación limita cuántos datos protege una clave y durante cuánto tiempo sigue siendo útil una clave robada. Planifica cómo se descifrarán los datos antiguos después de la rotación, por ejemplo manteniendo disponibles las versiones anteriores de la clave solo para descifrar. Los secretos expuestos en cualquier lugar, como una clave subida a un repositorio público, deben revocarse y rotarse de inmediato; eliminar el commit no basta.",
   "La separación de funciones garantiza que ninguna persona controle una clave de principio a fin. Por ejemplo, los administradores de claves pueden gestionar las políticas de las claves, pero no pueden usarlas para descifrar datos, mientras que los dueños de las aplicaciones pueden usar las claves, pero no cambiar sus políticas. El conocimiento dividido (split knowledge) y el control dual, como exigir que varios custodios presenten partes de la clave, protegen las operaciones más sensibles, como una ceremonia de CA raíz. Las claves respaldadas por hardware, almacenadas en HSM, TPM o elementos seguros, impiden que las claves se copien fuera del dispositivo."
  ],
  "terms": [
   [
    "Secrets vault (bóveda de secretos)",
    "Sistema que almacena los secretos, controla y audita el acceso a ellos y los entrega en tiempo de ejecución."
   ],
   [
    "Dynamic secret (secreto dinámico)",
    "Credencial generada a pedido con una vida corta y revocada automáticamente."
   ],
   [
    "Key rotation (rotación de claves)",
    "Reemplazar las claves criptográficas según un calendario o después de un compromiso."
   ],
   [
    "Dual control (control dual)",
    "Exigir que dos o más personas actúen en conjunto para realizar una operación sensible."
   ],
   [
    "Split knowledge (conocimiento dividido)",
    "Dividir un secreto para que ninguna persona lo conozca por completo."
   ]
  ],
  "example": "Un desarrollador sube por accidente una clave de acceso a la nube a un repositorio público, y los escáneres automatizados la encuentran en minutos. El equipo revoca la clave, revisa los registros de auditoría en busca de cualquier uso y traslada la aplicación a una identidad de carga de trabajo que recibe credenciales de corta duración de la plataforma en la nube. Ahora, un escáner de secretos en el pipeline bloquea los commits que contienen credenciales.",
  "tip": "Un secreto expuesto debe revocarse y rotarse; quitarlo del código no deshace la exposición. La separación de funciones significa que los administradores de claves no deben poder usar las claves para leer datos.",
  "check": [
   [
    "¿Por qué los secretos dinámicos son más seguros que las contraseñas estáticas de base de datos?",
    "Se crean a pedido con una vida corta, así que una credencial robada vence rápidamente y cada uso queda registrado de forma individual."
   ],
   [
    "¿Qué aporta el control dual a una ceremonia de la clave de una CA raíz?",
    "Ninguna persona puede realizar la operación sola, lo que protege contra el mal uso interno y los errores."
   ]
  ]
 },
 {
  "t": "Secure configuration of network infrastructure: SNMPv3, SSH, management plane protection and secure routing",
  "tt": "Configuración segura de la infraestructura de red: SNMPv3, SSH, protección del plano de administración y enrutamiento seguro",
  "body": [
   "Los routers, switches, firewalls y controladores inalámbricos son objetivos de alto valor: quien los controla decide hacia dónde va el tráfico. El endurecimiento de la infraestructura de red se centra en quién puede administrar los dispositivos, cómo se monitorean y si se puede confiar en la información de enrutamiento que intercambian.",
   "Los dispositivos de red tienen tres planos lógicos. El plano de datos reenvía el tráfico de los usuarios. El plano de control ejecuta los protocolos de enrutamiento y construye las tablas de reenvío. El plano de administración es la forma en que los administradores y los sistemas de monitoreo acceden al dispositivo, mediante SSH, interfaces web, API y SNMP. Proteger el plano de administración significa permitir la administración solo desde una red de administración dedicada o desde jump hosts, usar administración fuera de banda cuando sea posible y aplicar listas de acceso a los servicios de administración.",
   "Usa protocolos seguros. SSH versión 2 reemplaza a Telnet, HTTPS reemplaza a HTTP para la administración web, y SCP o SFTP reemplazan a TFTP y FTP para la transferencia de archivos. SNMPv1 y v2c envían las community strings en texto claro y deben reemplazarse por SNMPv3, que agrega autenticación basada en usuarios y cifrado; el nivel de seguridad authPriv proporciona ambos. Centraliza la autenticación de los administradores con TACACS+ o RADIUS para que cada persona use su propia cuenta y los comandos puedan autorizarse y registrarse, y guarda una cuenta local de emergencia en una bóveda.",
   "La protección del plano de control incluye limitar la tasa del tráfico enviado a la CPU del dispositivo, para que las inundaciones no saturen los procesos de enrutamiento, y autenticar a los vecinos de los protocolos de enrutamiento. OSPF y BGP soportan autenticación para que solo los routers de confianza puedan formar adyacencias. En internet, los secuestros (hijacks) y las fugas de rutas BGP son riesgos reales; Resource Public Key Infrastructure (RPKI) y la validación del origen de rutas permiten a las redes verificar que un prefijo anunciado proviene de un sistema autónomo autorizado, y los filtros de prefijos limitan lo que los vecinos pueden anunciar.",
   "Otras prácticas incluyen deshabilitar los servicios y puertos no usados, mantener el firmware actualizado a partir de imágenes firmadas, respaldar las configuraciones y detectar cambios no autorizados, enviar los registros a un recolector central con hora precisa desde NTP, mostrar banners de advertencia legal y usar funciones de seguridad de los switches como DHCP snooping, dynamic ARP inspection y port security en la capa de acceso."
  ],
  "terms": [
   [
    "Management plane (plano de administración)",
    "Funciones e interfaces que se usan para configurar, monitorear y administrar un dispositivo de red."
   ],
   [
    "SNMPv3 authPriv",
    "Nivel de seguridad de SNMPv3 que proporciona tanto autenticación como cifrado."
   ],
   [
    "TACACS+",
    "Protocolo para la autenticación, autorización y contabilidad (accounting) centralizadas de los administradores en los dispositivos de red."
   ],
   [
    "RPKI",
    "Resource Public Key Infrastructure: validación criptográfica de que una red está autorizada a anunciar un prefijo IP."
   ],
   [
    "Control plane policing",
    "Limitar la tasa del tráfico destinado a la CPU de un dispositivo para proteger los procesos de enrutamiento."
   ]
  ],
  "example": "Una auditoría encuentra routers administrados por Telnet desde cualquier dirección interna, SNMPv2c con la community string public y una única cuenta de administrador compartida. El equipo de redes traslada la administración a una VLAN de administración dedicada, accesible solo desde jump hosts, habilita SSHv2, cambia el monitoreo a SNMPv3 authPriv y vincula los inicios de sesión a TACACS+ para que cada comando quede registrado a nombre del administrador individual.",
  "tip": "SNMPv3 con authPriv es la respuesta segura para el monitoreo; cambiar la community string o el puerto no agrega cifrado. El AAA centralizado con TACACS+ da autorización y contabilidad por comando para los administradores.",
  "check": [
   [
    "¿Por qué SNMPv2c es inseguro?",
    "Las community strings, que funcionan como contraseñas, se envían en texto claro y no hay cifrado de los datos."
   ],
   [
    "¿Contra qué protege la validación del origen de rutas de RPKI?",
    "Contra anuncios de prefijos desde sistemas autónomos no autorizados a originarlos, como los secuestros BGP accidentales o maliciosos."
   ]
  ]
 },
 {
  "t": "Monitoring and response data: SIEM correlation, log aggregation, event parsing, baselines and alert tuning",
  "tt": "Datos de monitoreo y respuesta: correlación en el SIEM, agregación de registros, análisis de eventos, líneas base y ajuste de alertas",
  "body": [
   "La detección depende de tener los datos correctos, entenderlos y convertirlos en alertas sobre las que las personas puedan actuar. En el nivel de SecurityX se espera que juzgues si el monitoreo está funcionando y lo mejores, no solo que leas alertas.",
   "La agregación de registros recolecta eventos de endpoints, servidores, dispositivos de red, proveedores de identidad, plataformas en la nube y aplicaciones en una plataforma central, normalmente un SIEM o un data lake. La recolección debe ser confiable (con búfer para que no se pierdan eventos), estar protegida en tránsito y en reposo, y dejar evidencia de manipulación. La hora precisa y sincronizada desde NTP es esencial, ya que la correlación depende de ordenar correctamente los eventos entre las distintas fuentes.",
   "El análisis sintáctico (parsing) y la normalización extraen campos, como usuario, IP de origen, host y acción, y los mapean a un esquema común para que una sola consulta funcione con distintos fabricantes. Las fallas de parsing son un asesino silencioso: si un campo está vacío, las reglas que dependen de él nunca se activan. El enriquecimiento agrega contexto como la criticidad del activo, el departamento del usuario, la geolocalización y la inteligencia de amenazas, lo que acelera el triaje y hace más precisa la puntuación.",
   "Las reglas de correlación combinan eventos de distintas fuentes y momentos. Un solo inicio de sesión fallido significa poco; muchas fallas en muchas cuentas desde un mismo origen seguidas de un éxito, y luego una nueva regla de reenvío en un buzón, sugieren fuertemente un compromiso. Las líneas base describen el comportamiento normal, como los horarios habituales de inicio de sesión, los volúmenes de datos y los procesos, para que las anomalías destaquen. La analítica del comportamiento de usuarios y entidades (UEBA) automatiza esto por usuario y por dispositivo.",
   "El ajuste de alertas mantiene la eficacia del SOC. Demasiados falsos positivos causan fatiga de alertas, y las alertas reales se pasan por alto. Ajusta con excepciones documentadas y de alcance limitado (un escáner específico durante su ventana de escaneo, no todas las fuentes), modifica los umbrales según los datos y retira las reglas que nunca producen resultados útiles. Mide las tasas de verdaderos y falsos positivos, el tiempo medio de detección y el tiempo medio de respuesta, y revisa si fuentes de registros importantes se han quedado en silencio. Los tableros e informes deben mostrar tendencias que ayuden a los líderes a decidir, no conteos brutos de eventos."
  ],
  "terms": [
   [
    "Log aggregation (agregación de registros)",
    "Recolectar registros de muchas fuentes en una plataforma central para su análisis."
   ],
   [
    "Normalization (normalización)",
    "Mapear los campos de distintos formatos de registro a un esquema común."
   ],
   [
    "Correlation rule (regla de correlación)",
    "Detección que combina varios eventos de distintas fuentes o momentos para identificar patrones sospechosos."
   ],
   [
    "Enrichment (enriquecimiento)",
    "Agregar a los eventos contexto como el valor del activo, datos de identidad o inteligencia de amenazas."
   ],
   [
    "Alert fatigue (fatiga de alertas)",
    "Desensibilización de los analistas causada por grandes volúmenes de alertas de poco valor."
   ]
  ],
  "example": "Un SOC recibe 3.000 alertas al día, y los analistas ignoran la mayoría. El equipo descubre que la mitad provienen de una regla que se activa con un escáner de vulnerabilidades autorizado, agrega una excepción para la IP del escáner durante su ventana programada, corrige un parser que dejaba vacío el campo de usuario en los registros de la VPN y agrega la criticidad del activo a la puntuación. Las alertas diarias bajan a 400, y la semana siguiente se detecta un intento real de fuerza bruta contra la VPN.",
  "tip": "Corrige el ruido con excepciones precisas y documentadas y con mejor contexto, nunca deshabilitando una regla ni descartando fuentes de registros. Cuando la correlación falla, revisa la sincronización de la hora y el parsing antes que cualquier otra cosa.",
  "check": [
   [
    "¿Por qué es útil el enriquecimiento con la criticidad del activo?",
    "Permite que el mismo evento reciba una puntuación más alta en un servidor crítico que en una máquina de pruebas, para que los analistas atiendan primero las alertas más importantes."
   ],
   [
    "Una regla de detección que depende del puerto de destino nunca se activa. ¿Qué deberías revisar?",
    "Si la fuente de registros se está analizando correctamente para que el campo del puerto se complete, y si la fuente siquiera está enviando registros."
   ]
  ]
 },
 {
  "t": "Threat intelligence: sources, STIX/TAXII, indicators of compromise, TTPs and intelligence sharing",
  "tt": "Inteligencia de amenazas: fuentes, STIX/TAXII, indicadores de compromiso, TTP e intercambio de inteligencia",
  "body": [
   "La inteligencia de amenazas es información sobre los adversarios, sus capacidades y su comportamiento, analizada para que apoye la toma de decisiones. Los feeds sin procesar de indicadores son datos; la inteligencia te dice qué amenazas importan para tu organización y qué hacer al respecto.",
   "La inteligencia se presenta en niveles. La inteligencia estratégica informa a los líderes sobre las tendencias y los actores de amenazas que atacan su sector. La inteligencia operacional describe campañas específicas y cómo se desarrollan. La inteligencia táctica proporciona TTP e indicadores para los defensores y los ingenieros de detección. Las fuentes incluyen la inteligencia de fuentes abiertas (OSINT), los proveedores comerciales, las agencias gubernamentales, los centros sectoriales de intercambio y análisis de información (ISAC), los informes de fabricantes y tus propios incidentes, que a menudo son la fuente más relevante de todas.",
   "Los indicadores de compromiso (IoC) son artefactos que sugieren una intrusión, como hashes de archivos, direcciones IP, nombres de dominio, URL y claves del registro. Son fáciles de usar para bloquear y buscar, pero duran poco, porque los atacantes los cambian a bajo costo. Las tácticas, técnicas y procedimientos (TTP) describen cómo opera un adversario, por ejemplo phishing con documentos maliciosos, volcado de credenciales desde la memoria o uso de herramientas de administración remota para el movimiento lateral. La Pirámide del Dolor (Pyramid of Pain) muestra que evadir las detecciones basadas en TTP les cuesta a los atacantes mucho más que evadir las basadas en hashes o IP.",
   "Structured Threat Information Expression (STIX) es un lenguaje estándar para describir objetos de inteligencia de amenazas, como indicadores, malware, actores de amenazas, patrones de ataque y las relaciones entre ellos. Trusted Automated Exchange of Intelligence Information (TAXII) es el protocolo para compartir datos STIX a través de HTTPS. Una plataforma de inteligencia de amenazas (TIP) recolecta, desduplica, puntúa y distribuye la inteligencia al SIEM, los firewalls y el EDR.",
   "El intercambio sigue reglas. El Traffic Light Protocol (TLP) marca qué tan ampliamente puede compartirse la información: TLP:RED (solo destinatarios nombrados), TLP:AMBER y AMBER+STRICT (limitada dentro de las organizaciones), TLP:GREEN (comunidad) y TLP:CLEAR (pública). La calidad de la inteligencia depende de su relevancia, oportunidad, precisión y nivel de confianza, y los indicadores antiguos deben caducar para que no generen falsos positivos."
  ],
  "terms": [
   [
    "IoC",
    "Indicador de compromiso (indicator of compromise): un artefacto como un hash, una IP o un dominio asociado con actividad maliciosa."
   ],
   [
    "TTP",
    "Tácticas, técnicas y procedimientos (tactics, techniques and procedures): los patrones de comportamiento que usa un adversario."
   ],
   [
    "STIX",
    "Structured Threat Information Expression: un formato estándar para describir la inteligencia de amenazas."
   ],
   [
    "TAXII",
    "Protocolo para intercambiar inteligencia STIX a través de HTTPS."
   ],
   [
    "Traffic Light Protocol",
    "Sistema de etiquetado que establece qué tan ampliamente puede distribuirse la información compartida."
   ]
  ],
  "example": "Un banco regional se une al ISAC de su sector y se conecta a su feed TAXII. Cuando el ISAC comparte un informe STIX que describe a un grupo que ataca bancos con falsas llamadas de soporte remoto seguidas de la instalación de una herramienta de acceso remoto, el banco bloquea los dominios listados y, lo que es más útil, escribe una detección para las herramientas de acceso remoto no aprobadas que inician los usuarios, la cual sigue funcionando después de que el grupo cambia su infraestructura.",
  "tip": "STIX es el formato; TAXII es el transporte. Cuando te pregunten qué detecciones duran más, elige el comportamiento (TTP) por sobre los hashes y las IP.",
  "check": [
   [
    "¿Por qué los indicadores de direcciones IP pierden valor rápidamente?",
    "Los atacantes pueden cambiar su infraestructura a bajo costo y con frecuencia, y las IP pueden reasignarse después a usuarios legítimos."
   ],
   [
    "¿Quién puede recibir información marcada como TLP:RED?",
    "Solo los destinatarios específicos nombrados; no debe compartirse más allá."
   ]
  ]
 },
 {
  "t": "Threat hunting: hypothesis-driven hunts, behavioral analytics, UEBA and hunting in endpoint telemetry",
  "tt": "Cacería de amenazas: cacerías basadas en hipótesis, analítica del comportamiento, UEBA y cacería en la telemetría de endpoints",
  "body": [
   "La cacería de amenazas (threat hunting) es la búsqueda proactiva de amenazas que han evadido las detecciones existentes. En lugar de esperar una alerta, los cazadores asumen que una brecha puede haber ocurrido ya y buscan evidencia. La cacería la dirigen los analistas, pero sus mejores resultados se convierten en detecciones automatizadas para que la misma amenaza se detecte la próxima vez sin necesidad de una cacería.",
   "La mayoría de las cacerías comienzan con una hipótesis: una afirmación comprobable basada en inteligencia de amenazas, técnicas de MITRE ATT&CK, un incidente reciente o una brecha conocida. Por ejemplo: 'Un atacante con un punto de apoyo podría estar usando tareas programadas para lograr persistencia en los servidores'. El cazador identifica los datos necesarios (eventos de creación de tareas, creación de procesos con líneas de comando), consulta en busca de anomalías, investiga lo que encuentra y registra el resultado, ya sea malicioso, benigno o una brecha en los datos.",
   "Otros enfoques incluyen las cacerías basadas en inteligencia, que usan indicadores o TTP de un informe nuevo, y las cacerías basadas en datos o situacionales, que buscan valores atípicos, como procesos poco comunes, relaciones padre-hijo inusuales o hosts que hacen conexiones que nadie más hace. El stacking, o análisis de frecuencia, cuenta las apariciones de un valor en todo el entorno; los valores poco comunes merecen una revisión.",
   "La analítica del comportamiento y la analítica del comportamiento de usuarios y entidades (UEBA) construyen líneas base del comportamiento normal de usuarios, hosts y cuentas de servicio, y luego puntúan las desviaciones, como una cuenta que inicia sesión en horarios inusuales, accede a sistemas que nunca usó o descarga muchos más datos de lo habitual. Ayudan a encontrar amenazas internas y cuentas comprometidas que usan credenciales válidas, que las herramientas basadas en firmas pasan por alto.",
   "La telemetría de endpoints de EDR, Sysmon o fuentes similares es un terreno de cacería muy rico: creación de procesos con líneas de comando y hashes, conexiones de red por proceso, cambios en archivos y en el registro, módulos cargados y ejecución de scripts. Las cacerías útiles buscan aplicaciones de Office que lanzan intérpretes de scripts, comandos de PowerShell codificados, acceso a credenciales contra el proceso LSASS, herramientas de administración legítimas usadas de formas inusuales (living off the land) y mecanismos de persistencia como servicios nuevos, claves Run y tareas programadas. Documenta cada cacería para que pueda repetirse, y retroalimenta las brechas encontradas hacia el registro y la ingeniería de detección."
  ],
  "terms": [
   [
    "Threat hunting (cacería de amenazas)",
    "Búsqueda proactiva, dirigida por analistas, de amenazas que evadieron las detecciones existentes."
   ],
   [
    "Hypothesis (hipótesis)",
    "Afirmación comprobable sobre una posible actividad del atacante que guía una cacería."
   ],
   [
    "UEBA",
    "Analítica del comportamiento de usuarios y entidades (user and entity behavior analytics): detectar desviaciones respecto de las líneas base del comportamiento normal."
   ],
   [
    "Stacking",
    "Contar con qué frecuencia aparecen los valores en muchos sistemas para encontrar valores atípicos poco comunes."
   ],
   [
    "Living off the land",
    "Atacantes que usan herramientas legítimas integradas para evitar la detección."
   ]
  ],
  "example": "Después de leer un informe según el cual un grupo de ransomware usa una herramienta legítima de administración remota para lograr persistencia, un cazador hace stacking de todo el software de administración remota instalado en 5.000 endpoints. Tres servidores ejecutan una herramienta que el equipo de TI nunca aprobó. La investigación confirma una intrusión en una etapa temprana, y el cazador convierte la consulta en una detección programada para herramientas de acceso remoto no aprobadas.",
  "tip": "Una cacería que parte de un informe o de una técnica de ATT&CK está basada en hipótesis o en inteligencia. Un acceso legítimo no descarta el mal uso; UEBA señala el comportamiento que se aparta de la propia línea base de un usuario.",
  "check": [
   [
    "¿Qué debe ocurrir cuando una cacería encuentra un patrón malicioso repetible?",
    "Convertirlo en una regla de detección automatizada para que se detecte sin una cacería manual la próxima vez, y corregir cualquier brecha de registro encontrada."
   ],
   [
    "¿Por qué el stacking es útil en entornos grandes?",
    "El software y el comportamiento legítimos son comunes en muchos hosts, así que los valores poco comunes destacan como candidatos para investigar."
   ]
  ]
 },
 {
  "t": "Vulnerability management: scanning, CVSS and EPSS prioritization, false positives and remediation tracking",
  "tt": "Gestión de vulnerabilidades: escaneo, priorización con CVSS y EPSS, falsos positivos y seguimiento de la remediación",
  "body": [
   "La gestión de vulnerabilidades es el ciclo continuo de descubrir activos, encontrar debilidades, priorizarlas, corregirlas y verificar la corrección. Las organizaciones siempre tienen más vulnerabilidades que tiempo, así que la habilidad de nivel sénior es priorizar según el riesgo real.",
   "El escaneo se presenta en varias formas. Los escaneos de red sondean los hosts desde afuera; los escaneos con credenciales (autenticados) inician sesión y leen el software y la configuración instalados, lo que da resultados mucho más precisos; el escaneo basado en agentes funciona para laptops que a menudo están fuera de la red. Los escáneres de nube y de contenedores revisan imágenes, registros y configuraciones, y los escáneres de aplicaciones prueban las aplicaciones web. Los escaneos deben cubrir cada activo del inventario, razón por la cual el descubrimiento de activos va primero.",
   "El Common Vulnerability Scoring System (CVSS) califica la severidad de 0 a 10 usando métricas base como el vector de ataque, la complejidad, los privilegios requeridos y el impacto. La puntuación base de CVSS por sí sola no indica qué tan probable es la explotación ni qué tan importante es el sistema afectado. El Exploit Prediction Scoring System (EPSS) estima la probabilidad de que una vulnerabilidad sea explotada en el futuro cercano, y el catálogo Known Exploited Vulnerabilities (KEV) de CISA enumera las vulnerabilidades con explotación confirmada. Una buena priorización combina la severidad, la evidencia de explotación, la exposición (expuesta a internet o interna), la criticidad del activo, la sensibilidad de los datos y los controles compensatorios.",
   "Los falsos positivos ocurren, especialmente con verificaciones no autenticadas o basadas en versiones. Las distribuciones de Linux a menudo aplican correcciones de seguridad hacia atrás (backport) sin cambiar el número de versión original, así que un escáner puede reportar una versión vulnerable que en realidad está parcheada. Verifica con los avisos del fabricante o los registros de cambios de los paquetes y documenta las excepciones. Los falsos negativos también ocurren, cuando los escaneos no tienen credenciales o pasan por alto activos.",
   "La remediación se sigue mediante tickets con responsables y acuerdos de nivel de servicio según la prioridad, como resolver en días los problemas críticos expuestos a internet. Cuando no es posible parchear, aplica mitigaciones como cambios de configuración, segmentación o parches virtuales con un WAF o un IPS, y registra la aceptación del riesgo con una fecha de vencimiento. Vuelve a escanear para confirmar las correcciones e informa a la dirección tendencias como el tiempo medio de remediación y el cumplimiento de los SLA."
  ],
  "terms": [
   [
    "Credentialed scan (escaneo con credenciales)",
    "Escaneo de vulnerabilidades que inicia sesión en los sistemas para obtener datos precisos de software y configuración."
   ],
   [
    "CVSS",
    "Common Vulnerability Scoring System: calificación de severidad de 0 a 10 para las vulnerabilidades."
   ],
   [
    "EPSS",
    "Exploit Prediction Scoring System: estimación de la probabilidad de que una vulnerabilidad sea explotada."
   ],
   [
    "KEV catalog (catálogo KEV)",
    "Lista de CISA de las vulnerabilidades que se sabe que se explotan activamente."
   ],
   [
    "Virtual patching (parche virtual)",
    "Bloquear la explotación de una vulnerabilidad con un control como una regla de WAF o IPS hasta que se aplique una corrección real."
   ]
  ],
  "example": "Un escaneo reporta 12.000 hallazgos. En lugar de ordenarlos solo por CVSS, el equipo filtra las vulnerabilidades que están en el catálogo KEV o que tienen puntuaciones EPSS altas en sistemas expuestos a internet o críticos, lo que da 60 hallazgos. Estos reciben un SLA de 7 días, y una falla en un appliance VPN que encabeza la lista se parchea en 48 horas, días antes de que los atacantes comiencen a explotarla de forma masiva.",
  "tip": "Una falla con explotación conocida en un sistema expuesto pesa más que una puntuación CVSS más alta en uno aislado. Cuando un escáner señala una versión antigua para la que la distribución aplicó un backport de la corrección, verifícalo y documéntalo como falso positivo.",
  "check": [
   [
    "¿Por qué los escaneos con credenciales son más precisos?",
    "Leen directamente los paquetes, los parches y la configuración instalados en lugar de inferirlos a partir de las respuestas de la red."
   ],
   [
    "¿Qué aporta EPSS que CVSS no aporta?",
    "Una estimación de la probabilidad de explotación en el futuro cercano, en lugar de solo la severidad si se explota."
   ]
  ]
 },
 {
  "t": "Analyzing vulnerabilities and attacks: injection, deserialization, race conditions, memory safety and misconfigurations",
  "tt": "Análisis de vulnerabilidades y ataques: inyección, deserialización, condiciones de carrera, seguridad de memoria y configuraciones erróneas",
  "body": [
   "SecurityX espera que reconozcas las clases comunes de vulnerabilidades a partir de fragmentos de código, registros o descripciones, que expliques por qué son peligrosas y que elijas la corrección adecuada. El enfoque está en las causas raíz y el diseño defensivo, no en la explotación.",
   "Las fallas de inyección ocurren cuando una entrada no confiable se interpreta como código o comandos. La inyección SQL proviene de construir consultas concatenando la entrada; la corrección son las consultas parametrizadas (prepared statements), con validación de entradas y cuentas de base de datos de mínimo privilegio como capas adicionales. La inyección de comandos, la inyección LDAP y el procesamiento de entidades externas XML (XXE) siguen el mismo patrón: mantén los datos separados del código, evita invocar shells con entradas del usuario y deshabilita las funciones peligrosas de los parsers. El cross-site scripting (XSS) inyecta scripts en páginas que ven otras personas y se previene con codificación de salida según el contexto y una content security policy.",
   "La deserialización insegura ocurre cuando una aplicación reconstruye objetos a partir de datos serializados no confiables. Algunos lenguajes ejecutan código durante la reconstrucción de objetos, así que una entrada manipulada puede desencadenar comportamientos peligrosos. Prefiere formatos de datos simples como JSON con validación de esquema, nunca deserialices objetos nativos no confiables, restringe la deserialización a tipos incluidos en una lista de permitidos y firma los datos serializados cuando deban ir y volver a través de los clientes.",
   "Las condiciones de carrera surgen cuando el resultado depende del momento en que ocurren operaciones concurrentes. Las fallas time-of-check to time-of-use (TOCTOU) verifican una condición, como un saldo o un permiso de archivo, y actúan sobre ella más tarde, lo que permite que otra solicitud cambie las cosas en el intervalo. Las correcciones incluyen operaciones atómicas, transacciones de base de datos con el aislamiento adecuado y bloqueos.",
   "Las fallas de seguridad de memoria, comunes en C y C++, incluyen los desbordamientos de búfer, el use-after-free y los desbordamientos de enteros, que pueden provocar fallos o ejecución de código. Las mitigaciones incluyen lenguajes con seguridad de memoria como Rust, Go, Java o C#, protecciones del compilador, la aleatorización del espacio de direcciones (ASLR), la prevención de ejecución de datos (DEP), el fuzzing y la revisión cuidadosa del código. Las configuraciones erróneas son igual de comunes y a menudo más fáciles de explotar: credenciales predeterminadas, mensajes de error demasiado detallados, almacenamiento en la nube abierto, servicios innecesarios, cabeceras de seguridad faltantes y permisos demasiado amplios. Otras clases que debes reconocer incluyen la falsificación de solicitudes del lado del servidor (SSRF), el control de acceso roto, como las referencias directas inseguras a objetos, y la falsificación de solicitudes entre sitios (CSRF)."
  ],
  "terms": [
   [
    "Parameterized query (consulta parametrizada)",
    "Consulta de base de datos en la que la entrada del usuario se pasa como parámetros de datos, nunca como parte del código SQL."
   ],
   [
    "Insecure deserialization (deserialización insegura)",
    "Reconstruir objetos a partir de datos no confiables de una forma que puede desencadenar comportamientos no deseados."
   ],
   [
    "TOCTOU",
    "Time-of-check to time-of-use: condición de carrera entre la verificación de una condición y la acción basada en ella."
   ],
   [
    "Use-after-free",
    "Falla de memoria en la que un programa usa memoria después de haberla liberado."
   ],
   [
    "SSRF",
    "Falsificación de solicitudes del lado del servidor (server-side request forgery): engañar a un servidor para que haga solicitudes a destinos no previstos, como servicios internos."
   ]
  ],
  "example": "Una revisión de código de un servicio de reembolsos encuentra que verifica si un pedido es elegible y luego emite el reembolso en una llamada separada a la base de datos. Las pruebas con solicitudes concurrentes muestran que el mismo pedido puede reembolsarse varias veces. El equipo envuelve la verificación y el reembolso en una sola transacción de base de datos con un bloqueo de fila, y agrega una restricción de unicidad para los reembolsos por pedido.",
  "tip": "Relaciona la corrección con la causa raíz: consultas parametrizadas para la inyección SQL, codificación de salida para XSS, transacciones atómicas para las condiciones de carrera, formatos solo de datos y listas de permitidos para la deserialización, lenguajes con seguridad de memoria y fuzzing para la corrupción de memoria.",
  "check": [
   [
    "¿Por qué bloquear palabras clave como SELECT es una mala corrección para la inyección SQL?",
    "Las listas de bloqueo son fáciles de evadir con codificaciones y variaciones y pueden bloquear entradas legítimas; las consultas parametrizadas eliminan la causa raíz."
   ],
   [
    "¿Qué hace posible una falla TOCTOU?",
    "Un intervalo entre la verificación de una condición y el uso del resultado, durante el cual otro proceso o solicitud cambia el estado."
   ]
  ]
 },
 {
  "t": "Malware and indicator analysis: static vs dynamic analysis, sandboxing, YARA rules and file hashing",
  "tt": "Análisis de malware e indicadores: análisis estático frente a dinámico, sandboxing, reglas YARA y hashing de archivos",
  "body": [
   "Cuando aparece un archivo, script o adjunto de correo sospechoso, los analistas necesitan saber qué hace, si es malicioso y qué indicadores permitirán encontrarlo en otros lugares. El análisis de malware debe hacerse de forma segura para que la muestra no pueda propagarse ni alertar a los atacantes.",
   "El análisis estático examina una muestra sin ejecutarla. Los analistas calculan los hashes del archivo, los comparan con la inteligencia de amenazas, identifican el tipo de archivo, revisan las cadenas legibles (URL, direcciones IP, comandos) e inspeccionan las cabeceras, las funciones importadas, las firmas digitales y el empaquetado (packing) u ofuscación. El análisis estático es seguro y rápido, pero puede ser burlado por el empaquetado y el cifrado.",
   "El análisis dinámico ejecuta la muestra en un entorno controlado y observa su comportamiento: procesos creados, archivos escritos, cambios en el registro, intentos de persistencia y conexiones de red. Los sandboxes automatizan esto en máquinas virtuales aisladas, a menudo con servicios de internet simulados para que la muestra revele a qué intenta conectarse. Algunos malware detectan los sandboxes, esperan antes de actuar o requieren interacción del usuario, por lo que los resultados pueden ser incompletos. Los entornos de análisis deben estar aislados de las redes de producción, y las muestras nunca deben subirse a servicios públicos cuando puedan contener datos sensibles.",
   "Los hashes identifican los archivos con exactitud. Los hashes criptográficos como SHA-256 dan una huella digital única, útil para buscar y bloquear, pero cualquier cambio en el archivo cambia el hash. El fuzzy hashing, como ssdeep, y el import hashing pueden agrupar archivos similares. MD5 y SHA-1 todavía aparecen en los feeds de amenazas para la identificación, pero no son adecuados cuando importa la resistencia a colisiones.",
   "Las reglas YARA describen familias de malware con cadenas, patrones de bytes y condiciones, como 'el archivo es un ejecutable de Windows y contiene al menos dos de estas tres cadenas distintivas'. Detectan variantes que los hashes exactos pasan por alto y pueden escanear archivos, memoria y repositorios. Las buenas reglas equilibran la especificidad con los falsos positivos y se prueban contra archivos conocidos como legítimos. Los resultados del análisis alimentan el incidente: los indicadores van al SIEM y al EDR para hacer barridos, y el comportamiento va a la ingeniería de detección."
  ],
  "terms": [
   [
    "Static analysis (análisis estático)",
    "Examinar una muestra sin ejecutarla, por ejemplo hashes, cadenas y cabeceras."
   ],
   [
    "Dynamic analysis (análisis dinámico)",
    "Ejecutar una muestra en un entorno controlado para observar su comportamiento."
   ],
   [
    "Sandbox",
    "Entorno aislado para ejecutar y observar de forma segura código sospechoso."
   ],
   [
    "YARA",
    "Lenguaje de reglas para identificar y clasificar archivos según patrones y condiciones."
   ],
   [
    "Fuzzy hashing",
    "Hashing que produce valores similares para archivos similares, lo que ayuda a agrupar variantes."
   ]
  ],
  "example": "Una usuaria reporta un adjunto de factura. La analista calcula su hash y no encuentra coincidencias en los feeds de amenazas, así que revisa las cadenas, que muestran un script ofuscado. En un sandbox, el archivo lanza PowerShell y se conecta a un dominio registrado dos días antes. Ella bloquea el dominio, hace un barrido en el EDR en busca del hash y del dominio, y escribe una regla YARA para la estructura distintiva del script, que más adelante detecta tres variantes con hashes diferentes.",
  "tip": "Los hashes exactos pasan por alto las variantes recompiladas; las reglas YARA detectan patrones compartidos. Analiza siempre las muestras en un sandbox aislado, no en una estación de trabajo de producción, y evita subir muestras sensibles a sitios públicos.",
  "check": [
   [
    "¿Por qué una muestra podría no mostrar ningún comportamiento malicioso en un sandbox?",
    "Puede detectar el entorno virtual, esperar un tiempo, necesitar interacción del usuario o depender de un servidor de comando que no está disponible."
   ],
   [
    "¿Cuál es una limitación del análisis estático?",
    "El empaquetado, el cifrado y la ofuscación pueden ocultar el código y las cadenas reales a la inspección."
   ]
  ]
 },
 {
  "t": "Incident response process: preparation, detection, containment, eradication, recovery and lessons learned",
  "tt": "Proceso de respuesta a incidentes: preparación, detección, contención, erradicación, recuperación y lecciones aprendidas",
  "body": [
   "La respuesta a incidentes (IR) es el enfoque organizado para manejar los incidentes de seguridad de modo que el daño, el costo y el tiempo de recuperación se mantengan bajos. NIST SP 800-61 describe un ciclo de vida ampliamente utilizado: preparación; detección y análisis; contención, erradicación y recuperación; y actividades posteriores al incidente. La revisión más reciente de 800-61 mapea estas actividades a las funciones del NIST CSF, pero los pasos de fondo son los mismos.",
   "La preparación ocurre antes de cualquier incidente: un plan y una política de respuesta a incidentes, roles definidos y un equipo de respuesta a incidentes, playbooks para escenarios comunes como el ransomware y el compromiso del correo empresarial, listas de contactos que incluyan a legal, relaciones públicas, aseguradoras y reguladores, registros y herramientas implementados, y ejercicios periódicos. Los contratos de retención (retainers) con firmas de IR y una decisión preaprobada sobre quién puede desconectar sistemas ahorran horas cuando el tiempo importa.",
   "La detección y el análisis confirman si un evento es un incidente, determinan el alcance y la severidad, e inician la documentación. Los analistas correlacionan alertas, identifican los sistemas y las cuentas afectados y reúnen indicadores. La priorización depende del impacto funcional, el impacto en los datos y la capacidad de recuperación.",
   "La contención detiene la propagación: aislar hosts de la red (a menudo con EDR), deshabilitar cuentas comprometidas, bloquear dominios e IP maliciosos y segmentar los sistemas afectados. La contención a corto plazo actúa rápido; la contención a largo plazo mantiene el negocio funcionando de forma segura mientras se prepara una corrección completa. Siempre que sea posible, debe preservarse la evidencia antes de las acciones destructivas. La erradicación elimina la presencia del atacante: malware, mecanismos de persistencia, cuentas de puerta trasera y la vulnerabilidad o debilidad que le permitió entrar. La recuperación restaura los sistemas a partir de fuentes conocidas como íntegras, valida que estén limpios y parcheados, los devuelve a producción por etapas y monitorea de cerca para detectar una reinfección.",
   "Las actividades posteriores al incidente, o lecciones aprendidas, revisan qué ocurrió, qué funcionó y qué no, y convierten los hallazgos en mejoras: nuevas detecciones, brechas corregidas, playbooks actualizados y capacitación. Una revisión sin culpables (blameless) fomenta la honestidad. La comunicación está presente en todo momento, incluida la revisión legal de las obligaciones de notificación y los mensajes internos y externos coordinados."
  ],
  "terms": [
   [
    "Playbook",
    "Procedimiento documentado para manejar un tipo específico de incidente."
   ],
   [
    "Containment (contención)",
    "Acciones que limitan la propagación y el impacto de un incidente."
   ],
   [
    "Eradication (erradicación)",
    "Eliminar la causa de un incidente, incluidos el malware, la persistencia y la debilidad explotada."
   ],
   [
    "Recovery (recuperación)",
    "Restaurar los sistemas a su funcionamiento normal y verificar que estén limpios."
   ],
   [
    "Lessons learned (lecciones aprendidas)",
    "Revisión posterior al incidente que identifica mejoras para prevenir o manejar mejor los incidentes futuros."
   ]
  ],
  "example": "Las alertas del EDR muestran ransomware cifrando archivos en dos servidores de archivos. El equipo aísla ambos servidores y la laptop del paciente cero, deshabilita la cuenta de servicio comprometida y bloquea el dominio del servidor de comando (contención). Elimina las tareas programadas del atacante y parchea la falla de la VPN que fue explotada (erradicación), restaura los archivos desde respaldos inmutables después de verificarlos (recuperación) y, una semana después, realiza una revisión que lleva a exigir MFA en todas las cuentas de servicio con derechos de inicio de sesión interactivo.",
  "tip": "El orden importa: después de la detección y el análisis viene la contención, luego la erradicación, luego la recuperación, y las lecciones aprendidas van al final. Restaurar antes de la contención y del análisis de la causa raíz implica riesgo de reinfección.",
  "check": [
   [
    "¿Por qué preservar la evidencia antes de borrar un sistema comprometido?",
    "La evidencia es necesaria para entender el alcance y la causa raíz, respaldar acciones legales y cumplir las obligaciones de notificación; borrar el sistema la destruye."
   ],
   [
    "¿Qué debe incluir la recuperación además de restaurar desde un respaldo?",
    "Validar que el sistema restaurado esté limpio y parcheado, devolverlo al servicio por etapas y monitorear de cerca en busca de señales de reinfección."
   ]
  ]
 },
 {
  "t": "Digital forensics: order of volatility, chain of custody, memory and disk acquisition, and timeline analysis",
  "tt": "Informática forense: orden de volatilidad, cadena de custodia, adquisición de memoria y disco, y análisis de línea de tiempo",
  "body": [
   "La informática forense recolecta y analiza evidencia de una manera que preserva su integridad, para que la organización, los reguladores y, si es necesario, un tribunal puedan confiar en los hallazgos. Incluso cuando una acción legal es poco probable, la disciplina forense produce mejores investigaciones.",
   "El orden de volatilidad guía la recolección: captura primero la evidencia de vida más corta. A grandes rasgos, eso es los registros y la caché de la CPU, luego la memoria (RAM), incluidos los procesos en ejecución, las conexiones de red y los usuarios con sesión iniciada, luego los sistemas de archivos temporales y el swap, luego el disco, luego los registros remotos y los datos de monitoreo, y luego los medios de archivo como los respaldos. Desconectar la energía o reiniciar un sistema destruye la evidencia de la memoria, incluido el malware que existe solo en memoria y las claves de cifrado.",
   "La adquisición de memoria usa herramientas confiables ejecutadas desde medios externos para volcar la RAM a una unidad externa, minimizando los cambios en el sistema. Luego, las herramientas de análisis de memoria pueden listar procesos, conexiones de red, módulos cargados, código inyectado e historial de comandos. La adquisición de disco crea una imagen forense bit a bit, a menudo usando un bloqueador de escritura para que el original no se modifique. Los entornos virtuales y en la nube ofrecen snapshots de los discos y, a veces, de la memoria, que deben tomarse temprano y protegerse.",
   "La integridad se demuestra con hashes criptográficos calculados en la adquisición y recalculados cada vez que se examina la evidencia; si los hashes coinciden, la evidencia no ha cambiado. La cadena de custodia documenta a cada persona que manipuló la evidencia, cuándo, dónde y por qué, desde la recolección hasta su presentación. Los analistas trabajan con copias, nunca con el original. Las retenciones legales, las reglas de privacidad y la jurisdicción pueden afectar lo que se puede recolectar.",
   "El análisis de línea de tiempo reúne en una sola vista cronológica los eventos provenientes de los metadatos del sistema de archivos (fechas de creación, modificación y acceso), los registros, el registro de Windows, el historial del navegador y la memoria. Muestra cómo entró el atacante, qué hizo y qué datos tocó. Presta atención a las diferencias de zona horaria y a la manipulación de marcas de tiempo (timestomping). Los hallazgos deben plasmarse en un informe claro que separe los hechos de la interpretación."
  ],
  "terms": [
   [
    "Order of volatility (orden de volatilidad)",
    "Secuencia para recolectar evidencia de la de vida más corta a la de vida más larga."
   ],
   [
    "Chain of custody (cadena de custodia)",
    "Documentación de quién manipuló la evidencia, cuándo y por qué, desde la recolección en adelante."
   ],
   [
    "Write blocker (bloqueador de escritura)",
    "Dispositivo o software que impide cambios en el medio de almacenamiento durante la adquisición."
   ],
   [
    "Forensic image (imagen forense)",
    "Copia bit a bit de un medio de almacenamiento que se usa para el análisis."
   ],
   [
    "Timeline analysis (análisis de línea de tiempo)",
    "Ordenar cronológicamente eventos de muchas fuentes para reconstruir un incidente."
   ]
  ],
  "example": "Se sospecha que un servidor ejecuta malware sin archivos (fileless). El responsable de la respuesta primero captura la RAM en una unidad externa y registra el hash SHA-256, luego toma una imagen del disco a través de un bloqueador de escritura y también calcula su hash. Ambos hashes y cada entrega se registran en el formulario de cadena de custodia. El análisis de memoria revela código inyectado en un proceso legítimo, y una línea de tiempo construida con los registros y los metadatos de archivos muestra que el atacante inició sesión por primera vez mediante una cuenta VPN robada tres días antes.",
  "tip": "La memoria antes que el disco, el disco antes que los respaldos. Los hashes demuestran la integridad; la cadena de custodia demuestra la manipulación correcta. Los analistas examinan copias, no la evidencia original.",
  "check": [
   [
    "¿Por qué capturar la memoria antes de apagar un servidor que se sospecha comprometido?",
    "La memoria contiene los procesos en ejecución, las conexiones de red, el malware sin archivos y las claves, que se pierden al cortar la energía."
   ],
   [
    "¿Cómo demuestras que una imagen forense no fue alterada?",
    "Comparando su hash actual con el hash registrado en la adquisición y presentando los registros de la cadena de custodia."
   ]
  ]
 },
 {
  "t": "Attack surface management and exposure reduction: asset discovery, external scanning and penetration test findings",
  "tt": "Gestión de la superficie de ataque y reducción de la exposición: descubrimiento de activos, escaneo externo y hallazgos de pruebas de penetración",
  "body": [
   "Tu superficie de ataque es cada punto que un atacante podría usar para entrar: sistemas expuestos a internet, servicios en la nube, API, acceso remoto, conexiones con terceros, cuentas de usuario e incluso las personas que pueden caer en un phishing. La gestión de la superficie de ataque (ASM) descubre continuamente esa superficie desde el punto de vista del atacante y trabaja para reducirla.",
   "El descubrimiento de la superficie de ataque externa comienza con lo que posee la organización: dominios y subdominios (a partir del DNS, los registros de certificate transparency y los datos de los registradores), rangos de IP, cuentas en la nube y tenants de SaaS. Luego encuentra lo que está expuesto: puertos y servicios abiertos, páginas de inicio de sesión, sitios de prueba y staging, sitios de marketing olvidados, almacenamiento expuesto y credenciales filtradas. Las fusiones, las adquisiciones y el shadow IT a menudo agregan activos que nadie en seguridad conoce. Cada activo descubierto debe recibir un responsable en el inventario, o ser dado de baja.",
   "La reducción de la exposición elimina lo que no se necesita y protege lo que sí. Las acciones típicas incluyen dar de baja los sistemas no usados, colocar las interfaces administrativas detrás de una VPN o ZTNA, eliminar el acceso directo desde internet a las bases de datos y al escritorio remoto, cerrar los puertos innecesarios, eliminar las cuentas predeterminadas y huérfanas, parchear primero los servicios expuestos y endurecer los permisos del almacenamiento en la nube. La superficie de ataque interna también importa: los permisos excesivos, las redes planas y las cuentas obsoletas facilitan el movimiento lateral.",
   "Las pruebas de penetración simulan ataques reales con autorización, dentro de un alcance escrito y unas reglas de enfrentamiento, para mostrar lo que un atacante podría lograr realmente. Los ejercicios de red team ponen a prueba la detección y la respuesta frente a un adversario realista, a veces con purple teaming, en el que atacantes y defensores trabajan juntos para mejorar las detecciones. Los programas de bug bounty invitan a investigadores externos a reportar problemas bajo reglas definidas.",
   "El valor de una prueba está en actuar sobre sus hallazgos. Valida cada hallazgo, prioriza según el riesgo y no solo según la severidad asignada por el evaluador, asigna responsables y plazos, busca las causas raíz (por ejemplo, la falta de un estándar de endurecimiento en lugar de un solo servidor mal configurado) y vuelve a probar para confirmar las correcciones. Da seguimiento a los hallazgos repetidos entre pruebas, porque muestran un proceso que no está funcionando."
  ],
  "terms": [
   [
    "Attack surface management (gestión de la superficie de ataque)",
    "Descubrimiento, inventario y reducción continuos de los activos expuestos a los atacantes."
   ],
   [
    "Certificate transparency",
    "Registros públicos de los certificados TLS emitidos, útiles para descubrir los nombres de host de una organización."
   ],
   [
    "Rules of engagement (reglas de enfrentamiento)",
    "Alcance, métodos, calendario y límites acordados para una prueba de penetración."
   ],
   [
    "Purple teaming",
    "Colaboración entre atacantes (red) y defensores (blue) para mejorar la detección y la respuesta."
   ],
   [
    "Shadow IT",
    "Sistemas y servicios que se usan sin el conocimiento ni la aprobación de TI y de seguridad."
   ]
  ],
  "example": "Después de adquirir dos empresas más pequeñas, un fabricante ejecuta un descubrimiento de la superficie de ataque externa y encuentra 40 hosts expuestos a internet que no estaban en su inventario, entre ellos un servidor de escritorio remoto sin MFA y un antiguo portal de clientes en un servidor web sin soporte. Da de baja el portal, traslada el escritorio remoto detrás de ZTNA, asigna responsables a los hosts restantes y agrega los dominios adquiridos al monitoreo continuo.",
  "tip": "No puedes proteger activos que no conoces, así que el descubrimiento va primero. Los hallazgos de las pruebas de penetración deben corregirse en la causa raíz y volver a probarse.",
  "check": [
   [
    "¿Cómo pueden ayudar los registros de certificate transparency al descubrimiento de activos?",
    "Enumeran los certificados emitidos para tus dominios, lo que revela nombres de host y subdominios que podrían no estar en tu inventario."
   ],
   [
    "¿Por qué una prueba de penetración debe tener reglas de enfrentamiento por escrito?",
    "Definen el alcance, los métodos permitidos, el calendario y los contactos, lo que da autorización legal y evita daños a sistemas fuera de los límites acordados."
   ]
  ]
 },
 {
  "t": "Detection engineering: writing and testing detection rules, Sigma, MITRE ATT&CK coverage mapping and deception technologies",
  "tt": "Ingeniería de detección: redacción y prueba de reglas de detección, Sigma, mapeo de cobertura de MITRE ATT&CK y tecnologías de engaño",
  "body": [
   "La ingeniería de detección trata las detecciones como software: se diseñan a partir del conocimiento de las amenazas, se escriben como código, se prueban, se revisan, se despliegan mediante un proceso controlado y se mantienen con el tiempo. Esto produce detecciones confiables, comprensibles y medibles.",
   "Una buena detección comienza con un propósito claro: qué comportamiento del adversario busca, qué fuente de datos necesita y qué debe hacer un analista cuando se activa. Las detecciones basadas en el comportamiento, como un proceso de Microsoft Office que lanza una shell de comandos, o un nuevo servicio instalado desde un directorio temporal, duran más que las detecciones basadas en un solo hash o IP. Cada regla debe incluir documentación, severidad, fuentes conocidas de falsos positivos, la técnica de ATT&CK correspondiente y un playbook de respuesta.",
   "Sigma es un formato abierto y neutral respecto de los fabricantes para escribir reglas de detección basadas en registros en YAML. Una regla Sigma describe la fuente de registros y las condiciones que deben coincidir, y los conversores la traducen al lenguaje de consulta de un SIEM específico. Esto permite a los equipos compartir y reutilizar detecciones entre plataformas. Los formatos relacionados incluyen YARA para archivos y las reglas de Snort o Suricata para el tráfico de red.",
   "Las pruebas son esenciales. Valida las reglas contra datos históricos para estimar las tasas de falsos positivos, y contra actividad simulada del atacante en un laboratorio, usando emulación segura de adversarios o frameworks de pruebas unitarias, para confirmar que se activan. Guarda las reglas en control de versiones, revisa los cambios y despliégalas mediante un pipeline para que una regla rota no deje de funcionar en silencio.",
   "El mapeo de cobertura de MITRE ATT&CK muestra qué técnicas puedes detectar, detectar parcialmente o no puedes ver, según tus fuentes de datos y reglas. Prioriza las brechas usando inteligencia de amenazas sobre los grupos que probablemente te ataquen. Las tecnologías de engaño agregan detecciones de alta confianza: los honeypots son sistemas señuelo, los honeytokens son credenciales, archivos o registros falsos, y los canary tokens alertan cuando se tocan. Como los usuarios legítimos no tienen ningún motivo para interactuar con los señuelos, cualquier interacción es una señal fuerte, lo que hace que el engaño sea valioso para detectar el movimiento lateral y la actividad interna maliciosa."
  ],
  "terms": [
   [
    "Detection engineering (ingeniería de detección)",
    "Diseñar, construir, probar y mantener las detecciones como código gestionado."
   ],
   [
    "Sigma",
    "Formato YAML neutral respecto de los fabricantes para reglas de detección basadas en registros que pueden convertirse en consultas de SIEM."
   ],
   [
    "Coverage mapping (mapeo de cobertura)",
    "Mostrar qué técnicas de ATT&CK pueden observar las detecciones y las fuentes de datos existentes."
   ],
   [
    "Honeytoken",
    "Credencial, archivo o registro falso que nunca debería usarse, de modo que cualquier uso indica un compromiso."
   ],
   [
    "Adversary emulation (emulación de adversarios)",
    "Reproducir de forma segura comportamientos conocidos de adversarios para poner a prueba las defensas."
   ]
  ],
  "example": "Un equipo de detección mapea sus reglas del SIEM a ATT&CK y descubre que no tiene cobertura para el volcado de credenciales. Escribe una regla Sigma para el acceso sospechoso al proceso LSASS, la convierte para su SIEM, la prueba en un laboratorio con una herramienta de emulación segura y excluye mediante ajuste a un agente de respaldo que también lee la memoria de LSASS. Además, planta una cuenta de administrador honeytoken en Active Directory; cualquier intento de inicio de sesión con ella genera una alerta crítica.",
  "tip": "Sigma es para eventos de registros en distintos SIEM; YARA es para archivos; Snort y Suricata son para paquetes de red. Las alertas de engaño son de alta fidelidad porque los usuarios legítimos nunca tocan los señuelos.",
  "check": [
   [
    "¿Por qué guardar las reglas de detección en control de versiones y desplegarlas mediante un pipeline?",
    "Los cambios se revisan y se prueban, se conserva el historial, y las reglas rotas o ruidosas pueden detectarse o revertirse antes de que creen puntos ciegos."
   ],
   [
    "¿Por qué los honeytokens producen pocos falsos positivos?",
    "No tienen ningún uso legítimo, así que cualquier interacción con ellos es sospechosa por definición."
   ]
  ]
 }
], { lang: "es" });
