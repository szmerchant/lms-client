// data { currency: "", amount: "" }
export const currencyFormatter = data => {
    // TODO: does this make sense?
    return ((data.amount * 100) / 100).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency
    });
};

export const stripeCurrencyFormatter = data => {
    return (data.amount / 100).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency
    });
};