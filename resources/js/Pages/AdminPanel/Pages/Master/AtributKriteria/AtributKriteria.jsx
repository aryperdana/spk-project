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

const AtributKriteria = ({
    atribut_kriteria_data,
    sub_kriteria_data,
    kriteria_data,
}) => {
    console.log("test", atribut_kriteria_data);
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });

    const jumlahKriteria = atribut_kriteria_data?.data;

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
        nama_atribut_kriteria: "",
        id_sub_kriteria: "",
        id_kriteria: "",
        bobot_atribut_kriteria: "",
        priority: "",
        score: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const calculateSum = (arr, priority, id_sub_kriteria, id_kriteria) => {
        if (priority < 1) {
            return 0;
        }

        return arr
            .filter((val) =>
                id_sub_kriteria
                    ? val.id_sub_kriteria === id_sub_kriteria
                    : val.id_kriteria === id_kriteria
            )
            .reduce((accumulator, currentNumber, index) => {
                if (currentNumber?.priority >= priority) {
                    return accumulator + 1 / currentNumber?.priority;
                }
                return accumulator;
            }, 0);
    };

    const handleOnChangeBobot = (event, id_sub_kriteria) => {
        setData({
            ...data,
            bobot_atribut_kriteria:
                (1 /
                    parseFloat(
                        jumlahKriteria.filter(
                            (val) => val.id_sub_kriteria === id_sub_kriteria
                        ).length + 1
                    )) *
                calculateSum(
                    atribut_kriteria_data?.data,
                    parseFloat(event.target.value),
                    id_sub_kriteria
                ),
            priority: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("atribut-kriteria.store"), {
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
            put(route("atribut-kriteria.update", data.id), {
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
        destroy(route("atribut-kriteria.destroy", id), {
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
        <MainLayout title="Atribut Kriteria" navbarTitle="Atribut Kriteria">
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
                                    <th className="text-center">
                                        Nama Kriteria
                                    </th>
                                    <th className="text-center">
                                        Nama Sub Kriteria
                                    </th>
                                    <th className="text-center">
                                        Nama Atribut Kriteria
                                    </th>
                                    <th className="text-center">Bobot</th>
                                    <th className="text-center">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {atribut_kriteria_data.data.length > 0 ? (
                                    atribut_kriteria_data.data.map(
                                        (val, ind) => (
                                            <tr>
                                                <td className="w-10">
                                                    {ind + 1}
                                                </td>
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
                                                                    nama_atribut_kriteria:
                                                                        val.nama_atribut_kriteria,
                                                                    kode: val.kode,
                                                                    bobot_atribut_kriteria:
                                                                        (1 /
                                                                            parseFloat(
                                                                                jumlahKriteria.filter(
                                                                                    (
                                                                                        res
                                                                                    ) =>
                                                                                        val.id_sub_kriteria ===
                                                                                        res.id_sub_kriteria
                                                                                )
                                                                                    .length
                                                                            )) *
                                                                        calculateSum(
                                                                            atribut_kriteria_data?.data,
                                                                            parseFloat(
                                                                                val.priority
                                                                            ),
                                                                            val.id_sub_kriteria
                                                                        ),
                                                                    priority:
                                                                        val.priority,
                                                                    id_sub_kriteria:
                                                                        val.id_sub_kriteria,
                                                                    id_kriteria:
                                                                        val.id_kriteria,
                                                                    score: val.score,
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
                                                <td>
                                                    {val?.kriteria
                                                        ?.nama_kriteria ?? "-"}
                                                </td>
                                                <td>
                                                    {val?.sub_kriteria
                                                        ?.nama_sub_kriteria ??
                                                        "-"}
                                                </td>
                                                <td>
                                                    {val.nama_atribut_kriteria}
                                                </td>
                                                <td>
                                                    {(1 /
                                                        parseFloat(
                                                            jumlahKriteria.filter(
                                                                (res) =>
                                                                    res?.id_sub_kriteria
                                                                        ? val.id_sub_kriteria ===
                                                                          res.id_sub_kriteria
                                                                        : val.id_kriteria ===
                                                                          res.id_kriteria
                                                            ).length
                                                        )) *
                                                        calculateSum(
                                                            atribut_kriteria_data?.data,
                                                            parseFloat(
                                                                val.priority
                                                            ),
                                                            val.id_sub_kriteria,
                                                            val.id_kriteria
                                                        )}
                                                </td>
                                                <td>{val.priority}</td>
                                            </tr>
                                        )
                                    )
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
                        {atribut_kriteria_data.total > 10 && (
                            <Pagination
                                next={atribut_kriteria_data?.next_page_url}
                                prev={atribut_kriteria_data?.prev_page_url}
                                curr={atribut_kriteria_data?.current_page}
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
                        Atribut Kriteria
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <Input
                                type="text"
                                label="Kode"
                                name="kode"
                                placeholder="Masukan Atribut Kriteria"
                                onChange={handleOnChange}
                                value={data?.kode}
                                errorText={errors.kode}
                            />
                            <Input
                                type="text"
                                label="Atribut Kriteria"
                                name="nama_atribut_kriteria"
                                placeholder="Masukan Atribut Kriteria"
                                onChange={handleOnChange}
                                value={data?.nama_atribut_kriteria}
                                errorText={errors.nama_atribut_kriteria}
                            />

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Kriteria</span>
                                </label>
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="id_kriteria"
                                    onChange={handleOnChange}
                                    defaultValue={data.id_kriteria}
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
                                    {kriteria_data.map((val) => (
                                        <option
                                            value={val.id}
                                            selected={
                                                val.id === data.id_kriteria
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {val.nama_kriteria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Sub Kriteria
                                    </span>
                                </label>
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="id_sub_kriteria"
                                    onChange={handleOnChange}
                                    defaultValue={data.id_sub_kriteria}
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
                                    {sub_kriteria_data.map((val) => (
                                        <option
                                            value={val.id}
                                            selected={
                                                val.id === data.id_sub_kriteria
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {val.nama_sub_kriteria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                type="number"
                                label="Bobot"
                                name="bobot_atribut_kriteria"
                                placeholder="Masukan Bobot"
                                disabled
                                value={data?.bobot_atribut_kriteria}
                                errorText={errors.bobot_atribut_kriteria}
                            />
                            <Input
                                type="number"
                                label="Priority"
                                name="priority"
                                placeholder="Masukan Priority"
                                onChange={(e) => {
                                    handleOnChangeBobot(
                                        e,
                                        data?.id_sub_kriteria
                                    );
                                }}
                                value={data?.priority}
                                errorText={errors.priority}
                            />
                            <Input
                                type="text"
                                label="Scoring"
                                name="score"
                                placeholder="Masukan Scoring"
                                onChange={handleOnChange}
                                value={data?.score}
                                errorText={errors.score}
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

export default AtributKriteria;
