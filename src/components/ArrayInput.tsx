import TextArea from "./primitives/TextArea";
import Input from "./primitives/Input";
import Button from "./primitives/Button";
import Label from "./primitives/Label";
import Alert from "./Alert";
import Card from "./Card";

interface ArrayInputProps {
  input: string;
  header: string;
  error: string;
  onInputChange: (value: string) => void;
  onHeaderChange: (value: string) => void;
  onConvert: () => void;
}

export default function ArrayInput({
  input,
  header,
  error,
  onInputChange,
  onHeaderChange,
  onConvert,
}: ArrayInputProps) {
  return (
    <Card className="mb-6">
      <Label htmlFor="input">Input Array</Label>
      <TextArea
        id="input"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste your array here, e.g., ['asdf', 'asdfa', 'qwer'] or [&quot;hash1&quot;, &quot;hash2&quot;, &quot;hash3&quot;]"
        className="h-32"
      />

      <div className="mt-4">
        <Label htmlFor="header">CSV Header (optional)</Label>
        <Input
          id="header"
          type="text"
          value={header}
          onChange={(e) => onHeaderChange(e.target.value)}
          placeholder="Enter column header (e.g., geohash)"
        />
      </div>

      <div className="mt-4">
        <Button onClick={onConvert}>Convert to CSV</Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
    </Card>
  );
}