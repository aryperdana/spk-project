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
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const TambahPesanan = ({ barang_dropdown, kategori_data }) => {
    const [dataBarang, setDataBarang] = useState({});
    const [noTransaksi, setnoTransaksi] = useState("");
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
        tanggal: "",
        nama_pemesan: "",
        alamat_pengiriman: "",
        keterangan: "-",
        detail: [],
        is_online: 1,
        terkirim: 0,
    });

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("pesanan.store"), {
            onSuccess: () => {
                // setModalConfig({ ...modalConfig, show: false, type: "" });
                // setAlertConfig({
                //     ...alertConfig,
                //     show: true,
                //     type: "success",
                //     text: "Tambah Data Berhasil",
                // });
                reset();
            },
            onError: () => {},
            onFinish: () => {},
        });
    };

    const deleteSubmit = (ind) => {
        const deletedData = data.detail.filter((val, i) => i !== ind);
        setData({ ...data, detail: deletedData });
    };

    const total = data.detail.reduce(
        (acc, curr) =>
            acc + curr.qty * curr.harga * ((100 - curr.diskon) / 100),
        0
    );
    console.log(data);
    const fetchData = (date) => {
        fetch(`/api/admin/pesanan/get-kode-pesanan/?date=${date}`)
            .then((response) => response.json())
            .then((res) => {
                setnoTransaksi(res.data);
                setData({ ...data, no_transaksi: res.data, tanggal: date });
            })
            .catch((error) => setnoTransaksi(""));
    };

    return (
        <MainLayout title="Pesanan" navbarTitle="Tambah Pesanan">
            <form onSubmit={submit}>
                <div className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-rows-1">
                                <Input
                                    label="Tanggal Pesanan"
                                    name="tanggal"
                                    onChange={(e) => {
                                        fetchData(e.target.value);
                                    }}
                                    placeholder="Masukan tanggal"
                                    type="date"
                                />
                                <Input
                                    label="Pemesan"
                                    name="nama_pemesan"
                                    onChange={handleOnChange}
                                    placeholder="Masukan pemesan"
                                />
                                <Textarea
                                    label="Keterangan"
                                    name="keterangan"
                                    onChange={handleOnChange}
                                    placeholder="Masukan keterangan"
                                    size="h-16"
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
                                    value={noTransaksi}
                                />
                                <Textarea
                                    label="Alamat"
                                    name="alamat_pengiriman"
                                    onChange={handleOnChange}
                                    placeholder="Masukan alamat pengiriman"
                                    size="h-36"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-sm mt-4">
                    <div className="card-body">
                        <div className="grid grid-cols-4 gap-3">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Barang</span>
                                </label>
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="id_barang"
                                    onChange={(val) => {
                                        const getBarangData =
                                            barang_dropdown.find(
                                                (res) =>
                                                    parseInt(res.id) ===
                                                    parseInt(val.target.value)
                                            );

                                        setDataBarang({
                                            ...dataBarang,
                                            ...getBarangData,
                                        });
                                    }}
                                    defaultValue={data.id}
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
                            <Input
                                label="Qty"
                                placeholder="Masukan qty"
                                type="number"
                                onChange={(val) => {
                                    setDataBarang({
                                        ...dataBarang,
                                        qty: parseInt(val.target.value),
                                    });
                                }}
                            />
                            <div
                                className="btn btn-primary btn-sm mt-9 p-0 w-16"
                                onClick={() => {
                                    const sumWithQty =
                                        parseInt(dataBarang.qty) *
                                        parseInt(dataBarang.harga);

                                    const subTotal = parseInt(
                                        sumWithQty -
                                            parseFloat(
                                                dataBarang.diskon / 100
                                            ) *
                                                parseInt(sumWithQty)
                                    );
                                    const value = {
                                        ...dataBarang,
                                        sub_total: subTotal,
                                    };
                                    setData({
                                        ...data,
                                        detail: [...data.detail, value],
                                    });
                                }}
                            >
                                <IoAddOutline className="text-xl" />
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
                                            Nama Barang
                                        </th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-center">Harga</th>
                                        <th className="text-center">Diskon</th>
                                        <th className="text-center">
                                            Sub Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.detail?.length > 0 ? (
                                        <>
                                            {data?.detail?.map((val, ind) => {
                                                const sumWithQty =
                                                    parseInt(val.qty) *
                                                    parseInt(val.harga);

                                                const subTotal = parseInt(
                                                    sumWithQty -
                                                        parseFloat(
                                                            val.diskon / 100
                                                        ) *
                                                            parseInt(sumWithQty)
                                                );
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="w-10">
                                                                {ind + 1}
                                                            </td>
                                                            <td className="w-10">
                                                                <div className="btn-group">
                                                                    <div
                                                                        className="btn btn-outline btn-error btn-sm"
                                                                        onClick={() => {
                                                                            deleteSubmit(
                                                                                ind
                                                                            );
                                                                        }}
                                                                    >
                                                                        <HiOutlineTrash />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    val.nama_barang
                                                                }
                                                            </td>
                                                            <td>{val.qty}</td>
                                                            <td>
                                                                {rupiah(
                                                                    val.harga
                                                                )}
                                                            </td>
                                                            <td>
                                                                {val.diskon} %
                                                            </td>
                                                            <td>
                                                                {rupiah(
                                                                    subTotal
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                            <tr>
                                                <th
                                                    colSpan="6"
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
                        <div className="flex justify-end">
                            <button
                                className="btn btn-primary btn-sm"
                                disabled={processing}
                            >
                                Simpan Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
};

export default TambahPesanan;
