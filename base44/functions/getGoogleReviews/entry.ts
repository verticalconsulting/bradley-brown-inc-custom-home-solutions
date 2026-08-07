import { secrets } from "base44:runtime";

const PHONE_NUMBER = "+18443514154";
const TEXT_QUERY = "Bradley Brown Inc. Brandon MS";
const FIND_PLACE_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

export default async function(req) {
  try {
    const apiKey = secrets.get("GOOGLE_MAPS_API_KEY");
    if (!apiKey) {
      return Response.json({ error: "Missing Google Maps API key" }, { status: 500 });
    }

    // Step 1: Find the Place ID — try phone number first, then text query
    let placeId = null;

    // Try by phone number (most reliable)
    const phoneUrl = `${FIND_PLACE_URL}?input=${encodeURIComponent(PHONE_NUMBER)}&inputtype=phonenumber&fields=place_id,name&key=${apiKey}`;
    const phoneRes = await fetch(phoneUrl);
    const phoneData = await phoneRes.json();
    if (phoneData.candidates && phoneData.candidates.length) {
      placeId = phoneData.candidates[0].place_id;
    }

    // Fallback: try by text query
    let textData = null;
    if (!placeId) {
      const textUrl = `${FIND_PLACE_URL}?input=${encodeURIComponent(TEXT_QUERY)}&inputtype=textquery&fields=place_id,name&key=${apiKey}`;
      const textRes = await fetch(textUrl);
      textData = await textRes.json();
      if (textData.candidates && textData.candidates.length) {
        placeId = textData.candidates[0].place_id;
      }
    }

    if (!placeId) {
      return Response.json({
        error: "Business not found on Google Maps. Ensure Places API is enabled for your API key.",
        debug: {
          phoneStatus: phoneData.status,
          phoneError: phoneData.error_message || null,
          textStatus: textData ? textData.status : "not_attempted",
          textError: textData ? (textData.error_message || null) : null,
        }
      }, { status: 404 });
    }

    // Step 2: Get Place Details including reviews and rating
    const detailsUrl = `${PLACE_DETAILS_URL}?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    if (!detailsData.result) {
      return Response.json({ error: "Could not fetch place details" }, { status: 500 });
    }

    const result = detailsData.result;
    const reviews = (result.reviews || []).map((r) => ({
      author_name: r.author_name || "Google User",
      rating: r.rating || 5,
      text: r.text || "",
      time: r.time || null,
      relative_time_description: r.relative_time_description || "",
      profile_photo_url: r.profile_photo_url || null,
      author_url: r.author_url || null,
    }));

    return Response.json({
      rating: result.rating || 5,
      user_ratings_total: result.user_ratings_total || reviews.length,
      reviews,
      place_id: placeId,
      business_name: result.name || "Bradley Brown Inc.",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}