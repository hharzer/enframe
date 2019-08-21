import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { rootDir, logAdd, enframeDir } from './enframe'

export const srcFiles = () => {
  const isSrc = existsSync(rootDir('src/'))
  if (isSrc) return

  const dirs = ['src/back', 'src/front']
  dirs.forEach(dir => {
    mkdirSync(rootDir(dir), { recursive: true })
    logAdd(dir)
  })

  const files = ['src/back/server.ts', 'src/front/index.html']
  files.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logAdd(file)
  })
}
