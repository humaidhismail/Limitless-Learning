'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {PhoneIcon} from "lucide-react";
import {Card} from "@/components/ui/card";
import Heading from "@/components/heading";

const Home = () => {
    return (
        <div className="h-screen font-hanken-grotesk">
            <div className='w-full flex justify-center items-center py-4 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10'>
                <Image src={'/Logo.png'} width={125} height={40} alt={'Limitless Learning Logo'}/>
            </div>

            <div className="pt-20 flex justify-evenly items-center min-h-[calc(50vh-4rem)] ">
                <div >
                    <Heading>
                        Learning Should<br />
                        Be Limitless!
                    </Heading>
                </div>
                <div >
                    <div className="flex flex-col gap-4 w-72">
                        <Button variant={'outline'} className="w-full gap-3 py-3 ">
                            <Image src={'/Google-Logo.png'} width={22} height={22} alt='Google Logo'/>
                            Login with Google
                        </Button>
                        <Button variant={'outline'} className="w-full gap-3 py-3">
                            <PhoneIcon fill='#33706a' stroke={'#33706a'} size={22}/>
                            3335566
                        </Button>
                        <Button variant={'link'} className="w-full justify-center py-3">
                            Register with Email
                        </Button>
                    </div>
                </div>
            </div>

            <div className='flex overflow-x-auto gap-10 pb-4 px-20'>
                <Card className='items-center bg-card-background-one min-w-[380px] w-[380px] flex-shrink-0'>
                    <Heading textSize={'text-4xl'}>
                        35 Expert Tutors!
                    </Heading>
                    <Image src={'/Card-1.png'} width={225} height={205} alt={'Card 1'}/>
                </Card>

                <Card className='items-center bg-card-background-two min-w-[380px] w-[380px] flex-shrink-0'>
                    <Heading textSize={'text-4xl'}>
                        1000s of Recordings!
                    </Heading>
                    <Image src={'/Card-2.png'} width={240} height={215} alt={'Card 2'}/>
                </Card>

                <Card className='items-center bg-card-background-three min-w-[380px] w-[380px] flex-shrink-0'>
                    <Heading textSize={'text-4xl'}>
                        Rewatch Every Class!
                    </Heading>
                    <Image src={'/Card-3.png'} width={225} height={205} alt={'Card 3'}/>
                </Card>

                <Card className='items-center bg-card-background-four min-w-[380px] w-[380px] flex-shrink-0'>
                    <Heading textSize={'text-4xl'}>
                        Monthly Reports!
                    </Heading>
                    <Image src={'/Card-4.png'} width={220} height={200} alt={'Card 4'}/>
                </Card>
            </div>
        </div>
    )
}

export default Home