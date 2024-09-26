const TransactionData = (data) => {
  console.log(data);
  const updatedRows = data
    ? data.map((transaction) => ({
        id: transaction.id,
        "click id": transaction.click_id,
        amount: transaction.amount,
        "expires month": transaction.expires_month,
        "user id": transaction.user_id,
        "Merchant Id": transaction.merchant_id,
        "User Token": transaction?.user_token,
        Error: transaction?.error,
        "Error Note": transaction?.error_note,
      }))
    : [];

  const columns = [
    { name: "id", align: "center" },
    { name: "click id", align: "center" },
    { name: "amount", align: "center" },
    { name: "expires month", align: "center" },
    { name: "user id", align: "center" },
    { name: "Merchant Id", align: "center" },
    { name: "User Token", align: "center" },
    { name: "Error", align: "center" },
    { name: "Error Note", align: "center" },
  ];

  return { columns, updatedRows };
};

export default TransactionData;
