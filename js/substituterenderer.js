import { updateLoginInfo } from "./helpers.js";
import { employee } from "./main.js";

export class Substituterenderer {
  constructor() {
    this.substitute = null; // Property to store the current substitute
}

    render(substitute) {
      this.substitute = substitute;
        const formattedDateOfBirth = formatShiftDate(substitute.DateOfBirth);
        let html = `
        <h1>Personlige Oplysninger</h1>
        <table class="substitute-table" data-substitute-id="${substitute.EmployeeID}">
          <tr>
            <td>Navn: </td>
            <td>${substitute.FirstName} ${substitute.LastName}</td>
          </tr>
          <tr>
            <td>Fødselsdato: </td>
            <td>${formattedDateOfBirth}</td>
          </tr>
          <tr>
            <td>E-Mail:</td>
            <td>${substitute.Mail}</td>
          </tr>
          <tr>
            <td>Telefon: </td>
            <td>${substitute.Number}</td>
          </tr>
        </table>
        
        <h1>Login Oplysninger</h1>
        <table class="substitute-table" data-substitute-id="${substitute.EmployeeID}">
          <tr>
            <td>Brugernavn: </td>
            <td>${substitute.Username} <button class="editLoginInfo-btn" data-username="${substitute.Username}">Rediger</button></td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>${substitute.PasswordHash} <button class="editLoginInfo-btn" data-username="${substitute.Username}">Rediger</button></td>
          </tr>
        </table>      `;
      return html;
    }

    
    attachEventListener() {
      document.querySelectorAll(".editLoginInfo-btn").forEach(button => {
          button.addEventListener("click", function () {
              // 'this' refers to the button that was clicked
              const username = this.dataset.username;
              document.querySelector("#edit-username").value = username;
              document.querySelector("#editLoginInfo-dialog").showModal();
          });
      });

      document.querySelector("#confirm-new-login-info").addEventListener("click", async function(event) {
        event.preventDefault();
        const username = document.querySelector("#edit-username").value;
        const password = document.querySelector("#edit-password").value;
        const confirmPassword = document.querySelector("#confirm-new-password").value;
        const EmployeeID = employee.EmployeeID;
        if (password !== confirmPassword) {
            alert("Passwords stemmer ikke overens");
            return;
        }
      
        await updateLoginInfo(username, password, EmployeeID);
      
        document.querySelector("#editLoginInfo-dialog").close();
      });
  }

  editLoginInfo() {
      // Check if 'this.substitute' is not null before accessing its properties
      if (this.substitute) {
          const username = this.substitute.Username;
          document.querySelector("#edit-username").value = username;
          document.querySelector("#editLoginInfo-dialog").showModal();
      }
 }

}

function formatShiftDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}
