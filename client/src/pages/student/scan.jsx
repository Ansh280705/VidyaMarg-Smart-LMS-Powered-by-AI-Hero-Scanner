import { useEffect, useRef, useState } from "react";

export default function ScanPage(){
  const videoRef = useRef(null);
  const [supported, setSupported] = useState(false);
  const [result, setResult] = useState("");

  useEffect(()=>{
    if ('BarcodeDetector' in window) {
      setSupported(true);
    }
  },[]);

  async function startScan(){
    if (!supported) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const video = videoRef.current;
    video.srcObject = stream;
    await video.play();
    const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
    const scan = async () => {
      try {
        const codes = await detector.detect(video);
        if (codes && codes.length) {
          setResult(codes[0].rawValue);
          stream.getTracks().forEach(t=>t.stop());
          return;
        }
      } catch {}
      requestAnimationFrame(scan);
    };
    scan();
  }

  return <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Scan & Ask</h2>
    {!supported && <p>Your browser may not support camera barcode scanning. Try Chrome/Edge.</p>}
    <video ref={videoRef} className="w-full max-w-md rounded border" />
    <div className="mt-3">
      <button onClick={startScan} className="px-4 py-2 border rounded">Start Scan</button>
    </div>
    {result && <div className="mt-4"><div className="font-semibold">Result:</div><div>{result}</div></div>}
  </div>;
}
