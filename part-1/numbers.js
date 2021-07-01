const base_URL = "http://numbersapi.com"
const fave_num = 8
//1
async function getFavNumFact(){
   let resp = await axios.get(`${base_URL}/${fave_num}`)
   console.log(resp)
}

getFavNumFact()

//2
async function getFacts(){
    const nums = [5,6,7,8]
    for(num of nums){
        let resp = await axios.get(`${base_URL}/${num}`)
        $("body").append(`<p>${resp.data}</p>`)
    }
}

getFacts()

//3

async function getFavFacts(){
   let facts = await Promise.all([
    axios.get(`${base_URL}/${fave_num}`),
    axios.get(`${base_URL}/${fave_num}`),
    axios.get(`${base_URL}/${fave_num}`),
    axios.get(`${base_URL}/${fave_num}`)
   ])
   for (fact of facts){
    $("body").append(`<p>${fact.data}</p>`)
   }
}

getFavFacts()