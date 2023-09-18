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

const Kriteria = ({ kriteria_data }) => {
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

    console.log(jumlahKriteria);
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
        kode: "",
        nama_kriteria: "",
        bobot_kriteria: "",
        priority: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const calculateSum = (arr, priority) => {
        if (priority < 1) {
            return 0;
        }

        return arr.reduce((accumulator, currentNumber, index) => {
            if (index + 1 >= priority) {
                return accumulator + 1 / currentNumber?.priority;
            }
            return accumulator;
        }, 0);
    };

    const handleOnChangeBobot = (event) => {
        setData({
            ...data,
            bobot_kriteria:
                (1 / parseFloat(jumlahKriteria + 1)) *
                calculateSum(
                    kriteria_data?.data,
                    parseFloat(event.target.value)
                ),
            priority: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("kriteria.store"), {
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
            put(route("kriteria.update", data.id), {
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
                                    <th className="text-center">Kode</th>
                                    <th className="text-center">Nama</th>
                                    <th className="text-center">Bobot</th>
                                    <th className="text-center">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kriteria_data.data.length > 0 ? (
                                    kriteria_data.data.map((val, ind) => (
                                        <tr>
                                            {console.log(
                                                "cok",
                                                calculateSum(
                                                    kriteria_data?.data,
                                                    parseFloat(val.priority)
                                                )
                                            )}
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
                                                                nama_kriteria:
                                                                    val.nama_kriteria,
                                                                kode: val.kode,
                                                                bobot_kriteria:
                                                                    (1 /
                                                                        parseFloat(
                                                                            jumlahKriteria
                                                                        )) *
                                                                    calculateSum(
                                                                        kriteria_data?.data,
                                                                        parseFloat(
                                                                            val.priority
                                                                        )
                                                                    ),
                                                                priority:
                                                                    val.priority,
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
                                            <td>{val.kode}</td>
                                            <td>{val.nama_kriteria}</td>
                                            <td>
                                                {(1 /
                                                    parseFloat(
                                                        jumlahKriteria
                                                    )) *
                                                    calculateSum(
                                                        kriteria_data?.data,
                                                        parseFloat(val.priority)
                                                    )}
                                            </td>
                                            <td>{val.priority}</td>
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

            <input
                type="checkbox"
                className="modal-toggle"
                checked={modalConfig.show}
            />
            <div className="modal">
                <div className="modal-box">
                    <div className="font-bold mb-3">
                        {modalConfig.type === "add" ? "Tambah" : "Ubah"} Data
                        Kriteria
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <Input
                                type="text"
                                label="Kode"
                                name="kode"
                                placeholder="Masukan Kriteria"
                                onChange={handleOnChange}
                                value={data?.kode}
                                errorText={errors.kode}
                            />
                            <Input
                                type="text"
                                label="Kriteria"
                                name="nama_kriteria"
                                placeholder="Masukan Kriteria"
                                onChange={handleOnChange}
                                value={data?.nama_kriteria}
                                errorText={errors.nama_kriteria}
                            />
                            <Input
                                type="number"
                                label="Bobot"
                                name="bobot_kriteria"
                                placeholder="Masukan Bobot"
                                disabled
                                // onChange={handleOnChangeBobot}
                                value={data?.bobot_kriteria}
                                errorText={errors.bobot_kriteria}
                            />
                            <Input
                                type="number"
                                label="Priority"
                                name="priority"
                                placeholder="Masukan Priority"
                                onChange={(e) => {
                                    // handleOnChange(e);
                                    handleOnChangeBobot(e);
                                }}
                                value={data?.priority}
                                errorText={errors.priority}
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

export default Kriteria;
