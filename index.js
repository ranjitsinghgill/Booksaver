let myWebsites= []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myWebsites") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myWebsites = leadsFromLocalStorage
    render(myWebsites)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myWebsites.push(tabs[0].url)
        localStorage.setItem("myWebsites", JSON.stringify(myWebsites) )
        render(myWebsites)
    })
})

function render(sites) {
    let listItems = ""
    for (let i = 0; i < sites.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${sites[i]}'>
                    ${sites[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myWebsites = []
    render(myWebsites)
})

inputBtn.addEventListener("click", function() {
    myWebsites.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myWebsites", JSON.stringify(myWebsites) )
    render(myWebsites)
})