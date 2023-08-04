import readline from 'node:readline';
import fs from 'node:fs';
import { program } from 'commander';
import 'colors';

program.option(
  '-f, --file [name]',
  'file for saving game results',
  'results.txt'
);

program.parse(process.argv);

const consoleManager = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = value => {
  if (isNaN(value)) {
    console.log('Enter number :)'.red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log(
      'Number needs to be in range between 1 and 10'.red
    );
    return false;
  }
  return true;
};

const log = data => {
  try {
    fs.appendFileSync(logFile, `${data}\n`);
    console.log(`Save to file successful ${logFile}`.green);
  } catch (err) {
    console.log(
      `Save to file was not successful ${logFile}`.red
    );
  }
};

const game = () => {
  consoleManager.question(
    'Enter number between 1 and 10 to start: '.blue,
    value => {
      value = Number.parseInt(value, 10);
      if (!isValid(value)) {
        game();
        return;
      }
      count += 1;
      if (value === mind) {
        console.log(
          'Congratulations! You have found the correct number after %d trials. Good work!'
            .green,
          count
        );
        log(
          `${new Date().toLocaleDateString()}: Congratulations. You have found the correct number after ${count} trials`
        );
        consoleManager.close();
        return;
      }
      console.log('Wrong number. Try again!'.red);
      game();
    }
  );
};

consoleManager.question(
  "Hello, what's your name?\n > ",
  answer => {
    consoleManager.pause();
    consoleManager.write(
      `Nice to meet you, ${answer}!\nLet's play a game!\n`
    );
    game();
  }
);

// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// reader.on('line', input => {
//   console.log(`Received: [${input}]\n`);
// });
