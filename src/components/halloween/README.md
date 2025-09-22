# 🎃 Halloween Theme Components

A collection of spooky Halloween-themed components for the Français Pro French learning platform.

## Components

### Individual Halloween Icons
- **HalloweenPumpkin** - Animated pumpkin with glowing effects
- **HalloweenGhost** - Floating ghost with customizable colors
- **HalloweenBat** - Flying bat with wing animations
- **HalloweenSpider** - Crawling spider with leg animations
- **HalloweenWitchHat** - Bouncing witch hat with band and buckle

### GIF Utilities
- **HalloweenGif** - Generic GIF renderer for assets in `/public/halloween/images`
- **HalloweenTeaBat** - Convenience wrapper for `teabat.gif`

### Composite Components
- **HalloweenDecorations** - Container with floating decorations and background effects
- **HalloweenCard** - Themed card component with Halloween styling
- **HalloweenListCard** - Checklist/numbered/instructions card with Halloween styles
- **HalloweenLoader** - Halloween loading screen with progress and auto-complete
- **HalloweenPageWrapper** - Page wrapper that adds subtle Halloween ambience
- **HalloweenMusicManager** - Plays Halloween background audio (when enabled)
- **SafeSeasonalThemeToggle** - Safe header toggle for seasonal themes (including Halloween)

## Usage

### Basic Usage
```tsx
import { HalloweenPumpkin, HalloweenGhost, HalloweenBat } from '@/components/halloween';

// Simple pumpkin
<HalloweenPumpkin size="md" animated={true} glow={true} />

// Ghost with custom color
<HalloweenGhost size="lg" color="purple" animated={true} />

// Flying bat
<HalloweenBat size="md" flying={true} />
```

### Halloween Decorations Container
```tsx
import { HalloweenDecorations } from '@/components/halloween';

<HalloweenDecorations intensity="medium" className="min-h-screen">
  <YourContent />
</HalloweenDecorations>
```

### Halloween Card
```tsx
import { HalloweenCard } from '@/components/halloween';

<HalloweenCard
  title="Spooky French Words"
  description="Learn Halloween vocabulary"
  decoration="pumpkin"
  glow={true}
>
  <p>Content goes here...</p>
</HalloweenCard>
```

### Loader, Page Wrapper and Music
```tsx
import { HalloweenLoader, HalloweenPageWrapper, HalloweenMusicManager } from '@/components/halloween';

// Loader (call when needed)
<HalloweenLoader isLoading duration={3000} onComplete={() => {/* ... */}} />

// Wrapper around content
<HalloweenPageWrapper>
  <YourContent />
</HalloweenPageWrapper>

// Background music (conditionally render)
<HalloweenMusicManager volume={0.4} loop />
```

### GIFs
```tsx
import { HalloweenGif, HalloweenTeaBat } from '@/components/halloween';

<HalloweenTeaBat size="xl" glow />
<HalloweenGif src="/halloween/images/ghost-spirits.gif" size="xl" />
```

### Theme Toggle
```tsx
import { SeasonalThemeToggle } from '@/components/seasonal/seasonal-theme-toggle';

<SeasonalThemeToggle onToggle={(isActive) => console.log('Seasonal theme:', isActive)} />
```

## Props

### Common Props
- `size`: 'sm' | 'md' | 'lg' | 'xl' - Size of the component
- `animated`: boolean - Whether to show animations
- `className`: string - Additional CSS classes

### Component-Specific Props

#### HalloweenPumpkin
- `glow`: boolean - Enable glowing effect

#### HalloweenGhost
- `color`: 'white' | 'purple' | 'green' - Ghost color

#### HalloweenBat
- `flying`: boolean - Enable flying animation

#### HalloweenSpider
- `crawling`: boolean - Enable crawling animation
- `color`: 'black' | 'brown' | 'red' - Spider color

#### HalloweenWitchHat
- `color`: 'black' | 'purple' | 'green' - Hat color

#### HalloweenDecorations
- `intensity`: 'low' | 'medium' | 'high' - Number of decorations
- `children`: React.ReactNode - Content to display

#### HalloweenCard
- `title`: string - Card title
- `description`: string - Card description
- `decoration`: 'pumpkin' | 'ghost' | 'bat' | 'none' - Decoration type
- `glow`: boolean - Enable glowing effect

#### HalloweenListCard
- `items`: Array<{ id: string; text: string; completed?: boolean; highlight?: boolean }>
- `listStyle`: 'spooky' | 'numbers' | 'instructions'
- `showCheckmarks`: boolean

#### HalloweenLoader
- `isLoading`: boolean
- `duration`: number (ms)
- `onComplete`: () => void

#### HalloweenPageWrapper
- Wraps children with themed ambience

#### HalloweenMusicManager
- `volume`: number (0–1)
- `loop`: boolean

#### HalloweenGif
- `src`: string (path under `/public`)
- `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
- `animated`: boolean
- `glow`: boolean

## CSS Classes

The components use several CSS classes defined in `globals.css`:

- `.halloween-float` - Floating animation
- `.halloween-glow` - Glowing effect
- `.halloween-shake` - Shaking animation
- `.halloween-bat-fly` - Bat flying animation
- `.halloween-ghost-float` - Ghost floating animation
- `.halloween-pumpkin-glow` - Pumpkin glowing animation
- `.halloween-spider-crawl` - Spider crawling animation
- `.halloween-witch-hat-bounce` - Witch hat bouncing animation
- `.halloween-card` - Halloween-themed card styling
- `.halloween-button` - Halloween-themed button styling
- `.halloween-text` - Halloween-themed text styling
- `.halloween-bg` - Halloween background effects

Note: GIF paths were moved to `/public/halloween/images`. Update any static references accordingly.

## Demo

Visit `/halloween-demo` to see all components in one place (fonts, icons, cards, lists, loader controls, page wrapper, GIFs, music, and theme toggle).

## Integration

The Halloween theme toggle is automatically added to the header. Users can toggle Halloween mode on/off, and their preference is saved in localStorage.

When Halloween mode is active, the `halloween-mode` class is added to the document root, allowing for global Halloween styling.

