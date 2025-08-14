// Test utility to debug scroll navigation
export const testScrollToEstimate = () => {
  console.log('=== Scroll Test Started ===');
  
  // Check if element exists
  const estimateSection = document.getElementById('get-estimate');
  console.log('Element with id="get-estimate":', estimateSection);
  
  if (!estimateSection) {
    console.error('Element not found! Available elements with "estimate" in ID:');
    const allElements = document.querySelectorAll('[id*="estimate"]');
    console.log(allElements);
    return false;
  }
  
  // Log element properties
  console.log('Element tag:', estimateSection.tagName);
  console.log('Element classes:', estimateSection.className);
  console.log('Element visible:', estimateSection.offsetParent !== null);
  console.log('Element in viewport:', estimateSection.getBoundingClientRect());
  
  // Get current scroll position
  const currentScroll = window.pageYOffset || window.scrollY;
  console.log('Current scroll position:', currentScroll);
  
  // Calculate target position
  const rect = estimateSection.getBoundingClientRect();
  const headerHeight = 80;
  const targetScroll = currentScroll + rect.top - headerHeight;
  
  console.log('Target scroll position:', targetScroll);
  console.log('Distance to scroll:', targetScroll - currentScroll);
  
  // Perform scroll
  console.log('Scrolling now...');
  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
  
  // Check final position after a delay
  setTimeout(() => {
    const finalScroll = window.pageYOffset || window.scrollY;
    console.log('Final scroll position:', finalScroll);
    console.log('Successfully scrolled:', Math.abs(finalScroll - targetScroll) < 50);
    console.log('=== Scroll Test Complete ===');
  }, 1000);
  
  return true;
};

// Make it available globally for testing in browser console
if (typeof window !== 'undefined') {
  window.testScrollToEstimate = testScrollToEstimate;
}
