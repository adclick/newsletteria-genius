
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoadingPlaceholder: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Gerando Newsletter...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse-slow"></div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
            <div className="h-4 bg-gray-200 rounded w-[90%] animate-pulse-slow"></div>
            <div className="h-4 bg-gray-200 rounded w-[95%] animate-pulse-slow"></div>
          </div>
          
          <div className="space-y-3 pt-4">
            <div className="h-6 bg-gray-200 rounded w-[60%] animate-pulse-slow"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 rounded w-[85%] animate-pulse-slow"></div>
            </div>
            
            <div className="h-20 bg-slate-100 rounded border border-gray-200 mt-4 animate-pulse-slow"></div>
          </div>
          
          <div className="space-y-3 pt-4">
            <div className="h-6 bg-gray-200 rounded w-[70%] animate-pulse-slow"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 rounded w-[92%] animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 rounded w-[88%] animate-pulse-slow"></div>
            </div>
            
            <div className="h-20 bg-slate-100 rounded border border-gray-200 mt-4 animate-pulse-slow"></div>
          </div>
          
          <div className="h-32 bg-blue-50 rounded border border-blue-100 mt-4 animate-pulse-slow"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingPlaceholder;
