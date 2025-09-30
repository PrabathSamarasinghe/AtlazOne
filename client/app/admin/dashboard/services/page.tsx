"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Code,
  Smartphone,
  Globe,
  Settings,
  Zap,
  Shield,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceModal from "@/components/admin/ServiceModal";
import { getDirectServices } from "@/lib/direct-queries";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  price: string;
  features: string[];
  isactive: boolean;
}

const iconMap = {
  Settings,
  Code,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Headphones,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[] | undefined>();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getDirectServices();
        setServices(data);
        console.log('Admin services fetched directly from database:', data.length);
      } catch (error) {
        console.log("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [services]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }
    } catch (error) {
      console.log("Error deleting service:", error);
    }
    setServices(services?.filter((s) => s.id !== id));
  };

  const handleToggleService = (id: number) => {
    setServices(
      services?.map((s) => (s.id === id ? { ...s, isactive: !s.isactive } : s))
    );
  };

  const handleSaveService = async (serviceData: Omit<Service, "id">) => {
    
    if (editingService) {
      try {
        const response = await fetch(
          `/api/admin/services/${editingService.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update service");
        }

        setServices(
          services?.map((s) =>
            s.id === editingService.id
              ? { ...serviceData, id: editingService.id }
              : s
          )
        );
      } catch (error) {
        console.log("Error updating service:", error);
      }
    } else {
      try {
        const response = await fetch("/api/admin/services/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        });
        if (!response.ok) {
          throw new Error("Failed to create service");
        }
        const newService = await response.json();
        setServices([...(services || []), newService]);
      } catch (error) {
        console.log("Error creating service:", error);
      }
      const newService = {
        ...serviceData,
        id: Math.max(...(services?.map((s) => s.id) || [0])) + 1,
      };
    }
    setIsModalOpen(false);
  };

  const filteredServices = services?.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {" "}
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
            Manage <span style={{ color: "#3B82F6" }}>Services</span>
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Create, edit, and manage your service offerings
          </p>
        </div>
        <Button
          onClick={handleAddService}
          className="font-semibold rounded-lg group"
          style={{
            backgroundColor: "#3B82F6",
            color: "#F8FAFC",
            border: "1px solid #3B82F6",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2563EB";
            e.currentTarget.style.borderColor = "#2563EB";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3B82F6";
            e.currentTarget.style.borderColor = "#3B82F6";
          }}
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add Service
        </Button>
      </motion.div>
      {/* Search */}{" "}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          style={{ color: "#94A3B8" }}
        />
        <Input
          placeholder="Search services?..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          style={{
            backgroundColor: "#1A1B23",
            border: "1px solid #374151",
            color: "#F8FAFC",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#3B82F6";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#374151";
          }}
        />
      </motion.div>
      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices?.map((service, index) => {
          const IconComponent = (() => {
            if (service.icon) {
              return iconMap[service.icon as keyof typeof iconMap];
            }
            return iconMap["Settings" as keyof typeof iconMap];
          })();

          return (
            <motion.div
              key={service.id}
              className={`rounded-2xl p-6 transition-all duration-300 group ${
                !service.isactive ? "opacity-60" : ""
              }`}
              style={{
                backgroundColor: "#1A1B23",
                border: "1px solid #374151",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#374151";
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {" "}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl p-2.5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#3B82F6" }}
                >
                  {IconComponent && (
                    <IconComponent
                      className="w-full h-full"
                      style={{ color: "#F8FAFC" }}
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleService(service.id)}
                    className="px-3 py-1 text-xs font-medium rounded-full border transition-colors"
                    style={{
                      backgroundColor: service.isactive
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(107, 114, 128, 0.2)",
                      color: service.isactive ? "#22C55E" : "#94A3B8",
                      borderColor: service.isactive ? "#22C55E" : "#6B7280",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = service.isactive
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(107, 114, 128, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = service.isactive
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(107, 114, 128, 0.2)";
                    }}
                  >
                    {service.isactive ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => handleEditService(service)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "#3B82F6" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#3B82F6";
                    }}
                  >
                    <Edit3 className="w-4 h-4" style={{ color: "#F8FAFC" }} />
                  </button>{" "}
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "#EF4444" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#EF4444";
                    }}
                  >
                    <Trash2 className="w-4 h-4" style={{ color: "#F8FAFC" }} />
                  </button>
                </div>
              </div>
              <h3
                className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-blue-400"
                style={{ color: "#F8FAFC" }}
              >
                {service.title}
              </h3>
              <p className="mb-4 leading-relaxed" style={{ color: "#94A3B8" }}>
                {service.description}
              </p>
              <div className="mb-4">
                <div
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#F8FAFC" }}
                >
                  {service.price}
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="text-sm font-medium mb-2"
                  style={{ color: "#94A3B8" }}
                >
                  Key Features:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-sm flex items-center"
                      style={{ color: "#94A3B8" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: "#3B82F6" }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
      />
    </div>
  );
}
