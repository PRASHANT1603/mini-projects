const fs = require('fs');
fs.writeFile("output.txr", "write file", (err) =>{
  if(err) console.log("error occurred");
  else console.log('file written successfully');
})