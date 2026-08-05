import fs from 'fs';
import path from 'path';
import { INIT_CUSTOMERS, INIT_INVENTORY, INIT_INVOICES, INIT_EXPENSES, INIT_STAFF } from './data';

const dbPath = path.join(process.cwd(), 'db.json');

// Initialize db.json if it doesn't exist
if (!fs.existsSync(dbPath)) {
  const initialData = {
    customers: INIT_CUSTOMERS,
    inventory: INIT_INVENTORY,
    invoices: INIT_INVOICES,
    expenses: INIT_EXPENSES,
    staff: INIT_STAFF,
    leads: [
      { id: 1, name: "Suresh Sharma", phone: "9876543222", status: "New", value: 5000, notes: "Interested in wholesale" },
      { id: 2, name: "Priya Singh", phone: "9876543333", status: "Contacted", value: 2000, notes: "Wants a discount on bulk order" }
    ],
    auth: {
      pin: "1234",
      failedAttempts: 0,
      lockoutUntil: null
    }
  };
  const tempPath = dbPath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(initialData, null, 2));
  fs.renameSync(tempPath, dbPath);
}

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => {
  const tempPath = dbPath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
  fs.renameSync(tempPath, dbPath);
};

export const db = {
  getFullState: () => readDB(),
  overwriteState: (data) => writeDB(data),
  
  getAuth: () => {
    const data = readDB();
    if (!data.auth) {
      data.auth = { pin: "1234", failedAttempts: 0, lockoutUntil: null };
      writeDB(data);
    }
    return data.auth;
  },
  
  updateAuth: (updates) => {
    const data = readDB();
    data.auth = { ...(data.auth || { pin: "1234", failedAttempts: 0, lockoutUntil: null }), ...updates };
    writeDB(data);
    return data.auth;
  },

  get: (collection) => readDB()[collection] || [],
  
  insert: (collection, item) => {
    const data = readDB();
    if (!data[collection]) data[collection] = [];
    const collisionResistantId = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem = { ...item, id: item.id || collisionResistantId };
    data[collection].push(newItem);
    writeDB(data);
    return newItem;
  },
  
  update: (collection, id, updates) => {
    const data = readDB();
    if (!data[collection]) return null;
    const index = data[collection].findIndex(i => i.id === id);
    if (index === -1) return null;
    data[collection][index] = { ...data[collection][index], ...updates };
    writeDB(data);
    return data[collection][index];
  },
  
  delete: (collection, id) => {
    const data = readDB();
    if (!data[collection]) return false;
    const initialLength = data[collection].length;
    data[collection] = data[collection].filter(i => i.id !== id);
    writeDB(data);
    return data[collection].length !== initialLength;
  }
};
