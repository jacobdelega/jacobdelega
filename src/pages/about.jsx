import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Button } from '@/components/ui/button'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  FiverIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/standing_desk.jpeg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Jacob Delega</title>
        <meta
          name="description"
          content="I’m Jacob Delega. I live in New Jersey, where I build the future applications."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="Jacob Delega deadlifting 600 pounds at rowan university for a personal record."
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              About Me
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
              I'm Jacob Delega, a passionate software engineer who enjoys problem-solving and building user-friendly solutions. My goals as a software engineer is to become an expert in the MERN stack utilizing NextJS.
              </p>
              {/* <Drawer>
                <div className="flex flex-col justify-center">
                  <DrawerTrigger>
                    <button className="dark:hover:bg-slate-700 s:w-2/3 w-full mb-2 h-12 rounded-md border border-blue-400 align-middle">
                      {' '}
                      4 Week ( Strength )
                    </button>
                  </DrawerTrigger>
                  <DrawerTrigger>
                    <button className="dark:hover:bg-slate-700 s:w-2/3 w-full mb-2 h-12 rounded-md border border-blue-400 align-middle">
                      {' '}
                      8 Week ( Powerbuilding )
                    </button>
                  </DrawerTrigger>
                  <DrawerTrigger>
                    <button className="dark:hover:bg-slate-700 s:w-2/3 w-full mb-2 h-12 rounded-md border border-blue-400 align-middle">
                      {' '}
                      12 Week ( Powerbuilding )
                    </button>
                  </DrawerTrigger>
                </div>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-white">
                      Are you absolutely sure?
                    </DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer> */}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              {/* <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink> */}
              <SocialLink
                href="https://github.com/jacobdelega"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/jacobdelega"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="https://www.fiverr.com/jacob_delega?public_mode=true"
                aria-label="Follow on Fiver"
                icon={FiverIcon}
                className="mt-4"
              >
                Follow on Fiver
              </SocialLink>
              <SocialLink
                href="mailto:jacobdelega@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                jacobdelega@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
