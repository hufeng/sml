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

export async function compile(output: 'puml' | 'md') {
  const files = await scanSmlModules()
  console.log(chalk.greenBright(`compiler puml: 🛫️`))

  // create dist dir if need
  const dist = path.join(cwd, './dist')
  fs.ensureDirSync(dist)

  globalThis.__emitters__ = []

  for (let file of files) {
    compileFile(file, output)
  }

  console.log()
}

/**
 * compile single file
 */
export function compileFile(file: string, output: 'puml' | 'md') {
  const full = path.join(cwd, file)
  console.log(chalk.greenBright(`compiler ${output}: ${file} 🛫️`))

  // remove cache,let module reload
  require.cache[full] && delete require.cache[full]
  // require file
  globalThis.__emitters__ = []
  require(full)

  // create dist dir if need
  const dist = path.join(cwd, './dist')
  fs.ensureDirSync(dist)
  const filename = file.replace(/\.sml.[tj]s$/, '')

  for (let { ast, emitter } of __emitters__) {
    const outputFileName =
      filename + '-' + ast.title.replace(/ /g, '-') + `.${output}`
    fs.writeFileSync(
      path.join(dist, outputFileName),
      output === 'puml' ? emitter.emitPuml() : emitter.emitMarkdown(),
    )
  }

  // clear
  globalThis.__emitters__ = []

  console.log()
}

export async function watchCompile(output: 'puml' | 'md') {
  // watch mode
  console.log(chalk.greenBright(`compile watch mode...`))
  const watcher = chokidar.watch('**/*.sml.[jt]s', {
    ignored: /node_modules|dist/,
  })

  watcher
    .on('add', (path) => {
      console.log(chalk.greenBright(`File ${path} has been added`))
      compileFile(path, output)
    })
    .on('change', (path) => {
      console.log(chalk.yellowBright(`File ${path} has been changed`))
      compileFile(path, output)
    })
    .on('unlink', (path) => {
      console.log(chalk.redBright(`File ${path} has been removed`))
    })
}
