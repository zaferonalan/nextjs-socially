"use client"

import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { createPost } from '@/actions/post.actions'
import toast from 'react-hot-toast'

function CreatePost() {
  const { user } = useUser()
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return

    setIsPosting(true)
    try {
      const result = await createPost(content, imageUrl)
      if (result.success) {
        // reset the form
        setContent("")
        setImageUrl("")
        setShowImageUpload(false)

        toast.success("Post created succesfully")
      }
    } catch (error) {
      console.error("Failed to create post",error)
      toast.error("Failed to create post")
    }
    finally{
      setIsPosting(false)
    }
  }

  return (
    <Card className='mb-6'>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex space-x-4'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src={user?.imageUrl || "/avatar.png"}/>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className='min-h-[120px] resize-none border-none focus-visible:ring-0 p-2 text-base'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>
          
          {/* TODO: HANDLE IMAGE UPLOADS */}
          
          <div className='flex items-center justify-between border-t pt-4'>
            <div className='flex space-x-2'>
              <Button
                type='button'
                variant="ghost"
                size="sm"
                className='text-muted-foreground hover:text-primary'
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
                >
                <ImageIcon className='size-4 mr-2'/>
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              { isPosting ? (
                <>
                  <Loader2Icon className='size-4 mr-2 animate-spin' />
                  Posting...
                </>
              ): (
                <>
                  <SendIcon className='size-4 mr-2'/>
                  Post
                </>
              )
            }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatePost