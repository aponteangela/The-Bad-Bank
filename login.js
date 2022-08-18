function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  
  
  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    if (!validate(email,'email'))    return;
    if (!validate(password,'password')) return;
    const user = ctx.users.find((user) => user.email == email);
    if (!user) {
      setStatus('Invalid User');
      setTimeout(() => setStatus(''),3000);
      return;
    }

    if (user.password == password){
      setShow(false);
      ctx.loggedIn.push({user});
      console.log(ctx);
      return;
    } 

    else {
      setStatus('Invalid Password')
      setTimeout(() => setStatus(''),3000);
      return;
    }
    
   

  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="grey"
      txtcolor="DarkGreen"
      header="Login"
      status={status}
      body={show ? (  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" disabled={(password && email) ?false:true} className="btn btn-green" onClick={handleLogin}>Submit</button>
              </>
            ):(
              <>
              <h5>Success!</h5>
              <button type="submit" className="btn btn-green" onClick={clearForm}>Login</button>
              </>
            )}
    />
  )
}