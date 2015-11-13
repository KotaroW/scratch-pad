/********************
??? ? ??? ? @
*********************/

function BaseObj ( _baseVal ) {
  var baseVal = _baseVal;

  return {
    getVal : function () { return baseVal; },
    setVal : function ( _newBaseVal ) { baseVal = _newBaseVal; }
  };
  
}

function ChildObj ( _baseVal, _childVal ) {
  var childVal = _childVal;
  var baseObj = BaseObj ( _baseVal );

  return {
    baseObj : baseObj,
    getVal : function () { return childVal; },
    setVal : function ( _newChildVal ) { childVal = _newChildVal; }
  }
  
}
