
onmessage = function(e) {

  let cmd = e.data[0];
  
  if(cmd==="search"){
    console.log('Worker: starting search ');
    arg1 = e.data[1];
    arg2 = e.data[2];
    arg3 = e.data[3];
    /*await*/ search(arg1,arg2,arg3);
  }

  if(cmd==="init"){
    console.log('Worker: init completed');
    postMessage(['init']);
  }
}

async function search(occurrence,tableau){
        var d1_arr = [];
        if(tableau === undefined) return;
        postMessage(["traitement de "+tableau.length+" lignes"]);
        if(occurrence){

            for(const row in occurrence){
                let occ = occurrence[row];//occurrence[0];
                if(occ.split("=>").length>1){
                    
                    const cond={
                        index:parseInt(occ.split("=>")[0]),
                        val:occ.split("=>")[1]
                    };
                    tableau = await filter_lines_by_col(tableau,occurrence,d1_arr,cond);
                }else{
                    const res = tableau.filter((row)=>(JSON.stringify(row).toLowerCase().indexOf(occ.toLowerCase())!==-1))
                    tableau=res;
                    //await filter_lines(tableau,occurrence,d1_arr);
                }
            
            }
            if(tableau) d1_arr=tableau;
            postMessage(['search',order(d1_arr)]);
        }else
            postMessage(['search',order(tableau)]);
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function filter_lines_by_col(tableau,occurrence,d1_arr,cond) {
    var index = 0;
    var bMatch=true;
    postMessage(["démarrage filtrage de "+tableau.length+" lignes"]);
    d1_arr=tableau.filter(
        row=>cond.val.indexOf("*")!==-1?
        row[cond.index].indexOf(cond.val.split("*")[1])!==-1||row[cond.index].indexOf(cond.val.split("*")[0])!==-1:
        (row[cond.index])===(cond.val)
    );
    /*await asyncForEach(tableau, async (row) => {
        index++;
        bMatch=true;
        
        if(Array.isArray(occurrence)){
            var i=0;
            while(bMatch && i<occurrence.length){
                if(JSON.stringify(row).toLowerCase().indexOf(occurrence[i].toLowerCase())!==-1){
                    i++;
                }else
                    bMatch=false;
            }
            if(bMatch){
                d1_arr.push(row);
            }
        }else{
            if(JSON.stringify(row).toLowerCase().indexOf(occurrence.toLowerCase())!==-1){
                d1_arr.push(row);              
            }
        }
    });*/
    
    postMessage([d1_arr.length +" lignes trouvée(s)"]);
    return d1_arr;
}

async function filter_lines(tableau,occurrence,d1_arr) {
    var index = 0;
    var bMatch=true;
    postMessage(["démarrage filtrage de "+tableau.length+" lignes"]);
    await asyncForEach(tableau, async (row) => {
        index++;
        bMatch=true;
        if(Array.isArray(occurrence)){
            var i=0;
            while(bMatch && i<occurrence.length){
                if(JSON.stringify(row).toLowerCase().indexOf(occurrence[i].toLowerCase())!==-1){
                    i++;
                }else
                    bMatch=false;
            }
            if(bMatch){
                d1_arr.push(row);
            }
        }else{
            if(JSON.stringify(row).toLowerCase().indexOf(occurrence.toLowerCase())!==-1){
                d1_arr.push(row);              
            }
        }
    });
    
    postMessage([d1_arr.length +" lignes trouvée(s)"]);
}

function order(arr){
    const filtered_arr=[];
    while(arr.length>0){
        let col=arr.map(row=>parseInt(row[0]));
        let max_val = Math.max(...col);
        const max_index = col.findIndex(row=>row===max_val);
        filtered_arr.push(arr[max_index]);
        arr.splice(max_index,1);
    }
    return filtered_arr;
}

