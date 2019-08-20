import { copyFileSync } from 'fs'
import { enframeDir, rootDir } from './enframe';

const filesToCopy = [
  'LICENSE',
  'CODE_OF_CONDUCT.md',
  'tsconfig.json',
  '.prettierrc',
  '.eslintrc.json'
]

const logFileAdded = fileName => {
  console.log(`Enframe has added or updated the file: ${fileName}.`)
}

export const copyFiles = () => {
  filesToCopy.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logFileAdded(file)
  })

  copyFileSync(enframeDir('gitignore'), rootDir('.gitignore'))
  logFileAdded('.gitignore')
}
