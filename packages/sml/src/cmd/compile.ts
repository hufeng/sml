import path from 'node:path'
import glob from 'glob'
import chalk from 'chalk'
import fs from 'fs-extra'
import chokidar from 'chokidar'

const cwd = process.cwd()

/**
 * scan all sml.ts or sml.js files
 * @returns
 */
export function scanSmlModules(): Promise<Array<string>> {
  return new Promise((resolve) => {
    glob('./**/*.sml.[t|j]s', { ignore: 'node_modules' }, (err, list) => {
      if (err) {
        console.log(chalk.redBright(`${err.message}`))
        resolve([])
        return
      }
      resolve(list)
    })
  })
}

export async function compile() {
  const files = await scanSmlModules()
  console.log(chalk.greenBright(`compiler puml: 🛫️`))

  globalThis.__emitters__ = []

  for (let file of files) {
    console.log(chalk.greenBright(`${file}...`))
    require(path.join(cwd, file))
  }

  // create dist dir if need
  const dist = path.join(cwd, './dist')
  fs.ensureDirSync(dist)

  // build plant uml dsl code
  for (let { ast, emitter } of __emitters__) {
    // write puml code
    fs.writeFileSync(
      path.join('./dist', `${ast.title.replace(/ /g, '_')}.puml`),
      emitter.emitCode(),
    )
  }

  globalThis.__emitters__ = []

  console.log()
}

/**
 * compile single file
 */
export function compileFile(file: string) {
  // remove cache,let module reload
  const full = path.join(cwd, file)
  console.log(chalk.greenBright(`compiler puml: ${file} 🛫️`))
  delete require.cache[full]

  globalThis.__emitters__ = []
  require(full)

  // create dist dir if need
  const dist = path.join(cwd, './dist')
  fs.ensureDirSync(dist)

  // build plant uml dsl code
  for (let { ast, emitter } of globalThis.__emitters__) {
    // write puml code
    fs.writeFileSync(
      path.join('./dist', `${ast.title.replace(/ /g, '_')}.puml`),
      emitter.emitCode(),
    )
  }

  globalThis.__emitters__ = []

  console.log()
}

export async function watchCompile() {
  // watch mode
  console.log(chalk.greenBright(`compile watch mode...`))
  const watcher = chokidar.watch('**/*.sml.[jt]s', {
    ignored: /node_modules|dist/,
  })

  watcher
    .on('add', (path) => {
      console.log(chalk.greenBright(`File ${path} has been added`))
      compileFile(path)
    })
    .on('change', (path) => {
      console.log(chalk.yellowBright(`File ${path} has been changed`))
      compileFile(path)
    })
    .on('unlink', (path) => {
      console.log(chalk.redBright(`File ${path} has been removed`))
    })
}
