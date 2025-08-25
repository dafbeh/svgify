import ThemeToggle from '../components/themeToggle';
import Svgify from '../components/svgify';

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-white dark:bg-[#2c2d30]">
      <div className="flex justify-end p-3">
        <ThemeToggle />
      </div>
      <Svgify />
    </div>
  );
}
