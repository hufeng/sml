import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'

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

export function init(dir: string) {
  // write tsconfig.json
  const tsConfigFilePath = path.join(dir, 'tsconfig.json')
  console.log(chalk.greenBright(`write tsconfig file => ${tsConfigFilePath}`))
  fs.writeFileSync(tsConfigFilePath, tsconfig.trim())

  // write index.ts
  const tsFilePath = path.join(dir, 'index.sml.ts')
  console.log(chalk.greenBright(`write ${tsFilePath}`))

  fs.writeFileSync(
    tsFilePath,
    `
sml.UseCaseDiagram('hello use case', ml => {
  ml.Actor('user', 'a1')
  ml.package('System')
    .usecase('login', 'u1')
  ml.link('a1', 'u1')
})
  `.trim(),
  )
}
