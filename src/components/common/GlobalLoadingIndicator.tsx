import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Symbol from '../../assets/symbol.svg?react';
import './GlobalLoadingIndicator.css';

const GlobalLoadingIndicator: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching + isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animated" />

      <div className="relative z-10 flex flex-col items-center animate-pulse">
        <Symbol className="text-white w-20 h-20 sm:w-24 sm:h-24 mb-4" />
        <span className="text-white text-xl sm:text-2xl font-bold">GongSpot</span>
        <span className="text-white text-sm sm:text-base mt-2">청년을 위한 공부지도</span>
      </div>

    </div>
  );
};

export default GlobalLoadingIndicator;