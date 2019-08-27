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

const addDeps = (deps: string[], key: Package.Key, packageJson) => {
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

const dependenciesMaker = (packageJson: Package.Json) => {
  addDeps(DEPENDENCIES, Package.Key.Dependencies, packageJson)
  addDeps(DEV_DEPENDENCIES, Package.Key.DevDependencies, packageJson)
}

const scriptsMaker = (
  scripts: Package.Json[Package.Key.Scripts]
): Package.Json[Package.Key.Scripts] => {
  const enframeScripts = {
    build: 'parcel build src/front/index.html',
    start: 'ts-node src/back/server.ts',
    test: 'mocha',
    cy: 'yarn cypress open',
    watch: "onchange 'src/**' -- yarn build && yarn start",
    lint: 'eslint --ext .ts,.tsx src/'
  }

  const newScripts = scripts ? { ...scripts, ...enframeScripts } : enframeScripts
  return newScripts
}

const getPackageJson = (): Package.Json => {
  return importFresh(rootDir('package.json')) as Package.Json
}

export const packageJsonMaker = () => {
  dependenciesMaker(getPackageJson())

  const packageJson = getPackageJson()
  const newScripts = packageJson[Package.Key.Scripts]
  packageJson[Package.Key.Scripts] = scriptsMaker(newScripts)

  writeFileSync(rootDir('package.json'), `${JSON.stringify(packageJson, null, 2)}\n`)
}
