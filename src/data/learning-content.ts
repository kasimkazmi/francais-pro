import { Module } from '@/types';

export const learningModules: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Start your French journey with the basics',
    color: 'bg-blue-500',
    icon: 'BookOpen',
    progress: 50,
    lessons: [
      {
        id: 'french-alphabet',
        title: 'French Alphabet & Pronunciation',
        description: 'Master the French alphabet with interactive pronunciation practice',
        content: `
# French Alphabet & Pronunciation

## Introduction
The French alphabet has 26 letters, just like English, but with unique pronunciations that are essential for proper French communication.

## The French Alphabet
**A** (ah) - **B** (bay) - **C** (say) - **D** (day) - **E** (uh) - **F** (eff) - **G** (zhay) - **H** (ahsh) - **I** (ee) - **J** (zhee) - **K** (kah) - **L** (ell) - **M** (em) - **N** (en) - **O** (oh) - **P** (pay) - **Q** (koo) - **R** (air) - **S** (ess) - **T** (tay) - **U** (oo) - **V** (vay) - **W** (doo-bluh-vay) - **X** (eeks) - **Y** (ee-grek) - **Z** (zed)

## Key Pronunciation Rules
1. **Silent Letters**: Many letters are silent at the end of words
2. **Accent Marks**: Change pronunciation and meaning
3. **Nasal Sounds**: Unique to French (an, en, in, on, un)
4. **R Sound**: Guttural 'r' sound from the back of the throat

## Practice Words
- **Bonjour** (bohn-ZHOOR) - Hello
- **Merci** (mer-SEE) - Thank you
- **Français** (frahn-SAY) - French
- **École** (ay-KOL) - School
- **Répéter** (ray-pay-TAY) - To repeat

## Interactive Exercises
1. Listen to each letter pronunciation
2. Practice saying the alphabet aloud
3. Identify letters in French words
4. Match letters to their sounds
        `,
        duration: 20,
        difficulty: 'easy',
        type: 'pronunciation',
        completed: true,
        xpReward: 75
      },
      {
        id: 'basic-greetings',
        title: 'Basic Greetings',
        description: 'Master essential French greetings and polite expressions',
        content: `
# Basic French Greetings

## Essential Greetings

### Formal Greetings
- **Bonjour** (bohn-ZHOOR) - Hello/Good morning/Good afternoon
- **Bonsoir** (bohn-SWAHR) - Good evening
- **Bonne nuit** (bohn NWEE) - Good night
- **Au revoir** (oh ruh-VWAHR) - Goodbye

### Informal Greetings
- **Salut** (sah-LOO) - Hi/Bye (casual)
- **Coucou** (koo-KOO) - Hey (very casual)
- **À bientôt** (ah bee-ahn-TOH) - See you soon
- **À plus tard** (ah ploo TAHR) - See you later

## Polite Expressions
- **S'il vous plaît** (seel voo PLAY) - Please
- **Merci** (mer-SEE) - Thank you
- **Merci beaucoup** (mer-SEE boh-KOO) - Thank you very much
- **De rien** (duh ree-AHN) - You're welcome
- **Excusez-moi** (eks-koo-zay MWAH) - Excuse me
- **Pardon** (par-DOHN) - Sorry/Pardon

## Time-Specific Greetings
- **Bonjour** - Used from morning until evening (6 AM - 6 PM)
- **Bonsoir** - Used from evening until night (6 PM - midnight)
- **Bonne nuit** - Used when going to bed

## Cultural Notes
- French people often greet with a kiss on both cheeks (la bise)
- Always use "Bonjour" when entering a shop or restaurant
- "Salut" is only used with friends and family
- "Coucou" is very informal and playful

## Practice Conversations

### Conversation 1: Meeting Someone New
**A:** Bonjour! Comment allez-vous?
**B:** Bonjour! Ça va bien, merci. Et vous?
**A:** Très bien, merci!

### Conversation 2: Casual Greeting
**A:** Salut! Ça va?
**B:** Salut! Oui, ça va bien. Et toi?
**A:** Ça va, merci!

## Interactive Exercises
1. Practice pronunciation with audio
2. Role-play greeting scenarios
3. Match French greetings to English
4. Complete greeting conversations
        `,
        duration: 25,
        difficulty: 'easy',
        type: 'vocabulary',
        completed: true,
        xpReward: 100
      },
      {
        id: 'numbers-1-20',
        title: 'Numbers 1-20',
        description: 'Master French numbers from 1 to 20 with interactive practice',
        content: `
# French Numbers 1-20

## Basic Numbers (1-10)
1. **un** (uhn) - one
2. **deux** (duh) - two
3. **trois** (trwah) - three
4. **quatre** (KAH-truh) - four
5. **cinq** (sank) - five
6. **six** (sees) - six
7. **sept** (set) - seven
8. **huit** (weet) - eight
9. **neuf** (nuhf) - nine
10. **dix** (dees) - ten

## Numbers 11-20
11. **onze** (ohnz) - eleven
12. **douze** (dooz) - twelve
13. **treize** (trehz) - thirteen
14. **quatorze** (kah-TORZ) - fourteen
15. **quinze** (kans) - fifteen
16. **seize** (sehz) - sixteen
17. **dix-sept** (dees-SET) - seventeen
18. **dix-huit** (dees-WEET) - eighteen
19. **dix-neuf** (dees-NUHF) - nineteen
20. **vingt** (van) - twenty

## Pronunciation Tips
- **"un"** sounds like "uhn" (not "one")
- **"deux"** has a silent 'x' at the end
- **"trois"** has a silent 's' at the end
- **"quatre"** - the 'r' is pronounced
- **"cinq"** - the 'q' is silent
- **"six"** and **"dix"** - the 'x' is silent
- **"huit"** - the 'h' is silent
- **"vingt"** - the 'g' and 't' are silent

## Number Patterns
- Numbers 17-19 follow the pattern: **dix + number**
- **dix-sept** = 10 + 7
- **dix-huit** = 10 + 8
- **dix-neuf** = 10 + 9

## Practical Usage
- **Age**: J'ai vingt ans (I am 20 years old)
- **Counting**: Un, deux, trois... (One, two, three...)
- **Phone numbers**: Mon numéro est... (My number is...)
- **Time**: Il est deux heures (It's 2 o'clock)

## Interactive Exercises
1. Listen and repeat each number
2. Count from 1 to 20 in French
3. Practice saying your age in French
4. Match French numbers to English
5. Complete number sequences
6. Practice phone number pronunciation

## Memory Tips
- **Visual**: Imagine the numbers in your head
- **Rhythm**: Count with a rhythm or song
- **Association**: Link numbers to familiar objects
- **Repetition**: Practice daily for better retention
        `,
        duration: 30,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 125
      },
      {
        id: 'colors-family',
        title: 'Colors & Family',
        description: 'Master colors and family member vocabulary with cultural context',
        content: `
# Colors & Family in French

## Colors (Les Couleurs)

### Basic Colors
- **rouge** (roozh) - red
- **bleu** (bluh) - blue
- **vert** (vair) - green
- **jaune** (zhohn) - yellow
- **noir** (nwahr) - black
- **blanc** (blahn) - white
- **gris** (gree) - gray
- **marron** (mah-ROHN) - brown
- **rose** (rohz) - pink
- **orange** (oh-RAHNZH) - orange
- **violet** (vee-oh-LAY) - purple

### Color Agreement
Colors agree with the noun they describe:
- **une voiture rouge** (a red car) - feminine
- **un livre rouge** (a red book) - masculine
- **des fleurs rouges** (red flowers) - plural

### Special Cases
- **bleu** becomes **bleue** for feminine
- **blanc** becomes **blanche** for feminine
- **gris** becomes **grise** for feminine

## Family Members (La Famille)

### Immediate Family
- **père** (pair) - father
- **mère** (mair) - mother
- **fils** (fees) - son
- **fille** (fee-yuh) - daughter
- **frère** (frair) - brother
- **sœur** (suhr) - sister

### Extended Family
- **grand-père** (grahn-PAIR) - grandfather
- **grand-mère** (grahn-MAIR) - grandmother
- **oncle** (ohn-kluh) - uncle
- **tante** (tahnt) - aunt
- **cousin** (koo-ZAN) - cousin (male)
- **cousine** (koo-ZEEN) - cousin (female)
- **neveu** (nuh-VUH) - nephew
- **nièce** (nee-ESS) - niece

### Family Relationships
- **mari** (mah-REE) - husband
- **femme** (fahm) - wife
- **époux** (ay-POO) - spouse (male)
- **épouse** (ay-POOZ) - spouse (female)
- **beau-père** (boh-PAIR) - stepfather/father-in-law
- **belle-mère** (bell-MAIR) - stepmother/mother-in-law

## Cultural Context

### French Family Values
- Family is very important in French culture
- Extended family often lives close together
- Sunday family meals are common traditions
- Respect for elders is emphasized

### Family Terms of Endearment
- **mon chéri** (mohn shay-REE) - my dear (to a man)
- **ma chérie** (mah shay-REE) - my dear (to a woman)
- **mon amour** (mohn ah-MOOR) - my love
- **mon bébé** (mohn bay-BAY) - my baby

## Practice Sentences

### Colors
- **J'aime la couleur rouge** (I like the color red)
- **Ma voiture est bleue** (My car is blue)
- **Les fleurs sont jaunes** (The flowers are yellow)
- **Il porte un t-shirt vert** (He's wearing a green t-shirt)

### Family
- **Voici ma famille** (Here is my family)
- **Mon père s'appelle Jean** (My father's name is Jean)
- **J'ai deux sœurs** (I have two sisters)
- **Mes grands-parents habitent à Paris** (My grandparents live in Paris)

## Interactive Exercises
1. Match colors to their French names
2. Practice family member vocabulary
3. Describe your family in French
4. Identify colors in pictures
5. Complete family tree exercises
6. Practice color agreement rules
7. Role-play family introductions

## Memory Techniques
- **Visual Association**: Link colors to familiar objects
- **Family Tree**: Draw your family tree in French
- **Color Coding**: Use colored flashcards for vocabulary
- **Storytelling**: Create stories using family and color vocabulary
        `,
        duration: 35,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 150
      }
    ]
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master French grammar fundamentals',
    color: 'bg-green-500',
    icon: 'BookOpen',
    progress: 0,
    lessons: [
      {
        id: 'articles',
        title: 'Articles (le, la, les)',
        description: 'Master French definite and indefinite articles with practical examples',
        content: `
# French Articles: le, la, les, un, une, des

## Definite Articles (The)

### Singular Definite Articles
- **le** (luh) - masculine singular
- **la** (lah) - feminine singular
- **l'** (l) - used before vowels or silent 'h'

### Plural Definite Article
- **les** (lay) - plural (both masculine and feminine)

### Examples
- **le livre** (the book) - masculine
- **la table** (the table) - feminine
- **l'école** (the school) - vowel
- **l'homme** (the man) - silent 'h'
- **les livres** (the books) - plural
- **les tables** (the tables) - plural

## Indefinite Articles (A/An/Some)

### Singular Indefinite Articles
- **un** (uhn) - masculine singular
- **une** (oon) - feminine singular

### Plural Indefinite Article
- **des** (day) - plural (both masculine and feminine)

### Examples
- **un livre** (a book) - masculine
- **une table** (a table) - feminine
- **des livres** (some books) - plural
- **des tables** (some tables) - plural

## Gender Rules

### Masculine Nouns (use le/un)
- Most nouns ending in consonants
- Days of the week: **le lundi** (Monday)
- Months: **le janvier** (January)
- Languages: **le français** (French)
- Trees: **le chêne** (oak tree)
- Metals: **le fer** (iron)

### Feminine Nouns (use la/une)
- Most nouns ending in -e
- Most nouns ending in -tion, -sion
- Most nouns ending in -té, -ité
- Fruits: **la pomme** (apple)
- Sciences: **la chimie** (chemistry)
- Abstract concepts: **la liberté** (freedom)

## Contractions

### With Prepositions
- **à + le = au** (to the)
- **à + les = aux** (to the)
- **de + le = du** (of the)
- **de + les = des** (of the)

### Examples
- **Je vais au cinéma** (I go to the cinema)
- **Je vais aux États-Unis** (I go to the United States)
- **Le livre du professeur** (The teacher's book)
- **Les livres des étudiants** (The students' books)

## Special Cases

### No Article
- **J'aime le français** (I like French) - with languages
- **Il est professeur** (He is a teacher) - with professions
- **C'est lundi** (It's Monday) - with days

### Partitive Articles (Some)
- **du** (masculine) - **Je mange du pain** (I eat some bread)
- **de la** (feminine) - **Je bois de l'eau** (I drink some water)
- **des** (plural) - **Je mange des pommes** (I eat some apples)

## Practice Exercises

### Exercise 1: Choose the correct article
1. ___ livre (the book)
2. ___ table (a table)
3. ___ école (the school)
4. ___ pommes (some apples)
5. ___ homme (a man)

### Exercise 2: Complete with contractions
1. Je vais ___ cinéma (to the cinema)
2. Le livre ___ professeur (of the teacher)
3. Je vais ___ États-Unis (to the United States)
4. La voiture ___ garçon (of the boy)

## Common Mistakes to Avoid
- Don't use articles with proper nouns: **Paris** (not **le Paris**)
- Don't use articles with languages when expressing preference: **J'aime le français** (not **J'aime français**)
- Remember contractions with prepositions
- Pay attention to gender agreement

## Interactive Practice
1. Identify the gender of nouns
2. Choose correct articles
3. Practice contractions
4. Complete sentences with articles
5. Translate from English to French
6. Identify article errors
        `,
        duration: 25,
        difficulty: 'medium',
        type: 'grammar',
        completed: false,
        xpReward: 125
      },
      {
        id: 'present-tense',
        title: 'Present Tense Verbs',
        description: 'Master regular and irregular present tense verb conjugations',
        content: `
# French Present Tense Verbs

## Regular Verbs (-ER verbs)

### Conjugation Pattern: parler (to speak)
- **je parle** (zhuh parl) - I speak
- **tu parles** (too parl) - you speak (informal)
- **il/elle parle** (eel/ell parl) - he/she speaks
- **nous parlons** (noo par-LOHN) - we speak
- **vous parlez** (voo par-LAY) - you speak (formal/plural)
- **ils/elles parlent** (eel/ell parl) - they speak

### Common -ER Verbs
- **aimer** (ay-MAY) - to like/love
- **manger** (mahn-ZHAY) - to eat
- **regarder** (ruh-gar-DAY) - to watch
- **écouter** (ay-koo-TAY) - to listen
- **habiter** (ah-bee-TAY) - to live
- **travailler** (trah-vah-YAY) - to work
- **étudier** (ay-too-dee-YAY) - to study

## Regular Verbs (-IR verbs)

### Conjugation Pattern: finir (to finish)
- **je finis** (zhuh fee-NEE) - I finish
- **tu finis** (too fee-NEE) - you finish
- **il/elle finit** (eel/ell fee-NEE) - he/she finishes
- **nous finissons** (noo fee-nee-SOHN) - we finish
- **vous finissez** (voo fee-nee-SAY) - you finish
- **ils/elles finissent** (eel/ell fee-NEES) - they finish

### Common -IR Verbs
- **choisir** (shwah-ZEER) - to choose
- **réussir** (ray-oo-SEER) - to succeed
- **grandir** (grahn-DEER) - to grow
- **réfléchir** (ray-flay-SHEER) - to think/reflect

## Regular Verbs (-RE verbs)

### Conjugation Pattern: vendre (to sell)
- **je vends** (zhuh vahn) - I sell
- **tu vends** (too vahn) - you sell
- **il/elle vend** (eel/ell vahn) - he/she sells
- **nous vendons** (noo vahn-DOHN) - we sell
- **vous vendez** (voo vahn-DAY) - you sell
- **ils/elles vendent** (eel/ell vahnd) - they sell

### Common -RE Verbs
- **attendre** (ah-TAHN-druh) - to wait
- **répondre** (ray-POHN-druh) - to answer
- **perdre** (pair-druh) - to lose
- **entendre** (ahn-TAHN-druh) - to hear

## Irregular Verbs

### Être (to be)
- **je suis** (zhuh swee) - I am
- **tu es** (too ay) - you are
- **il/elle est** (eel/ell ay) - he/she is
- **nous sommes** (noo sohm) - we are
- **vous êtes** (voo zet) - you are
- **ils/elles sont** (eel/ell sohn) - they are

### Avoir (to have)
- **j'ai** (zhay) - I have
- **tu as** (too ah) - you have
- **il/elle a** (eel/ell ah) - he/she has
- **nous avons** (noo ah-VOHN) - we have
- **vous avez** (voo ah-VAY) - you have
- **ils/elles ont** (eel/ell ohn) - they have

### Aller (to go)
- **je vais** (zhuh vay) - I go
- **tu vas** (too vah) - you go
- **il/elle va** (eel/ell vah) - he/she goes
- **nous allons** (noo ah-LOHN) - we go
- **vous allez** (voo ah-LAY) - you go
- **ils/elles vont** (eel/ell vohn) - they go

### Faire (to do/make)
- **je fais** (zhuh fay) - I do/make
- **tu fais** (too fay) - you do/make
- **il/elle fait** (eel/ell fay) - he/she does/makes
- **nous faisons** (noo fay-ZOHN) - we do/make
- **vous faites** (voo fet) - you do/make
- **ils/elles font** (eel/ell fohn) - they do/make

## Usage Examples

### Regular Verbs
- **Je mange une pomme** (I eat an apple)
- **Tu regardes la télévision** (You watch television)
- **Il habite à Paris** (He lives in Paris)
- **Nous étudions le français** (We study French)

### Irregular Verbs
- **Je suis étudiant** (I am a student)
- **Tu as un livre** (You have a book)
- **Il va au cinéma** (He goes to the cinema)
- **Nous faisons nos devoirs** (We do our homework)

## Common Expressions

### With Être
- **Je suis content(e)** (I am happy)
- **Il est professeur** (He is a teacher)
- **Nous sommes français** (We are French)

### With Avoir
- **J'ai faim** (I am hungry)
- **Tu as soif** (You are thirsty)
- **Il a raison** (He is right)

### With Aller
- **Je vais bien** (I am doing well)
- **Comment allez-vous?** (How are you?)
- **Ça va** (It's going well)

## Practice Exercises

### Exercise 1: Conjugate the verbs
1. Je ___ (manger) une pizza
2. Tu ___ (habiter) où?
3. Il ___ (être) français
4. Nous ___ (avoir) un chien
5. Vous ___ (aller) au restaurant

### Exercise 2: Choose the correct form
1. Je (suis/ai) étudiant
2. Tu (vas/va) à l'école
3. Il (fait/fais) ses devoirs
4. Nous (sommes/avons) contents
5. Elles (sont/ont) françaises

## Tips for Learning
- Practice conjugations daily
- Learn irregular verbs by heart
- Use verbs in context, not in isolation
- Pay attention to pronunciation
- Practice with native speakers when possible
        `,
        duration: 40,
        difficulty: 'hard',
        type: 'grammar',
        completed: false,
        xpReward: 175
      },
      {
        id: 'gender-agreement',
        title: 'Gender Agreement',
        description: 'Understand masculine and feminine noun agreement',
        content: 'French nouns have gender, and adjectives must agree...',
        duration: 25,
        difficulty: 'medium',
        type: 'grammar',
        completed: false,
        xpReward: 125
      }
    ]
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Expand your French vocabulary',
    color: 'bg-purple-500',
    icon: 'BookOpen',
    progress: 0,
    lessons: [
      {
        id: 'food-drinks',
        title: 'Food & Drinks',
        description: 'Master French food and beverage vocabulary with cultural context',
        content: `
# French Food & Drinks Vocabulary

## Basic Foods

### Fruits (Les Fruits)
- **pomme** (pohm) - apple
- **banane** (bah-NAHN) - banana
- **orange** (oh-RAHNZH) - orange
- **fraise** (frehz) - strawberry
- **raisin** (ray-ZAN) - grape
- **cerise** (suh-REEZ) - cherry
- **pêche** (pesh) - peach
- **poire** (pwahr) - pear

### Vegetables (Les Légumes)
- **carotte** (kah-ROHT) - carrot
- **tomate** (toh-MAHT) - tomato
- **pomme de terre** (pohm duh TAIR) - potato
- **oignon** (wah-NYOHN) - onion
- **salade** (sah-LAHD) - lettuce/salad
- **concombre** (kohn-KOHN-bruh) - cucumber
- **brocoli** (broh-koh-LEE) - broccoli
- **épinard** (ay-pee-NAHR) - spinach

### Meat & Protein (La Viande)
- **poulet** (poo-LAY) - chicken
- **bœuf** (buhf) - beef
- **porc** (pohr) - pork
- **agneau** (ah-NYOH) - lamb
- **poisson** (pwah-SOHN) - fish
- **œuf** (uhf) - egg
- **fromage** (froh-MAHZH) - cheese
- **jambon** (zhahn-BOHN) - ham

## Beverages (Les Boissons)

### Hot Drinks
- **café** (kah-FAY) - coffee
- **thé** (tay) - tea
- **chocolat chaud** (shoh-koh-LAH shoh) - hot chocolate
- **café au lait** (kah-FAY oh lay) - coffee with milk

### Cold Drinks
- **eau** (oh) - water
- **jus** (zhoo) - juice
- **jus d'orange** (zhoo doh-RAHNZH) - orange juice
- **limonade** (lee-moh-NAHD) - lemonade
- **soda** (soh-DAH) - soda
- **bière** (bee-AIR) - beer
- **vin** (van) - wine

## French Cuisine Specialties

### Traditional Dishes
- **croissant** (krwah-SAHN) - croissant
- **baguette** (bah-GET) - French bread
- **crêpe** (krep) - pancake
- **quiche** (keesh) - quiche
- **ratatouille** (rah-tah-TOO-ee) - ratatouille
- **coq au vin** (kohk oh van) - chicken in wine
- **bouillabaisse** (boo-yah-BESS) - fish stew
- **cassoulet** (kah-soo-LAY) - bean stew

### Desserts
- **tarte** (tahrt) - tart
- **gâteau** (gah-TOH) - cake
- **glace** (glahs) - ice cream
- **mousse au chocolat** (moos oh shoh-koh-LAH) - chocolate mousse
- **crème brûlée** (krem broo-LAY) - crème brûlée
- **macaron** (mah-kah-ROHN) - macaron
- **éclair** (ay-KLAIR) - éclair

## Meals & Dining

### Meal Times
- **petit-déjeuner** (puh-tee day-zhuh-NAY) - breakfast
- **déjeuner** (day-zhuh-NAY) - lunch
- **dîner** (dee-NAY) - dinner
- **goûter** (goo-TAY) - afternoon snack

### Dining Vocabulary
- **restaurant** (res-toh-RAHN) - restaurant
- **menu** (muh-NOO) - menu
- **serveur/serveuse** (ser-VUHR/ser-VUHZ) - waiter/waitress
- **addition** (ah-dee-SYOHN) - bill
- **pourboire** (poor-BWAHR) - tip
- **table** (TAH-bluh) - table
- **chaise** (shehz) - chair

## Cooking Terms

### Basic Cooking
- **cuire** (kweer) - to cook
- **bouillir** (boo-YEER) - to boil
- **frire** (freer) - to fry
- **griller** (gree-YAY) - to grill
- **mélanger** (may-lahn-ZHAY) - to mix
- **couper** (koo-PAY) - to cut
- **éplucher** (ay-ploo-SHAY) - to peel

### Kitchen Utensils
- **couteau** (koo-TOH) - knife
- **fourchette** (foor-SHET) - fork
- **cuillère** (kwee-YAIR) - spoon
- **assiette** (ah-see-ET) - plate
- **verre** (vair) - glass
- **tasse** (tahs) - cup
- **poêle** (pwah-el) - pan

## Cultural Context

### French Dining Etiquette
- **Bon appétit!** (bohn ah-pay-TEE) - Enjoy your meal!
- **À votre santé!** (ah voh-truh sahn-TAY) - To your health! (cheers)
- **S'il vous plaît** (seel voo PLAY) - Please
- **Merci** (mer-SEE) - Thank you

### French Food Culture
- French people take time to enjoy their meals
- Lunch is often the main meal of the day
- Wine is commonly served with meals
- Fresh, local ingredients are highly valued
- Meals are social occasions

## Practice Sentences

### Ordering Food
- **Je voudrais un café, s'il vous plaît** (I would like a coffee, please)
- **L'addition, s'il vous plaît** (The bill, please)
- **C'est délicieux!** (It's delicious!)
- **J'ai faim** (I am hungry)
- **J'ai soif** (I am thirsty)

### Describing Food
- **C'est bon** (It's good)
- **C'est chaud** (It's hot)
- **C'est froid** (It's cold)
- **C'est sucré** (It's sweet)
- **C'est salé** (It's salty)

## Interactive Exercises
1. Match French food words to pictures
2. Practice ordering in a restaurant
3. Describe your favorite foods
4. Learn about French regional specialties
5. Practice cooking vocabulary
6. Role-play dining scenarios
7. Identify ingredients in French recipes

## Memory Tips
- **Visual Association**: Link foods to their French names
- **Taste Memory**: Associate tastes with French words
- **Cultural Context**: Learn about French food traditions
- **Practice**: Use food vocabulary in daily conversations
        `,
        duration: 35,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 150
      },
      {
        id: 'travel-transport',
        title: 'Travel & Transportation',
        description: 'Essential vocabulary for traveling in French-speaking countries',
        content: 'Planning a trip to France? Learn the essential travel vocabulary...',
        duration: 25,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 100
      },
      {
        id: 'work-professions',
        title: 'Work & Professions',
        description: 'Learn job-related vocabulary and professional terms',
        content: 'Expand your professional French vocabulary...',
        duration: 35,
        difficulty: 'hard',
        type: 'vocabulary',
        completed: false,
        xpReward: 150
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'Apply what you\'ve learned',
    color: 'bg-orange-500',
    icon: 'Play',
    progress: 0,
    lessons: [
      {
        id: 'speaking-exercises',
        title: 'Speaking Exercises',
        description: 'Practice pronunciation and speaking skills',
        content: 'Improve your French speaking skills with interactive exercises...',
        duration: 20,
        difficulty: 'medium',
        type: 'pronunciation',
        completed: false,
        xpReward: 100
      },
      {
        id: 'writing-prompts',
        title: 'Writing Prompts',
        description: 'Practice writing in French with guided prompts',
        content: 'Develop your French writing skills with structured exercises...',
        duration: 25,
        difficulty: 'hard',
        type: 'writing',
        completed: false,
        xpReward: 125
      },
      {
        id: 'listening-comprehension',
        title: 'Listening Comprehension',
        description: 'Improve your listening skills with audio exercises',
        content: 'Train your ear to understand spoken French...',
        duration: 30,
        difficulty: 'hard',
        type: 'listening',
        completed: false,
        xpReward: 150
      }
    ]
  }
];

