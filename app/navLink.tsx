import Link from "next/link";
import {
    BookOpenIcon,
    HomeIcon,
    PlusCircleIcon,
  } from '@heroicons/react/24/outline';
const links = [
    {name: 'home', href : '/', icon: HomeIcon},
    {name: 'about', href : '/about', icon:BookOpenIcon},
    {name: 'add', href : '/addImage', icon:PlusCircleIcon}
]

export default function NavLinks (){
    return(
        <>
        {links.map( (link)=>{
             const Linkicon = link.icon;
            return(
            <Link href={link.href} key={link.name} className="flex mr-9 capitalize text-bold items-center"> 
            <Linkicon className="w-5 "/>
            <p className="hidden md:block">{link.name}</p>  </Link> )
        })} 
        </>
    )

}

