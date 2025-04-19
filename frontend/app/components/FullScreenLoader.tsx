import { Loader2 } from "lucide-react"

export default function FullScreenLoader({ message = "Redirecting..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-rose-600" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
