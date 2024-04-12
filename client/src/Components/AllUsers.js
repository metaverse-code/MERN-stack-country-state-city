import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4500/api/users/getuserlist');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <NavLink to="/" className="navigateLink">Enter New Record</NavLink>
      <div className="table-container">
        {users.length > 0 ? (
          <table className="user-table"> 
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.selectedCountry}</td>
                  <td>{user.selectedState}</td>
                  <td>{user.selectedCity}</td>
                  <td>{user.gender}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found</p>
        )}
      </div>
    </>
  )
}

export default AllUsers