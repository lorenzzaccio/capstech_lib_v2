Array.prototype.assoc_push = function( key, val ) {
    var obj = {};
    obj[ key ] = val;
    this.push( obj );
    return this;
};