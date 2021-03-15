// 2 function to convert string for save data
export const convertToDateString = (date) => {
   let time = new Date(date);
   let month = time.getMonth() + 1;
   let numDate = time.getDate() < 10 ? '0' + time.getDate().toString() : time.getDate();

   return `${time.getFullYear()}-${month}-${numDate}`;
}
export const convertToMonthString = (date) => {
   let time = new Date(date);
   let month = time.getMonth() + 1;
   return `${time.getFullYear()}-${month}`;
}

// return 12 tháng 10 năm 2020
export const convertDate = (date) => {
   let time = new Date(date);
   let month = time.getMonth() + 1;
   return `${time.getDate()} tháng ${month}, ${time.getFullYear()}`;
}
export const convertTime = (date) => {
   let time = new Date(date);
   return `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
}

// check if 2 day is the same
export const sameDay = function (date1, date2) {
   let d1 = new Date(date1);
   let d2 = new Date(date2);
   return d1.getFullYear() === d2.getFullYear()
      && d1.getDate() === d2.getDate()
      && d1.getMonth() === d2.getMonth();
}

// check if 2 month is the same
export const sameMonth = function (date1, date2) {
   let m1 = new Date(date1);
   let m2 = new Date(date2);
   return m1.getFullYear() === m2.getFullYear()
      && m1.getMonth() === m2.getMonth();
}

export const _getCurrentBuget = (dataInput) => {
   return dataInput.filter((record) => {
      let m1 = new Date();
      let m2 = new Date(record.month);
      return m1.getFullYear() === m2.getFullYear()
         && m1.getMonth() === m2.getMonth();
   });
}

// for HomeHeader
export const _calMoneyOfCurrentMonth = (currentMonth, buget, dataInput) => {
   let currentMonthData = _getDataOfMonth(currentMonth, dataInput);
   let tien = currentMonthData.reduce((acc, curr) => {
      if (curr.category === 'income')
         return acc + parseInt(curr.money);
      else if (curr.category === 'expense')
         return acc - parseInt(curr.money);
   }, 0);
   return tien + parseInt(buget);
}

// return the array with the unique properties which in the input array 
// also to sort it from high to low
export const getUniqueValue = (array, property) => {
   let unique = [];
   let distinct = [];
   for (let i = 0; i < array.length; i++) {
      if (!unique[array[i][property]]) {
         distinct.push(array[i][property]);
         unique[array[i][property]] = 1;
      }
   }
   return distinct.sort(function (a, b) { return new Date(b) - new Date(a); });
}

export const setDataForHistory = (data) => {
   let dates = getUniqueValue(data, "date");
   let result = [];
   let test = dates.map(function (val, index) {
      let fill = data.filter(function (record) {
         return record.date === val;
      })
      result[val] = fill;
   })
   return result;
}
// filter which element in which month to calc the month expense or income
export const _getDataOfMonth = function (month, dataInput) {
   return dataInput.filter((record) => record.month === month)
}

// filter which element in which date to show on HomeScreen
export const _getDataOfDay = (date, dataInput) => {
   return dataInput.filter((record) => record.date === date)
};

export const _calInOutCome = (dataInput, category = '') => {
   let result = dataInput.reduce((acc, current) => {
      return current.category === category ? acc + parseInt(current.money) : acc;
   }, 0);
   return result;
}


export const formatMoney1 = (num) => {
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatMoney = (num, category = '') => {
   let sign = '';
   if (category == 'income') sign = '+';
   else if (category == 'expense') sign = '-';
   return sign + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// return the array with the unique properties which in the input array 
// also to sort it from high to low
// lấy ra các năm có giá trị duy nhất từ một mảng truyền vào
export const getUniqueYear = (array, property) => {
   let unique = [];
   let distinct = [];
   for (let i = 0; i < array.length; i++) {
      if (!unique[new Date(array[i][property]).getFullYear()]) {
         distinct.push(new Date(array[i][property]).getFullYear());
         unique[new Date(array[i][property]).getFullYear()] = 1;
      }
   }
   return distinct.sort(function (a, b) { return new Date(b) - new Date(a); });
}

