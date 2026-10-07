javascript
function calculateModulo() {

    let stream = document.getElementById("stream").value;
    let character = document.getElementById("character").value;
    let k = parseInt(document.getElementById("modulo").value);

    if (stream === "" || character === "" || isNaN(k) || k <= 0) {
        if (character.length !== 1) {
    document.getElementById("result").innerHTML =
        "Please enter exactly one character to count.";
    return;
}
        document.getElementById("result").innerHTML =
            "Please enter all values correctly.";
        return;
    }

    let state = 0;
    let steps = "";
    let count = 0;

    for (let i = 0; i < stream.length; i++) {

        if (stream[i] === character) {
    count++;
    state = count % k;
}

        steps += `Input: ${stream[i]} -> State: q${state}<br>`;
    }

    document.getElementById("result").innerHTML =
    `<b>Character Count: ${count}</b><br>
     <b>Modulo (k): ${k}</b><br>
     <b>Final State: q${state}</b><br>
     <b>Remainder: ${state}</b>
     <hr>
     ${steps}`;

    createDFA(k, state, character);
}


function createDFA(k, finalState, character) {

    let diagram = document.getElementById("dfaDiagram");

    diagram.innerHTML = "";

    for (let i = 0; i < k; i++) {

        let state = document.createElement("div");

        state.className = "state";

        if (i === finalState) {
            state.style.background = "#22c55e";
            state.style.color = "white";
        }

        state.innerHTML = `q${i}<br>
        <small>Remainder ${i}</small>`;

        diagram.appendChild(state);

        if (i < k - 1) {

            let arrow = document.createElement("div");

            arrow.className = "arrow";

            arrow.innerHTML = "->";

            diagram.appendChild(arrow);
        }
    }

    let arrow = document.createElement("div");

    arrow.className = "arrow";

    arrow.innerHTML = "-> q0";

    diagram.appendChild(arrow);


    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < k; i++) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>q${i}</td>
            <td>${character}</td>
            <td>q${(i + 1) % k}</td>
        `;

        tableBody.appendChild(row);
    }
    let transitionInfo = document.getElementById("transitionInfo");

transitionInfo.innerHTML = `
    <b>Selected Character (${character})</b><br>
    q(i) -> q((i + 1) mod ${k})
    <br><br>
    <b>Other Characters</b><br>
    q(i) -> q(i)
`;
}


function simulateDFA() {

    let stream = document.getElementById("stream").value;
    let character = document.getElementById("character").value;
    let k = parseInt(document.getElementById("modulo").value);

    if (stream === "" || character === "" || isNaN(k) || k <= 0) {
        if (character.length !== 1) {
    document.getElementById("result").innerHTML =
        "Please enter exactly one character to count.";
    return;
}
        document.getElementById("result").innerHTML =
            "Please enter all values correctly.";
        return;
    }

    let state = 0;
    let i = 0;
    let output = "";

    let timer = setInterval(function () {

        if (i >= stream.length) {

            clearInterval(timer);

            output += `
                <br>
                <b>Simulation Complete!</b>
                <br>
                Final State: q${state}
                <br>
                Remainder: ${state}
            `;

            document.getElementById("result").innerHTML = output;

            return;
        }

        let currentChar = stream[i];

        if (currentChar === character) {
            state = (state + 1) % k;
        }

        output += `
            <div>
                <b>Step ${i + 1}</b>
                - Input: ${currentChar}
                - State: q${state}
            </div>
        `;

        document.getElementById("result").innerHTML = output;

        i++;

    }, 1000);
}
function resetApp() {

    document.getElementById("stream").value = "";
    document.getElementById("character").value = "";
    document.getElementById("modulo").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("dfaDiagram").innerHTML = "";

    document.getElementById("tableBody").innerHTML = "";
}