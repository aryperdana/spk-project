import React, { useState } from "react";
import { Input } from "@/Pages/AdminPanel/Components";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const TableOutput = ({
    dataKriteria,
    hasilTableStudiKasus,
    atributKriteria,
    subKriteriaAll,
    dataAlternatifSelected,
    project_dropdown,
}) => {
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
        id_projects: dataAlternatifSelected[0].id_project,
        nama_projects: project_dropdown.find(
            (val) => dataAlternatifSelected[0].id_project === val.id
        ).nama_project,
        detail: [],
    });

    console.log("cok", data);

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
    const calculateSumKriteria = (arr, priority) => {
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

    const calculateSumSubKriteria = (arr, priority, id_kriteria) => {
        if (priority < 1) {
            return 0;
        }

        return arr
            ?.filter((val) => val.id_kriteria === id_kriteria)
            ?.reduce((accumulator, currentNumber) => {
                if (currentNumber?.priority >= priority) {
                    return accumulator + 1 / currentNumber?.priority;
                }
                return accumulator;
            }, 0);
    };

    const calculateSumAtributKriteria = (
        arr,
        priority,
        id_sub_kriteria,
        id_kriteria
    ) => {
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
    const kriteriaHeaders = dataKriteria.map((kriteria) => {
        return (
            <th className="text-center" key={kriteria.id}>
                {kriteria.nama_kriteria}
            </th>
        );
    });

    const checkScoreAtributKriteria = (data) => {
        const scoreMatchesCondition = (item, value) => {
            const range = item?.score?.split(" – ");

            if (typeof value === "string") {
                return value === item.nama_atribut_kriteria;
            } else if (value === 0) {
                return parseInt(item?.score) === value;
            } else if (range.length === 2 && value > 0) {
                const lower = parseInt(range[0]);
                const upper = parseInt(range[1]);
                return value >= lower && value <= upper;
            } else if (item?.score?.startsWith(">") && value > 0) {
                const threshold = parseInt(item?.score?.substring(1));
                return value > threshold;
            } else if (item?.score?.startsWith("<") && value > 0) {
                const threshold = parseInt(item?.score?.substring(1));
                return value < threshold;
            }
            return item;
        };

        const filterDataAtributKriteria = data?.atribut_kriteria
            ?.filter((item) => scoreMatchesCondition(item, data?.value))
            ?.map((val) => ({
                ...val,
                bobot_atribut_kriteria:
                    (1 /
                        parseFloat(
                            atributKriteria.filter((res) =>
                                res?.id_sub_kriteria
                                    ? val.id_sub_kriteria ===
                                      res.id_sub_kriteria
                                    : val.id_kriteria === res.id_kriteria
                            ).length
                        )) *
                    calculateSumAtributKriteria(
                        atributKriteria,
                        parseFloat(val.priority),
                        val.id_sub_kriteria,
                        val.id_kriteria
                    ),
            }));

        const filterDataSubKriteria = data?.sub_kriteria
            ?.filter((item) =>
                filterDataAtributKriteria.length === 0
                    ? data?.value === item?.nama_sub_kriteria
                    : filterDataAtributKriteria[0]?.id_sub_kriteria === item?.id
            )
            ?.map((val) => ({
                ...val,
                bobot_sub_kriteria:
                    (1 /
                        parseFloat(
                            subKriteriaAll.filter(
                                (res) => val.id_kriteria === res.id_kriteria
                            ).length
                        )) *
                    calculateSumSubKriteria(
                        subKriteriaAll,
                        parseFloat(val.priority),
                        val.id_kriteria
                    ),
            }));

        const bobotKriteria =
            (1 / parseFloat(dataKriteria.length)) *
            calculateSumKriteria(dataKriteria, parseFloat(data.priority));

        const filteredData = {
            ...data,
            bobot_kriteria: bobotKriteria,
            atribut_kriteria: filterDataAtributKriteria,
            sub_kriteria: filterDataSubKriteria,
            total_bobot:
                typeof data?.value === "string"
                    ? filterDataSubKriteria[0]?.bobot_sub_kriteria
                    : filterDataSubKriteria?.length > 0 ||
                      filterDataAtributKriteria?.length > 0
                    ? filterDataAtributKriteria[0]?.bobot_atribut_kriteria
                    : filterDataSubKriteria[0]?.bobot_sub_kriteria,
        };

        return data?.atribut_kriteria?.length === 0 &&
            data?.sub_kriteria?.length === 0
            ? data?.value
            : filteredData?.total_bobot;
    };

    const transformHasil = hasilTableStudiKasus.map((val) => ({
        ...val,
        kriteria: val?.kriteria?.map((res) => ({
            ...res,
            hasil_bobot: checkScoreAtributKriteria(res),
        })),
    }));

    const mergedData = transformHasil.map((val) => ({
        ...val,
        kriteria: val.kriteria?.reduce((result, current) => {
            if (current.is_header === 1) {
                // Find the existing object with the same criteria and merge the data
                const existing = result.find(
                    (obj) => obj.nama_kriteria === current.nama_kriteria
                );
                if (existing) {
                    existing.value += current.value;
                    existing.hasil_bobot += current.hasil_bobot;
                } else {
                    result.push(current);
                }
            } else {
                result.push(current);
            }
            return result;
        }, []),
    }));

    const getTotalMin = () => {
        const arr = dataKriteria.map((val, i) => {
            const cuk = mergedData?.map((res) => res?.kriteria[i]?.hasil_bobot);
            return {
                ...val,
                hasil: Math.min(...cuk),
            };
        });

        return arr;
    };

    const getTotalMax = () => {
        const arr = dataKriteria.map((val, i) => {
            const cuk = mergedData?.map((res) => res?.kriteria[i]?.hasil_bobot);
            return {
                ...val,
                hasil: Math.max(...cuk),
            };
        });

        return arr;
    };

    const getDataTableUitility = () =>
        mergedData.map((val) => {
            return {
                ...val,
                kriteria: val.kriteria.map((res, i) => {
                    return {
                        ...res,
                        total_utility:
                            1 *
                            ((res?.hasil_bobot - getTotalMin()[i]?.hasil) /
                                (getTotalMax()[i]?.hasil -
                                    getTotalMin()[i]?.hasil)),
                    };
                }),
            };
        });

    const getDataTableAkhir = () => {
        const dataKriteriaBobot = dataKriteria.map((val) => ({
            ...val,
            bobot:
                (1 / parseFloat(dataKriteria.length)) *
                calculateSumKriteria(dataKriteria, parseFloat(val.priority)),
        }));
        return getDataTableUitility().map((val) => {
            return {
                ...val,
                kriteria: val.kriteria.map((res, i) => {
                    return {
                        ...res,
                        total_nilai_akhir:
                            dataKriteriaBobot[i]?.bobot * res?.total_utility,
                    };
                }),
            };
        });
    };

    const mappingSubmitData = (value) =>
        value.map((alternatif) => {
            const totalNilaiAkhir = alternatif?.kriteria?.reduce(
                (prev, curr) => prev + parseFloat(curr.total_nilai_akhir ?? 0),
                0
            );

            const biayaDibutuhkan =
                alternatif.kategori === "pelinggih" ? 10000000 : 20000000;
            const danaDimiliki = alternatif?.kriteria.find(
                (res) => res?.nama_kriteria === "Nominal Dana Tersedia"
            )?.value;

            const statusDana =
                parseInt(danaDimiliki) - parseInt(biayaDibutuhkan);
            return {
                hasil_perhitungan: totalNilaiAkhir,
                saran_perbaikan_bangunan: alternatif?.kode_alternatif,
                nama_bangunan: alternatif?.nama_alternatif,
                kategori_bangunan: alternatif?.kategori,
                saran_revitalisasi:
                    totalNilaiAkhir < 0.5
                        ? "Tidak Perlu Diperbaiki"
                        : "Perlu Diperbaiki",
                bagian_yang_dicek: alternatif.nama_bagian_bangunan,
                bagian_yang_direvitalisasi:
                    alternatif.nama_bagian_bangunan === "Atap"
                        ? "Atap"
                        : "Seluruh Bagian",
                bahan_yang_digunakan: alternatif?.kriteria.find(
                    (res) => res?.nama_kriteria === "Bahan yang Digunakan"
                )?.value,
                estimasi_biaya_dibutuhkan: biayaDibutuhkan,
                dana_dimiliki: danaDimiliki,
                status_dana: statusDana,
                estimasi_pengerjaan:
                    alternatif.kategori === "pelinggih" ? "15 Hari" : "30 Hari",
            };
        });

    const submit = (value) => {
        const finalValues = { ...data, detail: mappingSubmitData(value) };

        router.post("perhitungan-smarter", finalValues);
    };

    const AlternatifRows = () => (
        <>
            {getDataTableAkhir()
                .sort((a, b) => {
                    const totalNilaiAkhirA = a?.kriteria?.reduce(
                        (prev, curr) =>
                            prev + parseFloat(curr.total_nilai_akhir ?? 0),
                        0
                    );
                    const totalNilaiAkhirB = b?.kriteria?.reduce(
                        (prev, curr) =>
                            prev + parseFloat(curr.total_nilai_akhir ?? 0),
                        0
                    );
                    return totalNilaiAkhirB - totalNilaiAkhirA;
                })
                .map((alternatif, i) => {
                    const totalNilaiAkhir = alternatif?.kriteria?.reduce(
                        (prev, curr) =>
                            prev + parseFloat(curr.total_nilai_akhir ?? 0),
                        0
                    );

                    const persentaseNilaiAkhir = totalNilaiAkhir * 1;
                    const biayaDibutuhkan =
                        alternatif.kategori === "pelinggih"
                            ? 10000000
                            : 20000000;
                    const danaDimiliki = alternatif?.kriteria.find(
                        (res) => res?.nama_kriteria === "Nominal Dana Tersedia"
                    )?.value;

                    const statusDana =
                        parseInt(danaDimiliki) - parseInt(biayaDibutuhkan);

                    return (
                        <>
                            <tr key={alternatif.id}>
                                <td>{i + 1}</td>
                                <td>{totalNilaiAkhir}</td>
                                <td>{alternatif?.kode_alternatif}</td>
                                <td>{alternatif?.nama_alternatif}</td>
                                <td className="capitalize">
                                    {alternatif.kategori}
                                </td>
                                <td>
                                    {totalNilaiAkhir < 0.5
                                        ? "Tidak Perlu Diperbaiki"
                                        : "Perlu Diperbaiki"}
                                </td>
                                <td>{alternatif.nama_bagian_bangunan}</td>
                                <td>
                                    {alternatif.nama_bagian_bangunan === "Atap"
                                        ? "Atap"
                                        : "Seluruh Bagian"}
                                </td>
                                <td>
                                    {
                                        alternatif?.kriteria.find(
                                            (res) =>
                                                res?.nama_kriteria ===
                                                "Bahan yang Digunakan"
                                        )?.value
                                    }
                                </td>
                                <td>
                                    {biayaDibutuhkan
                                        ? formatRupiah(biayaDibutuhkan)
                                        : "-"}
                                </td>
                                <td>
                                    {danaDimiliki
                                        ? formatRupiah(danaDimiliki)
                                        : "-"}
                                </td>
                                <td>
                                    {statusDana
                                        ? formatRupiah(statusDana)
                                        : "-"}
                                </td>
                                <td>
                                    {alternatif.kategori === "pelinggih"
                                        ? "15 Hari"
                                        : "30 Hari"}
                                </td>
                            </tr>
                        </>
                    );
                })}
        </>
    );

    return (
        <>
            <div className="overflow-x-auto">
                <div className="font-bold text-center">OUTPUT</div>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th className="text-center">
                                Urutan Prioritas
                                <br /> Perbaikan
                            </th>
                            <th className="text-center">Hasil Perhitungan</th>
                            <th className="text-center">
                                Saran Perbaikan <br />
                                Bangunan
                            </th>
                            <th className="text-center">Nama Bangunan</th>
                            <th className="text-center">Kategori Bangunan</th>
                            <th className="text-center">Saran Revitalisasi</th>
                            <th className="text-center">Bagian yang Di Cek</th>
                            <th className="text-center">
                                Bagian yang <br /> Disarankan <br /> untuk di
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
                            <th className="text-center">Dana Dimiliki</th>
                            <th className="text-center">Status Dana</th>
                            <th className="text-center">
                                Estimasi Waktu <br />
                                Pengerjaan
                            </th>
                        </tr>
                    </thead>
                    <tbody>{AlternatifRows()}</tbody>
                </table>
            </div>
            <div className="flex justify-end gap-2 mt-3">
                <div
                    className="btn btn-primary btn-sm"
                    onClick={() => submit(getDataTableAkhir())}
                >
                    Simpan
                </div>
                <div
                    className="btn btn-warning btn-sm"
                    onClick={() => window.location.reload()}
                >
                    Hitung Ulang
                </div>
            </div>
        </>
    );
};

export default TableOutput;
