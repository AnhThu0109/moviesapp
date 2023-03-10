const changeMoneyFormat = (number)=>{
    const options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
      const formattedNumber = number.toLocaleString("en-US", options);
      return formattedNumber;
}

const showBrief = (str, len) => {
    if(str.length > len){
      const numLetters = len;
      const shortenedStr = str.slice(0, numLetters) + "..."; 
      return shortenedStr;
    } else return str; 
  }


const getYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
}

const countLetter = (str) => {
  return str.length;
}

const countPercent = (num) => {
  return ((num / 10)*100).toFixed(0);
}

export {changeMoneyFormat, showBrief, getYear, countLetter, countPercent};