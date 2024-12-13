import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch data. Please try again.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
