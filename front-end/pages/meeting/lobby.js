import io from "socket.io-client"
import {useRef, useState} from "react";
import {BsCameraVideoFill, BsCameraVideoOffFill, BsFillMicFill, BsFillMicMuteFill} from "react-icons/bs";



export default function lobby() {
    const socket = io.connect('http://localhost:3333');

    const myFace = useRef();
    const camerasSelect = useRef();
    const call = useRef();
    const [welcomeFlag, setWelcomeFlag] = useState(true);
    const [welcomeInput, setWelcomeInput] = useState("")
    const [mute, setMute] = useState(false)
    const [camera, setCamera] = useState(false)

    let myStream;
    let roomName;
    let myPeerConnection;
    let myDataChannel;

    async function getCameras() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter((device) => device.kind === "videoinput");
            const currentCamera = myStream.getVideoTracks()[0];
            cameras.forEach((camera) => {
                const option = document.createElement("option");
                option.value = camera.deviceId;
                option.innerText = camera.label;
                if (currentCamera.label === camera.label) {
                    option.selected = true;
                }
                camerasSelect.current.appendChild(option);
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function getMedia(deviceId) {
        const initialConstrains = {
            audio: true,
            video: {facingMode: "user"},
        };
        const cameraConstraints = {
            audio: true,
            video: {deviceId: {exact: deviceId}},
        };
        try {
            myStream = await navigator.mediaDevices.getUserMedia(
                deviceId ? cameraConstraints : initialConstrains
            );
            myFace.current.srcObject = myStream;
            if (!deviceId) {
                await getCameras();
            }
            console.log(myStream);
        } catch (e) {
            console.log(e);
        }
    }

    function handleMuteClick() {
        console.log(myStream)
        myStream
            .getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled));
        if (mute) {
            setMute(false);
        } else {
            setMute(true);
        }
    }

    function handleCameraClick() {
        myStream
            .getVideoTracks()
            .forEach((track) => (track.enabled = !track.enabled));
        if (camera) {
            setCamera(false);
        } else {
            setCamera(true);
        }
    }

    async function handleCameraChange() {
        await getMedia(camerasSelect.current.value);
        if (myPeerConnection) {
            const videoTrack = myStream.getVideoTracks()[0];
            const videoSender = myPeerConnection
                .getSenders()
                .find((sender) => sender.track.kind === "video");
            videoSender.replaceTrack(videoTrack);
        }
    }

// Welcome Form (join a room)

    const welcome = useRef();
    const welcomeForm = useRef();

    async function initCall() {
        setWelcomeFlag(false);
        await getMedia();
        makeConnection();
    }

    async function handleWelcomeSubmit(event) {
        event.preventDefault();
        await initCall();
        socket.emit("join_room", welcomeInput);
        roomName = welcomeInput;
        setWelcomeInput("");
    }

// Socket Code

    socket.on("welcome", async () => {
        myDataChannel = myPeerConnection.createDataChannel("chat");
        myDataChannel.addEventListener("message", (event) => console.log(event.data));
        console.log("made data channel");
        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        console.log("sent the offer");
        socket.emit("offer", offer, roomName);
    });

    socket.on("offer", async (offer) => {
        myPeerConnection.addEventListener("datachannel", (event) => {
            myDataChannel = event.channel;
            myDataChannel.addEventListener("message", (event) =>
                console.log(event.data)
            );
        });
        console.log("received the offer");
        myPeerConnection.setRemoteDescription(offer);
        const answer = await myPeerConnection.createAnswer();
        myPeerConnection.setLocalDescription(answer);
        socket.emit("answer", answer, roomName);
        console.log("sent the answer");
    });

    socket.on("answer", (answer) => {
        console.log("received the answer");
        myPeerConnection.setRemoteDescription(answer);
    });

    socket.on("ice", (ice) => {
        console.log("received candidate");
        myPeerConnection.addIceCandidate(ice);
    });

// RTC Code

    function makeConnection() {
        myPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun3.l.google.com:19302",
                        "stun:stun4.l.google.com:19302",
                    ],
                },
            ],
        });
        myPeerConnection.addEventListener("icecandidate", handleIce);
        myPeerConnection.addEventListener("addstream", handleAddStream);
        myStream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, myStream));
    }

    function handleIce(data) {
        console.log("sent candidate");
        socket.emit("ice", data.candidate, roomName);
    }

    function handleAddStream(data) {
        const peerFace = document.getElementById("peerFace");
        peerFace.srcObject = data.stream;
    }
    function roomNameInputChange(e){
        setWelcomeInput(e.target.value);
    }
    return (
        <>
            {welcomeFlag ?
                <div ref={welcome}>
                    <form ref={welcomeForm} onSubmit={handleWelcomeSubmit}>
                        <input value={welcomeInput} onChange={roomNameInputChange} placeholder="room name" required type="text">
                        </input>
                        <button>
                            enter room
                        </button>
                    </form>
                </div> :
                <div ref={call}>
                    <div>
                        <video ref={myFace} autoPlay playsInline width="400" height="400"/>
                        {mute?
                            <BsFillMicFill onClick={handleMuteClick} className="group w-10 h-10 relative flex py-2 px-2 bg-indigo-600 text-2xl rounded-md hover:bg-indigo-700 hover:cursor-pointer"/>
                            :
                            <BsFillMicMuteFill onClick={handleMuteClick} className="group w-10 h-10 relative flex py-2 px-2 bg-indigo-600 text-2xl rounded-md hover:bg-indigo-700 hover:cursor-pointer"/>
                        }
                        {camera ?
                            <BsCameraVideoFill onClick={handleCameraClick} className="group w-10 h-10 relative flex py-2 px-2 bg-indigo-600 text-2xl rounded-md hover:bg-indigo-700 hover:cursor-pointer"/>
                            :
                            <BsCameraVideoOffFill onClick={handleCameraClick} className="group w-10 h-10 relative flex py-2 px-2 bg-indigo-600 text-2xl rounded-md hover:bg-indigo-700 hover:cursor-pointer"/>
                        }
                        <select ref={camerasSelect} onClick={handleCameraChange}/>
                        <video id="peerFace" autoPlay playsInline width="400" height="400"/>
                    </div>
                </div>
            }
        </>
    );
}