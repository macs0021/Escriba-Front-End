import { useState } from "react";
import './Register.css'
import AuthService from "../../Services/AuthService";
import DefaultProfilePicture from '../../files/DefaultProfilePicture.jpg'
import imageToBase64 from 'image-to-base64/browser'


const Register = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log(`Name: ${name}, Email: ${email}, Password: ${password},  Confirm Password: ${confirmPassword}`);


    //Convierto la imagen a encode64 para su envio
    imageToBase64(`https://ui-avatars.com/api/?name=${name}&background=333&color=f3f3f3&size=512`).then(base64String => {
      const userObject = { "username": name, "password": password, "profileImage": base64String };

      //Registro el usuario
      AuthService.registerUser(userObject).then(data => {
        console.log(data);
        props.setInRegister(false);
      })
    })
      .catch(err => {
        console.log("error converting img to encode64");
      });
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