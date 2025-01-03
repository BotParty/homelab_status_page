'use client'

import { useState } from 'react'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/react/24/outline'
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIconMini, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(moods[5])
  const [commentText, setCommentText] = useState('')

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send POST request to group chat API endpoint
      const response = await fetch('/api/group_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentText,      // The message content
          mood: selected?.value,     // The selected mood (can be null)
          // Add any other fields needed for your group chat
        }),
      })

      if (!response.ok) {
        console.error('Failed to submit message', response.statusText)
        alert('Error submitting message')
        return
      }

      // Clear out the input on success
      setCommentText('')
      // Optionally handle success UI or reload messages
    } catch (err) {
      console.error('Error submitting message:', err)
      alert('An unexpected error occurred.')
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-start space-x-4">
        {/* <div className="shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block size-10 rounded-full"
          />
        </div> */}
        <div className="min-w-0 flex-1">
          <form onSubmit={handleSubmit} method="POST">
            <div className="border-b border-gray-200 pb-px focus-within:border-b-2 focus-within:border-indigo-600 focus-within:pb-0">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Add your knowledge..."
                className="block w-full resize-none text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-5">
                <div className="flow-root">
                  <button
                    type="button"
                    className="-m-2 inline-flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <PaperClipIcon aria-hidden="true" className="size-6" />
                    <span className="sr-only">Attach a file</span>
                  </button>
                </div>
                <div className="flow-root">
                  <Listbox value={selected} onChange={setSelected}>
                    <Label className="sr-only">Your mood</Label>
                    <div className="relative">
                      <ListboxButton className="relative -m-2 inline-flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                        <span className="flex items-center justify-center">
                          {selected.value === null ? (
                            <span>
                              <FaceSmileIconOutline aria-hidden="true" className="size-6 shrink-0" />
                              <span className="sr-only">Add your mood</span>
                            </span>
                          ) : (
                            <span>
                              <span
                                className={classNames(
                                  selected.bgColor,
                                  'flex size-8 items-center justify-center rounded-full',
                                )}
                              >
                                <selected.icon aria-hidden="true" className="size-5 shrink-0 text-white" />
                              </span>
                              <span className="sr-only">{selected.name}</span>
                            </span>
                          )}
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow outline outline-1 outline-black/5 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm"
                      >
                        {moods.map((mood) => (
                          <ListboxOption
                            key={mood.value}
                            value={mood}
                            className="cursor-default select-none bg-white px-3 py-2 data-[focus]:relative data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            <div className="flex items-center">
                              <div
                                className={classNames(
                                  mood.bgColor,
                                  'flex size-8 items-center justify-center rounded-full',
                                )}
                              >
                                <mood.icon aria-hidden="true" className={classNames(mood.iconColor, 'size-5 shrink-0')} />
                              </div>
                              <span className="ml-3 block truncate font-medium">{mood.name}</span>
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
