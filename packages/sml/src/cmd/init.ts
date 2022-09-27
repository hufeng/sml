import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import { execSync } from 'node:child_process'

const prettierrc = `
{
  "bracketSpacing": true,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": false,
  "tabWidth": 2,
  "printWidth": 60
}
`
const pkg = `
{
  "name": "sml-app",
  "dependencies": {
    "@hf/sml": "^0.0.1"
  }
}
`

const tsconfig = `
{
   "compilerOptions": {
    "strict": true,
    "target": "es2017",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["sml/lib/typings/global"]
  }
} 
`

const index = `
sml.UsecaseDiagram('hello use case', ml => {
  // actor
  const a = ml.actor('user')
  
  // domain
  const z = ml.zone('System')
  const u = ml.usecase('login').belongTo(z)

  // link
  a.link(z)
})
`

export function init(dir: string) {
  // // write package.json
  const pkgFile = path.join(dir, 'package.json')
  console.log(chalk.greenBright(`write ${pkgFile}`))
  fs.writeFileSync(pkgFile, pkg.trim())

  // write prettierrc
  const prettierFile = path.join(dir, '.prettierrc')
  console.log(chalk.greenBright(`write ${prettierFile}`))
  fs.writeFileSync(prettierFile, prettierrc.trim())

  // write tsconfig.json
  const tsConfigFilePath = path.join(dir, 'tsconfig.json')
  console.log(chalk.greenBright(`write tsconfig file => ${tsConfigFilePath}`))
  fs.writeFileSync(tsConfigFilePath, tsconfig.trim())

  // write index.ts
  const tsFilePath = path.join(dir, 'index.sml.ts')
  console.log(chalk.greenBright(`write ${tsFilePath}`))
  fs.writeFileSync(tsFilePath, index.trim())

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
