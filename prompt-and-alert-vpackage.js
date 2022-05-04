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

function readLine(sep = "") { // function for reading line with separating by sep
    let s = "", char, c, end = "\r\n";
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) != -1); // moving reading start to first not \r or \n  char
    if (c != -1) s = char; // first char
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) == -1) { // reading chars while end char isn't found
        s += char; // adding chars in one string while they aren't run out
    }
    return sep != "" ? s.split(sep) : s; // if sep != empty string return s separated by sep else return s
}

function alert(msg = "", withoutN = false) { // function for writing messages, withoutN - will output be checked on having \n at the end
    if (!withoutN && msg != '' && msg[msg.length - 1] != '\n') msg += '\n'; // if withoutN == true and last char of msg not \n add \n
    fs.writeSync(process.stdout.fd, msg.toString()); // writing
}

function prompt(msg = "") {
    alert(msg, true); // writing message
    return readLine(); // reading line
}