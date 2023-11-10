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
import { AiOutlineEye } from "react-icons/ai";

const HasilPerhitungan = ({ hasil_perhitungan_data }) => {
    console.log(hasil_perhitungan_data);
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });

    const jumlahKriteria = hasil_perhitungan_data?.data?.length;

    // console.log(jumlahKriteria);
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
        nama_projects: "",
        detail: [],
    });

    console.log(data);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

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

    const handleOnChangeBobot = (event) => {
        setData({
            ...data,
            bobot_kriteria:
                (1 / parseFloat(jumlahKriteria + 1)) *
                calculateSum(
                    hasil_perhitungan_data?.data,
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

    function formatRupiah(number) {
        // Convert the number to a string and add commas
        var formattedNumber = number.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });

        // If the currency symbol is placed after the number, move it to the front
        formattedNumber = formattedNumber.replace("IDR", "Rp.");

        return formattedNumber;
    }

    return (
        <MainLayout
            title="Laporan Hasil Perhitungan"
            navbarTitle="Laporan Hasil Perhitungan"
        >
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
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-compact table-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">No</th>
                                    <th className="text-center">Aksi</th>
                                    <th className="text-center">
                                        Nama Project
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hasil_perhitungan_data.data.length > 0 ? (
                                    hasil_perhitungan_data.data.map(
                                        (val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="w-10">
                                                        {ind + 1}
                                                    </td>
                                                    <td className="w-10">
                                                        <div className="btn-group">
                                                            <button
                                                                className="btn btn-outline btn-info btn-sm"
                                                                onClick={() => {
                                                                    setModalConfig(
                                                                        {
                                                                            ...modalConfig,
                                                                            show: true,
                                                                            type: "update",
                                                                        }
                                                                    );
                                                                    setData({
                                                                        nama_projects:
                                                                            val.nama_projects,
                                                                        detail: val?.detail,
                                                                        id: val.id,
                                                                    });
                                                                }}
                                                            >
                                                                <AiOutlineEye />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>{val.nama_projects}</td>
                                                </tr>
                                            );
                                        }
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
                        {hasil_perhitungan_data.total > 10 && (
                            <Pagination
                                next={hasil_perhitungan_data?.next_page_url}
                                prev={hasil_perhitungan_data?.prev_page_url}
                                curr={hasil_perhitungan_data?.current_page}
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
                <div className="modal-box w-11/12 max-w-full">
                    <div className="font-bold mb-3">
                        Data Laporan Hasil Perhitungan Project{" "}
                        {data.nama_projects}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-compact table-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        Urutan Prioritas
                                        <br /> Perbaikan
                                    </th>
                                    <th className="text-center">
                                        Hasil Perhitungan
                                    </th>
                                    <th className="text-center">
                                        Saran Perbaikan <br />
                                        Bangunan
                                    </th>
                                    <th className="text-center">
                                        Nama Bangunan
                                    </th>
                                    <th className="text-center">
                                        Kategori Bangunan
                                    </th>
                                    <th className="text-center">
                                        Saran Revitalisasi
                                    </th>
                                    <th className="text-center">
                                        Bagian yang Di Cek
                                    </th>
                                    <th className="text-center">
                                        Bagian yang <br /> Disarankan <br />{" "}
                                        untuk di
                                        <br />
                                        Revitalisasi
                                    </th>
                                    <th className="text-center">
                                        Bahan yang <br /> Digunakan
                                    </th>
                                    <th className="text-center">
                                        Estimasi Minimal <br />
                                        Biaya Dibutuhkan
                                    </th>
                                    <th className="text-center">
                                        Dana Dimiliki
                                    </th>
                                    <th className="text-center">Status Dana</th>
                                    <th className="text-center">
                                        Estimasi Waktu <br />
                                        Pengerjaan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.detail.length > 0 ? (
                                    data.detail.map((val, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    {val?.hasil_perhitungan}
                                                </td>
                                                <td>
                                                    {
                                                        val?.saran_perbaikan_bangunan
                                                    }
                                                </td>
                                                <td>{val?.nama_bangunan}</td>
                                                <td className="capitalize">
                                                    {val.kategori_bangunan}
                                                </td>
                                                <td>
                                                    {val?.saran_revitalisasi}
                                                </td>
                                                <td>
                                                    {val?.bagian_yang_dicek}
                                                </td>
                                                <td>
                                                    {
                                                        val?.bagian_yang_direvitalisasi
                                                    }
                                                </td>
                                                <td>
                                                    {val?.bahan_yang_digunakan}
                                                </td>
                                                <td>
                                                    {formatRupiah(
                                                        parseInt(
                                                            val.estimasi_biaya_dibutuhkan
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    {formatRupiah(
                                                        parseInt(
                                                            val?.dana_dimiliki
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    {formatRupiah(
                                                        parseInt(
                                                            val?.status_dana
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    {val?.estimasi_pengerjaan}
                                                </td>
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

                    <div></div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HasilPerhitungan;
