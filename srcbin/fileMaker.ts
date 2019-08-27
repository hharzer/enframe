import { copyFileSync, writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { enframeDir, rootDir, elog } from './enframe'
import { enframeConfig } from './enframeConfig'

const { appName } = enframeConfig
const logTouch = (name: string) => elog(`touched ${name}`)
const efRootDir = (filePath: string) => enframeDir(`srcapp/${filePath}`)

const rootFileMaker = () => {
  interface RootFileCopyData {
    [efFileName: string]: string
  }

  const rootFileCopyData: RootFileCopyData = {
    '.eslintrc.json': '.eslintrc.json',
    '.mocharc.json': '.mocharc.json',
    '.prettierrc': '.prettierrc',
    'cypress.json': 'cypress.json',
    gitignore: '.gitignore',
    LICENSE: 'LICENSE',
    'tsconfig.json': 'tsconfig.json',
    'nodemon.json': 'nodemon.json'
  }

  interface RootFileWriteData {
    [efFileName: string]: {
      fileName: string
      fileGenerater(): string
    }
  }

  const rootFileWriteData: RootFileWriteData = {
    '.gitlab-ci.yml': {
      fileName: '.gitlab-ci.yml',
      fileGenerater: () => {
        const ci = readFileSync(efRootDir('.gitlab-ci.yml'), 'utf8')
        const newCi = ci.replace(/ENFRAME_APP_NAME/g, appName)
        return newCi
      }
    }
  }

  Object.entries(rootFileCopyData).forEach(([efFileName, appFileName]) => {
    copyFileSync(efRootDir(efFileName), rootDir(appFileName))
    logTouch(appFileName)
  })

  Object.entries(rootFileWriteData).forEach(([, writer]) => {
    writeFileSync(rootDir(writer.fileName), writer.fileGenerater())
    logTouch(writer.fileName)
  })
}

const srcFileMaker = () => {
  const makeFiles = (files: string[]) => {
    files.forEach(file => {
      copyFileSync(efRootDir(file), rootDir(file))
      logTouch(file)
    })
  }

  const makeBackFiles = () => {
    const isBackDir = existsSync(rootDir('src/back'))
    if (!isBackDir) mkdirSync(rootDir('src/back'), { recursive: true })
    const backFiles = ['src/back/server.ts']
    makeFiles(backFiles)
  }

  const makeFrontFiles = () => {
    const isFrontDir = existsSync(rootDir('src/front'))
    if (!isFrontDir) mkdirSync(rootDir('src/front'), { recursive: true })
    const frontFiles = [
      'App.test.tsx',
      'App.tsx',
      'index.html',
      'index.tsx',
      'stylesheet.css'
    ]
    makeFiles(frontFiles.map(file => `src/front/${file}`))
  }

  makeBackFiles()
  makeFrontFiles()
}

export const fileMaker = () => {
  rootFileMaker()
  srcFileMaker()
}
