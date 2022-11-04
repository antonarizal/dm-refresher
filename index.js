const puppeteer = require('puppeteer');
const axios = require('axios');
const delay = 90000 // milisecond
const UserAgentx = [
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; LM-Q710(FGN)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36',
    'Mozilla/5.0 (Android 13; Mobile; rv:68.0) Gecko/68.0 Firefox/106.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Vivaldi/5.5.2805.42',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/107.0.5304.66 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/106.0 Mobile/15E148 Safari/605.1.15',
    'Mozilla/5.0 (X11; CrOS x86_64 15117.86.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.92 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS armv7l 15117.86.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.92 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS aarch64 15117.86.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.92 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS x86_64 15117.86.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.92 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:106.0) Gecko/20100101 Firefox/106.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
]

function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }
  
(async () => {
        // prepare for headless chrome
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
          });

        const page = await browser.newPage();
        let data =JSON.parse(`{"page":1,"limit":10,"explicit":false,"total":8,"has_more":false,"list":[{"id":"x8f6bsv","title":"10 Awesome Gadgets from Aliexpress!","channel":"tech","owner":"x1erz4h"},{"id":"x8f5szy","title":"Info Update Untuk Peserta Prioritas Seleksi PPPK 2022 Cek Sekarang","channel":"school","owner":"x1erz4h"},{"id":"x8f5scy","title":"Gaji Guru Lulusan PPG Prajabatan","channel":"school","owner":"x1erz4h"},{"id":"x8f55v8","title":"DIY How to make a notebook from HVS paper","channel":"creation","owner":"x1erz4h"},{"id":"x8f50qc","title":"5 Langkah Tehnis Persiapan Implementasi Kurikulum Merdeka","channel":"school","owner":"x1erz4h"},{"id":"x8f4zqv","title":"Panduan Cara Menyusun ATP (Alur Tujuan Pembelajaran) Kurikulum Merdeka. Format ATP","channel":"school","owner":"x1erz4h"},{"id":"x8f4z1k","title":"Menyusun Modul Ajar Kurikulum Merdeka Versi Lengkap","channel":"school","owner":"x1erz4h"},{"id":"x212eqv","title":"Modifikasi Mobil Toyota Yaris terbaru 2014","channel":"auto","owner":"x1erz4h"}]}`);
        
        console.log(data.list)
        let respIndex = data.list.length
        for(i = 0; i< respIndex; i++){
            console.log(data.list[i].id)
            let vidId = data.list[i].id
            let videoUrl = 'https://dailymotion.com/video/' + vidId
            let getUserAgent =  get_random(UserAgentx)
            console.log(getUserAgent)
            await page.setUserAgent(getUserAgent);
            await page.goto('https://dailymotion.com');
            await page.waitForTimeout(2000)
            await page.goto(videoUrl);
            const userAgent = await page.evaluate(() => navigator.userAgent );
            await page.waitForTimeout(delay)
            //await browser.close();
        }
   

})();
