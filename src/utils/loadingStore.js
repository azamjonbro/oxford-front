import { reactive } from 'vue'

let safetyTimeout = null

export const loadingStore = reactive({
  isLoading: true,
  hasLoadedOnce: false,

  startLoading() {
    // If the website has already loaded once, do not display the loader again
    if (this.hasLoadedOnce) {
      this.isLoading = false
      return
    }
    
    this.isLoading = true
    
    // Clear any previous safety timeout
    if (safetyTimeout) {
      clearTimeout(safetyTimeout)
    }

    // Set a safety timeout of 3.5 seconds to prevent users from getting stuck
    safetyTimeout = setTimeout(() => {
      this.stopLoading()
    }, 3500)
  },

  stopLoading() {
    // Smooth transition: small delay to let the animations complete nicely
    setTimeout(() => {
      this.isLoading = false
      this.hasLoadedOnce = true
      if (safetyTimeout) {
        clearTimeout(safetyTimeout)
        safetyTimeout = null
      }
    }, 400)
  }
})

// Automatically start the safety timeout on initial module load since isLoading defaults to true
safetyTimeout = setTimeout(() => {
  loadingStore.isLoading = false
  loadingStore.hasLoadedOnce = true
}, 3500)

