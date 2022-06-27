// *****************************************
// Увесь цей фрагмент тексту ставимо
// на початок програмного js-файлу
// *****************************************
const fs = require('fs');
const fd = (process.platform === 'win32') ? process.stdin.fd : fs.openSync('/dev/tty', 'rs');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
function alert(msg = "", withoutN = false) {
    if (!withoutN && msg != '' && msg[msg.length - 1] != '\n') msg += '\n';
    fs.writeSync(process.stdout.fd, msg.toString()); }
function getChar() {
    const buf = new Buffer.alloc(1, 0, 'utf8');
    let bytesRead = fs.readSync(fd, buf, 0, 1);
    if (bytesRead > 0) return decoder.write(buf).charCodeAt(0);
    return -1; }
function prompt(msg = "") {
    alert(msg, true);
    let s = "", char, c, end = "\r\n";
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) != -1);
    if (c != -1) s = char;
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) == -1) s += char;
    return s; }
// ******************************************
// v2
// (c) 2022-05-04 alkhizha, s0urce
// ******************************************