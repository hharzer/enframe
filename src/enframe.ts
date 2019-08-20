import { mkdirSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { copyFiles } from './copyFiles'
import { addDependencies } from './addDependencies'
import { updatePackJsonScripts } from './updatePackJsonScripts'
import { join } from 'path'

export const enframeDir = (file: string) =>
  join(join(process.cwd(), 'node_modules/enframe'), file)

export const rootDir = (file: string) => join(process.cwd(), file)

let packJson = require(rootDir('package.json'))

export const enframeExec = (command: string, stdioInherit?: boolean) => {
  console.log(`Enframe is attempting to execute: ${command}\n`)
  const execOptions = { encoding: 'utf8' }
  if (stdioInherit) execOptions['stdio'] = 'inherit'
  const stdout = execSync(command, execOptions)
  if (stdout) console.log(stdout)
}

const makeSrc = () => {
  console.log('Enframe is adding the folders: src, src/back, and src/front')
  mkdirSync(rootDir('src/back'), { recursive: true })
  mkdirSync(rootDir('src/front'), { recursive: true })
  // fs.writeFileSync(rootDir('src/back/server.ts', 'i am a server'))
  // fs.writeFileSync(rootDir('src/front/index.html', 'i am html'))
}

const gitInitIfNeeded = () => {
  if (!existsSync(rootDir('.git/'))) {
    enframeExec('git init')
  }
}

const yarnInitIfNeeded = () => {
  if (!packJson.name) {
    enframeExec('yarn init', true)
  }
}

const createSrcIfNeeded = () => {
  if (!existsSync(rootDir('src/'))) {
    makeSrc()
  }
}

const executeScript = () => {
  gitInitIfNeeded()
  yarnInitIfNeeded()
  createSrcIfNeeded()

  copyFiles()
  addDependencies()
  updatePackJsonScripts()
}

executeScript()
