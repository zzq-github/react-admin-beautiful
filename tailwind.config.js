export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        // 主题驱动的语义颜色（由 CSS 变量控制，暗色模式自动切换）
        theme: {
          bg: 'var(--color-bg-container)',
          'bg-base': 'var(--color-bg-base)',
          'bg-elevated': 'var(--color-bg-elevated)',
          'header-bg': 'var(--color-header-bg)',
          'sidebar-bg': 'var(--color-sidebar-bg)',
          'sidebar-border': 'var(--color-sidebar-border)',
          'sidebar-hover': 'var(--color-sidebar-hover-bg)',
          'sidebar-active': 'var(--color-sidebar-active-bg)',
          hover: 'var(--color-hover-bg)',
          border: 'var(--color-border)',
          'border-secondary': 'var(--color-border-secondary)',
          text: 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-tertiary': 'var(--color-text-tertiary)',
          'sidebar-text': 'var(--color-sidebar-text)',
          'sidebar-text-active': 'var(--color-sidebar-text-active)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-active': 'var(--color-primary-active)',
          'primary-bg': 'var(--color-primary-bg)',
          'primary-border': 'var(--color-primary-border)',
          success: 'var(--color-success)',
          'success-hover': 'var(--color-success-hover)',
          'success-active': 'var(--color-success-active)',
          'success-bg': 'var(--color-success-bg)',
          'success-border': 'var(--color-success-border)',
          warning: 'var(--color-warning)',
          'warning-hover': 'var(--color-warning-hover)',
          'warning-active': 'var(--color-warning-active)',
          'warning-bg': 'var(--color-warning-bg)',
          'warning-border': 'var(--color-warning-border)',
          error: 'var(--color-error)',
          'error-hover': 'var(--color-error-hover)',
          'error-active': 'var(--color-error-active)',
          'error-bg': 'var(--color-error-bg)',
          'error-border': 'var(--color-error-border)',
          info: 'var(--color-info)',
          'info-hover': 'var(--color-info-hover)',
          'info-active': 'var(--color-info-active)',
          'info-bg': 'var(--color-info-bg)',
          'info-border': 'var(--color-info-border)',
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-card': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
      }
    }
  },
  plugins: [],
}
