import { copyFileSync, writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { enframeDir, rootDir, elog } from './enframe'
import { enframeConfig } from './enframeConfig'
import { copySync } from 'fs-extra'

const { appName } = enframeConfig
const efRootDir = (path: string) => enframeDir(`srcapp/${path}`)

const makeRoot = () => {
  const gitIgnore = () => copyFileSync(efRootDir('gitignore'), rootDir('.gitignore'))
  const gitlabCi = () => {
    const fileName = '.gitlab-ci.yml'
    const writer = () => {
      const ci = readFileSync(efRootDir(fileName), 'utf8')
      const newCi = ci.replace(/ENFRAME_APP_NAME/g, appName)
      return newCi
    }
    writeFileSync(rootDir(fileName), writer())
  }

  gitIgnore()
  gitlabCi()

  const files = [
    '.eslintrc.json',
    '.mocharc.json',
    '.prettierrc',
    'cypress.json',
    'LICENSE',
    'nodemon.json',
    'tsconfig.json'
  ]

  files.forEach((filePath: string) => {
    copyFileSync(efRootDir(filePath), rootDir(filePath))
  })

  const allFiles = files.concat(['.gitignore', '.gitlab-ci.yml'])
  elog(`Updated the following root files, ${allFiles.join(', ')}`)
}

const makeSrc = () => {
  copySync(efRootDir('src/'), rootDir('src/'))
  elog(`Copied the contents of ${efRootDir('src/')} into ${rootDir('src/')}`)
}

export const fileMaker = () => {
  makeRoot()
  makeSrc()
}
