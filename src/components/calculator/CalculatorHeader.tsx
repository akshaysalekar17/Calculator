interface CalculatorHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export function CalculatorHeader({ title, subtitle, description }: CalculatorHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-lg font-medium text-blue-500 mb-2">
        {subtitle}
      </h2>
      <h1 className="text-4xl font-bold text-calculator-text mb-4">
        {title}
      </h1>
      <p className="text-lg text-calculator-gray max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}