/* Performance-based simulations for Python Institute PCEP (PCEP-30-02). */
CertHub.addPbqs("pcep", [
  { id: "literals-bitwise-match", d: 1, type: "match", title: "Evaluate literals and bitwise expressions",
    prompt: "A code-review checklist asks you to confirm what each expression evaluates to in the Python REPL. Match each expression to the value Python prints.",
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
    explain: "0x is hexadecimal (1*16 + 15 = 31), 0o is octal (1*8 + 7 = 15) and 0b is binary (8 + 2 = 10). Scientific notation always produces a float, so 1.5e2 is 150.0, not 150. ~x equals -x - 1, so ~5 is -6; ^ is bitwise XOR (110 ^ 011 = 101 = 5), not exponentiation, which would give 216; and 5 << 2 shifts left two bits, multiplying by 4." },

  { id: "operator-priority-order", d: 1, type: "order", title: "Rank operator priority",
    prompt: "Put these Python operators in order of priority, from the one that binds most tightly (evaluated first) to the one that binds least tightly.",
    steps: ["** (exponentiation)", "unary - (negation)", "* / // %", "binary + and -", "& (bitwise AND)", "== != < > <= >=", "not", "or"],
    explain: "** binds tighter than unary minus, which is why -2 ** 2 is -4. Multiplicative operators come before additive ones, then (after the shifts) bitwise AND, then comparisons. The Boolean operators are lowest of all, with not above and, and and above or, so a or b and c means a or (b and c); use parentheses whenever the intent is not obvious." },

  { id: "collatz-while-fill", d: 2, type: "fill", title: "Trace a while loop with break and else",
    prompt: "Trace this program by hand and fill in the values.",
    context: "n = 17\nsteps = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = 3 * n + 1\n    steps += 1\n    if steps == 5:\n        break\nelse:\n    print(\"reached 1\")\nprint(n, steps)",
    fields: [
      { label: "Value of n printed on the last line", answers: ["20"] },
      { label: "Value of steps printed on the last line", answers: ["5"] },
      { label: "Is \"reached 1\" printed? (yes/no)", answers: ["no"] }
    ],
    explain: "The sequence is 17 -> 52 -> 26 -> 13 -> 40 -> 20, and after the fifth pass steps equals 5, so break runs while n is 20. A loop's else clause runs only when the loop ends because its condition became false; ending with break skips it, so \"reached 1\" is never printed." },

  { id: "loops-print-012-select", d: 2, type: "select", title: "Choose loops that print 0 1 2",
    prompt: "Each option is a complete snippet. Select every snippet that prints exactly 0 1 2 (each number followed by a space, on one line).",
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
    explain: "range(3) and the while i < 3 loop produce 0, 1, 2, and range(-3, 0) gives -3, -2, -1, which become 0, 1, 2 after adding 3. Iterating the string \"012\" prints its characters, which look identical on screen. The i <= 3 loop runs one extra time (0 1 2 3), range(0, 5, 2) steps by two (0 2 4), and range(3, 0, -1) counts down, printing 2 1 0." },

  { id: "nested-loop-output-order", d: 2, type: "order", title: "Predict nested loop output",
    prompt: "Put the lines this program prints in the order they appear on screen.",
    context: "for i in range(3):\n    for j in range(3):\n        if j == 1:\n            continue\n        if i == 2:\n            break\n        print(i, j)\n    else:\n        print(\"inner done\", i)\nprint(\"end\")",
    steps: ["0 0", "0 2", "inner done 0", "1 0", "1 2", "inner done 1", "end"],
    explain: "continue skips j == 1 on every pass, so rows 0 and 1 print j values 0 and 2. The inner loop finishes normally for i = 0 and i = 1, so its else clause prints \"inner done\". When i is 2, break fires on j = 0, which exits only the inner loop and skips its else, so nothing is printed for i = 2 before \"end\"." },

  { id: "list-slicing-fill", d: 3, type: "fill", title: "Evaluate list indexing and slicing",
    prompt: "Given the list below, fill in what each expression evaluates to. Write lists exactly as Python prints them, for example [1, 2].",
    context: "nums = [4, 8, 15, 16, 23, 42]",
    fields: [
      { label: "nums[-2]", answers: ["23"] },
      { label: "nums[1:4]", answers: ["[8, 15, 16]", "[8,15,16]"] },
      { label: "nums[::-2]", answers: ["[42, 16, 8]", "[42,16,8]"] },
      { label: "nums[4:1:-1]", answers: ["[23, 16, 15]", "[23,16,15]"] },
      { label: "len(nums[10:])", answers: ["0"] }
    ],
    explain: "Negative indexes count from the end, so -2 is 23. A slice includes the start index but stops before the stop index, so [1:4] is indexes 1, 2 and 3. With a negative step the slice walks backwards: [::-2] starts at the last item and takes every second one, and [4:1:-1] takes indexes 4, 3 and 2. Slices never raise IndexError; an out-of-range slice is simply empty." },

  { id: "aliasing-copy-fill", d: 3, type: "fill", title: "Track list aliasing and copying",
    prompt: "Trace this code and fill in what each name refers to when the print runs.",
    context: "a = [1, 2, 3]\nb = a\nc = a[:]\nb.append(4)\nc.insert(0, 0)\ndel a[1]\nprint(a, b, c, len(c))",
    fields: [
      { label: "a", answers: ["[1, 3, 4]", "[1,3,4]"] },
      { label: "b", answers: ["[1, 3, 4]", "[1,3,4]"] },
      { label: "c", answers: ["[0, 1, 2, 3]", "[0,1,2,3]"] },
      { label: "len(c)", answers: ["4"] }
    ],
    explain: "b = a copies only the reference, so a and b are the same list: appending 4 through b and deleting index 1 through a both change that one list, giving [1, 3, 4]. a[:] builds a new list, so c is independent; insert(0, 0) puts 0 at the front, giving [0, 1, 2, 3] with length 4." },

  { id: "collection-errors-select", d: 3, type: "select", title: "Spot statements that raise errors",
    prompt: "Select every snippet that raises an exception when run.",
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
    explain: "Tuples and strings are immutable, so item assignment raises TypeError, and assigning to a list index that does not exist raises IndexError. Dictionary keys must be hashable, so a list key raises TypeError. Adding a new dictionary key is normal, a tuple can hold a mutable list whose contents can change, tuple concatenation builds a new tuple, and an oversized slice just stops at the end." },

  { id: "string-methods-match", d: 3, type: "match", title: "Match string expressions to results",
    prompt: "Given s = \"Python PCEP\", match each expression to the value it produces.",
    pairs: [
      ["s.find(\"P\", 1)", "7"],
      ["s.count(\"P\")", "3"],
      ["s.split()", "['Python', 'PCEP']"],
      ["s.replace(\"P\", \"J\", 1)", "'Jython PCEP'"],
      ["s[::-1][:4]", "'PECP'"],
      ["s.isalpha()", "False"]
    ],
    extra: ["0", "'Jython JCEJ'", "True"],
    explain: "find() starts searching at index 1, so it skips the first P and returns 7. count() counts all three P characters. split() with no argument splits on whitespace, replace() with a count of 1 changes only the first match, and reversing the string then slicing gives the last four characters backwards. isalpha() is False because the space is not a letter." },

  { id: "exceptions-match", d: 4, type: "match", title: "Identify the exception raised",
    prompt: "A test log shows these one-line snippets each crashed. Match each snippet to the exception Python raises.",
    pairs: [
      ["int(\"12.5\")", "ValueError"],
      ["[10, 20][2]", "IndexError"],
      ["{\"a\": 1}[\"A\"]", "KeyError"],
      ["10 % 0", "ZeroDivisionError"],
      ["\"3\" + 4", "TypeError"],
      ["print(totl)", "NameError"]
    ],
    extra: ["SyntaxError", "RecursionError"],
    explain: "int() accepts a string only if it looks like a whole number, so \"12.5\" gives ValueError (the type is right, the value is not). Out-of-range list positions give IndexError and missing dictionary keys give KeyError; keys are case-sensitive. The % operator divides, so a zero divisor raises ZeroDivisionError. Mixing str and int with + is a TypeError, and a misspelled name is a NameError." },

  { id: "function-scope-fill", d: 4, type: "fill", title: "Trace defaults, keywords and global",
    prompt: "Trace this program and fill in the six values printed on the last line.",
    context: "total = 10\n\ndef add(x, y=5):\n    global total\n    total += x\n    return x * y\n\ndef show(a, b=2, c=3):\n    return a + b * c\n\nr1 = add(2)\nr2 = add(y=1, x=4)\nprint(r1, r2, total, show(1), show(1, c=0), show(c=1, a=2, b=4))",
    fields: [
      { label: "r1", answers: ["10"] },
      { label: "r2", answers: ["4"] },
      { label: "total", answers: ["16"] },
      { label: "show(1)", answers: ["7"] },
      { label: "show(1, c=0)", answers: ["1"] },
      { label: "show(c=1, a=2, b=4)", answers: ["6"] }
    ],
    explain: "add(2) uses the default y = 5 and returns 10; add(y=1, x=4) matches keywords by name, not position, and returns 4. Because of the global declaration both calls change the module-level total: 10 + 2 + 4 = 16. show() multiplies before adding, so show(1) is 1 + 2 * 3 = 7, show(1, c=0) is 1 + 2 * 0 = 1 and show(c=1, a=2, b=4) is 2 + 4 * 1 = 6." },

  { id: "function-calls-select", d: 4, type: "select", title: "Choose valid function calls",
    prompt: "Given the definition below, select every call that runs without raising an error.",
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
    explain: "w is required and h and d have defaults, so box(2), box(2, d=3), box(d=2, w=3) and box(2, 3, d=4) are valid; keyword arguments may appear in any order once all positional ones are given. A positional argument after a keyword one is a SyntaxError, four arguments exceed the three parameters, box(2, w=3) gives w two values, and box() omits the required w; the last three raise TypeError." }
]);
