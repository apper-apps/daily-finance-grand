import React from "react";
import Card from "@/components/atoms/Card";

const Loading = ({ type = "default" }) => {
  if (type === "balance") {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg p-3">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="bg-gray-200 rounded-lg p-3">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (type === "stats") {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "transactions") {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="text-right">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "chart") {
    return (
      <Card className="p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gray-200 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gray-200 h-2 rounded-full w-1/2"></div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-8 w-32 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
    </div>
  );
};

export default Loading;