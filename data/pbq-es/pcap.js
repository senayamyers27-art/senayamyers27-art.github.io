/* Spanish translation of the PCAP exam simulations. Same ids and structure as data/pbq/pcap.js. */
CertHub.addPbqs("pcap", [
  {
    id: "import-binds", d: 1, type: "match",
    title: "Relaciona cada instrucción import con el nombre que vincula",
    prompt: "Relaciona cada forma de import con el único nombre que agrega a tu espacio de nombres.",
    pairs: [
      ["import math", "math"],
      ["import math as m", "m"],
      ["from math import pi", "pi"],
      ["from math import sqrt as root", "root"]
    ],
    extra: ["sqrt", "math.pi"],
    explain: "Un `import math` simple vincula solo el nombre del módulo math, así que llamas a math.pi. `import math as m` vincula solo el alias m; el nombre math queda sin definir. `from math import pi` vincula pi directamente (no math), y la cláusula `as` en `from math import sqrt as root` vincula solo root, así que ni sqrt ni math están disponibles. Hacer referencia a un nombre no vinculado como sqrt lanza NameError."
  },
  {
    id: "exc-parents", d: 2, type: "match",
    title: "Relaciona cada excepción con su clase padre directa",
    prompt: "Relaciona cada excepción integrada con la clase de la que hereda directamente.",
    pairs: [
      ["ZeroDivisionError", "ArithmeticError"],
      ["KeyError", "LookupError"],
      ["FileNotFoundError", "OSError"],
      ["AssertionError", "Exception"]
    ],
    extra: ["BaseException", "ValueError"],
    explain: "ZeroDivisionError (junto con OverflowError y FloatingPointError) deriva de ArithmeticError, mientras que IndexError y KeyError derivan de LookupError. FileNotFoundError es una de las subclases de OSError, y AssertionError está directamente debajo de Exception. BaseException está por encima de Exception y se reserva para excepciones que terminan el sistema, como KeyboardInterrupt, así que el código común no debería heredar de ella."
  },
  {
    id: "try-flow-select", d: 2, type: "select",
    title: "Razona sobre try/except/else/finally",
    prompt: "Dada la función de abajo, selecciona todas las afirmaciones VERDADERAS.",
    context: "def process(data):\n    try:\n        value = int(data['count'])\n        result = 100 / value\n    except (KeyError, ValueError) as e:\n        print('input error:', type(e).__name__)\n        return None\n    except ZeroDivisionError:\n        print('cannot divide by zero')\n        return None\n    else:\n        print('ok')\n        return result\n    finally:\n        print('done')",
    options: [
      "process({'count': '0'}) imprime 'cannot divide by zero'.",
      "process({'count': '0'}) imprime 'ok' antes de retornar.",
      "process({'count': '0'}) imprime 'done'.",
      "process({'count': 'x'}) se maneja en la rama (KeyError, ValueError).",
      "process({}) deja que un KeyError se propague sin capturar hasta quien la llamó.",
      "La rama else se ejecuta cada vez que se ejecuta la rama finally."
    ],
    answers: [0, 2, 3],
    explain: "Con count '0', int() funciona pero 100/0 lanza ZeroDivisionError, así que esa rama imprime su mensaje; la rama else se omite siempre que ocurre una excepción, pero finally siempre se ejecuta, así que se imprime 'done'. Con count 'x', int('x') lanza ValueError, que atrapa la rama de la tupla. Un dict vacío hace que data['count'] lance KeyError, que atrapa esa misma rama de la tupla, así que nada se propaga. else se ejecuta solo cuando el try termina sin errores, a diferencia de finally."
  },
  {
    id: "str-slice-fill", d: 3, type: "fill",
    title: "Haz slicing e inspecciona una cadena",
    prompt: "La variable s vale 'Certification' (índices del 0 al 12). Completa cada resultado exactamente como lo imprimiría Python.",
    fields: [
      { label: "s[0:4]", answers: ["Cert"] },
      { label: "s[-4:]", answers: ["tion"] },
      { label: "s[3]", answers: ["t"] },
      { label: "s.count('i')", answers: ["3"] }
    ],
    explain: "s[0:4] toma los índices 0..3, lo que da 'Cert' (el índice final se excluye). s[-4:] empieza cuatro caracteres antes del final, lo que da 'tion'. s[3] es el carácter 't'. La letra 'i' aparece en los índices 4, 6 y 10, así que s.count('i') devuelve 3."
  },
  {
    id: "str-tests-select", d: 3, type: "select",
    title: "Predice los resultados de los métodos de prueba de cadenas",
    prompt: "Selecciona todas las expresiones que se evalúan como True.",
    options: [
      "'Hello'.isalpha()",
      "'Hello123'.isalnum()",
      "'   '.isspace()",
      "'Hello'.isupper()",
      "'123'.isdigit()",
      "'12.5'.isdigit()",
      "'Hello world'.isalpha()"
    ],
    answers: [0, 1, 2, 4],
    explain: "isalpha() es True solo cuando cada carácter es una letra, así que 'Hello' pasa pero 'Hello world' falla por el espacio. isalnum() admite letras y dígitos, así que 'Hello123' pasa. '   '.isspace() es True para texto formado solo por espacios en blanco. isupper() comprueba que todas las letras con mayúscula/minúscula estén en mayúsculas, y 'Hello' tiene minúsculas, así que es False. isdigit() es True para '123' pero False para '12.5', porque '.' no es un dígito."
  },
  {
    id: "mro-order", d: 4, type: "order",
    title: "Ordena las clases en un MRO en diamante",
    prompt: "Una jerarquía en diamante se define así: class A, class B(A), class C(A), class D(B, C). Ordena las clases exactamente en el orden en que las recorre la linealización C3 de Python (D.__mro__).",
    steps: ["D", "B", "C", "A", "object"],
    explain: "La linealización C3 empieza por la propia clase y luego sigue la lista de bases de izquierda a derecha, pero nunca coloca una clase antes que alguna de sus subclases. Así que D va primero, luego B (listada primero), luego C, después su padre común A y, por último, object. Una suposición errónea frecuente es el orden en profundidad D, B, A, C, que visitaría A antes que C y no es lo que usa Python."
  },
  {
    id: "introspect-match", d: 4, type: "match",
    title: "Relaciona expresiones de introspección con sus resultados",
    prompt: "Dada `class Dog:` con una variable de clase `species = 'canine'` y `def __init__(self, name): self.name = name`, y `d = Dog('Rex')`, relaciona cada expresión con su resultado.",
    pairs: [
      ["type(d).__name__", "Dog"],
      ["Dog.__bases__[0].__name__", "object"],
      ["'name' in d.__dict__", "True"],
      ["'species' in d.__dict__", "False"]
    ],
    extra: ["'canine'", "None"],
    explain: "type(d) es la clase Dog, cuyo __name__ es la cadena 'Dog'. Dog no tiene una base explícita, así que __bases__ es (object,) y su nombre es 'object'. El __dict__ de una instancia contiene solo sus propias variables de instancia, así que 'name' está presente pero 'species' no, porque species vive en el __dict__ de la clase, no en el __dict__ de la instancia."
  },
  {
    id: "mangling-fill", d: 4, type: "fill",
    title: "Variables de clase y name mangling",
    prompt: "Dada la clase de abajo, seguida de `a = Counter()` y `b = Counter()`, completa cada valor.",
    context: "class Counter:\n    total = 0\n    def __init__(self):\n        self.__n = 0\n        Counter.total += 1",
    fields: [
      { label: "Counter.total después de crear ambos objetos", answers: ["2"] },
      { label: "El nombre de atributo transformado (mangled) que guarda el __n de a", answers: ["_Counter__n"] },
      { label: "Resultado de hasattr(a, '__n')", answers: ["False"] }
    ],
    explain: "total es una variable de clase y cada __init__ ejecuta Counter.total += 1, así que después de dos objetos vale 2. Un nombre con doble guion bajo como __n se transforma (name mangling) en _ClassName__n, en este caso _Counter__n, así que el valor es accesible con ese nombre. Como en el objeto no existe ningún atributo llamado literalmente __n, hasattr(a, '__n') devuelve False."
  },
  {
    id: "functional-fill", d: 5, type: "fill",
    title: "Comprensiones, map y filter",
    prompt: "Completa el valor que produce cada expresión, escrito exactamente como lo imprimiría Python.",
    fields: [
      { label: "[x * x for x in range(4) if x % 2]", answers: ["[1, 9]", "[1,9]"] },
      { label: "list(map(lambda x: x + 1, [0, 1, 2]))", answers: ["[1, 2, 3]", "[1,2,3]"] },
      { label: "list(filter(lambda x: x > 1, [0, 1, 2, 3]))", answers: ["[2, 3]", "[2,3]"] }
    ],
    explain: "La comprensión conserva solo los x impares (1 y 3, porque x % 2 es verdadero) y los eleva al cuadrado, lo que da [1, 9]. map aplica la lambda a cada elemento sumando 1, lo que produce [1, 2, 3]. filter conserva los elementos para los que el predicado es verdadero (valores mayores que 1), lo que da [2, 3]; devuelve los propios elementos, no booleanos."
  },
  {
    id: "open-modes-match", d: 5, type: "match",
    title: "Relaciona los modos de open() con su comportamiento",
    prompt: "Relaciona cada modo de open() de un solo carácter con lo que hace al abrir el archivo.",
    pairs: [
      ["'r'", "solo lectura; error si el archivo no existe"],
      ["'w'", "vacía el archivo (o lo crea) y luego escribe"],
      ["'a'", "agrega al final, creando el archivo si hace falta"],
      ["'x'", "crea un archivo nuevo; error si ya existe"]
    ],
    extra: ["lectura y escritura desde el principio sin vaciar el archivo"],
    explain: "'r' abre un archivo existente para lectura y lanza FileNotFoundError si no existe. 'w' siempre vacía el archivo (o lo crea) antes de escribir, descartando el contenido anterior. 'a' conserva el contenido existente y escribe al final. 'x' es creación exclusiva y lanza FileExistsError si el archivo ya existe. La opción adicional describe 'r+', que es un modo distinto."
  }
]);
