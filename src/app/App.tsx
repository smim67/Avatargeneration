import { useState, useRef, useEffect } from 'react';
import { Logo } from './components/Logo';

type AvatarStyle = 'pixel' | 'geometric' | 'blob' | 'human' | 'animal';
type Language = 'ru' | 'en';

const translations = {
  ru: {
    title: 'Генератор Аватаров',
    subtitle: 'Создавайте уникальные аватары из текста',
    placeholder: 'Введите текст для генерации аватара...',
    randomButton: 'Случайный',
    stylePixel: 'Пиксельный',
    styleGeometric: 'Геометрический',
    styleBlob: 'Blob',
    styleHuman: 'Человек',
    styleAnimal: 'Животное',
    downloadPNG: 'Скачать PNG',
    downloadSVG: 'Скачать SVG',
    emptyState: 'Введите текст или сгенерируйте случайный аватар',
    aboutTitle: 'О сервисе',
    aboutDescription: 'Avatar Generation — это бесплатный онлайн-сервис для создания уникальных аватаров. Идеально подходит для разработчиков, дизайнеров и всех, кому нужна быстрая генерация аватаров для профилей, приложений или веб-сайтов.',
    howItWorks: 'Просто введите любой текст, выберите стиль (пиксельный, геометрический, blob, человек или животное), и сервис сгенерирует для вас уникальный аватар на основе хэша текста. Результат можно скачать в форматах PNG или SVG.',
    allRightsReserved: 'Все права защищены',
    developedBy: 'Разработано:',
    cookieNotice: 'Мы используем cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с этим.',
    cookieAccept: 'Принять',
  },
  en: {
    title: 'Avatar Generator',
    subtitle: 'Create unique avatars from text',
    placeholder: 'Enter text to generate avatar...',
    randomButton: 'Random',
    stylePixel: 'Pixel',
    styleGeometric: 'Geometric',
    styleBlob: 'Blob',
    styleHuman: 'Human',
    styleAnimal: 'Animal',
    downloadPNG: 'Download PNG',
    downloadSVG: 'Download SVG',
    emptyState: 'Enter text or generate a random avatar',
    aboutTitle: 'About the Service',
    aboutDescription: 'Avatar Generation is a free online service for creating unique avatars. Perfect for developers, designers, and anyone who needs quick avatar generation for profiles, applications, or websites.',
    howItWorks: 'Simply enter any text, choose a style (pixel, geometric, blob, human, or animal), and the service will generate a unique avatar based on the text hash. Results can be downloaded in PNG or SVG formats.',
    allRightsReserved: 'All rights reserved',
    developedBy: 'Developed by:',
    cookieNotice: 'We use cookies to improve the site. By continuing to use the site, you agree to this.',
    cookieAccept: 'Accept',
  },
};

