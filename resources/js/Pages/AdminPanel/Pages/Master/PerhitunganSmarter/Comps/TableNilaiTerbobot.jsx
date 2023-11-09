import React, { useState } from "react";
import { Input } from "@/Pages/AdminPanel/Components";

const TableNilaiTerbobot = ({
    dataKriteria,
    setTableNilaiStudiKasusConfig,
    tableNilaiStudiKasusConfig,
    hasilTableStudiKasus,
    atributKriteria,
    subKriteriaDropdown,
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
        const colspan = kriteria.sub_kriteria.filter(
            (val) => val.is_header === 1
        ).length;
        const rowspan = colspan === 0 ? 2 : 1;
        return (
            <th
                className="text-center"
                key={kriteria.id}
                colSpan={colspan}
                rowSpan={rowspan}
            >
                {kriteria.nama_kriteria}
            </th>
        );
    });

    const subKriteriaHeaders = dataKriteria.reduce((result, kriteria) => {
        const subKriteriaCells = kriteria.sub_kriteria
            .filter((val) => val.is_header === 1)
            .map((subKriteria) => (
                <th className="text-center" key={subKriteria.id}>
                    {subKriteria.nama_sub_kriteria} (%)
                </th>
            ));
        return result.concat(subKriteriaCells);
    }, []);

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

    const alternatifRows = hasilTableStudiKasus.map((alternatif, i) => {
        const calInd = parseInt(i - 1);

        return (
            <tr key={alternatif.id}>
                <td>
                    {alternatif.nama_alternatif ===
                        hasilTableStudiKasus[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif?.nama_alternatif}
                </td>
                <td>
                    {alternatif.nama_alternatif ===
                        hasilTableStudiKasus[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif.kategori}
                </td>

                <td>{alternatif.jumlah_jenis_bahan}</td>
                <td>{alternatif.nama_bagian_bangunan}</td>
                {alternatif?.kriteria?.map((val, ind) => (
                    <td>{checkScoreAtributKriteria(val)}</td>
                ))}
            </tr>
        );
    });

    return (
        <>
            <div className="overflow-x-auto">
                <div className="font-bold text-center">
                    TABEL NILAI TERBOBOT
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
                        <tr>{subKriteriaHeaders}</tr>
                    </thead>
                    <tbody>{alternatifRows}</tbody>
                </table>
            </div>
        </>
    );
};

export default TableNilaiTerbobot;
