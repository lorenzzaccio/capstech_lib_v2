class dynamic_scroll{
    constructor(parent,config,table_row_class){
		this._list_of_class = parent; 
		this._config = config;
        this.topSentinelPreviousY = 0;
        this.topSentinelPreviousRatio = 0;
        this.bottomSentinelPreviousY = 0;
        this.bottomSentinelPreviousRatio = 0;
        this.currentIndex=0;
        this._id=this._config._id;
        this.listSize=this._config._list_size;
        this.increment = this.listSize/2+8;
	}
set_tracers(){
    const tr_list =  document.querySelectorAll(`.table-container_${this._id} tr`);
    let tracer_up = false;let index=0;let tracer_down = false;
    for(let row of tr_list){
        if((row.display !== 'none')&& !tracer_up){
            row.classList.add("tracer_up");
            tracer_up=true;
            index=0;
        }
        //alloctate tracer +3
        if((row.display !== 'none')&& tracer_up){
            if(index===4){
                row.classList.add("tracer_up_3");
                break;
            }
            index++;
        }

    }
    for(let row of Array.from(tr_list).reverse()){
        if((row.display !== 'none')&& !tracer_down){
            row.classList.add("tracer_down");
            tracer_down=true;
            index=0;
        }
        //alloctate tracer +3
        if((row.display !== 'none')&& tracer_down){
            if(index===20){
                row.classList.add("tracer_down_3");
                break;
            }
            index++;
        }
    }
}

init_io(buf){
    this._buffer = buf;
    this.set_tracers();
    if(this.listSize<buf.length){
        const h = this.init_scroll_direction.bind(this);
        h();
        this.initIntersectionObserver();
    }
}
initIntersectionObserver() {
    const options = {
        root: null //document.querySelector(`.table-container_${this._id}`) 
    }
    
    const that = this;
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.target.classList.toString().indexOf(`tracer_up`)!==-1) {
                const f=that.topSentCallback.bind(that)(entry);
                //f(entry);
                console.log(".tracer_up");
                //console.log(document.querySelector(".table-container").style.paddingTop);
            } else {
                if (entry.target.classList.toString().indexOf(`tracer_down`)!==-1) {
                    console.log(`.tracer_down`);
                    //console.log(document.querySelector(".table-container").style.paddingTop);
                    if(!that.scroll_down){
                        const f=that.botSentCallback.bind(that);
                        f(entry);
                    }
                }else {
                    /*if(entry.target.id === `${that._id}_mainRow${that.listSize/2}`) {
                        //console.log(`${that._id}_mainRow${that.listSize/2}`);
                        //console.log(document.querySelector(".table-container").style.paddingTop);
                        if(!that.scroll_down){
                        const f=that.botSentCallback.bind(that);
                        f(entry);
                        }
                    }*/
                }
            }
        });
    }

    var observer = new IntersectionObserver(callback, options);
    
    observer.observe(document.querySelector('.tracer_up'));
    observer.observe(document.querySelector('.tracer_down'));

    document.querySelector(`.tracer_up`).firstChild.style.backgroundColor="red";
    //document.querySelector(`#${this._id}_mainRow3`).firstChild.style.backgroundColor="green";
    //document.querySelector(`#${this._id}_mainRow${this.listSize/2}`).firstChild.style.backgroundColor="blue";

    //document.querySelector(`#${this._id}_mainRow${this.listSize-3}`).firstChild.style.backgroundColor="pink";
    document.querySelector(`.tracer_down`).firstChild.style.backgroundColor="purple";
    
    //const g = this.scroll_down.bind(this);
    //document.querySelector("#scroll_btn").onclick=g;
}

init_scroll_direction(){
    const that=this;
    that.scroll_down = false;
    
    document.querySelector(`.table-container_${this._id}`).addEventListener("scroll", function(){
        const main_row0 = document.querySelector('.tracer_up');
        // detects new state and compares it with the new one
        if(!main_row0 || !main_row0.getBoundingClientRect()) {
            console.log("error mainRow0");
            return;
        }

        if ((main_row0.getBoundingClientRect()).top > that.scrollPos)
            that.scroll_down=true;
        else
            that.scroll_down=false;

        // saves the new position for iteration.
        that.scrollPos = (main_row0.getBoundingClientRect()).top;
    }, false);
}
/*
scroll_down(e){
document.querySelector("#loc_mainRow14").scrollIntoView();
}*/

