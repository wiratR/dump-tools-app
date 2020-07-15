<template>
  <div class="drop" 
    :class="getClasses" 
    @dragover.prevent="dragOver" 
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)">
      <textarea v-model="textSource" v-if="textSource"></textarea>
      <h1 v-if="wrongFile">Wrong file type</h1>
      <h1 v-if="!textSource && !isDragging && !wrongFile">Drop <label for="uploadmytextfile">(or pick)</label> a td file</h1>
      <input type="file" id="uploadmytextfile" accept=".dat" @change="requestUploadFile" />
  </div>
</template>

<script>
import arrayBufferToHex from 'array-buffer-to-hex';
import * as utils from '../help/utils.js';
import * as bpltd from '../help/bpltd.js';

export default {
  name: 'DropAnImage',
  data(){
    return{
      isDragging:false,
      wrongFile:false,
      textSource:null
    }
  },
  computed:{
    getClasses(){
      return {isDragging: this.isDragging}
    }
  },
  methods:{
    dragOver(){
      this.isDragging = true
    },
    dragLeave(){
      this.isDragging = false
    },
    drop(e){
      var files = e.dataTransfer.files
      this.process(files)
    },
    requestUploadFile(){
      var src = this.$el.querySelector('#uploadmytextfile')
      var files = src.files
      this.process(files)
    },
    dumpTd(buffer) {
      //utils.sayHi('test');
        // FileHeadera
        // Message Data[n]
        // FileTaileer
        let offSet = 0
        var arrFileHeader = buffer.slice(offSet, 17);
        var AllHexFileHeader =  arrayBufferToHex(arrFileHeader);    // row Data 
        // section 4.4 File Header  17 bytes
        var FileFormatVersionNumber = new Uint8Array(arrFileHeader.slice(0, 1));      // 1 bytes
        var FileSequenceNumber      = new Uint16Array(arrFileHeader.slice(1, 3));     // 2 bytes
        var ServiceProviderID       = new Uint16Array(arrFileHeader.slice(3, 5));     // 2 bytes
        var EquipmentID             = new Uint32Array(arrFileHeader.slice(5, 9));     // 4 bytes
        var DateandTime             = new Uint32Array(arrFileHeader.slice(9, 13));    // 4 bytes
        var LocationCode            = new Uint16Array(arrFileHeader.slice(13, 15));   // 2 bytes
        var NumberofMessages        = new Uint16Array(arrFileHeader.slice(15, 17));   // 2 bytes
        offSet = offSet + 17;
        var FileHeader_t = {
          "FileHeader" : {
              "FileFormatVersionNumber" : FileFormatVersionNumber[0],   
              "FileSequenceNumber"      : FileSequenceNumber[0],   // 2 bytes
              "ServiceProviderID "      : ServiceProviderID[0],
              "EquipmentID"             : EquipmentID[0],
              "DateandTime"             : utils.dateFormat(DateandTime[0]),
              "LocationCode"            : LocationCode[0],
              "NumberofMessages"        : NumberofMessages[0]
          }
        }
        var tdTemp = FileHeader_t;
        var txnObjs = { "TransactionInformations" :  [""]} ;
        // Transaction message 
        if ( NumberofMessages != 0 ) {
            // loop pr
            for( var count = 0 ; count < NumberofMessages ; count++ ) {
                var tdLength   = new Uint16Array(buffer.slice(offSet+9,   offSet+11)); // 1+4+4
                var tdType     = new Uint8Array (buffer.slice(offSet+11,  offSet+12)); // 1+4+4
                console.log("start message Type = " + tdType + " ,Length = " + tdLength);
                // make a arrayBuffer for Td Type//
                var txnDetails = buffer.slice(offSet, offSet + tdLength[0]);
                var outMessages = bpltd.tdnmessage(tdType[0], txnDetails);
                txnObjs.TransactionInformations[count] = outMessages;
                offSet = offSet + tdLength[0];
                outMessages = "";
            }
        }
        // sections 4.5  File Trailer 
        var crc32 = new Uint32Array(buffer.slice(offSet, offSet+4)); // 4 bytes
        var checkSum32 = { 
          "FileTrailer " : {
              "CRC32"     : crc32[0]
              //"CRC32"  : arrayBufferToHex(buffer.slice(offSet, offSet+4))
          }
        };
        tdTemp = Object.assign(tdTemp, txnObjs, checkSum32);
        //console.log(JSON.stringify(tdTemp,null,2));
        var outJson = JSON.stringify(tdTemp,null,2);
        return outJson + "\r\n" ;
          //+ "All Data : " + AllHexFileHeader;
    },
    process(files){
      this.wrongFile = false
      // allows only 1 file
      if (files.length === 1) {
        var file = files[0];
        var lengthOfFile = file.size;
        var fileName = file.name
        //console.log(files);
        //console.log("file path : " + file.path);
        //console.log("only file name : " + fileName);
        //console.log("file length : " + lengthOfFile);
        //if (file.type.indexOf('') >= 0) {
          var reader = new FileReader();
          reader.onload = f => {
            var arrayBuffer = f.target.result;
            //console.log(arrayBuffer);
            var data = this.dumpTd(arrayBuffer);
            this.textSource = fileName + "\r\n" + "------------------------------------------" 
                          + "\r\n" + data; //tdDump(arrayBuffer);
            this.isDragging = false;
          }
          reader.readAsArrayBuffer(file);
       // }else{
       //   this.wrongFile = true
       //   this.textSource = null
       //   this.isDragging = false
       // }
      }
    }

    
  }
}
</script>



<style scoped>
.drop{
  width: 100%;
  height: 100%;
  background-color: #eee;
  border:10px solid #eee;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  transition: background-color .2s ease-in-out;

  font-family: sans-serif;
}

.isDragging{
  background-color: #999;
  border-color: #fff;
}

textarea{
  width: 100%;
  height: 100%;
  object-fit: contain;
  resize: none;
}

input[type="file"]{
  display: none;
}

label{
  text-decoration: underline;
}
</style>
