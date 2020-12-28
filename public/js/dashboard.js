// For the Link Section
let userLinkCont = document.querySelector('#userlink')
let copyLink = document.querySelector('#copyLink')
let userLink = userLinkCont.querySelector('a')
let userName = userLink.innerText
userLink.innerText = `${window.location.origin}/user/${userName}`
userLink.href = `${window.location.origin}/user/${userName}`
// To implement the copy function
copyLink.addEventListener('click', () => {
    let dummy = document.createElement('textarea')
    dummy.innerText = userLink.innerText
    document.body.appendChild(dummy)
    dummy.select()
    dummy.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(dummy)
})

// To open and close messages

let messages = document.querySelectorAll('.messages .message')

messages.forEach(message => {
    let openBtn = message.querySelector('.open-btn')
    openBtn.addEventListener('click', () => {
        if (openBtn.innerText === "Open") {
            closeAll()
            message.classList.remove("close-message")
            openBtn.innerText = "Close"
        } else {
            message.classList.add("close-message")
            openBtn.innerText = "Open"
        }
    })
})

function closeAll() {
    messages.forEach(message => {
        message.classList.add("close-message")
        let openBtn = message.querySelector('.open-btn')
        openBtn.innerText = "Open"
    })
}