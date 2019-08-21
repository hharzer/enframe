import { mkdirSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { copyFiles } from './copyFiles'
import { addDependencies } from './addDependencies'
import { updatePackJsonScripts } from './updatePackJsonScripts'
import { join } from 'path'

const enframePath = join(process.cwd(), 'node_modules/enframe')
export const enframeDir = (file: string) => join(enframePath, file)
export const rootDir = (file: string) => join(process.cwd(), file)

let packJson = require(rootDir('package.json'))

export const logAdd = (name: string) => {
  console.log(`Enframe has added or updated ${name}.`)
}

export const enframeExec = (command: string, stdioInherit?: boolean) => {
  console.log(`Enframe is attempting to execute: ${command}\n`)
  const execOptions = { encoding: 'utf8' }
  if (stdioInherit) execOptions['stdio'] = 'inherit'
  const stdout = execSync(command, execOptions)
  if (stdout) console.log(stdout)
}

const makeSrc = () => {
  ['src/back', 'src/front'].forEach(dir => {
    mkdirSync(rootDir(dir), { recursive: true })
    logAdd(dir)
  })

  // fs.writeFileSync(rootDir('src/back/server.ts', 'i am a server'))
  // fs.writeFileSync(rootDir('src/front/index.html', 'i am html'))
}

const isGitInit = existsSync(rootDir('.git/'))
const isYarnInit = packJson.name
const isSrc = existsSync(rootDir('src/'))
const executeScript = () => {
  if (!isGitInit) enframeExec('git init')
  if (!isYarnInit) enframeExec('yarn init', true)
  if (!isSrc) makeSrc()

  copyFiles()
  addDependencies()
  updatePackJsonScripts()
}

executeScript()
