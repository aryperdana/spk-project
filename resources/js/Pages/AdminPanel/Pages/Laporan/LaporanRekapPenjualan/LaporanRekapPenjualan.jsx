import {
    Alert,
    Input,
    Pagination,
    Textarea,
} from "@/Pages/AdminPanel/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../../../Layouts";
import { AiOutlineEye } from "react-icons/ai";

const LaporanRekapPenjualan = ({ laporan_data, barang_dropdown }) => {
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
        start_date: "",
        end_date: "",
        id_barang: "",
        is_online: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        router.get(
            "laporan-rekap-penjualan",
            { ...data },
            {
                preserveState: true,
                // onStart: () => setIsLoading(true),
                // onFinish: () => setIsLoading(false),
            }
        );
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
        <MainLayout
            title="Laporan Rekap Penjualan"
            navbarTitle="Laporan Rekap Penjualan"
        >
            {alertConfig.show && (
                <Alert type={alertConfig.type} text={alertConfig.text} />
            )}
            <div className="card w-full bg-base-100 shadow-sm">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="flex mb-10 gap-3">
                            <div className="form-control w-full max-w-md">
                                <Input
                                    label="Tanggal"
                                    type="date"
                                    name="start_date"
                                    onChange={handleOnChange}
                                />
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">
                                            Barang
                                        </span>
                                    </label>
                                    <select
                                        className="select select-sm select-bordered py-0"
                                        name="id_barang"
                                        onChange={handleOnChange}
                                    >
                                        <option>Pilih Salah Satu</option>
                                        {barang_dropdown.map((val) => (
                                            <option
                                                value={val.id}
                                                selected={
                                                    val.id === data.id
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {val.nama_barang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-11">s/d</div>
                            <div className="form-control w-full max-w-md">
                                <Input
                                    label="Tanggal"
                                    type="date"
                                    name="end_date"
                                    onChange={handleOnChange}
                                />
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">
                                            Jenis Transaksi
                                        </span>
                                    </label>
                                    <select
                                        className="select select-sm select-bordered py-0"
                                        name="is_online"
                                        onChange={handleOnChange}
                                        defaultValue={data.is_online}
                                    >
                                        <option>Pilih Salah Satu</option>
                                        <option
                                            value="1"
                                            selected={
                                                data.is_online === "1"
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Online
                                        </option>
                                        <option
                                            value="0"
                                            selected={
                                                data.is_online === "0"
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Offline
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-control w-56 mt-28">
                                <button className="btn btn-primary btn-sm">
                                    Cari
                                </button>
                            </div>
                        </div>
                    </form>

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
                                    <th className="text-center">Pemesan</th>
                                    <th className="text-center">Nama Barang</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-center">Harga</th>
                                    <th className="text-center">Diskon</th>
                                    <th className="text-center">SubTotal</th>
                                    <th className="text-center">
                                        Jenis Transaksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporan_data?.data?.length > 0 ? (
                                    laporan_data?.data?.map((val, ind) => (
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
                                                </div>
                                            </td>
                                            <td>{val.pesanan.tanggal}</td>
                                            <td>{val.pesanan.no_transaksi}</td>
                                            <td>{val.pesanan.nama_pemesan}</td>
                                            <td>
                                                {val.detail_barang.nama_barang}
                                            </td>
                                            <td>{val.qty}</td>
                                            <td>
                                                {rupiah(
                                                    val?.detail_barang?.harga
                                                )}
                                            </td>
                                            <td>{val.detail_barang.diskon}</td>
                                            <td>{val.detail_barang.diskon}</td>
                                            <td className="text-center">
                                                <button
                                                    className={`btn btn-outline ${
                                                        val?.pesanan?.is_online
                                                            ? "btn-primary"
                                                            : "btn-success"
                                                    } btn-sm btn-block`}
                                                >
                                                    {val?.pesanan?.is_online ===
                                                    1
                                                        ? "Online"
                                                        : "Offline"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="11"
                                            className="text-center font-bold text-xl"
                                        >
                                            Filter Terlebih Dahulu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center">
                        {laporan_data?.total > 10 && (
                            <Pagination
                                next={laporan_data?.next_page_url}
                                prev={laporan_data?.prev_page_url}
                                curr={laporan_data?.current_page}
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
                    <div className="font-bold mb-3">
                        Detail Data Laporan Rekap Penjualan
                    </div>
                    <hr />
                    <div className="modal-middle mt-3">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="grid grid-rows-1">
                                    <Input
                                        label="Tanggal Laporan Rekap Penjualan"
                                        name="tanggal"
                                        disabled
                                        placeholder="Masukan tanggal"
                                        type="date"
                                        value={modalConfig.data.tanggal}
                                    />
                                    <Input
                                        label="Pemesan"
                                        disabled
                                        name="nama_pemesan"
                                        value={modalConfig.data.nama_pemesan}
                                        placeholder="Masukan pemesan"
                                    />
                                    <Textarea
                                        label="Keterangan"
                                        disabled
                                        value={modalConfig.data.keterangan}
                                        name="keterangan"
                                        placeholder="Masukan keterangan"
                                        size="h-16"
                                    />
                                </div>
                                <div className="grid grid-rows-1">
                                    <Input
                                        label="No. Transaksi"
                                        name="no_transaksi"
                                        disabled
                                        value={modalConfig.data.no_transaksi}
                                        placeholder="Pilih tanggal terlebih dahulu"
                                        type="text"
                                        // value={noTransaksi}
                                    />
                                    <Textarea
                                        label="Alamat"
                                        disabled
                                        value={
                                            modalConfig.data.alamat_pengiriman
                                        }
                                        name="alamat_pengiriman"
                                        placeholder="Masukan alamat pengiriman"
                                        size="h-36"
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
                                {modalConfig.type === "kirim" && (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        disabled={processing}
                                    >
                                        TerKirim
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LaporanRekapPenjualan;
