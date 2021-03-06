const CryptoJS =require("crypto-js");

//블록 생성
class Block{
    constructor(index,hash,previousHash,timetamp,data){
        this.index=index;
        this.hash=hash;
        this.previousHash=previousHash;
        this.timetamp=timetamp;
        this.data=data;
    }
}
//초기 genesisBlock 생성
const genesisBlock =new Block(
    0,
    "A0F30C8F585E0F12E1220D89A89FD585176075CB75EF4088162A7DCD70545C75",
    null,
    1520312194926,
    "this is the genesis!!"
);

let blockchain =[genesisBlock];
// function getLastBlock(){
//     return blockchain[blockchain.length-1];
// }
const getLastBlock=()=>blockchain[blockchain.length-1];

const getTimestamp=()=> new Date().getTime() /1000;

const getBlockChain=()=>block;

const createHash=(index,previousHash,timetamp,data)=>
    CryptoJS.SHA256(index+previousHash+timetamp+JSON.stringify(data)).toString();

const createNewBlock =data =>{
    const previousHash =getLastBlock();
    const newBlockIndex = previousBlock.index+1;
    const newTimestamp = getTimestamp()
    const newHash = createHash(
        newBlockIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock =new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    )
    return newBlock;
};

//hash 검사

const getBlocksHash = Block=>
    createHash(block.index,block.previousHash,block.timetamp,block.data);

const isNewBlockValid =(candidateBlock, latestBlock)=>{
    if(latestBlock.index+1 !== candidateBlock.index){
        console.log("The candidate block doesnt have a valid index ");
        return false;
    }else if(latestBlock.hash!==candidateBlock.previousHash){
        console.log(
            "The previousHash of the candidate block is not the hash of the latest block"
        );
        return false;
    }else if (getBlocksHash(candidateBlock) !== candidateBlock.hash){
        console.log("the hash of this block is invalid");
        return false;
    }
    return true;
};

const isNewStructureValid = block =>{
    return(
        typeof block.index ==="number"&&
        typeof block.hash ==="string"&&
        typeof block.previousHash ==="string" &&
        typeof block.timetamp ==="number" &&
        typeof block.data === "string"
    );
};

const isChainValid =(candidateChain) =>{
    const isGenesisValid = block =>{
     return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if(!isGenesisValid(candidateChain[0])){
        console.log("The candidateChains's genesisBlock is not the same as our genesis"
        );
    return false;    
    }
    for (let i=1; i < candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i],candidateChain[i-1])){
            return false;
        }
    }
    return true;
};

const replaceChain =newChain =>{
    if (isChainValid(newChain)&& newChain.length > getBlockChain().length){
        blockchain =newChain;
        return true;
    } else{
        return false;
    }
};

const addBlockToChain = candidateBlock =>{
    if(isNewBlockValid(candidateBlock,getLastBlock())){
        getBlockChain().push(candidateBlock);
        return true;
    } else {
        return false;
    }
}



