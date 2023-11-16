"use client";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState({
        evm_total: 0,
        sol_total: 0,
        sui_total: 0,
    });

    const [addresses, setAddresses] = useState({
        evm_addresses: [],
        sui_addresses: [],
        sol_addresses: [],
    });

    const fetchAmount = async () => {
        console.log(`fetchAmt called`);
        console.log(addresses);
        const response = await fetch("/api/checkAllocation", {
            method: "POST",
            body: JSON.stringify({
                all_address: addresses,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await response.json();
        console.log(data);
        setData(data);
    };

    const raw_evm_address = (e) => {
        let raw_data = e.target.value;
        raw_data = raw_data.trim().split("\n");
        let local_copy = addresses;
        local_copy["evm_addresses"] = raw_data;
        setAddresses(local_copy);
        console.log(addresses);
    };
    const raw_sol_address = (e) => {
        let raw_data = e.target.value;
        raw_data = raw_data.trim().split("\n");
        let local_copy = addresses;
        local_copy["sol_addresses"] = raw_data;
        setAddresses(local_copy);
        console.log(addresses);
    };
    const raw_sui_address = (e) => {
        let raw_data = e.target.value;
        raw_data = raw_data.trim().split("\n");
        let local_copy = addresses;
        local_copy["sui_addresses"] = raw_data;
        setAddresses(local_copy);
        console.log(addresses);
    };
    useEffect(() => {}, [data]);
    return (
        <div className="flex min-h-[120vh] flex-col items-center justify-between p-1 bg-gray-950 text-white">
            <Head>
                <title>PYTH Airdrop checker</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="font-semibold font-sans pt-7 pb-2 text-xl">
                    Check your $PYTH Token Allocation for all address at once.
                    Enter each address in new line - press enter key{" "}
                </div>
                <div className="mt-5">
                    <label className="pr-5">Enter your EVM Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allEvmAddresses"
                        placeholder="Enter All EVM Address in new line"
                        cols={70}
                        rows={3}
                        onChange={raw_evm_address}
                    />
                </div>

                <br />
                <div className="mt-5">
                    <label className="pr-5">Enter your SOL Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allSolAddresses"
                        placeholder="Enter All SOL Address in new line"
                        cols={70}
                        rows={3}
                        onChange={raw_sol_address}
                    />
                </div>
                <br />
                <div className="mt-5">
                    <label className="pr-5">Enter your SUI Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allSuiAddresses"
                        placeholder="Enter All SUI Address in new line"
                        cols={70}
                        rows={3}
                        onChange={raw_sui_address}
                    />
                </div>
                <br />
                <div className="flex  flex-col items-center justify-between min-w-[100px]">
                    <button
                        className="bg-red-800 hover:bg-blue-900 text-white font-bold py-2 px-4 border border-blue-900 rounded min-w-[40px]"
                        onClick={fetchAmount}
                    >
                        Check $PYTH Allocation
                    </button>
                </div>
                <div className="p-5">
                    <ul className="flex flex-col text-lg">
                        <li
                            className="flex font-bold text-ellipsis text-2xl w-50 h-9 justify-center text-green-500"
                            key={"total"}
                        >
                            {"Total =>"}{" "}
                            {data["evm_total"] +
                                data["sol_total"] +
                                data["sui_total"]}{" "}
                            $PYTH
                        </li>
                        <li className="flex font-bold w-50 h-9" key={"evm"}>
                            {"EVM =>"}{" "}
                            <span className="">{data["evm_total"]} $PYTH</span>
                        </li>
                        <li className="flex font-bold w-50 h-9" key={"sol"}>
                            {"SOL =>"} {data["sol_total"]} $PYTH
                        </li>
                        <li className="flex font-bold w-50 h-9" key={"sui"}>
                            {"Sui =>"} {data["sui_total"]} $PYTH
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="  font-semibold  text-xl w-50 h-8 justify-center text-green-200">
                        If this helped you {"=>"} please consider supporting me{" "}
                        <br />
                        ETH/OP/ARB/Polygon EVM Add: &nbsp;
                        <span className="text-red-300">
                            0xab740b1b0edf7a05f2d10765c4670eab102eeaf5
                        </span>
                        <br />
                        SUI Add:&nbsp;
                        <span className="text-red-300">
                            0x17ece16c0381347d2c39d961338acc1218a627516a217fa7f868d5ab71e1e43d
                        </span>
                        <br />
                        SOL Add:&nbsp;
                        <span className="text-red-300">
                            {" "}
                            Bk5CSA3nsXaoBwNYmFYs7mpjjjKgNs5yh4qUXstB175g{" "}
                        </span>
                        [ accepting $PYTH too if you got xD]
                    </p>
                </div>
            </main>
        </div>
    );
}
