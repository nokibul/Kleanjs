#!/usr/bin/env node
const helloCommand = require("./hello.command");

helloCommand
    .option("s", {alias:"sentence", describe: "Sentence to be translated", type: "string", demandOption: false })
    .help(true)
    .argv
