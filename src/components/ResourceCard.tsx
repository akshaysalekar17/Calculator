import { Minus, Plus, Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ResourceCardProps {
  title: string;
  count: number;
  onCountChange: (newCount: number) => void;
  engagement: string;
  onEngagementChange: (value: string) => void;
  icon?: React.ReactNode;
}

export function ResourceCard({
  title,
  count,
  onCountChange,
  engagement,
  onEngagementChange,
  icon,
}: ResourceCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        {icon || <Users className="w-6 h-6 text-calculator-blue" />}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-calculator-gray mb-2">
            How many resources?
          </label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCountChange(Math.max(0, count - 1))}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-medium w-12 text-center">{count}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCountChange(count + 1)}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-calculator-gray mb-2">
            Type of engagement
          </label>
          <Select value={engagement} onValueChange={onEngagementChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select engagement type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full time</SelectItem>
              <SelectItem value="part-time">Part time</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}