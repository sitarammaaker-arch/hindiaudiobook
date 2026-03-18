export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Hero skeleton */}
      <div className="rounded-3xl p-12 mb-12" style={{ background: "#F5F0EB" }}>
        <div className="h-4 rounded-full mb-4 mx-auto" style={{ background: "#EBE5DF", width: "30%" }} />
        <div className="h-10 rounded-full mb-3 mx-auto" style={{ background: "#E8E2DC", width: "60%" }} />
        <div className="h-6 rounded-full mb-6 mx-auto" style={{ background: "#EBE5DF", width: "40%" }} />
        <div className="h-12 rounded-full mx-auto" style={{ background: "#E8E2DC", maxWidth: "500px" }} />
      </div>

      {/* Section title */}
      <div className="h-7 rounded-full mb-6" style={{ background: "#F0EAE4", width: "200px" }} />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(26,26,46,0.08)" }}>
            <div className="aspect-video shimmer" />
            <div className="p-4 space-y-2">
              <div className="h-4 rounded-full shimmer" style={{ width: "80%" }} />
              <div className="h-3 rounded-full shimmer" style={{ width: "50%" }} />
              <div className="h-3 rounded-full shimmer" style={{ width: "60%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
