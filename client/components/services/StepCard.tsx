import React from "react";
type Step = {
  number: string;
  title: string;
  description: string[];
};
type Props = {
  steps: Step[];
};
const StepCard: React.FC<Props> = ({ steps }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start rounded-xl shadow-sm p-4 sm:p-6 md:p-8 border border-[#2E2E2E]"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:min-w-[180px] mb-2 md:mb-0">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 mb-1 sm:mb-2">
              {step.number}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {step.title}
            </h3>
          </div>

          <div className="md:col-span-3">
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              {step.description.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-[#F4F6F7] text-sm sm:text-base leading-relaxed"
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 md:mr-4"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepCard;
