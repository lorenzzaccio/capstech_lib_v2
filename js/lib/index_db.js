
var connectDB = async (dbDef) => {
    try {
        dbDef.dbCon = await idb.openDB(dbDef.name);
        dbDef.dbInit = 1; 
    } catch (error) {
        
    }
  }

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
  await db.add(dbDef.dbStore,{uid:key,value:newData});
    /*const tx = dbDef.dbCon.transaction([dbDef.dbStore], 'readwrite');
    const store = tx.objectStore(dbDef.dbStore);
   // newData.map(row => await store.add(row));
    await store.add(newData, key);
    await tx.done;*/

  };

  async function readDB(dbDef, key, dex){
    // Find me
    //const store = db.transaction([dbDef.dbStore]).objectStore(dbDef.dbStore);
    //const value = await store.get(key);
    const value = await db.get(dbDef.dbStore,key);
    return value;
  }

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
    await db.put(dbDef.dbStore,{uid:key,value:newData});
    console.log(`updating ${key} ${newData}`)
    /*const tx = db.transaction([dbDef.dbStore], 'readwrite');
    const store = tx.objectStore(dbDef.dbStore);
    //const val = (await store.get(key)) || 0;
    await store.put(newData, key);
    await tx.done;*/
  }

