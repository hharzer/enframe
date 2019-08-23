import { writeFileSync } from 'fs'
import { rootDir, enframeExec } from './enframe'

const dependenciesMaker = () => {
  const depsToInstall = [
    'typescript',
    'ts-node',
    '@types/node',
    'parcel',
    'express',
    '@types/express',
    'ts-node',
    'react',
    '@types/react',
    'react-dom',
    '@types/react-dom',
    'compression',
    '@types/compression',
    'helmet',
    '@types/helmet'
  ]

  const devDepsToInstall = [
    'prettier',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'mocha',
    '@types/mocha',
    'enzyme',
    '@types/enzyme',
    'chai',
    '@types/chai',
    'enzyme-adapter-react-16',
    '@types/enzyme-adapter-react-16',
    'chai-enzyme',
    '@types/chai-enzyme',
    'cypress',
    'onchange'
  ]

  enframeExec(`yarn add ${depsToInstall.join(' ')}`)
  enframeExec(`yarn add --dev ${devDepsToInstall.join(' ')}`)
}

const scriptMaker = () => {
  const packJson = require(rootDir('package.json'))
  const scripts = packJson.scripts ? packJson.scripts : {}

  scripts['build'] = 'parcel build src/front/index.html'
  scripts['start'] = 'ts-node src/back/server.ts'
  scripts['test'] = 'mocha'
  scripts['cy'] = 'yarn cypress open'
  scripts['watch'] = "onchange 'src/**' -- yarn build && yarn start"

  packJson.scripts = scripts

  writeFileSync(
    rootDir('package.json'),
    `${JSON.stringify(packJson, null, 2)}\n`
  )
}

export const packageJsonMaker = () => {
  dependenciesMaker()
  scriptMaker()
}
