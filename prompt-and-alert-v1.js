// ******************************************
// Увесь цей фрагмент тексту ставимо
// на початок програмного js-файлу
// ******************************************
const fs = require('fs');
const fd = (process.platform === 'win32') ? process.stdin.fd : fs.openSync('/dev/tty', 'rs');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
function alert(msg = "", withoutN = false){
    if(!withoutN && msg != "" && msg[msg.length - 1] != "\n") msg += "\n";
    fs.writeSync(process.stdout.fd, msg.toString());}
const bufB = Buffer.alloc(100);
var pos = 0, prevS = "";
function prompt(msg = ""){
    alert(msg, true);
    fs.readSync(fd, bufB, 0, 100);
    let s = decoder.write(bufB);
    if(s != prevS || s.indexOf("\n") == s.indexOf("\x00") - 1) pos = 0;
    prevS = s; s = s.slice(pos, s.length);
    if(s.indexOf("\r\n") != -1){
        pos += s.indexOf("\r\n") + 2;
        return s.substring(0, s.indexOf("\r\n"));}
    else if(s.indexOf("\n") != -1){
        pos += s.indexOf("\n") + 1;
        return s.substring(0, s.indexOf("\n"));}
    else return s.substring(0, s.indexOf("\x00"));}
// ******************************************
// v1
// (c) 2022-05-04 alkhizha, s0urce18
// ******************************************