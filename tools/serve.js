// local preview with gzip, like GitHub Pages. usage: node tools/serve.js [port]
const http=require('http'),fs=require('fs'),path=require('path'),zlib=require('zlib');const root=path.resolve(__dirname,'../dist');const port=+process.argv[2]||4180;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.json':'application/json','.webmanifest':'application/manifest+json','.txt':'text/plain','.woff2':'font/woff2','.mp4':'video/mp4'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(root,p);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
if(!fs.existsSync(f)){r.writeHead(404,{'Content-Type':'text/html'});return r.end(fs.readFileSync(path.join(root,'404.html')))}
const ext=path.extname(f),h={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'max-age=600'};
if(/\.(html|css|js|svg|xml|json|txt|webmanifest)$/.test(ext)&&/gzip/.test(q.headers['accept-encoding']||'')){h['Content-Encoding']='gzip';r.writeHead(200,h);return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(r)}
const size=fs.statSync(f).size,rg=/bytes=(\d*)-(\d*)/.exec(q.headers.range||'');h['Accept-Ranges']='bytes';
if(rg){const st=rg[1]?+rg[1]:size-+rg[2],en=rg[1]&&rg[2]?Math.min(+rg[2],size-1):size-1;h['Content-Range']='bytes '+st+'-'+en+'/'+size;h['Content-Length']=en-st+1;r.writeHead(206,h);return fs.createReadStream(f,{start:st,end:en}).pipe(r)}
h['Content-Length']=size;r.writeHead(200,h);fs.createReadStream(f).pipe(r)}).listen(port,()=>console.log('http://localhost:'+port));
