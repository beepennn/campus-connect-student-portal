'use client'

interface LinkMatch {
  text: string
  url: string
}

function extractLinks(text: string): (string | LinkMatch)[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts: (string | LinkMatch)[] = []
  let lastIndex = 0

  text.replace(urlRegex, (match, url, offset) => {
    if (offset > lastIndex) {
      parts.push(text.substring(lastIndex, offset))
    }
    parts.push({ text: url, url })
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length === 0 ? [text] : parts
}

export function TextWithLinks({ text }: { text: string }) {
  const parts = extractLinks(text)

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <span key={index}>{part}</span>
        }
        return (
          <a
            key={index}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium break-all"
            title={part.url}
          >
            {part.text}
          </a>
        )
      })}
    </>
  )
}
