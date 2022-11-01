<<<<<<< HEAD
# ZJU-blockchain-course-2022


## 如何运行

1. 在本地启动ganache应用。

2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```
3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
    ```
4. 在`./contracts/hardhat.config.ts`中更改ganache相关数据
5. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat run scripts/deploy.ts --network ganache
    ```
    
    并将合约输出更新到`./frontend/src/utils`
6. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm run start
    ```

## 功能实现分析

1. 领取ERC20 token

   使用_mint分配给请求者一些证积分

   再记录至mapping中，以辨认谁已经领取了

2. 使用一定数量通证积分发布提案

   使用transferfrom将token转给合约

   创建结构体以记录提案内容

   再记录至mapping中，使得能够通过index找寻该提案

3. 一定时间内，能够进行投票

   使用transferfrom将token转给合约

   更新提案数据agree, disagree

   再记录至mapping中，以辨认谁已经投票了

4. 领取奖励

   使用transfer将token转给请求者

   更新提案数据

## 项目运行截图

npx hardhat run scripts/deploy.ts --network ganache![ganache deploy 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/ganache deploy 2.png)

npm start

![npm start 1](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/npm start 1.png)

![npm start 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/npm start 2.png)

界面初始化（没有任何数据）![begin](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/begin.png)

领取初始token![claim airdrop 1](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/claim airdrop 1.png)

![claim airdrop 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/claim airdrop 2.png)

发布提案

![sumbit proposal 1](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/sumbit proposal 1.png)

![sumbit proposal 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/sumbit proposal 2.png)

投票![vote](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/vote.png)

![vote 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/vote 2.png)

查看以往提案![check proposal 1](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/check proposal 1.png)

![check proposal 2](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/check proposal 2.png)

领取奖励![claimreward](/Users/chiaqiyang/Desktop/homework/ZJU-blockchain-course-2022-main/screenshot/claimreward.png)

## 参考内容

课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。

如果有其它参考的内容，也请在这里陈列。
=======
# contact-erc20-homework
>>>>>>> 9f02540 (Initial commit)
