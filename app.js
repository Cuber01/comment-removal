//import marked from 'markedjs'

//'use strict';

let fs = require('fs');

let slash = '/'


let str_pos = 0
let txt = ''
let lines = ''

let files = []


let filename = ''
let extension = ''

let current_dir = '/home/cubeq/Other/NuclearDirectory'
let folders_i = -1
let folders = []


console.log('Initialised!')



GetFolders(current_dir)


function GetFolders(dir) {
    //console.log(dir)

    files = fs.readdirSync(dir)


    for (let i = 0; i < files.length; i++) {
        filename = files[i]
        extension = filename.split('.').pop()
        //console.log(filename, extension)

        if (IsDirectory(dir + slash + filename)) {
            folders.push(dir + slash + filename)
        }
    }

    folders_i += 1

    if (folders_i != folders.length) {
        //console.log(folders[folders_i], folders_i)
        GetFiles(folders[folders_i], 'c')
        GetFolders(folders[folders_i])
    }

    //console.log(folders_i)
    //GetFiles(folders[folders_i], 'c')

}


function GetFiles(dir, ext) {
 
    files = fs.readdirSync(dir)
    //console.log(files.length)

    for (let i = 0; i < files.length; i++) {
        filename = files[i]
        extension = filename.split('.').pop()
        //console.log(filename, extension)


        if (extension == ext) {
            //console.log('File found:', filename)
            RemoveComments(filename, dir)
        }

    }

}

function RemoveComments(file, dir) {

    let path_to_file = dir + slash + filename

    txt = fs.readFileSync(path_to_file, 'utf8')

    lines = txt.split("\n")

    //console.log(path_to_file)


    for (let i = 0; i < lines.length; i++) {

        for (let j = 0; j < lines[i].length; j++) {

            str_pos = lines[i].search("//ET");

            if (str_pos != -1) {
                lines[i] = lines[i].substring(0, str_pos)
            }

        }



    }


    for (i = 0; i < lines.length; i++) {
        lines[i] = lines[i].concat('\n');
    }

    fs.writeFileSync(dir + slash + 'copy.txt', lines.join(""));
    //console.log(current_dir.concat('copy.txt'))

    console.log('Comments removed:', filename)
}



function GoToDir(dir) {

    current_dir = current_dir + dir + slash


    console.log(current_dir)
    GetFiles(current_dir, 'c')
}


function IsDirectory(dir) {

    let stats = fs.statSync(dir);

    if (stats.isDirectory()) {
        //console.log(dir)
        return(true)
    }

    return(false)

}

