import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Import your CSS styles if needed
import Swal from 'sweetalert';

import { Link } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getUsers();
}, []);

const getUsers = async () => {
  try {
    const response = await axios.get("https://express-js-eight.vercel.app/users");
    const data = response.data.data; // Akses properti 'data' dari objek response
    console.log(data);
    if (Array.isArray(data)) {
      setUsers(data);
      setLoading(false);
    } else {
      console.error("Format data tidak valid: Harapkan sebuah array.");
      setLoading(false); // Set loading to false even if the data format is invalid
    }
  } catch (error) {
    console.log(error);
    setLoading(false); // Set loading to false in case of an error
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`https://express-js-eight.vercel.app/users/${id}`);
    getUsers();
    // Tampilkan SweetAlert ketika pengguna berhasil menghapus data
    Swal('Berhasil!', 'Data berhasil dihapus', 'success');
  } catch (error) {
    // Jika ada kesalahan, tampilkan pesan kesalahan dari respons server
    if (error.response && error.response.data && error.response.data.message) {
      Swal('Error', error.response.data.message, 'error');
    } else {
      Swal('Error', 'Terjadi kesalahan saat menghapus data', 'error');
    }
    console.log(error);
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>
                  <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
