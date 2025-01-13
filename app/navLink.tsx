'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    BookOpenIcon,
    HomeIcon,
    PlusCircleIcon,
    UserCircleIcon,
  } from '@heroicons/react/24/outline';
const links = [
    {name: 'home', href : '/home', icon: HomeIcon},
    {name: 'about', href : '/about', icon:BookOpenIcon},
    {name: 'add', href : '/addImage', icon:PlusCircleIcon},
    {name: 'logout' , href: '#', icon:UserCircleIcon}
]

export default function NavLinks (){
    const router = useRouter();
    const handleLogout = () => {
        // Clear tokens from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userid');

        // Redirect to the login page
        router.push('./'); // Adjust to your desired route
    };
    return(
        <>
        {links.map( (link)=>{
             const Linkicon = link.icon;
             if (link.name === 'logout'){
                return(
                    <button
                    key={link.name}
                    onClick={handleLogout}
                    className="flex mr-9 capitalize text-bold items-center"
                >
                    <Linkicon className="w-5" />
                    <p className="hidden md:block">{link.name}</p>
                </button>
                )
             }
            return(
            <Link href={link.href} key={link.name} className="flex mr-9 capitalize text-bold items-center"> 
            <Linkicon className="w-5 "/>
            <p className="hidden md:block">{link.name}</p>  </Link> )
        })} 
        </>
    )

}

