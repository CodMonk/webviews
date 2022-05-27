
 const ROI_X = 250;
    const ROI_Y = 150;
    const ROI_WIDTH = 240;
    const ROI_HEIGHT = 180;
    
    const FPS = 25;
    
    let cameraStream = null;
    let processingStream = null;
    let mediaRecorder = null;
    let mediaChunks = null;
    let processingPreviewIntervalId = null;
    
        function postForm(data) {
            const form = document.createElement('form');
            form.name = "frm";
           form.action = "https://app.yellowmessenger.com/components/components/camera/send-data";
//             form.action = '/components/camera/send-data';
            form.method = "post";
            const input = document.createElement('input');
            input.type = "hidden";
            input.name = "base64";
            input.value = data;
            form.append(input);
            const inputTwo = document.createElement('input');
            inputTwo.type = "hidden";
            inputTwo.name = "uid";
            inputTwo.value = uid
            form.append(inputTwo);
            const inputThree = document.createElement('input');
            inputThree.type = "hidden";
            inputThree.name = "botId";
            inputThree.value = botId;
            form.append(inputThree);
            document.body.appendChild(form);
            setTimeout(() => {
                form.submit();
            }, 2000)
        }
    function processFrame() {
        let cameraPreview = document.getElementById("cameraPreview");
        
        processingPreview
            .getContext('2d')
            .drawImage(cameraPreview, ROI_X, ROI_Y, ROI_WIDTH, ROI_HEIGHT, 0, 0, ROI_WIDTH, ROI_HEIGHT);
    }
    function blobToBase64(blob) {
          return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
    }
    function generateRecordingPreview() {
        let mediaBlob = new Blob(mediaChunks, { type: "video/webm" });
        let mediaBlobUrl = URL.createObjectURL(mediaBlob);
        const uid = document.getElementById('uid') && document.getElementById('uid').value;
        const botId = document.getElementById('botId') && document.getElementById('botId').value;

        let recordingPreview = document.getElementById("recordingPreview");
        recordingPreview.src = mediaBlobUrl;

        let downloadButton = document.getElementById("downloadButton");
        downloadButton.href = mediaBlobUrl;
        downloadButton.download = "RecordedVideo.webm";

        blobToBase64(mediaBlob)
        .then((data)=>{
            console.log(data)

            postForm(data,uid)
            return;
            
        })


      
    }
        
    function startCapture() {
        const constraints = { video: true, audio: false };
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            cameraStream = stream;
            
            let processingPreview = document.getElementById("processingPreview");
            processingStream = processingPreview.captureStream(FPS);
            
            mediaRecorder = new MediaRecorder(processingStream);
            mediaChunks = []
            
            mediaRecorder.ondataavailable = function(event) {
                mediaChunks.push(event.data);
                if(mediaRecorder.state == "inactive") {
                    generateRecordingPreview();
                }
            };
            
            mediaRecorder.start();
            
            let cameraPreview = document.getElementById("cameraPreview");
            cameraPreview.srcObject = stream;
        
            processingPreviewIntervalId = setInterval(processFrame, 1000 / FPS);
        })
        .catch((err) => {
            alert("No media device found!");
        });
    };
    
    function stopCapture() {
        if(cameraStream != null) {
            cameraStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        
        if(processingStream != null) {
            processingStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        
        if(mediaRecorder != null) {
            if(mediaRecorder.state == "recording") {
                mediaRecorder.stop();
            }
        }
        
        if(processingPreviewIntervalId != null) {
            clearInterval(processingPreviewIntervalId);
            processingPreviewIntervalId = null;
        }
    };
