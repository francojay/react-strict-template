import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'

const app = new Hono()
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Serve static files from the dist directory
app.use('/*', serveStatic({ root: './dist' }))

// Fallback for SPA routing - serve index.html for all unmatched routes
app.get('*', async (c) => {
    try {
        const indexPath = join(__dirname, 'dist', 'index.html')
        const content = await readFile(indexPath, 'utf-8')
        return c.html(content)
    } catch (error) {
        console.error('Error serving index.html:', error)
        return c.text('Internal Server Error', 500)
    }
})

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
}) 