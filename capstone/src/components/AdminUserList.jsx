import { useFetchUsersQuery } from '../api/storeApi';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const { data: users, isLoading, error } = useFetchUsersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div>
            <button className="back-button" onClick={() => navigate('/AdminHome')}>Back</button>
            <h1>Users</h1>
        </div>
    );
}