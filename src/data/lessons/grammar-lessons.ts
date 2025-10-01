import grammarData from '@/data/grammar.json';

// Helper function to create grammar lessons from JSON
function createArticlesLesson() {
  const definite = grammarData.articles.definite;
  const indefinite = grammarData.articles.indefinite;

  return {
    id: 'articles',
    uniqueId: `lesson_${Date.now()}_articles`,
    title: 'Articles (le, la, les)',
    description: 'Master French definite and indefinite articles',
    duration: 20,
    difficulty: 'medium' as const,
    xpReward: 100,
    sections: [
      {
        title: 'Introduction to Articles',
        type: 'introduction' as const,
        duration: 3,
        content: 'French articles are essential for proper sentence structure. Articles must agree with the gender (masculine/feminine) and number (singular/plural) of the nouns they modify.',
        examples: []
      },
      {
        title: 'Definite Articles',
        type: 'learning' as const,
        duration: 5,
        content: 'Definite articles (le, la, les, l\') are used when referring to specific or known things, similar to "the" in English.',
        examples: definite.map(item => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation,
          description: item.example
        }))
      },
      {
        title: 'Indefinite Articles',
        type: 'learning' as const,
        duration: 5,
        content: 'Indefinite articles (un, une, des) are used when referring to non-specific things, similar to "a/an" and "some" in English.',
        examples: indefinite.map(item => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation,
          description: item.example
        }))
      },
      {
        title: 'Practice',
        type: 'practice' as const,
        duration: 5,
        content: 'Test your understanding of French articles!',
        exercises: [
          {
            type: 'translation' as const,
            question: 'Which article means "the" for masculine singular nouns?',
            options: ['le', 'la', 'un', 'une'],
            correctAnswer: 0,
            explanation: '"le" is the definite article for masculine singular nouns. Example: le chat (the cat)'
          },
          {
            type: 'translation' as const,
            question: 'Which article means "the" for feminine singular nouns?',
            options: ['la', 'le', 'une', 'les'],
            correctAnswer: 0,
            explanation: '"la" is the definite article for feminine singular nouns. Example: la maison (the house)'
          },
          {
            type: 'translation' as const,
            question: 'Which article is used for "a/an" with masculine nouns?',
            options: ['un', 'une', 'le', 'des'],
            correctAnswer: 0,
            explanation: '"un" is the indefinite article for masculine nouns. Example: un livre (a book)'
          },
          {
            type: 'translation' as const,
            question: 'Which article means "the" for plural nouns?',
            options: ['les', 'des', 'le', 'la'],
            correctAnswer: 0,
            explanation: '"les" is the definite article for plural nouns (both genders). Example: les enfants (the children)'
          },
          {
            type: 'translation' as const,
            question: 'Complete: ___ école (the school)',
            options: ["l'", 'la', 'le', 'une'],
            correctAnswer: 0,
            explanation: '"l\'" is used before words starting with a vowel. Example: l\'école (the school)'
          }
        ]
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: 'Excellent work! You now understand French articles. Remember: le (masc.), la (fem.), les (plural), l\' (before vowels), and un/une/des for indefinite articles.',
        examples: []
      }
    ]
  };
}

function createPresentTenseLesson() {
  const etre = grammarData.verbs.etre;
  const avoir = grammarData.verbs.avoir;

  return {
    id: 'present-tense',
    uniqueId: `lesson_${Date.now()}_present_tense`,
    title: 'Present Tense Verbs',
    description: 'Master the two most important French verbs: être (to be) and avoir (to have)',
    duration: 35,
    difficulty: 'hard' as const,
    xpReward: 150,
    sections: [
      {
        title: 'Introduction',
        type: 'introduction' as const,
        duration: 3,
        content: 'The verbs être (to be) and avoir (to have) are the most important verbs in French. They are irregular and must be memorized.',
        examples: []
      },
      {
        title: 'Être (To Be)',
        type: 'learning' as const,
        duration: 10,
        content: `The verb "${etre.infinitive}" means "${etre.english}". It's used to describe states, identities, and professions.`,
        examples: etre.conjugations.map(conj => ({
          french: `${conj.pronoun} ${conj.french}`,
          english: `${conj.pronoun} ${conj.english}`,
          pronunciation: conj.pronunciation,
          description: `Example: ${conj.pronoun} ${conj.french} ${conj.pronoun === 'je' ? 'étudiant' : conj.pronoun === 'tu' ? 'fatigué' : conj.pronoun === 'il/elle' ? 'français(e)' : conj.pronoun === 'nous' ? 'amis' : conj.pronoun === 'vous' ? 'professeur' : 'contents'}`
        }))
      },
      {
        title: 'Avoir (To Have)',
        type: 'learning' as const,
        duration: 10,
        content: `The verb "${avoir.infinitive}" means "${avoir.english}". It's used to express possession and age.`,
        examples: avoir.conjugations.map(conj => ({
          french: `${conj.pronoun} ${conj.french}`,
          english: `${conj.pronoun} ${conj.english}`,
          pronunciation: conj.pronunciation,
          description: `Example: ${conj.pronoun} ${conj.french} ${conj.pronoun === 'je' ? 'un chat' : conj.pronoun === 'tu' ? 'un livre' : conj.pronoun === 'il/elle' ? 'une voiture' : conj.pronoun === 'nous' ? 'des amis' : conj.pronoun === 'vous' ? 'raison' : 'faim'}`
        }))
      },
      {
        title: 'Practice',
        type: 'practice' as const,
        duration: 10,
        content: 'Test your conjugation skills!',
        exercises: [
          {
            type: 'translation' as const,
            question: 'Conjugate "être" with "je" (I am)',
            options: ['je suis', 'je es', "j'ai", 'je sommes'],
            correctAnswer: 0,
            explanation: '"je suis" means "I am". Example: Je suis étudiant (I am a student)'
          },
          {
            type: 'translation' as const,
            question: 'Conjugate "avoir" with "tu" (you have)',
            options: ['tu as', 'tu es', 'tu ai', 'tu suis'],
            correctAnswer: 0,
            explanation: '"tu as" means "you have". Example: Tu as un livre (You have a book)'
          },
          {
            type: 'translation' as const,
            question: 'Conjugate "être" with "nous" (we are)',
            options: ['nous sommes', 'nous suis', 'nous êtes', 'nous avons'],
            correctAnswer: 0,
            explanation: '"nous sommes" means "we are". Example: Nous sommes amis (We are friends)'
          },
          {
            type: 'translation' as const,
            question: 'Conjugate "avoir" with "ils" (they have)',
            options: ['ils ont', 'ils sont', 'ils avez', 'ils as'],
            correctAnswer: 0,
            explanation: '"ils ont" means "they have". Example: Ils ont faim (They are hungry)'
          },
          {
            type: 'translation' as const,
            question: 'How do you say "I am 25 years old" in French?',
            options: ["J'ai 25 ans", 'Je suis 25 ans', 'Je ai 25 années', 'Je suis 25 années'],
            correctAnswer: 0,
            explanation: 'In French, you use "avoir" (to have) for age: J\'ai 25 ans (literally "I have 25 years")'
          }
        ]
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: 'Fantastic! You\'ve mastered the conjugations of être and avoir. These are fundamental verbs you\'ll use every day in French!',
        examples: []
      }
    ]
  };
}

