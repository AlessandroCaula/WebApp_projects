import React, { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {
    // Deconstruct the props passed to the Homepage.
    const { setFile, setAudioStream } = props;

    // Create useState variables.
    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    // The useRef hook in React provides a way to hold and persist mutable values across re-renders without causing additional re-renders when the reference value changes. It's commonly used to directly access and manupulate DOM elements, store values that don't need to trigger re-renders, and create a stable reference that persists over the component's lifecycle.
    const mediaRecorder = useRef(null);

    // The MIME types specify the nature and format of a file, especially when it comes to media or downloadable content. The MIME type 'audio/webm' represents audio data in WebM format. 
    const mimeType = 'audio/webm';

    // RECORDING FUNCTION
    // !! When you define a function as aync, it automatically returns a Promise. Inside this function, you can use the await keyword to pause the function's execution until a given promise resolves or reject, making the code appear as it it's running sequentially. 
    // !! An async function does't block the main thread (including rendering) while it waits for asynchronous operations, like fetching data. When you use await inside an async function, the function pauses only in its own execution context to wait for the Promise to resolve, without stopping other code outside of it from running. Even though the async function itself might "pause", this does not affect the overall page rendering or order active tasks on the main thread. 
    // - Non-blocking rendering: The rest of the application can keep rendering or handling user interactions while the async function completes in the background.
    // - Smoother performace: Since the main thread isn't held up, the application remains responsive, enhancing the user experience. 
    async function startRecording() {
        let tempStream;
        console.log('Start recording');
        // Try and catch block to catch any exception. 
        try {
            // Allow the web application to access a user's media devices, such as the camera and the microphone in this case. In this case we want to access only the audio, not the video. 
            const streamData = navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            tempStream = streamData;
        } catch (err) {
            console.log(err.message);
            return;
        }
        // Set the recording status to recording.
        setRecordingStatus('recording');
        // Create new Media recorder instance using the stream. 
        // The MediaRecorder interface is used in JS to record media streams, such as audio and video, that have been obtained through navigator.mediaDevices.getUserMedia() or similar APIs. 
        // mimeType: Specifies the format of the media being recorded.
        // By creating an instance of MediaRecorder, you can control the recording process, start and stop it, and handle recorded data. 
        const media = new MediaRecorder(tempStream, { type: mimeType });
        // Is usually part of React when managing a MediaRecorder instance using a useRef hook. Here's a breakdown of how and why this is used. 
        // Using useRef allows you to store a reference to the MediaRecorder instance that persists across renders without triggering re-renders. 
        // In React, useRef is commonly used for mutable values that shouldn't trigger re-renders. A MediaRecorder instance can change its state (start, pause, stop recording) without the need to re-reder the component. Storing it in a ref lets you control it directly without causing unnecessary updates in the component's state.
        mediaRecorder.current = media;
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            // Handle the case in which there is no data. 
            if (typeof event.data === 'undefined') { return; }
            if (typeof event.data.size === 0) { return; }
            // Pushing the data to the localAudioChunks. 
            localAudioChunks.push(event.data);
        }

        // Setting the Audio Chunks State. 
        setAudioChunks(localAudioChunks);
    }

    // STOP RECORDING FUNCTION. 
    // In this function we are gonna creating a Blob (Binary Large Object) for savind our recording. 
    async function stopRecording() {
        // Set the recording status to 'inactive'
        setRecordingStatus('inactive');
        console.log('Stop recording')

        // Stopping the media recorder.
        mediaRecorder.current.stop();
        // onStop action create a Blob object.
        mediaRecorder.current.onStop = () => {
            // A Blob (Binary Large Object) object represents binary data in a specific format, often used for files or multimedia data like images, audio, or video. 
            // The audioBlob can now be used for audio playback, downloading, or further processing. 
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            setAudioStream(audioBlob);
            setAudioChunks([]);
        }
    }

    // This useEffect Hook is used to track the length of a recording sessoin by updating a duration state variable every second. 
    useEffect(() => {
        // If it is not recording, return.
        if (recordingStatus === 'inactive') { return; }
        
        // Both the setInterval and the clearInterval functions are built-in JS functions used to start and stop an interval timer.

        // Incrementing the duration of the interval count of the recording of 1 every 1000 milliseconds (every second)
        // Set the interval timer to trigger every 1000 milliseconds.
        const interval = setInterval(() => {
            // Increment the duration.
            setDuration(curr => curr + 1)
        }, 1000)
        // Cleanup function to clear the interval timer when the component unmounts or when the hook re-runs. 
        return () => clearInterval(interval);
    });

    return (
        <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20">
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'> Record <span
                className='text-blue-400'>&rarr;</span> Transcribe <span
                    className='text-blue-400'>&rarr;</span> Translate</h3>
            <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-lg'>
                {/*If the recording is active "recordingStatus" is inactive then show the Record string, otherwis show the Stop Recording*/}
                <p className='text-blue-400'> {recordingStatus === 'inactive' ? 'Record' : `Stop Recording`} </p>
                {/*Show the time that is passed recorind*/}
                <div className='flex items-center gap-2'>
                    {/*Conditionally rendering the timer. If duration exist, show the timer.*/}
                    {duration && (
                        // Show the duration in seconds.
                        <p>{duration}s</p>
                    )}
                    <i className="fa-solid fa-microphone"></i>
                </div>
            </button>
            {/*Or upload your file. It can only accept mp3 or wave recording files*/}
            {/*- <input> element: which is often used for taking user input, such as text or file uploads.
        - 'hidden' class; is typically used to make an element invisible on the page.
        - type='file': this attribute changes the input into a file upload field, allowing users to select files from their device when the input is shown.*/}
            {/*In the input class we are gonna set the onChange event to handle the file upload and set the setFile useState variable.*/}
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
                // Retrieve the selected file.
                const tempfile = e.target.files[0];
                // Set the file to the setFile useState variable.
                setFile(tempfile);
            }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
            <p className='italic text-slate-400'>Free now free forever</p>
        </main>
    )
}
