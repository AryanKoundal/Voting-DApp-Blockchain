// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

contract voting {
    event AddedCandidate(uint256 candidateID);

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    // function Voting() public {
    //     owner = msg.sender;
    // }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct Voter {
        bytes32 uid;
        uint256 candidateIDvote;
        uint256 voterID;
        bool hasVoted;
        uint256 numOfVotes;
    }

    struct Candidate {
        bytes32 name;
        bytes32 party;
        bool doesExist;
        uint256 candidateID;
        uint256 total_Votes;
    }

    uint256 numCandidates;
    uint256 numVoters;

    mapping(uint256 => Candidate) candidates;
    mapping(uint256 => Voter) voters;
    mapping(bytes32 => Voter) people;

    function vote(bytes32 uid, uint256 candidateID) public {
        if (people[uid].hasVoted == true) {
            return;
        }
        if (candidates[candidateID].doesExist == true) {
            uint256 voterID = numVoters++;
            voters[voterID] = Voter(uid, candidateID, voterID, true, voterID);
        }
    }

    function addCandidate(bytes32 name, bytes32 party) public onlyOwner {
        uint256 candidateID = numCandidates++;
        uint256 votes = 0;
        candidates[candidateID] = Candidate(
            name,
            party,
            true,
            candidateID,
            votes
        );
        emit AddedCandidate(candidateID);
    }

    function numOfVotes(uint256 candidateID) public view returns (uint256) {
        if (candidates[candidateID].doesExist == true) {
            return candidates[candidateID].total_Votes;
        }
    }

    function getNumOfCandidates() public view returns (uint256) {
        return numCandidates;
    }

    function getNumOfVoters() public view returns (uint256) {
        return numVoters;
    }

    function getCandidate(uint256 candidateID)
        public
        view
        returns (
            uint256,
            bytes32,
            bytes32,
            uint256
        )
    {
        return (
            candidateID,
            candidates[candidateID].name,
            candidates[candidateID].party,
            candidates[candidateID].total_Votes
        );
    }
}
