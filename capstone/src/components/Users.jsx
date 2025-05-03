import { useFetchUsersQuery } from '../api/storeApi';

export default function Users() {
    const { data: users, isLoading, error } = useFetchUsersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div>
            <h1>Users</h1>
        </div>
    );
}