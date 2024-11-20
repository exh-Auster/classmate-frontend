export default function SkeletonPost() {
  return (
    <div className="animate-pulse p-4 border border-gray-200 rounded-md space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/4"></div> {/* Header */}
      <div className="h-4 bg-gray-300 rounded w-full"></div> {/* Content line 1 */}
      <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* Content line 2 */}
      <div className="h-4 bg-gray-300 rounded w-4/6"></div> {/* Content line 3 */}
    </div>
  );
}