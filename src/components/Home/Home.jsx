import './Home.css';
import '../Posts/Posts';
import { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';

const Home = () => {
    const [ isSent, setIsSent ] = useState(true);
    const [ posts, setPosts ] = useState(null);
    const [ allPosts, setAllPosts ] = useState(null);
    const [ replies, setReplies ] = useState(null);

    useEffect(() => {
        fetch('https://flippia-api.herokuapp.com/posts')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                setPosts(data);
                setAllPosts(data);
            });
        fetch('https://flippia-api.herokuapp.com/replies')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setReplies(data);
            })
    },[isSent]);

    return (  
        <div className="home">
            {posts && posts.length > 0 ? (
                <Posts allPosts={allPosts} posts={posts} setIsSent={setIsSent} setPosts={setPosts} replies={replies} />
            ):(
                <div className="loading">Trying to access the data...</div>
            )}
        </div>
    );
}
 
export default Home;
