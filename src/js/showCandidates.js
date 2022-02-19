import "../css/style.css"
import { candidates } from "./candidatesdata";

const sectionCenter = document.querySelector(".section-center");

// ---------- functions -----------\\

//show all the candidates on the screen
function showCandidates() {
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
}

showCandidates();