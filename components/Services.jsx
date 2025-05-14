import { CashOnDelivery, Daysreturn, ExpressDelivery, OriginalProducts, Support } from 'components'

export default function Services() {
  const services = [
    {
      name: '付款后48小时内发货',
      icon: <ExpressDelivery className="w-10 h-10" />,
    },
    { name: '客服 24 小时在线', icon: <Support className="w-10 h-10" /> },
    {
      name: '支持货到付款',
      icon: <CashOnDelivery className="w-10 h-10" />,
    },
    {
      name: '七天无理由退换',
      icon: <Daysreturn className="w-10 h-10" />,
    },
  ]

  //? Render(s)
  return (
    <section className="hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly">
      {services.map((item, i) => (
        <div key={i} className="flex items-center gap-x-1">
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </div>
      ))}
    </section>
  )
}
