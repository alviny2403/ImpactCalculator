let dropData = { Field: {} };

const salaryData = {};

async function fetchSheetData() {
    const sheetId = 'placeholder';
    const apiKey = 'placeholder';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const rows = data.values;

        for (let i = 1; i < rows.length; i++) {
            const task = rows[i][0];
            const salary = parseFloat(rows[i][1]);
            dropData.Field[task] = salary;
        }

        populateDropdowns(rows);
    } catch (err) {
        console.error("Failed to load data from Google Sheets", err);
    }
}

function populateDropdowns(rows) {
  const fieldSelect = document.getElementById("field");

  rows.slice(1).forEach(row => {
    const label = row[0];
    const salary = parseFloat(row[1]);

    if (label && !isNaN(salary)) {
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
      fieldSelect.appendChild(option);

      salaryData[label] = salary / 2000; // hourly approximation
    }
  });
}

window.addEventListener("DOMContentLoaded", fetchSheetData);

let lengthSelect = ["a day", "a week", "a month"];

document.addEventListener("DOMContentLoaded", function() {
    const fieldSelect = document.getElementById("field");
    const levelSelect = document.getElementById("level");

    for (let field in dropData["Field"]) {
        let option = document.createElement("option");
        option.value = field;
        option.text = field;
        fieldSelect.add(option);
    }

    for (let i=0; i<lengthSelect.length; i++){
        let option = document.createElement("option");
        option.value = i; 
        option.text = lengthSelect[i];
        levelSelect.add(option);
    }

});

let costPerCharity = 1500; // default fallback

function fetchSheetData() {
  const sheetId = 'placeholder';
  const apiKey = 'placeholder';
  const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;


  fetch(SHEET_URL)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      if (!rows || !rows[1] || !rows[1][3]) {
        console.warn("D2 missing, using fallback of $1500");
      } else {
        costPerCharity = parseFloat(rows[1][3]);
        if (isNaN(costPerCharity)) {
          costPerCharity = 1500;
          console.warn("D2 is not a number, fallback to $1500");
        }
      }

      populateDropdowns(rows);
    })
    .catch(err => {
      console.error("Failed to load sheet", err);
    });
}
