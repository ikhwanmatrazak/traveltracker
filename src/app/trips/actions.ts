'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function createTrip(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const startDate = formData.get('start_date') as string
    const endDate = formData.get('end_date') as string
    const travelBy = formData.get('travel_by') as string
    const transportDetails = formData.get('transport_details') as string
    const departureLocation = formData.get('departure_location') as string
    const arrivalLocation = formData.get('arrival_location') as string
    const budget = formData.get('budget') ? parseFloat(formData.get('budget') as string) : null
    const hotel = formData.get('hotel') as string
    const groupSize = formData.get('group_size') ? parseInt(formData.get('group_size') as string) : null
    const returnTravelBy = formData.get('return_travel_by') as string
    const returnTransportDetails = formData.get('return_transport_details') as string
    const returnDepartureLocation = formData.get('return_departure_location') as string
    const returnArrivalLocation = formData.get('return_arrival_location') as string

    const { error } = await supabase.from('trips').insert({
        user_id: user.id,
        title,
        description,
        start_date: startDate,
        end_date: endDate || null,
        travel_by: travelBy,
        transport_details: transportDetails,
        departure_location: departureLocation,
        arrival_location: arrivalLocation,
        budget,
        hotel,
        group_size: groupSize,
        return_travel_by: returnTravelBy,
        return_transport_details: returnTransportDetails,
        return_departure_location: returnDepartureLocation,
        return_arrival_location: returnArrivalLocation,
    })

    if (error) {
        console.error(error)
        redirect('/trips/new?error=Failed to create trip')
    }

    revalidatePath('/')
    redirect('/')
}

export async function deleteTrip(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const id = formData.get('id') as string

    const { error } = await supabase
        .from('trips')
        .update({ is_active: false })
        .match({ id, user_id: user.id })

    if (error) {
        console.error(error)
    }

    revalidatePath('/')
}

export async function generateItinerary(tripId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: trip, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .eq('user_id', user.id)
        .single()

    if (fetchError || !trip) {
        throw new Error('Trip not found')
    }

    const prompt = `Create a detailed day-by-day travel itinerary for a trip to "${trip.title}".
    Details:
    - Dates: ${trip.start_date} to ${trip.end_date || 'N/A'}
    - Description: ${trip.description || 'None provided'}
    - Transport Outbound: ${trip.travel_by} (${trip.transport_details || 'N/A'}) from ${trip.departure_location || 'N/A'} to ${trip.arrival_location || 'N/A'}
    - Transport Return: ${trip.return_travel_by} (${trip.return_transport_details || 'N/A'}) from ${trip.return_departure_location || 'N/A'} to ${trip.return_arrival_location || 'N/A'}
    - Hotel: ${trip.hotel || 'Not specified'}
    - Group Size: ${trip.group_size || 1} people
    
    Format the response in clear Markdown with headers for each day.`

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    })

    const itinerary = response.choices[0].message.content

    const { error: updateError } = await supabase
        .from('trips')
        .update({ itinerary })
        .eq('id', tripId)
        .eq('user_id', user.id)

    if (updateError) {
        console.error(updateError)
        throw new Error('Failed to save itinerary')
    }

    revalidatePath(`/trips/${tripId}`)
    revalidatePath('/')
}

export async function updateTrip(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const startDate = formData.get('start_date') as string
    const endDate = formData.get('end_date') as string
    const travelBy = formData.get('travel_by') as string
    const transportDetails = formData.get('transport_details') as string
    const departureLocation = formData.get('departure_location') as string
    const arrivalLocation = formData.get('arrival_location') as string
    const budget = formData.get('budget') ? parseFloat(formData.get('budget') as string) : null
    const hotel = formData.get('hotel') as string
    const groupSize = formData.get('group_size') ? parseInt(formData.get('group_size') as string) : null
    const returnTravelBy = formData.get('return_travel_by') as string
    const returnTransportDetails = formData.get('return_transport_details') as string
    const returnDepartureLocation = formData.get('return_departure_location') as string
    const returnArrivalLocation = formData.get('return_arrival_location') as string
    const itinerary = formData.get('itinerary') as string

    const { error } = await supabase
        .from('trips')
        .update({
            title,
            description,
            start_date: startDate,
            end_date: endDate || null,
            travel_by: travelBy,
            transport_details: transportDetails,
            departure_location: departureLocation,
            arrival_location: arrivalLocation,
            budget,
            hotel,
            group_size: groupSize,
            return_travel_by: returnTravelBy,
            return_transport_details: returnTransportDetails,
            return_departure_location: returnDepartureLocation,
            return_arrival_location: returnArrivalLocation,
            itinerary: itinerary || null,
        })
        .match({ id, user_id: user.id })

    if (error) {
        console.error(error)
        redirect(`/trips/${id}/edit?error=Failed to update trip`)
    }

    revalidatePath(`/trips/${id}`)
    revalidatePath('/')
    redirect(`/trips/${id}`)
}
