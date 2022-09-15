import path from 'node:path'
import fs from 'node:fs'
import glob from 'glob'
import chalk from 'chalk'
import './global'

/**
 * scan all sml.ts or sml.js files
 * @returns
 */
function scanSmlModules(): Promise<Array<string>> {
  return new Promise((resolve) => {
    glob('./**/*.sml.[t|j]s', { ignore: 'node_modules' }, (err, list) => {
      console.log(err)
      if (err) {
        console.log(chalk.redBright(`${err.message}`))
        resolve([])
        return
      }
      resolve(list)
    })
  })
}

export async function build() {
  const files = await scanSmlModules()
  for (let file of files) {
    console.log(chalk.greenBright(`compile ${file}...`))
    require(file)
  }
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync(`./dist`)
  }
  for (let { ast, emitter } of __emitters__) {
    // write puml code
    fs.writeFileSync(
      path.join('./dist', `${ast.title.replace(/ /g, '_')}.txt`),
      emitter.emitCode(),
    )
  }
}
