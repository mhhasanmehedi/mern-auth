import { ThemeToggleButton } from "./theme-toggle-button";

const ToggleTheme = () => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <ThemeToggleButton variant="circle" start="top-left" />
    </div>
  );
};

export default ToggleTheme;
