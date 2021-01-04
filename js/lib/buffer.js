/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Buffer(buffer){
    if(buffer){
        this.buffer=this.verify(buffer);
        this.length=buffer.length;
    }
}

Buffer.prototype.verify=function(buffer){
    var i;
    if(!buffer) return null;
    for( i=0;i<buffer.length;i++){
        if(!Array.isArray(buffer[i])){
            if((buffer[i]!==null)&&(buffer[i] !== undefined)){
                buffer[i]=buffer[i].split(";");
            } 
        }
    }
    return buffer;
}
Buffer.prototype.empty=function(){
    this.buffer=[];
};

Buffer.prototype.push=function (buffer){
    var tmp_buffer=this.verify(buffer);
    return this.buffer = this.buffer.concat(tmp_buffer);
};

Buffer.prototype.getBuffer=function (){
    return this.buffer;
};

Buffer.prototype.setValue=function (val,row,col){
    this.buffer[row][col]=val;
};

Buffer.prototype.getRow=function(index){
    if(index<this.buffer.length)
    return this.buffer[index];
    else
    return null;
};
Buffer.prototype.toString=function(){
    const arr = this.buffer.map( (line)=>line.join(";"));
    return arr.join("||");
}

Buffer.prototype.filter=function(col,val){
    var buffer = this.buffer;
    for(var i =0;i<buffer.length;i++){
        if(buffer[i]===null) continue;
        var row = buffer[i];
        //console.log(row);
        var rowLength = row.length;
        var arrow;
        
        if(!Array.isArray(row))
            arrow=this.buffer[i].split(";");
        else
            arrow=row;
        
        if(parseInt(arrow[col])===val)
            return arrow;
    }
    return null;
};

Buffer.prototype.filterIndex=function(col,val){
    var buffer = this.buffer;
    for(var i =0;i<buffer.length;i++){
        if(buffer[i]===null) continue;
        var row = buffer[i];
        console.log(row);
        var rowLength = row.length;
        var arrow;
        if(!Array.isArray(row))
            arrow=this.buffer[i].split(";");
        else
            arrow=row;
        
        if(parseInt(arrow[col])===parseInt(val))
            return i;
    }
    return null;
};

Buffer.prototype.add=function(row){
    this.buffer.push(row);
}

Buffer.prototype.remove=function(row_index){
    this.buffer.splice(row_index,1);
}

Buffer.prototype.arr_add=function(arr){
    var buffer = this.buffer;
    arr.forEach(function(row){
        buffer.push(row);
    });
}