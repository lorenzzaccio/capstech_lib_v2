function load_html(id,load_id){
    //load external files
    var doc = document.querySelector('link[load_id="'+load_id+'"]').import;
    // Grab DOM from html's document.
    var text = doc.querySelector(id);
    document.body.appendChild(text.cloneNode(true));
}

function load_html_to(id,load_id,target_id){
    //load external files
    var doc = document.querySelector('link[load_id="'+load_id+'"]').import;
    // Grab DOM from html's document.
    var text = doc.querySelector(id);
    var target = document.querySelector(target_id);
    var clone = text.cloneNode(true);
    $(target).empty();
    target.appendChild(clone);
}

function load_full_html(id){
    //load external files
    //var doc = document.querySelector('link[rel="import"]').import;
    // Grab DOM from html's document.
    var content = document.querySelector('link[rel="import"]').import;
    // Clone the <template> in the import.
    var template = content.querySelector('template');

    
    //var text = doc.querySelector(id);
    var clone = document.importNode(template.content, true);
    document.querySelector('#loc_content').appendChild(clone);
}