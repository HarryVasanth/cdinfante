/**
 * Page Loader Component.
 * Displays a full-screen loading spinner.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD] dark:bg-[#020202]">
    <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
  </div>
)
