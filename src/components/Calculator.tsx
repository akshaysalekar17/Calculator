import { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { Code, Paintbrush, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ResourceState {
  count: number;
  engagement: string;
}

const HOURS = {
  "full-time": 160,
  "part-time": 80,
  "weekly": 40,
};

const TALVANTAGE_RATE = 20; // $20/hour
const INHOUSE_RATE = 50; // $50/hour

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

  const calculateTotalCost = () => {
    const talvantageCost = calculateCost(TALVANTAGE_RATE);
    const inhouseCost = calculateCost(INHOUSE_RATE);
    const savings = ((inhouseCost - talvantageCost) / inhouseCost) * 100;

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Talvantage Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-calculator-blue text-4xl font-bold mb-2">
              ${talvantageCost.toLocaleString()}
            </div>
            <div className="text-calculator-gray text-sm">
              Based on ${TALVANTAGE_RATE}/hour
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">In-house Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              ${inhouseCost.toLocaleString()}
            </div>
            <div className="text-calculator-gray text-sm">
              Based on ${INHOUSE_RATE}/hour
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-green-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-500 text-4xl font-bold">
              {savings.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
    setShowResults(false); // Hide results when inputs change
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-calculator-light-blue to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Team Cost Calculator
          </h1>
          <p className="text-lg text-calculator-gray max-w-2xl mx-auto">
            Compare the cost of building your team with Talvantage versus in-house hiring.
            Adjust the number of resources and engagement type to see the cost difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ResourceCard
            title="Developer"
            count={resources.developer.count}
            onCountChange={(count) => updateResource("developer", { count })}
            engagement={resources.developer.engagement}
            onEngagementChange={(engagement) =>
              updateResource("developer", { engagement })
            }
            icon={<Code className="w-6 h-6 text-calculator-blue" />}
          />
          <ResourceCard
            title="Designer"
            count={resources.designer.count}
            onCountChange={(count) => updateResource("designer", { count })}
            engagement={resources.designer.engagement}
            onEngagementChange={(engagement) =>
              updateResource("designer", { engagement })
            }
            icon={<Paintbrush className="w-6 h-6 text-calculator-blue" />}
          />
          <ResourceCard
            title="Additional Roles"
            count={resources.additional.count}
            onCountChange={(count) => updateResource("additional", { count })}
            engagement={resources.additional.engagement}
            onEngagementChange={(engagement) =>
              updateResource("additional", { engagement })
            }
            icon={<Users className="w-6 h-6 text-calculator-blue" />}
          />
        </div>

        <div className="text-center mb-8">
          <Button
            size="lg"
            className="bg-calculator-blue hover:bg-blue-700 text-white px-8"
            onClick={handleCalculate}
          >
            Calculate Cost
          </Button>
        </div>

        {showResults && calculateTotalCost()}
      </div>
    </div>
  );
}