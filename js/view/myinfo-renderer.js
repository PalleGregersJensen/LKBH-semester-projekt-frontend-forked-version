export class MyInfoRenderer {
    render(substitute) {
        let html = /*html*/ `
              <h1>Personlige Oplysninger</h1>
              <table class="substitute-table">
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
              <table class="substitute-table">
                <tr>
                  <td>Brugernavn: </td>
                  <td>${substitute.userName} <button id="edit-myinfo-btn1">Rediger</button></td>
                </tr>
                <tr>
                  <td>Password: </td>
                  <td>${substitute.passwordHash} <button id="edit-myinfo-btn2">Rediger</button></td>
                </tr>
              </table>
          `;
        return html;
    }

    postRenderer(substitute, button1, button2) {
        button1.addEventListener("click", () => {
            const form = document.querySelector("#form-editLoginInfo-dialog");

            form.userID.value = substitute.id;
            form.editUsername.value = substitute.userName;

            document.querySelector("#editLoginInfo-dialog").showModal();
        });

        button2.addEventListener("click", () => {
            const form = document.querySelector("#form-editLoginInfo-dialog");

            form.userID.value = substitute.id;
            form.editUsername.value = substitute.userName;

            document.querySelector("#editLoginInfo-dialog").showModal();
        });
    }
}
