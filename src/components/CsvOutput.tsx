import { Copy, Download } from "lucide-react";
import { useState } from "react";
import Button from "./primitives/Button";
import Card from "./Card";
import Label from "./primitives/Label";

interface CsvOutputProps {
  output: string;
  onDownload: () => void;
}

export default function CsvOutput({ output, onDownload }: CsvOutputProps) {
  const [copyText, setCopyText] = useState("Copy");

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const itemCount = output.split("\n").length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <Label>CSV Output ({itemCount} items)</Label>
        <div className="flex gap-2">
          <Button
            variant="success"
            onClick={copyToClipboard}
            icon={<Copy size={16} />}
            className="text-sm py-2 px-3"
          >
            {copyText}
          </Button>
          <Button
            variant="secondary"
            onClick={onDownload}
            icon={<Download size={16} />}
            className="text-sm py-2 px-3"
          >
            Download
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
        <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-all">
          {output}
        </pre>
      </div>
    </Card>
  );
}