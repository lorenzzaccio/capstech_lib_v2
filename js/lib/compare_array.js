function mappize(a){
	let arr=new Map();
	if(a.length<=0) return;
	//check separator
	const sep = (a[0].split(";").length)>(a[0].split(",").length)?";":",";
	try{
    a.map(
    	row=>{
    		row&&arr.set(row.split(sep)[0],row);
		}
	);
	return arr;
	}catch(e){
		console.log(JSON.stringify(arr));
	}
}

function mappize_obj(a){
	let data=[];
	for (let row of a)
		data.push(Object.keys(row).map(function(k){return row[k]}).join(";"));
	return data;
}

function is_modified_in_array(a,b){
	let map_a = a && mappize( (!Array.isArray(a[0])&&(typeof a[0] === 'object'))?mappize_obj(a):a );
	let map_b = b && mappize( (!Array.isArray(b[0])&&(typeof b[0] === 'object'))?mappize_obj(b):b );
	let res_arr = {};
	if(!map_a) {
		res_arr = b;
		return res_arr;
	}

	/*if(!map_a) map_a=mappize_obj(a);
	if(!map_b) map_b=mappize_obj(b);*/
	
	let sup = {};let mod = {};let add = {};
	sup.data = [];mod.data = [];add.data = [];

	for(const [id, row_a] of map_a){
		
		map_b.has(id) ?
		row_a!==map_b.get(id) ? mod.data.push(map_b.get(id)) : ""
		:
			sup.data.push(row_a);
	}
	for(const [id, row_b] of map_b){
		map_a.has(id) ? "":add.data.push(row_b);
	}
	res_arr.sup = sup;
	res_arr.add = add;
	res_arr.mod = mod;
	return res_arr;
}

function is_modified_in_array_for_id(a,b,id){
	let map_a = mappize(a);
	let map_b = mappize(b);
	let res_arr = {};
	let sup = {};let mod = {};let add = {};
	sup.data = [];mod.data = [];add.data = [];

	//for(const [lcl_id, row_a] of map_a){
		map_b.has(id) ?
		map_a.get(id)!==map_b.get(id) ? mod.data.push(map_b.get(id)) : ""
		:
			sup.data.push(map_a.get(id));
	//}
	//for(const [id, row_b] of map_b){
		map_a.has(id) ? "":add.data.push(map_b.get(id));
	//}
	res_arr.sup = sup;
	res_arr.add = add;
	res_arr.mod = mod;
	return res_arr;
}

function update_buffer_row(id,row){

}