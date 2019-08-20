import { writeFileSync } from 'fs'
import { rootDir } from './enframe';

export const updatePackJsonScripts = () => {
  delete require.cache[require.resolve(rootDir('package.json'))]
  const packJson = require(rootDir('package.json'))

  let packJsonScripts: object

  if (!!packJson.scripts) {
    packJsonScripts = packJson.scripts
  } else {
    packJsonScripts = {}
  }

  packJsonScripts['build'] = 'parcel build src/front/index.html'
  packJsonScripts['start'] = 'ts-node src/back/server.ts'

  packJson.scripts = packJsonScripts

  writeFileSync(
    rootDir('package.json'),
    `${JSON.stringify(packJson, null, 2)}\n`
  )
}
