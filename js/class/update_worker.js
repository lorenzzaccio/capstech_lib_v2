importScripts('../lib/service.js');
importScripts('../lib/compare_array.js');
importScripts('../lib/libTime.js');
importScripts('worker_class.js');
importScripts('loc_worker_class.js');

onmessage = function(e) {
  const l_w_c = new loc_worker_class({data:e.data});
}

