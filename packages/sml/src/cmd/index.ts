// #!/usr/bin/env node

import { Command } from 'commander'
import { build } from './build'
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

program.parse(process.argv)