getSlidingWindow(isScrollDown){
    let firstIndex;

    if (isScrollDown) {
        firstIndex = this.currentIndex + this.increment;
    } else {
        firstIndex = this.currentIndex - this.increment;// - this.listSize;
    }

    if (firstIndex < 0) {
        firstIndex = 0;
    }
    console.log("index="+firstIndex);
    return firstIndex;
}

topSentCallback(entry){
    if (this.currentIndex === 0) {
        const container = document.querySelector(`.table-container_${this._id}`);
        container.style.paddingTop = "0px";
        container.style.paddingBottom = "0px";
    }

    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // conditional check for Scrolling up
    if (
    //currentY > this.topSentinelPreviousY &&
    isIntersecting &&
    currentRatio >= this.topSentinelPreviousRatio &&
    this.currentIndex !== 0
  ) {
      console.log("to top");
    const firstIndex = this.getSlidingWindow(false);
    //document.querySelector("#"+this._id+`_mainRow${this.listSize-1-10}`).scrollIntoView();
    document.querySelector('.tracer_down_3').scrollIntoView();
    this.recycleDOM(firstIndex);
    this.currentIndex = firstIndex;
    this.disR20=true;
    console.log("this.scroll_down"+this.scroll_down);
  }

this.topSentinelPreviousY = currentY;
this.topSentinelPreviousRatio = currentRatio;
}

botSentCallback(entry){
    if (this.currentIndex === this._buffer.length - this.listSize) 
        return;
    
    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // conditional check for Scrolling down
    if (
        //currentY < this.bottomSentinelPreviousY &&
        //currentRatio >= this.bottomSentinelPreviousRatio &&
        isIntersecting
    ) {
        console.log("to bottom");
        const firstIndex = this.getSlidingWindow(true);
        if(this.currentIndex>=this._buffer.length)
            return;
        //document.querySelector("#"+this._id+`_mainRow3`).scrollIntoView();
        document.querySelector('.tracer_up_3').scrollIntoView();
        this.recycleDOM(firstIndex);
        this.currentIndex = firstIndex;
        console.log("this.scroll_down"+this.scroll_down);
    }

    this.bottomSentinelPreviousY = currentY;
    this.bottomSentinelPreviousRatio = currentRatio;
}

recycleDOM(offset){
    const total = offset;
    for (let i = 0; i < this.listSize; i++) {
        let row = this._list_of_class.get_row(this._id+"_mainRow"+i);
        const data = this._buffer[offset+i];
        if(total+i>=this._buffer.length)
            return;
            //alert("end of buffer");
        row.recycle(i+offset,data);
    }
    document.querySelector('.tracer_up').firstChild.style.backgroundColor="red";
    //document.querySelector("#"+this._id+"_mainRow"+this.listSize/2).firstChild.style.backgroundColor="blue";
    //document.querySelector(`#${this._id}_mainRow3`).firstChild.style.backgroundColor="green";
    //document.querySelector(`#${this._id}_mainRow${this.listSize-3}`).firstChild.style.backgroundColor="pink";
    document.querySelector('.tracer_down').firstChild.style.backgroundColor="purple";

}
/*
getNumFromStyle(numStr){return Number(numStr.substring(0, numStr.length - 2))};

adjustPaddings(isScrollDown){
const container = document.querySelector(".table-container");
const currentPaddingTop = this.getNumFromStyle(container.style.paddingTop);
const currentPaddingBottom = this.getNumFromStyle(container.style.paddingBottom);
let h=0;
for(let i=0;i<this.listSize/5;i++){
    h += parseInt(document.querySelector(`#${this._id}_mainRow${i}`).clientHeight);
}
const remPaddingsVal = h;//60 * (this.listSize / 2);
console.log("calculated padding="+h);
if (isScrollDown) {
    container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
    container.style.paddingBottom = currentPaddingBottom === 0 ? "0px" : currentPaddingBottom - remPaddingsVal + "px";
} else {
    container.style.paddingBottom = currentPaddingBottom + remPaddingsVal + "px";
    container.style.paddingTop = currentPaddingTop === 0 ? "0px" : currentPaddingTop - remPaddingsVal + "px";
}
console.log("padding top="+this.getNumFromStyle(container.style.paddingTop)+" padding_bottom="+this.getNumFromStyle(container.style.paddingBottom));
}*/

}