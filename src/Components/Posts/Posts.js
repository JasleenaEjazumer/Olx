import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/PostContext';

function Posts() {
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const {setPostDetails}= useContext(PostContext)

  useEffect(() => {
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        console.log(allPosts);
        setProducts(allPosts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [firebase]);

  const viewPostHandler = (id) => {
    const selectedPost = products.find((post) => post.id === id);
    console.log(selectedPost);

    if (selectedPost) {
      history.push({
        pathname: '/View',
        state: { post: selectedPost },
      });
    }
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => viewPostHandler(product.id)}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
