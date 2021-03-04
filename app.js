//import marked from 'markedjs'


let fs = require('fs');

let str_pos = 0
let txt = ''
let lines = ''

let files = []

let filename = ''
let extension = ''
let test = true

console.log('Initialised!')


fs.writeFileSync('copy.txt', 'ERROR')

CheckFiles('.')

function CheckFiles(dir) {
    files = fs.readdirSync(dir)
    
    for (i = 0; i < files.length; i++) {
        filename = files[i]
        extension = filename.split('.').pop()
        console.log(filename, extension)

        if (extension == 'c' && test == true) {
            console.log('Found a file!')
            test = false
            RemoveComments(filename)
        }

        if (extension == filename) {
            GoToDir(filename)
        }
    }

}

function RemoveComments(file) {

    txt = fs.readFileSync(file, 'utf8')
    lines = txt.split("\n")

    for (i = 0; i < lines.length; i++) {
        console.log(i)

        for (j = 0; j < lines[i].length; j++) {

            str_pos = lines[i].search("//ET");

            if (str_pos != -1) {
                lines[i] = lines[i].substring(0, str_pos)
            }

        }
    
   

    }



    for (i = 0; i < lines.length; i++) {
        lines[i] = lines[i].concat('\n');
    }

    fs.writeFileSync('copy.txt', lines.join(""));
}

function GoToDir(dir) {


    
}





