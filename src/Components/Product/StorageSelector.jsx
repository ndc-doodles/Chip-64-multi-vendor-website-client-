export default function StorageSelector({ storageOptions, selectedStorage, onSelect }) {
  if (!storageOptions?.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Storage</h3>
      <div className="flex gap-2 flex-wrap">
        {storageOptions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className={`px-4 py-2 rounded-lg border text-sm transition
              ${
                selectedStorage === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
