function solve() {
    let url = `http://localhost:3030/jsonstore/bus/schedule/`
    let btnDepart = document.querySelector("#depart")
    let btnArrive = document.querySelector("#arrive")
    let list = []
    let nextStop = 'depot'
    let span = document.querySelector("#info > span")

    async function depart(){
        console.log('departed')
        btnDepart.setAttribute('disabled',true)
        btnArrive.removeAttribute('disabled')
        const request = await fetch(url+nextStop)
        const data = await request.json()
        console.log(data)
        span.textContent = `Next stop ${data.name}`

        }

    async function arrive(){
        console.log('arrived')
        btnArrive.setAttribute('disabled',true)
        btnDepart.removeAttribute('disabled')
        const request = await fetch(url+nextStop)
        const data = await request.json()
        span.textContent = `Arriving at ${data.name}`
        nextStop = data.next
        console.log(data)
    }
    return {
        depart,
        arrive
    };
}

let result = solve();
