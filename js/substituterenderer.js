export class Substituterenderer {
    render(substitute) {
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
            <td>${substitute.Username} <button id="editLoginInfo-btn">Rediger</button></td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>${substitute.PasswordHash} <button id="editLoginInfo-btn">Rediger</button></td>
          </tr>
        </table>
      `;
        return html;
    }
}

function formatShiftDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}
