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

const Kriteria = ({ kriteria_data, user_data, id_user }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });

    const jumlahKriteria = kriteria_data?.data?.length;

    const {
        setData,
        delete: destroy,
        get,
    } = useForm({
        id: "",
        nama_project: "",
        tanggal: "",
        lokasi_pura: "",
        deskripsi_project: "",
        id_user: id_user,
    });

    const calculateSum = (arr, priority) => {
        if (priority < 1) {
            return 0;
        }

        return arr.reduce((accumulator, currentNumber) => {
            if (currentNumber?.priority >= priority) {
                return accumulator + 1 / currentNumber?.priority;
            }
            return accumulator;
        }, 0);
    };

    const deleteSubmit = (id) => {
        destroy(route("kriteria.destroy", id), {
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
        <MainLayout title="Kriteria" navbarTitle="Kriteria">
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
                            href="kriteria/create"
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
                                    <th className="text-center">Kode</th>
                                    <th className="text-center">Nama</th>
                                    <th className="text-center">Bobot</th>
                                    <th className="text-center">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kriteria_data.data.length > 0 ? (
                                    kriteria_data.data.map((val, ind) => {
                                        const hasilKriterial =
                                            1 / parseFloat(jumlahKriteria);
                                        return (
                                            <tr>
                                                <td className="w-10">
                                                    {ind + 1}
                                                </td>
                                                <td className="w-10">
                                                    <div className="btn-group">
                                                        <button
                                                            className="btn btn-outline btn-success btn-sm"
                                                            onClick={() => {
                                                                get(
                                                                    route(
                                                                        "kriteria.edit",
                                                                        val.id
                                                                    )
                                                                );
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
                                                <td>{val.kode}</td>
                                                <td>{val.nama_kriteria}</td>
                                                <td>
                                                    {hasilKriterial *
                                                        calculateSum(
                                                            kriteria_data?.data,
                                                            parseFloat(
                                                                val.priority
                                                            )
                                                        )}
                                                </td>
                                                <td>{val.priority}</td>
                                            </tr>
                                        );
                                    })
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
                        {kriteria_data.total > 10 && (
                            <Pagination
                                next={kriteria_data?.next_page_url}
                                prev={kriteria_data?.prev_page_url}
                                curr={kriteria_data?.current_page}
                            />
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Kriteria;