export const vocabularyWords = [
  // Greetings & Polite Expressions
  {
    french: 'bonjour',
    english: 'hello',
    pronunciation: '/bɔ̃.ʒuʁ/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 'merci',
    english: 'thank you',
    pronunciation: '/mɛʁ.si/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 'au revoir',
    english: 'goodbye',
    pronunciation: '/o.ʁə.vwaʁ/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 's\'il vous plaît',
    english: 'please',
    pronunciation: '/sil.vu.plɛ/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 'excusez-moi',
    english: 'excuse me',
    pronunciation: '/ɛk.sky.ze.mwa/',
    category: 'greetings',
    difficulty: 'medium'
  },
  {
    french: 'pardon',
    english: 'sorry',
    pronunciation: '/paʁ.dɔ̃/',
    category: 'greetings',
    difficulty: 'easy'
  },

  // Numbers
  {
    french: 'un',
    english: 'one',
    pronunciation: '/œ̃/',
    category: 'numbers',
    difficulty: 'easy'
  },
  {
    french: 'deux',
    english: 'two',
    pronunciation: '/dø/',
    category: 'numbers',
    difficulty: 'easy'
  },
  {
    french: 'trois',
    english: 'three',
    pronunciation: '/tʁwa/',
    category: 'numbers',
    difficulty: 'easy'
  },
  {
    french: 'quatre',
    english: 'four',
    pronunciation: '/katʁ/',
    category: 'numbers',
    difficulty: 'easy'
  },
  {
    french: 'cinq',
    english: 'five',
    pronunciation: '/sɛ̃k/',
    category: 'numbers',
    difficulty: 'easy'
  },

  // Food & Drinks
  {
    french: 'pomme',
    english: 'apple',
    pronunciation: '/pɔm/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'pain',
    english: 'bread',
    pronunciation: '/pɛ̃/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'eau',
    english: 'water',
    pronunciation: '/o/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'café',
    english: 'coffee',
    pronunciation: '/ka.fe/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'lait',
    english: 'milk',
    pronunciation: '/lɛ/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'fromage',
    english: 'cheese',
    pronunciation: '/fʁɔ.maʒ/',
    category: 'food',
    difficulty: 'medium'
  },

  // Colors
  {
    french: 'rouge',
    english: 'red',
    pronunciation: '/ʁuʒ/',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    french: 'bleu',
    english: 'blue',
    pronunciation: '/blø/',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    french: 'vert',
    english: 'green',
    pronunciation: '/vɛʁ/',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    french: 'jaune',
    english: 'yellow',
    pronunciation: '/ʒon/',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    french: 'noir',
    english: 'black',
    pronunciation: '/nwaʁ/',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    french: 'blanc',
    english: 'white',
    pronunciation: '/blɑ̃/',
    category: 'colors',
    difficulty: 'easy'
  },

  // Family
  {
    french: 'père',
    english: 'father',
    pronunciation: '/pɛʁ/',
    category: 'family',
    difficulty: 'easy'
  },
  {
    french: 'mère',
    english: 'mother',
    pronunciation: '/mɛʁ/',
    category: 'family',
    difficulty: 'easy'
  },
  {
    french: 'fils',
    english: 'son',
    pronunciation: '/fis/',
    category: 'family',
    difficulty: 'easy'
  },
  {
    french: 'fille',
    english: 'daughter',
    pronunciation: '/fij/',
    category: 'family',
    difficulty: 'easy'
  },
  {
    french: 'frère',
    english: 'brother',
    pronunciation: '/fʁɛʁ/',
    category: 'family',
    difficulty: 'easy'
  },
  {
    french: 'sœur',
    english: 'sister',
    pronunciation: '/sœʁ/',
    category: 'family',
    difficulty: 'easy'
  },

  // Home & Objects
  {
    french: 'maison',
    english: 'house',
    pronunciation: '/mɛ.zɔ̃/',
    category: 'home',
    difficulty: 'medium'
  },
  {
    french: 'porte',
    english: 'door',
    pronunciation: '/pɔʁt/',
    category: 'home',
    difficulty: 'easy'
  },
  {
    french: 'fenêtre',
    english: 'window',
    pronunciation: '/fə.nɛtʁ/',
    category: 'home',
    difficulty: 'medium'
  },
  {
    french: 'table',
    english: 'table',
    pronunciation: '/tabl/',
    category: 'home',
    difficulty: 'easy'
  },
  {
    french: 'chaise',
    english: 'chair',
    pronunciation: '/ʃɛz/',
    category: 'home',
    difficulty: 'easy'
  },

  // Travel & Transportation
  {
    french: 'voyage',
    english: 'trip',
    pronunciation: '/vwa.jaʒ/',
    category: 'travel',
    difficulty: 'medium'
  },
  {
    french: 'voiture',
    english: 'car',
    pronunciation: '/vwa.tyʁ/',
    category: 'travel',
    difficulty: 'medium'
  },
  {
    french: 'train',
    english: 'train',
    pronunciation: '/tʁɛ̃/',
    category: 'travel',
    difficulty: 'easy'
  },
  {
    french: 'avion',
    english: 'airplane',
    pronunciation: '/a.vjɔ̃/',
    category: 'travel',
    difficulty: 'medium'
  },
  {
    french: 'hôtel',
    english: 'hotel',
    pronunciation: '/o.tɛl/',
    category: 'travel',
    difficulty: 'medium'
  },

  // Time & Weather
  {
    french: 'temps',
    english: 'time/weather',
    pronunciation: '/tɑ̃/',
    category: 'time',
    difficulty: 'medium'
  },
  {
    french: 'heure',
    english: 'hour',
    pronunciation: '/œʁ/',
    category: 'time',
    difficulty: 'medium'
  },
  {
    french: 'jour',
    english: 'day',
    pronunciation: '/ʒuʁ/',
    category: 'time',
    difficulty: 'easy'
  },
  {
    french: 'nuit',
    english: 'night',
    pronunciation: '/nɥi/',
    category: 'time',
    difficulty: 'easy'
  },
  {
    french: 'soleil',
    english: 'sun',
    pronunciation: '/sɔ.lɛj/',
    category: 'weather',
    difficulty: 'medium'
  },
  {
    french: 'pluie',
    english: 'rain',
    pronunciation: '/plɥi/',
    category: 'weather',
    difficulty: 'medium'
  },

  // Common Verbs
  {
    french: 'être',
    english: 'to be',
    pronunciation: '/ɛtʁ/',
    category: 'verbs',
    difficulty: 'medium'
  },
  {
    french: 'avoir',
    english: 'to have',
    pronunciation: '/a.vwaʁ/',
    category: 'verbs',
    difficulty: 'medium'
  },
  {
    french: 'aller',
    english: 'to go',
    pronunciation: '/a.le/',
    category: 'verbs',
    difficulty: 'medium'
  },
  {
    french: 'faire',
    english: 'to do/make',
    pronunciation: '/fɛʁ/',
    category: 'verbs',
    difficulty: 'medium'
  },
  {
    french: 'parler',
    english: 'to speak',
    pronunciation: '/paʁ.le/',
    category: 'verbs',
    difficulty: 'medium'
  },
  {
    french: 'manger',
    english: 'to eat',
    pronunciation: '/mɑ̃.ʒe/',
    category: 'verbs',
    difficulty: 'medium'
  }
];
