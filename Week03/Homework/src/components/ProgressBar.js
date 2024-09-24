import { useState, useEffect } from "react";

export default function ProgressBar(props) {
  const { progress, duration } = props;
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (currentProgress < progress) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => Math.min(prev + 1, progress));
      }, duration / progress);

      return () => clearInterval(interval);
    }
  }, [currentProgress, progress, duration]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
}
