import { useState } from "react";
import './Register.css'
import { registerUser } from "../../Services/AuthService";
import imageToBase64 from 'image-to-base64/browser'
import { checkUser } from "../../Services/UserService";
import MenuBookIcon from '@mui/icons-material/MenuBook';


const Register = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    let blankField = false;

    if (name.trim() === "") {
      setUserError("You must fill the username field");
      blankField = true;
    }
    if (email.trim() === "") {
      setEmailError("You must fill the email field");
      blankField = true;
    }
    if (password.trim() === "") {
      setPasswordError("You must field the password field");
      blankField = true;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("You must confirm your password");
      blankField = true;
    }


    if (!blankField && userError === "" && emailError === "" && passwordError === "" && confirmPasswordError === "") {
      // Convierto la imagen a encode64 para su envío
      imageToBase64(
        `https://ui-avatars.com/api/?name=${name}&background=333&color=f3f3f3&size=512`
      )
        .then((base64String) => {
          const userObject = {
            username: name,
            password: password,
            email: email,
            profileImage: base64String,
          };

          // Registro el usuario
          registerUser(userObject)
            .then((data) => {
              props.setInRegister(false);
            })
        })
    }
  };


  const onUsernameChange = (value) => {
    setName(value);
    if (value.length < 4) {
      setUserError("The username must have at least 4 characters");
    } else {
      checkUser(value).then((result) => {
        if (!result) {
          setUserError("");
        } else {
          setUserError("This username is already in use");
        }
      })
    }
  }

  const onEmailChange = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(value);
    setEmail(value);
    if (isValidEmail) {
      setEmailError("");
    } else {
      setEmailError("Use a valid email");
    }
  }

  const onPasswordChange = (value) => {
    setPassword(value);
    if (value.length < 5) {
      setPasswordError("The password must have at least 5 characters");
    } else {
      setPasswordError("");
    }

  }

  const onConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("The passwords do not match")
    } else {
      setConfirmPasswordError("");
    }
  }



  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>

        <div className="center">
          <h2 className="register-tittle">Register now</h2>
        </div>
        <div className="center">
          <MenuBookIcon style={{ fontSize: '8rem', color: '#333' }}></MenuBookIcon>
        </div>
        <div className="row">
          <p className="register-text">Username </p>
          <p className="register-form-error">{userError}</p>
        </div>
        <input type="text" placeholder="User" value={name} onChange={(event) => onUsernameChange(event.target.value)} />

        <div className="row">
          <p className="register-text">Email</p>
          <p className="register-form-error">{emailError}</p>
        </div>
        <input type="text" placeholder="Email" value={email} onChange={(event) => onEmailChange(event.target.value)} />

        <div className="row">
          <p className="register-text">Password </p>
          <p className="register-form-error">{passwordError}</p>
        </div>
        <input type="password" placeholder="Password" value={password} onChange={(event) => onPasswordChange(event.target.value)} />

        <div className="row">
          <p className="register-text">Confirm password </p>
          <p className="register-form-error">{confirmPasswordError}</p>
        </div>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => onConfirmPasswordChange(event.target.value)} />

        <div className="center">
          <button type="submit" className="button">Register</button>
        </div>


      </form>
    </>
  );
}
export default Register;