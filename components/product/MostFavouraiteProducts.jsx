import Link from 'next/link'

import { DiscountProduct, ProductPrice, Icons, ResponsiveImage, Skeleton } from 'components'
import { useGetProductsQuery } from '@/store/services'

const MostFavouraiteProducts = props => {
  //? Props
  const { categorySlug } = props

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 3,
      category: categorySlug,
      page_size: 36,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products,
        isLoading,
      }),
    }
  )

  //? Render(s)

  return (
    <section className="px-3">
      <div className="flex items-center mb-3 space-x-2 bg-[linear-gradient(135deg,#ff4d4d_0%,#f9436b_100%)] px-4 py-2 rounded-lg border-l-4 border-white/20">
        <Icons.Heart className="icon text-white/90 drop-shadow-md" />
        <h4 className="text-2xl font-bold text-white/95 text-shadow">精选品类</h4>
      </div>
      <div className="grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
        {isLoading
          ? Array(10)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className="p-1">
                  <Skeleton.Item
                    height="h-32 md:h-36"
                    width="w-28 md:w-32"
                    animated="background"
                    className="rounded-md mx-auto"
                  />
                  <Skeleton.Item
                    height="h-5"
                    width="w-32"
                    animated="background"
                    className="mt-4 mx-auto"
                  />
                  <Skeleton.Item
                    height="h-5"
                    width="w-20"
                    animated="background"
                    className="mt-4 mx-auto"
                  />
                </Skeleton.Items>
              ))
          : products?.map(product => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <article className="p-1 transition border border-gray-50 hover:border-red-500 min-h-[248px]">
                  <div className="flex gap-x-1 ">
                    <span className="text-base">{product.rating.toFixed(1)}</span>
                    <Icons.Star className="w-5 h-5 md:w-7 md:h-7 text-amber-400 " />
                  </div>

                  <ResponsiveImage
                    dimensions="h-32 w-28 md:w-32 md:h-36"
                    className="mx-auto"
                    src={product.images[0].url}
                    alt={product.title}
                  />
                  <div className="px-2 mt-2 text-base text-gray-700 line-clamp-2 min-h-[3rem]">
                    {product.title}
                  </div>
                  <div
                    className={`flex items-start mt-2 gap-x-2 ${
                      product.discount ? 'justify-start' : 'justify-start'
                    }`}
                  >
                    {/* {product.discount ? <DiscountProduct discount={product.discount} /> : null} */}
                    <ProductPrice
                      inStock={product.inStock}
                      discount={product.discount}
                      price={product.price}
                      className="text-red-500 font-bold"
                    />
                  </div>
                </article>
              </Link>
            ))}
      </div>
    </section>
  )
}

export default MostFavouraiteProducts
