const _LOCAL_STORAGE=1;
const db_name="";

function db_check(){
	if (!window.indexedDB) {
	    window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
	}
}

function db_open(db_name,version){
	if (!db_check()) return null;
	var db;
	var request = indexedDB.open(db_name);
	db.onerror = function(event) {
	  alert("Database error: " + event.target.errorCode);
	};
	request.onsuccess = function(event) {
	  db = event.target.result;
	};
	// Cet évènement est seulement implémenté dans des navigateurs récents
	db.onupgradeneeded = function(event) { 
  		var database = event.target.result;
  		// Crée un objet de stockage pour cette base de données
  		var objectStore = database.createObjectStore("name", { keyPath: "myKey" });
	};
}

function db_write(key,value,condition){
	(_LOCAL_STORAGE)?localStorage.setItem(key,value):
	db_set(key,value,condition);
}

function db_read(key,condition){
	return (_LOCAL_STORAGE)? localStorage.getItem(key): db_get(db_name,key,condition);
}

function db_update(key,value,condition){
		
}

function db_delete(key,condition){
	
}
