let candidates = [{
  name: "A",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 1,
},
{
  name: "B",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 2,
},
{
  name: "C",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 3,
},
{
  name: "D",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 4,
},
{
  name: "E",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 5,
},
{
  name: "F",
  party: "Brothers Party",
  symbol: "https://static.toiimg.com/thumb/74331975.cms?imgsize=1163752&width=800&height=800",
  id: 6,
},
]


// import CSS. Webpack with deal with it
import "../css/style.css"
import Web3 from 'web3';

// Import libraries we need.
// metamask will no longer inject web3.jsapi , already included

const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    window.web3 = new Web3(window.ethereum);
    return true;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.current.provider);
  } else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
  return false;
}


// ---------- ---------- ---------- event listeners ---------- --------------------//

window.addEventListener("DOMContentLoaded", async function () {
  await ethEnabled();
  alert("eth enabled");
  await loadBlockchainData();
  alert("load blockchain data");
  await showCandidates();
  alert("loaded candidates");

});

const loadBlockchainData = async () => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
}


const sectionCenter = document.querySelector(".section-center");

// ---------- functions -----------\\

//show all the candidates on the screen
const showCandidates = async () => {
  let displayCandidate = candidates.map(function (candidate) {
    return `<article class="menu-item">
          <img src="${candidate.symbol}" alt="" class="photo" />
          <div class="item-info">
            <header>
              <h4>${candidate.name}</h4>
              <h4 class="price">${candidate.id} </h4>
            </header>
            <p class="item-text">
              ${candidate.party}
            </p>
          </div>
        </article>`
  });

  displayCandidate = displayCandidate.join("");
  sectionCenter.innerHTML = displayCandidate;
  // alert("candidates loaded");





  function registerVote() {
    let candidateId = document.getElementById("candidate-id").value;
    let voterId = document.getElementById("voter-id").value;
    console.log(voterId);
    console.log(candidateId);


    if (voterId.length < 4) {
      alert("Please enter a voter-id of length atleast 4 characters");
      return;
    }
    if (candidateId === "") {
      alert("Please vote a candidate!");
      return;
    } else {

      VotingContract.deployed().then(function (instance) {
        instance.vote(voterId, candidateId).then(function (result) {
          console.log("Vote successful!");


          //Tell the user that the vote is successful
        })
      }).catch(function (err) {
        console.error("ERROR! " + err.message)
      });
    }
  }


}