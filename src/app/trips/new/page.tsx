import { createTrip } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewTripPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Add New Trip</CardTitle>
                    <CardDescription>Log a new journey to your travel tracker.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createTrip} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Trip Title</Label>
                            <Input id="title" name="title" placeholder="e.g. Summer in Paris" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input id="start_date" name="start_date" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input id="end_date" name="end_date" type="date" />
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
                                    <Input id="transport_details" name="transport_details" placeholder="e.g. Flight MH123" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="departure_location">Departure From</Label>
                                    <Input id="departure_location" name="departure_location" placeholder="e.g. KLIA" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="arrival_location">Arrival At</Label>
                                    <Input id="arrival_location" name="arrival_location" placeholder="e.g. CDG Airport" />
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
                                    <Input id="return_transport_details" name="return_transport_details" placeholder="e.g. Flight MH124" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="return_departure_location">Departure From</Label>
                                    <Input id="return_departure_location" name="return_departure_location" placeholder="e.g. CDG Airport" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="return_arrival_location">Arrival At</Label>
                                    <Input id="return_arrival_location" name="return_arrival_location" placeholder="e.g. KLIA" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-semibold">Stay & Budget</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hotel">Hotel / Accommodation</Label>
                                    <Input id="hotel" name="hotel" placeholder="e.g. The Ritz" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Estimated Budget</Label>
                                    <Input id="budget" name="budget" type="number" step="0.01" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="group_size">Total People in Group</Label>
                                <Input id="group_size" name="group_size" type="number" min="1" placeholder="1" />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label htmlFor="description">Description & Notes</Label>
                            <textarea
                                id="description"
                                name="description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Any extra notes about your trip..."
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="submit">Save Trip</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
