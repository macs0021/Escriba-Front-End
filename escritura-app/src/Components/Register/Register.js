import { useState } from "react";
import './Register.css'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Email: ${email}, Password: ${password},  Confirm Password: ${confirmPassword}`);
    // Aquí puedes enviar los datos del formulario a un servidor para su procesamiento
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