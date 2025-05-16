import { useDisclosure } from '@/hooks'
import { Icons, SearchModal } from 'components'

export default function Search() {
  //? Assets
  const [isShowSearchModal, searchModalHanlders] = useDisclosure()

  //? Render(s)
  return (
    <div className="flex flex-row flex-grow max-w-3xl">
      <div
        onClick={searchModalHanlders.open}
        className="flex flex-row flex-grow rounded-md border-2 border-red-300 hover:border-red-500 bg-white transition-all duration-200"
      >
        <button className="flex-grow py-2 px-3 text-left outline-none cursor-pointer text-gray-500 focus:border-none">
          搜好货
        </button>
        <button className="flex items-center px-4 space-x-1 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 ">
          <span className="text-lg font-medium text-white">搜索</span>
        </button>
      </div>
      <SearchModal isShow={isShowSearchModal} onClose={searchModalHanlders.close} />
    </div>
  )
}
