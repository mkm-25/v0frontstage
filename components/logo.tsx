import Image from "next/image"
import Link from "next/link"

export default function Logo({ width = 32, height = 32 }: { width?: number; height?: number }) {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src="/frontstagelogo.png" 
        alt="Logo" 
        width={width} 
        height={height} 
        className="object-contain" 
      />
    </Link>
  )
}

