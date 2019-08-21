import { writeFileSync } from 'fs'
import { rootDir } from './enframe'

export const packJson = () => {
  const packJson = require(rootDir('package.json'))
  const scripts = packJson.scripts ? packJson.scripts : {}

  scripts['build'] = 'parcel build src/front/index.html'
  scripts['start'] = 'ts-node src/back/server.ts'
  scripts['test'] = 'mocha'
  scripts['cy'] = 'yarn cypress open'

  packJson.scripts = scripts

  writeFileSync(
    rootDir('package.json'),
    `${JSON.stringify(packJson, null, 2)}\n`
  )
}
