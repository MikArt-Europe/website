'use client'

import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Post {
  title: string
  slug: { current: string }
  body?: any[]
}

interface ShareButtonProps {
  post: Post
  className?: string
}

export function ShareButton({ post, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const isWebShareSupported = typeof navigator !== 'undefined' && 'share' in navigator

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${post.slug.current}`
    const description = post.body?.[0]?.children?.[0]?.text?.slice(0, 160) || post.title

    const shareData = {
      title: post.title,
      text: description,
      url,
    }

    if (isWebShareSupported) {
      try {
        await navigator.share(shareData)
        toast.success('Article shared successfully!')
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
          fallbackCopyToClipboard(url)
        }
      }
    } else {
      fallbackCopyToClipboard(url)
    }
  }

  const fallbackCopyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      toast.error('Failed to copy link')
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className={className}
    >
      {copied ? (
        <Check className="h-4 w-4 mr-2" />
      ) : isWebShareSupported ? (
        <Share2 className="h-4 w-4 mr-2" />
      ) : (
        <Copy className="h-4 w-4 mr-2" />
      )}
      {copied ? 'Copied!' : 'Share this article'}
    </Button>
  )
}
