

适用于 alaya 或 platon 网络，最大化节点的委托收益。每个epoch结束时，领取收益+复投

## 功能

* 自动领取收益，并合并账号余额复投，无需使用app频繁操作
* 每个epoch结束时，定时执行，最大化收益回报
* 采用较低的gas值，手续费消耗低


## 使用说明

* 安装nodejs , screen
* 全局安装lerna `npm i lerna -g`
* 安装依赖： `yarn` 或者 `npm install`
* 复制配置文件 `cp config.json.example config.json` 修改相关配置

```
config.json 字段说明
{
  "rpc_endpoint": "http://localhost:6789",  // 目前无公开节点，最好访问自己本地节点
  "node_id": "0xfad2c7f917eb3057d85031eae8bbda52541b527dd1d24a25e7e9b40d7329570a85dc45ec61b189a9cc30047ae906a08dc375558828e1c76dc853ce99b42b91e4", //希望复投的节点id， 如：dpos.club 节点ID如上
  "chain_id": 201018,  // alaya
  "reward_address": "your-reward-address",  //【reward address 的地址】
  "reward_address_sk": "your-reward-address-private-key", //【reward address 私钥，用于领取收益+复投操作】
}


```
* 启动新screen  `screen -S stake`
* 在新的screen下执行： `node app.js`

## 执行结果
距离每个epoch结束50区块之前，为等待时间。当距离epoch结束前50区块时，会执行:

* 领取节点委托收益
* 复投指定节点（保留0.1 apt）

## 提醒
【重要】程序执行需配置 reward address 私钥，请自行注意服务器执行环境的安全。

## TODO

* 支持计算最优利率，复投多个节点
* 优化执行与部署方式

## Author

vianull

如果对您有用，请支持Alaya节点[dpos.club](https://scan.alaya.network/node-detail?address=0xfad2c7f917eb3057d85031eae8bbda52541b527dd1d24a25e7e9b40d7329570a85dc45ec61b189a9cc30047ae906a08dc375558828e1c76dc853ce99b42b91e4)

或打赏 Alaya:
atp1842mp45vw30vgvzmylwdxmxxc00ggjp6q2gv8v