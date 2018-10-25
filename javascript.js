window.onload = ()=>{
    let toggleRulesPanel = document.getElementById("rules-button"),
         playButton = document.getElementById("play-button"),
         sendAnswerButton = document.getElementById("send-answer"),
         displayNumber = document.getElementById("number"),
         userAnswer = document.getElementById("input-answer"),
         interval;

        toggleRulesPanel.addEventListener("click", toggleRules);
        playButton.addEventListener("click", startGame);
        sendAnswerButton.addEventListener("click", checkAnswer);
    
    function startGame(){
        playButton.style.display = "none";
        document.querySelector("form").style.display = "block";
        displayNumber.innerText = Math.round(Math.random() * 100);
        temp();
    }
    function checkAnswer(){
        event.preventDefault();
        let answer = (userAnswer.value).toLowerCase(), 
            number = Number(displayNumber.innerText);
        if ((number + 1 === Number(answer) && (number + 1) % 3 !== 0 && (number + 1) % 5 !== 0)
            || ((number + 1) % 3 == 0 && (number + 1) % 5 == 0 && answer === "fizzbuzz")
            || ((number + 1) % 3 === 0 && answer == "fizz" && (number + 1) % 5 !== 0)
            || ((number + 1) % 5 === 0 && answer == "buzz" && (number + 1) % 3 !== 0))
        {
            addPoints();
            displayNumber.innerText = Math.round(Math.random() * 100);
            userAnswer.style.borderColor = "black";
            userAnswer.value = "";
            temp();
        }else{
            wrongAnswer();
        }
    }
    function addPoints(){
        let points = document.getElementById("points-counter");
        points.innerText = Number(points.innerText) + 1;
        points.style.color = "#4C835B";
    }
    function wrongAnswer(){
        userAnswer.style.outline = "none";
        userAnswer.style.borderColor = "red";
    }
    function temp(){
        let time = document.getElementById("time"), 
            startingTime = Date.now();
            clearInterval(interval);
        interval = setInterval(()=>{
            time.innerHTML = 6 - Math.floor((Date.now() - startingTime) / 1000);
            if(Number(time.innerHTML) == 0) endGame();
        }, 1000);
    }
    function endGame(){
        let endGameContainer = document.body.appendChild(document.createElement("div")),
            playAgain,
            goToPortfolio;
        clearInterval(interval);
        endGameContainer.classList = "end-message";
        endGameContainer.appendChild(document.createElement("p")).innerText = "STOP!";
        endGameContainer.appendChild(document.createElement("p")).innerText = "Total score: " + document.getElementById("points-counter").innerText;
        playAgain = endGameContainer.appendChild(document.createElement("a"));
        playAgain.href = "http://127.0.0.1:5500/index.html";
        playAgain.innerText = "Play Again";
        playAgain.classList = "end-message-links";
        goToPortfolio = endGameContainer.appendChild(document.createElement("a"));
        goToPortfolio.href = "https://domingoacd.github.io/portfolio";
        goToPortfolio.innerText = "Go to portfolio";
        goToPortfolio.classList = "end-message-links";
    }
    function toggleRules(){
        document.getElementById("rules-tab").classList.toggle("show-rules-tab");
        toggleRulesPanel.innerText.toLocaleLowerCase() == "rules" ? toggleRulesPanel.innerText = "Close" : toggleRulesPanel.innerText = "Rules";
    }

}