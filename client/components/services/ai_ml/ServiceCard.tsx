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
    <div className="grid grid-cols-1 gap-8">
      {items.map((service, idx) => (
        <a
          key={idx}
          className="grid grid-cols-4 md:flex-row gap-x-8 items-start  
                     rounded-xl shadow-sm   p-8 border border-[#2E2E2E] "
        >
          <div className="flex flex-col items-start min-w-[180px] mb-4 md:mb-0">
            <div className="text-6xl font-bold text-white/90 mb-4">
              <service.icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white flex-wrap">
              {service.title}
            </h3>
          </div>

          <div className="flex-1 grid col-span-3">
            <ul className="space-y-4">
              {service.services.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#F4F6F7] text-base leading-relaxed"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-[#ff3131] rounded-full mt-2 mr-4"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ServiceCard;
