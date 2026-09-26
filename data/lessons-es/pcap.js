CertHub.addLessons("pcap", [
 {
  t: "Import variants: import, import as, from … import, from … import *, and what each puts in the namespace",
  tt: "Variantes de import: import, import as, from … import, from … import * y qué agrega cada una al namespace",
  body: [
   "Un módulo es simplemente un archivo de código Python, e importarlo te permite reutilizar lo que define. Al examen PCAP le importa menos que sepas importar y más qué nombres exactamente quedan disponibles después. Cada módulo y script tiene su propio namespace (espacio de nombres): una tabla que asocia nombres con objetos. Cada forma de import agrega entradas distintas al namespace que importa, y muchas preguntas del examen en realidad preguntan si un nombre concreto existe en un momento concreto.",
   "La forma simple `import math` agrega exactamente un nombre, `math`, que se refiere al objeto módulo. Todo lo que hay dentro debe calificarse: `math.pi`, `math.sqrt(2)`. Escribir `sqrt(2)` solo lanza NameError porque `sqrt` nunca se colocó en tu namespace. La forma con alias `import math as m` agrega solo `m`; el nombre `math` no está definido, así que `math.pi` falla mientras que `m.pi` funciona. Los alias son prácticos para nombres de módulo largos y son comunes con módulos como `import numpy as np` en el ecosistema más amplio.",
   "La forma `from math import sqrt, pi` funciona al revés. Agrega `sqrt` y `pi` directamente, así que llamas `sqrt(2)` sin prefijo, pero el nombre `math` no está definido. También puedes poner alias a nombres individuales: `from math import sqrt as root`. Como los nombres caen directamente en tu namespace, pueden chocar con los tuyos: si más adelante escribes `pi = 3`, reemplazaste el valor importado, y si defines tu propia `sqrt` y luego importas una, gana el import porque ocurrió después. La última asignación (binding) siempre gana.",
   "La forma con asterisco `from math import *` copia todos los nombres públicos del módulo a tu namespace. Si el módulo define una lista llamada `__all__`, solo se importan los nombres de esa lista; si no, se importa todo nombre que no empiece con guion bajo. Los star imports se desaconsejan en código real porque ocultan de dónde vino un nombre y pueden sobrescribir tus propios nombres sin avisar, pero el examen espera que conozcas las reglas del guion bajo y de `__all__`.",
   "```python\nimport math as m\nprint(m.floor(2.7))      # 2\n# print(math.pi)         # NameError: math no está definido\n\nfrom math import pi\nprint(pi)                # 3.141592653589793\npi = 3\nprint(pi)                # 3 - tu asignación lo reemplazó\n```",
   "Dos datos más completan el tema. El código de un módulo se ejecuta solo en su primer import dentro de un proceso; los imports posteriores reutilizan el objeto módulo ya cargado, guardado en `sys.modules`. Y toda forma de import ejecuta el archivo completo del módulo la primera vez, incluso `from mod import one_name`, porque Python tiene que ejecutar el archivo para crear el nombre."
  ],
  terms: [
   ["Namespace (espacio de nombres)", "Una asociación de nombres con objetos; cada módulo, llamada a función y clase tiene el suyo."],
   ["Alias", "Un nombre alternativo dado con as, por ejemplo import math as m, que enlaza solo m."],
   ["__all__", "Una lista de cadenas en un módulo que indica qué debe importar from module import *."],
   ["Qualified name (nombre calificado)", "Un nombre escrito con el prefijo de su módulo, como math.sqrt."]
  ],
  example: "Un script de datos empieza con from statistics import mean y más adelante define su propia función llamada mean para manejar valores faltantes. Como el def viene después del import, todas las llamadas posteriores usan la versión local, y el import original queda ocultado (shadowed) sin ninguna advertencia.",
  tip: "Pregúntate qué nombres agrega cada línea. import m as x define solo x, nunca m; from m import f define solo f, nunca m. Muchas opciones de respuesta que parecen correctas fallan con NameError justamente por esto.",
  check: [
   ["Después de import random as r, ¿funciona print(random.random())?", "No. Solo está definido el alias r, así que random lanza NameError; debes escribir r.random()."],
   ["¿Qué nombres omite from mod import * cuando mod no tiene __all__?", "Los nombres que empiezan con guion bajo, como _helper; todos los demás nombres de nivel superior se importan."],
   ["Si un módulo se importa dos veces en el mismo programa, ¿cuántas veces se ejecuta su código de nivel superior?", "Una vez. El segundo import encuentra el módulo ya en sys.modules y lo reutiliza."]
  ]
 },
 {
  t: "Qualifying names in nested modules and packages (package.subpackage.module.name)",
  tt: "Calificar nombres en módulos y paquetes anidados (package.subpackage.module.name)",
  body: [
   "Cuando un proyecto crece más allá de unos pocos archivos, los módulos se agrupan en paquetes (packages), que son directorios de módulos, y los paquetes pueden contener subpaquetes. Para llegar a un objeto en lo profundo de ese árbol usas una ruta con puntos que refleja la estructura de directorios. Para un archivo `extra/good/best/sigma.py` que define una función `funS()`, el nombre totalmente calificado es `extra.good.best.sigma.funS`. Cada punto baja un nivel: paquete, subpaquete, sub-subpaquete, módulo y, por último, el objeto dentro del módulo.",
   "Cuánto de esa ruta debes escribir depende de cómo importaste. Con `import extra.good.best.sigma`, Python enlaza solo el nombre de nivel superior `extra` en tu namespace, y siempre debes escribir la ruta completa: `extra.good.best.sigma.funS()`. Esto sorprende a muchos, pero es coherente: la sentencia import garantiza que cada paquete a lo largo de la ruta se carga y se adjunta como atributo de su padre, así que la cadena de búsquedas de atributos funciona a partir de `extra`.",
   "Un alias lo acorta: `import extra.good.best.sigma as sig` enlaza `sig` directamente al módulo, así que llamas `sig.funS()`. La forma `from` te permite detenerte en cualquier nivel. `from extra.good.best import sigma` enlaza `sigma`, así que escribes `sigma.funS()`; `from extra.good.best.sigma import funS` enlaza la función misma, así que escribes `funS()`. Ten en cuenta que en la forma simple `import a.b.c` el último elemento debe ser un módulo o paquete, no una función; `import extra.good.best.sigma.funS` falla con ModuleNotFoundError porque `funS` no es un módulo.",
   "```python\n# Árbol de directorios (cada directorio de paquete tiene __init__.py):\n# extra/\n#     good/\n#         best/\n#             sigma.py   -> def funS(): return 'sigma'\n\nimport extra.good.best.sigma\nprint(extra.good.best.sigma.funS())\n\nfrom extra.good.best.sigma import funS\nprint(funS())\n\nimport extra.good.best.sigma as sig\nprint(sig.funS())\n```",
   "Para que esto funcione, el directorio de nivel superior, aquí `extra`, debe poder encontrarse: tiene que estar dentro de alguna de las carpetas listadas en `sys.path`, como la carpeta que contiene tu script principal. No agregas las carpetas internas a `sys.path`; Python recorre el árbol hacia abajo usando el nombre con puntos. Tradicionalmente cada directorio contiene un archivo `__init__.py` que lo marca como paquete regular, y ese archivo se ejecuta cuando el paquete se importa por primera vez.",
   "Un hábito útil al leer código del examen es anotar primero el árbol de directorios y luego comprobar que cada nombre con puntos coincida exactamente con él, incluida la ortografía y el nivel que contiene la función. Muchas respuestas incorrectas usan una ruta que se salta un nivel o ponen el nombre de la función donde debería ir un módulo."
  ],
  terms: [
   ["Package (paquete)", "Un directorio de módulos (y posiblemente subpaquetes) que Python puede importar por nombre."],
   ["Subpackage (subpaquete)", "Un paquete anidado dentro de otro, al que se llega con un punto, como extra.good."],
   ["Fully qualified name (nombre totalmente calificado)", "La ruta completa con puntos desde el paquete superior hasta un objeto, como extra.good.best.sigma.funS."]
  ],
  example: "El código de un equipo vive en company/reports/pdf/render.py. Un script nuevo que escribe import company.reports.pdf.render debe llamar company.reports.pdf.render.build(); si cambia a from company.reports.pdf import render, puede llamar render.build() en su lugar.",
  tip: "Con import a.b.c simple debes usar el prefijo completo a.b.c, y el último componente debe ser un módulo, no una función ni una clase. Las preguntas suelen ofrecer import a.b.func como respuesta incorrecta tentadora.",
  check: [
   ["Después de import extra.good.best.sigma, ¿qué nombre se agrega a tu namespace?", "Solo extra; llegas a la función mediante la ruta completa extra.good.best.sigma.funS()."],
   ["¿Qué debe cumplirse en sys.path para que import extra.good.best.sigma funcione?", "El directorio que contiene la carpeta de nivel superior extra debe estar en sys.path; las carpetas internas no necesitan estar listadas."]
  ]
 },
 {
  t: "Dir() to list the names a module defines",
  tt: "dir() para listar los nombres que define un módulo",
  body: [
   "La función integrada `dir()` te permite mirar dentro de un módulo, objeto o clase y ver qué nombres contiene. Devuelve una lista ordenada de cadenas. Es una herramienta de descubrimiento: cuando importas un módulo que nunca has usado, `dir()` te muestra lo que ofrece sin abrir la documentación, y en el examen es la forma en que las preguntas comprueban si entiendes qué nombres creó un import.",
   "Llamada con un objeto módulo, `dir(math)` devuelve todos los nombres de atributo definidos en ese módulo, incluidos los nombres dunder (doble guion bajo) como `__name__`, `__doc__` y `__file__` junto a funciones como `ceil` y `sqrt`. El módulo debe estar importado con un nombre que puedas pasarle: después de `import math` llamas `dir(math)`; después de `import math as m` llamas `dir(m)`. Después de `from math import sqrt`, no puedes llamar `dir(math)` porque el nombre `math` no existe en tu namespace.",
   "```python\nimport math\nfor name in dir(math):\n    if not name.startswith('_'):\n        print(name, end=' ')\n# acos acosh asin ... ceil ... sqrt tan tanh tau trunc ulp\n```",
   "Llamada sin argumentos, `dir()` lista los nombres del ámbito local actual. En el nivel superior de un script eso significa los nombres globales de tu módulo, así que es una forma fácil de confirmar qué agregó un import. Ejecuta `dir()`, luego `import math as m`, luego `dir()` otra vez, y verás aparecer `m` pero no `math`. Después de `from math import *`, la lista crece en docenas de nombres de golpe, lo que vuelve concreto el argumento de la contaminación del namespace contra los star imports.",
   "La lista está ordenada alfabéticamente, y como las mayúsculas van antes que las minúsculas en el orden de caracteres, los nombres que empiezan con mayúscula aparecen antes que los de minúscula, y los nombres dunder que empiezan con guion bajo aparecen después de los de mayúscula pero antes de los de minúscula. No necesitas memorizarlo, pero explica por qué la salida se ve como se ve.",
   "`dir()` funciona con cualquier objeto, no solo con módulos. `dir('abc')` lista los métodos de cadena, `dir([])` lista los métodos de lista y `dir(SomeClass)` lista los atributos de la clase, incluidos los heredados. Esto la convierte en compañera de `help()`, que imprime documentación, y de `hasattr()`, que comprueba un solo nombre. Recuerda que `dir()` devuelve los nombres como cadenas; para obtener el objeto real detrás de un nombre usarías `getattr(module, name)`."
  ],
  terms: [
   ["dir()", "Función integrada que devuelve una lista ordenada de nombres de atributos de un objeto, o del ámbito actual cuando se llama sin argumentos."],
   ["Dunder name (nombre dunder)", "Un nombre con doble guion bajo a ambos lados, como __name__, usado para atributos especiales."],
   ["Local scope (ámbito local)", "El conjunto de nombres definidos en el bloque que se ejecuta actualmente; dir() sin argumentos lo lista."]
  ],
  example: "Mientras exploras el módulo platform en IDLE, ejecutas import platform y luego print(dir(platform)). Al revisar la lista, ves python_implementation y system, y pruebas cada una para ver qué devuelve en tu máquina.",
  tip: "dir(x) necesita un nombre que realmente exista. Después de from math import sqrt, dir(math) lanza NameError; después de import math as m, debes llamar dir(m).",
  check: [
   ["¿Qué tipo devuelve dir(math)?", "Una lista de cadenas, ordenada alfabéticamente, con los nombres de los atributos del módulo."],
   ["¿Cómo puedes usar dir() para ver el efecto de import os as o?", "Llama dir() sin argumentos antes y después; aparece el nombre o y no os."]
  ]
 },
 {
  t: "Sys.path: where Python searches for modules and how to extend it at runtime",
  tt: "sys.path: dónde busca Python los módulos y cómo ampliarlo en tiempo de ejecución",
  body: [
   "Cuando escribes `import something`, Python tiene que encontrar un archivo o directorio llamado `something`. Después de revisar los módulos que ya cargó (guardados en `sys.modules`) y sus módulos integrados, busca en una lista de directorios almacenada en `sys.path`. Entender esa lista explica la mayoría de los mensajes ModuleNotFoundError y es un objetivo explícito del PCAP.",
   "`sys.path` es una lista común de Python con cadenas. Su primera entrada normalmente es el directorio que contiene el script que ejecutaste (o una cadena vacía, que significa el directorio actual, cuando trabajas de forma interactiva). Después vienen los directorios indicados en la variable de entorno `PYTHONPATH`, luego las ubicaciones de la biblioteca estándar y luego el directorio `site-packages`, donde viven los paquetes de terceros instalados. Python revisa las entradas en orden y usa la primera coincidencia que encuentra, así que las entradas anteriores ganan.",
   "```python\nimport sys\nfor entry in sys.path:\n    print(entry)\n\nsys.path.append('/home/me/mylibs')   # buscar en esta carpeta al final\nimport helpers                         # ahora se encuentra si helpers.py está ahí\n```",
   "Como es una lista, puedes cambiarla mientras el programa se ejecuta. `sys.path.append(folder)` agrega un directorio al final, así que se busca al último; `sys.path.insert(0, folder)` lo pone primero, así que sus módulos tienen prioridad sobre todo lo demás. El cambio debe ocurrir antes de la sentencia `import` que lo necesita, y dura solo durante el proceso actual: no se guarda en ningún lado, y la siguiente ejecución empieza otra vez con la lista predeterminada. En rutas de Windows, recuerda que las barras invertidas en literales de cadena inician secuencias de escape, así que escribe `'C:\\\\Users\\\\me\\\\libs'` o usa barras normales, que Python también acepta en Windows.",
   "La regla de la primera coincidencia tiene un efecto secundario práctico llamado shadowing (ocultamiento). Si guardas tu propio script como `random.py` en la carpeta de tu proyecto, entonces `import random` en otra parte de esa carpeta puede cargar tu archivo en lugar del módulo de la biblioteca estándar, porque el directorio del script se busca antes que la biblioteca estándar. El síntoma es un AttributeError como `module 'random' has no attribute 'choice'`. La solución es renombrar tu archivo (y borrar cualquier copia vieja en `__pycache__`).",
   "Python también puede importar desde archivos ZIP colocados en `sys.path`, que es como algunas herramientas empaquetan código; el examen menciona a veces que una entrada de archivo ZIP es una ubicación de búsqueda válida. Los módulos que ya están en `sys.modules` nunca se vuelven a buscar, así que cambiar `sys.path` después de cargar un módulo no lo recarga."
  ],
  terms: [
   ["sys.path", "Una lista de cadenas de directorios en la que Python busca, en orden, al importar un módulo."],
   ["PYTHONPATH", "Una variable de entorno cuyos directorios se agregan a sys.path al iniciar."],
   ["Shadowing (ocultamiento)", "Cuando un módulo que está antes en la ruta de búsqueda oculta a otro con el mismo nombre que está después."],
   ["site-packages", "El directorio donde normalmente viven los paquetes de terceros instalados con pip."]
  ],
  example: "Un estudiante guarda módulos auxiliares compartidos en una carpeta fuera de todos sus proyectos. En lugar de copiarlos, cada script empieza con import sys y sys.path.append a esa carpeta, seguido de import helpers, y los imports funcionan solo porque el append va primero.",
  tip: "append() busca en la nueva carpeta al último, insert(0, ...) busca en ella primero, y ninguno de los dos cambios sobrevive más allá de la ejecución actual. La modificación debe ir antes del import que depende de ella.",
  check: [
   ["¿Cuál suele ser la primera entrada de sys.path cuando ejecutas un script?", "El directorio que contiene ese script, así que los módulos que están junto a él se encuentran antes que la biblioteca estándar."],
   ["¿Por qué import random podría no encontrar random.choice en tu proyecto?", "Un archivo llamado random.py en la carpeta de tu proyecto oculta el módulo de la biblioteca estándar porque su carpeta se busca primero."]
  ]
 },
 {
  t: "Math module: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
  tt: "Módulo math: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
  body: [
   "El módulo `math` ofrece funciones matemáticas para números reales. El PCAP elige unas cuantas y evalúa los detalles: qué devuelve cada una, de qué tipo, y cómo se comporta con números negativos. Impórtalo con `import math` y llama a las funciones como `math.name()`.",
   "Tres funciones convierten un float en entero, y solo se diferencian en la dirección en que se mueven. `math.floor(x)` devuelve el mayor entero menor o igual que x, así que siempre baja en la recta numérica: `floor(2.7)` es 2 y `floor(-2.7)` es -3. `math.ceil(x)` (techo) devuelve el menor entero mayor o igual que x, siempre subiendo: `ceil(2.1)` es 3 y `ceil(-2.7)` es -2. `math.trunc(x)` simplemente corta la parte fraccionaria, moviéndose hacia cero: `trunc(2.7)` es 2 y `trunc(-2.7)` es -2. En Python 3 las tres devuelven un `int`, no un float. Para números positivos `floor` y `trunc` coinciden; para negativos coinciden `ceil` y `trunc`.",
   "```python\nimport math\nfor x in (2.5, -2.5):\n    print(math.floor(x), math.ceil(x), math.trunc(x), round(x))\n# 2 3 2 2\n# -3 -2 -2 -2\n```",
   "Fíjate en `round()` en ese ejemplo. Es una función integrada, no parte de `math`, y redondea las mitades al entero par más cercano (redondeo bancario), por eso `round(2.5)` es 2. Las opciones del examen a veces mezclan `round` para ver si lo confundes con las funciones de math.",
   "`math.factorial(n)` devuelve n! = 1 × 2 × ... × n como entero, con `factorial(0)` igual a 1. Requiere un entero no negativo; un argumento negativo lanza ValueError. Los factoriales crecen muy rápido, pero los enteros de Python no tienen un límite de tamaño fijo, así que los resultados grandes son exactos.",
   "`math.sqrt(x)` devuelve la raíz cuadrada como float, incluso para cuadrados perfectos: `sqrt(16)` es `4.0`. Un argumento negativo lanza ValueError (math domain error) porque `math` trabaja solo con números reales. `math.hypot(x, y)` devuelve la longitud de la hipotenusa de un triángulo rectángulo con catetos x e y, que es la distancia euclidiana desde el origen hasta el punto (x, y): `hypot(3, 4)` es `5.0`. Equivale a `sqrt(x*x + y*y)`, pero escrita como una sola llamada y calculada con cuidado para evitar desbordamientos. También devuelve un float.",
   "Otros nombres relacionados que verás en las mismas preguntas son las constantes `math.pi` y `math.e` y la función `math.pow(x, y)`, que siempre devuelve un float, a diferencia del operador `**`, que mantiene los enteros como enteros."
  ],
  terms: [
   ["floor()", "Redondea hacia abajo, hacia menos infinito, y devuelve un int."],
   ["ceil()", "Redondea hacia arriba, hacia más infinito, y devuelve un int."],
   ["trunc()", "Descarta la parte fraccionaria, moviéndose hacia cero, y devuelve un int."],
   ["hypot()", "Devuelve la distancia euclidiana sqrt(x*x + y*y) como float."]
  ],
  example: "Un script de envíos necesita cajas completas para 23 artículos a 5 artículos por caja. math.ceil(23 / 5) da 5 cajas, mientras que math.floor daría 4 y dejaría tres artículos sin empacar.",
  tip: "Prueba con negativos: floor(-2.5) es -3, pero trunc(-2.5) y ceil(-2.5) son -2. Recuerda también que sqrt y hypot siempre devuelven floats, así que sqrt(16) imprime 4.0, no 4.",
  check: [
   ["¿A qué se evalúa math.floor(-3.2) + math.ceil(-3.2)?", "-7, porque floor da -4 y ceil da -3."],
   ["¿Qué hace math.sqrt(-4)?", "Lanza ValueError, porque math.sqrt trabaja solo con números reales."],
   ["¿Qué imprime print(math.hypot(6, 8))?", "10.0, un float, porque hypot devuelve la distancia sqrt(36 + 64)."]
  ]
 },
 {
  t: "Random module: random(), seed(), choice(), sample()",
  tt: "Módulo random: random(), seed(), choice(), sample()",
  body: [
   "El módulo `random` genera números pseudoaleatorios. Se llaman pseudoaleatorios porque provienen de un algoritmo determinista: dado el mismo estado inicial, produce la misma secuencia cada vez. Eso es perfecto para juegos, simulaciones y pruebas, pero también significa que `random` nunca debe usarse para contraseñas, tokens ni nada relacionado con seguridad; Python ofrece el módulo `secrets` para ese propósito.",
   "`random.random()` no recibe argumentos y devuelve un float en el rango semiabierto que va desde 0.0 hasta 1.0, sin incluirlo. Muchas otras funciones se basan en ella. Para obtener un entero aleatorio normalmente usarías `random.randint(a, b)`, que incluye ambos extremos, o `random.randrange(start, stop)`, que excluye stop como hace `range()`.",
   "`random.seed(value)` establece el estado inicial del generador. Después de sembrar con el mismo valor, la misma secuencia de llamadas devuelve los mismos resultados, lo que hace reproducible un programa. Si nunca llamas `seed()`, el generador se siembra automáticamente desde una fuente como la hora del sistema o la aleatoriedad del sistema operativo, así que cada ejecución es distinta. Llamar `seed()` sin argumento lo vuelve a sembrar de esa misma forma impredecible. El examen suele mostrar dos bloques que empiezan con `random.seed(0)` y pregunta si imprimen los mismos valores; sí lo hacen.",
   "```python\nimport random\nrandom.seed(42)\na = [random.random() for _ in range(3)]\nrandom.seed(42)\nb = [random.random() for _ in range(3)]\nprint(a == b)                       # True\n\nprint(random.choice(['red', 'green', 'blue']))\nprint(random.sample(range(1, 50), 6))  # seis números distintos\n```",
   "`random.choice(seq)` devuelve un elemento elegido de una secuencia no vacía, como una lista, una tupla o una cadena; `choice('abc')` devuelve un solo carácter. Una secuencia vacía lanza IndexError. `random.sample(population, k)` devuelve una nueva lista de k elementos elegidos sin reemplazo, es decir, ninguna posición se elige dos veces, así que los elementos son únicos si la población no tiene duplicados. La secuencia original no cambia. Si k es mayor que la población, sample lanza ValueError, ya que no puedes sacar más elementos únicos de los que existen.",
   "La diferencia entre llamar varias veces a `choice()` y hacer una sola llamada a `sample()` importa: llamar `choice()` seis veces puede devolver el mismo elemento más de una vez, mientras que `sample(..., 6)` nunca repite una posición. Un sorteo de lotería es un `sample`; lanzar un dado seis veces es `choice` o `randint` repetido. Para mezclar en el lugar también existe `random.shuffle(list)`, que modifica la lista y devuelve None."
  ],
  terms: [
   ["Pseudo-random (pseudoaleatorio)", "Producido por un algoritmo determinista que solo parece aleatorio; la misma semilla da la misma secuencia."],
   ["Seed (semilla)", "El valor inicial del generador; establecerlo hace que los resultados sean reproducibles."],
   ["Sampling without replacement (muestreo sin reemplazo)", "Elegir elementos de modo que ninguna posición se elija dos veces, como hace random.sample()."]
  ],
  example: "Una profesora escribe un generador de cuestionarios que elige 10 preguntas de un banco de 50 con random.sample(bank, 10). Mientras depura, llama random.seed(1) al principio para que cada ejecución produzca el mismo cuestionario y pueda reproducir un error.",
  tip: "random() puede devolver 0.0 pero nunca 1.0, y sample() lanza ValueError si k supera el tamaño de la población. Misma semilla más mismas llamadas es igual a la misma salida.",
  check: [
   ["¿Qué hace random.sample([1, 2, 3], 4)?", "Lanza ValueError porque no puedes elegir 4 elementos únicos de 3."],
   ["¿Por qué no se debe usar random para generar un token de restablecimiento de contraseña?", "Su salida es pseudoaleatoria y predecible a partir de su estado; el módulo secrets está diseñado para aleatoriedad sensible a la seguridad."]
  ]
 },
 {
  t: "Platform module: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
  tt: "Módulo platform: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
  body: [
   "El módulo `platform` permite que un programa averigüe datos de la computadora y del intérprete de Python en el que se ejecuta. Eso es útil para reportes de errores, para elegir rutas de archivo o comandos que cambian entre sistemas operativos y para comprobar que el intérprete sea lo bastante nuevo. Cada función listada en el objetivo devuelve una cadena, excepto `python_version_tuple()`, que devuelve una tupla de cadenas. Los valores exactos dependen por completo de la máquina, así que las preguntas del examen piden qué tipo de información da cada función más que una salida concreta.",
   "`platform.platform()` devuelve una sola cadena legible que describe la plataforma subyacente, combinando el nombre del sistema operativo, la versión y otros detalles, por ejemplo algo como `Linux-6.5.0-x86_64-with-glibc2.35` o `Windows-10-10.0.19045-SP0`. Acepta argumentos opcionales como `aliased` y `terse`; `terse=True` pide una cadena más corta.",
   "`platform.machine()` devuelve el tipo de máquina o hardware, como `x86_64`, `AMD64` o `arm64`. `platform.processor()` devuelve el nombre real del procesador si puede encontrarse; en algunos sistemas devuelve una cadena vacía porque la información no está disponible. `platform.system()` devuelve el nombre del sistema operativo, como `Linux`, `Windows` o `Darwin` (macOS). `platform.version()` devuelve la cadena de versión del sistema operativo, que a menudo es una descripción larga de la compilación, no la versión de Python. Este último punto es una trampa clásica.",
   "```python\nimport platform\nprint(platform.system())                 # p. ej. Linux\nprint(platform.machine())                # p. ej. x86_64\nprint(platform.python_implementation())  # p. ej. CPython\nmajor, minor, patch = platform.python_version_tuple()\nprint(major, minor)                      # p. ej. 3 12 (cadenas)\n```",
   "Dos funciones describen al propio Python. `platform.python_implementation()` nombra la implementación del intérprete: `CPython` para el estándar de python.org, u otras como `PyPy`, `Jython` o `IronPython`. `platform.python_version_tuple()` devuelve una tupla de tres cadenas, mayor, menor y nivel de parche, por ejemplo `('3', '12', '1')`. Como las partes son cadenas, compararlas como números requiere convertirlas antes con `int()`; comparar `'10' > '9'` como cadenas da False, lo que sería un error sutil.",
   "Mantén separados los dos significados de versión. `platform.version()` es la versión del sistema operativo. `platform.python_version()` (una cadena como `'3.12.1'`) y `platform.python_version_tuple()` describen Python. Si una pregunta pide cómo saber qué versión del intérprete se está ejecutando, la respuesta es la tupla o `python_version()`, no `version()`."
  ],
  terms: [
   ["system()", "Devuelve el nombre del sistema operativo, como Linux, Windows o Darwin."],
   ["machine()", "Devuelve el nombre de la arquitectura de hardware, como x86_64 o arm64."],
   ["python_implementation()", "Devuelve el nombre de la implementación del intérprete, por ejemplo CPython o PyPy."],
   ["python_version_tuple()", "Devuelve (major, minor, patch) como una tupla de cadenas."]
  ],
  example: "Un script de soporte imprime platform.platform(), platform.python_implementation() y platform.python_version_tuple() al iniciar, así cada reporte de error que pega un usuario ya indica qué sistema operativo e intérprete estaba usando.",
  tip: "platform.version() es la versión del sistema operativo, no la de Python. python_version_tuple() devuelve cadenas, no enteros, y processor() puede devolver legítimamente una cadena vacía.",
  check: [
   ["¿De qué tipo son los elementos que devuelve platform.python_version_tuple()?", "Cadenas, por ejemplo ('3', '11', '4'); conviértelas con int() antes de compararlas numéricamente."],
   ["¿Qué función te dice si estás ejecutando CPython o PyPy?", "platform.python_implementation()."]
  ]
 },
 {
  t: "__name__ and the if __name__ == \"__main__\" idiom",
  tt: "__name__ y el idioma if __name__ == \"__main__\"",
  body: [
   "Todo módulo tiene una variable integrada llamada `__name__`, una cadena que Python establece antes de ejecutar el código del módulo. Su valor depende de cómo se esté usando el archivo. Cuando importas un módulo, `__name__` es el nombre del módulo, como `'tools'` para `tools.py`, o el nombre con puntos como `'pkg.tools'` dentro de un paquete. Cuando ejecutas un archivo directamente como programa principal, por ejemplo con `python tools.py` o con Run en IDLE, Python establece su `__name__` en la cadena especial `'__main__'`.",
   "Esa diferencia permite que un archivo sepa si se está ejecutando o importando, y es la base de un idioma muy común. El código colocado bajo `if __name__ == '__main__':` se ejecuta solo cuando el archivo es el programa principal y se omite cuando otro módulo lo importa. Lo usas para código de demostración, pruebas rápidas o un punto de entrada de línea de comandos, de modo que el módulo pueda servir a la vez como biblioteca reutilizable y como script ejecutable.",
   "```python\n# tools.py\ndef double(x):\n    return x * 2\n\nprint('tools loaded, __name__ is', __name__)\n\nif __name__ == '__main__':\n    print('self-test:', double(21))\n```",
   "Ejecutar `python tools.py` imprime `tools loaded, __name__ is __main__` seguido de `self-test: 42`. En otro archivo, `import tools` imprime solo `tools loaded, __name__ is tools`: el `print` incondicional se sigue ejecutando, porque importar ejecuta todo el código de nivel superior del módulo, pero el bloque protegido se omite. Este es exactamente el tipo de salida que una pregunta del examen te pide predecir, así que sigue con cuidado qué líneas están dentro del `if` y cuáles no.",
   "Sin la guarda, cualquier código de prueba en el nivel superior se ejecutaría cada vez que alguien importara el módulo, imprimiendo salida o haciendo trabajo que quien importa nunca pidió. Por eso los módulos bien hechos limitan su nivel superior a definiciones (funciones, clases, constantes) y ponen bajo la guarda todo lo que actúa. Ten en cuenta que solo un módulo de un programa en ejecución tiene `__name__` igual a `'__main__'`: aquel con el que se inició Python.",
   "Recuerda los detalles de escritura. Ambos lados usan dos guiones bajos, la comparación usa `==` y el valor es una cadena, así que debe ir entre comillas. El objetivo muestra el idioma con comillas dobles; las comillas simples son exactamente equivalentes en Python. Los módulos también tienen otros atributos dunder como `__file__` (la ruta desde la que se cargaron) y `__doc__` (el docstring), pero `__name__` es del que depende este idioma."
  ],
  terms: [
   ["__name__", "Una variable del módulo que contiene el nombre del módulo, o '__main__' cuando el archivo se ejecuta directamente."],
   ["'__main__'", "El valor de __name__ en el módulo que inició el programa."],
   ["Top-level code (código de nivel superior)", "Sentencias a nivel de módulo, fuera de funciones y clases, que se ejecutan cada vez que se carga el módulo."]
  ],
  example: "Un estudiante escribe grades.py con una función average() y algunas llamadas de ejemplo para comprobarla. Envolver esas llamadas en if __name__ == '__main__': permite que un compañero importe average sin ver la salida de prueba cada vez.",
  tip: "Los imports siguen ejecutando todo el código de nivel superior no protegido. Solo las sentencias dentro del bloque if __name__ == '__main__': se omiten cuando el archivo se importa.",
  check: [
   ["¿Cuál es el valor de __name__ dentro de mod.py cuando otro archivo hace import mod?", "La cadena 'mod'."],
   ["Un módulo imprime 'A' en el nivel superior y 'B' dentro de la guarda main. ¿Qué imprime al importarlo?", "Solo A, porque el bloque protegido se omite al importar."]
  ]
 },
{
  t: "__pycache__ and compiled .pyc files",
  tt: "__pycache__ y los archivos compilados .pyc",
  body: [
   "El código fuente de Python no se ejecuta directamente como texto. El intérprete primero lo compila a bytecode, un conjunto compacto de instrucciones de más bajo nivel para la máquina virtual de Python, y luego ejecuta ese bytecode. Compilar lleva tiempo, así que cuando se importa un módulo, CPython guarda el bytecode en disco para que el siguiente import pueda saltarse ese paso. Esos archivos guardados son archivos `.pyc`, y viven en una carpeta llamada `__pycache__` junto a los archivos fuente.",
   "Los nombres de archivo incluyen el intérprete y la versión, por ejemplo `__pycache__/tools.cpython-312.pyc` para `tools.py` compilado por CPython 3.12. Incluir esta etiqueta significa que distintas versiones de Python pueden mantener sus propias copias compiladas lado a lado sin sobrescribirse, porque no se garantiza que el bytecode sea compatible entre versiones.",
   "Antes de reutilizar un archivo `.pyc`, Python comprueba si sigue siendo válido. Por defecto registra dentro del `.pyc` información sobre el archivo fuente, como su fecha de modificación y su tamaño. Si el fuente cambió desde entonces, Python recompila y reescribe el archivo en caché. Así que nunca necesitas borrar `__pycache__` para que tus cambios surtan efecto en el uso normal; aun así, es seguro borrarlo, ya que Python simplemente lo vuelve a crear.",
   "Algo importante: el script que ejecutas directamente no se guarda en caché. Si ejecutas `python main.py`, Python compila `main.py` en memoria cada vez y no escribe `main.cpython-312.pyc`; solo los módulos que `main.py` importa reciben archivos `.pyc`. Esto explica una pregunta favorita del examen: después de ejecutar un programa por primera vez, aparece una carpeta `__pycache__` con archivos para los módulos importados, pero no para el script principal. Si Python no puede escribir la carpeta, por ejemplo porque el directorio es de solo lectura, el programa igual se ejecuta; simplemente compila cada vez.",
   "```text\nproject/\n    main.py            # se ejecuta directamente: no se guarda en caché\n    tools.py           # importado por main.py\n    __pycache__/\n        tools.cpython-312.pyc\n```",
   "Vale la pena aclarar dos ideas equivocadas. Primero, los archivos `.pyc` no hacen que tu programa se ejecute más rápido una vez que está corriendo; solo hacen que arranque más rápido al saltarse la compilación. Segundo, no son una forma real de ocultar el código fuente, porque el bytecode puede inspeccionarse y descompilarse. El nombre de la carpeta lleva doble guion bajo a ambos lados, como otros nombres especiales de Python, y la mayoría de los proyectos agregan `__pycache__/` a la lista de archivos ignorados del control de versiones, ya que los archivos se regeneran automáticamente."
  ],
  terms: [
   ["Bytecode", "Las instrucciones compiladas, independientes de la plataforma, que ejecuta la máquina virtual de Python."],
   [".pyc file (archivo .pyc)", "Un archivo que contiene el bytecode en caché de un módulo importado."],
   ["__pycache__", "El directorio donde CPython guarda los archivos .pyc, junto a los módulos fuente."]
  ],
  example: "Después de ejecutar app.py, que importa config.py y utils.py, un desarrollador ve que __pycache__ contiene archivos .pyc de config y utils pero nada de app.py, porque solo los módulos importados se guardan en caché.",
  tip: "El script principal se compila pero no se guarda en caché; solo los módulos importados reciben archivos .pyc. La caché acelera la carga, no la ejecución.",
  check: [
   ["¿Por qué el nombre del archivo .pyc incluye algo como cpython-312?", "Registra la implementación y la versión, para que distintos intérpretes puedan mantener cachés separadas y compatibles."],
   ["Si editas tools.py después de que se creó su .pyc, ¿qué pasa en el siguiente import?", "Python detecta que el fuente cambió, lo recompila y actualiza el .pyc en caché."]
  ]
 },
 {
  t: "Package layout: directories, __init__.py, nested packages and private (_name) module variables",
  tt: "Estructura de paquetes: directorios, __init__.py, paquetes anidados y variables privadas (_name) de módulo",
  body: [
   "Un paquete es la forma en que Python agrupa módulos relacionados en una jerarquía de carpetas. El nombre del directorio se convierte en el nombre del paquete, cada archivo `.py` dentro es un módulo y cada subdirectorio puede ser un subpaquete. Tradicionalmente, y en todo lo que enseña el curso de PCAP, cada directorio de paquete contiene un archivo llamado `__init__.py`, que marca el directorio como paquete regular. Python 3 también puede importar directorios sin él (namespace packages), pero para el examen trata `__init__.py` como el marcador de paquete.",
   "`__init__.py` es código Python común. Puede estar vacío, y a menudo lo está. Cuando un paquete se importa por primera vez, su `__init__.py` se ejecuta una vez, así que es el lugar para la configuración a nivel de paquete: definir constantes, importar nombres seleccionados para que los usuarios escriban imports más cortos, o establecer `__all__`. Cuando importas un módulo anidado como `import shop.cart.items`, los archivos `__init__.py` de `shop` y luego de `shop.cart` se ejecutan en orden antes de `items.py`.",
   "```text\nshop/\n    __init__.py\n    prices.py\n    cart/\n        __init__.py\n        items.py\n```",
   "Para que `import shop` funcione, el directorio que contiene `shop` debe estar en `sys.path`. Los paquetes también pueden distribuirse como archivos ZIP, desde los que Python puede importar cuando la ruta del archivo ZIP está en `sys.path`.",
   "Python no tiene variables verdaderamente privadas a nivel de módulo, pero tiene una convención de nombres con efecto real. Un nombre que empieza con un solo guion bajo, como `_counter` o `_helper()`, indica que es interno del módulo. El efecto concreto es que `from module import *` no lo importa, a menos que el módulo lo incluya en `__all__`. El nombre sigue siendo totalmente accesible de forma explícita: `import module` seguido de `module._counter` funciona, y también `from module import _counter`. El guion bajo es una petición, no un candado.",
   "```python\n# counter.py\n_count = 0\ndef bump():\n    global _count\n    _count += 1\n    return _count\n\n# main.py\nfrom counter import *\nprint(bump())        # 1\n# print(_count)      # NameError: * no lo importa\nimport counter\nprint(counter._count)  # 1, el acceso explícito sigue funcionando\n```",
   "Fíjate en que en ese ejemplo `_count` vive en el namespace del módulo `counter`. La función `bump()` lo cambia ahí, por eso `counter._count` muestra el valor actualizado. Ocultar el estado del módulo detrás de un guion bajo y darles a los usuarios funciones para cambiarlo es una forma sencilla de encapsulamiento, y es el primo a nivel de módulo de los atributos privados que verás más adelante en las clases."
  ],
  terms: [
   ["__init__.py", "Un archivo que marca un directorio como paquete regular y se ejecuta cuando el paquete se importa por primera vez."],
   ["Nested package (paquete anidado)", "Un directorio de paquete colocado dentro de otro directorio de paquete."],
   ["_name convention (convención _name)", "Un guion bajo inicial marca un nombre de módulo como interno; from module import * lo omite."]
  ],
  example: "Un proyecto de videojuego tiene un paquete engine con los subpaquetes engine.audio y engine.graphics, cada uno con su propio __init__.py. El módulo graphics guarda un diccionario _cache; los usuarios llaman engine.graphics.load() y nunca tocan la caché directamente.",
  tip: "Un guion bajo inicial solo afecta a from module import *. Los imports explícitos y el acceso calificado como module._name siguen funcionando, así que es una convención y no privacidad real.",
  check: [
   ["¿Cuándo se ejecuta el código del __init__.py de un paquete?", "Una vez, la primera vez que se importa el paquete (o cualquier cosa dentro de él) en un proceso."],
   ["Después de from mod import *, ¿está disponible mod._secret?", "No se importa ningún nombre _secret (y mod en sí no queda enlazado), a menos que _secret esté en __all__; import mod y luego mod._secret sí funcionaría."]
  ]
 },
 {
  t: "Try/except, multiple except branches and the order they are checked",
  tt: "try/except, varias ramas except y el orden en que se revisan",
  body: [
   "Una excepción es la forma en que Python indica que algo salió mal mientras un programa se ejecutaba: dividir entre cero, convertir 'abc' a int, leer una clave inexistente de un diccionario. Si nada maneja la excepción, el programa se detiene e imprime un traceback. La sentencia `try` te permite manejarla, para que el programa pueda recuperarse, mostrar un mensaje amable o intentar otra cosa.",
   "Pones el código riesgoso en un bloque `try` y una o más ramas `except` después. Python ejecuta el bloque `try`. Si no ocurre ninguna excepción, se omiten todas las ramas `except`. Si ocurre una excepción, Python abandona de inmediato el resto del bloque `try` (las líneas restantes nunca se ejecutan) y revisa las ramas `except` de arriba hacia abajo. Se ejecuta la primera rama cuya clase de excepción coincida, ya sea la misma clase o una superclase de la excepción lanzada, y todas las ramas posteriores se ignoran. Para una excepción dada se ejecuta como máximo una rama `except`.",
   "```python\ntry:\n    x = int(input('Number: '))\n    print(10 / x)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nexcept ValueError:\n    print('That was not a number')\nexcept:\n    print('Something else went wrong')\nprint('done')\n```",
   "Ingresar 0 imprime el primer mensaje, ingresar `abc` imprime el segundo, y en ambos casos sigue `done`, porque una excepción manejada permite que la ejecución continúe después de toda la sentencia `try`. El `except:` final sin clase (bare except) atrapa cualquier cosa que no se haya atrapado antes. Python exige que un `except` sin clase sea la última rama; ponerlo antes es un error de sintaxis. Úsalo con moderación, porque también oculta errores que no anticipaste.",
   "El orden importa porque la coincidencia incluye superclases. `ZeroDivisionError` es subclase de `ArithmeticError`, así que si escribes `except ArithmeticError:` antes de `except ZeroDivisionError:`, la rama más general atrapa primero el error de división y la rama específica nunca podrá ejecutarse. Python no te advierte sobre esas ramas inalcanzables. La regla práctica es listar las excepciones de la más específica a la más general.",
   "Si ninguna rama coincide, la excepción no se maneja ahí. Se propaga hacia afuera: a un `try` que la envuelva, o hacia quien llamó a la función, y así sucesivamente. Si llega al nivel superior sin manejarse, el programa termina con un traceback. Esta propagación es útil: una función puede dejar escapar una excepción y dejarle la decisión a quien la llamó, que a menudo sabe mejor cómo responder. Las excepciones lanzadas dentro de una rama `except` no las atrapan las ramas hermanas del mismo `try`; también se propagan hacia afuera."
  ],
  terms: [
   ["Exception (excepción)", "Un objeto que representa un error o un evento inusual que interrumpe el flujo normal."],
   ["except branch (rama except)", "Un manejador que se ejecuta cuando la excepción lanzada coincide con su clase o con una subclase de ella."],
   ["Propagation (propagación)", "Una excepción no manejada que se mueve hacia afuera, hacia sentencias try que la envuelven y funciones que llamaron."],
   ["Bare except (except sin clase)", "Un except sin clase, que atrapa todo; debe ser la última rama."]
  ],
  example: "Un programa de menú envuelve cada comando del usuario en try con except ValueError para números inválidos y except KeyError para opciones de menú desconocidas. Un error de tipeo ya no hace que el programa se caiga; imprime una pista y muestra el menú de nuevo.",
  tip: "Solo se ejecuta la primera rama que coincide, y una superclase listada primero se traga a sus subclases. Cuando dos ramas podrían coincidir, gana la que está más arriba.",
  check: [
   ["Con except ArithmeticError seguido de except ZeroDivisionError, ¿cuál se ejecuta para 1/0?", "La rama ArithmeticError, porque se revisa primero y ZeroDivisionError es su subclase; la segunda rama es inalcanzable."],
   ["¿Qué pasa con las líneas de un bloque try que están después de la que lanza la excepción?", "Se omiten; el control salta directamente a la rama except que coincide."]
  ]
 },
 {
  t: "Catching several exceptions in one branch: except (E1, E2)",
  tt: "Atrapar varias excepciones en una sola rama: except (E1, E2)",
  body: [
   "A veces distintas excepciones merecen la misma respuesta. Una función que procesa la entrada del usuario podría fallar con ValueError (no es un número) o con ZeroDivisionError (un cero donde se necesitaba un divisor), y en ambos casos solo quieres imprimir un error y volver a preguntar. En lugar de escribir dos ramas idénticas, puedes listar varias clases de excepción en un solo `except` usando una tupla.",
   "```python\ndef ratio(a, b):\n    try:\n        return int(a) / int(b)\n    except (ValueError, ZeroDivisionError):\n        print('Bad input, please try again')\n        return None\n\nprint(ratio('6', '3'))    # 2.0\nprint(ratio('6', '0'))    # mensaje, luego None\nprint(ratio('six', '3'))  # mensaje, luego None\n```",
   "La rama coincide si la excepción lanzada es instancia de cualquier clase de la tupla, incluidas las subclases de cualquiera de ellas. Los paréntesis son obligatorios. Escribir `except ValueError, ZeroDivisionError:` es un error de sintaxis en Python 3; era otra característica, ya eliminada, de Python 2 y aparece en preguntas del examen como distractor.",
   "Puedes combinar una rama con tupla con ramas comunes. La regla de arriba hacia abajo sigue aplicando: Python revisa cada rama por turno, y gana la primera rama cuya clase o tupla coincida. Así que una rama específica de una sola clase colocada antes de una rama con tupla manejará su excepción, y la tupla se encargará del resto.",
   "Cuando necesitas saber cuál de las excepciones listadas ocurrió realmente, agrega `as` para enlazar el objeto excepción: `except (ValueError, ZeroDivisionError) as e:`. Dentro de la rama, `type(e).__name__` da el nombre de la clase y `e.args` contiene los argumentos con que se creó. Esto te permite compartir la mayor parte del manejo y aun así registrar detalles precisos.",
   "Agrupar es una decisión de diseño. Agrupa excepciones cuando tu reacción sea realmente la misma. Si en cambio atrapas una superclase amplia, como `except ArithmeticError`, atrapas todas sus subclases a la vez, lo que puede ser más simple pero también atrapa casos que no pretendías. Listar las clases exactas en una tupla indica con precisión lo que esperas y deja que cualquier cosa inesperada se propague, lo que normalmente hace que los errores sean más fáciles de encontrar. Evita agregar `Exception` a la tupla solo por si acaso; eso anula el propósito."
  ],
  terms: [
   ["Exception tuple (tupla de excepciones)", "Una lista de clases entre paréntesis en una cláusula except; la rama coincide con cualquiera de ellas."],
   ["as binding (enlace con as)", "La forma except ... as name que da al manejador acceso al objeto excepción."],
   ["Subclass matching (coincidencia por subclase)", "Una rama except también atrapa instancias de subclases de las clases listadas."]
  ],
  example: "Un cargador de configuración atrapa (KeyError, IndexError) en una sola rama porque un ajuste faltante podría venir de una búsqueda en diccionario o de una lista demasiado corta, y en ambos casos recurre a un valor predeterminado.",
  tip: "La tupla necesita paréntesis: except (A, B): es correcto, except A, B: es un SyntaxError en Python 3.",
  check: [
   ["¿except (LookupError, ValueError) atrapa un KeyError?", "Sí, porque KeyError es subclase de LookupError, que está en la tupla."],
   ["¿Cómo puede una rama que atrapa (TypeError, ValueError) informar cuál ocurrió?", "Usa except (TypeError, ValueError) as e e inspecciona type(e).__name__ o e.args."]
  ]
 },
 {
  t: "Except … as e and the args attribute",
  tt: "except … as e y el atributo args",
  body: [
   "Una excepción no es solo una señal; es un objeto, una instancia de una clase de excepción. Cuando la atrapas, puedes darle un nombre a ese objeto con `as` y luego inspeccionarlo. La sintaxis es `except ValueError as e:`, y dentro de la rama la variable `e` se refiere a la instancia de excepción que se lanzó.",
   "Todo objeto excepción tiene un atributo llamado `args`, una tupla con los argumentos pasados al constructor de la excepción. Cuando el propio Python lanza una excepción, `args` normalmente contiene una sola cadena de mensaje. Cuando la lanzas tú, `args` contiene lo que hayas pasado. `raise ValueError('bad value', 42)` produce una excepción cuyo `args` es `('bad value', 42)`, y `raise ValueError()` produce `args` vacío, `()`.",
   "```python\ntry:\n    int('abc')\nexcept ValueError as e:\n    print(e.args)              # (\"invalid literal for int() with base 10: 'abc'\",)\n    print(e)                   # invalid literal for int() with base 10: 'abc'\n    print(type(e).__name__)    # ValueError\n```",
   "Imprimir el objeto excepción llama a su método `__str__()`, que se basa en `args`. Con un argumento, `str(e)` es ese argumento como texto. Sin argumentos es una cadena vacía. Con varios argumentos, es la forma de cadena de toda la tupla, con paréntesis y todo. A las preguntas del examen les gusta pedir la diferencia entre `print(e)` y `print(e.args)`: el primero muestra el mensaje, el segundo muestra una tupla, que con un elemento incluye una coma final.",
   "```python\ntry:\n    raise Exception('first', 'second')\nexcept Exception as e:\n    print(e)        # ('first', 'second')\n    print(e.args[1])  # second\n```",
   "El nombre enlazado con `as` solo existe mientras se ejecuta la rama `except`. Cuando la rama termina, Python borra la variable para no mantener vivos tracebacks grandes. Así que si escribes `print(e)` después de la sentencia `try`, obtienes un NameError. Si necesitas la excepción más tarde, asígnala a otra variable dentro de la rama, por ejemplo `saved = e`.",
   "Puedes usar `as` con una tupla de clases, `except (KeyError, IndexError) as err:`, y con una sola clase como `except Exception as err:`. Combinado con `type(err).__name__`, es la forma estándar de registrar qué salió mal sin detener el programa."
  ],
  terms: [
   ["Exception instance (instancia de excepción)", "El objeto creado cuando se lanza una excepción; except ... as name lo enlaza."],
   ["args", "Una tupla que contiene los argumentos pasados al constructor de la excepción."],
   ["str(e)", "El mensaje imprimible de una excepción, derivado de args."]
  ],
  example: "Un auxiliar de registro atrapa Exception as err y escribe type(err).__name__ y err.args en un archivo, así cuando falla un trabajo nocturno el operador ve KeyError ('customer_id',) y sabe de inmediato qué campo faltaba.",
  tip: "print(e) muestra el mensaje; print(e.args) muestra una tupla, que con un argumento se ve como ('message',). La variable de as desaparece después del bloque except.",
  check: [
   ["¿Qué se imprime con: try: raise KeyError('x', 1) / except KeyError as e: print(e.args)?", "('x', 1), la tupla de argumentos dados al constructor."],
   ["¿Qué pasa si usas e después de que termina la sentencia try?", "NameError, porque el nombre enlazado con as se borra cuando termina la rama except."]
  ]
 },
 {
  t: "Else and finally branches and when each runs",
  tt: "Las ramas else y finally y cuándo se ejecuta cada una",
  body: [
   "Una sentencia `try` puede tener dos ramas opcionales más además de `except`. Saber exactamente cuándo se ejecuta cada una es una fuente confiable de preguntas de examen, normalmente en forma de código que imprime letras desde distintas ramas y pregunta cuál es la salida.",
   "La rama `else` va después de todas las ramas `except` y se ejecuta solo si el bloque `try` terminó sin lanzar ninguna excepción. Es donde pones el código que debe ocurrir solo en caso de éxito pero que no quieres proteger con los manejadores. Mantener pequeño el bloque `try` y mover el trabajo posterior a `else` significa que un error inesperado en ese código posterior no lo atrapará por accidente un manejador pensado para otra cosa. Un `try` con `else` debe tener al menos una rama `except`.",
   "La rama `finally` va al final y se ejecuta pase lo que pase: después de un `try` exitoso (y su `else`), después de una excepción que se manejó, e incluso cuando una excepción no se manejó y va saliendo de la función. También se ejecuta cuando el bloque `try` o `except` sale mediante `return`, `break` o `continue`. Eso la convierte en el lugar para la limpieza que siempre debe ocurrir, como cerrar un archivo o liberar un lock. Se permite `try` solo con `finally` y sin `except`.",
   "```python\ndef test(x):\n    try:\n        print('A', end=' ')\n        r = 10 / x\n    except ZeroDivisionError:\n        print('B', end=' ')\n    else:\n        print('C', end=' ')\n    finally:\n        print('D')\n\ntest(2)   # A C D\ntest(0)   # A B D\n```",
   "Sigue las dos llamadas. Con 2 no hay error, así que `except` se omite, `else` se ejecuta y luego `finally`: A C D. Con 0 la división lanza una excepción, `except` la maneja, `else` se omite porque ocurrió una excepción y `finally` se ejecuta igual: A B D. Si el error fuera uno que ninguna rama atrapa, por ejemplo `test('two')` lanzando TypeError, la salida sería A y luego D, seguida del traceback, porque `finally` se ejecuta antes de que la excepción siga hacia afuera.",
   "El orden completo es fijo: `try`, luego las ramas `except`, luego `else`, luego `finally`. Escribirlas en otro orden es un error de sintaxis. Un caso sutil más: si un bloque `finally` ejecuta un `return`, ese return reemplaza lo que el bloque `try` estuviera devolviendo e incluso descarta una excepción que se estaba propagando. Es legal pero confuso, así que evita hacer return desde `finally` en código real; solo reconócelo si el examen lo muestra."
  ],
  terms: [
   ["else branch (rama else)", "Se ejecuta solo cuando el bloque try termina sin lanzar una excepción."],
   ["finally branch (rama finally)", "Se ejecuta cada vez que se sale de la sentencia try, ya sea normalmente, por excepción o por return."],
   ["Clean-up code (código de limpieza)", "Sentencias que liberan recursos y que por eso van en finally o en una sentencia with."]
  ],
  example: "Un script abre una conexión a base de datos en try, maneja ConnectionError en except, confirma la transacción en else para que solo se guarde el trabajo exitoso y cierra la conexión en finally para que nunca quede abierta.",
  tip: "else significa que no ocurrió ninguna excepción; finally significa siempre. Si ocurre una excepción, else se omite aunque la excepción se haya manejado.",
  check: [
   ["Se lanza un TypeError no manejado en try. ¿Cuáles de except (para ValueError), else y finally se ejecutan?", "Solo finally; después el TypeError sigue propagándose."],
   ["¿Es válido try: ... else: ... sin ningún except?", "No. Una rama else requiere al menos una rama except; try solo con finally sí está permitido."]
  ]
 },
 {
  t: "The built-in exception hierarchy: BaseException, Exception, ArithmeticError, LookupError, and their subclasses",
  tt: "La jerarquía de excepciones integradas: BaseException, Exception, ArithmeticError, LookupError y sus subclases",
  body: [
   "Las excepciones integradas de Python son clases organizadas en un árbol de herencia. Esa estructura es lo que hace funcionar la coincidencia de `except`: una rama atrapa su propia clase y todas las clases que están debajo. Conocer las ramas principales del árbol te permite predecir qué manejador atrapa qué y elegir manejadores con el nivel de generalidad adecuado.",
   "En la raíz está `BaseException`. Directamente debajo hay unas pocas clases especiales que no son errores en el sentido habitual: `SystemExit` (lanzada por `sys.exit()`), `KeyboardInterrupt` (lanzada cuando el usuario presiona Ctrl+C) y `GeneratorExit` (usada cuando se cierra un generador). También directamente debajo de `BaseException` está `Exception`, el padre de casi todos los errores comunes. Tus propias clases de excepción deben heredar de `Exception` o de una de sus subclases.",
   "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- GeneratorExit\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      |    +-- FloatingPointError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- AssertionError\n      +-- AttributeError\n      +-- ImportError\n      |    +-- ModuleNotFoundError\n      +-- NameError\n      +-- OSError\n      +-- StopIteration\n      +-- TypeError\n      +-- ValueError\n           +-- UnicodeError\n```",
   "Dos clases intermedias merecen atención porque el examen las nombra. `ArithmeticError` agrupa errores de operaciones numéricas: `ZeroDivisionError` para división o módulo entre cero, `OverflowError` para resultados demasiado grandes para representarse (por ejemplo, algunas operaciones con float) y `FloatingPointError`. `LookupError` agrupa errores de búsquedas fallidas en contenedores: `IndexError` cuando un índice de secuencia está fuera de rango, y `KeyError` cuando falta una clave de diccionario. Por lo tanto, atrapar `LookupError` maneja tanto un índice de lista inválido como una clave de dict inexistente.",
   "Vale la pena reconocer por su causa las otras hojas comunes. `TypeError`: una operación aplicada al tipo equivocado, como `'a' + 1`. `ValueError`: el tipo correcto pero un valor inaceptable, como `int('abc')`. `NameError`: una variable no definida. `AttributeError`: un objeto no tiene ese atributo. `ImportError` y su subclase `ModuleNotFoundError`: falla un import. `OSError`: un problema del sistema operativo o de E/S, que se retoma en las lecciones de archivos. `AssertionError`: un `assert` fallido.",
   "Puedes explorar el árbol tú mismo. `ZeroDivisionError.__mro__` o `ZeroDivisionError.__bases__` muestran sus ancestros, e `issubclass(KeyError, LookupError)` devuelve True. Hacer esto con un puñado de clases es uno de los laboratorios de este dominio y es la forma más rápida de que el árbol se te quede grabado."
  ],
  terms: [
   ["BaseException", "La raíz de todas las excepciones integradas, incluidas señales que no son errores, como KeyboardInterrupt."],
   ["Exception", "La clase base de los errores comunes y de las excepciones definidas por el usuario."],
   ["ArithmeticError", "Padre de ZeroDivisionError, OverflowError y FloatingPointError."],
   ["LookupError", "Padre de IndexError y KeyError, que se lanza cuando una clave o un índice no es válido."]
  ],
  example: "Una función lee ajustes tanto de una lista como de un diccionario. Una sola rama except LookupError devuelve un valor predeterminado, ya sea que la falla haya sido un IndexError de la lista o un KeyError del diccionario.",
  tip: "Conoce a los padres: ZeroDivisionError bajo ArithmeticError, IndexError y KeyError bajo LookupError, ModuleNotFoundError bajo ImportError, y KeyboardInterrupt directamente bajo BaseException, no bajo Exception.",
  check: [
   ["¿Qué rama atrapa d['missing'] cuando d es un dict: except IndexError o except LookupError?", "except LookupError, porque KeyError es su subclase; IndexError es una clase hermana y no coincide."],
   ["¿ZeroDivisionError es subclase de Exception?", "Sí, a través de ArithmeticError, que hereda de Exception."]
  ]
 },
 {
  t: "Raise, raise with an instance, and a bare raise to re-raise",
  tt: "raise, raise con una instancia y raise sin argumentos para relanzar",
  body: [
   "Las excepciones no solo las lanza Python; tu propio código puede lanzarlas con la sentencia `raise`. Lo haces cuando una función detecta una situación que no puede manejar de forma sensata, como una edad negativa o una lista vacía donde se requieren datos. Lanzar una excepción le pasa el problema a quien llamó de una forma que no se puede ignorar en silencio.",
   "La sentencia recibe una clase de excepción o una instancia de excepción. `raise ValueError` nombra una clase; Python crea una instancia por ti sin argumentos, así que su `args` está vacío. `raise ValueError('age must be positive')` crea la instancia tú mismo, pasando un mensaje que termina en `args` y en el traceback impreso. Pasar un mensaje casi siempre es mejor, porque le dice a quien lea el error qué salió mal. Lo que lances debe ser una clase o instancia derivada de `BaseException`; lanzar cualquier otra cosa, como una cadena, es un TypeError.",
   "```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError('age must be non-negative', age)\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e.args)    # ('age must be non-negative', -5)\n```",
   "Dentro de una rama `except` puedes escribir `raise` solo, sin argumento. Este raise sin argumentos (bare raise) vuelve a lanzar la excepción que se está manejando, sin cambios, con su traceback original. Es útil cuando un manejador quiere hacer algo, como registrar el error o deshacer trabajo parcial, pero aun así dejar que la excepción siga hacia quien llamó. Fuera de cualquier manejador de excepciones no hay nada que relanzar, así que un `raise` sin argumentos ahí falla con RuntimeError.",
   "```python\ndef load(path):\n    try:\n        return open(path).read()\n    except OSError:\n        print('load failed for', path)\n        raise          # la misma excepción sigue hacia afuera\n```",
   "Un manejador también puede lanzar una excepción diferente, traduciendo un error de bajo nivel a uno de más alto nivel. Python registra automáticamente la original como el contexto, y el traceback muestra ambas. La forma opcional `raise NewError('msg') from original` marca la original como la causa explícita. El PCAP se centra en las tres formas básicas, pero reconocer `from` ayuda al leer tracebacks.",
   "`raise` también es útil para probar manejadores: puedes lanzar a propósito una excepción concreta para comprobar que la rama correcta la atrapa. Recuerda que la ejecución se detiene en el `raise`; nada de lo que va después en el mismo bloque se ejecuta, exactamente igual que con un error lanzado por el propio Python."
  ],
  terms: [
   ["raise", "Sentencia que señala una excepción, dada una clase o una instancia."],
   ["Bare raise (raise sin argumentos)", "raise sin operando dentro de una rama except; relanza la excepción actual sin cambios."],
   ["Exception chaining (encadenamiento de excepciones)", "Vincular una nueva excepción con la que la causó, automáticamente o con raise ... from."]
  ],
  example: "Una función de pagos atrapa un ConnectionError, escribe una nota en su registro y luego usa un raise sin argumentos para que el manejador web que está por encima siga viendo el error original y pueda mostrarle al usuario un mensaje para reintentar.",
  tip: "raise ValueError y raise ValueError() funcionan ambos; la forma con clase crea una instancia con args vacío. Un raise sin argumentos solo es válido mientras se está manejando una excepción.",
  check: [
   ["¿Cuáles son los args de la excepción producida por raise IndexError?", "Una tupla vacía, (), porque Python instancia la clase sin argumentos."],
   ["¿Qué hace un raise sin argumentos dentro de una rama except?", "Relanza la excepción que se está manejando, así que se propaga al siguiente manejador que la envuelve o a quien llamó."]
  ]
 },
{
  t: "Assert and AssertionError",
  tt: "assert y AssertionError",
  body: [
   "La sentencia `assert` comprueba una condición que tú, como programador, crees que debe ser verdadera en cierto punto. Si la condición es verdadera, no pasa nada y la ejecución continúa. Si es falsa, Python lanza `AssertionError`. Las aserciones son una ayuda para depurar: detectan estados imposibles temprano, cerca de su causa, en lugar de dejar que datos incorrectos avancen y fallen en algún lugar confuso.",
   "La sintaxis tiene un mensaje opcional: `assert condition` o `assert condition, message`. El mensaje se convierte en el argumento de la excepción, así que aparece en el traceback y en `e.args`. La condición es cualquier expresión; Python evalúa su valor de verdad, así que cero, cadenas vacías y contenedores vacíos cuentan como falsos, igual que en un `if`.",
   "```python\nimport math\n\ndef safe_sqrt(x):\n    assert x >= 0, 'x must be non-negative'\n    return math.sqrt(x)\n\ntry:\n    safe_sqrt(-1)\nexcept AssertionError as e:\n    print('Assertion failed:', e)   # Assertion failed: x must be non-negative\n```",
   "Ten en cuenta que `assert` es una sentencia, no una función. Escribir `assert(x > 0, 'message')` con paréntesis alrededor de ambas partes crea una tupla de dos elementos, y una tupla no vacía siempre es verdadera, así que la aserción nunca puede fallar. Las versiones recientes de Python advierten sobre esto, y es una pregunta trampa clásica.",
   "Las aserciones se pueden desactivar. Cuando Python se ejecuta con la opción de línea de comandos `-O` (optimizar), todas las sentencias `assert` se eliminan y nunca se evalúan. Por eso las aserciones no deben usarse para cosas que tienen que ocurrir en producción, como validar la entrada del usuario, comprobar permisos o realizar acciones con efectos secundarios. Para eso, usa un `if` y lanza una excepción adecuada como ValueError. Una buena forma de pensarlo: `assert` documenta suposiciones sobre tu propio código, mientras que las excepciones manejan problemas causados por el mundo exterior.",
   "`AssertionError` está directamente bajo `Exception` en la jerarquía, así que `except Exception` la atrapa. Puedes atraparla explícitamente, como hace el ejemplo, pero la mayoría de las veces las aserciones fallidas están pensadas para detener el programa y que el error se corrija. Los frameworks de pruebas como `unittest` y `pytest` también se apoyan en aserciones para reportar comprobaciones que fallan."
  ],
  terms: [
   ["assert", "Sentencia que lanza AssertionError cuando su condición es falsa."],
   ["AssertionError", "La excepción que lanza un assert fallido; subclase de Exception."],
   ["-O option (opción -O)", "Bandera del intérprete que elimina las sentencias assert para que nunca se evalúen."]
  ],
  example: "En una función que divide una cuenta, un desarrollador agrega assert len(people) > 0, 'no diners' antes de dividir. Durante las pruebas detecta un error en quien la llama, que pasaba una lista vacía, mucho antes de que los usuarios vean un ZeroDivisionError.",
  tip: "assert (cond, 'msg') con paréntesis es una tupla no vacía y siempre pasa. Además, nunca dependas de assert para validar entradas, porque -O lo elimina.",
  check: [
   ["¿Qué hace assert 0, 'zero'?", "Lanza AssertionError con el mensaje 'zero', porque 0 es falso."],
   ["¿Por qué assert no es adecuado para comprobar la longitud de la contraseña de un usuario?", "Las aserciones pueden desactivarse con -O, así que la comprobación podría no ejecutarse; usa un if y lanza una excepción en su lugar."]
  ]
 },
 {
  t: "Why except Exception does not catch KeyboardInterrupt or SystemExit",
  tt: "Por qué except Exception no atrapa KeyboardInterrupt ni SystemExit",
  body: [
   "Es tentador envolver todo un programa en `try` con `except Exception:` para que nunca se caiga. Eso funciona para los errores comunes, pero dos eventos importantes pasan de largo por ese manejador, a propósito. Entender por qué depende de la jerarquía de excepciones vista antes.",
   "`KeyboardInterrupt` se lanza cuando el usuario presiona Ctrl+C (o la tecla de interrupción equivalente) en la terminal. `SystemExit` la lanza `sys.exit()` cuando un programa pide terminar, opcionalmente con un código de salida. Ninguna de las dos representa un error de programación. Son peticiones para detenerse, y los diseñadores de Python las colocaron directamente bajo `BaseException`, al lado de `Exception` y no debajo de ella. Como `except` coincide solo con la clase nombrada y sus subclases, `except Exception` no coincide con ellas, así que un programa con un manejador de errores amplio todavía puede ser interrumpido por el usuario y todavía puede salir limpiamente cuando se le indica. `GeneratorExit` está en el mismo lugar por razones similares.",
   "```python\nimport sys\ntry:\n    sys.exit(3)\nexcept Exception:\n    print('caught by Exception')   # no se imprime\nexcept SystemExit as e:\n    print('exit requested:', e.code)   # exit requested: 3\n```",
   "Un `except:` sin clase o `except BaseException:` sí las atrapa. Justamente por eso un `except` sin clase es riesgoso: un bucle como `while True: try: ... except: pass` se vuelve imposible de detener con Ctrl+C, porque cada interrupción se traga y el bucle simplemente continúa. Si de verdad debes atrapar todo, por ejemplo para registrar algo antes de salir, relanza después con un `raise` sin argumentos para que la interrupción o la salida sí ocurran.",
   "Cuando sí quieras responder a Ctrl+C, atrapa `KeyboardInterrupt` explícitamente: imprime un mensaje breve, guarda el trabajo y termina. Cuando el código llama a `sys.exit()`, la excepción `SystemExit` desenrolla la pila como cualquier otra excepción, así que los bloques `finally` y las sentencias `with` siguen ejecutando su limpieza al salir. El atributo `code` de la excepción contiene el valor pasado a `sys.exit()`.",
   "Para el examen, el patrón a reconocer es una pregunta que lanza uno de estos eventos dentro de un `try` que solo tiene `except Exception` y pregunta qué pasa. La respuesta es que el manejador no se ejecuta y el evento se propaga, terminando el programa (después de cualquier `finally`). La lección práctica es atrapar las excepciones más específicas que puedas, usar `Exception` como último recurso para errores y no tocar `BaseException` a menos que relances."
  ],
  terms: [
   ["KeyboardInterrupt", "Se lanza cuando el usuario presiona la tecla de interrupción (Ctrl+C); hereda directamente de BaseException."],
   ["SystemExit", "La lanza sys.exit(); su atributo code contiene el código de salida."],
   ["except Exception", "Un manejador amplio para errores comunes que excluye deliberadamente las señales de salida e interrupción."]
  ],
  example: "Un script de monitoreo de larga duración atrapa Exception dentro de su bucle para que una sola lectura incorrecta no lo detenga. Cuando el operador presiona Ctrl+C, KeyboardInterrupt pasa por alto ese manejador y el script se detiene como se espera.",
  tip: "KeyboardInterrupt, SystemExit y GeneratorExit heredan de BaseException, no de Exception. Solo un except sin clase o except BaseException (o la clase específica) las atrapa.",
  check: [
   ["¿except Exception atrapará la excepción lanzada por sys.exit()?", "No. sys.exit() lanza SystemExit, que deriva de BaseException, no de Exception."],
   ["¿Por qué es difícil detener un bucle infinito que contiene try/except: pass?", "El except sin clase se traga KeyboardInterrupt, así que Ctrl+C se atrapa y el bucle continúa."]
  ]
 },
 {
  t: "Defining your own exception classes and adding attributes to them",
  tt: "Definir tus propias clases de excepción y agregarles atributos",
  body: [
   "Las excepciones integradas describen problemas generales, pero tus programas tienen sus propias formas de fallar: una cuenta sin fondos suficientes, un pedido de un artículo agotado. Definir tus propias clases de excepción permite que quien llama atrape exactamente esos problemas por nombre, y te permite adjuntar los datos necesarios para manejarlos.",
   "Una excepción personalizada es simplemente una clase que hereda de `Exception` (o de una integrada más específica, como `ValueError`, si la describe bien). La versión más simple no necesita ningún cuerpo aparte de `pass`. Ya se comporta como cualquier excepción: puedes lanzarla, atraparla y pasarle un mensaje que termina en `args`.",
   "```python\nclass BankError(Exception):\n    pass\n\nclass InsufficientFunds(BankError):\n    def __init__(self, balance, amount):\n        super().__init__(f'balance {balance} is less than {amount}')\n        self.balance = balance\n        self.amount = amount\n\ntry:\n    raise InsufficientFunds(50, 80)\nexcept BankError as e:\n    print(e)                       # balance 50 is less than 80\n    print(e.amount - e.balance)    # 30\n```",
   "Ahí aparecen dos ideas de diseño. Primero, una jerarquía: `InsufficientFunds` hereda de `BankError`, así que quien llama puede atrapar todos los problemas bancarios con `except BankError` o solo este con `except InsufficientFunds`. Aplica la misma regla de ordenar de lo más específico a lo más general que con las excepciones integradas. Segundo, atributos extra: al definir `__init__`, guardas datos útiles como `balance` y `amount` en el objeto excepción, y un manejador puede leerlos para decidir qué hacer, en lugar de analizar una cadena de mensaje.",
   "Cuando sobrescribes `__init__`, llama a `super().__init__(...)` con un mensaje. Esa llamada establece `args`, que es lo que muestran `print(e)` y los tracebacks. Si lo olvidas, la excepción sigue funcionando, pero `args` contiene los argumentos que recibió la llamada al constructor (Python lo llena automáticamente al crearla), que puede no ser el mensaje que quieres, y el código posterior que dependa de `args` se vuelve confuso. También puedes sobrescribir `__str__()` para controlar directamente el mensaje impreso.",
   "Hereda de `Exception`, no de `BaseException`, para que tus excepciones las atrapen los manejadores comunes `except Exception` y no se comporten como señales de salida o interrupción. Por convención, los nombres de clase terminan en Error, como los integrados. Mantén poco profundas las jerarquías personalizadas: una clase base para tu módulo o paquete y unas pocas subclases específicas suelen ser suficientes."
  ],
  terms: [
   ["Custom exception (excepción personalizada)", "Una clase definida por el usuario que hereda de Exception y se lanza y atrapa como las integradas."],
   ["Exception hierarchy (jerarquía de excepciones)", "Un conjunto de clases de excepción relacionadas donde una clase base permite que quien llama atrape todo el grupo."],
   ["super().__init__()", "Llamada al constructor del padre, que establece args y el mensaje impreso."]
  ],
  example: "Una tienda en línea define OrderError con las subclases OutOfStock y PaymentDeclined. La página de pago atrapa OutOfStock para ofrecer alternativas, leyendo su atributo item, y atrapa cualquier otro OrderError para mostrar un mensaje genérico.",
  tip: "Las excepciones personalizadas deben derivar de Exception. Si sobrescribes __init__, pasa un mensaje a super().__init__() para que args y str(e) sigan teniendo sentido.",
  check: [
   ["Si existen class AppError(Exception) y class DbError(AppError), ¿except AppError atrapa DbError?", "Sí, porque DbError es subclase de AppError."],
   ["¿Por qué guardar datos como atributos en una excepción personalizada en lugar de solo en el mensaje?", "Los manejadores pueden leer los valores directamente, por ejemplo e.amount, en lugar de analizar texto."]
  ]
 },
 {
  t: "Character encoding: ASCII, Unicode, code points, UTF-8",
  tt: "Codificación de caracteres: ASCII, Unicode, code points, UTF-8",
  body: [
   "Las computadoras solo almacenan números, así que cada carácter de un texto tiene que representarse con un número. Un acuerdo sobre qué número corresponde a qué carácter es un juego de caracteres (character set), y una regla sobre cómo esos números se escriben como bytes es una codificación (encoding). El PCAP espera que conozcas el vocabulario y la relación entre los estándares principales, porque es la base de cómo funcionan las cadenas en Python.",
   "ASCII (American Standard Code for Information Interchange) es el juego de caracteres clásico. Define 128 caracteres, numerados del 0 al 127: las letras del inglés en mayúscula y minúscula, dígitos, signos de puntuación y caracteres de control como el salto de línea (10) y el tabulador (9). Cada código ASCII cabe en 7 bits, así que cabe holgadamente en un byte. Vale la pena recordar algunos puntos de referencia: el espacio es 32, el dígito '0' es 48, 'A' es 65 y 'a' es 97. Las mayúsculas y minúsculas están separadas por 32.",
   "ASCII no tiene lugar para letras acentuadas, cirílico, caracteres chinos ni emoji. Varias páginas de códigos (code pages) de 8 bits intentaron ampliarlo, cada una para un idioma distinto, lo que causó confusión interminable cuando el texto pasaba de un sistema a otro. Unicode resolvió esto asignando un número único, llamado code point (punto de código), a cada carácter de cada sistema de escritura, con mucho espacio libre para más. Los code points se escriben como `U+0041` (hexadecimal) para 'A'. Los primeros 128 code points de Unicode son idénticos a ASCII, así que ASCII es un subconjunto de Unicode. Adaptar el software a muchos idiomas de esta forma se llama internacionalización, a menudo abreviada I18N.",
   "Un code point es solo un número; todavía necesita una codificación para convertirse en bytes. UTF-8 es la codificación de Unicode más usada. Es de longitud variable: usa un byte para los code points del rango ASCII y dos, tres o cuatro bytes para code points más altos. Como UTF-8 de un byte es idéntico byte por byte a ASCII, el texto simple en inglés es igual en ambos, lo que ayudó a que UTF-8 se volviera el predeterminado en la web y en la mayoría de los sistemas modernos. Existen otras codificaciones, como UTF-16 y UTF-32, que usan unidades más grandes; UTF-32 usa cuatro bytes fijos por code point.",
   "```python\ns = 'café'\nprint(len(s))                  # 4 caracteres\nprint(len(s.encode('utf-8')))  # 5 bytes: é necesita dos\nprint(ord('é'))                # 233, su code point\n```",
   "En Python 3, el tipo `str` contiene texto Unicode: una secuencia de code points, independiente de cualquier codificación. La codificación ocurre en los bordes, cuando escribes texto a un archivo o a la red (`str.encode()` lo convierte en `bytes`) y cuando lo vuelves a leer (`bytes.decode()`). Por eso `len()` de una cadena cuenta caracteres, no bytes, y por eso los archivos abiertos en modo texto reciben un argumento `encoding`. Una discrepancia entre la codificación usada para escribir y la usada para leer es la causa habitual de caracteres ilegibles."
  ],
  terms: [
   ["ASCII", "Un juego de caracteres de 7 bits con 128 caracteres numerados del 0 al 127."],
   ["Unicode", "Un estándar que asigna un code point único a cada carácter de cada sistema de escritura."],
   ["Code point (punto de código)", "El número que Unicode asigna a un carácter, escrito como U+0041."],
   ["UTF-8", "Una codificación de Unicode de longitud variable que usa de 1 a 4 bytes por code point, compatible con ASCII."]
  ],
  example: "Un CSV con nombres de clientes escrito en un sistema como UTF-8 se abre en otro con una página de códigos antigua, y José aparece como símbolos ilegibles. Volver a leer el archivo con encoding='utf-8' lo arregla, porque los bytes nunca estuvieron mal, solo su interpretación.",
  tip: "ASCII es un subconjunto de Unicode; UTF-8 es una codificación de Unicode, no un juego de caracteres aparte. Un str de Python cuenta code points, así que len('é') es 1 aunque ocupe 2 bytes en UTF-8.",
  check: [
   ["¿Cuántos caracteres define ASCII?", "128, con códigos del 0 al 127."],
   ["¿Por qué los archivos UTF-8 que contienen solo texto en inglés pueden leerse como ASCII?", "UTF-8 codifica los code points del 0 al 127 como bytes únicos idénticos a ASCII."]
  ]
 },
 {
  t: "Ord() and chr()",
  tt: "ord() y chr()",
  body: [
   "Dos funciones integradas conectan los caracteres con sus code points de Unicode. `ord(ch)` recibe una cadena de exactamente un carácter y devuelve su code point como entero. `chr(n)` hace lo contrario: recibe un code point entero y devuelve la cadena de un carácter correspondiente. Son inversas entre sí, así que `chr(ord(c)) == c` para cualquier carácter c, y `ord(chr(n)) == n` para cualquier code point válido n.",
   "```python\nprint(ord('A'), ord('a'), ord('0'), ord(' '))  # 65 97 48 32\nprint(chr(66), chr(122))                       # B z\nprint(ord('a') - ord('A'))                     # 32\nprint(chr(ord('c') + 1))                       # d\n```",
   "Como las letras del alfabeto inglés tienen code points consecutivos, puedes hacer aritmética con ellas. `ord(c) - ord('a')` da la posición de una letra en el alfabeto contando desde 0, y sumar un desplazamiento y luego llamar a `chr()` la desplaza. Combinado con el operador módulo, esto da el clásico cifrado César del laboratorio de este dominio. De forma similar, `ord(d) - ord('0')` convierte un carácter de dígito en su valor numérico, que es como funciona internamente el análisis de dígitos.",
   "```python\ndef shift(c, k):\n    if 'a' <= c <= 'z':\n        return chr((ord(c) - ord('a') + k) % 26 + ord('a'))\n    return c\n\nprint(''.join(shift(c, 3) for c in 'xyz abc'))  # abc def\n```",
   "Conoce los casos de error. `ord()` requiere una cadena de longitud exactamente uno: `ord('ab')` y `ord('')` lanzan TypeError, y también `ord(65)`, ya que el argumento no es una cadena. `chr()` requiere un entero dentro del rango válido de Unicode, desde 0 hasta 0x10FFFF (1,114,111); un número negativo o cualquiera por encima lanza ValueError, y un float lanza TypeError.",
   "Estas funciones sirven para todo Unicode, no solo ASCII: `ord('€')` devuelve 8364 y `chr(960)` devuelve 'π'. Los code points suelen mostrarse en hexadecimal, así que `hex(ord('€'))` da '0x20ac', que coincide con la notación U+20AC. Los literales de cadena de Python también aceptan secuencias de escape basadas en code points, como `'\\u20ac'` para el signo del euro, que equivale a `chr(0x20ac)`.",
   "El orden de los code points es también el que usa la comparación de cadenas, por eso 'Z' < 'a' es True: 90 es menor que 97. Cuando una pregunta te pide predecir comparaciones u ordenamiento de cadenas con mayúsculas y minúsculas mezcladas, calcular mentalmente algunos valores de `ord()` lo resuelve."
  ],
  terms: [
   ["ord()", "Devuelve el code point entero de una cadena de un solo carácter."],
   ["chr()", "Devuelve la cadena de un carácter correspondiente a un code point entero."],
   ["Caesar cipher (cifrado César)", "Una sustitución simple que desplaza cada letra un número fijo de posiciones, fácil de construir con ord y chr."]
  ],
  example: "Un verificador de fortaleza de contraseñas cuenta las letras mayúsculas comprobando 65 <= ord(c) <= 90 para cada carácter. El método isupper() suele ser más claro, pero la versión con ord muestra exactamente qué code points cuentan.",
  tip: "ord() necesita exactamente un carácter; si no, TypeError. chr() necesita un int en el rango de 0 a 0x10FFFF; si no, ValueError. Recuerda 'A' = 65, 'a' = 97, '0' = 48.",
  check: [
   ["¿Qué devuelve chr(ord('A') + 32)?", "'a', porque las minúsculas están 32 code points después de sus formas mayúsculas."],
   ["¿Qué pasa con ord('hi')?", "TypeError, porque ord espera una cadena de longitud 1."]
  ]
 },
 {
  t: "String literals and escape sequences (\\n, \\t, \\\\, quotes)",
  tt: "Literales de cadena y secuencias de escape (\\n, \\t, \\\\, comillas)",
  body: [
   "Un literal de cadena es texto escrito directamente en tu código fuente entre comillas. Python acepta comillas simples `'...'` y comillas dobles `\"...\"` indistintamente; producen cadenas idénticas. Tener ambas te permite incluir fácilmente un tipo de comilla delimitando con el otro: `\"It's fine\"` o `'She said \"yes\"'`.",
   "Algunos caracteres no pueden escribirse directamente dentro de un literal, o lo terminarían. Para esos, Python usa secuencias de escape: una barra invertida seguida de uno o más caracteres que juntos representan un solo carácter. Las que debes conocer son `\\n` (salto de línea), `\\t` (tabulador horizontal), `\\\\` (una barra invertida literal), `\\'` (comilla simple) y `\\\"` (comilla doble). Una secuencia de escape es un solo carácter en la cadena resultante, así que `len('a\\nb')` es 3, no 4.",
   "```python\nprint('Name:\\tAda\\nRole:\\tEngineer')\n# Name:   Ada\n# Role:   Engineer\nprint('It\\'s a backslash: \\\\')    # It's a backslash: \\\nprint(len('\\\\'))                  # 1\n```",
   "El caso de la doble barra invertida es el que más importa en la práctica, por ejemplo con rutas de Windows. `'C:\\new'` no contiene una barra invertida seguida de n; contiene un salto de línea, porque `\\n` es una secuencia de escape. Escribe `'C:\\\\new'` en su lugar, o usa una raw string (cadena cruda). Una raw string se escribe con el prefijo `r`, como `r'C:\\new'`, y trata las barras invertidas como caracteres comunes, salvo que aun así no puede terminar con una sola barra invertida.",
   "Las cadenas con triple comilla, escritas con `'''...'''` o `\"\"\"...\"\"\"`, pueden abarcar varias líneas, y los saltos de línea se convierten en caracteres de nueva línea dentro de la cadena. También se usan para los docstrings. Dentro de ellas puedes usar comillas simples y dobles libremente.",
   "Una barra invertida justo al final de una línea, en código común o dentro de un literal de cadena, es una continuación de línea: une la línea siguiente y no agrega ningún carácter. Una barra invertida seguida de un carácter que no es un escape reconocido, como `\\d`, por ahora se conserva tal cual, pero las versiones recientes de Python advierten sobre ello, así que prefiere las raw strings para patrones llenos de barras invertidas.",
   "En el examen aparecen dos trampas pequeñas. Primero, `print()` muestra la cadena procesada, mientras que el prompt interactivo muestra la representación de `repr()`, que exhibe los escapes: escribir `'a\\tb'` en el prompt muestra `'a\\tb'`, pero `print('a\\tb')` muestra un tabulador. Segundo, una cadena vacía `''` tiene longitud 0, y las cadenas con distintos estilos de comillas son iguales al compararlas: `'x' == \"x\"` es True."
  ],
  terms: [
   ["String literal (literal de cadena)", "Texto escrito en el código fuente entre comillas simples, dobles o triples."],
   ["Escape sequence (secuencia de escape)", "Una barra invertida seguida de caracteres que representan un carácter especial, como \\n."],
   ["Raw string (cadena cruda)", "Un literal con prefijo r en el que las barras invertidas no se tratan como escapes."]
  ],
  example: "Un script construye un reporte separado por tabuladores con '\\t'.join(fields) + '\\n' para cada fila. Al abrir el archivo en una hoja de cálculo todo queda alineado en columnas, porque cada \\t es un solo carácter de tabulador.",
  tip: "Cada secuencia de escape cuenta como un carácter: len('\\n') es 1 y len('\\\\') es 1. Cuidado con los escapes accidentales en rutas de Windows.",
  check: [
   ["¿Cuánto es len('a\\tb\\\\')?", "4: los caracteres a, tabulador, b y una barra invertida."],
   ["¿Cómo puedes escribir una cadena que contenga ' y \" sin escapes?", "Usa triple comilla, o elige un estilo de comilla como delimitador y escapa solo el otro cuando haga falta."]
  ]
 },
 {
  t: "Indexing, negative indexing and slicing, including steps",
  tt: "Indexación, índices negativos y slicing (rebanado), incluidos los pasos",
  body: [
   "Una cadena es una secuencia de caracteres, y cada carácter tiene una posición llamada índice. Los índices empiezan en 0 para el primer carácter. Para `s = 'Python'`, `s[0]` es 'P' y `s[5]` es 'n'. Usar un índice igual o mayor que la longitud, como `s[6]`, lanza IndexError. La indexación siempre devuelve una cadena de longitud uno, porque Python no tiene un tipo carácter separado.",
   "Los índices negativos cuentan desde el final: `s[-1]` es el último carácter 'n', `s[-2]` es 'o' y `s[-6]` es 'P'. Una regla útil es que `s[-k]` es lo mismo que `s[len(s) - k]`. `s[-7]` está fuera de rango y lanza IndexError.",
   "El slicing (rebanado) extrae una subcadena con la forma `s[start:stop:step]`. Devuelve los caracteres desde el índice start hasta stop, sin incluirlo. `s[1:4]` es 'yth'. Si omites start, por defecto es el principio; si omites stop, por defecto es el final, así que `s[:2]` es 'Py', `s[2:]` es 'thon' y `s[:]` es una copia completa. La longitud de `s[a:b]`, con a y b positivos dentro del rango, es simplemente b - a. Los valores negativos también funcionan en slices: `s[-3:]` son los últimos tres caracteres, 'hon', y `s[:-1]` es todo excepto el último.",
   "A diferencia de la indexación, el slicing nunca lanza IndexError. Los valores fuera de rango se recortan a los límites de la cadena, así que `s[2:100]` es 'thon', y un slice cuyo start está en su stop o después, como `s[4:2]`, es simplemente la cadena vacía.",
   "```python\ns = 'Certification'\nprint(s[0], s[-1])     # C n\nprint(s[4:8])          # ific\nprint(s[::2])          # Criiain\nprint(s[::-1])         # noitacifitreC\nprint(s[-3:-8:-1])     # itaci\nprint(s[10:3])         # '' (vacía)\n```",
   "El paso (step) opcional indica cuánto avanzar entre caracteres. `s[::2]` toma uno de cada dos caracteres empezando en el índice 0. Un paso negativo recorre hacia atrás: `s[::-1]` invierte la cadena, un idioma muy común. Con un paso negativo los valores predeterminados se invierten, así que un start omitido significa el final de la cadena y un stop omitido significa antes del principio, y start debe estar a la derecha de stop para obtener algo. Por esa razón `s[1:5:-1]` está vacío. Un paso de 0 lanza ValueError.",
   "Todas estas reglas se aplican igual a listas y tuplas, que el examen también rebana. Al predecir un slice, escribe la cadena con los índices debajo, tanto positivos como negativos, y cuenta; es más rápido y mucho más confiable que calcularlo mentalmente."
  ],
  terms: [
   ["Index (índice)", "La posición de un elemento en una secuencia, empezando en 0."],
   ["Negative index (índice negativo)", "Una posición contada desde el final, donde -1 es el último elemento."],
   ["Slice (rebanada)", "Una subsecuencia seleccionada con [start:stop:step], sin incluir la posición stop."],
   ["Step (paso)", "La distancia entre las posiciones seleccionadas en un slice; los valores negativos van hacia atrás."]
  ],
  example: "Un script extrae el año de nombres de archivo como report_2024_q3.txt con name[7:11], y la comprobación de extensión usa name[-4:] == '.txt'. Ambos siguen funcionando aunque un nombre de archivo sea más corto de lo esperado, porque los slices nunca lanzan IndexError.",
  tip: "Indexar fuera de rango lanza IndexError; rebanar fuera de rango solo recorta. Con un paso negativo, start debe ser mayor que stop o el resultado estará vacío.",
  check: [
   ["¿Qué es 'abcdef'[-2:]?", "'ef', los dos últimos caracteres."],
   ["¿Qué es 'abcdef'[5:1:-2]?", "'fd': empieza en el índice 5 ('f'), retrocede 2 hasta el índice 3 ('d') y se detiene antes del índice 1."],
   ["¿Qué hace 'abc'[3] comparado con 'abc'[3:]?", "'abc'[3] lanza IndexError; 'abc'[3:] devuelve la cadena vacía."]
  ]
 },
 {
  t: "Immutability: why item assignment fails",
  tt: "Inmutabilidad: por qué falla la asignación a elementos",
  body: [
   "Las cadenas en Python son inmutables: una vez creado un objeto cadena, su contenido nunca puede cambiar. Puedes leer cualquier carácter con indexación, pero no puedes asignar a un índice o a un slice, y no puedes borrar caracteres en el lugar. Intentar `s[0] = 'J'` lanza `TypeError: 'str' object does not support item assignment`, y `del s[0]` lanza un TypeError similar. Lo mismo aplica a la asignación a slices como `s[1:3] = 'xy'`.",
   "La inmutabilidad suena limitante, pero los métodos y operadores de cadena la rodean creando siempre cadenas nuevas. `s.upper()`, `s.replace('a', 'b')` y `s + '!'` devuelven cada uno una cadena totalmente nueva y dejan intacta la original. Para cambiar el texto de una variable, vuelves a enlazar el nombre al nuevo objeto: `s = s.upper()`. La cadena vieja no se modifica; el nombre simplemente apunta a otro objeto, y el viejo se descarta cuando nada hace referencia a él.",
   "```python\ns = 'Python'\n# s[0] = 'J'           # TypeError\ns = 'J' + s[1:]       # construir una cadena nueva\nprint(s)              # Jython\n\nt = 'hello'\nt.upper()             # el resultado se descarta\nprint(t)              # hello, sin cambios\nt = t.upper()\nprint(t)              # HELLO\n```",
   "Ese segundo patrón es una trampa favorita: llamar a un método sin asignar el resultado no hace nada visible, porque el método no puede cambiar el original. Compáralo con las listas, que son mutables: `lst.append(x)` y `lst.sort()` cambian la lista en el lugar y devuelven None. Confundir los dos estilos es una fuente común de errores, así que presta atención al tipo con el que trabajas.",
   "Borrar una variable de cadena completa sí está permitido, porque eso elimina el nombre, no caracteres: `del s` funciona, y después usar `s` lanza NameError.",
   "¿Por qué diseñar así las cadenas? Los objetos inmutables son seguros de compartir: si dos variables se refieren a la misma cadena, ninguna puede sorprender a la otra cambiándola. La inmutabilidad también hace que las cadenas sean hashables, por eso pueden ser claves de diccionario y miembros de conjuntos, y permite que Python optimice el almacenamiento reutilizando cadenas idénticas. El costo es que construir una cadena larga con `+=` repetido en un bucle crea muchas cadenas intermedias; para grandes cantidades de texto, reúne las piezas en una lista y combínalas una sola vez con `''.join(pieces)`.",
   "Si de verdad necesitas datos de caracteres mutables, convierte a lista con `list(s)`, modifica la lista y vuelve a unirla. Para datos binarios, el tipo `bytearray` es la contraparte mutable del inmutable `bytes`, y lo verás de nuevo en las lecciones de E/S de archivos."
  ],
  terms: [
   ["Immutable (inmutable)", "No puede cambiarse después de crearse; las cadenas, tuplas y bytes son inmutables."],
   ["Rebinding (reenlazar)", "Hacer que un nombre existente apunte a un objeto nuevo, como en s = s.upper()."],
   ["Hashable", "Que tiene un valor hash fijo, algo que la inmutabilidad hace posible y que los diccionarios exigen para las claves."]
  ],
  example: "Un principiante escribe name.strip() en una línea aparte y no entiende por qué siguen los espacios. Cambiarlo a name = name.strip() corrige el error, porque strip devuelve una cadena nueva en lugar de editar la vieja.",
  tip: "Cualquier sentencia que asigne a s[i] o s[a:b], o que borre s[i], lanza TypeError con cadenas. Los métodos devuelven cadenas nuevas; si el resultado no se asigna, se pierde.",
  check: [
   ["¿Qué pasa con s = 'abc'; s[1] = 'X'?", "TypeError, porque los objetos str no admiten asignación a elementos."],
   ["Después de s = 'abc'; s.replace('a', 'z'); print(s), ¿qué se imprime?", "abc, porque replace devolvió una cadena nueva que no se asignó."]
  ]
 },
{
  t: "Iterating over strings; in and not in",
  tt: "Recorrer cadenas; in y not in",
  body: [
   "Como una cadena es una secuencia, un bucle `for` puede recorrerla carácter por carácter. `for ch in 'cat':` ejecuta su cuerpo tres veces, con `ch` igual a 'c', 'a' y 't' sucesivamente. Es la forma natural de contar, comprobar o transformar caracteres, y evita errores de indexación manual.",
   "```python\ntext = 'Hello, World'\nvowels = 0\nfor ch in text.lower():\n    if ch in 'aeiou':\n        vowels += 1\nprint(vowels)   # 3\n```",
   "Si además necesitas la posición de cada carácter, usa `enumerate()`, que produce pares de índice y carácter: `for i, ch in enumerate(text):`. El estilo más antiguo, `for i in range(len(text)):` con `text[i]` dentro, también funciona y aparece en el código del examen, así que acostúmbrate a leer ambos. Como las cadenas son inmutables, cambiar `ch` dentro del bucle nunca cambia la cadena original; para transformar texto, construye una cadena o lista nueva.",
   "Los operadores `in` y `not in` comprueban pertenencia. En las cadenas buscan subcadenas, no solo caracteres sueltos: `'ell' in 'Hello'` es True, `'eh' in 'Hello'` es False porque los caracteres deben estar juntos y en orden, y `'h' in 'Hello'` es False porque la comprobación distingue mayúsculas de minúsculas. `not in` es simplemente la negación: `'z' not in 'Hello'` es True. Ambos devuelven un booleano.",
   "Un caso límite que se evalúa a menudo: la cadena vacía se considera subcadena de cualquier cadena, así que `'' in 'abc'` es True, e incluso `'' in ''` es True. El operando izquierdo debe ser una cadena cuando el derecho lo es; `1 in 'a1b'` lanza TypeError en lugar de convertir el número.",
   "```python\nprint('ell' in 'Hello')     # True\nprint('H' not in 'Hello')   # False\nprint('' in 'abc')          # True\nfor i, ch in enumerate('ab'):\n    print(i, ch)            # 0 a, luego 1 b\n```",
   "Las pruebas de pertenencia suelen ser la forma más clara de expresar una condición. En lugar de `if ch == 'a' or ch == 'e' or ch == 'i' ...`, escribe `if ch in 'aeiou':`. Solo ten presente lo que significa: `ch in 'aeiou'` también sería True para un `ch` de varios caracteres como 'ei', lo cual está bien cuando sabes que `ch` es un único carácter que viene de un bucle, pero conviene recordarlo cuando el valor viene de otro lado. Las cadenas también admiten `len()`, `min()` y `max()`, que usan el orden de los puntos de código."
  ],
  terms: [
   ["Iteration (iteración)", "Visitar cada elemento de una secuencia por turno, como hace un bucle for con los caracteres de una cadena."],
   ["Membership operator (operador de pertenencia)", "in o not in, que comprueban si un valor aparece en un contenedor o si una subcadena aparece en una cadena."],
   ["enumerate()", "Función integrada que empareja cada elemento con su índice durante la iteración."]
  ],
  example: "Un validador de formularios rechaza nombres de usuario que contienen espacios con if ' ' in username, y comprueba que una contraseña tenga al menos un dígito con any(ch in '0123456789' for ch in password).",
  tip: "En las cadenas, in busca una subcadena contigua y sensible a mayúsculas, y la cadena vacía siempre está en cualquier cadena. Mezclar tipos, como 3 in 'a3', lanza TypeError.",
  check: [
   ["¿Qué devuelve 'ab' in 'a b'?", "False, porque los caracteres no están juntos en 'a b'."],
   ["¿Cuántas veces se ejecuta el cuerpo de for c in ''?", "Cero veces; la cadena vacía no tiene caracteres."]
  ]
 },
 {
  t: "Concatenation, replication and comparison of strings (and why comparing strings with numbers using < fails)",
  tt: "Concatenación, replicación y comparación de cadenas (y por qué falla comparar cadenas con números usando <)",
  body: [
   "Dos operadores aritméticos funcionan con cadenas con un significado nuevo. `+` concatena: `'Py' + 'thon'` es 'Python'. Ambos operandos deben ser cadenas; `'Age: ' + 30` lanza TypeError, así que convierte primero con `str(30)` o usa un f-string. `*` replica: `'ab' * 3` es 'ababab', y el orden puede invertirse, `3 * 'ab'`. El otro operando debe ser un entero. Multiplicar por 0 o por un número negativo da la cadena vacía en lugar de un error. Las formas aumentadas `+=` y `*=` también funcionan y, como las cadenas son inmutables, crean cadenas nuevas y vuelven a enlazar el nombre.",
   "Las cadenas se pueden comparar con `==`, `!=`, `<`, `<=`, `>` y `>=`. La igualdad es exacta y distingue mayúsculas: `'abc' == 'ABC'` es False. El orden es lexicográfico, como en un diccionario, pero basado en puntos de código y no en reglas alfabéticas. Python compara los primeros caracteres; si son distintos, el que tiene el punto de código menor hace que su cadena sea menor. Si son iguales, pasa al siguiente par. Si una cadena se acaba primero y todo lo anterior coincidía, la más corta es la menor: `'app' < 'apple'` es True.",
   "```python\nprint('apple' < 'banana')   # True\nprint('Zebra' < 'apple')    # True: 'Z' es 90, 'a' es 97\nprint('10' < '9')           # True: '1' es 49, '9' es 57\nprint('abc' < 'abd')        # True: se decide en el tercer carácter\nprint('ab' * 0 == '')       # True\n```",
   "Por el orden de los puntos de código, todas las letras mayúsculas van antes que todas las minúsculas, y los dígitos van antes que las letras. Las cadenas numéricas se comparan carácter por carácter, así que '10' es menor que '9', un error común al ordenar números leídos de un archivo como texto. Convierte con `int()` antes de comparar si quieres orden numérico. Para comparar sin distinguir mayúsculas, compara versiones en minúsculas: `a.lower() < b.lower()`.",
   "Comparar una cadena con un número es donde al examen le gusta ponerte a prueba. Los operadores de igualdad siempre funcionan entre tipos: `'1' == 1` es simplemente False y `'1' != 1` es True, porque valores de tipos distintos no son iguales. Los operadores de orden no: `'1' < 1` lanza `TypeError: '<' not supported between instances of 'str' and 'int'`. Python 3 se niega a adivinar un orden con sentido entre tipos no relacionados. (Python 2 lo permitía con resultados arbitrarios, lo que ocultaba errores). El mismo error aparece cuando llamas a `sorted()` o `max()` sobre una lista que mezcla cadenas y números.",
   "En resumen: `+` y `*` construyen cadenas nuevas, las comparaciones son lexicográficas por punto de código y distinguen mayúsculas, `==` entre tipos es seguro pero da False, y `<` entre cadenas y números es un TypeError."
  ],
  terms: [
   ["Concatenation (concatenación)", "Unir cadenas una detrás de otra con +."],
   ["Replication (replicación)", "Repetir una cadena un número entero de veces con *."],
   ["Lexicographic order (orden lexicográfico)", "Comparar secuencias elemento por elemento; la primera diferencia decide el resultado."]
  ],
  example: "Un script lee números de versión de un archivo de texto y los ordena como cadenas, obteniendo 1, 10, 2, 3. Convertir cada valor con int() antes de ordenar da el resultado buscado: 1, 2, 3, 10.",
  tip: "'5' == 5 es False sin error, pero '5' < 5 lanza TypeError. En el orden de cadenas, las mayúsculas van antes que las minúsculas y '10' < '9'.",
  check: [
   ["¿Qué produce 'a' * -2?", "La cadena vacía ''; los conteos de replicación negativos se tratan como cero."],
   ["¿'Apple' < 'apple' es True o False, y por qué?", "True, porque 'A' (65) tiene un punto de código menor que 'a' (97)."],
   ["¿Qué pasa al evaluar 'abc' > 5?", "TypeError: no se admiten comparaciones de orden entre str e int."]
  ]
 },
 {
  t: "Character tests: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
  tt: "Pruebas de caracteres: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
  body: [
   "Las cadenas tienen una familia de métodos que empiezan por `is` y que comprueban qué tipo de caracteres contiene la cadena. Cada uno devuelve True o False y nunca modifica la cadena. Son ideales para validar la entrada antes de convertirla o guardarla. Comparten dos reglas que las preguntas del examen ponen a prueba: la comprobación se aplica a todos los caracteres de la cadena, y una cadena vacía devuelve False en todos ellos.",
   "`isdigit()` devuelve True si todos los caracteres son dígitos, así que `'2024'.isdigit()` es True, pero `'-5'.isdigit()` y `'3.14'.isdigit()` son False porque el signo menos y el punto no son dígitos. `isalpha()` es True si todos los caracteres son letras: `'Hello'.isalpha()` es True, mientras que `'Hello World'.isalpha()` es False por el espacio. `isalnum()` es True si todos los caracteres son letras o dígitos, así que `'abc123'.isalnum()` es True pero `'abc_123'.isalnum()` es False por el guion bajo. Estos métodos entienden Unicode, de modo que letras acentuadas como 'é' cuentan como alfabéticas.",
   "`isspace()` es True si todos los caracteres son espacios en blanco: espacios, tabulaciones `\\t` y saltos de línea `\\n` cuentan, así que `' \\t\\n'.isspace()` es True. Ten en cuenta que la cadena vacía no se considera espacio en blanco en esta prueba.",
   "`isupper()` e `islower()` solo miran los caracteres con caso (cased characters), es decir, letras que tienen forma mayúscula y minúscula. `isupper()` es True si hay al menos un carácter con caso y todos los caracteres con caso están en mayúscula; los dígitos, espacios y signos de puntuación se ignoran. Así, `'ABC 123!'.isupper()` es True, pero `'123'.isupper()` es False porque no hay ningún carácter con caso. `islower()` funciona igual para las minúsculas. Una cadena mixta como 'Hello' no es ninguna de las dos.",
   "```python\ntests = ['2024', '-5', 'abc', 'abc123', 'A B', '', 'HELLO 1', ' \\t']\nfor s in tests:\n    print(repr(s), s.isdigit(), s.isalpha(), s.isalnum(),\n          s.isspace(), s.isupper(), s.islower())\n```",
   "Ejecutar el bucle anterior en IDLE y predecir cada línea antes de mirarla es una práctica excelente para el examen. Un patrón práctico combina estos métodos con la iteración, por ejemplo para contar tipos de caracteres en una contraseña: `sum(c.isdigit() for c in pw)` cuenta los dígitos, porque True cuenta como 1 al sumar.",
   "No confundas estas pruebas con los métodos de conversión `upper()` y `lower()`, que devuelven cadenas nuevas. Ten en cuenta también que el hecho de que `'5'.isdigit()` sea True no garantiza que `int()` acepte todo lo que `isdigit()` acepta en cualquier sistema de escritura, ya que existen algunos caracteres de dígito Unicode especiales; para entradas ASCII normales coinciden."
  ],
  terms: [
   ["isdigit()", "True si la cadena no está vacía y todos sus caracteres son dígitos."],
   ["isalnum()", "True si la cadena no está vacía y todos sus caracteres son letras o dígitos."],
   ["isspace()", "True si la cadena no está vacía y todos sus caracteres son espacios en blanco."],
   ["Cased character (carácter con caso)", "Una letra con formas mayúscula y minúscula distintas; isupper() e islower() solo tienen en cuenta estos caracteres."]
  ],
  example: "Un formulario de registro acepta un nombre de usuario solo si username.isalnum() es True, rechazando espacios y símbolos, y pide al usuario que lo intente de nuevo cuando age.isdigit() es False, en lugar de fallar con int(age).",
  tip: "Todos los métodos is devuelven False para la cadena vacía. isdigit() rechaza '-' y '.', e isupper() necesita al menos una letra mayúscula y ninguna minúscula, ignorando dígitos y símbolos.",
  check: [
   ["¿Qué devuelve '3.5'.isdigit()?", "False, porque el punto no es un dígito."],
   ["¿Qué devuelve 'HELLO WORLD!'.isupper()?", "True: todos los caracteres con caso están en mayúscula, y el espacio y el ! se ignoran."]
  ]
 },
 {
  t: "Join(), split(), find(), rfind(), index(), and the difference between find and index",
  tt: "join(), split(), find(), rfind(), index() y la diferencia entre find e index",
  body: [
   "Estos métodos separan cadenas, las unen y buscan dentro de ellas. Están entre los más usados en código real y entre los más evaluados en PCAP.",
   "`split()` divide una cadena en una lista de subcadenas. Sin argumentos, divide por secuencias de espacios en blanco y descarta los espacios al principio y al final, así que `'  a  b\\tc '.split()` es `['a', 'b', 'c']`. Con un separador como argumento, divide exactamente por esa cadena y conserva los trozos vacíos: `'a,,b'.split(',')` es `['a', '', 'b']`. Un segundo argumento opcional limita el número de divisiones.",
   "`join()` es lo contrario, y su forma sorprende a los principiantes: se llama sobre el separador, y el argumento es un iterable de cadenas. `'-'.join(['2024', '09', '25'])` da '2024-09-25', y `''.join(list_of_chars)` une caracteres sin nada entre ellos. Cada elemento ya debe ser una cadena; `','.join([1, 2])` lanza TypeError, así que convierte primero, por ejemplo con `','.join(str(n) for n in nums)`.",
   "```python\nwords = 'the quick brown fox'.split()\nprint(words)                 # ['the', 'quick', 'brown', 'fox']\nprint(' '.join(reversed(words)))  # fox brown quick the\n\ns = 'banana'\nprint(s.find('an'))          # 1\nprint(s.rfind('an'))         # 3\nprint(s.find('x'))           # -1\n# s.index('x')               # ValueError: substring not found\n```",
   "`find(sub)` busca una subcadena y devuelve el índice más bajo donde empieza, o -1 si no aparece. `rfind(sub)` busca desde la derecha y devuelve el índice de inicio más alto, también -1 si no está. Ambos aceptan argumentos opcionales de inicio y fin para limitar la zona de búsqueda: `s.find('a', 2)` empieza en el índice 2. Buscar la cadena vacía devuelve la posición de inicio, así que `'abc'.find('')` es 0.",
   "`index(sub)` busca una subcadena exactamente igual que `find()`, devolviendo el índice más bajo, pero cuando la subcadena no está lanza ValueError en lugar de devolver -1. También existe `rindex()`, la contraparte de `rfind()`. Así que la diferencia entre find e index es solo el comportamiento ante el fallo. Usa `find()` cuando la ausencia sea normal y vayas a comprobar el -1; usa `index()` cuando la ausencia sería un error y quieras una excepción. Un error clásico con find es escribir `if s.find(x):`, que es False cuando x se encuentra en la posición 0 y True cuando falta (-1 es verdadero). Usa `if x in s:` para un simple sí o no.",
   "Las listas también tienen un método `index()`, que lanza ValueError cuando el elemento no está, pero las listas no tienen `find()`; solo las cadenas lo tienen."
  ],
  terms: [
   ["split()", "Devuelve una lista de subcadenas separadas por espacios en blanco o por un separador dado."],
   ["join()", "Se llama sobre una cadena separadora; concatena un iterable de cadenas con ese separador entre ellas."],
   ["find() / rfind()", "Devuelven el índice más bajo o más alto de una subcadena, o -1 si no está."],
   ["index()", "Como find(), pero lanza ValueError cuando la subcadena no está."]
  ],
  example: "Un analizador de logs divide cada línea con line.split(' ', 2) en fecha, nivel y mensaje, usa message.find('user=') para localizar un campo opcional sin riesgo de excepción, y reconstruye las líneas limpias con '\\t'.join(parts).",
  tip: "find devuelve -1 si falla; index lanza ValueError. Y join se llama sobre el separador: ', '.join(items), nunca items.join(', ').",
  check: [
   ["¿Qué es 'a b  c'.split(' ')?", "['a', 'b', '', 'c']: con un separador explícito, los espacios consecutivos producen una cadena vacía."],
   ["¿Qué devuelve 'hello'.rfind('l')?", "3, el índice de la última 'l'."],
   ["¿Por qué if s.find('a'): no es fiable?", "find devuelve 0 (falso) cuando 'a' está al principio y -1 (verdadero) cuando no está, así que la condición queda al revés en esos casos."]
  ]
 },
 {
  t: "Sorted() on strings versus list.sort()",
  tt: "sorted() sobre cadenas frente a list.sort()",
  body: [
   "Python te ofrece dos formas de ordenar, y se comportan de manera distinta en aspectos que el examen evalúa directamente. La función integrada `sorted()` acepta cualquier iterable, incluida una cadena, y devuelve una lista nueva con los elementos en orden. El método `list.sort()` solo existe en las listas, ordena esa lista en su lugar (in place) y devuelve None.",
   "Aplica `sorted()` a una cadena y obtendrás una lista de sus caracteres, no una cadena: `sorted('python')` es `['h', 'n', 'o', 'p', 't', 'y']`. Para convertirla de nuevo en cadena, únela: `''.join(sorted('python'))` da 'hnopty'. La cadena original no se toca, como debe ser, ya que las cadenas son inmutables. Por eso mismo las cadenas no tienen ningún método `sort()`; `'python'.sort()` lanza AttributeError.",
   "```python\nword = 'Banana'\nprint(sorted(word))                # ['B', 'a', 'a', 'a', 'n', 'n']\nprint(''.join(sorted(word)))       # Baaann\n\nnames = ['bob', 'Alice', 'carol']\nresult = names.sort()\nprint(result)                      # None\nprint(names)                       # ['Alice', 'bob', 'carol']\nprint(sorted(names, reverse=True)) # ['carol', 'bob', 'Alice']\n```",
   "El orden predeterminado de las cadenas es el orden de puntos de código, así que las mayúsculas van antes que las minúsculas: `sorted(['b', 'A', 'a', 'B'])` es `['A', 'B', 'a', 'b']`. Tanto `sorted()` como `list.sort()` aceptan los mismos dos argumentos por palabra clave para cambiar esto. `reverse=True` ordena de forma descendente. `key=` recibe una función que se aplica a cada elemento para producir el valor que se compara; `key=str.lower` ordena sin distinguir mayúsculas, y `key=len` ordena las cadenas por longitud. Los elementos que se comparan como iguales conservan su orden relativo original, porque el ordenamiento de Python es estable.",
   "La trampa más grande es la asignación. Como `list.sort()` devuelve None, escribir `names = names.sort()` destruye tus datos: `names` pasa a ser None. Y `print(names.sort())` imprime None aunque la lista sí se haya ordenado. Con `sorted()`, el error opuesto es llamarla sin guardar el resultado: `sorted(names)` sola en una línea no hace nada duradero.",
   "Elige según lo que necesites. Usa `list.sort()` cuando tengas una lista y ya no necesites el orden original; evita crear una copia. Usa `sorted()` para cualquier cosa que no sea una lista (cadenas, tuplas, claves de diccionario, generadores) o cuando quieras conservar el original sin cambios. Un uso práctico es comprobar anagramas: dos palabras son anagramas si `sorted(a) == sorted(b)`, ya que ambas producen listas de los mismos caracteres en el mismo orden."
  ],
  terms: [
   ["sorted()", "Función integrada que devuelve una lista nueva ordenada a partir de cualquier iterable."],
   ["list.sort()", "Método que ordena una lista en su lugar y devuelve None."],
   ["key function (función clave)", "Una función pasada como key= que calcula el valor usado en las comparaciones."],
   ["Stable sort (ordenamiento estable)", "Un ordenamiento que mantiene los elementos iguales en su orden relativo original."]
  ],
  example: "Un asistente para un juego de palabras comprueba si la respuesta de un jugador es un anagrama del objetivo con sorted(guess.lower()) == sorted(target.lower()), lo que funciona sin importar el orden de las letras ni las mayúsculas.",
  tip: "sorted('abc') devuelve una lista, no una cadena; únela para obtener una cadena. list.sort() devuelve None, así que nunca asignes ni imprimas su resultado esperando una lista.",
  check: [
   ["¿Cuál es el tipo de sorted('hello')?", "list, con los caracteres en orden: ['e', 'h', 'l', 'l', 'o']."],
   ["¿Qué vale x después de x = [3, 1, 2].sort()?", "None, porque sort() trabaja en su lugar y devuelve None."]
  ]
 },
 {
  t: "Core ideas: class, object, attribute, method, encapsulation, inheritance, superclass and subclass",
  tt: "Ideas clave: clase, objeto, atributo, método, encapsulación, herencia, superclase y subclase",
  body: [
   "La programación orientada a objetos (POO, en inglés OOP) es una forma de organizar un programa en torno a objetos: paquetes de datos junto con el código que trabaja sobre esos datos. En lugar de tener listas separadas de nombres, saldos y funciones que actualizan saldos, creas objetos cuenta que conocen cada uno su propio saldo y cómo cambiarlo. La POO es la sección más grande de PCAP, así que vale la pena dominar el vocabulario con precisión.",
   "Una clase (class) es un plano que describe qué contiene y qué puede hacer un tipo de objeto. Un objeto, también llamado instancia, es una cosa concreta construida a partir de ese plano. `class Dog:` define la clase; `rex = Dog()` crea un objeto, y puedes crear tantos objetos independientes de una misma clase como quieras. En Python, incluso los valores integrados son objetos: `5` es una instancia de la clase `int`, y `'hi'` es una instancia de `str`.",
   "Un atributo es un valor con nombre que pertenece a un objeto o a una clase, y se accede con un punto: `rex.name`. Un método es una función definida dentro de una clase que opera sobre sus objetos, y se llama con la misma sintaxis de punto: `rex.bark()`. Juntos, los atributos guardan el estado de un objeto y los métodos definen su comportamiento.",
   "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name          # atributo\n    def bark(self):               # método\n        return self.name + ' says woof'\n\nclass Puppy(Dog):                 # Puppy es una subclase de Dog\n    def bark(self):\n        return self.name + ' says yip'\n\nprint(Dog('Rex').bark())     # Rex says woof\nprint(Puppy('Bit').bark())   # Bit says yip\n```",
   "La encapsulación (encapsulation) significa mantener juntos los datos de un objeto y el código que los gestiona, y controlar el acceso para que el código externo use los métodos en lugar de meterse directamente en los datos. Eso permite a una clase hacer cumplir reglas, como rechazar un saldo negativo, y cambiar sus detalles internos sin romper el código que la usa. Python admite la encapsulación sobre todo por convención, con guiones bajos, además del name mangling para los nombres con doble guion bajo, como explica una lección posterior.",
   "La herencia (inheritance) permite definir una clase nueva a partir de una existente. La clase nueva es la subclase (también llamada clase hija o derivada); la clase existente es la superclase (clase padre o base). Una subclase tiene automáticamente todos los atributos y métodos de su superclase y puede añadir otros nuevos o sobrescribir los existentes con sus propias versiones, como `Puppy` sobrescribe `bark()` arriba. La herencia expresa una relación \"es un\" (is-a): un Puppy es un Dog. Toda clase en Python 3 hereda en última instancia de la clase integrada `object`, aunque no lo escribas.",
   "Un término más que usa el examen: una jerarquía de clases es el árbol formado por las clases y sus subclases. Cuanto más específica es una clase, más abajo se sitúa. Bajar por el árbol significa especialización; subir significa generalización."
  ],
  terms: [
   ["Class (clase)", "Un plano que define los atributos y métodos que tendrán sus objetos."],
   ["Object / instance (objeto / instancia)", "Un valor concreto creado a partir de una clase, con su propio estado."],
   ["Encapsulation (encapsulación)", "Agrupar los datos con los métodos que los gestionan y restringir el acceso directo a esos datos."],
   ["Superclass / subclass (superclase / subclase)", "Una clase padre y una clase que hereda de ella, especializándola o ampliándola."]
  ],
  example: "Una aplicación de dibujo define una superclase Shape con un atributo colour y un método area(), y luego las subclases Circle y Square, que sobrescriben area() cada una. La aplicación guarda una sola lista de figuras y pide a cada una su área sin importarle de qué tipo es.",
  tip: "Una clase es el plano; un objeto es una instancia construida a partir de ella. Las subclases heredan todo de las superclases y pueden sobrescribirlo, y toda clase hereda de object.",
  check: [
   ["En class Car(Vehicle):, ¿cuál es la superclase?", "Vehicle; Car es la subclase que hereda de ella."],
   ["¿Cuál es la diferencia entre un atributo y un método?", "Un atributo son datos guardados en un objeto o una clase; un método es una función definida en la clase que opera sobre sus objetos."]
  ]
 },
 {
  t: "Instance variables versus class variables: declaring, initializing and sharing",
  tt: "Variables de instancia frente a variables de clase: declaración, inicialización y uso compartido",
  body: [
   "Los objetos de Python pueden guardar datos en dos lugares, y la diferencia importa. Una variable de instancia pertenece a un objeto concreto. Normalmente se crea dentro de `__init__` asignando a `self.name`, y cada objeto tiene su propia copia independiente. Una variable de clase pertenece a la clase misma. Se crea con una asignación directamente en el cuerpo de la clase, fuera de cualquier método, y solo hay una copia, compartida por todas las instancias.",
   "```python\nclass Counter:\n    created = 0                 # variable de clase\n\n    def __init__(self, label):\n        self.label = label      # variable de instancia\n        Counter.created += 1\n\na = Counter('a')\nb = Counter('b')\nprint(a.label, b.label)          # a b\nprint(Counter.created, a.created, b.created)   # 2 2 2\n```",
   "Leer un nombre a través de una instancia, como `a.created`, busca primero en la instancia y, si el nombre no está ahí, en su clase (y luego en sus superclases). Por eso cualquier instancia puede leer la variable de clase compartida. Las variables de clase existen en cuanto se define la clase, antes de crear ningún objeto, así que `Counter.created` funciona incluso sin instancias.",
   "Escribir es distinto, y esta es la trampa clave del examen. Asignar a través de una instancia, `a.created = 100`, nunca cambia la variable de clase. Crea una nueva variable de instancia llamada `created` solo en `a`, que a partir de entonces oculta (shadowing) la variable de clase para `a`. `Counter.created` y `b.created` siguen mostrando el antiguo valor compartido. Para cambiar una variable de clase, asigna a través de la clase: `Counter.created += 1`, como hace el constructor de arriba. Dentro de los métodos, `self.created += 1` crearía en cambio una variable de instancia, lo cual es un error sutil.",
   "Las variables de instancia no tienen que crearse en `__init__`. Cualquier método, o incluso código fuera de la clase, puede añadir un atributo nuevo a un solo objeto con `obj.new_attr = value`, y por tanto objetos de la misma clase pueden acabar con conjuntos de atributos diferentes. Acceder a un atributo que un objeto no tiene (y que su clase no proporciona) lanza AttributeError. Puedes eliminar una variable de instancia con `del obj.attr`.",
   "Ten cuidado con las variables de clase mutables, como las listas. Si la clase define `items = []`, entonces `self.items.append(x)` no asigna nada; modifica la única lista compartida, así que todas las instancias ven el cambio. A veces es lo que se busca (un registro compartido), pero normalmente es un error; las listas propias de cada objeto van en `__init__` como `self.items = []`.",
   "Usa variables de clase para datos realmente comunes a todas las instancias, como constantes, contadores de objetos creados o configuraciones predeterminadas. Usa variables de instancia para todo lo que describe a un solo objeto."
  ],
  terms: [
   ["Instance variable (variable de instancia)", "Un atributo guardado en un solo objeto, normalmente asignado como self.name en __init__."],
   ["Class variable (variable de clase)", "Un atributo definido en el cuerpo de la clase y compartido por todas las instancias."],
   ["Shadowing (ocultamiento)", "Un atributo de instancia con el mismo nombre que oculta un atributo de clase cuando se accede a través de esa instancia."]
  ],
  example: "La clase Enemy de un juego tiene una variable de clase count para saber cuántos enemigos existen, y variables de instancia x, y y health para cada uno. Dañar a un enemigo cambia solo su propio health, mientras que Enemy.count sube cada vez que aparece uno nuevo.",
  tip: "obj.x = value siempre crea o actualiza una variable de instancia; nunca cambia la variable de clase. Cambia los datos compartidos a través del nombre de la clase.",
  check: [
   ["class A: n = 1. Después de a = A(); a.n = 5, ¿cuánto valen A.n y A().n?", "Ambos valen 1; a.n = 5 creó una variable de instancia solo en a."],
   ["¿Dónde busca Python cuando lees obj.attr?", "Primero en la instancia, luego en su clase y luego en las superclases; si no lo encuentra, AttributeError."]
  ]
 },
 {
  t: "The __dict__ attribute of objects and classes",
  tt: "El atributo __dict__ de objetos y clases",
  body: [
   "Python guarda los atributos de un objeto en un diccionario, y te permite verlo mediante el atributo especial `__dict__`. Para una instancia, `obj.__dict__` asocia los nombres de sus variables de instancia con sus valores. Para una clase, `ClassName.__dict__` contiene el contenido propio de la clase: variables de clase, métodos y algunas entradas especiales. Examinar estos diccionarios hace concreta la distinción entre instancia y clase, y las preguntas del examen a menudo te piden predecir qué imprime `__dict__`.",
   "```python\nclass Point:\n    dims = 2\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def move(self, dx):\n        self.x += dx\n\np = Point(1, 2)\nprint(p.__dict__)          # {'x': 1, 'y': 2}\nprint('dims' in p.__dict__)  # False\nprint('dims' in Point.__dict__, 'move' in Point.__dict__)  # True True\n```",
   "Fíjate en lo que el diccionario de la instancia no contiene. Las variables de clase como `dims` no se copian en cada instancia; se quedan en el diccionario de la clase, y las instancias las encuentran recurriendo a la clase durante la búsqueda. Los métodos también se guardan en la clase, no en la instancia. El `__dict__` de una instancia contiene solo los atributos asignados a ese objeto concreto, así que cambia cuando asignas atributos nuevos: después de `p.color = 'red'`, `p.__dict__` incluye 'color', y después de `p.dims = 3`, incluye una entrada `dims` que oculta la variable de clase.",
   "El `__dict__` de una clase incluye, además de tus propios nombres, entradas especiales como `'__module__'`, `'__init__'` (si está definido), `'__dict__'`, `'__weakref__'` y `'__doc__'`. No es un dict normal, sino una vista de solo lectura llamada mappingproxy, así que no puedes asignar directamente en ella; cambias los atributos de clase con una asignación normal como `Point.dims = 3`. El `__dict__` de una subclase contiene solo lo que la propia subclase define, no lo que hereda, lo cual es una forma práctica de ver qué métodos sobrescribe.",
   "Los atributos privados aparecen en `__dict__` con sus nombres transformados (mangled). Si `__init__` asigna `self.__secret = 1` en la clase `Vault`, el diccionario de la instancia muestra la clave `'_Vault__secret'`. La siguiente lección explica por qué.",
   "Para objetos simples puedes usar `__dict__` para introspección: imprimir todo el estado de un objeto al depurar, o copiar valores de forma genérica. La función integrada `vars(obj)` devuelve el mismo diccionario y es la forma más legible de escribirlo. En el código cotidiano rara vez modificas `__dict__` directamente, pero leerlo es una excelente herramienta de aprendizaje. No todos los objetos tienen uno: muchos tipos integrados, como `int`, guardan sus datos de otra forma, y `(5).__dict__` lanza AttributeError."
  ],
  terms: [
   ["__dict__", "El diccionario (o mapping proxy en el caso de las clases) que contiene los atributos propios de un objeto."],
   ["mappingproxy", "El tipo de mapeo de solo lectura que se usa para el __dict__ de una clase."],
   ["vars()", "Función integrada que devuelve el __dict__ de un objeto."]
  ],
  example: "Al depurar un objeto Customer, un desarrollador imprime vars(customer) y ve solo name y email. El atributo discount que faltaba resulta ser una variable de clase, que aparece solo en Customer.__dict__.",
  tip: "El __dict__ de una instancia contiene solo los atributos asignados a esa instancia. Las variables de clase y los métodos viven en el __dict__ de la clase, y los nombres heredados no aparecen en el __dict__ de una subclase.",
  check: [
   ["class A: v = 1; def __init__(self): self.w = 2. ¿Qué es A().__dict__?", "{'w': 2}; la variable de clase v no está en el diccionario de la instancia."],
   ["¿Dónde se guarda un método: en el __dict__ de la instancia o en el de la clase?", "En el __dict__ de la clase; las instancias lo encuentran a través de la clase."]
  ]
 },
{
  t: "Private attributes and name mangling (__name becomes _ClassName__name)",
  tt: "Atributos privados y name mangling (__name se convierte en _ClassName__name)",
  body: [
   "Python no tiene atributos estrictamente privados como otros lenguajes, pero tiene dos convenciones que apoyan la encapsulación. Un solo guion bajo al principio, como `self._balance`, significa interno: por favor, no lo uses desde fuera. Nada lo impone. Un doble guion bajo al principio, como `self.__balance`, sin doble guion bajo al final, activa un mecanismo llamado name mangling (transformación de nombres), que el examen PCAP evalúa a fondo.",
   "El name mangling actúa en tiempo de compilación dentro del cuerpo de una clase. Cualquier identificador de la forma `__name` escrito dentro de `class Account:` se reescribe automáticamente como `_Account__name`: un guion bajo, el nombre de la clase y luego el nombre original. Dentro de los propios métodos de la clase sigues escribiendo `self.__balance` y funciona, porque esas referencias también se reescriben. Fuera de la clase, `acct.__balance` no se reescribe, así que busca un atributo llamado literalmente `__balance`, que no existe, y lanza AttributeError.",
   "```python\nclass Account:\n    def __init__(self, amount):\n        self.__balance = amount\n    def balance(self):\n        return self.__balance\n\na = Account(100)\nprint(a.balance())             # 100\n# print(a.__balance)           # AttributeError\nprint(a._Account__balance)     # 100 - el nombre transformado\nprint(a.__dict__)              # {'_Account__balance': 100}\n```",
   "Como muestran las dos últimas líneas, los datos siguen siendo accesibles si conoces el nombre transformado, y `__dict__` lo revela. Así que el mangling no es seguridad; es protección contra accidentes. Su propósito principal es evitar choques de nombres en la herencia: si una superclase y una subclase usan ambas `__data`, obtienen `_Parent__data` y `_Child__data`, dos atributos distintos, de modo que la subclase no puede sobrescribir por accidente el estado interno de la clase padre.",
   "La misma regla se aplica a métodos y variables de clase: un método llamado `__helper` dentro de la clase `Tool` se convierte en `_Tool__helper`. Los nombres que empiezan y terminan con dos guiones bajos, como `__init__` o `__str__`, son métodos especiales y no se transforman. Los nombres con un solo guion bajo al principio nunca se transforman.",
   "Una consecuencia que conviene notar: asignar `a.__balance = 5` desde fuera de la clase no cambia el valor privado. Como ese código no está dentro del cuerpo de la clase, no hay mangling, y Python simplemente crea un atributo de instancia nuevo y sin relación, llamado literalmente `__balance`. Después, `a.balance()` sigue devolviendo 100. Las preguntas del examen usan exactamente esto para comprobar si entiendes que el mangling depende de dónde está escrito el código."
  ],
  terms: [
   ["Private attribute (atributo privado)", "Un atributo cuyo nombre empieza con dos guiones bajos (y no termina con dos), sujeto a name mangling."],
   ["Name mangling (transformación de nombres)", "Reescribir __name dentro de una clase como _ClassName__name para evitar choques."],
   ["Single-underscore convention (convención de un guion bajo)", "Un _ al principio marca un nombre como interno, pero no se hace cumplir de ninguna forma."]
  ],
  example: "La clase Connection de una biblioteca guarda self.__socket. Una subclase del usuario también define self.__socket con otro propósito y, gracias al mangling, los dos se convierten en _Connection__socket y _MyConn__socket, así que ninguno rompe al otro.",
  tip: "Dentro de la clase C, __x se convierte en _C__x. Fuera de la clase, obj.__x no se transforma y falla (o crea un atributo aparte si se le asigna algo). Los nombres dunder como __init__ nunca se transforman.",
  check: [
   ["En la clase Box se asigna self.__size = 3. ¿Qué clave aparece en el __dict__ de la instancia?", "'_Box__size'."],
   ["¿Se transforma __str__?", "No. Los nombres que terminan con dos guiones bajos no se transforman."]
  ]
 },
 {
  t: "Methods and the self parameter; constructors (__init__) with default arguments",
  tt: "Métodos y el parámetro self; constructores (__init__) con argumentos predeterminados",
  body: [
   "Un método es una función definida dentro de una clase. Su primer parámetro recibe el objeto sobre el que se llamó el método y, por una convención muy firme, se llama `self`. Cuando escribes `obj.method(5)`, Python lo traduce a `ClassName.method(obj, 5)`, pasando el objeto automáticamente como primer argumento. Nunca pasas `self` tú mismo en una llamada normal, pero siempre debes incluirlo en la definición del método.",
   "Olvidar `self` en la definición es un error clásico. Si escribes `def greet():` dentro de una clase y llamas a `obj.greet()`, Python igualmente pasa el objeto, así que la llamada falla con un TypeError que dice que el método recibe 0 argumentos posicionales pero se le dio 1. Dentro de un método, `self` es la forma de llegar a los atributos y otros métodos del objeto: `self.name`, `self.helper()`. Un `name` a secas se referiría a una variable local o global.",
   "El método especial `__init__` es el constructor (más exactamente, el inicializador). Python lo llama automáticamente justo después de crear un objeto nuevo cuando llamas a la clase, así que `Dog('Rex', 3)` ejecuta `__init__(new_dog, 'Rex', 3)`. Su trabajo es preparar las variables de instancia del objeto. No debe devolver ningún valor distinto de None; devolver cualquier otra cosa lanza TypeError.",
   "```python\nclass Timer:\n    def __init__(self, minutes=5, label='timer'):\n        self.minutes = minutes\n        self.label = label\n    def describe(self):\n        return f'{self.label}: {self.minutes} min'\n\nprint(Timer().describe())            # timer: 5 min\nprint(Timer(10).describe())          # timer: 10 min\nprint(Timer(label='tea').describe()) # tea: 5 min\n```",
   "Los valores predeterminados de los parámetros en `__init__` permiten a quien llama omitir argumentos, igual que en las funciones normales. Los parámetros con valor predeterminado deben ir después de los que no lo tienen. Los argumentos por palabra clave permiten saltarse valores predeterminados anteriores, como hace `Timer(label='tea')`. Evita los valores predeterminados mutables como `items=[]`: la lista predeterminada se crea una sola vez, cuando se define la función, y la compartirían todos los objetos creados sin ese argumento. Usa `items=None` y crea una lista nueva dentro.",
   "Python no admite varios constructores mediante sobrecarga. Si el cuerpo de una clase define `__init__` dos veces, la segunda definición simplemente reemplaza a la primera, igual que ocurre al reasignar una variable. Los argumentos predeterminados son la forma de Python de ofrecer una construcción flexible. Si una clase no define ningún `__init__`, hereda uno, en última instancia de `object`, que no acepta argumentos adicionales; llamar a esa clase con argumentos lanza TypeError.",
   "Los métodos pueden llamarse entre sí a través de `self`, pueden tener sus propios valores predeterminados y pueden devolver valores como cualquier función. También puedes llamar a un método a través de la clase y pasar la instancia explícitamente, `Timer.describe(t)`, lo que muestra con claridad qué es realmente `self`."
  ],
  terms: [
   ["self", "El nombre convencional del primer parámetro de un método, que recibe la instancia."],
   ["__init__", "El inicializador que se ejecuta automáticamente al crear un objeto y asigna sus atributos."],
   ["Default argument (argumento predeterminado)", "Un valor de parámetro que se usa cuando quien llama no proporciona uno."]
  ],
  example: "Una clase Rectangle define __init__(self, width=1, height=1). El código que construye cuadrados unitarios escribe Rectangle(), mientras que un motor de diseño escribe Rectangle(height=4) para usar el ancho predeterminado y fijar solo la altura.",
  tip: "Todo método de instancia necesita self como primer parámetro, y obj.m(a) pasa obj automáticamente. Una segunda definición de __init__ reemplaza a la primera; Python no tiene sobrecarga de constructores.",
  check: [
   ["class A: def f(): return 1. ¿Qué pasa con A().f()?", "TypeError: f() takes 0 positional arguments but 1 was given, porque la instancia se pasa automáticamente."],
   ["¿A qué se traduce obj.method(3)?", "type(obj).method(obj, 3), con obj enlazado a self."]
  ]
 },
 {
  t: "Introspection: hasattr(), type(), __name__, __module__, __bases__, __class__",
  tt: "Introspección: hasattr(), type(), __name__, __module__, __bases__, __class__",
  body: [
   "La introspección significa que un programa examina sus propios objetos en tiempo de ejecución: de qué tipo es algo, qué atributos tiene, de dónde viene su clase. Python lo hace fácil, y el examen evalúa un conjunto concreto de herramientas. (Modificar objetos en tiempo de ejecución se llama reflexión; Python también la admite, mediante funciones como `setattr()`).",
   "`hasattr(obj, 'name')` devuelve True si el objeto tiene un atributo con ese nombre, ya sea en la instancia o a través de su clase y superclases, y False en caso contrario. El nombre debe pasarse como cadena. Es una forma segura de comprobar antes de acceder a algo que podría faltar. Sus compañeras son `getattr(obj, 'name', default)`, para leer un atributo por su nombre, y `setattr(obj, 'name', value)`, para asignarlo.",
   "`type(obj)` devuelve la clase del objeto. `type(5)` es `int`, y para tus propios objetos es la clase a partir de la cual los creaste. Todo objeto tiene además un atributo `__class__` que se refiere a la misma clase, así que `obj.__class__ is type(obj)` es True.",
   "Las clases llevan información sobre sí mismas en atributos especiales. `__name__` es el nombre de la clase como cadena: `Dog.__name__` es 'Dog'. Las instancias no tienen su propio `__name__`, así que para un objeto escribes `type(obj).__name__` u `obj.__class__.__name__`; `obj.__name__` lanza AttributeError. `__module__` es una cadena con el nombre del módulo donde se definió la clase: `'__main__'` para clases definidas en el script que ejecutaste, o el nombre del módulo, como 'shapes', para una importada. Las instancias pueden leer `__module__` a través de su clase.",
   "`__bases__` es una tupla con las superclases directas de una clase, en el orden en que se listaron. Para `class C(A, B):`, `C.__bases__` es `(A, B)`. Una clase sin padre explícito tiene `(object,)`. Solo está disponible en las clases, no en las instancias. Muestra solo los padres directos; para toda la ascendencia, incluidos los indirectos, usa `__mro__`.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(type(d).__name__)          # Dog\nprint(d.__class__.__name__)      # Dog\nprint(Dog.__module__)            # __main__\nprint(Dog.__bases__)             # (<class '__main__.Animal'>,)\nprint([c.__name__ for c in Dog.__bases__])  # ['Animal']\nprint(hasattr(d, 'speak'))       # False\n```",
   "Estas herramientas permiten que el código genérico se adapte a los objetos que recibe, por ejemplo imprimiendo el nombre de la clase de cualquier objeto en un log, o recorriendo una jerarquía con un bucle que sigue `__bases__` hacia arriba. El laboratorio de PCAP de esta sección te pide escribir una función así, lo cual es una preparación excelente para las preguntas que imprimen estos atributos."
  ],
  terms: [
   ["Introspection (introspección)", "Examinar el tipo y los atributos de un objeto en tiempo de ejecución."],
   ["hasattr()", "Devuelve True si un objeto tiene, o puede alcanzar, un atributo con el nombre dado como cadena."],
   ["__bases__", "Una tupla con las superclases directas de una clase; solo disponible en las clases."],
   ["__module__", "El nombre del módulo en el que se definió una clase."]
  ],
  example: "Un cargador de plugins recibe objetos desconocidos, comprueba hasattr(plugin, 'run') antes de llamarlo, y registra plugin.__class__.__name__ y plugin.__class__.__module__ para que los errores indiquen exactamente qué clase y qué archivo fallaron.",
  tip: "__name__ y __bases__ pertenecen a las clases; en una instancia, pasa primero por type(obj) u obj.__class__. __bases__ lista solo los padres directos, como una tupla.",
  check: [
   ["¿Qué muestra print(Dog.__bases__) para class Dog: pass?", "(<class 'object'>,), una tupla de un elemento que contiene object."],
   ["¿Por qué obj.__name__ suele fallar para una instancia?", "Las instancias no tienen __name__; la clase sí, así que usa type(obj).__name__."]
  ]
 },
 {
  t: "Single and multiple inheritance, method overriding and super()",
  tt: "Herencia simple y múltiple, sobrescritura de métodos y super()",
  body: [
   "La herencia permite que una clase reutilice y amplíe otra. Con la herencia simple, una clase tiene una sola superclase directa: `class Car(Vehicle):`. La subclase obtiene todos los atributos y métodos de `Vehicle`, y todo lo que define ella misma se añade. Cuando llamas a un método sobre un `Car`, Python busca primero en `Car`, luego en `Vehicle`, después en las superclases de `Vehicle`, y finalmente llega a `object`.",
   "La sobrescritura de métodos (method overriding) ocurre cuando una subclase define un método con el mismo nombre que uno de su superclase. La versión de la subclase gana para los objetos de la subclase, porque la búsqueda la encuentra primero. Python empareja los métodos solo por nombre, no por lista de parámetros, así que un método que sobrescribe puede incluso recibir parámetros distintos, aunque mantenerlos compatibles es un buen diseño.",
   "A menudo quieres ampliar el comportamiento de la superclase en lugar de reemplazarlo por completo. `super()` da acceso a la versión de la superclase. El caso más común es el constructor: el `__init__` de una subclase llama a `super().__init__(...)` para que la superclase prepare sus propios atributos, y luego añade más. Si una subclase define `__init__` y olvida llamar al del padre, los atributos del padre nunca se crean, lo que más adelante provoca AttributeError.",
   "```python\nclass Vehicle:\n    def __init__(self, wheels):\n        self.wheels = wheels\n    def describe(self):\n        return f'{self.wheels} wheels'\n\nclass Car(Vehicle):\n    def __init__(self, brand):\n        super().__init__(4)\n        self.brand = brand\n    def describe(self):\n        return self.brand + ', ' + super().describe()\n\nprint(Car('Volvo').describe())   # Volvo, 4 wheels\n```",
   "Fíjate en que `super()` no recibe argumentos dentro de un método en Python 3 y no pasas `self` al método que llamas a través de él: `super().__init__(4)`, no `super().__init__(self, 4)`. La alternativa es llamar a la superclase por su nombre, `Vehicle.__init__(self, 4)`, y en ese caso debes pasar `self` explícitamente. Ambas formas aparecen en el examen.",
   "Con la herencia múltiple, una clase lista varias superclases: `class FlyingCar(Car, Aircraft):`. Hereda de todas ellas. Si más de un padre define el mismo método, Python usa el primero que encuentra al buscar en las clases siguiendo un orden definido, en líneas generales de izquierda a derecha según se listaron, y cada clase antes que sus propios padres. Ese orden es el orden de resolución de métodos (method resolution order), el tema de la siguiente lección. `super()` sigue ese mismo orden, lo que permite que clases cooperativas llamen cada una a `super()` y que el método de cada clase se ejecute una sola vez.",
   "La herencia múltiple es potente, pero puede hacer que el código sea difícil de seguir. Un uso común y limpio es el mixin: una clase pequeña que añade una sola capacidad, como `JsonMixin`, que aporta un método `to_json()`, combinada con una clase principal. Los métodos se encuentran por nombre, así que un método definido en una subclase también puede llamarse desde el código de la superclase a través de `self`, que es como las superclases ofrecen plantillas que las subclases completan."
  ],
  terms: [
   ["Single inheritance (herencia simple)", "Una clase con exactamente una superclase directa."],
   ["Multiple inheritance (herencia múltiple)", "Una clase que lista dos o más superclases directas."],
   ["Overriding (sobrescritura)", "Definir en una subclase un método con el mismo nombre que uno de una superclase, reemplazándolo para la subclase."],
   ["super()", "Devuelve un proxy que encuentra la versión de un método de la siguiente clase en el orden de resolución de métodos."]
  ],
  example: "Una clase LoggedList hereda de list y sobrescribe append() para imprimir un mensaje y luego llamar a super().append(item), así que se comporta exactamente como una lista mientras registra cada elemento añadido.",
  tip: "super().method(args) no recibe self; ClassName.method(self, args) sí. Si una subclase sobrescribe __init__ sin llamar a super().__init__(), faltarán los atributos del padre.",
  check: [
   ["class A: def hi(self): return 'A'; class B(A): def hi(self): return 'B' + super().hi(). ¿Qué devuelve B().hi()?", "'BA': se ejecuta el método de B, que llama al de A mediante super()."],
   ["Si class C(A, B) y tanto A como B definen m(), ¿cuál usa C().m() cuando C no define m?", "La versión de A, porque A aparece primero y se busca antes que B."]
  ]
 },
{
  t: "Method resolution order (MRO), diamonds and inconsistent hierarchies",
  tt: "Orden de resolución de métodos (MRO), diamantes y jerarquías inconsistentes",
  body: [
   "Cuando accedes a un atributo de un objeto, Python busca en una lista de clases en un orden fijo y usa la primera coincidencia. Esa lista es el orden de resolución de métodos (method resolution order, MRO). Con herencia simple es sencillo: la clase, su padre, el abuelo, hasta llegar a `object`. Con herencia múltiple, Python lo calcula con un algoritmo llamado linealización C3, y el examen espera que sepas predecir el resultado para jerarquías pequeñas.",
   "Puedes ver el MRO de cualquier clase con `ClassName.__mro__` (una tupla) o `ClassName.mro()` (una lista). Las reglas que sigue C3 se resumen en dos restricciones: una clase siempre va antes que sus propios padres, y los padres mantienen el orden de izquierda a derecha en que se listaron en la sentencia class. La búsqueda sigue un único orden coherente en lugar de saltar de un lado a otro, y cada clase aparece exactamente una vez.",
   "El caso de prueba clásico es el diamante: `B` y `C` heredan ambas de `A`, y `D` hereda tanto de `B` como de `C`. Si lo dibujas, las líneas de herencia forman un rombo. El MRO de `D` es D, B, C, A, object. Fíjate en que `A` va después de `B` y de `C`, no inmediatamente después de `B`. Eso garantiza que un método sobrescrito en `C` se encuentre antes que la versión de `A`, y que `A` se visite una sola vez.",
   "```python\nclass A:\n    def who(self): return 'A'\nclass B(A):\n    pass\nclass C(A):\n    def who(self): return 'C'\nclass D(B, C):\n    pass\n\nprint(D().who())                          # C\nprint([k.__name__ for k in D.__mro__])    # ['D', 'B', 'C', 'A', 'object']\n```",
   "`D().who()` devuelve 'C'. Una búsqueda ingenua en profundidad que fuera D, B, A habría encontrado primero la versión de `A`, pero el MRO coloca a `C` antes que a `A`. Invertir el orden de las bases, `class D(C, B)`, cambia el MRO a D, C, B, A, object.",
   "Algunas jerarquías no tienen ningún orden que cumpla ambas restricciones, y Python se niega a crearlas. Por ejemplo, con `class Top:`, `class Middle(Top):` y luego `class Bottom(Top, Middle):`, la lista de bases dice que Top debe ir antes que Middle, pero Middle es subclase de Top, así que Middle debe ir antes que Top. Las dos reglas chocan, y la propia sentencia class lanza `TypeError: Cannot create a consistent method resolution order (MRO)`. El error ocurre cuando se define la clase, no cuando se llama a un método. Listar primero la clase más específica, `class Bottom(Middle, Top):`, es válido.",
   "El MRO también determina el comportamiento de `super()`. Dentro de un método, `super()` significa la siguiente clase después de la actual en el MRO de la clase real del objeto, que puede ser una clase hermana en lugar de un padre. Eso es lo que permite la herencia múltiple cooperativa, en la que cada clase llama a `super()` y cada clase del diamante se ejecuta exactamente una vez."
  ],
  terms: [
   ["MRO", "Method resolution order (orden de resolución de métodos): la lista ordenada de clases en la que se buscan los atributos."],
   ["Diamond problem (problema del diamante)", "Una jerarquía en la que dos padres comparten un ancestro común, lo que plantea la cuestión del orden de búsqueda."],
   ["C3 linearization (linealización C3)", "El algoritmo que usa Python para calcular un MRO coherente."],
   ["__mro__", "Un atributo de clase que contiene su MRO como una tupla de clases."]
  ],
  example: "La clase Button de un toolkit de interfaz gráfica hereda de Clickable y Drawable, que a su vez heredan de Widget. Imprimir Button.__mro__ muestra Button, Clickable, Drawable, Widget, object, lo que confirma que el método de configuración de Widget se ejecuta al final y una sola vez.",
  tip: "En un diamante, el ancestro compartido va después de todas sus subclases en el MRO. Listar una superclase antes que una de sus propias subclases en las bases lanza TypeError al definir la clase.",
  check: [
   ["Para class D(B, C), donde B y C heredan ambas de A, ¿cuál es el MRO?", "D, B, C, A, object."],
   ["¿Cuándo se lanza el TypeError de MRO inconsistente?", "Al definir la clase, cuando Python evalúa la sentencia class con las bases en conflicto."]
  ]
 },
 {
  t: "Isinstance(), issubclass(), and the is / is not operators versus ==",
  tt: "isinstance(), issubclass() y los operadores is / is not frente a ==",
  body: [
   "Estas herramientas responden a preguntas distintas: qué tipo de cosa es este objeto, cómo se relacionan estas clases, y si estos dos nombres se refieren al mismo objeto o solo a valores iguales. Confundirlas es una fuente habitual de respuestas equivocadas en el examen.",
   "`isinstance(obj, Class)` devuelve True si el objeto es una instancia de esa clase o de cualquiera de sus subclases. Así, con `class Dog(Animal):` y `d = Dog()`, tanto `isinstance(d, Dog)` como `isinstance(d, Animal)` son True, y también `isinstance(d, object)`, ya que todo es un objeto. El segundo argumento puede ser una tupla de clases, y el resultado es True si alguna coincide: `isinstance(x, (int, float))`. Prefiere `isinstance` a comprobaciones como `type(x) == Dog`, porque comparar los tipos exactos ignora la herencia.",
   "`issubclass(Sub, Super)` compara dos clases en lugar de un objeto. Devuelve True si `Sub` es `Super` o hereda de ella directa o indirectamente. Una clase cuenta como subclase de sí misma, así que `issubclass(Dog, Dog)` es True. Pasar una instancia en lugar de una clase lanza TypeError. También funciona con los tipos integrados: `issubclass(bool, int)` es True y `issubclass(KeyError, LookupError)` es True.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(isinstance(d, Animal), issubclass(Dog, Animal))  # True True\nprint(issubclass(Animal, Dog))                          # False\n\na = [1, 2]\nb = [1, 2]\nc = a\nprint(a == b, a is b, a is c)   # True False True\n```",
   "El operador `is` comprueba identidad: si dos expresiones se refieren exactamente al mismo objeto en memoria. `==` comprueba igualdad: si dos objetos tienen valores iguales, según lo defina el tipo (llamando a `__eq__`). En el ejemplo, `a` y `b` son dos listas distintas con el mismo contenido, así que `a == b` es True pero `a is b` es False. `c = a` no copia; hace que `c` sea otro nombre para la misma lista, así que `a is c` es True, y `c.append(3)` cambia también lo que muestra `a`. `is not` es simplemente la negación de `is`.",
   "Para objetos de tus propias clases sin un `__eq__` personalizado, `==` recurre a la identidad, así que dos instancias distintas con atributos idénticos no son iguales a menos que definas `__eq__`. Para comparar con None, usa siempre `is None` o `is not None`, porque existe exactamente un objeto None.",
   "Evita usar `is` para comparar números o cadenas. Python puede reutilizar objetos para enteros pequeños o cadenas cortas como optimización, así que `is` a veces parece funcionar, pero es un detalle de implementación y puede dar resultados distintos en situaciones distintas. Usa `==` para valores e `is` para identidad, y el comportamiento siempre será predecible."
  ],
  terms: [
   ["isinstance()", "Devuelve True si un objeto es instancia de una clase o de cualquiera de sus subclases."],
   ["issubclass()", "Devuelve True si una clase es la misma que otra o deriva de ella."],
   ["Identity / is (identidad)", "Si dos referencias apuntan al mismo objeto."],
   ["Equality / == (igualdad)", "Si dos objetos tienen valores iguales según su tipo."]
  ],
  example: "Una función que acepta números comprueba isinstance(value, (int, float)) para que funcione con subclases como bool, y una búsqueda en caché usa if result is None para detectar un fallo sin confundirlo con una lista vacía, que es falsa pero no es None.",
  tip: "issubclass(C, C) es True. isinstance también coincide con las superclases. a == b compara valores; a is b compara identidad, y asignar b = a no crea ninguna copia.",
  check: [
   ["Para class B(A), ¿qué devuelve isinstance(A(), B)?", "False: un objeto A no es instancia de la subclase B."],
   ["x = [1]; y = x[:]. ¿Qué valen x == y y x is y?", "True y False: el slice creó una lista nueva con el mismo contenido."]
  ]
 },
 {
  t: "Polymorphism and the __str__() method",
  tt: "Polimorfismo y el método __str__()",
  body: [
   "Polimorfismo significa una interfaz, muchas formas: la misma llamada a un método puede hacer cosas distintas según el objeto sobre el que se llama. Si `Circle`, `Square` y `Triangle` definen cada una `area()`, entonces un bucle que llama a `shape.area()` funciona con todas, y cada objeto ejecuta su propia versión. El código que llama no necesita sentencias `if` que comprueben el tipo; el propio objeto sabe cómo responder.",
   "En Python esto surge de forma natural de la sobrescritura de métodos y de la búsqueda dinámica. Cuando se llama a un método, Python lo busca en ese momento en la clase real del objeto, así que un método de la superclase que llama a `self.something()` ejecutará la versión de `something` de la subclase si el objeto es una instancia de la subclase. Esto permite que una superclase defina los pasos generales de un algoritmo mientras las subclases aportan los detalles.",
   "```python\nclass Shape:\n    def area(self):\n        return 0\n    def report(self):\n        return type(self).__name__ + ' area ' + str(self.area())\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s * self.s\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return round(3.14159 * self.r ** 2, 1)\n\nfor sh in (Square(2), Circle(1)):\n    print(sh.report())   # Square area 4, luego Circle area 3.1\n```",
   "Python va más allá del polimorfismo basado en la herencia. Como la búsqueda se hace por nombre en tiempo de ejecución, cualquier objeto con el método adecuado funciona, compartan o no una superclase. Esto se llama duck typing (tipado de pato): si camina como un pato y hace cuac como un pato, trátalo como un pato. La función integrada `len()` funciona con cadenas, listas y tus propias clases que definan `__len__`, todo gracias a la misma idea.",
   "El método `__str__()` es un punto de enganche polimórfico que tiene todo objeto. `print(obj)` y `str(obj)` lo llaman para obtener una cadena legible para las personas. La versión predeterminada heredada de `object` produce algo como `<__main__.Point object at 0x7f...>`, que rara vez es útil. Sobrescribirlo da a tus objetos una forma impresa con significado. Debe devolver una cadena; devolver cualquier otra cosa provoca un TypeError al imprimir.",
   "```python\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\np = Point(1, 2)\nprint(p)            # (1, 2)\nprint('P=' + str(p))  # P=(1, 2)\n```",
   "Un método relacionado, `__repr__()`, proporciona la representación orientada a desarrolladores que se muestra en el intérprete interactivo y dentro de contenedores: imprimir una lista de puntos usa el `__repr__` de cada elemento, no `__str__`. Si una clase define solo `__repr__`, `str()` recurre a él. Para PCAP, céntrate en `__str__`: debes saber que `print` lo llama, que se hereda y se puede sobrescribir como cualquier método, y que debe devolver una cadena."
  ],
  terms: [
   ["Polymorphism (polimorfismo)", "La capacidad de clases distintas de responder a la misma llamada de método cada una a su manera."],
   ["Duck typing (tipado de pato)", "Usar cualquier objeto que proporcione los métodos necesarios, sin importar su clase."],
   ["__str__()", "Método especial que devuelve la forma legible de un objeto como cadena; lo usan print() y str()."]
  ],
  example: "Un programa de nómina guarda objetos de empleados Salaried y Hourly en una sola lista y llama a emp.pay() en cada uno. Añadir más adelante una clase Contractor no requiere cambiar el bucle de nómina, solo un nuevo método pay().",
  tip: "print(obj) llama a obj.__str__(); sin sobrescribirlo obtienes el texto predeterminado <... object at 0x...>. Las llamadas polimórficas ejecutan el método de la clase real del objeto, incluso cuando se hacen desde código de la superclase.",
  check: [
   ["¿Qué debe devolver __str__?", "Una cadena; devolver otro tipo hace que print() o str() lancen TypeError."],
   ["Un método de la superclase llama a self.area(); el objeto es un Square que sobrescribe area(). ¿Qué area() se ejecuta?", "La de Square, porque la búsqueda empieza en la clase real del objeto."]
  ]
 },
 {
  t: "List comprehensions, including if filters and nested loops",
  tt: "Comprensiones de listas, incluidos filtros if y bucles anidados",
  body: [
   "Una comprensión de lista (list comprehension) construye una lista nueva a partir de un iterable en una sola expresión. En lugar de crear una lista vacía y añadir elementos dentro de un bucle `for`, escribes todo entre corchetes: `[expression for item in iterable]`. `[x * x for x in range(5)]` produce `[0, 1, 4, 9, 16]`. Las comprensiones son más cortas que la versión con bucle, normalmente un poco más rápidas, y muy comunes en el código del examen.",
   "Lee una comprensión empezando por el `for`: para cada `x` en `range(5)`, evalúa `x * x` y recoge el resultado. En Python 3, la variable del bucle es local a la comprensión, así que no se escapa: después de la comprensión, `x` no está definida (a menos que existiera antes, en cuyo caso no se modifica).",
   "Una cláusula `if` al final filtra elementos: solo se incluyen aquellos para los que la condición es verdadera. `[w for w in words if len(w) > 3]` conserva las palabras largas. No lo confundas con una expresión condicional al principio, que transforma cada elemento en lugar de descartar algunos: `['even' if n % 2 == 0 else 'odd' for n in nums]` produce una entrada por cada número. Un `if` de filtro no lleva `else`; una expresión condicional debe llevarlo.",
   "```python\nnums = [1, 2, 3, 4, 5, 6]\nprint([n for n in nums if n % 2 == 0])      # [2, 4, 6]\nprint([n * 10 if n > 3 else n for n in nums])  # [1, 2, 3, 40, 50, 60]\nprint([(x, y) for x in 'ab' for y in (1, 2)])\n# [('a', 1), ('a', 2), ('b', 1), ('b', 2)]\nprint([[r * c for c in range(1, 4)] for r in range(1, 4)])\n# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]\n```",
   "Varias cláusulas `for` crean bucles anidados, y se ejecutan en el orden en que están escritas, de izquierda a derecha, exactamente como si hubieras escrito los bucles uno dentro del otro. En `[(x, y) for x in 'ab' for y in (1, 2)]`, el primer `for` es el bucle exterior y el segundo es el que cambia más rápido. La lista resultante es plana. Compáralo con una comprensión dentro de otra comprensión, como en el último ejemplo, que produce una lista de listas: la comprensión interior construye cada fila. Esa forma es como se crea una cuadrícula bidimensional; escribir en su lugar `[[0] * 3] * 3` crearía tres referencias a la misma lista interior, así que cambiar una fila las cambiaría todas.",
   "Puedes combinar varias cláusulas `for` e `if`: `[(x, y) for x in range(3) for y in range(3) if x != y]`. Cada `if` se aplica a los bucles escritos antes que él. Mantén las comprensiones legibles; cuando una necesita más de dos cláusulas, un bucle normal suele ser más claro.",
   "La misma sintaxis con otros delimitadores construye otros tipos: las llaves dan una comprensión de conjunto o, con `key: value`, una comprensión de diccionario, y los paréntesis dan una expresión generadora, que produce los valores de forma perezosa en lugar de construir una lista, como explica la lección de generadores."
  ],
  terms: [
   ["List comprehension (comprensión de lista)", "Una expresión entre corchetes que construye una lista recorriendo un iterable."],
   ["Filter clause (cláusula de filtro)", "Un if al final de una comprensión que incluye solo los elementos que cumplen una condición."],
   ["Conditional expression (expresión condicional)", "A if condition else B, que elige un valor para cada elemento."],
   ["Nested comprehension (comprensión anidada)", "Una comprensión dentro de otra, usada para construir listas de listas."]
  ],
  example: "Una profesora convierte una lista de puntuaciones en calificaciones con ['pass' if s >= 50 else 'fail' for s in scores] y luego reúne solo las notas más altas con [s for s in scores if s >= 90].",
  tip: "Con varias cláusulas for, el bucle de más a la izquierda es el exterior. Un if al final filtra (no admite else); un if ... else al principio transforma cada elemento.",
  check: [
   ["¿Qué es [c for c in 'hello' if c not in 'lo']?", "['h', 'e']."],
   ["¿Qué produce [i * j for i in range(2) for j in range(3)]?", "[0, 0, 0, 0, 1, 2]: i = 0 da tres ceros, y luego i = 1 da 0, 1, 2."]
  ]
 },
{
  t: "Lambda functions and functions that take a lambda as an argument",
  tt: "Funciones lambda y funciones que reciben una lambda como argumento",
  body: [
   "Una lambda es una pequeña función anónima escrita como expresión: `lambda parameters: expression`. `lambda x: x * 2` es una función que recibe un argumento y lo devuelve duplicado. Se comporta como `def double(x): return x * 2`, pero no tiene nombre propio y cabe en cualquier lugar donde se permita una expresión, como en el argumento de otra función.",
   "El cuerpo de una lambda debe ser una sola expresión, y su valor se devuelve automáticamente; nunca escribes `return`. No pueden aparecer sentencias como asignaciones, bucles o bloques `if`, aunque sí una expresión condicional: `lambda n: 'even' if n % 2 == 0 else 'odd'`. Una lambda puede no recibir parámetros (`lambda: 42`), recibir varios (`lambda a, b: a + b`) y tener valores predeterminados (`lambda x, y=1: x + y`).",
   "```python\nsquare = lambda x: x ** 2\nprint(square(4))                  # 16\nprint((lambda a, b: a * b)(3, 5)) # 15, llamada de inmediato\n\ndef apply(f, value):\n    return f(value)\n\nprint(apply(lambda s: s.upper(), 'hi'))   # HI\nprint(apply(len, 'hello'))                # 5\n```",
   "En Python las funciones son objetos que se pueden pasar de un lado a otro como cualquier valor, y ahí es donde las lambdas brillan. Una función que acepta otra función como parámetro se llama función de orden superior (higher-order function). En `apply(f, value)` de arriba, `f` puede ser una lambda, una función integrada como `len` o cualquier función definida con `def`; `apply` simplemente la llama. Escribir y seguir la ejecución de funciones así es una tarea habitual de PCAP, así que practica preguntándote: ¿qué función se pasa, y qué hace con ella la función que la recibe?",
   "El uso real más común es el argumento `key` de `sorted()`, `min()` y `max()`, y el argumento de función de `map()` y `filter()`. `sorted(people, key=lambda p: p[1])` ordena tuplas por su segundo elemento; `max(words, key=lambda w: len(w))` encuentra la palabra más larga. La lambda se llama una vez por elemento para producir el valor que se usa en la comparación.",
   "```python\npairs = [('b', 3), ('a', 1), ('c', 2)]\nprint(sorted(pairs, key=lambda p: p[1]))   # [('a', 1), ('c', 2), ('b', 3)]\nprint(min(pairs, key=lambda p: p[0]))      # ('a', 1)\n```",
   "Asignar una lambda a un nombre, como hace `square = lambda x: x ** 2`, funciona, pero las guías de estilo prefieren `def` en ese caso, porque una función con nombre da trazas de error (tracebacks) más claras. Usa lambdas para funciones cortas y desechables que se pasan directamente a otra llamada. Las lambdas también se pueden devolver desde funciones, lo que lleva a los closures, que veremos en breve."
  ],
  terms: [
   ["Lambda", "Una función anónima definida por una sola expresión, cuyo valor devuelve."],
   ["Higher-order function (función de orden superior)", "Una función que recibe otra función como argumento o devuelve una."],
   ["key function (función clave)", "Una función pasada a sorted(), min() o max() para calcular el valor de comparación de cada elemento."]
  ],
  example: "Una tienda en línea ordena los productos para mostrarlos con sorted(products, key=lambda p: p['price']), y la opción del usuario de ver primero la mejor valoración se convierte en sorted(products, key=lambda p: p['rating'], reverse=True).",
  tip: "El cuerpo de una lambda es una sola expresión con return implícito; sin sentencias y sin la palabra clave return. Cuando una función recibe una lambda, sigue su ejecución sustituyendo el argumento en la expresión de la lambda.",
  check: [
   ["¿Qué imprime print((lambda x, y=2: x ** y)(3))?", "9, porque y vale 2 por defecto y 3 ** 2 es 9."],
   ["¿Es válido lambda x: return x?", "No. El cuerpo debe ser una expresión; return es una sentencia y no está permitida."]
  ]
 },
 {
  t: "Map() and filter(), and the fact that they return one-shot iterators",
  tt: "map() y filter(), y el hecho de que devuelven iteradores de un solo uso",
  body: [
   "`map()` y `filter()` aplican una función a los elementos de un iterable. `map(function, iterable)` llama a la función sobre cada elemento y produce los resultados. `filter(function, iterable)` llama a la función sobre cada elemento y conserva solo los elementos para los que devuelve un valor verdadero. Ambas se usan a menudo con lambdas.",
   "```python\nnums = [1, 2, 3, 4, 5]\nprint(list(map(lambda n: n * n, nums)))         # [1, 4, 9, 16, 25]\nprint(list(filter(lambda n: n % 2 == 1, nums))) # [1, 3, 5]\nprint(list(map(str, nums)))                     # ['1', '2', '3', '4', '5']\n```",
   "En Python 3, ninguna de las dos devuelve una lista. Devuelven objetos iteradores, un objeto map y un objeto filter, que producen los valores de forma perezosa, de uno en uno, solo cuando se les piden. Por eso los ejemplos los envuelven en `list()`. Imprimir uno directamente muestra algo como `<map object at 0x...>` en lugar de los valores.",
   "Ser un iterador tiene una consecuencia que al examen le encanta: es de un solo uso. Una vez que has consumido todos sus valores, al convertirlo en lista, recorrerlo con un bucle o llamar a `sum()` sobre él, queda agotado, y volver a usarlo no produce nada. Crearlo no ejecuta nada; la función solo se llama a medida que se piden valores.",
   "```python\nm = map(str.upper, ['a', 'b'])\nprint(list(m))   # ['A', 'B']\nprint(list(m))   # [] - ya está agotado\n\nf = filter(None, [0, 1, '', 'x', None, [2]])\nprint(list(f))   # [1, 'x', [2]]\n```",
   "Si necesitas los resultados más de una vez, guárdalos primero en una lista: `results = list(map(...))`. También puedes avanzar por un iterador manualmente con `next()`, que lanza StopIteration cuando no queda nada, el mismo protocolo que usan los generadores.",
   "Se evalúan algunos detalles más. `map()` acepta varios iterables cuando la función recibe varios argumentos: `map(lambda a, b: a + b, [1, 2, 3], [10, 20])` da 11 y 22, y se detiene en el iterable más corto. `filter()` acepta `None` como función, lo que significa conservar los elementos que son verdaderos por sí mismos, así que elimina ceros, cadenas vacías, None y contenedores vacíos. Y la función puede ser cualquier objeto invocable, no solo una lambda: `map(int, ['1', '2'])` convierte cadenas en enteros.",
   "Las comprensiones de listas pueden hacer el mismo trabajo: `[n * n for n in nums]` equivale a `list(map(lambda n: n * n, nums))` y `[n for n in nums if n % 2]` equivale a la versión con filter. Muchos programadores de Python prefieren las comprensiones por legibilidad, pero debes saber leer ambas formas y recordar que la comprensión construye una lista de inmediato, mientras que map y filter son perezosas."
  ],
  terms: [
   ["map()", "Devuelve un iterador que aplica una función a cada elemento de uno o más iterables."],
   ["filter()", "Devuelve un iterador que produce los elementos para los que una función devuelve un valor verdadero."],
   ["Iterator (iterador)", "Un objeto que produce valores de uno en uno con next(); una vez agotado, no produce nada más."],
   ["Lazy evaluation (evaluación perezosa)", "Calcular los valores solo cuando se piden."]
  ],
  example: "Un script lee precios con prices = map(float, lines), imprime sum(prices) y luego intenta max(prices), que falla porque sum() ya había agotado el iterador map. Guardar list(map(float, lines)) lo soluciona.",
  tip: "map y filter devuelven iteradores, no listas, y cada uno solo se puede consumir una vez. Un segundo list() del mismo objeto da [].",
  check: [
   ["¿Qué es list(filter(lambda s: s.isdigit(), ['1', 'a', '22']))?", "['1', '22']."],
   ["m = map(abs, [-1, -2]); sum(m); ¿qué es list(m)?", "[], porque sum() consumió el iterador."]
  ]
 },
 {
  t: "Closures: inner functions that remember variables from an enclosing scope, and late binding",
  tt: "Closures: funciones internas que recuerdan variables de un ámbito envolvente, y late binding",
  body: [
   "Python te permite definir una función dentro de otra. La función interna puede leer las variables de la función externa, porque la búsqueda de nombres sigue la regla LEGB: Local, luego los ámbitos de las funciones envolventes (Enclosing), luego Global y luego Built-in (integrado). Se crea un closure (clausura) cuando la función externa devuelve la función interna y esta sigue usando variables del ámbito externo. Aunque la función externa haya terminado, la función devuelta mantiene vivas esas variables y puede usarlas cada vez que se la llama.",
   "```python\ndef make_multiplier(factor):\n    def multiply(x):\n        return x * factor      # factor viene del ámbito envolvente\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5), triple(5))    # 10 15\n```",
   "Cada llamada a `make_multiplier` crea una nueva variable `factor` y una nueva función interna enlazada a ella, así que `double` y `triple` recuerdan valores distintos. Fíjate en que `make_multiplier` devuelve `multiply`, el objeto función, sin paréntesis. Devolver `multiply()` la llamaría de inmediato. Los closures son una forma ligera de crear funciones configuradas, y son la base de los decoradores y los callbacks.",
   "Una función interna puede leer libremente las variables envolventes, pero asignar a una de ellas normalmente crearía una nueva variable local. Para volver a enlazar la variable envolvente, declárala con `nonlocal`. Esto permite que un closure mantenga un estado privado entre llamadas.",
   "```python\ndef counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nc = counter()\nprint(c(), c(), c())   # 1 2 3\n```",
   "Sin `nonlocal`, `count += 1` lanzaría UnboundLocalError, porque la asignación convierte a `count` en local de `step` y se lee antes de haber sido asignada.",
   "Los closures capturan variables, no valores. La variable envolvente se busca cuando la función interna se ejecuta, no cuando se define. Esto se llama late binding (enlace tardío), y produce una sorpresa famosa con los bucles: `funcs = [lambda: i for i in range(3)]` crea tres funciones que se refieren todas a la misma variable `i`. Cuando las llamas, el bucle ya terminó e `i` vale 2, así que `[f() for f in funcs]` da `[2, 2, 2]`, no `[0, 1, 2]`.",
   "La solución habitual es capturar el valor actual como argumento predeterminado, porque los valores predeterminados se evalúan cuando se define la función: `[lambda i=i: i for i in range(3)]` da `[0, 1, 2]`. Otra es crear cada función mediante una fábrica como `make_multiplier`, para que cada una tenga su propia variable envolvente. Cuando una pregunta del examen construye funciones en un bucle y las llama después, busca primero el late binding."
  ],
  terms: [
   ["Closure (clausura)", "Una función interna que conserva el acceso a las variables del ámbito de la función envolvente después de que esta retorna."],
   ["Enclosing scope (ámbito envolvente)", "El ámbito local de una función externa, visible para las funciones anidadas dentro de ella."],
   ["nonlocal", "Declaración que permite a una función interna volver a enlazar una variable de la función envolvente."],
   ["Late binding (enlace tardío)", "Buscar las variables libres de un closure cuando se llama, no cuando se crea."]
  ],
  example: "Una interfaz gráfica construye una fila de botones en un bucle y asocia lambda: select(i) a cada uno. Todos los botones seleccionan el último elemento hasta que el desarrollador lo cambia por lambda i=i: select(i), capturando cada índice en el momento de la creación.",
  tip: "Los closures recuerdan variables, no instantáneas de sus valores. Las funciones creadas en un bucle ven todas el valor final de la variable del bucle, a menos que la enlaces con un argumento predeterminado.",
  check: [
   ["¿Qué devuelve [f() for f in [lambda: n * 2 for n in range(3)]]?", "[4, 4, 4], porque cada lambda lee n después de que el bucle terminó con n = 2."],
   ["¿Por qué falla count += 1 dentro de una función interna sin nonlocal?", "La asignación hace que count sea local de la función interna, así que leerla primero lanza UnboundLocalError."]
  ]
 },
 {
  t: "Generators: yield, next(), and StopIteration",
  tt: "Generadores: yield, next() y StopIteration",
  body: [
   "Un generador es una función que produce una secuencia de valores de uno en uno, en lugar de calcularlos todos a la vez y devolver una lista. Lo escribes como una función normal, pero usas `yield` en lugar de (o además de) `return`. La presencia de `yield` en cualquier parte del cuerpo convierte la función en una función generadora: llamarla no ejecuta su cuerpo; devuelve un objeto generador que ejecutará el cuerpo paso a paso cuando se le pida.",
   "Cada vez que pides un valor al generador con `next(gen)`, se ejecuta desde donde se detuvo la última vez hasta llegar a un `yield`, entrega ese valor y se pausa, conservando intactas todas sus variables locales. La siguiente petición continúa justo después de ese `yield`. Cuando el cuerpo de la función termina, ya sea al llegar al final o al ejecutar `return`, el generador lanza StopIteration para indicar que no hay más valores. Cada llamada posterior a `next()` vuelve a lanzar StopIteration.",
   "```python\ndef countdown(n):\n    print('start')\n    while n > 0:\n        yield n\n        n -= 1\n\ng = countdown(3)       # todavía no se imprime nada\nprint(next(g))         # start, luego 3\nprint(next(g))         # 2\nprint(next(g))         # 1\n# next(g)              # StopIteration\n```",
   "En el código cotidiano rara vez llamas a `next()` tú mismo. Un bucle `for` lo llama automáticamente y trata StopIteration como el final normal del bucle, así que `for x in countdown(3): print(x)` imprime 3, 2, 1 sin error. Las funciones que consumen iterables, como `list()`, `sum()` y `sorted()`, funcionan igual: `list(countdown(3))` es `[3, 2, 1]`.",
   "Los generadores son iteradores, así que, como los objetos map y filter, son de un solo uso. Después de que un generador se agota, recorrerlo de nuevo no produce nada; vuelve a llamar a la función generadora para obtener uno nuevo. `next()` también acepta un valor predeterminado, `next(g, None)`, que se devuelve en lugar de lanzar StopIteration cuando el generador ha terminado.",
   "¿Por qué usarlos? Un generador usa memoria para un solo valor a la vez, así que puede representar secuencias enormes o incluso infinitas, como cada línea de un archivo muy grande o un flujo interminable de IDs. Además empieza a producir resultados de inmediato, en lugar de después de calcularlo todo. Una expresión generadora da el mismo beneficio en una línea: `(x * x for x in range(10**6))` parece una comprensión de lista con paréntesis, pero produce los valores de forma perezosa; `sum(x * x for x in range(10))` no necesita paréntesis adicionales.",
   "Dos detalles para recordar. Un `return value` dentro de un generador lo termina; el valor no lo produce `next()`, sino que queda adjunto a la excepción StopIteration. Y los objetos generadores son distintos de las listas: no tienen `len()` y no se pueden indexar."
  ],
  terms: [
   ["Generator function (función generadora)", "Una función que contiene yield; llamarla devuelve un objeto generador."],
   ["yield", "Produce un valor y pausa el generador, conservando su estado hasta la siguiente petición."],
   ["next()", "Función integrada que pide a un iterador su siguiente valor."],
   ["StopIteration", "Excepción que se lanza cuando un iterador no tiene más valores; los bucles for la manejan automáticamente."]
  ],
  example: "Un analizador de logs define def errors(path), que abre un archivo y produce con yield solo las líneas que contienen ERROR. Puede recorrer un log de varios gigabytes con un bucle for manteniendo solo una línea en memoria a la vez.",
  tip: "Llamar a una función generadora no ejecuta nada de su cuerpo hasta el primer next(). Después del último yield, next() lanza StopIteration, que los bucles for absorben en silencio.",
  check: [
   ["def g(): yield 1; yield 2. ¿Qué devuelve list(g()), y qué hace un tercer next() sobre un mismo generador?", "[1, 2]; un tercer next() sobre el mismo generador lanza StopIteration."],
   ["¿En qué se diferencia (x for x in range(3)) de [x for x in range(3)]?", "El primero es un generador perezoso de un solo uso; el segundo construye una lista completa de inmediato."]
  ]
 },
{
  t: "File I/O: open() modes (r, w, a, x, b, t, +), text versus binary",
  tt: "E/S de archivos: modos de open() (r, w, a, x, b, t, +), texto frente a binario",
  body: [
   "Para trabajar con un archivo, primero lo abres con `open(filename, mode)`, que devuelve un objeto stream (flujo) para leer y escribir. La cadena de modo indica lo que pretendes hacer, y cada modo tiene consecuencias precisas sobre los archivos existentes, que el examen evalúa directamente.",
   "Las letras de modo principales son estas. `'r'` abre para lectura y es el modo predeterminado si no indicas ninguno; el archivo debe existir, de lo contrario se lanza FileNotFoundError. `'w'` abre para escritura; crea el archivo si no existe y lo trunca (lo deja vacío) si existe, así que todo el contenido anterior se pierde en el mismo momento de abrirlo. `'a'` abre para añadir (append); crea el archivo si hace falta, conserva el contenido existente y cada escritura va al final. `'x'` abre para creación exclusiva; crea un archivo nuevo para escritura, pero lanza FileExistsError si el archivo ya existe, lo que te protege de sobrescribir algo por accidente.",
   "El signo más añade la otra dirección. `'r+'` abre un archivo existente para lectura y escritura sin truncarlo (sigue fallando si el archivo no existe). `'w+'` crea o trunca, y luego permite leer y escribir. `'a+'` permite leer además de añadir. El más nunca cambia si el archivo se crea o se trunca; eso lo decide la letra a la que modifica.",
   "Las letras `'t'` y `'b'` eligen el modo texto o binario y se combinan con las demás, como en `'rb'` o `'wt'`. El modo texto (`'t'`) es el predeterminado. En modo texto, leer devuelve objetos `str`: Python decodifica los bytes usando una codificación (puedes pasar `encoding='utf-8'`; si no, se usa una predeterminada de la plataforma), y traduce los finales de línea de modo que `\\r\\n` de Windows o `\\r` del estilo antiguo se conviertan en `\\n` al leer, y `\\n` se convierta en el final de línea de la plataforma al escribir. En modo binario (`'b'`), no se traduce nada: leer devuelve `bytes`, escribir requiere `bytes` o `bytearray`, y obtienes exactamente lo que hay en el disco. Usa el modo binario para imágenes, audio, archivos comprimidos y cualquier dato que no sea texto.",
   "```python\nwith open('notes.txt', 'w', encoding='utf-8') as f:\n    f.write('line 1\\n')\nwith open('notes.txt', 'a', encoding='utf-8') as f:\n    f.write('line 2\\n')\nwith open('notes.txt') as f:             # 'r' y 't' por defecto\n    print(f.read())                       # line 1, line 2\nwith open('notes.txt', 'rb') as f:\n    print(f.read())                       # bytes sin procesar, p. ej. b'line 1\\nline 2\\n'\n```",
   "Mezclar tipos entre modos provoca errores: escribir un `str` en un archivo abierto con `'wb'` lanza TypeError, igual que escribir `bytes` en modo texto. Abrir un directorio, o un archivo para el que no tienes permiso, lanza subclases de OSError como IsADirectoryError o PermissionError, que se tratan en la lección sobre errno.",
   "Al predecir resultados, hazte tres preguntas para cualquier modo: ¿el archivo tiene que existir?, ¿se borra el contenido existente?, y ¿leer o escribir produce `str` o `bytes`? Esas respuestas resuelven casi todas las preguntas sobre open()."
  ],
  terms: [
   ["'w' mode (modo 'w')", "Modo de escritura: crea el archivo o trunca uno existente a longitud cero."],
   ["'x' mode (modo 'x')", "Creación exclusiva: crea un archivo nuevo y falla con FileExistsError si ya existe."],
   ["Text mode (modo texto)", "Modo que decodifica bytes a str usando una codificación y traduce los finales de línea."],
   ["Binary mode (modo binario)", "Modo ('b') que lee y escribe bytes sin procesar, sin decodificación ni traducción."]
  ],
  example: "Un script que guarda resultados diarios abre su log con 'a' para que cada ejecución añada una línea, mientras que un generador de informes abre su salida con 'x' para no poder sobrescribir nunca por error el informe del mes anterior.",
  tip: "'w' borra el contenido existente en el momento de abrir el archivo, 'a' lo conserva, 'x' falla si el archivo existe y 'r' falla si no existe. El modo texto da str; el modo binario da bytes.",
  check: [
   ["¿Qué modo abre un archivo existente para lectura y escritura sin borrarlo?", "'r+'; 'w+' lo truncaría."],
   ["¿Qué tipo devuelve f.read() para un archivo abierto con 'rb'?", "bytes."],
   ["¿Qué pasa con open('data.txt', 'x') si data.txt ya existe?", "Se lanza FileExistsError y el archivo queda intacto."]
  ]
 },
 {
  t: "Stream handles and the predefined streams sys.stdin, sys.stdout, sys.stderr",
  tt: "Manejadores de flujo (stream handles) y los flujos predefinidos sys.stdin, sys.stdout, sys.stderr",
  body: [
   "Python, como la mayoría de los lenguajes, trata las fuentes de entrada y salida como flujos (streams): secuencias de datos que lees o escribes en orden. Un manejador de flujo (stream handle) es el objeto que tu programa conserva para trabajar con un flujo. `open()` devuelve uno, y todas las operaciones con archivos (leer, escribir, cerrar) son métodos que se llaman sobre él. El manejador también lleva la cuenta de la posición actual en el archivo, que avanza a medida que lees o escribes.",
   "La clase exacta del manejador depende del modo. Los archivos en modo texto dan un flujo de texto (en CPython, un `io.TextIOWrapper`), cuyos métodos trabajan con `str`. Los archivos binarios dan un flujo binario con búfer, como `io.BufferedReader` o `io.BufferedWriter`, cuyos métodos trabajan con `bytes`. No necesitas memorizar los nombres de las clases para PCAP, pero sí debes saber que los manejadores de texto y los binarios son tipos de objeto distintos, y por eso sus métodos aceptan tipos distintos.",
   "Hay tres flujos que se abren automáticamente en todo programa de Python, antes de que se ejecute nada de tu código, y están disponibles en el módulo `sys`. `sys.stdin` es la entrada estándar, que por defecto lee del teclado; `input()` lee una línea de ella. `sys.stdout` es la salida estándar, que por defecto va a la pantalla; `print()` escribe en ella. `sys.stderr` es el error estándar, que por defecto también se muestra en pantalla, pero se mantiene separado para que los mensajes de error y los diagnósticos no se mezclen con la salida normal. Las trazas (tracebacks) de las excepciones no manejadas se escriben en `sys.stderr`.",
   "```python\nimport sys\nsys.stdout.write('normal output\\n')\nprint('also normal output')\nprint('something went wrong', file=sys.stderr)\nline = sys.stdin.readline()   # como input(), pero conserva el salto de línea final\n```",
   "Mantener separados stdout y stderr importa cuando se redirige la salida. Si ejecutas `python report.py > out.txt` en una terminal, solo la salida estándar va al archivo; los mensajes de error siguen apareciendo en pantalla, así que el usuario los ve y el archivo no se ensucia. Las shells pueden redirigir los tres flujos de forma independiente, y los programas pueden encadenarse con tuberías (pipes), donde el stdout de un programa se convierte en el stdin del siguiente.",
   "Como son flujos de texto normales, admiten los mismos métodos que los manejadores de archivo: `sys.stdout.write()`, `sys.stdin.read()`, etc. Ten en cuenta que `write()` no añade un salto de línea, a diferencia de `print()`, y que devuelve el número de caracteres escritos, que el intérprete interactivo muestra. No debes cerrar tú mismo estos flujos predefinidos; Python los gestiona. El argumento `file=` de `print()` acepta cualquier flujo de texto escribible, así que puedes enviar la misma llamada a print a la pantalla, a stderr o a un archivo abierto."
  ],
  terms: [
   ["Stream (flujo)", "Un flujo ordenado de datos que un programa lee o escribe."],
   ["Stream handle (manejador de flujo)", "El objeto devuelto por open() (o proporcionado por sys) a través del cual se usa un flujo."],
   ["sys.stdout", "La salida estándar, el destino predeterminado de print()."],
   ["sys.stderr", "El error estándar, un flujo de salida aparte para mensajes de error y diagnósticos."]
  ],
  example: "Una herramienta de línea de comandos imprime sus resultados CSV en stdout y sus mensajes de progreso en stderr. Un usuario la ejecuta con la salida redirigida a results.csv y sigue viendo el progreso en pantalla, mientras que el archivo contiene solo datos limpios.",
  tip: "print() escribe en sys.stdout por defecto e input() lee de sys.stdin; sys.stderr está separado para que los errores sigan visibles cuando se redirige la salida normal. Los tres están abiertos antes de que empiece tu programa.",
  check: [
   ["¿Cómo haces que print() envíe un mensaje al error estándar?", "print('message', file=sys.stderr), después de importar sys."],
   ["¿Necesitas llamar a open() antes de usar sys.stdin?", "No. sys.stdin, sys.stdout y sys.stderr se abren automáticamente cuando empieza el programa."]
  ]
 },
 {
  t: "Read(), readline(), readlines(), write(), readinto() with bytearray, close() and with",
  tt: "read(), readline(), readlines(), write(), readinto() con bytearray, close() y with",
  body: [
   "Una vez abierto un archivo, su manejador ofrece métodos para meter y sacar datos. Cada uno lee o escribe desde la posición actual y la hace avanzar, así que las llamadas sucesivas continúan donde se detuvo la anterior.",
   "`read()` sin argumentos lee todo desde la posición actual hasta el final y lo devuelve como una cadena (modo texto) o un objeto bytes (modo binario). `read(n)` lee como máximo n caracteres o bytes. Al final del archivo, `read()` devuelve una cadena vacía o bytes vacíos, que es como detectas que no queda nada. `readline()` lee una línea incluido su salto de línea final, `'\\n'`, y devuelve una cadena vacía al final del archivo; una línea en blanco en medio del archivo se devuelve como `'\\n'`, no como una cadena vacía. `readlines()` lee todas las líneas restantes y las devuelve como una lista de cadenas, cada una todavía terminada en su salto de línea. El manejador también es iterable: `for line in f:` lee una línea cada vez, lo que es eficiente en memoria para archivos grandes.",
   "```python\nwith open('data.txt', 'w') as f:\n    n = f.write('alpha\\nbeta\\n')\n    print(n)                   # 11 caracteres escritos\n\nwith open('data.txt') as f:\n    print(repr(f.readline()))  # 'alpha\\n'\n    print(f.readlines())       # ['beta\\n']\n    print(repr(f.read()))      # '' - no queda nada\n```",
   "`write(s)` escribe una cadena (modo texto) o bytes (modo binario) y devuelve el número de caracteres o bytes escritos. No añade un salto de línea; incluye tú mismo `'\\n'`. `writelines(list_of_strings)` escribe varias cadenas, también sin añadir saltos de línea.",
   "`readinto(buffer)` es para archivos binarios. En lugar de crear un objeto bytes nuevo, llena un `bytearray` existente y mutable con datos del archivo y devuelve el número de bytes leídos, que puede ser menor que el tamaño del búfer cerca del final del archivo, y 0 al final. Reutilizar un mismo búfer evita crear objetos nuevos en bucles que recorren archivos binarios grandes. No funciona con `bytes` inmutables ni con manejadores en modo texto.",
   "```python\ndata = bytearray(10)          # 10 bytes a cero\nwith open('image.bin', 'rb') as f:\n    count = f.readinto(data)\nprint(count, data[:count])\n```",
   "`close()` termina el trabajo con un archivo: vuelca al disco cualquier escritura que esté en el búfer y libera el recurso del sistema operativo. Olvidar cerrar un archivo en el que escribiste puede dejar datos sin escribir si el programa falla, y usar un manejador después de cerrarlo lanza ValueError. La sentencia `with` resuelve esto: `with open(...) as f:` cierra el archivo automáticamente cuando termina el bloque, incluso si ocurre una excepción dentro, y por eso todos los ejemplos de aquí la usan. Equivale a un try/finally que llama a `f.close()`. Puedes comprobar el estado con el atributo `f.closed`."
  ],
  terms: [
   ["readline()", "Lee una línea incluido su salto de línea; devuelve una cadena vacía al final del archivo."],
   ["readlines()", "Devuelve una lista con todas las líneas restantes, cada una con su salto de línea."],
   ["readinto()", "Llena un bytearray existente desde un archivo binario y devuelve el número de bytes leídos."],
   ["with statement (sentencia with)", "Un bloque de gestor de contexto (context manager) que cierra el archivo automáticamente al terminar."]
  ],
  example: "Una herramienta de copias de seguridad copia archivos binarios grandes reservando un solo bytearray de 64 KB y llamando repetidamente a readinto() sobre el origen, escribiendo data[:count] en el destino hasta que readinto() devuelve 0.",
  tip: "El final del archivo se indica con un resultado vacío ('' o b''), no con una excepción. write() nunca añade saltos de línea, y readinto() necesita un bytearray y un archivo en modo binario.",
  check: [
   ["¿Qué devuelve readline() para una línea vacía en medio de un archivo?", "'\\n', una cadena que contiene solo el salto de línea; solo el final del archivo devuelve ''."],
   ["¿Por qué se prefiere with open(...) as f: a llamar a close() manualmente?", "Garantiza que el archivo se cierre al salir del bloque, incluso si se lanza una excepción."]
  ]
 },
 {
  t: "Errno values (for example ENOENT, EACCES) on I/O errors",
  tt: "Valores de errno (por ejemplo ENOENT, EACCES) en errores de E/S",
  body: [
   "La entrada y la salida pueden fallar por muchas razones ajenas al control de tu programa: el archivo no existe, no tienes permiso, el disco está lleno. Cuando falla una llamada al sistema operativo, Python lanza `OSError` (o una de sus subclases), y la excepción lleva el código de error del sistema operativo en su atributo `errno`. Comprobar ese código te permite responder con precisión a lo que salió mal.",
   "Los códigos son enteros, pero sus valores numéricos pueden variar entre sistemas operativos, así que nunca debes compararlos con números directamente. En su lugar, el módulo `errno` proporciona constantes con nombre. Las que PCAP espera que reconozcas incluyen `errno.ENOENT` (no existe el archivo o directorio), `errno.EACCES` (permiso denegado), `errno.EEXIST` (el archivo existe), `errno.EISDIR` (es un directorio), `errno.EBADF` (descriptor de archivo incorrecto, por ejemplo al usar un manejador no válido), `errno.EMFILE` (demasiados archivos abiertos), `errno.ENOSPC` (no queda espacio en el dispositivo) y `errno.EFBIG` (archivo demasiado grande).",
   "```python\nimport errno\n\ntry:\n    with open('missing.txt') as f:\n        data = f.read()\nexcept OSError as e:\n    if e.errno == errno.ENOENT:\n        print('The file does not exist')\n    elif e.errno == errno.EACCES:\n        print('You do not have permission to read it')\n    else:\n        print('Other I/O error:', e.strerror)\n```",
   "Además de `errno`, un OSError proporciona `strerror`, el mensaje legible correspondiente al código, y a menudo `filename`. Para convertir tú mismo cualquier código en su mensaje, llama a `os.strerror(code)`, por ejemplo `os.strerror(errno.ENOENT)`. Imprimir el objeto de la excepción muestra todo esto junto, normalmente con la forma `[Errno N] message: 'filename'`.",
   "El Python moderno también asocia los códigos comunes a subclases concretas de OSError, que puedes capturar directamente: `FileNotFoundError` corresponde a ENOENT, `PermissionError` a EACCES (y EPERM), `FileExistsError` a EEXIST, e `IsADirectoryError` a EISDIR. Así que `except FileNotFoundError:` es una alternativa legible a comprobar `e.errno == errno.ENOENT`. Ambos estilos aparecen en las preguntas del examen, y ambos son correctos; la comprobación con errno es útil cuando quieres un solo manejador para varios códigos o para un código que no tiene subclase propia.",
   "Desde un punto de vista defensivo, estos errores son eventos esperables, no desastres raros. Un programa robusto los comprueba donde se abren archivos y da al usuario un mensaje claro en lugar de una traza de error. También debe evitar filtrar detalles sensibles, como rutas internas completas, en los mensajes que se muestran a usuarios no confiables, sin dejar de registrar lo suficiente para diagnosticar problemas. Manejar ENOENT y EACCES de forma explícita es el mínimo habitual en cualquier programa que abre archivos cuyo nombre indica un usuario."
  ],
  terms: [
   ["errno attribute (atributo errno)", "El código de error del sistema operativo guardado en una instancia de OSError."],
   ["errno module (módulo errno)", "Módulo estándar que define constantes con nombre, como ENOENT y EACCES, para los códigos de error."],
   ["ENOENT", "Código de error que significa que no existe el archivo o directorio; corresponde a FileNotFoundError."],
   ["EACCES", "Código de error que significa permiso denegado; corresponde a PermissionError."]
  ],
  example: "Un importador de fotos recorre los archivos seleccionados por el usuario. Cuando un archivo ha sido eliminado, captura OSError con errno ENOENT y lo omite con una nota, y cuando un archivo está bloqueado por permisos (EACCES), le dice al usuario cuál necesita que se corrijan sus permisos.",
  tip: "Compara e.errno con las constantes del módulo errno, nunca con números directamente. ENOENT va con FileNotFoundError y EACCES con PermissionError, ambas subclases de OSError.",
  check: [
   ["¿Qué constante de errno indica que un archivo que intentaste abrir no existe?", "errno.ENOENT."],
   ["¿Cómo puedes obtener un mensaje legible para un código de error?", "Usa el atributo strerror de la excepción, o llama a os.strerror(code)."]
  ]
 }
], { lang: "es" });
