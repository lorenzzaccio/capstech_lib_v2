async function seq_load_libs(){
    const libs = [
    //{src:"../../capstech_lib_v2/js/lib/lib/bootstrap.min.441.css"},
    {src:"../../capstech_lib_v2/js/lib/lib/jquery-3.4.1.min.js"},
    {src:"../../capstech_lib_v2/js/lib/lib/jquery-ui.min.js"},
        {src:"../../capstech_lib_v2/js/lib/lib/bootstrap.bundle.js"},
        {src:"../../capstech_lib_v2/js/lib/lib/notify.min.js"},
       {src:"https://unpkg.com/idb/build/iife/index-min.js"},
        //{src:"https://cdn.jsdelivr.net/npm/idb@6.1.3/build/cjs/index.min.js"},
        //{src:"https://cdn.jsdelivr.net/npm/idb@6.1.3/with-async-ittr.js"},
        {src:"../../capstech_lib_v2/js/lib/service.js"},
        {src:"../../capstech_lib_v2/js/lib/check_connection.js"},
        {src:"../../capstech_lib_v2/js/lib/check_db_connection.js"},
        {src:"../../capstech_lib_v2/js/lib/swiper.js"},
        {src:"../../capstech_lib_v2/js/lib/_init_lib.js"},
        {src:"../../capstech_lib_v2/js/lib/form_util.js"},
        {src:"../../capstech_lib_v2/js/lib/index_db.js"},
        {src:"../../capstech_lib_v2/js/lib/storage.js"},
        {src:"../../capstech_lib_v2/js/lib/index_db_worker.js"},
        {src:"../../capstech_lib_v2/js/lib/storage_worker.js"},
        {src:"../../capstech_lib_v2/js/class/_status.js"},
        {src:"../../capstech_lib_v2/js/class/html_fw.js"},
        {src:"../../capstech_lib_v2/js/class/_list_of_class.js"},
        {src:"../../capstech_lib_v2/js/class/parameters.js"},
        {src:"../../capstech_lib_v2/js/class/config_class.js"},
        {src:"../../capstech_lib_v2/js/class/dynamic_scroll.js"},
        {src:"../../capstech_lib_v2/js/class/filter_class.js"},
        {src:"../../capstech_lib_v2/js/class/Row_element.js"},
        {src:"../../capstech_lib_v2/js/class/modal.js"},
        {src:"../../capstech_lib_v2/js/class/simple_modal.js"},

        {src:"../../capstech_lib_v2/js/class/_list_of_nn_tp.js"},
        {src:"../../capstech_lib_v2/js/class/_table_row.js"},
        {src:"../../capstech_lib_v2/js/class/_sub_row.js"},
        {src:"../../capstech_lib_v2/js/class/global_const.js"},
        {src:"../../capstech_lib_v2/js/class/Loader_class.js"},
        {src:"../../capstech_lib_v2/js/class/Lib_row.js"},
        {src:"../../capstech_lib_v2/js/lib/loading.js"},
        {src:"../../capstech_lib_v2/js/lib/lib/jquery_ext.js"},
        {src:"../../capstech_lib_v2/js/lib/libTime.js"},
        {src:"../../capstech_lib_v2/js/lib/timer.js"},
        {src:"../../capstech_lib_v2/js/lib/buffer.js"},
        {src:"../../capstech_lib_v2/js/lib/raw_ui.js"},
        {src:"../../capstech_lib_v2/js/lib/ui_util_combo.js"},
        {src:"../../capstech_lib_v2/js/lib/modalWnd.js"},
        {src:"../../capstech_lib_v2/js/lib/detail_page.js"},
        {src:"../../capstech_lib_v2/js/lib/completionClient.js"},
        {src:"../../capstech_lib_v2/js/lib/completionArticle.js"},
        {src:"../../capstech_lib_v2/js/lib/completion.js"},
        {src:"../../capstech_lib_v2/js/lib/pagination.js"},
        {src:"../../capstech_lib_v2/js/lib/sidenav_menu.js"},

        {src:"../../capstech_lib_v2/js/class/detail_wnd_class.js"},

        {src:"../../capstech_lib_v2/js/lib/toggle_menu.js"},
        {src:"../../capstech_lib_v2/js/lib/sticky_header.js"},
        {src:"../../capstech_lib_v2/js/lib/bootstrap.modal.wrapper.js"},
        {src:"../../capstech_lib_v2/js/lib/import_html.js"},
        {src:"../../capstech_lib_v2/js/lib/ui_util.js"},
        {src:"../../capstech_lib_v2/js/lib/ext/ui_lib.js"},
        {src:"../../capstech_lib_v2/js/lib/compare_array.js"}
    ];




    for(const lib in libs){
        await inject_lib(libs[lib]);
    }
    return true;
}

async function inject_lib(nextLib){
    return new Promise((resolve,reject)=>{
    var headTag = document.getElementsByTagName('head')[0];
        
        //create a script tag with this library
        var scriptTag = document.createElement('script');

        scriptTag.src = nextLib.src;
        
        scriptTag.integrity=nextLib.integrity||"";
        scriptTag.crossOrigin=nextLib.crossorigin||"";
        
        scriptTag.onload = () => {console.log("loaded !!!");resolve("script");};
        scriptTag.onerror = () => {reject(new Error(`Script load error for ${scriptTag.src}`));};

        //append the script tag to the <head></head>
        headTag.appendChild(scriptTag);
        console.log("injecting: " + nextLib.src);
    });
}