import path from 'node:path'
import glob from 'glob'
import chalk from 'chalk'
import fs from 'fs-extra'

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

  console.log()
}
