function compare_array(a,b){
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
}

//check that rows in a, are in b
function is_id_in_array(a,b){
	const not_found_arr=[];
	for(let i in a){
		let b_found=true;
		for(let j in b){
			if(a[i].split(";")[0]===b[j].split(";")[0]){
			 b_found=true;break;
			}else
				b_found=false; 
		}
		if(b===undefined) b_found=false;
		if(!b_found) not_found_arr.push(a[i]);
	}
	return not_found_arr;
}
/* 
a = tableau local
b = db
si b ligne différent de a ligne => modifie a
si b ligne n'est pas dans a => ajoute à a
si a ligne n'est pas dans b => supprime de a
*/
function is_modified_in_array(a,b){
	const a_add_arr = [],a_modified_arr = [],a_suppress_arr = [];
	a=(Array.isArray(a[0]))?a:a.map((row)=>row.split(";"));
	b=(Array.isArray(b[0]))?b:b.map((row)=>row.split(";"));
	//extract ids.
	let a_ids = a.map((row)=>row[0]);
	let b_ids = b.map((row)=>row[0]);
	let b_index = 0;
	for(let b_id of b_ids ){
		const a_index = a_ids.findIndex((row)=>row===b_id);
		(a_index===-1)?
			a_add_arr.push([b_id,b[b_index]])
			:
			(a[a_index].join(";")!==b[b_index].join(";")?
				a_modified_arr.push(b[b_index])
				:
				"");
		b_index++;
	}

	for(let a_id of a_ids ){
		const b_index = b_ids.findIndex((row)=>row===a_id);
		(b_index===-1)?
			a_suppress_arr.push(a_id)
			:"";
	}
	console.log("end compare array");
	return [a_add_arr,a_modified_arr,a_suppress_arr];
}

function update_buffer_row(id,row){

}
