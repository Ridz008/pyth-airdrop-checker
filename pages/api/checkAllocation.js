export default async function handler(req, res) {
    let all_address;
    // all_address = {
    //     evm_addresses: [
    //         "0x0754F1Df5f57C969E82a4E6e9d1f1c7D04Df7587",
    //         "0x1415517e51Cd6b8cca8C1Da56400ff47aab03644",
    //     ],
    //     sui_addresses: [
    //         "0x42a2bdb03943e144e6638a8ff09cc8e39e09e0287ac60353a0f9a23055e297ad",
    //         "0xca47c7978b21d3001d51db2c7a4a680fc113b60f89e85690a330e829052e5ef8",
    //     ],
    //     sol_addresses: [
    //         "6Xa5GETF9YaYx2Ls2M2xfvccYr8tvLbfoJfdGwiNU1Lz",
    //         "6Xa5GETF9YaYx2Ls2M2xfvccYr8tvLbfoJfdGwiNU1Lz",
    //     ],
    // };
    // const { all_address } = req.body;
    all_address = req.body.all_address;
    let finalData = await getResponse(all_address);
    if (finalData == "")
        finalData = { evm_total: 0, sol_total: 0, sui_total: 0 };
    res.status(200).json(finalData);
}

// (async function () {
//     await getResponse2(all_address);
// })();

async function printData(pending_promises, isEvm, isSol, isSui) {
    let fetchAmt = pending_promises.map(async (indi_promis) => {
        let amount = 0;
        let temp2 = await indi_promis;
        temp2 = await temp2.json();
        if (temp2["error"]) {
            return amount;
        } else {
            if (isEvm) {
                temp2.map((data) => {
                    amount = data["amount"] / 1e6;
                    console.log(
                        `Chain:`,
                        data["chain"],
                        `\t\tAmount: `,
                        amount
                    );
                });
            } else if (isSui || isSol) {
                amount = temp2["amount"] / 1e6;
                console.log(`Chain: Sui`, `\t\tAmount: `, amount);
            }
        }
        return amount;
    });
    let total = await Promise.all(fetchAmt); //.then((completed) => total);
    if (total.length > 0) {
        total = total.reduce((prev, num) => num + prev, 0);
    }
    return total;
}

async function getResponse(address) {
    let total = 0;
    try {
        //#region
        // create an array of promises for each type of address
        let evm_promises = address.evm_addresses.map((evm_address) =>
            fetch(
                `https://airdrop.pyth.network/api/grant/v1/evm_breakdown?identity=${evm_address}`
            )
        );
        let sui_promises = address.sui_addresses.map((sui_address) =>
            fetch(
                `https://airdrop.pyth.network/api/grant/v1/amount_and_proof?ecosystem=sui&identity=${sui_address}`
            )
        );
        let sol_promises = address.sol_addresses.map((sol_address) =>
            fetch(
                `https://airdrop.pyth.network/api/grant/v1/solana_breakdown?identity=${sol_address}`
            )
        );
        //#endregion

        let evm_total = Number(
            await printData(evm_promises, true, false, false)
        );

        let sol_total = Number(
            await printData(sol_promises, false, true, false)
        );

        let sui_total = Number(
            await printData(sui_promises, false, false, true)
        );

        console.log(`Total $PYTH Tokens:`, evm_total + sui_total + sol_total);
        let finalDataToReturn = {
            evm_total,
            sol_total,
            sui_total,
        };
        return finalDataToReturn;
    } catch (error) {
        // handle any error
        console.error(error);
    }
}
