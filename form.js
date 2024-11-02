// form.js

// Import the Inquirer.js library
import inquirer from "inquirer";
import { isStringLiteralLike } from "typescript";

/**
 * Define mock user credentials for login
 * Replace 'mockUsername' and 'mockPassword' with desired mock values
 */
const MOCK_USERNAME = "Pegent";
const MOCK_PASSWORD = "Pornnapat";

/**
 * Function to handle user login
 * - Prompt the user to enter their username
 * - Prompt the user to enter their password (mask the input)
 * - Validate that both username and password are not empty
 * - Check if entered credentials match the mock credentials
 * - Return true if authentication is successful, otherwise false
 */
async function login() {
  // Display a welcome message to the user

  try {
    // Use inquirer.prompt to ask for username and password
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your username:",
        validate: (input) => {
          if (input.length === 0) {
            return "Username cannot be empty";
          }
          return true;
        },
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
        mask: true,
        validate: (input) => {
          if (input.length === 0) {
            return "Password cannot be empty";
          }
          return true;
        },
      },
    ]);

    if (
      answers.username === MOCK_USERNAME &&
      answers.password === MOCK_PASSWORD
    ) {
      return true;
    } else {
      return false;
    }

    // Example questions:
    // 1. Username (input type with validation and filter)
    // 2. Password (password type with validation)
    // Capture the user's input
    // Validate the entered credentials against the mock credentials
    // If credentials match, inform the user of successful login and return true
    // If credentials do not match, inform the user and return false
  } catch (error) {
    // Handle any errors that occur during the login process
    handleError(error);
    return false;
  }
}

/**
 * Function to display the form after successful login
 * - Present a 4-question form to the user
 * - Utilize different prompt types: input, list, rawList, confirm
 * - Implement at least two validate and filter methods
 * - Display the user's responses after form submission
 */
async function displayForm() {
  try {
    // Display a message indicating that the form is starting

    const answers = inquirer.prompt([
      {
        type: "input",
        name: "fullName",
        message: "Enter your full name:",
        validate: (input) => {
            input = input.trim().split(" ")
          if (input === "" && input.length >= 2) {
            return false;
          }
          return true;
        },
        filter: (input) => {
          input.toUpperCase();
        },
      },
      {
        type: "list",
        name: "listOfProgrammingLanguages",
        message: "Choose all programming languages you use:",
        choices: ["Python", "Javascript", "Java", "C"],
      },
      {
        type: "rawList",
        name: "experienceLevel",
        message: "Enter your experience level in coding:",
        choices: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        type: "confirm",
        name: "subscribeNewsletter",
        message: "Do you want to subscribe to Newsletter:",
        default: true,
      },
    ]);

    console.log();
    // Use inquirer.prompt to ask the following questions:
    // 1. Full Name
    //    - Type: input
    //    - Validate: Ensure the input is not empty and contains at least two words
    //    - Filter: Capitalize each word in the name
    //
    // 2. Preferred Programming Language
    //    - Type: list
    //    - Choices: Provide a list of programming languages
    //
    // 3. Experience Level
    //    - Type: rawList
    //    - Choices: Provide options like Beginner, Intermediate, Advanced
    //
    // 4. Subscribe to Newsletter
    //    - Type: confirm
    //    - Default: false
    // Capture the user's responses
    // Display the collected responses in a formatted manner
  } catch (error) {
    // Handle any errors that occur during the form process
    handleError(error);
  }
}

/**
 * Error handling function
 * - Determines if the error is a TTY error (prompt couldn't be rendered)
 * - Logs appropriate error messages based on the error type
 * @param {Error} error - The error object caught during prompts
 */
function handleError(error) {
  if (error.isTtyError) {
    console.error("Prompt couldn't be rendered in the current environment.");
  } else {
    console.error("An error occurred:", error);
  }
}

/**
 * Main function to orchestrate the login and form submission
 * - Allows the user up to 3 attempts to login successfully
 * - If authenticated, proceeds to display the form
 * - Exits the application if maximum login attempts are exceeded
 */
async function main() {
  let isAuthenticated = false;
  login();
  // Implement a loop that runs up to 3 times for login attempts
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (await login()) {
      isAuthenticated = true;
      console.log("Login Successful");
      break
    } else {
      console.log("Login Failed");
    }
  }

  if (isAuthenticated) {
    displayForm();
  }
  // If authenticated, call the displayForm function
}

/**
 * Execute the main function to start the application
 */
main();
