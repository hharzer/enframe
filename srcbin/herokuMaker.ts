import { enframeExec, elog, commandDoesNotErrorAsync } from './enframe'
import { enframeConfig } from './enframeConfig'

const { appName } = enframeConfig
const stagingName = `${appName}-staging`
const prodName = `${appName}-prod`

const appExists = (app: string): Promise<boolean> => {
  return commandDoesNotErrorAsync(`heroku apps:info ${app}`)
}

interface HerokuStatus {
  isHeroku: boolean
  isStaging: boolean
  isProd: boolean
  shouldRunHerokuMaker: boolean
}
export const herokuChecker = async (): Promise<HerokuStatus> => {
  const isHeroku = await commandDoesNotErrorAsync('heroku')
  const herokuPromises = [appExists(stagingName), appExists(prodName)]
  const [isStaging, isProd] = await Promise.all(herokuPromises)

  const shouldRunHerokuMaker = isHeroku && !isStaging && !isProd
  return { isHeroku, isStaging, isProd, shouldRunHerokuMaker }
}

const create = (app: string) => {
  try {
    enframeExec(`heroku apps:create ${app}`)
  } catch (e) {
    elog(`Failed to create app ${app}`)
    elog(e)
  }
}

export const herokuMaker = ({ shouldRunHerokuMaker }: HerokuStatus) => {
  if (!shouldRunHerokuMaker) {
    elog('Skipping Heroku app creation.')
    return
  }

  create(stagingName)
  create(prodName)
}
