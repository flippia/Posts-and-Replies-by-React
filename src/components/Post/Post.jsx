import './Post.css';
import { useHistory, useParams } from 'react-router';
import { useState, useEffect } from 'react';

const Post = () => {    
    const { id } = useParams();
    const [ post, setPost ] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8000/posts/' + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setPost(data);
            })
    },[]);

    const handleDelete = () => {
        fetch('http://localhost:8000/posts/' + post.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (  
        <div className="post-details">
            {post ? (
                <div>
                    <h2>{post.authorName}</h2>
                    <h3>{post.authorEmail}</h3>
                    <p>{post.freeTextArea}</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ):(
                <div className="loading">Trying to access the data</div>
            )}
        </div>
    );
}
 
export default Post;
