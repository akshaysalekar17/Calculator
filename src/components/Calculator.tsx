import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Navbar } from "./Navbar";
import { CalculatorHeader } from "./calculator/CalculatorHeader";
import { ResourceCards } from "./calculator/ResourceCards";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { CallToAction } from "./calculator/CallToAction";
import { ResourceState } from "./calculator/types";

const HOURS = {
  "full-time": 160,
  "part-time": 80,
  "weekly": 40,
};

const TALVANTAGE_RATE = 20;
const INHOUSE_RATE = 50;

export function Calculator() {
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);
  const [resources, setResources] = useState({
    developer: { count: 1, engagement: "full-time" },
    designer: { count: 1, engagement: "full-time" },
    additional: { count: 0, engagement: "full-time" },
  });

  const calculateCost = (rate: number) => {
    return Object.entries(resources).reduce((sum, [_, resource]) => {
      const hours = HOURS[resource.engagement as keyof typeof HOURS];
      return sum + (rate * hours * resource.count);
    }, 0);
  };

  const handleCalculate = () => {
    setShowResults(true);
    toast({
      title: "Cost Calculation Complete",
      description: "Your cost comparison has been calculated.",
    });
  };

  const updateResource = (
    type: keyof typeof resources,
    updates: Partial<ResourceState>
  ) => {
    setResources((prev) => ({
      ...prev,
      [type]: { ...prev[type], ...updates },
    }));
    setShowResults(false);
  };

  const talvantageCost = calculateCost(TALVANTAGE_RATE);
  const inhouseCost = calculateCost(INHOUSE_RATE);
  const savings = ((inhouseCost - talvantageCost) / inhouseCost) * 100;
  const totalSavings = inhouseCost - talvantageCost;
  const isWeekly = Object.values(resources).some(
    (resource) => resource.engagement === "weekly"
  );
  const estimateText = isWeekly ? "Weekly estimate" : "Monthly estimate";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-calculator-light-blue to-white py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <CalculatorHeader 
            title="Compare Talvantage With Hiring In-House"
            subtitle="TEAM COST CALCULATOR"
            description="Compare the cost of building your team with Talvantage versus in-house hiring.
              Adjust the number of resources and engagement type to see the cost difference."
          />

          <ResourceCards 
            resources={resources}
            updateResource={updateResource}
          />

          <div className="text-center mb-8">
            <Button
              size="lg"
              className="bg-calculator-blue hover:bg-blue-700 text-white px-8"
              onClick={handleCalculate}
            >
              Calculate Cost
            </Button>
          </div>

          {showResults && (
            <CalculatorResults
              talvantageCost={talvantageCost}
              inhouseCost={inhouseCost}
              totalSavings={totalSavings}
              savings={savings}
              estimateText={estimateText}
            />
          )}
        </div>
      </div>
      
      <CallToAction />
      
      <div className="py-8 text-center text-gray-500 text-sm">
        Copyright Reserved ©
      </div>
    </div>
  );
}