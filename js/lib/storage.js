const _LOCAL_STORAGE=0;
const db_name="";
let db;
const initData = [
    { uid: "init_loc", value: "1" },
	{ uid: "init_lofc", value: "1" },
	{ uid: "init_la", value: "1" }
];
let dbDef = {
	dbName: "capstech",
	dbVer: 1,
	dbStore: "capstech_store",
	dbKeyp: "uid",
	dbIndex: [
	  /*{ name: "by_phone", key: "phone", pri: true },
	  { name: "by_email", key: "email", pri: true }*/
	]
};
async function init_storage(){
	try{
		(_LOCAL_STORAGE)?console.log("localstorage mode"):await db_open();
	}catch(e){
		console.log("erreur init storage");
	}
	
}

function db_check(){
	if (!window.indexedDB) {
	    window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
		return false;
	}
	return true;
}

async function db_open(/*db_name,version*/){
	if (!db_check()) return null;
	
	try{
		//await connectDB(dbDef);
		dbDef.dbCon = await idb.openDB(dbDef.name);
        dbDef.dbInit = 1;
		//const r = await createDB(dbDef, initData);
		//console.log(r);
	}catch(e){
		console.log("erreur db!open storage");
	}
	
}


async function db_set(key, newData){
	try{
		await readDB(dbDef,key)?await updateDB(dbDef,key,newData):await appendDB(dbDef,key, newData );
	}catch(e){
		await appendDB(dbDef,key, newData );
	}
	
}

async function db_write(key,value){
	(_LOCAL_STORAGE)?localStorage.setItem(key,value):await db_set(key,value);
}



async function db_read(key){
	const v = await readDB(dbDef, key);
	return v ?v.value : null;
	//return (_LOCAL_STORAGE)? localStorage.getItem(key):await readDB(dbDef,key).value;
	/*let v;
	try{
		if(_LOCAL_STORAGE)
			return localStorage.getItem(key);
		else{
			console.log(`reading ${key}`);
			//!db ? db = await idb.openDB(dbDef.dbName):"";
			const store = db.transaction(dbDef.dbStore).objectStore(dbDef.dbStore);
			const l = await store.get(key);

			//const l = await db.get(dbDef.dbStore,key);
			return l.value;
		}
	}catch(e){
		console.log(`reading error`);
	}*/
	
}

function db_update(key,value){
	(_LOCAL_STORAGE)?localStorage.setItem(key,value):updateDB(dbDef,key,value);
}

function db_delete(key){
	(_LOCAL_STORAGE)?localStorage.removeItem(key):delDB(dbDef,key);
}

