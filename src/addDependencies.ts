import { enframeExec } from './enframe';

const depsToInstall = ['typescript', 'ts-node', '@types/node', 'parcel']

const devDepsToInstall = [
  'prettier',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser'
]

const yarnAdd = (isDevDep: boolean, dep: string) => {
  enframeExec(`yarn add ${isDevDep ? '--dev' : ''} ${dep}`)
}

export const addDependencies = () => {
  depsToInstall.forEach(dep => {
    const isDevDep = false
    yarnAdd(isDevDep, dep)
  })

  devDepsToInstall.forEach(devDep => {
    const isDevDep = true
    yarnAdd(isDevDep, devDep)
  })
}