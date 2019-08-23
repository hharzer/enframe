import { join } from 'path'

const enframePath = join(process.cwd(), 'node_modules/enframe')
export const enframeDir = (file: string) => join(enframePath, file)
export const rootDir = (file: string) => join(process.cwd(), file)

import { execSync } from 'child_process'
import { packageJsonMaker } from './packageJsonMaker'
import { gitPush, gitInit } from './git'
import { herokuMaker } from './herokuMaker'
import { fileMaker } from './fileMaker'

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

export const commandDoesNotError = (command: string): boolean => {
  try {
    execSync(command, { encoding: 'utf8', stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}


const yarnExists = (): boolean => {
  const stdout = execSync('cat package.json', { encoding: 'utf8' })
  return stdout.includes('"name":')
}

const enframe = () => {
  gitInit()
  if (!yarnExists()) enframeExec('yarn init', true)
  fileMaker()
  packageJsonMaker()
  herokuMaker()
  gitPush()
}

enframe()
