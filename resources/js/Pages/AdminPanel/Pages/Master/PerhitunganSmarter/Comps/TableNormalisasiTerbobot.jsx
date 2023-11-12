import React, { useState } from "react";
import { Input } from "@/Pages/AdminPanel/Components";

const TableNormalisasiTerbobot = ({
    dataKriteria,
    hasilTableStudiKasus,
    atributKriteria,
    subKriteriaAll,
}) => {
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
            const range = item?.score
                ? item?.score?.split(" – ")
                : item?.score_sub_kriteria?.split(" – ");

            const score = item?.score ? item?.score : item?.score_sub_kriteria;

            if (typeof value === "string") {
                return value === item.nama_atribut_kriteria;
            } else if (value === 0) {
                return parseInt(score) === value;
            } else if (range?.length === 2 && value > 0) {
                const lower = parseInt(range[0]);
                const upper = parseInt(range[1]);
                return value >= lower && value <= upper;
            } else if (score?.startsWith(">") && value > 0) {
                const threshold = parseInt(score?.substring(1));
                return value > threshold;
            } else if (score?.startsWith("<") && value > 0) {
                const threshold = parseInt(score?.substring(1));
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
                typeof data?.value === "string"
                    ? item?.nama_sub_kriteria !== data?.value
                        ? data?.value ===
                          item?.atribut_kriteria?.find(
                              (res) =>
                                  res?.nama_atribut_kriteria === data?.value
                          )?.nama_atribut_kriteria
                        : data?.value === item?.nama_sub_kriteria
                    : scoreMatchesCondition(item, data?.value)
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
                    : data?.atribut_kriteria?.length > 0 &&
                      data?.sub_kriteria?.length > 0
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
                    const subKriteriaFind = current?.sub_kriteria.find(
                        (res) => res.id === current.id_sub_kriteria
                    );

                    const bobotSubKriteria =
                        (1 /
                            parseFloat(
                                subKriteriaAll.filter(
                                    (res) => res.id_kriteria === current.id
                                ).length
                            )) *
                        calculateSumSubKriteria(
                            subKriteriaAll,
                            parseFloat(subKriteriaFind.priority),
                            current.id
                        );

                    existing.value += current.value;

                    existing.hasil_bobot +=
                        current.hasil_bobot * bobotSubKriteria;
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

    const AlternatifRows = () => (
        <>
            {mergedData.map((alternatif, i) => {
                const calInd = parseInt(i - 1);

                return (
                    <>
                        <tr key={alternatif.id}>
                            <td>
                                {alternatif.nama_alternatif ===
                                    hasilTableStudiKasus[calInd]
                                        ?.nama_alternatif && i > 0
                                    ? "-"
                                    : alternatif?.nama_alternatif}
                            </td>
                            <td>
                                {alternatif.nama_alternatif ===
                                    hasilTableStudiKasus[calInd]
                                        ?.nama_alternatif && i > 0
                                    ? "-"
                                    : alternatif.kategori}
                            </td>

                            <td>{alternatif.jumlah_jenis_bahan}</td>
                            <td>{alternatif.nama_bagian_bangunan}</td>
                            {alternatif?.kriteria?.map((val, ind) => (
                                <td>{val.hasil_bobot}</td>
                            ))}
                        </tr>
                    </>
                );
            })}
            <tr>
                <td colSpan="4" className="font-bold text-center">
                    MIN
                </td>
                {getTotalMin().map((res) => (
                    <td className="font-bold">{res.hasil}</td>
                ))}
            </tr>
            <tr>
                <td colSpan="4" className="font-bold text-center">
                    MAX
                </td>
                {getTotalMax().map((res) => (
                    <td className="font-bold">{res.hasil}</td>
                ))}
            </tr>
        </>
    );

    return (
        <>
            <div className="overflow-x-auto">
                <div className="font-bold text-center">
                    TABEL NORMALISASI TERBOBOT
                </div>
                <table className="table table-compact table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-center" rowSpan="2">
                                Alternatif
                            </th>
                            <th className="text-center" rowSpan="2">
                                Kategori
                            </th>
                            <th className="text-center" rowSpan="2">
                                Jumlah Jenis Bahan
                            </th>
                            <th className="text-center" rowSpan="2">
                                Bagian Bangunan
                            </th>
                            {kriteriaHeaders}
                        </tr>
                    </thead>
                    <tbody>{AlternatifRows()}</tbody>
                </table>
            </div>
        </>
    );
};

export default TableNormalisasiTerbobot;
