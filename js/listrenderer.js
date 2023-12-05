import { calculateTimeDifference, formatShiftDate, convertTo24HourFormat } from "./myshiftsrenderer.js";

export class ListRenderer {
    constructor(list, container, itemRenderer) {
      this.items = list;
      this.container = document.querySelector(container);
      this.itemRenderer = itemRenderer;
    }
  
    render() {
      this.container.innerHTML = "";
      for (const item of this.items) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    }
  
    sort(sortBy, sortDir) {
      if (sortDir) {
        this.sortDir = sortDir;
      } else if (sortBy === this.sortBy) {
        if (this.sortDir === "asc") {
          this.sortDir = "desc";
        } else {
          this.sortDir = "asc";
        }
      } else {
        this.sortDir = "asc";
      }
      this.sortBy = sortBy;
      this.items.sort((a, b) => {
          const valueA = this.extractSortValue(a, sortBy);
          const valueB = this.extractSortValue(b, sortBy);

          if (this.sortDir === "asc") {
              if(valueA > valueB){
                return 1;
              }else{return -1;}
              
          } else {
              if(valueA < valueB){
                return 1;
              } else {return -1;
              }}
          });

      this.render();
  }

  extractSortValue(item, sortBy) {
    // Extract the value based on the sortBy parameter
    if (sortBy === 'formattedDate') {
        return new Date(item.Date);
    } else if (sortBy === 'convertedShiftStart') {
        return this.convertToMinutes(convertTo24HourFormat(item.ShiftStart));
    } else if (sortBy === 'timeDifference') {
        const timeDiff = calculateTimeDifference(item.ShiftStart, item.ShiftEnd);
        return timeDiff.hours * 60 + timeDiff.minutes; // Convert time difference to total minutes
    } else {
        // Default to sorting by the property key
        return item[sortBy];
    }
}


convertToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}
}