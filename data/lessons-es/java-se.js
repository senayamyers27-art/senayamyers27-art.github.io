/* Lecciones en español para java-se */
CertHub.addLessons("java-se", [
 {
  "t": "Primitive types, literals (underscores, binary/hex/octal), default values",
  "tt": "Tipos primitivos, literales (guiones bajos, binario/hex/octal) y valores por defecto",
  "body": [
   "Java tiene ocho tipos primitivos, y guardan valores directos en lugar de referencias a objetos. Cuatro son tipos enteros: `byte` (8 bits), `short` (16 bits), `int` (32 bits) y `long` (64 bits), todos con signo. Dos son de punto flotante: `float` (32 bits) y `double` (64 bits). `char` es un valor de 16 bits sin signo que almacena una unidad de código UTF-16, así que puede usarse en aritmética, y `boolean` solo contiene `true` o `false`. A diferencia de otros lenguajes, un `boolean` de Java nunca es un número: `if (1)` no compila.",
   "Un literal es un valor escrito directamente en el código fuente. Un número entero simple como `42` es un literal `int`, por lo que un valor demasiado grande para `int` necesita el sufijo `L`: `long big = 3_000_000_000L;` compila, pero el mismo número sin `L` es un error de compilación aunque el destino sea un `long`. Un número con punto decimal, como `3.14`, es un literal `double`, así que `float f = 3.14;` falla y debes escribir `3.14f` o hacer un cast. Los literales de carácter usan comillas simples (`'A'`, `'\\n'`, `'A'`).",
   "Los literales enteros pueden escribirse en cuatro bases. Decimal es la base por defecto. Un `0` inicial indica octal (`017` es 15), `0x` o `0X` indica hexadecimal (`0x1F` es 31), y `0b` o `0B` indica binario (`0b101` es 5). La regla del octal es una trampa clásica: `010` es 8, no 10, y `09` no compila porque 9 no es un dígito octal.",
   "Los guiones bajos pueden separar dígitos para mejorar la legibilidad, como en `1_000_000` o `0b1010_0101`. La regla es que un guion bajo debe estar entre dos dígitos. Por eso son ilegales: un guion bajo al inicio o al final (`_100`, `100_`), uno junto al punto decimal (`1_.5`, `1._5`), uno justo antes de un sufijo (`10_L`, `2.0_f`) y uno inmediatamente después del prefijo `0x` o `0b` (`0x_FF`). Varios guiones bajos seguidos están bien (`1__000`), y también uno después del cero inicial de un literal octal (`0_17`), porque ese cero cuenta como dígito.",
   "Los valores por defecto se aplican solo a los campos (variables de instancia y estáticas) y a los elementos de arreglos. Los campos numéricos toman cero por defecto (`0`, `0L`, `0.0f`, `0.0`), `char` toma `'\\u0000'`, `boolean` toma `false`, y todo tipo de referencia toma `null`. Las variables locales nunca reciben valor por defecto. Leer una variable local antes de que haya sido asignada de forma definitiva es un error de compilación, algo que al examen le gusta esconder dentro de una rama `if`.",
   "```java\nint[] nums = new int[3];      // {0, 0, 0}\nboolean[] flags = new boolean[2]; // {false, false}\nint x;\n// System.out.println(x);    // no compila: x no está inicializada\nint hex = 0xFF, oct = 010, bin = 0b11;\nSystem.out.println(hex + oct + bin); // 255 + 8 + 3 = 266\n```"
  ],
  "terms": [
   [
    "Primitive type (tipo primitivo)",
    "Uno de los ocho tipos de valor integrados (byte, short, int, long, float, double, char, boolean) que no son objetos."
   ],
   [
    "Literal",
    "Un valor fijo escrito en el código fuente, como 42, 3.5f, 'x' o 0b1010."
   ],
   [
    "Octal literal (literal octal)",
    "Un literal entero con un 0 inicial, que se lee en base 8, por lo que 010 equivale a 8."
   ],
   [
    "Default value (valor por defecto)",
    "El valor que recibe automáticamente un campo o elemento de arreglo: 0, false, '\\u0000' o null. Las variables locales no tienen ninguno."
   ]
  ],
  "example": "Un servicio de pagos guarda montos en centavos como `long`. Un desarrollador escribe `long limit = 5_000_000_000;` y la compilación falla, porque el literal sigue siendo un literal `int` y está fuera de rango. Agregar `L` (`5_000_000_000L`) lo corrige, y los guiones bajos mantienen el número legible en la revisión de código.",
  "tip": "Revisa cada literal numérico buscando tres cosas: un 0 inicial (octal), un sufijo L o f faltante en un valor que lo necesita, y un guion bajo que toque un prefijo, un sufijo o el punto decimal.",
  "check": [
   [
    "¿Compila `float price = 9.99;`?",
    "No. 9.99 es un literal double, y asignar un double a un float es una conversión de estrechamiento. Escribe 9.99f o haz cast con (float)."
   ],
   [
    "¿Qué imprime `System.out.println(012 + 0x10);`?",
    "26. 012 es octal para 10 y 0x10 es hexadecimal para 16."
   ],
   [
    "¿Cuál de estos es legal: `1_000`, `_1000`, `0x_10`, `1000_L`?",
    "Solo 1_000. Los demás ponen un guion bajo al inicio, justo después del prefijo 0x o justo antes del sufijo L."
   ]
  ]
 },
 {
  "t": "Wrapper classes, autoboxing/unboxing and Integer caching with ==",
  "tt": "Clases envoltorio, autoboxing/unboxing y la caché de Integer con ==",
  "body": [
   "Cada tipo primitivo tiene una clase envoltorio (wrapper) en `java.lang`: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character` y `Boolean`. Los wrappers existen porque las colecciones y los genéricos solo funcionan con objetos, así que no puedes escribir `List<int>`. Un objeto wrapper es inmutable y también puede ser `null`, algo que un primitivo no puede ser.",
   "El autoboxing es la conversión automática que hace el compilador de un primitivo a su wrapper, y el unboxing es lo contrario. Cuando escribes `Integer n = 5;` el compilador inserta `Integer.valueOf(5)`, y cuando escribes `int m = n;` inserta `n.intValue()`. Por lo tanto, hacer unboxing de una referencia `null` lanza una `NullPointerException` en tiempo de ejecución, un escenario frecuente en el examen con `Map.get` devolviendo `null` a una variable `int`.",
   "Conoce la diferencia entre las dos familias de conversión. `Integer.parseInt(\"42\")` devuelve un `int` primitivo, mientras que `Integer.valueOf(\"42\")` devuelve un objeto `Integer`. Los constructores de los wrappers como `new Integer(5)` están obsoletos (deprecated) y marcados para eliminación, así que el código moderno y las respuestas del examen usan `valueOf` o autoboxing. El boxing solo va al wrapper correspondiente: `Long x = 5;` no compila, porque `5` es un `int` y tendría que convertirse en un `Integer`, que no es un `Long`.",
   "El operador `==` entre dos referencias wrapper compara identidad (si son el mismo objeto), no el valor. `Integer.valueOf` mantiene una caché de objetos `Integer` al menos para el rango -128 a 127, y el autoboxing usa `valueOf`, así que dos valores con boxing dentro de ese rango normalmente apuntan al mismo objeto en caché. Fuera de ese rango, cada boxing suele crear un objeto nuevo. Por eso `Integer a = 127, b = 127; a == b` es `true` pero la misma prueba con 128 es `false`. `Short`, `Long` y `Byte` guardan en caché el mismo rango, `Character` guarda de 0 a 127, y `Boolean` solo tiene `TRUE` y `FALSE`. La solución es sencilla: compara los valores de los wrappers con `equals`.",
   "Mezclar un wrapper y un primitivo en `==` es distinto: se hace unboxing del wrapper, así que la comparación es numérica y la caché no importa. Cuidado también con `equals` entre tipos distintos. `Long.valueOf(1).equals(1)` es `false`, porque el argumento se convierte en un `Integer`, y `Long.equals` devuelve `false` para cualquier cosa que no sea un `Long`.",
   "```java\nInteger a = 100, b = 100;\nInteger c = 1000, d = 1000;\nSystem.out.println(a == b);      // true  (en caché)\nSystem.out.println(c == d);      // false (objetos distintos)\nSystem.out.println(c.equals(d)); // true\nint e = 1000;\nSystem.out.println(c == e);      // true  (se hace unboxing de c)\n```",
   "La resolución de sobrecarga también involucra boxing. El compilador primero busca una coincidencia exacta o por ensanchamiento (widening), luego intenta boxing y unboxing, y solo después varargs. Así que, dados `m(long)` y `m(Integer)`, la llamada `m(5)` elige `m(long)`, porque el ensanchamiento gana sobre el boxing."
  ],
  "terms": [
   [
    "Wrapper class (clase envoltorio)",
    "Una clase inmutable como Integer o Double que contiene un valor primitivo como objeto."
   ],
   [
    "Autoboxing",
    "La conversión automática de un primitivo a su wrapper, que el compilador realiza mediante valueOf."
   ],
   [
    "Unboxing",
    "La conversión automática de un wrapper a su primitivo; lanza NullPointerException si la referencia es null."
   ],
   [
    "Integer cache (caché de Integer)",
    "Un conjunto de objetos Integer, al menos de -128 a 127, que Integer.valueOf reutiliza, lo que hace que == parezca funcionar con valores pequeños."
   ]
  ],
  "example": "Una tienda cuenta los pedidos por cliente en un `Map<String, Integer>`. El código `int count = counts.get(id);` funciona en pruebas, pero falla en producción con una NullPointerException la primera vez que aparece un cliente nuevo, porque `get` devuelve null y el unboxing falla. Usar `getOrDefault(id, 0)` lo evita.",
  "tip": "Cuando veas == entre dos variables Integer, revisa si ambos valores están entre -128 y 127. Si lo están, espera true; si no, espera false. Si un lado es primitivo, es una simple comparación numérica.",
  "check": [
   [
    "¿Qué imprime `Integer x = 128, y = 128; System.out.println(x == y);`?",
    "Normalmente false. 128 está fuera del rango de caché garantizado, así que cada boxing crea un objeto distinto y == compara identidad."
   ],
   [
    "¿Compila `Long total = 10;`?",
    "No. 10 es un int, y el autoboxing solo produce un Integer, que no se puede asignar a Long. Escribe 10L."
   ],
   [
    "¿Qué ocurre cuando se ejecuta `Integer n = null; int m = n;`?",
    "Compila pero lanza una NullPointerException, porque el unboxing llama a intValue() sobre null."
   ]
  ]
 },
 {
  "t": "Operator precedence, increment/decrement, compound assignment with implicit casts",
  "tt": "Precedencia de operadores, incremento/decremento y asignación compuesta con casts implícitos",
  "body": [
   "La precedencia de operadores decide qué operadores se aplican primero cuando una expresión no tiene paréntesis. De mayor a menor, el orden que necesitas es: postfijos (`x++`, `x--`), luego unarios y prefijos (`++x`, `--x`, `+`, `-`, `!`, `~`, casts), después multiplicativos (`*`, `/`, `%`), aditivos (`+`, `-`), desplazamientos (`<<`, `>>`, `>>>`), relacionales (`<`, `>`, `<=`, `>=`, `instanceof`), igualdad (`==`, `!=`), luego los operadores a nivel de bits y lógicos `&`, `^` y `|` en ese orden, después los de cortocircuito `&&` y `||`, el ternario `?:` y, por último, los operadores de asignación (`=`, `+=`, etc.). Los operandos se siguen evaluando de izquierda a derecha, incluso cuando la precedencia los agrupa de otra forma.",
   "El incremento y el decremento tienen dos formas. El prefijo `++x` incrementa primero y el valor de la expresión es el valor nuevo. El postfijo `x++` produce el valor anterior e incrementa después. En `int x = 3; int y = x++ * 2 + ++x;` la evaluación es de izquierda a derecha: `x++` da 3 (x pasa a 4), `++x` hace que x sea 5 y da 5, así que `y` es `3 * 2 + 5 = 11`. Una trampa famosa es `x = x++;`, que deja `x` sin cambios, porque se guarda el valor anterior, se incrementa `x` y luego se vuelve a asignar el valor anterior guardado.",
   "Los operadores de cortocircuito `&&` y `||` omiten el lado derecho cuando el lado izquierdo ya decide el resultado, así que los efectos secundarios del lado derecho podrían no ocurrir nunca. En `if (a > 0 || b++ > 0)`, `b` no se incrementa cuando `a > 0`. Los operadores sin cortocircuito `&` y `|` sobre booleanos siempre evalúan ambos lados.",
   "Los operadores de asignación compuesta (`+=`, `-=`, `*=`, `/=`, `%=` y los de bits) incluyen un cast implícito de vuelta al tipo del operando izquierdo. `x += y` significa `x = (T)(x + y)` donde `T` es el tipo de `x`, y `x` se evalúa una sola vez. Por eso esto compila:",
   "```java\nshort s = 10;\ns += 5;        // OK: cast implícito de vuelta a short\n// s = s + 5;  // no compila: s + 5 es un int\nbyte b = 127;\nb += 1;        // compila; b se desborda a -128\nint i = 7;\ni *= 2.5;      // compila; (int)(7 * 2.5) = 17\n```",
   "El cast implícito puede perder datos en silencio, como muestran el desbordamiento del `byte` y el `17` truncado. El examen usa esto para comprobar si sabes que `s = s + 5` falla pero `s += 5` funciona. Recuerda también que una asignación es en sí misma una expresión cuyo valor es el valor asignado, así que `int a, b; a = b = 4;` asigna 4 a ambas (la asignación es asociativa por la derecha), e `if (flag = true)` compila para un `boolean` y siempre es verdadero.",
   "La división y el residuo también importan. La división entera trunca hacia cero, así que `-7 / 2` es `-3`, y el signo de `%` sigue al operando izquierdo, así que `-7 % 2` es `-1`. La división entera entre cero lanza `ArithmeticException`, mientras que la división de punto flotante entre cero da `Infinity` o `NaN`."
  ],
  "terms": [
   [
    "Operator precedence (precedencia de operadores)",
    "Las reglas que deciden qué operador de una expresión sin paréntesis se aplica primero."
   ],
   [
    "Postfix increment (incremento postfijo)",
    "x++: la expresión produce el valor anterior y luego x aumenta en uno."
   ],
   [
    "Compound assignment (asignación compuesta)",
    "Un operador como += que combina una operación con una asignación y convierte el resultado al tipo del operando izquierdo."
   ],
   [
    "Short-circuit evaluation (evaluación de cortocircuito)",
    "&& y || omiten evaluar el operando derecho cuando el operando izquierdo ya determina el resultado."
   ]
  ],
  "example": "Un bucle de juego guarda el valor de salud en un `byte` para ahorrar memoria. El código que cura con `health += 50;` compila sin problemas, pero un jugador con 100 de salud de repente muestra -106, porque 150 no cabe en un byte y el cast oculto de la asignación compuesta lo hizo dar la vuelta. Usar `int` y limitar con Math.min corrige el error.",
  "tip": "Evalúa los operandos estrictamente de izquierda a derecha, anotando en papel el valor de cada variable después de cada ++ o --. En la asignación compuesta, recuerda el cast oculto: compila donde la forma larga no lo haría.",
  "check": [
   [
    "¿Cuál es el valor de x después de `int x = 5; x = x++ + ++x;`?",
    "12. x++ produce 5 (x pasa a 6), luego ++x hace que x sea 7 y produce 7, así que se asigna 5 + 7 = 12."
   ],
   [
    "¿Por qué `short s = 1; s = s + 1;` falla pero `s += 1;` compila?",
    "s + 1 se promueve a int y no puede asignarse a short sin cast, mientras que += incluye un cast implícito de vuelta a short."
   ],
   [
    "¿Qué imprime `int a = 0; boolean r = (a > 1) && (a++ > 0); System.out.println(a);`?",
    "0. El lado izquierdo es false, así que && hace cortocircuito y a++ nunca se ejecuta."
   ]
  ]
 },
 {
  "t": "Widening and narrowing conversions, casting and numeric promotion rules",
  "tt": "Conversiones de ensanchamiento y estrechamiento, casting y reglas de promoción numérica",
  "body": [
   "Una conversión primitiva de ensanchamiento (widening) mueve un valor a un tipo que puede contener un rango mayor, y Java la hace automáticamente. La cadena de ensanchamiento es `byte` a `short` a `int` a `long` a `float` a `double`, y `char` también se ensancha a `int` y superiores. El ensanchamiento de `int` o `long` a `float`, o de `long` a `double`, está permitido aunque pueda perder precisión en los dígitos bajos, porque el rango sigue cabiendo. Ten en cuenta que `byte` y `short` no se ensanchan a `char`, y `char` no se ensancha a `short`, porque `char` no tiene signo.",
   "Una conversión de estrechamiento (narrowing) va en sentido contrario y necesita un cast explícito, como `int i = (int) 3.99;`, que trunca hacia cero y da 3. Convertir un número entero a un tipo más pequeño conserva solo los bits de menor orden, así que `(byte) 200` es -56 y `(byte) 128` es -128. Convertir un `double` muy grande a `int` lo limita a `Integer.MAX_VALUE`, y convertir `NaN` a `int` da 0. El compilador no te advierte; confía en el cast.",
   "Hay una excepción importante al requisito del cast. Si el valor es una constante de tiempo de compilación de tipo `int` (o `char`, `short`, `byte`) y cabe en el `byte`, `short` o `char` de destino, el compilador hace el estrechamiento por ti en una asignación. Así que `byte b = 100;` y `char c = 65;` compilan, pero `byte b = 200;` no. Lo mismo aplica a variables locales `final` inicializadas con constantes: `final int k = 10; byte b = k;` compila, pero sin `final` no.",
   "La promoción numérica es lo que les ocurre a los operandos de los operadores aritméticos. Las reglas son: primero, `byte`, `short` y `char` siempre se promueven al menos a `int` en una operación binaria; segundo, si alguno de los operandos es `double` el otro se convierte en `double`; si no, si alguno es `float` ambos se convierten en `float`; si no, si alguno es `long` ambos se convierten en `long`; en caso contrario ambos son `int`. El resultado tiene el tipo promovido. Por eso sumar dos valores `byte` produce un `int`:",
   "```java\nbyte a = 10, b = 20;\n// byte c = a + b;       // no compila: el resultado es int\nbyte c = (byte) (a + b); // OK\nchar ch = 'A';\nSystem.out.println(ch + 1);        // 66 (int)\nSystem.out.println((char) (ch + 1)); // B\nlong big = 1_000_000 * 1_000_000;  // desbordamiento de int antes del ensanchamiento\nlong ok  = 1_000_000L * 1_000_000; // 1000000000000\n```",
   "Las dos últimas líneas muestran un punto sutil: la promoción la deciden los tipos de los operandos, no la variable de destino. Ambos literales son `int`, así que la multiplicación se desborda como `int` antes de que el resultado se ensanche a `long`. Hacer que un operando sea `long` lo corrige. Recuerda también que el cast tiene alta precedencia: `(int) 2.5 * 2` es `(int) 2.5` por 2, que es 4, mientras que `(int) (2.5 * 2)` es 5.",
   "Los tipos de referencia tienen sus propias reglas de casting, que se ven más adelante con el polimorfismo, pero los primitivos y los wrappers no se mezclan libremente: no puedes hacer cast de un `String` a `int`, y `(Integer) 3L` no compila. Para eso usa métodos de parseo o métodos del estilo de `intValue()`."
  ],
  "terms": [
   [
    "Widening conversion (conversión de ensanchamiento)",
    "Una conversión automática a un tipo de mayor rango, como de int a long o de float a double."
   ],
   [
    "Narrowing conversion (conversión de estrechamiento)",
    "Una conversión a un tipo de menor rango, que necesita un cast explícito salvo que sea una constante de tiempo de compilación que quepa."
   ],
   [
    "Numeric promotion (promoción numérica)",
    "La regla por la que los operandos de los operadores aritméticos se convierten a un tipo común de al menos int antes de la operación."
   ],
   [
    "Compile-time constant (constante de tiempo de compilación)",
    "Una expresión cuyo valor conoce el compilador, como un literal o una variable final inicializada con un literal."
   ]
  ],
  "example": "Un proceso de reportes calcula el total de milisegundos con `long ms = days * 24 * 60 * 60 * 1000;` donde `days` es un int. Para 30 días imprime un número negativo, porque todo el producto se calcula como int y se desborda antes del ensanchamiento a long. Escribir `days * 24L * 60 * 60 * 1000` mantiene la aritmética en long.",
  "tip": "Cuando una pregunta asigna un resultado aritmético a byte, short o char, busca la promoción a int. Solo compila con un cast, con una asignación compuesta o cuando toda la expresión es una constante que cabe.",
  "check": [
   [
    "¿Compila `char c = 'a'; c = c + 1;`?",
    "No. c + 1 se promueve a int, y asignar a char una expresión int con variables necesita un cast. c++ o c += 1 sí compilarían."
   ],
   [
    "¿Cuánto vale `(byte) 130`?",
    "-126. Solo se conservan los 8 bits bajos, y 130 en complemento a dos de 8 bits es -126."
   ],
   [
    "¿Cuál es el tipo de `5L * 2.0f`?",
    "float. Cuando alguno de los operandos es float (y ninguno es double), ambos se promueven a float."
   ]
  ]
 },
 {
  "t": "Math API: round, floor, ceil, abs, max/min, pow",
  "tt": "API de Math: round, floor, ceil, abs, max/min, pow",
  "body": [
   "`java.lang.Math` es una clase utilitaria de métodos estáticos, así que los llamas como `Math.round(x)` sin crear un objeto, y no hace falta importarla. El examen se enfoca menos en qué hace cada método que en qué tipo devuelve y cómo trata los números negativos y los casos límite.",
   "`Math.round` redondea al número entero más cercano, con las mitades redondeadas hacia arriba, hacia el infinito positivo. Está sobrecargado: `round(double)` devuelve un `long` y `round(float)` devuelve un `int`. Así que `int r = Math.round(2.5);` no compila, porque el argumento es un literal `double` y el resultado es `long`; `Math.round(2.5f)` devuelve el `int` 3. La regla de redondear la mitad hacia arriba sorprende con los negativos: `Math.round(-2.5)` es -2, mientras que `Math.round(-2.6)` es -3, porque -2.5 se redondea hacia el infinito positivo.",
   "`Math.floor` y `Math.ceil` reciben un `double` y devuelven un `double`. `floor` baja al siguiente número entero hacia el infinito negativo y `ceil` sube hacia el infinito positivo. `Math.floor(-1.5)` es -2.0 y `Math.ceil(-1.5)` es -1.0. Como devuelven `double`, al imprimirlos aparece un `.0`, y asignarlos a un `int` necesita un cast. Hacer cast con `(int)` es otra cosa distinta: trunca hacia cero, así que `(int) -1.5` es -1.",
   "`Math.abs`, `Math.max` y `Math.min` están sobrecargados para `int`, `long`, `float` y `double`, y el tipo de retorno sigue a los tipos de los argumentos después de la promoción normal. `Math.max(3, 7L)` devuelve un `long`, y `Math.min(2, 1.5)` devuelve el `double` 1.5. Un caso límite aparece en los exámenes: `Math.abs(Integer.MIN_VALUE)` devuelve el propio `Integer.MIN_VALUE`, todavía negativo, porque el valor positivo no cabe en un `int`.",
   "`Math.pow(base, exponent)` recibe dos valores `double` y siempre devuelve un `double`, incluso para números enteros: `Math.pow(2, 3)` es 8.0. Asignarlo a un `int` requiere un cast, `int p = (int) Math.pow(2, 10);`. Otros métodos relacionados que podrías ver son `Math.sqrt` (devuelve `double`), `Math.random()` (un `double` desde 0.0 inclusive hasta 1.0 exclusive) y `Math.floorDiv`/`Math.floorMod`, que redondean hacia el infinito negativo, a diferencia de `/` y `%`.",
   "```java\nSystem.out.println(Math.round(3.49));   // 3   (long)\nSystem.out.println(Math.round(-3.5));   // -3\nSystem.out.println(Math.floor(3.9));    // 3.0\nSystem.out.println(Math.ceil(3.1));     // 4.0\nSystem.out.println(Math.abs(-7));       // 7\nSystem.out.println(Math.max(4, 4.0f));  // 4.0 (float)\nSystem.out.println(Math.pow(3, 2));     // 9.0\n```",
   "En un laboratorio, prueba esto en `jshell`: imprime cada resultado junto con su tipo, lo que hace que las reglas de tipos de retorno se queden grabadas mucho mejor que memorizando una tabla."
  ],
  "terms": [
   [
    "Math.round",
    "Redondea al número entero más cercano con las mitades hacia el infinito positivo; devuelve long para un argumento double e int para un float."
   ],
   [
    "Math.floor / Math.ceil",
    "Devuelven el double igual o justo por debajo (floor) o igual o justo por encima (ceil) del argumento, moviéndose hacia el infinito negativo o positivo."
   ],
   [
    "Math.pow",
    "Eleva una base double a un exponente double y siempre devuelve un double."
   ],
   [
    "Overloading by type (sobrecarga por tipo)",
    "abs, max y min tienen versiones para int, long, float y double, así que el tipo del resultado sigue a los tipos promovidos de los argumentos."
   ]
  ],
  "example": "Un script de facturación calcula el número de páginas a imprimir con `int pages = items / 20;` y pierde la última página parcial. La corrección es `int pages = (int) Math.ceil(items / 20.0);`. Fíjate en el 20.0: con un 20 simple, la división entera truncaría antes de que ceil llegara a ver una fracción.",
  "tip": "Antes de elegir una respuesta, anota el tipo de retorno de cada llamada a Math. La mayoría de las preguntas sobre Math son en realidad preguntas de error de compilación sobre round devolviendo long o pow devolviendo double.",
  "check": [
   [
    "¿Compila `int n = Math.round(7.5);`?",
    "No. 7.5 es un double, así que round devuelve un long, que no se puede asignar a int sin un cast."
   ],
   [
    "¿Qué devuelve `Math.round(-4.5)`?",
    "-4. Las mitades se redondean hacia el infinito positivo."
   ],
   [
    "¿Qué imprime `System.out.println(Math.ceil(-0.5));`?",
    "-0.0. ceil se mueve hacia el infinito positivo, y el resultado para esta fracción negativa es cero negativo, que se imprime como -0.0."
   ]
  ]
 },
 {
  "t": "String immutability and key methods: substring, indexOf, charAt, strip, repeat, isBlank",
  "tt": "Inmutabilidad de String y métodos clave: substring, indexOf, charAt, strip, repeat, isBlank",
  "body": [
   "Un `String` en Java es inmutable: una vez creado, sus caracteres nunca cambian. Todo método que parece modificar una cadena, como `toUpperCase` o `concat`, en realidad devuelve un nuevo `String` y deja intacto el original. La trampa más común del examen es una línea como `s.toUpperCase();` cuyo resultado se descarta, así que `s` no ha cambiado cuando se imprime. La inmutabilidad permite que las cadenas se compartan de forma segura, se guarden en el string pool y se usen como claves confiables de `HashMap`.",
   "Los literales de cadena se colocan en el string pool, así que dos literales idénticos hacen referencia al mismo objeto y `==` es `true`. Una cadena construida en tiempo de ejecución, por ejemplo con `new String(\"hi\")` o concatenando una variable no constante, es un objeto distinto, así que `==` es `false` aunque el texto coincida. Compara siempre el texto con `equals` (o `equalsIgnoreCase`). La concatenación de constantes de tiempo de compilación, como `\"a\" + \"b\"`, la hace el compilador y sí termina en el pool.",
   "Los índices empiezan en cero. `charAt(i)` devuelve el `char` en la posición `i` y lanza `StringIndexOutOfBoundsException` si `i` es negativo o no es menor que `length()`. `substring(begin)` llega hasta el final y `substring(begin, end)` incluye `begin` pero excluye `end`, así que su longitud es `end - begin`. `substring(3, 3)` es una cadena vacía, `substring(len)` también está vacía, pero un `end` mayor que `length()` o un `begin` mayor que `end` lanza una excepción.",
   "`indexOf` devuelve el índice de la primera coincidencia de un `char` o `String`, o -1 si no hay ninguna, y una sobrecarga recibe un índice de inicio: `\"banana\".indexOf('a', 2)` es 3. `lastIndexOf` busca desde el final. Estos métodos nunca lanzan excepción por un valor ausente, lo que los hace útiles antes de una llamada a `substring`.",
   "`strip()` elimina los espacios en blanco iniciales y finales usando la definición de espacio en blanco de Unicode, mientras que el antiguo `trim()` elimina solo caracteres con código hasta U+0020. `stripLeading()` y `stripTrailing()` actúan sobre un solo lado. `isEmpty()` es verdadero solo cuando la longitud es 0, mientras que `isBlank()` es verdadero cuando la cadena está vacía o solo contiene espacios en blanco, así que `\"  \".isEmpty()` es false pero `\"  \".isBlank()` es true. `repeat(n)` devuelve la cadena repetida n veces, `repeat(0)` da una cadena vacía, y un conteo negativo lanza `IllegalArgumentException`.",
   "```java\nString s = \"  Java  \";\ns.strip();                       // resultado descartado\nSystem.out.println(\"[\" + s + \"]\");     // [  Java  ]\nString t = s.strip();\nSystem.out.println(t.charAt(0));       // J\nSystem.out.println(t.substring(1, 3)); // av\nSystem.out.println(t.indexOf(\"va\"));   // 2\nSystem.out.println(\"ab\".repeat(3));    // ababab\nSystem.out.println(\" \\t\".isBlank());   // true\n```",
   "El encadenamiento de métodos funciona porque cada llamada devuelve una cadena nueva: `\" hi \".strip().toUpperCase().repeat(2)` da `HIHI`. Lee las cadenas de llamadas de izquierda a derecha y lleva la cuenta del valor intermedio en cada paso."
  ],
  "terms": [
   [
    "Immutability (inmutabilidad)",
    "La propiedad de que el estado de un objeto no puede cambiar después de su creación; los métodos de String devuelven cadenas nuevas en su lugar."
   ],
   [
    "String pool",
    "Un área de la JVM que guarda una única copia compartida de cada literal de cadena y de cada cadena constante de tiempo de compilación."
   ],
   [
    "substring(begin, end)",
    "Devuelve los caracteres desde begin hasta end, sin incluir end."
   ],
   [
    "isBlank",
    "Devuelve true si una cadena está vacía o solo contiene caracteres de espacio en blanco."
   ]
  ],
  "example": "Un formulario de registro revisa `if (name.isEmpty())` para rechazar nombres vacíos, pero los usuarios que escriben solo espacios se cuelan y terminan con nombres de perfil en blanco. Cambiar a `name.isBlank()`, y guardar `name.strip()`, cierra ese hueco.",
  "tip": "Busca llamadas a métodos de cadena cuyo valor de retorno no se asigna. Como String es inmutable, la variable original no cambia, y ese suele ser el punto central de la pregunta.",
  "check": [
   [
    "¿Qué devuelve `\"develop\".substring(2, 5)`?",
    "\"vel\". Incluye el índice 2 y excluye el índice 5, lo que da tres caracteres."
   ],
   [
    "¿Cuál es la diferencia entre `isEmpty()` e `isBlank()`?",
    "isEmpty es verdadero solo para longitud 0; isBlank también es verdadero para cadenas que solo contienen espacios en blanco."
   ],
   [
    "¿Qué imprime `String s = \"abc\"; s.concat(\"d\"); System.out.println(s);`?",
    "abc. concat devuelve una cadena nueva, que se descarta."
   ]
  ]
 },
 {
  "t": "StringBuilder methods: append, insert, reverse, delete, replace",
  "tt": "Métodos de StringBuilder: append, insert, reverse, delete, replace",
  "body": [
   "`StringBuilder` es la contraparte mutable de `String`. Contiene una secuencia de caracteres redimensionable, y sus métodos modifican esa secuencia en el mismo objeto en lugar de crear objetos nuevos. Úsalo cuando construyas texto dentro de un bucle, porque la concatenación repetida de `String` crea un objeto nuevo en cada paso. (`StringBuffer` tiene los mismos métodos pero está sincronizado; `StringBuilder` es la opción habitual.)",
   "La mayoría de los métodos de `StringBuilder` modifican el objeto y además devuelven una referencia al mismo objeto, por eso las llamadas se pueden encadenar: `sb.append(\"a\").append(1).reverse()`. Esto es lo opuesto a la trampa de `String`. Con un `StringBuilder`, una llamada cuyo resultado se ignora igual cambia el objeto. Y como la referencia devuelta es el mismo objeto, `StringBuilder b2 = sb.append(\"x\");` hace que `b2` y `sb` apunten a un único builder.",
   "`append(x)` agrega al final la forma de texto de casi cualquier tipo. `insert(offset, x)` coloca texto antes del índice dado, y el offset puede ser igual a `length()` para insertar al final. `reverse()` invierte los caracteres. `delete(start, end)` elimina los caracteres desde `start` hasta `end` sin incluirlo; a diferencia de `substring`, se permite un `end` mayor que la longitud y simplemente se trata como la longitud. `deleteCharAt(i)` elimina un solo carácter. `replace(start, end, str)` elimina el rango de `start` a `end` (end exclusivo) e inserta `str` en su lugar, y el reemplazo puede ser más largo o más corto que lo que reemplaza.",
   "Algunos métodos no cambian el builder. `substring`, `charAt`, `indexOf` y `length()` leen de él, y `substring` devuelve un `String`. `toString()` crea una copia `String` del contenido actual. `setLength(n)` trunca o rellena con caracteres nulos, y `setCharAt(i, c)` reemplaza un carácter.",
   "```java\nStringBuilder sb = new StringBuilder(\"java\");\nsb.append(\"25\");          // java25\nsb.insert(0, \"[\");        // [java25\nsb.append(']');           // [java25]\nsb.replace(1, 5, \"JDK\");  // [JDK25]\nsb.delete(4, 99);         // [JDK\nsb.reverse();             // KDJ[\nSystem.out.println(sb);   // KDJ[\n```",
   "Aparecen dos trampas de comparación. Primero, `StringBuilder` no sobrescribe `equals`, así que `new StringBuilder(\"a\").equals(new StringBuilder(\"a\"))` es `false`; compara con `sb1.compareTo(sb2) == 0` o con `sb1.toString().equals(sb2.toString())`. Segundo, `sb.equals(\"a\")` también es `false`, porque un `StringBuilder` nunca es igual a un `String`, y `sb == \"a\"` ni siquiera compila porque los tipos no están relacionados.",
   "Conoce también los constructores: `new StringBuilder()` empieza vacío, `new StringBuilder(\"text\")` empieza con contenido, y `new StringBuilder(20)` empieza vacío con una capacidad inicial de 20. La capacidad es espacio de almacenamiento, no longitud, así que `length()` sigue siendo 0."
  ],
  "terms": [
   [
    "StringBuilder",
    "Una secuencia de caracteres mutable y no sincronizada cuyos métodos cambian el objeto en el mismo lugar."
   ],
   [
    "Method chaining (encadenamiento de métodos)",
    "Llamar un método sobre el resultado de otro; funciona con StringBuilder porque los métodos que lo modifican devuelven this."
   ],
   [
    "replace(start, end, str)",
    "Elimina los caracteres de start a end (exclusivo) e inserta str en ese lugar."
   ],
   [
    "Capacity (capacidad)",
    "La cantidad de almacenamiento que un StringBuilder tiene reservada, que es independiente de su longitud actual."
   ]
  ],
  "example": "Un formateador de logs construye cada línea con un StringBuilder: agrega una marca de tiempo, inserta una etiqueta de nivel en la posición 0 y elimina una coma final con `deleteCharAt(sb.length() - 1)`. Todo ocurre sobre un único objeto, así que formatear miles de líneas crea muchas menos cadenas temporales que usar + dentro de un bucle.",
  "tip": "Sigue un mismo objeto StringBuilder a través de cada línea, aplicando cada llamada aunque su resultado no se asigne. Luego revisa la aritmética de índices: todos los métodos de rango usan un final exclusivo.",
  "check": [
   [
    "¿Qué imprime `StringBuilder sb = new StringBuilder(\"abc\"); sb.reverse(); System.out.println(sb);`?",
    "cba. reverse cambia el propio builder, así que el valor de retorno ignorado no importa."
   ],
   [
    "¿Qué contiene `new StringBuilder(\"12345\").delete(1, 3)`?",
    "145. Elimina los índices 1 y 2 (el índice final 3 se excluye)."
   ],
   [
    "¿Es true `new StringBuilder(\"x\").equals(new StringBuilder(\"x\"))`?",
    "No. StringBuilder hereda equals de Object, que compara identidad, y estos son dos objetos distintos."
   ]
  ]
 },
 {
  "t": "Text blocks: incidental whitespace, \\ line continuation, \\s escape",
  "tt": "Bloques de texto: espacio en blanco incidental, continuación de línea con \\ y el escape \\s",
  "body": [
   "Un bloque de texto (text block) es un literal de cadena de varias líneas que empieza con tres comillas dobles y termina con tres comillas dobles. Produce un `String` normal, así que todo lo que sabes sobre cadenas sigue aplicando. Los bloques de texto hacen legible el JSON, SQL o HTML incrustado, porque puedes escribir comillas y saltos de línea directamente en lugar de escaparlos.",
   "El delimitador de apertura debe ir seguido de un terminador de línea: el contenido siempre empieza en la línea siguiente. Escribir contenido en la misma línea que las comillas de apertura es un error de compilación. Cada salto de línea del código fuente se convierte en un `\\n` en el valor (los finales de línea se normalizan a `\\n`). Si el delimitador de cierre está en su propia línea, la cadena termina con un salto de línea; si está al final de la última línea de contenido, no hay salto de línea final.",
   "El espacio en blanco incidental es la sangría que existe solo porque el bloque de texto está indentado junto con tu código. El compilador lo elimina buscando la menor sangría entre todas las líneas de contenido no vacías, y la línea del delimitador de cierre si está en su propia línea, y luego quitando esa cantidad de espacios iniciales de cada línea. Por lo tanto, mover el delimitador de cierre hacia la izquierda agrega sangría al resultado, y moverlo a la derecha no puede quitar más de lo que tiene el contenido. Todo lo que exceda la sangría común es espacio en blanco esencial y se conserva. Los espacios al final de cada línea siempre se eliminan.",
   "Las secuencias de escape siguen funcionando, y dos son específicas de los bloques de texto. Una barra invertida justo al final de una línea (`\\` seguida del salto de línea) es una continuación de línea: suprime ese salto, así que dos líneas del código fuente se convierten en una sola línea en el valor. El escape `\\s` es un único espacio, y como es un escape y no un espacio literal, no se elimina al quitar los espacios finales, así que puedes usarlo para conservar espacios al final. Puedes incluir una comilla doble sin problema; tres seguidas deben tener al menos una escapada, como en `\\\"\"\"`.",
   "```java\nString a = \"\"\"\n    Hello\n      World\n    \"\"\";\n// \"Hello\\n  World\\n\"  (se eliminan 4 espacios de espacio en blanco incidental)\n\nString b = \"\"\"\n    one \\\n    two\"\"\";\n// \"one two\"  (la continuación une las líneas, sin salto de línea final)\n\nString c = \"\"\"\n    red\\s\n    green\n    \"\"\";\n// \"red \\ngreen\\n\"  (\\s conserva el espacio)\n```",
   "Cuenta con cuidado en las preguntas del examen: fíjate dónde está el delimitador de cierre, calcula la sangría común y luego decide si la última línea termina con salto de línea. Recuerda también que `\"\"\"abc\"\"\"` en una sola línea no compila, porque el contenido no puede empezar en la línea de apertura.",
   "En tu laboratorio, imprime un bloque de texto rodeado de corchetes, como en `System.out.println(\"[\" + block + \"]\");`, para que puedas ver los espacios iniciales y el salto de línea final que de otro modo serían invisibles."
  ],
  "terms": [
   [
    "Text block (bloque de texto)",
    "Un literal String de varias líneas delimitado por tres comillas dobles, cuyo contenido empieza en la línea siguiente al delimitador de apertura."
   ],
   [
    "Incidental whitespace (espacio en blanco incidental)",
    "La sangría inicial común que el compilador quita de cada línea de un bloque de texto."
   ],
   [
    "Line continuation (continuación de línea)",
    "Una barra invertida al final de una línea de un bloque de texto, que elimina el salto de línea para que la línea siguiente se una a ella."
   ],
   [
    "\\s escape (escape \\s)",
    "Un escape para un único espacio que sobrevive a la eliminación de los espacios en blanco finales."
   ]
  ],
  "example": "Un desarrollador incrusta una consulta SQL en un bloque de texto indentado dentro de un método. Al registrarla en el log, la consulta no muestra espacios iniciales, porque el compilador eliminó la sangría incidental. Para mantener una cláusula WHERE larga en una sola línea física en la salida mientras la divide en el código fuente, el desarrollador termina la primera mitad con una barra invertida.",
  "tip": "La posición del delimitador de cierre controla la sangría: si está en su propia línea y más a la izquierda que el contenido, la diferencia se convierte en espacios iniciales. Si está en la última línea de contenido, no hay salto de línea final.",
  "check": [
   [
    "¿Un bloque de texto permite contenido en la misma línea que las tres comillas de apertura?",
    "No. El delimitador de apertura debe ir seguido de un terminador de línea, así que eso es un error de compilación."
   ],
   [
    "¿Por qué usar `\\s` en lugar de un espacio normal al final de una línea de un bloque de texto?",
    "Los espacios finales se eliminan de cada línea, pero \\s es un escape que se traduce después de esa eliminación, así que el espacio se conserva."
   ],
   [
    "¿Qué hace una barra invertida al final de una línea de un bloque de texto?",
    "Es una continuación de línea: se elimina el salto de línea y la línea siguiente se une a la actual."
   ]
  ]
 },
 {
  "t": "Date-Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
  "tt": "API de fecha y hora: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
  "body": [
   "El paquete `java.time` es la API moderna de fecha y hora de Java. Sus clases son inmutables y seguras para hilos (thread-safe), y ninguna tiene constructores públicos: creas valores con métodos de fábrica estáticos como `now()`, `of(...)` y `parse(...)`. Como son inmutables, todo método que parece cambiar un valor, como `plusDays`, devuelve un objeto nuevo. Olvidar asignar ese resultado es la trampa más común del examen, exactamente igual que con `String`.",
   "Elige la clase según cuánta información necesitas. `LocalDate` es una fecha sin hora ni zona, como un cumpleaños (`LocalDate.of(2025, 3, 14)`). `LocalTime` es una hora del día sin fecha, como una alarma a las 07:30. `LocalDateTime` combina ambas pero sigue sin zona horaria, así que no identifica un único momento en la línea de tiempo global. `ZonedDateTime` agrega un `ZoneId` como `America/New_York`, así que fija un momento exacto y conoce las reglas de desfase de la zona. `Instant` es un punto en la línea de tiempo medido desde el epoch (1970-01-01T00:00:00Z) en UTC, y es el tipo natural para marcas de tiempo en logs y bases de datos.",
   "Los meses van numerados del 1 al 12, a diferencia de la antigua clase `Calendar`, y también puedes pasar una constante del enum `Month`: `LocalDate.of(2025, Month.JANUARY, 31)`. Los valores inválidos se rechazan en tiempo de ejecución: `LocalDate.of(2025, 2, 30)` lanza una `DateTimeException`. En cambio, sumar meses ajusta al final del mes en lugar de fallar: 31 de enero más un mes es 28 de febrero (o 29 en un año bisiesto).",
   "Los métodos solo existen donde tienen sentido. `LocalDate` tiene `plusDays`, `plusWeeks`, `plusMonths` y `plusYears` pero no `plusHours`, así que llamar a `plusHours` sobre un `LocalDate` no compila. `LocalTime` tiene `plusHours` y `plusMinutes` pero no `plusDays`. Las horas dan la vuelta a la medianoche: `LocalTime.of(23, 0).plusHours(2)` es 01:00. Entre los getters están `getYear()`, `getMonth()` (un enum), `getMonthValue()` (un int), `getDayOfWeek()` y `getHour()`.",
   "Conviertes entre los tipos agregando o quitando información. `date.atTime(9, 0)` da un `LocalDateTime`, `ldt.atZone(ZoneId.of(\"Europe/Paris\"))` da un `ZonedDateTime`, `zdt.toInstant()` da un `Instant`, e `instant.atZone(zone)` vuelve atrás. `ldt.toLocalDate()` descarta la hora. Las comparaciones usan `isBefore`, `isAfter` e `isEqual`, o `compareTo`.",
   "```java\nLocalDate d = LocalDate.of(2025, 1, 31);\nd.plusDays(1);                      // resultado descartado\nSystem.out.println(d);              // 2025-01-31\nLocalDate next = d.plusMonths(1);\nSystem.out.println(next);           // 2025-02-28\nLocalDateTime ldt = next.atTime(14, 5);\nSystem.out.println(ldt);            // 2025-02-28T14:05\nZonedDateTime z = ldt.atZone(ZoneId.of(\"UTC\"));\nSystem.out.println(z.toInstant());  // 2025-02-28T14:05:00Z\n```",
   "Para la salida de texto, `DateTimeFormatter` formatea y parsea. `DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm\")` usa `MM` para el mes y `mm` para los minutos, y `HH` para el reloj de 24 horas frente a `hh` para el de 12 horas. Confundirlos es un error clásico. Formatear un `LocalDate` con un patrón que incluye horas lanza una excepción en tiempo de ejecución, porque la fecha no tiene campo de hora."
  ],
  "terms": [
   [
    "LocalDate",
    "Una fecha inmutable (año, mes, día) sin hora del día y sin zona horaria."
   ],
   [
    "LocalDateTime",
    "Una fecha y hora sin zona, así que no identifica un único instante global."
   ],
   [
    "ZonedDateTime",
    "Una fecha y hora con un ZoneId, que identifica un momento exacto y aplica el desfase y las reglas de horario de verano de esa zona."
   ],
   [
    "Instant",
    "Un punto en la línea de tiempo UTC medido desde el epoch 1970-01-01T00:00:00Z."
   ]
  ],
  "example": "Una aerolínea guarda las horas de salida como ZonedDateTime para que un vuelo que sale de Tokio y aterriza en Los Ángeles muestre la hora local correcta en cada aeropuerto, mientras que el sistema de reservas registra cada cambio como un Instant para que todos los servidores coincidan en el orden de los eventos sin importar dónde se ejecuten.",
  "tip": "Cuando la llamada a un método de fecha y hora no se asigna, el objeto no cambia. Revisa también que el método exista en ese tipo: LocalDate no tiene plusHours, y LocalTime no tiene plusDays.",
  "check": [
   [
    "¿Qué clase usarías para la hora de apertura de una tienda que es la misma todos los días?",
    "LocalTime, porque representa una hora del día sin fecha ni zona."
   ],
   [
    "¿Qué pasa con `LocalDate.of(2025, 4, 31)`?",
    "Lanza una DateTimeException en tiempo de ejecución, porque abril solo tiene 30 días."
   ],
   [
    "¿Cuánto es `LocalDate.of(2024, 1, 31).plusMonths(1)`?",
    "2024-02-29. 2024 es bisiesto, y plusMonths ajusta al último día válido del mes."
   ]
  ]
 },
 {
  "t": "Period vs Duration and daylight saving time transitions",
  "tt": "Period frente a Duration y los cambios de horario de verano",
  "body": [
   "Java separa dos tipos de cantidades de tiempo. Un `Period` es una cantidad basada en fechas, en años, meses y días, como \"2 meses y 3 días\". Un `Duration` es una cantidad basada en tiempo, en segundos y nanosegundos, creada a partir de días, horas, minutos o segundos. La diferencia importa porque un mes o un día de calendario no siempre tienen la misma duración, mientras que un `Duration` siempre es un número exacto de segundos.",
   "Se crean con fábricas estáticas: `Period.of(1, 2, 3)`, `Period.ofDays(10)`, `Period.ofWeeks(2)` (guardado como 14 días), y `Duration.ofHours(5)`, `Duration.ofMinutes(90)`, `Duration.ofDays(1)` (guardado como 24 horas). También puedes medir entre valores: `Period.between(date1, date2)` para valores `LocalDate`, y `Duration.between(t1, t2)` para horas. Los formatos de `toString` siguen ISO-8601: un `Period` se imprime como `P1Y2M3D` y un `Duration` como `PT1H30M`. `Duration.ofDays(1)` imprime `PT24H`.",
   "Una trampa es encadenar fábricas. `Period.ofYears(1).ofMonths(2)` parece construir 1 año y 2 meses, pero `ofMonths` es un método estático, así que la llamada ignora el primer objeto y el resultado es solo `P2M`. Usa `Period.of(1, 2, 0)` o `withMonths`/`plusMonths` en su lugar. Otra trampa es usar la cantidad equivocada para el tipo: un `Period` con una cantidad distinta de cero no se puede sumar a un `LocalTime`, y un `Duration` no se puede sumar a un `LocalDate`; ambos compilan pero lanzan `UnsupportedTemporalTypeException` en tiempo de ejecución.",
   "El horario de verano (DST, daylight saving time) es donde `Period` y `Duration` se comportan distinto sobre un `ZonedDateTime`. En primavera, los relojes se adelantan y se salta una hora local (un hueco o gap). En otoño, los relojes se atrasan y una hora local se repite (un solapamiento u overlap). Un `ZonedDateTime` lo maneja con las reglas de su zona. Si creas una hora que cae en un hueco, se mueve hacia adelante la duración del hueco, así que las 02:30 de un día de adelanto de horario en Nueva York se convierten en las 03:30. En un solapamiento, mantiene por defecto el desfase anterior.",
   "La aritmética basada en fechas conserva la hora local del día, mientras que la aritmética basada en tiempo suma tiempo transcurrido exacto. El día anterior a un adelanto de horario, `zdt.plusDays(1)` o `zdt.plus(Period.ofDays(1))` da la misma hora de reloj al día siguiente, aunque solo pasen 23 horas reales. `zdt.plusHours(24)` o `zdt.plus(Duration.ofDays(1))` suma exactamente 24 horas, así que la lectura del reloj termina una hora más tarde.",
   "```java\nZoneId ny = ZoneId.of(\"America/New_York\");\n// En EE. UU. los relojes se adelantan a las 02:00 del 2025-03-09\nZonedDateTime z = ZonedDateTime.of(2025, 3, 8, 12, 0, 0, 0, ny);\nSystem.out.println(z.plusDays(1));   // 2025-03-09T12:00-04:00[America/New_York]\nSystem.out.println(z.plusHours(24)); // 2025-03-09T13:00-04:00[America/New_York]\n```",
   "Observa que el desfase en la salida cambia de -05:00 a -04:00 al cruzar la transición. Cuando una pregunta imprime un `ZonedDateTime`, lee tanto la hora del reloj como el desfase. Convertir ambos a `Instant` es una forma confiable de comprobar cuánto tiempo real ha pasado."
  ],
  "terms": [
   [
    "Period",
    "Una cantidad de tiempo basada en fechas, en años, meses y días, que se imprime como P1Y2M3D."
   ],
   [
    "Duration",
    "Una cantidad basada en tiempo guardada como segundos y nanosegundos, que se imprime como PT2H30M."
   ],
   [
    "DST gap (hueco de horario de verano)",
    "La hora local que se salta cuando los relojes se adelantan; una hora dentro de ella se desplaza hacia adelante la duración del hueco."
   ],
   [
    "DST overlap (solapamiento de horario de verano)",
    "La hora local que se repite cuando los relojes se atrasan; ZonedDateTime mantiene por defecto el desfase anterior."
   ]
  ],
  "example": "Una suscripción se renueva cada mes, así que la facturación usa `plus(Period.ofMonths(1))` para mantener el mismo día del calendario, mientras que una app de estacionamiento cobra por tiempo transcurrido y usa `Duration.between(entry, exit)` sobre valores Instant, así que un auto estacionado durante un cambio de horario se cobra por las horas realmente usadas.",
  "tip": "Recuerda Period para fechas (P...Y...M...D) y Duration para horas (PT...H...M...S). Al cruzar un cambio de horario, plusDays conserva la hora del reloj, mientras que plusHours(24) conserva el tiempo transcurrido exacto.",
  "check": [
   [
    "¿Qué produce `Period.ofDays(3).ofWeeks(1)`?",
    "P7D. ofWeeks es estático, así que el resultado de la primera llamada se ignora y una semana se guarda como 7 días."
   ],
   [
    "¿Qué le pasa a un `ZonedDateTime` a las 02:30 hora local en un día de adelanto de horario cuando esa hora se salta?",
    "Se ajusta hacia adelante la duración del hueco, normalmente a las 03:30 con el nuevo desfase."
   ],
   [
    "¿Puedes sumar `Duration.ofHours(2)` a un `LocalDate`?",
    "Compila pero lanza UnsupportedTemporalTypeException en tiempo de ejecución, porque LocalDate no tiene unidades de tiempo."
   ]
  ]
 },
 {
  "t": "If/else and the ternary operator",
  "tt": "if/else y el operador ternario",
  "body": [
   "Una sentencia `if` ejecuta un bloque solo cuando su condición es `true`. La condición debe ser una expresión `boolean`; a diferencia de C, Java no trata un `int` como verdadero o falso, así que `if (count)` no compila. Un `else` opcional se ejecuta cuando la condición es `false`, y puedes encadenar decisiones con `else if`. Solo se ejecuta la primera rama cuya condición sea verdadera.",
   "Las llaves son opcionales cuando una rama tiene una sola sentencia, y aquí se esconden muchas preguntas del examen. Sin llaves, solo la siguiente sentencia pertenece al `if`, sin importar cómo esté indentada. Un `else` siempre se asocia con el `if` sin pareja más cercano que lo precede, lo que se conoce como dangling else (else colgante). Leer la indentación en lugar de la estructura lleva a la respuesta equivocada.",
   "```java\nint x = 5;\nif (x > 10)\n    System.out.println(\"big\");\n    System.out.println(\"always\");   // no forma parte del if\n\nif (x > 0)\n    if (x > 10) System.out.println(\"A\");\nelse System.out.println(\"B\");        // pertenece al if interno: imprime B\n```",
   "Cuidado con la asignación dentro de una condición. `if (flag = false)` compila cuando `flag` es un `boolean`, porque el valor de la asignación es `false`, y la rama nunca se ejecuta. Con un `int`, `if (n = 5)` no compila porque el resultado es un `int`. Fíjate también en que un punto y coma suelto, como en `if (x > 10);`, hace que el `if` controle una sentencia vacía, y el bloque que sigue siempre se ejecuta.",
   "El operador ternario (condicional) `condition ? valueIfTrue : valueIfFalse` es una expresión, así que produce un valor y puede usarse en asignaciones, argumentos de métodos y sentencias return. Solo se evalúa una de las dos expresiones de valor, así que los efectos secundarios de la otra rama no ocurren: `int y = true ? x++ : x--;` solo incrementa `x`. El ternario tiene baja precedencia (justo por encima de la asignación) y es asociativo por la derecha, así que `a ? b : c ? d : e` significa `a ? b : (c ? d : e)`.",
   "El tipo del resultado de un ternario depende de ambas ramas. Si una rama es `int` y la otra `double`, la promoción numérica hace que el resultado sea `double`, así que `int r = flag ? 1 : 2.0;` no compila. Si las ramas son de tipos no relacionados, como `String` e `Integer`, el resultado es un supertipo común, lo cual está bien para `Object o = flag ? \"a\" : 1;` pero no para `String s = flag ? \"a\" : 1;`. Un ternario no puede ir solo como sentencia: `flag ? a() : b();` no compila.",
   "Usa `if/else` cuando eliges entre acciones, y un ternario cuando eliges entre dos valores. Los ternarios muy anidados compilan pero son difíciles de leer; las preguntas del examen los usan precisamente porque es fácil malinterpretarlos, así que agrega paréntesis mentalmente de derecha a izquierda."
  ],
  "terms": [
   [
    "Conditional expression (expresión condicional)",
    "El operador ternario cond ? a : b, que se evalúa a uno de dos valores según un boolean."
   ],
   [
    "Dangling else (else colgante)",
    "La regla de que un else se asocia con el if sin pareja más cercano, sin importar la indentación."
   ],
   [
    "Boolean condition (condición booleana)",
    "Una expresión de tipo boolean o Boolean, el único tipo que aceptan if, while y el operador ternario."
   ],
   [
    "Empty statement (sentencia vacía)",
    "Un punto y coma solo; después de if(...) se convierte en todo el cuerpo del if."
   ]
  ],
  "example": "Una página de envíos muestra `String label = weight > 20 ? \"Freight\" : \"Standard\";`. Cuando un compañero luego agrega una segunda acción a un `if` sin llaves para los clientes con envío gratis, la segunda línea se ejecuta para todos. La revisión de código lo detecta, y el equipo adopta la regla de usar siempre llaves.",
  "tip": "Ignora la indentación. Cuenta sentencias: sin llaves, solo una sentencia pertenece al if o al else, y cada else se une al if sin pareja más cercano.",
  "check": [
   [
    "¿Cuál es el tipo de `true ? 1 : 2L`?",
    "long. Se aplica la promoción numérica binaria a las dos ramas, así que el int se ensancha a long."
   ],
   [
    "¿Compila `if (5) { }` en Java?",
    "No. La condición debe ser boolean; Java no convierte números en booleanos."
   ],
   [
    "En `int a = 1; int b = (a > 0) ? a++ : a--;`, ¿cuánto valen a y b?",
    "a es 2 y b es 1. Solo se ejecuta la rama verdadera, y el postfijo a++ produce 1 antes de incrementar."
   ]
  ]
 },
 {
  "t": "Classic switch statements, fall-through and break",
  "tt": "Sentencias switch clásicas, fall-through y break",
  "body": [
   "Una sentencia `switch` elige uno de varios caminos de código comparando un valor con etiquetas `case`. En la forma clásica, cada etiqueta termina con dos puntos, y se ejecuta el código que sigue a la etiqueta que coincide. El selector puede ser un `char`, `byte`, `short` o `int` (o sus wrappers), un `String` o un `enum`. No puede ser `long`, `float`, `double` ni `boolean` en un switch clásico. (Los switch con pattern matching, que se ven más adelante, aceptan cualquier tipo de referencia.)",
   "Cada etiqueta `case` debe ser una constante de tiempo de compilación de un tipo compatible con el selector: un literal, una constante de enum o una variable `final` inicializada con una constante. Una variable no final o una llamada a método como etiqueta no compila. Las etiquetas duplicadas también son un error de compilación. Desde Java 14 un `case` puede listar varios valores separados por comas, como en `case 1, 2, 3:`. Para un selector enum tradicionalmente escribes el nombre de la constante sin calificar, como `case MONDAY:`.",
   "El fall-through (caída a través) es el comportamiento característico de la forma con dos puntos. Una vez que una etiqueta coincide, la ejecución continúa por todas las sentencias siguientes, incluidas las que están bajo etiquetas posteriores, hasta llegar a un `break`, un `return`, una excepción lanzada o el final del switch. Las etiquetas son solo puntos de entrada; no detienen la ejecución. Esto es útil para agrupar, pero normalmente es un error cuando falta un `break`.",
   "```java\nint day = 2;\nswitch (day) {\n    case 1:\n        System.out.print(\"Mon \");\n    case 2:\n        System.out.print(\"Tue \");\n    case 3:\n        System.out.print(\"Wed \");\n        break;\n    default:\n        System.out.print(\"Other \");\n}\n// imprime: Tue Wed\n```",
   "La etiqueta `default` se ejecuta cuando ningún case coincide, y no tiene que ir al final. Si está en medio y se llega a ella, el fall-through sigue aplicando, así que las sentencias de las etiquetas que siguen también se ejecutan hasta un `break`. Si el valor no coincide con ningún case y no hay `default`, un switch clásico simplemente no hace nada; no necesita cubrir todos los valores.",
   "Dos puntos de tiempo de ejecución aparecen en el examen. Hacer switch sobre un `String` usa `equals`, así que distingue mayúsculas de minúsculas, y hacer switch sobre una referencia `String`, wrapper o enum que es `null` sin una etiqueta `case null` lanza una `NullPointerException`. Además, un `break` dentro de un switch que está dentro de un bucle solo sale del switch, no del bucle; usa un break con etiqueta o un `return` para salir del bucle.",
   "Cuando sigas la ejecución de un switch clásico, encuentra primero el punto de entrada (la etiqueta que coincide o `default`), luego lee hacia abajo, imprimiendo todo hasta el primer `break`. No te detengas en la siguiente etiqueta `case`."
  ],
  "terms": [
   [
    "Fall-through (caída a través)",
    "En un switch con dos puntos, la ejecución que continúa hacia las sentencias del siguiente case cuando no hay break."
   ],
   [
    "case label (etiqueta case)",
    "Una constante de tiempo de compilación que marca un punto de entrada en un switch."
   ],
   [
    "default label (etiqueta default)",
    "El punto de entrada usado cuando ningún case coincide; puede aparecer en cualquier parte del switch."
   ],
   [
    "Selector expression (expresión selectora)",
    "El valor en switch(...) que se compara con las etiquetas case."
   ]
  ],
  "example": "Un manejador de menú usa un switch clásico sobre la opción elegida. Un desarrollador agrega un nuevo `case 4:` para \"Export\" pero olvida el break, así que elegir Export también ejecuta el código de \"Delete\" bajo `case 5:`. Cambiar el código a etiquetas con flecha, que nunca hacen fall-through, previene ese tipo de error.",
  "tip": "Encuentra por dónde entra la ejecución al switch y luego sigue hacia abajo pasando cada etiqueta hasta encontrar un break o la llave de cierre. Un default en medio también hace fall-through.",
  "check": [
   [
    "¿Puede un switch clásico usar un selector `long`?",
    "No. El switch clásico admite char, byte, short, int, sus wrappers, String y enums, pero no long, float, double ni boolean."
   ],
   [
    "¿Compila `int v = 3; switch (x) { case v: ... }`?",
    "No. Una etiqueta case debe ser una constante de tiempo de compilación, y v no es final. Declararla como final int v = 3 funcionaría."
   ],
   [
    "¿Qué se imprime si `x` es 9 en `switch (x) { default: print(\"D\"); case 1: print(\"1\"); break; case 2: print(\"2\"); }`?",
    "D1. Se entra por default, y luego la ejecución cae hacia case 1 hasta el break."
   ]
  ]
 },
 {
  "t": "Switch expressions with arrow labels, multiple labels and yield",
  "tt": "Expresiones switch con etiquetas de flecha, múltiples etiquetas y yield",
  "body": [
   "Una expresión switch (switch expression) es un `switch` que produce un valor, así que puedes asignarlo, devolverlo o pasarlo como argumento. Normalmente se escribe con etiquetas de flecha: `case X -> result;`. Las etiquetas de flecha nunca hacen fall-through, así que se ejecuta exactamente una rama y no hace falta `break`. Cuando una expresión switch se usa en el lado derecho de una asignación, todo termina con un punto y coma después de la llave de cierre.",
   "```java\nint day = 6;\nString type = switch (day) {\n    case 1, 2, 3, 4, 5 -> \"Weekday\";\n    case 6, 7 -> \"Weekend\";\n    default -> throw new IllegalArgumentException(\"bad day\");\n};\n```",
   "El lado derecho de una flecha puede ser una expresión, un bloque entre llaves o una sentencia `throw`. Cuando es un bloque, el bloque debe producir su valor con `yield`, como en `case 3 -> { log(\"three\"); yield \"Wed\"; }`. `yield` es para una expresión switch lo que `return` es para un método. Usar `return` dentro de una expresión switch es un error de compilación, porque no puedes saltar fuera de una expresión, y tampoco puedes usar `break` para salir de ella.",
   "Una expresión switch debe ser exhaustiva: todo valor posible del selector debe estar cubierto. Para un selector `int` o `String` eso significa que se requiere una rama `default`. Para un enum, cubrir todas las constantes es suficiente y `default` es opcional. Cada rama también debe producir un valor compatible con el tipo de destino, o lanzar una excepción. Si una rama produce un `String` y otra un `int`, asignar a `String` falla.",
   "Las múltiples etiquetas se listan con comas, `case \"a\", \"e\", \"i\" ->`, y cada etiqueta debe seguir siendo constante y única. No puedes mezclar etiquetas con dos puntos y etiquetas de flecha en el mismo switch. Sin embargo, sí puedes escribir una expresión switch con las antiguas etiquetas con dos puntos; en ese caso cada grupo debe terminar con `yield` (o lanzar una excepción), y el fall-through entre grupos es posible, por lo que se prefiere la forma con flecha.",
   "Las etiquetas de flecha también funcionan en sentencias switch, que entonces se comportan como switch ordenados, sin fall-through y sin valor. Una sentencia switch con flechas sobre un `int` no necesita ser exhaustiva, pero una expresión switch siempre lo necesita. Esa diferencia es una pregunta común del examen: el mismo cuerpo de switch puede compilar como sentencia y fallar como expresión porque falta un `default`.",
   "```java\nint score = 72;\nchar grade = switch (score / 10) {\n    case 10, 9 -> 'A';\n    case 8 -> 'B';\n    case 7 -> {\n        System.out.println(\"close to B\");\n        yield 'C';\n    }\n    default -> 'F';\n};\nSystem.out.println(grade); // imprime close to B y luego C\n```"
  ],
  "terms": [
   [
    "Switch expression (expresión switch)",
    "Un switch que se evalúa a un valor; debe ser exhaustivo y no puede hacer fall-through cuando usa etiquetas de flecha."
   ],
   [
    "Arrow label (etiqueta de flecha)",
    "case X -> ..., una etiqueta cuyo lado derecho es una única expresión, un bloque o un throw, sin fall-through."
   ],
   [
    "yield",
    "Una sentencia que entrega el valor de una expresión switch desde dentro de un bloque o de un grupo con dos puntos."
   ],
   [
    "Exhaustiveness (exhaustividad)",
    "El requisito de que una expresión switch cubra todos los valores posibles de su selector."
   ]
  ],
  "example": "Un servicio de precios asigna a cada nivel de suscripción una tarifa mensual con una expresión switch sobre un enum. Cuando el equipo de producto agrega un nuevo nivel PLATINUM, la compilación falla en ese switch porque ya no es exhaustivo, así que el precio faltante se detecta antes del lanzamiento en lugar de en producción.",
  "tip": "En una expresión switch, busca tres errores: un default faltante para selectores int o String, una rama de bloque sin yield, y un return o break usado para salir de la expresión.",
  "check": [
   [
    "¿Compila una expresión switch sobre un `String` sin `default`?",
    "No. Los valores posibles de String son ilimitados, así que se necesita default para la exhaustividad."
   ],
   [
    "¿Cómo devuelve su valor una rama de bloque de una expresión switch?",
    "Con una sentencia yield, por ejemplo yield 42;. Ahí no se permite return."
   ],
   [
    "¿Puede un switch mezclar `case 1:` y `case 2 ->`?",
    "No. Un mismo switch debe usar etiquetas con dos puntos o etiquetas de flecha, no ambas."
   ]
  ]
 },
 {
  "t": "Pattern matching in switch: type patterns, record patterns and when guards",
  "tt": "Pattern matching en switch: patrones de tipo, patrones de record y guardas when",
  "body": [
   "El pattern matching (coincidencia de patrones) permite que un `switch` pruebe el tipo y la forma de un valor, no solo compararlo con constantes. El selector puede ser cualquier tipo de referencia, como `Object` o una interfaz sellada. Cada `case` contiene un patrón, y cuando el patrón coincide, sus variables quedan vinculadas y listas para usarse en esa rama. Esto reemplaza largas cadenas de comprobaciones `instanceof` y casts.",
   "Un patrón de tipo nombra un tipo y una variable: `case String s -> s.length();`. Si el objeto del selector en tiempo de ejecución es un `String`, se vincula a `s` con tipo `String`. La variable de patrón solo está en alcance en la rama de ese case. Un switch con patrones también puede incluir `case null ->` para manejar null explícitamente; sin eso, un selector null lanza `NullPointerException`. `case null` se puede combinar con default como `case null, default ->`.",
   "Un patrón de record deconstruye un record en sus componentes: dado `record Point(int x, int y)`, la etiqueta `case Point(int x, int y) -> x + y;` coincide con cualquier `Point` y vincula sus componentes a través de los accessors. Puedes usar `var` para los componentes (`case Point(var x, var y)`), y los patrones se pueden anidar, como en `case Line(Point(var x1, var y1), Point p2) ->`. Desde Java 22 puedes usar el patrón sin nombre `_` para un componente que no necesitas, como `case Point(var x, _)`.",
   "Una guarda agrega una condición con `when`: `case Integer i when i > 100 -> \"large\";`. El case coincide solo si el patrón coincide y la guarda es `true`. La guarda puede usar las variables del patrón, y debe ser una expresión `boolean`. Si la guarda es falsa, el switch sigue adelante y prueba las siguientes etiquetas case.",
   "```java\nsealed interface Shape permits Circle, Square {}\nrecord Circle(double r) implements Shape {}\nrecord Square(double side) implements Shape {}\n\nstatic String describe(Object o) {\n    return switch (o) {\n        case null -> \"nothing\";\n        case Circle(double r) when r > 10 -> \"big circle\";\n        case Circle c -> \"circle \" + c.r();\n        case Square(var s) -> \"square \" + s;\n        case String str -> \"text of length \" + str.length();\n        default -> \"unknown\";\n    };\n}\n```",
   "Los cases se prueban de arriba hacia abajo, así que el orden importa: gana la primera etiqueta que coincide. Un case con guarda debe ir antes del case sin guarda del mismo tipo, o el compilador informa que está dominado. Como aquí el selector es `Object`, se necesita un `default` para la exhaustividad. Una sentencia switch con patrones, no solo una expresión, también debe ser exhaustiva.",
   "En un laboratorio, escribe un switch con patrones sobre `Object`, ejecútalo con un `String`, un `Integer`, un record y `null`, y luego mueve a propósito un case con guarda debajo del que no tiene guarda para leer el mensaje de error del compilador."
  ],
  "terms": [
   [
    "Type pattern (patrón de tipo)",
    "Un patrón como String s que coincide cuando el valor es instancia del tipo y lo vincula a una variable."
   ],
   [
    "Record pattern (patrón de record)",
    "Un patrón como Point(int x, int y) que coincide con un record y extrae sus componentes."
   ],
   [
    "Guard (guarda)",
    "Una cláusula when después de un patrón que agrega una condición booleana para que el case coincida."
   ],
   [
    "case null",
    "Una etiqueta que permite que un switch con patrones maneje un selector null en lugar de lanzar NullPointerException."
   ]
  ],
  "example": "Un sistema de eventos recibe mensajes como una interfaz sellada con records como `Login(String user)` y `Payment(String user, long cents)`. Un solo switch con patrones enruta cada record, con `case Payment(var u, var c) when c > 1_000_000 ->` enviando los pagos grandes a revisión manual antes del case Payment normal.",
  "tip": "Lee los cases con patrones de arriba hacia abajo y elige el primero que coincida, revisando también la guarda. Un selector null lanza NullPointerException a menos que haya una etiqueta case null.",
  "check": [
   [
    "¿Con qué coincide `case Integer i when i > 0 ->`?",
    "Solo con valores Integer mayores que cero; el tipo debe coincidir y la guarda debe ser verdadera."
   ],
   [
    "¿Qué pasa si un switch con patrones recibe `null` y no tiene `case null`?",
    "Lanza NullPointerException, incluso si hay una etiqueta default."
   ],
   [
    "¿Qué hace un patrón de record como `case Point(var x, var y)`?",
    "Coincide con un Point y vincula x e y a sus componentes, con tipos inferidos a partir de los tipos de los componentes del record."
   ]
  ]
 },
 {
  "t": "Case dominance and exhaustiveness (enums, sealed types, default)",
  "tt": "Dominancia de cases y exhaustividad (enums, tipos sellados, default)",
  "body": [
   "Dos comprobaciones del compilador hacen seguros los switch con pattern matching: la dominancia y la exhaustividad. La dominancia asegura que se pueda llegar a cada case. La exhaustividad asegura que todo valor posible esté cubierto. Ambas son errores de compilación, así que las preguntas del examen suelen preguntar si un switch compila.",
   "Una etiqueta case está dominada cuando una etiqueta anterior coincide con todos los valores con los que ella coincidiría, así que nunca podría ejecutarse. Las reglas principales son: un patrón de tipo domina a un patrón posterior del mismo tipo o de un subtipo (`case CharSequence cs` antes de `case String s` es un error); un patrón sin guarda domina a un patrón con guarda del mismo tipo (`case Integer i` antes de `case Integer i when i > 5` es un error); y un patrón domina a una etiqueta constante posterior de ese tipo (`case Integer i` antes de `case 42` es un error). La solución es ordenar los cases del más específico al más general. Un patrón con guarda no domina a un patrón posterior, porque el compilador no puede saber si la guarda es verdadera, pero las etiquetas constantes deben ir igualmente antes de cualquier patrón de su tipo, con o sin guarda.",
   "`default` también participa. En un switch que usa patrones, una etiqueta de patrón después de `default` es un error, ya que `default` la dominaría. El hábito seguro es poner `default` al final. Además, un switch no puede tener a la vez un `default` y un patrón incondicional como `case Object o` cuando el selector es `Object`, porque ambos coincidirían con todo.",
   "La exhaustividad se requiere en toda expresión switch y en cualquier sentencia switch que use patrones o `case null`. Para un selector `enum`, listar todas las constantes hace que el switch sea exhaustivo. Para un tipo sellado, cubrir todos los subtipos permitidos lo hace exhaustivo, y no se necesita `default`. En otro caso, agrega `default` o un patrón incondicional. Una sentencia switch clásica sobre un `int`, `String` o `enum` con solo etiquetas constantes sigue pudiendo omitir valores.",
   "```java\nsealed interface Vehicle permits Car, Truck {}\nfinal class Car implements Vehicle {}\nfinal class Truck implements Vehicle {}\n\nint wheels(Vehicle v) {\n    return switch (v) {     // exhaustivo sin default\n        case Car c -> 4;\n        case Truck t -> 6;\n    };\n}\n\n// No compila: el segundo case está dominado\n// switch (obj) { case Number n -> 1; case Integer i -> 2; default -> 0; }\n```",
   "Confiar en la exhaustividad en lugar de `default` es una decisión de diseño. Si alguien luego agrega un subtipo permitido o una nueva constante de enum, todo switch sin `default` deja de compilar, señalando exactamente el código que necesita actualizarse. Si código compilado contra la versión anterior se ejecuta con un subtipo o constante nuevos que no conoce, el switch lanza una `MatchException` en tiempo de ejecución (para tipos sellados; los switch sobre enums más antiguos usaban `IncompatibleClassChangeError`).",
   "Al revisar una respuesta, pregúntate primero: ¿se puede llegar alguna vez a cada case posterior? Luego: ¿hay algún valor que ningún case maneje? Un switch debe pasar ambas preguntas para compilar."
  ],
  "terms": [
   [
    "Dominance (dominancia)",
    "Un case está dominado cuando un case anterior coincide con todos los valores con los que él podría coincidir, lo que lo hace inalcanzable y es un error de compilación."
   ],
   [
    "Exhaustive switch (switch exhaustivo)",
    "Un switch cuyos cases cubren todos los valores posibles del selector, requerido para expresiones switch y switch con patrones."
   ],
   [
    "Unconditional pattern (patrón incondicional)",
    "Un patrón que coincide con todos los valores del tipo del selector, como case Object o para un selector Object."
   ],
   [
    "MatchException",
    "La excepción de tiempo de ejecución que lanza un switch exhaustivo si encuentra un valor que sus cases compilados no cubren, como un subtipo agregado recientemente."
   ]
  ],
  "example": "Un motor de impuestos tiene una interfaz sellada `Income` con los records permitidos `Salary`, `Dividend` y `Rent`. Sus expresiones switch no tienen default. Cuando el equipo agrega `Royalty` a la lista permits, el compilador marca cada switch que necesita un case nuevo, así que ninguna regla fiscal se omite en silencio.",
  "tip": "Ordena los cases con patrones de lo específico a lo general: subtipos antes que supertipos, con guarda antes que sin guarda, constantes antes que patrones de tipo, y default al final.",
  "check": [
   [
    "¿Por qué `case Integer i -> ...; case Integer i when i > 0 -> ...;` no compila?",
    "El patrón Integer sin guarda coincide con todos los valores con los que coincidiría el que tiene guarda, así que el segundo case está dominado."
   ],
   [
    "¿Necesita `default` una expresión switch sobre una interfaz sellada si cada subtipo permitido tiene un case?",
    "No. Cubrir todos los subtipos permitidos la hace exhaustiva."
   ],
   [
    "¿Necesita una sentencia switch clásica sobre un enum con etiquetas constantes cubrir todas las constantes?",
    "No. Solo las expresiones switch y los switch con patrones deben ser exhaustivos."
   ]
  ]
 },
 {
  "t": "While, do-while, for and enhanced for loops",
  "tt": "Bucles while, do-while, for y for mejorado",
  "body": [
   "Java tiene cuatro formas de bucle. Un bucle `while` comprueba su condición `boolean` antes de cada iteración, así que su cuerpo puede ejecutarse cero veces. Un bucle `do-while` ejecuta primero el cuerpo y comprueba la condición después, así que su cuerpo siempre se ejecuta al menos una vez. El `do-while` debe terminar con un punto y coma después de la condición: `do { ... } while (x < 3);`. Omitirlo es un error de compilación.",
   "El bucle `for` básico tiene tres partes entre paréntesis: inicialización, condición y actualización, como en `for (int i = 0; i < 5; i++)`. La inicialización se ejecuta una vez, la condición se comprueba antes de cada iteración y la actualización se ejecuta después de cada iteración. Las tres partes son opcionales, así que `for (;;)` es un bucle infinito. La inicialización puede declarar varias variables del mismo tipo (`int i = 0, j = 10`) pero no de tipos distintos, y la actualización puede listar varias expresiones separadas por comas (`i++, j--`). Una variable declarada en la inicialización existe solo dentro del bucle.",
   "El bucle `for` mejorado (for-each) recorre un arreglo o cualquier objeto que implemente `Iterable`, como un `List` o un `Set`: `for (String name : names)`. La variable del bucle es una copia de cada elemento, así que asignarle un valor no cambia el arreglo ni la colección. No te da un índice, y no puedes usarlo directamente sobre un `Map`; en su lugar recorre `map.keySet()`, `map.values()` o `map.entrySet()`. Modificar estructuralmente una colección, por ejemplo llamar a `list.remove` dentro de un for-each sobre esa lista, normalmente lanza `ConcurrentModificationException`.",
   "```java\nint i = 10;\nwhile (i < 3) { i++; }        // el cuerpo nunca se ejecuta\ndo { i++; } while (i < 3);   // se ejecuta una vez: i vale 11\n\nfor (int a = 0, b = 5; a < b; a++, b--) {\n    System.out.print(a + \"\" + b + \" \");  // 05 14 23\n}\n\nint[] nums = {1, 2, 3};\nfor (int n : nums) { n *= 10; }\nSystem.out.println(nums[0]);  // 1: el arreglo no cambia\n```",
   "Los bucles infinitos importan para la compilación. `while (true) { }` sin ningún `break` significa que cualquier sentencia después del bucle es inalcanzable, lo cual es un error de compilación. Lo mismo ocurre con `for (;;)`. Con un `break` dentro, el código después del bucle vuelve a ser alcanzable. Las siguientes lecciones cubren `break`, `continue` y el código inalcanzable en detalle.",
   "Elige el bucle según la intención. Usa `while` cuando no sabes cuántas iteraciones necesitas, `do-while` cuando el cuerpo debe ejecutarse al menos una vez (como al pedir datos de entrada), `for` cuando cuentas o necesitas un índice, y el `for` mejorado cuando simplemente quieres visitar cada elemento en orden.",
   "Al rastrear bucles en el examen, haz una pequeña tabla con una fila por iteración y una columna por variable, y anota cuándo se evalúa la condición. La mayoría de los errores vienen de equivocarse por una iteración."
  ],
  "terms": [
   [
    "do-while loop (bucle do-while)",
    "Un bucle que ejecuta su cuerpo una vez antes de evaluar la condición, así que siempre se ejecuta al menos una vez."
   ],
   [
    "Enhanced for loop (bucle for mejorado)",
    "for (T x : source), que visita cada elemento de un arreglo o Iterable sin índice."
   ],
   [
    "Iterable",
    "La interfaz que permite usar un objeto como fuente de un bucle for mejorado."
   ],
   [
    "Infinite loop (bucle infinito)",
    "Un bucle cuya condición nunca se vuelve false, como while(true) o for(;;), del que normalmente se sale con break o return."
   ]
  ],
  "example": "Una herramienta de línea de comandos sigue pidiendo una contraseña con un bucle do-while hasta que la entrada cumple las reglas, porque debe preguntar al menos una vez. Luego usa un bucle for mejorado para imprimir cada uno de los perfiles guardados del usuario desde un List.",
  "tip": "Revisa si la condición se evalúa antes o después del cuerpo: while y for pueden ejecutarse cero veces, do-while siempre se ejecuta al menos una vez. Revisa también que el do-while termine con punto y coma.",
  "check": [
   [
    "¿Cuántas veces ejecuta su cuerpo `int x = 5; do { x++; } while (x < 5);`?",
    "Una vez. El cuerpo se ejecuta antes de evaluar la condición, y luego 6 < 5 es false."
   ],
   [
    "¿Compila `for (int i = 0, long j = 0; i < 3; i++)`?",
    "No. Todas las variables declaradas en la inicialización deben compartir un mismo tipo."
   ],
   [
    "¿Asignar un valor a la variable del bucle en `for (int n : arr)` cambia el arreglo?",
    "No. La variable del bucle contiene una copia de cada elemento."
   ]
  ]
 },
 {
  "t": "Break and continue, including labeled statements",
  "tt": "break y continue, incluidas las sentencias etiquetadas",
  "body": [
   "`break` y `continue` cambian el flujo normal de un bucle. `break` termina inmediatamente el bucle (o `switch`) más interno que lo contiene, y la ejecución continúa con la sentencia que sigue. `continue` salta el resto de la iteración actual y pasa directamente a la siguiente. En un bucle `for`, `continue` sigue ejecutando la expresión de actualización (como `i++`) antes de evaluar la condición de nuevo; en un bucle `while` o `do-while` salta a la evaluación de la condición.",
   "Sin etiqueta, ambas sentencias afectan solo al bucle más interno. Con bucles anidados, eso muchas veces no es lo que quieres. Una etiqueta (label) es un identificador seguido de dos puntos colocado antes de una sentencia, como `outer: for (...)`. Entonces `break outer;` termina por completo el bucle etiquetado, y `continue outer;` termina la iteración actual del bucle interno y pasa a la siguiente iteración del bucle externo etiquetado.",
   "```java\nouter:\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j == 2) continue outer;  // salta el resto del bucle interno\n        if (i == 3) break outer;     // sale de ambos bucles\n        System.out.print(i + \"\" + j + \" \");\n    }\n}\n// imprime: 11 21\n```",
   "Rastrea ese ejemplo con cuidado. Cuando `i` es 1, `j` es 1 y se imprime `11`; luego `j` es 2 y `continue outer` salta a `i = 2`. Lo mismo ocurre con `i = 2`, que imprime `21`. Cuando `i` es 3 y `j` es 1, `break outer` termina todo. Observa que las comprobaciones van antes del print, así que su orden decide la salida.",
   "Hay reglas sobre dónde pueden aparecer estas sentencias. `continue` solo se permite dentro de un bucle; usarlo en un `switch` o `if` simple fuera de un bucle es un error de compilación. `continue` con etiqueta debe nombrar un bucle. `break` puede aparecer en un bucle o en un `switch`, y un `break` etiquetado puede incluso nombrar un bloque etiquetado o una sentencia `if`, aunque eso es raro. Usar una etiqueta que no envuelve a la sentencia es un error de compilación. Además, cualquier sentencia justo después de un `break` o `continue` en el mismo bloque es inalcanzable y no compila.",
   "Dentro de un switch que está en un bucle, un `break` sin etiqueta sale solo del switch, mientras que `continue` afecta al bucle, ya que un switch no es un bucle. Y `break` no se puede usar para salir de una expresión switch: ahí debes usar `yield` con un valor.",
   "Las etiquetas son legales en cualquier sentencia, pero solo importan para `break` y `continue`. Por convención se escriben con palabras en minúsculas o mayúsculas, y viven en su propio espacio de nombres, así que una etiqueta puede tener el mismo nombre que una variable. Úsalas con moderación: cuando sientas que necesitas un break etiquetado, extraer el bucle anidado a un método y usar `return` suele ser más claro."
  ],
  "terms": [
   [
    "break",
    "Termina el bucle o switch más interno que lo contiene, o la sentencia etiquetada que nombra."
   ],
   [
    "continue",
    "Salta el resto de la iteración actual del bucle más interno, o del bucle etiquetado que nombra."
   ],
   [
    "Label (etiqueta)",
    "Un identificador seguido de dos puntos colocado antes de una sentencia para que break o continue puedan apuntar a ella."
   ],
   [
    "Nested loop (bucle anidado)",
    "Un bucle dentro de otro bucle; un break o continue sin etiqueta afecta solo al interno."
   ]
  ],
  "example": "Una app de reservas de asientos busca en un arreglo 2D el primer asiento libre. En cuanto encuentra uno, usa `break search;` para salir tanto del bucle de filas como del de columnas, en lugar de activar una bandera y revisarla en el bucle externo.",
  "tip": "Pregúntate a qué bucle se refiere cada break o continue. Sin etiqueta siempre es el bucle más interno; con etiqueta es el bucle que lleva esa etiqueta. Recuerda que continue en un bucle for sigue ejecutando la actualización.",
  "check": [
   [
    "¿Qué hace `continue outer;` cuando se ejecuta dentro de un bucle interno?",
    "Abandona el resto del bucle interno y empieza la siguiente iteración del bucle etiquetado outer, incluido su paso de actualización."
   ],
   [
    "¿Se puede usar `continue` dentro de un switch que no está dentro de ningún bucle?",
    "No. continue debe estar dentro de un bucle, así que eso es un error de compilación."
   ],
   [
    "En un switch dentro de un bucle for, ¿qué hace un `break` sin etiqueta en un case?",
    "Sale solo del switch; el bucle sigue ejecutándose."
   ]
  ]
 },
 {
  "t": "Unreachable code and definite assignment compile errors",
  "tt": "Código inalcanzable y errores de compilación por asignación definida",
  "body": [
   "El compilador de Java realiza un análisis de flujo en cada método. Dos de sus comprobaciones producen errores que al examen le encantan: sentencias que nunca pueden ejecutarse (código inalcanzable) y variables locales que podrían leerse antes de tener un valor (asignación definida). Ambos son errores de compilación, no advertencias, así que una pregunta que parece tratar sobre la salida puede en realidad tratar sobre si el código compila.",
   "Una sentencia es inalcanzable si el compilador puede demostrar que el control nunca llega a ella. Los casos comunes son sentencias justo después de `return`, `throw`, `break` o `continue` en el mismo bloque; código después de un bucle infinito como `while (true)` o `for (;;)` que no contiene ningún `break` para salir; y el cuerpo de `while (false)`. El análisis usa solo expresiones constantes: se sabe que `while (true)` itera para siempre, pero `boolean t = true; while (t)` no, porque `t` no es una constante, a menos que se declare `final`.",
   "Las sentencias `if` son una excepción deliberada. `if (false) { ... }` compila, para que los desarrolladores puedan activar y desactivar bloques de código con una bandera constante. Así que `while (false) { x++; }` es un error pero `if (false) { x++; }` está bien. Sin embargo, la exención cubre solo la condición: si tanto la rama `if` como la `else` terminan con `return` o `throw`, una sentencia colocada después de todo el `if-else` es inalcanzable y no compila.",
   "```java\nint f() {\n    return 1;\n    // System.out.println(\"hi\");  // inalcanzable: no compila\n}\n\nvoid g() {\n    while (true) { }\n    // System.out.println(\"done\"); // inalcanzable\n}\n\nvoid h() {\n    for (int i = 0; ; i++) {\n        if (i > 3) break;\n    }\n    System.out.println(\"ok\");     // alcanzable gracias al break\n}\n```",
   "Asignación definida (definite assignment) significa que el compilador debe poder demostrar que una variable local ha sido asignada antes de leerse, en todos los caminos posibles. Los campos y los elementos de arreglos reciben valores por defecto, pero las variables locales no. Si una variable se asigna solo en algunas ramas de un `if` sin `else`, o solo dentro de un bucle (que podría ejecutarse cero veces), leerla después es un error de compilación. Asignarla tanto en la rama `if` como en la `else`, o en cada rama de un switch exhaustivo, cumple la regla.",
   "```java\nint x;\nif (Math.random() > 0.5) x = 1;\n// System.out.println(x);   // no compila: x podría no estar inicializada\n\nint y;\nif (Math.random() > 0.5) y = 1; else y = 2;\nSystem.out.println(y);      // OK\n```",
   "El mismo análisis rige las variables locales `final`: una variable `final` puede declararse sin valor y asignarse después, pero debe asignarse exactamente una vez en cada camino. Asignarla dos veces, o dentro de un bucle, es un error. Un método con tipo de retorno distinto de void debe devolver un valor en cada camino o terminar en un `throw`; de lo contrario obtienes un error \"missing return statement\"."
  ],
  "terms": [
   [
    "Unreachable statement (sentencia inalcanzable)",
    "Una sentencia que el compilador puede demostrar que nunca se ejecutará, lo cual es un error de compilación en Java."
   ],
   [
    "Definite assignment (asignación definida)",
    "La regla del compilador según la cual una variable local debe asignarse en cada camino antes de leerse."
   ],
   [
    "Constant expression (expresión constante)",
    "Una expresión que el compilador puede evaluar, como true o una variable final que contiene un literal, usada en el análisis de alcanzabilidad."
   ],
   [
    "Missing return statement",
    "El error que se reporta cuando un método que no es void puede llegar a su final sin devolver un valor."
   ]
  ],
  "example": "Un desarrollador agrega temporalmente `return;` al inicio de un método para saltarse cierta lógica mientras depura, y la compilación falla con \"unreachable statement\". Cambiarlo a `if (true) return;` compila, porque las sentencias if están exentas de la regla de código inalcanzable.",
  "tip": "Trata if(false) y while(false) de forma distinta: el primero compila, el segundo no. Para las variables locales, rastrea cada camino, incluido un bucle que se ejecuta cero veces y un if sin else.",
  "check": [
   [
    "¿Compila `while (false) { System.out.println(1); }`?",
    "No. El cuerpo es inalcanzable porque la condición es la constante false."
   ],
   [
    "¿Compila `int x; for (int i = 0; i < 3; i++) x = i; System.out.println(x);`?",
    "No. El compilador no puede demostrar que el cuerpo del bucle se ejecuta, así que x no está definitivamente asignada."
   ],
   [
    "¿Es alcanzable el código después de `while (true) { if (done()) break; }`?",
    "Sí. El break hace posible que el control salga del bucle."
   ]
  ]
 },
 {
  "t": "Classes, fields, methods, constructors, initializer blocks and initialization order",
  "tt": "Clases, campos, métodos, constructores, bloques inicializadores y orden de inicialización",
  "body": [
   "Una clase es un plano que declara campos (el estado que guarda cada objeto o la clase), métodos (comportamiento) y constructores (código que prepara un objeto nuevo). Un campo de instancia pertenece a cada objeto, mientras que un campo `static` pertenece a la clase y se comparte. Un archivo fuente puede contener muchas clases de nivel superior, pero como máximo una puede ser `public`, y esa debe coincidir con el nombre del archivo.",
   "Un constructor tiene el nombre de la clase y no tiene tipo de retorno. Si escribes `void MyClass()`, escribiste un método, no un constructor. Si una clase no declara ningún constructor, el compilador agrega un constructor por defecto sin argumentos. En cuanto declaras cualquier constructor, ese constructor por defecto desaparece, así que `new MyClass()` deja de compilar si solo declaraste `MyClass(int x)`. El cuerpo de todo constructor empieza, explícita o implícitamente, con una llamada a `super(...)` o `this(...)`; si no escribes ninguna, el compilador inserta `super()`, que falla si el padre no tiene un constructor sin argumentos.",
   "Los bloques inicializadores son bloques de código en el cuerpo de la clase. Un bloque `static { ... }` se ejecuta una vez cuando la clase se inicializa, lo que ocurre la primera vez que la clase se usa realmente (por ejemplo, cuando se crea una instancia o se accede a un miembro estático). Un inicializador de instancia, un bloque `{ ... }` simple, se ejecuta cada vez que se crea un objeto. Los inicializadores de campo como `int count = 5;` se comportan igual que los bloques inicializadores y se ejecutan en el orden en que aparecen en el código fuente.",
   "El orden completo cuando creas el primer objeto de una subclase es: primero, los inicializadores de campos estáticos y bloques estáticos de la superclase, luego los de la subclase, cada uno en orden textual (solo una vez); luego, para el objeto nuevo, la parte de la superclase se construye por completo (sus inicializadores y bloques de instancia en orden, luego el cuerpo de su constructor); después los inicializadores y bloques de instancia de la subclase en orden; y finalmente el resto del cuerpo del constructor de la subclase. Cuando un constructor llama a `this(...)`, los inicializadores de instancia se ejecutan solo una vez, como parte del constructor que finalmente llama a `super`.",
   "```java\nclass A {\n    static { System.out.print(\"A-static \"); }\n    { System.out.print(\"A-init \"); }\n    A() { System.out.print(\"A() \"); }\n}\nclass B extends A {\n    static { System.out.print(\"B-static \"); }\n    { System.out.print(\"B-init \"); }\n    B() { System.out.print(\"B() \"); }\n}\n// new B(); new B(); imprime:\n// A-static B-static A-init A() B-init B() A-init A() B-init B()\n```",
   "Una declaración de método incluye modificadores de acceso y otros opcionales, un tipo de retorno (o `void`), un nombre, una lista de parámetros y una cláusula `throws` opcional. Java pasa los argumentos por valor: los primitivos se copian, y para los objetos se copia la referencia. Así que un método puede cambiar el objeto al que apunta un parámetro, pero asignar un objeto nuevo al parámetro no afecta la variable de quien llama. Los métodos estáticos no pueden usar `this` ni acceder directamente a miembros de instancia, porque no hay un objeto actual.",
   "Cuando rastrees preguntas de inicialización, escribe la salida en dos fases: la parte estática (una vez por clase, primero el padre) y la parte de instancia (por objeto, primero el padre, los inicializadores antes del cuerpo del constructor)."
  ],
  "terms": [
   [
    "Default constructor (constructor por defecto)",
    "El constructor sin argumentos que el compilador agrega solo cuando una clase no declara constructores."
   ],
   [
    "Static initializer (inicializador estático)",
    "Un bloque static { } que se ejecuta una vez cuando la clase se inicializa."
   ],
   [
    "Instance initializer (inicializador de instancia)",
    "Un bloque { } en el cuerpo de la clase que se ejecuta para cada objeto nuevo, antes del cuerpo del constructor pero después del constructor de la superclase."
   ],
   [
    "Pass by value (paso por valor)",
    "Java copia cada argumento en el parámetro; para los objetos, el valor copiado es la referencia."
   ]
  ],
  "example": "Una clase de configuración carga los ajustes por defecto en un bloque estático, así que el archivo se lee una vez cuando la clase se usa por primera vez, no cada vez que se crea un objeto de ajustes. Luego cada objeto copia esos valores por defecto en un inicializador de instancia, de modo que todos los constructores los obtienen sin código duplicado.",
  "tip": "Lo estático se ejecuta una vez, el padre antes que el hijo. Para cada objeto nuevo: inicializadores y cuerpo del constructor del padre, luego inicializadores del hijo, luego cuerpo del constructor del hijo. Los inicializadores se ejecutan en el orden del código fuente.",
  "check": [
   [
    "Si una clase declara solo `Car(String model)`, ¿compila `new Car()`?",
    "No. Declarar cualquier constructor impide que el compilador agregue el constructor por defecto sin argumentos."
   ],
   [
    "¿Cuándo se ejecuta un bloque inicializador estático?",
    "Una vez, cuando la clase se inicializa en su primer uso activo, antes de que se cree cualquier instancia de ella."
   ],
   [
    "¿Es `public void Dog() { }` un constructor?",
    "No. Tiene tipo de retorno, así que es un método ordinario que casualmente comparte el nombre de la clase."
   ]
  ]
 },
 {
  "t": "Flexible constructor bodies (Java 25): statements before super(...) or this(...)",
  "tt": "Cuerpos de constructor flexibles (Java 25): sentencias antes de super(...) o this(...)",
  "body": [
   "Antes de Java 25, la llamada a `super(...)` o `this(...)` tenía que ser la primera sentencia de un constructor. Esa regla hacía incómodo validar o preparar argumentos antes de pasarlos al constructor padre; los desarrolladores recurrían a métodos auxiliares estáticos o a expresiones complicadas dentro de la lista de argumentos. Los cuerpos de constructor flexibles (flexible constructor bodies), finalizados en Java 25, relajan la regla: ahora puedes escribir sentencias antes de la llamada explícita al constructor.",
   "El cuerpo del constructor se divide en dos partes. Las sentencias antes de `super(...)` o `this(...)` forman el prólogo, y las sentencias después forman el epílogo. La llamada explícita al constructor todavía tiene que ser una sentencia de nivel superior del cuerpo del constructor; no puede colocarse dentro de un `if`, un bucle o un bloque `try`, y un constructor sigue llamando a `super` o `this` como máximo una vez. Si no hay una llamada explícita, el compilador sigue insertando `super()` al inicio, como antes.",
   "El prólogo se ejecuta en un contexto de construcción temprana, antes de que su superclase haya inicializado el objeto. Por eso el prólogo no puede usar el objeto que se está construyendo. No puedes leer sus campos, llamar a sus métodos de instancia, usar `this` explícitamente (excepto para asignar un campo), usar `super.algo` ni crear una instancia de una clase interna que capturaría `this`. Lo que sí puedes hacer es trabajar con parámetros y variables locales, llamar a métodos estáticos, lanzar excepciones y asignar valores a campos declarados en esta clase que no tienen inicializador (solo asignar, no leer). Una sentencia `return` no está permitida en el prólogo.",
   "```java\nclass Account {\n    Account(long cents) { /* ... */ }\n}\n\nclass SavingsAccount extends Account {\n    private final double rate;\n\n    SavingsAccount(long cents, double rate) {\n        if (cents < 0) {                       // prólogo: validar primero\n            throw new IllegalArgumentException(\"negative\");\n        }\n        this.rate = rate;                      // permitido: asignar un campo propio\n        super(cents);                          // llamada explícita al constructor\n        System.out.println(\"created\");        // epílogo: puede usar this\n    }\n}\n```",
   "Asignar campos en el prólogo importa por los métodos sobrescritos. Si el constructor de una superclase llama a un método que una subclase sobrescribe, antes ese método se ejecutaba antes de que se asignaran los campos de la subclase y podía ver sus valores por defecto, como `null` o 0. Cuando la subclase asigna sus campos antes de llamar a `super(...)`, el método sobrescrito ve los valores reales.",
   "Esto cambia solo un poco el orden de inicialización que aprendiste antes. Para un constructor con prólogo, primero se ejecuta el prólogo; luego se construye la superclase; luego se ejecutan los inicializadores de instancia y de campo de esta clase en orden textual; luego el epílogo. La validación en el prólogo también significa que un argumento incorrecto falla rápido, antes de que la superclase haga cualquier trabajo.",
   "Las preguntas del examen sobre este tema suelen mostrar un prólogo y preguntar si compila. Busca cualquier lectura de un campo de instancia, cualquier llamada a un método de instancia, cualquier acceso con `super.`, un `return` o una llamada a `super(...)` anidada dentro de otra sentencia: cada uno de esos es un error de compilación."
  ],
  "terms": [
   [
    "Prologue (prólogo)",
    "Las sentencias de un constructor antes de la llamada explícita a super(...) o this(...), que no pueden usar el objeto que se está construyendo."
   ],
   [
    "Epilogue (epílogo)",
    "Las sentencias después de la llamada explícita al constructor, donde el objeto puede usarse normalmente."
   ],
   [
    "Early construction context (contexto de construcción temprana)",
    "El prólogo y los argumentos de la llamada al constructor, donde las referencias a la instancia actual están restringidas."
   ],
   [
    "Explicit constructor invocation (invocación explícita de constructor)",
    "Una sentencia super(...) o this(...) que encadena a otro constructor."
   ]
  ],
  "example": "Una clase `Temperature` extiende una clase base `Measurement` cuyo constructor registra el valor en el log. Ahora la subclase comprueba en su prólogo que el valor esté por encima del cero absoluto y lanza IllegalArgumentException si no, así que un objeto inválido nunca llega al constructor padre ni al log.",
  "tip": "En un prólogo, lo permitido es: parámetros, variables locales, llamadas estáticas, lanzar excepciones y asignar campos de esta clase. Lo no permitido es: leer campos, llamar a métodos de instancia, super.x, return o poner super(...) dentro de un bloque.",
  "check": [
   [
    "¿Puede un constructor de Java 25 llamar a un método auxiliar estático antes de `super(...)`?",
    "Sí. Los métodos estáticos no necesitan la instancia, así que están permitidos en el prólogo."
   ],
   [
    "¿Compila `Child(int x) { System.out.println(this.name); super(); }`?",
    "No. Leer un campo de instancia en el prólogo usa el objeto antes de que esté inicializado."
   ],
   [
    "¿Puede `super(...)` aparecer dentro de un bloque `if` en un constructor?",
    "No. La llamada explícita al constructor debe ser una sentencia de nivel superior del cuerpo del constructor."
   ]
  ]
 },
 {
  "t": "Inheritance, overriding vs overloading vs hiding, polymorphism and casting",
  "tt": "Herencia, sobrescritura vs sobrecarga vs ocultamiento, polimorfismo y casting",
  "body": [
   "Una clase hereda de una superclase directa con `extends` (Java tiene herencia simple de clases), y toda clase en última instancia extiende `Object`. La subclase hereda los miembros accesibles y puede agregar otros nuevos o reemplazar el comportamiento heredado. Los miembros private no se heredan en el sentido de ser accesibles, y los constructores nunca se heredan.",
   "La sobrescritura (overriding) ocurre cuando una subclase declara un método de instancia con el mismo nombre y tipos de parámetros que uno heredado. Las reglas son: el tipo de retorno debe ser el mismo o un subtipo (un retorno covariante); el nivel de acceso no puede ser más restrictivo (un método `public` no puede sobrescribirse como `protected`); y no puede declarar excepciones checked nuevas o más amplias. Los métodos `final` no pueden sobrescribirse. La anotación `@Override` le pide al compilador que confirme que realmente estás sobrescribiendo algo, y atrapa errores de escritura.",
   "La sobrecarga (overloading) es distinta: métodos en la misma clase (o heredados) comparten un nombre pero tienen listas de parámetros diferentes. El tipo de retorno y las excepciones por sí solos no distinguen las sobrecargas, así que dos métodos que difieren solo en el tipo de retorno no compilan. El compilador elige la sobrecarga en tiempo de compilación a partir de los tipos de los argumentos, prefiriendo una coincidencia exacta, luego ampliación (widening), luego boxing y luego varargs.",
   "El ocultamiento (hiding) se aplica a los métodos estáticos y a los campos. Un método estático en una subclase con la misma firma que un método estático del padre lo oculta en lugar de sobrescribirlo, y la versión llamada depende del tipo de la referencia en tiempo de compilación, no del objeto. Un método estático no puede ocultar un método de instancia ni al revés; eso es un error de compilación. Los campos también se ocultan, nunca se sobrescriben: `parentRef.name` lee el campo del padre aunque el objeto sea una subclase.",
   "Polimorfismo significa que una referencia de un supertipo puede apuntar a un objeto de cualquier subtipo, y las llamadas a métodos de instancia sobrescritos se resuelven en tiempo de ejecución usando el objeto real. El tipo de la referencia decide qué métodos puedes llamar; el tipo del objeto decide qué implementación se ejecuta.",
   "```java\nclass Animal {\n    String name = \"animal\";\n    static String kind() { return \"Animal\"; }\n    String sound() { return \"...\"; }\n}\nclass Dog extends Animal {\n    String name = \"dog\";\n    static String kind() { return \"Dog\"; }\n    @Override String sound() { return \"Woof\"; }\n}\nAnimal a = new Dog();\nSystem.out.println(a.sound()); // Woof   (sobrescrito: tipo del objeto)\nSystem.out.println(a.name);    // animal (campo: tipo de la referencia)\nSystem.out.println(a.kind());  // Animal (estático: tipo de la referencia)\n```",
   "Hacer casting de tipos de referencia cambia el tipo de la referencia, no el objeto. El upcasting (de subtipo a supertipo) es automático. El downcasting necesita un cast explícito, `Dog d = (Dog) a;`, y si el objeto no es realmente un `Dog` se lanza una `ClassCastException` en tiempo de ejecución. Si los dos tipos no pueden estar relacionados de ninguna forma, como hacer cast de un `String` a un `Integer`, el compilador lo rechaza directamente. Usa `instanceof` antes de un downcast cuando no estés seguro."
  ],
  "terms": [
   [
    "Overriding (sobrescritura)",
    "Redefinir un método de instancia heredado con la misma firma; el tipo del objeto en tiempo de ejecución decide qué versión se ejecuta."
   ],
   [
    "Overloading (sobrecarga)",
    "Declarar métodos con el mismo nombre pero listas de parámetros distintas; el compilador elige uno según los tipos de los argumentos."
   ],
   [
    "Hiding (ocultamiento)",
    "Declarar un método estático o un campo con el mismo nombre que uno del padre; el tipo de la referencia decide cuál se usa."
   ],
   [
    "Covariant return type (tipo de retorno covariante)",
    "El tipo de retorno de un método sobrescrito que es un subtipo del tipo de retorno del método original."
   ]
  ],
  "example": "Un programa de dibujo mantiene un `List<Shape>` con círculos, cuadrados y triángulos. Llamar a `shape.area()` en cada elemento ejecuta la fórmula correcta para cada objeto porque `area` está sobrescrito, mientras que el código de la lista nunca necesita conocer las clases concretas.",
  "tip": "Los métodos de instancia siguen al objeto; los campos y los métodos estáticos siguen al tipo de la referencia. Para la sobrescritura, revisa la firma, el retorno covariante, que el acceso no sea más restringido y que no haya excepciones checked nuevas o más amplias.",
  "check": [
   [
    "¿Puede una subclase sobrescribir `public void run()` con `protected void run()`?",
    "No. Un método que sobrescribe no puede tener un acceso más restrictivo."
   ],
   [
    "¿Qué ocurre en tiempo de ejecución con `Object o = \"hi\"; Integer i = (Integer) o;`?",
    "Compila, porque un Object podría ser un Integer, pero lanza ClassCastException porque el objeto es un String."
   ],
   [
    "¿Compilan `int calc()` y `long calc()` en la misma clase como sobrecargas?",
    "No. Las sobrecargas deben diferir en la lista de parámetros; un tipo de retorno distinto por sí solo no basta."
   ]
  ]
 },
 {
  "t": "Abstract classes and interfaces: default, static and private interface methods",
  "tt": "Clases abstractas e interfaces: métodos default, static y private en interfaces",
  "body": [
   "Una clase abstracta se declara con `abstract` y no puede instanciarse con `new`. Puede contener métodos abstractos, que no tienen cuerpo y terminan con punto y coma, junto con métodos ordinarios, campos y constructores. Una subclase concreta (no abstracta) debe implementar todos los métodos abstractos heredados; una subclase abstracta puede dejárselos a sus propias subclases. Un método abstracto no puede ser `private`, `static` ni `final`, porque cada uno de esos impediría que se sobrescriba. Una clase con un método abstracto debe ser abstracta.",
   "Una interfaz define un contrato. Una clase usa `implements` para adoptar una o más interfaces, que es la forma en que Java admite herencia múltiple de tipo. Una interfaz no puede tener campos de instancia ni constructores; cualquier campo que declares es implícitamente `public static final`, una constante que debe inicializarse. Los métodos sin cuerpo son implícitamente `public abstract`. Una interfaz puede extender varias otras interfaces.",
   "Las interfaces también pueden contener cuerpos de métodos de tres tipos. Un método `default` es un método de instancia con implementación que las clases que implementan la interfaz heredan y pueden sobrescribir; es implícitamente `public`. Un método `static` pertenece a la propia interfaz y debe llamarse con el nombre de la interfaz, como `Validator.isEmail(s)`; no lo heredan las clases que la implementan ni las subinterfaces, así que llamarlo a través de una clase que la implementa o de una instancia no compila. Un método `private` (de instancia o estático) contiene código auxiliar compartido por otros métodos de la interfaz y no es visible fuera de ella.",
   "Cuando una clase hereda dos métodos default con la misma firma de interfaces distintas, debe sobrescribir el método, o la clase no compila. Dentro de la sobrescritura puede llamar a una versión específica con `InterfaceName.super.method()`. Si una superclase proporciona un método con la misma firma, el método de la clase gana sobre cualquier default de interfaz (\"la clase gana\"). Y si una interfaz extiende a otra y sobrescribe el default, gana la interfaz más específica.",
   "```java\ninterface Walker {\n    default String move() { return \"walk\"; }\n    static String info() { return \"Walker\"; }\n}\ninterface Swimmer {\n    default String move() { return \"swim\"; }\n}\nclass Duck implements Walker, Swimmer {\n    @Override public String move() {        // obligatorio: defaults en conflicto\n        return Walker.super.move() + \" and \" + helper();\n    }\n    private String helper() { return \"swim\"; }\n}\n// Walker.info() funciona; Duck.info() no compila\n```",
   "Como los métodos de interfaz son implícitamente `public`, una clase que implementa la interfaz debe declarar sus implementaciones como `public`. Escribir `void move()` (acceso de paquete) en la clase es un error de compilación, ya que reduciría la visibilidad.",
   "Elige una clase abstracta cuando clases relacionadas comparten estado o lógica de constructor, y una interfaz cuando describes una capacidad que pueden tener clases no relacionadas. Una clase puede extender solo una clase abstracta pero implementar muchas interfaces."
  ],
  "terms": [
   [
    "Abstract method (método abstracto)",
    "Un método sin cuerpo que las subclases concretas o las clases que implementan deben implementar."
   ],
   [
    "Default method (método default)",
    "Un método de instancia de interfaz con cuerpo que las clases que implementan heredan y pueden sobrescribir."
   ],
   [
    "Static interface method (método estático de interfaz)",
    "Un método que pertenece a la propia interfaz y solo se llama como InterfaceName.method()."
   ],
   [
    "Private interface method (método privado de interfaz)",
    "Un método auxiliar con cuerpo que solo es visible dentro de la interfaz."
   ]
  ],
  "example": "Una biblioteca agrega un nuevo método `default` `sortedByTitle()` a su interfaz `Catalog`. Las clases existentes que implementan Catalog siguen compilando porque heredan el default, y las clases que necesitan una versión más rápida lo sobrescriben.",
  "tip": "Los métodos de interfaz son public, se escriba o no, así que las implementaciones deben ser public. Los métodos estáticos de interfaz se llaman solo con el nombre de la interfaz, y los defaults duplicados deben resolverse con una sobrescritura.",
  "check": [
   [
    "¿Puede declararse un método de interfaz como `protected`?",
    "No. Los métodos de interfaz solo pueden ser public o private."
   ],
   [
    "¿Cómo llamas a la versión de Walker de un método default en conflicto desde dentro de Duck?",
    "Walker.super.move(); dentro del método que sobrescribe."
   ],
   [
    "¿Puede una clase abstracta tener un constructor?",
    "Sí. No puede instanciarse directamente, pero su constructor se ejecuta cuando se crea un objeto de una subclase."
   ]
  ]
 },
 {
  "t": "Records: components, canonical and compact constructors, accessors, equals/toString",
  "tt": "Records: componentes, constructores canónico y compacto, accesores, equals/toString",
  "body": [
   "Un record es un tipo especial de clase diseñado para transportar datos inmutables. La declaración `record Point(int x, int y) {}` lista los componentes en su encabezado, y a partir de eso el compilador genera un campo `private final` para cada componente, un constructor canónico que recibe todos los componentes en orden, un método accesor para cada componente llamado exactamente igual (`x()` y `y()`, no `getX()`) e implementaciones de `equals`, `hashCode` y `toString` basadas en todos los componentes.",
   "Los records tienen reglas estructurales fijas. Un record es implícitamente `final`, así que nada puede extenderlo, e implícitamente extiende `java.lang.Record`, así que no puede extender nada más; sí puede implementar interfaces. No puedes declarar campos de instancia adicionales en el cuerpo, aunque se permiten campos `static`, métodos estáticos, métodos de instancia y tipos anidados. Los campos generados son final, así que los records son superficialmente inmutables: un componente `List` todavía puede modificarse a menos que lo copies.",
   "El constructor canónico puede escribirse completo con todos los parámetros, y en ese caso debes asignar tú mismo cada campo. Lo más común es escribir un constructor compacto, que no tiene lista de parámetros: `record Point(int x, int y) { Point { if (x < 0) throw new IllegalArgumentException(); } }`. Dentro de un constructor compacto, los parámetros están en alcance y puedes reasignarlos (por ejemplo, para normalizar o copiar un valor), y los campos se asignan automáticamente al final. No puedes asignar los campos directamente con `this.x = ...` en un constructor compacto; eso es un error de compilación.",
   "Puedes agregar otros constructores, pero cada uno debe empezar con (o, en Java 25, llegar después de un prólogo a) una llamada a otro constructor usando `this(...)`, delegando finalmente en el constructor canónico. Los records no pueden llamar a `super(...)`. También puedes sobrescribir un accesor, que debe ser `public` y tener el mismo tipo de retorno, o sobrescribir `toString`, `equals` o `hashCode`.",
   "```java\nrecord Range(int low, int high) {\n    Range {                          // constructor canónico compacto\n        if (low > high) {\n            int tmp = low; low = high; high = tmp;  // reasignar parámetros\n        }\n    }\n    Range(int single) { this(single, single); }\n    int size() { return high - low; }\n}\nvar r = new Range(9, 3);\nSystem.out.println(r);               // Range[low=3, high=9]\nSystem.out.println(r.low());         // 3\nSystem.out.println(r.equals(new Range(3, 9)));  // true\n```",
   "El `toString` generado imprime el nombre del record seguido de cada componente y su valor entre corchetes, como `Range[low=3, high=9]`. El `equals` generado devuelve true cuando el otro objeto es del mismo tipo de record y todos los componentes son iguales, así que dos records creados por separado con los mismos valores son iguales, lo que convierte a los records en claves confiables en un `HashMap` o `HashSet`.",
   "Los records también combinan de forma natural con el pattern matching: un patrón de record como `case Range(var lo, var hi)` descompone un record usando sus accesores, que es una de las razones por las que son centrales en el Java moderno."
  ],
  "terms": [
   [
    "Record component (componente de record)",
    "Un nombre y un tipo en el encabezado de un record; cada uno se convierte en un campo private final y un accesor public."
   ],
   [
    "Canonical constructor (constructor canónico)",
    "El constructor cuyos parámetros coinciden en orden con los componentes del record y que asigna cada campo."
   ],
   [
    "Compact constructor (constructor compacto)",
    "Un constructor canónico escrito sin lista de parámetros, usado para validar o normalizar parámetros antes de que los campos se asignen automáticamente."
   ],
   [
    "Accessor method (método accesor)",
    "El método generado con el nombre de un componente, como x(), que devuelve su valor."
   ]
  ],
  "example": "Un servicio de pedidos usa `record Money(long cents, String currency)` para los montos. Su constructor compacto rechaza las monedas null y pasa el código a mayúsculas, así que cada objeto Money del sistema es válido, y dos objetos Money del mismo monto se comparan como iguales en las pruebas.",
  "tip": "Los accesores de un record se llaman como los componentes (name(), no getName()). En un constructor compacto, reasigna los parámetros, nunca this.campo, y nunca declares una lista de parámetros.",
  "check": [
   [
    "¿Puede un record declarar un campo de instancia private en su cuerpo?",
    "No. Solo los componentes se convierten en campos de instancia; el cuerpo puede agregar campos estáticos pero no campos de instancia."
   ],
   [
    "¿Qué imprime `System.out.println(new Point(1, 2));` para `record Point(int x, int y)`?",
    "Point[x=1, y=2]."
   ],
   [
    "¿Puede un record extender otra clase?",
    "No. Extiende implícitamente java.lang.Record, pero puede implementar interfaces."
   ]
  ]
 },
 {
  "t": "Sealed classes and interfaces: permits, final, sealed and non-sealed subclasses",
  "tt": "Clases e interfaces sealed: permits y subclases final, sealed y non-sealed",
  "body": [
   "Una clase o interfaz sellada (sealed) restringe qué otras clases o interfaces pueden extenderla o implementarla directamente. La herencia ordinaria es abierta: cualquiera puede heredar de una clase que no es final. `final` la cierra por completo. El sellado está en medio: nombras el conjunto exacto de subtipos directos permitidos. Esto te permite modelar un conjunto cerrado de alternativas, como las figuras que admite una herramienta de dibujo, y permite que el compilador verifique que un switch cubra todos los casos.",
   "Se declara con el modificador `sealed` y una cláusula `permits` que lista los subtipos directos permitidos: `public sealed class Shape permits Circle, Square, Polygon {}`. La cláusula `permits` puede omitirse cuando todas las subclases permitidas están declaradas en el mismo archivo fuente; el compilador las infiere entonces. Una interfaz sellada funciona igual, y sus subtipos permitidos pueden ser clases, records, enums u otras interfaces.",
   "Toda subclase directa permitida debe indicar cómo continúa la jerarquía, usando exactamente uno de tres modificadores. `final` significa que no hay más subclases. `sealed` significa que restringe sus propias subclases con su propia cláusula `permits`. `non-sealed` reabre la jerarquía desde ese punto, así que cualquier clase puede extenderla. Omitir el modificador es un error de compilación. Los records y los enums son implícitamente final (los enums son implícitamente sealed o final), así que cumplen la regla sin modificador, y por eso son tan comunes las interfaces selladas con implementaciones record.",
   "También hay reglas de ubicación. Una subclase permitida debe extender directamente la clase sellada y debe ser accesible para ella. Si el código está en un módulo con nombre, la clase sellada y sus subclases permitidas deben estar en el mismo módulo; si está en el módulo sin nombre (código ordinario en el classpath), deben estar en el mismo paquete. Una clase listada en `permits` que en realidad no extiende la clase sellada es un error de compilación, igual que una clase que extiende una clase sellada sin estar listada.",
   "```java\npublic sealed interface Payment permits Card, BankTransfer, Voucher {}\n\npublic record Card(String number) implements Payment {}      // implícitamente final\npublic final class BankTransfer implements Payment {}\npublic non-sealed class Voucher implements Payment {}        // abierta de nuevo\nclass GiftVoucher extends Voucher {}                         // permitido\n\nstatic String fee(Payment p) {\n    return switch (p) {           // exhaustivo: todos los subtipos permitidos\n        case Card c -> \"2%\";\n        case BankTransfer b -> \"flat\";\n        case Voucher v -> \"none\";\n    };\n}\n```",
   "El compilador usa el sellado para la exhaustividad. Como `Payment` tiene exactamente tres subtipos permitidos, un switch sobre él con un case para cada uno no necesita `default`. Observa que `case Voucher v` también cubre `GiftVoucher`, ya que es una subclase de `Voucher`. `non-sealed` es una palabra clave contextual con guion, la única palabra clave con guion en Java.",
   "El sellado trata de quién puede heredar; no afecta a quién puede usar el tipo. Una clase sellada puede seguir siendo abstracta o concreta, y una clase sellada puede instanciarse si no es abstracta. Piensa en ello como una declaración de diseño: \"estos son todos los tipos que existen\"."
  ],
  "terms": [
   [
    "Sealed class (clase sellada)",
    "Una clase o interfaz que permite solo los subtipos directos nombrados en su cláusula permits (o en el mismo archivo)."
   ],
   [
    "permits clause (cláusula permits)",
    "La lista de clases o interfaces que pueden extender o implementar directamente un tipo sellado."
   ],
   [
    "non-sealed",
    "Un modificador para una subclase permitida que reabre la jerarquía para que cualquier clase pueda extenderla."
   ],
   [
    "Exhaustive hierarchy (jerarquía exhaustiva)",
    "Un conjunto cerrado de subtipos que permite al compilador verificar que un switch maneje todos los casos."
   ]
  ],
  "example": "Una API bancaria modela los eventos de cuenta como `sealed interface Event permits Deposit, Withdrawal, Fee`, cada uno un record. El código de reportes hace switch sobre Event sin default, y el día que alguien agrega `Interest` a la lista permits, el compilador muestra cada reporte que debe manejarlo.",
  "tip": "Toda subclase permitida necesita exactamente uno de final, sealed o non-sealed, a menos que sea un record o un enum, que son implícitamente final. El código del módulo sin nombre debe mantenerlas en el mismo paquete.",
  "check": [
   [
    "¿Qué ocurre si una clase listada en `permits` se declara `class Circle extends Shape {}` sin modificador?",
    "Error de compilación. Una subclase permitida debe declararse final, sealed o non-sealed."
   ],
   [
    "¿Cuándo puede omitirse la cláusula `permits`?",
    "Cuando todas las subclases permitidas están declaradas en el mismo archivo fuente que el tipo sellado."
   ],
   [
    "¿Puede un record implementar una interfaz sellada sin modificadores adicionales?",
    "Sí. Los records son implícitamente final, lo que cumple el requisito."
   ]
  ]
 },
 {
  "t": "Enums with fields, constructors, methods and values()/valueOf()/ordinal()",
  "tt": "Enums con campos, constructores, métodos y values()/valueOf()/ordinal()",
  "body": [
   "Un enum es una clase con un conjunto fijo de instancias con nombre. `enum Size { SMALL, MEDIUM, LARGE }` crea exactamente tres objetos `Size`, y ningún código puede crear más, porque los constructores de un enum siempre son private (implícitamente, si no escribes modificador; escribir `public` o `protected` es un error de compilación). Cada constante es un campo `public static final`, así que te refieres a ellas como `Size.SMALL`, y como solo hay una instancia de cada una, comparar enums con `==` es seguro.",
   "Todo enum extiende implícitamente `java.lang.Enum`, así que no puede extender otra clase, aunque sí puede implementar interfaces. Recibe métodos útiles gratis. `values()` es un método estático que devuelve un arreglo nuevo con todas las constantes en orden de declaración. `valueOf(String)` devuelve la constante con exactamente ese nombre y lanza `IllegalArgumentException` si ninguna coincide; la coincidencia distingue mayúsculas de minúsculas, así que `Size.valueOf(\"small\")` falla. `name()` devuelve el nombre de la constante, `ordinal()` devuelve su posición empezando en cero, y `compareTo` ordena las constantes por ordinal. El `toString` por defecto devuelve el nombre.",
   "Los enums pueden tener campos, constructores y métodos como cualquier clase. La lista de constantes debe ir primero en el cuerpo, y si algo la sigue, la lista debe terminar con punto y coma. Cada constante puede pasar argumentos al constructor entre paréntesis. El constructor se ejecuta una vez por constante, cuando se inicializa la clase enum, no cuando usas una constante.",
   "```java\nenum Planet {\n    MERCURY(3.303e23), EARTH(5.976e24);   // aquí se requiere punto y coma\n\n    private final double mass;\n    Planet(double mass) {                    // implícitamente private\n        this.mass = mass;\n        System.out.print(\"init \");\n    }\n    double mass() { return mass; }\n}\nSystem.out.println(Planet.EARTH.mass());    // init init 5.976E24\nSystem.out.println(Planet.EARTH.ordinal()); // 1\nSystem.out.println(Planet.valueOf(\"MERCURY\")); // MERCURY\n```",
   "Las constantes también pueden tener sus propios cuerpos de clase. Si el enum declara un método abstracto, cada constante debe proporcionar un cuerpo que lo implemente, como en `PLUS { int apply(int a, int b) { return a + b; } }`. Si el método no es abstracto, las constantes pueden sobrescribirlo de forma selectiva. Esta es una alternativa limpia a un switch dentro del enum.",
   "Los enums funcionan bien con `switch`. En un switch clásico o una expresión switch sobre una variable enum, las etiquetas case suelen ser solo los nombres de las constantes (`case SMALL ->`). Una expresión switch que lista cada constante es exhaustiva y no necesita `default`. Los enums también tienen colecciones especializadas, `EnumSet` y `EnumMap`, que son compactas y mantienen el orden de declaración.",
   "Evita guardar ordinales en archivos o bases de datos: reordenar o insertar constantes los cambia. Guarda el nombre en su lugar y reconstruye la constante con `valueOf` al leerla de vuelta."
  ],
  "terms": [
   [
    "Enum",
    "Una clase especial con un conjunto fijo de instancias con nombre declaradas al inicio de su cuerpo."
   ],
   [
    "values()",
    "Un método estático generado que devuelve un arreglo con todas las constantes del enum en orden de declaración."
   ],
   [
    "valueOf(String)",
    "Devuelve la constante con el nombre exacto dado, o lanza IllegalArgumentException."
   ],
   [
    "ordinal()",
    "La posición, empezando en cero, de una constante en su declaración."
   ]
  ],
  "example": "Una app de cafetería define `enum CupSize { SMALL(250), MEDIUM(350), LARGE(450) }` con un campo para los mililitros. La pantalla de pedidos recorre CupSize.values() para construir sus botones, y la calculadora de precios lee los mililitros de cada constante en lugar de usar una tabla de búsqueda aparte.",
  "tip": "Los constructores de enum son private y se ejecutan una vez por constante al inicializar la clase. valueOf distingue mayúsculas de minúsculas y lanza IllegalArgumentException, y la lista de constantes necesita punto y coma cuando le siguen miembros.",
  "check": [
   [
    "¿Qué hace `Size.valueOf(\"Medium\")` si la constante es `MEDIUM`?",
    "Lanza IllegalArgumentException, porque valueOf compara los nombres exactamente y distingue mayúsculas de minúsculas."
   ],
   [
    "¿Puedes crear una instancia de enum con `new Size()`?",
    "No. Los constructores de enum son private y el compilador prohíbe instanciar enums."
   ],
   [
    "¿Cuánto vale `Size.LARGE.ordinal()` para `enum Size { SMALL, MEDIUM, LARGE }`?",
    "2, porque los ordinales empiezan en 0."
   ]
  ]
 },
 {
  "t": "Nested, inner, local and anonymous classes",
  "tt": "Clases anidadas, internas, locales y anónimas",
  "body": [
   "Java te permite declarar una clase dentro de otra clase o incluso dentro de un método. Estas clases anidadas mantienen los tipos auxiliares cerca de donde se usan y pueden acceder a los miembros private de la clase que las contiene. Hay cuatro tipos, y el examen evalúa cómo se crea cada uno y a qué puede acceder.",
   "Una clase anidada estática (static nested class) se declara con `static` dentro de otra clase. Se comporta como una clase de nivel superior que casualmente vive en el espacio de nombres de la clase externa, y no tiene vínculo con ningún objeto externo, así que solo puede acceder directamente a los miembros estáticos de la clase externa. La creas con `new Outer.Nested()`. Los builders y los tipos auxiliares pequeños suelen escribirse así.",
   "Una clase interna (inner class, una clase miembro sin `static`) está ligada a una instancia de la clase externa. Cada objeto interno guarda una referencia oculta a su objeto externo, así que puede leer los campos del objeto externo, incluidos los private. Para crear una desde fuera necesitas una instancia externa: `Outer o = new Outer(); Outer.Inner i = o.new Inner();`. Dentro de los métodos de instancia de la clase externa, `new Inner()` funciona porque `this` está disponible. Si una clase interna tiene un campo con el mismo nombre que la clase externa, `Outer.this.name` llega al externo. Desde Java 16, las clases internas también pueden declarar miembros estáticos.",
   "Una clase local se declara dentro de un método o bloque y solo es visible ahí. Una clase anónima es una clase local sin nombre, declarada e instanciada en una sola expresión, normalmente para implementar una interfaz o extender una clase en el momento: `Runnable r = new Runnable() { public void run() { ... } };`. Observa el punto y coma después de la llave de cierre, porque todo es una expresión dentro de una sentencia. Una clase anónima puede extender una clase o implementar una interfaz, no ambas, y no puede tener constructor, aunque sí puede tener un inicializador de instancia.",
   "Las clases locales y anónimas (y las lambdas) pueden usar variables locales y parámetros del método que las contiene solo si son final o efectivamente final, es decir, si nunca se reasignan después de inicializarse. Reasignar una variable así en cualquier parte del método, incluso después de la declaración de la clase, hace que la captura sea un error de compilación.",
   "```java\npublic class Outer {\n    private int x = 10;\n    static class Nested { int get() { return 1; } }\n    class Inner { int get() { return x; } }       // usa un campo externo\n\n    void demo() {\n        int y = 5;                                  // efectivamente final\n        class Local { int get() { return x + y; } }\n        Runnable anon = new Runnable() {\n            public void run() { System.out.println(y); }\n        };\n        // y++;  // haría que y no sea efectivamente final: error de compilación arriba\n    }\n}\nOuter.Nested n = new Outer.Nested();\nOuter.Inner i = new Outer().new Inner();\n```",
   "Modificadores de acceso: las clases miembro (anidadas estáticas e internas) pueden ser `public`, `protected`, de paquete o `private`, como cualquier miembro. Las clases locales y anónimas no tienen ningún modificador de acceso, ya que solo son visibles dentro de su bloque."
  ],
  "terms": [
   [
    "Static nested class (clase anidada estática)",
    "Una clase declarada static dentro de otra clase; no necesita una instancia externa y se crea con new Outer.Nested()."
   ],
   [
    "Inner class (clase interna)",
    "Una clase miembro no estática cuyas instancias están ligadas a una instancia externa y pueden acceder a sus miembros."
   ],
   [
    "Anonymous class (clase anónima)",
    "Una clase sin nombre declarada e instanciada en una sola expresión, que extiende una clase o implementa una interfaz."
   ],
   [
    "Effectively final (efectivamente final)",
    "Una variable local que nunca se reasigna después de inicializarse, lo que permite usarla desde clases locales y lambdas."
   ]
  ],
  "example": "Una implementación de `LinkedList` mantiene su tipo `Node` como clase anidada estática private, ya que los nodos no necesitan una referencia a la lista, y su iterador como clase interna private, ya que el iterador debe leer la cabeza de la lista y su contador de modificaciones.",
  "tip": "Crear una clase interna desde fuera necesita un objeto externo: outer.new Inner(). Una clase anidada estática usa new Outer.Nested(). Las variables locales capturadas deben ser efectivamente final.",
  "check": [
   [
    "¿Cómo creas un objeto `Inner` desde un método estático cuando Inner es un miembro no estático de Outer?",
    "Con una instancia externa: new Outer().new Inner(), u outerRef.new Inner()."
   ],
   [
    "¿Puede una clase anónima extender una clase e implementar una interfaz a la vez?",
    "No. Puede extender exactamente una clase o implementar exactamente una interfaz."
   ],
   [
    "¿Puede una clase local leer una variable del método que se reasigna más adelante en el método?",
    "No. Las variables locales capturadas deben ser final o efectivamente final."
   ]
  ]
 },
 {
  "t": "Instanceof pattern matching and flow scoping",
  "tt": "Pattern matching con instanceof y alcance por flujo",
  "body": [
   "El operador `instanceof` comprueba si un objeto es una instancia de un tipo. Antes del pattern matching, una comprobación solía ir seguida de un cast: `if (obj instanceof String) { String s = (String) obj; ... }`. El pattern matching combina la comprobación, el cast y la declaración de la variable: `if (obj instanceof String s) { ... }`. Si la comprobación tiene éxito, `s` es una variable `String` lista para usar. Si `obj` es `null`, `instanceof` es `false` y no se enlaza nada.",
   "La variable que introduce un patrón es una variable de patrón (pattern variable), y su alcance sigue el alcance por flujo (flow scoping): está en alcance solo donde el compilador puede demostrar que el patrón coincidió. En `if (o instanceof String s) { ... } else { ... }`, `s` puede usarse en el bloque `if` y no en el bloque `else`. También puedes usarla más adelante en la misma condición, después de `&&`: `if (o instanceof String s && s.length() > 3)` está bien, porque el lado derecho solo se ejecuta cuando el lado izquierdo es true.",
   "Con `||` la lógica se invierte. `if (o instanceof String s || s.isEmpty())` no compila, porque el lado derecho se ejecuta exactamente cuando la coincidencia falló, así que `s` no estaría asignada. La negación funciona al revés: en `if (!(o instanceof String s)) { return; }`, la variable de patrón no está en alcance dentro del bloque, pero sí lo está después del `if` durante el resto del método, porque la única forma de llegar ahí es que el patrón haya coincidido.",
   "```java\nstatic int len(Object o) {\n    if (!(o instanceof String s)) {\n        return -1;              // s no está en alcance aquí\n    }\n    return s.length();          // s en alcance: el patrón debe haber coincidido\n}\n\nObject x = \"hello\";\nif (x instanceof String t && t.startsWith(\"h\")) {\n    System.out.println(t.toUpperCase()); // HELLO\n}\n// if (x instanceof String u || u.isEmpty()) {}  // no compila\n```",
   "Algunas reglas más aparecen en el examen. Una variable de patrón no puede tener el mismo nombre que una variable local que ya esté en alcance, así que `String s = \"\"; if (o instanceof String s)` es un error de compilación. Las variables de patrón no son implícitamente final, así que pueden reasignarse, aunque rara vez es buen estilo. El tipo en `instanceof` debe ser compatible con el tipo de la expresión: `Integer i = 5; if (i instanceof String s)` no compila, porque un `Integer` nunca puede ser un `String`.",
   "Los patrones de record también funcionan con `instanceof`: `if (obj instanceof Point(int x, int y))` comprueba el tipo y enlaza los componentes en un solo paso. Un patrón de record no coincide con `null`.",
   "El alcance por flujo es la misma idea que usa el pattern matching en `switch`, y elimina toda una categoría de errores `ClassCastException`, porque el cast ya no puede alejarse de la comprobación que lo protege."
  ],
  "terms": [
   [
    "Pattern matching for instanceof (pattern matching con instanceof)",
    "Una comprobación instanceof que además enlaza el valor a una nueva variable del tipo comprobado cuando coincide."
   ],
   [
    "Pattern variable (variable de patrón)",
    "La variable declarada por un patrón, como s en o instanceof String s."
   ],
   [
    "Flow scoping (alcance por flujo)",
    "La regla según la cual una variable de patrón está en alcance solo donde el compilador puede demostrar que la coincidencia tuvo éxito."
   ],
   [
    "Record pattern (patrón de record)",
    "Un patrón como Point(int x, int y) que comprueba un tipo record y enlaza sus componentes."
   ]
  ],
  "example": "Un método equals solía escribirse con instanceof y un cast en líneas separadas. Reescribirlo como `return o instanceof Money m && cents == m.cents && currency.equals(m.currency);` elimina el cast y mantiene toda la comprobación en una sola expresión legible.",
  "tip": "Después de &&, la variable de patrón puede usarse; después de ||, no. Con una comprobación negada que hace return o throw, la variable está en alcance después de la sentencia if.",
  "check": [
   [
    "¿Está `s` en alcance en el bloque else de `if (o instanceof String s) { } else { }`?",
    "No. En el bloque else la coincidencia falló, así que s no ha coincidido de forma definitiva."
   ],
   [
    "¿A qué se evalúa `null instanceof String s`?",
    "false. instanceof nunca coincide con null, así que no se enlaza ninguna variable."
   ],
   [
    "¿Por qué no compila `if (o instanceof String s || s.length() > 0)`?",
    "El lado derecho de || se ejecuta solo cuando la coincidencia falló, así que s no está en alcance ahí."
   ]
  ]
 },
 {
  "t": "Encapsulation, immutable objects and var local type inference",
  "tt": "Encapsulamiento, objetos inmutables e inferencia de tipos locales con var",
  "body": [
   "Encapsulamiento significa ocultar el estado interno de un objeto y exponerlo solo mediante métodos que tú controlas. En la práctica haces que los campos sean `private` y proporcionas métodos como getters y setters o, mejor aún, operaciones con significado como `deposit(amount)`. Como quienes llaman no pueden llegar directamente a los campos, la clase puede validar los cambios, mantener sus invariantes y cambiar su representación interna más adelante sin romper otro código.",
   "Java tiene cuatro niveles de acceso. Los miembros `private` son visibles solo dentro de la clase (incluidas sus clases anidadas). El acceso de paquete (package-private), el valor por defecto cuando no escribes modificador, significa visible para las clases del mismo paquete. `protected` agrega acceso desde subclases de otros paquetes, a través de la herencia. `public` significa visible en todas partes. Las clases encapsuladas usan el nivel más restringido que funcione.",
   "Un objeto inmutable no puede cambiar después de su construcción. La receta habitual es: hacer la clase `final` (o darle solo constructores private) para que las subclases no puedan agregar comportamiento mutable; hacer todos los campos `private final`; no proporcionar setters; inicializar todo en el constructor; y hacer copias defensivas de las entradas y salidas mutables, como listas y arreglos, para que quienes llaman no puedan cambiar tu estado mediante una referencia compartida. `String`, las clases envoltorio y las clases de `java.time` son inmutables, y los records te dan la mayor parte de esto automáticamente, salvo las copias defensivas.",
   "```java\npublic final class Team {\n    private final String name;\n    private final List<String> members;\n\n    public Team(String name, List<String> members) {\n        this.name = name;\n        this.members = List.copyOf(members);   // copia defensiva\n    }\n    public String name() { return name; }\n    public List<String> members() { return members; } // ya es no modificable\n}\n```",
   "La inferencia de tipos de variables locales con `var` permite que el compilador deduzca el tipo de una variable local a partir de su inicializador: `var list = new ArrayList<String>();` hace que `list` sea un `ArrayList<String>`. El tipo sigue siendo estático y fijo en tiempo de compilación; `var` no es tipado dinámico, así que asignar después un valor de otro tipo es un error.",
   "`var` tiene reglas estrictas. Solo puede usarse para variables locales (incluidas las de bucles `for`, bucles `for` mejorados y try-with-resources) y parámetros de lambda. No puede usarse para campos, parámetros de métodos ni tipos de retorno. Necesita un inicializador en la misma línea, y el inicializador no puede ser solo `null`, un inicializador de arreglo como `{1, 2}` ni una lambda sin tipo destino. No puedes declarar varias variables en una sola sentencia `var` (`var a = 1, b = 2;` falla). `var` es un nombre de tipo reservado, no una palabra clave, así que todavía puede ser nombre de variable o de método, pero no nombre de clase.",
   "Cuidado con los tipos inferidos que te sorprenden: `var n = 10;` es un `int`, así que `n = 3.5;` falla; `var list = new ArrayList<>();` infiere `ArrayList<Object>`; y `var c = 'a' + 1;` es un `int`. Usa `var` cuando el tipo sea obvio por el lado derecho, y escribe el tipo explícitamente cuando ayude a quien lee."
  ],
  "terms": [
   [
    "Encapsulation (encapsulamiento)",
    "Mantener los campos private y controlar el acceso al estado de un objeto mediante métodos."
   ],
   [
    "Immutable object (objeto inmutable)",
    "Un objeto cuyo estado no puede cambiar después de su construcción, como un String o un record bien diseñado."
   ],
   [
    "Defensive copy (copia defensiva)",
    "Una copia de una entrada o salida mutable que impide que código externo cambie el estado interno de un objeto."
   ],
   [
    "var",
    "Un nombre de tipo reservado que hace que el compilador infiera el tipo de una variable local a partir de su inicializador."
   ]
  ],
  "example": "Una clase `Schedule` devolvía su `ArrayList` interno de reuniones desde un getter, y alguien que lo llamaba lo vació por accidente, borrando el calendario. Devolver `List.copyOf(meetings)` en su lugar, y guardar una copia en el constructor, hizo que la clase fuera inmutable desde fuera.",
  "tip": "Para var, revisa en cada línea: uso en un campo o parámetro, falta de inicializador, un inicializador null o {arreglo}, o varias variables en una declaración. Cada uno es un error de compilación.",
  "check": [
   [
    "¿Compila `var x;` seguido de `x = 5;`?",
    "No. var requiere un inicializador en la declaración para poder inferir el tipo."
   ],
   [
    "¿Por qué una clase inmutable debe copiar un `List` pasado a su constructor?",
    "Porque de lo contrario quien llama conserva una referencia a la misma lista y puede cambiar el estado del objeto después de su construcción."
   ],
   [
    "¿Puede usarse `var` como tipo de un campo de instancia?",
    "No. var es solo para variables locales y parámetros de lambda."
   ]
  ]
 },
 {
  "t": "Object lifecycle and garbage collection eligibility",
  "tt": "Ciclo de vida de los objetos y elegibilidad para la recolección de basura",
  "body": [
   "En Java los objetos se crean en el heap, normalmente con `new`, y viven mientras se necesiten. Nunca liberas la memoria tú mismo. En su lugar, el recolector de basura (garbage collector, GC), parte de la Java Virtual Machine (JVM), encuentra los objetos que el programa ya no puede alcanzar y recupera su memoria. Las variables, en cambio, contienen valores primitivos o referencias a objetos; las variables locales viven en la pila (stack) mientras su método se ejecuta.",
   "Un objeto se vuelve elegible para la recolección de basura cuando ningún hilo vivo puede alcanzarlo a través de ninguna cadena de referencias que parta de una raíz del GC. Las raíces incluyen las variables locales de los métodos en ejecución, los campos estáticos y los hilos activos. Las formas comunes en que un objeto pierde su última referencia son: la variable se pone en `null`, la variable se reasigna a otro objeto, o la variable sale de alcance cuando termina su método o bloque.",
   "Elegible no significa recolectado. La JVM decide cuándo ejecutar el recolector, y si lo hace. `System.gc()` es solo una petición que la JVM puede ignorar, así que ninguna respuesta del examen puede depender de ella. Por eso las preguntas preguntan \"cuántos objetos son elegibles\" en una línea dada, no cuántos se han recolectado. Los objetos que solo se referencian entre sí, sin un camino desde una raíz, también son elegibles; a esto a veces se le llama isla de aislamiento. El GC de Java maneja los ciclos, a diferencia del simple conteo de referencias.",
   "```java\npublic class Demo {\n    public static void main(String[] args) {\n        String a = new String(\"A\");   // objeto 1\n        String b = new String(\"B\");   // objeto 2\n        a = b;                        // el objeto 1 ahora es inalcanzable\n        String c = new String(\"C\");   // objeto 3\n        b = null;                     // el objeto 2 sigue referenciado por a\n        c = a;                        // el objeto 3 ahora es inalcanzable\n        // Línea X: los objetos 1 y 3 son elegibles; el objeto 2 es alcanzable vía a y c\n    }\n}\n```",
   "Rastrea este tipo de preguntas dibujando cajas para los objetos y flechas para las referencias, y actualizando las flechas línea por línea. En la línea que se pregunta, cuenta las cajas que no tienen ninguna flecha entrante desde una variable viva o desde otro objeto alcanzable. Ten cuidado con los literales de cadena: los literales viven en el string pool y no son el tipo de objetos que cuentan estas preguntas, por eso el código del examen usa `new String(...)` o clases propias.",
   "El método `Object.finalize()` estaba pensado para ejecutarse antes de la recolección, pero está obsoleto (deprecated) para su eliminación y nunca deberías depender de él; no hay garantía de que se ejecute. Para liberar recursos como archivos y sockets, usa try-with-resources y `close()`, que se ejecutan en un momento predecible.",
   "En la práctica, las fugas de memoria en Java vienen de referencias que se conservan por accidente, como objetos agregados a una colección estática y nunca eliminados. El GC no puede recolectar lo que todavía es alcanzable."
  ],
  "terms": [
   [
    "Garbage collector (recolector de basura)",
    "El componente de la JVM que recupera automáticamente la memoria usada por objetos inalcanzables."
   ],
   [
    "Eligible for garbage collection (elegible para recolección)",
    "Un objeto que ningún hilo vivo puede alcanzar desde ninguna raíz del GC; puede recolectarse en cualquier momento posterior o nunca."
   ],
   [
    "GC root (raíz del GC)",
    "Un punto de partida para la alcanzabilidad, como una variable local en un método activo o un campo estático."
   ],
   [
    "Island of isolation (isla de aislamiento)",
    "Un grupo de objetos que se referencian entre sí pero no pueden alcanzarse desde ninguna raíz, así que todos son elegibles."
   ]
  ],
  "example": "Una aplicación web guarda en caché cada sesión de usuario en un HashMap estático y nunca elimina entradas. Incluso después de que los usuarios cierran sesión, las sesiones siguen siendo alcanzables a través del campo estático, así que nunca son elegibles para recolección y el servidor se queda poco a poco sin memoria. Eliminar las entradas al cerrar sesión lo soluciona.",
  "tip": "Cuenta objetos alcanzables, no variables. Dibuja las referencias en papel línea por línea, y recuerda que System.gc() no garantiza nada.",
  "check": [
   [
    "¿Llamar a `System.gc()` garantiza que los objetos elegibles se recolecten?",
    "No. Es solo una sugerencia; la JVM decide cuándo ocurre la recolección."
   ],
   [
    "Si los objetos A y B se referencian entre sí pero nada más los referencia, ¿son elegibles?",
    "Sí. Ninguno puede alcanzarse desde una raíz del GC, así que ambos son elegibles a pesar del ciclo."
   ],
   [
    "¿Cuándo se vuelve elegible un objeto local creado en un método si ninguna referencia escapa?",
    "Cuando el método retorna y su variable local sale de alcance, o antes si la variable se reasigna o se pone en null."
   ]
  ]
 },
 {
  "t": "Checked vs unchecked exceptions and the Throwable hierarchy",
  "tt": "Excepciones checked vs unchecked y la jerarquía de Throwable",
  "body": [
   "Una excepción es un objeto que indica que ocurrió algo inesperado, y lanzarla interrumpe el flujo normal del programa hasta que algún código la atrapa. Todas las excepciones y errores de Java descienden de `java.lang.Throwable`. Tiene dos subclases directas: `Error`, para problemas graves en la JVM o el entorno que las aplicaciones normalmente no deberían intentar manejar, como `OutOfMemoryError` y `StackOverflowError`; y `Exception`, para condiciones que un programa podría manejar razonablemente. `RuntimeException` es una subclase de `Exception`.",
   "Java las divide en excepciones checked (comprobadas) y unchecked (no comprobadas). Las unchecked son `RuntimeException`, `Error` y todas sus subclases. Las checked son todas las demás subclases de `Exception` (y el propio `Throwable`). El compilador impone la diferencia mediante la regla de manejar o declarar (handle-or-declare): si el código puede lanzar una excepción checked, el método debe atraparla o declararla con `throws` en su firma. Las excepciones unchecked no tienen ese requisito.",
   "La idea es que las excepciones checked representan problemas fuera del control de tu código para los que quien llama debería prepararse, como un archivo inexistente (`IOException`, `FileNotFoundException`) o un fallo de análisis. Las excepciones unchecked suelen representar errores de programación que deberían corregirse en lugar de atraparse, como `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ClassCastException`, `ArithmeticException` e `IllegalArgumentException` (con su subclase `NumberFormatException`). `IllegalStateException` también es unchecked.",
   "```java\nvoid read(Path p) throws IOException {      // declara la excepción checked\n    Files.readString(p);                      // puede lanzar IOException\n}\nvoid safe(Path p) {\n    try {\n        read(p);\n    } catch (IOException e) {               // la maneja\n        System.out.println(\"missing: \" + e.getMessage());\n    }\n}\nvoid bug(String s) {\n    Integer.parseInt(s);  // NumberFormatException es unchecked: no requiere manejo\n}\n```",
   "Conoce quién suele lanzar qué. La JVM lanza `NullPointerException`, `ArithmeticException` (división entera entre cero), `ArrayIndexOutOfBoundsException`, `ClassCastException` y errores como `StackOverflowError`. El código de bibliotecas y los programadores lanzan `IllegalArgumentException`, `NumberFormatException`, `IOException` y otras con `throw new ...`. La palabra clave `throw` lanza un objeto de excepción; la palabra clave `throws` en el encabezado de un método declara lo que puede lanzarse.",
   "`Throwable` proporciona los métodos que usas para inspeccionar excepciones: `getMessage()` para el mensaje de detalle, `toString()` para el nombre de la clase más el mensaje, `printStackTrace()` para imprimir la pila de llamadas y `getCause()` para la excepción que causó esta. Esta última importa cuando el código envuelve una excepción de bajo nivel en una de más alto nivel.",
   "Cuando una pregunta pregunta si el código compila, encuentra cada llamada que pueda lanzar una excepción checked y asegúrate de que cada una esté dentro de un `try` que atrape ese tipo o un supertipo, o de que el método la declare. Las excepciones unchecked nunca causan estos errores de compilación."
  ],
  "terms": [
   [
    "Throwable",
    "La clase raíz de todo lo que puede lanzarse, con subclases directas Error y Exception."
   ],
   [
    "Checked exception (excepción comprobada)",
    "Una subclase de Exception, pero no de RuntimeException, que debe atraparse o declararse."
   ],
   [
    "Unchecked exception (excepción no comprobada)",
    "RuntimeException, Error o cualquiera de sus subclases, que el compilador no te obliga a manejar."
   ],
   [
    "Handle-or-declare rule (regla de manejar o declarar)",
    "El requisito del compilador de que el código que lanza una excepción checked la atrape o la liste en throws."
   ]
  ],
  "example": "Un generador de reportes lee un archivo de plantilla. Como `Files.readString` lanza la IOException checked, el compilador obliga al desarrollador a decidir qué debe pasar cuando falta el archivo, y el equipo elige atraparla y mostrar un mensaje claro en lugar de fallar con un stack trace.",
  "tip": "Memoriza la división: los subtipos de RuntimeException y Error son unchecked; toda otra Exception es checked. IOException y FileNotFoundException son checked; NumberFormatException es unchecked.",
  "check": [
   [
    "¿`NumberFormatException` es checked o unchecked?",
    "Unchecked. Extiende IllegalArgumentException, que extiende RuntimeException."
   ],
   [
    "¿Qué debe hacer un método si llama a código que lanza `IOException`?",
    "Atrapar IOException (o un supertipo) o declarar throws IOException (o un supertipo) en su firma."
   ],
   [
    "¿Es `StackOverflowError` una Exception?",
    "No. Es un Error, que es un Throwable pero no una Exception, y es unchecked."
   ]
  ]
 },
 {
  "t": "Try/catch/finally flow, including return in try and finally",
  "tt": "Flujo de try/catch/finally, incluido return en try y en finally",
  "body": [
   "Un bloque `try` contiene código que podría lanzar una excepción. Debe ir seguido de al menos un bloque `catch`, un bloque `finally` o ambos; un `try` solo no compila (try-with-resources es la única excepción, que veremos más adelante). Las llaves son obligatorias en cada bloque, incluso con una sola sentencia. Cuando se lanza una excepción en el `try`, se salta el resto del `try`, y Java revisa los bloques `catch` de arriba hacia abajo, ejecutando el primero cuyo tipo coincida. Si ninguno coincide, la excepción se propaga a quien llama después de que se ejecuta el `finally`.",
   "El bloque `finally` se ejecuta tanto si el `try` termina normalmente, como si un `catch` maneja una excepción o si una excepción escapa sin ser atrapada. Eso lo convierte en el lugar para la limpieza. Las únicas formas prácticas de saltarlo son que la JVM se detenga, por ejemplo con `System.exit()`, o que el hilo muera abruptamente.",
   "Los return interactúan con `finally` de una forma precisa. Si el `try` (o un `catch`) ejecuta `return expr;`, la expresión se evalúa primero y su valor se guarda. Luego se ejecuta el bloque `finally`, y después el método devuelve el valor guardado. Así que si `finally` cambia una variable local primitiva, el valor devuelto no cambia. Sin embargo, si el valor devuelto es una referencia a un objeto mutable, los cambios que `finally` haga en ese objeto son visibles para quien llama, porque el valor guardado es la referencia.",
   "Si el propio bloque `finally` ejecuta `return`, ese return gana: reemplaza el valor del `try` o del `catch`, y además descarta cualquier excepción que se estuviera propagando. Lo mismo ocurre si `finally` lanza una excepción nueva: la excepción original se pierde. Por eso hacer return o lanzar desde `finally` se considera una mala práctica, y por eso a las preguntas del examen les encanta.",
   "```java\nstatic int test() {\n    int x = 1;\n    try {\n        return x;          // se guarda el valor 1\n    } finally {\n        x = 99;            // no cambia el valor guardado\n        System.out.print(\"finally \");\n    }\n}\n// imprime: finally, y test() devuelve 1\n\nstatic int override() {\n    try {\n        throw new RuntimeException(\"boom\");\n    } finally {\n        return 42;         // excepción descartada, se devuelve 42\n    }\n}\n```",
   "Al rastrear la salida, sigue el camino exacto: sentencias del `try` hasta el throw, el `catch` que coincide, luego `finally`, y luego o bien el código después de toda la sentencia (si la excepción se manejó) o un salto a quien llama (si no). Si un bloque `catch` lanza una excepción nueva, `finally` se ejecuta igualmente antes de que esa nueva excepción se propague.",
   "Observa también el alcance: una variable declarada dentro del bloque `try` no es visible en `catch` ni en `finally`. Declárala antes del `try` si esos bloques la necesitan."
  ],
  "terms": [
   [
    "try block (bloque try)",
    "Un bloque que contiene código que podría lanzar excepciones, seguido de bloques catch y/o finally."
   ],
   [
    "catch block (bloque catch)",
    "Un manejador que se ejecuta cuando se lanza en el try una excepción de su tipo declarado (o de un subtipo)."
   ],
   [
    "finally block (bloque finally)",
    "Un bloque que se ejecuta después de try y catch pase lo que pase, a menos que la JVM termine."
   ],
   [
    "Exception propagation (propagación de excepciones)",
    "Una excepción no atrapada que sale del método actual y sube por la pila de llamadas hacia quien llama."
   ]
  ],
  "example": "Un método abre una transacción de base de datos en un bloque try y la marca como terminada en finally. Cuando un compañero agrega `return` dentro del finally para devolver un código de estado, los errores del bloque try empiezan a desaparecer de los logs, porque un return en finally descarta la excepción que se está propagando.",
  "tip": "El valor de retorno queda fijo cuando se ejecuta el return del try; finally se ejecuta después y solo puede reemplazarlo haciendo su propio return. Un return o throw en finally oculta cualquier excepción anterior.",
  "check": [
   [
    "¿Compila `try { } ` sin catch ni finally?",
    "No. Un try simple necesita al menos un catch o un bloque finally."
   ],
   [
    "Si try devuelve un int local y finally incrementa esa variable, ¿qué valor se devuelve?",
    "El valor original. Se evaluó y guardó antes de que se ejecutara finally."
   ],
   [
    "¿Qué le pasa a una excepción lanzada en try si finally ejecuta `return 0;`?",
    "Se descarta, y el método devuelve 0 normalmente."
   ]
  ]
 },
 {
  "t": "Multi-catch rules: no related types; the catch variable is effectively final",
  "tt": "Reglas del multi-catch: sin tipos relacionados; la variable del catch es efectivamente final",
  "body": [
   "Un bloque multi-catch maneja varios tipos de excepción con un solo manejador separándolos con una barra vertical: `catch (IOException | SQLException e)`. Elimina código duplicado en los manejadores cuando excepciones distintas necesitan la misma respuesta. Hay un solo nombre de variable para todo el bloque, colocado después del último tipo.",
   "La regla clave es que las alternativas de un multi-catch no pueden estar relacionadas por herencia. `catch (FileNotFoundException | IOException e)` no compila, porque `FileNotFoundException` es una subclase de `IOException` y la alternativa de la subclase es redundante; atrapar solo `IOException` ya la cubre. Lo mismo aplica a `RuntimeException | IllegalArgumentException`, o a `Exception | cualquier cosa`. Los tipos deben ser hermanos no relacionados o de ramas distintas de la jerarquía.",
   "El parámetro de un multi-catch es implícitamente `final`. Asignarle un valor, como en `e = new IOException();`, es un error de compilación. En un catch de un solo tipo el parámetro no es final, así que la reasignación compila ahí, aunque es mal estilo. Tampoco puedes declarar la variable dos veces (`catch (IOException e1 | SQLException e2)` es sintaxis inválida), y cada alternativa es solo un nombre de tipo.",
   "Dentro del bloque, el tipo estático de la variable es el supertipo común más cercano de las alternativas (técnicamente un tipo unión cuyos miembros están disponibles a través de su supertipo común). Así que en `catch (NumberFormatException | ArithmeticException e)` puedes llamar a métodos de `RuntimeException`, como `getMessage()`, pero no a métodos específicos de solo una de las alternativas sin un cast.",
   "```java\ntry {\n    String s = args[0];\n    int n = Integer.parseInt(s);\n    System.out.println(10 / n);\n} catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {\n    System.out.println(\"bad input: \" + e.getMessage());\n    // e = null;   // no compila: el parámetro del multi-catch es final\n} catch (ArithmeticException e) {\n    e = new ArithmeticException(\"changed\");  // legal en un catch simple\n    System.out.println(\"zero\");\n}\n```",
   "El multi-catch también afecta al relanzamiento. Si atrapas y relanzas la variable con `throw e;`, el compilador conoce el conjunto exacto de tipos que puede ser, así que el método solo necesita declarar esos tipos, no un supertipo amplio. El mismo relanzamiento preciso funciona con un catch simple de `Exception` cuando la variable es efectivamente final y nunca se reasigna.",
   "Las reglas de orden siguen aplicando entre bloques catch separados: un bloque multi-catch que incluye un tipo no debe ir después de un bloque que ya atrapa ese tipo o su supertipo, o será inalcanzable. La siguiente lección cubre ese orden en detalle."
  ],
  "terms": [
   [
    "Multi-catch",
    "Un bloque catch que lista varios tipos de excepción separados por |, compartiendo un manejador y una variable."
   ],
   [
    "Related types (tipos relacionados)",
    "Tipos de excepción donde uno es subclase de otro; no pueden aparecer ambos en el mismo multi-catch."
   ],
   [
    "Implicitly final parameter (parámetro implícitamente final)",
    "La variable del multi-catch, que no puede reasignarse dentro del bloque."
   ],
   [
    "Precise rethrow (relanzamiento preciso)",
    "Relanzar una variable de excepción atrapada y no modificada para que el método solo necesite declarar los tipos específicos que realmente pueden ocurrir."
   ]
  ],
  "example": "Un importador de archivos atrapa `IOException | DateTimeParseException e` en un solo bloque y escribe el mismo mensaje \"no se pudo importar la fila\" para ambas, en lugar de copiar el código de logging en dos manejadores que con el tiempo se irían diferenciando.",
  "tip": "En un multi-catch, revisa dos cosas: que ningún tipo de la lista sea subclase de otro, y que la variable nunca se asigne. Cualquiera de los dos errores es un error de compilación.",
  "check": [
   [
    "¿Compila `catch (IOException | Exception e)`?",
    "No. IOException es subclase de Exception, así que los tipos están relacionados."
   ],
   [
    "¿Puedes asignar un nuevo valor a `e` dentro de `catch (IOException | SQLException e)`?",
    "No. El parámetro del multi-catch es implícitamente final."
   ],
   [
    "¿Puedes reasignar `e` dentro de un `catch (IOException e)` de un solo tipo?",
    "Sí. El parámetro de un catch de un solo tipo no es final, aunque reasignarlo es mal estilo."
   ]
  ]
 },
 {
  "t": "Catch block ordering and unreachable catch compile errors",
  "tt": "Orden de los bloques catch y errores de compilación por catch inalcanzable",
  "body": [
   "Cuando se lanza una excepción, Java revisa los bloques `catch` en el orden en que aparecen y ejecuta el primero cuyo tipo coincida con la excepción o con uno de sus supertipos. Solo se ejecuta un bloque catch por excepción. Como un catch de un supertipo coincide con todos sus subtipos, el orden en que escribes los bloques catch le importa al compilador.",
   "Si un bloque catch de un supertipo va antes de un bloque catch de uno de sus subtipos, el bloque del subtipo nunca puede ejecutarse, y el compilador reporta un error de que la excepción \"has already been caught\" (ya fue atrapada). Así que debes ordenar los bloques catch del más específico al más general: `FileNotFoundException` antes de `IOException` antes de `Exception`. Dos bloques catch de tipos no relacionados pueden aparecer en cualquier orden. Atrapar exactamente el mismo tipo dos veces también es un error.",
   "```java\ntry {\n    Files.readString(Path.of(\"data.txt\"));\n} catch (NoSuchFileException e) {   // el más específico primero\n    System.out.println(\"missing\");\n} catch (IOException e) {\n    System.out.println(\"io problem\");\n} catch (Exception e) {\n    System.out.println(\"other\");\n}\n\n// No compila: IOException ya fue atrapada por Exception\n// try { ... } catch (Exception e) { } catch (IOException e) { }\n```",
   "Una segunda regla produce otro error de catch inalcanzable: no puedes atrapar una excepción checked que el bloque `try` no puede lanzar. Si el `try` contiene solo `System.out.println(\"hi\")`, entonces `catch (IOException e)` no compila, porque nada en el bloque declara ni lanza `IOException`. El compilador sabe qué excepciones checked declara cada llamada a método, así que puede demostrar que el manejador es código muerto.",
   "Esa regla no aplica a las excepciones unchecked ni a los tipos amplios. Siempre puedes atrapar `RuntimeException` o cualquiera de sus subclases, cualquier `Error`, y también `Exception` y `Throwable`, incluso cuando el bloque try está vacío, ya que esos tipos incluyen excepciones unchecked que cualquier código podría lanzar. Así que `try { } catch (Exception e) { }` compila mientras que `try { } catch (java.sql.SQLException e) { }` no.",
   "El multi-catch sigue la misma lógica. Un multi-catch que lista un tipo ya atrapado por un bloque anterior es un error, y una alternativa de multi-catch que es una excepción checked que el try no puede lanzar también es un error.",
   "Cuando una pregunta del examen tenga varios bloques catch, recórrelos en orden y pregunta para cada uno: ¿podría un bloque anterior atrapar ya todo lo que atrapa este? Y si su tipo es checked y específico, ¿puede algo en el try lanzarlo realmente? Un sí a la primera, o un no a la segunda, significa que el código no compila."
  ],
  "terms": [
   [
    "Catch order (orden de los catch)",
    "La secuencia de arriba hacia abajo en que se revisan los bloques catch; se ejecuta el primero que coincide."
   ],
   [
    "Unreachable catch block (bloque catch inalcanzable)",
    "Un manejador que el compilador demuestra que nunca puede ejecutarse, porque un bloque anterior atrapa su tipo o porque el try no puede lanzarlo."
   ],
   [
    "Most specific first (el más específico primero)",
    "La regla de escribir los manejadores de excepciones de subclases antes que los de superclases."
   ],
   [
    "Checked exception analysis (análisis de excepciones checked)",
    "El seguimiento que hace el compilador de qué excepciones checked puede lanzar un bloque try, según las cláusulas throws de los métodos y las sentencias throw."
   ]
  ],
  "example": "Un desarrollador agrega `catch (Exception e)` al principio de una cadena de manejadores existente para registrarlo todo, y la compilación falla porque los manejadores específicos de IOException y TimeoutException que están debajo ahora son inalcanzables. Mover el catch amplio al final restaura el manejo específico.",
  "tip": "Subclase antes que superclase, siempre. Y una excepción checked específica solo puede atraparse si algo en el try puede lanzarla; Exception, Throwable y los tipos unchecked siempre están permitidos.",
  "check": [
   [
    "¿Compila `catch (RuntimeException e) {} catch (IllegalArgumentException e) {}`?",
    "No. IllegalArgumentException es subclase de RuntimeException, así que el segundo bloque es inalcanzable."
   ],
   [
    "¿Puedes escribir `catch (IOException e)` después de un bloque try que solo hace aritmética?",
    "No. IOException es checked y nada en el try puede lanzarla, así que el catch es inalcanzable."
   ],
   [
    "¿Puedes escribir `catch (Exception e)` después de un bloque try vacío?",
    "Sí. Exception incluye excepciones unchecked, así que el compilador lo permite."
   ]
  ]
 },
 {
  "t": "Try-with-resources, AutoCloseable and reverse close order",
  "tt": "try-with-resources, AutoCloseable y cierre en orden inverso",
  "body": [
   "Muchos objetos mantienen recursos fuera de la JVM, como archivos abiertos, sockets de red y conexiones a bases de datos, y deben cerrarse cuando terminas. Cerrarlos de forma confiable en un bloque `finally` es verboso y fácil de hacer mal. La sentencia try-with-resources lo automatiza: los recursos declarados entre paréntesis después de `try` se cierran automáticamente cuando termina el bloque, tanto si termina normalmente como si lanza una excepción.",
   "Un recurso debe implementar `java.lang.AutoCloseable`, cuyo único método es `void close() throws Exception`. `java.io.Closeable` la extiende con `close() throws IOException` y la implementan los streams, readers y writers. Declarar en la lista de recursos una variable de una clase que no implementa ninguna de las dos interfaces es un error de compilación. Tus propias clases pueden implementar `AutoCloseable` y usarse de la misma forma.",
   "Los recursos se declaran entre los paréntesis y se separan con punto y coma (se permite un punto y coma final). Cada variable de recurso es implícitamente `final` y está en alcance solo dentro del bloque `try`, no en `catch` ni en `finally`. Desde Java 9 también puedes listar una variable existente declarada antes de la sentencia, siempre que sea final o efectivamente final: `try (reader) { ... }`. Una sentencia try-with-resources puede no tener ningún `catch` ni `finally`, pero cualquier excepción checked lanzada por `close()` todavía debe manejarse o declararse.",
   "El orden es el detalle más evaluado. Los recursos se abren en el orden en que se declaran y se cierran en orden inverso, así que el último abierto se cierra primero. El cierre ocurre justo después de que termina el bloque `try`, antes de que se ejecute cualquier bloque `catch` o `finally`. Si la inicialización de un recurso lanza una excepción, solo se cierran los recursos que ya se habían abierto.",
   "```java\nclass Res implements AutoCloseable {\n    private final String name;\n    Res(String name) { this.name = name; System.out.print(\"open-\" + name + \" \"); }\n    public void close() { System.out.print(\"close-\" + name + \" \"); }\n}\n\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.print(\"body \");\n    throw new RuntimeException();\n} catch (RuntimeException e) {\n    System.out.print(\"catch \");\n} finally {\n    System.out.print(\"finally\");\n}\n// open-A open-B body close-B close-A catch finally\n```",
   "Observa que la implementación de `close()` en `Res` no declara ninguna excepción. Un método que sobrescribe puede lanzar menos excepciones que `AutoCloseable.close()`, y cuando lo hace, el compilador ya no te obliga a manejar `Exception`. Si mantienes el `throws Exception` en tu clase, cada try-with-resources que la use debe manejar o declarar `Exception`.",
   "En código real, usa try-with-resources para cada archivo o conexión que abras, como `try (var in = Files.newBufferedReader(path))`, en lugar de llamar a `close()` tú mismo."
  ],
  "terms": [
   [
    "try-with-resources",
    "Una sentencia try que declara recursos entre paréntesis y los cierra automáticamente al final del bloque."
   ],
   [
    "AutoCloseable",
    "La interfaz con un único método close() que un recurso debe implementar para usarse en try-with-resources."
   ],
   [
    "Closeable",
    "Una subinterfaz de AutoCloseable usada por las clases de E/S, cuyo close() lanza IOException."
   ],
   [
    "Reverse close order (cierre en orden inverso)",
    "Los recursos se cierran en el orden opuesto al de su declaración: el último abierto es el primero en cerrarse."
   ]
  ],
  "example": "Una exportación a CSV abre una conexión a la base de datos, un statement y un writer de archivo en un solo try-with-resources. Si falla la escritura de una fila, primero se cierra el writer, luego el statement, luego la conexión, y solo entonces el bloque catch registra el error, así que no se filtran recursos.",
  "tip": "Rastrea el orden: abrir en orden de declaración, cuerpo, cerrar en orden inverso, luego catch, luego finally. Las variables de recurso son final y no son visibles en catch ni en finally.",
  "check": [
   [
    "En `try (var x = new R(\"1\"); var y = new R(\"2\"))`, ¿qué recurso se cierra primero?",
    "y (\"2\"), porque los recursos se cierran en orden inverso a su declaración."
   ],
   [
    "¿Los recursos se cierran antes o después de que se ejecute el bloque catch?",
    "Antes. Se cierran en cuanto termina el bloque try, y luego se ejecutan catch y finally."
   ],
   [
    "¿Puedes usar una variable existente en try-with-resources?",
    "Sí, desde Java 9, si es final o efectivamente final: try (existingResource) { }."
   ]
  ]
 },
 {
  "t": "Suppressed exceptions and Throwable.getSuppressed()",
  "tt": "Excepciones suprimidas y Throwable.getSuppressed()",
  "body": [
   "A veces ocurre más de una excepción durante la misma operación. En try-with-resources esto es común: el cuerpo lanza una excepción, y luego la llamada automática a `close()` también lanza una. Java no puede lanzar ambas a la vez, así que tiene que elegir una como excepción principal y recordar la otra. La que conserva como principal es la excepción del bloque try. Cualquier excepción lanzada al cerrar recursos se le adjunta como excepción suprimida.",
   "Las excepciones suprimidas se guardan dentro del `Throwable` principal. El método `addSuppressed(Throwable)` agrega una, y `getSuppressed()` devuelve un arreglo `Throwable[]` con ellas, en el orden en que se agregaron. Con varios recursos, cada `close()` que falla agrega otra excepción suprimida, y como los recursos se cierran en orden inverso, el arreglo sigue ese orden inverso. Un bloque catch de la excepción principal puede recorrer el arreglo para registrar cada problema.",
   "Si el bloque try termina normalmente y solo `close()` lanza una excepción, no hay nada que suprimir: la excepción de `close()` se convierte en la excepción principal y se lanza normalmente. Si dos recursos fallan al cerrarse y el cuerpo tuvo éxito, la primera excepción de cierre (del último recurso declarado) se vuelve principal y la segunda queda suprimida dentro de ella.",
   "```java\nclass Door implements AutoCloseable {\n    public void close() { throw new IllegalStateException(\"door stuck\"); }\n}\n\ntry (Door d = new Door()) {\n    throw new RuntimeException(\"fire alarm\");\n} catch (RuntimeException e) {\n    System.out.println(e.getMessage());          // fire alarm\n    for (Throwable t : e.getSuppressed()) {\n        System.out.println(\"suppressed: \" + t.getMessage()); // door stuck\n    }\n}\n```",
   "La supresión ocurre automáticamente solo en try-with-resources. Un `try/finally` clásico se comporta peor: si el `try` lanza una excepción y el `finally` también, la excepción de `finally` reemplaza a la original, y la original se pierde por completo a menos que la agregues tú mismo con `addSuppressed`. Esta es una de las razones más fuertes para preferir try-with-resources sobre la limpieza manual.",
   "Los stack traces impresos con `printStackTrace()` incluyen las excepciones suprimidas bajo un encabezado \"Suppressed:\", que verás en la salida de los laboratorios. No confundas las excepciones suprimidas con la causa: `getCause()` devuelve la excepción que llevó a esta, establecida cuando una excepción envuelve a otra, mientras que `getSuppressed()` lista excepciones adicionales que ocurrieron junto con ella.",
   "En el examen, identifica qué excepción es la principal (la del cuerpo del try si la hay), y luego lista las excepciones de cierre en orden inverso de los recursos como suprimidas."
  ],
  "terms": [
   [
    "Suppressed exception (excepción suprimida)",
    "Una excepción lanzada al cerrar un recurso que se adjunta a la excepción principal en lugar de reemplazarla."
   ],
   [
    "Primary exception (excepción principal)",
    "La excepción que realmente se propaga; en try-with-resources, la que lanza el bloque try si la hay."
   ],
   [
    "getSuppressed()",
    "Un método de Throwable que devuelve un arreglo con las excepciones suprimidas por esta."
   ],
   [
    "getCause()",
    "Un método de Throwable que devuelve la excepción que causó esta, lo cual es distinto de las excepciones suprimidas."
   ]
  ],
  "example": "Un trabajo de respaldo falla al escribir en una carpeta compartida de red, y luego también falla el cierre de la conexión. Como el trabajo usa try-with-resources, el log muestra el verdadero error de escritura como excepción principal, con el fallo de cierre listado bajo Suppressed, así que el equipo de operaciones corrige primero el problema correcto.",
  "tip": "En try-with-resources, la excepción del cuerpo gana y las excepciones de cierre quedan suprimidas. En un finally simple, una excepción nueva reemplaza a la original, que se pierde.",
  "check": [
   [
    "Si el cuerpo del try y el close() de un recurso lanzan excepciones, ¿cuál llega al bloque catch?",
    "La del cuerpo del try; la excepción de close() está disponible mediante getSuppressed()."
   ],
   [
    "Si solo close() lanza una excepción, ¿se suprime algo?",
    "No. La excepción de close() se lanza como excepción principal."
   ],
   [
    "¿Cuál es la diferencia entre getCause() y getSuppressed()?",
    "getCause devuelve la excepción que causó esta; getSuppressed devuelve excepciones adicionales que se lanzaron junto con ella y fueron suprimidas."
   ]
  ]
 },
 {
  "t": "Declaring exceptions with throws and overriding rules",
  "tt": "Declarar excepciones con throws y reglas de sobrescritura",
  "body": [
   "La cláusula `throws` en el encabezado de un método o constructor lista las excepciones checked que puede pasar a quien lo llama: `void load(String name) throws IOException, SQLException`. Forma parte del contrato del método, y quienes lo llaman deben entonces manejar o declarar esas excepciones. No la confundas con `throw`, que es una sentencia que lanza un objeto de excepción en ese momento.",
   "Puedes listar excepciones unchecked en `throws` como documentación, pero el compilador las ignora a efectos de manejar o declarar. También puedes declarar una excepción checked que el método nunca lanza en realidad; eso compila, y obliga igualmente a quienes llaman a ocuparse de ella. Una cláusula `throws` puede nombrar un supertipo, como `throws Exception`, que cubre todas las excepciones checked, a costa de obligar a quienes llaman a manejar un tipo muy amplio.",
   "La sobrescritura agrega una restricción. Un método que sobrescribe no puede lanzar excepciones checked nuevas ni más amplias que el método al que sobrescribe. Puede lanzar las mismas excepciones checked, subclases más específicas de ellas, menos de ellas o ninguna. Siempre puede lanzar cualquier excepción unchecked. La razón es el polimorfismo: el código que llama al método mediante una referencia del supertipo solo se preparó para las excepciones que declaró el supertipo, así que una subclase no debe sorprenderlo.",
   "```java\nclass Loader {\n    void load() throws IOException { }\n}\nclass FileLoader extends Loader {\n    @Override void load() throws FileNotFoundException { }  // OK: más específica\n}\nclass QuietLoader extends Loader {\n    @Override void load() { }                                // OK: ninguna\n}\nclass BadLoader extends Loader {\n    // @Override void load() throws Exception { }            // más amplia: error\n    // @Override void load() throws SQLException { }         // nueva: error\n    @Override void load() throws IllegalStateException { }   // OK: unchecked\n}\n```",
   "Las reglas también aplican a los métodos de interfaz, lo que importa para `AutoCloseable`: su `close()` declara `throws Exception`, así que una implementación puede declarar cualquier cosa más específica, incluido nada. El tipo declarado que importa para quienes llaman es el tipo de la referencia. Si llamas a `load()` sobre una referencia `Loader`, debes manejar `IOException` aunque el objeto sea un `QuietLoader`; si lo llamas sobre una referencia `QuietLoader`, no necesitas manejar nada.",
   "La sobrecarga no tiene esa restricción, porque una sobrecarga es un método distinto. Y los constructores no se heredan ni se sobrescriben, pero un constructor de subclase que llama a un constructor de la superclase que declara una excepción checked debe declarar él mismo esa excepción (o un supertipo); no puede atraparla, porque la llamada a `super(...)` no puede estar dentro de un bloque `try`.",
   "En la práctica, declara excepciones específicas en lugar de `throws Exception`, para que quienes llaman puedan reaccionar a los problemas reales."
  ],
  "terms": [
   [
    "throws clause (cláusula throws)",
    "La parte del encabezado de un método o constructor que declara las excepciones checked que puede pasar a quienes lo llaman."
   ],
   [
    "throw statement (sentencia throw)",
    "Una sentencia que lanza un objeto de excepción, como throw new IOException()."
   ],
   [
    "Narrower exception (excepción más específica)",
    "Una subclase de un tipo de excepción, que un método que sobrescribe puede declarar en lugar del tipo padre."
   ],
   [
    "Contract (contrato)",
    "Las promesas que la firma de un método hace a quienes lo llaman, incluidas qué excepciones checked deben manejar."
   ]
  ],
  "example": "Un framework de plugins declara `void run() throws PluginException`. Un autor de plugins intenta sobrescribir run con `throws IOException` y la compilación falla. Envolver la IOException en una PluginException (pasándola como causa) mantiene el contrato del que depende el manejo de errores del framework.",
  "tip": "Para una sobrescritura, las excepciones checked permitidas son: las mismas, más específicas, menos o ninguna. Nunca nuevas y nunca más amplias. Las excepciones unchecked siempre están permitidas.",
  "check": [
   [
    "¿Puede una sobrescritura de `void m() throws IOException` declarar `throws FileNotFoundException`?",
    "Sí. FileNotFoundException es subclase de IOException, así que es más específica."
   ],
   [
    "¿Puede una sobrescritura de `void m()` (sin throws) declarar `throws Exception`?",
    "No. Eso agrega una excepción checked que el método sobrescrito no declaraba."
   ],
   [
    "¿Debes manejar IOException al llamar a `load()` mediante una referencia `Loader` que apunta a una subclase que no declara excepciones?",
    "Sí. El compilador usa la declaración del tipo de la referencia, que lanza IOException."
   ]
  ]
 },
 {
  "t": "Creating custom checked and unchecked exceptions",
  "tt": "Crear excepciones personalizadas checked y unchecked",
  "body": [
   "Creas tu propio tipo de excepción extendiendo una clase de excepción existente. La elección del padre decide cómo se comporta. Extiende `Exception` (u otra excepción checked como `IOException`) para crear una excepción checked que quienes llaman deben atrapar o declarar. Extiende `RuntimeException` (o una subclase como `IllegalArgumentException`) para crear una excepción unchecked. Extender `Error` está reservado para problemas graves a nivel de la JVM y no es apropiado para código de aplicación.",
   "Elige checked cuando quien llama puede recuperarse razonablemente, por ejemplo una `InsufficientFundsException` a la que una interfaz bancaria puede responder pidiendo un monto menor. Elige unchecked cuando la excepción significa un error de programación o una precondición incumplida que quien llama debería corregir en el código, como pasar un identificador inválido. Muchas bibliotecas modernas se inclinan por las excepciones unchecked para no obligar a cada llamador a escribir código repetitivo, pero el examen quiere que conozcas ambas.",
   "Las excepciones personalizadas suelen proporcionar constructores que pasan información al padre. El conjunto habitual es un constructor sin argumentos, uno que recibe un mensaje `String`, uno que recibe un mensaje y una causa `Throwable`, y uno que recibe solo una causa. Los constructores no se heredan, así que si los quieres, debes escribirlos y llamar a `super(...)`. Si declaras solo un constructor con mensaje, `new MyException()` no compila.",
   "```java\npublic class InsufficientFundsException extends Exception {     // checked\n    private final long shortfall;\n    public InsufficientFundsException(String message, long shortfall) {\n        super(message);\n        this.shortfall = shortfall;\n    }\n    public long getShortfall() { return shortfall; }\n}\n\npublic class AccountNotFoundException extends RuntimeException { // unchecked\n    public AccountNotFoundException(String id, Throwable cause) {\n        super(\"no account \" + id, cause);\n    }\n}\n\nvoid withdraw(long cents) throws InsufficientFundsException {\n    if (cents > balance) {\n        throw new InsufficientFundsException(\"balance too low\", cents - balance);\n    }\n    balance -= cents;\n}\n```",
   "Pasar la causa se llama encadenamiento o envoltura de excepciones (exception chaining). Cuando se atrapa una excepción de bajo nivel, como una `SQLException`, y en su lugar se lanza una excepción personalizada de más alto nivel, pasar la original como causa conserva la historia completa. `getCause()` la devuelve, y el stack trace la muestra bajo \"Caused by:\". Lanzar una excepción nueva sin la causa pierde esa información, lo que hace la depuración mucho más difícil.",
   "Las excepciones personalizadas pueden agregar campos y métodos, como `getShortfall()` arriba, para que los manejadores obtengan datos estructurados en lugar de tener que analizar el texto del mensaje. Mantén los mensajes de excepción libres de secretos como contraseñas o números de tarjeta completos, ya que los mensajes suelen terminar en logs y páginas de error.",
   "En el examen, mira la cláusula `extends` para decidir si una excepción personalizada es checked, y luego aplica las reglas de manejar o declarar y de sobrescritura exactamente igual que con las excepciones integradas."
  ],
  "terms": [
   [
    "Custom exception (excepción personalizada)",
    "Una clase definida por la aplicación que extiende Exception, RuntimeException o una de sus subclases."
   ],
   [
    "Exception chaining (encadenamiento de excepciones)",
    "Envolver una excepción atrapada como causa de una excepción nueva para conservar los detalles originales."
   ],
   [
    "Cause (causa)",
    "El Throwable pasado al constructor de una excepción y devuelto por getCause()."
   ],
   [
    "super(message)",
    "La llamada al constructor que pasa un mensaje de detalle a la clase de excepción padre."
   ]
  ],
  "example": "Un servicio de pedidos atrapa una `SQLException` de bajo nivel al guardar un pedido y lanza `OrderSaveException(\"could not save order 42\", e)`. La capa web maneja OrderSaveException sin saber nada de SQL, mientras que los logs siguen mostrando el error de SQL bajo Caused by.",
  "tip": "La clase padre lo decide todo: extends Exception significa checked, extends RuntimeException significa unchecked. Los constructores no se heredan, así que escribe cada uno que necesites y llama a super.",
  "check": [
   [
    "¿`class ConfigException extends IllegalStateException` es checked o unchecked?",
    "Unchecked, porque IllegalStateException extiende RuntimeException."
   ],
   [
    "¿Por qué pasar la excepción original como causa al envolverla?",
    "Para que getCause() y el stack trace conserven los detalles del error original para la depuración."
   ],
   [
    "Si una excepción personalizada declara solo `MyEx(String msg)`, ¿compila `new MyEx()`?",
    "No. Los constructores no se heredan y no existe un constructor sin argumentos."
   ]
  ]
 },
 {
  "t": "Declaring, creating and copying arrays; Arrays.sort, binarySearch, compare, mismatch",
  "tt": "Declarar, crear y copiar arreglos; Arrays.sort, binarySearch, compare, mismatch",
  "body": [
   "Un arreglo (array) es un objeto de tamaño fijo que contiene elementos de un tipo, indexados desde 0. Los corchetes pueden ir después del tipo o después del nombre, y esto importa en las declaraciones de varias variables: `int[] a, b;` declara dos arreglos, mientras que `int a[], b;` declara un arreglo `a` y un `int` simple `b`. Creas un arreglo con un tamaño, `new int[5]`, que lo llena con valores por defecto, o con un inicializador, `new int[] {1, 2, 3}`. La forma corta `int[] x = {1, 2, 3};` solo funciona en una declaración. Dar a la vez un tamaño y un inicializador (`new int[3] {1, 2, 3}`) o ninguno de los dos (`new int[]`) es un error de compilación.",
   "El tamaño de un arreglo es el campo `length` (sin paréntesis, a diferencia de `String.length()`), y nunca cambia. Acceder al índice `length` o a un índice negativo lanza `ArrayIndexOutOfBoundsException`. Los arreglos multidimensionales son arreglos de arreglos, así que las filas pueden tener longitudes distintas: `int[][] grid = new int[3][];` crea tres filas `null` que llenas después. Solo la primera dimensión debe especificarse.",
   "Los arreglos no sobrescriben `equals` ni `toString`. `a.equals(b)` y `a == b` comparan ambos la identidad, e imprimir un arreglo muestra un código de tipo y un hash como `[I@1b6d3586`. Usa `Arrays.equals(a, b)` para comparar contenidos y `Arrays.toString(a)` para imprimirlos. Para copiar, usa `a.clone()` (una copia superficial de la misma longitud), `Arrays.copyOf(a, newLength)` (trunca o rellena con valores por defecto), `Arrays.copyOfRange(a, from, to)` (el final es exclusivo) o `System.arraycopy(src, srcPos, dest, destPos, length)` hacia un arreglo existente. Todas son superficiales: en un arreglo de objetos, las copias comparten los mismos objetos elemento.",
   "`Arrays.sort(a)` ordena de forma ascendente en el mismo arreglo. Los números se ordenan numéricamente. Los String se ordenan en orden natural (Unicode), donde los dígitos van antes de las mayúsculas, que van antes de las minúsculas, así que `{\"b\", \"A\", \"10\", \"9\"}` queda como `[10, 9, A, b]`. Los arreglos de objetos necesitan elementos `Comparable`, o un argumento `Comparator`.",
   "`Arrays.binarySearch(a, key)` busca en un arreglo ordenado. Si encuentra la clave, devuelve su índice. Si no, devuelve `-(insertionPoint) - 1`, donde el punto de inserción es el índice donde iría la clave. En un arreglo no ordenado el resultado es indefinido, así que nunca supongas un valor para él.",
   "`Arrays.compare(a, b)` compara dos arreglos lexicográficamente, elemento por elemento, y devuelve un número negativo, cero o un número positivo. Si un arreglo es prefijo del otro, el más corto es menor, y un arreglo `null` es menor que uno no null. `Arrays.mismatch(a, b)` devuelve el índice de la primera posición donde los arreglos difieren, o -1 si son iguales; si uno es prefijo propio del otro, devuelve la longitud del más corto.",
   "```java\nint[] nums = {8, 2, 6, 4};\nArrays.sort(nums);                            // [2, 4, 6, 8]\nSystem.out.println(Arrays.binarySearch(nums, 6)); // 2\nSystem.out.println(Arrays.binarySearch(nums, 5)); // -3 (iría en el índice 2)\nint[] copy = Arrays.copyOf(nums, 6);          // [2, 4, 6, 8, 0, 0]\nSystem.out.println(Arrays.compare(new int[]{1, 2}, new int[]{1, 3})); // negativo\nSystem.out.println(Arrays.mismatch(new int[]{1, 2, 3}, new int[]{1, 2})); // 2\nSystem.out.println(Arrays.mismatch(nums, nums.clone()));  // -1\n```"
  ],
  "terms": [
   [
    "Array (arreglo)",
    "Un objeto de longitud fija que contiene elementos de un tipo, accedidos por un índice que empieza en cero."
   ],
   [
    "Shallow copy (copia superficial)",
    "Una copia de un arreglo cuyos elementos son las mismas referencias a objetos que el original."
   ],
   [
    "Insertion point (punto de inserción)",
    "El índice donde se insertaría una clave ausente; binarySearch devuelve -(punto de inserción) - 1 para ella."
   ],
   [
    "Arrays.mismatch",
    "Devuelve el primer índice en el que dos arreglos difieren, o -1 si son iguales."
   ]
  ],
  "example": "Una tabla de clasificación guarda puntajes ordenados en un arreglo int. Para saber dónde va un puntaje nuevo, el código llama a `Arrays.binarySearch`, y cuando el resultado es negativo lo convierte de vuelta con `-(result + 1)` para obtener el punto de inserción antes de desplazar los puntajes menores con System.arraycopy.",
  "tip": "Para binarySearch con un valor ausente, encuentra el índice donde se insertaría, niégalo y réstale uno. Si el arreglo no está ordenado, la respuesta es 'indefinido'.",
  "check": [
   [
    "En `int[] a, b[];`, ¿cuál es el tipo de b?",
    "int[][], porque los corchetes después del tipo aplican a ambas y b agrega otra dimensión."
   ],
   [
    "¿Qué devuelve `Arrays.binarySearch(new int[]{1, 3, 5}, 4)`?",
    "-3. El punto de inserción es 2, y -(2) - 1 = -3."
   ],
   [
    "¿Qué devuelve `Arrays.mismatch(new int[]{5, 6}, new int[]{5, 6})`?",
    "-1, porque los arreglos son iguales."
   ]
  ]
 },
 {
  "t": "List, Set, Map, Queue and Deque interfaces and their main implementations",
  "tt": "Interfaces List, Set, Map, Queue y Deque y sus principales implementaciones",
  "body": [
   "El Java Collections Framework es un conjunto de interfaces e implementaciones en `java.util`. `Collection` es la interfaz raíz de `List`, `Set` y `Queue` (y de `Deque`, que extiende `Queue`). `Map` forma parte del framework pero no extiende `Collection`, porque guarda pares clave-valor en lugar de elementos individuales. Normalmente declaras las variables con el tipo de la interfaz, `List<String> names = new ArrayList<>();`, para poder cambiar de implementación después.",
   "Un `List` es una secuencia ordenada que permite duplicados y da acceso por índice. `ArrayList` está respaldado por un arreglo: acceso aleatorio rápido, inserciones en medio más lentas. `LinkedList` es una lista doblemente enlazada que también implementa `Deque`. Una trampa clásica con `List<Integer>` es `remove`: `list.remove(1)` elimina el elemento en el índice 1, porque `remove(int)` es una coincidencia exacta, mientras que `list.remove(Integer.valueOf(1))` elimina el valor 1.",
   "Un `Set` no contiene duplicados. `HashSet` usa `hashCode` y `equals`, no garantiza ningún orden y permite un `null`. `LinkedHashSet` mantiene el orden de inserción. `TreeSet` mantiene los elementos ordenados y no permite `null` con el orden natural. `add` devuelve `false` en lugar de lanzar una excepción cuando el elemento ya está presente.",
   "Un `Map` asocia claves únicas con valores. `put` devuelve el valor anterior de la clave, o `null`. `HashMap` permite una clave `null` y valores `null` y no garantiza ningún orden. `LinkedHashMap` mantiene el orden de inserción. `TreeMap` mantiene las claves ordenadas. Recorres un map mediante `keySet()`, `values()` o `entrySet()`.",
   "Un `Queue` normalmente procesa los elementos en orden FIFO (el primero en entrar es el primero en salir). Cada operación viene en dos variantes: una que lanza una excepción cuando falla y otra que devuelve un valor especial. `add` lanza una excepción si el elemento no puede agregarse, mientras que `offer` devuelve `false`; `remove` lanza una excepción con una cola vacía, mientras que `poll` devuelve `null`; `element` lanza una excepción con una cola vacía, mientras que `peek` devuelve `null`. `PriorityQueue` es la excepción al FIFO: `poll` siempre elimina el elemento más pequeño según el orden natural o el comparador, aunque recorrerla no muestra ningún orden en particular.",
   "Un `Deque` (cola doble, double-ended queue, pronunciado \"deck\") agrega operaciones en ambos extremos: `offerFirst`, `offerLast`, `pollFirst`, `pollLast`, `peekFirst`, `peekLast`, etc. También puede funcionar como pila con `push`, `pop` y `peek`, que trabajan todos en el frente. `ArrayDeque` es la implementación habitual y no permite elementos `null`; se prefiere sobre la vieja clase `Stack`.",
   "```java\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2); stack.push(3);\nSystem.out.println(stack.pop());   // 3 (último en entrar, primero en salir)\n\nQueue<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.offer(2); queue.offer(3);\nSystem.out.println(queue.poll());  // 1 (primero en entrar, primero en salir)\n\nQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 3));\nSystem.out.println(pq.poll());     // 1 (el más pequeño primero)\nSystem.out.println(new ArrayDeque<Integer>().peek()); // null, sin excepción\n```"
  ],
  "terms": [
   [
    "List",
    "Una colección ordenada que permite duplicados y acceso por índice, como ArrayList o LinkedList."
   ],
   [
    "Set",
    "Una colección sin elementos duplicados, como HashSet, LinkedHashSet o TreeSet."
   ],
   [
    "Map",
    "Una estructura de claves únicas asociadas a valores que no es una Collection, como HashMap o TreeMap."
   ],
   [
    "Deque (cola doble)",
    "Una cola de doble extremo que admite inserción y eliminación en ambos extremos, utilizable como cola o como pila."
   ]
  ],
  "example": "Un sistema de mesa de ayuda guarda los tickets entrantes en un ArrayDeque usado como cola FIFO, los tickets urgentes en una PriorityQueue ordenada por severidad, el conjunto de agentes de turno en un HashSet y los tickets asignados a cada agente en un HashMap con el nombre del agente como clave.",
  "tip": "Aprende los pares de la cola: add/offer, remove/poll, element/peek. El primero de cada par lanza una excepción al fallar, el segundo devuelve false o null. push y pop en un Deque trabajan en el frente.",
  "check": [
   [
    "Para `List<Integer> list = new ArrayList<>(List.of(10, 20, 30));`, ¿qué elimina `list.remove(1)`?",
    "El elemento en el índice 1, que es 20, porque remove(int) coincide exactamente con el argumento int."
   ],
   [
    "¿Qué devuelve `poll()` con una cola vacía?",
    "null. remove() lanzaría NoSuchElementException en su lugar."
   ],
   [
    "¿Extiende Map a Collection?",
    "No. Map es una interfaz separada dentro del framework."
   ]
  ]
 },
 {
  "t": "Unmodifiable collections: List.of, Set.of, Map.of and Arrays.asList behavior",
  "tt": "Colecciones no modificables: comportamiento de List.of, Set.of, Map.of y Arrays.asList",
  "body": [
   "Los métodos de fábrica `List.of`, `Set.of` y `Map.of` crean colecciones no modificables en una sola línea. Cualquier intento de cambiarlas, como `add`, `remove`, `put`, `clear` o `set`, compila bien (los métodos existen en las interfaces) pero lanza `UnsupportedOperationException` en tiempo de ejecución. Ese es el patrón que evalúa el examen: el código compila y luego falla.",
   "Estas fábricas también rechazan `null`. Pasar un elemento, clave o valor `null` lanza `NullPointerException`. `Set.of` con elementos duplicados y `Map.of` con claves duplicadas lanzan `IllegalArgumentException`, porque de lo contrario descartarían datos en silencio. El orden de iteración de `Set.of` y `Map.of` no está especificado, así que no dependas de él. `Map.of` recibe pares clave-valor directamente como argumentos hasta 10 pares; para más, usa `Map.ofEntries(Map.entry(k, v), ...)`.",
   "`List.copyOf`, `Set.copyOf` y `Map.copyOf` crean copias no modificables de una colección existente. Tienen la misma regla de no admitir null, y los cambios posteriores en el origen no afectan a la copia. Eso difiere de `Collections.unmodifiableList(list)`, que devuelve una vista de solo lectura: no puedes cambiarla a través de la vista, pero los cambios hechos a la lista original se reflejan en ella.",
   "`Arrays.asList(array)` es algo distinto. Devuelve una lista de tamaño fijo respaldada por el arreglo. Puedes llamar a `set` para reemplazar elementos, y el cambio se escribe en el arreglo, y los cambios en el arreglo aparecen en la lista. Pero `add` y `remove` lanzan `UnsupportedOperationException` porque el tamaño es fijo. A diferencia de `List.of`, `Arrays.asList` permite elementos `null`.",
   "```java\nString[] arr = {\"a\", \"b\", \"c\"};\nList<String> fixed = Arrays.asList(arr);\nfixed.set(0, \"z\");              // OK: arr[0] ahora es \"z\"\narr[1] = \"y\";                   // la lista lo ve: [z, y, c]\n// fixed.add(\"d\");              // UnsupportedOperationException\n\nList<String> immutable = List.of(\"a\", \"b\");\n// immutable.set(0, \"z\");       // UnsupportedOperationException\n// List.of(\"a\", null);          // NullPointerException\n// Set.of(\"a\", \"a\");            // IllegalArgumentException\n\nList<String> growable = new ArrayList<>(List.of(\"a\", \"b\"));\ngrowable.add(\"c\");              // OK: una copia ArrayList normal\n```",
   "No modificable es superficial. Un `List.of(sb1, sb2)` que contiene objetos `StringBuilder` no puede ganar ni perder elementos, pero cada builder todavía puede cambiarse. La verdadera inmutabilidad requiere también elementos inmutables.",
   "Una forma rápida de recordar la tabla: `List.of` es sin cambios y sin nulls; `Arrays.asList` es set sí, add o remove no, nulls permitidos, respaldada por el arreglo; `new ArrayList<>(...)` es totalmente modificable."
  ],
  "terms": [
   [
    "Unmodifiable collection (colección no modificable)",
    "Una colección cuyos métodos modificadores lanzan UnsupportedOperationException, como las que crea List.of."
   ],
   [
    "UnsupportedOperationException",
    "La excepción en tiempo de ejecución que se lanza cuando una colección no admite una operación de modificación."
   ],
   [
    "Fixed-size list (lista de tamaño fijo)",
    "La lista devuelta por Arrays.asList, que admite set pero no add ni remove."
   ],
   [
    "Unmodifiable view (vista no modificable)",
    "Un envoltorio de solo lectura, como Collections.unmodifiableList, que sigue reflejando los cambios de la colección subyacente."
   ]
  ],
  "example": "Una clase de configuración expone sus extensiones de archivo permitidas como `List.of(\"pdf\", \"png\", \"jpg\")`. Cuando un plugin intenta agregar \"exe\" a la lista en tiempo de ejecución, obtiene una UnsupportedOperationException en lugar de ampliar en silencio lo que acepta la función de carga de archivos.",
  "tip": "Modificar una colección List.of, Set.of o Map.of compila pero lanza UnsupportedOperationException. Arrays.asList permite set pero no add ni remove, y escribe en el arreglo.",
  "check": [
   [
    "¿Qué ocurre con `Map.of(\"a\", 1, \"a\", 2)`?",
    "IllegalArgumentException en tiempo de ejecución, por la clave duplicada."
   ],
   [
    "Después de `String[] a = {\"x\"}; List<String> l = Arrays.asList(a); l.set(0, \"y\");`, ¿cuánto vale a[0]?",
    "\"y\". La lista está respaldada por el arreglo, así que set escribe en él."
   ],
   [
    "¿Compila `List.of(1, 2).add(3)`?",
    "Sí, pero lanza UnsupportedOperationException en tiempo de ejecución."
   ]
  ]
 },
 {
  "t": "Sequenced collections: getFirst, getLast, addFirst, reversed",
  "tt": "Colecciones secuenciadas: getFirst, getLast, addFirst, reversed",
  "body": [
   "Antes de Java 21, obtener el primer o el último elemento funcionaba de forma distinta en cada tipo de colección: `list.get(0)` y `list.get(list.size() - 1)` para las listas, `deque.getFirst()` para los deques, `sortedSet.first()` para los conjuntos ordenados, y nada práctico en absoluto para `LinkedHashSet`. Las colecciones secuenciadas (sequenced collections), agregadas en Java 21, dan a toda colección con un orden de recorrido definido un conjunto común de métodos.",
   "La nueva interfaz `SequencedCollection` declara `addFirst`, `addLast`, `getFirst`, `getLast`, `removeFirst`, `removeLast` y `reversed`. `List` y `Deque` la extienden, y una nueva interfaz `SequencedSet` la extiende para los conjuntos con orden; la implementa `LinkedHashSet` y la heredan `SortedSet` y `NavigableSet`, así que `TreeSet` también la tiene. `HashSet` no, porque no tiene un orden definido. Para los maps, `SequencedMap` la implementa `LinkedHashMap` y la extiende `SortedMap`, así que `TreeMap` la tiene; `HashMap` no.",
   "Los detalles de comportamiento son lo que evalúa el examen. `getFirst` y `removeFirst` sobre una colección vacía lanzan `NoSuchElementException`, no devuelven `null`. En colecciones no modificables como `List.of(...)`, los métodos de agregar y eliminar lanzan `UnsupportedOperationException`. En colecciones ordenadas como `TreeSet`, `addFirst` y `addLast` lanzan `UnsupportedOperationException`, porque el orden de clasificación decide dónde va un elemento. En un `LinkedHashSet`, `addFirst` mueve al frente un elemento que ya está presente.",
   "`reversed()` devuelve una vista en orden inverso, no una copia. Recorrerla visita los elementos del último al primero, y los cambios en el original se reflejan en la vista. Si el original es modificable, los cambios hechos a través de la vista (donde se admitan) se escriben en él.",
   "```java\nList<String> list = new ArrayList<>(List.of(\"b\", \"c\"));\nlist.addFirst(\"a\");                    // [a, b, c]\nlist.addLast(\"d\");                     // [a, b, c, d]\nSystem.out.println(list.getFirst());   // a\nSystem.out.println(list.getLast());    // d\nList<String> rev = list.reversed();\nSystem.out.println(rev);               // [d, c, b, a]\nlist.removeFirst();\nSystem.out.println(rev);               // [d, c, b]  (la vista refleja el cambio)\n\nvar set = new LinkedHashSet<>(List.of(1, 2, 3));\nset.addFirst(3);                       // [3, 1, 2]\n// new TreeSet<>(set).addFirst(0);     // UnsupportedOperationException\n// new ArrayList<String>().getFirst(); // NoSuchElementException\n```",
   "`SequencedMap` agrega `firstEntry`, `lastEntry`, `pollFirstEntry`, `pollLastEntry`, `putFirst`, `putLast` y `reversed`, además de `sequencedKeySet()`, `sequencedValues()` y `sequencedEntrySet()`. Como con los conjuntos, `putFirst` y `putLast` no se admiten en un `TreeMap`, ya que el orden de las claves decide la ubicación.",
   "Recuerda que `Collection`, `Set` y `Map` en sí no recibieron estos métodos; solo los subtipos secuenciados. Así que `Set<String> s = new LinkedHashSet<>(); s.getFirst();` no compila, porque el tipo de la referencia es `Set`."
  ],
  "terms": [
   [
    "SequencedCollection",
    "Una interfaz de Java 21 para colecciones con un orden de recorrido definido, que proporciona operaciones de primero/último y reversed()."
   ],
   [
    "SequencedSet",
    "Una colección secuenciada sin duplicados, implementada por LinkedHashSet y heredada por SortedSet."
   ],
   [
    "SequencedMap",
    "Un map con un orden de entradas definido, implementado por LinkedHashMap y extendido por SortedMap."
   ],
   [
    "reversed()",
    "Devuelve una vista en orden inverso de una colección o map secuenciado que refleja los cambios posteriores."
   ]
  ],
  "example": "Un navegador guarda las páginas visitadas en un LinkedHashSet. Volver a visitar una página llama a `history.addFirst(url)`, que la mueve al frente sin duplicarla, y el menú del historial muestra `history.reversed()` o las primeras diez entradas según el orden que elija el usuario.",
  "tip": "Revisa primero el tipo de la referencia: las referencias Set y Collection no tienen getFirst. Luego revisa la implementación: TreeSet y TreeMap rechazan addFirst y putFirst, las listas no modificables rechazan todo cambio, y las colecciones vacías lanzan NoSuchElementException.",
  "check": [
   [
    "¿Tiene `HashSet` el método `getFirst()`?",
    "No. HashSet no tiene un orden definido, así que no implementa SequencedCollection."
   ],
   [
    "¿Qué hace `new ArrayList<Integer>().getLast()`?",
    "Lanza NoSuchElementException porque la lista está vacía."
   ],
   [
    "¿La lista que devuelve `reversed()` es una copia?",
    "No. Es una vista, así que los cambios en la lista original aparecen en ella."
   ]
  ]
 },
 {
  "t": "Map methods: merge, computeIfAbsent, getOrDefault, putIfAbsent",
  "tt": "Métodos de Map: merge, computeIfAbsent, getOrDefault, putIfAbsent",
  "body": [
   "Además de `put` y `get`, la interfaz `Map` tiene métodos default que resuelven patrones comunes en una sola llamada: contar, agrupar y proporcionar valores alternativos. El examen evalúa sus valores de retorno exactos y cómo tratan las claves ausentes y los valores `null`, así que aprende con precisión la regla de cada uno.",
   "`getOrDefault(key, defaultValue)` devuelve el valor de la clave si la clave está presente, y `defaultValue` en caso contrario. No cambia el map. Para una clave que está presente pero asociada a `null` (posible en un `HashMap`), devuelve `null`, no el valor por defecto, porque la clave sí existe.",
   "`putIfAbsent(key, value)` agrega la asociación solo si la clave está ausente o actualmente asociada a `null`. Devuelve el valor anterior: `null` si agregó la asociación, o el valor existente si dejó el map sin cambios. Nunca sobrescribe un valor no null.",
   "`computeIfAbsent(key, mappingFunction)` llama a la función solo cuando la clave está ausente o asociada a `null`. La función recibe la clave, y su resultado se guarda y se devuelve. Si la clave ya tiene un valor no null, la función no se llama en absoluto, y se devuelve el valor existente. Si la función devuelve `null`, no se guarda nada. Esto lo hace perfecto para agrupar en listas: `map.computeIfAbsent(dept, k -> new ArrayList<>()).add(name);`. El relacionado `computeIfPresent` se ejecuta solo cuando existe un valor no null, y `compute` se ejecuta siempre.",
   "`merge(key, value, remappingFunction)` combina un valor nuevo con uno existente. Si la clave está ausente o asociada a `null`, guarda el valor dado. De lo contrario llama a la función con el valor viejo y el valor nuevo y guarda el resultado. Si la función devuelve `null`, la clave se elimina. `merge` devuelve el valor nuevo (o `null` si se eliminó). Contar palabras se vuelve una sola línea: `counts.merge(word, 1, Integer::sum);`.",
   "```java\nMap<String, Integer> stock = new HashMap<>();\nstock.put(\"apple\", 5);\nstock.put(\"pear\", null);\n\nSystem.out.println(stock.getOrDefault(\"kiwi\", 0));    // 0\nSystem.out.println(stock.getOrDefault(\"pear\", 0));    // null\nSystem.out.println(stock.putIfAbsent(\"apple\", 9));    // 5 (sin cambios)\nSystem.out.println(stock.putIfAbsent(\"pear\", 2));     // null (ahora 2)\nSystem.out.println(stock.merge(\"apple\", 3, Integer::sum)); // 8\nstock.merge(\"apple\", 0, (oldV, newV) -> null);        // elimina apple\nSystem.out.println(stock.computeIfAbsent(\"fig\", k -> k.length())); // 3\nSystem.out.println(stock);  // {pear=2, fig=3} (orden no garantizado)\n```",
   "Estos métodos también existen en `TreeMap`, `LinkedHashMap` y `ConcurrentHashMap`, donde los métodos compute y merge son atómicos. Con maps no modificables como `Map.of`, cualquiera de ellos que cambiaría el map lanza `UnsupportedOperationException`."
  ],
  "terms": [
   [
    "getOrDefault",
    "Devuelve el valor asociado si la clave está presente, o el valor por defecto dado en caso contrario, sin modificar el map."
   ],
   [
    "putIfAbsent",
    "Guarda un valor solo cuando la clave está ausente o asociada a null, y devuelve el valor anterior."
   ],
   [
    "computeIfAbsent",
    "Calcula y guarda un valor a partir de la clave solo cuando la clave está ausente o asociada a null, y devuelve el valor actual."
   ],
   [
    "merge",
    "Guarda un valor para una clave ausente, o lo combina con el valor existente usando una función; un resultado null elimina la clave."
   ]
  ],
  "example": "Un trabajo de analítica lee millones de líneas de log y cuenta las visitas por página con `hits.merge(page, 1, Integer::sum)`, y agrupa los mensajes de error por código de estado con `errors.computeIfAbsent(code, c -> new ArrayList<>()).add(line)`, reemplazando una docena de líneas de código del tipo si-contiene-entonces-put.",
  "tip": "Revisa qué valor de retorno se pregunta: putIfAbsent devuelve el valor anterior (null cuando insertó), mientras que merge y computeIfAbsent devuelven el valor actual. Un resultado null de la función de merge elimina la clave.",
  "check": [
   [
    "¿Qué devuelve `putIfAbsent` cuando la clave ya está asociada a 7?",
    "7, el valor existente, y el map no cambia."
   ],
   [
    "¿Cuándo se llama a la función de `computeIfAbsent`?",
    "Solo cuando la clave está ausente o asociada a null."
   ],
   [
    "¿Qué ocurre si la función de reasignación de `merge` devuelve null?",
    "La asociación de la clave se elimina del map."
   ]
  ]
 },
 {
  "t": "Sorting with Comparable and Comparator (comparing, thenComparing, reversed)",
  "tt": "Ordenar con Comparable y Comparator (comparing, thenComparing, reversed)",
  "body": [
   "Java tiene dos formas de definir un orden. `Comparable<T>` le da a una clase su orden natural desde dentro de la clase, mediante un método, `int compareTo(T other)`. `Comparator<T>` define un orden desde fuera de la clase, mediante `int compare(T a, T b)`, así que puedes tener muchos órdenes para un mismo tipo. Ambos devuelven un número negativo si el primer argumento va primero, cero si son iguales en el orden y un número positivo si el primero va después.",
   "`String`, las clases envoltorio, `LocalDate` y los enums ya implementan `Comparable`. Los String se comparan por valor Unicode, así que las mayúsculas se ordenan antes que las minúsculas. Los enums se comparan por ordinal. Cuando implementas `compareTo` tú mismo, debería ser consistente con `equals`: devolver 0 exactamente cuando `equals` es true. Las colecciones ordenadas como `TreeSet` usan `compareTo` para decidir los duplicados, así que la inconsistencia causa resultados sorprendentes.",
   "Para campos numéricos, usa `Integer.compare(a, b)` en lugar de restar (`a - b`), porque la resta puede desbordarse y dar el signo equivocado con valores grandes.",
   "La interfaz `Comparator` tiene métodos estáticos y default que construyen comparadores sin escribir `compare` a mano. `Comparator.comparing(Person::lastName)` ordena por una clave que es `Comparable`. `comparingInt`, `comparingLong` y `comparingDouble` evitan el boxing con claves primitivas. `thenComparing(...)` agrega un criterio de desempate que se usa solo cuando la comparación anterior devuelve 0. `reversed()` invierte todo el comparador sobre el que se llama. `Comparator.naturalOrder()` y `Comparator.reverseOrder()` dan el orden natural y su inverso, y `nullsFirst`/`nullsLast` envuelven un comparador para manejar valores `null`.",
   "```java\nrecord Person(String last, String first, int age) {}\nList<Person> people = new ArrayList<>(List.of(\n    new Person(\"Lee\", \"Ann\", 30),\n    new Person(\"Kim\", \"Bo\", 25),\n    new Person(\"Lee\", \"Al\", 41)));\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::first));\n// Kim Bo, Lee Al, Lee Ann\n\npeople.sort(Comparator.comparingInt(Person::age).reversed());\n// Lee Al (41), Lee Ann (30), Kim Bo (25)\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::age, Comparator.reverseOrder()));\n// Kim Bo, Lee Al (41), Lee Ann (30)\n```",
   "La posición importa con `reversed()`. `comparing(a).thenComparing(b).reversed()` invierte ambas claves. Para invertir solo la segunda clave, pasa un comparador invertido a `thenComparing`, como en el último ejemplo. Otra trampa: `Comparator.comparing(p -> p.last()).reversed()` puede no compilar, porque con la llamada encadenada el compilador no puede inferir el tipo del parámetro de la lambda y lo trata como `Object`. Una referencia a método o una lambda con tipo explícito, `(Person p) -> p.last()`, lo soluciona.",
   "Para ordenar, llama a `list.sort(comparator)`, a `Collections.sort(list)` para el orden natural, a `Collections.sort(list, comparator)` o a `Arrays.sort(array, comparator)` para arreglos de objetos. Ordenar objetos que no son `Comparable` sin un comparador falla con una `ClassCastException` en tiempo de ejecución (o con un error de compilación con `Collections.sort`, cuya firma requiere `Comparable`). Estos ordenamientos son estables, así que los elementos iguales mantienen su orden relativo existente."
  ],
  "terms": [
   [
    "Comparable",
    "Una interfaz que implementa una clase para definir su orden natural mediante compareTo."
   ],
   [
    "Comparator",
    "Un objeto aparte que define un orden mediante compare, lo que permite varios órdenes para un mismo tipo."
   ],
   [
    "thenComparing",
    "Un método de Comparator que agrega una clave secundaria usada solo cuando la primera comparación empata."
   ],
   [
    "Stable sort (ordenamiento estable)",
    "Un ordenamiento que mantiene los elementos iguales en su orden relativo original."
   ]
  ],
  "example": "La página de productos de una tienda en línea permite a los compradores ordenar por precio y luego por calificación. El código construye `Comparator.comparingDouble(Product::price).thenComparing(Product::rating, Comparator.reverseOrder())`, así que los artículos más baratos van primero y, entre precios iguales, los mejor calificados aparecen arriba.",
  "tip": "Lee las cadenas de comparadores de izquierda a derecha, y aplica reversed() a todo lo que está antes en la cadena. compareTo y compare devuelven negativo, cero o positivo, no solo -1, 0 y 1.",
  "check": [
   [
    "¿Qué devuelve `\"apple\".compareTo(\"Banana\")`, positivo o negativo?",
    "Positivo. La 'a' minúscula tiene un valor Unicode mayor que la 'B' mayúscula, así que \"apple\" se ordena después de \"Banana\"."
   ],
   [
    "En `comparing(A).thenComparing(B).reversed()`, ¿qué claves se invierten?",
    "Tanto A como B, porque reversed() se aplica a todo el comparador construido hasta ese punto."
   ],
   [
    "¿Por qué `return this.age - other.age;` es arriesgado en compareTo?",
    "La resta puede desbordarse con valores grandes o negativos y devolver el signo equivocado. Integer.compare lo evita."
   ]
  ]
 },
 {
  "t": "TreeSet and TreeMap natural ordering",
  "tt": "Orden natural en TreeSet y TreeMap",
  "body": [
   "`TreeSet` y `TreeMap` mantienen sus elementos (o claves) ordenados en todo momento, usando internamente un árbol balanceado, así que agregar, eliminar y buscar toman un tiempo proporcional al logaritmo del tamaño. Por defecto usan el orden natural, es decir, el método `compareTo` de los elementos: números ascendentes, cadenas en orden Unicode (dígitos, luego mayúsculas, luego minúsculas), fechas cronológicamente. Puedes pasar un `Comparator` al constructor para usar un orden distinto, como `new TreeSet<>(Comparator.reverseOrder())`.",
   "Con el orden natural, los elementos deben implementar `Comparable`. Agregar un objeto que no lo hace, como una clase simple sin `compareTo`, compila pero lanza `ClassCastException` en tiempo de ejecución, incluso con el primer elemento. Agregar `null` lanza `NullPointerException`, porque `null` no puede compararse. Las mismas reglas aplican a las claves de `TreeMap`; los valores pueden ser cualquier cosa, incluido `null`.",
   "Los duplicados los decide la comparación, no `equals`. Si `compareTo` (o el comparador) devuelve 0 para dos elementos, el árbol los trata como el mismo, así que el segundo no se agrega a un `TreeSet`, y en un `TreeMap` el segundo `put` reemplaza el valor de la clave existente. Un `TreeSet<String>` construido con `String.CASE_INSENSITIVE_ORDER`, por ejemplo, conserva solo uno de `\"a\"` y `\"A\"`.",
   "Como están ordenadas, estas clases implementan `NavigableSet` y `NavigableMap`, que agregan métodos de navegación. `first()` y `last()` dan los extremos. `lower(e)` devuelve el mayor elemento estrictamente menor que `e`, `floor(e)` el mayor menor o igual, `ceiling(e)` el menor mayor o igual, y `higher(e)` el menor estrictamente mayor; cada uno devuelve `null` si no hay ninguno. `headSet(to)` excluye `to`, `tailSet(from)` incluye `from`, y `subSet(from, to)` incluye `from` pero excluye `to`; las sobrecargas con banderas boolean te permiten elegir. `pollFirst()` y `pollLast()` eliminan y devuelven los extremos, y `descendingSet()` da una vista inversa.",
   "```java\nTreeSet<Integer> set = new TreeSet<>(List.of(40, 10, 30, 20));\nSystem.out.println(set);               // [10, 20, 30, 40]\nSystem.out.println(set.floor(25));     // 20\nSystem.out.println(set.ceiling(25));   // 30\nSystem.out.println(set.higher(40));    // null\nSystem.out.println(set.headSet(30));   // [10, 20]\nSystem.out.println(set.tailSet(30));   // [30, 40]\n\nTreeMap<String, Integer> map = new TreeMap<>();\nmap.put(\"banana\", 2); map.put(\"Apple\", 1); map.put(\"cherry\", 3);\nSystem.out.println(map);               // {Apple=1, banana=2, cherry=3}\nSystem.out.println(map.firstKey());    // Apple\nSystem.out.println(map.headMap(\"c\"));  // {Apple=1, banana=2}\n```",
   "`TreeMap` ofrece los métodos de clave equivalentes: `firstKey`, `lastKey`, `floorKey`, `ceilingKey`, `lowerKey`, `higherKey`, sus versiones `...Entry` que devuelven pares clave-valor, `headMap`, `tailMap`, `subMap` y `descendingMap`. Los métodos de rango devuelven vistas respaldadas por el original, así que los cambios en una se reflejan en el otro.",
   "Elige un árbol cuando necesites recorrido ordenado o consultas por rango, como encontrar el siguiente evento programado después de una hora dada. Si solo necesitas búsquedas rápidas, `HashSet` y `HashMap` suelen ser más rápidos."
  ],
  "terms": [
   [
    "Natural ordering (orden natural)",
    "El orden definido por el propio método compareTo de un elemento, de la interfaz Comparable."
   ],
   [
    "NavigableSet",
    "Una interfaz de conjunto ordenado con métodos como floor, ceiling, headSet y tailSet, implementada por TreeSet."
   ],
   [
    "floor / ceiling",
    "El mayor elemento menor o igual, o el menor elemento mayor o igual, que un valor dado."
   ],
   [
    "headSet / tailSet",
    "Vistas de los elementos por debajo de un límite (exclusivo por defecto) o en y por encima de un límite (inclusivo por defecto)."
   ]
  ],
  "example": "Un sistema de reserva de salas de reuniones guarda las reservas de cada sala en un TreeMap con la hora de inicio como clave. Para comprobar si una reserva nueva choca, llama a `floorEntry(newStart)` para encontrar la reserva que empieza justo antes y a `ceilingKey(newStart)` para encontrar la siguiente, en lugar de recorrer toda la lista.",
  "tip": "En un TreeSet o TreeMap, que compareTo devuelva 0 significa duplicado, sin importar equals. headSet excluye su límite, tailSet lo incluye, y lower/higher son estrictos mientras que floor/ceiling no.",
  "check": [
   [
    "¿Qué imprime `new TreeSet<>(List.of(\"b\", \"A\", \"a\", \"1\"))`?",
    "[1, A, a, b]. El orden natural de las cadenas pone los dígitos antes de las mayúsculas y estas antes de las minúsculas."
   ],
   [
    "¿Qué ocurre cuando agregas `null` a un TreeSet que usa el orden natural?",
    "Lanza NullPointerException, porque null no puede compararse."
   ],
   [
    "Para un TreeSet que contiene 10, 20, 30, ¿qué devuelven `lower(20)` y `floor(20)`?",
    "lower(20) devuelve 10 (estrictamente menor); floor(20) devuelve 20 (menor o igual)."
   ]
  ]
 },
 {
  "t": "Generics: type parameters, bounded types and wildcards (? extends, ? super)",
  "tt": "Genéricos: parámetros de tipo, tipos acotados y comodines (? extends, ? super)",
  "body": [
   "Los genéricos (generics) te permiten escribir una clase o un método una vez y hacer que el compilador verifique los tipos con los que trabaja. Cuando escribes `List<String>`, el compilador rechaza `list.add(42)` y te permite leer elementos sin cast. Los nombres entre corchetes angulares como `T`, `E`, `K` y `V` son parámetros de tipo: marcadores que se reemplazan por argumentos de tipo reales en cada uso. El diamante `<>` del lado derecho (`new ArrayList<>()`) le pide al compilador que infiera el argumento de tipo a partir del lado izquierdo.",
   "Un método genérico declara sus propios parámetros de tipo justo antes del tipo de retorno: `static <T> T first(List<T> list)`. El compilador infiere `T` a partir de los argumentos. Un parámetro de tipo acotado restringe lo que puede ser `T`. `<T extends Number>` significa que T debe ser Number o una subclase, así que dentro del método puedes llamar a `doubleValue()` sobre un T. Las cotas múltiples usan `&`, y una cota de clase debe ir primero: `<T extends Number & Comparable<T>>`. Observa que en una cota se usa `extends` tanto para clases como para interfaces.",
   "Los genéricos usan borrado de tipos (type erasure): después de la compilación, los argumentos de tipo se eliminan y se reemplazan por su cota (u Object). Por eso no puedes escribir `new T()`, `new T[10]`, `instanceof List<String>` (a menos que el compilador pueda demostrar que la comprobación es segura a partir del tipo estático de la expresión; `instanceof List<?>` siempre está permitido), ni sobrecargar dos métodos que difieren solo en el argumento de tipo, como `m(List<String>)` y `m(List<Integer>)`; después del borrado tienen la misma firma. Los campos estáticos tampoco pueden usar el parámetro de tipo de una clase.",
   "Los tipos genéricos son invariantes: `List<Integer>` no es un subtipo de `List<Number>`, aunque Integer sea un Number. Si lo fuera, podrías agregar un Double a una lista de Integers. Los comodines (wildcards) te dan flexibilidad controlada. `List<?>` es una lista de algún tipo desconocido; puedes leer elementos como Object pero solo puedes agregar `null`. `List<? extends Number>` es un comodín con cota superior: acepta `List<Integer>` o `List<Double>`, puedes leer elementos como Number, pero no puedes agregar nada excepto `null` porque el compilador no conoce el tipo exacto de los elementos.",
   "`List<? super Integer>` es un comodín con cota inferior: acepta `List<Integer>`, `List<Number>` o `List<Object>`. Puedes agregarle Integers de forma segura, pero al leer solo obtienes Object. La regla práctica es PECS: Producer Extends, Consumer Super (el productor usa extends, el consumidor usa super). Si un parámetro produce valores que lees, usa `? extends`; si consume valores que escribes, usa `? super`. `Collections.copy(List<? super T> dest, List<? extends T> src)` es el ejemplo clásico.",
   "```java\nstatic double sum(List<? extends Number> nums) {\n    double total = 0;\n    for (Number n : nums) total += n.doubleValue();\n    return total;\n}\nstatic void fill(List<? super Integer> out) {\n    out.add(1); out.add(2);   // OK\n    // Integer i = out.get(0); // no compila: devuelve Object\n}\n```"
  ],
  "terms": [
   [
    "Type parameter (parámetro de tipo)",
    "Un marcador como T declarado entre corchetes angulares en una clase, interfaz o método y reemplazado por un argumento de tipo en cada uso."
   ],
   [
    "Bounded type parameter (parámetro de tipo acotado)",
    "Un parámetro de tipo restringido con extends, como <T extends Comparable<T>>, para que el código pueda llamar a los métodos de la cota."
   ],
   [
    "Upper-bounded wildcard (comodín con cota superior)",
    "? extends X: acepta X o cualquier subtipo; seguro para leer como X, pero solo se puede agregar null."
   ],
   [
    "Lower-bounded wildcard (comodín con cota inferior)",
    "? super X: acepta X o cualquier supertipo; seguro para agregar valores X, pero las lecturas devuelven Object."
   ],
   [
    "Type erasure (borrado de tipos)",
    "El compilador elimina los argumentos de tipo genéricos después de verificarlos, así que no están disponibles en tiempo de ejecución."
   ]
  ],
  "example": "Una utilidad de reportes necesita sumar precios guardados un día en un List<BigDecimal> y al siguiente en un List<Integer>. Declarar el parámetro como List<? extends Number> permite que un solo método acepte ambos, mientras que un método que agrega cantidades por defecto a una lista recibe List<? super Integer> para que quienes llaman puedan pasar un List<Number> o un List<Object>.",
  "tip": "Las preguntas del examen suelen mostrar list.add(...) sobre un List<? extends Algo> y preguntar si compila. No compila (excepto con null). Con ? super, agregar el tipo de la cota compila, pero asignar get() a algo más específico que Object no.",
  "check": [
   [
    "¿Compila List<Number> nums = new ArrayList<Integer>();?",
    "No. Los tipos genéricos son invariantes, así que ArrayList<Integer> no es un List<Number>. List<? extends Number> sí lo aceptaría."
   ],
   [
    "¿Por qué no puedes escribir new T() dentro de una clase genérica?",
    "Por el borrado de tipos, el tipo real de T es desconocido en tiempo de ejecución, así que la JVM no puede saber qué constructor llamar."
   ],
   [
    "En <T extends Runnable & Serializable>, ¿qué debe ir primero si una de las cotas es una clase?",
    "La clase debe listarse primero, seguida de cualquier interfaz unida con &."
   ]
  ]
 },
 {
  "t": "List.remove(int) vs remove(Object) with Integer lists",
  "tt": "List.remove(int) vs remove(Object) con listas de Integer",
  "body": [
   "La interfaz List tiene dos métodos llamados remove. `E remove(int index)` elimina el elemento en una posición y lo devuelve. `boolean remove(Object o)` elimina el primer elemento igual a o y devuelve true si encontró uno. Con un `List<String>` no hay confusión, pero con un `List<Integer>` una llamada como `list.remove(1)` podría significar cualquiera de las dos, y al examen le encanta esta trampa.",
   "Java resuelve las sobrecargas por fases. En la primera fase el compilador busca un método que coincida sin boxing ni unboxing. El literal `1` es un int, y `remove(int)` acepta exactamente un int, así que gana. El boxing a Integer para coincidir con `remove(Object)` solo se considera si ningún método coincidió en la primera fase. Así que `list.remove(1)` siempre elimina por índice, nunca por valor.",
   "Para eliminar por valor debes pasar un objeto: `list.remove(Integer.valueOf(1))`, `list.remove((Integer) 1)` o `list.remove((Object) 1)`. Ahora el argumento es un tipo de referencia, la sobrecarga con int no aplica y se ejecuta `remove(Object)`. Usa `equals`, así que elimina el primer elemento cuyo valor es 1, y devuelve false si no hay ninguno en lugar de lanzar una excepción.",
   "Los tipos de retorno también difieren, lo que te ayuda a leer una pregunta. `remove(int)` devuelve el elemento eliminado (un Integer) y lanza `IndexOutOfBoundsException` si el índice es negativo o no es menor que `size()`. `remove(Object)` devuelve un boolean. Si el código asigna el resultado a un boolean, debe ser la versión de Object; si lo asigna a un Integer o int, debe ser la versión por índice.",
   "```java\nList<Integer> nums = new ArrayList<>(List.of(10, 20, 1, 30));\nnums.remove(1);                  // elimina el índice 1 (20) -> [10, 1, 30]\nnums.remove(Integer.valueOf(1)); // elimina el valor 1      -> [10, 30]\nboolean b = nums.remove(Integer.valueOf(99)); // false, sin cambios\n// nums.remove(5);  // IndexOutOfBoundsException en tiempo de ejecución\n```",
   "Cuidado con las trampas relacionadas. Una variable short o char también se amplía a int y selecciona la versión por índice. Una lista no modificable de `List.of` lanza `UnsupportedOperationException` con cualquiera de los dos remove. Eliminar dentro de un bucle for mejorado sobre el mismo ArrayList normalmente lanza `ConcurrentModificationException`; usa `removeIf(x -> x == 1)` o el remove de un Iterator en su lugar. `removeIf` recibe un Predicate, así que no hay ninguna ambigüedad con índices."
  ],
  "terms": [
   [
    "remove(int index)",
    "Elimina y devuelve el elemento en la posición dada; lanza IndexOutOfBoundsException con un índice inválido."
   ],
   [
    "remove(Object o)",
    "Elimina el primer elemento igual a o y devuelve true si se eliminó uno, false en caso contrario."
   ],
   [
    "Overload resolution phases (fases de resolución de sobrecargas)",
    "El compilador intenta primero coincidencias sin boxing, luego con boxing y unboxing, y luego con varargs."
   ],
   [
    "removeIf",
    "Un método de Collection que elimina cada elemento que cumple un Predicate y devuelve true si se eliminó algo."
   ]
  ],
  "example": "Un desarrollador mantiene un List<Integer> de IDs de tickets y llama a ids.remove(ticketId) donde ticketId es un int. En lugar de eliminar el ticket 3, el código elimina lo que esté en el índice 3, o falla cuando la lista es corta. Cambiar la llamada a ids.remove(Integer.valueOf(ticketId)) corrige el error.",
  "tip": "Para un List<Integer>, un argumento int simple siempre significa índice. Busca Integer.valueOf, un cast a Integer u Object, o una variable Integer para detectar la versión por valor.",
  "check": [
   [
    "Dado List<Integer> x = new ArrayList<>(List.of(5, 6, 7)); ¿qué hace x.remove(2)?",
    "Elimina el elemento en el índice 2, que es 7, y lo devuelve. La lista queda [5, 6]."
   ],
   [
    "¿Qué devuelve x.remove(Integer.valueOf(9)) si 9 no está en la lista?",
    "Devuelve false y deja la lista sin cambios; no lanza ninguna excepción."
   ]
  ]
 },
 {
  "t": "Functional interfaces in java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
  "tt": "Interfaces funcionales en java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
  "body": [
   "Una interfaz funcional es una interfaz con exactamente un método abstracto. Los métodos default y static no cuentan, ni tampoco los métodos abstractos que coinciden con métodos public de Object como `equals`. Como hay un solo método abstracto, una lambda o una referencia a método puede proporcionar su cuerpo. La anotación opcional `@FunctionalInterface` hace que el compilador verifique la regla. El paquete `java.util.function` proporciona interfaces listas para usar, así que rara vez necesitas escribir las tuyas.",
   "Aprende las seis formas básicas por sus nombres de método, porque el examen espera que sepas qué método llamar. `Supplier<T>` tiene `T get()`: sin entrada, una salida, útil para valores perezosos y fábricas. `Consumer<T>` tiene `void accept(T t)`: una entrada, sin resultado, usado para efectos secundarios como imprimir. `Function<T, R>` tiene `R apply(T t)`: convierte un T en un R. `Predicate<T>` tiene `boolean test(T t)`: responde sí o no.",
   "`UnaryOperator<T>` extiende `Function<T, T>`, así que su método sigue siendo `apply`, pero los tipos de entrada y salida son iguales, por ejemplo `String::toUpperCase`. `BinaryOperator<T>` extiende `BiFunction<T, T, T>` con `T apply(T a, T b)`, que es exactamente lo que espera `reduce`, por ejemplo `Integer::sum`. Las versiones Bi reciben dos argumentos: `BiConsumer<T, U>` (accept), `BiFunction<T, U, R>` (apply) y `BiPredicate<T, U>` (test). No existe BiSupplier, porque un supplier no recibe entrada.",
   "Varias de estas interfaces tienen métodos default para composición. `Predicate` ofrece `and`, `or` y `negate`, además de los estáticos `Predicate.not(p)` y `Predicate.isEqual(x)`. `Function` ofrece `andThen` (aplica esta y luego la otra) y `compose` (aplica primero la otra), además del estático `Function.identity()`. `Consumer` ofrece `andThen`. `BinaryOperator` tiene los estáticos `minBy(comparator)` y `maxBy(comparator)`.",
   "```java\nSupplier<List<String>> maker = ArrayList::new;\nConsumer<String> show = System.out::println;\nFunction<String, Integer> len = String::length;\nPredicate<String> empty = String::isEmpty;\nUnaryOperator<String> up = String::toUpperCase;\nBinaryOperator<Integer> add = Integer::sum;\n\nFunction<Integer, Integer> plus1 = x -> x + 1, times2 = x -> x * 2;\nplus1.andThen(times2).apply(3); // (3+1)*2 = 8\nplus1.compose(times2).apply(3); // 3*2+1 = 7\n```",
   "Para evitar el boxing existen especializaciones primitivas: `IntPredicate`, `IntFunction<R>` (entra int, sale R), `ToIntFunction<T>` (entra T, sale int), `IntUnaryOperator`, `IntBinaryOperator`, `IntSupplier` (método `getAsInt`), `BooleanSupplier` (`getAsBoolean`) y las versiones equivalentes para Long y Double. El patrón de nombres te dice la dirección: `IntFunction` recibe un int, `ToIntFunction` devuelve un int."
  ],
  "terms": [
   [
    "Functional interface (interfaz funcional)",
    "Una interfaz con exactamente un método abstracto, que una lambda o una referencia a método puede implementar."
   ],
   [
    "Supplier<T>",
    "No recibe argumentos y devuelve un T mediante get()."
   ],
   [
    "Predicate<T>",
    "Recibe un T y devuelve un boolean mediante test(); se puede componer con and, or y negate."
   ],
   [
    "UnaryOperator<T>",
    "Una Function<T, T> cuyos tipos de entrada y salida son iguales; su método es apply."
   ],
   [
    "BinaryOperator<T>",
    "Una BiFunction<T, T, T> que combina dos valores del mismo tipo en uno; la usa reduce."
   ]
  ],
  "example": "Un servicio de pedidos filtra los pedidos con un Predicate<Order> (isPaid), los convierte con una Function<Order, Invoice> y envía cada factura con un Consumer<Invoice>. Se inyecta un Supplier<LocalDate> para la fecha de hoy, de modo que las pruebas puedan proporcionar una fecha fija en lugar del reloj real.",
  "tip": "Relaciona los nombres de método con las interfaces: get para Supplier, accept para Consumer, apply para Function y los operadores, test para Predicate. Las preguntas suelen llamar al método equivocado, como predicate.apply(x), que no compila.",
  "check": [
   [
    "¿Qué interfaz funcional corresponde a una lambda (a, b) -> a + b donde a, b y el resultado son todos Integer?",
    "BinaryOperator<Integer> (o la más general BiFunction<Integer, Integer, Integer>)."
   ],
   [
    "¿Cuál es la diferencia entre f.andThen(g) y f.compose(g)?",
    "andThen aplica f primero y luego g al resultado; compose aplica g primero y luego f."
   ],
   [
    "¿Qué método declara IntSupplier?",
    "int getAsInt(), que devuelve un int primitivo sin boxing."
   ]
  ]
 },
 {
  "t": "Lambda syntax, method references and effectively final variables",
  "tt": "Sintaxis de lambdas, referencias a métodos y variables efectivamente final",
  "body": [
   "Una expresión lambda es una implementación compacta del único método abstracto de una interfaz funcional. Su forma es: parámetros, una flecha y un cuerpo. Los paréntesis son opcionales solo para un único parámetro sin tipo declarado: `x -> x * 2`. Cero o varios parámetros necesitan paréntesis: `() -> 42`, `(a, b) -> a + b`. Puedes declarar tipos, `(String s) -> s.length()`, o usar `var`, `(var s) -> s.length()`, pero debes ser consistente: todos los parámetros con tipo, todos con `var` o todos sin tipo. Mezclarlos, como en `(var a, b)`, no compila.",
   "El cuerpo es una sola expresión o un bloque. Un cuerpo de expresión devuelve su valor automáticamente y no lleva punto y coma ni la palabra return dentro: `s -> s.isEmpty()`. Un cuerpo de bloque usa llaves, necesita punto y coma y debe usar `return` si la interfaz devuelve un valor: `s -> { return s.isEmpty(); }`. Escribir `s -> { s.isEmpty() }` (sin punto y coma, sin return) o `s -> return s.isEmpty();` (return sin llaves) son errores de compilación clásicos.",
   "Una lambda puede leer variables locales del método que la contiene solo si son final o efectivamente final, es decir, si nunca se reasignan después de inicializarse. El compilador captura una copia del valor, así que permitir cambios posteriores crearía confusión. Los campos de instancia y los estáticos son distintos: la lambda llega a ellos mediante `this` o la clase, así que pueden leerse y modificarse libremente. Los parámetros y las variables locales de una lambda tampoco pueden reutilizar el nombre de una variable local que ya esté en alcance, y dentro de una lambda `this` significa la instancia que la contiene, no la lambda.",
   "```java\nint limit = 10;\nPredicate<Integer> small = n -> n < limit; // OK: limit es efectivamente final\n// limit++;   // descomentarlo rompe la lambda de arriba: ya no es efectivamente final\nString s = \"x\";\n// Function<String, Integer> f = s -> s.length(); // error: s ya está definida\n```",
   "Una referencia a método es una forma abreviada de una lambda que solo llama a un método existente. Hay cuatro tipos. Estática: `Integer::parseInt` significa `s -> Integer.parseInt(s)`. De instancia ligada (bound), sobre un objeto concreto: `System.out::println` significa `x -> System.out.println(x)`. De instancia no ligada (unbound), sobre un objeto arbitrario de un tipo: `String::length` significa `s -> s.length()`, donde el primer parámetro se convierte en el receptor. De constructor: `ArrayList::new` significa `() -> new ArrayList<>()` o una versión con argumentos, según la interfaz destino.",
   "La misma referencia a método puede encajar en interfaces distintas. `String::concat` es un `BinaryOperator<String>` porque equivale a `(a, b) -> a.concat(b)`. No puedes agregar argumentos ni lógica extra a una referencia a método; si necesitas `s -> s.substring(1)`, debes usar una lambda. El tipo destino decide qué sobrecarga elige una referencia, así que una referencia ambigua con métodos sobrecargados puede no compilar."
  ],
  "terms": [
   [
    "Lambda expression (expresión lambda)",
    "Una función anónima escrita como parámetros -> cuerpo que implementa una interfaz funcional."
   ],
   [
    "Effectively final (efectivamente final)",
    "Una variable local que nunca se reasigna después de inicializarse, así que una lambda o clase interna puede capturarla."
   ],
   [
    "Bound method reference (referencia a método ligada)",
    "Una referencia sobre un objeto específico, como System.out::println, cuyo receptor queda fijo cuando se crea la referencia."
   ],
   [
    "Unbound method reference (referencia a método no ligada)",
    "Una referencia como String::length donde el primer argumento proporcionado en la llamada se convierte en el receptor."
   ],
   [
    "Constructor reference (referencia a constructor)",
    "ClassName::new, que crea un objeto nuevo usando el constructor que coincide con los parámetros de la interfaz destino."
   ]
  ],
  "example": "Una utilidad de ordenamiento se refactoriza de una clase Comparator anónima a people.sort(Comparator.comparing(Person::lastName)). La referencia a método no ligada Person::lastName lee el apellido de cada persona, haciendo el código más corto y más difícil de equivocar.",
  "tip": "Revisa tres cosas en cada pregunta de lambdas: las reglas de paréntesis para los parámetros, las llaves con return y punto y coma, y si alguna variable local capturada se reasigna en cualquier parte del método, incluso después de la lambda.",
  "check": [
   [
    "¿Compila (a, var b) -> a + b?",
    "No. Los parámetros deben tener todos tipo explícito, todos var o todos sin tipo; mezclar estilos es un error de compilación."
   ],
   [
    "Reescribe s -> s.trim() como referencia a método y di de qué tipo es.",
    "String::trim, una referencia a método de instancia no ligada: el parámetro de la lambda se convierte en el objeto sobre el que se llama trim."
   ],
   [
    "¿Puede una lambda incrementar un campo de instancia con count++?",
    "Sí. La regla de efectivamente final aplica solo a variables locales y parámetros capturados, no a campos."
   ]
  ]
 },
 {
  "t": "Creating streams: collections, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
  "tt": "Crear streams: colecciones, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
  "body": [
   "Un stream es una canalización (pipeline) para procesar una secuencia de elementos: una fuente, cero o más operaciones intermedias y una operación terminal. Un stream no guarda datos y no puede reutilizarse; una vez que se ejecuta una operación terminal, llamar otra operación sobre el mismo objeto stream lanza `IllegalStateException`. La primera habilidad es saber cómo crear la fuente.",
   "Desde una colección, llama a `stream()` (o `parallelStream()`): `List.of(\"a\", \"b\").stream()`. Un Map no es una Collection, así que haces stream de una de sus vistas, como `map.entrySet().stream()` o `map.keySet().stream()`. Desde un arreglo usa `Arrays.stream(array)`; para un int[] esto da un `IntStream`, no un `Stream<Integer>`. Desde valores individuales usa `Stream.of(\"a\", \"b\", \"c\")`. `Stream.empty()` crea un stream vacío y `Stream.ofNullable(x)` da un stream con cero elementos si x es null, o con uno en caso contrario.",
   "`IntStream.range(1, 5)` produce 1, 2, 3, 4: el final es exclusivo. `IntStream.rangeClosed(1, 5)` produce del 1 al 5 inclusive. Los mismos métodos existen en LongStream. Son el equivalente en streams de un bucle for que cuenta, y el final exclusivo frente al inclusivo es un detalle favorito del examen.",
   "Los streams también pueden ser infinitos. `Stream.generate(supplier)` llama al supplier para cada elemento, por ejemplo `Stream.generate(() -> \"x\")`. `Stream.iterate(seed, next)` empieza con la semilla y aplica el UnaryOperator repetidamente: `Stream.iterate(1, n -> n * 2)` da 1, 2, 4, 8 y así para siempre. Un stream infinito está bien siempre que una operación de cortocircuito como `limit`, `findFirst` o `anyMatch` lo detenga; llamar a `count()` o `forEach` sobre él sin un límite nunca termina.",
   "La forma de tres argumentos `Stream.iterate(seed, hasNext, next)` funciona como un bucle for y es finita: `Stream.iterate(1, n -> n <= 100, n -> n * 2)` da 1, 2, 4, 8, 16, 32, 64. El predicado se evalúa antes de emitir cada elemento, incluida la semilla. Equivocarse en el orden de los argumentos (next antes que hasNext) no compila porque los tipos difieren.",
   "```java\nStream<String> s1 = Stream.of(\"a\", \"b\", \"c\");\nIntStream s2 = IntStream.rangeClosed(1, 3);          // 1 2 3\nStream<Integer> s3 = Stream.iterate(0, n -> n + 5).limit(4); // 0 5 10 15\nStream<Integer> s4 = Stream.iterate(1, n -> n < 20, n -> n * 3); // 1 3 9\nlong c = s1.count();\n// s1.count();  // IllegalStateException: el stream ya fue operado\n```",
   "Los archivos también producen streams (`Files.lines`, `Files.list`), y `String.chars()` da un IntStream de valores de caracteres. Sea cual sea la fuente, las reglas son las mismas: no pasa nada hasta que se ejecuta una operación terminal, y cada objeto stream es de un solo uso."
  ],
  "terms": [
   [
    "Stream source (fuente del stream)",
    "De dónde vienen los elementos, como una colección, un arreglo, valores de Stream.of, un rango o un generador."
   ],
   [
    "IntStream.range",
    "Produce ints desde el inicio hasta el final, sin incluirlo."
   ],
   [
    "IntStream.rangeClosed",
    "Produce ints desde el inicio hasta el final, incluyéndolo."
   ],
   [
    "Stream.iterate",
    "Construye un stream a partir de una semilla y una función aplicada repetidamente; la forma de dos argumentos es infinita, la de tres argumentos se detiene cuando un predicado falla."
   ],
   [
    "Infinite stream (stream infinito)",
    "Un stream sin final natural, creado con generate o con iterate de dos argumentos, que necesita una operación de cortocircuito para terminar."
   ]
  ],
  "example": "Un banco de pruebas necesita los IDs de pedido del 1 al 50. En lugar de un bucle que llena una lista, usa IntStream.rangeClosed(1, 50).mapToObj(i -> \"ORD-\" + i).toList(), que se lee como una descripción de los datos en lugar de un conjunto de instrucciones.",
  "tip": "Recuerda que range excluye el final y rangeClosed lo incluye, y que un stream es de un solo uso. Una pregunta que guarda un stream en una variable y llama dos operaciones terminales sobre él termina en IllegalStateException.",
  "check": [
   [
    "¿Cuántos elementos produce IntStream.range(3, 3)?",
    "Cero. El final es exclusivo, así que un rango cuyo inicio es igual a su final está vacío."
   ],
   [
    "¿Qué produce Stream.iterate(2, n -> n < 10, n -> n + 3)?",
    "2, 5, 8. El siguiente valor, 11, no cumple el predicado, así que el stream termina."
   ],
   [
    "¿Qué ocurre si llamas a count() sobre Stream.generate(() -> 1) sin limit?",
    "Nunca termina, porque el stream es infinito y count debe consumir cada elemento."
   ]
  ]
 },
 {
  "t": "Intermediate operations and lazy evaluation: filter, map, flatMap, peek, sorted, distinct, limit",
  "tt": "Operaciones intermedias y evaluación perezosa: filter, map, flatMap, peek, sorted, distinct, limit",
  "body": [
   "Las operaciones intermedias transforman un stream en otro stream. Son perezosas (lazy): llamar a `filter` o `map` solo registra un paso en la canalización. Ningún elemento se procesa hasta que se ejecuta una operación terminal. Si una canalización no tiene operación terminal, ninguna de sus lambdas se ejecuta jamás, y por eso una pregunta con solo `peek(System.out::println)` y sin operación terminal no imprime nada.",
   "`filter(Predicate)` conserva los elementos para los que el predicado devuelve true. `map(Function)` convierte cada elemento en exactamente un elemento nuevo, posiblemente de otro tipo. `flatMap(Function)` convierte cada elemento en un stream y luego aplana todos esos streams en uno, así que un `Stream<List<String>>` se convierte en un `Stream<String>` con `flatMap(List::stream)`. `mapToInt`, `mapToObj` y similares cambian entre streams de objetos y primitivos.",
   "`distinct()` elimina duplicados usando `equals` (y `hashCode`). `sorted()` ordena por orden natural y requiere que los elementos sean Comparable; de lo contrario ocurre una `ClassCastException` cuando se ejecuta la operación terminal; `sorted(Comparator)` usa el orden proporcionado. `limit(n)` deja pasar como máximo n elementos y `skip(n)` descarta los primeros n. `peek(Consumer)` ejecuta una acción sobre cada elemento a medida que pasa y devuelve los mismos elementos; está pensado para depuración, no para cambiar estado.",
   "La pereza tiene un efecto visible en el orden. Los elementos fluyen por la canalización de uno en uno, en vertical, en lugar de que cada operación termine con todos los elementos antes de que empiece la siguiente. Con `limit`, el procesamiento se detiene en cuanto han pasado suficientes elementos, así que los pasos anteriores pueden ejecutarse solo sobre unos pocos elementos. Esto es también lo que permite que funcionen los streams infinitos.",
   "```java\nStream.of(\"b\", \"a\", \"c\", \"d\")\n      .peek(s -> System.out.print(\"p\" + s + \" \"))\n      .filter(s -> !s.equals(\"a\"))\n      .map(String::toUpperCase)\n      .limit(2)\n      .forEach(s -> System.out.print(s + \" \"));\n// imprime: pb B pa pc C\n// \"d\" nunca pasa por peek: limit(2) ya se había cumplido\n```",
   "`sorted` y `distinct` tienen estado (stateful): deben recordar los elementos que han visto. `sorted` en particular tiene que ver todos los elementos antes de poder emitir el primero, así que en una canalización con `sorted` todos los pasos anteriores se ejecutan primero sobre todos los elementos, y `sorted` sobre un stream infinito nunca termina aunque haya un `limit` después. Pon `limit` antes de `sorted` cuando quieras ordenar solo los primeros elementos de una fuente infinita.",
   "Las operaciones intermedias nunca modifican la colección de origen. `list.stream().map(String::toUpperCase)` deja la lista sin cambios; debes recolectar el resultado en una colección nueva si quieres conservarlo."
  ],
  "terms": [
   [
    "Lazy evaluation (evaluación perezosa)",
    "Las operaciones intermedias se ejecutan solo cuando una operación terminal hace pasar los elementos por la canalización."
   ],
   [
    "flatMap",
    "Asocia cada elemento a un stream y concatena los streams resultantes en un único stream."
   ],
   [
    "Stateful operation (operación con estado)",
    "Una operación intermedia como sorted o distinct que debe llevar registro de los elementos que ya ha visto."
   ],
   [
    "Short-circuiting operation (operación de cortocircuito)",
    "Una operación como limit que puede terminar sin procesar todos los elementos."
   ],
   [
    "peek",
    "Una operación intermedia que ejecuta una acción sobre cada elemento a medida que pasa, principalmente para depuración."
   ]
  ],
  "example": "Un analizador de logs lee millones de líneas pero solo necesita las primeras cinco líneas de error. Como los streams son perezosos, lines().filter(l -> l.contains(\"ERROR\")).limit(5) deja de leer en cuanto encuentra cinco coincidencias en lugar de recorrer todo el archivo.",
  "tip": "Rastrea las preguntas de salida elemento por elemento, no operación por operación, y revisa si hay alguna operación terminal. Cuidado también con sorted sobre un stream infinito, que se cuelga aunque haya un limit después.",
  "check": [
   [
    "¿Qué imprime Stream.of(1, 2, 3).peek(System.out::println);?",
    "Nada. No hay operación terminal, así que la canalización perezosa nunca se ejecuta."
   ],
   [
    "¿Cómo conviertes un List<List<Integer>> en un Stream<Integer>?",
    "listOfLists.stream().flatMap(List::stream)."
   ],
   [
    "¿Por qué Stream.iterate(1, n -> n + 1).sorted().limit(3).toList() nunca termina?",
    "sorted debe ver todos los elementos antes de emitir alguno, y la fuente es infinita."
   ]
  ]
 },
 {
  "t": "Terminal operations: forEach, reduce, collect, count, findFirst, anyMatch, toList",
  "tt": "Operaciones terminales: forEach, reduce, collect, count, findFirst, anyMatch, toList",
  "body": [
   "Una operación terminal cierra una canalización, dispara el procesamiento y produce un resultado o un efecto secundario. Después de ejecutarse, el stream queda consumido. Conocer el tipo de retorno de cada operación es esencial, porque el código del examen a menudo asigna el resultado a una variable del tipo equivocado.",
   "`forEach(Consumer)` ejecuta una acción sobre cada elemento y devuelve void. `count()` devuelve un long. `min(Comparator)` y `max(Comparator)` devuelven un `Optional<T>`, porque el stream podría estar vacío. `findFirst()` y `findAny()` también devuelven Optional; `findFirst` respeta el orden de recorrido, mientras que `findAny` puede devolver cualquier elemento y es más barato en streams paralelos. `toList()` devuelve un List no modificable que contiene los elementos en orden; agregarle algo lanza `UnsupportedOperationException`.",
   "`anyMatch`, `allMatch` y `noneMatch` reciben un Predicate y devuelven un boolean. Hacen cortocircuito: `anyMatch` se detiene en el primer true, `allMatch` en el primer false. En un stream vacío `anyMatch` devuelve false mientras que `allMatch` y `noneMatch` devuelven true (no hay contraejemplo). Las operaciones terminales de cortocircuito como estas y los métodos find pueden terminar sobre un stream infinito; `count` y `forEach` no.",
   "`reduce` combina todos los elementos en un solo valor. Hay tres formas. `reduce(identity, accumulator)` devuelve un T y usa la identidad como valor inicial y como resultado para un stream vacío: `Stream.of(1, 2, 3).reduce(0, Integer::sum)` es 6. `reduce(accumulator)` no tiene identidad, así que devuelve `Optional<T>`, vacío si el stream está vacío. `reduce(identity, accumulator, combiner)` permite que el tipo del resultado difiera del tipo de los elementos, y el combinador fusiona resultados parciales en streams paralelos.",
   "`collect` realiza una reducción mutable hacia un contenedor. Lo más habitual es pasar un Collector como `Collectors.toList()`, `toSet()`, `joining()` o `groupingBy(...)`. También hay una forma de tres argumentos `collect(supplier, accumulator, combiner)`, por ejemplo `collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)`. A diferencia de `toList()`, `Collectors.toList()` no promete nada sobre la mutabilidad; `Collectors.toUnmodifiableList()` la hace explícitamente no modificable.",
   "```java\nList<String> names = List.of(\"Ana\", \"Bo\", \"Cy\");\nlong n = names.stream().filter(s -> s.length() == 2).count();       // 2\nOptional<String> f = names.stream().findFirst();                     // Optional[Ana]\nboolean any = names.stream().anyMatch(s -> s.startsWith(\"B\"));    // true\nint total = names.stream().map(String::length).reduce(0, Integer::sum); // 7\nOptional<Integer> none = Stream.<Integer>empty().reduce(Integer::sum);  // Optional.empty\nList<String> up = names.stream().map(String::toUpperCase).toList();\n```"
  ],
  "terms": [
   [
    "Terminal operation (operación terminal)",
    "La operación final de una canalización que dispara el procesamiento y produce un resultado o un efecto secundario."
   ],
   [
    "reduce",
    "Combina los elementos en un solo valor con un acumulador, opcionalmente partiendo de un valor identidad."
   ],
   [
    "Identity value (valor identidad)",
    "Un valor inicial que no cambia el resultado al combinarse, como 0 para la suma o \"\" para la concatenación."
   ],
   [
    "collect",
    "Una reducción mutable que reúne los elementos en un contenedor, normalmente mediante un Collector."
   ],
   [
    "Stream.toList()",
    "Una operación terminal que devuelve un List no modificable con los elementos del stream."
   ]
  ],
  "example": "Un servicio de pago comprueba cart.stream().anyMatch(Item::isRestricted) antes de pedir la verificación de edad, calcula el total con map(Item::price).reduce(BigDecimal.ZERO, BigDecimal::add) y construye las líneas del recibo con toList().",
  "tip": "Conoce los tipos de retorno: count es long; min, max, findFirst, findAny y reduce de un argumento devuelven Optional; los métodos match devuelven boolean; y allMatch sobre un stream vacío es true.",
  "check": [
   [
    "¿Qué tipo devuelve Stream.of(3, 1, 2).max(Comparator.naturalOrder())?",
    "Optional<Integer>, que aquí contiene 3."
   ],
   [
    "¿Qué devuelve Stream.<String>empty().allMatch(s -> s.isEmpty())?",
    "true. Sin elementos, nada viola el predicado."
   ],
   [
    "¿Qué ocurre cuando llamas a add sobre la lista devuelta por stream.toList()?",
    "Lanza UnsupportedOperationException porque la lista no es modificable."
   ]
  ]
 },
 {
  "t": "Collectors: groupingBy, partitioningBy, counting, joining, toMap and merge functions",
  "tt": "Collectors: groupingBy, partitioningBy, counting, joining, toMap y funciones de fusión",
  "body": [
   "La clase `Collectors` proporciona recetas listas para usar que pasas a `collect`. Las simples reúnen los elementos en un contenedor: `toList()`, `toSet()`, `toCollection(TreeSet::new)`. `joining()` concatena un stream de valores CharSequence; `joining(\", \")` agrega un delimitador, y `joining(\", \", \"[\", \"]\")` agrega un prefijo y un sufijo. Unir un stream vacío con prefijo y sufijo da solo \"[]\".",
   "`groupingBy(classifier)` construye un `Map<K, List<T>>`: la función clasificadora calcula una clave para cada elemento, y los elementos con la misma clave van a la misma lista. Solo aparecen en el map las claves que realmente ocurren. Un segundo argumento es un collector descendente (downstream) que procesa cada grupo en lugar de listarlo: `groupingBy(String::length, Collectors.counting())` da un `Map<Integer, Long>`. Una forma de tres argumentos agrega una fábrica de map, `groupingBy(f, TreeMap::new, toList())`, cuando necesitas claves ordenadas; de lo contrario el tipo de map no está especificado (en la práctica un HashMap).",
   "`partitioningBy(predicate)` es una agrupación especial con solo dos claves, true y false, que devuelve `Map<Boolean, List<T>>`. A diferencia de groupingBy, ambas claves siempre están presentes, aunque una lista esté vacía. También acepta un collector descendente. Entre los collectors descendentes útiles están `counting()` (que produce un Long, no un Integer), `summingInt`, `averagingInt` (siempre un Double), `mapping(f, toList())`, `maxBy(comparator)` (un Optional) y `toSet()`.",
   "`toMap(keyMapper, valueMapper)` construye un map donde tú eliges tanto la clave como el valor. Si dos elementos producen la misma clave, lanza `IllegalStateException` por clave duplicada. Para manejar las colisiones, agrega una función de fusión, un BinaryOperator que combina el valor viejo y el nuevo: `toMap(k, v, (a, b) -> a + b)` o `(a, b) -> a` para conservar el primero. Un cuarto argumento proporciona el tipo de map, como `TreeMap::new`.",
   "```java\nList<String> words = List.of(\"apple\", \"avocado\", \"banana\", \"cherry\", \"blueberry\");\nMap<Character, List<String>> byLetter =\n    words.stream().collect(Collectors.groupingBy(w -> w.charAt(0)));\n// {a=[apple, avocado], b=[banana, blueberry], c=[cherry]}\nMap<Boolean, Long> longOnes =\n    words.stream().collect(Collectors.partitioningBy(w -> w.length() > 6, Collectors.counting()));\n// {false=3, true=2}\nMap<Character, Integer> totalLen = words.stream().collect(\n    Collectors.toMap(w -> w.charAt(0), String::length, Integer::sum));\n// {a=12, b=15, c=6}\nString csv = words.stream().collect(Collectors.joining(\",\", \"<\", \">\"));\n```",
   "Al leer una pregunta, determina el tipo genérico exacto del map resultante. `groupingBy` sin collector descendente da valores List; con `counting()` da valores Long; con `mapping(..., toSet())` da valores Set. Asignar un resultado `Map<Boolean, List<String>>` a una variable `Map<String, List<String>>` no compila."
  ],
  "terms": [
   [
    "groupingBy",
    "Un collector que agrupa los elementos según un clasificador en un Map cuyos valores son listas o el resultado de un collector descendente."
   ],
   [
    "partitioningBy",
    "Un collector que divide los elementos en un Map<Boolean, ...> con las claves true y false siempre presentes."
   ],
   [
    "Downstream collector (collector descendente)",
    "Un collector pasado a groupingBy o partitioningBy que procesa cada grupo, como counting o mapping."
   ],
   [
    "Merge function (función de fusión)",
    "Un BinaryOperator dado a toMap que decide el valor cuando dos elementos se asocian a la misma clave."
   ],
   [
    "joining",
    "Un collector que concatena cadenas con un delimitador, prefijo y sufijo opcionales."
   ]
  ],
  "example": "Un tablero de mesa de ayuda agrupa los tickets con groupingBy(Ticket::priority, counting()) para mostrar cuántos hay abiertos en cada prioridad, y los particiona con partitioningBy(Ticket::isOverdue) para que la lista de vencidos siempre esté presente aunque esté vacía.",
  "tip": "toMap sin función de fusión lanza IllegalStateException ante una clave duplicada. counting() produce Long, y averagingX produce Double; las respuestas del examen suelen usar Integer en su lugar.",
  "check": [
   [
    "¿Cuál es el tipo de stream.collect(groupingBy(String::length, counting())) para un Stream<String>?",
    "Map<Integer, Long>."
   ],
   [
    "Si ningún elemento cumple el predicado, ¿qué devuelve partitioningBy?",
    "Un map con ambas claves: true asociada a una lista vacía y false asociada a todos los elementos."
   ],
   [
    "¿Cómo conservas el primer valor cuando toMap encuentra claves duplicadas?",
    "Proporcionando una función de fusión (a, b) -> a como tercer argumento."
   ]
  ]
 },
 {
  "t": "Primitive streams and summary statistics",
  "tt": "Streams primitivos y estadísticas resumidas",
  "body": [
   "Java tiene tres tipos de streams primitivos: `IntStream`, `LongStream` y `DoubleStream`. Existen para evitar el costo de hacer boxing de cada número en un objeto Integer, Long o Double, y agregan operaciones numéricas que `Stream<T>` no tiene, como `sum()`, `average()` y `summaryStatistics()`. No existen CharStream, ByteStream ni FloatStream; `String.chars()` devuelve un IntStream.",
   "Te mueves entre streams de objetos y primitivos con métodos de mapeo. Desde `Stream<T>` usa `mapToInt(ToIntFunction)`, `mapToLong` o `mapToDouble`. Desde un stream primitivo de vuelta a objetos usa `mapToObj(IntFunction)` o `boxed()`, que convierte un IntStream en un `Stream<Integer>`. Entre tipos primitivos usa `asLongStream()`, `asDoubleStream()` o `mapToLong` y similares. `map` sobre un IntStream debe devolver un int (recibe un IntUnaryOperator).",
   "Los tipos de retorno son un tema frecuente del examen. En un IntStream, `sum()` devuelve int, y en un LongStream devuelve long. `average()` devuelve `OptionalDouble` para todos los tipos de stream primitivo, porque el promedio de números enteros puede tener decimales y un stream vacío no tiene promedio. `max()` y `min()` en un IntStream devuelven `OptionalInt`, que se lee con `getAsInt()`, no con `get()`. `count()` sigue siendo long.",
   "Cuando necesitas varias estadísticas, llamar a `sum()` y luego a `max()` falla porque un stream solo puede usarse una vez. En su lugar llama a `summaryStatistics()`, que hace una sola pasada y devuelve un `IntSummaryStatistics` (o la versión Long o Double) con `getCount()`, `getSum()`, `getMin()`, `getMax()` y `getAverage()`. En IntSummaryStatistics, `getSum()` devuelve un long para que los totales grandes no se desborden.",
   "```java\nint[] scores = {70, 85, 90};\nIntSummaryStatistics st = Arrays.stream(scores).summaryStatistics();\nst.getMin();     // 70\nst.getMax();     // 90\nst.getAverage(); // 81.666...\nst.getSum();     // 245 (un long)\n\nOptionalDouble avg = IntStream.empty().average(); // OptionalDouble.empty\nint total = Stream.of(\"a\", \"bb\").mapToInt(String::length).sum(); // 3\nList<Integer> boxed = IntStream.range(0, 3).boxed().toList();\n```",
   "Para un stream vacío, las estadísticas resumidas no lanzan excepciones. El conteo y la suma son 0 y el promedio es 0.0, mientras que `getMin()` devuelve `Integer.MAX_VALUE` y `getMax()` devuelve `Integer.MIN_VALUE`, los valores iniciales antes de ver cualquier elemento. Eso es distinto de `IntStream.empty().max()`, que devuelve un OptionalInt vacío. Los collectors equivalentes `Collectors.summarizingInt(...)` producen el mismo objeto de estadísticas a partir de un Stream de objetos."
  ],
  "terms": [
   [
    "IntStream",
    "Un stream de valores int primitivos con operaciones numéricas como sum, average y summaryStatistics."
   ],
   [
    "OptionalDouble",
    "Un contenedor tipo Optional para un double, devuelto por average() en los streams primitivos; se lee con getAsDouble()."
   ],
   [
    "boxed()",
    "Convierte un stream primitivo en un stream de los objetos envoltorio correspondientes."
   ],
   [
    "IntSummaryStatistics",
    "Un objeto que contiene el conteo, la suma, el mínimo, el máximo y el promedio calculados en una sola pasada."
   ],
   [
    "mapToInt",
    "Convierte un Stream<T> en un IntStream usando una ToIntFunction."
   ]
  ],
  "example": "Un monitor de sensores lee temperaturas como un DoubleStream y llama a summaryStatistics() una vez por minuto para registrar el mínimo, el máximo y el promedio en una sola pasada, en lugar de reabrir los datos tres veces.",
  "tip": "average() siempre devuelve OptionalDouble, sum() en IntStream devuelve int y OptionalInt usa getAsInt(). Las respuestas que asignan average() a un double o llaman a get() sobre un OptionalInt no compilan.",
  "check": [
   [
    "¿Qué devuelve IntStream.of(1, 2).average()?",
    "Un OptionalDouble que contiene 1.5."
   ],
   [
    "¿Qué devuelve getMax() en las estadísticas resumidas de un IntStream vacío?",
    "Integer.MIN_VALUE; no lanza ninguna excepción."
   ],
   [
    "¿Cómo conviertes un IntStream en un List<Integer>?",
    "Llama a boxed() y luego a una operación terminal como toList() o collect(Collectors.toList())."
   ]
  ]
 },
 {
  "t": "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
  "tt": "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
  "body": [
   "`Optional<T>` es un contenedor que o bien guarda un valor no null o está vacío. Métodos como `findFirst`, `max` y `reduce` lo devuelven para que quien llama deba pensar en el caso sin resultado en lugar de recibir un null inesperado. Está pensado principalmente como tipo de retorno; usarlo para campos o parámetros de métodos no se recomienda.",
   "Hay tres formas de crear uno. `Optional.of(value)` requiere un valor no null y lanza `NullPointerException` si recibe null. `Optional.ofNullable(value)` devuelve un Optional vacío para null y uno lleno en caso contrario, así que úsalo cuando el valor podría faltar. `Optional.empty()` devuelve directamente un Optional vacío.",
   "Para comprobar y usar el valor, `isPresent()` e `isEmpty()` devuelven booleanos, `ifPresent(Consumer)` ejecuta una acción solo si hay un valor, e `ifPresentOrElse(Consumer, Runnable)` maneja ambos casos. `get()` devuelve el valor o lanza `NoSuchElementException` si está vacío, por eso es mejor evitarlo en favor de los métodos de abajo. El `orElseThrow()` sin argumentos hace exactamente lo mismo que `get()`, pero su nombre deja claro el riesgo.",
   "`map(Function)` transforma el valor si está presente y devuelve un Optional nuevo; si el Optional está vacío, o la función devuelve null, el resultado está vacío. `flatMap` es para funciones que ya devuelven un Optional, así no terminas con `Optional<Optional<T>>`. `filter(Predicate)` conserva el valor solo si cumple la condición. Estos te permiten encadenar pasos sin escribir comprobaciones de null.",
   "Obtener un valor alternativo tiene tres variantes y la diferencia se evalúa. `orElse(other)` devuelve el valor u `other`, pero la expresión del argumento siempre se evalúa, incluso cuando el Optional tiene un valor. `orElseGet(Supplier)` llama al supplier solo cuando el Optional está vacío, así que es la elección correcta cuando el valor por defecto es costoso o tiene efectos secundarios. `orElseThrow(Supplier)` lanza la excepción que crea el supplier cuando está vacío, por ejemplo `orElseThrow(() -> new IllegalArgumentException(\"no user\"))`.",
   "```java\nOptional<String> name = Optional.ofNullable(lookup(id));\nint len = name.map(String::length).orElse(0);\nString n1 = name.orElse(loadDefault());          // loadDefault() siempre se ejecuta\nString n2 = name.orElseGet(() -> loadDefault()); // se ejecuta solo si está vacío\nString n3 = name.orElseThrow();                  // NoSuchElementException si está vacío\n// Optional.of(null);  // NullPointerException\n```",
   "Las versiones primitivas `OptionalInt`, `OptionalLong` y `OptionalDouble` vienen de los streams primitivos. Tienen `getAsInt()` y similares en lugar de `get()`, y no tienen `map`, `flatMap` ni `filter`."
  ],
  "terms": [
   [
    "Optional.of",
    "Crea un Optional que contiene un valor no null; lanza NullPointerException si el valor es null."
   ],
   [
    "Optional.ofNullable",
    "Crea un Optional que está vacío si el valor es null y lleno en caso contrario."
   ],
   [
    "orElse",
    "Devuelve el valor o un valor alternativo; la expresión alternativa se evalúa siempre."
   ],
   [
    "orElseGet",
    "Devuelve el valor o llama a un Supplier para producir un valor alternativo solo cuando está vacío."
   ],
   [
    "orElseThrow",
    "Devuelve el valor o lanza una excepción: NoSuchElementException sin argumento, o la excepción proporcionada."
   ]
  ],
  "example": "Un servicio de usuarios devuelve Optional<User> desde findByEmail. El controlador escribe findByEmail(email).map(User::displayName).orElseGet(() -> \"Guest\"), así que no necesita comprobar null, y la API de administración usa orElseThrow(() -> new NotFoundException(email)) para convertir la ausencia en una respuesta 404.",
  "tip": "La trampa clásica: orElse(expensiveCall()) ejecuta expensiveCall() incluso cuando el Optional tiene un valor; orElseGet no. Además, Optional.of(null) lanza una excepción de inmediato, mientras que ofNullable(null) queda vacío.",
  "check": [
   [
    "¿Qué devuelve Optional.ofNullable(null).map(String::length).orElse(-1)?",
    "-1. El Optional está vacío, así que map devuelve un Optional vacío y orElse proporciona el valor alternativo."
   ],
   [
    "¿Qué lanza orElseThrow() sin argumentos sobre un Optional vacío?",
    "NoSuchElementException, igual que get()."
   ]
  ]
 },
 {
  "t": "Stream Gatherers (Java 24+): gather() with Gatherers.windowFixed, windowSliding, fold, scan",
  "tt": "Stream Gatherers (Java 24+): gather() con Gatherers.windowFixed, windowSliding, fold, scan",
  "body": [
   "Los Stream Gatherers se finalizaron en Java 24. Agregan una nueva operación intermedia, `Stream.gather(Gatherer)`, que te permite conectar transformaciones personalizadas que las operaciones integradas no pueden expresar, como agrupar elementos vecinos en ventanas o emitir totales acumulados. Así como `collect` con un Collector es una operación terminal flexible, `gather` con un Gatherer es una operación intermedia flexible: el stream continúa después.",
   "Un Gatherer puede transformar elementos uno a uno, uno a muchos, muchos a uno o muchos a muchos, puede mantener estado entre elementos y puede detenerse antes. Internamente se describe con hasta cuatro funciones: un inicializador que crea el estado privado, un integrador que recibe cada elemento (y puede enviar resultados hacia adelante), un combinador opcional para uso en paralelo y un finalizador opcional que puede emitir resultados finales después del último elemento. Para el examen rara vez escribes uno tú mismo; usas los integrados en `java.util.stream.Gatherers`.",
   "`Gatherers.windowFixed(n)` agrupa los elementos en listas consecutivas, sin solaparse, de tamaño n; la última lista puede ser más corta. `Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(2))` produce [1, 2], [3, 4], [5]. `Gatherers.windowSliding(n)` produce ventanas solapadas que avanzan un elemento a la vez: `windowSliding(3)` sobre 1..5 da [1, 2, 3], [2, 3, 4], [3, 4, 5]. Si el stream tiene menos de n elementos, windowSliding emite una ventana que los contiene a todos. Ambos dan como resultado un `Stream<List<T>>`, y un tamaño de ventana menor que 1 lanza `IllegalArgumentException`.",
   "`Gatherers.fold(initial, folder)` es un gatherer de muchos a uno: empieza con el valor que proporciona el Supplier, combina cada elemento en orden y emite un solo resultado al final, produciendo un stream de un elemento. Se parece a `reduce`, pero sigue funcionando en medio de una canalización y el tipo del resultado puede diferir del tipo de los elementos. `Gatherers.scan(initial, scanner)` es similar pero emite cada resultado intermedio, dando un total acumulado. Scan no emite el valor inicial por sí solo.",
   "```java\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.scan(() -> 0, (acc, x) -> acc + x))\n      .toList();                               // [1, 3, 6, 10]\n\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.fold(() -> \"\", (acc, x) -> acc + x))\n      .findFirst();                            // Optional[1234]\n\nIntStream.rangeClosed(1, 7).boxed()\n         .gather(Gatherers.windowFixed(3))\n         .toList();                            // [[1, 2, 3], [4, 5, 6], [7]]\n```",
   "Los gatherers se pueden componer: `g1.andThen(g2)` construye un gatherer a partir de dos, y puedes llamar a `gather` varias veces en una canalización. Observa que `gather` está definido en `Stream<T>`, no en IntStream, así que llama primero a `boxed()` cuando partas de un stream primitivo. También existe `Gatherers.mapConcurrent(maxConcurrency, mapper)`, que ejecuta una función de mapeo de forma concurrente en hilos virtuales manteniendo la salida en el orden de recorrido."
  ],
  "terms": [
   [
    "Gatherer",
    "Un objeto que describe una operación intermedia de stream personalizada mediante un inicializador, un integrador, un combinador y un finalizador."
   ],
   [
    "windowFixed",
    "Un gatherer integrado que agrupa los elementos en listas de tamaño fijo sin solaparse, con una última lista posiblemente más corta."
   ],
   [
    "windowSliding",
    "Un gatherer integrado que emite listas solapadas de tamaño fijo, avanzando un elemento a la vez."
   ],
   [
    "fold",
    "Un gatherer integrado que combina todos los elementos en un solo resultado emitido cuando termina el stream."
   ],
   [
    "scan",
    "Un gatherer integrado que emite el resultado acumulado después de cada elemento, como una suma acumulativa."
   ]
  ],
  "example": "Un trabajo de monitoreo calcula un promedio móvil de tres lecturas de muestras de CPU con gather(Gatherers.windowSliding(3)).map(w -> average(w)), y envía métricas a un servidor en lotes de 100 usando gather(Gatherers.windowFixed(100)).",
  "tip": "Distingue fold de scan por el tamaño de la salida: fold emite un elemento al final, scan emite uno por cada elemento de entrada. En las ventanas, fixed no se solapa y su última ventana puede ser corta; sliding se solapa.",
  "check": [
   [
    "¿Qué produce Stream.of(\"a\",\"b\",\"c\",\"d\",\"e\").gather(Gatherers.windowFixed(2)).toList()?",
    "[[a, b], [c, d], [e]]."
   ],
   [
    "¿Qué emite scan(() -> 10, (a, x) -> a + x) para los elementos 1 y 2?",
    "11 y luego 13; el valor inicial 10 no se emite por sí solo."
   ],
   [
    "¿gather es una operación intermedia o terminal?",
    "Intermedia: devuelve un Stream nuevo, así que todavía se necesita una operación terminal."
   ]
  ]
 },
 {
  "t": "Parallel streams and why stateful lambdas cause problems",
  "tt": "Streams paralelos y por qué las lambdas con estado causan problemas",
  "body": [
   "Un stream paralelo divide su fuente en partes y las procesa en varios hilos a la vez, y luego combina los resultados. Obtienes uno llamando a `parallelStream()` sobre una colección o a `parallel()` sobre un stream existente; `sequential()` vuelve al modo secuencial, e `isParallel()` te indica el modo. Como toda la canalización tiene un solo modo, gana la última llamada a `parallel()` o `sequential()`. Por defecto el trabajo se ejecuta en el ForkJoinPool común.",
   "El paralelismo cambia qué resultados son predecibles. `forEach` sobre un stream paralelo procesa los elementos en el orden en que terminen los hilos, así que imprimir `1 2 3 4 5` puede mostrar `3 5 1 4 2`. Usa `forEachOrdered` si el orden importa, a cierto costo de velocidad. `findAny` puede devolver cualquier elemento, mientras que `findFirst` sigue devolviendo el primero en orden de recorrido. Recolectar con `toList()` o `Collectors.toList()` sigue produciendo los elementos en orden de recorrido, porque cada hilo construye su propio resultado parcial y estos se fusionan en orden.",
   "`reduce` en paralelo requiere las piezas correctas. El acumulador debe ser asociativo, es decir, `(a op b) op c` debe ser igual a `a op (b op c)`; la suma es asociativa, la resta no. La identidad debe ser realmente una identidad para la operación: `reduce(0, Integer::sum)` está bien, pero `reduce(10, Integer::sum)` suma 10 una vez por cada fragmento en paralelo y da una respuesta distinta a la secuencial. Una operación no asociativa da resultados que varían entre ejecuciones.",
   "Una lambda con estado (stateful) es aquella cuyo resultado depende de, o cambia, un estado externo a ella mientras el stream se ejecuta. El error clásico es agregar elementos a un ArrayList compartido desde `forEach` o `map`. ArrayList no es seguro para hilos (thread-safe), así que en paralelo puedes perder elementos, obtener duplicados o entradas null, o incluso ver una `ArrayIndexOutOfBoundsException`. Incluso con una lista sincronizada, el orden se vuelve impredecible. Contar con un `int[]` compartido o un campo no atómico tiene la misma condición de carrera.",
   "```java\nList<Integer> bad = new ArrayList<>();\nIntStream.range(0, 10_000).parallel().forEach(bad::add); // inseguro: el tamaño suele ser < 10000\n\nList<Integer> good = IntStream.range(0, 10_000).parallel()\n                              .boxed().toList();         // seguro y ordenado\n```",
   "La solución es dejar que el stream haga la acumulación mediante `collect`, `toList`, `reduce` o `sum`, que están diseñados para dar a cada hilo su propio contenedor y fusionarlos de forma segura. Mantén las lambdas sin estado y libres de efectos secundarios. Recuerda también que paralelo no es automáticamente más rápido: con pocos datos, o con fuentes que se dividen mal como un LinkedList o `Stream.iterate`, el costo de dividir y fusionar puede hacerlo más lento. La E/S bloqueante dentro de un stream paralelo también puede dejar sin hilos al pool común compartido."
  ],
  "terms": [
   [
    "Parallel stream (stream paralelo)",
    "Un stream cuyas operaciones se ejecutan en varios hilos, por defecto en el ForkJoinPool común."
   ],
   [
    "forEachOrdered",
    "Una operación terminal que procesa los elementos en orden de recorrido incluso en un stream paralelo."
   ],
   [
    "Associative operation (operación asociativa)",
    "Una operación donde la agrupación no importa, (a op b) op c = a op (b op c), requerida para un reduce paralelo correcto."
   ],
   [
    "Stateful lambda (lambda con estado)",
    "Una lambda que lee o modifica estado mutable compartido durante la ejecución del stream, lo cual es inseguro en paralelo."
   ]
  ],
  "example": "Un desarrollador acelera un reporte cambiando a parallelStream() pero mantiene results.add(row) dentro de forEach. A veces el reporte muestra 9,987 filas en lugar de 10,000. Reemplazar el efecto secundario por .map(this::toRow).toList() corrige tanto las filas faltantes como el orden.",
  "tip": "En las preguntas de salida con streams paralelos, el orden de forEach es impredecible, findAny es impredecible, pero collect/toList mantienen el orden de recorrido. Un reduce con un valor inicial que no es identidad da un resultado distinto en paralelo.",
  "check": [
   [
    "¿Por qué List.of(1,2,3).parallelStream().forEach(System.out::print) podría no imprimir 123?",
    "forEach sobre un stream paralelo no garantiza el orden de recorrido; forEachOrdered sí."
   ],
   [
    "¿Es seguro reduce(0, (a, b) -> a - b) para un stream paralelo?",
    "No. La resta no es asociativa, así que dividir el trabajo puede producir un resultado distinto."
   ],
   [
    "¿Cuál es el reemplazo seguro de agregar a un ArrayList compartido dentro de forEach?",
    "Usar una operación terminal de recolección como toList() o collect(Collectors.toList())."
   ]
  ]
 },
 {
  "t": "Module-info.java: module, requires, requires transitive, exports, opens",
  "tt": "Module-info.java: module, requires, requires transitive, exports, opens",
  "body": [
   "El Java Platform Module System (JPMS), introducido en Java 9, agrupa paquetes en módulos con nombre con dependencias explícitas y APIs públicas explícitas. Un módulo se describe con un archivo llamado `module-info.java` colocado en la raíz de la carpeta de fuentes del módulo, junto a los directorios de los paquetes de nivel superior. Se compila a `module-info.class`. El nombre del módulo suele seguir el estilo de dominio invertido, como `com.shop.orders`, y debe ser único en el module path.",
   "```java\nmodule com.shop.orders {\n    requires java.sql;\n    requires transitive com.shop.model;\n    exports com.shop.orders.api;\n    exports com.shop.orders.spi to com.shop.plugins;\n    opens com.shop.orders.entity;\n}\n```",
   "`requires M` indica que este módulo depende del módulo M y puede leer los paquetes que M exporta. Todo módulo requiere implícitamente `java.base`, así que nunca necesitas escribirlo. `requires transitive M` hace lo mismo y además transmite la dependencia: cualquier módulo que requiera este módulo lee automáticamente M también. Úsalo cuando tu API exportada expone tipos de M, como un método público que devuelve un tipo de `com.shop.model`. `requires static M` significa que M se necesita en tiempo de compilación pero es opcional en tiempo de ejecución.",
   "`exports P` hace que los tipos públicos del paquete P sean accesibles para otros módulos en tiempo de compilación y de ejecución. Los paquetes que no se exportan están encapsulados: ni siquiera sus clases públicas pueden usarse desde fuera del módulo. `exports P to M1, M2` es una exportación calificada que da acceso solo a los módulos listados. Las exportaciones funcionan sobre paquetes, no sobre clases, y no sobre subpaquetes: exportar `com.shop` no exporta `com.shop.util`.",
   "`opens P` trata sobre la reflexión. Un paquete exportado permite el acceso normal a los miembros públicos, pero la reflexión profunda, como un framework que llama a `setAccessible(true)` sobre campos private, requiere que el paquete esté abierto. `opens` concede acceso reflexivo solo en tiempo de ejecución a todos los miembros, incluidos los private, pero ningún acceso en tiempo de compilación. `opens P to M` lo limita a módulos específicos, y declarar `open module X { ... }` abre todos los paquetes del módulo. No puedes usar sentencias `opens` dentro de un módulo abierto.",
   "Otras dos reglas se evalúan con frecuencia. El grafo de módulos no puede tener ciclos entre directivas `requires`, y un paquete puede estar solo en uno de los módulos que lee un módulo dado; dos módulos que contienen el mismo paquete, lo que se llama paquete dividido (split package), causan un error. Las demás directivas, `uses` y `provides ... with`, tratan sobre servicios y se cubren en la siguiente lección."
  ],
  "terms": [
   [
    "module-info.java",
    "El archivo de declaración del módulo en la raíz de sus fuentes, que nombra el módulo y sus directivas."
   ],
   [
    "requires transitive",
    "Declara una dependencia y la hace legible para todo módulo que requiera este módulo (legibilidad implícita)."
   ],
   [
    "exports",
    "Hace que los tipos públicos de un paquete sean accesibles para otros módulos; opcionalmente limitado con una cláusula to."
   ],
   [
    "opens",
    "Permite la reflexión profunda en tiempo de ejecución, incluidos los miembros private, sobre un paquete sin conceder acceso en tiempo de compilación."
   ],
   [
    "Strong encapsulation (encapsulamiento fuerte)",
    "La regla según la cual los paquetes no exportados son inaccesibles para otros módulos aunque sus clases sean public."
   ]
  ],
  "example": "Un módulo de pedidos expone com.shop.orders.api para otros equipos, mantiene oculto com.shop.orders.internal al no exportarlo, y abre com.shop.orders.entity para que un framework de persistencia pueda asignar por reflexión los campos private de sus clases de entidad.",
  "tip": "exports controla el acceso ordinario y aplica en tiempo de compilación y de ejecución; opens controla la reflexión solo en tiempo de ejecución. Si la firma de un método exportado usa tipos de otro módulo, esa dependencia debería ser requires transitive.",
  "check": [
   [
    "El módulo A hace requires transitive B, y el módulo C hace requires A. ¿Puede C usar los tipos exportados de B sin requerir B?",
    "Sí. requires transitive le da a C legibilidad implícita de B."
   ],
   [
    "Un paquete está exportado pero no abierto. ¿Puede un framework leer por reflexión sus campos private?",
    "No. La reflexión profunda sobre miembros private necesita que el paquete esté abierto."
   ],
   [
    "¿Necesitas escribir requires java.base?",
    "No. Todo módulo requiere java.base implícitamente."
   ]
  ]
 },
 {
  "t": "Services: uses, provides ... with, and ServiceLoader",
  "tt": "Servicios: uses, provides ... with y ServiceLoader",
  "body": [
   "Un servicio permite que un módulo use una implementación sin saber, en tiempo de compilación, qué módulo la proporciona. Es el mecanismo de plugins integrado de Java. Hay cuatro roles: el tipo de servicio (normalmente una interfaz) en un paquete exportado, el consumidor que lo usa, uno o más módulos proveedores que lo implementan, y `java.util.ServiceLoader`, que encuentra los proveedores en tiempo de ejecución. Esto mantiene al consumidor débilmente acoplado: puedes agregar o quitar un JAR proveedor del module path sin recompilar el consumidor.",
   "El módulo consumidor declara `uses` con la interfaz del servicio, y requiere el módulo que define la interfaz. Un módulo proveedor declara `provides <interfaz> with <clase de implementación>`. La clase de implementación no necesita estar en un paquete exportado, lo que la mantiene oculta para todos excepto para el ServiceLoader. El proveedor también debe requerir el módulo que contiene la interfaz.",
   "```java\n// module com.pay.api\nmodule com.pay.api { exports com.pay.api; }            // contiene la interfaz PaymentGateway\n\n// proveedor\nmodule com.pay.stripe {\n    requires com.pay.api;\n    provides com.pay.api.PaymentGateway with com.pay.stripe.internal.StripeGateway;\n}\n\n// consumidor\nmodule com.shop.app {\n    requires com.pay.api;\n    uses com.pay.api.PaymentGateway;\n}\n```",
   "En el código del consumidor, `ServiceLoader.load(PaymentGateway.class)` devuelve un ServiceLoader que es Iterable sobre las instancias de los proveedores, así que un bucle for-each crea y devuelve cada implementación. `findFirst()` devuelve un `Optional<PaymentGateway>`, vacío si no hay ninguno. `stream()` devuelve un `Stream<ServiceLoader.Provider<PaymentGateway>>`; cada Provider tiene `type()` para inspeccionar la clase sin instanciarla y `get()` para crear la instancia. Eso te permite filtrar proveedores por anotación o por clase antes de crear ninguno.",
   "La clase proveedora debe tener un constructor public sin argumentos o un método public static sin argumentos llamado `provider()` que devuelva una instancia. Si el módulo consumidor olvida la directiva `uses`, llamar a `ServiceLoader.load` para ese servicio lanza un `ServiceConfigurationError`. La carga ocurre de forma perezosa y el loader guarda las instancias en caché; `reload()` limpia la caché.",
   "Para el código en el class path, el mecanismo antiguo sigue funcionando: un archivo de texto llamado `META-INF/services/` seguido del nombre completamente calificado de la interfaz, que lista los nombres de las clases de implementación. Los JAR modulares usan `provides` en su lugar. El examen espera que sepas qué módulo declara cada directiva: `uses` en el consumidor, `provides ... with` en el proveedor, y `exports` del paquete de la interfaz en el módulo de la API."
  ],
  "terms": [
   [
    "Service interface (interfaz de servicio)",
    "El tipo, normalmente una interfaz en un paquete exportado, del que dependen los consumidores y que implementan los proveedores."
   ],
   [
    "uses",
    "Una directiva de módulo en el consumidor que declara que busca implementaciones de un servicio con ServiceLoader."
   ],
   [
    "provides ... with",
    "Una directiva de módulo en el proveedor que nombra la interfaz del servicio y la clase de implementación que lo proporciona."
   ],
   [
    "ServiceLoader",
    "La clase que descubre e instancia proveedores de servicios en tiempo de ejecución mediante load, iteración, findFirst o stream."
   ],
   [
    "ServiceLoader.Provider",
    "Un manejador de un proveedor que expone type() sin instanciarlo y get() para crear la instancia."
   ]
  ],
  "example": "Un editor de fotos define una interfaz de servicio ImageFilter. Cada filtro se distribuye como su propio módulo que provee ImageFilter con su clase. El editor llama a ServiceLoader.load(ImageFilter.class).stream() para listar los filtros disponibles en su menú, así que un filtro nuevo aparece simplemente al poner su JAR en el module path.",
  "tip": "Ten claro a quién pertenece cada directiva: uses va en el consumidor, provides ... with va en el proveedor, y el paquete de la interfaz debe exportarlo quien la define. El paquete de la implementación no necesita exportarse.",
  "check": [
   [
    "¿Qué módulo declara uses com.pay.api.PaymentGateway?",
    "El módulo consumidor que llama a ServiceLoader.load(PaymentGateway.class)."
   ],
   [
    "¿Qué devuelve ServiceLoader.findFirst() cuando no se encuentra ningún proveedor?",
    "Un Optional vacío."
   ],
   [
    "¿Qué debe tener una clase proveedora para que ServiceLoader pueda crearla?",
    "Un constructor public sin argumentos o un método public static provider()."
   ]
  ]
 },
 {
  "t": "Module path vs class path, named, automatic and unnamed modules",
  "tt": "Module path vs class path; módulos con nombre, automáticos y sin nombre",
  "body": [
   "Java tiene dos formas de indicarle a la JVM dónde están tu código y tus bibliotecas. El class path (`-cp` o `--class-path`) es la lista plana tradicional de directorios y JARs; la JVM busca en ella las clases por nombre, sin ningún concepto de dependencias ni de encapsulamiento. El module path (`-p` o `--module-path`) contiene módulos; la JVM lee el descriptor de cada módulo, comprueba que cada `requires` esté satisfecho antes de arrancar y aplica las exportaciones. Dónde se coloca un JAR decide qué tipo de módulo se vuelve.",
   "Un módulo con nombre (named module), también llamado módulo explícito, es un JAR o directorio que contiene `module-info.class` y se coloca en el module path. Lee solo los módulos que requiere (más `java.base`) y expone solo los paquetes que exporta. Este es el caso totalmente modular, con encapsulamiento fuerte y configuración confiable.",
   "Un módulo automático es un JAR simple, sin `module-info.class`, colocado en el module path. Permite que el código modular dependa de bibliotecas que todavía no se han modularizado. Su nombre viene del atributo `Automatic-Module-Name` del manifiesto del JAR si existe; si no, se deriva del nombre del archivo quitando `.jar` y cualquier sufijo de versión y reemplazando caracteres como los guiones por puntos, así que `commons-text-1.10.jar` se convierte en `commons.text`. Un módulo automático exporta y abre todos sus paquetes y lee todos los demás módulos, incluido el módulo sin nombre.",
   "El módulo sin nombre (unnamed module) contiene todo lo que se carga desde el class path. Hay un módulo sin nombre por cada class loader. Lee todos los módulos y exporta todos sus paquetes, así que el código antiguo sigue funcionando, pero un módulo con nombre no puede declarar `requires` sobre él, porque no tiene nombre. Esa es la asimetría clave: el código del class path puede usar código modular, pero el código modular solo puede llegar al código del class path a través de módulos automáticos.",
   "```text\n                      ¿module-info?  Ubicación     Exporta          ¿Se puede requerir?\nCon nombre (explícito) sí            module path   solo lo declarado sí, por su nombre\nAutomático            no             module path   todos los paquetes sí, por el nombre derivado\nSin nombre            cualquiera     class path    todos los paquetes no\n```",
   "Un JAR modular colocado en el class path se trata como parte del módulo sin nombre; su `module-info.class` se ignora. Por eso puedes migrar de forma gradual. Una estrategia común es de abajo hacia arriba (modularizar primero las bibliotecas sin dependencias) o de arriba hacia abajo (convertir la aplicación en un módulo con nombre y poner sus dependencias no modularizadas en el module path como módulos automáticos). Dos módulos en el module path no pueden contener el mismo paquete, y un nombre derivado de un nombre de archivo que no es una secuencia válida de identificadores Java hace que el JAR no pueda cargarse como módulo automático."
  ],
  "terms": [
   [
    "Module path",
    "La lista de ubicaciones donde se buscan módulos, establecida con --module-path o -p, donde se aplican las reglas de los módulos."
   ],
   [
    "Named module (módulo con nombre)",
    "Un módulo con module-info.class en el module path que lee solo lo que requiere y expone solo lo que exporta."
   ],
   [
    "Automatic module (módulo automático)",
    "Un JAR no modular en el module path; recibe un nombre derivado, exporta todos sus paquetes y lee todos los módulos."
   ],
   [
    "Unnamed module (módulo sin nombre)",
    "El módulo que contiene todo el código del class path; lo lee todo y lo exporta todo, pero no puede requerirse."
   ],
   [
    "Automatic-Module-Name",
    "Un atributo del manifiesto que establece un nombre estable para un JAR usado como módulo automático."
   ]
  ],
  "example": "Un equipo modulariza su aplicación pero depende de una biblioteca JSON que no tiene module-info. Al colocar el JAR de la biblioteca en el module path, se convierte en un módulo automático con el nombre de su manifiesto, y el module-info de la aplicación puede simplemente hacer requires de ese nombre.",
  "tip": "Los módulos automáticos vienen de JARs simples en el module path; el módulo sin nombre viene de cualquier cosa en el class path. Los módulos con nombre pueden requerir módulos automáticos, pero nunca el módulo sin nombre.",
  "check": [
   [
    "¿Qué tipo de módulo se vuelve un JAR sin module-info colocado en el module path?",
    "Un módulo automático, que exporta todos sus paquetes y lee todos los demás módulos."
   ],
   [
    "¿Puede un módulo con nombre requerir código del módulo sin nombre?",
    "No. El módulo sin nombre no tiene nombre, así que una directiva requires no puede referirse a él."
   ],
   [
    "¿Qué le pasa al module-info.class de un JAR modular colocado en el class path?",
    "Se ignora; las clases del JAR pasan a formar parte del módulo sin nombre."
   ]
  ]
 },
 {
  "t": "Compiling and running modules with javac --module-path and java --module",
  "tt": "Compilar y ejecutar módulos con javac --module-path y java --module",
  "body": [
   "Un proyecto típico de un solo módulo guarda sus fuentes en una carpeta con el nombre del módulo: `src/com.greet/module-info.java` y `src/com.greet/com/greet/Main.java`. Compilas con `javac`, apuntando `-d` a un directorio de salida y `--module-path` (forma corta `-p`) a los módulos de los que dependes. Listas cada archivo fuente, incluido `module-info.java`.",
   "```text\njavac -p mods -d out/com.greet src/com.greet/module-info.java src/com.greet/com/greet/Main.java\njava  -p out:mods -m com.greet/com.greet.Main\n```",
   "Para ejecutar, `java --module-path` (o `-p`) lista los directorios que contienen módulos, separados por `:` en Linux y macOS y por `;` en Windows. `--module` (forma corta `-m`) nombra el módulo que se inicia y su clase principal, con la forma `moduleName/fully.qualified.MainClass`. Si el JAR del módulo registra una clase principal, creada con `jar --main-class`, puedes escribir solo `-m com.greet`. Todo lo que va después del nombre del módulo se pasa a `main` como argumentos.",
   "Cuidado con las opciones cortas, porque significan cosas distintas en herramientas distintas. Para `javac`, `-d` es el directorio de salida. Para `java`, `-d` es la forma corta de `--describe-module`, que imprime el descriptor de un módulo: sus requires, exports y demás directivas. `java --list-modules` muestra los módulos que el JDK (y cualquier module path que indiques) pone a disposición. `java --show-module-resolution` imprime cómo se construyó el grafo de módulos al arrancar, lo que ayuda a depurar módulos faltantes. Para los JAR, `jar --describe-module --file app.jar` muestra el descriptor.",
   "Cuando varios módulos viven en un mismo árbol de fuentes, `javac --module-source-path src --module com.greet,com.util -d out` los compila juntos; la ruta de fuentes tiene un subdirectorio por módulo y la salida va a los subdirectorios correspondientes de `out`. Las clases que siguen en el class path pueden combinarse con módulos usando `-cp`, y `--add-modules` agrega módulos al conjunto raíz cuando nada los requiere directamente, por ejemplo cuando el código del class path necesita un módulo que no se resuelve por defecto.",
   "Errores que debes reconocer: ejecutar con `-m` pero olvidar el module path da un error de módulo no encontrado; un `requires` sobre un módulo que no está en el module path falla en tiempo de compilación y de nuevo al arrancar; usar un tipo de un paquete que el otro módulo no exporta no compila, con un mensaje de que el paquete no es visible. Que estas comprobaciones ocurran pronto, antes de que se ejecute cualquier código, es el beneficio de configuración confiable de los módulos."
  ],
  "terms": [
   [
    "--module-path (-p)",
    "La opción de javac y java que lista los directorios o JARs que contienen módulos."
   ],
   [
    "--module (-m)",
    "La opción de java que nombra el módulo a ejecutar, opcionalmente con /MainClass."
   ],
   [
    "--describe-module (-d)",
    "Una opción de java que imprime el descriptor de un módulo; no es lo mismo que el directorio de salida -d de javac."
   ],
   [
    "--module-source-path",
    "Una opción de javac para compilar varios módulos a la vez desde un árbol de fuentes con una carpeta por módulo."
   ],
   [
    "--list-modules",
    "Una opción de java que lista los módulos observables y sus versiones."
   ]
  ],
  "example": "Un script de compilación compila dos módulos con javac --module-source-path src -m com.greet,com.util -d out, empaqueta cada uno con jar, y más tarde un ingeniero de soporte ejecuta java -p lib --describe-module com.greet para confirmar qué paquetes se exportan cuando falla una integración.",
  "tip": "La sintaxis de ejecución es java -p ruta -m módulo/paquete.Clase. Recuerda que -d significa directorio de salida para javac pero describe-module para java.",
  "check": [
   [
    "¿Qué hace java -p out -m com.greet/com.greet.Main?",
    "Inicia la JVM con out en el module path y ejecuta el método main de com.greet.Main en el módulo com.greet."
   ],
   [
    "¿Qué comando imprime los requires y exports de un módulo?",
    "java --describe-module (o -d) con el module path configurado, o jar --describe-module --file para un JAR."
   ]
  ]
 },
 {
  "t": "Module import declarations (Java 25): import module and ambiguity rules",
  "tt": "Declaraciones import module (Java 25): import module y reglas de ambigüedad",
  "body": [
   "Una declaración de importación de módulo (module import declaration), finalizada en Java 25, te permite importar toda la API de un módulo en una sola línea: `import module java.base;`. Importa, bajo demanda, cada clase e interfaz public de nivel superior de cada paquete que el módulo exporta. También incluye los paquetes exportados por los módulos que el módulo nombrado requiere de forma transitiva. Por ejemplo, `java.sql` requiere `java.xml` de forma transitiva, así que `import module java.sql;` también pone a disposición los tipos exportados de java.xml.",
   "Es sobre todo una comodidad para programas pequeños, scripts y estudiantes, que de otro modo necesitan muchas líneas como `import java.util.*;`, `import java.util.function.*;` e `import java.nio.file.*;`. No cambia a qué puede acceder el código; solo cambia qué nombres simples están en alcance. El código del módulo sin nombre (código ordinario del class path) puede usarlo, y los archivos fuente compactos importan automáticamente `java.base` como si empezaran con `import module java.base;`.",
   "Importar módulos enteros hace más probables los choques de nombres. `java.base` exporta `java.util.List` y `java.desktop` exporta `java.awt.List`. Con `import module java.base;` e `import module java.desktop;` a la vez, el nombre `List` es ambiguo. Las líneas de import en sí compilan; el error ocurre solo cuando el código realmente usa el nombre simple ambiguo. Siempre puedes usar un nombre completamente calificado como `java.util.List`.",
   "La solución estándar es el ocultamiento (shadowing). Un import de un solo tipo como `import java.util.List;` tiene prioridad tanto sobre los imports de paquete bajo demanda como sobre los imports de módulo, así que resuelve la ambigüedad. En Java 25, un import de paquete bajo demanda como `import java.util.*;` también oculta a los imports de módulo, así que también resolvería este choque en particular. Los tipos declarados en la misma unidad de compilación o en el mismo paquete también tienen prioridad sobre los importados.",
   "```java\nimport module java.base;\nimport module java.desktop;\nimport java.util.List;          // resuelve la ambigüedad de List\n\nclass Demo {\n    List<String> names = new ArrayList<>(); // java.util.List\n    Frame window;                           // java.awt.Frame de java.desktop\n}\n```",
   "Mantén claro el vocabulario. `import module` es distinto de `requires` en module-info.java: `requires` controla la legibilidad entre módulos, mientras que `import module` solo afecta la búsqueda de nombres en un archivo fuente. También es distinto de `import static`. El nombre después de `import module` es un nombre de módulo como `java.sql`, no un nombre de paquete, y el módulo debe ser uno que el código actual pueda leer."
  ],
  "terms": [
   [
    "Module import declaration (declaración import module)",
    "import module M; que importa bajo demanda todos los tipos public de nivel superior de los paquetes que exporta M, incluidos los de sus dependencias transitivas."
   ],
   [
    "Ambiguous simple name (nombre simple ambiguo)",
    "Un nombre de tipo que dos imports proporcionan desde paquetes distintos; usarlo sin calificar es un error de compilación."
   ],
   [
    "Shadowing (ocultamiento)",
    "Cuando un import o una declaración más específicos ocultan un nombre que de otro modo proporcionaría un import más amplio."
   ],
   [
    "Single-type import (import de un solo tipo)",
    "Un import que nombra una clase, como import java.util.List;, que tiene prioridad sobre los imports bajo demanda y de módulo."
   ]
  ],
  "example": "El programa de ejemplo de un profesor empieza con import module java.base; y usa List, Map, Path y LocalDate sin más imports. Cuando un estudiante agrega import module java.desktop; para dibujar una ventana, los usos de List dejan de compilar hasta que el estudiante agrega import java.util.List;.",
  "tip": "Una ambigüedad causada por dos imports de módulo se reporta solo donde se usa el nombre simple, y un import de un solo tipo la resuelve. Recuerda también que los imports de módulo traen tipos de los módulos requeridos de forma transitiva.",
  "check": [
   [
    "Con import module java.base; e import module java.desktop;, ¿compila una declaración List<String> x;?",
    "No. List es ambiguo entre java.util.List y java.awt.List a menos que un import de un solo tipo o un nombre calificado lo resuelva."
   ],
   [
    "¿import module java.sql; pone a disposición los tipos exportados de java.xml?",
    "Sí, porque java.sql requiere java.xml de forma transitiva."
   ],
   [
    "¿Qué módulo importa automáticamente un archivo fuente compacto?",
    "java.base."
   ]
  ]
 },
 {
  "t": "Compact source files and instance main methods (Java 25), java.lang.IO",
  "tt": "Archivos fuente compactos y métodos main de instancia (Java 25), java.lang.IO",
  "body": [
   "Java 25 finalizó dos características que hacen más cortos los programas pequeños. La primera son los métodos main de instancia. Tradicionalmente el punto de entrada tenía que ser `public static void main(String[] args)`. Ahora el launcher también acepta un método `main` que no es static, no es public y no tiene parámetros. El programa válido más simple en una clase normal es `class Hello { void main() { System.out.println(\"Hi\"); } }`.",
   "El launcher elige el método con un protocolo definido. Si la clase declara o hereda un método `main(String[])`, se usa ese; si no, busca un `main()` sin parámetros. El método no debe ser private. Si el método elegido es static, se llama directamente. Si es un método de instancia, el launcher crea un objeto con el constructor sin argumentos no private de la clase y llama a `main` sobre él; si no existe ese constructor, el lanzamiento falla.",
   "La segunda característica son los archivos fuente compactos (compact source files). Un archivo fuente puede contener campos y métodos que no están dentro de ninguna declaración de clase. El compilador los envuelve entonces en una clase declarada implícitamente, que es final, extiende Object, está en el paquete sin nombre y solo tiene un constructor por defecto. Su nombre viene del nombre del archivo, pero otro código no puede referirse a ella por su nombre. Un archivo fuente compacto debe contener un método `main` lanzable o no compila, y aun así puede declarar clases anidadas, records y enums junto a los miembros de nivel superior.",
   "```java\n// Greeter.java  (un archivo fuente compacto)\nString greeting = \"Hello\";\n\nString greet(String who) { return greeting + \", \" + who; }\n\nvoid main() {\n    String name = IO.readln(\"Your name: \");\n    IO.println(greet(name));\n    IO.println(List.of(1, 2, 3)); // tipos de java.util disponibles: java.base está importado\n}\n```",
   "Los archivos fuente compactos importan automáticamente el módulo `java.base`, así que `List`, `Map`, `Path` y otros tipos comunes no necesitan sentencias import. La nueva clase `java.lang.IO` proporciona métodos de consola sencillos: `IO.println(obj)`, `IO.println()`, `IO.print(obj)`, `IO.readln()` e `IO.readln(prompt)`, que imprime el mensaje y devuelve una línea de entrada (o null al final de la entrada). Como IO está en `java.lang`, no necesita import en ningún archivo Java, pero sus métodos son miembros estáticos de IO, así que escribes `IO.println`, no `println` a secas.",
   "Estas características no crean un dialecto aparte. Un archivo fuente compacto es Java ordinario, compilado con `javac` o ejecutado directamente con `java Greeter.java`, y puede convertirse en una clase normal simplemente envolviendo los miembros en `class Greeter { ... }` y agregando los imports que necesite. Las preguntas del examen evalúan qué firmas de main son lanzables, qué puede y qué no puede hacer la clase implícita, y qué se importa automáticamente."
  ],
  "terms": [
   [
    "Instance main method (método main de instancia)",
    "Un método main no estático, con o sin parámetro String[], que el launcher llama sobre una instancia recién creada."
   ],
   [
    "Compact source file (archivo fuente compacto)",
    "Un archivo fuente con campos y métodos de nivel superior no encerrados en una clase, que el compilador envuelve en una clase final implícita."
   ],
   [
    "Implicitly declared class (clase declarada implícitamente)",
    "La clase final del paquete sin nombre que el compilador crea para un archivo fuente compacto; el código no puede referirse a ella por su nombre."
   ],
   [
    "java.lang.IO",
    "Una clase con utilidades estáticas de consola print, println y readln, disponible sin import."
   ]
  ],
  "example": "Una desarrolladora nueva escribe un Temperature.java de diez líneas con un método convert de nivel superior y void main() que lee la entrada con IO.readln e imprime los resultados con IO.println. Lo ejecuta con java Temperature.java, y más adelante lo envuelve en una clase cuando pasa a formar parte de un proyecto más grande.",
  "tip": "Si una clase tiene tanto main(String[]) como main(), se elige la versión con String[]. Un main private no es lanzable, y un main de instancia necesita un constructor sin argumentos no private.",
  "check": [
   [
    "¿Es void main() en una clase normal un punto de entrada válido en Java 25?",
    "Sí. El launcher crea una instancia con el constructor sin argumentos y llama al método main de instancia."
   ],
   [
    "¿Puede otra clase referirse por el nombre Greeter a la clase implícita creada a partir de Greeter.java?",
    "No. Una clase declarada implícitamente no puede referenciarse por su nombre desde otro código."
   ],
   [
    "¿Necesitas sentencias import para List en un archivo fuente compacto?",
    "No. Los archivos fuente compactos importan automáticamente el módulo java.base."
   ]
  ]
 },
 {
  "t": "Launching single-file and multi-file source programs with the java launcher",
  "tt": "Lanzar programas de código fuente de uno o varios archivos con el launcher java",
  "body": [
   "El launcher `java` puede ejecutar un programa directamente desde el código fuente, sin un paso aparte de `javac`. Ejecutar `java Hello.java arg1 arg2` compila el archivo en memoria y lo ejecuta; no se escriben archivos `.class` en disco. Este modo de archivo fuente está pensado para programas pequeños, scripts, experimentos y aprendizaje. El launcher lo reconoce porque el primer argumento que no es una opción termina en `.java`.",
   "En el modo original de un solo archivo, todas las clases del programa tenían que estar en ese único archivo. La clase que se ejecuta es la primera clase de nivel superior declarada en el archivo, y debe tener un método `main` lanzable. El archivo puede declarar varias clases de nivel superior, y su nombre no tiene que coincidir con el de la clase public. Los argumentos que siguen al nombre del archivo se pasan a `main`.",
   "Desde Java 22 el launcher también admite programas de varios archivos. Cuando el archivo lanzado hace referencia a una clase que no declara, el launcher busca un archivo `.java` correspondiente en el árbol de directorios cuya raíz es el directorio que contiene el archivo lanzado, usando la estructura habitual de paquete a directorio, y lo compila bajo demanda. Así que `java Main.java` funciona aunque `Main` use `util/Helper.java` del paquete `util`. Solo se compilan los archivos realmente necesarios, y se compilan cuando se referencian por primera vez, así que un error de compilación en una clase auxiliar puede aparecer solo cuando esa clase se usa por primera vez.",
   "```text\nproject/\n  Main.java            (usa util.Helper)\n  util/Helper.java     (package util;)\n\n$ cd project\n$ java Main.java hello      # compila Main, luego Helper bajo demanda, y luego ejecuta\n$ java -cp 'lib/*' Main.java   # agrega los JARs de bibliotecas al class path\n```",
   "Opciones útiles: `--class-path` (o `-cp`) agrega JARs de bibliotecas, que puedes usar desde el programa fuente; `--source N` le indica al compilador qué versión del lenguaje usar, y es obligatoria cuando el archivo no termina en `.java`. Ese segundo caso permite scripts shebang en Linux y macOS: un archivo cuya primera línea es `#!/path/to/java --source 25` puede marcarse como ejecutable y ejecutarse directamente; el launcher ignora esa primera línea. Las opciones para el launcher y el compilador van antes del nombre del archivo; todo lo que va después del nombre del archivo va al programa.",
   "Conoce los límites. El modo fuente no es una herramienta de compilación: no hay compilación incremental, ni empaquetado, y el procesamiento de anotaciones está deshabilitado. Para cualquier cosa más grande pasas a `javac`, `jar` y un sistema de compilación. Combinado con los archivos fuente compactos y los métodos main de instancia, el modo fuente permite que un principiante empiece con `java Hello.java` y un único método `void main()`."
  ],
  "terms": [
   [
    "Source-file mode (modo de archivo fuente)",
    "Ejecutar java con el nombre de un archivo .java para que el launcher compile el código fuente en memoria y lo ejecute sin escribir archivos class."
   ],
   [
    "Multi-file source program (programa fuente de varios archivos)",
    "Un programa en modo fuente cuyas otras clases se encuentran como archivos .java bajo el directorio del archivo lanzado y se compilan bajo demanda."
   ],
   [
    "--source",
    "Una opción del launcher que establece la versión del lenguaje para el modo fuente; obligatoria para archivos que no terminan en .java."
   ],
   [
    "Shebang file (archivo shebang)",
    "Un script ejecutable cuya primera línea empieza con #! y nombra el launcher java, ejecutado directamente por el sistema operativo."
   ]
  ],
  "example": "Un ingeniero de operaciones mantiene una utilidad CheckCerts.java en una carpeta de herramientas con una clase auxiliar en tools/net/Tls.java. Ejecutar java CheckCerts.java host.example compila ambas en memoria y ejecuta la comprobación, sin configuración de compilación y sin dejar archivos class.",
  "tip": "En modo fuente se lanza la primera clase de nivel superior del archivo, los argumentos después del nombre del archivo van a main y no se producen archivos class. El soporte de varios archivos encuentra las otras clases como archivos fuente según el directorio del paquete.",
  "check": [
   [
    "¿java Hello.java crea Hello.class en disco?",
    "No. El modo de archivo fuente compila solo en memoria."
   ],
   [
    "Si Hello.java declara primero la clase A y después la clase Hello, ¿cuál se ejecuta?",
    "La clase A, la primera clase de nivel superior del archivo, siempre que tenga un método main lanzable."
   ],
   [
    "¿Cuándo es obligatoria --source?",
    "Cuando el nombre del archivo fuente no termina en .java, como en un script shebang."
   ]
  ]
 },
 {
  "t": "JDK tools: jar, jdeps, jlink",
  "tt": "Herramientas del JDK: jar, jdeps, jlink",
  "body": [
   "El JDK incluye herramientas de línea de comandos que el examen espera que reconozcas por su propósito y por sus opciones clave. Tres son las más importantes para el empaquetado: `jar` construye e inspecciona archivos, `jdeps` analiza dependencias, y `jlink` construye una imagen de runtime personalizada que contiene solo los módulos que necesita una aplicación.",
   "`jar` funciona como la clásica herramienta tar. `jar --create --file app.jar -C classes .` (forma corta `jar -cf app.jar -C classes .`) empaqueta el contenido del directorio classes; `-C dir` cambia a ese directorio antes de agregar archivos. `--main-class` (forma corta `-e`) registra el punto de entrada en el manifiesto para que `java -jar app.jar` funcione, y en un JAR modular también registra la clase principal en module-info. `-t` lista el contenido (`jar -tf app.jar`), `-x` extrae, `-u` actualiza y `-v` hace la salida detallada. `jar --describe-module --file app.jar` muestra el descriptor de un JAR modular. El manifiesto está en `META-INF/MANIFEST.MF`.",
   "`jdeps` lee archivos class o JARs e informa de qué dependen, a nivel de paquete o de módulo. `jdeps app.jar` lista las dependencias de paquetes; `-s` (o `-summary`) imprime un resumen a nivel de módulo; `--list-deps` lista los módulos necesarios; `--print-module-deps` imprime una lista separada por comas apta para el `--add-modules` de jlink. `--jdk-internals` encuentra usos de APIs internas del JDK que el encapsulamiento fuerte bloqueará, lo cual es valioso antes de migrar una aplicación antigua. `--generate-module-info` puede generar un borrador de module-info.java para un JAR simple.",
   "```text\njar  --create --file mods/app.jar --main-class com.app.Main -C out/com.app .\njdeps -s mods/app.jar\njdeps --jdk-internals legacy.jar\njlink --module-path mods --add-modules com.app \\\n      --output build/runtime --launcher app=com.app/com.app.Main \\\n      --strip-debug --no-header-files --no-man-pages\nbuild/runtime/bin/app\n```",
   "`jlink` enlaza un conjunto de módulos y sus dependencias transitivas en una imagen de runtime independiente: un directorio con su propio `bin/java`, bibliotecas y solo los módulos necesarios. `--module-path` apunta a tus módulos (los módulos propios del JDK se encuentran automáticamente en los JDK actuales), `--add-modules` nombra los módulos raíz y `--output` nombra el directorio de destino, que no debe existir previamente. `--launcher name=module/mainclass` crea un script para iniciar la app, y `--strip-debug`, `--no-header-files`, `--no-man-pages` y `--compress` reducen el tamaño de la imagen.",
   "jlink requiere módulos explícitos con nombre. No puede enlazar módulos automáticos ni JARs del class path, así que una aplicación con dependencias no modulares debe modularizarlas o usar otro enfoque de empaquetado. La recompensa es un runtime más pequeño, un arranque más rápido y una superficie de ataque reducida, porque los módulos que no se usan simplemente no están. Ejecutar `bin/java --list-modules` dentro de la imagen muestra exactamente qué se incluyó."
  ],
  "terms": [
   [
    "jar",
    "La herramienta del JDK que crea, lista, extrae y actualiza archivos JAR y puede registrar una clase principal."
   ],
   [
    "jdeps",
    "El analizador de dependencias del JDK que informa de las dependencias de paquetes y módulos y del uso de APIs internas."
   ],
   [
    "jlink",
    "La herramienta del JDK que ensambla módulos con nombre y sus dependencias en una imagen de runtime personalizada."
   ],
   [
    "Runtime image (imagen de runtime)",
    "Un directorio autocontenido con una JVM y solo los módulos que necesita una aplicación."
   ],
   [
    "Manifest (manifiesto)",
    "El archivo META-INF/MANIFEST.MF dentro de un JAR que contiene metadatos como Main-Class."
   ]
  ],
  "example": "Antes de actualizar un servicio antiguo, un equipo ejecuta jdeps --jdk-internals sobre sus JARs y encuentra llamadas a una clase interna del JDK. Después de reemplazarlas y modularizar, usan jlink para construir un runtime reducido para su imagen de contenedor, que arranca más rápido e incluye menos módulos que parchear.",
  "tip": "Relaciona herramienta y tarea: jar empaqueta, jdeps analiza, jlink construye un runtime. jlink funciona solo con módulos con nombre, nunca con módulos automáticos ni con el class path.",
  "check": [
   [
    "¿Qué opción lista el contenido de un JAR?",
    "-t, normalmente jar -tf app.jar (o jar --list --file app.jar)."
   ],
   [
    "¿Qué opción de jdeps encuentra usos de APIs internas del JDK?",
    "--jdk-internals."
   ],
   [
    "¿Puede jlink incluir un JAR simple colocado en el module path como módulo automático?",
    "No. jlink solo enlaza módulos explícitos con nombre."
   ]
  ]
 },
 {
  "t": "Creating threads with Runnable, Thread, and the Thread.Builder API",
  "tt": "Crear hilos con Runnable, Thread y la API Thread.Builder",
  "body": [
   "Un hilo (thread) es un camino de ejecución independiente dentro de un programa. Todo programa Java empieza con un hilo principal, y puedes crear más para hacer trabajo de forma concurrente. El trabajo en sí suele describirse con un `Runnable`, una interfaz funcional con un método, `void run()`, que no recibe argumentos, no devuelve nada y no puede lanzar excepciones checked. Como es funcional, una lambda sirve: `Runnable task = () -> System.out.println(\"working\");`.",
   "Las formas clásicas de crear un hilo son pasar un Runnable a un constructor de Thread, o heredar de Thread y sobrescribir `run`. Se prefiere pasar un Runnable porque separa la tarea del mecanismo que la ejecuta y deja tu clase libre para extender otra cosa. En ambos casos no pasa nada hasta que llamas a `start()`, que le pide a la JVM crear el hilo nuevo y ejecutar `run()` en él. `join()` hace que el hilo que llama espere hasta que el otro termine.",
   "```java\nRunnable task = () -> System.out.println(Thread.currentThread().getName());\n\nThread t1 = new Thread(task, \"worker-1\");\nt1.start();\n\nThread t2 = Thread.ofPlatform().name(\"worker-\", 2).daemon(true).start(task);\nThread t3 = Thread.ofVirtual().name(\"v1\").unstarted(task);\nt3.start();\nThread t4 = Thread.startVirtualThread(task);\n\nt1.join();   // espera a que t1 termine; lanza InterruptedException\n```",
   "La API Thread.Builder, agregada junto con los hilos virtuales, ofrece una forma fluida de configurar hilos. `Thread.ofPlatform()` devuelve un builder para hilos ordinarios del sistema operativo y `Thread.ofVirtual()` un builder para hilos virtuales. Estableces propiedades como `name(\"worker\")`, o `name(\"worker-\", 0)` para numerar los hilos con un contador, y los builders de plataforma agregan `daemon(boolean)` y `priority(int)`. Luego `start(runnable)` crea e inicia el hilo, `unstarted(runnable)` lo crea sin iniciarlo, y `factory()` devuelve un ThreadFactory que puedes entregar a un executor. `Thread.startVirtualThread(runnable)` es un atajo.",
   "Un hilo daemon no mantiene viva la JVM: cuando solo quedan hilos daemon, la JVM termina. Los hilos virtuales siempre son hilos daemon. Los nombres de los hilos no son identificadores únicos; cada hilo también tiene un `threadId()`. `Thread.currentThread()` devuelve el hilo que ejecuta el código actual, que es la forma en que una tarea encuentra su propio nombre.",
   "En aplicaciones reales rara vez creas hilos a mano para cada tarea; envías las tareas a un ExecutorService, que gestiona los hilos por ti. Pero el examen sigue evaluando lo básico: qué método define un Runnable, que `start()` es necesario para crear un hilo nuevo y cómo se encadenan los métodos del builder. Recuerda que `run()` y `start()` son distintos; llamar a `run()` directamente solo ejecuta el código en el hilo actual."
  ],
  "terms": [
   [
    "Runnable",
    "Una interfaz funcional con void run() que representa una tarea sin resultado y sin excepciones checked."
   ],
   [
    "Thread.Builder",
    "Una API fluida, obtenida con Thread.ofPlatform() o Thread.ofVirtual(), para configurar y crear hilos."
   ],
   [
    "unstarted",
    "Un método de Thread.Builder que crea un hilo configurado sin iniciarlo."
   ],
   [
    "Daemon thread (hilo daemon)",
    "Un hilo en segundo plano que no impide que la JVM termine."
   ],
   [
    "join",
    "Un método de Thread que hace que quien llama espere hasta que ese hilo termine."
   ]
  ],
  "example": "Una aplicación de escritorio inicia un indexador en segundo plano con Thread.ofPlatform().name(\"indexer\").daemon(true).start(indexTask) para que la interfaz siga respondiendo, y el indexador no impide que la app se cierre cuando el usuario sale.",
  "tip": "El método de Runnable es run(), devuelve void y no puede lanzar excepciones checked. daemon() y priority() están disponibles en los builders de plataforma; los hilos virtuales siempre son daemon.",
  "check": [
   [
    "¿Cuál es la diferencia entre Thread.ofVirtual().start(r) y Thread.ofVirtual().unstarted(r)?",
    "start crea e inicia el hilo inmediatamente; unstarted devuelve un hilo configurado que debes iniciar tú."
   ],
   [
    "¿Por qué suele preferirse implementar Runnable antes que extender Thread?",
    "Separa la tarea de cómo se ejecuta, permite que la clase extienda otra clase y permite que los executors ejecuten la misma tarea."
   ]
  ]
 },
 {
  "t": "Platform threads vs virtual threads; Executors.newVirtualThreadPerTaskExecutor()",
  "tt": "Hilos de plataforma vs hilos virtuales; Executors.newVirtualThreadPerTaskExecutor()",
  "body": [
   "Un hilo de plataforma (platform thread) es un envoltorio delgado sobre un hilo del sistema operativo. Ocupa ese hilo del SO durante toda su vida, incluso mientras espera una respuesta de la base de datos o de la red. Los hilos del SO son relativamente costosos: cada uno reserva memoria para una pila y el SO solo puede planificar eficientemente una cantidad limitada, así que tradicionalmente las aplicaciones usaban pools de hilos de tamaño fijo y compartían un número limitado de hilos entre muchas tareas.",
   "Un hilo virtual (virtual thread), definitivo desde Java 21, es un hilo ligero gestionado por la JVM en lugar del SO. La JVM ejecuta los hilos virtuales sobre un pequeño pool de hilos de plataforma llamados hilos portadores (carrier threads). Cuando un hilo virtual realiza una operación bloqueante, como leer de un socket o dormir, la JVM lo desmonta de su portador, guardando su pila en la memoria heap, y el portador queda libre para ejecutar otro hilo virtual. Cuando la operación termina, el hilo virtual se vuelve a montar, posiblemente en otro portador.",
   "El resultado es que puedes tener cantidades muy grandes de hilos virtuales, incluso millones, y escribir código bloqueante simple con un estilo de un hilo por petición sin dejar de escalar. Los hilos virtuales ayudan al rendimiento del trabajo limitado por E/S: muchas tareas que pasan la mayor parte del tiempo esperando. No hacen más rápido el código limitado por CPU, porque el número de hilos portadores, y por tanto de núcleos de CPU en uso, sigue siendo el mismo.",
   "```java\ntry (ExecutorService ex = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (int i = 0; i < 10_000; i++) {\n        int id = i;\n        ex.submit(() -> fetchOrder(id));   // cada tarea obtiene su propio hilo virtual nuevo\n    }\n}   // close() espera a que terminen todas las tareas enviadas\n```",
   "`Executors.newVirtualThreadPerTaskExecutor()` devuelve un ExecutorService que inicia un hilo virtual nuevo por cada tarea enviada. No hay pool, porque los hilos virtuales son baratos de crear; no deberías agrupar hilos virtuales en pools ni reutilizarlos. Si necesitas limitar el acceso concurrente a un recurso escaso, como una base de datos con diez conexiones, usa un `Semaphore` en lugar de un pool pequeño. Otras formas de crear hilos virtuales son `Thread.ofVirtual().start(r)`, `Thread.startVirtualThread(r)` y `Thread.ofVirtual().factory()`.",
   "Algunas propiedades difieren de los hilos de plataforma. Los hilos virtuales siempre son hilos daemon, y llamar a `setDaemon(false)` sobre uno lanza `IllegalArgumentException`. Su prioridad está fija en normal, y `setPriority` no tiene efecto. `isVirtual()` te dice de qué tipo es un hilo. Las variables thread-local funcionan pero, con millones de hilos, las cachés pesadas por hilo en ThreadLocal desperdician memoria, que es una de las razones por las que se introdujeron los scoped values.",
   "Un hilo virtual puede quedar fijado (pinned) a su portador, lo que significa que no puede desmontarse mientras está bloqueado; históricamente esto ocurría al bloquearse dentro de un bloque `synchronized`, y todavía ocurre durante llamadas a métodos nativos. Java 24 eliminó el caso de synchronized, pero aun así debe evitarse la fijación prolongada. Para el examen, céntrate en el modelo: muchos hilos virtuales baratos para E/S bloqueante, unos pocos hilos de plataforma para el trabajo de CPU, y un hilo virtual por tarea sin pools."
  ],
  "terms": [
   [
    "Platform thread (hilo de plataforma)",
    "Un hilo de Java respaldado uno a uno por un hilo del sistema operativo durante toda su vida."
   ],
   [
    "Virtual thread (hilo virtual)",
    "Un hilo ligero gestionado por la JVM que se desmonta de su portador mientras está bloqueado para que el portador pueda ejecutar otro trabajo."
   ],
   [
    "Carrier thread (hilo portador)",
    "Un hilo de plataforma sobre el que la JVM monta los hilos virtuales para ejecutarlos."
   ],
   [
    "newVirtualThreadPerTaskExecutor",
    "Un método de fábrica de Executors que devuelve un ExecutorService que inicia un hilo virtual nuevo por cada tarea."
   ],
   [
    "Pinning (fijación)",
    "Un estado en el que un hilo virtual bloqueado no puede desmontarse de su portador, lo que reduce la escalabilidad."
   ]
  ],
  "example": "Un servicio web que llama a tres APIs lentas por cada petición pasa de un pool fijo de 200 hilos a un executor de un hilo virtual por tarea. Bajo carga maneja muchas más peticiones concurrentes con el mismo hardware, porque las peticiones en espera ya no ocupan hilos del sistema operativo.",
  "tip": "Los hilos virtuales mejoran la escalabilidad de las tareas bloqueantes con mucha E/S, no la velocidad bruta de CPU. No los agrupes en pools; limita el acceso a recursos escasos con un Semaphore. Siempre son hilos daemon.",
  "check": [
   [
    "¿Cambiar a hilos virtuales un trabajo de redimensionar imágenes limitado por CPU hará que termine más rápido?",
    "Por lo general no. Los hilos virtuales ayudan cuando las tareas esperan E/S; el trabajo limitado por CPU depende del número de núcleos."
   ],
   [
    "¿Qué ocurre cuando un hilo virtual se bloquea en una lectura de red?",
    "La JVM lo desmonta de su hilo portador, que puede entonces ejecutar otros hilos virtuales hasta que la lectura termine."
   ],
   [
    "¿Por qué no deberías crear un pool fijo de 10 hilos virtuales para limitar las llamadas a la base de datos?",
    "Los hilos virtuales están pensados para crearse por tarea y no agruparse en pools; usa un Semaphore para limitar la concurrencia."
   ]
  ]
 },
 {
  "t": "ExecutorService, Callable and Future; shutdown, awaitTermination, close()",
  "tt": "ExecutorService, Callable y Future; shutdown, awaitTermination, close()",
  "body": [
   "Un `ExecutorService` separa el envío de tareas de la decisión de qué hilos las ejecutan. Creas uno con los métodos de fábrica de `Executors`: `newSingleThreadExecutor()` ejecuta las tareas de una en una y en orden, `newFixedThreadPool(n)` usa n hilos reutilizables, `newCachedThreadPool()` crece y se reduce según se necesite, `newScheduledThreadPool(n)` ejecuta tareas después de un retraso o periódicamente, y `newVirtualThreadPerTaskExecutor()` usa un hilo virtual nuevo por tarea.",
   "Las tareas tienen dos formas. Un `Runnable` tiene `void run()` y no puede lanzar excepciones checked. Un `Callable<V>` tiene `V call() throws Exception`, así que puede devolver un resultado y lanzar excepciones checked. `execute(Runnable)` es de disparar y olvidar y devuelve void. `submit` acepta un Runnable o un Callable y devuelve un `Future`. `invokeAll(collection)` ejecuta muchos Callables y devuelve una lista de Futures cuando todos terminan, e `invokeAny(collection)` devuelve el resultado de uno que terminó con éxito y cancela el resto.",
   "Un `Future<V>` representa un resultado que puede no estar listo todavía. `get()` se bloquea hasta que la tarea termina y devuelve el valor; para un Runnable enviado el valor es null. `get(timeout, unit)` espera como máximo ese tiempo y lanza `TimeoutException` si el resultado no está listo. Si la tarea lanzó una excepción, `get()` lanza `ExecutionException` con la excepción original como causa. `get()` también lanza la `InterruptedException` checked. `isDone()` comprueba sin bloquearse, y `cancel(true)` intenta detener la tarea interrumpiéndola.",
   "```java\nExecutorService ex = Executors.newFixedThreadPool(2);\ntry {\n    Future<Integer> f = ex.submit(() -> 6 * 7);   // Callable<Integer>\n    Future<?> r = ex.submit(() -> System.out.println(\"hi\")); // Runnable\n    System.out.println(f.get());                 // 42 (se bloquea hasta que termina)\n} finally {\n    ex.shutdown();\n    if (!ex.awaitTermination(5, TimeUnit.SECONDS)) ex.shutdownNow();\n}\n```",
   "Los hilos de un executor mantienen viva la JVM hasta que lo cierras. `shutdown()` deja de aceptar tareas nuevas pero permite que terminen las ya enviadas; no espera. Enviar algo después de eso lanza `RejectedExecutionException`. `shutdownNow()` además intenta detener las tareas en ejecución interrumpiéndolas y devuelve la lista de tareas que nunca empezaron. `awaitTermination(timeout, unit)` se bloquea hasta que todas las tareas terminan después de un shutdown, o hasta el timeout, y devuelve true si terminó. `isShutdown()` pasa a true después de llamar a shutdown; `isTerminated()` pasa a true solo cuando todas las tareas han terminado.",
   "Desde Java 19, ExecutorService implementa `AutoCloseable`, así que puedes usar try-with-resources. Su método `close()` llama a shutdown y luego espera a que terminen todas las tareas, así que salir del bloque garantiza que el trabajo está hecho. Este es el patrón idiomático con executors de hilos virtuales. Ten cuidado de no confundir `close()`, que espera, con `shutdown()`, que no espera."
  ],
  "terms": [
   [
    "Callable<V>",
    "Una interfaz de tarea con V call() throws Exception, que devuelve un resultado y puede lanzar excepciones checked."
   ],
   [
    "Future<V>",
    "Un manejador de un resultado pendiente, con get, get con timeout, isDone y cancel."
   ],
   [
    "ExecutionException",
    "La excepción checked que lanza Future.get cuando la propia tarea lanzó una excepción; la excepción original es su causa."
   ],
   [
    "shutdown",
    "Hace que un executor deje de aceptar tareas nuevas mientras permite que terminen las enviadas, sin esperar."
   ],
   [
    "awaitTermination",
    "Se bloquea hasta que todas las tareas terminan después del shutdown o hasta que vence un timeout, y devuelve si terminó."
   ]
  ],
  "example": "Un agregador de precios envía un Callable por proveedor a un pool fijo, y luego llama a future.get(2, TimeUnit.SECONDS) en cada uno para que un proveedor lento no bloquee la página, y atrapa TimeoutException para mostrar ese proveedor como no disponible.",
  "tip": "execute devuelve void y solo recibe un Runnable; submit devuelve un Future. shutdown no espera, awaitTermination espera y close() hace ambas cosas. Las excepciones dentro de una tarea te llegan envueltas en ExecutionException desde get().",
  "check": [
   [
    "¿Qué devuelve Future.get() para un Runnable enviado?",
    "null, una vez que la tarea ha terminado."
   ],
   [
    "Después de shutdown(), ¿qué ocurre cuando envías otra tarea?",
    "Se rechaza con una RejectedExecutionException."
   ],
   [
    "¿Cuál es la diferencia entre isShutdown() e isTerminated()?",
    "isShutdown es true en cuanto se pidió el shutdown; isTerminated es true solo después de que todas las tareas han terminado tras el shutdown."
   ]
  ]
 },
 {
  "t": "Thread lifecycle and start() vs run()",
  "tt": "Ciclo de vida de los hilos y start() vs run()",
  "body": [
   "Todo objeto Thread pasa por los estados definidos en el enum `Thread.State`, y `getState()` informa el actual. `NEW` significa que el objeto hilo existe pero no se ha llamado a `start()`. `RUNNABLE` significa que se está ejecutando o está listo para ejecutarse; Java no separa la ejecución de la espera por una CPU. `BLOCKED` significa que espera adquirir un lock de monitor para entrar en un bloque o método `synchronized`. `WAITING` significa que espera indefinidamente a otro hilo, por ejemplo en `join()` sin timeout o en `Object.wait()`. `TIMED_WAITING` es lo mismo con un límite de tiempo, como `Thread.sleep(100)` o `join(500)`. `TERMINATED` significa que `run()` ha terminado, normalmente o con una excepción.",
   "Las transiciones típicas son de NEW a RUNNABLE con `start()`, de RUNNABLE a BLOCKED, WAITING o TIMED_WAITING y de vuelta a medida que el hilo espera locks, otros hilos o tiempo, y finalmente de RUNNABLE a TERMINATED. Un hilo no puede reiniciarse: una vez terminado sigue terminado, y llamar a `start()` una segunda vez sobre el mismo objeto Thread, en cualquier estado distinto de NEW, lanza `IllegalThreadStateException`.",
   "La distinción más evaluada es `start()` frente a `run()`. `start()` le pide a la JVM crear un nuevo hilo de ejecución, que luego llama a `run()`. Llamar a `run()` directamente es solo una llamada ordinaria a un método: el código se ejecuta de forma síncrona en el hilo actual, no se crea ningún hilo nuevo y el objeto Thread se queda en el estado NEW.",
   "```java\nRunnable job = () -> System.out.println(Thread.currentThread().getName());\nThread t = new Thread(job, \"worker\");\n\nt.run();    // imprime main    (se ejecuta en el hilo que llama)\nt.start();  // imprime worker  (se ejecuta en un hilo nuevo)\n// t.start();  // IllegalThreadStateException: ya se inició\n```",
   "El orden de la salida de varios hilos no está garantizado. Si main inicia un hilo y luego imprime, cualquiera de las dos líneas puede aparecer primero. La única forma de forzar el orden es coordinar, por ejemplo con `join()`, que espera a que el otro hilo termine. `Thread.sleep` pone el hilo actual en TIMED_WAITING; no libera los locks que tiene, y lanza la `InterruptedException` checked.",
   "La interrupción es la forma cooperativa de pedirle a un hilo que se detenga. `t.interrupt()` activa la bandera de interrupción del hilo; si el hilo está durmiendo, esperando o en un join, esa llamada lanza `InterruptedException` y limpia la bandera. El código bien hecho comprueba `Thread.currentThread().isInterrupted()` en bucles largos y sale limpiamente. El viejo método `stop()` es inseguro y ya no funciona; nunca deberías depender de él."
  ],
  "terms": [
   [
    "Thread.State",
    "El enum de los estados de un hilo: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING y TERMINATED."
   ],
   [
    "BLOCKED",
    "El estado de un hilo que espera adquirir un lock de monitor para un bloque o método synchronized."
   ],
   [
    "TIMED_WAITING",
    "El estado de un hilo que espera con un límite de tiempo, como en sleep o join con timeout."
   ],
   [
    "IllegalThreadStateException",
    "Se lanza cuando se llama a start() sobre un hilo que ya fue iniciado."
   ],
   [
    "Interrupt (interrupción)",
    "Una señal cooperativa que activa la bandera de interrupción de un hilo y lo despierta de sleep, wait o join con InterruptedException."
   ]
  ],
  "example": "Un desarrollador nota que su exportación lenta sigue congelando la interfaz aunque está envuelta en un Thread. El código llama a exportThread.run() en lugar de start(), así que la exportación se ejecuta en el hilo de la interfaz. Cambiarlo a start() mueve el trabajo a un hilo nuevo.",
  "tip": "Llamar a run() no crea un hilo, así que Thread.currentThread() dentro de él es quien llama. Llamar a start() dos veces lanza IllegalThreadStateException. A menos que el código use join u otra herramienta de coordinación, el orden de salida entre hilos es impredecible.",
  "check": [
   [
    "¿En qué estado está un hilo después de crearse pero antes de llamar a start()?",
    "NEW."
   ],
   [
    "¿En qué estado está un hilo mientras está dentro de Thread.sleep(1000)?",
    "TIMED_WAITING."
   ],
   [
    "¿Llamar a t.run() cambia el estado de t a RUNNABLE?",
    "No. run() se ejecuta en el hilo que llama; t se queda en NEW."
   ]
  ]
 },
 {
  "t": "Race conditions, synchronized blocks and methods, and visibility",
  "tt": "Condiciones de carrera, bloques y métodos synchronized, y visibilidad",
  "body": [
   "Una condición de carrera (race condition) ocurre cuando el resultado de un programa depende del momento impredecible en que se ejecutan hilos que comparten datos mutables. El caso de manual es `count++` sobre un campo compartido. Parece un solo paso, pero son tres: leer count, sumar uno y volver a escribirlo. Si dos hilos leen el mismo valor antes de que cualquiera escriba, ambos escriben el mismo valor nuevo y se pierde un incremento. Ejecuta un millón de incrementos en dos hilos y el total suele ser menor que dos millones.",
   "La palabra clave `synchronized` lo soluciona con exclusión mutua. Todo objeto tiene un lock intrínseco, también llamado monitor. Un bloque synchronized, `synchronized (lock) { ... }`, permite que solo un hilo a la vez tenga ese lock y ejecute el código que protege; los demás que intentan entrar pasan al estado BLOCKED hasta que el lock se libera. Un método de instancia synchronized equivale a `synchronized (this)` alrededor de su cuerpo, y un método static synchronized bloquea el objeto Class, como `Counter.class`. Por tanto, los métodos synchronized de instancia y los estáticos usan locks distintos y no se excluyen entre sí.",
   "```java\nclass Counter {\n    private int count;\n    private final Object lock = new Object();\n    void increment() { synchronized (lock) { count++; } }\n    synchronized int get() { return count; }   // bloquea this, ¡no lock!\n}\n```",
   "La exclusión mutua solo funciona si todo acceso a los datos compartidos usa el mismo lock. En el ejemplo de arriba, `get()` bloquea `this` mientras que `increment()` bloquea `lock`, así que no están coordinados; la solución es usar un solo lock para ambos. Los locks intrínsecos son reentrantes: un hilo que ya tiene un lock puede entrar en otro bloque synchronized sobre el mismo objeto sin bloquearse a sí mismo. El lock se libera automáticamente cuando el bloque termina, incluso por una excepción.",
   "El segundo problema es la visibilidad. Por rendimiento, los hilos pueden guardar valores en caché y el compilador y la CPU pueden reordenar instrucciones, así que sin sincronización un hilo podría no ver nunca la escritura de otro hilo. El Java Memory Model define relaciones happens-before (sucede antes): liberar un lock sucede antes de la siguiente adquisición del mismo lock, así que todo lo escrito dentro de un bloque synchronized es visible para el siguiente hilo que toma el lock. `Thread.start()` y `join()` también crean relaciones happens-before.",
   "La palabra clave `volatile` en un campo garantiza la visibilidad: cada lectura ve la escritura más reciente, e impide reordenamientos perjudiciales a su alrededor. Es ideal para una bandera de parada, `private volatile boolean running = true;`, que escribe un hilo y lee otro. Pero volatile no hace atómicas las acciones compuestas, así que `count++` sobre un int volatile sigue siendo una condición de carrera. Para eso necesitas synchronized, un lock o una clase atómica.",
   "Otros enfoques seguros consisten en evitar compartir: usar objetos inmutables, confinar los datos a un solo hilo o dejar que una colección concurrente los gestione. La sincronización agrega contención, así que mantén cortas las regiones synchronized."
  ],
  "terms": [
   [
    "Race condition (condición de carrera)",
    "Un error en el que el resultado depende del momento en que los hilos acceden a datos mutables compartidos."
   ],
   [
    "Intrinsic lock (monitor) (lock intrínseco)",
    "El lock integrado en todo objeto, que adquieren los bloques y métodos synchronized."
   ],
   [
    "synchronized method (método synchronized)",
    "Un método cuyo cuerpo se ejecuta mientras se tiene el lock de this, o del objeto Class en los métodos estáticos."
   ],
   [
    "Visibility (visibilidad)",
    "Si se garantiza que las lecturas de otro hilo verán una escritura hecha por un hilo."
   ],
   [
    "volatile",
    "Un modificador de campo que garantiza la visibilidad y el orden de las lecturas y escrituras, pero no la atomicidad de las operaciones compuestas."
   ]
  ],
  "example": "Una aplicación web cuenta las visitas a páginas con un campo int simple actualizado por muchos hilos de peticiones, y el total diario siempre es menor que lo que muestra el log de accesos. Hacer que la actualización sea synchronized, o cambiar a un AtomicLong, elimina las actualizaciones perdidas.",
  "tip": "volatile da visibilidad pero no atomicidad, así que count++ sobre un volatile sigue siendo inseguro. Los métodos synchronized de instancia bloquean this y los estáticos bloquean el objeto Class; dos métodos solo se excluyen entre sí si usan el mismo lock.",
  "check": [
   [
    "¿Por qué count++ es inseguro cuando dos hilos lo ejecutan sobre un campo compartido?",
    "Es una lectura, una suma y una escritura; los hilos pueden intercalarse entre esos pasos y sobrescribir las actualizaciones del otro."
   ],
   [
    "¿Un método static synchronized bloquea a un hilo que entra en un método de instancia synchronized de la misma clase?",
    "No. Bloquean objetos distintos: el objeto Class frente a la instancia."
   ],
   [
    "¿Cuándo basta con volatile?",
    "Cuando un hilo escribe un valor que los demás solo leen, como una bandera de parada, y no se necesita leer-modificar-escribir."
   ]
  ]
 },
 {
  "t": "Atomic classes (AtomicInteger, AtomicLong) and locks (ReentrantLock, tryLock)",
  "tt": "Clases atómicas (AtomicInteger, AtomicLong) y locks (ReentrantLock, tryLock)",
  "body": [
   "El paquete `java.util.concurrent.atomic` ofrece clases como `AtomicInteger`, `AtomicLong`, `AtomicBoolean` y `AtomicReference` que realizan actualizaciones de una sola variable de forma atómica sin locks explícitos. Se apoyan en instrucciones de hardware de comparar e intercambiar (compare-and-swap, CAS): una actualización tiene éxito solo si el valor no ha cambiado desde que se leyó, y en caso contrario se reintenta. También tienen una visibilidad similar a volatile, así que todos los hilos ven el valor más reciente.",
   "Conoce los nombres de los métodos y lo que devuelven. `incrementAndGet()` suma uno y devuelve el valor nuevo (como `++x`), mientras que `getAndIncrement()` devuelve el valor anterior (como `x++`). Las versiones de decremento y suma siguen el mismo patrón: `decrementAndGet`, `getAndDecrement`, `addAndGet(n)`, `getAndAdd(n)`. `get()` y `set()` leen y escriben. `compareAndSet(expected, newValue)` establece el valor solo si actualmente es igual a expected y devuelve un boolean. `updateAndGet(x -> x * 2)` y `accumulateAndGet(5, Integer::sum)` aplican una función de forma atómica, reintentando si hace falta, así que la función debería estar libre de efectos secundarios.",
   "```java\nAtomicInteger hits = new AtomicInteger();\nhits.incrementAndGet();          // 1\nint old = hits.getAndAdd(10);    // old = 1, ahora 11\nhits.compareAndSet(11, 0);       // true, ahora 0\nhits.updateAndGet(x -> x + 5);   // 5\n```",
   "Los atómicos protegen una sola variable. Cuando un invariante abarca varias variables, como mover dinero entre dos saldos, necesitas un lock. `ReentrantLock` en `java.util.concurrent.locks` implementa la interfaz `Lock` y proporciona la misma exclusión mutua que synchronized, con más control. La regla es llamar a `lock()` antes del bloque try y a `unlock()` en finally, porque a diferencia de synchronized nada libera el lock automáticamente.",
   "```java\nprivate final Lock lock = new ReentrantLock();\nvoid transfer(Account a, Account b, int amt) {\n    lock.lock();\n    try { a.withdraw(amt); b.deposit(amt); }\n    finally { lock.unlock(); }\n}\n```",
   "El control adicional trata sobre todo de no esperar para siempre. `tryLock()` intenta adquirir el lock inmediatamente y devuelve true o false sin bloquearse. `tryLock(1, TimeUnit.SECONDS)` espera hasta ese tiempo y lanza `InterruptedException`. Cuando tryLock devuelve false no debes llamar a unlock, y deberías hacer otra cosa, como reintentar más tarde. `lockInterruptibly()` espera pero puede interrumpirse. `new ReentrantLock(true)` crea un lock justo (fair) que concede el acceso aproximadamente en orden de llegada, a cierto costo de rendimiento.",
   "Reentrante significa que el hilo que tiene el lock puede adquirirlo de nuevo; cada `lock()` incrementa un contador de retenciones, y el lock se libera solo después de un número igual de llamadas a `unlock()`. Llamar a `unlock()` sobre un lock que el hilo actual no tiene lanza `IllegalMonitorStateException`. Para datos con muchas lecturas, `ReentrantReadWriteLock` permite que muchos lectores compartan el acceso mientras los escritores obtienen acceso exclusivo."
  ],
  "terms": [
   [
    "AtomicInteger",
    "Un envoltorio de int con operaciones atómicas sin locks como incrementAndGet y compareAndSet."
   ],
   [
    "Compare-and-swap (CAS)",
    "Una operación atómica de hardware que actualiza un valor solo si todavía es igual a un valor esperado."
   ],
   [
    "ReentrantLock",
    "Una implementación explícita de Lock que el hilo que la tiene puede volver a adquirir, y que se libera con las llamadas unlock correspondientes."
   ],
   [
    "tryLock",
    "Un método de Lock que intenta adquirir el lock sin bloquearse, o dentro de un timeout, y devuelve si tuvo éxito."
   ],
   [
    "IllegalMonitorStateException",
    "Se lanza cuando un hilo libera un lock que no tiene."
   ]
  ],
  "example": "Un limitador de tasa cuenta las peticiones con un contador AtomicLong, mientras que un sistema de reservas que debe actualizar a la vez un mapa de asientos y un libro de pagos protege ambos con un solo ReentrantLock y usa tryLock con timeout para que una petición atascada falle rápido en lugar de quedarse colgada.",
  "tip": "incrementAndGet devuelve el valor nuevo y getAndIncrement el anterior. Libera siempre en finally, y solo después de un lock o tryLock exitoso; liberar un lock que no tienes lanza IllegalMonitorStateException.",
  "check": [
   [
    "Si un AtomicInteger contiene 5, ¿qué devuelve getAndIncrement() y cuál es el valor nuevo?",
    "Devuelve 5 y el valor pasa a ser 6."
   ],
   [
    "¿Qué devuelve tryLock() si otro hilo tiene el lock?",
    "false, inmediatamente, sin esperar."
   ],
   [
    "Un hilo llama dos veces a lock() sobre un ReentrantLock. ¿Cuántas llamadas a unlock() lo liberan?",
    "Dos; el contador de retenciones debe volver a cero."
   ]
  ]
 },
 {
  "t": "Concurrent collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
  "tt": "Colecciones concurrentes: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
  "body": [
   "Las colecciones ordinarias, ArrayList, HashMap y demás, no son seguras para hilos. Si varios hilos modifican una sin coordinación puedes perder actualizaciones, corromper su estructura interna u obtener una `ConcurrentModificationException`. Envolverlas con `Collections.synchronizedList(list)` o `synchronizedMap` hace que cada llamada a método se sincronice con un único lock, lo cual es correcto pero serializa todo el acceso, y aun así debes sincronizar manualmente al recorrerlas. El paquete `java.util.concurrent` ofrece colecciones diseñadas para la concurrencia.",
   "`ConcurrentHashMap` permite que muchos hilos lean y escriban a la vez con bloqueo interno de grano fino y lecturas sin locks. Sus iteradores son débilmente consistentes: nunca lanzan ConcurrentModificationException y reflejan el map en algún momento durante el recorrido. No permite claves ni valores null, y lanza NullPointerException si lo intentas. Las operaciones compuestas atómicas como `putIfAbsent`, `computeIfAbsent`, `compute` y `merge` te permiten actualizar de forma segura: `counts.merge(word, 1, Integer::sum)` cuenta palabras entre hilos sin un lock aparte. En cambio, una secuencia de get y luego put sigue siendo una condición de carrera.",
   "`CopyOnWriteArrayList` (y `CopyOnWriteArraySet`) copia todo el arreglo subyacente en cada modificación. Los iteradores trabajan sobre una instantánea tomada cuando se crearon, así que nunca lanzan ConcurrentModificationException y no ven los cambios posteriores, y el `remove` del propio iterador no se admite. Esto es eficiente cuando las lecturas y recorridos superan con mucho a las escrituras, como una lista de listeners de eventos, y es un desperdicio cuando las escrituras son frecuentes.",
   "```java\nList<String> listeners = new CopyOnWriteArrayList<>(List.of(\"a\", \"b\"));\nfor (String s : listeners) listeners.add(s + \"!\");  // sin excepción; el bucle solo ve a, b\nSystem.out.println(listeners);  // [a, b, a!, b!]\n\nBlockingQueue<String> q = new LinkedBlockingQueue<>(100);\nq.put(\"job\");            // espera si la cola está llena\nString job = q.take();   // espera si la cola está vacía\nString maybe = q.poll(1, TimeUnit.SECONDS); // null si no llega nada a tiempo\n```",
   "Una `BlockingQueue` es la columna vertebral de los diseños productor-consumidor. Los productores agregan trabajo y los consumidores lo retiran, y la cola se encarga de las esperas. Sus métodos vienen en grupos: `add` y `remove` lanzan excepciones cuando la cola está llena o vacía; `offer` y `poll` devuelven false o null inmediatamente; `put` y `take` se bloquean hasta que hay espacio o un elemento disponible; `offer(e, timeout, unit)` y `poll(timeout, unit)` esperan un tiempo limitado. Entre las implementaciones están `ArrayBlockingQueue` (acotada, basada en arreglo), `LinkedBlockingQueue` (opcionalmente acotada) y `PriorityBlockingQueue`.",
   "Otros miembros que puedes ver son `ConcurrentLinkedQueue` (no bloqueante), `ConcurrentSkipListMap` y `ConcurrentSkipListSet` (versiones ordenadas y concurrentes de TreeMap y TreeSet) y `LinkedBlockingDeque`. El examen suele preguntar qué colección encaja en un escenario y qué ocurre cuando modificas durante un recorrido."
  ],
  "terms": [
   [
    "ConcurrentHashMap",
    "Un map seguro para hilos que permite lecturas y escrituras concurrentes, con iteradores débilmente consistentes y sin claves ni valores null."
   ],
   [
    "CopyOnWriteArrayList",
    "Una lista segura para hilos que copia su arreglo en cada escritura; los iteradores usan una instantánea y nunca lanzan ConcurrentModificationException."
   ],
   [
    "BlockingQueue",
    "Una cola cuyos métodos put y take esperan espacio o elementos, usada para el traspaso productor-consumidor."
   ],
   [
    "Weakly consistent iterator (iterador débilmente consistente)",
    "Un iterador que tolera modificaciones concurrentes sin lanzar excepciones y puede reflejar o no los cambios hechos después de su creación."
   ]
  ],
  "example": "Un enviador de logs tiene varios hilos lectores que ponen líneas procesadas en una ArrayBlockingQueue de capacidad 10,000 y un hilo emisor que las toma en lotes. Cuando la red se vuelve lenta, la cola llena hace que los lectores esperen en put en lugar de quedarse sin memoria.",
  "tip": "Modificar un ArrayList mientras lo recorres lanza ConcurrentModificationException; un CopyOnWriteArrayList no, y el bucle ve la instantánea anterior. ConcurrentHashMap rechaza claves y valores null. put/take se bloquean, offer/poll no.",
  "check": [
   [
    "¿Qué método de BlockingQueue espera hasta que haya un elemento disponible?",
    "take() (o poll con un timeout para una espera limitada)."
   ],
   [
    "¿Qué ocurre con map.put(\"k\", null) en un ConcurrentHashMap?",
    "Lanza NullPointerException; no se permiten valores null."
   ],
   [
    "¿Por qué CopyOnWriteArrayList es una mala elección para una lista que se actualiza miles de veces por segundo?",
    "Cada escritura copia el arreglo entero, lo cual es costoso cuando las escrituras son frecuentes."
   ]
  ]
 },
 {
  "t": "Deadlock, starvation and livelock",
  "tt": "Deadlock, inanición (starvation) y livelock",
  "body": [
   "Estos tres son problemas de vivacidad (liveness): el programa no falla, pero algunos o todos los hilos dejan de avanzar de forma útil. El examen espera que identifiques cada uno a partir de una descripción o de un ejemplo de código y que sepas cómo prevenirlo.",
   "El deadlock (interbloqueo) ocurre cuando dos o más hilos tienen cada uno un lock que el otro necesita, y cada uno espera para siempre a que el otro lo libere. El caso clásico: el hilo 1 bloquea A y luego intenta bloquear B, mientras que el hilo 2 bloquea B y luego intenta bloquear A. Ambos quedan atascados en el estado BLOCKED (o WAITING, con locks explícitos), y nada cambiará nunca. Se requieren las cuatro condiciones: exclusión mutua, retener un recurso mientras se espera otro, ninguna liberación forzada y una espera circular.",
   "```java\n// Hilo 1                       // Hilo 2\nsynchronized (a) {               synchronized (b) {\n    synchronized (b) { ... }         synchronized (a) { ... }\n}                                }\n// Solución: ambos hilos adquieren primero a, luego b.\n```",
   "Para prevenir el deadlock, rompe una de las condiciones. La solución más común es un orden de locks consistente: todos los hilos adquieren los locks en el mismo orden global, por ejemplo por ID de cuenta, para que no pueda formarse una espera circular. Otras técnicas son retener un solo lock a la vez cuando sea posible, mantener pequeñas las regiones synchronized y usar `tryLock` con timeout para que un hilo que no consigue el segundo lock libere el primero y reintente. Para diagnosticar un deadlock en vivo, toma un volcado de hilos (thread dump), por ejemplo con la herramienta `jstack` o `jcmd <pid> Thread.print`; la JVM informa de los hilos en deadlock y de los locks que esperan.",
   "La inanición (starvation) ocurre cuando un hilo está listo para ejecutarse pero rara vez o nunca obtiene el recurso que necesita porque otros lo siguen tomando. Algunos ejemplos son un hilo que siempre pierde al competir por un lock injusto, un hilo de baja prioridad que otros hilos siguen desplazando, o un hilo que retiene un lock durante muchísimo tiempo. La solución es la equidad: locks justos como `new ReentrantLock(true)`, secciones críticas más cortas y colas de trabajo acotadas.",
   "El livelock ocurre cuando los hilos no están bloqueados pero siguen reaccionando unos a otros de modo que ninguno avanza, como dos personas en un pasillo que se hacen a un lado repetidamente hacia el mismo lado. En código, dos hilos que detectan un conflicto, retroceden, liberan y reintentan en el mismo momento pueden repetirlo para siempre mientras consumen CPU. Los estados de los hilos muestran RUNNABLE, que es lo que distingue el livelock del deadlock. Agregar una espera aleatoria (randomized backoff), o hacer que un lado ceda según su prioridad, rompe la simetría.",
   "Una forma rápida de recordarlo: deadlock significa que todos esperan y nadie se mueve; livelock significa que todos se mueven pero nadie llega a ningún lado; inanición significa que algunos hilos obtienen el recurso y otros nunca."
  ],
  "terms": [
   [
    "Deadlock (interbloqueo)",
    "Dos o más hilos que esperan para siempre cada uno un lock que tiene otro, formando un ciclo."
   ],
   [
    "Starvation (inanición)",
    "A un hilo se le niega perpetuamente el acceso a un recurso que necesita porque otros hilos lo siguen obteniendo."
   ],
   [
    "Livelock",
    "Los hilos siguen activos, respondiéndose repetidamente unos a otros, pero no avanzan."
   ],
   [
    "Lock ordering (orden de locks)",
    "Una técnica de prevención en la que todos los hilos adquieren varios locks en el mismo orden global."
   ],
   [
    "Thread dump (volcado de hilos)",
    "Una instantánea del estado y la pila de cada hilo, usada para encontrar deadlocks e hilos bloqueados."
   ]
  ],
  "example": "Un servicio bancario se congela de vez en cuando durante transferencias simultáneas entre las mismas dos cuentas. Un volcado de hilos muestra dos hilos, cada uno con el lock de una cuenta y esperando el de la otra. Bloquear las cuentas en orden de número de cuenta lo soluciona.",
  "tip": "Los hilos en deadlock están BLOCKED o WAITING; los hilos en livelock están RUNNABLE y ocupados. La solución estándar de deadlock en las opciones de respuesta es adquirir los locks en un orden consistente.",
  "check": [
   [
    "Dos hilos liberan y reintentan un lock repetidamente en respuesta el uno al otro, sin terminar nunca, mientras el uso de CPU se mantiene alto. ¿Qué problema es este?",
    "Livelock."
   ],
   [
    "¿Cuál es la forma más sencilla de prevenir el deadlock de lock A / lock B?",
    "Hacer que todos los hilos adquieran los locks en el mismo orden."
   ],
   [
    "¿Qué salida de herramienta ayuda a confirmar un deadlock en una JVM en ejecución?",
    "Un volcado de hilos, por ejemplo de jstack o jcmd Thread.print, que informa de los hilos en deadlock."
   ]
  ]
 },
 {
  "t": "Scoped values (Java 25): ScopedValue.where(...).run(...) as an alternative to ThreadLocal",
  "tt": "Scoped values (Java 25): ScopedValue.where(...).run(...) como alternativa a ThreadLocal",
  "body": [
   "Las aplicaciones a menudo necesitan pasar datos de contexto, como el usuario actual o un ID de petición, a través de muchas llamadas a métodos sin agregar un parámetro a cada método. La herramienta tradicional es `ThreadLocal`, una variable con un valor distinto por hilo. Tiene desventajas: cualquier código puede llamar a `set` en cualquier momento, así que el flujo de datos es difícil de seguir; los valores viven hasta que se eliminan explícitamente, lo que filtra datos y memoria en los pools de hilos; y los hilos hijos que heredan valores deben copiarlos. Con cantidades enormes de hilos virtuales estos costos crecen.",
   "Los scoped values (valores con alcance), definitivos en Java 25 en `java.lang.ScopedValue`, resuelven el mismo problema de otra forma. Un scoped value se enlaza a un valor durante la duración de una llamada, el alcance dinámico, y se desenlaza automáticamente cuando esa llamada retorna. Dentro del alcance, cualquier método llamado directa o indirectamente puede leerlo. Fuera del alcance no tiene valor. No hay método `set`, así que el enlace es efectivamente inmutable durante toda la llamada.",
   "```java\nstatic final ScopedValue<String> USER = ScopedValue.newInstance();\n\nvoid handle(Request req) {\n    ScopedValue.where(USER, req.user()).run(() -> service());\n    // aquí USER ya no está enlazado\n}\nvoid service() { audit(); }\nvoid audit() {\n    String who = USER.isBound() ? USER.get() : \"anonymous\";\n    System.out.println(\"action by \" + who);\n}\n```",
   "Creas una clave con `ScopedValue.newInstance()`, normalmente como campo `static final`. `ScopedValue.where(key, value)` devuelve un carrier, y `run(Runnable)` ejecuta código con el enlace activo; `call(...)` hace lo mismo para código que devuelve un resultado. Se pueden encadenar varios enlaces: `where(USER, u).where(REQ_ID, id).run(...)`. Dentro, `key.get()` devuelve el valor, `isBound()` comprueba si hay uno, y `orElse(other)` da un valor alternativo. Llamar a `get()` cuando el valor no está enlazado lanza `NoSuchElementException`.",
   "Aunque un enlace no puede cambiarse, una llamada anidada puede volver a enlazar la misma clave con su propio `where(...).run(...)`. Dentro del alcance anidado el nuevo valor es visible; cuando retorna, vuelve a ser visible el valor externo. Esto da un flujo de datos claro y en un solo sentido, de quien llama a quien es llamado, más fácil de razonar que las llamadas arbitrarias a set de ThreadLocal.",
   "Como los enlaces terminan cuando termina el alcance, no hay nada que limpiar ni riesgo de que los datos de una petición se filtren a la siguiente tarea en un hilo de un pool. Los scoped values también están diseñados para ser baratos de leer y para compartirse eficientemente con los hilos hijos creados mediante concurrencia estructurada. Elige ThreadLocal cuando el código realmente necesite una caché mutable por hilo; elige scoped values para pasar contexto de solo lectura a lo largo de un trabajo acotado."
  ],
  "terms": [
   [
    "ScopedValue",
    "Un valor enlazado durante la duración de una llamada y legible por todo el código del alcance dinámico de esa llamada, que luego se desenlaza automáticamente."
   ],
   [
    "ScopedValue.where",
    "Crea un enlace entre una clave de scoped value y un valor, seguido de run o call para ejecutar código con él."
   ],
   [
    "Dynamic scope (alcance dinámico)",
    "El conjunto de código ejecutado durante una llamada, incluidos los métodos llamados indirectamente, donde un enlace es visible."
   ],
   [
    "ThreadLocal",
    "Una variable con un valor mutable distinto por hilo que persiste hasta que se elimina."
   ],
   [
    "Rebinding (reenlace)",
    "Enlazar un scoped value ya enlazado a un valor nuevo en una llamada anidada where(...).run(...)."
   ]
  ],
  "example": "Un framework web enlaza el usuario autenticado con ScopedValue.where(CURRENT_USER, user).run(() -> handler.handle(request)). En lo profundo, un registrador de auditoría lee CURRENT_USER.get() sin que el usuario se pase por cada capa, y el enlace desaparece cuando termina la petición.",
  "tip": "Los scoped values no tienen método set; la única forma de cambiar el valor visible es volver a enlazarlo en un alcance anidado. get() fuera de cualquier enlace lanza NoSuchElementException, así que usa isBound u orElse cuando el valor pueda faltar.",
  "check": [
   [
    "Después de que ScopedValue.where(K, \"x\").run(task) retorna, ¿sigue K enlazado en quien llamó?",
    "No. El enlace dura solo lo que dura run."
   ],
   [
    "¿Cómo le das a un scoped value un valor distinto para una parte de un cálculo?",
    "Volviendo a enlazarlo con una llamada anidada ScopedValue.where(K, newValue).run(...)."
   ],
   [
    "¿Cuál es una ventaja de los scoped values sobre ThreadLocal en los pools de hilos?",
    "Los enlaces terminan automáticamente cuando termina el alcance, así que los datos no pueden filtrarse a tareas posteriores y no hay nada que eliminar."
   ]
  ]
 },
 {
  "t": "Path creation and operations: resolve, relativize, normalize, getFileName, getParent",
  "tt": "Creación y operaciones de Path: resolve, relativize, normalize, getFileName, getParent",
  "body": [
   "La API NIO.2 de `java.nio.file` representa una ubicación en un sistema de archivos con la interfaz `Path`. Creas uno con `Path.of(\"data\", \"logs\", \"app.log\")` o con el equivalente antiguo `Paths.get(...)`. Crear un Path no toca el disco: el archivo no necesita existir, y la mayoría de los métodos de Path son pura manipulación de texto. Una ruta absoluta empieza desde una raíz, como `/` en Linux o `C:\\` en Windows; una ruta relativa se interpreta respecto al directorio de trabajo actual.",
   "Una ruta es una secuencia de elementos de nombre. `getFileName()` devuelve el último elemento como Path (`app.log`), `getParent()` devuelve todo lo anterior (`data/logs`), y `getRoot()` devuelve el componente raíz o null para una ruta relativa. `getNameCount()` cuenta los elementos, sin incluir la raíz, y `getName(0)` devuelve el primer elemento después de la raíz. `subpath(begin, end)` extrae elementos con el índice final exclusivo. `getParent()` devuelve null cuando no hay padre, como en la ruta de un solo elemento `app.log`, y `getFileName()` de la raíz `/` es null.",
   "`resolve(other)` une rutas. `Path.of(\"/home/ana\").resolve(\"docs/a.txt\")` da `/home/ana/docs/a.txt`. Si el argumento es absoluto, resolve simplemente devuelve el argumento: `Path.of(\"/home\").resolve(\"/etc\")` es `/etc`. `resolveSibling(other)` resuelve respecto al padre, lo cual es práctico para renombrar un archivo en el mismo directorio.",
   "`relativize(other)` responde: ¿cómo llego de esta ruta a esa otra? `Path.of(\"/a/b\").relativize(Path.of(\"/a/c/d\"))` es `../c/d`. Ambas rutas deben ser del mismo tipo, las dos absolutas o las dos relativas; mezclarlas lanza `IllegalArgumentException`. En Windows también deben compartir la misma raíz. `normalize()` elimina los elementos `.` redundantes y resuelve los pares `nombre/..`: `Path.of(\"/a/./b/../c\").normalize()` es `/a/c`. Trabaja solo sobre el texto, así que no sigue enlaces simbólicos ni comprueba la existencia; un `..` inicial en una ruta relativa se conserva.",
   "```java\nPath base = Path.of(\"/srv/app\");\nPath cfg  = base.resolve(\"conf/../conf/./app.properties\");\ncfg.normalize();                 // /srv/app/conf/app.properties\ncfg.getFileName();               // app.properties\ncfg.normalize().getParent();     // /srv/app/conf\nbase.relativize(Path.of(\"/srv/logs/x.log\")); // ../logs/x.log\nPath.of(\"a\").getParent();        // null\n```",
   "Dos métodos van más allá del texto de la ruta. `toAbsolutePath()` antepone el directorio de trabajo a una ruta relativa sin comprobar si existe. `toRealPath()` devuelve la ruta canónica con los enlaces simbólicos resueltos y los `..` eliminados, y lanza `IOException` si el archivo no existe. Normalizar y luego comprobar que una ruta resuelta sigue empezando con un directorio base esperado es un patrón defensivo común contra el path traversal (recorrido de rutas), donde una entrada del usuario como `../../etc/passwd` intenta escapar de una carpeta de subidas."
  ],
  "terms": [
   [
    "Path",
    "Una interfaz que representa una ubicación del sistema de archivos como una secuencia de elementos de nombre, opcionalmente con una raíz."
   ],
   [
    "resolve",
    "Une una ruta con otra; devuelve el argumento sin cambios si el argumento es absoluto."
   ],
   [
    "relativize",
    "Construye una ruta relativa de una ruta a otra; ambas deben ser absolutas o ambas relativas."
   ],
   [
    "normalize",
    "Elimina los elementos . y los pares nombre/.. mediante lógica de texto sin acceder al sistema de archivos."
   ],
   [
    "toRealPath",
    "Devuelve la ruta real con los enlaces resueltos, y lanza IOException si el archivo no existe."
   ]
  ],
  "example": "Un servicio de subida de archivos construye el destino con uploads.resolve(userFileName).normalize() y rechaza la petición a menos que el resultado siga cumpliendo startsWith(uploads). Un nombre malicioso que contiene segmentos ../ se detecta antes de escribir ningún archivo.",
  "tip": "Resolver una ruta absoluta la devuelve sin cambios, relativize lanza IllegalArgumentException al mezclar rutas absolutas y relativas, y normalize nunca comprueba el disco. La mayoría de los métodos de Path no requieren que el archivo exista.",
  "check": [
   [
    "¿Cuánto es Path.of(\"x/y\").resolve(\"/z\")?",
    "/z, porque resolver una ruta absoluta devuelve el argumento."
   ],
   [
    "¿Cuánto es Path.of(\"/a/b/c\").relativize(Path.of(\"/a\"))?",
    "../.."
   ],
   [
    "¿Qué devuelve Path.of(\"report.txt\").getParent()?",
    "null, porque una ruta relativa de un solo elemento no tiene padre."
   ]
  ]
 },
 {
  "t": "Files methods: exists, createDirectory vs createDirectories, copy, move, delete",
  "tt": "Métodos de Files: exists, createDirectory vs createDirectories, copy, move, delete",
  "body": [
   "Mientras que Path describe una ubicación, la clase `Files` contiene métodos estáticos que actúan sobre el sistema de archivos. La mayoría lanzan la `IOException` checked o una subclase específica, y el examen suele preguntar qué excepción ocurre. `Files.exists(path)` y `Files.notExists(path)` comprueban la existencia; ambos pueden devolver false si el programa no puede determinar la respuesta, por ejemplo por permisos. `isDirectory`, `isRegularFile`, `isReadable`, `size` e `isSameFile` son otras comprobaciones comunes.",
   "`Files.createDirectory(path)` crea exactamente un directorio. Lanza `FileAlreadyExistsException` si ya existe algo en esa ruta, y `NoSuchFileException` si falta el directorio padre. `Files.createDirectories(path)` crea el directorio junto con cualquier padre que falte, como `mkdir -p`, y no lanza excepción si el directorio ya existe. `Files.createFile` crea un archivo vacío y lanza FileAlreadyExistsException si ya existe.",
   "`Files.copy(source, target)` copia un archivo. Por defecto falla con `FileAlreadyExistsException` si el destino existe; pasa `StandardCopyOption.REPLACE_EXISTING` para sobrescribir. Copiar un directorio crea un directorio vacío en el destino: el contenido no se copia, así que copiar un árbol requiere recorrerlo. Hay sobrecargas que copian de un InputStream a un Path, o de un Path a un OutputStream. `COPY_ATTRIBUTES` conserva las marcas de tiempo cuando se admite.",
   "`Files.move(source, target)` mueve o renombra. También lanza FileAlreadyExistsException a menos que se indique REPLACE_EXISTING. `StandardCopyOption.ATOMIC_MOVE` pide un movimiento de todo o nada y lanza `AtomicMoveNotSupportedException` si el sistema de archivos no puede hacerlo. Renombrar dentro del mismo directorio es un movimiento a un nombre nuevo, y mover un directorio vacío está permitido; mover un directorio no vacío puede requerir copiar entre sistemas de archivos, lo cual move no hace por ti.",
   "```java\nPath dir = Path.of(\"out/reports/2026\");\nFiles.createDirectories(dir);                 // crea out, reports y 2026 según haga falta\nPath src = Path.of(\"draft.txt\");\nFiles.copy(src, dir.resolve(\"final.txt\"), StandardCopyOption.REPLACE_EXISTING);\nFiles.move(src, Path.of(\"archive/draft.txt\")); // NoSuchFileException si falta archive\nFiles.delete(Path.of(\"tmp.txt\"));        // NoSuchFileException si no existe\nboolean gone = Files.deleteIfExists(Path.of(\"tmp.txt\")); // false, sin excepción\n```",
   "`Files.delete(path)` lanza `NoSuchFileException` si la ruta no existe y `DirectoryNotEmptyException` si es un directorio que todavía tiene entradas. `Files.deleteIfExists(path)` devuelve un boolean en lugar de lanzar una excepción cuando falta el archivo, pero sigue lanzándola con un directorio no vacío. Por defecto, delete elimina el propio enlace simbólico en lugar de su destino, y exists sigue los enlaces a menos que pases `LinkOption.NOFOLLOW_LINKS`.",
   "Comprobar `exists` y luego actuar es una condición de carrera si otro proceso puede cambiar el archivo entre medio. Cuando sea posible, simplemente intenta la operación y maneja la excepción específica; `createFile` y `CREATE_NEW` fallan de forma segura cuando un archivo ya existe, lo que también es la opción defensiva para archivos temporales o de bloqueo."
  ],
  "terms": [
   [
    "Files.createDirectories",
    "Crea un directorio y todos los padres que falten, sin fallar si el directorio ya existe."
   ],
   [
    "FileAlreadyExistsException",
    "Se lanza cuando una operación crearía o sobrescribiría una ruta que ya existe sin permiso para reemplazarla."
   ],
   [
    "REPLACE_EXISTING",
    "Una StandardCopyOption que permite a copy o move sobrescribir un destino existente."
   ],
   [
    "ATOMIC_MOVE",
    "Una opción de move que pide un movimiento de todo o nada, y falla si el sistema de archivos no puede garantizarlo."
   ],
   [
    "DirectoryNotEmptyException",
    "Se lanza al intentar eliminar un directorio que todavía contiene entradas."
   ]
  ],
  "example": "Un trabajo nocturno escribe en reports/2026/09 usando Files.createDirectories para que la primera ejecución de cada mes cree las carpetas, escribe en un archivo temporal y luego usa Files.move con ATOMIC_MOVE y REPLACE_EXISTING para que los lectores nunca vean un reporte escrito a medias.",
  "tip": "createDirectory falla si el directorio existe o si falta el padre; createDirectories maneja ambos casos. copy y move fallan con un destino existente a menos que se indique REPLACE_EXISTING. delete lanza una excepción con un archivo inexistente; deleteIfExists devuelve false.",
  "check": [
   [
    "¿Qué ocurre con Files.createDirectory(Path.of(\"a/b\")) cuando a no existe?",
    "Lanza NoSuchFileException porque falta el padre; createDirectories crearía ambos."
   ],
   [
    "¿Files.copy sobre un directorio copia sus archivos?",
    "No. Crea un directorio vacío en el destino; el contenido no se copia."
   ],
   [
    "¿Qué lanza Files.delete para un directorio que contiene archivos?",
    "DirectoryNotEmptyException."
   ]
  ]
 },
 {
  "t": "Reading and writing text with Files.readAllLines, Files.lines, Files.writeString",
  "tt": "Leer y escribir texto con Files.readAllLines, Files.lines, Files.writeString",
  "body": [
   "La clase `Files` ofrece métodos prácticos de una sola llamada para el texto. Usan UTF-8 por defecto a menos que pases un `Charset`. Elegir el adecuado depende sobre todo del tamaño del archivo y de si necesitas todos los datos a la vez.",
   "`Files.readAllLines(path)` lee todo el archivo y devuelve un `List<String>`, un elemento por línea con los terminadores de línea eliminados. `Files.readString(path)` devuelve todo el archivo como un único String. Ambos son sencillos y abren y cierran el archivo por sí mismos, pero cargan todo en memoria, así que sirven para archivos pequeños y medianos. Si los bytes no son válidos en el charset, la lectura falla con una `MalformedInputException`, un tipo de IOException.",
   "`Files.lines(path)` devuelve un `Stream<String>` que lee las líneas de forma perezosa a medida que se consume el stream. Eso lo hace adecuado para archivos muy grandes, y se combina de forma natural con las operaciones de stream: `filter`, `map`, `limit`, etc. Como el stream mantiene abierto un manejador de archivo, debes cerrarlo, normalmente con try-with-resources. Un error de E/S durante el consumo aparece como una `UncheckedIOException`, ya que las lambdas de un stream no pueden lanzar excepciones checked. `Files.newBufferedReader(path)` es la alternativa sin streams para leer línea por línea.",
   "```java\nPath log = Path.of(\"app.log\");\nList<String> all = Files.readAllLines(log);          // todo el archivo en memoria\ntry (Stream<String> lines = Files.lines(log)) {      // perezoso, debe cerrarse\n    long errors = lines.filter(l -> l.contains(\"ERROR\")).count();\n}\nFiles.writeString(Path.of(\"out.txt\"), \"first line\\n\");\nFiles.writeString(Path.of(\"out.txt\"), \"second line\\n\", StandardOpenOption.APPEND);\nFiles.write(Path.of(\"list.txt\"), List.of(\"a\", \"b\"));  // un elemento por línea\n```",
   "`Files.writeString(path, text)` escribe un CharSequence. Sin opciones usa CREATE, TRUNCATE_EXISTING y WRITE: crea el archivo si falta y reemplaza cualquier contenido existente. `Files.write(path, lines)` escribe un Iterable de cadenas, agregando un separador de línea después de cada una, y `Files.write(path, bytes)` escribe un arreglo de bytes. `Files.newBufferedWriter` da un writer para salida incremental.",
   "Las opciones de apertura cambian el comportamiento, y especificar cualquier opción reemplaza los valores por defecto. `StandardOpenOption.APPEND` agrega al final en lugar de truncar. Si pasas solo APPEND y el archivo no existe, obtienes `NoSuchFileException`, así que combínalo con CREATE cuando el archivo pueda faltar. `CREATE_NEW` falla con FileAlreadyExistsException si el archivo existe, lo cual es útil cuando no debes sobrescribir. Recuerda que el directorio padre de la ruta ya debe existir; ninguno de estos métodos crea directorios.",
   "Para el examen, céntrate en los tipos de retorno (List frente a Stream frente a String), en la necesidad de cerrar `Files.lines` y en el comportamiento de truncado por defecto de los métodos de escritura."
  ],
  "terms": [
   [
    "Files.readAllLines",
    "Lee un archivo entero en un List<String>, un elemento por línea, y cierra el archivo."
   ],
   [
    "Files.lines",
    "Devuelve un Stream<String> de las líneas del archivo, llenado de forma perezosa, que debe cerrarse después de usarse."
   ],
   [
    "Files.writeString",
    "Escribe un CharSequence en un archivo, por defecto creándolo o truncando el contenido existente."
   ],
   [
    "StandardOpenOption.APPEND",
    "Una opción de apertura que escribe al final de un archivo existente en lugar de reemplazar su contenido."
   ],
   [
    "UncheckedIOException",
    "Un envoltorio unchecked de una IOException, usado cuando la E/S falla dentro del procesamiento de un stream."
   ]
  ],
  "example": "Un ingeniero de soporte necesita contar los inicios de sesión fallidos en un log de autenticación de 20 GB. Files.readAllLines agotaría la memoria, así que usa try (Stream<String> s = Files.lines(log)) { s.filter(...).count(); }, que lee una línea a la vez y cierra el archivo al terminar.",
  "tip": "readAllLines devuelve un List y cierra el archivo; lines devuelve un Stream que debes cerrar. writeString sin opciones trunca el contenido existente, y APPEND por sí solo falla si el archivo no existe.",
  "check": [
   [
    "¿Qué método es apropiado para un archivo demasiado grande para caber en memoria?",
    "Files.lines (o un BufferedReader), que lee de forma perezosa línea por línea."
   ],
   [
    "¿Qué ocurre si llamas a Files.writeString(path, \"x\") sobre un archivo que ya tiene contenido?",
    "El contenido existente se reemplaza, porque las opciones por defecto incluyen TRUNCATE_EXISTING."
   ],
   [
    "¿Por qué Files.lines debe usarse en try-with-resources?",
    "El stream devuelto mantiene el archivo abierto hasta que se cierra el stream."
   ]
  ]
 },
 {
  "t": "Walking file trees: Files.list vs Files.walk vs Files.find",
  "tt": "Recorrer árboles de archivos: Files.list vs Files.walk vs Files.find",
  "body": [
   "Tres métodos de `Files` devuelven un `Stream<Path>` que describe el contenido de un directorio, y la diferencia entre ellos es una pregunta común del examen. Los tres son perezosos, los tres mantienen abiertos manejadores de directorio y los tres deben usarse en try-with-resources.",
   "`Files.list(dir)` devuelve las entradas que están directamente dentro de un directorio: archivos y subdirectorios, pero no el contenido de esos subdirectorios. No es recursivo, y no incluye el propio directorio. Lanza `NotDirectoryException` si la ruta no es un directorio. Piensa en él como `ls`.",
   "`Files.walk(start)` recorre todo el árbol en profundidad, empezando por el propio `start` y descendiendo a cada subdirectorio. `Files.walk(start, maxDepth)` limita la profundidad: un maxDepth de 0 da solo la ruta de inicio, 1 da el inicio más sus hijos directos, y así sucesivamente. Así que `Files.walk(dir, 1)` es como `Files.list(dir)` más el propio `dir`. Por defecto walk no sigue los enlaces simbólicos; pasar `FileVisitOption.FOLLOW_LINKS` hace que los siga, y entonces un ciclo de enlaces causa una `FileSystemLoopException` envuelta en una UncheckedIOException.",
   "`Files.find(start, maxDepth, matcher)` también recorre el árbol pero va filtrando mientras avanza. El matcher es un `BiPredicate<Path, BasicFileAttributes>`, que te da los atributos del archivo, como el tamaño, la fecha de modificación y si es un directorio, sin una llamada adicional al sistema por cada archivo. A diferencia de walk, el parámetro maxDepth es obligatorio. Usar find suele ser más eficiente que walk seguido de un filtro que llama a `Files.size` o `Files.isDirectory` en cada ruta.",
   "```java\nPath root = Path.of(\"project\");\ntry (Stream<Path> s = Files.list(root)) {\n    s.forEach(System.out::println);               // solo los hijos directos\n}\ntry (Stream<Path> s = Files.walk(root)) {\n    long javaFiles = s.filter(p -> p.toString().endsWith(\".java\")).count();\n}\ntry (Stream<Path> s = Files.find(root, 10,\n        (p, attr) -> attr.isRegularFile() && attr.size() > 1_000_000)) {\n    s.forEach(p -> System.out.println(\"large: \" + p));\n}\n```",
   "Los errores que ocurren mientras se consume el stream, como un subdirectorio que no tienes permiso para leer, se lanzan como `UncheckedIOException`. Para más control, incluidas acciones antes y después de visitar cada directorio y la posibilidad de saltarse subárboles, el antiguo `Files.walkFileTree(start, visitor)` recibe un `FileVisitor`, normalmente una subclase de `SimpleFileVisitor` que sobrescribe `visitFile` y `postVisitDirectory`. Es la forma estándar de eliminar un árbol de directorios, porque cada directorio debe vaciarse antes de poder eliminarse."
  ],
  "terms": [
   [
    "Files.list",
    "Devuelve un Stream<Path> perezoso de las entradas directas de un directorio, sin recursión."
   ],
   [
    "Files.walk",
    "Devuelve un Stream<Path> perezoso, en profundidad, de un árbol de directorios, incluida la ruta de inicio, opcionalmente limitado por maxDepth."
   ],
   [
    "Files.find",
    "Recorre un árbol hasta un maxDepth obligatorio y devuelve las rutas que cumplen un BiPredicate<Path, BasicFileAttributes>."
   ],
   [
    "BasicFileAttributes",
    "Una interfaz que expone el tamaño, las marcas de tiempo y el tipo de archivo leídos junto con la entrada del directorio."
   ],
   [
    "FOLLOW_LINKS",
    "Una FileVisitOption que hace que walk y find sigan los enlaces simbólicos."
   ]
  ],
  "example": "Un script de limpieza usa Files.find(logDir, 3, (p, a) -> a.isRegularFile() && a.lastModifiedTime().toInstant().isBefore(cutoff)) para encontrar archivos de log antiguos sin llamar a Files.getLastModifiedTime por separado para cada archivo, y luego elimina cada coincidencia.",
  "tip": "list es un solo nivel y excluye el directorio de inicio; walk es recursivo e incluye el directorio de inicio; find requiere maxDepth y un BiPredicate que recibe atributos. Todos devuelven streams que deben cerrarse.",
  "check": [
   [
    "¿Files.walk(dir) incluye el propio dir en el stream?",
    "Sí. La ruta de inicio es el primer elemento."
   ],
   [
    "¿Qué devuelve Files.walk(dir, 0)?",
    "Un stream que contiene solo dir."
   ],
   [
    "¿Cuáles son los tipos de los parámetros del matcher que se pasa a Files.find?",
    "Path y BasicFileAttributes, en un BiPredicate."
   ]
  ]
 },
 {
  "t": "Byte and character streams, BufferedReader and BufferedWriter",
  "tt": "Streams de bytes y de caracteres, BufferedReader y BufferedWriter",
  "body": [
   "El paquete original `java.io`, todavía muy usado, organiza la E/S en streams (que no deben confundirse con la API Stream). Los streams de bytes leen y escriben bytes crudos de 8 bits y descienden de las clases abstractas `InputStream` y `OutputStream`. Los streams de caracteres leen y escriben texto como chars y descienden de `Reader` y `Writer`. El nombre de la clase te dice cuál es: los nombres que terminan en Stream manejan bytes, los que terminan en Reader o Writer manejan caracteres.",
   "Usa streams de bytes para datos binarios como imágenes u objetos serializados: `FileInputStream`, `FileOutputStream`, `BufferedInputStream`, `ObjectInputStream`. Usa streams de caracteres para texto, porque decodifican los bytes en caracteres usando un charset: `FileReader`, `FileWriter`, `BufferedReader`, `PrintWriter`. `InputStreamReader` y `OutputStreamWriter` son los puentes que envuelven un stream de bytes y aplican un charset, por ejemplo `new InputStreamReader(System.in, StandardCharsets.UTF_8)`. Desde Java 18 el charset por defecto es UTF-8.",
   "Los streams siguen el patrón decorador: los streams de bajo nivel se conectan a una fuente como un archivo, y los de alto nivel envuelven otro stream para agregar funciones. El buffering es la función más importante. Leer un byte o char a la vez directamente de un archivo hace una llamada al sistema cada vez; un stream con buffer lee un bloque grande en memoria y sirve las lecturas desde él. Cerrar el stream más externo cierra los que envuelve.",
   "```java\ntry (var in = new BufferedReader(new FileReader(\"in.txt\"));\n     var out = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    String line;\n    while ((line = in.readLine()) != null) {   // null significa fin de archivo\n        out.write(line.toUpperCase());\n        out.newLine();                          // separador de línea de la plataforma\n    }\n}   // al cerrar se hace flush de out, y luego se cierran ambos archivos\n```",
   "Métodos clave y valores de retorno: `InputStream.read()` devuelve el siguiente byte como un int de 0 a 255, o -1 al final del stream. `Reader.read()` devuelve un char como int, o -1 al final. `read(byte[])` devuelve cuántos bytes se leyeron, o -1. `BufferedReader.readLine()` devuelve una línea sin su terminador, o null al final del archivo. `BufferedWriter.newLine()` escribe un separador de línea, y `flush()` fuerza la salida de los datos en el buffer. Olvidar hacer flush o cerrar un writer puede dejar salida sin escribir en el archivo.",
   "`PrintWriter` y `PrintStream` (el tipo de `System.out`) agregan `print`, `println`, `printf` y `format`. Nunca lanzan IOException desde estos métodos; en su lugar activan una bandera interna de error que puedes comprobar con `checkError()`. `new FileWriter(\"log.txt\", true)` abre en modo de anexar (append). `transferTo(OutputStream)` copia todos los bytes restantes de un InputStream en una sola llamada.",
   "La clase `Files` proporciona fábricas modernas para los mismos objetos, `Files.newBufferedReader(path)` y `Files.newBufferedWriter(path, options)`, que usan UTF-8 por defecto y aceptan las mismas opciones de apertura que los demás métodos de Files."
  ],
  "terms": [
   [
    "Byte stream (stream de bytes)",
    "Un InputStream u OutputStream que transfiere bytes crudos, adecuado para datos binarios."
   ],
   [
    "Character stream (stream de caracteres)",
    "Un Reader o Writer que transfiere caracteres, decodificando y codificando bytes con un charset."
   ],
   [
    "InputStreamReader",
    "Un puente que envuelve un InputStream de bytes y lo decodifica en caracteres usando un charset."
   ],
   [
    "BufferedReader",
    "Un Reader que usa buffer para la entrada y proporciona readLine(), que devuelve null al final del archivo."
   ],
   [
    "flush",
    "Fuerza que cualquier salida en el buffer se escriba en el destino subyacente."
   ]
  ],
  "example": "Una exportación a CSV escribe 100,000 filas con un BufferedWriter que envuelve un FileWriter, llamando a newLine() después de cada fila. Sin buffering, cada escritura pequeña iba por separado al disco y la exportación tardaba minutos; con él, termina en segundos.",
  "tip": "Las señales de fin de datos difieren: read() devuelve -1, readLine() devuelve null. Las clases que terminan en Stream manejan bytes; Reader y Writer manejan caracteres. Cerrar el envoltorio externo cierra el stream interno.",
  "check": [
   [
    "¿Qué devuelve BufferedReader.readLine() al final del archivo?",
    "null."
   ],
   [
    "¿Qué clase convierte un InputStream de bytes en un Reader de caracteres?",
    "InputStreamReader."
   ],
   [
    "¿Por qué podría faltar salida en un archivo escrito con BufferedWriter?",
    "No se hizo flush ni se cerró el writer, así que los datos del buffer nunca se escribieron."
   ]
  ]
 },
 {
  "t": "Console and standard input/output",
  "tt": "Console y entrada/salida estándar",
  "body": [
   "Todo programa Java tiene tres streams estándar, disponibles como campos estáticos de `System`. `System.in` es un `InputStream` conectado a la entrada estándar, normalmente el teclado. `System.out` es un `PrintStream` para la salida normal y `System.err` es un `PrintStream` para los mensajes de error. Mantener los errores en `System.err` permite a los usuarios redirigir la salida normal a un archivo sin dejar de ver los errores en pantalla. `System.setOut` y `System.setIn` pueden reasignar estos streams, lo cual es útil en las pruebas.",
   "`System.out` ofrece `print`, `println` y salida con formato mediante `printf(format, args)` o su gemelo `format`. Los especificadores comunes son `%s` para cadenas, `%d` para enteros, `%f` para punto flotante (`%.2f` para dos decimales), `%n` para un separador de línea de la plataforma, y un ancho como `%5d` para números alineados a la derecha. Un especificador que no coincide, como `%d` con un argumento String, lanza una `IllegalFormatException` en tiempo de ejecución.",
   "Como `System.in` es un stream de bytes crudo, normalmente lo envuelves. `new BufferedReader(new InputStreamReader(System.in))` da `readLine()`, que devuelve null cuando termina la entrada. `java.util.Scanner` analiza tokens: `nextInt()`, `nextDouble()`, `next()` para una palabra y `nextLine()` para el resto de la línea. Una trampa clásica de Scanner es llamar a `nextLine()` después de `nextInt()`: nextInt deja el salto de línea en la entrada, así que el nextLine siguiente devuelve una cadena vacía. `IO.readln()` de `java.lang.IO` es una opción más sencilla para programas pequeños.",
   "```java\nConsole c = System.console();\nif (c == null) {\n    System.err.println(\"No console available\");\n    return;\n}\nString user = c.readLine(\"User: \");\nchar[] pw = c.readPassword(\"Password: \");   // no se muestra en pantalla\ntry {\n    c.printf(\"Hello %s%n\", user);\n} finally {\n    java.util.Arrays.fill(pw, ' ');           // borra la contraseña de la memoria\n}\n```",
   "`System.console()` devuelve un `java.io.Console`, o null cuando no hay consola disponible, por ejemplo en algunos IDE o cuando el programa se ejecuta como servicio en segundo plano; comprueba siempre si es null. Console proporciona `readLine()` y `readLine(format, args)` para la entrada con mensaje, `readPassword()`, que desactiva el eco y devuelve un `char[]`, `printf` y `format`, `flush()`, y `reader()` y `writer()` para obtener un Reader y un PrintWriter ligados a la consola.",
   "¿Por qué un arreglo de char para las contraseñas? Los String son inmutables y pueden quedarse en memoria hasta que el recolector de basura los elimine, y es fácil registrarlos en un log por accidente. Un arreglo de char puede sobrescribirse en cuanto terminas, lo cual es una medida defensiva pequeña pero real. Nunca imprimas ni registres una contraseña, ni siquiera mientras depuras.",
   "Para el examen, recuerda los tipos (System.in es InputStream, System.out y err son PrintStream), que `System.console()` puede devolver null y que `readPassword` devuelve char[] en lugar de String."
  ],
  "terms": [
   [
    "System.in",
    "El stream de entrada estándar, un InputStream normalmente conectado al teclado."
   ],
   [
    "System.err",
    "El stream de error estándar, un PrintStream pensado para mensajes de error y de diagnóstico."
   ],
   [
    "Console",
    "Una clase obtenida de System.console() para entrada y salida de texto interactiva, que puede ser null cuando no está disponible."
   ],
   [
    "readPassword",
    "Un método de Console que lee la entrada sin mostrarla y devuelve un arreglo de char."
   ],
   [
    "printf",
    "Un método que escribe salida con formato usando especificadores como %s, %d, %.2f y %n."
   ]
  ],
  "example": "Una herramienta de administración de línea de comandos usa System.console().readPassword(\"Password: \") para que la contraseña nunca aparezca en pantalla ni en el historial de la terminal, borra el arreglo de char después de autenticar e imprime los fallos en System.err para no contaminar los scripts que capturan stdout.",
  "tip": "System.console() puede devolver null, así que el código del examen que llama a un método sobre él sin comprobarlo puede lanzar NullPointerException. readPassword devuelve char[], y System.out y System.err son PrintStream.",
  "check": [
   [
    "¿Qué tipo devuelve Console.readPassword() y por qué?",
    "char[], para que quien llama pueda sobrescribir la contraseña en memoria después de usarla, cosa que no es posible con un String inmutable."
   ],
   [
    "Después de que scanner.nextInt() lee 5 de la línea \"5\", ¿qué devuelve scanner.nextLine()?",
    "Una cadena vacía, porque nextInt dejó sin leer el terminador de línea."
   ]
  ]
 },
 {
  "t": "Serialization: Serializable, transient fields, serialVersionUID",
  "tt": "Serialización: Serializable, campos transient, serialVersionUID",
  "body": [
   "La serialización convierte un grafo de objetos en un stream de bytes para poder guardarlo en un archivo o enviarlo por la red; la deserialización reconstruye los objetos a partir de esos bytes. En Java escribes con `ObjectOutputStream.writeObject(obj)` y lees con `ObjectInputStream.readObject()`, que devuelve Object (así que haces cast) y puede lanzar `ClassNotFoundException` además de IOException.",
   "Una clase se apunta implementando `java.io.Serializable`, una interfaz marcadora sin métodos. Todo campo de instancia no transient debe ser a su vez serializable, es decir, un primitivo o un tipo que implemente Serializable; de lo contrario la escritura falla en tiempo de ejecución con `NotSerializableException`. Muchos tipos estándar son serializables, como String, las clases envoltorio y las colecciones comunes. Los records también pueden ser serializables.",
   "Los campos marcados como `transient` se omiten. Úsalo para datos que no deben persistirse, como una contraseña, un valor en caché que puede recalcularse o un recurso no serializable como una conexión a base de datos. Los campos estáticos tampoco se serializan, porque pertenecen a la clase y no al objeto. Después de la deserialización, un campo transient tiene su valor por defecto: null, 0 o false.",
   "La deserialización no llama al constructor de una clase Serializable, y sus inicializadores de campo y bloques inicializadores de instancia no se ejecutan. En su lugar, la JVM llama al constructor sin argumentos de la primera superclase que no es Serializable, a menudo Object, y rellena los campos desde el stream. Por eso un campo transient declarado como `transient int count = 10;` vuelve como 0, no como 10. Los records son la excepción: se reconstruyen mediante su constructor canónico, así que su validación se ejecuta.",
   "```java\nclass User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    private transient String password;   // no se escribe\n    private transient int loginCount = 5; // se restaura como 0\n}\n\ntry (var out = new ObjectOutputStream(new FileOutputStream(\"u.ser\"))) {\n    out.writeObject(new User());\n}\n```",
   "`serialVersionUID` es un número de versión de la clase, declarado como `private static final long serialVersionUID`. Al leer, la JVM compara el valor del stream con el valor de la clase actual; si difieren lanza `InvalidClassException`. Si no declaras uno, la JVM lo calcula a partir de detalles de la estructura de la clase, así que incluso un cambio inofensivo como agregar un método puede alterarlo y romper la compatibilidad con los datos guardados. Declararlo explícitamente te permite controlar cuándo se consideran compatibles las versiones.",
   "La seguridad importa aquí. Deserializar datos de una fuente no confiable es peligroso, porque el proceso puede instanciar clases y ejecutar sus métodos antes de que tu código vea el objeto, y esto ha sido la raíz de vulnerabilidades graves. La práctica defensiva es evitar la serialización de Java para entradas no confiables, preferir formatos como JSON con un mapeo explícito y, cuando no pueda evitarse, restringir qué clases pueden deserializarse con un `ObjectInputFilter`."
  ],
  "terms": [
   [
    "Serializable",
    "Una interfaz marcadora que permite que las instancias de una clase se escriban y lean mediante streams de objetos."
   ],
   [
    "transient",
    "Un modificador de campo que excluye el campo de la serialización; se restaura con su valor por defecto."
   ],
   [
    "serialVersionUID",
    "Un identificador de versión private static final long que se comprueba durante la deserialización para detectar versiones de clase incompatibles."
   ],
   [
    "NotSerializableException",
    "Se lanza en tiempo de ejecución al escribir un objeto que tiene un campo no transient cuyo tipo no es serializable."
   ],
   [
    "ObjectInputFilter",
    "Un mecanismo para restringir qué clases y cuántos datos pueden deserializarse, usado para defenderse de entradas inseguras."
   ]
  ],
  "example": "Una aplicación de escritorio guarda el estado de la sesión con ObjectOutputStream. Después de una actualización que agregó un método, las sesiones guardadas de los usuarios dejaron de cargarse con InvalidClassException. Declarar un serialVersionUID explícito en la siguiente versión mantiene cargables los guardados antiguos siempre que los cambios de campos sean compatibles.",
  "tip": "Al deserializar, los campos transient y static no se leen del stream, los inicializadores de campo no se ejecutan y no se llama a los constructores de la clase Serializable; solo se ejecuta el constructor sin argumentos de la primera superclase no serializable.",
  "check": [
   [
    "Un campo String transient vale \"secret\" antes de la serialización. ¿Cuánto vale después de la deserialización?",
    "null, el valor por defecto de una referencia."
   ],
   [
    "¿Qué excepción ocurre cuando el serialVersionUID del stream no coincide con el de la clase?",
    "InvalidClassException."
   ],
   [
    "¿Qué ocurre si una clase serializable tiene un campo no transient de un tipo que no es Serializable?",
    "Escribir el objeto lanza NotSerializableException en tiempo de ejecución."
   ]
  ]
 },
 {
  "t": "Closing resources and stream-returning Files methods",
  "tt": "Cerrar recursos y métodos de Files que devuelven streams",
  "body": [
   "Los archivos, sockets, conexiones a bases de datos y muchos streams mantienen recursos del sistema operativo que el recolector de basura no libera con prontitud. Si olvidas cerrarlos puedes quedarte sin manejadores de archivo, dejar archivos bloqueados en Windows o perder salida en buffer. La sentencia try-with-resources es la forma estándar de garantizar el cierre.",
   "Cualquier objeto que implemente `AutoCloseable` puede declararse entre los paréntesis después de `try`. Cuando el bloque termina, normalmente o por una excepción, su método `close()` se llama automáticamente. `Closeable`, usada por las clases de E/S, extiende AutoCloseable y restringe `close()` a lanzar IOException; el `close()` de AutoCloseable lanza Exception, así que el compilador te obliga a manejar lo que pueda lanzar el método close declarado. Una variable de recurso es implícitamente final. Desde Java 9 también puedes listar una variable existente que sea final o efectivamente final: `try (reader) { ... }`.",
   "El orden es preciso. Los recursos se cierran en orden inverso a su declaración, y se cierran antes de que se ejecute cualquier bloque `catch` o `finally`. Si el bloque try lanza una excepción y luego `close()` también lanza una, la excepción del cierre no reemplaza a la original. Se adjunta como excepción suprimida, recuperable con `getSuppressed()`, y la excepción original se propaga. Si solo close lanza, esa excepción se propaga.",
   "```java\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.println(\"body\");\n} finally {\n    System.out.println(\"finally\");\n}\n// body, cierre de B, cierre de A, finally\n```",
   "La API Stream interactúa con esto. `BaseStream`, el padre de Stream, implementa AutoCloseable, pero la mayoría de los streams, como los que vienen de colecciones, no mantienen recursos y no necesitan cerrarse. La excepción son los streams devueltos por métodos de E/S: `Files.lines`, `Files.list`, `Files.walk` y `Files.find`. Su Javadoc indica usar try-with-resources, porque el stream mantiene abierto un manejador de archivo o directorio hasta que se cierra, y una operación terminal no lo cierra por ti.",
   "```java\ntry (Stream<Path> entries = Files.list(Path.of(\"logs\"))) {\n    entries.filter(p -> p.toString().endsWith(\".gz\")).forEach(System.out::println);\n}\n// En cambio, readAllLines, readString, write y writeString abren y cierran internamente.\n```",
   "Los métodos que devuelven un objeto Reader, Writer o stream, como `Files.newBufferedReader`, `Files.newInputStream` y `Files.newBufferedWriter`, también te pasan a ti la responsabilidad de cerrarlo. Los métodos que hacen todo el trabajo en una sola llamada, como `readAllLines`, `readString`, `write`, `writeString`, `copy` y `size`, cierran lo que abren. Al envolver streams, cerrar el envoltorio más externo cierra los internos, así que declara el envoltorio como recurso. Un stream puede registrar acciones de limpieza con `onClose(Runnable)`, que se ejecutan cuando se llama a `close()`."
  ],
  "terms": [
   [
    "try-with-resources",
    "Una sentencia try que declara recursos AutoCloseable y los cierra automáticamente en orden inverso."
   ],
   [
    "AutoCloseable",
    "Una interfaz con close() throws Exception, requerida para los recursos de try-with-resources."
   ],
   [
    "Closeable",
    "Una interfaz de E/S que extiende AutoCloseable con close() throws IOException."
   ],
   [
    "Suppressed exception (excepción suprimida)",
    "Una excepción lanzada al cerrar un recurso después de que el cuerpo ya lanzó otra, adjuntada a la original mediante addSuppressed."
   ],
   [
    "Resource-backed stream (stream respaldado por un recurso)",
    "Un Stream como los de Files.lines, list, walk o find que mantiene un manejador abierto y debe cerrarse."
   ]
  ],
  "example": "Un servicio de monitoreo lista un directorio cada pocos segundos con Files.list pero nunca cierra el stream. Al cabo de un día falla con un error de demasiados archivos abiertos. Envolver la llamada en try-with-resources libera cada manejador de directorio en cuanto termina el listado.",
  "tip": "Los recursos se cierran en orden inverso, antes de catch y finally. Una excepción de close después de una excepción del cuerpo se suprime, no se lanza. Files.lines, list, walk y find devuelven streams que debes cerrar; readAllLines y writeString no lo necesitan.",
  "check": [
   [
    "En try (var x = ...; var y = ...), ¿qué recurso se cierra primero?",
    "y, porque los recursos se cierran en orden inverso a su declaración."
   ],
   [
    "El cuerpo del try lanza IOException y close() lanza IllegalStateException. ¿Cuál se propaga?",
    "La IOException; la IllegalStateException se agrega como excepción suprimida."
   ],
   [
    "¿Llamar a count() sobre el stream de Files.lines cierra el archivo?",
    "No. Una operación terminal no cierra el stream; usa try-with-resources."
   ]
  ]
 },
 {
  "t": "Locale objects: language, country, Locale.of and Locale.getDefault",
  "tt": "Objetos Locale: idioma, país, Locale.of y Locale.getDefault",
  "body": [
   "La localización significa adaptar un programa al idioma y la región de un usuario: texto traducido, y números, monedas, fechas y horas mostrados como ese usuario espera. Java representa una elección de idioma y región con `java.util.Locale`. Las clases sensibles a la configuración regional, como NumberFormat, DateTimeFormatter y ResourceBundle, reciben un Locale y ajustan su salida en consecuencia.",
   "Un Locale se construye a partir de un código de idioma, un código de país (región) opcional y una variante opcional. Los códigos de idioma son códigos ISO 639 en minúsculas como `en`, `fr` y `de`. Los códigos de país son códigos ISO 3166 en mayúsculas como `US`, `CA` y `DE`. La forma de cadena los une con un guion bajo, con el idioma primero: `en_US`, `fr_CA`. Un locale puede ser solo de idioma, como `fr`; un país sin idioma es técnicamente posible (se imprime como `_US`) pero rara vez es útil. La forma estándar de escribir un locale como etiqueta de idioma, usada en la web, los une con un guion: `en-US`.",
   "`Locale.of(\"fr\", \"CA\")` crea un locale, y `Locale.of(\"fr\")` crea un locale solo de idioma; estos métodos de fábrica reemplazaron a los constructores de Locale, que ahora están obsoletos (deprecated). Locale normaliza las mayúsculas y minúsculas, así que `Locale.of(\"EN\", \"us\")` se imprime como `en_US`. Los locales comunes están disponibles como constantes: `Locale.US`, `Locale.UK`, `Locale.FRANCE`, `Locale.GERMANY`, `Locale.CANADA_FRENCH`, y otras solo de idioma como `Locale.ENGLISH` y `Locale.FRENCH`. `Locale.forLanguageTag(\"pt-BR\")` analiza una etiqueta, y `new Locale.Builder().setLanguage(\"es\").setRegion(\"MX\").build()` construye uno paso a paso.",
   "```java\nLocale ca = Locale.of(\"fr\", \"CA\");\nSystem.out.println(ca);                 // fr_CA\nSystem.out.println(ca.getLanguage());   // fr\nSystem.out.println(ca.getCountry());    // CA\nSystem.out.println(ca.toLanguageTag()); // fr-CA\nSystem.out.println(Locale.getDefault()); // depende de la máquina, p. ej. en_US\nLocale.setDefault(Locale.GERMANY);       // afecta solo a esta JVM\n```",
   "`Locale.getDefault()` devuelve el locale por defecto de la JVM, que se inicializa a partir de la configuración del sistema operativo cuando arranca la JVM. `Locale.setDefault(locale)` lo cambia solo para la JVM en ejecución, no para el sistema operativo. Cualquier método sensible al locale que se llame sin un Locale explícito usa el predeterminado. También hay valores por defecto por categoría: `Locale.Category.DISPLAY` controla el idioma del texto de la interfaz de usuario, y `Locale.Category.FORMAT` controla cómo se formatean los números y las fechas, mediante `Locale.getDefault(Category)` y `Locale.setDefault(Category, locale)`.",
   "Depender del locale por defecto es una fuente común de errores: un programa que analiza `1.5` como número puede funcionar en una máquina de EE. UU. y fallar en una alemana, donde el separador decimal es una coma. Para los datos que se intercambian entre sistemas, como archivos, APIs y logs, pasa un locale explícito como `Locale.ROOT` o `Locale.US`; para el texto que se muestra a un usuario, usa el locale del usuario. `getDisplayName()` devuelve un nombre legible como \"French (Canada)\", a su vez localizado según el locale de visualización por defecto."
  ],
  "terms": [
   [
    "Locale",
    "Un objeto que identifica un idioma y opcionalmente un país y una variante, usado por las clases sensibles a la configuración regional."
   ],
   [
    "Language code (código de idioma)",
    "Un código ISO 639 en minúsculas, como en o fr, que forma la primera parte de un locale."
   ],
   [
    "Country code (código de país)",
    "Un código ISO 3166 en mayúsculas, como US o CA, que identifica la región de un locale."
   ],
   [
    "Locale.of",
    "El método de fábrica para crear un Locale a partir de un idioma y opcionalmente un país y una variante."
   ],
   [
    "Default locale (locale por defecto)",
    "El locale que usa la JVM cuando no se indica ninguno, inicializado desde el sistema operativo y modificable con Locale.setDefault."
   ]
  ],
  "example": "Un servicio de facturación formatea los totales con el Locale del cliente tomado de su perfil, así que un cliente de Quebec ve el formato francés de Locale.of(\"fr\", \"CA\"), mientras que sus exportaciones CSV siempre usan Locale.ROOT para que el sistema contable pueda analizar los números sin importar el locale por defecto del servidor.",
  "tip": "La forma de cadena es idioma_PAÍS con el idioma en minúsculas y el país en mayúsculas, siempre con el idioma primero. Locale.setDefault cambia solo la JVM. Usa Locale.of en lugar de los constructores obsoletos.",
  "check": [
   [
    "¿Qué imprime System.out.println(Locale.of(\"de\", \"AT\"))?",
    "de_AT."
   ],
   [
    "¿Locale.setDefault cambia el locale del sistema operativo?",
    "No. Cambia el valor por defecto solo para la JVM en ejecución."
   ],
   [
    "¿Puede un Locale tener un país sin idioma?",
    "No en el uso normal: el idioma va primero y es la parte esencial; el país y la variante son refinamientos opcionales."
   ]
  ]
 },
 {
  "t": "Resource bundles: properties files, naming and lookup/fallback order",
  "tt": "Resource bundles: archivos properties, nombres y orden de búsqueda/respaldo",
  "body": [
   "Un resource bundle guarda datos específicos de cada locale, sobre todo texto de la interfaz de usuario, fuera de tu código para que los traductores puedan proporcionar idiomas nuevos sin cambiar el código. La forma más común es una familia de archivos properties que comparten un nombre base, con el locale agregado al final: `Messages.properties` (el predeterminado), `Messages_fr.properties`, `Messages_fr_CA.properties`, `Messages_en_US.properties`. También son posibles los bundles como clases Java que extienden `ListResourceBundle` y, para el mismo nombre, se prefiere una clase sobre un archivo properties.",
   "Un archivo properties contiene pares clave-valor, uno por línea: `greeting=Hello` o `greeting: Hello`, donde tanto `=` como `:` separan la clave del valor y los espacios alrededor se ignoran. Las líneas que empiezan con `#` o `!` son comentarios, y una barra invertida al final de una línea continúa el valor en la línea siguiente. Desde Java 9, los resource bundles de tipo properties se leen como UTF-8 por defecto.",
   "Cargas un bundle con `ResourceBundle.getBundle(\"Messages\", locale)` y lees valores con `getString(\"greeting\")`. También están disponibles `getObject`, `keySet()` y `containsKey()`. Si no puede encontrarse ningún bundle, getBundle lanza `MissingResourceException`; si una clave falta en el bundle elegido y en todos sus padres, getString lanza la misma excepción unchecked.",
   "El orden de búsqueda es lo que evalúa el examen. Supón que pides `fr_CA` y el locale por defecto es `en_US`. Java prueba los candidatos del más específico al menos específico: `Messages_fr_CA`, luego `Messages_fr`, luego el `Messages_en_US` del locale por defecto, luego `Messages_en` y finalmente el base `Messages`. Elige el primero que existe. Observa que el locale por defecto se consulta antes del bundle base, y solo si nada coincidió con el locale solicitado.",
   "```text\ngetBundle(\"Messages\", fr_CA) con valor por defecto en_US prueba:\n  1. Messages_fr_CA   2. Messages_fr\n  3. Messages_en_US   4. Messages_en\n  5. Messages          (luego MissingResourceException)\n\nSi se elige Messages_fr_CA, una clave que falta se busca en:\n  Messages_fr_CA -> Messages_fr -> Messages\n```",
   "Una vez elegido un bundle, la búsqueda de claves también puede recurrir a respaldos, pero solo a lo largo de la cadena de padres de ese bundle, no de la del locale por defecto. El padre de `Messages_fr_CA` es `Messages_fr`, cuyo padre es el base `Messages`. Así que una clave que falta en `Messages_fr_CA` se busca en `Messages_fr` y luego en `Messages`, nunca en `Messages_en_US`. Esto te permite poner las claves compartidas en el archivo base y sobrescribir solo lo que difiere en cada idioma o región.",
   "Un diseño práctico pone cada clave en el bundle base, en el idioma que elijas como respaldo final, y agrega archivos por idioma con los valores traducidos. Los valores a menudo contienen marcadores como `{0}`, que rellenas con MessageFormat. Para el examen, dibuja la lista de nombres candidatos antes de responder, y recuerda que los candidatos del locale solicitado van antes que los del locale por defecto."
  ],
  "terms": [
   [
    "Resource bundle",
    "Un conjunto de recursos clave-valor específicos de un locale, cargados por nombre base y locale con ResourceBundle.getBundle."
   ],
   [
    "Base name (nombre base)",
    "El prefijo común de una familia de bundles, como Messages, al que se agregan sufijos de locale como _fr_CA."
   ],
   [
    "Default (base) bundle (bundle base)",
    "El archivo de bundle sin sufijo de locale, usado como respaldo final y raíz de toda cadena de padres."
   ],
   [
    "Parent chain (cadena de padres)",
    "La secuencia de bundles menos específicos, como fr_CA a fr a base, en la que se busca una clave que falta en el bundle elegido."
   ],
   [
    "MissingResourceException",
    "Una excepción unchecked que se lanza cuando no se encuentra ningún bundle o cuando una clave falta en el bundle y en sus padres."
   ]
  ],
  "example": "Un sitio de reservas incluye Labels.properties en inglés, Labels_es.properties en español y Labels_es_MX.properties, que sobrescribe solo unas pocas palabras que se usan de forma distinta en México. Un visitante con locale es_MX obtiene el archivo mexicano, y cualquier clave que le falte se encuentra en Labels_es y luego en Labels.",
  "tip": "Orden: locale solicitado (idioma_país, luego idioma), luego locale por defecto (idioma_país, luego idioma), luego base. Para las claves que faltan, solo se buscan los padres del bundle elegido, nunca los bundles del locale por defecto.",
  "check": [
   [
    "El locale solicitado es de_CH, el predeterminado es en_US y solo existen Messages.properties y Messages_en.properties. ¿Cuál se elige?",
    "Messages_en. No existe ningún bundle alemán, así que se prueban los candidatos del locale por defecto y Messages_en coincide antes que el base."
   ],
   [
    "Se elige Messages_fr_CA y le falta la clave title, que existe solo en Messages_en_US y en Messages. ¿Dónde se encuentra?",
    "En Messages, el bundle base; el respaldo de claves sigue la cadena de padres fr_CA, fr, base, no el locale por defecto."
   ],
   [
    "¿Qué caracteres pueden separar una clave de su valor en un archivo properties?",
    "= o :, ignorando los espacios alrededor."
   ]
  ]
 },
 {
  "t": "Formatting numbers and currency with NumberFormat",
  "tt": "Formatear números y monedas con NumberFormat",
  "body": [
   "Distintas regiones escriben los números de forma distinta. El valor mil doscientos treinta y cuatro y medio se escribe `1,234.5` en EE. UU., `1.234,5` en Alemania y con un espacio como separador de miles en Francia. `java.text.NumberFormat` maneja estas reglas. Es abstracta; obtienes una instancia con un método de fábrica, pasando un Locale o usando el predeterminado.",
   "Los métodos de fábrica que debes conocer son `NumberFormat.getInstance(locale)` y `getNumberInstance(locale)` para números generales, `getIntegerInstance(locale)`, que redondea a números enteros, `getCurrencyInstance(locale)`, que agrega el símbolo de la moneda y el número habitual de decimales de esa moneda, `getPercentInstance(locale)`, que multiplica por 100 y agrega un signo de porcentaje, y `getCompactNumberInstance` para formas cortas como 1K. Cada uno devuelve un formateador cuyo método `format` devuelve un String.",
   "```java\ndouble v = 1234.5678;\nNumberFormat.getInstance(Locale.US).format(v);          // 1,234.568\nNumberFormat.getInstance(Locale.GERMANY).format(v);     // 1.234,568\nNumberFormat.getCurrencyInstance(Locale.US).format(v);  // $1,234.57\nNumberFormat.getPercentInstance(Locale.US).format(0.256); // 26%\nNumberFormat.getIntegerInstance(Locale.US).format(2.5); // 2 (half-even)\n```",
   "El redondeo sigue la configuración del formateador. Un formato de número general muestra como máximo tres dígitos decimales por defecto, el de moneda usa los dígitos estándar de la moneda (dos para dólares y euros) y el de porcentaje no muestra ninguno. El modo de redondeo por defecto es HALF_EVEN, a veces llamado redondeo bancario: un valor exactamente a la mitad se redondea al dígito par más cercano, así que 2.5 se convierte en 2 y 3.5 en 4. Puedes ajustarlo con `setMaximumFractionDigits`, `setMinimumFractionDigits`, `setRoundingMode(RoundingMode.HALF_UP)` y `setGroupingUsed(false)`.",
   "El análisis (parsing) va en sentido contrario: `parse(String)` devuelve un `Number` (un Long si el valor es entero y cabe, o un Double en caso contrario) y lanza la `ParseException` checked si el texto no empieza con un número. Analiza todo lo que puede del principio e ignora el resto, así que analizar `\"12abc\"` devuelve 12. El locale también importa al analizar: `\"1.234\"` analizado con un formato alemán es 1234, mientras que con un formato de EE. UU. es 1.234.",
   "Para diseños personalizados, `DecimalFormat`, la subclase concreta habitual, acepta un patrón. En los patrones, `0` significa un dígito que siempre se muestra (rellenando con ceros), `#` significa un dígito que se muestra solo si hace falta, `,` marca la agrupación y `.` el separador decimal: `new DecimalFormat(\"#,##0.00\").format(1234.5)` da `1,234.50` con un locale por defecto de EE. UU. Los caracteres separadores reales siguen viniendo del locale.",
   "Las instancias de NumberFormat no son seguras para hilos, así que no compartas una entre hilos sin sincronización; crea una por uso o por hilo. Para cálculos de dinero, guarda los montos en `BigDecimal` y usa NumberFormat solo para mostrarlos, porque el punto flotante binario no puede representar exactamente la mayoría de las fracciones decimales."
  ],
  "terms": [
   [
    "NumberFormat",
    "Una clase abstracta sensible al locale para formatear y analizar números, obtenida mediante métodos de fábrica."
   ],
   [
    "getCurrencyInstance",
    "Devuelve un NumberFormat que formatea valores como moneda para un locale, con su símbolo y sus decimales estándar."
   ],
   [
    "HALF_EVEN",
    "El modo de redondeo por defecto que redondea las mitades exactas al dígito par más cercano."
   ],
   [
    "ParseException",
    "Una excepción checked que se lanza cuando un texto no puede analizarse como número o fecha."
   ],
   [
    "DecimalFormat",
    "Un NumberFormat concreto que formatea usando un patrón de símbolos 0, #, coma y punto."
   ]
  ],
  "example": "Una tienda en línea muestra los precios con NumberFormat.getCurrencyInstance(customerLocale), así que el mismo monto BigDecimal aparece como $1,234.50 para un comprador de EE. UU. y con coma decimal y signo de euro para un comprador en Alemania, mientras que el pedido se guarda como un BigDecimal simple.",
  "tip": "Conoce qué fábrica usar, que el porcentaje multiplica por 100, que el redondeo por defecto es HALF_EVEN, y que parse lanza la ParseException checked pero acepta texto con basura al final después de un número válido.",
  "check": [
   [
    "¿Qué produce NumberFormat.getPercentInstance(Locale.US).format(0.5)?",
    "50%."
   ],
   [
    "¿Qué devuelve NumberFormat.getInstance(Locale.US).parse(\"42 apples\")?",
    "El número 42 (como Long); el análisis se detiene en el primer carácter que no puede usar."
   ],
   [
    "¿Qué produce getIntegerInstance(Locale.US).format(3.5)?",
    "4, porque HALF_EVEN redondea una mitad al dígito par más cercano."
   ]
  ]
 },
 {
  "t": "Compact number formatting (CompactNumberFormat)",
  "tt": "Formato de números compacto (CompactNumberFormat)",
  "body": [
   "El formato de números compacto muestra números grandes de forma corta y fácil de leer, como `1K` para mil o `3 million`, igual que los contadores de redes sociales y los tableros. Java lo proporciona mediante `java.text.CompactNumberFormat`, una subclase de NumberFormat. Normalmente obtienes uno con el método de fábrica `NumberFormat.getCompactNumberInstance(locale, style)`.",
   "Hay dos estilos en el enum `NumberFormat.Style`. `SHORT` usa abreviaturas: en inglés de EE. UU., 1,000 se convierte en `1K`, 2,000,000 en `2M` y 3,000,000,000 en `3B`. `LONG` escribe la unidad completa: `1 thousand`, `2 million`, `3 billion`. Las palabras y abreviaturas vienen de los datos del locale, así que otros locales producen sus propias formas e incluso pueden usar magnitudes distintas; por ejemplo, algunos locales asiáticos agrupan por diez mil en lugar de por mil.",
   "```java\nNumberFormat s = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);\nNumberFormat l = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.LONG);\ns.format(999);        // 999\ns.format(1_000);      // 1K\ns.format(1_234_567);  // 1M\nl.format(1_234_567);  // 1 million\ns.setMaximumFractionDigits(1);\ns.format(1_234_567);  // 1.2M\n```",
   "Los valores por debajo del patrón compacto más pequeño, que es mil para el inglés de EE. UU., se formatean como números ordinarios. Por defecto un formato compacto no muestra dígitos decimales y redondea con HALF_EVEN, así que 1,234,567 se convierte en `1M`, no en `1.2M`. Para conservar más precisión llama a `setMaximumFractionDigits(n)`, y para cambiar el redondeo llama a `setRoundingMode`. Por el redondeo half-even, un valor exactamente a la mitad, como 1,500, se formatea como `2K`, y 2,500 también se formatea como `2K`.",
   "CompactNumberFormat también analiza texto: con el estilo SHORT de EE. UU., `parse(\"1K\")` devuelve 1000. Los separadores de miles están desactivados por defecto y pueden activarse con `setGroupingUsed(true)`, lo cual solo importa cuando el número compacto en sí es grande, como en `1,000T`. Los valores negativos conservan su signo, así que -2,000 se formatea como `-2K`. Como otros formatos, sus instancias no son seguras para hilos.",
   "El examen suele pedirte que predigas la salida. Sigue tres pasos: encuentra la magnitud (mil, millón, mil millones), divide y luego aplica los dígitos decimales y el redondeo HALF_EVEN. Después elige el sufijo SHORT o LONG. Si la pregunta no cambia el máximo de dígitos decimales, el resultado es un número entero seguido del sufijo."
  ],
  "terms": [
   [
    "CompactNumberFormat",
    "Una subclase de NumberFormat que formatea números en formas cortas específicas del locale, como 1K o 1 thousand."
   ],
   [
    "NumberFormat.Style.SHORT",
    "El estilo compacto que usa sufijos abreviados como K, M y B en inglés de EE. UU."
   ],
   [
    "NumberFormat.Style.LONG",
    "El estilo compacto que escribe la magnitud completa, como thousand o million."
   ],
   [
    "getCompactNumberInstance",
    "El método de fábrica de NumberFormat que devuelve un formateador compacto para un locale y un estilo."
   ]
  ],
  "example": "Una plataforma de video muestra el número de reproducciones con NumberFormat.getCompactNumberInstance(viewerLocale, Style.SHORT) y un máximo de un dígito decimal, así que un video con 1,234,567 reproducciones muestra 1.2M a los espectadores de EE. UU., mientras que los de otros locales ven su propia forma compacta.",
  "tip": "Sin cambiar los dígitos decimales, los formatos compactos redondean a un número entero con HALF_EVEN, así que 1,234,567 es 1M y 1,500 es 2K. Los números menores que 1,000 se imprimen sin cambios en inglés de EE. UU.",
  "check": [
   [
    "¿Qué produce por defecto el formato compacto SHORT de EE. UU. para 5_600_000?",
    "6M. Por defecto no muestra dígitos decimales y 5.6 se redondea a 6."
   ],
   [
    "¿Qué produce el formato compacto LONG de EE. UU. para 2_000?",
    "2 thousand."
   ],
   [
    "¿Cómo obtienes 5.6M en lugar de 6M?",
    "Llamando a setMaximumFractionDigits(1) sobre el formateador antes de formatear."
   ]
  ]
 },
 {
  "t": "Formatting and parsing dates and times with DateTimeFormatter and locales",
  "tt": "Formatear y analizar fechas y horas con DateTimeFormatter y locales",
  "body": [
   "`java.time.format.DateTimeFormatter` convierte objetos de java.time como LocalDate, LocalTime, LocalDateTime y ZonedDateTime a texto y desde texto. A diferencia del antiguo SimpleDateFormat, es inmutable y seguro para hilos, así que un único formateador puede guardarse en un campo static final y compartirse. Puedes llamar a `date.format(formatter)` o a `formatter.format(date)`; ambos dan el mismo String.",
   "Hay tres formas de obtener un formateador. Las constantes predefinidas siguen ISO-8601, como `DateTimeFormatter.ISO_LOCAL_DATE` (2026-09-25) e `ISO_LOCAL_DATE_TIME`; el `toString()` y el `parse` por defecto de las clases de java.time las usan. Los estilos localizados usan `ofLocalizedDate(FormatStyle.SHORT)`, `ofLocalizedTime` u `ofLocalizedDateTime` con SHORT, MEDIUM, LONG o FULL, y producen lo que el locale considera normal. Los patrones personalizados usan `ofPattern(\"dd MMM yyyy\")` u `ofPattern(pattern, locale)`.",
   "Las letras de patrón distinguen mayúsculas de minúsculas y aparecen a menudo en las preguntas. `y` es el año, `M` es el mes (M da 9, MM da 09, MMM da Sep, MMMM da September), `d` es el día del mes, `E` es el día de la semana (EEE da Fri, EEEE da Friday), `H` es la hora de 0 a 23, `h` es la hora de 1 a 12 con `a` para AM o PM, `m` es el minuto y `s` es el segundo. `mm` en minúsculas significa minutos y `MM` en mayúsculas significa mes, un error clásico. El texto entre comillas simples es literal, y dos comillas simples producen un apóstrofo. Una letra no definida, como una `b` o `T` sin comillas, hace que ofPattern lance IllegalArgumentException.",
   "```java\nLocalDateTime t = LocalDateTime.of(2026, 9, 25, 14, 5);\nDateTimeFormatter f = DateTimeFormatter.ofPattern(\"EEEE d MMMM yyyy, HH:mm\", Locale.US);\nt.format(f);                                     // Friday 25 September 2026, 14:05\nt.format(f.withLocale(Locale.FRANCE));           // vendredi 25 septembre 2026, 14:05\nLocalDate d = LocalDate.parse(\"25/09/2026\", DateTimeFormatter.ofPattern(\"dd/MM/yyyy\"));\n// LocalDate.of(2026, 9, 25).format(DateTimeFormatter.ofPattern(\"HH:mm\"));\n//   UnsupportedTemporalTypeException: una fecha no tiene horas\n```",
   "El locale determina los nombres de los meses y los días y la disposición de los estilos localizados. `ofPattern(\"MMMM\", Locale.GERMANY)` imprime septiembre como `September`, mientras que con `Locale.FRANCE` imprime `septembre`. `withLocale(locale)` devuelve una copia con otro locale, ya que los formateadores son inmutables. Los estilos localizados también adaptan el orden: SHORT para un locale de EE. UU. es mes/día/año, mientras que para muchos locales europeos es día/mes/año. Los estilos de hora LONG y FULL suelen incluir el nombre de una zona horaria, así que formatear un LocalTime o LocalDateTime con ellos puede lanzar una excepción, porque esos tipos no llevan zona.",
   "El análisis usa el método estático `parse` del tipo: `LocalDate.parse(text, formatter)`. Si el texto no coincide con el patrón, o un campo es inválido, como el mes 13, lanza `DateTimeParseException`, que es unchecked. Formatear un valor al que le falta un campo que necesita el patrón, como las horas en un LocalDate, lanza `UnsupportedTemporalTypeException`. Otra trampa sutil es `YYYY`, que significa año basado en semanas y puede diferir en uno cerca del año nuevo; usa `yyyy` o `uuuu` para el año calendario."
  ],
  "terms": [
   [
    "DateTimeFormatter",
    "Una clase inmutable y segura para hilos que formatea y analiza valores de java.time usando constantes ISO, estilos localizados o patrones."
   ],
   [
    "FormatStyle",
    "Un enum de SHORT, MEDIUM, LONG y FULL usado para disposiciones de fecha y hora específicas del locale."
   ],
   [
    "ofPattern",
    "Crea un formateador a partir de letras de patrón como yyyy-MM-dd HH:mm, opcionalmente con un Locale."
   ],
   [
    "DateTimeParseException",
    "Una excepción unchecked que se lanza cuando un texto no puede analizarse como fecha u hora."
   ],
   [
    "UnsupportedTemporalTypeException",
    "Se lanza cuando el formateo requiere un campo que el valor no tiene, como las horas en un LocalDate."
   ]
  ],
  "example": "Una app de viajes guarda las horas de salida como ZonedDateTime y las muestra con DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).withLocale(userLocale), así que cada viajero ve el orden de la fecha y los nombres de los meses que espera, sin código aparte para cada país.",
  "tip": "MM es el mes y mm los minutos; HH es formato de 24 horas y hh de 12 horas. Formatear un LocalDate con letras de hora lanza UnsupportedTemporalTypeException, y un análisis incorrecto lanza la DateTimeParseException unchecked.",
  "check": [
   [
    "¿Qué produce LocalDate.of(2026, 1, 5).format(DateTimeFormatter.ofPattern(\"MM/dd\"))?",
    "01/05."
   ],
   [
    "¿Qué ocurre cuando formateas un LocalDate con el patrón \"hh:mm\"?",
    "Lanza UnsupportedTemporalTypeException porque un LocalDate no tiene campos de hora."
   ],
   [
    "¿Es seguro compartir un DateTimeFormatter entre hilos?",
    "Sí. Es inmutable y seguro para hilos."
   ]
  ]
 },
 {
  "t": "Message formatting with MessageFormat",
  "tt": "Formatear mensajes con MessageFormat",
  "body": [
   "Los mensajes traducidos a menudo necesitan que se inserten valores en ellos, y la posición de esos valores difiere entre idiomas. Concatenar cadenas en el código, como `\"Hello \" + name + \", you have \" + n + \" messages\"`, fija el orden de las palabras en el programa y no puede traducirse bien. `java.text.MessageFormat` resuelve esto con patrones que contienen marcadores numerados, de modo que cada traducción puede colocar los valores donde su gramática lo necesite.",
   "Los marcadores se escriben `{0}`, `{1}`, etc., donde el número es el índice del argumento. El método estático `MessageFormat.format(pattern, args...)` los rellena usando el locale por defecto. Los argumentos pueden aparecer en cualquier orden en el patrón y pueden usarse más de una vez, y no hace falta usar todos los argumentos. Un marcador cuyo índice no tiene argumento se deja en la salida tal como está escrito, como `{2}`.",
   "```java\nString p = \"{0} has {1} new messages\";\nMessageFormat.format(p, \"Ana\", 3);            // Ana has 3 new messages\nMessageFormat.format(\"{1}, {0}!\", \"World\", \"Hello\"); // Hello, World!\nMessageFormat.format(\"Total: {0}\", 12345);      // Total: 12,345 (locale por defecto de EE. UU.)\nMessageFormat.format(\"It''s {0}\", \"late\");      // It's late\n\nvar mf = new MessageFormat(\"{0,number,percent} done\", Locale.FRANCE);\nmf.format(new Object[] { 0.75 });               // 75 % done (espaciado francés)\n```",
   "Un marcador puede incluir un tipo y un estilo de formato: `{1,number}`, `{1,number,integer}`, `{1,number,percent}`, `{1,number,currency}`, `{0,date,short}` o `{0,time}`. Incluso sin tipo, los números se formatean con las reglas del locale, así que 12345 aparece como `12,345` en un locale de EE. UU. y con otro separador de miles en otros. Los tipos date y time formatean objetos `java.util.Date`, no tipos de java.time; para los valores de java.time, formatéalos primero con DateTimeFormatter y pasa el String resultante.",
   "El tipo `choice` maneja plurales simples: `{0,choice,0#no files|1#one file|1<{0} files}` elige el texto según rangos numéricos. Cada parte es un límite, un `#` (mayor o igual) o `<` (mayor que) y el texto a usar.",
   "Los apóstrofos son la trampa famosa. En un patrón de MessageFormat, una comilla simple inicia una sección entre comillas en la que las llaves son literales, así que `\"It's {0}\"` pierde el apóstrofo y el marcador no se reemplaza. Escribe dos comillas simples, `It''s {0}`, para producir un apóstrofo. Las comillas son deliberadas cuando quieres llaves literales: `'{0}'` imprime `{0}`. Esto importa porque los traductores a menudo escriben contracciones en idiomas como el francés y el inglés.",
   "En las aplicaciones reales el patrón viene de un resource bundle: `MessageFormat.format(bundle.getString(\"inbox\"), user, count)`. Para un locale específico crea una instancia con `new MessageFormat(pattern, locale)` y llama a `format(Object[])`. Las instancias de MessageFormat, como otros formatos de java.text, no son seguras para hilos."
  ],
  "terms": [
   [
    "MessageFormat",
    "Una clase de java.text que construye mensajes sensibles al locale sustituyendo argumentos en marcadores indexados."
   ],
   [
    "Placeholder (marcador)",
    "Un elemento {n} en un patrón que se reemplaza por el argumento n, opcionalmente con un tipo de formato como number o date."
   ],
   [
    "Format type (tipo de formato)",
    "La segunda parte de un marcador, como number, date, time o choice, que controla cómo se formatea el argumento."
   ],
   [
    "Quoting (comillas)",
    "En MessageFormat, una comilla simple inicia una sección literal; dos comillas simples producen un apóstrofo."
   ],
   [
    "ChoiceFormat",
    "Un formato usado mediante el tipo choice que selecciona el texto según rangos numéricos, útil para plurales simples."
   ]
  ],
  "example": "El bundle en inglés de una app móvil tiene inbox={0}, you have {1} new messages, y su bundle en alemán coloca el conteo antes en la oración. El código llama a MessageFormat.format(bundle.getString(\"inbox\"), name, count) en ambos casos, y cada idioma controla su propio orden de palabras.",
  "tip": "Los marcadores empiezan en cero y pueden reutilizarse o reordenarse. Un apóstrofo suelto rompe el patrón, así que escribe dos comillas simples. Los números se formatean con la agrupación del locale incluso sin tipo de formato.",
  "check": [
   [
    "¿Qué devuelve MessageFormat.format(\"{0} and {0} and {1}\", \"A\", \"B\")?",
    "A and A and B; los marcadores pueden reutilizarse."
   ],
   [
    "¿Qué produce MessageFormat.format(\"Don't forget {0}\", \"milk\")?",
    "Dont forget {0}. La comilla simple inicia una sección entre comillas, así que el apóstrofo desaparece y el marcador queda literal; usa dos comillas simples."
   ],
   [
    "¿Qué se imprime para un marcador {3} cuando solo se pasan dos argumentos?",
    "El propio texto {3}; los argumentos que faltan se dejan como marcador."
   ]
  ]
 }
], { lang: "es" });
