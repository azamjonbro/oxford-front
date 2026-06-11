import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// Secret exam access key — must match what we set when user visits the hidden URL
const EXAM_ACCESS_KEY = 'oxford_exam_access_granted'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/Events.vue')
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: () => import('../views/Teachers.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import('../views/Results.vue')
  },
  {
    path: '/result',
    redirect: '/results'
  },

  // ─── HIDDEN SECRET EXAM ENTRY POINT ────────────────────────────────────────
  // This is the ONLY URL that grants access to the placement test.
  // Oxford staff must navigate here first (bookmark this URL on center computers).
  // After visiting this URL, the browser remembers access for the session.
  {
    path: '/oxford-exam-2024',
    name: 'ExamGateway',
    beforeEnter(to, from, next) {
      // Grant access flag in sessionStorage (clears when browser tab/window closes)
      sessionStorage.setItem(EXAM_ACCESS_KEY, 'yes')
      // Immediately redirect to the actual landing page
      next('/test')
    },
    // Render nothing (redirect happens in beforeEnter)
    component: { template: '<div></div>' }
  },

  // ─── PROTECTED PLACEMENT TEST ROUTES ───────────────────────────────────────
  {
    path: '/test',
    name: 'TestLanding',
    component: () => import('../views/TestLanding.vue'),
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem(EXAM_ACCESS_KEY) === 'yes' || localStorage.getItem('placement_session')) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/test/exam',
    name: 'TestExam',
    component: () => import('../views/TestExam.vue'),
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem(EXAM_ACCESS_KEY) === 'yes' || localStorage.getItem('placement_session')) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/test/result',
    name: 'TestResult',
    component: () => import('../views/TestResult.vue'),
    beforeEnter(to, from, next) {
      if (
        sessionStorage.getItem(EXAM_ACCESS_KEY) === 'yes' ||
        localStorage.getItem('placement_session') ||
        localStorage.getItem('placement_result_cache')
      ) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
