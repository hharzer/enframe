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

const depsToInstall = ['typescript', 'ts-node', '@types/node', 'parcel']

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

const updatePackJsonScripts = () => {
  const packJson = require(rootDir('package.json'))

  let packJsonScripts

  if (!!packJson.scripts) {
    packJsonScripts = packJson.scripts
  } else {
    packJsonScripts = {}
  }

  packJsonScripts['build'] = 'parcel build src/front/index.html'
  packJsonScripts['start'] = 'ts-node src/back/server.ts'

  packJson.scripts = packJsonScripts

  fs.writeFileSync(
    rootDir('package.json'),
    `${JSON.stringify(packJson, null, 2)}\n`
  )
}

const executeScript = () => {
  if (!fs.existsSync(rootDir('package.json'))) {
    child_process.execSync(`yarn init`, {
      encoding: 'utf8',
      stdio: 'inherit'
    })
  }

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

  updatePackJsonScripts()
}

executeScript()
