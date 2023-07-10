import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './View.css';

function View() {
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  const [userDetails, setUserDetails] = useState(null);
  const userId = postDetails && postDetails.userId;

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
  
      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((result) => {
          result.forEach((doc, index) => {
            console.log(doc.data());
            setUserDetails(doc.data());
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebase, userId]);

  console.log(postDetails && postDetails.url, 'Checking postDetails.url');

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={
            postDetails && postDetails.url
              ? postDetails.url
              : 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75'
          }
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails ? postDetails.price : '123456'}</p>
          <span>
            {postDetails ? postDetails.name : 'Hyundai i10 Magna, 2008, Petrol'}
          </span>
          <p>{postDetails ? postDetails.category : 'Two Wheeler'}</p>
          <span>{postDetails ? postDetails.createdAt : 'Tue May 04 2021'}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails ? userDetails.name : 'No name'}</p>
          <p>{userDetails ? userDetails.phone : '1234567890'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
