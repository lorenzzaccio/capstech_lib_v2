/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Timer(delay,cbk,id_display) {
    this.timer = null;
    this.isActive = false;
    this.delay = delay;
    this.action = cbk;
    this.c = 0;
    this.t;
    this.timer_is_on = 0;
    this.id_display = id_display || false;
}

Timer.prototype.set_delay = function (delay) {
    this.delay = delay;
};

Timer.prototype.set_action = function (action) {
    this.action = action;
};

Timer.prototype.start = function () {
    //console.log("IN Timer start function");
    if ((this.action !== null) && (this.delay >= 0)) {
        //console.log("Timer started");
        this.timer = setTimeout(this.action
        , this.delay);
    }
    this.isActive = true;
    if(this.id_display)
        this.timedCount();
};
Timer.prototype.stop = function () {
    clearTimeout(this.timer);
     this.isActive = false;
};

Timer.prototype.reset = function () {
    //console.log("Timer reset");
    clearTimeout(this.timer);
    this.start();
   
};

Timer.prototype.isActive = function () {
    return this.isActive();
};
/*****************************************/


Timer.prototype.timedCount = function() {
  document.getElementById("txt").value = this.c;
  this.c++;
  //this.start();
  //t = setTimeout(timedCount, 1000);
}

Timer.prototype.startCount = function() {
  if (!this.isActive) {
    this.start();
    timedCount();
  }
}

Timer.prototype.stopCount = function() {
  this.stop();
}
/******************************************/