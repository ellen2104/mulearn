"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">AI Media Analyzer</h1>

      <input
        type="file"
        onChange={handleUpload}
        className="mb-4 border p-2 rounded"
      />

      {loading && <p className="text-blue-500">Analyzing...</p>}

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
