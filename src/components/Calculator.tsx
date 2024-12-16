import { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { Code, Paintbrush, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ResourceState {
  count: number;
  engagement: string;
}

const RATES = {
  developer: { "full-time": 8000, "part-time": 4500, contract: 6000 },
  designer: { "full-time": 7000, "part-time": 4000, contract: 5500 },
  additional: { "full-time": 6000, "part-time": 3500, contract: 4500 },
};

export function Calculator() {
  const { toast } = useToast();
  const [resources, setResources] = useState({
    developer: { count: 1, engagement: "full-time" },
    designer: { count: 1, engagement: "full-time" },
    additional: { count: 0, engagement: "full-time" },
  });

  const calculateTotalCost = () => {
    const total = Object.entries(resources).reduce((sum, [type, resource]) => {
      const rate = RATES[type as keyof typeof RATES][
        resource.engagement as keyof (typeof RATES)["developer"]
      ];
      return sum + rate * resource.count;
    }, 0);

    toast({
      title: "Estimated Monthly Cost",
      description: `$${total.toLocaleString()} per month`,
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-calculator-light-blue to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Team Cost Calculator
          </h1>
          <p className="text-lg text-calculator-gray max-w-2xl mx-auto">
            Calculate the cost of building your remote team. Adjust the number of
            resources and engagement type to see the estimated monthly cost.
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

        <div className="text-center">
          <Button
            size="lg"
            className="bg-calculator-blue hover:bg-blue-700 text-white px-8"
            onClick={calculateTotalCost}
          >
            Calculate Cost
          </Button>
        </div>
      </div>
    </div>
  );
}