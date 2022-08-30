const _LOCAL_STORAGE=0;
const db_name="";
let db;

let dbDef = {
	dbName: "capstech",
	dbVer: 1,
	dbStore: "capstech_store",
	dbKeyp: "uid",
	dbIndex: [
	]
};


async function db_set(key, newData){
	await readDB(dbDef,key)?await updateDB(dbDef,key,newData):await appendDB(dbDef,key, newData );
}

async function db_write(key,value){
	(_LOCAL_STORAGE)?localStorage.setItem(key,value):await db_set(key,value);
}



async function db_read(key){
	const v = await readDB(dbDef, key);
	return v ?v.value : null;
}

function db_update(key,value){
	(_LOCAL_STORAGE)?localStorage.setItem(key,value):updateDB(dbDef,key,value);
}

function db_delete(key){
	(_LOCAL_STORAGE)?localStorage.removeItem(key):delDB(dbDef,key);
}

