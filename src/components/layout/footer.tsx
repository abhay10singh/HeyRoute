export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} HeyRoute. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
