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

const Alternatif = ({ alternatif_data }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });

    const alternatifData = [
        { value: "pelinggih", label: "Pelinggih" },
        { value: "candi", label: "Candi" },
    ];

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        id: "",
        nama_alternatif: "",
        kategori: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("alternatif.store"), {
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
            put(route("alternatif.update", data.id), {
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
        destroy(route("alternatif.destroy", id), {
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
        <MainLayout title="Alternatif" navbarTitle="Alternatif">
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
                                    <th className="text-center">Alternatif</th>
                                    <th className="text-center">Katgeori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alternatif_data.data.length > 0 ? (
                                    alternatif_data.data.map((val, ind) => (
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
                                                                nama_alternatif:
                                                                    val.nama_alternatif,
                                                                kategori:
                                                                    val.kategori,
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
                                            <td>{val.nama_alternatif}</td>
                                            <td className="capitalize">
                                                {val.kategori}
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
                        {alternatif_data.total > 10 && (
                            <Pagination
                                next={alternatif_data?.next_page_url}
                                prev={alternatif_data?.prev_page_url}
                                curr={alternatif_data?.current_page}
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
                        Alternatif
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <Input
                                type="text"
                                label="Alternatif"
                                name="nama_alternatif"
                                placeholder="Masukan Alternatif"
                                onChange={handleOnChange}
                                value={data?.nama_alternatif}
                                errorText={errors.nama_alternatif}
                            />

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Kategori</span>
                                </label>
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="kategori"
                                    onChange={handleOnChange}
                                    defaultValue={data.kategori}
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
                                    {alternatifData.map((val) => (
                                        <option
                                            value={val.value}
                                            selected={
                                                val.value === data.kategori
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {val.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

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

export default Alternatif;
