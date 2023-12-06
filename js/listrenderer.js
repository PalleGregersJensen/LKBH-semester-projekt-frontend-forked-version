export class ListRenderer {
    constructor(list, container, itemRenderer, buttonID1, buttonID2) {
        this.items = list;
        this.container = document.querySelector(container);
        this.itemRenderer = itemRenderer;
        this.buttonID1 = buttonID1;
        this.buttonID2 = buttonID2;
    }

    render() {
        this.container.innerHTML = "";
        for (const item of this.items) {
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

    extractSortValue(item, sortBy) {
        // Extract the value based on the sortBy parameter
        if (sortBy === "date") {
            return new Date(item.Date);
        } else if (sortBy === "shiftStart") {
            return this.convertToMinutes(item.shiftStart);
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
