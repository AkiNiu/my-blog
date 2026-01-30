import http from 'node:http'
import handler from './chat'

const port = Number(process.env.PORT || 8787)

const server = http.createServer(async (req, res) => {
  const url = req.url || '/'
  if (url === '/health') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: true }))
    return
  }

  if (url.startsWith('/api/chat')) {
    await handler(req as any, res as any)
    return
  }

  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ error: 'Not Found' }))
})

server.listen(port, () => {
  console.log(`Local API listening on http://localhost:${port}`)
})

