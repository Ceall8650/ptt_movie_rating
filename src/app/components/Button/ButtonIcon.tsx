import { useState, useEffect } from 'react';
import Image from 'next/image';

type ButtonIconProps = {
  icon: string
  alt: string,
  className?: string,
}
type Props = ButtonIconProps & React.ButtonHTMLAttributes<HTMLButtonElement>

function ButtonIcon({ 
  className='',
  icon,
  alt,
  ...props
}: Props) {
  const [parsedIcon, setParsedIcon] = useState('') 
  useEffect(() => {
    async function importIcon() {
      if(icon) {
        let importedIcon = await import(`assets/icons/${icon}.svg`);
    
        // The "importedIcon" is a "module" type, it cannot be passed to "Image" which is a "Client Component"
        // It need to be converted to a plain object
        setParsedIcon(JSON.parse(JSON.stringify(importedIcon)))
      }
    }

    importIcon()
  }, [icon])

  return (
    <button
			className={className}
			{...props}
		>
      {
        // Warning: Dynamic await import() or require() are not supported. 
        // The import must be static so it can be analyzed at build time.
        // Based on: https://nextjs.org/docs/app/building-your-application/optimizing/images#local-images
        // If the "Image" receive the image from dynamic import, the "Image" will be a "Client component"
        parsedIcon && <Image
          alt={alt}
          src={ parsedIcon }
          width={28}
          height={28}
        />
      }
    </button>
  )
}

export default ButtonIcon
