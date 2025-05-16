import { Logo, Loading } from 'components'
import CustomLoader from './CustomLoader'

export default function BigLoading() {
  return (
    <div className="p-8 mx-auto space-y-10 text-center rounded-lg bg-red-100/90 max-w-max ">
      <CustomLoader />
    </div>
  )
}
