import React, {useState,useContext, Fragment } from 'react';
import { FirebaseContext,AuthContext } from '../../store/Context';
import {useHistory} from 'react-router-dom';
import './Create.css';
import {useForm} from './useForm'
import Header from '../Header/Header';
import useImageUpload from './useImageUpload';

const Create = () => {

  const history = useHistory();
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);

  const [value, handleChange] = useForm({
    name: "",
    category: "",
    price: "",
  
   
  });

  const { file, handleImageChange, url, setURL } = useImageUpload();
const date= new Date()

  const handleUpload = async (e) => {
    e.preventDefault();
    const { category, name, price } = value;
    const {ref} = await firebase
      .storage()
      .ref(`/images/${file.name}`)
      .put(file);
    ref.getDownloadURL().then(async (url) => {
      setURL(url);
      console.log('success to uploaded image');
      const date = new Date();
      await firebase.firestore().collection('products').add({
        name,
        price,
        url,
        category,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
      history.push('/');
    });
  };
 

  console.log(file);



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
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
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={value.category}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" 
            id="fname" 
            name="price" 
            value={value.price}
            onChange={handleChange}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={file ? URL.createObjectURL(file) : ''}></img>
          <form onSubmit={handleUpload}>
            <br />
            <input type="file" onChange={handleImageChange} />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
