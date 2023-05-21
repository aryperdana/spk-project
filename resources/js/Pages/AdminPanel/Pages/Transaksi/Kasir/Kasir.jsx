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
import { AiOutlineEye } from "react-icons/ai";

const Kasir = ({ kasir_data }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
        data: {},
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
        nama_kategori_barang: "",
        keterangan: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (modalConfig.type === "add") {
            post(route("kategori.store"), {
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
            put(route("kategori.update", data.id), {
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

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const total =
        modalConfig?.data?.detail_pesanan?.length > 0 &&
        modalConfig?.data?.detail_pesanan?.reduce(
            (acc, curr) =>
                acc +
                curr.qty *
                    curr?.detail_barang?.harga *
                    ((100 - curr?.detail_barang?.diskon) / 100),
            0
        );

    return (
        <MainLayout title="Kasir" navbarTitle="Kasir">
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
                            href="kasir/create"
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
                                        No. Transaksi
                                    </th>
                                    <th className="text-center">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kasir_data?.data?.length > 0 ? (
                                    kasir_data?.data?.map((val, ind) => (
                                        <tr>
                                            <td className="w-10">{ind + 1}</td>
                                            <td className="w-10">
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-outline btn-info btn-sm"
                                                        onClick={() => {
                                                            setModalConfig({
                                                                ...modalConfig,
                                                                show: true,
                                                                type: "update",
                                                                data: val,
                                                            });
                                                        }}
                                                    >
                                                        <AiOutlineEye />
                                                    </button>
                                                    {/* <button
                                                        className="btn btn-outline btn-error btn-sm"
                                                        onClick={() => {
                                                            deleteSubmit(
                                                                val.id
                                                            );
                                                        }}
                                                    >
                                                        <HiOutlineTrash />
                                                    </button> */}
                                                </div>
                                            </td>
                                            <td>{val.tanggal}</td>
                                            <td>{val.no_transaksi}</td>
                                            <td>{val.keterangan}</td>
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
                        {kasir_data?.total > 10 && (
                            <Pagination
                                next={kasir_data?.next_page_url}
                                prev={kasir_data?.prev_page_url}
                                curr={kasir_data?.current_page}
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
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="font-bold mb-3">Detail Data Kasir</div>
                    <hr />

                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-3 mb-10">
                                <div className="grid grid-rows-1">
                                    <Input
                                        label="Tanggal Penjualan"
                                        name="tanggal"
                                        value={modalConfig.data.tanggal}
                                        placeholder="Masukan tanggal"
                                        disabled
                                    />

                                    <Textarea
                                        label="Keterangan"
                                        name="keterangan"
                                        value={modalConfig.data.keterangan}
                                        placeholder="Masukan keterangan"
                                        size="h-24"
                                        disabled
                                    />
                                </div>
                                <div className="grid grid-rows-1">
                                    <Input
                                        label="No. Transaksi"
                                        name="no_transaksi"
                                        disabled
                                        onChange={(e) => {}}
                                        placeholder="Pilih tanggal terlebih dahulu"
                                        type="text"
                                        value={modalConfig.data.no_transaksi}
                                    />
                                </div>
                            </div>
                            <b>Detail Barang</b>
                            <div className="overflow-x-auto ">
                                <table className="table table-compact table-auto w-full">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="text-center">No</th>
                                            <th className="text-center">
                                                Nama Barang
                                            </th>
                                            <th className="text-center">Qty</th>
                                            <th className="text-center">
                                                Harga
                                            </th>
                                            <th className="text-center">
                                                Diskon
                                            </th>
                                            <th className="text-center">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modalConfig?.data?.detail_pesanan
                                            ?.length > 0 ? (
                                            <>
                                                {modalConfig?.data?.detail_pesanan?.map(
                                                    (val, ind) => {
                                                        const sumWithQty =
                                                            parseInt(val?.qty) *
                                                            parseInt(
                                                                val
                                                                    ?.detail_barang
                                                                    ?.harga
                                                            );

                                                        const subTotal =
                                                            parseInt(
                                                                sumWithQty -
                                                                    parseFloat(
                                                                        val
                                                                            ?.detail_barang
                                                                            ?.diskon /
                                                                            100
                                                                    ) *
                                                                        parseInt(
                                                                            sumWithQty
                                                                        )
                                                            );

                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="w-10">
                                                                        {ind +
                                                                            1}
                                                                    </td>

                                                                    <td>
                                                                        {
                                                                            val
                                                                                ?.detail_barang
                                                                                ?.nama_barang
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            val?.qty
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {rupiah(
                                                                            val
                                                                                ?.detail_barang
                                                                                ?.harga
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            val
                                                                                ?.detail_barang
                                                                                ?.diskon
                                                                        }{" "}
                                                                        %
                                                                    </td>
                                                                    <td>
                                                                        {rupiah(
                                                                            subTotal
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        );
                                                    }
                                                )}
                                                <tr>
                                                    <th
                                                        colSpan="5"
                                                        className="text-right"
                                                    >
                                                        Total
                                                    </th>
                                                    <th>{rupiah(total)}</th>
                                                </tr>
                                            </>
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center font-bold text-xl"
                                                >
                                                    Tidak Ada Data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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
                                            data: {},
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

export default Kasir;
