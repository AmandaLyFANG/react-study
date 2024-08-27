import React from "react";

export default function UserList(){
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchUsers = async () => {
        setLoading(true);

        try{
            const res = await fetch('http://localhost:5000/users')
            const json = await res.json();
            setUsers(json.data);
        }catch (err){
            setError(err);
        }
        setLoading(false);

    };

    return (<div className="user-list">
        <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Load'}
        </button>
        {error && <div className="error">{error}</div>}

        {users.length > 0 &&
        users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>
        })}

    </div>)
}