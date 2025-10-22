'use client';

type Props = { className?: string; label?: string };

export function PrintButton({ className, label = 'Print / Save PDF' }: Props) {
  return (
    <button
      onClick={() => window.print()}
      className={['rounded-md border px-3 py-2 text-sm hover:bg-muted', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </button>
  );
}