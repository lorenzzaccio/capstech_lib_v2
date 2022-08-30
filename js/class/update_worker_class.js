/*importScripts('../lib/service.js');
importScripts('../lib/compare_array.js');
importScripts('../lib/libTime.js');
importScripts('worker_class.js');
importScripts('loc_worker_class.js');
*/

importScripts('../../../capstech_lib_v2/js/class/global_const.js');
importScripts('../../../capstech_lib_v2/js/class/net_config_class.js');
importScripts('../../../capstech_lib_v2/js/lib/service.js');
importScripts('../../../capstech_lib_v2/js/lib/compare_array.js');
importScripts('../../../capstech_lib_v2/js/lib/libTime.js');

let net_conf ;
let _k_init=false;

class update_worker_class{
  
  constructor(arg){
    
  }

  async init(nc){
    net_conf = new net_config_class(nc);
    await net_conf.init();
}

}
