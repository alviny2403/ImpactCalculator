document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myRangeTalent").max = 8;
  document.getElementById("talentHoursInput").max = 8;



  const rangeTalent = document.getElementById("myRangeTalent");
  const inputTalent = document.getElementById("talentHoursInput");
  const rangeTreasure = document.getElementById("myRangeTreasure");
  const inputTreasure = document.getElementById("treasureAmountInput");
  const fieldSelect = document.getElementById("field");
  const levelSelect = document.getElementById("level");

  // Talent syncing
  rangeTalent.addEventListener("input", () => {
    inputTalent.value = rangeTalent.value;
    calcImpactTalent();
  });
  inputTalent.addEventListener("input", () => {
    rangeTalent.value = inputTalent.value;
    calcImpactTalent();
  });
  fieldSelect.addEventListener("change", calcImpactTalent);
  levelSelect.addEventListener("change", calcImpactTalent);

  // Treasure syncing
  rangeTreasure.addEventListener("input", () => {
    inputTreasure.value = rangeTreasure.value;
    calcImpactTreasure();
  });
  inputTreasure.addEventListener("input", () => {
    rangeTreasure.value = inputTreasure.value;
    calcImpactTreasure();
  });
});

function calcImpactTreasure() {
  const amount = parseFloat(document.getElementById("treasureAmountInput").value);
  const output = document.getElementById("treasureImpact");

  if (isNaN(amount) || !costPerCharity || costPerCharity <= 0) {
    output.innerText = '';
    return;
  }

  const supported = amount / costPerCharity;
  output.innerHTML = `You will be supporting the equivalent of <span class="badge-number">${supported.toFixed(2)}</span> charities with their digital goals.`;
}


function calcImpactTalent() {
  const hours = parseFloat(document.getElementById("talentHoursInput").value);
  const field = document.getElementById("field").value;
  const level = document.getElementById("level").value;
  const output = document.getElementById("talentImpact");

  console.log(level);

  if (!field || !level || isNaN(hours)) {
    output.innerText = '';
    return;
  }

  const hourly = salaryData[field]; // assuming populated in dropMenu.js
  if (!hourly) {
    output.innerText = '';
    return;
  }

  let multiplier = 1;
  if (level == 0) multiplier = 1;
  else if (level == 1) multiplier = 7;
  else if (level == 2) multiplier = 30;

  const total = hours * hourly * multiplier;
  output.innerHTML = `You will be donating <span class="badge-number">$${total.toFixed(2)}</span> worth of time.`;
  
}




function selectTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content .content");

  tabs.forEach(tab => tab.classList.remove("active"));
  contents.forEach(content => content.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  document.querySelector(`.tab-menu button[onclick="selectTab('${tabId}')"]`).classList.add("active");
}
