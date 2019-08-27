import { rootDir } from './enframe'
import importFresh from 'import-fresh'

interface EnframeConfig {
  appName: string
  gitlabRemoteSSH: string
}

const enframeConfig = importFresh(rootDir('enframe.json')) as EnframeConfig
export { enframeConfig }
