/* Spanish text for the Python PCEP hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/pcep.js. */
CertHub.addHandsonEs("pcep", {
  "pcep-hours-minutes": {
    title: "Divide minutos en horas y minutos",
    prompt: "Escribe `split_minutes(total)`, que recibe un número entero de minutos y devuelve una tupla `(hours, minutes)`. Por ejemplo, `split_minutes(135)` devuelve `(2, 15)` y `split_minutes(59)` devuelve `(0, 59)`.\n\nAmbos valores deben ser enteros, no floats.",
    hint: "Un operador da el número entero de veces que cabe 60 y otro da lo que sobra.",
    explain: "El operador / siempre devuelve un float (135 / 60 es 2.25), una trampa clásica de PCEP. La división entera // devuelve el número entero de horas como int cuando ambos operandos son int, y % devuelve el residuo. Juntos, // y % dividen cualquier cantidad en cociente y residuo."
  },
  "pcep-input-sum": {
    title: "Suma dos números leídos con input()",
    prompt: "El programa lee dos números enteros con `input()`, uno por línea. La entrada proporcionada es `7` y luego `5`.\n\nGuarda su suma numérica en una variable llamada `total` e imprímela como `7 + 5 = 12` usando `print()` con el argumento `sep` para que las partes queden separadas por un solo espacio. Ahora mismo el programa pega los strings en lugar de sumarlos.",
    hint: "Lo que devuelve input() siempre es texto. Conviértelo antes de sumar.",
    explain: "input() siempre devuelve un str, así que a + b con dos entradas es una concatenación de strings y da '75'. Convertir con int() transforma cada línea en un número antes de la suma. El examen pregunta a menudo qué devuelve input() y qué pasa cuando sumas un string a un número (un TypeError) o dos strings (concatenación)."
  },
  "pcep-literal-bases": {
    title: "Suma una lista de literales enteros",
    prompt: "Escribe `total_of(texts)`, que recibe una lista de strings, cada uno escrito como un literal entero de Python en decimal, binario (`0b`), octal (`0o`) o hexadecimal (`0x`), y devuelve su suma como int.\n\nPor ejemplo, `total_of([\"10\", \"0b101\", \"0o17\", \"0xFF\"])` es 10 + 5 + 15 + 255 = 285.",
    hint: "int() acepta un segundo argumento opcional para la base. Un valor especial permite que Python lea el prefijo por sí mismo.",
    explain: "Los literales enteros de Python pueden usar los prefijos 0b (binario), 0o (octal) y 0x (hexadecimal). int(text) por sí solo acepta únicamente dígitos decimales, mientras que int(text, 0) lee el prefijo y elige la base. Saber que 0o17 es 15 y 0xFF es 255 es el tipo de conversión que PCEP pregunta directamente."
  },
  "pcep-bit-flags": {
    title: "Trabaja con banderas de bits",
    prompt: "Los permisos se guardan como bits en un solo entero. Escribe tres funciones:\n\n`set_flag(flags, bit)` devuelve `flags` con el bit indicado encendido.\n\n`has_flag(flags, bit)` devuelve `True` si ese bit está encendido y `False` en caso contrario.\n\n`clear_flag(flags, bit)` devuelve `flags` con ese bit apagado.\n\nEl bit 0 es el bit más bajo. Por ejemplo, `set_flag(0, 2)` es 4 y `clear_flag(7, 1)` es 5.",
    hint: "Construye una máscara con un desplazamiento y luego combínala con |, & o & junto con ~.",
    explain: "1 << bit construye una máscara con un solo bit encendido. | enciende ese bit, & lo prueba, y & con ~mask lo apaga sin tocar los demás. Sumar o restar solo funciona cuando ya conoces el estado del bit. PCEP espera que sepas evaluar ~, &, |, ^, << y >> con enteros pequeños."
  },
  "pcep-grade-order": {
    title: "Corrige el orden de las ramas elif",
    prompt: "Escribe `grade(score)`, que devuelve una letra para una calificación de 0 a 100: `\"A\"` para 90 o más, `\"B\"` de 80 a 89, `\"C\"` de 70 a 79 y `\"F\"` para cualquier valor menor.\n\nEl código inicial se ejecuta sin errores, pero da la letra equivocada para las calificaciones altas.",
    hint: "En una cadena if-elif solo se ejecuta la primera rama verdadera. ¿Qué prueba atrapa primero al 95?",
    explain: "Python evalúa las condiciones if y elif de arriba hacia abajo y ejecuta solo la primera que sea verdadera. Una prueba amplia como score >= 70 colocada primero también coincide con 95, así que las pruebas más específicas de abajo nunca se ejecutan. Ordenar de la condición más específica a la más general es una pregunta común de control de flujo en PCEP."
  },
  "pcep-prime-for-else": {
    title: "Prueba de primos con for-else",
    prompt: "Escribe `is_prime(n)`, que devuelve `True` si `n` es un número primo y `False` en caso contrario. Los números menores que 2 no son primos.\n\nUsa un ciclo `for` sobre `range()` con `break`, y una cláusula `else` en el ciclo para manejar el caso en que no se encontró ningún divisor.",
    hint: "El else de un ciclo solo se ejecuta cuando el ciclo no se detuvo con break. Empieza a revisar divisores en 2.",
    explain: "range(1, n) empieza en 1, y todo número es divisible entre 1, así que el ciclo siempre hace break. Empezar en 2 lo corrige. Para 2, range(2, 2) está vacío, el cuerpo del ciclo nunca se ejecuta y se ejecuta la cláusula else, que marca correctamente al 2 como primo. PCEP evalúa tanto los ranges vacíos como la regla de que el else de un ciclo solo se omite con break."
  },
  "pcep-while-break-continue": {
    title: "Suma lecturas con while, break y continue",
    prompt: "Escribe `sum_readings(values)`, que recorre una lista con un ciclo `while` y un índice. Suma los números positivos, omite los negativos con `continue` y se detiene por completo en el primer `0` con `break`.\n\nPor ejemplo, `sum_readings([4, -2, 3, 0, 10])` devuelve 7.",
    hint: "Asegúrate de que el índice avance antes del continue, o el ciclo nunca terminará.",
    explain: "continue salta a la siguiente pasada del ciclo y break sale del ciclo por completo. Con while, la variable del ciclo se actualiza a mano, así que debe cambiar antes de cualquier continue o el mismo elemento se leerá para siempre. Las preguntas de PCEP suelen pedir cuántas veces se ejecuta un ciclo while cuando se mezclan break y continue."
  },
  "pcep-nested-pairs": {
    title: "Cuenta pares con ciclos anidados",
    prompt: "Escribe `count_pairs(nums, target)`, que cuenta cuántos pares de posiciones `i < j` cumplen `nums[i] + nums[j] == target`. Cada par de posiciones se cuenta una vez y un elemento nunca se empareja consigo mismo.\n\nPor ejemplo, `count_pairs([1, 2, 3, 4], 5)` es 2, porque 1 + 4 y 2 + 3 suman 5.",
    hint: "Haz que el range interno empiece una posición después de la variable del ciclo externo.",
    explain: "Cuando ambos ciclos recorren el rango completo, cada par se visita dos veces (i, j y j, i) y cada elemento también se empareja consigo mismo. Empezar el range interno en i + 1 visita cada par no ordenado exactamente una vez. PCEP pregunta a menudo cuántas veces se ejecuta el cuerpo de un ciclo anidado, que es esta misma idea de conteo."
  },
  "pcep-rotate-copy": {
    title: "Rota una lista sin modificarla",
    prompt: "Escribe `rotate_left(items, k)`, que devuelve una nueva lista con los elementos movidos `k` posiciones a la izquierda. `rotate_left([1, 2, 3, 4, 5], 2)` devuelve `[3, 4, 5, 1, 2]`. Un `k` mayor que la longitud da la vuelta, y una lista vacía devuelve una lista vacía.\n\nLa lista original que se recibe no debe cambiar.",
    hint: "Dos slices unidos con + ya crean una lista nueva. Usa % para que k dé la vuelta, pero cuidado con una longitud de cero.",
    explain: "result = items no copia nada; ambos nombres apuntan a la misma lista, así que append y pop también cambian la lista de quien llamó. El slicing (items[k:] e items[:k]) siempre construye listas nuevas. La diferencia entre crear un alias con = y copiar con [:] o list() es una de las ideas más evaluadas en la sección de colecciones de PCEP."
  },
  "pcep-word-counts": {
    title: "Cuenta palabras en un diccionario",
    prompt: "Escribe `word_counts(text)`, que devuelve un diccionario que asocia cada palabra con la cantidad de veces que aparece. Trata las palabras sin distinguir mayúsculas de minúsculas, divide por cualquier espacio en blanco e ignora los espacios extra al inicio y al final.\n\nPor ejemplo, `word_counts(\"  The cat saw the  DOG \")` devuelve `{\"the\": 2, \"cat\": 1, \"saw\": 1, \"dog\": 1}`.",
    hint: "split() sin argumentos ya maneja secuencias de espacios. Revisa si una clave existe antes de sumarle 1.",
    explain: "split(\" \") produce strings vacíos por cada espacio extra, mientras que split() sin argumentos divide por cualquier secuencia de espacios en blanco y descarta los del inicio y del final. lower() hace que The y the sean la misma clave, y el operador in revisa si una clave del diccionario existe antes de incrementarla. Tanto las actualizaciones de diccionarios como estos métodos de strings están en el temario de PCEP."
  },
  "pcep-palindrome": {
    title: "Revisa un palíndromo con slicing",
    prompt: "Escribe `is_palindrome(text)`, que devuelve `True` si el texto se lee igual al derecho y al revés una vez que ignoras mayúsculas y minúsculas y conservas solo letras y dígitos. Por ejemplo, `\"Never odd or even\"` y `\"A1b, B1a\"` son palíndromos, y `\"Python\"` no lo es.",
    hint: "Primero construye un string limpio en minúsculas y luego compáralo con un slice que avance hacia atrás.",
    explain: "El slice [::-1] recorre el string con un paso de -1 y devuelve una copia invertida; los strings son inmutables, así que construyes un nuevo string limpio en lugar de cambiar el original. join() vuelve a unir los caracteres que conservaste. El slicing con pasos negativos y los métodos de strings como lower() y join() son temas habituales de PCEP."
  },
  "pcep-describe-defaults": {
    title: "Devuelve varios valores con un parámetro por defecto",
    prompt: "Escribe `describe(nums, digits=1)`, que devuelve una tupla `(smallest, largest, mean)` para una lista no vacía de números, con el promedio redondeado a `digits` decimales.\n\n`describe([2, 4, 9])` devuelve `(2, 9, 5.0)` y `describe([1, 2, 2], digits=3)` devuelve `(1, 2, 1.667)`.",
    hint: "Una instrucción return con valores separados por comas ya construye una tupla. round() recibe el número de decimales como segundo argumento.",
    explain: "Una función que solo imprime devuelve None, así que quien la llama no recibe nada con qué trabajar. return a, b, c empaqueta los valores en una tupla. Un valor por defecto (digits=1) hace que el parámetro sea opcional, y debe ir después de los parámetros obligatorios. Los argumentos por palabra clave permiten que quien llama nombre el parámetro explícitamente, algo que PCEP evalúa junto con el paso posicional."
  },
  "pcep-recursive-digits": {
    title: "Suma recursiva de dígitos",
    prompt: "Escribe una función recursiva `digit_sum(n)` que devuelva la suma de los dígitos de un entero no negativo. `digit_sum(4096)` es 19 y `digit_sum(0)` es 0.\n\nLa función debe llamarse a sí misma; no conviertas el número a string.",
    hint: "El último dígito es n % 10 y el resto del número es n // 10. ¿Cuál es el n más pequeño que ya no necesita otra llamada?",
    explain: "Sin un caso base, la función sigue llamándose a sí misma con 0 para siempre hasta que Python lanza RecursionError. Devolver n cuando es un solo dígito detiene la recursión. Cada llamada maneja un dígito con % y pasa el resto con //. PCEP espera que detectes un caso base faltante y que sigas paso a paso una llamada recursiva corta."
  },
  "pcep-lookup-errors": {
    title: "Maneja solo los errores de búsqueda",
    prompt: "Escribe `get_item(container, key)`, que devuelve `container[key]`. Si la clave o el índice no existe, devuelve `None` en lugar de fallar. Esto debe funcionar tanto con diccionarios (clave faltante) como con listas (índice fuera de rango).\n\nOtros errores, como usar un string para indexar una lista, deben seguir lanzando su excepción normal para que los bugs no queden ocultos.",
    hint: "KeyError e IndexError comparten una clase padre en la jerarquía de excepciones. Captura ese padre, no todo.",
    explain: "KeyError e IndexError son subclases de LookupError, así que una sola rama except LookupError maneja ambas. Un except sin tipo o except Exception también se tragaría el TypeError y ocultaría un bug real. PCEP te pide ubicar las excepciones integradas en la jerarquía y elegir la rama más específica que encaje."
  }
});
