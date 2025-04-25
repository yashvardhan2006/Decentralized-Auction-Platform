"use client"
import { useState, useEffect, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  connectMetaMask,
  getCurrentAccount,
  isMetaMaskInstalled,startMetaMaskOnboarding,
} from "@/app/lib/metamask"

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const installed = isMetaMaskInstalled()

  useEffect(() => {
    async function init() {
      if (installed) {
        const current = await getCurrentAccount()
        if (current) setAccount(current)
      }
      setLoading(false)
    }
    init()
  }, [installed])

  const installMetaMask = useCallback(() => {
    startMetaMaskOnboarding()
  }, [])

  const connectAndSave = useCallback(async () => {
    if (!installed) {
      installMetaMask()
      return
    }
    try {
      const walletAddress = await connectMetaMask()
      setAccount(walletAddress)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const email = session?.user?.email
      if (email) {
        await supabase.from("users").update({ walletAddress }).eq("email", email)
      }
    } catch (err) {
      console.error(err)
    }
  }, [installed, installMetaMask, supabase])
  return { account, loading, installed, connectAndSave, installMetaMask }
}
