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
        <div className="flex min-h-screen flex-col items-center justify-between p-1">
            <Head>
                <title>PYTH Airdrop checker</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="mt-5">
                    <label className="pr-5">Enter your EVM Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allEvmAddresses"
                        placeholder="Enter All EVM Address in new line"
                        cols={60}
                        rows={3}
                        // value={addresses["evm_addresses"]}
                        onChange={raw_evm_address}
                    />
                </div>

                <br />
                <div className="mt-5">
                    <label className="pr-5">Enter your SOL Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allSolAddresses"
                        placeholder="Enter All SOL Address in new line"
                        cols={60}
                        rows={3}
                        // value={addresses["sol_addresses"]}
                        onChange={raw_sol_address}
                    />
                </div>
                <br />
                <div className="mt-5">
                    <label className="pr-5">Enter your SUI Addresses: </label>
                    <textarea
                        className="p-2 rounded border-redborder border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="allSuiAddresses"
                        placeholder="Enter All SUI Address in new line"
                        cols={60}
                        rows={3}
                        // value={addresses["sui_addresses"]}
                        onChange={raw_sui_address}
                    />
                </div>
                <br />
                <div className="flex  flex-col items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
                        onClick={fetchAmount}
                    >
                        Check $PYTH Allocation
                    </button>
                </div>
                <div className="p-10">
                    <ul className="flex flex-col text-lg">
                        <li className="flex font-bold w-50 h-9" key={"total"}>
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
            </main>
        </div>
    );
}
