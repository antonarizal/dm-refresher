const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const jsonData = require('./dataUser.json');
// const dataVideo = require('./dataVideo.json');
const username = jsonData.username
const userAgent = jsonData.userAgent
const limit = jsonData.limit 
const delay = jsonData.delay 

const sendGetRequest = async () => {
  try {
      const resp = await axios.get('https://api.dailymotion.com/user/'+username+'/videos?limit='+limit);
      let response = (resp.data);
      let data = JSON.stringify(response, null, 2);
      fs.writeFile('./dataVideo.json', data, (err) => {
          if (err) throw err;
          console.log('Data Disimpan');
      });
    } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};


function getRandom (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

  
(async () => {
        // prepare for headless chrome
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
          });
        await sendGetRequest();
        const page = await browser.newPage();
          var dataVideo = fs.readFileSync('./dataVideo.json');
            fs.readFile('./dataVideo.json', (async (error,data) =>  {
            if (error) throw error;
            let jsonData = JSON.parse(data.toString());
            // console.log(jsonData.list)
              let respIndex = jsonData.list.length
              let x = 1
              while(x > 0){
              console.log("looping ke",x)
              for(i = 0; i< respIndex; i++){
                  console.log(jsonData.list[i].title)
                  let vidId = jsonData.list[i].id
                  let videoUrl = 'https://dailymotion.com/video/' + vidId
                  let getUserAgent =  getRandom(userAgent)
                  console.log(getUserAgent)
                  await page.setUserAgent(getUserAgent);
                  await page.goto('https://dailymotion.com');
                  await page.waitForTimeout(2000)
                  await page.goto(videoUrl);
                  await page.evaluate(() => navigator.userAgent );
                  await page.waitForTimeout(delay)
                  //await browser.close();
              }
              x++;
            }
          }));
   

})();
