import moment from 'moment';
import arrayBufferToHex from 'array-buffer-to-hex';
import ab2str from 'arraybuffer-to-string';



function dateFormat(UNIX_Timestamp) {
    return moment.unix(UNIX_Timestamp).format('ddd MMM DD HH:mm:ss YYYY');  
}

function changeEndianness(string) {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
      result.push(string.substr(len, 2));
      len -= 2;
    }
    return result.join('');
}

function getCardId(data) {    
    let hexValue = changeEndianness(arrayBufferToHex(data)); // convert to little edian
    return parseInt(hexValue, 16);
}

function hexToAscii(str1) {
    var hex = str1.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2) {
        //console.log("hexToAscii : index = " + i + " string = "+ str);
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
 }

// 📁 utils.js
function sayHi(user) {
    alert(`Hello, ${user}!`);
}
  
function sayBye(user) {
    alert(`Bye, ${user}!`);
}
// parameter 
// 1. String define 
// 2. count message
// 3. array Data Input
function repeatPOSTShiftInfo(message, totalMessage, input) {
    /*
    result = { "message" : []
        MediaType =  {1 bytes}
        CardType  =  {1 bytes}
    }
    */
   var result = [];
   var startIndex = 0;
   if (totalMessage == 0) {
        return null;
   }else{
    for( var count = 0 ; count < totalMessage ; count++ ) {
            var mediaType   = new Uint8Array (input.slice(startIndex, startIndex + 1)); startIndex = startIndex + 1;
            var cardType    = new Uint8Array (input.slice(startIndex, startIndex + 1)); startIndex = startIndex + 1;
            if (message == 'AddPass') {
                var passTypeID  = new Uint16Array (input.slice(startIndex, startIndex + 2)); startIndex = startIndex + 2;
                var quantity    = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                var amount      = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                result[count] = { 
                    "IndexInfo"                 : count+1,
                    ["MediaTypeOf" + message]   : mediaType[0],
                    ["CardTypeOf"  + message]   : cardType[0],
                    "passTypeID"                : passTypeID[0],
                    ["QuantityOf"  + message]   : quantity[0],
                    ["AmountOf"    + message]   : amount[0]
                };
            }
            else if (message == 'Adjustment') {
                var ReasonCode  = new Uint8Array (input.slice(startIndex, startIndex + 1)); startIndex = startIndex + 1;
                var PaymentType = new Uint8Array (input.slice(startIndex, startIndex + 1)); startIndex = startIndex + 1;
                var quantity    = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                var amount      = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                result[count] = { 
                    "IndexInfo"                : count+1,
                    ["MediaTypeOf" + message]  : mediaType[0],
                    ["CardTypeOf"  + message]  : cardType[0],
                    [message+"ReasonCode"]     : ReasonCode[0],
                    [message+"PaymentType"]    : PaymentType[0],
                    ["QuantityOf"  + message]   : quantity[0],
                    ["AmountOf"    + message]   : amount[0]
                };
            }else if (message == 'EntryTransaction') {
                var quantity    = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                result[count] = { 
                    "IndexInfo"                 : count+1,
                    ["MediaTypeOf" + message]   : mediaType[0],
                    ["CardTypeOf"  + message]   : cardType[0],
                    ["QuantityOf"  + message]   : quantity[0],
                };
            }else if (message == 'StockMovement') {
                var quantityStart    = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                var quantityEnd      = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                result[count] = { 
                    "IndexInfo"                 : count+1,
                    ["MediaTypeOf" + message]   : mediaType[0],
                    ["CardTypeOf"  + message]   : cardType[0],
                    "StockStartQuantity"        : quantityStart[0],
                    "StockEndQuantity"          : quantityEnd[0],
                };
            }
            else {
                var quantity    = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                var amount      = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
                result[count] = { 
                    "IndexInfo"                 : count+1,
                    ["MediaTypeOf" + message]   : mediaType[0],
                    ["CardTypeOf"  + message]   : cardType[0],
                    ["QuantityOf"  + message]   : quantity[0],
                    ["AmountOf"    + message]   : amount[0]
                };
            }
        }
        var outMessage = { [message] : result } ;
        return outMessage;
    }
}
// loop message 0-63
function repeatAllCardType(message, input) {
    var startIndex = 0;
    var result = {};
    for( var count = 0 ; count < 64 ; count++ ) {  
        var objectResult = {};
        if ((message=="ValueAdded") || (message=="ValueRefund")){
            var value   = new Uint32Array (input.slice(startIndex, startIndex + 4)); startIndex = startIndex + 4;
            objectResult =  { [message +"CardType"+count] : value[0] };
            result = Object.assign(result, objectResult);
        }
        else {
            var value   = new Uint16Array (input.slice(startIndex, startIndex + 2)); startIndex = startIndex + 2;
            if (message == "NumberOfCTPPass"){
                objectResult =  { [message + count + "Deducted"]  : value[0] };
            }else if ((message == "NumberOfEntriesWithCTPIssued") || (message == "NumberOfCSCIssued") ) {
                var resStr = message.replace("Issued", "");
                objectResult =  { [resStr + count + "Issued"]  : value[0] };
            }else if (message == "NumberOfCSCAddValue") {
                objectResult =  { ["NumberOfCardType" + count + "AddValue"]  : value[0] };
            }else if (message == "NumberOfCSCRefund") {  
                objectResult =  { ["NumberOfCardType" + count + "Refund" ] : value[0] };
            }else {
                objectResult =  { [message +"CardType"+count] : value[0]  };
            }
            result = Object.assign(result, objectResult);
        }
        
    }
    var outMessage = { [message] : result } ;
    //console.log("repeatAllCardType : " +  JSON.stringify(outMessage,null,2)); 
    return outMessage;
}

function Boolean_tNY(flag) {
    if (flag == 0) {
        return "No";
    }else{
        return "Yes";
    }
}

// implemnet checks all buffer array is zero? 
function isZeroAllBufferArray(data) {
    //console.log("isZeroTable : data input = " + arrayBufferToHex(data) + " Length = "+ data.byteLength);
    var count = 0;
    for( count = 0; count < data.byteLength; count++) {
        var intByte = new Uint8Array(data.slice(count, count + 1));
        if ( intByte != 0 ){
            return false;
        }
    }
    return true;
}

function TimePeriodsToBits(data){
    //var binaryOut = ab2str(data, 'binary');

    var binaryOut = ab2str(data, 'ascii');
    //console.log(binaryOut);
    return binaryOut;
}

function ShowsBinarys(data){
    var binaryOut = ab2str(data, 'ascii');
    //console.log(binaryOut);
    return binaryOut;
}
  
export {sayHi, sayBye, 
    dateFormat, 
    getCardId, 
    changeEndianness, 
    hexToAscii,
    repeatPOSTShiftInfo,
    repeatAllCardType,
    Boolean_tNY,
    isZeroAllBufferArray,
    ShowsBinarys,
    TimePeriodsToBits,
}; // a list of exported variables