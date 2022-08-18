function Withdraw() {
  const [withdraw, setWithdraw] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  let userBalance = ctx.users[ctx.users.length - 1].balance;
  let userName = ctx.users[ctx.users.length - 1].name;

  function validate(number) {
    if (isNaN(number) || number < 0) {
      //alert: ("Error: Please enter a valid number");
      setStatus(
        "Your withdrawal could not be completed. Please enter a valid, positive number."
      );
      return false;
    }
    return true;
  }

  function overdraw(number) {
    if (Number(number) > userBalance) {
      setStatus(
        "Your withdrawal could not be completed. Withdrawal amount cannot be greater than your current balance."
      );
      clearForm();
      return false;
    }
    return true;
  }

  function handleWithdrawal(amount) {
    if (!validate(amount) || !overdraw(amount)) return;
    setBalance(userBalance - amount);
    setStatus("");

    ctx.users[ctx.users.length - 1].balance -= Number(amount);
    setShow(false);
  }

  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Make a Withdrawal"
      status={status}
      body={
        show ? (
          <>
            <h2>Welcome Back, {userName}!</h2>
            <h4>Your Current Balance: $ {userBalance}</h4>
            <br />
            <br />
            Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter an amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="Submit"
              className="btn btn-outline-dark"
              disabled={withdraw === ""}
              onClick={() => handleWithdrawal(withdraw)}
            >
              Confirm Withdraw Amount
            </button>
          </>
        ) : (
          <>
            <h5>Success!</h5>
            <button type="Submit" className="btn btn-dark" onClick={clearForm}>
              New Transaction
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
