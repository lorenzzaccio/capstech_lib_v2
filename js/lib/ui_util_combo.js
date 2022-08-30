function populate_combo(combo,arr1,arr2){
    $(combo).empty();
    if(Array.isArray(arr1) && arr2){
       arr1.forEach((el,index) => {$(combo).append('<option value="'+arr2[index]+'">'+el+'</option>');})
    }else{
       arr1.forEach(el => {$(combo).append('<option value="'+el+'">'+el+'</option>');})
   }
}