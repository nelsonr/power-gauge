const gameEl = document.querySelector("#game");
const meterEl = gameEl.querySelector(".meter");
const targetEl = gameEl.querySelector(".target");

let power = 0.5;
let target = 0.65;
let hit = false;

let prevTime = 0;
let interval = 1000 / 60;
let hitFrames = 8;

function onClick () {
    if (!hit) {
        power = power + 0.15;
        power = power >= 1.0 ? 1.0 : power;
        power = power > target ? target + 0.01 : power;
    }
}

function update (dt) {
    if (power > target) {
        hit = true;
    }

    if (hit && hitFrames > 0) {
        hitFrames--;

        if (hitFrames === 0) {
            target = -1.0;
        }
    } else {
        power = power - ((1.8 - power) * 0.01);
        power = power <= 0.0 ? 0.0 : power;

        if (hit && power <= 0.40) {
            hitFrames = 10;
            hit = false;
            target = Math.random() + 0.40;
            target = target >= 1.0 ? 0.9 : target;
        }

    }
}

function render () {
    meterEl.style.setProperty("--power", power);
    meterEl.style.setProperty("--target", target);
}

function loop (time) {
    requestAnimationFrame(loop);

    if (prevTime === 0) {
        prevTime = time;
    } else if (time - prevTime >= interval) {
        prevTime = time;
        update(time - prevTime);
        render();
    }
}

document.body.addEventListener("click", onClick);
requestAnimationFrame(loop);
