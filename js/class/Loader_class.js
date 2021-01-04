class Loader_class{
	
	constructor(){
		this._index_loading = 0;
		this._arr_log=[];
	};

	show(){
		$('.loader').show();
		this.inc()
	};

	hide(){
		this.dec();
		if(this._index_loading===0)
			$('.loader').hide();
		
	};

	log(msg){
		this.add_new_log(msg);
		//myWorker.postMessage([msg]);
        //console.log('Message posted to worker');
		var log;
		this._arr_log.forEach(function(row,index){
			log += row+"\n";
		})
        $('.msg_loader').text(log);
        $('.msg_loader').scrollTop($('.msg_loader').prop('scrollHeight'));
    }

    inc(){
    	this._index_loading ++;
    }

    dec(){
    	this._index_loading--;
    	if(this._index_loading<0)
    		this._index_loading=0;
    }

    add_new_log(line){
    	this._arr_log.push(line);

    }
}
