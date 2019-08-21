import { enframeExec, enframeConfig } from './enframe'
import { execSync } from 'child_process'

const { gitlabRemoteSSH } = enframeConfig

export const git = () => {
  const isOriginSet = () => {
    const stdout = execSync('git remote', { encoding: 'utf8' })
    return stdout.includes('origin')
  }

  const gitChanges = (): boolean => {
    const stdout = execSync('git status --porcelain', { encoding: 'utf8' })
    return !!stdout
  }

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
