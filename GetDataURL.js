/********************************************************************************
 * file: GetDataURL.js
 * description:
 *    generates the data url for an image file.
 ********************************************************************************/

/* function factory */
var DataURLFactory = (function (f) {
  var file = f;
  // add or remove image extensions as needed.
  var allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  return {
    checkFileType : function () {
      var filename = f.name;
      /* a straight-forward reg expression. */
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
        /* the result could be displayed by alert or textarea. */
        prompt ("Data URL", evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
});

/* this function may be invoked by any events you wish.  */
function getFile() {
  var files = document.querySelector("input[type=file]").files;
  /* check to see if at least one file has been selected. */
  if (!files.length) {
    alert ("Please select a file");
    return;
  }
  /* if there is a file, call the function factory. */
  var dataURLGetter = DataURLFactory(files[0]);
  /* only image files are acceptable. */
  if (dataURLGetter.checkFileType()) {
    dataURLGetter.getDataURL();
  }
  else {
    alert ("Image file, please.");
    return;
  }
}
