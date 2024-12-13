import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        // Fetch users
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch users.');
                setLoading(false);
            });
        // Fetch posts
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                setError('Failed to fetch posts.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getPostsByUserId = (userId) => {
        return posts.filter(post => post.userId === userId);
    };

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
                    <h2>Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <h3>
                                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                                </h3>
                                <p>Email: {user.email}</p>
                                <h4>Posts:</h4>
                                <ul>
                                    {getPostsByUserId(user.id).map(post => (
                                        <li key={post.id}>
                                            <strong>{post.title}</strong>
                                            <p>{post.body}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserList;