export default function App() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState<AvatarStyle>('pixel');
  const [language, setLanguage] = useState<Language>('ru');
  const [showCookieNotice, setShowCookieNotice] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const t = translations[language];

  // Check if user already accepted cookies
  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (cookieAccepted === 'true') {
      setShowCookieNotice(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShowCookieNotice(false);
  };

  // Set SEO meta tags and viewport
  useEffect(() => {
    const title = language === 'ru'
      ? 'Генератор Аватаров - Создайте уникальный аватар онлайн'
      : 'Avatar Generator - Create Unique Avatars Online';

    const description = language === 'ru'
      ? 'Бесплатный генератор аватаров онлайн. Создавайте уникальные пиксельные, геометрические аватары, а также аватары людей и животных из текста. Скачивайте в PNG и SVG.'
      : 'Free online avatar generator. Create unique pixel, geometric, human and animal avatars from text. Download as PNG and SVG.';

    const keywords = language === 'ru'
      ? 'генератор аватаров, создать аватар, пиксельный аватар, онлайн генератор, аватар из текста, скачать аватар'
      : 'avatar generator, create avatar, pixel avatar, online generator, avatar from text, download avatar';

    document.title = title;

    // Set viewport for mobile responsiveness
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      document.head.appendChild(metaViewport);
    }
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Set favicon
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    const faviconSvg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%231a1a1a"/><rect x="9" y="6" width="3" height="3" fill="%2360A5FA"/><rect x="12" y="6" width="3" height="3" fill="%2360A5FA"/><rect x="15" y="6" width="3" height="3" fill="%2360A5FA"/><rect x="18" y="6" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="9" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="9" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="12" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="12" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="9" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="12" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="15" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="18" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="15" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="18" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="18" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="21" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="21" width="3" height="3" fill="%2360A5FA"/><rect x="6" y="24" width="3" height="3" fill="%2360A5FA"/><rect x="21" y="24" width="3" height="3" fill="%2360A5FA"/></svg>`;
    favicon.setAttribute('href', faviconSvg);
  }, [language]);

  // Generate hash from string
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  // Generate color from hash
  const generateColor = (seed: number, index: number): string => {
    const hue = ((seed + index * 137) % 360);
    const saturation = 60 + (seed % 20);
    const lightness = 45 + (seed % 15);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Generate pixel art avatar (5x5 mirrored)
  const generatePixelAvatar = (seed: number, ctx: CanvasRenderingContext2D) => {
    const size = 300;
    const gridSize = 5;
    const cellSize = size / gridSize;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);

    const color1 = generateColor(seed, 0);
    const color2 = generateColor(seed, 1);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
        const index = y * Math.ceil(gridSize / 2) + x;
        const shouldFill = (seed >> index) & 1;

        if (shouldFill) {
          ctx.fillStyle = index % 2 === 0 ? color1 : color2;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
          ctx.fillRect((gridSize - 1 - x) * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  // Generate geometric avatar
  const generateGeometricAvatar = (seed: number, ctx: CanvasRenderingContext2D) => {
    const size = 300;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);

    const shapes = 8;
    for (let i = 0; i < shapes; i++) {
      const x = ((seed * (i + 1) * 17) % size);
      const y = ((seed * (i + 1) * 31) % size);
      const shapeSize = 30 + ((seed * (i + 1)) % 60);

      ctx.fillStyle = generateColor(seed, i);
      ctx.globalAlpha = 0.8;

      if (i % 2 === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, shapeSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Square
        ctx.fillRect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
      }
    }
    ctx.globalAlpha = 1;
  };

  // Generate blob avatar
  const generateBlobAvatar = (seed: number, ctx: CanvasRenderingContext2D) => {
    const size = 300;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);

    const blobs = 5;
    for (let i = 0; i < blobs; i++) {
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = 40 + ((seed * (i + 1)) % 80);
      const points = 6;

      ctx.fillStyle = generateColor(seed, i);
      ctx.globalAlpha = 0.7;
      ctx.beginPath();

      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const r = radius * (0.7 + 0.6 * Math.sin((seed + i + j) * 0.5));
        const x = centerX + r * Math.cos(angle + i);
        const y = centerY + r * Math.sin(angle + i);

        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  // Generate human face avatar
  const generateHumanAvatar = (seed: number, ctx: CanvasRenderingContext2D) => {
    const size = 300;
    const cellSize = 20;
    const gridSize = size / cellSize;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);

    const skinColor = generateColor(seed, 0);
    const hairColor = generateColor(seed, 1);
    const eyeColor = generateColor(seed, 2);

    // Face shape (oval)
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(size / 2, size / 2 + 10, 90, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair style variations
    const hairStyle = seed % 4;
    ctx.fillStyle = hairColor;

    if (hairStyle === 0) {
      // Short hair
      ctx.fillRect(cellSize * 4, cellSize * 2, cellSize * 7, cellSize * 4);
    } else if (hairStyle === 1) {
      // Long hair
      ctx.fillRect(cellSize * 3, cellSize * 2, cellSize * 9, cellSize * 8);
    } else if (hairStyle === 2) {
      // Curly hair
      for (let i = 0; i < 12; i++) {
        const x = cellSize * 4 + (i % 4) * cellSize * 1.5;
        const y = cellSize * 2 + Math.floor(i / 4) * cellSize * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Spiky hair
      for (let i = 0; i < 7; i++) {
        ctx.fillRect(cellSize * 4 + i * cellSize, cellSize * 1, cellSize - 2, cellSize * 3);
      }
    }

    // Eyes
    const eyeY = size / 2 - 10;
    const eyeSpacing = 50;

    // Eye whites
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size / 2 - eyeSpacing - 15, eyeY - 10, 30, 20);
    ctx.fillRect(size / 2 + eyeSpacing - 15, eyeY - 10, 30, 20);

    // Pupils
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(size / 2 - eyeSpacing, eyeY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size / 2 + eyeSpacing, eyeY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = skinColor;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(size / 2 - 5, eyeY + 30, 10, 20);
    ctx.globalAlpha = 1;

    // Mouth variations
    const mouthStyle = (seed >> 4) % 3;
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 3;
    ctx.beginPath();

    if (mouthStyle === 0) {
      // Smile
      ctx.arc(size / 2, eyeY + 50, 25, 0.2 * Math.PI, 0.8 * Math.PI);
    } else if (mouthStyle === 1) {
      // Straight
      ctx.moveTo(size / 2 - 20, eyeY + 60);
      ctx.lineTo(size / 2 + 20, eyeY + 60);
    } else {
      // Open smile
      ctx.arc(size / 2, eyeY + 50, 20, 0.3 * Math.PI, 0.7 * Math.PI);
      ctx.moveTo(size / 2 - 14, eyeY + 64);
      ctx.lineTo(size / 2 + 14, eyeY + 64);
    }
    ctx.stroke();
  };

  // Generate animal avatar
  const generateAnimalAvatar = (seed: number, ctx: CanvasRenderingContext2D) => {
    const size = 300;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, size, size);

    const animalType = seed % 4;
    const furColor = generateColor(seed, 0);
    const accentColor = generateColor(seed, 1);

    if (animalType === 0) {
      // Cat
      ctx.fillStyle = furColor;
      // Head
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 80, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(size / 2 - 60, size / 2 - 40);
      ctx.lineTo(size / 2 - 30, size / 2 - 100);
      ctx.lineTo(size / 2 - 20, size / 2 - 40);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(size / 2 + 60, size / 2 - 40);
      ctx.lineTo(size / 2 + 30, size / 2 - 100);
      ctx.lineTo(size / 2 + 20, size / 2 - 40);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(size / 2 - 25, size / 2 - 10, 8, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(size / 2 + 25, size / 2 - 10, 8, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(size / 2, size / 2 + 10);
      ctx.lineTo(size / 2 - 8, size / 2 + 20);
      ctx.lineTo(size / 2 + 8, size / 2 + 20);
      ctx.fill();

      // Whiskers
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(size / 2 - 80, size / 2 + i * 10);
        ctx.lineTo(size / 2 - 30, size / 2 + 10 + i * 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(size / 2 + 80, size / 2 + i * 10);
        ctx.lineTo(size / 2 + 30, size / 2 + 10 + i * 5);
        ctx.stroke();
      }
    } else if (animalType === 1) {
      // Dog
      ctx.fillStyle = furColor;
      // Head
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 + 10, 85, 0, Math.PI * 2);
      ctx.fill();

      // Floppy ears
      ctx.beginPath();
      ctx.ellipse(size / 2 - 70, size / 2 + 20, 25, 50, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(size / 2 + 70, size / 2 + 20, 25, 50, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(size / 2 - 30, size / 2 - 5, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size / 2 + 30, size / 2 - 5, 12, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 + 30, 15, 0, Math.PI * 2);
      ctx.fill();

      // Tongue
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(size / 2, size / 2 + 55, 12, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (animalType === 2) {
      // Bear
      ctx.fillStyle = furColor;
      // Head
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 90, 0, Math.PI * 2);
      ctx.fill();

      // Round ears
      ctx.beginPath();
      ctx.arc(size / 2 - 55, size / 2 - 70, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size / 2 + 55, size / 2 - 70, 30, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(size / 2, size / 2 + 30, 40, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(size / 2 - 25, size / 2 - 15, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size / 2 + 25, size / 2 - 15, 10, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 + 30, 12, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Fox
      ctx.fillStyle = furColor;
      // Head (triangular)
      ctx.beginPath();
      ctx.moveTo(size / 2, size / 2 - 80);
      ctx.lineTo(size / 2 - 80, size / 2 + 60);
      ctx.lineTo(size / 2 + 80, size / 2 + 60);
      ctx.closePath();
      ctx.fill();

      // Round the head
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 - 20, 60, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(size / 2 - 40, size / 2 - 60);
      ctx.lineTo(size / 2 - 30, size / 2 - 110);
      ctx.lineTo(size / 2 - 10, size / 2 - 65);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(size / 2 + 40, size / 2 - 60);
      ctx.lineTo(size / 2 + 30, size / 2 - 110);
      ctx.lineTo(size / 2 + 10, size / 2 - 65);
      ctx.fill();

      // White chest
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 + 30, 35, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(size / 2 - 20, size / 2 - 15, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size / 2 + 20, size / 2 - 15, 8, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.beginPath();
      ctx.arc(size / 2, size / 2 + 5, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Generate SVG for download
  const generateSVG = (seed: number): string => {
    const size = 300;
    let svgContent = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
    svgContent += `<rect width="${size}" height="${size}" fill="#1a1a1a"/>`;

    if (style === 'pixel') {
      const gridSize = 5;
      const cellSize = size / gridSize;
      const color1 = generateColor(seed, 0);
      const color2 = generateColor(seed, 1);

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
          const index = y * Math.ceil(gridSize / 2) + x;
          const shouldFill = (seed >> index) & 1;

          if (shouldFill) {
            const color = index % 2 === 0 ? color1 : color2;
            svgContent += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}"/>`;
            svgContent += `<rect x="${(gridSize - 1 - x) * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}"/>`;
          }
        }
      }
    } else if (style === 'geometric') {
      const shapes = 8;
      for (let i = 0; i < shapes; i++) {
        const x = ((seed * (i + 1) * 17) % size);
        const y = ((seed * (i + 1) * 31) % size);
        const shapeSize = 30 + ((seed * (i + 1)) % 60);
        const color = generateColor(seed, i);

        if (i % 2 === 0) {
          svgContent += `<circle cx="${x}" cy="${y}" r="${shapeSize / 2}" fill="${color}" opacity="0.8"/>`;
        } else {
          svgContent += `<rect x="${x - shapeSize / 2}" y="${y - shapeSize / 2}" width="${shapeSize}" height="${shapeSize}" fill="${color}" opacity="0.8"/>`;
        }
      }
    } else if (style === 'blob') {
      const blobs = 5;
      const centerX = size / 2;
      const centerY = size / 2;

      for (let i = 0; i < blobs; i++) {
        const radius = 40 + ((seed * (i + 1)) % 80);
        const points = 6;
        const color = generateColor(seed, i);
        let path = '';

        for (let j = 0; j <= points; j++) {
          const angle = (j / points) * Math.PI * 2;
          const r = radius * (0.7 + 0.6 * Math.sin((seed + i + j) * 0.5));
          const x = centerX + r * Math.cos(angle + i);
          const y = centerY + r * Math.sin(angle + i);

          path += (j === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
        }
        path += ' Z';
        svgContent += `<path d="${path}" fill="${color}" opacity="0.7"/>`;
      }
    } else if (style === 'human') {
      const skinColor = generateColor(seed, 0);
      const hairColor = generateColor(seed, 1);
      const eyeColor = generateColor(seed, 2);

      svgContent += `<ellipse cx="${size / 2}" cy="${size / 2 + 10}" rx="90" ry="110" fill="${skinColor}"/>`;

      const hairStyle = seed % 4;
      if (hairStyle === 0) {
        svgContent += `<rect x="80" y="40" width="140" height="80" fill="${hairColor}"/>`;
      } else if (hairStyle === 1) {
        svgContent += `<rect x="60" y="40" width="180" height="160" fill="${hairColor}"/>`;
      }

      svgContent += `<rect x="${size / 2 - 65}" y="${size / 2 - 20}" width="30" height="20" fill="#ffffff"/>`;
      svgContent += `<rect x="${size / 2 + 35}" y="${size / 2 - 20}" width="30" height="20" fill="#ffffff"/>`;
      svgContent += `<circle cx="${size / 2 - 50}" cy="${size / 2 - 10}" r="8" fill="${eyeColor}"/>`;
      svgContent += `<circle cx="${size / 2 + 50}" cy="${size / 2 - 10}" r="8" fill="${eyeColor}"/>`;
    } else if (style === 'animal') {
      const animalType = seed % 4;
      const furColor = generateColor(seed, 0);
      const accentColor = generateColor(seed, 1);

      if (animalType === 0) {
        svgContent += `<circle cx="${size / 2}" cy="${size / 2}" r="80" fill="${furColor}"/>`;
        svgContent += `<polygon points="${size / 2 - 60},${size / 2 - 40} ${size / 2 - 30},${size / 2 - 100} ${size / 2 - 20},${size / 2 - 40}" fill="${furColor}"/>`;
        svgContent += `<polygon points="${size / 2 + 60},${size / 2 - 40} ${size / 2 + 30},${size / 2 - 100} ${size / 2 + 20},${size / 2 - 40}" fill="${furColor}"/>`;
        svgContent += `<ellipse cx="${size / 2 - 25}" cy="${size / 2 - 10}" rx="8" ry="20" fill="#000000"/>`;
        svgContent += `<ellipse cx="${size / 2 + 25}" cy="${size / 2 - 10}" rx="8" ry="20" fill="#000000"/>`;
        svgContent += `<polygon points="${size / 2},${size / 2 + 10} ${size / 2 - 8},${size / 2 + 20} ${size / 2 + 8},${size / 2 + 20}" fill="${accentColor}"/>`;
      } else {
        svgContent += `<circle cx="${size / 2}" cy="${size / 2 + 10}" r="85" fill="${furColor}"/>`;
        svgContent += `<ellipse cx="${size / 2 - 70}" cy="${size / 2 + 20}" rx="25" ry="50" fill="${furColor}"/>`;
        svgContent += `<ellipse cx="${size / 2 + 70}" cy="${size / 2 + 20}" rx="25" ry="50" fill="${furColor}"/>`;
        svgContent += `<circle cx="${size / 2 - 30}" cy="${size / 2 - 5}" r="12" fill="#000000"/>`;
        svgContent += `<circle cx="${size / 2 + 30}" cy="${size / 2 - 5}" r="12" fill="#000000"/>`;
        svgContent += `<circle cx="${size / 2}" cy="${size / 2 + 30}" r="15" fill="#000000"/>`;
      }
    }

    svgContent += '</svg>';
    return svgContent;
  };

  // Generate avatar
  const generateAvatar = () => {
    if (!text.trim() || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const seed = hashCode(text);

    if (style === 'pixel') {
      generatePixelAvatar(seed, ctx);
    } else if (style === 'geometric') {
      generateGeometricAvatar(seed, ctx);
    } else if (style === 'blob') {
      generateBlobAvatar(seed, ctx);
    } else if (style === 'human') {
      generateHumanAvatar(seed, ctx);
    } else if (style === 'animal') {
      generateAnimalAvatar(seed, ctx);
    }
  };

  // Download PNG
  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `avatar-${text.trim()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  // Download SVG
  const downloadSVG = () => {
    if (!text.trim()) return;
    const seed = hashCode(text);
    const svgContent = generateSVG(seed);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `avatar-${text.trim()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Generate random avatar
  const generateRandom = () => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setText(randomString);
  };

  // Auto-generate on text or style change
  useEffect(() => {
    if (text.trim()) {
      generateAvatar();
    }
  }, [text, style]);

  return (
    <div className="min-h-screen bg-neutral-950 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start py-8 sm:py-12">
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        {/* Language Switcher */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'ru'
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
            <Logo />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Avatar Generation</h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-400">{t.subtitle}</p>
        </div>

        {/* Input */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-neutral-900 text-white text-sm sm:text-base rounded-lg border border-neutral-800 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={generateRandom}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium text-sm sm:text-base transition-colors border border-neutral-800 hover:border-neutral-700 whitespace-nowrap"
            >
              {t.randomButton}
            </button>
          </div>

          {/* Style Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={() => setStyle('pixel')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                style === 'pixel'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t.stylePixel}
            </button>
            <button
              onClick={() => setStyle('geometric')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                style === 'geometric'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t.styleGeometric}
            </button>
            <button
              onClick={() => setStyle('blob')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                style === 'blob'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t.styleBlob}
            </button>
            <button
              onClick={() => setStyle('human')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                style === 'human'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t.styleHuman}
            </button>
            <button
              onClick={() => setStyle('animal')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all col-span-2 sm:col-span-1 ${
                style === 'animal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t.styleAnimal}
            </button>
          </div>
        </div>

        {/* Avatar Display */}
        {text.trim() && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center px-4">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="rounded-lg shadow-2xl border border-neutral-800 w-full max-w-[300px] h-auto aspect-square"
              />
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={downloadPNG}
                className="flex-1 px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                {t.downloadPNG}
              </button>
              <button
                onClick={downloadSVG}
                className="flex-1 px-4 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                {t.downloadSVG}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!text.trim() && (
          <div className="flex items-center justify-center h-[200px] sm:h-[300px] bg-neutral-900 rounded-lg border border-neutral-800 border-dashed px-4">
            <p className="text-neutral-500 text-sm sm:text-base text-center">{t.emptyState}</p>
          </div>
        )}

        {/* About Section */}
        <section className="mt-8 sm:mt-12 space-y-4 sm:space-y-6 bg-neutral-900 rounded-lg p-4 sm:p-6 md:p-8 border border-neutral-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{t.aboutTitle}</h2>
          <div className="space-y-3 sm:space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>{t.aboutDescription}</p>
            <p>{t.howItWorks}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 sm:py-8 border-t border-neutral-800 space-y-2">
          <p className="text-neutral-500 text-xs sm:text-sm px-4">
            © {new Date().getFullYear()} avatar-generation.ru • {t.allRightsReserved}
          </p>
          <p className="text-neutral-500 text-xs sm:text-sm px-4">
            {t.developedBy}{' '}
            <a
              href="https://sergeysmim.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors underline"
            >
              sergeysmim.ru
            </a>
          </p>
        </footer>
      </div>

      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className="fixed bottom-4 left-4 max-w-sm bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-2xl z-50 animate-in slide-in-from-bottom-5">
          <p className="text-neutral-300 text-sm mb-3 leading-relaxed">
            {t.cookieNotice}
          </p>
          <button
            onClick={acceptCookies}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            {t.cookieAccept}
          </button>
        </div>
      )}
    </div>
  );
}