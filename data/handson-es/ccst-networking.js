/* Spanish text for the Cisco CCST Networking hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/ccst-networking.js. */
CertHub.addHandsonEs("ccst-networking", {
  "ccst-hostname": {
    title: "Recorre los modos de IOS y configura un hostname",
    prompt: "Acabas de conectarte por consola a un switch nuevo que todavía muestra el nombre predeterminado.\n\nEntra al modo EXEC privilegiado, luego al modo de configuración global, cambia el nombre del dispositivo a `AccessSW` y regresa al EXEC privilegiado. Este es el camino básico desde el que empieza todo cambio en IOS.",
    hint: "Escribe enable para llegar al prompt #, luego configure terminal para llegar a (config)#. Usa end (o Ctrl-Z) para volver directamente al EXEC privilegiado.",
    explain: "IOS tiene tres modos principales: EXEC de usuario (>), EXEC privilegiado (#), al que llegas con enable, y configuración global ((config)#), al que llegas con configure terminal. Los comandos de configuración solo funcionan en un modo de configuración, mientras que show y copy se ejecutan desde el EXEC privilegiado. Saber en qué modo estás, algo que te muestra el prompt, es una habilidad central de CCST Networking.",
    labels: ["El hostname es AccessSW", "Terminas en el modo EXEC privilegiado"]
  },
  "ccst-mgmt-ip": {
    title: "Configura una IP de administración y un default gateway",
    prompt: "Este switch debe ser accesible desde la mesa de ayuda, que está en otra subred.\n\nAsigna `10.1.1.10 255.255.255.0` a la interfaz VLAN 1, habilita la interfaz y configura un default gateway de `10.1.1.1` para que pueda responder a dispositivos fuera de su propia subred.",
    hint: "La dirección va en interface vlan 1 (recuerda el no shutdown). El gateway se configura con el comando global ip default-gateway.",
    explain: "Un switch reenvía tramas en Capa 2, pero aun así necesita una dirección IP para la administración remota, que se coloca en una interfaz virtual de switch (SVI) como la VLAN 1. Sin un default gateway solo puede responder a hosts de su propia subred, y por eso falla la administración remota desde otra red. Esto corresponde al objetivo de default gateway del CCST.",
    labels: ["La VLAN 1 tiene la dirección 10.1.1.10", "La interfaz VLAN 1 está habilitada", "El default gateway es 10.1.1.1"]
  },
  "ccst-vlan-access": {
    title: "Crea una VLAN y asigna un puerto de acceso",
    prompt: "Los dispositivos del personal deben estar en su propia VLAN, separada de la predeterminada.\n\nCrea la VLAN 20 con el nombre `STAFF` y luego convierte GigabitEthernet0/1 en un puerto de acceso estático en la VLAN 20 para la PC conectada. Verifica con `show vlan brief`.",
    hint: "Crea la VLAN con vlan 20 y ponle nombre; luego, en la interfaz, usa switchport mode access y switchport access vlan 20.",
    explain: "Una VLAN divide un switch físico en varios dominios de broadcast, así que los dispositivos de la VLAN 20 no pueden llegar directamente a los de otra VLAN sin un router. Un puerto de acceso pertenece a una sola VLAN y conecta un dispositivo final, mientras que un trunk transporta muchas VLAN entre switches. Distinguir los puertos de acceso de los puertos trunk es un objetivo de infraestructura del CCST.",
    labels: ["La VLAN 20 se llama STAFF", "GigabitEthernet0/1 es un puerto de acceso", "GigabitEthernet0/1 está en la VLAN 20"]
  },
  "ccst-trunk": {
    title: "Configura un enlace trunk entre switches",
    prompt: "GigabitEthernet0/24 se conecta a un segundo switch y debe transportar tanto la VLAN 10 como la VLAN 20.\n\nConvierte GigabitEthernet0/24 en un trunk y limita su lista de VLAN permitidas solo a 10 y 20. Confirma con `show interfaces trunk`.",
    hint: "Define el rol con switchport mode trunk y luego limita el tráfico con switchport trunk allowed vlan 10,20.",
    explain: "Un enlace trunk transporta tráfico de varias VLAN a la vez etiquetando cada trama con 802.1Q, y así es como las VLAN se extienden a más de un switch. Un puerto de acceso, en cambio, sirve a una sola VLAN y a un solo dispositivo final. Restringir la lista de VLAN permitidas evita tráfico innecesario en el uplink y es una buena práctica que el CCST espera que reconozcas.",
    labels: ["GigabitEthernet0/24 es un trunk", "Solo se permiten las VLAN 10 y 20"]
  },
  "ccst-secure-access": {
    title: "Protege el acceso al dispositivo con contraseñas",
    prompt: "Este switch no tiene ninguna contraseña, así que cualquiera en la consola puede hacer cambios.\n\nConfigura `enable secret Str0ngSecret!` para proteger el modo privilegiado y luego, en la línea de consola (`line con 0`), establece la contraseña `consolepw` y exige el inicio de sesión. Esto es endurecimiento básico del dispositivo.",
    hint: "enable secret es un comando global. En line con 0 agrega password consolepw y después login para que la contraseña realmente se exija.",
    explain: "Cambiar las credenciales predeterminadas o vacías es uno de los primeros pasos de endurecimiento. enable secret guarda un hash robusto para proteger el modo privilegiado, mientras que una contraseña de consola con el comando login obliga a cualquiera en la consola a autenticarse. Sin login, la contraseña configurada en la línea nunca se solicita, un error sutil que el dominio de seguridad del CCST espera que evites.",
    labels: ["Un enable secret protege el modo privilegiado", "La línea de consola está configurada", "La contraseña de consola está establecida"]
  },
  "ccst-describe-save": {
    title: "Etiqueta un puerto y guarda la configuración",
    prompt: "La buena documentación empieza en el propio dispositivo.\n\nAgrega la descripción `Uplink to Core` a GigabitEthernet0/24 para que el siguiente técnico sepa a qué se conecta, y luego guarda la running configuration en la startup para que la etiqueta sobreviva a un reinicio.",
    hint: "Usa el comando description dentro de la interfaz. Guarda desde el EXEC privilegiado con copy running-config startup-config.",
    explain: "Las descripciones de interfaz son documentación dentro del dispositivo que aparece en show running-config y show interfaces, y agilizan la resolución de problemas. La running configuration vive en la RAM y se pierde al reiniciar, así que copy running-config startup-config la escribe en la NVRAM para hacerla permanente. Ambos hábitos forman parte de los objetivos de diagnóstico y documentación del CCST.",
    labels: ["GigabitEthernet0/24 está descrita como un uplink", "La configuración está guardada en la startup"]
  }
});
