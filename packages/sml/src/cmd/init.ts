import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import { execSync } from 'node:child_process'

const pkg = `
{
  "name": "sml-diagram",
  devDependencies: {
    "ts-node": "^10.9.1",
   "typescript": "^4.8.3"
  }
}
`

const tsconfig = `
{
   "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",

    "strict": true,

    "skipLibCheck": true,
    "skipDefaultLibCheck": true,

    "types": ["sml/globals"]
  }
} 
`

const index = `
sml.UseCaseDiagram('hello use case', ml => {
  ml.Actor('user', 'a1')
  ml.package('System')
    .usecase('login', 'u1')
  ml.link('a1', 'u1')
})
`

const smlConfig = `
{
  "file.suffix": /\.sml.[t|j]s/
}
`

export function init(dir: string) {
  // write package.json
  const pkgFile = path.join(dir, 'package.json')
  console.log(chalk.greenBright(`write ${pkgFile}`))
  fs.writeFileSync(pkgFile, pkg.trim())

  // write tsconfig.json
  const tsConfigFilePath = path.join(dir, 'tsconfig.json')
  console.log(chalk.greenBright(`write tsconfig file => ${tsConfigFilePath}`))
  fs.writeFileSync(tsConfigFilePath, tsconfig.trim())

  // write index.ts
  const tsFilePath = path.join(dir, 'index.sml.ts')
  console.log(chalk.greenBright(`write ${tsFilePath}`))
  fs.writeFileSync(tsFilePath, index.trim())

  // write sml.config.js
  const configFile = path.join(dir, '.sml.json')
  console.log(chalk.greenBright(`write ${configFile}`))
  fs.writeFileSync(configFile, smlConfig.trim())

  try {
    execSync(`pnpm i`)
    console.log(chalk.greenBright(`pnpm install dependencies...`))
  } catch (err) {}

  try {
    execSync(`yarn`)
    console.log(chalk.greenBright(`yarn install dependencies...`))
  } catch (err) {}

  try {
    execSync(`npm i`)
    console.log(chalk.greenBright(`npm install dependencies...`))
  } catch (err) {}
}
