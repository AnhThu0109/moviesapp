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

const getId = () => {
    let url = window.location.href;
    let strs = url.split('/');
    let id = strs.at(-1);
    return id;
}

export {changeMoneyFormat, getId};