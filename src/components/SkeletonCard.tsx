export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="aspect-video bg-gray-200 shimmer" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-full shimmer w-full" />
        <div className="h-4 bg-gray-200 rounded-full shimmer w-4/5" />
        <div className="h-3 bg-gray-200 rounded-full shimmer w-2/5" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-3 bg-gray-200 rounded-full shimmer w-16" />
          <div className="h-7 bg-gray-200 rounded-full shimmer w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
