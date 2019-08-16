#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const rootDir = file => path.join(process.cwd(), file)
const enframeDir = file => path.join(path.join(process.cwd(), 'node_modules/enframe'), file)

const filesToCopy = []
filesToCopy.forEach(file => {
  fs.copyFileSync(enframeDir(file), rootDir(file))
})
