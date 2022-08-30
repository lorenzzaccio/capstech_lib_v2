/*function compare_array(a,b){
	const not_found_arr=[];
	for(let i in a){
		let b_found=true;
		for(let j in b){
			if(a[i]===b[j]){
			 b_found=true;break;
			}else
				b_found=false; 
		}
		if(!b_found) not_found_arr.push(a[i].split(";")[0]);
	}
	return not_found_arr;
}*/

//check that rows in a, are in b
/*
function is_id_in_array(a,b){
	const not_found_arr=[];
	for(let i in a){
		let b_found=false;
		for(let j in b){
			if(a[i].split(";")[0]===b[j].split(";")[0]){
			 b_found=true;break;
			}
		}
		if(!b_found) not_found_arr.push(a[i]);
	}
	return not_found_arr;
}

function is_modified_in_array_back(a,b){
	const not_found_arr=[];
	for(let i in a){
		let b_found=true;
		let modified_row="";
		for(let j in b){
			if(a[i].split(";")[0]===b[j].split(";")[0]){
				if(a[i]===b[j]){
			 		b_found=true;break;
			 	}else{
			 		b_found=false;
			 		modified_row=b[j];
			 	} 
			}
		}
		if(!b_found) not_found_arr.push([a[i].split(";")[0],modified_row,i]);
	}
	return not_found_arr;
}
function is_modified_in_array_back1(a,b){
	let a_rev = a.reverse();
	let res_arr = {};
	let sup = {};let mod = {};let add = {};
	sup.data = [];mod.data = [];add.data = [];
	for(let i in a_rev){
		!b[i] ?
			sup.data.push(a_rev[i])
			: 
			(a_rev[i] !== b[i]) ? 
				mod.data.push(b[i]) 
				: 
				"";
	}

	for(let i in b){
		!a_rev[i] ? 
			add.data.push(b[i])
			: "";
	}
	res_arr.sup = sup;
	res_arr.add = add;
	res_arr.mod = mod;
	return res_arr;
}
*/
function mappize(a){
	let arr=new Map();
    a.map(
    	row=>{
    		arr.set(row.split(";")[0],row);
		}
	);
	return arr;
}

function is_modified_in_array(a,b){
	let map_a = mappize(a);
	let map_b = mappize(b);
	let res_arr = {};
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

function update_buffer_row(id,row){

}