"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ImageDown,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    label: "Image Compressor",
    href: "/compress/images",
    icon: <ImageDown className="size-5" />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/digitalya-logo.png"
            alt="DigitalYa"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="text-sm font-bold text-foreground font-sans">
            Mediapress
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-5">
          <Image
            src="/images/digitalya-logo.png"
            alt="DigitalYa"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
          />
          <span className="text-base font-bold text-foreground font-sans tracking-tight">
            Mediapress
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hecho por Damian Coronel para @DigitalYa
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">V1.0.0</p>
        </div>
      </aside>
    </>
  );
}
