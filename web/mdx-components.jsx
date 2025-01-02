import Image from 'next/image'

export function useMDXComponents(components) {
  return {
    ...components,
    Image: (props) => <Image {...props} />,
  }
}
