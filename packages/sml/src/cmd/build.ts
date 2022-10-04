import './proxy'
import path from 'node:path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { exec } from 'node:child_process'
import { compile } from './compile'

/**
 * build all dist puml
 */
export async function build() {
  // clean dist
  fs.emptyDirSync('./dist')

  // await  compile sml to puml
  await compile('puml')

  // gen uml image
  const plantUmlJar = path.join(__dirname, '../../bin/plantuml-1.2022.8.jar')
  exec(
    `java -Djava.awt.headless=true -jar ${plantUmlJar} ./dist`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.redBright(err.message))
        return
      }
      stdout && console.log(chalk.greenBright(stdout))
      stderr && console.log(chalk.redBright(stderr))
    },
  )
  // output
  const outputs = fs.readdirSync('./dist')
  console.log(chalk.blueBright(`ouput: 👌`))
  console.log(chalk.yellowBright(`${outputs.join('\n')}`))
}
