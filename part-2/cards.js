const base_URL = "https://deckofcardsapi.com/api/deck"

//1
async function newDeck(){
    let response = await axios.get(`${base_URL}/new/draw/?count=1`)
    const { suit, value } = response.data.cards[0]
    console.log(`${value} of ${suit}`)
}

newDeck()

//2

async function getACard(){
    let first_card = await axios.get(`${base_URL}/new/draw/?count=1`);
    let deck_id = first_card.data.deck_id;
    let second_card = await axios.get(`${base_URL}/${deck_id}/draw/?count=1`);
    
    [first_card,second_card].forEach(function(card){
        let { suit, value } = card.data.cards[0];
        console.log(`${value} of ${suit}`)
    });

}
getACard()

//3
$(document).ready(async function(){
    let res = await axios.get(`${base_URL}/new/shuffle/?deck_count=1`)
    deck_id = res.data.deck_id
    $(".btn").show()
})

$("#add-card").on("click", async function getCards(){
    axios.get(`${base_URL}/${deck_id}/draw/?count=1`).then(function(res){
        let rotation = Math.floor(Math.random() * 50) + 1
        $("#card-container").append(`<img src="${res.data.cards[0].image}">`).css("transform", `rotate(${rotation}deg)`)
        if(res.data.remaining == 0){
            $("#add-card").hide()
        }
    })
})

