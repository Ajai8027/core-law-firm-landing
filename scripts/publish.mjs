import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
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

const css = readFileSync(join(root, 'assets', 'app.css'), 'utf8')
const js = readFileSync(join(root, 'assets', 'app.js'), 'utf8')
const favicon = readFileSync(join(root, 'favicon.svg'), 'utf8')
const faviconDataUri = `data:image/svg+xml,${encodeURIComponent(favicon)}`

let standalone = html
  .replace(
    /<link rel="icon"[^>]*href="\.\/favicon\.svg"[^>]*>/,
    `<link rel="icon" type="image/svg+xml" href="${faviconDataUri}">`,
  )
  .replace(
    /<link rel="stylesheet" href="\.\/assets\/app\.css">/,
    () => `<style>\n${css}\n  </style>`,
  )
  .replace(
    /<script defer src="\.\/assets\/app\.js"><\/script>/,
    '',
  )

standalone = standalone.replace(
  /<\/body>/,
  () => `  <script>\n${js}\n  </script>\n  </body>`,
)

writeFileSync(join(root, 'index-standalone.html'), standalone, 'utf8')

rmSync(buildOut, { recursive: true, force: true })
console.log('Published index.html, assets, and index-standalone.html for local/live preview.')
