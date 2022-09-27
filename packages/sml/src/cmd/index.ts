#!/usr/bin/env node

import chalk from 'chalk'
import chokidar from 'chokidar'
import { Command } from 'commander'
import { build } from './build'
import { compile } from './compile'
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
  .action(async (options) => {
    if (!options.watch) {
      // compile mode
      await compile()
      return
    }

    // watch mode
    console.log(chalk.greenBright(`compile watch mode...`))
    const watcher = chokidar.watch('**/*.sml.[jt]s', {
      ignored: /node_modules|dist/,
    })
    watcher.on('all', async (path, stats) => {
      console.log(chalk.yellowBright(`watch ${path} => ${stats}`))
      await compile()
    })
  })

program.parse(process.argv)
