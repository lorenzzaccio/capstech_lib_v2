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
		if(!b_found) not_found_arr.push(a[i]);
	}
	return not_found_arr;
}

function is_modified_in_array(a,b){
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

function update_buffer_row(id,row){

}