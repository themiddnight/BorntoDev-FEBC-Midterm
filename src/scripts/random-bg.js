function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let bgColorTx = `#151515`
let meshStyleTx = `linear-gradient(to bottom, transparent 50%, ${bgColorTx} 100%)`;

for (let i = 0; i < rand(3,5); i++) {
    let randMeshStyle_txt = `,
        radial-gradient(
            at ${rand(0,100)}% ${rand(0,100)}%, 
            hsl(${rand(0,360)}, ${rand(40,80)}%, ${rand(30,50)}%) 0%, 
            transparent ${rand(40,70)}%)`
        meshStyleTx += randMeshStyle_txt
}

let bodyElem = document.querySelector('body')
bodyElem.style.backgroundImage = meshStyleTx
bodyElem.style.backgroundColor = bgColorTx