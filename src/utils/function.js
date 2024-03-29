const changeMoneyFormat = (number) => {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formattedNumber = number.toLocaleString("en-US", options);
  return formattedNumber;
};

const showBrief = (str, len) => {
  if (str.length > len) {
    const numLetters = len;
    const shortenedStr = str.slice(0, numLetters) + "...";
    return shortenedStr;
  } else return str;
};

const getYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};

const countLetter = (str) => {
  return str.length;
};

const countPercent = (num) => {
  return ((num / 10) * 100).toFixed(0);
};

const formatDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return formatDate(tomorrow);
};

const getShortMonth = (dateString) => {
  const dateParts = dateString.split('-'); // Split the string into parts
  const month = dateParts[1];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return months[parseInt(month, 10) - 1];
}

const getDay = (dateString) => {
  const dateParts = dateString.split('-'); // Split the string into parts
  return dateParts[2];
}

export { changeMoneyFormat, showBrief, getYear, countLetter, countPercent, getTomorrow, getShortMonth, getDay, formatDate };
