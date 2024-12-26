export function Navbar() {
  return (
    <nav className="py-4 px-6">
      <div className="max-w-6xl mx-auto">
        <img
          src="/talvantage-logo.png"
          alt="Talvantage Logo"
          className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            window.location.href = 'https://app.apollo.io/#/meet/introduction-call/30-min';
            window.open('https://www.talvantage.com', '_blank');
          }}
        />
      </div>
    </nav>
  );
}