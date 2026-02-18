import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { deleteTrip } from '@/app/trips/actions'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">Travel Tracker</h1>
        <p className="text-xl mb-8 text-gray-600">Track your journeys around the world.</p>
        <Link href="/login">
          <Button size="lg">Get Started</Button>
        </Link>
      </main>
    )
  }

  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .eq('is_active', true)
    .order('start_date', { ascending: false })

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <div className="flex gap-4">
          <Link href="/trips/new">
            <Button>Add Trip</Button>
          </Link>
          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit">Sign Out</Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips?.map((trip) => (
          <div key={trip.id} className="relative group">
            <Link href={`/trips/${trip.id}`}>
              <Card className="hover:shadow-lg transition-all hover:border-blue-200 cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>{trip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(trip.start_date).toLocaleDateString()}
                    {trip.end_date && ` - ${new Date(trip.end_date).toLocaleDateString()}`}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{trip.description}</p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-4 right-4">
              <form action={deleteTrip}>
                <input type="hidden" name="id" value={trip.id} />
                <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 bg-white/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {(!trips || trips.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed text-gray-500">
          <p className="mb-4">No trips found yet.</p>
          <Link href="/trips/new">
            <Button variant="secondary">Create your first trip</Button>
          </Link>
        </div>
      )}
    </main>
  )
}
