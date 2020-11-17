btn1.onclick = function () {
	sort(this, 0);
}

btn2.onclick = function () {
	sort(this, 1);
}

btn3.onclick = function () {
	sort(this, 2);
}

const sort = function (btn, row) {
	let sortedRows;
	let sorted = Boolean(btn.innerHTML.indexOf("▲")+1);
	if (!sorted) {
		sortedRows = Array.from(tbl1.tBodies[0].rows).sort(function (a, b) {
			if (isNaN(parseInt(a.cells[row].innerHTML)))
				return a.cells[row].innerHTML > b.cells[row].innerHTML ? 1 : -1;
			else 
				return a.cells[row].innerHTML - b.cells[row].innerHTML;
		});
	} else {
		sortedRows = Array.from(tbl1.tBodies[0].rows).sort(function (b, a) {
		if (isNaN(parseInt(a.cells[row].innerHTML)))
			return a.cells[row].innerHTML > b.cells[row].innerHTML ? 1 : -1;
		else 
			return a.cells[row].innerHTML - b.cells[row].innerHTML;
		});
	}
	tbl1.tBodies[0].append(...sortedRows);

	btn1.innerHTML = "№";
	btn2.innerHTML = "Название";
	btn3.innerHTML = "Цена";

	if (!sorted)
		btn.innerHTML += " " + "▲";
	else
		btn.innerHTML += " " + "▼";
}