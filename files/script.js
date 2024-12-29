const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = {
    bills: 0,
    billsPerSecond: 1,
    money: 0,   
    workerCost: 1,
}
const client = {
    version: '1.0.0',
    font: 'Quicksand',
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth / 2;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize to set canvas size

let lastTime = Date.now();
function render() {
    ctx.save(); // Save the current context state
    ctx.scale(canvas.width / 800, canvas.height / 400); // Scale the context to maintain aspect ratio

    ctx.fillStyle = '#0D1821';
    ctx.fillRect(0, 0, 800, 400); // Use fixed size for drawing
    ctx.font = `20px ${client.font}`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#157F1F';
    ctx.font = `bold 40px ${client.font}`;
    ctx.strokeText('Sell Counterfeit Dollar Bills', 400, 50);
    ctx.font = `bold 30px ${client.font}`;
    ctx.strokeText('Simulator', 400, 90);
    ctx.fillStyle = '#4CB963';
    ctx.font = `bold 40px ${client.font}`;
    ctx.fillText('Sell Counterfeit Dollar Bills', 400, 50);
    ctx.font = `bold 30px ${client.font}`;
    ctx.fillText('Simulator', 400, 90);
    // Draw the sell button
    ctx.font = `20px ${client.font}`;
    ctx.fillStyle = '#436436';
    ctx.fillRect(320, 230, 160, 40);
    ctx.fillRect(320, 180, 160, 40);
    ctx.fillStyle = 'white';
    ctx.fillText('Sell Dollar Bill', 400, 205);
    // Draw the buy worker button
    ctx.font = `20px ${client.font}`;
    ctx.fillStyle = 'white';
    ctx.fillText(`Buy Worker - ${player.workerCost}`, 400, 255);
    ctx.fillText(`Bills Available: ${player.bills}`, 400, 150);
    if (player.billsPerSecond == 1) {
        ctx.fillText(`${player.billsPerSecond} bill per second`, 400, 170);
    } else {
        ctx.fillText(`${player.billsPerSecond} bills per second`, 400, 170);
    }
    function updateBills() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        if (deltaTime >= 1) {
            lastTime = Date.now();
            player.bills += player.billsPerSecond;
            lastTime = currentTime;
        }
        requestAnimationFrame(updateBills);
    }
    ctx.fillStyle = '#BFCC94';
    ctx.font = `40px ${client.font}`;
    ctx.textAlign = "left";
    ctx.fillText(`Money: ${player.money}`, 20, 370);
    ctx.font = `20px ${client.font}`;
    ctx.fillStyle = '#344966';
    ctx.textAlign = 'right';
    ctx.fillText(`Version: ${client.version}`, 790, 390);
    updateBills();
    ctx.restore();
    requestAnimationFrame(render);
}
render();

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Adjust coordinates based on canvas scaling
    const scaleX = canvas.width / 800;
    const scaleY = canvas.height / 400;
    const adjustedX = x / scaleX;
    const adjustedY = y / scaleY;

    // Sell Dollar Bill button
    if (adjustedX >= 320 && adjustedX <= 480 && adjustedY >= 180 && adjustedY <= 220) {
        if (player.bills > 0) {
            player.bills -= 1;
            player.money += 1;
        }
    }
    // Buy Worker button
    if (adjustedX >= 320 && adjustedX <= 480 && adjustedY >= 230 && adjustedY <= 270) {
        if (player.money >= player.workerCost) {
            player.money -= player.workerCost;
            player.billsPerSecond += 1;
            player.workerCost += Math.round(player.workerCost / 1.5);
        }
    }
})
