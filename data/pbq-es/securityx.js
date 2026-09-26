/* Spanish translation of the CompTIA SecurityX exam simulations. Same ids and structure as data/pbq/securityx.js. */
CertHub.addPbqs("securityx", [
  { id: "governance-docs-match", d: 1, type: "match", title: "Ubica los requisitos en la jerarquía de gobernanza",
    prompt: "Un CISO está reorganizando la biblioteca de documentos de seguridad. Relaciona cada enunciado con el tipo de documento de gobernanza al que pertenece.",
    pairs: [
      ["Todos los datos de la empresa deben protegerse de acuerdo con su clasificación.", "Política"],
      ["Las laptops deben usar cifrado de disco completo con AES-256 y claves protegidas por TPM.", "Estándar"],
      ["1. Abre la consola de cifrado. 2. Selecciona el dispositivo. 3. Exporta la clave de recuperación a la bóveda.", "Procedimiento"],
      ["Considera usar una frase de contraseña de cuatro o más palabras aleatorias para tus cuentas personales.", "Guía"],
      ["Toda compilación de servidor Windows debe deshabilitar SMBv1 y habilitar el registro de auditoría según CIS Level 1.", "Línea base"]
    ],
    extra: ["Registro de riesgos", "Excepción"],
    explain: "Una política es una declaración de intención breve y obligatoria, aprobada por la dirección. Un estándar la vuelve medible (un algoritmo específico). Un procedimiento son instrucciones paso a paso, y una guía es un consejo opcional. Una línea base fija la configuración mínima para una clase de sistemas, a menudo a partir de un CIS Benchmark. La trampa habitual es poner valores técnicos, como algoritmos, en la política, que entonces necesitaría la aprobación del consejo cada vez que cambie la tecnología." },

  { id: "ale-fill", d: 1, type: "fill", title: "Calcula la expectativa de pérdida anualizada",
    prompt: "Usa los datos de la evaluación de riesgos para completar los valores. Escribe los montos en dólares enteros, sin símbolos ni comas.",
    context: "Activo: base de datos de pedidos de clientes\nValor del activo (AV): $500,000\nFactor de exposición (EF) para un evento de ransomware: 40%\nTasa anualizada de ocurrencia (ARO): 0.5 (una vez cada dos años)\nControl propuesto: respaldos inmutables más EDR, costo anual $60,000\nARO esperado con el control: 0.1 (EF sin cambios)",
    fields: [
      { label: "Expectativa de pérdida única (SLE) sin el control", answers: ["200000"] },
      { label: "Expectativa de pérdida anualizada (ALE) sin el control", answers: ["100000"] },
      { label: "ALE con el control", answers: ["20000"] },
      { label: "Valor neto anual del control (reducción del ALE menos el costo del control)", answers: ["20000"] }
    ],
    explain: "SLE = AV x EF = $500,000 x 0.4 = $200,000. ALE = SLE x ARO = $200,000 x 0.5 = $100,000. Con el control, ALE = $200,000 x 0.1 = $20,000, así que el control reduce el ALE en $80,000 por año. Al restar su costo de $60,000 queda un valor neto de $20,000, así que el control se justifica por su costo. Un error común es comparar el costo del control con el SLE en lugar de con la reducción del ALE." },

  { id: "sg-rule-review", d: 2, type: "select", title: "Revisa las reglas de un security group en la nube",
    prompt: "Una app de tres capas debe cumplir estos requisitos: solo HTTPS desde internet hacia el balanceador de carga; la capa web acepta tráfico solo del balanceador de carga; solo la capa web llega a la capa de aplicación en el 8443; solo la capa de aplicación llega a la base de datos en el 5432; la administración solo a través del bastion host en 10.0.0.10. Selecciona todas las reglas que violan los requisitos.",
    context: "Regla Destino       Dirección  Origen          Puerto/Proto\n1     lb-sg         inbound    0.0.0.0/0       443/tcp\n2     lb-sg         inbound    0.0.0.0/0       80/tcp\n3     web-sg        inbound    lb-sg           443/tcp\n4     web-sg        inbound    0.0.0.0/0       22/tcp\n5     app-sg        inbound    web-sg          8443/tcp\n6     app-sg        inbound    10.0.0.10/32    22/tcp\n7     db-sg         inbound    app-sg          5432/tcp\n8     db-sg         inbound    web-sg          5432/tcp",
    options: ["Regla 1", "Regla 2", "Regla 3", "Regla 4", "Regla 5", "Regla 6", "Regla 7", "Regla 8"],
    answers: [1, 3, 7],
    explain: "La regla 2 permite HTTP sin cifrar desde internet cuando solo se permite HTTPS. La regla 4 expone el SSH de la capa web a todo internet en lugar de solo al bastion host. La regla 8 permite que la capa web hable directamente con la base de datos, evadiendo la capa de aplicación y rompiendo el diseño por capas. La regla 6 es aceptable porque el SSH viene solo del bastion en 10.0.0.10, y usar security groups como origen (reglas 3, 5 y 7) es la forma preferida de expresar la confianza entre capas." },

  { id: "identity-protocol-match", d: 2, type: "match", title: "Relaciona requisitos de identidad con protocolos",
    prompt: "Relaciona cada requisito con el protocolo o la tecnología que mejor lo cumple.",
    pairs: [
      ["SSO desde el navegador hacia SaaS empresarial usando aserciones XML firmadas", "SAML 2.0"],
      ["Una app móvil llama a una API en nombre del usuario sin ver su contraseña", "OAuth 2.0 con PKCE"],
      ["Una app web necesita un ID token firmado que describa al usuario que inició sesión", "OpenID Connect"],
      ["Los puertos cableados de los switches solo admiten dispositivos corporativos autenticados", "802.1X con RADIUS"],
      ["Los comandos de los administradores en los routers se autorizan y registran uno por uno", "TACACS+"]
    ],
    extra: ["LDAP simple bind", "Kerberos constrained delegation"],
    explain: "SAML usa aserciones XML para el SSO web. OAuth 2.0 sirve para la autorización delegada con access tokens, y PKCE protege el flujo de código de autorización para clientes públicos, como las apps móviles. OIDC agrega autenticación sobre OAuth 2.0 con un ID token (un JWT). 802.1X con un servidor RADIUS controla el acceso a los puertos de red, mientras que TACACS+ separa autenticación, autorización y contabilidad (accounting) para que cada comando en el dispositivo pueda autorizarse y registrarse. Una confusión frecuente es tratar OAuth 2.0 por sí solo como un protocolo de autenticación." },

  { id: "devsecops-pipeline-order", d: 2, type: "order", title: "Ordena los controles de seguridad en un pipeline de CI/CD",
    prompt: "Pon estas actividades de seguridad del pipeline en el orden en que normalmente ocurren, desde el commit de un desarrollador hasta producción.",
    steps: [
      "El escaneo de secretos y el SAST se ejecutan en el pull request",
      "El análisis de composición de software revisa las dependencias durante el build",
      "La imagen del contenedor se escanea y se firma con la procedencia del build",
      "El DAST se ejecuta contra la aplicación desplegada en staging",
      "El admission controller del clúster verifica la firma de la imagen antes del despliegue a producción"
    ],
    explain: "Las verificaciones que solo necesitan el código fuente (escaneo de secretos, SAST) se ejecutan primero en el pull request. El SCA se ejecuta cuando se resuelven las dependencias durante el build. La imagen construida se escanea y se firma con su procedencia antes de promoverse. El DAST necesita una aplicación en ejecución, así que corre en staging. Por último, el control de admisión en producción rechaza cualquier imagen que no haya firmado el pipeline oficial, lo que protege contra imágenes alteradas o introducidas por fuera del proceso." },

  { id: "email-dns-records", d: 3, type: "select", title: "Encuentra debilidades en los registros de autenticación de correo",
    prompt: "Están suplantando a la empresa example.com en correos de phishing. Revisa sus registros DNS y selecciona todos los hallazgos que debilitan la protección contra la suplantación.",
    context: "example.com.                TXT  \"v=spf1 include:_spf.mailhost.example.net +all\"\nsel1._domainkey.example.com TXT  \"v=DKIM1; k=rsa; p=MIIBIjANBgkqh...AQAB\"\n_dmarc.example.com          TXT  \"v=DMARC1; p=none; rua=mailto:dmarc@example.com\"\nparked-example.com          (sin SPF ni DMARC; el dominio no envía correo)\nexample.com                 MX   10 mx1.example.com.",
    options: [
      "El registro SPF termina en +all, lo que autoriza a cualquier servidor a enviar",
      "El registro DKIM publica una clave pública bajo un selector",
      "La política DMARC es p=none, así que el correo que falla se sigue entregando",
      "El registro DMARC incluye una dirección para reportes agregados (rua)",
      "El dominio estacionado no tiene SPF ni política DMARC de rechazo",
      "El registro MX apunta a un host del mismo dominio"
    ],
    answers: [0, 2, 4],
    explain: "Un registro SPF que termina en +all aprueba a cualquier remitente, lo que vuelve inútil a SPF; debería terminar en -all o ~all. DMARC en p=none solo monitorea, así que el correo suplantado se sigue entregando; después de revisar los reportes, la política debería pasar a quarantine y luego a reject. Los dominios estacionados que no envían correo deberían publicar 'v=spf1 -all' y una política DMARC de reject para que los atacantes no puedan usarlos. Publicar una clave DKIM, recibir reportes rua y tener un host MX dentro del dominio es normal y correcto." },

  { id: "crypto-usecase-match", d: 3, type: "match", title: "Relaciona objetivos de seguridad con técnicas criptográficas",
    prompt: "Relaciona cada requisito con la técnica criptográfica que mejor lo satisface.",
    pairs: [
      ["El tráfico TLS capturado debe seguir seguro aunque después roben la clave privada del servidor", "Intercambio de claves ECDHE efímero"],
      ["Rotar una clave maestra sin volver a cifrar terabytes de archivos almacenados", "Cifrado de sobre (envelope encryption)"],
      ["Las contraseñas almacenadas deben ser lentas de descifrar offline", "Argon2id con una sal única"],
      ["Los clientes deben poder verificar que un instalador vino del proveedor sin modificaciones", "Firma de código"],
      ["Un servicio en la nube debe calcular totales sobre datos que nunca puede descifrar", "Cifrado homomórfico"],
      ["Proteger secretos de larga vida contra futuros ataques cuánticos al intercambio de claves", "ML-KEM"]
    ],
    extra: ["SHA-256 sin sal", "Codificación Base64"],
    explain: "El (EC)DHE efímero brinda forward secrecy, así que una clave de largo plazo robada no puede descifrar sesiones pasadas. El cifrado de sobre envuelve claves de datos por objeto con una clave maestra, así que rotar la clave maestra solo implica volver a envolver las pequeñas claves de datos. Argon2id es un hash de contraseñas lento y de memoria intensiva (memory-hard), y las sales anulan las tablas precalculadas. La firma de código demuestra el editor y la integridad. El cifrado homomórfico permite hacer cálculos sobre el texto cifrado, y ML-KEM es el estándar post-cuántico del NIST para el establecimiento de claves. Los hashes rápidos sin sal y Base64 no protegen los secretos." },

  { id: "cert-inspect-fill", d: 3, type: "fill", title: "Lee un certificado y diagnostica un error de TLS",
    prompt: "Los usuarios que navegan por HTTPS al sitio portal.example.com reciben una advertencia de nombre que no coincide. Usa la salida del certificado para completar los campos.",
    context: "$ openssl x509 -in portal.pem -noout -subject -issuer -dates -ext subjectAltName,extendedKeyUsage\nsubject=CN = www.example.com\nissuer=C = US, O = Example Corp, CN = Example Issuing CA 2\nnotBefore=Mar  1 00:00:00 2026 GMT\nnotAfter=Mar  1 23:59:59 2027 GMT\nX509v3 Subject Alternative Name:\n    DNS:www.example.com, DNS:shop.example.com\nX509v3 Extended Key Usage:\n    TLS Web Server Authentication",
    fields: [
      { label: "Nombre de la CA que emitió este certificado (su CN)", answers: ["Example Issuing CA 2"] },
      { label: "Año en que vence el certificado", answers: ["2027"] },
      { label: "¿Cuántos nombres DNS cubre el certificado?", answers: ["2", "dos"] },
      { label: "Nombre de host que debe agregarse a la lista SAN para corregir la advertencia", answers: ["portal.example.com"] }
    ],
    explain: "El campo issuer muestra Example Issuing CA 2, una CA emisora intermedia. notAfter muestra que vence en marzo de 2027, así que el certificado está vigente. Los clientes comparan el nombre de host contra la lista de Subject Alternative Name, que solo contiene www.example.com y shop.example.com, así que hay que agregar portal.example.com y volver a emitir el certificado. El extended key usage es correcto para un servidor web, así que el problema es únicamente el nombre faltante." },

  { id: "router-hardening-select", d: 3, type: "select", title: "Detecta configuración insegura en un dispositivo de red",
    prompt: "Revisa este extracto de configuración de un router y selecciona todas las líneas que deben cambiarse para cumplir un estándar de hardening que exige administración cifrada, AAA centralizado y monitoreo seguro.",
    context: "1  hostname edge-rtr-01\n2  aaa new-model\n3  aaa authentication login default group tacacs+ local\n4  ip ssh version 2\n5  line vty 0 4\n6   transport input telnet ssh\n7  snmp-server community public RO\n8  ip http server\n9  logging host 192.0.2.50\n10 ntp server 192.0.2.10",
    options: ["Línea 3", "Línea 4", "Línea 6", "Línea 7", "Línea 8", "Línea 9", "Línea 10"],
    answers: [2, 3, 4],
    explain: "La línea 6 todavía permite Telnet, que envía las credenciales en texto claro; debería permitir solo SSH. La línea 7 usa SNMPv2c con la community string predeterminada public; reemplázala con usuarios de SNMPv3 en el nivel authPriv. La línea 8 habilita el servidor de administración HTTP sin cifrar; deshabilítalo o usa solo HTTPS. La línea 3 (TACACS+ con respaldo local), SSH versión 2, el registro centralizado y NTP son buenas prácticas." },

  { id: "password-spray-select", d: 4, type: "select", title: "Identifica password spraying en los logs de autenticación",
    prompt: "Selecciona todas las líneas del log que forman parte de un patrón de password spraying, en el que un solo origen prueba una contraseña común contra muchas cuentas.",
    context: "1  09:14:02 auth fail user=alice src=203.0.113.7 reason=bad_password\n2  09:14:05 auth fail user=bob src=203.0.113.7 reason=bad_password\n3  09:14:06 auth ok   user=dana src=10.20.1.44 mfa=push_approved\n4  09:14:09 auth fail user=carol src=203.0.113.7 reason=bad_password\n5  09:14:30 auth fail user=erin src=10.20.1.51 reason=bad_password\n6  09:14:31 auth ok   user=erin src=10.20.1.51 mfa=totp\n7  09:14:33 auth fail user=frank src=203.0.113.7 reason=bad_password\n8  09:15:40 auth ok   user=svc-backup src=10.20.5.9 method=kerberos",
    options: ["Línea 1", "Línea 2", "Línea 3", "Línea 4", "Línea 5", "Línea 6", "Línea 7", "Línea 8"],
    answers: [0, 1, 3, 6],
    explain: "Las líneas 1, 2, 4 y 7 muestran un solo origen externo (203.0.113.7) fallando contra cuatro cuentas distintas en cuestión de segundos, que es la firma del password spraying: muchos usuarios, pocos intentos por cada uno. La línea 5 seguida de la línea 6 es un solo usuario que se equivoca al teclear y luego entra con MFA desde una dirección interna, lo cual es normal. Las líneas 3 y 8 son inicios de sesión exitosos comunes. Una buena detección cuenta los nombres de usuario distintos que fallan por origen en una ventana corta, en lugar de las fallas por cuenta." },

  { id: "ransomware-ir-order", d: 4, type: "order", title: "Ordena la respuesta a un ransomware",
    prompt: "El EDR acaba de alertar sobre un ransomware que está cifrando un servidor de archivos. Pon las acciones de respuesta en el orden correcto.",
    steps: [
      "Confirmar la alerta, delimitar los hosts y cuentas afectados y abrir el registro del incidente",
      "Aislar los hosts afectados con el EDR y deshabilitar las cuentas comprometidas",
      "Capturar imágenes de memoria y de disco de los sistemas clave y registrar los hashes en la cadena de custodia",
      "Eliminar los mecanismos de persistencia y parchear la vulnerabilidad usada para el acceso inicial",
      "Restaurar los datos desde respaldos inmutables verificados y monitorear de cerca para detectar una reinfección",
      "Hacer una revisión de lecciones aprendidas y actualizar los playbooks y las detecciones"
    ],
    explain: "La detección y el análisis van primero, para que el equipo sepa qué está afectado. La contención (aislar y deshabilitar cuentas) detiene la propagación. La evidencia se preserva antes de que la erradicación modifique los sistemas. La erradicación elimina el punto de apoyo del atacante y cierra el punto de entrada, y luego la recuperación restaura desde respaldos en buen estado conocido con un monitoreo reforzado. Las lecciones aprendidas cierran el incidente. Restaurar antes de contener y erradicar implica riesgo de reinfección inmediata." },

  { id: "vuln-fix-match", d: 4, type: "match", title: "Relaciona hallazgos de vulnerabilidades con correcciones de causa raíz",
    prompt: "Una revisión de código produjo estos hallazgos. Relaciona cada uno con la corrección que ataca su causa raíz.",
    pairs: [
      ["Consulta de inicio de sesión construida concatenando el nombre de usuario en el SQL", "Usar consultas parametrizadas"],
      ["El servicio reconstruye objetos Java recibidos de los clientes", "Aceptar solo formatos de datos con validación de esquema"],
      ["Se verifica el saldo y luego se descuenta en una llamada separada", "Envolver la verificación y la actualización en una sola transacción atómica"],
      ["Un parser en C copia paquetes a un búfer fijo sin verificar la longitud", "Reescribirlo en un lenguaje con seguridad de memoria y aplicarle fuzzing"],
      ["Los comentarios de los usuarios se muestran en las páginas sin codificar", "Aplicar codificación de salida según el contexto"]
    ],
    extra: ["Ocultar los mensajes de error detallados", "Mover el servicio a otro puerto"],
    explain: "La inyección SQL se corrige manteniendo separados el código y los datos con consultas parametrizadas. La deserialización insegura se evita aceptando solo formatos de datos simples con validación, o listas de tipos permitidos estrictas. La falla de verificar y luego descontar es una condición de carrera (TOCTOU), que se corrige con una transacción atómica o un bloqueo. Los desbordamientos de búfer se eliminan con lenguajes con seguridad de memoria, usando fuzzing para encontrar los errores restantes. El XSS almacenado se previene con codificación de salida según el contexto. Ocultar errores o cambiar de puerto no elimina ninguna de estas causas raíz." }
]);
