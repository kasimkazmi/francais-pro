'use client';

import { createAvatar } from '@dicebear/core';
import { avataaars, lorelei, initials, personas } from '@dicebear/collection';
import { useMemo } from 'react';
import Image from 'next/image';

interface AvatarGeneratorProps {
  seed: string;
  size?: number;
  style?: 'avataaars' | 'lorelei' | 'initials' | 'personas';
  gender?: 'male' | 'female';
  className?: string;
}

export function AvatarGenerator({ 
  seed, 
  size = 80, 
  style = 'lorelei',
  gender,
  className = '' 
}: AvatarGeneratorProps) {
  const avatarDataUri = useMemo(() => {
    let avatar;
    
    // Add gender prefix to seed for variation
    const genderSeed = gender ? `${gender}-${seed}` : seed;
    
    switch (style) {
      case 'avataaars':
        avatar = createAvatar(avataaars, { 
          seed: genderSeed, 
          size,
          accessories: ['kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers', 'eyepatch'],
          accessoriesProbability: 40,
          clothing: ['blazerAndShirt', 'blazerAndSweater', 'collarAndSweater', 'graphicShirt', 'hoodie', 'overall', 'shirtCrewNeck', 'shirtScoopNeck', 'shirtVNeck'],
          eyebrows: ['angryNatural', 'defaultNatural', 'flatNatural', 'raisedExcitedNatural', 'sadConcernedNatural'],
          eyes: ['default', 'happy', 'side', 'squint', 'surprised', 'wink'],
          facialHair: ['beardLight', 'beardMedium', 'moustacheFancy'],
          facialHairProbability: gender === 'male' ? 30 : 5,
          mouth: ['smile', 'default', 'serious', 'twinkle', 'tongue'],
          top: gender === 'female' 
            ? ['bob', 'bun', 'curly', 'curvy', 'longButNotTooLong', 'miaWallace', 'straight01', 'straight02']
            : ['shortCurly', 'shortFlat', 'shortRound', 'shortWaved', 'sides', 'theCaesar', 'dreads01', 'shaggy'],
          topProbability: 100,
        });
        break;
      case 'initials':
        avatar = createAvatar(initials, { seed: genderSeed, size });
        break;
      case 'personas':
        avatar = createAvatar(personas, { 
          seed: genderSeed, 
          size,
        });
        break;
      default:
        // Lorelei
        avatar = createAvatar(lorelei, { 
          seed: genderSeed, 
          size,
        });
    }

    return avatar.toDataUri();
  }, [seed, size, style, gender]);

  return (
    <Image 
      src={avatarDataUri} 
      alt={`Avatar for ${seed}`} 
      width={size}
      height={size}
      className={className}
    />
  );
}
