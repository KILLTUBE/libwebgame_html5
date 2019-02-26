//videoMaterial = new pc.StandardMaterial()
videoMaterial = new pc.BasicMaterial()

videoBox = createBox(player.pos(), new pc.Vec3(1,1,1), videoMaterial)

videoTexture = new pc.Texture(app.graphicsDevice, {
	format: pc.PIXELFORMAT_R5_G6_B5,
	autoMipmap: false
});
videoTexture.minFilter = pc.FILTER_LINEAR;
videoTexture.magFilter = pc.FILTER_LINEAR;
videoTexture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
videoTexture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;


videoMaterial.colorMap = videoTexture
videoMaterial.update()

videoElement = document.createElement('video');
videoElement.addEventListener('canplay', function (e) {
	videoTexture.setSource(videoElement)
});
//videoElement.src = "http://127.0.0.1/rickdemption.mp4";
videoElement.src = "http://127.0.0.1/ricklaxation.mp4";
videoElement.crossOrigin = 'anonymous';
videoElement.loop = true;
videoElement.play();

app.on("update", function() { videoTexture.upload() })
