//var availableTagsList = "";
var inputId="#valueEnter"; //default
var listData;
var m_callback="disp(this)";
/*function searchClientList(obj,callback) {
    if(callback!==0)
        m_callback = callback;
    else
        m_callback="disp(this)";
    inputId = "#"+obj.getAttribute('id');
    listData = "#list"+obj.getAttribute('id');
    $(listData).empty();
    search();
}

function searchClientList2(id,callback){
    if(callback!==0)
        m_callback = callback;
    inputId = "#"+id;
    listData = "#list_"+id;
    $(listData).empty();
    search();
}

function disp(obj) {
    $(listData).empty();
    var client = obj.value;
    var arr = [];
    arr.push(client);
    getJsonClientInfo(arr);
}*/
/*
function search() {
    var valueIdName = $(inputId).val();
    matchInArray(valueIdName, availableTagsList);
}*/
function removeCompletionList() {
    $(listData).empty();
}
function matchInArray(string, expressions) {
    var valueId = "";
    var len = expressions.length,
            i = 0;
    $(listData).empty();
    var searchTxt = string.toLowerCase();
    if (searchTxt.trim() === "")
        return;
    for (; i < len; i++) {
        var line = expressions[i].toLowerCase();

        if (line.includes(searchTxt)) {
            valueId += '<option  value="'+expressions[i]+'">' + expressions[i] + '</option>';
        }
    }
    $(listData).append(valueId);
};
/*
function set_client_list_bck(buffer){
    availableTagsClientList=buffer;
}*/

 async function fecth_data_completion(funcTask){
    let response = await funcTask();
    return response;
}