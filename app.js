const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const uinput = require("./lib/processUserInput");
const genHTML = require("./lib/generateHTML");
const fs = require("fs");


async function init() {
  input = new uinput.UserInput();
  await input.requestInput();

  let team = [];
  for (record of input.allAnswers) {
    let employee = {};
    if (record.type === 'Manager') {
      employee = new Manager(record.name, record.id, record.email, record.addParam);
    }
    if (record.type === 'Engineer') {
      employee = new Engineer(record.name, record.id, record.email, record.addParam);
    }
    if (record.type === 'Intern') {
      employee = new Intern(record.name, record.id, record.email, record.addParam);
    }
    team.push(employee);
  }
  let teamPage = new genHTML.TeamPage(team);
  let html = teamPage.generate();

  fs.writeFile("./output/MyTeam.html", html, (err) => {
    if (err) throw err;
    else console.log("HTML file generated successfully");
  });

}

init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
