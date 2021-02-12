import React, {useState, useEffect} from 'react';
import { Link, useParams, useHistory } from "react-router-dom";

const Product = ({products, user, replyComment, commentOnProduct}) => {
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [reply, setReply] = useState('');
  const [product, setProduct] = useState('');
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
      if (!user) {
        history.push('/')
      }
    }, [user]);

  useEffect(() => {
    const prod = products.find((product) => product._id === params.id);
    setProduct(prod);
  }, [products]);

  const handleSaveComment = (e) => {
    e.preventDefault();
    commentOnProduct({commentBody: comment}, params.id);
  }

  const handleSaveReply = (e) => {
    e.preventDefault();
    replyComment({replyBody: comment}, params.id, commentId)
  }

  return (
    <div className="products__wrapper">
      <Link to="/"><button type="button"> {'<'} Back </button></Link>
      <div className="products__container">
        <div className="product_card">
          <img className="product_image" src={product.image} alt={product.name} />
          <span className="product_name">{product.name}</span>
          <span className="product_owner">{product.userName}</span>
          <span className="product_location">{product.location}</span>
        </div>
      </div>
      <div className="comments__container">
        <div className="comment_wrapper">
          <form onSubmit={(e) => handleSaveComment(e)} className="location_filter">
            <div className="input_wrapper">
              <input type="text" required onChange={(event) => setComment(event.target.value)} value={comment} placeholder="Enter comment" />
            </div>
            <button type="submit"> Add Comment </button>
            </form>
          </div>
          <div className="comments__wrapper">
            {
              product.comments && product.comments.map((comment) => (
                <div className="comment">
                  <span>{comment.body}</span>
                  <span>{comment.giver.name}</span>
                  <div className="reply_wrapper">
                    <form onSubmit={(e) => handleSaveReply(e)} className="location_filter">
                      <div className="input_wrapper">
                        <input type="text" required onChange={(event) => {
                          setCommentId(comment.id);
                          setReply(event.target.value);
                        }} value={reply} placeholder="Enter Reply" />
                      </div>
                      <button type="submit"> Reply Comment </button>
                    </form>
                    {
                      comment.replies && comment.replies.map((reply) => (
                        <div>
                          <span>{reply.body}</span>
                          <span>{reply.giver.name}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
};

export default Product;
