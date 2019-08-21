import { join } from 'path'

const enframePath = join(process.cwd(), 'node_modules/enframe')
export const enframeDir = (file: string) => join(enframePath, file)
export const rootDir = (file: string) => join(process.cwd(), file)

interface EnframeConfig {
  appName: string
  gitlabRemoteSSH: string
}

export const enframeConfig: EnframeConfig = require(rootDir('enframe.json'))

import { execSync } from 'child_process'
import { rootFiles } from './rootFiles'
import { dependencies } from './dependencies'
import { packJson } from './packJson'
import { srcFiles } from './srcFiles'
import { git } from './git'
import { heroku } from './heroku';

export const logAdd = (name: string) => {
  console.log(`Enframe has added or updated ${name}`)
}

export const enframeExec = (command: string, stdioInherit?: boolean) => {
  console.log(`Enframe is executing: ${command}\n`)
  const execOptions = { encoding: 'utf8' }
  if (stdioInherit) execOptions['stdio'] = 'inherit'
  const stdout = execSync(command, execOptions)
  if (stdout) console.log(stdout)
}

const enframe = () => {
  enframeExec('git init')
  enframeExec('yarn init', true)
  rootFiles()
  srcFiles()
  dependencies()
  packJson()
  heroku()
  git()
}

enframe()
