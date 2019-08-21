import { readFileSync } from 'fs'
import { enframeDir, enframeConfig } from './enframe'

const { appName } = enframeConfig

export const generateGitlabCiYmlFile = () => {
  const ci = readFileSync(enframeDir('.gitlab-ci.yml'), 'utf8')
  const newCi = ci.replace(/ENFRAME_APP_NAME/g, appName)
  return newCi
}
