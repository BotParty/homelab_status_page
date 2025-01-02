import Multiplex from "./Multiplex";
export default function wiki_game() {
const inputElement = document.querySelector('textarea');
    
if (!inputElement) {
    console.error('Input element not found');
}

inputElement.addEventListener('input', (e) => {
    console.log('Input value:', e.target.value);
    const multiplexCanvas = document.querySelector('.multiplex-canvas');
    
    if (!multiplexCanvas) {
        console.error('Multiplex canvas not found');
        return;
    }

    const app = Multiplex(multiplexCanvas);
    app.init(e.target.value);
});
console.log(inputElement);
}