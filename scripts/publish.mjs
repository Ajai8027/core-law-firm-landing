import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url)).replace(/[\\/]scripts[\\/]$/, '')
const buildOut = join(root, '.build')
const htmlSrc = join(buildOut, '.vite', 'index.html')

let html = readFileSync(htmlSrc, 'utf8')
html = html
  .replaceAll('src="../assets/', 'src="./assets/')
  .replaceAll('href="../assets/', 'href="./assets/')
  .replace(/<script type="module" crossorigin /g, '<script defer ')
  .replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ')

writeFileSync(join(root, 'index.html'), html, 'utf8')

if (existsSync(join(root, 'assets'))) {
  rmSync(join(root, 'assets'), { recursive: true, force: true })
}
mkdirSync(join(root, 'assets'), { recursive: true })

for (const name of ['app.js', 'app.css']) {
  copyFileSync(join(buildOut, 'assets', name), join(root, 'assets', name))
}

copyFileSync(join(root, 'public', 'favicon.svg'), join(root, 'favicon.svg'))
copyFileSync(join(root, 'public', 'favicon.svg'), join(root, 'assets', 'favicon.svg'))

rmSync(buildOut, { recursive: true, force: true })
console.log('Published single index.html + assets for local/live preview.')
