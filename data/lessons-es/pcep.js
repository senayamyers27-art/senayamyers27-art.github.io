CertHub.addLessons("pcep", [
  { t: "Fundamental terms: interpreting vs compiling, lexis, syntax and semantics, source code and the Python interpreter", tt: "Términos fundamentales: interpretar vs. compilar, léxico, sintaxis y semántica, código fuente y el intérprete de Python",
    body: [
      "El procesador de una computadora solo entiende código máquina: largas secuencias de instrucciones binarias específicas de ese procesador. Las personas no lo escriben directamente. En su lugar, escribes código fuente (source code) en un lenguaje de programación de alto nivel como Python, y un programa lo traduce a algo que la máquina puede ejecutar. El examen PCEP espera que conozcas el vocabulario de cómo ocurre esa traducción y de las reglas que impone un lenguaje.",
      "Hay dos estrategias clásicas de traducción. La compilación traduce todo el programa por adelantado a un archivo ejecutable separado (código máquina), que luego puede ejecutarse muchas veces sin el compilador. La interpretación lee el código fuente y lo ejecuta instrucción por instrucción cada vez que el programa se ejecuta, así que siempre necesitas que el intérprete esté presente. Los programas compilados suelen ejecutarse más rápido y pueden distribuirse sin el código fuente; los programas interpretados son más fáciles de probar y de mover entre plataformas, porque el mismo código fuente se ejecuta en cualquier lugar donde exista un intérprete. Python se considera un lenguaje interpretado: ejecutas `python3 script.py` y el intérprete lo ejecuta. (Internamente, CPython primero convierte el código fuente en bytecode para su máquina virtual, pero para el examen, Python es interpretado.)",
      "Todo lenguaje, humano o de computadora, tiene tres capas de reglas. El léxico (lexis) es el vocabulario: el conjunto de palabras y símbolos válidos, como palabras clave, operadores y literales. La sintaxis (syntax) es la gramática: las reglas sobre cómo se pueden combinar esas palabras en instrucciones válidas. La semántica (semantics) es el significado: si una instrucción bien formada realmente tiene sentido. Por ejemplo, `print(\"hi\"` es un error de sintaxis porque falta un paréntesis, mientras que `print(10 / 0)` es sintácticamente correcto pero falla en tiempo de ejecución porque dividir entre cero no tiene significado.",
      "El intérprete revisa tu código en momentos distintos. Los errores de sintaxis se detectan antes de que se ejecute cualquier línea; el intérprete informa la línea y normalmente marca la posición con un acento circunflejo (^). Los errores en tiempo de ejecución (excepciones) aparecen solo cuando realmente se llega a la línea defectuosa, así que las líneas anteriores pueden haber producido salida ya. Los errores de lógica son los más difíciles: el programa se ejecuta sin quejarse pero da una respuesta incorrecta, y ninguna herramienta te los va a señalar.",
      "CPython es la implementación de referencia de Python, escrita en C, y es lo que obtienes de python.org. Puedes usarlo en dos modos: el modo interactivo (el REPL, o ciclo leer-evaluar-imprimir, que se reconoce por el prompt `>>>`), donde cada línea se evalúa de inmediato, y el modo script, donde guardas el código en un archivo `.py` y ejecutas el archivo completo. Los archivos fuente de Python son texto plano, así que cualquier editor sirve, aunque un editor como VS Code agrega resaltado de sintaxis y sugerencias de errores."
    ],
    terms: [
      ["Source code (código fuente)", "El texto del programa, legible por humanos, que escribes; en Python se guarda como un archivo .py de texto plano."],
      ["Compiler (compilador)", "Un programa que traduce todo el código fuente a código máquina por adelantado, produciendo un ejecutable separado."],
      ["Interpreter (intérprete)", "Un programa que lee y ejecuta el código fuente cada vez que se ejecuta, instrucción por instrucción; CPython es el intérprete de referencia de Python."],
      ["Lexis (léxico)", "El vocabulario de un lenguaje: las palabras y símbolos válidos que reconoce."],
      ["Syntax (sintaxis)", "Las reglas gramaticales para combinar los elementos léxicos en instrucciones válidas."],
      ["Semantics (semántica)", "Las reglas que deciden si una instrucción bien formada tiene sentido y qué significa."]
    ],
    example: "Guardas un archivo con tres llamadas a print(), pero a la tercera le falta el paréntesis de cierre. Cuando lo ejecutas, no se imprime nada: el intérprete informa un SyntaxError antes de ejecutar cualquier cosa. Corrige eso, pero haz que la segunda línea sea print(1 / 0), y ahora la primera línea se imprime y luego un ZeroDivisionError detiene el programa.",
    tip: "Las preguntas del examen a menudo preguntan qué tipo de error produce un fragmento. Los paréntesis faltantes, la mala indentación o las palabras clave mal colocadas son errores de sintaxis que se detectan antes de la ejecución; el código válido que hace algo imposible es un error en tiempo de ejecución (semántico) que se detecta solo cuando se ejecuta esa línea.",
    check: [
      ["¿Cuál es la diferencia práctica clave entre compilar e interpretar?", "Un compilador traduce todo el programa una sola vez a un ejecutable que funciona sin el compilador; un intérprete traduce y ejecuta el código fuente cada vez, así que el intérprete debe estar presente."],
      ["¿print(\"a\" + 5) es un error de sintaxis o un error en tiempo de ejecución?", "Un error en tiempo de ejecución (TypeError). La línea es gramaticalmente válida, pero sumar una cadena y un entero no tiene significado, así que falla solo cuando se ejecuta."],
      ["¿Cuál de léxico, sintaxis o semántica se viola al escribir prnt en lugar de print?", "Ninguna al momento del análisis; prnt es un nombre válido, así que el código se analiza sin problema. Falla en tiempo de ejecución con NameError porque el nombre no está definido, lo cual es un problema semántico."]
    ] },
  { t: "Python logic and structure: keywords, instructions, indentation and comments", tt: "Lógica y estructura de Python: palabras clave, instrucciones, indentación y comentarios",
    body: [
      "Un programa de Python es una secuencia de instrucciones (statements) que el intérprete ejecuta de arriba hacia abajo. Normalmente cada instrucción va en su propia línea. Puedes poner varias instrucciones cortas en una línea separadas por punto y coma, y puedes continuar una instrucción larga en varias líneas dentro de paréntesis, corchetes o llaves, o con una barra invertida al final de la línea, pero el estilo simple de una instrucción por línea es el que deberías escribir.",
      "Las palabras clave (keywords) son palabras reservadas con un significado fijo en el lenguaje, como `if`, `else`, `elif`, `while`, `for`, `in`, `def`, `return`, `pass`, `break`, `continue`, `import`, `global`, `try`, `except`, `and`, `or`, `not`, `is`, `None`, `True` y `False`. No puedes usar una palabra clave como nombre de variable o de función; `for = 3` es un error de sintaxis. Las palabras clave distinguen entre mayúsculas y minúsculas: `True` es una palabra clave, pero `true` es un nombre común (y aquí no definido). Puedes ver la lista completa con `import keyword` seguido de `print(keyword.kwlist)`.",
      "La indentación es parte de la sintaxis de Python, no solo una cuestión de estilo. Una instrucción compuesta como `if`, `while`, `for`, `def` o `try` termina su línea de encabezado con dos puntos, y las líneas que le pertenecen (su bloque o suite) deben estar más indentadas que el encabezado. El bloque termina cuando la indentación vuelve al nivel anterior. Todas las líneas de un bloque deben usar la misma indentación. PEP 8, la guía de estilo de Python, recomienda cuatro espacios por nivel. Mezclar tabulaciones y espacios de forma inconsistente provoca `TabError`, y un nivel incorrecto provoca `IndentationError`, que es un tipo de `SyntaxError`.",
      "```python\nx = 7\nif x > 5:\n    print(\"big\")      # dentro del bloque if\n    print(\"still in\")\nprint(\"always runs\")  # de vuelta en el nivel exterior\n```",
      "Los comentarios empiezan con `#` y llegan hasta el final de la línea. El intérprete los ignora por completo, así que son para los lectores humanos: explica por qué el código hace algo, no qué hace cada línea obvia. Un `#` dentro de un literal de cadena es solo un carácter, no un comentario. Python no tiene una sintaxis especial para comentarios de varias líneas; o pones `#` en cada línea o, por convención, usas una cadena con comillas triples, que en realidad es un literal de cadena que se evalúa y se descarta (y, cuando es la primera instrucción de una función o módulo, se convierte en su docstring).",
      "La indentación inesperada importa en el examen. Si una línea está indentada sin un encabezado previo con dos puntos, obtienes `IndentationError: unexpected indent`. Si después de los dos puntos de un encabezado no hay nada indentado, obtienes `IndentationError: expected an indented block`. Ese segundo caso es exactamente la razón por la que existe la palabra clave `pass`."
    ],
    terms: [
      ["Keyword (palabra clave)", "Una palabra reservada con significado fijo, como if, for o def, que no puede usarse como identificador."],
      ["Block (bloque, suite)", "El grupo de instrucciones indentadas que pertenece a una línea de encabezado que termina en dos puntos."],
      ["Comment (comentario)", "Texto después de # hasta el final de la línea, que el intérprete ignora."],
      ["IndentationError", "La subclase de SyntaxError que se lanza cuando la indentación falta, es inesperada o es inconsistente."]
    ],
    example: "Un estudiante escribe un bucle cuya segunda línea del cuerpo está indentada con tres espacios en lugar de cuatro. Python informa un IndentationError (unindent does not match any outer indentation level) antes de ejecutar nada. Volver a indentar ambas líneas con cuatro espacios hace que el programa funcione.",
    tip: "Recuerda que True, False y None son palabras clave con mayúscula inicial; true en minúsculas es solo un nombre no definido. Recuerda también que un # dentro de comillas no es un comentario.",
    check: [
      ["¿Qué pasa si escribes if x > 3: y la siguiente línea no está indentada?", "Python lanza IndentationError: expected an indented block, porque el encabezado de una instrucción compuesta debe ir seguido de un bloque indentado."],
      ["¿Puedes llamar pass a una variable?", "No. pass es una palabra clave, así que pass = 1 es un SyntaxError."],
      ["¿Qué imprime print(\"a # b\")?", "a # b. El # es parte de la cadena, no un comentario."]
    ] },
  { t: "Literals: Boolean, integer, float, scientific notation and string literals", tt: "Literales: booleanos, enteros, de punto flotante, notación científica y cadenas",
    body: [
      "Un literal es un valor escrito directamente en tu código, como `42`, `3.5`, `\"cat\"` o `True`. La forma en que lo escribes decide su tipo, que puedes comprobar con `type()`. El PCEP evalúa si puedes reconocer cada tipo de literal y predecir su tipo.",
      "Los literales enteros (tipo `int`) son números enteros sin punto decimal: `0`, `17`, `-4`. Los enteros de Python no tienen un límite de tamaño fijo; crecen tanto como lo permita la memoria. Puedes usar guiones bajos para agrupar dígitos y facilitar la lectura, así que `1_000_000` es lo mismo que `1000000`. No puedes escribir ceros a la izquierda en un entero decimal distinto de cero: `007` es un error de sintaxis (el cero inicial está reservado para prefijos como `0o`).",
      "Los literales de punto flotante (tipo `float`) contienen un punto decimal o un exponente: `3.14`, `2.0`, `.5` (que es 0.5) y `4.` (que es 4.0). La presencia del punto importa: `4` es un int y `4.0` es un float, aunque al compararlos sean iguales. La notación científica usa `e` o `E` con el significado de \"por diez elevado a la potencia de\": `3e8` es 300000000.0 y `1.5E-3` es 0.0015. Un literal escrito en notación científica siempre es un float, aunque el valor sea entero, así que `type(3e8)` es `float`. Python también puede imprimir floats muy grandes o muy pequeños en esta notación; por ejemplo, `print(0.00001)` muestra `1e-05`.",
      "Los literales de cadena (tipo `str`) son texto entre comillas simples o dobles: `'hello'` y `\"hello\"` son idénticos. Las comillas triples (`'''...'''` o `\"\"\"...\"\"\"`) permiten que el texto ocupe varias líneas. Una cadena vacía es `''`. Los dígitos entre comillas son texto, no números: `\"12\"` es una cadena, y `\"12\" + \"3\"` da `\"123\"`.",
      "Los literales booleanos son `True` y `False` (tipo `bool`). Deben escribirse con mayúscula inicial. `bool` es en realidad una subclase de `int`, así que `True` se comporta como 1 y `False` como 0 en aritmética: `True + True` es 2. Por último, `None` es un literal especial de tipo `NoneType` que significa \"sin valor\".",
      "```python\nprint(type(10), type(10.0), type(1e3))  # int, float, float\nprint(1_000 + 1)                          # 1001\nprint(True + 1)                           # 2\n```"
    ],
    terms: [
      ["Literal", "Un valor escrito directamente en el código fuente, cuya forma determina su tipo."],
      ["Scientific notation (notación científica)", "Notación de float que usa e o E para una potencia de diez, como en 6.02e23; siempre produce un float."],
      ["bool", "El tipo booleano con los valores True y False, una subclase de int donde True equivale a 1 y False a 0."],
      ["str", "El tipo de texto de Python, escrito entre comillas simples, dobles o triples."]
    ],
    example: "Un script de lista de precios guarda tax_rate = 2e-2 y quantity = 3. print(quantity * tax_rate) imprime 0.06, un float, porque el literal en notación científica 2e-2 es un float, y un int por un float da un float.",
    tip: "Fíjate en el punto decimal y en la e: 5 es int, 5.0 y 5. son float, 5e0 es float. Y \"5\" entre comillas es un str, sin importar cómo se vea.",
    check: [
      ["¿De qué tipo es 2E2 y qué valor imprime?", "float; imprime 200.0."],
      ["¿Es 1_000_000 un literal válido y a qué equivale?", "Sí. Se permiten guiones bajos entre dígitos para facilitar la lectura; equivale al int 1000000."],
      ["¿Qué resultado da True * 3?", "3, porque True se comporta como el entero 1 en aritmética."]
    ] },
  { t: "Binary, octal and hexadecimal integer literals (0b, 0o, 0x)", tt: "Literales enteros binarios, octales y hexadecimales (0b, 0o, 0x)",
    body: [
      "Las personas normalmente escribimos los números en decimal (base 10), pero las computadoras los almacenan en binario (base 2), y los programadores a menudo usan octal (base 8) y hexadecimal (base 16) como formas compactas de escribir patrones binarios. Python te permite escribir literales enteros en todas estas bases usando un prefijo. El prefijo solo cambia la forma en que escribes el número; el resultado siempre es un `int` común, y Python lo imprime en decimal.",
      "Los literales binarios empiezan con `0b` o `0B` y solo pueden contener los dígitos 0 y 1. Cada posición es una potencia de dos, así que `0b1010` significa 8 + 0 + 2 + 0, que es 10. Los literales octales empiezan con `0o` o `0O` (cero seguido de la letra o) y usan los dígitos del 0 al 7; `0o17` significa 1 x 8 + 7, que es 15. Los literales hexadecimales empiezan con `0x` o `0X` y usan los dígitos del 0 al 9 más las letras de la A a la F (en mayúscula o minúscula) para los valores del 10 al 15; `0xFF` significa 15 x 16 + 15, que es 255, y `0x10` es 16.",
      "```python\nprint(0b1010, 0o17, 0xFF, 0x10)   # 10 15 255 16\nprint(bin(10), oct(15), hex(255)) # 0b1010 0o17 0xff\nprint(int(\"ff\", 16), int(\"101\", 2))  # 255 5\n```",
      "En la dirección contraria, las funciones integradas `bin()`, `oct()` y `hex()` reciben un entero y devuelven una cadena que lo muestra en esa base, incluyendo el prefijo. Ten en cuenta que devuelven cadenas, no números, y que `hex()` usa letras minúsculas. Para convertir texto en alguna base de vuelta a un entero, usa `int()` con un segundo argumento que indique la base: `int(\"ff\", 16)` devuelve 255. Usar un dígito que no es válido para la base provoca un error: `0b102` es un error de sintaxis, e `int(\"9\", 8)` lanza `ValueError`.",
      "Una forma rápida de convertir a mano: para binario, escribe las potencias de dos desde la derecha (1, 2, 4, 8, 16, ...) encima de los dígitos y suma las que quedan sobre un 1. Para hexadecimal, cada dígito hex corresponde exactamente a cuatro dígitos binarios, por eso el hex es popular para direcciones de memoria, colores como `0xFF8800` y valores de bytes. Para octal, cada dígito equivale a tres bits, por eso todavía aparece en los permisos de archivos de Unix como `0o755`.",
      "Los números negativos también funcionan con prefijos: `-0x10` es -16. Como todos estos literales producen ints comunes, puedes mezclarlos libremente en operaciones aritméticas: `0x10 + 0b1` es 17."
    ],
    terms: [
      ["0b prefix (prefijo 0b)", "Marca un literal entero binario (base 2), que usa solo los dígitos 0 y 1."],
      ["0o prefix (prefijo 0o)", "Marca un literal entero octal (base 8), que usa los dígitos del 0 al 7."],
      ["0x prefix (prefijo 0x)", "Marca un literal entero hexadecimal (base 16), que usa del 0 al 9 y de la A a la F."],
      ["bin(), oct(), hex()", "Funciones integradas que devuelven una representación en cadena de un entero en base 2, 8 o 16, con prefijo."]
    ],
    example: "Un diseñador web guarda un color como 0x33CC99 en un script. print(0x33CC99) muestra 3394713, el mismo número en decimal, mientras que hex(3394713) devuelve la cadena '0x33cc99' para volver a ponerla en una hoja de estilos.",
    tip: "El prefijo octal es cero más la letra o (0o), no dos ceros, y un cero inicial simple como 017 es un SyntaxError en Python 3. Recuerda que bin(), oct() y hex() devuelven cadenas.",
    check: [
      ["¿Qué imprime print(0o10 + 0x10 + 0b10)?", "26, porque 0o10 es 8, 0x10 es 16 y 0b10 es 2."],
      ["¿De qué tipo es hex(31)?", "str. Devuelve la cadena '0x1f'."],
      ["¿Es válido 0b21?", "No. Los literales binarios solo pueden contener 0 y 1, así que es un SyntaxError."]
    ] },
  { t: "Variables and naming rules, reserved keywords and PEP 8 naming conventions", tt: "Variables y reglas de nombres, palabras clave reservadas y convenciones de nombres de PEP 8",
    body: [
      "Una variable es un nombre que hace referencia a un valor almacenado en memoria. En Python creas una variable simplemente asignándole algo: `age = 30`. No hay una declaración separada ni un tipo fijo unido al nombre; el valor es el que lleva el tipo, y el mismo nombre puede después hacer referencia a un valor de otro tipo (`age = \"thirty\"` es legal). Usar una variable antes de haberle asignado un valor lanza `NameError`.",
      "Las reglas legales para los nombres son estrictas y se evalúan en el examen. Un nombre puede contener letras, dígitos y guiones bajos. No debe empezar con un dígito, así que `2cats` es ilegal pero `cats2` está bien. Puede empezar con un guion bajo, como en `_total`. No debe contener espacios, guiones medios ni otros símbolos: `my-var` se lee como `my` menos `var`. No debe ser una palabra clave como `class`, `for` o `None`. Los nombres distinguen entre mayúsculas y minúsculas, así que `Total`, `total` y `TOTAL` son tres variables diferentes. Python 3 también permite letras que no son del inglés en los nombres, aunque rara vez es buena idea.",
      "Un punto sutil: los nombres de funciones integradas como `print`, `list`, `str` o `input` no son palabras clave, así que Python te permite asignarles valores. Hacerlo oculta (shadowing) la función integrada. Después de `list = [1, 2]`, llamar a `list(\"abc\")` falla con `TypeError` porque `list` ahora hace referencia a tu objeto lista. Evita reutilizar los nombres integrados.",
      "PEP 8 es la guía de estilo oficial para código Python. El intérprete no obliga a seguir sus convenciones de nombres, pero son lo que otros programadores esperan y a lo que se refiere el examen. Las variables y funciones usan palabras en minúsculas separadas por guiones bajos (snake_case): `total_price`, `get_input()`. Las constantes, que son variables comunes que prometes no cambiar, usan mayúsculas con guiones bajos: `MAX_SIZE = 100`. Los nombres de clases usan CapWords (también llamado CamelCase): `BankAccount`. Evita los nombres de un solo carácter `l`, `O` e `I` porque se parecen a dígitos.",
      "```python\nuser_name = \"Ana\"   # bien: snake_case\nMAX_RETRIES = 3       # constante por convención\n_count = 0            # legal: guion bajo inicial\n# 3rd_place = 1       # SyntaxError: empieza con un dígito\n# my var = 1          # SyntaxError: contiene un espacio\n```",
      "La asignación funciona de derecha a izquierda: primero se evalúa la expresión de la derecha y luego el nombre de la izquierda se vincula al resultado. Por eso `x = x + 1` tiene sentido en programación aunque sea falso en álgebra. También puedes asignar varios nombres a la vez: `a, b = 1, 2` vincula ambos, y `a, b = b, a` los intercambia."
    ],
    terms: [
      ["Variable", "Un nombre vinculado a un valor mediante asignación; el valor, no el nombre, es el que tiene un tipo."],
      ["Identifier (identificador)", "Cualquier nombre que creas; debe usar letras, dígitos y guiones bajos, y no debe empezar con un dígito ni ser una palabra clave."],
      ["PEP 8", "La guía de estilo oficial de Python, que recomienda snake_case para variables y funciones y UPPER_CASE para constantes."],
      ["Shadowing a built-in (ocultar una función integrada)", "Asignar un valor a un nombre integrado como list o str, lo que oculta la función original en ese ámbito."]
    ],
    example: "Un principiante llama sum = 0 a una variable y luego llama a sum([1, 2, 3]), obteniendo TypeError: 'int' object is not callable. Renombrar la variable a total restaura la función integrada sum() y, al mismo tiempo, sigue PEP 8.",
    tip: "Que algo sea legal y que siga la convención son preguntas distintas. Las preguntas del examen pueden pedirte qué nombres son inválidos (empiezan con dígito, tienen guion medio, espacio o son palabra clave) frente a cuáles rompen PEP 8 pero igual funcionan (por ejemplo, MyVariable para una variable).",
    check: [
      ["¿Cuáles de estos nombres son legales: _x, x_1, 1_x, x-1, While?", "_x, x_1 y While son legales (While se diferencia de la palabra clave while por la mayúscula). 1_x empieza con un dígito y x-1 contiene un guion medio, así que ambos son ilegales."],
      ["¿Python te impide cambiar una constante llamada PI?", "No. Nombrar en mayúsculas es solo una convención de PEP 8; el intérprete te deja reasignarla."],
      ["Después de a, b = 3, 5 y a, b = b, a, ¿cuánto valen a y b?", "a vale 5 y b vale 3; primero se construye la tupla del lado derecho y luego se desempaqueta."]
    ] },
  { t: "Numeric operators: ** * / % // + - and the difference between / and //", tt: "Operadores numéricos: ** * / % // + - y la diferencia entre / y //",
    body: [
      "Los operadores aritméticos de Python son `+` (suma), `-` (resta), `*` (multiplicación), `/` (división real), `//` (división entera o floor division), `%` (resto, llamado módulo) y `**` (exponenciación). Al examen PCEP le encantan, sobre todo los tres relacionados con la división, así que necesitas predecir tanto el valor como el tipo de cada resultado.",
      "La regla de tipos es sencilla para la mayoría de los operadores: si ambos operandos son `int`, el resultado es `int`; si alguno es `float`, el resultado es `float`. Así, `3 + 4` es 7 pero `3 + 4.0` es 7.0. La gran excepción es `/`: la división real siempre devuelve un float, incluso cuando la división es exacta. `6 / 3` es 2.0, no 2.",
      "La división entera `//` divide y luego redondea hacia abajo, hacia menos infinito, dando el mayor número entero que no supera el cociente real. Con dos ints el resultado es un int; con cualquier float es un float con valor entero. `7 // 2` es 3 y `7.0 // 2` es 3.0. Redondear hacia abajo importa con los negativos: `-7 // 2` es -4, no -3, porque -3.5 redondeado hacia menos infinito es -4. No simplemente corta la parte decimal.",
      "El operador `%` da el resto que acompaña a la división entera, y Python garantiza que `(a // b) * b + (a % b) == a`. Así, `7 % 2` es 1 y `-7 % 2` es 1 (porque -4 x 2 + 1 = -7). El resultado toma el signo del divisor: `7 % -2` es -1. Usos comunes son comprobar si un número es par (`n % 2 == 0`) y hacer que los valores den la vuelta dentro de un rango.",
      "```python\nprint(7 / 2, 7 // 2, 7 % 2)     # 3.5 3 1\nprint(-7 // 2, -7 % 2)          # -4 1\nprint(6 / 3, 2 ** 3, 2 ** -1)   # 2.0 8 0.5\nprint(10 // 0.3)                # 33.0\n```",
      "La exponenciación `**` eleva el operando izquierdo a la potencia del derecho: `2 ** 10` es 1024. Con operandos int y un exponente no negativo el resultado es un int; un exponente negativo da un float (`2 ** -1` es 0.5). Dividir entre cero con `/`, `//` o `%` lanza `ZeroDivisionError`, ya sean los operandos ints o floats.",
      "Los operadores unarios `+` y `-` se aplican a un solo operando, como en `-x`. Los `+` y `-` binarios combinan dos. Mantenlos separados en tu mente, porque tienen prioridades distintas, algo que cubre la lección sobre prioridad de operadores."
    ],
    terms: [
      ["True division (/) (división real)", "División que siempre devuelve un float, incluso para resultados exactos como 4 / 2 = 2.0."],
      ["Floor division (//) (división entera)", "División redondeada hacia abajo, hacia menos infinito; int con dos ints, float en otro caso."],
      ["Modulo (%) (módulo)", "El resto que acompaña a la división entera; en Python toma el signo del divisor."],
      ["Exponentiation (**) (exponenciación)", "Eleva el operando izquierdo a la potencia del operando derecho."]
    ],
    example: "Un script reparte 17 galletas entre 5 niños: 17 // 5 da 3 galletas para cada uno y 17 % 5 da 2 sobrantes. Si hubiera usado 17 / 5 obtendría 3.4, que no sirve para contar galletas enteras.",
    tip: "Dos trampas clásicas: / siempre devuelve un float, y // redondea hacia menos infinito, así que -7 // 2 es -4. Revisa dos veces cada pregunta de división entera o módulo con negativos.",
    check: [
      ["¿Qué devuelven 9 / 3 y 9 // 3?", "9 / 3 devuelve 3.0 (float); 9 // 3 devuelve 3 (int)."],
      ["¿Cuánto es -9 % 4?", "3, porque -9 // 4 es -3 y -3 x 4 + 3 = -9."],
      ["¿Cuál es el tipo y el valor de 7.5 // 2?", "float 3.0; la división entera con un operando float da un float de valor entero."]
    ] },
  { t: "String operators (+ and *), assignment and compound assignment operators (+=, *=, etc.)", tt: "Operadores de cadenas (+ y *), asignación y operadores de asignación compuesta (+=, *=, etc.)",
    body: [
      "Dos símbolos aritméticos también funcionan con cadenas, con significados distintos. El operador `+` concatena (une) dos cadenas: `\"snow\" + \"ball\"` da `\"snowball\"`. El operador `*` replica una cadena un número entero de veces: `\"ab\" * 3` da `\"ababab\"`. El orden de los operandos de `*` no importa, así que `3 * \"ab\"` es lo mismo. Multiplicar por cero o por un número negativo da una cadena vacía `\"\"`.",
      "Estos operadores son estrictos con los tipos. Ambos operandos de `+` deben ser cadenas, así que `\"Age: \" + 30` lanza `TypeError`; primero debes convertir con `\"Age: \" + str(30)`. Para `*`, un operando debe ser una cadena y el otro un int; `\"ab\" * 2.0` lanza `TypeError` porque no puedes repetir algo 2.0 veces, y `\"ab\" * \"2\"` también falla. Los mismos dos operadores funcionan con listas y tuplas: `[0] * 3` es `[0, 0, 0]`.",
      "El operador de asignación simple `=` vincula el nombre de su izquierda al valor de la expresión de su derecha. Es una instrucción, no una comparación; para comparar se usa `==`. Python también admite la asignación encadenada, `a = b = 0`, que vincula ambos nombres al mismo valor, y la asignación múltiple, `x, y = 1, 2`.",
      "Los operadores de asignación compuesta (aumentada) combinan una operación con la asignación. `x += 5` significa `x = x + 5`, y el mismo patrón existe para `-=`, `*=`, `/=`, `//=`, `%=` y `**=`, además de las formas a nivel de bits `&=`, `|=`, `^=`, `<<=` y `>>=`. La variable ya debe existir; `count += 1` sobre un `count` no definido lanza `NameError`. Las reglas de tipos del operador subyacente siguen aplicándose, así que después de `x = 10` y `x /= 2`, `x` es el float 5.0.",
      "```python\ns = \"ha\"\ns *= 3          # s = s * 3\nprint(s)        # hahaha\nn = 7\nn //= 2         # n = n // 2\nn **= 2         # n = n ** 2\nprint(n)        # 9\n```",
      "Un punto sutil que le gusta al examen: el lado derecho de una asignación compuesta se evalúa por completo antes de la operación. Así, `x *= 2 + 3` significa `x = x * (2 + 3)`, no `x = x * 2 + 3`. Si `x` es 4, el resultado es 20, no 11.",
      "Las cadenas son inmutables, así que `s += \"!\"` no cambia el objeto cadena original; construye una cadena nueva y vuelve a vincular `s` a ella. En programas sencillos no verás diferencia, pero esto explica por qué otros nombres vinculados a la cadena anterior no se ven afectados."
    ],
    terms: [
      ["Concatenation (concatenación)", "Unir dos cadenas con +, lo que produce una cadena nueva."],
      ["Replication (replicación)", "Repetir una cadena (o lista) con * y un número entero de veces."],
      ["Compound assignment (asignación compuesta)", "Un operador como += o //= que aplica una operación y vuelve a vincular la variable al resultado."],
      ["Chained assignment (asignación encadenada)", "Vincular varios nombres a un mismo valor en una sola instrucción, como en a = b = 0."]
    ],
    example: "Un juego de consola dibuja un borde con print(\"-\" * 20) y arma un mensaje de puntaje con \"Score: \" + str(points). Cuando un jugador gana una ronda, actualiza points += 10 en lugar de escribir points = points + 10.",
    tip: "Espera una pregunta donde se suma un número a una cadena. \"3\" + 4 es un TypeError, \"3\" * 4 es \"3333\", y x *= 2 + 1 multiplica por 3, porque primero se evalúa todo el lado derecho.",
    check: [
      ["¿Qué muestra print(\"=\" * 0 + \"x\")?", "x. Replicar por cero da una cadena vacía y luego se concatena \"x\"."],
      ["Si a = 3 y ejecutas a **= 1 + 1, ¿cuánto vale a?", "9. Primero se evalúa el lado derecho 1 + 1 y luego a = a ** 2."],
      ["¿Por qué falla \"Total: \" + 5?", "+ no puede unir un str y un int, así que Python lanza TypeError. Primero convierte con str(5)."]
    ] },
  { t: "Operator priority and binding, including right-to-left ** and unary minus", tt: "Prioridad y asociatividad de operadores, incluido ** de derecha a izquierda y el menos unario",
    body: [
      "Cuando una expresión contiene varios operadores, Python usa la prioridad (también llamada precedencia) para decidir qué operaciones ocurren primero, y la asociatividad (binding) para decidir el orden entre operadores de la misma prioridad. Los paréntesis anulan ambas cosas, así que cuando tengas dudas, agrégalos. Sin embargo, el examen te da expresiones sin paréntesis que ayuden y te pregunta el resultado.",
      "El orden que necesitas para el PCEP, de mayor a menor prioridad, es: `**`; luego `+`, `-` y `~` unarios; luego `*`, `/`, `//` y `%`; luego `+` y `-` binarios; luego los desplazamientos `<<` y `>>`; luego `&`; luego `^`; luego `|`; luego los operadores de comparación (`==`, `!=`, `<`, `<=`, `>`, `>=`, además de `in`, `not in`, `is`, `is not`); luego `not`; luego `and`; y por último `or`. Los operadores de asignación no forman parte de las expresiones; se aplican al final.",
      "La mayoría de los operadores se asocian de izquierda a derecha. `10 - 4 - 3` es `(10 - 4) - 3`, que es 3, y `100 / 10 / 5` es 2.0. La excepción notable es `**`, que se asocia de derecha a izquierda. Así, `2 ** 3 ** 2` es `2 ** (3 ** 2)`, que es `2 ** 9`, o sea 512, no `8 ** 2` (64).",
      "El menos unario tiene una relación inusual con `**`. Como `**` tiene mayor prioridad que un menos unario a su izquierda, `-2 ** 2` es `-(2 ** 2)`, que es -4. Para elevar al cuadrado el menos dos debes escribir `(-2) ** 2`, que es 4. Sin embargo, del lado derecho de `**` sí se permite un operador unario, y se aplica al exponente: `2 ** -1` es 0.5. En comparación con la multiplicación, el menos unario se asocia con más fuerza: `-3 * 2` es `(-3) * 2`, que da el mismo valor de cualquier forma, pero con `-2 ** 2` es donde importa.",
      "```python\nprint(2 ** 3 ** 2)      # 512  (de derecha a izquierda)\nprint(-2 ** 2)          # -4   (** antes del menos unario)\nprint((-2) ** 2)        # 4\nprint(2 + 3 * 4 ** 2)   # 50\nprint(17 % 5 * 2 // 3)  # 1   ((17 % 5) * 2) // 3 = 4 // 3\n```",
      "Para evaluar una expresión complicada, trabaja por pasadas: primero resuelve los paréntesis, luego cada `**` de derecha a izquierda, luego los signos unarios, luego `*`, `/`, `//` y `%` de izquierda a derecha, luego `+` y `-` de izquierda a derecha, y así sucesivamente. Anotar cada resultado intermedio es la técnica más confiable para el examen."
    ],
    terms: [
      ["Priority (precedence) (prioridad, precedencia)", "La regla que decide qué operadores se aplican primero en una expresión."],
      ["Binding (associativity) (asociatividad)", "El orden en que se aplican los operadores de igual prioridad, normalmente de izquierda a derecha."],
      ["Right-to-left binding (asociatividad de derecha a izquierda)", "El comportamiento de **, de modo que a ** b ** c significa a ** (b ** c)."],
      ["Unary operator (operador unario)", "Un operador con un solo operando, como -x, +x o ~x."]
    ],
    example: "Un script de física calcula una energía con -g ** 2 esperando el cuadrado positivo de una constante negativa. Como ** se ejecuta antes del menos unario, obtiene un resultado negativo; escribir (-g) ** 2 o simplemente g ** 2 corrige el error.",
    tip: "Memoriza las dos excepciones: ** se asocia de derecha a izquierda, y ** le gana a un menos unario a su izquierda. Todo lo demás en el mismo nivel se ejecuta de izquierda a derecha, así que % * // / se aplican estrictamente en orden de lectura.",
    check: [
      ["¿Qué imprime print(-3 ** 2)?", "-9, porque 3 ** 2 se evalúa antes que el menos unario."],
      ["¿Cuánto es 2 ** 2 ** 3?", "256, porque ** se asocia de derecha a izquierda: 2 ** (2 ** 3) = 2 ** 8."],
      ["Evalúa 10 - 2 * 3 // 4.", "9. 2 * 3 es 6, 6 // 4 es 1, y luego 10 - 1 es 9."]
    ] },
  { t: "Bitwise operators: ~ & ^ | << >>", tt: "Operadores a nivel de bits: ~ & ^ | << >>",
    body: [
      "Los operadores a nivel de bits (bitwise) trabajan sobre los dígitos binarios individuales (bits) de los enteros, en lugar de sobre sus valores completos. Solo aceptan enteros (y booleanos, que son enteros); usarlos con floats lanza `TypeError`. Los encontrarás en trabajo de bajo nivel como banderas (flags), permisos y máscaras de red, y el examen comprueba que puedas calcularlos a mano.",
      "Los operadores binarios comparan dos números bit por bit. `&` (AND) da 1 solo donde ambos bits son 1. `|` (OR) da 1 donde al menos un bit es 1. `^` (XOR, o exclusivo) da 1 donde los bits son diferentes. Toma 6 (binario 110) y 3 (binario 011): `6 & 3` es 010, que es 2; `6 | 3` es 111, que es 7; `6 ^ 3` es 101, que es 5. Alinea los números en binario, trabaja columna por columna y vuelve a convertir.",
      "El operador unario `~` (NOT, o negación a nivel de bits) invierte cada bit. Como los enteros de Python se comportan con complemento a dos para los negativos, la regla práctica es `~x == -x - 1`. Así, `~6` es -7, `~0` es -1 y `~-1` es 0. No confundas `~` con el `not` lógico: `not 6` es `False`, mientras que `~6` es -7.",
      "Los operadores de desplazamiento mueven los bits a la izquierda o a la derecha. `x << n` desplaza a la izquierda n posiciones, rellenando con ceros, lo que multiplica por 2 elevado a n: `6 << 1` es 12 y `1 << 4` es 16. `x >> n` desplaza a la derecha, descartando los bits más bajos, lo que hace una división entera entre 2 elevado a n: `6 >> 1` es 3 y `13 >> 2` es 3. Para números negativos, el desplazamiento a la derecha también redondea hacia abajo, así que `-5 >> 1` es -3.",
      "```python\na, b = 12, 10          # 1100 y 1010\nprint(a & b, a | b, a ^ b)  # 8 14 6\nprint(~a, a << 2, a >> 2)   # -13 48 3\n```",
      "Recuerda sus prioridades: `~` está con los signos unarios, justo debajo de `**`; los desplazamientos van después de `+` y `-`; luego `&`, luego `^`, luego `|`, todos por encima de las comparaciones. Así, `1 + 2 << 1` es `(1 + 2) << 1`, que es 6, y `5 & 3 == 1` significa `(5 & 3) == 1`, que es `True`, porque `&` tiene mayor prioridad que `==`.",
      "Un uso común es la máscara de bits (bit mask): para comprobar si el bit 2 de `flags` está activado, revisa `flags & 4 != 0`; para activarlo, usa `flags |= 4`; para desactivarlo, `flags &= ~4`; para alternarlo, `flags ^= 4`."
    ],
    terms: [
      ["Bitwise AND (&) (AND a nivel de bits)", "Produce 1 en cada posición de bit donde ambos operandos tienen 1."],
      ["Bitwise XOR (^) (XOR a nivel de bits)", "Produce 1 en cada posición de bit donde los operandos son diferentes."],
      ["Bitwise NOT (~) (NOT a nivel de bits)", "Invierte todos los bits; para los ints de Python, ~x es igual a -x - 1."],
      ["Shift (<< >>) (desplazamiento)", "Mueve los bits a la izquierda o a la derecha, multiplicando o haciendo división entera por potencias de dos."]
    ],
    example: "Se revisa un valor de permisos de archivo 0o755 para saber si el propietario tiene permiso de escritura con (mode & 0o200) != 0. El & enmascara todos los bits excepto el que se está probando, así que el resultado es distinto de cero solo si ese permiso está activado.",
    tip: "La ruta más rápida para las preguntas con ~ es la fórmula ~x = -x - 1. Para & | ^, convierte siempre a binario y alinea las columnas; adivinar a partir de los valores decimales es donde ocurren los errores.",
    check: [
      ["¿Cuánto es 5 ^ 3?", "6. 101 XOR 011 es 110."],
      ["¿Qué devuelve ~5?", "-6, porque ~x es igual a -x - 1."],
      ["¿Cuánto es 20 >> 2?", "5, lo mismo que 20 // 4."]
    ] },
  { t: "Boolean and relational operators, float accuracy and rounding surprises", tt: "Operadores booleanos y relacionales, precisión de los floats y sorpresas al redondear",
    body: [
      "Los operadores relacionales (de comparación) comparan dos valores y devuelven un booleano: `==` igual, `!=` distinto, `<` menor que, `>` mayor que, `<=` menor o igual que, y `>=` mayor o igual que. Ten en cuenta que `=` asigna mientras que `==` compara. Los números de tipos distintos se comparan por valor, así que `1 == 1.0` es `True` y `True == 1` también es `True`. Las cadenas se comparan carácter por carácter usando los códigos de los caracteres, así que `\"B\" < \"a\"` es `True` porque las letras mayúsculas van antes que las minúsculas. Comparar una cadena con un número usando `<` lanza `TypeError`, aunque `==` simplemente devuelve `False`.",
      "Python permite comparaciones encadenadas: `1 < x < 10` significa `1 < x and x < 10`, y `x` se evalúa una sola vez. Se lee de forma natural y aparece seguido en el examen. `a == b == c` es `True` solo cuando los tres son iguales.",
      "Los operadores lógicos (booleanos) combinan condiciones. `and` es verdadero solo cuando ambos lados son verdaderos; `or` es verdadero cuando al menos un lado lo es; `not` invierte un solo valor. Su prioridad, de mayor a menor, es `not`, luego `and`, luego `or`, todos por debajo de las comparaciones. Así, `not a == b` significa `not (a == b)`, y `a or b and c` significa `a or (b and c)`. Tanto `and` como `or` hacen cortocircuito (short-circuit): se detienen en cuanto se conoce la respuesta, algo que explora la siguiente lección sobre valores verdaderos y falsos.",
      "Los floats se almacenan en binario con una cantidad limitada de bits, así que la mayoría de las fracciones decimales, como 0.1, no pueden representarse con exactitud. Aparecen pequeños errores: `0.1 + 0.2` imprime `0.30000000000000004`, y `0.1 + 0.2 == 0.3` es `False`. No es un error de Python; ocurre en casi todos los lenguajes. Cuando compares floats, comprueba si la diferencia es diminuta, por ejemplo `abs(a - b) < 1e-9`, en lugar de usar `==`.",
      "```python\nprint(0.1 + 0.2 == 0.3)            # False\nprint(abs(0.1 + 0.2 - 0.3) < 1e-9) # True\nprint(round(2.5), round(3.5))      # 2 4\nprint(round(3.14159, 2))           # 3.14\n```",
      "La función integrada `round()` tiene su propia sorpresa. Con un argumento devuelve un int, redondeando las mitades al número par más cercano (redondeo bancario): `round(0.5)` es 0, `round(1.5)` es 2 y `round(2.5)` es 2. Con un segundo argumento redondea a esa cantidad de decimales y devuelve un float, pero por la representación binaria algunos valores que parecen mitades están ligeramente por debajo, así que resultados como `round(2.675, 2)` dando 2.67 pueden sorprenderte. Recuerda también que `int()` trunca hacia cero en lugar de redondear: `int(2.9)` es 2."
    ],
    terms: [
      ["Relational operator (operador relacional)", "Un operador como ==, != o <= que compara dos valores y devuelve True o False."],
      ["Chained comparison (comparación encadenada)", "Una expresión como 0 <= x < 5, equivalente a dos comparaciones unidas por and."],
      ["Floating-point error (error de punto flotante)", "La pequeña imprecisión causada por almacenar fracciones decimales en binario, como en 0.1 + 0.2."],
      ["Banker's rounding (redondeo bancario)", "La regla de round() de enviar las mitades exactas al entero par más cercano."]
    ],
    example: "Un script de una tienda comprueba si total == 0.3 después de sumar artículos de 0.1 y 0.2, y nunca entra en la rama del descuento. Cambiar la prueba a abs(total - 0.3) < 1e-9, o trabajar en centavos enteros como ints, hace que funcione correctamente.",
    tip: "Si un fragmento del examen compara sumas de floats con ==, sospecha que el resultado es False. Si llama a round() con un valor .5, recuerda el redondeo de la mitad al par: round(2.5) es 2 y round(3.5) es 4.",
    check: [
      ["¿Qué imprime print(3 < 5 > 4)?", "True. Equivale a 3 < 5 and 5 > 4, y ambas son verdaderas."],
      ["¿Cuánto es round(4.5)?", "4, porque las mitades exactas se redondean al entero par más cercano."],
      ["¿Cómo se agrupa not 1 == 2?", "Como not (1 == 2), porque las comparaciones tienen mayor prioridad que not; el resultado es True."]
    ] },
  { t: "Type casting with int(), float(), str() and bool()", tt: "Conversión de tipos con int(), float(), str() y bool()",
    body: [
      "La conversión de tipos (type casting) significa crear un valor de un tipo a partir de un valor de otro. Python hace algunas conversiones automáticamente, por ejemplo convertir un int en float cuando sumas `2 + 0.5`, pero nunca convierte en silencio una cadena en número ni un número en cadena. Para eso llamas a una función de conversión: `int()`, `float()`, `str()` o `bool()`. Cada una devuelve un valor nuevo; el original no cambia.",
      "`int(x)` construye un entero. A partir de un float trunca hacia cero, descartando la parte fraccionaria en lugar de redondear: `int(3.9)` es 3 e `int(-3.9)` es -3. A partir de una cadena solo acepta texto que parezca un número entero, opcionalmente con signo y espacios alrededor: `int(\" 42 \")` es 42, pero `int(\"4.2\")` e `int(\"abc\")` lanzan `ValueError`. A partir de un booleano, `int(True)` es 1. Con un segundo argumento lee otras bases: `int(\"1f\", 16)` es 31.",
      "`float(x)` construye un float. `float(7)` es 7.0, `float(\"3.5\")` es 3.5, `float(\"1e3\")` es 1000.0 y `float(\" -2 \")` es -2.0. El texto no numérico lanza `ValueError`. Para convertir la cadena `\"4.2\"` en int, pasa primero por float: `int(float(\"4.2\"))` da 4.",
      "`str(x)` produce el texto que mostraría `print()`: `str(10)` es `\"10\"`, `str(2.50)` es `\"2.5\"`, `str(True)` es `\"True\"` y `str(None)` es `\"None\"`. Es la forma de unir números en mensajes con `+`.",
      "`bool(x)` aplica las reglas de veracidad (truthiness) de Python. Devuelve `False` para los valores cero y las cosas vacías: `0`, `0.0`, `\"\"` (cadena vacía), `[]`, `()`, `{}` y `None`. Todo lo demás es `True`, incluidos los números negativos, `\" \"` (un espacio) y la cadena `\"False\"`, porque esa cadena no está vacía. Sin argumentos, `bool()` es `False`, `int()` es 0, `float()` es 0.0 y `str()` es `\"\"`.",
      "```python\nprint(int(7.99), int(\"-12\"), float(\"2\"))  # 7 -12 2.0\nprint(str(3) + str(4))                     # 34\nprint(bool(\"False\"), bool(0.0), bool(-1)) # True False True\n```",
      "Errores que debes reconocer: `ValueError` cuando el valor tiene el tipo correcto pero un contenido inutilizable (`int(\"ten\")`), y `TypeError` cuando el tipo en sí no se acepta (`int([1, 2])` o `int(None)`)."
    ],
    terms: [
      ["Type casting (conversión de tipos)", "Convertir explícitamente un valor a otro tipo con una función como int() o str()."],
      ["Truncation (truncamiento)", "Descartar la parte fraccionaria hacia cero, como hace int() con los floats."],
      ["Truthiness (veracidad)", "La regla que usa bool(): el cero, lo vacío y None son False; todo lo demás es True."],
      ["ValueError", "Se lanza cuando una función de conversión recibe el tipo correcto pero un valor inutilizable, como int(\"3.7\")."]
    ],
    example: "Un formulario recoge una estatura como el texto \"1.82\". int(\"1.82\") falla con ValueError, así que el programa usa float(\"1.82\") para los cálculos y str(round(h * 100)) + \" cm\" para mostrarla.",
    tip: "int() nunca redondea; trunca hacia cero y rechaza las cadenas que contienen un punto decimal. bool() de cualquier cadena no vacía, incluso \"0\" o \"False\", es True.",
    check: [
      ["¿Qué devuelve int(-2.7)?", "-2, porque int() trunca hacia cero."],
      ["¿Cuánto es bool(\"0\")?", "True, ya que la cadena no está vacía."],
      ["¿Qué error lanza float(\"12a\")?", "ValueError: el argumento es una cadena (un tipo aceptable) pero su contenido no es un número."]
    ] },
  { t: "Console I/O: print() with sep= and end=, input() returning a string, converting input to numbers", tt: "Entrada y salida por consola: print() con sep= y end=, input() que devuelve una cadena, convertir la entrada a números",
    body: [
      "Los programas de consola se comunican con el usuario mediante dos funciones integradas: `print()` para la salida e `input()` para la entrada. Ambas aparecen constantemente en las preguntas del PCEP, normalmente como \"¿qué se imprime exactamente?\"",
      "`print()` acepta cualquier número de argumentos posicionales de cualquier tipo. Convierte cada uno a texto (como lo haría `str()`), los une con un separador y agrega un final. Por defecto el separador es un solo espacio y el final es un salto de línea, así que `print(\"a\", 1, True)` imprime `a 1 True` seguido de un salto de línea. Llamar a `print()` sin argumentos imprime solo una línea vacía.",
      "Dos argumentos de palabra clave cambian ese comportamiento. `sep=` define la cadena que se coloca entre los argumentos: `print(1, 2, 3, sep=\"-\")` imprime `1-2-3`, y `sep=\"\"` elimina los espacios. `end=` define lo que se imprime después del último argumento: `print(\"Hi\", end=\"\")` imprime sin pasar a una nueva línea, así que el siguiente print continúa en la misma línea. Estos deben pasarse por palabra clave y deben ir después de los argumentos posicionales. El separador solo va entre argumentos, así que con un solo argumento `sep` no tiene efecto visible.",
      "```python\nprint(\"a\", \"b\", sep=\"*\", end=\"!\\n\")  # a*b!\nprint(\"x\", end=\" \")\nprint(\"y\")                              # x y\nprint(\"one\\ntwo\")                       # dos líneas\n```",
      "`input()` pausa el programa, opcionalmente muestra una cadena de aviso (prompt) que le pasas (`input(\"Name: \")`), y espera a que el usuario presione Enter. Devuelve todo lo que escribió, sin el salto de línea final, como una cadena. Siempre devuelve un `str`, aunque el usuario escriba dígitos. Esa es la fuente de muchos errores: `age = input(\"Age: \")` seguido de `age + 1` lanza `TypeError`, e `input() * 2` repite el texto en lugar de duplicar un número.",
      "Para obtener números, envuelve la llamada en una función de conversión: `age = int(input(\"Age: \"))` o `price = float(input(\"Price: \"))`. Si el usuario escribe algo que no se puede convertir, como `abc`, o `3.5` para `int()`, se lanza un `ValueError`, que podrás manejar con try-except cuando llegues al dominio de excepciones.",
      "Una pregunta clásica del examen combina todo esto: si el usuario ingresa 2 y 3 para `a = input()` y `b = input()`, entonces `print(a + b)` muestra `23` (concatenación de cadenas), mientras que `print(int(a) + int(b))` muestra `5`."
    ],
    terms: [
      ["sep=", "Argumento de palabra clave de print() que indica la cadena insertada entre los argumentos; por defecto es un solo espacio."],
      ["end=", "Argumento de palabra clave de print() que indica la cadena impresa después del último argumento; por defecto es un salto de línea."],
      ["input()", "Función integrada que lee una línea del usuario y siempre la devuelve como cadena."],
      ["Prompt (mensaje de aviso)", "La cadena opcional que se pasa a input() y se muestra antes de que el usuario escriba."]
    ],
    example: "Una calculadora de propinas pide bill = float(input(\"Bill: \")) y pct = int(input(\"Tip %: \")), y luego imprime print(\"Tip:\", round(bill * pct / 100, 2), end=\" dollars\\n\") para que el resultado se lea de forma natural en una sola línea.",
    tip: "Cuando una pregunta use input(), asume que es una cadena hasta que veas int() o float(). Con print(), cuenta los separadores con cuidado: sep aparece solo entre argumentos, y end aparece una vez, al final de todo.",
    check: [
      ["¿Qué muestra print(1, 2, sep=\"\", end=\"3\") seguido de print(4)?", "1234 en una línea y luego un salto de línea: 12 de la primera llamada sin separador, 3 como su final, y luego 4 de la segunda llamada."],
      ["Si el usuario escribe 5, ¿qué muestra print(input() * 2)?", "55, porque input() devuelve la cadena \"5\" y * la replica."],
      ["¿Qué hace int(input()) cuando el usuario escribe 7.0?", "Lanza ValueError, porque int() no puede interpretar una cadena que contiene un punto decimal."]
    ] },
  { t: "If, if-else and if-elif-else statements, and why the order of elif conditions matters", tt: "Instrucciones if, if-else e if-elif-else, y por qué importa el orden de las condiciones elif",
    body: [
      "Las instrucciones condicionales permiten que un programa elija qué hacer según los datos. La forma más simple es `if`: una línea de encabezado con una condición y dos puntos, seguida de un bloque indentado. Si la condición es verdadera, el bloque se ejecuta; si no, Python lo salta y continúa después del bloque.",
      "Agregar `else` da una elección de dos caminos. La línea `else:` está a la misma indentación que su `if` y no tiene condición propia; su bloque se ejecuta exactamente cuando la condición del `if` es falsa. Uno de los dos bloques siempre se ejecuta, nunca ambos.",
      "Para más de dos caminos, usa `elif` (abreviatura de \"else if\"). Python prueba primero la condición del `if` y luego cada condición `elif` en orden de arriba hacia abajo. En cuanto una condición es verdadera, su bloque se ejecuta y toda la instrucción termina; las condiciones posteriores ni siquiera se evalúan. Un `else` final opcional atrapa todos los casos donde nada coincidió. Puedes tener cualquier cantidad de ramas `elif` pero como máximo un `else`, y debe ir al final.",
      "```python\nscore = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"   # esta se ejecuta; las demás se saltan\nelif score >= 70:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(grade)       # B\n```",
      "Como solo se ejecuta la primera rama verdadera, el orden de las condiciones `elif` importa cada vez que las condiciones se superponen. En el ejemplo de calificaciones, una puntuación de 95 también cumple `score >= 80` y `score >= 70`, pero obtiene una A porque esa prueba va primero. Si invirtieras el orden y comprobaras primero `score >= 70`, toda puntuación aprobatoria obtendría una C y las ramas A y B nunca serían alcanzables. La regla práctica: con rangos superpuestos, prueba primero la condición más específica o más restrictiva.",
      "Compara eso con una serie de instrucciones `if` separadas. Cada `if` independiente se prueba por sí solo, así que pueden ejecutarse varios bloques. Las preguntas del examen a menudo muestran ambas versiones lado a lado y preguntan cuántas líneas se imprimen. Con `if` seguido de `elif`, se ejecuta como máximo un bloque; con `if` seguido de `if`, cada condición verdadera ejecuta su bloque.",
      "Las condiciones no tienen que ser comparaciones. Cualquier expresión funciona, y Python evalúa su veracidad, así que `if items:` significa \"si la lista no está vacía\". El cuerpo puede ser una o más instrucciones; un cuerpo corto también puede escribirse en la línea del encabezado, como en `if x: print(x)`, aunque PEP 8 lo desaconseja."
    ],
    terms: [
      ["if statement (instrucción if)", "Ejecuta su bloque indentado solo cuando su condición es verdadera."],
      ["elif", "Una condición adicional que se prueba solo si todas las condiciones anteriores de la misma instrucción fueron falsas."],
      ["else", "La rama que se ejecuta cuando ninguna condición if o elif anterior fue verdadera; no lleva condición."],
      ["Overlapping conditions (condiciones superpuestas)", "Condiciones que pueden ser verdaderas al mismo tiempo, lo que hace que el orden de las ramas elif sea importante."]
    ],
    example: "Un script de envíos comprueba weight > 20 para carga pesada, luego weight > 5 para paquete, y si no, carta. Si un desarrollador mueve la prueba weight > 5 al principio, una caja de 30 kg se cobra como paquete, porque gana la primera rama verdadera y nunca se llega a la rama de carga pesada.",
    tip: "Cuenta cuántas ramas pueden ejecutarse. Una cadena if-elif-else ejecuta exactamente un bloque (o ninguno si no hay else); una pila de ifs separados puede ejecutar varios. Esa sola distinción responde muchas preguntas de salida del PCEP.",
    check: [
      ["Con x = 15, ¿qué imprime if x > 10: print(\"A\") elif x > 5: print(\"B\")?", "Solo A. Se ejecuta la primera rama verdadera y el elif no se evalúa."],
      ["¿Puede una instrucción if tener dos cláusulas else?", "No. Puede tener muchas ramas elif, pero como máximo un else, que debe ir al final."],
      ["¿Por qué comprobar score >= 90 antes que score >= 80?", "Porque los rangos se superponen; probar >= 80 primero capturaría las puntuaciones de 90 o más y la rama A nunca se ejecutaría."]
    ] },
  { t: "Multiple conditions with and, or and not; truthy and falsy values", tt: "Condiciones múltiples con and, or y not; valores truthy y falsy",
    body: [
      "Las decisiones reales a menudo dependen de más de un hecho, así que Python te permite combinar condiciones con los operadores lógicos `and`, `or` y `not`. `a and b` es verdadero solo cuando ambos son verdaderos. `a or b` es verdadero cuando al menos uno es verdadero. `not a` invierte un valor. Por ejemplo, `if age >= 18 and has_ticket:` requiere ambas cosas, mientras que `if day == \"Sat\" or day == \"Sun\":` acepta cualquiera de las dos.",
      "La prioridad importa: primero se aplica `not`, luego `and`, luego `or`, y los tres van después de los operadores de comparación. Así, `a or b and c` significa `a or (b and c)`, y `not x > 3` significa `not (x > 3)`. Usa paréntesis cuando mezcles `and` y `or` para que el lector no tenga que recordarlo.",
      "Cualquier valor en Python puede usarse como condición. Los valores que cuentan como falsos se llaman falsy: `False`, `None`, `0`, `0.0`, la cadena vacía `\"\"`, y las colecciones vacías como `[]`, `()`, `{}` y `range(0)`. Todo lo demás es truthy (verdadero), incluidos los números negativos, la cadena `\"0\"` y una lista que contiene `[0]`. Por eso `if name:` es una forma común de comprobar que una cadena no está vacía.",
      "`and` y `or` hacen cortocircuito y devuelven uno de sus operandos, no necesariamente un booleano. `a and b` evalúa `a`; si `a` es falsy, devuelve `a` de inmediato sin evaluar `b`; en caso contrario devuelve `b`. `a or b` evalúa `a`; si `a` es truthy, devuelve `a`; en caso contrario devuelve `b`. `not` siempre devuelve un `True` o `False` real.",
      "```python\nprint(0 and 5)       # 0   (primer valor falsy)\nprint(3 and 5)       # 5   (todos truthy: último valor)\nprint(\"\" or \"guest\") # guest\nprint(not [])        # True\nprint(None or 0)     # 0   (nada truthy: último valor)\n```",
      "El cortocircuito es útil por seguridad. En `if n != 0 and total / n > 2:`, la división solo ocurre cuando `n` no es cero, así que no puede producirse un `ZeroDivisionError`. De igual forma, `name = user_input or \"guest\"` proporciona un valor por defecto cuando la entrada está vacía.",
      "Un error común de principiante es `if x == 1 or 2:`. Se lee de forma natural en inglés, pero Python lo interpreta como `(x == 1) or 2`, y como 2 es truthy, la condición siempre es verdadera. Escribe en su lugar `if x == 1 or x == 2:` o `if x in (1, 2):`."
    ],
    terms: [
      ["Truthy (verdadero en contexto booleano)", "Cualquier valor que cuenta como verdadero en una condición, como los números distintos de cero y las colecciones no vacías."],
      ["Falsy (falso en contexto booleano)", "Un valor que cuenta como falso: False, None, el cero y las cadenas o colecciones vacías."],
      ["Short-circuit evaluation (evaluación en cortocircuito)", "and y or dejan de evaluar en cuanto se conoce el resultado."],
      ["Logical operator (operador lógico)", "and, or o not, usados para combinar o invertir condiciones."]
    ],
    example: "Un formulario de inicio de sesión usa display = nickname or email. Si el usuario dejó nickname en blanco, la cadena vacía es falsy, así que display se convierte en la dirección de correo; en caso contrario se muestra el apodo, sin necesidad de una instrucción if.",
    tip: "Cuando el examen imprime el resultado de and u or, no respondas True o False en automático. and devuelve el primer operando falsy (o el último); or devuelve el primer operando truthy (o el último).",
    check: [
      ["¿Qué muestra print(5 or 0)?", "5, porque or devuelve el primer operando truthy."],
      ["¿Qué muestra print([] and 7)?", "[], porque la lista vacía es falsy y and la devuelve sin evaluar 7."],
      ["¿Por qué if x == 3 or 4: siempre es verdadero?", "Se interpreta como (x == 3) or 4, y 4 es truthy."]
    ] },
  { t: "Nested conditional statements and indentation", tt: "Instrucciones condicionales anidadas e indentación",
    body: [
      "Una condicional anidada es una instrucción `if` colocada dentro del bloque de otro `if`, `elif` o `else`. Usas el anidamiento cuando una segunda decisión solo tiene sentido después de haber tomado la primera: primero compruebas que un usuario inició sesión y luego, solo para los usuarios con sesión iniciada, compruebas si son administradores.",
      "En Python, la indentación por sí sola muestra a qué bloque pertenece una línea. Cada nivel de anidamiento agrega un nivel más de indentación, por convención cuatro espacios. El `if` interior se indenta bajo el encabezado exterior, y el bloque interior se indenta una vez más. Cuando una línea vuelve a un nivel anterior, ha salido del bloque interior.",
      "```python\nage = 20\nmember = False\nif age >= 18:\n    if member:\n        print(\"Adult member price\")\n    else:\n        print(\"Adult price\")      # esta se ejecuta\nelse:\n    print(\"Child price\")\nprint(\"Done\")                      # siempre se ejecuta\n```",
      "La posición del `else` decide a qué `if` pertenece. Un `else` se empareja con el `if` que está exactamente a la misma indentación. En el ejemplo, el primer `else` (indentado cuatro espacios) pertenece a `if member:`, mientras que el segundo (en el margen izquierdo) pertenece a `if age >= 18:`. Mueve un `else` un nivel a la izquierda o a la derecha y el significado del programa cambia por completo, aunque todas las palabras sean las mismas. Las preguntas del examen a menudo evalúan exactamente esto, así que sigue las columnas con cuidado.",
      "El anidamiento y los operadores lógicos a menudo pueden expresar lo mismo. `if a: if b: ...` sin ramas `else` equivale a `if a and b:`. La forma plana suele ser más fácil de leer. El anidamiento es la mejor opción cuando cada nivel tiene su propio `else` o hace un trabajo distinto, como en el ejemplo de precios. Un anidamiento profundo (cuatro niveles o más) es señal de que el código podría simplificarse, por ejemplo con `elif` o moviendo una parte a una función.",
      "Los errores de indentación son comunes con el anidamiento. Las líneas dentro del mismo bloque deben alinearse exactamente. Si un bloque interior está indentado con una cantidad de espacios distinta a la de sus líneas hermanas, Python lanza `IndentationError`. Si olvidas indentar el propio `if` interior, se convierte en una instrucción separada en el nivel exterior y se ejecuta sin importar la condición exterior, lo cual es un error de lógica y no un error de sintaxis.",
      "Para predecir la salida, sigue el código desde arriba: evalúa la condición exterior, elige el bloque correspondiente y luego evalúa las condiciones dentro de él, ignorando todas las ramas en las que no entraste."
    ],
    terms: [
      ["Nested conditional (condicional anidada)", "Una instrucción if dentro del bloque de otra rama condicional."],
      ["Indentation level (nivel de indentación)", "La columna en la que empieza una línea; define a qué bloque pertenece la línea."],
      ["Dangling else (else colgante)", "La pregunta de a qué if pertenece un else; en Python, al que está a la misma indentación."]
    ],
    example: "Un script de termostato comprueba if heating_on:, y dentro de eso, if temp < 18: para subir la caldera, y else: para mantenerla. Un desarrollador reduce por accidente la indentación del else interior, lo que lo une al if exterior, así que se le indica a la caldera que se mantenga cada vez que la calefacción está apagada. El código se ejecuta, pero la lógica es incorrecta.",
    tip: "Alinea else y elif con su if usando la columna de indentación, no el orden en que aparecen. Las mismas palabras con otra indentación producen un programa diferente.",
    check: [
      ["¿Cuándo equivale if a: seguido de un if b: indentado a if a and b:?", "Cuando ningún nivel tiene una rama else o elif y no hay nada más en el bloque exterior."],
      ["¿A qué if pertenece un else?", "Al if que está al mismo nivel de indentación, justo arriba de él en el mismo bloque."],
      ["¿Qué error obtienes si dos líneas del mismo bloque interior tienen indentación distinta?", "IndentationError, una subclase de SyntaxError, antes de que se ejecute el programa."]
    ] },
  { t: "The pass instruction as a placeholder body", tt: "La instrucción pass como cuerpo de relleno",
    body: [
      "Python exige que el encabezado de cada instrucción compuesta (una línea que termina en dos puntos, como `if`, `elif`, `else`, `while`, `for`, `def`, `class`, `try` o `except`) vaya seguido de al menos una instrucción indentada. A veces todavía no tienes nada que poner ahí, o deliberadamente quieres que no pase nada. Dejar el bloque vacío es un error de sintaxis: `IndentationError: expected an indented block`. Un comentario no ayuda, porque el intérprete ignora los comentarios y el bloque sigue vacío.",
      "La palabra clave `pass` resuelve esto. Es una instrucción que no hace absolutamente nada. Existe únicamente para llenar un lugar donde la sintaxis necesita una instrucción. Cuando Python llega a `pass`, simplemente continúa con la siguiente línea.",
      "```python\nfor n in range(5):\n    pass            # el bucle se ejecuta 5 veces sin hacer nada\n\ndef save_report():\n    pass            # se escribirá más adelante\n\nif error_count == 0:\n    pass            # nada que hacer en el caso normal\nelse:\n    print(\"Errors found\")\n```",
      "Los usos comunes incluyen esqueletos (stubs) mientras planeas un programa (define todos los nombres de tus funciones con cuerpos `pass` y luego complétalos uno por uno), ramas vacías donde un caso no necesita ninguna acción y, en el dominio de excepciones, un bloque `except` que ignora un error a propósito, aunque ignorar errores en silencio suele ser mala idea.",
      "No confundas `pass` con `continue` o `break`. Dentro de un bucle, `pass` no hace nada y la ejecución sigue con el resto de la iteración actual. `continue` salta el resto de la iteración actual y pasa a la siguiente. `break` sale del bucle por completo. Así que una línea después de `pass` en el mismo cuerpo del bucle sí se ejecuta, pero una línea después de `continue` no.",
      "```python\nfor i in range(3):\n    if i == 1:\n        pass\n    print(i)        # imprime 0, 1, 2\n```",
      "En ese bucle, reemplazar `pass` por `continue` imprimiría solo 0 y 2. El examen usa este contraste con frecuencia. Ten en cuenta también que `pass` es una palabra clave, así que no puede ser nombre de variable, y que una función cuyo cuerpo es solo `pass` devuelve `None` cuando se llama."
    ],
    terms: [
      ["pass", "Una instrucción (palabra clave) que no hace nada, usada donde la sintaxis requiere una instrucción."],
      ["Stub (esqueleto)", "Una función o bloque de relleno, a menudo con cuerpo pass, que se completará más adelante."],
      ["Empty block error (error de bloque vacío)", "IndentationError: expected an indented block, que se lanza cuando un encabezado con dos puntos no tiene cuerpo."]
    ],
    example: "Mientras diseñas una app de tareas pendientes, esbozas def add_task():, def remove_task(): y def list_tasks():, cada una con cuerpo pass. El archivo se ejecuta sin errores, así que puedes construir y probar el bucle del menú antes de escribir las funciones reales.",
    tip: "pass no salta ni termina nada; el código que le sigue en el mismo bloque sí se ejecuta. Si una opción de respuesta trata a pass como continue, es incorrecta.",
    check: [
      ["¿Puede un comentario por sí solo servir como cuerpo de un if?", "No. Los comentarios se ignoran, así que el bloque sigue vacío y Python lanza IndentationError; usa pass."],
      ["¿Qué devuelve una función con cuerpo pass?", "None, como cualquier función que termina sin una instrucción return."],
      ["En un bucle, ¿cuál es la diferencia entre pass y continue?", "pass no hace nada y la ejecución continúa con la siguiente línea; continue salta el resto de la iteración y empieza la siguiente."]
    ] },
  { t: "While loops, loop conditions and avoiding infinite loops", tt: "Bucles while, condiciones de bucle y cómo evitar bucles infinitos",
    body: [
      "Un bucle `while` repite un bloque mientras su condición sea verdadera. Python comprueba la condición antes de cada pasada (iteración). Si es verdadera, el cuerpo se ejecuta y luego Python vuelve y la comprueba otra vez. Cuando es falsa, el bucle termina y la ejecución continúa después del bloque. Si la condición es falsa desde la primera vez, el cuerpo nunca se ejecuta.",
      "```python\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Liftoff\")   # imprime 3, 2, 1, Liftoff\n```",
      "Un bucle `while` bien formado tiene tres partes: algo preparado antes del bucle (aquí `count = 3`), una condición que depende de ello (`count > 0`) y un cambio dentro del cuerpo que eventualmente hace falsa la condición (`count -= 1`). Usa `while` cuando no sabes de antemano cuántas iteraciones necesitas, por ejemplo, repetir hasta que el usuario escriba `quit` o hasta que un valor converja.",
      "Un bucle infinito es un bucle cuya condición nunca se vuelve falsa. Las causas habituales son olvidar actualizar la variable del bucle, actualizarla en la dirección equivocada (`count += 1` cuando cuentas hacia atrás) o usar una condición que la actualización se salta, como `while x != 10:` con `x += 3` empezando en 0, que salta de 9 a 12. Usar `<` o `>` en lugar de `!=` hace que el bucle sea más robusto. Si inicias un bucle infinito en la consola, presiona Ctrl+C, lo que lanza `KeyboardInterrupt` y detiene el programa.",
      "A veces un bucle infinito es intencional. `while True:` se ejecuta para siempre a menos que algo dentro de él lo detenga, normalmente un `break` cuando se alcanza un objetivo. Este patrón es común en menús y en la validación de entradas: seguir preguntando hasta que la entrada sea válida y luego salir.",
      "```python\nwhile True:\n    answer = input(\"Type yes or no: \")\n    if answer in (\"yes\", \"no\"):\n        break\nprint(\"Thanks\")\n```",
      "Cualquier valor truthy o falsy puede ser una condición. `while items:` se ejecuta mientras una lista no esté vacía, lo que funciona muy bien con `items.pop()`. `while n:` se ejecuta hasta que `n` se vuelve 0. Para contar iteraciones en una pregunta del examen, anota el valor de la variable en cada comprobación de la condición, incluida la comprobación final que falla, y cuenta cuántas veces se ejecutó el cuerpo."
    ],
    terms: [
      ["while loop (bucle while)", "Un bucle que repite su cuerpo mientras su condición sea verdadera, comprobándola antes de cada iteración."],
      ["Iteration (iteración)", "Una ejecución del cuerpo de un bucle."],
      ["Infinite loop (bucle infinito)", "Un bucle cuya condición nunca se vuelve falsa, así que se ejecuta hasta que se interrumpe o se sale de él con break."],
      ["KeyboardInterrupt", "La excepción que se lanza cuando el usuario presiona Ctrl+C, usada para detener un programa descontrolado."]
    ],
    example: "Un script de ahorro repite el bucle mientras balance < goal, sumando un depósito mensual y contando los meses. Si el depósito se fija por accidente en 0, el saldo nunca cambia y el bucle es infinito; agregar una comprobación de que el depósito es positivo antes del bucle lo evita.",
    tip: "Cuenta con cuidado: la condición de un bucle while se comprueba una vez más de las que se ejecuta el cuerpo. Fíjate también en las condiciones con != que un incremento puede saltarse.",
    check: [
      ["¿Cuántas veces se ejecuta el cuerpo de i = 0; while i < 5: i += 2?", "3 veces, con i igual a 0, 2 y 4 en las comprobaciones que pasan; la comprobación con i = 6 falla."],
      ["¿Qué pasa con n = 0 seguido de while n: print(n)?", "No se imprime nada; 0 es falsy, así que el cuerpo nunca se ejecuta."],
      ["¿Cómo se termina normalmente un bucle while True?", "Con una instrucción break dentro del cuerpo cuando se cumple alguna condición (o con una excepción o un return)."]
    ] },
  { t: "For loops over range() with start, stop and step, including negative steps and empty ranges", tt: "Bucles for sobre range() con start, stop y step, incluidos pasos negativos y rangos vacíos",
    body: [
      "Un bucle `for` ejecuta su cuerpo una vez por cada elemento de una secuencia. Para repetir algo una cantidad conocida de veces, normalmente recorres `range()`, que produce una serie de enteros bajo demanda. La variable del bucle toma cada valor por turnos.",
      "`range()` recibe uno, dos o tres argumentos enteros. `range(stop)` cuenta desde 0 hasta `stop` sin incluirlo: `range(4)` da 0, 1, 2, 3. `range(start, stop)` cuenta desde `start` hasta `stop` sin incluirlo: `range(2, 5)` da 2, 3, 4. `range(start, stop, step)` avanza `step` cada vez: `range(0, 10, 3)` da 0, 3, 6, 9. El valor de stop siempre se excluye, y esa es la regla más importante que debes recordar.",
      "Un paso negativo cuenta hacia abajo: `range(5, 0, -1)` da 5, 4, 3, 2, 1 (todavía excluyendo el stop, 0), y `range(10, 0, -3)` da 10, 7, 4, 1. Para incluir el 0 al contar hacia abajo, usa un stop de -1: `range(3, -1, -1)` da 3, 2, 1, 0.",
      "Un rango vacío no produce ningún número, así que un bucle sobre él se ejecuta cero veces sin ningún error. Esto ocurre siempre que no puedes llegar al stop moviéndote en la dirección del paso: `range(0)`, `range(5, 2)` (el paso por defecto es +1 pero el stop está por debajo del start), `range(3, 3)` y `range(1, 5, -1)`. Las preguntas del examen suelen incluir un rango vacío y preguntar cuántas veces se ejecuta el cuerpo; la respuesta es cero.",
      "```python\nfor i in range(2, 11, 4):\n    print(i, end=\" \")   # 2 6 10\nprint()\nfor i in range(5, 2):\n    print(\"never\")      # rango vacío\nprint(list(range(6, 0, -2)))  # [6, 4, 2]\n```",
      "Todos los argumentos deben ser enteros. `range(1.5)` lanza `TypeError`, y un paso de 0 lanza `ValueError`. Para contar cuántos valores produce un rango con paso positivo, puedes usar el techo de (stop - start) / step cuando stop es mayor que start; `len(range(0, 10, 3))` es 4. Envolver un rango en `list()` muestra sus valores, lo cual es útil en el REPL.",
      "Si no necesitas la variable del bucle, la convención es llamarla `_`, como en `for _ in range(3): print(\"hi\")`."
    ],
    terms: [
      ["range()", "Función integrada que produce enteros desde start hasta stop sin incluirlo, avanzando de step en step."],
      ["Step (paso)", "La cantidad que se suma cada vez; los pasos negativos cuentan hacia abajo y 0 no está permitido."],
      ["Empty range (rango vacío)", "Un rango que no produce valores, como range(5, 2), así que un bucle sobre él se ejecuta cero veces."],
      ["Loop variable (variable del bucle)", "El nombre que toma cada valor sucesivo en un bucle for."]
    ],
    example: "Un temporizador de cuenta regresiva usa for s in range(10, 0, -1): print(s) y luego imprime Go. Un desarrollador que escribe range(10, 0) en su lugar obtiene un rango vacío y la cuenta regresiva no imprime nada en silencio, porque el paso por defecto es +1.",
    tip: "El valor de stop nunca se incluye, y un rango que no puede moverse de start hacia stop en la dirección del paso está vacío; no es un error.",
    check: [
      ["¿Qué valores produce range(1, 8, 2)?", "1, 3, 5, 7."],
      ["¿Cuántas veces imprime for i in range(4, 1): print(i)?", "Cero veces; el rango está vacío porque el paso por defecto es +1 y 4 ya está más allá de 1."],
      ["¿Qué da list(range(3, -2, -2))?", "[3, 1, -1]."]
    ] },
  { t: "Iterating over strings, lists and other sequences with for", tt: "Recorrer cadenas, listas y otras secuencias con for",
    body: [
      "Un bucle `for` no se limita a números. Funciona con cualquier iterable, es decir, cualquier objeto que pueda entregar sus elementos uno a la vez. Las cadenas, listas, tuplas, diccionarios, conjuntos y rangos son todos iterables. La sintaxis siempre es `for name in iterable:`, y en cada pasada el nombre se vincula al siguiente elemento.",
      "Recorrer una cadena te da sus caracteres uno a la vez, como cadenas de un solo carácter. Recorrer una lista o una tupla te da cada elemento en orden. Esto suele ser más limpio que recorrer índices.",
      "```python\nfor ch in \"cat\":\n    print(ch, end=\"-\")    # c-a-t-\nprint()\ncolours = [\"red\", \"green\", \"blue\"]\nfor c in colours:\n    print(c.upper())      # RED, GREEN, BLUE\n```",
      "Si necesitas la posición además del elemento, tienes dos opciones. La tradicional es `for i in range(len(colours)):` y luego `colours[i]`. La más \"pythónica\" es `enumerate()`, que da pares de índice y elemento: `for i, c in enumerate(colours):`. Ambas aparecen en el código del examen, así que debes poder leer las dos.",
      "Asignar un valor a la variable del bucle no cambia la lista. En `for x in nums: x = x * 2`, cada `x` es solo un nombre vinculado a un elemento; volver a vincularlo no tiene efecto sobre `nums`. Para modificar una lista en el lugar, recorre los índices y asigna `nums[i] = nums[i] * 2`. Las cadenas no se pueden modificar en el lugar en absoluto, porque son inmutables; en su lugar construyes una cadena nueva, por ejemplo `result = result + ch.upper()`.",
      "Recorrer un diccionario te da sus claves por defecto. Recorrer una secuencia vacía ejecuta el cuerpo cero veces. Agregar o quitar elementos de una lista mientras la recorres provoca un comportamiento confuso (elementos saltados o repetidos), así que recorre una copia, como `for x in items[:]:`, si tienes que modificarla.",
      "Muchas preguntas del examen acumulan algo mientras iteran: contar vocales, sumar números o construir una cadena invertida. Prepara el acumulador antes del bucle (`total = 0` o `text = \"\"`), actualízalo dentro y úsalo después. Olvidar inicializarlo antes del bucle, o reiniciarlo dentro del bucle, son los errores clásicos.",
      "```python\nvowels = 0\nfor ch in \"Programming\":\n    if ch in \"aeiou\":\n        vowels += 1\nprint(vowels)   # 3\n```"
    ],
    terms: [
      ["Iterable", "Un objeto cuyos elementos se pueden tomar uno a la vez, como una cadena, lista, tupla, dict o range."],
      ["enumerate()", "Función integrada que produce pares (índice, elemento) mientras se itera."],
      ["Accumulator (acumulador)", "Una variable que se prepara antes de un bucle y se actualiza en cada iteración para construir un total o un resultado."]
    ],
    example: "Un verificador de contraseñas recorre for ch in password: e incrementa contadores para los dígitos con ch.isdigit() y para las letras mayúsculas con ch.isupper(). Después del bucle informa si se cumplió cada requisito, sin tocar índices en ningún momento.",
    tip: "Cambiar la variable del bucle nunca cambia la secuencia. Si una pregunta hace for x in lst: x += 1 y luego imprime lst, la lista no ha cambiado.",
    check: [
      ["¿Qué imprime for ch in \"hi!\": print(ch)?", "Tres líneas: h, i y !."],
      ["Después de nums = [1, 2] y for n in nums: n = n * 10, ¿cuánto vale nums?", "[1, 2]; volver a vincular la variable del bucle no modifica la lista."],
      ["¿Qué obtienes al recorrer directamente un diccionario?", "Sus claves."]
    ] },
  { t: "Break and continue, and how break affects only the innermost loop", tt: "break y continue, y por qué break solo afecta al bucle más interno",
    body: [
      "Normalmente un bucle ejecuta todo su cuerpo en cada iteración y se detiene solo cuando su condición falla o su secuencia se agota. Dos palabras clave te permiten cambiar eso desde dentro del cuerpo. `break` termina el bucle de inmediato; la ejecución salta a la primera instrucción después del bucle. `continue` termina solo la iteración actual; el resto del cuerpo se salta y el bucle pasa a su siguiente iteración (un bucle `while` vuelve a comprobar su condición, un bucle `for` toma el siguiente elemento).",
      "```python\nfor n in range(1, 8):\n    if n == 3:\n        continue      # salta el 3\n    if n == 6:\n        break         # se detiene por completo en 6\n    print(n, end=\" \")\n# salida: 1 2 4 5\n```",
      "Usa `break` cuando hayas encontrado lo que buscabas, o cuando continuar no tenga sentido, por ejemplo, al buscar en una lista el primer número negativo. Usa `continue` para saltar elementos que no deben procesarse, como líneas en blanco o entradas inválidas, sin envolver el resto del cuerpo en un `if` adicional.",
      "Ambas palabras clave solo son válidas dentro de un bucle. Usarlas en otro lugar es un `SyntaxError`. Afectan al bucle en el que están directamente, y a nada más.",
      "Ese punto importa con los bucles anidados. `break` sale solo del bucle más interno que lo contiene. El bucle exterior continúa con su siguiente iteración como si el bucle interior hubiera terminado normalmente. De forma similar, `continue` en un bucle interior salta solo a la siguiente iteración del bucle interior.",
      "```python\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break      # sale solo del bucle j\n        print(i, j)\n# imprime 0 0, 1 0, 2 0\n```",
      "Aquí el bucle interior siempre se detiene cuando `j` llega a 1, pero el bucle exterior se sigue ejecutando tres veces, así que se imprimen tres líneas. Para detener ambos bucles necesitas un paso extra: asignar una variable bandera (flag) antes del break y comprobarla en el bucle exterior (`if found: break`), o poner los bucles en una función y usar `return`, que sale de toda la función a la vez.",
      "En un bucle `while`, ten cuidado con dónde está `continue` respecto a la actualización. Si el contador se incrementa después de un `continue`, el incremento se salta en esa iteración y el bucle puede volverse infinito. Pon la actualización antes del `continue`, o al principio del cuerpo."
    ],
    terms: [
      ["break", "Sale de inmediato del bucle más interno que lo contiene."],
      ["continue", "Salta el resto de la iteración actual y empieza la siguiente del bucle más interno."],
      ["Flag variable (variable bandera)", "Un booleano que se asigna dentro de un bucle para señalar un evento, como found = True, y que se comprueba después para detener un bucle exterior."]
    ],
    example: "Un buscador de asientos recorre las filas y, dentro, los asientos. Cuando encuentra un asiento libre hace break, pero el bucle exterior de filas sigue y más adelante encuentra más asientos. Asignar found = True antes del break y agregar if found: break después del bucle interior hace que se detenga en el primer asiento libre.",
    tip: "break nunca salta fuera de dos bucles. Cuando una pregunta con bucles anidados usa break, solo se detiene el bucle interior; sigue contando las iteraciones del bucle exterior.",
    check: [
      ["Un bucle sobre range(5) ejecuta continue cuando i % 2 es truthy y en caso contrario imprime i. ¿Qué se imprime?", "0, 2 y 4, porque continue salta los valores impares."],
      ["Si break se ejecuta en un bucle interior, ¿qué pasa con el bucle exterior?", "Continúa con su siguiente iteración; solo se sale del bucle más interno."],
      ["¿Por qué continue puede causar un bucle while infinito?", "Si la variable del bucle se actualiza después del continue, esa actualización se salta, así que la condición puede no cambiar nunca."]
    ] },
  { t: "While-else and for-else: when the else clause runs and when break skips it", tt: "while-else y for-else: cuándo se ejecuta la cláusula else y cuándo break la salta",
    body: [
      "Python permite que un bucle tenga una cláusula `else`, lo cual sorprende a quienes solo conocen `else` en `if`. El bloque `else` se escribe a la misma indentación que el encabezado del `for` o del `while` y se ejecuta una vez, después del bucle, si el bucle terminó normalmente. \"Normalmente\" significa que la condición del `while` se volvió falsa o que el bucle `for` se quedó sin elementos. Si el bucle terminó con `break`, el bloque `else` se salta.",
      "```python\nfor n in [3, 7, 9]:\n    if n % 2 == 0:\n        print(\"Found even\", n)\n        break\nelse:\n    print(\"No even numbers\")   # se ejecuta: no hubo break\n```",
      "La mejor forma de leer el else de un bucle es como \"sin break\". Está pensado para bucles de búsqueda: recorres buscando algo, haces `break` cuando lo encuentras, y el `else` maneja el caso de \"no encontrado\" sin necesidad de una variable bandera separada.",
      "Varios detalles se evalúan en el examen. Primero, el `else` se ejecuta aunque el cuerpo del bucle nunca se haya ejecutado: `for x in []:` seguido de `else: print(\"done\")` imprime `done`, y lo mismo ocurre con un `while` cuya condición es falsa desde el inicio. Segundo, `continue` no salta el `else`; solo `break` lo hace (igual que un `return` desde una función y una excepción no manejada, que abandonan todo). Tercero, en bucles anidados, un `break` en el bucle interior salta solo el `else` del bucle interior; el `else` del bucle exterior sigue dependiendo de si el propio bucle exterior se interrumpió.",
      "```python\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print(\"while ended, i =\", i)   # se ejecuta, i = 3\n\nfor k in range(5):\n    if k == 2:\n        break\nelse:\n    print(\"not printed\")\nprint(k)                            # 2\n```",
      "Un error común es pensar que el `else` se ejecuta cuando la condición del bucle es falsa \"en lugar del\" bucle, como con `if`. No reemplaza al bucle; lo sigue. Si un bucle `while` se ejecuta cinco veces y luego su condición falla, el `else` se ejecuta después de esas cinco iteraciones.",
      "Muchos programadores evitan el else de los bucles porque confunde a los lectores, pero forma parte del temario del PCEP. Al seguir el código, hazte una sola pregunta cuando termine el bucle: ¿se ejecutó un `break`? Si sí, salta el `else`; si no, ejecútalo."
    ],
    terms: [
      ["Loop else clause (cláusula else de un bucle)", "Un bloque después de un bucle for o while que se ejecuta solo si el bucle terminó sin break."],
      ["Normal termination (terminación normal)", "Un bucle que termina porque su condición se volvió falsa o porque se acabaron sus elementos."],
      ["Search loop (bucle de búsqueda)", "Un bucle que busca un elemento y hace break cuando lo encuentra, a menudo acompañado de else para el caso de no encontrado."]
    ],
    example: "Un script de inicio de sesión le da al usuario tres intentos con for attempt in range(3):, haciendo break con la contraseña correcta. La cláusula else después del bucle imprime Account locked, lo cual ocurre solo cuando se usaron los tres intentos sin un break.",
    tip: "Lee el else después de un bucle como \"si no hubo break\". Un bucle vacío igual ejecuta su else, y continue no lo impide.",
    check: [
      ["¿for x in range(0): pass seguido de else: print(\"E\") imprime E?", "Sí. El bucle termina normalmente (simplemente no tenía elementos) y no se ejecutó ningún break."],
      ["Si un bucle for ejecuta continue en cada iteración, ¿se ejecuta su else?", "Sí. Solo break (o salir mediante return o una excepción) salta el else."],
      ["¿Cuándo se salta el else de un bucle while?", "Cuando se sale del bucle con break."]
    ] },
  { t: "Nested loops and counting iterations", tt: "Bucles anidados y conteo de iteraciones",
    body: [
      "Un bucle anidado es un bucle dentro del cuerpo de otro bucle. Por cada iteración del bucle exterior, el bucle interior se ejecuta de principio a fin. Los bucles anidados son la forma de trabajar con datos bidimensionales (filas y columnas), generar todos los pares de elementos o imprimir patrones y tablas.",
      "```python\nfor row in range(1, 4):\n    for col in range(1, 4):\n        print(row * col, end=\"\\t\")\n    print()   # nueva línea después de cada fila\n```",
      "Eso imprime una tabla de multiplicar de 3 por 3. Fíjate en la estructura: el `print` interior usa `end=\"\\t\"` para mantener los valores en una línea, y el propio `print()` del bucle exterior se ejecuta una vez por fila, después de que termina el bucle interior. A qué bucle pertenece una instrucción lo decide únicamente su indentación.",
      "Contar iteraciones es una tarea favorita del examen. Cuando el rango del bucle interior no depende de la variable exterior, el número total de ejecuciones del cuerpo interior es simplemente la cantidad exterior multiplicada por la cantidad interior: `for i in range(4): for j in range(3):` ejecuta el cuerpo interior 12 veces, y el cuerpo exterior se ejecuta 4 veces.",
      "Cuando el rango interior depende de la variable exterior, debes sumar cada ronda por separado. En `for i in range(4): for j in range(i):`, el bucle interior se ejecuta 0, 1, 2 y 3 veces, para un total de 6. En `for i in range(1, 4): for j in range(i, 4):` se ejecuta 3, 2 y 1 veces, otra vez 6. Anota la cantidad por cada valor exterior en una pequeña tabla; no intentes hacerlo de memoria.",
      "```python\ncount = 0\nfor i in range(3):\n    for j in range(i, 3):\n        count += 1\nprint(count)   # 3 + 2 + 1 = 6\n```",
      "`break` y `continue` cambian las cuentas. Un `break` en el bucle interior termina solo esa ejecución del bucle interior, así que el bucle exterior sigue. Un bucle `while` anidado en un `for` (o al revés) sigue las mismas reglas, pero asegúrate de que la variable de control del bucle interior se reinicie dentro del bucle exterior; si asignas `j = 0` una sola vez, antes de ambos bucles, el `while` interior se ejecutará completo en la primera pasada exterior y nunca más después.",
      "Los bucles anidados multiplican el trabajo rápidamente: dos bucles de 1,000 elementos cada uno significan un millón de iteraciones interiores. Eso está bien para ejercicios, pero es la razón por la que los programadores buscan formas de evitar anidamientos innecesarios en programas más grandes."
    ],
    terms: [
      ["Nested loop (bucle anidado)", "Un bucle colocado dentro del cuerpo de otro bucle; el bucle interior se completa por entero en cada iteración exterior."],
      ["Outer loop (bucle exterior)", "El bucle que contiene al otro, y que controla cuántas veces se inicia el bucle interior."],
      ["Iteration count (número de iteraciones)", "El total de veces que se ejecuta el cuerpo de un bucle, que se obtiene multiplicando o sumando por cada pasada exterior."]
    ],
    example: "Un plano de asientos de cine recorre for row in \"ABCDE\": y dentro for seat in range(1, 11): para imprimir etiquetas de A1 a E10. El print interior se ejecuta 5 x 10 = 50 veces, mientras que el print de salto de línea del bucle exterior se ejecuta 5 veces.",
    tip: "Si el rango interior usa la variable exterior, nunca multipliques; anota la cantidad interior para cada valor exterior y súmalas.",
    check: [
      ["¿Cuántas veces se ejecuta print en for i in range(3): for j in range(4): print(i, j)?", "12 veces (3 x 4)."],
      ["¿Cuántas veces se ejecuta el cuerpo interior en for i in range(1, 5): for j in range(i):?", "1 + 2 + 3 + 4 = 10 veces."],
      ["Con un bucle while dentro de un bucle for, ¿por qué reiniciar el contador interior dentro del bucle exterior?", "Porque de lo contrario el contador conserva su valor final después de la primera pasada y el while interior nunca vuelve a ejecutarse."]
    ] },
  { t: "The value of the loop variable after a for loop ends", tt: "El valor de la variable del bucle después de que termina un bucle for",
    body: [
      "En Python, la variable de un bucle `for` es una variable común del ámbito que lo rodea. No desaparece cuando el bucle termina. Después del bucle, sigue teniendo el último valor que se le asignó. Muchos otros lenguajes se comportan de otra forma, así que esta es una trampa favorita del PCEP.",
      "```python\nfor i in range(5):\n    pass\nprint(i)      # 4, no 5\n```",
      "Fíjate en el valor: 4, no 5. `range(5)` produce de 0 a 4, y la variable del bucle solo se vincula a valores que produce el rango. El valor de stop nunca se asigna. Compáralo con un bucle `while` que cuenta con `i += 1` mientras `i < 5`: ahí la variable termina en 5, porque el último incremento ocurre antes de que falle la condición. Las preguntas del examen a menudo ponen estos dos casos lado a lado.",
      "```python\ni = 0\nwhile i < 5:\n    i += 1\nprint(i)      # 5\n\nfor ch in \"code\":\n    pass\nprint(ch)     # e\n```",
      "Si el bucle termina con `break`, la variable conserva el valor que tenía cuando se ejecutó el `break`. En `for n in range(10): if n * n > 20: break`, `n` vale 5 después, porque 5 x 5 = 25 es el primer cuadrado mayor que 20.",
      "Si el iterable está vacío, el cuerpo del bucle nunca se ejecuta y la variable del bucle nunca se asigna. Si el nombre no existía antes, usarlo después lanza `NameError`. Si ya existía, conserva su valor anterior. Por ejemplo, con `x = 99` seguido de `for x in []: pass`, `x` sigue valiendo 99.",
      "Asignar un valor a la variable del bucle dentro del cuerpo no afecta a la siguiente iteración de un bucle `for`. En `for i in range(3): i = 10`, la siguiente iteración igual recibe el siguiente valor del rango, y después del bucle `i` vale 10, porque lo último que se le hizo fue la asignación en la iteración final. El iterable decide cada valor nuevo; tus asignaciones solo duran hasta que empieza la siguiente iteración.",
      "Al seguir el código, mantén una columna para la variable del bucle y actualízala al inicio de cada iteración y en cada asignación. Su última entrada es la respuesta."
    ],
    terms: [
      ["Loop variable scope (ámbito de la variable del bucle)", "En Python, la variable de un bucle for sigue definida después del bucle, con su último valor."],
      ["Last assigned value (último valor asignado)", "Para range(n), la variable del bucle termina en n - 1, no en n."],
      ["NameError", "Se lanza si usas una variable de bucle que nunca se asignó porque el bucle se ejecutó cero veces."]
    ],
    example: "Un script busca en una lista con for idx in range(len(items)):, haciendo break cuando encuentra una coincidencia, y luego imprime items[idx]. Si no hay coincidencia, idx es el último índice, no un indicador de no encontrado, así que el programa informa por error el último elemento. Un for-else o una bandera found lo corrige.",
    tip: "Después de for i in range(n), i vale n - 1; después de un bucle while que cuenta, el contador suele valer n. Después de un bucle for vacío, la variable no cambia o no está definida.",
    check: [
      ["¿Qué imprime for k in range(2, 9, 3): pass seguido de print(k)?", "8. El rango produce 2, 5, 8, así que el último valor asignado es 8."],
      ["¿Qué pasa con for z in range(0): pass y luego print(z), si z nunca se definió?", "NameError, porque el bucle vacío nunca asignó z."],
      ["Después de for i in range(4): i *= 2, ¿cuánto vale i?", "6. La última iteración recibe i = 3 del rango y luego lo duplica."]
    ] },
  { t: "Lists: building, indexing (including negative indexes) and slicing", tt: "Listas: construcción, indexación (incluidos índices negativos) y rebanado",
    body: [
      "Una lista es una colección ordenada y modificable (mutable) de valores. Se escribe con corchetes y comas: `nums = [10, 20, 30]`. Una lista puede contener valores de tipos mezclados, duplicados e incluso otras listas. Una lista vacía es `[]` o `list()`. También puedes construir una a partir de cualquier iterable, así que `list(\"abc\")` es `['a', 'b', 'c']` y `list(range(3))` es `[0, 1, 2]`.",
      "La indexación selecciona un elemento por su posición con corchetes. Las posiciones empiezan en 0, así que en `nums = [10, 20, 30]`, `nums[0]` es 10 y `nums[2]` es 30. Los índices negativos cuentan desde el final: `nums[-1]` es el último elemento (30), `nums[-2]` es el penúltimo. El índice `-len(nums)` es el primer elemento. Cualquier índice fuera del rango de `-len` a `len - 1` lanza `IndexError: list index out of range`. Como las listas son mutables, puedes asignar a través de un índice: `nums[1] = 99` cambia la lista a `[10, 99, 30]`.",
      "El rebanado (slicing) extrae una parte de una lista como una lista nueva, usando `lst[start:stop:step]`. Igual que con `range()`, el start se incluye y el stop se excluye. Omitir start significa \"desde el principio\", omitir stop significa \"hasta el final\", y step vale 1 por defecto. Los valores negativos funcionan en las tres posiciones.",
      "```python\nx = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(x[1:3])    # ['b', 'c']\nprint(x[:2])     # ['a', 'b']\nprint(x[-2:])    # ['d', 'e']\nprint(x[::2])    # ['a', 'c', 'e']\nprint(x[::-1])   # ['e', 'd', 'c', 'b', 'a']\nprint(x[3:1])    # []\n```",
      "Las rebanadas son tolerantes donde los índices son estrictos. Una rebanada con posiciones más allá del final nunca lanza un error; simplemente se detiene en el borde, así que `x[2:100]` es `['c', 'd', 'e']`. Si start está en stop o después (con paso positivo), el resultado es una lista vacía, como muestra `x[3:1]`. Con un paso negativo, la rebanada avanza de derecha a izquierda, así que start debe estar a la derecha de stop: `x[4:1:-1]` es `['e', 'd', 'c']`.",
      "A las rebanadas también se les puede asignar valores y se pueden eliminar, lo cual cambia la lista original: `x[1:3] = [\"B\"]` reemplaza dos elementos por uno, dando `['a', 'B', 'd', 'e']`. En cambio, leer una rebanada siempre produce una lista nueva y deja la original intacta, por eso `x[:]` es una forma común de copiar una lista.",
      "Por último, recuerda que un solo índice devuelve un elemento, mientras que una rebanada siempre devuelve una lista, aunque contenga un solo elemento: `x[0]` es `'a'` pero `x[0:1]` es `['a']`."
    ],
    terms: [
      ["List (lista)", "Una secuencia ordenada y mutable escrita entre corchetes."],
      ["Index (índice)", "La posición de un elemento, empezando en 0; los índices negativos cuentan desde el final, siendo -1 el último."],
      ["Slice (rebanada)", "Una sublista tomada con [start:stop:step], que incluye start y excluye stop."],
      ["IndexError", "Se lanza cuando un índice está fuera del rango válido de una secuencia."]
    ],
    example: "Una app del clima guarda temps = [18, 21, 19, 24, 22, 20, 17] para la semana. temps[-1] es la lectura de hoy, temps[-3:] da los últimos tres días para ver la tendencia, y temps[::-1] lista la semana empezando por lo más reciente.",
    tip: "Los índices fuera de rango lanzan IndexError, pero las rebanadas fuera de rango devuelven en silencio lo que existe, posiblemente una lista vacía. Una rebanada de un solo elemento sigue siendo una lista.",
    check: [
      ["Para a = [1, 2, 3, 4, 5], ¿cuánto es a[-4:-1]?", "[2, 3, 4]; empieza en el índice -4 (valor 2) y se detiene antes del índice -1 (valor 5)."],
      ["¿Qué hace a[10] con una lista de cinco elementos, y qué hace a[10:]?", "a[10] lanza IndexError; a[10:] devuelve una lista vacía."],
      ["¿Cuál es la diferencia entre a[0] y a[:1]?", "a[0] es el primer elemento en sí; a[:1] es una lista nueva que contiene ese elemento."]
    ] },
  { t: "List methods and functions: append(), insert(), index(), remove(), sort(), len(), sorted(), del", tt: "Métodos y funciones de listas: append(), insert(), index(), remove(), sort(), len(), sorted(), del",
    body: [
      "Las listas vienen con métodos, que llamas con notación de punto sobre la propia lista, y además funcionan con varias funciones e instrucciones integradas de uso general. La diferencia importa: métodos como `append()` normalmente modifican la lista en el lugar y devuelven `None`, mientras que funciones como `sorted()` dejan la lista intacta y devuelven algo nuevo.",
      "`lst.append(x)` agrega un elemento al final. Si `x` es a su vez una lista, se agrega como un único elemento anidado, así que `[1, 2].append([3, 4])` da `[1, 2, [3, 4]]`. `lst.insert(i, x)` coloca `x` en la posición `i`, desplazando a la derecha los elementos posteriores. Un índice más allá del final simplemente agrega al final, y un índice negativo inserta antes de esa posición contada desde el final: `insert(-1, x)` coloca `x` justo antes del último elemento.",
      "`lst.index(x)` devuelve la posición de la primera aparición de `x`, y lanza `ValueError` si `x` no está en la lista. `lst.remove(x)` elimina la primera aparición del valor `x` (no el elemento en el índice `x`) y también lanza `ValueError` si no existe. La instrucción `del` elimina por posición: `del lst[0]` elimina el primer elemento, `del lst[1:3]` elimina una rebanada, y `del lst` elimina la variable en sí, así que usar `lst` después lanza `NameError`.",
      "```python\nx = [3, 1, 2]\nx.append(5)        # [3, 1, 2, 5]\nx.insert(0, 9)     # [9, 3, 1, 2, 5]\nx.remove(1)        # [9, 3, 2, 5]\ndel x[-1]          # [9, 3, 2]\nprint(x.index(2), len(x))  # 2 3\n```",
      "`lst.sort()` ordena la lista en el lugar, de forma ascendente por defecto, o descendente con `sort(reverse=True)`. Devuelve `None`, así que `y = x.sort()` deja `y` igual a `None`, una trampa muy común. `sorted(iterable)` es una función integrada que devuelve una lista nueva ordenada y deja la original sin cambios; funciona con cualquier iterable, incluidas cadenas y tuplas, y también acepta `reverse=True`. Ordenar una lista que mezcla números y cadenas lanza `TypeError` porque no se pueden comparar. Método relacionado que trabaja en el lugar: `lst.reverse()` invierte el orden y también devuelve `None`.",
      "`len(lst)` devuelve el número de elementos de nivel superior. Una lista anidada cuenta como un solo elemento, así que `len([1, [2, 3]])` es 2. Con frecuencia verás `len()` combinado con índices, como en `lst[len(lst) - 1]`, que es el último elemento.",
      "Otras herramientas útiles: `lst.pop()` elimina y devuelve el último elemento (o `pop(i)` para la posición `i`), `lst.count(x)` cuenta las apariciones, y `min()`, `max()` y `sum()` funcionan con listas de números."
    ],
    terms: [
      ["append()", "Agrega un elemento al final de una lista, en el lugar."],
      ["insert(i, x)", "Inserta x antes de la posición i, desplazando a la derecha los elementos posteriores."],
      ["remove(x) vs del", "remove elimina el primer valor que coincide; del elimina por índice o rebanada."],
      ["sort() vs sorted()", "sort() ordena la lista en el lugar y devuelve None; sorted() devuelve una lista nueva ordenada."]
    ],
    example: "Una tabla de posiciones guarda scores = [40, 75, 60]. Para mostrarla sin alterar la original, imprime sorted(scores, reverse=True). Cuando llega una puntuación nueva llama a scores.append(88), y cuando se detecta una trampa llama a scores.remove(75).",
    tip: "Los métodos que modifican una lista en el lugar (append, insert, remove, sort, reverse) devuelven None. Si una respuesta imprime el resultado de x.sort(), imprime None.",
    check: [
      ["¿Qué es x después de x = [1, 2, 3] y x.insert(1, 7)?", "[1, 7, 2, 3]."],
      ["¿Qué muestra print([3, 1, 2].sort())?", "None, porque sort() ordena en el lugar y devuelve None."],
      ["Para x = [5, 6, 5], ¿qué hacen x.remove(5) y del x[0] en cada caso?", "remove(5) elimina el primer 5, dando [6, 5]; del x[0] elimina el elemento en el índice 0, que aquí también da [6, 5]; uno trabaja por valor y el otro por posición."]
    ] },
  { t: "Iterating through lists, in and not in, list comprehensions with conditions", tt: "Recorrer listas, in y not in, listas por comprensión con condiciones",
    body: [
      "Lo más común que se hace con una lista es procesar cada elemento. Un bucle `for` sobre la lista te da cada elemento directamente: `for price in prices: total += price`. Si también necesitas las posiciones, recorre `range(len(prices))` o usa `enumerate(prices)`. Cuando necesites cambiar elementos en el lugar, usa la forma con índices, porque asignar a la variable del bucle no modifica la lista.",
      "Los operadores de pertenencia `in` y `not in` comprueban si un valor aparece en una lista y devuelven `True` o `False`. `3 in [1, 2, 3]` es `True`; `\"x\" not in [\"a\", \"b\"]` también es `True`. Comparan con `==`, así que `1.0 in [1, 2]` es `True`. Solo miran los elementos de nivel superior: `2 in [[1, 2], 3]` es `False`, porque la lista contiene una lista y un 3, no un 2. Los mismos operadores funcionan con cadenas (`\"ell\" in \"hello\"` busca una subcadena), tuplas y claves de diccionario.",
      "Una lista por comprensión (list comprehension) construye una lista nueva a partir de un iterable en una sola expresión. El patrón es `[expression for item in iterable]`. Equivale a crear una lista vacía y agregar la expresión dentro de un bucle, pero es más corta.",
      "```python\nsquares = [n * n for n in range(5)]\nprint(squares)      # [0, 1, 4, 9, 16]\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)        # [0, 2, 4, 6, 8]\n```",
      "Agregar una cláusula `if` al final filtra los elementos: solo se incluyen aquellos para los que la condición es verdadera. Lee `[n for n in range(10) if n % 2 == 0]` como \"n, para cada n en range(10), si n es par\". La versión con bucle sería `evens = []`, luego `for n in range(10): if n % 2 == 0: evens.append(n)`.",
      "También puedes ver una expresión condicional al principio, que transforma cada elemento en lugar de filtrar: `[\"even\" if n % 2 == 0 else \"odd\" for n in range(3)]` da `['even', 'odd', 'even']`. La diferencia es importante. Un `if` después del `for` decide si un elemento se incluye, y no lleva `else`. Un `if ... else` antes del `for` decide en qué valor se convierte cada elemento, y debe llevar `else`.",
      "Las comprensiones también se pueden anidar, como en `[[0] * 3 for _ in range(2)]`, que crea una cuadrícula de ceros de 2 por 3. En Python 3 la variable del bucle de la comprensión no se filtra hacia afuera: después de `[i for i in range(3)]`, un nombre `i` definido solo ahí no existe, a diferencia de un bucle `for` normal."
    ],
    terms: [
      ["in / not in", "Operadores de pertenencia que comprueban si un valor es (o no es) un elemento de una secuencia."],
      ["List comprehension (lista por comprensión)", "Una expresión como [x * 2 for x in data] que construye una lista nueva a partir de un iterable."],
      ["Filter clause (cláusula de filtro)", "El if final de una comprensión, que incluye solo los elementos que cumplen la condición."]
    ],
    example: "Una tienda en línea tiene sizes = [\"S\", \"M\", \"XL\"]. Antes de aceptar un pedido comprueba if choice not in sizes: para rechazar entradas no válidas, y construye una lista de precios con [p * 0.9 for p in prices if p > 50] para mostrar precios con descuento solo en los artículos caros.",
    tip: "Un if al final filtra (menos elementos, no se permite else); un if-else al principio transforma (mismo número de elementos, else obligatorio). Recuerda también que in no busca dentro de listas anidadas.",
    check: [
      ["¿Qué produce [c for c in \"banana\" if c != \"a\"]?", "['b', 'n', 'n']."],
      ["¿2 in [[2], 3] es True o False?", "False; los elementos de nivel superior son [2] y 3, y ninguno es igual a 2."],
      ["¿Cuántos elementos tiene [x if x > 0 else 0 for x in [-1, 5, -3]]?", "Tres: [0, 5, 0]. Un if-else al principio transforma cada elemento en lugar de filtrar."]
    ] },
  { t: "Copying vs aliasing lists: b = a compared with a[:] or list(a)", tt: "Copiar frente a crear alias de listas: b = a comparado con a[:] o list(a)",
    body: [
      "En Python, una variable no contiene una lista; guarda una referencia a un objeto lista almacenado en algún lugar de la memoria. Este pequeño detalle explica uno de los comportamientos más evaluados en el examen PCEP. Cuando escribes `b = a` y `a` es una lista, Python no copia nada. Hace que `b` se refiera al mismo objeto lista. Ahora `a` y `b` son dos nombres (alias) para una sola lista, y un cambio hecho a través de cualquiera de los dos nombres se ve a través del otro.",
      "```python\na = [1, 2, 3]\nb = a          # alias, no una copia\nb.append(4)\nprint(a)       # [1, 2, 3, 4]\nprint(a is b)  # True\n```",
      "Para obtener una lista independiente, haz una copia. Tres formas comunes producen una lista nueva con los mismos elementos: rebanar la lista completa con `a[:]`, llamar a `list(a)` y llamar al método `a.copy()`. Después de `c = a[:]`, `c` es un objeto distinto, así que `c.append(99)` deja `a` sin cambios. Puedes comprobarlo con el operador de identidad: `a is c` es `False`, mientras que `a == c` es `True` justo después de copiar, porque `==` compara contenidos e `is` compara identidad.",
      "```python\na = [1, 2, 3]\nc = a[:]\nc[0] = 100\nprint(a, c)    # [1, 2, 3] [100, 2, 3]\n```",
      "Cuidado con las operaciones que vuelven a vincular un nombre en lugar de mutar la lista. Después de `b = a`, la instrucción `b = b + [5]` crea una lista totalmente nueva y vincula `b` a ella, así que `a` no se ve afectada. Pero `b += [5]` sobre una lista la muta en el lugar (se comporta como `extend`), así que `a` sí cambia. De forma similar, `b.append(5)`, `b[0] = 5`, `b.sort()` y `del b[0]` mutan todos el objeto compartido.",
      "Estas copias son superficiales (shallow). La nueva lista exterior es independiente, pero si los elementos son a su vez listas, ambas copias apuntan a las mismas listas interiores. Para `m = [[1, 2], [3, 4]]` y `n = m[:]`, la asignación `n[0][0] = 9` también cambia `m`, porque `n[0]` y `m[0]` son la misma lista interior. Agregar una fila nueva a `n` no afecta a `m`. Para estructuras anidadas totalmente independientes, la biblioteca estándar ofrece `copy.deepcopy()`, que en este nivel solo necesitas reconocer.",
      "El aliasing también ocurre cuando pasas una lista a una función: el parámetro es otro nombre para la lista de quien llama, así que una función que agrega elementos a su parámetro cambia la lista de quien la llamó. Es la misma regla, no un caso especial.",
      "Los valores inmutables como números, cadenas y tuplas no muestran esta sorpresa, porque no se pueden cambiar en el lugar; cualquier \"cambio\" produce un objeto nuevo."
    ],
    terms: [
      ["Alias", "Un segundo nombre vinculado al mismo objeto, creado con una asignación simple como b = a."],
      ["Shallow copy (copia superficial)", "Una lista exterior nueva cuyos elementos son los mismos objetos que los de la original, creada con a[:], list(a) o a.copy()."],
      ["is vs ==", "is comprueba si dos nombres se refieren al mismo objeto; == comprueba si sus valores son iguales."],
      ["Mutation (mutación)", "Cambiar un objeto en el lugar, lo cual es visible a través de todos sus alias."]
    ],
    example: "Una maestra guarda backup = grades antes de ajustar con un bucle las calificaciones en grades. Después, backup también muestra las calificaciones ajustadas, porque solo era un alias. Usar backup = grades[:] habría mantenido a salvo las calificaciones originales.",
    tip: "b = a nunca copia una lista. Si una pregunta muta b después de esa línea, a también cambia. Las rebanadas, list() y copy() crean listas exteriores nuevas, pero las listas anidadas dentro siguen siendo compartidas.",
    check: [
      ["Después de a = [1]; b = a; b = b + [2], ¿qué es a?", "[1]. b + [2] crea una lista nueva y vuelve a vincular b, así que a no se ve afectada."],
      ["Después de a = [1]; b = a; b += [2], ¿qué es a?", "[1, 2]. += muta la lista en el lugar, y b es un alias de a."],
      ["Para x = [[0], [0]] e y = x[:], ¿y[1][0] = 5 cambia x?", "Sí. La rebanada copia solo la lista exterior, así que y[1] y x[1] son la misma lista interior."]
    ] },
  { t: "Nested lists and matrices (list of lists)", tt: "Listas anidadas y matrices (listas de listas)",
    body: [
      "Una lista puede contener otras listas. Una lista cuyos elementos son todos listas de la misma longitud es una forma práctica de representar una matriz o cuadrícula: una tabla con filas y columnas, como un tablero de juego, un plano de asientos o una hoja de cálculo de números. Cada lista interior es una fila.",
      "```python\ngrid = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\nprint(grid[1])      # [4, 5, 6]  (segunda fila)\nprint(grid[1][2])   # 6          (fila 1, columna 2)\nprint(len(grid), len(grid[0]))  # 2 3\n```",
      "La indexación usa dos pares de corchetes, aplicados de izquierda a derecha. `grid[1]` elige la fila y luego `[2]` elige el elemento dentro de esa fila. Así, `grid[r][c]` significa fila `r`, columna `c`. Los índices negativos funcionan en ambos niveles: `grid[-1][-1]` es el elemento de abajo a la derecha. `len(grid)` da el número de filas, y `len(grid[0])` el número de columnas de la primera fila. Puedes asignar a un elemento, como en `grid[0][0] = 99`.",
      "Para visitar cada elemento, usa bucles anidados: el bucle exterior sobre las filas y el interior sobre los elementos de cada fila. Con `for row in grid: for value in row:` obtienes cada valor en orden de lectura. Si necesitas las posiciones, usa `for r in range(len(grid)): for c in range(len(grid[r])):`.",
      "Las comprensiones son la forma elegante de construir una cuadrícula: `[[0] * 3 for _ in range(2)]` crea dos filas separadas de tres ceros. `[[r * c for c in range(3)] for r in range(3)]` construye una pequeña tabla de multiplicar. Una diagonal, donde el índice de fila es igual al índice de columna, se puede leer con `[grid[i][i] for i in range(len(grid))]`.",
      "Hay una trampa seria. `[[0] * 3] * 2` parece construir la misma cuadrícula, pero el `* 2` exterior repite dos veces una referencia a la misma lista interior. Cambiar una fila entonces cambia ambas: después de `bad = [[0] * 3] * 2` y `bad[0][0] = 1`, `bad` es `[[1, 0, 0], [1, 0, 0]]`. La versión con comprensión crea una lista interior nueva en cada iteración, así que las filas son independientes. (Usar `* 3` sobre el `[0]` interior está bien, porque los enteros son inmutables.)",
      "Las filas no tienen que tener la misma longitud; una lista \"irregular\" (jagged) como `[[1], [2, 3], [4, 5, 6]]` es válida. El código que supone longitudes iguales, como `len(grid[0])`, puede entonces dar resultados incorrectos o `IndexError`. El anidamiento también puede ser más profundo, para una estructura tridimensional, y cada nivel adicional agrega otro par de corchetes: `cube[z][y][x]`."
    ],
    terms: [
      ["Nested list (lista anidada)", "Una lista que contiene otras listas como elementos."],
      ["Matrix (matriz)", "Una cuadrícula rectangular de valores, representada en Python como una lista de listas-fila de igual longitud."],
      ["Double indexing (doble indexación)", "grid[r][c]: el primer índice elige la fila, el segundo elige el elemento en esa fila."],
      ["Shared-row trap (trampa de filas compartidas)", "[[0] * n] * m repite m veces una misma lista interior, así que todas las filas cambian juntas."]
    ],
    example: "Un juego de gato (tres en raya) guarda board = [[\" \"] * 3 for _ in range(3)]. Cuando un jugador elige la fila 2, columna 0, el código asigna board[2][0] = \"X\" y luego revisa cada fila, cada columna y las dos diagonales en busca de tres marcas iguales.",
    tip: "grid[1][2] es la fila 1, columna 2, ambas contadas desde 0. Y [[0] * 3] * 3 crea tres referencias a una sola fila, así que una sola asignación aparece en todas las filas.",
    check: [
      ["Para m = [[1, 2], [3, 4], [5, 6]], ¿qué son m[2][0] y len(m)?", "m[2][0] es 5 y len(m) es 3 (el número de filas)."],
      ["¿Qué muestra x = [[0] * 2] * 2; x[0][1] = 7; print(x)?", "[[0, 7], [0, 7]], porque ambas filas son el mismo objeto lista."],
      ["¿Cómo construyes una cuadrícula de ceros de 3 x 4 con filas independientes?", "[[0] * 4 for _ in range(3)] (o [[0 for c in range(4)] for r in range(3)])."]
    ] },
  { t: "Tuples: building (including one-item tuples), indexing, slicing, immutability and tuples vs lists", tt: "Tuplas: construcción (incluidas las de un solo elemento), indexación, rebanado, inmutabilidad y tuplas frente a listas",
    body: [
      "Una tupla es una secuencia ordenada como una lista, pero inmutable: una vez creada, sus elementos no se pueden agregar, eliminar ni reemplazar. Normalmente escribes una tupla con paréntesis y comas, `point = (3, 4)`, pero en realidad es la coma la que crea la tupla. `t = 1, 2, 3` (empaquetado de tuplas, tuple packing) crea una tupla sin paréntesis. Una tupla vacía es `()` o `tuple()`, y `tuple(\"ab\")` da `('a', 'b')`.",
      "La regla de la coma crea una trampa famosa con las tuplas de un solo elemento. `(5)` es solo el entero 5 entre paréntesis, porque los paréntesis por sí solos únicamente agrupan una expresión. Para crear una tupla de un elemento necesitas una coma final: `(5,)` o `5,`. Así, `type((5))` es `int`, mientras que `type((5,))` es `tuple`. Del mismo modo, `(\"a\")` es una cadena, no una tupla.",
      "La indexación y el rebanado funcionan exactamente igual que con las listas: `t[0]`, `t[-1]`, `t[1:3]` y `t[::-1]`. Una rebanada de una tupla es una tupla nueva. Funcionan `len()`, `in`, `not in`, los bucles `for`, `min()`, `max()`, `sorted()` (que devuelve una lista), la concatenación con `+` y la replicación con `*`. Las tuplas tienen solo dos métodos: `count()` e `index()`.",
      "```python\nt = (10, 20, 30, 20)\nprint(t[1:], t.count(20), t.index(30))  # (20, 30, 20) 2 2\nt2 = t + (40,)       # tupla nueva; t no cambia\nprint(len(t2))       # 5\n# t[0] = 99          # TypeError: no admite asignación de elementos\n```",
      "La inmutabilidad significa que `t[0] = 99`, `del t[0]`, `t.append(5)` y `t.sort()` fallan todos (con `TypeError` para la asignación y eliminación de elementos, y `AttributeError` para los métodos inexistentes). Aun así puedes eliminar la variable tupla completa con `del t`, y puedes volver a vincular el nombre a una tupla nueva, como hace `t = t + (5,)`. Eso no cambia la tupla antigua; crea una nueva. Un detalle más: una tupla que contiene una lista no puede cambiar esa lista por otra, pero la lista en sí sigue siendo mutable, así que `(1, [2])[1].append(3)` funciona.",
      "El desempaquetado de tuplas (tuple unpacking) asigna cada elemento a un nombre: `x, y = (3, 4)` pone `x` en 3 e `y` en 4. El número de nombres debe coincidir con el número de elementos, o obtendrás `ValueError`. El desempaquetado es lo que hace que `a, b = b, a` intercambie valores, y es la forma en que las funciones devuelven varios valores.",
      "¿Cuándo elegir cada una? Usa una lista para una colección que va a crecer, reducirse o cambiar, como un carrito de compras. Usa una tupla para un grupo fijo de valores relacionados, como coordenadas, un color RGB o una fecha, o cuando necesites usar la secuencia como clave de diccionario, cosa que las listas no pueden ser porque son mutables. Las tuplas también indican a quien lee el código que los datos no deben cambiar."
    ],
    terms: [
      ["Tuple (tupla)", "Una secuencia ordenada e inmutable, creada con comas y normalmente con paréntesis."],
      ["One-item tuple (tupla de un elemento)", "Una tupla con un solo valor, que necesita una coma final: (5,)."],
      ["Immutability (inmutabilidad)", "La propiedad de que el contenido de un objeto no se puede cambiar después de crearlo."],
      ["Tuple unpacking (desempaquetado de tuplas)", "Asignar los elementos de una tupla a varios nombres a la vez, como en x, y = point."]
    ],
    example: "Una aplicación de mapas guarda la ubicación de cada ciudad como una tupla, por ejemplo (51.5, -0.12), y usa esas tuplas como claves en un diccionario de nombres de ciudades. Una lista no podría usarse como clave, y la tupla además garantiza que una coordenada no se cambie por accidente.",
    tip: "La coma, no los paréntesis, es la que crea una tupla. (7) es un int, (7,) es una tupla, y 7, también es una tupla. Cualquier intento de asignar a t[i] lanza TypeError.",
    check: [
      ["¿Qué es type((\"x\"))?", "str. Sin una coma final, los paréntesis solo agrupan la expresión."],
      ["Después de t = (1, 2) y t = t * 2, ¿qué es t, y se modificó la tupla original?", "t es (1, 2, 1, 2); se creó una tupla nueva y se vinculó a t, y la original no se modificó."],
      ["¿Por qué una tupla puede ser clave de diccionario y una lista no?", "Las claves deben ser hashables, lo cual requiere inmutabilidad; las tuplas (de elementos inmutables) lo son, las listas no."]
    ] },
  { t: "Dictionaries: building, indexing, adding, changing and removing keys", tt: "Diccionarios: construcción, indexación, y cómo agregar, cambiar y eliminar claves",
    body: [
      "Un diccionario (tipo `dict`) almacena pares clave-valor. En lugar de buscar elementos por posición numérica, como con una lista, los buscas por clave. Un diccionario se escribe entre llaves con dos puntos entre cada clave y su valor: `ages = {\"Ana\": 31, \"Ben\": 27}`. Un diccionario vacío es `{}` o `dict()`. Ten en cuenta que `{}` es un dict vacío, no un conjunto (set) vacío.",
      "Las claves deben ser únicas e inmutables (técnicamente, hashables): cadenas, números, booleanos y tuplas de elementos inmutables funcionan, pero una lista no puede ser clave y lanza `TypeError`. Los valores pueden ser cualquier cosa, incluidas listas y otros diccionarios. Si un literal repite una clave, gana el último valor: `{\"a\": 1, \"a\": 2}` es `{'a': 2}`. Desde Python 3.7, los diccionarios conservan las claves en el orden en que se insertaron, pero aun así no puedes indexarlos por posición; `ages[0]` busca una clave 0.",
      "Para leer un valor, indexa con su clave: `ages[\"Ana\"]` devuelve 31. Si la clave no existe, Python lanza `KeyError`. El método `get()` es la alternativa segura: `ages.get(\"Zoe\")` devuelve `None`, y `ages.get(\"Zoe\", 0)` devuelve el valor por defecto 0, sin lanzar un error.",
      "Agregar y cambiar usan la misma sintaxis. Asignar a una clave que no existe agrega un par nuevo; asignar a una clave existente reemplaza su valor: `ages[\"Cy\"] = 40` agrega, `ages[\"Ana\"] = 32` cambia. El método `update()` combina otro diccionario, agregando o sobrescribiendo claves.",
      "```python\nd = {\"x\": 1}\nd[\"y\"] = 2          # agregar\nd[\"x\"] = 10         # cambiar\nprint(d.get(\"z\", -1))  # -1\ndel d[\"y\"]          # eliminar\nprint(d, len(d))    # {'x': 10} 1\n```",
      "Hay varias formas de eliminar entradas. `del d[key]` elimina un par y lanza `KeyError` si no existe. `d.pop(key)` elimina el par y devuelve su valor (también lanza `KeyError` si no existe, a menos que des un valor por defecto, como en `d.pop(key, None)`). `d.popitem()` elimina y devuelve el último par insertado como una tupla. `d.clear()` vacía el diccionario, y `del d` elimina la variable en sí.",
      "`len(d)` cuenta los pares clave-valor. Como las listas, los diccionarios son mutables y se ven afectados por el aliasing: después de `e = d`, los cambios hechos a través de `e` aparecen en `d`. Usa `d.copy()` o `dict(d)` para obtener una copia superficial separada."
    ],
    terms: [
      ["Dictionary (diccionario)", "Una colección mutable de claves únicas asociadas a valores, escrita {key: value}."],
      ["Key (clave)", "El identificador único e inmutable que se usa para buscar un valor."],
      ["KeyError", "Se lanza cuando indexas o eliminas una clave que no está en el diccionario."],
      ["get()", "Devuelve el valor de una clave, o None o un valor por defecto indicado si la clave no existe."]
    ],
    example: "Un control de inventario guarda stock = {\"apples\": 10}. Una entrega ejecuta stock[\"pears\"] = 5 para agregar un producto y stock[\"apples\"] += 3 para actualizar otro. La venta de un artículo descontinuado llama a stock.pop(\"plums\", None) para no fallar si la clave ya no existe.",
    tip: "d[key] con una clave inexistente lanza KeyError; d.get(key) devuelve None. Asignar d[key] = value nunca falla: agrega si es nueva y reemplaza si ya existe.",
    check: [
      ["¿Qué resultado da {1: \"a\", 1: \"b\"}?", "{1: 'b'}; las claves duplicadas conservan el último valor."],
      ["¿Qué pasa con d = {} seguido de d[[1, 2]] = 3?", "TypeError, porque una lista es mutable y no puede ser clave."],
      ["¿Qué devuelve d.pop(\"k\")?", "El valor que estaba guardado bajo \"k\", después de eliminar ese par (o KeyError si \"k\" no existe y no se da un valor por defecto)."]
    ] },
  { t: "Iterating dictionaries with keys(), values() and items(); checking whether a key exists", tt: "Recorrer diccionarios con keys(), values() e items(); comprobar si una clave existe",
    body: [
      "Los diccionarios te ofrecen tres vistas de su contenido. `d.keys()` devuelve las claves, `d.values()` devuelve los valores, y `d.items()` devuelve los pares clave-valor como tuplas. Son objetos vista (view objects), no listas: reflejan los cambios posteriores del diccionario, y puedes recorrerlos o convertirlos con `list()`. Al imprimir uno se ve algo como `dict_keys(['a', 'b'])`.",
      "Recorrer directamente un diccionario te da sus claves, en orden de inserción, así que `for k in d:` y `for k in d.keys():` se comportan igual. Para obtener el valor dentro de ese bucle, indexa con la clave: `d[k]`.",
      "```python\nprices = {\"tea\": 2.5, \"cake\": 3.0}\nfor name in prices:\n    print(name, prices[name])\nfor p in prices.values():\n    print(p)\nfor name, p in prices.items():\n    print(name, \"costs\", p)\n```",
      "La forma con `items()` suele ser la más clara cuando necesitas tanto la clave como el valor. Cada elemento es una tupla de dos elementos, que la sintaxis `for name, p in ...` desempaqueta en dos variables. Puedes ordenar mientras recorres: `for k in sorted(d):` visita las claves en orden, y `sorted(d.values())` da una lista ordenada de los valores.",
      "Para comprobar si una clave existe, usa `in` o `not in` sobre el diccionario: `\"tea\" in prices` es `True`. Esto comprueba solo las claves. `2.5 in prices` es `False` aunque 2.5 sea un valor; para buscar entre los valores, usa `2.5 in prices.values()`. Comprobar antes de indexar es una forma común de evitar `KeyError`: `if key in d: print(d[key])`. La alternativa es `d.get(key)`, que devuelve `None` o un valor por defecto si la clave no está.",
      "Un patrón frecuente es contar: recorrer los datos y aumentar un contador para cada elemento, creando la clave la primera vez que aparece.",
      "```python\ncounts = {}\nfor word in \"a b a c a\".split():\n    if word in counts:\n        counts[word] += 1\n    else:\n        counts[word] = 1\nprint(counts)   # {'a': 3, 'b': 1, 'c': 1}\n```",
      "No agregues ni elimines claves mientras recorres un diccionario; Python lanza `RuntimeError` porque su tamaño cambió durante la iteración. Cambiar los valores de claves existentes sí está bien. Si necesitas eliminar entradas, recorre una copia de las claves, como `for k in list(d):`."
    ],
    terms: [
      ["keys()", "Devuelve una vista de las claves de un diccionario."],
      ["values()", "Devuelve una vista de los valores de un diccionario."],
      ["items()", "Devuelve una vista de tuplas (clave, valor), práctica para desempaquetar en un bucle for."],
      ["Membership on a dict (pertenencia en un diccionario)", "key in d comprueba solo las claves, nunca los valores."]
    ],
    example: "Un registro de clase guarda marks = {\"Ana\": 88, \"Ben\": 64}. Un reporte recorre for student, mark in marks.items(): e imprime PASS o FAIL. Antes de buscar un nombre escrito por la maestra, comprueba if name in marks: para que un nombre desconocido produzca un mensaje amable en lugar de un KeyError.",
    tip: "in sobre un diccionario comprueba las claves, no los valores. Recorrer un diccionario da las claves; usa items() para obtener ambas partes a la vez.",
    check: [
      ["Para d = {\"a\": 1}, ¿qué dan \"a\" in d y 1 in d?", "\"a\" in d es True; 1 in d es False, porque in solo comprueba las claves."],
      ["¿Qué imprime for k, v in {\"x\": 1, \"y\": 2}.items(): print(k * v)?", "x y luego yy, ya que cada cadena clave se replica según su valor."],
      ["¿Cómo obtienes una lista de los valores del diccionario?", "list(d.values())."]
    ] },
  { t: "Strings: indexing, slicing (including [::-1]), immutability and comparison", tt: "Cadenas: indexación, rebanado (incluido [::-1]), inmutabilidad y comparación",
    body: [
      "Una cadena (string) es una secuencia inmutable de caracteres. Como es una secuencia, admite las mismas reglas de indexación y rebanado que las listas y las tuplas. `s = \"Python\"` tiene longitud 6; `s[0]` es `'P'`, `s[5]` y `s[-1]` son ambos `'n'`, y `s[6]` lanza `IndexError`. Python no tiene un tipo separado para caracteres: indexar una cadena devuelve otra cadena de longitud uno.",
      "El rebanado usa `s[start:stop:step]`, con start incluido y stop excluido. `s[0:2]` es `'Py'`, `s[2:]` es `'thon'`, `s[:-2]` es `'Pyth'`, y `s[::2]` toma un carácter de cada dos, `'Pto'`. Igual que con las listas, las rebanadas nunca lanzan errores por posiciones fuera de rango: `s[4:100]` es simplemente `'on'`, y `s[4:2]` es la cadena vacía.",
      "`s[::-1]` es la forma idiomática de invertir una cadena. Con start y stop omitidos y un paso de -1, la rebanada recorre desde el último carácter hasta el primero. Así es como comprobarías un palíndromo: `word == word[::-1]`.",
      "```python\ns = \"Python\"\nprint(s[1:4], s[-3:], s[::-1])  # yth hon nohtyP\nprint(len(s), \"th\" in s)         # 6 True\n```",
      "Las cadenas son inmutables: no puedes cambiar un carácter en el lugar. `s[0] = \"J\"` lanza `TypeError: 'str' object does not support item assignment`, y `del s[0]` también falla. Para \"cambiar\" una cadena construyes una nueva, por ejemplo `s = \"J\" + s[1:]`, que da `'Jython'`. Los métodos de cadena como `upper()` y `replace()` también devuelven cadenas nuevas y dejan la original intacta, así que llamar a `s.upper()` sin asignar el resultado no tiene ningún efecto duradero.",
      "Las cadenas se pueden comparar con `==`, `!=`, `<`, `>`, `<=` y `>=`. La igualdad requiere caracteres idénticos, incluidas mayúsculas y minúsculas: `\"abc\" == \"ABC\"` es `False`. El orden es lexicográfico, carácter por carácter, usando el código numérico de cada carácter (su punto de código Unicode, que puedes ver con `ord()`; `chr()` hace lo contrario). Todas las letras mayúsculas tienen códigos menores que todas las minúsculas, así que `\"Zebra\" < \"apple\"` es `True`. Decide el primer carácter diferente; si una cadena es prefijo de la otra, la más corta es menor: `\"cat\" < \"cats\"`.",
      "Los dígitos dentro de cadenas se comparan como caracteres, no como números, así que `\"10\" < \"9\"` es `True` porque `'1'` va antes que `'9'`. Convierte a `int` si quieres una comparación numérica. Comparar una cadena con un número usando `<` lanza `TypeError`, mientras que `==` simplemente devuelve `False`."
    ],
    terms: [
      ["String immutability (inmutabilidad de las cadenas)", "Los caracteres de una cadena no se pueden cambiar en el lugar; las operaciones devuelven cadenas nuevas."],
      ["[::-1]", "La rebanada que invierte una secuencia recorriéndola completa hacia atrás."],
      ["Lexicographic order (orden lexicográfico)", "Un orden como el de un diccionario que compara cadenas carácter por carácter según su punto de código."],
      ["ord() y chr()", "ord() da el punto de código de un carácter; chr() da el carácter correspondiente a un punto de código."]
    ],
    example: "Un formulario de registro guarda los nombres de usuario en minúsculas con name.lower() para que \"Ana\" y \"ana\" no puedan registrarse ambos, ya que == distingue mayúsculas de minúsculas. Más tarde, un reporte lista los nombres de usuario con sorted(), que los ordena lexicográficamente.",
    tip: "Las mayúsculas se ordenan antes que las minúsculas, y las cadenas de dígitos se comparan como texto, así que \"100\" < \"20\" es True. Cualquier intento de asignar a s[i] es un TypeError.",
    check: [
      ["¿Qué es \"stressed\"[::-1]?", "\"desserts\"."],
      ["¿Qué pasa cuando ejecutas s = \"hat\"; s[0] = \"c\"?", "TypeError, porque las cadenas son inmutables; construye una cadena nueva como \"c\" + s[1:]."],
      ["¿\"Apple\" < \"apple\" es True o False?", "True. 'A' tiene un punto de código menor (65) que 'a' (97)."]
    ] },
  { t: "Escaping with \\, quotes and apostrophes inside strings, multi-line strings", tt: "Escapar con \\, comillas y apóstrofos dentro de cadenas, cadenas multilínea",
    body: [
      "Un literal de cadena se delimita con comillas, así que poner caracteres de comillas dentro requiere cuidado. Python te da dos salidas fáciles. Primero, elige el otro tipo de comillas como delimitadores: `\"It's fine\"` contiene un apóstrofo dentro de comillas dobles, y `'She said \"hi\"'` contiene comillas dobles dentro de comillas simples. Segundo, escapa la comilla con una barra invertida: `'It\\'s fine'` y `\"She said \\\"hi\\\"\"` son ambos válidos.",
      "La barra invertida `\\` es el carácter de escape. Combinada con el carácter siguiente, forma una secuencia de escape que representa un solo carácter. Las que necesitas son `\\n` (salto de línea), `\\t` (tabulación), `\\\\` (una barra invertida literal), `\\'` (comilla simple) y `\\\"` (comilla doble). Cada una cuenta como un carácter, así que `len(\"a\\nb\")` es 3. Al imprimir, `\\n` pasa a una línea nueva y `\\t` inserta una tabulación; en el REPL, mostrar la cadena sin `print` enseña las secuencias de escape en su lugar.",
      "```python\nprint('It\\'s here')         # It's here\nprint(\"Col1\\tCol2\\nA\\tB\")    # dos líneas, separadas por tabulaciones\nprint(\"C:\\\\temp\")            # C:\\temp\nprint(len(\"\\\\\"))              # 1\n```",
      "Una barra invertida no puede ser el último carácter de un literal de cadena, porque escaparía la comilla de cierre: `\"folder\\\"` es un error de sintaxis (la cadena nunca se cierra). Escribe `\"folder\\\\\"` en su lugar. Ten cuidado también con las rutas de Windows: en `\"C:\\new\"`, el `\\n` se convierte en un salto de línea. Duplicar las barras invertidas lo evita, y también una cadena cruda (raw string), escrita con el prefijo `r` (`r\"C:\\new\"`), en la que las barras invertidas se conservan literalmente.",
      "Las cadenas multilínea usan comillas triples, ya sea `'''...'''` o `\"\"\"...\"\"\"`. Todo lo que hay entre ellas, incluidos los saltos de línea y cualquier comilla simple o doble, pasa a formar parte de la cadena. Los saltos de línea son caracteres reales: una cadena con comillas triples que ocupa tres líneas contiene dos caracteres `\\n` (más si haces un salto de línea justo después de las comillas de apertura). Las cadenas con comillas triples también se usan como docstrings para documentar funciones.",
      "```python\nmsg = \"\"\"Dear user,\nIt's \"done\".\nBye\"\"\"\nprint(msg)            # tres líneas\nprint(msg.count(\"\\n\"))  # 2\n```",
      "Una cadena normal con comillas simples o dobles no puede contener un salto de línea literal; presionar Enter dentro de una da un error de sintaxis. Para poner un salto de línea dentro de una cadena así, usa `\\n`. Por último, recuerda que `print()` muestra el texto ya procesado, mientras que las secuencias de escape son solo la forma en que escribes caracteres especiales en tu código fuente."
    ],
    terms: [
      ["Escape character (carácter de escape)", "La barra invertida, que le da al carácter siguiente un significado especial en un literal de cadena."],
      ["Escape sequence (secuencia de escape)", "Una combinación con barra invertida, como \\n, \\t, \\\\ o \\', que representa un solo carácter."],
      ["Triple-quoted string (cadena con comillas triples)", "Una cadena delimitada por ''' o \"\"\" que puede ocupar varias líneas y contener comillas libremente."],
      ["Raw string (cadena cruda)", "Un literal con el prefijo r en el que las barras invertidas no se tratan como escapes."]
    ],
    example: "Un script imprime una ruta de Windows con print(\"C:\\new_folder\") y obtiene C:, un salto de línea y ew_folder, porque \\n se convirtió en un salto de línea. Escribir \"C:\\\\new_folder\" o r\"C:\\new_folder\" imprime la ruta correctamente.",
    tip: "Cada secuencia de escape cuenta como un carácter al medir la longitud. Una cadena que termina en una sola barra invertida es un error de sintaxis porque la barra invertida escapa la comilla de cierre.",
    check: [
      ["¿Qué es len(\"a\\tb\\\\\")?", "4: a, tabulación, b y una barra invertida."],
      ["Escribe el texto It's \"ok\" como un solo literal de Python.", "Usa comillas triples o escapes, por ejemplo 'It\\'s \"ok\"' o \"It's \\\"ok\\\"\"."],
      ["¿Cuántos caracteres de salto de línea hay en \"\"\"one\\ntwo\"\"\" si se escribe en una sola línea?", "Uno, el de la secuencia de escape \\n."]
    ] },
  { t: "Common string methods: split(), join(), upper(), lower(), strip(), find(), count(), replace()", tt: "Métodos de cadena comunes: split(), join(), upper(), lower(), strip(), find(), count(), replace()",
    body: [
      "Las cadenas tienen muchos métodos integrados, que se llaman con notación de punto, como `text.upper()`. Como las cadenas son inmutables, ninguno de estos métodos cambia la cadena original. Cada uno devuelve un valor nuevo, y debes asignar o usar ese resultado. Escribir `name.strip()` en su propia línea y esperar que `name` cambie es un error clásico.",
      "`upper()` devuelve una copia con todas las letras en mayúsculas y `lower()` con todas en minúsculas; los demás caracteres no se tocan. Son útiles para comparaciones sin distinguir mayúsculas y minúsculas: `answer.lower() == \"yes\"`. `strip()` elimina los espacios en blanco (espacios, tabulaciones, saltos de línea) de ambos extremos, pero no del medio: `\"  hi there \".strip()` es `'hi there'`. Si le das un argumento, en cambio elimina de los extremos cualquiera de esos caracteres: `\"xxhixx\".strip(\"x\")` es `'hi'`. También existen `lstrip()` y `rstrip()` para un solo lado.",
      "`split()` divide una cadena en una lista de subcadenas. Sin argumento, divide en cualquier secuencia de espacios en blanco e ignora los espacios al inicio y al final, así que `\" a  b c \".split()` es `['a', 'b', 'c']`. Con un argumento separador, divide exactamente en ese separador, y pueden aparecer cadenas vacías: `\"a,,b\".split(\",\")` es `['a', '', 'b']`. `join()` hace lo contrario. Se llama sobre la cadena separadora y recibe un iterable de cadenas: `\"-\".join([\"2026\", \"09\", \"25\"])` es `'2026-09-25'`. Todos los elementos deben ser cadenas, así que unir una lista de números lanza `TypeError` hasta que los conviertas, por ejemplo con `str()` en una comprensión.",
      "```python\nline = \"  red, green ,blue \"\nparts = [p.strip() for p in line.split(\",\")]\nprint(parts)                 # ['red', 'green', 'blue']\nprint(\" | \".join(parts).upper())  # RED | GREEN | BLUE\n```",
      "`find(sub)` devuelve el índice más bajo donde empieza `sub`, o -1 si no se encuentra. Nunca lanza un error, lo cual lo distingue de `index(sub)`, que lanza `ValueError` cuando la subcadena no está. Ten cuidado: -1 parece un índice válido, así que comprueba `if s.find(x) != -1:` o simplemente usa `x in s`. `find()` acepta una posición inicial opcional: `\"banana\".find(\"a\", 2)` es 3.",
      "`count(sub)` devuelve cuántas veces aparece `sub` sin superponerse: `\"banana\".count(\"a\")` es 3 y `\"aaaa\".count(\"aa\")` es 2. `replace(old, new)` devuelve una copia con cada aparición de `old` reemplazada por `new`; un tercer argumento opcional limita el número de reemplazos: `\"a-b-c\".replace(\"-\", \"+\", 1)` es `'a+b-c'`. Si `old` no aparece, la cadena se devuelve sin cambios.",
      "Los métodos se pueden encadenar porque cada uno devuelve una cadena: `raw.strip().lower().replace(\" \", \"_\")` limpia un texto en una sola línea, aplicando los métodos de izquierda a derecha."
    ],
    terms: [
      ["split()", "Devuelve una lista de subcadenas, dividiendo por espacios en blanco por defecto o por un separador indicado."],
      ["join()", "Se llama sobre una cadena separadora; devuelve una sola cadena formada a partir de un iterable de cadenas."],
      ["strip()", "Devuelve una copia sin los espacios en blanco (o los caracteres indicados) al inicio y al final."],
      ["find() vs index()", "Ambos localizan una subcadena; find() devuelve -1 si no está, index() lanza ValueError."]
    ],
    example: "Un importador de contactos lee la línea \" Ana Lopez ; ana@example.org \". Llama a line.split(\";\"), aplica strip a cada parte, aplica lower() al correo electrónico y más tarde construye una fila CSV con \",\".join(fields), convirtiendo una entrada desordenada en registros limpios.",
    tip: "Los métodos de cadena devuelven cadenas nuevas; la original nunca cambia. find() devuelve -1 en lugar de fallar, y join() se llama sobre el separador, no sobre la lista.",
    check: [
      ["¿Qué devuelve \"one two  three\".split()?", "['one', 'two', 'three']; varios espacios seguidos cuentan como un solo separador."],
      ["¿Qué es \"hello\".find(\"z\")?", "-1, porque find() devuelve -1 cuando la subcadena no está."],
      ["Después de s = \"Hi\" y s.upper(), ¿qué es s?", "Sigue siendo \"Hi\"; upper() devuelve una cadena nueva que no se asignó."]
    ] },
  { t: "Decomposition: splitting a program into functions", tt: "Descomposición: dividir un programa en funciones",
    body: [
      "A medida que los programas crecen, poner todo el código en una sola secuencia larga lo vuelve difícil de leer, probar y cambiar. La descomposición es la práctica de dividir un problema en subproblemas más pequeños y bien definidos, y darle a cada uno su propia función. En lugar de un script de 200 líneas, podrías tener `read_scores()`, `average()`, `grade_for()` y `print_report()`, y una sección principal corta que los llame en orden.",
      "Una función es un bloque de código con nombre que realiza una tarea. La defines una vez con `def`, y puedes llamarla (invocarla) tantas veces como necesites. Las funciones pueden recibir datos de entrada a través de parámetros y entregar resultados con `return`. Python ya te da muchas funciones integradas, como `print()`, `len()` e `input()`; descomponer significa escribir las tuyas con el mismo espíritu.",
      "Hay varias razones para descomponer. Reutilización: el código que se necesita en varios lugares se escribe una vez, así que una corrección se hace una vez. Legibilidad: una llamada con buen nombre como `is_valid_email(address)` le dice al lector lo que ocurre sin que tenga que leer los detalles. Pruebas: una función pequeña con entradas y salidas claras se puede comprobar por sí sola en el REPL. Trabajo en equipo: distintas personas pueden escribir distintas funciones. Abstracción: quien llama solo necesita saber qué hace una función, no cómo lo hace.",
      "```python\ndef get_numbers():\n    return [int(x) for x in input(\"Numbers: \").split()]\n\ndef average(values):\n    return sum(values) / len(values)\n\nnums = get_numbers()\nprint(\"Average:\", average(nums))\n```",
      "Las buenas funciones suelen hacer una sola cosa, tienen un nombre descriptivo basado en un verbo y escrito en snake_case (como recomienda PEP 8), y se comunican mediante parámetros y valores de retorno en lugar de leer o cambiar variables globales. Una señal de que hace falta descomponer es el código duplicado, o un comentario como \"ahora calcular el impuesto\" en medio de un bloque largo; ese comentario normalmente nombra la función que deberías extraer.",
      "La descomposición a menudo se hace de arriba hacia abajo (top down): primero escribes los pasos principales como llamadas a funciones que aún no existen, les das a cada una un cuerpo `pass` o un marcador de posición simple, y luego las implementas y pruebas una por una. Las funciones pueden llamar a otras funciones, así que una tarea grande se convierte en un árbol de tareas más pequeñas.",
      "Python también organiza el código a mayor escala en módulos (archivos) y paquetes, que incorporas con `import`. El mismo principio se aplica en todos los niveles: agrupa el código relacionado, dale una interfaz clara y mantén las piezas lo bastante pequeñas como para entenderlas."
    ],
    terms: [
      ["Decomposition (descomposición)", "Dividir un programa en funciones más pequeñas, cada una resolviendo una parte del problema."],
      ["Function (función)", "Un bloque de código con nombre y reutilizable, definido con def y ejecutado al llamarlo."],
      ["Abstraction (abstracción)", "Usar una función por lo que hace, sin necesidad de saber cómo lo hace."],
      ["Top-down design (diseño de arriba hacia abajo)", "Planear primero los pasos principales como llamadas a funciones y después implementar cada función."]
    ],
    example: "Un script de nómina repetía el mismo cálculo de horas extra en tres lugares, y un cambio de tarifa se corrigió solo en dos de ellos. Mover el cálculo a una sola función overtime_pay(hours, rate) hace que los cambios futuros ocurran en un solo lugar y que los tres puntos de llamada sean coherentes.",
    tip: "Las preguntas del examen sobre descomposición se centran en el porqué: reutilización, legibilidad, pruebas más fáciles y trabajo en equipo. Una función que devuelve un valor es más reutilizable que una que solo lo imprime.",
    check: [
      ["Menciona dos beneficios de dividir un programa en funciones.", "Dos cualesquiera de: reutilización de código, lectura más fácil, pruebas y depuración más fáciles, reparto del trabajo y ocultar detalles detrás de un nombre claro."],
      ["¿Por qué devolver un resultado suele ser mejor que imprimirlo dentro de la función?", "Así quien llama puede usar el valor en otros cálculos, guardarlo o imprimirlo como quiera."],
      ["¿Qué es un stub y cómo ayuda a la descomposición?", "Una función marcador de posición (a menudo con cuerpo pass) que te permite escribir y ejecutar el programa general antes de que cada pieza esté terminada."]
    ] },
  { t: "Defining and invoking functions; functions must be defined before they are called", tt: "Definir e invocar funciones; las funciones deben definirse antes de llamarlas",
    body: [
      "Defines una función con la palabra clave `def`, seguida del nombre de la función, un par de paréntesis con los parámetros que tenga y dos puntos. El bloque con sangría de abajo es el cuerpo de la función. Definir una función no ejecuta el cuerpo; crea un objeto función y lo vincula al nombre. El cuerpo se ejecuta solo cuando llamas (invocas) a la función escribiendo su nombre seguido de paréntesis, con los argumentos dentro.",
      "```python\ndef greet(name):\n    print(\"Hello,\", name)\n\ngreet(\"Ana\")    # Hello, Ana\ngreet(\"Ben\")    # Hello, Ben\n```",
      "Los paréntesis importan. `greet(\"Ana\")` llama a la función. `greet` sin paréntesis es solo una referencia al objeto función; escribirlo solo no hace nada visible, y `print(greet)` muestra algo como `<function greet at 0x...>`. Llamar a una función con un número incorrecto de argumentos lanza `TypeError`.",
      "Python ejecuta un script de arriba hacia abajo, y una instrucción `def` se ejecuta como cualquier otra instrucción: cuando Python llega a ella, crea la función. Así que una función debe estar definida antes de que se ejecute la línea que la llama. Llamarla antes lanza `NameError: name '...' is not defined`.",
      "```python\nsay_hi()        # NameError: todavía no está definida\n\ndef say_hi():\n    print(\"hi\")\n```",
      "Hay un detalle importante. Dentro del cuerpo de una función, los nombres se buscan solo cuando la función se ejecuta, no cuando se define. Así que la función `a()` puede llamar a la función `b()` aunque `b` esté definida más abajo en el archivo, siempre que `b` exista en el momento en que realmente se llama a `a()`. Por eso el patrón habitual de definir primero todas las funciones y llamar a la principal al final siempre funciona.",
      "Los nombres de funciones siguen las mismas reglas que los nombres de variables, y comparten el mismo espacio de nombres. Si más tarde asignas `greet = 5`, el nombre ya no se refiere a la función, y `greet(\"x\")` lanza `TypeError: 'int' object is not callable`. Definir una segunda función con el mismo nombre reemplaza a la primera; Python no admite sobrecarga por número de parámetros. Una función cuyo cuerpo contiene solo `pass` es válida y devuelve `None` al llamarla.",
      "En un laboratorio, puedes escribir la definición de una función en el REPL: después de la línea de encabezado, el prompt cambia a `...` para el cuerpo, y una línea en blanco termina la definición."
    ],
    terms: [
      ["def", "La palabra clave que inicia la definición de una función."],
      ["Invocation (call) (invocación, llamada)", "Ejecutar una función escribiendo su nombre seguido de paréntesis y argumentos."],
      ["Function object (objeto función)", "El valor creado por def y vinculado al nombre de la función; se puede referenciar sin llamarlo."],
      ["NameError", "Se lanza cuando una llamada ocurre antes de que se haya ejecutado la instrucción def de la función."]
    ],
    example: "Un estudiante pone el código principal al inicio de un archivo y las funciones auxiliares al final. Al ejecutar el script, falla de inmediato con NameError. Mover las llamadas a una función main() que se llama en la última línea lo soluciona, porque todos los def ya se ejecutaron antes de que corra main().",
    tip: "Un def debe ejecutarse antes de que corra la llamada, pero el cuerpo de una función puede referirse a otra función definida más abajo, porque los nombres dentro de un cuerpo se buscan solo en el momento de la llamada.",
    check: [
      ["¿Qué hace por sí sola la definición de una función?", "Crea un objeto función y lo vincula al nombre; el cuerpo no se ejecuta hasta que se llama a la función."],
      ["¿Qué pasa si defines dos funciones llamadas f?", "La segunda definición reemplaza a la primera; las llamadas usan la más reciente."],
      ["def a(): return b() se define antes de def b(): return 1, y luego se llama a a() al final. ¿Funciona?", "Sí. Cuando a() se ejecuta, b ya existe, así que la búsqueda tiene éxito y devuelve 1."]
    ] },
  { t: "Return and yield, returning several values as a tuple, the None value", tt: "return y yield, devolver varios valores como una tupla, el valor None",
    body: [
      "La instrucción `return` termina una función de inmediato y envía un valor de vuelta a quien la llamó. La expresión de llamada entonces se evalúa a ese valor, así que puedes asignarlo, imprimirlo o usarlo en una expresión más grande: `total = add(2, 3)`. Cualquier código posterior a un `return` ejecutado en la misma función se omite. Una función puede contener varias instrucciones `return`, por ejemplo una en cada rama de un `if`, pero solo una de ellas se ejecuta en cada llamada.",
      "```python\ndef sign(n):\n    if n > 0:\n        return \"positive\"\n    elif n < 0:\n        return \"negative\"\n    return \"zero\"\n\nprint(sign(-4))   # negative\n```",
      "Una función que termina sin llegar a un `return`, o que usa un `return` solo sin valor, devuelve el valor especial `None`. `None` es el único objeto del tipo `NoneType` y significa \"sin valor\". Es falsy, se imprime como `None`, y la forma correcta de comprobarlo es `x is None`. Una trampa clásica del examen es imprimir el resultado de una función que imprime pero no devuelve nada: `print(greet())` muestra el saludo y luego `None`.",
      "Para devolver varios valores, escríbelos después de `return` separados por comas: `return low, high`. Python los empaqueta en una sola tupla, así que la función en realidad devuelve un solo objeto. Quien llama puede conservar la tupla o desempaquetarla: `lo, hi = min_max(data)`. El número de nombres debe coincidir con el número de valores, o obtendrás `ValueError`.",
      "```python\ndef min_max(values):\n    return min(values), max(values)\n\nresult = min_max([4, 9, 1])\nprint(result)         # (1, 9)\nlo, hi = min_max([4, 9, 1])\nprint(lo, hi)         # 1 9\n```",
      "`yield` se parece, pero funciona de forma muy distinta, y PCEP espera que lo reconozcas. Una función que contiene `yield` en cualquier parte de su cuerpo se convierte en una función generadora. Llamarla no ejecuta el cuerpo; devuelve un objeto generador. Cada vez que le pides un valor al generador (por ejemplo con un bucle `for`, `next()` o `list()`), el cuerpo se ejecuta hasta el siguiente `yield`, entrega ese valor y se pausa, conservando sus variables locales para la próxima vez. `return` termina una función definitivamente; `yield` produce un valor y se suspende.",
      "```python\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))   # [3, 2, 1]\n```",
      "Los generadores son útiles para producir secuencias largas o infinitas un elemento a la vez, sin construir una lista completa en memoria."
    ],
    terms: [
      ["return", "Termina una función y devuelve un valor (o None) a quien la llamó."],
      ["None", "El valor especial que significa sin valor; lo devuelven las funciones que no devuelven ninguna otra cosa."],
      ["Tuple packing on return (empaquetado de tupla en return)", "return a, b devuelve una sola tupla (a, b), que quien llama puede desempaquetar."],
      ["yield / generator (generador)", "yield convierte una función en un generador que produce valores uno por uno, pausándose entre ellos."]
    ],
    example: "Una función auxiliar de estadística devuelve count, mean en una sola llamada. El código del reporte escribe n, avg = stats(data). Otra función auxiliar que solo imprimía su resultado, sin return, hizo que avg fuera None, y un cálculo posterior falló con TypeError.",
    tip: "Si una función no tiene return (o tiene un return solo), su llamada se evalúa a None; print(f()) mostrará None después de lo que f imprima. Un return con valores separados por comas da una tupla.",
    check: [
      ["¿Qué imprime print(print(\"a\"))?", "a en una línea y luego None, porque print() devuelve None."],
      ["¿De qué tipo es el valor devuelto por return 1, 2?", "tuple; la función devuelve (1, 2)."],
      ["¿Qué devuelve llamar a una función que contiene yield?", "Un objeto generador; el cuerpo se ejecuta solo a medida que se piden valores."]
    ] },
  { t: "Recursion, base cases and RecursionError", tt: "Recursión, casos base y RecursionError",
    body: [
      "Una función recursiva es aquella que se llama a sí misma. La recursión es una forma de resolver un problema reduciéndolo a una versión más pequeña del mismo problema. El factorial de n (escrito n!, el producto de todos los enteros de 1 a n) es un ejemplo clásico: n! es igual a n por (n - 1)!, y 1! es 1.",
      "```python\ndef factorial(n):\n    if n <= 1:          # caso base\n        return 1\n    return n * factorial(n - 1)   # caso recursivo\n\nprint(factorial(5))   # 120\n```",
      "Toda función recursiva correcta tiene dos partes. El caso base es una condición bajo la cual la función devuelve una respuesta directamente, sin llamarse a sí misma. El caso recursivo llama de nuevo a la función con un argumento que se acerca más al caso base. Sin un caso base alcanzable, la función se llamaría a sí misma para siempre.",
      "Ayuda seguir paso a paso lo que ocurre. `factorial(5)` necesita `factorial(4)`, que necesita `factorial(3)`, y así hasta `factorial(1)`, que devuelve 1. Cada llamada espera, con sus propias variables locales separadas, en una pila de llamadas pendientes. Luego los resultados regresan hacia arriba: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24, 5 x 24 = 120. Las llamadas recursivas no comparten variables locales; cada llamada tiene su propio `n`.",
      "Python limita qué tan profunda puede ser la recursión, para evitar que el intérprete se quede sin memoria. En CPython el límite por defecto es de 1000 marcos (puedes consultarlo con `sys.getrecursionlimit()`). Si una función se llama recursivamente a más profundidad que eso, normalmente porque falta el caso base o nunca se puede alcanzar, Python lanza `RecursionError: maximum recursion depth exceeded`. `RecursionError` es una subclase de `RuntimeError`. Por ejemplo, `factorial(-1)` en una versión cuyo caso base es `if n == 1:` se alejaría cada vez más de 1 con cada llamada y nunca se detendría, lanzando finalmente `RecursionError`; usar `n <= 1` lo evita.",
      "Otro ejemplo muy conocido es la sucesión de Fibonacci, donde cada número es la suma de los dos anteriores: `fib(n) = fib(n - 1) + fib(n - 2)` con casos base para 0 y 1. Muestra que una función puede llamarse a sí misma más de una vez por llamada, lo que la hace elegante pero lenta para n grandes, porque los mismos valores se calculan repetidamente.",
      "Todo lo que puede hacer la recursión también lo puede hacer un bucle. La recursión es más clara para problemas que son naturalmente autosimilares, como estructuras anidadas y datos en forma de árbol; los bucles suelen ser más eficientes y no corren el riesgo de alcanzar el límite de profundidad. En el examen, concéntrate en seguir a mano llamadas recursivas pequeñas y en detectar un caso base ausente o inalcanzable."
    ],
    terms: [
      ["Recursion (recursión)", "Una función que se llama a sí misma para resolver una versión más pequeña del mismo problema."],
      ["Base case (caso base)", "La condición bajo la cual una función recursiva devuelve un resultado sin llamarse a sí misma."],
      ["Recursive case (caso recursivo)", "La rama que vuelve a llamar a la función con una entrada más cercana al caso base."],
      ["RecursionError", "Se lanza cuando la recursión supera la profundidad máxima de Python, normalmente porque nunca se alcanza el caso base."]
    ],
    example: "Una función suma los dígitos de un número: digit_sum(n) devuelve n si n < 10 y, si no, n % 10 + digit_sum(n // 10). Para 472 calcula 2 + digit_sum(47), luego 7 + digit_sum(4), y devuelve 13. Quitar la comprobación n < 10 hace que se llame recursivamente sobre 0 para siempre y lance RecursionError.",
    tip: "Al seguir una recursión, escribe cada llamada en su propia línea con su argumento, baja hasta el caso base y luego multiplica o suma en el camino de regreso. Un caso base que los argumentos pueden saltarse es tan malo como no tener ninguno.",
    check: [
      ["¿Qué devuelve def f(n): return 0 if n == 0 else n + f(n - 1) para f(4)?", "10 (4 + 3 + 2 + 1 + 0)."],
      ["¿Qué pasa si llamas a esa misma f con -1?", "n nunca es igual a 0, así que se llama recursivamente hasta que Python lanza RecursionError."],
      ["¿Las llamadas recursivas comparten las mismas variables locales?", "No. Cada llamada tiene sus propias variables locales."]
    ] },
  { t: "Parameters vs arguments; positional, keyword and mixed argument passing", tt: "Parámetros frente a argumentos; paso de argumentos posicional, por palabra clave y mixto",
    body: [
      "Las palabras parámetro y argumento a menudo se usan de forma imprecisa, pero el examen las usa con precisión. Un parámetro es el nombre que aparece en la definición de la función; existe solo dentro de la función. Un argumento es el valor real que pasas al llamar a la función. En `def area(width, height):`, `width` y `height` son parámetros; en `area(3, 4)`, 3 y 4 son argumentos. Cuando se llama a la función, cada parámetro se vincula a su argumento, y el parámetro se comporta entonces como una variable local.",
      "Los argumentos posicionales se asocian a los parámetros por orden: el primer argumento va al primer parámetro, y así sucesivamente. `area(3, 4)` asigna `width = 3` y `height = 4`; intercambiarlos a `area(4, 3)` intercambia los significados.",
      "Los argumentos por palabra clave (keyword arguments) se asocian por nombre, usando `parameter=value` en la llamada. Su orden no importa: `area(height=4, width=3)` es idéntico a `area(3, 4)`. Los argumentos por palabra clave hacen que las llamadas se expliquen solas y te protegen de confundir el orden. Ya los usas con `print(..., sep=\"\", end=\"\")`.",
      "Puedes mezclar ambos estilos en una misma llamada, pero los argumentos posicionales deben ir primero. `area(3, height=4)` es válido. `area(width=3, 4)` es un `SyntaxError` (un argumento posicional sigue a un argumento por palabra clave). Tampoco puedes darle dos valores al mismo parámetro: `area(3, width=5)` lanza `TypeError` porque `width` ya recibió 3 de forma posicional (\"got multiple values for argument 'width'\"). Usar una palabra clave que no es nombre de un parámetro, como `area(3, depth=4)`, también lanza `TypeError`.",
      "```python\ndef intro(name, age, city):\n    print(name, age, city)\n\nintro(\"Ana\", 30, \"Lima\")               # posicional\nintro(city=\"Lima\", name=\"Ana\", age=30) # por palabra clave\nintro(\"Ana\", city=\"Lima\", age=30)      # mixto\n# intro(\"Ana\", 30)        -> TypeError: falta 'city'\n# intro(name=\"Ana\", 30, \"Lima\") -> SyntaxError\n```",
      "Todo parámetro sin valor por defecto debe recibir exactamente un argumento; de lo contrario, Python lanza `TypeError` indicando los argumentos que faltan o sobran. La siguiente lección muestra cómo los valores por defecto hacen que algunos parámetros sean opcionales.",
      "Pasar un argumento vincula el parámetro al mismo objeto que tiene quien llama; no se copia nada. Volver a vincular el parámetro dentro de la función (`values = []`) no afecta a quien llama, pero mutar un argumento mutable (`values.append(1)`) sí, porque ambos nombres se refieren a la misma lista."
    ],
    terms: [
      ["Parameter (parámetro)", "Un nombre en la definición de una función que recibe un valor cuando se llama a la función."],
      ["Argument (argumento)", "El valor real que se proporciona en una llamada a función."],
      ["Positional argument (argumento posicional)", "Un argumento que se asocia a un parámetro según su posición en la llamada."],
      ["Keyword argument (argumento por palabra clave)", "Un argumento que se asocia por nombre, escrito name=value en la llamada."]
    ],
    example: "Una función de reservas book(room, nights, guests) se llamó como book(2, 101, 3), reservando sin aviso la habitación 2 por 101 noches. Reescribir las llamadas como book(room=101, nights=2, guests=3) hace explícita la intención y evita confusiones de orden.",
    tip: "Siempre posicionales antes que por palabra clave. Un argumento por palabra clave antes de uno posicional es un SyntaxError; darle dos valores a un parámetro o usar un nombre inexistente es un TypeError.",
    check: [
      ["Para def f(a, b): ..., ¿es válido f(b=1, a=2)?", "Sí. Los argumentos por palabra clave pueden aparecer en cualquier orden; a es 2 y b es 1."],
      ["¿Qué hace f(1, a=2) para def f(a, b)?", "TypeError: a recibe 1 de forma posicional y otra vez por palabra clave (multiple values for argument 'a'), y falta b."],
      ["En def f(x): y f(5), ¿cuál es el parámetro y cuál el argumento?", "x es el parámetro; 5 es el argumento."]
    ] },
  { t: "Default parameter values and why defaults must follow required parameters", tt: "Valores por defecto de los parámetros y por qué deben ir después de los parámetros obligatorios",
    body: [
      "A un parámetro se le puede dar un valor por defecto en la definición de la función con `name=value`. Si quien llama proporciona un argumento para él, se usa ese argumento; si no, se usa el valor por defecto. Esto permite que una misma función sirva tanto para llamadas simples como detalladas. El propio `print()` funciona así: `sep` vale un espacio por defecto y `end` un salto de línea.",
      "```python\ndef greet(name, greeting=\"Hello\"):\n    print(greeting + \", \" + name)\n\ngreet(\"Ana\")                 # Hello, Ana\ngreet(\"Ben\", \"Hi\")           # Hi, Ben\ngreet(\"Cy\", greeting=\"Hey\")  # Hey, Cy\n```",
      "Los parámetros sin valor por defecto se llaman parámetros obligatorios, porque toda llamada debe proporcionarlos. La regla es que en la definición todos los parámetros obligatorios deben ir antes de cualquier parámetro que tenga valor por defecto. `def f(a, b=2):` está bien, pero `def f(a=1, b):` es un `SyntaxError` (reportado como \"non-default argument follows default argument\", o en Python 3.12 y posteriores como \"parameter without a default follows parameter with a default\").",
      "¿Por qué existe esta regla? Los argumentos posicionales se asignan de izquierda a derecha. En `def f(a=1, b):`, una llamada como `f(5)` sería ambigua: ¿el 5 debería ir a `a`, dejando a `b` sin valor, o debería saltarse `a` e ir a `b`? Python evita la ambigüedad exigiendo que los parámetros opcionales vayan al final, de modo que los argumentos posicionales siempre llenan primero los obligatorios y las posiciones restantes llenan los opcionales en orden.",
      "Puedes sobrescribir solo algunos valores por defecto. Con `def box(w, h=1, d=1):`, la llamada `box(5, d=3)` usa el valor por defecto de `h` y sobrescribe `d`. Usar una palabra clave es la única forma de saltarse un parámetro opcional anterior; de forma posicional, `box(5, 3)` asigna `h`, no `d`.",
      "Los valores por defecto se evalúan una sola vez, cuando se ejecuta la instrucción `def`, no en cada llamada. Para valores por defecto inmutables como números, cadenas, `None` o tuplas, esto no hace ninguna diferencia. Para un valor por defecto mutable como una lista, todas las llamadas que usan el valor por defecto comparten el mismo objeto lista, así que los cambios se acumulan entre llamadas. La solución estándar es usar `None` como valor por defecto y crear la lista dentro de la función.",
      "```python\ndef add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag\n\nprint(add_item(1), add_item(2))   # [1] [2]\n```",
      "Si en cambio el valor por defecto fuera `bag=[]`, la segunda llamada devolvería `[1, 2]`, lo cual rara vez es lo que alguien quiere."
    ],
    terms: [
      ["Default parameter value (valor por defecto de un parámetro)", "Un valor dado en la definición con name=value, que se usa cuando quien llama omite ese argumento."],
      ["Required parameter (parámetro obligatorio)", "Un parámetro sin valor por defecto, que toda llamada debe proporcionar."],
      ["Non-default argument follows default argument", "El SyntaxError que se lanza cuando un parámetro obligatorio se coloca después de uno con valor por defecto."],
      ["Mutable default trap (trampa del valor por defecto mutable)", "Un valor por defecto de tipo lista o diccionario se crea una sola vez y lo comparten todas las llamadas que lo usan."]
    ],
    example: "Una función auxiliar de registro se define como def log(msg, level=\"INFO\", to_screen=True). La mayoría de las llamadas son simplemente log(\"Started\"), mientras que una ruta de error llama a log(\"Disk full\", level=\"ERROR\"), sobrescribiendo un valor por defecto y conservando el otro.",
    tip: "Los valores por defecto van a la derecha. def f(a=1, b) ni siquiera llega a definirse: es un SyntaxError en el momento de la definición, no un error en el momento de la llamada.",
    check: [
      ["¿Es válido def f(a, b=2, c=3):, y qué valor tiene b en f(1, c=9)?", "Es válido; b conserva su valor por defecto 2 y c es 9."],
      ["¿Por qué se rechaza def f(x=0, y):?", "Los parámetros obligatorios deben ir antes que los que tienen valor por defecto; de lo contrario, los argumentos posicionales no podrían asociarse sin ambigüedad."],
      ["¿Cuándo se evalúa un valor por defecto?", "Una sola vez, cuando se ejecuta la instrucción def, no en cada llamada."]
    ] },
  { t: "Name scopes, shadowing and the global keyword; UnboundLocalError", tt: "Ámbitos de nombres, ocultamiento (shadowing) y la palabra clave global; UnboundLocalError",
    body: [
      "El ámbito (scope) de un nombre es la parte del programa donde ese nombre se puede ver y usar. Los nombres asignados en el nivel superior de un script viven en el ámbito global y son visibles en todo el archivo, incluso dentro de las funciones. Los nombres creados dentro de una función, incluidos sus parámetros, son locales: existen solo mientras esa llamada se está ejecutando y no se pueden ver desde fuera. Usar la variable local de una función después de que la función termina lanza `NameError`.",
      "Cuando Python busca un nombre, busca primero en el ámbito local, luego en los ámbitos de las funciones que lo contienen, después en el ámbito global y, por último, en los nombres integrados como `print` y `len`. Gana la primera coincidencia. Esto suele resumirse como LEGB: local, enclosing (envolvente), global, built-in (integrado).",
      "Leer una variable global dentro de una función funciona sin ninguna sintaxis especial. Sin embargo, asignar a un nombre dentro de una función hace que ese nombre sea local en toda la función. Si una variable local tiene el mismo nombre que una global, la local oculta (shadows) a la global dentro de la función, y la global no se toca. Los parámetros ocultan a las globales de la misma manera.",
      "```python\nx = 10\ndef show():\n    print(x)      # lee la global: 10\ndef change():\n    x = 99        # crea una x local; la global no cambia\nchange()\nprint(x)          # 10\n```",
      "Para asignar a una variable global desde dentro de una función, declárala con la palabra clave `global` al inicio de la función: `global counter`. Después de eso, las asignaciones a `counter` en la función afectan a la variable global, y si la global todavía no existe, la asignación la crea. Usa `global` con moderación; pasar valores como argumentos y obtener resultados con `return` mantiene las funciones independientes y más fáciles de probar.",
      "```python\ncounter = 0\ndef bump():\n    global counter\n    counter += 1\nbump(); bump()\nprint(counter)    # 2\n```",
      "`UnboundLocalError` es el error que une estas reglas. Python decide qué nombres son locales cuando compila la función: cualquier nombre asignado en cualquier parte del cuerpo es local en todo el cuerpo. Así que si lees ese nombre antes de que ocurra la asignación local, todavía no hay un valor local, y Python no recurre a la global. `x = 1` en el nivel superior seguido de `def f(): print(x); x = 2` lanza `UnboundLocalError` cuando se llama a `f()`, aunque exista una `x` global. Lo mismo ocurre con `count += 1` dentro de una función sin `global count`, porque `+=` lee y asigna a la vez. `UnboundLocalError` es una subclase de `NameError`.",
      "Mutar un objeto global es distinto de asignar a su nombre. `items.append(4)` dentro de una función cambia una lista global sin necesidad de ninguna instrucción `global`, porque el nombre `items` solo se lee, no se vuelve a vincular."
    ],
    terms: [
      ["Scope (ámbito)", "La región del código en la que un nombre es visible, como local o global."],
      ["Shadowing (ocultamiento)", "Un nombre local que oculta, dentro de una función, a un nombre global o integrado escrito igual."],
      ["global keyword (palabra clave global)", "Declara que un nombre usado en una función se refiere a la variable global, de modo que las asignaciones la cambian."],
      ["UnboundLocalError", "Se lanza cuando se lee una variable local antes de asignarla en esa función; es una subclase de NameError."]
    ],
    example: "Un juego guarda score = 0 de forma global y tiene def add_points(): score += 10. La primera llamada falla con UnboundLocalError, porque += hace que score sea local. Agregar global score lo soluciona, pero un diseño más limpio es def add_points(score): return score + 10.",
    tip: "Cualquier asignación a un nombre en cualquier parte de una función lo hace local para toda la función, así que leerlo antes en esa misma función lanza UnboundLocalError en lugar de leer la global.",
    check: [
      ["Se llama a x = 5; def f(): x = 7 y luego a print(x). ¿Qué se muestra?", "5. La asignación dentro de f creó una x local."],
      ["¿Por qué falla def g(): total += 1 cuando total es global?", "+= asigna a total, haciéndola local, y leer la variable local sin asignar lanza UnboundLocalError."],
      ["¿Necesita una función global para llamar a append() sobre una lista global?", "No. Mutar el objeto no vuelve a vincular el nombre, así que no hace falta declarar global."]
    ] },
  { t: "The exception hierarchy: BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, LookupError", tt: "La jerarquía de excepciones: BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, LookupError",
    body: [
      "Cuando algo sale mal en tiempo de ejecución, Python lanza una excepción: un objeto que describe el error. Las excepciones se organizan en una jerarquía de clases, un árbol genealógico en el que los tipos de excepción más específicos heredan de los más generales. Esto importa porque una cláusula `except` que nombra una clase también captura todas las clases que están debajo de ella en el árbol.",
      "En la raíz está `BaseException`. Todas las excepciones heredan de ella. Directamente debajo hay algunas excepciones especiales que en realidad no son errores, sobre todo `SystemExit`, lanzada por `sys.exit()` para terminar el programa, y `KeyboardInterrupt`, lanzada cuando el usuario presiona Ctrl+C. (`GeneratorExit` es otra, usada internamente por los generadores.) También directamente debajo de `BaseException` está `Exception`, la clase base de todos los errores ordinarios.",
      "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- TypeError\n      +-- ValueError\n      +-- NameError\n           +-- UnboundLocalError\n```",
      "¿Por qué `SystemExit` y `KeyboardInterrupt` se mantienen fuera de `Exception`? Porque el código que captura `Exception` para manejar errores ordinarios no debería impedir por accidente que el programa termine ni evitar que el usuario lo interrumpa. `except Exception:` deja pasar Ctrl+C y `sys.exit()`, mientras que un `except:` solo (o `except BaseException:`) también los atrapa, y por eso se desaconseja el except solo (bare except).",
      "`ArithmeticError` agrupa los errores de las operaciones numéricas. Sus subclases incluyen `ZeroDivisionError` (dividir o calcular un residuo entre cero) y `OverflowError` (un resultado demasiado grande para representarse, que con los enteros ilimitados de Python ocurre sobre todo con floats, por ejemplo `2.0 ** 10000`). Capturar `ArithmeticError` las maneja todas.",
      "`LookupError` agrupa los errores causados por un índice o una clave no válidos al buscar algo en una colección. `IndexError` (un índice de secuencia fuera de rango) y `KeyError` (una clave de diccionario inexistente) son ambas subclases. Así, `except LookupError:` captura por igual `[1, 2][5]` y `{}[\"x\"]`.",
      "Puedes comprobar las relaciones en el REPL con `issubclass(ZeroDivisionError, ArithmeticError)`, que devuelve `True`, o `issubclass(KeyboardInterrupt, Exception)`, que devuelve `False`. En el examen te preguntarán qué rama `except` captura un error dado, y la respuesta siempre sigue este árbol."
    ],
    terms: [
      ["BaseException", "La clase raíz de todas las excepciones de Python."],
      ["Exception", "La clase base de los errores ordinarios; excluye SystemExit y KeyboardInterrupt."],
      ["ArithmeticError", "Clase base de los errores numéricos como ZeroDivisionError y OverflowError."],
      ["LookupError", "Clase base de IndexError y KeyError, lanzadas por índices o claves no válidos."],
      ["KeyboardInterrupt", "Se lanza cuando el usuario presiona Ctrl+C; deriva de BaseException, no de Exception."]
    ],
    example: "Un bucle de procesamiento de datos envuelve cada registro en try con except Exception: para registrar los registros defectuosos y continuar. Cuando el operador presiona Ctrl+C, KeyboardInterrupt no es una subclase de Exception, así que pasa de largo y el programa se detiene como se esperaba. Un except solo lo habría atrapado y el bucle habría seguido.",
    tip: "Aprende qué clases están debajo de cuáles: IndexError y KeyError bajo LookupError, ZeroDivisionError bajo ArithmeticError, y SystemExit y KeyboardInterrupt directamente bajo BaseException, fuera de Exception.",
    check: [
      ["¿except LookupError: captura un KeyError?", "Sí. KeyError es una subclase de LookupError."],
      ["¿except Exception: captura KeyboardInterrupt?", "No. KeyboardInterrupt hereda directamente de BaseException."],
      ["¿Qué clase es el padre común de ZeroDivisionError y OverflowError?", "ArithmeticError."]
    ] },
  { t: "Common built-in exceptions: ZeroDivisionError, IndexError, KeyError, TypeError, ValueError, NameError", tt: "Excepciones integradas comunes: ZeroDivisionError, IndexError, KeyError, TypeError, ValueError, NameError",
    body: [
      "PCEP espera que mires un fragmento corto de código y nombres la excepción que lanza. Seis excepciones integradas aparecen una y otra vez. Aprende qué provoca cada una y en qué se diferencian, especialmente el par `TypeError` y `ValueError`.",
      "`ZeroDivisionError` se lanza cuando el operando derecho de `/`, `//` o `%` es cero, ya sea `0` o `0.0`: `5 / 0`, `5 // 0.0` y `5 % 0` la lanzan. Ten en cuenta que `0 ** -1` también la lanza. Es una subclase de `ArithmeticError`.",
      "`IndexError` se lanza cuando un índice de secuencia está fuera de rango: `[1, 2, 3][3]`, `\"abc\"[-4]` o `()[0]`. Las rebanadas nunca la lanzan. `KeyError` se lanza cuando falta una clave de diccionario: `{\"a\": 1}[\"b\"]`, o `del d[\"b\"]` para una clave que no está. Ambas son subclases de `LookupError`. Ten en cuenta que `list.index(x)` y `list.remove(x)` con un valor inexistente lanzan `ValueError`, no `IndexError`, porque el problema es el valor, no una posición.",
      "`TypeError` significa que una operación o función recibió un valor de un tipo inapropiado. Ejemplos: `\"a\" + 1`, `len(5)`, `\"ab\" * 2.0`, llamar a algo que no se puede llamar (`5()`), asignar a un elemento de una tupla o de una cadena, o llamar a una función con un número incorrecto de argumentos.",
      "`ValueError` significa que el tipo era aceptable pero el valor concreto no. Ejemplos: `int(\"abc\")`, `int(\"3.5\")`, `float(\"x\")`, `[1, 2].index(9)`, `[1, 2].remove(9)` y desempaquetar un número incorrecto de elementos, como en `a, b = (1, 2, 3)`. La prueba rápida: si otro valor del mismo tipo hubiera funcionado, es un `ValueError`; si ningún valor de ese tipo podría funcionar, es un `TypeError`.",
      "`NameError` se lanza cuando se usa un nombre que no se ha definido en ningún ámbito alcanzable: una variable mal escrita (`prnt(1)`), una variable usada antes de asignarla en el nivel superior, o una función llamada antes de que se ejecutara su `def`. Su subclase `UnboundLocalError` cubre las variables locales leídas antes de asignarlas dentro de una función.",
      "```python\ntests = [lambda: 1 / 0, lambda: [0][1], lambda: {}[\"k\"],\n         lambda: \"a\" + 1, lambda: int(\"x\"), lambda: undefined_name]\nfor t in tests:\n    try:\n        t()\n    except Exception as e:\n        print(type(e).__name__)\n```",
      "Ejecutar ese bucle en un laboratorio imprime los seis nombres en orden. Cuando una excepción no se maneja, Python imprime un traceback que termina con una línea como `ZeroDivisionError: division by zero`; la última línea indica el tipo de excepción y el mensaje, y es donde hay que mirar primero."
    ],
    terms: [
      ["ZeroDivisionError", "Se lanza al dividir o calcular un residuo entre cero."],
      ["IndexError vs KeyError", "IndexError: índice de secuencia fuera de rango; KeyError: clave de diccionario inexistente."],
      ["TypeError", "Una operación recibió un valor de un tipo incorrecto, como sumar str e int."],
      ["ValueError", "Un valor tiene el tipo correcto pero un contenido inaceptable, como int(\"abc\")."],
      ["NameError", "Se usa un nombre que no se ha definido."]
    ],
    example: "Un script de encuestas lee edades con int(input()). Una persona escribe \"twenty\" y el programa se detiene con ValueError; otro registro tiene un campo faltante, así que row[5] lanza IndexError. Reconocer cada error por la última línea de su traceback le indica al desarrollador qué comprobación agregar.",
    tip: "TypeError tiene que ver con el tipo de valor; ValueError, con el valor concreto. list.index() y list.remove() con un elemento inexistente lanzan ValueError, no IndexError.",
    check: [
      ["¿Qué lanza int([1]) y qué lanza int(\"1.5\")?", "int([1]) lanza TypeError (una lista no se puede convertir); int(\"1.5\") lanza ValueError (una cadena está bien, pero ese contenido no)."],
      ["¿Qué lanza {\"a\": 1}.get(\"b\")?", "Nada. get() devuelve None para una clave inexistente; solo indexar con [] lanza KeyError."],
      ["¿Qué excepción lanza a, b = [1, 2, 3]?", "ValueError: too many values to unpack (demasiados valores para desempaquetar)."]
    ] },
  { t: "Try-except, except with several exceptions, bare except and except Exception", tt: "try-except, except con varias excepciones, except solo y except Exception",
    body: [
      "El manejo de excepciones permite que tu programa responda a los errores en lugar de fallar. Pones el código que podría fallar en un bloque `try` y el código de recuperación en uno o más bloques `except`. Si no ocurre ninguna excepción en el bloque `try`, todos los bloques `except` se omiten. Si ocurre una excepción, el resto del bloque `try` se abandona de inmediato, y Python busca la primera cláusula `except` cuyo tipo coincida con la excepción o con una de sus clases padre. Si una coincide, se ejecuta su bloque y la ejecución continúa después de toda la instrucción. Si ninguna coincide, la excepción sigue hacia arriba como si no hubiera ningún manejador.",
      "```python\ntry:\n    n = int(input(\"Number: \"))\n    print(100 / n)\nexcept ValueError:\n    print(\"That was not a whole number\")\nexcept ZeroDivisionError:\n    print(\"Zero is not allowed\")\nprint(\"Carrying on\")\n```",
      "Solo se ejecuta una rama `except` por excepción, aunque varias pudieran coincidir. Para manejar distintas excepciones de la misma manera, escríbelas como una tupla en una sola cláusula: `except (ValueError, TypeError):`. Escribe siempre los paréntesis; son obligatorios en todas las versiones de Python anteriores a la 3.14 y siempre que agregues `as`. Para acceder al objeto excepción, agrega `as` y un nombre: `except ZeroDivisionError as e: print(e)` imprime el mensaje `division by zero`.",
      "Un `except:` solo (bare except), sin tipo de excepción, lo captura todo, incluidos `SystemExit` y `KeyboardInterrupt`. Debe ser la última cláusula `except`, o el código es un `SyntaxError`. Como además oculta errores de escritura (un `NameError` de una variable mal escrita se captura en silencio) y puede impedir que Ctrl+C funcione, en general se desaconseja. `except Exception:` es la opción habitual para \"capturar casi todo\": captura todos los errores ordinarios pero deja pasar `SystemExit` y `KeyboardInterrupt`, porque esas no heredan de `Exception`.",
      "Dos cláusulas opcionales completan la instrucción. Un bloque `else:`, colocado después de todas las cláusulas `except`, se ejecuta solo si el bloque `try` no lanzó ninguna excepción. Un bloque `finally:` se ejecuta en todos los casos, haya ocurrido una excepción o no, y se haya manejado o no, lo que lo convierte en el lugar para la limpieza, como cerrar un archivo. El orden es siempre `try`, cláusulas `except`, `else`, `finally`.",
      "```python\ntry:\n    value = [1, 2][5]\nexcept (IndexError, KeyError) as err:\n    print(\"Lookup failed:\", err)\nelse:\n    print(\"No error\")\nfinally:\n    print(\"Always runs\")\n```",
      "Mantén los bloques `try` pequeños, envolviendo solo las instrucciones que realmente pueden fallar. Captura la excepción más específica que razonablemente puedas manejar, y no uses `except:` con `pass` para silenciar errores que no entiendes; eso convierte un fallo claro en una respuesta incorrecta y misteriosa."
    ],
    terms: [
      ["try-except", "Una instrucción que ejecuta el código de try y, si ocurre una excepción que coincide, ejecuta el bloque except correspondiente."],
      ["Exception tuple (tupla de excepciones)", "except (A, B): maneja cualquiera de varios tipos de excepción en una sola rama."],
      ["Bare except (except solo)", "except: sin tipo; captura todas las excepciones, incluidas SystemExit y KeyboardInterrupt, y debe ir al final."],
      ["finally", "Un bloque que siempre se ejecuta después de try, haya ocurrido una excepción o no."]
    ],
    example: "Un conversor de unidades envuelve float(input()) en try con except ValueError: para volver a pedir el dato al usuario. Una versión anterior usaba un except solo, y cuando el desarrollador escribió mal una variable dentro del try, el NameError se capturó en silencio y se mostró a los usuarios como \"número no válido\".",
    tip: "Solo se ejecuta el primer except que coincide. Un except solo debe ir al final y captura incluso KeyboardInterrupt; except Exception no captura SystemExit ni KeyboardInterrupt.",
    check: [
      ["Si la primera línea de un bloque try lanza una excepción, ¿se ejecutan las demás líneas del bloque try?", "No. El bloque try se abandona en la línea que falla y el control salta al except que coincide."],
      ["¿Cómo capturas ValueError y ZeroDivisionError en una sola cláusula?", "except (ValueError, ZeroDivisionError): con los tipos en una tupla."],
      ["¿Es válido poner except: antes de except ValueError:?", "No. Un except solo debe ser la última cláusula except; de lo contrario, Python reporta un SyntaxError."]
    ] },
  { t: "Ordering except branches from specific to general", tt: "Ordenar las ramas except de lo específico a lo general",
    body: [
      "Cuando se lanza una excepción dentro de un bloque `try`, Python revisa las cláusulas `except` de arriba hacia abajo y ejecuta la primera que coincide. Una cláusula coincide si la excepción es una instancia de la clase nombrada o de cualquiera de sus subclases. Una vez que una cláusula coincide, las siguientes ya no se consideran. Esta regla de la primera coincidencia es la razón por la que importa el orden de las ramas `except`.",
      "Piensa en lo que pasa si una clase general va primero. `except Exception:` coincide con casi cualquier error, y `except LookupError:` coincide tanto con `IndexError` como con `KeyError`. Si pones una de ellas encima de una cláusula más específica, la cláusula específica nunca podrá ejecutarse: es inalcanzable.",
      "```python\ntry:\n    print([1, 2][9])\nexcept LookupError:\n    print(\"lookup problem\")   # esta se ejecuta\nexcept IndexError:\n    print(\"bad index\")        # nunca se alcanza\n```",
      "Python no reporta ningún error por esto; el código se ejecuta, pero la rama `IndexError` es código muerto. Las preguntas del examen con frecuencia muestran un fragmento como este y preguntan qué se imprime, así que revisa siempre las cláusulas en orden y detente en la primera cuya clase sea la misma que la de la excepción lanzada o un ancestro de ella.",
      "El patrón correcto es ordenar las ramas de la más específica a la más general: primero las subclases, luego sus padres, después `Exception`, y un `except:` solo (si es que usas uno) al final. Así cada caso específico recibe su manejo a la medida, y la cláusula general actúa como red de seguridad para cualquier cosa inesperada.",
      "```python\ntry:\n    result = data[key] / count\nexcept KeyError:\n    print(\"No such key\")\nexcept ZeroDivisionError:\n    print(\"Count is zero\")\nexcept ArithmeticError:\n    print(\"Other maths problem\")\nexcept Exception as e:\n    print(\"Unexpected:\", type(e).__name__)\n```",
      "Dos excepciones que no están relacionadas (ninguna hereda de la otra), como `KeyError` y `ZeroDivisionError`, pueden aparecer en cualquier orden sin cambiar el comportamiento, porque una excepción dada solo puede coincidir con una de ellas. El orden solo importa a lo largo de una misma rama de la jerarquía. Por lo tanto, para razonar sobre cualquier fragmento necesitas la jerarquía de la lección anterior: `ZeroDivisionError` bajo `ArithmeticError`, `IndexError` y `KeyError` bajo `LookupError`, y todas ellas bajo `Exception`, que a su vez está bajo `BaseException`.",
      "La misma lógica se aplica cuando una cláusula enumera una tupla: `except (ValueError, LookupError):` colocada encima de `except KeyError:` también hace inalcanzable la rama `KeyError`."
    ],
    terms: [
      ["First match rule (regla de la primera coincidencia)", "Python ejecuta solo la primera cláusula except cuyo tipo coincide con la excepción o con uno de sus padres."],
      ["Unreachable handler (manejador inalcanzable)", "Una cláusula except que nunca puede ejecutarse porque una cláusula anterior captura una clase padre."],
      ["Specific to general (de lo específico a lo general)", "El orden recomendado: las subclases antes que sus clases base, Exception al final."]
    ],
    example: "Un cargador de configuración tiene except Exception: seguido de except KeyError: para imprimir \"falta un ajuste\". Los usuarios siempre ven el mensaje genérico porque Exception coincide primero. Intercambiar las dos cláusulas hace que las claves faltantes produzcan el mensaje específico y útil.",
    tip: "Recorre las cláusulas except estrictamente de arriba hacia abajo y detente en la primera clase que sea igual o ancestro. Una clase general encima de una específica convierte la rama específica en código muerto, y Python no te avisa.",
    check: [
      ["Con except ArithmeticError: encima de except ZeroDivisionError:, ¿cuál se ejecuta para 1 / 0?", "La rama ArithmeticError, porque ZeroDivisionError es su subclase y esa rama va primero."],
      ["¿Importa el orden de except KeyError: y except TypeError:?", "No. Son clases no relacionadas, así que una excepción dada puede coincidir como máximo con una de ellas."],
      ["¿Dónde debe ir except Exception: entre varias cláusulas except?", "Después de todas las cláusulas más específicas (solo un except solo, si se usa, puede ir después)."]
    ] },
  { t: "Propagating exceptions through function boundaries and deciding where to handle them", tt: "Propagación de excepciones a través de las funciones y cómo decidir dónde manejarlas",
    body: [
      "Una excepción no tiene que manejarse en la función donde se lanza. Si una función no tiene un `except` que coincida con una excepción, la función se detiene de inmediato, y la excepción se pasa (se propaga) al código que la llamó, en el punto de la llamada. Si quien llamó tampoco la maneja, sube de nuevo, pasando por cada función que llamó, una tras otra. Si llega al nivel superior del programa sin ser manejada, Python imprime un traceback y el programa termina.",
      "```python\ndef parse(text):\n    return int(text)          # puede lanzar ValueError\n\ndef read_age(text):\n    age = parse(text)         # aquí no hay manejador\n    return age\n\ntry:\n    print(read_age(\"abc\"))\nexcept ValueError:\n    print(\"Please enter digits\")   # se maneja en el nivel superior\n```",
      "Aquí `int(\"abc\")` lanza `ValueError` dentro de `parse`. Ni `parse` ni `read_age` la manejan, así que ambas se detienen de inmediato, las instrucciones `return` nunca se ejecutan, y la excepción llega al `try` que rodea la llamada a `read_age`, donde se maneja. El traceback que Python imprime para una excepción no manejada enumera esta cadena de llamadas, de la más antigua a la más reciente, con la línea donde se lanzó el error al final, justo encima del nombre de la excepción y su mensaje. Leer un traceback de abajo hacia arriba es la forma más rápida de encontrar dónde salieron mal las cosas.",
      "Una vez que una excepción se ha manejado, deja de propagarse. Si `parse` hubiera capturado el `ValueError` por sí misma y hubiera devuelto, por ejemplo, `None`, quien la llamó nunca sabría que ocurrió un error, y recibiría `None` en su lugar. Esa es una decisión de diseño, no solo de sintaxis.",
      "Entonces, ¿dónde deberías manejar una excepción? Manéjala en el nivel que sabe qué hacer con ella. Una función auxiliar de bajo nivel como `parse` normalmente no puede saber si debe volver a preguntarle al usuario, usar un valor por defecto o abortar, así que a menudo es mejor dejar que la excepción se propague. El código que interactúa con el usuario, como un bucle de entrada, es el lugar adecuado para capturarla y volver a pedir el dato. Por el contrario, si una función realmente puede recuperarse (por ejemplo, devolver un valor por defecto razonable para una clave de diccionario inexistente), manejarla localmente mantiene más simples a quienes la llaman.",
      "Una función también puede lanzar excepciones a propósito con la instrucción `raise`, por ejemplo `raise ValueError(\"age must be positive\")`, para señalar un problema a quien la llamó. Dentro de un bloque `except`, un `raise` solo vuelve a lanzar la excepción actual para que siga propagándose después de que, por ejemplo, la hayas registrado.",
      "En el examen, sigue la propagación preguntándote en cada nivel: ¿la llamada que falla está dentro de un `try` con un `except` que coincide aquí? Si no, omite el resto de esta función y pasa a quien la llamó. Recuerda que las líneas posteriores a la llamada que falla en cada función abandonada nunca se ejecutan, pero un bloque `finally` en el camino hacia arriba sí se ejecuta."
    ],
    terms: [
      ["Propagation (propagación)", "Una excepción no manejada que sale de la función actual y pasa a quien la llamó, subiendo por la cadena de llamadas."],
      ["Traceback", "El informe que Python imprime para una excepción no manejada, con la cadena de llamadas y el error."],
      ["raise", "Una instrucción que lanza una excepción; un raise solo dentro de un bloque except vuelve a lanzar la excepción actual."],
      ["Call stack (pila de llamadas)", "La cadena de llamadas a funciones activas a través de la cual se propaga una excepción."]
    ],
    example: "La función withdraw() de una aplicación bancaria lanza ValueError(\"insufficient funds\") en lugar de imprimir un mensaje. El manejador web que la llamó captura ValueError y muestra el mensaje al usuario, mientras que un proceso por lotes que llama a la misma función la captura y registra la transacción fallida. Cada quien que llama decide qué significa el error para sí.",
    tip: "Cuando una excepción escapa de una función, se omiten todas las líneas restantes de esa función, incluido su return. La excepción la captura el try más cercano que la rodea con un except que coincide, en cualquier punto hacia arriba de la cadena de llamadas.",
    check: [
      ["Si f() llama a g() y g() lanza KeyError sin ningún manejador en g, ¿dónde se captura?", "En el except que coincide más cercano alrededor de la llamada en f, o en quienes llaman a f; si no existe ninguno, el programa se detiene con un traceback."],
      ["Después de que una excepción se propaga fuera de una función, ¿se ejecuta su instrucción return?", "No. La función se abandona en la línea que falla, así que las líneas posteriores, incluido return, se omiten (un bloque finally sí se ejecuta)."],
      ["¿Por qué una función auxiliar de bajo nivel podría elegir no capturar una excepción?", "Puede que no sepa cuál es la recuperación correcta; dejar que la excepción se propague permite que quien la llama, que tiene más contexto, decida."]
    ] },
], { lang: "es" });
