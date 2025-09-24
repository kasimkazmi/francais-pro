'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ThemeAwareLearningCard } from './theme-aware-learning-card';
import { ThemeAwareIcon } from './theme-aware-icon';
import { BookOpen, Users, Target, Globe, Play, Heart } from 'lucide-react';

interface LearningStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface DraggableLearningPathProps {
  learningPath: LearningStep[];
}

interface DraggableCardProps {
  step: LearningStep;
  isCorrect: boolean;
  canNavigate: boolean;
}

function DraggableCard({ step, isCorrect, canNavigate }: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.step });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    scale: isDragging ? 1.05 : 1,
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen />;
      case 'Target': return <Target />;
      case 'Globe': return <Globe />;
      case 'Play': return <Play />;
      case 'Users': return <Users />;
      case 'Heart': return <Heart />;
      default: return <BookOpen />;
    }
  };

  const cardContent = (
    <ThemeAwareLearningCard
      title={step.title}
      description={step.description}
      decoration={
        step.step % 3 === 1
          ? "pumpkin"
          : step.step % 3 === 2
          ? "ghost"
          : "bat"
      }
      glow={true}
      animated={true}
      className={`hover:shadow-lg hover:scale-105 transition-all duration-300 transform ${
        isCorrect ? 'ring-2 ring-green-500 shadow-green-200' : 'ring-2 ring-transparent'
      } ${isDragging ? 'shadow-2xl scale-105' : ''} ${
        canNavigate ? 'cursor-pointer hover:ring-2 hover:ring-blue-400' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 seasonal-button text-white rounded-full flex items-center justify-center text-sm font-bold ${
            isCorrect ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            {step.step}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeAwareIcon>
            {getIcon(step.icon)}
          </ThemeAwareIcon>
        </div>
      </div>
    </ThemeAwareLearningCard>
  );

  return (
    <div ref={setNodeRef} style={style} {...(canNavigate ? {} : attributes)} {...(canNavigate ? {} : listeners)}>
      {canNavigate ? (
        <a href={step.href} className="block">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}

export function DraggableLearningPath({ learningPath }: DraggableLearningPathProps) {
  const [items, setItems] = useState(learningPath);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [canNavigate, setCanNavigate] = useState(false);

  // Add custom styles for animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-in-out;
      }
      .animate-bounceIn {
        animation: bounceIn 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Check if the sequence is correct (1, 2, 3, 4, 5, 6)
  const checkSequence = (currentItems: LearningStep[]) => {
    return currentItems.every((item, index) => item.step === index + 1);
  };

  // Shuffle the items on component mount
  useEffect(() => {
    const shuffled = [...learningPath].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [learningPath]);

  // Cleanup cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset cursor when drag ends
    document.body.style.cursor = 'default';

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.step === active.id);
        const newIndex = items.findIndex((item) => item.step === over?.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        const correct = checkSequence(newItems);
        setIsCorrect(correct);
        
        if (correct) {
          setShowSuccess(true);
          setCanNavigate(true);
          setTimeout(() => setShowSuccess(false), 5000);
        }
        
        return newItems;
      });
    }
  };


  return (
    <div className="relative space-y-6">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-40 flex items-center justify-center animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-8 py-6 rounded-2xl shadow-2xl text-center animate-bounceIn max-w-md border border-white/20">
            <div className="text-3xl font-bold mb-3 text-gray-900">Perfect Sequence!</div>
            <div className="text-base font-medium mb-4 text-gray-700">You&apos;ve mastered the learning path!</div>
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-4">
              <div className="text-base font-bold mb-2 text-green-800">✨ Now you can navigate!</div>
              <div className="text-sm text-green-700">Click on any card to start your learning journey</div>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Draggable Cards */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => {
          // Add smooth transition when drag starts
          document.body.style.cursor = 'grabbing';
        }}
        onDragOver={() => {
          // Smooth transition during drag over
        }}
        onDragCancel={() => {
          // Reset cursor when drag is cancelled
          document.body.style.cursor = 'default';
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SortableContext 
            items={items.map(item => item.step)} 
            strategy={verticalListSortingStrategy}
          >
            {items.map((step, index) => (
              <div
                key={step.step}
                className="transition-all duration-300 ease-in-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <DraggableCard
                  step={step}
                  isCorrect={isCorrect}
                  canNavigate={canNavigate}
                />
              </div>
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
