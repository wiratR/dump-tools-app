<template>
  <div class="drop" 
    :class="getClasses" 
    @dragover.prevent="dragOver" 
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)">
      <!--<div class="md" v-html="md" v-if="textSource"></div>-->
      <textarea v-model="textSource" v-if="textSource"></textarea>
      <h1 v-if="wrongFile">Wrong file type</h1>
      <h1 v-if="!textSource && !isDragging && !wrongFile">Drop <label for="uploadmymarkdownfile">(or pick)</label> a pd file</h1>
      <input type="file" id="uploadmymarkdownfile" @change="requestUploadFile" />
  </div>
</template>

<script>
//import marked from 'marked';
import arrayBufferToHex from 'array-buffer-to-hex';
import * as utils from '../help/utils.js';
import * as bplcd from '../help/bplcd.js';

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
    //,
    //md(){
    //  return marked(this.textSource)
    //}
  },
  methods:{
    dragOver(){
      this.isDragging = true
    },
    dragLeave(){
      this.isDragging = false
    },
    drop(e){
      let files = e.dataTransfer.files
      this.process(files)
    },

    requestUploadFile(){
      var src = this.$el.querySelector('#uploadmymarkdownfile')
      let files = src.files
      this.process(files)
    },
    process(files){
      this.wrongFile = false
      // allows only 1 file
      if (files.length === 1) {
        var file = files[0];
        var lengthOfFile = file.size;
        var fileName = file.name;
        var arr = fileName.split('.');
        var extension = arr[(arr.length)-1];
        //console.log("extention : " + extension);

        if ( ( extension === "PUR" ) || (extension === "SYS")) {
            // get file Type
            var pdFileName = arr[0];
            var cutArray   = pdFileName.split('_');
            var pdType     = cutArray[(cutArray.length)-1];
            console.log("pdType : " + pdType);
            if ( !bplcd.isValidPdType(pdType) ) {
                console.log("File isValid PdType format");
                this.wrongFile = true
                this.textSource = null
                this.isDragging = false
            }else{
                //var parameterId = bplcd.getPdTypeId(pdFileName);
                var reader = new FileReader();
                reader.onload = f => {
                  var arrayBuffer = f.target.result;
                  console.log(arrayBuffer);
                  //var data = this.dumpPd(pdFileName, arrayBuffer);
                  var pdTemp = bplcd.dumpPd(arrayBuffer);
                  var data = JSON.stringify(pdTemp,null,4);
                  console.log(data);
                  this.textSource = fileName + "\r\n" + "------------------------------------------" 
                                + "\r\n" + data; //tdDump(arrayBuffer);
                  //this.textSource = data;
                  this.isDragging = false;
                }
                reader.readAsArrayBuffer(file);
            }
        }else{
            console.log("File wrong format");
            this.wrongFile = true
            this.textSource = null
            this.isDragging = false
        }
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
/*
.md{
  width: 100%;
  height: 100%;
  object-fit: contain;
  resize: none;
  overflow: hidden;
  overflow-y: auto;
}
*/
input[type="file"]{
  display: none;
}

label{
  text-decoration: underline;
}
</style>
