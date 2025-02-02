import "./navbar.css";
import axios from 'axios';

const Navbar = ({ posts, setPosts }) => {

    const addPost = async () => {
        const new_post = {
            title: "New Post",
            body: "New Post Body"
        };

        try {
            // Send a POST request to the API
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', new_post);

            // Add the new post to the posts array and update state
            setPosts([response.data, ...posts]);
        } catch (error) {
            console.error("There was an error adding the post!", error);
        }
    };

    return (
        <nav className="navbar">
            <div id="logo">
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fdownload%2Freact%2Flogo-react-1024.png&f=1&nofb=1&ipt=7214a431bfb13e49842c502d3fec5b8e89d3c83e6d285c9eb146bac546229832&ipo=images"
                    alt="React Logo"
                    width="100"
                />
            </div>

            <ul id="right-content">
                <button onClick={addPost} className="add-post">
                    Add Post
                </button>
            </ul>
        </nav>
    );
}

export default Navbar;
