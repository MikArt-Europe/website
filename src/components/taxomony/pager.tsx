import Link from "next/link"
import { Help } from "contentlayer/generated"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/taxomony/button"
import { Icons } from "@/components/taxomony/icons"

interface DocsPagerProps {
  doc: Help
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Help) {
  const flattenedLinks = [null, ...flatten([
        {
          title: "Getting Started",
          items: [
            {
              title: "Introduction",
              href: "/help-center",
            },
          ],
        },
    {
      title: "Minecraft",
      items: [
        {
          title: "Server Information",
          href: "/help-center/minecraft",
        },
        {
          title: "Server Rules",
          href: "/help-center/minecraft/rules",
          disabled: false,
        },
        {
          title: "Allowed Modifications",
          href: "/help-center/in-progress",
          disabled: true,
        },
      ],
    },
  ]), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: { items?: any }[]): any {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}
