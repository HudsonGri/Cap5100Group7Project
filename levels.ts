export interface DialogueStep {
  text: string; // The dialogue text to be displayed
  expectedOutput?: {
    output: string; // The expected output after executing the code
    variables?: { [key: string]: any }; // Variables can be either defined or just a variable type
    expectedCode?: string; // Example of expected code
  };
  hints?: string[]; // Optional hints to help the user
  codeImport?: string; // Optional code to add to end of the user's code editor
}

export interface Dialogue {
  steps: DialogueStep[]; // An array of dialogue steps
}

export interface Level {
  number: number; // The level number
  title: string; // The title of the level
  description: string; // A description of what the level is about
  hints: string[]; // An array of hints for the level
  dialogue: Dialogue; // The dialogue associated with the level
  codeTemplate: string; // A template for the code that the user will write
}

export const levels: Level[] = [
  {
    number: 1,
    title: "Hello, World!",
    description:
      "In this level, you'll learn to use Python's `print()` function to display text on the screen. The `print()` function is one of the most basic and useful commands in Python.",
    hints: [
      "Remember to use parentheses () after print",
      "String literals in Python can use either single quotes '' or double quotes \"\"",
      "Don't forget the period.",
      'The print statement should look like: print("Your message here")',
    ],
    dialogue: {
      steps: [
        {
          text:
            "Ah, the classic! Before you can command the lab, you've got to make sure it listens! Let's start by printing a simple message. Type exactly this: `print('Hello Lab.')` and hit enter. This command tells the computer to say something.",
          expectedOutput: {
            output: "Hello Lab.",
            expectedCode: "print('Hello Lab.')",
          },
        },
        {
          text:
            "Excellent work! You've made your first print statement in Python! Now lets go back to the lab. Redirecting you now...",
        },
      ],
    },
    codeTemplate: "# Type your Python code here\n",
  },
  {
    number: 2,
    title: "Variables and Types",
    description:
      "In this level, you'll learn about variables and their types in Python. Variables can store different types of data such as strings, integers, floats, and Booleans.",
    hints: [
      "Strings are enclosed in quotes, e.g., 'Your Name'",
      "Integers are whole numbers, e.g., 25",
      "Floats are decimal numbers, e.g., 1.75",
      "Booleans are either True or False",
      "To convert weight to pounds, multiply by 2.20462 and use int() to get a whole number",
      "To convert Celsius to Fahrenheit, multiply by 1.8 and add 32",
    ],
    dialogue: {
      steps: [
        {
          text:
            "Ah, the Personal ID Station—my favorite gadget. So, here's how it works: every bit of information you enter—your name, age, even if you're a member of the lab—is stored as a variable. Each variable has its own type, depending on what it holds.",
        },
        {
          text:
            "For example, your name is a 'string,' which means it's text. Your age, well, that's a whole number or an 'integer'—like 25. And then there's your height and weight, which are decimal numbers or 'floats.' Oh, and if you're a lab member, that's a yes or no, or what we call a 'Boolean'—`True` or `False`!",
        },
        {
          text:
            "Go ahead—try assigning each detail to a variable. Start with something like `name = 'Your Name'`, `age = 25`, `weight = 65`, and `height = 1.75`. Oh, and don't forget `is_lab_member = True`—we have to keep track of the VIPs around here!",
          expectedOutput: {
            output: "",
            variables: {
              name: "string",
              age: "number",
              height: "number",
              weight: "number",
              is_lab_member: "boolean",
            },
            expectedCode:
              "name = 'Your Name'\nage = 25\nheight = 1.75\nweight = 70\nis_lab_member = True",
          },
          hints: [
            "Strings are enclosed in quotes, e.g., 'Your Name'",
            "Integers are whole numbers, e.g., 25",
            "Floats are decimal numbers, e.g., 1.75",
            "Booleans are either True or False",
          ],
        },
        {
          text:
            "Perfect! Now, just for fun, let's see how your weight would look in pounds. You can do that by converting it—type `weight_pounds = int(weight * 2.20462)`. Easy, right?",
          expectedOutput: {
            output: "",
            variables: {
              weight_pounds: "number",
            },
            expectedCode: "weight_pounds = int(weight * 2.20462)",
          },
          hints: [
            "To convert weight to pounds, multiply by 2.20462 and use int() to get a whole number",
            "To convert Celsius to Fahrenheit, multiply by 1.8 and add 32",
          ],
        },
        {
          text:
            "Great job! Let me just take your temperature real quick... 37 degrees Celsius, perfectly normal! I've added that to your profile as 'body_temperature'. Now, could you help me convert that to Fahrenheit? The lab equipment here uses both systems, so it's always good to have both readings. Make sure you name the variable 'body_temperature_fahrenheit'.",
          hints: [
            "Hint 1: Multiply by 1.8 and add 32",
            "Hint 2: body_temperature_fahrenheit = body_temperature * 1.8 + 32",
          ],
          codeImport: "body_temperature = 37",
          expectedOutput: {
            output: "",
            variables: {
              body_temperature_fahrenheit: "number",
            },
            expectedCode:
              "body_temperature_fahrenheit = body_temperature * 1.8 + 32",
          },
        },
        {
          text:
            "Now that's a proper lab ID! You've handled strings, integers, floats, and Booleans like a pro. Next up, let's visit the storage locker. It's time to learn about lists so we can keep track of items in the lab. Ready? Redirecting you now...",
        },
      ],
    },
    codeTemplate: "# Type your Python code here\n",
  },
  {
    number: 3,
    title: "Lists",
    description:
      "In this level, you'll learn about lists in Python. Lists are a way to store multiple items in one variable, and they allow you to easily add, remove, and access elements.",
    hints: [
      "Lists are defined using square brackets [], e.g., items = ['apple', 'banana']",
      "Use append() to add items to a list, e.g., items.append('pencil')",
      "Use remove() to remove an item, e.g., items.remove('apple')",
      "Access items by their index, e.g., items[0] for the first item",
    ],
    dialogue: {
      steps: [
        {
          text:
            "Welcome to the Storage Locker! In Python, we use lists to keep track of items, just like the compartments here. Each item in a list has its own spot, or index, starting from 0. Let's create a list for the items you see in this locker. Try typing this: `items = ['apple', 'banana', 'cup', 'pen', 'notebook']`.",
          expectedOutput: {
            output: "",
            variables: {
              items: ["apple", "banana", "cup", "pen", "notebook"],
            },
            expectedCode:
              "items = ['apple', 'banana', 'cup', 'pen', 'notebook']",
          },
          hints: [
            "Lists are defined using square brackets []",
            "Separate items in a list with commas",
          ],
        },
        {
          text:
            "Nicely done! Now we have a list with everything in the locker. Lists are powerful because they allow us to add, remove, or access items easily. Speaking of which, let's see how we can add something new to the list. Uh-oh! We forgot something -- a pencil. Use `items.append('pencil')` to add it to the list!",
          expectedOutput: {
            output: "",
            variables: {
              items: ["apple", "banana", "cup", "pen", "notebook", "pencil"],
            },
            expectedCode: "items.append('pencil')",
          },
          hints: [
            "Use the append() method to add new items",
            "The syntax is list.append(item)",
          ],
        },
        {
          text:
            "Brilliant! The list has taken it in without breaking a sweat. Python lists are quite flexible -- they can hold all kinds of things, not just text. In fact, let's push the boundaries a bit. Try adding the number `42` and the boolean `True` to the list. Use `append()` again, just like with the pencil!",
          expectedOutput: {
            output: "",
            variables: {
              items: [
                "apple",
                "banana",
                "cup",
                "pen",
                "notebook",
                "pencil",
                42,
                true,
              ],
            },
            expectedCode: "items.append(42)\nitems.append(True)",
          },
          hints: [
            "Lists can hold different types of data",
            "Use append() for both 42 and True",
          ],
        },
        {
          text:
            "Fantastic! Now we have text, a number, and even a true/false value in one list. Python lists can hold almost anything! But, of course, sometimes we need to clean up a list. Oh no, the apple has gone bad! We can't keep it in the locker. Type `items.remove('apple')` and watch that rotten apple disappear!",
          expectedOutput: {
            output: "",
            variables: {
              items: ["banana", "cup", "pen", "notebook", "pencil", 42, true],
            },
            expectedCode: "items.remove('apple')",
          },
          hints: [
            "Use the remove() method to delete items",
            "The syntax is list.remove(item)",
          ],
        },
        {
          text:
            "Excellent! Removing items is just as easy as adding them. Now, let's talk about how to access specific items in a list. Each item in a list has an index. For example, `items[0]` gives you the first item, and `items[1]` gives you the second item. Why don't you try accessing the *fourth* and *fifth* items on your own? Think about the index numbers!",
          expectedOutput: {
            output: "",
            variables: {
              fourth_item: "pen",
              fifth_item: "notebook",
            },
            expectedCode: "fourth_item = items[3]\nfifth_item = items[4]",
          },
          codeImport: "fourth_item = \nfifth_item = ",
          hints: [
            "Indexing starts from 0",
            "Use list[index] to access specific items",
          ],
        },
        {
          text:
            "Nicely done! Indexing starts from zero, so the fourth item is at `items[3]`. It's a useful way to grab any specific item in a list. Wait... do you hear that? The Hot Gas Chambers are acting up again! The system’s out of sync, and the control panel is flashing red. Quick, let’s head over to the chambers! We need to fix this before the system overloads. Follow me!",
        },
      ],
    },
    codeTemplate: "# Type your Python code here\n",
  },
];
