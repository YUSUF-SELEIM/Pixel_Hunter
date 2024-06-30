'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';

const imageData = [
  {
    id: '1',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-1.webp',
    alt: 'A Crowd of Weird Faces I',
    characters:
      [
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_I/Bully.webp',
          Name: 'Bully',
          position: { x: 93, y: 28 },
          found: false
        },
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_I/Knife-Nose.webp',
          Name: 'Knife Nose',
          position: { x: 6, y: 16 },
          found: false,
        },
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_I/Potato-Head.webp',
          Name: 'Potato Head',
          position: { x: 80, y: 61 },
          found: false,
        }
      ],
  },
  {
    id: '2',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-3.webp',
    alt: 'A Crowd of Weird Faces II',
    characters:
      [
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_II/Baby.webp',
          Name: 'Baby',
          position: { x: 88, y: 28 },
          found: false,
        },
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_II/Doggo.webp',
          Name: 'Doggo',
          position: { x: 41, y: 96 },
          found: false,
        },
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_II/Olive.webp',
          Name: 'Olive',
          position: { x: 75, y: 66 },
          found: false,
        },
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_II/Yusuf.webp',
          Name: 'Yusuf',
          position: { x: 21, y: 5 },
          found: false,
        }
      ],

  },
  {
    id: '3',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-2.webp',
    alt: 'Ice Creams and Lollipop',
    characters:
      [
        {
          src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Game_III/Cute-Lollipop.webp',
          Name: 'Cute Lollipop',
          position: { x: 77, y: 21 },
          found: false,
        },
      ],
  },
];

function Game({ params }: { params: { id: string } }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: string; y: string }>({ x: '0%', y: '0%' });
  const [circlePosition, setCirclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [circleVisible, setCircleVisible] = useState(false);
  const [charactersFound, setCharactersFound] = useState<string[]>([]);
  useEffect(() => {
    // Function to update found characters
    const markFoundCharacters = () => {
      // Clear existing markers before adding new ones
      document.querySelectorAll('.character-marker').forEach((marker) => marker.remove());
  
      imageData.forEach((image) => {
        image.characters.forEach((character) => {
          if (character.found) {
            const marker = document.createElement('div');
            marker.classList.add('character-marker'); // Add a class for easy selection/removal
            marker.style.position = 'absolute';
            marker.style.left = `${character.position.x}%`;
            marker.style.top = `${character.position.y}%`;
            marker.style.width = '10px';
            marker.style.height = '10px';
            marker.style.backgroundColor = 'red'; // Example color for the marker
            marker.style.borderRadius = '50%'; // Round shape
            marker.style.transform = 'translate(-50%, -50%)'; // Center the marker
  
            const imageElement = document.getElementById('image');

            if (!imageElement) {
              return
            } 
                imageElement.appendChild(marker); // Fallback to body if container not found
          
            
            console.log('Added marker for:', character.Name);   
          }
        });
      });
    };
  
    // Call the function to initially place markers
    markFoundCharacters();
  }, [charactersFound]);
  
  const image = imageData.find((img) => img.id === params.id);

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleImageClick = (e: {
    stopPropagation: () => void;
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Adjust popup position based on click location relative to image edges
    let popupX = `${xPercent}%`;
    let popupY = `${yPercent}%`;

    // Adjust for different screen sizes
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (xPercent >= 50) {
        popupX = `${xPercent - 45}%`; // Adjust popup to the left
      }
      if (yPercent >= 50) {
        popupY = `${yPercent - 40}%`; // Adjust popup above
      }
    } else {
      // Adjustments for larger screens
      if (xPercent >= 75) {
        popupX = `${xPercent - 20}%`; // Adjust popup to the left
      }
      if (yPercent >= 90) {
        popupY = `${yPercent - 12}%`; // Adjust popup above
      }
    }

    setPopupPosition({ x: popupX, y: popupY });
    setCirclePosition({ x: xPercent, y: yPercent });
    setPopupVisible(true);
    setCircleVisible(true);
    console.log('x:', xPercent, 'y:', yPercent);
  };

  const handleHidePopup = () => {
    setPopupVisible(false);
    setCircleVisible(false);
  };

  const didFindCharacter = (characterName: string) => {
    const character = image.characters.find((char) => char.Name === characterName);
    if (!character) {
      return;
    }
    setCircleVisible(false);
    // Calculate circle position in percentage
    const circleX = circlePosition.x;
    const circleY = circlePosition.y;

    // Check if circle is within +/- 5% of the character's position
    const isCloseToCircle =
      Math.abs(circleX - character.position.x) <= 5 &&
      Math.abs(circleY - character.position.y) <= 5;

    if (isCloseToCircle) {
      // Update the found state for the character
      const updatedCharacters = image.characters.map((char) =>
        char.Name === characterName ? { ...char, found: true } : char
      );
      image.characters = updatedCharacters;
      setCharactersFound([...charactersFound, characterName]);
    }
    setPopupVisible(false);
  }

  
  return (
    <>
      <Header />
      <div className="bg-gray-50 relative overflow-x-hidden" onClick={handleHidePopup}>
        <div id='image' className="relative w-full h-full" onClick={handleImageClick}>
          <Image
            src={image.src}
            alt={image.alt}
            layout="responsive"
            width={2000}
            height={1000}
            className="cursor-crosshair"
          />
          
          {circleVisible && (
            <div
              className="absolute rounded-full border-4 border-red-500 border-dashed"
              style={{
                top: `calc(${circlePosition.y}% - 25px)`,
                left: `calc(${circlePosition.x}% - 25px)`,
                width: '50px',
                height: '50px',
              }}
            />
          )}
        </div>
        {popupVisible && (
          <div
            className="absolute bg-white shadow-lg p-2 rounded"
            style={{
              top: `calc(${popupPosition.y} + 5%)`,
              left: `calc(${popupPosition.x} + 9%)`,
              transform: 'translate(-50%, -50%)', // Center align the popup
              ...(window.innerWidth <= 768 && {
                // Mobile adjustments
                top: `calc(${popupPosition.y} + 5%)`,
                left: `calc(${popupPosition.x} + 17%)`,
                transform: 'translate(-50%, 0)',
              }),
            }}
          >
            {image.characters.map((character) => {
              if (!character.found) {
                return (
                  <div
                    key={character.Name}
                    className="md:text-xl text-xs md:p-2 p-1 cursor-pointer text-black hover:bg-gray-200 flex items-center space-x-4"
                    onClick={() => didFindCharacter(character.Name)}
                  >
                    <Image src={character.src} alt={character.Name} width={30} height={30} />
                    <p className="text-sm">{character.Name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Game;
