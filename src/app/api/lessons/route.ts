import { NextResponse } from 'next/server';
import { learningModules } from '@/data/lessons/learning-content';

export async function GET() {
  try {
    // Return all modules with their lessons
    // Can be replaced with database query: await db.modules.findAll()
    return NextResponse.json({
      success: true,
      data: learningModules
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

