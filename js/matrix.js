const canvas = document.getElementById('matrix-effect');
const ctx = canvas.getContext('2d');

// set the width and height of the canvas
let w = canvas.width;
let h = canvas.height;

let speed = 140;

// draw a black rectangle of width and height same as that of the canvas
let style = getComputedStyle(document.body)

ctx.fillStyle = style.getPropertyValue('--brand-black');
ctx.fillRect(0, 0, w, h);


const possible_charsets = [
    "EsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzEsporterzByDillonWilson",
]
let glitch_charset = "By Dillon Wilson";

let cols;
let ypos;
let charset;
let offsets;
let glitches;

function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    w = canvas.width;
    h = canvas.height;
    cols = Math.floor(w / 20) + 1;
    ypos = Array(cols).fill(0).map(() => Math.round(Math.random() *100)*20)
    charset = possible_charsets[Math.floor(Math.random()*possible_charsets.length)];
    offsets = Array(cols).fill(0).map(() => Math.round(Math.random() * charset.length));
    glitches = Array(cols).fill(false);
}

function matrix () {
    // Draw a semitransparent black rectangle on top of previous drawing
    ctx.fillStyle = style.getPropertyValue('--brand-black');
    ctx.fillRect(0, 0, w, h);

    // Set color to green and font to 15pt monospace in the drawing context
    ctx.fillStyle = style.getPropertyValue("--brand-blue");
    ctx.font = '15pt monospace';

    // for each column put a random character at the end
    ypos.forEach((y, ind) => {
        let text;
        let alt_text;
        if(glitches[ind]){
            text = glitch_charset[(offsets[ind] + y / 20) % glitch_charset.length];
            alt_text = glitch_charset[(offsets[ind] + 5 + y / 20) % glitch_charset.length];
        }else {
            text = charset[(offsets[ind] + y / 20) % charset.length];
        }
        const x = ind * 20;

        ctx.fillText(text, x, y);
        if(alt_text!=null){
            ctx.fillText(alt_text, x, y);
        }

        if (y > 100 + Math.random() * 10000){
            ypos[ind] = 0;
            if(Math.random()>0.90){
                glitches[ind] = true
            }else{
                glitches[ind] = false;
            }
        }else ypos[ind]+=20;
    });
}

fitToContainer(canvas);
// render the animation at 20 FPS.
setInterval(matrix, speed);
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);