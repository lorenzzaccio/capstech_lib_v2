var g_swipe_index = -1;
let isKeyPressed=[];
class _html_fw{
    constructor(id,title_bar,status_options,columns,model){
        this._id=id;
        this._title_bar = title_bar;
        this._status_options = status_options;
        this._columns=columns;
        this._model=model||null;
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
            /*PAGINATION_BLOCK_ID:"#"+this._id+"_pagination_div",
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
            extra_search_btn : this._id+"_extra_search",*/
            //COOK_LOG : this._id+"_log",
            status_combo : this._id+"_status_combo",
            input_search : this._id+"_input_search",
            extra_search_btn : this._id+"_extra_search",
            slider : this._id+"_slider",
            side_bar_open : this._id+"_side_bar_open",
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
        this.add_connection_status(swipe_name);
        this.add_menu_action(swipe_name);
        this.init_swipe();
        this.init_slider();
        this.init_slider_buttons();
        this.init_btn_slide();
        this.register_swipe_combo();
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
                        '<button class="btn-prev">prev</button>'+
                        '<button class="btn-next">next</button>'+
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
        $('.'+swipe_name).prepend(`<div id="${this._id}_sidebar" class="${this._html_framework.sidenav} sidenav_style"></div>`);
    }

    add_btn_sidebar(swipe_name){
        $('.'+swipe_name).find('.menu_bar').append('<div class="inner"><a id="'+this._id+'_btnNavToggle" class="btn_sidebar fas fa-align-justify"></a></div>');
    }

    add_btn_add(swipe_name){
        $('.'+swipe_name).find('.menu_bar').append(`<div class="inner"><a id="${this._id}_btnAdd" class="btn_add far fa-plus-square"></a></div>`);
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
            '</div>'
            );
    }

    add_connection_status(swipe_name){
        $(`.${swipe_name} .outer`).append(
            `<div class="connection_status">
            <div id="status"></div>
            <div id="statusDb"></div>
            <div class='swipeCombo' id="swipeCombo_${this._id}">
            <select>
            <option value='LOC'>LOC</option>
            <option value='LOFC'>LOFC</option>
            <option value='LOF'>LOF</option>
            <option value='CLI'>CLI</option>
            <option value='SITECLI'>SITECLI</option>
            <option value='LF'>LF</option>
            <option value='LA'>LA</option>
            <option value='LAV'>LAV</option>
            </select></div>
            </div>`
            );
    }

    register_swipe_combo(){
        $(`#swipeCombo_${this._id}`).on('change',this.specific_slide.bind(this));
    }
    specific_slide(obj){
        for(let sl in g_swiper.slides){
            let txt = (g_swiper.slides[sl]).className;
            const target = $(obj.target).val().toLowerCase();
            if(txt.indexOf(`swiper-slide ${target}_swipe`)!==-1){
                g_swiper.slideTo(sl);
                $(`#swipeCombo_${target} select`).val($(obj.target).val());
                break;
            }
        }
    }

    specific_slide_btn(obj){
        for(let sl in g_swiper.slides){
            let txt = (g_swiper.slides[sl]).className;
            const target = $(obj.target).text().toLowerCase();
            if(txt.indexOf(`swiper-slide ${target}_swipe`)!==-1){
                setTimeout(function () {
                    //var index = parseInt(ordered_slide_list[sl][1]);
                    g_swiper.slideTo(parseInt(sl));
                }, 175);
                break;
            }
        }
    }

    add_menu_action(swipe_name){
    }

    add_panel(swipe_name){
        $('.'+swipe_name+' header').after(this.create_panel());
    }

    create_panel(){
        var panel = 
                                `<div class="loader_div" style="display:none">
                                    <div class="loader" ></div>
                                    <textarea rows="3" cols="50" class="msg_loader">un message simple</textarea>
                                </div>
                                <div class="table-container table-container_${this._id}">
                                    <table class="table table-filter">
                                        <tbody id="${this._html_framework.table_body_id}"></tbody>
                                    </table>
                                </div>`;
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
                '<div class="swiper-slide '+swipe_name+'">'+
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
    
    set_extra_search_btn(){}

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
        document.onkeydown = (keyDownEvent) => {   
            isKeyPressed[keyDownEvent.key] = true;  
        }
        document.onkeyup = (keyUpEvent) => {
            isKeyPressed[keyUpEvent.key] = false;
        };
        document.onkeydown = (keyDownEvent) => { 
 
            isKeyPressed[keyDownEvent.key] = true;
            if (isKeyPressed["a"] && isKeyPressed["z"]) {
                //do something as custom shortcut (a & b) is clicked
                swipe.slidePrev();
            };
            if (isKeyPressed["q"] && isKeyPressed["s"]) {
                //do something as custom shortcut (a & b) is clicked
                swipe.slideNext();
            };
        }
    }

    init_btn_slide(){
         var swiper = this._html_framework._swiper;
         g_swiper=swiper;
         let index=0;
        for(let key in ordered_slide_list){
            $('#btn_'+key.split("_")[1]).on('click',(obj)=>{
                /*setTimeout(function () {
                    var index = parseInt(ordered_slide_list[key][1]);
                    g_swiper.slideTo($('.swiper-slide').length - 1 - index);
                }, 175);*/
                this.specific_slide_btn(obj);

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
