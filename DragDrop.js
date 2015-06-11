<!DOCTYPE html>
<html>
<style>
#drop-zone { width: 100%; height: 200px; border: 1px dashed #cca; border-radius: 5px; }
</style>

<script>
var DragDrop = {
  
  init : function (dropZoneSelector, resultZoneSelector) {
    window.addEventListener(
      "load",
      function () {
        var dropZone = document.querySelector(dropZoneSelector);
        if (dropZone == null) {
          console.log("Error: dropZone is null");
          return;
        }
        dropZone.addEventListener(
          "dragenter",
          function(evt) { DragDrop.handleDragEnter(evt); },
          false 
        );
        dropZone.addEventListener(
          "dragover",
          function(evt) { DragDrop.handleDragOver(evt); },
          false 
        );
        dropZone.addEventListener(
          "dragleave",
          function(evt) { DragDrop.handleDragLeave(evt); },
          false 
        );
        dropZone.addEventListener(
          "drop",
          function(evt) { DragDrop.handleDrop(evt, resultZoneSelector); },
          false 
        );
      },
      false
    );    
  },

  disableDefaultActions : function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  },
  
  handleDragEnter : function(evt) {
    this.disableDefaultActions(evt);
    evt.target.style.borderColor = "red";
  },
  
  handleDragOver : function(evt) {
    this.disableDefaultActions(evt);
    evt.dataTransfer.dropEffect = "copy";
  },
  
  handleDragLeave : function(evt) {
    this.disableDefaultActions(evt);
    evt.target.style.borderColor = "#cca";
  },
  
  handleDrop : function(evt, resultZoneSelector) {
    this.disableDefaultActions(evt);
    var file = evt.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(resultZoneSelector).innerHTML =  e.target.result;
    };
    reader.readAsText(file);
  }
};

DragDrop.init("#drop-zone", "#result-zone");
</script>

<body>

<div id="drop-zone"></div>
<div><pre id="result-zone"></pre></div>

</body>
</html>
