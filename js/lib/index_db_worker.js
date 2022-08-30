
var createDB = (dbDef, dbInit) => {
  return new Promise((resolve, reject) => {
    if (!dbDef.dbInit) {
      resolve(`[createDB] ${dbDef.dbName}, already initialized`)
    }
    var objectStore = dbDef.dbCon.createObjectStore(dbDef.dbStore, { keyPath: dbDef.dbKeyp });
    // HERE
    if (dbDef.dbIndex) {
      dbDef.dbIndex.map(dx => {
        // Create indexes dynamically based on dbDef
        objectStore.createIndex(dx.name, dx.key, { unique: dx.pri });
      });
    }
    objectStore.transaction.oncomplete = (e) => {
      trx = dbDef.dbCon.transaction(dbDef.dbStore, "readwrite").objectStore(dbDef.dbStore);
      dbInit.map(row => trx.add(row));
      resolve(`[createDB] ${dbDef.dbName}, task finished`);
    }
    objectStore.transaction.onerror = (event) => {
      reject(`[createDB] ${dbDef.dbName}, ${event.request.errorCode}`);
    };
  });
}

var appendDB = async (dbDef, key,newData) => {
  await db_w.add(dbDef.dbStore,{uid:key,value:newData});
  };

  let readDB = async (dbDef, key, dex)=>{
    db_w?"":await init_db();
    const value = await db_w.get(dbDef.dbStore,key);
    return value;
  };

var delDB = (dbDef, key) => {
    return new Promise((resolve, reject) => {
      var trx = dbDef.dbCon.transaction([dbDef.dbStore], "readwrite").objectStore(dbDef.dbStore);
      req = trx.delete(key);
      console.log(`[delDB] ${dbDef.dbName}, attempted to delete ${key} `);
      // Delete operation returns no confirmation
      req.onsuccess = () => {
        resolve();
      }
      trx.onerror = (e) => {
        reject(e);
      }
    });
  }

  var updateDB = async (dbDef, key, newData) => {
    await db_w.put(dbDef.dbStore,{uid:key,value:newData});
  }

  let init_db = async() =>{
    db_w = await idb.openDB(dbDef.dbName);
  };