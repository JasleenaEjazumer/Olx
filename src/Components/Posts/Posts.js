
import React, { useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FirebaseContext} from '../../store/Context';
import Heart from '../../assets/Heart';
// import {PostContext} from '../../store/PostContext';
import './Post.css';

function Posts() {
  const history = useHistory();

  let posts;
  const {firebase} = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);

  // const {setPostDetails} = useContext(PostContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection('products').get() .then((snapshot) => {
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

//   const viewPstHandler = (id) => {
//     let selectedPost = products.filter((post) => post.id === id);
//     console.log(selectedPost);
//     // setPostDetails(selectedPost[0]);
//     history.push('/view');
//   };

//   if (products) {
//     posts = products.map((obj, index) => (
//       <div key={index} className="card" onClick={() => viewPstHandler(obj.id)}>
//         <div className="favorite">
//         <Heart></Heart>
//         </div>
//         <div className="image">
//           <img src={obj.url} alt="" />
//         </div>
//         <div className="content">
//           <p className="rate">&#x20B9; {obj.price}</p>
//           <span className="kilometer">{obj.category}</span>
//           <p className="name"> {obj.name}</p>
//         </div>
//         <div className="date">
//           <span>{obj.createdAt}</span>
//         </div>
//       </div>
//     ));
//   }

//   return (
//     <div className="postParentDiv">
//       <div className="moreView">
//         <div className="heading">
//           <span>Quick Menu</span>
//           <span>View more</span>
//         </div>
//         <div className="cards">{posts}</div>
//       </div>
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
//         <div className="cards">{posts}</div>
//       </div>
//     </div>
//   );
// }

// export default Posts;



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{
            return(
        
          <div
            className="card"  
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
            );
            })
          }
        </div>
        
      
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map(product=>{
            return(
        
          <div className="card" key={product.id}>
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
              <span>{product.date}</span>
            </div>
          </div>
            );
            
              })
            }
        </div>
      </div>
    </div>
  );
}

export default Posts;
