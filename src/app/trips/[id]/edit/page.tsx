import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { updateTrip } from '../../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Sparkles } from 'lucide-react'

export default async function EditTripPage({ params }: { params: { id: string } }) {
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Edit Trip: {trip.title}</CardTitle>
                            <CardDescription>Update your journey details.</CardDescription>
                        </div>
                        <Link href={`/trips/${id}`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <form action={updateTrip} className="space-y-6">
                        <input type="hidden" name="id" value={id} />

                        <div className="space-y-2">
                            <Label htmlFor="title">Trip Title</Label>
                            <Input id="title" name="title" defaultValue={trip.title} required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input id="start_date" name="start_date" type="date" defaultValue={trip.start_date} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input id="end_date" name="end_date" type="date" defaultValue={trip.end_date || ''} />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-semibold">Transportation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="travel_by">Travel By</Label>
                                    <select
                                        id="travel_by"
                                        name="travel_by"
                                        defaultValue={trip.travel_by || ''}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="air">Air</option>
                                        <option value="land">Land</option>
                                        <option value="water">Water</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transport_details">Transport Details</Label>
                                    <Input id="transport_details" name="transport_details" defaultValue={trip.transport_details || ''} placeholder="e.g. Flight MH123" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="departure_location">Departure From</Label>
                                    <Input id="departure_location" name="departure_location" defaultValue={trip.departure_location || ''} placeholder="e.g. KLIA" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="arrival_location">Arrival At</Label>
                                    <Input id="arrival_location" name="arrival_location" defaultValue={trip.arrival_location || ''} placeholder="e.g. CDG Airport" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-semibold">Return Trip</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="return_travel_by">Return Travel By</Label>
                                    <select
                                        id="return_travel_by"
                                        name="return_travel_by"
                                        defaultValue={trip.return_travel_by || ''}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="air">Air</option>
                                        <option value="land">Land</option>
                                        <option value="water">Water</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="return_transport_details">Return Transport Details</Label>
                                    <Input id="return_transport_details" name="return_transport_details" defaultValue={trip.return_transport_details || ''} placeholder="e.g. Flight MH124" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="return_departure_location">Departure From</Label>
                                    <Input id="return_departure_location" name="return_departure_location" defaultValue={trip.return_departure_location || ''} placeholder="e.g. CDG Airport" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="return_arrival_location">Arrival At</Label>
                                    <Input id="return_arrival_location" name="return_arrival_location" defaultValue={trip.return_arrival_location || ''} placeholder="e.g. KLIA" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-semibold">Stay & Budget</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hotel">Hotel / Accommodation</Label>
                                    <Input id="hotel" name="hotel" defaultValue={trip.hotel || ''} placeholder="e.g. The Ritz" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Estimated Budget</Label>
                                    <Input id="budget" name="budget" type="number" step="0.01" defaultValue={trip.budget || ''} placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="group_size">Total People in Group</Label>
                                <Input id="group_size" name="group_size" type="number" min="1" defaultValue={trip.group_size || 1} placeholder="1" />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label htmlFor="description">Description & Notes</Label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={trip.description || ''}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Any extra notes about your trip..."
                            />
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <Label htmlFor="itinerary">AI Planned Itinerary</Label>
                            </div>
                            <textarea
                                id="itinerary"
                                name="itinerary"
                                defaultValue={trip.itinerary || ''}
                                className="flex min-h-[200px] w-full rounded-md border border-input bg-blue-50/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono"
                                placeholder="AI itinerary will appear here after generation..."
                            />
                            <p className="text-xs text-gray-400 italic">You can manually edit the AI's plan above if needed.</p>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Link href={`/trips/${id}`}>
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit">Update Trip</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
