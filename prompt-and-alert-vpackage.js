// *****************************************
// Увесь цей фрагмент тексту ставимо
// на початок програмного js-файлу
// *****************************************
const fs = require('fs'); // connecting module fs
const fd = (process.platform === 'win32') ? process.stdin.fd : fs.openSync('/dev/tty', 'rs'); //consfigurating for your OS
const StringDecoder = require('string_decoder').StringDecoder; // connecting class StringDecoder from module string_decoder
const decoder = new StringDecoder('utf8'); // creating object StringDecoder

function getChar() { // function for getting read character's code
    const buf = new Buffer.alloc(1, 0, 'utf8'); // creating object Buffer
    let bytesRead = fs.readSync(fd, buf, 0, 1); // reading and saving length of read bytes
    if (bytesRead > 0) return decoder.write(buf).charCodeAt(0); // checking is the char read and return it's code in positive way
    return -1; // return if char isn't read
}

function readWord(end = " \r\n") { // function for reading word to end
    let s = "", char, c;
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) != -1); // moving reading start to first not \r or \n char
    if (c != -1) s = char; // first char
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) == -1) { // reading chars while end char isn't found
        s += char; // adding chars in one string while they aren't run out
    }
    return s;
}

function readLine(sep = "") { // function for reading line with possibility of separating with sep
    return sep != "" ? readWord('\r\n').split(sep).filter(x => x != "") : readWord('\r\n'); // if sep != empty string return readWord('\r\n') separated by sep and else return readWord('\r\n')
}

function alert(msg = "", withoutN = false) { // function for writing messages, withoutN - will output be checked on having \n at the end
    if (!withoutN && msg != '' && msg[msg.length - 1] != '\n') msg += '\n'; // if withoutN == true and last char of msg not \n add \n
    fs.writeSync(process.stdout.fd, msg.toString()); // writing
}

function prompt(msg = "") { // function for reading text
    alert(msg, true); // writing message
    return readLine(); // reading line
}
// ******************************************
// vpackage
// (c) 2022-05-04 alkhizha, s0urce
// ******************************************