function createGenderAgreementLesson() {
  return {
    id: 'gender-agreement',
    uniqueId: `lesson_${Date.now()}_gender_agreement`,
    title: 'Gender Agreement',
    description: 'Understand masculine and feminine noun agreement in French',
    duration: 25,
    difficulty: 'medium' as const,
    xpReward: 125,
    sections: [
      {
        title: 'Introduction to Gender',
        type: 'introduction' as const,
        duration: 5,
        content: 'In French, all nouns have a gender: masculine or feminine. Adjectives, articles, and pronouns must agree with the noun\'s gender and number.',
        examples: []
      },
      {
        title: 'Masculine vs Feminine',
        type: 'learning' as const,
        duration: 10,
        content: 'Learn how to identify and use masculine and feminine nouns correctly.',
        examples: [
          {
            french: 'le garçon - la fille',
            english: 'the boy - the girl',
            pronunciation: 'luh gar-sohn - lah fee',
            description: 'Masculine vs Feminine: Most feminine nouns end in -e'
          },
          {
            french: 'un homme grand - une femme grande',
            english: 'a tall man - a tall woman',
            pronunciation: 'uhn om grahn - oon fam grahnd',
            description: 'Adjectives must agree: add -e for feminine'
          },
          {
            french: 'le chat noir - la voiture noire',
            english: 'the black cat - the black car',
            pronunciation: 'luh sha nwar - lah vwa-toor nwar',
            description: 'Agreement example: noir → noire'
          },
          {
            french: 'un livre intéressant - une histoire intéressante',
            english: 'an interesting book - an interesting story',
            pronunciation: 'uhn leevr an-tay-reh-sahn - oon ees-twar an-tay-reh-sahnt',
            description: 'Add -e for feminine adjectives'
          }
        ]
      },
      {
        title: 'Practice',
        type: 'practice' as const,
        duration: 8,
        content: 'Test your understanding of gender agreement!',
        exercises: [
          {
            type: 'translation' as const,
            question: 'Which is correct: "a tall man"?',
            options: ['un homme grand', 'une homme grand', 'un homme grande', 'une homme grande'],
            correctAnswer: 0,
            explanation: '"un homme grand" - homme is masculine, so we use "un" (not "une") and "grand" (not "grande")'
          },
          {
            type: 'translation' as const,
            question: 'Which is correct: "a tall woman"?',
            options: ['une femme grande', 'un femme grande', 'une femme grand', 'un femme grand'],
            correctAnswer: 0,
            explanation: '"une femme grande" - femme is feminine, so we use "une" and add -e to "grand" → "grande"'
          },
          {
            type: 'translation' as const,
            question: 'Which is correct: "the black car" (la voiture)?',
            options: ['la voiture noire', 'le voiture noir', 'la voiture noir', 'le voiture noire'],
            correctAnswer: 0,
            explanation: '"la voiture noire" - voiture is feminine, so we use "la" and "noire" (with -e)'
          }
        ]
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: 'Great work! Remember: French nouns have gender, and adjectives must agree by adding -e for feminine forms.',
        examples: []
      }
    ]
  };
}

export const grammarLessons = {
  'articles': createArticlesLesson(),
  'present-tense': createPresentTenseLesson(),
  'gender-agreement': createGenderAgreementLesson(),
};

