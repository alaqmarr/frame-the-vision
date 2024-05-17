import { Metadata } from 'next'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { GithubIcon, Globe, HeartIcon, InstagramIcon, Link2Icon, LinkedinIcon, PauseCircleIcon, ShuffleIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import alaqmar from '@/app/team/alaqmar.jpg'
import { SocialIcon } from 'react-social-icons'
import Link from 'next/link'
import { LinkIcon } from '@nextui-org/link'
import { Code } from '@nextui-org/code'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import haider from '@/app/team/haider.jpg'
import shabbir from '@/app/team/shabbir.jpeg'
import zainabK from '@/app/team/zainabK.jpg'
import mariyahB from '@/app/team/mariyahB.jpg'
import aliasgar from '@/app/team/aliasgar.jpg'
import hsb from '@/app/team/hsb-removebg-preview.png'
import batul from '@/app/team/batul.jpg'
import naqiya from '@/app/team/naqiya.jpg'

export const metadata: Metadata = {
  title: 'Organising Team | Frame The Vision'
};

const Team = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center justify-center mb-3'>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src={hsb.src}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Frame The Vision</p>
              <p className="text-small text-default-500">HSB Secunderabad</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Frame the Vision competition is brought to you by HSB Secunderabad.<br />You can appreciate our efforts by following our handle on Instagram.</p>
          </CardBody>
          <Divider />
          <CardFooter className='flex flex-col w-full items-center justify-center'>
            <Link href={'https://instagram.com/hsb.secbad'}>
              <Button color='danger' variant='flat'>
                <InstagramIcon size={20} />
                Follow HSB Secunderbad
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Divider className='mb-3' />
      <section className='flex flex-row items-center justify-around gap-y-3 flex-wrap'>
        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='warning' size='md' className='shadow-md'>
              <p className="uppercase font-bold">Developer | TECH LEAD</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Al Aqmar Kanchwala"
            className="z-0 w-full h-full object-cover object-center"
            src={alaqmar.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">AL AQMAR KANCHWALA</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://alaqmar.tech'}>
                  <Button isIconOnly variant='flat' color='warning'>
                    <Globe />
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
                  <Button isIconOnly color='primary'>
                    <LinkedinIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7 shadow-md" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='warning' size='md' className='shadow-md'>
              <p className="uppercase font-bold">Developer | TECH team</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Shabbir Jodhpurwala"
            className="z-0 w-full h-full object-cover object-center"
            src={shabbir.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">SHABBIR JODHPURWALA</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://shabbir.tech'}>
                  <Button isIconOnly variant='flat' color='warning'>
                    <Globe />
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
                  <Button isIconOnly color='primary'>
                    <LinkedinIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>


        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7 shadow-md" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='danger' size='md' className='shadow-md'>
              <p className="uppercase font-bold">core head | HSB COORDINATOR</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Haider Dhinojwala"
            className="z-0 w-full h-full object-cover object-center"
            src={haider.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">Haider Dhinojwala</h4>
              <Divider />
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

            </div>
          </CardFooter>
        </Card>


        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='danger' size='md' className='shadow-md'>
              <p className="uppercase font-bold">Core Head | Creative team lead</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Zainab Kunwarawala"
            className="z-0 w-full h-full object-cover object-center"
            src={zainabK.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">Zainab Kunwarawala</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://instagram.com/_.zainab.ak._'}>
                  <Button isIconOnly variant='flat' color='danger'>
                    <InstagramIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='danger' size='md' className='shadow-md'>
              <p className="uppercase font-bold">creative team member</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Mariyah Bharmal"
            className="z-0 w-full h-full object-cover object-center"
            src={mariyahB.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">Mariyah Bharmal</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://instagram.com/mariyah_bharmal'}>
                  <Button isIconOnly variant='flat' color='danger'>
                    <InstagramIcon />
                  </Button>
                </Link>
                <Link href={'https://www.linkedin.com/in/mariyah-bharmal-399a9521b'}>
                  <Button isIconOnly color='primary'>
                    <LinkedinIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>


        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='danger' size='md' className='shadow-md'>
              <p className="uppercase font-bold">Creative Team member</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Naquiya Saleh"
            className="z-0 w-full h-full object-cover object-center"
            src={naqiya.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">Naquiya Saleh</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://instagram.com/naquiya_s'}>
                  <Button isIconOnly variant='flat' color='danger'>
                    <InstagramIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="min-w-[300px] max-w-[350px] h-[300px] col-span-12 sm:col-span-7" isHoverable={true}>
          <CardHeader className="absolute z-10 flex-col items-start">
            <Chip color='danger' size='md' className='shadow-md'>
              <p className="uppercase font-bold">design team head</p>
            </Chip>
          </CardHeader>
          <Image
            removeWrapper
            alt="Aliasgar Dhinojwala"
            className="z-0 w-full h-full object-cover object-center"
            src={aliasgar.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
            <div className='flex flex-col w-full gap-y-3'>
              <h4 className="text-white/90 font-medium text-xl uppercase">Aliasgar Dhinojwala</h4>
              <Divider />
              <div className="flex flex-row items-center justify-evenly w-full">
                <Link href={'https://instagram.com/aliasgar_1205'}>
                  <Button isIconOnly variant='flat' color='danger'>
                    <InstagramIcon />
                  </Button>
                </Link>
              </div>

            </div>
          </CardFooter>
        </Card>




      </section>
    </>
  )
}

export default Team