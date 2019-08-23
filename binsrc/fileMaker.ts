import {
  copyFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readFileSync
} from 'fs'
import { enframeDir, rootDir, elog } from './enframe'
import { enframeConfig } from './enframeConfig';

const logTouch = (name: string) => elog(`touched ${name}`)

const makeFiles = (files: string[]) => {
  files.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logTouch(file)
  })
}

const { appName } = enframeConfig

const generateGitlabCiYmlFile = () => {
  const ci = readFileSync(enframeDir('.gitlab-ci.yml'), 'utf8')
  const newCi = ci.replace(/ENFRAME_APP_NAME/g, appName)
  return newCi
}

const rootFileMaker = () => {
  const files = [
    'tsconfig.json',
    '.prettierrc',
    '.eslintrc.json',
    '.mocharc.json',
    'LICENSE',
    'cypress.json'
  ]

  makeFiles(files)

  copyFileSync(enframeDir('gitignore'), rootDir('.gitignore'))
  logTouch('.gitignore')

  writeFileSync(rootDir('.gitlab-ci.yml'), generateGitlabCiYmlFile())
  logTouch('.gitlab-ci.yml')
}

const makeBackDir = () => {
  mkdirSync(rootDir('src/back'), { recursive: true })
  logTouch('src/back')
}

const makeBackFiles = () => {
  const files = ['src/back/server.ts']

  makeFiles(files)
}

const makeFrontDir = () => {
  mkdirSync(rootDir('src/front'), { recursive: true })
  logTouch('src/front')
}

const makeFrontFiles = () => {
  const files = [
    'src/front/App.test.tsx',
    'src/front/App.tsx',
    'src/front/index.html',
    'src/front/index.tsx',
    'src/front/stylesheet.css'
  ]

  makeFiles(files)
}

const srcFileMaker = () => {
  const isBackDir = existsSync(rootDir('src/back'))
  if (!isBackDir) makeBackDir()

  const isFrontDir = existsSync(rootDir('src/front'))
  if (!isFrontDir) makeFrontDir()

  makeBackFiles()
  makeFrontFiles()
}

export const fileMaker = () => {
  rootFileMaker()
  srcFileMaker()
}
