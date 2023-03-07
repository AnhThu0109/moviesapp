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

const showFirstLetter = (str) => {
  const shortenedStr = str.slice(0, 1);
  return shortenedStr;
  }

const getYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
}

export {changeMoneyFormat, showBrief, showFirstLetter, getYear};