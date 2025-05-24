import React from "react";

const PanelHeader = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string | null;
  children?: React.ReactNode;
}) => {
  return (
    <div className="mb-6 flex items-center justify-between flex-wrap">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>

      {children}
    </div>
  );
};

export default PanelHeader;
