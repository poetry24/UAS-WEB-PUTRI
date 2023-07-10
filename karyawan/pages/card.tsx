import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const koneksiKaryawan = axios.create({
    baseURL: "http://127.0.0.1:5000/api/karyawan",
});

export default function FormKaryawan() {
    const [karyawan, setKaryawan] = useState([]);

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        async function getKaryawan() {
            try {
                const response = await koneksiKaryawan.get("/");
                setKaryawan(response.data.data);
            } catch (error) {
                console.error("Error from karyawan in api karyawan:", error);
            }
        }
        getKaryawan();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <br />
                <br />

                <center>
                    <h1>Karyawan Yang Sudah Mengajukan Cuti</h1>
                </center>
                <br />
                <div className="card-container">
                    {karyawan.map((karyawan) => (
                        <div key={karyawan.nik} className="card">
                            <img className="card-image" src={karyawan.foto} alt="" />
                            <div className="card-content">
                                <h3 className="card-title">{karyawan.nama}</h3>
                                <p className="card-text">NIK: {karyawan.nik}</p>
                                <p className="card-text">Divisi: {karyawan.divisi}</p>
                                <p className="card-text">Tanggal Cuti: {formatDate(karyawan.tanggal_cuti)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
