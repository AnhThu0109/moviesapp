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

export {changeMoneyFormat};