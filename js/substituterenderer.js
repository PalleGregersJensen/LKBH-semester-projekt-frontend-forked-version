export class Substituterenderer {
    render(substitute) {
      let html = `
        <h1>Personlige Oplysninger</h1>
        <table class="substitute-table" data-substitute-id="${substitute.EmployeeID}">
          <tr>
            <td>Navn: </td>
            <td>${substitute.FirstName} ${substitute.LastName}</td>
          </tr>
          <tr>
            <td>Fødselsdato: </td>
            <td>${substitute.DateOfBirth}</td>
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
            <td>${substitute.Username}</td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>${substitute.PasswordHash}</td>
          </tr>
        </table>
      `;
      return html;
    }
}
