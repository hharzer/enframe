import { enframeExec } from './enframe'

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
  'cypress'
]

export const dependencies = () => {
  enframeExec(`yarn add ${depsToInstall.join(' ')}`)
  enframeExec(`yarn add --dev ${devDepsToInstall.join(' ')}`)
}
