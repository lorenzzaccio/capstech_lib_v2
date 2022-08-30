function lib_init(){   
    /*document.querySelector('#offrePrix_cond1').addEventListener('change',(e)=>{
        update_sql(e,"offrePrix","offrePrix_cond1");
     });*/
     init_input("offrePrix_cond1");
     init_input("offrePrix_cond2");
     init_input("offrePrix_cond3");
     init_input("offrePrix_cond4");
     init_input("offrePrix_cond5");
     init_input("offrePrix_title");
     autoresize(document.getElementById('ta'));
}
lib_init();