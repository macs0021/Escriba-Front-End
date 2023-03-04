import { useState } from "react";
import './Register.css'
import AuthService from "../../Services/AuthService";

const Register = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    
    event.preventDefault();

    console.log(`Name: ${name}, Email: ${email}, Password: ${password},  Confirm Password: ${confirmPassword}`);

    const userObject = { "username": name, "password": password };

    console.log("REGISTRO DE " + JSON.stringify(userObject));

    AuthService.registerUser(userObject).then(data => {
      console.log(data);
      props.setInRegister(false);
    })

  };



  return (
    <>

      <form className="register-form" onSubmit={handleSubmit}>

        <h2 className="register-tittle">Register now</h2>

        <p className="register-form-error"></p>
        <input type="text" placeholder="User" value={name} onChange={(event) => setName(event.target.value)} />

        <p className="register-form-error"></p>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <p className="register-form-error"></p>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <p className="register-form-error"></p>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />

        <button type="submit" className="register-button">Registrarse</button>

      </form>
    </>
  );
}
export default Register;