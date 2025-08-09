export default function FormatInfo() {
  return (
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
      <h3 className="text-sm font-medium text-blue-900 mb-2">
        Supported Formats:
      </h3>
      <ul className="text-sm text-blue-800 space-y-1">
        <li>
          • <code>['item1', 'item2', 'item3']</code>
        </li>
        <li>
          • <code>["item1", "item2", "item3"]</code>
        </li>
        <li>
          • <code>item1, item2, item3</code> (comma-separated)
        </li>
        <li>• Mixed quotes and formats</li>
      </ul>
    </div>
  );
}