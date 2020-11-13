var Web3 = require('web3');
const config = require("config.json")

var web3 = new Web3(config.rpc_endpoint);
const ppos = web3.ppos; 

(async () => {

	const nodeId = config.node_id

	ppos.updateSetting({
	    chainId: config.chain_id
	});

	while(true){
		block_num = await web3.platon.getBlockNumber();
		remain = 10750 - block_num%10750
		console.log("当前块高" + block_num + "---" + remain);
		if(remain < 50){
			
			// ======查询奖励======
			const reward_address = web3.utils.decodeBech32Address(config.reward_address)
			data = {
				funcType: 5100,
				address: ppos.hexStrBuf(reward_address),
				nodeIDs:[]
			};
			reply = await ppos.call(data);
			// console.log(reply);
			current_reward = parseInt(reply["Ret"][0]["reward"], 16);
			console.log("当前余额:" + current_reward)

			await sleep(1000);

			// ======查询余额======
			atp_balance = await web3.platon.getBalance(config.reward_address);
			console.log("当前余额:" + atp_balance)

			// ======更新gasPrice=====
			let gasPrice = await web3.platon.getGasPrice();
	    let hexGasPrice = "0x" + new web3.utils.BN(gasPrice).toString(16);
	    ppos.updateSetting({
	        gasPrice: hexGasPrice,
	        gas: "0xcb20",
	        privateKey: config.reward_address_sk
	    })

			if(current_reward + atp_balance > 1.001 * 10**18){
				console.log("金额>1.001, 创建抵押")
				// ======领取奖励======
				if(current_reward > 0.1 * 10**18){
						reply = await ppos.send({
						funcType: 5000
					});
					console.log('领取奖励信息: ', reply);

					await sleep(3000);
				}

				new_atp_balance = await web3.platon.getBalance(config.reward_address)

				console.log("领取后，最新持仓:" + new_atp_balance)
				// ======创建委托======
				await ppos.send({
					funcType: 1004,
					typ:0,
					nodeId:ppos.hexStrBuf(nodeId),
					amount: new_atp_balance - 1 * 10 ** 16
				});

				await sleep(60000);
			}else{
				console.log("金额不足，无需抵押")
			}
		}
		await sleep(11000);
	}
})()


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}




