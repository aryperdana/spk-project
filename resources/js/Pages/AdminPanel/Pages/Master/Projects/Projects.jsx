import {
    Alert,
    Input,
    Modal,
    Pagination,
    Textarea,
} from "@/Pages/AdminPanel/Components";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../../../Layouts";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const Projects = ({ projects_data, user_data, id_user }) => {
    console.log(id_user);
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
        delete: destroy,
    } = useForm({
        id: "",
        nama_project: "",
        tanggal: "",
        lokasi_pura: "",
        deskripsi_project: "",
        id_user: id_user,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("projects.store"), {
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
            put(route("projects.update", data.id), {
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
        destroy(route("projects.destroy", id), {
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
        <MainLayout title="Projects" navbarTitle="Projects">
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
                        <Link
                            className="btn btn-primary btn-sm"
                            href="projects/create"
                        >
                            Tambah
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-compact table-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">No</th>
                                    <th className="text-center">Aksi</th>
                                    <th className="text-center">Tanggal</th>
                                    <th className="text-center">
                                        Nama Project
                                    </th>
                                    <th className="text-center">Lokasi Pura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects_data.data.length > 0 ? (
                                    projects_data.data.map((val, ind) => (
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
                                                                id: val?.id,
                                                                nama_project:
                                                                    val?.nama_project,
                                                                tanggal:
                                                                    val?.tanggal,
                                                                lokasi_pura:
                                                                    val?.lokasi_pura,
                                                                deskripsi_project:
                                                                    val?.deskripsi_project,
                                                                id_user:
                                                                    val?.id_user,
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
                                            <td>{val.tanggal}</td>
                                            <td>{val.nama_project}</td>
                                            <td>{val.lokasi_pura}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
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
                        {projects_data.total > 10 && (
                            <Pagination
                                next={projects_data?.next_page_url}
                                prev={projects_data?.prev_page_url}
                                curr={projects_data?.current_page}
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
                        Projects
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <Input
                                type="date"
                                label="Tanggal"
                                name="tanggal"
                                placeholder="Masukan Tanggal"
                                onChange={handleOnChange}
                                value={data?.tanggal}
                                errorText={errors.tanggal}
                            />
                            <Input
                                type="text"
                                label="Nama Project"
                                name="nama_project"
                                placeholder="Masukan Projects"
                                onChange={handleOnChange}
                                value={data?.nama_project}
                                errorText={errors.nama_project}
                            />
                            <Textarea
                                label="Deskripsi Project"
                                value={data?.deskripsi_project}
                                onChange={handleOnChange}
                                name="deskripsi_project"
                                placeholder="Masukan Deskripsi"
                                size="h-16"
                            />
                            <Textarea
                                label="Lokasi Pura"
                                value={data?.lokasi_pura}
                                onChange={handleOnChange}
                                name="lokasi_pura"
                                placeholder="Masukan Lokasi"
                                size="h-16"
                            />

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

export default Projects;
