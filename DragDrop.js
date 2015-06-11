<!DOCTYPE html>
<html>
<style>
#drop-zone { width: 100%; height: 200px; border: 1px dashed #cca; border-radius: 5px; }
</style>

<script>
var DragDrop = {
  //targetElement : null,

  init : function (elementSelector) {
    window.addEventListener(
      "load",
      function () {
        var dropZone = document.querySelector(elementSelector);
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
          function(evt) { DragDrop.handleDrop(evt); },
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
  handleDrop : function(evt) {
    this.disableDefaultActions(evt);
    alert (evt.dataTransfer.files.length);
  }
};

DragDrop.init("#drop-zone");
</script>

<body>

<div id="drop-zone"></div>

</body>
</html>
