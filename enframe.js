#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const rootDir = file => path.join(process.cwd(), file)
const enframeDir = file =>
  path.join(path.join(process.cwd(), 'node_modules/enframe'), file)

const filesToCopy = [
  '.gitignore',
  'LICENSE',
  'CODE_OF_CONDUCT.md',
  'tsconfig.json',
  '.prettierrc',
  '.eslintrc.json'
]

const depsToInstall = ['typescript']

const devDepsToInstall = [
  'prettier',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser'
]

const yarnAdd = (isDevDep, dep) => {
  const command = `yarn add ${isDevDep ? '--dev' : ''} ${dep}`
  console.log(`Enframe is attempting to execute: ${command}\n`)
  const stdout = child_process.execSync(command, { encoding: 'utf8' })
  console.log(stdout)
}

const executeScript = () => {
  child_process.execSync(`yarn init`, {
    encoding: 'utf8',
    stdio: 'inherit'
  })

  filesToCopy.forEach(file => {
    fs.copyFileSync(enframeDir(file), rootDir(file))
    console.log(`Enframe has added or updated the file: ${file}.`)
  })

  depsToInstall.forEach(dep => {
    const isDevDep = false
    yarnAdd(isDevDep, dep)
  })

  devDepsToInstall.forEach(devDep => {
    const isDevDep = true
    yarnAdd(isDevDep, devDep)
  })
}

executeScript()
