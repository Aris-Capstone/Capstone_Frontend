import { useFetchUsersQuery } from '../api/storeApi';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const { data: users, isLoading, error } = useFetchUsersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    //render the user list
    return (
        <div>
            <button className="back-button" onClick={() => navigate('/AdminHome')}>Back</button>
            <h1>Users</h1>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Mailing Address:</strong> {user.mailing_address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}