const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { routes } = require('./routes')
const fs = require('fs')

async function generateSitemap() {
  const hostname = 'https://example.com' // Replace with your own domain name
  const sitemap = new SitemapStream({
    hostname,
    cacheTime: 600000, // 600 sec (10 min) cache purge period
  })
  const pipeline = sitemap.pipe(createGzip())

  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: 'daily', priority: 0.7 })
  })

  sitemap.end()
  const sitemapOutput = await streamToPromise(pipeline)
  fs.writeFileSync('./public/sitemap.xml.gz', sitemapOutput)
}

generateSitemap()
