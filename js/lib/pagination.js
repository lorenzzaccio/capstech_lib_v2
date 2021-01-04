class Pagination {
    
    
     constructor(container,q_per_page){
        this.Q_PER_PAGE = 50;
        this.container = container;
        this.current_page = 1;
        this.records_per_page = 4;
        this.visible_items = 5;

        this.objJson = [];
        this.listing_table = $(this.container).find("#listingTable");
        this.btn_next = $(this.container).find("#btn_next");
        this.btn_prev = $(this.container).find("#btn_prev");
        this.g_current_page=1;
        this.set_quantiy_per_page(q_per_page);
    };

    register_event(){
        ($(this.container).find("#btn_prev")).on('click',function(){
            pagi.prevPage();
        });

        $(this.container).find("#btn_next").on('click',function(){
            pagi.nextPage();
        });
    }

 calcul_nbr_page(arr){
    var line_count = arr.length;
    var nbr_pages = Math.ceil(parseFloat(line_count/this.Q_PER_PAGE));    
    this.create_button_arr(nbr_pages);
    this.changePage(1);
}

 display_page(arr){
    var num_page = this.g_current_page;
        for (var k = (num_page-1)*this.q_per_page; k < num_page*this.q_per_page; k++) {
            $(arr[k]).show();
        }
}
    set_quantiy_per_page(quantity){
        this.q_per_page = parseInt(quantity) || this.Q_PER_PAGE;
    }

    create_button_arr (nbr_pages) {
        this.objJson=[];
        this.listing_table.empty();
        this.register_event();
        for(var i=0;i<nbr_pages;i++){
            this.objJson.push({ adName: "<div id='pagination_btn"+parseInt(i+1)+"' class='pagination' onclick='this.g_current_page="+i+1+";pagination_display(this);pagi.set_button_select(this)'>"+parseInt(i+1)+"</div>"});
        }
    };

    set_button_select (obj) {
        $(this.container).find('div.pagination').removeClass('highlight_btn');
        $(obj).addClass('highlight_btn');
    };


    prevPage()
    {
        this.listing_table.empty();
        if (this.current_page > 1) {
            this.current_page--;
            this.changePage(this.current_page);
        }
    };

    nextPage()
    {
        this.listing_table.empty();
        if (this.current_page < this.numPages()) {
            this.current_page++;
            this.changePage(this.current_page);
        }
    };
        
    changePage(page)
    {   
        // Validate page
        if (page < 1) page = 1;
        if (page > this.numPages()) page = this.numPages();
        
        var last_page = page + this.visible_items;
        if ((page + this.visible_items)>this.numPages()) last_page = this.numPages();
        
        this.listing_table.innerHTML = "";
        if(this.objJson.length>0){
            for (var i = (page); i <= (last_page); i++) {
                this.listing_table.append(this.objJson[i-1].adName + "<br>");
            }
        }

        if (page == 1) {
            $(this.btn_prev).css({"display":"none"});
        } else {
            $(this.btn_prev).css({"display":"flex"});
        }

        if (last_page == this.numPages()) {
            $(this.btn_next).css({"display":"none"});
        } else {
            $(this.btn_next).css({"display":"flex"});
        }
    };

    numPages()
    {
        return Math.ceil((this.objJson).length);
    };
}