const fs =require('fs');
const path = require('path');
const reader = require('xlsx');


function findFileByExt(folderPath){
    let files = fs.readdirSync(folderPath); //find file given a path
    let excelFiles = [];

    for(let i=0; i<files.length; i++){
        const extension = files[i].split('.').pop();//get file extension
        if (extension === 'xlsx') {
            excelFiles.push(files[i]);
        }
    }
    //get flashSummary file
    return excelFiles.sort().slice(-1)[0];
}

const fileName = findFileByExt('./2022Files');

function readFile(fn){
    console.log(fn, __dirname);
    const file = reader.readFile(path.join(__dirname, '2022Files', fn));
    let data = []
    const sheets = file.SheetNames

    for(let i = 0; i < sheets.length; i++)
    {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

// Printing data
    console.log(data)
}


readFile(fileName);