/**
 * TODO
 */
var JsonML = function(){
  this.path = [];
  this.index = 0;

  this.document = [];
  this.active = this.document;
}


/**
 * TODO
 */
JsonML.prototype.get = function(){
  var x = this.document;

  var depth = 0;
  var i;

  var position, nextPos;

  while (arguments.hasOwnProperty(depth)) {
    position = arguments[depth];

    if (typeof position == 'number') {
      nextPos = position;

      if (x.length <= nextPos) {
        return undefined;
      }

      x = x[nextPos];
    } else if (Array.isArray(position)) {
      for (i=0; i<position.length; i++) {
        nextPos = position[i];

        if (x.length <= nextPos) {
          return undefined;
        }

        x = x[nextPos];
      }
    } else {
      return undefined;
    }

    depth++;
  }

  return x;
}


/**
 * TODO
 */
JsonML.prototype.position = function(){
  var pos = [];

  var i;
  for (i=0; i<this.path.length; i++) {
    pos.push(this.path[i])
  }

  pos.push(this.index);

  return pos;
}


/**
 * TODO
 */
JsonML.prototype.open = function(){
  this.active.push(new Array());

  this.path.push(this.active.length-1);
  this.index = 0;

  this.active = this.get(this.path);

  return this.active;
}


/**
 * TODO
 */
JsonML.prototype.close = function(){
  // +1 because the cursor now points to the position AFTER
  // the closed Array.
  this.index = this.path.pop() + 1;

  this.active = this.get(this.path);
  return this.active;
}


/**
 * TODO
 */
JsonML.prototype.add = function(data){
  this.active.push(data);
  this.index = this.active.length;

  return this;
}


exports.JsonML = JsonML;
