/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function init_loading(id){
    $( document ).on('ajaxStart',function(){
        $('#'+id).addClass("loading");
        //console.log("event ajaxstart triggered " + debug_index);
    });
    $( document ).on('ajaxStop',function(){
        $('#'+id).removeClass("loading");
        //console.log("event ajaxstop triggered " + debug_index);
    });
};