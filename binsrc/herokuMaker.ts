import { enframeExec, commandDoesNotError, elog } from './enframe'
import { enframeConfig } from './enframeConfig'

const { appName } = enframeConfig

const createIfCan = (appName: string) => {
  const appExists: boolean = commandDoesNotError(`heroku apps:info ${appName}`)
  if (appExists) {
    elog(`Heroku app ${appName} already exists.`)
    return
  }

  try {
    enframeExec(`heroku apps:create ${appName}`)
  } catch (e) {
    elog('Heroku app creation failed. Skipping for now. Error message below.')
    elog(e)
  }
}

export const herokuMaker = () => {
  const herokuExists = () => commandDoesNotError('heroku')
  if (!herokuExists) {
    const message =
      'You do not have the Heroku CLI installed. Skipping Heroku app-creation sequence.'
    elog(message)
  }

  createIfCan(`${appName}-staging`)
  createIfCan(`${appName}-prod`)
}
