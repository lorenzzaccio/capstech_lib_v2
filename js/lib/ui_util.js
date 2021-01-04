/*function init_date_picker(el_id,cbk){
    $( el_id).datepicker();
    $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
     $( el_id).datepicker( "option", "dateFormat", "yy-mm-dd");
     if(cbk){
	     $(el_id).on( "change", function() {
	     	cbk();
	     });
 	}
}

function today(){
    var lcl_date = new Date();
    var day_in_year = get_day_in_year(lcl_date);
    lcl_date = (lcl_date.toISOString()).split("T")[0];
    return lcl_date;
}
function get_day_in_year(date){
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}
*/
function init_date_picker(el,cbk){
    let el_id = document.getElementById(el) || el;
    $(el_id).datepicker();
    $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
     $( el_id).datepicker( "option", "dateFormat", "yy-mm-dd");
     if(cbk){
         $(el_id).on( "change", function() {
            cbk();
         });
    }
}
/*
function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}*/


function today(){
    var lcl_date = new Date();
    var day_in_year = get_day_in_year(lcl_date);
    lcl_date = (lcl_date.toISOString()).split("T")[0];
    return lcl_date;
}
function get_day_in_year(date){
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}