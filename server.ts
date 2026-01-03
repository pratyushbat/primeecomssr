import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { createProxyMiddleware } from 'http-proxy-middleware';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  const BASE_URL = 'https://girisa.shop';

  /*  server.use('/api', (req, res) => {
      createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true, 
        secure: false,
            
      });
    }); */

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // ---------------- SITEMAP ----------------
  server.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'application/xml');

    const staticRoutes = [
      '/',
      '/home',
      '/home/accountinfo',
      '/home/contactus',
      '/home/products',

    ];

    const productSlugs = [
      'girisa nails',
      'artifical nails',
      'girisa beauty'
    ];
    const urls = [
      ...staticRoutes.map(route => ({
        loc: `${BASE_URL}${route}`,
        priority: '1.0',
        changefreq: 'daily'
      })),
      ...productSlugs.map(slug => ({
        loc: `${BASE_URL}/product/${slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }))
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`;

    res.send(xml);
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    console.log('req.headers.cookie')
    console.log(req.headers.cookie)

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }, { provide: 'REQUEST', useValue: req }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 3000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
