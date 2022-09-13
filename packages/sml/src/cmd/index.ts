#!/usr/bin/env node

import { Command } from 'commander'
import { init } from './init'

const program = new Command()

program
  .version('1.0.0')
  .description('a simple DSL modeling lang to target plantuml ♥️')

program
  .command('init [path]')
  .description('init sml scaffold project')
  .action(async (path = '.') => {
    init(path)
  })

program
  .command('build')
  .description('compile sml code gen')
  .action(() => {})

program.parse(process.argv)
