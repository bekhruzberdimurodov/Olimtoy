
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  location?: {
    lat: number;
    lng: number;
  };
  childName?: string;
}

const Map: React.FC<MapProps> = ({ location, childName }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll use a placeholder token
    // In production, user should add their Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTRqNHhsZmgwMW90MmtzYzVsemY0ZGNyIn0.example'; // Demo token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location ? [location.lng, location.lat] : [69.2401, 41.2995], // Default to Tashkent
      zoom: 15,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !location) return;

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Add new marker
    marker.current = new mapboxgl.Marker({
      color: '#3B82F6'
    })
      .setLngLat([location.lng, location.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div class="font-medium">${childName || 'Farzand'} joylashuvi</div>`)
      )
      .addTo(map.current);

    // Center map on location
    map.current.flyTo({
      center: [location.lng, location.lat],
      zoom: 15
    });
  }, [location, childName]);

  return (
    <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {!location && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Joylashuv ma'lumoti yuklanmoqda...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
