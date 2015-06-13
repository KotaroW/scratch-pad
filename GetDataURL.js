var DataURLFactory = (function (f) {
  var file = f;
  var allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  return {
    checkFileType : function () {
      var filename = f.name;
      for (var iii = 0; iii < allowedExtensions.length; iii++) {
        var pattern = new RegExp("^.+\." + allowedExtensions[iii] + "$", "i");
        if (pattern.test(filename))
          return true;
      }
      return false;
    },
    getDataURL : function () {
      var reader = new FileReader();
      reader.onload = function (evt) {
        prompt ("Data URL", evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
});

function getFile() {
  var files = document.querySelector("input[type=file]").files;
  if (!files.length) {
    alert ("Please select a file");
    return;
  }
  var dataURLGetter = DataURLFactory(files[0]);
  if (dataURLGetter.checkFileType()) {
    dataURLGetter.getDataURL();
  }
  else {
    alert ("Image file, please.");
    return;
  }
}
