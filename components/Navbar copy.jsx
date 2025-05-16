'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Icons, NavbarSkeleton, ResponsiveImage } from 'components'

import { useGetCategoriesQuery } from '@/store/services'

export default function Navbar() {
  //? Get Categories Query
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories,
      isLoading,
    }),
  })

  //? State
  const [activeMinCat, setActiveMinCat] = useState({})
  const [hover, setHover] = useState(false)

  //? Handlers
  const handleActive = cat => {
    setActiveMinCat(cat)
  }
  const hanldeDeactive = () => {
    if (categories) setActiveMinCat(categories.filter(category => category.level === 1)[0])
  }

  //? Re-Renders
  useEffect(() => {
    if (categories) setActiveMinCat(categories?.filter(category => category.level === 1)[0])
  }, [categories])

  //? Render
  return (
    <div className="flex items-center gap-x-2 lg:gap-x-4">
      <div className="group">
        <button
          className="flex-center text-xs lg:text-sm px-1 lg:px-2 gap-x-0.5 lg:gap-x-1 text-base lg:text-xl"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Icons.Bars className="w-4 h-4 lg:w-5 lg:h-5" />
          商品分类
        </button>
        <div
          className={`fixed left-0 z-20 w-full h-screen top-20 lg:top-28 bg-gray-400/50 ${
            hover ? 'block' : 'hidden'
          }`}
        />

        <div
          className="absolute z-40 hidden w-full bg-white rounded-md shadow-lg border border-gray-100 top-6 lg:top-8 group-hover:block"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => {
            hanldeDeactive()
            setHover(false)
          }}
        >
          <div className="flex">
            <ul className="border-l-2 border-gray-100 w-48 lg:w-72">
              {isLoading ? (
                <NavbarSkeleton />
              ) : categories ? (
                categories
                  .filter(category => category.level === 1)
                  .map(levelOneCategory => (
                    <li
                      key={levelOneCategory._id}
                      className="w-full px-1 lg:px-2 py-0.5 text-xs lg:text-sm hover:bg-gray-100 group"
                      onMouseOver={() => handleActive(levelOneCategory)}
                    >
                      <Link
                        href={`/main/${levelOneCategory.slug}`}
                        className="px-2 lg:px-3 py-2 lg:py-3 flex gap-x-1 lg:gap-x-1.5 items-center"
                      >
                        <ResponsiveImage
                          dimensions="w-5 h-5 lg:w-7 lg:h-7"
                          className="grayscale"
                          src={levelOneCategory.image}
                          alt={levelOneCategory.name}
                        />
                        <span>{levelOneCategory.name}</span>
                      </Link>
                    </li>
                  ))
              ) : null}
            </ul>
            <ul className="flex-1 p-2 lg:p-4 grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
              {isLoading
                ? null
                : activeMinCat
                  ? categories?.map(levelTwoCategory => {
                      if (levelTwoCategory.parent === activeMinCat._id) {
                        return (
                          <li key={levelTwoCategory._id} className="h-fit">
                            <Link
                              href={`/products?category=${levelTwoCategory.slug}`}
                              className="flex items-center gap-x-1 px-2 py-1 mb-1 text-xs lg:text-sm font-semibold tracking-wider text-gray-700 border-l-2 border-red-500"
                            >
                              {levelTwoCategory.name}
                              <Icons.ArrowRight2 className="w-3 h-3 lg:w-4 lg:h-4" />
                            </Link>
                            <ul className="space-y-0.5 lg:space-y-1">
                              {categories
                                .filter(category => category.parent === levelTwoCategory._id)
                                .map(levelThreeCategory => (
                                  <li key={levelThreeCategory._id}>
                                    <Link
                                      href={`/products?category=${levelThreeCategory.slug}`}
                                      className="block px-2 lg:px-3 py-0.5 text-[10px] lg:text-xs font-medium text-gray-700 hover:text-red-500"
                                    >
                                      {levelThreeCategory.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        )
                      }
                    })
                  : null}
            </ul>
          </div>
        </div>
      </div>
      <Link
        href="/paidinfo"
        className="flex-center text-xs lg:text-sm px-1 lg:px-2 gap-x-0.5 lg:gap-x-1 text-base lg:text-xl hover:text-red-600"
      >
        <Icons.Post className="w-4 h-4 lg:w-5 lg:h-5" />
        有偿信息
      </Link>
    </div>
  )
}
