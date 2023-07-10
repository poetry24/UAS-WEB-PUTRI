import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const koneksiKaryawan = axios.create({
    baseURL: "http://127.0.0.1:5000/api/karyawan",
});

export default function FormKaryawan() {
    const [nik, setNik] = useState("");
    const [nama, setNama] = useState("");
    const [divisi, setDivisi] = useState("");
    const [tanggalCuti, setTanggalCuti] = useState("");
    const [foto, setFoto] = useState("");
    const [karyawan, setKaryawan] = useState([]);
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await koneksiKaryawan.post("/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const address = `/${selectedKaryawan.nik}`;
        const formData = {
            nik: selectedKaryawan.nik,
            nama,
            divisi,
            tanggal_cuti: tanggalCuti,
        };
        try {
            await koneksiKaryawan.put(address, formData);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = () => {
        setAddVisible(true);
        setEditVisible(false);
        setSelectedKaryawan(null);
        resetForm();
    };

    const handleCancelAdd = () => {
        setAddVisible(false);
        resetForm();
    };

    const handleCancelEdit = () => {
        setEditVisible(false);
        resetForm();
    };

    const handleDelete = async (nik) => {
        try {
            await koneksiKaryawan.delete(`/${nik}`);
            setKaryawan(karyawan.filter((karyawan) => karyawan.nik !== nik));
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    };

    const handleEdit = (karyawan) => {
        setNik(karyawan.nik);
        setNama(karyawan.nama);
        setDivisi(karyawan.divisi);
        setTanggalCuti(formatDate(karyawan.tanggal_cuti));
        setFoto(karyawan.foto);
        setAddVisible(false);
        setEditVisible(true);
        setSelectedKaryawan(karyawan);
    };

    const resetForm = () => {
        setNik("");
        setNama("");
        setDivisi("");
        setTanggalCuti(formatDate("2018-07-22"));
        setFoto("");
    };

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
                {addVisible && (
                    <form id="formadd" onSubmit={handleSubmitAdd}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>NIK:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="nik" name="nik" className="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Nama:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="nama"
                                            name="nama"
                                            className="text"
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Divisi:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="divisi"
                                            name="divisi"
                                            className="text"
                                            value={divisi}
                                            onChange={(e) => setDivisi(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Tanggal Cuti:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="tanggal_cuti"
                                            className="text"
                                            min="1970-01-01"
                                            max="2025-12-31"
                                            value={tanggalCuti}
                                            onChange={(e) => setTanggalCuti(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Foto:</label>
                                    </td>
                                    <td>
                                        <input type="file" name="images" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row-btn">
                            <input type="submit" className="btn btn-blue" value="Submit" />
                            <input
                                type="button"
                                value="Cancel"
                                onClick={handleCancelAdd}
                                className="btn btn-blue"
                            />
                        </div>
                    </form>
                )}

                {editVisible && selectedKaryawan && (
                    <form id="formedit" onSubmit={handleSubmitEdit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>NIK:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="nik" value={nik} name="nik" readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Nama:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="nama"
                                            value={nama}
                                            name="nama"
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Divisi:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="divisi"
                                            value={divisi}
                                            name="divisi"
                                            onChange={(e) => setDivisi(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Tanggal Cuti:</label>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={tanggalCuti}
                                            name="tanggal_cuti"
                                            onChange={(e) => setTanggalCuti(e.target.value)}
                                            min="1970-01-01"
                                            max="2025-12-31"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Foto:</label>
                                    </td>
                                    <td>
                                        <img src={foto} width="80" alt="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit" className="btn btn-blue" value="Submit" />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={handleCancelEdit}
                            className="btn btn-blue"
                        />
                    </form>
                )}

                <br />
                <br />

                <center>
                    <h1>Karyawan Yang Sudah Mengajukan Cuti</h1>
                </center>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>NIK</th>
                            <th>Nama</th>
                            <th>Divisi</th>
                            <th>Tanggal Cuti</th>
                            <th>Foto</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {karyawan.map((karyawan) => (
                            <tr key={karyawan.nik}>
                                <td>{karyawan.nik}</td>
                                <td>{karyawan.nama}</td>
                                <td>{karyawan.divisi}</td>
                                <td>{formatDate(karyawan.tanggal_cuti)}</td>
                                <td>
                                    <img className="table-image" src={karyawan.foto} alt="" />
                                </td>
                                <td>
                                    <button className="btn btn-blue" onClick={() => handleEdit(karyawan)}>
                                        Edit <i className="fas fa-heart"></i>
                                    </button>
                                    <button className="btn btn-blue" onClick={() => handleDelete(karyawan.nik)}>
                                        Delete <i className="fas fa-exchange-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button id="btnadd" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
}
