// Make sure initMap is global so the Google script can find it
window.initMap = async function() {
  const location = { lat: -25.3250826, lng: 31.0197776 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: location,
  });

  new google.maps.Marker({
    position: location,
    map: map,
  });
}

async function loadGoogleMaps() {
  try {
    // 1. Fetch the key from your PHP file
    const response = await fetch('getkey.php');
    const data = await response.json();
    const key = data.apiKey;

    // 2. Load the Google Maps script using the fetched key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  } catch (error) {
    console.error("Error fetching the API key:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mapSection = document.getElementById("map");

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadGoogleMaps();
      observer.disconnect();
    }
  });

  observer.observe(mapSection);
});