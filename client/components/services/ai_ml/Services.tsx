import {
  MessageSquare,
  Brain,
  Eye,
  Mic,
  Database,
  Cloud,
  BarChart,
  Target,
} from "lucide-react";
import  ServiceCard from "./ServiceCard";

export function Services() {
  const services = [
    {
      title: "Natural Language Processing (NLP)",
      icon: MessageSquare,
      services: [
        "Text & Sentiment Analysis",
        "Language Chatbots & Virtual Assistants",
        "Document Processing & Information Extraction",
        "Content Generation & Summarization",
      ],
    },
    {
      title: "Generative AI & Large Language Models (LLMs)",
      icon: Brain,
      services: [
        "Personalized Content Generation (RAG)",
        "Custom AI Chat & Copilot Solutions",
        "Prompt Engineering & Optimization",
        "Fine-tuning & Model Customization",
      ],
    },
    {
      title: "Computer Vision",
      icon: Eye,
      services: [
        "Image & Video Analysis",
        "Real-time Facial Recognition",
        "Intelligent Object Detection & Analytics",
        "Quality Control & Defect Detection",
      ],
    },
    {
      title: "Voice Processing",
      icon: Mic,
      services: [
        "Voice Recognition",
        "Real-time Transcription & Summarization",
        "Voice Synthesis and Audio Generation",
        "Multi-language Speech Processing",
      ],
    },
    {
      title: "Data Engineering & Integration",
      icon: Database,
      services: [
        "Data Ingestion & ETL Pipelines",
        "API Integration & Automation",
        "Real-time Stream Processing",
        "Database ETL Orchestration & Implementation",
      ],
    },
    {
      title: "Big Data & Cloud Engineering",
      icon: Cloud,
      services: [
        "Scalable Cloud Data Solutions",
        "Distributed Stream Processing",
        "Data Lake & Warehouse Architecture (PaaS)",
        "Container, Microservice & Serverless Analytics",
        "Predictive & Data-Science Pipelines",
      ],
    },
    {
      title: "Business Intelligence (BI) Integration",
      icon: BarChart,
      services: [
        "Power BI, Tableau, and other BI Tool Implementation",
        "Custom Dashboard Development",
        "Advanced Analytics & Insights",
        "Automated Reporting Systems",
      ],
    },
    {
      title: "AI Pain Point Inspection & Strategy Development",
      icon: Target,
      services: [
        "Audit of Existing IT Processes & Bottlenecks",
        "AI Readiness Assessment & Gap Analysis",
        "Strategy Roadmap for Adoption & Scaling",
        "Cost-Benefit & ROI Analysis for AI Initiatives",
      ],
    },
  ];

  return (
    <section className="bg-[#121212] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Design Excellence Through
            <span className="block text-[#ff3131] mt-2 ">
              Strategic Process
            </span>
          </h2>
          <p className="text-lg text-[#BDC3C7] w-full text-justify leading-relaxed">
            Our proven 4-step design methodology ensures every project delivers
            exceptional user experiences that drive engagement and business
            growth. From research to implementation, we craft designs that
            resonate with your users.
          </p>
        </div>
        <div className="grid grid-cols-1  gap-8">
          <ServiceCard items={services} />
        </div>
      </div>
    </section>
  );
}
