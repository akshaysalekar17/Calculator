import { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { Users } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Navbar } from "./Navbar";

interface ResourceState {
  count: number;
  engagement: string;
}

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

  const handleLogoClick = () => {
    window.open('https://app.apollo.io/#/meet/introduction-call/30-min', '_blank');
    window.open('https://www.talvantage.com', '_blank');
  };

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
    const totalSavings = inhouseCost - talvantageCost;

    const isWeekly = Object.values(resources).some(
      (resource) => resource.engagement === "weekly"
    );
    const estimateText = isWeekly ? "Weekly estimate" : "Monthly estimate";

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-calculator-light-blue to-white py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-lg font-medium text-blue-500 mb-2">
              TEAM COST CALCULATOR
            </h2>
            <h1 className="text-4xl font-bold text-calculator-text mb-4">
              Hiring In-house vs Hiring through Talvantage
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
              icon={<img src="/lovable-uploads/72072f5f-dbf6-42b3-87c5-de6cf89ec8b8.png" alt="Developer" className="w-[72px] h-[72px]" />}
            />
            <ResourceCard
              title="Designer"
              count={resources.designer.count}
              onCountChange={(count) => updateResource("designer", { count })}
              engagement={resources.designer.engagement}
              onEngagementChange={(engagement) =>
                updateResource("designer", { engagement })
              }
              icon={<img src="/lovable-uploads/b219b666-20ff-4514-a20c-2b833baf9d94.png" alt="Designer" className="w-[72px] h-[72px]" />}
            />
            <ResourceCard
              title="Additional Roles"
              count={resources.additional.count}
              onCountChange={(count) => updateResource("additional", { count })}
              engagement={resources.additional.engagement}
              onEngagementChange={(engagement) =>
                updateResource("additional", { engagement })
              }
              icon={<img src="/lovable-uploads/6dfd7373-98d0-4216-b075-d458d33d61ce.png" alt="Additional Roles" className="w-[72px] h-[72px]" />}
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

      <div className="py-8 text-center text-gray-500 text-sm">
        Copyright Reserved ©
      </div>
    </div>
  );
}
