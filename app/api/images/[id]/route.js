import { NextResponse } from 'next/server'
import { db } from '@/helpers'
import mongoose from 'mongoose'

const Image =
  mongoose.models.Image ||
  mongoose.model(
    'Image',
    new mongoose.Schema({
      data: Buffer,
      contentType: String,
      name: String,
      createdAt: { type: Date, default: Date.now },
    })
  )

// 添加内存缓存
const imageCache = new Map()
const CACHE_TTL = 1000 * 60 * 60 // 1小时缓存

export async function GET(request, { params }) {
  try {
    // 检查缓存
    const cachedImage = imageCache.get(params.id)
    if (cachedImage && Date.now() - cachedImage.timestamp < CACHE_TTL) {
      return new NextResponse(cachedImage.data, {
        headers: {
          'Content-Type': cachedImage.contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    }

    await db.connect()

    const image = await Image.findById(params.id)
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    await db.disconnect()

    // 更新缓存
    imageCache.set(params.id, {
      data: image.data,
      contentType: image.contentType,
      timestamp: Date.now(),
    })

    // 返回图片数据
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Get image error:', error)
    return NextResponse.json({ error: 'Failed to get image' }, { status: 500 })
  }
}
