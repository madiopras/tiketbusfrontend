import React from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
}

const CollapsibleCard: React.FC<CollapsibleProps> = React.memo(({ title, children, defaultChecked = false }) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 shadow-lg mb-4 rounded-box">
      <input type="checkbox" defaultChecked={defaultChecked} />
      <div className="collapse-title text-2xl font-bold">{title}</div>
      <div className="collapse-content">
        {children}
      </div>
    </div>
  );
});

CollapsibleCard.displayName = 'CollapsibleCard';

export default CollapsibleCard;
