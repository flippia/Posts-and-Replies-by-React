import './CreatePost.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');    
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { authorName:author, authorEmail:email, freeTextArea:body };

        fetch('http://localhost:8000/posts/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        }).then(() => {
            history.push('/');
        })
    }

    return (  
        <div className="create-post">
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
            <label>Author Name:</label>
            <input 
            type="text" 
            required 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
            <label>Author Email:</label>
            <input 
            type="text" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label>Text Area:</label>
            <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button>Add Post</button>
            </form>
        </div>
    );
}
 
export default CreatePost;
