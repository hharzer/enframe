import { writeFileSync } from 'fs'
import { rootDir, enframeExec, elog } from './enframe'
import importFresh from 'import-fresh'

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
  '@types/helmet',
  'redux-starter-kit',
  'react-redux',
  '@types/react-redux',
  'pg',
  '@types/pg'
]

const DEV_DEPENDENCIES = [
  'prettier',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'eslint-plugin-react',
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
  'nodemon'
]

const dependenciesMaker = (packageJson: Package.Json) => {
  const addDeps = (deps: string[], key: Package.Key, packageJson: Package.Json) => {
    const packageDeps = Object.keys(packageJson[key] || {})
    const depsToAdd: string[] = packageDeps
      ? deps.filter(dep => !packageDeps.includes(dep))
      : deps

    if (!depsToAdd.length) {
      elog(`${key} are up to date.`)
      return
    }

    const isDev = key == Package.Key.DevDependencies
    const command = `yarn add ${isDev ? '--dev ' : ''}${depsToAdd.join(' ')}`
    enframeExec(command)
  }

  addDeps(DEPENDENCIES, Package.Key.Dependencies, packageJson)
  addDeps(DEV_DEPENDENCIES, Package.Key.DevDependencies, packageJson)
}

const SCRIPTS = {
  build: 'parcel build src/front/index.html',
  start: 'ts-node src/back/server.ts',
  test: 'mocha',
  cy: 'yarn cypress open',
  'watch-front': 'parcel src/front/index.html',
  'watch-back': 'nodemon',
  lint: 'eslint --ext .ts,.tsx ./'
}

type ScriptsKey = Package.Json[Package.Key.Scripts]
const scriptsMaker = (scripts: ScriptsKey): ScriptsKey => {
  const newScripts = scripts ? { ...scripts, ...SCRIPTS } : SCRIPTS
  return newScripts
}

export const packageJsonMaker = () => {
  const getPackageJson = () => importFresh(rootDir('package.json')) as Package.Json
  let packageJson: Package.Json = getPackageJson()
  dependenciesMaker(getPackageJson())

  packageJson = getPackageJson()
  const newScripts = packageJson[Package.Key.Scripts]
  packageJson[Package.Key.Scripts] = scriptsMaker(newScripts)

  writeFileSync(rootDir('package.json'), `${JSON.stringify(packageJson, null, 2)}\n`)
}
