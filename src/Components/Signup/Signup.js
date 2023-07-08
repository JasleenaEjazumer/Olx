import React, { useContext } from 'react';
import { useForm } from "./useForm";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [value, handleChange] = useForm({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, phone } = value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name })
          .then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              name: name,
              phone: phone
            }).then(() => {
              history.push("/login");
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={value.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="mname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="mname"
            name="email"
            value={value.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={value.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="passwrd">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="passwrd"
            name="password"
            value={value.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
