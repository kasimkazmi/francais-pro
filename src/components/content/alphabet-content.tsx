import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { LazyCardGrid } from '@/components/ui/lazy-card';
import { ArrowRight } from 'lucide-react';
import alphabetData from '@/data/alphabet.json';
import { AlphabetData } from '@/types/data-types';

export function AlphabetContent() {
  const { alphabet, specialCharacters, spellingWords } = alphabetData as AlphabetData;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Alphabet</h1>
        <div className="flex items-center space-x-2">
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Alphabet Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Master the French alphabet and its unique pronunciation. The French alphabet has 26 letters, just like English, but with different sounds and special characters.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm font-medium">Alphabet Tip</p>
              <p className="text-sm text-muted-foreground">
                French letters are pronounced differently than English. Practice each letter sound carefully.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">The French Alphabet</h2>
        <p className="text-muted-foreground mb-6">
          Here are all 26 letters of the French alphabet with their pronunciation:
        </p>

        <div className="my-6">
          <LazyCardGrid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4" staggerDelay={50}>
            {alphabet.map((letter, index) => (
              <div key={index} className="universal-card p-4 rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-2xl">{letter.letter}</h3>
                  <AudioButton 
                    text={letter.pronunciation} 
                    size="sm" 
                    tooltipContent="Click to hear pronunciation"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{letter.pronunciation}</p>
              </div>
            ))}
          </LazyCardGrid>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Special Characters</h2>
        <p className="text-muted-foreground mb-6">
          French has special characters called diacritics that change pronunciation:
        </p>

        <div className="my-6">
          <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" staggerDelay={100}>
            {specialCharacters.map((char, index) => (
              <div key={index} className="universal-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-2xl">{char.character}</h3>
                  <AudioButton 
                    text={char.character} 
                    size="sm" 
                    tooltipContent="Click to hear pronunciation"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{char.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{char.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {char.name}
                </Badge>
              </div>
            ))}
          </LazyCardGrid>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Spelling Practice</h2>
        <p className="text-muted-foreground mb-6">
          Practice spelling common French words using the alphabet:
        </p>

        <div className="my-6">
          <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={150}>
            {spellingWords.map((word, index) => (
              <div key={index} className="universal-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{word.word}</h3>
                  <AudioButton 
                    text={word.word} 
                    size="sm" 
                    tooltipContent="Click to hear pronunciation"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{word.word}</p>
                <div className="flex flex-wrap gap-1">
                  {word.spelling.split('-').map((letter, letterIndex) => (
                    <Badge key={letterIndex} variant="outline" className="text-xs">
                      {letter}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </LazyCardGrid>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Practice?</h3>
          <p className="text-muted-foreground mb-4">
            Test your knowledge of the French alphabet with our interactive exercises.
          </p>
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Alphabet Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
