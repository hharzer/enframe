import { enframeExec, enframeConfig } from './enframe'
import { execSync, exec } from 'child_process'

const { appName } = enframeConfig

export const heroku = () => {
  const ensureAppExists = (appName: string) => {
    const stdout = execSync(`heroku apps:info ${appName}`, { encoding: 'utf8' })
    const appAlreadyExists: boolean = stdout.includes(appName)
    if (appAlreadyExists) return
    enframeExec(`heroku apps:create ${appName}-prod`)
  }

  ensureAppExists(`${appName}-staging`)
  ensureAppExists(`${appName}-prod`)
}
