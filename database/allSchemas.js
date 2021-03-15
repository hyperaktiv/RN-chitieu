import Realm from 'realm';

export const EXPENSE_LIST_SCHEMA = "ExpenseList";
export const MONTHLY_BUGET_SCHEMA = "MonthlyBuget";
// export const ICON_LIST_SCHEMA = "IconList";

// define the models and their properties
export const ExpenseList = {
   name: EXPENSE_LIST_SCHEMA,
   primaryKey: 'id',
   properties: {
      id: 'int',
      icon: 'string',
      name: 'string',
      money: { type: 'int', default: 0 },
      category: 'string',
      datetime: 'string',
      date: 'string',
      month: 'string',
      note: 'string?',
      createdAt: 'string'
   }
}
export const MonthlyBuget = {
   name: MONTHLY_BUGET_SCHEMA,
   primaryKey: 'id',
   properties: {
      id: 'int',
      month: 'string',
      buget: { type: 'int', default: 0 },
      startDate: { type: 'int', default: 1 }
   }
}
// export const IconList = {
//    name: ICON_LIST_SCHEMA,
//    primaryKey: 'id',
//    properties: {
//       id: 'int',
//       icon: 'string',
//       name: 'string'
//    }
// }

const databaseOptions = {
   path: 'expenseApp.realm',
   schema: [ExpenseList, MonthlyBuget],
   schemaVersion: 3
}

// method for expense item
export const queryOneExpense = expenseID => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let expenseItem = realm.objects(EXPENSE_LIST_SCHEMA).filtered('id = ' + expenseID);
         resolve(expenseItem);
      })
   }).catch((error) => reject(error));
});
export const insertExpenseItem = newExpenseItem => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         realm.create(EXPENSE_LIST_SCHEMA, newExpenseItem);
         resolve(newExpenseItem);
      });
   }).catch((error) => reject(error));
});
export const updateExpenseItem = updateExpenseItem => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let updatingExpenseItem = realm.create(EXPENSE_LIST_SCHEMA, updateExpenseItem, "modified");
         resolve();
      })
   }).catch((error) => reject(error));
});
export const deleteExpenseItem = expenseID => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let deletingExpenseItem = realm.objectForPrimaryKey(EXPENSE_LIST_SCHEMA, expenseID);
         realm.delete(deletingExpenseItem);
         resolve();
      });
   }).catch((error) => reject(error));
});
export const queryAllExpenses = () => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let allExpenses = realm.objects(EXPENSE_LIST_SCHEMA);
         resolve(allExpenses);
      })
   }).catch((error) => reject(error));
});

// delete all the expense for case
export const deleteAllExpenses = () => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let allExpenses = realm.objects(EXPENSE_LIST_SCHEMA);
         realm.delete(allExpenses);
         resolve();
      })
   }).catch((error) => reject(error));
});


// method for monthly buget item
export const getCurrentMonthBuget = monthString => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let currentmonthBugget = realm.objects(MONTHLY_BUGET_SCHEMA).filtered(`month = "${monthString}"`);
         resolve(currentmonthBugget);
      });
   }).catch((error) => reject(error));
});
export const insertBugetItem = newBugetItem => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         realm.create(MONTHLY_BUGET_SCHEMA, newBugetItem);
         resolve(newBugetItem);
      });
   }).catch((error) => reject(error));
});
export const updateBugetItem = updateBugetItem => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let updatingBugetItem = realm.create(MONTHLY_BUGET_SCHEMA, updateBugetItem, "modified");
         resolve();
      })
   }).catch((error) => reject(error));
});
export const queryAllBugets = () => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let allBugets = realm.objects(MONTHLY_BUGET_SCHEMA);
         resolve(allBugets);
      });
   }).catch((error) => reject(error));
});
export const deleteAllBugets = () => new Promise((resolve, reject) => {
   Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
         let allExpenses = realm.objects(MONTHLY_BUGET_SCHEMA);
         realm.delete(allExpenses);
         resolve();
      })
   }).catch((error) => reject(error));
});


// export file .realm from devices use command:
// adb shell "run-as com.expenseapp cat /data/data/com.expenseapp/files/expenseApp.realm" > database.realm
export default new Realm(databaseOptions);