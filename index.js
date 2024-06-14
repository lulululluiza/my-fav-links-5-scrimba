let links = []
let tab = {
	tabName: "",
	tabUrl: ""
}
const inputEl = document.querySelector("#input")
const saveInputBtn = document.querySelector("#saveInputBtn")
const linksListEl = document.querySelector("#linksList")
const itensLocalStorage = JSON.parse(localStorage.getItem("links"))
const clearSelectedBtn = document.querySelector("#clearSelectedBtn")


if(itensLocalStorage) {
	links = itensLocalStorage

	render()
}


saveInputBtn.addEventListener("click", function() {
	if(inputEl.value) {
		links.push(inputEl.value)
		localStorage.setItem("links", JSON.stringify(links) )
	}
	render()
})


saveTabBtn.addEventListener("click", function() {
	chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
		tab.tabName = tabs[0].title
		tab.tabUrl = tabs[0].url
		links.push(tab)
		localStorage.setItem("links", JSON.stringify(links) )
		render()
	})
})


clearBtn.addEventListener("click", function() {
	localStorage.clear()
	links = []

	render()
})

clearSelectedBtn.addEventListener("click", function() {
	let checkLinkEl = document.querySelectorAll("li input")
	links = []
	for(let item in checkLinkEl) {
		if(checkLinkEl[item].checked === false) {
			let inputAEl = checkLinkEl[item].nextSibling
			if(inputAEl.textContent === inputAEl.href) {
				links.push(inputAEl.href)
			} else {
				tab.tabName = inputAEl.textContent
				tab.tabUrl = inputAEl.href
				links.push(tab)
			}
		}
	}

	localStorage.setItem("links", JSON.stringify(links) )
	render()
})

function render() {
	let aEl = ""
	let liEl = ""
	let checkboxEl = ""
	linksListEl.innerHTML = ""

	for(let item in links) {
		aEl = document.createElement("a")
		liEl = document.createElement("li")
		checkboxEl = document.createElement("input")
		checkboxEl.type = "checkbox"

		if(typeof links[item] === "object") {
			aEl.href = links[item].tabUrl
			aEl.textContent = links[item].tabName
		} else {
			aEl.href = links[item]
			aEl.textContent = links[item]
		}
		aEl.target = "_blank"
		liEl.append(checkboxEl)
		liEl.append(aEl)
		liEl.id = `li${item}`
		linksListEl.append(liEl)
	}

	inputEl.value = ""
}