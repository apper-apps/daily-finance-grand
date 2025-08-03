import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "কিছু ভুল হয়েছে", onRetry }) => {
  return (
    <Card className="p-8 text-center">
      <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        ত্রুটি ঘটেছে
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="mx-auto"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          আবার চেষ্টা করুন
        </Button>
      )}
    </Card>
  );
};

export default Error;