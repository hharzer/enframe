import { enframeExec, enframeConfig } from './enframe';

const { appName } = enframeConfig

export const heroku = () => {
  enframeExec(`heroku apps:create ${appName}-staging`)
  enframeExec(`heroku apps:create ${appName}-prod`)
}
