import { copyFileSync, writeFileSync } from 'fs'
import { enframeDir, rootDir, logAdd } from './enframe'
import { generateGitlabCiYmlFile } from './generateGitlabCiYmlFile'

export const rootFiles = () => {
  const filesToCopy = [
    'LICENSE',
    'CODE_OF_CONDUCT.md',
    'tsconfig.json',
    '.prettierrc',
    '.eslintrc.json',
    '.mocharc.json'
  ]

  filesToCopy.forEach(file => {
    copyFileSync(enframeDir(file), rootDir(file))
    logAdd(file)
  })

  copyFileSync(enframeDir('gitignore'), rootDir('.gitignore'))
  logAdd('.gitignore')

  writeFileSync(rootDir('.gitlab-ci.yml'), generateGitlabCiYmlFile())
  logAdd('.gitlab-ci.yml')
}
