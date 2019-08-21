import { copyFileSync } from 'fs'
import { enframeDir, rootDir, logAdd } from './enframe';

const filesToCopy = [
  'LICENSE',
  'CODE_OF_CONDUCT.md',
  'tsconfig.json',
  '.prettierrc',
  '.eslintrc.json',
  '.mocharc.json'
]

export const rootFiles = () => {
  filesToCopy.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logAdd(file)
  })

  copyFileSync(enframeDir('gitignore'), rootDir('.gitignore'))
  logAdd('.gitignore')
}
