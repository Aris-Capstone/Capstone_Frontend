import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchUsersQuery, useFetchProductsQuery } from '../api/storeApi';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { data: users, isLoading: usersLoading } = useFetchUsersQuery();
    const { data: products, isLoading: productsLoading } = useFetchProductsQuery();

    if (usersLoading || productsLoading) {
        return <div>Loading...</div>;
    }
    //have a basic admin dashboard to access admin functionality 
    return (
        <div className="admin-home">
            <h1>Admin Dashboard</h1>
            <div className="admin-welcome">
                <h2>Welcome, {user?.name || 'Admin'}</h2>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{users?.length || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{products?.length || 0}</p>
                </div>
            </div>

            <div className="admin-actions">
                <h3>Quick Actions</h3>
                <div className="admin-buttons">
                    <button className="users-button" onClick={() => navigate('/admin_users')}>View Users</button>
                    <button className="products-button" onClick={() => navigate('/products')}>Manage Products</button>
                </div>
            </div>
        </div>
    );
} 