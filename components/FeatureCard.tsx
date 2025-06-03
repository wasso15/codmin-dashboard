import Image from "next/image";
import React from "react";

interface FeatureCardProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  alt,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-[#0055A6]">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#0055A6]">
        <Image src={icon} alt={alt} width={24} height={24} />
      </div>
      <div>
        <div className="font-medium  text-sm text-gray-800">{title}</div>
        <div className="text-gray-500 text-xs">{description}</div>
      </div>
    </div>
  );
}
