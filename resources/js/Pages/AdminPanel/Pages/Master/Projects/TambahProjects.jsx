import {
    Alert,
    Input,
    Modal,
    Pagination,
    Textarea,
} from "@/Pages/AdminPanel/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import MainLayout from "../../../Layouts";
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const TambahProjects = ({ alternatif_dropdown, id_user }) => {
    const [dataAlternatif, setDataAlternatif] = useState({});
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
        data: {},
        ind: "",
    });

    const [valueBagianBangunan, setValueBagianBangunan] = useState("");

    const drodownJumlahJenisBahan = [
        { value: "hanya satu", label: "Hanya Satu" },
        { value: "lebih dari satu", label: "Lebih dari Satu" },
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
        nama_project: "",
        tanggal: "",
        lokasi_pura: "",
        deskripsi_project: "",
        id_user: id_user,
        detail: alternatif_dropdown.map((val) => ({
            ...val,
            isUse: false,
            jumlah_jenis_bahan: "",
        })),
    });

    console.log(data);

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
        post(route("projects.store"), {
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
    const deleteDataBangunanSubmit = (ind) => {
        const deletedData = modalConfig?.data?.detail_bangunan?.filter(
            (val, i) => i !== ind
        );

        setModalConfig({
            ...modalConfig,
            data: {
                ...modalConfig.data,
                detail_bangunan: deletedData,
            },
        });

        setData({
            ...data,
            detail: data?.detail?.map((val, ind) =>
                modalConfig?.ind === ind
                    ? { ...val, detail_bangunan: deletedData }
                    : val
            ),
        });
    };

    return (
        <MainLayout title="Project" navbarTitle="Tambah Project">
            <form onSubmit={submit}>
                <div className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-rows-1">
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
                            </div>
                            <div className="grid grid-rows-1">
                                <Textarea
                                    label="Lokasi Pura"
                                    value={data?.lokasi_pura}
                                    onChange={handleOnChange}
                                    name="lokasi_pura"
                                    placeholder="Masukan Lokasi"
                                    size="h-16"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-base-100 shadow-sm mt-4">
                    <div className="card-body">
                        <div className="overflow-x-auto">
                            <table className="table table-compact table-auto w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th className="text-center">Nama</th>
                                        <th className="text-center">
                                            Kategori
                                        </th>
                                        <th className="text-center">
                                            Jumlah Jenis Bahan
                                        </th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.detail?.length > 0 ? (
                                        data?.detail?.map((val, ind) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="w-10">
                                                            {ind + 1}
                                                        </td>
                                                        <td>
                                                            {
                                                                val?.nama_alternatif
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {val?.kategori}
                                                        </td>
                                                        <td className="w-1/5">
                                                            <div className="form-control w-full">
                                                                <select
                                                                    className="select select-sm select-bordered py-0"
                                                                    name="jumlah_jenis_bahan"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            {
                                                                                ...data,
                                                                                detail: data.detail?.map(
                                                                                    (
                                                                                        res,
                                                                                        i
                                                                                    ) =>
                                                                                        i ===
                                                                                        ind
                                                                                            ? {
                                                                                                  ...res,
                                                                                                  jumlah_jenis_bahan:
                                                                                                      e
                                                                                                          .target
                                                                                                          .value,
                                                                                              }
                                                                                            : res
                                                                                ),
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <option>
                                                                        Pilih
                                                                        Salah
                                                                        Satu
                                                                    </option>
                                                                    {drodownJumlahJenisBahan.map(
                                                                        (
                                                                            res
                                                                        ) => (
                                                                            <option
                                                                                value={
                                                                                    res.jumlah_jenis_bahan
                                                                                }
                                                                                selected={
                                                                                    res.value ===
                                                                                    data.jumlah_jenis_bahan
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                {
                                                                                    res.label
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="w-10">
                                                            <div className="form-control items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox checkbox-sm"
                                                                    name="is_header"
                                                                    checked={
                                                                        val?.isUse
                                                                    }
                                                                    onChange={() =>
                                                                        setData(
                                                                            {
                                                                                ...data,
                                                                                detail: data.detail?.map(
                                                                                    (
                                                                                        res,
                                                                                        i
                                                                                    ) =>
                                                                                        i ===
                                                                                        ind
                                                                                            ? {
                                                                                                  ...res,
                                                                                                  isUse: !val?.isUse,
                                                                                              }
                                                                                            : res
                                                                                ),
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
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
                        <div className="flex justify-end">
                            <button
                                className="btn btn-primary btn-sm"
                                disabled={processing}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={modalConfig.show}
            />
            <div className="modal">
                <div className="modal-box w-12/12 max-w-7xl">
                    <div className="font-bold mb-3">
                        Tambah Data Bagian Banguanan
                    </div>
                    <hr />
                    <div className="grid grid-cols-4 gap-3 my-4">
                        <div className="form-control w-full">
                            <Input
                                label="Nama Bagian Bangunan"
                                onChange={(val) =>
                                    setValueBagianBangunan(val?.target?.value)
                                }
                            />
                        </div>
                        <div
                            className="btn btn-primary btn-sm p-0 mt-9 w-16"
                            onClick={() => {
                                setModalConfig({
                                    ...modalConfig,
                                    data: {
                                        ...modalConfig?.data,
                                        detail_bangunan:
                                            modalConfig?.data?.detail_bangunan
                                                ?.length > 0
                                                ? [
                                                      ...modalConfig?.data
                                                          ?.detail_bangunan,
                                                      valueBagianBangunan,
                                                  ]
                                                : [valueBagianBangunan],
                                    },
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
                                    <th className="text-center">Nama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalConfig?.data?.detail_bangunan?.length >
                                0 ? (
                                    modalConfig?.data?.detail_bangunan?.map(
                                        (val, ind) => {
                                            return (
                                                <>
                                                    <tr key={ind}>
                                                        <td className="w-10">
                                                            {ind + 1}
                                                        </td>
                                                        <td className="w-10">
                                                            <div className="btn-group">
                                                                <div
                                                                    className="btn btn-outline btn-error btn-sm"
                                                                    onClick={() => {
                                                                        deleteDataBangunanSubmit(
                                                                            ind
                                                                        );
                                                                    }}
                                                                >
                                                                    <HiOutlineTrash />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{val}</td>
                                                    </tr>
                                                </>
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

                    <div className="modal-middle mt-3">
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
                                        ind: "",
                                    });
                                }}
                            >
                                Tutup
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    setData({
                                        ...data,
                                        detail: data?.detail?.map((val, ind) =>
                                            modalConfig?.ind === ind
                                                ? modalConfig?.data
                                                : val
                                        ),
                                    });
                                    setModalConfig({
                                        ...modalConfig,
                                        show: false,
                                        type: "",
                                        data: {},
                                        ind: "",
                                    });
                                }}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TambahProjects;
