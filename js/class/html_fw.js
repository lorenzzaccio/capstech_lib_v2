var g_swipe_index = -1;
class _html_fw{
    constructor(id,title_bar,status_options){
        this._id=id;
        this._title_bar = title_bar;
        this._status_options = status_options;
        this.create_framework();
        this.create_ui();
        this.set_combo();
    }

    create_framework(){
        this._html_framework = {
            container:"fullContainer_"+this._id,
            ctrlTitleBar:"ctrlTitleBar_"+this._id,
            sub_ctrl_bar:"sub_ctrl_bar_"+this._id,
            sidenav:"sidenav_"+this._id,
            modals:"#modals",
            table_body_id:"tb_"+this._id,
            PAGINATION_BLOCK_ID:"#"+this._id+"_pagination_div",
            OVERLAY_ID:"overlay_"+this._id,
            STICKY_WND_ID:"sticky_"+this._id,
            CURRENT_PANEL : this._id+"_current_panel",
            COOK_DATE_DEB : this._id+"_date_deb",
            COOK_STATUS : this._id+"_status",
            COOK_COMBO_STATUS : this._id+"_combo_status",
            COOK_DATE_FILTER : this._id+"_date_filter",
            COOK_IP_SERVER : this._id+"_ipServer",
            COOK_SEARCH_LOFC : this._id+"_search",
            COOK_LOG : this._id+"_log",
            status_combo : this._id+"_status_combo",
            input_search : this._id+"_input_search",
            slider : this._id+"_slider",
            slider_lbl : this._id+"_slider_lbl",
            refresh_btn : "refresh_btn_"+this._id
        };
    }

    create_ui(){
        var swipe_name = this._id+"_swipe";
        this.add_container(swipe_name);
        this.add_panel(swipe_name);
        this.add_sidebar(swipe_name);
        this.set_title_page();
        this.set_title_bar();
        this.add_btn_sidebar(swipe_name);
        this.add_btn_add(swipe_name);
        this.add_filter_basic(swipe_name);
        this.add_filter(swipe_name);
        this.init_swipe();
        this.init_slider();
        this.init_slider_buttons();
        this.init_btn_slide();
    }

    toto(){
        this._html_framework._swiper.stop();
    }
    
    init_slider(){
        //$('#'+this._html_framework.slider).on('click,change',this.toto());
    }

    get_html_framework(){
        return this._html_framework;
    }

    set_title_page(){
        $('title').text(this._id);
    }

    set_title_bar(){
        $('.'+this._html_framework.sub_ctrl_bar+' .title_header').text(this._title_bar);
    }

    create_container(){
        return '<div class="'+this._html_framework.container+'" style="overflow:hidden">'+
                    '<header class="'+this._html_framework.ctrlTitleBar+' fixed-header">'+
                        '<div class="'+this._html_framework.sub_ctrl_bar+' outer" style="height:fit-content;text-align:center;">'+
                        '<div class="menu_bar">'+
                        '<div class="inner"><span class="title_header">Liste</span></div>'+
                        '</div>'+
                        '</div>'+
                    '</header>'+
            '</div>';
    }

    create_slider(){
        var slider = 
        '<div class="container_slider">'+
        '<input type="range" min="2007" max="2020" value="2007" step="1" class="slider" id="'+this._id+'_slider">'+
        '<output for="'+this._id+'_slider" id="'+this._id+'_slider_lbl">2007</output>'+
        '</div>';
        return slider;
    }

    add_container(swipe_name){
        $('.swiper-wrapper').prepend(
            this.swipify(swipe_name,this.create_container())
        );
    }

    add_sidebar(swipe_name){
        $('.'+swipe_name).prepend('<div id="sidebar" class="'+this._html_framework.sidenav+' sidenav_style"></div>');
    }

    add_btn_sidebar(swipe_name){
        $('.'+swipe_name).find('.menu_bar').append('<div class="inner"><a id="btnNavToggle" class="btn_sidebar fas fa-align-justify"></a></div>');
    }

    add_btn_add(swipe_name){
        $('.'+swipe_name).find('.menu_bar').append('<div class="inner"><a id="btnAdd" class="btn_add far fa-plus-square"></a></div>');
    }

