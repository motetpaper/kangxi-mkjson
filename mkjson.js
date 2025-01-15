// mkjson.js
// job    : converts kangxi text file into JSON chart
// git    : https://github.com/motetpaper/kangxi-mkjson
// lic    : MIT

const fs = require('fs')


// save output in ephemeral /out folder
const outfile = 'out/kangxi.json';

// place input text in persistent txt/ folder
const infile = 'txt/motet-kangxi-table.csv';

// JSON chart is an array of kangxi objects
const chart = [];

fs.readFile(infile, 'utf8', (err,data)=> {

  if (err) throw err;

  let tmp = 0;
  let hdr = null;
  let itm = null;

  const lines = data.trim().split(/\n/);
  const arr = lines.map((a)=>a.split(','));

  // iterate over the kangxi data
  arr.forEach((a,i)=>{

    const num = +a[0]; // cast to number
    const rad = a[1];
    const strk = +a[2]; // cast to number
    const pnyn = a[3];

    // kangxi radical object
    itm = {
      id: num,
      radical: rad,
      strokes: strk,
      pinyin: pnyn
    }

    // if stroke count increments
    // add a new header to JSON chart
    if(strk > tmp) {

      // kangxi header object
      hdr = {
        header: strk,
        units: '画'
      }

      chart.push(hdr)
    }

    // add item to the chart
    chart.push(itm);
    tmp = strk;
  });

  // writes the JSON chart to a file
  fs.writeFile(outfile, JSON.stringify(chart, null, ' '), (err)=>{
    if (err) throw err;
    console.log(`JSON kangxi chart saved to: ${outfile}`)
  });
});
