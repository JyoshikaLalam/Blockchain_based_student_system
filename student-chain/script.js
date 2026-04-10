document.addEventListener("DOMContentLoaded", function () {

  // ✅ CLEAR LOGS ON FIRST LOAD (only if not initialized)
  if (!localStorage.getItem("initialized")) {
    localStorage.removeItem("logs");
    localStorage.setItem("initialized", "true");
  }

  let credentials = JSON.parse(localStorage.getItem("creds")) || [];
  let logs = JSON.parse(localStorage.getItem("logs")) || [];

  // ✅ SHOW PAGE
  window.showPage = function(id) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.remove("active"));

    let selected = document.getElementById(id);
    if (selected) selected.classList.add("active");
  };

  showPage("home");

  // ✅ BETTER HASH (always unique)
  function generateHash(data) {
    return btoa(data + "_" + Date.now() + "_" + crypto.randomUUID()).substring(0, 25);
  }

  // ✅ ISSUE
  let form = document.getElementById("issueForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let roll = document.getElementById("roll").value;
      let course = document.getElementById("course").value;
      let grade = document.getElementById("grade").value;
      let date = document.getElementById("date").value;

      let hash = generateHash(name + roll + course);

      let cred = {
        name,
        roll,
        course,
        grade,
        date,
        hash,
        verified: false,
        revoked: false,
        timestamp: new Date().toLocaleString()
      };

      credentials.push(cred);

      // ✅ LOG WITH NAME FIXED
      logs.push({
        time: cred.timestamp,
        name: name,   // explicitly use name
        hash: hash,
        action: "Issued"
      });

      localStorage.setItem("creds", JSON.stringify(credentials));
      localStorage.setItem("logs", JSON.stringify(logs));

      document.getElementById("issueResult").innerText = "✅ Hash: " + hash;
      form.reset();

      loadLogs(); // refresh logs instantly
    });
  }

  // ✅ VERIFY (ONLY HASH USED)
  window.verifyCredential = function() {
    let hash = document.getElementById("verifyHash").value.trim();
    let result = document.getElementById("verifyResult");

    let cred = credentials.find(c => c.hash === hash);

    if (!cred) {
      result.innerHTML = "<p class='red'>❌ Invalid Credential ID</p>";
      return;
    }

    if (cred.revoked) {
      result.innerHTML = "<p class='orange'>⚠️ Credential Revoked</p>";
      return;
    }

    if (!cred.verified) {
      result.innerHTML = `
        <p>${cred.name} (${cred.roll})</p>
        <p>${cred.course}</p>
        <button onclick="markVerified('${hash}')">Verify</button>
      `;
    } else {
      result.innerHTML = "<p class='green'>✅ Verified User</p>";
    }
  };

  // ✅ MARK VERIFIED (ONLY HASH)
  window.markVerified = function(hash) {
    let cred = credentials.find(c => c.hash === hash);
    if (!cred) return;

    cred.verified = true;

    logs.push({
      time: new Date().toLocaleString(),
      name: cred.name,
      hash: cred.hash,
      action: "Verified"
    });

    localStorage.setItem("creds", JSON.stringify(credentials));
    localStorage.setItem("logs", JSON.stringify(logs));

    loadLogs();
    verifyCredential();
  };

  // ✅ LOAD LOGS
  function loadLogs() {
    let table = document.getElementById("logTable");
    if (!table) return;

    table.innerHTML = logs.map(log => `
      <tr>
        <td>${log.time}</td>
        <td>${log.name || "N/A"}</td>
        <td>${log.hash}</td>
        <td>${log.action}</td>
      </tr>
    `).join("");
  }

  loadLogs();
});