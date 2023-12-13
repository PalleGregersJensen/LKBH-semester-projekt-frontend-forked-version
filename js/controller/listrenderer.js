export class ListRenderer {
    constructor(list, container, itemRenderer, buttonID1, buttonID2) {
        this.items = list;
        this.container = document.querySelector(container);
        this.itemRenderer = itemRenderer;
        this.buttonID1 = buttonID1;
        this.buttonID2 = buttonID2;
        this.filteredItems = []; // Initialize filteredItems array
    }

    render() {
        this.container.innerHTML = "";
        const filteredList = this.items.filter((item) => this.filterValue === "all" || item[this.filterProperty] == this.filterValue);
        for (const item of filteredList) {
            const html = this.itemRenderer.render(item);
            this.container.insertAdjacentHTML("beforeend", html);

            if (this.itemRenderer.postRenderer) {
                const element = this.container.lastElementChild;
                const button1 = element.querySelector(this.buttonID1);
                const button2 = element.querySelector(this.buttonID2);
                this.itemRenderer.postRenderer(item, button1, button2);
            }
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
                if (valueA > valueB) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (valueA < valueB) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

        this.render();
    }

    filter(filterProperty, filterValue) {
        if (filterProperty.includes(":") && filterValue === undefined) {
            [this.filterProperty, this.filterValue] = filterProperty.split(":");
        } else {
            this.filterProperty = filterProperty;
            this.filterValue = filterValue;
        }

        this.render();
    }

    applyFilter(item) {
        // Check if the item matches the filter criteria
        if (this.filterProperty === "monthFilter") {
            const month = new Date(item.date).getMonth() + 1; // Months are 0-indexed, so we add 1
            return String(month) === this.filterValue;
        } else {
            // For other filter criteria, you can add additional conditions as needed
            // For example, you might want to compare strings or numbers
            return String(item[this.filterProperty]) === this.filterValue;
        }
    }

    extractSortValue(item, sortBy) {
        // Extract the value based on the sortBy parameter
        if (sortBy === "date") {
            return new Date(item.date);
        } else if (sortBy === "shiftStart") {
            return this.convertToMinutes(item.shiftStart);
        } else if (sortBy === "timeDK") {
            return new Date(item.timeDK);
        } else {
            // Default to sorting by the property key
            return item[sortBy];
        }
    }

    convertToMinutes(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }
}
