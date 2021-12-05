import './Reply.css';
import { useState } from 'react';

const Reply = ({id, setIsSent}) => {
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const reply = { authorName: author, authorEmail: email, freeTextArea: body, postID: id };
        if( author!=='' && email!=='' && body!=="" ){
            fetch('https://intense-waters-27320.herokuapp.com/replies', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reply)
            }).then(() => {
                setAuthor('');
                setEmail('');
                setBody('');
                setIsSent(isSent => isSent = !isSent);
            });
        }
    }

    return (  
        <form className="make-a-reply" onSubmit={submitHandler}>
            <div className="header">
                <label>Replier Name:</label>
                <input 
                type="text" 
                required 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
                <label>Replier Email:</label>
                <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={submitHandler}>Reply</button>
                </div>                                                        
                <textarea
                required
                value={body}
                placeholder="Please input here"
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
        </form>
    );
}
 
export default Reply;
