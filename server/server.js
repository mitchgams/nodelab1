
// ONE
let chirps = [
    {id: 4, user: {id: 2, name:'Mitch Gams', avatarUrl:'https://www.w3schools.com/w3images/avatar2.png'}, post: {content:'this content is so amazing', date:'11/20/2020'}},
    {id: 3, user: {id: 2, name:'Mitch Gams', avatarUrl:'https://www.w3schools.com/w3images/avatar2.png'}, post: {content:'woah now take it easy', date:'11/14/2020'}},
    {id: 2, user: {id: 2, name:'Mitch Gams', avatarUrl:'https://www.w3schools.com/w3images/avatar2.png'}, post: {content:'I\'m the most important thing to ever happen to you', date:'11/12/2020'}},
    {id: 1, user: {id: 1, name:'Jason Borne', avatarUrl:'https://www.w3schools.com/w3images/avatar1.png'}, post: {content:'this is also text', date:'11/2/2020'}},
    {id: 0, user: {id: 0, name:'Jimmy Corn', avatarUrl:'https://www.w3schools.com/w3images/avatar3.png'}, post: {content:'and this is also text', date:'11/1/2020'}},
];

const fs = require('fs');
const path = require('path');

const storeData = (dataPath, data) => {
    try {
        fs.writeFileSync(dataPath, '{ "chirps": [\n');
        data.forEach((item, key, arr) => {
            if(Object.is(arr.length - 1, key)) {
                fs.appendFileSync(dataPath,  JSON.stringify(item) + '\n');
            } else {
                fs.appendFileSync(dataPath,  JSON.stringify(item) + ',\n');
            }
        });
        fs.appendFileSync(dataPath, '] }\n');
    } catch(err) {
        console.error(err);
    }
}

storeData(path.join(__dirname, '../chirps.json'), chirps);

