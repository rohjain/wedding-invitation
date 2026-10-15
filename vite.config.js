import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

function saveFramePlugin() {
  return {
    name: 'save-frame',
    configureServer(server) {
      server.middlewares.use('/api/save-frame', (req, res) => {
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const { name, dataUrl } = JSON.parse(body)
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '')
            fs.writeFileSync(path.join(process.cwd(), 'public', name), Buffer.from(base64Data, 'base64'))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, file: name }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: e.message }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), saveFramePlugin()],
})
