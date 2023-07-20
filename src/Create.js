import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import "./create.css";

import { Link } from "react-router-dom";

const CreateUser = () => {
    const [name, setName] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("https://express-js-eight.vercel.app/users", {
                name: name,
            });

            if (response.data.success) {
                Swal("Sukses!", "Data karyawan berhasil ditambahkan.", "success");
                setName(""); // Reset input field after successful submission
            } else {
                Swal("Error", "Gagal menambahkan data karyawan.", "error");
            }
        } catch (error) {
            Swal("Error", "Terjadi kesalahan saat menambahkan data karyawan.", "error");
            console.log(error);
        }
    };

    return (
        <div className="column is-half">
            <Link to={`/`} className="button is-success">
                Back
            </Link>

            <div className="container mt-5">
                <div className="card">
                    <div className="card-title">
                        <h2>Tambah Karyawan Baru</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nama Karyawan</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;