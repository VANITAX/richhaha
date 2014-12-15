function Dramanita(){
  this.objectLength = function(object){
    var counter = 0;
    for( key in object){
      counter = counter + 1;
    };
    return counter;
  } ;
}