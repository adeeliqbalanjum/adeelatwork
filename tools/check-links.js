// verifies every internal href/src in dist resolves to a file. usage: node tools/check-links.js [base]
const fs=require('fs'),path=require('path');const dist=path.resolve(__dirname,'../dist');const base=process.argv[2]?'/'+process.argv[2].split('/').filter(Boolean).pop():'';
const walk=d=>fs.readdirSync(d).flatMap(f=>{const p=path.join(d,f);return fs.statSync(p).isDirectory()?walk(p):p.endsWith('.html')?[p]:[]});
let bad=0,n=0;for(const file of walk(dist)){const h=fs.readFileSync(file,'utf8');
for(const m of h.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)){let u=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(u))continue;if(base&&u.startsWith(base))u=u.slice(base.length);if(!u.startsWith('/'))continue;n++;
let f=path.join(dist,u);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){bad++;console.log('BROKEN',path.relative(dist,file),'->',m[1])}}
for(const m of h.matchAll(/srcset="([^"]+)"/g))for(const part of m[1].split(',')){let u=part.trim().split(' ')[0];if(base&&u.startsWith(base))u=u.slice(base.length);n++;if(!fs.existsSync(path.join(dist,u))){bad++;console.log('BROKEN srcset',u)}}}
console.log(n,'internal references checked,',bad,'broken');process.exit(bad?1:0);
