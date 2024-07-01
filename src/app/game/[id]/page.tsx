'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';
import imageData from '@/data/ImageData';
import Modal from '../../components/modal';

function Game({ params }: { params: { id: string } }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: string; y: string }>({ x: '0%', y: '0%' });
  const [circlePosition, setCirclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [circleVisible, setCircleVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [charactersFound, setCharactersFound] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Function to update found characters
    const markFoundCharacters = () => {
      // Clear existing markers before adding new ones
      document.querySelectorAll('.character-marker').forEach((marker) => marker.remove());

      imageData.forEach((image) => {
        image.characters.forEach((character) => {
          if (character.found) {
            const marker = document.createElement('div');
            marker.classList.add(
              'character-marker',
              'absolute',
              'text-7xl',
              'text-green-500',
              'transform',
              '-translate-x-1/2',
              '-translate-y-1/2'
            );
            marker.style.left = `${character.position.x}%`;
            marker.style.top = `${character.position.y}%`;
            marker.textContent = '✔';
            const imageElement = document.getElementById('image');

            if (imageElement) {
              imageElement.appendChild(marker); // Fallback to body if container not found
            } else {
              document.body.appendChild(marker); // Fallback to body if container not found
            }
            console.log('Added marker for:', character.Name);
          }
        });
      });
    };
    // Call the function to initially place markers
    markFoundCharacters();
  }, [charactersFound]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showToast) {
      setShowToast(true);
      timer = setTimeout(() => {
        setShowToast(false);
      }, 1000); // Hide toast after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showToast]);

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
        popupY = `${yPercent - 60}%`; // Adjust popup above
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
    } else {
      console.log('Not close enough to:', characterName);
      setShowToast(true);
    }
    // Check if all characters have been found
    const allCharactersFound = image.characters.every((char) => char.found);
    if (allCharactersFound) {
      setGameOver(true);
      setShowModal(true);
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
      {showToast && (
        <div className="fixed top-0 left-0 right-0 flex justify-center mt-3 slide-down">
          <div className="bg-red-500 text-white py-2 px-4 rounded">
            Try Again!
          </div>
        </div>
      )}
      {gameOver && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
      <Footer />
    </>
  );
}

export default Game;
