import { FC } from 'react'

type Props = {
  shape: Shape
  size?: number
}

const ShapeIcon: FC<Props> = ({ shape, size = 32 }) => {
  switch (shape) {
    default:
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 512 512">
          <path
            d="M278.313 48.296a42.667 42.667 0 0 1 15.876 15.876l182.478 319.336c11.691 20.46 4.583 46.523-15.876 58.214a42.667 42.667 0 0 1-21.169 5.621H74.667C51.103 447.343 32 428.241 32 404.677a42.667 42.667 0 0 1 5.622-21.169L220.099 64.172c11.691-20.46 37.755-27.567 58.214-15.876Z"
            fill="#57b3da"
          />
        </svg>
      )
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M4.281 3h16.437A1.281 1.281 0 0 1 22 4.281v16.437A1.282 1.282 0 0 1 20.718 22H4.282A1.282 1.282 0 0 1 3 20.718V4.281A1.281 1.281 0 0 1 4.281 3z"
            fill="#ffbb10"
          />
        </svg>
      )
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32">
          <circle cx={16} cy={16} r={16} fill="#7f66ad" />
        </svg>
      )
  }
}

export default ShapeIcon
