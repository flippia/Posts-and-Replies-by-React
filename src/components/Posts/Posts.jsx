import './Posts.css';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Reply from '../Reply/Reply';

const Posts = ({allPosts, posts, setIsSent, setPosts, replies}) => {    
    const [ search, setSearch ] = useState('');
    const [ pattern, setPattern ] = useState('');
    const [ isSearch, setIsSearch ] = useState(false);
    const [ filterReplies, setFlilterReplies ] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearch(true);
        setPosts(allPosts.filter(post => 
            (post.freeTextArea.match(pattern) || post.authorName.match(pattern) || post.authorEmail.match(pattern))
        ));
    };

    const handleReset = (e) => {
        e.preventDefault();
        setIsSearch(false);
        setSearch('');
        setIsSent(isSent => isSent = !isSent);
    }

    useEffect(() => {
        const Contents = Array.from(document.querySelectorAll('.content'));

        if(isSearch === true){
            if(search !== ''){
                Contents.forEach(content => {
                    content.innerHTML = content.textContent.replace(pattern, match => `<span style="background-color: AliceBlue; font-weight: bold; text; border-radius: 0.2em; padding: 0.1em">${match}</span>`);
                });
            };
        }else{
            Contents.forEach(content => {
                content.innerHTML = content.textContent.replace(/<\/?span[^>]*>/g,'');
            });
        };        
    });

    return (  
        <div className="posts">
            <form className="search" onSubmit={handleSearch}>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Reset</button>
                <input type="text" 
                value={search}
                onChange={e => {
                    setSearch(e.target.value.replace(/[.*+?^${}()|[\]\\]/gi,"\\$&"));
                    setPattern(new RegExp(`${e.target.value.replace(/[.*+?^${}()|[\]\\]/gi,"\\$&")}`, "gi"));
                }}
                placeholder="Please input here"></input>
            </form>
            {posts.map(post => (
                <div className="post-preview" key={post.id}>
                    {/* <Link to={`/posts/${post.id}`}>
                        <h3>{post.authorName}</h3>
                        <h4>{post.authorEmail}</h4>
                    </Link> */}
                    <div>
                        <div className="post-author">
                            <h3 className="content">{post.authorName}</h3>
                            <h4 className="content">{post.authorEmail}</h4>
                        </div>
                        <div className="post-body">
                            <p className="content">{post.freeTextArea}</p>
                        </div>
                        {replies && replies.filter(replies => replies.postID === post.id).map(reply => (
                            <div className="reply" key={reply.id}>
                                <div className="reply-author">
                                    <h5>{reply.authorName}</h5>
                                    <h6>{reply.authorEmail}</h6>
                                </div>
                                <div className="reply-body">
                                    <p>{reply.freeTextArea}</p>
                                </div>
                            </div>
                        ))}
                        < Reply id={post.id} setIsSent={setIsSent} />
                        <div className="buttons">                            
                            <button onClick={() => {
                                fetch('http://localhost:8000/posts/' + post.id, {
                                method: 'DELETE'
                                })
                                .then(() => {
                                    fetch('http://localhost:8000/replies')
                                    .then(res => {
                                        return res.json();
                                    })
                                    .then(data => {
                                        data.filter(replies => replies.postID === post.id).forEach(reply => {
                                            fetch('http://localhost:8000/replies/' + reply.id, {
                                            method: 'DELETE'
                                            })
                                        });
                                    })
                                }).then(() => {
                                    setIsSent(isSent => isSent = !isSent)
                                })                                
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default Posts;