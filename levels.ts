export interface DialogueStep {
  text: string; // The dialogue text to be displayed
  expectedOutput?: {
    output: string; // The expected output after executing the code
    variables?: { [key: string]: any }; // Variables can be either defined or just a variable type
  };
  hints?: string[]; // Optional hints to help the user
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
          },
        },
        {
          text:
            "Excellent work! You've made your first print statement in Python! Now lets head back to the lab.",
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
            "Go ahead—try assigning each detail to a variable. Start with something like `name = 'Your Name'`, `age = 25`, and `height = 1.75`. Oh, and don't forget `is_lab_member = True`—we have to keep track of the VIPs around here!",
          expectedOutput: {
            output: "",
            variables: {
              name: "string",
              age: "number",
              height: "number",
              weight: "number",
              is_lab_member: "boolean",
            },
          },
        },
        {
          text:
            "Perfect! Now, just for fun, let’s see how your weight would look in pounds. You can do that by converting it—type `weight_pounds = int(weight * 2.20462)`. Easy, right?",
          expectedOutput: {
            output: "",
            variables: {
              weight_pounds: "number",
            },
          },
        },
        {
          text:
            "And hey, while we’re at it, why not convert your body temperature to Fahrenheit, too? Just a little challenge for you. Think about it: if Celsius goes up by 1 degree, Fahrenheit should go up by a bit more. I’m sure you’ll figure out the formula!",
          hints: [
            "Hint 1: Multiply by 1.8 and add 32",
            "Hint 2: body_temperature_fahrenheit = body_temperature * 1.8 + 32",
          ],
          expectedOutput: {
            output: "",
            variables: {
              body_temperature_fahrenheit: "number",
            },
          },
        },
        {
          text:
            "Now that’s a proper lab ID! You’ve handled strings, integers, floats, and Booleans like a pro. Next up, let’s visit the storage locker. It’s time to learn about lists so we can keep track of items in the lab. Ready?",
        },
      ],
    },
    codeTemplate: "# Type your Python code here\n",
  },
];
