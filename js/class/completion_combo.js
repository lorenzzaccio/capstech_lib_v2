class completion_combo{
    constructor(callback,obj){
        this._callback  = callback || "disp(this)";
        this._input_id = "#"+obj.getAttribute('id')||"#valueEnter";
        this._listData = "#list"+obj.getAttribute('id');
        $(listData).empty();
        search();
    }

    search() {
        matchInArray($(this._input_id).val(), this._availableTagsList);
    }

    matchInArray(string, expressions) {
        var valueId = "";
        var len = expressions.length,
                i = 0;
        $(this._listData).empty();
        var searchTxt = string.toLowerCase();
        if (searchTxt.trim() === "")
            return;
        for (; i < len; i++) {
            var line = expressions[i].toLowerCase();
    
            if (line.includes(searchTxt)) {
                valueId += '<option  value="'+expressions[i]+'">' + expressions[i] + '</option>';
            }
        }
        $(this._listData).append(valueId);
    };

    disp(obj) {
        $(this._listData).empty();
        var arr = [];
        arr.push(obj.value);
        getJsonClientInfo(arr);
    }

    removeCompletionList() {
        $(this._listData).empty();
    }

    set_list_bck(buffer){
        this._availableTagsList=buffer;
    }
    
    async fecth_data_client(){
        let response = await getJsonClientListTask();
        this._availableTagsList = response.groups;
    }
}








