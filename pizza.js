const { program } = require('commander');

program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --type [type]", "flavour of pizza");

program.parse(process.argv);

const options = program.opts();
console.log("options", options);

if (options.debug) {
    // console.log(options);
}

console.log("pizza details:");

if (options.small) {
    console.log("- small pizza size ");
}


if (options.type) {
    console.log(`- flavour of pizza - ${options.type}`);
}

// npm run pi

// nodemon -h pizza.js 
