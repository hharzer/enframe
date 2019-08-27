import { enframeExec, commandDoesNotError, elog } from './enframe'
import { execSync } from 'child_process'
import { enframeConfig } from './enframeConfig'

const { gitlabRemoteSSH } = enframeConfig

const gitExists = (): boolean => commandDoesNotError('git status')

export const gitInit = () => {
  if (!gitExists()) enframeExec('git init')
}

const gitChanges = (): boolean => {
  if (!gitExists()) return false

  const changeSet = execSync('git status --porcelain', { encoding: 'utf8' })
  return !!changeSet
}

const isOriginSet = () => {
  const gitRemotes = execSync('git remote', { encoding: 'utf8' })
  return gitRemotes.includes('origin')
}

export const gitPush = () => {
  if (!gitChanges()) {
    elog('No git changes have been detected. Skipping git-push sequence.')
    return
  }

  enframeExec('git add .')
  enframeExec('git commit -m "Enframe commit."')

  if (isOriginSet()) {
    enframeExec('git push origin master')
  } else {
    enframeExec(`git remote add origin ${gitlabRemoteSSH}`)
    enframeExec('git push --set-upstream origin master')
  }
}
