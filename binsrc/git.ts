import { enframeExec, enframeConfig } from './enframe'

const { gitlabRemoteSSH } = enframeConfig

export const git = () => {
  enframeExec('git add .')
  enframeExec('git commit -m "First commit."')
  enframeExec(`git remote add origin ${gitlabRemoteSSH}`)
  enframeExec('git push --set-upstream origin master')
}
