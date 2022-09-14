import {searchAllCards} from "../magic-api/read-card-data";
const cardResultTemplate = document.querySelector("[card-result-template]")



async function returnResults () {
    // const xhttp = new XMLHttpRequest();
    //
    // xhttp.open("GET", "http://localhost:3000/cards", false);
    // xhttp.send();

    const cards: any = await searchAllCards('dwell');
    console.log(`${cards.length} results found:`)
    cards.forEach((card: any) => {
        console.log(`${card.set} # ${card.collector_number} - ${card.name}`);
    });
    for (let card of cards) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${card.name} ${card.mana_cost}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${card.type_line}</h6>

                        <div>Oracle Text: ${card.oracle_text}</div>
                        <div>Power/Toughness: ${card.power}/${card.toughness}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('card-results').innerHTML += x;
    }
}
//
// returnResults();