import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        // Fetch user details
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch user.');
                setLoading(false);
            });
        // Fetch posts by user ID
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                setError('Failed to fetch posts.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div>
                    <p>{error}</p>
                    <button onClick={fetchData}>Retry</button>
                </div>
            ) : (
                <div>
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <h4>Posts:</h4>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <strong>{post.title}</strong>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                    <Link to="/">Back to User List</Link>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
