import { Metadata } from 'next'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { GithubIcon, HeartIcon, InstagramIcon, Link2Icon, LinkedinIcon, PauseCircleIcon, ShuffleIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import alaqmar from '@/app/team/alaqmar.jpg'
import { SocialIcon } from 'react-social-icons'
import Link from 'next/link'
import haider from '@/app/team/haider.jpg'
import shabbir from '@/app/team/shabbir.jpeg'
import { LinkIcon } from '@nextui-org/link'

export const metadata: Metadata = {
  title: 'Organising Team | Frame The Vision'
};

const Team = () => {
  return (
    <section className='flex flex-row items-center justify-around gap-y-3 flex-wrap'>
      <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute bg-black/70 z-10 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">DEVELOPER</p>
          <h4 className="text-white/90 font-medium text-xl uppercase">AL AQMAR KANCHWALA</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover object-center"
          src={alaqmar.src}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-row items-center justify-evenly w-full">
            <Link href={'https://alaqmar.tech'}>
              <Button isIconOnly variant='flat' color='warning'>
                <Link2Icon />
              </Button>
            </Link>
            <Link href={'https://instagram.com/alaqmar_19_08'}>
              <Button isIconOnly variant='flat' color='danger'>
                <InstagramIcon />
              </Button>
            </Link>
            <Link href={'https://twitter.com/alaqmarrrr'}>
              <Button isIconOnly variant='flat' color='primary'>
                <TwitterIcon />
              </Button>
            </Link>
            <Link href={'https://github.com/alaqmarr'}>
              <Button isIconOnly variant='flat' color='default'>
                <GithubIcon />
              </Button>
            </Link>
            <Link href={'https://www.linkedin.com/in/al-aqmar-kanchwala-8989a2272'}>
              <Button isIconOnly variant='flat' color='primary'>
                <LinkedinIcon />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute bg-black/70 z-10 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">DEVELOPER</p>
          <h4 className="text-white/90 font-medium text-xl uppercase">shabbir jodhpurwala</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover object-center"
          src={shabbir.src}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-row items-center justify-evenly w-full">
            <Link href={'https://shabbir.tech'}>
              <Button isIconOnly variant='flat' color='warning'>
                <Link2Icon />
              </Button>
            </Link>
            <Link href={'https://instagram.com/shabbir_jodhpur'}>
              <Button isIconOnly variant='flat' color='danger'>
                <InstagramIcon />
              </Button>
            </Link>
            <Link href={'https://twitter.com/shabbir_jodhpur'}>
              <Button isIconOnly variant='flat' color='primary'>
                <TwitterIcon />
              </Button>
            </Link>
            <Link href={'https://github.com/shabbirjodhpur'}>
              <Button isIconOnly variant='flat' color='default'>
                <GithubIcon />
              </Button>
            </Link>
            <Link href={'https://www.linkedin.com/in/shabbir-jodhpurwala'}>
              <Button isIconOnly variant='flat' color='primary'>
                <LinkedinIcon />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute bg-black/70 z-10 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">hsb coordinator</p>
          <h4 className="text-white/90 font-medium text-xl uppercase">haider dhinojwala</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover object-center"
          src={haider.src}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-row items-center justify-evenly w-full">
            <Link href={'https://instagram.com/haiderdj01'}>
              <Button isIconOnly variant='flat' color='danger'>
                <InstagramIcon />
              </Button>
            </Link>
            <Link href={'https://twitter.com/haiderdj53'}>
              <Button isIconOnly variant='flat' color='primary'>
                <TwitterIcon />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Team