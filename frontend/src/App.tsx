import {useEffect, useState} from 'react';
import {StudentSocietyDAOContract, myERC20Contract, web3} from "./utils/contracts";
import './App.css';
const GanacheTestChainId = '0x539' 
const GanacheTestChainName = 'Ganache Test Chain'
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545'
function App() {
  const [account, setAccount] = useState('')
  const [accountBalance, setAccountBalance] = useState(0)
  const [voteAmount, setVotemount] = useState(0)
  const [proposalGenerateAmount, setProposalGenerateAmount] = useState(0)
  const [Index, setIndex] = useState(0)
  const [index, setindex] = useState(0)

  const [name, setname] = useState<string>()
  const [agree, setagree] = useState('')
  const [disagree, setdisagree] = useState('')
  const [votestatus, setvotestatus] = useState(false)
  const [claimstatus, setclaimstatus] = useState(true)
  const [voteavailabes, setvoteavailabes] = useState(false)
  const [airdropclaimed, setairdropclaimed] = useState(false)

  const [proposalname, setproposalname] = useState('')
  const [idinput, setinput] = useState('')

  
  useEffect(() => {
    // 初始化检查用户是否已经连接钱包
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    const initCheckAccounts = async () => {
        // @ts-ignore
        const {ethereum} = window;
        if (Boolean(ethereum && ethereum.isMetaMask)) {
            // 尝试获取连接的用户账户
            const accounts = await web3.eth.getAccounts()
            if(accounts && accounts.length) {
                setAccount(accounts[0])
            }
        }
    }

    initCheckAccounts()
}, [])
useEffect(() => {
    // 初始化检查用户是否已经连接钱包
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    const initContact = async () => {
        if (StudentSocietyDAOContract&&myERC20Contract) {
            const va = await StudentSocietyDAOContract.methods.VoteAmount().call()
            setVotemount(va)
            const pa = await StudentSocietyDAOContract.methods.ProposalGenerateAmount().call()
            setProposalGenerateAmount(pa)

            const Id= await StudentSocietyDAOContract.methods.getindex().call();
            setIndex(Number(Id))
            setindex(Number(Id))
        } else {
            alert('Contract not exists.')
        }
    }
    initContact()
}, [])
  useEffect(() => {
    const getAccountInfo = async () => {
        if (myERC20Contract) {
            const ab = await myERC20Contract.methods.balanceOf(account).call()
            setAccountBalance(ab)

            const ac = await myERC20Contract.methods.claimed().call({
                from: account
            })
            setairdropclaimed(ac)
        } else {
            alert('Contract not exists.')
        }
    }

    if(account !== '') {
        getAccountInfo()
    }
}, [account])
useEffect(() => {const getproposalinfo = async () => {
    if (StudentSocietyDAOContract&&myERC20Contract) {
        try {
            if(index>0){ 
                var Name;      
                Name =await StudentSocietyDAOContract.methods.getproposalname(index).call();
                const info =await StudentSocietyDAOContract.methods.getproposalstatus(index).call({
                    from: account
                })
                setname(Name);
                setagree(info[0]);
                setdisagree(info[1]);
                setvotestatus(info[2]);
                setclaimstatus(info[3]);
                setvoteavailabes(info[4]);
            }
        } catch (error: any) {
            alert(error.message)
        }

    } else {
        alert('Contract not exists.')
    }
}
    getproposalinfo()
    
},[index,account])
    

  const onClickConnectWallet = async () => {
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    // @ts-ignore
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
        alert('MetaMask is not installed!');
        return
    }

    try {
        // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
        if (ethereum.chainId !== GanacheTestChainId) {
            const chain = {
                chainId: GanacheTestChainId, // Chain-ID
                chainName: GanacheTestChainName, // Chain-Name
                rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
            };

            try {
                // 尝试切换到本地网络
                await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
            } catch (switchError: any) {
                // 如果本地网络没有添加到Metamask中，添加该网络
                if (switchError.code === 4902) {
                    await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                    });
                }
            }
        }

        // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
        await ethereum.request({method: 'eth_requestAccounts'});
        // 获取小狐狸拿到的授权用户列表
        const accounts = await ethereum.request({method: 'eth_accounts'});
        // 如果用户存在，展示其account，否则显示错误信息
        setAccount(accounts[0] || 'Not able to get accounts');
    } catch (error: any) {
        alert(error.message)
    }
  }
    const onClaimTokenAirdrop = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (myERC20Contract) {
            try {
                await myERC20Contract.methods.airdrop().send({
                    from: account
                })
                alert('You have claimed ZJU Token.')
                window.location.reload();
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }
    const sumbitproposal = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }
        if (StudentSocietyDAOContract&&myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, proposalGenerateAmount).send({
                    from: account
                })
                await StudentSocietyDAOContract.methods.generateproposal(proposalname).send({
                    from: account
                })
                alert('proposal generated.')

                const Id = await StudentSocietyDAOContract.methods.getindex().call();
                setIndex(Id)
                setindex(Id)

                window.location.reload();
                
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }

    }
    
    const switchproposal = async () => {
        if (StudentSocietyDAOContract) {
            try {
                var input=Number(idinput);
                if(Index>=input&&input>0){
                    setindex(input);
                }else{
                    alert("查询失败，请检查")
                }
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }
    function vote(state: boolean){
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }
        const Vote= async () => {

           
            if (StudentSocietyDAOContract&&myERC20Contract) {
                try { 
                    const info =await StudentSocietyDAOContract.methods.getproposalstatus(index).call({
                    from: account
                    })
                    await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, voteAmount).send({
                        from: account
                    })
                    setvotestatus(info[2]);
                    setvoteavailabes(info[4]);
                    if(votestatus&&voteavailabes){
                        await StudentSocietyDAOContract.methods.vote(index,state).send({
                            from: account
                        })
                        alert('vote sucess.')
                        window.location.reload();
                    }else{
                        alert('unable to vote.')
                    }

                } catch (error: any) {
                    alert(error.message)
                }
    
            } else {
                alert('Contract not exists.')
            }
        }
        Vote();
    }
    function claim(){
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }
        const Claim= async () => {
            if (StudentSocietyDAOContract&&myERC20Contract) {
                try {
                    await StudentSocietyDAOContract.methods.ReceiveReward(index).send({
                        from: account
                    })
                    alert('received')

                    window.location.reload();
                } catch (error: any) {
                    alert(error.message)
                }
    
            } else {
                alert('Contract not exists.')
            }
        }
        Claim();
    }
  return (
    <div className="App" >
        <div className="container" >
          <div className="main">
          {airdropclaimed===true?"":<button onClick={onClaimTokenAirdrop}>领取浙大币空投</button>}
            <div className='account'>
                {account === '' && <button onClick={onClickConnectWallet}>连接钱包</button>}
                <div>当前用户：{account === '' ? '无用户连接' : account}</div>
                <div>当前用户拥有浙大币数量：{account === '' ? 0 : accountBalance}</div>
            </div>

            {Index===0 ?
            "":<div>
            <p>最新提议编号：{Index}</p>
            <input type="number" id="index" onChange={e => setinput(e.target.value)} placeholder='请输入提议编号'></input>
            <button onClick={switchproposal}>查询</button></div>}
            {Index===0 ? '':
            <div className="operation">
            <p>提议：{index}</p>
            <p>{name}</p>
            <p>赞成：{agree}</p>
            <p>反对：{disagree}</p>
            {(votestatus===false||voteavailabes===false)? '':
            <div style={{bottom: '50px'}}>
            <p>提议需{voteAmount}币</p>
            <button style={{marginRight: '10px'}} onClick={vote.bind(null,true)}>赞成</button>
            <button style={{marginLeft: '10px'}} onClick={vote.bind(null,false)}>否决</button>
            </div>
            }
            {claimstatus===false? '':
            <div style={{bottom: '50px'}}>
            <button onClick={claim}>领取奖励</button>
            </div>
            }
            </div>
            }
          </div>
          <div style={{bottom: '50px'}}>{
            }
            <input type="text" id="discription"  onChange={e => setproposalname(e.target.value)} placeholder='请输入提议内容'></input><button onClick={sumbitproposal}>提交</button>
            <p>提议需{proposalGenerateAmount}币</p>
          </div>
        </div>
    </div>
  );
}

export default App;
