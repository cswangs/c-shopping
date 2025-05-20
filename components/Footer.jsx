import Image from 'next/image'

import { Icons, Services, LogoChina, ResponsiveImage } from 'components'
import { siteTitle } from '@/utils'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pt-4 mt-8 border-t border-gray-200 bg-gray-50">
      <div className="container px-3  space-y-8 mx-auto ">
        {/* Logo & scroll to top */}
        <div className="flex justify-between">
          <div>
            {/* <div>
              <span className="w-32 h-10 mb-6">精选好物</span>
            </div> */}
            {/* <LogoChina className="w-32 h-10 mb-6" /> */}
            {/* <div className="flex flex-col gap-y-2 lg:flex-row lg:space-x-5">
              <span>我们每周 7 天、每天 24 小时为您解答</span>
              <span className="hidden lg:block bg-gray-300 w-[2px]" />
            </div> */}
          </div>
          <div className="min-w-max">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center px-3 py-1 border border-gray-300 rounded-md"
            >
              <span className="text-sm ">回到顶部</span>
              <Icons.ArrowUp className="text-gray-400 h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <Services />
        </div>

        {/* info */}
        <div className="space-y-6 lg:flex lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <h5 className="font-semibold text-black">友情链接</h5>
            <p className="text-justify text-gray-700">
              <Link
                href="https://www.ccgp.gov.cn/"
                target="_blank"
                className="hover:text-red-600 transition-colors"
              >
                中国政府采购网
              </Link>
              &nbsp;&nbsp;
              <Link
                href="http://www.ccgp-beijing.gov.cn/"
                target="_blank"
                className="hover:text-red-600 transition-colors"
              >
                北京市政府采购网
              </Link>
            </p>
          </div>

          <div className="flex justify-center gap-x-2"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-3 mt-6 bg-gray-600 space-y-3">
        <p className="text-white">关于我们 | 联系我们 | 人才招聘</p>
        <p className="text-white">
          Copyright © 2023-2026 &nbsp;&nbsp; 北京太行深处科技有限公司 &nbsp;&nbsp;
          地址：北京市西城区文兴街1号科研楼B104 &nbsp;&nbsp; 电话：18263368507
        </p>
        <p className="text-white">京ICP备</p>
      </div>
    </footer>
  )
}
