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
    <div className="hidden lg:flex items-center gap-x-4">
      <div className="group">
        <button
          className="flex-center text-sm px-2 gap-x-1 text-xl"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Icons.Bars className="icon" />
          商品分类
        </button>
        <div
          className={`fixed left-0 z-20 w-full h-screen top-28 bg-gray-400/50 ${
            hover ? 'block' : 'hidden'
          }`}
        />

        <div
          className="absolute z-40 hidden w-full bg-white rounded-md shadow-lg border border-gray-100 top-9 group-hover:block"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => {
            hanldeDeactive()
            setHover(false)
          }}
        >
          <div className="flex p-4 ">
            <ul className="bg-gray-50 w-52 rounded-md">
              {isLoading ? (
                <NavbarSkeleton />
              ) : categories ? (
                categories
                  .filter(category => category.level === 1)
                  .map(levelOneCategory => (
                    <li
                      key={levelOneCategory._id}
                      className="w-full px-2 py-0.5  hover:bg-gray-200 group"
                      onMouseOver={() => handleActive(levelOneCategory)}
                    >
                      <Link
                        href={`/main/${levelOneCategory.slug}`}
                        className="px-3 py-3 flex gap-x-1.5 items-center text-base "
                      >
                        <span>{levelOneCategory.name}</span>
                      </Link>
                    </li>
                  ))
              ) : null}
            </ul>
            <ul className="flex flex-col w-full gap-4 px-2 py-4 border border-red-500 rounded-md">
              {isLoading
                ? null
                : activeMinCat
                  ? categories?.map(levelTwoCategory => {
                      if (levelTwoCategory.parent === activeMinCat._id) {
                        return (
                          <li key={levelTwoCategory._id} className="flex items-start ">
                            {/* 二级分类名和箭头 */}

                            <Link
                              href={`/products?category=${levelTwoCategory.slug}`}
                              className="flex items-center w-24  text-sm  hover:text-red-500  "
                            >
                              {levelTwoCategory.name}
                              <Icons.ArrowRight2 className="ml-1 w-4 h-4" />
                            </Link>
                            {/* 三级分类横向排列 */}
                            <ul className="flex flex-wrap gap-x-4 ml-2  ">
                              {categories
                                .filter(category => category.parent === levelTwoCategory._id)
                                .map(levelThreeCategory => (
                                  <li key={levelThreeCategory._id}>
                                    <Link
                                      href={`/products?category=${levelThreeCategory.slug}`}
                                      className="text-sm text-gray-400 hover:text-red-500"
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
        className="flex-center text-sm px-2 gap-x-1 text-xl hover:text-red-600"
      >
        <Icons.Post className="w-4 h-4 lg:w-5 lg:h-5" />
        有偿信息
      </Link>
    </div>
  )
}
