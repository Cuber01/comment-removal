

console.log("Comment-removal by @Cuber01 v1.0 2021")
console.log("==============================================")


let fs = require('fs');


let error_slash = 'An error occured while loading the slash or backslash you entered in config.json, make sure its either a / or a \\ (2x backslash)'
let error_comment_sequence = 'An error occured while loading the comment sequence you entered in config.json, it seems like you didnt enter anything or entered nothing'
let error_extension = 'An error occured while loading the file extension you entered in config.json, it seems like you didnt enter anything or entered nothing'
let error_dir = 'An error occured while loading the path you entered in config.json, it seems like you didnt enter anything or entered nothing'

let str_pos = 0
let txt = ''
let lines = ''

let raw_config = fs.readFileSync('config.json');
let table_config = JSON.parse(raw_config);

let current_dir = ''
let comment_sequence = ''
let extension = ''
let slash = ''


let files = []
let filename = ''

let folders_i = -1
let folders = []



console.log('Initialised!')

ReadConfig()

GetFolders(current_dir)

function ReadConfig() {

    slash = table_config["Slash or backslash"]

    if (slash != '/' && slash != '\\') {
        console.log(error_slash)
        process.exit(1)
    }

    console.log('Slash or backslash: ' + slash)

    comment_sequence = table_config["Comment sequence"]

    if (comment_sequence == undefined || comment_sequence == "EDIT_THIS") {
        console.log(error_comment_sequence)
        process.exit(1)
    }

    console.log('Comment sequence: ' + comment_sequence)

    extension = table_config["File extension"]

    if (extension == undefined || extension == "EDIT_THIS") {
        console.log(error_extension)
        process.exit(1)
    }

    console.log('File extension: ' + extension)

    if( process.argv.length  > 2  ) { 
        current_dir = process.argv[2]
    } else {
       current_dir = table_config["Path"]
    }

    if (current_dir == undefined || current_dir == "EDIT_THIS") {
        console.log(error_dir)
        process.exit(1)
    }
    
    
    if (current_dir[current_dir.length-1] == "/" || current_dir[current_dir.length-1] == "\\") {

        current_dir = current_dir.substring(0, current_dir.length-1)
        console.log('Directory input corrected')

    }


    folders.push(current_dir)
    console.log('Directory: ' + current_dir)
    
}

function GetFolders(dir) {

    files = fs.readdirSync(dir)


    for (let i = 0; i < files.length; i++) {
        filename = files[i]
        extension = filename.split('.').pop()

        if (IsDirectory(dir + slash + filename)) {
            folders.push(dir + slash + filename)
        }
    }

    folders_i += 1

    if (folders_i != folders.length) {
        GetFiles(folders[folders_i], 'c')
        GetFolders(folders[folders_i])
    }

}


function GetFiles(dir, ext) {
 
    files = fs.readdirSync(dir)

    for (let i = 0; i < files.length; i++) {
        filename = files[i]
        extension = filename.split('.').pop()


        if (extension == ext) {
            RemoveComments(filename, dir)
        }

    }

}

function RemoveComments(file, dir) {
    let path_to_file = dir + slash + file

    txt = fs.readFileSync(path_to_file, 'utf8')

    lines = txt.split("\n")

    fs.writeFileSync(dir + slash + 'back_' + file + '.txt', lines.join("\n"));

    for (let i = 0; i < lines.length; i++) {

        for (let j = 0; j < lines[i].length; j++) {

            str_pos = lines[i].search(comment_sequence);

            if (str_pos != -1) {
                lines[i] = lines[i].substring(0, str_pos)
            }

        }



    }


    for (i = 0; i < lines.length; i++) {
        lines[i] = lines[i].concat('\n');
    }

    fs.writeFileSync(dir + slash + file, lines.join(""));

    console.log('Comments removed:', file)
}

function IsDirectory(dir) {

    let stats = fs.statSync(dir);

    if (stats.isDirectory()) {
        return(true)
    }

    return(false)

}

