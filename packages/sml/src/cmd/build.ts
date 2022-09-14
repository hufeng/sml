import { readFileSync } from 'fs'

function bundler() {
  // scan files
  // wrap file
  const wrapFile = (file: string) => {
    const content = readFileSync(file)
    return `
    import globalCollections from 'sml/lang'

    ${content}

    for (let [_, v] of [...globalCollections] ) {
    
    }
    `
  }
}

function build() {
  let config = {
    'suffix.file': /\.sml.[t|j]s/,
  }

  try {
    const json = require('.sml.json')
    config = { ...config, ...json }
  } catch (err) {
    console.log(`no .sml.json file`)
  }

  // emit plantuml code

  // gen images
}
