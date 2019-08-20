import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const rootDir = file => join(process.cwd(), file)
const enframeDir = file =>
  join(join(process.cwd(), 'node_modules/enframe'), file)

let packJson = require(rootDir('package.json'))

const filesToCopy = [
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
  logNextExec(command)
  const stdout = execSync(command, { encoding: 'utf8' })
  console.log(stdout)
}

const logNextExec = commandToExec => {
  console.log(`Enframe is attempting to execute: ${commandToExec}\n`)
}

const logFileAdded = fileName => {
  console.log(`Enframe has added or updated the file: ${fileName}.`)
}

const updatePackJsonScripts = () => {
  delete require.cache[require.resolve(rootDir('package.json'))]
  packJson = require(rootDir('package.json'))

  let packJsonScripts

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

const makeSrc = () => {
  console.log('Enframe is adding the folders: src, src/back, and src/front')
  mkdirSync(rootDir('src/back'), { recursive: true })
  mkdirSync(rootDir('src/front'), { recursive: true })
  // fs.writeFileSync(rootDir('src/back/server.ts', 'i am a server'))
  // fs.writeFileSync(rootDir('src/front/index.html', 'i am html'))
}

const executeScript = () => {
  if (!existsSync(rootDir('.git/'))) {
    const command = 'git init'
    logNextExec(command)
    execSync(command, { encoding: 'utf8' })
  }

  if (!packJson.name) {
    const command = 'yarn init'
    logNextExec(command)
    execSync(command, {
      encoding: 'utf8',
      stdio: 'inherit'
    })
  }

  if (!existsSync(rootDir('src/'))) {
    makeSrc()
  }

  filesToCopy.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logFileAdded(file)
  })

  copyFileSync(enframeDir('gitignore'), rootDir('.gitignore'))
  logFileAdded('.gitignore')

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
