/* Hands-on exercises for PCEP – Certified Entry-Level Python Programmer (PCEP-30-02). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("pcep", {
  tables: {},
  items: [
    {
      id: "pcep-hours-minutes",
      kind: "code",
      d: 1,
      title: "Split minutes into hours and minutes",
      prompt: "Write `split_minutes(total)` that takes a whole number of minutes and returns a tuple `(hours, minutes)`. For example `split_minutes(135)` returns `(2, 15)` and `split_minutes(59)` returns `(0, 59)`.\n\nBoth values must be integers, not floats.",
      hint: "One operator gives the whole number of times 60 fits, another gives what is left over.",
      starter: `def split_minutes(total):
    hours = total / 60
    minutes = total - hours
    return (hours, minutes)
`,
      solution: `def split_minutes(total):
    hours = total // 60
    minutes = total % 60
    return (hours, minutes)
`,
      tests: [
        { name: "135 minutes is 2 hours 15 minutes", code: `assert split_minutes(135) == (2, 15), "split_minutes(135) should be (2, 15)"` },
        { name: "59 minutes is 0 hours 59 minutes", code: `assert split_minutes(59) == (0, 59), "split_minutes(59) should be (0, 59)"` },
        { name: "results are integers", code: `h, m = split_minutes(600)
assert (h, m) == (10, 0), "split_minutes(600) should be (10, 0)"
assert type(h) is int and type(m) is int, "both values should be int, not float"` }
      ],
      explain: "The / operator always returns a float (135 / 60 is 2.25), which is a classic PCEP trap. Floor division // returns the whole number of hours as an int when both operands are ints, and % returns the remainder. Together // and % split any quantity into a quotient and a remainder."
    },
    {
      id: "pcep-input-sum",
      kind: "code",
      d: 1,
      title: "Add two numbers read with input()",
      prompt: "The program reads two whole numbers with `input()`, one per line. The provided input is `7` and then `5`.\n\nStore their numeric sum in a variable named `total` and print it as `7 + 5 = 12` using `print()` with the `sep` argument so that the parts are separated by single spaces. Right now the program glues the strings together instead of adding them.",
      hint: "Whatever input() gives back is always text. Convert it before you add.",
      stdin: "7\n5",
      starter: `a = input()
b = input()
total = a + b
print(a, "+", b, "=", total, sep=" ")
`,
      solution: `a = int(input())
b = int(input())
total = a + b
print(a, "+", b, "=", total, sep=" ")
`,
      tests: [
        { name: "total holds the number 12", code: `assert total == 12, "total should be the int 12, not the string '75'"` },
        { name: "total is an int", code: `assert isinstance(total, int), "convert the input with int() before adding"` }
      ],
      explain: "input() always returns a str, so a + b on two inputs is string concatenation and gives '75'. Casting with int() turns each line into a number before the addition. The exam often asks what input() returns and what happens when you add a string to a number (a TypeError) or two strings (concatenation)."
    },
    {
      id: "pcep-literal-bases",
      kind: "code",
      d: 1,
      title: "Total a list of integer literals",
      prompt: "Write `total_of(texts)` that receives a list of strings, each written as a Python integer literal in decimal, binary (`0b`), octal (`0o`) or hexadecimal (`0x`), and returns their sum as an int.\n\nFor example `total_of([\"10\", \"0b101\", \"0o17\", \"0xFF\"])` is 10 + 5 + 15 + 255 = 285.",
      hint: "int() takes an optional second argument for the base. One special value lets Python read the prefix itself.",
      starter: `def total_of(texts):
    total = 0
    for t in texts:
        total += int(t)
    return total
`,
      solution: `def total_of(texts):
    total = 0
    for t in texts:
        total += int(t, 0)
    return total
`,
      tests: [
        { name: "mixed bases add up to 285", code: `assert total_of(["10", "0b101", "0o17", "0xFF"]) == 285, "10 + 5 + 15 + 255 should be 285"` },
        { name: "plain decimals still work", code: `assert total_of(["1", "2", "3"]) == 6, "1 + 2 + 3 should be 6"` },
        { name: "empty list gives 0", code: `assert total_of([]) == 0, "an empty list should total 0"` }
      ],
      explain: "Python integer literals can use the prefixes 0b (binary), 0o (octal) and 0x (hexadecimal). int(text) alone only accepts decimal digits, while int(text, 0) reads the prefix and picks the base. Knowing that 0o17 is 15 and 0xFF is 255 is the kind of conversion PCEP asks about directly."
    },
    {
      id: "pcep-bit-flags",
      kind: "code",
      d: 1,
      title: "Work with bit flags",
      prompt: "Permissions are stored as bits in one integer. Write three functions:\n\n`set_flag(flags, bit)` returns `flags` with the given bit turned on.\n\n`has_flag(flags, bit)` returns `True` if that bit is on, otherwise `False`.\n\n`clear_flag(flags, bit)` returns `flags` with that bit turned off.\n\nBit 0 is the lowest bit. For example `set_flag(0, 2)` is 4 and `clear_flag(7, 1)` is 5.",
      hint: "Build a mask with a shift, then combine it with |, & or & together with ~.",
      starter: `def set_flag(flags, bit):
    return flags + bit

def has_flag(flags, bit):
    pass

def clear_flag(flags, bit):
    return flags - bit
`,
      solution: `def set_flag(flags, bit):
    return flags | (1 << bit)

def has_flag(flags, bit):
    return flags & (1 << bit) != 0

def clear_flag(flags, bit):
    return flags & ~(1 << bit)
`,
      tests: [
        { name: "set_flag turns a bit on", code: `assert set_flag(0, 2) == 4, "set_flag(0, 2) should be 4"
assert set_flag(4, 2) == 4, "setting a bit that is already on should not change the value"` },
        { name: "has_flag reports each bit", code: `assert has_flag(5, 0) is True, "5 is 0b101 so bit 0 is on"
assert has_flag(5, 1) is False, "5 is 0b101 so bit 1 is off"` },
        { name: "clear_flag turns a bit off", code: `assert clear_flag(7, 1) == 5, "clear_flag(7, 1) should be 5"
assert clear_flag(5, 1) == 5, "clearing a bit that is already off should not change the value"` }
      ],
      explain: "1 << bit builds a mask with a single bit set. | turns that bit on, & tests it, and & with ~mask turns it off while leaving the others alone. Adding or subtracting only works when you already know the bit's state. PCEP expects you to evaluate ~, &, |, ^, << and >> on small integers."
    },
    {
      id: "pcep-grade-order",
      kind: "code",
      d: 2,
      title: "Fix the order of elif branches",
      prompt: "Write `grade(score)` that returns a letter for a score from 0 to 100: `\"A\"` for 90 and above, `\"B\"` for 80 to 89, `\"C\"` for 70 to 79 and `\"F\"` for anything lower.\n\nThe starter runs without errors but gives the wrong letter for high scores.",
      hint: "Only the first true branch in an if-elif chain runs. Which test catches 95 first?",
      starter: `def grade(score):
    if score >= 70:
        return "C"
    elif score >= 80:
        return "B"
    elif score >= 90:
        return "A"
    else:
        return "F"
`,
      solution: `def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"
`,
      tests: [
        { name: "95 is an A and 90 is an A", code: `assert grade(95) == "A", "grade(95) should be A"
assert grade(90) == "A", "grade(90) should be A"` },
        { name: "85 is a B and 72 is a C", code: `assert grade(85) == "B", "grade(85) should be B"
assert grade(72) == "C", "grade(72) should be C"` },
        { name: "69 is an F", code: `assert grade(69) == "F", "grade(69) should be F"` }
      ],
      explain: "Python tests if and elif conditions from top to bottom and runs only the first one that is true. A broad test such as score >= 70 placed first also matches 95, so the narrower tests below it never run. Ordering from the most specific condition to the most general is a common PCEP control-flow question."
    },
    {
      id: "pcep-prime-for-else",
      kind: "code",
      d: 2,
      title: "Prime test with for-else",
      prompt: "Write `is_prime(n)` that returns `True` if `n` is a prime number and `False` otherwise. Numbers below 2 are not prime.\n\nUse a `for` loop over `range()` with `break`, and an `else` clause on the loop to handle the case where no divisor was found.",
      hint: "The else of a loop runs only when the loop was not stopped by break. Start checking divisors at 2.",
      starter: `def is_prime(n):
    if n < 2:
        return False
    for d in range(1, n):
        if n % d == 0:
            result = False
            break
    else:
        result = True
    return result
`,
      solution: `def is_prime(n):
    if n < 2:
        return False
    for d in range(2, n):
        if n % d == 0:
            result = False
            break
    else:
        result = True
    return result
`,
      tests: [
        { name: "small primes are recognised", code: `for p in (2, 3, 5, 7, 13, 97):
    assert is_prime(p) is True, f"{p} is prime"` },
        { name: "composites are rejected", code: `for c in (4, 9, 15, 91, 100):
    assert is_prime(c) is False, f"{c} is not prime"` },
        { name: "0, 1 and negatives are not prime", code: `for x in (0, 1, -7):
    assert is_prime(x) is False, f"{x} is not prime"` }
      ],
      explain: "range(1, n) starts at 1, and every number divides by 1, so the loop always breaks. Starting at 2 fixes it. For 2, range(2, 2) is empty, the loop body never runs and the else clause runs, which correctly marks 2 as prime. PCEP tests both empty ranges and the rule that a loop's else is skipped only by break."
    },
    {
      id: "pcep-while-break-continue",
      kind: "code",
      d: 2,
      title: "Sum readings with while, break and continue",
      prompt: "Write `sum_readings(values)` that walks through a list with a `while` loop and an index. It adds up the positive numbers, skips negative numbers with `continue`, and stops completely at the first `0` with `break`.\n\nFor example `sum_readings([4, -2, 3, 0, 10])` returns 7.",
      hint: "Make sure the index moves forward before continue, or the loop never ends.",
      starter: `def sum_readings(values):
    total = 0
    i = 0
    while i < len(values):
        v = values[i]
        i += 1
        total += v
    return total
`,
      solution: `def sum_readings(values):
    total = 0
    i = 0
    while i < len(values):
        v = values[i]
        i += 1
        if v == 0:
            break
        if v < 0:
            continue
        total += v
    return total
`,
      tests: [
        { name: "stops at the first zero", code: `assert sum_readings([4, -2, 3, 0, 10]) == 7, "4 + 3 = 7, then stop at 0"` },
        { name: "skips negatives without a zero", code: `assert sum_readings([-1, 5, -5, 5]) == 10, "only 5 + 5 should count"` },
        { name: "empty list and leading zero give 0", code: `assert sum_readings([]) == 0, "empty list should give 0"
assert sum_readings([0, 9]) == 0, "a leading 0 stops the loop at once"` }
      ],
      explain: "continue jumps to the next pass of the loop and break leaves the loop entirely. With while, the loop variable is updated by hand, so it must change before any continue or the same item is read forever. PCEP questions often count how many times a while loop runs when break and continue are mixed in."
    },
    {
      id: "pcep-nested-pairs",
      kind: "code",
      d: 2,
      title: "Count pairs with nested loops",
      prompt: "Write `count_pairs(nums, target)` that counts how many pairs of positions `i < j` have `nums[i] + nums[j] == target`. Each pair of positions is counted once and an item is never paired with itself.\n\nFor example `count_pairs([1, 2, 3, 4], 5)` is 2, because 1 + 4 and 2 + 3 both make 5.",
      hint: "Let the inner range start one position after the outer loop variable.",
      starter: `def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count
`,
      solution: `def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count
`,
      tests: [
        { name: "two pairs make 5", code: `assert count_pairs([1, 2, 3, 4], 5) == 2, "count_pairs([1, 2, 3, 4], 5) should be 2"` },
        { name: "an item is not paired with itself", code: `assert count_pairs([3, 1], 6) == 0, "3 must not pair with itself"` },
        { name: "repeated values count as separate positions", code: `assert count_pairs([2, 2, 2], 4) == 3, "three positions give three pairs"` }
      ],
      explain: "When both loops run over the full range, every pair is visited twice (i, j and j, i) and each item is also paired with itself. Starting the inner range at i + 1 visits each unordered pair exactly once. PCEP often asks how many times the body of a nested loop runs, which is this same counting idea."
    },
    {
      id: "pcep-rotate-copy",
      kind: "code",
      d: 3,
      title: "Rotate a list without changing it",
      prompt: "Write `rotate_left(items, k)` that returns a new list with the items moved `k` places to the left. `rotate_left([1, 2, 3, 4, 5], 2)` returns `[3, 4, 5, 1, 2]`. A `k` larger than the length wraps around, and an empty list returns an empty list.\n\nThe original list passed in must not be changed.",
      hint: "Two slices joined with + already create a new list. Use % to wrap k, but watch out for a length of zero.",
      starter: `def rotate_left(items, k):
    result = items
    for _ in range(k):
        result.append(result.pop(0))
    return result
`,
      solution: `def rotate_left(items, k):
    if not items:
        return []
    k = k % len(items)
    return items[k:] + items[:k]
`,
      tests: [
        { name: "rotates by 2", code: `assert rotate_left([1, 2, 3, 4, 5], 2) == [3, 4, 5, 1, 2], "rotate_left([1, 2, 3, 4, 5], 2) should be [3, 4, 5, 1, 2]"` },
        { name: "original list is untouched", code: `data = [1, 2, 3]
out = rotate_left(data, 1)
assert data == [1, 2, 3], "the list passed in must not change"
assert out is not data, "return a new list, not the same object"` },
        { name: "wraps and handles empty lists", code: `assert rotate_left([1, 2, 3], 4) == [2, 3, 1], "k larger than the length should wrap"
assert rotate_left([], 3) == [], "an empty list stays empty"` }
      ],
      explain: "result = items does not copy anything; both names point at the same list, so append and pop change the caller's list too. Slicing (items[k:] and items[:k]) always builds new lists. The difference between aliasing with = and copying with [:] or list() is one of the most tested ideas in the PCEP collections section."
    },
    {
      id: "pcep-word-counts",
      kind: "code",
      d: 3,
      title: "Count words in a dictionary",
      prompt: "Write `word_counts(text)` that returns a dictionary mapping each word to how many times it appears. Treat words case-insensitively, split on any whitespace, and ignore extra spaces at the start and end.\n\nFor example `word_counts(\"  The cat saw the  DOG \")` returns `{\"the\": 2, \"cat\": 1, \"saw\": 1, \"dog\": 1}`.",
      hint: "split() with no argument already handles runs of spaces. Check whether a key exists before you add 1 to it.",
      starter: `def word_counts(text):
    counts = {}
    for word in text.split(" "):
        counts[word] = 1
    return counts
`,
      solution: `def word_counts(text):
    counts = {}
    for word in text.lower().split():
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1
    return counts
`,
      tests: [
        { name: "counts ignore case and extra spaces", code: `assert word_counts("  The cat saw the  DOG ") == {"the": 2, "cat": 1, "saw": 1, "dog": 1}, "check case, repeats and extra spaces"` },
        { name: "repeated word is counted", code: `assert word_counts("go go go") == {"go": 3}, "go appears three times"` },
        { name: "empty text gives an empty dictionary", code: `assert word_counts("   ") == {}, "only spaces should give {}"` }
      ],
      explain: "split(\" \") produces empty strings for every extra space, while split() with no argument splits on any run of whitespace and drops leading and trailing blanks. lower() makes The and the the same key, and the in operator checks whether a dictionary key exists before it is incremented. Dictionary updates and these string methods are both in the PCEP syllabus."
    },
    {
      id: "pcep-palindrome",
      kind: "code",
      d: 3,
      title: "Check a palindrome with slicing",
      prompt: "Write `is_palindrome(text)` that returns `True` if the text reads the same forwards and backwards once you ignore case and keep only letters and digits. For example `\"Never odd or even\"` and `\"A1b, B1a\"` are palindromes, and `\"Python\"` is not.",
      hint: "Build a cleaned, lower-case string first, then compare it with a slice that steps backwards.",
      starter: `def is_palindrome(text):
    return text == text[::-1]
`,
      solution: `def is_palindrome(text):
    cleaned = "".join(ch.lower() for ch in text if ch.isalnum())
    return cleaned == cleaned[::-1]
`,
      tests: [
        { name: "ignores case and spaces", code: `assert is_palindrome("Never odd or even") is True, "'Never odd or even' is a palindrome"` },
        { name: "ignores punctuation", code: `assert is_palindrome("A1b, B1a") is True, "'A1b, B1a' is a palindrome"` },
        { name: "rejects a normal word", code: `assert is_palindrome("Python") is False, "'Python' is not a palindrome"` }
      ],
      explain: "The slice [::-1] walks the string with a step of -1 and returns a reversed copy; strings are immutable, so you build a new cleaned string rather than changing the original. join() glues the kept characters back together. Slicing with negative steps and string methods such as lower() and join() are regular PCEP items."
    },
    {
      id: "pcep-describe-defaults",
      kind: "code",
      d: 4,
      title: "Return several values with a default parameter",
      prompt: "Write `describe(nums, digits=1)` that returns a tuple `(smallest, largest, mean)` for a non-empty list of numbers, with the mean rounded to `digits` decimal places.\n\n`describe([2, 4, 9])` returns `(2, 9, 5.0)` and `describe([1, 2, 2], digits=3)` returns `(1, 2, 1.667)`.",
      hint: "A return statement with values separated by commas already builds a tuple. round() takes the number of places as its second argument.",
      starter: `def describe(nums, digits):
    mean = sum(nums) / len(nums)
    print(min(nums), max(nums), mean)
`,
      solution: `def describe(nums, digits=1):
    mean = round(sum(nums) / len(nums), digits)
    return min(nums), max(nums), mean
`,
      tests: [
        { name: "works without passing digits", code: `assert describe([2, 4, 9]) == (2, 9, 5.0), "describe([2, 4, 9]) should be (2, 9, 5.0)"` },
        { name: "digits can be given as a keyword argument", code: `assert describe([1, 2, 2], digits=3) == (1, 2, 1.667), "describe([1, 2, 2], digits=3) should be (1, 2, 1.667)"` },
        { name: "the result is a tuple", code: `assert isinstance(describe([5]), tuple), "return a tuple, not None"` }
      ],
      explain: "A function that only prints returns None, so the caller gets nothing to work with. return a, b, c packs the values into a tuple. A default value (digits=1) makes the parameter optional, and it has to come after required parameters. Keyword arguments let the caller name the parameter explicitly, which PCEP tests alongside positional passing."
    },
    {
      id: "pcep-recursive-digits",
      kind: "code",
      d: 4,
      title: "Recursive digit sum",
      prompt: "Write a recursive function `digit_sum(n)` that returns the sum of the digits of a non-negative integer. `digit_sum(4096)` is 19 and `digit_sum(0)` is 0.\n\nThe function must call itself; do not convert the number to a string.",
      hint: "The last digit is n % 10 and the rest of the number is n // 10. What is the smallest n that needs no further call?",
      starter: `def digit_sum(n):
    return n % 10 + digit_sum(n // 10)
`,
      solution: `def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)
`,
      tests: [
        { name: "4096 gives 19", code: `assert digit_sum(4096) == 19, "4 + 0 + 9 + 6 should be 19"` },
        { name: "single digits and zero", code: `assert digit_sum(0) == 0, "digit_sum(0) should be 0"
assert digit_sum(7) == 7, "digit_sum(7) should be 7"` },
        { name: "large number", code: `assert digit_sum(99999) == 45, "digit_sum(99999) should be 45"` }
      ],
      explain: "Without a base case the function keeps calling itself with 0 forever until Python raises RecursionError. Returning n when it is a single digit stops the recursion. Each call handles one digit with % and passes the rest on with //. PCEP expects you to spot a missing base case and trace a short recursive call."
    },
    {
      id: "pcep-lookup-errors",
      kind: "code",
      d: 4,
      title: "Handle lookup errors only",
      prompt: "Write `get_item(container, key)` that returns `container[key]`. If the key or index does not exist, return `None` instead of crashing. This must work for both dictionaries (missing key) and lists (index out of range).\n\nOther mistakes, such as using a string to index a list, should still raise their normal exception so that bugs are not hidden.",
      hint: "KeyError and IndexError share a parent class in the exception hierarchy. Catch that parent, not everything.",
      starter: `def get_item(container, key):
    try:
        return container[key]
    except KeyError:
        return None
`,
      solution: `def get_item(container, key):
    try:
        return container[key]
    except LookupError:
        return None
`,
      tests: [
        { name: "missing dictionary key gives None", code: `assert get_item({"a": 1}, "b") is None, "a missing key should give None"
assert get_item({"a": 1}, "a") == 1, "an existing key should give its value"` },
        { name: "list index out of range gives None", code: `assert get_item([10, 20], 5) is None, "index 5 is out of range and should give None"` },
        { name: "a TypeError is not hidden", code: `try:
    get_item([1, 2], "x")
except TypeError:
    pass
else:
    raise AssertionError("indexing a list with a string should still raise TypeError")` }
      ],
      explain: "KeyError and IndexError are both subclasses of LookupError, so one except LookupError branch handles both. A bare except or except Exception would also swallow the TypeError and hide a real bug. PCEP asks you to place built-in exceptions in the hierarchy and to choose the narrowest branch that fits."
    }
  ]
});
