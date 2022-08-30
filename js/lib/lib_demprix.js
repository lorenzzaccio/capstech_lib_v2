function init_input(input_id){
    document.querySelector('#'+input_id).addEventListener('keyup',(e)=>{
      update_sql(e,"demandePrix",input_id);
   });
  }
function update_sql(e,table,field){
          let formatted_new_val=encodeURIComponent(e.target.value.trim());
          let id = (e.target).parentNode.parentElement.getAttribute('data-cond')||(e.target).parentNode.getAttribute('data-cond');
          sql_update_node(table,field,(formatted_new_val),id);
  }
  function autoresize(textarea) {
    textarea.style.height = '0px';     //Reset height, so that it not only grows but also shrinks
    textarea.style.height = (textarea.scrollHeight+10) + 'px';    //Set new height
}



