import React from "react";
import { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  services: string[];
};

type Props = {
  items: Service[];
};

const ServiceCard: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((service, idx) => (        <div
          key={idx}
          className="flex flex-col items-start rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 border border-[#2E2E2E] bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-colors duration-300"
        >
          <div className="flex flex-col sm:flex-row items-start w-full mb-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <div className="flex-shrink-0">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {service.title}
              </h3>
            </div>
          </div>          <div className="flex-1 w-full">
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              {service.services.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#F4F6F7] text-sm sm:text-base leading-relaxed"
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-2 mr-3 sm:mr-4"></div>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceCard;
