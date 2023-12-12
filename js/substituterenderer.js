import { updateLoginInfo } from "./helpers.js";
import { employee, loginAsAdmin, loginAsSubstitute } from "./main.js";
import { initViews, viewChange } from "./view-router.js";

export class Substituterenderer {
  constructor() {
    this.substitute = null; // Property to store the current substitute
}

    render(substitute) {
      this.substitute = substitute;
      let html = `
        <h1>Personlige Oplysninger</h1>
        <table class="substitute-table" data-substitute-id="${substitute.id}">
          <tr>
            <td>Navn: </td>
            <td>${substitute.firstName} ${substitute.lastName}</td>
          </tr>
          <tr>
            <td>Fødselsdato: </td>
            <td>${substitute.dateOfBirth}</td>
          </tr>
          <tr>
            <td>E-Mail:</td>
            <td>${substitute.mail}</td>
          </tr>
          <tr>
            <td>Telefon: </td>
            <td>${substitute.number}</td>
          </tr>
        </table>
        
        <h1>Login Oplysninger</h1>
        <table class="substitute-table" data-substitute-id="${substitute.id}">
          <tr>
            <td>Brugernavn: </td>
            <td>${substitute.userName} <button class="editLoginInfo-btn" data-username="${substitute.userName}">Rediger</button></td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>${substitute.passwordHash} <button class="editLoginInfo-btn" data-username="${substitute.userName}">Rediger</button></td>
          </tr>
        </table>      `;
      return html;
    }

    
    attachEventListener(employee) {
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
        const EmployeeID = employee.id;
        if (password !== confirmPassword) {
          document.querySelector("#not-matching-passwords").showModal();  
          return;          
        }
        // console.log(EmployeeID);
        await updateLoginInfo(username, password, EmployeeID);
        viewChange();
      
        document.querySelector("#editLoginInfo-dialog").close();
      });
  }

  editLoginInfo() {
      // Check if 'this.substitute' is not null before accessing its properties
      if (this.substitute) {
          const username = this.substitute.username;
          document.querySelector("#edit-username").value = username;
          document.querySelector("#editLoginInfo-dialog").showModal();
      }
 }

}






