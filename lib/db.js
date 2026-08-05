import clientPromise from './mongodb';
import { INIT_CUSTOMERS, INIT_INVENTORY, INIT_INVOICES, INIT_EXPENSES, INIT_STAFF } from './data';

const getDb = async () => {
  const client = await clientPromise;
  return client.db('celine');
};

const initCollection = async (db, collectionName, initialData) => {
  const collection = db.collection(collectionName);
  const count = await collection.countDocuments();
  if (count === 0 && initialData && initialData.length > 0) {
    // Add string IDs if missing to mimic the old system
    const toInsert = initialData.map(item => ({
      ...item,
      id: item.id || `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    }));
    await collection.insertMany(toInsert);
  }
};

const initAuth = async (db) => {
  const collection = db.collection('auth');
  const count = await collection.countDocuments();
  if (count === 0) {
    await collection.insertOne({ id: 'auth_singleton', pin: "1234", failedAttempts: 0, lockoutUntil: null });
  }
};

// Initialize collections on first run
const initializeDb = async () => {
  const db = await getDb();
  await initCollection(db, 'customers', INIT_CUSTOMERS);
  await initCollection(db, 'inventory', INIT_INVENTORY);
  await initCollection(db, 'invoices', INIT_INVOICES);
  await initCollection(db, 'expenses', INIT_EXPENSES);
  await initCollection(db, 'staff', INIT_STAFF);
  await initCollection(db, 'leads', [
    { id: "1", name: "Suresh Sharma", phone: "9876543222", status: "New", value: 5000, notes: "Interested in wholesale" },
    { id: "2", name: "Priya Singh", phone: "9876543333", status: "Contacted", value: 2000, notes: "Wants a discount on bulk order" }
  ]);
  await initAuth(db);
};

// Run initialization in the background
initializeDb().catch(console.error);

export const db = {
  overwriteState: async (data) => {
    const database = await getDb();
    const collections = ['customers', 'inventory', 'invoices', 'expenses', 'staff', 'leads'];
    for (const coll of collections) {
      if (data[coll]) {
        await database.collection(coll).deleteMany({});
        if (data[coll].length > 0) {
          await database.collection(coll).insertMany(data[coll]);
        }
      }
    }
    if (data.auth) {
      await database.collection('auth').updateOne({ id: 'auth_singleton' }, { $set: data.auth }, { upsert: true });
    }
  },

  getFullState: async () => {
    const database = await getDb();
    const collections = ['customers', 'inventory', 'invoices', 'expenses', 'staff', 'leads'];
    const state = {};
    for (const coll of collections) {
      const data = await database.collection(coll).find({}, { projection: { _id: 0 } }).toArray();
      state[coll] = data;
    }
    const auth = await database.collection('auth').findOne({ id: 'auth_singleton' }, { projection: { _id: 0 } });
    state.auth = auth || { pin: "1234", failedAttempts: 0, lockoutUntil: null };
    return state;
  },

  getAuth: async () => {
    const database = await getDb();
    const auth = await database.collection('auth').findOne({ id: 'auth_singleton' }, { projection: { _id: 0 } });
    if (!auth) {
      const defaultAuth = { id: 'auth_singleton', pin: "1234", failedAttempts: 0, lockoutUntil: null };
      await database.collection('auth').insertOne(defaultAuth);
      return defaultAuth;
    }
    return auth;
  },
  
  updateAuth: async (updates) => {
    const database = await getDb();
    await database.collection('auth').updateOne(
      { id: 'auth_singleton' },
      { $set: updates },
      { upsert: true }
    );
    return await db.getAuth();
  },

  get: async (collection) => {
    const database = await getDb();
    return await database.collection(collection).find({}, { projection: { _id: 0 } }).toArray();
  },
  
  insert: async (collection, item) => {
    const database = await getDb();
    const collisionResistantId = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem = { ...item, id: item.id || collisionResistantId };
    await database.collection(collection).insertOne(newItem);
    return newItem;
  },
  
  update: async (collection, id, updates) => {
    const database = await getDb();
    const result = await database.collection(collection).findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after', projection: { _id: 0 } }
    );
    return result.value || result; // mongodb driver >4 uses result.value, or just result depending on version
  },
  
  delete: async (collection, id) => {
    const database = await getDb();
    const result = await database.collection(collection).deleteOne({ id });
    return result.deletedCount > 0;
  }
};
