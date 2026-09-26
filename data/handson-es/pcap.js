/* Spanish text for the Python PCAP hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/pcap.js. */
CertHub.addHandsonEs("pcap", {
  "pcap-math-rounding": {
    title: "floor, ceil y trunc del módulo math",
    prompt: "Importa el módulo `math` y escribe `round_three(x)`, que devuelve una tupla `(math.floor(x), math.ceil(x), math.trunc(x))`.\n\nPara `2.5` el resultado es `(2, 3, 2)` y para `-2.5` es `(-3, -2, -2)`. El código inicial usa `int()` en todas partes, y así solo acierta en algunos casos.",
    hint: "floor siempre redondea hacia abajo, ceil siempre hacia arriba y trunc simplemente descarta la parte fraccionaria. La diferencia se nota con los números negativos.",
    explain: "math.floor() redondea hacia menos infinito, math.ceil() hacia más infinito y math.trunc() hacia cero, que es también lo que hace int(). Solo difieren con números negativos y con números enteros, y las preguntas de PCAP suelen elegir justo esos casos. El examen también espera que sepas que estas funciones viven en el módulo math y que hay que importarlas."
  },
  "pcap-seeded-dice": {
    title: "Dados reproducibles con random.seed()",
    prompt: "Escribe `roll_dice(n, seed)`, que usa el módulo `random` para devolver una lista de `n` tiradas de dado, cada una un int del 1 al 6. Llamarla dos veces con la misma semilla debe dar exactamente la misma lista, para que las pruebas y demostraciones sean repetibles.\n\nLlama a `random.seed()` con la semilla recibida antes de tirar los dados.",
    hint: "Primero inicializa el generador con la semilla y luego usa una función que devuelva números enteros incluyendo ambos extremos, o elige de un range con choice().",
    explain: "El módulo random produce números pseudoaleatorios a partir de un estado interno. random.seed(value) fija ese estado, así que la misma semilla siempre produce la misma secuencia; por eso el uso de semillas aparece en el temario de PCAP. randint(a, b) incluye ambos extremos, mientras que random() devuelve un float desde 0.0 hasta 1.0, sin incluir 1.0."
  },
  "pcap-custom-exception": {
    title: "Define y lanza tu propia excepción",
    prompt: "Crea una clase de excepción `InsufficientFunds` que herede de `Exception`. Su constructor recibe `needed` (el monto que falta), lo guarda como `self.needed` y pasa un mensaje a la clase padre.\n\nLuego escribe `withdraw(balance, amount)`, que devuelve el nuevo saldo, o lanza `InsufficientFunds` con `needed` igual a `amount - balance` cuando el saldo no alcanza.",
    hint: "Llama a super().__init__() con un mensaje para que se llene args y después agrega tu propio atributo.",
    explain: "Solo se pueden lanzar clases derivadas de BaseException, y las excepciones de usuario deben derivar de Exception para que except Exception las siga capturando. Llamar a super().__init__() llena la tupla args, y atributos adicionales como needed dan detalles útiles a quien maneja la excepción. La sección 2.2 de PCAP cubre cómo definir tus propias excepciones y agregarles atributos."
  },
  "pcap-convert-errors": {
    title: "Captura dos excepciones en una sola rama",
    prompt: "Escribe `convert_all(items)`, que intenta `int(item)` con cada elemento. Devuelve una tupla `(numbers, errors)`: `numbers` contiene los valores que se convirtieron, en orden, y `errors` contiene el nombre de la clase de cada excepción que ocurrió, como `\"ValueError\"`.\n\n`convert_all([\"1\", \"x\", None, \"4\"])` devuelve `([1, 4], [\"ValueError\", \"TypeError\"])`. Maneja ambas excepciones en una sola rama `except` usando `as`, y pon el append exitoso en una rama `else`.",
    hint: "except (A, B) as e captura cualquiera de las dos. type(e).__name__ da el nombre de la clase como string.",
    explain: "int('x') lanza ValueError porque el tipo es correcto pero el valor no, mientras que int(None) lanza TypeError porque el tipo es incorrecto. Una tupla en la cláusula except captura cualquiera de las dos, y as e enlaza el objeto de la excepción. La rama else solo se ejecuta cuando el bloque try no lanzó nada. PCAP evalúa el orden y el significado de try, except, else y finally."
  },
  "pcap-caesar": {
    title: "Cifrado César con ord() y chr()",
    prompt: "Escribe `caesar(text, shift)`, que desplaza cada letra `shift` posiciones en el alfabeto, dando la vuelta de la z a la a, y manteniendo las mayúsculas como mayúsculas y las minúsculas como minúsculas. Todo lo que no sea una letra ASCII queda sin cambios.\n\n`caesar(\"Hello, World\", 3)` devuelve `\"Khoor, Zruog\"`, y un desplazamiento negativo descifra.",
    hint: "Convierte la letra en una posición de 0 a 25 restando el code point de 'a' o 'A', desplázala con % y luego vuelve a sumar la base.",
    explain: "ord() devuelve el code point Unicode de un carácter y chr() convierte un code point de vuelta en carácter. Restar la letra base asigna de la a a la z los valores 0 a 25, y % 26 hace que el desplazamiento dé la vuelta en ambas direcciones, incluso con números negativos. La sección 3 de PCAP cubre los code points, ASCII frente a Unicode y estas dos funciones."
  },
  "pcap-find-all": {
    title: "Encuentra todas las apariciones con find()",
    prompt: "Escribe `find_all(text, sub)`, que devuelve una lista con cada índice donde `sub` empieza dentro de `text`, incluidas las coincidencias superpuestas. `find_all(\"banana\", \"ana\")` devuelve `[1, 3]` y una subcadena que no existe devuelve `[]`.\n\nUsa `str.find()` con su argumento de inicio. El código inicial usa `index()`, que se comporta distinto cuando no encuentra nada.",
    hint: "find() devuelve -1 cuando falla; index() lanza una excepción. Empieza la siguiente búsqueda una posición después de la última coincidencia.",
    explain: "str.find() devuelve el índice más bajo de la subcadena a partir de una posición de inicio opcional, o -1 si no la hay. str.index() hace la misma búsqueda pero lanza ValueError cuando no encuentra nada, así que el ciclo nunca ve -1. PCAP pregunta directamente por la diferencia entre find() e index(), y por rfind(), que busca desde la derecha."
  },
  "pcap-username-rules": {
    title: "Valida un nombre de usuario con pruebas de caracteres",
    prompt: "Escribe `valid_username(name)`, que devuelve `True` solo si se cumple todo lo siguiente:\n\nTiene entre 3 y 12 caracteres.\n\nEl primer carácter es una letra.\n\nCada carácter es una letra, un dígito o un guion bajo.\n\n`valid_username(\"alex_99\")` es `True`, mientras que `\"9lives\"`, `\"ab\"` y `\"bad name\"` son todos `False`.",
    hint: "isalpha() e isalnum() prueban caracteres. Revisa los casos vacíos y cortos antes de mirar name[0].",
    explain: "isalnum() es False para todo el string en cuanto aparece un guion bajo, así que hay que probar cada carácter por separado y permitir los guiones bajos explícitamente. isalpha() en el primer carácter aplica la regla de la letra, y revisar primero la longitud evita un IndexError con un string vacío. Los métodos is de los strings aparecen en la sección 3.3 de PCAP."
  },
  "pcap-class-counter": {
    title: "Variable de clase frente a variable de instancia",
    prompt: "Escribe una clase `Ticket` cuyo constructor recibe `owner`. La clase mantiene una variable de clase `issued` que cuenta cuántos tickets se han creado, y cada ticket recibe su propia variable de instancia `number` igual al conteo en el momento en que se creó (el primer ticket es 1).\n\nEl código inicial incrementa el contador a través de `self`, lo que en silencio crea una variable de instancia.",
    hint: "Actualiza el contador a través del nombre de la clase y luego copia su valor en la instancia.",
    explain: "Leer self.issued encuentra la variable de clase, pero asignar a self.issued crea una nueva variable de instancia que la oculta, así que el conteo compartido nunca cambia. Asignar a través de Ticket.issued actualiza el único valor que comparten todas las instancias. Inspeccionar __dict__ en el objeto y en la clase muestra exactamente dónde vive cada variable, algo que PCAP pregunta a menudo."
  },
  "pcap-private-balance": {
    title: "Atributo privado y name mangling",
    prompt: "Escribe una clase `Account` que guarde su saldo en un atributo privado llamado `__balance`, empezando en 0. Dale:\n\n`deposit(amount)`, que suma un monto positivo y lanza `ValueError` para montos cero o negativos.\n\n`balance()`, que devuelve el saldo actual.\n\nEl código fuera de la clase no debería poder leer `acct.__balance` directamente.",
    hint: "Dos guiones bajos al inicio dentro de una clase activan el name mangling. Revisa el monto antes de cambiar cualquier cosa.",
    explain: "Dentro del cuerpo de una clase, un nombre como __balance se reescribe como _Account__balance. Eso hace difícil alcanzarlo desde fuera por accidente, aunque no imposible, así que la privacidad en Python es una convención respaldada por el mangling y no un verdadero control de acceso. PCAP pregunta cuál es el nombre transformado, qué muestra __dict__ y qué devuelve hasattr() para cada forma."
  },
  "pcap-shapes-super": {
    title: "Herencia, super() y __str__",
    prompt: "Se te da una clase `Rectangle`. Escribe `Square(Rectangle)`, cuyo constructor recibe un solo `side` y llama al constructor padre mediante `super()`. Luego dale a `Rectangle` un método `__str__()` para que `str(Rectangle(2, 3))` sea `\"Rectangle 2x3\"` y `str(Square(4))` sea `\"Square 4x4\"`, usando el nombre de la clase en lugar de una palabra escrita a mano.",
    hint: "type(self).__name__ da el nombre de la clase real, incluso cuando el método es heredado.",
    explain: "El constructor de una subclase reemplaza al del padre, así que los atributos del padre solo existen si llamas a super().__init__(). Un __str__ definido una vez en la clase base se hereda, y type(self) se resuelve a la clase real del objeto, lo que es polimorfismo en acción. isinstance() e issubclass() confirman la relación; todo esto aparece en la sección 4 de PCAP."
  },
  "pcap-diamond-mro": {
    title: "Métodos cooperativos en un diamante",
    prompt: "Cuatro clases forman un diamante: `B(A)`, `C(A)` y `D(B, C)`. Cada una tiene un método `trail()` que debe devolver su propia letra seguida de lo que devuelva la siguiente clase en el orden de resolución de métodos, de modo que `D().trail()` sea `\"DBCA\"`, `B().trail()` sea `\"BA\"` y `A().trail()` sea `\"A\"`.\n\nEl código inicial llama a los padres por nombre, así que A se visita dos veces y la posición de C es incorrecta.",
    hint: "super() no significa la clase padre. Significa la siguiente clase en el MRO del objeto con el que empezaste.",
    explain: "Python linealiza una jerarquía de clases con el orden de resolución de métodos C3: para D(B, C) es D, B, C, A, object. super() en B, llamado sobre un objeto D, pasa a C y no a A, así que cada clase se ejecuta exactamente una vez. Llamar a los padres por nombre rompe esto y repite la base compartida. PCAP evalúa el MRO en diamantes y qué hace que una jerarquía sea inconsistente."
  },
  "pcap-comprehension-lambda": {
    title: "Comprehensions y una clave de ordenamiento lambda",
    prompt: "Escribe dos funciones:\n\n`even_squares(nums)` devuelve una lista con los cuadrados solo de los números pares, usando una list comprehension con un filtro `if`. `even_squares([1, 2, 3, 4])` es `[4, 16]`.\n\n`by_last_letter(words)` devuelve una nueva lista ordenada por la última letra de cada palabra, usando `sorted()` con una lambda como key. Las palabras con la misma última letra conservan su orden original.",
    hint: "El filtro va al final de la comprehension. La función key recibe una palabra y devuelve el valor por el cual ordenar.",
    explain: "Una list comprehension de la forma [expr for x in seq if cond] filtra y transforma en un solo paso. sorted() devuelve una lista nueva y acepta una función key, aquí una lambda que devuelve el último carácter; el ordenamiento de Python es estable, así que los empates conservan su orden. list.sort() ordena en el lugar y devuelve None. La sección 5 de PCAP combina las comprehensions con lambdas, map() y filter()."
  },
  "pcap-closure-late-binding": {
    title: "Corrige un closure con late binding",
    prompt: "Escribe `make_adders(n)`, que devuelve una lista de `n` funciones, donde la función en la posición `i` suma `i` a su argumento. Así, `make_adders(3)[2](10)` es 12 y `make_adders(3)[0](10)` es 10.\n\nEl código inicial construye lambdas dentro de un ciclo, pero todas terminan sumando el mismo número.",
    hint: "Un closure busca la variable del ciclo cuando se llama, no cuando se crea. Captura el valor actual al momento de crearla, por ejemplo con un argumento por defecto o una función fábrica.",
    explain: "Cada lambda creada en el ciclo encierra la misma variable i, y para cuando se ejecutan el ciclo ya terminó, así que todas ven su último valor. Una función fábrica (o un argumento por defecto como lambda x, i=i: x + i) crea un nuevo ámbito que guarda el valor actual. La sección 5 de PCAP cubre los closures, y el late binding es la típica pregunta capciosa."
  },
  "pcap-file-generator": {
    title: "Lee registros con un generador",
    prompt: "Escribe una función generadora `read_records(path)` que abra un archivo de texto con `with open(...)` y haga yield de cada línea sin los espacios en blanco de los extremos, omitiendo las líneas vacías y las que empiezan con `#`.\n\nDebe ser un generador (usa `yield`), para que un archivo grande se procese línea por línea en lugar de cargarse completo en una lista.",
    hint: "Iterar sobre un objeto de archivo da una línea a la vez. Primero aplica strip y luego decide si la omites.",
    explain: "Una función que contiene yield devuelve un objeto generador; cada next() se ejecuta hasta el siguiente yield, y StopIteration indica el final. with open() cierra el archivo automáticamente, incluso si ocurre un error, mientras que un open() suelto te deja esa tarea a ti. Iterar sobre un archivo en modo texto lee una línea a la vez. La sección 5 de PCAP cubre generadores, modos de open() y flujos de archivos."
  }
});
