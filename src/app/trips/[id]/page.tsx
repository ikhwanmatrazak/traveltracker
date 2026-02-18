import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plane, Bus, Ship, Building2, Wallet, Users, Sparkles, Pencil } from 'lucide-react'
import { ItineraryButton } from '../ItineraryButton'

export default async function TripSummaryPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: trip } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (!trip) {
        notFound()
    }

    const transportIcons = {
        air: <Plane className="h-5 w-5" />,
        land: <Bus className="h-5 w-5" />,
        water: <Ship className="h-5 w-5" />,
    }

    return (
        <main className="container mx-auto p-4 md:p-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-blue-900">{trip.title}</h1>
                        <p className="text-xl text-gray-500">
                            {new Date(trip.start_date).toLocaleDateString()}
                            {trip.end_date && ` - ${new Date(trip.end_date).toLocaleDateString()}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/trips/${trip.id}/edit`}>
                            <Button variant="outline" className="gap-2">
                                <Pencil className="h-4 w-4" /> Edit Trip
                            </Button>
                        </Link>
                        <ItineraryButton tripId={trip.id} />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Outbound Journey */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 border-b">
                            {trip.travel_by && transportIcons[trip.travel_by as keyof typeof transportIcons]}
                            <CardTitle>Outbound Journey</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Departure</p>
                                    <p className="font-semibold">{trip.departure_location || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Arrival</p>
                                    <p className="font-semibold">{trip.arrival_location || 'Not specified'}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Details</p>
                                <p className="font-medium">{trip.transport_details || 'No details provided'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Return Journey */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 border-b">
                            {trip.return_travel_by && transportIcons[trip.return_travel_by as keyof typeof transportIcons]}
                            <CardTitle>Return Journey</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Departure</p>
                                    <p className="font-semibold">{trip.return_departure_location || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Arrival</p>
                                    <p className="font-semibold">{trip.return_arrival_location || 'Not specified'}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Details</p>
                                <p className="font-medium">{trip.return_transport_details || 'No details provided'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stay & Budget */}
                    <Card className="md:col-span-2">
                        <CardHeader className="border-b">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Building2 className="h-5 w-5 text-gray-400" /> Stay & Budget
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hotel</p>
                                    <p className="font-semibold">{trip.hotel || 'Not booked'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <Wallet className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Budget</p>
                                    <p className="font-semibold text-green-700">
                                        {trip.budget ? `$${parseFloat(trip.budget).toLocaleString()}` : 'No budget set'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Users className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Group Size</p>
                                    <p className="font-semibold">{trip.group_size || 1} people</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card className="md:col-span-2">
                        <CardHeader className="border-b">
                            <CardTitle className="text-lg">About this trip</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {trip.description || 'No description provided for this trip.'}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Itinerary Section (Moved to Bottom) */}
                    {trip.itinerary && (
                        <Card className="md:col-span-2 border-blue-100 bg-blue-50/30">
                            <CardHeader className="flex flex-row items-center gap-2 border-b border-blue-100">
                                <Sparkles className="h-5 w-5 text-blue-600" />
                                <CardTitle className="text-blue-900">AI Planned Itinerary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {trip.itinerary}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    )
}
