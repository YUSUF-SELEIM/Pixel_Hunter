import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '@/src/app/components/ui/3d-card';
import Link from 'next/link';
import Footer from './components/footer';
import Header from './components/header';

const images = [
  {
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Image-1.webp',
    alt: 'A Crowd of Weird Faces I',
    title: 'A Crowd of Weird Faces I',
    level: 'Easy',
    color: 'text-green-500',
    description: 'Find Some Strange Faces to Win',
  },
  {
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Image-2.webp',
    alt: 'A Crowd of Weird Faces II',
    title: 'A Crowd of Weird Faces II',
    level: 'Medium',
    color: 'text-yellow-500',
    description: 'Find More Strange Faces to Win',
  },
  {
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/Image-3.webp',
    alt: 'Ice Creams and Lollipop',
    title: 'Ice Creams and Lollipop',
    level: 'Hard',
    color: 'text-red-500',
    description: 'Find The Hidden Lollipop to Win',
  }
];

export default function Home() {
  return (
    <>
      <Header>
        {null}
      </Header>
      <main className="w-full bg-gray-200 p-12">
        <h1 className="text-4xl text-center font-bold text-cyan-500">Choose a Game</h1>
        <div className="w-full flex flex-col md:flex-row justify-between md:space-x-4 p-1">
          {images.map((image, index) => (
            <CardContainer key={index}>
              <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-80 h-auto rounded-xl p-6 border md:w-96">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
                  {image.title}
                </CardItem>
                <div className='w-full flex justify-between items-center'>
                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 ">
                    {image.description}
                  </CardItem>
                  <CardItem as="p" translateZ="60" className={`${image.color} font-extrabold text-sm max-w-sm mt-2`}>
                    {image.level}
                  </CardItem>
                </div>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={image.src}
                    height={1000}
                    width={1000}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-center items-center mt-10">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/game/${index + 1}`}
                    className="px-4 py-2 rounded-xl text-xs font-normal text-neutral-600"
                  >
                    Play Now →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
        <div className='flex justify-center items-center'>
          <button
            className="w-full btn btn-outline text-cyan-500 hover:bg-cyan-500 hover:text-white"
          >
            <Link href={`/leaderboard/${1}`}>Leaderboard</Link>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}