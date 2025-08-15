"use client";

interface AuthButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function AuthButton({ 
  onClick, 
  children, 
  variant = "primary", 
  disabled = false 
}: AuthButtonProps) {
  const baseClasses = "w-full py-4 px-6 text-base font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const primaryClasses = `
    btn-primary
    text-white 
    shadow-lg 
    hover:shadow-xl 
    transform 
    hover:-translate-y-0.5 
    active:translate-y-0
    disabled:hover:transform-none
  `;
  
  const secondaryClasses = `
    btn-secondary
    shadow-md 
    hover:shadow-lg 
    transform 
    hover:-translate-y-0.5 
    active:translate-y-0
    disabled:hover:transform-none
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variant === "primary" ? primaryClasses : secondaryClasses}`}
    >
      {children}
    </button>
  );
}