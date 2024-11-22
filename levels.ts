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
            "Excellent work! You've made your first print statement in Python! Now lets go back to the lab.DONE_BUTTON",
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
            "Now that's a proper lab ID! You've handled strings, integers, floats, and Booleans like a pro. Next up, let's visit the storage locker. It's time to learn about lists so we can keep track of items in the lab. Ready?DONE_BUTTON",
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
      "Lists are defined using square brackets [], e.g., items = ['banana', 'cup']",
      "Use append() to add items to a list, e.g., items.append('pencil')",
      "Use remove() to remove an item, e.g., items.remove('banana')",
      "Access items by their index, e.g., items[0] for the first item",
    ],
    dialogue: {
      steps: [
        {
          text:
            "Welcome to the Storage Locker! In Python, we use lists to keep track of items, just like the compartments here. Each item in a list has its own spot, or index, starting from 0. Let's create a list for the items you see in this locker. Try typing this: `items = ['banana', 'cup', 'pen', 'notebook']`.",
          expectedOutput: {
            output: "",
            variables: {
              items: ["banana", "cup", "pen", "notebook"],
            },
            expectedCode: "items = ['banana', 'cup', 'pen', 'notebook']",
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
              items: ["banana", "cup", "pen", "notebook", "pencil"],
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
              items: ["banana", "cup", "pen", "notebook", "pencil", 42, true],
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
            "Fantastic! Now we have text, a number, and even a true/false value in one list. Python lists can hold almost anything! But, of course, sometimes we need to clean up a list. Oh no, the banana has gone bad! We can't keep it in the locker. Type `items.remove('banana')` and watch that brown banana disappear!",
          expectedOutput: {
            output: "",
            variables: {
              items: ["cup", "pen", "notebook", "pencil", 42, true],
            },
            expectedCode: "items.remove('banana')",
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
              fourth_item: "pencil",
              fifth_item: 42,
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
            "Nicely done! Indexing starts from zero, so the fourth item is at `items[3]`. It's a useful way to grab any specific item in a list. Wait... do you hear that? The Hot Gas Chambers are acting up again! The system's out of sync, and the control panel is flashing red. Quick, let's head over to the chambers! We need to fix this before the system overloads.DONE_BUTTON",
        },
      ],
    },
    codeTemplate: "# Type your Python code here\n",
  },
  {
    number: 4,
    title: "Pressure Calibration",
    description: "", // FIX
    hints: [], // FIX
    dialogue: {
      steps: [
        {
          text:
            "The Hot Gas Chambers are out of sync! One chamber is at 200°C, and the other is at 300°C. To stabilize them, we need to calculate the average temperature of both chambers and assign it to `target_temperature`.\nWhich is to say, we need to add the temperatures of the left and right chambers together and then divide the result by 2. This will give us the balanced target temperature. Let’s do it! Remember, Python uses `/` for division, and don't forget to use parentheses to ensure the correct order of operations.",
          expectedOutput: {
            output: "",
            variables: {
              target_temperature: 250,
              last_log: "Adjusted chambers to",
            },
            expectedCode:
              "target_temperature = (temperature_left + temperature_right) / 2",
          },
          hints: [
            "Use parentheses to ensure correct order of operations",
            "Remember to use the `/` operator for division",
          ],
        },
        {
          text:
            "The temperatures have been sycned! Now the operation log is incomplete—it says nothing useful. Let’s update it to say what we just did! Start by adding 'Adjusted chambers to 250C' to `last_log`. Use string concatenation to do this.",
          expectedOutput: {
            output: "",
            variables: {
              last_log: "Adjusted chambers to 250C",
            },
            expectedCode: "last_log = last_log + '250C'",
          },
          hints: [
            "Use the `+` operator to concatenate strings",
            "Ensure proper spacing and punctuation in the log message",
          ],
        },
        {
          text:
            'Great job ! Instead of writing `x = x + y` again, let’s use the shorthand `+=`. Add a period (".") to `last_log` using this shortcut.',
          expectedOutput: {
            output: "",
            variables: {
              last_log: "Adjusted chambers to 250C.",
            },
            expectedCode: "last_log += '.'",
          },
          codeImport: "last_log",
          hints: [
            "The `+=` operator is a shorthand for appending or adding",
            "Use quotes to add a string character",
          ],
        },
        {
          text:
            "The pressure gauge needs recalibration. We’ll calculate a new pressure value based on the temperature and humidity using this formula:\n`calibrated_pressure = (temperature_left + humidity * 2) / 5 - 2`\nThis involves addition, multiplication, division, and subtraction. Let’s calculate the pressure.",
          expectedOutput: {
            output: "",
            variables: {
              calibrated_pressure: 80,
            },
            expectedCode:
              "calibrated_pressure = (temperature_left + humidity * 2) / 5 - 2",
          },
          codeImport: "humidity = 105\ncalibrated_pressure = ",
          hints: [
            "Follow the order of operations: parentheses, multiplication, division, addition, subtraction",
            "Use parentheses to ensure calculations are performed correctly",
          ],
        },
        {
          text:
            "We need to verify if the `calibrated_pressure` is divisible by 3. Use the modulo operator to find the remainder when `calibrated_pressure` is divided by 3.",
          expectedOutput: {
            output: "",
            variables: {
              remainder: 2,
            },
            expectedCode: "remainder = calibrated_pressure % 3",
          },
          codeImport: "remainder = ",
          hints: [
            "The `%` operator returns the remainder of a division",
            "Check if `calibrated_pressure` modulo 3 equals 0",
          ],
        },
        {
          text:
            "Subtract the remainder from `calibrated_pressure` to make it divisible by 3. Use the `-=` operator for this adjustment.",
          expectedOutput: {
            output: "",
            variables: {
              calibrated_pressure: 78,
            },
            expectedCode: "calibrated_pressure -= remainder",
          },
          hints: [
            "The `-=` operator subtracts the value from the variable and assigns it back",
            "Ensure the new `calibrated_pressure` is divisible by 3",
          ],
        },
        {
          text:
            "The Left Chamber seems stable, but let’s calculate some properties to ensure it complies with safety regulations. Since it’s a cube, we’ll calculate the area of one side and the total volume. I remember that the volume must stay between 900 and 1200 units³ to comply with safety regulations.\nThe side length of the Left Chamber is 10 units. The formulas are simple:\n- *One Side’s Surface Area:* `side_length ** 2`\n- *Volume of a cube:* `side_length ** 3`\nLet’s use exponentiation (`**`) to perform these calculations.",
          expectedOutput: {
            output: "",
            variables: {
              side_length: 10,
              side_area: 100,
              volume: 1000,
            },
            expectedCode:
              "side_area = side_length ** 2\nvolume = side_length ** 3",
          },
          codeImport: "\nside_length = 10\nside_area = \nvolume = ",
          hints: [
            "Use `**` for exponentiation in Python",
            "Calculate surface area and volume separately",
          ],
        },
        {
          text:
            "Let’s notify maintenance that the system is fixed. To make sure they notice, let’s repeat the message three times! Use the `*` operator to repeat the string.",
          expectedOutput: {
            output: "",
            variables: {
              message: "System fixed! System fixed! System fixed! ",
            },
            expectedCode: 'message = "System fixed! " * 3',
          },
          codeImport: 'message = "System fixed! "',
          hints: [
            "The `*` operator can be used to repeat strings",
            "Ensure the string is enclosed in quotes",
          ],
        },
        {
          text:
            "We’ve been keeping a list of recent operations in `session_logs`. Let’s merge this into the master log, `all_logs`, to maintain a full record of everything we’ve done. Use `+=` to combine the lists. Don't forget to set `session_logs` back to an empty list after merging.",
          expectedOutput: {
            output: "",
            variables: {
              all_logs: [
                "System Initialized",
                "Temperature Adjusted",
                "Humidity Set",
                "Unbalanced Chambers Detected",
                "Adjusted chambers to 250C.",
                "Pressure calibrated successfully.",
              ],
              session_logs: [],
            },
            expectedCode: "all_logs += session_logs\nsession_logs = []",
          },
          codeImport:
            'all_logs = []\nsession_logs = ["System Initialized", "Temperature Adjusted", "Humidity Set", "Unbalanced Chambers Detected","Adjusted chambers to 250C.", "Pressure calibrated successfully."]\nall_logs',
          hints: [
            "Use `+=` to concatenate lists",
            "Reset `session_logs` after merging to keep it empty",
          ],
        },
        {
          text:
            "Before we finish, let’s create a repeating pattern of operations for system testing. Create a list with two operations—`'temp_adjust'` and `'pressure_adjust'`—and repeat it three times.",
          expectedOutput: {
            output: "",
            variables: {
              test_pattern: [
                "temp_adjust",
                "pressure_adjust",
                "temp_adjust",
                "pressure_adjust",
                "temp_adjust",
                "pressure_adjust",
              ],
            },
            expectedCode:
              'test_pattern = ["temp_adjust", "pressure_adjust"] * 3',
          },
          codeImport: 'test_pattern = ["temp_adjust", "pressure_adjust"]',
          hints: [
            "Use the `*` operator to repeat lists",
            "Ensure the list items are correctly quoted",
          ],
        },
        {
          text:
            "Amazing work! You’ve balanced temperatures, calibrated pressures, logged operations, and even created repeating sequences. You’ve mastered Python’s basic operations! Next up, we’ll make the system smarter with conditional logic.DONE_BUTTON",
          expectedOutput: {
            output: "",
            variables: {},
            expectedCode: "",
          },
          hints: [],
        },
      ],
    },
    codeTemplate:
      'temperature_left = 200\ntemperature_right = 300\ntarget_temperature = \nlast_log = "Adjusted chambers to"',
  },
  ,
];
