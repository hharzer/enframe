import { writeFileSync } from 'fs'
import { rootDir, enframeExec, elog } from './enframe'

namespace Package {
  export enum Key {
    Scripts = 'scripts',
    Dependencies = 'dependencies',
    DevDependencies = 'devDependencies'
  }

  export interface Json {
    [Key.Scripts]?: {
      [key: string]: string
    }
    [Key.Dependencies]?: {
      [key: string]: string
    }
    [Key.DevDependencies]?: {
      [key: string]: string
    }
    [key: string]: object | string | boolean
  }
}

const DEPENDENCIES = [
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

const DEV_DEPENDENCIES = [
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

const addDeps = (packageJson: Package.Json, deps: string[], key: Package.Key) => {
  const packageDeps = Object.keys(packageJson[key] || {})
  const depsToAdd: string[] = packageDeps ? deps.filter(dep => !packageDeps.includes(dep)) : deps

  if (!depsToAdd.length) {
    elog(`${key} are up to date.`)
    return
  }

  const isDev = key == Package.Key.DevDependencies
  const command = `yarn add ${isDev ? '--dev' : ''}${depsToAdd.join(' ')}`
  enframeExec(command)
}

const dependenciesMaker = (packageJson: Package.Json) => {
  addDeps(packageJson, DEPENDENCIES, Package.Key.Dependencies)
  addDeps(packageJson, DEV_DEPENDENCIES, Package.Key.DevDependencies)
}

const scriptsMaker = (oldPackageJson: Package.Json): Package.Json => {
  const scripts = oldPackageJson.scripts ? oldPackageJson.scripts : {}

  scripts['build'] = 'parcel build src/front/index.html'
  scripts['start'] = 'ts-node src/back/server.ts'
  scripts['test'] = 'mocha'
  scripts['cy'] = 'yarn cypress open'
  scripts['watch'] = "onchange 'src/**' -- yarn build && yarn start"

  return { ...oldPackageJson, scripts }
}

export const packageJsonMaker = () => {
  const oldPackageJson = require(rootDir('package.json'))

  dependenciesMaker(oldPackageJson)
  const newPackageJson = scriptsMaker(oldPackageJson)

  writeFileSync(rootDir('package.json'), `${JSON.stringify(newPackageJson, null, 2)}\n`)
}
