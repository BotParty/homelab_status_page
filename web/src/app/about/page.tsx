"use client"

import { Button } from '@headlessui/react'
import Sliders from '../../components/Sliders'

const about = `I’m a design engineer (designer + software engineer) with 15 plus years of experience in real-time graphics, augmented and virtual reality, interface and product design. I specialize in creating next-generation interfaces and interactive experiences for Apple platforms (iOS, macOS, and visionOS), blending technical expertise with a passion for craft and detail.

I recently launched Valence 3D, a 3D modeling and design application for iOS, which I built from the ground up. This project involved designing complex mesh data structures, developing a Metal-based 3D graphics rendering engine, and crafting an intuitive touch based interface for 3D modeling on iOS. Built using Swift, C++, C, and SwiftUI, Valence 3D has significantly deepened my expertise as a software engineer and designer, while also honing my skills in business, marketing, communication, and project management.

I thrive at the intersection of design and engineering, solving complex challenges to create products that are both visually compelling and technically robust. I’m looking to bring my blend of design and engineering skills to a team where I can contribute meaningfully to create delightful and innovative products.

Email • Twitter • Instagram • LinkedIn • Github`
//import Socials from '@/components/SocialIcons'

export default function About() {
  return <>
  
  
  {/* <Sliders> </Sliders> */}
  <div>{about}</div>
 </>
}
