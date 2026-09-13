/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#49b657',
          // `DEFAULT` é o verde da marca e continua sendo o preenchimento dos
          // botões — o que mudou foi o texto por cima: era branco (2,6:1,
          // ilegível no celular sob sol) e passou a ser `deep` (6,0:1).
          // `hover` é o mesmo verde um tom abaixo, ainda com 4,9:1.
          hover: '#3da54b',
          // `dark` só aparece como texto e ícone sobre fundo claro: 5,3:1.
          dark: '#2f7a39',
          forest: '#1b3f14',
          deep: '#112a0c',
          moss: '#a8e6ae',
        },
        orange: {
          DEFAULT: '#ef8b3a',
          // 6,4:1 como fundo de botão com texto escuro.
          hover: '#e57f2c',
          // 4,8:1 como texto sobre o creme.
          dark: '#a55916',
        },
        // 4,9:1 sobre o verde-floresta, onde o dourado sempre aparece como texto.
        gold: '#c9a055',
        cream: '#f6f2eb',
        sand: '#ece5d8',
        ink: '#14160f',
        neutral: '#63675a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        shell: '1200px',
        prose: '62ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,22,15,.05), 0 12px 32px -20px rgba(20,22,15,.35)',
        lift: '0 2px 4px rgba(20,22,15,.06), 0 20px 44px -22px rgba(20,22,15,.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .55s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
}
