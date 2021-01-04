var imageData,
    controlButton = document.getElementById('controlButton'),
    video = document.getElementById('video'),
    flipCheckbox = document.getElementById('flipCheckbox'),
    colorCheckbox = document.getElementById('colorCheckbox');
    controls = document.getElementById('controls');



function removeColor() {
    var data,
        width,
        average;

    imageData = offscreenContext.getImageData(0, 0,offscreenCanvas.width, offscreenCanvas.height);

    data = imageData.data;
    width = data.width;

    for (i = 0; i < data.length - 4; i += 4) {
        average = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = average;
        data[i + 1] = average;
        data[i + 2] = average;
    }

    offscreenContext.putImageData(imageData, 0, 0);
}

function drawFlipped() {
    context.save();

    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(Math.PI);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(offscreenCanvas, 0, 0);

    context.restore();
}

function nextVideoFrame() {
    if (video.ended) {
        controlButton.value = 'Play';
    } else {
        offscreenContext.drawImage(video, 0, 0);

        if (!colorCheckbox.checked)
            removeColor();

        if (flipCheckbox.checked)
            drawFlipped();
        else
            context.drawImage(offscreenCanvas, 0, 0);

        requestNextAnimationFrame(nextVideoFrame);
    }
}


function startPlaying() {
    requestNextAnimationFrame(nextVideoFrame);
    video.play();
}

function stopPlaying() {
    video.pause();
}

controlButton.onclick = function (e) {
    if (controlButton.value === 'Play') {
        startPlaying();
        controlButton.value = 'Pause';
    } else {
        stopPlaying();
        controlButton.value = 'Play';
    }
}