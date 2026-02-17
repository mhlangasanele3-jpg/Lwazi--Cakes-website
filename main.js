const GOOGLE_MAPS_API_KEY = "AIzaSyDaep5_2e1H7xTDAMphhtWSnnLZi5JBL1E";

async function initMap() {
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

function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
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
