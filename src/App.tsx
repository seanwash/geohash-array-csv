import { useState, useEffect } from "react";
import ArrayInput from "./components/ArrayInput";
import CsvOutput from "./components/CsvOutput";
import FormatInfo from "./components/FormatInfo";
import Footer from "./components/Footer";
import { convertToCsv } from "./utils/csvConverter";
import { downloadCsv } from "./utils/csvDownloader";

export default function GeohashToCsv() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [header, setHeader] = useState<string>("geohash");

  useEffect(() => {
    document.title = "Geohash Array to CSV Converter";
  }, []);

  const handleConvertToCsv = (): void => {
    const result = convertToCsv(input, header);
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setError("");
      setOutput(result.csv);
    }
  };

  const handleDownloadCsv = (): void => {
    downloadCsv(output);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Geohash Array to CSV Converter
          </h1>
          <p className="text-gray-600">
            Convert arrays of geohash indexes to CSV format for pasting into{" "}
            <a 
              href="https://www.geohash.es/draw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              geohash.es/draw
            </a>{" "}
            and other mapping services
          </p>
        </div>

        <ArrayInput
          input={input}
          header={header}
          error={error}
          onInputChange={setInput}
          onHeaderChange={setHeader}
          onConvert={handleConvertToCsv}
        />

        {output && <CsvOutput output={output} onDownload={handleDownloadCsv} />}

        <FormatInfo />

        <Footer />
      </div>
    </div>
  );
}
