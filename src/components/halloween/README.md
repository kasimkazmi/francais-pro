# 🎃 Halloween Theme Components

A collection of spooky Halloween-themed components for the Français Pro French learning platform.

## Components

### Individual Halloween Icons
- **HalloweenPumpkin** - Animated pumpkin with glowing effects
- **HalloweenGhost** - Floating ghost with customizable colors
- **HalloweenBat** - Flying bat with wing animations
- **HalloweenSpider** - Crawling spider with leg animations
- **HalloweenWitchHat** - Bouncing witch hat with band and buckle

### Composite Components
- **HalloweenDecorations** - Container with floating decorations and background effects
- **HalloweenCard** - Themed card component with Halloween styling
- **SeasonalThemeToggle** - Unified toggle for all seasonal themes (including Halloween)

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

## Demo

Visit `/halloween-demo` to see all components in action with interactive controls.

## Integration

The Halloween theme toggle is automatically added to the header. Users can toggle Halloween mode on/off, and their preference is saved in localStorage.

When Halloween mode is active, the `halloween-mode` class is added to the document root, allowing for global Halloween styling.

