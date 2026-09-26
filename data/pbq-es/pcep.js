/* Spanish translation of the PCEP exam simulations. Same ids and structure as data/pbq/pcep.js. */
CertHub.addPbqs("pcep", [
  { id: "literals-bitwise-match", d: 1, type: "match", title: "Evalúa literales y expresiones a nivel de bits",
    prompt: "Una lista de verificación de revisión de código te pide confirmar a qué se evalúa cada expresión en el REPL de Python. Relaciona cada expresión con el valor que imprime Python.",
    pairs: [
      ["0x1F", "31"],
      ["0o17", "15"],
      ["0b1010", "10"],
      ["1.5e2", "150.0"],
      ["~5", "-6"],
      ["6 ^ 3", "5"],
      ["5 << 2", "20"]
    ],
    extra: ["150", "-5", "216"],
    explain: "0x indica hexadecimal (1*16 + 15 = 31), 0o indica octal (1*8 + 7 = 15) y 0b indica binario (8 + 2 = 10). La notación científica siempre produce un float, así que 1.5e2 es 150.0, no 150. ~x equivale a -x - 1, por lo que ~5 es -6; ^ es el XOR a nivel de bits (110 ^ 011 = 101 = 5), no la potencia, que daría 216; y 5 << 2 desplaza dos bits a la izquierda, lo que multiplica por 4." },

  { id: "operator-priority-order", d: 1, type: "order", title: "Ordena la prioridad de los operadores",
    prompt: "Ordena estos operadores de Python según su prioridad, desde el que se vincula con más fuerza (se evalúa primero) hasta el que se vincula con menos fuerza.",
    steps: ["** (potencia)", "- unario (negación)", "* / // %", "+ y - binarios", "& (AND a nivel de bits)", "== != < > <= >=", "not", "or"],
    explain: "** se vincula con más fuerza que el menos unario; por eso -2 ** 2 es -4. Los operadores multiplicativos van antes que los aditivos, luego (después de los desplazamientos) el AND a nivel de bits y después las comparaciones. Los operadores booleanos son los de menor prioridad, con not por encima de and, y and por encima de or, así que a or b and c significa a or (b and c); usa paréntesis siempre que la intención no sea obvia." },

  { id: "collatz-while-fill", d: 2, type: "fill", title: "Sigue un bucle while con break y else",
    prompt: "Sigue este programa a mano y completa los valores.",
    context: "n = 17\nsteps = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = 3 * n + 1\n    steps += 1\n    if steps == 5:\n        break\nelse:\n    print(\"reached 1\")\nprint(n, steps)",
    fields: [
      { label: "Valor de n impreso en la última línea", answers: ["20"] },
      { label: "Valor de steps impreso en la última línea", answers: ["5"] },
      { label: "¿Se imprime \"reached 1\"? (sí/no)", answers: ["no"] }
    ],
    explain: "La secuencia es 17 -> 52 -> 26 -> 13 -> 40 -> 20, y tras la quinta pasada steps vale 5, así que break se ejecuta cuando n es 20. La cláusula else de un bucle solo se ejecuta cuando el bucle termina porque su condición se volvió falsa; salir con break la omite, así que \"reached 1\" nunca se imprime." },

  { id: "loops-print-012-select", d: 2, type: "select", title: "Elige los bucles que imprimen 0 1 2",
    prompt: "Cada opción es un fragmento completo. Selecciona todos los fragmentos que imprimen exactamente 0 1 2 (cada número seguido de un espacio, en una sola línea).",
    options: [
      "for i in range(3):\n    print(i, end=\" \")",
      "i = 0\nwhile i <= 3:\n    print(i, end=\" \")\n    i += 1",
      "for i in range(0, 5, 2):\n    print(i, end=\" \")",
      "for i in range(-3, 0):\n    print(i + 3, end=\" \")",
      "for i in range(3, 0, -1):\n    print(i - 1, end=\" \")",
      "i = 0\nwhile i < 3:\n    print(i, end=\" \")\n    i += 1",
      "for c in \"012\":\n    print(c, end=\" \")"
    ],
    answers: [0, 3, 5, 6],
    explain: "range(3) y el bucle while i < 3 producen 0, 1, 2, y range(-3, 0) da -3, -2, -1, que se convierten en 0, 1, 2 al sumar 3. Recorrer la cadena \"012\" imprime sus caracteres, que en pantalla se ven idénticos. El bucle con i <= 3 se ejecuta una vez de más (0 1 2 3), range(0, 5, 2) avanza de dos en dos (0 2 4) y range(3, 0, -1) cuenta hacia atrás, imprimiendo 2 1 0." },

  { id: "nested-loop-output-order", d: 2, type: "order", title: "Predice la salida de bucles anidados",
    prompt: "Ordena las líneas que imprime este programa tal como aparecen en pantalla.",
    context: "for i in range(3):\n    for j in range(3):\n        if j == 1:\n            continue\n        if i == 2:\n            break\n        print(i, j)\n    else:\n        print(\"inner done\", i)\nprint(\"end\")",
    steps: ["0 0", "0 2", "inner done 0", "1 0", "1 2", "inner done 1", "end"],
    explain: "continue omite j == 1 en cada pasada, así que las filas 0 y 1 imprimen los valores de j 0 y 2. El bucle interno termina normalmente para i = 0 e i = 1, así que su cláusula else imprime \"inner done\". Cuando i es 2, break se activa en j = 0, lo que sale solo del bucle interno y omite su else, así que no se imprime nada para i = 2 antes de \"end\"." },

  { id: "list-slicing-fill", d: 3, type: "fill", title: "Evalúa índices y slicing de listas",
    prompt: "Dada la lista de abajo, completa a qué se evalúa cada expresión. Escribe las listas exactamente como las imprime Python, por ejemplo [1, 2].",
    context: "nums = [4, 8, 15, 16, 23, 42]",
    fields: [
      { label: "nums[-2]", answers: ["23"] },
      { label: "nums[1:4]", answers: ["[8, 15, 16]", "[8,15,16]"] },
      { label: "nums[::-2]", answers: ["[42, 16, 8]", "[42,16,8]"] },
      { label: "nums[4:1:-1]", answers: ["[23, 16, 15]", "[23,16,15]"] },
      { label: "len(nums[10:])", answers: ["0"] }
    ],
    explain: "Los índices negativos cuentan desde el final, así que -2 es 23. Un slice incluye el índice inicial pero se detiene antes del índice final, así que [1:4] son los índices 1, 2 y 3. Con un paso negativo el slice avanza hacia atrás: [::-2] empieza en el último elemento y toma uno de cada dos, y [4:1:-1] toma los índices 4, 3 y 2. Los slices nunca lanzan IndexError; un slice fuera de rango simplemente queda vacío." },

  { id: "aliasing-copy-fill", d: 3, type: "fill", title: "Sigue el aliasing y la copia de listas",
    prompt: "Sigue este código y completa a qué hace referencia cada nombre cuando se ejecuta el print.",
    context: "a = [1, 2, 3]\nb = a\nc = a[:]\nb.append(4)\nc.insert(0, 0)\ndel a[1]\nprint(a, b, c, len(c))",
    fields: [
      { label: "a", answers: ["[1, 3, 4]", "[1,3,4]"] },
      { label: "b", answers: ["[1, 3, 4]", "[1,3,4]"] },
      { label: "c", answers: ["[0, 1, 2, 3]", "[0,1,2,3]"] },
      { label: "len(c)", answers: ["4"] }
    ],
    explain: "b = a copia solo la referencia, así que a y b son la misma lista: agregar 4 mediante b y borrar el índice 1 mediante a modifican esa única lista, lo que da [1, 3, 4]. a[:] crea una lista nueva, así que c es independiente; insert(0, 0) pone 0 al principio, lo que da [0, 1, 2, 3] con longitud 4." },

  { id: "collection-errors-select", d: 3, type: "select", title: "Detecta las instrucciones que lanzan errores",
    prompt: "Selecciona todos los fragmentos que lanzan una excepción al ejecutarse.",
    options: [
      "t = (1, 2, 3)\nt[0] = 9",
      "s = \"cat\"\ns[0] = \"b\"",
      "d = {}\nd[\"k\"] = 1",
      "t = (1, [2, 3])\nt[1].append(4)",
      "lst = [1, 2]\nlst[5] = 1",
      "print((1, 2) + (3,))",
      "d = {[1, 2]: \"x\"}",
      "print([1, 2, 3][1:10])"
    ],
    answers: [0, 1, 4, 6],
    explain: "Las tuplas y las cadenas son inmutables, así que asignar un elemento lanza TypeError, y asignar a un índice de lista que no existe lanza IndexError. Las claves de un diccionario deben ser hashables, así que una clave de tipo lista lanza TypeError. Agregar una clave nueva a un diccionario es normal, una tupla puede contener una lista mutable cuyo contenido puede cambiar, concatenar tuplas crea una tupla nueva y un slice demasiado grande simplemente se detiene al final." },

  { id: "string-methods-match", d: 3, type: "match", title: "Relaciona expresiones de cadenas con sus resultados",
    prompt: "Dado s = \"Python PCEP\", relaciona cada expresión con el valor que produce.",
    pairs: [
      ["s.find(\"P\", 1)", "7"],
      ["s.count(\"P\")", "3"],
      ["s.split()", "['Python', 'PCEP']"],
      ["s.replace(\"P\", \"J\", 1)", "'Jython PCEP'"],
      ["s[::-1][:4]", "'PECP'"],
      ["s.isalpha()", "False"]
    ],
    extra: ["0", "'Jython JCEJ'", "True"],
    explain: "find() empieza a buscar en el índice 1, así que se salta la primera P y devuelve 7. count() cuenta los tres caracteres P. split() sin argumentos divide por espacios en blanco, replace() con un conteo de 1 cambia solo la primera coincidencia, e invertir la cadena y luego hacer slicing da los últimos cuatro caracteres al revés. isalpha() es False porque el espacio no es una letra." },

  { id: "exceptions-match", d: 4, type: "match", title: "Identifica la excepción lanzada",
    prompt: "Un registro de pruebas muestra que cada uno de estos fragmentos de una línea falló. Relaciona cada fragmento con la excepción que lanza Python.",
    pairs: [
      ["int(\"12.5\")", "ValueError"],
      ["[10, 20][2]", "IndexError"],
      ["{\"a\": 1}[\"A\"]", "KeyError"],
      ["10 % 0", "ZeroDivisionError"],
      ["\"3\" + 4", "TypeError"],
      ["print(totl)", "NameError"]
    ],
    extra: ["SyntaxError", "RecursionError"],
    explain: "int() acepta una cadena solo si parece un número entero, así que \"12.5\" da ValueError (el tipo es correcto, el valor no). Las posiciones de lista fuera de rango dan IndexError y las claves de diccionario inexistentes dan KeyError; las claves distinguen mayúsculas de minúsculas. El operador % divide, así que un divisor cero lanza ZeroDivisionError. Mezclar str e int con + es un TypeError, y un nombre mal escrito es un NameError." },

  { id: "function-scope-fill", d: 4, type: "fill", title: "Sigue valores por defecto, argumentos con nombre y global",
    prompt: "Sigue este programa y completa los seis valores impresos en la última línea.",
    context: "total = 10\n\ndef add(x, y=5):\n    global total\n    total += x\n    return x * y\n\ndef show(a, b=2, c=3):\n    return a + b * c\n\nr1 = add(2)\nr2 = add(y=1, x=4)\nprint(r1, r2, total, show(1), show(1, c=0), show(c=1, a=2, b=4))",
    fields: [
      { label: "r1", answers: ["10"] },
      { label: "r2", answers: ["4"] },
      { label: "total", answers: ["16"] },
      { label: "show(1)", answers: ["7"] },
      { label: "show(1, c=0)", answers: ["1"] },
      { label: "show(c=1, a=2, b=4)", answers: ["6"] }
    ],
    explain: "add(2) usa el valor por defecto y = 5 y devuelve 10; add(y=1, x=4) asocia los argumentos con nombre por nombre, no por posición, y devuelve 4. Debido a la declaración global, ambas llamadas modifican el total a nivel de módulo: 10 + 2 + 4 = 16. show() multiplica antes de sumar, así que show(1) es 1 + 2 * 3 = 7, show(1, c=0) es 1 + 2 * 0 = 1 y show(c=1, a=2, b=4) es 2 + 4 * 1 = 6." },

  { id: "function-calls-select", d: 4, type: "select", title: "Elige las llamadas a función válidas",
    prompt: "Dada la definición de abajo, selecciona todas las llamadas que se ejecutan sin lanzar un error.",
    context: "def box(w, h=1, d=1):\n    return w * h * d",
    options: [
      "box(2)",
      "box(2, d=3)",
      "box(w=2, 3)",
      "box(2, 3, 4, 5)",
      "box(2, w=3)",
      "box(d=2, w=3)",
      "box()",
      "box(2, 3, d=4)"
    ],
    answers: [0, 1, 5, 7],
    explain: "w es obligatorio y h y d tienen valores por defecto, así que box(2), box(2, d=3), box(d=2, w=3) y box(2, 3, d=4) son válidas; los argumentos con nombre pueden ir en cualquier orden una vez que se pasaron todos los posicionales. Un argumento posicional después de uno con nombre es un SyntaxError, cuatro argumentos superan los tres parámetros, box(2, w=3) le da dos valores a w, y box() omite el w obligatorio; estas tres últimas lanzan TypeError." }
]);
