class modal {
   constructor(arg){
        this.arg=arg;
        this.check_exist();

        if(!this.exist) this.html = this.create_modal();
    }

    build(){
        var d1 = document.getElementById('modals');
        if(!this.exist) d1.insertAdjacentHTML('beforeend',this.html);
        this.dom_modal = document.getElementById(this.arg.modal_id);
        this.dialog = this.dom_modal.querySelector(".modal-dialog");
        if(!this.exist) this.dialog.insertAdjacentHTML('beforeend',this.create_content());
        this.content = this.dom_modal.querySelector('.modal-content');
        if(!this.exist) this.content.insertAdjacentHTML('beforeend',this.create_header());
        if(!this.exist) this.content.insertAdjacentHTML('beforeend',this.create_body());
        if(!this.exist) this.content.insertAdjacentHTML('beforeend',this.create_footer());
        this.body = this.content.querySelector('.modal-body');
        this.header = this.content.querySelector('.modal-header');
        this.footer = this.content.querySelector('.modal-footer');
        this.form = this.dom_modal.querySelector("#form_"+this.arg.modal_id);
        this.dom_modal.querySelector("#cross_close").addEventListener('click',()=>this.dom_modal.remove());
    }

    check_exist(){
        this.exist=(document.getElementById(this.arg.modal_id)?true:false);
    }
    insert_input(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_input(param));
    }
    insert_button(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_button(param));
    }
    insert_check(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_check(param));
    }
    insert_textarea(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_textarea(param));
    }

    insert_datalist(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_datalist(param));
    }

    insert_combo(param){
        this.body.insertAdjacentHTML('beforeend',this.add_block_element_combo(param));
    }

    insert_table(param){
        this.body.insertAdjacentHTML('beforeend',this.add_table(param));
    }

    create_header(){
        let header = `\
            <div class='modal-header'> \
            <h5 class='modal-title'>${this.arg.title}</h5> \
            <button type='button' id='cross_close' class='close' data-dismiss='modal' aria-label='Close'> \
            <span aria-hidden='true'>&times;</span> \
            </button> \
        </div> \
        `;
        return header;
    }

    create_body(){
        let body = "<div class='modal-body'></div>";
        return body;
    };

    create_footer(){
        let footer = ` 
            <div class='modal-footer'> 
            <button type='button' class='btn-sm btn-secondary' data-dismiss="modal">Fermer</button> 
            <input  class='btn-sm btn-primary' type='submit'> 
            </div> 
        `;
        return footer;
    }

    create_content(){
        let content = "<div class='modal-content'></div>";
        return content;
    };

    create_modal(){
        let modal = `
        <div class="modal fade" id='${this.arg.modal_id}' tabindex="-1" role="dialog" aria-hidden="true" > 
        <form id='form_${this.arg.modal_id}'>           
        <div class='modal-dialog ${this.arg.size}' role='document' ></div> 
        </div>
        </form>
                    `;
        return modal;
    };

    add_block_element_combo(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            class:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                new_param[index] = param[i];
                i++
              }
        }else
        new_param = param;
        let id = `${new_param.id|| 'id_'+parseInt(Math.random()*10000)}`;
        let block = `
            <div class="block ${new_param.class || ''}"> 
                <label>${new_param.label}</label>
                <select  name="${new_param.name || id}" id="${id}" >
                <options  >
                ${new_param.options || ''}
                </options>
                </select>
            </div>
        `;
        return block;
    }

    add_block_element_datalist(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            class:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                new_param[index] = param[i];
                i++
              }
        }else
        new_param = param;
        let id = `${new_param.id|| 'id_'+parseInt(Math.random()*10000)}`;
        let block = `
            <div class="block ${new_param.class || ''}"> 
                <label>${new_param.label}</label>
                <input type="${new_param.type|| text}" list="${id}" />
                <datalist  name="${new_param.name || id}" id="${id}">
                ${new_param.options || ''}
                </datalist>
            </div>
        `;
        return block;
    }

    add_block_element_button(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            step:'',
            placeholder:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                (typeof param[i] === 'object')?new_param={...new_param, ...param[i]}:
                new_param[index] = param[i];
                i++
              }
        }else
            new_param = param;

        let place_holder="";let value="";

        if((!new_param.default_value || (new_param.default_value!==undefined))  && new_param.placeholder)
            place_holder=`placeholder="${new_param.placeholder}"`;
        else
            value=`value="${new_param.default_value}"`;


        let block = `
        <div class="block ">
            <button  class="${new_param.class || ''}" name="${new_param.name || new_param.id || 'id_'+Math.random()/10000}" id="${new_param.id || 'id_'+Math.random()/10000}" ${value} ${place_holder} >${new_param.label}</button>
        </div>
        `;
        return block;
    }

    add_block_element_input(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            step:'',
            placeholder:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                new_param[index] = param[i];
                i++
              }
        }else
            new_param = param;
        let place_holder="";
        let value="";

        if((!new_param.default_value || (new_param.default_value!==undefined))  && new_param.placeholder)
            place_holder=`placeholder="${new_param.placeholder}"`;
        else
            value=`value="${new_param.default_value}"`;

        let block = `
        <div class="block ${new_param.class || ''}">
            <label>${new_param.label}</label>
            <input type="${new_param.type|| text}" ${new_param.step||''} name="${new_param.name || new_param.id || 'id_'+Math.random()/10000}" id="${new_param.id || 'id_'+Math.random()/10000}" ${value} ${place_holder} >
        </div>
        `;
        return block;
    }

    add_table(param){
        let block = `
            <div class="block_table ${param.class || ''}" id="${param.id || 'id_'+Math.random()/10000}">
            ${(param.label)?'<label>'+param.label+'</label>':''}
                <table>
                    ${this.create_table_header(param.header)}
                    ${param.row?this.create_table_row(param.row):''}
                </table>
            </div>
            `;
        return block;
    }

    create_table_header(header){
        const arr = header.map( el =>`<td>${el}</td>`);
        return  "<th class='fp_header'>"+arr.join('')+"</th>";
    }
    create_table_row(row,style){
        return `<tr class="${style||''}">${row.map(el => '<td contentEditable>'+el+'</td>').join('')}</tr>`;
    }

    add_block_element_check(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            step:'',
            placeholder:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                new_param[index] = param[i];
                i++
              }
        }else
            new_param = param;
        let place_holder="";
        let value="";

        if((!new_param.default_value || (new_param.default_value!==undefined))  && new_param.placeholder)
            place_holder=`placeholder="${new_param.placeholder}"`;
        else
            value=`${new_param.default_value}`;

        let block = `
        <div class="block ${new_param.class || ''}">
            <label>${new_param.label}</label>
            <input type="checkbox" ${new_param.step||''} name="${new_param.name || new_param.id || 'id_'+Math.random()/10000}" id="${new_param.id || 'id_'+Math.random()/10000}" ${value} ${place_holder} >
        </div>
        `;
        return block;
    }

    add_block_element_textarea(param){
        let new_param = {
            label:'',
            id:'',
            default_value:'',
            type:'',
            step:'',
            cols:'',
            rows:''
        };

        if(Array.isArray(param)){
            let i=0;
            for (const index in new_param){
                    new_param[index] = param[i];
                i++
              }
              //
              for (const index in param){
                if(typeof  param[index] === "object")
                    new_param = {...new_param,...param[index] };
            }
        }else
            new_param = param;

        let block = `
        <div class="block ${new_param.class || ''}">
            <label>${new_param.label}</label>
            <textarea type="${new_param.type|| text}" ${new_param.step||''} rows="${new_param.rows|| 3}" cols="${new_param.cols|| 50}" name="${new_param.name || new_param.id || 'id_'+Math.random()/10000}" id="${new_param.id|| 'id_'+Math.random()/10000}" >${new_param.default_value ||''}</textarea>
        </div>
        `;
        return block;
    }
   

}