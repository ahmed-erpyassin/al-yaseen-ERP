<template>
  <div class="not-found-container">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 text-center">
          <!-- 404 Icon -->
          <div class="error-icon mb-4">
            <i class="bi bi-exclamation-triangle-fill text-warning" style="font-size: 5rem;"></i>
          </div>
          
          <!-- Error Message -->
          <h1 class="display-1 fw-bold text-primary mb-3">404</h1>
          <h2 class="h3 mb-4">{{ $t('notFound.title') || 'Page Not Found' }}</h2>
          <p class="lead mb-4">
            {{ $t('notFound.message') || 'Sorry, the page you are looking for does not exist.' }}
          </p>
          
          <!-- Action Buttons -->
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button @click="goBack" class="btn btn-outline-primary">
              <i class="bi bi-arrow-left me-2"></i>
              {{ $t('notFound.goBack') || 'Go Back' }}
            </button>
            <router-link to="/" class="btn btn-primary">
              <i class="bi bi-house me-2"></i>
              {{ $t('notFound.goHome') || 'Go Home' }}
            </router-link>
          </div>
          
          <!-- Additional Help -->
          <div class="mt-5">
            <p class="text-muted small">
              {{ $t('notFound.help') || 'If you believe this is an error, please contact support.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goBack() {
      // Go back to previous page if available, otherwise go to home
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'home' });
      }
    }
  }
}
</script>

<style scoped>
.not-found-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.error-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.display-1 {
  font-size: 6rem;
  font-weight: 800;
  background: linear-gradient(45deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .display-1 {
    font-size: 4rem;
  }
  
  .error-icon i {
    font-size: 3rem !important;
  }
  
  .d-flex.gap-3 {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>
