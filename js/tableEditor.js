class tableEditor {

    editTable (param) {
        document.querySelectorAll(param + ' thead tr th').forEach(tableTH => tableTH.addEventListener('click', () => this.#getSort(tableTH)));
		document.querySelectorAll(param + ' tbody tr td').forEach(tableTD => this.#editIfDate(tableTD));
    }

    #getSort (target) {
        if (!target.classList.contains('unsortable')) {
            const order = (target.dataset.order = -(target.dataset.order || -1));
			const index = [...target.parentNode.children].indexOf(target);
			
            const collator = new Intl.Collator(['en', 'ru'], { numeric: true });

            const comparator = (index, order) => (a, b) => {
                if (Boolean(a.children[index].dataset.ms)) 
                    return (order * collator.compare(a.children[index].dataset.ms, b.children[index].dataset.ms));
                else 
                    return (order * collator.compare(a.children[index].innerHTML, b.children[index].innerHTML));
            }
            
            for(const tBody of target.closest('table').tBodies)
                tBody.append(...[...tBody.rows].sort(comparator(index, order)));

            for(const cell of target.parentNode.children)
                cell.classList.toggle('sorted', cell === target);
        }
    }

    #editIfDate (target) {
        const regex = new RegExp("^([0-9]{2})\\.([0-1][0-9])\\.([1-2][0-9]{3})$");

		if (target.innerHTML.split('.').length == 3) {
			if(regex.test(target.innerHTML)) {
				let targeted = target.innerHTML;
				const formatter = new Intl.DateTimeFormat("ru", {
					year: "numeric",
					month: "long", //long numeric
					day: "numeric"
				});
				
				targeted = targeted.split('.')[2] + '-' + targeted.split('.')[1] + '-' + targeted.split('.')[0];
				
				try {
					target.dataset.ms = Date.parse(targeted);
					target.innerHTML = formatter.format(target.dataset.ms);
				} catch (error) {
					console.log(error);
					target.innerHTML = 'error';
				}
			} else 
					target.innerHTML = 'error';
		}
    }

    init({root, headers}) {
		this.table_root = document.querySelector(root);
		this.headers = headers;

		this.table = document.createElement("table");
		let thead = document.createElement("thead");
		this.tbody = document.createElement("tbody");

		for (let header of headers) {
			const {key, name, sortable = true} = header;
			let th = document.createElement("th");
			th.innerHTML = name;
			header['element'] = th;
			
			if (!key)  {
				header.type = 'autoincrement';
				th.dataset.index = 0;
			}

			if (!sortable)
                th.classList.toggle('unsortable');
            else
                th.addEventListener('click', () => this.#getSort(th));

			thead.append(th);
		}

		this.table.append(thead);
		this.table.append(this.tbody);

        this.table_root.append(this.table);
        this.table.classList.add('sortable');
		return this;
	}

	createRows(rows) {
		for (let row of rows) {
			let tr = document.createElement("tr");
			
			let row_elements = new Array(this.headers.length);
			for (let i = 0; i < this.headers.length; i++) {
				if (this.headers[i].type == 'autoincrement') {
					row_elements[i] = Number(this.headers[i].element.dataset.index) + 1;
					this.headers[i].element.dataset.index = row_elements[i];
				} else {
					for (let key in row) {
						if (key === this.headers[i].key)
							row_elements[i] = row[key];
					}
				}
			}

			for (let el of row_elements) {
				let td = document.createElement("td");
				if (!el) 
					td.innerHTML = '-';
				else
					td.innerHTML = el;
				tr.append(td);
            }
			this.tbody.append(tr);
		}
	}		
}
