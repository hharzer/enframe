import { enframeExec, commandDoesNotError } from './enframe'
import { enframeConfig } from './enframeConfig'

const { appName } = enframeConfig

export const herokuMaker = () => {
  const herokuExists = () => commandDoesNotError('heroku')
  if (!herokuExists) {
    console.log(
      'You do not have the Heroku CLI installed. Skipping Enframe Heroku App creation sequence.\n'
    )
  }

  const stagingExists = commandDoesNotError(`heroku apps:info ${appName}-staging`)
  if (!stagingExists) enframeExec(`heroku apps:create ${appName}-staging`)

  const prodExists = commandDoesNotError(`heroku apps:info ${appName}-prod`)
  if (!prodExists) enframeExec(`heroku apps:create ${appName}-prod`)
}
