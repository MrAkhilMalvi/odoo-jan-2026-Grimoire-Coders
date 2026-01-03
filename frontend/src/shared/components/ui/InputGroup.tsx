import { LucideIcon } from "lucide-react";

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  type?: string;
  placeholder?: string;

  icon?: LucideIcon;
  onIconClick?: () => void;
  isPasswordToggle?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  onIconClick,
  isPasswordToggle = false,
}) => {
  return (
    <div className="mb-5 relative">
      {/* Label */}
      <label
        className="
          block text-sm font-medium mb-2
          text-gray-700 dark:text-slate-300
        "
      >
        {label}
      </label>

      <div className="relative">
        {/* Input */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full p-3 rounded-md border outline-none transition
            bg-white dark:bg-slate-800
            text-gray-900 dark:text-slate-100
            placeholder-gray-400 dark:placeholder-slate-500
            border-gray-300 dark:border-slate-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
          "
        />

        {/* Icon (eye / action icon) */}
        {Icon && (
          <button
            type="button"
            onClick={onIconClick}
            className={`
              absolute inset-y-0 right-3 flex items-center transition
              text-gray-400 hover:text-gray-600
              dark:text-slate-400 dark:hover:text-slate-200
              ${isPasswordToggle ? "cursor-pointer" : "cursor-default"}
            `}
          >
            <Icon size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
