import { Button } from "../ui/button";

export function CallToAction() {
  return (
    <div className="bg-[#0080FF] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Build this team
        </h2>
        <h2 className="text-4xl font-bold mb-6">
          with our expert advisor
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Talvantage connects companies with top-tier software engineers and designers at competitive rates, enabling them to build remote teams on demand
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-white text-[#0080FF] hover:bg-blue-50"
          onClick={() => window.open('https://bit.ly/30-min-meeting-akshay', '_blank')}
        >
          Schedule a Call
        </Button>
      </div>
    </div>
  );
}