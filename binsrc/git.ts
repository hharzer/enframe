import { enframeExec, commandDoesNotError } from './enframe'
import { execSync } from 'child_process'
import { enframeConfig } from './enframeConfig'

const { gitlabRemoteSSH } = enframeConfig

const gitExists = (): boolean => commandDoesNotError('git status')
const gitEmptyPorcelain = (): boolean => {
  return !execSync('git status --porcelain', { encoding: 'utf8' })
}
const gitChanges = (): boolean => gitExists() && gitEmptyPorcelain()

export const gitInit = () => {
  if (!gitExists()) enframeExec('git init')
}

const isOriginSet = () => {
  const gitRemotes = execSync('git remote', { encoding: 'utf8' })
  return gitRemotes.includes('origin')
}

export const gitPush = () => {
  if (!gitChanges()) return

  enframeExec('git add .')
  enframeExec('git commit -m "Enframe commit."')

  if (isOriginSet()) {
    enframeExec('git push origin master')
  } else {
    enframeExec(`git remote add origin ${gitlabRemoteSSH}`)
    enframeExec('git push --set-upstream origin master')
  }
}
