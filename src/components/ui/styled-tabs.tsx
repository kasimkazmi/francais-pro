'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

interface TabItem {
  value: string;
  label: string;
  shortLabel?: string;
  icon?: ReactNode;
  color?: string;
  hoverColor?: string;
  gradient?: string;
  activeColor?: string;
  borderColor?: string;
  iconColor?: string;
}

interface StyledTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabs: TabItem[];
  children: ReactNode;
  className?: string;
}

export function StyledTabs({ 
  defaultValue, 
  value, 
  onValueChange, 
  tabs, 
  children, 
  className = "" 
}: StyledTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className={`w-full ${className}`}
    >
      <TabsList className="grid w-full mb-4 sm:mb-6 lg:mb-8 grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0.5 sm:gap-1 lg:gap-2 p-1 sm:p-1.5 lg:p-2 rounded-lg sm:rounded-xl">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`flex items-center gap-1 sm:gap-2 lg:gap-3 px-1 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-md sm:rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md active:scale-95 font-medium group text-xs sm:text-sm md:text-base ${tab.hoverColor || ''} ${tab.gradient || ''} ${tab.activeColor || ''} ${tab.borderColor || ''}`}
          >
            {tab.icon && (
              <div className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:scale-110 ${
                value === tab.value
                  ? "text-white"
                  : tab.iconColor || "text-blue-600 dark:text-blue-400"
              }`}>
                {tab.icon}
              </div>
            )}
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.shortLabel && (
              <span className="hidden xs:inline sm:hidden">{tab.shortLabel}</span>
            )}
            {!tab.shortLabel && (
              <span className="xs:hidden">{tab.label.charAt(0)}</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent } from '@/components/ui/tabs';
