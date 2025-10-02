import { NextRequest, NextResponse } from 'next/server';
import { detailedLessons } from '@/data/lessons/learning-content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    
    // Get lesson from local data (can be replaced with database call)
    const lesson = detailedLessons[lessonId as keyof typeof detailedLessons];
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: lesson
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