    add_overlay(swipe_name){
        $('.'+swipe_name+' .outer').append(
            '<div id="overlay_"+'+this._id+'>'+
            '<img src="img/tenor.gif" class="overlay_img" />'+
            '<p id="download_progress" class="overlay_comment">Chargement en cours ...</p>'+
            '</div>'   
        );
    }

    add_filter_basic(swipe_name){
        console.log("swipe added : "+swipe_name);
        let html_slide_btn="";
        let index = 0;
        var swipe = this._html_framework._swiper;
        for(let key in ordered_slide_list){
            html_slide_btn +='<button id="btn_'+key.split("_")[1]+'" class="btn btn-success btn-sm btn-swipe">'+key.split("_")[1]+'</button>';
            index++;
        }
        $('.'+swipe_name).find('.menu_bar').append(
            '<div class="btn_bar">'+
            html_slide_btn +
            '</div>');
        $('.'+swipe_name).find('.menu_bar').append('<button id="refresh_btn_'+this._id+'"class="btn btn-success btn-sm" >refresh</button>');
    }

    add_filter(swipe_name){
        $('.'+swipe_name+' .outer').append(
            '<div class="filter_bar">'+
            '<select id="'+this._html_framework.status_combo+'"></select>'+
            '<input type="search"  placeholder="Search" class="'+this._html_framework.input_search+'">'+                                
            this.create_slider()+
            //this.create_label_slide()+
            '</div>'
            );
    }

    add_panel(swipe_name){
        $('.'+swipe_name+' header').after(this.create_panel());
    }

    create_panel(){
        var panel = 
                                '<div class="loader_div" style="display:none"><div class="loader" >'+
                                    '</div><textarea rows="3" cols="50" class="msg_loader">un message simple</textarea></div>'+
                                    '<div class="table-container" >'+//style="overflow:auto;height:-webkit-fill-available"
                                        '<table class="table table-filter">'+
                                            '<tbody id="'+this._html_framework.table_body_id+'"></tbody>'+
                                        '</table>'+
                                    '</div>'+
                                '</div>';
        return panel;
    };

    add_swipe_frame(){
        var swipe = '<div class="swiper-container">'+
            '<div class="swiper-wrapper">'+
                
            '</div>'+
        '</div>';
        $('body').prepend(swipe);
    }

    swipify(swipe_name,panel){
        var swipe = 
                //'<div class="swiper-slide '+swipe_name+'" style="background-color: #8934A1;  height: -webkit-fill-available;">'+
                '<div class="swiper-slide '+swipe_name+'" style="background-color: #8934A1; ">'+
                panel +
                '</div>';
        return swipe;
    }

    change_color_bar(color,color_text){
        $("."+this._html_framework.sub_ctrl_bar).css({"background-color":color});
        $("."+this._html_framework.sub_ctrl_bar).css({"color":color_text});
    }

    init_swipe(){

       this._html_framework._swiper = new Swiper('.swiper-container', {
                keyboardControl: true,
                threshold:50//,
                //loop:true
            });
       this.swipe_index=g_swipe_index++;
        $('.swiper-slide').css({width:'100%'/*,overflow: 'auto'*/});

        
    }

    set_combo(){
            this.change_color_bar("#820875","#ffffff");
            $("#"+this._html_framework.status_combo).append(this._status_options);
    }

    init_slider_buttons(){
        var swipe = this._html_framework._swiper;
        $('.btn-next').on('click',()=>{
            swipe.slideNext();
        });
        $('.btn-prev').on('click',()=>{
            swipe.slidePrev();
        });
    }

    init_btn_slide(){
         var swiper = this._html_framework._swiper;
         g_swiper=swiper;
         let index=0;
        for(let key in ordered_slide_list){
            $('#btn_'+key.split("_")[1]).on('click',()=>{
                setTimeout(function () {
                    var index = parseInt(ordered_slide_list[key][1]);
                    g_swiper.slideTo($('.swiper-slide').length - 1 - index);
                }, 175);

            });
            index++;
        }
    }

}

Object.size = function(arr) 
{
    var size = 0;
    for (var key in arr) 
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
};
