export class MyShiftsRenderer {
    render(shift) {
      const html = /*html*/`
        <tr>
          <td>${shift.date}</td>
          <td>${shift.shiftStart} - ${shift.shiftEnd}</td>
          <td>${shift.shiftLength.hours} timer og ${shift.shiftLength.minutes} minutter.</td>
        </tr>`;
  
      return html;
    }
  }   
