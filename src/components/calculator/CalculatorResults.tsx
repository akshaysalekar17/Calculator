import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CalculatorResultsProps {
  talvantageCost: number;
  inhouseCost: number;
  totalSavings: number;
  savings: number;
  estimateText: string;
}

export function CalculatorResults({ 
  talvantageCost, 
  inhouseCost, 
  totalSavings, 
  savings, 
  estimateText 
}: CalculatorResultsProps) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-calculator-text">Talvantage Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-calculator-blue text-4xl font-bold mb-2">
              ${talvantageCost.toLocaleString()}
            </div>
            <div className="text-calculator-gray text-sm">
              {estimateText}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-calculator-text">In-house Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-calculator-text text-4xl font-bold mb-2">
              ${inhouseCost.toLocaleString()}
            </div>
            <div className="text-calculator-gray text-sm">
              {estimateText}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-green-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center text-calculator-text">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-green-600 text-5xl font-bold mb-2">
              ${totalSavings.toLocaleString()}
            </div>
            <div className="text-green-500 text-2xl">
              {savings.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-[#0080FF]">Save {savings.toFixed(1)}% Operational Cost</span>{" "}
          <span className="text-[#3A475D]">By Hiring Through Talvantage</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Talvantage connects companies with top-tier software engineers and designers at competitive rates, enabling them to build remote teams on demand
        </p>
        <Button 
          variant="default"
          size="lg"
          className="bg-[#0080FF] hover:bg-blue-600 text-white rounded-full px-8"
          onClick={() => window.open('https://app.youform.com/forms/0mkongkh', '_blank')}
        >
          Request Candidates
        </Button>
      </div>
    </div>
  );
}