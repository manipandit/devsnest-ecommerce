interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  placeholder,
  type,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-y-2 mt-2">
      <label className="text-sm font-normal">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={true}
        className="rounded-[6px] text-sm font-normal border border-[#C1C1C1] w-[456px] h-12 px-4"
        onChange={onChange}
      />
    </div>
  );
}
