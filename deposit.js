function Deposit() {
  const [deposit, setDeposit] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  let userBalance = ctx.users[ctx.users.length - 1].balance;
  let userName = ctx.users[ctx.users.length - 1].name;

  function validate(number) {
    if (isNaN(number) || number < 0) {
      setStatus(
        "Your deposit could not be completed. Please enter a valid, positive number"
      );
      return false;
    }
    return true;
  }

  function handleDeposit(amount) {
    if (!validate(amount)) return;
    setBalance(userBalance + amount);
    setStatus("");

    ctx.users[ctx.users.length - 1].balance += Number(amount);
    setShow(false);
  }

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="Blue"
      style="width: 50rem;"
      header="Make a Deposit"
      status={status}
      body={
        show ? (
          <>
            <h2>Welcome, {userName}!</h2>
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
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-outline-dark"
              disabled={deposit === ""}
              onClick={() => handleDeposit(deposit)}
            >
              Confirm Deposit Amount
            </button>
          </>
        ) : (
          <>
            <h5>Success!</h5>
            <button type="submit" className="btn btn-dark" onClick={clearForm}>
              Create a New Deposit
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
