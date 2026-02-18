'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { generateItinerary } from './actions'

export function ItineraryButton({ tripId }: { tripId: string }) {
    const [isGenerating, setIsGenerating] = useState(false)

    async function handleGenerate() {
        try {
            setIsGenerating(true)
            await generateItinerary(tripId)
        } catch (error) {
            console.error(error)
            alert('Failed to generate itinerary. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transition-all hover:shadow-lg"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI is thinking...
                </>
            ) : (
                <>
                    <Sparkles className="h-4 w-4" />
                    Generate AI Itinerary
                </>
            )}
        </Button>
    )
}
