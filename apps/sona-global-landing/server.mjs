import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const appRoot = fileURLToPath(new URL(".", import.meta.url))
const publicRoot = resolve(appRoot, "public")

const contentTypes = {
  ".avif": "image/avif", ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".ico": "image/x-icon",
  ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp",
}

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`)
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname
  const filePath = resolve(publicRoot, `.${pathname}`)
  const isOutsidePublic = filePath !== publicRoot && !filePath.startsWith(`${publicRoot}\\`)
  if (isOutsidePublic || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
    return response.end("Not found")
  }
  response.writeHead(200, {
    "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  })
  createReadStream(filePath).pipe(response)
})

const port = Number(process.env.PORT || 3000)
server.listen(port, () => console.log(`SONA-GLOBAL is running at http://localhost:${port}`))
