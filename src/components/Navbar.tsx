import { Code, Paintbrush, Users } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-calculator-light-blue to-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img
            src="/talvantage-logo.png"
            alt="Talvantage Logo"
            className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.open('https://app.apollo.io/#/meet/introduction-call/30-min', '_blank');
              window.open('https://www.talvantage.com', '_blank');
            }}
          />
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-calculator-text hover:text-calculator-blue transition-colors">
            <Code className="w-5 h-5 inline-block mr-2" />
            Developers
          </a>
          <a href="#" className="text-calculator-text hover:text-calculator-blue transition-colors">
            <Paintbrush className="w-5 h-5 inline-block mr-2" />
            Designers
          </a>
          <a href="#" className="text-calculator-text hover:text-calculator-blue transition-colors">
            <Users className="w-5 h-5 inline-block mr-2" />
            Additional Roles
          </a>
        </div>
      </div>
    </nav>
  );
}