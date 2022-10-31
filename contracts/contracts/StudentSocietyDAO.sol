// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./MyERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract StudentSocietyDAO {

    // use a event if you want
    event ProposalInitiated(uint32 proposalIndex);

    struct Proposal {
        uint32 index;      // index of this proposal
        address proposer;  // who make this proposal
        uint256 startTime; // proposal start time
        uint256 duration;  // proposal duration
        string name;       // proposal name
        // ...
        // TODO add any member if you want
        uint32 agree;
        uint32 disagree;
        uint32 amount;

    }

    MyERC20 public myERC20; // 彩票相关的代币合约
    mapping(uint32 => Proposal) proposals; // A map from proposal index to proposal
    mapping(uint32 => bool) proposalsgenerated; 
    mapping(address=>mapping(uint32=> bool))voted;
    mapping(uint32 => bool)rewardclaim; 
    // ...
    // TODO add any variables if you want
    uint32 public Index=1;
    uint32 constant public ProposalGenerateAmount=1000;
    uint32 constant public VoteAmount=10;
    uint32 constant public ProposalDuration=10 seconds;
    constructor() {
        myERC20 = new MyERC20("ZJUToken", "ZJUTokenSymbol");
    }
    function generateproposal(string memory proposalname) payable external{
        myERC20.transferFrom(msg.sender, address(this), ProposalGenerateAmount);
        Proposal memory p;
        p.index=Index;
        p.proposer=msg.sender;
        p.startTime=block.timestamp;
        p.duration=ProposalDuration;
        p.name=proposalname;
        p.agree=0;
        p.disagree=0;
        p.amount=ProposalGenerateAmount;
        proposalsgenerated[Index]=true;
        proposals[Index]=p;
        Index++;
    }
    function getindex()view external returns(uint32 index){
        return Index-1;
    }
    function getproposalname(uint32 index)view external returns(string memory name){
        require(proposalsgenerated[index]==true,"proposal hasn't generated");
        return proposals[index].name;
    }
    function getproposalstatus(uint32 index)view external returns(uint32 agree,uint32 disagree,bool voteAvailable,bool ClaimAvailable,bool sendervoted){
        require(proposalsgenerated[index]==true,"proposal hasn't generated");
        agree=proposals[index].agree;
        disagree=proposals[index].disagree;
        if(block.timestamp<(proposals[index].startTime+proposals[index].duration)){
            voteAvailable=true;
        }else{
            voteAvailable=false;
        }
        if(proposals[index].agree>proposals[index].disagree
            &&msg.sender==proposals[index].proposer
            &&proposals[index].amount>0
            &&block.timestamp>(proposals[index].startTime+proposals[index].duration)){
            ClaimAvailable=true;
        }else{
            ClaimAvailable=false;
        }
        sendervoted=!voted[msg.sender][index];
    }
    function vote(uint32 index,bool Vote)payable external{
        require(voted[msg.sender][index]==false&&block.timestamp<(proposals[index].startTime+proposals[index].duration),"vote outdate");
        myERC20.transferFrom(msg.sender, address(this), VoteAmount);
        if(Vote==true){
            proposals[index].agree++;
        }else{
            proposals[index].disagree++;
        }
        proposals[index].amount+=VoteAmount;
        voted[msg.sender][index]=true;
    }
    function ReceiveReward(uint32 index)payable external{
        require(msg.sender==proposals[index].proposer,"isn't the receiver");
        myERC20.transfer(proposals[index].proposer,proposals[index].amount);
        proposals[index].amount=0;
    }
    // ...
    // TODO add any logic if you want
    
}
