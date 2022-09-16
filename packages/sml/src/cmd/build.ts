import './proxy'
import path from 'node:path'
import fs from 'node:fs'
import glob from 'glob'
import chalk from 'chalk'
import { exec } from 'node:child_process'

/**
 * scan all sml.ts or sml.js files
 * @returns
 */
function scanSmlModules(): Promise<Array<string>> {
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

export async function build() {
  const files = await scanSmlModules()
  console.log(chalk.greenBright(`compile: 🛫️`))
  for (let file of files) {
    console.log(chalk.greenBright(`${file}...`))
    require(file)
  }

  // create dist dir if need
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync(`./dist`)
  }

  // build plant uml dsl code
  for (let { ast, emitter } of __emitters__) {
    // write puml code
    fs.writeFileSync(
      path.join('./dist', `${ast.title.replace(/ /g, '_')}.txt`),
      emitter.emitCode(),
    )
  }

  console.log()

  // gen uml image
  const plantUmlJar = path.join(__dirname, '../../bin/plantuml-1.2022.7.jar')
  exec(`java -jar ${plantUmlJar} ./dist`, (err, stdout, stderr) => {
    if (err) {
      console.log(chalk.redBright(err.message))
      return
    }
    console.log(chalk.greenBright(stdout))
    console.log(chalk.redBright(stderr))
  })
  const outputs = fs.readdirSync('./dist')
  console.log(chalk.blueBright(`ouput: 👌`))
  console.log(chalk.yellowBright(`${outputs.join('\n')}`))
}
