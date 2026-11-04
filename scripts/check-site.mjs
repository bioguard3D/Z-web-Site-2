#!/usr/bin/env node
/**
 * BIOGUARD 3D V2 — dependency-free static site checks.
 * Run: node scripts/check-site.mjs
 */
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const htmlFiles=readdirSync(root).filter(x=>x.endsWith('.html'));
const errors=[],warnings=[];
const read=p=>readFileSync(join(root,p),'utf8');
const validIds=new Map();
for(const file of htmlFiles){
  const s=read(file);
  const ids=[...s.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
  validIds.set(file,new Set(ids));
  if(!/<html\b/i.test(s)||!/<title>[^<]+<\/title>/i.test(s))errors.push(file+': missing html or title');
  if(!/name=["']viewport["']/i.test(s))errors.push(file+': missing viewport');
  if(!/name=["']description["']/i.test(s))warnings.push(file+': missing description');
  const duplicates=ids.filter((x,i)=>ids.indexOf(x)!==i);
  if(duplicates.length)errors.push(file+': duplicate IDs '+[...new Set(duplicates)].join(', '));
  for(const m of s.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)){
    const link=m[1];
    if(/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(link))continue;
    const [pathname,fragment]=link.split('#');
    const dest=pathname?decodeURIComponent(pathname.split('?')[0]):file;
    if(dest && !existsSync(join(root,dest)))errors.push(file+': missing asset '+dest);
    else if(fragment && dest.endsWith('.html') && !validIds.has(dest)){} // checked in second pass
  }
}
for(const file of htmlFiles){
 const s=read(file);
 for(const m of s.matchAll(/\bhref=["']([^"']+)["']/g)){
  const href=m[1];if(!href.includes('#')||/^(https?:|mailto:|tel:)/.test(href))continue;
  const [pathname,frag]=href.split('#');if(!frag)continue;
  const target=pathname||file;
  if(validIds.has(target)&&!validIds.get(target).has(frag))errors.push(file+': missing anchor '+href);
 }
}
const sitemap=read('sitemap.xml');
for(const file of htmlFiles.filter(x=>!['404.html','mentions-legales.html','politique-de-confidentialite.html'].includes(x))){
 if(file!=='index.html'&&!sitemap.includes('https://bioguard3d.com/'+file))errors.push('sitemap missing '+file);
}
if(!existsSync(join(root,'logo.webp')))errors.push('Original brand logo missing');
if(!read('index.html').includes('tel:+212675311317'))errors.push('Homepage missing click-to-call');
if(!read('index.html').includes('data-wa'))errors.push('Homepage missing WhatsApp contact');
for(const msg of warnings)console.warn('WARN:',msg);
for(const msg of errors)console.error('FAIL:',msg);
console.log('Checked',htmlFiles.length,'HTML pages;',errors.length,'errors;',warnings.length,'warnings');
if(errors.length)process.exitCode=1;
