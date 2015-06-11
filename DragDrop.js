/*******************************************************
 * file: DragDrop.js
 * date: 11 June, 2015
 * version: beta
 * description:
 *    file drag and drop example
*******************************************************/
var DragDrop = {
  /*
  Parameters:
    dropZoneSelector-> html element on which file is dropped.
    resultZoneSelector -> html element where the results are displayed
  */
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
