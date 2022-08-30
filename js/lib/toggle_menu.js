/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var SIDE_BAR_STATE = "side_bar_open";

/*--Toggle Slide Menu--*/
function register_sidenav_btn(config,hfw){
$('#'+config._id+'_btnNavToggle').on('click touchstart',function (e) {
    e.stopPropagation();
    var fullContainer = $(this).closest('.'+hfw.container);
    var header = $(this).closest('header');
    var sidenav = $(this).closest('.'+hfw.container).prev();
    var ctrl_bar = $(this).closest('.'+hfw.container).find('.'+hfw.ctrl_title_bar);
    if ($(fullContainer).hasClass('navOpen')) {
        config.close_sidebar();
        $(sidenav).css({'width':'0px'});
        $(fullContainer).css({'margin-left': 0}).removeClass('navOpen');
        if ($(header).hasClass('fixed-header')) {
            $(ctrl_bar).css({'margin-left': 0});
            //$('nav').removeClass('fixed-header-open');
        }
    } else {
        config.open_sidebar();
        $(sidenav).css({'width':'200px'});
        $(fullContainer).css({'margin-left': 200}).addClass('navOpen');
        if ($(header).hasClass('fixed-header')) {
            $(ctrl_bar).css({'margin-left': 200});
            //$('nav').addClass('fixed-header-open');
        }
    }
});
}
/*--END Toggle--*/
async function openNav(hfw) {
    var fullContainer = $('body').find('.'+hfw.container);
    var header = $('body').find('header');
    var sidenav = $('body').find('.'+hfw.container).prev();
    var ctrl_bar = $('body').find('.'+hfw.container).find('.'+hfw.ctrl_title_bar);

    await db_write(hfw.side_bar_open,1);
        $(sidenav).css({'width':'200px'});
        $(fullContainer).css({'margin-left': 200}).addClass('navOpen');
        if ($(header).hasClass('fixed-header')) {
            $(ctrl_bar).css({'margin-left': 200});
            //$('nav').addClass('fixed-header-open');
        }
}

async function closeNav(hfw) {
    var fullContainer = $('body').find('.'+hfw.container);
    var header = $('body').find('header');
    var sidenav = $('body').find('.'+hfw.container).prev();
    var ctrl_bar = $('body').find('.'+hfw.container).find('.'+hfw.ctrl_title_bar);
    
    await db_write(hfw.side_bar_open,0);
        $(sidenav).css({'width':'0px'});
        $(fullContainer).css({'margin-left': 0}).removeClass('navOpen');
        if ($(header).hasClass('fixed-header')) {
            $(ctrl_bar).css({'margin-left': 0});
            //$('nav').removeClass('fixed-header-open');
        }
}
