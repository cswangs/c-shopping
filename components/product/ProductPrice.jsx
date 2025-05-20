import { formatNumber } from 'utils'
import { DiscountProduct } from 'components'

const ProductPrice = props => {
  //? Props
  const { singleProduct, inStock, discount, price } = props

  // 计算折扣价
  const discountedPrice = price - (discount * price) / 100

  //? Render(s)
  if (singleProduct) {
    // 单产品详情页保持原样
    return (
      <div className="flex flex-col-reverse">
        <div className="flex items-center self-end">
          <span className="text-lg font-bold text-red-500">¥</span>
          <span className="ml-1 text-lg font-bold text-red-500">
            {formatNumber(discountedPrice)}
          </span>
        </div>

        {discount > 0 && inStock !== 0 && (
          <div className="flex items-center justify-end">
            <DiscountProduct discount={discount} />
            <span className="ml-2 text-sm text-gray-500 line-through">
              <span className="text-sm text-gray-500">¥</span>
              <span className="ml-1">{formatNumber(price)}</span>
            </span>
          </div>
        )}
      </div>
    )
  }

  // 列表视图新样式
  return (
    <div className="flex flex-col items-start">
      {/* 第一行：当前价格 + 原价 */}
      <div className="flex items-baseline">
        {/* 当前价格（红色） */}
        <div className="flex items-center">
          <span className="text-lg font-bold text-red-500">¥</span>
          <span className="ml-1 text-lg font-bold text-red-500">
            {formatNumber(discountedPrice)}
          </span>
        </div>

        {/* 原价（带删除线） */}
        {discount > 0 && (
          <div className="flex items-center ml-2">
            <span className="text-sm text-gray-400 line-through">
              <span className="text-sm text-gray-400">¥</span>
              <span className="ml-1 text-sm text-gray-400">{formatNumber(price)}</span>
            </span>
          </div>
        )}
      </div>

      {/* 第二行：折扣标签（左对齐） */}
      {discount > 0 && inStock !== 0 && (
        <div className="mt-1 text-sm text-red-400">官方立减{discount}%</div>
      )}
    </div>
  )
}

export default ProductPrice
