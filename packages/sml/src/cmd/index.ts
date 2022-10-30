#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import { build } from './build'
import { compile, watchCompile } from './compile'
import { init } from './init'

// run typescript directly
const { register } = require('esbuild-register/dist/node')
register()

const program = new Command()

program
  .version('1.0.0')
  .description('a simple DSL modeling lang to target plantuml ♥️')

// init project
program
  .command('init [path]')
  .description('init sml scaffold project')
  .action(async (path = '.') => {
    init(path)
  })

// build project
program
  .command('build')
  .description('compile sml code gen')
  .action(async () => {
    await build()
  })

// compile project
program
  .command('compile')
  .description('emit sml to puml')
  .option('-w, --watch', 'watch mode')
  .option('-o, --output [type]', 'output markdown or puml', 'puml')
  .action(async (options) => {
    // validate check
    const { output, watch } = options
    if (!['puml', 'md'].includes(output)) {
      console.error(chalk.redBright(`smlc output only support 'puml' and 'md'`))
      return
    }

    // compile
    watch ? await watchCompile(output) : await compile(output)
  })

program.parse(process.argv)
