
import MetaMaskOnboarding from "@metamask/onboarding"

// The origin where your dApp is served (adjust if hosted elsewhere)
const forwarderOrigin = window.location.origin || "http://localhost:3000"

export const isMetaMaskInstalled = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof (window as any).ethereum !== "undefined" &&
    (window as any).ethereum.isMetaMask
  )
}

export const startMetaMaskOnboarding = (): void => {
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })
  onboarding.startOnboarding()
}

export const connectMetaMask = async (): Promise<string> => {
  const ethereum = (window as any).ethereum

  if (!isMetaMaskInstalled()) {
    startMetaMaskOnboarding()
    throw new Error("MetaMask not installed — redirecting to install page.")
  }

  try {
    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
    })
    return accounts[0]
  } catch (error: any) {
    console.error("Failed to connect to MetaMask:", error)
    throw new Error("MetaMask connection failed.")
  }
}

export const getCurrentAccount = async (): Promise<string | null> => {
  const ethereum = (window as any).ethereum
  if (!isMetaMaskInstalled()) return null

  try {
    const accounts: string[] = await ethereum.request({ method: "eth_accounts" })
    return accounts.length > 0 ? accounts[0] : null
  } catch (error) {
    console.error("Error fetching current account:", error)
    return null
  }
}