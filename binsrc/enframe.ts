import { execSync } from 'child_process'
import { rootFiles } from './rootFiles'
import { dependencies } from './dependencies'
import { packJson } from './packJson'
import { join } from 'path'
import { srcFiles } from './srcFiles'

const enframePath = join(process.cwd(), 'node_modules/enframe')
export const enframeDir = (file: string) => join(enframePath, file)
export const rootDir = (file: string) => join(process.cwd(), file)

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

const enframe = () => {
  enframeExec('git init')
  enframeExec('yarn init', true)
  rootFiles()
  srcFiles()
  dependencies()
  packJson()
}

enframe()
