import {
    Alert,
    Input,
    Modal,
    Pagination,
    Textarea,
} from "@/Pages/AdminPanel/Components";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../../../Layouts";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const Barang = ({ barang_data, dropdown_kategori }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        progress,
        delete: destroy,
    } = useForm({
        id: "",
        nama_barang: "",
        id_kategori_barang: "",
        ukuran: "",
        harga: "",
        diskon: 0,
        stok: 0,
        foto_barang: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("barang.store"), {
                onSuccess: () => {
                    setModalConfig({ ...modalConfig, show: false, type: "" });
                    setAlertConfig({
                        ...alertConfig,
                        show: true,
                        type: "success",
                        text: "Tambah Data Berhasil",
                    });
                    reset();
                },
                onError: () => {},
                onFinish: () => {},
            });
        }
        if (modalConfig.type === "update") {
            put(route("barang.update", data.id), {
                onSuccess: () => {
                    setModalConfig({ ...modalConfig, show: false, type: "" });
                    setAlertConfig({
                        ...alertConfig,
                        show: true,
                        type: "success",
                        text: "Ubah Data Berhasil",
                    });
                    reset();
                },
                onError: () => {},
                onFinish: () => {},
            });
        }
    };

    const deleteSubmit = (id) => {
        destroy(route("barang.destroy", id), {
            onSuccess: () => {
                setAlertConfig({
                    ...alertConfig,
                    show: true,
                    type: "error",
                    text: "Hapus Data Berhasil",
                });
            },
        });
    };

    return (
        <MainLayout title="Barang" navbarTitle="Barang">
            {alertConfig.show && (
                <Alert type={alertConfig.type} text={alertConfig.text} />
            )}
            <div className="card w-full bg-base-100 shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between mb-3">
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                                setModalConfig({
                                    ...modalConfig,
                                    show: true,
                                    type: "add",
                                })
                            }
                        >
                            Tambah
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-compact table-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">No</th>
                                    <th className="text-center">Aksi</th>
                                    <th className="text-center">Barang</th>
                                    <th className="text-center">Kategori</th>
                                    <th className="text-center">Harga</th>
                                    <th className="text-center">Foto Barang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barang_data.data.length > 0 ? (
                                    barang_data.data.map((val, ind) => (
                                        <tr>
                                            <td className="w-10">{ind + 1}</td>
                                            <td className="w-10">
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-outline btn-success btn-sm"
                                                        onClick={() => {
                                                            setModalConfig({
                                                                ...modalConfig,
                                                                show: true,
                                                                type: "update",
                                                            });
                                                            setData({
                                                                nama_barang:
                                                                    val.nama_barang,
                                                                id_kategori_barang:
                                                                    val.id_kategori_barang,
                                                                ukuran: val.ukuran,
                                                                harga: val.harga,
                                                                diskon: val.diskon,
                                                                stok: val.stok,
                                                                foto_barang:
                                                                    val.foto_barang,
                                                                id: val.id,
                                                            });
                                                        }}
                                                    >
                                                        <HiOutlinePencilAlt />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline btn-error btn-sm"
                                                        onClick={() => {
                                                            deleteSubmit(
                                                                val.id
                                                            );
                                                        }}
                                                    >
                                                        <HiOutlineTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{val.nama_barang}</td>
                                            <td>
                                                {
                                                    val.kategori
                                                        .nama_kategori_barang
                                                }
                                            </td>
                                            <td>{val.harga}</td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${val.foto_barang}`}
                                                        width="100"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center font-bold text-xl"
                                        >
                                            Tidak Ada Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center">
                        {barang_data.total > 10 && (
                            <Pagination
                                next={barang_data?.next_page_url}
                                prev={barang_data?.prev_page_url}
                                curr={barang_data?.current_page}
                            />
                        )}
                    </div>
                </div>
            </div>

            <input
                type="checkbox"
                className="modal-toggle"
                checked={modalConfig.show}
            />
            <div className="modal">
                <div className="modal-box">
                    <div className="font-bold mb-3">
                        {modalConfig.type === "add" ? "Tambah" : "Ubah"} Data
                        Barang
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <Input
                                type="text"
                                label="Barang"
                                name="nama_barang"
                                placeholder="Masukan Barang"
                                onChange={handleOnChange}
                                value={data?.nama_barang}
                                errorText={errors.nama_barang}
                            />
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Kategori Barang
                                    </span>
                                </label>
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="id_kategori_barang"
                                    onChange={handleOnChange}
                                    defaultValue={data.id_kategori_barang}
                                >
                                    <option
                                        disabled
                                        selected={
                                            modalConfig.type === "add"
                                                ? true
                                                : false
                                        }
                                    >
                                        Pilih Salah Satu
                                    </option>
                                    {dropdown_kategori.map((val) => (
                                        <option
                                            value={val.id}
                                            selected={
                                                val.id ===
                                                data.id_kategori_barang
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {val.nama_kategori_barang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                type="text"
                                label="Ukuran"
                                name="ukuran"
                                placeholder="Masukan Ukuran"
                                onChange={handleOnChange}
                                value={data?.ukuran}
                                errorText={errors.ukuran}
                            />
                            <Input
                                type="text"
                                label="Harga"
                                name="harga"
                                placeholder="Masukan Harga"
                                onChange={handleOnChange}
                                value={data?.harga}
                                errorText={errors.harga}
                            />
                            <Input
                                type="number"
                                label="Diskon"
                                name="diskon"
                                placeholder="Masukan Diskon"
                                onChange={handleOnChange}
                                value={data?.diskon}
                                errorText={errors.diskon}
                            />
                            <Input
                                type="number"
                                label="Stok"
                                name="stok"
                                placeholder="Masukan Stok"
                                onChange={handleOnChange}
                                value={data?.stok}
                                errorText={errors.stok}
                            />
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Foto Barang
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-sm file-input-bordered w-full"
                                    name="foto_barang"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            foto_barang: e.target.files[0],
                                        })
                                    }
                                />
                            </div>
                            {progress && (
                                <progress
                                    value={progress.percentage}
                                    className="w-full"
                                    max="100"
                                >
                                    {progress.percentage}%
                                </progress>
                            )}
                            <div className="modal-action">
                                <button
                                    className="btn btn-sm"
                                    type="reset"
                                    onClick={() => {
                                        setModalConfig({
                                            ...modalConfig,
                                            show: false,
                                            type: "",
                                        });
                                        reset();
                                    }}
                                >
                                    Tutup
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    disabled={processing}
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Barang;
