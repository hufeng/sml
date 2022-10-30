import path from 'node:path'
import axios from 'axios'
import fs from 'fs-extra'

// download
export async function downloadPlantUmlJar() {
  console.log(
    `downloading https://ghproxy.com/https://github.com/plantuml/plantuml/releases/download/v1.2022.8/plantuml-1.2022.8.jar`,
  )
  const response = await axios.get(
    'https://ghproxy.com/https://github.com/plantuml/plantuml/releases/download/v1.2022.8/plantuml-1.2022.8.jar',
    {
      responseType: 'arraybuffer', // Important
      headers: {
        'Content-Type': 'application/jar',
      },
    },
  )

  // save
  const dir = path.join(__dirname, '../../bin')
  fs.ensureDir(dir)
  fs.writeFileSync(path.join(dir, 'plantuml-1.2022.8.jar'), response.data, {
    encoding: 'binary',
  })
}
