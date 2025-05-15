'use client'

import { useState } from 'react'
import { PageContainer } from '@/components'

const paidInfos = [
  {
    id: 1,
    title: '电商平台加强社交化布局 组团拼购模式发展速度提升',
    content:
      '现阶段各大电商平台开始注重产品社交化布局，如纷纷进入拼购、社区拼团等细分赛道，平台在社交化领域的竞争开始受到关注。艾媒咨询分析师认为，电商社交化运营模式是降低平台获客成本的有效手段，并且能有助于商家解决销路问题，整体发展迅速，未来入局到社交化运营的电商平台将继续增加。',
    publisher: '北京太行深处科技有限公司',
  },
  {
    id: 2,
    title: '2024中国电商行业发展现状、用户调查及未来趋势分析',
    content:
      '2024 年，中国电商行业成绩斐然。国家统计局数据显示，全年网上零售额增长 7.2% ，实物网零拉动社零增长 1.7%。综合电商平台仍为主流，超半数消费者会选择，短视频等新兴平台也发展迅猛。消费者线上购物多因商品选择多、优惠活动丰富、购物便捷。从用户调查看，4 - 5 天送达时长较易被接受，商品评价、运费、价格等因素影响购物决策。未来，电商行业将朝智能化、绿色化、全球化迈进，AI 等技术深化应用，绿色消费受推崇，跨境电商持续扩容，带来更多机遇与变革。',
    publisher: '北京太行深处科技有限公司',
  },
  {
    id: 3,
    title: '消费者电商购物更注重品质 平台背书影响力扩大',
    content:
      '电商供应链环节的日益丰富，使消费者多样化的消费需求得以满足，用户对于电商购物的关注也从商品丰富度、性价比，逐渐在商品质量保障方面转移。艾媒咨询分析师认为，在消费升级的背景下，质量保障成为各大平台争取用户的关键。而随着电商行业发展逐渐往头部靠拢，未来平台背书的作用将更加明显，口碑建设的重重要性愈加突出。',
    publisher: '北京太行深处科技有限公司',
  },
  {
    id: 4,
    title: '中国电商行业发展趋势分析',
    content:
      '中国电商行业在数字技术革新与消费需求升级驱动下，迈入高质量发展阶段。智能化成为显著趋势，AI 与物联网融合，智能推荐、智能客服、智能仓储物流等广泛应用，提升运营效率与用户体验。如京东 618 期间 AI 客服日均处理咨询量突破 8 亿次，菜鸟网络智能仓实现 90% 包裹 24 小时送达。下沉市场与社交裂变带来新增长。互联网向县域渗透，三四线城市贡献多数新增用户。社交电商蓬勃发展，微信小程序电商 GMV 突破 4.5 万亿，抖音兴趣电商 “货找人” 促成大量冲动消费转化。',
    publisher: '北京太行深处科技有限公司',
  },
  {
    id: 5,
    title: '采购行业未来的发展',
    content:
      '采购行业正处于深刻变革的浪潮中，未来发展趋势十分显著。智能化将成为采购行业的重要特征，借助 AI、大数据与云计算，企业能精准预测需求，实现 “按需采购”，避免库存积压，降低成本。比如天源迪科自主研发的 “天枢工业品大模型”，显著提升了商品治理效率，降低人力成本。跨边界合作也将成为大趋势，企业通过构建全球供应链网络，拓展采购渠道，提升供应链的效率和灵活性。此外，可持续采购愈发受重视，企业在采购时会更关注供应商的社会责任与环保标准，推动产业链绿色转型。',
    publisher: '北京太行深处科技有限公司',
  },
]

// 二维码图片地址（请替换为你的二维码图片）
const QR_CODE_URL = '/paidinfo.png'

export default function PaidInfoPage() {
  const [showQR, setShowQR] = useState(false)
  const [currentInfo, setCurrentInfo] = useState(null)

  // 打开二维码弹窗
  const handleShowQR = info => {
    setCurrentInfo(info)
    setShowQR(true)
  }

  // 关闭二维码弹窗
  const handleCloseQR = () => {
    setShowQR(false)
    setCurrentInfo(null)
  }

  return (
    <main className="container min-h-screen xl:mt-28">
      <PageContainer title="有偿信息" />
      <div className="space-y-8">
        {paidInfos.map(info => (
          <div
            key={info.id}
            className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h2>
              <p className="text-gray-600 mb-2">{info.content}</p>
              <div className="text-sm text-gray-400 mt-2">发布：{info.publisher}</div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
                onClick={() => handleShowQR(info)}
              >
                付费查看
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 二维码弹窗 */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-8 shadow-lg relative w-80 flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={handleCloseQR}
              aria-label="关闭"
            >
              ×
            </button>
            <div className="mb-4 text-lg font-semibold text-gray-800">请扫码付费查看完整内容</div>
            <img src={QR_CODE_URL} alt="二维码" className="w-48 h-48 object-contain mb-2" />
            <div className="text-gray-400 text-xs">微信/支付宝扫码均可</div>
          </div>
        </div>
      )}
    </main>
  )
}
