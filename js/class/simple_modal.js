class simple_modal {

    constructor(arg){
        this.param = arg;
        this.b_init_form=false;
       
            this.create_structure();
            if(!this.md.exist) this.create_gui();
            if(!this.md.exist) this.init_form(arg.input.use_fetch||null);
    }

    display(){
        $(this.md.dom_modal).modal('toggle');
    }

    hide(){
        $(this.md.dom_modal).modal('toggle');
    }

    close(){
        this.md.dom_modal.remove();
    }

    create_structure(){
        this.md = new modal(this.param);
        this.md.build();
    }

    create_gui(){
    }

    init_form(use_fetch){
        if(this.b_init_form) return;
    
        this.b_init_form=true;

    
        const f= async (event)=>{
            event.preventDefault();
            this.FD = new FormData(this.md.form);
            await this.prepare_form();
            await this.send_form();
        };
        if(!use_fetch){
           // this.md.form.querySelector("[type='submit']").onclick=()=>alert("coucou");
           this.md.form.addEventListener("submit",f.bind(this.md.form)); 
        }
    }

    prepare_form(){}

    async send_form(){
        try{
            await service_send_form(`${this.param.url_form}/${JSON.stringify(Object.fromEntries(this.FD))}`);
        }catch(e){
            alert("erreur formulaire"+e);
        }
        this.close();
        
    }

}