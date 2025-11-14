import Link from "next/link"

// Logo component using frontstagelogo.png
export default function Logo({ width = 32, height = 32 }: { width?: number; height?: number }) {
  return (
    <Link href="/" className="flex items-center">
      <img 
        src="/frontstagelogo.png" 
        alt="Logo" 
        width={width} 
        height={height} 
        className="object-contain" 
      />
    </Link>
  )
}

