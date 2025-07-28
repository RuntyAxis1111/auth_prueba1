"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ContentSection } from "@/components/content-section"
import { data } from "@/lib/data"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("artists")
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    type: string
    socialId?: string
  } | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-black">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleTabChange = (tabId: string) => {
    // Only reset selectedItem if we're switching to a different tab
    if (tabId !== activeTab) {
      setActiveTab(tabId)
      setSelectedItem(null)
    } else {
      // If clicking the same tab, just update activeTab but keep selectedItem
      setActiveTab(tabId)
    }
  }

  const handleItemSelect = (itemId: string, type: string, socialId?: string) => {
    setSelectedItem({ id: itemId, type, socialId })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={handleTabChange} onItemSelect={handleItemSelect} data={data} />

      <main className="pt-16">
        <ContentSection activeTab={activeTab} selectedItem={selectedItem} data={data} />
      </main>
    </div>
  )
}
