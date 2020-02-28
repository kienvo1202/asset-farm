const axios = require('axios');
const fs = require('fs');

const url =
  'https://www.vietcombank.com.vn/IBanking2020/';
console.log('123')
axios(url)
  .then(response => {
    const html = response.data;
    fs.writeFile("/pageVCB.html")
  })
  .catch(console.error);