import Link from 'next/link'

import { ResponsiveImage, SubCategoriesSkeleton } from 'components'

const SubCategories = props => {
  //? Props
  const { childCategories, isLoading } = props

  //? Render(s)
  return (
    <section className="px-4 my-7">
      {isLoading ? (
        <SubCategoriesSkeleton />
      ) : childCategories && childCategories.length > 0 ? (
        <>
          <h4 className="mb-4 text-base text-black lg:pt-4">类别</h4>
          <div className="flex gap-3 pb-3 overflow-x-auto whitespace-nowrap">
            {childCategories.map(item => (
              <Link
                key={item._id}
                href={`/products?category=${item.slug}`}
                className="px-3 pt-2 pb-2 text-center border-2 border-gray-100 rounded-md"
              >
                <span className="inline-block hover:text-red-500">{item.name}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export default SubCategories
