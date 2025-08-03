import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "কোনো ডেটা নেই", 
  description = "এখনো কোনো তথ্য যোগ করা হয়নি।",
  action,
  actionText = "যোগ করুন",
  icon = "Inbox"
}) => {
  return (
<Card className="p-8 text-center">
      <div className="bg-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-gray-600">
        <ApperIcon name={icon} size={32} className="text-white" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <Button 
          onClick={action}
          variant="primary"
          className="mx-auto"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default Empty;