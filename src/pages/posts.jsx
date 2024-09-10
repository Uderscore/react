import { useEffect, useState } from 'react';
import axios from 'axios';
import './posts.css';
import Navbar from '../components/navbar';

const Posts = () => {
    // Create posts state using useState hook
    const [posts, setPosts] = useState([]);
    
    // Create error state using useState hook
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                // Get posts from the API and set them using setPosts
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {
                // Set error using setError
                setError(error);
                console.log(error);
            }
        };
        getPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            // Delete post with given id from the API
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            // Filter out the deleted post and update posts using setPosts
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            // Set error using setError
            setError(error);
            console.log(error);
        }
    };

    if (error) return <div>Failed to load</div>; // Show error message if there's an error
    if (!posts.length) return <div>Loading...</div>; // Show loading message if data is being fetched

    return (
        <div>
            <Navbar posts={posts} setPosts={setPosts} /> {/* Pass posts and setPosts as props to Navbar */}
            <div className='grid-container'>
                {posts.map(post => (
                    <div className="grid-item" key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <div>
                            <button className="delete-button" onClick={() => deletePost(post.id)}>Delete Post</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
