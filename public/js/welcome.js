let friendy = document.querySelector("#friendy-words")
let friendyCover = document.querySelector(".friendy-cover")



let wordList = ["fiancee", "family", "partners", "comarades", "loved ones", "friends"]

function updateWord(wordList) {

    let n = 0
    var friendInterval = setInterval(() => {
        friendyCover.classList.add('cover')
        setTimeout(() => {

            friendy.querySelector('h3').innerText = wordList[n]
            friendyCover.classList.remove('cover')
            n = n > wordList.length - 2 ? 0 : n + 1
        }, 2000)
    }, 6000)

}

updateWord(wordList)