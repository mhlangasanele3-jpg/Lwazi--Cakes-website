// Make sure initMap is global so the Google script can find it
window.initMap = async function() {
  const location = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3652.9653522385725!2d31.099743!3d-25.337376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDIwJzE0LjYiUyAzMcKwMDUnNTkuMSJF!5e1!3m2!1sen!2sza!4v1771400334167!5m2!1sen!2sza";

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