import { copyFileSync, writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { enframeDir, rootDir, elog } from './enframe'
import { enframeConfig } from './enframeConfig'

const { appName } = enframeConfig
const logTouch = (name: string) => elog(`touched ${name}`)
const efRootDir = (filePath: string) => enframeDir(`srcapp/${filePath}`)
const gitIgnore = () => {
  copyFileSync(efRootDir('gitignore'), rootDir('.gitignore'))
  logTouch('.gitignore')
}
const gitlabCi = () => {
  const fileName = '.gitlab-ci.yml'
  const writer = () => {
    const ci = readFileSync(efRootDir(fileName), 'utf8')
    const newCi = ci.replace(/ENFRAME_APP_NAME/g, appName)
    return newCi
  }
  writeFileSync(rootDir(fileName), writer())
  logTouch(fileName)
}

interface Node {
  dir?: string
  files: string[]
  specialCases?: (() => void)[]
}

const ROOT: Node = {
  files: [
    '.eslintrc.json',
    '.mocharc.json',
    '.prettierrc',
    'cypress.json',
    'LICENSE',
    'nodemon.json',
    'tsconfig.json'
  ],
  specialCases: [gitIgnore, gitlabCi]
}

const BACK: Node = {
  dir: 'src/back',
  files: ['server.ts']
}

const FRONT: Node = {
  dir: 'src/front',
  files: [
    'App.test.tsx',
    'App.tsx',
    'index.html',
    'index.tsx',
    'service-worker.js',
    'stylesheet.css'
  ]
}

const SRCs: Node[] = [ROOT, FRONT, BACK]

export const fileMaker = () => {
  SRCs.forEach(({ dir, files, specialCases }) => {
    let filePaths = files

    if (dir) {
      if (!existsSync(rootDir(dir))) {
        mkdirSync(rootDir(dir), { recursive: true })
      }
      filePaths = files.map(file => `${dir}/${file}`)
    }

    filePaths.forEach((filePath: string) => {
      copyFileSync(efRootDir(filePath), rootDir(filePath))
      logTouch(filePath)
    })

    if (specialCases) {
      specialCases.forEach(specialCase => specialCase())
    }
  })
}
