export const GEMINI_KEY = "YOUR_GEMINI_API_KEY";
export const BUSINESS_TYPES = ["Kirana / Retail","Food Vendor / Tiffin","Repair Shop","Coaching / Tutor","Pharmacy","Salon / Spa"];
export const LANGUAGES = ["English","Hindi","Kannada","Tamil","Telugu","Marathi"];

export const INIT_CUSTOMERS = [
  {id:1,name:"Ramesh Kumar",phone:"9876543210",email:"ramesh@gmail.com",udhar:1200,visits:14,lastVisit:"2 days ago",type:"Regular",points:140,joined:"Jan 2026"},
  {id:2,name:"Priya Sharma",phone:"9123456789",email:"priya@gmail.com",udhar:0,visits:8,lastVisit:"1 week ago",type:"Premium",points:320,joined:"Mar 2026"},
  {id:3,name:"Suresh Nair",phone:"9988776655",email:"suresh@gmail.com",udhar:3500,visits:22,lastVisit:"Yesterday",type:"Regular",points:220,joined:"Nov 2025"},
  {id:4,name:"Kavitha Reddy",phone:"9765432100",email:"kavitha@gmail.com",udhar:800,visits:5,lastVisit:"3 days ago",type:"New",points:50,joined:"May 2026"},
  {id:5,name:"Arun Patel",phone:"9654321098",email:"arun@gmail.com",udhar:0,visits:31,lastVisit:"Today",type:"Premium",points:610,joined:"Aug 2025"},
  {id:6,name:"Meena Iyer",phone:"9543210987",email:"meena@gmail.com",udhar:600,visits:9,lastVisit:"4 days ago",type:"Regular",points:90,joined:"Feb 2026"},
];

export const INIT_INVENTORY = [
  {id:1,name:"Tata Salt 1kg",stock:45,minStock:20,price:22,cost:18,category:"Groceries",image:"🧂"},
  {id:2,name:"Amul Butter 500g",stock:8,minStock:15,price:285,cost:240,category:"Dairy",image:"🧈"},
  {id:3,name:"Surf Excel 1kg",stock:3,minStock:10,price:198,cost:165,category:"Cleaning",image:"🧼"},
  {id:4,name:"Maggi 70g",stock:120,minStock:30,price:14,cost:11,category:"Instant Food",image:"🍜"},
  {id:5,name:"Parle-G 100g",stock:60,minStock:25,price:10,cost:8,category:"Biscuits",image:"🍪"},
  {id:6,name:"Colgate 200g",stock:18,minStock:20,price:105,cost:88,category:"Personal Care",image:"🪥"},
  {id:7,name:"Lifebuoy Soap",stock:35,minStock:15,price:55,cost:44,category:"Personal Care",image:"🧴"},
  {id:8,name:"Fortune Oil 1L",stock:12,minStock:10,price:148,cost:128,category:"Groceries",image:"🫙"},
];

export const INIT_INVOICES = [
  {id:"INV001",customer:"Ramesh Kumar",items:[{name:"Tata Salt",qty:2,price:22},{name:"Maggi",qty:5,price:14}],amount:1450,date:"Jun 12, 2026",status:"Paid",method:"UPI"},
  {id:"INV002",customer:"Suresh Nair",items:[{name:"Amul Butter",qty:2,price:285},{name:"Colgate",qty:3,price:105}],amount:3200,date:"Jun 11, 2026",status:"Pending",method:"Credit"},
  {id:"INV003",customer:"Priya Sharma",items:[{name:"Fortune Oil",qty:2,price:148}],amount:890,date:"Jun 10, 2026",status:"Paid",method:"Cash"},
  {id:"INV004",customer:"Kavitha Reddy",items:[{name:"Parle-G",qty:10,price:10}],amount:560,date:"Jun 09, 2026",status:"Overdue",method:"Credit"},
  {id:"INV005",customer:"Arun Patel",items:[{name:"Surf Excel",qty:2,price:198}],amount:2100,date:"Jun 08, 2026",status:"Paid",method:"UPI"},
];

export const INIT_STAFF = [
  {id:1,name:"Vikram Singh",role:"Manager",phone:"9871234560",salary:18000,status:"Active",shift:"Morning",joined:"Jan 2026"},
  {id:2,name:"Anita Devi",role:"Cashier",phone:"9762345671",salary:12000,status:"Active",shift:"Evening",joined:"Mar 2026"},
  {id:3,name:"Mohan Lal",role:"Helper",phone:"9653456782",salary:9000,status:"On Leave",shift:"Morning",joined:"May 2026"},
];

export const INIT_EXPENSES = [
  {id:1,category:"Rent",amount:15000,date:"Jun 01, 2026",note:"Monthly shop rent",recurring:true},
  {id:2,category:"Electricity",amount:3200,date:"Jun 05, 2026",note:"May bill",recurring:false},
  {id:3,category:"Staff Salary",amount:39000,date:"Jun 01, 2026",note:"May salaries",recurring:true},
  {id:4,category:"Stock Purchase",amount:28000,date:"Jun 08, 2026",note:"Weekly restock",recurring:false},
  {id:5,category:"Packaging",amount:1200,date:"Jun 10, 2026",note:"Carry bags",recurring:false},
];

export const SALES_DATA = [
  {day:"Mon",sales:4200,expenses:1800},{day:"Tue",sales:3800,expenses:1200},
  {day:"Wed",sales:5100,expenses:2100},{day:"Thu",sales:4700,expenses:1500},
  {day:"Fri",sales:6200,expenses:2800},{day:"Sat",sales:7800,expenses:3200},
  {day:"Sun",sales:5500,expenses:1900},
];
export const MONTHLY_DATA = [
  {month:"Jan",sales:142000},{month:"Feb",sales:128000},{month:"Mar",sales:156000},
  {month:"Apr",sales:171000},{month:"May",sales:163000},{month:"Jun",sales:48200},
];
export const CATEGORY_DATA = [
  {name:"Groceries",value:38},{name:"Dairy",value:22},{name:"Personal Care",value:18},
  {name:"Snacks",value:14},{name:"Cleaning",value:8},
];
export const GOLD_COLORS = ["#C9A84C","#8A6F2E","#E8DCC8","#4A3F2A","#F0C060"];
