import { NextResponse } from 'next/server'
import { db } from '@/helpers'
import mongoose from 'mongoose'

// 创建图片 Schema
const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
})

// 获取或创建 Image 模型
const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema)

export async function POST(request) {
  try {
    await db.connect()

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const image = new Image({
      data: buffer,
      contentType: file.type,
      name: file.name,
    })

    await image.save()
    await db.disconnect()

    // 返回图片的 ID，用于后续访问
    return NextResponse.json({
      success: true,
      imageId: image._id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
