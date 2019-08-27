import { rootDir } from './enframe';

interface EnframeConfig {
  appName: string
  gitlabRemoteSSH: string
}

export const enframeConfig: EnframeConfig = require(rootDir('enframe.json'))
