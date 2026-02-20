"use client";

interface TopBarProps {
  title: string;
  description?: string;
}

export function TopBar({ title, description }: TopBarProps) {
  return (
    <header className="border-b border-border bg-background px-6 py-4 lg:px-8">
      <h1 className="text-xl font-bold text-foreground text-balance">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
