import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { once } from 'node:events';
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let browser;let failed=0;
const check=(name,ok)=>{console.log((ok?'PASS ':'FAIL ')+name);if(!ok)failed++};
try{
  let ready=false;
  for(let i=0;i<30;i++){try{const r=await fetch('http://127.0.0.1:8765/');if(r.ok){ready=true;break}}catch{}await sleep(300)}
  if(!ready)throw new Error('Preview server unavailable');
  browser=await chromium.launch({headless:true});
  mkdirSync('previews',{recursive:true});
  for(const [name,width,height] of [['mobile',375,812],['tablet',768,1024],['desktop',1440,900]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
    await page.screenshot({path:'previews/home-'+name+'.png',fullPage:true});
    check(name+' no JS errors',errors.length===0);
    check(name+' no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
    check(name+' phone link',await page.locator('a[href="tel:+212675311317"]').count()>0);
    check(name+' WhatsApp link',await page.locator('a[href*="wa.me/212675311317"]').count()>0);
    check(name+' logo visible',await page.locator('img[src="logo.webp"]').first().evaluate(el=>el.complete&&el.naturalWidth>0));
    check(name+' illustration visible',await page.locator('img[src="illustration-protection.svg"]').first().evaluate(el=>el.complete&&el.naturalWidth>0));
    check(name+' brand logo has no white background wrapper',await page.locator('.brand').first().evaluate(el=>getComputedStyle(el).backgroundColor==='rgba(0, 0, 0, 0)'));
    check(name+' brand logo image loads',await page.locator('.brand img').first().evaluate(el=>el.complete&&el.naturalWidth>0));
    if(name==='mobile'){
      const menu=page.locator('.menu-btn');
      check('mobile menu control present',await menu.count()===1);
      if(await menu.count()){
        await menu.click();
        check('mobile menu opens accessibly',await menu.getAttribute('aria-expanded')==='true');
        await page.keyboard.press('Escape');
        check('mobile menu closes on Escape',await menu.getAttribute('aria-expanded')==='false');
      }
    }
    const form=page.locator('#quick');
    check(name+' contact form available',await form.count()===1);
    if(await form.count()){
      await page.locator('#q-pest').selectOption({label:'Rats et souris'});
      await page.locator('#q-city').selectOption({label:'Rabat'});
      const url=await page.evaluate(()=>{
        const p=document.querySelector('#q-pest').value;
        const c=document.querySelector('#q-city').value;
        return [...document.querySelectorAll('a[data-wa]')].some(a=>a.href.includes('wa.me/212675311317'))&&p==='Rats et souris'&&c==='Rabat';
      });
      check(name+' contact choices selectable',url);
      let submittedUrl='';
      await page.route('https://wa.me/**',route=>{submittedUrl=route.request().url();return route.abort()});
      await page.locator('#quick button[type="submit"]').click();
      await page.waitForTimeout(350);
      check(name+' form submits WhatsApp request with chosen pest and city',
        submittedUrl.includes('wa.me/212675311317') &&
        decodeURIComponent(submittedUrl).includes('Rats et souris') &&
        decodeURIComponent(submittedUrl).includes('Rabat'));
    }
    await page.close();
  }
  for(const file of ['deratisation','desinsectisation','punaises-de-lit','desinfection','depigeonnage','restaurants-cafes','hotels-riads','boulangeries-patisseries','industries-agroalimentaires']){
    const page=await browser.newPage({viewport:{width:375,height:812}});
    const r=await page.goto('http://127.0.0.1:8765/'+file+'.html');
    check(file+' loads',r?.status()===200);
    check(file+' no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
    await page.close();
  }
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
console.log('Browser failures:',failed);
if(failed)process.exitCode=1;
