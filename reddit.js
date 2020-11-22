const path = require('path');
const fs = require('fs');
const request = require('request');
const http = require('http');

let dataPath = (path.join(__dirname, '/popular-articles.json'));

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }
request('https://reddit.com/r/popular.json', (err, res, body) => {
    if(err) console.log(err);
    //console.log(body);
    fs.writeFileSync(dataPath, '{ "articles": [\n');
    JSON.parse(body).data.children.forEach((item, key, arr)  => {
        let obj2W = {title: item.data.title, author: item.data.author, url: `https://reddit.com/${item.data.subreddit_name_prefixed}/comments/${item.data.id}/${item.data.title.split(' ').join('_').toLowerCase()}/`};
        if(Object.is(arr.length - 1, key)) {
            fs.appendFileSync(dataPath,  JSON.stringify(obj2W) + '\n');
        } else {
            fs.appendFileSync(dataPath,  JSON.stringify(obj2W) + ',\n');
        }
        if(ext(item.data.url) === ".jpg" || ext(item.data.url) === ".gif" || ext(item.data.url) === ".png") {
            download(item.data.url, `./reddit_downloads/${item.data.id}${ext(item.data.url)}`, () => {
                console.log(`${item.data.id}${ext(item.data.url)} downloaded`);
            });
        }
    });
    fs.appendFileSync(dataPath, ']}\n');
});


/********** used this to make sure the json i wrote was readable 
setTimeout(() => {
    let rawdata = fs.readFileSync('./popular-articles.json');
    let student = JSON.parse(rawdata);
    console.log(student);
}, 2000);
*/

function ext(url) {
    return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."))
}