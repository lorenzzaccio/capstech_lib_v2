var availableTagsArticleList="";
var inputIdArticle="#valueEnter"; //default
var listDataArticle;
var m_callbackArticle="displayArticleList(this)";



function searchArticleList(obj,callback){
    if(callback!==0)
        m_callbackArticle = callback;
    inputIdArticle = "#"+obj.getAttribute('id');
    listDataArticle = "#list"+obj.getAttribute('id');
    $(listDataArticle).empty();
    searchArticle();
}

function searchArticleList2(id,callback){    
    if(callback!==0)
        m_callbackArticle = callback;
    inputIdArticle = "#"+id;
    listDataArticle = "#list_"+id;
    $(listDataArticle).empty();
    searchArticle();
}

function displayArticleList(obj){
    $(listDataArticle).empty();
    var article = obj.value;
    var arr =  [];
    arr.push(article);
    getJsonArticleInfo(arr);
}

function searchArticle(){
    var valueIdName = $(inputIdArticle).val();
    matchInArticleListArray(valueIdName, availableTagsArticleList);
}
function removeCompletionList(){
     $(listDataArticle).empty();
}
function matchInArticleListArray(string, expressions) {
    var valueId="";
    var len = expressions.length,
        i = 0;
     $(listDataArticle).empty();   
    var searchTxt = string.toLowerCase();
    if(searchTxt.trim()==="")
        return;
    for (; i < len; i++) {
        var line = expressions[i].toLowerCase();
        
        if (line.includes(searchTxt)) {
            //valueId+='<button class="btn btn-warning btn-block" data-dismiss="modal" onclick="'+m_callbackArticle+'" value="' + expressions[i] + '">' + expressions[i] + '</button><BR>';
            valueId += '<option  value="'+expressions[i]+'">' + expressions[i] + '</option>';
        }
    }
    $(listDataArticle).append(valueId);
};
function set_article_list_bck(buffer){
    availableTagsArticleList=buffer;
};

async function fecth_data_article(){
    //Loader.show();
    let response = await getJsonArticleListTask();
    availableTagsArticleList = response.groups;
    localStorage.setItem("list_article",availableTagsArticleList);
    //Loader.log("liste article téléchargée");
    //Loader.hide();
}

async function fecth_desc_article(){
    //Loader.show();
    let response = await getFullArticleTask("0,1,2,3");
    //availableTagsArticleList = response.groups;
    localStorage.setItem("list_article",response.groups);
    //Loader.log("liste article téléchargée");
    //Loader.hide();
}

